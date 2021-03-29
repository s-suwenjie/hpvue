<template>
  <div>
    <div class="top">
      <yhm-radiofilterdate title="时间" :year-txts="yearTxts" :custom-time="customTime" style="margin: 10px auto;" :edit="editShow" @initData="selectMonthEvent"></yhm-radiofilterdate>
<!--      <yhm-commonbutton value="置空筛选字段"  v-show="screenShow" :flicker="true" @call="buttonClick" icon="" class="btn"></yhm-commonbutton>-->
<!--      <yhm-commonbutton value="恢复筛选字段"  v-show="!screenShow" :flicker="true" @call="buttonClick" icon="" class="btn"></yhm-commonbutton>-->

      <div class="total" v-show="totalShow">
        <div class="flex">
          <div class="topMoeny"  style="color: #FF0000">
            <span >最大金额:</span>
            <span v-html="segmentation"></span>
          </div>
          <span style="color: black;">  日期:  {{dateMax}}</span>
        </div>
        <div class="flex">
          <div class="topMoeny"  style="color: #49a9ea">
            <span >最小金额:</span>
            <span v-html="segmentations"></span>
          </div>
          <span style="color: black;">  日期:  {{dateMin}}</span>
        </div>
        <div class=" posit">
          <div class=""  :style="{color:colors}">
            <span style="font-weight: bold">合计: </span>
            <span v-html="totalMoney"></span>
            <span v-if="month!=13" style="color: #7EE07E;margin-left: 5px;"> 目标: </span>
            <span v-html="tenThousand(targetlist[0])" style="color: #7EE07E;" v-if="month!=13"></span>

            <span v-if="month!=13" style="color: #F26A5D;margin-left: 5px;"> 完成度: </span>
            <span v-html="tenThousand(completionlist[0])" style="color: #F26A5D;" v-if="month!=13"></span>
          </div>
        </div>
      </div>
      <div class="total" v-show="!totalShow">
        <p style="color: #FF0000">暂无数据</p>
        <p style="color: #49a9ea">暂无数据</p>
      </div>
    </div>
    <div id="insuranceCartogram" class="insuranceCartogram"></div>
    <div style="width: 100%;height: 24px;"></div>
<!--    <yhm-form-td-textbox value="111"   min-value="0" max-value="100" placeholder="最大金额不能大于100"  :list="invoiceDetails" listid="invoiceDetails"></yhm-form-td-textbox>-->


  </div>
</template>

<script>
  import { formmixin } from '@/assets/form.js'
  import { formatDate,getDayNumByYearMonth,tenThousandFormatHtml } from '@/assets/common.js'
  export default {
    name: 'allMaintenanceCartogram.vue',
    mixins: [formmixin],
    data(){
      return{
        year:'',//年份
        month:'',//月份
        colors:'#fd6802',//----合计颜色---
        customTime:'',
        yearTxts:'',
        day:[],
        money:[],
        money1:[],
        average:'0',//平均值
        sequence:true,//true的是从大到小序,false是从小到大排序
        moneyList:[],//用来排序的数组
        backupsList:[],//用来备份排序前的数据
        formatterMax:'',//最大值的提示信息
        formatterMin:'',//最小值的提示信息
        editShow:false,

        // workDateList:[],
        // legendList:[],
        title:'',
        moneyMin:'0',
        moneyMax:'1',
        dateMin:'',
        dateMax:'',
        totalShow:true,
        screenList:[],
        screenShow:true,
        type:'',
        genre:'bar',//统计图种类
        bankID:'',
        unitID:'',
        downloadTime:'',
        operatorID:'',
        vehicleBrand:'',
        unitOrPersonList:'',
        text:'',
        colorList:['#8e9eab','#eeef20','#00f5d4','#C4E0E5','#00bbf9','#ffd194', '#90e0ef','#9b5de5','#f3ffbd','#70d6ff','#deaaff','#f7d9c4'],//颜色数组
        num:0,

        MoneyOne:0,

        targetlist:[],
        completionlist:[],
      }
    },
    computed:{
      segmentation(){
        return tenThousandFormatHtml(this.moneyMax+'')
      },
      segmentations(){
        if(!this.moneyMin){
          this.moneyMin = '0'
        }
        return tenThousandFormatHtml(this.moneyMin+'')
      },
      totalMoney(){

        // console.log(this.moneyList)
        let num = 0
        //let moneyList = this.moneyList//.concat()
        // console.log(this.moneyList.concat())


        // if(this.num==0){
        //   for(let i in this.moneyList){
        //     this.moneyList[i].totalMoney =  (Number(this.moneyList[i].money)+Number(this.moneyList[i].money1)).toFixed(2)
        //
        //   }
        // }

        // console.log(this.moneyList)
        for(let v in this.moneyList){
          if(this.moneyList[v].totalMoney!=0){
            num+=Number(this.moneyList[v].totalMoney)
            // console.log(typeof num)
            // console.log(Number(moneyList[v].totalMoney).toFixed(2))
          }
        }
        this.num++

        return "  ¥"+tenThousandFormatHtml(num.toFixed(2)+'')
      },
      tenThousand(){
        return function (e) {
          // console.log(e)
          // console.log(" ¥"+tenThousandFormatHtml(e+''))
          return " ¥"+tenThousandFormatHtml(e+'')
        }
      }
    },
    methods: {
      // buttonClick(){
      //   if(this.screenShow==true){
      //     this.scrennings(1)
      //   }else{
      //     this.scrennings()
      //   }
      //   this.screenShow = !this.screenShow
      //   this.initPageData(false)
      // },
      scrennings(type){
        if(type!=1){
          this.screenList = JSON.parse(sessionStorage.cartogramScreen)[0]
          this.type = this.screenList.type
          this.bankID = this.screenList.bankID
          this.unitID = this.screenList.unitID
          this.operatorID = this.screenList.operatorID
          this.vehicleBrand = this.screenList.vehicleBrand
          this.unitOrPersonList = this.screenList.unitOrPerson
        }else{
          this.type = ''
          this.bankID = ''
          this.unitID = ''
          this.operatorID = ''
          this.vehicleBrand = ''
          this.unitOrPersonList = ''
        }

      },
      selectMonthEvent(data,item){
        this.day = []
        this.money = []
        this.money1=[]
        this.moneyList = []
        if(this.year == data.slice(0,4)){
          if(this.month !== data.slice(5,7)){
            this.year = data.slice(0,4)
            this.month = data.slice(5,7)
          }
        }
        // console.log(this.month)
        if(data.slice(5,7)=='13'){//用户选取整年
          this.year = data.slice(0,4)
          this.month = '13'
        }
        setTimeout(()=>{
          this.initPageData()
        },0)
      },
      rank(type){//排序
        let that = this
        let list = []
        // console.log(type)
        if(type==2){
          if(that.sequence==true){
            list = that.moneyList.sort((a, b) => {return b.money - a.money });/* 从大到小 */
            that.sequence = false
          }else{
            list = that.moneyList.sort((a, b) => {return a.money - b.money });/* 从小到大 */
            that.sequence = true
          }
        }else{
          list = this.moneyList
        }

        // console.log(list)


        that.day = []
        that.money = []
        that.completionlist=[]
        that.targetlist=[]
        if(that.month!='13'){//不是整年时
          that.title = that.year + '年' + that.month + '月'
          for (let i = 0; i < list.length; i++) {
            that.day.push(list[i].day)
            that.money.push(list[i].money)
            that.targetlist.push(list[i].target)
            that.completionlist.push(list[i].completion)
          }
          // console.log(that.day)
          // console.log(that.money)

        }else{//整年时
          that.title = that.year + '年'
          for (let i = 0; i < list.length; i++) {
            that.day.push(that.year + '年' + list[i].day + '月')
            that.money.push(list[i].money)
            that.targetlist.push(list[i].target)
            that.completionlist.push(list[i].completion)
          }
        }
      },
      ranks(){

        let that = this

        let list = []
        if(that.sequence==true){
          list = that.moneyList.sort((a, b) => {return b.money1 - a.money1 });/* 从大到小 */
          that.sequence = false

        }else{
          list = that.moneyList.sort((a, b) => {return a.money1 - b.money1 });/* 从小到大 */
          that.sequence = true
        }

        // console.log( list )
        that.day = []
        that.money1 = []
        that.completionlist=[]
        that.targetlist=[]


        if(that.month!='13'){//不是整年时
          that.title = that.year + '年' + that.month + '月'
          for (let i = 0; i < list.length; i++) {
            that.day.push(list[i].day)
            that.money1.push(list[i].money1)
            that.targetlist.push(list[i].target)
            that.completionlist.push(list[i].completion)
          }
          // console.log(that.day)
          // console.log(that.money)

        }else{//整年时
          that.title = that.year + '年'
          for (let i = 0; i < list.length; i++) {
            that.day.push(that.year + '年' + list[i].day + '月')
            that.money1.push(list[i].money1)
            that.targetlist.push(list[i].target)
            that.completionlist.push(list[i].completion)
          }
        }

      },
      rankss(){

        let that = this

        let list = []

        if(that.sequence==true){
          list = that.moneyList.sort((a, b) => {return b.totalMoney - a.totalMoney });/* 从大到小 */
          that.sequence = false

        }else{
          list = that.moneyList.sort((a, b) => {return a.totalMoney - b.totalMoney });/* 从小到大 */
          that.sequence = true
        }

        // console.log( list )
        that.day = []
        that.money1 = []
        that.money = []
        that.completionlist=[]
        that.targetlist=[]

        if(that.month!='13'){//不是整年时
          that.title = that.year + '年' + that.month + '月'
          for (let i = 0; i < list.length; i++) {
            that.day.push(list[i].day)
            that.money1.push(list[i].money1)
            that.money.push(list[i].money)
            that.targetlist.push(list[i].target)
            that.completionlist.push(list[i].completion)
          }
          // console.log(that.day)
          // console.log(that.money)

        }else{//整年时
          that.title = that.year + '年'
          for (let i = 0; i < list.length; i++) {
            that.day.push(that.year + '年' + list[i].day + '月')
            that.money1.push(list[i].money1)
            that.money.push(list[i].money)
            that.targetlist.push(list[i].target)
            that.completionlist.push(list[i].completion)
          }
        }

      },
      renderData(myChart){//重新渲染统计图
        let that = this
        myChart.setOption({
          title: {
            text: that.title,
          },
          xAxis: {
            data: that.day
          },
          yAxis: {
            data: that.money
          },
          series: [
            {
              stack: 'one',
              name: '保险理赔',
              type:that.genre,
              data: that.money,
              barWidth:'20',
              markLine : {
                label: {
                  normal: {
                    position: 'middle',//'start''middle''end'
                    formatter: '平均值: ' + that.average
                  }
                },
                data : [
                  {type : 'average', name: '平均值',yAxis:that.average }
                ]
              },
            },
            {
              stack: 'one',
              name: '自费维修',
              type:that.genre,
              data: that.money1,
              barWidth:'20',
              markLine : {
                label: {
                  normal: {
                    position: 'middle',//'start''middle''end'
                    formatter: '平均值: ' + that.average
                  }
                },
                data : [
                  {type : 'average', name: '平均值',yAxis:that.average }
                ]
              },
            },
          ]
        });
      },
      drawChart () {
        let that = this
        //，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById("insuranceCartogram"));
        // 指定图表的配置项和数据
        let option = {
          // color: ['#3398DB'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            },
            formatter(params){
              let day = params[0].axisValue.indexOf('年')==-1?that.title +params[0].axisValue+'日':params[0].axisValue
              let label = '日期 ' +  day
              let main = ''

              if(params.length=='2'){
                if(that.month=='13'){
                  main = label
                    +'</br>' + params[0].seriesName+': '+tenThousandFormatHtml(params[0].data+'')
                    +'</br>' + params[1].seriesName+': '+tenThousandFormatHtml(params[1].data+'')
                    +'</br>' + '总计金额:' +' '+ tenThousandFormatHtml((Number(params[0].data)+Number(params[1].data)).toFixed(2))
                    +'</br>' + '目标:' +' '+ tenThousandFormatHtml(that.targetlist[params[0].dataIndex]+'')
                    +'</br>' + '完成度:' +' '+ tenThousandFormatHtml(that.completionlist[params[0].dataIndex]+'')
                }else{
                  main = label
                    +'</br>' + params[0].seriesName+': '+tenThousandFormatHtml(params[0].data+'')
                    +'</br>' + params[1].seriesName+': '+tenThousandFormatHtml(params[1].data+'')
                    +'</br>' + '总计金额:' +' '+ tenThousandFormatHtml((Number(params[0].data)+Number(params[1].data)).toFixed(2))
                }
                // console.log('00')


              }else if(params.length=='1'){

                main = label+'</br>' + params[0].seriesName+': '+tenThousandFormatHtml(params[0].data+'')
              }


              return main
            }
          },

          color:['#74ebd5','#ACB6E5'],
          legend: {
            data: ['保险理赔', '自费维修'],
            left: 130,
            top: 20,
          },
          title: {
            text: that.title,
            x:420,
            y:20,
          },
          toolbox: {
            padding: 20,
            show: true,
            x:1010,
            y:2,
            feature: {
              // dataView: {show: true, readOnly: true},
              mark: { show: true, },
              // magicType: { show: true, type: ['bar','line'] },
              // restore : {show: true},
              myTool1: {//自定义按钮 danielinbiti,这里增加，selfbuttons可以随便取名字
                show: true,//是否显示
                title: '切换为柱状图', //鼠标移动上去显示的文字
                // icon: 'M7.31,8.88H7.22a.52.52,0,0,1-.39-.34l-2.19-7L.89,6.14a.51.51,0,0,1-.71.08.52.52,0,0,1-.07-.71L4.46.18A.51.51,0,0,1,4.94,0a.47.47,0,0,1,.38.34l2.18,7L10.24,3.8a.48.48,0,0,1,.46-.19.49.49,0,0,1,.39.29l1.2,2.74h2.15a.5.5,0,0,1,.5.5.5.5,0,0,1-.5.5H12a.48.48,0,0,1-.45-.3l-1-2.26-2.8,3.6A.51.51,0,0,1,7.31,8.88Z', //图标
                icon: 'M10.5,13h3V0h-3V13ZM11,.5h2v12H11Z'+ 'M5.5,13h3V3h-3V13ZM6,3.5H8v9H6Z'+ 'M.5,13h3V6H.5v7ZM1,6.5H3v6H1Z',
                onclick () {//点击事件,这里的option1是chart的option信息
                  that.genre='bar'
                  that.renderData(myChart)//重新渲染
                }
              },
              myTool:{
                show: true,//是否显示
                title: '切换为折线图', //鼠标移动上去显示的文字
                icon: 'M14.19,6.64H11.88L10.61,3.75a.23.23,0,0,0-.2-.14.24.24,0,0,0-.22.09l-3,3.9L4.83.17A.27.27,0,0,0,4.64,0,.27.27,0,0,0,4.4.09L.06,5.42a.25.25,0,0,0,0,.35.25.25,0,0,0,.35,0l4.05-5L6.82,8.2a.25.25,0,0,0,.2.17h0a.26.26,0,0,0,.2-.1l3.06-3.94L11.48,7a.25.25,0,0,0,.23.15h2.48a.25.25,0,0,0,0-.5Z', //图标
                onclick () {
                  // if(that.genre=='bar'){
                  that.genre='line'
                  that.renderData(myChart)//重新渲染
                }
              },
              myTool2: {//自定义按钮 danielinbiti,这里增加，selfbuttons可以随便取名字
                show: true,//是否显示
                title: '排序', //鼠标移动上去显示的文字
                icon: 'path://M24.41,24.49l-2.86-2.83a.45.45,0,0,1,.31-.77h1.37l0-5.89a1.47,1.47,0,0,1,1.47-1.48h0A1.48,1.48,0,0,1,26.15,15l0,5.89h1.37a.45.45,0,0,1,.32.77L25,24.48A.44.44,0,0,1,24.41,24.49Z,' +
                  'M16.69,2H1.52A1.73,1.73,0,0,0,0,3.89,1.73,1.73,0,0,0,1.52,5.77H16.69A1.73,1.73,0,0,0,18.2,3.89,1.73,1.73,0,0,0,16.69,2Z' +
                  'M16.69,10.42H1.52A1.74,1.74,0,0,0,0,12.31a1.73,1.73,0,0,0,1.52,1.88H16.69a1.73,1.73,0,0,0,1.51-1.88A1.74,1.74,0,0,0,16.69,10.42Z' +
                  'M16.69,18.84H1.52A1.74,1.74,0,0,0,0,20.73a1.74,1.74,0,0,0,1.52,1.89H16.69a1.74,1.74,0,0,0,1.51-1.89A1.74,1.74,0,0,0,16.69,18.84Z' +
                  'M24.38.13,21.54,3a.45.45,0,0,0,.31.77h1.37V9.63A1.47,1.47,0,0,0,24.7,11.1h0a1.47,1.47,0,0,0,1.47-1.47V3.74h1.37A.45.45,0,0,0,27.86,3L25,.13A.45.45,0,0,0,24.38.13Z'
                , //图标
                onclick(){

                  //点击事件,这里的option1是chart的option信息

                  if(that.MoneyOne==0){
                    that.rankss()
                    // console.log('000000')

                  }else if(that.MoneyOne==1){
                    that.rank(2)
                    // console.log(111)
                  }else if(that.MoneyOne==2){
                    that.ranks()
                    // console.log( '2222' )
                  }

                  setTimeout(()=>{
                    that.renderData(myChart)//重新渲染
                  },0)
                }
              },
              myTool3: {//自定义按钮 danielinbiti,这里增加，selfbuttons可以随便取名字
                show: true,//是否显示
                title: '重置', //鼠标移动上去显示的文字
                icon: 'path://M9,18a9,9,0,1,1,9-9,9,9,0,0,1-9,9Z' +
                  'M11.85,12.71a5.14,5.14,0,0,1-2.65.8A4.77,4.77,0,0,1,4.34,8.77a4.23,4.23,0,0,1,.43-1.91l.07.43A.48.48,0,0,0,5.76,7L5.2,5.32A.49.49,0,0,0,4.59,5l-1.72.61a.51.51,0,0,0-.31.62.5.5,0,0,0,.61.3l.68-.18a5.85,5.85,0,0,0-.61,2.52,5.84,5.84,0,0,0,5.9,5.79,6,6,0,0,0,3.26-.93.59.59,0,0,0,.19-.74c-.19-.36-.49-.49-.74-.3Zm3.69-1.17a.45.45,0,0,0-.61-.25l-.56.25a5.53,5.53,0,0,0,.74-2.77A5.84,5.84,0,0,0,9.2,3,6.24,6.24,0,0,0,5.88,4a.59.59,0,0,0-.18.74.51.51,0,0,0,.74.12A5.17,5.17,0,0,1,9.14,4,4.76,4.76,0,0,1,14,8.77,4.5,4.5,0,0,1,13.45,11s0,.07-.06.07l-.19-.5a.47.47,0,0,0-.86.37L13,12.58a.45.45,0,0,0,.61.25l1.67-.68a.45.45,0,0,0,.24-.61Z', //图标
                onclick(){//点击事件,这里的option1是chart的option信息
                  that.moneyList = that.backupsList.concat()//深拷贝 还原排序前的数据
                  that.day = []
                  that.money = []
                  that.money1 = []
                  for (let i = 0; i < that.moneyList.length; i++) {
                    if(that.month==13){
                      that.day.push(that.title + that.moneyList[i].day + '月')
                    }else{
                      that.day.push( that.moneyList[i].day )
                    }
                    that.money.push(that.moneyList[i].money)
                    that.money1.push(that.moneyList[i].money1)
                  }
                  that.renderData(myChart)//重新渲染
                }
              },
              saveAsImage: { show: true, name:"全部维修收入" + that.downloadTime},
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              name: '日期',
              data: that.day,
              axisTick: {
                alignWithLabel: true
              },
              // axisLabel: {
              //   color: '#e54035'
              // }
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: '金额',
              data: that.money,
            }
          ],
          series: [
            {
              name: '保险理赔',
              type: that.genre,
              stack: 'one',
              data: that.money,
              barWidth:'20',
              markLine : {
                label: {
                  normal: {
                    position: 'middle',//'start''middle''end'
                    formatter: '平均值: ' + that.average
                  }
                },
                data : [
                  {type : 'average', name: '平均值',yAxis:that.average }
                ]
              },
              itemStyle: {
                //通常情况下：
                normal:{
                  //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                  color:'#74ebd5'
                },
                //鼠标悬停时：
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              },
            },
            {
              name: '自费维修',
              type: that.genre,
              stack: 'one',
              data: that.money1,
              barWidth:'20',
              markLine : {
                label: {
                  normal: {
                    position: 'middle',//'start''middle''end'
                    formatter: '平均值: ' + that.average
                  }
                },
                data : [
                  {type : 'average', name: '平均值',yAxis:that.average }
                ]
              },
              itemStyle: {
                //通常情况下：
                normal:{
                  //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                  color:'#ACB6E5'
                },
                //鼠标悬停时：
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              },

            },
          ]
        }

        myChart.on('legendselectchanged',function(params) {
          let num = 0
          let key = 0
          let minday=''
          let maxday=''
          let moneys=[]
          let month=''


          let maxmonth=''
          let minmonth=''


          let moneyList = that.moneyList//.concat()
          // console.log(params.selected)  　　　　//被选中的图例数组

          if(params.selected.自费维修 && params.selected.保险理赔 ){//同时被选中
            // console.log('1111111')
            that.MoneyOne=0
            for(let i in moneyList){
              moneyList[i].totalMoney =  (Number(moneyList[i].money)+Number(moneyList[i].money1)).toFixed(2)
              that.moneyList[i].totalMoney =  (Number(moneyList[i].money)+Number(moneyList[i].money1)).toFixed(2)

              if((Number(moneyList[i].money)+Number(moneyList[i].money1)).toFixed(2) != 0){
                  moneys.push((Number(moneyList[i].money)+Number(moneyList[i].money1)).toFixed(2))

              }
            }
            // that.moneyList = moneyList

            let total=[]
            total=that.moneyList
            that.moneyList=[]
            that.moneyList=total
            for(let v in moneyList){
              if(moneyList[v].totalMoney!=0){
                num+=Number(moneyList[v].totalMoney)
                key++
              }
            }

            if(key==0){
              that.average  = '0'
            }else{
              that.average  = (num/key).toFixed(2)
            }

            // console.log(that.average)
          }else if(params.selected.自费维修 && params.selected.保险理赔==false){
            // console.log('222222')

            that.MoneyOne=2
            for(let i in moneyList){

              moneyList[i].totalMoney =  Number(moneyList[i].money1).toFixed(2)
              that.moneyList[i].totalMoney =  Number(moneyList[i].money1).toFixed(2)

              // console.log(moneyList[i].totalMoney)

              if(Number(moneyList[i].money1).toFixed(2) != 0){

                moneys.push(Number(moneyList[i].money1).toFixed(2))

              }

            }

            let total=[]
            total=that.moneyList
            that.moneyList=[]
            that.moneyList=total
            // that.moneyList=[]
            // console.log(moneyList)
            // that.moneyList = moneyList
            // console.log(that.moneyList)

            // for(let v in moneyList){
            //   if(moneyList[v].totalMoney!=0){
            //     num+=Number(moneyList[v].totalMoney)
            //     key++
            //   }
            // }

            for(let v in moneyList){
              if(moneyList[v].money1 != 0){
                num+=Number(moneyList[v].totalMoney)
                key++
              }
            }

            if(key==0){
              that.average  = '0'
            }else{
              that.average  = (num/key).toFixed(2)


            }


          }else if(params.selected.保险理赔 && params.selected.自费维修==false){
            // console.log('3333333')

            that.MoneyOne=1

            for(let i in moneyList){
              moneyList[i].totalMoney =  Number(moneyList[i].money).toFixed(2)
              that.moneyList[i].totalMoney =  Number(moneyList[i].money).toFixed(2)
              if(Number(moneyList[i].money).toFixed(2) != 0){
                moneys.push(Number(moneyList[i].money).toFixed(2))

              }
            }

            let total=[]
            total=that.moneyList
            that.moneyList=[]
            that.moneyList=total

            // for(let v in moneyList){
            //   if(moneyList[v].totalMoney!=0){
            //     num+=Number(moneyList[v].totalMoney)
            //     key++
            //   }
            // }

            for(let v in moneyList){
              if(moneyList[v].money != 0){
                num+=Number(moneyList[v].totalMoney)
                key++
              }
            }

            if(key==0){
              that.average  = '0'
            }else{
              that.average  = (num/key).toFixed(2)

            }

          }else{
            // num=0

            that.moneyMax=0
            that.moneyMin=0
            that.dateMax=that.year+'年'
            that.dateMin=that.year+'年'

            that.average  = '0'

            for(let i in that.moneyList){
              // moneyList[i].totalMoney =  Number(moneyList[i].money).toFixed(2)
              that.moneyList[i].totalMoney =0
              // if((Number(moneyList[i].money)+Number(moneyList[i].money1)).toFixed(2) != 0){
              //   moneys.push(Number(moneyList[i].money).toFixed(2))
              //
              // }
            }



          }

          that.moneyMax=Math.max.apply(null,moneys)
          that.moneyMin=Math.min.apply(null,moneys)

          for(let i in moneyList){
            if(that.moneyMax==moneyList[i].totalMoney){
              maxday=moneyList[i].day
              maxmonth=moneyList[i].day

              if(maxmonth<10){
                maxmonth="0"+maxmonth
              }

              if(maxday<10){
                maxday='0'+maxday
              }
            }
            if(that.moneyMin==moneyList[i].totalMoney && !minday){
              minday=moneyList[i].day
              minmonth=moneyList[i].day

              if(minmonth<10){
                minmonth="0"+minmonth
              }

              if(minday<10){
                minday='0'+minday
              }
            }
          }

          if(that.month<13){
            if(that.month<10){
              month='0'+that.month
            }else{
              month=that.month
            }
            that.dateMax=that.year+'年'+month+'月'+maxday+'日'
            that.dateMin=that.year+'年'+month+'月'+minday+'日'
          }else {
            that.dateMax=that.year+'年'+maxmonth+'月'
            that.dateMin=that.year+'年'+minmonth+'月'
          }



          that.renderData(myChart)
          // console.log('111111')
        })
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      },
      elementCountInArray(arr) {//判断数组中某个值出现的次数
        let map = {};
        for (let index = 0; index < arr.length; index++) {
          let val = arr[index];
          if (!map[val]) {
            map[val] = 1
          } else {
            map[val]++;
          }
        }
        for (let k in map) {//k为数组中的某个值 map[k] 为当前值出现的次数
          if(k==0&&map[k]==this.money.length){
            this.moneyMin = ''
            this.totalShow = false

          }else{
            this.totalShow = true
          }
        }
      },
      initPageData(){
        // this.forTheMonth()
        let params = {
          year:this.year,
          month:this.month,
          type:'',
          bankID:this.bankID,
          unitID:this.unitID,
          operatorID:this.operatorID,
          vehicleBrand:this.vehicleBrand,
          unitOrPersonList:this.unitOrPersonList
        }
        this.ajaxJson({
          url: '/Fin/getBankDetailInsuranceStatistics',
          loading:"0",
          data: params,
          call: (data) => {
            this.moneyList = data
            this.moneyMax = ''
            this.moneyMin = ''
            this.dateMax = ''
            this.dateMin = ''
            this.backupsList = this.moneyList.concat()//将数据集合赋给备份的集合中 深拷贝

            let key=0
            let num=0

            for(let i in this.moneyList){
              this.moneyList[i].totalMoney =  (Number(this.moneyList[i].money)+Number(this.moneyList[i].money1)).toFixed(2)
              this.completionlist.push(data[i].completion)
              this.targetlist.push(data[i].target)
              if(this.moneyList[i].money+this.moneyList[i].money1 != 0){
                num+=Number(this.moneyList[i].totalMoney)
                key++
              }
            }

            if(key==0){
              this.average  = '0'
            }else{
              this.average  = (num/key).toFixed(2)

            }

            // console.log(this.backupsList)
            let money = []
            let day  = []
            let maxSchedule = ''
            let minSchedule = ''
            let moneyBackups = []
            // console.log(data)
            if(this.month!=='13'){
              for(let i in data){
                this.day.push(data[i].day)
                this.money.push(data[i].money)

                // if(data[i].money+data[i].money1 !=0 ){
                  // if(data[i].money!='0'){
                  money.push((data[i].money+data[i].money1))
                  day.push(data[i].day)
                  // }
                  // if(data[i].money1!='0'){
                  this.money1.push(data[i].money1)
                  // }
                // }

              }
              for(let i in money){
                if(money[i]>0){
                  moneyBackups.push(money[i].toFixed(2))
                }
              }
              maxSchedule = Math.max.apply(null,moneyBackups);//最大值
              minSchedule = Math.min.apply(null,moneyBackups);//最小值
              this.elementCountInArray(this.money)
              let month = ''
              let newDay,newDayMin
              for(let i in money){
                if(Number(money[i].toFixed(2))==maxSchedule){
                  newDay = day[i]
                }
                if(Number(money[i].toFixed(2))==minSchedule){
                  newDayMin = day[i]
                }
              }

              if(Number(this.month)<10){
                if(((this.month).toString()).indexOf('0')==-1){
                  month = '0'+this.month
                }else{
                  month = this.month
                }
              }
              if(Number(newDay)<10){//金额最大值的 日期
                if(((newDay).toString()).indexOf('0')==-1){
                  newDay = '0'+newDay
                }else{
                  newDay = newDay
                }
              }
              if(Number(newDayMin)<10){//金额最小值的 日期
                if(((newDayMin).toString()).indexOf('0')==-1){
                  newDayMin = '0'+newDayMin
                }else{
                  newDayMin = newDayMin
                }
              }
              this.dateMax = this.year + '年' + month + '月' + newDay + '日'
              this.dateMin = this.year + '年' + month + '月' + newDayMin + '日'


            }else{


              for(let i in data){
                this.day.push(this.year + '年' + data[i].day + '月')
                this.money.push(data[i].money)
                // if(data[i].money+data[i].money1 !='0'){
                  this.money1.push(data[i].money1)
                  money.push((data[i].money+data[i].money1))
                  day.push(data[i].day)
                // }
              }
              let moneyBackups = []
              for(let i in money){
                if(money[i]>0){
                  moneyBackups.push(Number(money[i].toFixed(2)))
                }
              }

              maxSchedule = Math.max.apply(null,moneyBackups);//最大值
              minSchedule = Math.min.apply(null,moneyBackups);//最小值
              this.elementCountInArray(this.money)
              let month = day[money.indexOf(Number(maxSchedule.toFixed(2)))]
              let monthMin = day[money.indexOf(Number(minSchedule.toFixed(2)))]
              if(Number(month)<10){//最大金额的月份
                if(((month).toString()).indexOf('0')==-1){
                  month = '0'+month
                }else{
                  month = month
                }
              }
              if(Number(monthMin)<10){//最小金额的月份
                if(((monthMin).toString()).indexOf('0')==-1){
                  monthMin = '0'+monthMin
                }else{
                  monthMin = monthMin
                }
              }
              this.dateMax = this.year + '年' + month+ '月'
              this.dateMin = this.year + '年' + monthMin + '月'
            }

            this.moneyMax = maxSchedule
            this.moneyMin = minSchedule
            this.rank()
            this.drawChart()//调用echarts实例

          }
        })
      }
    },
    created(){
      this.setQuery2Value('type')
      let nowDate = new Date();
      let newYear = nowDate.getFullYear();
      let newMonth = nowDate.getMonth() + 1;
      let newDay = nowDate.getDate();
      if(Number(newDay)<10){
        newDay = '0' + newDay
      }
      this.downloadTime = newYear + '年' + newMonth + '月' + newDay + '日'
      this.year = newYear
      this.month = newMonth
      this.initPageData()

    },
    mounted() {
      this.drawChart();
    }
  }

</script>

<style lang="less" scoped>
  .top{
    width: 1235px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    margin:auto;
    padding: 16px 5px 24px 5px;
    background: #fff;
    position: relative;
    z-index: 999;
    border-radius: 10px 10px 0;
    top: 24px;
    .topMoeny{
      width: 188px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      span{
        white-space: nowrap;  //强制不换行
      }
    }
    .total{
      width: 350px;
      border: 1px solid #bfbfbf;
      border-radius: 10px;
      background-color: #fff;
      padding: 10px;
    }
    p{
      font-size: 15px;
    }
    span{
      font-size: 15px;
      white-space: nowrap;  //强制不换行
      text-overflow:ellipsis; //省略号显示
    }
  }
  .flex{
    display: flex;
    justify-content: space-between;
    z-index: 10;
  }
  .insuranceCartogram{
    width: 95%;
    display: flex;
    justify-content: center;
    height: 600px;
    margin: auto;
    border-radius:0 0 10px 10px;
    margin-top: 12px;
    background-color: #FFFFFF;
    /*padding: 20px;*/
  }
  .btn{
    position: fixed;
    bottom: -4px;
    left: 50%;
    z-index: 10;
    transform: translate(-50%,-50%);
  }
  .posit {
    /*font-weight: bold;*/
    position: absolute;
    top: 112px;
    left: 540px;
  }
  .posit span{
    font-size: 16px;
  }
</style>
