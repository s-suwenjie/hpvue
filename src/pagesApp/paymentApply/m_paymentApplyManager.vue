<template>
  <div ref="box">
    <yhm-app-structure-top-tap>
      <yhm-app-structure-top-tap-menu @call="backEvent" title="返回"></yhm-app-structure-top-tap-menu>
      <yhm-app-structure-top-tap-menu @call="waitEvent" title="待审批" :select="isFinish === '1'"></yhm-app-structure-top-tap-menu>
      <yhm-app-structure-top-tap-menu @call="finishEvent" title="已审批" :select="isFinish === '0'"></yhm-app-structure-top-tap-menu>
    </yhm-app-structure-top-tap>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad">
<!--        <div v-for="(index) in 60" :key="index">{{index}}</div>-->
        <yhm-app-structure-menu-group :url="getUrl(item.id,isFinish,item.isApproval)" v-for="(item) in list" :key="item.id">
          <yhm-app-view-control contentTitle="付款申请" style="font-size: 18px;border-bottom: 1px solid #bfbfbf;margin-bottom: 0.5rem;" :content="item.lastDate" type="date"></yhm-app-view-control>
          <yhm-app-view-detail>
            <yhm-app-view-control title="申请人" :content="item.person"></yhm-app-view-control>
            <yhm-app-view-control title="事由" :content="item.subject"></yhm-app-view-control>
            <yhm-app-view-control title="收款方" :content="item.otherUnit"></yhm-app-view-control>
            <yhm-app-view-control title="申请金额" :content="item.money" type="money" color="#f00"></yhm-app-view-control>
            <yhm-app-view-control title="状态" :content="item.stateVal"></yhm-app-view-control>
          </yhm-app-view-detail>
          <yhm-app-approval-result v-show="getIsFinish" :category="item.state % 2 == 1||item.state== -1" :left="3.5" :top="0.5"></yhm-app-approval-result>
        </yhm-app-structure-menu-group>
      </van-list>
    </van-pull-refresh>
    <!--  回到顶部按钮  -->
    <div class="appScroll i-income" @click="appScrollClick" :class="{appScrollShow:appScrollShow,appScrollHide:!appScrollShow}"></div>

    <appToast type="loading" v-show="!appToastShow" @login-success="appToastShow = $event"></appToast>
  </div>
</template>

<script>
  import { appmanagermixin } from '@/assetsApp/app_manager.js'
  import appToast from '@/pagesApp/common/appToast'
  export default {
    name: 'm_paymentApplyManager',
    mixins: [appmanagermixin],
    components:{
      appToast
    },
    data(){
      return{
        appToastShow:false,
        isFinish:'1',
        isFinishBack: '1',
        url:'/PersonOffice/m_getPayApprovalManager',
        loadFinish: false,
        params:{
          isFinish:'1'
        },
        pageIndex:1,
        count:0,
        content:[],
        loading: false,//将 loading 设置为 true，表示处于加载状态
        finished: false,//清空列表数据 设置为 true 表示数据全部加载完成
        refreshing: false,
        list:[],//分页数组
        scrollTop:''//滚动条位置
      }
    },
    //在页面离开时记录滚动位置
    beforeRouteLeave (to, from, next) {
      this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      sessionStorage.boxTop = this.scrollTop
      if(this.list.length>5){sessionStorage.list = JSON.stringify(this.list)}
      next()
    },
    //进入该页面时，用之前保存的滚动位置赋值
    beforeRouteEnter (to, from, next) {
      next(vm => {
        if(vm) {//通过vm实例访问this
          vm.$nextTick(() => {
            setTimeout(() => {
              window.scroll(0, sessionStorage.boxTop)
            }, 100)
          })
        }
      })
    },
    mounted(){//监听滚动条 注意! 要在页面的div中添加ref="box"
      window.addEventListener('scroll', this.handleScroll, true)
    },
    methods:{
      appScrollClick(){//点击回到顶部
        window.scroll(0,0)
      },
      handleScroll(e){//有时获取位置会为空
        try{
          if(this.$refs.box.getBoundingClientRect()!=undefined){
            let top = this.$refs.box.getBoundingClientRect().top +''
            if(top.indexOf('-')!==-1){
              top = top.slice(1,top.length)
            }
            if(top>300){
              this.appScrollShow = true
            }else{
              this.appScrollShow = false
            }
          }
        }catch (e) {}
      },
      onRefresh(){//下拉刷新
        // 清空列表数据
        this.finished = false;
        this.pageIndex = 1
        sessionStorage.removeItem('list')
        // 重新加载数据
        // 将 loading 设置为 true，表示处于加载状态
        this.loading = true;
        this.onLoad();
      },
      onLoad(){//上拉加载
        setTimeout(()=>{
          if (this.refreshing) {
            this.refreshing = false;
          }
          if (this.count==0||this.list.length==this.count) {//分页的列表等于总数据时
            this.finished = true//全部加载完成
            this.loading = false//加载中的提示
          }else{
            this.loading = true
            this.initPageData(false)
          }
        },300)
      },
      save(type){
        if(this.validator()){
        }
        else{
        }
      },
      //返回我的审批页面
      backEvent(){
        this.$router.push("/homeApp/m_myApprovalManager")
      },
      //跳转到待审批页面
      waitEvent(){
        if(this.isFinish === '0'){
          this.appToastShow = false
          this.finished = false

          sessionStorage.clear()
          this.appScrollClick()
          this.list = []
          this.pageIndex = 1
          this.isFinish = '1'
          this.params.isFinish = '1'
          this.initPageData(false)
        }
      },
      //跳转到已审批页面
      finishEvent(){
        if(this.isFinish === '1'){
          this.appToastShow = false
          this.finished = false
          sessionStorage.clear()
          this.appScrollClick()
          this.list = []
          this.pageIndex = 1
          this.isFinish = '0'
          this.params.isFinish = '0'
          this.content = []
          this.initPageData(false)
        }
      },
      refreshEvent(data){
        if(data.type === 0) {
          this.content = []
          this.content = data.content
          this.empty = this.content.length === 0
        }
      },
      loadEvent(data){
        if(data.type === 0) {
          this.content.push.apply(this.content, data.content)
          this.empty = this.content.length === 0
        }
      },
      //页面初始化调用
      initPageData(initValue){
        let params = {}
        if (initValue) {
          // 页面初始化是需要的参数
          params = {
            isFinish:this.isFinish
          }
        } else {
          // 页面非初始化时需要的参数
          params = {
            isFinish:this.isFinish
          }
        }
        this.init({
          initValue: initValue,
          url: '/PersonOffice/m_getPayApprovalManager',
          data: params,
          all: (data) => {
            // 不管是不是初始化都需要执行的代码
            // this.content = data.content
            this.appToastShow = true//加载完成后关闭加载提示

            //还原滚动条位置以及分页数据的条数判断
            this.count = data.count
            if(data.count==0||this.list.length==data.count){//数据为空时停止加载状态
              this.loading = false//关闭加载中
              this.finished = true//数据全部加载完成
              return
            }else {this.finished = false}
            for(let i = 0;i<data.content.length;i++){//将每页数据放入list数组中
              //当list中总条数小于数据的总数是 将返回的值添加到list数组 find进行判断数据去重
              if(this.list.length<data.count&&this.list.find((element) => (element.id == data.content[i].id)) === undefined){
                this.list.push(data.content[i])
              }
            }
            this.loading = false
            if(this.list.length<this.count){
              this.pageIndex++
            }
          },
          init: (data) => {
            // 初始化时需要执行的代码
            this.categoryPurchaseItems = data.categoryPurchaseItems
            // this.modelItems = data.modelItems
            this.appToastShow = true
          }
        })
      }

    },
    computed:{
      getIsFinish(){
        return this.isFinish === '0'
      },
      getUrl(){
        return function(id,isFinish,isApproval){
          return '/homeApp/m_paymentApplyView?id=' + id + '&isFinishBack=' + isFinish + '&isApproval=' + isApproval
        }
      }
    },
    created () {
      this.setQuery2Value('isFinish')
      this.params.isFinish = this.isFinish
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

<style lang="less" scoped>
  @rem:375/10rem;
  /* 回到顶部按钮 */

  .appScroll{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30/@rem;
    font-size: 16/@rem;
    height: 30/@rem;
    z-index: 9999;
    background-color: #fff;
    border-radius: 50%;
    border: 1px solid #ccc;
    transition: all 0.5s;
  }
  .appScrollShow{
    position: fixed;
    right: 20/@rem;
    bottom: 20/@rem;
  }
  .appScrollHide{
    position: fixed;
    right: 20/@rem;
    bottom: -30%;
  }
</style>
