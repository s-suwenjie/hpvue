<template>
    <div>
      <yhm-app-structure-top-tap>
        <yhm-app-structure-top-tap-menu @call="backEvent" title="返回"></yhm-app-structure-top-tap-menu>
        <yhm-app-structure-top-tap-menu @call="waitEvent" title="进行中" :select="isFinish === '1'"></yhm-app-structure-top-tap-menu>
        <yhm-app-structure-top-tap-menu @call="finishEvent" title="已完成" :select="isFinish === '0'"></yhm-app-structure-top-tap-menu>
        <yhm-app-structure-top-tap-menu @call="rejectEvent" title="驳回" :select="isFinish === '2'"></yhm-app-structure-top-tap-menu>
      </yhm-app-structure-top-tap>
      <yhm-app-scroll :pageIndex="pageIndex" :init-load-finish="loadFinish" :empty="empty" :params="params" :pull-down-refresh-url="url" @refreshCall="refreshEvent" :pull-up-load-url="url" @loadCall="loadEvent">
        <yhm-app-structure-menu-group :url="getUrl(item.id,isFinish,item.isApproval)" v-for="(item) in content" :key="item.id">
          <yhm-app-view-control :contentTitle="item.person" :content="item.lastDate" type="date"></yhm-app-view-control>
          <yhm-app-view-detail>
            <span style="color:#aaaaaa">【{{item.person}}】</span>提交了<span style="color:#08acc0;">{{item.cause}}</span>的付款计划，对方单位是<span style="color: #fd6802;">{{item.otherUnit}}</span>，计划金额<yhm-app-view-money color="#FF0000" :content="item.money"></yhm-app-view-money>
          </yhm-app-view-detail>
          <yhm-app-approval-result v-show="getIsFinish" :category="item.state % 2 === 1" :left="3.5" :top="0.5"></yhm-app-approval-result>
        </yhm-app-structure-menu-group>

      </yhm-app-scroll>
    </div>
</template>

<script>
  import { appmanagermixin } from '@/assetsApp/app_manager.js'
  export default {
    name: 'm_finPaymentPlanManager',
    mixins: [appmanagermixin],
    data(){
      return{
        isFinish:'1',
        url:'/PersonOffice/m_getPayPlanApprovalManager',
        params:{
          isFinish:'1'
        },
        content:[]
      }
    },
    methods:{
      backEvent(){
        this.$router.go(-1)
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
      //跳转到驳回页面
      rejectEvent(){
          this.pageIndex = 1
          this.isFinish = '2'
          this.params.isFinish = '2'
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
            isFinish:this.isFinish
          }
        } else {
          // 页面非初始化时需要的参数
          params = {
            isFinish:this.isFinish
          }
        }
        // this.init({
        //   initValue: initValue,
        //   url: '',
        //   data: params,
        //   all: (data) => {
        //     // 不管是不是初始化都需要执行的代码
        //   },
        //   init: (data) => {
        //     // 初始化时需要执行的代码
        //   }
        // })
      }
    },
    created () {

    }
  }
</script>

<style scoped>

</style>
