<template>
  <div class="f_main">
    <yhm-view-body>
      <template #title>基本信息</template>
      <template #body>
        <yhm-view-control category="2" title="收款方" :content="otherUnit"></yhm-view-control>
      </template>
    </yhm-view-body>

    <div class="f_split"></div>
    <div class="i-left fs48b colorFFF lftSwitchArrow" title="上一条" v-show="isLeftID"  @click="leftStrip"></div>
    <div class="i-right fs48b colorFFF rgtSwitchArrow" title="下一条" v-show="isRightID" @click="rightStrip"></div>

    <yhm-view-tab>
      <template #tab>
        <yhm-view-tab-button :list="tabState" :index="0">事件信息</yhm-view-tab-button>
      </template>
      <template #content>
        <yhm-view-tab-list :customize="true" :pager="false" v-show="tabState[0].select">
          <template #listHead>
            <yhm-managerth style="width: 38px" title="查看"></yhm-managerth>
            <yhm-managerth title="事件描述"></yhm-managerth>
            <yhm-managerth style="width: 120px" title="最迟日期"></yhm-managerth>
            <yhm-managerth style="width: 90px" title="付款金额"></yhm-managerth>
            <yhm-managerth style="width: 200px" title="编号"></yhm-managerth>
            <yhm-managerth style="width: 60px;" title="审批留言"></yhm-managerth>
            <yhm-managerth style="width: 80px;" title="审批状态"></yhm-managerth>
            <yhm-managerth style="width: 120px" title="操作"></yhm-managerth>
          </template>
          <template #listBody>
            <tr v-for="(item,index) in detail" :class="{InterlacBg:index%2!=0}" :key="item.id">
              <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>
              <yhm-manager-td :value="item.name"></yhm-manager-td>
              <yhm-manager-td-date :value="item.lastDate"></yhm-manager-td-date>
              <yhm-manager-td-money :value="item.money"></yhm-manager-td-money>
              <yhm-manager-td-center :value="item.code"></yhm-manager-td-center>
              <yhm-manager-td-leaveword @iconClick="SelectApprovalMessage(item)" :leave-word-show="item.approvalMessage === '1'?true:false"></yhm-manager-td-leaveword>
              <yhm-manager-td :value="item.stateVal"></yhm-manager-td>
              <yhm-manager-td-operate>
                <yhm-manager-td-operate-button :no-click="item.isApproval!=='0'" @click="adoptEvent(item)" value="通过" icon="i-btn-applicationSm" color="#49a9ea"></yhm-manager-td-operate-button>
                <yhm-manager-td-operate-button :no-click="item.isApproval!=='0'" @click="rejectEvent(item)" value="驳回" icon="i-btn-turnDown" color="#FF0000"></yhm-manager-td-operate-button>
              </yhm-manager-td-operate>
            </tr>
          </template>
          <template #customize>
            <yhm-view-control type="money" title="付款金额" :content="money" color="#4BB414"></yhm-view-control>
          </template>
        </yhm-view-tab-list>
      </template>
    </yhm-view-tab>
    <yhm-formoperate :createName="createName" v-show="handleButton" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate" >
      <template #btn>
        <yhm-commonbutton value="通过"  :flicker="true" @call="tableAdoptEvent()" icon="i-btm-applicationSm" class="btnIcon"></yhm-commonbutton>
        <yhm-commonbutton value="驳回"   @call="tableRejectEvent()" icon="i-btn-turnDown" class="btnIcon btnIconColor"></yhm-commonbutton>
      </template>
    </yhm-formoperate>
  </div>

</template>

<script>
  import Qs from 'qs'
  import { accMul, accAdd, guid } from '@/assets/common.js'
  import { formmixin } from '@/assets/form.js'
  export default {
    name: 'approvalPayForm',
    mixins: [formmixin],
    data () {
      return {
        tabState:[{select:true}],
        content: {},
        otherUnitID: '',
        otherUnit: '', // 收款单位
        otherAccountID: '',
        otherAccount: '', // 收款账号
        person: '',
        bcc: 0,
        detail: {}, // 列表数据
        detailID: '',
        empty: true,
        btmShow: true,
        list: {},
        money:'0',
        category: '',

        handleButton:false,
        isApprovalContent:{},
        id:'',//主表id

        isLeftID:false,//延长按钮
        leftID:'',//上一条ID
        isRightID:false,//延长按钮
        rightID:'',//下一条ID
      }
    },
    methods: {

      leftStrip(){
        window.location='/approvalPayForm?id='+this.leftID
      },
      rightStrip(){
        window.location='/approvalPayForm?id='+this.rightID
      },
      SelectApprovalMessage(item){
        this.$dialog.OpenWindow({
          width: '650',
          height: '300',
          title: '查看审批留言信息',
          url:'/approvalMessage?id='+item.id,
          closeCallBack: (data)=>{
            if(data){
            }
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
      },

      listView (item) {
        if (item) {
          this.$dialog.OpenWindow({
            width: 1050,
            height: 500,
            url: '/approvalPlanDetailForm?id=' + item.id + '&isApproval=' + item.isApproval +"&rejectCause=" +item.rejectCause,
            title: '查看付款计划详情信息',
            closeCallBack: (data) => {
              this.$dialog.setReturnValue(this.id)
              this.initData()
              // let params = {
              //   id: data
              // }
              // if (data) {
              //   this.ajaxJson({
              //     url: '/PersonOffice/getPaymentPlanDetailList',
              //     data: params,
              //     call: (data) => {
              //       this.detail = data
              //     }
              //   })
              // }
            }
          })
        }
      },
      initData () {
        let query = Qs.parse(location.search.substring(1))
        let id = query.id
        this.id=query.id
        let isAdd = false
        if (!id) {
          id = guid()
          isAdd = true
        }
        this.id = id
        let params = {
          id: this.id
        }
        this.ajaxJson({
          url: '/personOffice/getApprovalPaymentPlanById',
          data: params,
          call: (data) => {
            this.detail = data[1]
            // this.money = this.detail.money
            var figure = 0
            var sum
            for (let i = 0; i < this.detail.length; i++) {
              figure += parseFloat(this.detail[i].money)
              sum = figure.toFixed(2)
            }
            this.money = sum

            let isApprovalContent= this.detail
            this.handleButton=false
            for(let i=0;i<isApprovalContent.length;i++){
              if(isApprovalContent[i].isApproval==0){
                this.handleButton=true
              }
            }
            this.content = data
            for (let i in this.content[0]) {
              this.otherUnit = this.content[0][i].otherUnit
              this.person = this.content[0][i].person
              this.otherAccount = this.content[0][i].otherAccount
              this.otherUnitID = this.content[0][i].otherUnitID
              this.otherAccountID = this.content[0][i].otherAccountID
              //this.btmShow = this.content[0][i].state === 0

              if (this.content[0][i].state != 0) {
                // this.btmShow = false
              }
            }

            // this.btmShow = this.content === 0

            this.empty = this.detail.length === 0
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
            tableName: 43,
            kind:2,
            tableDetailName:44,
          }
          this.$dialog.OpenWindow({
            width: 650,
            height: 230,
            title: '审批留言',
            url: '/passMessage?id=' + item.id+ '&tableName=43&tableDetailName=44&kind=2',
            closeCallBack: (acc)=>{
              if(acc){
                location.reload()
              }
            }
          })
        }
        // if(item.id){
        //   let params = {
        //     id: item.id,
        //     tableName: 43,
        //     kind:2,
        //     tableDetailName:44,
        //   }
        //
        //   this.$dialog.confirm({
        //     width: 300,
        //     tipValue: '是否通过?',
        //     alertImg: 'warn',
        //     okCallBack: (data)=>{
        //       this.ajaxJson({
        //         url: '/PersonOffice/approvalYesVue',
        //         data: params,
        //         call: (data)=>{
        //           if(data.type === 0){
        //             this.$dialog.setReturnValue(this.id)
        //             this.$dialog.alert({
        //               tipValue: data.message,
        //               closeCallBack: () => {
        //                 location.reload()
        //               }
        //             })
        //           }else{
        //             this.$dialog.alert({
        //               tipValue: data.message,
        //               alertImg: 'error',
        //               closeCallBack: () => {
        //               }
        //             })
        //           }
        //         }
        //       })
        //     }
        //   })
        // }
      },
      rejectEvent (item) { //子表驳回
        if(item.isApproval==='1'){
          return
        }
        if(item.id){

          this.$dialog.OpenWindow({
            width: 1050,
            height: 720,
            title: '驳回理由',
            url: '/rejectReason?category=12' +'&id=' + item.id+ '&tableName=43&tableDetailName=44&kind=2',
            closeCallBack: (data)=>{
              if(data){
                this.$dialog.setReturnValue(this.id)
                location.reload()
              }
            }
          })
        }
      },
      tableAdoptEvent () { //主表通过
        if(this.id) {
          let params = {
            id: this.id,
            tableName: 43
          }
          this.ajaxJson({
            url: '/PersonOffice/getPressIDVue',
            data: params,
            call: (data) => {
              this.$dialog.OpenWindow({
                width: 650,
                height: 230,
                title: '审批留言',
                url: '/passMessage?category=' + data.message + '&id=' + this.id + '&tableName=43&tableDetailName=44&kind=1',
                closeCallBack: (acc) => {
                  if (acc) {
                    location.reload()
                  }
                }
              })
            }
          })
        }
        // if(this.id){
        //   let params = {
        //     id: this.id,
        //     tableName: 43,
        //   }
        //
        //   this.$dialog.confirm({
        //     width: 300,
        //     tipValue: '是否通过?',
        //     alertImg: 'warn',
        //     okCallBack: (data)=>{
        //       this.ajaxJson({
        //         url: '/PersonOffice/getPressIDVue',
        //         data: params,
        //         call: (data) => {
        //           this.category = data.message
        //           if (this.category) {
        //             let params = {
        //               id: data.message,
        //               kind: '1',
        //               tableName: '43',
        //               tableDetailName: '44',
        //               location: '0'
        //             }
        //             this.ajaxJson({
        //               url: '/PersonOffice/approvalYesVue',
        //               data: params,
        //               call: (data)=>{
        //                 if(data.type == '0'){
        //                   this.$dialog.setReturnValue(this.id)
        //                   this.$dialog.alert({
        //                     tipValue: data.message,
        //                     closeCallBack: () => {
        //                      location.reload()
        //                     }
        //                   })
        //                 }else if(data.type == '1'){
        //                   this.$dialog.alert({
        //                     tipValue: data.message,
        //                     alertImg: 'error',
        //                     closeCallBack: () => {
        //                     }
        //                   })
        //                 } else if(data.type == '2'){
        //                   this.$dialog.alert({
        //                     tipValue: data.message,
        //                     alertImg: 'error',
        //                     closeCallBack: () => {
        //                     }
        //                   })
        //                 }
        //               }
        //             })
        //           }
        //         }
        //       })
        //     }
        //   })
        // }
      },
      tableRejectEvent (item) { //主表驳回
        if(this.id){
          this.$dialog.OpenWindow({
            width: 1050,
            height: 720,
            url: '/rejectReason?category=12&id=' + this.id + '&tableName=43&tableDetailName=44&kind=1',
            closeCallBack: (data)=>{
              if(data){
                this.$dialog.setReturnValue(this.id)
                location.reload()
              }
            }
          })
        }
      },
    },

    watch: {
      detail () { // 监听列表是否有数据
        this.empty = this.detail.length === 0;
      },
      unitID () {
        this.otherAccountID = ''
        this.otherAccount = '' // 收款账号
      }
    },
    computed: {
      autoCalcIpt: function () {
        var bbc = 0
        var bcc
        for (let i = 0; i < this.detail.length; i++) {
          bbc += parseFloat(this.detail[i].money)
          bcc = bbc.toFixed(2)
        }
        return bcc
      }
    },
    created () {
      this.initData();
      this.selectedList();
    }
  }
</script>

<style scoped>
  .icon-search:before {
    color: #49a9ea;
  }
  .button_by>button{
   width: 80px;
    height: 34px;
    background-color: #49A8EA;
    border-radius: 4px;
    color: #fff;
  }
  .titBtnby{
    margin: 0 20px 0 258px;
  }
  .button_by .titBtndown{
    color: #FF0000;
  }
.btnIcon{
  line-height: 32px !important;
}
  .btnIcon:before{
    margin-right: 5px;
  }
  .btnIconColor{
    color: #FF0000;
  }
</style>
