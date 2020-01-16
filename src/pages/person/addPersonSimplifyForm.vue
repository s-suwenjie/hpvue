<template>
  <div class="f_main">
    <yhm-formbody>
      <template #title>基本信息</template>

      <template #control>
        <yhm-form-radio title="单位类型" :select-list="categoryList" @call="categoryEvent" :value="category" id="category"></yhm-form-radio>
        <yhm-form-radio title="性别" :select-list="sexList" :value="sex" id="sex"></yhm-form-radio>
        <yhm-form-radio title="是否" subtitle="重要联系人" :select-list="importantList" :value="important" id="important"></yhm-form-radio>
<!--        <yhm-form-radio title="政治面貌" :show="isThisUnit" :select-list="politicsStatusList" :value="politicsStatus" id="politicsStatus"></yhm-form-radio>-->
        <yhm-form-text title="姓名" :value="name" id="name" ref="name" @repeatverify="repeatVerifyEvent" rule="R7000"></yhm-form-text>
        <yhm-form-text title="手机号码" :value="phone" id="phone" tip="value" @repeatverify="repeatVerifyEvent" rule="R4000"></yhm-form-text>
<!--        <yhm-form-select title="所属公司" v-if="isThisUnit" @click="selectUnit" tip="value" :value="unit" id="unit" rule="R0000" ></yhm-form-select>-->
<!--        <yhm-form-text title="所属部门" :show="isThisUnit" :value="department" id="department" placeholder="请在部门管理中调整所属部门" no-edit="1"></yhm-form-text>-->
<!--        <yhm-form-text title="身份证号" @input="isNoEvent" @repeatverify="repeatVerifyEvent" tip="value" :value="idNo" id="idNo" rule="R5000"></yhm-form-text>-->
<!--        <yhm-form-text title="籍贯" :value="nativePlace" id="nativePlace" rule="R0000"></yhm-form-text>-->
<!--        <yhm-form-radio title="生日历法" @call="calendarEvent" :select-list="calendarList" :value="calendar" id="calendar"></yhm-form-radio>-->
<!--        <yhm-form-text title="公历生日" :value="birthday" id="birthday" rule="R0000" no-edit="1"></yhm-form-text>-->
<!--        <yhm-form-text title="农历生日" :value="birthdayLunar" id="birthdayLunar" rule="R0000" no-edit="1"></yhm-form-text>-->
<!--        <yhm-form-text title="属相" :value="zodiac" id="zodiac" rule="R0000" no-edit="1"></yhm-form-text>-->
<!--        <yhm-form-text title="星座" :value="constellation" id="constellation" rule="R0000" no-edit="1"></yhm-form-text>-->
<!--        <yhm-form-select title="民族" @click="nationEvent" tip="value" :value="nation" id="nation"></yhm-form-select>-->
<!--        <yhm-form-select title="血型" @click="bloodTypeEvent" tip="bloodType" :value="bloodType" id="bloodType" ></yhm-form-select>-->
<!--        <yhm-form-textarea title="备注" :show="isThisUnit" :value="remarkStr" id="remarkStr"></yhm-form-textarea>-->
        <yhm-form-check title="标签" :show="!isThisUnit" :select-list="tagList" submit-value="tagSubmit" :ownerID="id" :tableName="'1029'" :value="tag" id="tag" rule="#" width="1"></yhm-form-check>
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
  import { guid } from '@/assets/common.js'
  import { formmixin } from '@/assets/form.js'
  export default {
    name: 'addPersonSimplifyForm',
    mixins: [formmixin],
    data() {
      return {
        id: '',
        ownerID: '',
        categoryList: [] ,
        category: '',
        sexList: [],
        sex: '',
        name: '',
        phone: '',
        importantList: [],
        important: '',
        abbreviation: '',
        remarkStr: '',
        // department: '',
        // departmentID: '',
        unit: '',
        unitID: '',
        // idNo: '',
        // idNoID: '',
        // nativePlace: '',
        // calendarList: [],
        // calendar: '',
        // politicsStatusList: [],
        // politicsStatus: '',
        // birthday: '',
        // birthdayLunar: '',
        // zodiac: '',
        // zodiacID: '',
        // constellation: '',
        // constellationID: '',
        // nation: '',
        // nationID: '',
        // bloodType: '',
        // bloodTypeID: '',
        tagList: [],
        tag: [],
        tagSubmit:[],
        isThisUnit: true,
      }
    },
    methods: {
      /* 所属公司 */
      selectUnit(){
        this.$dialog.OpenWindow({
          width: 950,
          height: 692,
          url: '/selectUnit?categoryBefore=1&category=' + this.category,
          title: '选择单位',
          closeCallBack: (data)=>{
            if(data){
              this.unit = data.name
              this.unitID = data.id
            }
          }
        })
      },
      /* 选择民族 */
      // nationEvent(){
      //   let name = '69'
      //   this.$dialog.OpenWindow({
      //     width: 950,
      //     height: 603,
      //     url: '/selectDic?name=' + name,
      //     title: '选择民族',
      //     closeCallBack: (data) => {
      //       if(data){
      //         this.nation = data.showName
      //         this.nationID = data.id
      //       }
      //     }
      //   })
      // },
      /* 选择血型 */
      // bloodTypeEvent(){
      //   let name = '71'
      //   this.$dialog.OpenWindow({
      //     width: 950,
      //     height: 603,
      //     url: '/selectDic?name=' + name,
      //     title: '选择血型',
      //     closeCallBack: (data) => {
      //       if(data){
      //         this.bloodType = data.showName
      //         this.bloodTypeID = data.id
      //       }
      //     }
      //   })
      // },
      /* 获取生日属相等 */
      // isNoEvent(){
      //   if(this.idNo.length === 18){
      //     let params = {
      //       idNo: this.idNo,
      //       calendar: this.calendar
      //     }
      //     this.ajaxJson({
      //       url: '/Basic/getDataByCalendarAndBirthdayVue',
      //       data: params,
      //       call: (data)=>{
      //         this.birthday = data.birthday
      //         this.birthdayLunar = data.birthdayLunar
      //         this.zodiac = data.zodiac
      //         this.zodiacID = data.zodiacID
      //         this.constellation = data.constellation
      //         this.constellationID = data.constellationID
      //       }
      //     })
      //   }
      // },
      /* 切换生日历法 */
      // calendarEvent(){
      //   if(this.calendar === '0'){
      //     this.calendar = '0'
      //     this.isNoEvent()
      //   }else{
      //     this.calendar = '1'
      //     this.isNoEvent()
      //   }
      // },
      /* 单位类型切换 */
      categoryEvent(){
        if(this.category === '1'){
          this.isThisUnit = false
        }else {
          this.isThisUnit = true
        }
      },
      /* 验证 */
      repeatVerifyEvent() {
        if(this.category === '1'){
          if (this.name && this.phone){
            let params = {
              id:this.id,
              name: this.name,
              phone: this.phone,
            }
            this.ajaxJson({
              url: '/Basic/verifyPersonVueName',
              data: params,
              loading: "0",
              call: (data) => {
                if (data.type === 1){
                  this.$refs.name.errorEvent('已存在！！！')
                }
              }
            })
          }
        }else {
          if (this.name && this.phone){
            let params = {
              id:this.id,
              name: this.name,
              phone: this.phone,
            }
            this.ajaxJson({
              url: '/Basic/verifyPersonVueName',
              data: params,
              loading: "0",
              call: (data) => {
                if (data.type === 1) {
                  this.$refs.name.errorEvent("用户名已存在")
                }
              }
            })
          }
        }
      },
      async isRepeatVerifyEvent(){
        let params = {
          name: this.name,
          phone: this.phone,
          id: this.id
        }
        let result = await this.ajaxAsync({
          url: '/Basic/verifyPersonVueName',
          data: params,
          loading:"0"
        })
        if(result.type === 1){
          this.$refs.name.errorEvent('联系人已存在')
          return false
        }
        return true
      },
      async save(){
        let a = await this.isRepeatVerifyEvent()
        let b = this.validator()
        if(a && b){
          let params = {
            id: this.id,
            category: this.category,
            sex: this.sex,
            important: this.important,
            // politicsStatus: this.politicsStatus,
            name: this.name,
            phone: this.phone,
            // unit: this.unit,
            // unitID: this.unitID,
            // department: this.department,
            // idNo: this.idNo,
            // nativePlace: this.nativePlace,
            // calendar: this.calendar,
            // birthday: this.birthday,
            // birthdayLunar: this.birthdayLunar,
            tagList: this.tagSubmit,
            // zodiacID: this.zodiacID,
            // zodiac: this.zodiac,
            // constellation: this.constellation,
            // constellationID: this.constellationID,
            // bloodType: this.bloodType,
            // bloodTypeID: this.bloodTypeID,
            // nation: this.nation,
            // nationID: this.nationID
          }
          this.ajaxJson({
            url: '/Basic/addPersonSelectSave',
            data: params,
            call: (data)=>{
              if(data.type === 0){
                this.$dialog.setReturnValue(this.id)
                this.$dialog.alert({
                  tipValue: data.message,
                  closeCallBack: ()=>{
                    this.$dialog.close()
                  }
                })
              }else{
                this.$dialog.alert({
                  alertImg: 'warn',
                  tipValue: data.message
                })
              }
            }
          })
        }
      },
      initData(){
        this.init({
          url: '/Basic/addPersonSelectForm',
          all: (data)=>{
            this.categoryList = data.categoryPsd.list  //单位
            this.category = data.categoryPsd.value
            this.sexList = data.sexPsd.list   //性别
            this.sex = data.sexPsd.value
            this.importantList = data.importantPsd.list  //重要联系人
            this.important = data.importantPsd.value
            // this.politicsStatusList = data.politicsStatusPsd.list  //政治面貌
            // this.politicsStatus = data.politicsStatusPsd.value
            this.name = data.name   //姓名
            this.phone = data.phone   //手机号码
            this.unit = data.unit   //单位
            this.unitID = data.unitID
            // this.department = data.department  //所属部门
            // this.departmentID = data.departmentID
            // this.idNo = data.idNo   //身份证号
            // this.idNoID = data.idNoID
            // this.nativePlace = data.nativePlace   //籍贯
            // this.calendarList = data.calendarPsd.list  //生日历法
            // this.calendar = data.calendarPsd.value
            // this.birthdayLunar = data.birthdayLunar  //农历生日
            this.tagList = data.tagPsd.list  //标签
            this.tag = data.tagPsd.value

            this.isThisUnit = this.category != '1';
          },
          add: (data)=>{
            this.id = guid()
          },
          look: (data)=>{
            // this.birthday = data.birthday   //公历生日
            // this.zodiac = data.zodiac   //属相
            // this.zodiacID = data.zodiacID
            // this.constellation = data.constellation  //星座
            // this.constellationID = data.constellationID
            // this.nation = data.nation   //民族
            // this.nationID = data.nationID
            // this.bloodType = data.bloodType  //血型
            // this.bloodTypeID = data.bloodTypeID
          }
        })
      }
    },
    created () {
      this.initData()
    }
  }
</script>

<style scoped>

</style>
