<template>
    <div class="f_main">
      <yhm-formbody>
        <template #title>基本信息<span style="color:red">(可以填写任何一种)</span></template>
        <template #control>
          <yhm-form-text title="剩余本金" no-edit="1" tip="money" :value="money" id="money" before-icon="rmb"></yhm-form-text>
          <yhm-form-text title="本金" tip="money" :value="principal" @change="chongeMoney" id="principal" before-icon="rmb"></yhm-form-text>
          <yhm-form-text title="利息" tip="money" :value="interest" @change="chongeMoney" id="interest" before-icon="rmb"></yhm-form-text>
          <yhm-form-text title="本息和" tip="money" no-edit="1" :value="principalInterest" id="principalInterest" before-icon="rmb"></yhm-form-text>
        </template>
      </yhm-formbody>

      <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
        <template #btn>
          <yhm-commonbutton value="保存" icon="btnSave" @call="save(0)" :flicker="true"></yhm-commonbutton>
<!--          <yhm-commonbutton value="保存并新增" class="btnAddSave" icon="btnAddSave" @call="save(1)"></yhm-commonbutton>-->
        </template>
      </yhm-formoperate>
    </div>
</template>

<script>
  import { accAdd,number2chinese } from '@/assets/common.js'
  import { formmixin } from '@/assets/form.js'
  export default {
    name: 'conductFinRedeemForm',
    mixins: [formmixin],
    data(){
      return{
        ownerID:'',
        money:'',//剩余本金
        principal:'',//本金
        principalState:'0',//本金
        interest:'',//利息
        interestState:'0',//利息
        principalInterest:'',//本息和
        principalInterestState:'0',//本息和
      }
    },
    created(){
      this.setQuery2Value('ownerID')
      this.setQuery2Value('money')
      this.init({
        url: '/Fin/bankProductRedeemByID',
        all: (data) => {

        },
        add: (data) => {

        },
        look: (data) => {
          this.ownerID=data.ownerID
          this.principal=data.principal
          this.principalState=data.principalState
          this.interest=data.interest
          this.interestState=data.interestState
          this.principalInterest=data.principalInterest
          this.principalInterestState=data.principalInterestState
        }
      })
    },
    methods:{
      chongeMoney(){
        if(this.principal!==''){
          if(parseFloat(this.principal)>parseFloat(this.money)){
            this.$dialog.alert({
              tipValue: "输入金额大于剩余本金金额",
              alertImg: 'error',
              closeCallBack: ()=>{
                thie.principal=this.money
                return
              }
            })
          }
        }
        if(this.interest!==''&&this.principal!==''){
          this.principalInterest=accAdd(this.interest,this.principal)
        }
      },
      save(){
        let params = {
          id:this.id,
          ownerID:this.ownerID,
          principal:this.principal,//本金
          principalState:this.principalState,//本金
          interest:this.interest,//利息
          interestState:this.interestState,//利息
          principalInterest:this.principalInterest,//本息和
          principalInterestState:this.principalInterestState,//本息和
        }
        this.ajaxJson({
          url: '/Fin/bankProductRedeemSave',
          data: params,
          call: (data) => {
            if (data.type == 0) {
              this.$dialog.setReturnValue(this.id)
              this.$dialog.alert({
                tipValue: data.message,
                closeCallBack: ()=>{
                  this.$dialog.close()
                }
              })
            }else{
              this.$dialog.alert({
                tipValue: data.message,
                closeCallBack: ()=>{
                }
              })
            }
          }
        })
      },
    },
    watch:{

    }
  }
</script>

<style scoped>

</style>
