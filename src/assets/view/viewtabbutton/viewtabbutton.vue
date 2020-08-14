<template>
    <div @click="clickEvent" :class="{select:getSelect}">
      <slot></slot>
    </div>
</template>

<script>
  export default {
    name: 'yhm-view-tab-button',
    props:{
      list:{
        type:Array,
        required:true
      },
      index:{
        type:Number,
        required:true
      }
    },
    methods : {
      clickEvent(){
        this.$emit("click")
        let count = this.list.length
        for(let i = 0;i<count;i++){
          this.list[i].select = false
        }
        this.list[this.index].select = true
      }
    },
    computed : {
        getSelect(){
          return this.list[this.index].select
        }
    }
  }
</script>

<style scoped>

</style>
