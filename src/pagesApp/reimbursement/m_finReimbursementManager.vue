<template>
  <div>
    <yhm-app-structure-top-tap>
      <yhm-app-structure-top-tap-menu @call="backEvent" title="返回"></yhm-app-structure-top-tap-menu>
      <yhm-app-structure-top-tap-menu @call="waitEvent" title="进行中" :select="isFinish === '1'"></yhm-app-structure-top-tap-menu>
      <yhm-app-structure-top-tap-menu @call="finishEvent" title="已完成" :select="isFinish === '0'"></yhm-app-structure-top-tap-menu>
    </yhm-app-structure-top-tap>

    <yhm-app-scroll :pageIndex="pageIndex" :init-load-finish="loadFinish" :empty="empty" :params="params" :pull-down-refresh-url="url" @refreshCall="refreshEvent" :pull-up-load-url="url" @loadCall="loadEvent">
      <appSearch @change="change" @alertShow="rightAlert=true,key<1?key+=1:''" :list="shortcutSearchContent" ></appSearch>

      <yhm-app-structure-menu-group :url="getUrl(item.id,isFinish)" v-for="(item) in content" :key="item.id">
        <yhm-app-view-control :contentTitle="item.name" :content="item.workDate" type="date"></yhm-app-view-control>
        <yhm-app-view-detail>
          <span style="color:#aaaaaa">【{{item.name}}】</span>
          申请了
          <span style="color:#08acc0;">{{item.subject}}</span>
          的报销申请 ，报销金额
          <yhm-app-view-money color="#FF0000" :content="item.actualMoney"></yhm-app-view-money>
          ，<span :style="{'color':item.stateColor}">{{item.stateVal}}</span>
        </yhm-app-view-detail>
      </yhm-app-structure-menu-group>
    </yhm-app-scroll>
    <appfiltrate :alert-show="rightAlert" @close="rightAlert=false,key<1?key+=1:''" >
      <appRadiofilter :list="isPrettyCashOffList" title="是否核销" :key="key" @change="radioChange"></appRadiofilter>
      <div class="alert_bottom">
        <yhm-app-button  value="重置" @call="reset()" icon="" category="five" style="border: 1px solid #666;margin-right:0.75rem;"></yhm-app-button>
        <yhm-app-button  value="确定" @call="confirm(isPrettyCashOff)" icon="" category="two"></yhm-app-button>
      </div>
    </appfiltrate>
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
      appToast
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
        content:[]
      }
    },
    methods:{
      radioChange(index,item){//用户选择后触发 可接收选中的索引值以及类别
        this.isPrettyCashOff=index
      },
      change(value){//搜索 从组件接收value值 用户执行操作时触发当前事件
        this.searchStr = value
        this.initPageData(false)
      },
      confirm(index,index2){//点击确定后 返回选中索引与值
        this.rightAlert=false
        this.isPrettyCashOff = index
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
            this.content=data.content
            this.shortcutSearchContent = data.shortcutSearchContent
            this.appToastShow = true

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
          return '/homeApp/m_finReimbursementView?id=' + id + '&isFinishBack=' + isFinish + '&isApproval=' + isApproval
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
