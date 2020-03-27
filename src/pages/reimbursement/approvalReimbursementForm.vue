<template>
  <div class="f_main">
    <yhm-view-body>
      <template #title>报销明细</template>
      <template #body>
        <yhm-view-control category="5" title="申请人" :content="name"></yhm-view-control>
        <yhm-view-control  title="交易日期" :content="workDate" type="date"></yhm-view-control>
        <yhm-view-control  title="报销编号" :content="code"></yhm-view-control>
        <yhm-view-control title="是否核销" :content="isPrettyCashOff" :psd="isPrettyCashOffList"></yhm-view-control>
        <yhm-view-control  title="核销金额" v-if="noPrettyCashMoney" :content="prettyCashMoney" type="money"></yhm-view-control>
      </template>
    </yhm-view-body>
    <div class="f_split"></div>
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
            <yhm-managerth title="事由"></yhm-managerth>
            <yhm-managerth style="width: 120px" title="金额"></yhm-managerth>
            <yhm-managerth style="width: 90px" title="发票金额"></yhm-managerth>
            <yhm-managerth style="width: 150px" title="发票类型"></yhm-managerth>
            <yhm-managerth style="width: 110px;" title="备注" ></yhm-managerth>
            <yhm-managerth style="width: 80px;" title="审批状态"></yhm-managerth>
            <yhm-managerth style="width: 120px;" title="操作"></yhm-managerth>
          </template>
          <template #listBody>
            <tr v-for="(item,index) in detail" :class="{InterlacBg:index%2!=0}" :key="item.id">
              <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>
              <yhm-manager-td :value="item.subject"></yhm-manager-td>
              <yhm-manager-td-money :value="item.actualMoney"></yhm-manager-td-money>
              <yhm-manager-td-money :value="item.invoiceMoney"></yhm-manager-td-money>
              <yhm-manager-td-center @click="listView(item)" :value="item.invoiceCategoryName" color="#49a9ea"></yhm-manager-td-center>
              <yhm-manager-td :tip="true" node-class-name="f_main" :value="item.remark" @click="listView(item)" color="#49a9ea"></yhm-manager-td>
              <yhm-manager-td-center :value="item.stateVal"></yhm-manager-td-center>
              <yhm-manager-td-operate>
                <yhm-manager-td-operate-button :no-click="item.isApproval!=='0'" @click="adoptEvent(item)" value="通过" icon="i-btn-applicationSm" color="#49a9ea"></yhm-manager-td-operate-button>
                <yhm-manager-td-operate-button :no-click="item.isApproval!=='0'" @click="rejectEvent(item)" value="驳回" icon="i-btn-turnDown" color="#FF0000"></yhm-manager-td-operate-button>
              </yhm-manager-td-operate>
            </tr>
          </template>
          <template #customize>
            <yhm-view-control type="money" category="5" title="申请金额" :content="actualMoney" color="#4BB414"></yhm-view-control>
            <yhm-view-control type="money" title="实际金额"  :content="invoiceMoney" color="#4BB414"></yhm-view-control>
          </template>
          <template #empty>
            <span class="m_listNoData" v-show="detail.length === 0">暂时没有数据</span>
          </template>
        </yhm-view-tab-list>
        <yhm-view-tab-list :customize="true"  v-show="tabState[1].select"  v-if="noPrettyCashMoney">
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
    <yhm-formoperate :createName="createName" v-show="handleButton" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate" >
        <template #btn >
          <yhm-commonbutton v-show="state !== '9'" value="通过" :flicker="true" @call="tableAdoptEvent()" icon="i-btm-applicationSm" class="btnIcon"></yhm-commonbutton>
          <yhm-commonbutton v-show="state !== '9'" value="驳回" @call="tableRejectEvent()" icon="i-btn-turnDown" class="btnIcon btnIconColor"></yhm-commonbutton>
          <yhm-commonbutton v-show="isChecks1 === '1'" @call="refundMoney" value="退备用金" icon="i-btn-grant" color="#be08e3"></yhm-commonbutton>
          <yhm-commonbutton v-show="isChecks2 === '1'" @call="repayment()" value="确认还款" icon="i-complete" color="#6e19e1"></yhm-commonbutton>
          <yhm-commonbutton v-show="isChecks3 === '1'" @call="approFund()" value="拨付资金" icon="i-btn-grant" color="#be08e3"></yhm-commonbutton>
          <yhm-commonbutton v-show="isChecks1 === '3'&&isChecks2 === '3'&&isChecks3 === '3'&&isFinish === '0'" :no-click="item.isApproval==='4'" @call="writeOff()" value="确认核销" icon="i-btn-grant" color="#be08e3"></yhm-commonbutton>
          <yhm-commonbutton v-show="state === '4'&&isChecks1 === '0'&&isChecks2 === '0'&&isChecks3 === '0'" @call="approFund()" value="拨付资金" icon="i-btn-grant" color="#be08e3"></yhm-commonbutton>
        </template>
      </yhm-formoperate>
  </div>
</template>

<script>
  import { formmixin } from '@/assets/form.js'
  export default {
    name: 'approvalReimbursementForm',
    mixins: [formmixin],
    data(){
      return{
        tabState:[{select:true},{select:false},{select:false}],
        content: [],
        detail: [],
        money: '0',
        actualMoney: '0',
        category: '',
        name: '',
        invoiceMoney:'',
        workDate: '',
        code: '',
        listState: '',
        handleButton: false,
        isClick: false,
        isPrint: '',
        isApproval: '',

        isPrettyCashOff:'',
        isPrettyCashOffList:[],
        noPrettyCashMoney:false,
        prettyCashMoney:'',
        prettyCashOffListShow:false,
        prettyCashsList:[],
        getPrettyCashs:'1',

        noBankDetail:false,
        bankDetail:[],
        item: '',

        state:'',
        isChecks1:'',
        isChecks2:'',
        isChecks3:'',
        prettyCashsID:'',
      }
    },
    methods:{
      approFund(){
        if (this.isPrettyCashOff === '0'){
          this.$dialog.OpenWindow({
            width: '650',
            height: '300',
            title: '拨付资金',
            url: '/approvalReimbursementFund?id='+this.id,
            closeCallBack: (data)=>{
              if(data){
                this.initData()
              }
            }
          })
        }else{
          //备用金拨付资金
          this.$dialog.OpenWindow({
            width: '1050',
            height: '740',
            url: '/bankDetailForm?ownerID=' + this.id + '&bankDetailType=6&directionBefore=1',
            title: '拨付资金',
            closeCallBack: (data) => {
              if(data){
                this.initData()
              }
            }
          })
        }
      },
      writeOff(){
        let params={
          id:this.id,
          prettyCashsID:this.prettyCashsID
        }
        this.ajaxJson({
          url: '/PersonOffice/writeOffPrettyCashMoney',
          data: params,
          call: (data) => {
            this.$dialog.alert({
              tipValue: data.message,
              closeCallBack: () => {
                this.initData()
              }
            })
          }
        })
      },
      refundMoney(){
        alert(this.prettyCashsID)
        this.$dialog.OpenWindow({
          width: '1050',
          height: '690',
          title: '备用金退款',
          url: '/bankDetailForm?ownerID=' + this.prettyCashsID +'&bankDetailType=7&directionBefore=1',
          closeCallBack: (data)=>{
            this.initData()
          }
        })
      },
      /* 确认还款 */
      repayment(){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '740',
          title: '还款',
          url: '/bankDetailForm?ownerID=' + this.id + '&bankDetailType=3',
          closeCallBack: (data) => {
            if(data){
              this.initData()
            }
          }
        })
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
              this.initData()
            }
          }
        })
      },
      adoptEvent (item) { //子表通过
        if(item.isApproval==='1'){
          return
        }
        if(item.id){
          let params = {
            id: item.id,
            tableName: 40,
            kind:2,
            tableDetailName:41,
          }

          this.$dialog.confirm({
            width: '300',
            tipValue: '是否通过?',
            alertImg: 'warn',
            okCallBack: (data)=>{
              this.ajaxJson({
                url: '/PersonOffice/approvalYesVue',
                data: params,
                call: (data)=>{
                  if(data.type === 0){
                    this.$dialog.setReturnValue(this.id)
                    this.$dialog.alert({
                      tipValue: data.message,
                      closeCallBack: () => {
                        location.reload()
                      }
                    })
                  }else{
                    this.$dialog.alert({
                      tipValue: data.message,
                      alertImg: 'error',
                      closeCallBack: () => {
                      }
                    })
                  }
                }
              })
            }
          })
        }
      },
      rejectEvent (item) { //子表驳回
        if(item.isApproval==='1'){
          return
        }
        if(item.id){

          this.$dialog.OpenWindow({
            width: '1050',
            height: '720',
            title: '驳回理由',
            url: '/rejectReason?category=12' +'&id=' + item.id+ '&tableName=40&tableDetailName=41&kind=2',
            closeCallBack: (data)=>{
              if(data){
                this.$dialog.setReturnValue(this.id)
                location.reload()
              }
            }
          })
        }
      },
      tableAdoptEvent (item) { //主表通过
        if(this.id){
          let params = {
            id: this.id,
            tableName: 40,
          }

          this.$dialog.confirm({
            width: '300',
            tipValue: '是否通过?',
            alertImg: 'warn',
            okCallBack: (data)=>{
              this.ajaxJson({
                url: '/PersonOffice/getPressIDVue',
                data: params,
                call: (data) => {
                  this.category = data.message
                  if (this.category) {
                    let params = {
                      id: data.message,
                      kind: '1',
                      tableName: '40',
                      tableDetailName: '41',
                      location: '0'
                    }
                    this.ajaxJson({
                      url: '/PersonOffice/approvalYesVue',
                      data: params,
                      call: (data)=>{
                        if(data.type === 0){
                          this.$dialog.setReturnValue(this.id)
                          this.$dialog.alert({
                            tipValue: data.message,
                            closeCallBack: () => {
                              location.reload()
                            }
                          })
                        }else {
                          this.$dialog.alert({
                            tipValue: data.message,
                            alertImg: 'error',
                            closeCallBack: () => {
                            }
                          })
                        }
                      }
                    })
                  }
                }
              })
            }
          })
        }
      },
      tableRejectEvent (item) { //主表驳回
        if(this.id){
          this.$dialog.OpenWindow({
            width: '1050',
            height: '720',
            title: '驳回理由',
            url: '/rejectReason?category=12&id=' + this.id + '&tableName=40&tableDetailName=41&kind=1',
            closeCallBack: (data)=>{
              if(data){
                this.$dialog.setReturnValue(this.id)
                location.reload()
              }
            }
          })
        }
      },
      listView (item) {
        if (item.id) {
          this.$dialog.OpenWindow({
            width: '1050',
            height: '750',
            url: '/approvalReimbursementDetailForm?id=' + item.id + '&isApproval=' + item.isApproval,
            title: '查看报销明细',
            closeCallBack: (data) => {
              if(data){
                this.$dialog.setReturnValue(this.id)
                this.initData()
              }
            }
          })
        }
      },
      initData(){
        this.setQuery2Value('isPrint')
        this.setQuery2Value('isApproval')
        if(this.isPrint === '1' || this.isApproval === '1'){
          this.isClick = true
        }
        this.init({
          url: '/PersonOffice/getReimbursementApprovalByID',
          all: (data) => {
            /* 公共 无论查看和添加返回数据 */
            // var figure = 0
            // var sum
            // for (let i = 0; i < data.list.length; i++) {
            //   figure += parseFloat(data.list[i].invoiceMoney)
            //   sum = figure.toFixed(2)
            // }
            // this.invoiceMoney = sum
            this.invoiceMoney=data.actualMoneyY
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

            if(this.content.state != '0'){
              this.btmShow = false
            }
            this.detail = data.list
            this.empty = data.list.length === 0
            this.isPrettyCashOff = data.isPrettyCashOff
            this.isPrettyCashOffList = data.isPrettyCashOffPsd.list
            this.prettyCashMoney = data.prettyCashMoney
            if(this.isPrettyCashOff==='1'){
              this.noPrettyCashMoney=true
            }
            this.prettyCashsList=data.prettyCashsList

            this.bankDetail=data.bankDetail
            if(this.bankDetail.length>0){
              this.noBankDetail=true
            }

            this.state = data.state
            this.isChecks1 = data.isChecks1
            this.isChecks2 = data.isChecks2
            this.isChecks3 = data.isChecks3
            this.prettyCashsID = data.prettyCashsID
          },
          add: (data) => {
            /* 需要添加的数据 */
          },
          look: (data) => {
            /* 需要查看的数据 */
            // this.detail = data.list
            // this.empty = this.detail.length === 0
            this.handleButton = false
            for (let i = 0; i<data.list.length; i++){
              if(data.list[i].isApproval === '0'){
                this.handleButton = true
              }
            }
          }
        })
      }
    },
    created () {
      this.initData()
    }
  }
</script>

<style scoped>

</style>
