<template>
  <div>
    <yhm-app-structure-top-tap>
      <yhm-app-structure-top-tap-menu @call="backEvent" title="返回"></yhm-app-structure-top-tap-menu>
      <yhm-app-structure-top-tap-menu :select="true" title="查看备用金信息"></yhm-app-structure-top-tap-menu>
    </yhm-app-structure-top-tap>

    <div style="overflow: auto;">
      <yhm-app-structure-menu-group title="基本信息">
        <yhm-app-view-control title="所属单位" :content="unit"></yhm-app-view-control>
        <yhm-app-view-control title="申请人员" :content="person"></yhm-app-view-control>
        <yhm-app-view-control title="发票类型" :content="invoiceCategory" :psd="invoiceCategoryList"></yhm-app-view-control>
        <yhm-app-view-control title="申请事由" :content="subject"></yhm-app-view-control>
        <yhm-app-view-control title="业务相关" :content="isTravel" :psd="isTravelList"></yhm-app-view-control>
        <yhm-app-view-control title="申请日期" :content="workDate"></yhm-app-view-control>
        <yhm-app-view-control title="申请金额" :content="money" type="money" color="#f00"></yhm-app-view-control>
        <yhm-app-view-control title="申请编号" :content="code"></yhm-app-view-control>
        <yhm-app-view-control title="预计核销日期" :content="estimateDate"></yhm-app-view-control>
        <yhm-app-view-control title="备注" :content="remark"></yhm-app-view-control>
        <p class="app_files" style=" word-wrap: break-word;word-break: normal;" v-if="list.length>=1">文件:
          <span v-for="(items,index) in list" :key="index" class="imgName" @click="imgSkip(items)">{{items.showName}}</span>
        </p>
      </yhm-app-structure-menu-group>
      <yhm-app-structure-menu-group title="拨付信息" v-for="(item,index) in bankDetailList" :key="index" @click="toggle(index)" :index="index" :length="bankDetailList.length">
        <yhm-app-view-control title="账号" style="white-space: nowrap;" :content="item.selfAccount"></yhm-app-view-control>
        <yhm-app-view-control title="对方账号" :content="item.otherAccount"></yhm-app-view-control>
        <yhm-app-view-control title="交易日期" :content="item.cccurDate"></yhm-app-view-control>
        <yhm-app-view-control title="事由" :content="item.subject"></yhm-app-view-control>
        <yhm-app-view-control title="交易金额" :content="item.money" color="#f00" type="money"></yhm-app-view-control>
        <yhm-app-view-control title="备注" :content="item.remark"></yhm-app-view-control>
      </yhm-app-structure-menu-group>
    </div>
    <appToast type="loading" v-show="!appToastShow" @login-success="appToastShow = $event"></appToast>
  </div>
</template>

<script>
  import { appviewmixin } from '@/assetsApp/app_view.js'
  import { ImagePreview } from 'vant';
  import appToast from '@/pagesApp/common/appToast'//轻提示组件

  export default {
    name: "m_finPrettyCashsView",
    mixins: [appviewmixin],
    components:{
      appToast,
    },
    data(){
      return{
        appToastShow:false,
        unit:'',//单位
        person:'',//申请人员
        invoiceCategory:'',//发票类型
        invoiceCategoryList:[],//发票类型
        workDate:'',//申请日期
        isTravel:'',//业务类型
        isTravelList:'',//业务类型
        money:'',//申请金额
        code:'',//申请编号
        subject:'',//事由
        estimateDate:'',//预计核销日期
        remark:'',//备注
        list:'',//文件
        state:'',//审批状态
        bankDetailList:[],//拨付明细
        operateShow:true,//审批按钮
        isFinish:'',
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
        this.$router.push("/homeApp/m_finPrettyCashsManager?isFinish=" + this.isFinishBack)
      },
    },
    computed:{
      getShowOperate(){
        return this.isFinish === '1'
      },
      getState(){
        let arr = ['1','3','5','7','9','11','15','-1']//通过的所有状态
        // let arr2 = ['2','4','6','8','10','12','16']
        // if(arr2.indexOf(this.state)!==-1&&this.isFinishBack =='0')
        if(arr.indexOf(this.state)!==-1&&this.isFinishBack !=='1'){
          return true
        }else{
          return false
        }
      }
    },
    created () {
      this.setQuery2Value('isFinishBack')
      this.setQuery2Value('isApproval')
      this.isFinish = this.isFinishBack
      this.init({
        url: '/PersonOffice/m_prettyCashsForm',
        call:(data)=> {
          this.appToastShow = true
          this.unit = data.unit
          this.person = data.person
          this.invoiceCategory = data.invoiceCategory
          this.invoiceCategoryList = data.invoiceCategoryPsd
          this.workDate = data.workDate
          this.isTravel = data.isTravel
          this.isTravelList = data.isTravelPsd
          this.money = data.money
          this.code = data.code
          this.state = data.state
          this.subject = data.subject
          this.estimateDate = data.estimateDate
          this.remark = data.remark
          this.bankDetailList = data.bankDetailList
          this.list = data.list
          // this.isFinish = data.isFinish
        }
      })
    },
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
