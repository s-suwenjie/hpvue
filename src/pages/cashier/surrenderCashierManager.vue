<template>
  <div>
    <yhm-managerpage category="1">
      <!--导航条-->

      <template #navigationTab>
        <router-link class="menuTabDiv" v-for="(item,index) in details" :key="index" :class="{menuTabActive:menuTabOn == index}" :to="{path:item.path}" @click="menuTab(index)">
          {{item.name}}
        </router-link>
      </template>
      <!--操作区-->
      <template #operate>
        <!--        <yhm-commonbutton  value="添加" icon="btnAdd" :flicker="true" @call="add()"></yhm-commonbutton>-->
        <!--        <yhm-commonbutton :value="choose?'收起筛选':'展开筛选'" :icon="choose?'btnUp':'btnDown'" @call="switchChoose()"></yhm-commonbutton>-->
        <yhm-table-tip :show="tableTip" :content="tableTipInfo" :column="tableTipColumnInfo" :mouse-control="tableTipControl"></yhm-table-tip>
        <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initPageData(false)"></yhm-managersearch>
        <yhm-radiofilter :before="insuredUnitBefore" @initData="initChoose('category')" title="收银类型" :content="listCategory"></yhm-radiofilter>
        <yhm-radiofilter :before="insuredUnitBefore" @initData="initChoose('state')" title="状态"  all="0" :content="listState"></yhm-radiofilter>

        <!--<yhm-form-date :error-show="false" v-if="!isBankManey"  title="交易日期" :value="yearMonth" id="yearMonth" @call="callDate" ></yhm-form-date>-->

      </template>
      <!--筛选区-->

      <!--数据表头-->
      <template #listHead>
        <yhm-managerth style="width: 40px;" title="选择"></yhm-managerth>
        <yhm-managerth style="width: 40px;" title="查看"></yhm-managerth>
        <yhm-managerth style="width: 80px;" title="所属类型" value="category"></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="车牌号" value="plate"></yhm-managerth>
        <yhm-managerth style="width: 120px;"  title="被保险人" value="beinsuredName"></yhm-managerth>
        <yhm-managerth style="width: 120px;"  title="联系人" value="contactName"></yhm-managerth>
        <yhm-managerth style="width: 300px;" title="投保公司" value="insuredUnitShowName"></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="收支方向" value="direction"></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="金额"  value="money"></yhm-managerth>
        <yhm-managerth style="width: 150px;" title="此条交易剩余金额"  value="bankMoney"></yhm-managerth>
        <yhm-managerth title="编号" value="money"></yhm-managerth>
        <yhm-managerth  style="width: 250px;" title="操作"></yhm-managerth>
      </template>

      <!--数据明细-->
      <template #listBody>
        <tr :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]" v-for="(item,index) in content" :key="index">
          <yhm-manager-td-checkbox :value="item"></yhm-manager-td-checkbox>
          <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>
          <yhm-manager-td-center :value="item.categoryVal"></yhm-manager-td-center>
          <yhm-manager-td :value="item.plate"></yhm-manager-td>
          <yhm-manager-td :value="item.beinsuredName" ></yhm-manager-td>
          <yhm-manager-td :value="item.contactName"></yhm-manager-td>
          <yhm-manager-td :value="item.insuredUnitShowName"></yhm-manager-td>
          <yhm-manager-td-direction  class="dfJcc" :direction="item.direction" :value="item.direction" :dir-val="false"></yhm-manager-td-direction>
          <yhm-manager-td-money :value="item.money" ></yhm-manager-td-money>
          <yhm-manager-td-money  :value="item.bankMoney" ></yhm-manager-td-money>
          <yhm-manager-td :value="item.number"></yhm-manager-td>
          <yhm-manager-td-operate >
            <yhm-manager-td-operate-button   @click="approFund(item)" :value="'收款(客户)'" icon="i-btn-grant" color="#be08e3"></yhm-manager-td-operate-button>
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
    name: 'surrenderCashierManager',
    mixins: [managermixin],
    data(){
      return{
        insuredUnitBefore:'0',// 默认选择状态为可以选择，1为不可以选择
        listCategory:{
          value: '', //默认为空
          list: []
        },
        listState:{
          value: '1', //默认为空
          list: []
        },
        menuTabOn:3,
        details:[
          {id:'1', name: '工单收银',path:'/home/workOrderCashierDeskManager'},
          {id:'2', name: '保险收银',path:'/home/cashierManager'},
          {id:'3', name: '核销优惠券',path:'/home/workOrderCancellationCouponManager'},
          {id:'4', name: '退保收银',path:'/home/surrenderCashierManager'},
        ],
      }
    },
    methods:{
      listView(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '700',
          url: '/policyView?id=' + item.ownerID,
          title: '查看保单信息',
          closeCallBack: (data)=>{
            if(data){
              this.initPageData(false)
            }
          }
        })
      },
      approFund(item){
        let params = {
          id: item.ownerID,
        }
        this.ajaxJson({
          url: '/Fin/getScanningState',
          data: params,
          call: (data) => {
            this.$dialog.OpenWindow({
              width: '1050',
              height: '690',
              title: '收款(客户退回优惠)',
              url: '/cashierBankDetailPrivateForm?cashierMoney='+item.money +'&cashierDirection='+item.direction+'&bankID='+item.id +'&bankMoney='+item.bankMoney
                +'&insuredUnitID='+item.insuredUnit+'&insuredUnitAccount='+item.insuredUnitAccount+'&cashierSubject=杂项收入 ------ 其他收入&cashierSubjectID=C4F01802-72E4-42D1-8D5C-7AFB1AB086C5'
                +'&cashierRemake='+item.remake+'&publicandPrivateAccount='+item.publicandPrivateAccount+'&cashierBankTag='+item.bank+'&surrenderCashier=1',
              closeCallBack: (data)=>{
                this.initPageData(false)
              }
            })
          }
        })
      },
      initChoose (op) {
        if (op === 'state') {
          this.selectValue = []
        }

        this.initPageData(false)
      },
      initPageData (initValue) {
        let params = {}

        if (initValue) {
          params = {
            // category:this.listCategory.value,
            state:this.listState.value,
          }
        } else {
          params = {
            state:this.listState.value,
          }
        }
        this.init({
          initValue:initValue,
          url: '/Fin/getSurrenderCashierManager',
          data:params,
          all:(data) =>{
            //不管是不是初始化都需要执行的代码
          },
          init:(data)=>{
            //初始化时需要执行的代码
            this.listState=data.statePsd
            this.listState.value=data.statePsd.value
            this.listCategory=data.categoryPsd
          }
        })
      },
    },
    created () {
    }
  }
</script>

<style scoped>

</style>
