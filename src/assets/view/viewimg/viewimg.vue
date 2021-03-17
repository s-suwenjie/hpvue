<template>
  <div class="v_control" :class="[getWidthClass]">
    <div class="v_title">{{title}}：</div>
    <div style="display: flex; justify-content: flex-start;align-items: center;">
      <img :style="getImageWidth + getImageHeight" :src="imgUrl" alt="">
    </div>
  </div>
</template>

<script>
  export default {
    name: "yhm-view-img",
    props: {
      title:{
        type:String,
        default:''
      },
      url: {
        type: String,
        default: ''
      },
      tag: {
        type: String,
        default: ''
      },
      width:{
        type: String,
        default: 'auto'
      },
      height:{
        type: String,
        default: 'auto'
      }
    },
    computed: {
      getImageWidth(){
        if(this.width === 'auto'){
          return ""
        }
        else{
          return "width :" + this.width + "px;"
        }
      },
      getImageHeight(){
        if(this.height === 'auto'){
          return ""
        }
        else{
          return "height :" + this.height + "px;"
        }
      },
      imgUrl(){
        if(this.url.indexOf("http") === 0){
          return this.url
        }
        else{
          if(this.url){
            return '/UploadFile/' + this.tag + '/' + this.url
          }else{
            return ''
          }
        }
      },
      getWidthClass(){
        if(this.category === '2'){
          return 'v_control_w2'
        }
        else if(this.category === '3'){
          return 'v_control_w3'
        }
        else{
          return ''
        }
      }
    }
  }
</script>

<style scoped>

</style>
