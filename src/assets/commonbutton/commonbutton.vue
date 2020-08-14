<template>
  <div v-if="show" @mouseout="mouseoutEvent" @mouseover="mouseoverEvent" :style="{backgroundColor: getBgColor,color: getColor}" class="b_main" :class="[icon,category,getClass,getHoverClass,getFlickerClass,getErrorClass,getIconClass]" @click="clickEvent()">{{value}}</div>
</template>

<script>
  export default {
    name: 'yhm-commonbutton',
    inject: ["p____page"],
    data(){
      return{
        mouseOver:false,            //鼠标悬停
        timerInstanceError:null,    //错误闪烁定时器
        timerInstance:null,         //闪烁定时器
        frequencyFlicker:false,     //闪烁频次
        isFlicker:this.flicker,     //是否闪烁
        countFlicker:0,             //错误闪烁频次
        isErrorFlicker:this.isError //是否错误闪烁
      }
    },
    props:{
      category:{
        type:String,
        default:'one'
      },
      value:{
        type:String,
        default:"添加"
      },
      icon:{
        type:String,
        default:"btnAdd"
      },
      call:{
        type:String,
        default:""
      },
      flicker:{
        type:Boolean,
        default:false
      },
      isError:{
        type:Boolean,
        default:false
      },
      isErrorId:{
        type:String,
        default:""
      },
      show:{
        type:Boolean,
        default:true
      },
      bgColor: {
        type: String,
        default: "#fff"
      },
      color: {
        type: String,
        default: "#333"
      }
    },
    methods:{
      mouseoverEvent(){
        this.mouseOver = true
        this.isFlicker = false
        this.$emit('mouseover')
      },
      mouseoutEvent(){
        this.mouseOver = false
        if(!this.timerInstanceError) {
          this.isFlicker = this.flicker
        }
        this.$emit('mouseout')
      },
      clickEvent() {
        this.$emit("call")
      },
      //闪烁事件
      initInterval(){
        //闪烁且没有错误的情况下开启
        if(this.isFlicker && !this.isErrorFlicker && !this.mouseOver) {
          this.timerInstance = setInterval(() => {
            this.frequencyFlicker = !this.frequencyFlicker
          }, 600)
        }
      },
      //错误闪烁事件
      initIntervalError(){
        if(this.isErrorFlicker){
          this.timerInstanceError = setInterval(() => {
            this.countFlicker++
          },600)
        }
      }
    },
    computed:{
      getBgColor(){
        return this.bgColor
      },
      getColor(){
        return this.color
      },
      getIconClass(){
        if(this.value !== '' && this.icon !== ''){
          return 'mr5b'
        }
        return ''
      },
      getClass(){
        return 'b_' + this.category
      },
      getHoverClass(){
        if(this.mouseOver) {
          return 'b_' + this.category + '_hover'
        }
        else{
          return ''
        }
      },
      getFlickerClass(){
        if(!this.isErrorFlicker && this.frequencyFlicker){
          return 'b_' + this.category + '_flicker'
        }
        return ''
      },
      getErrorClass(){
        if(this.countFlicker != 0 && this.countFlicker % 2 === 1){
          return 'b_error_flicker'
        }
        return ''
      }
    },
    watch:{
      isFlicker(newVal){
        if(newVal){
          this.initInterval()
        }
        else{
          if(this.timerInstance) {
            clearInterval(this.timerInstance)
          }
        }
      },
      isError(newVal){
        this.isErrorFlicker = newVal
      },
      isErrorFlicker(newVal){
        if(newVal){
          this.isFlicker = false
          if(this.timerInstance) {
            clearInterval(this.timerInstance)
          }
          this.initIntervalError()
        }
        else{
          if(this.timerInstanceError){
            clearInterval(this.timerInstanceError)
          }
          this.isFlicker = this.flicker
        }
      },
      countFlicker(newVal){
        if(newVal === 9){
          this.countFlicker = 0
          let js = "this.p____page." + this.isErrorId + " = false"
          eval(js);
        }
      }
    },
    created () {
      this.initInterval()
    }
  }
</script>

<style scoped>

</style>
