<template>
  <div>
    <yhm-managerpage category="1">
      <!--导航条-->

        <template #navigationTab>
          <router-link class="menuTabDiv " :to="{path:'/home/approvalPayPlanManager'}">付款计划</router-link>
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
            <i class="noticeNum" v-if="insuranceNum!='0'">{{insuranceNum}}</i>
          </router-link>
          <router-link class="menuTabDiv" :to="{path:'/home/approvalOpenInvoiceManager'}">开票审批
            <i class="noticeNum" v-if="openInvoiceNum!='0'">{{openInvoiceNum}}</i>
          </router-link>
          <router-link class="menuTabDiv" :to="{path:'/home/promotions/promotionsAppManager'}">活动审批
            <i class="noticeNum" v-if="promotions!='0'">{{promotions}}</i>
          </router-link>
          <router-link class="menuTabDiv" :to="{path:'/home/invoicelookUpManager'}">发票抬头
            <i class="noticeNum" v-if="invoiceRiseNum!='0'">{{invoiceRiseNum}}</i>
          </router-link>
          <router-link class="menuTabDiv menuTabActive" :to="{path:'/home/expressApprovalManager'}">快递审批
            <!--<i class="noticeNum" v-if="paymentNum!=0">{{paymentNum}}</i>-->
          </router-link>
      </template>
      <!--操作区-->
      <template #operate>
        <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initChoose()"></yhm-managersearch>
        <yhm-radiofilter :before="expressCompanyBefore" @initData="initChoose('state')" title="完成状态"  all="0"  :content="listState"></yhm-radiofilter>

      </template>
      <!--数据表头-->
      <template #listHead>
        <yhm-managerth style="width: 40px;" title="选择"></yhm-managerth>
        <yhm-managerth style="width: 40px;" title="查看"></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="分类" value="letterClassification"></yhm-managerth>
        <yhm-managerth style="width: 150px;" title="快递公司"  value="companyName"></yhm-managerth>
        <yhm-managerth style="width: 150px;" title="业务类型"  value="businessType"></yhm-managerth>
        <yhm-managerth style="width: 150px;" title="寄件人" value="wePersonName"></yhm-managerth>
        <yhm-managerth  title="收件方公司信息" value="unit"></yhm-managerth>
        <yhm-managerth width="100" title="收件人" value="otherPartyPersonName"></yhm-managerth>
        <yhm-managerth style="width: 150px" title="收寄时间" value="workDate"></yhm-managerth>
        <yhm-managerth style="width: 200px" title="地址区域" value="regionName"></yhm-managerth>
        <yhm-managerth style="width: 300px;" title="操作"></yhm-managerth>
      </template>

      <!--数据明细-->
      <template #listBody>
        <tr :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]" v-for="(item,index) in content" :key="index">
          <yhm-manager-td-checkbox :value="item"></yhm-manager-td-checkbox>
          <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>
          <yhm-manager-td-psd :value="item.letterClassification" :list="listLetterClassification.list"></yhm-manager-td-psd>
          <yhm-manager-td-center :tip="true" :value="item.companyName"></yhm-manager-td-center>
          <yhm-manager-td-psd :value="item.businessType" :list="listBusinessType.list"></yhm-manager-td-psd>
          <!--<yhm-manager-td-center :tip="true" v-if="listName.length" :value="item.wePersonName"></yhm-manager-td-center>-->
          <yhm-manager-td-center :tip="true" :value="item.wePersonName"></yhm-manager-td-center>
          <yhm-manager-td :value="item.unit"></yhm-manager-td>
          <yhm-manager-td :value="item.otherPartyPersonName"></yhm-manager-td>
          <yhm-manager-td-date :value="item.workDate"></yhm-manager-td-date>
          <yhm-manager-td :value="item.regionName"></yhm-manager-td>
          <yhm-manager-td-operate>
            <yhm-manager-td-operate-button v-if="item.state==1" @click="editBtn(item)" value="通过" icon="i-btn-applicationSm" color="#49a9ea"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button v-if="item.state==1" @click="downBtn(item)" value="驳回" icon="i-btn-turnDown" color="#FF0000"></yhm-manager-td-operate-button>
          </yhm-manager-td-operate>
        </tr>
      </template>

      <!--数据空提示-->
      <template #empty>
        <span class="m_listNoData" v-show="empty">暂时没有数据</span>
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
    name: 'expressApprovalManager',
    mixins: [managermixin],
    data(){
      return{
        payPlanNum: '',
        paymentNum: '',
        reimburseNum: '',
        purchaseNum: '',
        prettyCashsNum:'',
        insuranceNum:'',
        openInvoiceNum:'',
        promotions:'',
        invoiceRiseNum:'',

        expressCompanyBefore:'0',
        orderCode:'',
        listState:{
          value:"1",
          list:[]
        },
        listItemType:{
          value:"",
          list:[]
        },
        listLetterClassification:{
          value:"",
          list:[]
        },
        listCompanyID:{
          value:"",
          list:[]
        },
        listBusinessType:{
          value:"",
          list:[]
        },
      }
    },
    methods:{
      editBtn(item){
        this.$dialog.OpenWindow({
          width: 650,
          height: 230,
          title: '通过留言',
          url: '/springBootApprovalMessage?id=' + item.id+'&page=1',
          closeCallBack: (data)=>{
            if (data){
              this.initPageData(false)
            }
          }
        })
      },
      downBtn(item){
        this.$dialog.OpenWindow({
          width: 1050,
          height: 720,
          title: '驳回留言',
          url: '/springBootRejectReason?id=' + item.id+'&page=1&state=18',
          closeCallBack: (data)=>{
            if (data){
              this.initPageData(false)
            }
          }
        })
      },
      listView(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '650',
          url: '/expressApprovalView?id='+item.id,
          title: '查看快递信息',
          closeCallBack: (data) => {
            if (data) {
              this.lastData = data
              this.initPageData(false)
              /*false->非初始化=>!import  true->初始化*/
            }
          }
        })
      },

      // 筛选事件
      initChoose (op) {
        if (op === 'state') {
          this.selectValue = []
        }
        this.pager.pageIndex = 1
        this.initPageData(false)
      },
      initPageData (initValue) {
        this.ajaxJson({
          url: '/PersonOffice/approvalManagerAllNumber',
          call: (data)=>{
            this.payPlanNum = data.payPlan
            this.paymentNum = data.payment
            this.reimburseNum = data.reimbursements
            this.purchaseNum = data.purchase
            this.prettyCashsNum = data.prettyCashs
            this.insuranceNum=data.insurance
            this.openInvoiceNum=data.openInvoice
            this.promotions=data.promotions
          }
        })
        this.ajaxJson({
          url: '/finance/invoiceRise/getApprovalPendingCount',
          call: (data)=>{
            this.invoiceRiseNum = data
          }
        })
        let params = {}

        if (initValue) {
          params = {
            state:this.listState.value,
          }
        } else {
          params = {
            state:this.listState.value,
          }
        }
        this.init({
          initValue:initValue,
          url: '/dailyoffice/myExpress/getAppManager',
          data:params,
          all:(data) =>{
            //不管是不是初始化都需要执行的代码
          },
          init:(data)=>{
            //初始化时需要执行的代码
            this.listItemType=data.itemTypePsd
            this.listLetterClassification=data.letterClassificationPsd
            this.listCompanyID=data.companyIDPsd
            this.listState=data.statePsd
            this.listBusinessType=data.businessTypePsd
          }
        })
      },
    },
    created () {
    }
  }
</script>




