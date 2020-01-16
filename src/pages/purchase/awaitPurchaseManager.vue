<template>
  <div>
    <yhm-managerpage category="1">
      <!--导航条-->
      <template #navigationTab>
        <router-link class="menuTabDiv menuTabActive" :to="{path:'/home/awaitPurchaseManager'}">待采购信息</router-link>
      </template>

      <!--操作区-->
      <template #operate>
        <yhm-commonbutton :value="choose?'收起筛选':'展开筛选'" :icon="choose?'btnUp':'btnDown'" @call="switchChoose()"></yhm-commonbutton>
        <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initData"></yhm-managersearch>
      </template>

      <!--筛选区-->
      <template #choose>
        <div v-show="choose" class="buttonBody mptZero">
          <yhm-radiofilter :before="isFinishBefore" @initData="initChoose('isFinish')" title="状态" all="0" :content="isFinishList"></yhm-radiofilter>
        </div>
      </template>

      <!--数据表头-->
      <template #listHead>
        <yhm-managerth style="width: 40px;" title="选择"></yhm-managerth>
        <yhm-managerth style="width: 40px;" title="查看"></yhm-managerth>
        <yhm-managerth style="width: 90px" title="申请人员" value="workDate"></yhm-managerth>
        <yhm-managerth style="width: 120px" title="申请日期" value="workDate"></yhm-managerth>
        <yhm-managerth style="width: 80px" title="采购分类" value="categoryPurchase"></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="采购类型" value="model"></yhm-managerth>
        <yhm-managerth style="width: 120px" title="预计使用日期" value="lastDate"></yhm-managerth>
        <yhm-managerth style="width: 210px;" title="编号" value="code"></yhm-managerth>
        <yhm-managerth style="width: 100px" title="预计金额" value="workDate"></yhm-managerth>
        <yhm-managerth style="width: 120px" title="操作"></yhm-managerth>
      </template>
      <template #listBody>
        <tr :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]" v-for="(item,index) in content" :key="index">
          <yhm-manager-td-checkbox :value="item"></yhm-manager-td-checkbox>
          <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>
          <yhm-manager-td :value="item.person"></yhm-manager-td>
          <yhm-manager-td-date :value="item.workDate"></yhm-manager-td-date>
          <yhm-manager-td-psd :list="categoryPurchaseItems" :value="item.categoryPurchase"></yhm-manager-td-psd>
          <yhm-manager-td-psd :list="modelItems" :value="item.model"></yhm-manager-td-psd>
          <yhm-manager-td-date :value="item.lastDate"></yhm-manager-td-date>
          <yhm-manager-td-center :value="item.code"></yhm-manager-td-center>
          <yhm-manager-td-money :value="item.money"></yhm-manager-td-money>
          <yhm-manager-td-operate>

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
  import { managermixin } from '@/assets/manager.js'
  export default {
    name: 'awaitPurchaseManager',
    mixins: [managermixin],
    data(){
      return{
        isFinishBefore: '0', // 默认选择状态为可以选择，1为不可以选择
        isFinishList: {
          value: '1',
          list: []
        },
        paymentNum:'',
        payPlanNum:'',
        reimburseNum:'',
        purchaseNum:'',
        categoryPurchaseItems:[],//采购分类
        modelItems:[],//采购类型
        stateItems:[] //审批状态
      }
    },
    methods:{

      //初始化页面数据
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
          url: '/PersonOffice/getAwaitPurchaseManager',
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
      //打开查看
      listView(item){
        this.$dialog.OpenWindow({
          width: 1050,
          height: 550,
          url:'/awaitPurchaseView?id=' + item.id,
          title:'查看待采购信息',
          closeCallBack:(data) =>{
            if (data) {
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
