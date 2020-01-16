<template>
  <div class="f_main f_main_customize mb16">
    <yhm-select-body>
      <template #operate>
        <div v-show="showTipDbSelect" class="s_db_select" :style="{left:getLeft,top:getTop}">双击选择</div>
        <yhm-managersearch :value="searchStr" id="searchStr" @call="initData"></yhm-managersearch>
      </template>
      <template #choose>
        <yhm-radiofilter :before="categoryBefore" @initData="initChoose('category')" title="支票类型" :content="categoryPsd"></yhm-radiofilter>
        <yhm-radiofilter :before="stateBefore"  @initData="initChoose('state')" title="支票状态" :content="statePsd"></yhm-radiofilter>
      </template>
      <template #listHead>
        <yhm-managerth width="40" title="选择"></yhm-managerth>
        <yhm-managerth width="300" title="所属银行"></yhm-managerth>
        <yhm-managerth title="支票类型"></yhm-managerth>
        <yhm-managerth width="150" title="支票号码"></yhm-managerth>
        <yhm-managerth width="120" title="状态"></yhm-managerth>
      </template>
      <template #listBody>
        <tr v-for="(item,index) in content" :class="{InterlacBg:index%2!=0}"  :key="item.id" @click="selectEvent(item)" @dblclick="dblclickEvent(item)"
            @mousemove="mousemoveEvent" @mouseover="mouseoverEvent" @mouseout="mouseoutEvent">
          <yhm-manager-td-checkbox :no-click="false" :value="item"></yhm-manager-td-checkbox>
          <yhm-manager-td-logo :value="item.bankName" :logo="item.bankLogo" tag="BankLogo" :center="true"></yhm-manager-td-logo>
          <yhm-manager-td-psd :value="item.category" :list="categoryList"></yhm-manager-td-psd>
          <yhm-manager-td :value="item.code" format="phone*"></yhm-manager-td>
          <yhm-manager-td-psd :value="item.state" :list="stateList"></yhm-manager-td-psd>
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
    name: 'selectChecksDetail',
    mixins: [selectmixin],
    data(){
      return{
        categoryBefore:'0',
        categoryList:[],
        categoryPsd:{//发票类型
          value: '',
          list: []
        },
        stateBefore:'0',
        stateList:[],
        statePsd:{//发票状态
          value: '',
          list: []
        }
      }
    },
    created(){
      this.setQuery2Value('category')
      this.setQuery2Value('categoryBefore')
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
          // 页面初始化是需要的参数
          params = {
            category:this.category,//发票类型
            state:this.state,//发票状态
          }
        } else {
          // 页面非初始化时需要的参数
          params = {
            category:this.categoryPsd.value,//发票类型
            state:this.statePsd.value,//发票状态
          }
        }
        this.init({
          initValue: initValue,
          url: '/Bill/selectChecksDetail',
          data: params,
          all: (data) => {
            // 不管是不是初始化都需要执行的代码
          },
          init: (data) => {
            // 初始化时需要执行的代码
            this.statePsd=data.statePsd
            this.stateList=data.statePsd.list
            this.categoryPsd=data.categoryPsd
            this.categoryList=data.categoryPsd.list
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
