<template>
  <div class="app_main">
    <yhm-app-structure-top-tap>
      <yhm-app-structure-top-tap-menu @call="backEvent" title="返回"></yhm-app-structure-top-tap-menu>
      <yhm-app-structure-top-tap-menu :select="true" title="查看保单详情"></yhm-app-structure-top-tap-menu>
    </yhm-app-structure-top-tap>

    <div style="overflow: auto;">
      <yhm-app-structure-menu-group title="基本信息">
        <yhm-app-view-control title="投保人" :content="insuredName"  color="#4BB414"></yhm-app-view-control>
        <yhm-app-view-control title="被保险人" :content="beinsuredName"  color="#4BB414"></yhm-app-view-control>
        <yhm-app-view-control title="联系人" :content="contactName + '-' + contactPhone"></yhm-app-view-control>

        <yhm-app-view-control title="车牌号" :content="plate"></yhm-app-view-control>
        <yhm-app-view-control title="投保日期" :content="insuredDate"  type="date"></yhm-app-view-control>
        <yhm-app-view-control title="与车主关系" :content="relationshipVal"></yhm-app-view-control>
        <yhm-app-view-control title="投保类型" :content="insuredTypeVal"></yhm-app-view-control>
        <yhm-app-view-control title="投保渠道" :content="insuredChannelVal"></yhm-app-view-control>
        <yhm-app-view-control title="投保项目" :content="insuredProjectVal"></yhm-app-view-control>
        <yhm-app-approval-result v-show="getIsFinish" :category="down==0?true:false" :left="3.5" :top="0.5"></yhm-app-approval-result>

      </yhm-app-structure-menu-group>
      <yhm-app-structure-menu-group title="保险信息">
        <yhm-app-view-control title="交强险开始日"  v-if="isforceStart" :content="forceStartDate" type="date"></yhm-app-view-control>
        <yhm-app-view-control title="交强险到期日"  v-if="isforceStart"  :content="forceEndDate" type="date"></yhm-app-view-control>
        <yhm-app-view-control title="交强险金额"  v-if="isforceStart" :content="forceMoney" type="money"></yhm-app-view-control>
        <yhm-app-view-control title="车船税金额"  v-if="isvehicle"   :content="vehicleMoney" type="money"></yhm-app-view-control>

        <yhm-app-view-control title="商业保险开始日" v-if="isbusinessStart" style="white-space: nowrap;" :content="businessStartDate" type="date"></yhm-app-view-control>
        <yhm-app-view-control title="商业保险结束日" v-if="isbusinessStart" :content="businessEndDate" type="date"></yhm-app-view-control>
        <yhm-app-view-control title="商业险种" v-if="isbusinessStart" :content="commercialVal"></yhm-app-view-control>
        <yhm-app-view-control title="投保公司" :content="insuredUnitVal"></yhm-app-view-control>
        <yhm-app-view-control title="商业险实际金额" v-if="isbusinessStart" :content="businessMoney" type="money"></yhm-app-view-control>
        <yhm-app-view-control title="开票金额" :content="invoicingMoney" type="money"></yhm-app-view-control>
        <yhm-app-view-control title="保费合计" :content="premiumsTotal" type="money"></yhm-app-view-control>
        <yhm-app-view-control title="优惠金额/点数" v-if="isbusinessStart"  color="#f00" :content="discountMoney + ' ' + '/' + ' ' + discountCount + '%'"></yhm-app-view-control>
        <yhm-app-view-control title="实收金额" :content="receivedMoney" type="money"></yhm-app-view-control>
        <yhm-app-view-control title="是否返利" :content="cashVal"></yhm-app-view-control>
        <yhm-app-view-control title="返利对象" v-show="isCash" :content="cashObjectVal"></yhm-app-view-control>

        <yhm-app-view-control title="返利对象姓名" v-show="isCash" v-if="cashObject==0" :content="beinsuredName"></yhm-app-view-control>
        <yhm-app-view-control title="返利对象姓名" v-show="isCash" v-else-if="cashObject==1" :content="contactName"></yhm-app-view-control>
        <yhm-app-view-control title="返利对象姓名" v-show="isCash" v-else-if="cashObject==2" :content="insuredName"></yhm-app-view-control>
        <yhm-app-view-control title="返利对象姓名" v-show="isCash" v-else-if="cashObject==3" :content="insuredName"></yhm-app-view-control>

        <yhm-app-view-child title="赠送信息">
          <yhm-app-view-control  :content="item.remark" v-for="(item,index) in discountList" :key="index"></yhm-app-view-control>
        </yhm-app-view-child>
      </yhm-app-structure-menu-group>

    </div>
    <yhm-app-form-operate v-if="getShowOperate" v-show="operateShow">
      <yhm-app-button @call="rejectEvent" value="驳回" category="ten"></yhm-app-button>
      <yhm-app-button @call="adoptEvent" value="通过" category="two"></yhm-app-button>
    </yhm-app-form-operate>
    <appToast type="loading" v-show="!appToastShow" @login-success="appToastShow = $event"></appToast>

  </div>
</template>

<script>
  import { appviewmixin } from '@/assetsApp/app_view.js'
  import { ImagePreview } from 'vant';
  import appToast from '@/pagesApp/common/appToast'

  export default {
    name: 'm_interestRateView',
    mixins: [appviewmixin],
    components:{
      appToast
    },
    data(){
      return{
        isbusinessStart:true,//商业险相关标签
        isforceStart:true,//交强险相关标签
        isvehicle:true,//车船税相关标签
        operateShow:true,
        appToastShow:false,
        id:'',
        down:'',
        cashObject:'',//返利对象状态
        isCash:true,//是否返利
        cash:'',
        forceStartDate:'',//交强险开始日
        forceEndDate:'',//交强险到期日
        forceMoney:'',//交强险金额
        vehicleMoney:'',//车船税金额
        businessStartDate:'',//商业险开始日
        businessEndDate:'',//商业保险结束日期
        commercialVal:'',//商业险种

        submit:'',//完成状态
        insuredProject:[],//投保项目数组
        insuredName:'',//投保人姓名
        beinsuredName:'',//被保险人姓名
        insuredDate:'',//商业险开始日
        insuredUnitVal:'',//投保公司
        cashObjectVal:'',//返利对象
        relationshipVal:'',//与车主关系
        plate:'',//车牌号
        contactName: "",//联系人姓名
        contactPhone: "",//联系人电话
        insuredUnitShowName:'',//投保公司
        discountCount:'',//优惠点数
        discountMoney:'',//优惠金额
        insuredChannelVal:'',//投保渠道
        insuredTypeVal:'',//投保类型
        directionVal:'',//收支类型
        insuredProjectVal:'',//投保项目
        money:'',//金额
        bankMoney:'',//剩余金额
        receivedMoney:'',//实收金额
        businessMoney:'',//商业险实际金额
        invoicingMoney:'',//开票金额
        cashVal:'',//是否返利
        premiumsTotal:'',//保费合计
        isApproval:'0',
        insuredUnitList:[],//保险公司筛选值
        deatails:[],
        state:'0',//审批状态
        isFinishBack:'1',
        isFinish:'0',
        rejectDetail:'',
        content:[],
        discountList:[],//赠送信息
      }
    },
    methods: {
      //驳回事件
      rejectEvent(){
        this.$appDialog.openWindow({
          url:'/homeApp/m_rejectForm?category=00' +'&id=' + this.id,
          title : '保单驳回操作',
          closeCallBack:(data) => {

            if(data){
              this.down = -1
              this.operateShow = false
            }

          }
        })
      },
      adoptEvent(){//通过
        this.$appDialog.confirm({
          tipValue: '是否通过?',
          okCallBack: (data) => {
            let params = {
              id: this.id,
            }
            this.ajaxJson({
              url: '/Insurance/m_modifyStateInsuranceApp',
              data: params,
              loading:"0",
              call: (data)=>{
                this.down = 0
                this.operateShow = false
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
        // this.$router.go(-1)
        this.$router.push("/homeApp/m_interestRateManager?isFinish=" + this.isFinishBack)
      },
    },
    created () {
      this.setQuery2Value('isFinishBack')
      this.setQuery2Value('isApproval')
      this.setQuery2Value('down')
      this.init({
        url: '/Insurance/m_initBillingForm',
        call:(data)=> {
          this.appToastShow = true
          this.content = data.content
          this.id = data.id
          this.insuredName=data.insuredName //投保人姓名
          this.beinsuredName = data.beinsuredName,//被保险人姓名
          this.insuredDate = data.insuredDate,//投保日期
          this.cashObjectVal = data.cashObjectVal,//返利对象
          this.forceStartDate = data.forceStartDate,//交强险开始日期
          this.forceEndDate = data.forceEndDate,//交强险到期日
          this.forceMoney = data.forceMoney,//交强险金额
          this.vehicleMoney = data.vehicleMoney,//车船税金额
          this.commercialVal = data.commercialVal,//商业险种
          this.businessStartDate = data.businessStartDate,//商业险开始日期
          this.businessEndDate = data.businessEndDate,//商业保险结束日期
          this.relationshipVal = data.relationshipVal,//与车主关系
          this.plate = data.plate,//车牌号
          this.contactName = data.contactName,//联系人姓名
          this.contactPhone = data.contactPhone,//联系人电话
          this.insuredUnitShowName = data.insuredUnitShowName,//投保公司
          this.discountCount = data.discountCount,//优惠点数
          this.discountMoney = data.discountMoney,//优惠金额
          this.insuredChannelVal = data.insuredChannelVal,//投保渠道
          this.insuredTypeVal = data.insuredTypeVal,//投保类型
          this.directionVal = data.directionVal,//收支类型
          this.insuredProjectVal = data.insuredProjectVal,//投保项目
          this.money = data.money,//金额
          this.receivedMoney = data.receivedMoney,//实收金额
          this.insuredUnitVal= data.insuredUnitVal,//投保公司
          this.bankMoney = data.bankMoney//剩余金额
          this.premiumsTotal = data.premiumsTotal//保费合计
          this.invoicingMoney = data.invoicingMoney//开票金额
          this.cashVal = data.cashVal//是否返利
          this.discountList = data.discountList//赠送信息
          this.businessMoney = data.businessMoney
          this.submit = data.submit//完成状态
          this.cashObject = data.cashObject//返利对象状态
          this.insuredUnitList = data.insuredUnitList
          this.deatails = data.deatails
          this.cash = data.cash//是否返利
          this.insuredProject=data.insuredProjectPsd.value
          let  a=this.insuredProject
          if (a.indexOf("0") != -1){
            this.isforceStart=true
          }else {
            this.isforceStart=false
          }
          if (a.indexOf("1") != -1){
            this.isvehicle=true
          }else {
            this.isvehicle=false
          }
          if (a.indexOf("2") != -1){
            this.isbusinessStart=true
          }else {
            this.isbusinessStart=false
          }
          if (this.cash==='0'){
            this.isCash=true
          }else{
            this.isCash=false
          }
        }
      })
    },
    computed:{
      getShowOperate(){
        if(this.isFinishBack==0){
          return false
        }
        return true
      },
      getIsFinish(){
        if(this.isFinishBack==0||this.isFinishBack==1&&this.operateShow == false){
          return true
        }
        return false
      }
    }
  }
</script>

<style scoped>

</style>
