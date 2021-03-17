<template>
  <div class="f_main f_main_customize mb16">
    <yhm-select-body :choose="false">
      <template #operate>
        <div v-show="showTipDbSelect" class="s_db_select" :style="{left:getLeft,top:getTop}">双击选择</div>
        <yhm-managersearch :value="searchStr" id="searchStr" @call="initData"></yhm-managersearch>
      </template>
      <template #listHead>
        <yhm-managerth style="width: 40px;" title="选择" ></yhm-managerth>
        <yhm-managerth title="推修公司"></yhm-managerth>
        <yhm-managerth width="135" title="联系人" ></yhm-managerth>
        <yhm-managerth width="135" title="车牌号" ></yhm-managerth>
        <yhm-managerth width="170" title="车架号" ></yhm-managerth>
      </template>
      <template #listBody>
        <tr v-for="(item,index) in content" :class="{InterlacBg:index%2!=0}"  :key="item.id" @click="selectEvent(item)" @dblclick="dblclickEvent(item)"
            @mousemove="mousemoveEvent" @mouseover="mouseoverEvent" @mouseout="mouseoutEvent">
          <yhm-manager-td-checkbox :no-click="false" :value="item"></yhm-manager-td-checkbox>
          <yhm-manager-td-center :value="item.companyName"></yhm-manager-td-center>
          <yhm-manager-td-center :value="item.personName"></yhm-manager-td-center>
          <yhm-manager-td-center :value="item.plate"></yhm-manager-td-center>
          <yhm-manager-td-center :value="item.frameNumber"></yhm-manager-td-center>
        </tr>
      </template>
      <template #empty>
        <span class="m_listNoData" v-show="content.length === 0">暂时没有数据</span>
      </template>
      <template #pager>
        <yhm-pagination is-not-right :pager="pager" :isPageSize="false" @initData="initPageData(false)"></yhm-pagination>
        <yhm-commonbutton class="mr0" icon="i-complete" value="确定" category="two" @call="selectConfirmEvent()"></yhm-commonbutton>
      </template>
    </yhm-select-body>
  </div>
</template>

<script>
  import { selectmixin } from '@/assets/select.js'
  export default {
    name: 'pushRepairSelect',
    mixins: [selectmixin],
    data(){
      return{
        typeList:[],//结算类型
        pager: {
          total: 0, // 总条数
          pageSize: 10, // 每页条数
          pageIndex: 1, // 当前页码
          selectCount: 0 // 选中条数
        }
      }
    },
    methods: {
      initPageData (initValue) {
        this.setQuery2Value('id')
        let params = {}
        if (initValue) {
          // 页面初始化是需要的参数
          params = {
            init:true,
            carID:this.id,
            state:'1'//查询0为所有未完善的工单推修记录  为1查询已完善  为2已结账
          }
        } else {
          // 页面非初始化时需要的参数
          params = {
            carID:this.id,
            state:'1'
          }
        }
        this.init({
          initValue: initValue,
          url:'/fix/fixCompanyOrder/getManager',
          data: params,
          all: (data) => {
            // 不管是不是初始化都需要执行的代码
            // this.content = data.content
          },
          init: (data) => {
            // this.typeList = data.typePsd.list
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
