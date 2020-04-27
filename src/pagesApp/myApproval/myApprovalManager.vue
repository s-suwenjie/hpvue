<template>
  <div>
    <appScroll :list="navigationList">
      <template #scroll0>
        <yhm-app-structure-menu-group title="我的审批" v-if="myApprovalShow">
          <yhm-app-menu :name="item.name" @call="goto(item)" v-for="(item,index) in topMenu[0].menu" :key="index" v-show="routerList[index].id==item.id&&routerList[index].state=='1'" :url="item.imgUrl" :num="cornerMark[index]"></yhm-app-menu>
        </yhm-app-structure-menu-group>
      </template>
      <template #scroll1>
        <yhm-app-structure-menu-group title="财务管理" v-if="financeShow">
          <yhm-app-menu  :name="item.name" @call="goto(item)" v-for="(item,index) in topMenu[1].menu" :key="index" v-show="financeList[index]==item.id&&finance[index]=='1'"  :url="item.imgUrl"></yhm-app-menu>
        </yhm-app-structure-menu-group>
      </template>
      <template #tabBar>
        <TabBar></TabBar>
      </template>
    </appScroll>
    <appToast :type="type" v-show="!appToastShow" :text="title" @login-success="appToastShow = $event"></appToast>

    <!--      <yhm-app-menu @call="goto('/homeApp/m_fundDynamicsChartView','0')" name="资金动态" url="/UploadFile/m_image/menu/fundDynamicsCharts.svg" :num="prettyCashs"></yhm-app-menu>-->
    <!--      <yhm-app-menu @call="goto('/homeApp/m_orderSystemMenu','0')" name="点餐系统" url="/UploadFile/m_image/menu/orderSystem.svg"></yhm-app-menu>-->
    <!--      <yhm-app-menu @call="goto('/homeApp/m_bankDetailCashierView','0')" name="收支明细" url="/UploadFile/m_image/menu/fundDynamicsCharts.svg"></yhm-app-menu>-->
  </div>
</template>

<script>
  import TabBar from '@/pagesApp/common/appTabBar'
  import appToast from '@/pagesApp/common/appToast'
  import appScroll from '@/pagesApp/common/appScrollToNavigation'
  import { appmanagermixin } from '@/assetsApp/app_manager.js'
  export default {
    mixins: [appmanagermixin],
    components: {
      TabBar,
      appToast,
      appScroll,

    },
    provide(){
      return{
        p____page:this
      }
    },
    name: 'myApprovalManager',
    data(){
      return{
        active:0,
        title:'',
        type:'loading',
        appToastShow:false,
        routerList:[{ id:'' },{ id:'' },{ id:'' },{ id:'' },{ id:'' },{ id:'' }],
        finance:[{ id:'' },{ id:'' },{ id:'' },{ id:'' }],
        prettyCashs:'',
        navigationList:['我的审批','财务管理'],
        financeList:[],
        myApprovalShow:true,
        insuranceShow:true,
        financeShow:true,
        insurance:'',//利率审批
        myApproval:[],
        cornerMark: [],//我的审批 角标数组
        loadFinish:true,
        selectMenu:'我的审批',
        topMenu:[{
          title: '我的审批',
          menu:[
            {
              name:'付款计划',
              imgUrl:'/UploadFile/m_image/menu/paymentPlan.svg',
              url:'/homeApp/m_myPaymentPlanManager?isFinish=1',
              id:'AA05FB98-153D-4BEB-8572-918ABDBC1487',
              num:'',
            },
            {
              name:'付款申请',
              imgUrl:'/UploadFile/m_image/menu/paymentApply.svg',
              url:'/homeApp/m_paymentApplyManager?isFinish=1',
              id:'FBE26E7F-7926-4E0B-B8DC-365BFA7D5CB6',
              num:'',
            },
            {
              name:'报销申请',
              imgUrl:'/UploadFile/m_image/menu/reimbursement.svg',
              url:'/homeApp/m_reimbursementManager?isFinish=1',
              id:'E81AACA5-6C87-4570-89FD-3271229FA365',
              num:'',
            },
            {
              name:'采购计划',
              imgUrl:'/UploadFile/m_image/menu/paymentBuy.svg',
              url:'/homeApp/m_approvalPurchaseManager?isFinish=1',
              id:'ABFCD5F9-1FB9-49C0-9405-E229239B4727',
              num:'',
            },
            {
              name:'备用金',
              imgUrl:'/UploadFile/m_image/menu/prettyCashs.svg',
              url:'/homeApp/m_approvalPrettyCashsManager?isFinish=1',
              id:'A3A1963C-27BF-4F7D-88CE-1750B238A71F',
            },
            {
              name:'保险审批',
              imgUrl:'/UploadFile/m_image/menu/insurance.svg',
              url:'/homeApp/m_interestRateManager?isFinish=1',
              id:'BBD4FB7A-3442-48BF-91CA-70208FBCC78C',
            },
          ]
        },{
          title: '财务管理',
          menu:[
            {
              name:'付款计划',
              imgUrl:'/UploadFile/m_image/menu/paymentPlan.svg',
              id:'A443CC74-E35D-4A92-A2BA-67CE5E5BC42E',
              url:'/homeApp/m_finPaymentPlanManager?isFinish=1'
            },
            {
              name:'付款申请',
              imgUrl:'/UploadFile/m_image/menu/paymentApply.svg',
              id:'0BAE7391-0462-4A78-A2C0-A38EADB522C4',
              url:'/homeApp/m_finPaymentApplyManager?isFinish=1'
            },
            {
              name:'报销申请',
              imgUrl:'/UploadFile/m_image/menu/reimbursement.svg',
              id:'00FFA132-FEA5-4618-8AAA-E1B4DEFCA4E4',
              url:'/homeApp/m_finReimbursementManager?isFinish=1'
            },
            {
              name:'备用金',
              imgUrl:'/UploadFile/m_image/menu/prettyCashs.svg',
              url:'/homeApp/m_finPrettyCashsManager?isFinish=1',
              id:'13264365-8109-49C1-8069-9344413F5519',
            },
            // {
            //   name:'资金动态',
            //   imgUrl:'/UploadFile/m_image/menu/fundDynamicsCharts.svg',
            //   url:'/homeApp/m_fundDynamicsChartView?isFinish=1&id=1'
            // }
          ]
        },
      ]}
    },
    methods:{
      goto(item,index){//跳转
        if(index=='0'){
          this.$router.push(item)
        }else{
          this.$router.push(item.url)
        }

      },
      num(arr,index){//计算某个值在数组中出现的最多和出现次数
        let obj = {};
        for (let i = 0; i < arr.length; i++) {
          if (!obj[arr[i]]) {
            obj[arr[i]] = 1;
          }
          else {
            obj[arr[i]]++
          }
        }
        let maxValue = 0;
        let maxStr = arr[0];
        for (let i in obj) {
          if (obj[i] > maxValue) {
            maxValue = obj[i];
            maxStr = i;
          }
        }
        let arrs = []
        arrs.push(maxStr)
        arrs.push(maxValue)
        return arrs
      },
      routerListData(){
        this.ajaxJson({
          url: '/SysManager/m_getPurviewUsers',
          loading:"0",
          call: (data) => {
            this.finance = []
            this.routerList = []
            this.routerList = data
            let arr = []
            for (let i=0; i<=data.length; i++){
              if(i<='5'){//权限接口返回的数据的索引值0-5是审批模块的
                this.myApproval.push(data[i].state)
                this.num(this.myApproval,'0')
                arr = this.num(this.myApproval,'0')
                // console.log(i,'操作',this.myApproval)
                setTimeout(()=> {
                  if(arr[0].maxStr=='0'&&arr[1].maxValue=='6'){
                    this.myApprovalShow = false
                  }else {this.myApprovalShow = true}
                  // console.log(this.num(this.myApproval, '0'))
                },0)
              }
              if(i>='6'&&i<'10'){//权限接口返回的数据的索引值6-10是财务管理模块的
                this.finance.push(data[i].state)
                this.financeList.push(data[i].id)
                // console.log(i,'财务',this.finance,this.financeList)
                this.num(this.finance,'1')
                arr = this.num(this.finance,'1')
                setTimeout(()=>{
                  if(arr[0].maxStr=='0'&&arr[1].maxValue=='4'){
                    this.financeShow = false
                  }else{this.financeShow = true}
                  // console.log(this.num(this.finance,'1'))
                },0)
              }
            }
          }
        })
      },
    },
    created () {
      this.routerListData()
      setTimeout(() => {
        this.loadFinish = !this.loadFinish
      },0)
      this.ajaxJson({
        url: '/PersonOffice/m_approvalManagerAllNumber',
        loading:"0",
        call: (data) => {
          let menuNum = this.topMenu[0].menu
          if(data !== ''){
            this.appToastShow = true
          }
          for(let i in menuNum){
            // this.paymentPlan = data.payPlan//付款计划条数
            // this.paymentApply = data.payment//付款申请
            // this.reimbursement = data.reimbursements//报销条数
            // this.purchase = data.purchase//采购计划
            this.prettyCashs = data.prettyCashs//
            this.cornerMark.push(data.payPlan)//付款计划条数
            this.cornerMark.push(data.payment)//付款申请
            this.cornerMark.push(data.reimbursements)//报销条数
            this.cornerMark.push(data.purchase)//采购计划
            this.cornerMark.push(data.prettyCashs)//备用金
            this.cornerMark.push(data.insurance)//保险审批
            // this.insurance = data.insurance//利率审批条数
          }
        }
      })

    }
  }
</script>
<style lang="less" scoped>

</style>
