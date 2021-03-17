<template>
  <div  class="f_main">
    <yhm-formbody>
      <template #title>基本信息</template>
      <template #control>
        <yhm-form-text title="添加人" :value="person" id="person" rule="R0000" no-edit="1"></yhm-form-text>
        <yhm-form-select title="开票公司" @click="selectUnit" :value="unit" id="unit" rule="R0000"></yhm-form-select>
        <yhm-form-text title="发票代码" :value="code" id="code" rule="R0000"></yhm-form-text>
        <yhm-form-text title="发票号码" :value="invoiceCode" id="invoiceCode" rule="R0000"></yhm-form-text>
        <yhm-form-date title="开票日期" :max="maxApplyDate" :value="invoiceDate" id="invoiceDate" rule="R0000"></yhm-form-date>
        <yhm-form-radio title="发票类型" :select-list="invoiceCategoryPsd" :value="invoiceCategory" id="invoiceCategory" rule="R0000"></yhm-form-radio>
        <yhm-form-text title="发票金额" before-icon="rmb" @change="countTaxMoney" :value="money" id="money" rule="R0000"></yhm-form-text>
        <yhm-form-text title="税率" :value="taxRate" @change="countTaxMoney" id="taxRate" rule="R0000"></yhm-form-text>
        <yhm-form-text title="税额" before-icon="rmb" :value="taxMoney" id="taxMoney" rule="R0000" no-edit="1"></yhm-form-text>
        <yhm-form-upload-image title="发票图片" :tag="Invoice" discription="" :value="icon" id="icon" rule="#"></yhm-form-upload-image>
        <!--<yhm-formimage :tip="true" width="1000" height="650" rule="#" title="发票照片" :big="1" discription=" " :value="'/UploadFile/'+tag+'/' + url" id="url"></yhm-formimage>-->
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
    name: 'inputTaxForm',
    mixins: [formmixin],
    data() {
      return {
        maxApplyDate:formatDate(new Date()),
        ownerType:'0',
        ownerID:'',
        personID:'',
        person:'',
        unitID:'',
        unit:'',
        code:'',
        invoiceCode:'',
        invoiceDate:'',
        invoiceCategory:'',
        invoiceCategoryPsd:'',
        money:'',
        taxRate:'',
        taxMoney:'',
        attestationDate:'',
        deductionDate:'',
        deductionMoney:'',
        state:'',
        isCheck:'',
        url:'212BEDD4-E235-4527-86FC-E8FC1B1A5FD5_shrink.png',
        tag:'Invoice',
        icon:'',
      }
    },
    methods: {
      countTaxMoney(){
        if(this.money!=''&&this.taxRate!=''){
          this.taxMoney=(this.money/accAdd(this.taxRate,100)*this.taxRate).toFixed(2)
        }
      },
      selectUnit(){
        this.$dialog.OpenWindow({
          width: 950,
          height: 692,
          url: '/selectUnit?&category=1',
          title: "选择单位",
          closeCallBack: (data) => {
            if(data){
              this.unit = data.name
              this.unitID = data.id
            }
          }
        })
      },
      save(){
        let a = this.validator()
        if(a){
          let param={
            id:this.id,
            ownerType:this.ownerType,
            ownerID:this.ownerID,
            personID:this.personID,
            person:this.person,
            unitID:this.unitID,
            unit:this.unit,
            code:this.code,
            invoiceCode:this.invoiceCode,
            invoiceDate:this.invoiceDate,
            invoiceCategory:this.invoiceCategory,
            invoiceCategoryPsd:this.invoiceCategoryPsd,
            money:this.money,
            taxRate:this.taxRate,
            taxMoney:this.taxMoney,
            url:this.icon,
            tag:this.tag,
          }
          this.ajaxJson({
            url: '/finance/inputTax/save',
            data: param,
            call: (data) => {
              if(data.type===0){
                this.$dialog.setReturnValue(this.id)
                this.$dialog.alert({
                  tipValue: data.message,
                  closeCallBack: () => {
                    this.$dialog.close()
                  }
                })
              }else{
                this.$dialog.alert({
                  tipValue: data.message,
                  alertImg: 'error',
                  closeCallBack: () => {
                    this.$dialog.close()
                  }
                })
              }
            }
          })
        }
      }
    },
    created () {
      this.setQuery2Value('ownerID')
      this.setQuery2Value('ownerType')
      let params={
        ownerID:this.ownerID,
        ownerType:this.ownerType
      }
      this.init({
        url: '/finance/inputTax/initForm',
        data: params,
        all: (data) => {
          this.personID = data.personID
          this.person = data.person
          this.invoiceCategoryPsd=data.invoiceCategoryPsd.list
          this.invoiceCategory=data.invoiceCategoryPsd.value
        },
        add: (data) => {
          if(this.ownerType == '1'){
            this.unitID=data.unitID
            this.unit=data.unit
            this.taxNumber=data.taxNumber
            this.ownerType=data.ownerType
            this.ownerID=data.ownerID
            this.personID=data.personID
            this.person=data.person
            this.unitID=data.unitID
            this.unit=data.unit
            this.code=data.code
            this.invoiceCode=data.invoiceCode
            this.invoiceDate=data.invoiceDate
            this.invoiceCategory=data.invoiceCategory
            this.money=data.money
            this.taxRate=accMul((parseFloat(data.taxMoney)/accAdd(data.money,-data.taxMoney)).toFixed(2),100)
            this.taxMoney=data.taxMoney
            this.attestationDate=data.attestationDate
            this.deductionDate=data.deductionDate
            this.deductionMoney=data.deductionMoney
            this.url=data.url
            this.tag=data.tag
            this.state='1'
            this.isCheck='1'
          }
        },
        look: (data) => {

        }
      })
    }
  }
</script>

<style scoped>

</style>
