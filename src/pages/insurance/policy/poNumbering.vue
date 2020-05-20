<template>
  <div class="f_main">
    <yhm-formbody>
      <template #control>
        <yhm-form-text v-if="isB" title="商业险" subtitle="保单号" @repeatverify="nameVerifyEvent" ref="businessNumber" tip="value" :value="businessNumber" id="businessNumber" rule="R0000"></yhm-form-text>
        <yhm-form-text v-if="isP" title="交强险" subtitle="保单号" @repeatverify="numberVerifyEvent" ref="payHighNumber"  tip="value" :value="payHighNumber" id="payHighNumber" rule="R0000"></yhm-form-text>
        <yhm-form-text v-if="isNumber" :icon-shou="true" color="#666666" @call="seNumber" title="查看" subtitle="重复保单号" value="" id="person"  no-edit="1"></yhm-form-text>
        <yhm-form-text v-if="isPayNumber" :icon-shou="true" color="#666666" @call="seNumber" title="查看" subtitle="重复保单号" value="" id="person"  no-edit="1"></yhm-form-text>
        <yhm-formupload :ownerID="id" :value="fileList"  id="fileList" title="保单(支持单据)" tag="poNumber" multiple="multiple" rule="#"></yhm-formupload>
      </template>
    </yhm-formbody>
    <div class="f_split"></div>
    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn >
        <yhm-commonbutton value="保存" icon="btnSave"  :flicker="true" @call="save()"></yhm-commonbutton>
      </template>
    </yhm-formoperate>
  </div>
</template>

<script>
  import { formmixin } from '@/assets/form.js'
  import { accMul, accAdd, guid, formatDate, number2chinese,formatTime} from '@/assets/common.js'
  export default {
    name: 'poNumbering',
    mixins: [formmixin],
    data(){
      return{
        id:'',
        ownerID:'',
        businessNumber:'',
        payHighNumber:'',
        fileList: [],
        isNumber:false,
        isPayNumber:false,
        poNumberID:'',
        project:'',
        isB:false,
        isP:false,
      }
    },
    methods:{
      seNumber(){
        let title = '查看保单信息'
        let url = '/poNumberView?id='+this.poNumberID

        this.$dialog.OpenWindow({
          width: '1050',
          height: '550',
          url: url,
          title: title,
          closeCallBack: (data) => {
            if (data) {
              this.initPageData(false)
            }
          }
        })
      },
      //重复验证,基于控件操作的验证
      nameVerifyEvent(){
        this.ajaxJson({
          url:"/Insurance/isExistByNumber",
          data:{
            id:this.id,
            businessNumber:this.businessNumber
          },
          loading:"0",
          call:(data) =>{
            if(data.type === 0){//说明存在，调用控件验证显示规则
              this.$refs.businessNumber.errorEvent("保单号重复")
              this.isNumber=true
              this.poNumberID=data.id
            }else if (data.type===1){
              this.isNumber=false
            }
          }
        })
      },
      async isNameVerifyEvent(){
        let result = await this.ajaxAsync({
          url:"/Insurance/isExistByNumber",
          data:{
            id:this.id,
            businessNumber:this.businessNumber
          },
          loading:"0"
        })
        if(result.type === 0){//说明存在，调用控件验证显示规则
          this.$refs.businessNumber.errorEvent("保单号重复")
          return false
        }
        return true
      },
      numberVerifyEvent(){
        this.ajaxJson({
          url:"/Insurance/isExistPayNumber",
          data:{
            id:this.id,
            payHighNumber:this.payHighNumber
          },
          loading:"0",
          call:(data) =>{
            if(data.type === 0){//说明存在，调用控件验证显示规则
              this.$refs.payHighNumber.errorEvent("保单号重复")
              this.isPayNumber=true
              this.poNumberID=data.id
            }else if (data.type===1){
              this.isPayNumber=false
            }
          }
        })
      },
      async isNumberVerifyEvent(){
        let result = await this.ajaxAsync({
          url:"/Insurance/isExistPayNumber",
          data:{
            id:this.id,
            payHighNumber:this.payHighNumber
          },
          loading:"0"
        })
        if(result.type === 0){//说明存在，调用控件验证显示规则
          this.$refs.payHighNumber.errorEvent("保单号重复")
          return false
        }
        return true
      },
      async  save () {
        let a = await this.isNameVerifyEvent()
        let b = this.validator()
        let c = await this.isNumberVerifyEvent()
        if (a && b && c){
          let params = {
            id: this.id,
            ownerID: this.ownerID,
            businessNumber:this.businessNumber,
            payHighNumber:this.payHighNumber,
            files:this.fileList
          }
          this.ajaxJson({
            url: '/Insurance/policySaveNumbering',
            data: params,
            loading: '0',
            call: (data) => {
              if (data.type === 0) {
                this.$dialog.setReturnValue(this.id) //向父级页面id值
                this.$dialog.alert({
                  tipValue: data.message,
                  closeCallBack: (data) => {
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
    created () {
      this.setQuery2Value('ownerID')
      this.setQuery2Value('project')
      console.log( this.project)
      this.init({
        url: '/Insurance/initformPoNumbering',
        all: (data) => {
        },
        add: (data) => {
          /* 需要添加的数据 */
          var str = this.project;
          var reg = RegExp(/2/);
          if(str.match(reg)){
            this.isB=true
          }
          var reg2 = RegExp(/0/);
          if(str.match(reg2)){
            this.isP=true
          }

        },
        look: (data) => {
          /* 需要查看的数据 */
          this.ownerID=data.ownerID
          this.businessNumber=data.businessNumber
          this.payHighNumber=data.payHighNumber
          this.fileList = data.files
        }
      })
    },
  }
</script>

<style scoped>

</style>
