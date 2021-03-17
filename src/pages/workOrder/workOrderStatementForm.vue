<template>
   <div class="main">
     <div class="mainCenter">
       <div class="tableMain" style="margin-bottom: 60px;">
         <div class="tableMainTop">
           <img src="https://hp.yhm.hk/UploadFile/hp.png" width="64" height="64" alt="">
           <h1 style="font-weight: bold;">北京海派奥特经贸有限公司</h1>
         </div>
         <div class="tableMainTitle">
           <div class="tableMainTitleLeft">
             <h3>往来账目客户对账账单</h3>

             <p>打印日期:{{currentDate}}</p>
           </div>
           <div class="tableMainTitleRight">
             <p>
               <span style="text-align: right;padding-right: 6px;">客户名称:</span>
               <span style="text-align: right;padding-right: 5px;">{{otherName}}</span>
             </p>
             <p>
               <span style="text-align: right;padding-right: 6px;">金额(人民币):</span>
               <span style="text-align: right;" v-html="getTxt(totalMoney)"></span>
             </p>
             <div style="text-align: right;height: 38px;line-height: 38px;font-size: 13px;padding-right: 5px;">
               {{vehicleInformation}}
             </div>
           </div>
         </div>
<!--         :style="{height: bankDetailList.length>9?(bankDetailList.length-9)*40+(480+printMainHeight)+'px':'auto'}"-->
         <div class="tableMainCenter" style="height: auto;">
           <div class="tableMainItemLeft">
             <div class="tableMainCenterTitle" style="background-color: #DCDBDB;font-size: 16px;font-weight: 600;">
               我公司收到的款项
             </div>
             <div class="tableMainCenterTitle" style="background-color: #DCDBDB;">
               <span style="width: 80px;">日期</span>
               <span style="flex: 1;border-right:2px solid #333;border-left:2px solid #333;">事由</span>
               <span style="width: 146px;">金额(人民币)</span>
             </div>
             <div class="tableMainCenterTr" v-for="(item,index) in bankDetailList" :key="index" :class="{'printThePage':item.className}" style="cursor: pointer;">
               <span style="width: 80px;" :title="item.cccurDate">{{item.cccurDate}}</span>
               <span class="tableMainCenterTrSubject" :title="item.subject">{{item.subject}}</span>
               <span style="width: 146px;text-align: right;" v-if="!item.conceal" v-html="getTxt(item.money+'')"></span>
               <span style="width: 146px;text-align: right;" v-else></span>

             </div>
<!--             <div class="tableMainCenterTr" style="display: flex;justify-content: center;align-items: center;font-weight: bold;">-->
<!--               <span style="width: 80px;height: 40px;display: flex;align-items: center;"></span>-->
<!--               <span style="flex: 1;height: 40px;justify-content: center;border-right:2px solid #333;border-left:2px solid #333;display: flex;align-items: center;">-->
<!--                              -&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;以下为空-&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;-->
<!--               </span>-->
<!--               <span style="width: 146px;height: 40px;text-align: right;display: flex;align-items: center;"></span>-->
<!--             </div>-->
<!--             <div class="tableMainCenterTr" v-for="index in 31" :key="index">-->
<!--               <span style="width: 80px;height: 40px;display: flex;align-items: center;"></span>-->
<!--               <span style="flex: 1;height: 40px;border-right:2px solid #333;border-left:2px solid #333;display: flex;align-items: center;"></span>-->
<!--               <span style="width: 146px;height: 40px;text-align: right;display: flex;align-items: center;"></span>-->
<!--             </div>-->
             <div class="tableMainCenterTitle2" style="border-bottom: none;">
               <span style="width: 375px;border-right:2px solid #333;font-style: italic;font-weight: bold;font-size: 16px;">合计</span>
<!--               moneyCheck=='0'?Number(sumMoney)+Number(balance):Number(sumMoney)-->
               <span style="flex: 1;text-align: right;" v-html="getTxt(bankDetailMoney+'')"></span>
             </div>
           </div>
           <div class="tableMainItemMiddle"></div>
           <div class="tableMainItemRight">
             <div class="tableMainCenterTitle" style="background-color: #DCDBDB;font-size: 16px;font-weight: 600;">
               业务结算款项
             </div>
             <div class="tableMainCenterTitle" style="background-color: #DCDBDB;">
               <span style="width: 80px;">日期</span>
               <span style="flex: 1;border-right:2px solid #333;border-left:2px solid #333;">事由</span>
               <span style="width: 60px;border-right:2px solid #333;">类型</span>
               <span style="width: 116px;">金额(人民币)</span>
             </div>
             <div class="tableMainCenterTr" v-for="(item,index) in list" :key="index" :class="{'printThePage':item.className}">
               <span style="width: 80px;">{{item.insertDate}}</span>
               <span class="tableMainCenterTrSubject2">{{item.name}}</span>
               <span style="width: 60px;border-right:2px solid #333;">{{item.typeVal}}</span>
               <span style="width: 116px;text-align: right;" v-html="getTxt(item.money+'')"></span>
             </div>

             <div class="tableMainCenterTitle2" style="border-bottom: none;">
               <span style="width: 344px;border-right:2px solid #333;font-style: italic;font-weight: bold;font-size: 16px;">合计</span>
               <span style="flex: 1;text-align: right;" v-html="getTxt(totalMoney+'')"></span>
             </div>
             <div v-if="list.length=='1'" style="width: 100%;height: 2px;border-top: 2px solid #333;"></div>
           </div>
         </div>
         <div style="height: 32px;line-height: 32px;border-top:2px solid #333;text-align: center;font-size: 15px;" :style="{color:(Number(bankDetailMoney)-Number(totalMoney)).toFixed(2)<0?'#f00':''}">
<!--           moneyCheck=='0'?((Number(sumMoney)+Number(balance))-Number(totalMoney)).toFixed(2):(Number(sumMoney)-Number(totalMoney)).toFixed(2)-->
           资金金额：{{(Number(bankDetailMoney)-Number(totalMoney)).toFixed(2)}}
         </div>
         <div style="height: 64px;line-height: 64px;display: flex;justify-content: space-between; border-top:2px solid #333;text-align: center;font-size: 15px;" :style="{color:(Number(bankDetailMoney)-Number(totalMoney)).toFixed(2)<0?'#f00':''}">
            <div style="width: 60px;height: 100%;border-right: 2px solid #333;">
              声明
            </div>
           <div style="width: 75px;height: 100%;border: 2px solid #333;border-top:none;border-bottom:none;margin-right: 220px;">
             客户签字
           </div>
         </div>
       </div>


     </div>
     <div style="position: fixed;bottom: 0;left: 0;right: 0;display: flex;justify-content: center;">
       <yhm-commonbutton value="打印或保存PDF" style="margin: 10px 0" id="noprint" icon="btnSave" :flicker="true" @call="printClick"></yhm-commonbutton>
       <yhm-commonbutton value="结账" v-show="state=='18'" style="margin: 10px 20px" id="noprint2"  icon="i-btn-applicationSm" :flicker="true" @call="settleAccounts((Number(bankDetailMoney)-Number(totalMoney)).toFixed(2),category)"></yhm-commonbutton>

     </div>
   </div>
</template>

<script>
  import { formmixin } from '@/assets/form.js'
  import { tenThousandFormatHtml } from '@/assets/common.js'

  export default {
    name: 'workOrderStatementForm',
    mixins: [formmixin],
    data(){
      return{
        list:[],
        carid:'',//联系人
        state:'',//工单状态
        subid:'',//保险公司id
        printMainHeight:0,//表格主体高度
        balance:'',
        category:'',//维修类型
        currentDate:'',//当前日期
        otherName:'',//对方
        sumMoney:'',//收支明细总金额
        totalMoney:'0',//合计金额
        fixOrderDetail:[],//工单服务列表
        fixOrderMaterial:[],//配件信息列表
        directionList:[],//收支方向类型
        bankDetailList:[],//收支明细列表
        bankDetailMoney:0,//收支明细列表合计金额
        vehicleInformation:'',//车辆信息详情
      }
    },
    computed:{
      getTxt(){
        return function (val) {
          return tenThousandFormatHtml(val) + '&nbsp;'
        }
      }
    },
    methods:{
      settleAccounts(money,category){
        // let money
        // if(this.moneyCheck=='0'){
        //   money = (Number(this.sumMoney)+Number(this.balance))-Number(this.totalMoney)
        // }else{
        //   money = Number(this.sumMoney)-Number(this.totalMoney)
        // }
        if(Number(money) >= 0&&category=='1'){//结账金额等于0时表示 支付金额足够 可以正常结账
          this.$dialog.confirm({
            tipValue: '是否确认结账并通知客户取车？',
            btnValueOk: '确认',
            btnValueCancel: '取消',
            width:'400',
            okCallBack: () => {
              this.ajaxJson({
                url: '/fix/fixOrder/Billdoing',
                data: {
                  orderid:this.orderid,
                  money:this.balance,
                  carid:this.carid,
                  actmoney:this.sumMoney
                },
                call: (data) => {
                  if (data.type === 0) {
                    this.state = ''
                    this.$dialog.alert({
                      tipValue: data.message,
                      closeCallBack: () => {
                        window.location.href = window.location.origin+'/home/receptionManager'
                        // this.$dialog.close()
                      }
                    })
                  } else {
                    this.$dialog.alert({
                      alertImg: 'error',
                      tipValue: data.message,
                      closeCallBack: () => {
                      }
                    })
                  }
                }
              })
            }
          })
        }else if(category=='0'){//支付金额不足并且是保险理赔时
          // if(this.subid==''){
          //   this.$dialog.alert({
          //     tipValue:'保险公司id为空,',
          //     alertImg:'warn',
          //     width:'400',
          //     closeCallBack: () => {
          //     }
          //   })
          // }
          $('html,body').animate({'scrollTop':0},0)

          this.ajaxJson({
            url: '/fix/fixOrderUnitConcat/verification',
            data: {
              orderid:this.orderid,
            },
            call: (data) => {
              if(data.type=='2'){
                // this.$dialog.confirm({
                //   tipValue: '保险理赔需要上传保险资料进行结账,是否前往？',
                //   btnValueOk: '确认',
                //   btnValueCancel: '取消',
                //   width:'450',
                //   okCallBack: () => {
                //     document.querySelector('body').setAttribute('style','overflow:auto;')
                    this.$dialog.OpenWindow({
                      width: 1050,
                      height: 720,
                      url:'/workOrderClaimDataForm?isFlag=1&id='+this.subid+'&type='+data.type+'&orderID='+this.orderid,
                      title:'创建保险公司并上传保险公司资料',
                      closeCallBack:(data)=>{
                        if(data){
                          window.location.href = window.location.origin+'/home/receptionManager'

                        }
                      }
                    })
                //   }
                // })
              }else{
                // this.$dialog.confirm({
                //   tipValue: '保险理赔需要上传保险资料进行结账,是否前往？',
                //   btnValueOk: '确认',
                //   btnValueCancel: '取消',
                //   width:'450',
                //   okCallBack: () => {
                //     document.querySelector('body').setAttribute('style','overflow:auto;')
                    this.$dialog.OpenWindow({
                      width: 1050,
                      height: 720,
                      url:'/workOrderClaimDataForm?isFlag=1&type=1&id='+this.subid+'&orderID='+this.orderid,
                      title:'上传保险公司资料',
                      closeCallBack:(data)=>{
                        if(data){
                          window.location.href = window.location.origin+'/home/receptionManager'

                        }
                      }
                    })
                //   }
                // })
              }

            }
          })
          // if(data.type=='2'){
          //   this.$dialog.confirm({
          //     tipValue: '因当前保险公司未添加条约,是否打开添加条约页面？',
          //     btnValueOk: '确认',
          //     btnValueCancel: '取消',
          //     width:'450',
          //     okCallBack: () => {
          //       this.$dialog.OpenWindow({
          //         width: 1050,
          //         height: 720,
          //         url:'/workOrderClaimDataForm?id='+this.subid,
          //         title:'上传保险公司资料',
          //         closeCallBack:(data)=>{
          //           if(data){
          //             this.initData()
          //           }
          //         }
          //       })
          //     }
          //   })
          // }
          // this.$dialog.confirm({
          //     tipValue: '因资金不足无法结账,是否上传保险资料进行结账？',
          //     btnValueOk: '确认',
          //     btnValueCancel: '取消',
          //     width:'450',
          //     okCallBack: () => {
          //       this.$dialog.OpenWindow({
          //         width: 1050,
          //         height: 720,
          //         url:'/workOrderClaimDataForm?id='+this.subid,
          //         title:'上传保险公司资料',
          //         closeCallBack:(data)=>{
          //           if(data){
          //             this.initData()
          //           }
          //         }
          //       })
          //     }
          // })
        }else{
          this.$dialog.alert({
            tipValue:'付款金额不足,无法结账',
            alertImg:'warn',
            width:'330',
            closeCallBack: () => {
            }
          })
        }

      },
      printClick(){
        window.print()
      },
      initData () {
        let params = {
          orderid:this.orderid,
        }
        this.ajaxJson({
          url: '/fix/fixOrder/queryForOrderCheck',
          data: params,
          call: (data) => {
            if(data){
              this.state = data.order.state//工单状态
              this.totalMoney = data.totalMoney//合计金额
              this.fixOrderDetail = data.fixOrderDetail.list//工单服务列表
              this.fixOrderMaterial = data.fixOrderMaterial.list//配件信息列表
              this.directionList = data.fixOrderDetail.directionPsd.list//收支方向类型
              this.sumMoney = data.summary.sumMoney
              this.category = data.order.category//维修类型
              this.subid = data.order.subid//d
              for(let i in data.summary.list){
                if(data.summary.list[i].type=='0'){
                  this.bankDetailList.push({
                    id: data.summary.list[i].id,
                    type:'0',
                    insertDate: data.summary.list[i].cccurDate,
                    num:this.bankDetailList.length+1+'',
                    selfAccount:data.summary.list[i].bankName + data.summary.list[i].account,
                    cccurDate:data.summary.list[i].cccurDate,//交易日期
                    otherName:data.summary.list[i].otherName+data.summary.list[i].otherAount,//对方账户
                    subject:data.summary.list[i].subject,
                    money:data.summary.list[i].actualMoney,
                    // useMoney:datas.useMoney,
                    remark:data.summary.list[i].remark,
                    dependid:data.summary.list[i].dependid,
                  })
                }
              }
              this.carid = data.order.vehicleID
              this.otherName = data.order.contactPerson//联系人
              this.ajaxJson({
                url: '/fix/IWxBalance/getBalanceByvehicleID',
                data: {
                  id:data.order.vehicleID
                },
                call: (data) => {
                  this.balance = data.balance
                  if(Number(this.balance)>Number(this.totalMoney)){
                    this.balance = this.totalMoney
                  }
                  // this.sumMoney==this.totalMoney?0:Number(this.totalMoney)-(this.balance+this.sumMoney)
                  // console.log(Number(this.sumMoney)==Number(this.totalMoney),this.sumMoney,this.totalMoney)
                  // console.log(Number(this.sumMoney)==Number(this.totalMoney)?0:Number(this.totalMoney)-(Number(this.balance)+Number(this.sumMoney)))
                  if(this.moneyCheck=='0'){
                    this.bankDetailList.push({
                      id: '',
                      type:'0',
                      insertDate: '-----',
                      num:this.bankDetailList.length+1+'',
                      selfAccount:'',
                      cccurDate:'-----',//交易日期
                      otherName:'',//对方账户
                      subject:'代金券',
                      money:Number(this.sumMoney)==Number(this.totalMoney)?0:Number(this.totalMoney)-Number(this.sumMoney)<=Number(this.balance)?Number(this.totalMoney)-Number(this.sumMoney):Number(this.balance),
                      // useMoney:datas.useMoney,
                      remark:'',
                      dependid:'',
                    })

                  }
                  for(let i in this.bankDetailList){
                    console.log(this.bankDetailList[i].money)
                    if(this.bankDetailList[i].money!=undefined){
                      this.bankDetailMoney += Number(this.bankDetailList[i].money)
                    }
                  }
                }
              })

              let item
              for(let i in this.fixOrderDetail){
                item = {
                  name:'',
                  money:'',
                  typeVal:'',
                  className:false,//
                  insertDate:''
                }

                item.name = this.fixOrderDetail[i].name//服务名称
                item.money = this.fixOrderDetail[i].money//服务金额
                item.typeVal = '项目服务'
                item.insertDate = this.fixOrderDetail[i].insertDate.substring(0,10)
                this.list.push(item)
              }
              for(let i in this.fixOrderMaterial){
                item = {
                  name:'',
                  money:'',
                  typeVal:'',
                  insertDate:''
                }
                item.name = this.fixOrderMaterial[i].product//配件名称
                item.money = this.fixOrderMaterial[i].money//配件金额
                item.typeVal = '材料配件'
                item.insertDate = this.fixOrderMaterial[i].insertDate.substring(0,10)
                this.list.push(item)
              }

              this.ajaxJson({
                url: '/Basic/initVehicleForm',
                loading:'0',
                data: {
                  id:data.order.vehicleID
                },
                call: (data) => {
                  this.vehicleInformation = data.brand + '    ' + data.model + '    ' + data.color + '    ' + data.plate
                  console.log(data)
                }
              })


              setTimeout(()=>{
                let initial = true
                if(this.bankDetailList.length>this.list.length){
                  for(let i=0; i<this.bankDetailList.length; i++){
                    console.log('111111111',i,this.list.length)
                    if(i>=this.list.length){
                      this.list.push([])
                    }
                  }
                }else if(this.bankDetailList.length<this.list.length){
                  for(let i=0; i<this.list.length; i++){
                    console.log('222222222222',i,this.bankDetailList.length)
                    if(i>=this.bankDetailList.length){
                      if(initial){
                        this.bankDetailList.push({subject:'-----------以下为空---------',conceal:true})
                        initial = false
                      }else{
                        this.bankDetailList.push({conceal:true})
                      }
                    }
                  }
                }
                let num = 10
                let num2 = 10
                let index = 0
                let index2 = 0
                for(let i in this.list){
                  // console.log(i,i%num)
                  if(i!=0&&i%num==0&&index==0){
                    num = 29
                    index++
                    this.list[i].className = true
                  }else if(i==29&&index==1){
                    num = 19
                    this.list[i].className = true

                  }
                }
                for(let i in this.bankDetailList){
                  // console.log(i,i%num)
                  if(i!=0&&i%num2==0&&index2==0){
                    num2 = 29
                    index2++
                    this.bankDetailList[i].className = true
                    this.printMainHeight = 12
                  }else if(i==29&&index2==1){
                    num2 = 19
                    this.bankDetailList[i].className = true
                    this.printMainHeight = 12
                  }
                }
                console.log(this.list,this.bankDetailList)

              },0)

              // this.otherName = this.bankDetailList[0].otherName//对方


            }
          }
        })
      }
    },
    created () {
      this.setQuery2Value('orderid')
      // this.setQuery2Value('otherName')
      this.setQuery2Value('moneyCheck')
      // this.setQuery2Value('balance')
      // this.setQuery2Value('carid')

      let datetime = new Date();
      let year = datetime.getFullYear();
      let month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
      let date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
      this.currentDate = year + '-' + month + '-' + date
      this.initData()
    }
  }
</script>
<style type="text/css" media="print">
@media print{
  #noprint{
     display:none
  }
  #noprint2{
    display:none
  }
  .printThePage{
    /*background-color: #FF0000 !important;*/
    margin-top: 30px;
    border-top: 2px solid #333;
  }
  .tableMainCenterTitle2{
    min-height: 40px;
    height: 40px;
    display: flex;
    align-items: center;
  }
  body,html{
    background-color: #fff;
  }
.tableMainCenter{
  height: auto !important;
}
}

</style>
<style lang="less" scoped>
  span{
    display: inline-block;
    text-align: center;

  }
  p,span,div,h1,h3{

    font-family:"楷体";

  }
  body,html{
    overflow: auto !important;
  }

.main{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.mainCenter{
  width: 1200px;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 55px 55px 0;
  box-sizing: border-box;
  position: absolute;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #fff;
}
.tableMain{
  width: 100%;
  height: 100%;
  border: 2px solid #333;
  .tableMainTop{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80px;
    border-bottom: 2px solid #333;
    img{
      margin-right: 30px;
    }
    h1{
      font-size: 26px;
      letter-spacing: 30px
    }
  }
  .tableMainTitle{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100px;
    border-bottom: 2px solid #333;
    .tableMainTitleLeft{
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border-right: 2px solid #333;

      h3{
        font-size: 18px;
      }
      p{
        margin-top: 20px;
        font-weight: 500;
        font-size: 16px;
      }
    }
    .tableMainTitleRight{
      width: 400px;
      height: (100%-8px);
      margin: 2px;
      border: 2px solid #333;
      p{
        display: flex;
        justify-content: center;
      }
      p span{
        height: 25px;
        line-height: 25px;
        text-indent: 6px;
        display: inline-block;
      }
      p span:nth-child(odd){
        width: 90px;
        border-bottom:2px solid #333;
      }
      p span:nth-child(even){
        flex: 1;
        border-bottom:2px solid #333;
        border-left:2px solid #333;

      }

    }
  }
  .tableMainCenterTr:nth-child(even){
    background-color: #DCDBDB;
  }
  /*.tableMainCenterTitle:nth-child(even){*/
  /*  flex: 1;*/
  /*  border-bottom:2px solid #333;*/
  /*  border-left:2px solid #333;*/

  /*}*/
  .tableMainCenter{
    width: 100%;
    height: auto;
    box-sizing: border-box;
    display: flex;
    justify-content: center;

    .tableMainItemMiddle{
      height: 100%;
      flex: 1;
      border-right:2px solid #333;
      border-left:2px solid #333;
    }
    .tableMainItemLeft{
      border:2px solid #333;
      width: 48%;
      margin: 4px;
      .tableMainCenterTitle{
        height:32px;
        line-height:32px;
        display: flex;
        justify-content: space-between;
        justify-content: center;
        font-size: 15px;
        border-bottom:2px solid #333;
        span{
          display: inline-block;
          text-align: center;
        }
      }
      .tableMainCenterTitle2{
        height: 40px;
        line-height: 40px;
        display: flex;
        /*justify-content: space-between;*/
        justify-content: center;
        font-size: 15px;
        border-bottom:2px solid #333;
      }
      .tableMainCenterTr{
        height:40px;
        line-height:40px;
        display: flex;
        text-align: left;
        box-sizing: border-box;
        border-bottom:2px solid #333;

        .tableMainCenterTrSubject{
          flex: 1;
          border-right:2px solid #333;
          border-left:2px solid #333;
          display: flex;
          align-items: center;
          line-height: normal;
          justify-content: center;
        }


        span{
          /*overflow: hidden;*/
          white-space: revert;
          /*text-overflow: ellipsis;*/
        }

      }
    }
    .tableMainItemRight{
      border:2px solid #333;
      width: 48%;
      margin: 4px;
      .tableMainCenterTitle{
        height:32px;
        line-height:32px;
        display: flex;
        justify-content: center;
        font-size: 15px;
        border-bottom:2px solid #333;

      }
      .tableMainCenterTitle2{
        height: 40px;
        line-height: 40px;
        display: flex;
        justify-content: center;
        font-size: 15px;
        border-bottom:2px solid #333;
      }
      .tableMainCenterTr{
        height:40px;
        line-height:40px;
        display: flex;
        text-align: left;
        box-sizing: border-box;
        border-bottom:2px solid #333;

        .tableMainCenterTrSubject2{
          flex: 1;
          border-right:2px solid #333;
          border-left:2px solid #333;
          display: flex;
          align-items: center;
          line-height: normal;
          justify-content: center;
        }
        span{
          white-space: revert;

        }
      }
    }
  }

}

</style>
