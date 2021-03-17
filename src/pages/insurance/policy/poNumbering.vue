<template>
  <div class="f_main">
    <yhm-formbody>
      <template #control>
        <yhm-form-text v-if="isB" title="商业险" subtitle="保单号" @input="inputChange(businessNumber,payHighNumber)" @repeatverify="nameVerifyEvent" ref="businessNumber" tip="value" :value="businessNumber" id="businessNumber" rule="R0000">
          <div v-if="isDisplay" class="formBoxIcon" @click="businessClick">
            <svg t="1597310976453" class="icon synchronize" style="cursor: pointer;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1224" width="32" height="32"><path d="M775.779 418.172l-2.051 0c-15.159 0-27.6 4.355-39.583 11.771-10.486-30.584-37.159-52.615-71.513-52.615-15.16 0-29.638 4.354-41.62 11.77-10.487-30.583-37.172-52.615-71.527-52.615-13.399 0-25.85 3.357-36.873 9.255l0-78.691c0-42.861-32.418-77.606-75.59-77.606-43.173 0-78.17 34.745-78.17 77.606l0 301.282-47.49-47.295c-30.528-30.306-84.558-25.992-110.55 0s-43.038 78.308-5.818 115.528l218.306 216.875c4.504 4.471 9.455 8.2 14.663 11.353 39.803 32.47 85.412 51.692 181.857 51.692 220.324 0 240.728-118.865 240.728-265.492L850.548 495.777C850.547 452.917 818.952 418.172 775.779 418.172zM809.403 650.988c0 124.069-0.593 224.647-199.585 224.647-84.298 0-134.907-18.796-173.246-56.858L229.904 613.455c-18.285-18.285-13.687-41.664 1.282-56.633 14.968-14.968 42.441-15.486 56.902-1.131 0 0 36.259 36.045 67.498 67.1 23.641 23.502 44.408 44.145 44.408 44.145l0-391.72c0-20.302 16.578-36.76 37.028-36.76 20.449 0 34.448 16.459 34.448 36.76l0 249.154 0.415 0c-0.27 1.32-0.415 2.685-0.415 4.085 0 11.278 9.21 20.423 20.571 20.423 11.36 0 20.57-9.144 20.57-20.423 0-1.4-0.144-2.765-0.415-4.085l0.415 0L512.611 422.257c0-20.302 14.795-36.761 35.245-36.761 0 0 36.232-0.49 36.232 36.761l0 134.787 0.415 0c-0.27 1.321-0.415 2.686-0.415 4.085 0 11.279 9.21 20.423 20.57 20.423 11.361 0 20.571-9.143 20.571-20.423 0-1.399-0.144-2.764-0.415-4.085l0.415 0 0-93.942c0-20.303 14.559-36.762 35.01-36.762 0 0 36.983 2.303 36.983 36.762l0 118.449 0.415 0c-0.269 1.32-0.415 2.686-0.415 4.085 0 11.279 9.21 20.423 20.571 20.423s20.055-9.143 20.055-20.423c0-1.399-0.136-2.765-0.392-4.085l0.392 0 0-80.872c0-20.302 15.255-36.761 35.704-36.761 0 0 35.851-1.45 35.851 36.761C809.403 500.679 809.403 617.954 809.403 650.988zM328.307 382.755l0-68.631c-6.531-14.641-10.24-30.817-10.24-47.884 0-65.037 52.723-117.76 117.76-117.76s117.76 52.723 117.76 117.76c0 8.884-1.05 17.509-2.935 25.82 14.812 0.578 28.176 6.726 37.904 16.597 3.771-13.518 5.99-27.685 5.99-42.417 0-87.658-71.062-158.72-158.72-158.72s-158.72 71.062-158.72 158.72C277.107 312.36 296.898 353.755 328.307 382.755z" p-id="1225"></path></svg>
<!--            <span  class="synchronize i-synchronize"></span>-->
          </div>
        </yhm-form-text>
        <yhm-form-text v-if="isP" title="交强险" subtitle="保单号" @input="inputChange(businessNumber,payHighNumber)" @repeatverify="numberVerifyEvent" ref="payHighNumber"  tip="value" :value="payHighNumber" id="payHighNumber" rule="R0000">
          <div v-if="isDisplay" class="formBoxIcon" @click="payHighClick">
            <svg t="1597310976453" class="icon synchronize" style="cursor: pointer;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1224" width="32" height="32"><path d="M775.779 418.172l-2.051 0c-15.159 0-27.6 4.355-39.583 11.771-10.486-30.584-37.159-52.615-71.513-52.615-15.16 0-29.638 4.354-41.62 11.77-10.487-30.583-37.172-52.615-71.527-52.615-13.399 0-25.85 3.357-36.873 9.255l0-78.691c0-42.861-32.418-77.606-75.59-77.606-43.173 0-78.17 34.745-78.17 77.606l0 301.282-47.49-47.295c-30.528-30.306-84.558-25.992-110.55 0s-43.038 78.308-5.818 115.528l218.306 216.875c4.504 4.471 9.455 8.2 14.663 11.353 39.803 32.47 85.412 51.692 181.857 51.692 220.324 0 240.728-118.865 240.728-265.492L850.548 495.777C850.547 452.917 818.952 418.172 775.779 418.172zM809.403 650.988c0 124.069-0.593 224.647-199.585 224.647-84.298 0-134.907-18.796-173.246-56.858L229.904 613.455c-18.285-18.285-13.687-41.664 1.282-56.633 14.968-14.968 42.441-15.486 56.902-1.131 0 0 36.259 36.045 67.498 67.1 23.641 23.502 44.408 44.145 44.408 44.145l0-391.72c0-20.302 16.578-36.76 37.028-36.76 20.449 0 34.448 16.459 34.448 36.76l0 249.154 0.415 0c-0.27 1.32-0.415 2.685-0.415 4.085 0 11.278 9.21 20.423 20.571 20.423 11.36 0 20.57-9.144 20.57-20.423 0-1.4-0.144-2.765-0.415-4.085l0.415 0L512.611 422.257c0-20.302 14.795-36.761 35.245-36.761 0 0 36.232-0.49 36.232 36.761l0 134.787 0.415 0c-0.27 1.321-0.415 2.686-0.415 4.085 0 11.279 9.21 20.423 20.57 20.423 11.361 0 20.571-9.143 20.571-20.423 0-1.399-0.144-2.764-0.415-4.085l0.415 0 0-93.942c0-20.303 14.559-36.762 35.01-36.762 0 0 36.983 2.303 36.983 36.762l0 118.449 0.415 0c-0.269 1.32-0.415 2.686-0.415 4.085 0 11.279 9.21 20.423 20.571 20.423s20.055-9.143 20.055-20.423c0-1.399-0.136-2.765-0.392-4.085l0.392 0 0-80.872c0-20.302 15.255-36.761 35.704-36.761 0 0 35.851-1.45 35.851 36.761C809.403 500.679 809.403 617.954 809.403 650.988zM328.307 382.755l0-68.631c-6.531-14.641-10.24-30.817-10.24-47.884 0-65.037 52.723-117.76 117.76-117.76s117.76 52.723 117.76 117.76c0 8.884-1.05 17.509-2.935 25.82 14.812 0.578 28.176 6.726 37.904 16.597 3.771-13.518 5.99-27.685 5.99-42.417 0-87.658-71.062-158.72-158.72-158.72s-158.72 71.062-158.72 158.72C277.107 312.36 296.898 353.755 328.307 382.755z" p-id="1225"></path></svg>

            <!--            <span  class="synchronize i-synchronize"></span>-->
          </div>
        </yhm-form-text>
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
        deleteID:'',
        businessNumber:'',
        payHighNumber:'',
        fileList: [],
        isNumber:false,
        isPayNumber:false,
        poNumberID:'',
        project:'',
        isB:false,
        isP:false,
        isDisplay:false,
      }
    },
    methods:{
      inputChange(val,val2){
        if(val==''&&val2==''){
          if(this.businessNumber==''&&this.payHighNumber==''){//商业险与交强险保单号都为空时 清空要删除的数据id
            this.deleteID = ''
          }
        }
      },
      businessClick(){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '700',
          url: '/selectNumber?deleteID='+this.deleteID  ,
          title: '选择保单号',
          closeCallBack: (data)=>{
            if(data){
              this.businessNumber=data.number
              if(this.businessNumber!=''){
                this.deleteID = data.number
              }
              this.initPageData(false)
            }
          }
        })
      },
      payHighClick(){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '700',
          url: '/selectNumber?deleteID='+this.deleteID ,
          title: '选择保单号',
          closeCallBack: (data)=>{
            if(data){
              this.payHighNumber=data.number
              if(this.payHighNumber!=''){
                this.deleteID = data.number
              }
              this.initPageData(false)
            }
          }
        })
      },
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
          this.$dialog.confirm({
            alertImg: 'warn',
            btnValueOk: '确定',
            tipValue: '确定提交吗?',
            okCallBack: ()=>{
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
          })
         }

      }

    },
    created () {
      this.setQuery2Value('ownerID')
      this.setQuery2Value('project')
      this.setQuery2Value('display')

      if (this.display==1){
        this.isDisplay=true
      }else{
        this.isDisplay=false
      }


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

<style scoped scoped>
  .synchronize:hover{
    color: #49a9ea;
  }
  .synchronize:before{
    font-size: 22px;
  }
</style>
