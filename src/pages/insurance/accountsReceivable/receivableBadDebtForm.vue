<template>
    <div class="f_main">
      <yhm-formbody>
        <template #title>基本信息</template>
        <template #control>
          <yhm-form-text title="操作人" no-edit="1" :value="person" id="person"></yhm-form-text>
          <yhm-form-date title="坏账" subtitle="确认日期" :max="workDate" :max-year="Number(workDate.slice(0,4))" :value="workDate" id="openDate" rule="R0000"></yhm-form-date>
          <yhm-form-text title="坏账金额" tip="money" ref="money" before-icon="rmb" @blur="moneyBlur" :placeholder="'欠款金额'+balance" :value="money" id="money" rule="R1800"></yhm-form-text>
          <yhm-form-textarea title="原因说明" :value="remark" id="remark" rule="R0000"></yhm-form-textarea>
          <yhm-formupload :ownerID="id" :value="fileList" id="fileList" title="" tag="receivable" multiple="multiple"></yhm-formupload>

        </template>
      </yhm-formbody>
      <div class="f_split"></div>
      <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
        <template #btn>
          <yhm-commonbutton value="保存" icon="btnSave" :flicker="true" @call="save()"></yhm-commonbutton>
        </template>
      </yhm-formoperate>
    </div>
</template>

<script>
  import { formmixin } from '@/assets/form.js'
  import { formatDate } from '@/assets/common.js'
  export default {
    name: 'receivableBadDebtForm',
    mixins: [formmixin],
    data(){
      return{
        workDate: formatDate(new Date()),//当前日期
        fileList:[],
        money:'',
        remark:'',
        owerID:'',
        balance:'',//欠款金额
        person:'',//操作人
        personID:''//操作人id
      }
    },
    methods:{
      moneyBlur(){
        if(parseFloat(this.money)>parseFloat(this.balance)&&this.money!=''){
          this.$refs.money.errorEvent("坏账金额不能大于欠款金额"+this.balance)
        }
      },
      save(){
        let a = this.validator()
        if(a&&parseFloat(this.money)<=parseFloat(this.balance)){
          let params = {
            id:this.id,
            person:this.person,
            personID:this.personID,
            remark:this.remark,
            money:this.money,
            ownerID:this.ownerID,
            workDate:this.workDate+' 00:00:00',
            fileList:this.fileList
          }
          this.ajaxJson({
            url: '/finance/badDebt/save',
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
                  alertImg: 'warn',
                  tipValue: data.message
                })
              }
            }
          })
        }else if(parseFloat(this.money)>parseFloat(this.balance)){
          this.$refs.money.errorEvent("坏账金额不能大于欠款金额"+this.balance)
        }
      },
      // initData(){
      //   let params = {
      //     ownerID:this.ownerID
      //   }
      //   this.init({
      //     url: '/finance/badDebt/initForm',
      //     data: params,
      //     all: (data)=>{
      //       this.balance = data.balance
      //
      //     },
      //     add: (data)=> {
      //     },
      //     look: (data)=>{
      //     }
      //   })
      // },
    },
    created () {
      this.setQuery2Value('balance')
      this.setQuery2Value('ownerID')
      this.person = sessionStorage.getItem('____currentUser')
      this.personID = sessionStorage.getItem('____currentUserID')
      // this.initData()
    }

  }
</script>

<style scoped>

</style>
