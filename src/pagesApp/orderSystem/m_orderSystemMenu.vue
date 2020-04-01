<template>
    <div class="">
<!--      <div class="shade" v-show="carNum"></div>-->
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
          <div v-for="(item,index) in list" :key="index">
            <div class="guessOrders" >
              <span class="guessOrderStr" @click="guessOrderEvent(index)">代客点餐</span>
              <span class="guessOrderBtn radio_button_icon" v-if="index==0" @click="guessOrderEvent(index)" :class="{'i-btn-check-number':isGuessChecks}"></span>
              <span class="icon-delete2 systemMenuIcon"  v-else @click="cancel(index)"></span>
            </div>
            <div class="guessOrder guessIndex" ref="guessOrderShow">
              <div class="guessOrderInput" v-show="guessOrderShow">
                <input type="number" style="background-color: #fff" :value="item.phone" placeholder="输入联系人" ref="phoneInput"  @blur="phoneValue(index)">
                <appLicencePlate class="guessSelector" :plate-show="plateShow" v-model="carNum" @input="selectArr">
                  <input type="text" readonly style="width: 100%;background-color: #fff" :value="item.plate" ref="plateInput" @blur="plateValue(index),plateShow==false" placeholder="输入车牌号">
                </appLicencePlate>
              </div>
              <div class="guessOrderNum" v-show="guessOrderShow">
                <div class="">
                  <p @click="guessNumEvent(indexs,index)" v-for="(indexs) in 8" :key="indexs" :class="{guessNumChoice: list[index].number === indexs}">{{indexs}}</p>
                  <input type="number" maxlength="5" v-model="item.number" @input="guessIptEvent($event)" onkeyup="item.number=value.replace(/^(0+)|[^\d]+/g,'')">
                </div>
                <p>
                </p>
              </div>
              <div class="guessOrderBottom" v-show="guessOrderShow" v-if="index == list.length-1">
                <div class="guessOrderBtn" @click="add(index,item.plate)">添加</div>
                <hr>
              </div>
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
      <appToast type="text" text="联系人或车牌号必填其中之一" v-show="toast" @login-success="toast = $event"></appToast>
    </div>
</template>

<script>
  import appLicencePlate from '../common/appLicencePlate'
  import { appviewmixin } from '@/assetsApp/app_view.js'
  import appToast from '../common/appToast'

  export default {
    name: 'm_orderSystemMenu',
    mixins: [appviewmixin],
    components: {
      appLicencePlate,
      appToast
    },
    data (){
      return{
        toast:false,
        plateShow:false,
        list:[
          {
            phone:'',
            plate:'',
            number:'1'
          },
        ],
        index:0,
        value:'',
        carNum:false,
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
        isCancelCon: false,

        guessOrderShow:false,

      }
    },
    methods: {
      phoneValue(index){
        this.index = index
        this.$nextTick(()=>{
          this.list[index].phone = this.$refs.phoneInput[index].value
        })
      },
      plateValue(index){
        this.index = index
      },
      selectArr(value){
        if(value==undefined){return}
        if(typeof value=='object'){
          this.list[this.index].plate = value.join('')
        }else{
          this.list[this.index].plate = value
        }
      },
      cancel(index){
        this.list.splice(index, 1)
        console.log(this.list)
      },
      add(index,item){
        this.list[index].plate = item
        this.list.push({phone:'',plate:'',number:'1'})
      },
      //返回我的审批页面
      backEvent () {
        this.$router.go(-1);
        // this.$router.push("/homeApp/m_myApprovalManager?isFinish=1&id=1")
      },
      historyEvent(){
        this.$router.push("/homeApp/m_orderSystemHistory?isFinish=1&id=1")
      },
      guessNumEvent(indexs,index){
        this.guessNum = indexs + 1
        this.guessNumOn = indexs
        this.list[index].number = indexs
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
        // this.$refs.guessOrderShow[index].display = 'none'
        // this.isAutoChecks = true
        // this.guessNumOn = 0
        // this.guessNum = '1'

        this.isAutoChecks = !this.isAutoChecks

      },
      guessOrderEvent(index){
        // if( document.getElementsByClassName("guess"+index).css("display")==='none'){
        //   alert()
        // }
          // if( document.getElementById("div").css("display")==='block')
        // console.log(index,this.$refs.guessOrderShow[index].display)

        // this.isAutoChecks = false
        // if(index!=='0'){
        //   return
        // }
        this.isGuessChecks = !this.isGuessChecks
        if(this.isGuessChecks === false){
          this.guessOrderShow = !this.guessOrderShow
          this.guessNum = '1'
          this.guessNumOn = 0
        }else{
          this.guessOrderShow = !this.guessOrderShow
          // console.log(this.isGuessChecks)

        }
      },
      orderMenuEvent(){
        console.log(this.list[0].phone,this.list[0].plate)
        if(this.list[0].phone==''&&this.list[0].plate==''){
          this.toast = true
          setTimeout(()=>{
            this.toast = false
          },2800)
          return
        }
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
        // this.guessOrderShow = false
      })
    }
  }
</script>

<style scoped lang="less">
  @rem: 375/10rem;
  .systemMenuIcon{
    font-size: 18/@rem;
    display: flex;
    align-items: center;
  }
  .shade{
    position: fixed;
    width: 100%;
    height: 30rem;
    right: 0;
    left: 0;
    bottom: 0;
    background-color: black;
    z-index: 1;
    opacity: 0.6;
  }
  .guessSelector{
    margin: 0;
    width: 49%;

    .guessInput{
      width:100%;
      height: 24px;
      display: flex;
      justify-content: center;
    }
  }
  .guessOrder{
    .guessOrderInput{
      margin: 0 50/@rem !important;
      display: flex;
      justify-content: space-around;
      margin:auto;
      input::-webkit-input-placeholder{
        color: #bfbfbf;
      }
      input{
        width: 48%;
        height: 24.5/@rem;
        text-indent: 12/@rem;
        box-sizing: border-box;
        font-size: 12/@rem;

        border-radius: 4/@rem;
        background-color: #f3f3f3;
        border:1/@rem solid #bfbfbf;
      }
    }
  }
  .guessOrders{
    padding: 0 12/@rem;
    display: flex;
    justify-content: space-between;
  }
  .guessOrderBottom{
    flex: 1;
    .guessOrderBtn{
      margin: auto;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius:8/@rem;
      background: #f3f3f3;
      margin-bottom: -16/@rem;
      color:#49a9ea;
      border:1/@rem solid #49a9ea;
      width: 60/@rem;
      font-size: 14/@rem;
      height: 32.5/@rem;
    }
  }
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
    display: none;
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
    margin: 46/@rem 16/@rem 0;
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
    margin-bottom: 30/@rem;

    margin-top: 10/@rem;
    font-size: 14/@rem;
    color: #999;
    text-align: center;
  }
</style>
