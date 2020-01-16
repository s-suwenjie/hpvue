<template>
  <div class="v_text_money"><span v-html="getCDate"></span>&nbsp;---&nbsp;<span class="rmb fs12b"></span><span v-html="getCOntent"></span></div>
</template>

<script>
  import {tenThousandFormatHtml,formatDateHtml} from '@/assets/common.js'
  export default {
    name: 'yhm-view-date-money',
    props: {
      item : {
        type:Object,
        required: true
      }
    },
    computed:{
      getCOntent(){
        return tenThousandFormatHtml(this.item.value)
      },
      getCDate(){
        return formatDateHtml(this.item.workDate)
      }
    }
  }
</script>

<style scoped>

</style>
