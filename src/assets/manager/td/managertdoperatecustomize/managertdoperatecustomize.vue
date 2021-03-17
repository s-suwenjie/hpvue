<template>
  <div @click="clickEvent" class="i_tableSort fs18" :style="getColor" :class="[icon,{no_click:noClick}]">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'yhm-manager-td-operate-customize',
    props: {
      noClick:{
        type:Boolean,
        default:false
      },
      icon:{
        type:String,
        required: true
      },
      color:{
        type:String,
        required: true
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
    },
    computed:{
      getColor(){
        if(this.color === ''){
          return ''
        }
        return 'color:' + this.color
      }
    }
  }
</script>

<style scoped>

</style>
