<template>

  <div class="f_main">
    <yhm-view-tab>
      <template #tab>

      </template>
      <template #content>
        <yhm-view-tab-list :customize="true" :pager="true" customize-bg-color="#e2f1f0" v-show="tabState[0].select">
          <template #listHead>
            <!--<yhm-managerth style="width: 40px;" title="选择"></yhm-managerth>-->
            <yhm-managerth style="width: 40px"  title="查看" ></yhm-managerth>
            <yhm-managerth style="width: 150px"  title="充值日期" ></yhm-managerth>
            <yhm-managerth style="width: 100px" title="充值人员"></yhm-managerth>
            <yhm-managerth style="width: 100px" title="充值金额"></yhm-managerth>
            <yhm-managerth style="width: 100px" title="实际支付金额"></yhm-managerth>
            <yhm-managerth style="width: 100px" title="报销状态"></yhm-managerth>
            <yhm-managerth style="width: 100px" title="操作"></yhm-managerth>

          </template>
          <template #listBody>
            <tr v-for="(item,index) in listDetails" :key="index" :class="{InterlacBg:index%2!==0}">
              <!--<yhm-manager-td-checkbox :value="item"></yhm-manager-td-checkbox>-->
              <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>
              <yhm-manager-td-date  :value="item.rechargeDate"></yhm-manager-td-date>
              <yhm-manager-td :value="item.rechargePerson" ></yhm-manager-td>
              <yhm-manager-td-money :value="item.rechargeMoney" ></yhm-manager-td-money>
              <yhm-manager-td-money :value="item.actualMoney" ></yhm-manager-td-money>
              <yhm-manager-td-psd :value="item.reimbursementStatus" :list="reimbursementStatusList"></yhm-manager-td-psd>
              <yhm-manager-td-operate>
                <yhm-manager-td-operate-button :no-click="item.reimbursementStatus==0?true:false" value="我要报销" icon="im_go" color="#ff0000"></yhm-manager-td-operate-button>
              </yhm-manager-td-operate>
            </tr>
          </template>
          <template #empty>
            <span class="m_listNoData" v-show="listDetails.length>0?false:true">暂时没有数据</span>
          </template>
          <template #pager>
            <yhm-pagination :pager="pager" is-page-size="false" :is-select-info="false" @initData="listPage(false)"></yhm-pagination>
          </template>
        </yhm-view-tab-list>
      </template>
    </yhm-view-tab>
  </div>

</template>

<script>
  import { viewmixin } from '@/assets/view.js'
  export default {
    name: 'rechargeRecordView',
    mixins: [viewmixin],
    data(){
      return{
        tabState: [{ select: true }],
        id:'',
        cardID:'',//储值卡ID
        numbering:'',//充值卡号
        alias:'',//充值别名
        rechargeDate:'',//充值日期
        rechargeMoney:'',//充值金额
        actualMoney:'',//实际支付金额
        rechargePerson:'',
        rechargePersonID:'',//充值人员
        rechargeRearMoney:'',//充值后金额
        reimbursementList:[],//是否报销
        reimbursement:'',
        reimbursementStatusList:[],//报销状态
        reimbursementStatus:'',
        listDetails:[]

      }
    },
    methods:{
      listView(item){

      },
      initData(){
        let params = {
          id: this.id
        }
        this.init({
          url: '/dailyoffice/expressCompany/getRechargeForm',
          data: params,
          call: (data)=>{
            this.listDetails=data.content
            this.reimbursementList = data.reimbursementPsd.list
            this.reimbursementStatusList = data.reimbursementStatusPsd.list

          }
        })
      }
    },
    created(){
      this.setQuery2Value('id')
      this.initData()
    }
  }
</script>

<style scoped>

</style>
