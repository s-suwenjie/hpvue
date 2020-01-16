<template>
  <div class="f_main" :class="{mb35:isFinish !== '0'}">
    <yhm-view-body>
      <template #title>基本信息</template>
      <template #body>
        <yhm-view-control title="责任人" :content="person"></yhm-view-control>
        <yhm-view-control title="欠款方" :content="name"></yhm-view-control>
        <yhm-view-control title="发票号" :content="invoiceCode"></yhm-view-control>
        <yhm-view-control title="欠款金额" :content="money" type="money" color="#2c920b"></yhm-view-control>

        <yhm-view-control type="date" title="欠款发生日期" :content="workDate"></yhm-view-control>
        <yhm-view-control type="date" title="预计收款日期" :content="lastDate"></yhm-view-control>
      </template>
    </yhm-view-body>

    <div class="f_split"></div>

    <yhm-view-tab v-if="this.registerList.length !== 0">
      <template #tab>
        <yhm-view-tab-button :list="tabState" :index="0">收款记录</yhm-view-tab-button>
      </template>
      <template #content>
        <yhm-view-tab-list :customize="true" :pager="false" v-show="tabState[0].select">
          <template #listHead>
            <yhm-managerth style="width: 120px" title="交易日期"></yhm-managerth>
            <yhm-managerth style="width: 80px" title="金额"></yhm-managerth>
            <yhm-managerth style="width: 280px" title="对方付款账户"></yhm-managerth>
            <yhm-managerth style="width: 280px" title="收款账户"></yhm-managerth>
            <yhm-managerth title="备注"></yhm-managerth>
            <yhm-managerth style="width: 95px" title="操作"></yhm-managerth>
          </template>
          <template #listBody>
            <tr v-for="(item,index) in registerList" :key="index" :class="{InterlacBg:index%2!==0}">
              <yhm-manager-td-date :value="item.workDate"></yhm-manager-td-date>
              <yhm-manager-td-money :value="item.money"></yhm-manager-td-money>
              <yhm-manager-td :value="item.otherAccount"></yhm-manager-td>
              <yhm-manager-td :value="item.account"></yhm-manager-td>
              <yhm-manager-td :value="item.remark"></yhm-manager-td>
              <yhm-manager-td-operate>
                <yhm-manager-td-operate-button :no-click="item.state !=='0'" @click="addBankDetail(item)" value="确认收款" icon="i-btn-applicationSm" color="#49a9ea"></yhm-manager-td-operate-button>
              </yhm-manager-td-operate>
            </tr>
          </template>
        </yhm-view-tab-list>
      </template>
    </yhm-view-tab>
    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate" :is-not-show-operate="isFinish === '0'">
    </yhm-formoperate>
  </div>
</template>

<script>
  import { viewmixin } from '@/assets/view.js'
  export default {
    name: 'approvalPurchaseView',
    mixins: [viewmixin],
    data(){
      return {
        id:'',
        receivableType:'',        //欠款方类型
        receivableTypeList:[],
        nameID:'',        //欠款方ID
        name:'',          //欠款方
        invoiceID:'',     //发票ID
        invoiceCode:'',     //发票号
        money:'',           //欠款金额
        workDate:'',        //欠款发生日期（发票开具日期）
        lastDate:'',        //收款日期
        personID:'',        //责任人ID
        person:'',          //责任人
        state:'0',          //财务是否确认
        tabState:[{select:true}],
        registerList:'',
      }
    },
    methods:{
      addBankDetail(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '690',
          title: '添加收支明细',
          url: '/bankDetailForm?ownerID=' + item.id +'&bankDetailType=' + '1' + '&directionBefore=1',
          closeCallBack: (data)=> {
            if (data) {
              item.state = '1'
              //更改状态
              let params = {
                id: item.id,
              }
              this.ajaxJson({
                url: '/Bill/setReceivableRegisterState',
                data: params,
                call: (data) => {
                  this.$dialog.setReturnValue(data)
                }
              })
            }
          }
        })
      },
    },
    created () {
      this.init({
        url: '/Bill/initReceivableForm',
        call:(data)=>{
          this.id = data.id,
            this.receivableType = data.receivableType,
            this.nameID = data.nameID,
            this.name = data.name,
            this.invoiceID = data.invoiceID,
            this.invoiceCode = data.invoiceCode,
            this.money = data.money,
            this.workDate = data.workDate,
            this.lastDate = data.lastDate,
            this.personID = data.personID,
            this.person = data.person,
            this.state = data.state,
            this.registerList = data.registerList
        }
      })
    }
  }
</script>

<style scoped>

</style>
