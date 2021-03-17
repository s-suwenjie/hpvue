<template>
  <div>
    <yhm-managerpage category="1">
      <!--导航条-->

      <template #navigationTab>
        <router-link class="menuTabDiv" v-for="(item,index) in details" :key="index" :class="{menuTabActive:menuTabOn == index}" :to="{path:item.path}" @click="menuTab(index)">
          {{item.name}}
        </router-link>
      </template>

      <!--操作区-->
      <template #operate>
        <yhm-commonbutton  value="添加" icon="btnAdd" :flicker="true" @call="add()"></yhm-commonbutton>
        <yhm-commonbutton  value="添加1" icon="btnAdd" :flicker="true" @call="add1()"></yhm-commonbutton>
        <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initData"></yhm-managersearch>
      </template>



      <!--数据表头-->
      <template #listHead>
        <yhm-managerth style="width: 38px;" title="选择"></yhm-managerth>
        <yhm-managerth style="width: 38px;" title="查看"></yhm-managerth>
        <yhm-managerth title="申请时间" ></yhm-managerth>
        <yhm-managerth title="物品领取时间" ></yhm-managerth>
        <yhm-managerth title="预计归还时间" ></yhm-managerth>
        <yhm-managerth title="物品内容"></yhm-managerth>
        <yhm-managerth title="用途"></yhm-managerth>
        <yhm-managerth  title="领取人" ></yhm-managerth>
        <yhm-managerth style="width: 120px;" title="审批状态"></yhm-managerth>
        <yhm-managerth style="width: 120px;" title="领取状态"></yhm-managerth>
        <yhm-managerth style="width: 120px;" title="操作"></yhm-managerth>
      </template>

      <!--数据明细-->
      <template #listBody>
        <tr :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]" v-for="(item,index) in content"
            :key="index">
          <yhm-manager-td-checkbox :value="item"></yhm-manager-td-checkbox>
          <yhm-manager-td-look @click="add(item.id)"></yhm-manager-td-look>
          <yhm-manager-td :value="item.otherUnit"></yhm-manager-td>
          <yhm-manager-td :value="item.otherUnit"></yhm-manager-td>
          <yhm-manager-td :value="item.otherUnit"></yhm-manager-td>
          <yhm-manager-td-date :value="item.lastDate"></yhm-manager-td-date>
          <yhm-manager-td-center :value="item.subject"></yhm-manager-td-center>
          <yhm-manager-td-money :value="item.money"></yhm-manager-td-money>
          <yhm-manager-td-center :value="item.code"></yhm-manager-td-center>
          <yhm-manager-td-center :value="item.code"></yhm-manager-td-center>
          <yhm-manager-td-operate >
            <yhm-manager-td-operate-button :no-click="item.state==0 || item.isAffirm == 0" @click="determineEvent(item.id)" value="确定" icon="i-btn-applicationSm" color="#49a9ea"></yhm-manager-td-operate-button>
          </yhm-manager-td-operate>
        </tr>
      </template>

      <!--数据空提示-->
      <template #empty>
        <span class="m_listNoData" v-show="empty">暂时没有数据</span>
      </template>
      <!--分页控件-->
      <template #pager>
        <yhm-pagination :pager="pager" @initData="initPageData(false)"></yhm-pagination>
      </template>
    </yhm-managerpage>
  </div>
</template>

<script>
  import { selectItem, managermixin } from '@/assets/manager.js'
  export default {
    name: 'myArticleRegistrationManager',
    mixins: [managermixin],
    data(){
      return{
        menuTabOn: 8,
        details:[
          {id:'1', name: '付款计划',path:'/home/myPaymentPlanManager'},
          {id:'2', name: '付款申请',path:'/home/myManager/paymentApplyManager'},
          {id:'3', name: '报销',path:'/home/myManager/reimbursementManager'},
          {id:'4', name: '采购计划',path:'/home/myPurchaseManager'},
          {id:'5', name: '备用金',path:'/home/prettyCashsManager'},
          {id:'6', name: '补签字',path:'/home/myManager/signatureManager'},
          {id:'7', name: '开票申请',path:'/home/openInvoiceManager'},
          {id:'8', name: '我的快递',path:'/home/myExpressManager'},
          {id:'9', name: '重要物品外出登记',path:'/home/myArticleRegistrationManager'},
        ],
      }
    },
    methods:{
      //添加
      add () {
        this.$dialog.OpenWindow({
          width: '1050',
          height: '550',
          url: '/myArticleRegistrationForm',
          title: '登记重要物品外出记录',
          closeCallBack: (data) => {
            if (data) {
              this.lastData = data
              this.initPageData(false)
            }

          }
        })
      },
      add1 () {
        this.$dialog.OpenWindow({
          width: '1050',
          height: '750',
          url: '/reimbursementLlimitForm',
          title: '信息',
          closeCallBack: (data) => {
            if (data) {
              this.lastData = data
              this.initPageData(false)
            }
          }
        })
      },
    },
    created () {
    }
  }
</script>

<style scoped>

</style>
