<template>
  <div class="v_control" :class="[getWidthClass]">
    <div class="v_title">{{title}}：</div>
    <div>
      <img :src="imgUrl" alt="">
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
      }
    },
    computed: {
      imgUrl(){
        if(this.url){
          return '/UploadFile/' + this.tag + '/' + this.url
        }else{
          return ''
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
