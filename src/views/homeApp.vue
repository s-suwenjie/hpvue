<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
  import { isLogin } from '@/assetsApp/app_login.js'
  export default {
    name: 'homeApp',
    created () {
      let that = this
      isLogin(that)
      document.querySelector('body').setAttribute('style', 'background-color: #F3F3F3;position:relative; height:100%;min-height:100%;');
      document.querySelector('body').addEventListener('touchmove', function(e) {
        e.preventDefault()
      }, {passive: false})
    }
  }
</script>

<style scoped>
  @import "../../staticApp/global.css";
</style>
