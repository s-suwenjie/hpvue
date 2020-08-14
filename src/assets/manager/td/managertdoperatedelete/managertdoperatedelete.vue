<template>
    <div @click="clickEvent" class="delete fs18 fs18bgffffff" :class="{red:!noClick,no_click:noClick}"></div>
</template>

<script>
  export default {
    name: 'yhm-manager-td-operate-delete',
    props: {
      noClick:{
        type:Boolean,
        default:false
      }
    },
    methods:{
      clickEvent(){
        if(!this.noClick){
          this.$nextTick(() => {
            this.$emit('click')
          })
        }
      }
    }
  }
</script>

<style scoped>

</style>
