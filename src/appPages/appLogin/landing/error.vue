<template>
  <div class="theme">
    <div class="fonsizeIcon">
      <img src="../../../../static/appStatic/images/warn.svg" alt="" style="width: 38%;">
    </div>
    <div class="fonsizeDistance">
      <div class="fonsizeCentent">您的微信版本暂不支持此功能</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'error',
    created () {
      document.querySelector('body').setAttribute('style', 'margin: 0 auto; width: 100%; max-width: 750px;min-width: 300px; background:#fff; overflow-x: hidden;height: 100%;');
    }
  }
</script>

<style scoped>
  @import "../../../../static/appStatic/accountPage.css";

</style>
