<template>
  <div>
    <div class="bccolor">
      <div id="myreimbursementTwoCartogram" class="expressCartogram"></div>
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
    name: 'myreimbursementTwoCartogram',
    mixins: [formmixin],
    data(){
      return{
        List:[],
        xaxis:[],
        yaxisone:[],
        one:[],
        two:[],
        the:[],
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
            for(let i in data.content.xAxis){
              this.xaxis.push(data.content.xAxis[i][0])
            }

            for(let i in data.content.series){
              this.one.push(data.content.series[i][0].data[0])
              // this.two.push('500')
              // this.one.push('500')
              // this.one.push('500')
              // this.one.push('500')
              this.two.push(data.content.series[i][1].data[0])
              this.the.push(data.content.series[i][2].data[0])
              this.fou.push(data.content.series[i][3].data[0])
              this.fiv.push(data.content.series[i][4].data[0])
              // this.fiv.push('30')
            }

            this.yaxisY = JSON.parse(JSON.stringify(data.content.series))

            this.yaxisone=data.content.series//备份数据

            for(let i in this.yaxisY){
              let n='Cartogram'+i
              this.Cartogram.push(n)

              // for(let item in this.yaxisY[i][2].data){
              //   this.yaxisY[i][2].data[item]=Number(data.content.series[i][2].data[item])-(Number(data.content.series[i][1].data[item])+Number(data.content.series[i][4].data[item]))
              //   this.yaxisY[i][3].data[item]=Number(data.content.series[i][3].data[item])-Number(data.content.series[i][2].data[item])
              //   let a=Number(data.content.series[i][1].data[item])+Number(data.content.series[i][4].data[item])
              //   let b=Number(data.content.series[i][3].data[item])-(Number(data.content.series[i][1].data[item])+Number(data.content.series[i][4].data[item]))
              //   let c=Number(data.content.series[i][2].data[item])
              //   let d=this.yaxisY[i][3].data[item]
              //
              //   this.one.push(a)
              //   this.two.push(b)
              //   this.fou.push(c)
              //   this.fiv.push(d)
              // }

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
        let myChart = this.$echarts.init(document.getElementById('myreimbursementTwoCartogram'))

        let option = {
          color: ['#FA6868','#73C0DE',"#1FE3A5",'#F38387','#F8D17B','#91CC75','#5470C6','#3BA272','#FC8452','#E58FD3'],

          tooltip : {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            },
            formatter(p){
              // console.log(p)
              let text=""
              text = p[0].name+'<br/>'+
                '总金额:¥'+tenThousandFormatHtml(p[0].value)+'<br/>'+
                '总报销:¥'+tenThousandFormatHtml(p[1].value)+'<br/>'+
                '本次报销:¥'+tenThousandFormatHtml(p[2].value)+'<br/>'+
                '以前报销:¥'+tenThousandFormatHtml(p[3].value)+'<br/>'+
                '本部门报销:¥'+tenThousandFormatHtml(p[4].value)+'<br/>'+
                '所有部门报销:¥'+tenThousandFormatHtml(p[5].value)+'<br/>'

              return text
            }
          },
          legend:{
            show:true,
            data:['总金额','总报销','本次报销','以前报销','本部门报销','所有部门报销'],
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
              data: _this.xaxis,
            }
          ],
          yAxis: [
            {
              type:'value',
              name:"金额",
              nameLocation:"end",
              gridIndex:0,
              splitArea: {show: true},
              nameTextStyle:{
                fontSize: 16,
              },
            },
          ],
          series: [
            {
              name:'总金额',
              type: 'bar',
              barGap:'50%',
              stack: 'one',
              barWidth:30,
              emphasis: {
                focus: 'series'
              },
              data:_this.one,
            },
            {
              name:'总报销',
              type: 'bar',
              barGap:'50%',
              stack: 'ones',
              barWidth:30,
              emphasis: {
                focus: 'series'
              },
              data:_this.the,
            },
            {
              name:'本次报销',
              type: 'bar',
              barGap:'50%',
              stack: 'oness',
              barWidth:30,
              emphasis: {
                focus: 'series'
              },
              data:_this.two,
            },
            {
              name:'以前报销',
              type: 'bar',
              barGap:'50%',
              stack: 'oness',
              barWidth:30,
              emphasis: {
                focus: 'series'
              },
              data:_this.fiv,
            },
            {
              name:'本部门报销',
              type: 'bar',
              barGap:'50%',
              stack: 'onesss',
              barWidth:30,
              emphasis: {
                focus: 'series'
              },
              data:_this.the,
            },
            {
              name:'所有部门报销',
              type: 'bar',
              barGap:'50%',
              stack: 'onessss',
              barWidth:30,
              emphasis: {
                focus: 'series'
              },
              data:_this.fou,
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
