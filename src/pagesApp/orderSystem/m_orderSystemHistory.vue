<template>
  <div class="">

    <yhm-app-structure-top-tap>
      <yhm-app-structure-top-tap-menu @call="backEvent" title="返回订餐"></yhm-app-structure-top-tap-menu>
      <yhm-app-structure-top-tap-menu :select="true" title="历史记录"></yhm-app-structure-top-tap-menu>
    </yhm-app-structure-top-tap>
      <div style="background-color: #fff">
        <div class="calendar">
          <div class="calendarTop">
            <div class="calendarBtnLft" @click="prevMonthEvent">上一月</div>

            <yhm-app-form-date-box title="" :value="calendarIpt" id="calendarIpt" type="month"></yhm-app-form-date-box>

<!--            <input type="text" readonly class="calendarIpt" v-model="calendarIpt">-->


            <div class="calendarBtnRgt" @click="nextMonthEvent">下一月</div>
          </div>
        </div>
        <div class="calendarWeek">
          <p>M</p><p>T</p><p>W</p><p>T</p><p>F</p><p>S</p><p>S</p>
        </div>
        <div class="calendarCon">
          <div class="calendarDay">
            <p v-for="(item,index) in content" :key="index" :class="[
              {autoOrder: item.autoOrder==='1'},
              {guessOrder: item.guessOrder==='1'},
              {autoGuessOrder: item.autoGuessOrder==='1'}
              ]">{{item.datetimeString}}
              <span class="guessNum" v-if="item.guessNum !== ''">{{item.guessNum}}天</span>
            </p>
          </div>
        </div>

        <div class="calendarTip">
          <div>
            <span class="dot autoDot"></span>
            <span class="txt">自主点餐</span>
          </div>
          <div>
            <span class="dot autoGuessDot"></span>
            <span class="txt">自主、代客点餐点餐</span>
          </div>
          <div>
            <span class="dot guessDot"></span>
            <span class="txt">代客点餐</span>
          </div>
        </div>
      </div>
      <div class="historyList">
        <div v-for="(item,index) in historyList" :key="index">
          {{item.year}} {{item.time}} {{item.category}}
        </div>
      </div>
  </div>
</template>

<script>
  import { appviewmixin } from '@/assetsApp/app_view.js'
  import { accAdd } from '../../assets/common'
  export default {
    name: 'm_orderSystemHistory',
    mixins: [appviewmixin],
    data(){
      return{
        calendarIpt: '',
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
        content: [
          {
            "datetimeString": "26",
            "dateAndTime": "2020-04-26",
            "autoOrder": "0",
            "guessOrder": "0",
            "autoGuessOrder": "0",
            "guessNum": ""
          },
          {
            "datetimeString": "27",
            "dateAndTime": "2020-04-27",
            "autoOrder": "0",
            "guessOrder": "0",
            "autoGuessOrder": "0",
            "guessNum": ""
          },
          {
            "datetimeString": "28",
            "dateAndTime": "2020-04-28",
            "autoOrder": "0",
            "guessOrder": "0",
            "autoGuessOrder": "0",
            "guessNum": ""
          },
          {
            "datetimeString": "29",
            "dateAndTime": "2020-04-29",
            "autoOrder": "0",
            "guessOrder": "0",
            "autoGuessOrder": "0",
            "guessNum": ""
          },
          {
            "datetimeString": "1",
            "dateAndTime": "2020-03-01",
            "autoOrder": "0",
            "guessOrder":"0",
            "autoGuessOrder": "0",
            "guessNum": ""
          },
          {
            "datetimeString": "2",
            "dateAndTime": "2020-03-02",
            "autoOrder": "0",
            "guessOrder": "0",
            "autoGuessOrder": "0",
            "guessNum": ""
          },
          {
            "datetimeString": "3",
            "dateAndTime": "2020-03-03",
            "autoOrder": "0",
            "guessOrder": "0",
            "autoGuessOrder": "0",
            "guessNum": ""
          },
          {
            "datetimeString": "4",
            "dateAndTime": "2020-03-04",
            "autoOrder": "1",
            "guessOrder": "0",
            "autoGuessOrder": "0",
            "guessNum": "3"
          },
          {
            "datetimeString": "5",
            "dateAndTime": "2020-03-05",
            "autoOrder": "0",
            "guessOrder": "1",
            "autoGuessOrder": "0",
            "guessNum": "6"
          },
          {
            "datetimeString": "6",
            "dateAndTime": "2020-03-06",
            "autoOrder": "0",
            "guessOrder": "0",
            "autoGuessOrder": "1",
            "guessNum": "3"
          },
          {
            "datetimeString": "7",
            "dateAndTime": "2020-03-07",
            "autoOrder": "0",
            "guessOrder": "0",
            "autoGuessOrder": "0",
            "guessNum": ""
          },
          {
            "datetimeString": "8",
            "dateAndTime": "2020-03-08",
            "autoOrder": "0",
            "guessOrder": "0",
            "autoGuessOrder": "0",
            "guessNum": ""
          },
          {
            "datetimeString": "9",
            "dateAndTime": "2020-03-09",
            "autoOrder": "0",
            "guessOrder": "0",
            "autoGuessOrder": "0",
            "guessNum": ""
          },
          {
            "datetimeString": "10",
            "dateAndTime": "2020-03-10",
            "autoOrder": "0",
            "guessOrder": "0",
            "autoGuessOrder": "0",
            "guessNum": ""
          },
          {
            "datetimeString": "11",
            "dateAndTime": "2020-03-11",
            "autoOrder": "0",
            "guessOrder": "0",
            "autoGuessOrder": "0",
            "guessNum": ""
          },
          {
            "datetimeString": "12",
            "dateAndTime": "2020-03-12",
            "autoOrder": "0",
            "guessOrder": "0",
            "autoGuessOrder": "0",
            "guessNum": ""
          },
          {
            "datetimeString": "13",
            "dateAndTime": "2020-03-13",
            "autoOrder": "0",
            "guessOrder": "0",
            "autoGuessOrder": "0",
            "guessNum": ""
          },
          {
            "datetimeString": "14",
            "dateAndTime": "2020-03-14",
            "autoOrder": "0",
            "guessOrder": "0",
            "autoGuessOrder": "0",
            "guessNum": ""
          },
          {
            "datetimeString": "15",
            "dateAndTime": "2020-03-15",
            "autoOrder": "0",
            "guessOrder": "0",
            "autoGuessOrder": "0",
            "guessNum": ""
          },
          {
            "datetimeString": "16",
            "dateAndTime": "2020-03-16",
            "autoOrder": "0",
            "guessOrder": "0",
            "autoGuessOrder": "0",
            "guessNum": ""
          },
          {
            "datetimeString": "17",
            "dateAndTime": "2020-03-17",
            "autoOrder": "0",
            "guessOrder": "0",
            "autoGuessOrder": "0",
            "guessNum": ""
          },
          {
            "datetimeString": "18",
            "dateAndTime": "2020-03-18",
            "autoOrder": "0",
            "guessOrder": "0",
            "autoGuessOrder": "0",
            "guessNum": ""
          },
          {
            "datetimeString": "19",
            "dateAndTime": "2020-03-19",
            "autoOrder": "0",
            "guessOrder": "0",
            "autoGuessOrder": "0",
            "guessNum": ""
          },
          {
            "datetimeString": "20",
            "dateAndTime": "2020-03-20",
            "autoOrder": "0",
            "guessOrder": "0",
            "autoGuessOrder": "0",
            "guessNum": ""
          },
          {
            "datetimeString": "21",
            "dateAndTime": "2020-03-21",
            "autoOrder": "0",
            "guessOrder": "0",
            "autoGuessOrder": "0",
            "guessNum": ""
          },
          {
            "datetimeString": "22",
            "dateAndTime": "2020-03-22",
            "autoOrder": "0",
            "guessOrder": "0",
            "autoGuessOrder": "0",
            "guessNum": ""
          },
          {
            "datetimeString": "23",
            "dateAndTime": "2020-03-23",
            "autoOrder": "0",
            "guessOrder": "0",
            "autoGuessOrder": "0",
            "guessNum": ""
          },
          {
            "datetimeString": "24",
            "dateAndTime": "2020-03-24",
            "autoOrder": "0",
            "guessOrder": "0",
            "autoGuessOrder": "0",
            "guessNum": ""
          },
          {
            "datetimeString": "25",
            "dateAndTime": "2020-03-25",
            "autoOrder": "0",
            "guessOrder": "0",
            "autoGuessOrder": "0",
            "guessNum": ""
          },
          {
            "datetimeString": "26",
            "dateAndTime": "2020-03-26",
            "autoOrder": "0",
            "guessOrder": "0",
            "autoGuessOrder": "0",
            "guessNum": ""
          },
          {
            "datetimeString": "27",
            "dateAndTime": "2020-03-27",
            "autoOrder": "0",
            "guessOrder": "0",
            "autoGuessOrder": "0",
            "guessNum": ""
          },
          {
            "datetimeString": "28",
            "dateAndTime": "2020-03-28",
            "autoOrder": "0",
            "guessOrder": "0",
            "autoGuessOrder": "0",
            "guessNum": ""
          },
          {
            "datetimeString": "29",
            "dateAndTime": "2020-03-29",
            "autoOrder": "0",
            "guessOrder": "0",
            "autoGuessOrder": "0",
            "guessNum": ""
          },
          {
            "datetimeString": "30",
            "dateAndTime": "2020-03-30",
            "autoOrder": "0",
            "guessOrder": "0",
            "autoGuessOrder": "0",
            "guessNum": ""
          },
          {
            "datetimeString": "31",
            "dateAndTime": "2020-03-31",
            "autoOrder": "0",
            "guessOrder": "0",
            "autoGuessOrder": "0",
            "guessNum": ""
          },
          {
            "datetimeString": "1",
            "dateAndTime": "2020-04-01",
            "autoOrder": "0",
            "guessOrder": "0",
            "autoGuessOrder": "0",
            "guessNum": ""
          },
          {
            "datetimeString": "2",
            "dateAndTime": "2020-04-02",
            "autoOrder": "0",
            "guessOrder": "0",
            "autoGuessOrder": "0",
            "guessNum": ""
          },
          {
            "datetimeString": "3",
            "dateAndTime": "2020-04-03",
            "autoOrder": "0",
            "guessOrder": "0",
            "autoGuessOrder": "0",
            "guessNum": ""
          },
          {
            "datetimeString": "4",
            "dateAndTime": "2020-04-04",
            "autoOrder": "0",
            "guessOrder": "0",
            "autoGuessOrder": "0",
            "guessNum": ""
          },
          {
            "datetimeString": "5",
            "dateAndTime": "2020-04-05",
            "autoOrder": "0",
            "guessOrder": "0",
            "autoGuessOrder": "0",
            "guessNum": ""
          },
          {
            "datetimeString": "6",
            "dateAndTime": "2020-04-06",
            "autoOrder": "0",
            "guessOrder": "0",
            "autoGuessOrder": "0",
            "guessNum": ""
          },
          {
            "datetimeString": "7",
            "dateAndTime": "2020-04-07",
            "autoOrder": "0",
            "guessOrder": "0",
            "autoGuessOrder": "0",
            "guessNum": ""
          }
        ],
        historyList: [
          {
            "year": "2020-03-08",
            "time": "09:45",
            "category": "自主点餐"
          },
          {
            "year": "2020-03-09",
            "time": "09:48",
            "category": "代客点餐"
          },
          {
            "year": "2020-03-10",
            "time": "09:46",
            "category": "自主、代客点餐"
          },
          {
            "year": "2020-03-11",
            "time": "09:50",
            "category": "代客点餐"
          },
          {
            "year": "2020-03-11",
            "time": "09:50",
            "category": "代客点餐"
          },
          {
            "year": "2020-03-11",
            "time": "09:50",
            "category": "代客点餐"
          },
          {
            "year": "2020-03-11",
            "time": "09:50",
            "category": "代客点餐"
          }
        ]
      }
    },
    methods: {
      backEvent () {
        this.$router.push("/homeApp/m_orderSystemMenu")
      },
      /* 上一个月 */
      prevMonthEvent(){
        let newDate = this.calendarIpt.split('-')
        let newYear = newDate[0]
        let newMonth = newDate[1]
        newMonth = accAdd(-1,newMonth)
        if(newMonth === 0){
          newMonth = 12
          newYear = accAdd(-1, newYear)
        }
        this.calendarIpt = newYear + '-' + (newMonth<10?'0':'') + newMonth
      },
      /* 下一个月 */
      nextMonthEvent(){
        let newDate = this.calendarIpt.split('-')
        let newYear = newDate[0]
        let newMonth = newDate[1]
        newMonth = accAdd(1,newMonth)
        if(newMonth === 13){
          newMonth = 1
          newYear = accAdd(1, newYear)
        }
        this.calendarIpt = newYear + '-' + (newMonth<10?'0':'') + newMonth
      },
    },
    created () {
      this.calendarIpt = this.year +'-'+ (this.month<10?'0':'') + this.month;
      document.querySelector('body').setAttribute('style', 'background-color:#eee;');
    }
  }
</script>


<style scoped lang="less">
  @rem: 375/10rem;
  .calendarTop{
    margin-top: 12/@rem;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 0.1rem;
    .calendarBtnLft,.calendarBtnRgt{
      font-size: 14/@rem;
    }
    .calendarIpt{
      margin: 0 10/@rem;
      width: 94/@rem;
      height: 30/@rem;
      border-radius: 8/@rem;
      text-align: center;
      font-size: 12/@rem;
      color: #fff;
      background-color: #49a9ea;
    }
  }
  .calendarWeek{
    margin: 12/@rem auto 0;
    display: flex;
    justify-content: space-around;
    p{
      width: 52/@rem;
      font-size: 12/@rem;
      color: #989db3;
      text-align: center;
    }
  }
  .calendarCon{
    height: 227/@rem;
    margin: 20/@rem auto 0;
    .calendarDay{
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      background-color: #fff;
      p{
        width: 32/@rem;
        height: 32/@rem;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14/@rem;
        margin: 0 8/@rem 10/@rem;
        color: #333;
        position: relative;
      }
      p.autoOrder{
        background-color: #7e49ea;
        color: #fff;
      }
      p.guessOrder{
        border: 1px solid #0fa3c9;
      }
      p.autoGuessOrder{
        background-color: #0fa3c9;
        color: #fff;
      }
    }
  }
  .guessNum{
    position: absolute;
    top: -0.1rem;
    right: -0.4rem;
    display: inline-block;
    width: 30/@rem;
    height: 16/@rem;
    color: #333;
    font-size: 12/@rem;
    text-align: center;
    border-radius: 8/@rem;
    background-color: #b8e2ff;
  }
  .historyList{
    background-color: #fff;
    margin-top: 0.32rem;
    height: 200/@rem;
    overflow:auto;
    div{
      font-size: 14/@rem;
      color: #333;
      padding: 16/@rem 12/@rem;
    }
  }
  .calendarTip{
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-right: 16/@rem;
    margin-top: 0.8rem;
    padding-bottom: 0.4rem;
    div{
      display: flex;
      align-items: center;
      margin-left: 14/@rem;
      span.dot{
        display: inline-block;
        width: 14/@rem;
        height: 14/@rem;
        border-radius: 50%;
        border: 1px solid #0fa3c9;
      }
      span.txt{
        margin-left: 4/@rem;
        font-size: 12/@rem;
        color: #999;
      }
      span.autoDot{
        background-color: #7e49ea;
        border: none;
      }
      span.autoGuessDot{
        background-color: #0fa3c9;
      }
      span.guessDot{

      }
    }
  }
</style>
