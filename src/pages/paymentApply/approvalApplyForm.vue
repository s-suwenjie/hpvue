<template>
  <div class="f_main">
    <yhm-view-body>
      <template #title>基本信息</template>
      <template #body>
        <yhm-view-control title="收款方" :content="otherUnit"></yhm-view-control>
        <yhm-view-control title="支付方式" :content="isChecks" :psd="isChecksList"></yhm-view-control>
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
    <div class="i-left fs48b colorFFF" title="上一条" v-show="isLeftID"  @click="leftStrip" style="width:48px;height:70px;background: #000;opacity:0.3;position: fixed;  bottom:300px;z-index: 9999;display:flex;justify-content:center;align-items:center;"></div>
    <div class="i-right fs48b colorFFF" title="下一条" v-show="isRightID" @click="rightStrip" style="width:48px;height:70px;background: #000;opacity:0.3;position: fixed;  bottom:300px;right:0px;z-index: 9999;display:flex;justify-content:center;align-items:center;"></div>

    <yhm-view-tab>
      <template #tab>
        <yhm-view-tab-button :list="tabState" :index="0">更多信息</yhm-view-tab-button>
        <yhm-view-tab-button :list="tabState" :index="1" v-if="isElInvoice">发票明细</yhm-view-tab-button>
        <yhm-view-tab-button :list="tabState" :index="2" v-if="isBankList">收支信息</yhm-view-tab-button>
        <yhm-view-tab-button :list="tabState" :index="3" v-if="isAppropriationMoney">拨付信息</yhm-view-tab-button>
      </template>
      <template #content>
        <yhm-view-tab-content v-show="tabState[0].select">
          <yhm-view-control title="付款事由" category="2" :content="subject"  v-if="isInterMub"></yhm-view-control>
          <yhm-view-control title="最迟付款日期" :content="lastDate" type="date"></yhm-view-control>
          <yhm-view-control title="编号" :content="message"></yhm-view-control>
          <yhm-view-control title="支付金额" :content="money" type="money" color="#f00"></yhm-view-control>
          <yhm-view-control title="金额大写" :content="capitalMoney"></yhm-view-control>
          <yhm-view-control category="3" title="部门分配" type="text-money" v-show="branchShow" :content="branchList" v-if="isInterMub && branchList.length!==0"></yhm-view-control>
          <yhm-view-control title="是否分批拨付" :content="isAllocation" :psd="isAllocationList"></yhm-view-control>
          <yhm-view-control category="3" title="分批拨付" type="date-money" :content="allocationList" v-if="allocationList.length !== 0"></yhm-view-control>
          <yhm-view-control title="备注" :content="remark" v-if="remark!==''"></yhm-view-control>
        </yhm-view-tab-content>

      <yhm-view-tab-list :customize="true"  v-show="tabState[1].select" v-if="isElInvoice">
        <template #listHead>
          <yhm-managerth style="width: 38px" title="查看"></yhm-managerth>
          <yhm-managerth style="width: 200px" title="发票号码"></yhm-managerth>
          <yhm-managerth style="width: 140px" title="类型"></yhm-managerth>
          <yhm-managerth style="width: 80px" title="发票张数"></yhm-managerth>
          <yhm-managerth style="width: 140px" title="开票日期"></yhm-managerth>
          <yhm-managerth style="width: 140px" title="发票金额"></yhm-managerth>
          <yhm-managerth style="width: 140px" title="发票照片"></yhm-managerth>
        </template>
        <template #listBody>
          <tr v-for="(item,index) in paymentInvoice" :class="{InterlacBg:index%2!=0}" :key="index">
            <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>
            <yhm-manager-td :value="item.code"></yhm-manager-td>
            <yhm-manager-td-psd :list="listCategoryList" :value="item.category"></yhm-manager-td-psd>
            <yhm-manager-td :value="item.quantity"></yhm-manager-td>
            <yhm-manager-td-date :value="item.workDate"></yhm-manager-td-date>
            <yhm-manager-td-money :value="item.money"></yhm-manager-td-money>
            <yhm-manager-td-image :tip="true" width="700" height="500" top="30" left="140" type="files" :value="item.url" :tag="item.isPdf === '1'?'ElectronicInvoice':'Invoice'" ></yhm-manager-td-image>
          </tr>
        </template>
        <template #empty>
          <span class="m_listNoData" v-show="paymentInvoice.length>=1?false:true">暂时没有数据</span>
        </template>
      </yhm-view-tab-list>
      <yhm-view-tab-list :customize="true"  v-show="tabState[2].select" v-if="isBankList">
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
          <span class="m_listNoData" v-show="bankDetailList.length>=1?false:true">暂时没有数据</span>
        </template>
      </yhm-view-tab-list>
      <yhm-view-tab-list :customize="true"  v-show="tabState[3].select" v-if="isAppropriationMoney">
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
            <yhm-manager-td :value="item.otherAccount"></yhm-manager-td>
            <yhm-manager-td-date :value="item.cccurDate"></yhm-manager-td-date>
            <yhm-manager-td-direction :direction="item.direction" class="dfJcc" :value="item.direction" :dir-val="false"></yhm-manager-td-direction>
            <yhm-manager-td :value="item.subject"></yhm-manager-td>
            <yhm-manager-td-money :value="item.money"></yhm-manager-td-money>
            <yhm-manager-td :value="item.remark"></yhm-manager-td>
            <yhm-manager-td-image @click="showInvoicePdfEvent(item)" :tip="true" width="850" height="600" left="50" type="files" :value="item.storeName" :tag="'bankDetail'" ></yhm-manager-td-image>
          </tr>
        </template>
        <template #empty>
          <span class="m_listNoData" v-show="appropriationMoney.length>=1?false:true">暂时没有数据</span>
        </template>
      </yhm-view-tab-list>
      </template>
    </yhm-view-tab>
    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn>
        <yhm-commonbutton v-show="(isApproval === '1' || isPrint !== '1') && isPrint === '0' && isApproval === '0'" :no-click="isApproval!=='0'"  @call="adoptEvent" value="通过" icon="i-btn-applicationSm" color="#49a9ea" :flicker="true"></yhm-commonbutton>
        <yhm-commonbutton v-show="(isApproval === '1' || isPrint !== '1') && isPrint === '0' && isApproval === '0'" :no-click="isApproval!=='0'" @call="rejectEvent" value="驳回" icon="i-btn-turnDown" color="#FF0000" category="ten"></yhm-commonbutton>
        <yhm-commonbutton v-show="isPrinter" @call="printFund" value="打印单据" icon="i-btn-print"></yhm-commonbutton>
        <yhm-commonbutton v-show="state === '9' && isChecks === '0'" :no-click="isApproval==='4'" @call="approFund" value="拨付资金" icon="i-btn-grant" color="#FF0000"></yhm-commonbutton>
        <yhm-commonbutton v-show="state === '9' && isChecks === '1' && checksID === ''" @call="selectChecksDetail" value="支票填开" icon="i-checkFillOut" color="#FF0000"></yhm-commonbutton>

        <yhm-commonbutton v-show="state === '9' && isChecks === '1' && checksID !== ''" @call="accEntry" value="支票入账" icon="i-accEntry" color="#49a9ea"></yhm-commonbutton>
        <yhm-commonbutton v-show="state === '9' && isChecks === '1' && checksID !== ''" @call="viewCheck" value="查看票样" icon="i-viewCheck" color="#be08e3"></yhm-commonbutton>
        <yhm-commonbutton v-show="state === '9' && isChecks === '1' && checksID !== ''" @call="toVoidCheck" value="支票作废" icon="i-toVoidCheck" color="#f00"></yhm-commonbutton>
      </template>
    </yhm-formoperate>

  </div>
</template>

<script>
import { formmixin } from '@/assets/form.js'
export default {
  name: 'paymentForm',
  mixins: [formmixin],
  data () {
    return {
      tabState:[{select:true},{select:false},{select:false},{select:false}],
      eventShowA: true,
      branchShow:true,
      eventShowB: false,
      remark: '',
      id: '',
      ownerID: '', // 计划事件ID
      name: '', // 计划事件
      useMoney: '', // 款项用途
      otherUnit: '', // 收款方
      otherUnitID: '',
      otherAccountID: '',
      personID: '',
      person: '',
      otherAccount: '', // 收款账号
      subjectID: '', // 事由ID(事件)
      subject: '', // 付款事由(事件)
      ownerSysPsd: [],
      ownerSys: '', // 事件类型,
      rule: [],
      fileList: [], // 单据
      message: '', // 编号
      remarks: '', // 备注
      capitalMoney: '', // 大写
      money: '', // 金额
      natureList: [], // 付款性质
      nature: '', // 付款性质value
      invoiceList: [], // 发票类型
      invoice: '',
      useNumList: [],
      useNum: '',
      secondLevelInvoiceList: [], // 发票二级类型
      secondLevelInvoice: '',
      isRelevanceList: [],
      isRelevance: '', // 是否关联
      PrepaidHidden: false,
      ListHiding: true,
      fileListShow: true,
      empty: true,
      elInvoice: false,
      lastDate: '',
      category: '',
      updateDate: '', // 修改日期
      updateName: '', // 修改名字
      createName: '', // 添加名字
      insertDate: '', //
      approvalHtml: '',
      subjectCode: '',
      paymentInvoice: [],
      paymentInvoiceList: [],
      listCategoryList: [],
      isRule: '#',
      invoiceID: '',
      isLook: true,
      categoryBefore:'',
      categoryUnit:'',

      isApproval: '',
      isPrint: '',
      approval: '',
      rejectCause: '',

      isChecksList:[],
      isChecks:'',

      planIn: false,
      planOut: false,
      isInvoice: false,
      isElInvoice: false,

      branchList: [],
      isInterMub: true,
      isPrinter: true,
      isBankList: false,
      bankDetailList: [],

      appropriationMoney:[],
      isAppropriationMoney:false,
      allocationList: [],
      state: '',
      checksID: '',

      isAllocationList: [],
      isAllocation: '',

      isLeftID:false,//延长按钮
      leftID:'',//上一条ID
      isRightID:false,//延长按钮
      rightID:'',//下一条ID
    }
  },
  methods: {


    leftStrip(){
      window.location='/approvalApplyView?id='+this.leftID
    },
    rightStrip(){
      window.location='/approvalApplyView?id='+this.rightID
    },

    /* 作废 */
    toVoidCheck(){
      this.$dialog.OpenWindow({
        width: '1050',
        height: '690',
        title: '支票作废',
        url: '/toVoidCheck?ownerID=' + this.checksID,
        closeCallBack: (data)=>{
          if(data){
            this.initPageData(false)
          }
        }
      })
    },
    /* 查看票样 */
    viewCheck(){
      this.$dialog.OpenWindow({
        width: '850',
        height: '340',
        title: '查看票样',
        url: '/viewCheck?ownerID=' + this.checksID,
        closeCallBack: ()=>{

        }
      })
    },
    /* 入账*/
    accEntry(){
      this.$dialog.OpenWindow({
        width: '1050',
        height: '690',
        title: '支票入账操作',
        url: '/accEntry?bankDetailType=4&ownerID=' + this.checksID,
        closeCallBack: (data)=>{
          if(data){
            this.initPageData(false)
          }
        }
      })
    },
    /* 支票填开 */
    selectChecksDetail(){
      this.$dialog.OpenWindow({
        url: '/selectChecksDetail?stateBefore=1&state=0&category=',
        width: "1000",
        height: "650",
        title: '选择支票',
        closeCallBack: (data) => {
          if (data) {
            if(data.category==='0'){
              this.$dialog.OpenWindow({
                width: '1050',
                height: '690',
                title: '支票填开',
                url: '/checkFillOut?ownerID=' + data.id+"&otherOwnerID="+this.id+'&otherCategory=1',
                closeCallBack: (information) => {
                  if (information) {
                    this.initPageData(false)
                  }
                }
              })
            }else{
              if(this.personOrUnit==='0'){
                this.$dialog.OpenWindow({
                  width: '1050',
                  height: '690',
                  title: '支票填开',
                  url: '/checkFillOut?ownerID=' + data.id+"&otherOwnerID="+this.id+'&otherCategory=1',
                  closeCallBack: (information) => {
                    if (information) {
                      this.initPageData(false)
                    }
                  }
                })
              }
            }
          }
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
          tipValue: '纸质发票查看有右侧照片！'
        })
      }
    },
    /* 打印 */
    printFund(){
      let params = {
        id: this.id
      }
      this.ajaxJson({
        url: '/PersonOffice/paymenPrint',
        data: params,
        call: (data) => {
          window.open("/UploadFile/" + data.message)
        }
      })
      /*添加打印次数 */
      let printLogParams = {
        ownerID: this.id,
      }
      this.ajaxJson({
        url:'/PersonOffice/addPrintLog',
        data:printLogParams,
        call:(data)=>{
        }
      })
      /* 打印电子发票 */
      if (this.invoice === '0'){
        this.$dialog.confirm({
          width: 300,
          tipValue: '是否打印电子发票?',
          alertImg: 'warn',
          okCallBack: (data)=>{
            let electronicInvoiceParams = {
              id: this.id
            }
            this.ajaxJson({
              url: '/PersonOffice/getPayElectronicInvoice',
              data: electronicInvoiceParams,
              call: (data)=>{
                if (data.type === 0 && data.val !== ''){
                  this.printInvoice = data.val;
                  try {
                    this.printInvoiceItem = this.printInvoice.split("|");
                  }catch (e) {}
                  for(var i=0;i<this.printInvoiceItem.length;i++){
                    var a = document.createElement("a");
                    a.download = this.printInvoiceItem[i];
                    a.href = "/UploadFile/ElectronicInvoice/" + this.printInvoiceItem[i];
                    a.click();
                  }
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
    /*通过*/
    adoptEvent () { //
      if(this.id){
        let params = {
          id: this.id,
          kind: '0',
          tableName: '45'
        }
        this.$dialog.confirm({
          width: 300,
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
                      this.initData()
                      this.$dialog.close()
                    }
                  })
                }else if(data.type === 1){
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
    /* 驳回 */
    rejectEvent(){
      if (this.id) {
        let params = {
          id: this.id,
          tableName: '45',
        }
        this.ajaxJson({
          url: '/PersonOffice/getSubmitCatrgoryVue',
          data: params,
          call: (data) => {
            if (data.type === 0) {
              this.category = data.message
              this.$dialog.OpenWindow({
                width: 1050,
                height: 720,
                title: '驳回理由',
                url: '/rejectReason?category=' + this.category + '&id=' + this.id+'&tableName=45&kind=0',
                closeCallBack: (data) => {
                  if(data){
                    this.$dialog.setReturnValue('123')
                    this.initData()
                    this.$dialog.close()
                  }
                }
              })
            }
          }
        })
      }
    },
    /* 拨付资金 */
    approFund(){
      if(this.approval === '4'){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '690',
          title: '拨付资金',
          url: '/bankDetailForm?ownerID=' + this.id +'&bankDetailType=' + '0' + '&directionBefore=1',
          closeCallBack: (data)=>{
            this.initData()
          }
        })
      }else{
        this.$dialog.alert({
          tipValue: '已拨付'
        })
      }
    },
    initData(){
      this.setQuery2Value('isApproval')
      this.setQuery2Value('isPrint')
      this.setQuery2Value('approval')
      this.setQuery2Value('id')
      this.init({
        url: '/PersonOffice/initPaymentForm',
        all: (data) => {
          // /* 公共 无论查看和添加返回数据 */

        },
        add: (data) => {
          /* 需要添加的数据 */
        },
        look: (data) => {

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
          this.capitalMoney = data.capitalMoney
          this.remark = data.remark
          this.paymentInvoice = data.paymentInvoice
          this.approvalHtml = data.approvalHtml
          this.secondLevelInvoiceList = data.secondLevelInvoicePsd.list
          this.secondLevelInvoice = data.secondLevelInvoicePsd.value
          this.listCategoryList = data.listCategoryPsd.list
          this.bankDetailList = data.bankDetailList
          this.isFinish = data.isFinish
          this.allocationList = data.allocationList
          this.isChecksList = data.isChecksPsd.list
          this.isChecks = data.isChecks

          this.isAllocation = data.isAllocation
          this.isAllocationList = data.isAllocationPsd.list

          this.isElInvoice = this.isFinish === '1' && this.nature === '0';
          this.state = data.state
          this.checksID = data.checksID
          if(this.isRelevance === '1'){
            this.eventShowA = false
            this.eventShowB = true
            this.useMoney = data.name
          }
          //
          if(this.nature === '0'){
            this.isElInvoice = false
          }
          if(this.nature === '2'){
            this.isInterMub = false
            this.isElInvoice = false
          }else{
            this.isInterMub = true
          }

          if (this.nature === '1') {
            this.PrepaidHidden = true // 判断发票类型是否隐藏
            this.isInvoice = true
            this.isElInvoice = true
          }else if(this.nature === '4' || this.nature === '5'){
            this.branchShow = false
            this.isBankList = true    //判断是否隐藏收支明细
          }else {
            this.isElInvoice = false
          }
          if(data.appropriationMoney.length>0){
            this.appropriationMoney=data.appropriationMoney
            this.isAppropriationMoney=true
          }
          if(this.isRelevance === '0'){
            this.planIn = true
            this.planOut = false
          }else{
            this.planIn = false
            this.planOut = true
          }
          this.isPrinter = data.isPrint !== '0';
          this.elInvoice = data.paymentInvoice.length !== 0;
          this.empty = this.paymentInvoice.length === 0
        }
      })
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
  },

  created () {
    this.initData();
    this.selectedList();
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
</style>
