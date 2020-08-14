<template>
  <div class="f_main">
    <div v-for="(item,index) in detailList" :key="index">
      <yhm-formbody >

        <template #title>出库信息</template>
        <template #control>
          <yhm-view-control title="商品名称" :content="item.product"></yhm-view-control>
          <yhm-view-control title="规格型号" :content="item.model"></yhm-view-control>
<!--          <yhm-view-control title="价格" :content="item.price+''" type="money" color="#FF0000"></yhm-view-control>-->
<!--          <yhm-view-control title="总价" :content="item.totalPrice+''" type="money" color="#FF0000"></yhm-view-control>-->
          <div class="v_br"></div>
<!--          <div style="display: flex;justify-content: space-between">-->
          <div style="width: 100%; display: flex;justify-content: space-between" v-for="(it,index) in item.list" :key="index">
            <yhm-view-control title="库位" :content="it.stockPosition" style="width: 50%; " color="blue"></yhm-view-control>
            <yhm-view-control title="数量" :content="(it.quantitySum+item.spilt)" style="width: 50%;"></yhm-view-control>
          </div>
<!--          </div>-->

        </template>
      </yhm-formbody>
      <div class="f_split"></div>
    </div>
    <yhm-formoperate  :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn>
        <yhm-commonbutton value="提交" icon="btnSave" :flicker="true" @call="save()"></yhm-commonbutton>
      </template>
    </yhm-formoperate>
  </div>
</template>

<script>
  import { formmixin } from '@/assets/form.js'
  import { accMul, accAdd, guid, formatDate,formatTime } from '@/assets/common.js'
  export default {
    name: "stockOutOperateForm",
    mixins: [formmixin],
    data(){
      return{
        id:'',
        detailList:'',
        createName:sessionStorage.getItem('____currentUser'),
        updateName:sessionStorage.getItem('____currentUser'),
        insertDate:'',
        updateDate:'',
      }
    },
    created() {
      this.init()
    },
    //console
    methods:{
      init(){
        let params={
          id:this.id,
        }
        this.ajaxJson({
          url:'/stock/stockoutroll/queryForSum',
          data:{
            ownerid:this.id
          },
          call: (data) => {
            this.detailList=data
            for (let i in data){
              for(let ic in data[i].list){
                if(data[i].list[ic].quantitySum=='0'){
                  this.detailList[i].list[ic].quantitySum=data[i].list[ic].mdoSum
                  this.detailList[i].spilt=data[i].mdoStr
                }
              }
            }
            if(data.insertDate){
              this.insertDate=data.insertDate
              this.updateDate=data.updateDate
            }else{
              this.insertDate='当前时间'
              this.updateDate='当前时间'
            }

          }
        })
      },
      save(){
        let params = {
          id:this.id,
          state:'1',
        }
        this.ajaxJson({
          url:'/stock/stockout/updateToStockout',
          data:params,
          call: (data) => {
            if (data.type === 0) {
              this.$dialog.setReturnValue(this.id)
              this.$dialog.alert({
                alertImg: 'ok',
                tipValue: data.message,
                closeCallBack: () => {
                  this.$dialog.close()
                  // this.initData()

                }
              })
            } else {
              this.$dialog.alert({
                alertImg: 'warn',
                tipValue: data.message
              })
            }
          }
        })
      },
    },
  }
</script>

<style scoped>

</style>
