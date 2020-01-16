<template>
  <div class="f_main f_main_customize mb16">
    <yhm-select-body :choose="false">
      <template #operate>
        <div v-show="showTipDbSelect" class="s_db_select" :style="{left:getLeft,top:getTop}">双击选择</div>
        <yhm-commonbutton value="添加" icon="btnAdd" @call="selectAddEvent()"></yhm-commonbutton>
        <yhm-managersearch :value="searchStr" id="searchStr" @call="initData"></yhm-managersearch>
      </template>

      <template #listHead>
        <yhm-managerth width="40" title="选择"></yhm-managerth>
        <yhm-managerth width="40" title="查看"></yhm-managerth>
        <yhm-managerth title="发票所属单位"></yhm-managerth>
        <yhm-managerth title="发票代码"></yhm-managerth>
        <yhm-managerth title="发票号码"></yhm-managerth>
        <yhm-managerth title="开票日期"></yhm-managerth>
        <yhm-managerth title="发票金额"></yhm-managerth>
        <yhm-managerth title="开票单位"></yhm-managerth>
        <yhm-managerth title="标签"></yhm-managerth>
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
          <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>
          <yhm-manager-td :value="item.selfName"></yhm-manager-td>
          <yhm-manager-td :value="item.code"></yhm-manager-td>
          <yhm-manager-td :value="item.num"></yhm-manager-td>
          <yhm-manager-td-date :value="item.openDate"></yhm-manager-td-date>
          <yhm-manager-td-money :value="item.totalMoney"></yhm-manager-td-money>
          <yhm-manager-td :value="item.otherName"></yhm-manager-td>
          <yhm-manager-td :value="item.tag"></yhm-manager-td>
        </tr>
      </template>

      <template #empty>
        <span class="m_listNoData" v-show="content.length === 0">暂时没有数据</span>
      </template>
      <template #pager>
        <yhm-pagination :pager="pager" isPageSize="false" @initData="initPageData(false)"></yhm-pagination>
        <yhm-commonbutton class="mr0" icon="i-complete" value="确定" category="two" @call="selectConfirmEvent()"></yhm-commonbutton>
      </template>

    </yhm-select-body>
  </div>
</template>
<script>

  import { selectmixin } from '@/assets/select.js'
  export default {
    name: 'selectElectronicInvoice',
    mixins: [selectmixin],
    data() {
      return {
        relevanceID:'',
        relevanceType:'',
        state: ''
      }
    },
    methods: {
      listView(item){
        this.$dialog.OpenWindow({
          width: 1050,
          height: 740,
          url:'/myElectronicInvoiceForm?id=' + item.id,
          title: '查看电子发票',
          closeCallBack: (data)=>{

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
      selectAddEvent () {
        this.$dialog.OpenWindow({
          width: '1050',
          height: '740',
          url: '/myElectronicInvoiceForm',
          title: '添加电子发票信息',
          closeCallBack: (data)=>{
            this.searchStr = data
            this.initPageData(false)
          }
        })
      },
      initPageData(initValue){
        let params = {}
        if (initValue) {
          // 页面初始化是需要的参数
          params = {
            // category: this.listCategory.value,
            state: this.state,
            relevanceID: this.relevanceID,
            relevanceType: this.relevanceType
          }
        } else {
          // 页面非初始化时需要的参数
          params = {
            // category: this.listCategory.value,
          }
        }
        this.init({
          initValue: initValue,
          url: '/Fin/getElectronicInvoiceSelect',
          data: params,
          all: (data) => {
            // 不管是不是初始化都需要执行的代码
          },
          init: (data) => {
            // 初始化时需要执行的代码
            // this.listCategory = data.listCategory
          }
        })
      },
    },
    created () {
      this.setQuery2Value('relevanceID')
      this.setQuery2Value('relevanceType')
      this.setQuery2Value('state')
    }
  }
</script>

<style scoped>

</style>

