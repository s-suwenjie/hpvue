<template>
  <div class="f_main">
    <yhm-formbody>
      <template #title>基本信息</template>
      <template #control>
        <yhm-form-date title="拨付日期" :value="workDate" id="workDate" position="b" :min="nowDate" rule="R0000"></yhm-form-date>
        <yhm-form-text @blur="allocationMoneyEvent" title="拨付金额" tip="money" before-icon="rmb" :value="value" id="value" rule="R3000" placeholder="请输入数字" error-message="纯数字输入"></yhm-form-text>
        <yhm-form-textarea title="备注" :value="remark" id="remark"></yhm-form-textarea>
        <yhm-formupload :ownerID="id" :value="fileList" id="fileList" title="支持单据" tag="payment" subtitle="" multiple="multiple" rule=""></yhm-formupload>
      </template>
    </yhm-formbody>
    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn>
        <yhm-commonbutton value="保存" icon="btnSave" :flicker="true" @call="save()" category="one"></yhm-commonbutton>
        <yhm-commonbutton value="提交并提交" icon="btnSubSave" @call="saveSubmit()" category="one"></yhm-commonbutton>
      </template>

    </yhm-formoperate>
  </div>
</template>

<script>
  import { accMul, accAdd, guid, formatDate, number2chinese,formatTime} from '@/assets/common.js'
  import { formmixin } from '@/assets/form.js'
  export default {
    name: 'batchAllocationForm',
    mixins: [formmixin],
    data(){
      return {

        isAllocationMoney: '',
        workDate: '',
        nowDate: formatDate(new Date()),
        value: '',
        oldValue: '',
        allocationList: [],
        isSubBtn: false,
        allocationID: '',
        ownerID: '',
        remark:'',
        fileList: [], // 单据
      }
    },
    methods: {
      allocationMoneyEvent(){
        if(this.value){
          let value = parseFloat(this.value)
          let oldValue = parseFloat(this.oldValue)
          if(value > oldValue){
            this.$dialog.alert({
              width: '350',
              alertImg: 'error',
              tipValue: '拨付金额必须小于等于原始金额！！！',
              closeCallBack: ()=>{
                this.value = ''
              }
            })
          }
        }
      },
      initData() {

        let params = {
          ownerID: this.ownerID,
          isAllocationMoney: this.isAllocationMoney
        }

        this.init({
          url: '/PersonOffice/getPaymentAllocation',
          data: params,
          add: (data)=>{
            this.value = data.value
            this.oldValue = data.value
            if(data.workDate){
              this.workDate = data.workDate
            }
            if(data.id){
              this.id = data.id
            }
          },
          look: (data)=>{
          }
        })


        return
        this.ajaxJson({
          url: '/PersonOffice/getPaymentAllocation',
          data: params,
          call: (data)=>{
            this.value = data.value
            this.oldValue = data.value
            this.allocationID = data.id
            if(data.workDate){
              this.workDate = data.workDate
            }
          }
        })
      },
      saveSubmit(){
        if(this.validator()){
          let params = {
            id: this.id,
            ownerID: this.ownerID,
            workDate: this.workDate,
            value: this.value,
            remark:this.remark,
            fileList: this.fileList
          }
          console.log(params)
          this.ajaxJson({
            url: '/PersonOffice/paymentAllocationSave',
            data: params,
            call: (data)=>{
              if(data.type === 0){
                this.$dialog.setReturnValue(this.id)
                this.submit()
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
      submit(){
        this.$dialog.confirm({
          width: 300,
          tipValue: '确定提交申请?',
          btnValueOk: '确定',
          alertImg: 'warn',
          okCallBack: (data) => {
            let params = {
              id: this.id
            }
            this.ajaxJson({
              url: '/PersonOffice/paymentAllocationSubmit',
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
        })
      },
      save(){
        if(this.validator()){
          let params = {
            id: this.id,
            ownerID: this.ownerID,
            workDate: this.workDate,
            value: this.value,
            remark:this.remark,
            fileList: this.fileList
          }
          console.log(params)
          this.ajaxJson({
            url: '/PersonOffice/paymentAllocationSave',
            data: params,
            call: (data)=>{
              if(data.type === 0){
                this.$dialog.setReturnValue(this.id)
                this.$dialog.alert({
                  tipValue: data.message,
                  closeCallBack: ()=>{
                    this.submit()
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
      }
    },
    created () {
      this.setQuery2Value('isAllocationMoney')
      this.setQuery2Value('ownerID')
      this.initData()
      if(this.isAllocationMoney === '2'){
        this.isSubBtn = true
      }else{
        this.isSubBtn = false
      }
    }
  }
</script>

<style scoped lang="less">

</style>
