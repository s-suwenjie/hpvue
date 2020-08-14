<template>
  <div class="f_main">
    <yhm-formbody>
      <template #title>基础数据</template>
      <template #control>
        <yhm-form-text title="操作人" no-edit="1" :value="person" id="person" rule="R0000"></yhm-form-text>
        <yhm-form-date title="作废日期" :max="nowDate" :value="workDate" id="workDate" tip="value" rule="R0000" position="b"></yhm-form-date>
        <yhm-form-textarea title="作废原因" :value="remark" id="remark" rule="R0000"></yhm-form-textarea>
      </template>
    </yhm-formbody>
    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn>
        <yhm-commonbutton value="作废" v-if="type==='0'" icon="btnSave" :flicker="true" @call="toVoid()" category="one"></yhm-commonbutton>
      </template>
    </yhm-formoperate>
  </div>
</template>

<script>
  import { formmixin } from '@/assets/form.js'
  import { formatDate ,accAdd, guid,number2chinese,formatCnDate,accMul} from '@/assets/common.js'
  export default {
    name: 'openInvoiceToVoid',
    mixins: [formmixin],
    data(){
      return{
        ownerID:'',
        workDate:'',
        nowDate: formatDate(new Date()),
        remark:'',
        personID:'',
        person:'',
        type:'',
        category:'',
      }
    },
    methods:{
      toVoid(){
        this.$dialog.confirm({
          width: 450,
          tipValue: '确认作废发票，此开票申请是否依然有效?',
          btnValueOk: '是',
          btnValueCancel: '否',
          alertImg: 'warn',
          okCallBack: () => {
            this.category='0'
            this.save()
          },
          cancelCallBack: () => {
            this.category='1'
            this.save()
          }
        })
      },
      save() {
        if (this.validator()) {
          let params = {
            workDate: this.workDate,
            remark: this.remark,
            ownerID: this.ownerID,
            personID:this.personID,
            person:this.person,
          }
          this.ajaxJson({
            url: '/Bill/openInvoiceToVoid',
            data: params,
            call: (data) => {
              if (data.type === 0) {
                this.$dialog.setReturnValue('123')
                this.$dialog.alert({
                  tipValue: data.message,
                  closeCallBack: () => {
                    this.$dialog.close()
                  }
                })
              } else {
                this.$dialog.alert({
                  alertImg: 'error',
                  tipValue: data.message
                })
              }
            }
          })
        }
      },
      initData() {
        let params = {
          ownerID: this.ownerID
        }
        this.init({
          url: '/Bill/getOpenInvoiceToVoid',
          data: params,
          all: (data) => {
            if(data){
              this.workDate=data.workDate
              this.personID=data.personID
              this.person=data.person
              this.remark=data.remark
            }
          }
        })
      }
    },
    created () {
      this.setQuery2Value('ownerID')
      this.setQuery2Value('type')
      if(this.type ==='0'){
        this.personID=sessionStorage.getItem('____currentUserID')
        this.person=sessionStorage.getItem('____currentUser')
      }else{
        this.initData()
      }
    }
  }
</script>

<style scoped>

</style>
