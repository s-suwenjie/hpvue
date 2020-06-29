<template>
  <div>
    <yhm-formbody>
      <template #title>基本信息</template>
      <template #control>
        <yhm-form-select title="商品名称" @click="selectProduct" @clear="clearProduct" :value="product+''" id="product" rule="R0000" ref="selct"></yhm-form-select>
        <yhm-form-select title="规格型号" @click="selectModel" @clear="clearWareHouser" :value="model+''" id="model" rule="R0000" @focus="select"></yhm-form-select>

        <yhm-form-zh-text-two ref="name" @repeatverify="calculationTotalPrice" before-placeholder="" after-placeholder="" :before="quantitys+''" before-id="quantitys" :after="unit" after-width="20" after-id="unit" title="库存数量" after-title="单位" before-rule="R0000" :no-edit="true">
        </yhm-form-zh-text-two>
        <yhm-form-text title="最低价格" before-icon="rmb" :value="prices+''" id="price"  @input="calculationTotalPrice" rule="R0000" no-edit="1"></yhm-form-text>
        <yhm-form-zh-text-two ref="name" @blur="calculationTotalPrice" @input="calculationTotalPrice" @repeatverify="calculationTotalPrice" before-placeholder="" after-placeholder="" :before="quantity+''" before-id="quantity" :after="unit" after-width="20" after-id="unit" title="数量" after-title="单位" before-rule="R0000" >
        </yhm-form-zh-text-two>

        <yhm-form-text title="销售价格" :value="price+''" id="price" before-icon="rmb" @input="pricess" @blur="calculationTotalPrice" rule="R0000"></yhm-form-text>
        <yhm-form-text title="销售总价" tip="money" before-icon="rmb" id="totalPrice"  :value="totalPrice+''" no-edit="1"></yhm-form-text>

      </template>
    </yhm-formbody>
    <yhm-formoperate :createName="createName" :updateName="updateName">
      <template #btn>
        <yhm-commonbutton value="保存" icon="btnSave" :flicker="true" @call="save()"></yhm-commonbutton>
      </template>
    </yhm-formoperate>
  </div>
</template>

<script>
  import { formmixin } from '@/assets/form.js'
  import { accMul, accAdd, guid, formatDate,formatTime } from '@/assets/common.js'

  export default {
    name: "stockOutDetailsForm",
    mixins: [formmixin],
    data(){
      return{
        prices:'',//
        quantity:'',//商品总数量
        quantitys:'',
        price:'0',//不含税单价
        totalPrice:'',//不含税总价
        priceTax:'',//含税单价
        ownerID:'',//出库库单id
        totalPriceTax:'',//含税总价
        state:'',
        list:[],      //库位选择
        detail: [], // 列表数据
        actualMoney:'',
        id:'',
        productID:'',//商品id
        product:'',//商品名称
        modelID:'',//规格id
        model:'',//规格信息
        supplier:'',//单位名称
        supplierId:'',//单位id
        unit:'',
        applicableModels:'',//商品类型
        category:'',//适用车型
        ownerid:'',
        createName:sessionStorage.getItem('____currentUser'),
        updateName:sessionStorage.getItem('____currentUser'),
        data:''
      }
    },
    created() {
      this.setQuery2Value("applicableModels")
      this.setQuery2Value("category")
      this.setQuery2Value("productID")
      this.setQuery2Value("modelID")
      this.setQuery2Value("ownerid")
      if(this.ownerid==''){
        this.form()
      }
      // this.init()

    },
    methods:{
      //添加商品名称
      //console
      selectProduct(){
        this.$dialog.OpenWindow({
          width: 950,
          height: 603,
          url: '/stockOutSelectProductView?applicableModels='+this.applicableModels+'&category='+this.category,
          title: '选择商品信息',
          closeCallBack: (data) => {
            if (data) {
              this.product = data.product
              this.productID = data.productID
              this.model=''
              this.quantitys=''
              this.quantity=''
              this.prices=''
              this.price=''
              this.totalPrice=''
              this.unit=''
            }
          }
        })
      },
      //选择供货商-----------
      select(){

      },
      //规格型号----------
      selectModel(){
        if(this.product != '') {
          this.$dialog.OpenWindow({
            width: 950,
            height: 603,
            url: '/stockOutselectModelview?applicableModels=' + this.applicableModels + '&category=' + this.category + '&productID=' + this.productID,
            title: '选择商品规格型号信息',
            closeCallBack: (data) => {
              if (data) {
                this.modelID = data.modelID
                this.model = data.model
                this.price = data.price
                this.prices=data.salesprice
                this.priceTax = this.price
                this.quantity = data.sumStr
                this.quantitys = data.sumStr
                this.unit =data.mdoStr
                if(this.unit==''){
                  // this.unit='无'
                  this.unit=data.uuStr
                }
                this.calculationTotalPrice()
                if(Number(data.sumStr)== 0){
                  this.quantity = data.quantity
                  this.quantitys = data.quantity
                }
              this.totalPrice=this.quantity*this.price
              }
            }
          })
        } else{
          this.$refs.selct.errorEvent("商品名称为空")
        }
      },
      //清除信息
      clearProduct(){},
      clearWareHouser(){},
      prefixLetterRule(){},
      //
      calculationTotalPrice(){
        if (Number(this.quantity) > Number(this.quantitys)){
          this.quantity = this.quantitys
        }
        if (Number(this.price) < Number(this.prices)){
          this.price = this.prices
        }
        this.totalPrice = (this.price * this.quantity).toString()
        this.totalPriceTax = this.totalPrice

      },
      pricess(){
        this.totalPrice = (this.price * this.quantity).toString()
        this.totalPriceTax = this.totalPrice
      },
      save(){
        this.calculationTotalPrice()
        let a = this.validator()
        let n;
        if(this.ownerid==''){
          n=this.id
        }else{
          n=guid()
        }
        if(a){
          let params = {
            id:n,
            productid:this.productID,
            product:this.product,
            modelid:this.modelID,
            quantity:this.quantity,
            price:this.price,
            totalPrice:this.totalPrice,
            ownerid:this.ownerid,
          }
          this.ajaxJson({
            url: '/stock/stockoutdetail/save',
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
              }else{
                this.$dialog.alert({
                  alertImg:'warn',
                  tipValue: data.message
                })
              }
            }
          })
        }
      },
      form(){
        let params={
          id:this.id,
        }
        this.ajaxJson({
          url:'/stock/stockoutdetail/initForm',
          data:params,
          call:(data)=>{
            this.initss()
            this.product=data.product
            // this.productID=data.productid
            this.model=data.model
            // this.modelID=data.modelid
            // this.quantity=data.sumStr
            this.quantitys=data.sumStr
            this.price=data.price
            this.prices=data.price
            this.totalPrice=data.totalPrice
            if(data.spilt == '0'){
              this.quantity=data.quantity
              // this.quantitys=data.quantity
              this.unit=data.uuStr
            }else{
              this.quantity=data.quantity
              // this.quantitys=data.quantity
              this.unit=data.spiltStr
            }
            if(this.unit == 'null'){
              this.unit='无'
            }
          }

        })

      },
      // -----这段很重要----勿删-----
      initss(){
        this.ajaxJson({
          url: '/stock/stock/queryForList',
          data:{
            category:this.category,
            applicableModels:this.applicableModels,
            productID:this.productID,
            modelid:this.modelID,
          },
          call: (data) => {
            this.quantitys=data.content[0].sumStr
            if(data.content[0].spilt == '0'){
              this.quantitys=data.content[0].sumStr
            }else{
              this.quantitys=data.content[0].quantity
            }
          }
        })
      },
    },
  }
</script>

<style scoped>

</style>
