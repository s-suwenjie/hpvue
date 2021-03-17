<template>
    <div>
      <div class="bccolor">
        <div v-for="(item,index) in Cartogram" :key="index" :id="item" class="expressCartogram"></div>
      </div>
      <div class="bottom">
        <yhm-commonbutton value="提交" :flicker="true" @call="SaveClick" icon="" class="btn"></yhm-commonbutton>
      </div>
      <div style="width: 100%;height: 24px;"></div>
    </div>
</template>

<script>
  import { formmixin } from '@/assets/form.js'
  import { tenThousandFormatHtml } from '@/assets/common.js'
  export default {
    name: 'reimbursementCartogram',
    mixins: [formmixin],
    data(){
      return{
        List:[],
        xaxis:[],
        yaxisone:[],
        one:[],
        two:[],
        fou:[],
        fiv:[],
        datas:[],
        yaxisY:[],
        Cartogram:[],
        id:'',
        category:'',
      }
    },
    created(){
      this.setQuery2Value('id')
      this.init()
    },
    methods:{
      init(){
        this.ajaxJson({
          url: '/dailyoffice/reimbursementLlimit/getSubjectStatistics',
          data: {
            id: this.id
          },
          call: (data) => {
            this.xaxis=data.content.xAxis

            this.yaxisY = JSON.parse(JSON.stringify(data.content.series));

            let arr={
              data:['']
            }


            this.yaxisone=data.content.series//备份数据

            for(let i in this.yaxisY){
              let n='Cartogram'+i
              this.Cartogram.push(n)

              for(let item in this.yaxisY[i][2].data){
                this.yaxisY[i][2].data[item]=Number(data.content.series[i][2].data[item])-(Number(data.content.series[i][1].data[item])+Number(data.content.series[i][4].data[item]))
                this.yaxisY[i][3].data[item]=Number(data.content.series[i][3].data[item])-Number(data.content.series[i][2].data[item])
                let a=Number(data.content.series[i][1].data[item])+Number(data.content.series[i][4].data[item])
                let b=Number(data.content.series[i][3].data[item])-(Number(data.content.series[i][1].data[item])+Number(data.content.series[i][4].data[item]))
                let c=Number(data.content.series[i][2].data[item])
                let d=this.yaxisY[i][3].data[item]

                this.one.push(a)
                this.two.push(b)
                this.fou.push(c)
                this.fiv.push(d)
              }

            }
            setTimeout(()=> {
              for(let i in this.Cartogram){
                this.drawChart(i)
              }
            },100)
          }
        })
      },
      SaveClick(){
        let params = {
          id: this.id,
          tableName:40
        }
        this.ajaxJson({
          url: '/PersonOffice/getSubmitCatrgoryVue',
          data: params,
          call: (data) => {
            this.category = data.message
            if (data.type === 0) {
              /* 判断是否拿到category */
              let paramss = {
                id: this.id,
                category: this.category,
                tableName: 40,
                isDetail: 1,
                tableDetailName: 41
              }
              this.ajaxJson({
                url: '/PersonOffice/approvalSubmitVue',
                data: paramss,
                call: (datas) => {
                  if (datas.type === 0) {
                    this.$dialog.alert({
                      tipValue: datas.message,
                      closeCallBack: () => {
                        this.$dialog.close()
                      }
                    })
                  } else {
                    this.$dialog.alert({
                      alertImg: 'error',
                      tipValue: datas.message,
                      closeCallBack: () => {
                      }
                    })
                  }
                }
              })
            }else{
              this.$dialog.alert({
                tipValue: '没有获取到提交数据!',
                alertImg: 'error'
              })
            }
          }
        })

      },
      drawChart(index){
        let _this = this
        let myChart = this.$echarts.init(document.getElementById(this.Cartogram[index]));

        let option = {
          color: ['#FA6868','#73C0DE',"#1FE3A5",'#ffffff00','#F38387','#F8D17B','#91CC75','#5470C6','#3BA272','#FC8452','#E58FD3'],
          // title: {
          //   text:'统计',
          //   x:250,
          //   y:0,
          // },
          tooltip : {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            },
            formatter(p){
              let text=""
              text = p[0].name+'<br/>'+
                    '总金额:¥'+tenThousandFormatHtml(_this.yaxisone[index][0].data[p[0].dataIndex])+'<br/>'+
                    '全部报销:¥'+tenThousandFormatHtml(_this.yaxisone[index][3].data[p[0].dataIndex])+'<br/>'+
                    '本次报销:¥'+tenThousandFormatHtml(_this.yaxisone[index][1].data[p[0].dataIndex])+'<br/>'+
                    '我的报销:¥'+tenThousandFormatHtml(_this.yaxisone[index][4].data[p[0].dataIndex])+'<br/>'+
                    '本部门报销:¥'+tenThousandFormatHtml(_this.yaxisone[index][2].data[p[0].dataIndex])+'<br/>'+
                    '所有部门报销:¥'+tenThousandFormatHtml(_this.yaxisone[index][3].data[p[0].dataIndex])+'<br/>'

              return text
            }
          },
          legend:{
            show:true,
            data:['','总金额','全部报销','本次报销','我之前的报销','本部门报销','所有部门报销','我的报销','其余报销','本部门的报销','其他部门的报销',],
            top:0,
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
            left: '0%',
            right: '8%',
            bottom: '0%',
            top:'10%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              name: '事项',
              data: _this.xaxis[index],
            }
          ],
          yAxis: [
            {
              type:'value',
              name:"金额",
              nameLocation:"center",
              gridIndex:0,
              splitArea: {show: true},
              nameLocation:'middle',
              nameTextStyle:{
                fontSize: 16,
              },
            },
          ],
          series: [
            {
              name:'标尺',
              type: 'bar',
              stack: 'one',
              barWidth:5,
              data:_this.yaxisone[index][0].data,
            },
            {
              name:'总金额',
              type: 'bar',
              barGap:'20%',
              stack: 'ones',
              barWidth:30,
              emphasis: {
                focus: 'series'
              },
              data:_this.yaxisone[index][0].data,
            },{
              name:'',
              type: 'bar',
              barGap:'20%',
              stack: 'ones',
              barWidth:30,
              emphasis: {
                focus: 'series'
              },
              data:_this.yaxisone[index][0].data,
            },
            {
              name:'全部报销',
              type: 'bar',
              stack: 'oness',
              barGap:'20%',
              barWidth:5,
              emphasis: {
                focus: 'series'
              },
              data:_this.yaxisone[index][3].data,
            },
            {
              name:'本次报销',
              type: 'bar',
              stack: 'onesss',
              barWidth:30,
              barGap:'20%',
              emphasis: {
                focus: 'series'
              },
              data:_this.yaxisY[index][1].data,
            },
            {
              name:'我之前的报销',
              type: 'bar',
              barWidth:30,
              barGap:'20%',
              stack: 'onesss',
              emphasis: {
                focus: 'series'
              },
              data:_this.yaxisY[index][4].data,
            },
            {
              name:'本部门报销',
              type: 'bar',
              stack: 'onesss',
              barGap:'20%',
              barWidth:30,
              emphasis: {
                focus: 'series'
              },
              data:_this.yaxisY[index][2].data,
            },
            {
              name:'所有部门报销',
              type: 'bar',
              stack: 'onesss',
              barWidth:30,
              barGap:'20%',
              emphasis: {
                focus: 'series'
              },
              data:_this.yaxisY[index][3].data,
            },
            {
              name:'我的报销',
              type: 'bar',
              stack: 'onessss',
              barWidth:10,
              barGap:'20%',
              emphasis: {
                focus: 'series'
              },
              data:_this.one,
            },
            {
              name:'其余报销',
              type: 'bar',
              stack: 'onessss',
              barWidth:10,
              barGap:'20%',
              emphasis: {
                focus: 'series'
              },
              data:_this.two,
            },
            {
              name:'本部门的报销',
              type: 'bar',
              stack: 'onesssss',
              barWidth:10,
              barGap:'20%',
              emphasis: {
                focus: 'series'
              },
              data:_this.fou,
            },
            {
              name:'其他部门的报销',
              type: 'bar',
              stack: 'onesssss',
              barWidth:10,
              barGap:'20%',
              emphasis: {
                focus: 'series'
              },
              data:_this.fiv,
            },
          ]
        }

        myChart.setOption(option)
      },
    }
  }
</script>

<style scoped>
  .expressCartogram{
    width: 95%;
    display: flex;
    justify-content: center;
    height: 600px;
    margin-left: 2%;
    border: 1px solid #BFBFBF;
    margin-top: 15px;

  }
  .bccolor{
    width: 95%;
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
.bottom{
    height: 50px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    bottom:0px;
    left: 0;
  background-color: white;
  }
</style>
