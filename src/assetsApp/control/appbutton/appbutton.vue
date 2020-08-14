<template>
    <div @contextmenu.prevent class="ab_main disable_menu" :class="[getCategoryClass,touchStyle?getTouchClass:'']" @touchstart="touchStartEvent" @touchmove="touchMoveEvent" @touchend="touchEndEvent">
      <span v-if="getShowIcon" class="amr4b" :class="icon"></span>
      {{value}}
    </div>
</template>

<script>
  export default {
    name: 'yhm-app-button',
    data(){
      return{
        txt:'保存',
        touchStyle:false
      }
    },
    props:{
      value:{
        type:String,
        default:''
      },
      category:{
        type:String,
        default:'one'
      },
      icon:{
        type:String,
        default: ''
      }
    },
    methods:{
      touchStartEvent(){
        this.touchStyle = true
      },
      touchMoveEvent(){

      },
      touchEndEvent(){
        this.touchStyle = false
        this.$nextTick(() => {
          this.$emit("call")
        })
      }
    },
    computed:{
      getShowIcon(){
        return this.icon !== ''
      },
      getCategoryClass(){
        return 'ab_' + this.category
      },
      getTouchClass(){
        return 'ab_' + this.category + '_touch'
      }
    }
  }
</script>

<style scoped>
*{
  box-sizing: border-box;
}
</style>
