<template>
    <div>
      <div style="overflow: auto;">

      <appSwipe :list="list" @change="touChange" :auto-scroll="true" :chill-time="3000"></appSwipe>
<!--      <div class="top_data flex">-->
<!--        <div class="top_data_center flex">-->
<!--          <span>{{value3}} {{week}}</span>-->
<!--          <span class="icon-arrow top_data_icon" ></span>-->
<!--        </div>-->
<!--      </div>-->
        <yhm-app-date-box :value="value3" ref="time" id="value3" class="time" @focus="focusEvent" @blur="blurEvent"></yhm-app-date-box>
<!--        <yhm-datebox type="data"></yhm-datebox>-->
      <div class="main flex">
        <div class="main_left main_center">
            <div class="img">
              <span class="img_test" v-show="!directionShow">支出</span>
              <img src="../../../static/staticImage/unit/disbursement.svg" class="rotateAgainst main_img" alt="支出"  v-show="!directionShow">
              <span class="img_test" style="color: #49a9ea;" v-show="directionShow">收入</span>
              <img src="../../../static/staticImage/unit/income.svg" class="img_right rotateJust main_img" alt="收入" v-show="directionShow">
            </div>
            <p class="main_left_money" style="color: #f00;" v-show="!directionShow" v-html="tenThousandFormatShow(money)"></p>
          <p class="main_left_money" style="color: #49a9ea;" v-show="directionShow" v-html="tenThousandFormatShow(money)"></p>
        </div>
        <div class="interval"></div>
        <div class="main_right main_center">
          <p>当前余额</p><span v-html="tenThousandFormatShow(money)"></span>
          <p>交易后余额</p><span v-html="tenThousandFormatShow(money)"></span>
        </div>
      </div>
      <yhm-app-structure-menu-group :content-show="false">
        <div class="top_title flex">
          <span>基本信息 <i>内部互转</i></span>
          <span>对方信息 <i>特斯拉</i></span>
        </div>
        <p class="text">
          <span>元亨机械服务(郑州)有限公司</span>
          <span>元亨机械服务(郑州)有限公司</span>
        </p>
        <p class="text">
          <span>中信银行有限公司什么路支路</span>
          <span>中信银行有限公司什么路支路</span>
        </p>
        <p class="text">
          <span>6217 **** **** {{num}} 人民币</span>
          <span>6217 **** **** {{num}} 人民币</span>
        </p>
        <div class="height"></div>
        <appInput v-model="value" :value="value" title="事由"></appInput>
        <appInput v-model="value2" type="file" :value="value2" title="凭证" @change="fileChange"></appInput>
        <appInput v-model="value" :value="value" title="备注"></appInput>
      </yhm-app-structure-menu-group>
      <yhm-app-form-operate class="space" v-show="btnShow">
        <yhm-app-button @call="adoptEvent(),toast=true" value="冲正" category="six"></yhm-app-button>
      </yhm-app-form-operate>
        <appToast type="loading" text="开发中" v-show="toast"></appToast>
      </div>

    </div>
</template>

<script>
  import { appformmixin } from '@/assetsApp/app_form.js'
  import appSwipe from '../common/appSwipe'
  import appInput from '../common/appInput'
  import appToast from '../common/appToast'
  export default {
    name: 'bankDetailCashierView',
    mixins: [appformmixin],
    components:{
      appSwipe,
      appInput,
      appToast
    },
    data(){
      return{
        toast:false,
        index:'',
        loadFinish:false,
        week:'',
        btnShow:true,
        directionShow:true,
        money:'367896123',
        num:'9670',
        imgBase:'',
        value:'221112',
        value2:'',
        value3:'2020-06-08',
        list: [
          {
            company:'中国联合网络通信有限公司北京市分公司',
            money:' 122151220'
          },{
            company:'中国联合网络通信有限公司北京市分公司',
            money:' 23687920'
          },{
            company:'中国联合网络通信有限公司北京市分公司',
            money:' 1778920'
          },{
            company:'中国联合网络通信有限公司北京市分公司',
            money:' 5789620'
          },{
            company:'中国联合网络通信有限公司北京市分公司',
            money:' 6232320'
          },{
            company:'中国联合网络通信有限公司北京市分公司',
            money:' 3678920'
          },{
            company:'中国联合网络通信有限公司北京市分公司',
            money:' 6232320'
          },{
            company:'中国联合网络通信有限公司北京市分公司',
            money:' 3678920'
          },
        ],
      }
    },
    methods:{
      focusEvent(){
        this.btnShow = false
      },
      blurEvent(item){
        console.log(item)
        var weekDay = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
        var myDate = new Date(Date.parse(item));
        this.week = weekDay[myDate.getDay()]
        this.btnShow = true
      },
      getRandom(start, end, fixed=0) {
        let differ = end - start
        let random = Math.random()
        return (start + differ * random).toFixed(fixed)
      },
      touChange(index){//轮播图发生变化时
        this.index = index
        this.num = this.getRandom(1000, 9999)
        // console.log('index',index)
      },
      fileChange(base){//获取选中的
        this.imgBase = base
        console.log(base,'base64')
      },
      adoptEvent(){
        // console.log(this.imgBase,this.value)
      }
    },
    created () {
      this.$nextTick(()=>{
        this.loadFinish = !this.loadFinish
      })
    },
    watch:{
      index(val, newval) {
        // this.directionShow=!this.directionShow
      },
      value3(val, newval){
        console.log(val)
        this.btnShow = true
      }
    }
  }
</script>

<style scoped lang="less">
@rem:375/10rem;
.time{
  flex: 1;
  margin: 15/@rem 10/@rem;
  background-color: #fff;
}
.space{
  margin-top: 12/@rem;
}
.text{
  display: flex;
  align-items: center;
  font-size: 14/@rem;
  padding:0 12/@rem;
  height: 56/@rem;
  span{
    display: inline-block;
    width: 132/@rem;
    height: 34/@rem;
  }
  span:nth-child(1){
    margin-right: 44/@rem;
  }
}
.text:nth-child(2){
  margin-top: 12/@rem;
}
.height{
  width: 100%;
  height: 12/@rem;
  border-bottom: 1/@rem solid #bfbfbf;
}
.text:nth-child(odd){
  background-color: #f3f3f3;
}
.top_title{
  width: 100%;
  padding:0 12/@rem;
  border-bottom: 1/@rem solid #bfbfbf;
  justify-content: space-between;
  span:nth-child(2){
    padding: 12/@rem 0;
    border-left: 1/@rem solid #bfbfbf;
    text-indent: 12/@rem;
  }
    span{
    flex: 1;
    font-size: 14/@rem;
    i{
      margin:0 0 -2/@rem 26/@rem;
      font-size: 12/@rem;
      font-style: normal;
    }
  }
}
.top_data{
  height: 37/@rem;
  margin: 20/@rem 8/@rem 8/@rem;
  font-size: 14/@rem;
  background-color: #fff;
  border-radius: 4/@rem;
  border: solid 1/@rem #bfbfbf;
  .top_data_center{
    width: 145/@rem;
    height: 15/@rem;
    margin: 0 auto;
    justify-content: space-between;
    span{
      white-space: nowrap;
    }
    span:nth-child(1){
      color: #333;
      margin-right: 12/@rem;
    }
    .top_data_icon:before{
      color: #d9d9d9;
      font-size: 12/@rem;
    }
  }
}
.main{
  height: 122/@rem;
  margin: 0 8/@rem;
  justify-content: space-between;
  .main_left{
    padding:0 6/@rem;
  }
  .main_right{
    box-sizing: border-box;
    padding: 12/@rem;
    font-size: 14/@rem;
    p{
      color: #666666;
      margin-bottom: 8/@rem;
    }
    p:nth-child(3){
      margin-top: 8/@rem;
    }
    span{
      display: inline-block;
      width: 100%;
      text-align: right;
    }
  }
  .main_center{
    width: 100%;
    height: 122/@rem;
    background-color: #ffffff;
    border-radius: 8/@rem;
    border: solid 1/@rem #bfbfbf;
  }
  .interval{
    width: 12/@rem;
    height: 100%;
  }
  .main_img{
    width: 46/@rem;
    height: 76/@rem;
  }
}
.flex{
  display: flex;
  align-items: center;
}
.main_left_money{
  font-size: 14/@rem;
  text-align: center;
}
.rotateAgainst{
  transform:rotate(-7deg);
  -ms-transform:rotate(-7deg); 	/* IE 9 */
  -moz-transform:rotate(-7deg); 	/* Firefox */
  -webkit-transform:rotate(-7deg); /* Safari 和 Chrome */
  -o-transform:rotate(-7deg); 	/* Opera */
}
.rotateJust{
  transform:rotate(7deg);
  -ms-transform:rotate(7deg); 	/* IE 9 */
  -moz-transform:rotate(7deg); 	/* Firefox */
  -webkit-transform:rotate(7deg); /* Safari 和 Chrome */
  -o-transform:rotate(7deg); 	/* Opera */
}
.img{
  width: 73/@rem;
  height: 76/@rem;
  position: relative;
  margin: 12/@rem auto 8/@rem auto;
  background: url("../../../static/staticImage/unit/money.svg") no-repeat;
  background-size: 73/@rem 76/@rem;

  .img_right{
    position: absolute;
    right: 0;
  }
  .img_test{
    color: #f00;
    font-size: 14/@rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
}

</style>
