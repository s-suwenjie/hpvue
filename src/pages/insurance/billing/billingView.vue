<template>
  <div class="f_main">
    <yhm-view-body>
      <template #title>基本信息</template>
      <template #body>
        <yhm-view-control title="车牌号" :content="plate"></yhm-view-control>
        <yhm-view-control title="车辆品牌" :content="brand"></yhm-view-control>
        <yhm-view-control title="车型" :content="model"></yhm-view-control>
        <yhm-view-control title="投保日期" :content="insuredDate" type="date"></yhm-view-control>
        <yhm-view-control title="被保险人" :content="beinsuredName+'-'+beinsuredidNo"></yhm-view-control>
        <yhm-view-control title="联系人" :content="contactName+'-'+contactPhone"></yhm-view-control>
        <yhm-view-control title="投保人" :content="insuredName+'-'+insuredPhone"></yhm-view-control>
        <yhm-view-control title="与车主关系" :content="relationshipVal"></yhm-view-control>
        <yhm-view-control title="投保类型"  :content="insuredTypeVal"></yhm-view-control>
        <yhm-view-control title="投保渠道" :content="insuredChannelVal"></yhm-view-control>
        <yhm-view-control title="投保项目" :content="insuredProjectVal"></yhm-view-control>
        <yhm-view-control title="出单流程" :content="aisleVal"></yhm-view-control>

      </template>
    </yhm-view-body>
    <div class="f_split"></div>
    <yhm-view-tab>
      <template #tab>
        <yhm-view-tab-button :list="tabState" :index="0">保险信息</yhm-view-tab-button>
        <yhm-view-tab-button :list="tabState" :index="1">赠送信息</yhm-view-tab-button>
        <yhm-view-tab-button :list="tabState" :index="2" @click="couponClick()">使用的优惠卷</yhm-view-tab-button>
      </template>
      <template #content>
        <yhm-view-tab-content v-show="tabState[0].select">
          <yhm-view-control title="交强险开始日" title-color="#088A08"  v-show="isforceStart" :content="forceStartDate" type="date"></yhm-view-control>
          <yhm-view-control title="交强险到期日" title-color="#FF0000"  v-show="isforceStart"  :content="forceEndDate" type="date"></yhm-view-control>
          <yhm-view-control title="交强险金额"  v-show="isforceStart" :content="forceMoney" type="money"></yhm-view-control>
          <yhm-view-control title="商业险开始日" title-color="#088A08" v-show="isbusinessStart" :content="businessStartDate" type="date"></yhm-view-control>
          <yhm-view-control title="商业险到期日" title-color="#FF0000" v-show="isbusinessStart"  :content="businessEndDate" type="date"></yhm-view-control>
          <yhm-view-control title="商业险实际金额"  v-if="couponMoney!=0.00"  v-show="isbusinessStart" :content="businessMoney+'-优惠券金额('+couponMoney +')'"></yhm-view-control>
          <yhm-view-control title="商业险实际金额" color="#FF0000" v-else  v-show="isbusinessStart" :content="businessMoney" type="money"></yhm-view-control>

          <yhm-view-control title="商业险种(金额)" category="3" v-show="isbusinessStart" :content="commercialVal"></yhm-view-control>
          <yhm-view-control title="车船税金额"  v-show="isvehicle"   :content="vehicleMoney" type="money"></yhm-view-control>
          <yhm-view-control title="保费合计" :content="premiumsTotal" type="money"></yhm-view-control>
          <yhm-view-control title="开票金额" :content="invoicingMoney" type="money"></yhm-view-control>
          <yhm-view-control title="投保公司" :content="insuredUnit" :psd="insuredUnitList"></yhm-view-control>
          <yhm-view-control title="优惠金额/点数" v-show="isbusinessStart" :content="discountMoney+'／'+discountCount +'%'" color="red"></yhm-view-control>
          <yhm-view-control title="个税承担" color="#4000FF" :content="tariffCheckVal"></yhm-view-control>
          <yhm-view-control title="是否返利" :content="cashVal"></yhm-view-control>
          <yhm-view-control title="实收金额" :content="receivedMoney" type="money"></yhm-view-control>
          <yhm-view-control title="返利对象" v-show="isCash" :content="cashObjectVal" ></yhm-view-control>
          <yhm-view-control  v-show="isPromotions" title="活动方案" :content="promotionsName"></yhm-view-control>

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
              <yhm-managerth title="名称"></yhm-managerth>
            <yhm-managerth title="类型"></yhm-managerth>
            <yhm-managerth title="优惠券开始日期"></yhm-managerth>
            <yhm-managerth title="优惠券结束日期"></yhm-managerth>
            <yhm-managerth title="面值"></yhm-managerth>
            <yhm-managerth width="100" title="logo"></yhm-managerth>
          </template>
          <template #listBody>
            <tr v-for="(item,index) in conponList" :key="index" :class="{InterlacBg:index%2!==0}">
              <yhm-manager-td-center :value="item.name"></yhm-manager-td-center>
              <yhm-manager-td-psd :value="item.category" :list="listCouponCategory.list"></yhm-manager-td-psd>
              <yhm-manager-td-center :value="item.start"></yhm-manager-td-center>
              <yhm-manager-td-center :value="item.end"></yhm-manager-td-center>
              <yhm-manager-td-center :value="item.money"></yhm-manager-td-center>
              <yhm-manager-td-image :tip="true" left="-440" width="450" height="250" :value="item.url" tag="wxCoupon"></yhm-manager-td-image>
            </tr>
          </template>
          <template #empty>
            <span class="m_listNoData" v-show="conponList.length>0?false:true">暂时没有数据</span>
          </template>
        </yhm-view-tab-list>
      </template>
    </yhm-view-tab>
    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn>
        <yhm-commonbutton value="编辑" :show="isState" icon="i-edit" :flicker="false" @call="editBtn()"></yhm-commonbutton>
      </template>
    </yhm-formoperate>
  </div>
</template>

<script>
  import { viewmixin } from '@/assets/view.js'
  export default {
    name: 'billingView',
    mixins: [viewmixin],
    data(){
      return{
        id:'',
        tabState:[{select:true},{select:false},{select:false}],
        salsesman:'', //业务员
        plate:'',//车主
        aisleVal:'',
        insuredDate:'',//投保日期
        beinsuredName:'',
        beinsuredidNo:'',
        //联系人
        contactID:'',
        contactName:'',
        contactPhone:'',
        //投保人
        insuredName:'',
        insuredPhone:'',
        relationshipVal:'', //与车主关系
        insuredTypeVal:'', //投保类型
        insuredChannelVal:'', //投保渠道
        insuredProject:'',//投保项目
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
        //是否返利
        cash:'',
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
        promotionsName:'',
        isPromotions:'',
        tariffCheckVal:'',
        isforceStart:true,
        isvehicle:true,
        isbusinessStart:true,
        isCash:true,
        empty:true,
        status:'',
        model:'',
        brand:'',
        insuredUnit: '',
        insuredUnitList: [],
        discountList:[],
        conponList:[],
        couponMoney:'',
        isState: false,
        listCouponCategory: {
          value: '',
          list: []
        },
      }
    },
    methods:{
      couponClick(){
        let params = {
          id: this.id,
        }
        this.ajaxJson({
          url: '/wx/wxCouponDetail/getWriteOffDetail',
          data: params,
          call: (data) => {
            this.listCouponCategory = data.content.categoryPsd
            this.conponList=data.content.list

          }
        })
      },
      editBtn(){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '750',
          title: '编辑保单信息',
          url: '/billingForm?id=' + this.id,
          closeCallBack: (data)=>{
            if(data){
              this.$dialog.setReturnValue(this.id)
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
          url: '/Insurance/initBillingForm',
          data: params,
          call: (data) => {
            this.id=data.id
            this.salsesman=data.salsesman
            this.plate=data.plate
            this.brand=data.brand
            this.model=data.model
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
            this.tariffCheckVal=data.tariffCheckVal
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
            this.promotionsName=data.promotionsName
            this.insuredUnit = data.insuredUnit
            this.insuredUnitList = data.insuredUnitPsd.list
            this.aisleVal=data.aisleVal
            this.couponMoney=data.couponMoney
            if (this.cash==='0'){
              this.isCash=true
            }else{
              this.isCash=false
            }
            if (data.promotionsID==''){
              this.isPromotions=false
            }else {
              this.isPromotions=true
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
            if (data.submit==='0' ||data.submit==='1'){
              this.isState=false
            }
          },

        })

      }
    },
    created () {
      this.setQuery2Value('status')
     if (this.status===''||this.status==='1'){
       this.isState=false
     }else {
       this.isState=true
     }
      this.initData()
    }
  }
</script>

<style scoped>

</style>
