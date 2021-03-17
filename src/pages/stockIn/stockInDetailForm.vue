<template>
  <div class="f_main">
    <yhm-formbody>
      <template #title>基本信息</template>
      <template #control>
        <yhm-form-select title="商品名称" @click="selectProduct" @clear="clearProduct" :value="product" id="product" rule="R0000" ref="pros"></yhm-form-select>
        <yhm-form-select title="规格型号" @click="selectModel" @clear="clearWareHouser" :value="model" id="model" rule="R0000"></yhm-form-select>
        <yhm-form-select title="供货商" @click="selectSupplierId" @clear="clearWareHouser" :value="supplier" id="supplier" rule="R0000"></yhm-form-select>
        <yhm-form-zh-text-two ref="name" @input="toprice" @repeatverify="toprice" before-placeholder="" after-placeholder="" :before="quantity+''" before-id="quantity" :after="unit" after-id="unit" after-width="60" title="数量" after-title="单位" before-rule="R0000" >
        </yhm-form-zh-text-two>
        <yhm-form-radio title="是否" subtitle="拆分入库" @call="splitClick" :select-list="splitList" :value="split+''" id="split" v-show="show == 0" :no-edit="true"></yhm-form-radio>
        <yhm-form-zh-text-two @blur="toprice" @repeatverify="toprice" before-placeholder="" after-placeholder="" :before="splitQuantity" before-id="splitQuantity" :after="splitunit" after-id="splitunit" after-width="60" title="拆分数量" after-title="单位" before-rule="R0000" v-if="shows == 0" >
        </yhm-form-zh-text-two>
        <yhm-form-text title="税率" after-icon="icon-percentage" id="taxPrice" :value="taxPrice+''" max-number="30" @input="toprice"></yhm-form-text>
        <yhm-form-text title="含税单价"  id="priceTax"  before-icon="rmb" :value="priceTax+'' " @input="toprice"></yhm-form-text>

        <yhm-form-text title="不含税单价" :value="price+''"  before-icon="rmb" id="price"  @input="toprice" no-edit="1" rule="R0000"></yhm-form-text>
        <yhm-form-text title="含税总价" id="totalPriceTax"  before-icon="rmb" :value="totalPriceTax+''"  no-edit="1"></yhm-form-text>
        <yhm-form-text title="不含税总价" tip="money" before-icon="rmb" id="totalPrice"  :value="totalPrice+''" no-edit="1"></yhm-form-text>

        <!--        <yhm-form-zh-select-more  @click="selectDeparment" :total="quantity+''" input-before-icon=" " title="库位" :value="list" id="list" rule="#" rule-item="R3000"></yhm-form-zh-select-more>-->

      </template>
    </yhm-formbody>
<!--    <yhm-formbody>-->
<!--      <template #control>-->
<!--        <div>-->
<!--          <yhm-form-text title="含税单价"  id="priceTax" :value="priceTax+'' "></yhm-form-text>-->

<!--        </div>-->
<!--      </template>-->
<!--    </yhm-formbody>-->
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
    name: 'stockInDetailForm',
    mixins: [formmixin],
    data(){
      return{
        taxPrice:'13',//税点
        unit:'',
        applicableModels:'',
        prices:'',//
        quantity:'',//商品总数量
        price:'',//不含税单价
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
        splitList:[],//是否拆分
        splitunit:'',
        split:'',
        splitQuantity:'',
        show:'5',
        shows:'5',
        cid:'',
        aid:'',
      }
    },
    methods:{
      //选择供货商
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
            }
          }
        })
      },
      // //确定商品总价
      // calculationTotalPrice(type){
      //   //不含税总价
      //   this.totalPrice = this.price * this.quantity
      //   //含税总价
      //   // this.totalPriceTax = (Number(this.price)*Number(1+this.taxPrice/100)*Number(this.quantity)).toFixed(2)
      //   // this.priceTax = (Number(this.price)*Number(1+this.taxPrice/100)).toFixed(2)
      // },
      //确定单价明细
      toprice(){
        this.price = (Number(this.priceTax)-Number(this.priceTax*(this.taxPrice/100))).toFixed(2)
        this.totalPrice = Number(this.price) * Number(this.quantity).toFixed(2)
        this.totalPriceTax = (Number(this.priceTax)*Number(this.quantity)).toFixed(2)
      },
      selectProduct(){
        this.$dialog.OpenWindow({
          width: 950,
          height: 603,
          url: '/selectProduct?cid='+this.cid+'&aid='+this.aid,
          title: '选择商品信息',
          closeCallBack: (data) => {
            if (data) {
              this.product = data.name
              this.productID = data.id
              this.quantity = '1'
              this.unit= data.unit
              this.model=''
              this.supplier=''
              if(data.split == 0){
                this.show=0
                this.shows=0
                this.split='0'
                this.splitunit=data.splitDeliveryUnit
              }else{
                this.show=1
                this.shows=1
                this.split='0'
                this.splitunit=''
              }
            }
          }
        })
      },
      //选择商品型号
      selectModel(){
        if(this.product!=''){
          this.$dialog.OpenWindow({
            width: 950,
            height: 603,
            url: '/selectProductModel?ownerID='+this.productID,
            title: '选择商品规格型号信息',
            closeCallBack: (data) => {
              if (data) {
                this.modelID = data.id
                this.model = data.name
                this.supplier = data.modelSupplier//供货商名称
                this.supplierId = data.modelSupplierID//供货商ID
                // this.price = (Number(data.price)).toFixed(2)
                // this.price = (Number(this.priceTax)-Number(this.priceTax*(this.taxPrice/100))).toFixed(2)
                this.priceTax = data.price
                this.toprice()
              }
            }
          })
        }else{
          this.$refs.pros.errorEvent("商品名称为空")
        }

      },
      clearWareHouser(){
        this.productID = ""
      },
      clearProduct(){

      },
      //选择库位
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
      save(){
        this.toprice()
        let a = this.validator()
        if(a){
          let params = {
            id:this.id,
            ownerID:this.ownerID,//入库单ID
            product:this.product,//商品名称
            productID:this.productID,//商品ID
            model:this.model,//型号名称
            modelID:this.modelID,//型号ID
            quantity:this.quantity,//商品总数量
            unit:this.unit,//总数量的拆分单位
            price:this.price,//不含税单价
            totalPrice:this.totalPrice,//不含税总价
            priceTax:this.priceTax,//含税单价
            totalPriceTax:this.totalPriceTax,//含税总价
            supplierId:this.supplierId,//单位
            // list:this.list,
            show:this.show,//是否拆分
            mdo:this.splitQuantity,//拆分数量
            mdoStr:this.splitunit,//拆分数量总单位
          }
          // this.ajaxJson({
          //   url: '/stock/stockInDetail/save',
          //   data: params,
          //   call: (data) => {
          //     if (data.type === 0) {
                this.$dialog.setReturnValue({'params':params})
                this.$dialog.close()
          //       this.$dialog.alert({
          //         tipValue: data.message,
          //         closeCallBack: () => {
          //         }
          //       })
          //     }else{
          //       this.$dialog.alert({
          //         alertImg:'warn',
          //         tipValue: data.message
          //       })
          //     }
          //   }
          // })
        }
      },
      splitClick(){
          if (this.split==0){
            this.shows=0
          }else{
            this.shows=1
            this.splitQuantity=''//--------------
          }
      },
      form(){
        this.ajaxJson({
          url: '/stock/stockInDetail/initForm',
          call: (data) => {
            this.splitList=data.splitPsd.list
            this.split=data.splitPsd.value
          }
        })
      },
    },
    created () {
      this.setQuery2Value('type')
      this.setQuery2Value('ownerID')
      this.setQuery2Value('cid')
      this.setQuery2Value('aid')
      this.form()
      if(this.type=='1'){
        return
      }else{}
      let params = {
        id:this.id
      }
      this.ajaxJson({
        url: '/stock/stockInDetail/initForm',
        data: params,
        call: (data) => {
          this.product = data.product
          this.supplier = data.supplier
          this.model = data.model
          this.price = data.price
          this.priceTax = data.priceTax
          this.quantity = data.quantity
          this.totalPrice = data.totalPrice
          this.totalPriceTax = data.totalPriceTax
          this.modelID = data.modelID
          this.productID = data.productID
          this.supplierId = data.supplierId
          this.list = data.list
          this.show = data.split
          this.shows = data.split
          this.splitQuantity = data.mdo+''
          this.splitunit=data.splitunit
          this.unit=data.unitStr
          if(data.split == 0)[
            this.split=0
          ]
        }
      })

    }
  }
</script>
<style scoped>
</style>
