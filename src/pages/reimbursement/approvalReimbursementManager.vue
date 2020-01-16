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
      </template>

      <template #operate>
        <yhm-table-tip :show="tableTip" :content="tableTipInfo" :column="tableTipColumnInfo" :mouse-control="tableTipControl"></yhm-table-tip>
        <yhm-commonbutton :value="choose?'收起筛选':'展开筛选'" :icon="choose?'btnUp':'btnDown'" @call="switchChoose()"></yhm-commonbutton>
        <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initData"></yhm-managersearch>
        <!--      <div @click="selectPerson" style="display: inline-block; width: 120px; height: 30px; border: 1px solid #49A8EA;">选择联系人</div>-->
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
        <yhm-managerth style="width: 120px" title="申请时间" value="workDate"></yhm-managerth>
        <yhm-managerth style="width: 90px" title="是否核销" value="isPrettyCashOff"></yhm-managerth>
        <yhm-managerth style="width: 80px;" title="申请人" value="name"></yhm-managerth>
        <yhm-managerth style="width: 120px" title="申请金额" value="money"></yhm-managerth>
        <yhm-managerth style="width: 80px" title="提交天数" value="day"></yhm-managerth>
        <yhm-managerth style="width: 150px;" title="批次号" value="code"></yhm-managerth>
        <yhm-managerth title="事由"></yhm-managerth>
        <yhm-managerth style="width: 120px;" title="状态" value="state"></yhm-managerth>
        <yhm-managerth style="width: 220px;" title="操作"></yhm-managerth>
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
            <yhm-manager-td-operate-button v-show="item.category === '4'" :no-click="item.isApproval==='4'" @click="approFund(item)" value="拨付资金" icon="i-btn-grant" color="#be08e3"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button v-show="item.state === '-1' && item.isFinish === '0' && item.isPrint === '1'" @click="repayment(item)" value="确认还款" icon="i-complete" color="#6e19e1"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button v-show="(item.isApproval !== '0' || item.isPrint !== '1') && item.isPrint === '0'" :no-click="item.isApproval!=='0'" @click="adoptEvent(item)" value="通过" icon="i-btn-applicationSm" color="#49a9ea"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button v-show="(item.isApproval === '0' && item.isPrint === '1') || item.isPrint === '0'" :no-click="item.isApproval!=='0' || item.okSingle !== '0'" @click="rejectEvent(item)" value="驳回" icon="i-btn-turnDown" color="#FF0000"></yhm-manager-td-operate-button>
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
      }
    },
    methods: {
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
        if (item.isPrettyCashOff === '0'){
          this.$dialog.OpenWindow({
            width: '638',
            height: '300',
            title: '打印报销单信息',
            url: '/approvalReimbursementFund?id=' + item.id + '&isPrint=1',
            closeCallBack: () => {
            }
          })
        }else{
          this.$dialog.OpenWindow({
            width: '846',
            height: '614',
            title: '备用金报销单打印信息',
            url: '/approvalReimbursementPrintBYJ?fundID=' + item.id,
            closeCallBack: () => {
            }
          })
        }
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
            if (data) {
              this.initPageData(false)
              /*false->非初始化=>!import  true->初始化*/
            }
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
