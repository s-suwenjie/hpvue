<template>
  <div class="f_main">
    <div v-for="(item,index) in detailList" :key="index">
      <yhm-formbody >

        <template #title>添加库位</template>
          <template #control>
            <yhm-view-control title="商品名称" :content="item.product"></yhm-view-control>
            <yhm-view-control title="规格型号" :content="item.model+''"></yhm-view-control>
            <yhm-view-control title="供货商" :content="item.supplier"></yhm-view-control>
            <yhm-view-control title="数量" :content="(item.quantity+item.unit)+''"></yhm-view-control>
            <yhm-view-control title="拆分入库" :content="(item.mdo+item.splitunit)+'/'+item.unit" v-if="item.mdo != 0  "></yhm-view-control>
            <div class="v_br"></div>
            <yhm-view-control title="价格" :content="item.price+''" type="money" color="blue"></yhm-view-control>
            <yhm-view-control title="总价" :content="item.totalPrice+''" type="money" color="#FF0000"></yhm-view-control>
            <div class="v_br"></div>
            <yhm-view-control title="含税单价" :content="item.priceTax+''" type="money" color="blue"></yhm-view-control>
            <yhm-view-control title="含税总价" :content="item.totalPriceTax+''" type="money" color="#FF0000"></yhm-view-control>
            <yhm-form-zh-select-more @click="selectDeparment(item,index)" :total="item.quantity" input-before-icon="" title="库位" :value="item.list" :id="getListID(index)" rule="#" rule-item="R3000">
            </yhm-form-zh-select-more>
          </template>
      </yhm-formbody>
      <div class="f_split"></div>
    </div>
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
    name: "stockinLocationFrom",
    mixins: [formmixin],
    data(){
      return{
        detailList:'',
        list:[],
        quantity:[],
        arr:[],
        createName:'',
        insertDate:'',
        updateName:'',
        updateDate:'',
        shows:false,
        cid:'',
      }
    },
    created(){
      this.setQuery2Value('type')
      this.setQuery2Value('ownerID')
      this.inits()
    },
    computed:{
      getListID(){
        return function (index) {
          return "detailList[" + index + "].list"
        }
      }
    },
    methods:{
      //console
      //选择库位
      selectDeparment(item,index){
        this.$dialog.OpenWindow({
          url:"/selectLocation?level=2&open=1&category=" +this.cid+ "&selectType=1",//可多选库位----------
          width:"850",
          height:"600",
          title: "选择库位",
          closeCallBack: (data) => {
            if(data){
              for(let n in data){
                // this.stockPositionId = data.id
                var sign = true
                for(var i = 0; i< item.list.length; i++){
                  if(item.list[i].selectID === data[n].id){
                    sign = false
                    break
                  }
                }
                if(sign) {
                  let insertDate = new Date(accAdd(new Date().getTime(), accMul(item.list.length, 1000)))
                  // let ids=this.id
                  let itm = {
                    id: guid(),
                    insertDate: formatTime(insertDate),
                    ownerID: item.id,
                    selectID: data[n].id,
                    selectValue: data[n].name,
                    value: ''
                  }
                  if (item.list.length > 0) {
                    item.list[item.list.length - 1].value = ''
                  }
                  item.list.push(itm)
                }
                else{
                  var width = 300
                  width = accAdd(width, accMul(15,data[n].name.length))
                  this.$dialog.alert({
                    tipValue:'库位<b class="red">（' + data[n].name + '）</b>已存在！！！',
                    alertImg:'warn',
                    width:width
                  })
                }
              }
            }
          }
        })
      },
      //保存
      save(){
        let a = this.validator()
        if(a){
          let params = {
            id:this.id,
            detailList:this.detailList,
            state:'2',
          }
          this.ajaxJson({
            url: '/stock/stockIn/updateForState',
            data: params,
            call: (data) => {
              if (data.type === 0) {
                this.$dialog.setReturnValue(this.id)
                this.$dialog.alert({
                  alertImg: 'ok',
                  tipValue: data.message,
                  closeCallBack: () => {
                    this.$dialog.close()
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
        }
      },
      //进入时请求
      inits(){
        let parmas={
          id:this.id,
        }
        this.ajaxJson({
          url: '/stock/stockIn/initFormDetail',
          data: parmas,
          call: (data) => {
            this.detailList=data.detailList
            this.cid=data.category
            this.updateName=data.updateName
            this.createName=data.createName
            if(data.insertDate){
              this.insertDate=data.insertDate
              this.updateDate=data.updateDate
            }else{
              this.insertDate='当前时间'
              this.updateDate='当前时间'
            }
          }
        })


      }

    },
  }
</script>

<style scoped>

</style>
