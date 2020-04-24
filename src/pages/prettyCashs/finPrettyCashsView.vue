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
    <div class="i-left fs48b colorFFF lftSwitchArrow" title="上一条" v-show="isLeftID"  @click="leftStrip">
    </div>
    <div class="i-right fs48b colorFFF rgtSwitchArrow" title="下一条" v-show="isRightID" @click="rightStrip">
    </div>
    <yhm-view-tab>
      <template #tab>
        <yhm-view-tab-button :list="tabState" :index="0"  v-if="isAppropriationMoney">拨付信息</yhm-view-tab-button>
        <yhm-view-tab-button :list="tabState" :index="1" @click="particulars">以往记录</yhm-view-tab-button>
      </template>
      <template #tab_total>
        <div v-show="tabState[1].select" style="background: #c5daeb;margin-right: 2px;">
          <table style="width: 400px;height: 50px;" >
            <thead>
              <th >总金额</th>
              <th style="color: #49a9ea;">占用金额</th>
              <th style="color: #001cce;">核销金额</th>
            </thead>
            <tbody>
              <tr v-for="(item,index) in totalTotal" style="background: #fff;">
                <td v-html="tenThousandFormatShow(item.sumMoney)" style="text-align: right;"></td>
                <td v-html="tenThousandFormatShow(item.useMoney)" style="text-align: right;color: #49a9ea;"></td>
                <td v-html="tenThousandFormatShow(item.writeOffMoney)" style="text-align: right;color: #001cce;"></td>
              </tr>
            </tbody>
          </table>

        </div>
      </template>
      <template #content>

        <yhm-view-tab-list :customize="true"  v-if="isAppropriationMoney" v-show="tabState[0].select">
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
        <yhm-view-tab-list :customize="true"  v-show="tabState[1].select">
          <template #operate>
            <yhm-radiofilter @initData="initChoose('state')" title="完成状态" :content="stateList" style="margin: 5px 0;"></yhm-radiofilter>
          </template>
          <template #listHead>
            <yhm-managerth style="width: 30px;" @click="listView(item)" title="查看"></yhm-managerth>


            <yhm-managerth style="width: 110px;" title="申请时间" value="workDate"></yhm-managerth>
            <yhm-managerth style="width: 120px;" title="申请金额" value="money"></yhm-managerth>

            <yhm-managerth style="width: 120px;" title="核销金额" value="reimbursementsMoney"></yhm-managerth>
            <yhm-managerth style="width: 120px;" title="待退回金额" value="balance"></yhm-managerth>

            <yhm-managerth style="width: 120px;" title="已退回金额" value="balance"></yhm-managerth>
            <yhm-managerth style="width: 120px;" title="状态" value=""></yhm-managerth>
          </template>
          <template #listBody>
            <tr v-for="(item,index) in particularsList" :class="{InterlacBg:index%2!=0}" :key="index">
              <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>
              <yhm-manager-td-date :value="item.workDate"></yhm-manager-td-date>
              <yhm-manager-td-money :value="item.money"></yhm-manager-td-money>

              <yhm-manager-td-money :value="item.reimbursementsMoney"></yhm-manager-td-money>
              <yhm-manager-td-money :value="item.balance"></yhm-manager-td-money>
              <yhm-manager-td-money :value="item.balance"></yhm-manager-td-money>
              <yhm-manager-td-center :value="item.stateVal"></yhm-manager-td-center>

            </tr>
          </template>
          <template #empty>
            <span class="m_listNoData" v-show="particularsEmpty">暂时没有数据</span>
          </template>
          <template #pager>
            <yhm-pagination :pager="pager" is-page-size="false" @initData="particulars"></yhm-pagination>
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
        pager: { // 分页数据
          total: '', // 数据总条数
          pageSize: 5, // 单页数据条数
          pageIndex: 1, // 当前页码
          selectCount: 0 // 选中数据的条数
        },
        stateList: {
          value: '',
          list: [
            {showName:"已完成", num: "0", code: "", img: ""},
            {showName:"进行中", num: "1", code: "", img: ""},
          ]
        },
        totalTotal: [],
        empty:false,
        tabState:[{select:true},{select:false}],
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
        particularsList:[],
        isLeftID:false,//延长按钮
        leftID:'',//上一条ID
        isRightID:false,//延长按钮
        rightID:'',//下一条ID
      }
    },
    methods:{
      initChoose(){
        this.particulars()
      },
      listView(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '740',
          title: '查看备用金信息',
          url:'/finPrettyCashsView?id='+item.id,
          closeCallBack: (data)=>{
            if(data){
              this.initPageData(false)
            }
          }
        })
      },
      particulars(){
        let params = {
          isFinish: this.stateList.value,
          pageIndex: this.pager.pageIndex,
          pageSize: this.pager.pageSize

        }
        this.ajaxJson({
          url: '/PersonOffice/prettyCashsPersonManager',
          data: params,
          call: (data) => {
            this.particularsList = data.content
            this.pager.total = data.count
            this.totalTotal = data.total
          }
        })
      },
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
            if(!this.isAppropriationMoney){
              this.particulars()
              this.tabState = [
                {select:false},{select:true}
              ]
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
    computed:{
      particularsEmpty(){
        if(this.particularsList.length>=1) {
          return false
        }else{
          return true
        }

      }
    },
    created () {
      this.setQuery2Value('isApproval')
      this.setQuery2Value('approval')
      this.initData()
      this.selectedList()
    },
    watch:{
      content(){
        this.empty = this.content.length === 0;
      }
    },
  }
</script>

<style scoped>

</style>

