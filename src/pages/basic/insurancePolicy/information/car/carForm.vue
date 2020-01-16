<template>
  <div class="f_main">
    <yhm-formbody>
      <template #title>添加信息</template>
      <template #control>

        <yhm-form-text placeholder=""  @repeatverify="nameVerifyEvent" ref="license"  title="车牌号" subtitle="" :value="license" id="license" rule="R8000"></yhm-form-text>
        <yhm-form-text placeholder=""  title="车架号" subtitle="" :value="frame" id="frame" rule="R0000"></yhm-form-text>
        <yhm-form-text placeholder="" title="发动机号" subtitle="" :value="engine" id="engine" rule="R0000"></yhm-form-text>
        <yhm-form-date title="上牌日期" :value="purchaseDate" id="purchaseDate" position="l"  rule="R0000"></yhm-form-date>
        <yhm-form-select title="品牌" tip="value" :value="brand" id="brand" rule="R0000" @click="selectBrand"></yhm-form-select>
        <yhm-form-select title="车型" tip="value" :value="model" id="model" rule="R0000" @click="selectModel"></yhm-form-select>

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
    name: 'carForm',
    mixins: [formmixin],
    data(){
      return{
        id:'',
        license: '',//车辆号
        frame:'',//车架号
        engine:'',//发动机
        purchaseDate:'',//上牌日期
        brand:'',//品牌
        model:'',//车型

        brandID:'',
        modelID:'',
      }
    },
    methods:{
      selectBrand(){
        this.model = ''
        let name = '90'
        this.$dialog.OpenWindow({
          width: 950,
          height: 603,
          url: '/selectDic?name=' + name,
          title: '选择车辆品牌',
          closeCallBack: (data) => {
            if (data) {
              this.brandID=data.id
              this.brand = data.showName

            }
          }
        })
      },
      selectModel(){
        if ( this.brand === ''){
          this.$dialog.alert({
            alertImg: 'warn',
            tipValue: '请选择品牌!',
            closeCallBack: (data)=>{
              this.selectBrand()
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
      //重复验证,基于控件操作的验证
      nameVerifyEvent(){
        this.ajaxJson({
          url:"/Basic/isExistCarByName",
          data:{
            id:this.id,
            license:this.license
          },
          loading:"0",
          call:(data) =>{
            if(data.type === 0){//说明存在，调用控件验证显示规则
              this.$refs.license.errorEvent("车牌号重复")
            }
          }
        })
      },
      async isNameVerifyEvent(){
        let result = await this.ajaxAsync({
          url:"/Basic/isExistCarByName",
          data:{
            id:this.id,
            license:this.license
          },
          loading:"0"
        })
        if(result.type === 0){//说明存在，调用控件验证显示规则
          this.$refs.license.errorEvent("车牌号重复")
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
            license: this.license,
            frame: this.frame,
            engine: this.engine,
            brand: this.brandID,
            model: this.modelID,
            purchaseDate: this.purchaseDate,

          }
          this.ajaxJson({
            url: '/Basic/saveCar',
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
        url: '/Basic/initCarForm',
        all: (data) => {
        },
        add: (data) => {
          /* 需要添加的数据 */
        },
        look: (data) => {

          /* 需要查看的数据 */
          this.license=data.license //车辆号
          this.frame=data.frame     //车架号
          this.engine=data.engine   //发动机
          this.purchaseDate=data.purchaseDate //上牌日期
          this.brand=data.brand     //品牌
          this.brandID=data.brandID
          this.model=data.model     //车型
        }
      })
    }
  }
</script>

<style scoped>

</style>
