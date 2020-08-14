<template>
  <div class="m_list m_list_m" style="width:950px;">
    <yhm-commonbutton value="去报销" icon="btnAdd i-btn-go" @call="gotoReimburse()"></yhm-commonbutton>

    <table width="100%" cellpadding="0" cellspacing="0" class="m_table">
      <thead>
      <tr>
        <yhm-managerth style="width: 80px;" title="所属单位"></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="发票代码"></yhm-managerth>
        <yhm-managerth style="width: 80px;" title="发票号码"></yhm-managerth>
        <yhm-managerth style="width: 110px;" title="开票日期"></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="发票金额"></yhm-managerth>
        <yhm-managerth title="开票单位"></yhm-managerth>
        <yhm-managerth style="width: 90px;" title="发票图片"></yhm-managerth>
        <yhm-managerth style="width: 50px;" title="不报销"></yhm-managerth>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item,index) in content" :key="index" :class="[{InterlacBg:index%2!=0}]">
        <yhm-manager-td :value="item.selfName"></yhm-manager-td>
        <yhm-manager-td-center :value="item.code"></yhm-manager-td-center>
        <yhm-manager-td-center :value="item.num"></yhm-manager-td-center>
        <yhm-manager-td-date :value="item.openDate"></yhm-manager-td-date>
        <yhm-manager-td-money :value="item.totalMoney"></yhm-manager-td-money>
        <yhm-manager-td :value="item.otherName"></yhm-manager-td>
        <yhm-manager-td-image :tip="true" width="800" height="500" left="30" top="30" :value="item.imgUrl" tag="ElectronicInvoice"></yhm-manager-td-image>
        <yhm-form-td-delete width="50" :list="content" :value="item"></yhm-form-td-delete>
      </tr>
      </tbody>
    </table>
    <span class="m_listNoData" v-show="content.length === 0">暂时没有数据</span>
  </div>
</template>

<script>
  export default {
    provide(){
      return{
        p____page:this
      }
    },
    name: 'myElectronicInvoiceReimburseManager',
    data(){
      return{
        content:[]
      }
    },
    methods:{
      gotoReimburse(){
        if(this.content.length === 0){
          this.$dialog.alert({
            tipValue:'没有可用发票，不能去报销！！！',
            width:'380',
            alertImg:'warn'
          })
        }
        else{
          var arr = []
          for(var i = 0; i < this.content.length; i++){
            arr.push(this.content[i].id)
          }
          this.$dialog.setReturnValue(arr)
          this.$dialog.close()
        }
      }
    },
    created () {
      this.ajaxJson({
        url:"/Fin/getElectronicInvoiceNeedReimbursement",
        call:(data) => {
          this.content = data
        }
      })
    }
  }
</script>
