<template>
  <div  class="f_main">
    <yhm-formbody>
      <template #title>基本信息</template>

      <template #control>
        <yhm-form-date title="交易日期" :max="maxWorkDate" :value="workDate" id="workDate" rule="R0000"></yhm-form-date>
        <yhm-form-select title="操作人" :value="person" id="person" :no-click="true" rule="R0000"></yhm-form-select>
        <yhm-form-radio title="品牌" :select-list="brandList" :value="brand" id="brand"></yhm-form-radio>
        <yhm-form-select title="收款账号" @click="selectSelfAccount" :value="selfAccount" id="selfAccount" :no-click="false" rule="R0000" width="1"></yhm-form-select>
        <yhm-form-text title="支付金额" tip="money" before-icon="rmb" :value="money" id="money" rule="R3000" placeholder="请输入数字" error-message="纯数字输入"></yhm-form-text>
        <yhm-form-text title="金额大写" tip="capitalMoney" :value="capitalMoney" id="capitalMoney" rule="R0000" no-edit="1"></yhm-form-text>
        <yhm-form-radio title="付款类型" :select-list="categoryList" :value="category" id="category" rule="R0000" width="0" @call="clearother"></yhm-form-radio>
        <yhm-form-select title="付款方" @click="selectWareHouser" :value="other" id="other" :no-click="false" rule="R0000"></yhm-form-select>
        <yhm-form-select title="付款账号" @click="selectAccount" :value="otherAccount" id="otherAccount" :no-click="false" rule="R0000" width="1"></yhm-form-select>
        <yhm-form-radio title="事由类型" :select-list="subjectPsd" :value="subjectID" id="subjectID" rule="R0000" width="1"></yhm-form-radio>
        <yhm-form-textarea title="备注" :value="remark" id="remark" rule="R0000"></yhm-form-textarea>
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
  import {number2chinese} from '@/assets/common.js'
  export default {
    name: 'depositForm',
    mixins: [formmixin],
    data(){
      return{
        categoryList:[],
        subjectPsd:[],
        brand:'0',
        brandList:[],
        subjectID:'07491963-5CA0-4DF1-A061-3AEA58BF4A80',
        category:'',
        maxWorkDate:'',
        workDate:'',
        otherID:'',
        other:'',
        otherAccountID:'',
        otherAccount:'',
        money:'',
        remark:'',
        personID:'',
        person:'',
        capitalMoney:'',
        selfAccount:'',
        selfAccountID:'',
        fileList:[],
      }
    },
    created(){
      this.person=sessionStorage.getItem('____currentUser')
      this.personID=sessionStorage.getItem('____currentUserID')
      let date=new Date()
      this.workDate=date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()
      this.maxWorkDate=date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()
      let params={}
      this.init({
        url: '/dailyoffice/deposit/initForm',
        data:params,
        all: (data) => {
          this.categoryList = data.categoryPsd.list
          this.brandList = data.brandPsd.list
          this.subjectPsd = data.subjectPsd.list
        },
        add: (data) => {
          this.category = data.categoryPsd.value
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
          this.selfAccountID=data.selfAccountID
          this.selfAccount=data.selfAccount
          this.otherAccountID=data.otherAccountID
          this.otherAccount=data.otherAccount
          this.fileList=data.fileList
          this.categoryPsd=data.categoryPsd
          this.remark=data.remark
          this.subjectID=data.subjectID
        }
      })
    },
    methods:{
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
            title: '选择付款账号',
            closeCallBack: (data) => {
              if(data){
                this.otherAccount = data.publicAccountExplain
                this.otherAccountID = data.id
              }
            }
          })
        }else{
          this.selectWareHouser()
        }
      },
      bankDetailSave(){
        let balance = 0
        if (this.selfAccountID) {
          let param = {
            accountID: this.selfAccountID
          }
          this.ajaxJson({
            url: '/Fin/getAccountBalanceVue',
            data: param,
            call: (data) => {
              if(data.message){
                balance = accAdd(data.message,this.money) + ''
                let params = {
                  id: guid(),
                  ownerID: this.id,
                  ownerSys: '0', //收支分类
                  brand: this.brand,//品牌
                  direction: '0',//收支方向
                  cccurDate: this.workDate,//交易日期
                  selfAccountID: this.selfAccountID,//我方ID账户信息
                  selfAccount: this.selfAccount,//我方账户信息
                  money: this.money,//交易金额额
                  balance: balance,//交易后余额
                  subjectType: '0',//事由类型
                  subjectID: this.subjectID,//事由ID
                  subject: this.subject,//事由
                  otherName: this.other,//对方账户说明
                  otherAccountType: this.category,//对方账户类型
                  otherID:this.otherID,//对方公司ID
                  otherAccountID: this.otherAccountID,//对方账户ID
                  otherAccount: this.otherAccount,//对方账户类型
                  remark: this.remark,//备注
                  feeType: '',//有无手续费
                  fee: '',//手续费金额
                  voucherNo: '',//凭证号
                  useMoney: this.money,//多事由计算金额
                  subjectList: [],//多事由
                }
                this.$dialog.confirm({
                  alertImg: 'warn',
                  btnValueOk: '确认',
                  tipValue: '确定入账?',
                  okCallBack: () => {
                    this.ajaxJson({
                      url: '/Fin/vueBankDetailSave',
                      data: params,
                      loading: '0',
                      call: (data) => {
                        if (data.type === 0) {
                          this.$dialog.alert({
                            tipValue: '入账成功',
                            closeCallBack: () => {
                              let update={
                                id:this.id,
                                state:'1'
                              }
                              this.ajaxJson({
                                url:  '/dailyoffice/deposit/updateState',
                                data: update,
                                loading: '0',
                                call: (data) => {
                                  if(data.type===0){
                                    this.$dialog.close()
                                  }
                                }
                              })
                            }
                          })
                        }else{
                          this.$dialog.alert({
                            tipValue: '入账失败',
                            closeCallBack: () => {
                            }
                          })
                        }
                      }
                    })
                  }
                })
              }
            }
          })
        }
      },
      save(){
        if(this.validator()){
          let param={
            id:this.id,
            workDate:this.workDate,
            brand:this.brand,
            personID:this.personID,
            person:this.person,
            selfAccountID:this.selfAccountID,
            selfAccount:this.selfAccount,
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
          }
          this.ajaxJson({
            url: '/dailyoffice/deposit/save',
            data: param,
            loading: '0',
            call: (data) => {
              if (data.type === 0) {
                this.$dialog.setReturnValue(this.id) //向父级页面id值
                this.$dialog.alert({
                  tipValue: data.message,
                  closeCallBack: () => {
                    this.bankDetailSave()
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
