<template>
  <div class="app_main">
    <yhm-app-structure-top-tap>
      <yhm-app-structure-top-tap-menu @call="backEvent" title="返回"></yhm-app-structure-top-tap-menu>
      <yhm-app-structure-top-tap-menu :select="true" title="查看付款信息"></yhm-app-structure-top-tap-menu>
    </yhm-app-structure-top-tap>

    <yhm-app-scroll :empty="false" :init-load-finish="loadFinish">
      <yhm-app-structure-menu-group title="基本信息">
        <yhm-app-view-control title="收款方" :content="otherUnit"></yhm-app-view-control>
        <yhm-app-view-control title="付款金额" :content="planMoney" type="money" color="#4BB414"></yhm-app-view-control>
        <yhm-app-approval-result v-show="!getShowOperate" :category="getState" :left="3.5" :top="0.5"></yhm-app-approval-result>
      </yhm-app-structure-menu-group>
      <yhm-app-structure-menu-group title="事件信息" v-for="(item,index) in details" :key="index" @click="toggle(index)" :index="index" :length="details.length">
          <yhm-app-view-control title="事件描述" :content="item.name"></yhm-app-view-control>
          <yhm-app-view-control title="品牌" :content="item.branch" :psd="item.brandPsd.list"></yhm-app-view-control>
          <yhm-app-view-control title="事件类型" :content="item.cause" class="eventType"></yhm-app-view-control>
          <yhm-app-view-control title="最迟付款日期" :content="item.lastDate" type="date"></yhm-app-view-control>
          <yhm-app-view-control title="付款金额" :content="item.money" type="money" color="#f00"></yhm-app-view-control>
          <yhm-app-view-control title="编号" :content="item.code"></yhm-app-view-control>
          <yhm-app-view-control title="生成申请" :content="item.isAuto" :psd="item.isAutoPsd.list"></yhm-app-view-control>
          <p class="app_files" style=" word-wrap: break-word;word-break: normal;">文件:
            <span v-for="(items,index) in item.files" :key="index" class="imgName" @click="imgSkip(items)">{{items.showName}}</span>
          </p>
        <yhm-app-structure-group-operate  :class="'paumentPlan'+index" v-show="details.length==1?false:true">
            <yhm-app-button @call="rejectEvent(1,item.id,index)"  v-if="getShowOperate" value="驳回" category="ten"></yhm-app-button>
            <yhm-app-button @call="adoptEvent(1,item.id,index)"  v-if="getShowOperate" value="通过" category="two"></yhm-app-button>
          </yhm-app-structure-group-operate>
      </yhm-app-structure-menu-group>
    </yhm-app-scroll>

    <yhm-app-form-operate v-if="getShowOperate">
      <yhm-app-button @call="rejectEvent(0)" value="驳回" category="ten"></yhm-app-button>
      <yhm-app-button @call="adoptEvent(0)" value="通过" category="two"></yhm-app-button>
    </yhm-app-form-operate>

  </div>
</template>

<script>
  import { appviewmixin } from '@/assetsApp/app_view.js'
  import { ImagePreview } from 'vant';

  export default {
    name: 'm_myPaymentPlanView',
    mixins: [appviewmixin],
    data(){
      return{
        otherUnit:'',
        planMoney:'',
        category:'',     //流程类型
        isFinishBack:'1',
        person:'',
        code:'',
        workDate:'',    //申请日期
        state: '',
        // brandList:[],
        details:[],
        isFinish:'0',
        rejectDetail:'',
        files:[],
      }
    },
    methods: {
      imgSkip(item){
        let img = /UploadFile/+ item.tag+'/'+ item.storeName
        if(item.image==='1'){
          ImagePreview([img]);
        }else if(item.image==='0'){
          window.open(img)
        }
      },
      toggle(index){
        if($(".structure_main_content").eq(index+1).is(":hidden")){//判断是否隐藏去除隐藏后重叠的底部边框
          $('.structure_main_title').eq(index+1).css({'border-bottom':'0.02666667rem solid #bfbfbf'})
        }else{
          $('.structure_main_title').eq(index+1).css({'border-bottom':'0'})}
        this.$nextTick(() => {
          $(".structure_main_content").eq(index+1).toggle(400,);
          setTimeout(()=>{
            this.loadFinish =!this.loadFinish
          },400)
        })
      },
      /* 返回 */
      backEvent(){
        this.$router.push("/homeApp/m_myPaymentPlanManager?isFinish=" + this.isFinishBack)
      },

      /* 驳回 */
      rejectEvent(type,id){
        let kind = ''
        let ID = ''
        let location = ''
        if(type===1){//单个提交
          ID = id
          kind = '2'
          location='1'
        }else{//全部提交
          ID = this.id
          kind = '1'
          location='0'
        }
        this.$appDialog.openWindow({
          url:'/homeApp/m_rejectForm?category=12' +'&id=' + ID + '&tableName=43&tableDetailName=44&kind='+kind+'&location='+location,
          title : '付款申请驳回操作',
          closeCallBack:(data) => {
            if(data){
              this.isFinish = '1'
              this.state = 2
              this.rejectDetail = data
            }
          }
        })
      },
      /* 通过 */
      adoptEvent(type,id,index){
        this.$appDialog.confirm({
          tipValue: '是否通过?',
          okCallBack: (data) => {
            let kind = ''
            let ID = ''
            let location = '0'
            if(type===1){//单个提交
              ID = id
              kind = '2'
              location = '1'
            }else{//全部提交
              ID = this.id
              kind = '1'
              location = '0'
            }
            let params = {
              id: ID,
              kind: kind,
              tableName: '43',
              tableDetailName: '44',
              location:location,
            }
            this.ajaxJson({
              url: '/PersonOffice/m_approvalYesVue',
              data: params,
              loading:"0",
              call: (data)=>{
                if(data.type === 0){
                  if(type==1){
                    this.$appDialog.toast({
                      tipValue: data.message,
                      closeCallBack: () => {
                      }
                    })
                    $(".paumentPlan"+index).css("display","none");
                  }else{
                    this.$appDialog.toast({
                      tipValue: data.message,
                      closeCallBack: () => {
                        ////结束刷新页面
                        this.isFinish = '1'
                        this.state = -1
                      }
                    })
                  }
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
                      $(".paumentPlan"+index).css("display","none");
                    }
                  })
                }
              }
            })
          }
        })
      },
    },
    created () {
      this.setQuery2Value('isFinishBack')
      document.querySelector('body').setAttribute('style', 'margin: 0 auto; width: 100%; background:#f3f3f3; overflow-x: hidden;height: 100%;');
      this.setQuery2Value('isApproval')
      this.isFinish = this.isApproval
      this.init({
        url: '/PersonOffice/m_getApprovalPaymentPlanById',
        call:(data)=> {
          this.content = data
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
      getShowOperate(){
        return this.isFinish === '0'
      },
      getState(){
        return this.state % 2 === 1 || this.state === -1
      }
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
