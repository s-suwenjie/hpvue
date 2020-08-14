<template>
  <div>
    <yhm-managerpage category="1">
      <template #navigationTab>
        <router-link class="menuTabDiv" v-for="(item,index) in details" :key="index" :class="{menuTabActive:menuTabOn == index}" :to="{path:item.path}" @click="menuTab(index)">
          {{item.name}}
        </router-link>
      </template>
    <!--导航条-->

    <!--操作区-->
      <template #operate>
        <yhm-table-tip :show="tableTip" :content="tableTipInfo" :column="tableTipColumnInfo" :mouse-control="tableTipControl"></yhm-table-tip>
        <yhm-commonbutton value="添加" icon="btnAdd" :flicker="true" @call="add()" category="one"></yhm-commonbutton>
<!--        <yhm-commonbutton :value="choose?'收起筛选':'展开筛选'" :icon="choose?'btnUp':'btnDown'" @call="switchChoose()"></yhm-commonbutton>-->
        <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initData"></yhm-managersearch>
        <yhm-commonbutton value="打开选中信息" icon="i-selectAll" @call="selectedList" :show="isSelected" category="three"></yhm-commonbutton>
        <yhm-radiofilter :before="stateBefore" @initData="initChoose('categoryUnit')" title="状态" :content="listState"></yhm-radiofilter>

      </template>

      <!--筛选区-->
      <template #choose>
        <div v-show="choose" class="buttonBody mptZero">
        </div>
      </template>
      <!--数据表头-->
      <template #listHead>
        <yhm-managerth style="width: 38px;" title="选择"></yhm-managerth>
        <yhm-managerth style="width: 38px;" title="查看"></yhm-managerth>
        <yhm-managerth style="width: 300px;" title="收款方" value="id"></yhm-managerth>
        <yhm-managerth style="width: 150px" title="最迟付款日期" value="lastDate"></yhm-managerth>
        <yhm-managerth style="width: 180px;" title="事由"></yhm-managerth>
        <yhm-managerth style="width: 120px" title="付款计划金额" value="planMoney"></yhm-managerth>
        <yhm-managerth style="width: 60px;" title="审批留言"></yhm-managerth>
        <yhm-managerth style="width: 130px" title="状态" value="state"></yhm-managerth>
        <yhm-managerth style="width: 215px;" title="操作"></yhm-managerth>
      </template>
      <!--数据明细-->
      <template #listBody>
        <tr :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]" v-for="(item,index) in content" :key="index">
          <yhm-manager-td-checkbox :value="item"></yhm-manager-td-checkbox>
          <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>
          <yhm-manager-td :tip="true" :value="item.otherUnit"></yhm-manager-td>
          <yhm-manager-td-date :before-icon="item.causeList.length > 1?'i-btn-prompt':''" @mouseover="tableTipShowEvent" @mouseout="tableTipHideEvent" :value-object="item" :value="item.lastDate"></yhm-manager-td-date>
          <yhm-manager-td :after-icon="item.causeList.length > 1?'i-btn-prompt':''" @mouseover="tableTipShowEvent" @mouseout="tableTipHideEvent" :value-object="item" :value="item.cause"></yhm-manager-td>
          <yhm-manager-td-money :before-icon="item.causeList.length > 1?'i-btn-prompt':''" @mouseover="tableTipShowEvent" @mouseout="tableTipHideEvent" :value-object="item" :value="item.planMoney"></yhm-manager-td-money>
          <yhm-manager-td-leaveword @iconClick="listView(item)" :leave-word-show="item.approvalMessage === '1'?true:false"></yhm-manager-td-leaveword>
          <yhm-manager-td-state :value="item.stateVal" :stateColor="item.stateColor" :stateImg="item.stateImg"></yhm-manager-td-state>
          <yhm-manager-td-operate>
            <yhm-manager-td-operate-button :no-click="item.state !== '0' || item.isFinish === '1'" @click="submit(item)" value="提交申请" icon="i-btn-applicationSm" color="#49a9ea"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button :no-click="item.state === '0' || item.isFinish === '1'" @click="urge(item)" value="催促" icon="i-btn-urge" color="#2AA70B"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button :no-click="item.state !== '0' || item.isFinish === '1'" @click="del(item)" value="删除" icon="delete" color="#FF0000"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button v-show="item.state=='1'" :no-click="item.state == '1'?false:true" @click="revocationClick(item)" icon="i-btn-applicationSm" value="撤销申请" color="#fd6802"></yhm-manager-td-operate-button>
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
              <yhm-managerth style="width: 100px;" before-color="#49a9ea" title="" before-title="进行中" ></yhm-managerth>
              <yhm-managerth style="width: 100px;" before-color="#ff0000" title="" before-title="已完成" ></yhm-managerth>
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
  name: 'paymentPlanManager',
  mixins: [managermixin],
  data () {
    return {
      tableTip:false,         //记录表格是否显示
      tableTipControl:{},
      tableTipColumnInfo:[
        {width:'120',title:'最迟付款日期',category:'date',key:'lastDate'},
        {width:'100',title:'事由',category:'',key:'subject'},
        {width:'100',title:'金额',category:'money',key:'money'},
        {width:'100',title:'状态',category:'',key:'stateVal'}
      ],
      tableTipInfo:[],

      causetbSwitch: false,
      indexNum: '',

      causeList: {},

      category: '',
      causeMore: false,
      subjectCount: '',
      otherUnitID: false,
      otherAccountID: false,
      insertDate: false,
      planMoney: false,
      state: false,
      idMess:'',
      stateBefore: '0', // 默认选择状态为可以选择，1为不可以选择
      listState: {
        value: '',
        list: []
      },
      menuTabOn:'0',
      details:[
        {id:'1', name: '付款计划',path:'/home/myPaymentPlanManager'},
        {id:'2', name: '付款申请',path:'/home/myManager/paymentApplyManager'},
        {id:'3', name: '报销',path:'/home/myManager/reimbursementManager'},
        {id:'4', name: '采购计划',path:'/home/myPurchaseManager'},
        {id:'5', name: '备用金',path:'/home/prettyCashsManager'},
        {id:'6', name: '补签字',path:'/home/myManager/signatureManager'},
        {id:'7', name: '开票申请',path:'/home/openInvoiceManager'},
      ],
      contentTotal: []
    }
  },
  methods: {
    revocationClick(item) {//撤销申请
      this.$dialog.confirm({
        width: 300,
        tipValue: '是否确认撤销申请？',
        btnValueOk: '确定',
        alertImg: 'warn',
        okCallBack: (data) => {
          let params = {
            id: item.id,
            // category: this.category,
            tableName: 43,
            isDetail: 1,
            tableDetailName: 44
          }
          this.ajaxJson({
            url: '/PersonOffice/approvalWithdraw',
            data: params,
            call: (data) => {
              if(data.type === 0){
                this.$dialog.alert({
                  tipValue: data.message,
                  closeCallBack: ()=>{
                    this.initPageData()
                  }
                })
              }else{
                this.$dialog.alert({
                  alertImg: 'warn',
                  tipValue: data.message
                })
              }
            }
          })
        }
      })
    },
    //汇总部分筛选
    totalClick(item){
      // if(item.isFinish==='-1'){
      //   this.listState.value = ''
      // } else if(item.isFinish==='0'){
      //   this.listState.value = '0'
      // } else if(item.isFinish==='1'){
      //   this.listState.value = '1'
      // }
      // this.pageIndex=1
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
          console.log(data)
          if(data.type===0){
            this.ajaxJson({
              url: '/PersonOffice/paymentPlanManagerTotal',
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
          if(data.type===0){
            this.$dialog.OpenWindow({
              width: '1050',
              height: '620',
              title: '查看选中信息',
              url: '/PaymentPlanFormView?id='+data.val,
              closeCallBack: (dataTwo)=>{
                if(dataTwo){

                }
              }
            })
          }
        }
      })
    },
    /* 删除按钮 */
    del(item){
      this.$dialog.confirm({
        width: 300,
        tipValue: '确定删除？',
        btnValueOk: '确定',
        alertImg: 'warn',
        okCallBack: (data) => {
          let params = {
            id: item.id
          }
          this.ajaxJson({
            url: '/PersonOffice/getPaymentPlanManagerDel',
            data: params,
            call: (data)=>{
              if(data.type === 0){
                this.$dialog.alert({
                  tipValue: data.message,
                  closeCallBack: ()=>{
                    this.initPageData()
                  }
                })
              }else{
                this.$dialog.alert({
                  alertImg: 'warn',
                  tipValue: data.message
                })
              }
            }
          })
        }
      })
    },
    menuTab (index) {
      this.menuTabOn = index
    },
    // 页面添加和查看事件

    listView (item) {
      if(item.isFinish==='0'&&item.state==='0'){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '520',
          url: '/myPaymentPlanForm?id=' + item.id,
          title: '查看付款计划信息',
          closeCallBack: (data) => {
            if (data) {
              if (data) {
                this.lastData = data
              }
              this.initPageData(false)
              /* false->非初始化=>!import  true->初始化 */
            }
          }
        })
      }else{
        this.$dialog.OpenWindow({
          width: '1050',
          height: '520',
          url: '/PaymentPlanFormView?id=' + item.id,
          title: '查看付款计划信息',
          closeCallBack: (data) => {
            if (data) {
              if (data) {
                this.lastData = data
              }
              this.initPageData(false)
              /* false->非初始化=>!import  true->初始化 */
            }
          }
        })
      }
    },
    add () {
      this.$dialog.OpenWindow({
        width: 1050,
        height: 520,
        url: '/myPaymentPlanForm',
        title: '添加付款计划信息',
        closeCallBack: (data) => {
          if (data) {
              this.lastData = data
              this.initPageData(false)
            /* false->非初始化=>!import  true->初始化 */
          }
        }
      })
    },
    initPageData (initValue) {
      let params = {}
      if (initValue) {
        // 页面初始化是需要的参数
        params = {}
      } else {
        // 页面非初始化时需要的参数
        params = {
          state: this.listState.value
        }
      }
      this.init({
        initValue: initValue,
        url: '/PersonOffice/getPaymentPlanManager',
        data: params,
        all: (data) => {
          // 不管是不是初始化都需要执行的代码
          this.contentTotal = data.total
        },
        init: (data) => {
          // 初始化时需要执行的代码
          // 这边初始化筛选信息
          this.listState = data.statePsd
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

    submit (item) {
      if (item.isFinish === '0' && item.state === '0') {
        if (item.id) {
          let params = {
            id: item.id,
            tableName: 43
          }
          this.$dialog.confirm({
            width: 300,
            tipValue: '确定提交申请?',
            btnValueOk: '确定',
            alertImg: 'warn',
            okCallBack: (data) => {
              this.ajaxJson({
                url: '/PersonOffice/getSubmitCatrgoryVue',
                data: params,
                call: (data) => {
                  this.category = data.message
                  if (this.category) {
                    /* 判断是否拿到category */
                    let params = {
                      id: item.id,
                      category: this.category,
                      tableName: 43,
                      isDetail: 1,
                      tableDetailName: 44
                    }
                    this.ajaxJson({
                      url: '/PersonOffice/approvalSubmitVue',
                      data: params,
                      call: (data) => {
                        if (data.type == '0') {
                          this.$dialog.alert({
                            tipValue: data.message,
                            closeCallBack: () => {
                              this.initPageData(true)
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
                  }else{
                    this.$dialog.alert({
                      tipValue: '没有获取到提交数据!',
                      alertImg: 'error'
                    })
                  }
                }
              })
            }
          })
        }
      }
    },
    urge (item) {
      if (item.id) {
        this.$dialog.confirm({
          width: 250,
          tipValue: '是否催促?',
          btnValueOk: '是',
          btnValueCancel: '否',
          alertImg: 'warn',
          okCallBack: () => {
            let params = {
              id: item.id,
              tableName: 43
            }
            this.ajaxJson({
              url: '/PersonOffice/getPressIDVue',
              data: params,
              call: (data) => {
                if (data.type === 0) {
                  this.idMess = data.message
                  let params = {
                    id: this.idMess,
                  }
                  this.ajaxJson({
                    url: '/PersonOffice/approvalPressVue',
                    data: params,
                    call: (data) => {
                      if (data.type === 0) {
                        this.$dialog.alert({
                          tipValue: '催促成功！'
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
  },
}
</script>
<style scoped lang="less">
  .icon-add-to:before,.icon-up:before,.icon-down:before{
    color: #49a9ea;
  }
  .causeMore{
    margin-left: 5px;
    display: inline-block;
    cursor: pointer;
    vertical-align: text-top;
  }
  .icon-checkboxed:before{
    color: #49a9ea;
    font-size: 18px;
  }
  .icon-checkbox{
    font-size: 18px;
  }

</style>
