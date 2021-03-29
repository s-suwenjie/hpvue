<template>
  <div  class="f_main">
    <yhm-formbody>
      <template #title>基本信息</template>

      <template #control>
        <yhm-form-text no-edit="1" title="姓名" ref="person" :value="person" id="person" rule="R0000"></yhm-form-text>
        <yhm-form-date title="启用时间" :minYear="maxApplyDate" type="year" :value="startDate" id="startDate" rule="R0000"></yhm-form-date>
        <yhm-form-radio title="月份" :select-list="categoryPsd.list" :value="category" id="category" rule="R0000" width="1"></yhm-form-radio>
        <yhm-form-text title="金额" :value="money" id="money" rule="R1500"></yhm-form-text>
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
  import {formmixin} from '@/assets/form.js'
  import {number2chinese,accMul, accAdd, guid, formatTime, formatDate,formatCnDate} from '@/assets/common.js'

  export default {
    name: 'repairTargerForm',
    mixins: [formmixin],
    data(){
      return{
        person:'',
        personID:'',
        maxApplyDate:'',
        startDate:'',
        money:'',
        categoryPsd:{
          list:[],
          value:'0',
        },
        category:'0',
      }
    },
    created () {
      this.maxApplyDate=(new Date()).getFullYear()
      this.init()
    },
    methods:{
      init(){
        let params={}
        this.ajaxJson({
          url:'/Fin/bankDetailInsuranceTargetForm',
          data: params,
          call: (data) => {
            this.categoryPsd.list=data.categoryPsd.list
            this.person=sessionStorage.getItem('____currentUser')
            this.personID=sessionStorage.getItem('____currentUserID')
          }
        })
      },
      save(){
        let a = this.validator()
        if(a){
          let params={
            id:guid(),
            category:this.category,
            personID:this.personID,
            person:this.person,
            year:this.startDate,
            money:this.money,
          }
          this.ajaxJson({
            url:'/Fin/bankDetailInsuranceTargetSave',
            data: params,
            call: (data) => {
              if(data.type==0){
                this.$dialog.alert({
                  tipValue: data.message,
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
