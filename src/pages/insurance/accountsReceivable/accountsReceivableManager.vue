<template>
  <div>
    <yhm-managerpage category="1">
      <!--导航条-->
      <template #navigationTab>
        <router-link class="menuTabDiv " :to="{path:'/home/policy/policyManager'}">保单管理</router-link>
        <router-link class="menuTabDiv menuTabActive" :to="{path:'/home/accountsReceivable/accountsReceivableManager'}">应收账款</router-link>
        <router-link class="menuTabDiv " :to="{path:'/home/customerRebates/customerRebatesManager'}">客户返利</router-link>
        <router-link class="menuTabDiv" :to="{path:'/home/paymentInsurance/payInsuranceFeeManager'}">付保险费</router-link>
      </template>
      <!--操作区-->
      <template #operate>
        <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initPageData(false)"></yhm-managersearch>
        <yhm-radiofilter :before="insuredUnitBefore" @initData="initChoose('insuredUnit')" title=" 保险公司" :content="listInsuredUnit"></yhm-radiofilter>
        <yhm-commonbutton value="打开选中信息" icon="i-selectAll" @call="selectedList" :show="isSelected" category="three"></yhm-commonbutton>
      </template>

      <template #operateMore>
        <yhm-radiofilter :before="insuredUnitBefore" @initData="initChoose('accountsReceivableDate')" title="时间" :content="listAccountsReceivableDate"></yhm-radiofilter>
      </template>
      <template #listHead>
        <yhm-managerth style="width: 40px;" title="选择"></yhm-managerth>
        <yhm-managerth style="width: 40px;" title="查看"></yhm-managerth>
        <yhm-managerth title="投保日期" value="insuredDate"></yhm-managerth>
        <yhm-managerth title="车牌号" value="plate"></yhm-managerth>
        <yhm-managerth title="联系人" value="contactName"></yhm-managerth>
        <yhm-managerth title="保险公司" value="insuredUnit"></yhm-managerth>
        <yhm-managerth title="预计盈亏"></yhm-managerth>
        <yhm-managerth title="实时盈亏"></yhm-managerth>
        <yhm-managerth title="申请编号" value="numbering"></yhm-managerth>
        <yhm-managerth style="width: 150px;" title="状态" value="cashStatus"></yhm-managerth>
      </template>

      <!--数据明细-->
      <template #listBody>
        <tr :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]" v-for="(item,index) in content" :key="index">
          <yhm-manager-td-checkbox :value="item" ></yhm-manager-td-checkbox>
          <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>
          <yhm-manager-td-date :value="item.insuredDate"></yhm-manager-td-date>
          <yhm-manager-td :value="item.plate"></yhm-manager-td>
          <yhm-manager-td :value="item.contactName"></yhm-manager-td>
          <yhm-manager-td-psd :list="insuredUnitList" :value="item.insuredUnit"></yhm-manager-td-psd>
          <yhm-manager-td-money  :value="item.actualProfitLoss" ></yhm-manager-td-money>
          <yhm-manager-td-money  :value="item.realTimeProfitLoss"></yhm-manager-td-money>
          <yhm-manager-td-center :value="item.numbering"></yhm-manager-td-center>
          <yhm-manager-td-state :value="item.statusVal" :state-color="item.statusColor" :state-img="item.statusImg"></yhm-manager-td-state>
        </tr>
      </template>

      <!--数据空提示-->
      <template #empty>
        <span class="m_listNoData" v-show="empty">暂时没有数据</span>
      </template>

      <template #total>
        <div class="listTotalCrente m_list w620">
          <div class="listTotalLeft">
            <span class="test"></span>
            <span class="test">金额</span>
            <span class="test">条数</span>
          </div>
          <table width="100%" cellpadding="0" cellspacing="0" class="m_content_table m_content_total_table">
            <thead>
            <tr>
              <yhm-managerth style="width: 100px;" before-color="black" title="" before-title="总数" ></yhm-managerth>
              <yhm-managerth style="width: 100px;" before-color="#49a9ea" title="" before-title="预计盈亏"></yhm-managerth>
              <yhm-managerth style="width: 100px;" before-color="#49a9ea" title="" before-title="实际盈亏"></yhm-managerth>
            </tr>
            </thead>
            <tbody>
            <tr>
              <yhm-manager-td-money  v-for="(item,index) in contentTotal" :key="index" :value="item.money"></yhm-manager-td-money>
            </tr>
            <tr>
              <yhm-manager-td-rgt  v-for="(item,index) in contentTotal" :key="index" :value="item.count"></yhm-manager-td-rgt>
            </tr>
            </tbody>
          </table>
        </div>

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
  import { accAdd } from '../../../assets/common'
  export default {
    name: 'accountsReceivableManager',
    mixins: [managermixin],
    data(){
      return{
        insuredUnitBefore:'0',// 默认选择状态为可以选择，1为不可以选择
        listInsuredUnit:{
          value: '', //默认为空
          list: []
        },
        listAccountsReceivableDate:{
          value: '0', //默认为空
          list: []
        },
        totalMoney:'0',
        Count :'0',
        totalList:[],
        isSelected:false,
        contentTotal: []

      }
    },
    methods:{

      //打开选中信息
      selectedList(){
        let params={
          selectValue:this.selectValue
        }
        this.ajaxJson({
          url: '/Fin/commonSelectedsave',
          data:params,
          call:(data) =>{
            if(data.type===0){
              this.$dialog.OpenWindow({
                width: '1050',
                height: '620',
                title: '查看选中信息',
                url: '/accountsReceivableView?id='+data.val,
                closeCallBack: (dataTwo)  =>{
                  if(dataTwo){

                  }
                }
              })
            }
          }
        })
      },
      selectedSum(){
        let params={
          selectValue:this.selectValue
        }
        this.ajaxJson({
          url: '/PersonOffice/commonSelectedsave',
          data:params,
          call:(data) =>{
            if(data.type===0){
              let paramsFinish = {
                selectValue: this.selectValue,
              }
              this.ajaxJson({
                url: '/Insurance/accountsReceivableTotalMoney',
                data: paramsFinish,
                call:(information) =>{
                  this.contentTotal = information
                }
              })
            }
          }
        })
      },

      listView(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '650',
          url: '/accountsReceivableView?id=' + item.id,
          title: '查看客户信息',
          closeCallBack: (data)=>{
            if(data){
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
        if (op === 'accountsReceivableDate') {
          this.selectValue = []
        }
        this.initPageData(false)
      },
      //搜索
      initPageData (initValue) {
        let params = {}
        if (initValue) {
          params = {
            insuredUnit:this.listInsuredUnit.value,
            accountsReceivableDate:this.listAccountsReceivableDate.value
          }
        } else {
          params = {
            insuredUnit:this.listInsuredUnit.value,
            accountsReceivableDate:this.listAccountsReceivableDate.value
          }
        }
        this.init({
          initValue:initValue,
          url: '/Insurance/accountsReceivableManager',
          data:params,
          all:(data) =>{
            this.contentTotal=data.total
          },
          init:(data)=>{
            //初始化时需要执行的代码
            // 这边初始化筛选信息
            this.listInsuredUnit=data.insuredUnitPsd
            this.insuredUnitList=data.insuredUnitList
            this.listAccountsReceivableDate=data.accountsReceivableDatePsd


          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
