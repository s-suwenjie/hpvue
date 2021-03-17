<template>
  <div class="chooseBtnBox">
    <p class="btnLine"></p>
    <p class="btnTit">{{title}}：</p>
    <yhm-datebox type="year" :maxYear="maxYear" :isSm="true" @call="selectYear" style="width: 120px" :value="yearTxt" id="yearTxt" position="b"></yhm-datebox>
    <div class="chooseMonth monthList">
      <button v-for="(item,index) in monthList" @click="clickMonthEvent(item,index)" class="btn"
              :class="[{choice: index==onMonthChoice},{dp_no:!getIsMonthRange(item)},{dp_no:edit}]">{{item}}月</button>
    </div>
    <div>
      <button class="allBtn" @click="clickMonthAllEvent" :class="{choice: onMonthAllChoice}" v-if="allyear">整年</button>
    </div>
  </div>
</template>

<script>
  import {zero,formatDate ,getDayNumByYearMonth} from '@/assets/common.js'
  export default {
    name: "yhm-radiofilterdate",
    data(){
      return {
        maxYear: parseInt(formatDate(new Date()).substr(0, 4)),
        yearTxt: new Date().getFullYear() + '',
        monthList: [1,2,3,4,5,6,7,8,9,10,11,12],
        onMonthChoice: 0,
        onMonthAllChoice: false,
        isSameYear: true,
        maxMonth: '',
      }
    },
    props: {
      title: {
        type:String,
        default: "时间"
      },
      selectValue:{
        value:{
          type:String,
          default:""
        }
      },
      customTime:{
        type:String,
        default:''
      },
      edit: {
        type: Boolean,
        default: false
      },
      isSm: {
        type: Boolean,
        default: false
      },
      yearTxts:{
        type:String,
        default:''
      },
      allyear:{
        type:Boolean,
        default:true
      }

    },
    methods: {
      selectYear(year){
        let nowDate = new Date();
        let newYear = nowDate.getFullYear() + '';
        this.yearTxt = year + '';
        this.$emit('click',this.yearTxt);
        if(this.yearTxt !== newYear){
          this.isSameYear = false
        }else {
          this.isSameYear = true
        }
        this.clickMonthAllEvent()
      },
      clickMonthEvent(item,index){
        if(this.edit){
          return
        }
        let yearMonth = '';
        // console.log(item,index,'item||index')
        if(this.getIsMonthRange(item)){
          this.onMonthChoice = index;
          this.onMonthAllChoice = false;
          let month = parseInt(index) + 1;
          yearMonth = this.yearTxt + '-' + month;
          // console.log(yearMonth,'yearMonth')
          // this.$nextTick(()=>{
          //   this.$emit('initData',yearMonth);
          // })
        }

        if(!this.onMonthAllChoice){

          let month = index=='0'?'12':index;
          // console.log(this.yearTxt,month,'yearTxt||month')

          let lastMonthDay = getDayNumByYearMonth(parseInt(this.yearTxt),parseInt(month));
          // console.log(lastMonthDay,'lastMonthDay')

          let nowDate = new Date();
          let newYear = nowDate.getFullYear() + '';
          let newMonth = nowDate.getMonth() + 1;
          let newDate = nowDate.getDate();
          let newHours = nowDate.getHours();
          let newMin = nowDate.getMinutes();
          let newSec = nowDate.getSeconds();
          let thisMonth = index + 1;

          let endDate = '';
          let startDate = '';
          if(thisMonth == '1'){
            startDate = (Number(this.yearTxt)-1) +'-' + zero(month) + '-' + zero(lastMonthDay) + ' ' + '23:59:59';
            // console.log(this.yearTxt,newYear,thisMonth,newMonth)
            if(Number(thisMonth)<Number(newMonth)){
              // console.log('执行了')
              endDate = this.yearTxt + '-' + zero(thisMonth) + '-' + getDayNumByYearMonth(parseInt(this.yearTxt),parseInt(thisMonth)) +  ' ' + '23:59:59';
            }else{
              endDate = this.yearTxt + '-' + zero(thisMonth) + '-' + getDayNumByYearMonth(parseInt(this.yearTxt),parseInt(thisMonth)) +  ' ' + zero(newHours) + ':' + zero(newMin) + ':' + zero(newSec);
            }
            // console.log(thisMonth,newDate,newHours,newMin)
            // console.log(zero(thisMonth),zero(newDate),zero(newHours),zero(newMin))
            // console.log(startDate,endDate,'11111111')
          }else{
            if(newMonth === thisMonth){
              startDate = this.yearTxt +'-' + zero(month) + '-' + zero(lastMonthDay) + ' ' + '23:59:59';
              if(Number(this.yearTxt)==Number(newYear)){
                endDate = this.yearTxt + '-' + zero(thisMonth) + '-' + zero(newDate) +  ' ' + zero(newHours) + ':' + zero(newMin) + ':' + zero(newSec);
              }else{
                endDate = this.yearTxt + '-' + zero(thisMonth) + '-' + getDayNumByYearMonth(parseInt(this.yearTxt),parseInt(thisMonth)) +  ' ' + '23:59:59';
              }
              // console.log(startDate,endDate,'11111111')
              // console.log(this.yearTxt,newYear,'22222222')
            }else{
              let newLastMonthDay = getDayNumByYearMonth(parseInt(this.yearTxt),parseInt(index));
              let thisMonthDay = getDayNumByYearMonth(parseInt(this.yearTxt),parseInt(index) + 1);
              startDate = this.yearTxt + '-' + zero(month) + '-' + newLastMonthDay +  ' ' + '23:59:59';
              endDate = this.yearTxt + '-' + zero(thisMonth) + '-' + thisMonthDay +  ' ' + '23:59:59';

              if(index === 0){
                let year = this.yearTxt - 1;
                let month = '12';
                let newLastMonthYearDay = getDayNumByYearMonth(parseInt(this.yearTxt),parseInt(month));
                startDate = year + '-' + zero(month) + '-' + newLastMonthYearDay +  ' ' + '23:59:59';
                endDate = this.yearTxt + '-' + zero(thisMonth) + '-' + thisMonthDay +  ' ' + '23:59:59';
              }
              // console.log(startDate,endDate)
            }
          }


          let timeParams = {
            startDate: startDate,
            endDate: endDate
          };
          if(this.getIsMonthRange(item)) {

            this.$nextTick(() => {
              this.$emit('initData', yearMonth, timeParams)
            })
          }
        }
      },
      clickMonthAllEvent(){
        let yearMonth = '';
        this.onMonthChoice = -1;
        this.onMonthAllChoice = true;
        yearMonth = this.yearTxt + '-' + 13;

        let lastYear = parseInt(this.yearTxt) - 1;
        let lastMonth = '12';
        let lastYearDays = getDayNumByYearMonth(lastYear,parseInt(lastMonth));

        let nowDate = new Date();
        let newYear = nowDate.getFullYear();
        let newMonth = nowDate.getMonth() + 1;
        let newDate = nowDate.getDate();
        let newHours = nowDate.getHours();
        let newMin = nowDate.getMinutes();
        let newSec = nowDate.getSeconds();
        let endDate = '';
        let startDate = '';
        if(this.isSameYear){
          startDate = lastYear + '-' + lastMonth + '-' + lastYearDays + ' ' + '23:59:59';

          endDate = this.yearTxt + '-' + newMonth + '-' + newDate + ' ' + newHours + ':' + newMin + ':' + newSec ;
        }else{
          startDate = lastYear + '-' + lastMonth + '-' + lastYearDays + ' ' + '23:59:59';
          endDate = this.yearTxt + '-' + 12 + '-' + 31 + ' ' + 23 + ':' + 59 + ':' + 59;
        }

        let timeParams = {
          startDate: startDate,
          endDate: endDate
        };


          this.$nextTick(()=>{
            this.$emit('initData',yearMonth,timeParams)
          });

      }
    },
    computed: {
      getIsMonthRange(){
        return function (val) {
          val = this.yearTxt + '-' + val;
          let result = true;
          if(this.maxMonth !== ''){
            if(new Date(this.maxMonth).getTime() < new Date(val).getTime()){
              result = false
            }
          }
          return result
        }
      }
    },
    created() {
      let nowMonth = new Date().getMonth();
      let newYear = new Date().getFullYear();
      if(this.yearTxts!==''){
        this.yearTxt = this.yearTxts
        setTimeout(()=>{
          this.onMonthAllChoice = false
        },0)
      }
      setTimeout(()=>{
        this.$nextTick(()=>{

          if(this.customTime!==''){
            this.onMonthChoice = this.customTime
          }else{
            this.onMonthChoice = nowMonth;
          }
          if(this.customTime=='12'){
            this.onMonthChoice = '-1'
            this.onMonthAllChoice = true
            this.clickMonthAllEvent()
          }else{
            this.onMonthAllChoice = false
          }
        })
      },0)

      let newMonth = nowMonth + 1;
      this.maxMonth = newYear + '-' + newMonth
    },
    watch: {
      yearTxt(){
        this.onMonthAllChoice = true;
        this.onMonthChoice = -1
      }

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
    margin-bottom: 8px;
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

  .monthList{
    display: flex;
    border: 1px solid #dedede;
    border-left: none;
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
  }
  .choice{
    background-color: #49a9ea !important;
    color: #fff !important;
  }

</style>
