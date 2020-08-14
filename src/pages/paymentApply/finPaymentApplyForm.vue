<template>
  <div class="f_main mb35">
    <yhm-view-body>
      <template #title>基本信息</template>
      <template #body>
        <yhm-view-control title="收款方" :content="otherUnit" @iconClick="iconClick" iconColor="#49a9ea" font-icon="uniE99E" @click="unitView()" color="#49a9ea" style="cursor: pointer;"></yhm-view-control>
        <yhm-view-control title="支付方式" :content="isChecks" :psd="isChecksList"></yhm-view-control>
        <yhm-view-control title="是否关联" :content="isRelevance" @click="planView()" :psd="isRelevanceList" v-show="isRelevance==='0'" color="#49a9ea"></yhm-view-control>
        <yhm-view-control title="是否关联" content="计划外" color="#8000FF" v-show="isRelevance==='1'"></yhm-view-control>
        <yhm-view-control title="计划事件" :content="name" v-show="planIn"></yhm-view-control>
        <yhm-view-control title="款项用途" :content="useMoney" v-show="planOut"></yhm-view-control>
        <yhm-view-control title="收款账号" :content="otherAccount" category="2" ></yhm-view-control>
        <yhm-view-control title="申请人" :content="person"></yhm-view-control>
        <yhm-view-control title="付款性质" :content="nature" :psd="natureList"></yhm-view-control>
        <yhm-view-control title="发票类型" :content="invoice" :psd="invoiceList" v-if="isInvoice"></yhm-view-control>
        <yhm-view-control title="发票二级类型" :content="secondLevelInvoice" :psd="secondLevelInvoiceList" v-if="isInvoice"></yhm-view-control>
        <yhm-view-control title="金额大写" :content="capitalMoney"></yhm-view-control>
        <yhm-view-control title="支付金额" :content="money" type="money" color="#f00"></yhm-view-control>
        <yhm-view-control title="核销金额" v-show="isRelatedInformation" :content="writeOffMoney.toString()" type="money"></yhm-view-control>
        <yhm-view-control title="拨款金额" v-show="isAppropriationMoney" :content="bankDetailMoney.toString()" type="money" color="#f00"></yhm-view-control>
        <yhm-view-control category="3" title="文件" type="files" :content="fileList"></yhm-view-control>
      </template>
    </yhm-view-body>

    <div class="f_split"></div>
    <div class="i-left fs48b colorFFF lftSwitchArrow" title="上一条" v-show="isLeftID"  @click="leftStrip"></div>
    <div class="i-right fs48b colorFFF rgtSwitchArrow" title="下一条" v-show="isRightID" @click="rightStrip"></div>

    <yhm-view-tab>
      <template #tab>
        <yhm-view-tab-button :list="tabState" :index="0">更多信息</yhm-view-tab-button>
        <yhm-view-tab-button :list="tabState" :index="1"  v-if="isElInvoice">发票明细</yhm-view-tab-button>
        <yhm-view-tab-button :list="tabState" :index="2"  v-if="isBankList">收款信息</yhm-view-tab-button>
        <yhm-view-tab-button :list="tabState" :index="3"  v-if="isAppropriationMoney">拨付信息</yhm-view-tab-button>
        <yhm-view-tab-button :list="tabState" :index="4" @click="payment" >付款申请记录</yhm-view-tab-button>
        <yhm-view-tab-button :list="tabState" :index="5" v-if="isRelatedInformation">应收账款核销</yhm-view-tab-button>
      </template>
      <template #content>
        <yhm-view-tab-content v-show="tabState[0].select">
          <yhm-view-control title="付款事由" category="2" :content="subject" style="white-space: nowrap;"></yhm-view-control>
          <yhm-view-control title="最迟付款日期" :content="lastDate" type="date"></yhm-view-control>
          <yhm-view-control title="编号" :content="message"></yhm-view-control>
          <yhm-view-control category="3" title="部门分配" type="text-money" v-show="branchShow" v-if="branchList.length>='1'" :content="branchList"></yhm-view-control>
          <yhm-view-control title="是否分批拨付" :content="isAllocation" :psd="isAllocationList"></yhm-view-control>
          <yhm-view-control category="3" title="分批拨付" type="date-money" :content="allocationList" v-if="allocationList.length !== 0"></yhm-view-control>
          <yhm-view-control title="备注" :content="remark" v-if="remark!==''"></yhm-view-control>
        </yhm-view-tab-content>
        <yhm-view-tab-list :customize="true"  v-show="tabState[1].select"  v-if="isElInvoice">
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
              <yhm-manager-td :value="item.quantity"></yhm-manager-td>
              <yhm-manager-td-money :value="item.money"></yhm-manager-td-money>
              <yhm-manager-td :value="item.remark"></yhm-manager-td>
              <yhm-manager-td-image @click="showInvoicePdfEvent(item)" :tip="true" width="850" height="600" left="-50" type="files" :value="item.url" :tag="item.isPdf === '1'?'ElectronicInvoice':'Invoice'"  :pdf-url="item.pdfUrl"></yhm-manager-td-image>
            </tr>
          </template>
          <template #empty>
            <span class="m_listNoData" v-show="empty">暂时没有数据</span>
          </template>
        </yhm-view-tab-list>
        <yhm-view-tab-list :customize="true"  v-show="tabState[2].select"  v-if="isBankList">
          <template #listHead>
            <yhm-managerth style="width: 320px" title="对方账号"></yhm-managerth>
            <yhm-managerth style="width: 140px" title="交易日期"></yhm-managerth>
            <yhm-managerth style="width: 80px" title="收支方向"></yhm-managerth>
            <yhm-managerth style="width: 130px" title="事由"></yhm-managerth>
            <yhm-managerth style="width: 120px" title="交易金额"></yhm-managerth>
            <yhm-managerth style="width: 110px" title="备注"></yhm-managerth>
          </template>
          <template #listBody>
            <tr v-for="(item,index) in bankDetailList" :class="{InterlacBg:index%2!=0}" :key="index">
              <yhm-manager-td :value="item.otherAccount === null? '':item.otherAccount"></yhm-manager-td>
              <yhm-manager-td-date :value="item.cccurDate"></yhm-manager-td-date>
              <yhm-manager-td-direction :direction="item.direction" class="dfJcc" :value="item.direction" :dir-val="false"></yhm-manager-td-direction>
              <yhm-manager-td :value="item.subject"></yhm-manager-td>
              <yhm-manager-td-money :value="item.money"></yhm-manager-td-money>
              <yhm-manager-td :value="item.remark"></yhm-manager-td>
            </tr>
          </template>
          <template #empty>
            <span class="m_listNoData" v-show="bankDetailList.length===0?true:false">暂时没有数据</span>
          </template>
        </yhm-view-tab-list>
        <yhm-view-tab-list :customize="true"  v-show="tabState[3].select"  v-if="isAppropriationMoney">
          <template #listHead>
            <yhm-managerth style="width: 150px" title="账号"></yhm-managerth>
            <yhm-managerth style="width: 150px" title="对方账号"></yhm-managerth>
            <yhm-managerth style="width: 140px" title="交易日期"></yhm-managerth>
            <yhm-managerth style="width: 80px" title="收支方向"></yhm-managerth>
            <yhm-managerth style="width: 110px" title="事由"></yhm-managerth>
            <yhm-managerth style="width: 120px" title="交易金额"></yhm-managerth>
            <yhm-managerth style="width: 110px" title="备注"></yhm-managerth>
            <yhm-managerth style="width: 100px" title="凭证"></yhm-managerth>
          </template>
          <template #listBody>
            <tr v-for="(item,index) in appropriationMoney" :class="{InterlacBg:index%2!=0}" :key="index">
              <yhm-manager-td :value="item.selfAccount"></yhm-manager-td>
              <yhm-manager-td :value="item.otherAccount === null? '':item.otherAccount"></yhm-manager-td>
              <yhm-manager-td-date :value="item.cccurDate"></yhm-manager-td-date>
              <yhm-manager-td-direction :direction="item.direction" class="dfJcc" :value="item.direction" :dir-val="false"></yhm-manager-td-direction>
              <yhm-manager-td :value="item.subject"></yhm-manager-td>
              <yhm-manager-td-money :value="item.money"></yhm-manager-td-money>
              <yhm-manager-td :value="item.remark"></yhm-manager-td>
              <yhm-manager-td-image @click="showInvoicePdfEvent(item)" :tip="true" width="850" height="600" left="-50" type="files" :value="item.storeName === null ? '': item.storeName" :tag="'bankDetail'"></yhm-manager-td-image>
            </tr>
          </template>
        </yhm-view-tab-list>
        <yhm-view-tab-list :customize="true"  v-show="tabState[4].select"  >
          <template #listHead>
            <yhm-managerth style="width: 38px;" title="查看"></yhm-managerth>
            <yhm-managerth style="width: 50px" title="申请人"></yhm-managerth>
            <yhm-managerth style="width: 200px" title="收款方" ></yhm-managerth>
            <yhm-managerth style="width: 110px" title="最迟付款日期" ></yhm-managerth>
            <yhm-managerth style="width: 80px" title="事由"></yhm-managerth>
            <yhm-managerth style="width: 70px" title="申请金额"></yhm-managerth>
            <yhm-managerth style="width: 180px" title="编号"></yhm-managerth>
            <yhm-managerth style="width: 130px" title="状态"></yhm-managerth>
          </template>
          <template #listBody>
            <tr v-for="(item,index) in paymentRequestRecord" :class="{InterlacBg:index%2!=0}" :key="index">
              <yhm-manager-td-look @click="examineView(item.id)"></yhm-manager-td-look>
              <yhm-manager-td-center :value="item.person"></yhm-manager-td-center>
              <yhm-manager-td :value="item.otherAccount"></yhm-manager-td>
              <yhm-manager-td-date :value="item.lastDate"></yhm-manager-td-date>
              <yhm-manager-td-center :value="item.subject"></yhm-manager-td-center>
              <yhm-manager-td-money :value="item.money"></yhm-manager-td-money>
              <yhm-manager-td :value="item.code"></yhm-manager-td>
              <yhm-manager-td-state :value="item.stateVal" :state-color="item.stateColor" :state-img="item.stateImg"></yhm-manager-td-state>
            </tr>
          </template>
          <template #pager>
            <yhm-pagination :pager="pager"  is-page-size="false" @initData="payment(false)"></yhm-pagination>
          </template>
        </yhm-view-tab-list>
        <yhm-view-tab-list :customize="true"  v-show="tabState[5].select" v-if="isRelatedInformation">
          <template #listHead>
            <yhm-managerth style="width: 38px" title="查看"></yhm-managerth>
            <yhm-managerth title="应收账款来源"></yhm-managerth>
            <yhm-managerth style="color: red" title="核销金额（—）"></yhm-managerth>
          </template>
          <template #listBody>
            <tr v-for="(item,index) in relatedInformation" :class="{InterlacBg:index%2!=0}" :key="index">
              <yhm-manager-td-look @click="listRelatedView(item)"></yhm-manager-td-look>
              <yhm-manager-td-psd :list="receivableSourceList" :value="item.category"></yhm-manager-td-psd>
              <yhm-manager-td-money before-symbol="―" :value="item.money"></yhm-manager-td-money>
            </tr>
          </template>
          <template #empty>
            <span class="m_listNoData"  v-show="relatedInformation.length>=1?false:true">暂时没有数据</span>
          </template>
        </yhm-view-tab-list>
      </template>
    </yhm-view-tab>

    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">

    </yhm-formoperate>

    <div v-html="approvalHtml"></div>

  </div>
</template>

<script>
import { viewmixin } from '@/assets/view.js'
export default {
  name: 'paymentApplyViewForm',
  mixins: [viewmixin],
  data () {
    return {
      pager: { // 分页数据
        total: '', // 数据总条数
        pageSize: 10, // 单页数据条数
        pageIndex: 1, // 当前页码
        selectCount: 0 // 选中数据的条数
      },
      content:[],
      branchShow:true,
      paymentRequestRecord:[],
      stateList:[],
      tabState:[{select:true},{select:false},{select:false},{select:false},{select:false},{select:false}],
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
      approvalHtml: '',
      secondLevelInvoice: '',
      secondLevelInvoiceList: [],
      listCategoryList: [],
      isChecksList:[],
      isChecks:'',
      eventShowA: true,
      eventShowB: false,
      planIn: false,
      planOut: false,
      isInvoice: false,
      isElInvoice: false,
      PrepaidHidden: false,
      isInterMub: true,
      elInvoice: false,
      isEditBtn: false,
      isSubBtn: false,
      isApproval: true,
      empty: false,
      isBankList: false,
      bankDetailList: [],
      personID:'',

      appropriationMoney:[],
      isAppropriationMoney:false,
      allocationList: [],

      isAllocationList: [],
      isAllocation: '',
      personOrUnit: '',

      isRelatedInformation:false,
      receivableSourceList:[],
      relatedInformation:[],
      writeOffMoney:'',
      bankDetailMoney:'',

      isLeftID:false,//延长按钮
      leftID:'',//上一条ID
      isRightID:false,//延长按钮
      rightID:'',//下一条ID
    }
  },
  methods: {
    iconClick(){
      let url = '';
      if(this.personOrUnit === '1'){
        url = '/unitBankDetailForm?personID='+ this.content.otherUnitID
      }else{
        url = '/unitBankDetailForm?unitID='+ this.content.otherUnitID
      }
      this.$dialog.OpenWindow({
        width: '1050',
        height: '640',
        title: '查看收支明细',
        url: url,
        closeCallBack: (dataTwo)=>{
        }
      })
    },
    leftStrip(){
      window.location='/paymentApplyViewForm?id='+this.leftID
    },
    rightStrip(){
      window.location='/paymentApplyViewForm?id='+this.rightID
    },
    planView(){
      this.$dialog.OpenWindow({
        width: '1050',
        height: '690',
        url:'/paymentPlanDetailFormView?id='+this.ownerID,
        title:'查看事件信息',
        closeCallBack:(data) =>{
          if(data){
            this.initPageData(false)
          }
        }
      })
    },
    /* 查看电子发票完整图片 */
    showInvoicePdfEvent(item){
      if(item.isPdf === '1'){
        window.open("/UploadFile/ElectronicInvoice/" + item.pdfUrl)
      }
    },
    unitView(){
      if(this.content.personOrUnit==='0'){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '690',
          url:'/unitView?id=' + this.content.otherUnitID,
          title:'查看单位信息',
          closeCallBack:(data) =>{
            if(data){
              this.initPageData(false)
            }
          }
        })
      } else {
        this.$dialog.OpenWindow({
          width: '1050',
          height: '690',
          url:'/personView?id=' + this.content.otherUnitID,
          title:'查看联系人信息',
          closeCallBack:(data) =>{
            if(data){
              this.initPageData(false)
            }
          }
        })
      }

    },
    payment(initValue){//付款申请记录
      let params = {}
      if (initValue) {
        // 页面初始化是需要的参数
        params = {

        }
      } else {
        // 页面非初始化时需要的参数
        params = {
          personID:this.personID,
          id:this.id,
          init:initValue,
          pageIndex:this.pager.pageIndex,
          pageSize:this.pager.pageSize,
        }
      }
      this.ajaxJson({
        url:'/PersonOffice/getPaymentPersonManager',
        data:params,
        call: (data) => {
          this.paymentRequestRecord = data.content
          this.pager.total = data.count
          this.stateList = data.statePsd.list
        }
      })
    },
    examineView(id){
      this.$dialog.OpenWindow({
        width: '1050',
        height: '750',
        title: '查看付款申请信息',
        url: '/paymentApplyViewForm?id='+ id,
        closeCallBack: (data)=>{

        }
      })
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
    selectedList() {
      let params = {
        id: this.id
      }
      this.ajaxJson({
        url: '/PersonOffice/commonSelectedID',
        data: params,
        call: (data) => {
          if(data.leftID!==""){
            this.leftID=data.leftID
            this.isLeftID=true
          }
          if(data.rightID!==""){
            this.rightID=data.rightID
            this.isRightID=true
          }
        }
      })
    },
    //判断该付款申请是否存在核销
    selectedRelated() {
      let params = {
        id: this.id
      }
      this.ajaxJson({
        url: '/finance/receivableDetail/isExistByOtherID',
        data: params,
        call: (data) => {
          if(data>0){
            this.isRelatedInformation = true
            this.selectedRelatedList()
          }
        }
      })
    },
    selectedRelatedList() {
      let params = {
        ownerID: this.id
      }
      this.ajaxJson({
        url: '/finance/receivableDetail/getManagerRelated',
        data: params,
        call: (data) => {
          console.log(data)
          if(data){
            this.receivableSourceList = data.receivableSourceList.list
            this.relatedInformation = data.content
            this.writeOffMoney=0
            for (let i = 0; i < this.relatedInformation.length; i++) {
              this.writeOffMoney=parseFloat(this.writeOffMoney)+parseFloat(this.relatedInformation[i].money)
            }
          }
        }
      })
    },
    listRelatedView(item){
      this.$dialog.OpenWindow({
        width: '1050',
        height: '600',
        url: '/receivableView?id='+item.ownerID,
        title: '查看应收账款详情',
        closeCallBack: (data) => {

        }
      })
    }
  },
  created () {

    this.selectedList()

    this.setQuery2Value('ownerID')
    let params = {
      id:this.id
    }
    this.ajaxJson({
      url: '/PersonOffice/initPaymentForm',
      data:params,
      call: (data)=>{
        this.content = data
        this.personID = data.personID
        this.otherUnit = data.otherUnit
        this.isRelevanceList = data.isRelevancePsd.list
        this.isRelevance = data.isRelevancePsd.value
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
        this.personOrUnit = data.personOrUnit
        this.capitalMoney = data.capitalMoney
        this.remark = data.remark
        this.paymentInvoice = data.paymentInvoice
        this.approvalHtml = data.approvalHtml
        this.secondLevelInvoiceList = data.secondLevelInvoicePsd.list
        this.secondLevelInvoice = data.secondLevelInvoicePsd.value
        this.listCategoryList = data.listCategoryPsd.list
        this.bankDetailList = data.bankDetailList
        this.allocationList = data.allocationList

        this.isAllocation = data.isAllocation
        this.isAllocationList = data.isAllocationPsd.list

        this.isChecksList = data.isChecksPsd.list
        this.isChecks = data.isChecks
        if(this.isRelevance === '1'){
          this.eventShowA = false
          this.eventShowB = true
          this.useMoney = data.name
        }

        if(this.nature === '0'&&this.content.isFinish === '1'){//预付    发票信息
          this.isElInvoice = false//发票明细
        }
        if (this.nature === '1') {//凭发票支付   显示发票信息
          this.isInvoice = true// 判断发票类型是否隐藏
          this.isBankList = false //收支明细
          this.isElInvoice = true // 发票明细
        }
        if(this.nature === '4' || this.nature === '5'){
          this.branchShow = false//部门分配
          this.isBankList = true    //判断是否隐藏收支明细
          this.isElInvoice = false // 发票明细
        }

        if(this.paymentInvoice.length > 0){
          this.isElInvoice = true
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
          this.bankDetailMoney=0
          for (let i = 0; i < this.appropriationMoney.length; i++) {
            this.bankDetailMoney=parseFloat(this.bankDetailMoney)+parseFloat(this.appropriationMoney[i].money)
          }
        }
        this.elInvoice = data.paymentInvoice.length !== 0;
        this.empty = this.paymentInvoice.length === 0
      }
    })

    this.selectedRelated()
  },

  watch: {

  }

}
</script>
<style scoped lang="less">
.tbTitSty,.fcTable{
  margin: 0 20px 0;
}
.contentBody{
  width: 985px;
  margin: 0;
 }
  .subList{
    background-color: #FFFFFF;
  }
</style>
