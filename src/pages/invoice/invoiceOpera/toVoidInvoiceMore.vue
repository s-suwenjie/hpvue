<template>
  <div class="f_main">
    <yhm-formbody>
      <template #title>基本信息</template>
      <template #control>
        <div class="check">
          <div class="check_main" v-for="(item,index) in list" :key="index">{{item.code}}<span @click="delCheck(index)" :class="{'red':deleteTheSwitch}" class="icon delete"></span></div>
          <div class="noTableData" v-if="isEmpty">暂时没有数据</div>
        </div>
      </template>
    </yhm-formbody>
    <div class="f_split"></div>
    <yhm-formbody>
      <template #title>基本信息</template>
      <template #control>
        <yhm-form-date title="作废日期" :max="nowDate" :value="operatorDate" id="operatorDate" tip="value" rule="R0000" position="b"></yhm-form-date>
        <yhm-form-text title="作废数量" :value="operatorNum" id="operatorNum" rule="R0000" no-edit="1"></yhm-form-text>
        <yhm-form-textarea title="作废原因" :value="operatorReason" id="operatorReason" rule="R0000"></yhm-form-textarea>
      </template>
    </yhm-formbody>
    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn>
        <yhm-commonbutton value="保存" icon="btnSave" :flicker="true" @call="save()" category="one"></yhm-commonbutton>
      </template>
    </yhm-formoperate>
  </div>
</template>

<script>
  import { formmixin } from '@/assets/form.js'
  import { formatDate ,accAdd, guid,number2chinese,formatCnDate,accMul} from '@/assets/common.js'
  export default {
    name: 'toVoidInvoiceMore',
    mixins: [formmixin],
    data(){
      return{
        id: '',
        ownerID: '',
        list: [],
        isEmpty: false,
        deleteTheSwitch: true,   //是否允许删除 true为可以删除
        nowDate: formatDate(new Date()),
        operatorDate:'',
        operatorNum:'',
        operatorReason:'',
        codeArr: []
      }
    },
    methods:{
      /* 删除 */
      delCheck(index){
        if(this.deleteTheSwitch === false){//不允许删除并将图标变为红色
        }else {this.$set(this.list.splice(index,1))}
      },
      initData(){
        this.init({
          url: '/Bill/invoiceBatchInvalid',
          all: (data)=>{
          },
          add: (data)=>{

          },
          look: (data)=>{
            this.list = data
          }
        })
      },
      save(){
        if(this.validator()){
          let params = {
            operatorDate: this.operatorDate,
            operatorReason: this.operatorReason,
            key: this.codeArr
          }
          this.ajaxJson({
            url: '/Bill/invoiceInvalid',
            data: params,
            call: (data)=>{
              if(data.type === 0){
                this.$dialog.setReturnValue('123')
                this.$dialog.alert({
                  tipValue: data.message,
                  closeCallBack: ()=>{
                    this.$dialog.close()
                  }
                })
              }else{
                this.$dialog.alert({
                  alertImg: 'error',
                  tipValue: data.message
                })
              }
            }
          })
        }
      }
    },
    created () {
      this.initData()
    },
    watch: {
      list(){
        this.operatorNum = this.list.length + ''
        let codeArr = []
        for(let i = 0;i<this.list.length; i++){
          let key = this.list[i].code
          codeArr += key + '☆'
        }
        if (codeArr.length > 0) {
          codeArr = codeArr.substr(0, codeArr.length - 1);
        }
        this.codeArr = codeArr
      }
    }
  }
</script>

<style scoped>

</style>
