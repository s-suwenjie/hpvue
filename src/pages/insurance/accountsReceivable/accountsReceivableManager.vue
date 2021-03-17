<template>
  <div>
    <yhm-managerpage category="1" >
      <!--导航条-->
      <template #navigationTab>
        <router-link class="menuTabDiv " :to="{path:'/home/policy/policyManager'}">保单管理</router-link>
        <router-link class="menuTabDiv menuTabActive" :to="{path:'/home/accountsReceivable/accountsReceivableManager'}">应收账款</router-link>
        <router-link class="menuTabDiv " :to="{path:'/home/customerRebates/customerRebatesManager'}">客户直接优惠/返利</router-link>
        <router-link class="menuTabDiv" :to="{path:'/home/paymentInsurance/payInsuranceFeeManager'}">付保险费</router-link>
        <router-link class="menuTabDiv "  :to="{path:'/home/receiveInsurance/receiveInsuranceManager'}">收保险费</router-link>
        <router-link class="menuTabDiv " :to="{path:'/home/insuranceInvoice/insuranceInvoiceManager'}">保险开票</router-link>
      </template>
      <!--操作区-->
      <template #operate>
        <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initPageData(false)"></yhm-managersearch>
        <yhm-radiofilter :before="insuredUnitBefore" @initData="initChoose('insuredUnit')" title=" 保险公司" :content="listInsuredUnit"></yhm-radiofilter>
        <yhm-radiofilter :before="insuredUnitBefore" @initData="initChoose('realState')" title=" 状态" :content="listRealState"></yhm-radiofilter>
        <yhm-commonbutton value="打开选中信息" icon="i-selectAll" @call="selectedList" :show="isSelected" category="three"></yhm-commonbutton>
      </template>

      <template #operateMore>
        <yhm-radiofilter :before="insuredUnitBefore" @initData="initChoose('accountsReceivableDate')" title="时间" :content="listAccountsReceivableDate"></yhm-radiofilter>
        <div :class="{customTimeShow:timeShow,customTimeHide:!timeShow}" >
          <yhm-form-date v-show="dateShow" title="开始时间" @call="dateSelection(startDate,endDate)" style="width: 350px;" :value="startDate" id="startDate" position="t"></yhm-form-date>
          <yhm-form-date v-show="dateShow" title="结束时间" @call="dateSelection(startDate,endDate)" style="width: 350px;margin-left: 30px;" :value="endDate" id="endDate" position="t"></yhm-form-date>
        </div>
      </template>
      <template #listHead>
        <yhm-managerth style="width: 40px;" title="选择"></yhm-managerth>
        <yhm-managerth style="width: 40px;" title="查看"></yhm-managerth>
        <yhm-managerth title="投保日期" value="insuredDate"></yhm-managerth>
        <yhm-managerth title="车牌号" value="plate"></yhm-managerth>
        <yhm-managerth title="联系人" value="contactName"></yhm-managerth>
        <yhm-managerth title="保险公司" value="insuredUnit"></yhm-managerth>
        <yhm-managerth style="color: #972CB1" title="A" subtitle="(商业险返利金额" ></yhm-managerth>
        <yhm-managerth style="color: #0c8484" title="B" subtitle="+ 第三方返利金额" ></yhm-managerth>
        <yhm-managerth style="color: #0808D6" title="C" subtitle="+ 交强险返利金额"></yhm-managerth>

        <yhm-managerth style="color: #8B1A1A" @call="actualEvent" v-if="isActual" title="A+B+C"  subtitle="= 应收账款金额)"></yhm-managerth>
        <yhm-managerth @call="realEvent" v-if="isReal" title="应收账款天数"></yhm-managerth>
        <yhm-managerth title="预计盈亏"></yhm-managerth>
        <yhm-managerth title="实时盈亏"></yhm-managerth>
        <yhm-managerth title="使用的优惠券金额"></yhm-managerth>
<!--        <yhm-managerth title="申请编号" value="numbering"></yhm-managerth>-->
        <yhm-managerth title="保单号" value="numbering"></yhm-managerth>
        <yhm-managerth style="width: 150px;" title="状态" ></yhm-managerth>
      </template>

      <!--数据明细-->
      <template #listBody>
        <tr :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]" v-for="(item,index) in content" :key="index">
          <yhm-manager-td-checkbox :value="item" ></yhm-manager-td-checkbox>
          <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>
          <yhm-manager-td-date :value="item.insuredDate"></yhm-manager-td-date>
          <yhm-manager-td @click="plateView(item)" :value="item.plate"></yhm-manager-td>
          <yhm-manager-td @click="contactView(item)" :value="item.contactName"></yhm-manager-td>
          <yhm-manager-td-psd @click="insuredUnitView(item)" :list="insuredUnitList" :value="item.insuredUnit"></yhm-manager-td-psd>
          <yhm-manager-td-money style="color: #972CB1" :value="item.businessReceivableMoney"></yhm-manager-td-money>
          <yhm-manager-td-money style="color: #0c8484" :value="item.tripartiteMoney"></yhm-manager-td-money>
          <yhm-manager-td-money style="color: #0808D6" :value="item.forceReceivableMoney"></yhm-manager-td-money>

          <yhm-manager-td-money  v-show="isActual"  @click="listExpectedView(item)" :value="item.receivable" style="color: #2c9208;font-weight:bold; font-size: 15px" ></yhm-manager-td-money>
          <yhm-manager-td-center v-show="isReal"  @click="listExpectedView(item)" :value="item.receivableDate+'天'" ></yhm-manager-td-center>
          <yhm-manager-td-money  @click="listPolicyExpectedView(item)" :value="item.actualProfitLoss" :style="{'color':item.actualProfitLoss>=0?'#2c9208':'#f00'}"  ></yhm-manager-td-money>
          <yhm-manager-td-money  @click="listPolicyExpectedView(item)" :value="item.realTimeProfitLoss" :style="{'color':item.realTimeProfitLoss>=0?'#2c9208':'#f00'}"></yhm-manager-td-money>
          <yhm-manager-td-money :value="item.couponMoney"></yhm-manager-td-money>
          <yhm-manager-td-operate>
            <yhm-manager-td-operate-button v-show="item.boNumbering === ''?true:false" color="#1A1AE6" icon="delete" value="待上传保单"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button v-show="item.boNumbering !=''?true:false"  @click="addPNumbering(item)" icon="i-invoiceView" value="查看保单" color="#fd6802"></yhm-manager-td-operate-button>
          </yhm-manager-td-operate>
          <yhm-manager-td-state :value="item.statusVal" :state-color="item.statusColor" :state-img="item.statusImg"></yhm-manager-td-state>
        </tr>
      </template>

      <!--数据空提示-->
      <template #empty>
        <span class="m_listNoData" v-show="empty">暂时没有数据</span>
      </template>
      <template #total>
        <div class="listTotalCrente m_list" style="width: 1200px">
          <div class="listTotalLeft">
            <span class="test"></span>
            <span class="test">金额</span>
            <span class="test">条数</span>
          </div>
          <div>
          <table width="100%" cellpadding="0" cellspacing="0" class="m_content_table m_content_total_table">
            <thead>
            <tr>
              <yhm-managerth style="width: 100px;" before-color="#49a9ea" title="" before-title="(商业险返利"></yhm-managerth>
              <yhm-managerth style="width: 100px;" before-color="#49a9ea" title="" before-title="+交强险返利"></yhm-managerth>
              <yhm-managerth style="width: 100px;" before-color="#49a9ea" title="" before-title="+第三方返利"></yhm-managerth>
              <yhm-managerth style="width: 100px;" before-color="#49a9ea" title="" before-title="=应收账款总额)"></yhm-managerth>
              <yhm-managerth style="width: 100px;" before-color="#34AA4B" title="" before-title="已收账款金额"></yhm-managerth>
              <yhm-managerth style="width: 100px;" before-color="#FF0000" title="" before-title="未收账款金额"></yhm-managerth>
              <yhm-managerth style="width: 100px;" before-color="#49a9ea" title="" before-title="预计盈亏"></yhm-managerth>
              <yhm-managerth style="width: 100px;" before-color="#49a9ea" title="" before-title="实时盈亏"></yhm-managerth>
              <yhm-managerth style="width: 100px;" before-color="#FF0000" title="" before-title="优惠券金额"></yhm-managerth>
              <yhm-managerth style="width: 100px;" before-color="#FF0000" title="" before-title="退回优惠金额"></yhm-managerth>
              <yhm-managerth style="width: 100px;" before-color="#FF0000" title="" before-title="退保保费金额"></yhm-managerth>
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
          value: '3', //默认为空
          list: []
        },
        listRealState:{
          value: '0', //默认为空
          list: []
        },
        totalMoney:'0',
        Count :'0',
        totalList:[],
        isSelected:false,
        contentTotal: [],
        isActual: true,
        isReal: false,
        isFrame:true,
        timeShow:false,//自定义时间选择 显示隐藏
        dateShow:false,//时间组件 显示隐藏
        startDate:'',
        endDate:'',
        start:' 00:00:00',//开始时的时分秒
        finish:' 23:59:59',//结束时的时分秒
      }
    },
    methods:{
      dateSelection(start,finish){//选择时间段
        if(start!=''&&finish!=''){
          this.initPageData()
        }
      },
      addPNumbering(item){
        let title = '查看保单信息'
        let url = '/poNumberView?id='+item.boNumbering+'&ownerID='+item.boNumbering

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
      listPolicyExpectedView(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '550',
          url: '/policyExpectedView?id=' + item.id,
          title: '查看盈亏明细',
          closeCallBack: (data)=>{
            if(data){
              this.initPageData(false)
            }
          }
        })
      },
      actualEvent(){
        this.isActual = false
        this.isReal = true
      },
      realEvent(){
        this.isReal = false
        this.isActual = true
      },
      listExpectedView(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '450',
          url: '/accountExpectedView?id=' + item.id,
          title: '查看应收账款',
          closeCallBack: (data)=>{
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
          url: '/policyView?id=' + item.id,
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
        if (op === 'realState') {
          this.selectValue = []
        }

        if (this.listAccountsReceivableDate.value==9){
          this.timeShow = true
          setTimeout(()=>{
            this.dateShow = true
          },300)
          return
        }else{
          if (op === 'accountsReceivableDate') {
            this.timeShow = false
            setTimeout(()=>{
              this.dateShow = false
            },300)
            this.selectValue = []
          }
        }


        // this.initPageData(false)
      },
      //搜索
      initPageData (initValue) {
        let params = {}
        if (initValue) {
          params = {
            insuredUnit:this.listInsuredUnit.value,
            accountsReceivableDate:this.listAccountsReceivableDate.value,
            realState:this.listRealState.value,
            startDate:this.startDate+this.start,
            endDate:this.endDate+this.finish
          }
        } else {
          params = {
            insuredUnit:this.listInsuredUnit.value,
            accountsReceivableDate:this.listAccountsReceivableDate.value,
            realState:this.listRealState.value,
            startDate:this.startDate+this.start,
            endDate:this.endDate+this.finish
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
            this.listRealState=data.realStatePsd


          }
        })
      }
    }
  }
</script>

<style  lang="less" scoped>

  .customTimeShow{
    width: 100%;
    height: 50px;
    position: relative;
    z-index: 2;
    display: flex;

    /*overflow: hidden;*/
    transition: all 0.5s;
  }
  .customTimeHide{
    width: 100%;
    height: 0px;
    display: flex;
    /*overflow: hidden;*/
    transition: all 0.5s;
  }
</style>
