<template>
    <td ref="control" v-show="show" style="position: relative;" @mouseover="mouseoverEvent" @mouseout="mouseoutEvent" @click="clickEvent">
      <div class="md_right md_relative" :style="{opacity:loading?'0.2':'1',transition:transitionShow?'all 1s':''}">
        <div v-if="beforeIcon !== ''" class="md_beforeIcon" :style="{color:beforeIconColor}" :class="[beforeIcon,beforeIconFontSize]"></div>
        <div v-html="getTxt(value)"></div>
      </div>
      <div class="pswp__preloader__icn" style="position: absolute;" v-show="loadingShow" :style="{transition:transitionShow?'all 1s':'',opacity:!loading?'0':'1',top:loadingTop+'px',left:loadingLeft+'px'}">
        <div class="pswp__preloader__cut">
          <div class="pswp__preloader__donut"></div>
        </div>
      </div>

    </td>
</template>

<script>
  import {tenThousandFormatHtml} from '@/assets/common.js'
  export default {
    name: 'yhm-manager-td-money',
    inject: ["p____page"],
    data(){
      return{
        loadingShow:false,//用来缓冲关闭事件 以便执行opacity效果
      }
    },
    props: {
      beforeSymbol:{
        type:String,
        default :''
      },
      transitionShow:{
        type:Boolean,
        default:false
      },
      tipCategory:{
        type:Number,
        default :0
      },
      loading:{
        type:Boolean,
        default:false
      },
      loadingTop:{
        type:String,
        default:'5'
      },
      loadingLeft:{
        type:String,
        default:'35'
      },
      value: {
        type: String,
        required: true
      },
      valueObject:{
        type:Object
      },
      beforeIcon:{
        type:String,
        default:''
      },
      beforeIconColor:{
        type:String,
        default:'#18d123'
      },
      beforeIconFontSize:{
        type:String,
        default:'fs14'
      },
      show:{
        type:Boolean,
        default:true
      }
    },
    watch:{
      loading(val,newVal){
        setTimeout(()=>{
          if(val==true){
            this.loadingShow = true
          }else{
            this.loadingShow = false
          }
        },1000)
      }
    },
    methods:{
      mouseoverEvent(){
        this.$nextTick(() => {
          this.$emit('mouseover',this.valueObject,this.$refs.control,this.tipCategory)
        })
      },
      mouseoutEvent(){
        this.$nextTick(() => {
          this.$emit('mouseout',this.valueObject,this.$refs.control,this.tipCategory)
        })
      },
      clickEvent(){
        this.$nextTick(() => {
          this.$emit('click')
        })
      }
    },
    computed:{
      getTxt(){
        return function (val) {
          return this.beforeSymbol + tenThousandFormatHtml(val) + '&nbsp;'
        }
      }
    }
  }
</script>

<style>
  .pswp__preloader__icn {
    opacity:0.75;
    width: 24px;
    height: 24px;
    -webkit-animation: clockwise 500ms linear infinite;
    animation: clockwise 500ms linear infinite;
  }

  /* The idea of animating inner circle is based on Polymer loading indicator by Keanu Lee https://blog.keanulee.com/2014/10/20/the-tale-of-three-spinners.html */
  .pswp__preloader__cut {
    position: relative;
    width: 12px;
    height: 24px;
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
  }

  .pswp__preloader__donut {
    box-sizing: border-box;
    width: 24px;
    height: 24px;
    border: 2px solid #000;
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
</style>
