<template>
  <div  class="f_main">
    <yhm-formbody>
      <template #title>基本信息</template>
      <template #control>
        <yhm-form-text title="员工姓名" ref="person" no-edit="1" :value="person" id="person" rule="R0000"></yhm-form-text>
        <yhm-form-date title="离职时间" :max="maxApplyDate" :value="quitDate" id="quitDate" rule="R0000"></yhm-form-date>
        <yhm-form-textarea title="离职原因" :value="reason" id="reason"></yhm-form-textarea>
        <yhm-formupload :ownerID="id" :value="fileList" id="fileList" title="上传文件" tag="employee" subtitle="" multiple="multiple" rule="#"></yhm-formupload>
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
  import { formatDate ,accAdd, guid,number2chinese,formatCnDate,accMul,formatTime} from '@/assets/common.js'
  export default {
    name: 'staffQuitForm',
    mixins: [formmixin],
    data() {
      return {
        maxApplyDate:formatDate(new Date()),

        personID:'',
        person:'',
        ownerID:'',
        quitDate:'',
        reason:'',
        fileList:[],

      }
    },
    created() {
      this.setQuery2Value('ownerID')
      let params = {
        ownerID:this.ownerID
      }
      this.init({
        url: '/finance/employeeFiles/quitForm',
        data: params,
        all: (data) => {
          this.personID=data.personID
          this.person=data.person
        },
        add: (data) => {

        },
        look: (data) => {

        }
      })
    },
    methods:{
      save(){
        let a = this.validator()
        if(a) {
          let param = {
            id: this.id,
            personID: this.personID,
            person: this.person,
            ownerID: this.ownerID,
            quitDate: this.quitDate,
            reason: this.reason,
            fileList:this.fileList
          }
          this.ajaxJson({
            url: '/finance/employeeFiles/quitSave',
            data: param,
            call: (data) => {
              if(data.type===0){
                this.$dialog.setReturnValue(this.id)
                this.$dialog.alert({
                  tipValue: "状态设置成功",
                  closeCallBack: () => {
                    this.$dialog.close()
                  }
                })
              }else{
                this.$dialog.alert({
                  tipValue: "状态设置失败",
                  alertImg: 'error',
                  closeCallBack: () => {
                    this.$dialog.close()
                  }
                })
              }
            }
          })
        }
      }
    }
  }
</script>

<style scoped>

</style>
