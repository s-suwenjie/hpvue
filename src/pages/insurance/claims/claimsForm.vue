<template>
  <div class="f_main">
    <yhm-formbody>
      <template #title>基本信息</template>
      <template #control>
        <yhm-form-date title="回款日期" :value="moneyBackDate" id="moneyBackDate" :no-edit="isMoneyBackDate"></yhm-form-date>
        <yhm-form-text title="金额" :value="money" id="money" no-edit="1"></yhm-form-text>
        <yhm-form-select title="我方账户" :value="account" id="account" width="1" rule="R0000" :no-click="true"></yhm-form-select>
        <yhm-form-select title="对方账户" :value="otherAccount" id="otherAccount" width="1" rule="R0000" :no-click="true"></yhm-form-select>
        <!--<yhm-form-select title="业务员" @click="operatorEvent" :value="operator" id="operator" rule="R0000"></yhm-form-select>-->
        <!--<yhm-form-text title="工单号" @change="VerifyworkOrder" ref="workOrderID" :value="workOrderID" id="workOrderID" rule="R0000"></yhm-form-text>-->
        <!--<yhm-form-radio title="客户类型" :select-list="unitOrPersonList" @call="selectUnitOrPerson" :value="unitOrPerson" id="unitOrPerson"></yhm-form-radio>-->
        <!--<yhm-form-select title="客户" @click="plateEvent"  :value="customer" id="customer" rule="R0000"></yhm-form-select>-->
        <!--<yhm-form-select title="车牌号" is-upper-case :value="licensePlateNumber" no-click="" id="licensePlateNumber"  @click="plateEvent" rule="R8000"></yhm-form-select>-->
        <!--<yhm-form-select title="车辆品牌" @click="selectVehicleBrandID" no-click="" :value="vehicleBrand" id="vehicleBrand" rule="R0000"></yhm-form-select>-->
        <!--<yhm-form-select title="车型" @click="vehicleTypeEvent" no-click="" :value="vehicleType" id="vehicleType"></yhm-form-select>-->
        <!--<yhm-form-text title="发票" @call="invoiceEvent" :value="invoiceID" id="invoiceID"></yhm-form-text>-->
        <div>
          <yhm-formbody>
            <template #title>分单信息</template>
            <template #opera>
              <yhm-commonbutton value="添加分单信息" icon="btnAdd" @call="addCheckNumEvent"></yhm-commonbutton>
            </template>
            <template #control>
              <div>
                <yhm-form-list-edit style="border: none;width: 998px">
                  <template #listHead>
                    <yhm-managerth style="width: 90px" title="业务员"></yhm-managerth>
                    <yhm-managerth style="width: 110px" title="工单号"></yhm-managerth>
                    <yhm-managerth style="width: 120px" title="金额"></yhm-managerth>
                    <yhm-managerth style="width: 130px" title="客户类型"></yhm-managerth>
                    <yhm-managerth style="width: 110px" title="客户"></yhm-managerth>
                    <yhm-managerth style="width: 90px" title="车牌号"></yhm-managerth>
                    <yhm-managerth style="width: 90px" title="车辆品牌"></yhm-managerth>
                    <yhm-managerth style="width: 90px" title="车型"></yhm-managerth>
                    <yhm-managerth style="width: 90px" title="发票"></yhm-managerth>
                    <yhm-managerth style="" title="操作"></yhm-managerth>
                  </template>
                  <template #listBody>
                    <tr v-for="(item,index) in detailList" :key="index" :class="{InterlacBg:index%2!==0}">
                      <yhm-form-td-select-dialog width="90" tip="operator" @call="operatorEvent(index)" :list="detailList" listid="detailList" :value="item" id="operator" rule="R0000"></yhm-form-td-select-dialog>
                      <yhm-form-td-textbox width="110" tip="workOrderID" @change="VerifyworkOrder(index)"  :list="detailList" listid="detailList" :value="item" id="workOrderID" rule="R0000"></yhm-form-td-textbox>
                      <yhm-form-td-textbox width="120" tip="money" :list="detailList" listid="detailList" :value="item" id="money" rule="R0000"></yhm-form-td-textbox>
                      <yhm-form-td-radio width="130" @call="selectUnitOrPerson(index)" :list="detailList" listid="detailList" :value="item" :select-list="unitOrPersonList" id="unitOrPerson" rule="R0000"></yhm-form-td-radio>
                      <yhm-form-td-select-dialog width="110" tip="customer" @call="plateEvent(item,index)"  :list="detailList" listid="detailList" :value="item" id="customer" rule="R0000"></yhm-form-td-select-dialog>
                      <yhm-form-td-textbox width="90" tip="licensePlateNumber" no-edit="1" :list="detailList" listid="detailList" :value="item" id="licensePlateNumber" rule="R0000"></yhm-form-td-textbox>
                      <yhm-form-td-textbox width="90" tip="vehicleBrand" no-edit="1" :list="detailList" listid="detailList" :value="item" id="vehicleBrand" rule="R0000"></yhm-form-td-textbox>
                      <yhm-form-td-textbox width="90" tip="vehicleType" no-edit="1" :list="detailList" listid="detailList" :value="item" id="vehicleType" rule="R0000"></yhm-form-td-textbox>
                      <yhm-form-td-textbox width="90" tip="invoiceID" :list="detailList" listid="detailList" :value="item" id="invoiceID"></yhm-form-td-textbox>
                      <yhm-form-td-delete width="" :list="detailList" :value="item" :del-click="true" @click="delCheck(item,index)"></yhm-form-td-delete>
                    </tr>
                  </template>
                  <template #empty>
                    <div class="m_listNoData" v-if="detailList.length == 0">暂时没有数据</div>
                  </template>
                </yhm-form-list-edit>
              </div>
            </template>
          </yhm-formbody>
          <div class="f_split"></div>
        </div>
        <yhm-form-upload-image title="银行回单" :noUpload="true" width="800" height="650" tag="bankDetail" discription=" " @mouseoverEvent="lookImg" :value="storeName" id="storeName"></yhm-form-upload-image>
        <yhm-form-textarea no-edit="1" title="银行摘要" :value="bankSummary" id="bankSummary"></yhm-form-textarea>
        <yhm-form-radio title="状态" :state-show="true" :no-show-item="noSignStateList" :select-list="signStateList" :value="signState" id="signState"></yhm-form-radio>
        <yhm-form-textarea title="备注" :value="remark" id="remark" :rule="remarkRule"></yhm-form-textarea>
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

    <div id="lookImg" class="showImg" v-show="tipShow" @click="imgClick" @mouseout="imgClick">
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
  import { accMul, accAdd, guid, formatDate, formatTime} from '@/assets/common.js'
  import { formmixin } from '@/assets/form.js'
  export default {
    name: 'claimsForm',
    mixins: [formmixin],
    data (){
      return{
        isList:false,//重复信息显示隐藏
        list:[],
        signState:'0',
        noSignStateList:['3'],
        signStateList:[
          {
            code:'',
            num:'0',
            img:'icon-correct iconSignState',
            showName:'正常',
          },
          {
            code:'',
            num:'3',
            img:'icon-correct iconSignState',
            showName:'正常',
          },
          {
            code:'',
            num:'1',
            img:'icon-InterestRW',
            showName:'待核查',
          },
          {
            code:'',
            num:'2',
            img:'icon-delete',
            showName:'异常',
          },
          {
            code:'red',
            num:'4',
            img:'icon-correct iconCorrect',
            showName:'待完善',
          },
        ],
        unitOrPersonList:[
          {
            code:'',
            num:'0',
            img:'',
            showName:'个人',
          },
          {
            code:'',
             num:'1',
            img:'',
            showName:'单位',
          },
        ],
        unitOrPerson:'0',
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
        customer:'',
        customers:'',

        branch: '',
        branchID: '',
        // brand: '',
        // brandID: '',

        storeName: '',

        createName:'',
        insertDate:'',
        updateName:'',
        updateDate:'',

        money: '',
        bankSummary:'',
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
        licensePlateNumberID:'',
        modelNoEdit:false,
        detailList:[],
      }
    },
    computed:{
      // selectSignState(){
      //   if(this.signState === '3'){
      //     this.remark = ''
      //   }
      // },
      remarkRule(){
        if(this.signState==0||this.signState==4){
          return ' '
        }else{
          return 'R0000'
        }
      }
    },
    methods: {
      addCheckNumEvent(){
        let insertDate = new Date(accAdd(new Date().getTime(), accMul(this.detailList.length, 1000)))
        this.detailList.push({
          id: guid(),
          insertDate: formatTime(insertDate),
          ownerID: this.id,
          operatorID: '',
          operator: '',
          workOrderID: '',
          workOrder: '',
          money:'',
          unitOrPerson: '0',
          customerName:'',
          customer:'',
          licensePlateNumber: '',
          vehicleBrandID: '',
          vehicleBrand: '',
          vehicleTypeID: '',
          vehicleType: '',
          invoiceID:'',
          invoiceCode: '',
        })
        let sumMoney=0.00
        for (let i = 0; i < this.detailList.length; i++) {
          if(this.detailList[i].money===''){
            sumMoney=parseFloat(sumMoney)
          }else{
            sumMoney=parseFloat(sumMoney)+parseFloat(this.detailList[i].money)
          }
        }
        if(parseFloat(sumMoney)>=parseFloat(this.money)){
          this.detailList.splice(this.detailList.length-1)
          this.$dialog.alert({
            alertImg: 'warn',
            tipValue: '分单总金额不能大于回款金额'
          })
        }
      },
      //选择车牌号
      plateEvent(item,index){
        let assort=''
        if (item.unitOrPerson === '0'){
          assort='1'
        }else{
          assort='0'
        }
        this.$dialog.OpenWindow({
          width: 950,
          height: 603,
          url: '/selectPlate?carOwnerID=' + this.operatorID+'&assort='+assort,
          title: '选择车辆信息',
          closeCallBack: (data) => {
            if (data) {
              // this.customer = data.carOwner
              // this.customerName = data.carOwnerID
              // this.vehicleType = data.model//型号
              // this.licensePlateNumber = data.plate//车牌号
              // this.vehicleBrand = data.brand//车辆品牌
              // this.vehicleBrandID = data.brandID
              // this.vehicleTypeID = data.modelID

              this.detailList[index].customer = data.carOwner
              this.detailList[index].customerName = data.carOwnerID
              this.detailList[index].vehicleType = data.model//型号
              this.detailList[index].licensePlateNumber = data.plate//车牌号
              this.detailList[index].vehicleBrand = data.brand//车辆品牌
              this.detailList[index].vehicleBrandID = data.brandID
              this.detailList[index].vehicleTypeID = data.modelID
              this.detailList[index].modelNoEdit = true
              if(data.brand === '' || data.model === '' || data.carOwner == ''){
                this.$dialog.OpenWindow({
                  width: '1050',
                  height: '700',
                  url: '/vehicleForm?id='+ data.id + '&urlType=1',
                  title: '维护车辆信息',
                  closeCallBack: (acc) => {
                    if (acc) {
                      acc=acc.split('◇');
                      // this.vehicleType = acc[0]//型号
                      // this.vehicleTypeID = acc[1]
                      // this.vehicleBrand = acc[2]//车辆品牌
                      // this.vehicleBrandID = acc[3]
                      // this.customerName = acc[4]
                      // this.customer = acc[5]//型号

                      this.detailList[index].vehicleType = acc[0]//型号
                      this.detailList[index].vehicleTypeID = acc[1]
                      this.detailList[index].vehicleBrand = acc[2]//车辆品牌
                      this.detailList[index].vehicleBrandID = acc[3]
                      this.detailList[index].customerName = acc[4]
                      this.detailList[index].customer = acc[5]//型号
                    }
                  }
                })
              }
            }
          }
        })
      },
      //客户类型
      selectUnitOrPerson(index){
        //this.plateEvent(index)
        // this.$dialog.OpenWindow({
        //   width: 950,
        //   height: 603,
        //   url: '/selectFormPlate',
        //   title: '选择车牌号',
        //   closeCallBack: (data) => {
        //     if (data) {
        //       this.customerName = data.contactPersonID
        //       this.customer = data.name
        //       this.plateEvent(data.carOwnerID)
        //     }
        //   }
        // })
      },
      lookImg(){
          this.tipShow=true;
          this.getUrl='/UploadFile/bankDetail/'+this.storeName;
      },
      imgClick(){
        if(this.tipShow){
          this.tipShow=false;
        }
      },
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
      operatorEvent(index){

        this.$dialog.OpenWindow({

          width: 950,
          height: 692,
          title: '选择业务员',
          url: '/selectPerson',
          closeCallBack: (data)=>{
            if(data){
              // this.operatorID = data.id
              // this.operator = data.name
              this.detailList[index].operatorID = data.id
              this.detailList[index].operator = data.name
            }
          }
        })
      },
      SelectCustomer(){
        this.selectUnitOrPerson()
        // this.$dialog.OpenWindow({
        //   width: 950,
        //   height: 692,
        //   title: '选择业务员',
        //   url: '/selectPerson?category=1',
        //   closeCallBack: (data)=>{
        //     if(data){
        //       this.customerName = data.id
        //       this.customer = data.name
        //     }
        //   }
        // })
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
      VerifyworkOrder(index){
        let params = {
          id:this.id,
          workOrderID:this.detailList[index].workOrderID
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
        let sumMoney=0.00
        for (let i = 0; i < this.detailList.length; i++) {
          if(this.detailList[i].money===''){
            sumMoney=parseFloat(sumMoney)
          }else{
            sumMoney=parseFloat(sumMoney)+parseFloat(this.detailList[i].money)
          }
        }
        if(parseFloat(sumMoney)>parseFloat(this.money)){
          this.$dialog.alert({
            alertImg: 'warn',
            tipValue: '分单总金额不能大于回款金额'
          })
          return
        }
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
            // operator: this.operator,
            // operatorID: this.operatorID,
            // workOrderID: this.workOrderID,
            //
            // customerName: this.customerName,
            // customer: this.customer,
            // vehicleTypeID: this.vehicleTypeID,
            // vehicleType: this.vehicleType,
            // licensePlateNumber: this.licensePlateNumber,
            //
            // vehicleBrand: this.vehicleBrand,
            // vehicleBrandID: this.vehicleBrandID,
            // invoiceID: this.invoiceID,
            // settlementDate: this.settlementDate,
            remark: this.remark,

            signState:this.signState,//标记
            detailList:this.detailList
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
            this.customer = data.customer
            this.customers = data.customer
            this.licensePlateNumber = data.licensePlateNumber
            // this.branch = data.branch
            // this.branchID = data.branchID
            this.bankSummary = data.bankSummary
            this.vehicleBrandID = data.vehicleBrandID
            this.vehicleBrand = data.vehicleBrand
            this.storeName = data.storeName
            this.remark = data.remark
            this.signState = data.signState
            this.unitOrPerson = data.unitOrPerson
            if (this.signState > 0 && this.signState < 4){
              this.noSignStateList='0,4'
            }else if(this.signState === 0){
              this.noSignStateList='3,4'
            }
            this.detailList=data.detailList
            // this.createName = data.createName
            // this.insertDate = data.insertDate
            // this.updateName = data.updateName
            // this.updateDate = data.updateDate
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
    bottom: -99%;
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
  .showImg{
    width: 850px;
    height: 600px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    overflow: hidden;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: start;
    -ms-flex-align: start;
    align-items: center;
    background-color: #FFFFFF;
    position: fixed !important;
    z-index: 999999;
    -webkit-box-shadow: 0 0 20px #000000;
    box-shadow: 0 0 20px #000000;
    border-radius: 10px;
    top: 0;
    right: 0;
    left: 140px;
    bottom: 0;
    margin: auto;
  }
</style>
