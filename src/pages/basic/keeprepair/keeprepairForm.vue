<template>
  <div class="f_main">
    <yhm-formbody>
      <template #title>添加信息</template>
      <template #control>
        <yhm-form-text placeholder="" title="车型项目组" subtitle="" :value="model" id="model" rule="R0000"></yhm-form-text>
        <yhm-form-text placeholder="" title="项目编号" subtitle="" :value="number" id="number" rule="R0000"></yhm-form-text>
        <yhm-form-text placeholder="" @repeatverify="nameVerifyEvent" ref="name" title="项目名称" subtitle="" :value="name" id="name" rule="R0000"></yhm-form-text>
        <yhm-form-text placeholder="" title="工时" subtitle="" :value="workingHours" id="workingHours" rule="R0000"></yhm-form-text>
        <yhm-form-text placeholder="" title="保修工时" subtitle="" :value="warranty" id="warranty" rule="R0000"></yhm-form-text>
        <yhm-form-text placeholder="" title="考核工时" subtitle="" :value="assess" id="assess" rule="R0000"></yhm-form-text>
        <yhm-form-radio title="锁定状态" :select-list="stateList" :value="state" id="state"></yhm-form-radio>
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
    name: 'keeprepairForm',
    mixins: [formmixin],
    data(){
      return {
        id:'',
        state: '',
        model:'',//车型项目组
        number:'',//项目编号
        name:'',//项目名称
        workingHours:'',//工时
        warranty:'',//保修工时
        assess:'',//考核工时
        stateList:[],//锁定状态
      }
    },
    methods:{
      //重复验证,基于控件操作的验证
      nameVerifyEvent(){
        this.ajaxJson({
          url:"/Business/isExistKeeprepairByName",
          data:{
            id:this.id,
            name:this.name,

          },
          loading:"0",
          call:(data) =>{
            if(data.type === 0){//说明存在，调用控件验证显示规则
              this.$refs.name.errorEvent("项目名称重复")
            }
          }
        })
      },
      async isNameVerifyEvent(){
        let result = await this.ajaxAsync({
          url:"/Business/isExistKeeprepairByName",
          data:{
            id:this.id,
            name:this.name,

          },
          loading:"0"
        })
        if(result.type === 0){//说明存在，调用控件验证显示规则
          this.$refs.name.errorEvent("项目名称重复")
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
            model: this.model,
            number: this.number,
            name: this.name,
            workingHours: this.workingHours,
            warranty: this.warranty,
            assess: this.assess,
            state: this.state,
          }
          this.ajaxJson({
            url: '/Business/saveKeeprepair',
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
      this.setQuery2Value('id')
      this.init({
        url: '/Business/initKeeprepairForm',
        all: (data) => {

          this.stateList = data.statePsd.list
          this.state = data.statePsd.value


        },
        add: (data) => {
          /* 需要添加的数据 */
        },
        look: (data) => {
          /* 需要查看的数据 */
          this.model=data.model//父级菜单
          this.number=data.number//菜单名称
          this.name=data.name
          this.workingHours=data.workingHours
          this.warranty=data.warranty
          this.assess=data.assess
          this.stateList=data.statePsd.list
          this.state=data.statePsd.value
        }
      })
    }
  }
</script>

<style scoped>

</style>
