<template>
  <div class="f_main">
    <yhm-formbody>
      <template #title>基本信息</template>
      <template #control>
        <!--          <yhm-form-text title="项目名称" :value="name" id="name"></yhm-form-text>-->
        <yhm-form-select title="商品名称" @click="selectProduct" :value="product" id="product" rule="R0000" ref="pros"></yhm-form-select>
        <yhm-form-select title="规格型号" @click="selectModel" :value="model" id="model" rule="R0000"></yhm-form-select>
        <yhm-form-text title="单价" :value="price" id="price" after-icon="rmb" tip="money"></yhm-form-text>
        <yhm-form-text title="成本" :value="cost" id="cost" after-icon="rmb" tip="money"></yhm-form-text>
        <yhm-form-zh-text-two v-show="splitShow" :before="mdo" before-id="mdo" after="个" after-id="mdo" after-width="60" title="拆分数量" after-title="单位"  ></yhm-form-zh-text-two>
        <yhm-form-zh-text-two :before="quantity" before-id="quantity" after="组" after-id="quantity" after-width="60" title="整件数量" after-title="单位"  ></yhm-form-zh-text-two>

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
    name: 'workOrderMateriaListForm',
    mixins: [formmixin],
    data(){
      return{
        category:'',//cid
        applicableModels:'',//aid
        price:'',//单价
        splitShow:false,
        cost:'0',//成本
        product:'',//商品名称
        productid:'',//商品名称
        model:'',//规格型号
        modelID:'',//规格型号ID
        mdo:'',//拆分数量
        quantity:'',//整件数量
      }
    },
    methods:{

      //选择商品型号
      selectModel(){
        if(this.product!=''){
          this.$dialog.OpenWindow({
            width: 950,
            height: 603,
            url: '/selectProductModel?ownerID='+this.productid,
            title: '选择商品规格型号信息',
            closeCallBack: (data) => {
              if (data) {
                this.modelID = data.id
                this.model = data.name
                this.price = data.price
                this.quantity = '1'
                console.log( data,'222' )
              }
            }
          })
        }else{
          this.$refs.pros.errorEvent("请先选择商品")
        }
      },
      //选择商品类型
      selectProduct() {
        this.$dialog.OpenWindow({
          width: 950,
          height: 603,
          url: '/selectProduct?storageType=1',
          title: '选择商品信息',
          closeCallBack: (data) => {
            if (data) {
              this.productid = data.id
              this.product = data.name
              this.applicableModels = data.stockType

              if(data.stockType==1){
                this.splitShow = true
              }else{
                this.splitShow = false
              }
              console.log( data,'11' )

            }
          }
        })
      },
      save(){
        let params = {
          id:this.id,
          ownerID:this.orderid,
          category:this.category,//cid
          applicableModels:this.applicableModels,//aid
          product:this.product,//商品名称
          productid:this.productid,//商品名称ID
          cost:this.cost,//成本价
          price:this.price,//单价
          model:this.model,//规格型号
          modelID:this.modelID,//规格型号ID
          mdo:this.mdo,//拆分数量
          quantity:this.quantity,//整件数量
        }
        this.ajaxJson({
          url: '/fix/fixMaterial/save',
          data: params,
          call: (data)=>{
            if (data.type === 0) {
              this.$dialog.setReturnValue(data) //向父级页面id值
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
      },
      initData () {
        let params = {
          id:this.id,
          ownerID:this.ownerID,
        }
        this.ajaxJson({
          url: '/fix/fixMaterial/initForm',
          data: params,
          call: (data) => {
            if(data){
              this.category = data.category//cid
              this.applicableModels = data.applicableModels//aid
              this.price = data.price//价格
              this.product = data.product//商品名称
              this.productid = data.productid//商品名称
              this.model = data.model//规格型号
              this.modelID = data.modelID//规格型号ID
              this.mdo = data.mdo//拆分数量
              this.quantity = data.quantity//整件数量
              this.cost  = data.cost//成本价
            }
          }
        })
      }
    },
    created () {
      this.setQuery2Value('id')
      this.setQuery2Value('orderid')
      this.setQuery2Value('ownerID')
      this.setQuery2Value('cid')
      this.applicableModels = this.cid
      this.initData()
    }
  }
</script>

<style scoped>

</style>
