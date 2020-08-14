<template>
  <div v-if="show" ref="aaa" :style="getWidth" class="c_main" :class="[{c_main_m:category === 'm'},{c_smmain: isSm}]" v-validator="validatorEvent" v-click-control-outside="closedatepanel">
    <div @contextmenu.prevent v-show="datepanelShow" class="dp_main disable_menu" :style="{left: getDatepanelPosition.left,bottom: getDatepanelPosition.bottom}">
      <div v-show="date.current">
        <div class="dp_up">
          <span @click="prevYear" class="dp_icon i-btn-prev-year"></span>
          <span @click="prevMonth" class="dp_icon i-input-left-arrow"></span>
          <span @click="selectYear" class="dp_btnYear">{{date.year}}年</span>
          <span @click="selectMonth" class="dp_btnMonth">{{date.month}}月</span>
          <span @click="nextMonth" class="dp_icon i-input-right-arrow"></span>
          <span @click="nextYear" class="dp_icon i-btn-next-year"></span>
        </div>
        <div class="dp_middle">
          <div>日</div><div>一</div><div>二</div><div>三</div><div>四</div><div>五</div><div>六</div>
          <div @click="selectDate(item)" class="day" v-for="(item,index) in date.days" :key="index" :class="{dp_other:!getCurrentMonth(item),dp_current:getCurrentDate(item),dp_select:getCurrentSelect(item),dp_no:!getIsRange(item)}">{{item|getDay}}</div>
        </div>
        <div class="dp_down">
          <button @click="clearEvent" type="button">清空</button>&nbsp;
          <button @click="selectCurrent" type="button">当天</button>
        </div>
      </div>
      <div v-show="date.selectYear">
        <div class="dp_up">
          <span @click="prevMoreYear" class="dp_icon i-btn-prev-year"></span>
          <span>{{date.selectYearStart}}年 - {{date.selectYearEnd}}年</span>
          <span @click="nextMoreYear" class="dp_icon i-btn-next-year"></span>
        </div>
        <div class="dp_middle">
          <div v-for="(item,index) in date.selectYears" :key="index" @click="selectYeared(item)" class="yearMonth" :class="{current:getSelectCurrentYear(item),dp_current:getCurrentDate(item),dp_no:!getIsYearRange(item)}">{{item}}年</div>
        </div>
      </div>
      <div v-show="date.selectMonth">
        <div class="dp_up">
          <span @click="prevSelectMonthYear" class="dp_icon i-btn-prev-year"></span>
          <span>{{date.selectMonthYear}}年</span>
          <span @click="nextSelectMonthYear" class="dp_icon i-btn-next-year"></span>
        </div>
        <div class="dp_middle">
          <div v-for="(item,index) in date.selectMonths" :key="index" @click="selectMonthed(item)" class="yearMonth" :class="{current:getSelectCurrentMonth(item)}">
            {{item}}月
          </div>
        </div>
      </div>
    </div>
    <div @click="clickEvent" @mouseout="mouseoutEvent" @mouseover="mouseoverEvent" class="c_box" :class="[{c_error:error,c_hover:mouseStyle,c_focus:focusStyle,c_disable:noEdit},{c_smbox: isSm}]">
      <span class="c_icon" :class="[iconStyle,{c_icon_m:category === 'm'},{c_smicon: isSm}]"></span>
      <div class="dp_content" :style="{getTxtWidth,height:height==''?'auto':height}" :class="[{dp_content_m:category === 'm'},{dt_smcontent: isSm}]">
        {{txt}}
        <span v-show="txt !== ''" class="ml5" :class="{weekend:getWeekend}">{{getWeek}}</span>
        <span v-show="txt === ''" :style="{color: placeholderColor}">{{placeholder}}</span>
      </div>
    </div>
  </div>
</template>
<script>
  import {verify,formatDate,accAdd} from '@/assets/common.js'
  export default {
    name: 'yhm-datebox',
    inject: ["p____page"],
    data(){
      return{
        widthpx:380,
        txt:new Date(this.value).getTime() === new Date('1900-01-01').getTime() ? '':this.value,
        date:{
          year:new Date().getFullYear(),
          month:new Date().getMonth() + 1,
          days:[],
          current:true,
          selectYear:false,
          selectMonth:false,
          selectYearStart:new Date().getFullYear() - 7,
          selectYearEnd:new Date().getFullYear() + 7,
          selectYears:[],
          selectMonthYear:0,
          selectMonths:[1,2,3,4,5,6,7,8,9,10,11,12]
        },
        datepanelShow:false,
        mouseStyle:false,
        mouseOver:false,
        focusStyle:false,
        error:false,
        iconStyle:"i-input-date",
        errorTipMessage:this.emptyMessage
      }
    },
    props:{
      isSm: {
        type: Boolean,
        default: false
      },
      width:{
        type: String,
        default:""
      },
      height:{
        type: String,
        default:""
      },
      category:{
        type:String,
        default:""
      },
      placeholder:{
        type: String,
        default:""
      },
      placeholderColor:{
        type: String,
        default: "#333"
      },
      type:{
        type:String,
        default:'date'
      },
      id:{
        type:String,
        required:true
      },
      value:{
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
      maxYear:{
        type:Number,
        default: 0
      },
      minYear:{
        type:Number,
        default: 0
      },
      rule:{
        type:String,
        default:""
      },
      emptyMessage:{
        type:String,
        default:""
      },
      repeatMessage:{
        type:String,
        default:""
      },
      noEdit:{
        type:Boolean,
        default:false
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
      clearEvent(){
        this.txt = ''
      },
      //初始化验证事件
      validatorEvent(category){
        if(this.rule !== "") {
          var id = this.id;
          id = id.replace(".","_")
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
      //关闭日历
      closedatepanel(){
        this.datepanelShow = false
        this.focusStyle = false
        this.date.current = true
        this.date.selectYear = false
        this.date.selectMonth = false
      },
      //上一年
      prevYear(){
        this.date.year -= 1
        var current = this.date.year + "-" + this.date.month + "-01"
        this.initDatepanel(new Date(current))
      },
      //年份切换向前15年
      prevMoreYear(){
        this.date.selectYearEnd = this.date.selectYearStart - 1
        this.date.selectYearStart -= 15
        this.date.selectYears = []
        for(var i = 0,start = this.date.selectYearStart; i < 15; i++,start++){
          this.date.selectYears.push(start)
        }
      },
      //选择月份年份向前
      prevSelectMonthYear(){
        this.date.year -= 1
        this.date.selectMonthYear = this.date.year
      },
      //上一月
      prevMonth(){
        this.date.month -= 1
        if(this.date.month === 0){
          this.date.month = 12
          this.date.year -= 1
        }
        var current = this.date.year + "-" + this.date.month + "-01"
        this.initDatepanel(new Date(current))
      },
      //选择年份
      selectYear(){
        this.date.selectYearStart = this.date.year - 7
        this.date.selectYearEnd = this.date.year + 7
        this.date.selectYears = []
        for(var i = 0,start = this.date.selectYearStart; i < 15; i++,start++){
          this.date.selectYears.push(start)
        }
        this.date.current = false
        this.date.selectYear = true
      },
      //选择月份
      selectMonth(){
        this.date.selectMonthYear = this.date.year
        this.date.current = false
        this.date.selectMonth = true
      },
      //选中年份事件
      selectYeared(val){
        this.date.year = val
        if(this.type === 'date') {
          var current = this.date.year + "-" + this.date.month + "-01"
          this.initDatepanel(new Date(current))
          this.date.current = true
          this.date.selectYear = false
        }
        else{
          if(this.type === 'year'){
            if(this.getIsYearRange(val)){
              this.txt = val
              this.datepanelShow = false
              this.focusStyle = false
              this.$nextTick(() =>{
                this.$emit("call",val)
              })
            }
          }
          else if(this.type === 'month'){
            this.txt = this.date.year + "-" + this.date.month
            this.datepanelShow = false
            this.focusStyle = false
            this.$nextTick(() =>{
              this.$emit("call",val)
            })
          }
        }
      },
      //选中月份
      selectMonthed(val){
        if(this.type === 'date') {
          this.date.month = val
          var current = this.date.year + "-" + this.date.month + "-01"
          this.initDatepanel(new Date(current))
          this.date.current = true
          this.date.selectMonth = false
        }
        else{
          if(this.type === 'month'){
            if(val < 10){
              val = '0' + val
            }
            this.txt = this.date.year + "-" + val
            this.datepanelShow = false
            this.focusStyle = false
            this.$nextTick(() =>{
              this.$emit("call")
            })
          }
        }
      },
      //下一月
      nextMonth(){
        this.date.month += 1
        if(this.date.month === 13){
          this.date.month = 1
          this.date.year += 1
        }
        var current = this.date.year + "-" + this.date.month + "-01"
        this.initDatepanel(new Date(current))
      },
      //选择月份年份向后
      nextSelectMonthYear(){
        this.date.year += 1
        this.date.selectMonthYear = this.date.year
      },
      //切换年份向后15年
      nextMoreYear(){
        this.date.selectYearStart = this.date.selectYearEnd + 1
        this.date.selectYearEnd += 15
        this.date.selectYears = []
        for(var i = 0,start = this.date.selectYearStart; i < 15; i++,start++){
          this.date.selectYears.push(start)
        }
      },
      //下一年
      nextYear(){
        this.date.year += 1
        var current = this.date.year + "-" + this.date.month + "-01"
        this.initDatepanel(new Date(current))
      },
      //初始化日历
      initDatepanel(current){
        current.setDate(current.getDate() - current.getDay());
        this.date.days = []

        for (var i = 0; i < 42; i++){
          this.date.days.push(formatDate(current))
          current.setDate(current.getDate() + 1);

        }
      },
      //选择某一天
      selectDate(val){
        if(this.getIsRange(val)){
          this.txt = val
          this.datepanelShow = false
          this.focusStyle = false
          this.$nextTick(() =>{
            this.$emit("call")
          })
        }
      },
      //选择当天
      selectCurrent(){
        var val = formatDate(new Date());
        if(this.getIsRange(val)) {
          this.txt = val
          this.datepanelShow = false
          this.focusStyle = false
          this.$nextTick(() =>{
            this.$emit("call")
          })
        }
        else{
          this.date.year = new Date().getFullYear()
          this.date.month = new Date().getMonth() + 1
          this.initDatepanel(new Date(this.date.year + "-" + this.date.month + "-01"))
        }
      },
      //单击事件
      clickEvent(){
        if(!this.noEdit) {
          var current = ""
          if (this.type === 'date') {
            if (this.txt === "") {
              current = new Date()
            } else {
              current = new Date(this.txt)
            }
            this.date.current = true
            this.date.selectYear = false
            this.date.selectMonth = false
            this.date.year = current.getFullYear()
            this.date.month = current.getMonth() + 1
            current = new Date(current.getFullYear() + "-" + (current.getMonth() + 1) + "-01");
            this.initDatepanel(current)
          } else if (this.type === 'year') {
            if (this.txt === "") {
              current = new Date()
            } else {
              current = new Date(this.txt + '-01-01')
            }
            this.date.year = current.getFullYear()

            this.date.selectYearStart = this.date.year - 7
            this.date.selectYearEnd = this.date.year + 7
            this.date.selectYears = []
            for (var i = 0, start = this.date.selectYearStart; i < 15; i++, start++) {
              this.date.selectYears.push(start)
            }

            this.date.current = false
            this.date.selectYear = true
            this.date.selectMonth = false
          } else if (this.type === 'month') {
            if (this.txt === "") {
              current = new Date()
            } else {
              current = new Date(this.txt + '-01')
            }
            this.date.selectMonthYear = this.date.year
            this.date.current = false
            this.date.selectYear = false
            this.date.selectMonth = true
          }

          this.error = false
          this.mouseStyle = false
          this.mouseOver = false
          this.focusStyle = true

          this.datepanelShow = true
          this.$nextTick(() =>{
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
      //主动显示控件错误
      errorEvent(errorMessage){
        this.error = true
        if(errorMessage){
          this.errorTipMessage = errorMessage
        }
        else{
          this.errorTipMessage = this.repeatErrorMessage
        }

        this.$nextTick(() =>{
          this.$emit("formVerification")
        })
      },
      //验证
      verification() {
        var result = true;
        if (this.show && this.rule !== "") {
          var val = this.txt
          var res = verify(val, this.rule)
          result = res.key
          if(!result) {
            if(res.category === 0){
              if(this.emptyMessage === ""){
                this.errorTipMessage = res.value
              }
              else{
                this.errorTipMessage = this.emptyMessage
              }
            }
            else if(res.category === 1){
              if(this.errorMessage === ""){
                this.errorTipMessage = res.value
              }
              else{
                this.errorTipMessage = this.errorMessage
              }
            }
          }
        }
        this.error = !result
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
      getValue(){
        if(new Date(this.value).getTime() === new Date('1900-01-01').getTime()){
          return ''
        }
        return this.value
      },
      getTxtWidth(){
        let width = this.width
        if(this.width !== '') {
          if(this.category === 'm'){
            width = accAdd(width,-22)
          }
          else{
            width = accAdd(width,-38)
          }
          return 'width:' + width + 'px !important;'
        }
        else{
          return ''
        }
      },
      getWidth(){
        if(this.width !== '') {
          return 'width:' + this.width + 'px !important;'
        }
        else{
          return ''
        }
      },
      getSelectCurrentYear(){
        return function (val) {
          return this.date.year === val
        }
      },
      getSelectCurrentMonth(){
        return function (val) {
          return this.date.month === val
        }
      },
      getIsRange(){
        return function (val) {
          var result = true
          if(this.max !== ""){
            if(new Date(this.max).getTime() < new Date(val).getTime()){
              result = false
            }
          }
          if (this.min !== ""){
            if(new Date(this.min).getTime() > new Date(val).getTime()){
              result = false
            }
          }
          return result
        }
      },
      getIsYearRange(){
        return function (val) {
          var result = true
          if(this.maxYear !== 0){
            if(new Date(this.maxYear).getTime() < new Date(val).getTime()){
              result = false
            }
          }
          if (this.minYear !== 0){
            if(new Date(this.minYear).getTime() > new Date(val).getTime()){
              result = false
            }
          }
          return result
        }
      },
      getCurrentMonth(){
        return function (val) {
          var month = this.date.month - 1
          return month === new Date(val).getMonth()
        }
      },
      getCurrentSelect(){
        return function (val) {
          return this.value === val
        }
      },
      getCurrentDate(){
        return function (val) {
          return formatDate(new Date()) === val
        }
      },
      getWeekend:{
        get:function () {
          var week = new Date(this.txt).getDay();
          return week === 0 || week === 6
        }
      },
      getWeek:{
        get:function () {
          if(this.type === 'date'){
            var weekday=["周日","周一","周二","周三","周四","周五","周六"];
            return weekday[new Date(this.txt).getDay()]
          }else{
            return ''
          }
        }
      },
      getDatepanelPosition:{
        get:function () {
          if(this.position === "l") {
            return {
              left: "-280px",
              bottom: "-129px"
            }
          }
          else if(this.position === "r") {
            let left = (this.widthpx + 10) + "px"
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
          this.txt = ""
          var js = "this.p____page." + this.id + " = \"\""
          eval(js);
        }
      },
      txt(newVal,oldVal){
        if(new Date(newVal).getTime() === new Date('1900-01-01').getTime()){
          newVal = ''
        }
        var js = "this.p____page." + this.id + " = \"" + newVal + "\""
        eval(js);
        // this.verification()
      },
      value(newVal,oldVal){
        if(new Date(newVal).getTime() === new Date('1900-01-01').getTime()){
          newVal = ''
        }
        this.txt = newVal
        // this.verification()
      },
      max(newVal){
        if(this.txt > newVal){
          this.txt = ''
        }
      },
      min(newVal){
        if(this.txt < newVal) {
          this.txt = ''
        }
      }
    },
    created() {
      this.$nextTick(() => {
        this.widthpx = this.$refs.aaa.offsetWidth
      })

    }
  }
</script>

<style scoped>
  *{
    box-sizing: border-box;
  }
  .c_smicon{
    height: 28px;
  }
  .dt_smcontent{
    height: 28px;
    display: flex;
    align-items: center;
  }
  .c_smmain{
    min-height: 28px;
  }
  .c_smbox{
    border-radius: 5px 0 0 5px;
  }
</style>
