<template>
  <div>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
<!--        <div v-for="(index,item) in list" :key="index" @click="goto(index,item)">-->
          <slot></slot>
<!--        </div>-->
<!--        <van-cell v-for="item in list" :key="item" :title="item" @click="goto"/>-->
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
  import { ImagePreview,Tabbar, TabbarItem ,Tab,Tabs,List} from 'vant'
  export default {
    name: 'appScrollPaging',
    components:{
      [List.name]: List,
      [Tab.name]: Tab,
      [Tabs.name]: Tabs,
      [Tabbar.name]: Tabbar,
      [TabbarItem.name]: TabbarItem,
      [ImagePreview.name]: ImagePreview,
    },
    props:{
      content:{
        type:Array,
        default:function () {
          return []
        }
      },
      count:{
        type: Number,
        default: 0
      },
      loading:{
        type:Boolean,
        default:false
      }

    },
    data(){
      return{
        // list: [],
        // loading: false,
        finished: false,
        refreshing: false,
        pageIndex:1
      }
    },
    //在页面离开时记录滚动位置
    beforeRouteLeave (to, from, next) {
      this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      console.log(this.scrollTop,'离开时位置')
      sessionStorage.boxTop = this.scrollTop;
      sessionStorage.content = this.content
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
      goto(index,item){
        this.$router.push('/homeApp/m_myApprovalManager')
        this.$emit('call')
      },
      onLoad() {//滚动到底部
        setTimeout(() => {


          // for (let i = 0; i <5; i++) {
          //   this.content.push(this.content[i]);
          //   console.log(this.content)
          // }
          this.loading = false;

          if (sessionStorage.content.length >= this.count) {
            this.finished = true;//全部加载完毕
          }
          if (this.refreshing) {
            // this.content = [];
            this.refreshing = false;
          }
        }, 1000);
        console.log(sessionStorage.content,'222')
        this.$emit('onLoad')
      },
      onRefresh() {//下拉刷新
        // 清空列表数据
        this.finished = false;

        // 重新加载数据
        // 将 loading 设置为 true，表示处于加载状态
        this.loading = true;
        // this.onLoad();
        this.$emit('onRefresh')
      },
    },
    created () {
      let list =  JSON.parse(sessionStorage.list||0);

      if(list.length>5){
        this.content = list
        this.list = list
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
