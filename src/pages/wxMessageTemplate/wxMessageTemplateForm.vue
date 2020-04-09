<template>
  <div>
    <div class="f_main mb16">
      <yhm-formbody>
        <template #title>基本信息</template>
        <template #control>
          <yhm-form-text title="模板名称" :value="name" id="name" rule="R0000"></yhm-form-text>
          <div class="f_br"></div>
          <yhm-form-text title="RedisKey" :value="redisKey" id="redisKey" rule="R0000"></yhm-form-text>
          <yhm-form-text title="模板ID" :value="templateID" id="templateID" rule="R0000"></yhm-form-text>
          <yhm-form-textarea title="备注" :value="remark" id="remark" rule="R0000"></yhm-form-textarea>
        </template>
      </yhm-formbody>

      <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
        <template #btn>
          <yhm-commonbutton value="保存" icon="btnSave" :flicker="true" @call="save(0)"></yhm-commonbutton>
        </template>
      </yhm-formoperate>
    </div>
  </div>
</template>

<script>
  import { formmixin } from '@/assets/form.js'
  export default {
    name: 'wxMessageTemplateForm',
    mixins: [formmixin],
    data(){
      return {
        name:'',
        redisKey:'',
        templateID:'',
        remark:''
      }
    },
    methods:{
      save(op){
        if(this.validator()) {
          let params = {
            id: this.id,
            name:this.name,
            redisKey:this.redisKey,
            templateID:this.templateID,
            remark:this.remark
          }
          this.ajaxJson({
            url: '/SysManager/saveWxMessageTemplate',
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
              }
              else{
                this.$dialog.alert({
                  width: '300',
                  alertImg: 'error',
                  tipValue: data.message
                })
              }
            }
          })
        }
      }
    },
    created () {
      this.init({
        url: '/SysManager/initWxMessageTemplateForm',
        all: (data) => {
          //添加查看的时候都需要的代码
        },
        add: (data) => {
          //添加时独有的代码
          //初始化分组成员信息
        },
        look: (data) => {
          //查看时独有的信息
          this.name = data.name
          this.redisKey = data.redisKey
          this.templateID = data.templateID
          this.remark = data.remark
        }
      })
    }
  }
</script>

<style scoped>

</style>
