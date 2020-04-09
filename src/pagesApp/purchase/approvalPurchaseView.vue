<template>
  <div class="app_main">
    <yhm-app-structure-top-tap>
      <yhm-app-structure-top-tap-menu @call="backEvent" title="返回"></yhm-app-structure-top-tap-menu>
      <yhm-app-structure-top-tap-menu :select="true" title="采购信息明细"></yhm-app-structure-top-tap-menu>
    </yhm-app-structure-top-tap>
    <div class="noticeBar" v-if="states==9||isFinish==0&&states==-1">请移动到PC端进行拨款</div>
    <div style="overflow: auto;">
<!--    <yhm-app-scroll :empty="false" :init-load-finish="loadFinish">-->
      <yhm-app-structure-menu-group title="基本信息">
        <yhm-app-view-control title="申请人" style="white-space: nowrap;" :content="person"></yhm-app-view-control>
        <yhm-app-view-control title="申请日期" :content="workDate" type="date"></yhm-app-view-control>
        <yhm-app-view-control title="采购分类" :content="categoryPurchase" :psd="categoryPurchaseList"></yhm-app-view-control>
        <yhm-app-view-control title="采购类型" :content="model" :psd="modelList"></yhm-app-view-control>
        <yhm-app-view-control title="预计使用日期" :content="lastDate" type="date"></yhm-app-view-control>
        <yhm-app-view-control title="预估价值" :content="money" type="money" color="#FF0000"></yhm-app-view-control>
        <yhm-app-view-control title="申请编号" :content="code"></yhm-app-view-control>
        <yhm-app-view-control v-show="rejectDetail !== ''" title="驳回理由" :content="rejectDetail"></yhm-app-view-control>
        <yhm-app-approval-result v-show="!getShowOperate" :category="getState" :left="3.5" :top="0.5"></yhm-app-approval-result>
      </yhm-app-structure-menu-group>
      <yhm-app-structure-menu-group title="商品信息">
        <yhm-app-view-child :title="'商品明细（' + item.num + '）'" v-for="(item) in productDetails" :key="item.id">
          <yhm-app-view-control title="商品名称" :content="item.product"></yhm-app-view-control>
          <yhm-app-view-control title="型号" :content="item.model"></yhm-app-view-control>
          <yhm-app-view-control title="数量" :content="item.quantity" :after-content="item.unit"></yhm-app-view-control>
          <yhm-app-view-control title="参考单价" :content="item.price" type="money"></yhm-app-view-control>
          <yhm-app-view-control title="参考总额" :content="item.totalMoney" type="money"></yhm-app-view-control>
          <yhm-app-view-control title="建议品牌" :content="item.remark"></yhm-app-view-control>
        </yhm-app-view-child>
      </yhm-app-structure-menu-group>
      <div style="width: 100%;height: 0.2rem;"></div>
<!--    </yhm-app-scroll>-->
    </div>
    <yhm-app-form-operate v-if="getShowOperate" v-show="allBtnShow">
      <yhm-app-button @call="rejectEvent" value="驳回" category="ten"></yhm-app-button>
      <yhm-app-button @call="adoptEvent" value="通过" category="two"></yhm-app-button>
    </yhm-app-form-operate>
    <appToast type="loading" v-show="!appToastShow" @login-success="appToastShow = $event"></appToast>

  </div>
</template>

<script>
  import { appviewmixin } from '@/assetsApp/app_view.js'
  import appToast from '@/pagesApp/common/appToast'

  export default {
    name: 'm_approvalPurchaseView',
    mixins: [appviewmixin],
    components:{
      appToast
    },
    data(){
      return{
        appToastShow:false,
        states:'',
        allBtnShow:true,
        category:'',     //流程类型
        isFinishBack:'1',
        person:'',
        code:'',
        workDate:'',    //申请日期
        lastDate:'',    //最后到货日期
        categoryPurchase:'',        //采购分类
        categoryPurchaseList:[],    //采购分类明细
        model:'',           //采购类型
        modelList:[],       //采购类型明细
        productDetails:[],  //商品明细
        money:'',           //预估价值
        state: '',
        isFinish:'0',
        rejectDetail:''
      }
    },
    methods:{
      backEvent(){
        this.$router.push("/homeApp/m_approvalPurchaseManager?isFinish=" + this.isFinishBack)
      },
      //驳回事件
      rejectEvent(){
        this.$appDialog.openWindow({
          url:'/homeApp/m_rejectForm?category=' + this.category+'&id=' + this.id + '&tableName=46&kind=0',
          title : '采购申请驳回操作',
          closeCallBack:(data) => {
            if(data){
              this.isFinish = '1'
              this.state = 2
              this.rejectDetail = data
            }
          }
        })
      },
      //通过事件
      adoptEvent(){
        let params = {
          id: this.id,
          kind: '0',
          tableName: '46'
        }

        this.$appDialog.confirm({
          tipValue: '是否通过?',
          okCallBack: (data)=>{
            this.ajaxJson({
              url: '/PersonOffice/m_approvalYesVue',
              data: params,
              loading : '0',
              call: (data)=>{
                if(data.type === 0){
                  this.$appDialog.toast({
                    tipValue: data.message,
                    closeCallBack: () => {
                      ////结束刷新页面
                      this.isFinish = '1'
                      this.state = -1
                    }
                  })
                }else if(data.type === 1){
                  this.$appDialog.toast({
                    tipValue: data.message,
                    alertImg: 'error',
                    closeCallBack: () => {
                    }
                  })
                }
                else if(data.type === 2){
                  this.$appDialog.toast({
                    tipValue: data.message,
                    alertImg: 'error',
                    closeCallBack: () => {
                      ////结束刷新页面

                    }
                  })
                }
              }
            })
          }
        })
      }
    },
    created () {
      this.setQuery2Value('isFinishBack')
      this.init({
        url: '/PersonOffice/m_initPurchaseForm',
        call:(data)=> {
          this.appToastShow = true
          this.category = data.category
          this.person = data.person
          this.code = data.code
          this.workDate = data.workDate
          this.lastDate = data.lastDate
          this.categoryPurchase = data.categoryPurchasePsd.value
          this.categoryPurchaseList = data.categoryPurchasePsd.list
          this.model = data.modelPsd.value
          this.modelList = data.modelPsd.list
          this.productDetails = data.productDetails
          this.money = data.money
          this.state = data.state
          this.isFinish = data.isFinish
          this.rejectDetail = data.rejectDetail
          this.states = data.states
          if(this.states=='9'||this.isFinish==0&&this.states==-1){
            this.allBtnShow=false
          }else{
            this.allBtnShow=true
          }
        }
      })
    },
    computed:{
      getShowOperate(){
        return this.isFinish === '0'
      },
      getState(){
        return this.state % 2 == 1 || this.state == -1
      }
    }
  }
</script>

<style scoped lang="less">
  @rem:375/10rem;
  .noticeBar{
    font-size: 14/@rem;
    background-color: #fffbe8;
    color: #ed6a0c;
    padding: 5/@rem 20/@rem;
    text-align: center;
  }
</style>
