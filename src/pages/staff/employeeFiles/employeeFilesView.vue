<template>
  <div class="f_main">
    <yhm-view-body :customize="true" :pager="false">
      <template #title>员工信息</template>
      <template #body>
        <yhm-view-control title="姓名" :content="person"></yhm-view-control>
        <yhm-view-control title="入职时间" type="date" :content="entryDate" ></yhm-view-control>
        <yhm-view-control title="状态" :content="state" :psd="statePsd"></yhm-view-control>
        <yhm-view-control title="部门" :content="department"></yhm-view-control>
        <yhm-view-control title="职位" :content="position" ></yhm-view-control>
        <yhm-view-control title="手机号" :content="phone" ></yhm-view-control>
        <yhm-view-control title="微信号" :content="weChat" ></yhm-view-control>
        <yhm-view-control title="身份证号" :content="idNo" ></yhm-view-control>
        <yhm-view-control title="户口类型" :content="residenceType" :psd="residenceTypePsd"></yhm-view-control>
        <yhm-view-control title="性别" :content="sex" :psd="sexPsd"></yhm-view-control>
        <yhm-view-control title="籍贯" :content="nativePlace" ></yhm-view-control>
        <yhm-view-control title="公历生日" :content="birthday" ></yhm-view-control>
        <yhm-view-control title="农历生日" :content="birthdayLunar" ></yhm-view-control>
        <yhm-view-control title="生肖" :content="zodiac" ></yhm-view-control>
        <yhm-view-control title="星座" :content="constellation" ></yhm-view-control>
        <yhm-view-control title="民族" :content="nation" ></yhm-view-control>
        <yhm-view-control title="血型" :content="bloodType" ></yhm-view-control>
        <yhm-view-control title="学历" :content="educationType" :psd="educationTypePsd"></yhm-view-control>
        <yhm-view-control title="家庭地址" :content="homeAddress" ></yhm-view-control>
        <yhm-view-control title="现居住地址" :content="residentialAddress" ></yhm-view-control>
        <yhm-view-control title="基础工资" :content="basicWage" ></yhm-view-control>
        <yhm-view-control title="工龄工资" :content="seniorityPay" ></yhm-view-control>
        <yhm-view-control title="岗位工资" :content="postSalary" ></yhm-view-control>
        <yhm-view-control title="花费补助" :content="expenseSubsidy" ></yhm-view-control>
        <yhm-view-control title="养老基数" :content="pensionBase" ></yhm-view-control>
        <yhm-view-control title="失业基数" :content="unemploymentBase" ></yhm-view-control>
        <yhm-view-control title="工伤基数" :content="injuryBase" ></yhm-view-control>
        <yhm-view-control title="医疗基数" :content="medicalBase" ></yhm-view-control>
        <yhm-view-control title="公积金基数" :content="providentBase" ></yhm-view-control>
        <yhm-view-control category="3" title="文件" type="files" :content="fileList"></yhm-view-control>

        <yhm-view-control title="离职时间" color="#DD0A0A" type="date" :content="quitDate" ></yhm-view-control>
        <yhm-view-control title="离职原因" color="#DD0A0A" :content="quitReason" ></yhm-view-control>
        <yhm-view-control category="3" title="离职文件" type="files" :content="quitFileList"></yhm-view-control>
      </template>
    </yhm-view-body>
    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn>
        <yhm-commonbutton value="编辑" v-show="state=='0'" icon="btnSave" :flicker="true" @call="edit()"></yhm-commonbutton>
      </template>
    </yhm-formoperate>
  </div>
</template>

<script>
  import { viewmixin } from '@/assets/view.js'
  import {formatDate} from '@/assets/common.js'
  export default {
    name: 'employeeFilesView',
    mixins: [viewmixin],
    data() {
      return {
        personID:'',
        person:'',
        entryDate:'',
        departmentID:'',
        department:'',
        positionID:'',
        position:'',
        postID:'',
        post:'',
        phone:'',
        weChat:'',
        residenceType:'',
        idNo:'',
        sex:'',
        isSex:true,
        nativePlace:'',
        calendar:'',
        birthday:'',
        birthdayLunar:'',
        zodiac:'',
        zodiacID:'',
        constellation:'',
        constellationID:'',
        nation:'',
        nationID:'',
        bloodType:'',
        bloodTypeID:'',
        educationType:'',
        major:'',
        homeAddress:'',
        residentialAddress:'',
        state:'',
        quitDate:'',

        basicWage:'',
        basicWageType:'',
        basicWageTypePsd:[],
        basicWageList:'',
        seniorityPay:'',
        seniorityPayType:'',
        seniorityPayList:'',
        seniorityPayTypePsd:[],
        postSalary:'',
        postSalaryType:'',
        postSalaryTypePsd:[],
        postSalaryList:'',
        expenseSubsidy:'',
        expenseSubsidyType:'',
        expenseSubsidyTypePsd:[],
        expenseSubsidyList:'',
        pensionBase:'',
        unemploymentBase:'',
        injuryBase:'',
        medicalBase:'',
        providentBase:'',
        fiveInsurancesTypePsd:[],
        fiveInsurancesType:'',
        fiveInsurancesBaseList:[],
        fileList:[],
        residenceTypePsd:[],
        sexPsd:[],
        calendarPsd:[],
        educationTypePsd:[],
        statePsd:[],

        quitDate:'',
        quitReason:'',
        quitFileList:[],

        insertDate:'',
        createName:'',
        updateName:'',
        updateDate:'',
      }
    },
    methods: {
      edit(){
        this.$dialog.OpenWindow({
          width: 1050,
          height: 820,
          url:'/employeeFilesForm?id='+this.id,
          title:'修改员工信息',
          closeCallBack:(data) =>{
            if(data){
              this.$dialog.setReturnValue(this.id)
              this.init()
            }
          }
        })
      },
      init(){
        let params = {
          id: this.id
        }
        this.ajaxJson({
          url: '/finance/employeeFiles/initForm',
          data: params,
          call: (data) => {
            if(data){
              this.id=data.id
              this.personID=data.personID
              this.person=data.person
              this.entryDate=data.entryDate
              this.departmentID=data.departmentID
              this.department=data.department
              this.positionID=data.positionID
              this.position=data.position
              this.postID=data.postID
              this.post=data.post
              this.phone=data.phone
              this.weChat=data.weChat
              this.residenceType=data.residenceType
              this.idNo=data.idNo
              this.nativePlace=data.nativePlace
              this.calendar=data.calendar
              this.birthday=data.birthday
              this.birthdayLunar=data.birthdayLunar
              this.zodiac=data.zodiac
              this.zodiacID=data.zodiacID
              this.constellation=data.constellation
              this.constellationID=data.constellationID
              this.nation=data.nation
              this.nationID=data.nationID
              this.bloodType=data.bloodType
              this.bloodTypeID=data.bloodTypeID
              this.educationType=data.educationType
              this.major=data.major
              this.homeAddress=data.homeAddress
              this.residentialAddress=data.residentialAddress
              this.sexPsd=data.sexPsd.list
              this.sex=data.sexPsd.value
              this.calendarPsd=data.calendarPsd.list
              this.calendar=data.calendarPsd.value
              this.educationTypePsd=data.educationTypePsd.list
              this.educationType=data.educationTypePsd.value
              this.statePsd=data.statePsd.list
              this.state=data.statePsd.value
              this.residenceTypePsd=data.residenceTypePsd.list
              this.residenceType=data.residenceTypePsd.value
              this.fiveInsurancesType=data.fiveInsurancesTypePsd.value
              this.fiveInsurancesTypePsd=data.fiveInsurancesTypePsd.list
              this.fiveInsurancesBaseList=data.fiveInsurancesBaseList
              if(this.fiveInsurancesBaseList.length>0){
                this.pensionBase=this.fiveInsurancesBaseList[parseInt(this.fiveInsurancesType)].pension
                this.unemploymentBase=this.fiveInsurancesBaseList[parseInt(this.fiveInsurancesType)].unemployment
                this.injuryBase=this.fiveInsurancesBaseList[parseInt(this.fiveInsurancesType)].injury
                this.medicalBase=this.fiveInsurancesBaseList[parseInt(this.fiveInsurancesType)].medical
                this.providentBase=this.fiveInsurancesBaseList[parseInt(this.fiveInsurancesType)].provident
              }
              this.basicWageTypePsd=data.basicWageTypePsd.list
              this.basicWageType=data.basicWageTypePsd.value
              this.basicWageList=data.basicWageList
              if(this.basicWageList.length>0){
                this.basicWage=this.basicWageList[this.basicWageType].money
              }
              this.postSalaryTypePsd=data.postSalaryTypePsd.list
              this.postSalaryType=data.postSalaryTypePsd.value
              this.postSalaryList=data.postSalaryList
              if(this.postSalaryList.length>0){
                this.postSalary=this.postSalaryList[this.postSalaryType].money
              }
              this.expenseSubsidyTypePsd=data.expenseSubsidyTypePsd.list
              this.expenseSubsidyType=data.expenseSubsidyTypePsd.value
              this.expenseSubsidyList=data.expenseSubsidyList
              if(this.expenseSubsidyList.length>0){
                this.expenseSubsidy=this.expenseSubsidyList[this.expenseSubsidyType].money
              }
              this.seniorityPayTypePsd=data.seniorityPayTypePsd.list
              this.seniorityPayType=data.seniorityPayTypePsd.value
              this.seniorityPayList=data.seniorityPayList
              if(this.seniorityPayList.length>0){
                this.seniorityPay=this.seniorityPayList[parseInt(this.seniorityPayType)].money
              }
              if(this.state=='1'){
                this.quitDate=data.quitDate
                this.quitReason=data.quitReason
                this.quitFileList=data.quitFileList
              }
              this.fileList=data.fileList
              this.insertDate=data.insertDate
              this.createName=data.createName
              this.updateName=data.updateName
              this.updateDate=data.updateDate
            }
          }
        })
      }
    },
    created () {
      this.init()
    }
  }
</script>

<style scoped>

</style>
