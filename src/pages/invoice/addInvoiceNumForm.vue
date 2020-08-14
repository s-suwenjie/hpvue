<template>
  <div class="f_main">
    <yhm-formbody>
      <template #title>基本信息</template>
      <template #control>
        <yhm-form-text :show="isInvoiceNum" title="发票号码" :value="invoiceNum" id="invoiceNum" rule="R1900"></yhm-form-text>
        <yhm-form-text :show="isInvoiceFir" :title="isFirWord?'首张':''" subtitle="发票号码" :value="invoiceFir" id="invoiceFir" rule="R1900"></yhm-form-text>
        <yhm-form-text :show="isInvoiceSheet" title="发票张数" :value="invoiceSheet" id="invoiceSheet" rule="R1300" max-length="3"></yhm-form-text>
        <yhm-form-text :show="isInvoiceLast" title="末张" subtitle="发票号码" :value="invoiceLast" id="invoiceLast" rule="R1900"></yhm-form-text>
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
    name: 'addInvoiceNumForm',
    mixins: [formmixin],
    data(){
      return{
        numType:'',
        invoiceNum:'',
        invoiceFir:'',
        invoiceSheet:'',
        invoiceLast:'',
        isInvoiceNum: false,
        isInvoiceFir: false,
        isInvoiceSheet: false,
        isInvoiceLast: false,
        quantity: '',
        isFirWord: true
      }
    },
    methods:{
      save(){
        if(this.validator()){
          let invoiceParams = {
            invoiceNum: this.invoiceNum,
            invoiceFir: this.invoiceFir,
            invoiceSheet: this.invoiceSheet,
            invoiceLast: this.invoiceLast,
          }
          this.$dialog.setReturnValue(invoiceParams)
          this.$dialog.close()
        }
      }
    },
    created () {
      this.setQuery2Value('numType')
      this.setQuery2Value('quantity')

      if(this.numType === '0'){
        this.isInvoiceNum = true
        this.isInvoiceSheet = false
      }else if(this.numType === '1'){
        this.isInvoiceFir = true
        this.isInvoiceSheet = true
      }else{
        this.isInvoiceFir = true
        this.isInvoiceLast = true
        this.isInvoiceSheet = false
      }
      if(this.quantity === '1'){
        this.isFirWord = false
        this.isInvoiceLast = false
        this.invoiceSheet = '1'
        this.isInvoiceSheet = false
      }
    }
  }
</script>

<style scoped>
</style>
