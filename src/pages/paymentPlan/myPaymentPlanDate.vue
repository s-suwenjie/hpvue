<template>
  <div id="vue" class="mainbody">
    <div class="container">

      <div class="viewList caldarView">
        <div class="caldarTit ">
          <div class="headerTop" >
            <button class="backToday" @click="backNowMon">返回当月</button>
              <p class="" style="margin: 0 10px;">
                <!--<yhm-form-date @call="initDate" width="180px" :value="planDate" id="planDate" position="b"></yhm-form-date>-->
                <yhm-datebox type="month" @call="initDate" style="width: 120px" :value="planDate" id="planDate" position="b"></yhm-datebox>
              </p>
              <a href="javascript:;" class="cdCalendar"></a>
            <div class="calderArrow">
              <a href="javascript:;" class="cdArrowLft" @click="cdArrowLft"></a>
              <a href="javascript:;" class="cdArrowRgt" @click="cdArrowRgt"></a>
            </div>
          </div>
        </div>
        <div class="caldarCon">
          <div class="weekTit">
            <p>周日</p>
            <p>周一</p>
            <p>周二</p>
            <p>周三</p>
            <p>周四</p>
            <p>周五</p>
            <p>周六</p>
          </div>
          <div class="monCon">
            <div class="monConRenminbi"
                 v-for="(item,index) in content" :key="item.index"
                 @click="view(item.dateAndTime,item.sumMoney)"
                 :class="[
                 {beforeDay:item.category==0},
                 {weekend:index%7==0},
                 {weekend:index%7==6},
                 {otherMonth:item.month==0},
                 {otherMonth:item.month==2},
                 {notAll:item.sumMoney<=0},
                 {redBg:item.isSize==='0'},
                 {blueBg:item.isSize==='1'},
                 {toDayNow:item.category==1},
                 ]">
              <p class="toDay" >{{item.datetimeString}}</p>
              <div class="dateProfit">
                <span class="ammount">
                   <a href="javascript:;" class="cdRenminbi"
                      :class="[
                      {grayDayIcon:item.category==0},
                      {toDayIcon:item.category==1},
                      {notAll:item.sumMoney<=0},
                      {redIcon:item.isSize==='0'},
                      {blueIcon:item.isSize==='1'},
                      item.sumMoney==0?'':'icon-rmb2',
                      item.sumMoney==0?'':'bgNone'
                      ]">
                   </a>
                  <!--<em class="addNum">{{item.sumMoney==0?'':item.sumMoney}}</em>-->
                  <p class="addNum" v-if="item.sumMoney != '0'" v-html="tenThousandFormatShow(item.sumMoney==0?'':item.sumMoney)"></p>
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { accMul, accAdd, guid, formatDate } from '@/assets/common.js'
import { selectItem, managermixin } from '@/assets/manager.js'
export default {
  name: 'paymentPlanDate',
  mixins: [managermixin],
  data () {
    return {
      content: [],
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
      planDate: new Date().getFullYear() + '-' + (new Date().getMonth() + 1)
    }
  },
  methods: {
    initDate () {
      this.dateAndTime =  this.planDate + '-01'
      let params = {
        dateAndTime:this.dateAndTime
      }
      this.ajaxJson({
        url: '/PersonOffice/getPaymentPlanDate',
        data: params,
        loading: '0',
        call: (data) => {
          this.content = data
        }
      })
    },
    cdArrowRgt () {
      let newDate = this.planDate.split('-')
      let newYear = newDate[0]
      let newMonth = newDate[1]
      newMonth = accAdd(1,newMonth)
      if (newMonth === 13) {
        newMonth = 1
        newYear = accAdd(1, newYear)
      }
      this.planDate = newYear + '-' + (newMonth<10?'0':'') + newMonth
      this.initDate()
    },
    cdArrowLft () {
      let newDate = this.planDate.split('-')
      let newYear = newDate[0]
      let newMonth = newDate[1]
      newMonth = accAdd(-1,newMonth)
      if (newMonth === 0) {
        newMonth = 12
        newYear = accAdd(-1, newYear)
      }

      this.planDate = newYear + '-' + (newMonth<10?'0':'') + newMonth
      this.initDate()
    },
    backNowMon(){
      this.planDate = new Date().getFullYear() + '-' + (new Date().getMonth() + 1)
      this.initDate()
    },
    view (dateAndTime, sumMoney) {
      if (sumMoney > 0) {
        this.$dialog.OpenWindow({
          width: 1050,
          height: 640,
          url: '/selectPlanDate?dateAndTime=' + dateAndTime,
          title: '付款计划信息',
          closeCallBack: (data) => {
          }
        })
      }
    }
  },
  created () {
    this.initDate()
  }
}
</script>

<style scoped lang="less">
  /* 日历样式 */
  .formtextbox .context .content .box{
    width: 180px !important;
  }
  .formtextbox{
    background-color: transparent !important;
  }
  .formtextbox .context .title{
    display: none !important;
  }
  /* 页面原有样式 */
  .caldarView {
    width: 100%;
    padding-bottom: 16px;
  }
  .caldarTit {
    display: flex;
    justify-content:center;
    margin: 16px 25px 16px 25px;
    text-align: center;
    height: 62px;
    background-color: #e9e9e9;
    box-shadow: 0 0 1px 0
    #999999;
    border-radius: 4px;
  }
  .headerTop{
    display: flex;
    align-items: center;
  }
  .icon-rmb2:before{
    font-size: 16px;
  }
  .toDayIcon:before{
    color: #f18806 !important;
  }
  .grayDayIcon:before{
    color: #bfbfbf !important;
  }
  .afterDayIcon:before{
    color: #49a9ea !important;
  }

  .redIcon:before{
    color: #f00 !important;
  }
  .blueIcon:before{
    color: #49a9ea !important;
  }

  .beforeDay{
    background-color: #d9d9d9 !important;
  }

  .afterDay{
    background-color: #d4ecfc !important;
  }
  .weekend{
    p{
      color: #f47564 !important;
    }
  }

  .redBg{
    background-color: #FFD8D8 !important;
  }
  .blueBg{
    background-color: #d6efff !important;
  }

  .toDayNow{
    background-color: #fdffd6 !important;
  }

  .bgNone{
    background-color: #fff !important;
  }
  .lastMonth{
    background-color: #fff !important;
    p{
      color: #999 !important;
    }
  }
  .otherMonth{
    background-color: #ccc !important;
    p{
      color: #999 !important;
    }
  }
  .notAll{
    cursor: not-allowed !important;
  }
  .caldarTit .backToday {
    height: 32px;
    background-color: #49a9ea;
    color: #fff;
    font-family: MicrosoftYaHei;
    font-size: 14px;
    padding: 0 10px;
    border: 1px solid #49a9ea;
    cursor: pointer;
  }
  .caldarTit .backToday:hover {
    background-color: #49a9ea;
    color: #fff;
  }
  .nowDate {
    display: flex;
    justify-content:center;
    width: 123px;
    height: 32px;
    background-color: #fff;
    border-radius: 4px;
    border: solid 1px #d9d9d9;
    margin:  0 20px;
  }
  .nowDate .solarDate {
    display: inline-block;
    font-size: 14px;
    color: #333;
    cursor: pointer;
    margin: 7px 0 0 10px;
  }
  .nowDate a{
    align-items: center;
    display: inline-block;
    width: 18px;
    height: 18px;
    margin: 7px 0 0 10px  ;
  }
  .nowDate .cdCalendar{
    background: url("../../../static/staticImage/calendar.svg") no-repeat center center;
    -webkit-background-size: contain;
    background-size: contain;
  }
  .nowDate .solarDate:hover {
    text-decoration: none;
  }
  .calderArrow {
    display: inline-block;
    height: 24px;
    a {
      display: inline-block;
      width: 24px;
      height: 24px;
      margin: 0 4px;
    }
  }
  .icon-rmb2{
    border-radius: 50%;
  }
  .calderArrow{
    .cdArrowLft {
      background: url("../../../static/staticImage/caldar/arrowLft.svg") no-repeat center center;
      -webkit-background-size: contain;
      background-size: contain;
    }
    .cdArrowLft:hover {
      background: url("../../../static/staticImage/caldar/arrowLftHover.svg") no-repeat center center;
      -webkit-background-size: contain;
      background-size: contain;
    }
    .cdArrowRgt {
      background: url("../../../static/staticImage/caldar/arrowRgt.svg") no-repeat center center;
      -webkit-background-size: contain;
      background-size: contain;
    }
    .cdArrowRgt:hover {
      background: url("../../../static/staticImage/caldar/arrowRgtHover.svg") no-repeat center center;
      -webkit-background-size: contain;
      background-size: contain;
    }
  }
  .caldarCon {
    margin: 0 26px;
    background-color: #a6d3ef;

    border-left: 1px solid #bfbfbf;
  }
  .weekTit {
    height: 48px;
    display: flex;
    justify-content: space-between;
    flex-wrap: nowrap;
    border-radius: 8px 8px 0 0;
    p {
      display: inline-block;
      text-align: center;
      line-height: 51px;
      color: #333;
      font-size: 14px;
      width: 221px;
    }
  }
  .monCon {
    overflow: hidden;
    background-color: #fff;
    box-shadow: 0 0 1px 0 #999;
    border-radius: 0 0 8px 8px;
    display: flex;
    flex-wrap: wrap;
  }
  .ammount{
    display: flex;
    justify-content: center;
    .cdRenminbi{
      margin-left: 10px;
    }
    .cdRenmArr{
      color: #fff;
      background-color: red;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      line-height: 20px;
      font-size: 10px;
    }
  }
  .monCon .toDay {
    color: #333;
    height: 20px;
    margin: 15px 0;
    text-align: center;
  }
  .monCon>.monConError:hover{
   background-color:#f6acac;
 }
  .ammount .monConError .calderArrow {
    color: #fff;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    line-height: 20px;
    font-size: 10px;
    background-color: #f6acac;
  }
  .monCon > div {
    width: 221px;
    height: 93px;
    border-bottom: 1px solid #bfbfbf;
    text-align: center;
    cursor: pointer;
    position: relative;
  }
  .monCon > div > span {
    margin-top: 5px;
    display: inline-block;
    font-size: 18px;
    line-height: 26px;
    text-align: center;
    color: #999;
  }
  .monConRenminbi{
    border-right: 1px solid #bfbfbf;
    box-sizing: border-box;
    .ammount{
      display: flex;
      align-items: center;
    }
  }
 .monConRenminbi:hover {
    background-color: #d4ecfc;
  }
  .dateProfit {
    overflow: hidden;
    font-size: 14px;
    line-height: 14px;
    color: #333;
    padding: 0 5px;
    span {
      display: inline-flex;
      white-space: nowrap;
      width: 100%;
      justify-content: space-between;
      color: #999;
    }
    .balance em {
      color: #333;
    }
  }
  .addNum {
    color: #333333;
    font-size: 14px;
  }

</style>
