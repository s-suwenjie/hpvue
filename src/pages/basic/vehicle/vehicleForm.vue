<template>
  <div class="f_main">
    <yhm-formbody>
      <template #title>添加信息</template>
      <template #control>
        <yhm-form-radio title="车辆分类" :select-list="categoryList" :value="category" id="category" @call="categoryEvent"></yhm-form-radio>
        <yhm-form-radio title="车辆类型" :select-list="vehicleTypeList" :value="vehicleType" id="vehicleType" @call="vehicleTypeEvent"></yhm-form-radio>
        <yhm-form-date title="上牌日期" v-if="isHide"  :value="registerDate" id="registerDate " position="t"  ></yhm-form-date>
        <yhm-form-radio  title="所属类型" v-if="isAssort" :select-list="assortList" :value="assort" id="assort"></yhm-form-radio>

        <yhm-form-text is-upper-case placeholder=""   @repeatverify="nameVerifyEvent" @call="iconCall"  ref="plate" title="车牌号" subtitle="" :show="isHide" :value="plate" id="plate" :rule="isPlate" @blur="plateValue(index),plateShow==false">
            <div style="padding-top: 10px; margin-left: -2px; ">
                <span style="font-size: 27px;"  class="i-uniE9A1 icon_look" @click="spshow()" v-show="FormShow"></span>
            </div>
        </yhm-form-text>

        <yhm-form-select title="车辆颜色"   tip="value" :value="color" id="color"  @click="selectColour"></yhm-form-select>

        <yhm-form-text placeholder=""  :no-edit="isFrameNumber" title="车架号" subtitle="" :value="frameNumber" id="frameNumber"></yhm-form-text>
        <yhm-form-text placeholder="" title="发动机号" subtitle="" :value="engineNumber" id="engineNumber" ></yhm-form-text>
        <yhm-form-select title="品牌" tip="value" :value="brand" id="brand"  @click="selectBrand"></yhm-form-select>
        <yhm-form-select title="车型" @clear="clearModelEvent" tip="value" :value="model" id="model"  @click="selectModel"></yhm-form-select>
        <yhm-form-select title="车辆版本" @clear="clearVersionEvent" tip="value" :value="version" id="version"  @click="selectVersion"></yhm-form-select>
        <yhm-form-text placeholder=""  title="汽车排量" subtitle="" :show="isDisplacement" :value="displacement" id="displacement" :rule="isYhmSelect"></yhm-form-text>

        <yhm-form-select  title="车主信息" tip="value" @click="carOwnerIDEvent" :show="isHides"  :value="carOwner" id="carOwner" :rule="isYhmSelect"></yhm-form-select>
        <yhm-formupload :ownerID="id" :value="fileList"  id="fileList" title="行车证(支持单据)" tag="vehicle" multiple="multiple" category="3" ></yhm-formupload>
        <appLicencePlate class="guessSelector" v-show="PShow" :key="index" :plate-show="plateShow" v-model="carNum" @btnClick="btnClick"  @input="selectArr"></appLicencePlate>
<!--    <yhm-form-upload-image title="上传行车证" tag="drivingLicense" discription="点击图标或拖拽图片上传(不支持PDF格式)" :show="isHide" :value="drivingLicense" id="drivingLicense" ></yhm-form-upload-image>-->
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
  import appLicencePlate from '../../../pagesApp/common/appLicencePlate'
  import { accMul, accAdd, guid, formatDate,formatTime } from '@/assets/common.js'
  import { formmixin } from '@/assets/form.js'


  export default {
    name: 'vehicleForm',
    mixins: [formmixin],
    components: {
      appLicencePlate,
    },
    data(){
      return {
        id:'',
        category:'',
        index:'',
        key:0,
        guessSelectorShow:false,
        plateShow:true,
        carNum:true,
        categoryList:[],//车辆分类
        vehicleType:'',
        vehicleTypeList:[], //车辆类型
        displacement:'',   //排量
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
        isDisplacement:true,
        idNo: '',
        registrationNumber:'',
        fileList:[],
        FormShow: true,
        PShow:false,
        isPlate:'R8000',
        isYhmSelect:'R0000', // 客户过来
        urlType:'',//1保险理赔  自费维修 过来
        isFrameNumber:'',
      }
    },
    methods: {
      clearVersionEvent(){
        this.versionID=''
      },
      clearModelEvent(){
        this.modelID = ''
      },
      iconCall(){
        this.guessSelectorShow=false
        if(this.guessSelectorShow==false){
          this.guessSelectorShow=true
          this.key++
        }
      },
      btnClick(){
        this.$refs.plate.verifications()
      },
     selectArr(value){
        if(value==undefined){return}
        if(typeof value=='object'){
          console.log(this.plate,value,value.join(''))
          this.plate = value.join('')
        }else{
          this.list[this.index].plate = value
        }
      },
      phoneValue(index){
        this.index = index
        this.$nextTick(()=>{
          this.list[index].phone = this.$refs.plate[index].value
        })
      },
      plateValue(index){
        this.index = index
        this.nameVerifyEvent()//调用验证
      },
      vehicleTypeEvent(){
        if (this.vehicleType ==='1' ){
          this.isDisplacement=false
        }else{
          this.isDisplacement=true
        }
      },
      categoryEvent(){
        if(this.category === '0'){
          this.isAssort = false
          this.isHides = false
          this.isHide = true
          this.assort = '1'
        }else if( this.category === '1'){
          this.isAssort = false
          this.isHides = false
          this.isHide = false
          this.assort = '1'
        }else if( this.category === '2'){
         this.isAssort=true
         this.isHides=true
         this.isHide=true
          this.assort = '1'
        } else if (this.category === '3'){
          this.isPlate=''
        }
      },
      carOwnerIDEvent () {
        if(this.assort=== '1'){
        this.$dialog.OpenWindow({
          width: 950,
          height: 692,
          url: '/selectPerson?category=1&commonClientUse=1',
          title: '选择车辆所有人',
          closeCallBack: (data) => {
            if(data){
              this.carOwnerID=data.id
              this.carOwner = data.name
              this.idNo = data.idNo
              if(this.idNo === ''){
                this.updataSelectPerson(data.id)
              }
            }
          },
        })
        }else{
          this.$dialog.OpenWindow({
            width: 950,
            height: 692,
            url: '/selectUnit?category=1',
            title: '选择车辆所有人',
            closeCallBack: (data) => {
              if(data) {
                this.carOwnerID = data.id
                this.carOwner = data.name
                this.registrationNumber=data.registrationNumber
                if (this.registrationNumber===''){
                  this.updataselectUnit(data.id)
                }

              }
            },
          })
        }
      },

      updataSelectPerson(id){
        this.$dialog.OpenWindow({
          width: 1050,
          height: 692,
          url: '/addPersonForm?id=' + id,
          title: '选择联系人',
          closeCallBack: (data) => {
            if (data) {

            }else{
              this.carOwnerID = ''
              this.carOwner = ''
            }
          }
        })
      },
      updataselectUnit(id){
        this.$dialog.OpenWindow({
          width: 1050,
          height: 692,
          url: '/addUnitForm?id=' + id,
          title: '选择单位信息',
          closeCallBack: (data) => {
            if (data) {

            }else {
              this.carOwnerID = ''
              this.carOwner = ''
            }
          }
          })
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
                this.selectBrand()
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
            url: '/selectDic?name=91&value12=' + this.brandID,
            title: '选择车型',
            closeCallBack: (data) => {
              if (data) {
                this.model = data.showName
                this.modelID=data.id
                this.displacement=data.value11
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
            }
          })
        } else {
        this.$dialog.OpenWindow({
          width: 950,
          height: 603,
          url: '/selectDic?name=92&value12=' + this.modelID + '&brandOwnerID=' + this.brandID,
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
          url:"/Basic/isExistVehicleByName",
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
          url:"/Basic/isExistVehicleByName",
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
            vehicleType:this.vehicleType,
            displacement:this.displacement,
            assort:this.assort,
            plate:this.plate,
            colorID:this.colorID,
            frameNumber:this.frameNumber,
            engineNumber:this.engineNumber,
            brandID:this.brandID,
            modelID:this.modelID,
            versionID:this.versionID,
            registerDate:this.registerDate,
            carOwner:this.carOwner,
            carOwnerID:this.carOwnerID,
            drivingLicense:this.drivingLicense,
            files:this.fileList,


          }
          this.ajaxJson({
            url: '/Basic/saveVehicle',
            data: params,
            call: (data) => {
              if (data.type === 0) {
                if(this.urlType === '1'){
                  this.$dialog.setReturnValue(this.model+'◇'+this.modelID+'◇'+this.brand+'◇'+this.brandID+'◇'+this.carOwnerID+'◇'+this.carOwner)
                  this.$dialog.alert({
                    tipValue: data.message,
                    closeCallBack: () => {
                      this.$dialog.close()
                    }
                  })
                }else{
                  this.$dialog.setReturnValue(this.id)
                  this.$dialog.alert({
                    tipValue: data.message,
                    closeCallBack: () => {
                      this.$dialog.close()
                    }
                  })
                }
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
      spshow(){
        this.PShow=true
        this.index++
      },
      selectArr(value){
        this.plate = value.join('')
      },
    },
    created () {
      this.setQuery2Value('id')
      this.setQuery2Value('searchStr')//用户选择车辆页面 搜索的内容
      this.setQuery2Value('urlType')
      this.setQuery2Value('isReule')
      if(this.searchStr!=''){
        this.plate = this.searchStr
      }
      if (this.isReule==1){
        this.isYhmSelect=''
      }else {
        this.isYhmSelect='R0000'
      }
      this.init({
        url: '/Basic/initVehicleForm',
        all: (data) => {
          this.categoryList = data.categoryPsd.list
          this.category = data.categoryPsd.value
          this.vehicleTypeList=data.vehicleTypePsd.list
          this.vehicleType=data.vehicleTypePsd.value
          this.assortList = data.assortPsd.list
          this.assort = data.assortPsd.value
        },
        add: (data) => {
          /* 需要添加的数据 */
          this.registerDate=formatDate( new Date((new Date()).getTime()))
        },
        look: (data) => {
          /* 需要查看的数据 */
          this.plate=data.plate
          this.displacement=data.displacement
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
          if(data.frameNumber==''){
            this.isFrameNumber=''
          }else{
            this.isFrameNumber='1'
          }

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
          if (this.vehicleType ==='1' ){
            this.isDisplacement=false
          }else{
            this.isDisplacement=true
          }
        }
      })
    }
  }
</script>

<style lang="less" scoped>
  .list_look::before{
    float: right;
    margin-right: 10px;
    font-size: 18px;
    margin-top: 10px;

  }


  .plateTest{
    font-size: 14px;
    display: flex;
    align-items: center;
    color: #666666;
    padding:0 12px;
  }
.plateInput{
  text-indent: 8px;
  width: 378px;
  height: 38px;
  line-height: 38px;
  font-size: 14px;
  border-radius: 5px;
  border: 1px solid #ccc;
  overflow: hidden;
  color: #333333;
  white-space: nowrap;
}
.guessSelector{
  display: flex;
  align-items: center;
  margin-left: 20px;
  margin-top: 0;
  height: 40px;
  align-items: center;
}
  .flex{
    display: flex;
    width: 100%;
    padding: 0 35px 15px 20px;
    margin: 0 auto;
    justify-content: space-between;

    align-items: center;
  }
  .icon_look{
    font-size: 20px;
    color: #49a9ea;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    position: absolute;


  }
</style>
