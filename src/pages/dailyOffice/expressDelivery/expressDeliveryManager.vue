<template>
  <div>
    <yhm-managerpage category="1" @statisticalClick="statisticalClick" :statisticalShow="true"  >
      <!--导航条-->
      <template #navigationTab>
        <router-link class="menuTabDiv menuTabActive" :to="{path:'/home/expressDeliveryManager'}">往来信函</router-link>
      </template>
      <!--操作区-->
      <template #operate>
        <yhm-table-tip style="width: 400px"  @call="tableTipClick" ref="smallTable" custom-delete-tip-value="确定分离发送吗?？" custom-delete-icon-color="red" custom-delete-icon="im_separate" :show="tableTip" :content="tableTipInfo" :column="tableTipColumnInfo" :mouse-control="tableTipControl"></yhm-table-tip>
        <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initChoose()"></yhm-managersearch>
        <yhm-radiofilter :before="expressCompanyBefore" @initData="initChoose('companyID')" title="快递公司" :content="listCompanyID"></yhm-radiofilter>
        <yhm-radiofilter :before="expressCompanyBefore" @initData="initChoose('letterClassification')" title="信函分类" :content="listLetterClassification"></yhm-radiofilter>
        <yhm-radiofilter :before="expressCompanyBefore" @initData="initChoose('isItOver')" title="是否结算" :content="listIsItOver"></yhm-radiofilter>
        <yhm-radiofilter :before="expressCompanyBefore" @initData="initChoose('businessType')" title="业务类型" :content="listBusinessType"></yhm-radiofilter>
        <yhm-radiofilter :before="expressCompanyBefore" @initData="initChoose('sendPayWay')" title="付款方式" :content="listSendPayWay"></yhm-radiofilter>
      </template>
      <template #operateMore>
        <yhm-radiofilter :before="expressCompanyBefore" @initData="initChoose('timeFiltering')" title="时间" :content="listTimeFiltering"></yhm-radiofilter>
        <div :class="{customTimeShow:timeShow,customTimeHide:!timeShow}" >
          <yhm-form-date v-show="dateShow" title="开始时间" @call="dateSelection(startDate,endDate)" style="width: 350px;" :value="startDate" id="startDate" position="t"></yhm-form-date>
          <yhm-form-date v-show="dateShow" title="结束时间" @call="dateSelection(startDate,endDate)" style="width: 350px;margin-left: 30px;" :value="endDate" id="endDate" position="t"></yhm-form-date>
        </div>
      </template>
      <!--数据表头-->
      <template #listHead>
        <yhm-managerth width="40" title="选择"></yhm-managerth>
        <yhm-managerth width="40" title="查看"></yhm-managerth>
        <yhm-managerth width="60" title="分类" value="letterClassification"></yhm-managerth>
        <yhm-managerth width="110" title="收寄时间" value="workDate"></yhm-managerth>
        <yhm-managerth width="90"  title="快递公司"  value="companyID"></yhm-managerth>
        <yhm-managerth width="100"  title="业务类型"  value="businessType"></yhm-managerth>
        <yhm-managerth width="80" title="经办人"  value="wePersonID"></yhm-managerth>
        <yhm-managerth width="220" title="收寄方公司信息"  value="unit"></yhm-managerth>
        <yhm-managerth width="80" title="收寄人" value="otherPartyPersonID"></yhm-managerth>
        <yhm-managerth  title="收寄地址" value="address"></yhm-managerth>
        <yhm-managerth style="width:70px" title="金额" value="amount"></yhm-managerth>
        <yhm-managerth style="width: 120px" title="快递单号" value="code"></yhm-managerth>
        <yhm-managerth style="width: 60px" title="序号" value="code"></yhm-managerth>
        <yhm-managerth style="width: 90px" title="快递状态"></yhm-managerth>
        <yhm-managerth width="120" title="操作"></yhm-managerth>
      </template>

      <!--数据明细-->
      <template #listBody>
        <tr :class="[{InterlacBg:index%2!=0}]" v-for="(item,index) in content" :key="index">
          <yhm-manager-td-checkbox :value="item"></yhm-manager-td-checkbox>
          <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>
          <yhm-manager-td-psd :value="item.letterClassification" :list="listLetterClassification.list"></yhm-manager-td-psd>
          <yhm-manager-td-date :value="item.workDate"></yhm-manager-td-date>
          <yhm-manager-td-center @click="companyClick(item)" :tip="true" :value="item.companyName"></yhm-manager-td-center>
          <yhm-manager-td-psd @click="businessTypeClick(item)" :value="item.businessType" :list="listBusinessType.list"></yhm-manager-td-psd>
          <!--<yhm-manager-td-date :value="item.workDate"></yhm-manager-td-date>-->
          <yhm-manager-td  :tip="true" v-if="item.listName.length>1?true:false" value="多人合并" :after-icon="item.listName.length > 1?'i-btn-prompt':''" @mouseover="tableTipShowEvent" @mouseout="tableTipHideEvent" :value-object="item" :color="item.listName.length > 0?'#1111EE':''"></yhm-manager-td>
          <yhm-manager-td :tip="true" v-else :value="item.wePersonName"></yhm-manager-td>
          <!--<yhm-manager-td :tip="true" v-if="item.unit!=''" :value="item.unit+'('+item.otherPartyPersonName+')'"></yhm-manager-td>-->
          <yhm-manager-td :tip="true"  :value="item.unit"></yhm-manager-td>
          <yhm-manager-td @click="otherPartyClick(item)" :value="item.otherPartyPersonName"></yhm-manager-td>
          <yhm-manager-td-input :tip="true" v-show="addressIndex === index" :isFocus="addressIndex === index" @blur="blurAddressEvent" :id="item.id" :value="item.address"></yhm-manager-td-input>
          <yhm-manager-td :tip="true"  v-show="addressIndex !== index" @dblclick="dbAddressEvent(item.address,index,item)" :value="item.address"></yhm-manager-td>
          <!--<yhm-manager-td-money :value="item.amount"></yhm-manager-td-money>-->
          <yhm-manager-td-input v-show="amountIndex === index" :isFocus="amountIndex === index" @blur="blurAmountEvent" :id="item.id" :value="item.amount"></yhm-manager-td-input>
          <yhm-manager-td  v-show="amountIndex !== index" @dblclick="dbAmountEvent(item.amount,index,item)" :value="item.amount"></yhm-manager-td>
          <yhm-manager-td :value="item.code" v-if="item.listLogistics.length>0" overflow=" " @mouseout="letterNumberMouseout(item)" @mouseover="letterNumberMouseover(item)"></yhm-manager-td>
          <yhm-manager-td-center :value="item.code" v-else  @mouseover="mainCenterShow = false"></yhm-manager-td-center>
          <yhm-manager-td  v-if="item.listName.length>1?true:false" value="点击查看" :after-icon="item.listName.length > 1?'i-btn-prompt':''" @mouseover="tableTipShowEvent" @mouseout="tableTipHideEvent" :value-object="item" :color="item.listName.length > 0?'#1111EE':''"></yhm-manager-td>
          <yhm-manager-td  v-else :value="item.number"></yhm-manager-td>
          <yhm-manager-td-psd  :value="item.onlineOrderState" :list="listOnlineOrderState.list"></yhm-manager-td-psd>
          <!--<yhm-manager-td-psd @click="onlineClitk(item)" v-if="isIf" :value="item.onlineOrderState" :list="listOnlineOrderState.list"></yhm-manager-td-psd>-->
          <!--<yhm-manager-td :tip="true" v-else @click="onlineClitk(item)" :value="signForTime"></yhm-manager-td>-->
          <yhm-manager-td-operate>
            <yhm-manager-td-operate-button @click="reservation(item)" v-if="item.onlineOrderState==-1 ?true:false" value="快递预约" icon="im_copy" color="#FF0000"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button @click="cancelAppointment(item)" v-if="item.onlineOrderState==0?true:false" value="取消预约" icon="im_copy" color="#FF0000"></yhm-manager-td-operate-button>
          </yhm-manager-td-operate>
        </tr>
      </template>
      <!--数据空提示-->
      <template #empty>
        <span class="m_listNoData" v-show="empty">暂时没有数据</span>
      </template>

      <template #total >
        <div class="listTotalCrente m_list w418">
          <div class="listTotalLeft">
            <span class="test"></span>
            <span class="test">金额</span>
            <span class="test">条数</span>
          </div>
          <table width="100%" cellpadding="0" cellspacing="0" class="m_content_table m_content_total_table">
            <thead>
            <tr>
              <!--<yhm-managerth style="width: 100px;" before-color="black" title="" before-title="总数" ></yhm-managerth>-->
              <yhm-managerth style="width: 100px;" before-color="#49a9ea" title="" before-title="金额" ></yhm-managerth>
            </tr>
            </thead>
            <tbody>
            <tr >
              <yhm-manager-td-money style="font-size: 16px"   v-for="(item,index) in total" :key="index" :value="item.hairMoney+''"></yhm-manager-td-money>
            </tr>
            <tr>
              <yhm-manager-td-rgt v-for="(item,index) in total" :key="index" :value="item.hairCount"></yhm-manager-td-rgt>
            </tr>
            </tbody>
          </table>
        </div>
      </template>
      <!--分页控件-->
      <template #pager>
        <yhm-pagination :pager="pager" @initData="initPageData(false)"></yhm-pagination>
      </template>
    </yhm-managerpage>
    <div class="mainCenter"
         @mouseout="mainCenterShow = false"
         @mouseover="mainCenterShow = true"
         v-show="mainCenterShow" style="position: fixed;z-index: 9999999;" :style="{top:(150)+'px',left:(screenX-800)+'px'}">
      <div class="mainTitle">
        <div class="mainTitleLeft">
          <span style="color: #999;">运单号:</span>
          <span>{{code}}</span>
          <p class="mainTitleLeftTest">
            <span>{{senderOrigin==''?'-----':senderOrigin}}</span>
            <svg t="1603957702452" class="icon" viewBox="0 0 1024 1024" version="1.1" p-id="2008" width="36" height="36"><path d="M121.626556 637.344398h775.643884a39.897759 39.897759 0 0 0 39.226423-32.632033c3.777328-20.395021-2.851054-41.333909-17.675685-55.839867l-253.408132-247.926971a31.25112 31.25112 0 0 0-45.748581 2.188216 35.844249 35.844249 0 0 0 2.608863 48.994788L851.917012 572.080332H125.25517a34.548315 34.548315 0 0 0-34.497328 32.632033 30.915452 30.915452 0 0 0 30.868714 32.632033z" p-id="2009" fill="#c9c9c9"></path></svg>
            <span>{{recipientDestination==''?'-----':recipientDestination}}</span>
          </p>
        </div>
        <div class="mainTitleRight" v-show="whetherSucceed=='13'||whetherSucceed=='14'?true:false">
          <div class="mainTitleRightTest">
            <p style="margin-bottom: 6px;">签收时间</p>
            <p style="color: #dc1e32;">{{whetherSucceed=='13'||whetherSucceed=='14'?list[0].ftime:''}}</p>
          </div>
        </div>
      </div>
      <div class="allTheProcess" ref="allTheProcess" :style="{height: height}">
        <div class="allTheProcessBorder" :style="{height:borderHeight}"></div>
        <div class="allTheProcessItem" v-for="(item,index) in list" :key="index">
          <div style="width: 24%;display: flex;align-items: center;">
              <span style="width: 36px;text-align: right;white-space: nowrap;"
                    :style="{color:item.status=='已签收'?'#f00':'',fontSize:item.status=='已签收'?'16px':'14px',textIndent:item.status=='已签收'?'-6px':''}">{{item.status}}</span>
            <img v-if="item.status=='起飞'" class="allTheProcessItemImg" src="https://hp.yhm.hk/UploadFile/qifei.png" alt="">
            <img v-else-if="item.status=='落地'" class="allTheProcessItemImg" src="https://hp.yhm.hk/UploadFile/luodi.png" alt="">
            <img v-else-if="item.status=='已签收'" style="margin-left: 21px;" class="allTheProcessItemImg" src="https://hp.yhm.hk/UploadFile/yiqianshou.png " alt="">
            <img v-else-if="item.status=='已取件'" style="margin-left: 21px;" class="allTheProcessItemImg" src="https://hp.yhm.hk/UploadFile/yiqujian.png" alt="">
            <img v-else style="width: 15px;margin-left: 29px;height: 15px;z-index: 1;" src="https://hp.yhm.hk/UploadFile/yunsongzhong.png" alt="">
            <!--              <span style="margin-left: 30px;width: 15px;height: 15px;border-radius: 50%;z-index: 1;" :style="{backgroundColor:index=='0'?'#f00':'#666'}"></span>-->
            <span style="margin-left: 30px;width: 15%;font-size: 14px;white-space: nowrap;">{{item.ftime}}</span>
          </div>
          <div style="width: 50%;line-height: 20px;margin-left: 130px; font-size: 14px;white-space: normal;">{{item.context}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { managermixin } from '@/assets/manager.js'
  import {tenThousandFormatHtml,formatDate} from '@/assets/common.js'
    export default {
    name: 'expressDeliveryManager',
    mixins: [managermixin],
    data(){
      return{

        currentDate:formatDate(new Date()),//当天时间
        startDate:formatDate(new Date()),//开始时间
        endDate:formatDate(new Date()),//结束时间

        start:' 00:00:00',//开始时的时分秒
        finish:' 23:59:59',//结束时的时分秒
        oldAmount:'',
        amountIndex:'0',
        addressIndex:'0',
        screenY:'',
        screenX:'',
        timer:0,
        borderHeight:'100%',
        height:'auto',
        code:'',//运单号
        whetherSucceed:'',//快递状态
        senderOrigin:'',//寄件地
        recipientDestination:'',//目的地
        mainCenterShow:false,
        expressCompanyBefore:'0',
        orderCode:'',
        listItemType:{
          value:"",
          list:[]
        },
        listLetterClassification:{
          value:"1",
          list:[]
        },
        listCompanyID:{
          value:"",
          list:[]
        },
        listOnlineOrderState:{
          value:"",
          list:[]
        },
        listIsItOver:{
          value:"0",
          list:[]
        },
        listTimeFiltering:{
          value:"3",
          list:[]
        },
        listBusinessType:{
          value:"",
          list:[]
        },
        listSendPayWay:{
          value:"",
          list:[]
        },
        tableTip:false,         //记录表格是否显示
        tableTipControl:{},
        tableTipColumnInfo:[
          {width:'38',title:'查看',category:'look',key:'id'},
          {width:'120',title:'时间',category:'date',key:'insertDate'},
          {width:'120',title:'寄件人',category:'',key:'name'},
          {width:'30',title:'序号',category:'',key:'number'},
          {width:'38',title:'操作',category:'delete',key:'id'},
        ],
        tableTipInfo:[],
        currentControl:'',
        total:[],
        listName:[],
        timeShow:false,//自定义时间选择 显示隐藏
        dateShow:false,//时间组件 显示隐藏
        listLogistics:[],
        // isIf:true,
        // isIFNumber:'1',
        // signForTime:'',
      }
    },
    methods:{
      // onlineClitk(item){
      //   if (item.onlineOrderState=='13'){
      //     if (this.isIFNumber=='1') {
      //       let params = {
      //         id: item.id
      //       }
      //       this.ajaxJson({
      //         url: '/dailyoffice/myExpress/getSignForTime',
      //         data: params,
      //         call: (data) => {
      //           this.signForTime= data.message
      //         }
      //       })
      //       this.isIf=false
      //       this.isIFNumber='0'
      //     }else{
      //       this.isIf=true
      //       this.isIFNumber='1'
      //     }
      //   }
      // },
      businessTypeClick(item){
        if(item.businessID!=''){
          if(item.businessType==1){
            this.$dialog.OpenWindow({
              width: '1050',
              height: '700',
              url: '/policyView?id=' + item.businessID,
              title: '查看保单信息',
              closeCallBack: (data)=>{
                if(data){
                  this.initPageData(false)
                }
              }
            })
          }
          if (item.businessType==4){
            let url=''
            let title=''
            if(item.businessID){
              // if(item.state !== '0'){
              url='/openInvoiceView?id='+item.businessID +'&type=0'
              // }else{
              // url='/openInvoiceForm?id='+item.id
              // }
              title='查看开票信息'
            }
            this.$dialog.OpenWindow({
              width: '1050',
              height: '790',
              title: title,
              url:url,
              closeCallBack: (data)=>{
                if(data){
                  this.initPageData(false)
                }
              }
            })
          }
        }
      },
      otherPartyClick(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '750',
          url: '/personView?id='+item.otherPartyPersonID,
          title: '查看联系人信息',
          closeCallBack: (data) => {
            if (data) {
              this.lastData = data
              // this.initPageData(false)
              /*false->非初始化=>!import  true->初始化*/
            }
          }
        })
      },
      companyClick(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '750',
          url: '/courierCompanyView?id='+item.companyID,
          title: '查看快递信息',
          closeCallBack: (data) => {
            if (data) {
              this.lastData = data
              this.initPageData(false)
              /*false->非初始化=>!import  true->初始化*/
            }
          }
        })
      },
      dbAmountEvent(amount,index,item){
        if(item.isItOver!=1){
          this.oldAmount = amount
          this.amountIndex = index
        }else {
          this.$dialog.alert({
            tipValue:'此条数据已完成对账金额不能修改',
            alertImg: 'warn',
            width:'350'
          })
        }
      },
      dbAddressEvent(address,index,item){
        if(item.onlineOrderState==-1){
        this.oldAmount = address
        this.addressIndex = index
        }else {
          this.$dialog.alert({
            tipValue:'此条数据已下单不能修改',
            alertImg: 'warn',
            width:'350'
          })
        }
      },
      blurAddressEvent(id, value){

        this.addressIndex = -1
        if(this.oldAmount !== value) {

          let params = {
            id: id,
            address: value
          }
          this.ajaxJson({
            url: '/dailyoffice/myExpress/updateAddress',
            data: params,
            call: (data) => {
              if (data.type === 0) {
                  this.$dialog.alert({
                    tipValue: data.message,
                    closeCallBack: (data) => {
                      this.initPageData(false)
                    }
                  })
                }else{
                  this.$dialog.alert({
                    alertImg: 'warn',
                    tipValue: data.message
                  })
                }
              }
          })
        }
      },
      blurAmountEvent(id, value){
        this.amountIndex = -1
        if(this.oldAmount !== value) {

          let params = {
              id: id,
              amount: value
            }

          this.ajaxJson({
            url: '/dailyoffice/myExpress/updateDetailAmount',
            data: params,
            call: (data) => {
              if (data.type === 0) {
                this.$dialog.alert({
                  tipValue: data.message,
                  closeCallBack: (data) => {
                    this.initPageData(false)
                  }
                })
              }else{
                this.$dialog.alert({
                  alertImg: 'warn',
                  tipValue: data.message
                })
              }
            }
          })
        }
      },
      tableTipClick(item,title){
        if(title=='查看'){
          this.$dialog.OpenWindow({
            width: '1050',
            height: '750',
            url: '/expressApprovalView?id='+item.id,
            title: '查看快递信息',
            closeCallBack: (data) => {
              if (data) {
                this.lastData = data
                this.initPageData(false)
                /*false->非初始化=>!import  true->初始化*/
              }
            }
          })
        }else if(title=='删除'){
          let params = {
            id: item.id,
          }
          this.ajaxJson({
            url: '/dailyoffice/myExpress/separate',
            data: params,
            call: (data) => {
              if (data.type == '0') {
                this.$dialog.alert({
                  tipValue: data.message,
                  closeCallBack: (data) => {
                    this.initPageData(false)
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
      },
      getMousePos(event) {
        var e = event || window.event;
        var x = e.currentTarget.getBoundingClientRect().x
        var y = e.currentTarget.getBoundingClientRect().y
        return {x,y}
      },
      letterNumberMouseover(item){
        this.whetherSucceed = item.onlineOrderState//状态
        // this.senderOrigin = item.senderOrigin//寄件地
        if(item.letterClassification == 0){ //收
          this.senderOrigin = item.regionName//寄件地
          this.recipientDestination = '北京'
        }else if(item.letterClassification == 1){ //发
          this.recipientDestination = item.regionName//目的地
          this.senderOrigin = '北京'//寄件地
        }

        this.code = item.code//运单号
        this.list = item.listLogistics
        this.screenY = this.getMousePos().y
        this.screenX = this.getMousePos().x
        this.mainCenterShow = true
        this.$nextTick(()=>{
          this.borderHeight = (this.$refs.allTheProcess.offsetHeight-53) + 'px'
          this.height = '360px'
        })
      },
      letterNumberMouseout(item){
        this.mainCenterShow = false
      },
      tableTipShowEvent(item,control){
        if(item.listName.length > 1) {
          this.tableTipInfo = item.listName
          this.tableTipControl = control
          this.currentControl = control
          this.tableTip = true
        }else{
          this.currentControl = null
          this.tableTip = false
        }
      },
      moveToSmallTable(e){
        if(this.currentControl) {
          if(!(this.currentControl.contains(e.target) || this.$refs.smallTable.$el.contains(e.target))){
            this.tableTip = false
          }
        }
        else{
          document.removeEventListener('mouseover', this.moveToSmallTable)
        }
      },
      tableTipHideEvent(item,control){
        if(item.listName.length > 0){
          document.addEventListener('mouseover', this.moveToSmallTable)
        }
      },
      reservation(item){
        this.$dialog.confirm({
          tipValue: '请选择快递取件时间?',
          btnValueOk:'正常时间来取件',
          btnValueCancel:'马上来取件',
          width: 350,
          okCallBack: () => {
            let params = {
              id: item.id,
              category:0,
            }
            this.ajaxJson({
              url: '/dailyoffice/myExpress/myReservation',
              data: params,
              call: (data) => {
                if (data.type == '0') {
                  this.$dialog.alert({
                    tipValue: data.message,
                    closeCallBack: (data) => {
                      this.initData(false)
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
          },
          cancelCallBack:() => {
            let params = {
              id: item.id,
              category:1,
            }
            this.ajaxJson({
              url: '/dailyoffice/myExpress/myReservation',
              data: params,
              call: (data) => {
                if (data.type == '0') {
                  this.$dialog.alert({
                    tipValue: data.message,
                    closeCallBack: (data) => {
                      this.initData(false)
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


      },
      aa(){
        this.$dialog.confirm({
          width: 340,
          tipValue: '是否确定预计快递上门取件?',
          btnValueOk: '确定',
          alertImg: 'warn',
          okCallBack: (data) => {
            let params = {
              id: item.id,
            }
            this.ajaxJson({
              url: '/dailyoffice/myExpress/myReservation',
              data: params,
              call: (data) => {
                if (data.type == '0') {
                  this.$dialog.alert({
                    tipValue: data.message,
                    closeCallBack: (data) => {
                      this.initData(false)
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
      },
      cancelAppointment(){
        this.$dialog.confirm({
          width: 340,
          tipValue: '是否确定取消上门取件?',
          btnValueOk: '确定',
          alertImg: 'warn',
          okCallBack: (data) => {
            let params = {
              id: item.id,
            }
            this.ajaxJson({
              url: '/dailyoffice/myExpress/cancelAppointment',
              data: params,
              call: (data) => {
                if (data.type == '0') {
                  this.$dialog.alert({
                    tipValue: data.message,
                    closeCallBack: (data) => {
                      this.initData(false)
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
      },

      listView(item){
        let arrId = []
        let id = ''
        for(let i in item.listName){
          arrId.push(item.listName[i].id)
        }
        id = arrId.join(',')
        this.$dialog.OpenWindow({
          width: '1050',
          height: '750',
          url: '/myAdminExpressView?id='+id,
          title: '查看快递信息',
          closeCallBack: (data) => {
            if (data) {
              this.lastData = data
              this.initPageData(false)
              /*false->非初始化=>!import  true->初始化*/
            }
          }
        })
      },

      selectedSum(){
        let listID=[]

        for(let i=0; i<this.selectValue.length; i++){
          listID.push(this.selectValue[i])
        }
        let  params = {
          listID:listID,
          letterClassification:this.listLetterClassification.value,
          companyID:this.listCompanyID.value,
          isItOver:this.listIsItOver.value,
          letterClassification:this.listLetterClassification.value,
        }

        this.ajaxJson({
          url: '/dailyoffice/myExpress/getTotal',
          data: params,
          call: (data) => {
            this.total = data.total
          }
        })
      },
      getYear(type, dates) {//type为字符串类型，有两种选择，"s"代表开始,"e"代表结束，dates为数字类型，不传或0代表今年，-1代表去年，1代表明年
        let dd = new Date()
        let n = dates || 0
        let year = dd.getFullYear() + Number(n)
        let day = ''
        if (type == "s") {
          day = year + "-01-01"
        }
        if (type == "e") {
          day = year + "-12-31"
        }
        if (!type) {
          day = year + "-01-01/" + year + "-12-31"
        }
        return day
      },
      currentSeason(){//上季度
        Date.prototype.format =function(format)
        {
          let o = {
            "M+" : this.getMonth()+1, //month
            "d+" : this.getDate(), //day
            "h+" : this.getHours(), //hour
            "m+" : this.getMinutes(), //minute
            "s+" : this.getSeconds(), //second
            "q+" : Math.floor((this.getMonth()+3)/3), //quarter
            "S" : this.getMilliseconds() //millisecond
          }
          if(/(y+)/.test(format)) format=format.replace(RegExp.$1,
            (this.getFullYear()+"").substr(4- RegExp.$1.length));
          for(let k in o)if(new RegExp("("+ k +")").test(format))
            format = format.replace(RegExp.$1,
              RegExp.$1.length==1? o[k] :
                ("00"+ o[k]).substr((""+ o[k]).length));
          return format;
        }
        let dayMSec = 24 * 3600 * 1000;
        let today = new Date();
        //得到今天距离本周一的天数
        function getDayBetweenMonday(){
          //得到今天的星期数(0-6),星期日为0
          let weekday = today.getDay();
          //周日
          if(weekday == 0){
            return 6;
          }else{
            return weekday - 1;
          }
        }
        function getLastDay(){
          let yestodayMSec=today.getTime() -dayMSec;
          let yestoday = new Date(yestodayMSec);
          return yestoday.format('yyyy-MM-dd')+","+yestoday.format('yyyy-MM-dd');
        }
        function getLastWeek(){
          //得到距离本周一的天数
          let weekdayBetween = getDayBetweenMonday();
          //得到本周星期一的毫秒值
          let nowMondayMSec = today.getTime() - weekdayBetween * dayMSec;
          //得到上周一的毫秒值
          let lastMondayMSec = nowMondayMSec - 7 * dayMSec;
          //得到上周日的毫秒值
          let lastSundayMSec = nowMondayMSec - 1 * dayMSec;
          let lastMonday = new Date(lastMondayMSec);
          let lastSunday = new Date(lastSundayMSec);
          return lastMonday.format('yyyy-MM-dd')+","+lastSunday.format('yyyy-MM-dd');
        }
        function getLastMonth(){
          //得到上一个月的第一天
          let lastMonthFirstDay = new Date(today.getFullYear() , today.getMonth()-1 , 1);
          //得到本月第一天
          let nowMonthFirstDay = new Date(today.getFullYear() , today.getMonth(), 1);
          //得到上一个月的最后一天的毫秒值
          let lastMonthLastDayMSec = nowMonthFirstDay.getTime() - 1 * dayMSec;
          let lastMonthLastDay = new Date(lastMonthLastDayMSec);
          return lastMonthFirstDay.format('yyyy-MM-dd')+","+lastMonthLastDay.format('yyyy-MM-dd');
        }
        function getLastQuarter(){
          //得到上一个季度的第一天
          let lastQuarterFirstDay = new Date(today.getFullYear() , today.getMonth() - 3 , 1);
          //得到本月第一天
          let nowMonthFirstDay = new Date(today.getFullYear() , today.getMonth(), 1);
          //得到上一个季度的最后一天的毫秒值
          let lastQuarterLastDayMSec = nowMonthFirstDay.getTime() - 1 * dayMSec;
          let lastQuarterLastDay = new Date(lastQuarterLastDayMSec);
          return lastQuarterFirstDay.format('yyyy-MM-dd') +","+lastQuarterLastDay.format('yyyy-MM-dd');
        }
        return getLastQuarter()
      },
      time(time = +new Date()) {//时间戳转化
        let date = new Date(time + 8 * 3600 * 1000); // 增加8小时
        return date.toJSON().substr(0, 19).replace('T', ' ');
      },
      computTimeHorizon(type) {//本季度
        let startDate, endDate;
        let d = new Date();
        let year = d.getFullYear()
        let month = d.getMonth() + 1;
        let date = d.getDate();
        let minutes = d.getMinutes();
        let hours = d.getHours();
        let seconds = d.getSeconds();
        if (type == 1) {
          if (month < 4) {
            startDate = year + '-01-01' + 'T' + '00:00:00'
            endDate = year + '-' + (month < 10 ? ('0' + month) : month) + '-' + (date < 10 ? ('0' + date) : date) + 'T' + (
              hours < 10 ? ('0' + hours) : hours) + ':' + (minutes < 10 ? (
              '0' + minutes) : minutes) + ':' + (seconds < 10 ? ('0' + seconds) : seconds)
          } else if (month > 3 && month < 7) {
            startDate = year + '-03-01' + 'T' + '00:00:00'
            endDate = year + '-' + (month < 10 ? ('0' + month) : month) + '-' + (date < 10 ? ('0' + date) : date) + 'T' + (
              hours < 10 ? ('0' + hours) : hours) + ':' + (minutes < 10 ? (
              '0' + minutes) : minutes) + ':' + (seconds < 10 ? ('0' + seconds) : seconds)
          } else if (month > 6 && month < 10) {
            startDate = year + '-07-01' + 'T' + '00:00:00'
            endDate = year + '-' + (month < 10 ? ('0' + month) : month) + '-' + (date < 10 ? ('0' + date) : date) + 'T' + (
              hours < 10 ? ('0' + hours) : hours) + ':' + (minutes < 10 ? (
              '0' + minutes) : minutes) + ':' + (seconds < 10 ? ('0' + seconds) : seconds)
          } else if (month > 9) {
            startDate = year + '-10-01' + 'T' + '00:00:00'
            endDate = year + '-' + (month < 10 ? ('0' + month) : month) + '-' + (date < 10 ? ('0' + date) : date) + 'T' + (
              hours < 10 ? ('0' + hours) : hours) + ':' + (minutes < 10 ? (
              '0' + minutes) : minutes) + ':' + (seconds < 10 ? ('0' + seconds) : seconds)
          }
        }
        return [new Date(startDate).getTime(), new Date(endDate).getTime()]
        //此处返回为时间戳，根据需要可进行调整
      },
      getMonth(type, months) {//type为字符串类型，有两种选择，"s"代表开始,"e"代表结束，months为数字类型，不传或0代表本月，-1代表上月，1代表下月
        let d = new Date()
        let year = d.getFullYear()
        let month = d.getMonth() + 1
        if (Math.abs(months) > 12) {
          months = months % 12
        }
        if (months != 0) {
          if (month + months > 12) {
            year++
            month = (month + months) % 12
          } else if (month + months < 1) {
            year--
            month = 12 + month + months
          } else {
            month = month + months
          }
        }
        month = month < 10 ? "0" + month: month
        let date = d.getDate()
        let firstday = year + "-" + month + "-" + "01"
        let lastday = ""
        if (month == "01" || month == "03" || month == "05" || month == "07" || month == "08" || month == "10" || month == "12") {
          lastday = year + "-" + month + "-" + 31
        } else if (month == "02") {
          if ((year % 4 == 0 && year % 100 != 0) || (year % 100 == 0 && year % 400 == 0)) {
            lastday = year + "-" + month + "-" + 29
          } else {
            lastday = year + "-" + month + "-" + 28
          }
        } else {
          lastday = year + "-" + month + "-" + 30
        }
        let day = ""
        if (type == "s") {
          day = firstday
        } else {
          day = lastday
        }
        return day
      },
      getMonday(type, dates) {//type为字符串类型，有两种选择，"s"代表开始,"e"代表结束，dates为数字类型，不传或0代表本周，-1代表上周，1代表下周
        let dd = ''
        let now = new Date();
        let nowTime = now.getTime();
        let day = now.getDay();
        let longTime = 24 * 60 * 60 * 1000;
        let n = longTime * 7 * (dates || 0);
        if (type == "s") {
          dd = nowTime - (day - 1) * longTime + n;
        }
        if (type == "e") {
          dd = nowTime + (7 - day) * longTime + n;
        }
        dd = new Date(dd);
        let y = dd.getFullYear();
        let m = dd.getMonth() + 1;
        let d = dd.getDate();
        m = m < 10 ? "0" + m: m;
        d = d < 10 ? "0" + d: d;
        day = y + "-" + m + "-" + d;
        return day;
      },
      initDate(){
        let value = this.listTimeFiltering.value
        if(value=='0'){//当天时间
          this.startDate = this.currentDate
          this.endDate = this.currentDate
        }else if(value=='1'){//本周时间
          this.startDate = this.getMonday('s',0)
          this.endDate = this.getMonday("e",0)
        }else if(value=='2'){//上周时间
          this.startDate = this.getMonday('s',-1)
          this.endDate = this.getMonday("e",-1)
          // console.log( '上周',this.getMonday('s',-1),'上周',this.getMonday("e",-1))
        }else if(value=='3'){//本月时间
          this.startDate = this.getMonth('s',0)
          this.endDate = this.getMonth("e",0)
          // console.log( '本月',this.getMonth('s',0),'本月',this.getMonth("e",0))
        }else if(value=='4'){//上月时间
          this.startDate = this.getMonth('s',-1)
          this.endDate = this.getMonth("e",-1)
          // console.log( '上月',this.getMonth('s',-1),'上月',this.getMonth("e",-1))
        }else if(value=='5'){//本季度
          this.startDate = this.time(this.computTimeHorizon(1)[0]).slice(0,10)
          this.endDate = this.time(this.computTimeHorizon(1)[1]).slice(0,10)
        }else if(value=='6'){//上季度
          this.startDate = this.currentSeason().slice(0,10)
          this.endDate = this.currentSeason().slice(11,21)
          // console.log(this.currentSeason().slice(0,10),this.currentSeason().slice(11,21),'------------' )
        }else if(value=='7'){//本年
          this.startDate = this.getYear('s',0)
          this.endDate = this.getYear("e",0)
          // console.log( '本年',this.getYear('s',0),'本年',this.getYear("e",0))
        }else if(value=='8'){//上一年
          this.startDate = this.getYear('s',-1)
          this.endDate = this.getYear("e",-1)

        }
        if(value==''){//全部
          this.startDate = ''
          this.endDate = ''
          this.start = ''
          this.finish = ''
        }
        // else{
        //   this.start = ' 00:00:00'
        //   this.finish = ' 23:59:59'
        // }
        if(value=='9'){
          this.timeShow = true
          setTimeout(()=>{
            this.dateShow = true
          },300)
          return
        }else{
          this.timeShow = false
          setTimeout(()=>{
            this.dateShow = false
          },0)
        }
      },
      // 筛选事件
      initChoose (op) {
        if (op === 'courierCompanyID') {
          this.selectValue = []
        }
        if (op === 'letterClassification') {
          this.selectValue = []
        }
        if (op === 'businessType') {
          this.selectValue = []
        }
        if (op === 'sendPayWay') {
          this.selectValue = []
        }
        if (this.listTimeFiltering.value==9){
          this.startDate=''
          this.endDate=''
          this.initDate()
        } else {
          this.initDate()

          this.pager.pageIndex = 1
          this.initPageData(false)
        }
      },
      dateSelection(start,finish){//选择时间段
        if(start!=''&&finish!=''){
          this.initPageData()
        }
      },
      initPageData (initValue) {
        let params = {}
        if (initValue) {
          this.initDate()

          params = {
            letterClassification:this.listLetterClassification.value,
            sendPayWay:this.listSendPayWay.value,
            companyID:this.listCompanyID.value,
            isItOver:this.listIsItOver.value,
            businessType:this.listBusinessType.value,
            startDate:this.startDate + this.start,//开始时间
            endDate:this.endDate + this.finish,//结束时间

          }
        } else {
          params = {
            letterClassification:this.listLetterClassification.value,
            sendPayWay:this.listSendPayWay.value,
            companyID:this.listCompanyID.value,
            isItOver:this.listIsItOver.value,
            businessType:this.listBusinessType.value,
            startDate:this.startDate + this.start,//开始时间
            endDate:this.endDate + this.finish,//结束时间
          }
        }
        this.init({
          initValue:initValue,
          url: '/dailyoffice/myExpress/getAdminManager',
          data:params,
          all:(data) =>{
            //不管是不是初始化都需要执行的代码
            // this.total = data.total
            this.ajaxJson({
              url: '/dailyoffice/myExpress/getTotal',
              data: params,
              call: (data) => {
                this.total = data.total
              }
            })
          },
          init:(data)=>{
            //初始化时需要执行的代码
            this.listItemType=data.itemTypePsd
            this.listLetterClassification=data.letterClassificationPsd
            this.listCompanyID=data.companyIDPsd
            this.listOnlineOrderState=data.onlineOrderStatePsd
            this.listIsItOver=data.isItOverPsd
            this.listTimeFiltering=data.timeFilteringPsd
            this.listBusinessType=data.businessTypePsd
            this.listSendPayWay=data.sendPayWayPsd


          }
        })
      },
      statisticalClick(){
        this.$dialog.OpenWindow({
          width: '1300',
          height: '810',
          url: '/expressCartogram',
          title: '查看快递统计信息',
          closeCallBack: (data) => {

          }
        })
      },
    },
    created () {

    }
  }
</script>

<style lang="less" scoped>
  .managerIcon{
    position: absolute;
    right: 4px;
  }
  .customTimeShow{
    width: 100%;
    height: 50px;
    position: relative;
    z-index: 2;
    display: flex;

    /*overflow: hidden;*/
    transition: all 0.5s;
  }
  .customTimeHide{
    width: 100%;
    height: 0px;
    display: flex;
    /*overflow: hidden;*/
    transition: all 0.5s;
  }
  ::-webkit-scrollbar {
    width: 4px;
    height: 4px;
  }
  ::-webkit-scrollbar-thumb {
    box-shadow: inset 0 0 5px rgba(0,0,0,.2);
    border-radius: 5px;
    background: #999;
  }
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px rgba(0,0,0,.2);
    border-radius: 0;
    background: #fff;
  }
  .allTheProcessItemImg{
    width: 30px;
    margin-left: 20px;
    height: 30px;
    z-index: 1;
  }
  /*.main{*/
  /*  position: absolute;*/
  /*  top: 0;*/
  /*  left: 0;*/
  /*  width: 100%;*/
  /*  height: 100%;*/
  /*  padding: 20px 30px;*/
  /*  box-sizing: border-box;*/
  /*  background-color: #f2f2f2;*/

  .allTheProcess{
    width: 760px;
    margin: 40px auto;
    position: relative;
    overflow: auto;

    .allTheProcessBorder{
      position: absolute;
      height: 100%;
      border-right: 2px dotted #f1f1f1;
      left: 104px;
      top: 50px;
      bottom: 0;
    }
    .allTheProcessItem{
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 10px;
    }
  }

  .mainCenter{
    flex: 1;
    width: 800px;
    height: 600px;
    border-radius: 10px;
    background-color: #fff;
    padding: 30px 0 0;
    box-sizing: border-box;
    border: 2px solid #49a9ea;
    .mainTitle{
      width: 700px;
      height: 80px;
      padding: 6px 26px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-color: rgba(255,255,255,.8);
      box-shadow: 0 4px 16px 0 rgba(0,0,0,.1);
      border-radius: 4px;

      .mainTitleLeftTest{
        font-size: 16px;
        font-weight: 700;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: space-around;
        margin-top: 20px;
      }
      .mainTitleRightTest{
        text-align: right;
        font-size: 15px;
        font-weight: 700;
      }
    }
  }
  /*}*/
</style>
