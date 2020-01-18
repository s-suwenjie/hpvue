<template>
  <div>
    <van-tabs v-model="active" scrollspy sticky>
      <van-tab v-for="index in 8" :title="'选项 ' + index" :key="index">
        内容 {{ index }}
      </van-tab>
    </van-tabs>
    <TabBar></TabBar>

  </div>
</template>
<script>

import TabBar from './common/appTabBar'
  export default {
    name: 'About',
    components: {
      TabBar
    },
    props: {},
    data(){
      return{
        active: 0 ,// 当前激活的导航索引
        batActive:0,
      }
    },
    methods:{
    },
    created () {
      document.body.addEventListener('touchmove', function (e) {
        e.returnValue = true;
      }, {passive: false})
    }
  }
</script>
<style scoped>
.van-tab__pane{
  height: 15rem;
}
</style>
