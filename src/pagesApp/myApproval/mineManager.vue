<template>
    <div>
      <div id="main" style="width: 100%;height:500px;"></div>
    </div>
</template>

<script>
  import { getDayNumByYearMonth } from '@/assets/common.js'

  export default {
    name: 'mineManager',
    data(){
      return{
        day:[],
        money:[],
        moneyList:[

        ]
        // list: [
        //   {
        //     day: '1',
        //     money: '1250'
        //   },
        //   {
        //     day: '1',
        //     money: '1250'
        //   },
        //   {
        //     day: '1',
        //     money: '1250'
        //   }
        //
        // ]
      }
    },
    methods:{
      forTheMonth(){//获取当月天数
        for(let a =1;a<=getDayNumByYearMonth(2020, 4);a++){
          this.day.push(a)
          this.money.push(Math.floor(Math.random()*20000))
          this.moneyList.push({'day':a,'money':Math.floor(Math.random()*20000)})
          console.log(this.moneyList)
        }
      },
      drawChart() {
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById("main"));
        // 指定图表的配置项和数据
        let option = {
          color: ['#3398DB'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },toolbox: {
            padding:30,
            show : true,
            feature : {
              mark : {show: true},
              // dataView : {show: true, readOnly: false},
              magicType : {show: true, type: ['bar','line']},
              // restore : {show: true},
              saveAsImage : {show: true},
              myTool2:{//自定义按钮 danielinbiti,这里增加，selfbuttons可以随便取名字
                show:true,//是否显示
                title:'排序', //鼠标移动上去显示的文字
                icon:'path://M24.41,24.49l-2.86-2.83a.45.45,0,0,1,.31-.77h1.37l0-5.89a1.47,1.47,0,0,1,1.47-1.48h0A1.48,1.48,0,0,1,26.15,15l0,5.89h1.37a.45.45,0,0,1,.32.77L25,24.48A.44.44,0,0,1,24.41,24.49Z,' +
                  'M16.69,2H1.52A1.73,1.73,0,0,0,0,3.89,1.73,1.73,0,0,0,1.52,5.77H16.69A1.73,1.73,0,0,0,18.2,3.89,1.73,1.73,0,0,0,16.69,2Z' +
                  'M16.69,10.42H1.52A1.74,1.74,0,0,0,0,12.31a1.73,1.73,0,0,0,1.52,1.88H16.69a1.73,1.73,0,0,0,1.51-1.88A1.74,1.74,0,0,0,16.69,10.42Z' +
                  'M16.69,18.84H1.52A1.74,1.74,0,0,0,0,20.73a1.74,1.74,0,0,0,1.52,1.89H16.69a1.74,1.74,0,0,0,1.51-1.89A1.74,1.74,0,0,0,16.69,18.84Z' +
                  'M24.38.13,21.54,3a.45.45,0,0,0,.31.77h1.37V9.63A1.47,1.47,0,0,0,24.7,11.1h0a1.47,1.47,0,0,0,1.47-1.47V3.74h1.37A.45.45,0,0,0,27.86,3L25,.13A.45.45,0,0,0,24.38.13Z'
                , //图标
                onclick:function() {//点击事件,这里的option1是chart的option信息
                  console.log('11111',this.moneyList)
                }
              }
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
              name:'日期',
              data: this.day,
              axisTick: {
                alignWithLabel: true
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              name:'金额',
              data: this.money,
            }
          ],
          series: [
            {
              name: '金额',
              type: 'bar',
              barWidth: '60%',
              data: this.money,
              // color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              //   offset: 0,
              //   color: 'rgba(123,150,95,0.3)'
              // },
              //   {
              //     offset:.5,
              //     color: 'rgba(0,253,252,0)'
              //   }
              //   ,
              //   {
              //     offset: 1,
              //     color: 'rgba(0,253,222,0)'
              //   }
              // ], false)
            }
          ]
        }

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      }
    },
    created(){
      this.forTheMonth()

    },
    mounted() {
      this.drawChart();
    }
  }
</script>

<style scoped>

</style>
