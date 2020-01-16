<template>
  <div class="f_main">
    <yhm-view-body :customize="true" :pager="false">
      <template #title>基本信息</template>
      <template #body>
        <yhm-view-control title="申请人" :content="person"></yhm-view-control>
        <yhm-view-control title="申请日期" :content="applyDate" type="date"></yhm-view-control>
        <yhm-view-control title="购买方类型" :content="purchaserType" :psd="purchaserTypeList"></yhm-view-control>
        <yhm-view-control title="购买方" :content="purchaser" ></yhm-view-control>
        <yhm-view-control title="事由" :content="subject" ></yhm-view-control>
        <yhm-view-control title="增票类型" :content="invoiceCategory" :psd="invoiceCategoryList"></yhm-view-control>
        <yhm-view-control title="款项状态" :content="isReceivables" :psd="isReceivablesList"></yhm-view-control>
        <yhm-view-control title="发票金额" :content="invoiceMoney" ></yhm-view-control>
        <yhm-view-control title="金额大写" :content="invoiceMoneyUp"></yhm-view-control>
        <yhm-view-control title="预计回款日期" v-if="isInit" :content="moneyBackDate" type="date"></yhm-view-control>
        <yhm-view-control title="预计使用日期" v-if="isInit" :content="preUseDate" type="date"></yhm-view-control>
        <yhm-view-control title="事由说明" :content="remark"></yhm-view-control>
      </template>
    </yhm-view-body>
    <div class="f_split"></div>
    <yhm-view-tab>
      <template #tab>
        <yhm-view-tab-button :list="tabState" :index="0">商品信息</yhm-view-tab-button>
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
      </template>
    </yhm-view-tab>
    <div class="f_split"></div>
    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
<!--      <template #btn>-->
<!--        <yhm-commonbutton value="编辑" icon="i-edit" :flicker="true" @call="editBtn()"></yhm-commonbutton>-->
<!--      </template>-->
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
        tabState:[{select:true}],
      }
    },
    methods: {
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

            this.subject=data.subject
            this.moneyBackDate=data.moneyBackDate
            this.invoiceMoney=data.invoiceMoney

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
