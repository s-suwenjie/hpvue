<template>
  <div  class="f_main">
    <yhm-formbody>
      <template #title>基本信息</template>
      <template #control>
        <yhm-form-date title="开票日期" :max="maxApplyDate" :value="attestationDate" id="attestationDate" rule="R0000"></yhm-form-date>
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
  import {number2chinese,accMul, accAdd, guid, formatTime, formatDate} from '@/assets/common.js'
  export default {
    name: 'authenticationDate',
    mixins: [formmixin],
    data() {
      return {
        ownerID:'',
        attestationDate:formatDate(new Date()),
        maxApplyDate:formatDate(new Date()),
      }
    },

    created() {
      this.setQuery2Value('ownerID')
    },
    methods:{
      save(){
        let param={
          id:this.ownerID,
          attestationDate:this.attestationDate
        }
        this.ajaxJson({
          url: '/finance/inputTax/attestationDateSave',
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
</script>

<style scoped>

</style>
