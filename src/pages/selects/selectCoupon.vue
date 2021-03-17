<template>
  <div class="f_main f_main_customize mb16">
    <yhm-select-body :choose="false">
      <template #operate>
        <div v-show="showTipDbSelect" class="s_db_select" :style="{left:getLeft,top:getTop}">双击选择</div>
        <yhm-managersearch :value="searchStr" id="searchStr" @call="initData"></yhm-managersearch>
      </template>

      <template #listHead>
        <yhm-managerth width="40" title="选择"></yhm-managerth>
        <yhm-managerth title="名称"></yhm-managerth>
        <yhm-managerth title="类型"></yhm-managerth>
        <yhm-managerth title="优惠券开始日期"></yhm-managerth>
        <yhm-managerth title="优惠券结束日期"></yhm-managerth>
        <yhm-managerth title="面值"></yhm-managerth>
        <yhm-managerth width="100" title="logo"></yhm-managerth>
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
          <yhm-manager-td-center :value="item.name"></yhm-manager-td-center>
          <yhm-manager-td-psd :value="item.category" :list="listCategory.list"></yhm-manager-td-psd>
          <yhm-manager-td-center :value="item.start"></yhm-manager-td-center>
          <yhm-manager-td-center :value="item.end"></yhm-manager-td-center>
          <yhm-manager-td-center :value="item.money"></yhm-manager-td-center>
          <yhm-manager-td-image :tip="true" left="-440" width="450" height="250" :value="item.url" tag="wxCoupon"></yhm-manager-td-image>


        </tr>
      </template>
      <template #empty>
        <span class="m_listNoData" v-show="content.length === 0">暂时没有数据</span>
      </template>
      <template #pager>
        <!--<yhm-pagination is-not-right :pager="pager" isPageSize="false" @initData="initPageData(false)"></yhm-pagination>-->
        <yhm-commonbutton style="    margin-left: 778px; margin-top: 10px;margin-bottom: 10px;" class="mr0" icon="i-complete" va  lue="确定" category="two" @call="selectConfirmEvent()"></yhm-commonbutton>
      </template>
    </yhm-select-body>
  </div>
</template>

<script>
  import { selectmixin } from '@/assets/select.js'
  export default {
    name: 'selectCoupon',
    mixins: [selectmixin],
    data(){
      return{
        code:'',
        category:'',
        selectType:'1',
        listCategory: {
          value: '',
          list: []
        },
        pager: { // 分页数据
          total: 0, // 数据总条数
          pageSize: 15, // 单页数据条数
          pageIndex: 1, // 当前页码
          selectCount: 0 // 选中数据的条数
        },
        content:[],
      }
    },
    methods: {
      initPageData(initValue){
        let params = {}
        if (initValue) {
          params = {
            code:this.code,
            category:this.category
          }
        } else {
          params = {
            code:this.code,
            category:this.category
          }
        }
        this.init({
          initValue: initValue,
          url: '/wx/wxCouponDetail/getSelect',
          data: params,
          all: (data) => {
            this.content=data.content.list

            // 不管是不是初始化都需要执行的代码
          },
          init:(data)=>{
            this.listCategory = data.content.categoryPsd

          }
        })
      }
    },
    created () {
      this.setQuery2Value('code')
      this.setQuery2Value('category')

    }
  }
</script>

<style scoped>

</style>
