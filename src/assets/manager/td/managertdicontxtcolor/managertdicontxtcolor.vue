<template>
  <td>
    <div v-if="isEmpty" class="md_center">
      -----
    </div>
    <div v-if="!isEmpty" class="md_left mt_psd" :style="getColor">
      <div class="font fs22b" :class="getIcon"></div>
      <div :class="{ml3:getMl}">{{showName}}</div>
    </div>
  </td>
</template>

<script>
  export default {
    name: 'yhm-manager-td-icon-txt-color',
    props: {
      isEmpty:{
        type:Boolean,
        default:false
      },
      icon:{
        type:String,
        default:''
      },
      color:{
        type:String,
        default:'#333'
      },
      showName:{
        type:String,
        required: true
      }
    },
    computed:{
      getMl(){
        if(this.icon === ''){
          return true
        }
        else {
          return false
        }
      },
      getIcon(){
        return this.icon
      },
      getColor(){
        return 'color:' + this.color
      }
    }
  }
</script>

<style scoped>

</style>
