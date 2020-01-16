<template>
  <div>
    <van-tabs v-model="active" scrollspy sticky>
      <van-tab v-for="index in 8" :title="'选项 ' + index" :key="index">
        内容 {{ index }}
      </van-tab>
    </van-tabs>

    <van-tabbar v-model="batActive">
      <van-tabbar-item icon="home-o">分类</van-tabbar-item>
      <van-tabbar-item icon="friends-o">消息</van-tabbar-item>
      <van-tabbar-item icon="setting-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
  export default {
    name: 'About',
    components: {
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
