<template>
  <div class="f_main">

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
            <yhm-managerth style="width: 58px" title="发票号码"></yhm-managerth>
            <yhm-managerth title="开票日期" style="width: 130px"></yhm-managerth>
            <yhm-managerth style="width: 120px" title="类型"></yhm-managerth>

            <yhm-managerth style="width: 100px" title="票面金额"></yhm-managerth>
            <yhm-managerth style="width: 100px" title="发票总金额"></yhm-managerth>

            <yhm-managerth style="width: 90px" title="发票张数"></yhm-managerth>
            <yhm-managerth style="width: 150px" title="备注"></yhm-managerth>
            <yhm-managerth style="width: 80px;" title="发票照片"></yhm-managerth>
          </template>
          <template #listBody>
            <tr v-for="(item,index) in InvoiceDetails" :class="{InterlacBg:index%2!=0}" :key="item.id">
              <yhm-manager-td-center :value="item.code"></yhm-manager-td-center>
              <yhm-manager-td-date :value="item.workDate"></yhm-manager-td-date>
              <yhm-manager-td-psd :value="item.category" :list="invoiceCategoryList"></yhm-manager-td-psd>

              <yhm-manager-td-money :value="item.money"></yhm-manager-td-money>
              <yhm-manager-td-money :value="item.actualMoney"></yhm-manager-td-money>

              <yhm-manager-td-center :value="item.quantity"></yhm-manager-td-center>
              <yhm-manager-td :value="item.remark"></yhm-manager-td>
              <yhm-manager-td-image @click="showInvoicePdfEvent(item)" :tip="true" width="850" height="600" left="50" type="files" :value="item.url" :tag="item.isPdf === '1'?'ElectronicInvoice':'Invoice'" :pdf-url="item.pdfUrl"></yhm-manager-td-image>
            </tr>
          </template>
          <template #empty>
            <span class="m_listNoData" v-show="InvoiceDetails.length === 0">暂时没有数据</span>
          </template>
        </yhm-view-tab-list>
      </template>
    </yhm-view-tab>

    <div class="f_split" v-show="rejectCause !== ''"></div>
    <yhm-view-body v-show="rejectCause !== ''">
      <template #title >驳回理由</template>
      <template #body>
        <yhm-view-control title="驳回理由"   :content="rejectCause"></yhm-view-control>
      </template>
    </yhm-view-body>

    <div class="invoiceImgView" v-show="viewImgOn">
      <img :src=viewImg alt="">
    </div>
    <yhm-formoperate v-if="isApproval === '0'" :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn>
        <yhm-commonbutton value="通过" v-show="isState !== '9'" :flicker="true" @call="adoptEvent()" icon="i-btm-applicationSm" class="btnIcon"></yhm-commonbutton>
        <yhm-commonbutton value="驳回" v-show="isState !== '9'" @call="rejectEvent()" icon="i-btn-turnDown" class="btnIcon btnIconColor"></yhm-commonbutton>
      </template>
    </yhm-formoperate>
  </div>
</template>

<script>
  import { accMul, accAdd, guid, formatDate,formatTime } from '@/assets/common.js'
  import { formmixin } from '@/assets/form.js'
  export default {
    name: 'approvalReimbursementDetailForm',
    mixins: [formmixin],
    data () {
      return {
        tabState:[{select:true}],
        workDate: '',
        isState: '',
        subject: '',
        subjectID: '',
        startDate: '',
        endDate: '',
        invoiceTypePsdList: [],
        invoiceCategory: '',
        viewImg:'',
        actualMoney: '',
        invoiceMoney: '',
        invoiceCount: '',
        yesOrNoList: [],
        yesOrNo:'',
        remark: '',
        approvalHtml: '',
        viewImgOn: false,
        isAccounting: false,
        details: [],
        InvoiceDetails: [],
        invoiceCategoryPsdList: [],
        invoiceCategoryList: [],
        btnLook: false,
        elInvoiceBtn: true,
        isElInvoiceBtn: true,
        noInvoice: true,
        type: '',
        typeList: [],
        isApproval: '',
        rejectCause: '',

        isPrettyCashOff: '',
        isPrettyCashOffList: [],
        prettyCashMoney: '',
        files: []
      }
    },
    methods: {
      showInvoicePdfEvent(item){
        if(item.isPdf === '1'){
          window.open("/UploadFile/ElectronicInvoice/" + item.pdfUrl)
        }
      },
      approvalNext(){
        let params = {
          id: this.id,
          category: 2
        }
        this.ajaxJson({
          url: '/Com/approvalNext',
          data: params,
          call: (data)=>{
            if(data.type === 0){
              let dataID = data.id

              let txt = ''
              let width = ''
              if(data.html === '0'){
                txt = '当前批次中还有<b class="red">【' + data.message + '】</b>条没有审批,是否继续审批?'
                width = '450'
              }else if(data.html === '1'){
                txt = '检测到<b class="red">【' + data.val + '】</b>名下还有<b class="red">【' + data.message + '】</b>条没有审批,是否继续审批?'
                width = '550'
              }else{
                txt = '检测到其他人名下还有<b class="red">【' + data.message + '】</b>条没有审批,是否继续审批?'
                width = '500'
              }

              this.$dialog.confirm({
                width: width,
                height: '100',
                tipValue: txt,
                btnValueOk: '继续审批',
                btnValueCancel: '暂不审批',
                okCallBack: ()=>{
                  window.location = '/approvalReimbursementDetailForm?id=' + dataID + '&isApproval=' + this.isApproval
                },
                cancelCallBack: ()=>{
                  this.$dialog.close()
                }
              })
            }else{
              this.$dialog.close()
            }
          }
        })
      },
      adoptEvent () { //子表通过
        if(this.id){
          let params = {
            id: this.id,
            tableName: 40,
            kind:2,
            tableDetailName:41,
          }

          this.$dialog.confirm({
            width: '300',
            tipValue: '是否通过?',
            alertImg: 'warn',
            okCallBack: (data)=>{
              this.ajaxJson({
                url: '/PersonOffice/approvalYesVue',
                data: params,
                call: (data)=>{
                  if(data.type === 0){
                    this.$dialog.setReturnValue(this.id)
                    this.$dialog.alert({
                      tipValue: data.message,
                      closeCallBack: () => {
                        this.approvalNext()
                      }
                    })
                  }else{
                    this.$dialog.alert({
                      tipValue: data.message,
                      alertImg: 'error',
                      closeCallBack: () => {
                      }
                    })
                  }
                }
              })
            }
          })
        }
      },
      rejectEvent () { //子表驳回

        if(this.id){

          this.$dialog.OpenWindow({
            width: '1050',
            height: '720',
            title: '驳回理由',
            url: '/rejectReason?category=12' +'&id=' + this.id+ '&tableName=40&tableDetailName=41&kind=2',
            closeCallBack: (data)=>{
              if(data){
                this.$dialog.setReturnValue(this.id)
                this.approvalNext()

              }
            }
          })
        }
      },
      invoiceImg(item){
        if(item.url !== '') {
          if(item.isPdf === '0'){
            this.viewImg = '/UploadFile/Invoice/' + item.url
          } else {
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
    },
    created () {
      this.setQuery2Value('isApproval')
      this.init({
        url: '/PersonOffice/reimbursementsDetailForm',
        all: (data) =>{
          /* 公共 无论查看和添加返回数据 */
        },
        add: (data) => {
          /* 需要添加的数据 */
        },
        look: (data) => {
          /* 需要查看的数据 */

          if(data.state !== '0'){
            this.isPdf = true
          }
          this.workDate = data.workDate
          this.subject = data.subject
          this.invoiceTypePsdList = data.invoiceTypePsd.list
          this.invoiceCategory = data.invoiceTypePsd.value
          this.invoiceCategoryList = data.invoiceCategoryPsd.list
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
          this.rejectCause = data.rejectCause
          this.noInvoice = this.invoiceCategory !== '2';

          this.files = data.files
          this.isState = data.state

          this.isPrettyCashOff = data.isPrettyCashOff
          this.isPrettyCashOffList = data.isPrettyCashOffPsd.list
          if(this.isPrettyCashOff === '1'){
            this.prettyCashMoney = data.prettyCashMoney
          }

          this.btnLook = false
        }
      })
    }
  }
</script>

<style scoped>

</style>
