<template>
    <div class="app_main">
      <yhm-app-structure-top-tap>
        <yhm-app-structure-top-tap-menu @call="backEvent" title="返回"></yhm-app-structure-top-tap-menu>
        <yhm-app-structure-top-tap-menu @call="waitEvent" title="待审批" :select="isFinish === '1'"></yhm-app-structure-top-tap-menu>
        <yhm-app-structure-top-tap-menu @call="finishEvent" title="已审批" :select="isFinish === '0'"></yhm-app-structure-top-tap-menu>
      </yhm-app-structure-top-tap>

      <yhm-app-scroll :pageIndex="pageIndex" :init-load-finish="loadFinish" :empty="empty" :params="params" :pull-down-refresh-url="url" @refreshCall="refreshEvent" :pull-up-load-url="url" @loadCall="loadEvent">
        <yhm-app-structure-menu-group :url="getUrl(item.id,isFinish)" v-for="(item) in content" :key="item.id">
          <yhm-app-view-control :contentTitle="item.person + item.state" :content="item.workDate" type="date"></yhm-app-view-control>
          <yhm-app-view-detail>
            <span style="color:#aaaaaa">【{{item.person}}】</span>
            提交了<yhm-app-view-psd :psd="categoryPurchaseItems" :content="item.categoryPurchase"></yhm-app-view-psd>
            中的<yhm-app-view-psd :psd="modelItems" :content="item.model"></yhm-app-view-psd>
            类型的采购申请，预估价值<yhm-app-view-money color="#FF0000" :content="item.money"></yhm-app-view-money>
            ，<yhm-app-view-psd :psd="stateItems" :content="item.state"></yhm-app-view-psd>
          </yhm-app-view-detail>
          <yhm-app-approval-result v-show="getIsFinish" :category="item.state % 2 == 1||item.state== -1" :left="3.5" :top="0.5"></yhm-app-approval-result>
        </yhm-app-structure-menu-group>

<!--        <yhm-app-structure-menu-group title="商品列表">-->
<!--          <yhm-app-view-child>-->
<!--            <yhm-app-view-control title="申请人" content="程序员程序员程序员程"></yhm-app-view-control>-->
<!--            <yhm-app-view-control title="申请日期" content="2019-09-20"></yhm-app-view-control>-->
<!--            <yhm-app-structure-menu-group title="商品列表">-->
<!--              <yhm-app-view-child>-->
<!--                <yhm-app-view-control title="申请人" content="程序员"></yhm-app-view-control>-->
<!--                <yhm-app-view-control title="申请日期" content="2019-09-20"></yhm-app-view-control>-->
<!--              </yhm-app-view-child>-->
<!--              <yhm-app-view-child>-->
<!--                <yhm-app-view-control title="申请人" content="程序员"></yhm-app-view-control>-->
<!--                <yhm-app-view-control title="申请日期" content="2019-09-20"></yhm-app-view-control>-->
<!--                <yhm-app-structure-group-operate>-->
<!--                  <yhm-app-button value="驳回" category="ten"></yhm-app-button>-->
<!--                  <yhm-app-button value="通过" category="three"></yhm-app-button>-->
<!--                  <yhm-app-button value="详情" category="two"></yhm-app-button>-->
<!--                </yhm-app-structure-group-operate>-->
<!--              </yhm-app-view-child>-->
<!--              <yhm-app-view-child>-->
<!--              </yhm-app-view-child>-->
<!--            </yhm-app-structure-menu-group>-->
<!--          </yhm-app-view-child>-->
<!--          <yhm-app-view-child>-->
<!--            <yhm-app-view-control title="申请人" content="程序员"></yhm-app-view-control>-->
<!--            <yhm-app-view-control title="申请日期" content="2019-09-20"></yhm-app-view-control>-->
<!--            <yhm-app-structure-group-operate>-->
<!--              <yhm-app-button value="驳回" category="ten"></yhm-app-button>-->
<!--              <yhm-app-button value="通过" category="three"></yhm-app-button>-->
<!--              <yhm-app-button value="详情" category="two"></yhm-app-button>-->
<!--            </yhm-app-structure-group-operate>-->
<!--          </yhm-app-view-child>-->
<!--          <yhm-app-view-child>-->
<!--          </yhm-app-view-child>-->
<!--        </yhm-app-structure-menu-group>-->

<!--        <yhm-app-structure-menu-group>-->
<!--          <yhm-app-view-control title="申请人" content="程序员"></yhm-app-view-control>-->
<!--          <yhm-app-view-control title="申请日期" content="2019-09-20"></yhm-app-view-control>-->
<!--          <yhm-app-view-control title="申请编号" content="PUR20191217CXY001PRO001W"></yhm-app-view-control>-->
<!--        </yhm-app-structure-menu-group>-->




        <!--<yhm-app-structure-menu-group>
          <yhm-app-view-control title="申请人" content="程序员"></yhm-app-view-control>
          <yhm-app-view-control title="申请日期" content="2019-09-20"></yhm-app-view-control>
          <yhm-app-view-control title="申请编号" content="PUR20191217CXY001PRO001W"></yhm-app-view-control>
        </yhm-app-structure-menu-group>-->
      </yhm-app-scroll>
      <appToast type="loading" v-show="!appToastShow" @login-success="appToastShow = $event"></appToast>
    </div>
</template>

<script>
  import { appmanagermixin } from '@/assetsApp/app_manager.js'
  import appToast from '@/pagesApp/common/appToast'
  export default {
    name: 'm_approvalPurchaseManager',
    mixins: [appmanagermixin],
    components:{
      appToast
    },
    data(){
      return{
        appToastShow:false,
        isFinish:'1',
        url:'/PersonOffice/m_getApprovalPurchaseManager',
        params:{
          isFinish:'1'
        },
        categoryPurchaseItems:[],//采购分类
        modelItems:[],//采购类型
        stateItems:[],//状态
      }
    },
    methods:{
      toggle(index){
        $(".reimCon").eq(index).toggle(300,);
      },
      save(type){
        if(this.validator()){
        }
        else{
        }
      },
      //返回我的审批页面
      backEvent(){
        // this.$appDialog.toast({
        //   tipValue:'确定提交确定提交确定提交确定提交发送到发送到发送到发送到讽德诵功很过分',
        //   alertImg:'warn'
        // })
        // this.$appDialog.confirm({
        //   tipValue:'确定提交吗确定提交吗确定提交吗确定提交吗',
        //   btnValueOk:'确定',          //默认值为确定，可以不写
        //   btnValueCancel:'取消',      //默认值为取消，可以不写
        //   okCallBack:()=>{
        //     alert("111")
        //   },
        //   cancelCallBack:()=>{
        //     alert("222")
        //   }
        // })
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
          url: '/PersonOffice/m_getApprovalPurchaseManager',
          data: params,
          all: (data) => {
            // 不管是不是初始化都需要执行的代码
            this.appToastShow = true
          },
          init: (data) => {
            // 初始化时需要执行的代码
            this.categoryPurchaseItems = data.categoryPurchaseItems
            this.modelItems = data.modelItems
            this.appToastShow = true
            this.stateItems = data.stateItems

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
          return '/homeApp/m_approvalPurchaseView?id=' + id + '&isFinishBack=' + isFinish
        }
      },
    },
    created () {
      this.setQuery2Value('isFinish')
      this.params.isFinish = this.isFinish
    }
  }
</script>

<style scoped lang="less">
  @rem: 375/10rem;
  .basic{

    margin-bottom: 16/@rem !important;
  }
  .basic,.reim{
    font-size: 18/@rem;
    border-radius: 8px;
    border: solid 1px #bfbfbf;
    margin: 0 16/@rem 0;
    background-color: #fff;
    .basicTit,.reimTit{
      line-height: 48/@rem;
      margin: 0 18/@rem;
      display: flex;
      justify-content: space-between;
      .titTxt{
        font-size: 18/@rem;
        color: #333;
      }
      .titNum{
        font-size: 16/@rem;
        color: #65b933;
      }
    }
    .basicCon>div:first-child{
      margin-top: 20/@rem;
    }
    .basicCon>div {
      margin: 0 18/@rem 16/@rem;
      display: flex;
      p {
        display: inline-block;
        font-size: 14/@rem;
      }
      .conLft {
        width: 88/@rem;
        color: #888;
        white-space: nowrap;
      }
      .conRgt {
        color: #333;
        margin-left: 8/@rem;
      }
    }
  }
  .basicCon,.reimCon{
    border-top: 1px solid #bfbfbf;
    .reimConTxt:first-child{
      margin-top: 16/@rem;
    }
    .reimConTxt>div{
      margin: 0 18/@rem 16/@rem;
      display: flex;
      p{
        display: inline-block;
        font-size: 14/@rem;
      }
      .conLft{
        width: 88/@rem;
        color: #888;
        white-space: nowrap;
      }
      .conRgt{
        width: 210/@rem;
        color: #333;
        margin-left: 8/@rem;
      }
    }
  }
  .reim{
    margin-bottom: 16/@rem;
  }

  .reimDetail{
    margin: 0 16/@rem 16/@rem;
    background-color: #fff;
    border-radius: 8px;
    border: solid 1px #bfbfbf;
    .reimDetailTit{
      line-height: 48/@rem;
      margin: 0 18/@rem;
    }
    .detailList{
      border-top: 1px solid #bfbfbf;
      .listPage{
        border: 1px dashed #bfbfbf;
        border-top: none;
        margin: 0 8/@rem 16/@rem;
        border-radius: 0 0 8px 8px;
        .listTit{
          margin: 0 10/@rem;
          background-color: #d4ecfc;
          border-radius: 0 0 4px 4px;
          line-height: 30/@rem;
          font-size: 14/@rem;
        }
        .listPageCon{
          div:first-child{
            margin-top: 20/@rem;
          }
          div{
            margin: 0 18/@rem 16/@rem;
            display: flex;
            p{
              display: inline-block;
              font-size: 14/@rem;
            }
            .conLft{
              width: 88/@rem;
              color: #888;
              white-space: nowrap;
            }
            .conRgt{
              color: #333;
              margin-left: 8/@rem;
            }
          }
        }
      }
    }
  }
</style>
