<template>
  <div>
    <yhm-managerpage category="1">
      <!--导航条-->
      <template #navigationTab>
        <router-link class="menuTabDiv " :to="{path:'/home/policy/policyManager'}">保单管理</router-link>
        <router-link class="menuTabDiv " :to="{path:'/home/accountsReceivable/accountsReceivableManager'}">应收账款</router-link>
        <router-link class="menuTabDiv menuTabActive" :to="{path:'/home/customerRebates/customerRebatesManager'}">客户直接优惠/返利</router-link>
        <router-link class="menuTabDiv" :to="{path:'/home/paymentInsurance/payInsuranceFeeManager'}">付保险费</router-link>
      </template>
      <!--操作区-->
      <template #operate>
        <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initPageData(false)"></yhm-managersearch>
        <yhm-radiofilter :before="insuredUnitBefore" @initData="initChoose('insuredUnit')" title=" 保险公司" :content="listInsuredUnit"></yhm-radiofilter>



        <yhm-radiofilter :before="insuredUnitBefore" @initData="initChoose('cash')" title=" 是否返利" :content="listCash"></yhm-radiofilter>



        <yhm-commonbutton value="打开选中信息" icon="i-selectAll" @call="selectedList" :show="isSelected" category="three"></yhm-commonbutton>
      </template>

      <template #operateMore>
        <yhm-radiofilter :before="insuredUnitBefore" @initData="initChoose('accountsReceivableDate')" title="时间" :content="listAccountsReceivableDate"></yhm-radiofilter>
        <yhm-radiofilter :before="insuredUnitBefore" @initData="initChoose('cashObject')" title="返利对象" :content="listCashObject"></yhm-radiofilter>
      </template>
      <template #listHead>
        <yhm-managerth style="width: 40px;" title="选择"></yhm-managerth>
        <yhm-managerth style="width: 40px;" title="查看"></yhm-managerth>
        <yhm-managerth title="投保日期" value="insuredDate"></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="车牌号" value="plate"></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="联系人" value="contactName"></yhm-managerth>
        <yhm-managerth title="保险公司" value="insuredUnit"></yhm-managerth>
        <yhm-managerth style="width: 260px;" title="收款账户" value="otherAccount"></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="返利对象" value="cashObjectVal"></yhm-managerth>
        <yhm-managerth style="width: 120px;" v-if="isPre"  title="直接优惠金额" value="preferential"></yhm-managerth>
        <yhm-managerth style="width: 120px;" v-if="isAct" title="返利金额" value="actualProfitLoss"></yhm-managerth>
        <yhm-managerth style="width: 120px;" title="保险公司返利金额" value="realTimeProfitLoss"></yhm-managerth>
        <yhm-managerth title="申请编号" value="numbering"></yhm-managerth>
        <yhm-managerth style="width: 130px;" title="状态" value="status"></yhm-managerth>
      </template>

      <!--数据明细-->
      <template #listBody>
        <tr :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]" v-for="(item,index) in content" :key="index">
          <yhm-manager-td-checkbox :value="item"></yhm-manager-td-checkbox>
          <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>
          <yhm-manager-td-date :value="item.insuredDate"></yhm-manager-td-date>
          <yhm-manager-td @click="plateView(item)" :value="item.plate"></yhm-manager-td>
          <yhm-manager-td :value="item.contactName"></yhm-manager-td>
          <yhm-manager-td-psd @click="insuredUnitView(item)" :list="insuredUnitList" :value="item.insuredUnit"></yhm-manager-td-psd>
          <yhm-manager-td @click="unitDetail(item)" :tip="true" :value="item.otherAccount" ></yhm-manager-td>
          <yhm-manager-td :value="item.cash==='1'?'-------':item.cashObjectVal"></yhm-manager-td>
          <yhm-manager-td-money v-if="isPre" :value="item.preferential"></yhm-manager-td-money>
          <yhm-manager-td-money v-if="isAct" :value="item.actualProfitLoss"></yhm-manager-td-money>
          <yhm-manager-td-money  :value="item.realTimeProfitLoss"></yhm-manager-td-money>
          <yhm-manager-td :value="item.numbering"></yhm-manager-td>
          <yhm-manager-td-state :value="item.statusVal" :state-color="item.statusColor" :state-img="item.statusImg"></yhm-manager-td-state>
        </tr>
      </template>

      <!--数据空提示-->
      <template #empty>
        <span class="m_listNoData" v-show="empty">暂时没有数据</span>
      </template>

      <template #total>
        <div class="listTotalCrente m_list w620" v-if="isTotal">
          <div class="listTotalLeft">
            <span class="test"></span>
            <span class="test">金额</span>
            <span class="test">条数</span>
          </div>
          <table width="100%" cellpadding="0" cellspacing="0" class="m_content_table m_content_total_table">
            <thead>
            <tr>
              <yhm-managerth style="width: 100px;" before-color="black" title="" before-title="总数" ></yhm-managerth>
              <yhm-managerth style="width: 100px;" before-color="#49a9ea" title="" before-title="已返利总金额"></yhm-managerth>
              <yhm-managerth style="width: 100px;" before-color="#49a9ea" title="" before-title="未返利总金额"></yhm-managerth>
              <yhm-managerth style="width: 100px;" before-color="#49a9ea" title="" before-title="直接优惠总金额"></yhm-managerth>
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

        <div class="listTotalCrente m_list w620" v-if="isPreTotal">
          <div class="listTotalLeft">
            <span class="test"></span>
            <span class="test">金额</span>
            <span class="test">条数</span>
          </div>
          <table width="100%" cellpadding="0" cellspacing="0" class="m_content_table m_content_total_table" style="width: 250px">
            <thead>
              <tr>
                <yhm-managerth before-color="#49a9ea" title="" before-title="直接优惠总金额"></yhm-managerth>
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


        <div class="listTotalCrente m_list w620" v-if="isActTotal">
          <div class="listTotalLeft">
            <span class="test"></span>
            <span class="test">金额</span>
            <span class="test">条数</span>
          </div>
          <table width="100%" cellpadding="0" cellspacing="0" class="m_content_table m_content_total_table">
            <thead>
            <tr>
              <yhm-managerth style="width: 100px;" before-color="black" title="" before-title="总数" ></yhm-managerth>
              <yhm-managerth style="width: 100px;" before-color="#49a9ea" title="" before-title="已返利总金额"></yhm-managerth>
              <yhm-managerth style="width: 100px;" before-color="#49a9ea" title="" before-title="未返利总金额"></yhm-managerth>
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
    name: 'customerRebatesManager',
    mixins: [managermixin],
    data(){
      return{
        insuredUnitBefore:'0',// 默认选择状态为可以选择，1为不可以选择
        listInsuredUnit:{
          value: '', //默认为空
          list: []
        },
        listAccountsReceivableDate:{
          value: '3', //默认为空
          list: []
        },
        listCashObject:{
          value: '', //默认为空
          list: []
        },
        listCash:{
          value: '', //默认为空
          list: []
        },
        totalMoney:'0',
        Count :'0',
        totalList:[],
        isSelected:false,
        contentTotal: [],
        isPre:true,
        isAct:true,
        isTotal:true,
        isPreTotal:false,
        isActTotal:false,

      }
    },
    methods:{

      insuredUnitView(item){
          this.$dialog.OpenWindow({
            width: '1050',
            height: '570',
            url: '/insuranceUnitView?id=' + item.insuredUnitID +'&isCustomer=0',
            title: '查看保险信息',
            closeCallBack: (data)=>{
              if(data){
                this.initPageData(false)
              }
            }
          })
      },
      plateView(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '500',
          url: '/vehicleView?id=' + item.plateID+'&isCustomer=0',
          title: '查看车辆信息',
          closeCallBack: (data)=>{
            if(data){
              this.initPageData(false)
            }
          }
        })
      },
      unitDetail(item){
        if (item.cash==='1'){
          this.$dialog.alert({
            tipValue:'此条不需要返利!!!',
            alertImg: 'warn',
            width:'300'
          })
        }
      if (item.cashierOperation==='3' && item.cash==='0'){
          this.$dialog.OpenWindow({
            width: '1050',
            height: '750',
            url: '/unitDetailView?id=' + item.bankDetailID ,
            title: '查看收支明细信息',
            closeCallBack: (data)=>{
            }
          })
        }else if (item.cash==='0'){
          this.$dialog.alert({
            tipValue:'客户待返利!!!',
            alertImg: 'warn',
            width:'300'
          })
        }
      },

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
                url: '/customerRebatesView?id='+data.val,
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
                cash:this.listCash.value
              }
              this.ajaxJson({
                url: '/Insurance/customerManagerTotal',
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
        if (op === 'cashObject') {
          this.selectValue = []
        }
        if (op === 'cash') {

          if (this.listCash.value==='0'){
            this.isPre=false
            this.isAct=true
            this.isTotal=false
            this.isPreTotal=false
            this.isActTotal=true
          } else  if (this.listCash.value==='1'){
            this.isPre=true
            this.isAct=false
            this.isTotal=false
            this.isPreTotal=true
            this.isActTotal=false
          }else  if (this.listCash.value===''){
            this.isPre=true
            this.isAct=true
            this.isTotal=true
            this.isPreTotal=false
            this.isActTotal=false
          }

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
            accountsReceivableDate:this.listAccountsReceivableDate.value,
            cashObject:this.listCashObject.value,
            cash:this.listCash.value


          }
        } else {
          params = {
            insuredUnit:this.listInsuredUnit.value,
            accountsReceivableDate:this.listAccountsReceivableDate.value,
            cashObject:this.listCashObject.value,
            cash:this.listCash.value
          }
        }
        this.init({
          initValue:initValue,
          url: '/Insurance/getCustomerRebatesManager',
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
            this.listCashObject=data.cashObjectPsd
            this.listCash=data.cashPsd


          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
