<template>
  <div class="v_control" style="position: relative">
    <div style="" class="title">{{title}}:</div>
    <div class="lookimg">
      <img :src="imgUrl" alt="" style="width:80px;">
      <div class="bigimgs">
        <img :src="imgUrl">
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
      }
    },
    created () {
      console.log(this.url+'22222222222')
    },
    methods:{

    },
    computed:{
      imgUrl(){
        console.log(this.url+'11111111111111')
        if(this.url){
          return '/UploadFile/'+this.tag +'/'+ this.url
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
    top: -100px;
    right: 0;
    width: 400px;
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
