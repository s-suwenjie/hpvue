<template>
  <div>

    <div> <p>当前选中 <span>{{selectCount}}</span> 条, 共计 <span  v-html="getTxt(allMoney)"></span> 元 </p> </div>

  </div>
</template>

<script>
  import {tenThousandFormatHtml} from '@/assets/common.js'
  export default {
    name: 'yhm-selectrgtbox',
    data(){
      return{
        item:null
      }
    },
    props:{
      allMoney: {
        type: Number,
        required: true
      },
      selectCount: {
        type: Number,
        required: true
      },
    },
    computed:{
      getTxt(){
        return function (val) {
          val = val + ''
          return tenThousandFormatHtml(val) + '&nbsp;'
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .rgt{
    float: right;
  }
</style>
