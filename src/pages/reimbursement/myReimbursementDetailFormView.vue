<template>
  <div class="f_main mb35">
    <yhm-view-body>
      <template #title>基本信息</template>
      <template #body>
<!--        <yhm-view-control title="发生日期" :content="workDate" type="date"></yhm-view-control>-->
        <yhm-view-control title="事由" :content="subject"></yhm-view-control>
        <yhm-view-control title="发票类型" :content="invoiceCategory" :psd="invoiceTypePsdList"></yhm-view-control>
        <yhm-view-control title="费用开始日期" :content="startDate" type="date"></yhm-view-control>
        <yhm-view-control title="实报总金额" type="money" :content="actualMoney"  color="#f00"></yhm-view-control>
        <yhm-view-control title="类型" :content="type" :psd="typeList" v-if="noInvoice" ></yhm-view-control>
        <yhm-view-control title="费用结束日期" :content="endDate" type="date"></yhm-view-control>
        <yhm-view-control title="发票总金额" type="money" :content="invoiceMoney" v-if="noInvoice" color="#4BB414"></yhm-view-control>
        <yhm-view-control title="部门分配" type="text-money" category="3" :content="details"></yhm-view-control>

<!--        <yhm-view-control v-if="isPrettyCashOff" title="备用金是否核销" :content="isPrettyCashOff" :psd="isPrettyCashOffList"></yhm-view-control>-->
<!--        <yhm-view-control v-if="prettyCashMoney" title="备用金当前余额" :content="prettyCashMoney" type="money"></yhm-view-control>-->

        <yhm-view-control title="备注" :content="remark" category="3"></yhm-view-control>
        <yhm-view-control title="支持单据" v-if="files.length !== 0" :content="files" type="files" category="3"></yhm-view-control>
      </template>
    </yhm-view-body>
    <div class="f_split" v-if="noInvoice"></div>
    <yhm-view-tab v-if="noInvoice">
      <template #tab>
        <yhm-view-tab-button :list="tabState" :index="0">发票明细</yhm-view-tab-button>
      </template>
      <template #content>
        <yhm-view-tab-list :customize="true" :pager="false" v-show="tabState[0].select">
        <template #listHead>
          <yhm-managerth style="width: 120px" title="发票号码"></yhm-managerth>
          <yhm-managerth style="width: 120px" title="开票日期"></yhm-managerth>
          <yhm-managerth style="width: 120px" title="类型"></yhm-managerth>
          <yhm-managerth style="width: 100px" title="票面金额"></yhm-managerth>
          <yhm-managerth style="width: 100px" title="发票总金额"></yhm-managerth>
          <yhm-managerth style="width: 90px" title="发票张数"></yhm-managerth>
          <yhm-managerth title="备注"></yhm-managerth>
          <yhm-managerth style="width: 200px" title="发票照片"></yhm-managerth>
        </template>
        <template #listBody>
          <tr v-for="(item,index) in InvoiceDetails" :class="{InterlacBg:index%2!=0}" :key="index">
            <yhm-manager-td :value="item.code"></yhm-manager-td>
            <yhm-manager-td-date :value="item.workDate"></yhm-manager-td-date>
            <yhm-manager-td value="单张" v-if="item.category==='0'"></yhm-manager-td>
            <yhm-manager-td value="连号首张" v-if="item.category==='1'"></yhm-manager-td>
            <yhm-manager-td-money :value="item.money"></yhm-manager-td-money>
            <yhm-manager-td-money :value="item.actualMoney"></yhm-manager-td-money>
            <yhm-manager-td-center :value="item.quantity"></yhm-manager-td-center>
            <yhm-manager-td :value="item.remark"></yhm-manager-td>
            <yhm-manager-td-image @click="showInvoicePdfEvent(item)" :tip="true" width="850" height="600" left="-50" type="files" :value="item.url" :tag="item.isPdf === '1'?'ElectronicInvoice':'Invoice'" :pdf-url="item.pdfUrl"></yhm-manager-td-image>
          </tr>
        </template>
        <template #empty>
          <span class="m_listNoData" v-show="InvoiceDetails.length === 0">暂时没有数据</span>
        </template>
        </yhm-view-tab-list>
      </template>
    </yhm-view-tab>
    <div class="invoiceImgView" v-show="viewImgOn">
      <img :src=viewImg alt="">
    </div>
    <div v-html="approvalHtml"></div>
    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">

    </yhm-formoperate>
  </div>
</template>

<script>
  import { formmixin } from '@/assets/form.js'
  export default {
    name: 'reimbursementDetailFormView',
    mixins: [formmixin],
    data () {
      return {
        tabState:[{select:true}],
        workDate: '',
        subject: '',
        invoiceTypePsdList: [],
        invoiceCategory: '',
        typeList: [],
        type: '',
        actualMoney: '',
        startDate: '',
        details: [],
        invoiceMoney: '',
        endDate: '',
        remark: '',
        InvoiceDetails: [],

        viewImg: '',
        approvalHtml: '',
        viewImgOn: false,
        noInvoice: true,

        isPrettyCashOff: '',
        isPrettyCashOffList: [],
        prettyCashMoney: '',
        files: []
      }
    },

    methods: {
      /* 查看电子发票完整图片 */
      showInvoicePdfEvent(item){
        if(item.isPdf === '1'){
          window.open("/UploadFile/ElectronicInvoice/" + item.pdfUrl)
        }
      },
      invoiceImg(item){
        if(item.url !== '') {
          if(item.isPdf === '0'){
            this.viewImg = '/UploadFile/Invoice/' + item.url
          }
          else
          {
            this.viewImg = '/UploadFile/electronicInvoice/' + item.url
          }
          this.viewImgOn = true
        }
      },
      invoiceImgHide(item){
        if(item.url !== '') {
          this.viewImgOn = false
        }
      },
      initData(){
        this.init({
          url: '/PersonOffice/reimbursementsDetailForm',
          all: (data) =>{

          },
          add: (data) => {

          },
          look: (data) => {
            this.workDate = data.workDate
            this.subject = data.subject
            this.invoiceTypePsdList = data.invoiceTypePsd.list
            this.invoiceCategory = data.invoiceTypePsd.value
            this.typeList = data.typePsd.list
            this.type = data.typePsd.value
            this.actualMoney = data.actualMoney
            this.startDate = data.startDate
            this.details = data.branchList
            this.invoiceMoney = data.invoiceMoney
            this.endDate = data.endDate
            this.remark = data.remark
            this.InvoiceDetails = data.invoiceList
            this.approvalHtml = data.approvalHtml
            this.files = data.files

            this.isPrettyCashOff = data.isPrettyCashOff
            this.isPrettyCashOffList = data.isPrettyCashOffPsd.list
            if(this.isPrettyCashOff === '1'){
              this.prettyCashMoney = data.prettyCashMoney
            }

            this.noInvoice = this.invoiceCategory !== '2'
          }
        })
      }
    },
    created () {
      this.initData()
    },
  }
</script>

<style scoped lang="less">
  @import "../../../static/bjFlow.css";
</style>
