<template>
  <div class="f_scanCode">
      <div>
        <img :src="src">
      </div>
      <div class="txt">
        {{content}}
      </div>
  </div>
</template>

<script>
  import { viewmixin } from '@/assets/view.js'
  export default {
    name: 'scanCode',
    mixins:[viewmixin],
    data(){
      return{
        src:'',
        content:''
      }
    },
    created(){
      this.setQuery2Value("content")
      this.init({
        url:"wx/wxUtils/createQrCode",
        call:(data) => {
          this.src = "/UploadFile/AppletsQrCode/" + data.content
        }
      })
    }
  }
</script>

<style scoped>

</style>
