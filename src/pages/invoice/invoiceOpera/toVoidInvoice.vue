<template>
  <div class="f_main">
    <yhm-formbody>
      <template #title>基本信息</template>
      <template #control>
        <yhm-form-select title="所属公司" :value="unit" id="unit" tip="value" rule="R0000" :no-click="true"></yhm-form-select>
        <yhm-form-text title="发票号码" :value="code" id="code" rule="R0000" no-edit="1"></yhm-form-text>
        <yhm-form-radio width="1" title="增票类型" :select-list="invoiceCategoryList" :value="invoiceCategory" id="invoiceCategory" rule="R0000" :no-edit="true"></yhm-form-radio>
        <yhm-form-radio title="发票面值" :select-list="maxValueList" :value="maxValue" id="maxValue" rule="R0000" :no-edit="true"></yhm-form-radio>
        <yhm-form-radio title="发票状态" :select-list="stateList" :value="state" id="state" rule="R0000" :no-edit="true"></yhm-form-radio>
        <yhm-form-date title="作废日期" :max="nowDate" :no-edit="isReason" :value="operatorDate" id="operatorDate" tip="value" rule="R0000" position="b"></yhm-form-date>
        <yhm-form-textarea title="作废原因" :no-edit="isReason?'1':''" :value="operatorReason" id="operatorReason" rule="R0000"></yhm-form-textarea>
      </template>
    </yhm-formbody>
    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn v-if="isBtn">
        <yhm-commonbutton value="保存" icon="btnSave" :flicker="true" @call="save()" category="one"></yhm-commonbutton>
      </template>
    </yhm-formoperate>
  </div>

</template>

<script>
  import { formmixin } from '@/assets/form.js'
  import { formatDate ,accAdd, guid,accMul} from '@/assets/common.js'
  export default {
    name: 'toVoidInvoice',
    mixins: [formmixin],
    data(){
      return{
        id: '',
        ownerID: '',
        unit: '',
        unitID: '',
        code: '',
        maxValue: '',
        maxValueList: [],
        invoiceCategory: '',
        invoiceCategoryList: [],
        state: '',
        stateList: [],
        operatorDate: '',
        nowDate: formatDate(new Date()),
        operatorReason: '',
        op: '',
        isBtn: true,
        isReason: false,
      }
    },
    methods: {
      initData(){
        this.init({
          url: '/Bill/invoiceDetailForm',
          all: (data)=>{

          },
          add: (data)=>{

          },
          look: (data)=>{
            this.id = data.id
            this.unit = data.unit
            this.unitID = data.unitID
            this.code = data.code
            this.maxValue = data.maxValuePsd.value
            this.maxValueList = data.maxValuePsd.list
            this.invoiceCategoryList = data.invoiceCategoryPsd.list
            this.invoiceCategory = data.invoiceCategoryPsd.value
            this.stateList = data.statePsd.list
            this.state = data.statePsd.value

            if(this.op === '1'){
              this.operatorReason = data.operatorReason
              this.operatorDate = data.operatorDate
              this.isBtn = false
              this.isReason = true
            }

          }
        })
      },
      save(){
        if(this.validator()){
          let params = {
            operatorDate: this.operatorDate,
            operatorReason: this.operatorReason,
            key: this.code
          }
          this.ajaxJson({
            url: '/Bill/invoiceInvalid',
            data: params,
            call: (data)=>{
              if(data.type === 0){
                this.$dialog.setReturnValue(this.id)
                this.$dialog.alert({
                  tipValue: data.message,
                  closeCallBack: ()=>{
                    this.$dialog.close()
                  }
                })
              }else{
                this.$dialog.alert({
                  alertImg: 'error',
                  tipValue: data.message
                })
              }
            }
          })
        }
      }
    },
    created () {
      this.setQuery2Value('op')
      this.initData()
    }
  }
</script>

<style scoped>

</style>
