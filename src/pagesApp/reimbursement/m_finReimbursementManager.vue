<template>
  <div ref="box">
    <yhm-app-structure-top-tap>
      <yhm-app-structure-top-tap-menu @call="backEvent" title="返回"></yhm-app-structure-top-tap-menu>
      <yhm-app-structure-top-tap-menu @call="waitEvent" title="进行中" :select="isFinish === '1'"></yhm-app-structure-top-tap-menu>
      <yhm-app-structure-top-tap-menu @call="finishEvent" title="已完成" :select="isFinish === '0'"></yhm-app-structure-top-tap-menu>
    </yhm-app-structure-top-tap>
    <appSearch @change="change" @alertShow="rightAlert=true,key<1?key+=1:''" :list="shortcutSearchContent" ></appSearch>

    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad">
        <yhm-app-structure-menu-group :url="getUrl(item.id,isFinish)" v-for="(item) in list" :key="item.id">
          <yhm-app-view-control contentTitle="报销申请" style="font-size: 18px;border-bottom: 1px solid #bfbfbf;margin-bottom: 0.5rem;" :content="item.workDate" type="date"></yhm-app-view-control>
          <yhm-app-view-detail>

            <yhm-app-view-control title="申请人" :content="item.name"></yhm-app-view-control>
            <yhm-app-view-control title="事由" :content="item.subject"></yhm-app-view-control>
            <yhm-app-view-psd title="报销方式" :psd="isPrettyCashOffList" :content="item.isPrettyCashOff"></yhm-app-view-psd>
            <yhm-app-view-control title="申请金额" :content="item.money" type="money" color="#f00"></yhm-app-view-control>
            <yhm-app-view-control title="状态" :content="item.stateVal"></yhm-app-view-control>
          </yhm-app-view-detail>
        </yhm-app-structure-menu-group>

      </van-list>
    </van-pull-refresh>
    <appfiltrate :alert-show="rightAlert" @close="rightAlert=false,key<1?key+=1:''" >
      <appRadiofilter :list="isPrettyCashOffList" title="是否核销" :key="key" @change="radioChange"></appRadiofilter>
      <div class="alert_bottom">
        <yhm-app-button  value="重置" @call="reset()" icon="" category="five" style="border: 1px solid #666;margin-right:0.75rem;"></yhm-app-button>
        <yhm-app-button  value="确定" @call="confirm(isPrettyCashOff)" icon="" category="two"></yhm-app-button>
      </div>
    </appfiltrate>
    <!--  回到顶部按钮  -->
    <div class="appScroll i-income" @click="appScrollClick" :class="{appScrollShow:appScrollShow,appScrollHide:!appScrollShow}"></div>

    <appToast type="loading" v-show="!appToastShow" @login-success="appToastShow = $event"></appToast>
  </div>
</template>

<script>
  import { appmanagermixin } from '@/assetsApp/app_manager.js'
  import appSearch from '@/pagesApp/common/appSearch'
  import appfiltrate from '@/pagesApp/common/appFiltrate'
  import appRadiofilter from '@/pagesApp/common/appRadiofilter'
  import appToast from '@/pagesApp/common/appToast'

  export default {
    name: 'm_finReimbursementManager',
    mixins: [appmanagermixin],
    components:{
      appSearch,
      appfiltrate,
      appRadiofilter,
      appToast,
    },
    data(){
      return{
        appToastShow:false,
        rightAlert:false,//筛选弹窗
        key: 0,//用来刷新组件状态 点击重置按钮时刷新默认状态
        isPrettyCashOffList:[],
        searchStr:'',
        isPrettyCashOff:'',
        leftAlert:false,
        searchFrequentlyShow:false,
        shortcutSearchContent: [],
        isFinish:'1',
        url:'/PersonOffice/m_getReimbursementManagerAll',
        params:{
          isFinish:'1'
        },
        pageIndex:1,
        content:[],
        count:0,
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
      radioChange(index,item){//用户选择后触发 可接收选中的索引值以及类别
        this.isPrettyCashOff=index
      },
      change(value){//搜索 从组件接收value值 用户执行操作时触发当前事件
        this.appToastShow = false
        this.finished = false
        sessionStorage.clear()
        this.list = []
        this.content = []
        this.pageIndex = 1
        this.searchStr = value
        this.initPageData(false)
      },
      confirm(index,index2){//点击确定后 返回选中索引与值
        this.appToastShow = false
        this.finished = false
        this.rightAlert=false
        this.isPrettyCashOff = index
        sessionStorage.clear()
        this.list = []
        this.content = []
        this.pageIndex = 1
        this.initPageData(false)
      },
      reset(){//重置选择
        this.isPrettyCashOff = ''
        this.key+=1//刷新组件
      },
      backEvent(){
        this.$router.push('/homeApp/m_myApprovalManager')
      },
      //跳转到进行中页面
      waitEvent(){
        this.appToastShow = false
        this.finished = false
        sessionStorage.clear()
        this.list = []
        this.pageIndex = 1
        this.isFinish = '1'
        this.params.isFinish = '1'
        this.initPageData(false)
      },
      //跳转到已审批页面
      finishEvent(){
        this.appToastShow = false
        this.finished = false
        sessionStorage.clear()
        this.pageIndex = 1
        this.isFinish = '0'
        this.params.isFinish = '0'
        this.content = []
        this.list = []
        this.initPageData(false)
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
            isFinish:this.isFinish,
            searchStr: this.searchStr
          }
        } else {
          // 页面非初始化时需要的参数
          params = {
            isFinish:this.isFinish,
            pageIndex:this.pageIndex,
            searchStr: this.searchStr,
            isPrettyCashOff:this.isPrettyCashOff
          }
        }
        this.init({
          initValue: initValue,
          url: '/PersonOffice/m_getReimbursementManagerAll',
          data: params,
          all: (data) => {
            // 不管是不是初始化都需要执行的代码
            this.shortcutSearchContent = data.shortcutSearchContent
            this.appToastShow = true

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
            this.isPrettyCashOffList = data.isPrettyCashOffPsd.list
            this.appToastShow = true
          }
        })
      }
    },
    computed:{
      getUrl(){
        return function(id,isFinish,isApproval){
          return '/homeApp/m_finReimbursementView?id=' + id + '&isFinishBack=' + isFinish
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

<style scoped lang="less">
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
