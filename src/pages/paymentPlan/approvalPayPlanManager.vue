<template>
  <div>
    <yhm-managerpage category="1">
      <!--导航条-->

      <template #navigationTab>
        <router-link class="menuTabDiv menuTabActive" :to="{path:'/home/approvalPayPlanManager'}">付款计划</router-link>
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
        <yhm-table-tip :show="tableTip" :content="tableTipInfo" :column="tableTipColumnInfo" :mouse-control="tableTipControl"></yhm-table-tip>
        <yhm-commonbutton :value="choose?'收起筛选':'展开筛选'" :icon="choose?'btnUp':'btnDown'" @call="switchChoose()"></yhm-commonbutton>
        <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initData"></yhm-managersearch>
        <!--      <div @click="selectPerson" style="display: inline-block; width: 120px; height: 30px; border: 1px solid #49A8EA;">选择联系人</div>-->
        <yhm-commonbutton value="打开选中信息" icon="i-selectAll" @call="selectedList" :show="isSelected" category="three"></yhm-commonbutton>
      </template>

      <!--筛选区-->
      <template #choose>
        <div v-show="choose" class="buttonBody mptZero">
          <yhm-radiofilter :before="stateBefore" @initData="initChoose('categoryUnit')" title="状态" all="0"
                           :content="listIsFinish"></yhm-radiofilter>
        </div>
      </template>

      <!--数据表头-->
      <template #listHead>
        <yhm-managerth style="width: 38px;" title="选择"></yhm-managerth>
        <yhm-managerth style="width: 38px;" title="查看"></yhm-managerth>
        <yhm-managerth title="收款方" value="id"></yhm-managerth>

        <yhm-managerth style="width: 140px;" title="申请人"></yhm-managerth>
        <yhm-managerth style="width: 160px" title="最迟付款日期" value="lastDate"></yhm-managerth>
        <yhm-managerth style="width: 200px;" title="事由"></yhm-managerth>
        <yhm-managerth style="width: 140px" title="付款计划金额" value="money"></yhm-managerth>

        <yhm-managerth style="width: 60px;" title="审批留言"></yhm-managerth>
        <yhm-managerth style="width: 180px" title="状态" value="state"></yhm-managerth>
        <yhm-managerth style="width: 200px;" title="操作"></yhm-managerth>
      </template>

      <!--数据明细-->
      <template #listBody>
        <tr :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]" v-for="(item,index) in content"
            :key="index">
          <yhm-manager-td-checkbox :value="item"></yhm-manager-td-checkbox>
          <yhm-manager-td-look @click="add(item.id)"></yhm-manager-td-look>
          <yhm-manager-td :value="item.otherUnit"></yhm-manager-td>
          <yhm-manager-td-center :value="item.person"></yhm-manager-td-center>
          <yhm-manager-td-date :value="item.lastDate" :before-icon="item.causeList.length > 1?'i-btn-prompt':''" @mouseover="tableTipShowEvent" @mouseout="tableTipHideEvent" :value-object="item"></yhm-manager-td-date>
          <yhm-manager-td :value="item.cause" :after-icon="item.causeList.length > 1?'i-btn-prompt':''" @mouseover="tableTipShowEvent" @mouseout="tableTipHideEvent" :value-object="item"></yhm-manager-td>
          <yhm-manager-td-money :value="item.money" :before-icon="item.causeList.length > 1?'i-btn-prompt':''" @mouseover="tableTipShowEvent" @mouseout="tableTipHideEvent" :value-object="item"></yhm-manager-td-money>
          <yhm-manager-td-leaveword @iconClick="add(item.id)" :leave-word-show="item.approvalMessage === '1'?true:false"></yhm-manager-td-leaveword>
          <yhm-manager-td-state :value="item.stateVal" :stateColor="item.stateColor" :stateImg="item.stateImg"></yhm-manager-td-state>
          <yhm-manager-td-operate>
            <yhm-manager-td-operate-button :no-click="item.isApproval!=='0'" @click="adoptEvent(item)" value="通过" icon="i-btn-applicationSm" color="#49a9ea"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button :no-click="item.isApproval!=='0'" @click="rejectEvent(item)" value="驳回" icon="i-btn-turnDown" color="#FF0000"></yhm-manager-td-operate-button>
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
              <yhm-managerth style="width: 100px;" before-color="#49a9ea" title="" before-title="未审批"></yhm-managerth>
              <yhm-managerth style="width: 100px;" before-color="#ff0000" title="" before-title="已审批"></yhm-managerth>
            </tr>
            </thead>
            <tbody>
            <tr>
              <yhm-manager-td-money v-for="(item,index) in contentTotal" :key="index" :value="item.money"></yhm-manager-td-money>
            </tr>
            <tr>
              <yhm-manager-td-rgt  v-for="(item,index) in contentTotal" :key="index" :value="item.count"></yhm-manager-td-rgt>
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
    name: 'paymentApplyManager',
    mixins: [managermixin],
    data () {
      return {
        index: '',
        causetbSwitch: false,
        indexNum: '',

        empty: true,

        category: '',
        subjectCount: '',
        otherUnitID: false,
        otherAccountID: false,
        lastDate: false,
        money: false,
        state: false,


        stateBefore: '0', // 默认选择状态为可以选择，1为不可以选择
        listIsFinish: {
          value: '',
          list: []
        },

        stateItems:[],

        payPlanNum: '',
        paymentNum: '',
        reimburseNum: '',
        purchaseNum: '',
        prettyCashsNum:'',
        insuranceNum:'',
        openInvoiceNum:'',
        promotions:'',
        invoiceRiseNum:'',
        tableTip:false,         //记录表格是否显示
        tableTipControl:{},
        tableTipColumnInfo:[
          {width:'120',title:'最迟付款日期',category:'date',key:'lastDate'},
          {width:'100',title:'事由',category:'',key:'subject'},
          {width:'100',title:'金额',category:'money',key:'money'},
          {width:'100',title:'状态',category:'',key:'stateVal'}
        ],
        tableTipInfo:[],
        contentTotal: []

      }
    },
    methods: {

      //选中汇总
      selectedSum(){
        let params={
          selectValue:this.selectValue
        }
        this.ajaxJson({
          url: '/PersonOffice/commonSelectedsave',
          data:params,
          call:(data) =>{
            if(data.type===0){
              let paramsFinish = {
                isFinish: this.listIsFinish.value,
              }
              this.ajaxJson({
                url: '/PersonOffice/payPlanApprovalTotal',
                data: paramsFinish,
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
            if(data.type===0){
              this.$dialog.OpenWindow({
                width: '1050',
                height: '620',
                title: '查看选中信息',
                url: '/approvalPayForm?id='+data.val,
                closeCallBack: (dataTwo)=>{
                  if(dataTwo){

                  }
                }
              })
            }
          }
        })
      },


      tableTipShowEvent(item,control){
        if(item.causeList.length > 1) {
          this.tableTipInfo = item.causeList
          this.tableTipControl = control
          this.tableTip = true
        }
      },
      tableTipHideEvent(){
        this.tableTip = false
      },
      add (id) {
        // 默认设置页面标记是查看
        var isAdd = false
        // 默认设置页面标题为查看信息
        var title = '查看付款计划信息'
        var url = '/approvalPayForm?id=' + id
        if (!id) { // 当id不存在的时候
          // 设置id为空
          id = ''
          // 设置页面标题为添加信息
          title = '添加付款计划信息'
          // 设置页面标记为添加
          isAdd = true
          url = '/approvalPayForm?id='
        }
        this.$dialog.OpenWindow({
          width: 1050,
          height: 550,
          url: url,
          title: title,
          closeCallBack: (data) => {
            if (data) {
              if (isAdd) {
                this.lastData = data
              }
              /*false->非初始化=>!import  true->初始化*/
            }
            this.initPageData(false)
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
        this.ajaxJson({
          url: '/finance/invoiceRise/getApprovalPendingCount',
          call: (data)=>{
            this.invoiceRiseNum = data
          }
        })

        let params = {}

        if (initValue) {
          params = {}
        } else {
          params = {
            isFinish: this.listIsFinish.value
          }
        }
        this.init({
          initValue: initValue,
          // url: '/PersonOffice/getPayApprovalManager',
          url: '/PersonOffice/getPayPlanApprovalManager',
          data: params,
          all: (data) => {
            this.contentTotal = data.total
            //不管是不是初始化都需要执行的代码
          },
          init: (data) => {
            //初始化时需要执行的代码
            // 这边初始化筛选信息
            this.listIsFinish = data.isFinishPsd

          }
        })

      },
      adoptEvent (item) { //提交申请
        if(this.listIsFinish.value==0){
          return
        }
        if(item.id){
          let params = {
            id: item.id,
            tableName: 43
          }
          this.ajaxJson({
            url: '/PersonOffice/getPressIDVue',
            data: params,
            call: (data) => {
              this.$dialog.OpenWindow({
                width: 650,
                height: 230,
                title: '审批留言',
                url: '/passMessage?category='+ data.message +'&id=' + item.id+ '&tableName=43&tableDetailName=44&kind=1',
                closeCallBack: (acc)=>{
                  if(acc){
                    this.initPageData(false)
                  }
                }
              })
            }
          })
        }
        // if(item.id){
        //   let params = {
        //     id: item.id,
        //     tableName: 43
        //   }
        //
        //   this.$dialog.confirm({
        //     width: 300,
        //     tipValue: '是否通过?',
        //     alertImg: 'warn',
        //     okCallBack: (data)=>{
        //       this.ajaxJson({
        //         url: '/PersonOffice/getPressIDVue',
        //         data: params,
        //         call: (data) => {
        //           this.category = data.message
        //           if (this.category) {
        //             let params = {
        //               id: data.message,
        //               kind: '1',
        //               tableName: '43',
        //               tableDetailName: '44',
        //               location: '0'
        //             }
        //             this.ajaxJson({
        //               url: '/PersonOffice/approvalYesVue',
        //               data: params,
        //               call: (data)=>{
        //                 if(data.type === 0){
        //                   this.$dialog.alert({
        //                     tipValue: data.message,
        //                     closeCallBack: () => {
        //                       this.initPageData(false)
        //                     }
        //                   })
        //                 }else if(data.type === 1){
        //                   this.$dialog.alert({
        //                     tipValue: data.message,
        //                     alertImg: 'error',
        //                     closeCallBack: () => {
        //                     }
        //                   })
        //                 } else if(data.type === 2){
        //                   this.$dialog.alert({
        //                     tipValue: data.message,
        //                     alertImg: 'error',
        //                     closeCallBack: () => {
        //                     }
        //                   })
        //                 }
        //               }
        //             })
        //           }
        //         }
        //       })
        //     }
        //   })
        // }
      },
      rejectEvent (item) {
        if(this.listIsFinish.value==0){
          return
        }
        if(item.id){
          this.$dialog.OpenWindow({
            width: 1050,
            height: 720,
            title: '驳回理由',
            url: '/rejectReason?category=12' +'&id=' + item.id+ '&tableName=43&tableDetailName=44&kind=1',
            closeCallBack: (data)=>{
              this.initPageData(false)
            }
          })
        }
      }
    },
    computed: {
      // 检查是否选中
      checkSelect () {
        return function (id) {
          return this.selectValue.indexOf(id) !== -1
        }
      }
    },
    watch: {
      selectValue: {
        handler: function (val, oldval) {
          this.pager.selectCount = val.length
        },
        deep: true
      }
    },
    created () {
    }
  }
</script>
<style scoped lang="less">

  .mt_button{
    margin: 0 5px;
  }

</style>
