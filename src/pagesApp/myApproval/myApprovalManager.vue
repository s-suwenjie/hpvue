<template>
  <div>
    <yhm-app-structure-menu-group title="我的审批" v-if="myApprovalShow">
      <yhm-app-menu :name="item.name" @call="goto(item)" v-for="(item,index) in topMenu[0].menu" :key="index" v-if="routerList[index].id==item.id&&routerList[index].state=='1'" :url="item.imgUrl" :num="cornerMark[index]"></yhm-app-menu>
    </yhm-app-structure-menu-group>
    <yhm-app-structure-menu-group title="财务" v-if="financeShow">
      <yhm-app-menu  :name="item.name" @call="goto(item)" v-for="(item,index) in topMenu[1].menu" :key="index"  :id="item.id" :class="finance[index].id"  :url="item.imgUrl"></yhm-app-menu>
<!--      <yhm-app-menu @call="gotoFundDynamicsCharts" name="资金动态" url="/UploadFile/m_image/menu/fundDynamicsCharts.svg" :num="prettyCashs"></yhm-app-menu>-->
<!--      <yhm-app-menu @call="gotoOrderSystem" name="点餐系统" url="/UploadFile/m_image/menu/orderSystem.svg"></yhm-app-menu>-->
<!--      <yhm-app-menu @call="gotoParticular" name="收支明细" url="/UploadFile/m_image/menu/fundDynamicsCharts.svg"></yhm-app-menu>-->
    </yhm-app-structure-menu-group>
<!--    <yhm-app-structure-top-tap :list="topMenu" :select-item="selectMenu" :is-scroll="true">-->
<!--      <yhm-app-structure-top-tap-menu :list="topMenu" :select-item="selectMenu" v-for="(item,index) in topMenu" :key="index" @call="backEvent(item.title)" :title="item.title" :is-scroll="true"></yhm-app-structure-top-tap-menu>-->
<!--    </yhm-app-structure-top-tap>-->
<!--    <yhm-app-scroll :is-navigation="true" :select-navigation="selectMenu" :select-navigation-list="topMenu" :empty="false" :init-load-finish="loadFinish" @call="selectEvent">-->
<!--      <yhm-app-structure-menu-group :title="item.title" v-for="(item,index) in topMenu" :key="index">-->
<!--        <yhm-app-menu  v-for="(menu,i) in item.menu" :key="i + '_' + index" :name="menu.name" :url="menu.imgUrl" :num="menu.num" @call="gotoEvent(menu.url)"></yhm-app-menu>-->
<!--      </yhm-app-structure-menu-group>-->
<!--    </yhm-app-scroll>-->
    <TabBar></TabBar>
  </div>
</template>

<script>
  import TabBar from '../common/appTabBar'
  export default {
    components: {
      TabBar
    },
    provide(){
      return{
        p____page:this
      }
    },
    name: 'myApprovalManager',
    data(){
      return{
        routerList:[{ id:'' },{ id:'' },{ id:'' },{ id:'' }],
        finance:[{ id:'' },{ id:'' },{ id:'' }],
        myApprovalShow:true,
        financeShow:true,
        myApproval:[],
        cornerMark: [],//我的审批 角标数组
        loadFinish:true,
        active:0,
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
            // {
            //   name:'资金动态',
            //   imgUrl:'/UploadFile/m_image/menu/fundDynamicsCharts.svg',
            //   url:'/homeApp/m_fundDynamicsChartView?isFinish=1&id=1'
            // }
          ]
        }]
      }
    },
    methods:{
      goto(item){//跳转
        this.$router.push(item.url)
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
        if(index=='0'){
          if(maxStr=='0'&&maxValue=='4'){
            this.myApprovalShow = false
          }
        }else if(index=='1'){
          if(maxStr=='0'&&maxValue=='3'){
            this.financeShow = false
          }
        }
      },
      routerListData(){
        this.ajaxJson({
          url: '/SysManager/m_getPurviewUsers',
          call: (data) => {
            this.routerList = data
            for (let i=0; i<=data.length; i++){
              if(i<='3'){
                this.myApproval.push(data[i].state)
                this.num(this.myApproval,'0')
              }
              if(i>'3'&&i<'7'){
                this.finance.push(data[i].state)
                this.num(this.finance,'1')
              }
            }
          }
        })
      }
    },
    created () {
      this.routerListData()
      setTimeout(() => {
        this.loadFinish = !this.loadFinish
      },200)
      this.ajaxJson({
        url: '/PersonOffice/m_approvalManagerAllNumber',
        loading:'0',
        call: (data) => {
          let menuNum = this.topMenu[0].menu
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
          }
        }
      })

    }
  }
</script>
<style scoped>

</style>
