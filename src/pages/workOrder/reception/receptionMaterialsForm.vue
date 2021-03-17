<template>
  <div class="f_main">
    <yhm-formbody>
      <template #title>基本信息</template>
      <template #control>
        <yhm-form-select title="材料名称" @click="selectProduct" :value="product" id="product" rule="R0000" ref="pros"></yhm-form-select>
        <yhm-form-select title="规格型号" @click="selectModel" :value="model" id="model" rule="R0000" :no-click="product==''?true:false"></yhm-form-select>
        <yhm-form-text title="单价" :value="price+''" id="price" after-icon="rmb" tip="money" @input="priceChange"></yhm-form-text>
        <yhm-form-text title="金额" :value="money+''" id="money" no-edit="1" after-icon="rmb" tip="money"></yhm-form-text>
        <yhm-form-text title="折扣价" :value="discount+''" id="discount" after-icon="rmb" tip="money"></yhm-form-text>

        <yhm-form-zh-text-two v-show="splitShow" :before="mdo" before-id="mdo" after="个" after-id="mdo" after-width="60" title="拆分数量" after-title="单位"  ></yhm-form-zh-text-two>
        <yhm-form-zh-text-two :before="quantity" @input="priceChange" before-id="quantity" :after="quantityAfter" after-id="quantityAfter" after-width="60" title="整件数量" after-title="单位"  ></yhm-form-zh-text-two>

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
  import { guid } from '@/assets/common'
  export default {
    name: 'receptionMaterialsForm',
    mixins: [formmixin],
    data(){
      return{
        category:'',//cid
        applicableModels:'',//aid
        discount:'0',//折扣价
        price:'0',//单价
        splitShow:false,
        money:'0',//金额
        cost:'0',//成本
        product:'',//商品名称
        productid:'',//商品名称
        model:'',//规格型号
        modelID:'',//规格型号ID
        mdo:'',//拆分数量
        quantity:'1',//整件数量
        quantityAfter:'',//整件单位
      }
    },
    methods:{
      priceChange(){
        this.money = Number(this.price) * Number(this.quantity)
      },
      //选择商品型号
      selectModel(){
        if(this.product!=''){
          this.$dialog.OpenWindow({
            width: 1100,
            height: 603,
            url: '/selectPart?category=1&productid='+this.productid,
            title: '选择材料信息',
            closeCallBack: (data) => {
              if (data) {
                this.productid = data.productID
                this.product = data.product
                this.modelID = data.modelID
                this.model = data.model
                this.cost = data.price//采购单价
                this.price = data.salesprice//销售单价
                this.applicableModels = data.applicableModels
                this.quantityAfter = data.uuStr
                this.quantity = '1'
                if(data.stockType==1){
                  this.splitShow = true
                }else{
                  this.splitShow = false
                }
                this.priceChange()

              }
            }
          })
        }else{
          this.$refs.pros.errorEvent("请先选择材料")
        }
      },
      //选择商品类型
      selectProduct() {
        this.$dialog.OpenWindow({
          width: 1100,
          height: 603,
          url: '/selectPart?category=1',
          title: '选择材料信息',
          closeCallBack: (data) => {
            if (data) {
              this.productid = data.productID
              this.product = data.product
              this.modelID = data.modelID
              this.model = data.model
              this.cost = data.price//采购单价
              this.price = data.salesprice//销售单价
              this.applicableModels = data.applicableModels
              this.quantityAfter = data.uuStr
              this.quantity = '1'
              if(data.stockType==1){
                this.splitShow = true
              }else{
                this.splitShow = false
              }
              this.priceChange()

            }
          }
        })
      },
      save(){
        let params = {
          id:this.id,
          ownerID:this.orderid,
          orderid:this.ownerID,//工单id
          state:'0',
          discount:this.discount==''?'0':this.discount,//折扣价
          category:this.category,//cid
          applicableModels:this.applicableModels,//aid
          product:this.product,//商品名称
          productid:this.productid,//商品名称ID
          cost:this.cost,//成本价
          price:this.price,//单价
          money:this.money,//金额
          model:this.model,//规格型号
          modelID:this.modelID,//规格型号ID
          mdo:this.mdo,//拆分数量
          quantity:this.quantity,//整件数量
        }
        // if(this.offLine=='1'){
          this.$dialog.setReturnValue(params)
          this.$dialog.close()
        // }else{
          // this.ajaxJson({
          //   url: '/fix/fixMaterial/saveAndConfirm',
          //   data: params,
          //   call: (data)=>{
          //     if (data.type === 0) {
          //       this.$dialog.setReturnValue(data) //向父级页面id值
          //       this.$dialog.alert({
          //         tipValue: data.message,
          //         closeCallBack: () => {
          //           this.$dialog.close()
          //         }
          //       })
          //     } else {
          //       this.$dialog.alert({
          //         alertImg: 'error',
          //         tipValue: data.message,
          //         closeCallBack: () => {
          //         }
          //       })
          //     }
          //   }
          // })
        // }

      },
      // initData () {
      //   let params = {
      //     id:this.id,
      //     ownerID:this.ownerID,
      //   }
      //   if(this.offLine!='1'){
      //     this.ajaxJson({
      //       url: '/fix/fixMaterial/initForm',
      //       data: params,
      //       call: (data) => {
      //         if(data){
      //           this.category = data.category//cid
      //           this.applicableModels = data.applicableModels//aid
      //           this.price = data.price//价格
      //           this.product = data.product//商品名称
      //           this.productid = data.productid//商品名称
      //           this.model = data.model//规格型号
      //           this.modelID = data.modelID//规格型号ID
      //           this.mdo = data.mdo//拆分数量
      //           if(data.quantity=='0'){
      //             this.quantity = '1'
      //           }else{
      //             this.quantity = data.quantity//整件数量
      //           }
      //           this.cost  = data.cost//成本价
      //         }
      //       }
      //     })
      //   }
      // }
    },
    created () {
      this.setQuery2Value('id')
      this.setQuery2Value('orderid')
      this.setQuery2Value('ownerID')
      // this.setQuery2Value('offLine')//等于1时是工单跳转进来的
      this.setQuery2Value('cid')
      this.applicableModels = this.cid
      let item = JSON.parse(sessionStorage.receptionMaterials||0)


      this.id = item.id
      this.orderid = item.ownerID
      this.ownerID = item.orderid//工单id
      this.category = item.category//cid
      this.applicableModels = item.applicableModels//aid
      this.discount = item.discount//折扣价
      this.product = item.product//商品名称
      this.productid = item.productid//商品名称ID
      this.cost = item.cost//成本价
      this.price = item.price//单价
      this.money = item.money//金额
      this.model = item.model//规格型号
      this.modelID = item.modelID//规格型号ID
      this.mdo = item.mdo//拆分数量
      this.quantity = item.quantity//整件数量
      // this.initData()
    }
  }
</script>

<style scoped>

</style>
