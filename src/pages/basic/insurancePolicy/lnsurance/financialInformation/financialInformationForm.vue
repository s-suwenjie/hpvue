<template>
  <div class="f_main">
    <yhm-formbody>
      <template #title>添加信息</template>
      <template #control>
        <yhm-form-text placeholder="" title="保费合计" subtitle="" :value="premium" id="premium" ></yhm-form-text>
        <yhm-form-text placeholder=""  title="现金优惠" subtitle="" :value="cashDiscount" id="cashDiscount" rule="R0000"></yhm-form-text>
        <yhm-form-text placeholder="" title="现金优惠" subtitle="点位" :value="cashDiscountPoint" id="cashDiscountPoint" rule="R0000"></yhm-form-text>
        <yhm-form-text placeholder="" title="储值卡金额" subtitle="" :value="storeAmount" id="storeAmount" ></yhm-form-text>
        <yhm-form-text placeholder=""  title="储值卡金额" subtitle="点位" before-icon="rmb" :value="storeAmountPoint" id="storeAmountPoint"></yhm-form-text>
        <yhm-form-text placeholder="" title="实收金额" subtitle="" before-icon="rmb" :value="receivedAmount" id="receivedAmount"></yhm-form-text>
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
    name: 'financialInformationForm',
    mixins: [formmixin],
    data(){
      return{
        id:'',
        premium: '',//保费合计
        cashDiscount:'',//现金优惠
        cashDiscountPoint:'',//现金优惠点位
        storeAmount:'',//储值卡金额
        storeAmountPoint:'',//储值卡金额点位
        receivedAmount:'',//实收金额
      }
    },
    methods:{

      save() {
        if (this.validator()) {
          let params = {
            id: this.id,
            premium: this.premium,
            cashDiscount: this.cashDiscount,
            cashDiscountPoint: this.cashDiscountPoint,
            storeAmount: this.storeAmount,
            storeAmountPoint: this.storeAmountPoint,
            receivedAmount: this.receivedAmount,

          }
          this.ajaxJson({
            url: '/Basic/saveFinancialInformation',
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
        url: '/Basic/initFinancialInformationForm',
        all: (data) => {
        },
        add: (data) => {
          /* 需要添加的数据 */
        },
        look: (data) => {

          /* 需要查看的数据 */
          this.premium=data.premium //保费合计
          this.cashDiscount=data.cashDiscount     //现金优惠
          this.cashDiscountPoint=data.cashDiscountPoint   //现金优惠点位
          this.storeAmount=data.storeAmount //储值卡金额
          this.storeAmountPoint=data.storeAmountPoint     //储值卡金额点位
          this.receivedAmount=data.receivedAmount     //储值卡金额点位

        }
      })
    }
  }
</script>

<style scoped>

</style>
