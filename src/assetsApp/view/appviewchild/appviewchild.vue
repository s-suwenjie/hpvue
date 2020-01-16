<template>
    <div class="app_view_child">
      <div v-if="getTitleShow" class="child_title">{{title}}</div>
      <div class="child_content">
        <slot></slot>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'yhm-app-view-child',
    props:{
      title:{
        type:String,
        default:''
      }
    },
    computed:{
      getTitleShow(){
        return this.title !== ''
      }
    }
  }
</script>

<style scoped>

</style>
