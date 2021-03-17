<template>
  <div class="f_main">
    <yhm-form-textarea :text-width="true" title="取消原因"  :value="remark" id="remark" :max-height="300" rule="R0000"></yhm-form-textarea>
    <!--<yhm-formoperate>-->
    <!--<template #btn >-->
    <yhm-commonbutton value="确定" @call="adoptEvent()" icon="i-btm-applicationSm" class="btnIcon commonbutton"></yhm-commonbutton>
    <!--</template>-->
    <!--</yhm-formoperate>-->
  </div>
</template>

<script>
  import { formmixin } from '@/assets/form.js'
  export default {
    name: 'cancelAppointment',
    mixins: [formmixin],
    data(){
      return{

      }
    },
    created () {
      this.setQuery2Value("id")
    },
    methods:{
      adoptEvent () {

        this.$dialog.confirm({
          width: 300,
          tipValue: '是否取消预约',
          alertImg: 'warn',
          okCallBack: (data)=>{
            let params = {
              id: this.id,
              receptionid:this.remark
            }
            this.ajaxJson({
              url:'/dailyoffice/expressDelivery/cancelAppointment' ,
              data: params,
              call: (data) => {
                if (data.type === 0) {
                  this.$dialog.setReturnValue(1111)
                  this.$dialog.alert({
                    tipValue: data.message,
                    closeCallBack: (data) => {
                      this.$dialog.close()
                      this.initPageData(false)
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
        })

      }
    },
  }
</script>

<style lang="less" scoped>
  .commonbutton{
    position: fixed;
    bottom: 16px;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>

