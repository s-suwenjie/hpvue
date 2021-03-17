<template>
  <div class="f_main">
    <yhm-view-body>
      <template #title>基本信息</template>
      <template #body>
        <yhm-view-control title="推送模块" :content="ownerType" :psd="ownerTypePsd.list"></yhm-view-control>
        <yhm-view-control title="添加人" :content="person"></yhm-view-control>
        <yhm-view-control title="开票单位" :content="unit"></yhm-view-control>
        <yhm-view-control title="税号" :content="taxNumber"></yhm-view-control>
        <yhm-view-control title="发票代码" :content="code"></yhm-view-control>
        <yhm-view-control title="发票号码" :content="invoiceCode"></yhm-view-control>
        <yhm-view-control title="发票日期" :content="invoiceDate"></yhm-view-control>
        <yhm-view-control :content="invoiceCategory" title="发票类型" :psd="invoiceCategoryPsd.list"></yhm-view-control>
        <yhm-view-control title="发票金额" :content="money"></yhm-view-control>
        <yhm-view-control title="税率(%)" :content="taxRate"></yhm-view-control>
        <yhm-view-control title="税额" :content="taxMoney"></yhm-view-control>
        <yhm-view-control title="认证日期" :content="attestationDate" type="date"></yhm-view-control>
        <yhm-view-control title="抵扣日期" :content="deductionDate" type="date"></yhm-view-control>
        <yhm-view-control title="抵扣金额" :content="deductionMoney"></yhm-view-control>
        <yhm-view-image title="查看图片" :url="url" @click="lookImge" :tag="tag" bigwidth="200" top="-20" left="0"></yhm-view-image>

      </template>
    </yhm-view-body>
    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
    </yhm-formoperate>
  </div>
</template>

<script>
  import { formmixin } from '@/assets/form.js'
  import { formatDate ,accAdd, guid,accMul} from '@/assets/common.js'
  export default {
    name: 'inputTaxView',
    mixins: [formmixin],
    data() {
      return {
        ownerType:'',
        ownerID:'',
        personID:'',
        person:'',
        unitID:'',
        unit:'',
        code:'',
        taxNumber:'',
        invoiceCode:'',
        invoiceDate:'',
        invoiceCategory:'',
        money:'',
        taxRate:'',
        taxMoney:'',
        attestationDate:'',
        deductionDate:'',
        deductionMoney:'',
        state:'',
        check:'',
        url:'',
        tag:'',
        invoiceCategoryPsd:'',
        ownerTypePsd:'',
        statePsd:'',
      }
    },
    methods: {
      lookImge(){
        window.open('/UploadFile/'+this.tag+'/'+this.url)
      },
      init(){
        let params={
          id:this.id
        }
        this.ajaxJson({
          url: '/finance/inputTax/initForm',
          data: params,
          call: (data) => {
            this.unitID=data.unitID
            this.unit=data.unit
            this.taxNumber=data.taxNumber
            this.ownerType=data.ownerType
            this.ownerID=data.ownerID
            this.personID=data.personID
            this.person=data.person
            this.unitID=data.unitID
            this.unit=data.unit
            this.code=data.code
            this.invoiceCode=data.invoiceCode
            this.invoiceDate=data.invoiceDate
            this.invoiceCategory=data.invoiceCategory
            this.money=data.money
            this.taxRate=data.taxRate
            this.taxMoney=data.taxMoney
            this.attestationDate=data.attestationDate
            this.deductionDate=data.deductionDate
            this.deductionMoney=data.deductionMoney
            this.url=data.url
            this.tag=data.tag

            this.invoiceCategoryPsd=data.invoiceCategoryPsd
            this.statePsd=data.statePsd
            this.ownerTypePsd=data.ownerTypePsd

            this.taxMoney=(this.money/accAdd(this.taxRate,100)*this.taxRate).toFixed(2)
            this.updateName = data.updateName
            this.updateDate = data.updateDate
            this.insertDate = data.insertDate
            this.createName = data.createName
          }
        })
      }
    },
    created () {

      this.init()
    }
  }
</script>

<style scoped>

</style>
