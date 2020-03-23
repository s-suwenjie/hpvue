<template>
  <div class="theme">
    <div class="fonsizeIcon"><img src="../../../static/appStatic/images/delete.svg" alt=""></div>
    <div class="operating">操作失败</div>
    <div v-if="false" class="shutDown">关闭页面</div>
  </div>
</template>

<script>
  export default {
    name: 'correct',
    created() {
      document.querySelector('body').setAttribute('style', 'margin: 0 auto; width: 100%; max-width: 750px;min-width: 300px; background:#fff; overflow-x: hidden;height: 100%;');
    }
  }
</script>

<style scoped>
  @import "../../../static/appStatic/accountPage.css";

</style>
