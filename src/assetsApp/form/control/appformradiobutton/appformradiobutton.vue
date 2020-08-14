<template>
  <div class="afc_main">
    <div class="afc_title">{{title}}</div>
    <yhm-app-radio-button :id="id" :value="value" :list="list" :show="show"></yhm-app-radio-button>
    <div class="afc_error"><span v-if="error">{{errorTipMessage}}</span></div>
  </div>
</template>

<script>
  import { formcontrolmixin } from '@/assetsApp/form/control/formcontrol.js'
  export default {
    name: 'yhm-app-form-radio-button',
    mixins: [formcontrolmixin],
    props: {
      title: {
        type: String,
        default: "标题"
      },
      id: {
        type: String,
        required: true
      },
      value: {
        type: String,
        required: true
      },
      list:{
        type:Array,
        default:function () {
          return []
        }
      },
      show:{
        type:Boolean,
        default:true
      }
    },
  }
</script>

<style scoped>
  *{
    box-sizing: border-box;
  }
</style>
