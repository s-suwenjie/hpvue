<template>
  <div class="f_main">
    <yhm-view-body :customize="true" :pager="false">
      <template #title>基本信息</template>
      <template #body>
        <yhm-view-control title="添加人" :content="person"></yhm-view-control>
        <yhm-view-control title="启用时间" type="date" :content="enableDate" ></yhm-view-control>
        <yhm-view-control title="状态" :content="state" :psd="statePsd"></yhm-view-control>
        <yhm-view-control title="单位养老（%）" :content="unitPension" ></yhm-view-control>
        <yhm-view-control title="单位失业（%）" :content="unitUnemployment" ></yhm-view-control>
        <yhm-view-control title="单位公积金（%）" :content="unitProvident" ></yhm-view-control>
        <yhm-view-control title="个人养老（%）" :content="personalPension" ></yhm-view-control>
        <yhm-view-control title="个人失业（%）" :content="personalUnemployment" ></yhm-view-control>
        <yhm-view-control title="个人公积金（%）" :content="personalProvident" ></yhm-view-control>
        <yhm-view-control title="单位医疗（%）" :content="unitMedical" ></yhm-view-control>
        <yhm-view-control title="个人医疗（%）" :content="personalMedical" ></yhm-view-control>
        <yhm-view-control title="个人医疗（元）" :content="personalMedicalMoney" ></yhm-view-control>
        <yhm-view-control title="单位工伤（%）" :content="unitInjury" ></yhm-view-control>
      </template>
    </yhm-view-body>
    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn>
        <yhm-commonbutton value="编辑" v-show="state=='0'" icon="btnSave" :flicker="true" @call="edit()"></yhm-commonbutton>
      </template>
    </yhm-formoperate>
  </div>
</template>

<script>
  import { viewmixin } from '@/assets/view.js'
  import {formatDate} from '@/assets/common.js'
  export default {
    name: 'fiveinsurancesView',
    mixins: [viewmixin],
    data(){
      return{
        personID:'',
        person:'',
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

        insertDate:'',
        createName:'',
        updateName:'',
        updateDate:'',
      }
    },
    methods: {
      edit(){
        this.$dialog.OpenWindow({
          width: 1050,
          height: 820,
          url:'/fiveinsurancesForm',
          title:'添加五险百分比信息',
          closeCallBack:(data) =>{
            if(data){
              this.$dialog.setReturnValue(this.id)
              this.init()
            }
          }
        })
      },
      init(){
        let params = {
          id: this.id
        }
        this.ajaxJson({
          url: '/finance/fiveInsurances/initForm',
          data: params,
          call: (data) => {
            if(data){
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
              this.statePsd=data.statePsd.list
              this.insertDate=data.insertDate
              this.createName=data.createName
              this.updateName=data.updateName
              this.updateDate=data.updateDate
            }
          }
        })
      }
    },
    created () {
      this.init()
    }
  }
</script>

<style scoped>

</style>
