<template>
  <div>
    <yhm-managerpage category="1" :total-table="true">
      <!--导航条-->

      <template #navigationTab>
        <a class="menuTabDiv" href="/Fin/_bankDetailManager?menuType=1">收支明细</a>
        <router-link class="menuTabDiv" :to="{path:'/home/viewManager/paymentPlanViewManager'}">付款计划</router-link>
        <router-link class="menuTabDiv" :to="{path:'/home/viewManager/paymentApplyViewManager'}">付款申请</router-link>
        <router-link class="menuTabDiv menuTabActive" :to="{path:'/home/viewManager/reimbursementViewManager'}">报销申请</router-link>
      </template>

      <!--操作区-->
      <template #operate>
        <yhm-table-tip :show="tableTip" :content="tableTipInfo" :column="tableTipColumnInfo" :mouse-control="tableTipControl"></yhm-table-tip>
        <yhm-commonbutton :value="choose?'收起筛选':'展开筛选'" :icon="choose?'btnUp':'btnDown'" @call="switchChoose()"></yhm-commonbutton>
        <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initData"></yhm-managersearch>
        <!--      <div @click="selectPerson" style="display: inline-block; width: 120px; height: 30px; border: 1px solid #49A8EA;">选择联系人</div>-->
      </template>

      <!--筛选区-->
      <template #choose>
        <div v-show="choose" class="buttonBody mptZero">
          <yhm-radiofilter :before="stateBefore" @initData="initChoose('categoryUnit')" title="状态" :content="listState"></yhm-radiofilter>
          <yhm-radiofilter @initData="initChoose('isPrettyCashOff')" title="是否核销" :content="listIsPrettyCashOff"></yhm-radiofilter>
        </div>
      </template>

      <!--数据表头-->
      <template #listHead>
        <yhm-managerth style="width: 40px;" title="选择"></yhm-managerth>
        <yhm-managerth style="width: 40px;" title="查看"></yhm-managerth>
        <yhm-managerth style="width: 100px" title="申请人" value="name"></yhm-managerth>
        <yhm-managerth style="width: 150px" title="申请日期" value="workDate"></yhm-managerth>
        <yhm-managerth style="width: 90px" title="是否核销" value="isPrettyCashOff"></yhm-managerth>
        <yhm-managerth style="width: 100px" title="提交天数" value="day"></yhm-managerth>
        <yhm-managerth title="事由"></yhm-managerth>
        <yhm-managerth style="width: 120px" title="报销金额" value="money"></yhm-managerth>
        <yhm-managerth style="width: 150px" title="编号" value="code"></yhm-managerth>
        <yhm-managerth style="width: 120px" title="状态" value="stateVal"></yhm-managerth>
        <yhm-managerth style="width: 95px" title="最后操作人" value="lastOperatorPerson"></yhm-managerth>
        <yhm-managerth style="width: 140px" title="操作时间" value="lastOperatorDate"></yhm-managerth>
      </template>

      <!--数据明细-->
      <template #listBody>
        <tr :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0},{listDelLine: item.isFinish === '1' && item.state !== '-1'}]" v-for="(item,index) in content" :key="index">
          <yhm-manager-td-checkbox :value="item"></yhm-manager-td-checkbox>
          <yhm-manager-td-look @click="add(item.id)"></yhm-manager-td-look>
          <yhm-manager-td-center :value="item.name"></yhm-manager-td-center>
          <yhm-manager-td-date :value="item.workDate"></yhm-manager-td-date>
          <yhm-manager-td-psd :value="item.isPrettyCashOff" :list="isPrettyCashOffList"></yhm-manager-td-psd>
          <yhm-manager-td-center :value="item.day+'天'" v-if="item.day<=2" style="color:#2c920b;font-weight: bold"></yhm-manager-td-center>
          <yhm-manager-td-center :value="item.day+'天'" v-else-if="item.day>2&&item.day<=5" style="color:#0511a5;font-weight: bold"></yhm-manager-td-center>
          <yhm-manager-td-center :value="item.day+'天'" v-else style="color: #f00;font-weight: bold"></yhm-manager-td-center>
          <yhm-manager-td :value="item.subject" :after-icon="item.subjectList.length > 1?'i-btn-prompt':''" @mouseover="tableTipShowEvent" @mouseout="tableTipHideEvent" :value-object="item"></yhm-manager-td>
          <yhm-manager-td-money :value="item.money" :before-icon="item.subjectList.length > 1?'i-btn-prompt':''" @mouseover="tableTipShowEvent" @mouseout="tableTipHideEvent" :value-object="item"></yhm-manager-td-money>
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
  import Qs from 'qs'
  import { selectClick, selectComputedSelected, selectConfirm, selectdbClick, number2chinese } from '@/assets/common.js'
  import { selectItem,managermixin } from '@/assets/manager.js'
  export default {
    name: 'reimbursementViewManager',
    mixins: [managermixin],
    data () {
      return {
        index:'',
        indexNum: '',

        empty: true,

        category: 3,
        causeMore: false,
        contentTotal:[],
        subjectCount: '',
        otherUnitID: false,
        otherAccountID: false,
        lastDate: false,
        money: false,
        state: false,

        listIsPrettyCashOff:{
          value: '',
          list: []
        },
        isPrettyCashOffList:[],

        stateBefore: '0', // 默认选择状态为可以选择，1为不可以选择
        listState: {
          value: '',
          list: []
        },

        tableTip: false,
        tableTipControl: {},
        tableTipColumnInfo:[
          {width:'140',title:'事由',category:'',key:'subject'},
          // {width:'140',title:'事由',category:'',key:'item'},
          {width:'100',title:'金额',category:'money',key:'money'},
          {width:'100',title:'状态',category:'',key:'stateVal'}
        ],
        tableTipInfo:[],
        causetbSwitch: false,
        subjectList: {},
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
      /* 小标格显示 */
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
      add (id) {
        // 默认设置页面标记是查看
        var isAdd = false
        // 默认设置页面标题为查看信息
        var title = '查看报销信息'
        var url = '/reimbursementViewForm?id=' + id

        this.$dialog.OpenWindow({
          width: 1050,
          height: 620,
          url:url,
          title:title,
          closeCallBack:(data) =>{
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

      initPageData (initValue) {
        let params = {}

        if (initValue) {
          params = {
            state:''
          }
        } else {
          params = {
            state: this.listState.value,
            isPrettyCashOff: this.listIsPrettyCashOff.value
          }
        }
        this.init({
          initValue:initValue,
          url: '/PersonOffice/getReimbursementManagerAll',
          data:params,
          all:(data) =>{
            //不管是不是初始化都需要执行的代码
            this.contentTotal = data.total
          },
          init:(data)=>{
            //初始化时需要执行的代码
            // 这边初始化筛选信息
            this.listState = data.statePsd
            this.listIsPrettyCashOff = data.isPrettyCashOffPsd
            this.isPrettyCashOffList = data.isPrettyCashOffPsd.list
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
  .icon-add-to:before,.icon-up:before,.icon-down:before{
    color: #49a9ea;
  }
  .operateBox{
    display: flex;
    flex-wrap: nowrap;
    height: 32px;
  }
  .operateFilter{
    display: flex;
    align-items: center;
    background-image: none;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    line-height: 32px;
    margin-left: 5px;
  }
  .causeMore{
    margin-left: 5px;
    display: inline-block;
    cursor: pointer;
    vertical-align: text-top;
  }
  .icon-prompt:before{
    border-radius: 50%;
  }
  .icon-checkboxed:before{
    color: #49a9ea;
    font-size: 18px;
  }
  .icon-checkbox{
    font-size: 18px;
  }

</style>
