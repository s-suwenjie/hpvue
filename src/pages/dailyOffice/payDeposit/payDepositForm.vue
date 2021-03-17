<template>
  <div  class="f_main">
    <yhm-formbody>
      <template #title>基本信息</template>

      <template #control>
        <yhm-form-date title="添加日期" :no-edit="true" :value="workDate" id="workDate" rule="R0000"></yhm-form-date>
        <yhm-form-select title="添加人" :value="person" id="person" :no-click="true" rule="R0000"></yhm-form-select>
        <yhm-form-text title="支付金额" tip="money" before-icon="rmb" :value="money" id="money" rule="R3000" placeholder="请输入数字" error-message="纯数字输入"></yhm-form-text>
        <yhm-form-text title="金额大写" tip="capitalMoney" :value="capitalMoney" id="capitalMoney" rule="R0000" no-edit="1"></yhm-form-text>
        <yhm-form-radio title="收款方类型" :select-list="categoryList" :value="category" id="category" rule="R0000" width="0" @call="clearother"></yhm-form-radio>
        <yhm-form-select title="收款方" @click="selectWareHouser" :value="other" id="other" :no-click="false" rule="R0000"></yhm-form-select>
        <yhm-form-select title="收款账号" @click="selectAccount" :value="otherAccount" id="otherAccount" :no-click="false" rule="R0000" width="1"></yhm-form-select>
        <yhm-form-radio title="事由类型" :select-list="subjectPsd" :value="subjectID" id="subjectID" rule="R0000" width="1"></yhm-form-radio>
        <yhm-form-date title="预计退" subtitle="回日期" :value="refundDate" id="refundDate" :min="mixRefundDate" rule="R0000"></yhm-form-date>
        <yhm-form-radio title="有无收据" :select-list="isReceoptPsd" :value="isReceopt" id="isReceopt" rule="R0000" width="0"></yhm-form-radio>
        <yhm-form-textarea title="备注" :value="remark" id="remark"></yhm-form-textarea>
        <yhm-form-list-edit v-if="isReceopt==='1'">
          <template #title>收据明细</template>
          <template #operate>
            <yhm-commonbutton :show="isAddBtn" value="添加收据" icon="btnAdd" @call="addReceipt"></yhm-commonbutton>
          </template>
          <template #listHead>
            <yhm-managerth style="width: 130px" title="收据号码"></yhm-managerth>
            <yhm-managerth style="width: 140px" title="开据日期"></yhm-managerth>
            <yhm-managerth style="width: 80px" title="类型"></yhm-managerth>
            <yhm-managerth style="width: 90px" title="收据张数"></yhm-managerth>
            <yhm-managerth style="width: 90px" title="收据金额"></yhm-managerth>
            <yhm-managerth style="width: 220px" title="备注"></yhm-managerth>
            <yhm-managerth style="width: 90px" title="收据照片"></yhm-managerth>
            <yhm-managerth style="width: 40px" title="操作"></yhm-managerth>
          </template>
          <template #listBody>
            <tr v-for="(item,index) in commonInvoicesList" :key="index" :class="{InterlacBg:index%2!==0}">
              <yhm-form-td-textbox width="130" @change="verificationRepeatInvoice(item,index)" :list="commonInvoicesList" listid="commonInvoicesList" :value="item" id="code" rule="R0000"></yhm-form-td-textbox>
              <yhm-form-td-date width="140" position="b" :max="nowDate" :list="commonInvoicesList" listid="commonInvoicesList" :value="item" id="workDate" rule="R0000"></yhm-form-td-date>
              <yhm-form-td-radio width="80" no-edit="1" @call="switchInvoiceCategory" :list="commonInvoicesList" listid="commonInvoicesList" :value="item" :select-list="listCategoryPsd" id="category"></yhm-form-td-radio>
              <yhm-form-td-textbox width="90":no-edit="item.category === '0' ? '1':0" @change="verificationRepeatInvoice(item)" @input="invoicesQuantityInputEvent" :list="commonInvoicesList" listid="commonInvoicesList" :value="item" id="quantity" rule="R1000"></yhm-form-td-textbox>
              <yhm-form-td-textbox width="90" @input="invoicesMoneyInputEvent(item,index)" before-icon="rmb" :list="commonInvoicesList" listid="commonInvoicesList" :value="item" id="money" rule="R3000"></yhm-form-td-textbox>
              <yhm-form-td-textbox width="220" :list="commonInvoicesList" listid="commonInvoicesList" :value="item" id="remark"></yhm-form-td-textbox>
              <yhm-form-td-upload-image width="90" tag="Invoice" @mouseover="invoiceImg(item)" @mouseout="invoiceImgHide(item)" :list="commonInvoicesList" listid="commonInvoicesList" :value="item" id="url" rule="#"></yhm-form-td-upload-image>
              <yhm-form-td-delete width="40" :list="commonInvoicesList" :value="item" :del-click="true" @click="delInvoice(item,index)"></yhm-form-td-delete>
            </tr>
          </template>
          <template #empty>
            <span class="m_listNoData"  v-show="commonInvoicesList.length===0">暂时没有数据</span>
          </template>
        </yhm-form-list-edit>
        <div class="invoiceImgView" v-show="viewImgShow" @click="imgHide">
          <img :src="viewImg" alt="">
        </div>
        <yhm-formupload :ownerID="id" :value="fileList" id="fileList" title="上传单据" tag="Deposit" subtitle="" multiple="multiple" rule="#"></yhm-formupload>
      </template>
    </yhm-formbody>

    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn>
        <yhm-commonbutton value="保存" icon="btnSave" :flicker="true" @call="save()"></yhm-commonbutton>
      </template>
    </yhm-formoperate>
  </div>
</template>

<script>
  import {formmixin} from '@/assets/form.js'
  import {number2chinese,accMul, accAdd, guid, formatTime, formatDate} from '@/assets/common.js'
  export default {
    name: 'payDepositForm',
    mixins: [formmixin],
    data(){
      return{
        categoryList:[],
        subjectPsd:[],
        subjectID:'535A2EEA-6FF5-4300-889E-04B6A81CCB28',
        category:'',
        isReceopt:'0',
        isReceoptPsd:[],
        workDate:'',
        mixRefundDate:'',
        refundDate:'',
        otherID:'',
        other:'',
        otherAccountID:'',
        otherAccount:'',
        money:'',
        remark:'',
        personID:'',
        person:'',
        capitalMoney:'',
        fileList:[],
        commonInvoicesList:[],
        sumMoney:'',//收据总金额
        viewImgShow: false,
        viewImg:'',         //需要显示的发票路径
        listCategoryPsd:
        [{
          code:'',
          num:'0',
          img:'',
          showName:'单张',
        }],
        isAddBtn:true,
        nowDate: formatDate(new Date()),
      }
    },
    created(){
      this.setQuery2Value('otherID')
      this.setQuery2Value('otherAccountID')
      this.setQuery2Value('category')
      this.person=sessionStorage.getItem('____currentUser')
      this.personID=sessionStorage.getItem('____currentUserID')
      let date=new Date()
      this.workDate=date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()
      this.mixRefundDate=date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()
      let params={}
      if(this.otherID!==''&&this.otherID!==null){
        params={
          otherID:this.otherID,
          otherAccountID:this.otherAccountID,
          category:this.category
        }
      }
      this.init({
        url: '/dailyoffice/payDeposit/initForm',
        data:params,
        all: (data) => {
          this.categoryList = data.categoryPsd.list
          this.subjectPsd = data.subjectPsd.list
          this.isReceoptPsd = data.isReceoptPsd.list
        },
        add: (data) => {
          if(this.otherID!==''&&this.otherID!==null) {
            this.other = data.other
            this.otherAccount = data.otherAccount
          }
          this.category = data.categoryPsd.value
          let insertDate = new Date(accAdd(new Date().getTime(), accMul(this.commonInvoicesList.length, 1000)))
          this.commonInvoicesList.push({
            id: guid(),
            insertDate: formatTime(insertDate),
            ownerID: this.id,
            code: '',
            workDate: '',
            category: '0',
            quantity: '1',
            money:'',
            remark: '',
            url: '',
            pdfUrl: '',
            isPdf: '0',
            invoiceID: ''
          })
        },
        look: (data) => {
          this.workDate=data.workDate
          this.category=data.category
          this.capitalMoney=data.capitalMoney
          this.money=data.money
          this.personID=data.personID
          this.person=data.person
          this.otherID=data.otherID
          this.other=data.other
          this.otherAccountID=data.otherAccountID
          this.otherAccount=data.otherAccount
          this.fileList=data.fileList
          this.categoryPsd=data.categoryPsd
          this.remark=data.remark
          this.subjectID=data.subjectID
          this.refundDate=data.refundDate
          this.commonInvoicesList=data.commonInvoicesList
          this.isReceopt=data.isReceopt
          let sumMoney = 0
          for(let i in this.commonInvoicesList){
            if(this.commonInvoicesList[i].category === '1'){
              sumMoney = accAdd(sumMoney,accMul(this.commonInvoicesList[i].quantity,this.commonInvoicesList[i].money))
            }else{
              sumMoney = accAdd(sumMoney,this.commonInvoicesList[i].money)
            }
          }
          this.sumMoney=sumMoney
          if(parseFloat(sumMoney) === parseFloat(this.money)){
            this.isAddBtn=false
          }
        }
      })
    },
    methods:{
      addReceipt(){
        let insertDate = new Date(accAdd(new Date().getTime(), accMul(this.commonInvoicesList.length, 1000)))
        this.commonInvoicesList.push({
          id: guid(),
          insertDate: formatTime(insertDate),
          ownerID: this.id,
          code: '',
          workDate: '',
          category: '0',
          quantity: '1',
          money:'',
          remark: '',
          url: '',
          pdfUrl: '',
          isPdf: '0',
          invoiceID: ''
        })
      },
      //显示发票图片
      invoiceImg(item){
        if(item.url !== '') {
          if(item.isPdf === '0'){
            this.viewImg = '/UploadFile/Invoice/' + item.url
          }
          else{
            this.viewImg = '/UploadFile/Invoice/' + item.url
          }
          this.viewImgShow = true
        }
      },
      //隐藏发票图片
      imgHide(item){
        if(item.url !== '') {
          this.viewImgShow = false
        }
      },
      invoiceImgHide(item){
        if(item.url !== '') {
          this.viewImgShow = false
        }
      },
      //计算发票金额
      calculationInvoiceMoneyMain(item,index){
        let sumMoney = 0
        for(let i in this.commonInvoicesList){
          if(this.commonInvoicesList[i].category === '1'){
            sumMoney = accAdd(sumMoney,accMul(this.commonInvoicesList[i].quantity,this.commonInvoicesList[i].money))
          }else{
            sumMoney = accAdd(sumMoney,this.commonInvoicesList[i].money)
          }
        }
        if(parseFloat(sumMoney)>parseFloat(this.money)){
          this.$dialog.alert({
            tipValue: "金额输入有误",
            closeCallBack: (data) => {
              this.commonInvoicesList[index].money=''
            }
          })
        }else if(parseFloat(sumMoney) === parseFloat(this.money)){
          this.isAddBtn=false
          this.sumMoney=sumMoney
        }else{
          this.isAddBtn=true
          this.sumMoney=sumMoney
        }
      },
      //票面金额input事件
      invoicesMoneyInputEvent(item,index){
        if(item.quantity!==''&&item.quantity!==null&&item.money!==''&&item.money!==null){
          this.commonInvoicesList[index].actualMoney=accMul(item.money,item.quantity)
        }
        this.calculationInvoiceMoneyMain(item,index)
      },
      //发票数量input事件
      invoicesQuantityInputEvent(item,index){
        if(item.quantity!==''&&item.quantity!==null&&item.money!==''&&item.money!==null){
          this.commonInvoicesList[index].actualMoney=accMul(item.money,item.quantity)
        }
        this.calculationInvoiceMoneyMain(item,index)
      },
      //发票明细中的发票类型（单张还是连号首张）
      switchInvoiceCategory(item){
        if(item.category === '0') {
          //单张情况
          item.quantity = "1"
        }
        else{
          //连号首张
          item.quantity = ""
        }
        this.verificationRepeatInvoice(item)
      },
      isRepeatInvoice(){
        let result = true
        if(this.commonInvoicesList.length > 0){
          var arr = [],arrRepeat = []
          for (let i in this.commonInvoicesList) {
            let code = this.commonInvoicesList[i].code
            if (code !== '') {
              if(this.commonInvoicesList[i].category === '0'){
                if (arr[code]) {
                  if (arrRepeat.indexOf(code) === -1) {
                    arrRepeat.push(code)
                  }
                } else {
                  arr[code] = code
                }
              }
              else {
                let count = this.commonInvoicesList[i].quantity
                for(let j = 0; j < count; j++){
                  if (arr[code]) {
                    if (arrRepeat.indexOf(code) === -1) {
                      arrRepeat.push(code)
                    }
                  } else {
                    arr[code] = code
                  }
                  code = accAdd(code,1)
                }
              }
            }
          }
          if(arrRepeat.length > 0){
            result = false
            let width = accAdd(300,accMul(arrRepeat[0].length,10))
            this.$dialog.alert({
              tipValue:'发票号码（ <b class="red"> '  + arrRepeat[0] + ' </b> ）重复了',
              alertImg:'warn',
              width:width
            })
          }
        }
        return result
      },
      //查看发票是否使用过
      verificationRepeatInvoice(item,index){
        if(this.isRepeatInvoice()) {
          if (item.code !== '' && item.quantity !== '') {
            let params = {
              id: this.ownerID,
              code: item.code,
              category: item.category,
              quantity: item.quantity
            }
            this.ajaxJson({
              url: '/PersonOffice/verifyReimbursementDetailInvoiceCode',
              data: params,
              call: (result) => {
                if (result.type === 0) {
                  this.commonInvoicesList[index].code=''
                  let width = 250
                  width = accAdd(width, accMul(result.val.length, 15))
                  this.$dialog.alert({
                    tipValue: '重复收据号：<b class="red">（' + result.val + '）</b>',
                    alertImg: 'error',
                    width: width
                  })
                }
              }
            })
            this.ajaxJson({
              url: '/dailyoffice/payDeposit/isExistCode',
              data: {
                code:item.code
              },
              call: (result) => {
                if (result.type === 1) {
                  this.commonInvoicesList[index].code=''
                  let width = 250
                  width = accAdd(width, accMul(result.errorMessage.length, 15))
                  this.$dialog.alert({
                    tipValue: '重复收据号：<b class="red">（' + result.errorMessage + '）</b>',
                    alertImg: 'error',
                    width: width
                  })
                }
              }
            })
          }
        }
      },
      delInvoice(item,index){
        this.commonInvoicesList.splice(index,1)
        this.calculationInvoiceMoneyMain(item,index)
      },
      selectSelfAccount(){
        this.$dialog.OpenWindow({
          width: 950,
          height: 692,
          url:'/selectPublicAccount?categoryUnit=0&category=1' ,
          title: '选择收款账号',
          closeCallBack: (data) => {
            if(data){
              this.selfAccountID=data.id
              this.selfAccount=data.publicAccountExplain
            }
          }
        })
      },
      clearother(){
        this.otherID=''
        this.other=''
        this.otherAccountID=''
        this.otherAccount=''
      },
      selectWareHouser(){
        let url=''
        if(this.category==0){
          url='/selectUnit?&category=1'
        }else{
          url='/selectPerson?&category=1'
        }
        this.$dialog.OpenWindow({
          width: 950,
          height: 692,
          url: url,
          title: "选择付款方",
          closeCallBack: (data) => {
            this.other = data.name
            this.otherID = data.id
            this.selectAccount()
          }
        })
      },
      selectAccount(){
        if(this.other){
          let url=''
          if(this.category==0){
            url='/selectPublicAccount?unitID='+this.otherID+'&categoryUnit=1&category=1'//对公----
          }else{
            url='/selectPrivateAccount?personID='+this.otherID+'&categoryUnit=1&category=1'//对私----
          }
          this.$dialog.OpenWindow({
            width: 950,
            height: 692,
            url:url ,
            title: '选择收款账号',
            closeCallBack: (data) => {
              if(data){
                this.otherAccount = data.publicAccountExplain
                this.otherAccountID = data.id
                if(data.bankID===''||data.bankID===null){
                  if(this.category==0){
                    this.otherAccount =''
                    this.updataPublicAccount(data.id)
                  }else{
                    this.otherAccount =''
                    this.updataPublicAccount(data.id)
                  }
                }
              }
            }
          })
        }else{
          this.selectWareHouser()
        }
      },
      updataPrivateAccount(id){
        this.$dialog.OpenWindow({
          width: 1050,
          height: 750,
          url:'/privateAccountForm?id=' + id,
          title:'维护账户信息',
          closeCallBack:(information) =>{
            if (information) {
              let params = {
                id: id
              }
              this.ajaxJson({
                url: '/Fin/getPublicAccountBank',
                data: params,
                call: (data)=>{
                  if(data){
                    this.otherAccount = data.html
                  }
                }
              })
            }else{
              this.otherAccount = ''
              this.otherAccountID = ''
              // this.updataPublicAccount(id)
            }
          }
        })
      },
      updataPublicAccount(id){
        this.$dialog.OpenWindow({
          width: 1050,
          height: 750,
          url:'/publicAccountForm?id=' + id,
          title:'维护账户信息',
          closeCallBack:(information) =>{
            if (information) {
              let params = {
                id: id
              }
              this.ajaxJson({
                url: '/Fin/getPublicAccountBank',
                data: params,
                call: (data)=>{
                  if(data){
                    this.otherAccount = data.html
                  }
                }
              })
            }else{
              this.otherAccount = ''
              this.otherAccountID = ''
              // this.updataPublicAccount(id)
            }
          }
        })
      },
      save(){
        let a = true
        let b = true
        if(this.isReceipt === '1'){
          if (parseFloat(this.money) !== parseFloat(this.sumMoney)){
            a = false
          }
          if(this.commonInvoicesList.length===1){
            b=false
          }
        }
        if(this.validator()&&a&&b){
          let param={
            id:this.id,
            workDate:this.workDate,
            personID:this.personID,
            person:this.person,
            refundDate:this.refundDate,
            category:this.category,
            otherID:this.otherID,
            other:this.other,
            otherAccountID:this.otherAccountID,
            otherAccount:this.otherAccount,
            money:this.money,
            capitalMoney:this.capitalMoney,
            subjectID:this.subjectID,
            remark:this.remark,
            fileList:this.fileList,
            isReceopt:this.isReceopt,
            commonInvoicesList:this.commonInvoicesList
          }
          this.ajaxJson({
            url: '/dailyoffice/payDeposit/save',
            data: param,
            call: (data) => {
              if (data.type === 0) {
                this.$dialog.setReturnValue(this.id) //向父级页面id值
                this.$dialog.alert({
                  tipValue: data.message,
                  closeCallBack: () => {
                    this.$dialog.close()
                  }
                })
              } else {
                this.$dialog.alert({
                  alertImg: 'error',
                  tipValue: data.message,
                  closeCallBack: () => {
                  }
                })
              }
            }
          })
        }
      }
    },
    watch: {
      money () {
        this.capitalMoney = number2chinese(this.money)
        this.actualMoney = this.money
      },
    },
  }
</script>

<style scoped>

</style>
