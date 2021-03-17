<template>
    <div>
      <yhm-managerpage category="1">
        <!--操作区-->
<!--        <template #navigation>售后业务&gt;&nbsp;工单&nbsp;&gt;&nbsp;工单收银</template>-->
        <template #navigationTab>
          <router-link class="menuTabDiv" v-for="(item,index) in details" :key="index" :class="{menuTabActive:menuTabOn == index}" :to="{path:item.path}" @click="menuTab(index)">
            {{item.name}}
          </router-link>
        </template>
        <!--筛选区-->
        <template #operate>
          <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initPageData"></yhm-managersearch>
          <yhm-radiofilter  @initData="initChoose('reverFlag')" title="状态" :content="reverFlagList"></yhm-radiofilter>
          <yhm-radiofilter @initData="initChoose('dateType')" title="时间" :content="dateTypeList"></yhm-radiofilter>
          <div :class="{customTimeShow:timeShow,customTimeHide:!timeShow}" style="margin-top: 14px;">
            <yhm-form-date v-show="dateShow" title="开始时间" @call="dateSelection(startDateStr,endDateStr)" style="width: 350px;" :value="startDateStr" id="startDateStr" position="t"></yhm-form-date>
            <yhm-form-date v-show="dateShow" title="结束时间" @call="dateSelection(startDateStr,endDateStr)" style="width: 350px;margin-left: 30px;" :value="endDateStr" id="endDateStr" position="t"></yhm-form-date>
          </div>
        </template>
        <!--数据表头-->
        <template #listHead>
          <yhm-managerth style="width: 40px;" title="选择"></yhm-managerth>
          <yhm-managerth style="width: 40px;" title="查看"></yhm-managerth>
          <yhm-managerth width="80" title="接待日期"></yhm-managerth>
          <yhm-managerth width="180" title="OA项目号"></yhm-managerth>
          <yhm-managerth width="180" title="传奇及DMS工单号"></yhm-managerth>
          <yhm-managerth width="110" title="车牌号"></yhm-managerth>
          <yhm-managerth width="100" title="品牌"></yhm-managerth>
          <yhm-managerth width="140" title="车主"></yhm-managerth>
          <yhm-managerth width="140" title="联系人"></yhm-managerth>
          <yhm-managerth width="80" title="收支方向"></yhm-managerth>
          <yhm-managerth width="120" title="合计金额" subtitle="(未收金额+已收金额)"></yhm-managerth>
          <yhm-managerth width="100" title="未收金额"></yhm-managerth>
          <yhm-managerth width="100" title="已收金额"></yhm-managerth>
          <yhm-managerth width="170" title="操作"></yhm-managerth>
        </template>

        <!--数据明细-->
        <template #listBody>
          <tr :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]" v-for="(item,index) in content" :key="index">
            <yhm-manager-td-checkbox :value="item"></yhm-manager-td-checkbox>
            <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>
            <yhm-manager-td-center title="右键可筛选" :value="item.workDate.slice(0,10)" :menu-list="workDateMenu.indexOf('取消当前筛选')!='-1'?['取消当前筛选']:['筛选当前日期']" @rightClick="workOrderItem = item" @menuClick="workDateMenuClick"></yhm-manager-td-center>
            <yhm-manager-td-center :value="item.code" @click="listView(item)"></yhm-manager-td-center>
            <yhm-manager-td-center :value="item.otherCode" ></yhm-manager-td-center>
            <yhm-manager-td type="vehicle" :value="item.vehicle" @click="lookOverVehicle(item)"></yhm-manager-td>
            <yhm-manager-td-psd   :value="item.applicableModels" :list="applicableModelsList"></yhm-manager-td-psd>
            <yhm-manager-td :tip="true" :value="item.carOwner"  @click="lookOverCarOwner(item)"></yhm-manager-td>
            <yhm-manager-td :tip="true" :value="item.contactPerson" @click="lookOverPerson(item)"></yhm-manager-td>
            <yhm-manager-td-direction  class="dfJcc" :direction="item.type" :value="item.type" :dir-val="false"></yhm-manager-td-direction>
            <yhm-manager-td-money style="color: #49a9ea" :value="item.expend"></yhm-manager-td-money>
            <yhm-manager-td-money style="color:#f00" @click="gathering(item)" :value="item.remreceivedMoney==null?'0':item.remreceivedMoney"></yhm-manager-td-money>
            <yhm-manager-td-money style="color:#00b300" :value="item.receivedMoney==null?'0':item.receivedMoney"></yhm-manager-td-money>
            <yhm-manager-td-operate>
              <yhm-manager-td-operate-button v-show="Number(item.remreceivedMoney)>0&&item.remreceivedMoney!=null?true:false" @click="gathering(item)" :value="'收款'" icon="i-btn-grant" color="#be08e3"></yhm-manager-td-operate-button>
<!--              <yhm-manager-td-operate-button  @click="approFund(item)" :value="'返利(客户)'" icon="i-btn-grant" color="#be08e3"></yhm-manager-td-operate-button>-->
            </yhm-manager-td-operate>
          </tr>
        </template>

        <!--数据空提示-->
        <template #empty>
          <span class="m_listNoData" v-show="empty">暂时没有数据</span>
        </template>
        <!--分页控件-->
        <template #pager>
          <yhm-pagination :pager="pager" @initData="initPageData(false)"></yhm-pagination>
        </template>
      </yhm-managerpage>
    </div>
</template>

<script>
  import { managermixin } from '@/assets/manager.js'
  export default {
    name: 'workOrderCashierDeskManager',
    mixins: [managermixin],
    data(){
      return{
        workDateMenu:[],
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

        direction:[
          {
            showName:''
          }
        ],
        columnShow:[true,true,true,true],
        subjectList:[],
        reverFlagList:{
          list:[
            {
              num:'0',
              img:'',
              code:'#36b152',
              showName:'已完成'
            },
            {
              num:'1',
              img:'',
              code:'#49a9ea',
              showName:'进行中'
            }
          ],
          value:'1'
        },
        menuTabOn:0,
        details:[
          {id:'1', name: '工单收银',path:'/home/workOrderCashierDeskManager'},
          {id:'2', name: '保险收银',path:'/home/cashierManager'},
          {id:'3', name: '核销优惠券',path:'/home/workOrderCancellationCouponManager'},
          {id:'4', name: '退保收银',path:'/home/surrenderCashierManager'},
        ],
        applicableModelsPsd:{},//筛选 品牌
      }
    },
    methods:{
      listView(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '690',
          title: '查看工单信息',
          url:'/workOrderView?id='+item.orderid,
          closeCallBack: (data)=>{
            this.initPageData(false)
          }
        })
      },
      lookOverCarOwner(item){//查看车主
        if(item.carOwnerID!=''&&item.unitType=='1'){
          this.$dialog.OpenWindow({
            width: '1070',
            height: '750',
            url:'/personView?id='+item.carOwnerID,
            title:'查看车主信息',
            closeCallBack:(data) =>{
              this.initPageData(false)
            }
          })
        }else{
          this.$dialog.OpenWindow({
            width: '1070',
            height: '750',
            url:'/unitView?id='+item.carOwnerID,
            title:'查看车主信息',
            closeCallBack:(data) =>{
              this.initPageData(false)
            }
          })
        }
      },
      lookOverPerson(item){//查看联系人信息
        if(item.contactPersonID!=''){
          this.$dialog.OpenWindow({
            width: '1070',
            height: '750',
            url:'/personView?id='+item.contactPersonID,
            title:'查看联系人信息',
            closeCallBack:(data) =>{
              this.initPageData(false)
            }
          })
        }
      },
      lookOverVehicle(item){//查看车辆信息
        if(item.vehicleID!=''){
          this.$dialog.OpenWindow({
            width: '1070',
            height: '750',
            url:'/vehicleView?id='+item.vehicleID,
            title:'查看车辆信息',
            closeCallBack:(data) =>{
              this.initPageData(false)
            }
          })
        }
      },
      workDateMenuClick(title,index){
        if(title=='筛选当前日期'){
          this.startDateStr = this.workOrderItem.workDate.slice(0,10)
          this.endDateStr = this.workOrderItem.workDate.slice(0,10)
          this.dateTypeList.value = '9'
          this.workDateMenu = ['取消当前筛选']
          this.initChoose('dateType')
        }else if(title=='取消当前筛选'){
          this.startDateStr = ''
          this.endDateStr = ''
          this.dateTypeList.value = ''
          this.workDateMenu = ['筛选当前日期']
          this.initChoose('dateType')
          return
        }
        setTimeout(()=>{
          this.initPageData(false)
        },0)
      },
      // 筛选事件
      initChoose (op) {
        this.pager.pageIndex = 1
        if(op === 'dateType'&&this.dateTypeList.value!=9){
          this.startDateStr=''//开始时间
          this.endDateStr=''//结束时间
        }
        if (this.dateTypeList.value==9&&op=='dateType'){
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
      dateSelection(start,finish){//选择时间段
        if(start!=''&&finish!=''){
          this.initPageData(false)
        }
      },
      gathering(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '690',
          title: '收款(客户)',
          url: '/workOrderCashierDeskForm?money='+item.remreceivedMoney+'&brandVal='+item.brandVal
            +'&moneyMax='+item.remreceivedMoney+'&workOrderID='+item.orderid+'&unitOrPerson='+item.unitType
            +'&workOrder='+item.code+'&vehicleBrandID='+item.brand+'&customer='+item.carOwner+'&customerName='+item.carOwnerID
            +'&licensePlateNumber='+item.vehicle+'&operator='+item.client+'&operatorID='+item.clientID
            +'&vehicleType='+item.modelVal+'&vehicleTypeID='+item.modelID+'&vehicleBrand='+item.brandVal
          ,
          closeCallBack: (data)=>{
            this.initPageData(false)
          }
        })
      },
      initPageData (initValue) {
        let params = {}

        if (initValue) {
          params = {
            reverFlag:this.reverFlagList.value,//去除未开金额为0的数据
            stateStr:'0'//去除待确认的工单数据
          }
        } else {
          params = {
            // applicableModels:this.applicableModelsPsd.value,
            startDateStr:this.startDateStr,//开始时间
            endDateStr:this.endDateStr,//结束时间
            dateType:this.dateTypeList.value=='9'?'':this.dateTypeList.value,
            reverFlag:this.reverFlagList.value,//去除未开金额为0的数据
            stateStr:'0'//去除待确认的工单数据
          }

        }
        this.init({
          initValue:initValue,
          url: '/fix/fixregister/getManager',
          data:params,
          all:(data) =>{
            //不管是不是初始化都需要执行的代码
            // this.applicableModelsPsd = data.applicableModelsPsd


          },
          init:(data)=>{
            //初始化时需要执行的代码
            this.applicableModelsList = data.applicableModelsPsd.list

            this.subjectList = data.returnPsd
            sessionStorage.workOrderCashierDesk = JSON.stringify(this.subjectList)

          }
        })
      }
    }

  }
</script>

<style scoped>
  .customTimeShow{
    width: 100%;
    height: 50px;
    position: relative;
    z-index: 2;
    display: flex;
    transition: all 0.5s;
  }
  .customTimeHide{
    width: 100%;
    height: 0px;
    display: flex;
    transition: all 0.5s;
  }
</style>
