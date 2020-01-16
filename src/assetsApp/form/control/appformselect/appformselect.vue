<template>
  <div class="afc_main">
    <div class="afc_title">{{title}}</div>
    <yhm-app-select @call="callEvent" :show="show" :empty-message="title + emptyMessage" :value="value" :id="id" :rule="rule" @formVerification="formVerificationEvent"></yhm-app-select>
    <div class="afc_error"><span v-if="error">{{errorTipMessage}}</span></div>
  </div>
</template>

<script>
  import { formcontrolmixin } from '@/assetsApp/form/control/formcontrol.js'
  export default {
    name: 'yhm-app-form-select',
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
      rule:{
        type:String,
        default:""
      },
      show:{
        type:Boolean,
        default:true
      }
    },
    methods:{
      callEvent(){
        this.$nextTick(() =>{
          this.$emit("call")
        })
      }
    }
  }
</script>

<style scoped>

</style>
