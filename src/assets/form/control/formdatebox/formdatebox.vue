<template>
  <div v-if="show" class="fc_main"  :style="widthCalculate">
    <div class="fc_box"  :style="widthCalculate">
      <div class="fc_title" :style="{color: color},{'line-height':getHeight+'px'},{height:getHeight+'px'}">
        <div :style="{color:titleColor}">{{title}}</div>
        <div :style="{color:titleColor}" v-if="subtitle !== ''">{{subtitle}}</div>
      </div>
      <yhm-datebox :placeholder="placeholder" :placeholder-color="placeholderColor" :min-year="minYear" :max-year="maxYear" :width="width" :height="height" :getHeight="getHeight" ref="control" @formVerification="verificationEvent" :no-edit="noEdit" @call="callEvent" :type="type" :emptyMessage="emptyMessage" :errorMessage="errorMessage" :position="position" :max="max" :min="min" :value="value" :id="id" :rule="rule"></yhm-datebox>
      <slot>
      </slot>
    </div>
    <div class="fc_error" v-show="errorShow"><span v-if="error">{{errorTipMessage}}</span></div>

  </div>
</template>

<script>
export default {
  name: 'yhm-form-date',
  inject: ['p____page'],
  data () {
    return {
      error: false,
      errorTipMessage: ''
    }
  },
  props: {
    titleColor:{
      type:String,
      default :''
    },
    type:{
      type:String,
      default:'date'
    },
    errorShow:{
      type:Boolean,
      default:true
    },
    title: {
      type: String,
      default: '标题'
    },
    maxYear:{
      type:Number,
      default: 0
    },
    minYear:{
      type:Number,
      default: 0
    },
    width: {
      type: String,
      default: ''
    },
    height:{
      type: String,
      default: ''
    },
    getHeight:{
      type: String,
      default: ''
    },
    placeholder:{
      type: String,
      default:""
    },
    placeholderColor:{
      type: String,
      default: "#333"
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
    max: {
      type: String,
      default: ''
    },
    min: {
      type: String,
      default: ''
    },
    rule: {
      type: String,
      default: ''
    },
    emptyMessage: {
      type: String,
      default: '不能为空'
    },
    errorMessage: {
      type: String,
      default: ''
    },
    noEdit:{
      type:Boolean,
      default:false
    },
    show: {
      type: Boolean,
      default: true
    },
    position: {
      type: String,
      default: 'down'
    },
    color: {
      type: String,
      default: '#333'
    },

  },
  computed:{
    widthCalculate(){
      if(this.width !== ''){
        let width = parseInt(this.width) + 50
        return 'width:' + width + 'px !important;'
      }
    }
  },
  methods: {
    callEvent(){
      this.$nextTick(() =>{
        this.$emit("call")
      })
    },
    verificationEvent(){
      this.error = this.$refs.control.error
      this.errorTipMessage = this.$refs.control.errorTipMessage
    },
    //主动显示控件错误
    errorEvent(errorMessage){
      this.$refs.control.errorEvent(errorMessage)
    },
    // evil (fn) {
    //   let Fn = Function
    //   return new Fn('return ' + fn)()
    // }
  },
  watch: {
    show (newVal, oldVal) {
      this.error = false
      if (!newVal) {
        this.txt = ''
        let js = 'this.p____page.' + this.id + ' = \'\''
        eval(js)
      }
    },
    value (newVal, oldVal) {
      if(this.show) {
        this.error = this.$refs.control.error
        this.errorTipMessage = this.$refs.control.errorTipMessage
      }
    }
  }
}
</script>

<style scoped>
*{
  box-sizing: border-box;
}
</style>
