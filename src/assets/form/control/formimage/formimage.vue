<template>
  <div v-if="show" class="fc_main" v-validator="validatorEvent">
    <div class="fc_box">
      <div class="fc_title">
        <div>{{title}}</div>
        <div v-if="subtitle !== ''">{{subtitle}}</div>
      </div>
      <div class="c_main">
        <div class="c_image_main" :class="getBig">
          <div @click="clickEvent" @mouseover="mouseoverEvent" @mouseout="mouseoutEvent" class="c_image radio_button_icon_select" :class="{c_error:error,red:error}">
            <div class="box">
              <div v-show="tipShow" @mouseover="mouseoverEvent" @mouseout="mouseoutEvent" @click.stop="previewClickEvent" class="preview_showImg" :style="getStyle">
                <img :src="txt">
              </div>
              <img v-if="getTxtShow" :src="txt" :onerror="getErrorUrl">
            </div>
          </div>
          <div class="discription" :class="{red:error}" v-html="discription"></div>
        </div>
      </div>
    </div>
    <div class="fc_error"><span v-if="error">{{errorTipMessage}}</span></div>
  </div>
</template>

<script>
    export default {
      name: "yhm-formimage",
      inject: ['p____page'],
      data () {
        return {
          tipShow:false,
          txt:this.value,
          error: false,
          errorTipMessage: this.emptyMessage
        }
      },
      props: {
        discription:{
          type:String,
          default:'这里可以写描述'
        },
        errorUrl:{
          type:String,
          default:'../../../../../static/css/images/login/noimg.jpg'
        },
        tip:{
          type: Boolean,
          default: false
        },
        width:{
          type:String,
          default:'500'
        },
        height:{
          type:String,
          default:'300'
        },
        left:{
          type:String,
          default:'0'
        },
        top:{
          type:String,
          default:'0'
        },
        title: {
          type: String,
          default: '标题'
        },
        subtitle: {
          type: String,
          default: ''
        },
        value:{
          type:String,
          required:true
        },
        id:{
          type:String,
          required:true
        },
        big:{
          type:Number,
          default:1
        },
        emptyMessage:{
          type:String,
          default:"不能为空"
        },
        rule:{
          type:String,
          default:""
        },
        show: {
          type: Boolean,
          default: true
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
        //鼠标移入图片
        mouseoverEvent(){
          if(this.getTxtShow){
            if(this.tip){
              this.tipShow = true
            }
          }
          this.$nextTick(() =>{
            this.$emit("mouseover",this.txt)
          })
        },
        //鼠标移出图片
        mouseoutEvent(){
          if(this.getTxtShow){
            if(this.tip){
              this.tipShow = false
            }
          }
          this.$nextTick(() =>{
            this.$emit("mouseout",this.txt)
          })
        },
        //在预览的图片上点击隐藏图片
        previewClickEvent(){
          this.tipShow = false
        },
        //点击图片事件
        clickEvent(){
          if(this.getTxtShow){
            this.$nextTick(() =>{
              this.$emit("click",this.txt)
            })
          }
        },
        //验证
        verification() {
          var result = true;
          if (this.show && this.rule === "#") {
            result = this.txt !== ''
          }
          this.error = !result
          return result;
        }
      },
      computed:{
        getErrorUrl(){
          if(this.errorUrl !== ''){
            return 'this.src=\'' + this.errorUrl + '\''
          }
          return ''
        },
        getTxtShow(){
          return this.txt !== '' || this.errorUrl !== ''
        },
        getBig(){
          if(this.big === 2){
            return 'c_image_main_big'
          }
          else {
            return ''
          }
        },
        getStyle(){
          return 'top:' + this.top + 'px;left:' + this.left + 'px;width:' + this.width + 'px;height:' + this.height + 'px'
        }
      },
      watch:{
        value(newVal){
          this.txt = newVal
        }
      }
    }
</script>

<style scoped>
  *{
    box-sizing: border-box;
  }
</style>
