<template>
  <div  class="f_main">
    <yhm-formbody>
      <template #title>基本信息</template>

      <template #control>
        <yhm-form-select title="姓名" ref="person" @click="selectPerson" :value="person" id="person" rule="R0000"></yhm-form-select>
        <yhm-form-date title="入职时间" :max="maxApplyDate" :value="entryDate" id="entryDate" rule="R0000"></yhm-form-date>
        <yhm-form-select title="部门" @click="selectDepartment" :value="department" id="department" rule="R0000"></yhm-form-select>
        <yhm-form-select title="职位" @click="selectPosition" :value="position" id="position" rule="R0000"></yhm-form-select>
        <yhm-form-select title="岗位" @click="selectPost" :value="post" id="post" rule="R0000"></yhm-form-select>
        <yhm-form-text title="手机号码" :value="phone" id="phone" ref="phone" tip="value" @repeatverify="verifyPhone" rule="R4000"></yhm-form-text>
        <yhm-form-text title="微信" :value="weChat" id="weChat" ref="weChat" tip="value" @repeatverify="verifyWeChat" rule="R1900"></yhm-form-text>
        <yhm-form-radio title="性别" :select-list="sexPsd" :value="sex" id="sex" rule="R0000" noEdit="false"></yhm-form-radio>
        <yhm-form-radio title="户口类型" :select-list="residenceTypePsd" :value="residenceType" id="residenceType" rule="R0000"></yhm-form-radio>
        <yhm-form-text title="身份证号" :value="idNo" id="idNo" ref="idNo" tip="value" rule="R5000" no-edit="1"></yhm-form-text>
        <yhm-form-text title="籍贯" :value="nativePlace" id="nativePlace" ref="nativePlace" tip="value" rule="R0000" no-edit="1"></yhm-form-text>
        <!--<yhm-form-radio title="生日历法" :select-list="calendarPsd" :value="calendar" id="calendar" rule="R0000"></yhm-form-radio>-->
        <yhm-form-text title="公历生日" :value="birthday" id="birthday" tip="value" rule="R0000" no-edit="1"></yhm-form-text>
        <yhm-form-text title="农历生日" :value="birthdayLunar" id="birthdayLunar" tip="value" rule="R0000" no-edit="1"></yhm-form-text>
        <yhm-form-text title="生肖" :value="zodiac" id="zodiac" ref="zodiac" tip="value" no-edit="1" @repeatverify="verifyzodiac" rule="R0000"></yhm-form-text>
        <yhm-form-text title="星座" :value="constellation" id="constellation" ref="constellation" tip="value" no-edit="1" @repeatverify="verifyconstellation" rule="R0000"></yhm-form-text>
        <yhm-form-select title="民族" @click="nationEvent" tip="value" :value="nation" id="nation"></yhm-form-select>
        <yhm-form-select title="血型" @click="bloodTypeEvent" tip="bloodType" :value="bloodType" id="bloodType" ></yhm-form-select>
        <!--<yhm-form-radio title="学历" :select-list="educationTypePsd" :value="educationType" id="educationType" rule="R0000"></yhm-form-radio>-->
        <!--<yhm-form-text title="专业" :value="major" id="major" ref="major" tip="value" @repeatverify="verifymajor" rule="R0000"></yhm-form-text>-->
        <yhm-form-text title="家庭地址" :value="homeAddress" id="homeAddress" ref="homeAddress" tip="value" @repeatverify="verifyhomeAddress" rule="R0000"></yhm-form-text>
        <yhm-form-text title="现居住地址" :value="residentialAddress" id="residentialAddress" ref="residentialAddress" tip="value" @repeatverify="verifyresidentialAddress" rule="R0000"></yhm-form-text>
        <!--<yhm-form-radio title="员工状态" :select-list="statePsd" :value="state" id="state" rule="R0000"></yhm-form-radio>-->
        <yhm-form-date title="离职时间" v-if="state==1" :max="maxApplyDate" :value="quitDate" id="quitDate" rule="R0000"></yhm-form-date>
        <yhm-form-select title="基础工资" @click="selectbasicWage" :value="basicWage" id="basicWage" rule="R0000"></yhm-form-select>
        <yhm-form-select title="工龄工资" @click="selectseniorityPay" :value="seniorityPay" id="seniorityPay" rule="R0000"></yhm-form-select>
        <yhm-form-select title="岗位工资" @click="selectpostSalary" :value="postSalary" id="postSubsidy" rule="R0000"></yhm-form-select>
        <yhm-form-select title="岗位补助" @click="selectpostSubsidy" :value="postSubsidy" id="postSubsidy" rule="R0000"></yhm-form-select>
        <yhm-form-select title="花费补助" @click="selectexpenseSubsidy" :value="expenseSubsidy" id="expenseSubsidy" rule="R0000"></yhm-form-select>
        <yhm-form-radio title="社保级别" @call="selectFiveInsurances" :select-list="fiveInsurancesPsd" :value="fiveInsurances" id="fiveInsurances" rule="R0000" width="1"></yhm-form-radio>
        <yhm-form-text title="养老基数" no-edit="1" :value="pensionBase" id="pensionBase" rule="R0000"></yhm-form-text>
        <yhm-form-text title="失业基数" no-edit="1" :value="unemploymentBase" id="unemploymentBase" rule="R0000"></yhm-form-text>
        <yhm-form-text title="工伤基数" no-edit="1" :value="injuryBase" id="injuryBase" rule="R0000"></yhm-form-text>
        <yhm-form-text title="医疗基数" no-edit="1" :value="medicalBase" id="medicalBase" rule="R0000"></yhm-form-text>
        <yhm-form-text title="公积金基数" no-edit="1" :value="providentBase" id="providentBase" rule="R0000"></yhm-form-text>
        <!--<yhm-form-text title="单位工伤" subtitle="（%）" :value="unitInjury" id="unitInjury" rule="R0000"></yhm-form-text>-->
        <!--<yhm-form-text title="个人养老" subtitle="（%）" :value="personalPension" id="personalPension" rule="R0000"></yhm-form-text>-->
        <!--<yhm-form-text title="单位养老" subtitle="（%）" :value="unitPension" id="unitPension" rule="R0000"></yhm-form-text>-->
        <!--<yhm-form-text title="个人失业" subtitle="（%）" :value="personalUnemployment" id="personalUnemployment" rule="R0000"></yhm-form-text>-->
        <!--<yhm-form-text title="单位失业" subtitle="（%）" :value="unitUnemployment" id="unitUnemployment" rule="R0000"></yhm-form-text>-->
        <!--&lt;!&ndash;<yhm-form-select title="个人工伤" @click="selectpersonalInjur" :value="personalInjur" id="personalInjur" rule="R0000"></yhm-form-select>&ndash;&gt;-->
        <!--<yhm-form-text title="个人医疗" subtitle="（%）" :value="personalMedical" id="personalMedical" rule="R0000"></yhm-form-text>-->
        <!--<yhm-form-text title="单位医疗" subtitle="（%）" :value="unitMedical" id="unitMedical" rule="R0000"></yhm-form-text>-->
        <!--<yhm-form-text title="个人公积金" subtitle="（%）" :value="personalProvident" id="personalProvident" rule="R0000"></yhm-form-text>-->
        <!--<yhm-form-text title="单位公积金" subtitle="（%）" :value="unitProvident" id="unitProvident" rule="R0000"></yhm-form-text>-->
      </template>
    </yhm-formbody>
    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn>
        <yhm-commonbutton value="保存" icon="btnSave" :flicker="true" @call="save()"></yhm-commonbutton>
      </template>
    </yhm-formoperate>
  </div>
</template>

<script>
  import {formmixin} from '@/assets/form.js'
  import {number2chinese,accMul, accAdd, guid, formatTime, formatDate,formatCnDate} from '@/assets/common.js'
  export default {
    name: 'employeeFilesForm',
    mixins: [formmixin],
    data() {
      return {
        maxApplyDate:formatDate(new Date()),

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
        seniorityPay:'',
        postSubsidy:'',
        postSalary:'',
        expenseSubsidy:'',
        pensionBase:'',
        unitPension:'',
        personalPension:'',
        unemploymentBase:'',
        personalUnemployment:'',
        unitUnemployment:'',
        injuryBase:'',
        personalInjur:'',
        medicalBase:'',
        personalMedical:'',
        unitMedical:'',
        providentBase:'',
        personalProvident:'',
        unitProvident:'',
        fiveInsurancesPsd:[],
        fiveInsurances:'',
        fiveInsurancesBaseList:[],

        residenceTypePsd:[],
        sexPsd:[],
        calendarPsd:[],
        educationTypePsd:[],
        statePsd:[],
      }
    },
    computed:{
    },
    created(){
      let params={}
      this.init({
        url: '/finance/employeeFiles/initForm',
        data: params,
        all: (data) => {
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
          this.fiveInsurances=data.fiveInsurancesPsd.value
          this.fiveInsurancesPsd=data.fiveInsurancesPsd.list
          this.fiveInsurancesBaseList=data.fiveInsurancesBaseList
          if(this.fiveInsurancesBaseList.length>0){
            this.pensionBase=this.fiveInsurancesBaseList[parseInt(this.fiveInsurances)].pension
            this.unemploymentBase=this.fiveInsurancesBaseList[parseInt(this.fiveInsurances)].unemployment
            this.injuryBase=this.fiveInsurancesBaseList[parseInt(this.fiveInsurances)].injury
            this.medicalBase=this.fiveInsurancesBaseList[parseInt(this.fiveInsurances)].medical
            this.providentBase=this.fiveInsurancesBaseList[parseInt(this.fiveInsurances)].provident
          }
        },
        add: (data) => {

        },
        look: (data) => {

        }
      })
    },
    methods:{
      selectFiveInsurances(){
        this.pensionBase=this.fiveInsurancesBaseList[parseInt(this.fiveInsurances)].pension
        this.unemploymentBase=this.fiveInsurancesBaseList[parseInt(this.fiveInsurances)].unemployment
        this.injuryBase=this.fiveInsurancesBaseList[parseInt(this.fiveInsurances)].injury
        this.medicalBase=this.fiveInsurancesBaseList[parseInt(this.fiveInsurances)].medical
        this.providentBase=this.fiveInsurancesBaseList[parseInt(this.fiveInsurances)].provident
      },
      verifyPhone(){//验证手机号
        if(!phone){
          this.verifyCommon('phone',this.phone)
        }
      },
      verifyWeChat(){//验证微信
        if(!this.weChat) {
          this.verifyCommon('weChat', this.weChat)
        }
      },
      // verifyidNo(){//验证身份证
      //   if(!this.idNo) {
      //     this.verifyCommon('idNo', this.idNo)
      //   }
      // },
      verifyCommon(obj,objID){
        let params={
          id:this.id,
          columnName:obj,
          columnValue:objID
        }
        this.ajaxJson({
          url: '/finance/employeeFiles/isExist',
          data: params,
          loading: '0',
          call: (isData) => {
            if (isData.type != 0) {
              if(obj=='weChat'){

              }
            }
          }
        })
      },
      /* 选择民族 */
      nationEvent(){
        let name = '69'
        this.$dialog.OpenWindow({
          width: 950,
          height: 603,
          url: '/selectDic?name=' + name,
          title: '选择民族',
          closeCallBack: (data) => {
            if(data){
              this.nation = data.showName
              this.nationID = data.id
            }
          }
        })
      },
      /* 选择血型 */
      bloodTypeEvent(){
        let name = '71'
        this.$dialog.OpenWindow({
          width: 950,
          height: 603,
          url: '/selectDic?name=' + name,
          title: '选择血型',
          closeCallBack: (data) => {
            if(data){
              this.bloodType = data.showName
              this.bloodTypeID = data.id
            }
          }
        })
      },
      selectPerson(){
        this.$dialog.OpenWindow({
          width: 950,
          height: 692,
          url: '/selectPerson?category=0&categoryBefore=1',
          title: '选择本单位联系人',
          closeCallBack: (data) => {
            if (data) {
              let params={
                id:this.id,
                columnName:'personID',
                personID:this.personID
              }
              this.ajaxJson({
                url: '/finance/employeeFiles/isExist',
                data: params,
                loading: '0',
                call: (isData) => {
                  if (isData.type != 0) {
                    this.$refs.person.errorEvent('员工信息已存在')
                    this.personID=''
                    this.person=''
                  }else{
                    this.personID=data.id
                    this.person=data.name
                    this.sex=data.sex
                    this.phone=data.phone
                    this.idNo=data.idNo
                    this.calendar=data.calendar
                    this.birthday=data.birthday
                    this.birthdayLunar=data.birthdayLunar
                    this.nativePlace=data.nativePlace
                    this.zodiac=data.zodiac
                    this.zodiacID=data.zodiacID
                    this.constellation=data.constellation
                    this.constellationID=data.constellationID
                    this.nation=data.nation
                    this.nationID=data.nationID
                    this.bloodType=data.bloodType
                    this.bloodTypeID=data.bloodTypeID
                  }
                }
              })
            }
          }
        })
      },

      selectDepartment(){//选择部门

      },
      selectPosition(){//选择职位

      },
      selectPost(){//选择岗位

      },
    }
  }
</script>

<style scoped>

</style>
