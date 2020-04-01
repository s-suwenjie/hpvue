<template>
  <div class="f_main">
    <yhm-view-body>
      <template #title>基本信息</template>
      <template #body>
        <yhm-view-control category="3" title="收款方" :content="otherUnit"></yhm-view-control>
      </template>
    </yhm-view-body>

    <div class="f_split"></div>
    <div class="i-left fs48b colorFFF" title="上一条" v-show="isLeftID"  @click="leftStrip" style="width:48px;height:70px;background: #000;opacity:0.3;position: fixed;  bottom:300px;z-index: 9999;display:flex;justify-content:center;align-items:center;"></div>
    <div class="i-right fs48b colorFFF" title="下一条" v-show="isRightID" @click="rightStrip" style="width:48px;height:70px;background: #000;opacity:0.3;position: fixed;  bottom:300px;right:0px;z-index: 9999;display:flex;justify-content:center;align-items:center;"></div>

    <yhm-view-tab :customize="true" :pager="false">
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
              <yhm-managerth style="width: 200px" title="状态"></yhm-managerth>
            </template>
            <template #listBody>
              <tr v-for="(item,index) in detail" :class="{InterlacBg:index%2!=0}" :key="item.id">
                <yhm-manager-td-look @click="listView(item,item.id)"></yhm-manager-td-look>
                <yhm-manager-td :value="item.name"></yhm-manager-td>
                <yhm-manager-td-date :value="item.lastDate"></yhm-manager-td-date>
                <yhm-manager-td-money :value="item.money"></yhm-manager-td-money>
                <yhm-manager-td :value="item.code"></yhm-manager-td>
                <yhm-manager-td-center :value="item.stateVal"></yhm-manager-td-center>
              </tr>
            </template>
            <template #customize>
              <yhm-view-control type="money" category="2" title="自动计算" :content="autoCalcIpt" color="#4BB414"></yhm-view-control>
            </template>
        </yhm-view-tab-list>
      </template>
    </yhm-view-tab>
    <yhm-formoperate :createName="createName" v-if="btmShow" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn>
        <yhm-commonbutton value="提交申请" icon="btnSave" :flicker="true" @call="add()"></yhm-commonbutton>
      </template>
    </yhm-formoperate>
  </div>

</template>

<script>
  import { formmixin } from '@/assets/form.js'
  export default {
    name: 'paymentPlanFormView',
    mixins: [formmixin],
    data () {
      return {
        tabState:[{select:true}],
        content: {},
        otherUnitID: '',
        otherUnit: '', // 收款单位
        otherAccountID: '',
        otherAccount: '', // 收款账号
        bcc: 0,
        detail: {}, // 列表数据
        detailID: '',
        empty: true,
        btmShow: true,
        addButton:true,
        list: {},
        category: '',
        isAddBtn: true,
        personOrUnitList:[],
        personOrUnit:'',
        personOrUnitID: '',
        name: '',

        isLeftID:false,//延长按钮
        leftID:'',//上一条ID
        isRightID:false,//延长按钮
        rightID:'',//下一条ID
      }
    },
    methods: {
      leftStrip(){
        window.location='/PaymentPlanFormView?id='+this.leftID
      },
      rightStrip(){
        window.location='/PaymentPlanFormView?id='+this.rightID
      },
      addDetail () {
        if (this.validator()) {
          let otherUnitID = this.otherUnitID
          let otherAccountID = this.otherAccountID
          this.$dialog.OpenWindow({
            width: '1050',
            height: '600',
            url: '/PaymentPlanDetailForm?otherUnitID=' + otherUnitID + '&ownerID=' + this.id + '&personOrUnit=' + this.personOrUnit +  '&otherAccountID=' + this.otherAccountID,
            title: '添加事件信息',
            closeCallBack: (data) => {
              this.$dialog.setReturnValue(this.id)
              let params = {
                id: data
              }
              if (data) {
                this.ajaxJson({
                  url: '/PersonOffice/getPaymentPlanDetailList',
                  data: params,
                  call: (data) => {
                    this.detail = data
                    this.btmShow = true
                    for(let i in this.detail){
                      if(this.detail[i].state !== '0'){
                        this.btmShow = false
                      }
                    }
                  }
                })
              }
            }
          })
        } else {
          this.$dialog.alert({
            tipValue: '请选择收款单位',
            alertImg: 'error',
            width: '320'
          })
        }
      },
      listView (item,id) { //查看
        if (id) {
          this.$dialog.OpenWindow({
            width: 1050,
            height: 600,
            url: '/paymentPlanDetailFormView?id=' + id,
            title: '查看事件信息',
            closeCallBack: () => {

            }
          })
        }
      },
      add () {
        let params = {
          id: this.id,
          tableName : 43
        }
        this.$dialog.confirm({
          width: 300,
          tipValue: '确定提交申请?',
          btnValueOk: '确定',
          alert: 'warn',
          okCallBack: (data) => {
            this.ajaxJson({
              url: '/PersonOffice/getSubmitCatrgoryVue',
              data: params,
              call: (data) => {
                this.category = data.message
                if (this.category) {
                  let params = {
                    id: this.id,
                    category: this.category,
                    tableName: 43,
                    isDetail: 1,
                    tableDetailName: 44
                  }
                  this.ajaxJson({
                    url: '/PersonOffice/approvalSubmitVue',
                    data: params,
                    call: (data) => {
                      if (data.type === 0) {
                        this.$dialog.alert({
                          tipValue: data.message,
                          closeCallBack: () => {
                            this.$dialog.setReturnValue(this.id)
                            this.initData()
                            this.$dialog.close()
                          }
                        })
                      } else {
                        this.$dialog.alert({
                          alertImg: 'error',
                          tipValue: data.message,
                          closeCallBack: () => {
                          }
                        })
                      }
                    }
                  })
                }else{
                  this.$dialog.alert({
                    tipValue: '没有获取到提交数据!',
                    alertImg: 'error'
                  })
                }
              }
            })
          }
        })
      },
      initData(){
        this.init({
          url: '/PersonOffice/getPaymentPlanById',
          all: (data) => {
            /* 公共 无论查看和添加返回数据 */
          },
          add: (data) => {
            /* 需要添加的数据 */
          },
          look: (data) => {
            /* 需要查看的数据 */
            this.otherUnit = data.otherUnit
            this.detail = data.list
            if(this.detail[0].state==0&&this.detail[0].isFinish==0){//判断是否为未提交状态
              this.btmShow=true//提交申请按钮
              this.addButton=true//添加按钮
            }else{
              this.btmShow=false//提交申请按钮
              this.addButton=false//添加按钮
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
      }
    },
    created () {
      this.initData()
      this.selectedList()

    },
    computed:{
      autoCalcIpt: function () {
        var bbc = 0
        var bcc
        for(let i = 0;i<this.detail.length;i++){
          bbc += parseFloat(this.detail[i].money)
          bcc = bbc.toFixed(2)
        }
        return bcc + ''
      }
    }
  }
</script>

<style scoped>
  .icon-search:before{
    color: #49a9ea;
  }
</style>
