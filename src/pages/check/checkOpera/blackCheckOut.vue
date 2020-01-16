<template>
  <div class="f_main">
    <yhm-formbody>
      <template #title>基本信息</template>
      <template #control>
        <yhm-form-select title="所属公司" :value="unitName" id="unitName" tip="value" rule="R0000" :no-click="true"></yhm-form-select>
        <yhm-form-date title="入库日期" :value="workDate" id="workDate" tip="value" rule="R0000" :no-edit="true"></yhm-form-date>
        <yhm-form-text title="支票号码" :value="code" id="code" rule="R0000" no-edit="1"></yhm-form-text>
        <yhm-form-radio title="支票类型" :select-list="categoryList" :value="category" id="category" rule="R0000" :no-edit="true"></yhm-form-radio>
        <yhm-form-select title="对应账号" width="1" :value="account" id="account" tip="value" rule="R0000" :no-click="true"></yhm-form-select>
        <yhm-form-radio title="支票状态" width="1" :select-list="stateList"  :value="state" id="state" rule="R0000" :no-edit="true"></yhm-form-radio>
      </template>
    </yhm-formbody>
    <div class="f_split"></div>
    <yhm-formbody>
      <template #title>外带信息</template>
      <template #control>
        <yhm-form-radio title="单位类型" @call="categoryUnitEvent" :select-list="categoryUnitList"  :value="categoryUnit" id="categoryUnit" rule="R0000"></yhm-form-radio>

        <yhm-form-select title="外带单位" :show="isOutUnit" @click="outToUnitEvent" :value="outToUnit" id="outToUnit" tip="value" rule="R0000"></yhm-form-select>
        <yhm-form-select title="外带人员" @click="outToPersonEvent" :value="outToPerson" id="outToPerson" tip="value" rule="R0000"></yhm-form-select>
        <yhm-form-date title="外带日期" :value="outToDate" id="outToDate" position="u" rule="R0000"></yhm-form-date>
        <yhm-form-text title="外带用途" :value="outToUse" id="outToUse" rule="R0000" ></yhm-form-text>
        <yhm-form-date title="预计填开/" subtitle="退回日期" :value="predictBackDate" id="predictBackDate" position="u" rule="R0000"></yhm-form-date>
        <yhm-form-text title="批准人"  :value="approvePerson" id="approvePerson" tip="value" rule="R0000" no-edit="1"></yhm-form-text>
      </template>
    </yhm-formbody>
    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn>
        <yhm-commonbutton value="保存" icon="btnSave" :flicker="true" @call="save()"></yhm-commonbutton>

      </template>
    </yhm-formoperate>
  </div>
</template>

<script>
  import { formmixin } from '@/assets/form.js'
  import { formatDate ,accAdd, guid,number2chinese,formatCnDate} from '@/assets/common.js'
  export default {
    name: 'blackCheckOut',
    mixins: [formmixin],
    data() {
      return{
        id: '',
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
        category: '',
        categoryList: [],
        categoryUnit: '',
        categoryUnitList: [],
        outToPerson: '',
        outToPersonID: '',
        outToDate: formatDate(new Date()),
        outToUse: '',
        predictBackDate: '',
        approvePerson: '',
        approvePersonID: '',
        outToUnit: '',
        outToUnitID: '',

        isOutUnit: false
      }
    },
    methods:{
      save(){//保存
        if(this.validator()){
          let params = {
            id:guid(),
            ownerID:this.ownerID,
            categoryUnit:this.categoryUnit,//单位类型
            outToUnitID:this.outToUnitID,//外带单位
            outToPersonID:this.outToPersonID,//外带人员
            outToDate:this.outToDate,//外带日期
            outToUse:this.outToUse,//外带用途
            predictBackDate:this.predictBackDate,//预计填开/退回日期
            approvePersonID:this.approvePersonID,//批准人
            backDate:''
          }
          this.ajaxJson({
            url: '/Bill/checksOutToFormSave',
            data: params,
            call: (data) => {
              if(data.type === 0){
                this.$dialog.setReturnValue('this.id')
                this.$dialog.alert({
                  tipValue: data.message,
                  closeCallBack: (data)=>{
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
      /* 外带单位切换 */
      categoryUnitEvent(){
        this.outToUnit=''
        this.outToUnitID=''
        this.outToPerson=''
        this.outToPersonID=''
        this.isOutUnit = this.categoryUnit === '1';
      },
      /* 外带单位 */
      outToUnitEvent(){
        this.$dialog.OpenWindow({
          width: '950',
          height: '700',
          url: '/selectUnit?category='+this.categoryUnit +'&categoryBefore=1',
          title: '选择外带单位信息',
          closeCallBack: (data) => {
            if (data) {
              this.outToUnit=data.name
              this.outToUnitID=data.id
            }
          }
        })
      },
      /* 外带人员 */
      outToPersonEvent(){
        this.$dialog.OpenWindow({
          width: '950',
          height: '700',
         url: '/selectPerson?category='+this.categoryUnit +'&categoryBefore=1',
          title: '选择外带人员信息',
          closeCallBack: (data) => {
            if (data) {
              this.outToPerson=data.name
              this.outToPersonID=data.id
            }
          }
        })
      },
      initData(){
        let params = {
          ownerID: this.ownerID
        }
        this.init({
          url: 'Bill/checksOutToForm',
          data: params,
          all: (data)=>{
            this.unitName = data.unitName
            this.workDate = data.workDate
            this.code = data.code
            this.categoryList = data.categoryPsd.list
            this.category = data.categoryPsd.value
            this.account = data.account
            this.accountID = data.accountID
            this.state = data.statePsd.value
            this.stateList = data.statePsd.list
            this.categoryUnitList = data.categoryUnitPsd.list
            this.categoryUnit = data.categoryUnitPsd.value
          },
          add: (data)=>{

          },
          look: (data)=>{

          }
        })
      }
    },
    created () {
      this.approvePerson = sessionStorage.getItem('____currentUser')
      this.approvePersonID = sessionStorage.getItem('____currentUserID')
      this.setQuery2Value('ownerID')
      this.initData()
    }
  }
</script>

<style scoped>

</style>
