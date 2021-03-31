<template>
  <div  class="f_main">
    <yhm-formbody>
      <template #title>基本信息</template>

      <template #control>
        <!--<yhm-form-text no-edit="1" title="添加人" ref="person" :value="person" id="person" rule="R0000"></yhm-form-text>-->
        <yhm-form-date title="启用时间" :min="maxApplyDate" :value="startDate" id="startDate" rule="R0000"></yhm-form-date>
        <yhm-form-radio title="岗位工" subtitle="资级别" :select-list="categoryPsd" :value="category" id="category" rule="R0000" width="1"></yhm-form-radio>
        <yhm-form-text title="金额" :value="money" id="money" rule="R1500"></yhm-form-text>
        <!--<yhm-form-radio title="状态" :select-list="statePsd" :value="state" id="state" rule="R0000"></yhm-form-radio>-->
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
    name: 'wagePostForm',
    mixins: [formmixin],
    data() {
      return {
        maxApplyDate:formatDate(new Date()),
        category:'',
        categoryPsd:[],
        personID:sessionStorage.getItem('____currentUserID'),
        person:sessionStorage.getItem('____currentUser'),
        startDate:'',
        money:'',
        state:'0'
      }
    },
    created(){
      let params={}
      this.init({
        url: '/finance/wagePost/initForm',
        data: params,
        all: (data) => {
          this.categoryPsd=data.categoryPsd.list
          this.category=data.categoryPsd.value
        },
        add: (data) => {

        },
        look: (data) => {
          this.id=data.id
          this.personID=data.personID
          this.person=data.person
          this.startDate=data.startDate
          this.money=data.money
        }
      })
    },
    methods:{
      save(){
        let a = this.validator()
        if(a){
          let param={
            id:this.id,
            category:this.category,
            personID:this.personID,
            person:this.person,
            startDate:this.startDate,
            money:this.money,
            state:this.state,
          }
          this.ajaxJson({
            url: '/finance/wagePost/save',
            data: param,
            call: (data) => {
              if(data.type===0){
                this.$dialog.setReturnValue(this.id)
                this.$dialog.alert({
                  tipValue: data.message,
                  closeCallBack: () => {
                    this.$dialog.close()
                  }
                })
              }else{
                this.$dialog.alert({
                  tipValue: data.message,
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
