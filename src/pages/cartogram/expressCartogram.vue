<template>
  <div>
    <div class="top">
      <yhm-radiofilterdate title="时间" :year-txts="yearTxts" :custom-time="customTime" style="margin: 10px auto;" :edit="editShow" @initData="selectMonthEvent" ref="index"></yhm-radiofilterdate>
      <yhm-radiofilter :before="expressCompanyBefore" @initData="initPageData('weekState')" title="日期 " :content="weekStatePsd" all="0"></yhm-radiofilter>
    </div>
    <div id="expressCartogram" class="expressCartogram"></div>
    <div style="width: 100%;height: 24px;"></div>
  </div>
</template>

<script>
  import { formmixin } from '@/assets/form.js'
  import { formatDate,getDayNumByYearMonth,tenThousandFormatHtml } from '@/assets/common.js'

  export default {
    name: 'expressCartogram',
    mixins: [formmixin],
    data(){
      return{
        yearTxts:'',
        customTime:'12',

        day:[],
        dataStrip:[],
        dataMoney:[],
        StripAverage:'',
        MoneyAverage:'',
        startDate:'',
        endDate:'',
        Year:true,
        expressCompanyBefore:'0',
        weekStatePsd: {
          list: [],
          value:'0'
        },
        inits:true,
        index:0,
      }
    },
    created(){
      // this.initPageData()
    },
    computed:{
      editShow(){
        if(this.weekStatePsd.value==0){
          return true
        }else{
          return false
        }
      }
    },
    methods:{
      initPageData(){
        this.day=[]
        this.dataStrip=[]
        this.dataMoney=[]
        let date= new Date()
        if(this.startDate){

        }else{
          this.startDate=date.getFullYear()+'-'+(date.getMonth()+1)+'-01 00:00:00'
          this.endDate=date.getFullYear()+'-'+(date.getMonth()+1)+'-30 23:59:59'
        }
        if(this.weekStatePsd.value==0){
          this.$refs.index.clickMonthAllEvent()
          this.Year=true
        }else{
          this.Year=false
          let params = {
            startDate:this.startDate,
            endDate:this.endDate,
            weekState:this.weekStatePsd.value
          }
          this.ajaxJson({
            url: '/dailyoffice/myExpress/getChart',
            data: params,
            call: (data) => {
              if(this.inits){
                this.weekStatePsd=data.weekStatePsd
                this.inits=false
              }

              for(let i in data.content){
                this.day.push(data.content[i].moneth)
                this.dataStrip.push(data.content[i].count)
                this.dataMoney.push(data.content[i].money)
              }
              this.Average(data)
              this.drawChart()
            }
          })
        }

      },
      selectMonthEvent(data,item){
        // console.log(data, item)
        this.day=[]
        this.dataStrip=[]
        this.dataMoney=[]

        let m=data.split('-')

        if(Number(m[1]) == 13){
          this.Year=true
        }else{

          this.Year=false
        }
        this.startDate=item.startDate
        this.endDate=item.endDate

        let params = {
          startDate:this.startDate,
          endDate:this.endDate,
          weekState:this.weekStatePsd.value
        }
        this.ajaxJson({
          url: '/dailyoffice/myExpress/getChart',
          data: params,
          call: (data) => {
            if(this.inits){
              this.weekStatePsd=data.weekStatePsd
              this.inits=false
            }

            for(let i in data.content){
              this.day.push(data.content[i].moneth)
              this.dataStrip.push(data.content[i].count)
              this.dataMoney.push(data.content[i].money)
            }
            this.Average(data)
            this.drawChart()
          }
        })

      },
      drawChart(){
        let _this = this
        let myChart = this.$echarts.init(document.getElementById("expressCartogram"));

        // #26AF81

        let option = {
          color: ['#FA6868','#8BCBF8'],
          title: {
            text:'快递信息统计',
            x:560,
            y:20,
          },
          tooltip : {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            },
            formatter(params){
              let label=''
              if(_this.Year){

                label = '日期:' + params[0].axisValue+'月' +'</br>' + '件数: ' + params[0].data+'件'+'</br>'+'金额: ¥'+tenThousandFormatHtml(params[1].data+'')
              }else{

                label = '日期:' + params[0].axisValue +'</br>' + '件数: ' + params[0].data+'件'+'</br>'+'金额: ¥'+tenThousandFormatHtml(params[1].data+'')
              }
              return label
            }
          },
          legend:{
            show:true,
            data:['快递件数','快递金额'],
            top:30,
            left:50,
          },
          toolbox: {
            show : true,
            top:10,
            right:10,
            feature : {
              mark : {show: true},
              magicType : {show: true, type: ['line', 'bar']},
              restore : {show: true},
              saveAsImage : {show: true}
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
              data: _this.day,
            }
          ],
          yAxis: [
            {
              type:'value',
              name:"件数",
              nameLocation:"center",
              gridIndex:0,
              nameLocation:'middle',
              nameTextStyle:{
                fontSize: 16,
              },
            },
            {
              type:'value',
              name:"金额(元)",
              nameLocation:"center",
              gridIndex:0,
              nameLocation:'middle',
              nameTextStyle:{
                fontSize: 16,
              },
            },
          ],
          series: [
            {
              name:'快递件数',
              type: 'bar',
              yAxisIndex:0,
              barGap: '10%',
              barWidth:30,
              data:_this.dataStrip,
              markLine : {
                data : [
                  {type : 'average', name: '信件数量平均值',yAxis:_this.StripAverage}
                ],
                label: {
                  normal: {
                    position: 'middle',
                    formatter: '信件数量平均值' + _this.StripAverage
                  }
                }
              }
            },
            {
              name:'快递金额',
              type: 'bar',
              yAxisIndex:1,
              barWidth:30,
              data:_this.dataMoney,
              markLine : {
                data : [
                  {type : 'average', name: '信件金额平均值',yAxis:_this.MoneyAverage}
                ],
                label: {
                  normal: {
                    position: 'middle',
                    formatter: '信件金额平均值' + _this.MoneyAverage
                  }
                }
              }

            }
          ]
        }

        myChart.setOption(option)
      },
      Average(data){
        let n=0
        let m=0
        for(let i in data.content){
            n=n+Number(data.content[i].count)

            m=m+Number(data.content[i].money)

        }
        this.StripAverage=(n/data.content.length).toFixed(2)
        this.MoneyAverage=(m/data.content.length).toFixed(2)
      }
    }
  }
</script>

<style scoped lang="less">
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
      white-space: nowrap;
      text-overflow:ellipsis;
    }
  }
  .flex{
    display: flex;
    justify-content: space-between;
  }
  .expressCartogram{
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
    transform: translate(-50%,-50%);
  }
  .posit {
    /*font-weight: bold;*/
    position: absolute;
    top: 112px;
    left: 670px;
  }
  .posit span{
    font-size: 16px;
  }
</style>
