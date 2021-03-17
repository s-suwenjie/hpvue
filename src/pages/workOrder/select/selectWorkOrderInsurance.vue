<template>
  <div class="f_main f_main_customize mb16">
    <yhm-select-body :choose="false" >

      <template #operate>
        <yhm-commonbutton value="添加" icon="btnAdd" :flicker="true" @call="add()"></yhm-commonbutton>

        <div v-show="showTipDbSelect" class="s_db_select" :style="{left:getLeft,top:getTop}">双击选择</div>
        <yhm-managersearch :value="searchStr" id="searchStr" @call="initData"></yhm-managersearch>
      </template>
      <template #listHead>
        <yhm-managerth-check v-if="selectType === '1'" is-select :check="allCheck" style="width: 40px;"></yhm-managerth-check>
        <yhm-managerth v-if="selectType === '0'" width="40" title="选择"></yhm-managerth>
        <yhm-managerth title="保险公司名称" ></yhm-managerth>
        <yhm-managerth title="简称" ></yhm-managerth>
      </template>
      <template #listBody>
        <tr v-for="(item,index) in content"
            :class="{InterlacBg:index%2!=0}"
            :key="item.id"
            @click="selectEvent(item)"
            @dblclick="dblclickEvent(item)"
            @mousemove="mousemoveEvent"
            @mouseover="mouseoverEvent"
            @mouseout="mouseoutEvent"
        >
          <yhm-manager-td-checkbox :value="item" :no-click="false"></yhm-manager-td-checkbox>
          <yhm-manager-td :value="item.showName"></yhm-manager-td>
          <yhm-manager-td :value="item.code"></yhm-manager-td>


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
    name: 'selectWorkOrderInsurance',
    mixins: [selectmixin],
    data(){
      return{
        selectType:'0',
        stateList:[],
        aid:'',//保险公司id
        pager: { // 分页数据
          total: 0, // 数据总条数
          pageSize: 10, // 单页数据条数
          pageIndex: 1, // 当前页码
          selectCount: 0 // 选中数据的条数
        }
      }
    },
    methods:{
      add(){
        this.$dialog.OpenWindow({
          width: 1050,
          height: 650,
          url:'/insuranceUnitForm?workOrder=1',
          title:'添加保险公司',
          closeCallBack:(data) =>{
            if (data) {
              console.log(data)
              this.aid = data
              this.initPageData(false)
            }
          }
        })
      },
      initPageData(initValue){
        let params = {}
        if (initValue) {
          // 页面初始化是需要的参数
          params = {
            aid:this.aid,
            pageSize:this.pager.pageSize
          }
        } else {
          // 页面非初始化时需要的参数
          params = {
            aid:this.aid,
            pageSize:this.pager.pageSize
          }
        }
        this.init({
          url: '/fix/fixreception/unitinitForm',
          data: params,
          all: (data) => {
            // 不管是不是初始化都需要执行的代码
            this.content = data.uint
            this.pager.total = data.uint2Count

          },
          init: (data) => {

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
