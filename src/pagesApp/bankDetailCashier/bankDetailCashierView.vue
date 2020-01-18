<template>
    <div>
      <appswipe :list="list" @change="touChange"></appswipe>

      <div class="top_data flex">
        <div class="top_data_center flex">
          <span>2019-08-05 周四</span>
          <span class="icon-arrow top_data_icon" ></span>
        </div>
      </div>

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

        <div class="main_right main_center">
          <p>当前余额</p><span v-html="tenThousandFormatShow(money)"></span>
          <p>交易后余额</p><span v-html="tenThousandFormatShow(money)"></span>
        </div>
      </div>

      <div>
        <yhm-app-structure-menu-group>
            <yhm-app-view-control title="事由" :content="12" ></yhm-app-view-control>
            <yhm-app-view-control title="凭证" :content="123" ></yhm-app-view-control>
            <yhm-app-view-control title="备注" :content="123" ></yhm-app-view-control>
        </yhm-app-structure-menu-group>
      </div>

    </div>
</template>

<script>
  import { appformmixin } from '@/assetsApp/app_form.js'
  import appswipe from '../common/appswipe'
  export default {
    name: 'bankDetailCashierView',
    mixins: [appformmixin],
    components:{
      appswipe
    },
    data(){
      return{
        directionShow:true,
        money:'367896123',
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
      touChange(index){
        console.log('index',index)
      }
    },
    created () {

    }
  }
</script>

<style scoped lang="less">
@rem:375/10rem;
.top_data{
  width: 351/@rem;
  height: 37/@rem;
  margin: 20/@rem auto 12/@rem auto;
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
  width: 351/@rem;
  height: 122/@rem;
  margin: 0 auto;
  justify-content: space-between;
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
    width: 170/@rem;
    height: 122/@rem;
    background-color: #ffffff;
    border-radius: 8/@rem;
    border: solid 1/@rem #bfbfbf;
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
