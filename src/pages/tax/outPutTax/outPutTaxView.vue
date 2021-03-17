<template>
  <div class="f_main">
    <yhm-view-body>
      <template #title>基本信息</template>
      <template #body>
        <yhm-view-control title="推送模块" @click="lookOwnerID" :content="ownerType" :psd="ownerTypePsd.list"></yhm-view-control>
        <yhm-view-control title="添加人" :content="person"></yhm-view-control>
        <yhm-view-control :content="invoiceCategory" title="发票类型" :psd="invoiceCategoryPsd.list"></yhm-view-control>
        <yhm-view-control title="发票抬头" @click="lookPayer" :content="payer"></yhm-view-control>
        <yhm-view-control title="发票号" :content="invoiceCode"></yhm-view-control>
        <yhm-view-control title="发票日期" :content="invoiceDate"></yhm-view-control>
        <yhm-view-control title="发票金额" :content="money"></yhm-view-control>
        <yhm-view-control title="税率" :content="taxRate"></yhm-view-control>
        <yhm-view-control title="税额" :content="taxMoney"></yhm-view-control>
        <yhm-view-control title="异常原因" v-if="state=='1'" :content="toVoidReason"></yhm-view-control>
        <yhm-view-image title="查看图片" @click="lookImge" :url="url" :tag="tag" bigwidth="200" top="-20" left="0"></yhm-view-image>
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
    name: 'outPutTaxView',
    mixins: [formmixin],
    data() {
      return {
        ownerID:'',
        ownerType:'',
        ownerTypePsd:'',
        personID:'',
        person:'',
        payerID:'',
        payer:'',
        invoiceCode:'',
        invoiceDate:'',
        invoiceCategory:'',
        invoiceCategoryPsd:'',
        money:'',
        taxRate:'',
        taxMoney:'',
        tag:'',
        url:'',
        state:'',
        toVoidReason:'',
      }
    },
    methods: {
      lookImge(){
        window.open('/UploadFile/'+this.tag+'/'+this.url)
      },
      lookPayer(){
        let url=''
        if(this.payerType == '0'){
          url = '/unitView?id='+this.payerID
        }else if(this.payerType == '1'){
          url = '/personView?id='+this.payerID
        }
        this.$dialog.OpenWindow({
          width: 1050,
          height: 620,
          url:url,
          title:'查看发票抬头信息',
          closeCallBack:(data) =>{
            if(data){

            }
          }
        })
      },
      lookOwnerID(){
        let url=''
        if(this.ownerType == '0'){
          url = '/openInvoiceView?id='+this.ownerID
        }else if(this.ownerType == '1'){
          url = '/workOrderView?id='+this.ownerID
        }
        this.$dialog.OpenWindow({
          width: 1050,
          height: 620,
          url:url,
          title:'查看推送信息',
          closeCallBack:(data) =>{
            if(data){
              //this.initPageData(false)
            }
          }
        })
      },
      init() {
        let params = {
          id: this.id
        }
        this.ajaxJson({
          url: '/finance/outPutTax/initForm',
          data: params,
          call: (data) => {
            if(data){
              this.ownerID=data.ownerID
              this.ownerType=data.ownerType
              this.ownerTypePsd=data.ownerTypePsd
              this.personID=data.personID
              this.person=data.person
              this.payerID=data.payerID
              this.payer=data.payer
              this.invoiceCode=data.invoiceCode
              this.invoiceDate=data.invoiceDate
              this.invoiceCategory=data.invoiceCategory
              this.invoiceCategoryPsd=data.invoiceCategoryPsd
              this.money=data.money
              this.taxRate=data.taxRate
              this.taxMoney=data.taxMoney
              this.tag=data.tag
              this.url=data.url
              this.state=data.state
              this.toVoidReason=data.toVoidReason
            }
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
