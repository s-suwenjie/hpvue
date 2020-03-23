<template>
  <div class="mask"></div>
</template>

<script>
  export default {
    name: "yhm-mask"
  }
</script>

<style scoped>
  .mask {
    z-index: 99999990;
    width: 100%;
    height: 100%;
    background: #000;
    position: fixed;
    top: 0;
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=50)"; /*IE8*/
    filter: alpha(opacity=50); /*IE5、IE5.5、IE6、IE7*/
    opacity: .5; /*Opera9.0+、Firefox1.5+、Safari、Chrome*/
  }
</style>
