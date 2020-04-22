<template>
  <div>
    <div id="topmenu">
      <div class="topmenu">
        <div class="logo">
          <img src="/HtmlStatic/images/HPlogo.svg" alt="">

          <!--<img src="/HtmlStatic/Images/CompanyLogo/YHMLogo.png"/><span>元亨机械</span>-->
<!--          <div class="logoIcon">-->
<!--            <img src="/HtmlStatic/images/logo.png">-->
<!--          </div>-->
<!--          <span>北京海派</span>-->

        </div>
        <div class="topmenu_nav">
          <ul id="menu">
            <li v-for="(item ,index) in topMenu" :key="index" :class="{topMenuClass:item.id === topID}">
              <a href="javascript:void(0);" @click="topMenuClickEvent(item.id)">
                <img :src="'/UploadFile/TopMenu/' + item.iconUrl">
                <span>{{item.name}}</span>
              </a>
            </li>
          </ul>
        </div>
        <div class="userstatus">
          <div class="userTop">
            <div class="avatar">
              <img :src="headImg" :onerror="defaultImg" />
            </div>
            <p class="userinfo">{{loginName}}</p>
            <p @click="ConfirmLogout" class="userOff"></p>
          </div>
        </div>
      </div>
    </div>
    <div class="mainbox">
      <div id="leftmenu">
        <div class="SiteLeftDiv">
          <div class="desktopDiv">
            <span @click="desktop">我的桌面</span>
            <p class="desktopIcon"></p>
          </div>
        </div>

        <div v-for="item in leftMenu" :key="item.id" class="SiteLeftDiv">
          <div class="LeftMainMenu" @click="ClickMainMenu($event)" :id="item.id" :class="{SiteLeftParentA:item.id === leftID,SiteLeftParentB:item.id !== leftID}">
            {{item.name}}
          </div>
          <div class="SiteLeftChild" v-show="item.id === leftID">
            <ul>
              <li v-for="(info,index) in item.details" :key="index" :id="info.id">
                <a href="javascript:void(0);"  @click="ClickItemMenu(info);" :class="{leftMenuClass:info.id === detailID}">
                  <img :src="'/UploadFile/LeftMenu/' + info.iconUrl">
                  <span>{{info.name}}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>


      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>

  import Qs from 'qs'

  export default {
    name: 'app',
    data () {
      return {
        topID:'',
        topMenu:[],
        leftID:'',
        leftMenu:[],
        headImg:'',
        loginName:'',
        detailID:'',
        defaultImg: 'this.src="' + require('../../static/css/images/login/noimg.jpg') + '"'
      }
    },
    created () {



      let query = Qs.parse(location.search.substring(1))
      let url = window.location.href
      let queryTop = query.topID
      if(queryTop){
        sessionStorage.setItem('______topID', queryTop)
        let topParam = '?topID=' + queryTop
        let newUrl = url.replace(topParam, '')
        window.history.pushState({}, 0, newUrl)
      }
      let queryDetail = query.detailID
      if(queryDetail){
        sessionStorage.setItem('______detailID', queryDetail)
        let detailParam = '?detailID=' + queryDetail
        let newUrl = url.replace(detailParam, '')
        window.history.pushState({}, 0, newUrl)
      }


      let detailID = sessionStorage.getItem('______detailID') || ''
      let topID = sessionStorage.getItem('______topID') || ''
      this.detailID = detailID
      this.topID = topID
      let params = {
        topID:topID
      }
      this.ajaxJson({
        url: '/SysManager/getAppAll',
        data:params,
        call: (data) => {
          this.topMenu = data.topMenu
          this.leftMenu = data.leftMenu
          this.headImg = data.headImg
          this.loginName = data.loginName
          sessionStorage.setItem('____currentUser',data.loginName)
          sessionStorage.setItem('____currentUserID',data.currentUserID)
          if(this.topID === ''){
            this.topID = this.topMenu[0].id
            sessionStorage.setItem('______topID', this.topID)
          }
          if(this.leftID === ''){
            if(this.detailID === '') {
              this.leftID = this.leftMenu[0].id
            }
            else{
              var sign = false
              for (var i = 0; i < this.leftMenu.length; i++){
                for (var j = 0; j < this.leftMenu[i].details.length; j++) {
                  if(this.leftMenu[i].details[j].id === this.detailID){
                    this.leftID = this.leftMenu[i].details[j].parentID
                    sign = true
                    break
                  }
                }
                if(sign){
                  break
                }
              }
            }
          }

        }
      })
    },
    methods: {
      //顶部菜单点击事件
      topMenuClickEvent (id) {
        if(id !== this.topID){
          sessionStorage.setItem('______topID', id)
          this.topID = id
        }
        let params = {
          topID:id
        }
        this.ajaxJson({
          url: '/SysManager/getAppLeftByTop',
          data:params,
          call: (data) => {
            this.leftMenu = data
            this.leftID = this.leftMenu[0].id
          }
        })
        this.desktop()
      },
      //回到桌面
      desktop () {
        this.detailID = ''
        sessionStorage.setItem('______detailID','')
        this.$router.push('/home/desktop')
      },
      //左侧大菜单的闭合
      ClickMainMenu (event) {
        var obj = event.currentTarget
        var open = $(obj).attr('open')
        var className = ''
        if (open === 0) {
          open = 1
          className = 'SiteLeftParentB'
          $(obj).removeClass('SiteLeftParentA')
          $(obj).next().slideUp('1000')
        } else {
          open = 0
          className = 'SiteLeftParentA'
          $('.LeftMainMenu').each(function () {
            $(this).attr('open', '1')
            $(this).removeClass('SiteLeftParentA')
            $(this).removeClass('SiteLeftParentB')
            $(this).addClass('SiteLeftParentB')
          })
          $(obj).removeClass('SiteLeftParentB')
          $('.SiteLeftChild').slideUp('1000')
          $(obj).next().slideDown('1000')
        }
        $(obj).attr('open', open)
        $(obj).addClass(className)
      },
      ConfirmLogout () {
        this.ajaxJson({
          url:'/SysManager/getUserState',
          loading:'0',
          call:(data) => {
            if(data.type === 0){
              this.$dialog.confirm({
                  width: 300,
                  tipValue: '确定退出系统吗?',
                  btnValueOk: '确定退出',
                  okCallBack:  () => {
                    this.ajaxJson({
                      url:'/SysManager/logout',
                      loading:'0',
                      call:(data) => {
                        this.$router.push('/login')
                      }
                    })
                  }
                })
            }
          }
        })
      },
      ClickItemMenu (item) {
        if(item.id !== this.detailID) {

          let params = {
            id: item.id
          }
          this.ajaxJson({
            url: '/SysManager/getAppLeftPurview',
            data: params,
            call: (data) => {
              if (data.type === 0) {
                if (data.val !== '0') {
                  if (item.category === '2') {
                    this.leftID = item.parentID
                    this.detailID = item.id
                    sessionStorage.setItem('______detailID', item.id)
                    this.$router.push(item.url)
                  } else {
                    window.location = item.url
                  }
                } else {
                  this.$dialog.alert({
                    tipValue: data.message,
                    alertImg: 'warn'
                  })
                }
              }
            }
          })
        }
      }
    },

  }
</script>


<style lang="less" scoped>


  .topMenuClass span {
    background-color: #fff;
    border-radius: 10px;
    color: #329ee7;
  }
  .leftMenuClass{
    background-color: #8eccf5;
  }
</style>
