<template>
  <div>
    <yhm-managerpage category="1">
      <!--导航条-->
      <template #navigationTab>
        <router-link class="menuTabDiv" v-for="(item,index) in details" :key="index" :class="{menuTabActive:menuTabOn == index}" :to="{path:item.path}" @click="menuTab(index)">
          {{item.name}}
        </router-link>
      </template>
      <!--操作区-->
      <template #operate>
        <yhm-commonbutton  value="添加" icon="btnAdd" :flicker="true" @call="add()"></yhm-commonbutton>
        <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initChoose()"></yhm-managersearch>
        <yhm-radiofilter :before="expressCompanyBefore" @initData="initChoose('companyID')" title="快递公司" :content="listCompanyID"></yhm-radiofilter>
        <yhm-radiofilter :before="expressCompanyBefore" @initData="initChoose('letterClassification')" title="信函分类" :content="listLetterClassification"></yhm-radiofilter>
        <yhm-radiofilter :before="expressCompanyBefore" @initData="initChoose('businessType')" title="快递业务类型" :content="listBusinessType"></yhm-radiofilter>
        <yhm-radiofilter :before="expressCompanyBefore" @initData="initChoose('viewLevels')" title="查看下属" all="0" :content="listViewLevels"></yhm-radiofilter>
        <!--<yhm-commonbutton  value="测试" icon="btnAdd" :flicker="true" @call="add1()"></yhm-commonbutton>-->
      </template>
      <!--数据表头-->
      <template #listHead>
        <yhm-managerth style="width: 40px;" title="选择"></yhm-managerth>
        <yhm-managerth style="width: 40px;" title="查看"></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="分类" value="letterClassification"></yhm-managerth>
        <yhm-managerth width="100" title="快递公司"  value="companyName"></yhm-managerth>
        <yhm-managerth width="100" title="业务类型"  value="businessType"></yhm-managerth>
        <yhm-managerth v-if="listViewLevels.value==1" width="80" title="经办人"  value="wePersonName"></yhm-managerth>
        <yhm-managerth  title="收件方公司信息" subtitle="(寄件方公司信息)" value="unit"></yhm-managerth>
        <yhm-managerth style="width: 150px" title="收件方地址区域" subtitle="(寄件方地址区域)" value="regionID"></yhm-managerth>
        <yhm-managerth width="100" title="收件人"  subtitle="(寄件人)" value="otherPartyPersonName"></yhm-managerth>
        <yhm-managerth style="width: 150px" title="收寄时间"  value="workDate"></yhm-managerth>
        <yhm-managerth style="width: 130px" title="快递单号" value="code"></yhm-managerth>
        <yhm-managerth style="width: 80px" title="费用" value="amount"></yhm-managerth>
        <yhm-managerth style="width: 80px" title="序号" value="number"></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="审批状态"></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="快递状态"></yhm-managerth>
        <yhm-managerth  v-if="listViewLevels.value==0" style="width: 100px;" title="操作"></yhm-managerth>
      </template>
      <!--数据明细-->
      <template #listBody>
        <tr :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]" v-for="(item,index) in content" :key="index">
          <yhm-manager-td-checkbox :value="item"></yhm-manager-td-checkbox>
          <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>
          <yhm-manager-td-psd :value="item.letterClassification" :list="listLetterClassification.list"></yhm-manager-td-psd>
          <yhm-manager-td :tip="true" :value="item.companyName"></yhm-manager-td>
          <yhm-manager-td-psd @click="businessView(item)" :value="item.businessType" :list="listBusinessType.list"></yhm-manager-td-psd>
          <yhm-manager-td v-if="listViewLevels.value==1" :tip="true" :value="item.wePersonName"></yhm-manager-td>
          <yhm-manager-td :value="item.unit"></yhm-manager-td>
          <yhm-manager-td :value="item.regionName"></yhm-manager-td>
          <yhm-manager-td :value="item.otherPartyPersonName"></yhm-manager-td>
          <yhm-manager-td-date :value="item.workDate"></yhm-manager-td-date>

          <yhm-manager-td :value="item.code" v-if="item.listLogistics.length>0" @mouseout="letterNumberMouseout(item)" @mouseover="letterNumberMouseover(item)"></yhm-manager-td>
          <yhm-manager-td-center :value="item.code" v-else  @mouseover="mainCenterShow = false"></yhm-manager-td-center>

          <yhm-manager-td-money :value="item.amount"></yhm-manager-td-money>
          <yhm-manager-td :value="item.number"></yhm-manager-td>
          <yhm-manager-td-psd :value="item.state" :list="listApproveFlowsState.list"></yhm-manager-td-psd>
          <yhm-manager-td-psd :value="item.onlineOrderState" :list="listOnlineOrderState.list"></yhm-manager-td-psd>

          <yhm-manager-td-operate  v-if="listViewLevels.value==0">
            <yhm-manager-td-operate-button :no-click="item.state!=0"  @click="submit(item)" value="提交申请" icon="i-btn-applicationSm" color="#FF0000"></yhm-manager-td-operate-button>
            <!--<yhm-manager-td-operate-button v-if="item.state==1"  value="待审批" icon="i-btn-pendingSm" color="#FF0000"></yhm-manager-td-operate-button>-->
            <!--<yhm-manager-td-operate-button v-if="item.state==99"  value="已通过" icon="i-btn-applicationSs" color="#FF0000"></yhm-manager-td-operate-button>-->
            <!--<yhm-manager-td-operate-button v-if="item.state==2"  value="已驳回" icon="icon-delete" color="#FF0000"></yhm-manager-td-operate-button>-->


          </yhm-manager-td-operate>
        </tr>
      </template>

      <!--数据空提示-->
      <template #empty>
        <span class="m_listNoData" v-show="empty">暂时没有数据</span>
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
  export default {
    name: 'myExpressManager',
    mixins: [managermixin],
    data(){
      return{
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
        menuTabOn:'7',
        details:[
          {id:'1', name: '付款计划',path:'/home/myPaymentPlanManager'},
          {id:'2', name: '付款申请',path:'/home/myManager/paymentApplyManager'},
          {id:'3', name: '报销',path:'/home/myManager/reimbursementManager'},
          {id:'4', name: '采购计划',path:'/home/myPurchaseManager'},
          {id:'5', name: '备用金',path:'/home/prettyCashsManager'},
          {id:'6', name: '补签字',path:'/home/myManager/signatureManager'},
          {id:'7', name: '开票申请',path:'/home/openInvoiceManager'},
          {id:'8', name: '我的快递',path:'/home/myExpressManager'},
        ],
        screenY:'',
        screenX:'',
        timer:0,
        borderHeight:'100%',
        height:'auto',
        letterNumber:'',//运单号
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
          value:"",
          list:[]
        },
        listCompanyID:{
          value:"",
          list:[]
        },
        listApproveFlowsState:{
          value:"",
          list:[]
        },
        listOnlineOrderState:{
          value:"",
          list:[]
        },
        listBusinessType:{
          value:"",
          list:[]
        },
        listViewLevels:{
          value:"0",
          list:[]
        },

      }
    },
    methods:{
      getMousePos(event){
        var e = event || window.event;
        var x = e.currentTarget.getBoundingClientRect().x
        var y = e.currentTarget.getBoundingClientRect().y
        return {x,y}
      },
      letterNumberMouseover(item){//计算位置显示数据
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
      letterNumberMouseout(item){//编号为空时
        this.mainCenterShow = false
      },
      businessView(item){
        if (item.businessID!='' && item.businessID!=null){
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
      },
      submit(item){
        if (item.letterClassification==0){
          let params={
            id:item.id,
            state:'99'
          }
          this.ajaxJson({
            url: '/dailyoffice/myExpress/submit',
            data: params,
            call: (data) => {
              if (data.type === 0) {
                this.$dialog.setReturnValue(this.id)
                this.$dialog.alert({
                  tipValue: data.message,
                  closeCallBack: () => {
                    this.initPageData(false)
                  }
                })
              } else {
                this.$dialog.alert({
                  alertImg: 'warn',
                  tipValue: data.message
                })
              }

            }
          })

        }else{
          this.ajaxJson({
            url: '/sys/approve/submit',
            data: {
              id:item.id,      //快递单ID
              category:4,   //审批类型
              personID:item.wePersonID,//王强
              unitID:item.weUnit, //申请人所属单位ID
              location:0
            },
            call: (data) => {
              if (data.type === 0) {
                this.$dialog.setReturnValue(this.id)
                this.$dialog.alert({
                  tipValue: data.message,
                  closeCallBack: () => {
                    this.initPageData(false)
                  }
                })
              } else {
                this.$dialog.alert({
                  alertImg: 'warn',
                  tipValue: data.message
                })
              }

            }
          })
        }



        // let aa=''
        // if(item.letterClassification==0){
        //   aa=2
        // }else{
        //   aa=1
        // }
        // this.$dialog.confirm({
        //   width: 300,
        //   tipValue: '是否确定提交?',
        //   btnValueOk: '确定',
        //   alertImg: 'warn',
        //   okCallBack: (data) => {
        //     let params = {
        //       id: item.id,
        //       category:aa
        //     }
        //     this.ajaxJson({
        //       url: '/dailyoffice/myExpress/submit',
        //       data: params,
        //       call: (data) => {
        //         if (data.type == '0') {
        //           this.$dialog.alert({
        //             tipValue: data.message,
        //             closeCallBack: (data) => {
        //               this.initPageData(false)
        //             }
        //           })
        //         } else {
        //           this.$dialog.alert({
        //             alertImg: 'error',
        //             tipValue: data.message,
        //             closeCallBack: () => {
        //             }
        //           })
        //         }
        //       }
        //     })
        //   }
        // })
      },
      listView(item){
          this.$dialog.OpenWindow({
            width: '1050',
            height: '750',
            url: '/myExpressView?id='+item.id,
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
      add1 () {
        this.$dialog.OpenWindow({
          width: '1050',
          height: '750',
          url: '/addressbookView',
          title: '选择地址信息',
          closeCallBack: (data) => {
            if (data) {
              this.lastData = data
              this.initPageData(false)
            }

          }
        })
      },

      //添加
      add () {
        this.$dialog.OpenWindow({
          width: '1050',
          height: '750',
          url: '/myExpressForm',
          title: '添加快递信息',
          closeCallBack: (data) => {
            if (data) {
              this.lastData = data
              this.initPageData(false)
            }

          }
        })
      },

      // 筛选事件
      initChoose (op) {
        if (op === 'courierCompanyID') {
          this.selectValue = []
        }
        if (op === 'letterClassification') {
          this.selectValue = []
        } if (op === 'businessType') {
          this.selectValue = []
        } if (op === 'viewLevelsl') {
          this.selectValue = []
        }


        this.pager.pageIndex = 1
        this.initPageData(false)
      },
      initPageData (initValue) {
        let params = {}

        if (initValue) {
          params = {
            letterClassification:this.listLetterClassification.value,
            companyID:this.listCompanyID.value,
            businessType:this.listBusinessType.value,
            viewLevels:this.listViewLevels.value
          }
        } else {
          params = {
            letterClassification:this.listLetterClassification.value,
            companyID:this.listCompanyID.value,
            businessType:this.listBusinessType.value,
            viewLevels:this.listViewLevels.value
          }
        }
        this.init({
          initValue:initValue,
          url: '/dailyoffice/myExpress/getManager',
          data:params,
          all:(data) =>{
            //不管是不是初始化都需要执行的代码
          },
          init:(data)=>{
            //初始化时需要执行的代码
            this.listItemType=data.itemTypePsd
            this.listLetterClassification=data.letterClassificationPsd
            this.listCompanyID=data.companyIDPsd
            this.listApproveFlowsState=data.approveFlowsStatePsd
            this.listOnlineOrderState=data.onlineOrderStatePsd
            this.listBusinessType=data.businessTypePsd
            this.listViewLevels=data.viewLevelsPsd

          }
        })
      },
    },
    created () {

    }
  }
</script>

<style lang="less" scoped>
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
