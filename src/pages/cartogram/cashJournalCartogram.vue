<template>
    <div class="f_main" style="margin-bottom: 0;">

      <yhm-select-body :area-show="true" area-width="1235" :cancel-frame="true">
        <template #choose>
          <yhm-radiofilterdate title="时间" :edit="editShow" @initData="selectMonthEvent"></yhm-radiofilterdate>

          <yhm-radiofilter @initData="initData('unit')" title="单位" :content="unitTypeList"></yhm-radiofilter>
          <yhm-radiofilter v-show="webAccountTypeShow" @initData="initData('webAccountType')" title="网络账户" :content="webAccountTypeList"></yhm-radiofilter>
          <yhm-radiofilter @initData="initData('category')" title="账户类型" :content="categoryList"></yhm-radiofilter>
          <yhm-radiofilter v-show="bankShow" @initData="initData('bank')" title="银行" :content="bankList"></yhm-radiofilter>

          <div class="top">
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
            </div>
            <div class="total" v-show="!totalShow">
              <p style="color: #FF0000">暂无数据</p>
              <p style="color: #49a9ea">暂无数据</p>
            </div>

          </div>
          <div id="cashJournalCartogram" class="cashJournalCartogram"></div>

        </template>
      </yhm-select-body>
      <div class="bottom">
        <yhm-commonbutton value="切换至账户总余额统计图"  v-show="title=='净值'" :flicker="true" @call="buttonClick" icon="" class="btn"></yhm-commonbutton>
        <yhm-commonbutton value="切换至净值统计图"   v-show="title=='账户总余额'" :flicker="true" @call="buttonClick" icon="" class="btn"></yhm-commonbutton>

      </div>

      <!--统计图渲染标签 避坑 id具有唯一性 不允许当id与其他页面ID相同 否则不显示     -->
<!--        <div id="cashJournalCartograms" v-show="!show" class="cashJournalCartogram"></div>-->
      <div style="width: 100%;height: 24px;"></div>
    </div>
</template>

<script>
  import {tenThousandFormatHtml,formatDate} from '@/assets/common.js'
  import { selectmixin } from '@/assets/select.js'
  export default {
    name: 'cashJournalCartogram',
    mixins: [selectmixin],
    data(){
      return{
        maxYear: parseInt(formatDate(new Date()).substr(0, 4)),
        yearTxt: new Date().getFullYear() + '',
        year:'',//年份
        day:[],
        money:[],
        sequence:true,//true的是从大到小序,false是从小到大排序
        moneyList:[],//用来排序的数组
        backupsList:[],//用来备份排序前的数据
        formatterMax:'',//最大值的提示信息
        formatterMin:'',//最小值的提示信息
        editShow:false,
        // workDateList:[],
        // legendList:[],
        title:'账户总余额',
        moneyMin:'0',
        moneyMax:'1',
        dateMin:'',
        dateMax:'',
        totalShow:true,
        netWorth:[],
        categoryList:[],
        bankList:[],//银行筛选素材
        unitTypeList:[],//单位筛选素材
        webAccountTypeList:[],
        downloadTime:'',
        type:'bar',
        colorList:['#f15bb5','#eeef20','#00f5d4','#f15bb5','#00bbf9','#ffbf69', '#90e0ef','#9b5de5','#f3ffbd','#70d6ff','#deaaff','#f7d9c4'],//颜色数组
        show:true,
        bankShow:false,
        webAccountTypeShow:false
      }
    },
    computed:{
      segmentation(){
        return tenThousandFormatHtml(this.moneyMax+'')
      },
      segmentations(){
        return tenThousandFormatHtml(this.moneyMin+'')
      }
    },
    methods: {
      initData(){
        if(this.categoryList.value=='1'){
          this.bankShow = true
        }else{
          this.bankShow = false
        }
        if(this.categoryList.value=='2'){
          this.webAccountTypeShow = true
        }else{
          this.webAccountTypeShow = false
        }
        this.initPageData()

      },
      buttonClick(){
        this.show = !this.show

        if(this.show==false){
          this.drawCharts()
          this.title = '净值'
        }else{
          this.drawChart()
          this.title = '账户总余额'
        }
        this.initPageData()

      },
      selectYear(year){
        this.year = year
        if(this.month<10){
          this.month = '0' + this.month
        }
        this.initPageData()
      },
      selectMonthEvent(data,item){
        this.day = []
        this.money = []
        this.moneyList = []
        if(this.year == data.slice(0,4)){
          if(this.month !== data.slice(5,7)){
            this.year = data.slice(0,4)
            this.month = data.slice(5,7)
          }
        }
        if(data.slice(5,7)=='13'){//用户选取整年
          this.year = data.slice(0,4)
          this.month = '13'
        }
        setTimeout(()=>{
          if(this.month<10){
            this.month = '0' + this.month
          }
          this.initPageData()
        },0)
      },
      rank(type){//排序
        let that = this
        let list = []
        if(type==2){
          if(that.sequence==true){
            list = that.moneyList.sort((a, b) => {return b.balance - a.balance });/* 从大到小 */
            that.sequence = false
          }else{
            list = that.moneyList.sort((a, b) => {return a.balance - b.balance });/* 从小到大 */
            that.sequence = true
          }
        }else if(type==3){
          if(that.sequence==true){
            list = that.moneyList.sort((a, b) => {return b.netWorth - a.netWorth });/* 从大到小 */
            that.sequence = false
          }else{
            list = that.moneyList.sort((a, b) => {return a.netWorth - b.netWorth });/* 从小到大 */
            that.sequence = true
          }
        } else{
          list = this.moneyList
        }
        that.day = []
        that.money = []
        that.netWorth = []
        // that.title = that.year + '年'

        if(that.month!='13'){//不是整年时
          // that.title = that.year + '年' + that.month + '月'
          for (let i = 0; i < list.length; i++) {
            that.day.push(list[i].day)
            that.money.push(list[i].balance)
            that.netWorth.push(list[i].netWorth)
          }
        }else{//整年时
          // that.title = that.year + '年'
          for (let i = 0; i < list.length; i++) {
            that.day.push(that.year + '年' + list[i].day + '月')
            that.money.push(list[i].balance)
            that.netWorth.push(list[i].netWorth)
          }
        }
      },
      drawCharts(){
        let that = this
        // 基于准备好的dom，初始化echarts实例
        //避坑 id具有唯一性 不允许当id与其他页面ID相同
        let myChart = this.$echarts.init(document.getElementById('cashJournalCartogram'));


        // 指定图表的配置项和数据
        let option = {
          color: ['#3398DB'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          title: {
            text: '净值',
            x:560,
            y:20,
          },
          toolbox: {
            padding: 20,
            show: true,
            x: 888,
            y: 0,
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
              name: '净值',
              data: that.netWorth,
            },
          ],
          series: [
            {
              name:'净值',
              type:that.type,
              stack: '总量',
              data:that.netWorth,
              barWidth:20,
              itemStyle: {
                //通常情况下：
                normal:{
                  //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                  color: function (params){
                    let j = 0
                    let colorList = []
                    for(let i in that.money){
                      if(colorList.length%12==0==true){
                        j=0
                        colorList.push(that.colorList[j])
                      }else{
                        j++
                        colorList.push(that.colorList[j])
                      }
                    }
                    return colorList[params.dataIndex];
                  }
                },
                //鼠标悬停时：
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              },
              // markLine : {
              //   data : [
              //     {type : 'average', name: '平均值'}
              //   ]
              // }
            }

          ]
        }
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      },
      drawChart () {
        let that = this
        // 基于准备好的dom，初始化echarts实例
        //避坑 id具有唯一性 不允许当id与其他页面ID相同
        let myChart = this.$echarts.init(document.getElementById('cashJournalCartogram'));



        // 指定图表的配置项和数据
        let option = {
          color: ['#3398DB'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          // legend: {
          //   data:['账户总余额','净值'],
          // },
          title: {
            text: '账户总余额',
            x:560,
            y:20,
          },
          toolbox: {
            padding: 20,
            show: true,
            x:888,
            y:0,
            feature: {
              // dataView: {show: true, readOnly: true},
              mark: { show: true, },
              // magicType: { show: true, type: ['bar', 'line']},
              // restore : {show: true},

              myTool1: {//自定义按钮 danielinbiti,这里增加，selfbuttons可以随便取名字
                show: true,//是否显示
                title: '柱状图', //鼠标移动上去显示的文字
                // icon: 'M7.31,8.88H7.22a.52.52,0,0,1-.39-.34l-2.19-7L.89,6.14a.51.51,0,0,1-.71.08.52.52,0,0,1-.07-.71L4.46.18A.51.51,0,0,1,4.94,0a.47.47,0,0,1,.38.34l2.18,7L10.24,3.8a.48.48,0,0,1,.46-.19.49.49,0,0,1,.39.29l1.2,2.74h2.15a.5.5,0,0,1,.5.5.5.5,0,0,1-.5.5H12a.48.48,0,0,1-.45-.3l-1-2.26-2.8,3.6A.51.51,0,0,1,7.31,8.88Z', //图标
                icon: 'M10.5,13h3V0h-3V13ZM11,.5h2v12H11Z'+ 'M5.5,13h3V3h-3V13ZM6,3.5H8v9H6Z'+ 'M.5,13h3V6H.5v7ZM1,6.5H3v6H1Z',
                onclick () {//点击事件,这里的option1是chart的option信息
                  let arr = []
                  let name = ''
                  if(that.show==true){
                    that.rank()
                    arr = that.money
                    name = '账户总余额'
                  }else{
                    that.rank()
                    arr = that.netWorth
                    name = '净值'
                  }
                  that.type='bar'
                  myChart.setOption({//重新渲染数据
                    series: [
                      {
                        name:name,
                        type:that.type,
                        stack: '总量',
                        data:arr,
                        barWidth:20,
                        itemStyle: {
                          //通常情况下：
                          normal:{
                            //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                            color: function (params){
                              let j = 0
                              let colorList = []
                              for(let i in that.money){
                                if(colorList.length%12==0==true){
                                  j=0
                                  colorList.push(that.colorList[j])
                                }else{
                                  j++
                                  colorList.push(that.colorList[j])
                                }
                              }
                              return colorList[params.dataIndex];
                            }
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
                  })

                }
              },
              myTool:{
                show: true,//是否显示
                title: '折线图', //鼠标移动上去显示的文字
                icon: 'M14.19,6.64H11.88L10.61,3.75a.23.23,0,0,0-.2-.14.24.24,0,0,0-.22.09l-3,3.9L4.83.17A.27.27,0,0,0,4.64,0,.27.27,0,0,0,4.4.09L.06,5.42a.25.25,0,0,0,0,.35.25.25,0,0,0,.35,0l4.05-5L6.82,8.2a.25.25,0,0,0,.2.17h0a.26.26,0,0,0,.2-.1l3.06-3.94L11.48,7a.25.25,0,0,0,.23.15h2.48a.25.25,0,0,0,0-.5Z', //图标
                onclick () {
                  let arr = []
                  let name = ''
                  if(that.show==true){
                    that.rank()
                    arr = that.money
                    name = '账户总余额'
                  }else{
                    that.rank()
                    arr = that.netWorth
                    name = '净值'
                  }
                  that.type='line'
                  myChart.setOption({//重新渲染数据
                    series: [
                      {
                        name:name,
                        type:that.type,
                        stack: '总量',
                        data:arr,
                        barWidth:20,
                        itemStyle: {
                          //通常情况下：
                          normal:{
                            //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                            color: function (params){
                              let j = 0
                              let colorList = []
                              for(let i in that.money){
                                if(colorList.length%12==0==true){
                                  j=0
                                  colorList.push(that.colorList[j])
                                }else{
                                  j++
                                  colorList.push(that.colorList[j])
                                }
                              }
                              return colorList[params.dataIndex];
                            }
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
                  })
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
                onclick(){//点击事件,这里的option1是chart的option信息
                  let arr = []
                  let name = ''
                  setTimeout(()=>{
                    if(that.show==true){
                      that.rank(2)
                      arr = that.money
                      name = '账户总余额'
                    }else{
                      that.rank(3)
                      arr = that.netWorth
                      name = '净值'
                    }
                    myChart.setOption({
                      xAxis: {
                        data: that.day
                      },
                      yAxis: {
                        data: arr
                      },
                      series: [
                        {
                          name:name,
                          type:that.type,
                          stack: '总量',
                          data:arr,
                          barWidth:20,
                        },
                      ]
                    });
                  },0)
                  // myChart.setOption(option);
                }
              },
              myTool3: {//自定义按钮 danielinbiti,这里增加，selfbuttons可以随便取名字
                show: true,//是否显示
                title: '重置', //鼠标移动上去显示的文字
                icon: 'path://M9,18a9,9,0,1,1,9-9,9,9,0,0,1-9,9Z' +
                  'M11.85,12.71a5.14,5.14,0,0,1-2.65.8A4.77,4.77,0,0,1,4.34,8.77a4.23,4.23,0,0,1,.43-1.91l.07.43A.48.48,0,0,0,5.76,7L5.2,5.32A.49.49,0,0,0,4.59,5l-1.72.61a.51.51,0,0,0-.31.62.5.5,0,0,0,.61.3l.68-.18a5.85,5.85,0,0,0-.61,2.52,5.84,5.84,0,0,0,5.9,5.79,6,6,0,0,0,3.26-.93.59.59,0,0,0,.19-.74c-.19-.36-.49-.49-.74-.3Zm3.69-1.17a.45.45,0,0,0-.61-.25l-.56.25a5.53,5.53,0,0,0,.74-2.77A5.84,5.84,0,0,0,9.2,3,6.24,6.24,0,0,0,5.88,4a.59.59,0,0,0-.18.74.51.51,0,0,0,.74.12A5.17,5.17,0,0,1,9.14,4,4.76,4.76,0,0,1,14,8.77,4.5,4.5,0,0,1,13.45,11s0,.07-.06.07l-.19-.5a.47.47,0,0,0-.86.37L13,12.58a.45.45,0,0,0,.61.25l1.67-.68a.45.45,0,0,0,.24-.61Z', //图标
                onclick(){//点击事件,这里的option1是chart的option信息
                  let arr = []
                  let name = ''

                  that.moneyList = that.backupsList.concat()//深拷贝 还原排序前的数据
                  that.day = []
                  that.money = []
                  that.netWorth = []
                  for (let i = 0; i < that.moneyList.length; i++) {
                    that.day.push(that.moneyList[i].day)
                    that.money.push(that.moneyList[i].balance)
                    that.netWorth.push(that.moneyList[i].netWorth)
                  }
                  if(that.show==true){
                    that.rank()
                    arr = that.money
                    name = '账户总余额'
                  }else{
                    that.rank()
                    arr = that.netWorth
                    name = '净值'
                  }
                  myChart.setOption({//重新渲染数据
                    xAxis: {
                      data: that.day
                    },
                    yAxis: {
                      data: arr
                    },
                    series: [
                      {
                        name:name,
                        type:that.type,
                        stack: '总量',
                        data:arr,
                        barWidth:20,

                      },
                    ]
                  })
                }
              },
              saveAsImage: { show: true, name:that.title + " " + that.downloadTime},

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
            },
          ],
          visualMap: {
            type: 'continuous',
            dimension: 1,
            text: ['High', 'Low'],
            inverse: false,
            itemHeight: 550,
            calculable: true,
            precision:0,
            align:'left',
            min: -9999999,
            max: 9999999,
            top: 0,
            left: 0,
            inRange: {
              colorLightness: [0.4, 0.8]
            },
            outOfRange: {
              color: 'red'
            },
            controller: {
              inRange: {
                color: '#2f4554'
              }
            }
          },
          series: [
            {
              name:'账户总余额',
              type:that.type,
              stack: '总量',
              data:that.money,
              barWidth:20,
              itemStyle: {
                //通常情况下：
                normal:{
                  //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                  color: function (params){
                    let j = 0
                    let colorList = []
                    for(let i in that.money){
                      if(colorList.length%12==0==true){
                        j=0
                        colorList.push(that.colorList[j])
                      }else{
                        j++
                        colorList.push(that.colorList[j])
                      }
                    }
                    return colorList[params.dataIndex];
                  }
                },
                //鼠标悬停时：
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              },
              // markLine : {
              //   data : [
              //     {type : 'average', name: '平均值'}
              //   ]
              // }
            }

          ]
        }

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
        let params = {
          year:this.year,
          month:this.month,
          category:this.categoryList.value,
          bankID:this.bankList.value,
          unitType:this.unitTypeList.value,
          webAccountType:this.webAccountTypeList.value
        }
        this.ajaxJson({
          url: '/Fin/bankDetailBalanceStatistics',
          loading:"0",
          data: params,
          call: (data) => {
            this.moneyList = data.content
            this.categoryList = data.categoryList
            this.bankList = data.bankList
            this.unitTypeList = data.unitTypeList
            this.webAccountTypeList = data.webAccountTypeList
            this.moneyMax = ''
            this.moneyMin = ''
            this.dateMax = ''
            this.dateMin = ''
            this.backupsList = this.moneyList.concat()//将数据集合赋给备份的集合中 深拷贝
            let money = []
            let day  = []
            let maxSchedule = ''
            let minSchedule = ''
            for(let i in data.content){

              if(data.content[i].day<10){
                this.day.push('0'+data.content[i].day)
              }else{
                this.day.push(data.content[i].day)
              }
              this.money.push(data.content[i].balance)
              this.netWorth.push(data.content[i].netWorth)
              if(this.show==true){
                if(data.content[i].balance!='0'){
                  money.push(data.content[i].balance)
                  day.push(data.content[i].day)
                }
              }else{
                if(data.content[i].netWorth!='0'){
                  money.push(data.content[i].netWorth)
                  day.push(data.content[i].day)
                }
              }

            }
            setTimeout(()=>{
              if(this.month!=='13'){
                maxSchedule = Math.max.apply(null,money);//最大值
                minSchedule = Math.min.apply(null,money);//最小值
                this.elementCountInArray(this.money)
                this.dateMax = this.year + '年' + this.month + '月' + day[money.indexOf(maxSchedule+'')] + '日'
                this.dateMin = this.year + '年' + this.month + '月' + day[money.indexOf(minSchedule+'')] + '日'
              }else{
                maxSchedule = Math.max.apply(null,money);//最大值
                minSchedule = Math.min.apply(null,money);//最小值
                this.elementCountInArray(this.money)
                this.dateMax = this.year + '年' + day[money.indexOf(maxSchedule+'')]+ '月'
                this.dateMin = this.year + '年' + day[money.indexOf(minSchedule+'')] + '月'
              }
              this.moneyMax = maxSchedule
              this.moneyMin = minSchedule
              this.elementCountInArray(this.money)//判断数组中全部money字段是否为0

            },0)

            this.rank()
            //调用echarts实例
            if(this.show==false){
              this.drawCharts()//净值
            }else{
              this.drawChart()//账户总余额
            }

          }
        })
      }
    },
    created(){
      this.year = this.maxYear
      let nowDate = new Date();
      let newYear = nowDate.getFullYear();
      let newMonth = nowDate.getMonth() + 1;
      let newDay = nowDate.getDate();
      this.downloadTime = newYear + '年' + newMonth + '月' + newDay + '日'

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
    width: 1225px;
    display: flex;
    justify-content: space-between;
    margin:auto;
    padding: 0px 5px 24px 5px;
    background: #fff;
    border-radius: 10px 10px 0 0;
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
  .cashJournalCartogram{
    width: 95%;
    display: flex;
    border-radius:0 0 10px 10px;
    margin-top: 12px;
    margin: auto;
    justify-content: center;
    height: 600px;
    background-color: #FFFFFF;
  }
  .flex{
    display: flex;
    justify-content: space-between;
  }
  .btn{
    /*position: fixed;*/
    /*!*top: 10px;*!*/
    /*!*right: 10px;*!*/
    /*right: 50%;*/
    /*bottom: 10px;*/
    /*transform: translate(-50%,-50%);*/
  }
  .bottom{
    height: 50px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    bottom:20px;
    left: 0;
  }
</style>
