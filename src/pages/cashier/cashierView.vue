<template>
  <div class="f_main">
    <yhm-view-body>
      <template #title>基本信息</template>
      <template #body>
        <yhm-view-control title="业务员" :content="salsesman"></yhm-view-control>
        <yhm-view-control title="车牌号" :content="plate"></yhm-view-control>
        <yhm-view-control title="品牌" :content="brand"></yhm-view-control>
        <yhm-view-control title="车型" :content="model"></yhm-view-control>
        <yhm-view-control title="投保日期" :content="insuredDate" type="date"></yhm-view-control>
        <yhm-view-control title="被保险人" :content="beinsuredName+'-'+beinsuredidNo"></yhm-view-control>
        <yhm-view-control title="联系人" :content="contactName+'-'+contactPhone"></yhm-view-control>
        <yhm-view-control title="投保人" :content="insuredName+'-'+insuredPhone"></yhm-view-control>
        <yhm-view-control title="与车主关系" :content="relationshipVal"></yhm-view-control>
        <yhm-view-control title="投保类型"  :content="insuredTypeVal"></yhm-view-control>
        <yhm-view-control title="投保渠道" :content="insuredChannelVal"></yhm-view-control>
        <yhm-view-control title="投保项目" :content="insuredProjectVal"></yhm-view-control>
      </template>
    </yhm-view-body>

    <div class="f_split"></div>
    <yhm-view-tab>
      <template #tab>
        <yhm-view-tab-button :list="tabState" :index="0">跟踪信息</yhm-view-tab-button>
        <yhm-view-tab-button :list="tabState" :index="1">赠送信息</yhm-view-tab-button>

      </template>
      <template #content>
        <yhm-view-tab-content v-show="tabState[0].select">
          <yhm-view-control title="交强险开始日"  v-if="isforceStart" :content="forceStartDate" type="date"></yhm-view-control>
          <yhm-view-control title="交强险到期日"  v-if="isforceStart"  :content="forceEndDate" type="date"></yhm-view-control>
          <yhm-view-control title="交强险金额"  v-if="isforceStart" :content="forceMoney" type="money"></yhm-view-control>
          <yhm-view-control title="车船税金额"  v-if="isvehicle"   :content="vehicleMoney" type="money"></yhm-view-control>
          <yhm-view-control title="商业险到期日" v-if="isbusinessStart" :content="businessStartDate" type="date"></yhm-view-control>
          <yhm-view-control title="商业险结束日" v-if="isbusinessStart"  :content="businessEndDate" type="date"></yhm-view-control>
          <yhm-view-control title="商业险种" category="3" v-if="isbusinessStart" :content="commercialVal"></yhm-view-control>
          <yhm-view-control title="投保公司" :content="insuredUnit" :psd="insuredUnitList"></yhm-view-control>

          <yhm-view-control title="商业险实际金额"  v-if="isbusinessStart" :content="businessMoney" type="money"></yhm-view-control>
          <yhm-view-control title="开票金额" :content="invoicingMoney" type="money"></yhm-view-control>
          <yhm-view-control title="保费合计" :content="premiumsTotal" type="money"></yhm-view-control>
          <yhm-view-control title="优惠金额/点数" v-if="isbusinessStart" :content="discountMoney+'／'+discountCount"></yhm-view-control>
          <yhm-view-control title="实收金额" :content="receivedMoney" type="money"></yhm-view-control>
          <yhm-view-control title="是否返利" :content="cashVal"></yhm-view-control>
          <yhm-view-control title="返利对象" v-if="isCash" :content="cashObjectVal" ></yhm-view-control>
          <yhm-view-control v-if="isPromotions" title="活动方案" :content="promotionsName"></yhm-view-control>

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
      </template>
    </yhm-view-tab>
    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn>
        <yhm-commonbutton v-if="cashierOperation==='3'?true:false"  :flicker="true" @call="approFund()" :value="'收款(客户)'" icon="i-btn-grant" color="#be08e3"></yhm-commonbutton>
        <yhm-commonbutton v-if="cashierOperation==='2'?true:false" :show="isPay"  :flicker="true" @call="approFund()" :value="'代付(保险公司)'" icon="i-btn-grant" color="#be08e3"></yhm-commonbutton>
        <yhm-commonbutton v-if="cashierOperation==='1'?true:false"  :flicker="true" @call="approFund()" :value="'返利(客户)'" icon="i-btn-grant" color="#be08e3"></yhm-commonbutton>

      </template>
    </yhm-formoperate>
  </div>
</template>

<script>
  import { viewmixin } from '@/assets/view.js'
  export default {
    name: 'cashierView',
    mixins: [viewmixin],
    data(){
      return{
        id:'',
        tabState:[{select:true},{select:false}],
        salsesman:'', //业务员
        plate:'',//车主
        insuredDate:'',//投保日期
        beinsuredName:'',
        beinsuredidNo:'',
        contactID:'',//联系人
        contactName:'',
        contactPhone:'',
        //投保人
        insuredName:'',
        insuredPhone:'',
        //与车主关系
        relationshipVal:'',
        //投保类型
        insuredTypeVal:'',

        //投保渠道
        insuredChannelVal:'',

        //投保项目
        insuredProject:'',
        insuredProjectVal:'',

        forceStartDate:'',//交强险开始日期
        forceEndDate:'',//交强险结束日期
        forceMoney:'',//交强险金额
        vehicleMoney:'',//车船税金额
        businessStartDate:'',//商业险开始日期
        businessEndDate:'',//商业险结束日期
        //投保公司
        insuredUnitVal:'',
        //商业险种
        commercialVal:'',
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
        discountList: [],
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
        listDetail:[],

        isforceStart:true,
        isvehicle:true,
        isbusinessStart:true,
        isCash:true,
        empty:true,
        isPay:true,

        insuredUnit: '',
        insuredUnitList: [],
        cashierOperation:'',

        ownerID:'',
        bankDetailType:'',
        bankID:'',
        bankOwnerID:'',
        cashierMoney:'',
        cashierDirection:'',
        bankMoney:'',
        insuredUnitAccountID:'',
        insuredUnitAccount:'',
        isPromotions:false,

      }
    },
    methods:{
      /* 拨付资金 */
      approFund(){

        if (this.cashierOperation=== '3') {
          this.$dialog.OpenWindow({
            width: '1050',
            height: '690',
            title: '客户收款',
            url: '/cashierBankDetailPrivateForm?cashierMoney=' + this.cashierMoney + '&cashierDirection=' + this.cashierDirection + '&bankID=' + this.bankID + '&bankOwnerID=' + this.bankOwnerID + '&bankMoney=' + this.bankMoney
              + '&insuredUnitAccountID=' + this.insuredUnitAccountID + '&insuredUnitAccount=' + this.insuredUnitAccount +'&cashierSubject=代收保险费 ------ 代理业务 ------ 其他业务&cashierSubjectID=F0887A4D-DA14-4FCB-B48B-221B42C8F17A'
              +'&cashierRemake='+this.cashierRemake+'&publicandPrivateAccount='+this.publicandPrivateAccount+'&cashierBankTag='+this.cashierBankTag,
            closeCallBack: (data) => {
              this.$dialog.setReturnValue(1)
              this.$dialog.close()
            }
          })
        }else if (this.cashierOperation=== '2') {
          this.$dialog.OpenWindow({
            width: '1050',
            height: '690',
            title: '拨付资金',
            url: '/cashierBankDetailForm?cashierMoney='+this.cashierMoney +'&cashierDirection='+this.cashierDirection+'&bankID='+this.bankID +'&bankOwnerID='+this.bankOwnerID+'&bankMoney='+this.bankMoney
              +'&insuredUnitID='+this.insuredUnitID+'&insuredUnitAccount='+this.insuredUnitAccount+'&cashierSubject=代付保险费 ------ 代理业务 ------ 其他业务&cashierSubjectID=DA771D46-0813-40C3-973B-9F57A492F3A0'
              +'&cashierRemake='+ this.cashierRemake+'&publicandPrivateAccount='+this.publicandPrivateAccount+'&cashierBankTag='+this.cashierBankTag+'&insuredUnitAccountID='+this.insuredUnitAccountID,
            closeCallBack: (data) => {
              this.$dialog.setReturnValue(1)
              this.$dialog.close()
            }
          })
        // }else if (this.cashierOperation=== '1') {
        //   this.$dialog.OpenWindow({
        //     width: '1050',
        //     height: '690',
        //     title: '保险返利',
        //     url: '/cashierBankDetailForm?cashierMoney=' + this.cashierMoney + '&cashierDirection=' + this.cashierDirection + '&bankID=' + this.bankID + '&bankOwnerID=' + this.bankOwnerID + '&bankMoney=' + this.bankMoney
        //       + '&insuredUnitAccountID=' + this.insuredUnitAccountID + '&insuredUnitAccount=' + this.insuredUnitAccount+'&cashierSubject=支付客户返利 ------ 售后业务 ------ 其他业务&cashierSubjectID=D65A9EF9-DCB2-47B8-918B-F8DD9342B2CB'
        //       +'&cashierRemake='+this.cashierRemake+'&publicandPrivateAccount='+this.publicandPrivateAccount+'&cashierBankTag='+this.cashierBankTag,
        //     closeCallBack: (data) => {
        //       this.$dialog.setReturnValue(1)
        //       this.$dialog.close()
        //     }
        //   })
         }
      },
      editBtn(){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '750',
          title: '编辑客户信息',
          url: '/billingForm?id=' + this.id,
          closeCallBack: (data)=>{
            if(data){
              this.$dialog.setReturnValue(this.id)
              this.$dialog.refresh()
            }
          }
        })
      },

    },
    created () {
      this.setQuery2Value('cashierOperation')

      // this.setQuery2Value('ownerID')
      // this.setQuery2Value('bankDetailType')
      // this.setQuery2Value('bankID')
      // this.setQuery2Value('bankOwnerID')
      // this.setQuery2Value('cashierMoney')
      // this.setQuery2Value('cashierDirection')
      // this.setQuery2Value('bankMoney')
      // this.setQuery2Value('insuredUnitAccountID')
      // this.setQuery2Value('insuredUnitAccount')
      // this.setQuery2Value('cashierRemake')
      // this.setQuery2Value('publicandPrivateAccount')
      // this.setQuery2Value('cashierBankTag')
      this.setQuery2Value('ownerID')
      this.setQuery2Value('bankDetailType')
      this.setQuery2Value('directionBefore')
      this.setQuery2Value('bankID')
      this.setQuery2Value('bankOwnerID')
      this.setQuery2Value('cashierMoney')
      this.setQuery2Value('cashierDirection')
      this.setQuery2Value('bankMoney')
      this.setQuery2Value('insuredUnitID')
      this.setQuery2Value('insuredUnitAccount')
      this.setQuery2Value('insuredUnitAccountID')
      this.setQuery2Value('cashierSubject')
      this.setQuery2Value('cashierSubjectID')
      this.setQuery2Value('cashierRemake')
      this.setQuery2Value('publicandPrivateAccount')
      this.setQuery2Value('cashierBankTag')


      if (this.bankMoney==='0.00'){
        this.isPay=false
      }
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




        },

      })
    }
  }
</script>

<style scoped>

</style>
