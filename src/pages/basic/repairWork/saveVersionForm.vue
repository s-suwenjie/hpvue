<template>
  <div class="f_main">
    <yhm-formbody>
      <template #title>添加车辆版本</template>
      <template #control>
        <yhm-form-select title="车型" tip="value" :value="model" id="model" rule="R0000" @click="selectModel"></yhm-form-select>
        <yhm-form-text placeholder=""  @repeatverify="nameVerifyEvent" ref="version"  title="车辆版本" subtitle="" :value="version" id="version" rule="R0000"></yhm-form-text>
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
  import { guid } from '../../../assets/common'
  export default {
    name: 'saveVersionForm',
    mixins: [formmixin],
    data(){
      return {
        id:'',
        modelID:'',
        model:'',
        brandOwnerID: ''
      }
    },
    methods: {
      selectModel(){
        this.$dialog.OpenWindow({
          width: 950,
          height: 603,
          url: '/selectModel?personID=' + this.brandOwnerID,
          title: '选择车型',
          closeCallBack: (data) => {
            if (data) {
              this.modelID=data.id
              this.model = data.showName
            }
          }
        })
      },
      //重复验证,基于控件操作的验证
      nameVerifyEvent(){
        this.ajaxJson({
          url:"/com/verifyBankName",
          data:{
            id:guid(),
            name:'92',
            showName:this.version,
            tempID:this.modelID,
          },
          loading:"0",
          call:(data) =>{
            if(data.type === 0){//说明存在，调用控件验证显示规则
              this.$refs.version.errorEvent("车辆版本已存在")
            }
          }
        })
      },
      async isNameVerifyEvent(){
        let result = await this.ajaxAsync({
          url:"/com/verifyBankName",
          data:{
            id:guid(),
            name:'92',
            showName:this.version,
            tempID:this.modelID,

          },
          loading:"0"
        })
        if(result.type === 0){//说明存在，调用控件验证显示规则
          this.$refs.version.errorEvent("车辆版本已存在")
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
            name: '92',
            showName:this.version,
            value12:this.modelID,
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
    created () {
      this.setQuery2Value('brandOwnerID')
    }
  }
</script>

<style scoped>

</style>
