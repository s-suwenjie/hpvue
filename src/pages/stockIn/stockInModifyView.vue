<template>
  <div class="f_main">
    <yhm-formbody>

      <template #title>修改{{name}}信息</template>

      <template #control>
        <yhm-form-text title="销售单价" :value="salesprice" id="salesprice" @input="gerter()" rule="R0000"></yhm-form-text>
        <yhm-form-text title="销售总价" :value="saletotal" id="saletotal" @focus="gerter()" rule="R0000"></yhm-form-text>

      </template>

    </yhm-formbody>
    <div class="f_split"></div>
    <yhm-view-tab>
      <template #tab>
        <yhm-view-tab-button :list="tabState" :index="0">商品数据</yhm-view-tab-button>
      </template>
      <template #content>
        <yhm-view-tab-list :customize="true" :pager="false" v-show="tabState[0].select">
          <template #listHead>
            <yhm-managerth style="width: 180px" title="商品名称"></yhm-managerth>
            <yhm-managerth style="width: 200px" title="销售价"></yhm-managerth>
            <yhm-managerth style="width: 80px" title="销售总价"></yhm-managerth>
            <yhm-managerth style="width: 80px" title="商品型号"></yhm-managerth>
            <yhm-managerth style="width: 60px" title="数量"></yhm-managerth>
          </template>
          <template #listBody>
            <tr v-for="(item,index) in content" :key="index" :class="{InterlacBg:index%2!==0}">
              <yhm-manager-td :value="item.product+''"></yhm-manager-td>
              <yhm-manager-td :value="item.salesprice+''"></yhm-manager-td>
              <yhm-manager-td-money :value="item.saletotal+''"></yhm-manager-td-money>
              <yhm-manager-td :value="item.model"></yhm-manager-td>
              <yhm-manager-td :value="item.quantity+''"></yhm-manager-td>
            </tr>
          </template>
        </yhm-view-tab-list>
      </template>
    </yhm-view-tab>
    <yhm-formoperate>
      <template #btn>
        <yhm-commonbutton value="保存" icon="btnSave" :flicker="true" @call="save()"></yhm-commonbutton>
      </template>
    </yhm-formoperate>
  </div>
</template>

<script>

  import { formmixin } from '@/assets/form.js'

  export default {
    name: "stockInModifyView",
    mixins: [formmixin],

    data(){
      return{
        price:'',
        content:'',
        salesprice:'',
        saletotal:'',
        tabState:[{select:true}],
        name:'',
        salespriceing:'销售单价为空',
        saletotaling:'销售总价为空',

      }
    },
    created(){
      this.setQuery2Value("id")
      console.log(this.id+'111')
      this.init()
    },
    methods:{
      save(){


        let a = this.validator()
        if(a){
          let params = {
            id:this.id,
            salesprice:this.salesprice,
            saletotal:this.saletotal,
          }


          this.ajaxJson({
            url: '/stock/stockPosition/StockUpdate',
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

      init(){
        this.ajaxJson({
          url: '/stock/stockPosition/queryForProduct',
          data: '',
          call: (data) => {
            this.content=data.content
            for(let i=0;i<data.content.length;i++){
              if(this.id==data.content[i].id){
                this.name=data.content[i].product
              }
            }
            this.content=data.content
            console.log(this.content)
          }
        })


      },
      gerter(){
        if(this.salesprice>this.saletotal){
          this.saletotal=this.salesprice
        }
      },

    }
  }
</script>

<style scoped>

</style>
