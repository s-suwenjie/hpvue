<template>
  <div class="f_main">
    <div class="top">
      <yhm-radiofilterdate title="时间" :year-txts="yearTxts" :custom-time="customTime" style="margin: 10px auto;" :edit="editShow" @initData="selectMonthEvent" :allyear="false"></yhm-radiofilterdate>

      <div class="total" v-show="totalShow">
        <div class="flex">
          <div class="topMoeny"  style="color:#49a9ea">
            <span >当月收入合计:</span>
            <span v-html="segmentation"></span>
          </div>
          <span style="color: black;">  日期:  {{dateMax}}</span>
        </div>
        <div class="flex">
          <div class="topMoeny"  style="color: #FF0000">
            <span >当月支出合计:</span>
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
    <div id="capitalTrendsTodayCartogram" class="capitalTrendsTodayCartogram"></div>
  </div>
</template>

<script>
  import { selectmixin } from '@/assets/select.js'
  import { tenThousandFormatHtml } from '@/assets/common.js'
  export default {
    name: 'capitalTrendsTodayCartogram',
    mixins: [selectmixin],
    data(){
      return{
        day:['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30'],
        moneyone:['20000','45651','89915','89449','61651','65445','15444','35115','15644','15432','15999','15444',],
        moneytwo:['20000','30000','79915','50220','61651','32000','15444','4115','5444','1444','1544','15444',],
        moneythree:['0','0','0','0','-12345','0','-23105','0','0','0','0','-6000'],
        average:'',
        averages:'',

        dateMax:'',
        dateMin:'',
        moneyMax:'',
        moneyMin:'',
        totalShow:true,
        colors:'',
        maxYear:'',
        yearTxt:'',
        totalShow:true,
        editShow:false,
        customTime:'',
        yearTxts:'',

        year:"",
        month:'',
      }
    },
    computed:{
      segmentation(){
        let all=0
        for(let i in this.moneyone){

          all=all+Number(this.moneyone[i])
        }
        all=all.toFixed(2)
        return "¥"+tenThousandFormatHtml(all+'')
      },
      segmentations(){
        let all=0
        for(let i in this.moneytwo){

          all=all+Number(this.moneytwo[i])-Number(this.moneythree[i])
        }
        all=all.toFixed(2)

        return "¥"+tenThousandFormatHtml(all+'')
      },
    },
    created () {
      let data=new Date

      this.year=data.getFullYear()
      this.month=data.getMonth()+1
      this.customTime=(this.month-1).toString()
      this.maxYear=this.year
      this.dateMax=this.year+'年'+this.month+'月'
      this.dateMin=this.year+'年'+this.month+'月'

      this.pageStr()
    },
    methods:{
      drawChart(){
        let num=0
        let index=0

        for(let i in this.moneytwo){
          num+=(Number(this.moneytwo[i])-Number(this.moneythree[i]))
          index++
        }
        this.averages=num/index

        let _this=this

        let myChart = _this.$echarts.init(document.getElementById('capitalTrendsTodayCartogram'))

        let option={
          backgroundColor: '#FFFFFF',
          // tooltip: {
          //   trigger: 'axis',
          //   axisPointer: {
          //     type: 'shadow'
          //   },
          // },
          title: {
            text: '收支对比图',
            x:600,
            y:10,
          },
          tooltip: {
            trigger: 'axis',        //触发类型，默认（'item'）数据触发，可选为：'item' | 'axis'
            axisPointer: {          // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            },
            formatter(params){
              let day,money,label,moneys

              if(params[0].seriesName=="收入"&& params.length==1){

                day = params[0].axisValue+'日'
                money=params[0].value
                label = '日期: ' +  day +'</br>' + '收入: ' + money

              }else if(params[0].seriesName=="支出" && params.length==2){

                day = params[0].axisValue+'日'
                moneys=params[0].value-params[1].value
                label = '日期: ' +  day +'</br>'+'支出:'+moneys+'</br>'+'超支:'+params[1].value

              }else if(params.length==3){

                day = params[0].axisValue+'日'
                money=params[0].value
                moneys=params[1].value-params[2].value
                label = '日期: ' +  day +'</br>' + '收入: ' + money+'</br>'+'支出:'+moneys+'</br>'+'超支:'+params[2].value

              }
              // let day = params[0].axisValue+'日'
              // let money=params[0].value
              // let moneys=params[1].value-params[2].value
              //
              // let label = '日期: ' +  day +'</br>' + '收入: ' + money+'</br>'+'支出:'+moneys+'</br>'+'超支:'+params[2].value
              return label
            }
          },
          legend:{
            show:true,
            data:['收入','支出'],
            x:150,
            y:5
          },
          // toolbox: {
          //   show: true,
          //   orient: 'vertical',
          //   left: 'right',
          //   top: 'center',
          //   feature: {
          //     mark: {show: true},
          //     dataView: {show: true, readOnly: false},
          //     magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
          //     restore: {show: true},
          //     saveAsImage: {show: true}
          //   }
          // },
          xAxis: [
            {
              type: 'category',
              name: '日期',
              data: _this.day,
              // axisTick: {
              //   alignWithLabel: true
              // },
            }
          ],
          yAxis: [
            {
              type: 'value',
              splitArea: {show: true},
              name: '金额',
            },
          ],
          series:[
            {
              name:'收入',
              type:'bar',
              barGap: '0%',
              stack: 'one',
              data:_this.moneyone,
              barWidth:15,
              itemStyle:{
                normal:{
                  color:'#77B0FD',
                  position: 'start',//'start''middle''end'
                  formatter: '平均值: ' + _this.average
                },
                emphasis:{//鼠标悬停
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              },
              markLine: {
                data: [
                  {type: 'average', name: '平均值'}
                ]
              }
            },
            {
              name:'支出',
              type:'bar',
              stack: 'two',
              data:_this.moneytwo,
              barWidth:15,
              itemStyle:{
                normal:{
                  color:'#C75450',
                  position: 'start',//'start''middle''end'
                  formatter: '平均值: ' + _this.averages
                },
                emphasis:{//鼠标悬停
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              },
              markLine: {
                data: [
                  {type: 'average', name: '平均值',yAxis:_this.averages}
                ]
              }
            },
            {
              name:'支出',
              type:'bar',
              stack: 'two',
              data:_this.moneythree,
              barWidth:15,
              itemStyle:{
                normal:{
                  color:'#FF4600',
                },
                emphasis:{//鼠标悬停
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            },
          ]
        }

        myChart.setOption(option)
      },

      pageStr(){

        // let data=new Date

        // let year=data.getFullYear()
        // let month=data.getMonth()+1
        this.day=[]
        this.moneyone=[]
        this.moneytwo=[]
        this.moneythree=[]


        let params={
          year:this.year,
          month:this.month
        }

        this.ajaxJson({
          url: '/Fin/bankDetailStatistics',
          data: params,
          loading:'0',
          call: (data) => {
            // console.log(data)

            for(let i in data){
              this.day.push(data[i].day)
              this.moneyone.push(data[i].income)//expend
              if(Number(data[i].expend)>Number(data[i].income)){
                this.moneytwo.push(data[i].income)
                let n=(Number(data[i].income)-Number(data[i].expend)).toString()
                this.moneythree.push(n)
              }else{
                this.moneytwo.push(data[i].expend)
                let n='0'
                this.moneythree.push(n)
              }
            }
            // console.log(this.day)
            // console.log(this.moneyone)
            // console.log(this.moneytwo)
            // console.log(this.moneythree)

            this.drawChart()
          }
        })

      },
      selectMonthEvent(data,item){
        // console.log(data)

        let datas=new Date

        let year=datas.getFullYear()
        let month=datas.getMonth()+1


        this.year = data.slice(0,4)
        this.month = data.slice(5,7)
        if(this.month==13 && this.year==year){
          this.month=month
        }else if(this.month==13 && this.year!=year){
          this.month=12
        }
        this.dateMax=this.year+'年'+this.month+'月'
        this.dateMin=this.year+'年'+this.month+'月'
        this.pageStr()
      }


    }
  }
</script>

<style scoped lang="less">
  .capitalTrendsTodayCartogram{
    width: 95%;
    display: flex;
    border-radius:0 0 10px 10px;
    margin-top: 12px;
    margin: auto;
    justify-content: center;
    height: 650px;
    background-color: #FFFFFF;
  }
  .top{
    width: 1267px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    margin:auto;
    padding: 16px 20px 24px 20px;
    background: #fff;
    position: relative;
    z-index: 999;
    border-radius: 10px 10px 0;
    top: 28px;
    margin-bottom: 20px;
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
  /*.total{*/
  /*  width: 600px;*/
  /*  display: flex;*/
  /*  border: 1px solid #bfbfbf;*/
  /*  justify-content: space-between;*/
  /*  border-radius: 10px;*/
  /*  background-color: #fff;*/
  /*  padding: 10px;*/
  /*}*/
  /*span{*/
  /*  font-size: 15px;*/
  /*}*/
  }
  .BankDetailCommissionCartogram{
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
    position: fixed;
    bottom: -4px;
    left: 50%;
    transform: translate(-50%,-50%);
  }
  .posit {
    /*font-weight: bold;*/
    position: absolute;
    top: 100px;

    left: 640px;
  }
  .posit span{
    font-size: 16px;
  }
</style>
