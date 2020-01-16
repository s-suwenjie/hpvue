<template>
  <div v-if="show" class="formcontrol" v-validator="validatorEvent">
    <div class="context">
      <div class="title">
        <div>{{title}}</div>
        <div v-if="subtitle !== ''">{{subtitle}}</div>
      </div>
      <div class="content">
        <div @mouseout="mouseoutEvent" @mouseover="mouseoverEvent" class="box" :class="{error:error,hover:mouseStyle,focus:focusStyle}" v-click-control-outside="triggerVerification">
          <input class="txtPaddingLeft10" v-model="txt" type="text" @focus="focusEvent" @blur="blurEvent" :placeholder="valueTip"/>
          <div class="split"></div>
          <input class="makeupTxt txtCenter" v-model="numValue" type="text" @focus="focusEvent" @blur="blurEvent" :placeholder="numTip"/>
          <div class="split"></div>
          <div class="makeupIcon disabled" :class="iconValue" :style="getColor"></div>
          <div class="split"></div>
          <div class="makeupIcon selectColor color" :style="getColor">
            <input type="color" v-model="colorValue">
          </div>
        </div>
      </div>
    </div>
    <div class="error"><span v-if="error">{{errorTipMessage}}</span></div>
  </div>
</template>

<script>
  export default {
    name: 'yhm-titlenumimagecolor',
    inject: ["p____page"],
    data(){
      return{
        isFocus:false,
        txt:this.value,
        numValue:this.num,
        iconValue:this.icon,
        colorValue:this.color,

        focusStyle:false,
        mouseStyle:false,
        mouseOver:false,

        error:false,
        errorTipMessage:""
      }
    },
    props:{
      title:{
        type:String,
        default:"标题"
      },
      subtitle:{
        type:String,
        default:""
      },
      value:{
        type:String,
        required: true
      },
      valueID:{
        type:String,
        required: true
      },
      valueTip:{
        type:String,
        default:""
      },
      num:{
        type:String,
        required: true
      },
      numID:{
        type:String,
        required: true
      },
      numTip:{
        type:String,
        default:""
      },
      icon:{
        type:String,
        required: true
      },
      iconID:{
        type:String,
        required: true
      },
      color:{
        type:String,
        required: true
      },
      colorID:{
        type:String,
        required: true
      },
      emptyMessage:{
        type:String,
        default:"不能为空"
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
      //初始化验证事件
      validatorEvent(category){
        if(this.rule !== "") {
          var id = this.valueID;
          id = id.replace(".","_")
          if (category === "bind") {
            if(this.p____page.p____rule.indexOf(id) === -1){
              this.p____page.p____rule.push(id)
              this.p____page.p____rule[id] = this
            }
          } else if (category === "unbind") {
            let index = this.p____page.p____rule.indexOf(id)
            if(index !== -1){
              this.p____page.p____rule.splice(index,1)
              this.p____page.p____rule[id] = null
            }
          }
        }
      },
      //触发验证
      triggerVerification(){
        if(this.isFocus){
          this.verification()
        }
      },
      //鼠标放上事件
      mouseoverEvent(){
        if (!this.error){
          this.mouseStyle = true
        }
        this.mouseOver = true
      },
      //鼠标移出事件
      mouseoutEvent(){
        if (!this.error) {
          this.mouseStyle = false
        }
        this.mouseOver = false
      },
      //文本框获取焦点
      focusEvent(){
        this.error = false
        this.mouseStyle = false
        this.focusStyle = true
        this.mouseOver = false
      },
      //文本框失去焦点
      blurEvent(){
        this.focusStyle = false
        this.verification()
      },
      //验证
      verification(){
        var result = true
        if(this.show && this.rule !== "") {
          if(this.txt === "" || this.numValue === ""){
            this.errorTipMessage = this.emptyMessage
            result = false
          }
        }
        this.error = !result
        return result
      }
    },
    computed:{
      getColor(){
        this.colorValue  = this.colorValue === "" ? "#49a9ea":this.colorValue
        return "color:" + this.colorValue
      }
    },
    watch:{
      show(newVal,oldVal){
        if(!newVal){
          this.error = false
          var js = "this.p____page." + this.valueID + " = \"\""
          eval(js);
          var js = "this.p____page." + this.numID + " = \"\""
          eval(js);
          var js = "this.p____page." + this.iconID + " = \"\""
          eval(js);
          var js = "this.p____page." + this.colorID + " = \"\""
          eval(js);
        }
      },
      txt(newVal,oldVal){
        var js = "this.p____page." + this.valueID + " = \"" + newVal + "\""
        eval(js);
      },
      value(newVal,oldVal){
        this.txt = newVal
      },
      numValue(newVal,oldVal){
        var js = "this.p____page." + this.numID + " = \"" + newVal + "\""
        eval(js);
      },
      num(newVal,oldVal){
        this.numValue = newVal
      },
      icon(newVal,oldVal){
        this.iconValue = newVal
      },
      colorValue(newVal,oldVal){
        var js = "this.p____page." + this.colorID + " = \"" + newVal + "\""
        eval(js);
      },
      color(newVal,oldVal){
        this.colorValue = newVal
      }
    }
  }
</script>

<style scoped>
  *{
    box-sizing: border-box;
  }
</style>
