<template>
  <div class="f_main">
    <yhm-formbody>
      <template #title>基本信息</template>
      <template #control>
        <yhm-form-select title="所属公司" :value="unitName" id="unitName" tip="value" rule="R0000" :no-click="true"></yhm-form-select>
        <yhm-form-date title="入库日期" :value="workDate" id="workDate" tip="value" rule="R0000" position="b" :no-edit="true"></yhm-form-date>
        <yhm-form-text title="支票号码" :value="code" id="code" rule="R0000" no-edit="1"></yhm-form-text>
        <yhm-form-radio title="支票类型" :select-list="categoryList" :value="category" id="category" rule="R0000" :no-edit="true"></yhm-form-radio>
        <yhm-form-select title="对应账号" width="1" :value="account" id="account" tip="value" rule="R0000" :no-click="true"></yhm-form-select>
        <yhm-form-radio title="支票状态" width="1" :select-list="stateList"  :value="state" id="state" rule="R0000" :no-edit="true"></yhm-form-radio>
      </template>
    </yhm-formbody>
    <div class="f_split"></div>
    <yhm-formbody>
      <template #title>填开信息</template>
      <template #control>
        <yhm-form-radio title="收款" subtitle="对象类型"  :no-show-item="categoryOtherNoList" :select-list="categoryOtherList" :no-edit="isCategoryOther" @call="categoryOtherTypeEvent" :value="categoryOther" id="categoryOther" rule="R0000"></yhm-form-radio>
        <yhm-form-select title="收款人" @click="otherAccountEvent" :no-click="isOther" :value="other" id="other" tip="value" rule="R0000" ></yhm-form-select>
        <yhm-form-radio title="所属系统" width="1" :select-list="ownerSysList" :no-show-item="ownerSysNoList" :value="ownerSys" id="ownerSys" rule="R0000" :no-edit="isThisUnit"></yhm-form-radio>
        <yhm-form-date title="开具日期" :value="openDate" id="openDate" tip="value" rule="R0000" position="b"></yhm-form-date>
        <yhm-form-text title="开具日期" subtitle="中文格式" :value="openDateUp" id="openDateUp" tip="value" rule="R0000" no-edit="1"></yhm-form-text>

        <yhm-form-text title="开具金额" :value="money" :no-edit="isMoney" id="money" rule="R3000" tip="money" before-icon="rmb"></yhm-form-text>
        <yhm-form-text title="开具金额" subtitle="中文格式" :value="capitalMoney" id="capitalMoney" rule="R0000" no-edit="1"></yhm-form-text>

        <yhm-form-select title="开具人员" :no-click="true" :value="userPerson" id="userPerson" @click="userPersonEvent" tip="value" rule="R0000"></yhm-form-select>
        <yhm-form-textarea title="开票用途" :value="useRemark" id="useRemark" rule="R0000"></yhm-form-textarea>
        <yhm-form-textarea title="备注" :value="remark" id="remark"></yhm-form-textarea>
      </template>
    </yhm-formbody>

    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn>
        <yhm-commonbutton value="保存" icon="btnSave" :flicker="true" @call="save()" category="one"></yhm-commonbutton>
      </template>
    </yhm-formoperate>
  </div>
</template>

<script>
  import { formmixin } from '@/assets/form.js'
  import { formatDate ,accAdd, guid,number2chinese,formatCnDate} from '@/assets/common.js'
  export default {
    name: 'checkFillOut',
    mixins: [formmixin],
    data(){
      return {
        id: '',
        ownerID:'',
        unitName: '',
        openDate: formatDate(new Date()),
        openDateUp: '',
        code: '',
        account: '',
        accountID: '',
        state: '',
        workDate: '',
        stateList: [],
        getOperator: '',
        getOperatorID: '',
        category: '',
        categoryList: [],
        isCategoryOther:false,
        categoryOther: '',
        categoryOtherList: [],
        isOther:false,
        other: '',
        otherID:'',
        money: '',
        isMoney:'0',
        capitalMoney: '',
        ownerSysList: [],
        ownerSys: '',
        userPerson: '',
        userPersonID: '',
        useRemark: '',
        remark: '',
        isThisUnit: true,
        otherOld: '',
        otherIDOld: '',
        ownerSysNoList: [],
        categoryOtherNoList:[],

        otherOwnerID:'',
        otherCategory:'',
      }
    },
    methods: {

      /* 选择开具人员 */
      userPersonEvent(){
        this.$dialog.OpenWindow({
          width: '950',
          height: '700',
          url: '/selectPerson?category=0',
          title: '选择开具人员',
          closeCallBack: (data)=>{
            if(data){
              this.userPerson = data.name
              this.userPersonID = data.id
            }
          }
        })
      },
      otherAccountEvent(){
        let url = '/selectUnit?categoryBefore=1&category='+this.categoryOther
        if(this.categoryOther === '1'){
          url = '/selectUnit?categoryBefore=1&category='+this.categoryOther
        }
        if(this.categoryOther === '2'){
          url = '/selectPerson?categoryBefore=0&category=1'
        }
        this.$dialog.OpenWindow({
          width: '950',
          height: '692',
          title: '选择收款方',
          url: url,
          closeCallBack: (data)=>{
            if(data){
              if(data.person){
                this.other = data.person
                this.otherID = data.id
              }else {
                this.other = data.name
                this.otherID = data.id
              }
            }
          }
        })
      },

      switchSownerSys(){
        if(this.categoryOther === '0'){
          this.isThisUnit = true
          if( this.ownerSys !== '2'){
            this.ownerSys = '2'
          }
          this.ownerSysNoList = ['0','1']
        }else{
          if(this.ownerSys !== '0' || this.ownerSys !== '1'){
            this.ownerSys = '0'
          }
          this.ownerSysNoList = ['2']
          this.isThisUnit = false
        }
      },

      categoryOtherTypeEvent(){
        if(this.category==='1'){
          this.categoryOtherNoList = ['2']
        }
        this.switchSownerSys()
        this.other = ''
        this.otherID = ''
      },
      save(){
        if(this.validator()){
          let params = {
            id: this.id,
            ownerID: this.ownerID,
            categoryOther: this.categoryOther,
            other: this.other,
            otherID: this.otherID,
            ownerSys: this.ownerSys,
            openDate: this.openDate,
            openDateUp: this.openDateUp,
            money: this.money,
            moneyUp: this.capitalMoney,
            userPerson: this.userPerson,
            userPersonID: this.userPersonID,
            useRemark: this.useRemark,
            remark: this.remark,
            otherOwnerID: this.otherOwnerID,
            otherCategory: this.otherCategory
          }
          this.ajaxJson({
            url: '/Bill/checksUseFormSave',
            data: params,
            call: (data)=>{
              if(data.type === 0){
                this.$dialog.setReturnValue(this.id)
                this.$dialog.alert({
                  tipValue: data.message,
                  closeCallBack: ()=>{
                    this.$dialog.close()
                  }
                })
              }else{
                this.$dialog.alert({
                  alertImg: 'error',
                  tipValue: data.message
                })
              }
            }
          })
        }
      },
      initData(){
        let params = {
          ownerID: this.ownerID,
          otherOwnerID:this.otherOwnerID,
          otherCategory:this.otherCategory,
        }
        this.init({
          url: '/Bill/checksUseForm',
          data: params,
          all: (data)=>{
            this.unitName = data.unitName
            this.workDate = data.workDate
            this.code = data.code
            this.getOperator = data.getOperator
            this.getOperatorID = data.getOperatorID
            this.categoryList = data.categoryPsd.list
            this.category = data.categoryPsd.value
            this.account = data.account
            this.accountID = data.accountID
            this.state = data.statePsd.value
            this.stateList = data.statePsd.list
            this.categoryOther = data.categoryOtherPsd.value
            this.categoryOtherList = data.categoryOtherPsd.list
            this.ownerSysList = data.ownerSysPsd.list
            this.ownerSys = data.ownerSysPsd.value
            this.otherID = data.otherID
            this.other = data.other


            this.otherOld = data.other
            this.otherIDOld = data.otherID
            if(this.category==='1'){
              this.categoryOtherNoList = ['2']
            }
            if(this.otherOwnerID){
              this.isCategoryOther=true
              this.isOther=true
              this.money = data.money
              this.switchSownerSys()
              this.isThisUnit = true
              this.isMoney = '1'
              this.useRemark=data.useRemark
            }
          },
            add: (data)=>{
            this.id = guid()
          },
          look: (data)=>{
            this.quantity = data.quantity
            this.actualQuantity = data.actualQuantity
            this.list = data.detailList


          }
        })
      }
    },
    created () {
      this.setQuery2Value('ownerID')
      this.setQuery2Value('otherOwnerID')
      this.setQuery2Value('otherCategory')
      this.userPerson = sessionStorage.getItem('____currentUser')
      this.userPersonID = sessionStorage.getItem('____currentUserID')
      this.initData()
      this.openDateUp = formatCnDate(new Date(this.openDate))
    },
    watch: {
      money () {
        this.capitalMoney = number2chinese(this.money)
      },
      openDate () {
        this.openDateUp = formatCnDate(new Date(this.openDate))
      }
    }
  }
</script>

<style scoped>

</style>
