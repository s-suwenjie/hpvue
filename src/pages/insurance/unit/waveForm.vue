<template>
  <div class="f_main">
    <yhm-formbody>
      <template #title>基本信息</template>

      <template #control>
        <yhm-form-text placeholder="" title="对账单金额" subtitle="修改为" :value="money" id="money" rule="R0000">

        </yhm-form-text>
        <div><span style="color: #FF0000;font-size: 16px">☠(修改此金额只能在之前总金额+-10以内)</span></div>
      </template>
    </yhm-formbody>


    <yhm-formoperate >
      <template #btn>
        <yhm-commonbutton value="保存" icon="btnSave" :flicker="true" @call="save()"></yhm-commonbutton>
      </template>
    </yhm-formoperate>
  </div>
</template>

<script>
  import { formmixin } from '@/assets/form.js'
  export default {
    name: 'waveForm',
    mixins: [formmixin],
    data(){
      return{

      }
    },
    methods: {
      save () {

        if (this.validator()) {
          let params = {
            id: this.id,
            ownerID:this.money,
          }
          this.ajaxJson({
            url: '/Basic/updateWave',
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
              }else{
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
    created(){
      this.setQuery2Value('id')
    },
  }
</script>

<style scoped>

</style>
