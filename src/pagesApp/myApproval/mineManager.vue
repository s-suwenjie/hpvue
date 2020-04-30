<template>
    <div>
      <div id="main" style="width: auto;height:400px;"></div>
    </div>
</template>

<script>
  import { getDayNumByYearMonth } from '@/assets/common.js'

  export default {
    name: 'mineManager',
    data(){
      return{
        day:[],
        money:[]
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
              dataView : {show: true, readOnly: false},
              magicType : {show: true, type: ['line', 'bar']},
              restore : {show: true},
              saveAsImage : {show: true},
              myTool2:{//自定义按钮 danielinbiti,这里增加，selfbuttons可以随便取名字
                show:true,//是否显示
                title:'查看全部', //鼠标移动上去显示的文字
                icon:'path://M525.4 721.2H330.9c-9 0-18.5-7.7-18.5-18.1V311c0-9 9.3-18.1 18.5-18.1h336.6c9.3 0 18.5 9.1 18.5 18.1v232.7c0 6 8.8 12.1 15 12.1 6.2 0 15-6 15-12.1V311c0-25.6-25.3-48.9-50.1-48.9h-335c-26.2 0-50.1 23.3-50.1 48.9v389.1c0 36.3 20 51.5 50.1 51.5h197.6c6.2 0 9.3-7.5 9.3-15.1 0-6-6.2-15.3-12.4-15.3zM378.8 580.6c-6.2 0-12.3 8.6-12.3 14.6s6.2 14.6 12.3 14.6h141.4c6.2 0 12.3-5.8 12.3-13.4 0.3-9.5-6.2-15.9-12.3-15.9H378.8z m251.6-91.2c0-6-6.2-14.6-12.3-14.6H375.7c-6.2 0-12.4 8.6-12.4 14.6s6.2 14.6 12.4 14.6h240.8c6.2 0.1 13.9-8.5 13.9-14.6z m-9.2-120.5H378.8c-6.2 0-12.3 8.6-12.3 14.6s6.2 14.6 12.3 14.6h240.8c7.7 0 13.9-8.6 13.9-14.6s-6.2-14.6-12.3-14.6z m119.4 376.6L709 714.1c9.2-12 14.6-27 14.6-43.2 0-39.4-32.1-71.4-71.8-71.4-39.7 0-71.8 32-71.8 71.4s32.1 71.4 71.8 71.4c16.3 0 31.3-5.4 43.4-14.5l31.6 31.5c3.8 3.8 10 3.8 13.8 0 3.8-3.8 3.8-10 0-13.8z m-88.8-23.6c-28.3 0-51.3-22.8-51.3-51s23-51 51.3-51c28.3 0 51.3 22.8 51.3 51s-23 51-51.3 51z', //图标
                onclick:function() {//点击事件,这里的option1是chart的option信息
                  console.log('11111')
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
