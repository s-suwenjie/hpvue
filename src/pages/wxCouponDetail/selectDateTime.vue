<template>
  <div class="f_main" style="width: 550px">
    <yhm-formbody>

      <template #control>
        <yhm-form-date title="延期至" :value="delayTime" id="delayTime " position="t" rule="R0000"></yhm-form-date>
      </template>
    </yhm-formbody>
    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn>
        <yhm-commonbutton value="保存" icon="btnSave" @call="save()"></yhm-commonbutton>
      </template>
    </yhm-formoperate>
  </div>
</template>

<script>
  import { formmixin } from '@/assets/form.js'
  export default {
    name: 'selectDateTime',
    mixins: [formmixin],
    data(){
      return {
        id:'',
        arrListID:[],
        delayTime:'',
      }
    },
    methods: {
      save(){
        if (this.validator()) {
          let params={
            listID:this.arrListID,
            delayTime:this.delayTime,
          }

          this.ajaxJson({
            url: '/wx/wxCouponDetail/operation',
            data: params,
            call: (data) => {
              sessionStorage.removeItem('WxOperation')
              if (data.type === 0) {
                this.$dialog.setReturnValue(this.id)
                this.$dialog.alert({
                  tipValue: data.message,
                  closeCallBack: () => {
                    this.$dialog.close()
                  }
                })
              } else {
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
    created () {
        this.arrListID = JSON.parse(sessionStorage.WxOperation);

    }
  }
</script>

<style scoped>

</style>
