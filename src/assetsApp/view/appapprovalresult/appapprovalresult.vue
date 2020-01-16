<template>
    <div class="app_approval_result" :style="{width:getStyle,left: getLeft,right: getRight,top:getTop,bottom: getBottom}">
      <img :src="getSrc">
    </div>
</template>

<script>
  export default {
    name: 'yhm-app-approval-result',
    props:{
      left : {
        type:Number,
        default: 0
      },
      top : {
        type:Number,
        default: 0
      },
      right : {
        type:Number,
        default: 0
      },
      bottom : {
        type:Number,
        default: 0
      },
      width : {
        type:Number,
        default: 2.1733
      },
      category:{
        type:Boolean,
        default : true
      }
    },
    computed:{
      getSrc(){
        if(this.category){
          return '/UploadFile/m_image/approved.svg'
        }
        else{
          return '/UploadFile/m_image/rejected.svg'
        }
      },
      getStyle(){
        return this.width + 'rem'
      },
      getLeft(){
        if(this.left === 0 && this.right !== 0){
          return ''
        }
        else{
          return this.left + 'rem'
        }
      },
      getRight(){
        if(this.left !== 0 && this.right === 0){
          return ''
        }
        else{
          return this.right + 'rem'
        }
      },
      getTop(){
        if(this.top === 0 && this.bottom !== 0){
          return ''
        }
        else{
          return this.top + 'rem'
        }
      },
      getBottom(){
        if(this.top !== 0 && this.bottom === 0){
          return ''
        }
        else{
          return this.bottom + 'rem'
        }
      }
    }
  }
</script>

<style scoped>

</style>
