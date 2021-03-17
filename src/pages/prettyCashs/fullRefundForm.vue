<template>
  <div class="f_main">
    <yhm-formbody>
      <template #title>基本信息</template>
      <template #control>
        <yhm-form-select title="收款账号" tip="value" width="1" :value="selfAccount" id="selfAccount" rule="R0000" @click="selfAccountEvent" :no-click="true"></yhm-form-select>
        <yhm-form-text title="开户行" :value="bankName" id="bankName" no-edit="1"></yhm-form-text>
        <yhm-form-text title="联行号" :value="interbank" id="interbank" no-edit="1"></yhm-form-text>

        <yhm-view-img title="账户图片" tag="UnitUrl" :url="accountUrl"></yhm-view-img>
        <yhm-view-img title="单位图片" tag="UnitUrl" :url="unitUrl"></yhm-view-img>

        <div class="copy">
          <yhm-commonbutton value="复制收款人名称" icon="i-copy" @call="copyName"></yhm-commonbutton>
          <yhm-commonbutton value="复制收款人账号" icon="i-copy" @call="copyAccount"></yhm-commonbutton>
        </div>

<!--        <yhm-formupload :ownerID="id" :value="list" id="list" title="支持单据" tag="bankDetail" subtitle="" multiple="multiple" rule="#"></yhm-formupload>-->
        <yhm-form-upload-image title="支持单据" tag="bankDetail" discription=" " :value="list" id="list" rule="#"></yhm-form-upload-image>
        <yhm-form-text title="退备用金金额" tip="money" before-icon="rmb" :value="money" id="money" rule="R3000" placeholder="请输入数字" error-message="纯数字输入"></yhm-form-text>

      </template>
    </yhm-formbody>
    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn>
        <yhm-commonbutton value="保存" icon="btnSave" :flicker="true" @call="save()" category="one"></yhm-commonbutton>
      </template>
    </yhm-formoperate>
    <div class="copyTip" v-if="isCopyTip">复制成功：{{copyTxt}}</div>
  </div>
</template>

<script>
  import { formmixin } from '@/assets/form.js'
  import { guid, formatTime,accAdd,accMul } from '@/assets/common.js'
  export default {
    name: "fullRefundForm",
    mixins: [formmixin],
    data(){
      return{
        id: guid(),
        selfAccount: '',
        selfAccountID: '',
        ownerID: '',
        suffix: '',
        list: '',
        bankName: '',
        interbank: '',
        account: '',
        selfUnit: '',
        accountUrl: '',
        unitUrl: '',
        copyTxt: '',
        fileList: [],
        isCopyTip: false,
        nameTime: '',
        accountTime: '',
        money:'',

        category:'',//空  是备用金退款  1是报销退款
      }
    },
    methods: {
      /* 复制收款人名称 */
      copyName(){
        if(this.selfUnit){
          this.$copyText(this.selfUnit).then(res=>{
            this.isCopyTip =  true
            this.copyTxt = this.selfUnit
            let that = this
            clearTimeout(this.accountTime)
            this.nameTime = window.setTimeout(function () {
              that.isCopyTip =  false
            },5000)
          },err=>{

          })
        }
      },
      /* 复制收款人账号 */
      copyAccount(){
        if(this.account){
          this.$copyText(this.account).then(res=>{
            this.isCopyTip =  true
            this.copyTxt = this.account
            let that = this
            clearTimeout(this.nameTime)
            this.accountTime = window.setTimeout(function () {
              that.isCopyTip =  false
            },5000)
          },err=>{

          })
        }
      },
      selfAccountEvent(){
        this.$dialog.OpenWindow({
          width: 950,
          height: 692,
          url: '/selectPublicAccount?categoryBefore=1&categoryUnit=0&category=0',
          title: '选择账户信息',
          closeCallBack: (data) => {
            if (data) {
              this.selfAccount = data.publicAccountExplain;
              this.selfAccountID = data.id
            }
          }
        })
      },
      save(){
        if(this.validator()){
          let index = this.list.indexOf('.');
          this.suffix = this.list.substr(index+1);
          let insertDate = new Date(accAdd(new Date().getTime(), accMul(this.fileList.length, 1000)))
          this.fileList.push({
            id: guid(),
            insertDate: formatTime(insertDate),
            ownerID: this.id,
            category: '',
            storeName: this.list,
            suffix: this.suffix,
            image: '1',
            showName: '2',
            tag: 'bankDetail'
          })
          let params = {
            id: this.id,
            selfAccount: this.selfAccount,
            selfAccountID: this.selfAccountID,
            ownerID: this.ownerID,
            list: this.fileList,
            money:this.money,
          };
          let url='/PersonOffice/prettyCashsRefund'
          if(this.category === '1' ){
            url='/PersonOffice/reimbursementsRefund'
          }
          this.ajaxJson({
            url: url,
            data: params,
            call: (data)=>{
              if(data.type === 0){
                this.$dialog.setReturnValue(this.id)
                this.$dialog.alert({
                  tipValue: data.message,
                  closeCallBack: ()=>{
                    this.$dialog.close()
                  }
                })
              }else{
                this.$dialog.alert({
                  alertImg: 'warn',
                  tipValue: data.message
                })
              }
            }
          })
        }
      },
      initData(){
        let params = {
          id: this.ownerID
        }
        let url='/PersonOffice/prettyCashsRefundInformation'
        if(this.category === '1' ){
          url='/PersonOffice/reimbursementsRefundInformation'
        }
        this.ajaxJson({
          url: url,
          data: params,
          call: (data)=>{
            if(data){
              this.selfAccount = data.selfAccount
              this.selfAccountID = data.selfAccountID

              this.bankName = data.bankName
              this.interbank = data.interbank
              this.account = data.account
              this.selfUnit = data.selfUnit

              this.accountUrl = data.accountUrl
              this.unitUrl = data.unitUrl
              this.money = data.money

              // window.open("/UploadFile/ElectronicInvoice/" + item.pdfUrl)
            }
          }
        })
      }
    },
    created() {
      this.setQuery2Value('ownerID')
      this.setQuery2Value('category')
      this.initData()
    }
  }
</script>

<style scoped lang="less">
  .copy{
    display: flex;
    flex-direction: column;
  }
  .copy>div:first-child{
    margin-top: 60px;
  }
  .copy>div:last-child{
    margin-top: 32px;
  }
</style>
