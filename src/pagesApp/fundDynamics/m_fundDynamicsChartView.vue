<template>
  <div class="app_main">
    <yhm-app-structure-top-tap>
      <yhm-app-structure-top-tap-menu @call="backEvent" title="返回"></yhm-app-structure-top-tap-menu>
      <yhm-app-structure-top-tap-menu :select="true" :title="fundTitle"></yhm-app-structure-top-tap-menu>
    </yhm-app-structure-top-tap>
    <yhm-app-scroll :empty="false" :init-load-finish="loadFinish">
    <yhm-app-structure-menu-group title="资金动态">
      <template #rgtStructure>
        资金总额：<span v-html="tenThousandFormatShow(fundTotal)"></span>
      </template>
      <div class="fundCharts">
        <div class="chartsImg" ref="chartsImg">
          <canvas id="canvas" ref="canvas"></canvas>
        </div>
        <div class="chartsInfo">
          <div class="chartInfoDetail" v-for="(item,index) in fundChartsData" :key="index">
            <p class="dot" :style="{backgroundColor: item.color}"></p>
            <p class="txt">{{item.name}}</p>
            <div class="moneyDiv">
              <p class="money" :style="{color: item.color}" v-html="tenThousandFormatShow(item.money)"></p>
            </div>
          </div>
        </div>
      </div>
      <div class="fundHist">
        <div class="histInfoBox">
          <span></span>
          <div class="histInfo">
            <div class="histInfoDetail">
              <p class="rect" style="background-color: #49a9ea"></p>
              <p class="txt">今日收入</p>
            </div>
            <div class="histInfoDetail">
              <p class="rect" style="background-color: #f00"></p>
              <p class="txt">今日支出</p>
            </div>
          </div>
        </div>

        <div class="histCharts">
          <div class="shortSize">
            <p v-for="(item,index) in lineDetail" :key="index">{{item.size}}</p>
          </div>
          <div class="shortLine">
            <p v-for="(item,index) in lineDetail" :key="index"></p>
          </div>
          <div class="shortZiseLine" ref="shortZiseLine">
            <p v-for="(item,index) in lineDetail" :key="index"></p>
          </div>
          <div class="abscissalLine">

          </div>
          <p class="abscissa">{{abscissaName}}</p>
          <div class="ordinateName">
            <p v-for="(item,index) in histData" :key="index">
              <img :src="item.bankLogo" width="19">
              <span>{{item.account}}</span>
            </p>
          </div>
          <div class="ordinateLine" ref="ordinateLine">
          </div>
          <div class="ordinateContent">
            <div class="ordinateConLine" v-for="(item,index) in histData" :key="index">
              <div>
                <p class="ordinateRect" ref="incomeRect" :style="{backgroundColor: item.incomeColor}"></p>
                <span class="ordinateTxt" :style="{color: item.incomeColor}" v-html="tenThousandFormatShow(item.income)"></span>
              </div>
              <div>
                <p class="ordinateRect" ref="expendRect" :style="{backgroundColor: item.expendColor}"></p>
                <span class="ordinateTxt" :style="{color: item.expendColor}" v-html="tenThousandFormatShow(item.expend)"></span>
              </div>
              <div class="ordinateBlance">
                <span>余额：</span>
                <span v-html="tenThousandFormatShow(item.balance)"></span>
              </div>
            </div>
          </div>
        </div>
        <div style="width: 100%;height: 2rem"></div>
      </div>
    </yhm-app-structure-menu-group>
    </yhm-app-scroll>
  </div>
</template>

<script>
  import { appviewmixin } from '@/assetsApp/app_view.js'
  export default {
    name: 'm_fundDynamicsChartView',
    mixins: [appviewmixin],
    data () {
      return {
        fundDate:"",
        fundTotal:"",
        fundTitle: '',
        fundChartsData: [],
        abscissaName: '万',
        lineDetail: [],
        histData: [],
      }
    },
    mounted(){

    },
    methods: {
      //返回我的审批页面
      backEvent(){
        this.$router.push("/homeApp/m_myApprovalManager")
      },
      /* 绘制饼状图 */
      initCanvas(){
        this.canvas = this.$refs.canvas
        this.ctx = this.canvas.getContext("2d");

        this.width = $('canvas').css('width')
        this.height = $('canvas').css('height')

        this.canvas.width = parseFloat(this.width)
        this.canvas.height = parseFloat(this.height)

        this.radius = parseFloat(this.width) / 2  + ''
        this.arcWidth =  parseFloat(this.width) /2  + ''
        this.arcHeight =  parseFloat(this.height) /2 + ''

        this.tempAngle = -90

        for(let i in this.fundChartsData){
          this.startAngle = this.tempAngle*Math.PI/180
          this.angle = this.fundChartsData[i].value*360
          this.endAngle = ( this.tempAngle + this.angle) *Math.PI/180

          this.ctx.beginPath();

          this.ctx.moveTo(this.arcWidth,this.arcHeight);
          this.ctx.fillStyle = this.fundChartsData[i].color;

          if(parseFloat(this.fundChartsData[0].value) == 0 && parseFloat(this.fundChartsData[1].value) == 0){
            this.ctx.arc(this.arcWidth,this.arcHeight,this.radius,this.startAngle,2*Math.PI);
            this.ctx.fillStyle = '#fff'
            this.ctx.strokeStyle = '#000'
            this.ctx.stroke()
          }
          this.ctx.arc(this.arcWidth,this.arcHeight,this.radius,this.startAngle,this.endAngle);
          this.ctx.fill();
          this.ctx.closePath();
          this.tempAngle += this.angle

        }
      },
      /* 绘制柱状图 */
      initOrdinate(){
        this.$nextTick(()=>{
          let incomeW = ''
          let expendW = ''
          this.toWidth = 168 / 37.5

          this.histDataList = this.histData
          for(let i in this.histDataList){

            let incomeValW = this.histDataList[i].incomeVal
            let expendValW = this.histDataList[i].expendVal
            incomeW = (incomeValW * this.toWidth) + ''
            expendW = (expendValW * this.toWidth) + ''

            if(parseFloat(incomeValW) == 0){
             incomeW = '0.05'
            }
            if(parseFloat(expendValW) == 0){
              expendW = '0.05'
            }

            this.$refs.incomeRect[i].style.width =  incomeW + 'rem'
            this.$refs.expendRect[i].style.width =   expendW + 'rem'
          }
        })
      },
      /* 计算纵坐标长度 */
      initOrdinateLine(){
        this.len = this.histData.length
        let height = this.len * 2.08 + 0.8
        this.$nextTick(()=>{
          this.$refs.ordinateLine.style.height = height + 'rem'
        })
      },
      /* 计算虚线长度 */
      shortZiseLine(){
        this.len = this.histData.length
        let height = this.len * 2.08
        this.$nextTick(()=> {
          this.$refs.shortZiseLine.style.height = height + 'rem'
        })
      }
    },
    created () {
      this.ajaxJsonMobile({
        url: '/Fin/m_initBankDetailFundsToday',
        call:(data) =>{
          this.fundDate = data.fundDate
          this.fundTotal = data.fundTotal
          this.fundChartsData = data.fundChartsData
          this.abscissaName = data.abscissaName
          this.lineDetail = data.lineDetail
          this.histData = data.histData
          this.initOrdinateLine()
          this.shortZiseLine()
          this.initCanvas()
          this.initOrdinate()
          this.fundTitle =  this.fundDate + '  ' + '资金动态'

          this.$nextTick(()=>{
            this.loadFinish = !this.loadFinish
          })
        }
      })
    }
  }
</script>

<style scoped lang="less">
  @import "../../../static/appStatic/fundDynamisc.css";
  @rem: 375/10rem;

  #canvas{
    width: 68/@rem;
    height: 68/@rem;
  }

</style>
