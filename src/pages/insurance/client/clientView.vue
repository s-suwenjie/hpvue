<template>
  <div class="f_main">
    <yhm-preview-sms :value="previewValue" ref="preview" :shade-show="false"></yhm-preview-sms>
    <yhm-view-body>
      <template #title>基本信息</template>

      <template #body>
        <yhm-view-control title="负责人" :content="principal"></yhm-view-control>
        <yhm-view-control title="客户状态" :content="state" :psd="stateList"></yhm-view-control>
        <yhm-view-control color="#ff0000" title="车牌号" :content="plate"></yhm-view-control>
        <yhm-view-control title="联系人" :content="name+'-'+phone"></yhm-view-control>
        <yhm-view-control title="联系人身份证号"  :content="idNo"></yhm-view-control>
        <yhm-view-control title="上牌日期" :content="registerDate" type="date"></yhm-view-control>
        <yhm-view-control title="车主" :content="carOwner+'-'+carOwnerPhone"></yhm-view-control>
        <yhm-view-control title="车主身份证号"  :content="carOwnerIDNO"></yhm-view-control>

<!--        <yhm-view-control title="行车证信息"  category="3" type="smfiles" tag="drivingLicense" :content="drivingLicense"></yhm-view-control>-->

        <yhm-view-control title="车架号" :content="frameNumber"></yhm-view-control>

        <yhm-view-control title="发动机号" :content="engineNumber" ></yhm-view-control>

        <yhm-view-control category="3" title="行车证" type="files" :content="fileList"></yhm-view-control>
      </template>
    </yhm-view-body>

    <div class="f_split"></div>
    <yhm-view-tab>
      <template #tab>
        <yhm-view-tab-button :list="tabState" :index="0">保险信息</yhm-view-tab-button>
        <yhm-view-tab-button :list="tabState" :index="1" @click="listDetail(true)">跟踪信息</yhm-view-tab-button>
        <yhm-view-tab-button :list="tabState" :index="2" @click="listQuotation(true)">保险历史报价单</yhm-view-tab-button>
      </template>
      <template #content>
        <yhm-view-tab-content v-show="tabState[0].select">
          <yhm-view-control title="往年投保公司" :content="lastYearUnit" :psd="lastYearUnitList"></yhm-view-control>
          <yhm-view-control title="交强险到期日" :content="forceEndDate" type="date"></yhm-view-control>
          <yhm-view-control title="商业险到期日" :content="businessEndDate" type="date" ></yhm-view-control>
        </yhm-view-tab-content>
        <yhm-view-tab-list :customize="true" :pager="true" v-show="tabState[1].select">
          <template #listHead>
            <yhm-managerth style="width:40px" title="查看" ></yhm-managerth>
            <yhm-managerth  title="跟踪状态" ></yhm-managerth>
            <yhm-managerth  title="购买意向"></yhm-managerth>

            <yhm-managerth  title="跟踪内容"></yhm-managerth>
            <yhm-managerth  title="跟踪人员"></yhm-managerth>
            <yhm-managerth  title="下次跟踪日期"></yhm-managerth>
            <yhm-managerth  title="预计到店日期"></yhm-managerth>
            <!--<yhm-managerth  title="操作"></yhm-managerth>-->

          </template>
          <template #listBody>
            <tr v-for="(item,index) in details" :key="index" :class="{InterlacBg:index%2!==0}">
              <yhm-manager-td-look @click="listView(item.id)"></yhm-manager-td-look>
              <yhm-manager-td  :value="item.categoryVal"></yhm-manager-td>
              <yhm-manager-td  :value="item.intentionVal"></yhm-manager-td>
              <yhm-manager-td :value="item.remark" ></yhm-manager-td>
              <yhm-manager-td :value="item.trackPerson" ></yhm-manager-td>
              <yhm-manager-td-date :value="item.nextDate"></yhm-manager-td-date>
              <yhm-manager-td-date :value="item.planDate==='1900-01-01'?'-----':item.planDate"></yhm-manager-td-date>
              <!--<yhm-manager-td-operate >-->
                <!--<yhm-manager-td-operate-button v-if="item.intention==0" @click="sendOutClick(item)" value="发送报价单" icon="uniE99E" color="#56B4F4"></yhm-manager-td-operate-button>-->
              <!--</yhm-manager-td-operate>-->
            </tr>
          </template>
          <template #empty>
            <span class="m_listNoData" v-show="empty">暂时没有数据</span>
          </template>
          <template #pager>
            <yhm-pagination :pager="pager" is-page-size="false" :is-select-info="false" @initData="listDetail(false)"></yhm-pagination>
          </template>
        </yhm-view-tab-list>
        <yhm-view-tab-list :customize="true" :pager="true" v-show="tabState[2].select">
          <template #listHead>
            <!--<yhm-managerth style="width:40px" title="查看" ></yhm-managerth>-->
            <yhm-managerth style="width:60px" title="发送人" ></yhm-managerth>
            <yhm-managerth style="width:140px" title="发送时间" ></yhm-managerth>
            <yhm-managerth  style="width:60px"  title="短信" subtitle="接收人" ></yhm-managerth>
            <yhm-managerth  title="短信类型" ></yhm-managerth>
            <yhm-managerth  title="商业险" subtitle="金额" ></yhm-managerth>
            <yhm-managerth title="商业险种" ></yhm-managerth>
            <yhm-managerth  title="交强险" subtitle="金额" ></yhm-managerth>
            <yhm-managerth  title="车船税" subtitle="金额" ></yhm-managerth>
            <yhm-managerth  style="width:60px"  title="合计金额" ></yhm-managerth>
            <yhm-managerth  style="width:60px"  title="保险公司" ></yhm-managerth>
            <yhm-managerth  title="优惠金额" ></yhm-managerth>
            <yhm-managerth  title="实收金额" ></yhm-managerth>
            <yhm-managerth  title="赠送信息" ></yhm-managerth>
            <yhm-managerth  title="备注" ></yhm-managerth>
            <yhm-managerth  title="客户" subtitle="接收状态" ></yhm-managerth>
            <yhm-managerth  title="上传的" subtitle="报价单" ></yhm-managerth>

          </template>
          <template #listBody>
            <tr v-for="(item,index) in quotationList" :key="index" :class="{InterlacBg:index%2!==0}">
              <!--<yhm-manager-td-look @click="listView(item.id)"></yhm-manager-td-look>-->
              <yhm-manager-td-center  :value="item.createName"></yhm-manager-td-center>
              <yhm-manager-td  :value="item.insertDate"></yhm-manager-td>
              <yhm-manager-td  :value="item.personName"></yhm-manager-td>
              <yhm-manager-td node-class-name="f_main" :tip="true" v-if="item.category==1"  value="商业险和交强险"></yhm-manager-td>
              <yhm-manager-td :tip="true" node-class-name="f_main" v-if="item.category==2"  value="商业险"></yhm-manager-td>
              <yhm-manager-td :tip="true" node-class-name="f_main" v-if="item.category==3"  value="交强险"></yhm-manager-td>
              <yhm-manager-td :tip="true" node-class-name="f_main" v-if="item.category==4"  value="商业险和交强险报价和车船税"></yhm-manager-td>
              <yhm-manager-td :tip="true" node-class-name="f_main" v-if="item.category==5"  value="交强险报价和车船税"></yhm-manager-td>
              <yhm-manager-td-money  :value="item.businessMoney+''"></yhm-manager-td-money>
              <yhm-manager-td node-class-name="f_main" :tip="true" :value="item.businessCategory"></yhm-manager-td>
              <yhm-manager-td-money  :value="item.jiaoqiangMoney+''"></yhm-manager-td-money>
              <yhm-manager-td-money  :value="item.vehiclesVessels+''"></yhm-manager-td-money>
              <yhm-manager-td-money  :value="item.totalMoney+''"></yhm-manager-td-money>
              <yhm-manager-td  :value="item.insuranceUnit"></yhm-manager-td>
              <yhm-manager-td-money  :value="item.discountMoney+''"></yhm-manager-td-money>
              <yhm-manager-td-money  :value="item.netReceiptsMoney+''"></yhm-manager-td-money>
              <yhm-manager-td node-class-name="f_main" :tip="true" :value="item.give"></yhm-manager-td>
              <yhm-manager-td node-class-name="f_main" :tip="true" :value="item.remark"></yhm-manager-td>

              <div @mouseout="out(item)" @mouseover="ver()" :class="stateSmsList[item.state].img" :style="{color:stateSmsList[item.state].code}"
                   style="font-size: 30px;height: 34px; text-align: center;border-right: 1px solid #bfbfbf;border-bottom: 1px solid #bfbfbf;">
              </div>
              <!--<yhm-manager-td text-align="center" @mouseout="out(item)" @mouseover="ver()" :after-icon="stateSmsList[item.state].img" ></yhm-manager-td>-->
              <!--<yhm-manager-td-psd @mouseout="out(item)" @mouseover="ver()" :value="item.state" :list="stateSmsList"></yhm-manager-td-psd>-->
              <yhm-manager-td  v-if="item.storeName==''" value="------"></yhm-manager-td>
              <yhm-manager-td-image v-else :tip="true" left="-440" width="450" height="250" :value="item.storeName" tag="importExcel"></yhm-manager-td-image>

            </tr>
          </template>
          <template #empty>
            <span class="m_listNoData" v-show="empty">暂时没有数据</span>
          </template>
          <template #pager>
            <yhm-pagination :pager="pager" is-page-size="false" :is-select-info="false" @initData="listQuotation(false)"></yhm-pagination>
          </template>
        </yhm-view-tab-list>
      </template>
    </yhm-view-tab>
    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn>
        <yhm-commonbutton value="编辑" style="margin-right: 20px" icon="i-edit" :flicker="true" @call="editBtn()"></yhm-commonbutton>
      </template>
    </yhm-formoperate>
  </div>
</template>

<script>
  import { viewmixin } from '@/assets/view.js'
  export default {
    name: 'clientView',
    mixins: [viewmixin],
    data(){
      return{
        clientID:'',
        isEmpty: true,
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
        carOwnerPhone:'',//车主手机号
        carOwnerIDNO:'',//车主身份证号
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
        fileList:[],

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
        tabState:[{select:true},{select:false},{select:false}],
        quotationList:[],
        stateSmsList:[],
        previewValue:'',
      }
    },
    methods:{
      ver(){
        this.$refs.preview.$emit('switch','0')
      },
      out(item){
        this.previewValue=item.count
        this.$refs.preview.$emit('switch','1')
      },
      promotionsView(item){
        this.$dialog.OpenWindow({
          width: 1050,
          height: 700,
          url: '/promotionsView?id=' + item.promotionsID,
          title: '查看优惠活动',
          closeCallBack: (data) => {
            if (data) {
              // this.lastData = data//接收子页面传的值
              this.initPageData(false)
            }
          }
        })
      },
      sendOutClick(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '550',
          url: '/quotationFrom?trackID=' + item.id+'&clientID='+item.ownerID,
          title: '发送报价单',
          closeCallBack: (data)=>{
            this.initData()
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
            this.initData()
          }
        })
      },
      listQuotation(initValue){
        if(initValue) {
          this.pager.pageIndex = 1
        }
        let params = {
          id:this.clientID,
          init:initValue,
          pageIndex: this.pager.pageIndex,
          pageSize: this.pager.pageSize
        }
        this.ajaxJson({
          url: '/Insurance/quotation/getManager',
          data: params,
          call: (data) => {
            this.quotationList = data.content
            this.pager.total = data.count
            this.empty = data.content.length === 0
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
              this.$dialog.refresh()
            }
          }
        })
      },
      initData(){
        let params = {
          id: this.id
        }
        this.init({
          url: '/Insurance/initClientForm',
          data: params,
          call: (data)=>{
            this.clientID=data.id
            this.stateList = data.statePsd.list
            this.state = data.statePsd.value
            this.stateSmsList = data.stateSmsPsd.list

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
            this.carOwnerIDNO=data.carOwnerIDNO
            this.carOwnerPhone=data.carOwnerPhone
            this.vehicleID =data.vehicleID   //车辆id
            this.drivingLicense =data.drivingLicense  //行车证
            this.idNo =data.idNo               //身份证
            this.frameNumber =data.frameNumber  //车架号
            this.registerDate =data.registerDate //登记日期
            this.engineNumber =data.engineNumber //发动机号
            this.forceEndDate =data.forceEndDate //交强险到期日
            this.businessEndDate =data.businessEndDate//商业险到期日
            this.fileList=data.files
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
