<template>
  <div ref="control" @click="clickEvent" @mouseover="mouseoverEvent" @mouseout="mouseoutEvent" class="mt_button" :style="getColor" :class="{mt_button_disabled:noClick}">
    <div class="font" :class="[icon,getFs]"></div>
    <div :class="{ml3:getMl}">{{value}}</div>
  </div>
</template>

<script>
  export default {
    name: 'yhm-manager-td-operate-button',
    inject: ["p____page"],
    data(){
      return{
        currentColor:this.color,
        colorHover:this.hoverColor
      }
    },
    props: {

      tipCategory:{
        type:Number,
        default :0
      },
      fs:{
        type: String,
        default: ''
      },
      value: {
        type: String,
        default: ''
      },
      icon: {
        type: String,
        default: ''
      },
      color:{
        type: String,
        default: '#333333'
      },
      hoverColor:{
        type: String,
        default: '#0000FF'
      },
      noClick:{
        type:Boolean,
        default:false
      },
      valueObject:{
        type:Object
      },
      beforeIcon:{
        type:String,
        default:''
      },
      beforeIconColor:{
        type:String,
        default:'#FF0000'
      },
      beforeIconFontSize:{
        type:String,
        default:'fs14'
      }
    },
    methods:{
      clickEvent(){
        if(!this.noClick) {
          this.$emit("click")
        }

      },
      mouseoverEvent(){
        if(!this.noClick) {
          this.currentColor = this.colorHover
        }
        this.$nextTick(() => {
          this.$emit('mouseover',this.valueObject,this.$refs.control,this.tipCategory)
        })
      },
      mouseoutEvent(){
        if(!this.noClick) {
          this.currentColor = this.color
        }
        this.$nextTick(() => {
          this.$emit('mouseout',this.valueObject,this.$refs.control,this.tipCategory)
        })
      }
    },
    computed:{
      getFs(){
        if(this.fs !== ''){
          return 'fs' + this.fs
        }
        return ''
      },
      getMl(){
        return this.icon !== ''
      },
      getColor(){
        return 'color:' + this.currentColor
      }
    },
    watch:{
      color(newVal){
        this.currentColor = newVal
      }
    }
  }
</script>

<style scoped>

</style>
