<template>
  <div class="f_main f_main_customize mb16">
    <yhm-select-body>
      <template #operate>
        <div v-show="showTipDbSelect" class="s_db_select" :style="{left:getLeft,top:getTop}">双击选择</div>
        <!--<yhm-commonbutton value="添加" icon="btnAdd" @call="selectAddEvent()"></yhm-commonbutton>-->
        <yhm-managersearch :value="searchStr" id="searchStr" @call="initData"></yhm-managersearch>
      </template>
      <template #choose>
        <yhm-radiofilter :before="invoiceCategoryBefore" @initData="initChoose('invoiceCategory')" title="发票类型" :content="invoiceCategoryPsd"></yhm-radiofilter>
        <yhm-radiofilter @initData="initChoose('maxValue')" title="发票最大面值" :content="maxValuePsd"></yhm-radiofilter>
        <yhm-radiofilter :before="stateBefore"  @initData="initChoose('state')" title="发票状态" :content="statePsd"></yhm-radiofilter>
      </template>
      <template #listHead>
        <yhm-managerth width="40" title="选择"></yhm-managerth>
        <yhm-managerth title="发票类型"></yhm-managerth>
        <yhm-managerth width="120" title="开具最大面值"></yhm-managerth>
        <yhm-managerth width="150" title="发票号"></yhm-managerth>
        <yhm-managerth width="120" title="状态"></yhm-managerth>
      </template>
      <template #listBody>
        <tr v-for="(item,index) in content" :class="{InterlacBg:index%2!=0}"  :key="item.id" @click="selectEvent(item)" @dblclick="dblclickEvent(item)"
            @mousemove="mousemoveEvent" @mouseover="mouseoverEvent" @mouseout="mouseoutEvent">
          <yhm-manager-td-checkbox :no-click="false" :value="item"></yhm-manager-td-checkbox>
          <yhm-manager-td-psd :value="item.invoiceCategory" :list="invoiceCategoryList"></yhm-manager-td-psd>
          <yhm-manager-td-psd :value="item.maxValue" :list="maxValueList"></yhm-manager-td-psd>
          <yhm-manager-td :value="item.code" format="phone*"></yhm-manager-td>
          <yhm-manager-td-psd :value="item.state" :list="stateList"></yhm-manager-td-psd>
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
    name: 'selectInvoiceDetail',
    mixins: [selectmixin],
    data(){
      return{
        invoiceCategory:'',
        invoiceCategoryBefore:'',
        maxValue:'',
        state:'',
        stateBefore:'',
        searchStr:'',//模糊字段
        invoiceCategoryList:[],
        invoiceCategoryPsd:{//发票类型
          value: '',
          list: []
        },
        maxValueList:[],
        maxValuePsd:{//最大面值
          value: '',
          list: []
        },
        stateList:[],
        statePsd:{//发票状态
          value: '',
          list: []
        }
      }
    },
    methods: {
      // 筛选事件
      initChoose (op) {
        this.initPageData(false)
      },
      initPageData(initValue){
        let params = {}
        if (initValue) {
          // 页面初始化是需要的参数
          params = {
            invoiceCategory:this.invoiceCategory,//发票类型
            maxValue:this.maxValue,//最大面值
            state:this.state,//发票状态
          }
        } else {
          // 页面非初始化时需要的参数
          params = {
            invoiceCategory:this.invoiceCategoryPsd.value,//发票类型
            maxValue:this.maxValuePsd.value,//最大面值
            state:this.statePsd.value,//发票状态
          }
        }
        this.init({
          initValue: initValue,
          url: '/Bill/invoiceDetailSelect',
          data: params,
          all: (data) => {
            // 不管是不是初始化都需要执行的代码
          },
          init: (data) => {
            // 初始化时需要执行的代码
            this.statePsd=data.statePsd
            this.maxValuePsd=data.maxValuePsd
            this.invoiceCategoryPsd=data.invoiceCategoryPsd
            this.stateList=data.statePsd.list
            this.maxValueList=data.maxValuePsd.list
            this.invoiceCategoryList=data.invoiceCategoryPsd.list
          }
        })
      }
    },
    created () {
      this.setQuery2Value('invoiceCategory')
      this.setQuery2Value('invoiceCategoryBefore')
      this.setQuery2Value('maxValue')
      this.setQuery2Value('state')
      this.setQuery2Value('stateBefore')
    }
  }
</script>

<style scoped>

</style>
