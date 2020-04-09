<template>
  <div class="f_main">
    <yhm-view-body>
      <template #title>基本信息</template>
      <template #body>
        <yhm-view-control title="所属单位" :content="unit"></yhm-view-control>
        <yhm-view-control title="申请人员" :content="person"></yhm-view-control>
        <yhm-view-control title="发票类型" :content="invoiceCategory" :psd="invoiceCategoryList"></yhm-view-control>
        <yhm-view-control type="date" title="申请日期" :content="workDate"></yhm-view-control>
        <yhm-view-control title="业务相关" :psd="isTravelList" :content="isTravel"></yhm-view-control>
        <yhm-view-control type="money" title="申请金额" :content="money"></yhm-view-control>
        <yhm-view-control title="申请编号" :content="code"></yhm-view-control>
        <yhm-view-control title="事由" :content="subject" category="3"></yhm-view-control>
        <yhm-view-control title="预计核销日期" type="date"  :content="estimateDate"></yhm-view-control>
        <yhm-view-control title="备注" :content="remark" v-if="remark!==''"></yhm-view-control>
        <yhm-view-control title="文件" :content="list" type="files" v-if="list.length !== 0"></yhm-view-control>
      </template>
    </yhm-view-body>
    <yhm-view-tab>
      <template #tab>
        <yhm-view-tab-button :list="tabState" :index="0"  v-if="isAppropriationMoney">拨付信息</yhm-view-tab-button>
      </template>
      <template #content>
        <yhm-view-tab-list :customize="true"  v-if="isAppropriationMoney">
          <template #listHead>
            <yhm-managerth style="width: 150px" title="账号"></yhm-managerth>
            <yhm-managerth style="width: 150px" title="对方账号"></yhm-managerth>
            <yhm-managerth style="width: 140px" title="交易日期"></yhm-managerth>
            <yhm-managerth style="width: 80px" title="收支方向"></yhm-managerth>
            <yhm-managerth style="width: 110px" title="事由"></yhm-managerth>
            <yhm-managerth style="width: 120px" title="交易金额"></yhm-managerth>
            <yhm-managerth style="width: 110px" title="备注"></yhm-managerth>
            <yhm-managerth style="width: 100px" title="凭证"></yhm-managerth>
          </template>
          <template #listBody>
            <tr v-for="(item,index) in appropriationMoney" :class="{InterlacBg:index%2!=0}" :key="index">
              <yhm-manager-td :value="item.selfAccount"></yhm-manager-td>
              <yhm-manager-td :value="item.otherAccount"></yhm-manager-td>
              <yhm-manager-td-date :value="item.cccurDate"></yhm-manager-td-date>
              <yhm-manager-td-direction :direction="item.direction" class="dfJcc" :value="item.direction" :dir-val="false"></yhm-manager-td-direction>
              <yhm-manager-td :value="item.subject"></yhm-manager-td>
              <yhm-manager-td-money :value="item.money"></yhm-manager-td-money>
              <yhm-manager-td :value="item.remark"></yhm-manager-td>
              <yhm-manager-td-image @click="showInvoicePdfEvent(item)" :tip="true" width="850" height="600" left="50" type="files" :value="item.storeName" :tag="'bankDetail'" ></yhm-manager-td-image>
            </tr>
          </template>
        </yhm-view-tab-list>
      </template>
    </yhm-view-tab>
    <div v-if="isApproval" v-html="approvalHtml"></div>
    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
    </yhm-formoperate>
  </div>
</template>

<script>
  import { formmixin } from '@/assets/form.js'
  export default {
    name: 'prettyCashView',
    mixins: [formmixin],
    data(){
      return{
        tabState:[{select:true}],
        unitID:'',
        unit:'',
        person:'',
        personID:'',
        workDate:'',
        code:'',
        isTravel:'',
        isTravelList:[],
        money:'',
        remark:'',
        isAdd:'',
        subject:'',
        subjectID:'',
        state:'',
        approvalHtml: '',
        estimateDate: '',
        list: [],
        isApproval: true,
        invoiceCategory: '',
        invoiceCategoryList: [],
        appropriationMoney:[],
        isAppropriationMoney:false,
      }
    },
    methods:{
      initData(){
        this.init({
          url: '/PersonOffice/prettyCashsForm',
          all: (data)=>{
            this.isTravel=data.isTravelPsd.value
            this.isTravelList=data.isTravelPsd.list
            this.unit = data.unit
            this.unitID=data.unitID
            this.invoiceCategoryList = data.invoiceCategoryPsd.list
            this.appropriationMoney = data.bankDetailList
            if(this.appropriationMoney.length>0){
              this.isAppropriationMoney=true
            }
          },
          add: (data)=>{

          },
          look: (data)=>{
            this.personID=data.personID
            this.person=data.person
            this.money=data.money
            this.code=data.code
            this.workDate=data.workDate
            this.subject=data.subject
            this.subjectID=data.subjectID
            this.remark=data.remark
            this.state=data.state
            this.approvalHtml=data.approvalHtml
            this.estimateDate=data.estimateDate
            this.list = data.list
            this.invoiceCategory = data.invoiceCategory
          }
        })
      }
    },
    created () {
      this.initData()
    },

  }
</script>

<style scoped>

</style>
