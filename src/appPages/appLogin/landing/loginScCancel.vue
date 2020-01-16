<template>
  <div class="theme">
    <div class="fonsizeIcon"><img src="../../../../static/appStatic/images/cancel.svg" alt=""></div>
    <div v-if="category ==='0'" class="fonsizeDistance">
      <div class="fonsizeCentent">您已取消对</div>
      <div class="fonsizeCentent">北京海派奥特经贸有限公司</div>
      <div class="fonsizeCentent">办公系统的本次登陆操作</div>
    </div>
    <div v-if="category ==='1'" class="fonsizeDistance">
      <div class="fonsizeCentent">您本次对</div>
      <div class="fonsizeCentent">北京海派奥特经贸有限公司</div>
      <div class="fonsizeCentent">办公系统的登陆操作存在异常</div>
    </div>
  </div>
</template>

<script>
  import Qs from 'qs'
  export default {
    name: 'loginNoCancel',
    data(){
      return{
        category:'0'
      }
    },
    created () {
      document.querySelector('body').setAttribute('style', 'margin: 0 auto; width: 100%; max-width: 750px;min-width: 300px; background:#fff; overflow-x: hidden;height: 100%;');
      let query = Qs.parse(location.search.substring(1))
      let category = query.category
      if(category){
        this.category = category
      }
    }
  }
</script>

<style scoped>
  @import "../../../../static/appStatic/accountPage.css";

</style>
