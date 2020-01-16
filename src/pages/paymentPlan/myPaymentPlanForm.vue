<template>
  <div class="f_main">
    <yhm-formbody>
      <template #title>基本信息</template>
      <template #control>
        <yhm-form-drop-down-select :no-click="isSelect" title="收款方" width="1" @select="selectUnit" :select-list="personOrUnitList" :selectValue="personOrUnit" selectid="personOrUnit" :value="name" id="name" rule="R0000"></yhm-form-drop-down-select>
<!--        <yhm-form-select @click="selectUnit" title="收款单位" tip="value" :value="otherUnit" id="otherUnit" rule="R0000"></yhm-form-select>-->
      </template>
    </yhm-formbody>
    <div class="f_split"></div>
    <yhm-form-list-show>
      <template #title>事件信息</template>
      <template #operate v-if="isAddBtn">
        <yhm-commonbutton category="three" v-show="addButton" value="添加" icon="btnAdd" @call="addDetail()"></yhm-commonbutton>
      </template>
      <template #listHead>
        <yhm-managerth style="width: 38px" title="查看"></yhm-managerth>
        <yhm-managerth title="事件描述"></yhm-managerth>
        <yhm-managerth style="width: 120px" title="最迟日期"></yhm-managerth>
        <yhm-managerth style="width: 90px" title="付款金额"></yhm-managerth>
        <yhm-managerth style="width: 180px" title="编号"></yhm-managerth>
        <yhm-managerth style="width: 80px;" title="审批状态"></yhm-managerth>
        <yhm-managerth style="width: 38px;" title="删除"></yhm-managerth>
      </template>
      <template #listBody>
        <tr v-for="(item,index) in detail" :class="{InterlacBg:index%2!=0}" :key="item.id">
          <yhm-manager-td-look @click="listView(item.id)"></yhm-manager-td-look>
          <yhm-manager-td :value="item.name"></yhm-manager-td>
          <yhm-manager-td-date :value="item.lastDate"></yhm-manager-td-date>
          <yhm-manager-td-money :value="item.money"></yhm-manager-td-money>
          <yhm-manager-td :value="item.code"></yhm-manager-td>
          <yhm-manager-td :value="item.stateVal"></yhm-manager-td>
          <yhm-manager-td-operate>
            <yhm-manager-td-operate-delete @click="delFromList(item.id)"></yhm-manager-td-operate-delete>
          </yhm-manager-td-operate>
        </tr>
      </template>
      <template #empty>
        <span class="m_listNoData" v-show="empty">暂时没有数据</span>
      </template>
      <template #customize>
        <div class="tbBtmInfo autoCalc">
          <span>自动计算：</span>
          <p class="autoIpt" v-html="tenThousandFormatShow(autoCalcIpt)"></p>
        </div>
      </template>
    </yhm-form-list-show>

    <yhm-formoperate :createName="createName" v-if="btmShow" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn>
        <yhm-commonbutton value="提交申请" icon="btnSave" :flicker="true" @call="add()"></yhm-commonbutton>
      </template>
    </yhm-formoperate>
  </div>

</template>

<script>
import Qs from 'qs'
import { accMul, accAdd, guid } from '@/assets/common.js'
import { formmixin } from '@/assets/form.js'
export default {
  name: 'paymentForm',
  mixins: [formmixin],
  data () {
    return {
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
      isSelect: false
    }
  },
  methods: {
    addDetail () {
      if (this.validator()) {
        this.$dialog.OpenWindow({
          width: '1050',
          height: '570',
          url: '/PaymentPlanDetailForm?otherUnitID=' + this.otherUnitID + '&ownerID=' + this.id + '&personOrUnit=' + this.personOrUnit +  '&otherAccountID=' + this.otherAccountID,
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
    selectUnit () {
      if(this.personOrUnit === '0'){
        this.$dialog.OpenWindow({
          width: '950',
          height: '700',
          url: '/selectUnit?category=1&categoryBefore=1',
          title: '选择单位信息',
          closeCallBack: (data) => {
            if (data) {
              if(data.registrationNumber === ''){
                this.updataUnit(data.id)
                this.otherUnitID = data.id
              }else{
                this.name = data.name
                this.otherUnitID = data.id
              }
            }
          }
        })
      }else{
        this.$dialog.OpenWindow({
          width: '950',
          height: '700',
          url: '/selectPerson?category=1&categoryBefore=1',
          title: '选择联系人信息',
          closeCallBack: (data) => {
            if (data) {
              if(data.idNo === ''){
                this.updataPerson(data.id)
                this.otherUnitID = data.id
              }else{
                this.name = data.name
                this.otherUnitID = data.id
              }
            }
          }
        })
      }
    },
    updataUnit(id){
      this.$dialog.OpenWindow({
        width: '1050',
        height: '690',
        url: '/addUnitForm?id=' + id,
        title: '维护单位信息',
        closeCallBack: (info)=>{
          if(info){
            let params = {
              id: id
            }
            this.ajaxJson({
              url: '/Basic/getUnitName',
              data: params,
              call: (data)=>{
                if(data){
                  this.name = data.html
                }
              }
            })
          }else{
            this.name = ''
            this.otherUnitID = ''
          }
        }
      })
    },
    updataPerson(id){
      this.$dialog.OpenWindow({
        width: '1050',
        height: '750',
        url: '/addPersonForm?id=' + id,
        title: '维护联系人信息',
        closeCallBack: (info)=>{
          if(info){
            let params = {
              id: id
            }
            this.ajaxJson({
              url: '/Basic/getPersonName',
              data: params,
              call: (data)=>{
                if(data){
                  this.name = data.html
                }
              }
            })
          }else{
            this.name = ''
            this.otherUnitID = ''
          }
        }
      })
    },
    delFromList (id) { // 删除id
        this.$dialog.confirm({
          width: 300,
          tipValue: '确定删除本条数据?',
          btnValueOk: '确定',
          alertImg: 'warn',
          okCallBack: (data) => {
            this.ajaxJson({
              url: '/PersonOffice/deletePaymentPlanDetail',
              data: {
                id: id
              },
              call: (data) => {
                if (data.type === 0) {
                  this.$dialog.setReturnValue(this.id)
                  this.$dialog.alert({
                    tipValue: data.message
                  })
                  this.detail.splice(id, 1)

                }else if(data.type === 1){
                  this.$dialog.alert({
                    alertImg:'warn',
                    tipValue: data.message
                  })
                }
              }
            })
          }
        })
    },
    listView (id) {
      // this.btmShow = false
      if (id) {
        this.$dialog.OpenWindow({
          width: 1050,
          height: 570,
          url: '/PaymentPlanDetailForm?id=' + id,

          title: '查看付款计划详情信息',

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
                }
              })
            }
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
    initData () {
      this.init({
        url: '/personOffice/getPaymentPlanById',
        all: (data)=>{

          this.personOrUnitList = data.personOrUnitPsd.list
          this.personOrUnit = data.personOrUnitPsd.value

        },
        add: (data)=>{
          this.btmShow = false
        },
        look: (data)=>{
          this.detail = data.list
          this.personOrUnit = data.personOrUnit
          this.name = data.otherUnit
          this.content = data
          this.otherUnitID = data.otherUnitID
          for (let i in this.content[0]) {
            this.otherUnit = this.content[0][i].otherUnit
            this.otherAccount = this.content[0][i].otherAccount
            this.otherUnitID = this.content[0][i].otherUnitID
            this.otherAccountID = this.content[0][i].otherAccountID
          }
          let isDetailList = data[1]
          for(let i in isDetailList){
            if(isDetailList[i].state !== '0'){
              this.btmShow = false
              this.isAddBtn = false
            }else{
              this.btmShow = true
              this.isAddBtn = true
            }
          }
          if(data.state!=0 || data.isFinish == 1){
            this.addButton=false
          }
          if(data.state !== '0'){
            this.btmShow = false
          }
        }
      })
    }
  },
  watch: {
    detail () { // 监听列表是否有数据
      if (this.detail.length === 0) {
        this.empty = true
        this.btmShow = false
        this.isSelect = false
      } else {
        this.empty = false
        this.isSelect = true
      }
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
    this.initData()
  }
}
</script>

<style scoped>

.icon-search:before{
  color: #49a9ea;
}
</style>
