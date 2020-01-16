<template>
  <div class="afc_main">
    <div class="afc_title">{{title}}</div>
    <yhm-app-date-box :show="show" :empty-message="title + emptyMessage" :max="max" :min="min" :value="value" :id="id" :rule="rule" @formVerification="formVerificationEvent"></yhm-app-date-box>
    <div class="afc_error"><span v-if="error">{{errorTipMessage}}</span></div>
  </div>
</template>

<script>
  import { formcontrolmixin } from '@/assetsApp/form/control/formcontrol.js'
  export default {
    name: 'yhm-app-form-date-box',
    mixins: [formcontrolmixin],
    props: {
      title: {
        type: String,
        default: "标题"
      },
      id: {
        type: String,
        required: true
      },
      value: {
        type: String,
        required: true
      },
      emptyMessage: {
        type: String,
        default: '不能为空'
      },
      max:{
        type:String,
        default:""
      },
      min:{
        type:String,
        default:""
      },
      rule:{
        type:String,
        default:""
      },
      show:{
        type:Boolean,
        default:true
      }
    },
  }
</script>

<style scoped>

</style>
