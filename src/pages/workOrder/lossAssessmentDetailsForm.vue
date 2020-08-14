<template>
    <div class="f_main">
      <yhm-formbody>
        <template #title>基本信息</template>
        <template #control>
          <yhm-form-text title="项目名称" :value="nameStr" id="nameStr" rule="R0000"></yhm-form-text>
  <!--        <yhm-form-select title="服务名称" @click="selectProduct" @clear="clearProduct" :value="product" id="product" rule="R0000" ref="pros"></yhm-form-select>-->
  <!--        <yhm-form-select title="服务型号" @click="selectModel" @clear="clearWareHouser" :value="model" id="model" rule="R0000"></yhm-form-select>-->
<!--          <yhm-form-date title="日期"  :value="insertDate" id="insertDate" rule="R0000"></yhm-form-date>-->
          <yhm-form-text title="数量" ref="quantity" :value="quantity" id="quantity" rule="R1500"></yhm-form-text>
          <yhm-form-radio title="类型" width="1" :select-list="formTypeList" :value="category" id="category" rule="R0000"></yhm-form-radio>

          <yhm-form-text title="单价"  id="price" :value="price" tip="money" before-icon="rmb" rule="R1500"></yhm-form-text>
          <yhm-form-text title="工时费" tip="money" before-icon="rmb" id="money"  :value="money" rule="R1500"></yhm-form-text>

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
  import {formatDate,guid} from '@/assets/common.js'
  export default {
    name: 'lossAssessmentDetailsForm',
    mixins: [formmixin],
    data(){
      return{
        nameStr:'',//项目名称
        category:'0',//类型
        quantity:'1',//数量
        price:'0',//价格
        money:'0',//金额
        productid:'',
        formTypeList:[],//
        categoryList:{
          list:[
            {
              showName:'管理清单',
              code:'',
              img:'',
              num:'0',
            },
            {
              showName:'辅料清单',
              code:'',
              img:'',
              num:'1',
            },
          ],
          value:'0'
        }
      }
    },
    methods:{
      //选择服务商品
      selectProduct(){
        this.$dialog.OpenWindow({
          width: 950,
          height: 603,
          url: '/selectProduct?cid='+this.cid+'&aid='+this.aid,
          title: '选择商品信息',
          closeCallBack: (data) => {
            if (data) {
              // this.product = data.name
              // this.productid = data.id
            }
          }
        })
      },
      save(){
        let a = this.validator()
        let b = this.quantity>0
        if(b==false){
          this.$refs.quantity.errorEvent('数量不能等于0')
        }
        if(a&&b){
          let params = {
            ownerID:this.ownerID,
            processid:this.flowPathID,
            id: guid(),
            productid:'122',
            nameStr:this.nameStr,//项目名称
            category:this.category,//类型
            quantity:this.quantity,//数量
            price:this.price,//价格
            money:this.money,//金额
            insertDate: formatDate(new Date())
          }
          console.log( params )
          if(a){
            this.ajaxJson({
              url: '/fix/fixedDetail/save',
              data: params,
              call: (data)=>{
                if (data.type === 0) {
                  this.$dialog.setReturnValue(this.id) //向父级页面id值
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
          }
        }


      },
    },
    created () {
      this.setQuery2Value('ownerID')
      this.setQuery2Value('flowPathID')
      this.setQuery2Value('lookOverShow')

      // console.log( this.globalVariable.mainProcessID ,'--------')
      let data = JSON.parse(sessionStorage.lossAssessmentDetailsData||0)
      console.log( data ,data.formTypeList)
      if(this.lookOverShow=='true'){
        this.nameStr = data.nameStr
        this.id = data.id
        this.category = data.category
        this.quantity = data.quantity
        this.price = data.price
        this.money = data.money
        this.formTypeList = data.formTypeList
      }else{
        this.formTypeList = data.formTypeList
      }


      // this.initData()
    }
  }
</script>

<style scoped>

</style>
