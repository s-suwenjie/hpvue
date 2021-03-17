<template>
  <div  class="f_main">
    <yhm-formbody>
      <template #title>基本信息</template>
      <template #control>
        <yhm-form-date title="开票日期" :max="maxApplyDate" :value="deductionDate" id="deductionDate" rule="R0000"></yhm-form-date>
        <yhm-form-text title="发票金额" before-icon="rmb" @change="countTaxMoney" :value="money" id="money" rule="R0000"></yhm-form-text>
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
  import {formmixin} from '@/assets/form.js'
  import {number2chinese,accMul, accAdd, guid, formatTime, formatDate} from '@/assets/common.js'
  export default {
    name: 'deductionDateAndMoney',
    mixins: [formmixin],
    data() {
      return {
        ownerID:'',
        deductionDate:formatDate(new Date()),
        maxApplyDate:formatDate(new Date()),
        money:'',
        balance:'',
      }
    },

    created() {
      this.setQuery2Value('ownerID')
      let param={
        id:this.ownerID
      }
      this.ajaxJson({
        url: '/finance/inputTax/getDeductionMoney',
        data: param,
        call: (data) => {
          if(data){
            this.money=accAdd(data.taxMoney,-data.deductionMoney)
            this.balance=accAdd(data.taxMoney,-data.deductionMoney)
          }
        }
      })
    },
    methods:{
      countTaxMoney(){
        if(parseFloat(this.money)>parseFloat(this.balance)){
          this.$dialog.alert({
            tipValue: '输入金额有误!',
            width:300,
            alertImg: 'warn',
          })
          this.money=this.balance
        }
      },
      save(){
        let a = this.validator()
        if(parseFloat(this.money)>parseFloat(this.balance)){
          this.$dialog.alert({
            tipValue: '输入金额有误!',
            width:300,
            alertImg: 'warn',
          })
          return
        }
        if(a){
          let param={
            id:this.ownerID,
            deductionDate:this.deductionDate,
            deductionMoney:this.money,
          }
          this.ajaxJson({
            url: '/finance/inputTax/deductionMoneySave',
            data: param,
            call: (data) => {
              if(data.type===0){
                this.$dialog.setReturnValue(this.id)
                this.$dialog.alert({
                  tipValue: data.message,
                  closeCallBack: () => {
                    this.$dialog.close()
                  }
                })
              }else{
                this.$dialog.alert({
                  tipValue: data.message,
                  alertImg: 'error',
                  closeCallBack: () => {
                    this.$dialog.close()
                  }
                })
              }
            }
          })
        }
      }
    }
  }
</script>

<style scoped>

</style>
