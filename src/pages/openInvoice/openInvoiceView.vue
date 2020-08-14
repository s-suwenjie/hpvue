<template>
  <div class="f_main">
    <yhm-view-body :customize="true" :pager="false">
      <template #title>基本信息</template>
      <template #body>
        <yhm-view-control title="申请人" :content="person"></yhm-view-control>
        <yhm-view-control title="申请日期" :content="applyDate" type="date"></yhm-view-control>
        <yhm-view-control title="购买方类型" :content="purchaserType" :psd="purchaserTypeList"></yhm-view-control>
        <yhm-view-control title="购买方" :content="purchaser" ></yhm-view-control>
        <yhm-view-control title="开票事由" :content="category" :psd="categoryList"></yhm-view-control>
        <yhm-view-control title="工单号" v-if="isCategory" :content="workOrder"></yhm-view-control>
        <yhm-view-control title="车牌号" v-if="isCategory" :content="licensePlateNumber"></yhm-view-control>
        <yhm-view-control title="增票类型" :content="invoiceCategory" :psd="invoiceCategoryList"></yhm-view-control>
        <yhm-view-control title="款项状态" :content="isReceivables" :psd="isReceivablesList"></yhm-view-control>
        <yhm-view-control title="发票金额" :content="invoiceMoney" ></yhm-view-control>
        <yhm-view-control title="金额大写" :content="invoiceMoneyUp"></yhm-view-control>
        <yhm-view-control title="预计回款日期" v-if="isInit" :content="moneyBackDate" type="date"></yhm-view-control>
        <yhm-view-control title="预计使用日期" v-if="isInit" :content="preUseDate" type="date"></yhm-view-control>
        <yhm-view-control title="发票处理" :content="invoiceHandle" :psd="invoiceHandleList"></yhm-view-control>
        <yhm-view-control title="快递号" v-if="isExpressID" :content="expressID"></yhm-view-control>
        <yhm-view-control title="事由说明" :content="remark"></yhm-view-control>
      </template>
    </yhm-view-body>
    <div class="f_split"></div>
    <yhm-view-tab>
      <template #tab>
        <yhm-view-tab-button :list="tabState" :index="0">商品信息</yhm-view-tab-button>
        <yhm-view-tab-button :list="tabState" :index="1" v-if="isBankList">收支信息</yhm-view-tab-button>
      </template>
      <template #content>
        <yhm-view-tab-list :customize="true"  v-show="tabState[0].select">
          <template #listHead>
            <yhm-managerth style="width: 160px" title="商品名称"></yhm-managerth>
            <yhm-managerth style="width: 180px" title="型号"></yhm-managerth>
            <yhm-managerth style="width: 90px" title="数量"></yhm-managerth>
            <yhm-managerth style="width: 60px" title="单位"></yhm-managerth>
            <yhm-managerth style="width: 90px" title="单价"></yhm-managerth>
            <yhm-managerth style="width: 90px" title="总额"></yhm-managerth>
            <yhm-managerth style="width: 200px" title="备注"></yhm-managerth>
          </template>
          <template #listBody>
            <tr v-for="(item,index) in productDetails" :key="index" :class="{InterlacBg:index%2!==0}">
              <yhm-manager-td width="160" :value="item.product" ></yhm-manager-td>
              <yhm-manager-td width="180" :value="item.model"></yhm-manager-td>
              <yhm-manager-td width="90" :value="item.quantity"></yhm-manager-td>
              <yhm-manager-td width="60" :value="item.unit"></yhm-manager-td>
              <yhm-manager-td-money width="90" :value="item.price"></yhm-manager-td-money>
              <yhm-manager-td-money :value="item.totalMoney"></yhm-manager-td-money>
              <yhm-manager-td width="200"  :value="item.remark"></yhm-manager-td>
            </tr>
          </template>
          <template #empty v-if="empty">
            <span class="m_listNoData">暂时没有数据</span>
          </template>
        </yhm-view-tab-list>
        <yhm-view-tab-list :customize="true"  v-show="tabState[1].select" v-if="isBankList">
          <template #listHead>
            <yhm-managerth style="width: 150px" title="账号"></yhm-managerth>
            <yhm-managerth style="width: 150px" title="对方账号"></yhm-managerth>
            <yhm-managerth style="width: 140px" title="交易日期"></yhm-managerth>
            <yhm-managerth style="width: 80px" title="收支方向"></yhm-managerth>
            <yhm-managerth style="width: 110px" title="事由"></yhm-managerth>
            <yhm-managerth style="width: 120px" title="交易金额"></yhm-managerth>
            <yhm-managerth style="width: 120px" title="开票金额"></yhm-managerth>
            <yhm-managerth style="width: 110px" title="备注"></yhm-managerth>
            <yhm-managerth style="width: 100px" title="凭证"></yhm-managerth>
          </template>
          <template #listBody>
            <tr v-for="(item,index) in bankDetailList" :class="{InterlacBg:index%2!=0}" :key="index">
              <yhm-manager-td :value="item.selfAccount"></yhm-manager-td>
              <yhm-manager-td :value="item.otherAccount"></yhm-manager-td>
              <yhm-manager-td-date :value="item.cccurDate"></yhm-manager-td-date>
              <yhm-manager-td-direction :direction="item.direction" class="dfJcc" :value="item.direction" :dir-val="false"></yhm-manager-td-direction>
              <yhm-manager-td :value="item.subject"></yhm-manager-td>
              <yhm-manager-td-money :value="item.money"></yhm-manager-td-money>
              <yhm-manager-td-money :value="item.useMoney"></yhm-manager-td-money>
              <yhm-manager-td :value="item.remark"></yhm-manager-td>
              <yhm-manager-td-image :tip="true" width="850" height="600" left="50" type="files" :value="item.storeName" :tag="'bankDetail'" ></yhm-manager-td-image>
            </tr>
          </template>
          <template #empty>
            <span class="m_listNoData"  v-show="bankDetailList.length>=1?false:true">暂时没有数据</span>
          </template>
        </yhm-view-tab-list>
      </template>
    </yhm-view-tab>
    <div class="f_split"></div>
    <div v-show="type==='0'" v-html="approvalHtml"></div>
    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn>
        <yhm-commonbutton v-show="isApproval === '0'&&type==='1' " @call="adoptEvent" value="通过" icon="i-btn-applicationSm" color="#49a9ea" :flicker="true"></yhm-commonbutton>
        <yhm-commonbutton v-show="isApproval === '0'&&type==='1'" @call="rejectEvent" value="驳回" icon="i-btn-turnDown" color="#FF0000" category="ten"></yhm-commonbutton>

      </template>
    </yhm-formoperate>
  </div>
</template>

<script>
  import { formmixin } from '@/assets/form.js'
  import { formatDate ,accAdd, guid,accMul} from '@/assets/common.js'
  export default {
    name: 'openInvoiceView',
    mixins: [formmixin],
    data(){
      return{
        tabState:[{select:true},{select:false}],
        personID:'',//申请人
        person:'',
        applyDate:'',//申请日期
        maxApplyDate:formatDate(new Date()),
        purchaser:'',//
        purchaserID:'',//购买方
        subject:'',
        subjectID:'',//事由
        invoiceMoney:'',//发票金额
        invoiceMoneyUp:'',//金额大写
        sumMoney:'',//商品金额
        remark:'',//事由说明
        preUseDate:'',//预计使用日期
        minPreUseDate:formatDate(new Date()),
        moneyBackDate:'',//预计回款日期
        minMoneyBackDate:formatDate(new Date()),
        productDetails:[],
        empty:true,

        isWare:false,//发票类型是否能选择
        isAdd:'',//是否是第一次请求
        isInit:false,//未付款   是隐藏  预计使用时间
        invoiceCategory:'',
        invoiceCategoryList:[],
        ownerSysNoList:[],
        isReceivables:'',
        isReceivablesList:[],
        purchaserType:'',
        purchaserTypeList:[],
        categoryList:[],
        category:'',
        isBankList:false,
        invoiceHandleList:[],
        invoiceHandle:'',
        isExpressID:false,
        isCategory:false,
        workOrder:'',
        ownerID:'',
        ownerCategory:'',
        isApproval:'',
        approvalHtml:'',
        type:'',
      }
    },
    methods: {
      adoptEvent () { //
        if (this.id) {
          this.$dialog.OpenWindow({
            width: 650,
            height: 230,
            title: '审批留言',
            url: '/passMessage?id=' + this.id + '&tableName=48&kind=0',
            closeCallBack: (data) => {
              this.$dialog.setReturnValue(this.id)
              this.initData()
            }
          })
        }
      },
      rejectEvent(){
        if (this.id) {
          let params = {
            id: this.id,
            tableName: '48',
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
                  url: '/rejectReason?category=' + this.category + '&id=' + this.id+'&tableName=48&kind=0',
                  closeCallBack: (data) => {
                    if(data){
                      this.$dialog.setReturnValue('123')
                      this.initData()
                    }
                  }
                })
              }
            }
          })
        }
      },
      initData(){
        let params = {

        }
        this.init({
          url: '/Bill/openInvoiceForm',
          data: params,
          all: (data)=>{
            this.purchaserType=data.purchaserTypePsd.value
            this.purchaserTypeList=data.purchaserTypePsd.list
            this.invoiceCategory=data.invoiceCategoryPsd.value
            this.invoiceCategoryList=data.invoiceCategoryPsd.list
            this.isReceivables=data.isReceivablesPsd.value
            this.isReceivablesList=data.isReceivablesPsd.list
            this.categoryList=data.categoryPsd.list
            this.invoiceHandleList=data.invoiceHandlePsd.list
            this.isApproval=data.isApproval
          },
          add: (data)=>{

          },
          look: (data)=>{
            this.id=data.id
            this.personID=data.personID
            this.person=data.person
            this.applyDate=data.applyDate
            this.purchaserID=data.purchaserID
            this.purchaser=data.purchaser
            this.subjectID=data.subjectID
            this.approvalHtml=data.approvalHtml

            this.category=data.category
            if(this.category === '2'){
              this.isCategory=true
            }

            this.moneyBackDate=data.moneyBackDate
            this.invoiceMoney=data.invoiceMoney
            this.invoiceHandle=data.invoiceHandle
            if(this.invoiceHandle === '1'){
              this.isExpressID=true
            }
            this.invoiceMoneyUp=data.invoiceMoneyUp
            this.preUseDate=data.preUseDate
            this.remark=data.remark
            this.productDetails=data.productDetails
            if(this.isReceivables==='1'){
              this.isInit=true
            }
            if(data.productDetails.length>0){
              this.empty = this.productDetails.length === 0
            }
            this.bankDetailList=data.bankDetailList
            if(this.bankDetailList.length>0){
              this.isBankList=true
            }
          }
        })
      }
    },
    created () {
      this.setQuery2Value('type')
      this.initData()
    }
  }
</script>

<style scoped>

</style>
