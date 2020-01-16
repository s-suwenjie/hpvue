<template>

  <div class="f_main">
    <yhm-formbody>
      <template #title>添加信息</template>
      <template #control>
        <yhm-form-text placeholder="" title="供应商信息" subtitle="" :value="info" id="info" rule="R0000"></yhm-form-text>
        <yhm-form-text placeholder=""  @repeatverify="nameVerifyEvent"  ref="name" title="供应商名称" subtitle="" :value="name" id="name" rule="R0000"></yhm-form-text>
        <yhm-form-text placeholder="" title="简称" subtitle="" :value="abbreviation" id="abbreviation" rule="R0000"></yhm-form-text>
        <yhm-form-text placeholder="" title="联系人" subtitle="" :value="contact" id="contact" rule="R0000"></yhm-form-text>
        <yhm-form-text placeholder="" title="职务" subtitle="" :value="position" id="position" rule="R0000"></yhm-form-text>
        <yhm-form-text placeholder="" title="电话" subtitle="" :value="iphone" id="iphone" rule="R0000"></yhm-form-text>
        <yhm-form-text placeholder="" title="地址" subtitle="" :value="address" id="address" rule="R0000"></yhm-form-text>
        <yhm-form-text placeholder="" title="传真" subtitle="" :value="fax" id="fax" rule="R0000"></yhm-form-text>
        <yhm-form-text placeholder="" title="邮件" subtitle="" :value="mail" id="mail" rule="R0000"></yhm-form-text>
        <yhm-form-text placeholder="" title="网址" subtitle="" :value="url" id="url" rule="R0000"></yhm-form-text>
        <yhm-form-text placeholder="" title="开户行" subtitle="" :value="bank" id="bank" rule="R0000"></yhm-form-text>
        <yhm-form-text placeholder="" title="银行账号" subtitle="" :value="bankAccount" id="bankAccount" rule="R0000"></yhm-form-text>
        <yhm-form-text placeholder="" title="备注" subtitle="" :value="remarks" id="remarks" rule="R0000"></yhm-form-text>
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
    name: 'supplierForm',
    mixins: [formmixin],
    data(){
      return{
        name:'',//类别编码
        number:'',

      }
    },
    methods: {

      //重复验证,基于控件操作的验证
      nameVerifyEvent(){
        this.ajaxJson({
          url:"/Business/isExistWorkAssortByName",
          data:{
            id:this.id,
            name:this.name
          },
          loading:"0",
          call:(data) =>{
            if(data.type === 0){//说明存在，调用控件验证显示规则
              this.$refs.name.errorEvent("工单名称重复")
            }
          }
        })
      },
      async isNameVerifyEvent(){
        let result = await this.ajaxAsync({
          url:"/Business/isExistWorkAssortByName",
          data:{
            id:this.id,
            name:this.name
          },
          loading:"0"
        })
        if(result.type === 0){//说明存在，调用控件验证显示规则
          this.$refs.name.errorEvent("工单名称重复")
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
            number:this.number
          }
          this.ajaxJson({
            url: '/Business/saveWorkAssort',
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
        url: '/Business/initWorkAssortForm',
        all: (data) => {
        },
        add: (data) => {
          /!* 需要添加的数据 *!/
        },
        look: (data) => {
          /!* 需要查看的数据 *!/
          this.name=data.name
          this.number=data.number
        }
      })
    }
  }

</script>

<style scoped>

</style>
