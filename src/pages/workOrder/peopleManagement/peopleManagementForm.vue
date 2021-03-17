<template>
  <div class="f_main">
    <yhm-formbody>
      <template #title>基本信息</template>
      <template #control>
<!--        <yhm-form-text title="用户名称" :value="userName" id="userName" rule="R0000"></yhm-form-text>-->
        <yhm-form-select title="关联用户" @click="selectClient" :value="userName" id="userName" tip="value"></yhm-form-select>

        <yhm-form-text title="用户编号" :value="userNum" id="userNum"></yhm-form-text>
<!--        <yhm-form-text title="部门名称" :value="department" id="department" rule="R0000"></yhm-form-text>-->
<!--        <yhm-form-text title="班组名称" :value="teamName" id="teamName" rule="R0000"></yhm-form-text>-->
        <yhm-form-radio title="类型" width="1" :select-list="teamNameList" :value="teamid" id="teamid"></yhm-form-radio>
<!--        <yhm-form-radio title="部门类型" width="1" :select-list="departmentList" :value="departid" id="departid"></yhm-form-radio>-->

      </template>
    </yhm-formbody>
    <yhm-formoperate>
      <template #btn>
<!--        <yhm-commonbutton value="刷新" icon="btnSave" :flicker="true" @call="initData()"></yhm-commonbutton>-->
        <yhm-commonbutton value="保存" icon="btnSave" :flicker="true" @call="save()"></yhm-commonbutton>
      </template>
    </yhm-formoperate>
  </div>
</template>

<script>
  import { formmixin } from '@/assets/form.js'
  import { guid, formatDate, formatTime } from '@/assets/common.js'
  export default {
    name: 'peopleManagementForm',
    mixins: [formmixin],
    data(){
      return{
        userid:'',//用户id
        userNum:'',//用户编号
        userName:'',//用户名称
        department:'',//部门名称
        departid:'0',//部门id
        teamName:'',//班组名称
        teamid:'0',//班组id
        teamNameList:[],//班组
        departmentList:[],//部门
      }
    },
    methods:{
      selectClient(){
        this.$dialog.OpenWindow({
          width: '950',
          height: '700',
            url: '/selectPerson?category=0&categoryBefore=1',
          title: '选择用户',
          closeCallBack: (data) => {
            if (data) {
              this.userName = data.name
              this.userid = data.id
            }
          }
        })
      },
      save(){
        let a = this.validator()
        if(a){
          let teamName = ''
          for(let i in this.teamNameList){
            if(this.teamNameList[i].num==this.teamid){
              teamName = this.teamNameList[i].showName
            }
          }
          let params = {
            id:this.id,
            userid:this.userid,//用户id
            teamid:this.teamid,//班组id
            departid:this.departid,//部门id
            userNum:this.userNum,//用户编号
            userName:this.userName,//用户名称
            teamName:teamName,//部门名称
            department:this.departmentList[this.departid].showName,//部门名称
          }
          this.ajaxJson({
            url: '/fix/fixTeam/save',
            data: params,
            call: (data)=>{
              if (data.type == 0) {
                this.$dialog.setReturnValue(this.id)
                this.$dialog.alert({
                  tipValue: data.message,
                  closeCallBack: () => {
                    this.$dialog.close()
                  }
                })
              } else{
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
      },
      initData () {
        let params = {
          id:this.id,
        }
        this.ajaxJson({
          url: '/fix/fixTeam/initForm',
          data: params,
          call: (data)=>{
            this.teamid = data.teamid//班组id
            this.departid = data.departid//部门id
            this.userNum = data.userNum//用户编号
            this.userName = data.userName//用户名称
            this.teamName = data.teamName//班组名称
            this.department = data.department//班组名称
            this.teamNameList = data.teamNamePsd.list
            this.departmentList = data.departmentPsd.list
          }
        })
      }
    },
    created () {
      this.setQuery2Value('id')
      this.setQuery2Value('type')
      if(this.type!='1'){
        this.initData()
      }else{
        this.ajaxJson({
          url: '/fix/fixTeam/initForm',
          data: {},
          call: (data)=>{
            if(data){
              this.teamid = data.teamid
              this.departid = data.departid
              this.teamName = data.teamNamePsd.list[data.teamid].showName
              this.department = data.departmentPsd.list[data.departid].showName
              this.teamNameList = data.teamNamePsd.list
              this.departmentList = data.departmentPsd.list
            }
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
