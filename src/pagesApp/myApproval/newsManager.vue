<template>
    <div>
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <van-cell v-for="item in list" :key="item" :title="item" @click="goto"/>
        </van-list>
      </van-pull-refresh>
    </div>
</template>

<script>
  import { ImagePreview,Tabbar, TabbarItem ,Tab,Tabs,List} from 'vant'
  import 'vant/lib/index.css';
  export default {
    name: 'newsManager',
    components:{
      [List.name]: List,
      [Tab.name]: Tab,
      [Tabs.name]: Tabs,
      [Tabbar.name]: Tabbar,
      [TabbarItem.name]: TabbarItem,
      [ImagePreview.name]: ImagePreview,
    },
    data(){
      return{
        list: [],
        loading: false,
        finished: false,
        refreshing: false,
      }
    },
    //在页面离开时记录滚动位置
    beforeRouteLeave (to, from, next) {
      this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      console.log(this.scrollTop,'离开时位置')
      sessionStorage.boxTop = this.scrollTop;
      sessionStorage.list = this.list
      next()
    },
    //进入该页面时，用之前保存的滚动位置赋值
    beforeRouteEnter (to, from, next) {
      next(vm => {
        if(vm && vm.$refs.box){//通过vm实例访问this
          vm.$nextTick(()=>{

            setTimeout(()=>{
              window.scroll(0,sessionStorage.boxTop)
            },100)
          })
        }
      })
    },
    methods:{
      goto(){
        this.$router.push('/homeApp/m_myApprovalManager')
      },
      onLoad() {//滚动到底部
        setTimeout(() => {
          if(this.list.length>=80){
            this.finished = false;//全部加载完毕
          }
          if (this.refreshing) {
            this.list = [];
            this.refreshing = false;
          }

          for (let i = 0; i < 15; i++) {
            this.list.push(this.list.length + 1);
          }
          this.loading = false;

          if (this.list.length >= 80) {
            this.finished = true;//全部加载完毕
          }
        }, 1000);
      },
      onRefresh() {//下拉刷新
        // 清空列表数据
        this.finished = false;

        // 重新加载数据
        // 将 loading 设置为 true，表示处于加载状态
        this.loading = true;
        this.onLoad();
      },
    },
    created () {
      console.log(sessionStorage.list)
      if(sessionStorage.list.length>5){
        console.log(sessionStorage.list)
        this.list = sessionStorage.list
        this.finished = true
        if(sessionStorage.list.length>=80){
          this.loading = false
        }else{
          this.loading = true
        }
      }else{
        this.finished = false
        this.loading = true
        this.onLoad();
      }
    }
  }
</script>

<style scoped>

</style>
