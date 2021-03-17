<template>
  <div>
    <yhm-managerpage category="1">
      <!--导航条-->
      <template #navigationTab>
        <a class="menuTabDiv" href="/Fin/_bankDetailManager?menuType=1">收支明细</a>
        <router-link class="menuTabDiv" :to="{path:'/home/viewManager/paymentPlanViewManager'}">付款计划</router-link>
        <router-link class="menuTabDiv" :to="{path:'/home/viewManager/paymentApplyViewManager'}">付款申请</router-link>
        <router-link class="menuTabDiv" :to="{path:'/home/viewManager/reimbursementViewManager'}">报销申请</router-link>
        <router-link class="menuTabDiv" :to="{path:'/home/viewManager/finReimbursementDetailManager?type=1'}">特殊报销</router-link>
        <router-link class="menuTabDiv" :to="{path:'/home/viewManager/finPrettyCashsManagerAll'}">备用金</router-link>
        <router-link class="menuTabDiv" :to="{path:'/home/bankDetailRenewalManager'}">支付续保费</router-link>
        <router-link class="menuTabDiv" :to="{path:'/home/BankDetailRebateManager'}">支付客户返利</router-link>
        <router-link class="menuTabDiv" :to="{path:'/home/finPurchaseManager'}">采购计划</router-link>
        <router-link class="menuTabDiv menuTabActive" :to="{path:'/home/finBillingManager'}">保险保单</router-link>
      </template>
      <!--操作区-->
      <template #operate>
<!--        <yhm-commonbutton :value="choose?'收起筛选':'展开筛选'" :icon="choose?'btnUp':'btnDown'" @call="switchChoose()"></yhm-commonbutton>-->
        <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initPageData(false)"></yhm-managersearch>

        <yhm-radiofilter :before="insuredUnitBefore" @initData="initChoose('insuredUnit')" title=" 保险公司" :content="listInsuredUnit"></yhm-radiofilter>
        <yhm-radiofilter :before="insuredUnitBefore" @initData="initChoose('salsesman')" title="业务员" :content="listSalsesman"></yhm-radiofilter>
      </template>
      <!--筛选区-->
      <template #operateMore>
        <yhm-radiofilter :before="insuredUnitBefore" @initData="initChoose('accountsReceivableDate')" title="时间" :content="listAccountsReceivableDate"></yhm-radiofilter>
        <div :class="{customTimeShow:timeShow,customTimeHide:!timeShow}" >
          <yhm-form-date v-show="dateShow" title="开始时间" @call="dateSelection(startDate,endDate)" style="width: 350px;" :value="startDate" id="startDate" position="t"></yhm-form-date>
          <yhm-form-date v-show="dateShow" title="结束时间" @call="dateSelection(startDate,endDate)" style="width: 350px;margin-left: 30px;" :value="endDate" id="endDate" position="t"></yhm-form-date>
        </div>
      </template>
      <!--数据表头-->
      <template #listHead>
        <yhm-managerth  style="width: 40px;" title="选择"></yhm-managerth>
        <yhm-managerth  style="width: 40px;" title="查看"></yhm-managerth>
        <yhm-managerth  style="width: 130px;" title="业务员" value="salsesman"></yhm-managerth>
        <yhm-managerth  style="width: 130px;" title="车牌号" value="plate"></yhm-managerth>
        <yhm-managerth  style="width: 100px;" title="联系人" value="contactName"></yhm-managerth>
        <yhm-managerth  style="width: 100px;"  title="被保险人" value="beinsuredName"></yhm-managerth>
        <yhm-managerth  title="投保日期" value="insuredDate"></yhm-managerth>
        <yhm-managerth  title="保险公司" value="insuredUnit"></yhm-managerth>
        <yhm-managerth  style="width: 100px;" title="投保类型" value="insuredTypeVal"></yhm-managerth>
        <yhm-managerth  style="width: 100px;" title="保费合计" value="premiumsTotal"></yhm-managerth>
        <yhm-managerth  style="width: 100px;" title="实收金额" value="receivedMoney"></yhm-managerth>
        <yhm-managerth  style="width: 100px;" title="审批信息" value="status"></yhm-managerth>
        <yhm-managerth title="保单号" value="numbering"></yhm-managerth>
        <yhm-managerth  title="状态" value="status"></yhm-managerth>
      </template>
      <!--数据明细-->
      <template #listBody>
        <tr :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]" v-for="(item,index) in content" :key="index">
          <yhm-manager-td-checkbox :value="item"  ></yhm-manager-td-checkbox>
          <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>
          <yhm-manager-td :value="item.salsesman"></yhm-manager-td>
          <yhm-manager-td @click="plateView(item)" :value="item.plate"></yhm-manager-td>
          <yhm-manager-td  @click="contactView(item)" :value="item.contactName" ></yhm-manager-td>
          <yhm-manager-td  :tip="item.notEqual==='0'?false:true" :tip-show="true" tip-value="被保险人与车主不一致" @click="personView(item)" :value="item.beinsuredName" >
            <span v-if="item.notEqual==='0'?false:true" style=" color: #0b7cca;font-size: 18px;" class="uniE9A8 managerIcon"></span>
          </yhm-manager-td>
          <yhm-manager-td-date :value="item.insuredDate" ></yhm-manager-td-date>
          <yhm-manager-td-psd  :list="insuredUnitList" :value="item.insuredUnit"></yhm-manager-td-psd>
          <yhm-manager-td-center :value="item.insuredTypeVal"></yhm-manager-td-center>
          <yhm-manager-td-money :value="item.premiumsTotal"></yhm-manager-td-money>
          <yhm-manager-td-money :value="item.receivedMoney"></yhm-manager-td-money>
          <!--          <yhm-manager-td :value="item.statusVal==='部门审批中'?item.causeList[0].insuranceFormulatorName:'-&#45;&#45;&#45;&#45;'"></yhm-manager-td>-->
          <yhm-manager-td-leaveword @iconClick="listDetailsView(item)" :leave-word-show="item.status === '-1'?true:false"></yhm-manager-td-leaveword>
          <yhm-manager-td-operate>
            <yhm-manager-td-operate-button v-show="item.poNumber === ''?true:false"  icon="i-export" value="待上传保单"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button v-show="item.poNumber !=''?true:false"  @click="addPNumbering(item)" :no-click="item.poNumber === '作废'?true:false" icon="i-invoiceView" value="查看保单" color="#fd6802"></yhm-manager-td-operate-button>
          </yhm-manager-td-operate>

          <yhm-manager-td-state @click="appPay(item)" :value="item.statusVal" :state-color="item.statusColor" :state-img="item.statusImg"></yhm-manager-td-state>
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
    name: 'finBillingManager',
    mixins: [managermixin],
    data(){
      return{
        insuredUnitBefore:'0',// 默认选择状态为可以选择，1为不可以选择
        listInsuredUnit:{
          value: '', //默认为空
          list: []
        },
        insuredUnitList:[],
        listSalsesman:{
          value: '', //默认为空
          list: []
        },
        salsesmanList:[],
        listAccountsReceivableDate:{
          value: '', //默认为空
          list: []
        },
        isPoNumber:false,
        isAppPayment:false,
        isApp:false,
        isPersonTip:false,
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
        let url = '/poNumberView?id='+item.poNumber+'&ownerID='+item.poNumber

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
      listDetailsView(item){
        this.$dialog.OpenWindow({
          width: '650',
          height: '300',
          title: '查看审批留言信息',
          url:'/approvalMessage?id='+item.id,
          closeCallBack: (data)=>{
            if(data){
            }
          }
        })
      },
      appPay(item){
        if (item.statusVal==='返利审批中'||item.statusVal==='返利拨款中') {    //待完善
          this.$dialog.OpenWindow({
            width: '1050',
            height: '750',
            url: '/paymentApplyFormView?id=' + item.cashID +'&isState=1&isFinish=0',
            title: "查看付款申请信息",
            closeCallBack: () => {
              this.initPageData(false)
            }
          })
        }
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
      personView(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '690',
          url:'/personView?id=' + item.beinsuredID+'&isBilling=0',
          title:'查看被保险人信息',
          closeCallBack:(data) =>{
            if(data){
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




      listView(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '680',
          url: '/billingView?id=' + item.id+'&status='+item.status,
          title: '查看保单信息',
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
          this.initPageData(false)
        }
        if (op === 'salsesman') {
          this.selectValue = []
          this.initPageData(false)
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

            this.initPageData(false)
          }
        }
      },
      //搜索
      initPageData (initValue) {
        let params = {}

        if (initValue) {
          params = {
            insuredUnit:this.listInsuredUnit.value,
            salsesmanID:this.listSalsesman.value,
            startDate:this.startDate+this.start,
            endDate:this.endDate+this.finish,
            accountsReceivableDate:this.listAccountsReceivableDate.value,
          }
        } else {
          params = {
            insuredUnit:this.listInsuredUnit.value,
            salsesmanID:this.listSalsesman.value,
            startDate:this.startDate+this.start,
            endDate:this.endDate+this.finish,
            accountsReceivableDate:this.listAccountsReceivableDate.value,
          }
        }
        this.init({
          initValue:initValue,
          url: '/Insurance/finBillingManager',
          data:params,
          all:(data) =>{
            //不管是不是初始化都需要执行的代码

          },
          init:(data)=>{
            //初始化时需要执行的代码
            // 这边初始化筛选信息
            this.listInsuredUnit=data.insuredUnitPsd
            this.insuredUnitList=data.insuredUnitList
            this.listSalsesman=data.salsesmanPsd
            this.listAccountsReceivableDate=data.accountsReceivableDatePsd
          }
        })
      }
    },

  }
</script>

<style scoped>
  .managerIcon{
    position: absolute;
    right: 4px;
  }
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



