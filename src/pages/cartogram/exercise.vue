<template>
    <div>
      <div class="yAxisName" :style="{'color':category=='0'?'#49a9ea':'#EA5506'}">{{category=='0'?'出单量':'推送量'}}</div>
      <div class="xAxisName" :style="{'color':category=='0'?'#49a9ea':'#EA5506'}">利润</div>
      <div v-show="starGraphShow" class="starGraphShow" :style="{'opacity':starGraphActionShow?'1':'0'}" @click="starGraphEvent">
        <div id="starGraphSalesman" v-if="state==0" style="z-index: 1005;height: 100%;"></div>
        <div id="starGraphUnit" v-if="state==1"  style="z-index: 1005;height: 100%;"></div>
<!--        <yhm-commonbutton value="返回" v-show="starGraphShow" @call="actionClickEvent"  :flicker="true" style="position: fixed;top: 5px;right: 50px;z-index: 8;" icon=""></yhm-commonbutton>-->
      </div>

      <div :class="{starGraphRight:starGraphActionShow,starGraphRightHide:!starGraphActionShow}"></div>
      <div :class="{starGraphLeft:starGraphActionShow,starGraphLeftHide:!starGraphActionShow}"></div>

      <div style="background-color: #fff;width: 1250px;height: 740px;margin: auto;">
  <!--        <yhm-commonbutton value="切换指标" @call="btnClick" v-show="!tabShow" :flicker="true" icon="" class="btn"></yhm-commonbutton>-->
        <div class="cartogramTop">
          <div style="display: flex;justify-content:center;">
            <yhm-radiofilter @initData="initChoose('time')" title="时间" :content="timeList"></yhm-radiofilter>
            <yhm-radiofilter style="margin-right: 10px;" @initData="typeChange('type')" title="查看" :content="typeList" all="0"></yhm-radiofilter>
            <yhm-commonbutton value="查看列表" @call="lookOverBtn" :flicker="true" icon=""></yhm-commonbutton>
            <yhm-commonbutton style="margin-left: 6px;" :value="category=='0'?'切换至推送量':'切换至出单量'" @call="switchover(category)" :flicker="true" icon=""></yhm-commonbutton>

          </div>
          <div :class="{customTimeShow:timeShow,customTimeHide:!timeShow}" >
            <yhm-form-date v-show="dateShow" title="开始时间" @call="dateSelection(startDate,endDate)" style="width: 350px;" :value="startDate" id="startDate" position="t"></yhm-form-date>
            <yhm-form-date v-show="dateShow" title="结束时间" @call="dateSelection(startDate,endDate)" style="width: 350px;margin-left: 30px;" :value="endDate" id="endDate" position="t"></yhm-form-date>
          </div>
        </div>
        <div id="exerciseCartogram" class="exerciseCartogram" style="top: -102px;transition: all 1s;"></div>
          <yhm-view-tab class="exerciseTab" style="z-index: 3;" :style="{'top': tabShow?'10px':'-130%'}">
            <template #tab>
              <yhm-view-tab-button :list="tabState" :index="0" @click="tabBtnClick(0)">明星类</yhm-view-tab-button>
              <yhm-view-tab-button :list="tabState" :index="1" @click="tabBtnClick(1)">问题类</yhm-view-tab-button>
              <yhm-view-tab-button :list="tabState" :index="2" @click="tabBtnClick(2)">瘦狗类</yhm-view-tab-button>
              <yhm-view-tab-button :list="tabState" :index="3" @click="tabBtnClick(3)">金牛类</yhm-view-tab-button>
<!--              <img class="exerciseImg" v-show="tabShow" @click="tabShow=!tabShow" src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2720424025,571977794&fm=26&gp=0.jpg" width="40" height="40" alt="">-->
            </template>
            <template #content>
              <yhm-view-tab-list :customize="true" :pager="true" customize-bg-color="#e2f1f0">
              <template #listHead>
                <yhm-managerth style="width: 38px;" title="查看"></yhm-managerth>
                <yhm-managerth :title="state=='0'?'业务员名称':'保险公司名称'"></yhm-managerth>
                <yhm-managerth width="200" title="预计盈亏"></yhm-managerth>
                <yhm-managerth width="200" title="实时盈亏"></yhm-managerth>
                <yhm-managerth width="80" title="条数"></yhm-managerth>
                <yhm-managerth width="80" title="星状图"></yhm-managerth>
              </template>
              <template #listBody>
                <tr v-for="(item,index) in content" :key="index" :class="{InterlacBg:index%2!==0}">
                  <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>
                  <yhm-manager-td-center :value="item.salsesman"></yhm-manager-td-center>
                  <yhm-manager-td-money  :value="item.actualProfitLoss"   :style="{'color':item.actualProfitLoss>=0?'#2c9208':'#f00'}"   style=" font-weight:bold;"></yhm-manager-td-money>
                  <yhm-manager-td-money  :value="item.realTimeProfitLoss" :style="{'color':item.realTimeProfitLoss>=0?'#2c9208':'#f00'}" style=" font-weight:bold;"></yhm-manager-td-money>
                  <yhm-manager-td-center :value="item.count"></yhm-manager-td-center>
                  <yhm-manager-td value=" " style="display: flex;justify-content: center;">
                    <svg t="1597054667634" @click="radarMapClick(item)" class="icon" viewBox="0 0 1077 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8694" width="32" height="32"><path d="M538.947 0L0 391.087 206.605 1024H871.29l206.606-632.913z m29.939 89.573L982.07 388.096l-95.798 32.849L568.859 149.26z m0 134.333l257.509 217.95-257.51 83.59z m284.456 265.7L691.658 725.45l-107.79-149.288zM643.746 752.345l-278.447 98.492 176.64-238.834z m-149.72-170.2l-173.649 235.87-80.842-307.496zM257.51 456.758L512 241.826V528.41zM512 89.573v80.573L191.623 438.892l-119.754-32.85z m-275.456 841.89L83.806 468.723l92.834 26.866 98.79 382.114z m41.903 35.813l26.948-35.84 371.28-131.342 122.773 167.182z m565.895-35.84L727.579 773.255l209.597-310.488-2.992-2.964 68.85-23.902z" fill="#F4A460" p-id="8695"></path></svg>
                  </yhm-manager-td>
                </tr>
              </template>
              <template #empty>
             <span class="m_listNoData" v-show="content.length=='0'?true:false">暂时没有数据</span>
              </template>
              <template #pager>
                <yhm-pagination :pager="pager" is-page-size="false" @initData="paging"></yhm-pagination>
              </template>
            </yhm-view-tab-list>
            </template>
          </yhm-view-tab>
        </div>
<!--      <div class="bottomBtn">-->
<!--      </div>-->
      <div class="bottomBtn" :class="{bottomBtnShow:!tabShow}">
        <yhm-commonbutton value="返回" @call="actionClickEvent" icon=" " :flicker="true"></yhm-commonbutton>
      </div>
      <div class="bottomBtn" :class="{bottomBtnShow:!starGraphActionShow}">
        <yhm-commonbutton value="返回" @call="actionClickEvent" icon=" " :flicker="true"></yhm-commonbutton>
      </div>
    </div>
</template>

<script>
  import { viewmixin } from '@/assets/view.js'
  import {tenThousandFormatHtml,formatDate} from '@/assets/common.js'
  export default {
    name: 'exercise',
    mixins: [viewmixin],
    data(){
      return{
        tabState:[{select:true},{select:false},{select:false},{select:false}],
        currentDate:formatDate(new Date()),//当天时间
        startDate:formatDate(new Date()),//开始时间
        endDate:formatDate(new Date()),//结束时间
        starGraphActionShow:false,//星形图背景 显示隐藏
        starGraphShow:false,//星形图 显示隐藏
        timeShow:false,//自定义时间选择 显示隐藏
        dateShow:false,//时间组件 显示隐藏
        tabShow:false,//tab列表 显示隐藏
        start:' 00:00:00',//开始时的时分秒
        finish:' 23:59:59',//结束时的时分秒
        quadrant:'',//象限值
        averageY:'',//Y轴中心值
        averageX:'',//X轴中心值
        titleText:'',//星形图标题
        state:'0',//0是业务员1是保险公司
        category:'0',//0是出单量1是推送量
        // xAxis:[],
        // yAxis:[],
        rangeY:[],//Y轴所有数值
        rangeX:[],//x轴所有数值
        content:[],//列表数据
        details:[],//列表备份数据
        marksData:[],//转化数据类型后的数组
        indicator:[],//左边星型图数据
        rectangleList:[],//矩阵图的所有数据
        pager: { // 分页数据
          total: '', // 数据总条数
          pageSize: 15, // 单页数据条数
          pageIndex: 1, // 当前页码
          selectCount: 0 // 选中数据的条数
        },
        typeList:{//查看类型
          list:[
            {
              img:'',
              num:'0',
              code:'',
              showName:'业务员',
            },
            {
              img:'',
              num:'1',
              code:'',
              showName:'保险公司',
            }
          ],
          value:'0'
        },
        timeList: {//时间筛选
          list: [
            {
              img:'',
              num:'0',
              code:'',
              showName:'当天',
            },
            {
              img:'',
              num:'1',
              code:'',
              showName:'本周',
            },
            {
              img:'',
              num:'2',
              code:'',
              showName:'上周',
            },
            {
              img:'',
              num:'3',
              code:'',
              showName:'本月',
            },
            {
              img:'',
              num:'4',
              code:'',
              showName:'上月',
            },
            {
              img:'',
              num:'5',
              code:'',
              showName:'本季度',
            },
            {
              img:'',
              num:'6',
              code:'',
              showName:'上季度',
            },
            {
              img:'',
              num:'7',
              code:'',
              showName:'本年',
            },
            {
              img:'',
              num:'8',
              code:'',
              showName:'上一年',
            },
            {
              img:'',
              num:'9',
              code:'',
              showName:'选择时间',
            },
          ],
          value:'0'
        },

      }
    },
    methods:{
      paging(){//分页
        let list = this.details.concat()
        this.pager.total=this.details.length
        this.pager.pageSize=15
        let a=(this.pager.pageIndex-1)*this.pager.pageSize
        let arr=[]
        arr=list.splice(a,this.pager.pageSize)
        this.content=arr
      },
      radarMapClick(item){//点击列表数据后的星形图时
        // console.log( item )
        setTimeout(()=>{
          this.starGraphShow = true
        },700)
        this.starGraphActionShow = true
        this.ajaxJson({
          url: '/Insurance/graphicsRadar',
          loading:'0',
          data: {
            id: item.salsesmanID,
            startDate:this.startDate + this.start,//开始时间
            endDate:this.endDate + this.finish,//结束时间
          },
          call: (datas) => {
            let rankList = datas.yearList.concat()
            this.starGraphEvent(datas,rankList)
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

      switchover(val){//切换出单量推送量 val是category
        if(val == '0'){
          this.category = '1'
          // this.state = '1'
          // this.typeList = {//查看类型
          //   list:[
          //     {
          //       img:'',
          //       num:'1',
          //       code:'',
          //       showName:'保险公司',
          //     }
          //   ],
          //     value:'1'
          // }
        }else{
          this.category = '0'
          // this.state = '0'
          // this.typeList = {//查看类型
          //   list:[
          //     {
          //       img:'',
          //       num:'0',
          //       code:'',
          //       showName:'业务员',
          //     },
          //     {
          //       img:'',
          //       num:'1',
          //       code:'',
          //       showName:'保险公司',
          //     }
          //   ],
          //   value:'0'
          // }
        }
        this.initPage()
      },
      lookOverBtn(){//点看列表
        this.tabShow = true
      },
      listView(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '700',
          url: '/policyView?id=' + item.id,
          title: '查看保单信息',
          closeCallBack: (data)=>{
            if(data){
              this.initPage()
            }
          }
        })
      },
      typeChange(){//切换保险公司 负责人
        let value = this.typeList.value
        if(value=='0'){//公司
          this.state = '0'
        }else{
          this.state = '1'
        }
        this.initPage()
      },
      dateSelection(start,finish){//选择时间段
        if(start!=''&&finish!=''){
          this.initPage()
        }
      },
      initChoose(){//选择时间
        let value = this.timeList.value
        if(value=='0'){//当天时间
          this.startDate = this.currentDate
          this.endDate = this.currentDate
        }else if(value=='1'){//本周时间
          this.startDate = this.getMonday('s',0)
          this.endDate = this.getMonday("e",0)
        }else if(value=='2'){//上周时间
          this.startDate = this.getMonday('s',-1)
          this.endDate = this.getMonday("e",-1)
          // console.log( '上周',this.getMonday('s',-1),'上周',this.getMonday("e",-1))
        }else if(value=='3'){//本月时间
          this.startDate = this.getMonth('s',0)
          this.endDate = this.getMonth("e",0)
          // console.log( '本月',this.getMonth('s',0),'本月',this.getMonth("e",0))
        }else if(value=='4'){//上月时间
          this.startDate = this.getMonth('s',-1)
          this.endDate = this.getMonth("e",-1)
          // console.log( '上月',this.getMonth('s',-1),'上月',this.getMonth("e",-1))
        }else if(value=='5'){//本季度
          this.startDate = this.time(this.computTimeHorizon(1)[0]).slice(0,10)
          this.endDate = this.time(this.computTimeHorizon(1)[1]).slice(0,10)
        }else if(value=='6'){//上季度
          this.startDate = this.currentSeason().slice(0,10)
          this.endDate = this.currentSeason().slice(11,21)
          // console.log(this.currentSeason().slice(0,10),this.currentSeason().slice(11,21),'------------' )
        }else if(value=='7'){//本年
          this.startDate = this.getYear('s',0)
          this.endDate = this.getYear("e",0)
          // console.log( '本年',this.getYear('s',0),'本年',this.getYear("e",0))
        }else if(value=='8'){//上一年
          this.startDate = this.getYear('s',-1)
          this.endDate = this.getYear("e",-1)
          // console.log( '上一年',this.getYear('s',-1),'上一年',this.getYear("e",-1))
        }
        if(value==''){//全部
          this.startDate = ''
          this.endDate = ''
          this.start = ''
          this.finish = ''
        }else{
          this.start = ' 00:00:00'
          this.finish = ' 23:59:59'
        }
        if(value=='9'){
          this.timeShow = true
          setTimeout(()=>{
            this.dateShow = true
          },300)
          return
        }else{
          this.timeShow = false
          setTimeout(()=>{
            this.dateShow = false
          },0)
        }
        this.initPage()
      },
      btnClick(){//切换指标
        // window.opener('')
        // for(let i in this.marksData){
        //   this.marksData[i].value[1] = this.marksData[i].value[1] + 100
        // }
        // console.log( this.marksData )
        // this.statisticalGraph()

        this.ajaxJson({
          url: '/Insurance/initUnitForm',
          data: {

          },
          call: (data) => {
          }
        })
      },
      actionClickEvent(){
        if(!this.starGraphShow){
          this.tabShow=!this.tabShow
        }else{
          this.starGraphActionShow = false
          setTimeout(()=>{
            this.starGraphShow=false
          },1000)
        }

      },
      tabBtnClick(index){//列表切换事件
        this.quadrant = index
        this.ajaxJson({
          url: '/Insurance/graphicsDetailsManager',
          data:{
            state:this.state,//0是公司1是业务员
            salesmanID:this.salesmanID,//业务员id
            category:this.category,//0是出单量1是推送量
            insuredUnit:'',//保险公司ID 283B6A69-C180-433F-9E03-1BBB4867C3E7
            startDate:this.startDate + this.start,//开始时间
            endDate:this.endDate + this.finish,//结束时间
            rangeX:this.averageX,
            rangeY:this.averageY,
            pageIndex:this.pager.pageIndex,
            quadrant:index,//象限
          },
          call: (data) => {
            this.content = data.content
            this.details = data.content.concat()
            this.content = this.content.splice(0,this.pager.pageSize)
            this.pager.total = data.count
          }
        })
      },
      arrange(list,type){//排序 tyep为0是从大到小1是从小到大
        let arr = list.concat()
        if(type=='0'){
          arr = arr.sort((a, b) => {return b - a })/* 从大到小 */
        }else{
          arr = arr.sort((a, b) => {return a - b })/* 从小到大 */
        }
        return arr
      },
      starGraphEvent(data,rankList){
        let unitList = []//维度图数据 出单量
        let unitList1 = []//维度图数据 保单利润
        let unitList2 = []//维度图数据 保单总应收账款
        let legendTitle = []//模块的标题
        let typeList = ['出单量', '保单利润', '保单总应收账款']//保险公司 标题
        let typeList1 = ['出单总量','保单总利润','保单总应收账款']//业务员 标题
        let indicator = []//对应的指示器 保险公司维度图 出单量 保单利润 保单总应收账款
        let indicator1 = []//对应的指示器 业务员维度图 出单量
        let indicator2 = []//对应的指示器 业务员维度图 保单利润
        let indicator3 = []//对应的指示器 业务员维度图 保单总应收账款
        let list = []//12月星形图 的数组 保险公司 出单量
        // let list1 = []//拆分数组 12月星形图 保单利润
        // let list2 = []//拆分数组 12月星形图 保单总应收账款
        let salesmanList = []//拆分数组 维度星形图 出单量
        // let salesmanList1 = []//拆分数组 维度星形图 保单利润
        // let salesmanList2 = []//拆分数组 维度星形图 保单总应收账款
        let max = 0//最大值
        let max1 = 0//最大值
        let max2 = 0//最大值

        let min = 0//最小值
        // let radarCenter = [] //三维星形图位置
        let unitLists = []//计算左边维度星形图中最大的值 出单量
        let unitLists1 = []//计算左边维度星形图中最大的值 保单利润
        let unitLists2 = []//计算左边维度星形图中最大的值 保单总应收账款
        try {
          // console.log(1)
          if(this.state=='0'){//业务员
            let num = 0
            if(data.unitList.length<=2){
              num = data.unitList.length=='2'?1:2
            }
            // console.log(2)
            // radarCenter = ['17%', '40%']
            legendTitle = ['出单量','保单利润','保单应收账款','出单总量','保单总利润','保单总应收账款']
            for(let t in data.unitList){
              unitLists.push(data.unitList[t].mete)
              unitLists1.push(data.unitList[t].money)
              unitLists2.push(data.unitList[t].quotaMoney)
            }
            // console.log(3)
            setTimeout(()=>{
              for(let r in data.unitList){
                indicator1.push({'text':data.unitList[r].unit,max:this.arrange(unitLists,0)[0],min:this.arrange(unitLists,1)[0]})
                indicator2.push({'text':data.unitList[r].unit,max:this.arrange(unitLists1,0)[0],min:this.arrange(unitLists1,1)[0]})
                indicator3.push({'text':data.unitList[r].unit,max:this.arrange(unitLists2,0)[0],min:this.arrange(unitLists2,1)[0]})

                unitList.push(data.unitList[r].mete)
                unitList1.push(data.unitList[r].money)
                unitList2.push(data.unitList[r].quotaMoney)
              }
              // console.log(4)
              for(let c=0; c<num; c++){
                // indicator1.push({'text':'暂无',max:this.arrange(unitLists,0)[0],min:this.arrange(unitLists,0)[1]})
                // indicator2.push({'text':'暂无',max:this.arrange(unitLists1,0)[0],min:this.arrange(unitLists1,0)[1]})
                // indicator3.push({'text':'暂无',max:this.arrange(unitLists2,0)[0],min:this.arrange(unitLists2,0)[1]})
                indicator1.push({'text':'暂无'})
                indicator2.push({'text':'暂无'})
                indicator3.push({'text':'暂无'})


                unitList.push('0')
                unitList1.push('0')
                unitList2.push('0')
              }
            },300)
            // console.log(5)
            // list = [{'name':'出单总量','value':data.yearList[0].value}]
            for(let i in data.yearList){
              salesmanList.push({
                name:typeList1[i],
                value:data.yearList[i].value
              })
            }
            max = this.arrange(rankList[0].value,0)[0]/* 从大到小 */
            max1 = this.arrange(rankList[1].value,0)[0]/* 从大到小 */
            max2 = this.arrange(rankList[2].value,0)[0]/* 从大到小 */

            min = this.arrange(rankList[0].value,1)[0];/* 从小到大 */
            // console.log( '%c max','color:#49a9ea;',max,min )
            // console.log(6)
          }else{//保险公司
            // radarCenter = ['50%', '35%']
            legendTitle = [data.unitList[0].unit,'出单量','保单利润', '保单总应收账款']
            let arrs = [this.arrange(rankList[0].value,0)[0],this.arrange(rankList[1].value,0)[0],this.arrange(rankList[2].value,0)[0]]

            // console.log( '%c 最大值','color:red;',this.arrange(arrs,0)[0],this.arrange(arrs,0)[0],this.arrange(rankList[0].value,0)[0],this.arrange(rankList[1].value,0)[0],this.arrange(rankList[2].value,0)[0] )
            indicator = [
              // {text: '出单量',max:this.arrange(arrs,0)[0],min:this.arrange(arrs,1)[0]},
              // {text: '保单利润',max:this.arrange(arrs,0)[0],min:this.arrange(arrs,1)[0]},
              // {text: '保单总应收账款',max:this.arrange(arrs,0)[0],min:this.arrange(arrs,1)[0]},
              {text: '出单量'},
              {text: '保单利润'},
              {text: '保单总应收账款'},
            ]
            unitList.push(data.unitList[0].mete)
            unitList.push(data.unitList[0].money)
            unitList.push(data.unitList[0].quotaMoney)
            for(let w in data.yearList){
              list.push({
                name:typeList[w],
                value:data.yearList[w].value
              })
            }
            max = this.arrange(rankList[0].value,0)[0]/* 从大到小 */
            max1 = this.arrange(rankList[1].value,0)[0]/* 从大到小 */
            max2 = this.arrange(rankList[2].value,0)[0]/* 从大到小 */

          }
        }catch (e) {

        }

        // console.log( legendTitle )
        // console.log(7)
        setTimeout(()=>{
          let myChartSalesman = {}
          let myChartUnit = {}
          if(this.state=='0'){
            myChartSalesman = this.$echarts.init(document.getElementById('starGraphSalesman'))
          }else{
            myChartUnit = this.$echarts.init(document.getElementById('starGraphUnit'))
          }
          let optionSalesman = {//业务员
            title: {
              text: this.titleText
            },
            tooltip : {

            },
            legend: {
              left: 'center',
              data: legendTitle
            },
            radar:[
              {
                indicator: indicator1,
                center: ['17%', '30%'],
                radius: 80,
                name: {
                  rich: {
                    a: {
                      // color: 'red',
                      lineHeight: 20
                    },
                    b: {
                      color: '#49a9ea',
                      align: 'center',
                      backgroundColor: '#fff',
                      padding: 2,
                      borderRadius: 4
                    }
                  },
                  formatter: (a,b)=>{
                    // console.log( a,b,'===============' )
                    let value = ''
                    for(let t=0; t<indicator1.length; t++){
                      if(indicator1[t].text==a){
                        value = unitList[t] + '单'
                        if(unitList[t]==''){
                           value='0单'
                        }
                      }
                    }
                    return `{a|${a}}\n{b|${value}}`
                  }
                }
              },
              {
                indicator: indicator2,
                center: ['50%','30%'],
                radius: 80,
                name: {
                  rich: {
                    a: {
                      // color: 'red',
                      lineHeight: 20
                    },
                    b: {
                      color: '#49a9ea',
                      align: 'center',
                      backgroundColor: '#fff',
                      padding: 2,
                      borderRadius: 4
                    }
                  },
                  formatter: (a,b)=>{
                    let value = ''
                    for(let t=0; t<indicator2.length; t++){
                      if(indicator2[t].text==a){
                        value = unitList1[t]
                        if(unitList1[t]==''){
                          value='0'
                        }
                      }
                    }
                    return `{a|${a}}\n{b|${value}}`
                  }
                }
              },
              {
                indicator: indicator3,
                center: ['82%','30%'],
                radius: 80,
                name: {
                  rich: {
                    a: {
                      // color: 'red',
                      lineHeight: 20
                    },
                    b: {
                      color: '#49a9ea',
                      align: 'center',
                      backgroundColor: '#fff',
                      padding: 2,
                      borderRadius: 4
                    }
                  },
                  formatter: (a,b)=>{
                    let value = ''
                    for(let t=0; t<indicator3.length; t++){
                      if(indicator3[t].text==a){
                        value = unitList2[t]
                        if(unitList2[t]==''){
                          value='0'
                        }
                      }
                    }
                    return `{a|${a}}\n{b|${value}}`
                  }
                }
              },
              {
                indicator: (function (){
                  let res = [];
                  for (let i = 1; i <= 12; i++) {
                    res.push({text: i + '月',max:max});
                  }
                  return res;
                })(),
                center: ['17%', '70%'],
                radius: 80
              },
              {
                indicator: (function (){
                  let res = [];
                  for (let i = 1; i <= 12; i++) {
                    res.push({text: i + '月',max:max1});
                  }
                  return res;
                })(),
                center: ['50%', '70%'],
                radius: 80
              },
              {
                indicator: (function (){
                  let res = [];
                  for (let i = 1; i <= 12; i++) {
                    res.push({text: i + '月',max:max2});
                  }
                  return res;
                })(),
                center: ['82%', '70%'],
                radius: 80
              },
            ],
            series: [
              {
                type: 'radar',
                tooltip: {
                  trigger: 'item'
                },
                areaStyle: {},
                data: [
                  {
                    value: unitList,
                    name: '出单量'
                  }
                ]
              },
              {
                type: 'radar',
                tooltip: {
                  trigger: 'item'
                },
                radarIndex: 1,
                areaStyle: {},
                data: [
                  {
                    value: unitList1,
                    name: '保单利润'
                  }
                ]
              },
              {
                type: 'radar',
                tooltip: {
                  trigger: 'item'
                },
                radarIndex: 2,
                areaStyle: {},
                data: [
                  {
                    value: unitList2,
                    name: '保单应收账款'
                  }
                ]
              },
              {
                type: 'radar',
                radarIndex: 3,
                areaStyle: {},
                data:[salesmanList[0]],
              },
              {
                type: 'radar',
                radarIndex: 4,
                areaStyle: {},
                data:[salesmanList[1]],
              },
              {
                type: 'radar',
                radarIndex: 5,
                areaStyle: {},
                data:[salesmanList[2]],
              }

            ]
          };
          let optionUnit = {//保险公司
            title: {
              text: this.titleText
            },
            tooltip : {
              // confine: true,
              // trigger: 'axis',
              //   trigger: 'radar',
              // formatter:function (params) {
              //   console.log( 'params',params )
              //   let returnStr = params.name+'<br />';
              //
              //   for(let i=0;i<params.length;i++){
              //     returnStr+=params[i].seriesName+':'+Util.commafy(params[i].data)+'<br />'+params[i].seriesName+':'+Util.commafy(params[i].data)+'<br />' ;
              //   }
              //   let a = returnStr +'111111 '
              //   console.log( returnStr,'111111111111' )
              //   return returnStr;
              // }
            },
            legend: {
              left: 'center',
              data: legendTitle
            },
            radar:[
              {
                indicator: indicator,
                center: ['50%', '35%'],
                radius: 80,
                name: {
                  rich: {
                    a: {
                      // color: 'red',
                      lineHeight: 20
                    },
                    b: {
                      color: '#49a9ea',
                      align: 'center',
                      backgroundColor: '#fff',
                      padding: 2,
                      borderRadius: 4
                    }
                  },
                  formatter: (a,b)=>{
                    let value = ''
                      if(a=='出单量'){
                        value = unitList[0] + '单'
                      }else if(a=='保单利润'){
                        value = unitList[1]
                      }else if(a=='保单总应收账款'){
                        value = unitList[2]
                      }
                    return `{a|${a}}\n{b|${value}}`
                  }
                }
              },
              {
                indicator: (function (){
                  let res = [];
                  for (let i = 1; i <= 12; i++) {
                    res.push({text: i + '月',max:max});
                  }
                  return res;
                })(),
                center: ['20%', '75%'],
                radius: 80
              },
              {
                indicator: (function (){
                  let res = [];
                  for (let i = 1; i <= 12; i++) {
                    res.push({text: i + '月',max:max1});
                  }
                  return res;
                })(),
                center: ['50%', '75%'],
                radius: 80
              },
              {
                indicator: (function (){
                  let res = [];
                  for (let i = 1; i <= 12; i++) {
                    res.push({text: i + '月',max:max2});
                  }
                  return res;
                })(),
                center: ['80%', '75%'],
                radius: 80
              }
            ],
            series: [
              {
                type: 'radar',
                tooltip: {
                  trigger: 'item'
                },
                areaStyle: {},
                data: [
                  {
                    value: unitList,
                    name: data.unitList[0].unit
                  }
                ]
              },
              {
                type: 'radar',
                radarIndex: 1,
                areaStyle: {},
                data:[list[0]],
              }
              ,
              {
                type: 'radar',
                radarIndex: 2,
                areaStyle: {},
                data:[list[1]],
              }
              ,
              {
                type: 'radar',
                radarIndex: 3,
                areaStyle: {},
                data:[list[2]],
              }
            ]
          };
          // console.log( 8 )
          if(this.state=='0'){
            myChartSalesman.setOption(optionSalesman,true);
            // console.log( 9 )
          }else{
            myChartUnit.setOption(optionUnit,true);
            // console.log( 9 )
          }
        },750)
      },
      statisticalGraph(){//渲染象限图
        let that = this
        let myChart = this.$echarts.init(document.getElementById('exerciseCartogram'));
        myChart.off('click')
        myChart.on('click',params => {//圆心点击事件
          this.tabShow = false
          this.titleText = params.data.name
          // console.log(params.data.name + ' ' + params.data.value)
          for(let q in this.rectangleList){
            if(this.rectangleList[q].unit==params.data.name){
              setTimeout(()=>{
                this.starGraphShow = true
              },700)
              this.starGraphActionShow = true
              this.ajaxJson({
                url: '/Insurance/graphicsRadar',
                loading:'0',
                data: {
                  id: this.rectangleList[q].unitID,
                  startDate:this.startDate + this.start,//开始时间
                  endDate:this.endDate + this.finish,//结束时间
                },
                call: (datas) => {
                  let rankList = datas.yearList.concat()//排序
                  this.starGraphEvent(datas,rankList)
                }
              })
            }
          }
        })
        myChart.getZr().on('click',params => {//区域点击事件
          this.quadrant = ''
          if(params.offsetY<296&&params.offsetX>646){//明星类
            this.quadrant = 0
          }else if(params.offsetY<296&&params.offsetX>70){//问题类
            this.quadrant = 1
          }else if(params.offsetY>296&&params.offsetX<646){//瘦狗类
            this.quadrant = 2
          }else if(params.offsetY>296&&params.offsetX>646){//金牛类
            this.quadrant = 3
          }
          for(let i in this.tabState){//用户点击哪个区域就默选点击区域的列表
            if(i==this.quadrant){
              this.tabState[this.quadrant].select = true
            }else{
              this.tabState[i].select = false
            }
          }

          this.tabShow = true
          this.pager.pageIndex = 1
        })
        // 中心线
        let  centerLine = [
            {
              name: 'x', xAxis: this.averageX
            },
            {
              name: 'y', yAxis: this.averageY
            }
          ]
          // 中心点
        let  centerMark = [
            {
              value: '中心点', coord: [this.averageX, this.averageY]
            }
          ]

        let  option = {
          tooltip: {
            axisPointer: {
              show: true,
              type: 'cross',
              lineStyle: {
                type: 'dashed',
                width: 1
              },
              label: {
                backgroundColor: '#555'
              }
            },
            formatter(params){
              let custom = params.name + '</br>' + '业务推送量: ' + params.value[1] + '</br>' + '保险单利润额: ' + params.value[0]
              // console.log( params )
              return custom
            }
          },
        legend: {
          right:0,
          top:10,
          data: ['瘦狗类', '问题类', '金牛类', '明星类']
        },
          grid: {
            left: 50,
            right: 50,
            bottom: '4%',
            top: '6%',
            containLabel: true
          },
          xAxis: {
            // name:'利润',
            scale: true,
            axisLine: {
              lineStyle: {
                color: '#ddd'
              }
            },
            axisLabel: {
              color: '#666'
            },
            splitLine: {
              lineStyle: {
                color: '#eee'
              }
            }
          },
          yAxis: {
            // name:'出单量',
            scale: true,
            axisLine: {
              lineStyle: {
                color: '#ddd'
              }
            },
            axisLabel: {
              color: '#666'
            },
            splitLine: {
              lineStyle: {
                color: '#eee'
              }
            }
          },
        // visualMap: {
        //   top: 10,
        //   right: 10,
        //   pieces: [{
        //     gt: 0,
        //     lte: 50,
        //     color: '#096'
        //   }, {
        //     gt: 50,
        //     lte: 100,
        //     color: '#ffde33'
        //   }, {
        //     gt: 100,
        //     lte: 150,
        //     color: '#ff9933'
        //   }, {
        //     gt: 150,
        //     lte: 200,
        //     color: '#cc0033'
        //   }],
        //   outOfRange: {
        //     color: '#999'
        //   }
        // },
          series: [{
            type: 'scatter',
            data: this.marksData,
            symbolSize:'26',
            label: {
              show: true,
              position: 'bottom',
              formatter: '{b}'
            },
            symbol:function(value,params){
              let imgUrl = 'image://' + window.location.origin + '/UploadFile/' + 'LeftMenu/'
              let tacitlyApproveImg = 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAADuUlEQVRoQ+3ZWah1YxgH8N8XLiiSORQyzySRMhNlVvpMyZzhioxRKJlvXEiGUChDZkIUIdOVIWQmuTBeoFBC/3qXVufbe6+1h7X3PvmeOp199nrf5/n/3+ddz3SWWOSyZJHjt5zArD34v/XAJthogqf/Nb4cRd8wHjgV+2MPbDyKsYY9X+F1vIQ72+pvS+AJHF5T+hG+a2ukxbp1sXVt3cvF3q9Ne9sQ+Kco+RwX4hX81KR4hOdrYi/ciE3L/g3x7SBdTQSuxBW4Cvk8LYnN2HsHO49K4ATch7ew+7SQ1+y8id1wAy7uZ3+QBx7CMTgMT8+AwKF4Ch9jq1EIfIPcwXXwwwwIrI3vi91V8HsvDP08sBk+LT9bzAB8ZfITbI4d8d4wBPYp8TjhbN8GArtie6yIL/DiBAknJwRLMATLMtLPA20JVFGqrvh5HDwhEp0S2AHvlpO5vwBO5Ar5E1F9Nw6XTgmcg1twHS4tKK/FJbgXJ42DvOztlMCZuA1n1GqX03EHHsdR807gALxQrlCSTiQJL1doUpm7Uw8E8HM4aIjgMKxTOicQQHlxj8AKeH/CNdNUCAx7qsOsnysCq5eXPeXJUqQLa5K5IZByIF1W6v3IazgEvzQwmAsCaUFvx7ZItFoLqbXS5R05DwRSThyIC/DGAkABeCvWwyM4rxBI9EqVexdOG0Cicw/Uw2jazLPxcAEUYAG/Em7G+fi7PNsbz2Jl3FRa1V48OiOwGl5F6qG38Sf2LAgCNKCvL3+nm0pXtVDSKD1ZvrwM1/RY0wmB/Uqtsz6ewbn4A6mDTqmB+A1nNRR1KfpSN0VSW8VjdZk4gWTdtHk54XvKlQn4SvIeZKqQRiTgA6BJqqIw647DA7UNEydwMu4uIC/qgyxDr4THn5uQ156ngo0HFzZQEyewKnbp1x0NAbjX0p1KR1fPDSMTyOwz7WEmcNuMCWyc7R+WiV1ySD4vI4PGKhm25jok8XQxiWsilkndj2VRwm39Xftv7yACaQmPx9F4rMlaB8/TED2KD7BdP/2DCFTdVWaiSf3Tls/KjDShNZGqpzTNRquXKOVCuqxpSTXtyAudkiOJciQCiTpVVMiM9OoyK+1iUpdJXGahl5ffAXwsHhx0ak0eyN4Nymw0Ya6STO0Gjr2HdFVspOSuJP97SJeXQxsobQhUClLbROmWTUrHeJ5BbgbJSWx/tdEzDIFKX0JaTmuNNgZarknWjld7DnDHvUItMcxm2SgemA3SEaPQXIHtBWa5B2btokXvgX8B/fjlMVOLXqgAAAAASUVORK5CYII='
              // console.log( that.state )
              if(that.rectangleList.length!=0&&that.state==1){//不为空并且是保险公司时
                for(let i in that.rectangleList){
                  if(params.name==that.rectangleList[i].unit){//渲染的数据跟数组中的一样时  拿去数组中的图片路径 拼接作为头像
                    if(that.rectangleList[i].login!=''){//图片路径不为空时 拼接
                      imgUrl = imgUrl + that.rectangleList[i].login
                    }else{//为空时则使用默认图片
                      return tacitlyApproveImg
                    }
                  }
                }
              }else{
                return tacitlyApproveImg
              }

              // console.log( imgUrl )
              return imgUrl
            },
            itemStyle: {
              shadowBlur: 2,
              shadowColor: 'rgba(120, 36, 50, 0.5)',
              shadowOffsetY: 1,

              color: function (e) {
                let randomColor = 'rgba(' + Math.floor(Math.random() * 240) + ',' + Math.floor(Math.random() * 240) + ',' + Math.floor(Math.random() * 240) + ',' + '.8' + ')'
                return randomColor.substring()
              },
              // symbolSize: function (dataItem) {
              //   console.log( dataItem,'==========' )
              //   return 20;
              // }
            },
            // 各象限区域
            markArea: {
              silent: true,
              data: [
                // 第一象限
                [{
                  name: '明星类',
                  xAxis: this.averageX, // x 轴开始位置
                  yAxis: this.rangeY[1], // y 轴结束位置(直接取最大值)
                  itemStyle: {
                    color: this.category=='0'?'rgba(56, 180, 139, .1)':'rgba(251, 212, 133 , .1)'
                  },
                  label: {
                    position: 'inside',
                    color: 'rgba(0, 0, 0, .1)',
                    fontSize: 22,
                  }
                }, {
                  yAxis:this.averageY // y轴开始位置
                }],
                // 第二象限
                [{
                  name: '问题类',
                  yAxis: this.rangeY[1], // y 轴结束位置(直接取最大值)
                  itemStyle: {
                    color: this.category=='0'?'rgba(68, 97, 123, .1)':'rgba(121, 255, 211 , .1)'
                  },
                  label: {
                    position: 'inside',
                    color: 'rgba(0, 0, 0, .1)',
                    fontSize: 22
                  }
                }, {
                  xAxis:this.averageX, // x 轴结束位置
                  yAxis:this.averageY // y轴开始位置
                }],
                // 第三象限
                [{
                  name: '瘦狗类',
                  yAxis: this.averageY, // y 轴结束位置
                  itemStyle: {
                    color: this.category=='0'?'rgba(191, 120, 58, .1)' :'rgba(228, 171, 199 , .1)'
                  },
                  label: {
                    position: 'inside',
                    color: 'rgba(0, 0, 0, .1)',
                    fontSize: 22
                  }
                }, {
                  xAxis:this.averageX, // x 轴结束位置
                  yAxis:this.rangeY[0] // y轴开始位置
                }],
                // 第四象限
                [{
                  name: '金牛类',
                  xAxis:this.averageX, // x 轴开始位置
                  yAxis:this.averageY, // y 轴结束位置
                  itemStyle: {
                    color: this.category=='0'?'rgba(116, 83, 153, .1)' :'rgba(105, 81, 164 , .1)'
                  },
                  label: {
                    position: 'inside',
                    color: 'rgba(0, 0, 0, .1)',
                    fontSize: 22
                  }
                }, {
                  yAxis:this.rangeY[0] // y轴开始位置
                }]
              ]
            },
            // 中心点交集象限轴
            markLine: {
              silent: true, // 是否不响应鼠标事件
              precision: 2, // 精度
              lineStyle: {
                type: 'solid',
                color: '#00aca6'
              },
              label: {
                color: '#00aca6',
                position: 'end',
                formatter: '{b}'
              },
              data: centerLine
            },
            // 中心点
            markPoint: {
              symbol: 'roundRect',
              symbolSize: 15,
              itemStyle: {
                color: 'rgba(234, 85, 6, .8)'
              },
              label: {
                position: 'top'
              },
              data: centerMark
            }
          }]
        }
        myChart.setOption(option,true);
        try {
          //获取Y轴的刻度范围
          var rangeY = myChart.getModel().getComponent('yAxis').axis.scale._extent;
          //获取X轴的刻度范围
          var rangeX = myChart.getModel().getComponent('xAxis').axis.scale._extent;
          this.rangeY = rangeY
          this.rangeX = rangeX
          this.averageY = (rangeY[1]-rangeY[0])/2 + rangeY[0]
          this.averageX = (rangeX[1]-rangeX[0])/2 + rangeX[0]
        }catch (e) {}

      },
      initPage(){
        this.ajaxJson({
          url: '/Insurance/initGraphicsRadaForm',
          data: {
            state:this.state,//0是业务员1是公司
            category:this.category,//0是出单量1是推送量
            salesmanID:this.salesmanID,//业务员id
            insuredUnit:this.insuredUnit,//保险公司ID
            startDate:this.startDate + this.start,//开始时间
            endDate:this.endDate + this.finish,//结束时间
          },
          call: (data) => {
            sessionStorage.setItem("ceshi", JSON.stringify(data));
            this.rectangleList = data.unitClassification
            this.marksData = []
            let list = []
            let arr = data.unitClassification
            for(let i=0; i<arr.length; i++){
              list = []
              list[0] = arr[i].money
              list[1] = arr[i].mete
              // this.xAxis = arr[i].mete
              // this.yAxis = arr[i].money
              this.marksData.push({
                'name':arr[i].unit,
                'value':list
              })

            }
            setTimeout(()=>{
              this.statisticalGraph()
            },0)
            setTimeout(()=>{
              this.statisticalGraph()
            },200)
          }
        })
      },
    },
    watch:{
      // quadrant(newValue,value){
      //   this.tabBtnClick(this.quadrant)
      // },
      tabShow(newValue){
        if(newValue){
          this.tabBtnClick(this.quadrant)
        }

      }
    },
    created () {
      this.setQuery2Value('state')
      this.typeList.value = this.state
      this.initPage()

      this.$nextTick(()=>{

      })
    }
  }
</script>

<style lang="less" scoped>
  .exerciseCartogram{
    width: 95%;
    display: flex;
    border-radius:0 0 10px 10px;
    margin-top: 30px;
    margin: auto;
    justify-content: center;
    height: 600px;
    background-color: #FFFFFF;
  }
  .exerciseTab{
    position: absolute;
    width: 96%;
    height: 95%;
    top: -130%;
    left:50%;
    transform:translateX(-50%);
    transition: all 0.7s;
  }
  .exerciseImg{
    position: absolute;
    right: 0;
  }
  .cartogramTop{
    width:1190px;
    margin: auto;
    padding: 40px 0;
    margin-bottom: 42px;
    /*position: relative;*/
    /*z-index:2;*/
  }
  .customTimeHide{
    width: 100%;
    height: 0px;
    display: flex;
    margin-top: 20px;
    /*overflow: hidden;*/
    transition: all 0.5s;
  }
  .customTimeShow{
    width: 100%;
    height: 50px;
    position: relative;
    z-index: 2;
    display: flex;
    margin-top: 20px;
    /*overflow: hidden;*/
    transition: all 0.5s;
  }
  .starGraphRight{
    width: 50%;
    height: 100%;
    position: fixed;
    top: 0;
    right: 0;
    background: #fff;
    transition: all 0.7s;
    z-index: 4;
  }
  .starGraphRightHide{
    width: 50%;
    height: 100%;
    position: fixed;
    top: 0;
    right: -70%;
    transition: all 1s;
    z-index: 4;
  }
  .starGraphLeft{
    width: 50%;
    height: 100%;
    position: fixed;
    top: 0;
    left:0;
    background: #fff;
    transition: all 0.7s;
    z-index: 4;
  }
  .starGraphLeftHide{
    width: 50%;
    height: 100%;
    position: fixed;
    top: 0;
    left: -70%;
    transition: all 1s;
    z-index: 4;
  }
  .bottomBtn{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 80px;
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 1s;
  }
  .bottomBtnShow{
    position: fixed;
    bottom: -200px;
    left: 0;
    z-index: 10;
    transition: all 1s;
  }
  .btn{
    position: absolute;
    top: 14px;
    left: 40px;
    z-index: 99;
  }
  .yAxisName,.xAxisName{
    position: fixed;
    z-index: 3;
    color: #666;
  }
  .yAxisName{
    top: 80px;
    left: 112px;
  }
  .xAxisName{
    bottom: 100px;
    right: 30px;
  }
  .starGraphShow{
    transform: translateX(-50%);
    left:50%;
    transition: all 1s;
    padding-top: 35px;
    width: 97%;
    height: 95%;
    background: #fff;
    position: fixed;
    top: 0;
    z-index: 5;

  }
</style>
