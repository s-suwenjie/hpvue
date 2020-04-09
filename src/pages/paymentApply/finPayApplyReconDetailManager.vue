<template>
    <div>
      <yhm-managerpage category="1" :total-table="true">

        <!--导航条-->

        <template #navigationTab>
          <a class="menuTabDiv" href="/Fin/_bankDetailManager?menuType=1">收支明细</a>
          <router-link class="menuTabDiv" :to="{path:'/home/viewManager/paymentPlanViewManager'}">付款计划</router-link>
          <router-link class="menuTabDiv menuTabActive" :to="{path:'/home/viewManager/paymentApplyViewManager'}">付款申请</router-link>
          <router-link class="menuTabDiv" :to="{path:'/home/viewManager/reimbursementViewManager'}">报销申请</router-link>
        </template>

        <template #navigationLft>
          <p @click="reconDetail">对账明细</p>
        </template>


        <!--操作区-->
        <template #operate>
          <yhm-commonbutton value="添加" icon="btnAdd" :flicker="true" @call="add()"></yhm-commonbutton>
          <yhm-commonbutton :value="choose?'收起筛选':'展开筛选'" :icon="choose?'btnUp':'btnDown'" @call="switchChoose()"></yhm-commonbutton>
          <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initData"></yhm-managersearch>
        </template>

        <!--数据表头-->
        <template #listHead>
          <yhm-managerth style="width: 38px" title="选择"></yhm-managerth>
          <yhm-managerth style="width: 38px" title="查看"></yhm-managerth>
          <yhm-managerth style="width: 120px" title="入库日期"></yhm-managerth>
          <yhm-managerth style="width: 200px" title="入库单号"></yhm-managerth>
          <yhm-managerth style="width: 100px" title="配件编号"></yhm-managerth>
          <yhm-managerth style="width: 80px" title="配件名称"></yhm-managerth>
          <yhm-managerth style="width: 100px" title="数量"></yhm-managerth>
          <yhm-managerth style="width: 100px" title="去税单价"></yhm-managerth>
          <yhm-managerth style="width: 100px" title="含税单价"></yhm-managerth>
          <yhm-managerth style="width: 100px" title="去税金额"></yhm-managerth>
          <yhm-managerth style="width: 100px" title="含税金额"></yhm-managerth>
        </template>

        <!--数据明细-->
        <template #listBody>
          <tr :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]" v-for="(item,index) in 10"
              :key="index">
            <yhm-manager-td-checkbox :value="item"></yhm-manager-td-checkbox>
            <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>
            <yhm-manager-td-date value="xx"></yhm-manager-td-date>
            <yhm-manager-td :value="item.xxx"></yhm-manager-td>
            <yhm-manager-td :value="item.xxx"></yhm-manager-td>
            <yhm-manager-td :value="item.xxx"></yhm-manager-td>
            <yhm-manager-td :value="item.xxx"></yhm-manager-td>

            <yhm-manager-td-money :value="item.xxx"></yhm-manager-td-money>
            <yhm-manager-td-money :value="item.xxx"></yhm-manager-td-money>
            <yhm-manager-td-money :value="item.xxx"></yhm-manager-td-money>
            <yhm-manager-td-money :value="item.xxx"></yhm-manager-td-money>

          </tr>
        </template>
      </yhm-managerpage>
    </div>
</template>

<script>
  import { managermixin } from '@/assets/manager.js'
  export default {
    name: 'finPayApplyReconDetailManager',
    mixins: [ managermixin ],
    data(){
      return{

      }
    },
    methods: {
      add(){

      },
      reconDetail(){

      },
      listView(){

      },
    },
    created () {

    }
  }
</script>

<style scoped>

</style>
