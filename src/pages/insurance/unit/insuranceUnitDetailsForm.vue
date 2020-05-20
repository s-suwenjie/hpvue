<template>
  <div class="f_main">
    <yhm-formbody>
      <template #title>基本信息</template>
      <template #control>
        <yhm-form-date title="启用日期" style="width: 100%" v-show="isNum" :value="startDate" id="startDate " position="t"  ></yhm-form-date>
        <yhm-form-text placeholder=""   title="保险公司回款新车费率%" subtitle="" :value="inNewRate" id="inNewRate" rule="R1400"></yhm-form-text>
        <yhm-form-text placeholder=""  title="保险公司回款旧车费率%" subtitle="" :value="inOldRate" id="inOldRate" rule="R1400"></yhm-form-text>
        <yhm-form-text placeholder=""  title="保险公司回款客户费率%" subtitle="" :value="inClientRate" id="inClientRate" rule="R1400"></yhm-form-text>

        <yhm-form-text placeholder=""  title="三方服务费回款新车费率%" subtitle="" :value="trNewRate" id="trNewRate" rule="R1400"></yhm-form-text>
        <yhm-form-text placeholder=""  title="三方服务费回款旧车费率%" subtitle="" :value="trOldRate" id="trOldRate" rule="R1400"></yhm-form-text>
        <yhm-form-text placeholder=""  title="三方服务费回款客户费率%" subtitle="" :value="trClientRate" id="trClientRate" rule="R1400"></yhm-form-text>

        <yhm-form-text placeholder=""  title="特殊车型费率%" subtitle="" :value="vipRate" id="vipRate" rule="R1400"></yhm-form-text>


        <yhm-form-text placeholder=""  title="新车费率%" subtitle="" :value="newRate" id="newRate" rule="R1400"></yhm-form-text>
        <yhm-form-text placeholder=""  title="旧车费率%" subtitle="" :value="oldRate" id="oldRate" rule="R1400"></yhm-form-text>
        <yhm-form-text placeholder=""  title="客户费率%" subtitle="" :value="clientRate" id="clientRate" rule="R1400"></yhm-form-text>




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
  import { accMul, accAdd, guid, formatDate, number2chinese,formatTime} from '@/assets/common.js'
  export default {
    name: 'insuranceUnitDetailsForm',
    mixins: [formmixin],
    data(){
      return{
        id:'',
        shortName:'',
        ownerID:'',
        startDate:'',
        newRate:'',
        oldRate:'',
        clientRate:'',
        isNum:false,
        unitID:'',

        inNewRate:'',
        inOldRate:'',
        inClientRate:'',
        trNewRate:'',
        trOldRate:'',
        trClientRate:'',
        vipRate:'',


      }
    },
    methods:{
      //添加
      save () {
        if (this.validator()) {
          let params = {
            id: this.id,
            shortName:this.shortName,
            unitID:this.unitID,
            ownerID: this.ownerID,
            startDate:this.startDate,
            newRate: this.newRate,
            oldRate: this.oldRate,
            clientRate: this.clientRate,

            inNewRate:this.inNewRate,
            inOldRate:this.inOldRate,
            inClientRate:this.inClientRate,
            trNewRate:this.trNewRate,
            trOldRate:this.trOldRate,
            trClientRate:this.trClientRate,
            vipRate:this.vipRate

        }

          this.ajaxJson({
            url: '/Basic/saveUnitInsuranceDetails',
            data: params,
            call: (data) => {
              if (data.type === 0) {
                let Unit = {
                  id:this.id,
                  ownerID:this.ownerID,
                  startDate:this.startDate,
                  newRate:this.newRate,
                  oldRate:this.oldRate,
                  clientRate:this.clientRate,
                  vipRate:this.vipRate,
                }
                this.$dialog.setReturnValue(Unit)
                this.$dialog.alert({
                  tipValue: data.message,
                  closeCallBack: () => {
                    this.$dialog.close()
                    this.initPageData(false)
                  }
                })
              }else{
                this.$dialog.alert({
                  alertImg:'warn',
                  tipValue: data.message
                })
              }
            }
          })
        }
      }
    }
    ,
    created () {
      this.setQuery2Value('ownerID')
      this.setQuery2Value('unitID')
      this.setQuery2Value('shortName')
      this.init({
        url: '/Basic/initUnitInsuranceForm',
        all: (data) => {

          this.ajaxJson({
            url:"/Basic/unitInsuranceNumDetails",
            data:{
              id:this.ownerID,
            },
            call:(data) =>{

              if(data.type === 0 ){
                this.isNum=false
              }else{
                let date =formatDate(new Date((new Date()).getTime()))
                this.startDate=date
                this.isNum=true
              }
              if (this.startDate ==='1900-01-01'){
                this.isNum=false
              }


            }

          })
        },
        add: (data) => {
        },
        look: (data) => {
          this.startDate= data.startDate
          this.newRate=data.newRate
          this.oldRate=data.oldRate
          this.clientRate=data.clientRate

          this.inNewRate=data.inNewRate
          this.inOldRate=data.inOldRate
          this.inClientRate=data.inClientRate
          this.trNewRate=data.trNewRate
          this.trOldRate=data.trOldRate
          this.trClientRate=data.trClientRate
          this.vipRate=data.vipRate

        }
      })
    }
  }
</script>

<style scoped>

</style>


