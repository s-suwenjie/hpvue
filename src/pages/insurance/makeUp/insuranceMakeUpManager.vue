<template>
  <div>
    <yhm-managerpage category="1">
      <!--导航条-->
      <template #navigationTab>
        <router-link class="menuTabDiv menuTabActive" :to="{path:'/home/makeUp/insuranceMakeUpManager'}">保险业务补录</router-link>
      </template>
      <!--操作区-->
      <template #operate>

        <yhm-commonbutton  value="添加" icon="btnAdd" :flicker="true" @call="add()"></yhm-commonbutton>
        <yhm-commonbutton :value="choose?'收起筛选':'展开筛选'" :icon="choose?'btnUp':'btnDown'" @call="switchChoose()"></yhm-commonbutton>
        <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initPageData(false)"></yhm-managersearch>
      </template>
      <!--筛选区-->

      <template #choose>
        <div v-show="choose" class="buttonBody mptZero">
          <yhm-radiofilter :before="insuredUnitBefore" @initData="initChoose('insuredUnit')" title=" 保险公司" :content="listInsuredUnit"></yhm-radiofilter>
        </div>
      </template>
      <!--数据表头-->
      <template #listHead>
        <yhm-managerth  style="width: 40px;" title="选择"></yhm-managerth>
        <yhm-managerth  style="width: 40px;" title="查看"></yhm-managerth>
        <yhm-managerth  title="业务员" value="salsesman"></yhm-managerth>
        <yhm-managerth  title="车牌号" value="plate"></yhm-managerth>
        <yhm-managerth  title="联系人" value="contactName"></yhm-managerth>
        <yhm-managerth  title="被保险人" value="beinsuredName"></yhm-managerth>
        <yhm-managerth  title="投保日期" value="insuredDate"></yhm-managerth>
        <yhm-managerth  title="保险公司" value="insuredUnit"></yhm-managerth>
        <yhm-managerth  title="投保类型" value="insuredTypeVal"></yhm-managerth>
        <yhm-managerth  title="保费合计" value="premiumsTotal"></yhm-managerth>
        <yhm-managerth  title="实收金额" value="receivedMoney"></yhm-managerth>

        <yhm-managerth  title="操作" ></yhm-managerth>


      </template>
      <!--数据明细-->
      <template #listBody>
        <tr :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]" v-for="(item,index) in content" :key="index">
          <yhm-manager-td-checkbox :value="item"  ></yhm-manager-td-checkbox>
          <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>
          <yhm-manager-td-center  :value="item.salsesman"></yhm-manager-td-center>
          <yhm-manager-td  :value="item.plate"></yhm-manager-td>
          <yhm-manager-td :value="item.contactName"></yhm-manager-td>
          <yhm-manager-td  :value="item.beinsuredName"></yhm-manager-td>
          <yhm-manager-td-date :value="item.insuredDate"></yhm-manager-td-date>
          <yhm-manager-td-psd  :list="insuredUnitList" :value="item.insuredUnit"></yhm-manager-td-psd>
          <yhm-manager-td-center :value="item.insuredTypeVal"></yhm-manager-td-center>
          <yhm-manager-td-money  :value="item.premiumsTotal"></yhm-manager-td-money>
          <yhm-manager-td-money  :value="item.receivedMoney"></yhm-manager-td-money>

          <yhm-manager-td-operate>
            <yhm-manager-td-operate-button v-show="item.poNumber === ''?true:false" @click="addPNumbering(item)" icon="i-export" value="上传保单"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button v-show="item.poNumber !=''?true:false"  @click="selectNumber(item)" icon="i-invoiceView" value="查看保单" color="#fd6802"></yhm-manager-td-operate-button>
          </yhm-manager-td-operate>
        </tr>
      </template>
      <!--数据空提示-->
      <template #empty>
        <span class="m_listNoData" v-show="empty">暂时没有数据</span>
      </template>
      <!--分页控件-->
      <template #pager>
        <yhm-pagination :pager="pager" @initData="initPageData(false)"></yhm-pagination>
      </template>
    </yhm-managerpage>
  </div>
</template>

<script>
  import { managermixin } from '@/assets/manager.js'
  export default {
    name: 'insuranceMakeUpManager',
    mixins: [managermixin],
   data(){
      return{
        insuredUnitBefore:'0',// 默认选择状态为可以选择，1为不可以选择
        listInsuredUnit:{
          value: '', //默认为空
          list: []
        },
        insuredUnitList:[],
      }
   },
    methods:{
      listView(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '700',
          url: '/policyView?id=' + item.id,
          title: '查看保单信息',
          closeCallBack: (data)=>{
            if(data){
              this.initPageData(false)
            }
          }
        })
      },

      selectNumber(item){
        let title = '查看保单信息'
        let url = '/poNumberView?id='+item.poNumber+'&ownerID='+item.id

        this.$dialog.OpenWindow({
          width: '1050',
          height: '550',
          url: url,
          title: title,
          closeCallBack: (data) => {
            if (data) {
              this.initPageData(false)
            }
          }
        })
      },
      addPNumbering(item){
        let title = '上传保单'
        let url = '/poNumbering?id='+item.poNumber+'&ownerID='+item.id+'&project='+item.project+'&forceEndDate='+item.forceEndDate+'&businessEndDate='+item.businessEndDate
        this.$dialog.OpenWindow({
          width: '1050',
          height: '550',
          url: url,
          title: title,
          closeCallBack: (data) => {
            if (data) {
              this.initPageData(false)
            }
          }
        })
      },
      // incomeAccount(item){
      //   this.$dialog.OpenWindow({
      //     width: 1050,
      //     height: 750,
      //     url:'/insuranceMakeUpAccountForm?ownerID='+item.closeBankClueID+'&direction=0'+'&brand='+item.bank
      //       +'&cashierSubject=代收保险费 ------ 代理业务 ------ 其他业务&cashierSubjectID=F0887A4D-DA14-4FCB-B48B-221B42C8F17A'
      //       +'&remark='+item.remark,
      //     title:'代收客户保险费',
      //     closeCallBack:(data) =>{
      //       if (data) {
      //         this.lastData = data//接收子页面传的值
      //         this.initPageData(false)
      //       }
      //     }
      //   })
      // },
      //添加出单
      add() {
        this.$dialog.OpenWindow({
          width: 1050,
          height: 750,
          url:'/insuranceMakeUpForm',
          title:'出单管理',
          closeCallBack:(data) =>{
            if (data) {
              this.lastData = data//接收子页面传的值
              this.initPageData(false)
            }
          }
        })
      },
      // 筛选事件
      initChoose (op) {
        if (op === 'insuredUnit') {
          this.selectValue = []
        }

        this.initPageData(false)
      },
      //搜索
      initPageData (initValue) {
        let params = {}

        if (initValue) {
          params = {

          }
        } else {
          params = {
            insuredUnit:this.listInsuredUnit.value
          }
        }
        this.init({
          initValue:initValue,
          url: '/Insurance/getBillingMakeUpManager',
          data:params,
          all:(data) =>{
            //不管是不是初始化都需要执行的代码

          },
          init:(data)=>{
            //初始化时需要执行的代码
            // 这边初始化筛选信息
            this.listInsuredUnit=data.insuredUnitPsd
            this.insuredUnitList=data.insuredUnitList

          }
        })
      }
    },
    created () {

    }
  }
</script>

<style scoped>

</style>
