<template>
  <div class="f_main f_main_customize mb16">
    <yhm-select-body :choose="false" >
      <template #operate>
        <!--        <yhm-commonbutton value="添加" icon="btnAdd" :flicker="true" @call="add()"></yhm-commonbutton>-->
        <div v-show="showTipDbSelect" class="s_db_select" :style="{left:getLeft,top:getTop}">双击选择</div>
        <yhm-managersearch :value="searchStr" id="searchStr" @call="initData"></yhm-managersearch>
        <!--        <yhm-radiofilter  @initData="initPageData(false)" title="状态" style="margin: 5px 0;" :content="pendingstateList"></yhm-radiofilter>-->

      </template>
      <template #listHead>
        <yhm-managerth-check v-if="selectType === '1'" is-select :check="allCheck" style="width: 40px;"></yhm-managerth-check>
        <yhm-managerth v-if="selectType === '0'" width="40" title="选择"></yhm-managerth>
        <yhm-managerth title="推修公司"></yhm-managerth>
        <yhm-managerth width="160" title="简称"></yhm-managerth>
        <yhm-managerth width="90" title="自保费率" prompt="自保(当年在乙方承保的车辆)" after-title="?" after-size="18px" tooltip-left="-34px" after-color="#f00"></yhm-managerth>
        <yhm-managerth width="90" title="非自保费率" prompt="非自保(一年没有进场记录或当年不在乙方承保的车辆)" after-title="?" after-size="18px" tooltip-left="-112px" after-color="#f00"></yhm-managerth>

        <yhm-managerth width="100" title="结算类型" ></yhm-managerth>
        <yhm-managerth width="100" title="有效工单条目"></yhm-managerth>
<!--        <yhm-managerth width="110" title="已产生营业额"></yhm-managerth>-->
<!--        <yhm-managerth width="110" title="预计推送费"></yhm-managerth>-->
<!--        <yhm-managerth width="110" title="已结推送费"></yhm-managerth>-->
<!--        <yhm-managerth width="110" title="未结推送费"></yhm-managerth>-->
      </template>
      <template #listBody>
        <tr v-for="(item,index) in content" :key="index"
            @click="selectEvent(item)"
            @dblclick="dblclickEvent(item)"
            @mousemove="mousemoveEvent"
            @mouseover="mouseoverEvent"
            @mouseout="mouseoutEvent"
            :class="{InterlacBg:index%2!==0}">
          <yhm-manager-td-checkbox :value="item" :no-click="false"></yhm-manager-td-checkbox>
          <yhm-manager-td  :value="item.unit"></yhm-manager-td>
          <yhm-manager-td v-if="item.unitshort==''||item.unitshort==null" value="-----"></yhm-manager-td>
          <yhm-manager-td v-else :value="item.unitshort"></yhm-manager-td>
          <yhm-manager-td-center :value="item.selfrate==''?'-----':item.selfrate + '%'"></yhm-manager-td-center>
          <yhm-manager-td-center :value="item.noselfrate==''?'-----':item.noselfrate + '%'"></yhm-manager-td-center>

          <yhm-manager-td-center v-if="item.type==''" value="------"></yhm-manager-td-center>
          <yhm-manager-td-psd v-else :value="item.type" :list="typeList"></yhm-manager-td-psd>
          <yhm-manager-td-center :value="item.sum"></yhm-manager-td-center>

<!--          <yhm-manager-td-money style="color:#fd6802" :value="item.expend==''?'0':item.expend"></yhm-manager-td-money>-->

<!--          &lt;!&ndash;            <yhm-manager-td-center :value="item.rate+'%'"></yhm-manager-td-center>&ndash;&gt;-->
<!--          &lt;!&ndash;            <yhm-manager-td-date :value="item.startDate"></yhm-manager-td-date>&ndash;&gt;-->
<!--          &lt;!&ndash;            <yhm-manager-td-date :value="item.endDate"></yhm-manager-td-date>&ndash;&gt;-->
<!--          <yhm-manager-td-money style="color:#2193B0" :value="item.pending==''?'0':item.pending"></yhm-manager-td-money>-->

<!--          <yhm-manager-td-money style="color:#2a599e" :value="item.pending3==''?'0':item.pending3"></yhm-manager-td-money>-->
<!--          <yhm-manager-td-money style="color:#f00" :value="item.pending2==''?'0':item.pending2"></yhm-manager-td-money>-->

        </tr>
      </template>

      <template #empty>
        <span class="m_listNoData" v-show="content.length === 0">暂时没有数据</span>
      </template>
      <template #pager>
        <yhm-pagination is-not-right :pager="pager" isPageSize="false" @initData="initPageData(false)"></yhm-pagination>
        <div style="width: 100%;display: flex;justify-content: center;align-items: center;margin-top: 10px;">
          <yhm-commonbutton class="mr0" icon="i-complete" value="确定" category="two" @call="selectConfirmEvent()"></yhm-commonbutton>

        </div>
      </template>
    </yhm-select-body>
  </div>
</template>

<script>
  import { selectmixin } from '@/assets/select.js'
  export default {
    name: 'selectPushRepairUnit',
    mixins: [selectmixin],
    data(){
      return{
        selectType:'0',
        pager: { // 分页数据
          total: 0, // 数据总条数
          pageSize: 10, // 单页数据条数
          pageIndex: 1, // 当前页码
          selectCount: 0 // 选中数据的条数
        },
        content:[],
        viewImg:'',
        viewImgShow:false,
        viewImgShow2:false,
        typeList:[],//有效日期
        startDateStr:'',//开始时间
        endDateStr:'',//结束时间
        timeShow:false,//自定义时间选择 显示隐藏
        dateShow:false,//时间组件 显示隐藏
        dateTypeList:{
          value: '', //默认为空
          list: [
            {showName:"本日", num: "0", code: "", img: ""},
            {showName:"昨日", num: "1", code: "", img: ""},
            {showName:"本周", num: "2", code: "", img: ""},
            {showName:"上周", num: "3", code: "", img: ""},
            {showName:"本月", num: "4", code: "", img: ""},
            {showName:"上月", num: "5", code: "", img: ""},
            {showName:"本季度", num: "6", code: "", img: ""},
            {showName:"上季度", num: "7", code: "", img: ""},
            {showName:"本年", num: "8", code: "", img: ""},
            // {showName:"上年", num: "9", code: "", img: ""},
            {showName:"选择时间", num: "9", code: "", img: ""},
          ]
        },
        dateType:'',
        sum:"0",
        sumexpend:"0",
        sumpending:"0",
        sumpending2:'0',
        sumpending3:'0',
        sumpendingmoney:"0"
      }
    },
    methods:{
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
            dateType:this.dateTypeList.value=='9'?'':this.dateTypeList.value,
            startDateStr:this.startDateStr,//开始时间
            endDateStr:this.endDateStr,//结束时间
          }
        }
        this.init({
          initValue: initValue,
          url:'/fix/fixCompany/getManager',
          data: params,
          all: (data) => {
            // 不管是不是初始化都需要执行的代码
            this.content = data.content
            this.sum = data.sum
            this.sumexpend = data.sumexpend
            this.sumpending = data.sumpending
            this.sumpending2 = data.sumpending2
            this.sumpending3 = data.sumpending3
            this.sumpendingmoney = data.sumpendingmoney
          },
          init: (data) => {
            this.typeList = data.typePsd.list
          }
        })
      },

    }
  }
</script>

<style scoped>

</style>
