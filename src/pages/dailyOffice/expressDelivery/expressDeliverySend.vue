<template>
  <div class="f_main">
    <yhm-formbody>
      <template #title>寄件人信息</template>
      <template #control>
        <yhm-form-text placeholder="直接录入或者点击后面图标选择公司"  title="公司名称" subtitle="" :value="senderUnitID" id="senderUnitID">
          <div class="formBoxIcon" @click="senderUnitClick">
            <svg t="1602226869435"  class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2092" width="30" height="30" style="margin: auto;"><path d="M502.2 393.6m-163 0a163 163 0 1 0 326 0 163 163 0 1 0-326 0Z" fill="#AED7FF" p-id="2093"></path><path d="M197.5 363.4c0.1-1.4 0.2-2.7 0.3-4.1 12-147.5 137.4-263.1 285.6-263.1 151.5 0 275.8 118.2 285.9 267.2h20c-10-160-143.3-287.2-305.9-287.2-158.5 0-292.7 123.6-305.5 281.4-0.2 1.9-0.3 3.8-0.4 5.7h20zM768.1 414.9c-16 142.9-137.6 254.4-284.7 254.4s-268.6-109-284.7-254.4h-20.1c16.3 156.6 146.7 274.4 304.8 274.4 158.2 0 288.7-120.4 304.8-274.4h-20.1z" fill="#108EE9" p-id="2094"></path><path d="M483.4 160.3c-122.7 0-222.5 99.8-222.5 222.5s99.8 222.5 222.5 222.5 222.5-99.8 222.5-222.5c-0.1-122.7-99.9-222.5-222.5-222.5z m0 407.4c-102.1 0-184.9-82.8-184.9-184.9 0-102.1 82.8-184.9 184.9-184.9s184.9 82.8 184.9 184.9c0 102.1-82.8 184.9-184.9 184.9z" fill="#108EE9" p-id="2095"></path><path d="M483.4 510.7c-70.5 0-127.9-57.4-127.9-127.9s57.4-127.9 127.9-127.9 127.9 57.4 127.9 127.9-57.4 127.9-127.9 127.9z m0-209.3c-44.9 0-81.4 36.5-81.4 81.4s36.5 81.4 81.4 81.4c44.9 0 81.4-36.5 81.4-81.4s-36.6-81.4-81.4-81.4z" fill="#108EE9" p-id="2096"></path><path d="M433.2 563.8c0-51.5-0.2-103.1 0.1-154.6 0.2-36.1 18-57 48.2-57.2 32.1-0.2 54 22.6 54.2 57.8 0.4 57.4 0 114.8 0.2 172.2 0.1 30.5 7 38 39.5 40.9 65.3 5.7 130.6 11.1 195.9 16 41.3 3.1 57.7 20.5 49.6 58.2-16.4 76.4-34.4 152.6-51.1 228.9-4.5 20.8-18.2 30.5-39.7 31.4-29.5 1.3-59.1 2-88.7 2.1-83.2 0.3-166.4 0.2-249.6 0-32.3 0-42.7-6.7-52.8-34.7-27.9-77.3-55.5-154.7-83.2-232-8.1-22.5 4-47.3 27.4-56 22.2-8.2 52.7 2.8 62.4 24.2 11 24.4 21 49.3 30.1 74.3 5.4 14.8 13.6 26.7 31.6 24 19.2-3 26.3-16.8 26.2-34.4-0.5-53.7-0.4-107.4-0.3-161.1z" fill="#1195FE" p-id="2097"></path></svg>
          </div>
        </yhm-form-text>
        <yhm-form-text placeholder="直接录入或者点击后面图标选择"  v-show="isLetter" title="经办人" subtitle="" :value="agentID" id="agentID">
          <div class="formBoxIcon" @click="agentIDClick">
            <svg t="1602226869435"  class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2092" width="30" height="30" style="margin: auto;"><path d="M502.2 393.6m-163 0a163 163 0 1 0 326 0 163 163 0 1 0-326 0Z" fill="#AED7FF" p-id="2093"></path><path d="M197.5 363.4c0.1-1.4 0.2-2.7 0.3-4.1 12-147.5 137.4-263.1 285.6-263.1 151.5 0 275.8 118.2 285.9 267.2h20c-10-160-143.3-287.2-305.9-287.2-158.5 0-292.7 123.6-305.5 281.4-0.2 1.9-0.3 3.8-0.4 5.7h20zM768.1 414.9c-16 142.9-137.6 254.4-284.7 254.4s-268.6-109-284.7-254.4h-20.1c16.3 156.6 146.7 274.4 304.8 274.4 158.2 0 288.7-120.4 304.8-274.4h-20.1z" fill="#108EE9" p-id="2094"></path><path d="M483.4 160.3c-122.7 0-222.5 99.8-222.5 222.5s99.8 222.5 222.5 222.5 222.5-99.8 222.5-222.5c-0.1-122.7-99.9-222.5-222.5-222.5z m0 407.4c-102.1 0-184.9-82.8-184.9-184.9 0-102.1 82.8-184.9 184.9-184.9s184.9 82.8 184.9 184.9c0 102.1-82.8 184.9-184.9 184.9z" fill="#108EE9" p-id="2095"></path><path d="M483.4 510.7c-70.5 0-127.9-57.4-127.9-127.9s57.4-127.9 127.9-127.9 127.9 57.4 127.9 127.9-57.4 127.9-127.9 127.9z m0-209.3c-44.9 0-81.4 36.5-81.4 81.4s36.5 81.4 81.4 81.4c44.9 0 81.4-36.5 81.4-81.4s-36.6-81.4-81.4-81.4z" fill="#108EE9" p-id="2096"></path><path d="M433.2 563.8c0-51.5-0.2-103.1 0.1-154.6 0.2-36.1 18-57 48.2-57.2 32.1-0.2 54 22.6 54.2 57.8 0.4 57.4 0 114.8 0.2 172.2 0.1 30.5 7 38 39.5 40.9 65.3 5.7 130.6 11.1 195.9 16 41.3 3.1 57.7 20.5 49.6 58.2-16.4 76.4-34.4 152.6-51.1 228.9-4.5 20.8-18.2 30.5-39.7 31.4-29.5 1.3-59.1 2-88.7 2.1-83.2 0.3-166.4 0.2-249.6 0-32.3 0-42.7-6.7-52.8-34.7-27.9-77.3-55.5-154.7-83.2-232-8.1-22.5 4-47.3 27.4-56 22.2-8.2 52.7 2.8 62.4 24.2 11 24.4 21 49.3 30.1 74.3 5.4 14.8 13.6 26.7 31.6 24 19.2-3 26.3-16.8 26.2-34.4-0.5-53.7-0.4-107.4-0.3-161.1z" fill="#1195FE" p-id="2097"></path></svg>
          </div>
        </yhm-form-text>

        <yhm-form-select  title="地址区域" tip="value"   @click="senderAddressClick" :value="senderAddressName" id="senderAddressName" rule="R0000"></yhm-form-select>
        <yhm-form-textarea placeholder="请输入详情地址，港澳台及国际地址请填写完整信息"  title="地址详情" subtitle="" :value="senderAddress" id="senderAddress"></yhm-form-textarea>
        <yhm-form-text placeholder="直接录入或者双击选择"  title="寄件人" subtitle="" :value="senderPersonID" id="senderPersonID">
          <div class="formBoxIcon" @click="senderPersonClick">
            <svg t="1602226869435"  class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2092" width="30" height="30" style="margin: auto;"><path d="M502.2 393.6m-163 0a163 163 0 1 0 326 0 163 163 0 1 0-326 0Z" fill="#AED7FF" p-id="2093"></path><path d="M197.5 363.4c0.1-1.4 0.2-2.7 0.3-4.1 12-147.5 137.4-263.1 285.6-263.1 151.5 0 275.8 118.2 285.9 267.2h20c-10-160-143.3-287.2-305.9-287.2-158.5 0-292.7 123.6-305.5 281.4-0.2 1.9-0.3 3.8-0.4 5.7h20zM768.1 414.9c-16 142.9-137.6 254.4-284.7 254.4s-268.6-109-284.7-254.4h-20.1c16.3 156.6 146.7 274.4 304.8 274.4 158.2 0 288.7-120.4 304.8-274.4h-20.1z" fill="#108EE9" p-id="2094"></path><path d="M483.4 160.3c-122.7 0-222.5 99.8-222.5 222.5s99.8 222.5 222.5 222.5 222.5-99.8 222.5-222.5c-0.1-122.7-99.9-222.5-222.5-222.5z m0 407.4c-102.1 0-184.9-82.8-184.9-184.9 0-102.1 82.8-184.9 184.9-184.9s184.9 82.8 184.9 184.9c0 102.1-82.8 184.9-184.9 184.9z" fill="#108EE9" p-id="2095"></path><path d="M483.4 510.7c-70.5 0-127.9-57.4-127.9-127.9s57.4-127.9 127.9-127.9 127.9 57.4 127.9 127.9-57.4 127.9-127.9 127.9z m0-209.3c-44.9 0-81.4 36.5-81.4 81.4s36.5 81.4 81.4 81.4c44.9 0 81.4-36.5 81.4-81.4s-36.6-81.4-81.4-81.4z" fill="#108EE9" p-id="2096"></path><path d="M433.2 563.8c0-51.5-0.2-103.1 0.1-154.6 0.2-36.1 18-57 48.2-57.2 32.1-0.2 54 22.6 54.2 57.8 0.4 57.4 0 114.8 0.2 172.2 0.1 30.5 7 38 39.5 40.9 65.3 5.7 130.6 11.1 195.9 16 41.3 3.1 57.7 20.5 49.6 58.2-16.4 76.4-34.4 152.6-51.1 228.9-4.5 20.8-18.2 30.5-39.7 31.4-29.5 1.3-59.1 2-88.7 2.1-83.2 0.3-166.4 0.2-249.6 0-32.3 0-42.7-6.7-52.8-34.7-27.9-77.3-55.5-154.7-83.2-232-8.1-22.5 4-47.3 27.4-56 22.2-8.2 52.7 2.8 62.4 24.2 11 24.4 21 49.3 30.1 74.3 5.4 14.8 13.6 26.7 31.6 24 19.2-3 26.3-16.8 26.2-34.4-0.5-53.7-0.4-107.4-0.3-161.1z" fill="#1195FE" p-id="2097"></path></svg>
          </div>
        </yhm-form-text>
        <yhm-form-text placeholder="请输入电话号码"  title="电话" subtitle="" :value="senderPhone" id="senderPhone"></yhm-form-text>
        <yhm-form-text placeholder="邮政编码"  title="编码" no-edit="1" subtitle="" :value="senderPostcode" id="senderPostcode"></yhm-form-text>
        <yhm-form-text placeholder="11位手机号码"  title="手机号" subtitle="" :value="senderCellPhone" id="senderCellPhone"></yhm-form-text>
        <yhm-form-select  title="原寄地"   @click="senderOriginClick" :value="senderOrigin" id="senderOrigin" rule="R0000"></yhm-form-select>
        <yhm-form-text placeholder=""  v-show="isLetter" no-edit="1" title="原寄地代码" subtitle="" :value="senderOriginCode" id="senderOriginCode"></yhm-form-text>
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
    name: 'expressDeliverySend',
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
    methods:{
      letterClassificationEvent(){
        if (this.letterClassification==0 ){
          this.isLetter=false
          this.isLetterEdit=''
        } else {
          this.isLetter = true
          this.isLetterEdit='1'
        }
        this.orderOnlineEvent()
      },
      letterTypeEvent(){
        if (this.letterType==1){
          this.orderOnline='1'

        }
      },
      orderOnlineEvent(){
        if (this.orderOnline==1){
          this.isLetterEdit=''
        }else {
          this.isLetterEdit='1'
        }
      },
      senderOriginClick(){
        this.$dialog.OpenWindow({
          width: 950,
          height: 603,
          url: '/selectDic?name=20' ,
          title: '选择原寄地代码',
          closeCallBack: (data) => {
            if (data) {
              // this.recipientAddressID=data.id
              this.senderOrigin = data.showName
              this.senderOriginCode=data.value1
            }
          }
        })
      },
      nextStep(){
        let params={
          id:this.id,
          senderUnitID:this.senderUnitID,
          agentID:this.agentID,
          senderAddressName:this.senderAddressName,
          senderAddress:this.senderAddress,
          senderPersonID:this.senderPersonID,
          senderPhone:this.senderPhone,
          senderPostcode:this.senderPostcode,
          senderCellPhone:this.senderCellPhone,
          senderOrigin:this.senderOrigin,
          senderOriginCode:this.senderOriginCode
        }
        this.ajaxJson({
          url: '/dailyoffice/expressDelivery/updateSend',
          data: params,
          call: (data) => {
            if (data.type === 0) {
              this.$dialog.OpenWindow({
                width: '1050',
                height: '750',
                url: '/expressDeliveryRecipient?id='+this.id+'&letterClassification='+this.letterClassification+'&letterType='+this.letterType+'&orderOnline='+this.orderOnline,
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
          senderUnitID:this.senderUnitID,
          agentID:this.agentID,
          senderAddressName:this.senderAddressName,
          senderAddress:this.senderAddress,
          senderPersonID:this.senderPersonID,
          senderPhone:this.senderPhone,
          senderPostcode:this.senderPostcode,
          senderCellPhone:this.senderCellPhone,
          senderOrigin:this.senderOrigin,
          senderOriginCode:this.senderOriginCode
        }
        this.ajaxJson({
          url: '/dailyoffice/expressDelivery/updateSend',
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
      senderUnitClick(){
        this.$dialog.OpenWindow({
          width: 950,
          height: 692,
          url: '/selectUnit?category=1',
          title: '选择公司',
          closeCallBack: (data) => {
            if (data) {
              // this.senderUnitID=data.id
              this.senderUnitID = data.name


              if (this.senderUnitID==''){
                this.updataselectUnit(data.id)
              }
            }
          }
        })
      },
      agentIDClick(){
        this.$dialog.OpenWindow({
          width: 950,
          height: 692,
          url: '/selectPerson?category=1',
          title: '选择经办人',
          closeCallBack: (data) => {
            if (data) {
              this.agentID = data.name
              if (this.agentID==''){
                this.updatainsuredSelectPerson(data.id)
              }
            }
          }
        })
      },
      senderPersonClick(){
        this.$dialog.OpenWindow({
          width: 950,
          height: 692,
          url: '/selectPerson?category=1',
          title: '选择寄件人',
          closeCallBack: (data) => {
            if (data) {
              this.senderPersonID = data.name
              this.senderCellPhone=data.phone
              if (this.senderPersonID==''){
                this.updatainsuredSelectPerson(data.id)
              }
            }
          }
        })
      },
      senderAddressClick(){
        this.$dialog.OpenWindow({
          width: 950,
          height: 603,
          url: '/selectDic?name=25' ,
          title: '选择省份地市区县',
          closeCallBack: (data) => {
            if (data) {
              this.senderAddressID=data.id
              this.senderAddressName = data.showName
              this.senderPostcode=data.value4
            }
          }
        })
      },
    },
    created(){
      this.setQuery2Value('id')
      this.setQuery2Value('letterClassification')
      this.setQuery2Value('letterType')
      this.setQuery2Value('orderOnline')
      this.init({
        url: '/dailyoffice/expressDelivery/initForm',
        all: (data) => {

          this.letterClassificationEvent()
          this.letterTypeEvent()
          this.orderOnlineEvent()

        },
        add: (data) => {
          /* 需要添加的数据 */
        },
        look: (data) => {
          /* 需要查看的数据 */
            this.senderUnitID=data.senderUnitID,
            this.agentID=data.agentID,
            this.senderAddressName=data.senderAddressName,
            this.senderAddress=data.senderAddress,
            this.senderPersonID=data.senderPersonID,
            this.senderPhone=data.senderPhone,
            this.senderPostcode=data.senderPostcode,
            this.senderCellPhone=data.senderCellPhone,
            this.senderOrigin=data.senderOrigin,
            this.senderOriginCode=data.senderOriginCode
        }
      })
    }
  }
</script>

<style scoped>

</style>
