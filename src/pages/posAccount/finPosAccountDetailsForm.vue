<template>
  <div class="f_main">

    <div class="f_split"></div>

    <yhm-form-list-edit area-width="600">
      <template #title>内部互转</template>
      <template #operate>

      </template>
      <template #listHead >
        <yhm-managerth style="width: 10px;" title="总金额"></yhm-managerth>
        <yhm-managerth style="width: 10px;" title="到账金额(<=总金额)"></yhm-managerth>
        <yhm-managerth style="width: 10px;" title="所选条数"></yhm-managerth>
      </template>
      <template #listBody >
        <tr v-for="(item,index) in listProfit" :key="index" :class="{InterlacBg:index%2!==0}" >
          <yhm-manager-td-center  :value="item.money"></yhm-manager-td-center>
          <yhm-form-td-textbox width="170"  before-icon="rmb" :list="listProfit" listid="listProfit" :value="item" id="posFee" ></yhm-form-td-textbox>
          <yhm-manager-td-center  :value="item.posCount"></yhm-manager-td-center>

        </tr>
      </template>
    </yhm-form-list-edit>

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
    name: 'finPosAccountDetailsForm',
    mixins: [formmixin],
    data(){
      return{
        bankDetailID:'',
      }
    },
    methods:{
      save(){
          if (this.listProfit[0].posFee !=''){
            if ( parseFloat(this.listProfit[0].posFee)<=parseFloat(this.listProfit[0].money)){
              let params = {
                id: this.bankDetailID,
                posBankFee:this.posBankFee,
                money:this.listProfit[0].posFee,
                bankDetailsID: sessionStorage.checklist
              }
              console.log( params)
              this.ajaxJson({
                url: '/Fin/posExpenditure',
                data: params,
                call: (data) => {
                  if (data.type === 0) {
                    this.$dialog.setReturnValue(this.id)
                    this.$dialog.alert({
                      tipValue: data.message,
                      closeCallBack: () => {
                        sessionStorage.removeItem('checklist')
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
            }else{
              this.$dialog.alert({
                alertImg:'warn',
                tipValue:'到账金额必须小于或等于总金额',
                width:350
              })
            }
          }else{
            this.$dialog.alert({
              alertImg:'warn',
              tipValue:'到账金额不能为空',
              width:350
            })
          }
      },
    },
    created(){
      this.setQuery2Value('money')
      this.setQuery2Value('bankDetailID')
      this.setQuery2Value('posCount')
      this.setQuery2Value('posBankFee')
      // let arr1 = sessionStorage.checklist.split(',');
      // console.log( arr1 )
      let arr=[]
      arr.push({
        'posCount':this.posCount,
        'money':this.money,
        'posFee':'',
      })

      this.listProfit=arr
    },
  }
</script>

<style scoped>

</style>
