<template>
  <div class="app_main">
    <yhm-app-structure-top-tap>
      <yhm-app-structure-top-tap-menu @call="backEvent" title="返回"></yhm-app-structure-top-tap-menu>
      <yhm-app-structure-top-tap-menu @call="waitEvent" title="待审批" :select="isFinish === '1'"></yhm-app-structure-top-tap-menu>
      <yhm-app-structure-top-tap-menu @call="finishEvent" title="已审批" :select="isFinish === '0'"></yhm-app-structure-top-tap-menu>
    </yhm-app-structure-top-tap>

    <yhm-app-scroll :pageIndex="pageIndex" :init-load-finish="loadFinish" :empty="empty" :params="params" :pull-down-refresh-url="url" @refreshCall="refreshEvent" :pull-up-load-url="url" @loadCall="loadEvent">
      <yhm-app-structure-menu-group :url="getUrl(item.id,isFinish,item.isApproval)" v-for="(item) in content" :key="item.id">
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
    </yhm-app-scroll>
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
      }
    },
    methods:{
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
          this.pageIndex = 1
          this.isFinish = '1'
          this.params.isFinish = '1'
          this.initPageData(false)
        }
      },
      //跳转到已审批页面
      finishEvent(){
        if(this.isFinish === '1'){
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
            this.content = data.content
            this.appToastShow = true//加载完成后关闭加载提示
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
    }
  }
</script>

<style scoped>

</style>
