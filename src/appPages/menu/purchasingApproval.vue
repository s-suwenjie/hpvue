<template>
    <div>
      <div class="main">
        <p class="title"><span>申请人:</span><span>某某某</span></p>
        <p class="title"><span>申请日期:</span><span>2019-02-05 周四</span></p>
        <p class="title"><span>采购分类：:</span><span>办公使用</span></p>
        <p class="title"><span>采购类型:</span><span>固定资产</span></p>
        <p class="title"><span>到货日期:</span><span>2019-02-05 周四</span></p>
        <p class="title"><span>预计金额:</span><span class="red">1542.00</span></p>

      </div>
    </div>
</template>

<script>
  export default {
    name: 'purchasingApproval',
    data(){
      return{

      }
    },
    methods:{
      resetStyles(){
        document.querySelector('body').setAttribute('style', 'margin: 0 auto; width: 100%; background:#f3f3f3; overflow-x: hidden;height: 100%;');
      }
    },
    created(){
      this.resetStyles()
    }
  }
</script>

<style scoped lang="less">
@rem: 375/10rem;
.red{
  color: #F00;
}
  .main{
    flex: 1;
    font-size: 14/@rem;
    margin: 16/@rem;
    height: 252/@rem;
    padding: 16/@rem;
    background-color: #FFFFFF;
    border-radius: 8/@rem;
    border: 1/@rem solid #bfbfbf;
  }
</style>
