<template>
    <span class="v_psd" :style="getColor">
      <span class="font" :class="[getIcon,fsb]"></span>
      <span :class="{ml3:getMl}">{{item.showName}}</span>
    </span>
</template>

<script>
  export default {
    name: 'yhm-view-psd',
    data(){
      return{
        item:null
      }
    },
    props: {
      fsb:{
        type: String,
        default: ''
      },
      value: {
        type: String,
        required: true
      },
      psd: {
        type: Array,
        required: true
      }
    },
    created(){
      for(let i = 0; i < this.psd.length; i++){
        if(this.psd[i].num === this.value){
          this.item = this.psd[i]
          break
        }
      }
    },
    computed:{
      getMl(){
        if(this.item.img.indexOf('i-') === 0){
          return true
        }
        else {
          return false
        }
      },
      getIcon(){
        if(this.item.img.indexOf('i-') === 0){
          return this.item.img
        }
        else if(this.item.code.indexOf('i-') === 0){
          return this.item.code
        }
        else{
          return ''
        }
      },
      getColor(){
        if(this.item.code.indexOf("#") === 0){
          return 'color:' + this.item.code
        }
        else if(this.item.img.indexOf("#") === 0){
          return 'color:' + this.item.img
        }
        return ""
      }
    },
    watch: {
      value (newVal) {
        for (let i = 0; i < this.psd.length; i++) {
          if (this.psd[i].num === newVal) {
            this.item = this.psd[i]
            break
          }
        }
      },
    }
  }
</script>

<style scoped>

</style>
