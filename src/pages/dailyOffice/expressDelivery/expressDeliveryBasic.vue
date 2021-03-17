<template>
  <div class="f_main">
    <yhm-formbody>
      <template #title>基本信息</template>
      <template #control>
        <yhm-form-date placeholder=""  title="签收日期" subtitle="" :value="sendTime" id="sendTime"></yhm-form-date>
        <yhm-form-radio title="信函分类"  @call="letterClassificationEvent()" :select-list="letterClassificationList" :value="letterClassification" id="letterClassification" ></yhm-form-radio>
        <yhm-form-radio title="信函类别	" no-edit="1" @call="letterTypeEvent()" :select-list="letterTypeList" :value="letterType" id="letterType" ></yhm-form-radio>
        <yhm-form-radio title="信函类型" @call="courierEvent()" width="1" :select-list="courierCompanyList" :value="courierCompany" id="courierCompany" ></yhm-form-radio>
        <yhm-form-radio title="是否支持"  v-show="isLetter" @call="orderOnlineEvent()" subtitle="在线下单" :select-list="orderOnlineList" :value="orderOnline" id="orderOnline" ></yhm-form-radio>
        <yhm-form-text placeholder=""  :no-edit="isLetterEdit" title="信函单号" subtitle="" :value="letterNumber" id="letterNumber"></yhm-form-text>
        <yhm-form-text placeholder=""  v-show="isLetter" title="查单网址" subtitle="" :no-edit="true"  :value="inquiryURL" id="inquiryURL"></yhm-form-text>
        <yhm-form-text placeholder=""  v-show="isLetter" title="查单电话" subtitle="" :no-edit="true" :value="inquiryPhone" id="inquiryPhone"></yhm-form-text>
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
    name: 'expressDeliveryBasic',
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
        // settlementStatusList:[],
        // settlementStatus:'',
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
        sendTime:formatDate( new Date((new Date()).getTime())),//签收日期
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
        billingWeight:'0.00',//费用及支付信息重量
        cost:'',//费用及支付信息费用
        storedNumber:'',//储值卡号
        useMoney:'',//本次扣除后剩余金额
        monthlyAccount:'',//月结账户
        accumulationMoney:'',//连同本次累计金额
        signTime:'',//签收日期
        confirmPersonID:'',//确认人
        signPersonID:'',//签收人
        confirmTime:'',//确认日期
        senderAddressID:'',
        senderAddressName:'',
        isLetter:false,
        isLetterEdit:''


      }
    },
    methods: {
      nextStep(){
        if (this.letterClassification==0){
          this.signStatus='0'
        } else {
          this.signStatus='1'
        }

        let params = {
          id: this.id,
          sendTime:this.sendTime,
          letterClassification:this.letterClassification,
          letterType:this.letterType,
          courierCompanyID:this.courierCompany,
          orderOnline:this.orderOnline,
          letterNumber:this.letterNumber,

          senderUnitID:this.senderUnitID,
          agentID:this.agentID,
          senderAddressID:this.senderAddressID,
          senderAddress:this.senderAddress,
          senderPersonID:this.senderPersonID,
          senderPhone:this.senderPhone,
          senderPostcode:this.senderPostcode,
          senderCellPhone:this.senderCellPhone,
          senderOrigin:this.senderOrigin,
          senderOriginCode:this.senderOriginCode,
          recipientUnitID:this.recipientUnitID,
          recipientAddressID:this.recipientAddressID,
          recipientAddress:this.recipientAddress,
          recipientPersonID:this.recipientPersonID,
          recipientPhone:this.recipientPhone,
          recipientPostcode:this.recipientPostcode,
          recipientCellPhone:this.recipientCellPhone,
          recipientDestination:this.recipientDestination,
          recipientCode:this.recipientCode,
          receiptType:this.receiptType,
          receiptContent:this.receiptContent,
          settlementStatus:this.settlementStatus,
          billingNumber:this.billingNumber,
          billingWeight:this.billingWeight,
          cost:this.cost,
          settlementMethod:this.settlementMethod,
          reimbursement:this.reimbursement,
          reimbursementStatus:this.reimbursementStatus,
          storedNumber:this.storedNumber,
          useMoney:this.useMoney,
          monthlyAccount:this.monthlyAccount,
          accumulationMoney:this.accumulationMoney,
          paymentStatus:this.paymentStatus,
          signStatus:this.signStatus,
          signTime:this.signTime,
          confirmPersonID:this.confirmPersonID,
          signPersonID:this.signPersonID,
          confirmTime:this.confirmTime,


        }
        this.ajaxJson({
          url: '/dailyoffice/expressDelivery/save',
          data: params,
          call: (data) => {
            if (data.type === 0) {
              this.$dialog.OpenWindow({
                width: '1050',
                height: '750',
                url: '/expressDeliverySend?id='+this.id+'&letterClassification='+this.letterClassification+'&letterType='+this.letterType+'&orderOnline='+this.orderOnline,
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
        if (this.letterClassification==0){
          this.signStatus=0
        } else {
          this.signStatus=1
        }
        let params = {
          id: this.id,
          sendTime:this.sendTime,
          letterClassification:this.letterClassification,
          letterType:this.letterType,
          courierCompanyID:this.courierCompany,
          orderOnline:this.orderOnline,
          letterNumber:this.letterNumber,

          senderUnitID:this.senderUnitID,
          agentID:this.agentID,
          senderAddressID:this.senderAddressID,
          senderAddress:this.senderAddress,
          senderPersonID:this.senderPersonID,
          senderPhone:this.senderPhone,
          senderPostcode:this.senderPostcode,
          senderCellPhone:this.senderCellPhone,
          senderOrigin:this.senderOrigin,
          senderOriginCode:this.senderOriginCode,
          recipientUnitID:this.recipientUnitID,
          recipientAddressID:this.recipientAddressID,
          recipientAddress:this.recipientAddress,
          recipientPersonID:this.recipientPersonID,
          recipientPhone:this.recipientPhone,
          recipientPostcode:this.recipientPostcode,
          recipientCellPhone:this.recipientCellPhone,
          recipientDestination:this.recipientDestination,
          recipientCode:this.recipientCode,
          receiptType:this.receiptType,
          receiptContent:this.receiptContent,
          settlementStatus:this.settlementStatus,
          billingNumber:this.billingNumber,
          billingWeight:this.billingWeight,
          cost:this.cost,
          settlementMethod:this.settlementMethod,
          reimbursement:this.reimbursement,
          reimbursementStatus:this.reimbursementStatus,
          storedNumber:this.storedNumber,
          useMoney:this.useMoney,
          monthlyAccount:this.monthlyAccount,
          accumulationMoney:this.accumulationMoney,
          paymentStatus:this.paymentStatus,
          signStatus:this.signStatus,
          signTime:this.signTime,
          confirmPersonID:this.confirmPersonID,
          signPersonID:this.signPersonID,
          confirmTime:this.confirmTime,


        }
        this.ajaxJson({
          url: '/dailyoffice/expressDelivery/save',
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
      letterClassificationEvent () {
        if (this.letterClassification == 0) {
          this.isLetter = false
          this.isLetterEdit = ''
        } else {
          this.isLetter = true
          this.isLetterEdit = '1'
        }
        // this.orderOnlineEvent()
      },
      letterTypeEvent () {
        if (this.letterType == 1) {
          this.orderOnline = '1'
        }
      },
      orderOnlineEvent () {
        if (this.orderOnline == 1) {
          this.isLetterEdit = ''
        } else {
          this.isLetterEdit = '1'
        }
      },
      courierEvent () {

        let param = {
          id: this.courierCompany
        }
        this.ajaxJson({
          url: '/dailyoffice/expressCompany/initForm',
          data: param,
          call: (data) => {
            this.inquiryURL = data.inquiryURL
            this.inquiryPhone = data.inquiryPhone
            if (this.letterType == 1) {
              this.orderOnline = '1'
            } else {
              this.orderOnline = data.orderOnline
            }
            if (this.letterClassification==1){
              this.orderOnlineEvent()
            }
          }
        })
       
      },
    },
    created(){
      this.setQuery2Value('copy')
      this.setQuery2Value('id')
      let params = {}
      if (this.copy!=''){
        params={
          copy:this.copy
        }
      }
      this.init({
        url: '/dailyoffice/expressDelivery/initForm',
        data:params,
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
          // this.settlementStatusList = data.settlementStatusPsd.list
          // this.settlementStatus  = data.settlementStatusPsd.value
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
            this.sendTime=data.sendTime,
            // this.letterClassification=data.letterClassification,
            // this.letterType=data.letterType,
            // this.courierCompanyID=data.courierCompany,
            // this.orderOnline=data.orderOnline,
            this.letterNumber=data.letterNumber
        }
      })
    }
  }
</script>

<style scoped>

</style>
