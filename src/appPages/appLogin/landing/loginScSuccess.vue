<template>
  <div class="theme">
    <div class="fonsizeIcon"><img src="../../../../static/appStatic/images/correct.svg" alt=""></div>
    <div class="fonsizeDistance">
      <div class="fonsizeCentent">您已确认登陆</div>
      <div class="fonsizeCentent">北京海派奥特经贸有限公司</div>
      <div class="fonsizeCentent">办公系统</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'loginNoPublicForm',
    created () {
      document.querySelector('body').setAttribute('style', 'margin: 0 auto; width: 100%; max-width: 750px;min-width: 300px; background:#fff; overflow-x: hidden;height: 100%;');
    }
  }
</script>

<style scoped>
  @import "../../../../static/appStatic/accountPage.css";

</style>
