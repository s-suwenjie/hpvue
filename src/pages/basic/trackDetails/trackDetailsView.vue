<template>
  <div class="f_main">
    <yhm-view-body>
      <template #title>基本信息</template>
      <template #body>
        <yhm-view-control title="负责人" :content="principal"></yhm-view-control>
        <yhm-view-control title="客户状态" :content="state" :psd="stateList"></yhm-view-control>
        <yhm-view-control title="联系人" :content="name+'-'+phone"></yhm-view-control>
        <yhm-view-control title="车牌号" :content="plate"></yhm-view-control>
        <yhm-view-control title="车主" :content="carOwner"></yhm-view-control>
        <yhm-view-control title="身份证号" :content="idNo"></yhm-view-control>
        <yhm-view-control title="行车证信息"  category="3" type="smfiles"  :content="drivingLicense"></yhm-view-control>
        <yhm-view-control title="车架号" :content="frameNumber"></yhm-view-control>
        <yhm-view-control title="登记日期" :content="registerDate"></yhm-view-control>
        <yhm-view-control title="发动机号" :content="engineNumber" ></yhm-view-control>
      </template>
    </yhm-view-body>

    <div class="f_split"></div>
    <div class="v_relative">
      <yhm-table-tip node-class-name="v_relative" :show="tableTip" :content="tableTipInfo" :column="tableTipColumnInfo" :mouse-control="tableTipControl"></yhm-table-tip>

      <yhm-view-tab>
      <template #tab>
        <yhm-view-tab-button :list="tabState" :index="1" @click="listDetail(true)">跟踪信息</yhm-view-tab-button>
        <yhm-view-tab-button :list="tabState" :index="0">保险信息</yhm-view-tab-button>

      </template>
      <template #content>
        <yhm-view-tab-content v-show="tabState[0].select">
          <yhm-view-control title="往年投保公司" category="3" :content="lastYearUnit" :psd="lastYearUnitList"></yhm-view-control>
          <yhm-view-control title="交强险到期日" :content="forceEndDate"></yhm-view-control>
          <yhm-view-control title="剩余时间" category="2" :content="forceDay+' 天'"></yhm-view-control>
          <yhm-view-control title="商业险到期日" :content="businessEndDate" ></yhm-view-control>
          <yhm-view-control title="剩余时间" category="2" :content="businessDay+' 天'"></yhm-view-control>
        </yhm-view-tab-content>
        <yhm-view-tab-list :customize="true" :pager="true" v-show="tabState[1].select">
          <template #listHead>

            <yhm-managerth style="width:40px" title="查看" ></yhm-managerth>
            <yhm-managerth  title="跟踪时间"></yhm-managerth>
            <yhm-managerth  title="跟踪状态" ></yhm-managerth>
            <yhm-managerth  title="购买意向"></yhm-managerth>

            <yhm-managerth  title="过程记录"></yhm-managerth>
            <yhm-managerth  title="跟踪人员"></yhm-managerth>
            <yhm-managerth  title="下次跟踪日期"></yhm-managerth>
            <yhm-managerth  title="预计到店日期"></yhm-managerth>

          </template>
          <template #listBody>
            <tr v-for="(item,index) in details" :key="index" :class="{InterlacBg:index%2!==0}">
              <yhm-manager-td-look @click="listView(item.id)"></yhm-manager-td-look>
              <yhm-manager-td :value="item.currentDate" ></yhm-manager-td>
              <yhm-manager-td  :value="item.categoryVal"></yhm-manager-td>
              <yhm-manager-td  :value="item.intentionVal"></yhm-manager-td>
              <yhm-manager-td :value="item.remark" ></yhm-manager-td>
              <yhm-manager-td :value="item.trackPerson" :after-icon="item.listMessage.length>0?'i-btn-prompt':''" @mouseover="tableTipShowEvent" @mouseout="tableTipHideEvent" :value-object="item" ></yhm-manager-td>
              <yhm-manager-td-date :value="item.nextDate" typeof="data"></yhm-manager-td-date>
              <yhm-manager-td-date :value="item.planDate==='1900-01-01'?'-----':item.planDate" typeof="data"></yhm-manager-td-date>

            </tr>
          </template>
          <template #empty>
            <span class="m_listNoData" v-show="empty">暂时没有数据</span>
          </template>
          <template #pager>
            <yhm-pagination :pager="pager" is-page-size="false" :is-select-info="false" @initData="listDetail(false)"></yhm-pagination>
          </template>
        </yhm-view-tab-list>
      </template>
    </yhm-view-tab>
    </div>
    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn>
<!--        <yhm-commonbutton value="编辑" style="margin-right: 20px" icon="i-edit" :flicker="false" @call="editBtn()"></yhm-commonbutton>-->
<!--        <yhm-commonbutton :show="istrackBtn" :no-click="item.feedback === '2'" value="跟踪"  icon="i-edit" :flicker="true" @call="trackBtn"></yhm-commonbutton>-->
      </template>
    </yhm-formoperate>
  </div>
</template>

<script>
  import { viewmixin } from '@/assets/view.js'
  export default {
    name: 'trackDetailsView',
    mixins: [viewmixin],
    data(){
      return{
        clientID:'',
        isEmpty: true,
        istrackBtn:true,
        principal:'', //负责人
        principalID:'', //负责人ID
        state:'',     //客户状态
        stateList:[],
        contactPersonID:'',//联系人ID
        name:'',      //联系人
        phone:'',      //联系方式
        plate:'',      //车牌号
        carOwner:'',    //车主
        carOwnerID:'',  //车主id
        vehicleID:'',   //车辆id
        drivingLicense:'',  //行车证
        idNo:'',        //身份证
        frameNumber:'',   //车架号
        registerDate:'',  //登记日期
        engineNumber:'',  //发动机号
        lastYearUnit:'',  //投保公司
        lastYearUnitList:[],
        forceEndDate:'',  //交强险到期日
        businessEndDate:'', //商业险到期日
        forceDay:'',
        businessDay:'',

        trackID:'',
        intention:'',
        intentionList:[],
        isQuote:'',
        isQuoteList:[],
        nextDate:'',
        planDate:'',
        category:'',
        businessMoney:'',
        travelTaxMoney:'',
        forceMoney:'',
        totalMoney:'',
        trackPerson:'',
        remark:'',
        details:[],
        tabState:[{select:false},{select:true}],
        tableTip:false,         //记录表格是否显示
        tableTipControl:{},
        tableTipColumnInfo:[
          {width:'150',title:'审批时间',category:'date',key:'insertDate'},
          {width:'150',title:'审批人员',category:'',key:'messageName'},
          {width:'150',title:'审批备注',category:'',key:'message'},
        ],
        tableTipInfo:[],
      }
    },
    methods:{
      tableTipShowEvent(item,control){
        if(item.listMessage.length > 0) {
          this.tableTipInfo = item.listMessage
          this.tableTipControl = control
          this.tableTip = true
        }
      },
      tableTipHideEvent(){
        this.tableTip = false
      },
      trackBtn(){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '690',
          title: '跟踪信息',
          url: '/trackForm?ownerID='+this.id+ '&id=' + this.trackID ,
          closeCallBack:(data)=>{
            if(data){
              this.$dialog.setReturnValue(this.id)
              this.$dialog.refresh()
            }
          }
        })
      },
      listView(id){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '400',
          url: '/trackFormView?id=' + id  ,
          title: '查看跟踪信息',
          closeCallBack: (data)=>{
          }
        })
      },
      listDetail(initValue){
        //点击跟踪信息
        if(initValue) {
          this.pager.pageIndex = 1
        }
        let params = {
          ownerID:this.clientID,
          init:initValue,
          pageIndex: this.pager.pageIndex,
          pageSize: this.pager.pageSize
        }

        this.ajaxJson({
          url: '/Insurance/getByTrackAll',
          data: params,
          call: (data) => {
            this.details = data.content
            this.pager.total = data.count
            this.empty = data.content.length === 0
          }
        })
      },
      editBtn(){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '750',
          title: '编辑客户信息',
          url: '/clientForm?id=' + this.clientID,
          closeCallBack: (data)=>{
            if(data){
              this.$dialog.setReturnValue(this.trackID)
              this.$dialog.refresh()
            }
          }
        })
      },
      initData(){
        let params = {
          id: this.id,
        }
        this.init({
          url: '/Insurance/initClientForm',
          data: params,
          call: (data)=>{

            this.clientID=data.id
            this.stateList = data.statePsd.list
            this.state = data.statePsd.value
            this.lastYearUnitList = data.lastYearUnitPsd.list
            this.lastYearUnit = data.lastYearUnitPsd.value
            this.principalID =data.principalID //负责人ID
            this.principal= data.principal //负责人
            this.contactPersonID =data.contactPersonID//联系人ID
            this.name =data.name      //联系人
            this.phone =data. phone    //联系方式
            this.plate =data. plate     //车牌号
            this.carOwner=data.carOwner  //车主
            this.carOwnerID=data.carOwnerID  //车主
            this.vehicleID =data.vehicleID   //车辆id
            this.drivingLicense =data.drivingLicense  //行车证
            this.idNo =data.idNo               //身份证
            this.frameNumber =data.frameNumber  //车架号
            this.registerDate =data.registerDate //登记日期
            this.engineNumber =data.engineNumber //发动机号
            this.forceEndDate =data.forceEndDate //交强险到期日
            this.businessEndDate =data.businessEndDate//商业险到期日
            this.forceDay=data.forceDay
            this.businessDay=data.businessDay

            this.listDetail(true)
          }
        })
      }

    },
    created () {
     this.initData()
    }
  }

</script>

<style scoped>

</style>
