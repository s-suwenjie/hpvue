<template>
  <div class="f_main">
    <yhm-formbody>
      <template #title>基础数据</template>
      <template #control>
        <yhm-form-text title="购买方" no-edit="1" :value="purchaser" id="purchaser" rule="R0000"></yhm-form-text>
        <yhm-form-text title="身份证号" no-edit="1" subtitle="或纳税号":value="registrationNumber" id="registrationNumber" rule="R0000"></yhm-form-text>
        <yhm-form-radio title="车辆类型" :select-list="vehicleTypeList" :value="vehicleType" id="vehicleType" rule="R0000"></yhm-form-radio>
        <yhm-form-radio title="厂牌型号" :select-list="vehicleModelList" :value="vehicleModel" id="vehicleModel" rule="R0000"></yhm-form-radio>
        <yhm-form-radio title="车辆产地" :select-list="vehiclePlaceList" :value="vehiclePlace" id="vehiclePlace" rule="R0000"></yhm-form-radio>
        <yhm-form-text title="合格证号" :value="vehicleCertificate" id="vehicleCertificate"></yhm-form-text>
        <yhm-form-text title="进口证"subtitle="明书号" :value="vehicleImported" id="vehicleImported" rule="R0000"></yhm-form-text>
        <yhm-form-text title="商检单号" :value="vehicleInspection" id="vehicleInspection" rule="R0000"></yhm-form-text>
        <yhm-form-text title="发动机" :value="vehicleEngine" id="vehicleEngine" rule="R0000"></yhm-form-text>
        <yhm-form-text title="车架号" :value="vehicleFrame" id="vehicleFrame" rule="R0000"></yhm-form-text>
        <yhm-form-text title="车辆乘"subtitle="坐人数" :value="vehicleRide" id="vehicleRide" rule="R0000"></yhm-form-text>
      </template>
    </yhm-formbody>
    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn>
        <yhm-commonbutton value="保存" v-if="type==='0'" icon="btnSave" :flicker="true" @call="save()" category="one"></yhm-commonbutton>
      </template>
    </yhm-formoperate>
  </div>
</template>

<script>
  import { formmixin } from '@/assets/form.js'
  export default {
    name: 'openInvoiceVehicleForm',
    mixins: [formmixin],
    data(){
      return{
        ownerID:'',
        purchaserType:'',//购买方类型
        purchaserID:'',//购买方ID
        purchaser:'',//购买方ID
        registrationNumber:'',//人  身份证号     单位 纳税号
        vehicleType:'',//轿车   越野
        vehicleModel:'',//车辆型号
        vehiclePlace:'',//产地
        vehicleCertificate:'',//合格证
        vehicleImported:'',//进口证明书号
        vehicleInspection:'',//商检号
        vehicleEngine:'',//发动机
        vehicleFrame:'',//车架号
        vehicleRide:'',
        vehicleTypeList:[],
        vehicleModelList:[],
        vehiclePlaceList:[],
        type:'',
      }
    },
    methods:{
      save() {
        if (this.validator()) {
          let params = {
            id:this.id,
            ownerID:this.ownerID,
            vehicleType:this.vehicleType,//轿车   越野
            vehicleModel:this.vehicleModel,//车辆型号
            vehiclePlace:this.vehiclePlace,//产地
            vehicleCertificate:this.vehicleCertificate,//合格证
            vehicleImported:this.vehicleImported,//进口证明书号
            vehicleInspection:this.vehicleInspection,//商检号
            vehicleEngine:this.vehicleEngine,//发动机
            vehicleFrame:this.vehicleFrame,//车架号
            vehicleRide:this.vehicleRide,//车辆乘坐人数
          }
          this.ajaxJson({
            url: '/Bill/openInvoiceVehicleSave',
            data: params,
            call: (data) => {
              if (data.type === 0) {
                this.$dialog.setReturnValue('123')
                this.$dialog.alert({
                  tipValue: data.message,
                  closeCallBack: () => {
                    this.$dialog.close()
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
      },
      initData() {
        let params ={}
        if(this.type === '0'){
          params = {
            ownerID: this.ownerID
          }
        }else{
          params = {
            ownerID: this.ownerID,
            id: this.id
          }
        }
        this.init({
          url: '/Bill/openInvoiceVehicleForm',
          data: params,
          all: (data) => {
            if(data){
              this.registrationNumber=data.registrationNumber
              this.purchaser=data.purchaser
              this.purchaserID=data.purchaserID
              this.vehicleTypeList=data.vehicleTypePsd.list
              this.vehicleType=data.vehicleTypePsd.value
              this.vehiclePlaceList=data.vehiclePlacePsd.list
              this.vehiclePlace=data.vehiclePlacePsd.value
              this.vehicleModelList=data.vehicleModelPsd.list
              this.vehicleModel=data.vehicleModelPsd.value
              this.vehicleCertificate=data.vehicleCertificate,//合格证
              this.vehicleImported=data.vehicleImported,//进口证明书号
              this.vehicleInspection=data.vehicleInspection,//商检号
              this.vehicleEngine=data.vehicleEngine,//发动机
              this.vehicleFrame=data.vehicleFrame,//车架号
              this.vehicleRide=data.vehicleRide
            }
          },
          look: (data)=>{

          }
        })
      }
    },
    created () {
      this.setQuery2Value('ownerID')
      this.setQuery2Value('type')
      this.initData()
    }
  }
</script>

<style scoped>

</style>
