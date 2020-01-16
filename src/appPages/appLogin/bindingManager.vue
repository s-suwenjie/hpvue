<template style="background-color: #fff">
  <div>
    <!--头部路由区域-->
    <div class="accTit">
      <div class="solidColor">账号绑定</div>
    </div>
    <!--内容区域-->
    <div class="containerApp">
      <div class="accountNumber">
        <div class="account">
          <span>姓名</span>
          <input class="numberInput" @focus="focusName" @blur="blurName($event)" type="text" placeholder="请输入姓名"
                 v-model="name"><span class="empty" v-show="emptyName">不能为空</span>
        </div>
        <div class="account">
          <span>+86</span>
          <input class="numberInputPhone" @focus="focusPhone" @blur="blurPhone($event)" type="text" placeholder="请输入手机号"
                 v-model="phone"><span class="empty" v-show="emptyPhone">格式错误</span>
        </div>
        <div class="account">
          <span>邮箱</span>
          <input class="numberInputEmail" @focus="focusEmail" @blur="blurEmail($event)" type="text" placeholder="请输入邮箱"
                 v-model="email"><span class="empty" v-show="emptyEmail">不能为空</span>
        </div>
        <div class="account">
          <span>部门</span>
          <input class="numberInputRemark" @focus="focusRemark" @blur="blurRemark($event)" type="text"
                 placeholder="请输入部门信息" v-model="remark"><span class="empty" v-show="emptyRemark">不能为空</span>
        </div>
        <div class="determine" @click="submitEvent">提交信息</div>
      </div>
      <div class="buttoImage">
        <img src="../../../static/appStatic/images/accountnumber.png" alt="">
      </div>
    </div>

  </div>

</template>

<script>
  import Qs from 'qs'
  import { guid } from '@/assets/common.js'
  import '@/assets/fontSize.js'

  export default {
    name: 'bindingManager',
    data () {
      return {
        name: '',
        phone: '',
        email: '',
        remark: '',

        emptyName: true,
        emptyPhone: false,
        emptyEmail: false,
        emptyRemark: false,

        category: '0',
        state:'0',
        openID: '',
        unionID: '',
      }
    },

    methods: {
      //提交信息
      submitEvent () {
        if(this.name === ''){
          this.emptyName = true
        }
        if(this.phone === ''){
          this.emptyPhone = true
        }
        if(this.email === ''){
          this.emptyEmail = true
        }
        if(this.remark === ''){
          this.emptyRemark = true
        }
        if(!this.emptyName && !this.emptyPhone && !this.emptyEmail && !this.emptyRemark){
          let params = {
            id: guid(),
            category: this.category,
            unionID: this.unionID,
            openID: this.openID,
            name: this.name,
            phone: this.phone,
            email: this.email,
            state:this.state,
            remark: this.remark
          }
          this.ajaxJson({
            url: '/SysManager/usersWxInfoSave',
            data: params,
            call: (data) => {
              if(data.type === 0){
                this.$router.push('/correct')
              }
            }
          })
        }
      },

      focusName () { //input事件开始
        $('.numberInput').addClass('bdb')
      },
      blurName (event) {
        $('.numberInput').removeClass('bdb')
        let value = event.target.value
        if (!/^[\s\S]*.*[^\s][\s\S]*$/.test(value)) {
          this.emptyName = true
          event.target.value = ''
        } else {
          this.emptyName = false
        }

      },
      focusPhone () {
        $('.numberInputPhone').addClass('bdb')
      },
      blurPhone (event) {
        $('.numberInputPhone').removeClass('bdb')
        let value = event.target.value
        if (!/^[\s\S]*.*[^\s][\s\S]*$/.test(value)) { //  /^1[3456789]\d{9}$/
          this.emptyPhone = true
          event.target.value = ''
        } else {
          this.emptyPhone = false
        }
      },
      focusEmail () {
        $('.numberInputEmail').addClass('bdb')
      },
      blurEmail (event) {
        $('.numberInputEmail').removeClass('bdb')
        let value = event.target.value
        if (!/^[\s\S]*.*[^\s][\s\S]*$/.test(value)) { // /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
          this.emptyEmail = true
          event.target.value = ''
        } else {
          this.emptyEmail = false
        }
      },
      focusRemark () {
        $('.numberInputRemark').addClass('bdb')
      },
      blurRemark (event) {
        $('.numberInputRemark').removeClass('bdb')
        let value = event.target.value
        if (!/^[\s\S]*.*[^\s][\s\S]*$/.test(value)) {
          this.emptyRemark = true
          event.target.value = ''
        } else {
          this.emptyRemark = false

        }
      },          //input事件结束

  },

    created () {
      document.querySelector('body').setAttribute('style', 'margin: 0 auto; width: 100%; max-width: 750px;min-width: 300px; background:#fff; overflow-x: hidden;height: 100%;');
      let query = Qs.parse(location.search.substring(1))
      let url = window.location.href
      let code = query.code
      if(code){
        let params = {
          code:code
        }
        this.ajaxJson({
          url:"/SysManager/getUsersWXUserInfo",
          data:params,
          call:(data) => {
            if(data.errcode === '') {
              this.openID = data.openid
              this.unionID = data.unionid
              let p = {
                id:this.openID
              }
              this.ajaxJson({
                url:"/SysManager/getUsersWxInfoCountByOpenID",
                data:p,
                call:(resultData) => {
                  if(resultData.type !== 0){
                    this.$router.push('/correct?id=1')
                  }
                }
              })
            }
            else{
              this.$router.push('/failure')
            }
          }
        })
      }
    }
  }
</script>

<style scoped lang="less">
  /*html{*/
  /*  background-color: #fff !important;*/
  /*}*/
  @import "../../../static/appStatic/accountNumber.css";
</style>
