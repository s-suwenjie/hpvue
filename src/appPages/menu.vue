<template>
  <div  style="background-color: #f3f3f3 !important;">
    <div class="center">
      <div class="title">我的审批</div>
      <div class="main">
          <div class="main_diamonds">
            <div class="img">
              <i class="numtip">1</i>
              <img src="../../static/appStatic/images/myImg/paymentPlan.svg" alt="">
            </div>
            <span>付款计划</span>
          </div>
          <div class="main_diamonds">
            <div class="img">
              <img src="../../static/appStatic/images/myImg/paymentApply.svg" alt="">
            </div>
            <span>付款申请</span>
          </div>
          <div class="main_diamonds">
            <div class="img">
              <img src="../../static/appStatic/images/myImg/reimbursement.svg" alt="">
            </div>
            <span>报销申请</span>
          </div>
          <div class="main_diamonds">
            <div class="img">
              <img src="../../static/appStatic/images/myImg/paymentBuy.svg" alt="">
            </div>
            <span>采购计划</span>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'menu',
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
body,html{
  background-color: #f3f3f3 !important;
}
.flex{
  display: flex;
  justify-content: space-around;
}
.title{
  margin:16/@rem 0 16/@rem 16/@rem;
  font-size: 17/@rem;
  color: #333333;
}
  .center{
    /*width: 9.146666666666667rem;*/
    flex: 1;
    height: 5.813333333333333rem;
    border-radius: 8/@rem;
    margin: 16/@rem 16/@rem 0;
    background-color: #fff;
    box-sizing: border-box;
    border:0.0266666666666667rem solid #bfbfbf;
  }
  .main{
    margin: 0 24/@rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    div{
      width: 33%;
      margin-bottom: 24/@rem;
    }
  }
  .main img{
    display: block;
    width: 0.88rem;
    height: 0.88rem;
    margin: 0 auto 8/@rem;
  }
  .numtip{
    position: absolute;
    top:-2/@rem;
    right: 0;
    font-size: 12/@rem;
    color: #fff;
    background-color: #f00;
    border-radius: 50%;
    width: 18/@rem;
    height: 18/@rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-style: normal;
  }
  .main span{
    font-size: 14/@rem;
    color: #333;
    text-align: center;
    display: block;
  }
  .main_diamonds{
    position: relative;
    width:1.493333333333333rem;
    height:1.4933333333333337rem;

    .img{
      width: 54/@rem;

      margin: 0 auto;
      position: relative;
    }
  }
</style>
