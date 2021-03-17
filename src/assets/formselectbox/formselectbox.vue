<template>
  <div v-if="show" class="fc_main" v-validator="validatorEvent" :class="{formradiobuttonWidth:getWidth}">
    <div v-if="getShowTip" class="c_tip left85 bottom70">
      <div>
        <template v-if="tips.length > 0" v-for="(item,index) in tips">
          {{item}}
          <br v-if="tips.length - 1 > index">
        </template>
        <template v-if="tips.length === 0">
          {{txt|format(tip)}}
        </template>
        <img style="position: absolute;bottom: -19px;" src="./images/arrow.png">
      </div>
    </div>
    <div class="fc_box">
      <div class="fc_title">
        <div :style="{color:titleColor}">{{title}}</div>
        <div v-if="subtitle !== ''">{{subtitle}}</div>
      </div>
      <div class="c_main" :class="{boxWidth:getWidth}">
        <div @click="clickEvent" @mouseout="mouseoutEvent" @mouseover="mouseoverEvent" class="c_box"  :class="{c_error:error,c_hover:mouseStyle,c_disable:noClick}">
          <div class="pl10 c_content_div" v-if="txt!=''">{{txt}}</div>
          <div class="pl10 c_content_div" style="color: #D3D3D3;" v-else>{{defaultTxt}}</div>
          <span class="c_icon" @click.stop="iconClickEvent" @mouseout="mouseoutIconEvent" @mouseover="mouseoverIconEvent" :class="[afterIcon,{red:iconMouseStyle}]"></span>
        </div>
      </div>

      <slot></slot>

    </div>
    <div class="fc_error"><span v-if="error">{{bottomMessage}}</span><span v-if="error && (bottomMessage=='')">{{errorTipMessage}}</span></div>
  </div>
</template>

<script>
import { verify } from '@/assets/common.js'
export default {
  name: 'yhm-form-select',
  inject: ["p____page"],
  data () {
    return {
      txt: this.value,
      afterIcon: 'i-input-right-arrow',
      mouseStyle: false,
      mouseOver: false,
      iconMouseStyle:false,
      error: false,
      errorTipMessage: ''
    }
  },
  props: {
    titleColor:{
      type:String,
      default :''
    },
    title: {
      type: String,
      default: '标题'
    },
    defaultTxt:{
      type:String,
      default:''
    },
    subtitle: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    },
    noClick:{
      type:Boolean,
      default:false
    },
    id: {
      type: String,
      default: ''
    },
    rule: {
      type: String,
      default: ''
    },
    tip: {
      type: String,
      default: ''
    },
    tips:{
      type:Array,
      default:function () {
        return []
      }
    },
    emptyMessage: {
      type: String,
      default: ''
    },
    errorMessage: {
      type: String,
      default: ''
    },
    repeatMessage: {
      type: String,
      default: ''
    },
    show: {
      type: Boolean,
      default: true
    },
    width:{
      type:String,
      default:"0"
    },
    bottomMessage:{
      type:String,
      default:"",
    }
  },

  methods: {
    // 初始化验证事件
    validatorEvent (category) {
      if (this.rule !== '') {
        var id = this.id
        id = id.replace('.', '_')
        if (category === 'bind') {
          if (this.p____page.p____rule.indexOf(id) === -1) {
            this.p____page.p____rule.push(id)
            this.p____page.p____rule[id] = this
          }
        } else if (category === 'unbind') {
          let index = this.p____page.p____rule.indexOf(id)
          if (index !== -1) {
            this.p____page.p____rule.splice(index, 1)
            this.p____page.p____rule[id] = null
          }
        }
      }
    },
    //主动显示控件错误
    errorEvent(errorMessage){
      setTimeout(()=>{
        this.error = true
      },0)
      if(errorMessage){
        this.errorTipMessage = errorMessage
      }
      else{
        this.errorTipMessage = this.repeatErrorMessage
      }
    },
    //图标的鼠标移入事件
    mouseoverIconEvent(){
      if(this.txt === ''){
        this.iconMouseStyle = false
      }
      else{
        this.iconMouseStyle = true
      }
    },
    //鼠标移除图标事件
    mouseoutIconEvent(){
      this.iconMouseStyle = false
    },
    //图标点击事件
    iconClickEvent(){
      if(!this.noClick){
        if(this.iconMouseStyle){
          this.txt = ''
          this.$nextTick(() => {
            this.$emit("clear")
          })
        }
      }
    },
    // 单击事件
    clickEvent () {
      if(!this.noClick){
      this.error = false
        this.mouseStyle = false
      this.mouseOver = false
      this.$emit('click')
      }
    },
    // 鼠标放上事件
    mouseoverEvent () {
      if (!this.error) {
        this.mouseStyle = true
      }
      this.mouseOver = true
      if(this.txt !== ''){
        this.afterIcon = 'delete'
      }
      else{
        this.afterIcon = 'i-input-right-arrow'
      }
    },
    // 鼠标移出事件
    mouseoutEvent () {
      if (!this.error) {
        this.mouseStyle = false
      }
      this.mouseOver = false
    },
    // 验证
    verification () {
      var result = true
      if (this.show && this.rule !== '') {
        var val = this.txt
        var res = verify(val, this.rule)
        result = res.key
        if (!result) {
          if (res.category === 0) {
            if (this.emptyMessage === '') {
              this.errorTipMessage = res.value
            } else {
              this.errorTipMessage = this.emptyMessage
            }
          } else if (res.category === 1) {
            if (this.errorMessage === '') {
              this.errorTipMessage = res.value
            } else {
              this.errorTipMessage = this.errorMessage
            }
          }
        }
        this.error = !result

      }
      return result
    }
  },
  filters: {
    format (data, category) {
      if (category === 'value') {
        return data
      } else if (category === 'money') {
        return parseFloat(data).toFixed(2)
      }
      return data
    }
  },
  computed: {
    getShowTip () {
      return (this.tip != '' || this.tips.length > 0) && this.txt != '' && this.mouseOver
    },
    getWidth(){
      return this.width === "1"
    }
  },
  watch: {
    show (newVal, oldVal) {
      if (!newVal) {
        this.error = false
        this.txt = ''
        var js = 'this.p____page.' + this.id + ' = ""'
        eval(js)
      }
    },
    txt (newVal, oldVal) {
      var js = 'this.p____page.' + this.id + ' = "' + newVal + '"'
      eval(js)
    },
    value (newVal, oldVal) {
      this.txt = newVal
      this.verification()
    }
  }
}
</script>

<style scoped>
  *{
    box-sizing: border-box;
  }
  .formradiobuttonWidth{
    width: 998px;
  }
  .boxWidth{
    width: 880px;
  }
  .selectCenter{
    display: flex;
    align-items: center;
  }
  .formBoxIcon{
    font-size: 26px;
    cursor: pointer;
    color: #49a9ea;
  }
</style>
