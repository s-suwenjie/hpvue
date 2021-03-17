<template>
  <div  class="f_main">
    <yhm-formbody>
      <template #title>基本信息</template>

      <template #control>
        <yhm-form-select title="公司名称" @click="selectUnit" :value="unit" id="unit" rule="R0000"></yhm-form-select>
        <yhm-formimgbox title="公司名称二维码" :url="url" tag="tax" smallwidth="40"></yhm-formimgbox>
        <yhm-form-text ref="taxNumber" title="税号" @change="existByTaxNumber" :value="taxNumber" id="taxNumber" rule="R0000"></yhm-form-text>
        <yhm-formimgbox title="税号条形码" :url="taxNumberUrl" tag="tax"></yhm-formimgbox>
        <yhm-form-radio title="纳税类型" @call="selectCompanyCategory" :select-list="companyCategoryPsd" :value="companyCategory" id="companyCategory" rule="R0000"></yhm-form-radio>
        <yhm-form-radio :no-edit="companyCategory==1" title="开票类型" :select-list="categoryPsd" :value="category" id="category"></yhm-form-radio>
        <yhm-form-select title="开户行及账号" v-if="companyCategory==0&&category==0" @click="selectAccount" :value="account" id="account" :no-click="false" rule="R0000" width="1"></yhm-form-select>
        <yhm-form-select title="注册地址" @click="selectDic('0')"  v-if="companyCategory==0&&category==0" :value="registerAddress"  id="registerAddress" rule="R0000"></yhm-form-select>
        <yhm-form-text title="注册地" v-if="companyCategory==0&&category==0" @change="registerAddressChange" subtitle="址详细" :value="registerAddressDetailed" id="registerAddressDetailed" rule="R0000"></yhm-form-text>
        <yhm-form-radio title="注册电" v-if="companyCategory==0&&category==0" subtitle="话类型" :select-list="registerNumberTypePsd" :value="registerNumberType" id="registerNumberType" rule="R0000"></yhm-form-radio>
        <yhm-form-text title="注册电话" v-if="companyCategory==0&&registerNumberType==1&&category==0" :value="registerNumber" id="registerNumber" rule="R4000"></yhm-form-text>
        <yhm-form-zh-text-three v-if="companyCategory==0&&registerNumberType==0&&category==0" before-placeholder="请输入电话号" :topnoEdit="true" :before="registerNumber" before-id="registerNumber" :afterWidth="'90'" :after="registerNumberTitle" :beforetop="true" after-width="20" after-id="registerNumberTitle" title="注册电话" after-title="区号" before-rule="R0000" >
        </yhm-form-zh-text-three>
        <yhm-form-select title="邮寄地址" @click="selectDic('1')" :value="mailAddress"  id="mailAddress"></yhm-form-select>
        <yhm-form-text title="邮寄地" subtitle="址详细" :value="mailAddressDetailed" id="mailAddressDetailed"></yhm-form-text>
        <yhm-form-radio title="邮寄电" subtitle="话类型" :select-list="mailNumberTypePsd" :value="mailNumberType" id="mailNumberType"></yhm-form-radio>
        <yhm-form-text title="邮寄电话" v-if="mailNumberType==1" :value="mailNumber" id="mailNumber"></yhm-form-text>
        <yhm-form-zh-text-three v-if="mailNumberType==0" before-placeholder="请输入电话号" :before="mailNumber" before-id="mailNumber" :afterWidth="'90'" :after="mailNumberTitle" :beforetop="true" after-width="20" after-id="mailNumberTitle" title="邮寄电话" after-title="区号">
        </yhm-form-zh-text-three>
        <yhm-form-text title="开票码" :value="billingCode" id="billingCode"></yhm-form-text>
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
    name: 'taxFrom',
    mixins: [formmixin],
    data() {
      return {
        unitID:'',
        unit:'',
        taxNumber:'',
        companyCategory:'',
        companyCategoryPsd:[],
        category:'',
        categoryPsd:[],
        accountID:'',
        account:'',
        registerAddressID:'',
        registerAddress:'',
        registerAddressDetailed:'',
        registerNumberType:'',
        registerNumberTypePsd:[],
        registerNumber:'',
        registerNumberTitle:'',
        mailAddressID:'',
        mailAddress:'',
        mailAddressDetailed:'',
        mailNumberTitle:'',
        mailNumberType:'',
        mailNumberTypePsd:[],
        mailNumber:'',
        taxNumberUrl:'',
        url:'',
        billingCode:'',
      }
    },
    created(){
      // this.setQuery2Value('otherID')
      let params={}
      this.init({
        url: '/finance/tax/initForm',
        data: params,
        all: (data) => {
          this.companyCategoryPsd=data.companyCategoryPsd.list
          this.companyCategory=data.companyCategoryPsd.value
          this.categoryPsd=data.categoryPsd.list
          this.category=data.categoryPsd.value
          this.registerNumberTypePsd=data.registerNumberTypePsd.list
          this.registerNumberType=data.registerNumberTypePsd.value
          this.mailNumberTypePsd=data.mailNumberTypePsd.list
          this.mailNumberType=data.mailNumberTypePsd.value
        },
        add: (data) => {

        },
        look: (data) => {
          this.unitID=data.unitID
          this.unit=data.unit
          this.taxNumber=data.taxNumber
          this.companyCategory=data.companyCategory
          this.category=data.category
          this.accountID=data.accountID
          this.account=data.account
          this.registerAddressID=data.registerAddressID
          this.registerAddress=data.registerAddress
          this.registerAddressDetailed=data.registerAddressDetailed
          this.registerNumberType=data.registerNumberType
          this.registerNumber=data.registerNumber
          this.registerNumberTitle=data.registerNumberTitle
          this.mailAddressID=data.mailAddressID
          this.mailAddress=data.mailAddress
          this.mailAddressDetailed=data.mailAddressDetailed
          this.mailNumberTitle=data.mailNumberTitle
          this.mailNumberType=data.mailNumberType
          this.mailNumber=data.mailNumber
          this.taxNumberUrl=data.taxNumberUrl
          this.url=data.url
          this.billingCode=data.billingCode
        }
      })
    },
    methods:{
      registerAddressChange(){
        if(this.mailAddressDetailed){
          this.mailAddressDetailedthis.registerAddressDetailed
        }
      },
      selectCompanyCategory(){
        if(this.companyCategory==='1'){
          this.category='1'
        }
      },
      selectDic(dic){
        this.$dialog.OpenWindow({
          width: 950,
          height: 690,
          url: '/selectDic?name=25&Type=1&Condition=4◇ReceiveAddressTitleID',
          title: '选择省市县',
          closeCallBack: (data) => {
            if (data) {
              if(dic==='0'){
                this.registerNumberTitle=data.value5
                this.registerAddress=data.showName
                this.registerAddressID=data.id
                if(this.mailAddressID){
                  this.mailNumberTitle=data.value5
                  this.mailAddress=data.showName
                  this.mailAddressID=data.id
                }
              }else{
                this.mailNumberTitle=data.value5
                this.mailAddress=data.showName
                this.mailAddressID=data.id
              }
            }
          }
        })
      },
      existByTaxNumber(){
        let param={
          id:this.id,
          taxNumber:this.taxNumber
        }
        this.ajaxJson({
          url: '/finance/tax/existByTaxNumber',
          data: param,
          call: (data) => {
            if(data.type===0){
              this.taxNumberUrl=data.html
            }else{
              this.$refs.taxNumber.errorEvent('税号已存在')
              this.taxNumber=''
            }
          }
        })
      },
      selectAccount(){
        if(this.unitID!==''&&this.unitID!==null){
          this.$dialog.OpenWindow({
            width: 950,
            height: 690,
            url: '/selectPublicAccount?categoryUnit=1&categoryUnitBefore=1&category=1&categoryInit=2&unitID=' + this.unitID,
            title: '选择公司账号',
            closeCallBack: (data) => {
              if (data) {
                if(data.bankID!=''){
                  this.accountID=data.id
                  this.account=data.publicAccountExplain
                }else{
                  this.updataPublicAccount(data.id)
                }
              }
            }
          })
        }
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
                    this.accountID=id
                    this.account=data.html
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
      selectUnit(){
        this.$dialog.OpenWindow({
          width: 950,
          height: 692,
          url: '/selectUnit?&category=1',
          title: "选择单位",
          closeCallBack: (data) => {
            if(data.registrationNumber===""){
              this.$dialog.OpenWindow({
                width: '1050',
                height: '700',
                url: '/addUnitForm?id='+data.id,
                title: '选择购买方',
                closeCallBack: (unitData) => {
                  if(unitData){
                    this.unit = dunitData.name
                    this.unitID = unitData.id
                  }
                }
              })
            } else{
              let param={
                id:this.id,
                unit:data.name,
                unitID:data.id
              }
              this.ajaxJson({
                url: '/finance/tax/existByUnitID',
                data: param,
                call: (exist) => {
                  if (exist.type === 0) {
                    this.unit = data.name
                    this.unitID = data.id
                    this.url = exist.html
                    this.taxNumber = data.registrationNumber
                    if(data.registrationNumber!=''&&data.registrationNumber!=null){
                      this.existByTaxNumber()
                    }
                  }else{
                    this.$dialog.alert({
                      tipValue: '单位税号信息已存在!',
                      alertImg: 'error',
                      closeCallBack: () => {
                      }
                    })
                  }
                }
              })
            }
          }
        })
      },
      save(){
        let a = this.validator()
        console.log(a)
        if(a){
          let param={
            id:this.id,
            unitID:this.unitID,
            unit:this.unit,
            taxNumber:this.taxNumber,
            companyCategory:this.companyCategory,
            category:this.category,
            accountID:this.accountID,
            account:this.account,
            registerAddressID:this.registerAddressID,
            registerAddress:this.registerAddress,
            registerAddressDetailed:this.registerAddressDetailed,
            registerNumberType:this.registerNumberType,
            registerNumber:this.registerNumber,
            mailAddressID:this.mailAddressID,
            mailAddress:this.mailAddress,
            mailAddressDetailed:this.mailAddressDetailed,
            mailNumberType:this.mailNumberType,
            mailNumber:this.mailNumber,
            taxNumberUrl:this.taxNumberUrl,
            url:this.url,
            billingCode:this.billingCode,
          }
          this.ajaxJson({
            url: '/finance/tax/save',
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
        }else{
          this.$dialog.alert({
            tipValue: '您未完整填写数据!',
            alertImg: 'error',
            closeCallBack: () => {
            }
          })
        }

      }
    }
  }
</script>

<style scoped>

</style>
