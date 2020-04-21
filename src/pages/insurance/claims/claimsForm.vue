<template>
  <div class="f_main">
    <yhm-formbody>
      <template #title>基本信息</template>
      <template #control>
        <yhm-form-date title="回款日期" :value="moneyBackDate" id="moneyBackDate" :no-edit="isMoneyBackDate"></yhm-form-date>
        <yhm-form-text title="金额" :value="money" id="money" no-edit="1"></yhm-form-text>

        <yhm-form-select title="我方账户" :value="account" id="account" width="1" rule="R0000" :no-click="true"></yhm-form-select>
        <yhm-form-select title="对方账户" :value="otherAccount" id="otherAccount" width="1" rule="R0000" :no-click="true"></yhm-form-select>


        <yhm-form-select title="部门" @click="branchEvent" :value="branch" id="branch" rule="R0000"></yhm-form-select>
        <yhm-form-select title="业务员" @click="operatorEvent" :value="operator" id="operator" rule="R0000"></yhm-form-select>

        <yhm-form-text title="工单号" @repeatverify="VerifyworkOrder" ref="workOrderID" :value="workOrderID" id="workOrderID" rule="R0000"></yhm-form-text>
        <yhm-form-text title="客户" :value="customerName" id="customerName" rule="R0000"></yhm-form-text>

        <yhm-form-select title="车辆品牌" @click="selectVehicleBrandID" :value="vehicleBrand" id="vehicleBrand" rule="R0000"></yhm-form-select>
        <yhm-form-select title="车型" @click="vehicleTypeEvent" :value="vehicleType" id="vehicleType" rule="R0000"></yhm-form-select>
        <yhm-form-text title="车牌号" :value="licensePlateNumber" id="licensePlateNumber" rule="R8000"></yhm-form-text>

<!--        <yhm-form-text title="车辆品牌" :value="brand" id="brand" rule="R0000"></yhm-form-text>-->


        <yhm-form-text title="发票" @call="invoiceEvent" :value="invoiceID" id="invoiceID" rule="R0000"></yhm-form-text>
        <yhm-form-date title="结算日期" :value="settlementDate" id="settlementDate" rule="R0000" position="u"></yhm-form-date>


        <yhm-form-textarea title="备注" :value="remark" id="remark"></yhm-form-textarea>

<!--        <yhm-form-upload-image title="上传图片" @mouseover="mouseOver" discription=" " tag="bankDetail" :value="storeName" id="storeName"></yhm-form-upload-image>-->
        <yhm-formimage title="图片" :tip="true" :value="storeName" id="url" width="1000" height="650" discription=" "></yhm-formimage>

      </template>
    </yhm-formbody>

    <div class="f_split"></div>
    <div class="i-left fs48b colorFFF" title="上一条" v-show="isLeftID"  @click="leftStrip" style="width:48px;height:70px;background: #000;opacity:0.3;position: fixed;  bottom: 300px;z-index: 9999;display:flex;justify-content:center;align-items:center;"></div>
    <div class="i-right fs48b colorFFF" title="下一条" v-show="isRightID" @click="rightStrip" style="width:48px;height:70px;background: #000;opacity:0.3;position: fixed;  bottom: 300px;right:0px;z-index: 9999;display:flex;justify-content:center;align-items:center;"></div>

    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn>
        <yhm-commonbutton value="保存" icon="btnSave" :flicker="true" @call="save()" category="one"></yhm-commonbutton>
<!--        <yhm-commonbutton value="保存并提交" class="btnAddSave" icon="btnSubSave" @call="btnSubSave()" category="one"></yhm-commonbutton>-->
      </template>
    </yhm-formoperate>`
  </div>
</template>

<script>
  import { formmixin } from '@/assets/form.js'
  export default {
    name: 'claimsForm',
    mixins: [formmixin],
    data (){
      return{
        ownerID: '',
        moneyBackDate: '',
        workOrder: '',
        workOrderID: '',
        settlementDate: '',
        operator: '',
        operatorID: '',
        invoice: '',
        invoiceID: '',
        vehicleType: '',
        vehicleTypeID: '',

        actualMoney: '',
        otherAccount: '',
        otherAccountID: '',
        account: '',
        selfAccountID: '',
        accountID: '',
        licensePlateNumber: '',
        customerName: '',

        branch: '',
        branchID: '',
        // brand: '',
        // brandID: '',

        storeName: '',

        money: '',
        remark: '',
        vehicleBrandID:'',//车辆品牌ID
        vehicleBrand:'',//车辆品牌ID
        isMoneyBackDate: true,

        isLeftID:false,//延长按钮
        leftID:'',//上一条ID
        isRightID:false,//延长按钮
        rightID:'',//下一条ID
      }
    },
    methods: {

      leftStrip(){
        window.location='/claimsForm?id='+this.leftID
      },
      rightStrip(){
        window.location='/claimsForm?id='+this.rightID
      },

      /* 选择我方账户 */
      accountEvent(){

      },
      /* 选择对方账户 */
      otherAccountEvent(){

      },
      selectVehicleBrandID(){
        let name = '90'
        this.$dialog.OpenWindow({
          width: 950,
          height: 603,
          url: '/selectDic?name=' + name,
          title: '选择车辆品牌',
          closeCallBack: (data) => {
            if (data) {
              this.vehicleBrandID = data.id
              this.vehicleBrand = data.showName
            }
          }
        })
      },
      /* 选择车型品牌 */
      vehicleTypeEvent(){
        let name = '91'
        this.$dialog.OpenWindow({
          width: 950,
          height: 603,
          url: '/selectDic?name=' + name+'&value12='+this.vehicleBrandID,
          title: '选择车辆型号',
          closeCallBack: (data) => {
            if (data) {
              this.vehicleTypeID = data.id
              this.vehicleType = data.showName
            }
          }
        })
      },

      /* 选择发票 */
      invoiceEvent(){

      },
      /* 选择部门 */
      branchEvent(){
        this.$dialog.OpenWindow({
          url:"/selectDepartment?level=2&open=1",
          width:"850",
          height:"600",
          title: "选择部门",
          closeCallBack: (data) => {
            if (data) {
              this.branch = data.name
              this.branchID = data.id
            }
          }
        })
      },
      /* 选择业务员 */
      operatorEvent(){
        this.$dialog.OpenWindow({
          width: 950,
          height: 692,
          title: '选择业务员',
          url: '/selectPerson',
          closeCallBack: (data)=>{
            if(data){
              this.operatorID = data.id
              this.operator = data.name
            }
          }
        })
      },
      //验证工单号唯一性
      VerifyworkOrder(){
        let params = {
          id:this.id,
          workOrderID:this.workOrderID
        }
        this.ajaxJson({
          url: '/Fin/verifyworkOrder',
          data: params,
          loading: '0',
          call: (data) => {
            if(data.type===1){
              this.$refs.workOrderID.errorEvent(data.message)
            }
          }
        })
      },
      /* 选择工单号 */
      workOrderEvent(){

      },
      save(){

        if(this.validator()){
          let params = {
            id: this.id,
            ownerID: this.ownerID,
            moneyBackDate: this.moneyBackDate,
            money: this.money,
            account: this.account,
            selfAccountID: this.selfAccountID,
            otherAccountID: this.otherAccountID,
            branch: this.branch,
            branchID: this.branchID,
            operator: this.operator,
            operatorID: this.operatorID,
            workOrderID: this.workOrderID,

            customerName: this.customerName,
            vehicleTypeID: this.vehicleTypeID,
            vehicleType: this.vehicleType,
            licensePlateNumber: this.licensePlateNumber,

            vehicleBrand: this.vehicleBrand,
            vehicleBrandID: this.vehicleBrandID,
            invoiceID: this.invoiceID,
            settlementDate: this.settlementDate,
            remark: this.remark,
          }
          this.ajaxJson({
            url: '/Fin/bankDetailInsuranceSave',
            data: params,
            loading: '0',
            call: (data) => {
              if (data.type === 0) {
                this.$dialog.setReturnValue('1')
                this.$dialog.alert({
                  tipValue: data.message,
                  closeCallBack: (data)=>{
                    this.$dialog.close()
                  }
                })
              }else{
                this.$dialog.alert({
                  alertImg: 'warn',
                  tipValue: data.message
                })
              }
            }
          })
        }
      },
      btnSubSave(){

      },
      initData(){
        this.init({
          url: '/Fin/bankDetailInsuranceByID',
          all: (data)=>{

          },
          add: (data)=>{

          },
          look: (data)=>{

            this.ownerID = data.ownerID
            this.moneyBackDate = data.moneyBackDate
            this.workOrder = data.workOrder
            this.workOrderID = data.workOrderID
            this.settlementDate = data.settlementDate
            this.operator = data.operator
            this.operatorID = data.operatorID
            this.invoice = data.invoice
            this.invoiceID = data.invoiceID
            this.vehicleType = data.vehicleType
            this.vehicleTypeID = data.vehicleTypeID
            this.otherName = data.otherName
            this.otherAccount = data.otherAccount
            this.otherAccountID = data.otherAccountID
            this.account = data.account
            this.selfAccountID = data.selfAccountID
            this.accountID = data.accountID
            this.money = data.money
            this.customerName = data.customerName
            this.licensePlateNumber = data.licensePlateNumber
            this.branch = data.branch
            this.branchID = data.branchID

            this.vehicleBrandID = data.vehicleBrandID
            this.vehicleBrand = data.vehicleBrand

            this.storeName =  '/UploadFile/bankDetail/' + data.storeName

            this.remark = data.remark


          }
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
    }
  }
</script>

<style scoped>

</style>
