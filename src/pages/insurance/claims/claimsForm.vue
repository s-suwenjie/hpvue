<template>
  <div class="f_main">
    <yhm-formbody>
      <template #title>基本信息</template>
      <template #control>
        <yhm-form-date title="回款日期" :value="moneyBackDate" id="moneyBackDate" :no-edit="isMoneyBackDate"></yhm-form-date>
        <yhm-form-text title="金额" :value="money" id="money" no-edit="1"></yhm-form-text>

        <yhm-form-select title="我方账户" :value="account" id="account" width="1" rule="R0000" :no-click="true"></yhm-form-select>
        <yhm-form-select title="对方账户" :value="otherAccount" id="otherAccount" width="1" rule="R0000" :no-click="true"></yhm-form-select>


<!--        <yhm-form-select title="部门" @click="branchEvent" :value="branch" id="branch"></yhm-form-select>-->
        <yhm-form-select title="业务员" @click="operatorEvent" :value="operator" id="operator" rule="R0000"></yhm-form-select>

        <yhm-form-text title="工单号" @change="VerifyworkOrder" ref="workOrderID" :value="workOrderID" id="workOrderID" rule="R0000"></yhm-form-text>
        <yhm-form-text title="客户" :value="customerName" id="customerName" rule="R0000"></yhm-form-text>

        <yhm-form-select title="车辆品牌" @click="selectVehicleBrandID" :value="vehicleBrand" id="vehicleBrand" rule="R0000"></yhm-form-select>
        <yhm-form-select title="车型" @click="vehicleTypeEvent" :value="vehicleType" id="vehicleType" rule="R0000"></yhm-form-select>
        <yhm-form-text title="车牌号" :value="licensePlateNumber" id="licensePlateNumber" rule="R8000"></yhm-form-text>

<!--        <yhm-form-text title="车辆品牌" :value="brand" id="brand" rule="R0000"></yhm-form-text>-->


        <yhm-form-text title="发票" @call="invoiceEvent" :value="invoiceID" id="invoiceID"></yhm-form-text>
        <!--<yhm-form-date title="结算日期" :value="settlementDate" id="settlementDate" rule="R0000" position="u"></yhm-form-date>-->


        <yhm-form-textarea title="备注" :value="remark" id="remark"></yhm-form-textarea>


        <yhm-form-upload-image title="图片" :noUpload="true" :isShow="true" width="800" height="650" tag="bankDetail" discription=" " :value="storeName" id="storeName" rule="#"></yhm-form-upload-image>

      </template>
    </yhm-formbody>




    <div class="f_split"></div>
    <div class="i-left fs48b colorFFF lftSwitchArrow" title="上一条" v-show="isLeftID"  @click="leftStrip"></div>
    <div class="i-right fs48b colorFFF rgtSwitchArrow" title="下一条" v-show="isRightID" @click="rightStrip"></div>

    <yhm-form-list-edit  class="duplicateAccount" :class="{isList:isList}">
      <template #switchIcon>
        <div class="switchIconTop" @click="switchClick">
          <span class="i-input-down-arrow switchIcon2"></span>
        </div>
      </template>
      <template #title>重复单位信息</template>
      <template #listHead>
        <yhm-managerth style="width: 38px;background: linear-gradient(0deg, #ec6603, #a24906);" title="查看"></yhm-managerth>
        <yhm-managerth title="保险公司" style="width: 150px;background: linear-gradient(0deg, #ec6603, #a24906);"></yhm-managerth>
        <yhm-managerth style="width: 150px;background: linear-gradient(0deg, #ec6603, #a24906);" title="工单号"></yhm-managerth>
        <yhm-managerth style="width: 100px;background: linear-gradient(0deg, #ec6603, #a24906);" title="业务员"></yhm-managerth>
        <yhm-managerth style="width: 120px;background: linear-gradient(0deg, #ec6603, #a24906);" title="回款日期"></yhm-managerth>
        <yhm-managerth style="width: 100px;background: linear-gradient(0deg, #ec6603, #a24906);" title="发生额"></yhm-managerth>
        <yhm-managerth style="background: linear-gradient(0deg, #ec6603, #a24906);" title="收款银行"></yhm-managerth>
      </template>
      <template #listBody>
        <tr v-for="(item,index) in list" :key="index" :class="{InterlacBg:index%2!==0}">
          <yhm-manager-td-look @click="viewDetails(item)"></yhm-manager-td-look>
          <yhm-manager-td :value="item.otherName"></yhm-manager-td>
          <yhm-manager-td :value="item.workOrderID"></yhm-manager-td>
          <yhm-manager-td :value="item.operator"></yhm-manager-td>
          <yhm-manager-td :value="item.moneyBackDate" @click="lookPublic(item)"></yhm-manager-td>
          <yhm-manager-td :value="item.money"></yhm-manager-td>
          <yhm-manager-td :value="item.account"></yhm-manager-td>
        </tr>
      </template>
    </yhm-form-list-edit>

    <div id="lookImg" class="showImg" v-show="tipShow" >
      <img :src="getUrl">
    </div>


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
        isList:false,//重复信息显示隐藏
        list:[],

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

        workOrderNumber:'0',

        tipShow:false,
        getUrl:'',
      }
    },
    methods: {
      viewDetails(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '750',
          url: '/claimsForm?id=' + item.id,
          title: '维护保险理赔',
          closeCallBack: (data) => {
            if (data) {
            }
          }
        })
      },
      switchClick(){//重复账号信息显示隐藏
        this.isList=!this.isList
      },
      leftStrip(){
        window.location='/claimsForm?id='+this.leftID
      },
      rightStrip(){
        window.location='/claimsForm?id='+this.rightID
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
      // branchEvent(){
      //   this.$dialog.OpenWindow({
      //     url:"/selectDepartment?level=2&open=1",
      //     width:"850",
      //     height:"600",
      //     title: "选择部门",
      //     closeCallBack: (data) => {
      //       if (data) {
      //         this.branch = data.name
      //         this.branchID = data.id
      //       }
      //     }
      //   })
      // },
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
      getInformation(id){
        let params = {
          id:id
        }
        this.ajaxJson({
          url: '/Fin/getBankDetailInsuranceInformation',
          data: params,
          loading: '0',
          call: (data) => {
            if(data.length>0){
              this.isList=true
              this.list=data
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
              this.workOrderNumber='1'
              this.getInformation(data.id)
              this.$dialog.confirm({
                width: 300,
                tipValue: '工单号（ '+this.workOrderID+' ）重复，是否继续操作？',
                btnValueOk: '继续操作',
                alertImg: 'warn',
                okCallBack: (data) => {
                  this.workOrderNumber='2'
                }
              })
            }
          }
        })
      },
      /* 选择工单号 */
      workOrderEvent(){

      },
      save(){
        if(this.validator()&&this.workOrderNumber!=='1'){
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
        }else if(this.workOrderNumber==='1'){
          this.$dialog.confirm({
            width: 300,
            tipValue: '工单号（ '+this.workOrderID+' ）重复，是否继续操作？',
            btnValueOk: '继续操作',
            alertImg: 'warn',
            okCallBack: (data) => {
              this.workOrderNumber='2'
              this.save()
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
            // this.branch = data.branch
            // this.branchID = data.branchID

            this.vehicleBrandID = data.vehicleBrandID
            this.vehicleBrand = data.vehicleBrand
            this.storeName = data.storeName


            this.remark = data.remark


          }
        })
      },
      selectedList() {
        let params = {
          id: this.id
        }
        this.ajaxJson({
          url: '/Fin/commonSelectedID',
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

<style lang="less" scoped>
  //重复账号信息的显示隐藏样式
  .isList{
    position: fixed;
    bottom: 0!important;
  }
  .duplicateAccount{
    position: fixed;
    bottom: -300px;
    transition: all 0.5s;
    width: 100%;
    box-sizing: border-box;
    margin-bottom: 64px;
    box-shadow: 0px -5px 5px #bfbfbf;
  }
  .iconUp{
    color: #fff;
    transform:rotate(180deg);
    transition: all 0.5s;
  }
  .switchIconTop2{
    display: flex;
    justify-content: center;
    background-color: #49a9ea;
    height: 48px!important;
    line-height: 48px !important;
    box-shadow:0px 1px 7px #49a9ea ;
    position: fixed;
    bottom: 0;
    right: 0;
    width: 48px;
    padding: 0!important;
    border-radius: 50%;
    margin:0 20px 72px 0;
  }
  .switchIconTop{
    /*display: flex;*/
    margin-top: 10px;
    align-items: center;
    padding:0 22px;
    height: 20px;
    line-height: 20px;

    .switchIcon2{
      font-size: 20px;
      display: inline-block;
      float: right;
    }
  }
</style>
