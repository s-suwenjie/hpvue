<template>
  <div class="f_main">
    <yhm-formbody>
      <template #title >
        <span>基本信息</span>
      </template>
      <template #control>
        <!--        <yhm-form-select placeholder="" title="推修单位" subtitle="名称" :value="unit" id="unit" rule="R0000" @click="unitSelect"></yhm-form-select>-->
        <yhm-form-select title="联系人" subtitle="" :value="person" id="person" rule="R0000" @click="personSelect"></yhm-form-select>
        <yhm-form-text title="备注" :value="remark" id="remark"></yhm-form-text>
        <!--        <yhm-form-radio title="结算类型" ref="typeRadio" :select-list="typeList" :value="type" id="type" rule="#"></yhm-form-radio>-->
        <!--        <yhm-form-date title="开始时间" :value="startDate" id="startDate" rule="R0000"></yhm-form-date>-->
        <!--        <yhm-form-date title="结束时间" :value="endDate" id="endDate" :min="startDate" rule="R0000"></yhm-form-date>-->
        <!--        &lt;!&ndash;<yhm-form-text title="合同" width="1" :value="companyID" id="companyID" ></yhm-form-text>&ndash;&gt;-->
        <!--        <yhm-formupload :ownerID="id" :value="fileList" id="fileList" title="上传合同" tag="fixCompany" rule="#"></yhm-formupload>-->
        <!--      -->
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
  import { formmixin } from '@/assets/form.js'
  export default {
    name: 'pushRepairAddPersonForm',
    mixins: [formmixin],
    data(){
      return{
        person:'',
        personID:'',
        remark:'',
      }
    },
    methods:{
      save(){
        let a = this.validator()
        if(this.compileID!=undefined&&this.compileID!=''){
          this.id = this.compileID
        }
        let params = {
          id:this.id,
          companyID:this.companyID,//推修主表id
          person:this.person,//联系人名称
          personID:this.personID,//联系人id
          remark:this.remark,//备注
        }
        console.log(params)
        if(a){
          this.ajaxJson({
            url: '/fix/fixCompanyPerson/save',
            data:params,
            call: (data) => {
              if(data.type=='0'){
                this.$dialog.alert({
                  tipValue:data.message,
                  closeCallBack: () => {
                    this.$dialog.setReturnValue(this.companyID)
                    this.$dialog.close();
                  }
                })
              }else{
                this.$dialog.alert({
                  width:'350',
                  alertImg: 'error',
                  tipValue:data.message,
                  closeCallBack: () => {
                  }
                })
              }
            }
          })
        }
      },
      personSelect(){
        this.$dialog.OpenWindow({
          width: '950',
          height: '700',
          url: '/selectPerson?category=1&categoryBefore=1',
          title: '选择联系人信息',
          closeCallBack: (data) => {
            if (data) {
              this.person = data.name
              this.personID = data.id
            }
          }
        })
      },
      initData () {
        if(this.compileID==''||this.compileID==undefined){
          return
        }
        this.ajaxJson({
            url: '/fix/fixCompanyPerson/initForm',
            data:{
              id:this.compileID
            },
            call: (data) => {
              console.log(data)
              this.person = data.person
              this.personID = data.personID
              this.remark = data.remark
            }
        })
      }
    },
    created () {
      this.setQuery2Value('compileID')
      this.setQuery2Value('companyID')
      this.initData()
    }
  }
</script>

<style scoped>

</style>
