<template>
  <div class="app_main">
    <yhm-app-structure-top-tap>
      <yhm-app-structure-top-tap-menu @call="backEvent" title="返回"></yhm-app-structure-top-tap-menu>
      <yhm-app-structure-top-tap-menu @call="waitEvent" title="待审批" :select="isFinish == '1'"></yhm-app-structure-top-tap-menu>
      <yhm-app-structure-top-tap-menu @call="finishEvent" title="已完成" :select="isFinish == '0'"></yhm-app-structure-top-tap-menu>
    </yhm-app-structure-top-tap>

    <yhm-app-scroll :pageIndex="pageIndex" :init-load-finish="loadFinish" :empty="empty" :params="params" :pull-down-refresh-url="isFinish==='0'?url='/Insurance/m_getPoManager':url='/Insurance/m_getInsuranceAppManager'" @refreshCall="refreshEvent" :pull-up-load-url="url" @loadCall="loadEvent">

      <appSearch @change="change" @alertShow="rightAlert=true,key<1?key+=1:''" :list="shortcutSearchContent" ></appSearch>

      <yhm-app-structure-menu-group :url="getUrl(item.id,isFinish)" v-for="(item) in content" :key="item.id">
        <yhm-app-view-control :contentTitle="item.plate" :content="item.insuredDate" type="date"></yhm-app-view-control>
        <yhm-app-view-detail>
<!--          车牌号:<span style="color: #49a9ea;">{{item.plate}}</span>，-->
          联系人<span style="color:#08acc0;">【{{item.contactName}}】</span>，
          被投保人<span style="color:#08acc0;">【{{item.beinsuredName}}】</span>，
          投保类型 <span style="color:#027c02;"> {{item.insuredTypeVal}}</span>，
          投保公司是<span style="color: #fd6802;" >{{item.insuredUnitVal}}</span>，
          优惠金额/点数  <yhm-app-view-money color="#FF0000" :content="item.discountMoney"></yhm-app-view-money><span style="color: #FF0000"> / {{item.discountCount}}</span>
        </yhm-app-view-detail>
        <yhm-app-approval-result v-show="getIsFinish" :category="true" :left="3.5" :top="0.5"></yhm-app-approval-result>
      </yhm-app-structure-menu-group>

    </yhm-app-scroll>
    <appfiltrate :alert-show="rightAlert" @close="rightAlert=false,key<1?key+=1:''" >
      <appRadiofilter :list="insuredUnitList" title="保险公司" :key="key" @change="radioChange"></appRadiofilter>
      <div class="alert_bottom">
        <yhm-app-button  value="重置" @call="reset()" icon="" category="five" style="border: 1px solid #666;margin-right:0.75rem;"></yhm-app-button>
        <yhm-app-button  value="确定" @call="confirm(insuredUnit)" icon="" category="two"></yhm-app-button>
      </div>
    </appfiltrate>
    <appToast type="loading" v-show="!appToastShow" @login-success="appToastShow = $event"></appToast>
  </div>
</template>

<script>
  import { appmanagermixin } from '@/assetsApp/app_manager.js'
  import appToast from '@/pagesApp/common/appToast'
  import appSearch from '@/pagesApp/common/appSearch'
  import appfiltrate from '@/pagesApp/common/appFiltrate'
  import appRadiofilter from '@/pagesApp/common/appRadiofilter'
  export default {
    name: 'm_interestRateManager',
    mixins: [appmanagermixin],
    components:{
      appToast,
      appSearch,
      appfiltrate,
      appRadiofilter
    },
    data(){
      return{
        content:[],
        shortcutSearchContent:[],
        appToastShow:false,
        rightAlert:false,
        key: 0,//用来刷新组件状态 点击重置按钮时刷新默认状态
        insuredUnitList:[],
        url:'/Insurance/m_getInsuranceAppManager',
        insuredUnit:'',
        isFinish:'1',
        params:{
          isFinish:'1'
        },
      }
    },methods:{
      radioChange(index,item){
        this.insuredUnit=index
      },
      change(value){//搜索 从组件接收value值 用户执行操作时触发当前事件
        this.searchStr = value
        this.initPageData(false)
      },
      confirm(index,index2){//点击确定后 返回选中索引与值
        this.insuredUnit = index
        this.rightAlert=false
        this.initPageData(false)
      },
      reset(){//重置选择
        this.insuredUnit = ''
        this.key+=1//刷新组件
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
          this.insuredUnit=''
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
          this.insuredUnit=''

          this.initPageData(false)
        }
      },
      refreshEvent(data){
        if(data.type === 0) {
          this.content = []
          if(this.isFinish == '1'){
            this.url = '/Insurance/m_getInsuranceAppManage'
          }else{
            this.url = '/Insurance/m_getPoManager'
          }
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
        let url = ''
        if(this.isFinish == '1'){
          url = '/Insurance/m_getInsuranceAppManager'
        }else if(this.isFinish == '0'){
          url = '/Insurance/m_getPoManager'
        }
        let params = {}
        if (initValue) {
          // 页面初始化是需要的参数
          params = {
          }
        } else {
          // 页面非初始化时需要的参数
          params = {
            searchStr:this.searchStr,
            insuredUnit:this.insuredUnit
          }
        }
        this.init({
          initValue: initValue,
          url: url,
          data: params,
          all: (data) => {
            // 不管是不是初始化都需要执行的代码
            this.appToastShow = true
            this.content = data.content
            this.shortcutSearchContent = data.shortcutSearchContent

          },
          init: (data) => {
            // 初始化时需要执行的代码
            this.appToastShow = true
            this.content = data.content
            this.insuredUnitList = data.insuredUnitList
          }
        })
      }
    },
    computed:{
      getIsFinish(){
        return this.isFinish === '0'
      },
      getUrl(){
        return function(id,isFinish,isApproval,state){
          return '/homeApp/m_interestRateView?id=' + id + '&isFinishBack=' + isFinish
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
