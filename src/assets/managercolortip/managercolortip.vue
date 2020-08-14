<template>
  <div class="colorTip">
    <div v-for="(item,index) in this.psd" :key="index">
      <p :style="{'background-color':item.code}" class="shape"></p>
      <p><span :style="getBeforeColor">{{beforeTip}}</span> <span :style="{'color':item.code}">{{item.showName}}</span></p>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'yhm-manager-color-tip',
    data(){
      return{
        color: ''
      }
    },
    props: {
      psd: {
        type: Array,
        required: true
      },
      beforeTip: {
        type: String,
        default: ''
      },
      beforeColor: {
        type: String,
        default: '#888'
      }
    },
    created () {

    },
    computed:{
      getBeforeColor(){
        return 'color:' + this.beforeColor
      },
    },
    watch: {

    }
  }
</script>

<style scoped>

</style>
