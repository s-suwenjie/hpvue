<template>
    <div @touchend="touchEndEvent" class="structure_top_tap_menu" :class="{structure_top_tap_menu_select:select}">{{title}}</div>
</template>

<script>
  export default {
    name: 'yhm-app-structure-top-tap-menu',
    props:{
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
      touchEndEvent(){
        this.$emit("call")
      }
    }
  }
</script>

<style scoped>
  *{
    box-sizing: border-box;
  }
</style>
