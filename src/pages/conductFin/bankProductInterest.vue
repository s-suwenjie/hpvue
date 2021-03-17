<template>
  <div class="f_main">
    <yhm-formbody>
      <template #title>基本信息</template>
      <template #control>
        <yhm-form-text title="利息" tip="money" before-icon="rmb" :value="money" id="money" rule="R3000" placeholder="请输入数字" error-message="纯数字输入"></yhm-form-text>
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
  import { accMul, accAdd, guid, formatDate, number2chinese,formatTime} from '@/assets/common.js'
  import { formmixin } from '@/assets/form.js'
  export default {
    name: 'bankProductInterest',
    mixins: [formmixin],
    data() {
      return {
        money:'',
        ownerID:'',
      }
    },
    methods: {
      save(){
        if(this.validator()){
          let params = {
            id: this.id,
            ownerID: this.ownerID,
            money: this.money,
          }
          this.ajaxJson({
            url: '/Fin/bankProductInterestSave',
            data: params,
            call: (data) => {
              if(data.type === 0){
                this.$dialog.setReturnValue('1')
                this.$dialog.alert({
                  tipValue: data.message,
                  closeCallBack: ()=> {
                    if(op === 1){
                      this.$dialog.refresh()
                    }else{
                      this.$dialog.close()
                    }
                  }
                })
              }else{
                this.$dialog.alert({
                  tipValue:data.message,
                  alertImg: 'error'
                })
              }
            }
          })
        }
      }
    },
    created() {
      this.setQuery2Value('ownerID')
    }
  }
</script>

<style scoped>

</style>
