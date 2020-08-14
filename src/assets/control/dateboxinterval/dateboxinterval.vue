<template>
  <div v-if="show" class="c_main" v-validator="validatorEvent" v-click-control-outside="closeDatePanel">
    <div @contextmenu.prevent v-show="datePanelShow" class="dp_main dp_main_interval disable_menu" :style="{left: getDatePanelPosition.left,bottom: getDatePanelPosition.bottom}">
      <div>
        <div class="dp_up">
          <span @click="prevStartYear" class="dp_icon i-btn-prev-year"></span>
          <span @click="prevStartMonth" class="dp_icon i-input-left-arrow"></span>
          <span class="dp_ShowDate">{{date.startYear}}年{{getShowValue(date.startMonth)}}月</span>
          <span @click="nextStartMonth" class="dp_icon i-input-right-arrow"></span>
          <span>至</span>
          <span @click="prevEndMonth" class="dp_icon i-input-left-arrow"></span>
          <span class="dp_ShowDate">{{date.endYear}}年{{getShowValue(date.endMonth)}}月</span>
          <span @click="nextEndMonth" class="dp_icon i-input-right-arrow"></span>
          <span @click="nextEndYear" class="dp_icon i-btn-next-year"></span>
        </div>
        <div class="dp_middle_interval">
          <div>
            <div>日</div><div>一</div><div>二</div><div>三</div><div>四</div><div>五</div><div>六</div>
            <div @mouseover="mouseoverDayEvent(item)" @mouseout="mouseoutDayEvent" @click="selectDate(item,0)" class="dp_day" v-for="(item,index) in date.startDays" :key="index" :class="{dp_other:!getCurrentMonth(item,date.startMonth),dp_current:getCurrentDate(item),dp_select:getCurrentSelect(item,selectStartDate,selectCurrentDate,readySelectDate,date.startMonth),dp_select_Range:getSelectRange(item,date.startMonth),dp_no:!getIsRange(item)}">{{item|getDay}}</div>
          </div>
          <div>
            <div>日</div><div>一</div><div>二</div><div>三</div><div>四</div><div>五</div><div>六</div>
            <div @mouseover="mouseoverDayEvent(item)" @mouseout="mouseoutDayEvent" @click="selectDate(item,1)" class="dp_day" v-for="(item,index) in date.endDays" :key="index" :class="{dp_other:!getCurrentMonth(item,date.endMonth),dp_current:getCurrentDate(item),dp_select:getCurrentSelect(item,selectEndDate,selectCurrentDate,readySelectDate,date.endMonth),dp_select_Range:getSelectRange(item,date.endMonth),dp_no:!getIsRange(item)}">{{item|getDay}}</div>
          </div>
        </div>
        <div class="dp_down">
          <button @click="backToday" type="button">返回当天</button>
        </div>
      </div>
    </div>
    <div @click="clickEvent" @mouseout="mouseoutEvent" @mouseover="mouseoverEvent" class="c_box" :class="{c_error:error,c_hover:mouseStyle,c_focus:focusStyle,c_disable:noEdit}">
      <span class="c_icon" :class="[iconStyle,{c_icon_m:category === 'm'}]"></span>
      <div class="dp_content_more" :class="{dp_content_m:category === 'm'}">{{startVal}}<span class="ml5" :class="{weekend:getWeekend(startVal)}">{{getWeek(startVal)}}</span></div>
      <div class="c_icon fs14">至</div>
      <div class="dp_content_more" :class="{dp_content_m:category === 'm'}">{{endVal}}<span class="ml5" :class="{weekend:getWeekend(endVal)}">{{getWeek(endVal)}}</span></div>
      <div style="flex: 1"></div>
      <span v-show="getDeleteShow" @click.stop="clearEvent"  @mouseout="mouseoutIconEvent" @mouseover="mouseoverIconEvent" class="c_icon" :class="[iconDeleteStyle,{red:iconMouseStyle},{c_icon_m:category === 'm'}]"></span>
    </div>
  </div>
</template>

<script>
  import {isWeekEnd,getWeekByDate,returnYear,returnDate,formatMonthOrDate,getPanelDates,getCurrentMonthByDate,getRange,getReadySelectRange,confirmSelectRange} from '@/assets/datePicker.js'
  import {formatDate} from '@/assets/common.js'
  export default {
    name: "yhm-date-interval",
    inject: ["p____page"],
    data(){
      return{
        date:{
          startYear:'',
          startMonth:'',
          endYear:'',
          endMonth:'',
          startDays:[],
          endDays:[]
        },
        widthPx:380,
        selectCurrentDate:this.start,
        readySelectDate:this.end,
        selectStartDate:'',
        selectEndDate:'',
        startVal:this.start,
        endVal:this.end,
        iconMouseStyle:false,
        datePanelShow:false,
        mouseStyle:false,
        mouseOver:false,
        focusStyle:false,
        error:false,
        iconStyle:"i-input-date",
        iconDeleteStyle:"delete",
        errorTipMessage:this.emptyMessage
      }
    },
    props:{
      title: {
        type: String,
        default: '标题'
      },
      subtitle: {
        type: String,
        default: ''
      },
      type:{
        type:String,
        default:'date'
      },
      width:{
        type: String,
        default:""
      },
      category:{
        type:String,
        default:""
      },
      startId:{
        type:String,
        required:true
      },
      start:{
        type:String,
        required:true
      },
      endId:{
        type:String,
        required:true
      },
      end:{
        type:String,
        required:true
      },
      max:{
        type:String,
        default:""
      },
      min:{
        type:String,
        default:""
      },
      noEdit:{
        type:Boolean,
        default:false
      },
      rule:{
        type:String,
        default:""
      },
      emptyMessage:{
        type:String,
        default:"不能为空"
      },
      show:{
        type:Boolean,
        default:true
      },
      position:{
        type:String,
        default:"down"
      }
    },
    methods:{
      //初始化验证事件
      validatorEvent(category){
        if(this.rule !== "") {
          var id = this.startId + '-' + this.endId;
          if (category === "bind") {
            if(this.p____page.p____rule.indexOf(id) === -1){
              this.p____page.p____rule.push(id)
              this.p____page.p____rule[id] = this
            }
          } else if (category === "unbind") {
            let index = this.p____page.p____rule.indexOf(id)
            if(index !== -1){
              this.p____page.p____rule.splice(index,1)
              this.p____page.p____rule[id] = null
            }
          }
        }
      },
      //图标的鼠标移入事件
      mouseoverIconEvent(){
        if(this.startVal === '' && this.endVal === ''){
          this.iconMouseStyle = false
        }
        else{
          this.iconMouseStyle = true
        }
      },
      //鼠标移除图标事件
      mouseoutIconEvent(){
        this.iconMouseStyle = false
      },
      //开始日历上一年
      prevStartYear(){
        this.date.startYear = returnYear(this.date.startYear,-1)
      },
      //开始日历上一月
      prevStartMonth(){
        let date = returnDate(this.date.startYear,this.date.startMonth,-1)
        this.date.startYear = date.getFullYear()
        this.date.startMonth = date.getMonth() + 1
      },
      //开始日历下一月
      nextStartMonth(){
        let date = returnDate(this.date.startYear,this.date.startMonth,1)
        this.date.startYear = date.getFullYear()
        this.date.startMonth = date.getMonth() + 1
        if(this.date.endYear === this.date.startYear && this.date.startMonth === this.date.endMonth){
          this.nextEndMonth()
        }
      },
      //结束日历上一月
      prevEndMonth(){
        let date = returnDate(this.date.endYear,this.date.endMonth,-1)
        this.date.endYear = date.getFullYear()
        this.date.endMonth = date.getMonth() + 1
        if(this.date.endYear === this.date.startYear && this.date.startMonth === this.date.endMonth){
          this.prevStartMonth()
        }
      },
      //结束日历下一月
      nextEndMonth(){
        let date = returnDate(this.date.endYear,this.date.endMonth,1)
        this.date.endYear = date.getFullYear()
        this.date.endMonth = date.getMonth() + 1
      },
      //结束日历下一年
      nextEndYear(){
        this.date.endYear = getYear(this.date.endYear,1)
      },
      //关闭日历
      closeDatePanel(){
        this.datePanelShow = false
        this.focusStyle = false
        this.date.current = true
        this.date.selectYear = false
        this.date.selectMonth = false
      },
      //点击日历打开日历
      clickEvent(){
        if(!this.noEdit) {
          this.error = false
          this.mouseStyle = false
          this.mouseOver = false
          this.focusStyle = true
          this.datePanelShow = true
          this.selectStartDate = ''
          this.selectEndDate = ''
          this.selectCurrentDate = this.startVal
          this.readySelectDate = this.endVal

          if(this.start !== '' && this.end !== '') {
            if (new Date(this.start).getFullYear() === new Date(this.end).getFullYear() && new Date(this.start).getMonth() === new Date(this.end).getMonth())  {
              this.date.startYear = new Date(this.start).getFullYear()
              this.date.startMonth = new Date(this.start).getMonth() + 1
              this.date.endYear = new Date(new Date(this.start).setMonth(new Date(this.start).getMonth() + 1)).getFullYear()
              this.date.endMonth = new Date(new Date(this.start).setMonth(new Date(this.start).getMonth() + 1)).getMonth() + 1
            }
            else{
              this.date.startYear = new Date(this.start).getFullYear()
              this.date.startMonth = new Date(this.start).getMonth() + 1
              this.date.endYear = new Date(this.end).getFullYear()
              this.date.endMonth = new Date(this.end).getMonth() + 1
            }
          }
          else{
            this.date.startYear = new Date().getFullYear()
            this.date.startMonth = new Date().getMonth() + 1
            this.date.endYear = new Date(new Date().setMonth(new Date().getMonth() + 1)).getFullYear()
            this.date.endMonth = new Date(new Date().setMonth(new Date().getMonth() + 1)).getMonth() + 1
          }

          this.date.startDays = getPanelDates(this.date.startYear,this.date.startMonth)
          this.date.endDays = getPanelDates(this.date.endYear,this.date.endMonth)
          this.$nextTick(() => {
            this.$emit("formVerification")
          })
        }
      },
      //鼠标放上事件
      mouseoverEvent(){
        if (!this.error){
          this.mouseStyle = true
        }
        this.mouseOver = true
      },
      //鼠标移出事件
      mouseoutEvent(){
        if (!this.error) {
          this.mouseStyle = false
        }
        this.mouseOver = false
      },
      //鼠标经过日期事件
      mouseoverDayEvent(date){
        if(this.selectStartDate !== '' && this.selectEndDate === ''){
          this.readySelectDate = date
        }
        else if(this.selectStartDate === '' && this.selectEndDate !== ''){
          this.readySelectDate = date
        }
      },
      //鼠标离开日期事件
      mouseoutDayEvent(){
        if(this.selectStartDate !== '' && this.selectEndDate === ''){
          this.readySelectDate = ''
        }
        else if(this.selectStartDate === '' && this.selectEndDate !== ''){
          this.readySelectDate = ''
        }
      },
      selectDate(date,category){
        if(this.getIsRange(date)){
          if(this.selectStartDate === '' && this.selectEndDate === ''){
            if(category === 0){
              this.selectStartDate = date
            }
            else{
              this.selectEndDate = date
            }
            this.selectCurrentDate = date
            this.readySelectDate = ''
          }
          else if(this.selectStartDate !== '' && this.selectEndDate === ''){
            if(this.selectCurrentDate !== date) {
              let result = confirmSelectRange(this.selectCurrentDate, date)
              this.startVal = result.start
              this.endVal = result.end
              this.datePanelShow = false
              this.focusStyle = false
              this.$nextTick(() => {
                this.$emit("call")
              })
            }
          }
          else if(this.selectStartDate === '' && this.selectEndDate !== ''){
            if(this.selectCurrentDate !== date) {
              let result = confirmSelectRange(this.selectCurrentDate, date)
              this.startVal = result.start
              this.endVal = result.end
              this.datePanelShow = false
              this.focusStyle = false
              this.$nextTick(() => {
                this.$emit("call")
              })
            }
          }
        }
      },
      //返回当天
      backToday(){
        this.date.startYear = new Date().getFullYear()
        this.date.startMonth = new Date().getMonth() + 1
        this.date.endYear = new Date(new Date().setMonth(new Date().getMonth() + 1)).getFullYear()
        this.date.endMonth = new Date(new Date().setMonth(new Date().getMonth() + 1)).getMonth() + 1
      },
      //清楚数据
      clearEvent(){
        this.startVal = ''
        this.endVal = ''
      },
      //验证
      verification() {
        var result = true;
        if (this.show && this.rule !== "") {
          result = this.startVal !== '' && this.endVal !== ''
        }
        this.error = !result
        if(this.error){
          this.errorTipMessage = this.title + this.subtitle + this.errorTipMessage
        }
        this.$nextTick(() => {
          this.$emit("formVerification")
        })

        return result
      }
    },
    filters:{
      getDay(date){
        return parseInt(date.split("-")[2])
      }
    },
    computed:{
      getDeleteShow:{
        get:function () {
          return this.mouseOver && this.startVal !== '' && this.endVal !== '' && !this.focusStyle
        }
      },
      //获取是否选中区间
      getSelectRange(){
        return function(date,month) {
          if(this.getCurrentMonth(date,month)) {
            return getReadySelectRange(this.selectCurrentDate, this.readySelectDate, date)
          }
          else{
            return false
          }
        }
      },
      //获取当前日期是否选中日期
      getCurrentSelect(){
        return function (currentDate,selectDate,selectCurrentDate,readySelectDate,month) {
          if(this.getCurrentMonth(currentDate,month)) {
            return currentDate === selectDate || currentDate === selectCurrentDate || currentDate === readySelectDate
          }
          else{
            return false
          }
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
          return getCurrentMonthByDate(date,month)
        }
      },
      //获取日期是否当天
      getCurrentDate(){
        return function (val) {
          return formatDate(new Date()) === val
        }
      },
      //获取显示值，如果是个位数补零
      getShowValue(){
        return function (value) {
          return formatMonthOrDate(value)
        }
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
          if(this.type === 'date'){
            return getWeekByDate(date)
          }else{
            return ''
          }
        }
      },
      //获取开始日历的年份
      getStartYear:{
        get:function(){
          return this.date.startYear
        }
      },
      //获取开始日历的月份
      getStartMonth:{
        get:function(){
          return this.date.startMonth
        }
      },
      //获取结束日历的年份
      getEndYear:{
        get:function(){
          return this.date.endYear
        }
      },
      //获取结束日历的月份
      getEndMonth:{
        get:function(){
          return this.date.endMonth
        }
      },
      //获取日历弹出位置
      getDatePanelPosition:{
        get:function () {
          if(this.position === "l") {
            return {
              left: "-550px",
              bottom: "-129px"
            }
          }
          else if(this.position === "r") {
            let left = (this.widthPx + 10) + "px"
            return {
              left: left,
              bottom: "-129px"
            }
          }
          else if(this.position === "u") {
            if(this.category === 'm'){
              return {
                left: "0",
                bottom: "30px"
              }
            }
            else {
              return {
                left: "0",
                bottom: "50px"
              }
            }
          }
          else{
            return {
              left: "0",
              bottom: "-310px"
            }
          }

        }
      }
    },
    watch:{
      show(newVal,oldVal){
        if(!newVal){
          this.error = false
          this.startVal = ""
          this.endVal = ""
          let js = "this.p____page." + this.startId + " = \"\""
          eval(js);
          js = "this.p____page." + this.endId + " = \"\""
          eval(js);
        }
      },
      getStartYear(newVal,oldVal){
        this.date.startDays = getPanelDates(newVal,this.date.startMonth)
      },
      getStartMonth(newVal,oldVal){
        this.date.startDays = getPanelDates(this.date.startYear,newVal)
      },
      getEndYear(newVal,oldVal){
        this.date.endDays = getPanelDates(newVal,this.date.endMonth)
      },
      getEndMonth(newVal,oldVal){
        this.date.endDays = getPanelDates(this.date.endYear,newVal)
      },
      start(newVal,oldVal){
        this.startVal = newVal
      },
      end(newVal,oldVal){
        this.endVal = newVal
      },
      startVal(newVal,oldVal){
        var js = "this.p____page." + this.startId + " = \"" + newVal + "\""
        eval(js);
      },
      endVal(newVal,oldVal){
        var js = "this.p____page." + this.endId + " = \"" + newVal + "\""
        eval(js);
      }
    }
  }
</script>

<style scoped>
  *{
    box-sizing: border-box;
  }
</style>
