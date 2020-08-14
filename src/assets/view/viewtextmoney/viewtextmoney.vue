<template>
  <div class="v_text_money">{{item.selectValue}}&nbsp;---&nbsp;<span class="rmb fs12b"></span><span v-html="getCOntent"></span></div>
</template>

<script>
  import {tenThousandFormatHtml} from '@/assets/common.js'
  export default {
    name: 'yhm-view-text-money',
    props: {
      item : {
        type:Object,
        required: true
      }
    },
    computed:{
      getCOntent(){
        return tenThousandFormatHtml(this.item.value)
      }
    }
  }
</script>

<style scoped>

</style>
