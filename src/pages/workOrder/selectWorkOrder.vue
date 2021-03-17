<template>
  <div class="f_main f_main_customize mb16">
    <yhm-select-body :choose="false">
      <template #operate>
        <div v-show="showTipDbSelect" class="s_db_select" :style="{left:getLeft,top:getTop}">双击选择</div>
        <yhm-managersearch :value="searchStr" id="searchStr" @call="initData"></yhm-managersearch>
      </template>
      <template #listHead>
        <yhm-managerth width="40" title="选择"></yhm-managerth>
        <yhm-managerth width="110" title="接待日期"></yhm-managerth>
        <yhm-managerth width="70" title="接待人"></yhm-managerth>
        <yhm-managerth title="付款账号"></yhm-managerth>
        <yhm-managerth width="65" title="工单分类"></yhm-managerth>
        <yhm-managerth width="75" title="作业分类"></yhm-managerth>
        <yhm-managerth width="80" title="车牌号"></yhm-managerth>
        <yhm-managerth width="70" title="联系人"></yhm-managerth>
<!--        <yhm-managerth width="90" title="联系人手机号"></yhm-managerth>-->
        <yhm-managerth width="95" title="开票金额"></yhm-managerth>
        <yhm-managerth width="95" title="剩余开票金额"></yhm-managerth>
      </template>
      <template #listBody>
        <tr v-for="(item,index) in content" :class="{InterlacBg:index%2!=0}"  :key="item.id" @click="selectEvent(item)" @dblclick="dblclickEvent(item)"
            @mousemove="mousemoveEvent" @mouseover="mouseoverEvent" @mouseout="mouseoutEvent">
          <yhm-manager-td-checkbox :no-click="false" :value="item"></yhm-manager-td-checkbox>
          <yhm-manager-td-date :value="item.workDate"></yhm-manager-td-date>
          <yhm-manager-td-center :value="item.principal"></yhm-manager-td-center>

          <yhm-manager-td-center :value="item.payment"></yhm-manager-td-center>

          <yhm-manager-td-psd :value="item.category" :list="categoryList"></yhm-manager-td-psd>
          <yhm-manager-td-psd  v-if="item.jobtype!='null'" :value="item.jobtype" :list="jobtypeList"></yhm-manager-td-psd>
          <yhm-manager-td-center v-else value="-----"></yhm-manager-td-center>
          <yhm-manager-td-center :value="item.vehicle"></yhm-manager-td-center>
          <yhm-manager-td-center :value="item.contactPerson"></yhm-manager-td-center>
<!--          <yhm-manager-td-center :value="item.phone" format="phone*"></yhm-manager-td-center>-->
          <yhm-manager-td-money :value="item.totalMoney" style="color: #fd6802;"></yhm-manager-td-money>
          <yhm-manager-td-money :value="item.finresult" style="color: #008f8d;"></yhm-manager-td-money>
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
    name: 'selectWorkOrder',
    mixins: [selectmixin],
    data(){
      return{
        jobtypeList:[],//作业分类
        categoryList:[],//维修类型
        pager: {
          total: 0, // 总条数
          pageSize: 15, // 每页条数
          pageIndex: 1, // 当前页码
          selectCount: 0 // 选中条数
        }
      }
    },
    methods: {
      initPageData(initValue){
        let params = {}
        if (initValue) {
          // 页面初始化是需要的参数
          params = {
            isIds:'1',//特殊字段
            isOpen:'0',
            paymentid:this.paymentid,
            pageSize:this.pager.pageSize
          }
        } else {
          // 页面非初始化时需要的参数
          params = {
            isIds:'1',//特殊字段
            isOpen:'0',
            paymentid:this.paymentid,
            pageSize:this.pager.pageSize
          }
        }
        this.init({
          initValue: initValue,
          url: '/fix/Offer/getManager',
          data: params,
          all: (data) => {
            // 不管是不是初始化都需要执行的代码
            this.content = data.content

          },
          init: (data) => {
            // 初始化时需要执行的代码
            this.jobtypeList = data.jobtypePsd.list
            this.categoryList = data.categoryPsd.list

          }
        })
      }
    },
    created () {
      this.setQuery2Value('paymentid')
    }
  }
</script>

<style scoped>

</style>
