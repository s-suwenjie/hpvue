<template>
    <span :style="{color:color}" :class="fontSizeClass" class="rmb">
      <span v-html="getContentShow"></span>
    </span>
</template>

<script>
  import {tenThousandFormatHtml} from '@/assets/common.js'
  export default {
    name: 'yhm-app-view-money',
    props:{
      fontSizeClass:{
        type:String,
        default:'afs12b'
      },
      content:{
        type:String,
        required: true,
      },
      color:{
        type:String,
        default:'#333'
      }
    },
    computed : {
      getContentShow(){
        return tenThousandFormatHtml(this.content)
      }
    }
  }
</script>

<style scoped>

</style>
