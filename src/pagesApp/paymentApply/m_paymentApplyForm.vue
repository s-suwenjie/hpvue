<template>
  <div class="app_main">
    <div class="topBar">
      <router-link class="topNav" :to="{path: '/homeApp/m_myApprovalManager'}">返回</router-link>
      <router-link class="topNav" :to="{path: '/homeApp/m_paymentApplyTosub'}">待提交</router-link>
      <router-link class="topNav" :to="{path: '/homeApp/m_paymentApplySubed'}">已提交</router-link>
      <router-link class="topNav topNavChoice" :to="{path: '/homeApp/m_paymentApplyForm'}">添加</router-link>
    </div>
<!--    <yhm-app-scroll :empty="false" :init-load-finish="loadFinish">-->
    <div style="overflow: auto">
      <yhm-app-form-body v-if="true">
        <template #title>基本信息</template>
        <template #controls>
          <yhm-app-form-radio-button title="付款性质" @click="natureEvent" :value="nature" id="nature" :list="natureList"></yhm-app-form-radio-button>
          <yhm-app-form-radio-button title="支票支付" @click="checkEvent" :value="isChecks" id="isChecks" :list="isChecksList"></yhm-app-form-radio-button>
          <yhm-app-form-select title="收款方" @call="selectUnitEvent" :value="otherUnit" id="otherUnit" rule="R0000"></yhm-app-form-select>
          <yhm-app-form-radio-button title="是否关联" @click="isRelevanceEvent" :value="isRelevance" id="isRelevance" :list="isRelevanceList"></yhm-app-form-radio-button>
          <yhm-app-form-select title="计划事件" @call="nameEvent" :value="name" id="name" rule="R0000"></yhm-app-form-select>
          <yhm-app-form-text-box title="款项用途" :value="useName" id="useName" rule="R0000"></yhm-app-form-text-box>
          <yhm-app-form-select title="收款账号" @call="otherAccountEvent" :value="otherAccount" id="otherAccount" rule="R0000"></yhm-app-form-select>
          <yhm-app-form-text-box title="申请人" :value="person" id="person" rule="R0000"></yhm-app-form-text-box>
          <yhm-app-form-radio-button title="发票类型" @click="invoiceEvent" :value="invoice" id="invoice" :list="invoiceList"></yhm-app-form-radio-button>
          <yhm-app-form-radio-button title="发票二级类型" @click="isRelevanceEvent" :value="secondLevelInvoice" id="secondLevelInvoice" :list="secondLevelInvoiceList"></yhm-app-form-radio-button>
        </template>
      </yhm-app-form-body>
      <yhm-app-form-body>

        <template #title>更多信息</template>
        <template #controls>

        <yhm-app-form-text-box title="支付金额" :value="money" id="money" rule="R0000" :no-edit="true"></yhm-app-form-text-box>
        <yhm-app-form-text-box title="金额大写" :value="capitalMoney" id="capitalMoney" rule="R0000" :no-edit="true"></yhm-app-form-text-box>
          <yhm-app-form-select title="付款事由" @call="causeEvent" :value="ownerSys" id="ownerSys" rule="R0000"></yhm-app-form-select>
          <yhm-app-form-date-box title="最迟付款日期" :value="lastDate" id="lastDate" rule="#"></yhm-app-form-date-box>

        </template>
      </yhm-app-form-body>
      </div>
<!--    </yhm-app-scroll>-->
  </div>
</template>

<script>
  import { appformmixin } from '@/assetsApp/app_form.js'
  export default {
    name: 'm_paymentApplyForm',
    mixins: [appformmixin],
    data(){
      return {
        natureList: [
          {"showName":"预付","num":"0","code":"#0000ff"},
          {"showName":"凭发票支付","num":"1","code":"#00a8a8"},
          {"showName":"内部户转","num":"2","code":"#00a8a8"},
          {"showName":"代收代付","num":"3","code":"#00a8a8"},
          {"showName":"退款","num":"4","code":"#00a8a8"}
        ],  //付款性质
        nature: '',
        otherUnit: '', //收款方
        isChecksList: [
          {"showName":"非支票支付","num":"0","code":"#0000ff"},
          {"showName":"支票支付","num":"1","code":"#00a8a8"}
          ],  //支票支付
        isChecks: '',
        isRelevanceList: [
          {"showName":"计划内","num":"0","code":"#0000ff"},
          {"showName":"计划外","num":"1","code":"#00a8a8"}
          ],  //是否关联,
        isRelevance: '',
        name: '', //计划事件
        useName: '', //款项用途
        otherAccount: '',
        person: '', //申请人
        secondLevelInvoiceList: [
          {"showName":"增专","num":"0","code":"#0000ff"},
          {"showName":"增普","num":"1","code":"#00a8a8"},
          {"showName":"其他","num":"2","code":"#00a8a8"}
        ], //发票二级类型
        secondLevelInvoice: '',
        invoiceList: [
          {"showName":"纸质发票","num":"0","code":"#0000ff"},
          {"showName":"电子发票","num":"1","code":"#00a8a8"},
        ], //发票类型
        invoice: '',
        money: '', //支付金额
        capitalMoney: '', //金额大写
        ownerSys: '', //付款事由
        lastDate: '', //最迟付款日期
      }
    },
    methods: {
      /* 付款性质 */
      natureEvent(){

      },
      /* 支票支付 */
      checkEvent(){

      },
      /* 收款方 */
      selectUnitEvent(){

      },
      /* 是否关联 */
      isRelevanceEvent(){

      },
      /* 计划事件 */
      nameEvent(){

      },
      /* 收款账号 */
      otherAccountEvent(){

      },
      /* 发票类型 */
      invoiceEvent(){

      },
      /* 付款事由 */
      causeEvent(){

      }
    },
    created () {
      this.$nextTick(()=>{
        this.loadFinish = !this.loadFinish
      })
    }
  }
</script>

<style scoped lang="less">
  @rem: 375/10rem;
.topBar{
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 88/@rem;
  box-shadow: 0 1px 0 0 #bfbfbf;
  position: relative;
  .topNav{
    width: 100%;
    height: 100%;
    font-size: 14/@rem;
    color: #666;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .topNavChoice{
    position: relative;
    color: #49a9ea;
  }
  .topNavChoice:after{
    content: '';
    width: 100%;
    height: 2px;
    background-color: #49a9ea;
    position: absolute;
    bottom: 0;
    right: 0;
  }
}
</style>
