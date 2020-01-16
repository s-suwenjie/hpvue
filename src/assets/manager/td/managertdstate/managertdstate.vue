<template>
  <td>
    <div class="md_center" :style="getStateColor">
      <p class="stateImg" :class="stateImg"></p>
      {{value|formats(format,emptyValue,isEmpty)}}
    </div>
  </td>
</template>

<script>
  export default {
    name: 'yhm-manager-td-state',
    inject: ["p____page"],
    props: {
      isEmpty:{
        type:Boolean,
        default:false
      },
      value: {
        type: String,
        required: true
      },
      stateColor: {
        type: String,
        required: true
      },
      stateImg: {
        type: String,
        required: true
      },
      format: {
        type: String,
        default:''
      },
      emptyValue:{
        type: String,
        default:'-----'
      },
      getColor: {
        type: String,
        default: '#333'
      }
    },
    filters: {
      formats(data,format,emptyValue,isEmpty){
        if(data === '' || isEmpty){
          return emptyValue
        }else{
            return data
        }
      }
    },
    computed: {
      getStateColor(){
        return 'color:' + this.stateColor
      }
    }
  }
</script>

<style scoped>
  .stateImg{
    margin-right: 3px;
  }
  .stateImg:before{
    font-size: 20px;
  }
</style>
