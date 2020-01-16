<template>
  <div class="f_main">
    <yhm-formbody>
      <template #title>添加信息</template>
      <template #control>
        <yhm-form-text placeholder=""  @repeatverify="nameVerifyEvent"  ref="name" title="作业分类" subtitle="" :value="name" id="name" rule="R0000"></yhm-form-text>
        <yhm-form-text placeholder="" title="平均用时(分钟)" subtitle="" :value="time" id="time" rule="R0000"></yhm-form-text>
        <yhm-form-text placeholder="" title="排序号" subtitle="" :value="number" id="number" rule="R0000"></yhm-form-text>
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
    name: 'operationAssortForm',
    mixins: [formmixin],
    data(){
      return{
        name:'',//作业名称
        time:'',//平均用时
        number:'',//排序号

      }
    },
    methods: {

      //重复验证,基于控件操作的验证
      nameVerifyEvent(){
        this.ajaxJson({
          url:"/Business/isExistOperationAssortByName",
          data:{
            id:this.id,
            name:this.name
          },
          loading:"0",
          call:(data) =>{
            if(data.type === 0){//说明存在，调用控件验证显示规则
              this.$refs.name.errorEvent("作业名称重复")
            }
          }
        })
      },
      async isNameVerifyEvent(){
        let result = await this.ajaxAsync({
          url:"/Business/isExistOperationAssortByName",
          data:{
            id:this.id,
            name:this.name
          },
          loading:"0"
        })
        if(result.type === 0){//说明存在，调用控件验证显示规则
          this.$refs.name.errorEvent("作业名称重复")
          return false
        }
        return true
      },

      //添加
      async save () {
        let a = await this.isNameVerifyEvent()
        let b = this.validator()

        if (a && b) {
          let params = {
            id: this.id,
            name: this.name,
            time:this.time,
            number:this.number
          }
          this.ajaxJson({
            url: '/Business/saveOperationAssort',
            data: params,
            loading: '0',
            call: (data) => {
              if (data.type == '0') {
                this.$dialog.setReturnValue(this.id) //向父级页面id值
                this.$dialog.alert({
                  tipValue: data.message,
                  closeCallBack: (data) => {
                    this.$dialog.close()
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
      this.setQuery2Value('ID')
      this.init({
        url: '/Business/initOperationAssortForm',
        all: (data) => {
        },
        add: (data) => {
          /* 需要添加的数据 */
        },
        look: (data) => {
          /* 需要查看的数据 */
          this.name=data.name
          this.time=data.time
          this.number=data.number
        }
      })
    }
  }

</script>

<style scoped>

</style>
