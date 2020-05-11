<template>
  <div>
    <yhm-managerpage category="1">

      <template #navigationTab>
        <router-link class="menuTabDiv" :to="{path:'/home/approvalPayPlanManager'}">付款计划
          <i class="noticeNum" v-if="payPlanNum != 0">{{payPlanNum}}</i>
        </router-link>
        <router-link class="menuTabDiv " :to="{path:'/home/approvalPayManager'}">付款申请
          <i class="noticeNum" v-if="paymentNum != 0">{{paymentNum}}</i>
        </router-link>
        <router-link class="menuTabDiv menuTabActive" :to="{path:'/home/approvalReimbursementManager'}">报销
        </router-link>
        <router-link class="menuTabDiv" :to="{path:'/home/approvalPurchaseManager'}">采购计划
          <i class="noticeNum" v-if="purchaseNum!= 0">{{purchaseNum}}</i>
        </router-link>
        <router-link class="menuTabDiv" :to="{path:'/home/approvalPrettyCashs'}">备用金
          <i class="noticeNum" v-if="prettyCashsNum!= 0">{{prettyCashsNum}}</i>
        </router-link>
        <router-link class="menuTabDiv" :to="{path:'/home/approvalInsuranceManager'}">保险审批
          <i class="noticeNum" v-if="insuranceNum!='0'">{{insuranceNum}}</i>
        </router-link>
      </template>

      <template #operate>
        <yhm-table-tip :show="tableTip" :content="tableTipInfo" :column="tableTipColumnInfo" :mouse-control="tableTipControl"></yhm-table-tip>
        <yhm-commonbutton :value="choose?'收起筛选':'展开筛选'" :icon="choose?'btnUp':'btnDown'" @call="switchChoose()"></yhm-commonbutton>
        <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initData"></yhm-managersearch>
        <yhm-commonbutton value="打开选中信息" icon="i-selectAll" @call="selectedList" :show="isSelected" category="three"></yhm-commonbutton>
        <yhm-commonbutton v-if="showBatchAppropriation" value="批量拨付" icon="i-batchAllca" @call="batchAllca" category="three"></yhm-commonbutton>
      </template>

      <!--筛选区-->
      <template #choose>
        <div v-show="choose" class="buttonBody mptZero">
          <yhm-radiofilter :before="stateBefore" @initData="initChoose('categoryUnit')" title="状态" all="0" :content="listState"></yhm-radiofilter>
          <yhm-radiofilter @initData="initChoose('isPrettyCashOff')" title="是否核销" :content="listIsPrettyCashOff"></yhm-radiofilter>
        </div>
      </template>

      <!--数据表头-->
      <template #listHead>
        <yhm-managerth style="width: 38px;" title="选择"></yhm-managerth>
        <yhm-managerth style="width: 38px;" title="查看"></yhm-managerth>
        <yhm-managerth style="width: 140px" title="申请时间" value="workDate"></yhm-managerth>
        <yhm-managerth style="width: 120px" title="报销方式" value="isPrettyCashOff"></yhm-managerth>
        <yhm-managerth style="width: 140px;" title="申请人" value="name"></yhm-managerth>
        <yhm-managerth style="width: 120px" title="申请金额" value="money"></yhm-managerth>
        <yhm-managerth style="width: 100px" title="提交天数" value="day"></yhm-managerth>
        <yhm-managerth style="width: 160px;" title="批次号" value="code"></yhm-managerth>
        <yhm-managerth style="width: 260px;" title="事由"></yhm-managerth>
        <yhm-managerth style="width: 180px;" title="状态" value="state"></yhm-managerth>
        <yhm-managerth title="操作"></yhm-managerth>
      </template>

      <!--数据明细-->
      <template #listBody>
        <tr :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]" v-for="(item,index) in content"
            :key="index">
          <yhm-manager-td-checkbox :value="item"></yhm-manager-td-checkbox>
          <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>
          <yhm-manager-td-date :value="item.workDate"></yhm-manager-td-date>
          <yhm-manager-td-psd :value="item.isPrettyCashOff" :list="isPrettyCashOffList"></yhm-manager-td-psd>
          <yhm-manager-td-center :value="item.name"></yhm-manager-td-center>
          <yhm-manager-td-money :value="item.money" :before-icon="item.subjectList.length > 1?'i-btn-prompt':''" @mouseover="tableTipShowEvent" @mouseout="tableTipHideEvent" :value-object="item"></yhm-manager-td-money>

          <yhm-manager-td-center :value="item.day+'天'" v-if="item.day<=2" style="color:#2c920b;font-weight: bold"></yhm-manager-td-center>
          <yhm-manager-td-center :value="item.day+'天'" v-else-if="item.day>2&&item.day<=5" style="color:#0511a5;font-weight: bold"></yhm-manager-td-center>
          <yhm-manager-td-center :value="item.day+'天'" v-else style="color: #f00;font-weight: bold"></yhm-manager-td-center>

          <yhm-manager-td-center :value="item.code"></yhm-manager-td-center>
          <yhm-manager-td :value="item.subject" :after-icon="item.subjectList.length > 1?'i-btn-prompt':''" @mouseover="tableTipShowEvent" @mouseout="tableTipHideEvent" :value-object="item"></yhm-manager-td>
          <yhm-manager-td-state :value="item.stateVal" :stateColor="item.stateColor" :stateImg="item.stateImg"></yhm-manager-td-state>
          <yhm-manager-td-operate>
            <yhm-manager-td-operate-button v-show="item.isPrint === '1' " :no-click="item.state !== '-1' && item.isFinish === '1'" @click="printFund(item)" value="打印单据" icon="i-btn-print" color="#333"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button v-show="item.category === '4'&&item.isChecks1 === '0'&&item.isChecks2 === '0'&&item.isChecks3 === '0' && item.isFinish !== '1'" :no-click="item.isApproval==='4'" @click="approFund(item)" value="拨付资金" icon="i-btn-grant" color="#be08e3"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button v-show="item.state === '-1' && item.isFinish === '0' && item.isPrint === '1'" @click="repayment(item)" value="确认还款" icon="i-complete" color="#6e19e1"></yhm-manager-td-operate-button>

            <yhm-manager-td-operate-button v-show="item.isChecks1 === '4'" :no-click="item.isApproval==='4'" @click="refundMoney(item)" value="确认收款" icon="i-btn-grant" color="#be08e3"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button v-show="item.isChecks2 === '1'" :no-click="item.isApproval==='4'" @click="repayment(item)" value="确认还款" icon="i-complete" color="#6e19e1"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button v-show="item.isChecks3 === '1'" :no-click="item.isApproval==='4'" @click="approFund(item)" value="拨付资金" icon="i-btn-grant" color="#be08e3"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button v-show="item.isChecks1 === '3'&&item.isChecks2 === '3'&&item.isChecks3 === '3'&&item.isFinish === '0'" :no-click="item.isApproval==='4'" @click="writeOff(item)" value="确认核销" icon="i-btn-grant" color="#be08e3"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button v-show="(item.isApproval !== '0' || item.isPrint !== '1') && item.isPrint === '0'" :no-click="item.isApproval!=='0'" @click="adoptEvent(item)" value="通过" icon="i-btn-applicationSm" color="#49a9ea"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button v-show="(item.isApproval === '0' && item.isPrint === '1' && ((item.isChecks1!=='2'&&item.isChecks2!=='2'&&item.isChecks3!=='2')||item.PrettyCashsID ==='')) && item.isFinish !== '1' || item.isPrint === '0'" :no-click="item.isApproval!=='0' || item.okSingle !== '0'" @click="rejectEvent(item)" value="驳回" icon="i-btn-turnDown" color="#FF0000"></yhm-manager-td-operate-button>
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
    </yhm-managerpage>
  </div>
</template>

<script>
  import { managermixin } from '@/assets/manager.js'
  export default {
    name: 'reimbursementManager',
    mixins: [managermixin],
    data() {
      return{
        content: [],
        paymentNum:'',
        payPlanNum:'',
        reimburseNum:'',
        purchaseNum:'',
        prettyCashsNum:'',
        showBatchAppropriation: false,
        insuranceNum:'',
        stateBefore: '0',
        listState: {
          value: '',
          list: []
        },
        listIsPrettyCashOff:{
          value: '',
          list: []
        },
        isPrettyCashOffList:[],
        stateItems:[],
        tableTip:false,         //记录表格是否显示
        tableTipControl:{},
        tableTipColumnInfo:[
          {width:'120',title:'事由',category:'',key:'subject'},
          {width:'100',title:'金额',category:'money',key:'money'},
          {width:'100',title:'状态',category:'',key:'stateVal'}
        ],
        tableTipInfo:[],

        isPrettyCashOff: true,
        contentTotal: []
      }
    },
    methods: {
      batchAllca(){
        this.$dialog.OpenWindow({
          width: '1250',
          height: '750',
          title: '批量拨付',
          url: '/reimbursementReconDetailForm',
          closeCallBack: (data)=>{
            if(data){
              console.log(data)
            }
          }
        })
      },
      totalClick(item){
        // if(item.val==='总数'){
        //   this.listState.value = ''
        // } else if(item.val==='已完成'){
        //   this.listState.value = '0'
        // } else if(item.val==='进行中'){
        //   this.listState.value = '1'
        // } else if(item.val==='驳回'){
        //   this.listState.value = '2'
        // }
        // this.initPageData()
      },
      //选中汇总
      selectedSum(){
        let params={
          selectValue:this.selectValue
        }
        this.ajaxJson({
          url: '/PersonOffice/commonSelectedsave',
          data:params,
          call:(data) =>{
            let paramsFinish = {
              state: this.listState.value,
            }
            if(data.type===0){
              this.ajaxJson({
                url: '/PersonOffice/reimbursementsApprovalTotal',
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
                url: '/approvalReimbursementForm?id='+data.val,
                closeCallBack: (dataTwo)=>{
                  if(dataTwo){

                  }
                }
              })
            }
          }
        })
      },


      writeOff(item){
        let params={
          id:item.id,
          prettyCashsID:item.prettyCashsID
        }
        this.ajaxJson({
          url: '/PersonOffice/writeOffPrettyCashMoney',
          data: params,
          call: (data) => {
            this.$dialog.alert({
              tipValue: data.message,
              closeCallBack: () => {
                this.initPageData(false)
              }
            })
          }
        })
      },
      refundMoney(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '690',
          title: '确认收款',
          url: '/bankDetailForm?ownerID=' + item.prettyCashsID +'&bankDetailType=7&directionBefore=1',
          closeCallBack: (data)=>{
            this.initPageData(false)
          }
        })
      },
      /* 确认还款 */
      repayment(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '740',
          title: '拨付资金',
          url: '/bankDetailForm?ownerID=' + item.id + '&bankDetailType=3',
          closeCallBack: (data) => {
            if(data){
              this.initPageData(false)
            }
          }
        })
      },
      /* 打印 */
      printFund(item){
        // if (item.isPrettyCashOff === '0'){
          this.$dialog.OpenWindow({
            width: '638',
            height: '300',
            title: '打印报销单信息',
            url: '/approvalReimbursementFund?id=' + item.id + '&isPrint=1',
            closeCallBack: () => {
            }
          })
        // }else{
        //   this.$dialog.OpenWindow({
        //     width: '846',
        //     height: '614',
        //     title: '备用金报销单打印信息',
        //     url: '/approvalReimbursementPrintBYJ?fundID=' + item.id,
        //     closeCallBack: () => {
        //     }
        //   })
        // }
      },
      /* 拨付资金 */
      approFund(item){
        if (item.isPrettyCashOff === '0'){
          this.$dialog.OpenWindow({
            width: '650',
            height: '300',
            title: '拨付资金',
            url: '/approvalReimbursementFund?id='+item.id,
            closeCallBack: (data)=>{
              if(data){
                this.initPageData(false)
              }
            }
          })
        }else{
          //备用金拨付资金
          this.$dialog.OpenWindow({
            width: '1050',
            height: '740',
            url: '/bankDetailForm?ownerID=' + item.id + '&bankDetailType=6&directionBefore=1',
            title: '拨付资金',
            closeCallBack: (data) => {
              if(data){
                this.$dialog.setReturnValue('123')
                location.reload()
              }
            }
          })
        }
      },
      tableTipShowEvent(item,control){
        if(item.subjectList.length > 1) {
          this.tableTipInfo = item.subjectList
          this.tableTipControl = control
          this.tableTip = true
        }
      },
      tableTipHideEvent(){
        this.tableTip = false
      },
      listView (item) {

        //let url = '/approvalReimbursementForm?id=' + item.id +'&isPrint=' + item.isPrint + '&isApproval=' + item.isApproval

        this.$dialog.OpenWindow({
          width: 1050,
          height: 550,
          url: '/approvalReimbursementForm?id=' + item.id +'&isPrint=' + item.isPrint + '&isApproval=' + item.isApproval,
          title: '查看报销信息',
          closeCallBack: (data) => {
            this.initPageData(false);
            // if (data) {
            //   this.initPageData(false);
            // }
          }
        })
      },

      initPageData (initValue) {
        let params = {}

        if (initValue) {
          params = {}
        } else {
          params = {
            state: this.listState.value,
            isPrettyCashOff: this.listIsPrettyCashOff.value
          }
        }
        this.init({
          initValue: initValue,
          url: '/PersonOffice/getReimbursementApproval',
          data: params,
          all: (data) => {
            this.contentTotal = data.total
            // this.showBatchAppropriation = data.showBatchAppropriation
            //不管是不是初始化都需要执行的代码
          },
          init: (data) => {
            //初始化时需要执行的代码
            // 这边初始化筛选信息
            this.listState = data.statePsd
            this.listIsPrettyCashOff = data.isPrettyCashOffPsd
            this.isPrettyCashOffList = data.isPrettyCashOffPsd.list

          }
        })
      },
      adoptEvent (item) { //提交申请
        if(this.listState.value==0){
          return
        }
        if(item.id){
          let params = {
            id: item.id,
            tableName: 40
          }

          this.$dialog.confirm({
            width: 300,
            tipValue: '是否通过?',
            alertImg: 'warn',
            okCallBack: (data)=>{
              this.ajaxJson({
                url: '/PersonOffice/getPressIDVue',
                data: params,
                call: (data) => {
                  this.category = data.message
                  if (this.category) {
                    let params = {
                      id: data.message,
                      kind: '1',
                      tableName: '40',
                      tableDetailName: '41',
                      location: '0',
                    }
                    this.ajaxJson({
                      url: '/PersonOffice/approvalYesVue',
                      data: params,
                      call: (data)=>{
                        if(data.type === 0){
                          this.$dialog.alert({
                            tipValue: data.message,
                            closeCallBack: () => {
                              this.initPageData(false)
                            }
                          })
                        }else if(data.type === 1){
                          this.$dialog.alert({
                            tipValue: data.message,
                            alertImg: 'error',
                            closeCallBack: () => {
                            }
                          })
                        } else if(data.type === 2){
                          this.$dialog.alert({
                            tipValue: data.message,
                            alertImg: 'error',
                            closeCallBack: () => {
                            }
                          })
                        }
                      }
                    })
                  }
                }
              })
            }
          })
        }
      },
      rejectEvent (item) {
        if(this.listState.value==0){
          return
        }
        if(item.id){
          this.$dialog.OpenWindow({
            width: 1050,
            height: 720,
            title: '驳回理由',
            url: '/rejectReason?category=12' +'&id=' + item.id+ '&tableName=40&tableDetailName=41&kind=1',
            closeCallBack: (data)=>{
              this.initPageData(false)
            }
          })
        }
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
        }
      })
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
  }
</script>

<style scoped>

</style>
