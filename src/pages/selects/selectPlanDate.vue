<template>
  <div class="f_main f_main_customize mb16">
    <yhm-select-body :choose-bg="false">

      <template #listHead>
        <yhm-managerth width="38" title="查看"></yhm-managerth>
        <yhm-managerth width="400" title="事件描述"></yhm-managerth>
        <yhm-managerth width="140" title="最迟日期"></yhm-managerth>
        <yhm-managerth width="140" title="付款金额"></yhm-managerth>
        <yhm-managerth title="编号"></yhm-managerth>

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
          <yhm-manager-td-look @click="listView(item.id)"></yhm-manager-td-look>
          <yhm-manager-td :value="item.name"></yhm-manager-td>
          <yhm-manager-td-date :value="item.lastDate"></yhm-manager-td-date>
          <yhm-manager-td-money :value="item.money"></yhm-manager-td-money>
          <yhm-manager-td :value="item.code"></yhm-manager-td>
        </tr>
      </template>

      <template #empty>
        <span class="m_listNoData" v-show="empty">暂时没有数据</span>
      </template>
    </yhm-select-body>
  </div>
</template>
<script>

  import { selectmixin } from '@/assets/select.js'
  export default {
    name: 'selectPlanDate',
    mixins: [selectmixin],
    data() {
      return {
        categoryBefore: '0', // 单位按钮是否可以切换(0表示能切换,1表示不能切换)
        dateAndTime: '',
        empty: true
      }
    },
    methods: {
      listView (id) {
        this.$dialog.OpenWindow({
          width: 1050,
          height: 640,
          url: '/myPaymentPlanDetailForm?id=' + id,
          title: '查看事件信息',
          closeCallBack: (data) => {
          }
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
            dateAndTime: this.dateAndTime
          }
        } else {
          // 页面非初始化时需要的参数
          params = {
            dateAndTime: this.dateAndTime
          }
        }
        this.init({
          initValue: initValue,
          url: '/PersonOffice/getDateTimeManagerData',
          data: params,
          all: (data) => {
            // 不管是不是初始化都需要执行的代码
            this.content = data
            if(this.content){
              this.empty = false
            }
          },
          init: (data) => {

            // 初始化时需要执行的代码

          }
        })
      },
    },
    created () {
      this.setQuery2Value('categoryBefore')
      this.setQuery2Value('dateAndTime')
    }
  }
</script>

<style scoped >

</style>

