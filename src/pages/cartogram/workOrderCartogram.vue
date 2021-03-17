<template>
    <div>
      <div id="workOrderCartogram" class="workOrderCartogram"></div>
    </div>
</template>

<script>
  import {tenThousandFormatHtml} from '@/assets/common.js'
  export default {
    name: 'workOrderCartogram',
    data(){
      return{
        downloadTime:'',
        radarValue:[5000, 14000, 28000, 31000, 42000, 21000],//雷达图数据
        chartBarList:[
          {
            name:'01',
            received:'90',
            uncollected:'70'
          },
          {
            name:'02',
            received:'50',
            uncollected:'50'
          },
          {
            name:'03',
            received:'39',
            uncollected:'50'
          },
          {
            name:'04',
            received:'50',
            uncollected:'87'
          },
          {
            name:'05',
            received:'120',
            uncollected:'90'
          },
          {
            name:'06',
            received:'82',
            uncollected:'80'
          },
          {
            name:'07',
            received:'80',
            uncollected:'70'
          },
          {
            name:'08',
            received:'55',
            uncollected:'65'
          },
          {
            name:'09',
            received:'75',
            uncollected:'58'
          },
          {
            name:'10',
            received:'60',
            uncollected:'75'
          },
          {
            name:'11',
            received:'80',
            uncollected:'85'
          },
          {
            name:'12',
            received:'55',
            uncollected:'60'
          },
          {
            name:'13',
            received:'150',
            uncollected:'123'
          },
          {
            name:'14',
            received:'300',
            uncollected:'200'
          },
          {
            name:'15',
            received:'236',
            uncollected:'130'
          },
          {
            name:'16',
            received:'257',
            uncollected:'86'
          }
        ]
      }
    },
    methods:{
      drawChart(){
        let that = this
        let myChart = this.$echarts.init(document.getElementById("workOrderCartogram"));
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
            text: '工单信息总览统计图',
            left: '40%',
            top: '6%',
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
              let amountInTotal = Number(params[0].value)+Number(params[1].value)
              return '<div class="received" style="margin:4px 5px 0 2px;border-radius: 50%;width: 15px;height: 15px;background: #ffd285;float: left;"></div>'
                + '已收金额 : ' +tenThousandFormatHtml(params[0].value+'') + '<br/>'
                + '<div class="received" style="margin:4px 5px 0 2px;border-radius: 50%;width: 15px;height: 15px;background: #ff733f;float: left;"></div>'
                + '未收金额 : ' +tenThousandFormatHtml(params[1].value+'') + '<br/>'
                + '<div class="received" style="margin:4px 5px 0 2px;border-radius: 50%;width: 15px;height: 15px;background: #759aa0;float: left;"></div>'
                + '合计金额 : ' +tenThousandFormatHtml(amountInTotal+'')
            }
          },
          legend: {
            x: '30%',
            bottom: '1%',
            textStyle: {
              color: '#ffd285',
            },
            data: ['已收金额', '未收金额']
          },
          radar: {
            // shape: 'circle',
            indicator: [{
              name: 'WALK-IN',
              max: 6500
            }, {
              name: '厂家推荐',
              max: 16000
            }, {
              name: '地图引流',
              max: 30000
            }, {
              name: '中介推荐',
              max: 38000
            }, {
              name: '保险推送',
              max: 52000
            },
            //   {
            //   name: '市场',
            //   max: 25000
            // }
            ],
            center: ['83%', '85%'],
            radius: 80
          },
          grid: {
            left: '5%',
            right: '32%',
            top: '16%',
            bottom: '6%',
            containLabel: true
          },
          toolbox: {
            "show": true,
            padding: 20,
            x:770,
            y:22,
            feature: {
              mark: { show: true, },
              magicType: { show: true, type: ['bar', 'line'] },
              saveAsImage: { show: true, name:'工单信息' + " " + that.downloadTime},
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
            data: ['01', '02', '03', '04', '05', '06', '07','08','09','10','11','12','13','14','15','16']
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
            name: '已收金额',
            smooth: true,
            type: 'bar',
            symbolSize: 8,
            barWidth: 20,
            stack: '金额',
            //symbol: 'circle',
            data: [90, 50, 39, 50, 120, 82, 80, 55, 75, 60, 80, 55,150,300,236,257]
          }, {
            name: '未收金额',
            smooth: true,
            type: 'bar',
            symbolSize: 8,
            barWidth: 20,
            stack: '金额',
            //symbol: 'circle',
            data: [70, 50, 50, 87, 90, 80, 70, 65, 58, 75, 85, 60,123,200,130,86]
          },
          // {
          //   name: '合计金额',
          //   smooth: true,
          //   type: 'bar',
          //   symbolSize: 8,
          //   //symbol: 'circle',
          //   data: [290, 200, 20, 132, 15, 200, 90]
          // },
            {
            type: 'pie',
            name: '总览',
            center: ['83%', '20%'],
            radius: ['15%', '20%'],
            tooltip: {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            label: {
              normal: {
                position: 'center'
              }
            },
            data: [
              {
                value: 335,
                name: '已收金额',
                itemStyle: {
                  normal: {
                    color: '#ffd285'
                  }
                },
                label: {
                  normal: {
                    formatter: '{d} %',
                    textStyle: {
                      color: '#ffd285',
                      fontSize: 20

                    }
                  }
                }
              },
              {
                value: 180,
                name: '未收金额',
                tooltip: {
                  show: true
                },
                itemStyle: {
                  normal: {
                    color: '#ff733f'
                  }
                },
                label: {
                  normal: {
                    textStyle: {
                      color: '#ffd285',
                    },
                    formatter: '\n\n\n已收金额'
                  }
                }
            }]
          }, {
            type: 'pie',
            center: ['83%', '50%'],
            radius: ['15%', '20%'],
            name: '业务来源',
            tooltip: {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            // label: {
            //    normal: {
            //       textStyle: {
            //       color: '#ffd285',
            //    },
            //       formatter: "{b}: {c} ({d}%)"
            //    }
            // },
            data: [{
              value: 335,
              name: '厂家推荐',
              itemStyle: {
                normal: {
                  color: '#ff733f'
                }
              }
            }, {
              value: 310,
              name: '地图引流',
              itemStyle: {
                normal: {
                  color: '#e69d87'
                }
              }
            }, {
              value: 234,
              name: '中介推修',
              itemStyle: {
                normal: {
                  color: '#759aa0'
                }
              }
            }, {
              value: 135,
              name: '保险推送',
              itemStyle: {
                normal: {
                  color: '#49a9ea'
                }
              }
            }, {
              value: 1548,
              name: 'WALK-IN',
              itemStyle: {
                normal: {
                  color: '#ffd285'
                }
              }
            }]
          },

            {
              type: 'radar',
              name: '业务来源',
              center: ['83%', '85%'],

              //radius: ['15%', '20%'],
              data: [
              //   {
              //   value: [4300, 10000, 28000, 35000, 50000, 19000],
              //   name: '预算分配'
              // },
                {
                value: [5000, 14000, 28000, 31000, 42000, 21000],
                name: '业务来源'
              }],
              tooltip: {
                trigger: 'item',
                // formatter: "{a} <br/>{b} : {c} ({d}%)"
                formatter: function(params) {
                  // for(let i in that.chartBarList){
                    // if(params.name==that.chartBarList[i].name){
                      // let amountInTotal =tenThousandFormatHtml(Number(that.chartBarList[i].received)+Number(that.chartBarList[i].uncollected)+'')
                      // return '已收金额 : ' +tenThousandFormatHtml(that.chartBarList[i].received+'') + '<br/>' + '未收金额 : ' +tenThousandFormatHtml(that.chartBarList[i].uncollected+'') + '<br/>' + '合计金额 : ' + amountInTotal
                  //   }
                  // }
                  let html = '业务来源' +
                    '<br/>' + 'WALK-IN : '+that.radarValue[0] +
                    '<br/>' + '厂家推荐 : '+that.radarValue[1] +
                    '<br/>' + '地图引流 : '+that.radarValue[2] +
                    '<br/>' + '中介推荐 : '+that.radarValue[3] +
                    '<br/>' + '保险推送 : '+that.radarValue[4]
                  return html
                  console.log('111',params)
                }
              }
            }
          ]
        }
        myChart.setOption(option);

      }
    },
    created () {
      // this.drawChart()
      let nowDate = new Date();
      let newYear = nowDate.getFullYear();
      let newMonth = nowDate.getMonth() + 1;
      let newDay = nowDate.getDate();
      this.downloadTime = newYear + '年' + newMonth + '月' + newDay + '日'
    },
    mounted() {
      this.drawChart();
    }
  }
</script>

<style lang="less" scoped>
  .workOrderCartogram{
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
