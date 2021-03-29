<template>
  <div class="f_main f_main_customize mb16">
    <yhm-select-body :choose="false">

      <template #operate>
        <div v-show="showTipDbSelect" class="s_db_select" :style="{left:getLeft,top:getTop}">双击选择</div>
        <yhm-managersearch :value="searchStr" id="searchStr" @call="initPageData"></yhm-managersearch>
      </template>

      <template #listHead>
        <yhm-managerth width="40" title="选择"></yhm-managerth>
        <yhm-managerth style="width: 80px" title="账单文件" ></yhm-managerth>
        <yhm-managerth style="width: 80px" title="账单月份" ></yhm-managerth>
        <yhm-managerth title="公司名称"></yhm-managerth>
        <yhm-managerth title="对账单开始日期"></yhm-managerth>
        <yhm-managerth title="对账单结束日期"></yhm-managerth>
        <yhm-managerth title="账单总金额"></yhm-managerth>
        <yhm-managerth title="剩余发票金额"></yhm-managerth>
      </template>
      <template #listBody>
        <tr v-for="(item,index) in content" :class="{InterlacBg:index%2!=0}"  :key="item.id" @click="selectEvent(item)" @dblclick="dblclickEvent(item)"
            @mousemove="mousemoveEvent" @mouseover="mouseoverEvent" @mouseout="mouseoutEvent">
          <yhm-manager-td-checkbox :no-click="false" :value="item"></yhm-manager-td-checkbox>
          <yhm-manager-td  value=" " @click="downloadEvent(item)">
            <img  style="margin: auto;" width="50" height="30" src="https://hp.yhm.hk/UploadFile/excel.jpg" alt="">
          </yhm-manager-td>

          <yhm-manager-td-center :value="item.monthsDate.slice(6,7)+'月'"></yhm-manager-td-center>
          <yhm-manager-td  :value="item.ownerName"></yhm-manager-td>
          <yhm-manager-td-date  :value="item.monthsDate"></yhm-manager-td-date>
          <yhm-manager-td-date  :value="item.endDate"></yhm-manager-td-date>

          <yhm-manager-td-money  :value="item.money"></yhm-manager-td-money>
          <yhm-manager-td-money  :value="item.invoiceMoney"></yhm-manager-td-money>
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
    name: 'selectInsuranceInvoice',
    mixins: [selectmixin],
    data(){
      return{
        unitID:'',
      }
    },
    methods: {
      downloadEvent(item){
        window.open('/UploadFile/' + item.tag + '/' + item.storeName)
      },
      initPageData(initValue){
        let params = {}
        if (initValue) {
          // 页面初始化是需要的参数
          params = {
            insuredUnit:this.unitID
          }
        } else {
          // 页面非初始化时需要的参数
          params = {
            insuredUnit:this.unitID
          }
        }
        this.init({
          initValue: initValue,
          url: '/Insurance/selectInsuranceInvoiceManager',
          data: params,
          all: (data) => {
            // 不管是不是初始化都需要执行的代码
          },
          init: (data) => {
            // 初始化时需要执行的代码


          }
        })
      }
    },
    created () {
      this.setQuery2Value('unitID')
    }
  }
</script>

<style scoped>

</style>
