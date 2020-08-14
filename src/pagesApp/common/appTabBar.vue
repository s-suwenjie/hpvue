<template>
    <div class="appTabBar">
      <!-- 移动端 底部tab 使用vant下的组件 -->
      <van-tabbar v-model="batActive" style="z-index:1000;">
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
  import { ImagePreview,Tabbar, TabbarItem ,Tab,Tabs,List} from 'vant'
  import 'vant/lib/index.css';
  export default {
    components: {
      [List.name]: List,
      [Tab.name]: Tab,
      [Tabs.name]: Tabs,
      [Tabbar.name]: Tabbar,
      'van-tabbar-item': TabbarItem,
      [ImagePreview.name]: ImagePreview,
    },
    name: 'appTabBar',
    data(){
      return{
        batActive: 0 ,// 当前激活的导航索引
      }
    }
  }
</script>
<style lang="less">/*适配vant下tabbar组件(不能使用自动适配,pc端会乱)如与pc端分离后可直接使用框架适配样式*/
@rem:375/10rem;
.appTabBar{
  .van-tabbar-item__icon img{
    height: 19/@rem !important;
  }
  .van-tabbar{
    border-radius: 8/@rem 8/@rem 0 0;
    height: 50/@rem !important;
    border-top: 1/@rem solid #bfbfbf;
  }
  .van-tabbar-item--active{
    color: #49A9EA !important;
  }
  .van-tabbar-item{
    height: 50/@rem;
    font-size: 12/@rem;
    .van-tabbar-item__text{
      font-size: 12/@rem;
    }
    .van-tabbar-item__icon{
      margin-bottom: 2/@rem;
    }
  }
  .van-tabbar-item__icon i{
    font-size: 19/@rem;
  }
}

</style>
<style scoped>

</style>
