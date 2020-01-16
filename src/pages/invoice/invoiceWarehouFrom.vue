<template>
  <div class="f_main">
    <yhm-formbody>
      <template #title>基本信息</template>
      <template #control>
        <yhm-form-select title="所属公司" :no-click="isWare" :value="unit" id="unit" @click="selectUnit" tip="value" rule="R0000"></yhm-form-select>
        <yhm-form-date title="入库日期" :value="workDate" id="workDate" tip="value" rule="R0000" position="b" :no-edit="true"></yhm-form-date>
        <yhm-form-radio width="1" title="增票类型" :no-edit="isWare" :select-list="invoiceCategoryList" @call="selectInvoiceCategory" :value="invoiceCategory" id="invoiceCategory" rule="R0000"></yhm-form-radio>
        <yhm-form-radio title="发票面值" :no-edit="isWare" :select-list="maxValueList" :value="maxValue" id="maxValue" rule="R0000"></yhm-form-radio>
        <yhm-form-select title="领取人员" subtitle="（税局）" v-if="isInit" :value="approvePerson" id="approvePerson" @click="selectPerson" tip="value" rule="R0000" :no-click="true"></yhm-form-select>
        <yhm-form-date title="领取日期" :no-edit="isWare" v-if="isInit" :max="operatorDate" :value="operatorDate" id="operatorDate" tip="value" rule="R0000" position="b"></yhm-form-date>
        <yhm-form-text title="领取张数" :no-edit="isWare?'1':''" :value="quantity" id="quantity" rule="R0000"></yhm-form-text>
        <yhm-form-text title="实际" subtitle="入库张数" :value="addQuantity" id="addQuantity" no-edit="1"></yhm-form-text>

      </template>
    </yhm-formbody>
    <div class="f_split"></div>
    <yhm-formbody>
      <template #title>发票号码明细</template>
      <template #opera>
        <yhm-commonbutton value="添加单张发票" icon="btnAdd" @call="addInvoiceNumEvent(0)"></yhm-commonbutton>
        <yhm-commonbutton value="添加连号发票（首张+张数）" icon="btnAdd" @call="addInvoiceNumEvent(1)"></yhm-commonbutton>
        <yhm-commonbutton value="添加连号发票（首尾）" icon="btnAdd" @call="addInvoiceNumEvent(2)"></yhm-commonbutton>
      </template>
      <template #control>
        <div class="check">
          <div class="check_main" v-for="(item,index) in list" :key="index">{{item.code}}<span @click="delCheck(index)" :class="{'red':deleteTheSwitch}" class="icon delete"></span></div>
          <div class="noTableData" v-if="isEmpty">暂时没有数据</div>
        </div>
      </template>
    </yhm-formbody>
    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn v-if="isBtn">
        <yhm-commonbutton value="保存" icon="btnSave" :flicker="true" @call="save()"></yhm-commonbutton>
      </template>
    </yhm-formoperate>
  </div>
</template>

<script>
  import { formmixin } from '@/assets/form.js'
  import { formatDate ,accAdd, guid,number2chinese,formatCnDate,accMul} from '@/assets/common.js'
  export default {
    name: 'invoiceWarehouFrom',
    mixins: [formmixin],
    data(){
      return{
        id: '',
        unit:'',
        unitID:'',
        ownerID:'',
        maxValue:'',
        maxValueList:[],
        invoiceCategory:'',
        invoiceCategoryList:[],
        approvePerson:'',
        approvePersonID:'',
        categoryList: [],
        quantity: '',
        list:[],
        state:'',
        addQuantity: '',
        isEmpty: true,
        deleteTheSwitch: true,   //是否允许删除 true为可以删除
        workDate: formatDate(new Date()),
        operatorDate:'',
        listData: false,
        isState:'',
        isWare:false,
        isBtn: true,
        isInitType: '',
        isInit: true,
        invoiceNum: '',
        invoiceFir: '',
        invoiceSheet: '',
        invoiceLast: '',

        //发票  初始化   数量
        invoiceCategory0:'',//增值税普通发票  入库数量
        invoiceCategory1:'',//增值税专用发票 入库数量
        invoiceCategory2:'',//机动车销售统一发票 入库数量
      }
    },
    methods:{
      selectInvoiceCategory(){
        if(this.invoiceCategory==='0'&&this.invoiceCategory0==='0'){
          alert(this.invoiceCategory+'-----'+this.invoiceCategory0)
          this.isInit = false
        }else if(this.invoiceCategory==='1'&&this.invoiceCategory1==='0'){
          this.isInit = false
        }else if(this.invoiceCategory==='2'&&this.invoiceCategory2==='0'){
          this.isInit = false
        }else{
          this.isInit = true
        }
      },
      save(){
        let aa = true
        if(parseInt(this.addQuantity) < parseInt(this.quantity)){
          aa = false
        }
        if(!this.listData){
          this.$dialog.alert({
            width: '300',
            alertImg: 'warn',
            tipValue: '支票数据不能为空！！！'
          })
        }
        if(this.validator() && this.listData && aa){
          if(this.invoiceCategory==='0'&&this.invoiceCategory0==='0'){
            this.approvePerson=''
            this.approvePersonID=''
            this.operatorDate=''
          }
          if(this.invoiceCategory==='1'&&this.invoiceCategory1==='0'){
            this.approvePerson=''
            this.approvePersonID=''
            this.operatorDate=''
          }
          if(this.invoiceCategory==='2'&&this.invoiceCategory2==='0'){
            this.approvePerson=''
            this.approvePersonID=''
            this.operatorDate=''
          }
          let params = {
            id: this.id,
            unit:this.unit,//公司名称
            unitID:this.unitID,//公司id
            workDate:this.workDate,//入库日期
            invoiceCategory:this.invoiceCategory,//支票类型
            maxValue:this.maxValue,//最大面值
            quantity:this.quantity,//发票数量
            addQuantity:this.addQuantity,//实际数量
            detailList:this.list,//发票明细
            operatorPerson:this.approvePerson,//领取人
            operatorPersonID:this.approvePersonID,//领取人id
            operatorDate:this.operatorDate,//领取日期
          }

          this.ajaxJson({
            url: '/Bill/invoiceSave',
            data: params,
            call: (data)=>{
              if(data.type === 0){
                this.$dialog.setReturnValue(this.id)
                this.$dialog.alert({
                  tipValue: data.message,
                  closeCallBack: (data)=>{
                    this.$dialog.close()
                  }
                })
              }else{
                let width = 250
                width = accAdd(width, accMul(data.message.length, 10))
                this.$dialog.alert({
                  width: width,
                  alertImg: 'error',
                  tipValue: data.message
                })
              }
            }
          })
        }
      },
      selectPerson(){
        this.$dialog.OpenWindow({
          width: '950',
          height: '700',
          url: '/selectPerson?category=0&categoryBefore=1',
          title: '选择发票领取人',
          closeCallBack: (data) => {
            if (data) {
              this.approvePerson=data.name
              this.approvePersonID=data.id
            }
          }
        })
      },
      selectUnit(){
        this.$dialog.OpenWindow({
          width: '950',
          height: '700',
          url: '/selectUnit?category=0&categoryBefore=1',
          title: '选择开票单位',
          closeCallBack: (data) => {
            if (data) {
              this.unit=data.name
              this.unitID=data.id
            }
          }
        })
      },
      delCheck(index){
        if(this.deleteTheSwitch === false){//不允许删除并将图标变为红色
        }else {this.$set(this.list.splice(index,1))}
      },
      /* 添加支票 */
      addInvoiceNumEvent(numType){
        if(!this.isWare){
          if(this.quantity){
            let title = '添加连号发票'
            if(numType === 0){
              title = '添加单张发票'
            }
            this.$dialog.OpenWindow({
              width: '1050',
              height: '500',
              title: title,
              url: '/addInvoiceNumForm?numType=' + numType + '&quantity=' + this.quantity,
              closeCallBack: (data)=>{
                if(data){
                  this.invoiceNum = data.invoiceNum.substring(data.invoiceNum.length-8)
                  this.invoiceFir = data.invoiceFir.substring(data.invoiceFir.length-8)
                  this.invoiceSheet = data.invoiceSheet
                  this.invoiceLast = data.invoiceLast.substring(data.invoiceLast.length-8)

                  this.beInvoiceNum = data.invoiceNum.substring(0,10)
                  this.beInvoiceFir = data.invoiceFir.substring(0,10)
                  this.beInvoiceLast = data.invoiceLast.substring(0,10)

                  if(numType === 0){
                    if(this.list.find((element) => (element.code == this.invoiceNum))===undefined) {
                      this.list.push({
                        id: guid(),
                        ownerID: this.id,
                        code: this.beInvoiceNum + this.invoiceNum,
                      })
                    }
                  }else if(numType === 1){
                    if(this.quantity !== '1') {
                      let aa = parseInt(this.invoiceFir) - 1
                      for (let i = 0; i < this.invoiceSheet; i++) {
                        aa += 1
                        let aaStr = aa.toString()
                        if(aaStr.length < 8){
                          let zeroLen = 8 - aaStr.length
                          let zero = ''
                          for(let i=0;i < zeroLen; i++){
                            zero += '0'
                          }
                          aaStr = zero + aaStr
                        }
                        if (this.list.find((element) => (element.code == aaStr)) === undefined) {
                          this.list.push({
                            id: guid(),
                            ownerID: this.id,
                            code: this.beInvoiceFir + aaStr
                          })
                        }
                      }
                    }else{
                      if(this.list.find((element) => (element.code == this.invoiceNum))===undefined) {
                        this.list.push({
                          id: guid(),
                          ownerID: this.id,
                          code: this.beInvoiceFir + this.invoiceFir,
                        })
                      }
                    }
                  }else if(numType === 2){
                    if(this.quantity !== '1') {
                      if (parseInt(this.invoiceLast) > parseInt(this.invoiceFir)) {
                        let aa = parseInt(this.invoiceLast) - parseInt(this.invoiceFir)
                        let bb = parseInt(this.invoiceFir) - 1
                        for (let i = 0; i < aa + 1; i++) {
                          bb += 1

                          let bbStr = bb.toString()

                          if(bbStr.length < 8){
                            let zeroLen = 8 - bbStr.length
                            let zero = ''
                            for(let i=0;i < zeroLen; i++){
                              zero += '0'
                            }
                            bbStr = zero + bbStr
                          }
                          if (this.list.find((element) => (element.code == bb)) === undefined) {
                            this.list.push({
                              id: guid(),
                              ownerID: this.id,
                              code: this.beInvoiceFir + bbStr
                            })
                          }
                        }
                      }
                    }else{
                      if(this.list.find((element) => (element.code == this.invoiceNum))===undefined) {
                        this.list.push({
                          id: guid(),
                          ownerID: this.id,
                          code: this.beInvoiceFir + this.invoiceFir,
                        })
                      }
                    }
                  }
                }
              }
            })
          }else {
            this.$dialog.alert({
              width: '300',
              alertImg: 'warn',
              tipValue: '请输入购买张数！！！'
            })
          }
        }
      },
      initData(){
        let params = {
        }
        this.init({
          url: '/Bill/invoiceForm',
          data: params,
          all: (data)=>{
            this.maxValue = data.maxValuePsd.value
            this.maxValueList = data.maxValuePsd.list
            this.invoiceCategory = data.invoiceCategoryPsd.value
            this.invoiceCategoryList = data.invoiceCategoryPsd.list
            this.unit = data.unit
            this.unitID = data.unitID
            this.state = data.state


            if(this.invoiceCategory0==='0'&&this.invoiceCategory==='0'){
              this.isInit = false
            }else if(this.invoiceCategory1==='0'&&this.invoiceCategory==='1'){
                this.isInit = false
            }else if(this.invoiceCategory2==='0'&&this.invoiceCategory==='2'){
               this.isInit = false
            }else{
              if(data.operatorDate === '1900-01-01'&&data.id!==''){
                this.isInit = false
              }
            }
          },
          add: (data)=>{
            this.id = guid()
          },
          look: (data)=>{
            this.quantity = data.quantity
            this.addQuantity = data.addQuantity
            this.list = data.list

            if(this.isState === '1'){
              this.isWare = true
              this.deleteTheSwitch = false
              this.isBtn = false
            }

          }
        })
      }
    },
    created(){
      this.setQuery2Value('isState')
      this.setQuery2Value('isInitType')
      if(this.isInitType === '1'){
        this.isInit = false
      }else {
        this.isInit = true
        this.approvePerson = sessionStorage.getItem('____currentUser')
        this.approvePersonID = sessionStorage.getItem('____currentUserID')
      }
      this.init({
        url: '/Bill/invoiceInitialization',
        all: (data)=>{
          this.invoiceCategory0=data.number0
          this.invoiceCategory1=data.number1
          this.invoiceCategory2=data.number2
        }
      })
      this.initData()
    },
    watch: {
      list(){
        this.addQuantity = this.list.length + ''
        if(this.list.length !== 0){
          this.isEmpty = false
          this.listData = true
        }else {
          this.isEmpty = true
          this.listData = false
        }
      }
    }
  }
</script>

<style scoped>

</style>
