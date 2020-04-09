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
        <yhm-view-control title="事由" :content="subject"></yhm-view-control>
        <yhm-view-control title="预计核销日期" type="date"  :content="estimateDate"></yhm-view-control>
        <yhm-view-control title="备注" :content="remark" v-if="remark!==''"></yhm-view-control>
        <yhm-view-control title="文件" :content="list" type="files" v-if="list.length !== 0"></yhm-view-control>
      </template>
    </yhm-view-body>
    <div class="f_split"></div>
    <div class="i-left fs48b colorFFF" title="上一条" v-show="isLeftID"  @click="leftStrip" style="width:48px;height:70px;background: #000;opacity:0.3;position: absolute;  bottom: 0px;z-index: 9999;display:flex;justify-content:center;align-items:center;">
    </div>
    <div class="i-right fs48b colorFFF" title="下一条" v-show="isRightID" @click="rightStrip" style="width:48px;height:70px;background: #000;opacity:0.3;position: absolute;  bottom: 0px;right:0px;z-index: 9999;display:flex;justify-content:center;align-items:center;">
    </div>
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
  </div>
</template>

<script>
  import { formmixin } from '@/assets/form.js'
  export default {
    name: 'finPrettyCashsView',
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
        isApproval:'',
        approval:'',
        estimateDate: '',
        list: [],
        invoiceCategory: '',
        invoiceCategoryList: [],
        appropriationMoney:[],
        isAppropriationMoney:false,

        isLeftID:false,//延长按钮
        leftID:'',//上一条ID
        isRightID:false,//延长按钮
        rightID:'',//下一条ID
      }
    },
    methods:{
      leftStrip(){
        window.location='/finPrettyCashsView?id='+this.leftID

      },
      rightStrip(){
        window.location='/finPrettyCashsView?id='+this.rightID
      },

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
            this.estimateDate = data.estimateDate
            this.list = data.list
            this.invoiceCategory = data.invoiceCategory
          }
        })
      },
      selectedList() {
        let params = {
          id: this.id
        }
        this.ajaxJson({
          url: '/PersonOffice/commonSelectedID',
          data: params,
          call: (data) => {
            //finReimbursementViewFormSelect
            if(data.leftID!==""){
              this.leftID=data.leftID
              this.isLeftID=true
            }
            if(data.rightID!==""){
              this.rightID=data.rightID
              this.isRightID=true
            }
          }
        })
      }
    },
    created () {
      this.setQuery2Value('isApproval')
      this.setQuery2Value('approval')
      this.initData()
      this.selectedList()
    }
  }
</script>

<style scoped>

</style>
