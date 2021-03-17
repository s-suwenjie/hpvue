<template>
  <div  class="f_main">
    <yhm-formbody>
      <template #title>基础数据信息</template>
      <template #control>
        <yhm-form-select title="公司名称" @click="selectUnit('0')" :value="unit" id="unit" rule="R0000"></yhm-form-select>
        <yhm-form-text title="税号" no-edit="1" :value="unitTaxNumber" id="unitTaxNumber" rule="R0000"></yhm-form-text>
        <yhm-form-text title="地址" no-edit="1" :value="unitAddress" id="unitAddress" :rule="unitRule"></yhm-form-text>
        <yhm-form-text title="电话" no-edit="1" :value="unitTel" id="unitTel" :rule="unitRule"></yhm-form-text>
        <yhm-form-text title="开户行" no-edit="1" :value="unitBank" id="unitBank" :rule="unitRule"></yhm-form-text>
        <yhm-form-text title="账号" no-edit="1" :value="unitAccount" id="unitAccount" :rule="unitRule"></yhm-form-text>
      </template>
    </yhm-formbody>
    <div class="f_split"></div>
    <yhm-formbody>
      <template #title>发票抬头信息</template>
      <template #control>
        <yhm-form-select title="公司名称" @click="selectUnit('1')" :value="otherUnit" id="otherUnit" rule="R0000"></yhm-form-select>
        <yhm-form-text title="税号" no-edit="1" :value="otherTaxNumber" id="otherTaxNumber" rule="R0000"></yhm-form-text>
        <yhm-form-text title="地址" no-edit="1" :value="otherAddress" id="otherAddress" :rule="otherUnitRule"></yhm-form-text>
        <yhm-form-text title="电话" no-edit="1" :value="otherTel" id="otherTel" :rule="otherUnitRule"></yhm-form-text>
        <yhm-form-text title="开户行" no-edit="1" :value="otherBank" id="otherBank" :rule="otherUnitRule"></yhm-form-text>
        <yhm-form-text title="账号" no-edit="1" :value="otherAccount" id="otherAccount" :rule="otherUnitRule"></yhm-form-text>
      </template>
    </yhm-formbody>
    <div class="f_split"></div>
    <yhm-formbody>
      <template #control>
        <yhm-form-radio title="开发票类型" @call="selectCategory" :no-edit="otherCategory==='1'" :select-list="invoiceTypeList"  :value="invoiceType" id="invoiceType" rule="R0000" width="1"></yhm-form-radio>
        <yhm-form-radio title="款项状态" :select-list="isReceivablesList"  :value="isReceivables" id="isReceivables" rule="R0000"></yhm-form-radio>
        <yhm-form-list-edit :show="isReceivables === '0'" style="border: none;width: 998px">
          <template #title>收支明细</template>
          <template #operate>
            <yhm-commonbutton value="选择收支明细" icon="btnAdd" @call="selectBankDetail"></yhm-commonbutton>
          </template>
          <template #listHead>
            <yhm-managerth style="width: 140px" title="收款账号"></yhm-managerth>
            <yhm-managerth style="width: 140px" title="付款账号"></yhm-managerth>
            <yhm-managerth style="width: 140px" title="交易日期"></yhm-managerth>
            <yhm-managerth style="width: 130px" title="收支方向"></yhm-managerth>
            <yhm-managerth style="width: 90px" title="事由"></yhm-managerth>
            <yhm-managerth style="width: 110px" title="交易金额"></yhm-managerth>
            <yhm-managerth title="备注"></yhm-managerth>
            <yhm-managerth style="width: 40px" title="操作"></yhm-managerth>
          </template>
          <template #listBody>
            <tr v-for="(item,index) in bankDetailList" :key="index" :class="{InterlacBg:index%2!==0}">
              <yhm-form-td-textbox width="140" :no-edit="isBankDetail" :list="bankDetailList" listid="bankDetailList" :value="item" id="selfAccount" rule="R0000"></yhm-form-td-textbox>
              <yhm-form-td-textbox width="140" :no-edit="isBankDetail" :list="bankDetailList" listid="bankDetailList" :value="item" id="otherAccount" rule="R0000"></yhm-form-td-textbox>
              <yhm-form-td-date width="140" :no-edit="isBankDetail"  position="u" :list="bankDetailList" listid="bankDetailList" :value="item" id="cccurDate" rule="R0000"></yhm-form-td-date>
              <yhm-form-td-radio width="130" :no-edit="isBankDetail?true:false" :list="bankDetailList" listid="bankDetailList" :select-list="directionList" :value="item" id="direction"></yhm-form-td-radio>
              <yhm-form-td-textbox width="90" :no-edit="isBankDetail" :list="bankDetailList" listid="bankDetailList" :value="item" id="subject" rule="R0000"></yhm-form-td-textbox>
              <yhm-form-td-textbox width="110" :no-edit="isBankDetail" before-icon="rmb" :list="bankDetailList" listid="bankDetailList" :value="item" id="money" rule="R0000"></yhm-form-td-textbox>
              <yhm-form-td-textbox width="160" :no-edit="isBankDetail" :list="bankDetailList" listid="bankDetailList" :value="item" id="remark"></yhm-form-td-textbox>
              <yhm-form-td-delete width="40" :list="bankDetailList" :value="item" :del-click="true" @click="delbankDetailList(index,item)"></yhm-form-td-delete>
            </tr>
          </template>
          <template #empty>
            <span class="m_listNoData" v-show="bankDetailList.length === 0">暂时没有数据</span>
          </template>
        </yhm-form-list-edit>
        <yhm-formupload :ownerID="id" :value="fileList" id="fileList" title="上传单据" tag="InvoiceRise" subtitle="" multiple="multiple" rule=""></yhm-formupload>
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
    name: 'invoiceRiseForm',
    mixins: [formmixin],
    data() {
      return {
        unit:'',
        unitID:'',
        unitTaxNumber:'',
        unitAddress:'',
        unitTel:'',
        unitBank:'',
        unitBankID:'',
        unitAccount:'',
        unitRule:'',

        otherUnitID:'',
        otherUnit:'',
        otherTaxNumber:'',
        otherAddress:'',
        otherTel:'',
        otherBank:'',
        otherBankID:'',
        otherAccount:'',
        otherCategory:'1',
        otherUnitRule:'',

        isReceivablesList:[],
        isReceivables:'',
        invoiceTypeList:[],
        invoiceType:'',
        bankDetailList:[],
        directionList:[],
        isBankDetail:'1',
        fileList:[],
      }
    },
    created(){

      let params = {
      }
      this.init({
        url: '/finance/invoiceRise/initForm',
        data: params,
        all: (data) => {
          this.isReceivablesList=data.isReceivablesPsd.list
          this.isReceivables=data.isReceivablesPsd.value
          this.invoiceTypeList=data.invoiceTypePsd.list
          this.invoiceType=data.invoiceTypePsd.value
          this.directionList=data.directionPsd.list
        },
        add: (data)=>{

        },
        look: (data)=>{
          this.unit=data.unit,
          this.unitID=data.unitID,
          this.unitTaxNumber=data.unitTaxNumber,
          this.unitAddress=data.unitAddress,
          this.unitTel=data.unitTel,
          this.unitBank=data.unitBank,
          this.unitBankID=data.unitBankID,
          this.unitAccount=data.unitAccount,
          this.otherUnitID=data.otherUnitID,
          this.otherUnit=data.otherUnit,
          this.otherTaxNumber=data.otherTaxNumber,
          this.otherAddress=data.otherAddress,
          this.otherTel=data.otherTel,
          this.otherBank=data.otherBank,
          this.otherBankID=data.otherBankID,
          this.otherAccount=data.otherAccount,
          this.invoiceType=data.invoiceType,
          this.isReceivables=data.isReceivables,
          this.bankDetailList=data.bankDetailList,
          this.fileList=data.fileList
          if(data.invoiceType == '1'){
            this.otherUnitRule=''
          }
        }
      })
    },
    methods:{
      selectCategory(){
        if(this.invoiceType == '0'){
          this.otherUnitRule='R0000'
        }else{
          this.otherUnitRule=''
        }
      },
      selectBankDetail(){
        if(this.unitID){
          this.$dialog.OpenWindow({
            width: '1050',
            height: '692',
            title: '选择收支明细',
            url: '/selectBankDetail?direction=0&categoryBefore=1&selectType=1&type=2&otherID='+this.unitID,
            closeCallBack: (data)=>{
              if(data){
                for (let i = 0; i < data.length; i++) {
                  let insertDate = new Date(accAdd(new Date().getTime(), accMul(this.bankDetailList.length, 1000)))
                  let otherAccount= ''
                  if(data[i].otherAccount.length>4){
                    otherAccount=data[i].otherAccount.slice(data[i].otherAccount.length-4,data[i].otherAccount.length)
                  }else{
                    otherAccount=data[i].otherAccount
                  }
                  this.bankDetailList.push({
                    id: guid(),
                    bankDetailID: data[i].id,
                    insertDate: formatTime(insertDate),
                    ownerID: this.id,
                    selfAccount:data[i].selfAccount,
                    remark: data[i].remark,
                    subject: data[i].subject,
                    cccurDate: data[i].cccurDate,
                    direction: data[i].direction,
                    otherAccount: data[i].otherName+'('+otherAccount+')',
                    money: data[i].useMoney
                  })
                }
              }
            }
          })
        }else{
          this.$dialog.alert({
            alertImg: 'warn',
            tipValue: '请选择付款方'
          })
        }
      },
      selectUnit(type){
        this.$dialog.OpenWindow({
          width: 1250,
          height: 690,
          url: '/selectTax',
          title: '选择税号信息',
          closeCallBack: (data) => {
            if (data) {
              if(type==='0'){
                this.unitID=data.unitID
                this.unit=data.unit
                this.unitTaxNumber=data.taxNumber
                this.unitAddress=data.registerAddress.replaceAll('-','')+''+data.registerAddressDetailed
                if(data.registerNumberType==='0'&&data.registerNumber!==''&&data.registerNumber!==null){
                  this.unitTel=data.registerNumberTitle+'-'+data.registerNumber
                }else{
                  this.unitTel=data.registerNumber
                }
                this.unitBank=data.bank
                this.unitBankID=data.bankID
                this.unitAccount=data.account
              }else{
                this.otherUnitID=data.unitID
                this.otherUnit=data.unit
                this.otherTaxNumber=data.taxNumber
                this.otherAddress=data.registerAddress.replaceAll('-','')+''+data.registerAddressDetailed
                this.invoiceType=data.category
                if (data.registerNumberType === '0'&&data.registerNumber!==''&&data.registerNumber!==null) {
                  this.otherTel = data.registerNumberTitle + '-' + data.registerNumber
                } else {
                  this.otherTel = data.registerNumber
                }
                this.otherBank=data.bank
                this.otherBankID=data.bankID
                this.otherAccount=data.account
              }
              this.isUnitAndOtherUnit(type)
            }
          }
        })
      },
      isUnitAndOtherUnit(type){
        if(this.unitID!==''&&this.unitID!==null&&this.otherUnitID!==''&&this.otherUnitID!==null){
          let params={
            unitID:this.unitID,
            otherUnitID:this.otherUnitID
          }
          this.ajaxJson({
            url: '/finance/invoiceRise/isUnitAndOtherUnit',
            data: params,
            call: (data) => {
              if(data.type === 0){
                this.$dialog.alert({
                  tipValue: '发票抬头信息已存在',
                  alertImg: 'error',
                  closeCallBack: () => {

                  }
                })
                if(type === '0'){
                  this.unitID=''
                  this.unit=''
                  this.unitTaxNumber=''
                  this.unitAddress=''
                  this.unitBank=''
                  this.unitBankID=''
                  this.unitAccount=''
                  this.unitTel=''
                  this.unitRule=''
                }else{
                  this.otherUnitID='',
                  this.otherUnit='',
                  this.otherTaxNumber='',
                  this.otherAddress='',
                  this.otherTel='',
                  this.otherBank='',
                  this.otherBankID='',
                  this.otherAccount='',
                  this.otherUnitRule=''
                }
              }else if(data.type === 1){
                if(data.type == this.invoiceType){
                  this.$dialog.alert({
                    tipValue: '发票抬头信息已存在',
                    alertImg: 'error',
                    closeCallBack: () => {

                    }
                  })
                  if(type === '0'){
                    this.unitID=''
                    this.unit=''
                    this.unitTaxNumber=''
                    this.unitAddress=''
                    this.unitBank=''
                    this.unitBankID=''
                    this.unitAccount=''
                    this.unitTel=''
                    this.unitRule=''
                  }else{
                    this.otherUnitID='',
                    this.otherUnit='',
                    this.otherTaxNumber='',
                    this.otherAddress='',
                    this.otherTel='',
                    this.otherBank='',
                    this.otherBankID='',
                    this.otherAccount='',
                    this.otherUnitRule=''
                  }
                }
              }
            }
          })
        }
      },
      save(){
        let a = this.validator()
        let b = true
        if(this.isReceivables === '0'&&this.bankDetailList.length ===0){
          b=false
          this.$dialog.alert({
            tipValue: '请选择收支明细',
            alertImg: 'error',
            closeCallBack: () => {
              return
            }
          })
        }
        if(a&&b){
          let params={
            id:this.id,
            unit:this.unit,
            unitID:this.unitID,
            unitTaxNumber:this.unitTaxNumber,
            unitAddress:this.unitAddress,
            unitTel:this.unitTel,
            unitBank:this.unitBank,
            unitBankID:this.unitBankID,
            unitAccount:this.unitAccount,
            otherUnitID:this.otherUnitID,
            otherUnit:this.otherUnit,
            otherTaxNumber:this.otherTaxNumber,
            otherAddress:this.otherAddress,
            otherTel:this.otherTel,
            otherBank:this.otherBank,
            otherBankID:this.otherBankID,
            otherAccount:this.otherAccount,
            invoiceType:this.invoiceType,
            isReceivables:this.isReceivables,
            bankDetailList:this.bankDetailList,
            fileList:this.fileList,
          }
          this.ajaxJson({
            url: '/finance/invoiceRise/save',
            data: params,
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
      },
    },
  }
</script>

<style scoped>

</style>
