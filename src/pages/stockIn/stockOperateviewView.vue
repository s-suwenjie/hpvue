<template>
  <div class="f_main">
    <yhm-formbody>
      <template #title>基本信息</template>
      <template #control>
        <yhm-view-control title="商品名称" :content="product"></yhm-view-control>
        <yhm-view-control title="规格型号" :content="model"></yhm-view-control>
        <yhm-view-control title="供货商" :content="supplier"></yhm-view-control>
        <yhm-view-control title="数量" :content="quantity+'/'+content.unitStr"></yhm-view-control>
        <yhm-view-control title="是否拆分" :content="split"></yhm-view-control>
        <yhm-view-control title="拆分数量" :content="content.mdo+content.splitunit+'/'+content.unitStr" v-if="show"></yhm-view-control>
        <div class="v_br"></div>
        <yhm-view-control title="单价" type="money" :content="price"></yhm-view-control>
        <yhm-view-control title="总价" type="money" :content="totalPrice"></yhm-view-control>
        <div class="v_br"></div>
        <yhm-view-control title="含税单价" type="money" :content="priceTax"></yhm-view-control>
        <yhm-view-control title="含税总价" type="money" :content="totalPriceTax"></yhm-view-control>
      </template>
    </yhm-formbody>

  </div>
</template>

<script>
  import { formmixin } from '@/assets/form.js'
  export default {
    name: "stockOperateviewView",
    mixins: [formmixin],
    data(){
      return{
        id:'',
        content:'',
        show:false,
        product:'',
        model:'',
        supplier:'',
        quantity:'',
        split:'',
        price:'',
        totalPrice:'',
        priceTax:'',
        totalPriceTax:'',

      }
    },
    created(){
      this.init()
    },
    methods:{
      init(){
        let params = {
          id:this.id,
        }
        this.ajaxJson({
          url:'/stock/stockInDetail/initForm',
          data:params,
          call: (data) => {
            // 不管是不是初始化都需要执行的代码
            console.log(data)
            this.content=data
            this.product=data.product
            this.model=data.model
            this.supplier=data.supplier
            this.quantity=data.quantity
            this.price=data.price
            this.totalPrice=data.totalPrice
            this.priceTax=data.priceTax
            this.totalPriceTax=data.totalPriceTax
            this.splits(data)
          },
        })
      },
      splits(data){
        if(data.split == '0'){
          this.split='是'
          this.show=true
        }else{
          this.split='否'
          this.show=false
        }
      },
    }

  }
</script>

<style scoped>

</style>
