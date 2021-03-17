<template>
  <div class="f_main f_main_customize mb16">
    <yhm-select-body>
      <template #navigation>基本信息</template>
      <template #operate>
        <div v-show="showTipDbSelect" class="s_db_select" :style="{left:getLeft,top:getTop}">双击选择</div>
        <yhm-commonbutton value="添加" :flicker="true" icon="btnAdd" @call="selectAddEvent()"></yhm-commonbutton>
        <yhm-managersearch :value="searchStr" id="searchStr" @call="initPageData(false)"></yhm-managersearch>
      </template>
      <template #choose>
        <yhm-radiofilter  @initData="initChoose('companyCategory')" title="纳税规模" :content="companyCategoryPsd"></yhm-radiofilter>
        <yhm-radiofilter  @initData="initChoose('category')" title="开票类型" :content="categoryPsd"></yhm-radiofilter>
      </template>
      <template #listHead><!--数据表头-->
        <yhm-managerth width="40" title="选择"></yhm-managerth>
        <yhm-managerth width="240" title="单位名称"></yhm-managerth>
        <yhm-managerth width="140" title="纳税号"></yhm-managerth>
        <yhm-managerth width="90" title="纳税规模"></yhm-managerth>
        <yhm-managerth width="260" title="开票类型"></yhm-managerth>
        <yhm-managerth title="开户行"></yhm-managerth>
        <yhm-managerth width="150" title="账号"></yhm-managerth>
      </template>
      <template #listBody><!--数据表格-->
        <tr v-for="(item,index) in content" :class="{InterlacBg:index%2!=0}"  :key="item.id" @click="selectEvent(item)" @dblclick="dblclickEvent(item)"
            @mousemove="mousemoveEvent" @mouseover="mouseoverEvent" @mouseout="mouseoutEvent">
          <yhm-manager-td-checkbox :no-click="false" :value="item"></yhm-manager-td-checkbox>
          <yhm-manager-td :tip="true" node-class-name="f_main f_main_customize mb16" :value="item.unit"></yhm-manager-td>
          <yhm-manager-td :value="item.taxNumber"></yhm-manager-td>
          <yhm-manager-td-psd :value="item.companyCategory" :list="companyCategoryPsd.list"></yhm-manager-td-psd>
          <yhm-manager-td-psd :value="item.category" :list="categoryPsd.list"></yhm-manager-td-psd>
          <yhm-manager-td :tip="true" node-class-name="f_main f_main_customize mb16" :value="item.bank"></yhm-manager-td>
          <yhm-manager-td :tip="true" node-class-name="f_main f_main_customize mb16" :value="item.account"></yhm-manager-td>
        </tr>
      </template>
      <template #empty>
        <span class="m_listNoData" v-show="content.length == 0">暂时没有数据</span>
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
    name: 'selectTax',
    mixins: [selectmixin],
    data() {
      return {
        companyCategoryPsd:{},
        categoryPsd:{},
        companyCategory:'',
        category:'',
      }
    },
    created () {
      this.setQuery2Value('category')
      this.setQuery2Value('companyCategory')
    },
    methods:{
      selectAddEvent () {
        this.$dialog.OpenWindow({
          width: 1050,
          height: 820,
          url:'/taxFrom',
          title:'添加税号信息',
          closeCallBack:(data) =>{
            if(data){
              this.initPageData(false)
            }
          }
        })
      },
      initChoose (op) {
        this.initPageData(false)
      },
      initPageData(initValue){
        let params = {}
        if (initValue) {
          // 页面初始化是需要的参数
          params = {
            category:this.category,
            companyCategory:this.companyCategory,
          }
        } else {
          // 页面非初始化时需要的参数
          params = {
            category:this.categoryPsd.value,
            companyCategory:this.companyCategoryPsd.value,
          }
        }
        this.init({
          initValue: initValue,
          url: '/finance/tax/select',
          data: params,
          all: (data) => {
            // 不管是不是初始化都需要执行的代码

          },
          init: (data) => {
            // 初始化时需要执行的代码
            this.companyCategoryPsd=data.companyCategoryPsd
            this.categoryPsd=data.categoryPsd
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
