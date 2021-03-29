<template>
  <div  class="f_main">
    <yhm-formbody>
      <template #title>基本信息</template>

      <template #control>
        <yhm-form-text no-edit="1" title="姓名" ref="person" :value="person" id="person" rule="R0000"></yhm-form-text>
        <yhm-form-date title="启用时间" :min="maxApplyDate" @call="verifyEnableDate" :value="enableDate" id="enableDate" rule="R0000"></yhm-form-date>
        <yhm-form-text title="单位养老" subtitle="（%）" :value="unitPension" id="unitPension" rule="R1400"></yhm-form-text>
        <yhm-form-text title="个人养老" subtitle="（%）" :value="personalPension" id="personalPension" rule="R1400"></yhm-form-text>
        <yhm-form-text title="单位失业" subtitle="（%）" :value="unitUnemployment" id="unitUnemployment" rule="R1400"></yhm-form-text>
        <yhm-form-text title="个人失业" subtitle="（%）" :value="personalUnemployment" id="personalUnemployment" rule="R1400"></yhm-form-text>
        <yhm-form-text title="单位公积" subtitle="金（%）" :value="unitProvident" id="unitProvident" rule="R1400"></yhm-form-text>
        <yhm-form-text title="个人公积" subtitle="金（%）" :value="personalProvident" id="personalProvident" rule="R1400"></yhm-form-text>
        <yhm-form-text title="单位医疗" subtitle="（%）" :value="unitMedical" id="unitMedical" rule="R1400"></yhm-form-text>
        <yhm-form-text title="个人医疗" subtitle="（%）" :value="personalMedical" id="personalMedical" rule="R1400"></yhm-form-text>
        <yhm-form-text title="个人医疗" subtitle="金额（元）" :value="personalMedicalMoney" id="personalMedicalMoney" rule="R1400"></yhm-form-text>
        <yhm-form-text title="单位工伤" subtitle="（%）" :value="unitInjury" id="unitInjury" rule="R1400"></yhm-form-text>
        <!--<yhm-form-radio title="状态" :select-list="statePsd" :value="state" id="state" rule="R0000"></yhm-form-radio>-->
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
  import {number2chinese,accMul, accAdd, guid, formatTime, formatDate,formatCnDate} from '@/assets/common.js'
  export default {
    name: 'fiveinsurancesForm',
    mixins: [formmixin],
    data() {
      return {
        maxApplyDate:formatDate(new Date()),

        personID:sessionStorage.getItem('____currentUserID'),
        person:sessionStorage.getItem('____currentUser'),
        enableDate:'',
        unitPension:'',
        personalPension:'',
        personalUnemployment:'',
        unitUnemployment:'',
        unitInjury:'',
        personalMedical:'',
        personalMedicalMoney:'',
        unitMedical:'',
        personalProvident:'',
        unitProvident:'',
        state:'',
        statePsd:[],
      }
    },
    created(){
      let params={}
      this.init({
        url: '/finance/fiveInsurances/initForm',
        data: params,
        all: (data) => {
          this.statePsd=data.statePsd.list
          this.state=data.statePsd.value
        },
        add: (data) => {

        },
        look: (data) => {
          this.personID=data.personID
          this.person=data.person
          this.enableDate=data.enableDate
          this.unitPension=data.unitPension
          this.personalPension=data.personalPension
          this.personalUnemployment=data.personalUnemployment
          this.unitUnemployment=data.unitUnemployment
          this.unitInjury=data.unitInjury
          this.personalMedical=data.personalMedical
          this.personalMedicalMoney=data.personalMedicalMoney
          this.unitMedical=data.unitMedical
          this.personalProvident=data.personalProvident
          this.unitProvident=data.unitProvident
          this.state=data.state
        }
      })
    },
    methods:{
      //验证在同一天不能设置两种百分比
      verifyEnableDate(){
        let params={
          id:this.id,
          columnName:'enableDate',
          columnValue:this.enableDate
        }
        this.ajaxJson({
          url: '/finance/fiveInsurances/isExist',
          data: params,
          loading: '0',
          call: (data) => {
            if (data.type != 0) {
              this.id=data.content.id
              this.personID=data.content.personID
              this.person=data.content.person
              this.enableDate=data.content.enableDate
              this.unitPension=data.content.unitPension
              this.personalPension=data.content.personalPension
              this.personalUnemployment=data.content.personalUnemployment
              this.unitUnemployment=data.content.unitUnemployment
              this.unitInjury=data.content.unitInjury
              this.personalMedical=data.content.personalMedical
              this.personalMedicalMoney=data.content.personalMedicalMoney
              this.unitMedical=data.content.unitMedical
              this.personalProvident=data.content.personalProvident
              this.unitProvident=data.content.unitProvident
              this.state=data.content.state
            }
          }
        })
      },
      save(){
        let a = this.validator()
        if(a){
          let param={
            id:this.id,
            personID:this.personID,
            person:this.person,
            enableDate:this.enableDate,
            unitPension:this.unitPension,
            personalPension:this.personalPension,
            personalUnemployment:this.personalUnemployment,
            unitUnemployment:this.unitUnemployment,
            unitInjury:this.unitInjury,
            personalMedical:this.personalMedical,
            personalMedicalMoney:this.personalMedicalMoney,
            unitMedical:this.unitMedical,
            personalProvident:this.personalProvident,
            unitProvident:this.unitProvident,
            state:this.state
          }
          this.ajaxJson({
            url: '/finance/fiveInsurances/save',
            data: param,
            call: (data) => {
              if(data.type===0){
                this.$dialog.setReturnValue(this.id)
                this.$dialog.alert({
                  tipValue: data.message,
                  closeCallBack: () => {
                    this.$dialog.close()
                  }
                })
              }else{
                this.$dialog.alert({
                  tipValue: data.message,
                  alertImg: 'error',
                  closeCallBack: () => {
                    this.$dialog.close()
                  }
                })
              }
            }
          })
        }
      }
    }
  }
</script>

<style scoped>

</style>
