<template>
    <div class="ac_main" v-validator="validatorEvent">
      <div class="ac_box" :class="{ac_focus:controlFocus,ac_error:error,app_disable:noEdit}">
        <input v-show="!noEdit" type="text" @focus="focusEvent" @blur="blurEvent" v-model="txt" >
        <div v-show="noEdit" class="show amr4">
          {{txt}}
        </div>
      </div>
    </div>
</template>

<script>
  import { controlmixin } from '@/assetsApp/control/control.js'
  export default {
    name: 'yhm-app-text-box',
    mixins: [controlmixin],
    data(){
      return{
        txt:this.value,
        controlFocus:false,
        error:false,
        errorTipMessage:this.emptyMessage                     //为空提示语
      }
    },
    props:{
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
      noEdit:{
        type:Boolean,
        default:false
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
    methods : {
      focusEvent(){
        this.error = false
        this.controlFocus = true
        this.$nextTick(()=>{
          this.$emit('focus')
        })
      },
      blurEvent(){
        this.controlFocus = false
        this.$nextTick(()=>{
          this.$emit('blur')
        })
      },
      //验证
      verification() {
        var result = true;
        if(this.show && this.rule !== "") {
          var val = this.txt
          var res = this.verifyEvent(val)
          result = res.key
          if(!result) {
            if(res.category === 0){
              if(this.emptyMessage === ""){
                this.errorTipMessage = res.value
              }
              else{
                this.errorTipMessage = this.emptyMessage
              }
            }
            else if(res.category === 1){
              if(this.errorMessage === ""){
                this.errorTipMessage = res.value
              }
              else{
                this.errorTipMessage = this.errorMessage
              }
            }
          }
        }
        this.error = !result
        return result;
      }
    },
    watch:{
      show(newVal,oldVal){
        if(!newVal){
          this.error = false
          this.txt = ""
          var js = "this.p____page." + this.id + " = \"\""
          eval(js);
        }
      },
      txt(newVal,oldVal){
        var js = "this.p____page." + this.id + " = \"" + newVal + "\""
        eval(js);
      },
      value(newVal,oldVal){
        this.txt = newVal
      },
      error(newVal){
        //执行form控件中的错误显示
        this.$emit("formVerification",this.error,this.errorTipMessage)
      }
    }
  }
</script>

<style scoped>
  *{
    box-sizing: border-box;
  }
</style>
