<template>
  <div class="f_main">
    <yhm-formbody>
      <template #control>
        <yhm-form-date title="销户日期" :max="nowDate" :value="workDate" id="workDate" rule="R0000"></yhm-form-date>
        <yhm-form-select title="操作人" :value="person" id="person" :no-click="true" rule="R0000"></yhm-form-select>
        <yhm-form-select title="经办人" :value="agentPerson" id="agentPerson" @click="SelectPerson" rule="R0000"></yhm-form-select>
        <yhm-form-textarea title="注销原因" :value="remark" id="remark" rule="R0000"></yhm-form-textarea>
        <yhm-formupload :ownerID="id" :value="fileList" id="fileList" title="上传单据" tag="publicAccount" subtitle="" multiple="multiple" rule="#"></yhm-formupload>
      </template>
    </yhm-formbody>
    <div class="f_split"></div>
    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn >
        <yhm-commonbutton value="保存" icon="btnSave" :flicker="true" @call="save()"></yhm-commonbutton>
      </template>
    </yhm-formoperate>
  </div>
</template>

<script>
  import { accMul, accAdd, guid, formatDate, number2chinese,formatTime} from '@/assets/common.js'
  import { formmixin } from '@/assets/form.js'
  export default {
    name: 'accountCancellation',
    mixins: [formmixin],
    data() {
      return {
        ownerID:'',
        workDate:formatDate(new Date()),
        remark:'',
        personID:'',
        person:'',
        nowDate: formatDate(new Date()),
        agentPerson:'',
        agentPersonID:'',
        fileList:[],
      }
    },
    methods:{
      SelectPerson(){
        this.$dialog.OpenWindow({
          width: 950,
          height: 692,
          url:'/selectPerson?category=0&categoryBefore=1',
          title: '选择开户人',
          closeCallBack: (data) => {
            if (data) {
              this.agentPerson = data.name
              this.agentPersonID = data.id
            }
          }
        })
      },
      save(){
        if(this.validator()){
          let param={
            id:this.id,
            ownerID:this.ownerID,
            workDate:this.workDate,
            remark:this.remark,
            personID:this.personID,
            person:this.person,
            agentPersonID:this.agentPersonID,
            agentPerson:this.agentPerson,
            fileList:this.fileList
          }
          this.ajaxJson({
            url: '/Fin/accountCancellationSave',
            data: param,
            loading: '0',
            call: (data) => {
              if (data.type === 0) {
                this.$dialog.setReturnValue(this.id) //向父级页面id值
                this.$dialog.alert({
                  tipValue: data.message,
                  closeCallBack: () => {
                    this.bankDetailSave()
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
        }
      }
    },
    created () {
      this.setQuery2Value('ownerID')
      this.person=sessionStorage.getItem('____currentUser')
      this.personID=sessionStorage.getItem('____currentUserID')
    }
  }
</script>

<style scoped>

</style>
