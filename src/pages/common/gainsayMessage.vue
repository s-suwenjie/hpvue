<template>
  <div class="f_main">
    <yhm-form-textarea :text-width="true" title="留言内容"  :value="remark" id="remark" :max-height="300"></yhm-form-textarea>
    <!--<yhm-formoperate>-->
    <!--<template #btn >-->
    <yhm-commonbutton value="驳回" @call="adoptEvent()" icon="i-btm-applicationSm" class="btnIcon commonbutton"></yhm-commonbutton>
    <!--</template>-->
    <!--</yhm-formoperate>-->
  </div>
</template>

<script>
  import { formmixin } from '@/assets/form.js'

  export default {
    name: 'gainsayMessage',
    mixins: [formmixin],
    data(){
      return{
          id:'',
        remark:'',
      }
    },
    created () {

    },
    methods:{
      adoptEvent () {
        this.$dialog.confirm({
          width: 300,
          tipValue: '是否驳回?',
          alertImg: 'warn',
          okCallBack: (data) => {
              let params={
                id: this.id,
                remark: this.remark
              }
            this.ajaxJson({
              url: '/Fin/insuranceGainsay',
              data: params,
              loading: '0',
              call: (data) => {
                if (data.type === 0) {
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
