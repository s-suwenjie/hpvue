<template>
    <div class="">
      <yhm-app-structure-top-tap>
        <yhm-app-structure-top-tap-menu @call="backEvent" title="返回"></yhm-app-structure-top-tap-menu>
        <yhm-app-structure-top-tap-menu :select="true" title="点餐系统"></yhm-app-structure-top-tap-menu>
      </yhm-app-structure-top-tap>
      <div>
        <p class="history" @click="historyEvent">历史记录</p>
        <div class="orderMain" v-show="isOrderCon">
          <div class="autoOrder" @click="autoOrderEvent">
            <span class="autoOrderStr">自主点餐</span>
            <span class="autoOrderBtn radio_button_icon" :class="{'i-btn-check-number':isAutoChecks}"></span>
          </div>
          <div class="guessOrder">
            <div @click="guessOrderEvent">
              <span class="guessOrderStr">代客点餐</span>
              <span class="guessOrderBtn radio_button_icon" :class="{'i-btn-check-number':isGuessChecks}"></span>
            </div>
            <div class="guessOrderNum">
              <div class="">
                <p @click="guessNumEvent(index)" v-for="(item,index) in 8" :key="index" :class="{guessNumChoice: guessNumOn === index}">{{index+1}}</p>
                <input type="text" maxlength="5" v-model="guessNum"  @input="guessIptEvent($event)" onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')">
              </div>
              <p>
              </p>
            </div>
          </div>
        </div>
        <div class="orderEdBtn" v-if="isOrderEd">已点餐</div>
        <div class="orderBtn" @click="orderMenuEvent" v-if="isOrderMenu">我要点餐</div>
        <div class="orderCancel" @click="orderCancelEvent" v-if="isOrderCancel">我要撤销</div>
      </div>
      <div class="orderOKImg" v-if="isOrderImg">
        <img src="../../../static/appStatic/images/order.svg" alt="">
      </div>

<!--      <div class="orderOkTip" v-if="isOrderTip">-->
<!--        <span>订餐成功</span>-->
<!--      </div>-->

      <div class="mask" v-if="isMask">

      </div>
      <div class="cancelCon" v-if="isCancelCon">
        <span class="definiteReco">确认撤销?</span>
        <div>
          <p class="definiteCancel" @click="definiteCancelEvent">取消</p>
          <p class="definiteConfirm" @click="definiteConfirmEvent">确定</p>
        </div>
      </div>
      <div class="orderBtmTip">
        <p>注：最晚于 10：00 前完成点餐服务、逾期将点餐失败</p>
      </div>

    </div>
</template>

<script>
  import { appviewmixin } from '@/assetsApp/app_view.js'
  export default {
    name: 'm_orderSystemMenu',
    mixins: [appviewmixin],
    data (){
      return{
        guessNum: 1,
        guessNumOn: 0,
        isAutoChecks: true,
        isGuessChecks: false,
        // isOrderTip: false,
        isOrderMenu: true,
        isOrderCancel: false,
        isOrderEd: false,
        isOrderCon: true,
        isOrderImg: false,
        isMask: false,
        isCancelCon: false
      }
    },
    methods: {
      //返回我的审批页面
      backEvent () {
        this.$router.push("/homeApp/m_myApprovalManager?isFinish=1&id=1")
      },
      historyEvent(){
        this.$router.push("/homeApp/m_orderSystemHistory?isFinish=1&id=1")
      },
      guessNumEvent(index){
        this.guessNum = index + 1
        this.guessNumOn = index
        this.isGuessChecks = true
      },
      guessIptEvent(event){
        this.isGuessChecks = true
        let guessIptNum = event.currentTarget.value
        if(guessIptNum<9){
          this.guessNumOn = parseInt(guessIptNum) - 1
        }else{
          this.guessNumOn = -1
        }
      },
      autoOrderEvent(){
        // this.isAutoChecks = true
        // this.guessNumOn = 0
        // this.guessNum = '1'

        this.isAutoChecks = !this.isAutoChecks

      },
      guessOrderEvent(){
        // this.isAutoChecks = false
        this.isGuessChecks = !this.isGuessChecks
        if(this.isGuessChecks === false){
          this.guessNum = '1'
          this.guessNumOn = 0
        }
      },
      orderMenuEvent(){
        // this.isOrderTip = true

        /*
        * 发送订单数据到后台
        *
        * */

        /* 订餐数据返回后台,并拿到后台订餐成功返回的提示后执行下面代码 */
        this.isOrderCon = false
        this.isOrderMenu = false
        this.isOrderCancel = true
        this.isOrderEd = true
        this.isOrderImg = true

      },

      /* 我要撤销 */
      orderCancelEvent(){
        this.isMask = true
        this.isCancelCon = true
      },
      /* 确认撤销--取消 */
      definiteCancelEvent(){
        this.isMask = false
        this.isCancelCon = false
      },
      /* 确认撤销--确定 */
      definiteConfirmEvent(){

        this.isMask = false
        this.isCancelCon = false

        this.isOrderCon = true
        this.isOrderEd = false
        this.isOrderCancel = false
        this.isOrderMenu = true
        this.isOrderImg = false
      }
    },
    created () {
      this.$nextTick(()=>{
      })
    }
  }
</script>

<style scoped lang="less">
  @rem: 375/10rem;
  .history{
    position: absolute;
    font-size: 12/@rem;
    color: #666;
    top: 2.2rem;
    right: 0.4rem;
  }
  .orderMain{
    margin-top: 180/@rem;
    border-top: 1px solid #d9d9d9;
    border-bottom: 1px solid #d9d9d9;
  }
  .autoOrder,.guessOrder{
    padding: 0 12/@rem;
  }
  .autoOrder{
    border-bottom: 1px solid #d9d9d9;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .guessOrder{
    div{
    display: flex;
    align-items: center;
    justify-content: space-between;
    }
  }
  .guessOrderBtn,.autoOrderBtn{
    display: inline-block;
  }
  .guessOrderBtn:before,.autoOrderBtn:before{
    color: #49A8EA;
    font-size: 22/@rem;
  }
  .autoOrderStr,.guessOrderStr{
    color: #333;
    font-size: 14/@rem;
    padding: 16/@rem 0;
    display: flex;
    align-items: center;
  }
  .guessOrderNum{
    margin: 20/@rem 44/@rem 0;
    div{
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      align-items: stretch;
      p{
        margin-right: 24/@rem;
        width: 30/@rem;
        height: 30/@rem;
        border: 1px solid #666;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #333;
        font-size: 14/@rem;
        margin-bottom: 24/@rem;
      }
      p:nth-child(5){
        margin-right: 0;
      }
      input{
        width: 88/@rem;
        height: 32/@rem;
        border-radius: 4/@rem;
        border: 1px solid #707070;
        font-size: 24/@rem;
        color: #333;
        text-align: center;
      }
    }
  }
  .guessNumChoice{
    background-color: #49a9ea;
    color: #fff !important;
    border-color: #1e8fdc !important;
  }
  .orderBtn,.orderCancel,.orderEdBtn{
    background-color: #49a9ea;
    border: 1px solid #1e8fdc;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 16/@rem;
    border-radius: 8/@rem;
    margin: 24/@rem 16/@rem 0;
    padding: 12/@rem 0;
  }
  .orderEdBtn{
    background-color: #d9d9d9;
    border: 1px solid #bfbfbf;
    color: #999;
    margin-top: 338/@rem;
  }
  .orderCancel{
    margin: 44/@rem 16/@rem 0;
  }
  .mask{
    position: fixed;
    z-index: 9;
    top: 0;
    width: 100vw;
    height: 100vh;
    background-color: #333;
    opacity: 0.6;
  }

  .orderOkTip{
    position: absolute;
    z-index: 9;
    width: 120/@rem;
    height: 100/@rem;
    border-radius: 8/@rem;
    background-color: #333;
    opacity: .6;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    span{
      display: flex;
      flex-wrap: nowrap;
      justify-content: center;
      align-items: center;
      color: #fff;
      font-size: 22/@rem;
    }
  }
  .orderOKImg{
    width: 100/@rem;
    height: 100/@rem;
    position: absolute;
    z-index: 9;
    top: -140/@rem;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .cancelCon{
    width: 250/@rem;
    height: 135/@rem;
    position: absolute;
    z-index: 10;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    background-color: #fff;
    border-radius: 4/@rem;
  }
  .cancelCon{
    .definiteReco{
      height: 84/@rem;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 14/@rem;
      color: #333;
      border-bottom: 1px solid #d9d9d9;
    }
    div{
      display: flex;
      justify-content: space-between;
      text-align: center;
      font-size: 14/@rem;
      p{
        width: 124/@rem;
        height: 50/@rem;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      p:first-child{
        border-right: 1px solid #d9d9d9;
      }
      p:last-child{
        color: #49A8EA;
      }
    }
  }
  .orderBtmTip{
    position: absolute;
    right: 0;
    left: 0;
    margin-top: 2.2rem;
    font-size: 14/@rem;
    color: #999;
    text-align: center;
  }
</style>
