<template>
  <div v-if="show" class="fc_main">
    <div class="fc_box" >
      <div class="fc_title" :style="{color: color}">
        <div>{{title}}</div>
        <div v-if="subtitle !== ''">{{subtitle}}</div>
      </div>


      <yhm-text  :decimal-places="decimalPlaces" @focus="focusEvent" @blur="blurEvent" :max-length="maxLength" :lessEqual="lessEqual" :lessEqualMessage="lessEqualMessage" @change="changeEvent" @input="inputEvent" :placeholder="placeholder" :type="type" ref="control" :compared="compared" @repeatverify="verifyEvent" @verify="verify" :beforeIcon="beforeIcon" :afterIcon="afterIcon" :tip="tip" :tip-rule="tipRule" :noEdit="noEdit" :value="value" :id="id" :rule="rule" :emptyMessage="emptyMessage" :errorMessage="errorMessage" :repeatMessage="repeatMessage"></yhm-text>
      <span :class="iconName" class="keyboard"  @click="iconCall"></span>

      <slot></slot>
    </div>
    <appLicencePlate class="guessSelector" @btnClick="btnClick" v-show="guessSelectorShow" :key="key" :plate-show="plateShow"  @input="selectArr"></appLicencePlate>
    <div class="fc_error"><span v-if="error">{{errorTipMessage}}</span></div>
  </div>
</template>

<script>
  import appLicencePlate from '@/pagesApp/common/appLicencePlate'
  import { formmixin } from '@/assets/form.js'

  export default {
    name: "yhm-form-test-plate",
    inject: ['p____page'],
    mixins: [formmixin],
    components: {
      appLicencePlate,
    },
    data () {
      return {
        error: false,
        errorTipMessage: '',
        index:'',
        key:0,
        plateShow:true,
        guessSelectorShow:false,
      }
    },
    props: {
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
        default :'i-uniE9A1'
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
      }
    },
    methods: {
      iconCall(){
        this.guessSelectorShow=false
        if(this.guessSelectorShow==false){
          this.guessSelectorShow=true
          this.key++
        }
      },
      btnClick(){
        this.$refs.control.verifications()
      },
      selectArr(value){
        if(value==undefined){return}
        if(typeof value=='object'){
          console.log(this.plate,value,value.join(''))
          this.plate = value.join('')
        }else{
          this.list[this.index].plate = value
        }
      },
      plateValue(index){
        this.index = index
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
          this.$emit("input",this.plate)
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

<style lang="less" scoped>
  *{
    box-sizing: border-box;
  }
  .i-uniE9A1::before{
    float: right;
    margin-right: 10px;
    font-size: 18px;
    margin-top: 10px;
  }


  .plateTest{
    font-size: 14px;
    display: flex;
    align-items: center;
    color: #666666;
    padding:0 12px;
  }
  .plateInput{
    text-indent: 8px;
    width: 378px;
    height: 38px;
    line-height: 38px;
    font-size: 14px;
    border-radius: 5px;
    border: 1px solid #ccc;
    overflow: hidden;
    color: #333333;
    white-space: nowrap;
  }
  .guessSelector{
    height: 0px;
    margin: 0;
  }
  .flex{
    display: flex;
    width: 100%;
    padding: 0 35px 15px 20px;
    margin: 0 auto;
    justify-content: space-between;

    align-items: center;
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
  }
</style>
