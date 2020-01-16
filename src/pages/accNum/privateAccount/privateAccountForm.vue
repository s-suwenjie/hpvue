<template>
  <div class="f_main">
    <yhm-formbody>

      <template #control>
        <!--@call="selectUnit" 账户分类 银行卡类型 网络账户类型 户名类型 -->
        <yhm-form-radio @call="categoryEvent" title="账户分类" :select-list="categoryList" :value="category" id="category" rule="R0000" :no-edit="isEditBl "></yhm-form-radio>
        <yhm-form-radio :show="isIntBank && isNtwork" title="银行卡类型" :select-list="bankCartCategoryList" :value="bankCartCategor" id="bankCartCategor" rule="R0000" :no-edit="isEditBl"></yhm-form-radio>
        <yhm-form-select :show="isIntBank && isNtwork" title="开户行"   @click="selectEvent" :value="bank" id="bank" rule="R0000" :no-edit='1'></yhm-form-select>
        <yhm-form-select title="户名" tip="person" rule="R0000" @click="selectUnit" :value="person" id="person" :no-edit="isEdit"></yhm-form-select>
        <yhm-form-text :show="isCash" @repeatverify="repeatverifyAccountEvent" ref="account" title="账号" :value="account" id="account"  rule="R0000" tip="account"></yhm-form-text>
        <yhm-form-radio :show="isCash" @call="isThirdPartEvent" title="户名类型" :select-list="isThirdPartPsd"  :value="isThirdPart" id="isThirdPart" rule="R0000" :no-edit="isEditBl"></yhm-form-radio>
        <yhm-form-text :show="isCash" tip="value" ref="thirdPartName" title="其他" subtitle="账户户名" :value="thirdPartName" id="thirdPartName" :no-edit="isEdit" :rule="isRule"></yhm-form-text>
        <yhm-form-radio :show="isNetwork" title="网络" subtitle="账户类型" :select-list="webAccountTypelist"  :value="webAccountType" id="webAccountType" rule="R0000" :no-edit="isEditBl"></yhm-form-radio>
        <yhm-formupload :show="isNetwork" :ownerID="id" :value="fileList" id="fileList" title="收款二维码上传" tag="privateAccount" subtitle="" multiple="multiple" :no-edit="isEditBl" ></yhm-formupload>

      </template>
    </yhm-formbody>
    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn >
        <yhm-commonbutton value="保存" icon="btnSave" :flicker="true" @call="save()"></yhm-commonbutton>
      </template>
    </yhm-formoperate>
  </div>
</template>

<script>
  import { accMul, accAdd, guid, formatDate, number2chinese,formatTime} from '@/assets/common.js'
  import { formmixin } from '@/assets/form.js'
  export default {
    name: 'privateAccountForm',
    mixins: [formmixin],
    data(){
      return{
        id:'',
        ownerID:'',

        categoryList:[],        //账户分类
        category:'',             //账户分类

        bankCartCategoryList:[], //银行卡类型
        bankCartCategor:'',        //银行卡类型

        webAccountTypelist:[],   //网络账户类型
        webAccountType:'',      //网络账户类型

        bank:'',                   //开户行
        bankID:'',                 //开户行ID

        fileList:[],              //上传

        person:'',                //户名
        personID:'',              //户名ID

        remark:'',               //账号ID

        isThirdPartPsd:[],       //户名类型
        isThirdPart:'',         //户名类型

        account:'',            //账号

        thirdPartName:'',   //其他账户户名

        isIntBank: true,   //网银
        isNetwork: false,   //网络
        isEdit: '0',
        isEditBl: false,
        isCategory: true,
        isCash: true,
        isNtwork: true,
        isNStwork: true,
        isRule: '',
      }
    },
    created () {
      this.setQuery2Value('id')
      this.init({
        url: '/Fin/initPrivateAccountFormJson',
        all: (data) => {
          /* 公共 无论查看和添加返回数据 */
          this.categoryList = data.categoryPsd.list
          this.category = data.categoryPsd.value

          this.bankCartCategoryList = data.bankCartCategoryPsd.list
          this.bankCartCategor = data.bankCartCategoryPsd.value

          this.webAccountTypelist = data.webAccountTypePsd.list
          this.webAccountType = data.webAccountTypePsd.value

          this.isThirdPartPsd = data.isThirdPartPsd.list
          this.isThirdPart = data.isThirdPartPsd.value

          if(this.category === '1'){
            this.isIntBank = true
            this.isNetwork = false
          }
          if(this.isThirdPart === '0'){
            this.isEdit = '1'
          }

        },
        add: (data) => {
          /* 需要添加的数据 */
          this.id = guid()
        },
        look: (data) => {
          /* 需要查看的数据 */
          this.categoryList = data.categoryPsd.list
          this.category = data.categoryPsd.value
          this.person = data.person
          this.personID = data.personID
          this.account = data.account
          this.bank = data.bank
          this.thirdPartName = data.thirdPartName
          this.fileList = data.files

          if(this.category === '0'){
            this.isEdit = '1'
            this.isEditBl = true
            this.isNetwork = false
            this.isIntBank = false
            this.isCash = false
          } else if(this.category === '2'){
            this.isNtwork = false
            this.isNetwork = true
          }
        }
      })
    },
    methods:{
      repeatverifyAccountEvent(){
        this.ajaxJson({
          url:"/Fin/verifyPrivateAccountJson",
          data:{
            id:this.id,
            account:this.account,
            category:this.category,
            webAccountType:this.webAccountType,
          },
          loading:"0",
          call:(data) =>{
            if(data.type !== 0){//说明存在，调用控件验证显示规则
              this.$refs.account.errorEvent("该账号已存在")
            }
          }
        })
      },
      async isAccountVerifyEvent(){
        let result = await this.ajaxAsync({
          url:"/Fin/verifyPrivateAccountJson",
          data:{
            id:this.id,
            account:this.account,
            category:this.category,
            webAccountType:this.webAccountType,
          },
          loading:"0"
        })
        if(result.type !== 0){//说明存在，调用控件验证显示规则
          this.$refs.account.errorEvent("该账号已存在")
          return false
        }
        return true
      },

      categoryEvent(){ //账户分类点击事件
        if(this.category==='1'){
          this.isIntBank = true
          this.isNetwork = false
        }else if(this.category==='2') {
          this.isIntBank = false
          this.isNetwork = true
        }
      },
      isThirdPartEvent(){ //户名类型点击事件
        if(this.isThirdPart==='0'){
          this.thirdPartName = ''
          this.isEdit = '1'
          this.isRule = ''
          this.$refs.thirdPartName.errorEvent('')
        }else{
          this.isEdit = '0'
          this.isRule = 'R0000'
        }
      },
      selectUnit () { //户名点击事件

        this.$dialog.OpenWindow({
          width: 950,
          height: 692,
          //selectPerson?dialogid=EF5BBB77-CA3E-4993-B01C-FD740A6EC8FF1574219023793&  //选择开户人
         //  url: '/selectPerson?ownerSys=1&ownerSysBefore=1&category='+this.category+'&categoryBefore='+this.categoryBefore,
          url:'/selectPerson?category=0',
          title: '选择开户人',
          closeCallBack: (data) => {
            if (data) {
              this.person = data.name
              this.personID = data.id
            }
          }
        })
      },
      selectEvent(){ //开户行点击事件
        let name = 49
        this.$dialog.OpenWindow({
          width: 950,
          height: 692,
          //?Name=49&Type=1&Condition=17%E2%97%87BankID&dialogid=C79CA38C-BB08-4CD9-8252-D6D816320E921574219124119&GID123456789=1CE0FA27-2719-4A0D-8CD9-63F03C0186B9
          //?Name=49&Type=1&Condition=17%E2%97%87BankID&dialogid=5D91A057-5945-4337-92DC-535EE7F6D78E1574219001561&GID123456789=1CE0FA27-2719-4A0D-8CD9-63F03C0186B9
          url:'/selectDic?name='+ name,
          title: '选择开户行',
          closeCallBack: (data) => {
            if (data) {
              this.bank = data.showName
              this.bankID = data.id
            }
          }
        })
      },
      async save () { //保存
        let cc = true
        if(this.isThirdPart==='1'){
          if(this.thirdPartName===''){
            this.$refs.thirdPartName.errorEvent('不能为空')
            cc = false
          }
        }
       let a = await this.isAccountVerifyEvent()
       let b = this.validator()
          if (a && b && cc) {
            let params = {
              id:this.id,
              personID:this.personID,
              category:this.category,
              webAccountType:this.webAccountType,
              isThirdPart:this.isThirdPart,
              thirdPartName:this.thirdPartName,
              bankID:this.bankID,
              account:this.account,
              bankCartCategory:this.bankCartCategor,
              files:this.fileList,

            }

            this.ajaxJson({
              url: '/Fin/privateAccountSaveJson',
              data: params,
              call: (data) => {
                if (data.type === 0) {
                  this.$dialog.setReturnValue(this.id)
                  this.$dialog.alert({
                    tipValue: data.message,
                    closeCallBack: () => {
                      this.$dialog.close()
                    }
                  })
                }else if(data.type === 1){
                  this.$dialog.alert({
                    alertImg:'warn',
                    tipValue: data.message
                  })
                }
              }
            })
          } else {
            return false
          }

      },
    }
  }
</script>

<style scoped>

</style>
