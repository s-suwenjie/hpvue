<template>
  <div class="f_main f_main_customize mb16">
    <yhm-select-body>
      <template #operate>
        <div v-show="showTipDbSelect" class="s_db_select" :style="{left:getLeft,top:getTop}">双击选择</div>
        <yhm-managersearch :value="searchStr" id="searchStr" @call="initData"></yhm-managersearch>
      </template>
      <template #choose>
        <yhm-radiofilter  @initData="initChoose('category')" title="开票类型" :content="categoryPsd"></yhm-radiofilter>
        <yhm-radiofilter  @initData="initChoose('purchaserType')" title="购买方类型" :content="purchaserTypePsd"></yhm-radiofilter>
        <yhm-radiofilter  @initData="initChoose('isReceivables')" title="款项状态" :content="isReceivablesPsd"></yhm-radiofilter>
        <yhm-radiofilter :before="invoiceCategoryBefore"  @initData="initChoose('invoiceCategory')" title="发票类型" :content="invoiceCategoryPsd"></yhm-radiofilter>
      </template>
      <template #listHead>
        <yhm-managerth width="40" title="选择"></yhm-managerth>
        <yhm-managerth width="80" title="申请人"></yhm-managerth>
        <yhm-managerth width="110" title="申请时间"></yhm-managerth>
        <yhm-managerth width="90" title="开票金额"></yhm-managerth>
        <yhm-managerth width="100" title="开票类型"></yhm-managerth>
        <yhm-managerth width="120" title="发票类型"></yhm-managerth>
        <yhm-managerth width="90" title="抬头类型"></yhm-managerth>
        <yhm-managerth title="发票抬头"></yhm-managerth>
        <yhm-managerth width="90" title="款项状态"></yhm-managerth>
      </template>
      <template #listBody>
        <tr v-for="(item,index) in content" :class="{InterlacBg:index%2!=0}"  :key="item.id" @click="selectEvent(item)" @dblclick="dblclickEvent(item)"
            @mousemove="mousemoveEvent" @mouseover="mouseoverEvent" @mouseout="mouseoutEvent">
          <yhm-manager-td-checkbox :no-click="false" :value="item"></yhm-manager-td-checkbox>
          <yhm-manager-td :value="item.person"></yhm-manager-td>
          <yhm-manager-td-date :value="item.applyDate"></yhm-manager-td-date>
          <yhm-manager-td-money :value="item.invoiceMoney"></yhm-manager-td-money>
          <yhm-manager-td-psd  :value="item.category" :list="categoryList"></yhm-manager-td-psd>
          <yhm-manager-td-psd :value="item.invoiceCategory" :list="invoiceCategoryList"></yhm-manager-td-psd>
          <yhm-manager-td-psd :value="item.purchaserType" :list="purchaserTypeList"></yhm-manager-td-psd>
          <yhm-manager-td :value="item.purchaser"></yhm-manager-td>
          <yhm-manager-td-psd :value="item.isReceivables" :list="isReceivablesList"></yhm-manager-td-psd>
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
    name: 'selectOpenInvoice',
    mixins: [selectmixin],
    data(){
      return{
        isReceivablesList:[],
        isReceivables:'',
        isReceivablesPsd: {
          value: '',
          list: []
        },
        categoryList:[],
        category:'',
        categoryPsd: {
          value: '',
          list: []
        },
        purchaserTypeList:[],
        purchaserType:'',
        purchaserTypePsd: {
          value: '',
          list: []
        },
        invoiceCategoryBefore:'',
        invoiceCategoryList:[],
        invoiceCategory:'',
        invoiceCategoryPsd: {
          value: '',
          list: []
        },
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
          }
        } else {
          // 页面非初始化时需要的参数
          params = {
            invoiceCategory:this.invoiceCategoryPsd.value,//发票类型
          }
        }
        this.init({
          initValue: initValue,
          url: '/Bill/openInvoiceSelect',
          data: params,
          all: (data) => {
            // 不管是不是初始化都需要执行的代码
          },
          init: (data) => {
            // 初始化时需要执行的代码
            this.invoiceCategoryPsd=data.invoiceCategoryPsd
            this.invoiceCategoryList=data.invoiceCategoryPsd.list

            this.purchaserTypePsd=data.purchaserTypePsd
            this.purchaserTypeList=data.purchaserTypePsd.list

            this.categoryPsd=data.categoryPsd
            this.categoryList=data.categoryPsd.list

            this.isReceivablesPsd=data.isReceivablesPsd
            this.isReceivablesList=data.isReceivablesPsd.list
          }
        })
      }
    },
    created () {
      this.setQuery2Value('invoiceCategory')
      this.setQuery2Value('invoiceCategoryBefore')
      this.setQuery2Value('isReceivables')
      this.setQuery2Value('category')
      this.setQuery2Value('purchaserType')
    }
  }
</script>

<style scoped>

</style>
