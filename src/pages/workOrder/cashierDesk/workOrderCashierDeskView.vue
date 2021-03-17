<template>
    <div class="f_main">
      <yhm-view-body>
        <template #title>基本信息</template>
        <template #body>
          <yhm-view-control title="业务员" content="salsesman"></yhm-view-control>
        </template>
      </yhm-view-body>
      <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
        <template #btn>
          <yhm-commonbutton v-if="cashierOperation==='3'?true:false"  :flicker="true" @call="approFund()" :value="'收款(客户)'" icon="i-btn-grant" color="#be08e3"></yhm-commonbutton>
        </template>
      </yhm-formoperate>
    </div>
</template>

<script>
  import { viewmixin } from '@/assets/view.js'
  export default {
    name: 'workOrderCashierDeskView.vue'
  }
</script>

<style scoped>

</style>
