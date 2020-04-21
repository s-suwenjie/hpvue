<template>
  <div class="f_main">
    <yhm-formbody>
      <template #title>基本信息</template>
      <template #control>
<!--        <yhm-form-text title="所属单位" no-edit="1" :value="unit" id="unit" rule="R0000"></yhm-form-text>-->
        <yhm-form-text title="申请人" no-edit="1" :value="person" id="person" rule="R0000"></yhm-form-text>
        <yhm-form-radio title="业务相关" @call="getCode" :select-list="isTravelList"  :value="isTravel" id="isTravel" rule="R0000"></yhm-form-radio>

        <yhm-form-radio title="发票类型" :select-list="invoiceCategoryList"  :value="invoiceCategory" id="invoiceCategory" rule="R0000"></yhm-form-radio>

        <yhm-form-date title="申请日期" @call="getCode" :max="maxWorkDate" :value="workDate" id="workDate" rule="R0000" :no-edit="true"></yhm-form-date>

        <yhm-form-radio title="选择天数" @call="selectDateEvent" :select-list="selectDateList" :value="selectDate" id="selectDate" rule="R0000"></yhm-form-radio>
        <yhm-form-date title="预计归还/" subtitle="核销时间" :min="minEstimateDate" :max="maxEstimateDate" :value="estimateDate" id="estimateDate" rule="R0000" position="b"></yhm-form-date>

        <yhm-form-text title="申请金额" @change="getCode" tip="money" before-icon="rmb" :value="money" id="money" rule="R3000" placeholder="请输入数字" error-message="纯数字输入"></yhm-form-text>

        <yhm-form-text title="申请编号" no-edit="1" :value="code" id="code" rule="R0000"></yhm-form-text>
        <yhm-form-select title="事由" :value="subject" id="subject" @click="selectSubject" rule="R0000"></yhm-form-select>
        <yhm-form-textarea title="事由说明" :value="remark" id="remark"></yhm-form-textarea>

        <yhm-formupload :ownerID="id" :value="list" id="list" title="上传文件" tag="prettyCashs" subtitle="" multiple="multiple"></yhm-formupload>

      </template>
    </yhm-formbody>
    <div v-html="approvalHtml"></div>
    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn>
        <yhm-commonbutton value="保存" icon="btnSave" :flicker="true" @call="save()"></yhm-commonbutton>
        <yhm-commonbutton value="保存并提交" icon="btnSubSave" @call="saveSubmit()"></yhm-commonbutton>
      </template>
    </yhm-formoperate>
  </div>
</template>

<script>
  import { formmixin } from '@/assets/form.js'
  import { formatDate ,accAdd, guid,number2chinese,formatCnDate,accMul,formatTime} from '@/assets/common.js'
  export default {
    name: 'prettyCashsForm',
    mixins: [formmixin],
    data(){
      return{
        unitID:'',
        unit:'',
        person:'',
        personID:'',
        workDate:'',
        maxWorkDate:formatDate(new Date()),
        code:'',
        isTravel:'',
        isTravelList:[],
        invoiceCategory: '',
        invoiceCategoryList: [],
        money:'',
        remark:'',
        isAdd:'',
        subject:'',
        subjectID:'',
        estimateDate:'',
        oldEstimateDate:'',
        minEstimateDate:formatDate(new Date()),
        maxEstimateDate:formatDate(new Date(accAdd(new Date().getTime(), accMul(3888000,1000)))),
        approvalHtml: '',
        selectDate: '',
        list: [],
        selectDateList: [
          {
            showName: "7天",
            num: "0",
            code: "#297c25",
            img: ''
          },
          {
            showName: "15天",
            num: "1",
            code: "#2d2798",
            img: ''
          },
          {
            showName: "30天",
            num: "2",
            code: "#bb262b",
            img: ''
          },
          {
            showName: "其他",
            num: "3",
            code: "#bb262b",
            img: ''
          }
        ],
      }
    },
    methods:{
      /* 选择天数 */
      selectDateEvent(){
        let workDate = this.workDate
          if(this.selectDate === '0'){
            this.estimateDate = formatDate( new Date(accAdd((new Date(workDate)).getTime(),7*24*60*60*1000)))
          }else if(this.selectDate === '1'){
            this.estimateDate = formatDate( new Date(accAdd((new Date(workDate)).getTime(),15*24*60*60*1000)))
          }else if(this.selectDate === '2'){
            this.estimateDate = formatDate( new Date(accAdd((new Date(workDate)).getTime(),30*24*60*60*1000)))
          }
      },
      getCode(){
        if(this.workDate!==''&&this.isTravel!==''&&this.money!==''){
          let params = {
            personID:this.personID,
            workDate:this.workDate,
            isTravel:this.isTravel,
            money:this.money
          }
          this.ajaxJson({
            url: '/PersonOffice/prettyCashsCode',
            data: params,
            loading:'0',
            call: (data)=>{
              this.code=data.val
            }
          })
        }
      },
      saveSubmit(){
        let a = this.validator()
        if(a){
          let params = {
            id:this.id,
            unitID:this.unitID,//所属单位
            unit:this.unit,
            personID:this.personID,//申请人
            person:this.person,
            workDate:this.workDate,
            code:this.code,
            isTravel:this.isTravel,
            money:this.money,
            subject:this.subject,
            subjectID:this.subjectID,//事由
            estimateDate:this.estimateDate,
            remark:this.remark,
            invoiceCategory: this.invoiceCategory,
            list: this.list,
          }
          this.ajaxJson({
            url: '/PersonOffice/prettyCashsSave',
            data: params,
            call: (data) => {
              if (data.type === 0) {
                let category='';
                if(this.money<1000){
                  category='0';
                }else if(this.money>=1000&&this.money<10000){
                  category='21';
                }else if(this.money>=10000&&this.money<100000){
                  category='22';
                }else{
                  category='23';
                }
                let params = {
                  id: this.id,
                  category: category,
                  tableName: 47,
                  isDetail: 0,
                  tableDetailName: -1
                }
                this.ajaxJson({
                  url: '/PersonOffice/approvalSubmitVue',
                  data: params,
                  call: (submit) => {
                    if (submit.type === 0) {
                      this.$dialog.setReturnValue(this.id)
                      this.$dialog.alert({
                        tipValue: submit.message,
                        closeCallBack: ()=>{
                          this.$dialog.close()
                        }
                      })
                    } else {
                      this.$dialog.alert({
                        alertImg: 'error',
                        tipValue: submit.message,
                        closeCallBack: () => {
                        }
                      })
                    }
                  }
                })
              }else{
                this.$dialog.alert({
                  tipValue: data.message,
                  closeCallBack: ()=>{
                    this.$dialog.close()
                  }
                })
              }
            }
          })
        }
      },
      save(){

        let a = this.validator()
        if(a){
          let params = {
            id:this.id,
            unitID:this.unitID,//所属单位
            unit:this.unit,
            personID:this.personID,//申请人
            person:this.person,
            workDate:this.workDate,
            code:this.code,
            isTravel:this.isTravel,
            money:this.money,
            subject:this.subject,
            subjectID:this.subjectID,//事由
            estimateDate:this.estimateDate,
            remark:this.remark,
            invoiceCategory: this.invoiceCategory,
            list: this.list,
          }

          this.ajaxJson({
            url: '/PersonOffice/prettyCashsSave',
            data: params,
            call: (data) => {
              if (data.type === 0) {
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
                    this.$dialog.close()
                  }
                })
              }
            }
          })
        }
      },
      selectSubject(){
        let name=''
        if (this.isTravel==='1'){
          name='63'
        }else{
          name='65'
        }
        this.$dialog.OpenWindow({
          width: '950',
          height: '700',
          url: '/selectDic?name='+name,
          title: '选择事由',
          closeCallBack: (data) => {
            if (data) {
              let params = {
                id:this.id,
                subjectID:data.id
              }
              this.ajaxJson({
                url: '/PersonOffice/prettyCashsSubjectID',
                data: params,
                call: (submit) => {
                  if (submit.type === 0) {
                    this.subjectID=data.id
                    if(data.value2===''){
                      this.subject=data.showName+' ---- '+data.value1
                    }else{
                      this.subject=data.showName+' ---- '+data.value1+' ---- '+data.value2
                    }
                  } else {
                    this.$dialog.alert({
                      alertImg: 'error',
                      tipValue: submit.message,
                      closeCallBack: () => {
                      }
                    })
                  }
                }
              })
            }
          }
        })
      },
      initData(){
        let params = {

        }
        this.init({
          url: '/PersonOffice/prettyCashsForm',
          data: params,
          all: (data)=>{
            this.isTravel=data.isTravelPsd.value
            this.isTravelList=data.isTravelPsd.list
            this.invoiceCategory = data.invoiceCategoryPsd.value
            this.invoiceCategoryList = data.invoiceCategoryPsd.list
            this.unit = data.unit
            this.unitID=data.unitID
          },
          add: (data)=>{

          },
          look: (data)=>{
            this.personID=data.personID
            this.person=data.person
            this.money=data.money
            this.code=data.code
            this.workDate=data.workDate
            this.subject=data.subject
            this.subjectID=data.subjectID
            this.remark=data.remark
            this.approvalHtml = data.approvalHtml
            this.estimateDate = data.estimateDate
            this.list = data.list
          }
        })
      }
    },
    created(){
      this.setQuery2Value('isAdd')
      if(this.isAdd){
        this.person = sessionStorage.getItem('____currentUser')
        this.personID = sessionStorage.getItem('____currentUserID')
        this.workDate = formatDate(new Date())
      }
      this.initData()
    },
    watch: {

    }
  }
</script>

<style scoped>

</style>
