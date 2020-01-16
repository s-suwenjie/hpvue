<template>
  <div class="f_main">
    <yhm-formbody>
      <template #title>基本信息</template>
      <template #control>
        <yhm-form-date title="交易日期" :value="workDate" id="workDate" rule="R0000"></yhm-form-date>
        <yhm-form-text title="还款金额" tip="money" before-icon="rmb" :value="money" id="money" rule="R3000"></yhm-form-text>
        <yhm-form-select title="付款账户" @click="selectOtherAccount" :value="otherAccount" id="otherAccount" rule="R0000"></yhm-form-select>
        <yhm-form-select title="收款账户" @click="selectAccount" :value="account" id="account" rule="R0000"></yhm-form-select>
        <yhm-form-textarea title="备注" :value="remark" id="remark"></yhm-form-textarea>
      </template>
    </yhm-formbody>

    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn>
        <yhm-commonbutton value="保存" icon="btnSave" :flicker="true" @call="save(0)"></yhm-commonbutton>
      </template>
    </yhm-formoperate>
  </div>
</template>

<script>
  import { accMul, accAdd, guid, formatDate, number2chinese,formatTime} from '@/assets/common.js'
  import { formmixin } from '@/assets/form.js'
  export default {
    name: 'myReceivableRegisterForm',
    mixins: [formmixin],
    data(){
      return{
        id:'',
        ownerID:'',
        money:'',
        workDate:'',
        otherAccountID:'',
        otherAccount:'',
        accountID:'',
        account:'',
        remark:'',
        state:'0',

        nameID:'',
        receivableType:'',
      }
    },
    methods:{
      selectOtherAccount(){
        let url = '/selectPublicAccount?categoryUnit=1&categoryBefore=1&category=1&unitID='+this.nameID
        if (this.receivableType === '1'){
            url='/selectPrivateAccount?categoryUnit=1&categoryBefore=1&category=1&personID='+this.nameID
        }
        this.$dialog.OpenWindow({
          width: 950,
          height: 692,
          title:'选择账户信息',
          url:url,
          closeCallBack: (data) => {
            if (data) {
              this.otherAccountID = data.id
              this.otherAccount = data.publicAccountExplain
            }
          }
        })

      },
      selectAccount(){
        this.$dialog.OpenWindow({
          width: 950,
          height: 692,
          title:'选择账户信息',
          url:'/selectPublicAccount?categoryUnit=0&categoryBefore=1&category=1',
          closeCallBack: (data) => {
            if (data) {
              this.accountID = data.id
              this.account = data.publicAccountExplain
            }
          }
        })
      },
      //保存
      save(){
        if(this.validator()){
          let params = {
            id:this.id,
            ownerID:this.ownerID,
            money:this.money,
            workDate:this.workDate,
            otherAccountID:this.otherAccountID,
            accountID:this.accountID,
            money:this.money,
            remark:this.remark,
            state:this.state,
          }
          this.ajaxJson({
            url: '/Bill/saveReceivableRegister',
            data: params,
            call: (data) => {
              if (data.type == 0) {
                this.$dialog.setReturnValue(data)
                this.$dialog.alert({
                  tipValue: data.message,
                  closeCallBack: () => {
                    this.$dialog.close();
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
      this.setQuery2Value('nameID')
      this.setQuery2Value('receivableType')
    }
  }
</script>

<style scoped>

</style>
