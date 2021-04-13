<template>
  <div class="f_main f_main_customize mb16">
    <yhm-select-body :choose="false">
      <template #operate>
        <div v-show="showTipDbSelect" class="s_db_select" :style="{left:getLeft,top:getTop}">双击选择</div>
        <!--<yhm-commonbutton  value="添加" icon="btnAdd" @call="selectAddEvent"></yhm-commonbutton>-->
        <yhm-managersearch :value="searchStr" id="searchStr" @call="initData"></yhm-managersearch>
      </template>

      <template #listHead>
        <yhm-managerth width="40" title="选择"></yhm-managerth>
        <yhm-managerth title="合同名字" ></yhm-managerth>
        <yhm-managerth title="负责人" ></yhm-managerth>
        <yhm-managerth title="所属客户" ></yhm-managerth>
        <yhm-managerth title="合同格式" ></yhm-managerth>
        <yhm-managerth title="签署类型" ></yhm-managerth>
        <yhm-managerth title="合同状态"></yhm-managerth>
        <!--<yhm-managerth title="合同所属类型"></yhm-managerth>-->
        <yhm-managerth title="合同收付款"></yhm-managerth>
        <yhm-managerth title="累计" subtitle="已付金额"></yhm-managerth>
        <yhm-managerth title="总金额"></yhm-managerth>
        <yhm-managerth title="已开票金额"></yhm-managerth>
        <yhm-managerth title="剩余开票金额"></yhm-managerth>

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
          <yhm-manager-td :value="item.name"></yhm-manager-td>
          <yhm-manager-td :value="item.chargePerson"></yhm-manager-td>
          <yhm-manager-td :value="item.customers"></yhm-manager-td>
          <yhm-manager-td-psd :value="item.format" :list="listFormat.list"></yhm-manager-td-psd>
          <yhm-manager-td-psd :value="item.signatureType" :list="listSignatureType.list"></yhm-manager-td-psd>
          <yhm-manager-td-psd :value="item.state" :list="listState.list"></yhm-manager-td-psd>
          <!--<yhm-manager-td-psd :value="item.type" :list="listType.list"></yhm-manager-td-psd>-->
          <yhm-manager-td-psd :value="item.paymentItems" :list="listPaymentItems.list"></yhm-manager-td-psd>
          <yhm-manager-td-money :value="item.paidMoney"></yhm-manager-td-money>
          <yhm-manager-td-money :value="item.totalMoney"></yhm-manager-td-money>
          <yhm-manager-td-money :value="item.invoicedAmount"></yhm-manager-td-money>
          <yhm-manager-td-money :value="item.remainingAmount"></yhm-manager-td-money>
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
    name: 'selectContract',
    mixins: [selectmixin],
    data(){
      return{
        listState:{
          value:"",
          list:[]
        },
        listSignatureType:{
          value:"",
          list:[]
        },
        listType:{
          value:"",
          list:[]
        },
        listPaymentItems:{
          value:"",
          list:[]
        },
        listFormat:{
          value:"",
          list:[]
        },
        paymentItems: '',
        applyopenInvoice:'',
        customersID:'',
      }
    },
    methods: {

      initPageData(initValue){
        let params = {}
        if (initValue) {
          // 页面初始化是需要的参数
          params = {
            paymentItems:this.paymentItems,
            applyopenInvoice:this.applyopenInvoice,
            customersID:this.customersID,
          }
        } else {
          // 页面非初始化时需要的参数
          params = {
            paymentItems:this.paymentItems,
            applyopenInvoice:this.applyopenInvoice,
            customersID:this.customersID
          }
        }
        this.init({
          initValue: initValue,
          url: '/dailyoffice/contractSign/selectManager',
          data: params,
          all: (data) => {
            // 不管是不是初始化都需要执行的代码
          },
          init: (data) => {
            // 初始化时需要执行的代码
            this.listSignatureType=data.signatureTypePsd
            this.listState=data.statePsd
            // this.listType=data.typePsd
            this.listPaymentItems=data.paymentItemsPsd
            this.listFormat=data.formatPsd
          }
        })
      }
    },
    created () {
      this.setQuery2Value('paymentItems')
      this.setQuery2Value('applyopenInvoice')
      this.setQuery2Value('customersID')

    }
  }
</script>

<style scoped>

</style>



