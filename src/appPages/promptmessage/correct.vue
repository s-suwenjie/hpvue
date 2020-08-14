<template>
    <div class="theme">
      <div class="fonsizeIcon"><img src="../../../static/appStatic/images/correct.svg" alt=""></div>
      <div class="operating">{{message}}</div>
      <div v-if="false" class="shutDown">关闭页面</div>
    </div>
</template>

<script>
  import Qs from 'qs'
  export default {
    // name: 'correct',
    //
    // name: 'correct',
    name: 'correct',
    data(){
      return{
        message:'提交成功，请等待管理人员审批'
      }
    },
    created () {
      document.querySelector('body').setAttribute('style', 'margin: 0 auto; width: 100%; max-width: 750px;min-width: 300px; background:#fff; overflow-x: hidden;height: 100%;');
      let query = Qs.parse(location.search.substring(1))
      let url = window.location.href
      let id = query.id
      if(id === '1'){
        this.message = '你的信息已提交，请耐心等待'
      }
    }
  }
</script>

<style scoped>
  @import "../../../static/appStatic/accountPage.css";

</style>
