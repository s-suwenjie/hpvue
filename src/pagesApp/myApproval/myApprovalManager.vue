<template>
  <div>
    <yhm-app-structure-menu-group title="我的审批">
      <yhm-app-menu @call="gotoPaymentPlan" name="付款计划" url="/UploadFile/m_image/menu/paymentPlan.svg" :num="paymentPlan"></yhm-app-menu>
      <yhm-app-menu @call="gotoPaymentApply" name="付款申请" url="/UploadFile/m_image/menu/paymentApply.svg" :num="paymentApply"></yhm-app-menu>
      <yhm-app-menu @call="gotoReimbursement" name="报销申请" url="/UploadFile/m_image/menu/reimbursement.svg" :num="reimbursement"></yhm-app-menu>
      <yhm-app-menu @call="gotoPurchase" name="采购计划" url="/UploadFile/m_image/menu/paymentBuy.svg" :num="purchase"></yhm-app-menu>
    </yhm-app-structure-menu-group>
    <yhm-app-structure-menu-group title="财务">
      <yhm-app-menu @call="gotoFinPaymentPlan" name="付款计划" url="/UploadFile/m_image/menu/paymentPlan.svg"></yhm-app-menu>
      <yhm-app-menu @call="gotoFinPaymentApply" name="付款申请" url="/UploadFile/m_image/menu/paymentApply.svg"></yhm-app-menu>
      <yhm-app-menu @call="gotoFinReimbursement" name="报销申请" url="/UploadFile/m_image/menu/reimbursement.svg"></yhm-app-menu>
      <yhm-app-menu @call="gotoFundDynamicsCharts" name="资金动态" url="/UploadFile/m_image/menu/fundDynamicsCharts.svg"></yhm-app-menu>
    </yhm-app-structure-menu-group>
  </div>
</template>

<script>
  export default {
    name: 'myApprovalManager',
    data(){
      return{
        paymentPlan:'',      //付款计划条数
        paymentApply:'',     //付款条数
        reimbursement:'',    //报销条数
        purchase:''          //采购条数
      }
    },
    methods:{
      gotoPaymentPlan(){
        this.$router.push("/homeApp/m_myPaymentPlanManager?isFinish=1")
      },
      gotoPaymentApply(){
        this.$router.push("/homeApp/m_paymentApplyManager?isFinish=1")
      },
      gotoReimbursement(){
        this.$router.push("/homeApp/m_reimbursementManager?isFinish=1")
      },
      gotoPurchase(){
        this.$router.push("/homeApp/m_approvalPurchaseManager?isFinish=1")
      },
      gotoFundDynamicsCharts(){
        this.$router.push("/homeApp/m_fundDynamicsChartView?isFinish=1&id=1")
      },
      gotoFinPaymentPlan(){
        this.$router.push("/homeApp/m_finPaymentPlanManager?isFinish=1")
      },
      gotoFinPaymentApply(){
        this.$router.push("/homeApp/m_finPaymentApplyManager?isFinish=1")
      },
      gotoFinReimbursement(){
        this.$router.push("/homeApp/m_finReimbursementManager?isFinish=1")
      },
    },
    created () {
      this.ajaxJson({
        url: '/PersonOffice/m_approvalManagerAllNumber',
        loading:'0',
        call: (data) => {
          this.paymentPlan = data.payPlan
          this.paymentApply = data.payment
          this.reimbursement = data.reimbursements
          this.purchase = data.purchase
        }
      })
    }
  }
</script>

<style scoped>

</style>
