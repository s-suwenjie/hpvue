<template>
  <div class="f_main">
    <div class="remarkView" v-for="(item,index) in listData" :key="index">

      <span class="bankID">{{item.bankID}}</span>
      <span class="account">({{item.account.substr(-4)}})</span>&nbsp;-&nbsp;<span class="categoryCash" v-if="item.category === '0'">现金账户</span>
      <span class="categoryCheck" v-if="item.category === '1'">支票账户</span>&nbsp;剩余 <span class="count">{{item.count}}</span> 张，数量不足

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
          for(let i in this.list){
            if(this.list[i].isWarning === '1'){
              this.listData.push(
                this.list[i]
              )
            }
          }
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
    .categoryCash{
      color: #e09e17;
      font-size: 24px;
    }
    .categoryCheck{
      color: #fd6802;
      font-size: 24px;
    }
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
