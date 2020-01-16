<template>
  <div class="f_main">
    <yhm-view-body>
      <template #title>基本信息</template>
      <template #body>
        <yhm-view-control title="收款方" :content="otherUnit"></yhm-view-control>
        <yhm-view-control title="是否支票支付" :content="isChecks" :psd="isChecksList"></yhm-view-control>
        <yhm-view-control title="是否关联" :content="isRelevance" :psd="isRelevanceList"></yhm-view-control>
        <yhm-view-control title="计划事件" :content="name" v-show="planIn"></yhm-view-control>
        <yhm-view-control title="款项用途" :content="useMoney" v-show="planOut"></yhm-view-control>
        <yhm-view-control title="收款账号" :content="otherAccount" category="2" ></yhm-view-control>
        <yhm-view-control title="申请人" :content="person"></yhm-view-control>
        <yhm-view-control title="付款性质" :content="nature" :psd="natureList"></yhm-view-control>
        <yhm-view-control title="发票类型" :content="invoice" :psd="invoiceList" v-if="isInvoice"></yhm-view-control>
        <yhm-view-control title="发票二级类型" :content="secondLevelInvoice" :psd="secondLevelInvoiceList" v-if="isInvoice"></yhm-view-control>
        <yhm-view-control category="3" title="文件" type="files" :content="fileList"></yhm-view-control>
      </template>
    </yhm-view-body>
    <div class="f_split"></div>
    <yhm-view-tab>
      <template #tab>
        <yhm-view-tab-button :list="tabState" :index="0">更多信息</yhm-view-tab-button>
        <yhm-view-tab-button :list="tabState" :index="1" v-if="isElInvoice">发票明细</yhm-view-tab-button>
        <yhm-view-tab-button :list="tabState" :index="2" v-if="isBankList">收支信息</yhm-view-tab-button>
        <yhm-view-tab-button :list="tabState" :index="3" v-if="isAppropriationMoney">拨付信息</yhm-view-tab-button>
      </template>
      <template #content>
        <yhm-view-tab-content v-show="tabState[0].select">
          <yhm-view-control title="付款事由" category="2" :content="subject" v-if="isInterMub"></yhm-view-control>
          <yhm-view-control title="最迟付款日期" :content="lastDate" type="date"></yhm-view-control>
          <yhm-view-control title="编号" :content="message"></yhm-view-control>
          <yhm-view-control title="支付金额" :content="money" type="money" color="#f00"></yhm-view-control>
          <yhm-view-control title="金额大写" :content="capitalMoney"></yhm-view-control>
          <yhm-view-control category="3" title="部门分配" type="text-money" v-show="branchShow" :content="branchList" v-if="isInterMub && branchList.length!==0"></yhm-view-control>
          <yhm-view-control category="3" title="分批拨付" type="date-money" :content="allocationList" v-if="allocationList.length !== 0"></yhm-view-control>

          <yhm-view-control title="备注" :content="remark" v-if="remark!==''"></yhm-view-control>
        </yhm-view-tab-content>
        <yhm-view-tab-list :customize="true"  v-show="tabState[1].select" v-if="isElInvoice">
          <template #listHead>
            <yhm-managerth style="width: 38px" title="查看"></yhm-managerth>
            <yhm-managerth style="width: 120px" title="发票号码"></yhm-managerth>
            <yhm-managerth style="width: 120px" title="开票日期"></yhm-managerth>
            <yhm-managerth style="width: 100px" title="类型"></yhm-managerth>
            <yhm-managerth style="width: 80px" title="发票张数"></yhm-managerth>
            <yhm-managerth style="width: 120px" title="票面金额"></yhm-managerth>
            <yhm-managerth title="备注"></yhm-managerth>
            <yhm-managerth style="width: 140px" title="发票照片"></yhm-managerth>
          </template>
          <template #listBody>
            <tr v-for="(item,index) in paymentInvoice" :class="{InterlacBg:index%2!=0}" :key="index">
              <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>
              <yhm-manager-td :value="item.code"></yhm-manager-td>
              <yhm-manager-td-date :value="item.workDate"></yhm-manager-td-date>
              <yhm-manager-td-psd :list="listCategoryList" :value="item.category"></yhm-manager-td-psd>
              <yhm-manager-td-center :value="item.quantity"></yhm-manager-td-center>
              <yhm-manager-td-money :value="item.money"></yhm-manager-td-money>
              <yhm-manager-td :value="item.remark"></yhm-manager-td>
              <yhm-manager-td-image @click="showInvoicePdfEvent(item)" :tip="true" width="850" height="600" left="50" type="files" :value="item.url" :tag="item.isPdf === '1'?'ElectronicInvoice':'Invoice'" ></yhm-manager-td-image>
            </tr>
          </template>
          <template #empty>
            <span class="m_listNoData" v-show="paymentInvoice.length>=1?false:true">暂时没有数据</span>
          </template>
        </yhm-view-tab-list>
        <yhm-view-tab-list :customize="true"  v-show="tabState[2].select"  v-if="isBankList">
          <template #listHead>
            <yhm-managerth style="width: 340px" title="对方账号"></yhm-managerth>
            <yhm-managerth style="width: 140px" title="交易日期"></yhm-managerth>
            <yhm-managerth style="width: 80px" title="收支方向"></yhm-managerth>
            <yhm-managerth style="width: 110px" title="事由"></yhm-managerth>
            <yhm-managerth style="width: 120px" title="交易金额"></yhm-managerth>
            <yhm-managerth style="width: 210px" title="备注"></yhm-managerth>
          </template>
          <template #listBody>
            <tr v-for="(item,index) in bankDetailList" :class="{InterlacBg:index%2!=0}" :key="index">
              <yhm-manager-td :value="item.otherAccount"></yhm-manager-td>
              <yhm-manager-td-date :value="item.cccurDate"></yhm-manager-td-date>
              <yhm-manager-td-direction :direction="item.direction" class="dfJcc" :value="item.direction" :dir-val="false"></yhm-manager-td-direction>
              <yhm-manager-td :value="item.subject"></yhm-manager-td>
              <yhm-manager-td-money :value="item.money"></yhm-manager-td-money>
              <yhm-manager-td :value="item.remark"></yhm-manager-td>
            </tr>
          </template>
          <template #empty>
            <span class="m_listNoData"  v-show="bankDetailList.length>=1?false:true">暂时没有数据</span>
          </template>
        </yhm-view-tab-list>
        <yhm-view-tab-list :customize="true"  v-show="tabState[3].select" v-if="isAppropriationMoney">
          <template #listHead>
            <yhm-managerth style="width: 170px" title="账号"></yhm-managerth>
            <yhm-managerth style="width: 170px" title="对方账号"></yhm-managerth>
            <yhm-managerth style="width: 140px" title="交易日期"></yhm-managerth>
            <yhm-managerth style="width: 80px" title="收支方向"></yhm-managerth>
            <yhm-managerth style="width: 110px" title="事由"></yhm-managerth>
            <yhm-managerth style="width: 120px" title="交易金额"></yhm-managerth>
            <yhm-managerth style="width: 210px" title="备注"></yhm-managerth>
          </template>
          <template #listBody>
            <tr v-for="(item,index) in appropriationMoney" :class="{InterlacBg:index%2!=0}" :key="index">
              <yhm-manager-td :value="item.selfAccount"></yhm-manager-td>
              <yhm-manager-td :value="item.otherAccount"></yhm-manager-td>
              <yhm-manager-td-date :value="item.cccurDate"></yhm-manager-td-date>
              <yhm-manager-td-direction :direction="item.direction" class="dfJcc" :value="item.direction" :dir-val="false"></yhm-manager-td-direction>
              <yhm-manager-td :value="item.subject"></yhm-manager-td>
              <yhm-manager-td-money :value="item.money"></yhm-manager-td-money>
              <yhm-manager-td :value="item.remark"></yhm-manager-td>
            </tr>
          </template>
          <template #empty>
            <span class="m_listNoData"  v-show="appropriationMoney.length>=1?false:true">暂时没有数据</span>
          </template>
        </yhm-view-tab-list>
      </template>
    </yhm-view-tab>
    <div v-if="isApproval" v-html="approvalHtml"></div>
    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
    </yhm-formoperate>
  </div>
</template>
<script>
  import { formmixin } from '@/assets/form.js'
  export default {
    name: 'paymentApplyFormView',
    mixins: [formmixin],
    data (){
      return {
        tabState:[{select:true},{select:false},{select:false},{select:false}],
        branchShow:true,
        id: '',
        otherUnit: '',
        isRelevanceList: [],
        isRelevance: '',
        name: '',
        useMoney: '',
        person: '',
        natureList: [],
        nature: '',
        invoiceList: [],
        invoice: '',
        rejectCause: '',
        otherAccount: '',
        fileList: [],
        branchList: [],
        branch: '',
        subjectID: '',
        subject: '',
        lastDate: '',
        message: '',
        money: '',
        capitalMoney: '',
        remark: '',
        paymentInvoice: [],
        bankDetailList: [],
        approvalHtml: '',
        secondLevelInvoice: '',
        secondLevelInvoiceList: [],
        listCategoryList: [],
        allocationList:[],

        eventShowA: true,
        eventShowB: false,
        planIn: false,
        planOut: false,
        isInvoice: false,
        isElInvoice: false,
        isBankList: false,
        PrepaidHidden: false,
        isInterMub: true,
        elInvoice: false,
        isEditBtn: false,
        isSubBtn: false,
        isApproval: true,
        empty: false,
        isFinish: '',
        isChecksList:[],
        appropriationMoney:[],
        isAppropriationMoney:false,

      }
    },
    methods: {
      /* 查看电子发票完整图片 */
      showInvoicePdfEvent(item){
        if(item.isPdf === '1'){
          window.open("/UploadFile/ElectronicInvoice/" + item.url)
        }
      },
      listView(item){
        if(item.isPdf === '1'){
          this.$dialog.OpenWindow({
            width: '1050',
            height: '750',
            title: '查看电子发票',
            url: '/myElectronicInvoiceForm?id=' + item.invoiceID,
            closeCallBack: ()=>{

            }
          })
        }else{
          this.$dialog.alert({
            alertImg: 'warn',
            tipValue: '纸质发票无法查看！'
          })
        }
      },
      initData(){
        this.init({
          url: '/PersonOffice/initPaymentForm',
          all: (data)=>{

          },
          add: (data)=>{

          },
          look: (data)=>{
            this.otherUnit = data.otherUnit
            this.isRelevanceList = data.isRelevancePsd.list
            this.isRelevance = data.isRelevancePsd.value
            this.allocationList = data.allocationList
            this.name = data.name
            this.useMoney = data.name
            this.otherAccount = data.otherAccount
            this.person = data.person
            this.nature = data.nature
            this.natureList = data.naturePsd.list
            this.nature = data.naturePsd.value
            this.invoiceList = data.invoicePsd.list
            this.invoice = data.invoicePsd.value
            this.fileList = data.files
            this.rejectCause = data.rejectCause
            this.otherAccountID = data.otherAccountID
            this.branchList = data.branchList
            this.subject = data.subject
            this.subjectID = data.subjectID
            this.lastDate = data.lastDate
            this.message = data.code
            this.money = data.money
            this.capitalMoney = data.capitalMoney
            this.remark = data.remark
            this.paymentInvoice = data.paymentInvoice
            this.approvalHtml = data.approvalHtml
            this.secondLevelInvoiceList = data.secondLevelInvoicePsd.list
            this.secondLevelInvoice = data.secondLevelInvoicePsd.value
            this.listCategoryList = data.listCategoryPsd.list
            this.bankDetailList = data.bankDetailList
            this.isFinish = data.isFinish
            this.isChecksList = data.isChecksPsd.list
            this.isChecks = data.isChecks
            this.isElInvoice = this.isFinish === '1' && this.nature === '0';
            if(this.isRelevance === '1'){
              this.eventShowA = false
              this.eventShowB = true
              this.useMoney = data.name
            }
            this.isInterMub = this.nature !== '2';
            if(this.nature === '0'){
              this.isElInvoice = false
            }
            if (this.nature === '1') {
              this.PrepaidHidden = true // 判断发票类型是否隐藏
              this.isInvoice = true  // 判断发票明细表格是否隐藏
              this.isElInvoice = true
            }else if(this.nature === '4' || this.nature === '5'){
              this.branchShow = false//部门分配
              this.isBankList = true    //判断是否隐藏收支明细
            }else {
              this.isElInvoice = false
            }

            if(this.isRelevance === '0'){
              this.planIn = true
              this.planOut = false
            }else{
              this.planIn = false
              this.planOut = true
            }
            if(data.appropriationMoney.length>0){
              this.appropriationMoney=data.appropriationMoney
              this.isAppropriationMoney=true
            }
            this.elInvoice = data.paymentInvoice.length !== 0;
            this.empty = this.paymentInvoice.length === 0
          }
        })
      }
    },
    created () {
      this.initData()
    }
  }
</script>

<style scoped>

</style>
