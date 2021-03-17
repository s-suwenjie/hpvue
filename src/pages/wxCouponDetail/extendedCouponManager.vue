<template>
  <div>
    <yhm-managerpage>
      <!--导航条-->
      <template #navigation>系统&nbsp;&gt;&nbsp;优惠券管理&nbsp;&gt;&nbsp;优惠券明细管理</template>
      <!-- 筛选-->
      <template #operate>
        <!--<yhm-commonbutton :value="choose?'收起筛选':'展开筛选'" :icon="choose?'btnUp':'btnDown'" @call="switchChoose()"></yhm-commonbutton>-->
        <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initData"></yhm-managersearch>
        <yhm-radiofilter @initData="initChoose('couponCategory')" title="类型" :content="couponCategoryList"></yhm-radiofilter>
        <yhm-radiofilter @initData="initChoose('state')" title="状态" :content="stateList"></yhm-radiofilter>
        <yhm-radiofilter @initData="initChoose('time')" title="时间内到期" :content="timeList"></yhm-radiofilter>
        <yhm-commonbutton style="margin-left: 1000px" value="批量延期" icon="replace"  @call="replace()"></yhm-commonbutton>
      </template>
      <!--筛选区-->
      <!--<template #choose>-->
      <!--<div v-show="choose" class="buttonBody mptZero">-->
      <!--<yhm-radiofilter @initData="initChoose('couponCategory')" title="类型" :content="couponCategoryList"></yhm-radiofilter>-->
      <!--<yhm-radiofilter @initData="initChoose('state')" title="状态" :content="stateList"></yhm-radiofilter>-->
      <!--</div>-->
      <!--</template>-->

      <!--数据表头-->
      <template #listHead>
        <yhm-managerth style="width: 40px;" title="选择"></yhm-managerth>
        <yhm-managerth style="width: 40px;" title="查看"></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="车牌号"></yhm-managerth>
        <yhm-managerth title="车型"></yhm-managerth>
        <yhm-managerth style="width: 300px;" title="优惠券名称"></yhm-managerth>
        <yhm-managerth style="width: 90px;" title="优惠券Logo"></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="优惠券类型"></yhm-managerth>
        <yhm-managerth style="width: 125px;" title="发放日期"></yhm-managerth>
        <yhm-managerth style="width: 125px;" title="到期日期"></yhm-managerth>
        <yhm-managerth style="width: 90px;" title="状态"></yhm-managerth>
        <yhm-managerth style="width: 170px;" title="使用/过期日期"></yhm-managerth>
        <yhm-managerth style="width: 140px" title="操作"></yhm-managerth>
      </template>

      <!--数据明细-->
      <template #listBody>
        <tr v-for="(item,index) in content" :key="index" :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]">
          <yhm-manager-td-checkbox :value="item"></yhm-manager-td-checkbox>
          <yhm-manager-td-look @click="view(item.id)"></yhm-manager-td-look>
          <yhm-manager-td :value="item.vehicleCode"></yhm-manager-td>
          <yhm-manager-td :value="item.vehicleModel"></yhm-manager-td>
          <yhm-manager-td :value="item.couponName"></yhm-manager-td>
          <yhm-manager-td-image :tip="true" left="-640" width="450" height="250" :value="item.couponUrl" tag="wxCoupon"></yhm-manager-td-image>
          <yhm-manager-td-psd :value="item.couponCategory" :list="couponCategoryList.list"></yhm-manager-td-psd>
          <yhm-manager-td-date :value="item.start"></yhm-manager-td-date>
          <yhm-manager-td-date :value="item.end"></yhm-manager-td-date>
          <yhm-manager-td-psd :value="item.state" :list="stateList.list"></yhm-manager-td-psd>
          <yhm-manager-td-date :value="item.operateDate"></yhm-manager-td-date>
          <yhm-manager-td-operate>
            <yhm-manager-td-operate-button @click="operation(item)" value="优惠卷延期" icon="i-btn-applicationSm"  color="#0033FF" ></yhm-manager-td-operate-button>
          </yhm-manager-td-operate>
        </tr>
      </template>

      <!--数据空提示-->
      <template #empty>
        <span class="m_listNoData" v-show="empty">暂时没有数据</span>
      </template>
      <!--分页控件-->
      <template #pager>
        <yhm-pagination :pager="pager" @initData="initPageData(false)"></yhm-pagination>
      </template>
    </yhm-managerpage>
  </div>
</template>

<script>
  import { managermixin } from '@/assets/manager.js'
  import {tenThousandFormatHtml,formatDate} from '@/assets/common.js'
  export default {
    name: 'extendedCouponManager',
    mixins: [managermixin],
    data(){
      return{
        stateList:{
          value:"",
          list:[]
        },
        couponCategoryList:{
          value:"",
          list:[]
        },
        timeList:{
          value:'',
          list: [
            {
              code: '',
              num: '0',
              img: '',
              showName: '一周内',
            },
            {
              code: '',
              num: '1',
              img: '',
              showName: '一月内',
            },
            {
              code: '',
              num: '2',
              img: '',
              showName: '本季度内',
            },
          ]
        },
        start:' 00:00:00',//开始时的时分秒
        finish:' 23:59:59',//结束时的时分秒
        startDate:formatDate(new Date()),//开始时间
        endDate:formatDate(new Date()),//结束时间
      }
    },
    created () {
      // this.init()
    },
    methods:{
      replace(){
        if (this.selectValue.length ===0){
          this.$dialog.alert({
            tipValue:'至少选择一条信息!!!',
            alertImg: 'warn',
            width:'300'
          })
        }else {
          //操作一条
          let arr=[]
          for(let i = 0;i<this.selectValue.length; i++){
            arr.push({
              id:this.selectValue[i]
            })
          }
          sessionStorage.WxOperation = JSON.stringify(arr)

          this.batchPostponement()
        }

      },
      batchPostponement(){
        this.$dialog.OpenWindow({
          width: 1050,
          height: 500,
          url: '/selectDateTime' ,
          title: '选择日期',
          closeCallBack: (data) => {
            if (data) {
              this.initPageData(false)
            }
          }
        })
      },
      operation(item){
        let arr=[]
        arr.push({
          id:item.id
        })
        sessionStorage.WxOperation = JSON.stringify(arr)
        this.$dialog.OpenWindow({
          width: 1050,
          height: 500,
          url: '/selectDateTime',
          title: '选择日期',
          closeCallBack: (data) => {
            if (data) {
              if (data.type === 0) {
                this.$dialog.alert({
                  tipValue: data.message,
                  closeCallBack: () => {
                    this.initPageData(false)
                  }
                })
              }else if(data.type === 1){
                this.$dialog.alert({
                  alertImg:'warn',
                  tipValue: data.message
                })
              }
            }
          }
        })
      },
      getYear(type, dates) {//type为字符串类型，有两种选择，"s"代表开始,"e"代表结束，dates为数字类型，不传或0代表今年，-1代表去年，1代表明年
        let dd = new Date()
        let n = dates || 0
        let year = dd.getFullYear() + Number(n)
        let day = ''
        if (type == "s") {
          day = year + "-01-01"
        }
        if (type == "e") {
          day = year + "-12-31"
        }
        if (!type) {
          day = year + "-01-01/" + year + "-12-31"
        }
        return day
      },
      currentSeason(){//上季度
        Date.prototype.format =function(format)
        {
          let o = {
            "M+" : this.getMonth()+1, //month
            "d+" : this.getDate(), //day
            "h+" : this.getHours(), //hour
            "m+" : this.getMinutes(), //minute
            "s+" : this.getSeconds(), //second
            "q+" : Math.floor((this.getMonth()+3)/3), //quarter
            "S" : this.getMilliseconds() //millisecond
          }
          if(/(y+)/.test(format)) format=format.replace(RegExp.$1,
            (this.getFullYear()+"").substr(4- RegExp.$1.length));
          for(let k in o)if(new RegExp("("+ k +")").test(format))
            format = format.replace(RegExp.$1,
              RegExp.$1.length==1? o[k] :
                ("00"+ o[k]).substr((""+ o[k]).length));
          return format;
        }
        let dayMSec = 24 * 3600 * 1000;
        let today = new Date();
        //得到今天距离本周一的天数
        function getDayBetweenMonday(){
          //得到今天的星期数(0-6),星期日为0
          let weekday = today.getDay();
          //周日
          if(weekday == 0){
            return 6;
          }else{
            return weekday - 1;
          }
        }
        function getLastDay(){
          let yestodayMSec=today.getTime() -dayMSec;
          let yestoday = new Date(yestodayMSec);
          return yestoday.format('yyyy-MM-dd')+","+yestoday.format('yyyy-MM-dd');
        }
        function getLastWeek(){
          //得到距离本周一的天数
          let weekdayBetween = getDayBetweenMonday();
          //得到本周星期一的毫秒值
          let nowMondayMSec = today.getTime() - weekdayBetween * dayMSec;
          //得到上周一的毫秒值
          let lastMondayMSec = nowMondayMSec - 7 * dayMSec;
          //得到上周日的毫秒值
          let lastSundayMSec = nowMondayMSec - 1 * dayMSec;
          let lastMonday = new Date(lastMondayMSec);
          let lastSunday = new Date(lastSundayMSec);
          return lastMonday.format('yyyy-MM-dd')+","+lastSunday.format('yyyy-MM-dd');
        }
        function getLastMonth(){
          //得到上一个月的第一天
          let lastMonthFirstDay = new Date(today.getFullYear() , today.getMonth()-1 , 1);
          //得到本月第一天
          let nowMonthFirstDay = new Date(today.getFullYear() , today.getMonth(), 1);
          //得到上一个月的最后一天的毫秒值
          let lastMonthLastDayMSec = nowMonthFirstDay.getTime() - 1 * dayMSec;
          let lastMonthLastDay = new Date(lastMonthLastDayMSec);
          return lastMonthFirstDay.format('yyyy-MM-dd')+","+lastMonthLastDay.format('yyyy-MM-dd');
        }
        function getLastQuarter(){
          //得到上一个季度的第一天
          let lastQuarterFirstDay = new Date(today.getFullYear() , today.getMonth() - 3 , 1);
          //得到本月第一天
          let nowMonthFirstDay = new Date(today.getFullYear() , today.getMonth(), 1);
          //得到上一个季度的最后一天的毫秒值
          let lastQuarterLastDayMSec = nowMonthFirstDay.getTime() - 1 * dayMSec;
          let lastQuarterLastDay = new Date(lastQuarterLastDayMSec);
          return lastQuarterFirstDay.format('yyyy-MM-dd') +","+lastQuarterLastDay.format('yyyy-MM-dd');
        }
        return getLastQuarter()
      },
      time(time = +new Date()) {//时间戳转化
        let date = new Date(time + 8 * 3600 * 1000); // 增加8小时
        return date.toJSON().substr(0, 19).replace('T', ' ');
      },
      computTimeHorizon(type) {//本季度
        let startDate, endDate;
        let d = new Date();
        let year = d.getFullYear()
        let month = d.getMonth() + 1;
        let date = d.getDate();
        let minutes = d.getMinutes();
        let hours = d.getHours();
        let seconds = d.getSeconds();
        if (type == 1) {
          if (month < 4) {
            startDate = year + '-01-01' + 'T' + '00:00:00'
            endDate = year + '-' + (month < 10 ? ('0' + month) : month) + '-' + (date < 10 ? ('0' + date) : date) + 'T' + (
              hours < 10 ? ('0' + hours) : hours) + ':' + (minutes < 10 ? (
              '0' + minutes) : minutes) + ':' + (seconds < 10 ? ('0' + seconds) : seconds)
          } else if (month > 3 && month < 7) {
            startDate = year + '-03-01' + 'T' + '00:00:00'
            endDate = year + '-' + (month < 10 ? ('0' + month) : month) + '-' + (date < 10 ? ('0' + date) : date) + 'T' + (
              hours < 10 ? ('0' + hours) : hours) + ':' + (minutes < 10 ? (
              '0' + minutes) : minutes) + ':' + (seconds < 10 ? ('0' + seconds) : seconds)
          } else if (month > 6 && month < 10) {
            startDate = year + '-07-01' + 'T' + '00:00:00'
            endDate = year + '-' + (month < 10 ? ('0' + month) : month) + '-' + (date < 10 ? ('0' + date) : date) + 'T' + (
              hours < 10 ? ('0' + hours) : hours) + ':' + (minutes < 10 ? (
              '0' + minutes) : minutes) + ':' + (seconds < 10 ? ('0' + seconds) : seconds)
          } else if (month > 9) {
            startDate = year + '-10-01' + 'T' + '00:00:00'
            endDate = year + '-' + (month < 10 ? ('0' + month) : month) + '-' + (date < 10 ? ('0' + date) : date) + 'T' + (
              hours < 10 ? ('0' + hours) : hours) + ':' + (minutes < 10 ? (
              '0' + minutes) : minutes) + ':' + (seconds < 10 ? ('0' + seconds) : seconds)
          }
        }
        return [new Date(startDate).getTime(), new Date(endDate).getTime()]
        //此处返回为时间戳，根据需要可进行调整
      },
      getMonth(type, months) {//type为字符串类型，有两种选择，"s"代表开始,"e"代表结束，months为数字类型，不传或0代表本月，-1代表上月，1代表下月
        let d = new Date()
        let year = d.getFullYear()
        let month = d.getMonth() + 1
        if (Math.abs(months) > 12) {
          months = months % 12
        }
        if (months != 0) {
          if (month + months > 12) {
            year++
            month = (month + months) % 12
          } else if (month + months < 1) {
            year--
            month = 12 + month + months
          } else {
            month = month + months
          }
        }
        month = month < 10 ? "0" + month: month
        let date = d.getDate()
        let firstday = year + "-" + month + "-" + "01"
        let lastday = ""
        if (month == "01" || month == "03" || month == "05" || month == "07" || month == "08" || month == "10" || month == "12") {
          lastday = year + "-" + month + "-" + 31
        } else if (month == "02") {
          if ((year % 4 == 0 && year % 100 != 0) || (year % 100 == 0 && year % 400 == 0)) {
            lastday = year + "-" + month + "-" + 29
          } else {
            lastday = year + "-" + month + "-" + 28
          }
        } else {
          lastday = year + "-" + month + "-" + 30
        }
        let day = ""
        if (type == "s") {
          day = firstday
        } else {
          day = lastday
        }
        return day
      },
      getMonday(type, dates) {//type为字符串类型，有两种选择，"s"代表开始,"e"代表结束，dates为数字类型，不传或0代表本周，-1代表上周，1代表下周
        let dd = ''
        let now = new Date();
        let nowTime = now.getTime();
        let day = now.getDay();
        let longTime = 24 * 60 * 60 * 1000;
        let n = longTime * 7 * (dates || 0);
        if (type == "s") {
          dd = nowTime - (day - 1) * longTime + n;
        }
        if (type == "e") {
          dd = nowTime + (7 - day) * longTime + n;
        }
        dd = new Date(dd);
        let y = dd.getFullYear();
        let m = dd.getMonth() + 1;
        let d = dd.getDate();
        m = m < 10 ? "0" + m: m;
        d = d < 10 ? "0" + d: d;
        day = y + "-" + m + "-" + d;
        return day;
      },
      initDate(){
        let value = this.timeList.value
        if(value=='0'){//本周时间
          this.startDate = this.getMonday('s',0)
          this.endDate = this.getMonday("e",0)
          this. start=' 00:00:00'//开始时的时分秒
          this.finish=' 23:59:59'//结束时的时分秒
        }else if(value=='1'){//本月时间
          this.startDate = this.getMonth('s',0)
          this.endDate = this.getMonth("e",0)
          this. start=' 00:00:00'//开始时的时分秒
          this.finish=' 23:59:59'//结束时的时分秒
        }else if(value=='2'){//本季度
          this.startDate = this.time(this.computTimeHorizon(1)[0]).slice(0,10)
          this.endDate = this.time(this.computTimeHorizon(1)[1]).slice(0,10)
          this. start=' 00:00:00'//开始时的时分秒
          this.finish=' 23:59:59'//结束时的时分秒
        }
        if(value==''){//全部
          this.startDate = ''
          this.endDate = ''
          this.start = ''
          this.finish = ''
        }

      },
      initPageData (initValue) {
        let params = {}
        this.initDate()
        if (initValue) {
          params = {
            couponCategory:this.couponCategoryList.value,
            state:this.stateList.value,
            startDate:this.startDate + this.start,//开始时间
            endDate:this.endDate + this.finish,//结束时间
          }
        } else {
          params = {
            couponCategory:this.couponCategoryList.value,
            state:this.stateList.value,
            startDate:this.startDate + this.start,//开始时间
            endDate:this.endDate + this.finish,//结束时间
          }
        }
        this.init({
          initValue:initValue,
          url: '/wx/wxCouponDetail/getJointManager',
          data:params,
          all:(data) =>{
            //不管是不是初始化都需要执行的代码
          },
          init:(data)=>{
            //初始化时需要执行的代码
            this.shortcutSearchContent=data.shortcutSearchContent
            this.stateList = data.statePsd
            this.couponCategoryList = data.couponCategoryPsd
          }
        })
      }
    },

  }
</script>

<style scoped>

</style>




