<template>
  <div class="disable_menu" @touchstart.stop="touchStartEvent" @touchend.stop="touchEndEvent" :class="{abasm_touch:touchStyle}"><slot></slot></div>
</template>

<script>
  export default {
    name: 'yhm-app-action-sheet-menu',
    data(){
      return{
        touchStyle:false
      }
    },
    methods:{
      touchStartEvent(){
        this.touchStyle = true
      },
      touchEndEvent(){
        this.touchStyle = false
        this.$nextTick(() => {
          this.$emit("call")
        })
      }
    }
  }
</script>

<style scoped>

</style>
