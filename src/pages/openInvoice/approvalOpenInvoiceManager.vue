<template>
  <div>
    <yhm-managerpage category="1">
      <!--导航条-->
      <template #navigationTab>
        <router-link class="menuTabDiv" :to="{path:'/home/approvalPayPlanManager'}">付款计划
          <i class="noticeNum" v-if="payPlanNum!=0">{{payPlanNum}}</i>
        </router-link>
        <router-link class="menuTabDiv " :to="{path:'/home/approvalPayManager'}">付款申请
          <i class="noticeNum" v-if="paymentNum!=0">{{paymentNum}}</i>
        </router-link>
        <router-link class="menuTabDiv" :to="{path:'/home/approvalReimbursementManager'}">报销
          <i class="noticeNum" v-if="reimburseNum!=0">{{reimburseNum}}</i>
        </router-link>
        <router-link class="menuTabDiv" :to="{path:'/home/approvalPurchaseManager'}">采购计划
          <i class="noticeNum" v-if="purchaseNum!=0">{{purchaseNum}}</i>
        </router-link>
        <router-link class="menuTabDiv" :to="{path:'/home/approvalPrettyCashs'}">备用金
          <i class="noticeNum" v-if="prettyCashsNum!=0">{{prettyCashsNum}}</i>
        </router-link>
        <router-link class="menuTabDiv" :to="{path:'/home/approvalInsuranceManager'}">保险审批
          <i class="noticeNum" v-if="insuranceNum!=='0'">{{insuranceNum}}</i>
        </router-link>
        <router-link class="menuTabDiv menuTabActive" :to="{path:'/home/approvalOpenInvoiceManager'}">开票审批</router-link>
      </template>
      <!--操作区-->
      <template #operate>
        <yhm-commonbutton :value="choose?'收起筛选':'展开筛选'"  :icon="choose?'btnUp':'btnDown'" @call="switchChoose()"></yhm-commonbutton>
        <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initData"></yhm-managersearch>
        <yhm-radiofilter  @initData="initChoose('state')" title="审批状态" :content="statePsd"></yhm-radiofilter>
        <yhm-radiofilter  @initData="initChoose('category')" title="开票类型" :content="categoryPsd"></yhm-radiofilter>
      </template>
      <!--筛选区-->
      <template #choose>
        <div v-show="choose" class="buttonBody mptZero">
          <yhm-radiofilter  @initData="initChoose('purchaserType')" title="购买方类型" :content="purchaserTypePsd"></yhm-radiofilter>
          <yhm-radiofilter  @initData="initChoose('isReceivables')" title="款项状态" :content="isReceivablesPsd"></yhm-radiofilter>
          <yhm-radiofilter  @initData="initChoose('invoiceCategory')" title="发票类型" :content="invoiceCategoryPsd"></yhm-radiofilter>
        </div>
      </template>
      <template #listHead>
        <yhm-managerth style="width: 38px;" title="选择"></yhm-managerth>
        <yhm-managerth style="width: 50px;" title="查看"></yhm-managerth>
        <yhm-managerth style="width: 110px;" title="申请人" value="personID"></yhm-managerth>
        <yhm-managerth style="width: 110px;" title="申请时间" value="applyDate"></yhm-managerth>
        <yhm-managerth style="width: 80px;" title="发票金额" value="invoiceMoney"></yhm-managerth>
        <yhm-managerth style="width: 120px;" title="开票事由" value="subujectID"></yhm-managerth>
        <yhm-managerth style="width: 230px;" title="购买方" value="purchaserID"></yhm-managerth>
        <yhm-managerth style="width: 150px;" title="发票类型" value="invoiceCategory"></yhm-managerth>
        <yhm-managerth style="width: 80px;" title="款项状态" value=""></yhm-managerth>
        <yhm-managerth style="width: 110px;" title="预计收款日期" value="personID"></yhm-managerth>
        <yhm-managerth style="width: 60px;" title="审批留言"></yhm-managerth>
        <yhm-managerth style="width: 150px;" title="状态" value=""></yhm-managerth>
        <yhm-managerth  title="操作" value=""></yhm-managerth>
      </template>
      <template #listBody>
        <tr v-for="(item,index) in content" :key="index" :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]">
          <yhm-manager-td-checkbox :value="item"></yhm-manager-td-checkbox>
          <yhm-manager-td-look @click="view(item)"></yhm-manager-td-look>
          <yhm-manager-td :value="item.person"></yhm-manager-td>
          <yhm-manager-td-date :value="item.applyDate"></yhm-manager-td-date>
          <yhm-manager-td-money :value="item.invoiceMoney"></yhm-manager-td-money>
          <yhm-manager-td-psd  :value="item.category" :list="categoryList"></yhm-manager-td-psd>
          <yhm-manager-td :value="item.purchaser"></yhm-manager-td>
          <yhm-manager-td-psd :value="item.invoiceCategory" :list="invoiceCategoryList"></yhm-manager-td-psd>
          <yhm-manager-td-psd :value="item.isReceivables" :list="isReceivablesList"></yhm-manager-td-psd>
          <yhm-manager-td-date :value="item.moneyBackDate"></yhm-manager-td-date>
          <yhm-manager-td-leaveword @iconClick="SelectApprovalMessage(item)" :leave-word-show="item.approvalMessage === '1'?true:false"></yhm-manager-td-leaveword>
          <yhm-manager-td-state :value="item.stateVal" :stateColor="item.stateColor" :stateImg="item.stateImg"></yhm-manager-td-state>
          <yhm-manager-td-operate>
            <yhm-manager-td-operate-button v-show="item.isApproval === '0' " :no-click="item.isApproval!=='0'" @click="adoptEvent(item)" value="通过" icon="i-btn-applicationSm" color="#49a9ea"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button v-show="item.isApproval === '0' " :no-click="item.isApproval!=='0'" @click="rejectEvent(item)" value="驳回" icon="i-btn-turnDown" color="#FF0000"></yhm-manager-td-operate-button>
          </yhm-manager-td-operate>
        </tr>
      </template>
      <!--数据空提示-->
      <template #empty>
        <span class="m_listNoData" v-show="empty">暂时没有数据</span>
      </template>
      <template #total>
        <div class="listTotalCrente m_list w620">
          <table width="100%" cellpadding="0" cellspacing="0" class="m_content_table m_content_total_table">
            <thead>
            <tr>
              <yhm-managerth style="width: 100px;" before-color="black" title="" before-title="总数" ></yhm-managerth>
              <yhm-managerth style="width: 100px;" before-color="#ff0000" title="" before-title="总金额"></yhm-managerth>
            </tr>
            </thead>
            <tbody>
            <tr>
              <yhm-manager-td-rgt v-for="(item,index) in contentTotal" :key="index" :value="item.count"></yhm-manager-td-rgt>
              <yhm-manager-td-money v-for="(item,index) in contentTotal" :key="index" :value="item.money"></yhm-manager-td-money>
            </tr>
            </tbody>
          </table>
        </div>
      </template>
      <!--分页控件-->
      <template #pager>
        <yhm-pagination :pager="pager" @initData="initPageData(false)"></yhm-pagination>
      </template>

    </yhm-managerpage>
  </div>
</template>

<script>
  import { managermixin } from '@/assets/manager.js'
  export default {
    name: 'approvalOpenInvoiceManager',
    mixins: [managermixin],
    data(){
      return{
        payPlanNum: '',
        paymentNum: '',
        reimburseNum: '',
        purchaseNum: '',
        prettyCashsNum:'',
        insuranceNum:'',
        openInvoice:'',

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
        stateList:[],
        state:'',
        statePsd: {
          value: '',
          list: []
        },
        invoiceCategoryList:[],
        invoiceCategory:'',
        invoiceCategoryPsd: {
          value: '',
          list: []
        },
        contentTotal:[]
      }
    },
    methods:{
      SelectApprovalMessage(item){
        this.$dialog.OpenWindow({
          width: '650',
          height: '300',
          title: '查看审批留言信息',
          url:'/approvalMessage?id='+item.id,
          closeCallBack: (data)=>{
            if(data){
            }
          }
        })
      },
      adoptEvent (item) { //
        if(item.isApproval!=='1'){
          if(item.id){
            this.$dialog.OpenWindow({
              width: 650,
              height: 230,
              title: '审批留言',
              url: '/passMessage?id=' + item.id+ '&tableName=48&kind=0',
              closeCallBack: (acc)=>{
                this.initPageData(false)
              }
            })
          }
        }
      },
      rejectEvent (item) {
        if(item.isApproval!=='1') {
          if (item.id) {
            let params = {
              id: item.id,
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
                    url: '/rejectReason?category=' + this.category + '&id=' + item.id+'&tableName=48&kind=0',
                    closeCallBack: (data) => {
                      this.initPageData(false)
                    }
                  })
                }
              }
            })
          }
        }
      },
      view(item){
        let url=''
        let title=''
        if(item.id){
          // if(item.state !== '0'){
          url='/openInvoiceView?id='+item.id +'&type=1'
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
            state: this.statePsd.value,
            invoiceCategory:this.invoiceCategoryPsd.value,
            purchaserType:this.purchaserTypePsd.value,
            isReceivables:this.isReceivablesPsd.value,
            category:this.categoryPsd.value
          }
        }
        this.init({
          initValue:initValue,
          url: '/Bill/approvalOpenInvoiceManager',
          data:params,
          all:(data) =>{
            this.contentTotal = data.total
          },
          init:(data)=>{
            this.statePsd = data.statePsd
            this.stateList = data.statePsd.list
            this.invoiceCategoryPsd = data.invoiceCategoryPsd
            this.invoiceCategoryList = data.invoiceCategoryPsd.list
            this.purchaserTypePsd=data.purchaserTypePsd
            this.purchaserTypeList=data.purchaserTypePsd.list
            this.isReceivablesPsd=data.isReceivablesPsd
            this.isReceivablesList=data.isReceivablesPsd.list
            this.categoryPsd=data.categoryPsd
            this.categoryList=data.categoryPsd.list

          }
        })
      },
    },
    created () {
      this.ajaxJson({
        url: '/PersonOffice/approvalManagerAllNumber',
        call: (data)=>{
          this.payPlanNum = data.payPlan
          this.paymentNum = data.payment
          this.reimburseNum = data.reimbursements
          this.purchaseNum = data.purchase
          this.prettyCashsNum = data.prettyCashs
          this.insuranceNum=data.insurance
          this.openInvoice=data.openInvoice
        }
      })
    }
  }
</script>

<style scoped>

</style>
