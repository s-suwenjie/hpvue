<template>
  <div class="f_main f_main_customize mb16">
    <yhm-select-body>
      <template #operate>
        <div v-show="showTipDbSelect" class="s_db_select" :style="{left:getLeft,top:getTop}">双击选择</div>
        <yhm-commonbutton value="添加" icon="btnAdd" @call="selectAddEvent()"></yhm-commonbutton>
        <yhm-managersearch :value="searchStr" id="searchStr" @call="initData"></yhm-managersearch>
      </template>

      <template #choose>
        <yhm-radiofilter :before="categoryBefore" @initData="initChoose('category')" title="优惠券类型" all="0" :content="listCategory"></yhm-radiofilter>
      </template>

      <template #listHead>
        <yhm-managerth width="40" title="选择"></yhm-managerth>
        <yhm-managerth title="名称"></yhm-managerth>
        <yhm-managerth width="100" title="类型"></yhm-managerth>
        <yhm-managerth width="100" title="面值"></yhm-managerth>
        <yhm-managerth width="100" title="有效期"></yhm-managerth>
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
          <yhm-manager-td :value="item.name"></yhm-manager-td>
          <yhm-manager-td-psd :value="item.category" :list="listCategory.list"></yhm-manager-td-psd>
          <yhm-manager-td-money :value="item.money"></yhm-manager-td-money>
          <yhm-manager-td-psd :befotr-value="item.expiration" :value="item.expirationCategory" :list="listExpirationCategory.list"></yhm-manager-td-psd>
          <yhm-manager-td-image :tip="true" left="-440" width="450" height="250" :value="item.url" tag="wxCoupon"></yhm-manager-td-image>
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
    name: 'selectWxCoupon',
    mixins: [selectmixin],
    data() {
      return {
        categoryBefore: '0', // 单位按钮是否可以切换(0表示能切换,1表示不能切换)
        showCategory:'',
        listCategory: { // 接受单位筛选数据
          value: '1',
          list: []
        },
        listExpirationCategory:{
          value:"",
          list:[]
        },
      }
    },
    methods: {
      selectAddEvent () {
        this.$dialog.alert({
          tipValue:'此功能暂未开放！！！',
          alertImg:'warn'
        })
      },
      initChoose (op) {
        this.pager.pageIndex = 1
        if (op === 'category') {
          this.selectValue = []
        }
        this.initPageData()
      },
      initPageData(initValue){
        let params = {}
        if (initValue) {
          // 页面初始化是需要的参数
          params = {
            category: this.listCategory.value,
            showCategory:this.showCategory
          }
        } else {
          // 页面非初始化时需要的参数
          params = {
            category: this.listCategory.value,
            showCategory:this.showCategory
          }
        }
        this.init({
          initValue: initValue,
          url: '/wx/wxCoupon/getSelect',
          data: params,
          all: (data) => {
            // 不管是不是初始化都需要执行的代码
          },
          init: (data) => {
            // 初始化时需要执行的代码
            this.listCategory = data.categoryPsd
            this.listExpirationCategory = data.expirationCategoryPsd
          }
        })
      }
    },
    created () {
      this.setQuery2Value('showCategory')
    }
  }
</script>

<style scoped>

</style>
