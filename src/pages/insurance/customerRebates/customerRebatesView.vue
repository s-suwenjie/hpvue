<template>
  <div class="f_main">
    <yhm-view-body>
      <template #title>基本信息</template>
      <template #body>
        <yhm-view-control title="车牌号" :content="plate"></yhm-view-control>
        <yhm-view-control title="投保日期" :content="insuredDate" type="date"></yhm-view-control>
        <yhm-view-control title="被投保人" :content="beinsuredName+'-'+beinsuredidNo"></yhm-view-control>
        <yhm-view-control title="联系人" :content="contactName+'-'+contactPhone"></yhm-view-control>
        <yhm-view-control title="投保人" :content="insuredName+'-'+insuredPhone"></yhm-view-control>
        <yhm-view-control title="与车主关系" :content="relationshipVal"></yhm-view-control>
        <yhm-view-control title="投保类型"  :content="insuredTypeVal"></yhm-view-control>
        <yhm-view-control title="投保渠道" :content="insuredChannelVal"></yhm-view-control>
        <yhm-view-control title="投保项目" :content="insuredProjectVal"></yhm-view-control>
      </template>
    </yhm-view-body>

    <div class="f_split"></div>
    <div class="i-left fs48b colorFFF" title="上一条" v-show="isLeftID"  @click="leftStrip" style="width:48px;height:70px;background: #000;opacity:0.3;position: fixed;  bottom: 300px;z-index: 9999;display:flex;justify-content:center;align-items:center;">
    </div>
    <div class="i-right fs48b colorFFF" title="下一条" v-show="isRightID" @click="rightStrip" style="width:48px;height:70px;background: #000;opacity:0.3;position: fixed;  bottom: 300px;right:0px;z-index: 9999;display:flex;justify-content:center;align-items:center;">
    </div>

    <div class="f_split"></div>
    <yhm-view-tab>
      <template #tab>
        <yhm-view-tab-button :list="tabState" :index="0">跟踪信息</yhm-view-tab-button>
        <yhm-view-tab-button :list="tabState" :index="1">赠送信息</yhm-view-tab-button>
        <yhm-view-tab-button :list="tabState" :index="2">收支明细</yhm-view-tab-button>
        <yhm-view-tab-button :list="tabState" :index="3">应收账款</yhm-view-tab-button>
      </template>
      <template #content>
        <yhm-view-tab-content v-show="tabState[0].select">
          <yhm-view-control title="交强险开始日"  v-if="isforceStart" :content="forceStartDate" type="date"></yhm-view-control>
          <yhm-view-control title="交强险到期日"  v-if="isforceStart"  :content="forceEndDate" type="date"></yhm-view-control>
          <yhm-view-control title="交强险金额"  v-if="isforceStart" :content="forceMoney" type="money"></yhm-view-control>
          <yhm-view-control title="车船税金额"  v-if="isvehicle"   :content="vehicleMoney" type="money"></yhm-view-control>
          <yhm-view-control title="商业险到期日" v-if="isbusinessStart" :content="businessStartDate" type="date"></yhm-view-control>
          <yhm-view-control title="商业险结束日" v-if="isbusinessStart"  :content="businessEndDate" type="date"></yhm-view-control>
          <yhm-view-control title="商业险种(金额)" category="3" v-if="isbusinessStart" :content="commercialVal"></yhm-view-control>
          <yhm-view-control title="投保公司" :content="insuredUnit" :psd="insuredUnitList"></yhm-view-control>
          <yhm-view-control title="商业险实际金额"  v-if="isbusinessStart" :content="businessMoney" type="money"></yhm-view-control>
          <yhm-view-control title="开票金额" :content="invoicingMoney" type="money"></yhm-view-control>
          <yhm-view-control title="保费合计" :content="premiumsTotal" type="money"></yhm-view-control>
          <yhm-view-control title="优惠金额/点数" v-if="isbusinessStart" :content="discountMoney+'／'+discountCount"></yhm-view-control>
          <yhm-view-control title="实收金额" :content="receivedMoney" type="money"></yhm-view-control>
          <yhm-view-control title="是否返利" :content="cashVal"></yhm-view-control>
          <yhm-view-control title="返利对象" v-if="isCash" :content="cashObjectVal" ></yhm-view-control>
        </yhm-view-tab-content>
        <yhm-view-tab-list :customize="true" :pager="true" v-show="tabState[1].select">
          <template #listHead>
            <yhm-managerth style="width: 40px" title="序号" ></yhm-managerth>
            <yhm-managerth  title="详细信息"></yhm-managerth>
          </template>
          <template #listBody>
            <tr v-for="(item,index) in discountList" :key="index" :class="{InterlacBg:index%2!==0}">
              <yhm-manager-td  :value="item.code"></yhm-manager-td>
              <yhm-manager-td  :value="item.remark"></yhm-manager-td>
            </tr>
          </template>
          <template #empty>
            <span class="m_listNoData" v-show="empty">暂时没有数据</span>
          </template>
        </yhm-view-tab-list>
        <yhm-view-tab-list :customize="true" :pager="true" v-show="tabState[2].select">
          <template #listHead>
            <yhm-managerth style="width: 100px;" title="所属类型" ></yhm-managerth>
            <yhm-managerth style="width: 80px;" title="收支方向"></yhm-managerth>
            <yhm-managerth title="基本信息"></yhm-managerth>
            <yhm-managerth title="对方账户"></yhm-managerth>
            <yhm-managerth style="width: 100px;" title="总金额"></yhm-managerth>
            <yhm-managerth style="width: 100px;" title="交易金额"></yhm-managerth>
            <yhm-managerth style="width: 150px;" title="编号"></yhm-managerth>
          </template>
          <template #listBody>
            <tr v-for="(item,index) in listPolicy" :key="index" :class="{InterlacBg:index%2!==0}">
              <yhm-manager-td :value="item.categoryVal"></yhm-manager-td>
              <yhm-manager-td-direction class="dfJcc" :direction="item.direction" :value="item.direction" :dir-val="false"></yhm-manager-td-direction>
              <yhm-manager-td :tip="true" node-class-name="f_main" :value="item.ownAccount"></yhm-manager-td>
              <yhm-manager-td :tip="true" node-class-name="f_main" :value="item.otherAccount"></yhm-manager-td>
              <yhm-manager-td-money :value="Math.abs(item.money) + ''"></yhm-manager-td-money>
              <yhm-manager-td-money :value="Math.abs(item.bankMoney) + ''"></yhm-manager-td-money>
              <yhm-manager-td  :value="item.number"></yhm-manager-td>
            </tr>
          </template>
          <template #customize>
            <yhm-view-control category="5" title="实时盈亏" :content="sumMoney" v-show="parseFloat(sumMoney) <  0" color="#f00"  type="money"></yhm-view-control>
            <yhm-view-control category="5" title="实时盈亏" :content="sumMoney" v-show="parseInt(sumMoney) >= 0" color="#4BB414" type="money"></yhm-view-control>
          </template>
          <template #empty>
            <span class="m_listNoData" v-show="empty">暂时没有数据</span>
          </template>
        </yhm-view-tab-list>
        <!--收支盈亏-->
        <yhm-view-tab-list :customize="true" :pager="true" v-show="tabState[3].select">
          <template #listHead>
            <yhm-managerth title="保险公司" ></yhm-managerth>
            <yhm-managerth style="width: 110px;" title="活动启用时间"></yhm-managerth>
            <yhm-managerth style="width: 150px;" title="保险公司优惠额度比例"></yhm-managerth>
            <yhm-managerth style="width: 150px;" title="支付保险公司金额"></yhm-managerth>
            <yhm-managerth style="width: 150px;" title="应收账款金额"></yhm-managerth>
            <!--            <yhm-managerth  style="width: 100px;" title="返利金额"></yhm-managerth>-->
          </template>
          <template #listBody>
            <tr v-for="(item,index) in listProfit" :key="index" :class="{InterlacBg:index%2!==0}">
              <yhm-manager-td :tip="true" node-class-name="f_main" :value="item.unit"></yhm-manager-td>
              <yhm-manager-td-date :value="item.startDate"></yhm-manager-td-date>
              <yhm-manager-td :value="item.clientRate+'%'"></yhm-manager-td>
              <yhm-manager-td-money :value="item.totalMoney"></yhm-manager-td-money>
              <yhm-manager-td-money :value="quotaMoney"></yhm-manager-td-money>
              <!--              <yhm-manager-td-money :value="item.discountMoney"></yhm-manager-td-money>-->
            </tr>
          </template>
          <template #customize>
            <yhm-view-control type="money" category="1" title="预计盈亏" :content="profitAndLossMoney" v-if="parseFloat(profitAndLossMoney) >= 0" color="#4BB414"></yhm-view-control>
            <yhm-view-control type="money" category="1" title="预计盈亏" :content="profitAndLossMoney" v-if="parseFloat(profitAndLossMoney) < 0 " color="#f00"></yhm-view-control>
            <yhm-view-control type="money" category="1" title="实时盈亏" :content="sumMoney" v-if="parseFloat(sumMoney)>=0" color="#4BB414"></yhm-view-control>
            <yhm-view-control type="money" category="1" title="实时盈亏" :content="sumMoney" v-if="parseFloat(sumMoney)<0" color="#f00"></yhm-view-control>
            <yhm-view-control  category="3" title="盈亏比例" :content="profitAndLossProportion" v-if="parseFloat(profitAndLossMoney) >= 0 " color="#4BB414"></yhm-view-control>
            <yhm-view-control  category="3" title="盈亏比例" :content="profitAndLossProportion" v-if="parseFloat(profitAndLossMoney) < 0 " color="#f00"></yhm-view-control>
          </template>
          <template #empty>
            <span class="m_listNoData" v-show="empty">暂时没有数据</span>
          </template>
        </yhm-view-tab-list>
      </template>
    </yhm-view-tab>
    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
    </yhm-formoperate>
  </div>
</template>
<script>
  import { viewmixin } from '@/assets/view.js'
  import { accAdd } from '../../../assets/common'
  export default {
    name: 'customerRebatesView',
    mixins: [viewmixin],
    data(){
      return{
        id:'',
        tabState:[{select:true},{select:false},{select:false},{select:false}],
        plate:'',//车主
        insuredDate:'',//投保日期
        beinsuredName:'',
        beinsuredidNo:'',
        contactID:'',//联系人
        contactName:'',
        contactPhone:'',
        insuredName:'',//投保人
        insuredPhone:'',
        relationshipVal:'', //与车主关系
        insuredTypeVal:'',//投保类型
        insuredChannelVal:'',//投保渠道
        insuredProject:[], //投保项目
        insuredProjectVal:'',
        forceStartDate:'',//交强险开始日期
        forceEndDate:'',//交强险结束日期
        forceMoney:'',//交强险金额
        vehicleMoney:'',//车船税金额
        businessStartDate:'',//商业险开始日期
        businessEndDate:'',//商业险结束日期
        insuredUnitVal:'', //投保公司
        commercialVal:'', //商业险种
        invoicingMoney:'',//开票金额
        businessMoney:'',//商业险实际金额
        premiumsTotal:'',//保费合计
        discountMoney:'',//优惠金额
        discountCount:'',//优惠点位
        receivedMoney:'',//实收金额
        cash:'',//是否返利
        cashVal:'',
        cashObject:'',
        cashObjectVal:'',
        cashObjectList:[],
        code:'',//序号
        remark:'',//详细信息
        three:'',//三责
        threeList:[],
        scratch:'',//划痕
        scratchList:[],
        glass:'',//玻璃
        glassList:[],
        passenger:'',//车上人员乘客
        selfGlass:'',//自店承保玻璃险
        specify:'',//指定特约店维修险
        carDamage:'', //车损
        driver:'',//车上人员司机
        listDetails:[],
        sumMoney:'0',
        isforceStart:true,
        isvehicle:true,
        isbusinessStart:true,
        isCash:true,
        empty:true,
        insuredUnit: '',
        insuredUnitList: [],
        listPolicy:[],
        listProfit:[],
        discountList:[],
        quotaMoney:'',   //
        profitAndLossMoney:'', //实际盈亏金额
        profitAndLossProportion:'', //盈亏比例
        value: '',
        getNumColor: '',

        isLeftID:false,//延长按钮
        leftID:'',//上一条ID
        isRightID:false,//延长按钮
        rightID:'',//下一条ID
      }
    },
    methods:{
      leftStrip(){
        window.location='/customerRebatesView?id='+this.leftID
      },
      rightStrip(){
        window.location='/customerRebatesView?id='+this.rightID
      },

      initData(){
        let params = {
          id: this.id,
        }
        let sum=0
        this.init({
          url: '/Insurance/initPolicyForm',
          data: params,
          call: (data) => {
            this.id=data.id
            this.plate=data.plate
            this.insuredDate=data.insuredDate
            this.beinsuredName=data.beinsuredName
            this.beinsuredidNo=data.beinsuredidNo
            this.contactName=data.contactName
            this.contactPhone=data.contactPhone
            this.insuredName=data.insuredName
            this.insuredPhone=data.insuredPhone
            this.relationshipVal=data.relationshipVal
            this.insuredTypeVal=data.insuredTypeVal
            this.insuredChannelVal=data.insuredChannelVal
            this.insuredProjectVal=data.insuredProjectVal
            this.forceStartDate=data.forceStartDate
            this.forceEndDate=data.forceEndDate
            this.forceMoney=data.forceMoney
            this.vehicleMoney=data.vehicleMoney
            this.businessStartDate=data.businessStartDate
            this.businessEndDate=data.businessEndDate
            this.insuredUnitVal=data.insuredUnitVal
            this.commercialVal=data.commercialVal
            this.invoicingMoney=data.invoicingMoney
            this.businessMoney=data.businessMoney
            this.premiumsTotal=data.premiumsTotal
            this.discountMoney=data.discountMoney
            this.discountCount=data.discountCount
            this.receivedMoney=data.receivedMoney
            this.cash=data.cash
            this.cashVal=data.cashVal
            this.cashObjectVal=data.cashObjectVal
            this.discountList=data.discountList
            this.insuredUnit = data.insuredUnit
            this.insuredUnitList = data.insuredUnitPsd.list
            this.listPolicy=data.deatails
            this.listProfit=data.listProfit

            for (let i in this.listProfit){
              //计算保险公司优惠定额
              this.quotaMoney= this.listProfit[i].totalMoney * (this.listProfit[i].clientRate/100) + ''
              //计算实际金额
              this.profitAndLossMoney=(this.listProfit[i].totalMoney * (this.listProfit[i].clientRate/100))-this.listProfit[i].discountMoney +''
              //计算实际金额盈亏比例
              this.profitAndLossProportion = (((this.listProfit[i].totalMoney * (this.listProfit[i].clientRate/100))-this.listProfit[i].discountMoney) / this.listProfit[i].totalMoney *100 ).toFixed(2) + '%'
            }
            for(let i in this.listPolicy){
              sum +=  parseFloat(this.listPolicy[i].bankMoney)
            }
            this.sumMoney = sum  + '' //计算实际金额
            if (this.cash==='0'){
              this.isCash=true
            }else{
              this.isCash=false
            }
            if (this.discountList.length===0){
              this.empty=true
            }else {
              this.empty=false
            }
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
          },
        })
      },
      selectedList() {
        let params = {
          id: this.id
        }
        this.ajaxJson({
          url: '/PersonOffice/commonSelectedID',
          data: params,
          call: (data) => {
            if(data.leftID!==""){
              this.leftID=data.leftID
              this.isLeftID=true
            }
            if(data.rightID!==""){
              this.rightID=data.rightID
              this.isRightID=true
            }
          }
        })
      }
    },
    created () {
      this.initData()
      this.selectedList()
    },
    computed: {

    }
  }
</script>

<style scoped>

</style>


