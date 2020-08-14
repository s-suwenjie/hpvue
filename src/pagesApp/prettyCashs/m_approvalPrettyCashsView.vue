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
        <yhm-app-approval-result v-if="stateShow" :category="category" :left="3.5" :top="0.5"></yhm-app-approval-result>
        <yhm-app-approval-result v-if="isFinish=='1'?false:true" :category="getState" :left="3.5" :top="0.5"></yhm-app-approval-result>
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
    <yhm-app-form-operate v-if="getShowOperate" v-show="operateShow">
      <yhm-app-button @call="rejectEvent(0)" value="驳回" category="ten"></yhm-app-button>
      <yhm-app-button @call="adoptEvent(0)" value="通过" category="two"></yhm-app-button>
    </yhm-app-form-operate>
    <appToast type="loading" v-show="!appToastShow" @login-success="appToastShow = $event"></appToast>
  </div>
</template>

<script>
  import { appviewmixin } from '@/assetsApp/app_view.js'
  import { ImagePreview } from 'vant';
  import appToast from '@/pagesApp/common/appToast'//轻提示组件

  export default {
    name: "m_approvalPrettyCashsView",
    mixins: [appviewmixin],
    components:{
      appToast,
    },
    data(){
      return{
        appToastShow:false,
        stateShow:false,
        category:'',
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
      //通过事件
      adoptEvent(){
        this.$appDialog.confirm({
          tipValue: '是否通过?',
          okCallBack: (data) => {
            let params = {
              id: this.id,
              kind: 0,
              tableName: '47',
            }
            this.ajaxJson({
              url: '/PersonOffice/m_approvalYesVue',
              data: params,
              loading:"0",
              call: (data)=>{
                if(data.type === 0){
                  this.$appDialog.toast({
                    tipValue: data.message,
                    closeCallBack: () => {
                      ////结束刷新页面
                      this.operateShow = false
                      this.state = '-1'
                      this.stateShow = true
                      this.category = true
                    }
                  })
                }else if(data.type === 1){
                  this.$appDialog.toast({
                    tipValue: data.message,
                    alertImg: 'error',
                    closeCallBack: () => {
                    }
                  })
                } else if(data.type === 2){
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
      },
      //驳回事件
      rejectEvent(){
        this.$appDialog.openWindow({
          url:'/homeApp/m_rejectForm?category=0' +'&id=' + this.id + '&tableName=47&kind=0&location=0',
          title : '备用金驳回操作',
          closeCallBack:(data) => {
            console.log(data)
            if(data){
              this.operateShow = false
              this.state = '2'
              this.stateShow = true
              this.category = false
            }
          }
        })
      },
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
