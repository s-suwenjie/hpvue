<template>
    <div @touchstart.stop="touchStartEvent" @touchend.stop="touchEndEvent" class="item disable_menu" :class="{a_dialog_button_touch:touchStyle}">{{value}}</div>
</template>

<script>
  export default {
    name: 'yhm-app-dialog-button',
    data(){
      return{
        touchStyle:false
      }
    },
    props: {
      value: {
        type: String,
        default: ''
      },
    },
    methods:{
      touchStartEvent(){
        this.touchStyle = true
      },
      touchEndEvent(){
        this.touchStyle = false
        this.$emit('call')
      }
    }
  }
</script>

<style scoped>
</style>
