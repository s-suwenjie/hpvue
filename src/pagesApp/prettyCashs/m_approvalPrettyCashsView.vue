<template>
  <div>
    <yhm-app-structure-top-tap>
      <yhm-app-structure-top-tap-menu @call="backEvent" title="返回"></yhm-app-structure-top-tap-menu>
      <yhm-app-structure-top-tap-menu :select="true" title="查看备用金信息"></yhm-app-structure-top-tap-menu>
    </yhm-app-structure-top-tap>

    <div style="overflow: auto;">
      <yhm-app-structure-menu-group title="基本信息">
        <yhm-app-view-control title="所属单位" content="123"></yhm-app-view-control>
        <yhm-app-view-control title="申请人员" content="11"></yhm-app-view-control>
        <yhm-app-view-control title="发票类型" content="22"></yhm-app-view-control>
        <yhm-app-view-control title="申请事由" content="33"></yhm-app-view-control>
        <yhm-app-view-control title="业务相关" content="55"></yhm-app-view-control>
        <yhm-app-view-control title="申请日期" content="66"></yhm-app-view-control>
        <yhm-app-view-control title="申请金额" content="77"></yhm-app-view-control>
        <yhm-app-view-control title="申请编号" content="88"></yhm-app-view-control>
        <yhm-app-view-control title="预计核销日期" content="99"></yhm-app-view-control>
        <yhm-app-view-control title="备注" content="123666"></yhm-app-view-control>
<!--        <p class="app_files" style=" word-wrap: break-word;word-break: normal;">文件:-->
<!--          <span v-for="(items,index) in item.files" :key="index" class="imgName" @click="imgSkip(items)">{{items.showName}}</span>-->
<!--        </p>-->
      </yhm-app-structure-menu-group>
      <yhm-app-structure-menu-group title="拨付信息" v-for="(item,index) in details" :key="index" @click="toggle(index)" :index="index" :length="details.length">
        <yhm-app-view-control title="账号" style="white-space: nowrap;" :content="item.name"></yhm-app-view-control>
        <yhm-app-view-control title="对方账号" :content="item.branch" :psd="item.brandPsd.list"></yhm-app-view-control>
        <yhm-app-view-control title="交易日期" :content="item.cause" class="eventType"></yhm-app-view-control>
        <yhm-app-view-control title="收支方向" :content="item.lastDate" type="date"></yhm-app-view-control>
        <yhm-app-view-control title="事由" :content="item.money" type="money" color="#f00"></yhm-app-view-control>
        <yhm-app-view-control title="交易金额" :content="item.code"></yhm-app-view-control>
        <yhm-app-view-control title="备注" :content="item.isAuto" :psd="item.isAutoPsd.list"></yhm-app-view-control>
        <p class="app_files" style=" word-wrap: break-word;word-break: normal;">文件:
          <span v-for="(items,index) in item.files" :key="index" class="imgName" @click="imgSkip(items)">{{items.showName}}</span>
        </p>
        <yhm-app-structure-group-operate >
        </yhm-app-structure-group-operate>
      </yhm-app-structure-menu-group>
    </div>
    <appToast type="loading" v-show="!appToastShow" @login-success="appToastShow = $event"></appToast>
  </div>
</template>

<script>
  import { appviewmixin } from '@/assetsApp/app_view.js'
  import { ImagePreview } from 'vant';
  import appToast from '@/pagesApp/common/appToast'

  export default {
    name: "m_approvalPrettyCashsView",
    mixins: [appviewmixin],
    components:{
      appToast
    },
    data(){
      return{
        appToastShow:false,

      }
    },
    methods:{
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
        this.$router.push("/homeApp/m_approvalPrettyCashsManager?isFinish=" + this.isFinishBack)
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
