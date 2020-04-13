<template>
  <div class="f_main">
    <yhm-formbody>
      <template #title>基本信息</template>
      <template #control>
        <yhm-form-select title="收款账号" tip="value" :value="selfAccount" id="selfAccount" rule="R0000" @click="selfAccountEvent"></yhm-form-select>
        <yhm-formupload :ownerID="id" :value="list" id="list" title="支持单据" tag="bankDetail" subtitle="" multiple="multiple" rule="#"></yhm-formupload>
      </template>
    </yhm-formbody>
    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn>
        <yhm-commonbutton value="保存" icon="btnSave" :flicker="true" @call="save()" category="one"></yhm-commonbutton>
      </template>
    </yhm-formoperate>
  </div>
</template>

<script>
  import { formmixin } from '@/assets/form.js'
  import { guid } from '@/assets/common.js'
  export default {
    name: "fullRefundForm",
    mixins: [formmixin],
    data(){
      return{
        id: guid(),
        selfAccount: '',
        selfAccountID: '',
        ownerID: '',
        list: []
      }
    },
    methods: {
      selfAccountEvent(){
        this.$dialog.OpenWindow({
          width: 950,
          height: 692,
          url: '/selectPublicAccount?categoryBefore=1&categoryUnit=0&category=0',
          title: '选择账户信息',
          closeCallBack: (data) => {
            if (data) {
              this.selfAccount = data.publicAccountExplain;
              this.selfAccountID = data.id
            }
          }
        })
      },
      save(){
        if(this.validator()){
          let params = {
            id: this.id,
            selfAccount: this.selfAccount,
            selfAccountID: this.selfAccountID,
            ownerID: this.ownerID,
            list: this.list
          };
          this.ajaxJson({
            url: '/PersonOffice/prettyCashsRefund',
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
        }
      },
    },
    created() {
      this.setQuery2Value('ownerID')
    }
  }
</script>

<style scoped>

</style>
