<template>
  <div class="f_main">
    <yhm-view-body>
      <template #title>基本信息</template>
      <template #body>
        <yhm-view-control title="经办人" :content="person"></yhm-view-control>
        <yhm-view-control type="date" title="入库日期" :content="workDate"></yhm-view-control>
        <yhm-view-control title="入库编号" :content="code"></yhm-view-control>
        <yhm-view-control title="供应商" :content="unit"></yhm-view-control>
        <yhm-view-control title="总金额" :content="money" type="money" color="#FF0000"></yhm-view-control>
        <yhm-view-control title="备注" :content="remark"></yhm-view-control>
      </template>
    </yhm-view-body>

    <div class="f_split"></div>

    <yhm-view-tab>
      <template #tab>
        <yhm-view-tab-button :list="tabState" :index="0">入库明细</yhm-view-tab-button>
      </template>
      <template #content>
        <yhm-view-tab-list :customize="true" :pager="false" v-show="tabState[0].select">
          <template #listHead>
            <yhm-managerth style="width: 50px" title="序号"></yhm-managerth>
            <yhm-managerth style="width: 180px" title="商品名称"></yhm-managerth>
            <yhm-managerth style="width: 200px" title="型号"></yhm-managerth>
            <yhm-managerth style="width: 90px" title="数量"></yhm-managerth>
            <yhm-managerth style="width: 60px" title="单位"></yhm-managerth>
            <yhm-managerth style="width: 90px" title="单价"></yhm-managerth>
            <yhm-managerth style="width: 90px" title="总额"></yhm-managerth>
            <yhm-managerth style="width: 200px" title="备注"></yhm-managerth>
          </template>
          <template #listBody>
            <tr v-for="(item,index) in warehouseEntryDetails" :key="index" :class="{InterlacBg:index%2!==0}">
              <yhm-manager-td-center :value="item.num"></yhm-manager-td-center>
              <yhm-manager-td :value="item.product"></yhm-manager-td>
              <yhm-manager-td :value="item.model"></yhm-manager-td>
              <yhm-manager-td-money :value="item.quantity"></yhm-manager-td-money>
              <yhm-manager-td :value="item.unit"></yhm-manager-td>
              <yhm-manager-td-money :value="item.price"></yhm-manager-td-money>
              <yhm-manager-td-money :value="item.totalMoney"></yhm-manager-td-money>
              <yhm-manager-td :value="item.remark"></yhm-manager-td>
            </tr>
          </template>
          <template #customize>
            <yhm-view-control title="总金额" type="money" :content="money" color="#FF0000"></yhm-view-control>
          </template>
        </yhm-view-tab-list>
      </template>
    </yhm-view-tab>
  </div>
</template>

<script>
  import { viewmixin } from '@/assets/view.js'
  export default {
    name: 'warehouseEntryView',
    mixins: [viewmixin],
    data(){
      return {
        tabState:[{select:true}],
        person:'',
        code:'',
        workDate:'',
        unit:'',
        money:'',
        remark:'',
        warehouseEntryDetails:[],  //商品明细
      }
    },
    methods:{

    },
    created () {
      this.init({
        url: '/Basic/initWarehouseEntryForm',
        call:(data)=>{
          this.person = data.person
          this.code = data.code
          this.workDate = data.workDate
          this.unit = data.unit
          this.money = data.money
          this.remark = data.remark

          this.warehouseEntryDetails = data.warehouseEntryDetails
        }
      })
    }
  }
</script>

<style scoped>

</style>
