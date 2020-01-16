<template>
  <div v-if="show" class="fc_main">
    <div class="fc_box">
      <div class="fc_title" :style="{color: color}">
        <div>{{title}}</div>
        <div v-if="subtitle !== ''">{{subtitle}}</div>
      </div>
      <yhm-text :show="show" :decimal-places="decimalPlaces" @blur="blurEvent" :max-length="maxLength" :lessEqual="lessEqual" :lessEqualMessage="lessEqualMessage" @change="changeEvent" @input="inputEvent" :placeholder="placeholder" :type="type" ref="control" :compared="compared" @repeatverify="verifyEvent" @verify="verify" :beforeIcon="beforeIcon" :afterIcon="afterIcon" :tip="tip" :noEdit="noEdit" :value="value" :id="id" :rule="rule" :emptyMessage="emptyMessage" :errorMessage="errorMessage" :repeatMessage="repeatMessage"></yhm-text>
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
          errorTipMessage: ''
        }
      },
      props: {
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
        tip:{
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
        }
      },
      methods: {
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
</style>
