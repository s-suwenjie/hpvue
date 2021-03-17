<template>
  <div class="chooseBtnBox">
    <p class="btnLine"></p>
    <p class="btnTit">{{title}}：</p>
    <div class="chooseMonth daysList">
      <template v-for="(item,index) in daysList">
        <button  @click="clickMonthEvent(item,index)" class="btn"
               :class="[{choice: index===onMonthChoice},{dp_no:!getIsDayRange(item)},{dp_no:!notAllClick},getWeek(item)]">{{item}}</button>
        <button v-if="getIsSun(item)">-</button>
      </template>
    </div>
    <div>
      <button class="allBtn" @click="clickMonthAllEvent" :class="{choice: onMonthAllChoice}">整月</button>
    </div>
  </div>
</template>

<script>
  import { zero, getDayNumByYearMonth ,formatDate, formatTime } from '@/assets/common.js'
  export default {
    name: "yhm-radiofilterday",
    props:{
      title: {
        type:String,
        default: "时间"
      },
      yearMonth: {
        type: String,
        default: ''
      }
    },
    data(){
      return{
        daysList: 0,
        year: '',
        month: '',
        onMonthChoice: 0,
        onMonthAllChoice: false,
        notAllClick: true,
        isSameDate: true,
        maxDay: '',
        minDay: '',
      }
    },
    methods: {
      clickMonthEvent(item,index){
        if(this.getIsDayRange(item) && this.notAllClick){
          this.onMonthChoice = index;
          this.onMonthAllChoice = false;
        }

        let nowDate = new Date();
        let newMonth = nowDate.getMonth() + 1;
        let newDate = nowDate.getDate();
        let newHours = nowDate.getHours();
        let newMin = nowDate.getMinutes();
        let newSec = nowDate.getSeconds();
        let oldIndex = index + 1;

        if(oldIndex !== newDate){
          this.isSameDate = false
        }else{
          this.isSameDate = true
        }

        let startDate = '';
        let endDate = '';

        let startDay = parseInt(item) - 1;

        if(this.isSameDate){
          startDate = this.yearMonth + '-' + startDay + ' ' + '23:59:59';
          endDate = this.yearMonth + '-' + item +  ' ' + zero(newHours) + ':' + zero(newMin) + ':' + zero(newSec);
        }else{
          let newTime = this.yearMonth + '-' + item;
          startDate = this.yearMonth + '-' + startDay + ' ' + '23:59:59';
          endDate = newTime + ' ' + '23:59:59';
        }
        let timeParams = {
          startDate: startDate,
          endDate: endDate
        };

        if(this.getIsDayRange(item) && this.notAllClick){
          this.$emit('initData',timeParams)
        }

      },
      clickMonthAllEvent(){
        this.onMonthChoice = -1;
        this.onMonthAllChoice = true;
        // this.notAllClick = false;

        let lastAllMonth = parseInt(this.month) - 1;
        if(lastAllMonth == '0'){
          lastAllMonth = 12
        }
        let startDate = '';
        let endDate = '';
        let daysAllNum = getDayNumByYearMonth(parseInt(this.year),lastAllMonth);
        // console.log(daysAllNum,this.year,lastAllMonth)

        let thisDaysAllNum = getDayNumByYearMonth(parseInt(this.year),parseInt(this.month));
        let nowDate = new Date();
        let newMonth = nowDate.getMonth() + 1;
        let newDate = nowDate.getDate();
        let newHours = nowDate.getHours();
        let newMin = nowDate.getMinutes();
        let newSec = nowDate.getSeconds();
        if(this.month !== '13'){
          if(this.month=='1'){
            startDate = (Number(this.year)-1) +'-' + zero(lastAllMonth) + '-' + zero(daysAllNum) + ' ' + '23:59:59';
            endDate = this.year + '-' + zero(newMonth) + '-' + zero(newDate) +  ' ' + zero(newHours) + ':' + zero(newMin) + ':' + zero(newSec);
            // console.log(startDate,endDate,'month')
          }else{
            // console.log(newMonth,parseInt(this.month),'parseInt(this.month)')
            if(newMonth === parseInt(this.month)){
              startDate = this.year +'-' + zero(lastAllMonth) + '-' + zero(daysAllNum) + ' ' + '23:59:59';
              endDate = this.year + '-' + zero(newMonth) + '-' + zero(newDate) +  ' ' + zero(newHours) + ':' + zero(newMin) + ':' + zero(newSec);
              // console.log(startDate,endDate,'!=13')
            }else{
              let lastYear = '';
              let lastMonth = '';
              if(lastAllMonth === 0){
                lastYear = parseInt(this.year) - 1;
                lastMonth = '12';

                let newLastMonthYearDay = getDayNumByYearMonth(lastYear,parseInt(lastMonth));
                startDate = lastYear + '-' + lastMonth + '-' + newLastMonthYearDay + ' ' + '23:59:59';
                endDate = this.year + '-' + this.month + '-' + thisDaysAllNum + ' ' + '23:59:59';
              }else{
                startDate = this.year + '-' +lastAllMonth + '-' + daysAllNum + ' ' + '23:59:59';
                endDate = this.year + '-' + this.month + '-' + thisDaysAllNum + ' ' + '23:59:59';
              }
              // console.log(startDate,endDate)
            }
          }
          let timeParams = {
            startDate: startDate,
            endDate: endDate
          };
          this.$emit('initData',timeParams)
        }
      }
    },
    computed: {
      getIsDayRange(){
        return function (val) {
          val = this.year + '-' + this.month + '-' + val;
          let result = true;
          if(this.maxDay !== ''){
            if(new Date(this.maxDay).getTime() < new Date(val).getTime()){
              result = false
            }
          }
          if(this.minDay !== ''){
            if(new Date(this.minDay).getTime() > new Date(val).getTime()){
              result = false
            }
          }
          return result
        }
      },
      getWeek(){
        return function (val) {
          let weekDate = this.yearMonth + '-' + val;
          let weekNum = new Date(weekDate).getDay();
          if(weekNum === 6){
            return  'satur'
          }else if(weekNum === 0){
            return 'sun'
          }
        }
      },
      getIsSun(){
        return function (val) {
          let weekDate = this.yearMonth + '-' + val;
          let weekNum = new Date(weekDate).getDay();
          return weekNum === 0;
        }
      }
    },
    created() {
      let nowDate = new Date().getDate();
      this.onMonthChoice = nowDate - 1;

      this.year = new Date().getFullYear();
      this.month = new Date().getMonth() + 1;
      this.daysList = getDayNumByYearMonth(parseInt(this.year),parseInt(this.month));

      this.maxDay = this.year + '-' + this.month + '-' + nowDate


      this.$nextTick(()=>{
        let sunDay = this.$refs.btn

        let arr = []
        for(let i in sunDay){
          arr.push(sunDay[i].className)
        }
        for(let i in arr){
          if(arr[i].indexOf('sun') !== -1 ){
            // console.log(sunDay[arr[i].indexOf('sun')])
          }
        }
      })

    },
    watch: {
      yearMonth(newVal){
        this.yearMonth = newVal;
        this.year = this.yearMonth.split('-')[0];
        this.month = this.yearMonth.split('-')[1];
        if(this.month === '13'){
          this.daysList = 30;
        }

        let nowDate = new Date();
        let newMonth = nowDate.getMonth() + 1;

        if(this.year && this.month !== '13'){
          this.daysList = getDayNumByYearMonth(parseInt(this.year),parseInt(this.month));
          this.notAllClick = true
        }else{
          this.daysList = 30;
          this.notAllClick = false
        }
        if(this.month === newMonth){

        }

        if(this.year && !this.month){
          this.notAllClick = false;
          this.daysList = 30;
        }

        this.onMonthChoice = -1;
        this.onMonthAllChoice = true
      },
    }
  }
</script>




<style scoped lang="less">
  *{
    padding: 0;
    border: 0;
    margin: 0;
    box-sizing: border-box;
  }
  .chooseBtnBox {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-right: 30px;
  }
  .chooseBtnBox .btnLine {
    width: 3px;
    height: 20px;
    background-color: #49a9ea;
    margin-right: 10px;
  }
  .chooseBtnBox .btnTit {
    color: #999;
    white-space: nowrap;
  }


  .daysList{
    display: flex;
    border: 1px solid #dedede;
    button{
      height: 28px;
      padding: 0 15px;
      color: #333;
      background-color: #fff;
      cursor: pointer;
      border-right: 1px solid #dedede;
    }
    button:first-child{
    }
    button:last-child{
      border-right: none;
    }
  }
  .allBtn{
    height: 30px;
    padding: 0 15px;
    color: #333;
    background-color: #fff;
    cursor: pointer;
    border: 1px solid #dedede;
    border-left: none;
    white-space: nowrap;
  }
  .choice{
    background-color: #49a9ea !important;
    color: #fff !important;
  }
  .satur{
    color: #c700df !important;
    font-weight: bold;
  }
  .sun{
    color: #f00 !important;
    font-weight: bold;
  }
</style>
