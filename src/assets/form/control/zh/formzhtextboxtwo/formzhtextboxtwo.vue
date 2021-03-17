<template>
  <div v-if="show" class="fc_main" v-validator="validatorEvent">
    <div class="fc_box">
      <div class="fc_title" :style="{color: color}">
        <div>{{title}}</div>
        <div v-if="subtitle !== ''">{{subtitle}}</div>
      </div>
      <div class="c_main">
        <div v-if="getShowTip" class="c_tip" :class="{c_tip_m:category === 'm'}">
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
        <div class="c_box" @mouseout="mouseoutEvent" @mouseover="mouseoverEvent" :class="{c_error:error,c_hover:mouseStyle,c_focus:focusStyle,c_disable:noEdit}">

            <span v-if="beforeIcon !== ''" class="c_icon" :class="[beforeIcon,{c_icon_m:category === 'm'}]"></span>
            <input v-if="!noEdit" @focus="focusEvent" @blur="blurBeforeEvent" class="c_before fs14" :placeholder="beforePlaceholder" :class="{pl10:beforeIcon === ''}" v-model="beforeVal" @input="inputEvent"/>
            <div v-if="noEdit" class="c_before fs14 c_disable_div" :class="{pl10:beforeIcon === ''}">{{beforeVal}}</div>


          <span class="c_icon c_afterTitle fs14 ml10 mr3">{{afterTitle}}：</span>
          <input v-if="!noEdit" @focus="focusEvent" @blur="blurEvent" class="c_after fs14 mr10" :style="getAfterWidth" :placeholder="afterPlaceholder" v-model="afterVal" />
          <div v-if="noEdit" class="c_after fs14 mr10 c_disable_div" :style="getAfterWidth">{{afterVal}}</div>

        </div>
      </div>
      <slot></slot>
    </div>
    <div class="fc_error"><span v-if="error">{{errorTipMessage}}</span></div>
  </div>
</template>

<script>
  import {verify,tenThousandFormat,number2chinese} from '@/assets/common.js'
  export default {
    name: 'yhm-form-zh-text-two',
    inject: ['p____page'],
    data () {
      return {
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
      category:{
        type:String,
        default:""
      },
      beforePlaceholder:{
        type: String,
        default: '请输入'
      },
      afterPlaceholder:{
        type: String,
        default: '请输入'
      },
      afterWidth:{
        type: String,
        default: '70'
      },
      title: {
        type: String,
        default: '标题'
      },
      subtitle: {
        type: String,
        default: ''
      },
      afterTitle:{
        type: String,
        default: ''
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
      beforeIcon:{
        type:String,
        default:""
      },
      beforeRule:{
        type:String,
        default:""
      },
      afterRule:{
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
      show: {
        type: Boolean,
        default: true
      },
      color: {
        type: String,
        default: '#333'
      },
    },
    methods:{
      //初始化验证事件
      validatorEvent(category){
        if(this.beforeRule !== '' || this.afterRule !== ""){
          var id = this.beforeId + '-' + this.afterId;
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
      //动态改变事件
      inputEvent(){
        this.$nextTick(() =>{
          this.$emit("input")
        })
      },
      //文本框获取焦点
      focusEvent(){
        this.error = false
        this.mouseStyle = false
        this.focusStyle = true
        this.mouseOver = false
      },
      blurBeforeEvent(){
        this.focusStyle = false
        this.verification()
        this.$nextTick(() => {
          this.$emit('beforeBlur')
        })
      },
      //文本框失去焦点
      blurEvent(){
        this.focusStyle = false
        this.verification()
        this.$nextTick(() => {
          this.$emit('afterblurEvent')
        })
      },
      //验证
      verification() {
        var result = true;

        if(this.show && this.beforeRule !== "") {
          let val = this.beforeVal
          let res = verify(val, this.beforeRule)
          result = res.key
          if(!result) {
            if(res.category === 0){
              if(this.emptyMessage === ""){
                this.errorTipMessage = this.title + this.subtitle + res.value
              }
              else{
                this.errorTipMessage = this.title + this.subtitle + this.emptyMessage
              }
            }
            else if(res.category === 1){
              if(this.errorMessage === ""){
                this.errorTipMessage = this.title + this.subtitle + res.value
              }
              else{
                this.errorTipMessage = this.title + this.subtitle + this.errorMessage
              }
            }
          }
        }
        if(result && this.show && this.afterRule !== ""){
          let val = this.afterVal
          let res = verify(val, this.afterRule)
          result = res.key
          if(!result) {
            if(res.category === 0){
              if(this.emptyMessage === ""){
                this.errorTipMessage = this.afterTitle + res.value
              }
              else{
                this.errorTipMessage = this.afterTitle + this.emptyMessage
              }
            }
            else if(res.category === 1){
              if(this.errorMessage === ""){
                this.errorTipMessage = this.afterTitle + res.value
              }
              else{
                this.errorTipMessage = this.afterTitle + this.errorMessage
              }
            }
          }
        }
        this.error = !result
        if(result){
          this.$nextTick(() =>{
            this.$emit('repeatverify')
          })
        }
        return result
      },
      errorEvent(errorMessage){
        this.error = true
        if(errorMessage){
          this.errorTipMessage = errorMessage
        }
        else{
          this.errorTipMessage = this.repeatErrorMessage
        }
      },
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
    filters:{
      format(data,category){
        if(category === "value"){
          return data;
        }
        else if(category === "money"){
          return tenThousandFormat(data);
        }
        return data
      }
    },
    watch:{
      show(newVal,oldVal){
        if(!newVal){
          this.error = false
          this.beforeVal = ""
          this.afterVal = ""
          let js = "this.p____page." + this.beforeId + " = \"\""
          eval(js);
          js = "this.p____page." + this.afterId + " = \"\""
          eval(js);
        }
      },
      before(newVal,oldVal){
        this.beforeVal = newVal
      },
      after(newVal,oldVal){
        this.afterVal = newVal
      },
      beforeVal(newVal,oldVal){
        let js = "this.p____page." + this.beforeId + " = \"" + newVal + "\""
        eval(js);
      },
      afterVal(newVal,oldVal){
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
  .bordertop{
    border-left: 1px solid #BFBFBF;
  }
</style>
