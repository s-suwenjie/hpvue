<template>
  <div v-if="show" class="fc_main">
    <div class="fc_box">
      <div class="fc_title">
        <div>{{title}}</div>
        <div v-if="subtitle !== ''">{{subtitle}}</div>
      </div>
      <div class="c_main" v-validator="validatorEvent">
        <div @mouseout="mouseoutEvent" @mouseover="mouseoverEvent" class="c_box" :class="{c_error:error,c_hover:mouseStyle,c_focus:focusStyle,c_disable:noEdit}">
          <span v-if="beforeIcon !== ''" @click="getFocus" class="c_icon" :class="beforeIcon"></span>
          <input v-if="!noEdit" ref="txt" class="c_content" v-model="txt" :class="{pl10:beforeIcon === '',pr10:1===1}" :type="type" @focus="focusEvent" @blur="blurEvent"/>

          <div v-if="noEdit" class="c_content_show" :style="getTxtWidth" :class="{pl10:beforeIcon === '',pr10:1===1}">{{txt}}</div>

          <div v-for="(item,index) in checkList" :key="index" class="text_checkbox disable_menu" @click="clickCheckBoxEvent(item)" :class="{text_checkbox_select:getCheckSelected(item,checkValue),c_disable:checkDisabled}">
            <div class="check_button_icon" :class="{check_button_icon_select:getCheckSelected(item,checkValue)}"></div>
            <div class="pl5">{{item.showName}}</div>
          </div>
        </div>
      </div>
      <slot></slot>
    </div>
    <div :class="{fc_error:error,fc_tip:!error}">
      <span v-if="error">{{errorTipMessage}}</span>
      <span v-if="!error">{{tipMessage}}</span>
    </div>
  </div>
</template>

<script>
  import {verify} from '@/assets/common.js'
  export default {
    name: "yhm-form-zh-text-more-checkbox",
    inject: ['p____page'],
    data () {
      return {
        txt:this.value,
        focusStyle:false,
        mouseStyle:false,
        mouseOver:false,
        error: false,
        errorTipMessage: ''
      }
    },
    props: {
      tipMessage:{
        type: String,
        default:""
      },
      type:{
        type: String,
        default:"text"
      },
      title: {
        type: String,
        default: '标题'
      },
      subtitle: {
        type: String,
        default: ''
      },
      checkDisabled: {
        type:Boolean,
        default:false
      },
      checkList:{
        type:Array,
        required:true
      },
      checkValue:{
        type:String,
        required:true
      },
      checkValueId:{
        type:String,
        required:true
      },
      value:{
        type:String,
        required:true
      },
      id:{
        type:String,
        required:true
      },
      beforeIcon:{
        type:String,
        default:""
      },
      noEdit:{
        type:Boolean,
        default:false
      },
      emptyMessage:{
        type:String,
        default:""
      },
      errorMessage:{
        type:String,
        default:""
      },
      rule:{
        type:String,
        default:""
      },
      show: {
        type: Boolean,
        default: true
      }
    },
    methods: {
      //初始化验证事件
      validatorEvent(category){
        if(this.rule !== "") {
          var id = this.id;
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
        this.$nextTick(() =>{
          this.$emit("focus")
        })
      },
      //文本框失去焦点
      blurEvent(){
        this.focusStyle = false
        this.verification()
        // this.$nextTick(() =>{
        //   this.$emit("verify")
        // })
      },
      //主动显示控件错误
      errorEvent(errorMessage){
        this.$refs.txt.errorEvent(errorMessage)
      },
      //让文文本框获取焦点
      getFocus(){
        if(!this.noEdit) {
          this.$refs.txt.focus()
          // this.$nextTick(() =>{
          //   this.$emit("verify")
          // })
        }
      },
      clickCheckBoxEvent(item){
        if(!this.checkDisabled) {
          var js = "this.p____page." + this.checkValueId + " = \"" + item.num + "\""
          eval(js);
          this.$nextTick(() => {
            this.$emit("clickCheckBox",item.num)
          })
        }
      },
      //主动显示控件错误
      errorEvent(errorMessage){
        this.error = true
        this.errorTipMessage = errorMessage
      },
      //验证
      verification(paramVal){
        var result = true;
        if(this.show && this.rule !== "") {
          var val = this.txt
          if(paramVal){
            val = paramVal
          }
          var res = verify(val, this.rule)
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
        return result
      }
    },
    computed:{
      getCheckSelected(){
        return function (item,value) {
          return item.num === value
        }
      }
    },
    watch:{
      show(newVal,oldVal){
        if(!newVal){
          this.error = false
          this.txt = ""
          var js = "this.p____page." + this.id + " = \"\""
          eval(js);
          var js = "this.p____page." + this.checkValueId + " = \"0\""
          eval(js);
        }
      },
      // checkValue(newVal,oldVal){
      //   var js = "this.p____page." + this.checkValueId + " = \"" + newVal + "\""
      //   eval(js);
      // },
      txt(newVal,oldVal){
        var js = "this.p____page." + this.id + " = \"" + newVal + "\""
        eval(js);
      },
      value(newVal,oldVal){
        this.txt = newVal
      },
    }
  }
</script>

<style scoped>
  *{
    box-sizing: border-box;
  }
</style>
