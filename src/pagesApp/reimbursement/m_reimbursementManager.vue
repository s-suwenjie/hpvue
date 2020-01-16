<template>
  <div class="app_main">
    <yhm-app-structure-top-tap>
      <yhm-app-structure-top-tap-menu @call="backEvent" title="返回"></yhm-app-structure-top-tap-menu>
      <yhm-app-structure-top-tap-menu @call="waitEvent" title="待审批" :select="isFinish === '1'"></yhm-app-structure-top-tap-menu>
      <yhm-app-structure-top-tap-menu @call="finishEvent" title="已审批" :select="isFinish === '0'"></yhm-app-structure-top-tap-menu></yhm-app-structure-top-tap>

    <yhm-app-scroll :pageIndex="pageIndex" :init-load-finish="loadFinish" :empty="empty" :params="params" :pull-down-refresh-url="url" @refreshCall="refreshEvent" :pull-up-load-url="url" @loadCall="loadEvent">
      <yhm-app-structure-menu-group :url="getUrl(item.id,isFinish,item.isApproval)" v-for="(item) in content" :key="item.id">
        <yhm-app-view-control :contentTitle="item.name" :content="item.workDate" type="date"></yhm-app-view-control>
        <yhm-app-view-detail>
          <span style="color:#aaaaaa">【{{item.name}}】</span>提交了<span style="color: #08acc0;">{{item.subject}}</span>的报销申请，报销金额<yhm-app-view-money color="#FF0000" :content="item.money"></yhm-app-view-money>
        </yhm-app-view-detail>
        <yhm-app-approval-result v-show="getIsFinish" :category="item.state % 2 === 1" :left="3.5" :top="0.5"></yhm-app-approval-result>
      </yhm-app-structure-menu-group>

    </yhm-app-scroll>
  </div>
</template>

<script>
  import { appmanagermixin } from '@/assetsApp/app_manager.js'
  export default {
    name: 'm_approvalReimbursementManager',
    mixins: [appmanagermixin],
    data(){
      return {
        isFinishBack: '1',
        loadFinish: false,
        isFinish: '1',
        url: '/PersonOffice/m_getReimbursementApproval',
        params: {
          isFinish: '1'
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
          url: '/PersonOffice/m_getReimbursementApproval',
          data: params,
          all: (data) => {
            this.content = data.content
            // 不管是不是初始化都需要执行的代码
            this.isApproval=data.isApproval
          },
          init: (data) => {
            // 初始化时需要执行的代码
            //    this.content = data.content
            // this.modelItems = data.modelItems
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
          return '/homeApp/m_reimbursementView?id=' + id + '&isFinishBack=' + isFinish + '&isApproval=' + isApproval
        }
      }
    },
    created () {
      this.setQuery2Value('isFinish')
      this.params.isFinish = this.isFinish
    }
  }
</script>

<style scoped lang="less">

</style>
