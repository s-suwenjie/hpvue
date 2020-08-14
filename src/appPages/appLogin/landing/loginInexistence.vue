<template>
  <div class="theme">
    <div class="fonsizeIcon">
      <img src="../../../../static/appStatic/images/warn.svg" alt="" style="width: 38%;">
    </div>
    <div class="fonsizeDistance">
      <div class="fonsizeCentent">用户不存在</div>
      <div class="fonsizeCentent">请联系管理员</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'loginInexistence',
    created () {
      document.querySelector('body').setAttribute('style', 'margin: 0 auto; width: 100%; max-width: 750px;min-width: 300px; background:#fff; overflow-x: hidden;height: 100%;');
    }
  }
</script>

<style scoped>
  @import "../../../../static/appStatic/accountPage.css";

</style>
