<template>
  <div class="f_main">
    <yhm-view-body>
      <template #title>基本信息</template>
      <template #body>
        <yhm-view-control title="事件描述" category="2" :content="name"></yhm-view-control>
        <yhm-view-control title="品牌" :content="brand" :psd="brandList"></yhm-view-control>
        <yhm-view-control title="事件类型" category="2" :content="cause" class="eventType"></yhm-view-control>
        <yhm-view-control title="最迟付款日期"  :content="lastDate" type="date"></yhm-view-control>
        <yhm-view-control title="付款金额" color="#f00" :content="money" type="money"></yhm-view-control>
        <yhm-view-control title="编号"  :content="code" ></yhm-view-control>
        <yhm-view-control title="生成申请" :content="isAuto" :psd="isAutoList"></yhm-view-control>
        <yhm-view-control title="文件" type="files" category="3" :content="fileList"></yhm-view-control>
      </template>
    </yhm-view-body>
    <div class="f_split" v-show="rejectCause === ''?false:true"></div>
    <yhm-view-body v-show="rejectCause === ''?false:true">
      <template #title >驳回理由</template>
      <template #body>
        <yhm-view-control title="驳回理由"   :content="rejectCause"></yhm-view-control>
      </template>
    </yhm-view-body>
    <yhm-formoperate :createName="createName" v-show="isApproval==='0'" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate" >
      <template #btn >
        <yhm-commonbutton value="通过"  :flicker="true" @call="adoptEvent(id)"  icon="i-btm-applicationSm" class="btnIcon"></yhm-commonbutton>
        <yhm-commonbutton value="驳回"   @call="rejectEvent(id)" icon="i-btn-turnDown" class="btnIcon btnIconColor"></yhm-commonbutton>
      </template>
    </yhm-formoperate>
    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn v-if="isBtn">
        <yhm-commonbutton value="保存" icon="btnSave" :flicker="true" @call="save()"></yhm-commonbutton>
        <yhm-commonbutton value="保存并新增" v-show="isLook" class="btnAddSave" icon="btnAddSave" @call="btnAddSave()"></yhm-commonbutton>
      </template>
    </yhm-formoperate>
  </div>
</template>

<script>
import { accMul, accAdd, guid, formatDate } from '@/assets/common.js'
import { formmixin } from '@/assets/form.js'
export default {
  name: 'paymentEventForm',
  mixins: [formmixin],
  data () {
    return {
      otherUnitID: '',
      otherAccountID: '',
      name: '', // 涵盖事件
      ownerID: '',
      category: '', // 事件类型,
      causeID: '', // 事由ID(事件)
      cause: '', // 事由文字(事件)

      brand: '', // 所属品牌
      brandList: [],
      useNum: '0', // 用途代码
      lastDate: '',
      money: '', // 付款金额
      code: '', // 编号
      subjectCode: '', // 编号
      isAuto: '0',
      categoryList: [],
      useNumList: [],
      isAutoList: [],
      handleButton:true,
      rejectCause:'',
      causeNum: '',
      nowDate: formatDate(new Date()),
      fileList: [],
      state: '0',
      isFinish: '0',
      unitID: '',
      approvalHtml: '',
      isLook: true,
      isBtn: true
    }
  },
  created () {
    this.setQuery2Value('ownerID')
    this.setQuery2Value('otherUnitID')
    this.setQuery2Value('otherAccountID')
    this.setQuery2Value('id')
    this.setQuery2Value('isApproval')
    this.setQuery2Value('rejectCause')
    this.init({
      url: '/PersonOffice/initPaymentPlanDetailForm',
      all: (data) => {

        /* 公共 无论查看和添加返回数据 */
        this.rejectCause = data.rejectCause
        this.categoryList = data.categoryPsd.list
        this.category = data.categoryPsd.value


        this.useNumList = data.useNumPsd.list
        this.useNum = data.useNumPsd.value
      },
      add: (data) => {
        /* 需要添加的数据 */
      },
      look: (data) => {
        /* 需要查看的数据 */
        this.isAutoList = data.isAutoPsd.list
        this.isAuto = data.isAutoPsd.value
        this.brandList = data.brandPsd.list
        this.brand = data.brandPsd.value
        this.name = data.name
        this.lastDate = data.lastDate
        this.code = data.code
        this.cause = data.cause
        this.causeID = data.causeID
        this.money = data.money
        this.state = data.state
        this.isFinish = data.isFinish
        this.unitID = data.unitID
        this.otherUnitID = data.otherUnitID
        this.otherAccountID = data.otherAccountID
        this.ownerID = data.ownerID
        this.fileList = data.files
        this.approvalHtml = data.approvalHtml
        this.rejectCause = data.rejectCause
        this.isLook = false
        this.isBtn = data.state === '0'
      }
    })
  },
  methods: {
    adoptEvent (id) { //子表通过
      if(id){
        let params = {
          id: id,
          tableName: 43,
          kind:2,
          tableDetailName:44,
        }

        this.$dialog.confirm({
          width: 300,
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
                      this.$dialog.close()
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
    rejectEvent (id) { //子表驳回
      // if(this.isApproval==='1'){
      //   return
      // }
      if(id){

        this.$dialog.OpenWindow({
          width: 1050,
          height: 720,
          url: '/rejectReason?category=12' +'&id=' + id+ '&tableName=43&tableDetailName=44&kind=2',
          closeCallBack: (data)=>{
            if(data){
              this.$dialog.setReturnValue(this.id)
              location.reload()
            }
          }
        })
      }
    },
    initCode () {
      if (this.lastDate !== '') {
        let params = {
          otherUnitID: this.otherUnitID,
          useNum: this.subjectCode,
          lastDate: this.lastDate
        }
        this.ajaxJson({
          url: '/PersonOffice/initPaymentPlanDetailCode',
          data: params,
          loading: '0',
          call: (data) => {
            if (data.type == '0') {
              this.code = data.message
              this.unitID = data.html
            } else {
            }
          }
        })
      }
    },
    btnAddSave(){
      if (this.validator()) {
        var params = {
          id: this.id,
          ownerID: this.ownerID,
          otherUnitID: this.otherUnitID,
          otherAccountID: this.otherAccountID,
          money: this.money,
          code: this.code,
          name: this.name,
          branch: this.brand,
          lastDate: this.lastDate,
          cause: this.cause,
          causeID: this.causeID,
          useNum: this.useNum,
          category: this.category,
          isAuto: this.isAuto,
          files: this.fileList,
          state: this.state,
          isFinish: this.isFinish,
          unitID: this.unitID
        }
        this.ajaxJson({
          url: '/PersonOffice/savePaymentPlanDetail',
          data: params,
          call: (data) => {
            if (data.type === 0) {
              this.$dialog.setReturnValue(this.ownerID)
              this.$dialog.alert({
                tipValue: data.message,
                closeCallBack: () => {
                  this.$dialog.refresh()
                }
              })
            }else if(data.type === 1){
              this.$dialog.alert({
                alertImg:'warn',
                tipValue: data.message
              })
            }
          }
        })
      } else {
        return false
      }
    },
    save () {
      if (this.validator()) {
        var params = {
          id: this.id,
          ownerID: this.ownerID,
          otherUnitID: this.otherUnitID,
          otherAccountID: this.otherAccountID,
          money: this.money,
          code: this.code,
          name: this.name,
          branch: this.brand,
          lastDate: this.lastDate,
          cause: this.cause,
          causeID: this.causeID,
          useNum: this.useNum,
          category: this.category,
          isAuto: this.isAuto,
          files: this.fileList,
          state: this.state,
          isFinish: this.isFinish,
          unitID: this.unitID,
          // state:0,
        }
        this.ajaxJson({
          url: '/PersonOffice/savePaymentPlanDetail',
          data: params,
          call: (data) => {
            if (data.type == 0) {
              this.$dialog.setReturnValue(this.ownerID)
              this.$dialog.alert({
                tipValue: data.message,
                closeCallBack: () => {
                  this.$dialog.close()
                }
              })
            }else if(data.type == '1'){
              this.$dialog.alert({
                alertImg:'warn',
                tipValue: data.message
              })
            }
          }
        })
      } else {
        return false
      }
    },
    selectCause () {
      var name = '65'
      if (this.category == '1') {
        name = '63'
      }
      this.$dialog.OpenWindow({
        width: 950,
        height: 604,
        url: '/selectDic?name=' + name,
        title: '选择事由',
        closeCallBack: (data) => {
          let dicName
          if (data) {
            this.causeID = data.id
            if (data.showName) {
              dicName = data.value2 + ' ------ ' + data.value1 + ' ------ ' + data.showName
            }
            if (!data.value1) {
              dicName = data.value2 + ' ------ ' + data.showName
            }
            if (!data.value2) {
              dicName = data.value1 + ' ------ ' + data.showName
            }
            this.subjectCode = data.value11
            this.initCode()
            this.cause = dicName
          }else if(data == undefined){
          }
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
  @import "../../../static/bjFlow.css";
  .btnAddSave{
    border: 1px solid #bfbfbf;
    color: #333;
    background-color: #fff;
  }
  .btnAddSave:hover{
    color: #fff;
    background-color: #49a9ea;
    border: 1px solid #49a9ea;
  }
  .btnIconColor{
    color: #FF0000;
  }
  .eventType{
    white-space: nowrap;
  }
</style>
