<template>
  <div class="f_main">
    <yhm-formbody>
      <template #control>
        <yhm-form-text title="付款金额" tip="value" :value="money" id="money" no-edit="1"></yhm-form-text>
      </template>
    </yhm-formbody>
    <div class="f_split"></div>
    <yhm-form-list-edit>
      <template #title>发票明细</template>
      <template #operate>
<!--        <yhm-commonbutton :show="electronicInvoiceBtn" value="选择电子发票" icon="btnAdd" @call="selectInvoiceOperate"></yhm-commonbutton>-->
<!--        <yhm-commonbutton :show="addInvoiceShow" value="添加发票" icon="btnAdd" @call="addInvoice"></yhm-commonbutton>-->
        <yhm-commonbutton :show="isAddBtn" value="选择电子发票" icon="btnAdd" @call="selectInvoiceOperate"></yhm-commonbutton>
        <yhm-commonbutton :show="isAddBtn" value="添加发票" icon="btnAdd" @call="addInvoice"></yhm-commonbutton>
      </template>
      <template #listHead>
        <yhm-managerth style="width: 130px" title="发票号码"></yhm-managerth>
        <yhm-managerth style="width: 140px" title="开票日期"></yhm-managerth>
        <yhm-managerth style="width: 160px" title="类型"></yhm-managerth>
        <yhm-managerth style="width: 90px" title="发票张数"></yhm-managerth>
        <yhm-managerth style="width: 90px" title="票面金额"></yhm-managerth>
        <yhm-managerth style="width: 220px" title="备注"></yhm-managerth>
        <yhm-managerth style="width: 90px" title="发票照片"></yhm-managerth>
        <yhm-managerth style="width: 40px" title="操作"></yhm-managerth>
      </template>
      <template #listBody>
        <tr v-for="(item,index) in paymentInvoiceList" :key="index" :class="{InterlacBg:index%2!==0}">
          <yhm-form-td-textbox width="130" @change="verificationRepeatInvoice(item)" :no-edit="item.isPdf === '1' || !isAddBtn?'1':0" :list="paymentInvoiceList" listid="paymentInvoiceList" :value="item" id="code" rule="R0000"></yhm-form-td-textbox>
          <yhm-form-td-date width="140" :no-edit="item.isPdf === '1' || !isAddBtn?'1':0" position="b" :list="paymentInvoiceList" listid="paymentInvoiceList" :value="item" id="workDate" rule="R0000"></yhm-form-td-date>
          <yhm-form-td-radio width="160" :no-edit="!isAddBtn || item.isPdf==='1' ? 1 : 0" @call="switchInvoiceCategory" :list="paymentInvoiceList" listid="paymentInvoiceList" :value="item" :select-list="listCategoryPsd" id="category"></yhm-form-td-radio>
          <yhm-form-td-textbox width="90" :no-edit="item.isPdf === '1' || !isAddBtn?'1':0" @change="verificationRepeatInvoice(item)" @input="invoicesQuantityInputEvent" :list="paymentInvoiceList" listid="paymentInvoiceList" :value="item" id="quantity" rule="R1000"></yhm-form-td-textbox>
          <yhm-form-td-textbox width="90" :no-edit="item.isPdf === '1' || !isAddBtn?'1':0" @input="invoicesMoneyInputEvent" before-icon="rmb" :list="paymentInvoiceList" listid="paymentInvoiceList" :value="item" id="money" rule="R3000"></yhm-form-td-textbox>
          <yhm-form-td-textbox width="220" :no-edit="item.isPdf === '1' || !isAddBtn?'1':0" :list="paymentInvoiceList" listid="paymentInvoiceList" :value="item" id="remark"></yhm-form-td-textbox>
          <yhm-form-td-upload-image width="90" :no-upload="item.isPdf === '1' || !isAddBtn?'1':0" tag="Invoice" @mouseover="invoiceImg(item)" @mouseout="invoiceImgHide(item)" :list="paymentInvoiceList" listid="paymentInvoiceList" :value="item" id="url" rule="#"></yhm-form-td-upload-image>
          <yhm-form-td-delete :no-click="isAddBtn ? 0 : 1" width="40" :list="paymentInvoiceList" :value="item" :del-click="true" @click="delInvoice(item,index)"></yhm-form-td-delete>
        </tr>
      </template>
    </yhm-form-list-edit>
    <div class="invoiceImgView" v-show="viewImgShow" @click="imgHide">
      <img :src="viewImg" alt="">
    </div>
    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn v-if="isBtn">
        <yhm-commonbutton v-show="isSave" value="保存" icon="btnSave" :flicker="true" @call="save()" category="one"></yhm-commonbutton>
        <yhm-commonbutton v-show="isSubSave" value="保存并提交" :flicker="isFlicker" icon="btnSave" @call="saveSub()" category="one"></yhm-commonbutton>
        <yhm-commonbutton v-show="isOpera" value="通过" :flicker="isFlicker" icon="i-btn-applicationSm" @call="adoptEvent" category="one"></yhm-commonbutton>
        <yhm-commonbutton v-show="isOpera" value="驳回" :flicker="isFlicker" icon=i-btn-turnDown @call="rejectEvent" category="one"></yhm-commonbutton>
      </template>
    </yhm-formoperate>
  </div>
</template>

<script>
  import { accMul, accAdd, guid, formatTime} from '@/assets/common.js'
  import { formmixin } from '@/assets/form.js'
  export default {
    name: 'paymentInvoice',
    mixins: [formmixin],
    data () {
      return {
        ownerID: '',
        elInvoice: true,
        empty: true,
        paymentInvoice: [],
        paymentInvoiceList: [],
        listCategoryPsd:[],
        isBtn:true,
        track: '',
        invoiceMoney: '',
        isLook: false,
        isSave: true,
        isSubSave: false,
        isFlicker: false,
        isOpera: false,
        isAddBtn: true,
        viewTrack: '',
        electronicInvoiceBtn : true ,
        addInvoiceShow : true ,
        // getIsElectronicInvoice : '' ,
        getDeleteInvoiceBtnShow : false,
        viewImgShow: false,
        viewImg:'',         //需要显示的发票路径
        money:'',         //需要显示的发票路径
      }
    },
    created () {
      this.setQuery2Value('track')
      this.setQuery2Value('viewTrack')
      this.setQuery2Value('ownerID')
      this.setQuery2Value('money')
      if(this.viewTrack === '1'){//查看页面
        this.isBtn = false
        this.isLook = true
        this.isAddBtn = false
      }
      if(this.track === '-1'){
        this.isSubSave = true
        let params = {
          ownerID: '',
          track:'',
        }
        this.ajaxJson({
          url: '/PersonOffice/paymentTrackByID',
          data: params,
          call: (data)=>{
            if(data){
              this.listCategoryPsd=data.listCategoryPsd.list
              let insertDate = new Date(accAdd(new Date().getTime(), accMul(this.paymentInvoiceList.length, 1000)))
              this.paymentInvoiceList.push({
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
            }
          }
        })
      }else if(this.track === '1'){
        this.isSave = false
        this.isSubSave = true
        this.isFlicker = true
        let params = {
          ownerID: this.ownerID,
          track: this.track,
        }
        this.ajaxJson({
          url: '/PersonOffice/paymentTrackByID',
          data: params,
          call: (data)=>{
            if(data){
              this.paymentInvoice = data.paymentInvoice
              this.listCategoryPsd=data.listCategoryPsd.list
              this.paymentInvoiceList=data.paymentInvoice
            }
          }
        })
      }else if(this.track === '0'){
        /* 查看 */
        this.isSubSave = true
        this.isAddBtn = true
        let params = {
          ownerID: this.ownerID,
          track: this.track,
        }
        this.ajaxJson({
          url: '/PersonOffice/paymentTrackByID',
          data: params,
          call: (data)=>{
            if(data){
              this.paymentInvoice = data.paymentInvoice
              this.listCategoryPsd=data.listCategoryPsd.list
              this.paymentInvoiceList=data.paymentInvoice
            }
          }
        })
      }else if(this.track === '2'){
        this.isSave = false
        this.isOpera = true
        this.isAddBtn = false
        this.isLook = true
        let params = {
          ownerID: this.ownerID,
          track: this.track,
        }
        this.ajaxJson({
          url: '/PersonOffice/paymentTrackByID',
          data: params,
          call: (data)=>{
            if(data){
              this.paymentInvoice = data.paymentInvoice
              this.listCategoryPsd=data.listCategoryPsd.list
              this.paymentInvoiceList=data.paymentInvoice
            }
          }
        })
      }
    },
    methods: {
      listView(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '750',
          url: '/myElectronicInvoiceForm?id=' + item.id,
          title: '查看电子发票',
          closeCallBack: ()=>{

          }
        })
      },
      /* 通过 */
      adoptEvent(){
        this.$dialog.confirm({
          tipValue: '是否通过？',
          okCallBack: () => {
            let params = {
              id: this.ownerID,
              state: '2'
            }
            this.ajaxJson({
              url: '/PersonOffice/submitPaymentTrack',
              data: params,
              call: (data) => {
                if (data.type === 0) {
                  this.$dialog.setReturnValue(this.ownerID)
                  this.$dialog.alert({
                    tipValue: data.message,
                    closeCallBack: () => {
                      this.$dialog.close()
                    }
                  })
                } else {
                  this.$dialog.alert({
                    alertImg: 'warn',
                    tipValue: data.message
                  })
                }
              }
            })
          }
        })
      },
      /* 驳回 */
      rejectEvent(){
        this.$dialog.confirm({
          tipValue: '是否驳回？',
          okCallBack: () => {
            let params = {
              id: this.ownerID,
              state: '0'
            }
            this.ajaxJson({
              url: '/PersonOffice/submitPaymentTrack',
              data: params,
              call: (data) => {
                if (data.type === 0) {
                  this.$dialog.setReturnValue(this.ownerID)
                  this.$dialog.alert({
                    tipValue: data.message,
                    closeCallBack: () => {
                      this.$dialog.close()
                    }
                  })
                } else {
                  this.$dialog.alert({
                    alertImg: 'warn',
                    tipValue: data.message
                  })
                }
              }
            })
          }
        })
      },
      //添加发票
      addInvoice(){
        let insertDate = new Date(accAdd(new Date().getTime(), accMul(this.paymentInvoiceList.length, 1000)))
        this.paymentInvoiceList.push({
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
      // //选择电子发票
      // selectInvoice(){
      //   let len = this.paymentInvoiceList.length
      //   let sign = true
      //   if(sign){
      //     this.$dialog.confirm({
      //       tipValue:'选择电子发票将清空你填写的纸质发票，确定选择电子发票吗？',
      //       width:'600',
      //       btnValueOk:'选择电子发票',
      //       okCallBack:() => {
      //         this.selectInvoiceOperate()
      //       }
      //     })
      //   }
      //   else{
      //     this.selectInvoiceOperate()
      //   }
      // },
      //显示发票图片
      invoiceImg(item){
        if(item.url !== '') {
          if(item.isPdf === '0'){
            this.viewImg = '/UploadFile/Invoice/' + item.url
          }
          else{
            this.viewImg = '/UploadFile/electronicInvoice/' + item.url
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
        return
        if(item.url !== '') {
          this.viewImgShow = false
        }
      },
      //计算发票金额
      calculationInvoiceMoney(){
        let money = 0
        let quantity = 0
        for(let i in this.paymentInvoiceList){
          let item = this.paymentInvoiceList[i]
          let temp = item.money
          if(isNaN(temp) || temp === ''){
            temp = 0
          }
          let count = item.quantity
          if(isNaN(count) || count === ''){
            count = 1
          }
          quantity = accAdd(quantity,count)
          temp = accMul(temp,count)
          money = accAdd(money,temp)
        }
        this.invoiceCount = quantity + ''
        this.invoiceMoney = money + ''

      },
      //票面金额input事件
      invoicesMoneyInputEvent(){
        this.calculationInvoiceMoney()
      },
      //发票数量input事件
      invoicesQuantityInputEvent(){
        this.calculationInvoiceMoney()
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
        if(this.paymentInvoiceList.length > 0){
          var arr = [],arrRepeat = []
          for (let i in this.paymentInvoiceList) {
            let code = this.paymentInvoiceList[i].code
            if (code !== '') {
              if(this.paymentInvoiceList[i].category === '0'){
                if (arr[code]) {
                  if (arrRepeat.indexOf(code) === -1) {
                    arrRepeat.push(code)
                  }
                } else {
                  arr[code] = code
                }
              }
              else {
                let count = this.paymentInvoiceList[i].quantity
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
      verificationRepeatInvoice(item){
        if(this.isRepeatInvoice()) {
          if (item.code !== '' && item.quantity !== '') {
            let params = {
              id: this.ownerID,
              code: item.code,
              category: item.category,
              quantity: item.quantity
            }
            let result = this.ajaxAsync({
              url: '/PersonOffice/verifyReimbursementDetailInvoiceCode',
              data: params,
            })

            if(result.type === 0){
              let width = 250
              width = accAdd(width, accMul(result.val.length, 15))
              this.$dialog.alert({
                tipValue: result.message + '：<b class="red">（' + result.val + '）</b>',
                alertImg: 'error',
                width: width
              })
            }else if(result.type === 2){
              this.$dialog.alert({
                alertImg: 'error',
                // tipValue: result.message,
                tipValue:'重复发票号<b class="red">（' + result.message + '）</b>！！！',
              })
            }
          }
        }
      },
      //选择电子发票操作
      selectInvoiceOperate(){
        this.$dialog.OpenWindow({
          url:'/selectElectronicInvoice?state=0&relevanceID=' + this.ownerID + "&relevanceType=1",
          width: "1000",
          height: "650",
          title: '选择电子发票',
          closeCallBack: (data)=>{
            if(data){
              // this.paymentInvoiceList = []
              // this.isElectronicInvoice = true
              // this.getIsElectronicInvoice = '1'
              let insertDate = new Date(accAdd(new Date().getTime(), accMul(this.paymentInvoiceList.length, 1000)))
              this.paymentInvoiceList.push({
                id: guid(),
                insertDate: formatTime(insertDate),
                ownerID: this.ownerID,
                code: data.num,
                workDate: data.openDate,
                category: '0',
                quantity: '1',
                money:data.totalMoney,
                remark: data.remark,
                url: data.imgUrl,
                pdfUrl: data.pdfUrl,
                isPdf: '1',
                invoiceID: data.id
              })
              this.maxWorkDate = data.openDate
              this.invoiceMoney = data.totalMoney
              this.invoiceCount = '1'
              this.calculationInvoiceMoney()
            }
          }
        })
      },
      delInvoice(item,index){
        if(!this.isLook){
          this.$dialog.confirm({
            tipValue: '确认删除此条数据？',
            okCallBack: ()=>{
              let params = {
                id: item.id
              }
              this.ajaxJson({
                url: '/PersonOffice/paymentTrackInvoiceDel',
                data: params,
                call: (data)=>{
                  if(data.type === 0){

                    this.$dialog.alert({
                      tipValue: data.message,
                      closeCallBack: ()=>{
                        this.$dialog.setReturnValue('123')
                        this.paymentInvoiceList.splice(index,1)
                        this.empty = this.paymentInvoiceList.length  === 0
                        if(this.paymentInvoiceList.length === 0){
                          this.addInvoice()
                        }
                      }
                    })
                  }else{
                    this.$dialog.alert({
                      alertImg: 'warn',
                      tipValue:data.message
                    })
                  }
                }
              })
            }
          })
        }
      },

      invoiceUpList(){
        let insertInvoiceDate = new Date(accAdd(new Date().getTime(), accMul(this.paymentInvoice.length, 1000)))
        let item = {
          id: guid(),
          insertDate: formatTime(insertInvoiceDate),   //当前时间
          ownerID: this.ownerID,   // ownerID
          invoiceID: this.invoiceID   //当条发票的ID
        }
        this.paymentInvoiceList.push(item)
      },
      save(){
        this.calculationInvoiceMoney()
        let aa = true
        if(this.paymentInvoiceList.length === 0){
          aa = false
        }
        let bb = this.isRepeatInvoice()
        let cc = this.invoiceMoney === this.money
        if(!cc){
          this.$dialog.alert({
            tipValue: '发票金额和付款金额不一致!',
            width:300,
            alertImg: 'warn',
          })
        }
        if (aa && bb && cc && this.validator()) {
          this.$dialog.confirm({
            tipValue: '确定保存？',
            okCallBack: () => {
              let params = {
                id: guid(),
                ownerID: this.ownerID,
                paymentInvoice: this.paymentInvoiceList,
              }
              this.ajaxJson({
                url: '/PersonOffice/paymentTrackSave',
                data: params,
                call: (data) => {
                  if (data.type === 0) {
                    this.$dialog.setReturnValue(this.ownerID)
                    this.$dialog.alert({
                      tipValue: data.message,
                      closeCallBack: (data) => {
                        this.isSubSave = true
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
      saveSub(){
        this.calculationInvoiceMoney()
        let aa = true
        if(this.paymentInvoiceList.length === 0){
          aa = false
        }
        let bb = this.isRepeatInvoice()
        let cc = this.invoiceMoney === this.money
        if(!cc){
          this.$dialog.alert({
            tipValue: '发票金额和付款金额不一致!',
            width:300,
            alertImg: 'warn',
          })
        }
        if (aa && bb && cc && this.validator()) {
          this.$dialog.confirm({
            tipValue: '确定提交？',
            okCallBack: () => {
              let params = {
                id: guid(),
                ownerID: this.ownerID,
                paymentInvoice: this.paymentInvoiceList,
              }
              this.ajaxJson({
                url: '/PersonOffice/paymentTrackSave',
                data: params,
                call: (data) => {
                  if (data.type === 0) {
                    let params = {
                      id: this.ownerID
                    }
                    this.ajaxJson({
                      url: '/PersonOffice/getPayTrackMoney',
                      data: params,
                      call: (data)=>{
                        if(data.type === 0){
                          let params = {
                            id: this.ownerID,
                            state: '1',
                          }
                          this.ajaxJson({
                            url: '/PersonOffice/submitPaymentTrack',
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
                              } else {
                                this.$dialog.alert({
                                  alertImg: 'warn',
                                  tipValue: data.message,
                                  closeCallBack: (data) => {
                                  }
                                })
                              }
                            }
                          })
                        }else{
                          this.$dialog.alert({
                            alertImg: 'error',
                            tipValue: data.message
                          })
                        }
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

      }
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
    max-height: 600px !important;
  }
}
</style>
