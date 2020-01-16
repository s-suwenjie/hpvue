<template>
  <div>
    <yhm-app-structure-menu-group title="我的审批">
      <yhm-app-menu @call="gotoPaymentPlan" name="付款计划" url="/UploadFile/m_image/menu/paymentPlan.svg" :num="paymentPlan"></yhm-app-menu>
      <yhm-app-menu @call="gotoPaymentApply" name="付款申请" url="/UploadFile/m_image/menu/paymentApply.svg" :num="paymentApply"></yhm-app-menu>
      <yhm-app-menu @call="gotoReimbursement" name="报销申请" url="/UploadFile/m_image/menu/reimbursement.svg" :num="reimbursement"></yhm-app-menu>
      <yhm-app-menu @call="gotoPurchase" name="采购计划" url="/UploadFile/m_image/menu/paymentBuy.svg" :num="purchase"></yhm-app-menu>
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
        window.location = "/homeApp/m_myPaymentPlanManager?pageTableName=43"
      },
      gotoPaymentApply(){
        window.location = "/homeApp/m_paymentApplyManager?pageTableName=45"
      },
      gotoReimbursement(){
        // window.location = "/Com/m_approvalManager?pageTableName=40"
        this.$router.push("/homeApp/m_reimbursementManager?pageTableName=40")
      },
      gotoPurchase(){
        this.$router.push("/homeApp/m_approvalPurchaseManager?isFinish=1")
      }
    },
    created () {
      document.querySelector('body').setAttribute('style', 'margin: 0 auto; width: 100%; background:#f3f3f3; overflow-x: hidden;height: 100%;');

      this.ajaxJson({
        url: '/PersonOffice/approvalManagerAllNumber',
        loading:'0',
        call: (data) => {
          console.log(data)
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
