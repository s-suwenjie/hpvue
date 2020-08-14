<template>
  <div>
    <div class="f_main mb16">
      <yhm-formbody>
        <template #title>基本信息</template>
        <template #control>
          <yhm-form-text title="名称" :value="person" id="person" rule="R0000"></yhm-form-text>
          <yhm-form-text title="联系电话" :value="phone" id="phone" rule="R4000"></yhm-form-text>
          <yhm-form-text title="车牌号" :value="vehicleNumber" id="vehicleNumber" rule="R0000"></yhm-form-text>
          <yhm-form-date title="注册日期" :no-edit="true" :value="workDate" id="workDate" rule="R0000"></yhm-form-date>
          <yhm-form-textarea title="备注" :value="remark" id="remark"></yhm-form-textarea>
        </template>
      </yhm-formbody>
    </div>
    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn>
        <yhm-commonbutton value="保存" icon="btnSave" :flicker="true" @call="save(0)"></yhm-commonbutton>
      </template>
    </yhm-formoperate>
  </div>
</template>

<script>
  import { formmixin } from '@/assets/form.js'
  export default {
    name: 'wxMemberForm',
    mixins: [formmixin],
    data() {
      return {
        personID:'',                  //联系人ID
        person:'',                    //联系人名称
        phone:'',                     //手机号码
        vehicleID:'',                 //车辆ID
        vehicleNumber:'',             //车牌号
        workDate:'',                  //注册时间
        remark:'',                    //备注
      }
    },
    methods:{

    },
    created () {
      this.init({
        url: '/wx/wxMember/initForm',
        all: (data) => {
          // this.category = data.categoryPsd.value
          // this.categoryList = data.categoryPsd.list
          // this.expirationCategory = data.expirationCategoryPsd.value
          // this.expirationCategoryList = data.expirationCategoryPsd.list
        },
        add: (data) => {

        },
        look: (data) => {
          // this.name = data.name
          // this.category = data.category
          // this.money = data.money
          // this.expiration = data.expiration
          // this.expirationCategory = data.expirationCategory
          // this.url = data.url
          // this.remark = data.remark
        }
      })
    }
  }
</script>

<style scoped>

</style>
