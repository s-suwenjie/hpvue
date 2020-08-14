<template>
  <div class="f_main">
    <yhm-formbody>

      <template #title>修改{{name}}信息</template>

      <template #control>
        <yhm-form-text title="销售单价" :value="salesprice+''" id="salesprice" @input="gerter()" @blur="gener()" rule="R0000"></yhm-form-text>
        <yhm-form-text title="领料单价" :value="saletotal+''" id="saletotal" @blur="gener()" rule="R0000"></yhm-form-text>

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
            <yhm-managerth title="商品名称"></yhm-managerth>
            <yhm-managerth style="width: 80px" title="商品型号"></yhm-managerth>
            <yhm-managerth title="参考售价"></yhm-managerth>
<!--            <yhm-managerth title="销售总价"></yhm-managerth>-->
            <yhm-managerth title="采购单价"></yhm-managerth>
            <yhm-managerth title="采购总价"></yhm-managerth>
            <yhm-managerth style="width: 60px" title="数量"></yhm-managerth>
            <yhm-managerth style="width: 60px" title="能否拆分"></yhm-managerth>
          </template>
          <template #listBody>
            <tr v-for="(item,index) in content" :key="index" :class="{InterlacBg:index%2!==0}">
              <yhm-manager-td :value="item.product+''"></yhm-manager-td>
              <yhm-manager-td :value="item.model"></yhm-manager-td>
              <yhm-manager-td-money :value="item.salesprice+''"></yhm-manager-td-money>
<!--              <yhm-manager-td-money :value="item.saletotal+''"></yhm-manager-td-money>-->
              <yhm-manager-td-money :value="item.price"></yhm-manager-td-money>
              <yhm-manager-td-money :value="item.total"></yhm-manager-td-money>
              <yhm-manager-td-rgt :value="item.quantity+''"></yhm-manager-td-rgt>
              <yhm-manager-td-center :value="item.spilt+''"></yhm-manager-td-center>
            </tr>
          </template>
        </yhm-view-tab-list>
      </template>
    </yhm-view-tab>
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
        createName:'',
        insertDate:'',
        updateName:'',
        updateDate:'',
      }
    },
    created(){
      //console
      this.setQuery2Value("id")
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
          data:{postid:this.id},
          call: (data) => {
            this.updateName=data.updateName
            this.createName=data.createName
            if(data.insertDate){
              this.insertDate=data.insertDate
              this.updateDate=data.updateDate
            }else{
              this.insertDate='当前时间'
              this.updateDate='当前时间'
            }
            if(data){
              this.content=data.content
              for (let i in this.content) {
                if(this.content[i].spilt == 0 ){
                  this.content[i].spilt ='是'
                }else{
                  this.content[i].spilt ='否'
                }
              }
            }
            this.salesprice = this.content[0].salesprice
            this.saletotal = this.content[0].price
          }
        })
      },
      gerter(){
        this.saletotal=this.salesprice*this.content[0].quantity

      },
      gener(){
        let n =0
        if(Number(this.salesprice)<Number(this.content[0].price)) {
          this.salesprice=this.content[0].price
          this.saletotal=this.salesprice*this.content[0].quantity
          n=this.saletotal=this.salesprice*this.content[0].quantity
          if (Number(this.salesprice) > n) {
          this.saletotal=this.salesprice*this.content[0].quantity
          }
        }else{
          n=this.saletotal=this.salesprice*this.content[0].quantity
          if (Number(this.salesprice) > n) {
            this.saletotal=this.salesprice*this.content[0].quantity
          }
        }
      }

    }
  }
</script>

<style scoped>

</style>
