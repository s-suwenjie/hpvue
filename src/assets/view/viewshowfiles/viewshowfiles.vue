<template>
  <div class="v_f_show" @click="clickEvent"><span class="mr3b" :class="getType"></span>{{item.showName}}</div>
</template>

<script>
  export default {
    name: 'yhm-view-show-files',
    props: {
      content:{
        type:Array,
        required: true
      },
      item : {
        type:Object,
        required: true
      }
    },
    methods:{
      clickEvent(){
        if(this.item.image === '1'){
          let index = this.getImages.indexOf('/UploadFile/' + this.item.tag + '/' + this.item.storeName)
          console.log(this.getImages)
          this.$dialog.preview(this.getImages, index + 1)
        }
        else{
          window.open('/UploadFile/' + this.item.tag + '/' + this.item.storeName)
        }
      }
    },
    computed:{
      getType(){
        if(this.item.image === '1'){
          return 'i-btn-image'
        }
        else{
          return 'i-btn-file'
        }
      },
      getImages(){
        let imgArr = []
        for (var i = 0; i < this.content.length; i++) {
          var temp = this.content[i];
          if (temp.image === "1") {
            imgArr.push("/UploadFile/" + temp.tag + "/" + temp.storeName);
          }
        }
        return imgArr
      }
    }
  }
</script>

<style scoped>

</style>
