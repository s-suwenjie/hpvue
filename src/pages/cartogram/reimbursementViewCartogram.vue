<template>
  <div>
    <div class="top">
      <yhm-radiofilterdate title="时间" style="margin: 10px auto;" :edit="false" @initData="selectMonthEvent"></yhm-radiofilterdate>
      <yhm-radiofilter before="0" @initData="init('category')" title="选项 " :content="categoryPsd" all="0"></yhm-radiofilter>
    </div>
    <div class="bccolor">
      <div style="text-align: center;line-height: 50px;font-size: 16px; color:#A5BABA;width: 100%" v-if="shows">暂无数据</div>
      <div style="width: 65%;display: inline-block" v-show="!shows">
        <div  id="reimbursementViewCartogram" class="reimbursementViewCartogram"></div>
        <div  id="reimbursementViewCartogramtwo" class="reimbursementViewCartogram"></div>
      </div>
      <div style="width: 35%;display: inline-block" v-show="!shows">
        <div  id="reimbursementViewCartogramthe" class="reimbursementViewCartogramthe"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import { formmixin } from '@/assets/form.js'
  import { tenThousandFormatHtml } from '@/assets/common.js'
  export default {
    name: 'reimbursementViewCartogram',
    mixins: [formmixin],
    data(){
      return{
        content:[],
        shows:false,
        money:[],
        moneyAverage:'',
        name:[],
        categoryPsd:{
          value:'0',
          list:[
            {
              showName:'部门',
              num:'0',
            },
            {
              showName:'人员',
              num:'1',
            },
            {
              showName:'事由',
              num:'2',
            },
          ]
        },
        endDate:'',
        startDate:'',
        color:['#C33531','#EFE42A','#64BD3D','#EE9201','#29AAE3', '#CE86ED','#0AAF9F','#E89589','#16A085','#4A235A','#C39BD3','#F9E79F','#BA4A00','#ECF0F1','#616A6B','#EAF2F8','#4A235A','#3498DB' ],

      }
    },
    created () {
      console.log("#"+Math.floor(Math.random()*(256*256*256-1)).toString(16))
      let date= new Date()
      this.startDate=date.getFullYear()+'-'+(date.getMonth()+1)+'-01 00:00:00'
      this.endDate=date.getFullYear()+'-'+(date.getMonth()+1)+'-28 23:59:59'
      this.init()
    },
    methods:{
      init(){
        this.content=[]
        this.money=[]
        this.name=[]

        let params = {
          startDate:this.startDate,
          endDate:this.endDate,
          category:this.categoryPsd.value,
        }
        this.ajaxJson({
          url: '/PersonOffice/getStatisticsAll',
          data: params,
          call: (data) => {
            if(data.content.length!=0){
              this.shows=false

              let n =0
              for(let i in data.content){
                let m={
                  value:data.content[i].money,
                  name:data.content[i].name,
                }
                this.content.push(m)
                this.money.push(data.content[i].money)
                n=n+Number(data.content[i].money)
                this.name.push(data.content[i].name)
              }
              this.moneyAverage=(n/data.content.length).toFixed(2)
              this.drawChart()
              this.drawCharttwo()
              this.drawChartthree()
            }else{
              this.shows=true

            }
          }
        })
      },
      selectMonthEvent(data,item){
        this.startDate=item.startDate
        this.endDate=item.endDate
        // console.log(item)
        this.init()
      },
      drawChart(){
        let _this = this
        let myChart = this.$echarts.init(document.getElementById("reimbursementViewCartogram"));
        let barwidth=50

        if(this.categoryPsd.value=='2'){
          barwidth=20
        }else{
          barwidth=50
        }

        let option = {
          title: {
            text:'报销申请',
            x:350,
            y:20,
          },
          tooltip : {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            },
            formatter(p){
              let label=p[0].name+':¥'+tenThousandFormatHtml(p[0].data+'')

              return label
            }
          },
          toolbox: {
            show : true,
            top:10,
            right:10,
            feature : {
              saveAsImage : {show: true}
            }
          },
          grid: {
            left: '3%',
            right: '7%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
              type: 'category',
              name: '事项',
              data: _this.name,
              nameLocation:'end',
            },
          yAxis: {
              type:'value',
              name:"金额",
              nameLocation:"end",
              gridIndex:0,
              nameTextStyle:{
                fontSize: 16,
              },
            },
          series: [
            {
              type: 'bar',
              yAxisIndex:0,
              barGap: '50%',
              barWidth:barwidth,
              markLine : {
                data : [
                  {type : 'average', name: '金额平均值',yAxis:_this.moneyAverage}
                ],
                label: {
                  normal: {
                    position: 'middle',
                    formatter: '金额平均值' + _this.moneyAverage
                  }
                },
              },
              label:{
                show:false,
                position:'top  ',//['0%', '0%'],
                color:'#2B2B2B',
                // rotate:90,
              },
              itemStyle: {
                normal: {
                  // 随机显示
                  color:function(params) {
                    return _this.color[params.dataIndex]
                  }
                },
              },
              data:_this.money,
            }
          ]
        }

        myChart.setOption(option)
      },
      drawCharttwo(){
        let _this = this
        let myChart = this.$echarts.init(document.getElementById("reimbursementViewCartogramtwo"));

        let option = {
          title: {
            text:'报销申请',
            x:350,
            y:20,
          },
          tooltip : {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            },
            formatter(p){
              let label=p[0].name+':¥'+tenThousandFormatHtml(p[0].data+'')

              return label
            }
          },
          toolbox: {
            show : true,
            top:10,
            right:10,
            feature : {
              saveAsImage : {show: true}
            }
          },
          grid: {
            left: '3%',
            right: '7%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
              type: 'category',
              name: '事项',
              data: _this.name,
              nameLocation:'end',
            },
          yAxis: {
              type:'value',
              name:"金额",
              nameLocation:"end",
              gridIndex:0,
              nameTextStyle:{
                fontSize: 16,
              },
            },
          series: [
            {
              type: 'line',
              yAxisIndex:0,
              barGap: '50%',
              barWidth:50,
              data:_this.money,
              markLine : {
                data : [
                  {type : 'average', name: '金额平均值',yAxis:_this.moneyAverage}
                ],
                label: {
                  normal: {
                    position: 'middle',
                    formatter: '金额平均值' + _this.moneyAverage
                  }
                }
              },
              label:{
                show:true,
                position:'top',
                color:'#2B2B2B',
              },
              itemStyle: {
                normal: {
                  // 随机显示
                  color:function(d){return "#"+Math.floor(Math.random()*(256*256*256-1)).toString(16)}
                  // color:function(params) {
                  //   return _this.color[params.dataIndex]
                  // }
                },
              },
            }
          ]
        }

        myChart.setOption(option)
      },
      drawChartthree(){
        let _this = this
        let myChart = this.$echarts.init(document.getElementById("reimbursementViewCartogramthe"));

        let option = {
          backgroundColor:'#ffffff',
          title: {
            text:'报销申请',
            x:170,
            y:20,
          },
          legend: {
            data:_this.name,
            bottom:10,

            show:true
          },
          tooltip : {
            trigger: 'item',
            formatter: function (e) {
              return e.name+':¥'+ tenThousandFormatHtml(e.value)
            }
          },
          toolbox: {
            show : true,
            top:10,
            right:10,
            feature : {
              saveAsImage : {show: true}
            }
          },
          visualMap: {
            show: false,
            min: 100,
            max: 800,
            inRange: {
              colorLightness: [0.7, 0.4]
            }
          },
          series: [
            {
              type: 'pie',
              radius: [40, 110],
              center: ['50%', '50%'],
              data:(_this.content).sort(function (a, b) { return a.value - b.value; }),
              roseType: 'radius',
              label: {
                formatter: "{b}:{d}%",
                color: 'rgba(0, 0, 0, 0.5)'
              },
              labelLine: {
                lineStyle: {
                  color: 'rgba(0, 0, 0,0.5)'
                },
                smooth: 0.2,
                length: 3,
                length2: 10
              },
              itemStyle: {
                normal:{
                  color:function(params) {
                   return _this.color[params.dataIndex]
                  },
                  // color:'#c23531',
                  shadowBlur: 100,
                  shadowColor: 'rgba(0, 0, 0, 0.5)',
                  // borderWidth:2,
                  // borderColor:'#AA0F0F',
                },

              },

              animationType: 'scale',
              animationEasing: 'elasticOut',
              animationDelay: function (idx) {
                return Math.random() * 200;
              }
            }
          ]
        }

        myChart.setOption(option)
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
  .reimbursementViewCartogram{
    width: 96%;
    display: flex;
    justify-content: center;
    height: 300px;
    margin-left: 2%;
    margin-right: 2%;
    /*border: 1px solid #BFBFBF;*/
    margin-top: 15px;

  }
  .reimbursementViewCartogramthe{
    width: 96%;
    display: flex;
    justify-content: center;
    height: 617px;
    /*border: 1px solid #BFBFBF;*/
    margin-top: 15px;
  }
  .bccolor{
    width: 1235px;
    min-height: 610px;
    display: flex;
    align-content: flex-start;
    flex-wrap:wrap;
    border-radius:0 0 10px 10px;
    padding-bottom: 15px;
    margin: auto;
    margin-top: 15px;
    background-color: #FFFFFF;
  }
</style>
