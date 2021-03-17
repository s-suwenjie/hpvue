<template>
  <div>
    <yhm-radiofilterdate title="时间" :year-txts="yearTxts" :custom-time="customTime"
       style="margin: 10px auto;position: absolute;left:15px;top: 20px;z-index: 100;"
       @initData="radiofilterdateClick"></yhm-radiofilterdate>

    <div id="invoiceCartogram" class="invoiceCartogram">

    </div>
  </div>
</template>

<script>
  import {tenThousandFormatHtml,getMonth} from '@/assets/common.js'
  export default {
    name: 'invoiceCartogram',
    data(){
      return{
        list:[],//柱状图数据
        yearTxts:'',
        customTime:'',
        downloadTime:'',
        columnarNameList:[],
        columnarMoneyList:[],
        columnarQuantityList:[],
        pieChart:[],//饼状图数据
        pieChartColorList:['#e69d87','#759aa0','#86A8E7','#ffd285', '#FF8C00','#D3CCE3','#48b1bf','#4AC29A','#E8CBC0'],//饼状图颜色
        classifyPieColorList:['#ACB6E5', '#74ebd5','#86A8E7','#7F7FD5', '#eaafc8', '#FF8C00','#D3CCE3','#48b1bf', '#4AC29A','#ffd285','#ff733f','#ec4863', '#E8CBC0'],//费用分类饼状图颜色
        // classifyPieColorList:['#ffd285','#ff733f','#ec4863','#ACB6E5', '#74ebd5','#86A8E7','#7F7FD5', '#eaafc8', '#FF8C00','#D3CCE3','#48b1bf','#4AC29A','#E8CBC0'],//费用分类饼状图颜色

        classifyPie:[],//费用分类数据
        radarList:[],//雷达图
        radarDataList:[],//雷达图数据


      }
    },
    methods:{
      drawChart(){
        let that = this
        let myChart = this.$echarts.init(document.getElementById("invoiceCartogram"));
        var placeHolderStyle = {
          normal: {
            label: {
              show: false,
              position: "center"
            },
            labelLine: {
              show: false
            },
            color: "#dedede",
            borderColor: "#dedede",
            borderWidth: 0
          },
          emphasis: {
            color: "#dedede",
            borderColor: "#dedede",
            borderWidth: 0
          }
        };
        let option = {
          backgroundColor: "#404A59",
          color: ['#ffd285', '#ff733f'],//'#ec4863'
          title: [{
            text: '发票总览统计图',
            left: '32%',
            top: '25%',
            textStyle: {
              color: '#ffd285'
            }
          }],
          // tooltip: {
          //   trigger: 'item',
          //   formatter: "{a} <br/>{b} : {c}",
          //   formatter: function(params) {
          //       return params.seriesType
          //       return params.name+':'+params.value
          //   }
          // },
          tooltip:{
            trigger: 'axis',
            confine:true,
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            },
            position: function(point, params, dom, rect, size){
              if(60+20>point[0]){ //tooltip宽度 + 20 大于鼠标横向位置时，强制避免提示超出左侧画布
                return {left: 10, top: point[1]}
              }
            },
            // formatter 设置提示的文字内容（需要改变样式可通过 rich 富文本实现，见文档），要在 tooltip 中显示单位，可通过函数 params 拼字符串加上如下面 % 的单位
            // formatter: function(params){
            //   return params[0].marker+'<br/>'+params[0].seriesName+': '+params[0].value+'%'
            // }
            formatter: function(params) {
              // let amountInTotal = Number(params[0].value)+Number(params[1].value)
              let number = ''
              for(let j in that.list){
                if(that.list[j].money==params[0].value){
                  number = that.list[j].number
                }
              }
              return '<div class="received" style="margin:4px 5px 0 2px;border-radius: 50%;width: 15px;height: 15px;background: #fb6727;float: left;"></div>'
                + params[0].axisValue +  ' : '  +tenThousandFormatHtml(params[0].value+'') + '<br/>'
                + '<div class="received" style="margin:4px 5px 0 2px;border-radius: 50%;width: 15px;height: 15px;background: #ff943a;float: left;"></div>'
                +  '数量 : ' + number+'' + '<br/>'
            }
          },
          grid: {
            left: '5%',
            right: '32%',
            top: '33%',
            // bottom: '6%',
            height:'60%',
            width:'60%',
            containLabel: true
          },
          toolbox: {
            "show": true,
            padding: 20,
            x:670,
            y:159,
            feature: {
              mark: { show: true, },
              magicType: { show: true, type: ['bar', 'line'] },
              saveAsImage: { show: true, name:'发票总览' + " " + that.downloadTime},
            }
          },
          xAxis: {
            type: 'category',
            "axisLine": {
              lineStyle: {
                color: '#c0576d'
              }
            },
            "axisTick": {
              "show": false
            },
            axisLabel: {
              textStyle: {
                color: '#ffd285'
              }
            },
            boundaryGap: true, //false时X轴从0开始
            data: that.columnarNameList
          },
          yAxis: {
            "axisLine": {
              lineStyle: {
                color: '#c0576d'
              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#c0576d'
              }
            },
            "axisTick": {
              "show": false
            },

            axisLabel: {

              textStyle: {
                color: '#ffd285'
              }
            },
            type: 'value'
          },
          // dataZoom: [
          //   {
          //     show: true,
          //     start: 94,
          //     end: 100
          //   },
          //   {
          //     type: 'inside',
          //     start: 94,
          //     end: 100
          //   },
          //   {
          //     show: true,
          //     yAxisIndex: 0,
          //     filterMode: 'empty',
          //     width: 20,
          //     height: '80%',
          //     showDataShadow: false,
          //     left: '93%'
          //   }
          // ],
          series: [{
            name: '金额',
            smooth: true,
            type: 'bar',
            symbolSize: 8,
            barWidth: 15,
            stack: '金额',
            //symbol: 'circle',
            data:that.columnarMoneyList,
            itemStyle: {
              normal: {
                //颜色设置
                color:
                  // '#fb6727'
                 function(params) {
                  // 渐变色 设置
                  let color1=new that.$echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                    offset: 0,
                    color: "#ff943a" // 0% 处的颜色
                  },{
                    offset: 1,
                    color: "#fb6727" // 100% 处的颜色
                  }], false)
                  // let color2=new that.$echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                  //   offset: 0,
                  //   color: "#74ebd5" // 0% 处的颜色
                  // }, {
                  //   offset: 1,
                  //   color: "#ACB6E5" // 100% 处的颜色
                  // }], false)

                  // let colorList = [
                  //   color2,color1
                  //
                  //   // '#7B68EE','#A020F0' 纯色设置
                  // ];
                  return color1
                },

              }
            },
          },
            {
              type: 'pie',
              name: '开票类型',
              center: ['83%', '37%'],
              radius: ['15%', '20%'],
              tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
              },
              label: {
                normal: {
                  textStyle: {
                    color: '#ffd285',
                  },
                  formatter: "{b}:  \n {c}({d}%)"
                }
              },
              data: that.classifyPie
            }, {
              type: 'pie',
              center: ['83%', '75%'],//83 75
              radius: ['15%', '20%'],
              name: '发票类型',
              tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
              },
              label: {
                 normal: {
                    textStyle: {
                    color: '#ffd285',
                 },
                    formatter: "{b}: \n  {c}  ({d}%)"
                 }
              },
              data: that.pieChart,
            },

            // {
            //   type: 'radar',
            //   name: '业务来源',
            //   center: ['83%', '85%'],
            //
            //   //radius: ['15%', '20%'],
            //   data: [
            //     //   {
            //     //   value: [4300, 10000, 28000, 35000, 50000, 19000],
            //     //   name: '预算分配'
            //     // },
            //     {
            //       value:that.radarDataList ,
            //       name: '业务来源'
            //     }],
            //   tooltip: {
            //     trigger: 'item',
            //     // formatter: "{a} <br/>{b} : {c} ({d}%)"
            //     formatter: function(params) {
            //       // for(let i in that.chartBarList){
            //       // if(params.name==that.chartBarList[i].name){
            //       // let amountInTotal =tenThousandFormatHtml(Number(that.chartBarList[i].received)+Number(that.chartBarList[i].uncollected)+'')
            //       // return '已收金额 : ' +tenThousandFormatHtml(that.chartBarList[i].received+'') + '<br/>' + '未收金额 : ' +tenThousandFormatHtml(that.chartBarList[i].uncollected+'') + '<br/>' + '合计金额 : ' + amountInTotal
            //       //   }
            //       // }
            //       console.log(that.radarList)
            //       let html = ''
            //       for(let i in that.radarList){
            //         html+='<br/>' + that.radarList[i].name + ' : ' +that.radarDataList[i]
            //         // that.radarList[i].name
            //       }
            //       // let html = '业务来源' +
            //       //   '<br/>' + 'WALK-IN : '+that.radarValue[0] +
            //       //   '<br/>' + '厂家推荐 : '+that.radarValue[1] +
            //       //   '<br/>' + '地图引流 : '+that.radarValue[2] +
            //       //   '<br/>' + '中介推荐 : '+that.radarValue[3] +
            //       //   '<br/>' + '保险推送 : '+that.radarValue[4]
            //       return '发票类型' + html
            //       console.log('111',params)
            //     }
            //   }
            // }
          ]
        }
        myChart.setOption(option);

      },
      radiofilterdateClick(data,item){
        this.pieChart = []
        this.radarList = []
        let params={
          startDate:item.startDate,
          endDate:item.endDate
        }
        this.ajaxJson({
          url: '/Bill/openInvoiceStatistics',
          data: params,
          call: (data) => {
            this.columnarNameList = []
            this.columnarMoneyList = []
            this.columnarQuantityList = []
            this.classifyPie = []
            this.list = data[0]
            let list = data[0]
            let list2 = data[1]
            for(let i in list){
              this.columnarNameList.push(list[i].categoryName)
              this.columnarMoneyList.push(list[i].money)
              this.columnarQuantityList.push(list[i].number)
              this.classifyPie.push({
                value:list[i].money,
                name:list[i].categoryName + '('+ list[i].number + '张)',
                itemStyle: {
                  normal: {
                    color: this.classifyPieColorList[i]
                  }
                }
              })
            }
            for(let j in list2){
              this.pieChart.push({
                value:list2[j].money,
                name:list2[j].invoiceName + '('+ list2[j].number + '张)',
                itemStyle: {
                  normal: {
                    color: this.pieChartColorList[j]
                  }
                }
              })
            }

            this.drawChart()

          }
        })
      }
    },
    created () {
      // this.drawChart()
      let nowDate = new Date();
      let newYear = nowDate.getFullYear();
      let newMonth = nowDate.getMonth() + 1;
      let newDay = nowDate.getDate();
      this.downloadTime = newYear + '年' + newMonth + '月' + newDay + '日'

      let params={
        startDate:getMonth('s','0') + ' 00:00:00',
        endDate:getMonth('e','0') + ' 23:59:59'
      }
      this.ajaxJson({
        url: '/Bill/openInvoiceStatistics',
        data: params,
        call: (data) => {
          this.columnarNameList = []
          this.columnarMoneyList = []
          this.columnarQuantityList = []
          this.list = data[0]
          let list = data[0]
          let list2 = data[1]

          for(let i in list){
            this.columnarNameList.push(list[i].categoryName)
            this.columnarMoneyList.push(list[i].money)
            this.columnarQuantityList.push(list[i].number)
            this.classifyPie.push({
              value:list[i].money,
              name:list[i].categoryName + '('+ list[i].number + '张)',
              itemStyle: {
                normal: {
                  color: this.classifyPieColorList[i]
                }
              }
            })
          }
          console.log(list)
          for(let j in list2){
            this.pieChart.push({
              value:list2[j].money,
              name:list2[j].invoiceName + '('+ list2[j].number + '张)',
              itemStyle: {
                normal: {
                  color: this.pieChartColorList[j]
                }
              }
            })


          }

          this.drawChart()

        }
      })
    },
    mounted() {
      // this.drawChart();
    }
  }
</script>

<style lang="less" scoped>
  .invoiceCartogram{
    width: 100%;
    display: flex;
    justify-content: center;
    height: 710px;
    border-radius:0 0 10px 10px;
    margin-top: 12px;
    margin: auto;
    background-color: #404a59;
    /*padding: 20px;*/
  }
</style>
