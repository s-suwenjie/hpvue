<template>
  <div v-if="show" class="fc_main" v-validator="validatorEvent">
    <div class="fc_box">
      <div class="fc_title">
        <div>{{title}}</div>
        <div v-if="subtitle !== ''">{{subtitle}}</div>
      </div>
      <div class="c_main">
        <div v-if="getShowTip" class="c_tip">
          <div>
            {{beforeVal|format(tipBefore)}}
            <span v-show="beforeVal !== '' && tipBefore === 'money'">{{getTxtBig(beforeVal,0)}}</span>
            <span v-show="afterVal !== ''">
              {{afterTitle}}：{{afterVal|format(tipAfter)}}
            </span>
            <span v-show="afterVal !== '' && tipAfter === 'money'">{{afterTitle}}：{{getTxtBig(afterVal,1)}}</span>
            <img src="./images/arrow.png">
          </div>
        </div>
        <div class="c_box" @click="clickEvent" @mouseout="mouseoutEvent" @mouseover="mouseoverEvent" :class="{c_error:error,c_hover:mouseStyle,c_focus:focusStyle,c_disable:noEdit}">
          <div class="c_before fs14 pl10" :class="{pl10:beforeIcon === ''}">{{beforeVal}}</div>
          <span class="c_icon" style="width: 30px;" :class="[beforeIcon]"></span>
          <span @click.stop class="c_icon c_afterTitle c_afterTitle_lb fs14 mr3 pl5" >{{afterTitle}}：</span>
          <input v-if="!noEdit" @click.stop @focus="focusEvent" @blur="blurEvent" class="c_after fs14 mr10" :style="getAfterWidth" :placeholder="afterPlaceholder" v-model="afterVal" />
          <div v-if="noEdit" class="c_after fs14 mr10 c_disable_div" :style="getAfterWidth">{{afterVal}}</div>
        </div>
      </div>
    </div>
    <div class="fc_error"><span v-if="error">{{errorTipMessage}}</span></div>
  </div>
</template>

<script>
  import {verify,tenThousandFormat,number2chinese,formatPhone} from '@/assets/common.js'
  export default {
    name: 'yhm-form-zh-select-text',
    inject: ['p____page'],
    data () {
      return {
        beforeIcon:'i-input-right-arrow',
        beforeVal:this.before,
        afterVal:this.after,
        mouseStyle:false,
        mouseOver:false,
        focusStyle:false,
        error: false,
        errorTipMessage: ''
      }
    },
    props: {
      afterPlaceholder:{
        type: String,
        default: '请输入'
      },
      afterWidth:{
        type: String,
        default: '70'
      },
      before:{
        type:String,
        required: true
      },
      beforeId:{
        type:String,
        required: true
      },
      after:{
        type:String,
        required: true
      },
      afterId:{
        type:String,
        required: true
      },
      title: {
        type: String,
        default: '标题'
      },
      subtitle: {
        type: String,
        default: ''
      },
      afterTitle: {
        type: String,
        default: '标题'
      },
      tipBefore:{
        type:String,
        default:""
      },
      tipAfter:{
        type:String,
        default:""
      },
      noEdit:{
        type:Boolean,
        default:false
      },
      emptyMessageBefore:{
        type:String,
        default:"不能为空"
      },
      emptyMessageAfter:{
        type:String,
        default:"不能为空"
      },
      errorMessageAfter:{
        type:String,
        default:"格式不正确"
      },
      beforeRule:{
        type:String,
        default:""
      },
      afterRule:{
        type:String,
        default:""
      },
      show: {
        type: Boolean,
        default: true
      }
    },
    methods : {
      //初始化验证事件
      validatorEvent(category){
        if(this.beforeRule !== '' || this.afterRule !== ""){
          let id = this.beforeId + '-' + this.afterId;
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
      },
      //文本框失去焦点
      blurEvent(){
        this.focusStyle = false
        this.verification()
      },
      clickEvent(){
        if(!this.noEdit){
          this.$emit("call")
        }
      },
      //验证
      verification() {
        let result = true
        if(this.show && this.beforeRule !== "") {
          let val = this.beforeVal
          if (val === ''){
            this.errorTipMessage = this.emptyMessageBefore
            result = false
          }
        }
        if(result && this.show && this.afterRule !== ""){
          let val = this.afterVal
          let res = verify(val, this.afterRule)
          result = res.key
          if(!result) {
            if (res.category === 0) {
              if(this.emptyMessageAfter === ""){
                this.errorTipMessage = this.afterTitle + res.value
              }
              else{
                this.errorTipMessage = this.afterTitle + this.emptyMessageAfter
              }
            }
            else{
              if(this.errorMessageAfter === ""){
                this.errorTipMessage = this.afterTitle + res.value
              }
              else{
                this.errorTipMessage = this.afterTitle + this.errorMessageAfter
              }
            }
          }
        }
        this.error = !result
        return result
      }
    },
    filters:{
      format(data,category){
        if(category === "value"){
          return data;
        }
        else if(category === "money"){
          return tenThousandFormat(data);
        }
        else if(category === 'phone'){
          return formatPhone(data)
        }
        return data
      }
    },
    computed:{
      getShowTip(){
        return (this.tipBefore !== "" || this.tipAfter !== '') && (this.beforeVal !== "" || this.afterVal !== '') && (this.focusStyle || this.mouseOver)
      },
      getTxtBig(){
        return function (txt,category) {
          if((category === 0 && this.tipBefore === "money") || (category === 1 && this.tipAfter === "money")) {
            return number2chinese(txt)
          }
          else{
            return ""
          }
        }
      },
      getAfterWidth(){
        return 'width:' + this.afterWidth + 'px'
      }
    },
    watch: {
      show (newVal) {
        if (!newVal) {
          this.error = false
          this.beforeVal = ""
          this.afterVal = ""
          let js = "this.p____page." + this.beforeId + " = \"\""
          eval(js);
          js = "this.p____page." + this.afterId + " = \"\""
          eval(js);
        }
      },
      before(newVal){
        this.beforeVal = newVal
      },
      after(newVal){
        this.afterVal = newVal
      },
      beforeVal(newVal){
        this.verification()
        let js = "this.p____page." + this.beforeId + " = \"" + newVal + "\""
        eval(js);
      },
      afterVal(newVal){
        let js = "this.p____page." + this.afterId + " = \"" + newVal + "\""
        eval(js);
      }
    }
  }
</script>

<style scoped>
  *{
    box-sizing: border-box;
  }
</style>
