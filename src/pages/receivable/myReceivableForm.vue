<template>
  <div class="f_main">
    <yhm-formbody>
      <template #title>基本信息</template>
      <template #control>
        <yhm-form-text title="责任人" :value="person" id="person" no-edit="1"></yhm-form-text>
        <div class="fc_split"></div>
        <yhm-form-radio title="欠款方类型" @call="selectName" :select-list="receivableTypeList" :value="receivableType" id="receivableType"></yhm-form-radio>
        <yhm-form-select title="欠款方" @click="selectName" :value="name" id="name" rule="R0000"></yhm-form-select>
        <yhm-form-select title="发票号" @click="selectInvoice" :value="invoiceCode" id="invoiceCode" rule="R0000"></yhm-form-select>
        <yhm-form-date title="预计" subtitle="收款日期" :value="lastDate" id="lastDate" :min="workDate" rule="R0000"></yhm-form-date>
        <yhm-form-text title="欠款金额" tip="money" before-icon="rmb" :value="money" id="money" no-edit="1"></yhm-form-text>
        <yhm-form-date title="欠款日期" :no-edit="true" :value="workDate" id="workDate"></yhm-form-date>
      </template>
    </yhm-formbody>

    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn>
        <yhm-commonbutton value="保存" icon="btnSave" :flicker="true" @call="save(0)"></yhm-commonbutton>
      </template>
    </yhm-formoperate>
  </div>
</template>

<script>
  import { accMul, accAdd, guid, formatDate, number2chinese,formatTime} from '@/assets/common.js'
  import { formmixin } from '@/assets/form.js'
  export default {
    name: 'myPurchaseForm',
    mixins: [formmixin],
    data(){
      return{
        id:'',
        receivableType:'',        //欠款方类型
        receivableTypeList:[],
        nameID:'',        //欠款方ID
        name:'',          //欠款方
        invoiceID:'',     //发票ID
        invoiceCode:'',     //发票号
        money:'',           //欠款金额
        workDate:'',        //欠款发生日期（发票开具日期）
        lastDate:'',        //收款日期
        personID:'',        //责任人ID
        person:'',          //责任人

        state:'0',
      }
    },
    methods:{
      //选择欠款方
      selectName(){
        var url = '/selectUnit?ownerSys=1&ownerSysBefore=1&category=1&categoryBefore=1'
        var title = '选择单位信息'
        if (this.receivableType === '1'){
          url = '/selectPerson?category=1&categoryBefore=1'
          title = '选择联系人信息'
        }
        this.$dialog.OpenWindow({
          width: 950,
          height: 692,
          title:title,
          url:url,
          closeCallBack: (data) => {
            if (data) {
              this.nameID = data.id
              this.name = data.name
            }
          }
        })
      },
      /* 选择发票 */
      selectInvoice(){
        this.$dialog.OpenWindow({
          width: 950,
          height: 692,
          title:'选择发票信息',
          url:'',// /selectInvoiceDetail
          closeCallBack: (data) => {
            this.invoiceCode='发票发票'
            this.invoiceID = '123122123'
            this.money='105.21'
            this.workDate='2012-12-12'
            if (data) {
            }
          }
        })
      },
      //保存
      save(){
        if(this.validator()){
          let params = {
            id:this.id,
            receivableType:this.receivableType,
            nameID:this.nameID,
            invoiceID:this.invoiceID,
            invoiceCode:this.invoiceCode,
            categoryPurchase:this.categoryPurchase,
            money:this.money,
            workDate:this.workDate,
            lastDate:this.lastDate,
            personID:this.personID,
            state:this.state,
          }
          this.ajaxJson({
            url: '/Bill/saveReceivable',
            data: params,
            call: (data) => {
              if (data.type == 0) {
                this.$dialog.setReturnValue(this.id)
                this.$dialog.alert({
                  tipValue: data.message,
                  closeCallBack: () => {
                    this.$dialog.close();
                  }
                })
              }
            }
          })
        }
      }
    },
    created () {
      this.init({
        url: '/Bill/initReceivableForm',
        all: (data) => {
          //添加查看的时候都需要的代码
          this.receivableType = data.receivableTypePsd.value
          this.receivableTypeList = data.receivableTypePsd.list
        },
        add: (data) => {
          //添加时独有的代码
          //初始化分组成员信息
          this.personID = data.personID
          this.person = data.person
        },
        look: (data) => {
          //查看时独有的信息
          this.id = data.id,
          this.receivableType = data.receivableType,
          this.nameID = data.nameID,
          this.name = data.name,
          this.invoiceID = data.invoiceID,
          this.invoiceCode = data.invoiceCode,
          this.money = data.money,
          this.workDate = data.workDate,
          this.lastDate = data.lastDate,
          this.personID = data.personID,
          this.person = data.person,
          this.state = data.state
        }
      })
    }
  }
</script>

<style scoped>

</style>
