<template>
  <div class="f_main">
    <yhm-formbody>
      <template #title>添加信息</template>
      <template #control>
        <yhm-form-select title="保险公司" tip="value" @click="selectUnit" :value="company" id="company" rule="R0000" ></yhm-form-select>
        <yhm-form-text placeholder=""  title="备注" subtitle="" :value="remark" id="remark" rule="R0000" ></yhm-form-text>
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
    name: 'insuranceCompanyForm',
    mixins: [formmixin],
    data(){
      return{
        id:'',
        company:'', //保险公司
        remark:'',//备注

      }
    },
    methods:{
      selectUnit () { //户名点击事件
        this.$dialog.OpenWindow({
          width: 950,
          height: 692,
          url: '/selectUnit?category=1',
          title: '选择保险公司',
          closeCallBack: (data) => {
            if (data) {
              this.name = data.name
              this.unitID = data.id
              this.categoryUnit = data.category
              this.isRelevanceEvent ()
            }
          }
        })
      },
      save() {
        if (this.validator()) {
          let params = {
            id: this.id,
            company:this.company,
            remark:this.remark,

          }
          this.ajaxJson({
            url: '/Basic/saveInsuranceCompany',
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
        url: '/Basic/initInsuranceCompanyForm',
        all: (data) => {
        },
        add: (data) => {
          /* 需要添加的数据 */
        },
        look: (data) => {

          /* 需要查看的数据 */
          this.company=data.company //被保险人
          this.remark=data.remark   //被保险人证件号

        }
      })
    }

  }
</script>

<style scoped>

</style>
