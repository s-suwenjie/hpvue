<template>
    <div>
        {{test}}
    </div>
</template>

<script>
  import SockJS from  'sockjs-client';
  import Stomp from 'stompjs';
  export default {
    data(){
      return {
        stompClient:'',
        timer:'',
        test:'11111111'
      }
    },
    methods:{
      initWebSocket() {
        this.connection();
        let that= this;
        // 断开重连机制,尝试发送消息,捕获异常发生时重连
        this.timer = setInterval(() => {
          try {
            that.stompClient.send("test");
          } catch (err) {
            console.log("断线了: " + err);
            that.connection();
          }
        }, 5000);
      },
      connection() {
        // 建立连接对象
        let socket = new SockJS('/rx/endpointMark');
        // 获取STOMP子协议的客户端对象
        this.stompClient = Stomp.over(socket);
        // 定义客户端的认证信息,按需求配置
        let headers = {
          Authorization:''
        }
        // 向服务器发起websocket连接
        this.stompClient.connect(headers,() => {
          this.stompClient.subscribe('/mass/getResponse', (msg) => { // 订阅服务端提供的某个topic
            console.log('广播成功')
            console.log(msg);  // msg.body存放的是服务端发送给我们的信息
            this.test = msg.body.name
            alert(msg)
          },headers);
          this.stompClient.send("/app/chat.addUser",
            headers,
            JSON.stringify({sender: '',chatType: 'JOIN'}),
          )   //用户加入接口
        }, (err) => {
          // 连接发生错误时的处理函数
          console.log('失败')
          console.log(err);
        });
      },    //连接 后台
      disconnect() {
        if (this.stompClient) {
          this.stompClient.disconnect();
        }
      },  // 断开连接
    },
    mounted(){
      this.initWebSocket();
    },
    beforeDestroy: function () {
      // 页面离开时断开连接,清除定时器
      this.disconnect();
      clearInterval(this.timer);
    }
  }
</script>
<style  lang="less" scoped>
  /*公共样式*/
  body,h1,h2,h3,h4,p,ul,ol,li,form,button,input,textarea,th,td {
    margin:0;
    padding:0
  }
  body,button,input,select,textarea {
    font:12px/1.5 Microsoft YaHei UI Light,tahoma,arial,"\5b8b\4f53";
    *line-height:1.5;
    -ms-overflow-style:scrollbar
  }
  h1,h2,h3,h4{
    font-size:100%
  }
  ul,ol {
    list-style:none
  }
  a {
    text-decoration:none
  }
  a:hover {
    text-decoration:underline
  }
  img {
    border:0
  }
  button,input,select,textarea {
    font-size:100%
  }
  table {
    border-collapse:collapse;
    border-spacing:0
  }

  /*rem*/
  html {
    font-size:62.5%;
  }
  body {
    font:16px/1.5 "microsoft yahei", 'tahoma';
  }
  body .mobile-page {
    font-size: 1.6rem;
  }

  /*浮动*/
  .fl{
    float: left;
  }
  .fr{
    float: right;
  }
  .clearfix:after{
    content: '';
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
  }

  body{
    background-color: #F5F5F5;
  }
  .mobile-page{
    max-width: 600px;
  }
  .mobile-page .admin-img, .mobile-page .user-img{
    width: 45px;
    height: 45px;
  }
  i.triangle-admin,i.triangle-user{
    width: 0;
    height: 0;
    position: absolute;
    top: 10px;
    display: inline-block;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
  }
  .mobile-page i.triangle-admin{
    left: 4px;
    border-right: 12px solid #fff;
  }
  .mobile-page i.triangle-user{
    right: 4px;
    border-left: 12px solid #9EEA6A;
  }
  .mobile-page .admin-group, .mobile-page .user-group{
    padding: 6px;
    display: flex;
    display: -webkit-flex;
  }
  .mobile-page .admin-group{
    justify-content: flex-start;
    -webkit-justify-content: flex-start;
  }
  .mobile-page .user-group{
    justify-content: flex-end;
    -webkit-justify-content: flex-end;
  }
  .mobile-page .admin-reply, .mobile-page .user-reply{
    display: inline-block;
    padding: 8px;
    border-radius: 4px;
    background-color: #fff;
    margin:0 15px 12px;
  }
  .mobile-page .admin-reply{
    box-shadow: 0px 0px 2px #ddd;
  }
  .mobile-page .user-reply{
    text-align: left;
    background-color: #9EEA6A;
    box-shadow: 0px 0px 2px #bbb;
  }
  .mobile-page .user-msg, .mobile-page .admin-msg{
    width: 75%;
    position: relative;
  }
  .mobile-page .user-msg{
    text-align: right;
  }
  .chatRecord{
    width: 100%;
    height: 400px;
    border-bottom: 1px solid blue;
    line-height:20px;
    overflow:auto;
    overflow-x:hidden;
  }
</style>
