<template>
  <div>
    <div class="structure_top_tap">
      <div :class="{app_scroll:isScroll}" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
        <div class="structure_top_tap_content" :style="{transform: 'translate3d(' + distance + 'px, 0px, 0px)',transitionDuration: timeSpeed + 'ms'}" :class="{app_scroll_wrapper:isScroll,apb0:isScroll}">
          <slot></slot>
        </div>
      </div>
    </div>
    <div class="structure_top_tap_height"></div>
  </div>
</template>

<script>
  import { accAdd,accMul } from '@/assets/common.js'
  export default {
    name: 'yhm-app-structure-top-tap',
    data(){
      return{
        max :0,
        min :0,
        startX:0,
        moveX:0,
        distance:0,
        hisDistance:0,
        startTime:0,
        endTime:0,
        speed:0,
        width:0,
        timeSpeed:100
      }
    },
    props:{
      isScroll:{
        type:Boolean,
        default:false
      },
      list:{
        type:Array,
        default : function() {
          return []
        }
      },
      selectItem:{
        type:String,
        default:''
      }
    },
    methods : {
      initStyle(){
        if(this.isScroll) {
          let el = this.$el.firstChild.firstChild
          let wrapper = el.firstChild
          let screenWidth = document.documentElement.clientWidth || document.body.clientWidth
          let elWidth = 0
          wrapper.childNodes.forEach(function (node) {
            elWidth = accAdd(elWidth,node.clientWidth)
          })
          this.width = elWidth
          elWidth = elWidth > screenWidth ? elWidth : screenWidth

          let distance = accAdd(accMul(screenWidth,-1),elWidth)
          if(parseInt(distance) > 0){
            this.min = accMul(distance,-1)
          }
        }
      },
      touchStart () {
        if(this.isScroll && this.min !== 0) {
          this.startX = event.touches[0].clientX
          this.startTime = new Date().getTime()
        }
      },
      touchMove () {
        if(this.isScroll && this.min !== 0) {
          this.moveX = event.touches[0].clientX
          let val = accAdd(this.moveX,accMul(this.startX,-1))

          let result = accAdd(this.hisDistance,val)

          if(val < 0 && parseFloat(result) < this.min){
            result = this.min
          }
          if(val > 0 && parseFloat(result) > this.max){
            result = this.max
          }
          this.distance = result
        }
      },
      touchEnd () {
        if(this.isScroll && this.min !== 0) {
          this.endTime = new Date().getTime()
          if(parseInt(accAdd(this.endTime,accMul(-1,this.startTime))) > 500){
            this.speed = 1
          }
          else{
            this.speed = 4
          }
          this.hisDistance = this.distance

        }
      },
      initSelect(item){
        if(this.isScroll) {
          let wrapper = this.$el.firstChild.firstChild.firstChild
          let count = 0
          for (let i = 0; i < this.list.length; i++){
            if(this.list[i].title === item){
              count = i - 1
              break
            }
          }
          let width = 0
          wrapper.childNodes.forEach(function (node,i) {
            if(i < count) {
              width = accAdd(width, node.clientWidth)
            }
          })
          width = width * -1
          if(width < this.min){
            width = this.min
          }
          this.distance = width
          this.timeSpeed = 500
          setTimeout(() => {
            this.timeSpeed = 100
          },1000)
        }
      }
    },
    mounted(){
      this.initStyle()
    },
    watch:{
      selectItem(val){
        this.initSelect(val)
      }
    }
  }
</script>

<style scoped>
  *{
    box-sizing: border-box;
  }
</style>
