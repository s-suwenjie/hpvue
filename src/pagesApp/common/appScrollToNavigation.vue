<template>
    <div class="appScroll">
      <van-tabs v-model="active" scrollspy sticky>
        <van-tab v-for="(item,index) in list" :title="item">
          <div>
            <slot :name="'scroll'+index"></slot>
          </div>
        </van-tab>
      </van-tabs>
    </div>
</template>

<script>
  import { ImagePreview,Tabbar, TabbarItem ,Tab,Tabs} from 'vant'
  export default {
    name: 'appScrollToNavigation',
    components:{
      [Tab.name]: Tab,
      [Tabs.name]: Tabs,
      [Tabbar.name]: Tabbar,
      [TabbarItem.name]: TabbarItem,
      [ImagePreview.name]: ImagePreview,
    },
    data(){
      return{
        active:'0',
      }
    },
    props:{
      list:{
        type:Array,
        default : function() {
          return []
        }
      },

    }
  }
</script>

<style lang="less">/*适配vant下tab组件(不能使用自动适配,pc端会乱)如与pc端分离后可直接使用框架适配样式*/
@rem:375/10rem;
.appScroll{
  .van-sticky--fixed{
    z-index: 1000;
  }
  .van-tab{
    line-height: 42/@rem;
    font-size: 14/@rem;
  }
  .van-tabs__line{
    background-color: #49a9ea;
  }
  .van-tabs--line .van-tabs__wrap{
    height: 42/@rem;
    border-bottom: 1/@rem solid #bfbfbf;
  }
}

</style>
