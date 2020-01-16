<template>
<div class="login_bg">
  <div class="login_top_article"></div>
  <div class="login_main">
    <div class="login_main_left"></div>
    <div class="login_main_box">
      <div class="login_content">
        <div class="loginQrCode">
          <div class="oaService">
            <img src="../../static/css/images/appServiceQrcode.png" alt="">
            <span>关注 OA 服务号</span>
          </div>
          <div class="oaAcc">
            <img src="../../static/css/images/appBindQrcode.png" alt="">
            <span>微信关联OA账号</span>
          </div>
        </div>
        <div class="login_logo">
          <img src="../../static/css/images/login/hplogo.png">
        </div>
        <div class="login_info" :class="{login_infoBg:loginCategory}">
          <div v-show="!loginCategory" class="login_name_pwd">
            <div class="login_head">
              <div>
                <div class="login_error">
                  <div v-show="error" class="login_error_message">{{errorMessage}}</div>
                </div>
                <img src="../../static/css/images/login/noimg.jpg">
                <div class="login_mask"></div>
              </div>
            </div>
            <div><yhm-text placeholder="请输入用户名" @keydownEnter="login" @focus="txtFocusEvent" before-icon="userIcon" :value="user" id="user" style="width: 310px;margin: 0 auto;" rule="R0000"></yhm-text></div>
            <div class="login_dynamicpassword">
              <a v-show="false" href="javascript:void(0);">获取动态口令</a>
            </div>
            <div class="login_mb"><yhm-text placeholder="请输入密码" @keydownEnter="login" @focus="txtFocusEvent" type="password" before-icon="pwdIcon" :value="pwd" id="pwd" style="width: 310px;margin: 0 auto" rule="R0000"></yhm-text></div>

            <div @click="login" class="login_btn login_mb"></div>
          </div>
          <div v-show="loginCategory" class="login_code">
            <div class="login_qr">
              <canvas class="canvas" ref="qrCode"></canvas>
              <div class="login_re_code" v-show="count === 0"></div>
              <div class="login_re_code_btn" @click="createCodeEvent" v-show="count === 0">点击刷新</div>
            </div>
          </div>
          <div v-show="loginCategory" class="login_tip">
            <div>微信扫码登录</div>
            <div class="login_red" v-show="count > 0">（二维码有效期剩余{{count}}秒）</div>
            <div class="login_red" v-show="count === 0">（二维码已过期，请刷新）</div>
          </div>
          <div class="login_switch disable_menu">
            <div v-show="loginCategory" @click="switchLoginEvent">账号密码登录</div>
            <div v-show="!loginCategory" @click="switchLoginEvent">微信扫码登录</div>
          </div>
        </div>
      </div>
      <div class="login_copyright">
        <span>版权所有 北京海派奥特经贸有限公司</span>
      </div>
    </div>
    <div class="login_main_right"></div>
  </div>
</div>
</template>

<script>
  import QRCode from "qrcode"
  import { formmixin } from '@/assets/form.js'
  export default {
    name: 'login',
    mixins: [formmixin],
    data(){
      return{
        loginKey:'',
        timer:null,
        timerLogin:null,
        loginCategory:true,
        url:"",
        count:300,
        error:false,
        errorMessage:'',
        user:'',
        pwd:''
      }
    },
    methods:{
      switchLoginEvent(){
        this.loginCategory = !this.loginCategory
      },
      createCodeEvent(){
        this.ajaxJson({
          url:'/SysManager/initScanCode',
          loading:'0',
          call:(data) => {
            this.count = 300
            this.url = data.val
            this.loginKey = data.id
            this.countdown()
          }
        })
      },
      countdown() {
        if (this.loginCategory) {
          clearInterval(this.timer)
          clearInterval(this.timerLogin)

          this.timer = setInterval(() => {
            if (this.count > 0) {
              this.count--
            }
            if (this.count === 0 && this.timer) {
              clearInterval(this.timer)
            }
          }, 1000)
          this.timerLogin = setInterval(() => {
            if(this.loginKey !== '') {
              let params = {
                loginKey:this.loginKey
              }
              this.ajaxJson({
                url: '/SysManager/getScanCodeLoginKey',
                data:params,
                loading:'0',
                call:(data) => {
                  if(data.openID !== ''){
                    let p = {
                      id:data.openID
                    }
                    this.ajaxJson({
                      url:'/SysManager/loginByWXID',
                      data:p,
                      loading:'0',
                      call:(resultData) =>{
                        if(resultData.type === 0){
                          this.$router.push('/home/desktop')
                        }
                      }
                    })
                    clearInterval(this.timerLogin)
                  }
                }
              })
            }
            if (this.count === 0) {
              clearInterval(this.timerLogin)
            }
          }, 3000)
        }
      },
      txtFocusEvent(){
        this.error = false
      },
      login(){
        if(this.user === '' && this.pwd === ''){
          this.error = true
          this.errorMessage = '请输入用户名和密码'
        }
        else if(this.user === '' && this.pwd !== ''){
          this.error = true
          this.errorMessage = '请输入用户名'
        }
        else if(this.user !== '' && this.pwd === ''){
          this.error = true
          this.errorMessage = '请输入密码'
        }
        if (this.validator()) {
          let params = {
            companyAccount:'hp',
            currentSkin:'default',
            loginName : this.user,
            loginPwd : this.pwd
          }
          this.ajaxJson({
            url:'/SysManager/login',
            data:params,
            call:(data) => {
              if(data.type === 0){
                this.$router.push('/home/desktop')
              }
              else{
                this.error = true
                this.errorMessage = data.message
              }
            }
          })
        }
      }
    },
    mounted () {
      this.url = new Date().getTime() + "A"
      this.countdown()
    },
    watch:{
      url(newVal){
        if(this.loginCategory) {
          QRCode.toCanvas(this.$refs.qrCode, newVal, function (error) {
          })
        }
      },
      loginCategory(newVal){
        if(!newVal){
          if(this.timer){
            clearInterval(this.timer)
            clearInterval(this.timerLogin)
          }
          this.user = ''
          this.pwd = ''
        }
        else{
          this.createCodeEvent()
        }
      }
    },
    created(){
      let userAgent = navigator.userAgent
      let ua = window.navigator.userAgent.toLowerCase();

      if(userAgent.indexOf('Chrome')>-1 || userAgent.indexOf("Safari") > -1 || ua.match(/MicroMessenger/i) == 'micromessenger'){
        if(window.top !== window){
          window.top.location = window.location
        } else {
          sessionStorage.setItem('______topID', '')
          sessionStorage.setItem('______detailID', '')
          this.createCodeEvent()
        }
      }else{
        this.$router.push('/onlyGoogle')
      }

    }
  }
</script>

<style scoped lang="less">
  .login_bg{ background:#e1e1e1 url(../../static/css/images/login/body_bg.jpg) repeat-x; position: absolute; left: 0; right: 0;top: 0; bottom: 0;}
  .login_top_article{ width:100%; height:10px; background-color:#2b84ce;}
  .login_main{ width:965px; height:800px; margin:0 auto; margin-top:80px; position:relative; display: flex;flex-direction: row}
  .login_main_left{width:30px; height:800px; background-image:url(../../static/css/images/login/loginLeft.png);}
  .login_main_box{flex:1; display: flex;flex-direction: column; align-items: center; justify-content: center}
  .login_main_right{width:30px; height:800px; background-image:url(../../static/css/images/login/loginRight.png);}
  .login_content{width:903px; height:430px; border:1px solid #e5e5e6; background-color:#fff; display: flex;flex-direction: row; align-items: center;
    position: relative;}
  .login_copyright{width:900px; height:30px; text-align:center; line-height:30px;}
  .login_copyright>span{font-size:12px; color:#8b8b8b; font-family:"宋体";}
  .login_logo{width:500px; height:380px;background:url(../../static/css/images/login/leftBg.jpg) no-repeat right;}
  .login_logo>img{padding:15px 0 0 20px}
  .login_info{flex: 1; height:351px; display: flex; flex-direction: column;}
  .login_infoBg{background:url(../../static/css/images/login/qrbg.png) center center no-repeat;}
  .login_code{flex: 1;  display: flex; align-items: flex-end;justify-content: center;}
  .login_qr{ border: 4px solid #49a9ea; width: 134px; height: 134px; border-radius: 4px; position: relative;}
  .login_qr>.canvas{ width: 134px !important; height: 134px !important; }
  .login_tip{height:91px; font-size: 14px;color: #666; display: flex;justify-content: flex-start;align-items: center; padding-top: 16px; flex-direction: column;}
  .login_switch{height: 44px; font-size: 14px;color: #666666; display: flex;justify-content: center;align-items: center; /*visibility: hidden;*/}
  .login_switch>div{cursor: pointer;}
  .login_switch>div:hover{color: #49a9ea;}
  .login_red{color: #F00; font-size: 12px;}
  .login_re_code{position: absolute;left: 0; top: 0; width: 134px; height: 134px; background-color: #FFFFFF; opacity: 0.9; z-index: 999;}
  .login_re_code_btn{position: absolute;left: 0; top: 0; width: 134px; height: 134px;z-index: 9999; display: flex;justify-content: center;align-items: center; font-size: 14px; font-weight: bold; cursor: pointer;}
  .login_name_pwd{flex: 1; display: flex; flex-direction: column; align-items: center;}
  .login_dynamicpassword{height: 20px; width: 310px; line-height: 20px; display: flex; align-items: flex-end; justify-content: flex-end;}
  .login_dynamicpassword>a{font-size: 12px; color: #555555; }
  .login_dynamicpassword>a:hover{color:#49a9ea;}
  .login_head{flex: 1; display: flex;justify-content: center; align-items: center;}
  .login_head>div{height: 104px; width: 104px; position: relative; background-color: #C0C0C0;}
  .login_head>div>img{height: 104px; width: 104px; border-radius: 50%;}
  .login_mask{width: 104px;height: 104px;position: absolute;top: 0;left: 0;background-image: url(../../static/css/images/login/userImg.png);}
  .login_btn{width:310px; height:41px; background-image:url(../../static/css/images/login/login.png); background-repeat:no-repeat; cursor:pointer;}
  .login_btn:hover{background-image:url(../../static/css/images/login/loginHover.png);}
  .login_error{height: 20px; line-height: 20px;width:310px; text-align: left;position: absolute; left: -102px; top:95px; }
  .login_error_message{color:#FF0000; font-size: 12px;}
  .login_mb{margin-bottom: 20px;}
  .loginQrCode{
    position: absolute;
    top: 170px;
    left: 90px;
    z-index: 999;
    //background-image: linear-gradient(180deg, #333 0%, #fff 100%);
    background-color: #fff;
    box-shadow: 0 0 10px #333;
    display: flex;
    justify-content: center;
    text-align: center;
    border-radius: 8px;
    width: 320px;
    div{
      display: flex;
      justify-content: center;
      width: 140px;
      flex-direction: column;
      margin: 0 30px;
      img{
        width: 110px;
        height: 110px;
        margin: 16px auto 8px;
      }
      span{
        color: #333;
        font-size: 14px;
        padding-bottom: 8px;
        line-height: 14px;
      }
    }
  }
</style>
