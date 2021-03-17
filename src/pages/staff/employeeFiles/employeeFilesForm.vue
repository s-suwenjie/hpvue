<template>
  <div  class="f_main">
    <yhm-formbody>
      <template #title>基本信息</template>

      <template #control>
        <yhm-form-select title="姓名" @click="selectPerson" :value="person" id="person" rule="R0000"></yhm-form-select>
<!--        {{maxApplyDate}}-->
<!--        <yhm-form-date title="接待日期" :value="visitDate" id="visitDate" :max="currentDate"></yhm-form-date>-->
        <yhm-form-date title="入职时间" :max="maxApplyDate" :value="entryDate" id="entryDate" rule="R0000"></yhm-form-date>
        <yhm-form-select title="部门" @click="selectDepartment" :value="department" id="department" rule="R0000"></yhm-form-select>
        <yhm-form-select title="职位" @click="selectPosition" :value="position" id="position" rule="R0000"></yhm-form-select>
        <yhm-form-select title="岗位" @click="selectPost" :value="post" id="post" rule="R0000"></yhm-form-select>
        <yhm-form-text title="手机号码" :value="phone" id="phone" ref="phone" tip="value" @repeatverify="verifyPhone" rule="R4000"></yhm-form-text>
        <yhm-form-text title="微信" :value="weChat" id="weChat" ref="weChat" tip="value" @repeatverify="verifyWeChat" rule="R1900"></yhm-form-text>
        <yhm-form-radio title="性别" :select-list="sexPsd" :value="sex" id="sex" rule="R0000"></yhm-form-radio>
        <yhm-form-text title="身份证号" :value="idNo" id="idNo" ref="idNo" tip="value" @repeatverify="verifyidNo" rule="R5000"></yhm-form-text>
        <yhm-form-radio title="农历阳历" :select-list="calendarPsd" :value="calendar" id="calendar" rule="R0000"></yhm-form-radio>
        <yhm-form-date title="生日" :max="maxApplyDate" :value="birthday" id="birthday" rule="R0000"></yhm-form-date>
        <yhm-form-text title="大写生日" :value="birthdayLunar" id="birthdayLunar" ref="birthdayLunar" tip="value" @repeatverify="verifybirthdayLunar" rule="R0000"></yhm-form-text>
        <yhm-form-text title="生肖" :value="zodiac" id="zodiac" ref="zodiac" tip="value" @repeatverify="verifyzodiac" rule="R0000"></yhm-form-text>
        <yhm-form-text title="星座" :value="constellation" id="constellation" ref="constellation" tip="value" @repeatverify="verifyconstellation" rule="R0000"></yhm-form-text>
        <yhm-form-text title="民族" :value="nation" id="nation" ref="nation" tip="value" @repeatverify="verifynation" rule="R0000"></yhm-form-text>
        <yhm-form-text title="血型" :value="bloodType" id="bloodType" ref="bloodType" tip="value" @repeatverify="verifybloodType" rule="R0000"></yhm-form-text>
        <yhm-form-radio title="学历" :select-list="educationTypePsd" :value="educationType" id="educationType" rule="R0000"></yhm-form-radio>
        <yhm-form-text title="专业" :value="major" id="major" ref="major" tip="value" @repeatverify="verifymajor" rule="R0000"></yhm-form-text>
        <yhm-form-text title="家庭地址" :value="homeAddress" id="homeAddress" ref="homeAddress" tip="value" @repeatverify="verifyhomeAddress" rule="R0000"></yhm-form-text>
        <yhm-form-text title="现居住地址" :value="residentialAddress" id="residentialAddress" ref="residentialAddress" tip="value" @repeatverify="verifyresidentialAddress" rule="R0000"></yhm-form-text>
        <yhm-form-radio title="员工状态" :select-list="statePsd" :value="state" id="state" rule="R0000"></yhm-form-radio>
        <yhm-form-date title="离职时间" :max="maxApplyDate" :value="quitDate" id="quitDate" rule="R0000"></yhm-form-date>
        <yhm-form-select title="基础工资" @click="selectbasicWage" :value="basicWage" id="basicWage" rule="R0000"></yhm-form-select>
        <yhm-form-select title="工龄工资" @click="selectseniorityPay" :value="seniorityPay" id="seniorityPay" rule="R0000"></yhm-form-select>
        <yhm-form-select title="岗位工资" @click="selectpostSalary" :value="postSalary" id="postSubsidy" rule="R0000"></yhm-form-select>
        <yhm-form-select title="岗位补助" @click="selectpostSubsidy" :value="postSubsidy" id="postSubsidy" rule="R0000"></yhm-form-select>
        <yhm-form-select title="花费补助" @click="selectexpenseSubsidy" :value="expenseSubsidy" id="expenseSubsidy" rule="R0000"></yhm-form-select>
        <yhm-form-select title="养老基数" @click="selectpensionBase" :value="pensionBase" id="pensionBase" rule="R0000"></yhm-form-select>
        <yhm-form-select title="个人养老" subtitle="百分比" @click="selectpersonalPension" :value="personalPension" id="personalPension" rule="R0000"></yhm-form-select>
        <yhm-form-select title="单位养老" subtitle="百分比" @click="selectunitPension" :value="unitPension" id="unitPension" rule="R0000"></yhm-form-select>
        <yhm-form-select title="失业基数" @click="selectunemploymentBase" :value="unemploymentBase" id="unemploymentBase" rule="R0000"></yhm-form-select>
        <yhm-form-select title="个人失业" subtitle="百分比" @click="selectpersonalUnemployment" :value="personalUnemployment" id="personalUnemployment" rule="R0000"></yhm-form-select>
        <yhm-form-select title="单位失业" subtitle="百分比" @click="selectunitUnemployment" :value="unitUnemployment" id="unitUnemployment" rule="R0000"></yhm-form-select>
        <yhm-form-select title="工伤基数" @click="selectinjuryBase" :value="injuryBase" id="injuryBase" rule="R0000"></yhm-form-select>
        <yhm-form-select title="个人失业" @click="selectpersonalInjur" :value="personalInjur" id="personalInjur" rule="R0000"></yhm-form-select>


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
        idNo:'',
        calendar:'',
        birthday:'',
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


        sexPsd:[],
        calendarPsd:[],
        educationTypePsd:[],
        statePsd:[],
      }
    },
    computed:{
      birthdayLunar(){
        if(this.birthday){
          return formatCnDate(this.birthday)
        }else{
          return ''
        }
      }
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
        },
        add: (data) => {

        },
        look: (data) => {

        }
      })
    },
    methods:{
      selectDepartment(){//选择部门

      },
      selectPosition(){//选择职位

      },
      selectPost(){//选择岗位

      },
      selectbasicWage(){//选择基础工资

      },
      selectseniorityPay(){//选择工龄工资

      },
      selectpostSalary(){//选择岗位工资

      },
      selectpostSubsidy(){//选择岗位补助

      },
      selectexpenseSubsidy(){//选择花费补助

      },
      selectpensionBase(){//选择养老基数

      },
      selectpersonalPension(){//选择个人养老百分比

      },
      selectunitPension(){//选择单位养老百分比

      },
      selectunemploymentBase(){//选择失业基数

      },
      selectpersonalUnemployment(){//选择个人失业百分比

      },
      selectunitUnemployment(){//选择单位失业百分比

      },
      selectinjuryBase(){//选择工伤基数

      },
      selectpersonalInjur(){//选择个人失业

      },


      verifyPhone(){//验证手机号

      },
      verifyWeChat(){//验证微信

      },
      verifyidNo(){//验证身份证

      },

    }
  }
</script>

<style scoped>

</style>
