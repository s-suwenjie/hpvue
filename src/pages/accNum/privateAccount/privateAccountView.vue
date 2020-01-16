<template>
  <div class="f_main">
    <yhm-view-body>
      <template #title>基本信息</template>
      <template #body>
        <yhm-view-control title="账户分类" :content="category" :psd="categoryList"></yhm-view-control>
        <yhm-view-control title="银行卡类型" v-if="isIntBank" :content="bankCartCategor" :psd="bankCartCategoryList"></yhm-view-control>
        <yhm-view-control title="开户行" v-if="isIntBank" :content="bank"></yhm-view-control>
        <yhm-view-control title="户名" v-if="!isCash" :content="person"></yhm-view-control>
        <yhm-view-control title="账号" :content="account"></yhm-view-control>
        <yhm-view-control title="户名类型" v-if="!isCash" :content="isThirdPart" :psd="isThirdPartList"></yhm-view-control>
        <yhm-view-control title="其他账户户名" v-if="!isCash" :content="thirdPartName"></yhm-view-control>
        <yhm-view-control title="网络账户类型" v-if="isNetwork" :content="webAccountType" :psd="webAccountTypeList"></yhm-view-control>
        <yhm-view-control title="收款二维码上传" v-if="isNetwork" category="3" type="files" :content="files"></yhm-view-control>

      </template>
    </yhm-view-body>
    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn>
        <yhm-commonbutton value="编辑" icon="i-edit" :flicker="true" @call="editBtn()"></yhm-commonbutton>
      </template>
    </yhm-formoperate>
  </div>
</template>

<script>
  import { formmixin } from '@/assets/form.js'
  export default {
    name: 'privateAccountView',
    mixins: [formmixin],
    data() {
      return{
        category: '',
        categoryList: [],
        bankCartCategor: '',
        bankCartCategoryList: [],
        bank: '',
        person: '',
        account: '',
        isThirdPart: '',
        isThirdPartList: [],
        thirdPartName: '',
        webAccountType: '',
        webAccountTypeList:[],
        files:[],


        isCash: false,
        isIntBank: false,
        isNetwork: false
      }
    },
    methods: {
      /* 编辑对私账号信息 */
      editBtn(){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '500',
          title: '编辑对私账号信息',
          url: '/privateAccountForm?id=' + this.id,
          closeCallBack: (data)=>{
            if(data){
              this.$dialog.setReturnValue(this.id)
              this.initData()
            }
          }
        })
      },
      initData(){
        this.init({
          url: '/Fin/initPrivateAccountFormJson',
          all: (data) => {

          },
          add: (data) => {

          },
          look: (data) => {
            this.categoryList = data.categoryPsd.list
            this.category = data.categoryPsd.value
            this.bankCartCategoryList = data.bankCartCategoryPsd.list
            this.bankCartCategor = data.bankCartCategoryPsd.value
            this.bank = data.bank
            this.person = data.person
            this.account = data.account
            this.isThirdPartList = data.isThirdPartPsd.list
            this.isThirdPart = data.isThirdPartPsd.value
            this.thirdPartName = data.thirdPartName
            this.webAccountTypeList = data.webAccountTypePsd.list
            this.webAccountType = data.webAccountTypePsd.value
            this.files = data.files

            if(this.category === '0'){
              this.isCash = true
              this.isIntBank = false
              this.isNetwork = false
            }else if(this.category === '1'){
              this.isCash = false
              this.isIntBank = true
              this.isNetwork = false

            }else if(this.category === '2'){
              this.isCash = false
              this.isIntBank = false
              this.isNetwork = true
            }
          }
        })
      }
    },
    created () {
      this.initData()
    }
  }
</script>

<style scoped>

</style>
