<template>
  <div v-if="show" class="fc_main">
    <div class="fc_box" >
      <div class="fc_title" :style="{color: color}">
        <div :style="{color:titleColor}">{{title}}</div>
        <div :style="{'color':subtitleColor}" v-if="subtitle !== ''" @click="subTitleClick" class="subTitleTest">{{subtitle}}</div>
      </div>

<!--      <div v-show="!iconTextShow">-->
        <yhm-text :is-upper-case="isUpperCase" :show="show" @keydownEnter="$emit('keydown',e)" @noEditClick="$emit('noEditClick')" :input-red-show="inputRedShow" v-if="!iconShou" :max-number="maxNumber" :min-number="minNumber" :blank-show="blankShow" :decimal-places="decimalPlaces" @focus="focusEvent" @blur="blurEvent" :max-length="maxLength" :lessEqual="lessEqual" :lessEqualMessage="lessEqualMessage" @change="changeEvent" @input="inputEvent" :placeholder="placeholder" :type="type" ref="control" :compared="compared" @repeatverify="verifyEvent" @verify="verify" :beforeIcon="beforeIcon" :afterIcon="afterIcon" :tip="tip" :tip-rule="tipRule" :noEdit="noEdit" :value="value" :id="id" :rule="rule" :emptyMessage="emptyMessage" :errorMessage="errorMessage" :repeatMessage="repeatMessage"></yhm-text>
        <span class="list_look icon_look"  @click="iconClickEvent" v-show="iconShou"></span>
<!--      </div>-->

<!--      <div v-show="iconTextShow" class="keyboardCenter">-->
<!--        <yhm-text  :decimal-places="decimalPlaces" @focus="focusEvent" @blur="blurEvent" :max-length="maxLength" :lessEqual="lessEqual" :lessEqualMessage="lessEqualMessage" @change="changeEvent" @input="inputEvent" :placeholder="placeholder" :type="type" ref="control" :compared="compared" @repeatverify="verifyEvent" @verify="verify" :beforeIcon="beforeIcon" :afterIcon="afterIcon" :tip="tip" :tip-rule="tipRule" :noEdit="noEdit" :value="value" :id="id" :rule="rule" :emptyMessage="emptyMessage" :errorMessage="errorMessage" :repeatMessage="repeatMessage"></yhm-text>-->
<!--        <span :class="iconName" class="keyboard"  @click="iconClickEvent"></span>-->
<!--      </div>-->
      <span class="i-uniE9A1 icon_look" @click="spshow()" v-show="FormShow"></span>
      <slot></slot>
    </div>
    <div class="fc_error"><span v-if="error">{{errorTipMessage}}</span></div>
  </div>
</template>

<script>
    export default {
      name: "yhm-form-text",
      inject: ['p____page'],
      data () {
        return {
          error: false,
          errorTipMessage: '',
          // FormShow:false,
        }
      },
      props: {
        titleColor:{
          type:String,
          default :''
        },
        inputRedShow:{//这个是开启负数变红的
          type:Boolean,
          default: false
        },
        isUpperCase:{
          type:Boolean,
          default: false
        },
        iconTextShow:{
          type:Boolean,
          default: false
        },
        iconShou:{
          type:Boolean,
          default :false
        },
        iconName:{
          type:String,
          default :'list_look'
        },
        decimalPlaces:{
          type:Number,
          default :null
        },
        maxLength:{
          type: String,
          default:""
        },
        lessEqual:{
          type: String,
          default:""
        },
        lessEqualMessage:{
          type: String,
          default:""
        },
        placeholder:{
          type: String,
          default:""
        },
        compared:{
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
        subtitleColor: {
          type: String,
          default: '#333'
        },
        id: {
          type: String,
          required: true
        },
        value: {
          type: String,
          required: true
        },
        rule: {
          type: String,
          default: ''
        },
        emptyMessage: {
          type: String,
          default: ''
        },
        errorMessage: {
          type: String,
          default: ''
        },
        repeatMessage:{
          type:String,
          default:""
        },
        beforeIcon:{
          type:String,
          default:""
        },
        afterIcon:{
          type:String,
          default:""
        },
        blankShow:{//是否去除框内值的空格
          type:Boolean,
          default:false
        },
        tip:{
          type:String,
          default:""
        },
        tipRule:{
          type:String,
          default:""
        },
        noEdit:{
          type:String,
          default:""
        },
        show: {
          type: Boolean,
          default: true
        },
        color: {
          type: String,
          default: '#333'
        },
        FormShow:{
          type:Boolean,
          default:false
        },
        maxNumber:{
          //type:Number,
          default:''
        },
        minNumber:{
          //type:Number,
          default:''
        }
      },
      methods: {
        subTitleClick(){
          this.$nextTick(() =>{
            this.$emit("subClick")
          })
        },
        iconClickEvent(){
          this.$nextTick(() =>{
            this.$emit("call")
          })
        },
        changeEvent(){
          this.$emit("change")
        },
        inputEvent(){
          this.$nextTick(() =>{
            this.$emit("input")
          })
        },
        verify(){
          this.error = this.$refs.control.error
          this.errorTipMessage = this.$refs.control.errorTipMessage
        },
        verifyEvent(){
          this.$emit("repeatverify")
        },
        //主动显示控件错误
        errorEvent(errorMessage){
          this.$refs.control.errorEvent(errorMessage)
        },
        blurEvent(){
          this.$nextTick(() => {
            this.$emit("blur")
          })
        },
        focusEvent(){
          this.$nextTick(() => {
            this.$emit("focus")
          })
        },
        verifications(){
          this.$refs.control.verification()
        },
        spshow(){
          this.$emit("iconClick")
        }
      },
      watch: {
        show (newVal, oldVal) {
          this.error = false
          if (!newVal) {
            this.txt = ''
            var js = 'this.p____page.' + this.id + ' = \'\''
            eval(js)
          }
        },
        value(newVal, oldVal) {
          this.error = this.$refs.control.error
          this.errorTipMessage = this.$refs.control.errorTipMessage
        }
      }
    }
</script>

<style scoped>
  *{
    box-sizing: border-box;
  }
  .keyboardCenter{
    display: flex;
    justify-content: space-between;
  }
  .keyboard::before{
    float: right;
    margin-left: 10px;
    font-size: 24px;
    color: #49a9ea;
    margin-top: 8px;
  }
  .icon_look{
    font-size: 20px;
    color: #49a9ea;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin-left: 10px;
  }
  .subTitleTest{
    cursor: pointer;
  }
</style>
