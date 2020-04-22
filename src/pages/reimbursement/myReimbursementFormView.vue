<template>
  <div class="f_main">
    <yhm-view-body>
      <template #title>报销明细</template>
      <template #body>
        <yhm-view-control title="申请人" :content="name"></yhm-view-control>
        <yhm-view-control title="申请日期" :content="workDate" type="date"></yhm-view-control>
        <yhm-view-control title="报销编号" :content="code"></yhm-view-control>
        <yhm-view-control title="是否核销" :content="isPrettyCashOff" :psd="isPrettyCashOffList"></yhm-view-control>
        <yhm-view-control  title="核销金额" v-if="noPrettyCashMoney" :content="prettyCashMoney" type="money"></yhm-view-control>
      </template>
    </yhm-view-body>
    <div class="f_split"></div>
    <div class="i-left fs48b colorFFF lftSwitchArrow" title="上一条" v-show="isLeftID"  @click="leftStrip">
    </div>
    <div class="i-right fs48b colorFFF rgtSwitchArrow" title="下一条" v-show="isRightID" @click="rightStrip">
    </div>
    <yhm-view-tab>
      <template #tab>
        <yhm-view-tab-button :list="tabState" :index="0">报销明细</yhm-view-tab-button>
        <yhm-view-tab-button :list="tabState" :index="1" v-if="noPrettyCashMoney">备用金信息</yhm-view-tab-button>
        <yhm-view-tab-button :list="tabState" :index="2" v-if="noBankDetail">拨款信息</yhm-view-tab-button>
      </template>

      <template #content>
        <yhm-view-tab-list :customize="true" :pager="false" v-show="tabState[0].select">
          <template #listHead>
            <yhm-managerth style="width: 38px" title="查看"></yhm-managerth>
            <yhm-managerth style="width: 140px" title="事由"></yhm-managerth>
            <yhm-managerth style="width: 120px" title="实报总金额"></yhm-managerth>
            <yhm-managerth style="width: 110px" title="发票总金额"></yhm-managerth>
            <yhm-managerth style="width: 110px" title="发票类型"></yhm-managerth>
            <yhm-managerth  title="备注"></yhm-managerth>
            <yhm-managerth style="width: 120px" title="审批状态"></yhm-managerth>
          </template>
          <template #listBody>
            <tr v-for="(item,index) in detail" :class="{InterlacBg:index%2!=0}" :key="index">
              <yhm-manager-td-look @click="listView(item.id)"></yhm-manager-td-look>
              <yhm-manager-td :value="item.subject"></yhm-manager-td>
              <yhm-manager-td-money :value="item.actualMoney"></yhm-manager-td-money>
              <yhm-manager-td-money :value="item.invoiceMoney"></yhm-manager-td-money>
              <yhm-manager-td-center @click="listView(item.id)" :value="item.invoiceCategoryName" color="#49a9ea"></yhm-manager-td-center>
              <yhm-manager-td :tip="true" node-class-name="f_main" :value="item.remark" @click="listView(item.id)" color="#49a9ea"></yhm-manager-td>
              <yhm-manager-td-center :value="item.stateVal"></yhm-manager-td-center>
            </tr>
          </template>
          <template #empty>
            <span class="m_listNoData" v-show="detail.length === 0">暂时没有数据</span>
          </template>
          <template #customize>
            <yhm-view-control type="money" title="实际金额" :content="actualMoney" color="#4BB414"></yhm-view-control>
            <yhm-view-control type="money" title="申请金额" :content="invoiceMoney" color="#f00"></yhm-view-control>
          </template>
        </yhm-view-tab-list>
        <yhm-view-tab-list :customize="true"  v-show="tabState[1].select" v-if="noPrettyCashMoney">
          <template #listHead>
            <yhm-managerth style="width: 40px" title="查看"></yhm-managerth>
            <yhm-managerth style="width: 150px" title="申请日期"></yhm-managerth>
            <yhm-managerth style="width: 100px" title="金额"></yhm-managerth>
            <yhm-managerth title="事由"></yhm-managerth>
            <yhm-managerth style="width: 150px" title="预计核销日期"></yhm-managerth>
            <yhm-managerth style="width: 200px" title="备注"></yhm-managerth>
            <yhm-managerth style="width: 40px" title="操作"></yhm-managerth>
          </template>
          <template #listBody>
            <tr v-for="(item,index) in prettyCashsList" :key="index" :class="{InterlacBg:index%2!==0}">
              <yhm-manager-td-look @click="prettyCashsView(item)"></yhm-manager-td-look>
              <yhm-form-td-date width="150" :no-edit="getPrettyCashs" :list="prettyCashsList" listid="prettyCashsList" :value="item" id="workDate" rule="R0000"></yhm-form-td-date>
              <yhm-form-td-textbox width="100" :no-edit="getPrettyCashs" position="u" :list="prettyCashsList" listid="prettyCashsList" :value="item" id="money" rule="R0000"></yhm-form-td-textbox>
              <yhm-form-td-textbox width="280" :no-edit="getPrettyCashs" position="u" :list="prettyCashsList" listid="prettyCashsList" :value="item" id="subject" rule="R0000"></yhm-form-td-textbox>
              <yhm-form-td-date width="150" :no-edit="getPrettyCashs" :list="prettyCashsList" listid="prettyCashsList" :value="item" id="estimateDate" rule="R0000"></yhm-form-td-date>
              <yhm-form-td-textbox width="200" :no-edit="getPrettyCashs" position="u" :list="prettyCashsList" listid="prettyCashsList" :value="item" id="remark" rule="R0000"></yhm-form-td-textbox>
              <yhm-form-td-delete :no-click="true" width="40" :list="prettyCashsList" :value="item" :del-click="true" @click="delPrettyCashs(index,item)"></yhm-form-td-delete>
            </tr>
          </template>
          <template #customize>
            <yhm-view-control type="money" category="5" title="申请金额" :content="actualMoney" color="#4BB414"></yhm-view-control>
            <yhm-view-control type="money" title="实际金额"  :content="invoiceMoney" color="#4BB414"></yhm-view-control>
          </template>
        </yhm-view-tab-list>
        <yhm-view-tab-list :customize="true"  v-show="tabState[2].select" v-if="noBankDetail">
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
            <tr v-for="(item,index) in bankDetail" :class="{InterlacBg:index%2!=0}" :key="index">
              <yhm-manager-td :value="item.selfAccount"></yhm-manager-td>
              <yhm-manager-td :value="item.otherAccount"></yhm-manager-td>
              <yhm-manager-td-date :value="item.cccurDate"></yhm-manager-td-date>
              <yhm-manager-td-direction :direction="item.direction" class="dfJcc" :value="item.direction" :dir-val="false"></yhm-manager-td-direction>
              <yhm-manager-td :value="item.subject"></yhm-manager-td>
              <yhm-manager-td-money :value="item.money"></yhm-manager-td-money>
              <yhm-manager-td :value="item.remark"></yhm-manager-td>
              <yhm-manager-td-image :tip="true" width="850" height="600" left="50" type="files" :value="item.storeName" :tag="'bankDetail'" ></yhm-manager-td-image>
            </tr>
          </template>
          <template #empty>
            <span class="m_listNoData"  v-show="bankDetail.length>=1?false:true">暂时没有数据</span>
          </template>
        </yhm-view-tab-list>
      </template>
    </yhm-view-tab>

    <yhm-formoperate :createName="createName"  :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
    </yhm-formoperate>
  </div>

</template>

<script>
  import { formmixin } from '@/assets/form.js'
  export default {
    name: 'reimbursementFormView',
    mixins: [formmixin],
    data () {
      return {
        tabState:[{select:true},{select:false},{select:false}],
        content: {},
        bcc: 0,
        detail: [], // 列表数据
        detailID: '',
        empty: true,
        btmShow: true,
        list: {},
        category: '',
        name: '',
        workDate: '',
        invoiceMoney:'0',
        code: '',


        relevanceID:'',
        relevanceType:'',
        unitID:'',
        personID:'',

        money: '0',
        actualMoney: '0',
        approvalMoney: '0',
        isAddBtn: true,
        isState: false,

        isPrettyCashOff:'',
        isPrettyCashOffList:[],
        noPrettyCashMoney:false,
        prettyCashMoney:'',
        prettyCashOffListShow:false,
        prettyCashsList:[],
        getPrettyCashs:'1',

        noBankDetail:false,
        bankDetail:[],

        isLeftID:false,//延长按钮
        leftID:'',//上一条ID
        isRightID:false,//延长按钮
        rightID:'',//下一条ID
      }
    },
    methods: {
      leftStrip(){
        window.location='/reimbursementFormView?id='+this.leftID

      },
      rightStrip(){
        window.location='/reimbursementFormView?id='+this.rightID
      },
      prettyCashsView(item){
        let url='/prettyCashsView?id='+item.prettyCashsID
        this.$dialog.OpenWindow({
          width: '1050',
          height: '590',
          title: '查看备用金信息',
          url:url,
          closeCallBack: (data)=>{
            if(data){
              this.initPageData(false)
            }
          }
        })
      },
      listView (id) {
        if (id) {
          this.$dialog.OpenWindow({
            width: 1050,
            height: 690,
            url: '/reimbursementDetailFormView?id=' + id,
            title: '查看报销明细',
            closeCallBack: (data) => {
              this.$dialog.setReturnValue(this.id)
              let params = {
                id: data
              }
              if (data) {
                this.ajaxJson({
                  url: '/PersonOffice/reimbursementsForm',
                  data: params,
                  call: (data) => {
                    this.detail = data.list
                    this.actualMoney = data.actualMoney
                  }
                })
              }
            }
          })
        }
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
            if (data.leftID !== "") {
              this.leftID = data.leftID
              this.isLeftID = true
            }
            if (data.rightID !== "") {
              this.rightID = data.rightID
              this.isRightID = true
            }
          }
        })
      },
        initData(){
        this.init({
          url: '/PersonOffice/reimbursementsForm',
          all: (data) => {
            /* 公共 无论查看和添加返回数据 */
            this.content = data
            this.name = this.content.name
            this.workDate = this.content.workDate
            this.code = this.content.code
            this.relevanceID = this.content.relevanceID
            this.relevanceType = this.content.relevanceType
            this.unitID = this.content.unitID
            this.personID = this.content.personID

            this.money = this.content.money
            this.actualMoney = this.content.actualMoney
            this.approvalMoney = this.content.approvalMoney

            this.detail = data.list
            this.empty = data.list.length === 0
            var bbc = 0
            var bcc
            for(let i = 0;i<this.detail.length;i++){
              bbc += parseFloat(this.detail[i].invoiceMoney)
              bcc = bbc.toFixed(2)
            }
            this.invoiceMoney=bcc

            this.isPrettyCashOff = data.isPrettyCashOff
            this.isPrettyCashOffList = data.isPrettyCashOffPsd.list
            this.prettyCashMoney = data.prettyCashMoney
            if(this.isPrettyCashOff==='1'){
              this.noPrettyCashMoney=true
            }
            this.prettyCashsList=data.prettyCashsList

            this.setQuery2Value('relevanceID')
            this.setQuery2Value('relevanceType')
            if(this.relevanceID){
              this.reimbursementsDetailIsAutoAdd()
            }
            this.bankDetail=data.bankDetail
            if(this.bankDetail.length>0){
              this.noBankDetail=true
            }
          },
          add: (data) => {
            /* 需要添加的数据 */
          },
          look: (data) => {
            /* 需要查看的数据 */
            // this.detail = data.list
            // this.empty = this.detail.length === 0
            if(data.state !== 0){
              this.isAddBtn = false
              this.isState = true
            }
          },
        })
      }
    },
    created () {
      this.initData()
      this.selectedList()
    }
  }
</script>

<style scoped>
  .icon-search:before{
    color: #49a9ea;
  }
</style>
