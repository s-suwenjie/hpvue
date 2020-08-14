<template>
  <div class="">
    <yhm-app-structure-top-tap>
      <yhm-app-structure-top-tap-menu @call="backEvent" title="返回菜单"></yhm-app-structure-top-tap-menu>
      <yhm-app-structure-top-tap-menu :select="true" title="订餐统计"></yhm-app-structure-top-tap-menu>
    </yhm-app-structure-top-tap>
    <div style="background-color: #fff">
      <p class="titNum">今日共计{{content.length}}份</p>

      <div class="sticsCon">
        <div v-for="(item,index) in content" :key="index">
          <div class="sticsLft">
            <div class="lftImg">
              <img src="../../assets/head.png" alt="">
            </div>
            <div class="lftP">
              <p class="lftName">{{item.name}}</p>
              <p class="lftTime">{{item.time}}</p>
            </div>
          </div>
          <div class="stiscRgt">
            <p class="stateNum">{{item.num}}份</p>
            <p class="stateTxt" :style="{color: item.color}">{{item.state}}</p>
          </div>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
  import { appviewmixin } from '@/assetsApp/app_view.js'
  export default {
    name: 'm_orderStatistics',
    mixins: [appviewmixin],
    data(){
      return{
        num: '',
        content: [
          {
            "head": "../../assets/head.png",
            "name": "名称1",
            "time": "2020-02-06 09:52",
            "num": "3",
            "state": "已领",
            "color": "#1FBC6E",
          },
          {
            "head": "../../assets/head.png",
            "name": "名称2",
            "time": "2020-02-14 09:12",
            "num": "3",
            "state": "未领",
            "color": "#FD6802"
          },
          {
            "head": "../../assets/head.png",
            "name": "名称3",
            "time": "2020-02-20 09:52",
            "num": "3",
            "state": "已领",
            "color": "#1FBC6E",
          },
          {
            "head": "../../assets/head.png",
            "name": "名称4",
            "time": "2020-02-05 09:12",
            "num": "3",
            "state": "未领",
            "color": "#FD6802"
          },
          {
            "head": "../../assets/head.png",
            "name": "名称5",
            "time": "2020-02-05 09:74",
            "num": "3",
            "state": "未领",
            "color": "#FD6802"
          },
          {
            "head": "../../assets/head.png",
            "name": "名称6",
            "time": "2020-12-05 09:21",
            "num": "3",
            "state": "未领",
            "color": "#FD6802"
          },
          {
            "head": "../../assets/head.png",
            "name": "7",
            "time": "2020-02-05 09:52",
            "num": "3",
            "state": "已领",
            "color": "#1FBC6E",
          },
          {
            "head": "../../assets/head.png",
            "name": "名称",
            "time": "2020-02-15 09:52",
            "num": "3",
            "state": "未领",
            "color": "#FD6802"
          },
          {
            "head": "../../assets/head.png",
            "name": "名称",
            "time": "2020-02-05 09:52",
            "num": "3",
            "state": "已领",
            "color": "#1FBC6E",
          },
          {
            "head": "../../assets/head.png",
            "name": "名称",
            "time": "2020-02-05 09:52",
            "num": "3",
            "state": "已领",
            "color": "#1FBC6E",
          },
          {
            "head": "../../assets/head.png",
            "name": "名称",
            "time": "2020-02-05 09:52",
            "num": "3",
            "state": "已领",
            "color": "#1FBC6E",
          },
          {
            "head": "../../assets/head.png",
            "name": "名称",
            "time": "2020-02-05 09:52",
            "num": "3",
            "state": "已领",
            "color": "#1FBC6E",
          },
          {
            "head": "../../assets/head.png",
            "name": "名称",
            "time": "2020-02-05 09:52",
            "num": "3",
            "state": "已领",
            "color": "#1FBC6E",
          }
        ]
      }
    },
    methods: {
      backEvent () {
        this.$router.push("/homeApp/m_myApprovalManager?isFinish=1&id=1");
      },
    },
    created () {
      document.querySelector('body').setAttribute('style', 'background-color:#eee;');
    }
  }
</script>

<style scoped lang="less">
  @rem: 375/10rem;
  .titNum{
    position: fixed;
    padding-left: 12/@rem;
    height: 36/@rem;
    width: 100%;
    display: flex;
    align-items: center;
    background-color: #fff;
    font-size: 17/@rem;
    color: #333;
  }
  .sticsCon{
    padding-top: 1.2rem;
    overflow-x: scroll;
  }
  .sticsCon>div{
    margin: 0 12/@rem 24/@rem;
    height: 34/@rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .sticsLft{
      display: flex;
      justify-content: flex-start;
      .lftImg{
        width: 32/@rem;
        height: 32/@rem;
        border-radius: 50%;
        overflow: hidden;
        border: 1px solid #707070;
        margin-right: 4/@rem;
        img{
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
      .lftP{
        float: left;
        .lftName{
          color: #333;
          font-size: 14/@rem;
        }
        .lftTime{
          color: #999;
          font-size: 12/@rem;
        }
      }
    }
    .stiscRgt{
      display: flex;
      align-items: center;
      justify-content: center;
      width: 92/@rem;
      height: 24/@rem;
      font-size: 12/@rem;
      border-radius: 12/@rem;
      border: 1px solid #707070;
      p{
        padding: 4/@rem 12/@rem;
      }
      p:first-child{
        border-right: 1px solid #707070;
      }
    }
  }
</style>

