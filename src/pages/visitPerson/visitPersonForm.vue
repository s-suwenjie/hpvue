<template>
  <div class="f_main">
    <yhm-formbody>
      <template #title>基本信息</template>
      <template #control>
        <yhm-form-text title="姓名" :value="visitName" id="visitName" rule="R7000" @blur="codeEvent"></yhm-form-text>
        <yhm-form-text title="手机号码" :value="phoneNumber" id="phoneNumber" tip="value" :rule="isRulePhone?'R4000':''" @blur="phoneEvent"></yhm-form-text>
        <yhm-form-text title="编码" :value="code" id="code" no-edit="1"></yhm-form-text>
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
  import { guid } from '@/assets/common.js'
  export default {
    name: 'personTotalForm',
    mixins: [formmixin],
    data(){
      return {
        id: '',
        visitName: '',
        oldVisitName: '',
        phoneNumber: '',
        code: '',
        personID: '',
        workOrder: '',
        isRulePhone: true
      }
    },
    methods: {
      phoneEvent(){
        if(this.phoneNumber !== ''){
          this.isRulePhone = true
        }else{
          this.isRulePhone = false
        }

      },
      codeEvent(){
        if(this.visitName !== this.oldVisitName){
          if(this.visitName.length>1){
            this.phoneEvent()
            let codeNum = "";
            let randNum = "";
            let date = new Date();
            for(let i = 0; i < 5; i++) {
              randNum += Math.floor(Math.random()*10);
            }
            codeNum = date.getFullYear().toString() + (date.getMonth()+ 1).toString()  + date.getDate().toString()
              + date.getHours().toString() + date.getMinutes().toString() + date.getSeconds().toString() + randNum;
            this.code = codeNum
          }
        }
      },
      save(){
        if(this.validator()){
          let params = {
            id: this.id,
            visitName: this.visitName,
            phoneNumber: this.phoneNumber,
            code: this.code,
            workOrder: this. workOrder,
            personID: this.personID
          }

          this.ajaxJson({
            url: '/Business/visitInformationSave',
            data: params,
            call: (data)=>{
              if(data.type === 0){
                this.$dialog.setReturnValue('1')
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
        }
      },
      initData(){
        this.init({
          url: '/Business/visitInformationForm',
          all: (data)=>{
          },
          add: (data)=>{
          },
          look: (data)=>{
            this.id = data.id
            this.oldVisitName = data.visitName
            this.visitName = data.visitName
            this.phoneNumber = data.phoneNumber
            this.code = data.code
            this.workOrder = data.workOrder
          }
        })
      }
    },
    created () {
      this.personID = sessionStorage.getItem('____currentUserID')
      this.initData()
    }
  }
</script>

<style scoped>

</style>
