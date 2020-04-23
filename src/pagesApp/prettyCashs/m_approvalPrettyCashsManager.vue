<template>
  <div>
    <yhm-app-structure-top-tap>
      <yhm-app-structure-top-tap-menu @call="backEvent" title="返回"></yhm-app-structure-top-tap-menu>
      <yhm-app-structure-top-tap-menu @call="waitEvent" title="待审批" :select="isFinish === '1'"></yhm-app-structure-top-tap-menu>
      <yhm-app-structure-top-tap-menu @call="finishEvent" title="已审批" :select="isFinish === '0'"></yhm-app-structure-top-tap-menu>
    </yhm-app-structure-top-tap>

    <yhm-app-scroll :pageIndex="pageIndex" :init-load-finish="loadFinish" :empty="empty" :params="params" :pull-down-refresh-url="url" @refreshCall="refreshEvent" :pull-up-load-url="url" @loadCall="loadEvent">
      <yhm-app-structure-menu-group :url="getUrl(item.id,isFinish)" v-for="(item) in content" :key="item.id">
        <yhm-app-view-control :contentTitle="item.person" :content="item.workDate" type="date"></yhm-app-view-control>
        <yhm-app-view-detail>
          <span style="color:#aaaaaa">【{{item.person}}】</span>
          申请了
          <span style="color:#fd6802;">{{item.subject}}</span>
          的备用金，发票类型
          <span style="color: #c700df" v-if="item.invoiceCategory==0">有票</span>
          <span style="color: #FF0000" v-if="item.invoiceCategory==1">无票</span>
          <span style="color: #00f" v-if="item.invoiceCategory==2">工会费用</span>

          ，倒计时
          <span style="color: #08acc0">{{item.day}}天</span>
          ，申请金额
          <yhm-app-view-money color="#FF0000" :content="item.money"></yhm-app-view-money>
          ，<span :style="{'color':item.stateColor}">{{item.stateVal}}</span>
        </yhm-app-view-detail>
        <yhm-app-approval-result v-show="getIsFinish" :category="item.state % 2 == 1||item.state== -1" :left="3.5" :top="0.5"></yhm-app-approval-result>
      </yhm-app-structure-menu-group>
    </yhm-app-scroll>
    <appToast type="loading" v-show="!appToastShow" @login-success="appToastShow = $event"></appToast>
  </div>
</template>R

<script>
  import { appmanagermixin } from '@/assetsApp/app_manager.js'
  import appToast from '@/pagesApp/common/appToast'//轻提示组件
  export default {
    name: "m_approvalPrettyCashsManager",
    mixins: [appmanagermixin],
    components:{
      appToast,
    },
    data(){
      return{
        appToastShow:false,
        leftAlert:false,
        searchFrequentlyShow:false,
        rightAlert:false,//筛选弹窗
        key: 0,//用来刷新组件状态 点击重置按钮时刷新默认状态
        invoiceCategory:'',
        invoiceCategoryList: [
            {
              code: '#49a9ea',
              num:'0',
              showName:'有票'
            },
            {
              code: '#f00',
              num:'1',
              showName:'无票'
            },
            {
              code: '#f00',
              num:'4',
              showName:'工会费用'
            }
        ],
        shortcutSearchContent: [],
        isFinish:'1',
        url:'/PersonOffice/m_getPrettyCashsApproval',
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
      radioChange(index,item){//用户选择后触发 可接收选中的索引值以及类别
        this.isChecks=index
      },
      radioChange2(index,item){
        this.isRelevance=index
      },
      confirm(index,index2){//点击确定后 返回选中索引与值
        this.rightAlert=false
        this.isChecks = index
        this.initPageData()
      },
      reset(){//重置选择
        this.isChecks = ''
        this.isRelevance = ''
        this.key+=1//刷新组件
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
            isFinish:this.isFinish,
            searchStr: this.searchStr
          }
        } else {
          // 页面非初始化时需要的参数
          params = {
            isFinish:this.isFinish,
            searchStr: this.searchStr
          }
        }
        this.init({
          initValue: initValue,
          url: '/PersonOffice/m_getPrettyCashsApproval',
          data: params,
          all: (data) => {
            // 不管是不是初始化都需要执行的代码
            this.content = data.content
            this.shortcutSearchContent = data.shortcutSearchContent
            this.appToastShow = true
            this.invoiceCategoryList = data.invoiceCategoryPsd.list
            this.invoiceCategory = data.invoiceCategory
          },
          init: (data) => {
            // 初始化时需要执行的代码
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
