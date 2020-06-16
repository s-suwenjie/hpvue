<template>
  <div>
    <yhm-formbody>
      <template #title>基本信息</template>
      <template #control>
        <yhm-form-select title="商品名称" @click="selectProduct" @clear="clearProduct" :value="product" id="product" rule="R0000"></yhm-form-select>
        <yhm-form-select title="规格型号" @click="selectModel" @clear="clearWareHouser" :value="model" id="model" rule="R0000"></yhm-form-select>
        <yhm-form-select title="供货商" @click="selectSupplierId" @clear="clearWareHouser" :value="supplier" id="supplier" rule="R0000"></yhm-form-select>


        <yhm-form-zh-text-two ref="name" @blur="calculationTotalPrice" @repeatverify="calculationTotalPrice" before-placeholder="" after-placeholder="" :before="quantity" before-id="quantity" :after="unit" after-width="20" after-id="prefixLetter" title="数量" after-title="单位" before-rule="R0000" >
        </yhm-form-zh-text-two>

<!--        <yhm-form-text title="数量" max-length="8" :value="quantity" id="quantity" @input="calculationTotalPrice" rule="R0000">-->
<!--          <div class="Company"><span>单位:</span>{{unit}}</div>-->
<!--        </yhm-form-text>-->

        <yhm-form-text title="价格" :value="price" id="price"  @input="calculationTotalPrice" rule="R0000"></yhm-form-text>
        <yhm-form-text title="总价" tip="money" before-icon="rmb" id="totalPrice"  :value="totalPrice" no-edit="1"></yhm-form-text>
        <yhm-form-text title="含税单价"  id="priceTax" :value="priceTax"></yhm-form-text>
        <yhm-form-text title="含税总价" id="totalPriceTax"  before-icon="rmb" :value="totalPriceTax"></yhm-form-text>
        <yhm-form-zh-select-more  @click="selectDeparment" :total="quantity" input-before-icon=" " title="库位" :value="list" id="list" rule="#" rule-item="R3000"></yhm-form-zh-select-more>

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
  import { accMul, accAdd, guid, formatDate,formatTime } from '@/assets/common.js'

  export default {
    name: "stockOutDetailsForm",
    mixins: [formmixin],
    data(){
      return{
          applicableModels:'',
          prices:'',//
          quantity:'',//商品总数量
          price:'0',//不含税单价
          totalPrice:'',//不含税总价
          priceTax:'',//含税单价
          ownerID:'',//入库单id
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
      }
    },
    created() {



    },
    methods:{
      //添加商品名称
      selectProduct(){
        this.$dialog.OpenWindow({
          width: 950,
          height: 603,
          url: '/selectProduct',
          title: '选择商品信息',
          closeCallBack: (data) => {
            this.unit=data.unit
            console.log(data)
            if (data) {
              this.product = data.name
              this.productID = data.id
              this.quantity = '1'

            }
          }
        })
      },
      //选择供货商-----------
      selectSupplierId(){
        this.$dialog.OpenWindow({
          width: '950',
          height: '700',
          url: '/selectUnit?category=1&categoryBefore=1',
          title: '选择供货商',
          closeCallBack: (data) => {
            if (data) {
              this.supplier = data.name
              this.supplierId = data.id
              // console.log(data)
            }
          }
        })
      },
      //规格型号----------
      selectModel(){
        this.$dialog.OpenWindow({
          width: 950,
          height: 603,
          url: '/selectProductModel?ownerID='+this.productID,
          title: '选择商品规格型号信息',
          closeCallBack: (data) => {
            if (data) {
              this.modelID = data.id
              this.model = data.name
              this.price = data.price.split(".")[0]
              this.priceTax = this.price
              this.calculationTotalPrice()
              console.log(data)
            }
          }
        })
      },
      //库位选择---------------
      selectDeparment(){
        this.$dialog.OpenWindow({
          url:"/selectLocation?level=2&open=1",
          width:"850",
          height:"600",
          title: "选择库位",
          closeCallBack: (data) => {
            if(data){
              this.stockPositionId = data.id
              var sign = true
              for(var i = 0; i< this.list.length; i++){
                if(this.list[i].selectID === data.id){
                  sign = false
                  break
                }
              }
              if(sign) {
                let insertDate = new Date(accAdd(new Date().getTime(), accMul(this.list.length, 1000)))

                let item = {
                  id: guid(),
                  insertDate: formatTime(insertDate),
                  ownerID: this.id,
                  selectID: data.id,
                  selectValue: data.name,
                  value: ''
                }
                if (this.list.length > 0) {
                  this.list[this.list.length - 1].value = ''
                }
                this.list.push(item)
              }
              else{
                var width = 300
                width = accAdd(width, accMul(15,data.name.length))
                this.$dialog.alert({
                  tipValue:'库位<b class="red">（' + data.name + '）</b>已存在！！！',
                  alertImg:'warn',
                  width:width
                })
              }
            }
          }
        })
      },
      //清除信息
      clearProduct(){

      },
      clearWareHouser(){

      },
      prefixLetterRule(){},

      //
      calculationTotalPrice(){
        this.totalPrice = (this.price * this.quantity).toString()
        this.totalPriceTax = this.totalPrice
        console.log(this.quantity+'111');
        console.log(this.price);
        console.log(this.totalPrice);
      },

    },
  }
</script>

<style scoped>

</style>
