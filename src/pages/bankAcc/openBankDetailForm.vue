<template>
  <div class="f_main">
    <yhm-formbody>
      <template #title>基本信息</template>
      <template #control>
        <yhm-form-text title="所属银行" :value="showName" id="showName" rule="R0000"></yhm-form-text>
        <yhm-form-text title="银行简码" :value="value2" id="value2" rule="R0000"></yhm-form-text>
        <yhm-form-text title="回显规则" :value="value3" id="value3" rule="R0000"></yhm-form-text>
        <yhm-form-upload-image title="银行图标" tag="BankLogo" discription="建议上传.svg格式" :value="icon" id="icon" rule="#"></yhm-form-upload-image>
      </template>
    </yhm-formbody>

    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn>
        <yhm-commonbutton value="保存" icon="btnSave" :flicker="true" @call="save()"></yhm-commonbutton>
        <yhm-commonbutton value="保存并新增" class="btnAddSave" icon="btnAddSave" @call="btnAddSave()"></yhm-commonbutton>
      </template>
    </yhm-formoperate>
  </div>
</template>

<script>
  import { accMul, accAdd, guid, formatDate, number2chinese,formatTime} from '@/assets/common.js'
  import { formmixin } from '@/assets/form.js'
  export default {
    name: 'openBankDetailForm',
    mixins: [formmixin],
    data (){
      return {
        id: guid(),
        showName: '',
        value2: '',
        value3: '',
        icon:'',//上传图片
        url:'',//请求路径
      }
    },
    methods:{
      save(){
        if(this.validator()){
          let insertDate = new Date(accAdd(new Date().getTime(), accMul(1, 1000)))
          let params = {
            id: this.id,
            insertDate: formatTime(insertDate),
            name: '48',
            showName: this.showName,
            value1: this.value2,
            value2: this.value3,
            value3: this.icon,

          }
          this.ajaxJson({
            url: '/Com/dicVueSave',
            data: params,
            call: (data)=>{
              if(data.type === 0){
                this.$dialog.setReturnValue(this.id)
                  this.$dialog.alert({
                  tipValue: data.message,
                  closeCallBack: (data)=>{
                  }
                })
              }else {
                this.$dialog.alert({
                  alertImg: 'warn',
                  tipValue: data.message,
                  closeCallBack: (data)=>{
                  }
                })
              }
            }
          })
        }
      },
      btnAddSave(){
        if(this.validator()){
          let insertDate = new Date(accAdd(new Date().getTime(), accMul(1, 1000)))
          let params = {
            id: this.id,
            insertDate: formatTime(insertDate),
            name: '48',
            showName: this.showName,
            value1: this.value2,
            value2: this.value3,
            value3: this.icon,

          }
          this.ajaxJson({
            url: '/Com/dicVueSave',
            data: params,
            call: (data)=>{
              if(data.type === 0){
                this.$dialog.setReturnValue(this.id)
                this.$dialog.alert({
                  tipValue: data.message,
                  closeCallBack: (data)=>{
                    this.$dialog.refresh()
                  }
                })
              }else {
                this.$dialog.alert({
                  alertImg: 'warn',
                  tipValue: data.message,
                })
              }
            }
          })
        }
      },
    }
  }
</script>

<style scoped>

</style>
