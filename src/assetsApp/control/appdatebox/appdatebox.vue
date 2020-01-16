<template>
  <div class="ac_main" v-validator="validatorEvent" v-click-control-outside="blurContorlEvent">
    <div v-show="panelShow" class="ac_date_select_panel">
      <div class="ac_date_select_panel_main">
        <div class="ac_date_select_pop" @touchend.self="touchEndClosePanelEvent"></div>
        <div v-show="helpShow" class="ac_date_select_help_pop" @touchend="touchEndHelpCloseEvent" @touchmove.prevent></div>
        <div class="ac_date_select_content" @contextmenu.prevent @touchmove.prevent>
          <div v-show="!selectPanelShow" class="ac_date_select_title">
            <div class="ac_help_box">
              <div @touchend="touchEndHelpEvent" class="ac_help i-help amr16"></div>
              <yhm-app-button @call="selectYearOrMonthEvent" category="four" class="amr0 aml0" :value="getValue"></yhm-app-button>
            </div>
            <div>
              <yhm-app-button @call="backCurrentData" category="two" class="amr0 aml0" value="返回当天"></yhm-app-button>
            </div>
          </div>
          <div v-show="!selectPanelShow" class="ac_date_select_body" v-left-slide="leftSlide" v-right-slide="rightSlide" v-top-slide="upSlide" v-bottom-slide="downSlide">
            <div class="ac_date_select_column">
              <div>日</div>
              <div>一</div>
              <div>二</div>
              <div>三</div>
              <div>四</div>
              <div>五</div>
              <div>六</div>
            </div>

            <div v-for="(items,index) in dateArr" :key="index" class="ac_date_select_column" >
              <div v-for="(item,key)  in items" v-select-val:[item]="selectDate" :key="index + key" :class="{ac_date_select_no:!getIsRange(item)}"><span :class="{other:!getCurrentMonth(item,selectMonth),current:getIsCurrentDate(item,currentDate),select:getIsCurrentDate(item,txt),noSelect:!getIsRange(item)}">{{item|getDay}}</span></div>
            </div>
          </div>
          <div v-show="selectPanelShow" class="ac_date_select_title">
            <div class="ac_help_box">
              <yhm-app-button @call="selectYearOrMonthCloseEvent" category="ten" class="amr0 aml0" value="关闭"></yhm-app-button>
            </div>
            <div>
              <yhm-app-button @call="selectYearOrMonthSelectEvent" category="two" class="amr0 aml0" value="确定选择"></yhm-app-button>
            </div>
          </div>
          <div v-show="selectPanelShow" class="ac_date_select_body">
            <div class="ac_date_select_column">
              <span class="ac_date_select_column_year">年份</span>
              <span class="ac_date_select_column_month">月份</span>
            </div>
            <div class="ac_date_select_column">
              <span class="ac_date_select_column_year_content" v-top-slide="selectNextMoreYear" v-left-slide="selectNextMoreYear" v-right-slide="selectPrevMoreYear" v-bottom-slide="selectPrevMoreYear">
                <div v-for="(items,i) in years" :key="'year_' + i" class="ac_date_select_column">
                  <div v-select-val:[item]="chooseYearEvent" v-for="(item,index) in items" :key="'year_' + i + '_' +  index"><span :class="{currentRect:getIsCurrentDate(item,currentYear),selectRect:getIsCurrentDate(item,chooseYear)}">{{item}}</span></div>
                </div>
              </span>
              <span class="ac_date_select_column_month_content">
                <div v-for="(items,index) in months" :key="'month_' + index" class="ac_date_select_column">
                  <div v-select-val:[item]="chooseMonthEvent" v-for="(item,i) in items" :key="'month_' + index + '_' + i"><span :class="{current:getIsCurrentDate(item,currentMonth),select:getIsCurrentDate(item,chooseMonth)}">{{item}}</span></div>
                </div>
              </span>
            </div>
          </div>
        </div>
        <div v-show="helpShow" class="ac_date_select_help_content" @touchend="touchEndHelpCloseEvent" @touchmove.prevent>
          <img src="./images/guide.svg">
        </div>
      </div>
    </div>
    <div class="ac_box disable_menu" :class="{ac_focus:touchStyle,ac_error:error}" @touchstart="touchStartEvent" @touchend="touchEndEvent" v-tap="clickEvent">
      <div class="ac_icon" :class="[icon]"></div>
      <div class="txt amr4">
        {{txt}}
      </div>
      <div class="txt" :class="{weekend:getWeekend(txt)}">
        {{getWeek(txt)}}
      </div>
    </div>
  </div>
</template>

<script>
  import {getPanelDatesApp,getCurrentMonthByDateApp,getCurrentDate,getCurrentYear,getCurrentMonth,getWeekByDate,isWeekEnd,returnDate,returnYear,getYearsByChooseYear,getRange} from '@/assetsApp/datePicker.js'
  import {accAdd} from "../../../assets/common";
  import { controlmixin } from '@/assetsApp/control/control.js'
  export default {
    name: 'yhm-app-date-box',
    mixins: [controlmixin],
    data(){
      return {
        txt:this.value,
        helpShow:false,
        panelShow:false,        //选择时间面板
        selectPanelShow:false,  //选择年份或者月份面板
        icon:'i-input-date',    //日期框图标
        touchStyle:false,
        dateArr:[],             //初始化当前日历页面需要显示的数据
        currentYear:getCurrentYear(),         //当前年份
        currentMonth:getCurrentMonth(),        //当前月份
        selectYear:getCurrentYear(this.value),          //当前选择年份
        selectMonth:getCurrentMonth(this.value),         //当前选择月份
        currentDate:getCurrentDate(),  //当前日期
        chooseYear:'',                  //选择更多年月中的选中年份
        chooseMonth:'',                  //选择更多年月中的选中月份
        months:[[1,2],[3,4],[5,6],[7,8],[9,10],[11,12]],  //快速选择月份
        years:[],                                          //快速选择年份
        selectMoreYear:'',                                   //选择年份的中间年份
        error:false,
        errorTipMessage:this.emptyMessage                     //为空提示语
      }
    },
    props: {
      max:{
        type:String,
        default:""
      },
      min:{
        type:String,
        default:""
      },
      id: {
        type: String,
        required: true
      },
      value: {
        type: String,
        required: true
      },
      emptyMessage: {
        type: String,
        default: '不能为空'
      },
      errorMessage: {
        type: String,
        default: '不能为空'
      },
      rule:{
        type:String,
        default:""
      },
      show:{
        type:Boolean,
        default:true
      }
    },
    methods:{
      //失去焦点事件
      blurContorlEvent(){
        this.touchStyle = false
      },
      leftSlide(){
        //左划上一年
        this.selectYear = returnYear(this.selectYear,-1)
      },
      rightSlide(){
        //右划下一年
        this.selectYear = returnYear(this.selectYear,1)
      },
      upSlide(){//上划下个月
        let date = returnDate(this.selectYear,this.selectMonth,1)
        this.selectYear = date.getFullYear()
        this.selectMonth = date.getMonth() + 1
      },
      downSlide(){
        //下划上个月
        let date = returnDate(this.selectYear,this.selectMonth,-1)
        this.selectYear = date.getFullYear()
        this.selectMonth = date.getMonth() + 1
      },
      //选择某一天
      selectDate(item){
        if(this.getIsRange(item)) {
          this.txt = item
          this.verification()
          this.panelShow = false
          this.$nextTick(() =>{
            this.$emit("call")
          })
        }
      },
      //返回当天
      backCurrentData(){
        this.selectYear = getCurrentYear()
        this.selectMonth = getCurrentMonth()
      },
      //选择年份
      chooseYearEvent(item){
        this.chooseYear = item
      },
      //选择月份
      chooseMonthEvent(item){
        this.chooseMonth = item
      },
      /*显示帮助*/
      touchEndHelpEvent(){
        this.helpShow = true
      },
      /*关闭帮助*/
      touchEndHelpCloseEvent(){
        this.helpShow = false
      },
      /*关闭日历选择控件*/
      touchEndClosePanelEvent(){
        this.panelShow = false
        window.document.body.style.overflow = "auto";
      },
      /*显示选择年份或者月份的面板*/
      selectYearOrMonthEvent(){
        this.selectMoreYear = this.selectYear
        this.chooseYear = this.selectYear
        this.years = getYearsByChooseYear(this.chooseYear)
        this.chooseMonth = this.selectMonth
        this.selectPanelShow = true
      },
      //上划-左划-下个18年
      selectNextMoreYear(){
        this.selectMoreYear = accAdd(this.selectMoreYear,18)
        this.years = getYearsByChooseYear(this.selectMoreYear)
      },
      //下划-右划-上个18年
      selectPrevMoreYear(){
        this.selectMoreYear = accAdd(this.selectMoreYear,-18)
        this.years = getYearsByChooseYear(this.selectMoreYear)
      },
      //关闭选择年份月份面板
      selectYearOrMonthCloseEvent(){
        this.selectPanelShow = false
      },
      //确认选择的年份和月份
      selectYearOrMonthSelectEvent(){
        this.selectMonth = this.chooseMonth
        this.selectYear = this.chooseYear
        this.selectPanelShow = false
      },
      touchStartEvent(){
        this.error = false
        this.touchStyle = true
      },
      touchEndEvent(){


        this.touchStyle = false
      },
      clickEvent(){
        window.document.body.style.overflow = "hidden";
        this.dateArr = getPanelDatesApp(this.selectYear,this.selectMonth)
        this.panelShow = true
      },
      //验证
      verification() {
        var result = true;
        if (this.show && this.rule !== "") {
          if(this.txt === ''){
            result = false
          }
        }
        //初始化错误信息
        if(!result){
          this.errorTipMessage = this.emptyMessage
        }
        this.error = !result
        return result
      }
    },
    filters:{
      getDay(date){
        return parseInt(date.split("-")[2])
      }
    },
    computed:{
      //获取当前页面显示的年月
      getValue(){
        let result = this.selectYear + '年'
        if(parseInt(this.selectMonth) < 10){
          result = result + '0'
        }
        result = result + this.selectMonth + '月'
        return result
      },
      //获取是否周末
      getWeekend(){
        return function(date){
          return isWeekEnd(date)
        }
      },
      //获取周几
      getWeek(){
        return function (date) {
          return getWeekByDate(date)
        }
      },
      //获取是否在设置的区间
      getIsRange(){
        return function (date) {
          return getRange(this.min,this.max,date)
        }
      },
      //获取当前日期是否当前月份
      getCurrentMonth(){
        return function (date,month) {
          return getCurrentMonthByDateApp(date,month)
        }
      },
      getIsCurrentDate(){
        return function (date,current) {
          return date === current
        }
      }
    },
    watch:{
      show(newVal){
        if(!newVal){
          this.error = false
          this.txt = ""
          var js = "this.p____page." + this.id + " = \"\""
          eval(js);
        }
      },
      txt(newVal){
        var js = "this.p____page." + this.id + " = \"" + newVal + "\""
        eval(js);
      },
      selectYear(newVal){
        this.dateArr = getPanelDatesApp(newVal,this.selectMonth)
      },
      value(newVal){
        this.txt = newVal
      },
      selectMonth(newVal){
        this.dateArr = getPanelDatesApp(this.selectYear,newVal)
      },
      error(newVal){
        //执行form控件中的错误显示
        this.$emit("formVerification",this.error,this.errorTipMessage)
      }
    }
  }
</script>

<style scoped>

</style>
