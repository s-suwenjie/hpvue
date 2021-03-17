<template>
  <div>
    <yhm-managerpage>
      <!--导航条-->
      <template #navigation>提醒中心</template>
      <!--数据表头-->
      <template #listHead>
          <div class="container">

            <div class="viewList caldarView">

              <div class="caldarTit" style="box-sizing: border-box;padding-top: 15px">
                <div style="float: left">
                  <button class="backToday" style="margin:0 6px 0 6px;" @click="years(0)">上一年</button>
                  <button class="backToday" @click="mouths(0)">上一月</button>
                </div>

                <div>
                  <div style="display: flex;align-items:center; ">
                    <button class="backToday" @click="backNowMon" style="vertical-align: center">返回当天</button>
                    <p class="" style="margin: 0 10px;display: inline-block">
                      <yhm-datebox type="month" @call="initDate" style="width: 120px" :value="dateTime" id="dateTime" position="b"></yhm-datebox>
                    </p>
                  </div>
                </div>

                <div style="float: right">
                  <button class="backToday" @click="mouths(1)">下一月</button>
                  <button class="backToday" style="margin:0 6px 0 6px;" @click="years(1)">下一年</button>
                </div>

              </div>

              <div class="caldarCon">
                <div class="weekTit">
                  <p>周一</p>
                  <p>周二</p>
                  <p>周三</p>
                  <p>周四</p>
                  <p>周五</p>
                  <p>周六</p>
                  <p>周日</p>
                </div>
                <div class="monCon">
                  <div class="monConRenminbi" v-for="(item,index) in content" :key="index":class="{'overdue':item.main == 0 || item.main == 3,'today':item.main==1}">
<!--                    :class="item.main == 0 || item.main == 3 ? 'overdue':'';item.main==1?'today':'' "-->
                    <div>
                      <div style="padding: 4px 4px 0 0;overflow: hidden">
                        <div style="height: 27px;" v-if="item.main!=2"></div>
                        <div class="addmore" v-if="item.main==2" @click="addmore(item)">
                          <img src="../../../../static/staticImage/addition.png" alt="">
                        </div>
                      </div>

                      <p class="toDay" >{{item.day}}</p>

                      <div style="padding-top: 10px; display: inline-block" v-for="(it,id) in item.list" :key="id" @click="look(item)">
                        <div style="display: inline-block;position: relative">
                          <img src="../../../../static/staticImage/TipBusiness.png" alt="" v-show="it.category==0">
                          <img src="../../../../static/staticImage/OpenInvoiceSuccess.png" alt="" v-show="it.category==0 && it.state==1" class="overs">
<!--                          v-show="it.category==0"-->
                        </div>
                        <div style="display: inline-block;position: relative">
                          <img src="../../../../static/staticImage/TipFinance.png" alt="" v-show="it.category==1">
                          <img src="../../../../static/staticImage/OpenInvoiceSuccess.png" alt="" v-show="it.category==1 && it.state==1" class="overs">
                        </div>
                        <div style="display: inline-block;position: relative">
                          <img src="../../../../static/staticImage/TipEveryday.png" alt="" v-show="it.category==2">
                          <img src="../../../../static/staticImage/OpenInvoiceSuccess.png" alt="" v-show="it.category==2 && it.state==1" class="overs">
                        </div>
                        <div style="display: inline-block;position: relative">
                          <img src="../../../../static/staticImage/TipMemorialDay.png" alt="" v-show="it.category==3">
                          <img src="../../../../static/staticImage/OpenInvoiceSuccess.png" alt="" v-show="it.category==3 && it.state==1" class="overs">
                        </div>
                        <div style="display: inline-block;position: relative">
                          <img src="../../../../static/staticImage/TipPrivate.png" alt="" v-show="it.category==4">
                          <img src="../../../../static/staticImage/OpenInvoiceSuccess.png" alt="" v-show="it.category==4 && it.state==1" class="overs">
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>

              <div class="bottomimg">
                <div><img src="../../../../static/staticImage/TipBusiness.png" alt=""><span style="color: #7E4923">业务提醒</span></div>
                <div><img src="../../../../static/staticImage/TipFinance.png" alt=""><span style="color: #C0896D">财务提醒</span></div>
                <div><img src="../../../../static/staticImage/TipEveryday.png" alt=""><span style="color: #BC1514">行政提醒</span></div>
                <div><img src="../../../../static/staticImage/TipMemorialDay.png" alt=""><span style="color: #764295">纪念日提醒</span></div>
                <div><img src="../../../../static/staticImage/TipPrivate.png" alt=""><span style="color: #8E703E">私人事务提醒</span></div>
              </div>

            </div>
          </div>
      </template>
    </yhm-managerpage>
  </div>
</template>

<script>
  import { accMul, accAdd, guid, formatDate } from '@/assets/common.js'
  import { selectItem, managermixin } from '@/assets/manager.js'
  export default {
    name: 'warnManager',
    mixins: [managermixin],
    data () {
      return {
        content: [],
        month:'',
        year:'',
        dateTime: ''
      }
    },
    methods:{
      initDate () {
        // this.year=this.dateTime.split('-')[0]
        // this.month=this.dateTime.split('-')[1]

        let params = {
          year:this.year,
          month:this.month,
        }
        this.ajaxJson({
          url: '/dailyoffice/warn/getManagerDate',
          data: params,
          loading: '0',
          call: (data) => {
            // console.log(data.content)
            this.content = data.content
          }
        })
      },
      backNowMon(){
        this.month=new Date().getMonth() + 1
        this.year=new Date().getFullYear()
        this.dateTime = new Date().getFullYear() + '-' + ((new Date().getMonth() + 1) < 10 ? 0 :'') + (new Date().getMonth() + 1)
        this.initDate()
      },
      years(n){
        if(n==0){
          this.year=Number(this.year)-1
        }else{
          this.year=Number(this.year)+1
        }
        this.dateTime=this.year+'-'+this.month
        this.initDate()
      },
      mouths(n){
        if(n==0){
          this.month=Number(this.month)-1

          if(this.month<1){
            this.year=Number(this.year)-1
            this.month=12
          }

        }else{
          this.month=Number(this.month)+1

          if(this.month>12){
            this.year=Number(this.year)+1
            this.month=1
          }
        }
        this.dateTime=this.year+'-'+this.month

        this.initDate()
      },
      addmore(item){
        this.$dialog.OpenWindow({
          width: 1050,
          height: 720,
          url:'/warnForm?year='+this.year+'&month='+this.month+'&day='+item.day,
          title:'添加提醒',
          closeCallBack:(data) =>{
            this.initDate()
          }
        })
      },
      look(item){
        this.$dialog.OpenWindow({
          width: 1050,
          height: 720,
          url:'/warnDetailform?year='+this.year+'&month='+this.month+'&day='+item.day,
          title:'查看相关提醒事项',
          closeCallBack:(data) =>{
            // this.initDate()
          }
        })
      }
    },
    created () {
      this.month=new Date().getMonth() + 1
      this.year=new Date().getFullYear()
      this.dateTime = this.year + '-' + (this.month<10?0:'') + this.month
      this.initDate()
    }
  }
</script>

<style scoped lang="less">
  /* 日历样式 */
  .formtextbox .context .content .box{
    width: 180px !important;
  }
  .formtextbox{
    background-color: transparent !important;
  }
  .formtextbox .context .title{
    display: none !important;
  }
  /* 页面原有样式 */
  .caldarView {
    width: 100%;
    padding-bottom: 16px;
  }
  .caldarTit {
    margin: 16px 25px 16px 25px;
    text-align: center;
    height: 62px;
    background-color: #e9e9e9;
    box-shadow: 0 0 1px 0
    #999999;
    border-radius: 4px;
    div{
      display: inline-block;
    }
  }
  .headerTop{
    display: flex;
    align-items: center;
  }
  .icon-rmb2:before{
    font-size: 16px;
  }
  .toDayIcon:before{
    color: #f18806 !important;
  }
  .grayDayIcon:before{
    color: #bfbfbf !important;
  }
  .afterDayIcon:before{
    color: #49a9ea !important;
  }

  .redIcon:before{
    color: #f00 !important;
  }
  .blueIcon:before{
    color: #49a9ea !important;
  }

  .beforeDay{
    background-color: #d9d9d9 !important;
  }

  .afterDay{
    background-color: #d4ecfc !important;
  }
  .weekend{
    p{
      color: #f47564 !important;
    }
  }

  .redBg{
    background-color: #FFD8D8 !important;
  }
  .blueBg{
    background-color: #d6efff !important;
  }

  .toDayNow{
    background-color: #fdffd6 !important;
  }

  .bgNone{
    background-color: #fff !important;
  }
  .lastMonth{
    background-color: #fff !important;
  p{
    color: #999 !important;
  }
  }
  .otherMonth{
    background-color: #ccc !important;
  p{
    color: #999 !important;
  }
  }
  .notAll{
    cursor: not-allowed !important;
  }
  .caldarTit .backToday {
    height: 32px;
    background-color: #49a9ea;
    color: #fff;
    font-family: MicrosoftYaHei;
    font-size: 14px;
    padding: 0 10px;
    border: 1px solid #49a9ea;
    cursor: pointer;
  }
  .caldarTit .backToday:hover {
    background-color: #49a9ea;
    color: #fff;
  }
  .nowDate {
    display: flex;
    justify-content:center;
    width: 123px;
    height: 32px;
    background-color: #fff;
    border-radius: 4px;
    border: solid 1px #d9d9d9;
    margin:  0 20px;
  }
  .nowDate .solarDate {
    display: inline-block;
    font-size: 14px;
    color: #333;
    cursor: pointer;
    margin: 7px 0 0 10px;
  }
  .nowDate a{
    align-items: center;
    display: inline-block;
    width: 18px;
    height: 18px;
    margin: 7px 0 0 10px  ;
  }
  .nowDate .solarDate:hover {
    text-decoration: none;
  }
  .calderArrow {
    display: inline-block;
    height: 24px;
    a {
      display: inline-block;
      width: 24px;
      height: 24px;
      margin: 0 4px;
    }
  }
  .icon-rmb2{
    border-radius: 50%;
  }
  .caldarCon {
    margin: 0 26px;
    background-color: #a6d3ef;

    border-left: 1px solid #bfbfbf;
  }
  .weekTit {
    height: 48px;
    display: flex;
    justify-content: space-between;
    flex-wrap: nowrap;
    border-radius: 8px 8px 0 0;
  p {
    display: inline-block;
    text-align: center;
    line-height: 51px;
    color: #333;
    font-size: 14px;
    width: 221px;
    box-sizing: border-box;
    border:1px solid #ffffff;
  }
  }
  .monCon {
    overflow: hidden;
    background-color: #fff;
    box-shadow: 0 0 1px 0 #999;
    border-radius: 0 0 8px 8px;
    display: flex;
    flex-wrap: wrap;
  }
  .ammount{
    display: flex;
    justify-content: center;
  .cdRenminbi{
    margin-left: 10px;
  }
  .cdRenmArr{
    color: #fff;
    background-color: red;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    line-height: 20px;
    font-size: 10px;
  }
  }
  .monCon .toDay {

    height: 20px;
    text-align: center;
  }
  .monCon>.monConError:hover{
    background-color:#f6acac;
  }
  .ammount .monConError .calderArrow {
    color: #fff;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    line-height: 20px;
    font-size: 10px;
    background-color: #f6acac;
  }
  .monCon > div {
    width: 216px;
    height: 93px;

    text-align: center;
    cursor: pointer;
    position: relative;
  }
  .monCon > div > span {
    margin-top: 5px;
    display: inline-block;
    font-size: 18px;
    line-height: 26px;
    text-align: center;
    color: #999;
  }
  .monConRenminbi{
    margin-right: 2px;
    margin-top: 2px;
    box-sizing: border-box;
    background-color: #D9D9D9;
    color: #333;
    .ammount{
      display: flex;
      align-items: center;
    }
    .toDay{
      font-size: 16px;
      font-weight: 700;
    }
  }
  .monConRenminbi:nth-child(7n+1){

    margin-left: 1px;
  }
  .monConRenminbi:nth-child(7n-1){
    background-color: #FFAC89;
    color: #ffffff;
  }
  .monConRenminbi:nth-child(7n){
    background-color: #FFAC89;
    margin-right: 0;
    color: #ffffff;
  }
  .monConRenminbi:hover {
    background-color: #d4ecfc;
  }
  .dateProfit {
    overflow: hidden;
    font-size: 14px;
    line-height: 14px;
    color: #333;
    padding: 0 5px;
    span {
      display: inline-flex;
      white-space: nowrap;
      width: 100%;
      justify-content: space-between;
      color: #999;
    }
    .balance em {
      color: #333;
    }
  }
  .addNum {
    color: #333333;
    font-size: 14px;
  }
  .overdue{
    background-color: #D9D9D950 !important;
    color: #00000050  !important;
  }
  .today{
    background-color: #00000070 !important;
    color: #ffffff  !important;
  }
  .addmore{
    /*padding: 4px 4px;*/
    /*border-radius: 12px;*/
    font-size: 15px;
    float: right;
    /*background-color: #49A8EA !important;*/
    img{
      width: 100%;
    }
  }
  .bottomimg{
    padding-top: 25px;
    div{
      height: 25px;
      /*line-height: 25px;*/
      overflow: hidden;
      display: inline-block;
      font-size: 20px;
      margin-left: 25px;
      font-weight: 700;
      img{
        float: left;
      }
    }
  }
  .overs{
    position: absolute;
    z-index: 3;
    bottom: -5px;
    left: 0;
  }
</style>
