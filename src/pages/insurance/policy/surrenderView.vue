<template>
  <div class="f_main">
    <yhm-form-text :text-width="true" title="金额"  :value="moeny" id="moeny" :max-height="300"></yhm-form-text>
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
    name: 'surrenderView',
    mixins: [formmixin],
    data(){
      return{
        moeny:'',
        id:'',
        tipValue:'是否通过?'
      }
    },
    created () {
      this.setQuery2Value("id")
    },
    methods:{
      adoptEvent () {
        this.$dialog.confirm({
          width: 300,
          tipValue: '是否退保?',
          btnValueOk: '确定',
          alertImg: 'warn',
          okCallBack: (data) => {
            let params = {
              id: this.id,
              ownerID:this.moeny
            }

            this.ajaxJson({
              url: '/Insurance/surrender',
              data: params,
              call: (data) => {
                if (data.type == '0') {
                  this.$dialog.setReturnValue(this.id)
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
      },
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
