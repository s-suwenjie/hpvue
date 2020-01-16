<template>
    <span :style="{color:colorValue}" v-html="getContentShow"></span>
</template>

<script>
  export default {
    name: 'yhm-app-view-psd',
    data(){
      return {
        colorValue:this.color
      }
    },
    props:{
      content:{
        type:String,
        required: true,
      },
      psd:{
        type:Array,
        default:function () {
          return []
        }
      },
      color:{
        type:String,
        default:'#333'
      }
    },
    computed:{
      getContentShow(){
        let result = ''
        if(typeof this.content === 'string') {
          for (let i = 0; i < this.psd.length; i++) {
            if (this.psd[i].num === this.content) {
              result = this.psd[i].showName
              if(this.color === '#333'){
                if(this.psd[i].img.indexOf('#') === 0){
                  this.colorValue = this.psd[i].img
                }
                if(this.psd[i].code.indexOf('#') === 0){
                  this.colorValue = this.psd[i].code
                }
              }
              break
            }
          }
        }
        return result
      }
    }
  }
</script>

<style scoped>

</style>
