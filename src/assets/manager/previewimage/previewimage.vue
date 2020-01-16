<template>
  <div v-show="show" class="preview_showImg" :style="getStyle">
    <img :src="url">11
  </div>
</template>

<script>
  export default {
    name: 'yhm-preview-image',
    props: {
      width:{
        type:String,
        default:'500'
      },
      height:{
        type:String,
        default:'300'
      },
      left:{
        type:String,
        default:'0'
      },
      top:{
        type:String,
        default:'0'
      },
      url: {
        type: String,
        required: true
      },
      show:{
        type:Boolean,
        default:false
      }
    },
    computed:{
      getStyle(){
        return 'top:' + this.top + 'px;left:' + this.left + 'px;width:' + this.width + 'px;height:' + this.height + 'px'
      }
    }
  }
</script>

<style scoped>

</style>
