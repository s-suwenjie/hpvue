<template>
  <div
    @mouseout="mouseoutEvent"
    @mouseover="mouseoverEvent"
    @click="clickEvent()"
    class="b_main mr5b"
    :class="[icon,category,getClass,getHoverClass,getFlickerClass]">
    {{value}}
  </div>
</template>

<script>
  export default {
    name: 'yhm-dialog-button',
    data(){
      return{
        mouseOver:false,            //鼠标悬停
        timerInstance:null,         //闪烁定时器
        frequencyFlicker:false,     //闪烁频次
        isFlicker:this.flicker,     //是否闪烁
      }
    },
    props:{
      category:{
        type:String,
        default:'one'
      },
      value:{
        type:String,
        default:""
      },
      icon:{
        type:String,
        default:""
      },
      call:{
        type:String,
        default:""
      },
      flicker:{
        type:Boolean,
        default:false
      }
    },
    methods:{
      mouseoverEvent(){
        this.mouseOver = true
        this.isFlicker = false
      },
      mouseoutEvent(){
        this.mouseOver = false
        if(!this.timerInstanceError) {
          this.isFlicker = this.flicker
        }
      },
      clickEvent() {
        this.$emit("call")
      },
      //闪烁事件
      initInterval(){
        //闪烁且没有错误的情况下开启
        if(this.isFlicker && !this.mouseOver) {
          this.timerInstance = setInterval(() => {
            this.frequencyFlicker = !this.frequencyFlicker
          }, 600)
        }
      }
    },
    computed:{
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
        if(this.frequencyFlicker){
          return 'b_' + this.category + '_flicker'
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
      }
    },
    created () {
      this.initInterval()
    }
  }
</script>

<style scoped>

</style>
