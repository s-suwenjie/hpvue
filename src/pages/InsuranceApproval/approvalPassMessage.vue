<template>
  <div class="f_main">
    <yhm-form-textarea :text-width="true" title="留言内容"  :value="remark" id="remark" :max-height="300"></yhm-form-textarea>
    <!--<yhm-formoperate>-->
    <!--<template #btn >-->
    <yhm-commonbutton value="通过" @call="adoptEvent()" icon="i-btm-applicationSm" class="btnIcon commonbutton"></yhm-commonbutton>
    <!--</template>-->
    <!--</yhm-formoperate>-->
  </div>
</template>

<script>
  import { formmixin } from '@/assets/form.js'
  export default {
    name: 'approvalPassMessage',
    mixins: [formmixin],
    data(){
      return{

      }
    },
    created () {
    },
    methods:{
      adoptEvent () {
          this.$dialog.confirm({
            width: 300,
            tipValue: '是否通过?',
            alertImg: 'warn',
            okCallBack: (data)=>{
                let params = {
                  id: this.id,
                  remark:this.remark
                }
                console.log( params )
                this.ajaxJson({
                  url: '/Insurance/modifyStateInsuranceApp',
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
