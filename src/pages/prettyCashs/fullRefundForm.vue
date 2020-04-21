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

<!--        <yhm-formupload :ownerID="id" :value="list" id="list" title="支持单据" tag="bankDetail" subtitle="" multiple="multiple" rule="#"></yhm-formupload>-->
        <yhm-form-upload-image title="支持单据" tag="bankDetail" discription=" " :value="list" id="list" rule="#"></yhm-form-upload-image>
      </template>
    </yhm-formbody>
    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn>
        <yhm-commonbutton value="保存" icon="btnSave" :flicker="true" @call="save()" category="one"></yhm-commonbutton>
      </template>
    </yhm-formoperate>
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
        accountUrl: '',
        unitUrl: '',
        fileList: []
      }
    },
    methods: {
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


        if(this.validator()){
          let params = {
            id: this.id,
            selfAccount: this.selfAccount,
            selfAccountID: this.selfAccountID,
            ownerID: this.ownerID,
            list: this.fileList
          };

          this.ajaxJson({
            url: '/PersonOffice/prettyCashsRefund',
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
        this.ajaxJson({
          url: '/PersonOffice/prettyCashsRefundInformation',
          data: params,
          call: (data)=>{
            if(data){
              this.selfAccount = data.selfAccount
              this.selfAccountID = data.selfAccountID

              this.bankName = data.bankName
              this.interbank = data.interbank

              this.accountUrl = data.accountUrl
              this.unitUrl = data.unitUrl


              // window.open("/UploadFile/ElectronicInvoice/" + item.pdfUrl)
            }
          }
        })
      }
    },
    created() {
      this.setQuery2Value('ownerID')
      this.initData()
    }
  }
</script>

<style scoped>

</style>
