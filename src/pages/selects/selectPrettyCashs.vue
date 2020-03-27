<template>
  <div class="f_main f_main_customize mb16">
    <yhm-select-body>
      <template #operate>
        <div v-show="showTipDbSelect" class="s_db_select" :style="{left:getLeft,top:getTop}">双击选择</div>
        <yhm-managersearch :value="searchStr" id="searchStr" @call="initData"></yhm-managersearch>
      </template>
      <template #choose>
        <yhm-radiofilter @initData="initChoose('isTravel')" title="业务相关" :content="isTravelPsd"></yhm-radiofilter>
        <yhm-radiofilter @initData="initChoose('invoiceCategory')" title="发票类型" :content="invoiceCategoryPsd"></yhm-radiofilter>
      </template>
      <template #listHead>
        <yhm-managerth width="40" title="选择"></yhm-managerth>
        <yhm-managerth width="110" title="申请日期"></yhm-managerth>
        <yhm-managerth width="150" title="金额"></yhm-managerth>
        <yhm-managerth width="150" title="业务相关"></yhm-managerth>
        <yhm-managerth width="100" title="发票类型"></yhm-managerth>
        <yhm-managerth title="事由"></yhm-managerth>
        <yhm-managerth width="120" title="预计返还/核销日期"></yhm-managerth>
      </template>
      <template #listBody>
        <tr v-for="(item,index) in content" :class="{InterlacBg:index%2!=0}"  :key="item.id" @click="selectEvent(item)" @dblclick="dblclickEvent(item)"
            @mousemove="mousemoveEvent" @mouseover="mouseoverEvent" @mouseout="mouseoutEvent">
          <yhm-manager-td-checkbox :no-click="false" :value="item"></yhm-manager-td-checkbox>
          <yhm-manager-td-date :value="item.workDate"></yhm-manager-td-date>
          <yhm-manager-td-money :value="item.money" :center="true"></yhm-manager-td-money>
          <yhm-manager-td-psd :value="item.isTravel" :list="isTravelList"></yhm-manager-td-psd>
          <yhm-manager-td-psd :value="item.invoiceCategory" :list="invoiceCategoryList"></yhm-manager-td-psd>


          <yhm-manager-td :value="item.subject"></yhm-manager-td>
          <yhm-manager-td-date :value="item.estimateDate"></yhm-manager-td-date>
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
    name: 'selectPrettyCashs',
    mixins: [selectmixin],
    data(){
      return{
        isTravelList:[],
        invoiceCategoryList:[],
        isTravelPsd:{//发票类型
          value: '',
          list: [],
        },
        invoiceCategoryPsd:{
          value: '',
          list: [],
        }
      }
    },
    created(){
      this.setQuery2Value('category')
      this.setQuery2Value('state')
      this.setQuery2Value('stateBefore')
    },
    methods:{
// 筛选事件
      initChoose (op) {
        this.initPageData(false)
      },
      initPageData(initValue){
        let params = {}
        if (initValue) {

        } else {
          // 页面非初始化时需要的参数
          params = {
            isTravel:this.isTravelPsd.value,//
            invoiceCategory: this.invoiceCategoryPsd.value
          }
        }
        this.init({
          initValue: initValue,
          url: '/PersonOffice/prettyCashsManagerSelect',
          data: params,
          all: (data) => {
            // 不管是不是初始化都需要执行的代码
          },
          init: (data) => {
            // 初始化时需要执行的代码
            this.isTravelPsd=data.isTravelPsd
            this.isTravelList=data.isTravelPsd.list
            this.invoiceCategoryPsd = data.invoiceCategoryPsd
            this.invoiceCategoryList = data.invoiceCategoryPsd.list
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
