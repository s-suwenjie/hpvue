<template>
  <div>
    <yhm-app-structure-top-tap>
      <yhm-app-structure-top-tap-menu @call="backEvent" title="返回"></yhm-app-structure-top-tap-menu>
      <yhm-app-structure-top-tap-menu @call="waitEvent" title="进行中" :select="isFinish === '1'"></yhm-app-structure-top-tap-menu>
      <yhm-app-structure-top-tap-menu @call="finishEvent" title="已完成" :select="isFinish === '0'"></yhm-app-structure-top-tap-menu>
    </yhm-app-structure-top-tap>

    <yhm-app-scroll :pageIndex="pageIndex" :init-load-finish="loadFinish" :empty="empty" :params="params" :pull-down-refresh-url="url" @refreshCall="refreshEvent" :pull-up-load-url="url" @loadCall="loadEvent">
      <appSearch @change="change" :btn-show="true" @alertShow="rightAlert=true" :list="shortcutSearchContent" ></appSearch>
      <yhm-app-structure-menu-group :url="getUrl(item.id,isFinish)" v-for="(item) in content" :key="item.id">
        <yhm-app-view-control :contentTitle="item.person" :content="item.lastDate" type="date"></yhm-app-view-control>
        <yhm-app-view-detail>
          <span style="color:#aaaaaa">【{{item.person}}】</span>
          申请了
          <span style="color:#08acc0;">{{item.cause}}</span>
          的备用金，发票类型
          <span style="color: #fd6802;">有票</span>
          ，事由
          <span style="color: #49a9ea">鉴定费</span>
          ，倒计时
          <span style="color: #FF0000">7天</span>
          ，<span :style="{'color':item.stateColor}">{{item.stateVal}}</span>
        </yhm-app-view-detail>
      </yhm-app-structure-menu-group>
    </yhm-app-scroll>
    <appToast type="loading" v-show="!appToastShow" @login-success="appToastShow = $event"></appToast>
  </div>
</template>

<script>
  import { appmanagermixin } from '@/assetsApp/app_manager.js'
  import appSearch from '@/pagesApp/common/appSearch'
  import appToast from '@/pagesApp/common/appToast'
  export default {
    name: "m_approvalPrettyCashsManager",
    mixins: [appmanagermixin],
    components:{
      appSearch,
      appToast
    },
    data(){
      return{
        appToastShow:false,
        searchStr:'',
        leftAlert:false,
        searchFrequentlyShow:false,
        shortcutSearchContent: [],
        isFinish:'1',
        url:'/PersonOffice/m_getPaymentPlanManagerAll',
        params:{
          isFinish:'1'
        },
        content:[]
      }
    },
    methods:{
      change(value){//搜索 从组件接收value值 用户执行操作时触发当前事件
        this.searchStr = value
        this.initPageData(false)
      },
      backEvent(){//返回
        this.$router.push('/homeApp/m_myApprovalManager')
      },
      //跳转到进行中页面
      waitEvent(){
        this.pageIndex = 1
        this.isFinish = '1'
        this.params.isFinish = '1'
        this.initPageData(false)
      },
      //跳转到已审批页面
      finishEvent(){
        this.pageIndex = 1
        this.isFinish = '0'
        this.params.isFinish = '0'
        this.content = []
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
            state:this.isFinish,
            searchStr: this.searchStr
          }
        } else {
          // 页面非初始化时需要的参数
          params = {
            state:this.isFinish,
            searchStr: this.searchStr
          }
        }
        this.init({
          initValue: initValue,
          url: '/PersonOffice/m_getPaymentPlanManagerAll',
          data: params,
          all: (data) => {
            // 不管是不是初始化都需要执行的代码
            this.content=data.content
            this.shortcutSearchContent = data.shortcutSearchContent
            this.appToastShow = true
          },
          init: (data) => {
            // 初始化时需要执行的代码
            this.appToastShow = true

          }
        })
      }
    },
    computed:{
      getUrl(){
        return function(id,isFinish){
          return '/homeApp/m_approvalPrettyCashsView?id=' + id + '&isFinishBack=' + isFinish
        }
      }
    },
    created () {
      // this.tacitlyApprove()
      this.setQuery2Value('isFinish')
      this.params.isFinish = this.isFinish

    }
  }
</script>

<style scoped>

</style>
