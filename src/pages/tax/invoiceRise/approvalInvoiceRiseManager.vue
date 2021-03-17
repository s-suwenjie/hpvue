<template>
  <div>
    <yhm-managerpage category="1">
      <!--导航条-->
      <template #navigationTab>
        <router-link class="menuTabDiv" :to="{path:'/home/approvalPayPlanManager'}">付款计划
          <i class="noticeNum" v-if="payPlanNum!=0">{{payPlanNum}}</i>
        </router-link>
        <router-link class="menuTabDiv" :to="{path:'/home/approvalPayManager'}">付款申请</router-link>
        <router-link class="menuTabDiv" :to="{path:'/home/approvalReimbursementManager'}">报销
          <i class="noticeNum" v-if="reimburseNum!=0">{{reimburseNum}}</i>
        </router-link>
        <router-link class="menuTabDiv" :to="{path:'/home/approvalPurchaseManager'}">采购计划
          <i class="noticeNum" v-if="purchaseNum!=0">{{purchaseNum}}</i>
        </router-link>
        <router-link class="menuTabDiv" :to="{path:'/home/approvalPrettyCashs'}">备用金
          <i class="noticeNum" v-if="prettyCashsNum!=0">{{prettyCashsNum}}</i>
        </router-link>
        <router-link class="menuTabDiv  " :to="{path:'/home/approvalInsuranceManager'}">保险审批
          <i class="noticeNum" v-if="insuranceNum!=='0'">{{insuranceNum}}</i>
        </router-link>
        <router-link class="menuTabDiv  " :to="{path:'/home/approvalOpenInvoiceManager'}">开票审批
          <i class="noticeNum" v-if="openInvoiceNum!='0'">{{openInvoiceNum}}</i>
        </router-link>
        <router-link class="menuTabDiv" :to="{path:'/home/promotions/promotionsAppManager'}">活动审批
          <i class="noticeNum" v-if="promotions!='0'">{{promotions}}</i>
        </router-link>
        <router-link class="menuTabDiv menuTabActive" :to="{path:'/home/approvalInvoiceRiseManager'}">发票抬头
        <!--<router-link class="menuTabDiv" :to="{path:'/home/invoicelookUp/invoicelookUpManager'}">发票抬头-->
          <!--          <i class="noticeNum" v-if="promotions!='0'">{{promotions}}</i>-->
        </router-link>
        <router-link class="menuTabDiv " :to="{path:'/home/expressApprovalManager'}">快递审批
          <!--<i class="noticeNum" v-if="paymentNum!=0">{{paymentNum}}</i>-->
        </router-link>
      </template>
      <template #operate>
        <!-- 操作区-->
        <yhm-commonbutton value="添加" icon="btnAdd" :flicker="true" @call="add" category="one"></yhm-commonbutton>
        <yhm-commonbutton :value="choose?'收起筛选':'展开筛选'" :icon="choose?'btnUp':'btnDown'" @call="switchChoose()"></yhm-commonbutton>
        <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initChoose"></yhm-managersearch>
        <yhm-radiofilter @initData="initChoose('state')" title="审批状态" all="0" :content="statePsd"></yhm-radiofilter>
      </template>
      <template #choose>
        <div v-show="choose" class="buttonBody mptZero">
          <yhm-radiofilter @initData="initChoose('invoiceType')" title="发票类型" :content="invoiceTypePsd"></yhm-radiofilter>
          <yhm-radiofilter @initData="initChoose('isReceivables')" title="是否收款" :content="isReceivablesPsd"></yhm-radiofilter>
        </div>
      </template>


      <template #listHead>
        <yhm-managerth style="width: 40px;" title="选择" ></yhm-managerth>
        <yhm-managerth style="width: 40px;" title="查看" ></yhm-managerth>
        <yhm-managerth style="width: 180px;" title="主公司"></yhm-managerth>
        <yhm-managerth style="width: 180px;" title="关联公司 " ></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="关联公司税号" ></yhm-managerth>
        <yhm-managerth style="width: 200px;" title="关联公司地址" ></yhm-managerth>
        <yhm-managerth style="width: 130px;" title="关联公司手机号" ></yhm-managerth>
        <yhm-managerth style="width: 200px;" title="关联公司开户行" ></yhm-managerth>
        <yhm-managerth style="width: 130px;" title="关联公司账号" ></yhm-managerth>
        <yhm-managerth style="width: 130px;" title="状态" ></yhm-managerth>
        <yhm-managerth title="操作" ></yhm-managerth>
      </template>
      <!--      数据表单       -->
      <template #listBody >
        <tr :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]" v-for="(item,index) in content" :key="index">
          <yhm-manager-td-checkbox :value="item" @call="check(selectValue,index)"></yhm-manager-td-checkbox>
          <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>
          <yhm-manager-td :tip="true" :value="item.unit"></yhm-manager-td>
          <yhm-manager-td :tip="true" :value="item.otherUnit"></yhm-manager-td>
          <yhm-manager-td :tip="true" :value="item.otherTaxNumber"></yhm-manager-td>
          <yhm-manager-td :tip="true" :value="item.otherAddress"></yhm-manager-td>
          <yhm-manager-td :tip="true" :value="item.otherTel"></yhm-manager-td>
          <yhm-manager-td :tip="true" :value="item.otherBank"></yhm-manager-td>
          <yhm-manager-td :tip="true" :value="item.otherAccount"></yhm-manager-td>
          <yhm-manager-td-psd :value="item.state" :list="approvalStatePsd.list"></yhm-manager-td-psd>
          <yhm-manager-td-operate>
            <yhm-manager-td-operate-button v-if="statePsd.value =='1'" @click="adoptEvent(item)" value="通过" icon="i-btn-applicationSm" color="#49a9ea"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button v-if="statePsd.value =='1'" @click="rejectEvent(item)" value="驳回" icon="i-btn-turnDown" color="#FF0000"></yhm-manager-td-operate-button>
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
  import {managermixin} from '@/assets/manager.js'
  export default {
    name: 'approvalInvoiceRiseManager',
    mixins: [managermixin],
    data(){
      return{
        invoiceTypePsd:[],
        isReceivablesPsd:[],
        approvalStatePsd:[],
        statePsd:[],
        state:'',
      }
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
          this.openInvoiceNum=data.openInvoice
          this.promotions=data.promotions
        }
      })
    },
    methods:{
      adoptEvent(item){
        this.$dialog.OpenWindow({
          width: 650,
          height: 230,
          title: '通过留言',
          url: '/springBootApprovalMessage?id=' + item.id+'&category=5',
          closeCallBack: (data)=>{
            if (data){
              this.initPageData(false)
            }
          }
        })
      },
      rejectEvent(item){
        this.$dialog.OpenWindow({
          width: 1050,
          height: 720,
          title: '驳回留言',
          url: '/springBootRejectReason?id=' + item.id+'&category=5&state=18',
          closeCallBack: (data)=>{
            if (data){
              this.initPageData(false)
            }
          }
        })
      },
      listView(item){
        this.$dialog.OpenWindow({
          width: 1050,
          height: 800,
          url:'/invoiceRiseView?isApproval=1&id='+item.id,
          title:'查看详情',
          closeCallBack:(data) =>{
            if(data){
              this.initPageData(false)
            }
          }
        })
      },
      initPageData (initValue) {
        let params = {}
        if (initValue) {
          // 页面初始化是需要的参数
          params = {
            init:true,
          }
        } else {
          // 页面非初始化时需要的参数
          params = {
            invoiceType:this.invoiceTypePsd.value,
            isReceivables:this.isReceivablesPsd.value,
            state:this.statePsd.value
          }
        }
        this.init({
          initValue: initValue,
          url:'/finance/invoiceRise/getApprovalManager',
          data: params,
          all: (data) => {
            // 不管是不是初始化都需要执行的代码

          },
          init: (data) => {
            this.invoiceTypePsd=data.invoiceTypePsd
            this.isReceivablesPsd=data.isReceivablesPsd
            this.approvalStatePsd=data.approvalStatePsd
            this.statePsd=data.statePsd
            this.state=data.statePsd.value
          }
        })
      },
    }
  }
</script>

<style scoped>

</style>
