<template>
    <div>
      <div class="shade" v-if="!shade" v-show="!maskSwitch" @click="clickEvent"></div>
      <div class="toast" v-if="!shade" v-show="type=='text'" @click="clickEvent">
        {{text}}
      </div>
      <div class="toast" v-if="!shade" v-show="type=='loading'" @click="clickEvent">
        <div class="pswp__preloader__icn">
          <div class="pswp__preloader__cut">
            <div class="pswp__preloader__donut"></div>
          </div>
        </div>
        <div class="load-indicator">加载中<span class="span"></span></div>
      </div>
      <!--
         父组件引用示例
         <appToast type="text" text="内容" :maskSwitch="true" v-show="toastShow" @login-success="toastShow = $event"></appToast>
          :maskSwitch="true" 关闭遮罩 不加时默认开启遮罩
          type=='text'时遮罩会有点击关闭事件 必须添加@login-success="toastShow（这个值要与v-show的变量一致） = $event" 不加会破坏单向数据流并报错
       -->
    </div>
</template>

<script>
  export default {
    name: 'appToast',
    data(){
      return{

      }
    },
    props:{
      text: {//轻提示框内容
        type: String,
        default: '提示内容'
      },
      maskSwitch: {//遮罩层开关
        type: Boolean,
        default: false
      },
      shade:{
        type:Boolean,
        default: false
      },
      type:{
        type:String,
        default:'text'
      }
    },
    methods:{
      clickEvent(){
        this.$nextTick(()=>{
            // this.shade = !this.shade
          if(this.type=='text'){
              this.$emit('login-success',false);
          }
        })

      //   this.shade = !this.shade
      //   this.$nextTick(()=>{
      //     this.$emit('call')
      //   })
      }
    },
    watch:{
    },
    created () {

    }
  }
</script>

<style lang="less" scoped>
  @rem:375/10rem;
  .load-indicator {
    font-size: 16px;
    color: #fff;
  }
  .span {
    display: inline-block;
    overflow: hidden;
    height: 1em;
    line-height: 1;
    vertical-align: -.25em;
  }
  .span::after {
    display: block;
    white-space: pre-wrap;
    content: "...\A..\A.";
    animation: loading 3s infinite step-start both;
  }

  @keyframes loading {
    33% {
      transform: translate3d(0, -2em, 0);
    }

    66% {
      transform: translate3d(0, -1em, 0);
    }
  }
  .pswp__preloader__icn {
    opacity:0.75;
    width: 24/@rem;
    height: 24/@rem;
    margin: 10/@rem 0 16/@rem 0;
    -webkit-animation: clockwise 500ms linear infinite;
    animation: clockwise 500ms linear infinite;
  }

  /* The idea of animating inner circle is based on Polymer loading indicator by Keanu Lee https://blog.keanulee.com/2014/10/20/the-tale-of-three-spinners.html */
  .pswp__preloader__cut {
    position: relative;
    width: 12/@rem;
    height: 24/@rem;
    /*overflow: hidden;*/
    position: absolute;
    top: 0;
    left: 0;
  }

  .pswp__preloader__donut {
    box-sizing: border-box;
    width: 24/@rem;
    height: 24/@rem;
    border: 2/@rem solid #fff;
    border-radius: 50%;
    border-left-color: transparent;
    border-bottom-color: transparent;
    position: absolute;
    top: 0;
    left: 0;
    background: none;
    margin:0;
    -webkit-animation: donut-rotate 1000ms cubic-bezier(.4,0,.22,1) infinite;
    animation: donut-rotate 1000ms cubic-bezier(.4,0,.22,1) infinite;
  }

  @-webkit-keyframes clockwise {
    0% { -webkit-transform: rotate(0deg) }
    100% { -webkit-transform: rotate(360deg) }
  }
  @keyframes clockwise {
    0% { transform: rotate(0deg) }
    100% { transform: rotate(360deg) }
  }
  @-webkit-keyframes donut-rotate {
    0% { -webkit-transform: rotate(0) }
    50% { -webkit-transform: rotate(-140deg) }
    100% { -webkit-transform: rotate(0) }
  }
  @keyframes donut-rotate {
    0% { transform: rotate(0) }
    50% { transform: rotate(-140deg) }
    100% { transform: rotate(0) }
  }
  .shade{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #000;
    opacity: 0.6;
    z-index: 1001;
  }
  .toast{
    z-index: 1002;
    position: fixed;
    top: 50%;
    left: 50%;
    display: flex;
    width: fit-content;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-sizing: content-box;
    max-width: 70%;
    min-width: 96/@rem;
    min-height: 20/@rem;
    /*height: auto;*/
    padding: 12/@rem;
    color: #fff;
    font-size: 14/@rem;
    text-align: center;
    word-wrap: break-word;
    background-color: rgba(50, 50, 51, 0.88);
    /*background-color: red;*/
    border-radius: 4/@rem;
    -webkit-transform: translate3d(-50%, -50%, 0);
    transform: translate3d(-50%, -50%, 0);
  }
</style>
