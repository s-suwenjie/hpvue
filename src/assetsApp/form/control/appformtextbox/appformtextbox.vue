<template>
    <div class="afc_main">
      <div class="afc_title">{{title}}</div>
      <yhm-app-text-box :no-edit="noEdit" @blur="blurEvent" @focus="focusEvent" :show="show" :empty-message="title + emptyMessage" :error-message="title + errorMessage" :value="value" :id="id" :rule="rule" @formVerification="formVerificationEvent"></yhm-app-text-box>
      <div class="afc_error"><span v-if="error">{{errorTipMessage}}</span></div>
    </div>
</template>

<script>
  import { formcontrolmixin } from '@/assetsApp/form/control/formcontrol.js'
  export default {
    name: 'yhm-app-form-text-box',
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
      errorMessage: {
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
      noEdit:{
        type:Boolean,
        default:false
      },
      show:{
        type:Boolean,
        default:true
      }
    },
    methods:{
      blurEvent(){
        this.$nextTick(()=>{
          this.$emit('blur')
        })
      },
      focusEvent(){
        this.$nextTick(()=>{
          this.$emit('focus')
        })
      }
    }
  }
</script>

<style scoped>
  *{
    box-sizing: border-box;
  }
</style>
