<template>
  <div class="f_main f_main_customize mb16">
    <yhm-select-body>
      <template #operate>
        <div v-show="showTipDbSelect" class="s_db_select" :style="{left:getLeft,top:getTop}">双击选择</div>
        <yhm-managersearch :value="searchStr" id="searchStr" @call="initData"></yhm-managersearch>
      </template>
      <template #choose>
        <yhm-radiofilter  @initData="initChoose('openInvoiceType')" title="开票金额类型" :content="openInvoiceTypeList"></yhm-radiofilter>
      </template>
      <template #listHead>
        <yhm-managerth width="40" title="选择"></yhm-managerth>
        <yhm-managerth title="收入来源"></yhm-managerth>
        <yhm-managerth width="80" title="业务员"></yhm-managerth>
        <yhm-managerth width="120" title="回款日期"></yhm-managerth>
        <yhm-managerth width="110" title="工单号"></yhm-managerth>
        <yhm-managerth width="80" title="客户"></yhm-managerth>
        <yhm-managerth width="90" title="车牌号"></yhm-managerth>
        <yhm-managerth width="120" title="金额"></yhm-managerth>
        <yhm-managerth width="120" title="剩余开票金额"></yhm-managerth>
      </template>
      <template #listBody>
        <tr v-for="(item,index) in content" :class="{InterlacBg:index%2!=0}"  :key="item.id" @click="selectEvent(item)" @dblclick="dblclickEvent(item)"
            @mousemove="mousemoveEvent" @mouseover="mouseoverEvent" @mouseout="mouseoutEvent">
          <yhm-manager-td-checkbox :no-click="false" :value="item"></yhm-manager-td-checkbox>
          <yhm-manager-td :value="item.otherName"></yhm-manager-td>
          <yhm-manager-td :value="item.operator"></yhm-manager-td>
          <yhm-manager-td-date :value="item.moneyBackDate"></yhm-manager-td-date>
          <yhm-manager-td :value="item.workOrder"></yhm-manager-td>
          <yhm-manager-td :value="item.customer"></yhm-manager-td>
          <yhm-manager-td :value="item.licensePlateNumber"></yhm-manager-td>
          <yhm-manager-td-money :value="item.money"></yhm-manager-td-money>
          <yhm-manager-td-money :value="item.balanceInvoice"></yhm-manager-td-money>
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
    name: 'selectBankDetailInsurance',
    mixins: [selectmixin],
    data(){
      return{
        workOrderID:'',
        unitID:'',
        licensePlateNumber:'',
        openInvoiceType:'',
        openInvoiceTypeList:{
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
            unitID:this.unitID,//发票类型
            licensePlateNumber:this.licensePlateNumber,
            workOrder:this.workOrder,
          }
        } else {
          // 页面非初始化时需要的参数
          params = {
            unitID:this.unitID,
            licensePlateNumber:this.licensePlateNumber,
            openInvoiceType:this.openInvoiceTypeList.value,
            workOrder:this.workOrder,
          }
        }
        this.init({
          initValue: initValue,
          url: '/Fin/bankDetailInsuranceSelect',
          data: params,
          all: (data) => {
            // 不管是不是初始化都需要执行的代码
          },
          init: (data) => {
            // 初始化时需要执行的代码
            this.openInvoiceTypeList = data.openInvoiceMoneyList

          }
        })
      }
    },
    created () {
      this.setQuery2Value('unitID')
      this.setQuery2Value('workOrder')
      this.setQuery2Value('licensePlateNumber')
    }
  }
</script>

<style scoped>

</style>
