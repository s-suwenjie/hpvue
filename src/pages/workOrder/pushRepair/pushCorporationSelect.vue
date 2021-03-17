<template>
  <div class="f_main f_main_customize mb16">
    <yhm-select-body :choose="false">
      <template #operate>
        <yhm-commonbutton value="添加"  icon="btnAdd" :flicker="true" @call="add" category="one"></yhm-commonbutton>

        <div v-show="showTipDbSelect" class="s_db_select" :style="{left:getLeft,top:getTop}">双击选择</div>
        <yhm-managersearch :value="searchStr" id="searchStr" @call="initData"></yhm-managersearch>
      </template>
      <template #listHead>
        <yhm-managerth style="width: 40px;" title="选择" ></yhm-managerth>
        <yhm-managerth title="单位名称"></yhm-managerth>
        <yhm-managerth width="150" title="自保费率" ></yhm-managerth>
        <yhm-managerth width="150" title="非自保费率" ></yhm-managerth>
        <yhm-managerth width="170" title="结算类型" ></yhm-managerth>
      </template>
      <template #listBody>
        <tr v-for="(item,index) in content" :class="{InterlacBg:index%2!=0}"  :key="item.id" @click="selectEvent(item)" @dblclick="dblclickEvent(item)"
            @mousemove="mousemoveEvent" @mouseover="mouseoverEvent" @mouseout="mouseoutEvent">
          <yhm-manager-td-checkbox :no-click="false" :value="item"></yhm-manager-td-checkbox>
          <yhm-manager-td :value="item.unit"></yhm-manager-td>
          <yhm-manager-td-center :value="item.selfrate==''?'-----':item.selfrate + '%'"></yhm-manager-td-center>
          <yhm-manager-td-center :value="item.noselfrate==''?'-----':item.noselfrate + '%'"></yhm-manager-td-center>
          <yhm-manager-td-center v-if="item.type==''" value="------"></yhm-manager-td-center>
          <yhm-manager-td-psd v-else :value="item.type" :list="typeList"></yhm-manager-td-psd>
        </tr>
      </template>
      <template #empty>
        <span class="m_listNoData" v-show="content.length === 0">暂时没有数据</span>
      </template>
      <template #pager>
        <yhm-pagination is-not-right :pager="pager" :is-page-size="false" @initData="initPageData(false)"></yhm-pagination>
        <yhm-commonbutton class="mr0" icon="i-complete" value="确定" category="two" @call="selectConfirmEvent()"></yhm-commonbutton>
      </template>
    </yhm-select-body>
  </div>
</template>

<script>
  import { selectmixin } from '@/assets/select.js'
  export default {
    name: 'pushCorporationSelect',
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
      add(){
        this.$dialog.OpenWindow({
          width: 1050,
          height: 720,
          url:'/pushRepairForm?isAdd=1',
          title:'添加推修公司',
          closeCallBack:(data)=>{
            this.initPageData()
          }
        })
      },
      initPageData (initValue) {
        this.setQuery2Value('id')
        let params = {}
        if (initValue) {
          // 页面初始化是需要的参数
          params = {
            pageIndex:this.pager.pageIndex,
            pageSize:this.pager.pageSize
          }
        } else {
          // 页面非初始化时需要的参数
          params = {
            pageIndex:this.pager.pageIndex,
            pageSize:this.pager.pageSize
          }
        }
        this.init({
          initValue: initValue,
          url:'/fix/fixCompany/getManager',
          data: params,
          all: (data) => {
            // 不管是不是初始化都需要执行的代码
            // this.content = data.content
          },
          init: (data) => {
            this.typeList = data.typePsd.list
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
