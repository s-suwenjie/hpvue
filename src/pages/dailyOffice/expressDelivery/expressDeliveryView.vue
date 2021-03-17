<template>
  <div class="f_main">
    <yhm-view-body>
      <template #title>基本信息</template>
      <template #body>
        <yhm-view-control title="签收日期" v-if="isSendTime" :content="sendTime"></yhm-view-control>
        <yhm-view-control title="寄出日期" v-else :content="sendTime"></yhm-view-control>
        <yhm-view-control title="信函分类" :content="letterClassification" :psd="letterClassificationList"></yhm-view-control>
        <yhm-view-control title="信函类型" :content="courierCompany" :psd="courierCompanyList"></yhm-view-control>
        <yhm-view-control title="是否支持在线下单" :content="orderOnline" :psd="orderOnlineList"></yhm-view-control>
        <yhm-view-control title="信函单号"  :content="letterNumber"></yhm-view-control>
        <yhm-view-control title="查单网址" color="#0b7cca" @click="inquiryURLClick()" :content="inquiryURL"></yhm-view-control>
        <yhm-view-control title="查单电话"  :content="inquiryPhone" ></yhm-view-control>
      </template>
    </yhm-view-body>
    <div class="f_split"></div>
    <yhm-view-body>
      <template #title>寄件人信息</template>
      <template #body>
        <yhm-view-control title="公司名称" :content="senderUnitID"></yhm-view-control>
        <yhm-view-control v-show="isCourierCompany" title="经办人" :content="agentName"></yhm-view-control>
        <yhm-view-control title="地址区域" :content="senderAddressName"></yhm-view-control>
        <yhm-view-control category="3" title="地址详情" :content="senderAddress"></yhm-view-control>
        <yhm-view-control title="寄件人"  :content="senderPersonName"></yhm-view-control>
        <yhm-view-control title="电话"  :content="senderPhone"></yhm-view-control>
        <yhm-view-control title="编码"  :content="senderPostcode" ></yhm-view-control>
        <yhm-view-control title="手机号"  :content="senderCellPhone" ></yhm-view-control>
        <yhm-view-control v-show="isCourierCompany" title="原寄地"  :content="senderOrigin" ></yhm-view-control>
        <yhm-view-control v-show="isCourierCompany" title="原寄地代码"  :content="senderOriginCode" ></yhm-view-control>
      </template>
    </yhm-view-body>
    <div class="f_split"></div>
    <yhm-view-body>
      <template #title>收件人信息</template>
      <template #body>
        <yhm-view-control title="公司名称" :content="recipientUnitID"></yhm-view-control>
        <yhm-view-control title="地址区域" :content="recipientAddressName"></yhm-view-control>
        <yhm-view-control category="3" title="地址详情" :content="recipientAddress"></yhm-view-control>
        <yhm-view-control title="收件人"  :content="recipientPersonName"></yhm-view-control>
        <yhm-view-control title="电话"  :content="recipientPhone"></yhm-view-control>
        <yhm-view-control title="编码"  :content="recipientPostcode" ></yhm-view-control>
        <yhm-view-control title="手机号"  :content="recipientCellPhone" ></yhm-view-control>
        <yhm-view-control v-show="isCourierCompany" title="目的地"  :content="recipientDestination" ></yhm-view-control>
        <yhm-view-control v-show="isCourierCompany" title="目的地代码"  :content="recipientCode" ></yhm-view-control>
      </template>
    </yhm-view-body>
    <div class="f_split"></div>
    <yhm-view-body>
      <template #title>收寄物内容信息</template>
      <template #body>
        <yhm-view-control title="收寄物类型" :content="receiptType" :psd="receiptTypeList"></yhm-view-control>
        <yhm-view-control title="收寄物内容" v-if="receiptType=='1'?false:true"  :content="receiptContent"></yhm-view-control>
        <yhm-view-control title="数量" :content="settlementStatus"></yhm-view-control>
      </template>
    </yhm-view-body>
    <yhm-form-list-edit v-if="this.receiptType==1?true:false">
      <template #title>收寄物内容</template>
      <template #listHead>
        <yhm-managerth style="width: 200px" title="文件名称"></yhm-managerth>
        <yhm-managerth style="width: 200px" title="文件编号"></yhm-managerth>
        <yhm-managerth style="width: 200px" title="文件数量"></yhm-managerth>
        <yhm-managerth title="文件备注"></yhm-managerth>

      </template>
      <template #listBody>
        <tr v-for="(item,index) in detailsList" :key="index" :class="{InterlacBg:index%2!==0}">
          <yhm-manager-td  :value="item.name"></yhm-manager-td>
          <yhm-manager-td  :value="item.number"></yhm-manager-td>
          <yhm-manager-td  :value="item.detailNumber"></yhm-manager-td>
          <yhm-manager-td  :value="item.remark"></yhm-manager-td>

        </tr>
      </template>
    </yhm-form-list-edit>
    <yhm-form-list-edit v-if="listDoes.length>0?true:false">
      <template #title>合并的收寄物内容</template>
      <template #listHead>
        <yhm-managerth style="width: 40px;" title="查看"></yhm-managerth>
        <yhm-managerth style="width: 200px" title="寄件人名称"></yhm-managerth>
        <yhm-managerth style="width: 200px" title="收寄物类型"></yhm-managerth>
        <yhm-managerth style="width: 200px" title="收寄物内容"></yhm-managerth>
        <yhm-managerth title="收寄物数量"></yhm-managerth>
        <yhm-managerth style="width: 80px;" title="操作"></yhm-managerth>

      </template>
      <template #listBody>
        <tr v-for="(item,index) in listDoes" :key="index" :class="{InterlacBg:index%2!==0}">
          <yhm-manager-td-look @click="doesView(item)"></yhm-manager-td-look>
          <yhm-manager-td  :value="item.does_senderPersonID"></yhm-manager-td>
          <yhm-manager-td-psd  :value="item.does_receiptType"  :list="receiptTypeList"></yhm-manager-td-psd>
          <yhm-manager-td  :value="item.does_receiptContent"></yhm-manager-td>
          <yhm-manager-td  :value="item.does_quantity"></yhm-manager-td>
          <yhm-manager-td-operate>
            <yhm-manager-td-operate-button  @click="del(item)" value="删除" icon="delete" color="#FF0000"></yhm-manager-td-operate-button>
          </yhm-manager-td-operate>
        </tr>
      </template>
    </yhm-form-list-edit>
    <div class="f_split"></div>
    <yhm-view-body>
      <template #title>费用及支付信息</template>
      <template #body>
        <yhm-view-control v-show="isCourierCompany" title="结算状态" :content="settlementStatus" :psd="settlementStatusList"></yhm-view-control>
        <yhm-view-control title="计费件数/重量" :content="billingNumber+'/'+billingWeight+'KG'"></yhm-view-control>
        <yhm-view-control title="费用" :content="cost"></yhm-view-control>
        <yhm-view-control title="结算方式"  v-if="letterClassification==0?true:false" :content="settlementMethod" :psd="settlementMethodList"></yhm-view-control>
        <yhm-view-control title="结算方式" v-else :content="settlementMethod2" :psd="settlementMethod2List"></yhm-view-control>
        <yhm-view-control title="是否报销" v-show="isMethod" :content="reimbursement" :psd="reimbursementList"></yhm-view-control>
        <yhm-view-control title="报销状态" v-show="isMethod" :content="reimbursementStatus" :psd="reimbursementStatusList"></yhm-view-control>
        <yhm-view-control title="储值卡号	" v-show="isNumber" :content="storedNumberName"></yhm-view-control>
        <yhm-view-control title="本次扣除后剩余金额" v-show="isNumber" :content="useMoney"></yhm-view-control>
        <yhm-view-control title="月结账号	" v-show="MonthlyAccount" :content="monthlyAccountName"></yhm-view-control>
        <yhm-view-control title="连同本次积累金额" v-show="MonthlyAccount" :content="accumulationMoney"></yhm-view-control>
        <yhm-view-control title="付款状态" :content="paymentStatus" :psd="paymentStatusList"></yhm-view-control>
      </template>
    </yhm-view-body>
    <div class="f_split"></div>
    <yhm-view-body>
    <template #title>收寄确认信息</template>
    <template #body>
      <yhm-view-control title="签收状态" @call="signClick()" v-if="isSign" :content="signStatus" :psd="signStatusList"></yhm-view-control>
      <yhm-view-control title="签收人" v-if="isSignPerson" :content="signPerson"></yhm-view-control>
      <yhm-view-control title="签收日期"  v-if="isSigimg" :content="signTime"></yhm-view-control>
      <yhm-view-control title="确认人" v-if="isSigimg" :content="confirmPerson"></yhm-view-control>
      <yhm-view-control title="确认日期"  v-if="isSigimg" :content="confirmTime"></yhm-view-control>
    </template>
  </yhm-view-body>
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
    name: 'expressDeliveryView',
    mixins: [viewmixin],
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
        settlementMethod2List:[],
        settlementMethod2:'',
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
        agentName:'',
        senderAddress:'',//寄件人信息地址
        senderPersonID:'',//寄件人信息寄件人
        senderPersonName:'',
        senderPhone:'',//寄件人信息电话
        senderPostcode:'',//寄件人信息编码
        senderCellPhone:'',//寄件人信息手机号
        senderOrigin:'',//寄件人信息原寄地
        senderOriginCode:'',//寄件人信息原寄地代码
        recipientUnitID:'',//收件人信息公司名称
        recipientAddress:'',//收件人信息地址
        recipientAddressName:'',//收件人信息地址
        recipientAddressID:'',//收件人信息地址ID
        recipientPersonID:'',//收件人信息收件人
        recipientPersonName:'',
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
        storedNumberName:'',//储值卡号
        useMoney:'',//本次扣除后剩余金额
        monthlyAccount:'',//月结账户
        monthlyAccountName:'',//月结账户
        accumulationMoney:'',//连同本次累计金额
        signTime:'',//签收日期
        confirmPersonID:'',//确认人
        confirmPerson:'',
        confirmTime:'',//确认日期
        signPersonID:'',//签收人
        signPerson:'',
        senderAddressID:'',
        senderAddressName:'',
        detailsList:[],
        listDoes:[],
        isAaa:true,
        defaultUnitName:'',
        defaultTrl:'',
        defaultAddressCN:'',
        isSendTime:true,
        isCourierCompany:true,
        isMethod:true,
        isNumber:true,
        MonthlyAccount:true,
        isSign:false,
        isSignPerson:true,
        isSigimg:true,
      }
    },
    methods:{
      del(item){
        let params={
          id:item.id,
        }

        this.ajaxJson({
          url: '/dailyoffice/expressDelivery/doesDel',
          data: params,
          call: (data) => {
            if (data.type === 0) {
              this.$dialog.setReturnValue(this.id)
              this.$dialog.alert({
                tipValue: data.message,
                closeCallBack: () => {
                  // this.$dialog.close()
                  this.initData()
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
      doesView(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '750',
          url: '/expressDeliveryItems?id='+item.id,
          title: '查看快递信息',
          closeCallBack: (data) => {
            if (data) {
              this.lastData = data
              this.initData()
              /*false->非初始化=>!import  true->初始化*/
            }
          }
        })
      },
      signClick(){

        if (this.signStatus==1){
          this.isSignPerson=false
          this.isSigimg=false
        } else {
          this.isSigimg=true
        }
      },
      signCall(){
        if (this.letterClassification==0){
          this.isSign=false
          this.isSignPerson=true
          this.isSigimg=true
          this.isSendTime=true
        }else {
          this.isSendTime=false
          this.isSign=true
          this.isSignPerson=false
          this.isSigimg=false
          this.signClick()

        }
      },
      editBtn(){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '750',
          url: '/expressDeliveryForm?id='+this.id+'&type=1',
          title: '查看快递信息',
          closeCallBack: (data) => {
            if (data) {
              this.lastData = data
              this.initPageData(false)
              /*false->非初始化=>!import  true->初始化*/
            }
          }
        })
      },

      inquiryURLClick(){
        window.open('http://'+this.inquiryURL)
      },
      initData(){
        let params = {
          id: this.id
        }
        this.init({
          url: '/dailyoffice/expressDelivery/initForm',
          data: params,
          call: (data)=>{
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
            this.settlementMethod2List = data.settlementMethod2Psd.list
            this.settlementMethod2  = data.settlementMethod2Psd.value
            this.reimbursementList = data.reimbursementPsd.list
            this.reimbursement  = data.reimbursementPsd.value
            this.paymentStatusList = data.paymentStatusPsd.list
            this.paymentStatus  = data.paymentStatusPsd.value
            this.signStatusList = data.signStatusPsd.list
            this.signStatus  = data.signStatusPsd.value
            this.reimbursementStatusList = data.reimbursementStatusPsd.list
            this.reimbursementStatus  = data.reimbursementStatusPsd.value

            if (this.settlementMethod==3){
              this.isAaa=false
            }
            this.sendTime=data.sendTime,//签收日期
              this.letterNumber=data.letterNumber,//信函单号
              this.inquiryURL=data.inquiryURL,//查单网址
              this.inquiryPhone=data.inquiryPhone,//查单电话
              this.senderUnitID=data.senderUnitID   ,//寄件人信息公司名称
              this.agentID=data.agentID,//寄件人信息经办人
              this.agentName=data.agentName,//寄件人信息经办人
              this.senderAddressID=data.senderAddressID
              this.senderAddressName=data.senderAddressName
              this.senderAddress=data.senderAddress,//寄件人信息地址
              this.senderPersonID=data.senderPersonID,//寄件人信息寄件人
              this.senderPersonName=data.senderPersonName,//寄件人信息寄件人
              this.senderPhone=data.senderPhone,//寄件人信息电话
              this.senderPostcode=data.senderPostcode,//寄件人信息编码
              this.senderCellPhone=data.senderCellPhone,//寄件人信息手机号
              this.senderOrigin=data.senderOrigin,//寄件人信息原寄地
              this.senderOriginCode=data.senderOriginCode,//寄件人信息原寄地代码
              this.recipientUnitID=data.recipientUnitID,//收件人信息公司名称
              this.recipientAddressID=data.recipientAddressID,
              this.recipientAddressName=data.recipientAddressName,
              this.recipientAddress=data.recipientAddress,//收件人信息地址
              this.recipientPersonID=data.recipientPersonID,//收件人信息收件人
              this.recipientPersonName=data.recipientPersonName,//收件人信息收件人
              this.recipientPhone=data.recipientPhone,//收件人信息电话
              this.recipientPostcode=data.recipientPostcode,//收件人信息编码
              this.recipientCellPhone=data.recipientCellPhone,//收件人信息手机号
              this.recipientDestination=data.recipientDestination,//收件人信息目的地
              this.recipientCode=data.recipientCode,//收件人信息目的地代码
              this.receiptContent=data.receiptContent,//收寄物内容
              this.quantity=data.quantity,//收寄物数量
              this.settlementStatus=data.settlementStatus,//收寄物信息数量
              this.billingNumber=data.billingNumber,//费用及支付信息数量
              this.billingWeight=data.billingWeight,//费用及支付信息重量
              this.cost=data.cost,//费用及支付信息费用
              this.storedNumber=data.storedNumber,//储值卡号
              this.storedNumberName=data.storedNumberName,//储值卡号
              this.useMoney=data.useMoney,//本次扣除后剩余金额
              this.monthlyAccount=data.monthlyAccount,//月结账户
              this.monthlyAccountName=data.monthlyAccountName,//月结账户
              this.accumulationMoney=data.accumulationMoney,//连同本次累计金额
              this.confirmPerson=data.confirmPerson,//确认人
              this.confirmPersonID=data.confirmPersonID,//确认人
              this.confirmTime=data.confirmTime,//确认日期
              this.signPerson=data.signPerson
              this.signPersonID=data.signPersonID//签收人
              this.settlementMethod=data.settlementMethod
              this.detailsList=data.detailsList
              this.listDoes=data.listDoes ||[]
              this.signCall()



            if (this.courierCompany==0){
              this.isCourierCompany=false

            } else{
              this.isCourierCompany=true
            }
            if (this.settlementMethod==0){
              this.isMethod=true,
                this.isNumber=false,
                this.MonthlyAccount=false
            } else if (this.settlementMethod==1){
              this.isMethod=false,
                this.isNumber=true,
                this.MonthlyAccount=false
            } else if (this.settlementMethod==2){
              this.isMethod=false,
                this.isNumber=false,
                this.MonthlyAccount=true
            } else if (this.settlementMethod==3){
              this.isMethod=false,
                this.isNumber=false,
                this.MonthlyAccount=false
            }

          }
        })
      }
    },
    created(){
      this.setQuery2Value('id')
      this.initData()
    },
  }
</script>

<style scoped>

</style>
