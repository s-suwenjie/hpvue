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
        <yhm-managerth title="快递公司"  value="courierCompanyID"></yhm-managerth>
        <yhm-managerth title="寄件人"  value="senderPersonID"></yhm-managerth>
        <yhm-managerth title="经办人"  value="agentID"></yhm-managerth>
        <yhm-managerth title="收件人公司"  value="recipientUnitID"></yhm-managerth>
        <yhm-managerth title="收件人"  value="recipientPersonID"></yhm-managerth>
        <yhm-managerth title="文件类型"  value="receiptType"></yhm-managerth>

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
          <yhm-manager-td-psd :value="item.courierCompanyID" :list="courierCompanyList.list"></yhm-manager-td-psd>
          <yhm-manager-td :value="item.senderPersonID"></yhm-manager-td>
          <yhm-manager-td :value="item.agentID"></yhm-manager-td>
          <yhm-manager-td :value="item.recipientUnitID"></yhm-manager-td>
          <yhm-manager-td :value="item.recipientPersonID"></yhm-manager-td>
          <yhm-manager-td-psd :value="item.receiptType" :list="receiptTypeList.list"></yhm-manager-td-psd>

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
    name: 'selectDoes',
    mixins: [selectmixin],
    data(){
      return{
        courierCompanyList:{
          value:"",
          list:[]
        },
        receiptTypeList:{
          value:"",
          list:[]
        },
      }
    },
    methods:{
      initPageData(initValue){
        let params = {}
        if (initValue) {
          // 页面初始化是需要的参数
          params = {
            sendTime:this.sendTime,
            recipientUnitID:this.recipientUnitID,
            recipientPersonID:this.recipientPersonID
          }
        } else {
          // 页面非初始化时需要的参数
          params = {
            sendTime:this.sendTime,
            recipientUnitID:this.recipientUnitID,
            recipientPersonID:this.recipientPersonID
          }
        }
        this.init({
          initValue: initValue,
          url: '/dailyoffice/expressDelivery/getDoesManager',
          data: params,
          all: (data) => {
            // 不管是不是初始化都需要执行的代码

            this.courierCompanyList=data.courierCompanyIDPsd
            this.receiptTypeList=data.receiptTypePsd
            this.content=data.content
          },
          init: (data) => {
            // 初始化时需要执行的代码
          }
        })
      }
    },
    created () {
      this.setQuery2Value('sendTime')
      this.setQuery2Value('recipientUnitID')
      this.setQuery2Value('recipientPersonID')
    }
  }
</script>

<style scoped>

</style>
