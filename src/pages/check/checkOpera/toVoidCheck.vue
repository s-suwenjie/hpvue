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
      <template #title>作废信息</template>
      <template #control>
        <yhm-form-date title="作废日期" :value="scrapDate" :max="afterDate" :min="beforeDate" id="scrapDate" rule="R0000" position="u" :no-edit="true"></yhm-form-date>
        <yhm-form-select title="作废人员" :value="scrapPeople" id="scrapPeople" tip="value" rule="R0000" :no-click="true"></yhm-form-select>
        <yhm-form-textarea title="作废原因" :value="scrapCause" id="scrapCause" rule="R0000"></yhm-form-textarea>
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
    name: 'toVoidCheck',
    mixins: [formmixin],
    data(){
      return{
        ownerID:'',
        unitName: '',
        openDate: '',
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
        scrapDate: formatDate(new Date()),
        scrapPeopleID: '',
        scrapPeople: '',
        scrapCause: '',
        afterDate: formatDate(new Date()),
        beforeDate:'',
      }
    },
    methods: {
      save(){
        if(this.validator()){
          let params = {
            id:this.ownerID,
            scrapPeople:this.scrapPeople,
            scrapPeopleID:this.scrapPeopleID,
            scrapDate:this.scrapDate,
            scrapCause:this.scrapCause,
          }
          this.ajaxJson({
            url: '/Bill/checksInvalidFormSave',
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
          ownerID: this.ownerID
        }
        this.init({
          url: '/Bill/checksUseForm',
          data: params,
          all: (data) => {
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
            this.beforeDate = data.workDate
          },
          add: (data)=>{

          },
          look: (data)=>{

          }
        })
      }
    },
    created () {
      this.setQuery2Value('ownerID')
      this.initData()
      /* 获取session的登录用户和登陆用户ID */
      this.scrapPeople = sessionStorage.getItem('____currentUser')
      this.scrapPeopleID = sessionStorage.getItem('____currentUserID')
    }
  }
</script>

<style scoped>

</style>
