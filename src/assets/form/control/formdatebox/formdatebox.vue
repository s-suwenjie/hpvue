<template>
  <div v-if="show" class="fc_main">
    <div class="fc_box">
      <div class="fc_title" :style="{color: color}">
        <div>{{title}}</div>
        <div v-if="subtitle !== ''">{{subtitle}}</div>
      </div>
      <yhm-datebox :placeholder="placeholder" :placeholder-color="placeholderColor" ref="control" @formVerification="verificationEvent" :no-edit="noEdit" @call="callEvent" :type="type" :emptyMessage="emptyMessage" :errorMessage="errorMessage" :position="position" :max="max" :min="min" :value="value" :id="id" :rule="rule"></yhm-datebox>
      <slot>
      </slot>
    </div>
    <div class="fc_error"><span v-if="error">{{errorTipMessage}}</span></div>

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
    type:{
      type:String,
      default:'date'
    },
    title: {
      type: String,
      default: '标题'
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
    evil (fn) {
      let Fn = Function
      return new Fn('return ' + fn)()
    }
  },
  watch: {
    show (newVal, oldVal) {
      this.error = false
      if (!newVal) {
        this.txt = ''
        var js = 'this.p____page.' + this.id + ' = \'\''
        this.evil(js)
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
