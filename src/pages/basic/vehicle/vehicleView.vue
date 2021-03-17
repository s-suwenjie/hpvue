<template>
  <div class="f_main">
    <yhm-view-body>
      <template #title>基本信息</template>
      <template #body>
        <yhm-view-control title="车辆分类" :content="category" :psd="categoryList"></yhm-view-control>
        <yhm-view-control title="车辆类型" :content="vehicleType" :psd="vehicleTypeList"></yhm-view-control>
        <yhm-view-control title="汽车排量" :content="displacement"></yhm-view-control>
        <yhm-view-control title="所属类型" :content="assort" :psd="assortList"></yhm-view-control>
        <yhm-view-control title="车牌号" :content="plate"></yhm-view-control>
        <yhm-view-control title="车辆颜色" :content="color"></yhm-view-control>
        <yhm-view-control title="车架号" :content="frameNumber"></yhm-view-control>
        <yhm-view-control title="发动机号" :content="engineNumber"></yhm-view-control>
        <yhm-view-control title="品牌" :content="brand"></yhm-view-control>
        <yhm-view-control title="车型" :content="model"></yhm-view-control>
        <yhm-view-control title="车辆版本" :content="version"></yhm-view-control>
        <yhm-view-control title="车主信息" :content="carOwner"></yhm-view-control>
        <yhm-view-control title="上牌日期" :content="registerDate === '1900-01-01'? '-----':registerDate" type="date"></yhm-view-control>
        <yhm-view-control category="3" title="行车证" type="files" :content="fileList"></yhm-view-control>
<!--        <yhm-view-control title="上传行车证" category="3" :content="drivingLicense" type="smfiles" tag="drivingLicense"></yhm-view-control>-->
      </template>
    </yhm-view-body>
    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn>
        <yhm-commonbutton value="编辑" v-if="isBlCustomer" icon="i-edit" :flicker="true" @call="editBtn()"></yhm-commonbutton>
      </template>
    </yhm-formoperate>
  </div>
</template>

<script>
  import { viewmixin } from '@/assets/view.js'
  export default {
    name: 'vehicleView',
    mixins: [viewmixin],
    data(){
      return {
        id:'',
        category:'',
        categoryList:[],//车辆类型
        vehicleType:'',
        vehicleTypeList:[],
        displacement:'',
        assort:'',
        assortList:[],//所属类型
        plate:'',//车牌号
        color:'',
        colorID:'',//车辆颜色
        frameNumber:'',//车架号
        engineNumber:'',//发动机号
        brand:'',
        brandID:'',//品牌
        model:'',
        modelID:'',//车型
        version:'',
        versionID:'',//车辆版本
        registerDate:'',
        carOwner:'',
        carOwnerID:'',//车主信息
        drivingLicense:'',//行车证
        isBlCustomer:true,
      }
    },
    methods:{
      editBtn(){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '750',
          title: '编辑客户信息',
          url: '/vehicleForm?id=' + this.id,
          closeCallBack: (data)=>{
            if(data){
              this.$dialog.setReturnValue(this.id)
              this.initData()
            }
          }
        })
      },
      initData(){
        let url = ''
        let params = {}
        if(this.type=='1'){//type等于1时表示 是从离线工单进入的并且根据车牌查询数据
          url = '/Basic/getPlateForm'
          params = {
            plate: this.plate
          }
        }else{
          url = '/Basic/initVehicleForm'
          params = {
            id: this.id
          }
        }
        this.init({
          url: url,
          data: params,
          call: (data) => {
              this.categoryList = data.categoryPsd.list
              this.category = data.categoryPsd.value
              this.assortList = data.assortPsd.list
              this.assort = data.assortPsd.value
              this.vehicleTypeList=data.vehicleTypePsd.list
              this.vehicleType=data.vehicleTypePsd.value
              this.displacement=data.displacement
              this.plate=data.plate
              this.color=data.color
              this.colorID=data.colorID
              this.frameNumber=data.frameNumber
              this.engineNumber=data.engineNumber
              this.brand=data.brand
              this.brandID=data.brandID
              this.model=data.model
              this.modelID=data.modelID
              this.version=data.version
              this.versionID=data.versionID
              this.registerDate=data.registerDate
              this.carOwner=data.carOwner
              this.carOwnerID=data.carOwnerID
              this.drivingLicense=data.drivingLicense
              this.fileList = data.files
          }
        })
      }
    },
    created () {
      this.setQuery2Value('type')
      this.setQuery2Value('plate')
      this.setQuery2Value('isCustomer')

      if(this.isCustomer === '0'){
        this.isBlCustomer = false
      }
      this.initData()
    }
  }
</script>

<style scoped>

</style>
