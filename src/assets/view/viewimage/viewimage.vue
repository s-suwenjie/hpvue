<template>
  <div class="v_control" style="position: relative">
    <div style="" class="title">{{title}}:</div>
    <div class="lookimg" @click="clickEvent">
      <img :src="imgUrl" alt="" :style="{'width':width+'px'}">
      <div class="bigimgs" :style="{'width':bigwidth+'px','top':top+'px','right':right+'px'}">
        <img :src="imgUrl" >
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    name: 'yhm-view-image',
    data(){
      return{

      }
    },
    props:{
      url:{
        type:String,
        default:''
      },
      title:{
        type:String,
        default:'查看图片'
      },
      tag:{
        type:String,
        default:''
      },
      width:{
        default:80
      },
      bigwidth:{
        default:400
      },
      top:{
        default:-100
      },
      right:{
        default:0
      }
    },
    methods:{
      clickEvent(){
        this.$emit("click")
      },
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
    }
  }
</script>

<style scoped>
  .title{
    font-size: 14px;
    color: #666;
    padding: 12px 0;
    font-weight: bold;
    margin-right: 12px;
  }
  .bigimgs{
    z-index: 10;
    position: absolute;
    /*top: -100px;*/
    /*right: 0;*/
    display: none;
    border: 3px dotted #9f9f9f;
  }
  .bigimgs>img{
    width: 100%;
  }
  .lookimg:hover .bigimgs{
    display: inline-block;
  }
</style>
