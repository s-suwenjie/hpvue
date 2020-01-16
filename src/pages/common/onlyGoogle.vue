<template>
<div>
  <div class="lineBlue">
  </div>
  <div class="downloadBox">
    <div class="loginBoxMiddleMain">
      <div class="smbox">
        <p>
          您的浏览器暂不支持查看OA系统</p>
        <p>
          请使用<img style="width: 30px; height: 30px;" src="../../../static/staticHStyle/images/chromeLogo.png">谷歌浏览器,
          若您的电脑没有安装，请点击按钮下载。
        <p>
          </p>
      </div>
      <div class="desktop-only">
        <p class="content-win">
          <a class="button" style="display: inline-block;" href="http://www.google.cn/chrome/browser/desktop/index.html" target="_blank">
            下载 谷歌浏览器</a>
        </p>
        <p class="content-win">
          <span class="alt-platform">适用于 Windows 10/8.1/8/7/Vista/XP 32-bit</span>
        </p>
        <p class="content-win64">
          <span class="alt-platform">适用于 Windows 10/8/7 64-bit</span>
        </p>
      </div>
    </div>
    <div class="Copyright">
      <span>版权所有 北京海派奥特经贸有限公司</span>
    </div>
  </div>
</div>
</template>

<script>
  export default {
    name: 'noGoogle'
  }
</script>

<style scoped >
  *{ margin:0; padding:0; border:0; font-family:"微软雅黑";}
  body{ background:#e1e1e1 url('../../../static/staticHStyle/images/body_bg.jpg') repeat-x;}
  ul{ list-style:none;}
  a{ text-decoration:none;}
  input,a,button{outline:none;}
  .lineBlue{ width:100%; height:10px; background-color:#2b84ce;}
  .loginBox{ width:965px; height:800px; margin:0 auto; margin-top:80px; position:relative;}
  .loginBoxLeft{ width:30px; height:800px; float:left;}
  .loginBoxRight{ width:30px; height:800px; float:Right;}
  .loginBoxMiddle{width:905px; height:500px; float:left; margin-top:130px; }
  .loginBoxMiddleMain{width:903px; height:430px; border:1px solid #e5e5e6; background-color:#fff;}
  .Copyright{ width:900px; height:30px; text-align:center; line-height:30px; }
  .Copyright span{font-size:12px; color:#8b8b8b; font-family:"宋体";}
  .loginBoxMiddle_left{ width:470px; height:380px; padding:50px 0 0 20px;  float:left;}
  /*用户头像列表*/
  .userarea{ padding-top:30px; padding-left:15px;}
  .userarea dl{ width:126px; float:left; margin:0 15px 35px 10px; overflow:hidden;}
  .userarea dl dt{ margin-bottom:10px;}
  .userarea dl dt a::after{ content:"\00A0\000BB";}
  .userarea dl dd{ float:left; margin-right:10px;}
  .userarea dl dd img{ width:50px; height:50px; cursor:pointer; border:1px solid #fff;}
  .userarea dl dd img:hover{ border:1px solid #999;}
  /*登陆部分*/
  .loginBoxMiddle_right{ width:363px; height:400px; float:left; padding:30px 0 0 50px;}
  .loginBoxMiddle_right input{ width:240px; height:25px; padding-left:5px; color:#666; background-color:transparent; line-height:25px; background-color:#fff;}
  .userImg{ width:104px; height:104px; margin-left:100px; margin-bottom:10px; position:relative;}
  .userImg img{width:104px; height:104px; border-radius:50px;}
  .skinLine{ width:310px; height:30px; vertical-align:middle; line-height:30px; margin-bottom:20px;}/*皮肤选择框*/
  .skinLine a{ width:90px; height:30px; border:2px solid #fff; padding:0px 2px 2px 2px;}
  .skinCheck{border:2px solid #c6c6c6 !important;}
  .skinLine a:hover{ border:2px solid #c6c6c6;}
  .skinLine a span{  font-size:14px; font-family:"微软雅黑"; color:#666; margin-left:3px;}
  .skinLine img{ vertical-align:middle; width:15px; height:15px;}
  /*非本公司登录*/
  /*登陆部分*/
  .loginBoxMiddle_right h3{ font-size:16px; font-family:"微软雅黑"; margin-bottom:30px; font-weight:500;}

  .WordDiv{ line-height:25px; text-align:right; color:#555; font-size:12px; padding-left:25px; position:absolute; top:-25px; right:0; cursor:pointer;}
  .WordDiv a:hover{ text-decoration:underline;}
  .WordDiv a:link { color: #555555; text-decoration: none;}
  .WordDiv a:visited { color: #555555; text-decoration: none;}
  /*登陆错误提示框样式*/
  .LogTipsDiv{ width: 283px; height:25px; line-height:25px; color:#555; font-size:14px; padding-left:25px; border: 1px solid #E5C3C4; border-radius: 3px; position:absolute; top:-27px; left:0;
    filter:alpha(opacity=80);
    -moz-opacity:0.8;
    -khtml-opacity: 0.8;
    opacity: 0.8; }
  .LoginWindow{width:310px; height:300px; margin:0 auto; margin-top:30px;}
  .LoginWindow input{ width:240px; height:25px; padding-left:5px; color:#666; background-color:transparent; line-height:25px; background-color:#fff;}
  /*跳转页面*/
  .downloadBox{width:905px; height:500px; margin:0 auto; margin-top:130px;}
  .smbox{ width:554px; height:142px; margin:0 auto; background-image:url('../../../static/staticHStyle/images/smbg.jpg'); margin-top:50px; padding:20px 0 0 210px; margin-bottom:30px; vertical-align:middle;}
  .smbox p{ color:#fff; line-height:40px; vertical-align:middle;}
  .smbox p img{ vertical-align:middle; padding:3px;}
  .desktop-only{ width:800px; height:400px; margin:0 auto;}
  .desktop-only p{ display:block; font-size:12px; line-height:30px; text-align:center; color:#666;}
  .other{ color:#333; font-weight:bold;}
  .other:hover{ color:#52BCED;}
  .button {
    background: #0370ea;
    border: 1px solid #076bd2;
    border-radius: 3px;
    color: #fff !important;
    width:100px;
    margin:0 auto;
    display: block;
    font-size: 13px;
    font-weight: 700;
    line-height: 1.3;
    padding: 8px 25px;
    text-align: center;
    text-decoration: none !important;
    text-shadow: 1px 1px 1px #076bd2;
    margin-bottom:10px;
  }
  /*获取权限*/
  .RootWindow{ width:310px; height:180px; padding:30px 80px; background-color:#fff;}
  .certigier{position:relative; z-index:1;}
  .certigier span{ line-height:30px; font-size:16px; margin-bottom:8px; display:inline-block;}
  .certigier input{ width:200px; height:25px !important; padding-left:5px; color:#666; background-color:#fff; line-height:20px !important; background-color:#fff;}
  #RootList{}
  .Menu {
    position:absolute;
    width:308px;
    height:103px;
    overflow-y:scroll;
    z-index:2;
    background: #FFF;
    border:1px solid #CFCFCF;
    top:73px;
    left:0;
    display:none;
  }
  .Menu ul{margin:0;padding:0}
  .Menu ul li{width:100%;height:25px;line-height:25px;text-indent:40px;border-bottom:1px dashed #ccc;color:#666;cursor:pointer; font-size:13px;}
  .Menu ul li:hover{ background-color:#F5F5F5;}
  .btnRoot{ width:310px; height:41px;
    background: linear-gradient(0deg, #0573C9, #64B9FF);
    border: 1px solid #005AB9;
    border-radius: 3px;
    color: #fff;
    cursor:pointer; font-size:16px; letter-spacing: 2px;}/*授权确认按钮*/

  /*授权后等待页面*/
  .RequestPop
  {
    width: 100%;
    height:100%;
    word-break: break-all;
    margin: 0 auto;
    overflow: hidden;
    background-color: #fff;
    opacity: .6;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1000;
  }

  .RequestPopTitle
  {
    position: absolute;
    top: 136px;
    left: 80px;
    z-index: 1001;
    width:308px;
    height:40px;
    background: linear-gradient(0deg, #0573C9, #64B9FF);
    border: 1px solid #005AB9;
    border-radius: 3px;
    color: #fff;
    cursor:pointer;
    font-size:16px;
    letter-spacing: 2px;
    vertical-align:middle;
    text-align:center;
  }
  .RequestPopTitle img{vertical-align:middle; margin-top:5px;}
  .RequestPopTitle span{vertical-align:middle; line-height:40px;}
</style>
