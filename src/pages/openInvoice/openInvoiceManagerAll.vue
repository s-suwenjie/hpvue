<template>
  <div>
    <yhm-managerpage category="1">
      <!--导航条-->
      <!--<template #navigation>财务管理&nbsp;&gt;&nbsp;票据&nbsp;&gt;&nbsp;发票管理</template>-->
      <!--导航条-->

      <template #navigationTab>
        <router-link class="menuTabDiv" :to="{path:'/home/invoiceTilingManager'}">库存发票</router-link>
        <router-link class="menuTabDiv" :to="{path:'/home/openInvoiceFinManager'}">开票通知</router-link>
        <router-link class="menuTabDiv menuTabActive" :to="{path:'/home/openInvoiceManagerAll'}">开票审批中</router-link>
      </template>
      <template #operate>
        <yhm-commonbutton :value="choose?'收起筛选':'展开筛选'"  :icon="choose?'btnUp':'btnDown'" @call="switchChoose()"></yhm-commonbutton>
        <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initData"></yhm-managersearch>
        <yhm-radiofilter  @initData="initChoose('state')" title="开票状态" :content="statePsd"></yhm-radiofilter>
        <yhm-radiofilter  @initData="initChoose('category')" title="开票类型" :content="categoryPsd"></yhm-radiofilter>
        <yhm-radiofilter  @initData="initChoose('invoiceCategory')" title="发票类型" :content="invoiceCategoryPsd"></yhm-radiofilter>
        <yhm-radiofilter  @initData="initChoose('purchaserType')" title="购买方类型" :content="purchaserTypePsd"></yhm-radiofilter>
        <yhm-radiofilter  @initData="initChoose('isReceivables')" title="款项状态" :content="isReceivablesPsd"></yhm-radiofilter>
      </template>
      <!--筛选区-->
      <template #choose>
        <div v-show="choose" class="buttonBody mptZero">
        </div>
      </template>
      <template #listHead>
        <yhm-managerth style="width: 38px;" title="选择"></yhm-managerth>
        <yhm-managerth style="width: 40px;" title="查看"></yhm-managerth>
        <yhm-managerth style="width: 110px;" title="申请时间" value="applyDate"></yhm-managerth>
        <yhm-managerth style="width: 190px;" title="付款方" value="purchaserID"></yhm-managerth>
        <yhm-managerth style="width: 80px;" title="发票金额" value="invoiceMoney"></yhm-managerth>
        <yhm-managerth style="width: 60px;" title="税率（%）"></yhm-managerth>
        <yhm-managerth style="width: 70px;" title="税额"></yhm-managerth>
        <yhm-managerth style="width: 80px;" title="开票事由" value="subujectID"></yhm-managerth>
        <yhm-managerth style="width: 190px;" title="发票抬头" value="purchaserID"></yhm-managerth>
        <yhm-managerth style="width: 120px;" title="发票类型" value="invoiceCategory"></yhm-managerth>
        <yhm-managerth style="width: 70px;" title="款项状态" value=""></yhm-managerth>
        <yhm-managerth style="width: 110px;" title="预计收款日期" value="personID"></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="状态" value=""></yhm-managerth>
      </template>
      <template #listBody>
        <tr v-for="(item,index) in content" :key="index" :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0},{listDelLine: item.isFinish === '4'}]">
          <yhm-manager-td-checkbox :value="item"></yhm-manager-td-checkbox>
          <yhm-manager-td-look @click="view(item)"></yhm-manager-td-look>
          <yhm-manager-td-date :value="item.applyDate"></yhm-manager-td-date>
          <yhm-manager-td :tip="true" :value="item.payer" @click="selectPayer(item)"></yhm-manager-td>
          <yhm-manager-td-money style="color:#49a9ea" :value="item.invoiceMoney"></yhm-manager-td-money>
          <yhm-manager-td-money :value="item.taxRate"></yhm-manager-td-money>
          <yhm-manager-td-money :value="item.taxAmount"></yhm-manager-td-money>
          <yhm-manager-td-psd  :value="item.category" :list="categoryList"></yhm-manager-td-psd>
          <yhm-manager-td :tip="true" :value="item.purchaser" @click="selectUnit(item)"></yhm-manager-td>
          <yhm-manager-td-psd :value="item.invoiceCategory" :list="invoiceCategoryList"></yhm-manager-td-psd>
          <yhm-manager-td-psd :value="item.isReceivables" @click="clickSelect(item)" :list="isReceivablesList"></yhm-manager-td-psd>
          <yhm-manager-td-date :value="item.moneyBackDate"></yhm-manager-td-date>
          <yhm-manager-td-state :value="item.stateVal" :stateColor="item.stateColor" :stateImg="item.stateImg"></yhm-manager-td-state>
        </tr>
      </template>
      <!--数据空提示-->
      <template #empty>
        <span class="m_listNoData" v-show="empty">暂时没有数据</span>
      </template>
      <template #total>
        <div class="listTotalCrente m_list" style="width: 280px">
          <div style="width: 280px;">
            <table width="100%" cellpadding="0" cellspacing="0" class="m_content_table m_content_total_table">
              <thead>
              <tr>
                <yhm-managerth style="width: 100px;" before-color="black" title="" before-title="总张数" ></yhm-managerth>
                <yhm-managerth style="width: 100px;" before-color="#ff0000" title="" before-title="总金额"></yhm-managerth>
              </tr>
              </thead>
              <tbody>
              <tr>
                <yhm-manager-td-rgt v-for="(item,index) in contentTotal" :key="index" :value="item.count"></yhm-manager-td-rgt>
                <yhm-manager-td-money v-for="(item,index) in contentTotal" :style="{color:item.money<0?'#ff0000':''}" :key="index" :value="item.money"></yhm-manager-td-money>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </template>
      <!--分页控件-->
      <template #pager>
        <yhm-pagination :pager="pager" @initData="initPageData(false)"></yhm-pagination>
      </template>
      <!--数据空提示-->

    </yhm-managerpage>
  </div>
</template>

<script>
  import { managermixin } from '@/assets/manager.js'
  import { formatDate ,accAdd, guid,accMul,formatTime} from '@/assets/common.js'
  export default {
    name: 'openInvoiceManagerAll',
    mixins: [managermixin],
    data(){
      return{
        isReceivablesList:[],
        isReceivables:'',
        isReceivablesPsd: {
          value: '',
          list: []
        },
        categoryList:[],
        category:'',
        categoryPsd: {
          value: '',
          list: []
        },
        purchaserTypeList:[],
        purchaserType:'',
        purchaserTypePsd: {
          value: '',
          list: []
        },
        state:'',
        statePsd: {
          value: '',
          list: []
        },
        invoiceType:'',
        invoiceTypePsd:{
          value: '',
          list: []
        },
        invoiceCategoryList:[],
        invoiceCategory:'',
        invoiceCategoryPsd: {
          value: '',
          list: []
        },
        contentTotal:[],
        stockTotal:[]
      }
    },
    methods:{
      selectPayer(item){
        let url='/unitView?id=' + item.payerID
        let title='查看单位信息'
        if(item.payerType === '1'){
          url='/personView?id=' + item.payerID
          title='查看联系人信息'
        }
        this.$dialog.OpenWindow({
          width: '1050',
          height: '690',
          url:url,
          title:title,
          closeCallBack:(data) =>{
            if(data){
              this.initPageData(false)
            }
          }
        })
      },
      selectUnit(item){
        if(item.purchaserType==='0'){
          this.$dialog.OpenWindow({
            width: '1050',
            height: '690',
            url:'/unitView?id=' + item.purchaserID,
            title:'查看单位信息',
            closeCallBack:(data) =>{
              if(data){
                this.initPageData(false)
              }
            }
          })
        }else if(item.purchaserType==='1'){
          this.$dialog.OpenWindow({
            width: '1050',
            height: '750',
            url: '/personView?id=' + item.purchaserID,
            title: '查看联系人信息',
            closeCallBack: (data)=>{
              if(data){
                this.initPageData(false)
              }
            }
          })
        }else{
          this.$dialog.OpenWindow({
            width: '1050',
            height: '500',
            url: '/vehicleView?id=' + item.purchaserID,
            title: '查看车辆信息',
            closeCallBack: (data)=>{
              if(data){
                this.initPageData(false)
              }
            }
          })
        }
      },
      view(item){
        let url=''
        let title=''
        if(item.id){
          // if(item.state !== '0'){
          url='/openInvoiceView?id='+item.id +'&type=0'
          // }else{
          // url='/openInvoiceForm?id='+item.id
          // }
          title='查看开票信息'
        }
        this.$dialog.OpenWindow({
          width: '1050',
          height: '790',
          title: title,
          url:url,
          closeCallBack: (data)=>{
            if(data){
              this.initPageData(false)
            }
          }
        })
      },
      initPageData(initValue){
        let params = {}

        if (initValue) {
          params = {
            state:'1'
          }
        } else {
          params = {
            state:this.statePsd.value,
            invoiceCategory:this.invoiceCategoryPsd.value,
            purchaserType:this.purchaserTypePsd.value,
            isReceivables:this.isReceivablesPsd.value,
            category:this.categoryPsd.value
          }
        }
        this.init({
          initValue:initValue,
          url: '/Bill/openInvoiceFinManagerAll',
          data:params,
          all:(data) =>{
            this.contentTotal = data.total
            this.invoiceTypePsd=data.invoiceTypePsd
          },
          init:(data)=>{
            this.statePsd = data.statePsd
            this.invoiceCategoryPsd = data.invoiceCategoryPsd
            this.invoiceCategoryList = data.invoiceCategoryPsd.list
            this.purchaserTypePsd=data.purchaserTypePsd
            this.purchaserTypeList=data.purchaserTypePsd.list
            this.isReceivablesPsd=data.isReceivablesPsd
            this.isReceivablesList=data.isReceivablesPsd.list
            this.categoryPsd=data.categoryPsd
            this.categoryList=data.categoryPsd.list
            this.invoiceTypePsd=data.invoiceTypePsd
            this.stockTotal=data.stockTotal
          }
        })
      },
    },
    created () {

    }
  }
</script>

<style scoped>

</style>
