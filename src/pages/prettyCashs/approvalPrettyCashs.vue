<template>
  <div>
    <yhm-managerpage category="1">
      <!--导航条-->
      <!--导航条-->
      <template #navigationTab>
        <router-link class="menuTabDiv" :to="{path:'/home/approvalPayPlanManager'}">付款计划
          <i class="noticeNum" v-if="payPlanNum!=0">{{payPlanNum}}</i>
        </router-link>
        <router-link class="menuTabDiv" :to="{path:'/home/approvalPayManager'}">付款申请
          <i class="noticeNum" v-if="paymentNum!=0">{{paymentNum}}</i>
        </router-link>
        <router-link class="menuTabDiv" :to="{path:'/home/approvalReimbursementManager'}">报销
          <i class="noticeNum" v-if="reimburseNum!=0">{{reimburseNum}}</i>
        </router-link>
        <router-link class="menuTabDiv" :to="{path:'/home/approvalPurchaseManager'}">采购计划
          <i class="noticeNum" v-if="purchaseNum!=0">{{purchaseNum}}</i>
        </router-link>
        <router-link class="menuTabDiv menuTabActive" :to="{path:'/home/approvalPrettyCashs'}">备用金
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
        <router-link class="menuTabDiv" :to="{path:'/home/approvalInvoiceRiseManager'}">发票抬头
                    <i class="noticeNum" v-if="invoiceRiseNum!='0'">{{invoiceRiseNum}}</i>
        </router-link>
        <router-link class="menuTabDiv " :to="{path:'/home/expressApprovalManager'}">快递审批
          <!--<i class="noticeNum" v-if="paymentNum!=0">{{paymentNum}}</i>-->
        </router-link>
        <router-link class="menuTabDiv " :to="{path:'/home/RecoveryApprovalManager'}">旧件审批</router-link>

      </template>
      <!--操作区-->
      <template #operate>
        <yhm-commonbutton :value="choose?'收起筛选':'展开筛选'"  :icon="choose?'btnUp':'btnDown'" @call="switchChoose()"></yhm-commonbutton>
        <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initData"></yhm-managersearch>
        <yhm-commonbutton value="打开选中信息" icon="i-selectAll" @call="selectedList" :show="isSelected" category="three"></yhm-commonbutton>

      </template>
      <!--筛选区-->
      <template #choose>
        <div v-show="choose" class="buttonBody mptZero">
          <yhm-radiofilter  @initData="initChoose('isFinish')" title="完成状态" all="0" :content="isFinishPsd"></yhm-radiofilter>
          <yhm-radiofilter  @initData="initChoose('isTravel')" title="业务相关" :content="isTravelPsd"></yhm-radiofilter>
          <yhm-radiofilter  @initData="initChoose('isTravel')" title="发票类型" :content="invoiceCategoryPsd"></yhm-radiofilter>

        </div>
      </template>
      <template #listHead>
        <yhm-managerth-check style="width: 50px;" :check="allCheck"></yhm-managerth-check>
        <yhm-managerth style="width: 50px;" title="查看"></yhm-managerth>
        <yhm-managerth style="width: 80px;" title="申请人" value="personID"></yhm-managerth>
        <yhm-managerth style="width: 150px;" title="批次号" value="code"></yhm-managerth>
        <yhm-managerth style="width: 110px;" title="申请时间" value="workDate"></yhm-managerth>
        <yhm-managerth style="width: 95px;" title="申请金额" value="money"></yhm-managerth>
        <yhm-managerth style="width: 95px;" title="退回金额" value="refundMoney"></yhm-managerth>
        <yhm-managerth style="width: 120px;" title="预计核销日期" value="estimateDate"></yhm-managerth>
        <yhm-managerth style="width: 70px;" title="倒计时" value="day"></yhm-managerth>

        <yhm-managerth style="width: 80px;" title="发票类型"></yhm-managerth>

        <yhm-managerth title="事由" value="subjectID"></yhm-managerth>
        <yhm-managerth style="width: 60px;" title="审批留言"></yhm-managerth>
        <yhm-managerth style="width: 150px;" title="状态" value=""></yhm-managerth>
        <yhm-managerth style="width: 350px;" title="操作" value=""></yhm-managerth>
      </template>
      <template #listBody>
        <tr v-for="(item,index) in content" :key="index" :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]">
          <yhm-manager-td-checkbox :value="item"></yhm-manager-td-checkbox>
          <yhm-manager-td-look @click="add(item)"></yhm-manager-td-look>
          <yhm-manager-td :value="item.person"></yhm-manager-td>
          <yhm-manager-td :value="item.code"></yhm-manager-td>
          <yhm-manager-td-date :value="item.workDate"></yhm-manager-td-date>
          <yhm-manager-td-money :value="item.money"></yhm-manager-td-money>
          <yhm-manager-td-money :value="item.refundMoney"></yhm-manager-td-money>
          <yhm-manager-td-date :value="item.estimateDate"></yhm-manager-td-date>
          <yhm-manager-td-center :value="item.day+'天'" v-if="item.day<=2" style="color:#2c920b;font-weight: bold"></yhm-manager-td-center>
          <yhm-manager-td-center :value="item.day+'天'" v-else-if="item.day>2&&item.day<=5" style="color:#0511a5;font-weight: bold"></yhm-manager-td-center>
          <yhm-manager-td-center :value="item.day+'天'" v-else style="color: #f00;font-weight: bold"></yhm-manager-td-center>

          <yhm-manager-td-psd :value="item.invoiceCategory" :list="invoiceCategoryList"></yhm-manager-td-psd>

          <yhm-manager-td :value="item.subject"></yhm-manager-td>
          <yhm-manager-td-leaveword @iconClick="SelectApprovalMessage(item)" :leave-word-show="item.approvalMessage === '1'?true:false"></yhm-manager-td-leaveword>
          <yhm-manager-td-state :value="item.stateVal" :stateColor="item.stateColor" :stateImg="item.stateImg"></yhm-manager-td-state>
          <yhm-manager-td-operate>

            <yhm-manager-td-operate-button v-show="item.state === '9'||item.state === '15'||item.state==='-1'" @click="print(item)" value="打印借据" icon="i-btn-print" color="#333"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button v-show="item.state === '15' && item.isChecks === '2' ||item.state==='-1' || item.isChecks === '4'" @click="printeceipt(item)" value="打印收据" icon="i-btn-print" color="#333"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button v-show="item.isApproval === '0'&& item.approval !== '4' && item.isApproval === '0' && item.state !== '15'" :no-click="item.isApproval!=='0'" @click="adoptEvent(item)" value="通过" icon="i-btn-applicationSm" color="#49a9ea"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button :no-click="item.isApproval!=='0' && item.state !== '15'" v-show="item.isApproval === '0'&& item.approval !== '4' && item.isApproval === '0' && item.state !== '15'" @click="rejectEvent(item)" value="驳回" icon="i-btn-turnDown" color="#FF0000"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button  v-show="item.isChecks === '4'" @click="FullReturn(item)" value="确认收款" icon="i-btn-grant" color="#be08e3"></yhm-manager-td-operate-button>

            <!--            <yhm-manager-td-operate-button :no-click="item.isApproval!=='0' && item.state === '15'" v-show="item.state === '15'&&item.isChecks!=='1'" @click="refundMoney(item)" value="备用金退款" icon="i-btn-grant" color="#be08e3"></yhm-manager-td-operate-button>-->
            <yhm-manager-td-operate-button v-show="item.approval === '4'&&item.isApproval === '0'" :no-click="item.isApprovRal==='4'" @click="approFund(item)" value="拨付资金" icon="i-btn-grant" color="#be08e3"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button :no-click="item.isApproval!=='0' && item.state === '15'" v-show="item.isChecks === '2'" @click="refundMoney(item)" value="备用金退款" icon="i-btn-grant" color="#be08e3"></yhm-manager-td-operate-button>

          </yhm-manager-td-operate>
        </tr>
      </template>
      <!--数据空提示-->
      <template #empty>
        <span class="m_listNoData" v-show="empty">暂时没有数据</span>
      </template>
      <template #total>
        <div class="listTotalCrente m_list w620">
          <div class="listTotalLeft">
            <span class="test"></span>
            <span class="test">金额</span>
            <span class="test">条数</span>
          </div>
          <table width="100%" cellpadding="0" cellspacing="0" class="m_content_table m_content_total_table">
            <thead>
            <tr>
              <yhm-managerth style="width: 100px;" before-color="black" title="" before-title="总数" ></yhm-managerth>
              <yhm-managerth style="width: 100px;" before-color="#49a9ea" title="" before-title="未审批" ></yhm-managerth>
              <yhm-managerth style="width: 100px;" before-color="#ff0000" title="" before-title="已审批" ></yhm-managerth>
            </tr>
            </thead>
            <tbody>
            <tr>
              <yhm-manager-td-money @click="totalClick(item)" v-for="(item,index) in contentTotal" :key="index" :value="item.money"></yhm-manager-td-money>
            </tr>
            <tr>
              <yhm-manager-td-rgt @click="totalClick(item)" v-for="(item,index) in contentTotal" :key="index" :value="item.count"></yhm-manager-td-rgt>
            </tr>
            </tbody>
          </table>
        </div>

      </template>
      <!--分页控件-->
      <template #pager>
        <yhm-pagination :pager="pager" @initData="initPageData(false)"></yhm-pagination>
      </template>
      <!--数据空提示-->
      <template #empty>
        <span class="m_listNoData" v-show="empty">暂时没有数据</span>
      </template>

    </yhm-managerpage>
  </div>
</template>

<script>
  import { managermixin } from '@/assets/manager.js'
  export default {
    name: 'approvalPrettyCashs',
    mixins: [managermixin],
    data(){
      return{
        isFinish:'',
        isFinishPsd:{
          value: '',
          list: []
        },
        isTravel:'',
        isTravelPsd:{
          value: '',
          list: []
        },
        invoiceCategoryPsd: {
          value: '',
          list: []
        },
        payPlanNum: '',
        paymentNum: '',
        reimburseNum: '',
        purchaseNum: '',
        insuranceNum:'',
        openInvoiceNum:'',
        promotions:'',
        invoiceRiseNum:'',
        total:'',
        invoiceCategoryList: [],
        contentTotal: []
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
      FullReturn(item){
        alert('aaa')
        this.$dialog.OpenWindow({
          width: '1050',
          height: '690',
          title: '备用金退款',
          url: '/bankDetailForm?ownerID=' + item.id +'&bankDetailType=7&directionBefore=1',
          closeCallBack: (data)=>{
            this.initPageData(false)
          }
        })
      },
      selectedSum(){
        let params={
          selectValue:this.selectValue
        }
        this.ajaxJson({
          url: '/PersonOffice/commonSelectedsave',
          data:params,
          call:(data) =>{
            if(data.type===0){
              this.ajaxJson({
                url: '/PersonOffice/approvalPrettyCashsManagerTotal',
                data:params,
                call:(information) =>{
                  this.contentTotal = information
                }
              })
            }
          }
        })
      },
      //打开选中信息
      selectedList(){
          let params={
            selectValue:this.selectValue
          }
          this.ajaxJson({
            url: '/PersonOffice/commonSelectedsave',
            data:params,
            call:(data) =>{
              //finReimbursementViewFormSelect
              if(data.type===0){
                this.$dialog.OpenWindow({
                  width: '1050',
                  height: '620',
                  title: '查看选中信息',
                  url:'/approvalPrettyCashsView?id='+data.val,
                  closeCallBack: (dataTwo)=>{
                    if(dataTwo){

                    }
                  }
                })
              }
            }
          })
      },
      /* 打印收据 */
      printeceipt(item){
        let params = {
          id:item.id
        }
        this.ajaxJson({
          data:params,
          url: '/PersonOffice/printPrettyCashsBack',
          call: (data)=>{
            if(data.type===0){
              window.open("/UploadFile/" + data.html)
            }
          }
        })
      },
      print(item){
        let params = {
          id:item.id
        }
        this.ajaxJson({
          data:params,
          url: '/PersonOffice/printPrettyCashs',
          call: (data)=>{
            if(data.type===0){
              window.open("/UploadFile/" + data.html)
            }
          }
        })
      },
      // refundMoney(item){
      //   this.$dialog.OpenWindow({
      //     width: '1050',
      //     height: '690',
      //     title: '备用金退款',
      //     url: '/bankDetailForm?ownerID=' + item.id +'&bankDetailType=7&directionBefore=1',
      //     closeCallBack: (data)=>{
      //       this.initPageData(false)
      //     }
      //   })
      // },
      refundMoney(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '690',
          title: '备用金退款',
          url: '/bankDetailForm?ownerID=' + item.id +'&bankDetailType=11&directionBefore=1',
          closeCallBack: (data)=>{
            this.initPageData(false)
          }
        })
      },
      /* 拨付资金 */
      approFund(item){
        if(item.approval === '4'){
          this.$dialog.OpenWindow({
            width: '1050',
            height: '690',
            title: '拨付资金',
            url: '/bankDetailForm?ownerID=' + item.id +'&bankDetailType=' + '5' + '&directionBefore=1',
            closeCallBack: (data)=>{
              this.initPageData(false)
            }
          })
        }else{
          this.$dialog.alert({
            tipValue: '已拨付'
          })
        }
      },
      adoptEvent (item) { //
        if(item.isApproval!=='1'){
          if(item.id){
            this.$dialog.OpenWindow({
              width: 650,
              height: 230,
              title: '审批留言',
              url: '/passMessage?id=' + item.id+ '&tableName=47&kind=0',
              closeCallBack: (acc)=>{
                this.initPageData(false)
              }
            })
            // let params = {
            //   id: item.id,
            //   kind: '0',
            //   tableName: '47'
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
            //           this.$dialog.alert({
            //             tipValue: data.message,
            //             closeCallBack: () => {
            //               this.initPageData(false)
            //             }
            //           })
            //         }else if(data.type === 1){
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
        }
      },
      rejectEvent (item) {
        if(item.isApproval!=='1') {
          this.$dialog.OpenWindow({
            width: 1050,
            height: 720,
            title: '驳回理由',
            url: '/rejectReason?category=0&id=' + item.id+'&tableName=47&kind=0',
            closeCallBack: (data) => {
              this.initPageData(false)
            }
          })
        }
      },
      add(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '590',
          title: '查看备用金信息',
          url:'/approvalPrettyCashsView?id='+item.id+'&approval='+item.approval+'&isApproval='+item.isApproval,
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
            isFinish:'1'
          }
        } else {
          params = {
            isFinish: this.isFinishPsd.value,
            isTravel: this.isTravelPsd.value,
            invoiceCategory: this.invoiceCategoryPsd.value
          }
        }
        this.init({
          initValue:initValue,
          url: '/PersonOffice/approvalPrettyCashsManager',
          data:params,
          all:(data) =>{
            this.contentTotal = data.total
          },
          init:(data)=>{
            this.isFinishPsd = data.isFinishPsd
            this.isTravelPsd = data.isTravelPsd
            this.invoiceCategoryPsd = data.invoiceCategoryPsd
            this.invoiceCategoryList = data.invoiceCategoryPsd.list
          }
        })
        this.ajaxJson({
          url: '/PersonOffice/approvalManagerAllNumber',
          call: (data)=>{
            this.payPlanNum = data.payPlan
            this.paymentNum = data.payment
            this.reimburseNum = data.reimbursements
            this.purchaseNum = data.purchase
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
      },
    },
    created () {

    }
  }
</script>

<style scoped>

</style>
