<template>
  <div class="f_main">
    <yhm-formbody>
      <template #title>添加车辆品牌</template>
      <template #control>
        <yhm-form-text placeholder=""  @repeatverify="nameVerifyEvent" ref="brand"  title="车辆品牌" subtitle="" :value="brand" id="brand" rule="R0000"></yhm-form-text>
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
  export default {
    name: 'openBrandForm',
    mixins: [formmixin],
    data(){
      return {
        id:'',
        brand:'',//车辆品牌
      }
    },
    methods: {
      //重复验证,基于控件操作的验证
      nameVerifyEvent(){
        this.ajaxJson({
          url:"/com/verifyBankName",
          data:{
            id:this.id,
            name:'90',
            showName:this.brand,
            tempID:'',
          },
          loading:"0",
          call:(data) =>{
            if(data.type === 0){//说明存在，调用控件验证显示规则
              this.$refs.brand.errorEvent("车辆品牌已存在")
            }
          }
        })
      },
      async isNameVerifyEvent(){
        let result = await this.ajaxAsync({
          url:"/com/verifyBankName",
          data:{
            id:this.id,
            name:'90',
            showName:this.brand,
            tempID:'',
          },
          loading:"0"
        })
        if(result.type === 0){//说明存在，调用控件验证显示规则
          this.$refs.brand.errorEvent("车辆品牌已存在")
          return false
        }
        return true
      },
      async save() {
        let a = await this.isNameVerifyEvent()
        let b = this.validator()
        if (a && b) {
          let params = {
            id: this.id,
            name: '90',
            showName:this.brand,
          }
          this.ajaxJson({
            url: '/com/dicVueSave',
            data: params,
            call: (data) => {
              if (data.type === 0) {
                this.$dialog.setReturnValue(this.id)
                this.$dialog.alert({
                  tipValue: data.message,
                  closeCallBack: () => {
                    this.$dialog.close()
                  }
                })
              }else if(data.type === 1){
                this.$dialog.alert({
                  alertImg:'warn',
                  tipValue: data.message
                })
              }
            }
          })
        }
      }
    },
  }
</script>

<style scoped>

</style>
