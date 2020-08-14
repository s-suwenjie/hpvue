<template>
  <div>
    <yhm-managerpage   @statisticalClick="statisticalClick" :statisticalShow="true" :category="isCategory" :total-table="true" :totalWidth="true" >
      <!--导航条-->
      <template #navigationTab>
        <router-link class="menuTabDiv " :to="{path:'/home/policy/policyManager'}">保单管理</router-link>
        <router-link class="menuTabDiv " :to="{path:'/home/accountsReceivable/accountsReceivableManager'}">应收账款</router-link>
        <router-link class="menuTabDiv " :to="{path:'/home/customerRebates/customerRebatesManager'}">客户直接优惠/返利</router-link>
        <router-link class="menuTabDiv "  :to="{path:'/home/paymentInsurance/payInsuranceFeeManager'}">付保险费</router-link>
        <router-link class="menuTabDiv menuTabActive"  :to="{path:'/home/receiveInsurance/receiveInsuranceManager'}">收保险费</router-link>
      </template>
      <!--操作区-->
      <template #operate>
        <yhm-table-tip  @call="tableTipClick" ref="smallTable" :show="tableTip" :content="tableTipInfo" :column="tableTipColumnInfo" :mouse-control="tableTipControl"></yhm-table-tip>
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
        <yhm-managerth style="width: 150px;" title="投保日期" value="insuredDate"></yhm-managerth>
        <yhm-managerth style="width: 150px;" title="车牌号" value="plate"></yhm-managerth>
        <yhm-managerth style="width: 150px;" title="被保险人" value="beinsuredName"></yhm-managerth>
        <yhm-managerth style="width: 150px;" title="联系人" value="contactName"></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="保险公司" value="insuredUnit"></yhm-managerth>
        <yhm-managerth title="收款账户明细" value="otherAccount"></yhm-managerth>
        <yhm-managerth style="width: 150px;" title="支付金额" value="actualProfitLoss"></yhm-managerth>
        <yhm-managerth style="width: 150px;" title="申请编号" value="numbering"></yhm-managerth>
        <yhm-managerth style="width: 170px;" title="状态"></yhm-managerth>
      </template>

      <!--数据明细-->
      <template #listBody>
        <tr :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]" v-for="(item,index) in content" :key="index">
          <yhm-manager-td-checkbox :value="item"></yhm-manager-td-checkbox>
          <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>
          <yhm-manager-td-date :value="item.insuredDate"></yhm-manager-td-date>
          <yhm-manager-td @click="plateView(item)" :value="item.plate"></yhm-manager-td>
          <yhm-manager-td @click="contactView(item)" :value="item.contactName" ></yhm-manager-td>
          <yhm-manager-td  :value="item.beinsuredName" ></yhm-manager-td>
          <yhm-manager-td-psd  @click="insuredUnitView(item)" :list="insuredUnitList" :value="item.insuredUnit" ></yhm-manager-td-psd>
          <yhm-manager-td @click="unitDetail(item)" :tip="true" :value="item.listothAccount.length>0?'分批收款': item.otherAccount" :after-icon="item.listothAccount.length > 0?'i-btn-prompt':''" @mouseover="tableTipShowEvent" @mouseout="tableTipHideEvent" :value-object="item" :color="item.listothAccount.length > 0?'#1111EE':''" ></yhm-manager-td>
          <yhm-manager-td-money :value="item.otherMoney"></yhm-manager-td-money>
          <yhm-manager-td :value="item.numbering"></yhm-manager-td>
          <yhm-manager-td-state :value="item.statusVal" :state-color="item.statusColor" :state-img="item.statusImg"></yhm-manager-td-state>
        </tr>
      </template>

      <!--数据空提示-->
      <template #empty>
        <span class="m_listNoData" v-show="empty">暂时没有数据</span>
      </template>

      <template #total v-if="this.listAccountsReceivableDate.value==''?true:false">
        <div class="listTotalCrente m_list w620">
          <div class="listTotalLeft">
            <span class="test"></span>
            <span class="test">金额</span>
            <span class="test">条数</span>
          </div>
          <table width="100%" cellpadding="0" cellspacing="0" class="m_content_table m_content_total_table">
            <thead>
            <tr>
              <yhm-managerth style="width: 100px;" before-color="black" title="" before-title="保险额总数" ></yhm-managerth>
            </tr>
            </thead>
            <tbody>
            <tr>
              <yhm-manager-td-money  v-for="(item,index) in contentTotal" :style="{'color':item.money>=0?'#0909F7':'#f00'}" :key="index" :value="item.money"></yhm-manager-td-money>
            </tr>
            <tr>
              <yhm-manager-td-rgt  v-for="(item,index) in contentTotal" :style="{'color':item.count>=0?'#0909F7':'#f00'}" :key="index" :value="item.count"></yhm-manager-td-rgt>
            </tr>
            </tbody>
          </table>
        </div>

      </template>

      <template #total v-else>
        <div class="listTotalCrente m_list w620">
          <div class="listTotalLeft">
            <span class="test"></span>
            <span class="test">金额</span>
            <span class="test">条数</span>
          </div>
          <table width="100%" cellpadding="0" cellspacing="0" class="m_content_table m_content_total_table">
            <thead>
            <tr>
              <yhm-managerth style="width: 100px;" before-color="black" title="" before-title="保险额总数" ></yhm-managerth>
              <yhm-managerth style="width: 100px;"before-color="black" title="" before-title="环比" ></yhm-managerth>
              <yhm-managerth style="width: 100px;"before-color="black" title="" before-title="同比" ></yhm-managerth>

            </tr>
            </thead>
            <tbody>
            <tr>
              <yhm-manager-td-money  v-for="(item,index) in contentTotal"  :style="{'color':item.money>=0?'#0909F7':'#f00'}" :key="index" :value="item.money"></yhm-manager-td-money>
            </tr>
            <tr>
              <yhm-manager-td-rgt  v-for="(item,index) in contentTotal" :style="{'color':item.count>=0?'#0909F7':'#f00'}" :key="index" :value="item.count"></yhm-manager-td-rgt>
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
  export default {
    name: 'receiveInsuranceManager',
    mixins: [managermixin],
    data(){
      return{
        isCategory: '1',
        insuredUnitBefore:'0',// 默认选择状态为可以选择，1为不可以选择
        listInsuredUnit:{
          value: '', //默认为空
          list: []
        },
        listAccountsReceivableDate:{
          value: '3', //默认为空
          list: []
        },
        contentTotal: [],
        tableTip:false,         //记录表格是否显示
        tableTipControl:{},
        tableTipColumnInfo:[
          {width:'450',title:'收款收支明细',category:'',key:'otherAccount'},
          {width:'150',title:'金额',category:'money',key:'money'},
        ],
        tableTipInfo:[],
        currentControl:null
      }
    },
    methods:{
      statisticalClick(){
        this.$dialog.OpenWindow({
          width: '1300',
          height: '810',
          title: '代收保险费统计图',
          url: '/receiveInsuranceCartogram',
          closeCallBack: (dataTwo)=>{

          }
        })
      },
      tableTipClick(item,title){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '750',
          url: '/unitDetailView?id=' + item.otherAccountID ,
          title: '查看收支明细信息',
          closeCallBack: (data)=>{
          }
        })
      },
      tableTipShowEvent(item,control){
        if(item.listothAccount.length > 0) {
          this.tableTipInfo = item.listothAccount
          this.tableTipControl = control
          this.currentControl = control
          this.tableTip = true
        }else{
          this.currentControl = null
          this.tableTip = false
        }
      },
      tableTipHideEvent(){
        this.tableTip = false
      },
      moveToSmallTable(e){
        if(this.currentControl) {
          if(!(this.currentControl.contains(e.target) || this.$refs.smallTable.$el.contains(e.target))){
            this.tableTip = false
          }
        }
        else{
          document.removeEventListener('mouseover', this.moveToSmallTable)
        }
      },
      tableTipHideEvent(item,control){
        if(item.listothAccount.length > 0){
          document.addEventListener('mouseover', this.moveToSmallTable)
        }
      },
      unitDetail(item){

        if (item.bankDetailID==='' && item.listothAccount.length ==0){
          this.$dialog.alert({
            tipValue:'请先付保险费!!!',
            alertImg: 'warn',
            width:'300'
          })
        }else if (item.bankDetailID!=''&& item.listothAccount.length ==0 ){
          this.$dialog.OpenWindow({
            width: '1050',
            height: '750',
            url: '/unitDetailView?id=' + item.bankDetailID ,
            title: '查看收支明细信息',
            closeCallBack: (data)=>{
            }
          })
        }
      },
      contactView (item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '690',
          url:'/personView?id=' + item.contactID+'&isBilling=0',
          title:'查看联系人信息',
          closeCallBack:(data) =>{
            if(data){
              this.initPageData(false)
            }
          }
        })
      },
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
      listView(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '700',
          url: '/policyView?id=' + item.id,
          title: '查看客户信息',
          closeCallBack: (data)=>{
            if(data){
              this.initPageData(false)
            }
          }
        })
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
              }
              this.ajaxJson({
                url: '/Insurance/ReceiveInsuranceTotal',
                data: paramsFinish,
                call:(information) =>{
                  this.contentTotal = information
                }
              })
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
            accountsReceivableDate:this.listAccountsReceivableDate.value,
          }
        } else {
          params = {
            insuredUnit:this.listInsuredUnit.value,
            accountsReceivableDate:this.listAccountsReceivableDate.value,
          }
        }
        this.init({
          initValue:initValue,
          url: '/Insurance/ReceiveInsuranceManager',
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
    },
  }
</script>

<style scoped>

</style>
