<template>
  <div class="f_main f_main_customize mb16">
    <yhm-select-body :choose="isState">
      <template #operate>
        <div v-show="showTipDbSelect" class="s_db_select" :style="{left:getLeft,top:getTop}">双击选择</div>
        <yhm-managersearch :value="searchStr" id="searchStr" @call="initData"></yhm-managersearch>
      </template>

      <template #choose>
        <yhm-radiofilter :before="stateBefore" @initData="initChoose('state')" title="状态" all="0" :content="listState"></yhm-radiofilter>
      </template>

      <template #listHead>
        <yhm-managerth width="40" title="选择"></yhm-managerth>
        <yhm-managerth title="计划事件"></yhm-managerth>
        <yhm-managerth width="180" title="编号"></yhm-managerth>
        <yhm-managerth width="120" title="日期"></yhm-managerth>
        <yhm-managerth width="100" title="金额"></yhm-managerth>
        <yhm-managerth width="200" title="事由"></yhm-managerth>
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
          <yhm-manager-td :value="item.name"></yhm-manager-td>
          <yhm-manager-td :value="item.code"></yhm-manager-td>
          <yhm-manager-td-date :value="item.lastDate"></yhm-manager-td-date>
          <yhm-manager-td-money :value="item.money"></yhm-manager-td-money>
          <yhm-manager-td :value="item.cause"></yhm-manager-td>
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
    name: 'selectPaymentApplyDetail',
    mixins: [selectmixin],
    data() {
      return {
        categoryBefore: '0', // 单位按钮是否可以切换(0表示能切换,1表示不能切换)
        listCategory: { // 接受单位筛选数据
          value: '',
          list: []
        },
        prefixLetter: { // 定义字母默认选择值
          value: ''
        },
        isState: false,
        isHide: ''
      }
    },
    methods: {
      initChoose (op) {
        this.pager.pageIndex = 1
        if (op === 'category') {
          this.selectValue = []
        }
        this.initPageData(false)
      },

      initPageData(initValue){
        let params = {}
        if (initValue) {
          // 页面初始化是需要的参数
          params = {
            category: this.listCategory.value,
            state: this.state,
            otherUnitID: this.otherUnitID
          }
        } else {
          // 页面非初始化时需要的参数
          params = {
            category: this.listCategory.value,
          }
        }
        this.init({
          initValue: initValue,
          url: '/PersonOffice/getPaymentPlanDetailSelect',
          data: params,
          all: (data) => {
            // 不管是不是初始化都需要执行的代码
          },
          init: (data) => {

            // 初始化时需要执行的代码
            this.listCategory = data.listCategory
          }
        })
      },
    },
    created () {
      this.listCategory.value = this.getQueryParam('category')
      this.setQuery2Value('categoryBefore')
      this.setQuery2Value('state')
      this.setQuery2Value('otherUnitID')
      this.setQuery2Value('isHide')

      if(this.isHide === '1'){
        this.isState = false
      }
    }
  }
</script>

<style scoped>

</style>

