<template>
  <div>
    <yhm-managerpage  category="1">
      <!--导航条-->
<!--      <template #navigation>库存管理&nbsp;&gt;&nbsp;旧件审批</template>-->
      <template #navigationTab>
        <router-link class="menuTabDiv" :to="{path:'/home/approvalPayPlanManager'}">付款计划</router-link>
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
        <router-link class="menuTabDiv" :to="{path:'/home/invoicelookUp/invoicelookUpManager'}">发票抬头
<!--          <i class="noticeNum" v-if="invoiceRiseNum!='0'">{{invoiceRiseNum}}</i>-->
        </router-link>
        <router-link class="menuTabDiv " :to="{path:'/home/expressApprovalManager'}">快递审批
          <!--<i class="noticeNum" v-if="paymentNum!=0">{{paymentNum}}</i>-->
        </router-link>
        <router-link class="menuTabDiv menuTabActive" :to="{path:'/home/RecoveryApprovalManager'}">旧件审批
          <!--<i class="noticeNum" v-if="paymentNum!=0">{{paymentNum}}</i>-->
        </router-link>
      </template>
      <!--操作区-->
      <template #operate>
<!--        <yhm-commonbutton :value="choose?'收起筛选':'展开筛选'" :icon="choose?'btnUp':'btnDown'" @call="switchChoose()"></yhm-commonbutton>-->
        <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initData"></yhm-managersearch>
        <yhm-radiofilter @initData="initPageData(false)" title="状态" all="0" :content="statePsd"></yhm-radiofilter>
      </template>
      <!--筛选区-->
<!--      <template #choose>-->
<!--        <div v-show="choose" class="buttonBody mptZero">-->
<!--&lt;!&ndash;          <yhm-radiofilter @initData="initPageData(false)" title="状态" all="0" :content="statePsd"></yhm-radiofilter>&ndash;&gt;-->
<!--        </div>-->
<!--      </template>-->

      <!--数据表头-->
      <template #listHead>
        <yhm-managerth style="width: 40px;" title="选择"></yhm-managerth>
        <yhm-managerth style="width: 40px;" title="查看"></yhm-managerth>
        <yhm-managerth style="width: 120px;" title="车牌号"></yhm-managerth>
        <yhm-managerth style="width: 120px;" title="申请人" ></yhm-managerth>
        <yhm-managerth style="width: 150px;" title="申请日期"></yhm-managerth>
        <yhm-managerth style="width: 150px;" title="车牌号"></yhm-managerth>
        <yhm-managerth title="工单号(点击查看)"></yhm-managerth>
        <yhm-managerth style="width: 150px;" title="所属类型"></yhm-managerth>
        <yhm-managerth title="备注"></yhm-managerth>
        <yhm-managerth style="width: 170px;" title="操作"></yhm-managerth>

      </template>
      <template #listBody>
        <tr :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]" v-for="(item,index) in content" :key="index">
          <yhm-manager-td-checkbox :value="item"></yhm-manager-td-checkbox>
          <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>
          <yhm-manager-td :value="item.vehicle"></yhm-manager-td>
          <yhm-manager-td :value="item.operator"></yhm-manager-td>
          <yhm-manager-td-center :value="item.insertDate"></yhm-manager-td-center>
          <yhm-manager-td-center :value="item.vehicle"></yhm-manager-td-center>
          <yhm-manager-td-center :value="item.code" @click="goworkOrder(item)" color="#1C5AD1"></yhm-manager-td-center>
          <yhm-manager-td :value="item.model"></yhm-manager-td>
          <yhm-manager-td :value="item.remark"></yhm-manager-td>
          <yhm-manager-td-operate>
            <yhm-manager-td-operate-button value="通过" @click="Operation(item,0)" icon="i-btn-applicationSm" :no-click="item.state == '1'?false:true" :color="item.state=='1'?'#49a9ea':'#D3D1D1'"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button value="驳回" @click="Operation(item,1)" icon="i-btn-applicationSm" :no-click="item.state == '1'?false:true" :color="item.state=='1'?'#FF0000':'#D3D1D1'"></yhm-manager-td-operate-button>
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
    name: 'RecoveryApprovalManager',
    mixins: [managermixin],
    data(){
      return {
        payPlanNum: '',
        paymentNum: '',
        reimburseNum: '',
        purchaseNum: '',
        prettyCashsNum:'',
        insuranceNum:'',
        openInvoiceNum:'',
        promotions:'',
        invoiceRiseNum:'',
        statePsd:{
          list:[
            {showName: "已驳回", num: "-1", code: "", img: ""},
            {showName: "审批中", num: "1", code: "", img: ""},
            {showName: "已完成", num: "2", code: "", img: ""}
          ],
          value:'1'
        }
      }
    },
    created () {

    },
    methods:{
      listView(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '650',
          url: '/lostRegistrationView?id='+item.id,
          title: '查看详情信息',
          closeCallBack:(data) =>{
          }
        })
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
        let params = {}
        if (initValue) {
          // 页面初始化是需要的参数
          params = {
            state:this.statePsd.value,
          }
        } else {
          // 页面非初始化时需要的参数
          params = {
            state:this.statePsd.value,
            searchStr:this.searchStr,
          }
        }
        this.init({
          initValue: initValue,
          url: '/dailyoffice/corcRegistration/getAppLostManager',
          data: params,
          all: (data) => {
            // 不管是不是初始化都需要执行的代码

          },
          init: (data) => {
            // 初始化时需要执行的代码
            // 这边初始化筛选信息

          }
        })
      },
      Operation(item,e){
        if(item.state==1){
          if(e==0){
            this.$dialog.confirm({
              width: 300,
              tipValue: ' 确认通过',
              btnValueOk: '确定',
              alertImg: 'warn',
              okCallBack: (data) => {
                let params = {
                  id: item.id,
                  state: '2'
                }
                this.ajaxJson({
                  url: '/dailyoffice/corcRegistration/updateSubmit',
                  data: params,
                  call: (data) => {
                    if (data.type === 0) {
                      this.$dialog.alert({
                        tipValue: data.message,
                        closeCallBack: (data) => {
                          this.initPageData(false)
                        }
                      })
                    } else {
                      this.$dialog.alert({
                        alertImg: 'error',
                        tipValue: data.message,
                        closeCallBack: () => {
                        }
                      })
                    }
                  }
                })
              }
            })
          }else{
            this.$dialog.OpenWindow({
              width: 650,
              height: 230,
              title: '驳回留言',
              url: '/approvalPassMessage?id=' + item.id+'&page=9',
              closeCallBack: (data)=>{
                if (data){
                  this.initPageData(false)
                }
              }
            })
          }
        }
      },
      goworkOrder(item){
        this.$dialog.OpenWindow({
          width: '1070',
          height: '750',
          title: '查看接待单信息',
          url: '/collectionOfDataView?id='+item.receptionid,
          closeCallBack: (data)=>{

          }
        })
      },
    }

  }
</script>

<style scoped>

</style>
