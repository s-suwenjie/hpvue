<template>
  <div>
    <yhm-app-structure-top-tap :list="topMenu" :select-item="selectMenu" :is-scroll="true">
      <yhm-app-structure-top-tap-menu :list="topMenu" :select-item="selectMenu" v-for="(item,index) in topMenu" :key="index" @call="backEvent(item.title)" :title="item.title" :is-scroll="true"></yhm-app-structure-top-tap-menu>
    </yhm-app-structure-top-tap>
    <yhm-app-scroll :is-navigation="true" :select-navigation="selectMenu" :select-navigation-list="topMenu" :empty="false" :init-load-finish="loadFinish" @call="selectEvent">
      <yhm-app-structure-menu-group :title="item.title" v-for="(item,index) in topMenu" :key="index">
        <yhm-app-menu  v-for="(menu,i) in item.menu" :key="i + '_' + index" :name="menu.name" :url="menu.imgUrl" :num="menu.num" @call="gotoEvent(menu.url)"></yhm-app-menu>
      </yhm-app-structure-menu-group>
    </yhm-app-scroll>
    <TabBar></TabBar>
  </div>
</template>

<script>
  import TabBar from './common/appTabBar'
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
        paymentPlan:'',      //付款计划条数
        paymentApply:'',     //付款条数
        reimbursement:'',    //报销条数
        purchase:'',          //采购条数
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
              num:'',
            },
            {
              name:'付款申请',
              imgUrl:'/UploadFile/m_image/menu/paymentApply.svg',
              url:'/homeApp/m_paymentApplyManager?isFinish=1',
              num:'',
            },
            {
              name:'报销申请',
              imgUrl:'/UploadFile/m_image/menu/reimbursement.svg',
              url:'/homeApp/m_reimbursementManager?isFinish=1',
              num:'',
            },
            {
              name:'采购计划',
              imgUrl:'/UploadFile/m_image/menu/paymentBuy.svg',
              url:'/homeApp/m_approvalPurchaseManager?isFinish=1',
              num:'',
            },
          ]
        },{
          title: '财务管理',
          menu:[
            {
              name:'付款计划',
              imgUrl:'/UploadFile/m_image/menu/paymentPlan.svg',
              url:'/homeApp/m_finPaymentPlanManager?isFinish=1'
            },
            {
              name:'付款申请',
              imgUrl:'/UploadFile/m_image/menu/paymentApply.svg',
              url:'/homeApp/m_finPaymentApplyManager?isFinish=1'
            },
            {
              name:'报销申请',
              imgUrl:'/UploadFile/m_image/menu/reimbursement.svg',
              url:'/homeApp/m_finReimbursementManager?isFinish=1'
            },
            {
              name:'资金动态',
              imgUrl:'/UploadFile/m_image/menu/fundDynamicsCharts.svg',
              url:'/homeApp/m_fundDynamicsChartView?isFinish=1&id=1'
            }
          ]
        }]
      }
    },
    methods:{
      // gotoPaymentPlan(){
      //   this.$router.push("/homeApp/m_myPaymentPlanManager?isFinish=1")
      // },
      // gotoPaymentApply(){
      //   this.$router.push("/homeApp/m_paymentApplyManager?isFinish=1")
      // },
      // gotoReimbursement(){
      //   this.$router.push("/homeApp/m_reimbursementManager?isFinish=1")
      // },
      // gotoPurchase(){
      //   this.$router.push("/homeApp/m_approvalPurchaseManager?isFinish=1")
      // },
      // gotoFundDynamicsCharts(){
      //   this.$router.push("/homeApp/m_fundDynamicsChartView?isFinish=1&id=1")
      // },
      // gotoFinPaymentPlan(){
      //   this.$router.push("/homeApp/m_finPaymentPlanManager?isFinish=1")
      // },
      // gotoFinPaymentApply(){
      //   this.$router.push("/homeApp/m_finPaymentApplyManager?isFinish=1")
      // },
      // gotoFinReimbursement(){
      //   this.$router.push("/homeApp/m_finReimbursementManager?isFinish=1")
      // },
      backEvent(item){
        this.selectMenu = item
      },
      gotoEvent(url){
        this.$router.push(url)
      },
      selectEvent(val){
        this.selectMenu = this.topMenu[val].title
      }
    },
    created () {
      setTimeout(() => {
        this.loadFinish = !this.loadFinish
      },200)
      this.ajaxJson({
        url: '/PersonOffice/m_approvalManagerAllNumber',
        loading:'0',
        call: (data) => {
          let menuNum = this.topMenu[0].menu
          for(let i in menuNum){
            menuNum[0].num = data.payPlan
            menuNum[1].num = data.payment
            menuNum[2].num = data.reimbursements
            menuNum[3].num = data.purchase
          }
        }
      })
    }
  }
</script>
<style lang="less">/*适配vant下tabbar组件(不能使用自动适配,pc端会乱)*/
@rem:375/10rem;
.van-tabbar{
  border-radius: 8/@rem 8/@rem 0 0;
  height: 50/@rem !important;
  border-top: 1/@rem solid #bfbfbf;
}
.van-tabbar-item{
  height: 50/@rem;
  font-size: 12/@rem;
  .van-tabbar-item__text{
    font-size: 12/@rem;
  }
  .van-tabbar-item__icon{
    margin-bottom: 2/@rem;
  }
}
.van-tabbar-item__icon i{
  font-size: 19/@rem;
}
</style>
<style scoped>

</style>
