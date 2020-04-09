<template>
  <div class="app_main">
    <yhm-app-structure-top-tap>
      <yhm-app-structure-top-tap-menu @call="backEvent" title="返回"></yhm-app-structure-top-tap-menu>
      <yhm-app-structure-top-tap-menu :select="true" title="查看付款信息"></yhm-app-structure-top-tap-menu>
    </yhm-app-structure-top-tap>

<!--    <yhm-app-scroll :empty="false" :init-load-finish="loadFinish">-->
    <div style="overflow: auto;">
      <yhm-app-structure-menu-group title="基本信息">
        <yhm-app-view-control title="收款方" :content="otherUnit"></yhm-app-view-control>
        <yhm-app-view-control title="付款金额" :content="planMoney" type="money" color="#4BB414"></yhm-app-view-control>
      </yhm-app-structure-menu-group>
      <yhm-app-structure-menu-group title="事件信息" v-for="(item,index) in details" :key="index" @click="toggle(index)" :index="index" :length="details.length">
        <yhm-app-view-control title="事件描述" style="white-space: nowrap;" :content="item.name"></yhm-app-view-control>
        <yhm-app-view-control title="品牌" :content="item.branch" :psd="item.brandPsd.list"></yhm-app-view-control>
        <yhm-app-view-control title="事件类型" :content="item.cause" class="eventType"></yhm-app-view-control>
        <yhm-app-view-control title="最迟付款日期" :content="item.lastDate" type="date"></yhm-app-view-control>
        <yhm-app-view-control title="付款金额" :content="item.money" type="money" color="#f00"></yhm-app-view-control>
        <yhm-app-view-control title="编号" :content="item.code"></yhm-app-view-control>
        <yhm-app-view-control title="生成申请" :content="item.isAuto" :psd="item.isAutoPsd.list"></yhm-app-view-control>
        <p class="app_files" style=" word-wrap: break-word;word-break: normal;">文件:
          <span v-for="(items,index) in item.files" :key="index" class="imgName" @click="imgSkip(items)">{{items.showName}}</span>
        </p>
        <yhm-app-structure-group-operate >
        </yhm-app-structure-group-operate>
      </yhm-app-structure-menu-group>
<!--    </yhm-app-scroll>-->
    </div>
    <appToast type="loading" v-show="!appToastShow" @login-success="appToastShow = $event"></appToast>

  </div>
</template>

<script>
  import { appviewmixin } from '@/assetsApp/app_view.js'
  import { ImagePreview } from 'vant';
  import appToast from '@/pagesApp/common/appToast'

  export default {
    name: 'm_finPaymentPlanView',
    mixins: [appviewmixin],
    components:{
      appToast
    },
    data(){
      return{
        appToastShow:false,
        category:'',     //流程类型
        isFinishBack:'1',
        otherUnit:'',
        planMoney:'',
        person:'',
        code:'',
        workDate:'',    //申请日期
        state: '',
        // brandList:[],
        details:[],
        isFinish:'0',
        rejectDetail:'',
        files:[],
        content:''
      }
    },
    methods: {
      imgSkip (item) {
        let img = /UploadFile/ + item.tag + '/' + item.storeName
        if (item.image === '1') {
          ImagePreview([img]);
        } else if (item.image === '0') {
          window.open(img)
        }
      },
      toggle (index) {
        if ($(".structure_main_content").eq(index + 1).is(":hidden")) {//判断是否隐藏去除隐藏后重叠的底部边框
          $('.structure_main_title').eq(index + 1).css({ 'border-bottom': '0.02666667rem solid #bfbfbf' })
        } else {
          $('.structure_main_title').eq(index + 1).css({ 'border-bottom': '0' })
        }
        this.$nextTick(() => {
          $(".structure_main_content").eq(index + 1).toggle(400,);
          setTimeout(() => {
            this.loadFinish = !this.loadFinish
          }, 400)
        })
      },
      /* 返回 */
      backEvent () {
        this.$router.push("/homeApp/m_finPaymentPlanManager?isFinish=" + this.isFinishBack)
      },
    },
    created () {
      this.setQuery2Value('isFinishBack')
      this.setQuery2Value('isApproval')
      this.init({
        url: '/PersonOffice/m_getApprovalPaymentPlanById',
        call:(data)=> {
          this.appToastShow = true
          this.otherUnit=data.otherUnit
          this.planMoney=data.planMoney
          this.state = data.state
          this.category = data.category
          this.details = data.list
          // this.brandList = data.brandPsd
          this.typeList = data.typeList
        }
      })
    },
    computed:{

    }
  }
</script>

<style scoped>
  .app_files{
    width: 100%;
    font-size: 0.37333333rem;
    padding-bottom: 0.42666667rem;
    color: #888888;
  }
  .app_files span{
    text-decoration: underline;
    float: right;
    color: #49a9ea;
    margin-left: 0.22666667rem;
  }
  .imgName{
    width: 65%;
    text-align: right;
  }
</style>
