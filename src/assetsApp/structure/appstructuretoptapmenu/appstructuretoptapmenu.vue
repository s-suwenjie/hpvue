<template>
    <div @touchstart="touchStartEvent" @touchmove="touchMoveEvent" @touchend="touchEndEvent" :class="{structure_top_tap_menu:!isScroll,structure_top_tap_menu_customize:isScroll,structure_top_tap_menu_select:getSelect(title)}">{{title}}</div>
</template>

<script>
  export default {
    name: 'yhm-app-structure-top-tap-menu',
    data(){
      return{
        isMove:false
      }
    },
    props:{
      list:{
        type:Array,
        default : function() {
            return []
        }
      },
      selectItem:{
        type:String,
        default:''
      },
      isScroll:{
        type:Boolean,
        default:false
      },
      select:{
        type:Boolean,
        default:false
      },
      title:{
        type:String,
        default:''
      }
    },
    methods:{
      touchStartEvent(){
        this.isMove = false
      },
      touchMoveEvent(){
        this.isMove = true
      },
      touchEndEvent(){
        if(this.isScroll){
          if(!this.isMove) {
            this.$emit("call")
          }
        }
        else {
          this.$emit("call")
        }
      }
    },
    computed : {
        getSelect(){
          return function (val) {
            if(this.isScroll){
              return this.selectItem === val
            }
            else{
              return this.select
            }
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
