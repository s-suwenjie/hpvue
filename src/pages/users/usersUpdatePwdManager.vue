<template>
  <div>
    <yhm-manager-empty-page>
      <!--导航条-->
      <template #navigation>个人办公&nbsp;&gt;&nbsp;个人办公&nbsp;&gt;&nbsp;修改密码</template>
      <template #customize>
          <div class="fd_center mt50">
            <div style="width: 500px">
              <yhm-form-text ref="oldPwd" title="原密码" @repeatverify="pwdVerifyEvent" type="password" before-icon="pwdIcon" :value="oldPwd" id="oldPwd" rule="R0000"></yhm-form-text>
              <yhm-form-text title="新密码" type="password" before-icon="pwdIcon" :value="newPwd" id="newPwd" rule="R0000"></yhm-form-text>
              <yhm-form-text title="确认" type="password" subtitle= "原密码" before-icon="pwdIcon" :value="newPwdRe" id="newPwdRe" :compared="newPwd" repeatMessage="确认密码和新密码不一致" rule="R0000"></yhm-form-text>
            </div>
          </div>
          <div class="fd_center">
            <yhm-commonbutton value="保存新密码" icon="btnSave" :flicker="true" @call="save()"></yhm-commonbutton>
          </div>
      </template>
    </yhm-manager-empty-page>
  </div>
</template>

<script>
  import { managercustommixin } from '@/assets/managercustom.js'
  export default {
    name: 'usersUpdatePwdManager',
    mixins: [managercustommixin],
    data(){
      return{
        oldPwd:'',
        newPwd:'',
        newPwdRe:''
      }
    },
    methods:{
      pwdVerifyEvent(){
        let params = {
          oldPwd:this.oldPwd
        }
        this.ajaxJson({
          url:"/SysManager/checkPasswordUsers",
          data:params,
          loading:"0",
          call:(data) =>{
            if(data.type === 0){//说明存在，调用控件验证显示规则
              this.$refs.oldPwd.errorEvent(data.message)
            }
          }
        })
      },
      async isPwdVerifyEvent(){
        if(this.oldPwd !== '') {
          let params = {
            oldPwd: this.oldPwd
          }
          let result = await this.ajaxAsync({
            url: "/SysManager/checkPasswordUsers",
            data: params,
            loading: "0"
          })
          if (result.type === 0) {//说明存在，调用控件验证显示规则
            this.$refs.oldPwd.errorEvent(result.message)
            return false
          }
        }
        return true
      },
      async save(){
        let a = this.validator()
        let b = await this.isPwdVerifyEvent()
        if (a && b) {
          let params = {
            oldPwd:this.oldPwd,
            newPwd:this.newPwd
          }
          this.ajaxJson({
            url:"/SysManager/updatePasswordUsers",
            data:params,
            call:(data) =>{
              if(data.type === 0){//说明存在，调用控件验证显示规则
                this.$dialog.alert({
                  tipValue:data.message
                })
              }
              else if(data.type === 1){
                this.$dialog.alert({
                  tipValue:data.message,
                  alertImg:'warn'
                })
              }
            }
          })
        }
      }
    }
  }
</script>

<style scoped>

</style>
