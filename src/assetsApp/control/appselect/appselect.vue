<template>
  <div class="ac_main" v-validator="validatorEvent">
    <div class="ac_box" :class="{ac_focus:touchStyle,ac_error:error}" @touchstart="touchStartEvent" @touchend="touchEndEvent" v-tap="clickEvent">
      <div class="content"></div>
      <div class="ac_icon i-input-right-arrow"></div>
    </div>
  </div>
</template>

<script>
  import { controlmixin } from '@/assetsApp/control/control.js'
  export default {
    name: 'yhm-app-select',
    mixins: [controlmixin],
    data(){
      return{
        txt:this.value,
        touchStyle:false,
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
      //按下事件
      touchStartEvent(){
        this.touchStyle = true
      },
      //抬起事件
      touchEndEvent(){
        this.touchStyle = false
      },
      clickEvent(){
        this.$nextTick(() =>{
          this.$emit("call")
        })
      },
      //验证
      verification() {
        var result = true;
        if(this.show && this.rule !== "") {
          if(this.txt === ''){
            result = false
          }
        }
        //初始化错误信息
        if(!result){
          this.errorTipMessage = this.emptyMessage
        }
        this.error = !result
        return result;
      }
    },
    watch: {
      show (newVal) {
        if (!newVal) {
          this.error = false
          this.txt = ""
          var js = "this.p____page." + this.id + " = \"\""
          eval(js);
        }
      },
      txt(newVal){
        var js = "this.p____page." + this.id + " = \"" + newVal + "\""
        eval(js);
      },
      value(newVal){
        this.txt = newVal
      },
    }
  }
</script>

<style scoped>

</style>
