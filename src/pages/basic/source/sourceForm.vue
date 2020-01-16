<template>
  <div class="f_main">
    <yhm-formbody>
      <template #title>添加信息</template>
      <template #control>
        <yhm-form-text placeholder=""  @repeatverify="nameVerifyEvent"  ref="name" title="客户名称" subtitle="" :value="name" id="name" rule="R0000"></yhm-form-text>
        <yhm-form-text placeholder="" title="介绍人" subtitle="" :value="introducer" id="introducer" rule="R0000"></yhm-form-text>
        <yhm-form-text placeholder="" title="联系方式" subtitle="" :value="iphone" id="iphone" rule="RS00004"></yhm-form-text>
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
    name: 'sourceForm',
    mixins: [formmixin],
    data(){
      return{
        name:'',//类别编码
        introducer:'',
        iphone:'',

      }
    },
    methods: {

      //重复验证,基于控件操作的验证
      nameVerifyEvent(){
        this.ajaxJson({
          url:"/Business/isExistSourceByName",
          data:{
            id:this.id,
            name:this.name
          },
          loading:"0",
          call:(data) =>{
            if(data.type === 0){//说明存在，调用控件验证显示规则
              this.$refs.name.errorEvent("客户名称重复")
            }
          }
        })
      },
      async isNameVerifyEvent(){
        let result = await this.ajaxAsync({
          url:"/Business/isExistSourceByName",
          data:{
            id:this.id,
            name:this.name
          },
          loading:"0"
        })
        if(result.type === 0){//说明存在，调用控件验证显示规则
          this.$refs.name.errorEvent("客户名称重复")
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
            introducer:this.introducer,
            iphone:this.iphone
          }
          this.ajaxJson({
            url: '/Business/saveSource',
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
        url: '/Business/initSourceForm',
        all: (data) => {

        },
        add: (data) => {
          /!* 需要添加的数据 *!/
        },
        look: (data) => {
          /!* 需要查看的数据 *!/
          this.name=data.name
          this.introducer=data.introducer
          this.iphone=data.iphone
        }
      })
    }
  }

</script>

<style scoped>

</style>
