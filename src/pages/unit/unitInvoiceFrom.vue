<template>

  <div class="f_main">
    <yhm-formbody>
      <template #title>基础数据信息</template>
      <template #control>
        <yhm-form-text title="公司名称" no-edit="1" :value="selfunit" id="selfunit" ></yhm-form-text>
        <yhm-form-text title="税号" @repeatverify="taxNumberEvent" ref="selfTaxNumber"  :value="selfTaxNumber" id="selfTaxNumber"  rule="R0000"></yhm-form-text>
        <yhm-form-text title="地址" :value="selfAddressCN" id="selfAddressCN" ></yhm-form-text>
        <yhm-form-text title="座机号" :value="selfTel" id="selfTel" ></yhm-form-text>
        <yhm-form-select  title="开户行" tip="value" @click="selfSelectEvent" :value="selfBank" id="selfBank" ></yhm-form-select>
        <yhm-form-text title="账号" :value="selfAccount" id="selfAccount" ></yhm-form-text>
        <!--        <yhm-formupload :ownerID="id" :value="fileList"  id="fileList" title="合同文件(支持单据)" tag="poNumber" multiple="multiple" rule="#"></yhm-formupload>-->
      </template>
    </yhm-formbody>
    <div class="f_split"></div>
    <yhm-formbody>
      <template #title>发票抬头数据信息</template>
      <template #control>
        <!--<yhm-form-select title="选择公司" @repeatverify="unitIDEvent"  ref="unitID" :value="unit" id="unit" @click="selectUnit()" ></yhm-form-select>-->
        <yhm-form-select title="选择公司"  :value="unit" id="unit" @click="selectUnit()" ></yhm-form-select>
        <yhm-form-text title="纳税人税号" @repeatverify="taxNumberEvent"  ref="taxNumber"  :value="taxNumber" id="taxNumber" ></yhm-form-text>
        <yhm-form-text title="地址" :value="addressCN" id="addressCN" ></yhm-form-text>
        <yhm-form-text title="座机号" :value="tel" id="tel" ></yhm-form-text>
        <yhm-form-select  title="开户行" tip="value" @click="selectEvent" :value="bank" id="bank" ></yhm-form-select>
        <yhm-form-text title="账号" :value="account" id="account" ></yhm-form-text>
<!--        <yhm-formupload :ownerID="id" :value="fileList"  id="fileList" title="合同文件(支持单据)" tag="poNumber" multiple="multiple" rule="#"></yhm-formupload>-->
      </template>
    </yhm-formbody>
    <div class="f_split"></div>
    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn >
        <yhm-commonbutton value="保存" icon="btnSave"  :flicker="true" @call="save()"></yhm-commonbutton>
      </template>
    </yhm-formoperate>
  </div>
</template>

<script>
  import { formmixin } from '@/assets/form.js'

  export default {
    name: 'unitInvoiceFrom',
    mixins: [formmixin],
    data(){
      return{
        selfunitID:'',
        selfunit:'',    //主公司名称
        selfTaxNumber:'',//主公司税号
        selfAddressCN:'', //主公司地址
        selfTel:'',       //主公司手机号
        selfBank:'',      //主公司开户行
        selfBankID:'',
        selfAccount:'',   //主公司账号

        unit:'',
        unitID:'',     //公司
        taxNumber:'',  //税号
        addressCN:'',    //地址
        tel:'',     //手机号
        bankID:'',     //开户行
        bank:'',
        account:'',    //账户
      }
    },
    methods:{
      selfSelectEvent(){
        this.$dialog.OpenWindow({
          width: 950,
          height: 690,
          url: '/selectPublicAccount?categoryUnit=1&categoryUnitBefore=1&category=1&categoryInit=2' + '&unitID=' + this.ownerID,
          title: '选择公司账号',
          closeCallBack: (data) => {
            if (data) {
              this.selfBankID = data.id
              this.selfBank=data.bank
              this.selfAccount = data.account
            }
          }
        })
      },
      taxNumberEvent(){
        this.ajaxJson({
          url:"/Basic/verificationTaxNumber",
          data:{
            id:this.taxNumber,
          },
          loading:"0",
          call:(data) =>{
            if(data.type === 0){//说明存在，调用控件验证显示规则
              this.$refs.taxNumber.errorEvent("税号添加重复")
            }
          }
        })
      },
      async isTaxNumberEvent(){
        let result = await this.ajaxAsync({
          url:"/Basic/verificationTaxNumber",
          data:{
            id:this.taxNumber,
          },
          loading:"0"
        })
        if(result.type === 0){//说明存在，调用控件验证显示规则
          this.$refs.taxNumber.errorEvent("税号添加重复")
          return false
        }
        return true
      },
      //重复验证,基于控件操作的验证
      // unitIDEvent(){
      //   this.ajaxJson({
      //     url:"/Basic/verificationUnitIDVue",
      //     data:{
      //       id:this.ownerID,
      //       ownerID:this.unitID
      //     },
      //     loading:"0",
      //     call:(data) =>{
      //       if(data.type === 0){//说明存在，调用控件验证显示规则
      //         this.$refs.unitID.errorEvent("公司添加重复")
      //       }
      //     }
      //   })
      // },
      // async isUnitIDEvent(){
      //   let result = await this.ajaxAsync({
      //     url:"/Basic/verificationUnitIDVue",
      //     data:{
      //       id:this.ownerID,
      //       ownerID:this.unitID
      //     },
      //     loading:"0"
      //   })
      //   if(result.type === 0){//说明存在，调用控件验证显示规则
      //     this.$refs.unitID.errorEvent("公司添加重复")
      //     return false
      //   }
      //   return true
      // },

      selectEvent () { //开户行点击事件
        this.$dialog.OpenWindow({
          width: 950,
          height: 690,
          url: '/selectPublicAccount?categoryUnit=1&categoryUnitBefore=1&category=1&categoryInit=2' + '&unitID=' + this.unitID,
          title: '选择公司账号',
          closeCallBack: (data) => {
            if (data) {
              this.bankID = data.id
              this.bank=data.bank
              this.account = data.account
            }
          }
        })
      },

      selectUnit(){
        this.$dialog.OpenWindow({
          width: 950,
          height: 692,
          url: '/selectUnit?category=1&simplify=1',
          title: '选择公司',
          closeCallBack: (data) => {
            if(data) {
              this.unitID = data.id
              this.unit = data.name
              this.taxNumber=data.registrationNumber
              this.addressCN=data.addressCN
              this.tel=data.tel
              // this.unitIDEvent()
            }
          },
        })
      },
      async save () {
        // let a = await this.isUnitIDEvent()
        let b = this.validator()
        let c=  await this.isTaxNumberEvent()
        // if (a && b && c) {
        if ( b && c) {
          let params = {
            selfunitID:this.selfunitID,
            selfTaxNumber:this.selfTaxNumber,
            selfAddressCN:this.selfAddressCN,
            selfTel:this.selfTel,
            selfBankID:this.selfBankID,
            selfAccount:this.selfAccount,

            ////////////抬头公司
            id:this.id,
            ownerID:this.ownerID,
            unitID:this.unitID,
            taxNumber:this.taxNumber,
            addressCN:this.addressCN,
            tel:this.tel,
            bankID:this.bankID,
            account:this.account

          }
          console.log( params )

          this.ajaxJson({
            url: '/Basic/saveInvoice',
            data: params,
            loading: '0',
            call: (data) => {
              if (data.type === 0) {
                this.$dialog.setReturnValue(this.id) //向父级页面id值
                this.$dialog.alert({
                  tipValue: data.message,
                  closeCallBack: (data) => {
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
      initPageData(initValue){
        let params = {}
        if (initValue) {
          // 页面初始化是需要的参数
          params = {
            searchStr:this.id
          }
        } else {
          // 页面非初始化时需要的参数
          params = {
            category: this.listCategory.value,
            prefixLetter: this.prefixLetter.value,
            commonUse:this.commonUsePsd.value
          }
        }
        this.init({
          initValue: initValue,
          url: '/Basic/getSelectUnit',
          data: params,
          all: (data) => {
            // 不管是不是初始化都需要执行的代码
          },
          init: (data) => {
            // 初始化时需要执行的代码
            this.listCategory = data.listCategory
            this.commonUsePsd = data.commonUsePsd
          }
        })
      }

    },
    created () {
      this.setQuery2Value('ownerID')

        // 页面非初始化时需要的参数
        let params = {
          category: '1',
          prefixLetter: '',
          commonUse:'0',
          searchStr: this.ownerID,
        }

      this.init({
        url: '/Basic/getSelectUnit',
        data: params,
        all: (data) => {
          // 不管是不是初始化都需要执行的代码

          for (let i in data.content){
            this.selfunit=data.content[i].name
            this.selfunitID=data.content[i].id
            this.selfAddressCN=data.content[i].addressCN
            this.selfTaxNumber=data.content[i].registrationNumber
            this.selfTel=data.content[i].tel
          }

        },
        init: (data) => {
          // 初始化时需要执行的代码

        }
      })
    }
  }
</script>

<style scoped>

</style>

