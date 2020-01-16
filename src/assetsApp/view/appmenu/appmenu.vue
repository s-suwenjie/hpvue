<template>
    <div class="app_view_menu_main" @touchend="touchEndEvent">
      <img :src="url" alt="">
      <span>{{name}}</span>
      <i v-show="getShowNum" class="num">{{num}}</i>
    </div>
</template>

<script>
  export default {
    name: 'yhm-app-menu',
    props:{
      name:{
        type:String,
        default:'我是名称'
      },
      num:{
        type:String,
        default:''
      },
      url:{
        type:String,
        default:''
      }
    },
    methods:{
      touchEndEvent(){
        this.$emit("call")
      }
    },
    computed : {
        getShowNum(){
          if(this.num === '' || isNaN(this.num) || this.num === '0'){
            return false
          }
          return true
        }
    }
  }
</script>

<style scoped>
  *{
    box-sizing: border-box;
  }
</style>
