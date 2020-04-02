<template>
  <div class="f_main">
    <div class="remarkView" v-for="(item,index) in list" :key="index">

      <span class="bankID">{{item.bankID}}</span> <span class="account"> ({{item.account.substr(-4)}}) </span>剩余 <span class="count">{{item.count}}</span> 张，数量不足

    </div>

  </div>
</template>

<script>
  import { formmixin } from '@/assets/form.js'
  export default {
    name: 'showCheckWarnView',
    mixins: [formmixin],
    data() {
      return {
        str: '',
        account: '',
        list: [],
        listData: []
      }
    },
    methods:{

    },
    created () {
      this.ajaxJson({
        url: '/Bill/getChecksDetailNumber',
        call: (data)=>{
          this.list = data
        }
      })
    }
  }
</script>

<style scoped lang="less">
  .f_main{
    background-color: #fff;
    padding: 20px 0;
    margin: 20px;
  }
  .remarkView {
    text-align: center;
    margin: 10px 0;
    font-size: 24px;
  }
  .bankID {
    color: #333;
    font-size: 24px;
  }
  .account{
    color: #2f54eb;
    font-size: 30px;
  }
  .count{
    color: #f00;
    font-size: 30px;
  }
</style>
