<template>
  <div v-if="show" :style="getWidth" class="c_main" :class="{c_main_m:category === 'm'}" v-validator="validatorEvent">
    <div v-if="getShowTip" :style="getTipStyle" class="c_tip" :class="{c_tip_m:category === 'm'}">
      <div>
        {{txt|format(tip,tipRule)}}
        <span v-show="txt !== '' && this.tip === 'money'">{{getTxtBig}}</span>
        <img :style="getTipArrowLeft" src="./images/arrow.png">
      </div>
    </div>
    <!--decimalPlaces:{{decimalPlaces}}<br>
    type:{{type}}<br>-->
    <div @mouseout="mouseoutEvent" @mouseover="mouseoverEvent" class="c_box" :class="{c_error:error,c_hover:mouseStyle,c_focus:focusStyle,c_disable:noEdit === '1'}">
      <span v-if="beforeIcon != ''" @click="getFocus" class="c_icon" :class="[beforeIcon,{c_icon_m:category === 'm'}]"></span>
      <input v-if="noEdit !== '1'" :maxlength="maxNum" ref="txt" class="c_content" v-model="txt" :style="getTxtWidth" :class="{pl10:beforeIcon == '',pr10:afterIcon == '',c_content_m:category === 'm'}" :type="type" :placeholder="placeholder" @input="inputEvent" @focus="focusEvent" @keydown.enter="keyDownEnter" @click.stop @blur="blurEvent" @change="changeEvent"/>
      <div v-if="noEdit === '1'" class="c_content_show" :style="getTxtWidth" :class="{pl10:beforeIcon == '',pr10:afterIcon == '',c_content_show_m:category === 'm'}">
        {{txt}}
        <template v-if="txt === ''">
          {{placeholder}}
        </template>
      </div>
      <span v-if="afterIcon != ''" @click="getFocus" class="c_icon" :class="[afterIcon,{c_icon_m:category === 'm'}]"></span>
    </div>
  </div>
</template>

<script>
  import {verify,tenThousandFormat,number2chinese,accAdd,formatPhone,formatCustomizeTip} from '@/assets/common.js'
  export default {
    name: "yhm-text",
    inject: ["p____page"],
    data(){
      return{
        //input
        txt:this.value,
        txtBig:'',
        focusStyle:false,
        mouseStyle:false,
        mouseOver:false,
        error:false,
        repeatErrorMessage:this.repeatMessage,
        errorTipMessage:"",
        maxNum:this.maxLength
      }
    },
    props:{

      isUpperCase:{
        type:Boolean,
        default: false
      },
      decimalPlaces:{
        type:Number,
        default :null
      },
      maxLength:{
        type: String,
        default:""
      },
      tipWidth:{
        type: String,
        default:""
      },
      tipLeft:{
        type: String,
        default:""
      },
      tipArrowLeft:{
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
      compared:{
        type: String,
        default:""
      },
      placeholder:{
        type: String,
        default:""
      },
      type:{
        type: String,
        default:"text"
      },
      width:{
        type: String,
        default:""
      },
      category:{
        type:String,
        default:""
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
      afterIcon:{
        type:String,
        default:""
      },
      rule:{
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
      emptyMessage:{
        type:String,
        default:""
      },
      errorMessage:{
        type:String,
        default:""
      },
      repeatMessage:{
        type:String,
        default:""
      },
      noEdit:{
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
      inputEvent(){
        this.$nextTick(() =>{
          this.$emit("input")
        })
      },
      keyDownEnter(){
        this.$emit("keydownEnter")
      },
      changeEvent(){
        this.$emit("change")
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
          //form页面错误开关
          this.$emit("verify")
          this.$emit("focus")
        })
      },
      //文本框失去焦点
      blurEvent(){
        this.focusStyle = false
        this.verification()
        this.$nextTick(() =>{
          this.$emit("blur")
          //form页面错误开关
          this.$emit("verify")
        })
      },
      //让文文本框获取焦点
      getFocus(){
        if(this.noEdit !== "1") {
          this.$refs.txt.focus()
          this.$nextTick(() =>{
            //form页面错误开关
            this.$emit("verify")
          })
        }
      },
      initTxtBig(){
        if(this.tip === "money") {
          return number2chinese(this.txt)
        }
        else{
          return ""
        }
      },
      //主动显示控件错误
      errorEvent(errorMessage){
        this.error = true
        if(errorMessage){
          this.errorTipMessage = errorMessage
        }
        else{
          this.errorTipMessage = this.repeatErrorMessage
        }
        this.$nextTick(() =>{
          //form页面错误开关
          this.$emit("verify")
        })
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
        if(result){
          if(this.compared !== ''){
            if(this.txt !== this.compared){
              result = false
              this.errorTipMessage = this.repeatMessage
            }
          }

          if(this.lessEqual !== '' && !isNaN(this.lessEqual)) {
            if(parseFloat(this.lessEqual) < parseFloat(this.txt)) {
              this.errorTipMessage = this.lessEqualMessage
              result = false
            }
          }
          this.$nextTick(() =>{
            this.$emit('repeatverify')
          })
        }
        this.error = !result
        this.$nextTick(() =>{
          this.$emit("verify")
        })
        return result;
      }
    },
    filters:{
      format(data,category,rule){
        if(category === "value"){
          return data;
        }
        else if(category === "money"){
          return tenThousandFormat(data);
        }
        else if(category === 'phone'){
          return formatPhone(data)
        }
        else if(category === 'customize'){
          return formatCustomizeTip(data,rule)
        }
        return data
      }
    },
    computed:{
      getTipStyle(){
        let result = ''
        if(this.tipLeft !== ''){
          result += 'left:' + this.tipLeft + 'px;'
        }
        if(this.tipWidth !== ''){
          result += 'width:' + this.tipWidth + 'px;'
        }
        return result
      },
      getTipArrowLeft(){
        if(this.tipArrowLeft === ''){
          return ''
        }
        return 'left:' + this.tipArrowLeft + 'px'
      },
      getShowTip(){
        return this.tip != "" && this.txt != "" && (this.focusStyle || this.mouseOver)
      },
      getWidth(){
        if(this.width !== '') {
          return 'width:' + this.width + 'px !important;'
        }
        else{
          return ''
        }
      },
      getTxtWidth(){
        let width = this.width
        if(this.width !== '') {
          if(this.beforeIcon === ''){
            width = accAdd(width,-10)
          }
          else{
            if(this.category === 'm'){
              width = accAdd(width,-28)
            }
            else{
              width = accAdd(width,-38)
            }
          }
          if(this.afterIcon === ''){
            width = accAdd(width,-10)
          }
          else{
            if(this.category === 'm'){
              width = accAdd(width,-28)
            }
            else{
              width = accAdd(width,-38)
            }
          }
          return 'width:' + width + 'px !important;'
        }
        else{
          return ''
        }
      },
      getTxtBig(){
        return this.initTxtBig()
      }
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
        // console.log('txt')
        let val = newVal
        if(this.isUpperCase){
          val = newVal.toUpperCase()
        }
        // if(val !== '' && this.type === 'number'){
        //   val = val.replace(/[^0123456789]/g,'')
        // }
        // console.log(val)
        var js = "this.p____page." + this.id + " = \"" + val + "\""
        eval(js);
        this.initTxtBig()
      },
      value(newVal,oldVal){
        // console.log('value：' + newVal)
        this.txt = newVal
        if(this.isUpperCase){
          this.txt = newVal.toUpperCase()
        }
        //this.verification()
      },
      compared(newVal,oldVal){
        if(newVal !== '' && this.txt !== ''){
          this.verification()
        }
      },
      noEdit(newVal){
        if(newVal === '1'){
          this.error = false
        }
      },
      lessEqual(newVal){
        if(newVal !== '' && !isNaN(newVal)){
          if(this.show && this.rule !== "") {
            var val = this.txt
            var res = verify(val, this.rule)
            if(res.key){
              if(parseFloat(newVal) < parseFloat(this.txt)) {
                this.error = true
                this.errorTipMessage = this.lessEqualMessage
              }
               else{
                this.error = false
              }
              this.$nextTick(() =>{
                this.$emit("verify")
              })
            }

          }
        }
      }
    },
    created : function() {
      if(this.tip === 'phone'){
        this.maxNum = '11'
      }
    }
  }
</script>

<style scoped>
  *{
    box-sizing: border-box;
  }

</style>
