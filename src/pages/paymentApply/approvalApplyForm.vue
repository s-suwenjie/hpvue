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
        <yhm-view-tab-button :list="tabState" :index="1" v-if="isElInvoice">发票明细</yhm-view-tab-button>
        <yhm-view-tab-button :list="tabState" :index="2" v-if="isBankList">收支信息</yhm-view-tab-button>
        <yhm-view-tab-button :list="tabState" :index="3" v-if="isAppropriationMoney">拨付信息</yhm-view-tab-button>
        <yhm-view-tab-button :list="tabState" :index="4" v-if="isRelatedInformation">应收账款核销</yhm-view-tab-button>
        <yhm-view-tab-button :list="tabState" :index="5" v-if="nature === '7'">押金信息</yhm-view-tab-button>
        <yhm-view-tab-button :list="tabState" :index="6" v-if="nature === '8'">付押金信息</yhm-view-tab-button>
        <yhm-view-tab-button :list="tabState" :index="7" v-if="nature === '9'">快递对账单</yhm-view-tab-button>
      </template>
      <template #content>
        <yhm-view-tab-content v-show="tabState[0].select">
          <yhm-view-control title="付款事由" category="2" :content="subject"  v-if="isInterMub"></yhm-view-control>
          <yhm-view-control title="最迟付款日期" :content="lastDate" type="date"></yhm-view-control>
          <yhm-view-control title="编号" :content="message"></yhm-view-control>
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
              <yhm-manager-td-image :tip="true" width="700" height="500" top="30" left="140" type="files" :value="item.url" :tag="item.isPdf === '1'?'ElectronicInvoice':'Invoice'" :pdf-url="item.pdfUrl"></yhm-manager-td-image>
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
        <yhm-view-tab-list :customize="true"  v-show="tabState[4].select" v-if="isRelatedInformation">
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
        <yhm-view-tab-list :customize="true"  v-show="tabState[5].select" v-if="nature === '7'">
          <template #listHead>
            <yhm-managerth style="width: 38px" title="查看"></yhm-managerth>
            <yhm-managerth style="width: 200px" title="付款方"></yhm-managerth>
            <yhm-managerth style="width: 160px" title="付款账号"></yhm-managerth>
            <yhm-managerth style="width: 120px" title="交易日期"></yhm-managerth>
            <yhm-managerth style="width: 90px" title="事由"></yhm-managerth>
            <yhm-managerth style="width: 110px" title="退款金额"></yhm-managerth>
            <yhm-managerth style="width: 220px" title="备注"></yhm-managerth>
          </template>
          <template #listBody>
            <tr v-for="(item,index) in depositList" :class="{InterlacBg:index%2!=0}" :key="index">
              <yhm-manager-td-look @click="selectDeposit(item)"></yhm-manager-td-look>
              <yhm-manager-td :value="item.other"></yhm-manager-td>
              <yhm-manager-td :value="item.otherAccount"></yhm-manager-td>
              <yhm-manager-td-date :value="item.cccurDate"></yhm-manager-td-date>
              <yhm-manager-td :value="item.subject"></yhm-manager-td>
              <yhm-manager-td-money :value="item.money"></yhm-manager-td-money>
              <yhm-manager-td :value="item.remark"></yhm-manager-td>
            </tr>
          </template>
          <template #empty>
            <span class="m_listNoData"  v-show="depositList.length>=1?false:true">暂时没有数据</span>
          </template>
        </yhm-view-tab-list>
        <yhm-view-tab-list :customize="true"  v-show="tabState[6].select" v-if="nature === '8'">
          <template #listHead>
            <yhm-managerth style="width: 38px" title="查看"></yhm-managerth>
            <yhm-managerth style="width: 160px" title="付款方"></yhm-managerth>
            <yhm-managerth style="width: 180px" title="付款账号"></yhm-managerth>
            <yhm-managerth style="width: 120px" title="交易日期"></yhm-managerth>
            <yhm-managerth style="width: 110px" title="事由"></yhm-managerth>
            <yhm-managerth style="width: 90px" title="付款金额"></yhm-managerth>
            <yhm-managerth style="width: 120px" title="预计退款日期"></yhm-managerth>
            <yhm-managerth style="width: 180px" title="备注"></yhm-managerth>
          </template>
          <template #listBody>
            <tr v-for="(item,index) in payDepositList" :class="{InterlacBg:index%2!=0}" :key="index">
              <yhm-manager-td-look @click="selectPayDeposit(item)"></yhm-manager-td-look>
              <yhm-manager-td :value="item.other"></yhm-manager-td>
              <yhm-manager-td :value="item.otherAccount"></yhm-manager-td>
              <yhm-manager-td-date :value="item.cccurDate"></yhm-manager-td-date>
              <yhm-manager-td :value="item.subject"></yhm-manager-td>
              <yhm-manager-td-money :value="item.money"></yhm-manager-td-money>
              <yhm-manager-td-date :value="item.refundDate"></yhm-manager-td-date>
              <yhm-manager-td :value="item.remark"></yhm-manager-td>
            </tr>
          </template>
          <template #empty>
            <span class="m_listNoData"  v-show="payDepositList.length>=1?false:true">暂时没有数据</span>
          </template>
        </yhm-view-tab-list>
        <yhm-view-tab-list :customize="true"  v-show="tabState[7].select" v-if="nature === '9'">
          <template #listHead>
            <yhm-managerth style="width: 120px"  title="文件（点击图标下载）" ></yhm-managerth>
            <yhm-managerth style="width: 120px" title="对账单开始日期"></yhm-managerth>
            <yhm-managerth style="width: 120px" title="对账单结束日期"></yhm-managerth>
            <yhm-managerth style="width: 120px" title="账单总金额"></yhm-managerth>
          </template>
          <template #listBody>
            <tr v-for="(item,index) in expressList" :key="index" :class="{InterlacBg:index%2!==0}">
              <yhm-manager-td  value=" " @click="downloadEvent(item)">
                <img  style="margin: auto;" width="50" height="30" src="https://hp.yhm.hk/UploadFile/excel.jpg" alt="">
              </yhm-manager-td>
              <yhm-manager-td-date  :value="item.startDate"></yhm-manager-td-date>
              <yhm-manager-td-date  :value="item.endDate"></yhm-manager-td-date>
              <yhm-manager-td-money  :value="item.money"></yhm-manager-td-money>
            </tr>
          </template>
        </yhm-view-tab-list>
      </template>
    </yhm-view-tab>
    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn>
        <yhm-commonbutton v-show="(isApproval === '1' || isPrint !== '1') && isPrint === '0' && isApproval === '0'" :no-click="isApproval!=='0'"  @call="adoptEvent" value="通过" icon="i-btn-applicationSm" color="#49a9ea" :flicker="true"></yhm-commonbutton>
        <yhm-commonbutton v-show="(isApproval === '1' || isPrint !== '1') && isPrint === '0' && isApproval === '0'" :no-click="isApproval!=='0'" @call="rejectEvent" value="驳回" icon="i-btn-turnDown" color="#FF0000" category="ten"></yhm-commonbutton>
        <yhm-commonbutton v-show="isPrinter" @call="printFund" value="打印单据" icon="i-btn-print"></yhm-commonbutton>

        <yhm-commonbutton v-show="state === '9' && isChecks === '0' && item.isApproval!=='5' && item.isApproval!=='6' && approval === '4'" :no-click="isApproval==='4'" @call="approFund" value="拨付资金" icon="i-btn-grant" color="#FF0000"></yhm-commonbutton>
        <yhm-commonbutton v-show="isChecks === '0' && isApproval === '6' && approval === '4'" :no-click="isApproval==='4'" @call="approFund" value="拨付资金" icon="i-btn-grant" color="#FF0000"></yhm-commonbutton>

        <yhm-commonbutton v-show="state === '9' && isChecks === '1' && checksID === ''" @call="selectChecksDetail" value="支票填开" icon="i-checkFillOut" color="#FF0000"></yhm-commonbutton>

        <yhm-commonbutton v-show="state === '9' && isChecks === '1' && checksID !== ''" @call="accEntry" value="支票入账" icon="i-accEntry" color="#49a9ea"></yhm-commonbutton>
        <yhm-commonbutton v-show="state === '9' && isChecks === '1' && checksID !== ''" @call="viewCheck" value="查看票样" icon="i-viewCheck" color="#be08e3"></yhm-commonbutton>
        <yhm-commonbutton v-show="state === '9' && isChecks === '1' && checksID !== ''" @call="toVoidCheck" value="支票作废" icon="i-toVoidCheck" color="#f00"></yhm-commonbutton>
      </template>
    </yhm-formoperate>

  </div>
</template>

<script>
  import { accMul, accAdd, guid, formatDate, number2chinese,formatTime} from '@/assets/common.js'
import { formmixin } from '@/assets/form.js'
import ViewCheck from '../check/checkOpera/viewCheck'
export default {
  name: 'paymentForm',
  components: { ViewCheck },
  mixins: [formmixin],
  data () {
    return {
      tabState:[{select:true},{select:false},{select:false},{select:false},{select:false},{select:false},{select:false},{select:false}],
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

      isRelatedInformation:false,
      receivableSourceList:[],
      relatedInformation:[],
      writeOffMoney:'',
      bankDetailMoney:'',

      isAllocationList: [],
      isAllocation: '',
      depositList:[],
      payDepositList:[],
      expressList:[],

      isLeftID:false,//延长按钮
      leftID:'',//上一条ID
      isRightID:false,//延长按钮
      rightID:'',//下一条ID
    }
  },
  methods: {

    selectPayDeposit(item){
      this.$dialog.OpenWindow({
        width: 1050,
        height: 720,
        url:'/payDepositView?id='+item.bankDetailID,
        title:'查看付押金信息',
        closeCallBack:(data) =>{
          if(data){
            this.initPageData(false)
          }
        }
      })
    },
    selectDeposit(item){
      this.$dialog.OpenWindow({
        width: 1050,
        height: 720,
        url:'/depositView?id='+item.bankDetailID,
        title:'查看收押金信息',
        closeCallBack:(data) =>{
          if(data){
            this.initPageData(false)
          }
        }
      })
    },
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
    approvalNext(){
      let params = {
        id: this.id,
        category: 1
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
                window.location = '/approvalApplyView?id=' + dataID + '&isApproval='+this.isApproval+ '&isPrint='+this.isPrint+ '&approval='+this.approval
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

    /*通过*/
    adoptEvent () { //
      if(this.id){
        this.$dialog.OpenWindow({
          width: 650,
          height: 230,
          title: '审批留言',
          url: '/passMessage?id=' + this.id+ '&tableName=45&kind=0',
          closeCallBack: (data)=>{
            this.$dialog.setReturnValue(this.id)
            this.approvalNext()
          }
        })
        // let params = {
        //   id: this.id,
        //   kind: '0',
        //   tableName: '45'
        // }
        // this.$dialog.confirm({
        //   width: 300,
        //   tipValue: '是否通过?',
        //   alertImg: 'warn',
        //   okCallBack: (data)=>{
        //     this.ajaxJson({
        //       url: '/PersonOffice/approvalYesVue',
        //       data: params,
        //       call: (data)=>{
        //         if(data.type === 0){
        //           this.$dialog.setReturnValue(this.id)
        //           this.$dialog.alert({
        //             tipValue: data.message,
        //             closeCallBack: () => {
        //               this.approvalNext()
        //
        //             }
        //           })
        //         }else{
        //           this.$dialog.alert({
        //             tipValue: data.message,
        //             alertImg: 'error',
        //             closeCallBack: () => {
        //             }
        //           })
        //         }
        //       }
        //     })
        //   }
        // })
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
                    this.approvalNext()
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

          this.isApproval = data.isApproval
          this.isPrint = data.isPrint
          this.approval = data.approval
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
          }else if(this.nature === '4'||this.nature === '5'){
            this.branchShow = false
            this.isBankList = true    //判断是否隐藏收支明细
          }else {
            this.isElInvoice = false
          }
          if(data.appropriationMoney.length>0){
            this.appropriationMoney=data.appropriationMoney
            this.isAppropriationMoney=true
            this.bankDetailMoney=0
            for (let i = 0; i < this.appropriationMoney.length; i++) {
              this.bankDetailMoney=parseFloat(this.bankDetailMoney)+parseFloat(this.appropriationMoney[i].money)
            }
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
          this.isPrinter = data.isPrint !== '0';
          this.elInvoice = data.paymentInvoice.length !== 0;
          this.empty = this.paymentInvoice.length === 0
          if(this.nature === '7'){
            this.tabState=[{select:true},{select:false},{select:false},{select:false},{select:false},{select:false},{select:false}]
            let id=''
            for (let i = 0; i < this.bankDetailList.length; i++) {
              if(this.bankDetailList.length===1){
                id='\"'+this.bankDetailList[i].bankDetailID+'\"'
              }else{
                if(i === this.bankDetailList.length-1){
                  id=id+'\"'+this.bankDetailList[i].bankDetailID+'\"'
                }else if(i === 0){
                  id='\"'+this.bankDetailList[i].bankDetailID+'\",'
                }else{
                  id=id+'\"'+this.bankDetailList[i].bankDetailID+'\",'
                }
              }
            }

            let params={
              id:id
            }
            this.ajaxJson({
              url: '/dailyoffice/deposit/getDepositList',
              data: params,
              call: (data) => {
                let insertDate = new Date(accAdd(new Date().getTime(), accMul(this.bankDetailList.length, 1000)))
                for (let j = 0; j < this.bankDetailList.length; j++) {
                  for (let i = 0; i < data.length; i++) {
                    if(this.bankDetailList[j].bankDetailID===data[i].id){
                      this.bankDetailList[j].remark= data[i].remark
                      this.bankDetailList[j].subject= data[i].subject
                      this.bankDetailList[j].subjectID= data[i].subjectID
                      this.bankDetailList[j].cccurDate=data[i].workDate
                      this.bankDetailList[j].other=data[i].other
                      this.bankDetailList[j].otherAccount=data[i].otherAccount
                      this.bankDetailList[j].useMoney=this.bankDetailList[j].money
                      this.bankDetailList[j].maxMoney=accAdd(this.bankDetailList[j].money,data[i].useMoney)+''
                    }
                  }
                }
                this.depositList=this.bankDetailList
                this.bankDetailList=[]
              }
            })
          }else if(this.nature === '8'){
            let params={
              id:this.bankDetailList[0].bankDetailID
            }
            this.ajaxJson({
              url: '/dailyoffice/payDeposit/initForm',
              data: params,
              call: (data) => {
                let insertDate = new Date(accAdd(new Date().getTime(), accMul(this.payDepositList.length, 1000)))
                this.payDepositList.push({
                  id: guid(),
                  bankDetailID: data.id,
                  insertDate: formatTime(insertDate),
                  ownerID: this.id,
                  remark: data.remark,
                  subject: data.subject,
                  subjectID: data.subjectID,
                  cccurDate: data.workDate,
                  other: data.other,
                  otherAccount: data.otherAccount,
                  refundDate:data.refundDate,
                  money: data.money,
                  useMoney: '0',
                  maxMoney: data.money,
                })
                this.bankDetailList=[]
              }
            })
          }else if(this.nature === '9'){
            let params={
              id:this.bankDetailList[0].bankDetailID
            }
            this.ajaxJson({
              url: '/dailyoffice/expressCompany/getExpressForm',
              data: params,
              call: (data) => {
                let insertDate = new Date(accAdd(new Date().getTime(), accMul(this.payDepositList.length, 1000)))
                this.expressList.push({
                  id: guid(),
                  bankDetailID: data.id,
                  insertDate: formatTime(insertDate),
                  ownerID: this.id,
                  startDate:data.startDate,
                  endDate:data.endDate,
                  money:data.countMoney,
                  storeName:data.storeName,
                })
                console.log(this.expressList)
                this.bankDetailList=[]
              }
            })
          }
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
    },
  },

  created () {
    this.initData();
    this.selectedList();
    this.selectedRelated();
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
