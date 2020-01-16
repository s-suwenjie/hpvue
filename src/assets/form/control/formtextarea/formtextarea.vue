<template>
  <div v-if="show" class="fc_main fc_main_w">
    <div class="fc_box">
      <div class="fc_title">
        <div>{{title}}</div>
        <div v-if="subtitle !== ''">{{subtitle}}</div>
      </div>
      <div class="c_main c_main_t c_textarea" v-validator="validatorEvent">
        <div @mouseout="mouseoutEvent" @mouseover="mouseoverEvent" class="c_box c_textarea" :class="{c_error:error,c_hover:mouseStyle,c_focus:focusStyle}">
          <textarea :readonly="noEdit === '1'" v-model="txt" ref="control" :class="{c_disable:noEdit === '1'}" @focus="focusEvent" @blur="blurEvent" @input="autoTextarea"></textarea>
        </div>
        <div class="c_box c_textarea c_copy">
          <textarea v-model="txt" ref="controlHide"></textarea>
        </div>
      </div>
      <slot></slot>
    </div>
    <div class="fc_error"><span v-if="error">{{errorTipMessage}}</span></div>
  </div>
</template>

<script>
  import {verify,accAdd,accMul} from '@/assets/common.js'
    export default {
      name: "yhm-form-textarea",
      inject: ['p____page'],
      data () {
        return {
          txt: this.value,
          isHeight:true,
          focusStyle:false,
          mouseStyle:false,
          mouseOver:false,
          error: false,
          errorTipMessage: ''
        }
      },
      props: {
        //最大高度
        maxHeight:{
          type: Number,
          default:0
        },
        title: {
          type: String,
          default: '标题'
        },
        subtitle: {
          type: String,
          default: ''
        },
        id: {
          type: String,
          required: true
        },
        value: {
          type: String,
          required: true
        },
        rule:{
          type:String,
          default:""
        },
        emptyMessage:{
          type:String,
          default:""
        },
        errorMessage:{
          type:String,
          default:""
        },
        noEdit:{
          type:String,
          default:"0"
        },
        show: {
          type: Boolean,
          default: true
        }
      },
      methods:{
        //初始化验证事件
        validatorEvent(category){
          if(this.show && this.rule !== "") {
            var id = this.id;
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
        autoTextarea(){
          let minHeight = 0,maxHeight = this.maxHeight,style,scrollHeight,paddingTop,paddingBottom,padding
          // this.$nextTick(function () {
          //   if(this.isHeight){
          //     this.isHeight =  false
          //     minHeight = parseFloat(window.getComputedStyle(this.$refs.control).height)
          //   }
          //   paddingTop = parseInt(window.getComputedStyle(this.$refs.control).paddingTop)
          //   paddingBottom = parseInt(window.getComputedStyle(this.$refs.control).paddingBottom)
          //   style = this.$refs.control.style
          //   scrollHeight = this.$refs.controlHide.scrollHeight
          //   if (scrollHeight > minHeight) {
          //     if (maxHeight && scrollHeight > maxHeight) {
          //       style.height = maxHeight + 'px'
          //     }
          //     else{
          //       padding = accMul(accAdd(paddingTop,paddingBottom),-1)
          //       style.height = accAdd(scrollHeight,padding) + 'px'
          //     }
          //   }
          // })
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
          var result = true;
          if(this.show && this.rule !== "") {
            var val = this.txt
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
          return result;
        }
      },
      mounted(){
        this.autoTextarea()
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
          //var js = "this.p____page." + this.id + " = \"" + newVal + "\""
          var js = "this.p____page." + this.id + " = newVal"
          eval(js);
        },
        value(newVal,oldVal){
          this.txt = newVal
          this.autoTextarea()
        }
      }
    }
</script>

<style scoped>
*{
  box-sizing: border-box;
}
</style>
