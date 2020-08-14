<template>
  <div class="theme">
    <div class="fonsizeIcon"><img src="../../../static/appStatic/images/countdown.svg" alt=""></div>
    <div class="fonsizeDistance">
      <div class="fonsizeCentent">您确定要登录</div>
      <div class="fonsizeCentent">北京海派奥特经贸有限公司</div>
      <div class="fonsizeCentent">办公系统吗？</div>
    </div>
    <div @click="confirmLoginEvent" class="publicShutDown">确定</div>
    <div @click="cancelEvent" class="publicCancel">取消</div>
  </div>
</template>

<script>
  import Qs from 'qs'
  export default {
    name: 'loginSc',
    data(){
      return{
        message:'',
        code:'',
        loginKey:''
      }
    },
    methods:{
      confirmLoginEvent(){
        if(this.code && this.loginKey){
          let params = {
            code:this.code
          }
          this.ajaxJson({
            url: "/SysManager/getUsersWXUserInfo",
            data: params,
            call: (data) => {
              if (data.errcode === '') {
                let p = {
                  openID:data.openid,
                  loginKey:this.loginKey
                }
                this.ajaxJson({
                  url:'/SysManager/updateScanCode',
                  data:p,
                  call:(resultData) => {//0登录成功 1用户不存在
                    if(resultData.type=='1'){
                      this.$router.push('/loginInexistence')
                    }else{
                      this.$router.push('/loginScSuccess')
                    }
                  }
                })
              }
              else{
                this.$router.push('/loginScCancel?category=1')
              }
            }
          })
        }
        else{
          this.$router.push('/loginScCancel?category=1')
        }
      },
      cancelEvent(){
        this.$router.push('/loginScCancel')
      }
    },
    created () {
      document.querySelector('body').setAttribute('style', 'margin: 0 auto; width: 100%; max-width: 750px;min-width: 300px; background:#fff; overflow-x: hidden;height: 100%;');
      let query = Qs.parse(location.search.substring(1))
      let code = query.code
      if(code){
        this.code = code
      }
      let loginKey = query.loginKey
      if(loginKey){
        this.loginKey = loginKey
      }
    }
  }
</script>

<style scoped>
  @import "../../../static/appStatic/accountPage.css";

</style>
