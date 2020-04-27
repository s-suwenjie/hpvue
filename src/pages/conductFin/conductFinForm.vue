<template>
  <div class="f_main">
    <yhm-formbody>
      <template #title>基本信息</template>
      <template #control>
        <yhm-form-text title="产品名称" :value="name" id="name" rule="R0000"></yhm-form-text>
        <yhm-form-radio title="状态" :select-list="stateList" :value="state" id="state" no-edit></yhm-form-radio>
        <yhm-form-select title="选择账号" @click="selectAccountEvent" :value="account" id="account" width="1" rule="R0000" tip="value"></yhm-form-select>
        <yhm-form-text title="金额" tip="money" :value="money" id="money" rule="R0000"></yhm-form-text>
        <yhm-form-text title="金额大写" :value="moneyCn" id="moneyCn" rule="R0000" no-edit="1"></yhm-form-text>
        <yhm-form-date title="开始日期" :value="startDate" id="startDate" :max="endDate" rule="R0000" position="r"></yhm-form-date>
        <yhm-form-radio title="状态" :select-list="redemptionCategoryList" :value="redemptionCategory" id="redemptionCategory" @call="switchRedemptionCategoryEvent"></yhm-form-radio>
        <yhm-form-date title="结束日期" :show="redemptionCategory == 0" :value="endDate" id="endDate" :min="startDate" rule="R0000" position="r"></yhm-form-date>
        <yhm-formupload :ownerID="id" :value="fileList" id="fileList" title="支持单据" tag="conductFin" subtitle="" multiple="multiple"></yhm-formupload>
      </template>
    </yhm-formbody>

    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn>
        <yhm-commonbutton value="保存" icon="btnSave" @call="save(0)" :flicker="true"></yhm-commonbutton>
        <yhm-commonbutton value="保存并新增" class="btnAddSave" icon="btnAddSave" @call="save(1)"></yhm-commonbutton>
      </template>
    </yhm-formoperate>

  </div>
</template>

<script>
  import { number2chinese } from '@/assets/common.js'
  import { formmixin } from '@/assets/form.js'
  export default {
    name: 'conductFinForm',
    mixins: [formmixin],
    data(){
      return {
        name: '',
        account: '',
        accountID: '',
        money: '',
        moneyCn: '',
        startDate: '',
        redemptionCategory:'',
        redemptionCategoryList:[],
        endDate: '',
        fileList: [],
        state: '',
        stateList: []
      }
    },
    methods: {
      switchRedemptionCategoryEvent(){
        if(this.redemptionCategory === '1'){
          this.endDate = ''
        }
      },
      selectAccountEvent(){
        this.$dialog.OpenWindow({
          width: 950,
          height: 690,
          title: '选择账号',
          url: '/selectPublicAccount?categoryUnit=0&categoryBefore=1&category=1&categoryAccBefore=1',
          closeCallBack: (data) => {
            this.account = data.publicAccountExplain
            this.accountID = data.id
          }
        })
      },
      viewList(id){
        let params = {
          id: id
        }
        this.ajaxJson({
          url: '/Fin/initBankProductForm',
          data: params,
          call: (data)=>{
            this.name = data.name
            this.state = data.state
            this.accountID = data.accountID
            this.account = data.account
            this.money = data.money
            this.moneyCn = data.moneyCn
            this.startDate = data.startDate
            this.endDate = data.endDate
          }
        })
      },
      save(op){
        if(this.validator()){
          let params = {
            id: this.id,
            name: this.name,
            state: this.state,
            account: this.account,
            accountID: this.accountID,
            money: this.money,
            moneyCn: this.moneyCn,
            startDate: this.startDate,
            redemptionCategory: this.redemptionCategory,
            endDate: this.endDate,
            files: this.fileList,
          }

          this.ajaxJson({
            url: '/Fin/saveBankProduct',
            data: params,
            call: (data) => {
              if(data.type === 0){
                this.$dialog.setReturnValue('1')
                this.$dialog.alert({
                  tipValue: data.message,
                  closeCallBack: ()=> {
                    if(op === 1){
                      this.$dialog.refresh()
                    }else{
                      this.$dialog.close()
                    }
                  }
                })
              }else{
                this.$dialog.alert({
                  tipValue:data.message,
                  alertImg: 'error'
                })
              }
            }
          })
        }
      }
    },
    created(){
      this.setQuery2Value('id')
      this.setQuery2Value('state')
      if(this.state==1){
        this.viewList(this.id)
      }
      this.init({
        url: '/Fin/initBankProductForm',
        all: (data) =>{
          this.redemptionCategory = data.redemptionCategoryPsd.value
          this.redemptionCategoryList = data.redemptionCategoryPsd.list
          this.state = data.statePsd.value
          this.stateList = data.statePsd.list
        },
        add: (data) => {

        },
        look: (data) => {

        }
      })
    },
    watch: {
      money () {
        this.moneyCn = number2chinese(this.money)
      },
    }
  }
</script>

<style scoped>

</style>
