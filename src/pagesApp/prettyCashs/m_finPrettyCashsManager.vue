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
        <yhm-app-view-control :contentTitle="item.person" :content="item.workDate" type="date"></yhm-app-view-control>
        <yhm-app-view-detail>
          <span style="color:#aaaaaa">【{{item.person}}】</span>
          申请了
          <span style="color:#fd6802;">{{item.subject}}</span>
          的备用金，发票类型
          <span style="color: #c700df" v-if="item.invoiceCategory==0">有票</span>
          <span style="color: #FF0000" v-if="item.invoiceCategory==1">无票</span>
          ，倒计时
          <span style="color: #08acc0">{{item.day}}天</span>
          ，申请金额
          <yhm-app-view-money color="#FF0000" :content="item.money"></yhm-app-view-money>
          ，核销金额
          <yhm-app-view-money color="#FF0000" :content="item.reimbursementsMoney"></yhm-app-view-money>
          ，待退回金额
          <yhm-app-view-money color="#FF0000" :content="item.balance"></yhm-app-view-money>
          ，已退回金额
          <yhm-app-view-money color="#FF0000" :content="item.balance"></yhm-app-view-money>

          ，<span :style="{'color':item.stateColor}">{{item.stateVal}}</span>
        </yhm-app-view-detail>
      </yhm-app-structure-menu-group>
    </yhm-app-scroll>
        <appfiltrate :alert-show="rightAlert" @close="rightAlert=false,key<1?key+=1:''" >
          <appRadiofilter :list="invoiceCategoryList" title="发票类型" :key="key" @change="radioChange"></appRadiofilter>
          <appRadiofilter :list="isTravelList" title="业务相关" :key="key+10" @change="radioChange2"></appRadiofilter>
          <div class="alert_bottom">
            <yhm-app-button  value="重置" @call="reset()" icon="" category="five" style="border: 1px solid #666;margin-right:0.75rem;"></yhm-app-button>
            <yhm-app-button  value="确定" @call="confirm(invoiceCategory,isTravel)" icon="" category="two"></yhm-app-button>
          </div>
        </appfiltrate>
    <appToast type="loading" v-show="!appToastShow" @login-success="appToastShow = $event"></appToast>
  </div>
</template>R

<script>
  import { appmanagermixin } from '@/assetsApp/app_manager.js'
  import appSearch from '@/pagesApp/common/appSearch'//搜索框组件
  import appToast from '@/pagesApp/common/appToast'//轻提示组件
  import appfiltrate from '@/pagesApp/common/appFiltrate'//右侧弹出窗组件
  import appRadiofilter from '@/pagesApp/common/appRadiofilter'//筛选组件
  export default {
    name: "m_finPrettyCashsManager",
    mixins: [appmanagermixin],
    components:{
      appSearch,
      appToast,
      appfiltrate,
      appRadiofilter
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
        isTravel:'',
        isTravelList:[],
        shortcutSearchContent: [],
        isFinish:'1',
        url:'/PersonOffice/m_getPrettyCashsApproval',
        params:{
          isFinish:'1'
        },
        content:[],
      }
    },
    methods:{
      change(value){//搜索 从组件接收value值 用户执行操作时触发当前事件
        this.searchStr = value
        this.initPageData(false)
      },
      radioChange(index,item){//用户选择后触发 可接收选中的索引值以及类别
        this.invoiceCategory=index
      },
      radioChange2(index,item){
        this.isTravel=index
      },
      confirm(index,index2){//点击确定后 返回选中索引与值
        this.rightAlert=false
        this.invoiceCategory = index
        this.isTravel = index2
        this.initPageData(false)
      },
      reset(){//重置选择
        this.invoiceCategory = ''
        this.isTravel = ''
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
            // searchStr: this.searchStr
          }
        } else {
          // 页面非初始化时需要的参数
          params = {
            isFinish:this.isFinish,
            searchStr:this.searchStr,
            invoiceCategory:this.invoiceCategory,
            isTravel:this.isTravel
          }
        }
        this.init({
          initValue: initValue,
          url: '/PersonOffice/m_getPrettyCashsApprovalAll',
          data: params,
          all: (data) => {
            // 不管是不是初始化都需要执行的代码
            this.content = data.content
            this.appToastShow = true

          },
          init: (data) => {
            // 初始化时需要执行的代码
            this.appToastShow = true
            this.invoiceCategoryList = data.invoiceCategoryPsd.list
            this.isTravelList = data.isTravelPsd.list
            this.shortcutSearchContent = data.shortcutSearchContent
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
          return '/homeApp/m_finPrettyCashsView?id=' + id + '&isFinishBack=' + isFinish
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
