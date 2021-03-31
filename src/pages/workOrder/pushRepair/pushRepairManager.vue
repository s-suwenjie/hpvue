<template>
    <div>
      <yhm-managerpage category="1">
        <template #navigationTab>
          <router-link class="menuTabDiv menuTabActive" :to="{path:'/home/pushRepairManager'}">推修管理</router-link>
          <router-link class="menuTabDiv" :to="{path:'/home/pushRepairRecordManager'}">推修记录</router-link>
        </template>
        <template #operate>
          <!-- 操作区-->
          <yhm-commonbutton value="添加推修公司"  icon="btnAdd" :flicker="true" @call="add" category="one"></yhm-commonbutton>
          <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initChoose"></yhm-managersearch>
          <yhm-radiofilter style="margin-top: 6px" @initData="initChoose('dateType')" title="时间" :content="dateTypeList"></yhm-radiofilter>
        </template>
        <template #operateMore>
          <div :class="{customTimeShow:timeShow,customTimeHide:!timeShow}" >
            <yhm-form-date v-show="dateShow" title="开始时间" @call="dateSelection(startDateStr,endDateStr)" style="width: 350px;" :value="startDateStr" id="startDateStr" position="t"></yhm-form-date>
            <yhm-form-date v-show="dateShow" title="结束时间" @call="dateSelection(startDateStr,endDateStr)" style="width: 350px;margin-left: 30px;" :value="endDateStr" id="endDateStr" position="t"></yhm-form-date>
          </div>
        </template>
        <template #listHead>
          <yhm-managerth style="width: 40px;" title="选择" ></yhm-managerth>
          <yhm-managerth style="width: 40px;" title="查看" ></yhm-managerth>
          <yhm-managerth title="推修公司"></yhm-managerth>
          <yhm-managerth width="160" title="简称"></yhm-managerth>
          <!--          <yhm-managerth width="170" title="启用日期" ></yhm-managerth>-->
          <!--          <yhm-managerth width="170" title="结束日期" ></yhm-managerth>-->
          <!--          <yhm-managerth width="150" title="自保费率" ></yhm-managerth>-->
          <!--          <yhm-managerth width="150" title="非自保费率" ></yhm-managerth>-->
          <yhm-managerth width="90" title="自保费率" prompt="自保(当年在乙方承保的车辆)" after-title="?" after-size="18px" tooltip-left="-34px" after-color="#f00"></yhm-managerth>
          <yhm-managerth width="90" title="非自保费率" prompt="非自保(一年没有进场记录或当年不在乙方承保的车辆)" after-title="?" after-size="18px" tooltip-left="-112px" after-color="#f00"></yhm-managerth>

          <yhm-managerth width="100" title="结算类型" ></yhm-managerth>
          <yhm-managerth width="100" title="有效工单条目"></yhm-managerth>
          <yhm-managerth width="110" title="已产生营业额"></yhm-managerth>

          <!--          <yhm-managerth width="130" title="推修费率" ></yhm-managerth>-->
          <!--          <yhm-managerth width="220" title="开始时间"></yhm-managerth>-->
          <!--          <yhm-managerth width="220" title="结束时间"></yhm-managerth>-->
          <yhm-managerth width="110" title="预计推送费"></yhm-managerth>
          <yhm-managerth width="110" title="已结推送费"></yhm-managerth>
          <yhm-managerth width="110" title="审批中的推送费"></yhm-managerth>
          <yhm-managerth width="110" title="未结推送费"></yhm-managerth>
          <yhm-managerth width="180" title="操作"></yhm-managerth>
        </template>
        <template #listBody >
          <tr :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]" v-for="(item,index) in content" :key="index">
            <yhm-manager-td-checkbox :value="item"></yhm-manager-td-checkbox>
            <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>
            <yhm-manager-td @click="lookOverUnit(item)"  :value="item.unit"></yhm-manager-td>
            <yhm-manager-td v-if="item.unitshort==''||item.unitshort==null" value="-----"></yhm-manager-td>
            <yhm-manager-td v-else :value="item.unitshort"></yhm-manager-td>
            <!--            <yhm-manager-td-date :value="item.startDate"></yhm-manager-td-date>-->
            <!--            <yhm-manager-td-date :value="item.endDate"></yhm-manager-td-date>-->
            <yhm-manager-td-center @click="viewTheimage(item)" :value="item.selfrate==''?'-----':item.selfrate + '%'"></yhm-manager-td-center>
            <yhm-manager-td-center @click="viewTheimage(item)" :value="item.noselfrate==''?'-----':item.noselfrate + '%'"></yhm-manager-td-center>

            <yhm-manager-td-center v-if="item.type==''" value="------"></yhm-manager-td-center>
            <yhm-manager-td-psd v-else :value="item.type" :list="typeList"></yhm-manager-td-psd>
            <yhm-manager-td-center :value="item.sum" @click="settleAccounts(item)"></yhm-manager-td-center>
            <yhm-manager-td-money style="color:#fd6802" @click="settleAccounts(item)" :value="item.pendingmoney==''?'0':item.pendingmoney"></yhm-manager-td-money>

            <!--            <yhm-manager-td-center :value="item.rate+'%'"></yhm-manager-td-center>-->
            <!--            <yhm-manager-td-date :value="item.startDate"></yhm-manager-td-date>-->
            <!--            <yhm-manager-td-date :value="item.endDate"></yhm-manager-td-date>-->
            <yhm-manager-td-money @click="settleAccounts(item,'3')" style="color:#2193B0" :value="item.pending==''?'0':item.pending"></yhm-manager-td-money>
            <yhm-manager-td-money @click="settleAccounts(item,'2')" style="color:#2a599e" :value="item.pending3==''?'0':item.pending3"></yhm-manager-td-money>
            <yhm-manager-td-money @click="settleAccounts(item,'1')" style="color:#49a9ea" :value="item.pending4==''?'0':item.pending4"></yhm-manager-td-money>
            <yhm-manager-td-money @click="settleAccounts(item)" style="color:#f00" :value="item.pending2==''?'0':item.pending2"></yhm-manager-td-money>
            <yhm-manager-td-operate>
              <yhm-manager-td-operate-button @click="listView(item)" value="编辑" icon="i-btn-applicationSm" color="#be08e3"></yhm-manager-td-operate-button>
              <yhm-manager-td-operate-button @click="settleAccounts(item)" value="结账" icon="i-btn-applicationSm" color="#49a9ea"></yhm-manager-td-operate-button>
            </yhm-manager-td-operate>
          </tr>
        </template>
        <!--数据空提示-->
        <template #empty>
          <span class="m_listNoData" v-show="empty">暂时没有数据</span>
        </template>
        <template #total>
          <div class="listTotalCrente m_list" style="width: 720px;margin: auto;">
            <table width="100%" cellpadding="0" cellspacing="0" class="m_content_table m_content_total_table">
              <thead>
              <tr>
                <yhm-managerth style="width: 120px;" before-color="#000" title="" before-title="有效工单条目" ></yhm-managerth>
                <yhm-managerth style="width: 120px;" before-color="#fd6802" title="" before-title="已产生营业额"></yhm-managerth>
                <yhm-managerth style="width: 120px;" before-color="#2193B0" title="" before-title="预计推送费"></yhm-managerth>
                <yhm-managerth style="width: 120px;" before-color="#2a599e" title="" before-title="已结推送费"></yhm-managerth>
                <yhm-managerth style="width: 120px;" before-color="#49a9ea" title="" before-title="审批中的推送费"></yhm-managerth>
                <yhm-managerth style="width: 120px;" before-color="#f00" title="" before-title="未结推送费"></yhm-managerth>
              </tr>
              </thead>
              <tbody>
              <tr>
                <yhm-manager-td-rgt style="color: #000;" :value="sum+''"></yhm-manager-td-rgt>
                <yhm-manager-td-money style="color: #fd6802;" :value="sumpendingmoney"></yhm-manager-td-money>
                <yhm-manager-td-money style="color: #2193B0;" :value="sumpending"></yhm-manager-td-money>
                <yhm-manager-td-money style="color: #2a599e;" :value="sumpending2"></yhm-manager-td-money>
                <yhm-manager-td-money style="color: #49a9ea;" :value="sumpending4"></yhm-manager-td-money>
                <yhm-manager-td-money style="color: #f00;" :value="sumpending3"></yhm-manager-td-money>
              </tr>
              </tbody>
            </table>
          </div>
        </template>
        <!--分页控件-->
        <template #pager>
          <yhm-pagination :pager="pager" @initData="initPageData(false)"></yhm-pagination>
        </template>
      </yhm-managerpage>
<!--      <div class="invoiceImgView" :class="{'invoiceImgView2':viewImgShow2}" v-show="viewImgShow">-->
<!--        <img :src="viewImg" alt="">-->
<!--      </div>-->
    </div>
</template>

<script>
  import {managermixin} from '@/assets/manager.js'
  export default {
    name: 'pushRepairManager',
    mixins: [managermixin],
    data(){
      return{
        // viewImg:'',
        // viewImgShow:false,
        // viewImgShow2:false,
        typeList:[],//有效日期
        startDateStr:'',//开始时间
        endDateStr:'',//结束时间
        timeShow:false,//自定义时间选择 显示隐藏
        dateShow:false,//时间组件 显示隐藏
        dateTypeList:{
          value: '', //默认为空
          list: [
            {showName:"本日", num: "0", code: "", img: ""},
            {showName:"昨日", num: "1", code: "", img: ""},
            {showName:"本周", num: "2", code: "", img: ""},
            {showName:"上周", num: "3", code: "", img: ""},
            {showName:"本月", num: "4", code: "", img: ""},
            {showName:"上月", num: "5", code: "", img: ""},
            {showName:"本季度", num: "6", code: "", img: ""},
            {showName:"上季度", num: "7", code: "", img: ""},
            {showName:"本年", num: "8", code: "", img: ""},
            // {showName:"上年", num: "9", code: "", img: ""},
            {showName:"选择时间", num: "9", code: "", img: ""},
          ]
        },
        dateType:'',
        sum:"0",
        sumexpend:"0",
        sumpending:"0",
        sumpending2:'0',
        sumpending3:'0',
        sumpending4:'0',
        sumpendingmoney:"0"
      }
    },
    methods:{
      add(){
        this.$dialog.OpenWindow({
          width: 1050,
          height: 720,
          url:'/pushRepairForm?isAdd=1',
          title:'添加推修公司',
          closeCallBack:(data)=>{
            this.initPageData()
          }
        })
      },
      dateSelection(start,finish){//选择时间段
        if(start!=''&&finish!=''){
          this.initPageData(false)
        }
      },
      viewTheimage(item){
        window.open('/UploadFile/'+ item.photoList[0].tag +'/' + item.photoList[0].storeName)
      },
      //显示发票图片
      invoiceImg(item,type){
        // if(type=='2'){
        //   this.viewImgShow2 = true
        // }else{
        //   this.viewImgShow2 = false
        // }
        // if(item.photoList.length >= '1') {
        //   if(/\.(gif|jpg|jpeg|png|GIF|JPG|PNG|svg)$/.test(item.photoList[0].storeName)){
        //     this.viewImgShow = true
        //     this.viewImg =  '/UploadFile/'+ item.photoList[0].tag +'/' + item.photoList[0].storeName
        //   }
        // }
      },
      //隐藏发票图片
      invoiceImgHide(item){
        if(item.photoList.length >= '1') {
          this.viewImgShow = false
        }
      },
      // 筛选事件
      initChoose (op) {
        this.pager.pageIndex = 1
        if(op === 'dateType'&&this.dateTypeList.value!=9){
          this.startDateStr=''//开始时间
          this.endDateStr=''//结束时间
        }
        if (this.dateTypeList.value==9&&op === 'dateType'){
          this.timeShow = true
          setTimeout(()=>{
            this.dateShow = true
          },300)
          return
        }else{
          if (op === 'dateType') {
            this.workDateMenu = ['筛选当前日期']
            this.timeShow = false
            setTimeout(()=>{
              this.dateShow = false
            },300)
            this.selectValue = []
          }
        }
        this.initPageData(false)
      },
      lookOverUnit(item){
        if(item.unitID!=''){
          this.$dialog.OpenWindow({
            width: '1070',
            height: '750',
            url:'/unitView?id='+item.unitID,
            title:'查看公司信息',
            closeCallBack:(data) =>{
              this.initPageData(false)
            }
          })
        }

      },
      settleAccounts(item,type){
        let url = '/settleAccountsForm?id=' + item.unitID
        let title = '结账信息'
        if(type=='1'||type=='2'||type=='3'){
          url = '/settleAccountsForm?paymentType='+type+'&id=' + item.unitID
          title = '付款明细'
        }
        this.$dialog.OpenWindow({
          width: 1050,
          height: 720,
          url:url,
          title:title,
          closeCallBack:(data) =>{
            // if (data) {
            this.initPageData(false)
            // }
          }
        })
      },
      listView(item){
        this.$dialog.OpenWindow({
          width: 1050,
          height: 720,
          url:'/pushRepairForm?id=' + item.id,
          title:'查看推修公司信息',
          closeCallBack:(data) =>{
            // if (data) {
              this.initPageData(false)
            // }
          }
        })
      },
      initPageData (initValue) {
        let params = {}
        if (initValue) {
          // 页面初始化是需要的参数
          params = {
            init:true,
            stateStr:100,
          }
        } else {
          // 页面非初始化时需要的参数
          params = {
            stateStr:100,
            dateType:this.dateTypeList.value=='9'?'':this.dateTypeList.value,
            startDateStr:this.startDateStr,//开始时间
            endDateStr:this.endDateStr,//结束时间
          }
        }
        this.init({
          initValue: initValue,
          url:'/fix/fixCompany/getManager',
          data: params,
          all: (data) => {
            // 不管是不是初始化都需要执行的代码
            this.content = data.content
            this.sum = data.sum
            this.sumexpend = data.sumexpend
            this.sumpending = data.sumpending
            this.sumpending2 = data.sumpending2
            this.sumpending3 = data.sumpending3
            this.sumpending4 = data.sumpending4
            this.sumpendingmoney = data.sumpendingmoney
          },
          init: (data) => {
            this.typeList = data.typePsd.list
          }
        })
      }
    }
  }
</script>

<style scoped>
  .invoiceImgView {
    width: 592px;
    height: 550px;
    display: block;
    position: fixed;
    z-index: 999;
    top: 0;
    right: 0;
    bottom: 0;
    left: -420px;
    margin: auto;
    box-shadow: 0 0 15px #333;
    border-radius: 8px;
    text-align: center;
    background-color: #fff;
    /*overflow: hidden;*/
  }
  .invoiceImgView2{
    left: -600px;
  }
</style>
