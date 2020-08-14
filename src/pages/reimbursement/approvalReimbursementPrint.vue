<template>
    <div class="f_main">
      <div v-html="contentHtml"></div>
      <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
        <template #btn>
        <yhm-commonbutton value="打印" icon="i-btn-print" :flicker="true" @call="doPrint()" category="one"></yhm-commonbutton>
        <yhm-commonbutton v-show="isSplit" value="分单" icon="i-separate" @call="doSplit()" category="one"></yhm-commonbutton>
        </template>
      </yhm-formoperate>
    </div>
</template>
<script>
  import {formmixin } from '@/assets/form.js'
  export default {
    name: 'approvalReimbursementPrint',
    mixins: [formmixin],
    data (){
      return{
        id: '',
        ownerID: '',
        contentHtml: '',
        printID:'',
        fundID:'',
        ptintItem:'',
        printInvoice:'',
        printInvoiceItem:'',
        isSplit: false,
      }
    },
    methods:{
      doPrint(){
        window.open("/UploadFile/" + this.printID)
        /*添加打印次数 */
        let printLogParams = {
          ownerID: this.fundID,
        }
        this.ajaxJson({
          url:'/PersonOffice/addPrintLog',
          data:printLogParams,
          loading:'0',
          call:(data)=> {
          }
        })
        /* 打印电子发票 */
        let params = {
          id: this.fundID
        }
        this.ajaxJson({
          url: '/PersonOffice/getSingleElectronicInvoice',
          data: params,
          loading:'0',
          call: (data)=>{
            if (data.type === 0 && data.val !== ''){
              this.printInvoice = data.val;
              this.$dialog.confirm({
                width: 300,
                tipValue: '是否打印电子发票?',
                alertImg: 'warn',
                okCallBack: (data)=>{
                  try {
                    this.printInvoiceItem = this.printInvoice.split("|");
                  }catch (e) {}
                  for(var i=0;i<this.printInvoiceItem.length;i++){
                    var a = document.createElement("a");
                    a.download = this.printInvoiceItem[i];
                    a.href = "/UploadFile/ElectronicInvoice/" + this.printInvoiceItem[i];
                    a.click();
                  }
                }
              })
            }
          }
        })

        this.$dialog.setReturnValue("0")
      },
      doSplit(){
        this.$dialog.OpenWindow({
          width: '850',
          height: '650',
          title: '分单',
          url: '/approvalReimbursementSingleSplitForm?ownerID='+this.fundID,
          closeCallBack: (data)=>{
            if(data){
              this.$dialog.setReturnValue("1");
              this.$dialog.close();
            }
          }
        })
      }
    },
    created () {
      this.setQuery2Value('ownerID')
      this.setQuery2Value('fundID')
      let params = {
        id: this.fundID,
        ownerID: this.ownerID
      }
      this.ajaxJson({
        url: '/PersonOffice/getReimbursementSingleByID',
        data: params,
        call: (data)=>{
          this.contentHtml = data.contentHtml
          this.printID = data.printID
          this.isSplit = data.isSplit
        }
      })
    }
  }
</script>

<style scoped>
  @import "../../../static/reimbursementStatic/ReimbursementsPrintForm.css";

</style>
