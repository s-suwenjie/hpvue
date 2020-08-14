<template>
  <div @contextmenu.prevent v-show="showPanel" class="dp_main disable_menu" :style="getPosition">
    <div v-show="date.selectDay">
      <div class="dp_up">
        <span @click="prevYearEvent" class="dp_icon i-btn-prev-year"></span>
        <span @click="prevMonthEvent" class="dp_icon i-input-left-arrow"></span>
        <span @click="selectYearEvent" class="dp_btnYear">{{date.year}}年</span>
        <span @click="selectMonthEvent" class="dp_btnMonth">{{date.month}}月</span>
        <span @click="nextMonthEvent" class="dp_icon i-input-right-arrow"></span>
        <span @click="nextYearEvent" class="dp_icon i-btn-next-year"></span>
      </div>
      <div class="dp_middle">
        <div>日</div><div>一</div><div>二</div><div>三</div><div>四</div><div>五</div><div>六</div>
        <div @click="selectDate(item)" class="day" v-for="(item,index) in date.days" :key="index" :class="{dp_other:!getCurrentMonth(item),dp_current:getCurrentDate(item),dp_select:getCurrentSelect(item),dp_no:!getIsRange(item)}">{{item|getDay}}</div>
      </div>
      <div class="dp_down">
        <button v-if="isClear" @click="clearEvent" type="button">清空</button>&nbsp;
        <button @click="selectCurrentEvent" type="button">当天</button>
      </div>
    </div>
    <div v-show="date.selectYear">
      <div class="dp_up">
        <span @click="prevMoreYearEvent" class="dp_icon i-btn-prev-year"></span>
        <span>{{date.selectYearStart}}年 - {{date.selectYearEnd}}年</span>
        <span @click="nextMoreYearEvent" class="dp_icon i-btn-next-year"></span>
      </div>
      <div class="dp_middle">
        <div v-for="(item,index) in date.selectYears" :key="index" @click="selectYearedEvent(item)" class="yearMonth" :class="{dp_current:getSelectCurrentYear(item)}">{{item}}年</div>
      </div>
    </div>
    <div v-show="date.selectMonth">
      <div class="dp_up">
        <span @click="prevSelectMonthYearEvent" class="dp_icon i-btn-prev-year"></span>
        <span>{{date.selectMonthYear}}年</span>
        <span @click="nextSelectMonthYearEvent" class="dp_icon i-btn-next-year"></span>
      </div>
      <div class="dp_middle">
        <div v-for="(item,index) in date.selectMonths" :key="index" @click="selectMonthedEvent(item)" class="yearMonth" :class="{dp_current:getSelectCurrentMonth(item)}">{{item}}月</div>
      </div>
    </div>
  </div>
</template>

<script>
  import {accAdd,accMul,formatDate} from '@/assets/common.js'
  import {getDate,getSelectYear,returnYear,returnDate,getPanelDates,getCurrentMonthByDate} from '@/assets/datePicker.js'
  export default {
    name: 'yhm-date-panel',
    data(){
      return{
        showPanel:this.show,            //是否显示日历面板
        date:{
          selectDay:this.type === 'date',
          selectYear:this.type === 'year',
          selectMonth:this.type === 'month',
          year:'',
          month:'',
          days: [],
          selectYearStart:'',             //选择年份的起始年份
          selectYearEnd:'',               //选择年份的结束日期
          selectYears:[],                 //当前可选择的年份
          selectMonthYear:'',             //在选择月份面板中显示的年份
          selectMonths:[1,2,3,4,5,6,7,8,9,10,11,12]
        }
      }
    },
    props:{
      isClear:{
        type:Boolean,
        default:true
      },
      type:{
        type:String,
        default:'date'
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
      show:{
        type:Boolean,
        default:false
      },
      position : {
        type:Object,
        default:function () {
          return {
            x:'center',
            y:'center',
            z:'1'
          }
        }
      }
    },
    methods:{
      //初始化事件
      init(initValue){
        if(this.type === 'date'){
          if(initValue) {
            let date = getDate(this.value)
            this.date.year = date.getFullYear()
            this.date.month = date.getMonth() + 1
          }
          this.date.selectDay = true
          this.date.selectYear = false
          this.date.selectMonth = false
          this.date.days = getPanelDates(this.date.year,this.date.month)
        }
        else if (this.type === 'month') {
          if(initValue) {
            let val = this.value
            if(val !== ''){
              val = val + '-01'
            }
            let date = getDate(val)
            this.date.year = date.getFullYear()
            this.date.month = date.getMonth() + 1
            this.date.selectMonthYear = this.date.year
            this.date.selectDay = false
            this.date.selectYear = false
            this.date.selectMonth = true
          }
        }
        else if (this.type === 'year') {
          if(initValue){
            if(this.value === ''){
              this.date.year = new Date().getFullYear()
            }
            else{
              this.date.year = this.value
            }
          }
          this.date.selectDay = false
          this.date.selectYear = false
          this.date.selectMonth = true
          this.selectYearEvent()
        }
      },
      //上一年
      prevYearEvent(){
        this.date.year = returnYear(this.date.year,-1)
        this.init(false)
      },
      //上一月
      prevMonthEvent(){
        let date = returnDate(this.date.year,this.date.month,-1)
        this.date.year = date.getFullYear()
        this.date.month = date.getMonth() + 1
        this.init(false)
      },
      //下一月
      nextMonthEvent(){
        let date = returnDate(this.date.year,this.date.month,1)
        this.date.year = date.getFullYear()
        this.date.month = date.getMonth() + 1
        this.init(false)
      },
      //下一年
      nextYearEvent(){
        this.date.year = returnYear(this.date.year,1)
        this.init(false)
      },
      //选择年份
      selectYearEvent(){
        this.date.selectYearStart = accAdd(this.date.year,-7)
        this.date.selectYearEnd = accAdd(this.date.selectYearStart,14)
        this.date.selectYears = getSelectYear(this.date.selectYearStart,15)
        this.date.selectDay = false
        this.date.selectYear = true
        this.date.selectMonth = false
      },
      //前一版年份
      prevMoreYearEvent(){
        this.date.selectYearEnd = accAdd(this.date.selectYearStart, -1)
        this.date.selectYearStart = accAdd(this.date.selectYearEnd, -14)
        this.date.selectYears = getSelectYear(this.date.selectYearStart,15)
      },
      //下一版年份
      nextMoreYearEvent(){
        this.date.selectYearStart = accAdd(this.date.selectYearEnd, 1)
        this.date.selectYearEnd = accAdd(this.date.selectYearStart, 14)
        this.date.selectYears = getSelectYear(this.date.selectYearStart,15)
      },
      //选中年份
      selectYearedEvent(val){
        this.date.year = val
        if(this.type === 'date'){
          //到达选择月份面板
          this.selectMonthEvent()
        }
        else if(this.type === 'month'){

        }
        else if(this.type === 'year'){
          this.$emit('call',val + '')
        }
      },
      //选择月份
      selectMonthEvent(){
        this.date.selectMonthYear = this.date.year
        this.date.selectDay = false
        this.date.selectYear = false
        this.date.selectMonth = true
      },
      prevSelectMonthYearEvent(){
        this.date.selectMonthYear = accAdd(this.date.selectMonthYear, -1)
      },
      nextSelectMonthYearEvent(){
        this.date.selectMonthYear = accAdd(this.date.selectMonthYear, 1)
      },
      selectMonthedEvent(val){
        if(this.type === 'date') {
          this.date.month = val
          this.date.year = this.date.selectMonthYear
          this.init(false)
        }
        else if(this.type === 'month'){
          let month = val
          if(parseInt(month) < 10){
            month = '0' + month
          }
          let result = this.date.year + '-' + month
          this.$emit('call',result)
        }
      },
      //选择日期
      selectDate(val){
        if(this.getIsRange(val)){
          this.$emit('call',val)
        }
      },
      //清空回调函数
      clearEvent(){
        this.$emit('clear')
      },
      //选择当天
      selectCurrentEvent(){
        let val = formatDate(new Date())
        if(this.getIsRange(val)) {
          this.$emit('call',val)
        }
        else{
          //
          let date = new Date()
          this.date.year = date.getFullYear()
          this.date.month = date.getMonth() + 1
          this.init(false)
        }
      }
    },
    filters:{
      getDay(date){
        return parseInt(date.split("-")[2])
      }
    },
    computed:{
      //获取所在位置
      getPosition(){
        let result = ''
        if(this.showPanel) {
          let rect = this.$el.parentNode.getBoundingClientRect()

          if (this.position.x === 'left') {
            if(this.position.z === '1') {
              //通行
              result += 'left:0;'
            }
            else{
              //半行

            }
          }
          else if(this.position.x === 'center'){
            if(this.position.z === '1') {
              //通行
              result += 'left:' + accMul(accAdd(rect.width,-270),0.5) + 'px;'
            }
            else{
              //半行

            }
          }
          else if(this.position.x === 'right'){
            if(this.position.z === '1'){
              //通行
              result += 'left:' + accAdd(rect.width,-270) + 'px;'
            }
            else{
              //半行

            }
          }

          if (this.position.y === 'bottom') {
            result += 'top:' + accAdd(rect.height,3) + 'px'
          }
          else if(this.position.y === 'center'){
            result += 'top:' + accMul(accAdd(rect.height,-300),0.5) + 'px'
          }
          else if(this.position.y === 'top'){
            result += 'top:-' + accAdd(300,3) + 'px'
          }
        }
        return result
      },
      //选择面板的年份是否等于当前选择的年份
      getSelectCurrentYear(){
        return function (val) {
          return this.date.year === val
        }
      },
      //选择面板的月份是否等于当前选择的月份
      getSelectCurrentMonth(){
        return function (val) {
          return this.date.month === val
        }
      },
      //获取当前日期是否当前月份
      getCurrentMonth(){
        return function (date) {
          return getCurrentMonthByDate(date,this.date.month)
        }
      },
      //获取日期是否当天
      getCurrentDate(){
        return function (val) {
          return formatDate(new Date()) === val
        }
      },
      getCurrentSelect(){
        return function (val) {
          return this.value === val
        }
      },
      //日期是否在规定的区间中
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
    },
    watch:{
      show(newVal){
        this.showPanel = newVal
        if(newVal) {
          this.init(true)
        }
      }
    }
  }
</script>

<style scoped>

</style>
