<template>
    <div class="app_view_detail_main" v-tap="touchEndEvent">
      <span>
        <slot></slot>
      </span>
      <span class="more">{{moreTitle}}>></span>
    </div>
</template>

<script>
  export default {
    name: 'yhm-app-view-detail',
    props:{
      moreTitle:{
        type:String,
        default:'点击查看详情'
      },
      url:{
        type:String,
        default:''
      }
    },
    methods : {
      touchEndEvent(){
        if(this.url !== ''){
          this.$router.push(this.url)
        }
      }
    }
  }
</script>

<style scoped>

</style>
