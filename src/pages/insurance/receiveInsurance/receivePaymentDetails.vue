<template>
  <div class="f_main">
    <yhm-view-tab>
      <template #tab>
        <div style="font-size: 16px;" >计算收款金额</div>
        <!--        <yhm-form-text :icon-shou="true"  color="#666666" @call="unitDetails" title="来往明细" subtitle="" value="" id="person"  no-edit="1"></yhm-form-text>-->
      </template>
      <template #content>
        <yhm-view-tab-list :customize="true" :pager="true" customize-bg-color="#e2f1f0" v-show="tabState[0].select">
          <template #listHead>
            <yhm-managerth  style="width: 160px;" title="投保日期"></yhm-managerth>
            <yhm-managerth  title="车牌号"></yhm-managerth>
            <yhm-managerth  title="保费合计"></yhm-managerth>
            <yhm-managerth  title="优惠金额"></yhm-managerth>
            <yhm-managerth  title="实收金额"></yhm-managerth>

          </template>
          <template #listBody>
            <tr v-for="(item,index) in listProfit" :key="index" :class="{InterlacBg:index%2!==0}">
              <yhm-manager-td-date :value="item.insuredDate"></yhm-manager-td-date>

              <yhm-manager-td-center style="text-align: center;" :value="item.plate"></yhm-manager-td-center>
              <yhm-manager-td-money style="text-align: center;" :value="item.premiumsTotal"></yhm-manager-td-money>
              <yhm-manager-td-center style="text-align: center;" :value="'-'+item.discountMoney"></yhm-manager-td-center>
              <yhm-manager-td-center style="text-align: center;" :value="'='+item.receivedMoney"></yhm-manager-td-center>

            </tr>
          </template>

        </yhm-view-tab-list>
      </template>
    </yhm-view-tab>
  </div>
</template>

<script>
  import { viewmixin } from '@/assets/view.js'
  export default {
    name: 'receivePaymentDetails',
    mixins: [viewmixin],
    data(){
      return{
        id:'',
        tabState:[{select:true}],
        listProfit:[],

      }
    },
    methods:{

    },
    created () {
      this.setQuery2Value('premiumsTotal')
      this.setQuery2Value('receivedMoney')
      this.setQuery2Value('discountMoney')
      this.setQuery2Value('insuredDate')
      this.setQuery2Value('plate')
      this.listProfit.push({
        'premiumsTotal':this.premiumsTotal,
        'receivedMoney':this.receivedMoney,
        'discountMoney':this.discountMoney,
        'insuredDate':this.insuredDate,
        'plate':this.plate,

      })
    }
  }
</script>

<style scoped>

</style>
