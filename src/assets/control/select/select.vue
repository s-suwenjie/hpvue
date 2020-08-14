<template>
  <div v-if="show" :style="getWidth" class="c_main c_main_m" v-validator="validatorEvent">
    <div v-if="getShowTip" :style="getTipStyle" class="c_tip c_tip_m">
      <div>
        {{getShowValue}}
        <img :style="getTipArrowLeft" src="/UploadFile/m_image/arrowColor.png">
      </div>
    </div>
    <div @mouseout="mouseoutEvent" @mouseover="mouseoverEvent" @click.stop="clickEvent" v-click-control-outside="loseFocusEvent" class="c_box" :class="{c_error:error,c_hover:mouseStyle,c_focus:focusStyle,c_disable:noSelect}">
      <div class="c_content_div c_content_div_m c_left ti10" :style="getTxtWidth">{{getShowValue}}</div>
      <span class="c_icon c_icon_m i-input-down-arrow" :class="{rotate180:focusStyle}"></span>
      <div v-show="focusStyle" class="c_select_items c_select_items_m">
        <span><img class="rotate180" src="/UploadFile/m_image/arrow.png"></span>
        <div v-for="(item,index) in selectList" :key="index" @click.stop="selectItemEvent(item.num)" :class="{c_select_items_selected:txt === item.num}">{{item.showName}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import {accAdd} from '@/assets/common.js'
  export default {
    name: 'yhm-select',
    inject: ["p____page"],
    data(){
      return{
        focusStyle:false,
        mouseStyle:false,
        mouseOver:false,
        error:false,
        txt:this.value
      }
    },
    props: {
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
      /*下拉框中绑定的值*/
      selectList:{
        type:Array,
        default:function () {
          return []
        }
      },
      width:{
        type: String,
        required: true
      },
      category:{
        type:String,
        default:""
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
      tip: {
        type: Boolean,
        default: false
      },
      noSelect: {
        type: Boolean,
        default: false
      },
      show: {
        type: Boolean,
        default: true
      }
    },
    methods: {
      //初始化验证事件
      validatorEvent(category) {
        if(this.rule !== "") {
          let id = this.id;
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
      //点击事件
      clickEvent(){
        if(!this.noSelect) {
          this.focusStyle = true
          this.error = false
        }
      },
      //失去焦点事件
      loseFocusEvent(){
        this.focusStyle = false
      },
      selectItemEvent(item){
        this.txt = item
        this.$nextTick(() =>{
          this.focusStyle = false
        })
      },
      verification() {
        var result = true;
        if(this.getShowValue === ''){
          result = false
        }
        this.error = !result
        return result
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
        return this.tip && this.txt != "" && (this.focusStyle || this.mouseOver)
      },
      getWidth(){
        if(this.width !== '') {
          return 'width:' + this.width + 'px !important;'
        }
        return ''
      },
      getTxtWidth(){
        let width = accAdd(this.width,-6)
        if(this.category === 'm'){
          width = accAdd(width,-22)
        }
        else{
          width = accAdd(width,-38)
        }
        return width
      },
      getShowValue(){
        let result = ''
        if(this.selectList && this.selectList.length > 0){
          for(let i = 0; i < this.selectList.length; i++){
            if(this.selectList[i].num === this.txt){
              result = this.selectList[i].showName
              break
            }
          }
        }
        return result
      }
    },
    watch:{
      show(newVal,oldVal){
        if(!newVal){
          this.error = false
          this.txt = ""
          let js = "this.p____page." + this.id + " = \"\""
          eval(js);
        }
      },
      txt(newVal,oldVal){
        let js = "this.p____page." + this.id + " = \"" + newVal + "\""
        eval(js);
      },
    }
  }
</script>

<style scoped>
  *{
    box-sizing: border-box;
  }
</style>
