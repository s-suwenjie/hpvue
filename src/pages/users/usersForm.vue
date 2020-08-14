<template>
  <div class="f_main">
      <yhm-formbody>
        <template #title>基本信息</template>
        <template #control>
          <div class="form_format">
            <div>
              <yhm-form-select ref="person" title="用户名称" :value="person" id="person" rule="R0000" @click="selectPersonEvent"></yhm-form-select>
              <yhm-form-text ref="loginName" @repeatverify="loginNameVerifyEvent" before-icon="userIcon"  title="登录名称" :value="loginName" id="loginName" rule="R0000"></yhm-form-text>
            </div>
            <div>
              <yhm-formimage :big="2" :value="avatar" id="avatar" error-url="/HtmlStatic/images/onhead/noimg.jpg" discription="这里显示默认图片<br>用户可以再个人设置中上传头像"></yhm-formimage>
            </div>
          </div>
          <yhm-form-text v-if="isAdd" before-icon="pwdIcon" title="登录密码" :value="loginPwd" id="loginPwd" rule="R0000" type="password"></yhm-form-text>
          <yhm-form-zh-text-checkbox v-if="!isAdd" @clickCheckBox="clickLoginPwdReset" title="登录密码" check-title="重置密码" before-icon="pwdIcon" :value="loginPwd" id="loginPwd" :check-value="loginPwdReset" check-value-id="loginPwdReset" rule="R0000" type="password"></yhm-form-zh-text-checkbox>
          <yhm-form-select @clear="clearOpenEvent" title="OpenID" :value="open" id="open" @click="usersWxInfoSelect"></yhm-form-select>
          <yhm-form-radio title="仅二维码" subtitle="登录" :select-list="onlyQrCodeLoginList" :value="onlyQrCodeLogin" id="onlyQrCodeLogin"></yhm-form-radio>
          <yhm-form-radio title="用户状态" :select-list="stateList" :value="state" id="state"></yhm-form-radio>
        </template>
      </yhm-formbody>
      <div class="f_split"></div>

      <yhm-formbody>
        <template #title>权限信息</template>
        <template #control>
          <yhm-form-privilege :details="details"></yhm-form-privilege>

          <div class="f_buttom"></div>
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
  import { guid,accAdd,accMul,formatTime } from '@/assets/common.js'
  import { formmixin } from '@/assets/form.js'
  export default {
    name: "usersForm",
    mixins: [formmixin],
    data(){
      return{
        details:[],
        // details:[
        //   {id:'A1',name:'个人办公',details:[
        //       {id:'B1',name:'个人办公',details:[
        //           {id:'C1',name:'修改密码',details:[]},
        //           {id:'C2',name:'我的操作',details:[]},
        //           {id:'C3',name:'我的审批',details:[]}
        //         ]},
        //       {id:'B2',name:'常用工具',details:[
        //           {id:'C4',name:'汇率彩讯',details:[]},
        //           {id:'C5',name:'收据套打',details:[]},
        //           {id:'C6',name:'测试菜单',details:[]}
        //         ]}
        //     ]},
        //   {id:'A2',name:'财务管理',details:[
        //       {id:'B3',name:'账号管理',details:[
        //           {id:'C5',name:'对公账号',details:[]},
        //           {id:'C6',name:'对私账号',details:[]}
        //         ]},
        //       {id:'B4',name:'资金管理',details:[
        //           {id:'C5',name:'收入',details:[]},
        //           {id:'C6',name:'支出',details:[]}
        //         ]}
        //     ]}/*,
        //   {id:'A3',name:'财务管理',details:[]},
        //   {id:'A4',name:'财务管理',details:[]},
        //   {id:'A5',name:'财务管理',details:[]},
        //   {id:'A6',name:'财务管理',details:[]},
        //   {id:'A7',name:'财务管理',details:[]},
        //   {id:'A8',name:'财务管理',details:[]},
        //   {id:'A9',name:'财务管理',details:[]},
        //   {id:'A10',name:'财务管理',details:[]},
        //   {id:'A11',name:'财务管理',details:[]},*/
        //   /*{id:'A12',name:'财务管理',details:[]},*/
        // ],

        personID:'',//用户ID
        person:'',//用户
        avatar:'',//头像
        loginName:'',//登录名称
        loginPwd:'',//登录密码
        loginPwdReset:'0',//重置密码（0表示不重置，1表示重置）
        openID:'',//用户OpenID对应的ID
        open:'',//用户OpenID
        onlyQrCodeLogin:'1',    //仅二维码登录（0二维码登录，1不限制）
        state:'0',//用户状态（0启用，1禁用）

        onlyQrCodeLoginList:[],
        stateList:[],
        name: ''
      }
    },
    methods:{
      clickLoginPwdReset(){
        if(this.loginPwdReset){
          this.loginPwd = '123456'
        }
      },
      //清空选择的openID
      clearOpenEvent(){
        this.openID = ''
      },
      loginNameVerifyEvent(){
        let params = {
          id:this.id,
          loginName:this.loginName
        }
        this.ajaxJson({
          url:"/SysManager/isExistByLoginNameUsers",
          data:params,
          loading:"0",
          call:(data) =>{
            if(data.type === 0){//说明存在，调用控件验证显示规则
              this.$refs.loginName.errorEvent(data.message)
            }
          }
        })
      },
      async isLoginNameVerifyEvent(){
        if(this.loginName !== ''){
          let params = {
            id:this.id,
            loginName:this.loginName
          }
          let result = await this.ajaxAsync({
            url: "/SysManager/isExistByLoginNameUsers",
            data: params,
            loading: "0"
          })
          if (result.type === 0) {//说明存在，调用控件验证显示规则
            this.$refs.loginName.errorEvent(result.message)
            return false
          }
        }
        return true
      },
      async isPersonIDIsUse(){
        if(this.personID !== '') {
          let params = {
            id:this.id,
            personID: this.personID
          }
          let result = await this.ajaxAsync({
            url: "/SysManager/getPersonIsUseUsers",
            data: params,
            loading: "0"
          })
          if (result.type === 0) {//说明存在，调用控件验证显示规则
            this.$refs.person.errorEvent(result.message)
            return false
          }
        }
        return true
      },
      selectPersonEvent(){
        this.$dialog.OpenWindow({
          url: '/selectPerson?category=0&categoryBefore=1',
          width: 950,
          height: 690,
          closeCallBack: (data) => {
            if(data){
              this.person = data.name
              this.personID = data.id

              let params = {
                id:this.personID
              }
              this.ajaxJson({
                url:"/SysManager/getPersonIsUseUsers",
                data:params,
                loading:"0",
                call:(data) =>{
                  if(data.type === 0){//说明存在，调用控件验证显示规则
                    this.$refs.person.errorEvent(data.message)
                  }
                }
              })
          }
          }
        })
      },
      usersWxInfoSelect () {
        this.$dialog.OpenWindow({
          url: '/selectUsersWxInfo',
          width: '850',
          height: '600',
          title: '选择openID',
          closeCallBack: (data) => {
            if(data){
              this.openID = data.unionID
              this.open = data.name + '（' + data.openID + '）'
            }
          }
        })
      },
      async save(){
        var a = this.validator()
        var b = await this.isPersonIDIsUse()
        var c = await this.isLoginNameVerifyEvent()
        if (a && b && c) {
          var details = []
          for(var i = 0; i < this.details.length; i++){
            let top = this.details[i]
            for(var j = 0; j < top.details.length; j++){
              let left = top.details[j]
              for(var k = 0; k < left.details.length; k++){
                let detail = left.details[k]
                for(var m = 0; m < detail.details.length; m++){
                  let insertDate = new Date(accAdd(new Date().getTime(), accMul(details.length, 1000)))
                  let privilege = {
                    id:guid(),
                    insertDate: formatTime(insertDate),
                    usersID:this.id,
                    appID:detail.id,
                    authID:detail.details[m]
                  }
                  details.push(privilege)
                }
              }
            }
          }
          let params = {
            id:this.id,
            personID:this.personID,
            person:this.person,
            avatar:this.avatar,
            loginName:this.loginName,
            loginPwd:this.loginPwd,
            loginPwdReset:this.loginPwdReset,
            openID:this.openID,
            open:this.open,
            onlyQrCodeLogin:this.onlyQrCodeLogin,
            state:this.state,
            privilege:details
          }

          this.ajaxJson({
            url: '/SysManager/saveUsers',
            data: params,
            call: (data) => {
              if (data.type == 0) {
                this.$dialog.setReturnValue(this.id)
                this.$dialog.alert({
                  tipValue: data.message,
                  closeCallBack: () => {

                  }
                })
              }
            }
          })
        }
      }
    },
    created () {

      // this.person = '程 序员'
      // this.personID = 'E24F22F2-96F1-45B2-AFF9-1BE43E1EEB42'
      //


      this.init({
        url: '/SysManager/initUsersForm',
        all: (data) => {
          //添加查看的时候都需要的代码
          this.onlyQrCodeLoginList = data.onlyQrCodeLoginPsd.list
          this.onlyQrCodeLogin = data.onlyQrCodeLoginPsd.value
          this.stateList = data.statePsd.list
          this.state = data.statePsd.value
          this.details = data.details
        },
        add: (data) => {
          //添加时独有的代码
        },
        look: (data) => {
          //查看时独有的信息
          this.personID = data.personID
          this.person = data.person
          this.avatar = data.avatar
          this.loginName = data.loginName
          this.loginPwd = data.loginPwd
          this.openID = data.openID
          this.open = data.open
        }
      })
    }
  }
</script>

<style scoped>

</style>
