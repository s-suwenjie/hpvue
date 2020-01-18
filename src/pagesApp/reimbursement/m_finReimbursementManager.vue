<template>
  <div>
    <yhm-app-structure-top-tap>
      <yhm-app-structure-top-tap-menu @call="backEvent" title="返回"></yhm-app-structure-top-tap-menu>
      <yhm-app-structure-top-tap-menu @call="waitEvent" title="进行中" :select="isFinish === '1'"></yhm-app-structure-top-tap-menu>
      <yhm-app-structure-top-tap-menu @call="finishEvent" title="已完成" :select="isFinish === '0'"></yhm-app-structure-top-tap-menu>
    </yhm-app-structure-top-tap>

    <yhm-app-scroll :pageIndex="pageIndex" :init-load-finish="loadFinish" :empty="empty" :params="params" :pull-down-refresh-url="url" @refreshCall="refreshEvent" :pull-up-load-url="url" @loadCall="loadEvent">
      <appSearch @blur="blurEvent"  @focus="focusEvent" :list="shortcutSearchContent" @keyup.enter="keyupEvent"  :leftAlert="leftAlert" :search="search">
        <span class="search_btn" @click="leftAlert=true">筛选</span>
      </appSearch>
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

      <appfiltrate v-show="leftAlert" @click="leftAlert=!leftAlert" :hide-show="!leftAlert" >
        <p class="app_alert_title">是否核销:</p>
        <div class="app_main_btn">
          <span v-for="(item,index) in isPrettyCashOffList" :key="index" @click="livenessClick(item.num)" :class="{active:index==isPrettyCashOff}" class="app_alert_btn liveness">{{item.showName}}</span>
        </div>

        <div class="alert_bottom" style="display: flex;justify-content: center;">
          <yhm-app-button  value="重置" @call="reset()" icon="" category="five" style="border: 1px solid #666;margin-right:0.75rem;"></yhm-app-button>
          <yhm-app-button  value="确定" @call="confirm(isPrettyCashOff,isPrettyCashOffList[isPrettyCashOff])" icon="" category="two"></yhm-app-button>
        </div>
      </appfiltrate>

    </yhm-app-scroll>
  </div>
</template>

<script>
  import { appmanagermixin } from '@/assetsApp/app_manager.js'
  import appSearch from '../common/appSearch'
  import appfiltrate from '../common/appfiltrate'
  export default {
    name: 'm_finReimbursementManager',
    mixins: [appmanagermixin],
    components:{
      appSearch,
      appfiltrate
    },
    data(){
      return{
        search:'',
        leftAlert:false,
        searchFrequentlyShow:false,
        shortcutSearchContent: [],
        isPrettyCashOff:0,
        isFinish:'1',
        url:'/PersonOffice/m_getReimbursementManagerAll',
        params:{
          isFinish:'1'
        },
        content:[]
      }
    },
    methods:{
      confirm(livenessIndex,livenessItem){//点击确定后 返回选中索引与值
        this.leftAlert=false
        console.log( livenessIndex,livenessItem)
      },
      reset(){//重置选择
        this.isPrettyCashOff = this.isPrettyCashOffList.length-1//重置索引值
      },
      livenessClick(index,item){//获取选中索引以及值
        this.isPrettyCashOff = index
      },

      tacitlyApprove(){//默认选中全部
        this.$nextTick(()=>{
          this.isPrettyCashOff = this.isPrettyCashOffList.length-1//重置索引值
        })
      },
      backEvent(){
        this.$router.push('/homeApp/m_menu')
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
            searchStr: this.search
          }
        } else {
          // 页面非初始化时需要的参数
          params = {
            isFinish:this.isFinish,
            searchStr: this.search
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

          },
          init: (data) => {
            // 初始化时需要执行的代码
            this.isPrettyCashOffList = data.isPrettyCashOffPsd.list
            this.isPrettyCashOffList.push({num:this.isPrettyCashOffList.length,showName:'全部'})
            console.log(this.isPrettyCashOffList  )
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
      this.tacitlyApprove()
      this.setQuery2Value('isFinish')
      this.params.isFinish = this.isFinish

    }
  }
</script>

<style scoped lang="less">

</style>
