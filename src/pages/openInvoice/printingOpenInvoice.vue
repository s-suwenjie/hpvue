<template>
  <div class="f_main mb0">
    <div class="repairPrint">
      <div v-for="(index) in getCount" :key="index" @click="choicePrintEvent(index)" :class="{'selectChoice': isSelectChoice === index}">{{index}}</div>
    </div>

    <yhm-formoperate no-time-tip :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn>
        <yhm-commonbutton value="打印" icon="i-btn-print" :flicker="true" @call="selectPrintEvent" category="one"></yhm-commonbutton>
      </template>
    </yhm-formoperate>

  </div>
</template>

<script>
  import { formmixin } from '@/assets/form.js'
  export default {
    name: 'printingOpenInvoice',
    mixins: [formmixin],
    data() {
      return {
        id:'',
        isSelectChoice: 1,
        count: 15,
        list:[],
      }
    },
    methods: {
      choicePrintEvent(index){
        this.isSelectChoice = index
      },
      selectPrintEvent(){
        let params = {
          list: this.list,
          num: this.isSelectChoice
        }
        this.ajaxJson({
          url: '/dailyoffice/print/invoiceReceipt',
          data: params,
          call: (data) =>{
            if(data.type === 0){
              window.open("UploadFile/"+ data.content)
            }
          }
        })
      },
      information(){
        let params = {
          id: this.id
        }
        this.ajaxJson({
          url: '/Bill/printingOpenInvoice',
          data: params,
          call: (data) =>{
            if(data){
              this.list=data
            }
          }
        })
      },
    },
    computed:{
      getCount(){
        return parseInt(this.count)
      }
    },
    created () {
      this.setQuery2Value('id');
      this.information();
    }
  }
</script>


<style scoped lang="less">
  .repairPrint{
    margin: 0 20px;
    display: flex;
    flex-wrap: wrap;
    background-color: #fff;
    border-radius: 8px;
    div{
      margin: 16px;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      border: 1px solid #bfbfbf;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #333;
      cursor: pointer;
    }
    div:hover{
      border: 1px solid #49a9ea;
      color: #49a9ea;
    }
    div.selectChoice{
      background-color: #49a9ea;
      color: #fff;
      border: 1px solid #1e8fdc;
    }
  }
</style>
