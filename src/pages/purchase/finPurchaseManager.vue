<template>
    <div>
      <yhm-managerpage category="1">
        <!--导航条-->
        <template #navigationTab>
          <a class="menuTabDiv" href="/Fin/_bankDetailManager?menuType=1">收支明细</a>
          <router-link class="menuTabDiv" :to="{path:'/home/viewManager/paymentPlanViewManager'}">付款计划</router-link>
          <router-link class="menuTabDiv" :to="{path:'/home/viewManager/paymentApplyViewManager'}">付款申请</router-link>
          <router-link class="menuTabDiv" :to="{path:'/home/viewManager/reimbursementViewManager'}">报销申请</router-link>
          <router-link class="menuTabDiv" :to="{path:'/home/viewManager/finReimbursementDetailManager?type=1'}">特殊报销</router-link>
          <router-link class="menuTabDiv" :to="{path:'/home/viewManager/finPrettyCashsManagerAll'}">备用金</router-link>
          <router-link class="menuTabDiv" :to="{path:'/home/bankDetailRenewalManager'}">支付续保费</router-link>
          <router-link class="menuTabDiv" :to="{path:'/home/BankDetailRebateManager'}">支付客户返利</router-link>
          <router-link class="menuTabDiv menuTabActive" :to="{path:'/home/finPurchaseManager'}">采购计划</router-link>
          <router-link class="menuTabDiv" :to="{path:'/home/finBillingManager'}">保险保单</router-link>

        </template>
        <!--操作区-->
        <template #operate>
          <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initPageData"></yhm-managersearch>
          <yhm-radiofilter :before="isFinishBefore" @initData="initChoose('isFinish')" title="状态"  :content="isFinishList"></yhm-radiofilter>
        </template>

        <!--筛选区-->
        <template #choose>
          <div v-show="choose" class="buttonBody mptZero">
          </div>
        </template>

        <!--数据表头-->
        <template #listHead>
          <yhm-managerth style="width: 40px;" title="选择"></yhm-managerth>
          <yhm-managerth style="width: 40px;" title="查看"></yhm-managerth>
          <yhm-managerth style="width: 160px" title="申请日期" value="workDate"></yhm-managerth>
          <yhm-managerth style="width: 160px" title="采购分类" value="categoryPurchase"></yhm-managerth>
          <yhm-managerth style="width: 160px;" title="采购类型" value="model"></yhm-managerth>
          <yhm-managerth style="width: 160px" title="预计使用日期" value="lastDate"></yhm-managerth>
          <yhm-managerth style="width: 260px;" title="编号" value="code"></yhm-managerth>
          <yhm-managerth style="width: 160px" title="预计金额" value="money"></yhm-managerth>
          <yhm-managerth style="width: 60px;" title="审批留言"></yhm-managerth>
          <yhm-managerth style="width: 100px" title="状态" value="state"></yhm-managerth>
        </template>
        <template #listBody>
          <tr :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]" v-for="(item,index) in content" :key="index">
            <yhm-manager-td-checkbox :value="item"></yhm-manager-td-checkbox>
            <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>
            <yhm-manager-td-date :value="item.workDate"></yhm-manager-td-date>
            <yhm-manager-td-psd :list="categoryPurchaseItems" :value="item.categoryPurchase"></yhm-manager-td-psd>
            <yhm-manager-td-psd :list="modelItems" :value="item.model"></yhm-manager-td-psd>
            <yhm-manager-td-date :value="item.lastDate"></yhm-manager-td-date>
            <yhm-manager-td-center :value="item.code"></yhm-manager-td-center>
            <yhm-manager-td-money :value="item.money"></yhm-manager-td-money>
            <yhm-manager-td-leaveword @iconClick="SelectApprovalMessage(item)" :leave-word-show="item.approvalMessage === '1'?true:false"></yhm-manager-td-leaveword>
            <yhm-manager-td-psd :is-left="true" :list="stateItems" fsb="fs20b" :value="item.state"></yhm-manager-td-psd>
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
  import { managermixin } from '@/assets/manager.js'
  export default {
    name: 'finPurchaseManager',
    mixins: [managermixin],
    data(){
      return{
        isFinishBefore: '0', // 默认选择状态为可以选择，1为不可以选择
        isFinishList: {
          value: '',
          list: []
        },
        categoryPurchaseItems:[],//采购分类
        modelItems:[],//采购类型
        stateItems:[], //审批状态
        menuTabOn: 3,
      }
    },
    methods:{
      SelectApprovalMessage(item){
        this.$dialog.OpenWindow({
          width: '650',
          height: '300',
          title: '查看审批留言信息',
          url:'/approvalMessage?id='+item.id,
          closeCallBack: (data)=>{
            if(data){
            }
          }
        })
      },
      listView(item){

          this.$dialog.OpenWindow({
            width: 1050,
            height: 720,
            url:'/myPurchaseView?btnType=1&id=' + item.id,
            title:'查看采购信息'
          })
      },

      initPageData (initValue) {
        let params = {}
        if (initValue) {
          // 页面初始化是需要的参数
          params = {
            isFinish: this.isFinishList.value
          }
        } else {
          // 页面非初始化时需要的参数
          params = {
            isFinish: this.isFinishList.value
          }
        }
        this.init({
          initValue: initValue,
          url: '/PersonOffice/getShoppingListManager',
          data: params,
          all: (data) => {
            // 不管是不是初始化都需要执行的代码

          },
          init: (data) => {
            // 初始化时需要执行的代码
            // 这边初始化筛选信息
            this.isFinishList = data.isFinishPsd
            this.categoryPurchaseItems = data.categoryPurchaseItems
            this.modelItems = data.modelItems
            this.stateItems = data.stateItems
          }
        })
      },
    }
  }
</script>

<style scoped>

</style>
