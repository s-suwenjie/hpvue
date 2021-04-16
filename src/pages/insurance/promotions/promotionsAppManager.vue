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
        <router-link class="menuTabDiv menuTabActive" :to="{path:'/home/approvalInvoiceRiseManager'}">活动审批
          <i class="noticeNum" v-if="promotions!='0'">{{promotions}}</i>
        </router-link>
        <router-link class="menuTabDiv" :to="{path:'/home/invoicelookUp/invoicelookUpManager'}">发票抬头
                    <i class="noticeNum" v-if="invoiceRiseNum!='0'">{{invoiceRiseNum}}</i>
        </router-link>
        <router-link class="menuTabDiv " :to="{path:'/home/expressApprovalManager'}">快递审批
          <!--<i class="noticeNum" v-if="paymentNum!=0">{{paymentNum}}</i>-->
        </router-link>
        <router-link class="menuTabDiv " :to="{path:'/home/RecoveryApprovalManager'}">旧件审批</router-link>

      </template>

      <!--操作区-->
      <template #operate>
        <!--<yhm-commonbutton :value="choose?'收起筛选':'展开筛选'" :icon="choose?'btnUp':'btnDown'" @call="switchChoose()"></yhm-commonbutton>-->
        <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initPageData"></yhm-managersearch>

      </template>

      <!--筛选区-->
      <template #listHead>
        <yhm-managerth style="width: 40px;" title="选择"></yhm-managerth>
        <yhm-managerth style="width: 40px;" title="查看"></yhm-managerth>
        <yhm-managerth   title="别名" value="name"></yhm-managerth>
        <yhm-managerth   title="品牌"></yhm-managerth>
        <yhm-managerth   title="保险公司" value="project"></yhm-managerth>
        <yhm-managerth style="width: 200px"   title="活动时候正在进行"  value="enableVal"></yhm-managerth>
        <yhm-managerth   title="启用日期" value="startDate"></yhm-managerth>
        <yhm-managerth   title="结束日期" value="endDate"></yhm-managerth>
        <yhm-managerth   title="优惠额度" value="amount"></yhm-managerth>
        <yhm-managerth   title="赠送信息" value="discount"></yhm-managerth>

        <yhm-managerth style="width:160px;" title="操作"></yhm-managerth>
      </template>

      <!--数据明细-->
      <template #listBody>
        <tr :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]" v-for="(item,index) in content" :key="index">
          <yhm-manager-td-checkbox :value="item"></yhm-manager-td-checkbox>
          <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>
          <yhm-manager-td :value="item.name"></yhm-manager-td>
          <yhm-manager-td :value="item.brandVal"></yhm-manager-td>
          <yhm-manager-td :value="item.project"></yhm-manager-td>
          <yhm-manager-td-center :value="item.enableVal"></yhm-manager-td-center>
          <yhm-manager-td-date :value="item.startDate"></yhm-manager-td-date>
          <yhm-manager-td-date :value="item.endDate"></yhm-manager-td-date>
          <yhm-manager-td :value="item.amount+'%'"></yhm-manager-td>
          <yhm-manager-td tip="value" :value="item.discount"></yhm-manager-td>

          <yhm-manager-td-operate>
            <yhm-manager-td-operate-button @click="editBtn(item)" value="通过" icon="i-btn-applicationSm" color="#49a9ea"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button @click="downBtn(item)" value="驳回" icon="i-btn-turnDown" color="#FF0000"></yhm-manager-td-operate-button>
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
    name: 'promotionsAppManager',
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
        invoiceRiseNum:'',
      }
    },
    methods:{
      downBtn(item){
        this.$dialog.OpenWindow({
          width: 650,
          height: 230,
          title: '驳回留言',
          url: '/approvalPassMessage?id=' + item.id+'&page=2',
          closeCallBack: (data)=>{
            if (data){
              this.initPageData(false)
            }
          }
        })
      },
      editBtn(item){
        this.$dialog.OpenWindow({
          width: 650,
          height: 230,
          title: '通过留言',
          url: '/approvalPassMessage?id=' + item.id+'&page=1',
          closeCallBack: (data)=>{
            if (data){
              this.initPageData(false)
            }
          }
        })
      },
      initPageData (initValue) {
        let params = {}

        if (initValue) {
          params = {

          }
        } else {
          params = {

          }
        }
        this.init({
          initValue:initValue,
          url: '/Insurance/getPromotionsAppManager',
          data:params,
          all:(data) =>{
            //不管是不是初始化都需要执行的代码

          },
          init:(data)=>{
            //初始化时需要执行的代码
            // 这边初始化筛选信息

          }
        })
      }
    },

    created () {
      this.initPageData()
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
    }
  }
</script>

<style scoped>

</style>
