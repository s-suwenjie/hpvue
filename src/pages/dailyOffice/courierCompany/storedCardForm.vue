<template>
  <div class="f_main">
    <yhm-formbody>
      <template #title>添加信息</template>
      <template #control>
        <yhm-form-text placeholder=""  no-edit="1" title="充值卡号" subtitle="" :value="numbering" id="numbering"></yhm-form-text>
        <yhm-form-text placeholder=""  no-edit="1" title="充值别名" subtitle="" :value="alias" id="alias"></yhm-form-text>
        <yhm-form-date title="充值日期"   :value="rechargeDate" id="rechargeDate " position="t"  rule="R0000"></yhm-form-date>
        <yhm-form-text placeholder=""  title="充值金额" @repeatverify="rechargeMoneyClick"  subtitle="" :value="rechargeMoney" id="rechargeMoney" rule="R0000"></yhm-form-text>
        <yhm-form-text placeholder=""  title="实际支付金额" subtitle="" :value="actualMoney" id="actualMoney" rule="R0000"></yhm-form-text>
        <yhm-form-select title="充值人员"  :value="rechargePerson" id="rechargePerson"  @click="rechargePersonClick()" rule="R0000"></yhm-form-select>
        <yhm-form-text placeholder="" no-edit="1" title="充值后金额" subtitle="" :value="rechargeRearMoney" id="rechargeRearMoney"></yhm-form-text>
        <yhm-form-radio title="是否报销" @call="reimbursementCall()"  :select-list="reimbursementList" :value="reimbursement" id="reimbursement"></yhm-form-radio>
        <yhm-form-radio title="报销状态" :no-edit="true" :select-list="reimbursementStatusList" :value="reimbursementStatus" id="reimbursementStatus" ></yhm-form-radio>


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
  import { formmixin } from '@/assets/form.js'
  import { accAdd } from '../../../assets/common'
  export default {
    name: 'storedCardForm',
    mixins: [formmixin],
    data(){
      return{
        cardID:'',//储值卡ID
        numbering:'',//充值卡号
        alias:'',//充值别名
        rechargeDate:'',//充值日期
        rechargeMoney:'',//充值金额
        actualMoney:'',//实际支付金额
        rechargePerson:'',
        rechargePersonID:'',//充值人员
        rechargeRearMoney:'',//充值后金额
        reimbursementList:[],//是否报销
        reimbursement:'',
        reimbursementStatusList:[],//报销状态
        reimbursementStatus:'',
      }
    },
    methods:{
      reimbursementCall(){
        if (this.reimbursement==1){
          this.reimbursementStatus=1
        } else {
          this.reimbursementStatus=0
        }
      },
      save() {
        if (this.validator()) {
          let params = {
            id:this.id,
            cardID:this.cardID,
            rechargeDate:this.rechargeDate,
            rechargeMoney:this.rechargeMoney,
            actualMoney:this.actualMoney,
            rechargePersonID:this.rechargePersonID,
            rechargeRearMoney:this.rechargeRearMoney,
            reimbursement:this.reimbursement,
            reimbursementStatus:this.reimbursementStatus,
          }

          this.ajaxJson({
            url: '/dailyoffice/expressCompany/insertRecharge',
            data: params,
            call: (data) => {
              if (data.type === 0) {
                this.$dialog.setReturnValue(this.id)
                this.$dialog.alert({
                  tipValue: data.message,
                  closeCallBack: () => {
                    this.$dialog.close()
                    this.initPageData(false)

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
        }
      },
      rechargeMoneyClick(){

        if (this.rechargeMoney!=''){
          let sum =this.rechargeRearMoney
         sum=accAdd(sum,this.rechargeMoney)
          this.rechargeRearMoney=sum+''
        }
      },
      rechargePersonClick(){
        this.$dialog.OpenWindow({
          width: 950,
          height: 692,
          url: '/selectPerson?category=1&commonClientUse=1',
          title: '选择充值人员',
          closeCallBack: (data) => {
            if(data){
              this.rechargePersonID=data.id
              this.rechargePerson = data.name


            }
          },
        })
      },
    },
    created(){
      this.setQuery2Value('ownerID')
      let params={}
      if (this.owerID!=''){
         params={
          ownerID:this.ownerID
        }
      }

      this.init({
       url: '/dailyoffice/expressCompany/initRechargeForm',
        data: params,
        all: (data) => {
        this.reimbursementList = data.reimbursementPsd.list
        this.reimbursement = data.reimbursementPsd.value

        this.reimbursementStatusList = data.reimbursementStatusPsd.list
        this.reimbursementStatus = data.reimbursementStatusPsd.value


        },
        add: (data) => {
          /* 需要添加的数据 */
          this.cardID=data.cardID
          this.numbering=data.numbering
          this.alias=data.alias
          this.rechargeRearMoney=data.rechargeRearMoney
        },
        look: (data) => {
          /* 需要查看的数据 */
          this.cardID=data.cardID
          this.numbering=data.numbering
          this.alias=data.alias
          this.rechargeDate=data.rechargeDate
          this.rechargeMoney=data.rechargeMoney
          this.actualMoney=data.actualMoney
          this.rechargePerson=data.rechargePerson
          this.rechargePersonID=data.rechargePersonID
          this.rechargeRearMoney=data.rechargeRearMoney

        }
      })
    },
  }
</script>

<style scoped>

</style>

