<template>
  <div class="f_main f_main_customize mb16">
    <yhm-select-body :choose="false">
      <template #operate>
        <div v-show="showTipDbSelect" class="s_db_select" :style="{left:getLeft,top:getTop}">双击选择</div>
        <yhm-managersearch :value="searchStr" id="searchStr" @call="initData"></yhm-managersearch>
      </template>

      <template #listHead>
        <yhm-managerth width="40" title="选择"></yhm-managerth>
<!--        <yhm-managerth width="110" title="接待日期"></yhm-managerth>-->
<!--        <yhm-managerth width="74" title="接待人"></yhm-managerth>-->
        <yhm-managerth width="150" title="工单号"></yhm-managerth>
        <yhm-managerth width="80" title="维修类型"></yhm-managerth>
        <yhm-managerth width="80" title="车牌号"></yhm-managerth>
        <yhm-managerth width="90" title="品牌"></yhm-managerth>
        <yhm-managerth width="70" title="车主"></yhm-managerth>
        <yhm-managerth width="70" title="送修人"></yhm-managerth>
        <yhm-managerth width="70" title="保险公司"></yhm-managerth>
<!--        <yhm-managerth width="100" title="计划收入金额"></yhm-managerth>-->
<!--        <yhm-managerth width="100" title="项目金额"></yhm-managerth>-->
<!--        <yhm-managerth width="100" title="材料金额"></yhm-managerth>-->
        <yhm-managerth width="100" title="合计金额"></yhm-managerth>
      </template>
      <template #listBody>
        <tr v-for="(item,index) in content"
            :class="{InterlacBg:index%2!=0}"
            :key="item.id"
            @click="selectEvent(item)"
            @dblclick="dblclickEvent(item)"
            @mousemove="mousemoveEvent"
            @mouseover="mouseoverEvent"
            @mouseout="mouseoutEvent">

          <yhm-manager-td-checkbox :no-click="false" :value="item"></yhm-manager-td-checkbox>
<!--          <yhm-manager-td-date   :value="item.workDate"></yhm-manager-td-date>-->
<!--          <yhm-manager-td-center :value="item.client"></yhm-manager-td-center>-->
          <yhm-manager-td-center :value="item.code"></yhm-manager-td-center>
          <yhm-manager-td-psd    :value="item.category" :list="categoryList"></yhm-manager-td-psd>
          <yhm-manager-td-center :value="item.vehicle"></yhm-manager-td-center>

          <yhm-manager-td-center v-if="item.applicableModels==''" value="-----"></yhm-manager-td-center>
          <yhm-manager-td-psd    v-else :value="item.applicableModels" :list="applicableModelsList"></yhm-manager-td-psd>

          <yhm-manager-td  :value="item.carOwner"></yhm-manager-td>
          <yhm-manager-td :value="item.contactPerson"></yhm-manager-td>

          <yhm-manager-td-center v-if="item.subid==''||item.subid==null" value="-----" color="#9a8478"></yhm-manager-td-center>
          <yhm-manager-td-psd v-else :value="item.subid" :list="subList"></yhm-manager-td-psd>

          <!--          <yhm-manager-td-psd  v-else :value="item.sub" :list="subList"></yhm-manager-td-psd>-->

<!--          <yhm-manager-td-money  style="color:#0012FB" :value="item.incomePlan==-1?'0':item.incomePlan"></yhm-manager-td-money>-->
<!--          <yhm-manager-td-money  style="color:#008f8d" :value="item.productMoney==-1?'0':item.productMoney"></yhm-manager-td-money>-->
<!--          <yhm-manager-td-money  style="color:#2193b0" :value="item.mailMoney==-1?'0':item.mailMoney"></yhm-manager-td-money>-->
          <yhm-manager-td-money  style="color:#fd6802" :value="item.expend==-1?'0':item.expend"></yhm-manager-td-money>

        </tr>
      </template>
      <template #empty>
        <span class="m_listNoData" v-show="content.length === 0">暂时没有数据</span>
      </template>
      <template #pager>
        <yhm-pagination is-not-right :pager="pager" isPageSize="false" @initData="initPageData(false)"></yhm-pagination>
        <yhm-commonbutton class="mr0" icon="i-complete" value="确定" category="two" @call="selectConfirmEvent()"></yhm-commonbutton>
      </template>
    </yhm-select-body>
  </div>
</template>

<script>
  import { selectmixin } from '@/assets/select.js'
  export default {
    name: 'selectOfficialWorkOrder',
    mixins: [selectmixin],
    data(){
      return{
        list:[],
        fileList:[],
        stateList:[],//状态
        statePsd:[],//筛选 状态
        categoryList:[],//维修类型
        categoryPsd:[],//筛选 维修类型
        applicableModelsList:[],//品牌
        applicableModelsPsd:[],//筛选 品牌
        subList:[],//保险公司
        subPsd:{},//筛选 保险公司
        pager: { // 分页数据
          total: 0, // 数据总条数
          pageSize: 15, // 单页数据条数
          pageIndex: 1, // 当前页码
          selectCount: 0 // 选中数据的条数
        }
      }
    },
    methods: {
      initPageData(initValue){
        let params = {}
        if (initValue) {
          params = {
            stateStr:this.stateStr
          }
        } else {
          params = {
            stateStr:this.stateStr,
            subid:this.subPsd.value,
            state:this.statePsd.value,
            category:this.categoryPsd.value,
            applicableModels:this.applicableModelsPsd.value
          }
        }
        this.init({
          initValue: initValue,
          url: '/fix/fixOrder/getManager',
          data: params,
          all: (data) => {
            // 不管是不是初始化都需要执行的代码
          },
          init:(data)=>{
            let mapList = data.mapList.concat()
            this.subPsd = {
              list:mapList,
              value:''
            }
            this.subList = mapList
            for(let i in mapList){
              mapList[i].img = ''
            }
            this.categoryList = data.categoryPsd.list
            this.categoryPsd = data.categoryPsd
            this.stateList = data.statePsd.list
            this.statePsd = data.statePsd
            this.applicableModelsList = data.applicableModelsPsd.list
            this.applicableModelsPsd = data.applicableModelsPsd

            //初始化时需要执行的代码
            // 这边初始化筛选信息

          }
        })
      }
    },
    created () {
      this.setQuery2Value('stateStr')
    }
  }
</script>

<style scoped>

</style>
