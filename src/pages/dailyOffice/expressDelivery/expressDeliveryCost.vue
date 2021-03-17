<template>
  <div class="f_main">
    <yhm-formbody>
      <template #title>费用及支付信息</template>
      <template #control>
        <yhm-form-radio title="结算状态	" :select-list="settlementStatusList" @call="settlementCall()" :value="settlementStatus" id="settlementStatus" ></yhm-form-radio>
        <yhm-form-zh-text-two tip-before="value" v-if="isSettlement"   :before="billingNumber" before-id="billingNumber" :after="billingWeight" after-id="billingWeight"  title="计费件数" subtitle=""  after-title="重量(KG)" after-width="140"></yhm-form-zh-text-two>
        <yhm-form-text placeholder=""  title="费用"  v-if="isSettlement"  subtitle="" :value="cost" id="cost"></yhm-form-text>
        <yhm-form-radio title="结算方式	" @call="methodCall()" v-if="isSettlement"  :select-list="settlementMethodList" :value="settlementMethod" id="settlementMethod" ></yhm-form-radio>
        <yhm-form-radio title="是否报销	" @call="reimbursementCall()" v-if="isMethodCall" :select-list="reimbursementList" :value="reimbursement" id="reimbursement" ></yhm-form-radio>
        <yhm-form-radio title="报销状态	" no-edit="1" v-if="isMethodCall" :select-list="reimbursementStatusList" :value="reimbursementStatus" id="reimbursementStatus" ></yhm-form-radio>
        <yhm-form-text placeholder=""  v-if="istored"   title="储值卡号" subtitle="" :value="storedNumber" id="storedNumber"></yhm-form-text>
        <yhm-form-text placeholder=""  v-if="ismonthly"  title="月结账户" subtitle="" :value="monthlyAccount" id="monthlyAccount"></yhm-form-text>
        <yhm-form-text placeholder=""  v-if="istored"  title="本次扣除后 " subtitle="剩余金额" :value="useMoney" id="useMoney"></yhm-form-text>
        <yhm-form-text placeholder=""  v-if="ismonthly" title="连同本次 " subtitle="累计金额	" :value="accumulationMoney" id="accumulationMoney"></yhm-form-text>
        <yhm-form-radio title="付款状态	" no-edit="1" :select-list="paymentStatusList" :value="paymentStatus" id="paymentStatus" ></yhm-form-radio>
      </template>
    </yhm-formbody>
    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn>
        <yhm-commonbutton value="暂存" icon="btnSave" :flicker="true" @call="save()"></yhm-commonbutton>
        <yhm-commonbutton value="下一步" icon="btnSave" :flicker="true" @call="nextStep()"></yhm-commonbutton>
      </template>
    </yhm-formoperate>
  </div>
</template>

<script>
  import { formmixin } from '@/assets/form.js'
  import { accMul, accAdd, guid, formatDate, number2chinese,formatTime ,formatPhone, formatIdNo,} from '@/assets/common.js'
  export default {
    name: 'expressDeliveryCost',
    mixins: [formmixin],
    data(){
      return{
        id:'',
        letterClassificationList:[], // 信函分类
        letterClassification:'',
        letterTypeList:[], //信函类别
        letterType:'',
        orderOnlineList:[], //
        orderOnline:'',
        courierCompanyList:[], //信函类型
        courierCompany:'',
        receiptTypeList:[],//收寄物类型
        receiptType:'',
        settlementStatusList:[],
        settlementStatus:'',
        settlementMethodList:[],//结算方式
        settlementMethod:'',
        reimbursementList:[], //是否报销
        reimbursement:'',
        paymentStatusList:[],//付款状态
        paymentStatus:'',
        signStatusList:[],//签收状态
        signStatus:'',
        reimbursementStatusList:[],//报销状态
        reimbursementStatus:'',
        sendTime:'',//签收日期
        letterNumber:'',//信函单号
        inquiryURL:'',//查单网址
        inquiryPhone:'',//查单电话
        senderUnitID:'',//寄件人信息公司名称
        agentID:'',//寄件人信息经办人
        senderAddress:'',//寄件人信息地址
        senderPersonID:'',//寄件人信息寄件人
        senderPhone:'',//寄件人信息电话
        senderPostcode:'',//寄件人信息编码
        senderCellPhone:'',//寄件人信息手机号
        senderOrigin:'',//寄件人信息原寄地
        senderOriginCode:'',//寄件人信息原寄地代码
        recipientUnitID:'',//收件人信息公司名称
        recipientAddress:'',//收件人信息地址
        recipientPersonID:'',//收件人信息收件人
        recipientPhone:'',//收件人信息电话
        recipientPostcode:'',//收件人信息编码
        recipientCellPhone:'',//收件人信息手机号
        recipientDestination:'',//收件人信息目的地
        recipientCode:'',//收件人信息目的地代码
        receiptContent:'',//收寄物内容
        settlementStatus:'',//收寄物信息数量
        billingNumber:'',//费用及支付信息数量
        billingWeight:'',//费用及支付信息重量
        cost:'',//费用及支付信息费用
        storedNumber:'',//储值卡号
        useMoney:'',//本次扣除后剩余金额
        monthlyAccount:'',//月结账户
        accumulationMoney:'',//连同本次累计金额
        signTime:'',//签收日期
        confirmPersonID:'',//确认人
        confirmTime:'',//确认日期
        signPersonID:'',//签收人
        senderAddressID:'',
        senderAddressName:'',
        isLetter:false,
        isLetterEdit:'',
        isSettlement:false,
        isMethodCall:false,
        istored:false,
        ismonthly:false
      }
    },
    methods:{
      nextStep(){
        let params={
          id:this.id,
          settlementStatus:this.settlementStatus,
          billingNumber:this.billingNumber,
          billingWeight:this.billingWeight,
          cost:this.cost,
          settlementMethod:this.settlementMethod,
          reimbursement:this.reimbursement,
          reimbursementStatus:this.reimbursementStatus,
          storedNumber:this.storedNumber,
          monthlyAccount:this.monthlyAccount,
          useMoney:this.useMoney,
          accumulationMoney:this.accumulationMoney,
          paymentStatus:this.paymentStatus
        }

        this.ajaxJson({
          url: '/dailyoffice/expressDelivery/updateCost',
          data: params,
          call: (data) => {
            if (data.type === 0) {
              this.$dialog.OpenWindow({
                width: '1050',
                height: '750',
                url: '/expressDeliveryConfirm?id='+this.id,
                title: '添加快递信息',
                closeCallBack: (data) => {
                  if (data) {
                    this.lastData = data
                    this.initPageData(false)
                    /*false->非初始化=>!import  true->初始化*/
                  }
                }
              })
            }else{
              this.$dialog.alert({
                alertImg:'warn',
                tipValue: data.message
              })
            }
          }
        })
      },
      save(){
        let params={
          id:this.id,
          settlementStatus:this.settlementStatus,
          billingNumber:this.billingNumber,
          billingWeight:this.billingWeight,
          cost:this.cost,
          settlementMethod:this.settlementMethod,
          reimbursement:this.reimbursement,
          reimbursementStatus:this.reimbursementStatus,
          storedNumber:this.storedNumber,
          monthlyAccount:this.monthlyAccount,
          useMoney:this.useMoney,
          accumulationMoney:this.accumulationMoney,
          paymentStatus:this.paymentStatus
        }

        this.ajaxJson({
          url: '/dailyoffice/expressDelivery/updateCost',
          data: params,
          call: (data) => {
            if (data.type === 0) {
              this.$dialog.setReturnValue(this.id)
              this.$dialog.alert({
                tipValue: data.message,
                closeCallBack: () => {
                  this.$dialog.close()
                }
              })
            }else{
              this.$dialog.alert({
                alertImg:'warn',
                tipValue: data.message
              })
            }
          }
        })
      },
      reimbursementCall(){
        if (this.reimbursement==1){
          this.reimbursementStatus=1
        }else {
          this.reimbursementStatus=0
        }
      },
      settlementCall(){
        if (this.settlementStatus==1){
          this.isSettlement=true
        } else (
          this.isSettlement=false,
          this.isMethodCall=false
        )
        if (this.settlementMethod==1 &&this.settlementStatus==1){
          this.istored=true
        }else {
          this.istored=false
          this.ismonthly=false
        }
      },
      methodCall(){
        if (this.settlementMethod==0){
          this.isMethodCall=true
          this.ismonthly=false
          this.istored=false
          this.paymentStatus='0'
        }else {
          this.isMethodCall=false
        }
        if (this.settlementMethod==2){
          this.ismonthly=true
          this.istored=false
          this.paymentStatus='1'
        }else if (this.settlementMethod!=0){
          this.ismonthly=false
          this.istored=true
          this.paymentStatus='0'
        }
      },
    },
    created(){
      this.setQuery2Value('id')
      this.init({
        url: '/dailyoffice/expressDelivery/initForm',
        all: (data) => {
          this.letterClassificationList = data.letterClassificationPsd.list
          this.letterClassification = data.letterClassificationPsd.value

          this.letterTypeList = data.letterTypePsd.list
          this.letterType  = data.letterTypePsd.value

          this.orderOnlineList = data.orderOnlinePsd.list
          this.orderOnline  = data.orderOnlinePsd.value

          this.courierCompanyList = data.courierCompanyPsd.list
          this.courierCompany  = data.courierCompanyPsd.value

          this.receiptTypeList = data.receiptTypePsd.list
          this.receiptType  = data.receiptTypePsd.value
          this.settlementStatusList = data.settlementStatusPsd.list
          this.settlementStatus  = data.settlementStatusPsd.value
          this.settlementMethodList = data.settlementMethodPsd.list
          this.settlementMethod  = data.settlementMethodPsd.value

          this.reimbursementList = data.reimbursementPsd.list
          this.reimbursement  = data.reimbursementPsd.value
          this.paymentStatusList = data.paymentStatusPsd.list
          this.paymentStatus  = data.paymentStatusPsd.value
          this.signStatusList = data.signStatusPsd.list
          this.signStatus  = data.signStatusPsd.value
          this.reimbursementStatusList = data.reimbursementStatusPsd.list
          this.reimbursementStatus  = data.reimbursementStatusPsd.value



        },
        add: (data) => {
          /* 需要添加的数据 */
        },
        look: (data) => {
          /* 需要查看的数据 */
          // settlementStatus:this.settlementStatus,
            this.billingNumber=data.billingNumber,
            this.billingWeight=data.billingWeight,
            this.cost=data.cost,
            // settlementMethod:this.settlementMethod,
            // reimbursement:this.reimbursement,
            // reimbursementStatus:this.reimbursementStatus,
            this.storedNumber=data.storedNumber,
            this.monthlyAccount=data.monthlyAccount,
            this.useMoney=data.useMoney,
            this.accumulationMoney=data.accumulationMoney
            // paymentStatus:this.paymentStatus
        }
      })
    }

  }
</script>

<style scoped>

</style>
