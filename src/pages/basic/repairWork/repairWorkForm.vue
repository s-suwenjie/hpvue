<template>
  <div class="f_main">
    <yhm-formbody>
      <template #title>添加信息</template>
      <template #control>

        <yhm-form-radio title="车辆分类" :select-list="categoryList" :value="category" id="category" @call="categoryEvent"></yhm-form-radio>
        <yhm-form-radio  title="所属类型" :show="isAssort" :select-list="assortList" :value="assort" id="assort"></yhm-form-radio>
        <yhm-form-text placeholder="" @repeatverify="nameVerifyEvent" ref="plate"  title="车牌号" subtitle="" :show="isHide" :value="plate" id="plate" rule="R8000"></yhm-form-text>
        <yhm-form-select title="车辆颜色" tip="value" :value="color" id="color" rule="R0000" @click="selectColour"></yhm-form-select>
        <yhm-form-text placeholder=""  title="车架号" subtitle="" :value="frameNumber" id="frameNumber" rule="R0000"></yhm-form-text>
        <yhm-form-text placeholder="" title="发动机号" subtitle="" :value="engineNumber" id="engineNumber" rule="R0000"></yhm-form-text>
        <yhm-form-select title="品牌" tip="value" :value="brand" id="brand" rule="R0000" @click="selectBrand"></yhm-form-select>
        <yhm-form-select title="车型" tip="value" :value="model" id="model" rule="R0000" @click="selectModel"></yhm-form-select>
        <yhm-form-select title="车辆版本" tip="value" :value="version" id="version" rule="R0000" @click="selectVersion"></yhm-form-select>
        <yhm-form-date title="登记日期" v-if="isHide" :value="registerDate" id="registerDate " position="u"  rule="R0000"></yhm-form-date>
        <yhm-form-select  title="车主信息" tip="value" @click="carOwnerIDEvent" :show="isHides"  :value="carOwner" id="carOwner" rule="R0000"></yhm-form-select>
        <yhm-form-upload-image title="上传行车证"  discription="点击图标或拖拽图片上传" :show="isHide" :value="drivingLicense" id="drivingLicense" rule="#"></yhm-form-upload-image>


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
  export default {
    name: 'repairWorkForm',
    mixins: [formmixin],
    data(){
      return {
        id:'',
        category:'',
        categoryList:[],//车辆类型
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
        isAssort:true,
        isHides:true,
        isHide:true,
        jump: ''


      }
    },
    methods: {
      categoryEvent(){
        if(this.category === '0'){
          this.isAssort = false
          this.isHides = false
          this.isHide = true
        }else if( this.category === '1'){
          this.isAssort = false
          this.isHides = false
          this.isHide = false

        }else if( this.category === '2'){
         this.isAssort=true
         this.isHides=true
         this.isHide=true
        }
      },
      carOwnerIDEvent () {
        if(this.assort=== '1'){
        this.$dialog.OpenWindow({
          width: 950,
          height: 604,
          url: '/selectPerson?category=1',
          title: '选择车辆所有人',
          closeCallBack: (data) => {
            if(data){
              this.carOwnerID=data.id
              this.carOwner = data.name
            }
          },
        })
        }else{
          this.$dialog.OpenWindow({
            width: 950,
            height: 604,
            url: '/selectUnit?category=1',
            title: '选择车辆所有人',
            closeCallBack: (data) => {
              if(data) {
                this.carOwnerID = data.id
                this.carOwner = data.name
              }
            },
          })
        }
      },

      selectColour(){
        let name = '89'
        this.$dialog.OpenWindow({
          width: 950,
          height: 603,
          url: '/selectDic?name=' + name,
          title: '选择车辆颜色',
          closeCallBack: (data) => {
            if (data) {
              this.color = data.showName
              this.colorID=data.id
            }
          }
        })
      },
      selectBrand(){
        let name = '90'
        this.$dialog.OpenWindow({
          width: 950,
          height: 603,
          url: '/selectDic?name=' + name,
          title: '选择车辆品牌',
          closeCallBack: (data) => {
            if (data) {
              this.brandID = data.id
              this.brand = data.showName

              this.model = ''
              this.version = ''

            }
          }
        })
      },
      selectModel(){
        if ( this.brand === ''){
          this.$dialog.alert({
            alertImg: 'warn',
            tipValue: '请先选择品牌!',
            closeCallBack: (data)=>{
              if(this.jump === '1'){
                this.selectBrand()
              }
              if(data){
                this.version = ''
                this.selectBrand()
              }
            }
          })
        }else{
          this.$dialog.OpenWindow({
            width: 950,
            height: 603,
            url: '/selectModel?personID=' + this.brandID,
            title: '选择车型',
            closeCallBack: (data) => {
              if (data) {
                this.model = data.showName
                this.modelID=data.id
              }
            }
          })
        }
      },
      selectVersion() {
        if (this.model === '') {
          this.$dialog.alert({
            alertImg: 'warn',
            tipValue: '请先选择车型!',
            closeCallBack: (data)=>{
              this.selectModel()
              this.jump = '1'
            }
          })
        } else {
        this.$dialog.OpenWindow({
          width: 950,
          height: 603,
          url: '/selectVersion?personID=' + this.modelID + '&brandOwnerID=' + this.brandID,
          title: '选择车辆版本',
          closeCallBack: (data) => {
            if (data) {
              this.version = data.showName
              this.versionID = data.id
            }
          }
        })
      }
      },
      //重复验证,基于控件操作的验证
      nameVerifyEvent(){
        this.ajaxJson({
          url:"/Basic/isExistRepairWorkrByName",
          data:{
            id:this.id,
            plate:this.plate
          },
          loading:"0",
          call:(data) =>{
            if(data.type === 0){//说明存在，调用控件验证显示规则
              this.$refs.plate.errorEvent("车牌号重复")
            }
          }
        })
      },
      async isNameVerifyEvent(){
        let result = await this.ajaxAsync({
          url:"/Basic/isExistRepairWorkrByName",
          data:{
            id:this.id,
            plate:this.plate
          },
          loading:"0"
        })
        if(result.type === 0){//说明存在，调用控件验证显示规则
          this.$refs.plate.errorEvent("车牌号重复")
          return false
        }
        return true
      },

      //添加
      async save() {
        let a = await this.isNameVerifyEvent()
        let b = this.validator()
        if (a && b) {
          let params = {
            id: this.id,
            category:this.category,
            assort:this.assort,
            plate:this.plate,
            colorID:this.colorID,
            frameNumber:this.frameNumber,
            engineNumber:this.engineNumber,
            brandID:this.brandID,
            modelID:this.modelID,
            versionID:this.versionID,
            registerDate:this.registerDate,
            carOwnerID:this.carOwnerID,
            drivingLicense:this.drivingLicense,

          }
          this.ajaxJson({
            url: '/Basic/saveRepairWork',
            data: params,
            call: (data) => {
              if (data.type === 0) {
                this.$dialog.setReturnValue(this.id)
                this.$dialog.alert({
                  tipValue: data.message,
                  closeCallBack: () => {
                    this.$dialog.close()
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
      }
    },
    created () {
      this.setQuery2Value('id')
      this.init({
        url: '/Basic/initRepairWorkForm',
        all: (data) => {
          this.categoryList = data.categoryPsd.list
          this.category = data.categoryPsd.value
          this.assortList = data.assortPsd.list
          this.assort = data.assortPsd.value
        },
        add: (data) => {
          /* 需要添加的数据 */
        },
        look: (data) => {
          /* 需要查看的数据 */
          this.categoryList=data.categoryPsd.list
          this.category=data.categoryPsd.value
          this.assortList=data.assortPsd.list
          this.assort=data.assortPsd.value

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

          if(this.category === '0'){
            this.isAssort = false
            this.isHides = false
            this.isHide = true
          }else if( this.category === '1'){
            this.isAssort = false
            this.isHides = false
            this.isHide = false

          }else if( this.category === '2'){
            this.isAssort=true
            this.isHides=true
            this.isHide=true
          }
        }
      })
    }
  }
</script>

<style scoped>

</style>
