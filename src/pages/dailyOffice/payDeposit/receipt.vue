<template>
  <div class="f_main">
    <yhm-formbody>
      <template #control>
        <yhm-form-text title="付款金额" tip="value" :value="money" id="money" no-edit="1"></yhm-form-text>
      </template>
    </yhm-formbody>
    <div class="f_split"></div>
    <yhm-form-list-edit>
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
    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn v-if="isBtn">
        <yhm-commonbutton value="保存" icon="btnSave" :flicker="true" @call="save()" category="one"></yhm-commonbutton>
      </template>
    </yhm-formoperate>
  </div>
</template>

<script>
  import { accMul, accAdd, guid, formatTime, formatDate} from '@/assets/common.js'
  import { formmixin } from '@/assets/form.js'
  export default {
    name: 'receipt',
    mixins: [formmixin],
    data () {
      return {
        ownerID: '',
        viewImgShow: false,
        viewImg:'',         //需要显示的发票路径
        money:'',         //需要显示的发票路径
        commonInvoicesList:[],
        isOne:'',
        listCategoryPsd:
          [{
            code:'',
            num:'0',
            img:'',
            showName:'单张',
          }],
        isBtn:false,
        isAddBtn:false,
        nowDate: formatDate(new Date()),
        sumMoney:'',
      }
    },
    created () {
      this.setQuery2Value('ownerID')
      this.setQuery2Value('money')
      this.setQuery2Value('isOne')
      if(this.isOne==='0'){
        this.addReceipt()
        this.isBtn=true
        this.isAddBtn=true
      }
    },
    methods: {
      //添加发票
      addReceipt(){
        let insertDate = new Date(accAdd(new Date().getTime(), accMul(this.commonInvoicesList.length, 1000)))
        this.commonInvoicesList.push({
          id: guid(),
          insertDate: formatTime(insertDate),
          ownerID: this.ownerID,
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
      save(){
        let aa = true
        if(this.commonInvoicesList.length === 0){
          aa = false
        }
        let cc = true
        if (parseFloat(this.money) !== parseFloat(this.sumMoney)){
          cc = false
        }
        if(!cc){
          this.$dialog.alert({
            tipValue: '收据金额和付款金额不一致!',
            width:300,
            alertImg: 'warn',
          })
        }
        if (aa && cc && this.validator()&&this.commonInvoicesList.length>0) {
          this.$dialog.confirm({
            tipValue: '确定保存？',
            okCallBack: () => {
              let params = {
                id: this.ownerID,
                commonInvoicesList: this.commonInvoicesList,
              }
              this.ajaxJson({
                url: '/dailyoffice/payDeposit/receoptSave',
                data: params,
                call: (data) => {
                  if (data.type === 0) {
                    this.$dialog.setReturnValue(this.ownerID)
                    this.$dialog.alert({
                      tipValue: data.message,
                      closeCallBack: (data) => {
                        this.$dialog.close()
                      }
                    })
                  } else if(data.type === 1){
                    this.$dialog.alert({
                      alertImg: 'warn',
                      tipValue: data.message,
                      closeCallBack: (data) => {
                      }
                    })
                  }else{
                    let width = 250
                    width = accAdd(width, accMul(data.errorMessage.length, 15))
                    this.$dialog.alert({
                      alertImg: 'warn',
                      width: width,
                      tipValue:'发票号码（ <b class="red"> '  + data.errorMessage + ' </b> ）重复了',
                      closeCallBack: (data) => {
                      }
                    })
                  }
                }
              })
            }
          })
        }
      },
    }
  }
</script>

<style scoped lang="less">
.invoiceImgView{
  width: 930px !important;
  height: 580px !important;
  left: -90px !important;
  img{
    max-width: 900px !important;
    height: 100%;
    max-height: 600px !important;
  }
}
</style>
