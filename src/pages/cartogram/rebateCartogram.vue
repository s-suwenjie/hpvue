<template>
    <div>
      <div class="top">
        <yhm-datebox type="year" width="200" height="40px" style="border-radius: 5px;" :maxYear="maxYear" :isSm="true" @call="selectYear"  :value="yearTxt" id="yearTxt" position="b"></yhm-datebox>
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
      <!--统计图渲染标签 避坑 id具有唯一性 不允许当id与其他页面ID相同 否则不显示     -->
      <div id="rebateCartogram" class="rebateCartogram"></div>
      <div style="width: 100%;height: 24px;"></div>
    </div>
</template>

<script>
  import {zero,formatDate ,getDayNumByYearMonth,tenThousandFormatHtml} from '@/assets/common.js'

  export default {
    name: 'rebateCartogram',
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
        title:'',
        moneyMin:'0',
        moneyMax:'1',
        dateMin:'',
        dateMax:'',
        downloadTime:'',
        totalShow:true,
        colorList:['#f15bb5','#eeef20','#00f5d4','#f15bb5','#00bbf9','#ffbf69', '#90e0ef','#9b5de5','#f3ffbd','#70d6ff','#deaaff','#f7d9c4'],//颜色数组

      }
    },
    computed:{
      segmentation(){
        return tenThousandFormatHtml(this.moneyMax+'')
      },
      segmentations(){
        if(!this.moneyMin){
          this.moneyMin = '0'
        }
        return tenThousandFormatHtml(this.moneyMin+'')
      }
    },
    methods: {
      selectYear(year){
        this.year = year
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
          this.initPageData()
        },0)
      },
      rank(type){//排序
        let that = this
        let list = []
        if(type==2){
          if(that.sequence==true){
            list = that.moneyList.sort((a, b) => {return b.money - a.money });/* 从大到小 */
            that.sequence = false
          }else{
            list = that.moneyList.sort((a, b) => {return a.money - b.money });/* 从小到大 */
            that.sequence = true
          }
        }else{
          list = this.moneyList
        }
        that.day = []
        that.money = []
        that.title = that.year + '年'
        for (let i = 0; i < list.length; i++) {
          that.day.push( that.year + '年' + list[i].day + '月')
          that.money.push(list[i].money)
        }

      },
      drawChart () {
        let that = this

        // 基于准备好的dom，初始化echarts实例
        //避坑 id具有唯一性 不允许当id与其他页面ID相同
        let myChart = this.$echarts.init(document.getElementById("rebateCartogram"));
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
          //   data: that.legendList
          // },
          title: {
            text: that.title,
            x:560,
            y:20,
          },
          toolbox: {
            padding: 20,
            show: true,
            x:1010,
            y:0,
            feature: {
              // dataView: {show: true, readOnly: true},
              mark: { show: true, },
              magicType: { show: true, type: ['bar', 'line'] },
              // restore : {show: true},
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
                  that.rank(2)
                  setTimeout(()=>{
                    myChart.setOption({
                      title: {
                        text: that.title,
                      },
                      xAxis: {
                        data: that.day
                      },
                      yAxis: {
                        data: that.money
                      },
                      series: [
                        {
                          // 根据名字对应到相应的系列
                          name: '金额',
                          data: that.money,

                        },
                      ]
                    });
                  },0)
                }
              },
              myTool3: {//自定义按钮 danielinbiti,这里增加，selfbuttons可以随便取名字
                show: true,//是否显示
                title: '重置', //鼠标移动上去显示的文字
                icon: 'path://M9,18a9,9,0,1,1,9-9,9,9,0,0,1-9,9Z' +
                  'M11.85,12.71a5.14,5.14,0,0,1-2.65.8A4.77,4.77,0,0,1,4.34,8.77a4.23,4.23,0,0,1,.43-1.91l.07.43A.48.48,0,0,0,5.76,7L5.2,5.32A.49.49,0,0,0,4.59,5l-1.72.61a.51.51,0,0,0-.31.62.5.5,0,0,0,.61.3l.68-.18a5.85,5.85,0,0,0-.61,2.52,5.84,5.84,0,0,0,5.9,5.79,6,6,0,0,0,3.26-.93.59.59,0,0,0,.19-.74c-.19-.36-.49-.49-.74-.3Zm3.69-1.17a.45.45,0,0,0-.61-.25l-.56.25a5.53,5.53,0,0,0,.74-2.77A5.84,5.84,0,0,0,9.2,3,6.24,6.24,0,0,0,5.88,4a.59.59,0,0,0-.18.74.51.51,0,0,0,.74.12A5.17,5.17,0,0,1,9.14,4,4.76,4.76,0,0,1,14,8.77,4.5,4.5,0,0,1,13.45,11s0,.07-.06.07l-.19-.5a.47.47,0,0,0-.86.37L13,12.58a.45.45,0,0,0,.61.25l1.67-.68a.45.45,0,0,0,.24-.61Z', //图标
                onclick(){//点击事件,这里的option1是chart的option信息
                  that.moneyList = that.backupsList.concat()//深拷贝 还原排序前的数据
                  that.day = []
                  that.money = []
                  for (let i = 0; i < that.moneyList.length; i++) {
                    that.day.push(that.moneyList[i].day)
                    that.money.push(that.moneyList[i].money)
                  }
                  myChart.setOption({//重新渲染数据
                    xAxis: {
                      data: that.day
                    },
                    yAxis: {
                      data: that.money
                    },
                    series: [{
                      // 根据名字对应到相应的系列
                      name: '金额',
                      data: that.money
                    }]
                  });
                }
              },
              saveAsImage: { show: true, name:'支付客户返利' + " " + that.downloadTime},
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
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: '金额',
              data: that.money,
            }
          ],
          series: [
            {
              name: '金额',
              type: 'bar',
              data: that.money,
              barWidth:30,
              markLine : {
                data : [
                  {type : 'average', name: '平均值'}
                ]
              },
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
        // this.forTheMonth()
        let params = {
          year:this.year,
          subjectID:'1'
        }
        this.ajaxJson({
          url: '/Fin/getBankDetailRebateStatistics',
          loading:"0",
          data: params,
          call: (data) => {
            this.moneyList = data
            this.moneyMax = ''
            this.moneyMin = ''
            this.dateMax = ''
            this.dateMin = ''
            this.backupsList = this.moneyList.concat()//将数据集合赋给备份的集合中 深拷贝
            let money = []
            let day  = []
            let maxSchedule = ''
            let minSchedule = ''
            for(let i in data){
              this.day.push(data[i].day)
              this.money.push(data[i].money)
              if(data[i].money!='0'){
                money.push(data[i].money)
                day.push(data[i].day)
              }
            }
            setTimeout(()=>{
              maxSchedule = Math.max.apply(null,money);//最大值
              minSchedule = Math.min.apply(null,money);//最小值
              this.moneyMax = maxSchedule
              this.moneyMin = minSchedule
              this.dateMax = this.year + '年' + day[money.indexOf(maxSchedule)]+ '月'
              this.dateMin = this.year + '年' + day[money.indexOf(minSchedule)] + '月'
              this.elementCountInArray(this.money)//判断数组中全部money字段是否为0

            },0)
            this.rank()
            this.drawChart()//调用echarts实例

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
      this.initPageData()

    },
    mounted() {
      this.drawChart();
    }
  }
</script>

<style lang="less" scoped>
  .top{
    width: 1235px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    margin:auto;
    padding: 16px 20px 24px 20px;
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
      white-space: nowrap;  //强制不换行
      text-overflow:ellipsis; //省略号显示
    }
  }

  .flex{
    display: flex;
    justify-content: space-between;
  }
  .rebateCartogram{
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
</style>

