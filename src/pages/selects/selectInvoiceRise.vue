<template>
  <div class="f_main f_main_customize mb16 main">
    <yhm-select-body>
      <template #operate>
        <div v-show="showTipDbSelect" class="s_db_select" :style="{left:getLeft,top:getTop}">双击选择</div>
<!--        <yhm-commonbutton value="添加" icon="btnAdd" @call="selectAddEvent()"></yhm-commonbutton>-->
        <yhm-managersearch :value="searchStr" id="searchStr" @call="initData"></yhm-managersearch>
      </template>
      <template #choose>
        <yhm-radiofilter @initData="initChoose('invoiceType')" title="发票类型" :content="invoiceTypePsd" all="1"></yhm-radiofilter>
        <yhm-radiofilter @initData="initChoose('state')" title="发票状态" :content="statePsd" all="0"></yhm-radiofilter>
      </template>
      <template #listHead>
        <yhm-managerth width="40" title="选择"></yhm-managerth>
        <yhm-managerth width="130" title="主公司"></yhm-managerth>
        <yhm-managerth width="130" title="关联公司"></yhm-managerth>
        <yhm-managerth width="90" title="关联公司税号"></yhm-managerth>
        <yhm-managerth width="130" title="关联公司开户行"></yhm-managerth>
        <yhm-managerth width="120" title="关联公司账号"></yhm-managerth>
        <yhm-managerth title="发票类型"></yhm-managerth>
        <yhm-managerth width="100" title="状态"></yhm-managerth>
      </template>
      <template #listBody>
        <tr v-for="(item,index) in content" :class="{InterlacBg:index%2!=0}"  :key="item.id" @click="selectEvent(item)" @dblclick="dblclickEvent(item)"
            @mousemove="mousemoveEvent" @mouseover="mouseoverEvent" @mouseout="mouseoutEvent">
          <yhm-manager-td-checkbox :no-click="false" :value="item"></yhm-manager-td-checkbox>
          <yhm-manager-td node-class-name="f_main f_main_customize mb16 main" :tip="true" :value="item.unit"></yhm-manager-td>
          <yhm-manager-td node-class-name="f_main f_main_customize mb16 main" :tip="true" :value="item.otherUnit"></yhm-manager-td>
          <yhm-manager-td node-class-name="f_main f_main_customize mb16 main" :tip="true" :value="item.otherTaxNumber"></yhm-manager-td>
          <yhm-manager-td node-class-name="f_main f_main_customize mb16 main" :tip="true" :value="item.otherBank"></yhm-manager-td>
          <yhm-manager-td node-class-name="f_main f_main_customize mb16 main" :tip="true" :value="item.otherAccount"></yhm-manager-td>
          <yhm-manager-td-psd :value="item.invoiceType" :list="invoiceTypePsd.list"></yhm-manager-td-psd>
          <yhm-manager-td-psd :value="item.state" :list="approvalStatePsd.list"></yhm-manager-td-psd>
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
    name: 'SelectInvoiceRise',
    mixins: [selectmixin],
    data() {
      return {
        unitID:'',
        statePsd:{},
        invoiceTypePsd:{},
        approvalStatePsd:{},
        content:'',
        invoiceTypeBefore:'',
        stateBefore:'',
        state:'0',
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
            state:this.state,//发票状态
            unitID:this.unitID,
          }
        } else {
          // 页面非初始化时需要的参数
          params = {
            invoiceType:this.invoiceTypePsd.value,//发票类型
            state:this.statePsd.value,//发票状态
            unitID:this.unitID,
          }
        }
        this.init({
          initValue: initValue,
          url: '/finance/invoiceRise/getSelect',
          data: params,
          all: (data) => {
            // 不管是不是初始化都需要执行的代码
          },
          init: (data) => {
            // 初始化时需要执行的代码
            this.statePsd=data.statePsd
            this.invoiceTypePsd=data.invoiceTypePsd
            this.approvalStatePsd=data.approvalStatePsd
          }
        })
      }
    },
    created () {
      this.setQuery2Value('invoiceType')
      this.setQuery2Value('unitID')
      this.setQuery2Value('state')
    }
  }
</script>

<style scoped>

</style>
