<template>
    <div>
<!--      <div  @click="appTimeShow=!appTimeShow">打开</div>-->
      <div class="appTimeShade" v-show="appTimeShow" @click="shadeClick"></div>
      <div   class="appTime" :class="[appTimeShow==false?'appTimeHide':'appTimeShow']">
          <p class="appTimeTop"><span class="timeTopBtn btn" @click="appTimeShow=!appTimeShow">关闭</span><span class="timeTopBtn2 btn" @click="monthClick">返回当月</span></p>
          <p class="timeTitle"><span>年份</span><span>月份</span></p>
        <div class="appTimeMain">
          <div class="appTimeMainLeft">
            <div v-for="(item,index) in year" v-top-slide="selectNextMoreYear" v-left-slide="selectNextMoreYear" v-right-slide="selectPrevMoreYear"  v-bottom-slide="selectPrevMoreYear" :key="index" @click="yearsEvent(item)" class="mainLeftCenter">
                <span :class="{yearActive:item==yearActive,yearActives:item==currentYear}">
                  {{item}}
                </span>
            </div>
          </div>
          <div class="appTimeMainRight"  @click="appTimeClick">
            <div v-for="(item,index) in months" :key="index" @click="monthEvent(index)" class="mainRightCenter">
              <span :class="{monthActive:index+1==monthActive,monthActives:index+1==currentMonth}">{{item}}</span>
            </div>
          </div>
        </div>
      </div>

    </div>
</template>

<script>
  import {getPanelDatesApp,getCurrentMonthByDateApp,getCurrentDate,getCurrentYear,getCurrentMonth,getWeekByDate,isWeekEnd,returnDate,returnYear,getYearsByChooseYear,getRange} from '@/assetsApp/datePicker.js'
  import { controlmixin } from '@/assetsApp/control/control.js'

  export default {
    name: 'appTimeSelector',
    mixins: [controlmixin],
    data () {
      return {
        // appTimeShow:true,
        yearActive:getCurrentYear(),//默认选中当前年份
        monthActive:getCurrentMonth(),//默认选中当前月份
        currentMonth:getCurrentMonth(),        //当前月份
        currentYear:getCurrentYear(),         //当前年份
        currentDate:getCurrentDate(),  //当前日期
        months:['1','2','3','4','5','6','7','8','9','10','11','12'],  //快速选择月份
        year:[],
        years:this.getYearArr(),//生成年份
        pitchOnYear:'',//用来返回给父组件的年份
        pitchOnMonth:'',//用来返回给父组件的月份
      }
    },
    props:{
      appTimeShow: {
        type: Boolean,
        default: true
      },
    },
    methods:{
      shadeClick(){
        this.appTimeShow=!this.appTimeShow
        this.$emit('update:appTimeShow', this.appTimeShow)
      },
      appTimeClick(){//用户选中后返回change事件与值
        this.appTimeShow=!this.appTimeShow
        this.$nextTick(() =>{
          let Month = ''
          if(this.pitchOnMonth<10){//月份补零
            Month = '0'+this.pitchOnMonth
          }else{Month = this.pitchOnMonth}
          this.$emit("timeChange",this.pitchOnYear+'-'+Month)
        })
      },
      monthClick(){//返回当月
        this.monthActive=this.currentMonth
      },
      yearsEvent(item){//用户点击选择年份时
        this.yearActive=item
        this.pitchOnYear = item
      },
      monthEvent(index){//用户点击选择月份时
        this.monthActive=index+1
        this.pitchOnMonth = index+1
        this.appTimeShow=!this.appTimeShow
        this.$emit('update:appTimeShow', this.appTimeShow)
      },
      getYearArr(startYear,endYear){
        let yearArr=[],
          prDate = new Date(),
          presentYear = prDate.getFullYear();//当前年份
        if ( !endYear ) { //为空为当前年份
          endYear = presentYear+7;
        }
        if ( !startYear ) { //为空为当前年前5年
          startYear = presentYear-10;
        }
        for ( let i = startYear; i <= endYear; i++) {
          yearArr.push(i);
        }
        return yearArr;
      },
      selectPrevMoreYear(){//用户下滑年份
        this.year=this.getYearArr(this.year[0]-18,this.year[0]-1)
      },
      selectNextMoreYear(){//用户上滑年份
        let year = this.year[this.year.length-1]+1
        this.year=this.getYearArr(year,year+17)
      }
    },
    comments:{

    },
    created () {
      this.pitchOnYear = this.currentYear//默认选中当前年份
      this.pitchOnMonth = this.currentMonth//默认选中当前月份
      this.year=this.years
      // if(this.value!==null){
      //   if(this.value.substr(5, 1)==0){
      //     this.pitchOnMonth=this.value.substr(6, 1)
      //   }else{
      //     this.pitchOnMonth=this.value.substr(5, 2)
      //   }
      //   this.pitchOnYear=this.value.substr(0, 4)
      //   console.log('231',this.pitchOnYear,this.pitchOnMonth,)
      // }
    }
  }
</script>

<style lang="less" scoped>
@rem:375/10rem;
.yearActives{
  color: #49a9ea;
  border-radius: 5/@rem;
  border: 2/@rem solid #49a9ea;
}
.yearActive{
  background-color: #49a9ea;
  color: #FFFFFF;
  border-radius: 5/@rem;
}
.monthActives{
  color: #49a9ea;
  border-radius: 5/@rem;
  border: 2/@rem solid #49a9ea;
}
.monthActive{
  background-color: #49a9ea;
  color: #fff;
}
.appTimeMain{
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  .appTimeMainLeft{
    display: flex;
    align-items: center;
    /*justify-content: center;*/
    flex-wrap: wrap;
    width: 70%;
    .mainLeftCenter{
      /*width: 33%;*/
      font-size: 16/@rem;
      display: flex;
      span{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 66/@rem;
        height: 32/@rem;
      }
    }
  }
  .appTimeMainRight{
    width: 30%;
    height: auto;
    font-size: 17/@rem;
    display: flex;
    flex-wrap: wrap;

    .mainRightCenter{
      width: 50%;
      height: 46/@rem;
      line-height: 46/@rem;
      text-align: center;
      span{
        text-align: center;
        display: inline-block;
        width: 32/@rem;
        height: 32/@rem;
        line-height: 32/@rem;
        border-radius: 50%;
        box-sizing: border-box;

      }
    }
  }
}
.timeTitle{
  display: flex;
  align-items: center;
  text-align: left;
  width: 100%;
  box-sizing: border-box;
  font-size: 16/@rem;
  height: 48/@rem;
  padding: 0 10/@rem;

  span{
    display: inline-block;
    width:95/@rem;
    text-indent: 3/@rem;
  }
  span:nth-child(2){
    text-indent: 8/@rem;
  }

}
.appTime{
  flex: 1;
  border-radius: 15/@rem 15/@rem 0 0;
  box-sizing: border-box;
  height: 370/@rem;
  margin: 0 10/@rem;
  background-color: #fff;
  .appTimeTop{
    padding: 8/@rem 10/@rem;
  }
  p{
    display: flex;
    justify-content: space-between;
    .btn{
      width: 62/@rem;
      height: 32/@rem;
      border-radius: 5/@rem;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 14/@rem;
      text-align: center;
    }
    .timeTopBtn{
      border: 0.0267rem solid #FF0000;
      color: #FF0000;
    }
    .timeTopBtn2{
      width: 80/@rem;
      background-color: #49a9ea;
      color: #FFF;
      border: 0.0267rem solid #49a9ea;
    }
  }

}
  .appTimeShade{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #000;
    opacity: 0.6;
    z-index: 99;
  }
  .appTimeHide{
    position: fixed;
    left: 0;
    right: 0;
    bottom:-99%;
    transition: 0.5s all;
    z-index: 11;
  }
  .appTimeShow{
    /*width: 100%;*/
    transition: 0.5s all;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
  }
</style>
