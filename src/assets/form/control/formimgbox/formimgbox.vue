<template>
  <div v-if="show" class="fc_main">
    <div class="fc_box">
      <div class="fc_title">
        <div>{{title}}</div>
        <div v-if="subtitle !== ''">{{subtitle}}</div>
      </div>
      <div class="c_main">

        <div class="imgbox" :style="{'width':smallwidth+'px'}">
          <img :src="imgUrl">
          <div class="bigimgbox" :style="{'width':width+'px'}" v-if="erros">
            <img :src="imgUrl">
          </div>
        </div>

<!--        <div class="imgbox" v-if="!erros">-->
<!--          <img src="/static/css/images/login/noimg.jpg">-->
<!--          <div class="bigimgbox" style="width: 240px;height: 120px;">-->
<!--            <img src="/static/css/images/login/noimg.jpg">-->
<!--          </div>-->
<!--        </div>-->

      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'yhm-formimgbox',
    inject: ['p____page'],
    data(){
      return{

      }
    },
    props:{
      title:{
        type:String,
        default:'标题'
      },
      show:{
        type:Boolean,
        default:true
      },
      url:{
        type:String,
        default:'',
      },
      tag:{
        type:String,
        default:'',
      },
      width:{
        default:200
      },
      smallwidth:{
        default:80
      },
      subtitle:{
        type: String,
        default: ''
      }
    },
    computed:{
      imgUrl(){
        if(this.url){
          if(this.tag){
            return '/UploadFile/'+this.tag +'/'+ this.url
          }else{
            return '/UploadFile/'+ this.url
          }

        }else{
          return ''
        }
      },
      erros(){
        if(this.url){
          return true
        }else{
          return false
        }
      }
    },
    methods:{

    },

  }
</script>

<style scoped>
  *{
    box-sizing: border-box;
  }
  .imgbox{
    height: 40px;
    line-height: 40px;
    position: relative;
    background-color: #BFBFBF;
  }
  .imgbox>img{
    width: 100%;
  }
  .bigimgbox{
    position: absolute;
    top: 0;
    left: 0;
    border: 2px dotted #9f9f9f;
    padding-bottom: 0;
    z-index: 9;
    display: none;
  }
  .bigimgbox>img{
    width: 100%;
  }
  .imgbox:hover .bigimgbox{
    display: inline-block;
  }
</style>
