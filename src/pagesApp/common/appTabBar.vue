<template>
    <div>
      <van-tabbar v-model="batActive">
        <van-tabbar-item>
          <span>分类</span>
          <img
            slot="icon"
            slot-scope="props"
            :src="props.active ? '/UploadFile/m_image/navigation/classify_select.png' : '/UploadFile/m_image/navigation/classify.png'"
          >
        </van-tabbar-item>
        <van-tabbar-item>
          <span>消息</span>
          <img
            slot="icon"
            slot-scope="props"
            :src="props.active ? '/UploadFile/m_image/navigation/message_select.png' : '/UploadFile/m_image/navigation/message.png'"
          >
        </van-tabbar-item>
        <van-tabbar-item>
          <span>我的</span>
          <img
            slot="icon"
            slot-scope="props"
            :src="props.active ? '/UploadFile/m_image/navigation/my_select.png' : '/UploadFile/m_image/navigation/my.png'"
          >
        </van-tabbar-item>
      </van-tabbar>
    </div>
</template>

<script>
  export default {
    name: 'appTabBar',
    data(){
      return{
        batActive: 0 ,// 当前激活的导航索引
      }
    }
  }
</script>

<style scoped>

</style>
