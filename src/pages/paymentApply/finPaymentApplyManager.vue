<template>
  <div>
    <yhm-managerpage category="1" :total-table="true">
      <!--导航条-->

      <template #navigationTab>
        <a class="menuTabDiv" href="/Fin/_bankDetailManager?menuType=1">收支明细</a>
        <router-link class="menuTabDiv" :to="{path:'/home/viewManager/paymentPlanViewManager'}">付款计划</router-link>
        <router-link class="menuTabDiv menuTabActive" :to="{path:'/home/viewManager/paymentApplyViewManager'}">付款申请</router-link>
        <router-link class="menuTabDiv" :to="{path:'/home/viewManager/reimbursementViewManager'}">报销申请</router-link>
      </template>

      <!--操作区-->
      <template #operate>
        <yhm-table-tip :show="tableTip" :content="tableTipInfo" :column="tableTipColumnInfo" :mouse-control="tableTipControl"></yhm-table-tip>
        <yhm-commonbutton :value="choose?'收起筛选':'展开筛选'" :icon="choose?'btnUp':'btnDown'" @call="switchChoose()"></yhm-commonbutton>
<!--        <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initData"></yhm-managersearch>-->
        <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initData"></yhm-managersearch>

      </template>

      <!--筛选区-->
      <template #choose>
        <div v-show="choose" class="buttonBody mptZero">
          <yhm-radiofilter :before="stateBefore" @initData="initChoose('categoryUnit')" title="状态"  :content="listState"></yhm-radiofilter>
          <yhm-radiofilter :before="isRelevanceBefore" @initData="initChoose('isRelevance')" title="是否关联"   :content="listisRelevance"></yhm-radiofilter>
          <yhm-radiofilter :before="stateBefore" @initData="initChoose('isChecks')" title="是否支票支付" all="1" :content="listIsChecks"></yhm-radiofilter>
        </div>
      </template>

      <!--数据表头-->
      <template #listHead>
        <yhm-managerth style="width: 38px;" title="选择"></yhm-managerth>
        <yhm-managerth style="width: 38px;" title="查看"></yhm-managerth>
        <yhm-managerth style="width: 70px" title="申请人" value="person"></yhm-managerth>
        <yhm-managerth title="收款方"  value="id"></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="是否支票支付" value="isChecks"></yhm-managerth>
        <yhm-managerth style="width: 120px" title="最迟付款日期" value="lastDate"></yhm-managerth>
        <yhm-managerth style="width: 70px" title="倒计时" value="day"></yhm-managerth>
        <yhm-managerth style="width: 80px;" title="事由"></yhm-managerth>
        <yhm-managerth style="width: 100px" title="申请金额" value="money"></yhm-managerth>
        <yhm-managerth style="width: 205px;" title="编号" value="code"></yhm-managerth>
        <yhm-managerth style="width: 100px" title="状态" value="state"></yhm-managerth>
        <yhm-managerth style="width: 90px" title="最后操作人" value="lastOperatorPerson"></yhm-managerth>
        <yhm-managerth style="width: 120px" title="操作时间" value="lastOperatorDate"></yhm-managerth>
      </template>

      <!--数据明细-->
      <template #listBody>
        <tr :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0},{listDelLine: item.isFinish === '1' && item.state !== '-1'}]" v-for="(item,index) in content"
            :key="index">
          <yhm-manager-td-checkbox :value="item"></yhm-manager-td-checkbox>
          <yhm-manager-td-look @click="add(item)"></yhm-manager-td-look>
          <yhm-manager-td-center :value="item.person"></yhm-manager-td-center>
          <yhm-manager-td :tip="true" @click="unitView(item)" :value="item.otherUnit" color="#7307dc" v-show="item.ownerID!==''"></yhm-manager-td>
          <yhm-manager-td :tip="true" :value="item.otherUnit"  v-show="item.ownerID==''"></yhm-manager-td>
          <yhm-manager-td-psd :value="item.isChecks" :list="isChecksList"></yhm-manager-td-psd>
          <yhm-manager-td-date :value="item.lastDate"></yhm-manager-td-date>
          <yhm-manager-td-center :value="item.day+'天'" v-if="item.day<=7" style="color:#f00;font-weight: bold"></yhm-manager-td-center>
          <yhm-manager-td-center :value="item.day+'天'" v-else-if="item.day>20" style="color:#2c920b;font-weight: bold"></yhm-manager-td-center>
          <yhm-manager-td-center :value="item.day+'天'" v-else style="color: #0511a5;font-weight: bold"></yhm-manager-td-center>
          <yhm-manager-td-center :value="item.subject"></yhm-manager-td-center>
          <yhm-manager-td-money :tip-category="1" :before-icon="item.balanceList.length > 0?'i-btn-prompt':''" @mouseover="tableTipShowEvent" :value-object="item" @mouseout="tableTipHideEvent" :value="item.money"></yhm-manager-td-money>

          <yhm-manager-td-center :value="item.code"></yhm-manager-td-center>
          <yhm-manager-td-state :value="item.stateVal" :stateColor="item.stateColor" :stateImg="item.stateImg"></yhm-manager-td-state>
          <yhm-manager-td-center :value="item.lastOperatorPerson"></yhm-manager-td-center>
          <yhm-manager-td-date :value="item.lastOperatorDate"></yhm-manager-td-date>
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
      <template #listTotalHead>
        <yhm-managerth style="width: 100px;" before-color="black" title="" before-title="总数" ></yhm-managerth>
        <yhm-managerth style="width: 100px;" before-color="#49a9ea" title="" before-title="进行中" ></yhm-managerth>
        <yhm-managerth style="width: 100px;" before-color="#ff0000" title="" before-title="驳回" ></yhm-managerth>
        <yhm-managerth style="width: 100px;" before-color="#2c920b" title="" before-title="已完成" ></yhm-managerth>

      </template>
      <template #listTotalLeft>
        <div class="listTotalLeft">
          <span class="test"></span>
          <span class="test">金额</span>
          <span class="test">条数</span>
        </div>
      </template>
      <template #listTotalBody>
        <tr>
          <yhm-manager-td-money @click="totalClick(item)" v-for="(item,index) in contentTotal" :key="index" :value="item.money"></yhm-manager-td-money>
        </tr>
        <tr>
          <yhm-manager-td-rgt @click="totalClick(item)" v-for="(item,index) in contentTotal" :key="index" :value="item.count"></yhm-manager-td-rgt>
        </tr>
      </template>
    </yhm-managerpage>
  </div>
</template>
<script>
  import { selectItem, managermixin } from '@/assets/manager.js'

  export default {
    name: 'paymentApplyViewManager',
    mixins: [managermixin],
    data () {
      return {
        index: '',
        total:[],
        underway:'',
        offTheStocks:'',
        reject:'',
        contentTotal: [],
        causetbSwitch: false,

        indexNum: '',

        empty: true,

        category: 3,
        causeMore: false,
        subjectCount: '',
        otherUnitID: false,
        otherAccountID: false,
        lastDate: false,
        money: false,
        state: false,

        isChecksList:[],
        isChecks:'',
        listIsChecks:{
          value: '',
          list: []
        },

        tableTip: false,
        tableTipColumnInfo: [],
        tableTipControl: {},
        balanceTableTipColumnInfo:[
          {width:'110',title:'剩余金额',category:'money',key:'balance'}
        ],
        tableTipInfo:[],
        stateBefore: '0', // 默认选择状态为可以选择，1为不可以选择
        listState: {
          value: '',
          list: []
        },
        isRelevanceBefore: '0', // 默认选择状态为可以选择，1为不可以选择
        listisRelevance: {
          value: '',
          list: []
        },

      }
    },
    methods: {
      totalClick(item){
        if(item.val==='总数'){
          this.listState.value = ''
        } else if(item.val==='已完成'){
          this.listState.value = '0'
        } else if(item.val==='进行中'){
          this.listState.value = '1'
        } else if(item.val==='驳回'){
          this.listState.value = '2'
        }
        this.initPageData()
      },
      tableTipShowEvent(item,control,category){
        if(category === 1){
          if(item.balanceList.length > 0) {
            this.tableTipColumnInfo = this.balanceTableTipColumnInfo
            this.tableTipInfo = item.balanceList
            this.tableTipControl = control
            this.tableTip = true
          }
        }
      },
      tableTipHideEvent(){
        this.tableTip = false
      },
      add (item) {
        // 默认设置页面标记是查看
        var isAdd = false
        // 默认设置页面标题为查看信息
        var title = '查看付款申请信息'
        var url = '/paymentApplyViewForm?id=' + item.id +'&ownerID='+item.ownerID
        // if (!id) { // 当id不存在的时候
        //   // 设置id为空
        //   id = ''
        //   // 设置页面标题为添加信息
        //   title = '添加付款申请信息'
        //   // 设置页面标记为添加
        //   isAdd = true
        //   url = '/paymentApplyViewForm?id='
        // }
        this.$dialog.OpenWindow({
          width: 1050,
          height: 750,
          url: url,
          title: title,
          closeCallBack: (data) => {

            if (data) {
              if (isAdd) {
                this.lastData = data
              }
              this.initPageData(false)
              /*false->非初始化=>!import  true->初始化*/
            }
          }
        })
      },
      unitView(item){
        if(item.personOrUnit==='0'){
          this.$dialog.OpenWindow({
            width: '1050',
            height: '690',
            url:'/unitView?id=' + item.otherUnitID,
            title:'查看单位信息',
            closeCallBack:(data) =>{
              if(data){
                this.initPageData(false)
              }
            }
          })
        } else {
          this.$dialog.OpenWindow({
            width: '1050',
            height: '690',
            url:'/personView?id=' + item.otherUnitID,
            title:'查看联系人信息',
            closeCallBack:(data) =>{
              if(data){
                this.initPageData(false)
              }
            }
          })
        }

      },

      initPageData (initValue) {
        let params = {}

        if (initValue) {
          params = {
            state:''
          }
        } else {
          params = {
            state: this.listState.value,
            isRelevance:this.listisRelevance.value,
            isChecks:this.listIsChecks.value
          }
        }
        this.init({
          initValue: initValue,
          url: '/PersonOffice/getPaymentManagerAll',
          data: params,
          all: (data) => {
            this.total = data.total
            this.underway = this.total[0]
            this.offTheStocks = this.total[1]
            this.reject = this.total[2]
            this.contentTotal = data.total

            //不管是不是初始化都需要执行的代码
          },
          init: (data) => {
            //初始化时需要执行的代码
            // 这边初始化筛选信息
            this.isChecksList = data.isChecksPsd.list
            this.listIsChecks = data.isChecksPsd
            this.listState = data.statePsd
            this.listisRelevance = data.isRelevancePsd
          }
        })
      },

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
  .listTotalLeft span:nth-child(1),.listTotalLeft span:nth-child(2){
    border-right: 0;
    border-bottom: 0;
  }
  .listTotalLeft span:nth-child(3){
    border-right: 0;
  }
.col{
  color: #A58305;
}
  .causeMore {
    margin-left: 5px;
    display: inline-block;
    cursor: pointer;
    vertical-align: text-top;
  }


</style>
