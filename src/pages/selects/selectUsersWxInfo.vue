<template>
  <div class="f_main f_main_customize mb16">
    <yhm-select-body :choose-bg="false">
      <template #listHead>
        <yhm-managerth width="38" title="选择"></yhm-managerth>
        <yhm-managerth width="80" title="姓名"></yhm-managerth>
        <yhm-managerth width="140" title="电话"></yhm-managerth>
        <yhm-managerth width="140" title="邮箱"></yhm-managerth>
        <yhm-managerth title="部门"></yhm-managerth>
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
          <yhm-manager-td-center :value="item.phone" format="phone*"></yhm-manager-td-center>
          <yhm-manager-td :value="item.email"></yhm-manager-td>
          <yhm-manager-td :value="item.remark"></yhm-manager-td>
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
    name: 'selectUsersWxInfo',
    mixins: [selectmixin],
    data() {
      return {
        categoryBefore: '0', // 单位按钮是否可以切换(0表示能切换,1表示不能切换)
      }
    },
    methods: {

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

          }
        } else {
          // 页面非初始化时需要的参数
          params = {

          }
        }
        this.init({
          initValue: initValue,
          url: '/SysManager/getUsersWxInfoSelect',
          data: params,
          all: (data) => {
            // 不管是不是初始化都需要执行的代码
          },
          init: (data) => {


          }
        })
      },
    },
    created () {
      this.listCategory.value = this.getQueryParam('category')
      this.setQuery2Value('categoryBefore')
    }
  }
</script>

<style scoped>

</style>

