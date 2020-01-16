<template>
  <div class="f_main">
    <yhm-formbody>
      <template #title>添加信息</template>
      <template #control>
        <yhm-form-text placeholder="" title="商业险金额"  subtitle="" tip="value" before-icon="rmb" :value="businessAmount" id="businessAmount" rule="R3000"></yhm-form-text>
        <yhm-form-text placeholder=""  title="商业险" subtitle="保单号" :value="businessNumber" id="businessNumber" ></yhm-form-text>
        <yhm-form-text placeholder="" title="交强险金额" subtitle="" tip="value" before-icon="rmb" :value="strongAmount" id="strongAmount" rule="R3000"></yhm-form-text>
        <yhm-form-text placeholder="" title="交强险" subtitle="保单号" :value="strongNumber" id="strongNumber" ></yhm-form-text>
        <yhm-form-text placeholder="" title="车船税金额" subtitle="" tip="value" before-icon="rmb" :value="travelTax" id="travelTax" rule="R3000"></yhm-form-text>
        <yhm-form-text placeholder="" title="投保次数" subtitle="" :value="insuredTimes" id="insuredTimes" ></yhm-form-text>
        <yhm-form-radio title="是否贷款" :select-list="loanList" :value="loan" id="loan"></yhm-form-radio>
        <yhm-form-radio title="付款方式" :select-list="paymentList" :value="payment" id="payment"></yhm-form-radio>
        <yhm-form-radio title="续保渠道" width="1" :select-list="renewalList" :value="renewal" id="renewal"></yhm-form-radio>
        <yhm-form-radio title="投保类型" width="1" :select-list="insuredList" :value="insured" id="insured"></yhm-form-radio>
        <yhm-form-radio title="送单方式" :select-list="deliveryList" :value="delivery" id="delivery"></yhm-form-radio>
        <yhm-form-date title="投保日期" :value="insuredDate" id="insuredDate" position="u"  rule="R0000"></yhm-form-date>
        <yhm-form-date  title="商业险" subtitle="开始日期" :value="businessStartDate" id="businessStartDate" position="u"  rule="R0000" ></yhm-form-date>
        <yhm-form-date :min="businessStartDate"  title="商业险" subtitle="结束日期" :value="businessEndDate" id="businessEndDate" position="u"  rule="R0000"></yhm-form-date>
        <yhm-form-date title="交强险" subtitle="开始日期" :value="strongStartDate" id="strongStartDate" position="u"  rule="R0000"></yhm-form-date>
        <yhm-form-date :min="strongStartDate"  title="交强险" subtitle="结束日期" :value="strongEndDate" id="strongEndDate" position="u"  rule="R0000"></yhm-form-date>
      </template>
    </yhm-formbody>
    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn>
        <yhm-commonbutton value="保存" icon="btnSave" :flicker="true" @call="save()"></yhm-commonbutton>
      </template>
    </yhm-formoperate>
  </div>
</template>

<script>
  import { formmixin } from '@/assets/form.js'
  export default {
    name: 'policyInformationForm',
    mixins: [formmixin],
    data(){
      return {
        id:'',
        businessAmount:'',  //商业险金额
        businessNumber:'',  //商业险保单号
        strongAmount:'',    //交强险金额
        strongNumber:'',    //交强险保单号
        travelTax:'',       //车船税金额
        insuredTimes:'',    //投保次数
        loan:'',            //是否贷款
        loanList:[],
        payment:'',         //付款方式
        paymentList:[],
        renewal:'',         //续保渠道
        renewalList:[],
        insured:'',         //投保类型
        insuredList:[],
        delivery:'',        //送单方式
        deliveryList:[],
        insuredDate:'',     //投保日期
        businessStartDate:'',//商业险开始日期
        businessEndDate:'', //商业险结束日期
        strongStartDate:'', //交强险开始日期
        strongEndDate:'', //交强险结束日期
      }
    },
    methods:{

       save() {
         if (this.businessEndDate < this.businessStartDate) {
           this.businessEndDate == ''
           this.$dialog.alert({
             width: 300,
             tipValue: '结束日期必须大于开始日期！',
             alertImg: 'warn'
           })
           return
         }
        if (this.validator()) {
          let params = {
            id: this.id,
            businessAmount: this.businessAmount,
            businessNumber: this.businessNumber,
            strongAmount: this.strongAmount,
            strongNumber: this.strongNumber,
            travelTax: this.travelTax,
            insuredTimes: this.insuredTimes,
            loan: this.loan,
            payment:this.payment,
            renewal:this.renewal,
            insured:this.insured,
            delivery:this.delivery,
            insuredDate:this.insuredDate,
            businessStartDate:this.businessStartDate,
            businessEndDate:this.businessEndDate,
            strongStartDate:this.strongStartDate,
            strongEndDate:this.strongEndDate,

          }
          this.ajaxJson({
            url: '/Basic/savePolicyInformation',
            data: params,
            call: (data) => {
              if (data.type === 0) {
                this.$dialog.setReturnValue(this.id)
                this.$dialog.alert({
                  tipValue: data.message,
                  closeCallBack: () => {
                    this.$dialog.close()
                  }
                })
              }else if(data.type === 1){
                this.$dialog.alert({
                  alertImg:'warn',
                  tipValue: data.message
                })
              }
            }
          })
        }
      }
    },
    created () {
      this.setQuery2Value('id')
      this.init({
        url: '/Basic/initPolicyInformationForm',
        all: (data) => {

          this.loanList=data.loanPsd.list
          this.loan = data.loanPsd.value  //是否贷款

          this.paymentList=data.paymentPsd.list
          this.payment = data.paymentPsd.value  //付款方式

          this.renewalList=data.renewalPsd.list   //续保渠道
          this.renewal = data.renewalPsd.value

          this.insuredList=data.insuredPsd.list  //投保类型
          this.insured = data.insuredPsd.value

          this.deliveryList=data.deliveryPsd.list  //送单方式
          this.delivery = data.deliveryPsd.value


        },
        add: (data) => {
          /* 需要添加的数据 */
        },
        look: (data) => {
          /* 需要查看的数据 */
          this.businessAmount=data.businessAmount   //商业险金额
          this.businessNumber=data.businessNumber
          this.strongAmount=data.strongAmount       //交强险金额
          this.strongNumber=data.strongNumber
          this.travelTax=data.travelTax             //车船税金额
          this.insuredTimes=data.insuredTimes       //投保次数
          this.insuredDate=data.insuredDate         //投保日期
          this.businessStartDate=data.businessStartDate
          this.businessEndDate=data.businessEndDate
          this.strongStartDate=data.strongStartDate
          this.strongEndDate=data.strongEndDate

          this.loanList=data.loanPsd.list
          this.loan=data.loanPsd.value

          this.paymentList=data.paymentPsd.list
          this.payment=data.paymentPsd.value

          this.renewalList=data.renewalPsd.list   //续保渠道
          this.renewal = data.renewalPsd.value

          this.insuredList=data.insuredPsd.list  //投保类型
          this.insured = data.insuredPsd.value

          this.deliveryList=data.deliveryPsd.list  //送单方式
          this.delivery = data.deliveryPsd.value
        }
      })
    }
  }
</script>

<style scoped>

</style>
