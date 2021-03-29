<template>
  <div class="f_main">
    <yhm-view-body :customize="true" :pager="false">
      <template #title>基本信息</template>
      <template #body>
        <yhm-view-control title="申请人" :content="person"></yhm-view-control>
        <yhm-view-control title="申请日期" :content="applyDate" type="date"></yhm-view-control>
        <yhm-view-control title="付款方" :content="payer" @iconClick="iconClick('0')" iconColor="#49a9ea" font-icon="uniE99E" @click="unitView('0')" color="#49a9ea" style="cursor: pointer;"></yhm-view-control>
        <yhm-view-control title="抬头类型" :content="purchaserType" :psd="purchaserTypeList"></yhm-view-control>
        <yhm-view-control title="发票抬头" v-if="purchaserType !== '2'" :content="purchaser" @iconClick="iconClick('1')" iconColor="#49a9ea" font-icon="uniE99E" @click="unitView('1')" color="#49a9ea" style="cursor: pointer;"></yhm-view-control>
        <yhm-view-control title="发票抬头" v-if="purchaserType === '2'" :content="purchaser" @click="unitView('1')" color="#49a9ea" style="cursor: pointer;"></yhm-view-control>
        <yhm-view-control v-if="bank !== ''" title="开户行" :content="bank"></yhm-view-control>
        <yhm-view-control v-if="account !== ''" title="账号" :content="account"></yhm-view-control>
        <yhm-view-control v-if="taxNumber !== ''" title="税号" :content="taxNumber"></yhm-view-control>

        <yhm-view-control title="开票事由" :content="category" :psd="categoryList"></yhm-view-control>
        <!--<yhm-view-control title="工单号" v-if="isCategory" :content="workOrder"></yhm-view-control>
        <yhm-view-control title="车牌号" v-if="isCategory" :content="licensePlateNumber"></yhm-view-control>-->
        <yhm-view-control title="增票类型" :content="invoiceCategory" :psd="invoiceCategoryList"></yhm-view-control>
        <yhm-view-control title="款项状态" :content="isReceivables" :psd="isReceivablesList"></yhm-view-control>
        <yhm-view-control title="发票金额" :content="invoiceMoney" type="money"></yhm-view-control>
        <yhm-view-control title="金额大写" :content="invoiceMoneyUp"></yhm-view-control>
        <yhm-view-control title="预计回款日期" v-if="isInit" :content="moneyBackDate" type="date"></yhm-view-control>
        <yhm-view-control title="预计使用日期" v-if="isInit" :content="preUseDate" type="date"></yhm-view-control>
        <yhm-view-control title="发票处理" :content="invoiceHandle" :psd="invoiceHandleList"></yhm-view-control>
        <yhm-view-control title="快递号" @click="lookExpress" v-if="isExpressID&&express!=''&&express!=null" color="#49a9ea" :content="express"></yhm-view-control>
        <yhm-view-control title="快递号" v-if="isExpressID&&(express==''||express==null)" :content="express"></yhm-view-control>
        <yhm-view-control title="收件人" v-if="isExpressID" :content="addressee"></yhm-view-control>
        <yhm-view-control title="手机号" v-if="isExpressID" :content="addresseePhone"></yhm-view-control>
        <yhm-view-control title="电话" v-if="isExpressID" :content="addresseeTel"></yhm-view-control>
        <yhm-view-control title="地址" v-if="isExpressID" :content="mailTitle+' '+mailTitleAddress"></yhm-view-control>
        <yhm-view-control title="事由说明" :content="remark"></yhm-view-control>
        <yhm-view-control category="3" title="文件" type="files" :content="files" tag="Deposit"></yhm-view-control>
      </template>
    </yhm-view-body>
    <div class="f_split"></div>
    <yhm-view-tab>
      <template #tab>
        <yhm-view-tab-button :list="tabState" :index="0" v-if="isProductDetail">商品信息</yhm-view-tab-button>
        <yhm-view-tab-button :list="tabState" :index="1" v-if="isBankList">收支信息</yhm-view-tab-button>
        <yhm-view-tab-button :list="tabState" :index="2" v-if="isWorkOrder">工单信息</yhm-view-tab-button>
        <yhm-view-tab-button :list="tabState" :index="3" v-if="invoiceList.length>0">对账单信息</yhm-view-tab-button>
      </template>
      <template #content>
        <yhm-view-tab-list :customize="true" v-if="isProductDetail" v-show="tabState[0].select">
          <template #listHead>
            <yhm-managerth style="width: 160px" title="商品名称"></yhm-managerth>
            <yhm-managerth style="width: 180px" title="型号"></yhm-managerth>
            <yhm-managerth style="width: 90px" title="数量"></yhm-managerth>
            <yhm-managerth style="width: 60px" title="单位"></yhm-managerth>
            <yhm-managerth style="width: 90px" title="单价"></yhm-managerth>
            <yhm-managerth style="width: 90px" title="总额"></yhm-managerth>
            <yhm-managerth style="width: 200px" title="备注"></yhm-managerth>
          </template>
          <template #listBody>
            <tr v-for="(item,index) in productDetails" :key="index" :class="{InterlacBg:index%2!==0}">
              <yhm-manager-td width="160" :value="item.product" ></yhm-manager-td>
              <yhm-manager-td width="180" :value="item.model"></yhm-manager-td>
              <yhm-manager-td width="90" :value="item.quantity"></yhm-manager-td>
              <yhm-manager-td width="60" :value="item.unit"></yhm-manager-td>
              <yhm-manager-td-money width="90" :value="item.price"></yhm-manager-td-money>
              <yhm-manager-td-money :value="item.totalMoney"></yhm-manager-td-money>
              <yhm-manager-td width="200"  :value="item.remark"></yhm-manager-td>
            </tr>
          </template>
          <template #empty v-if="empty">
            <span class="m_listNoData">暂时没有数据</span>
          </template>
        </yhm-view-tab-list>
        <yhm-view-tab-list :customize="true"  v-show="tabState[1].select" v-if="isBankList">
          <template #listHead>
            <yhm-managerth style="width: 150px" title="账号"></yhm-managerth>
            <yhm-managerth style="width: 150px" title="对方账号"></yhm-managerth>
            <yhm-managerth style="width: 140px" title="交易日期"></yhm-managerth>
            <yhm-managerth style="width: 80px" title="收支方向"></yhm-managerth>
            <yhm-managerth style="width: 110px" title="事由"></yhm-managerth>
            <yhm-managerth style="width: 120px" title="交易金额"></yhm-managerth>
            <yhm-managerth style="width: 120px" title="开票金额"></yhm-managerth>
            <yhm-managerth style="width: 110px" title="备注"></yhm-managerth>
            <yhm-managerth style="width: 100px" title="凭证"></yhm-managerth>
          </template>
          <template #listBody>
            <tr v-for="(item,index) in bankDetailList" :class="{InterlacBg:index%2!=0}" :key="index">
              <yhm-manager-td :value="item.selfAccount"></yhm-manager-td>
              <yhm-manager-td :value="item.otherAccount"></yhm-manager-td>
              <yhm-manager-td-date :value="item.cccurDate"></yhm-manager-td-date>
              <yhm-manager-td-direction :direction="item.direction" class="dfJcc" :value="item.direction" :dir-val="false"></yhm-manager-td-direction>
              <yhm-manager-td :value="item.subject"></yhm-manager-td>
              <yhm-manager-td-money :value="item.money"></yhm-manager-td-money>
              <yhm-manager-td-money :value="item.useMoney"></yhm-manager-td-money>
              <yhm-manager-td :value="item.remark"></yhm-manager-td>
              <yhm-manager-td-image :tip="true" width="850" height="600" left="50" type="files" :value="item.storeName" :tag="'bankDetail'" ></yhm-manager-td-image>
            </tr>
          </template>
          <template #empty>
            <span class="m_listNoData"  v-show="bankDetailList.length>=1?false:true">暂时没有数据</span>
          </template>
        </yhm-view-tab-list>
        <yhm-view-tab-list :customize="true"  v-show="tabState[2].select">
          <template #listHead>
            <yhm-managerth style="width: 30px;" title="序号"></yhm-managerth>
            <yhm-managerth style="width: 38px;" title="查看"></yhm-managerth>
            <yhm-managerth style="width: 150px" title="工单号"></yhm-managerth>
            <yhm-managerth style="width: 150px" title="车牌号"></yhm-managerth>
            <yhm-managerth style="width: 150px" title="剩余开票金额"></yhm-managerth>
            <yhm-managerth style="width: 150px" title="开票金额"></yhm-managerth>
            <yhm-managerth style="width: 150px" v-if="isReceivables==='1'" title="未收金额"></yhm-managerth>
            <yhm-managerth style="width: 150px" v-if="isReceivables==='1'" title="勾选对应的收支明细"></yhm-managerth>
          </template>
          <template #listBody>
            <tr v-for="(item,index) in workOrderList" :class="{InterlacBg:index%2!=0}" :key="index">
              <yhm-manager-td-center :value="index+1" style="font-size: 20px;"></yhm-manager-td-center>
              <yhm-manager-td-look @click="view(item)"></yhm-manager-td-look>
              <yhm-manager-td :value="item.workOrder" @click="lookWorkOrderID(item)"></yhm-manager-td>
              <yhm-manager-td @click="viewVehicle(item)" :value="item.licensePlateNumber"></yhm-manager-td>
              <yhm-manager-td-money :value="item.balance"></yhm-manager-td-money>
              <yhm-manager-td-money :value="item.money"></yhm-manager-td-money>
              <yhm-manager-td-money v-if="item.isMoney==='0'&&isReceivables==='1'" :value="item.money"></yhm-manager-td-money>
              <yhm-manager-td-money v-if="item.isMoney==='1'&&isReceivables==='1'" :value="'0.00'"></yhm-manager-td-money>
              <yhm-manager-td-operate v-if="isReceivables==='1'">
                <yhm-manager-td-operate-button v-if="item.isMoney==='0'" @click="checkBankDetail(item)"  value="待勾选" icon="i-zoom" color="#FF0000"></yhm-manager-td-operate-button>
                <yhm-manager-td-operate-button v-if="item.isMoney==='1'" @click="lookBankDetail(item)"  value="查看" icon="list_look" color="#56B4F4"></yhm-manager-td-operate-button>
              </yhm-manager-td-operate>
            </tr>
          </template>
          <template #empty>
            <span class="m_listNoData"  v-show="workOrderList.length>=1?false:true">暂时没有数据</span>
          </template>
        </yhm-view-tab-list>
        <yhm-view-tab-list :customize="true"  v-show="tabState[3].select">
          <template #listHead>
            <yhm-managerth style="width: 40px;" title="查看"></yhm-managerth>
            <yhm-managerth style="width: 110px" title="开始日期"></yhm-managerth>
            <yhm-managerth style="width: 110px" title="结束日期"></yhm-managerth>
            <yhm-managerth style="width: 100px" title="账单总金额"></yhm-managerth>
            <yhm-managerth style="width: 100px" title="已回款金额"></yhm-managerth>
            <yhm-managerth style="width: 100px" title="未回款金额"></yhm-managerth>
            <yhm-managerth style="width: 100px" title="开票金额"></yhm-managerth>
            <yhm-managerth  title="回款状态"></yhm-managerth>
            <yhm-managerth  style="width: 150px" title="勾选对应的收支明细"></yhm-managerth>
          </template>
          <template #listBody>
            <tr v-for="(item,index) in invoiceList" :class="{InterlacBg:index%2!=0}" :key="index">
              <yhm-manager-td  value=" " @click="downloadEvent(item)"><img  style="margin: auto;" width="50" height="30" src="https://hp.yhm.hk/UploadFile/excel.jpg" alt="">
              </yhm-manager-td>
              <yhm-manager-td-date :value="item.monthsDate"></yhm-manager-td-date>
              <yhm-manager-td-date :value="item.endDate"></yhm-manager-td-date>
              <yhm-manager-td-money @click="selectInsurance(item)" :value="item.sumMoney"></yhm-manager-td-money>
              <yhm-manager-td-money @click="selectInsurance(item)" :value="item.alreadyMoney"></yhm-manager-td-money>
              <yhm-manager-td-money :value="item.useMoney"></yhm-manager-td-money>
              <yhm-manager-td-money :value="item.money"></yhm-manager-td-money>
              <yhm-manager-td-center v-if="item.state==0" :value="'未回款'" color="red" style="font-weight: bold"></yhm-manager-td-center>
              <yhm-manager-td-center v-else :value="'已回款'" color="#55AA66"></yhm-manager-td-center>
              <yhm-manager-td-operate>
                <yhm-manager-td-operate-button v-if="item.state==1" @click="selectBankView(item)"  value="查看" icon="list_look" color="#56B4F4"></yhm-manager-td-operate-button>
                <yhm-manager-td-operate-button v-else @click="bankView(item)"  value="待勾选" icon="i-zoom" color="#FF0000"></yhm-manager-td-operate-button>
              </yhm-manager-td-operate>
            </tr>
          </template>
          <template #empty>
            <span class="m_listNoData"  v-show="invoiceList.length>=1?false:true">暂时没有数据</span>
          </template>
        </yhm-view-tab-list>
      </template>
    </yhm-view-tab>
    <div class="f_split"></div>
    <div v-show="type==='0'" v-html="approvalHtml"></div>
    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn>
        <yhm-commonbutton v-show="isApproval === '0'&&type==='1' " @call="adoptEvent" value="通过" icon="i-btn-applicationSm" color="#49a9ea" :flicker="true"></yhm-commonbutton>
        <yhm-commonbutton v-show="isApproval === '0'&&type==='1'" @call="rejectEvent" value="驳回" icon="i-btn-turnDown" color="#FF0000" category="ten"></yhm-commonbutton>

      </template>
    </yhm-formoperate>
  </div>
</template>

<script>
  import { formmixin } from '@/assets/form.js'
  import { formatDate ,accAdd, guid,accMul,formatTime} from '@/assets/common.js'
  export default {
    name: 'openInvoiceView',
    mixins: [formmixin],
    data(){
      return{
        tabState:[{select:true},{select:false},{select:false},{select:false}],
        personID:'',//申请人
        person:'',
        applyDate:'',//申请日期
        maxApplyDate:formatDate(new Date()),
        purchaser:'',//
        purchaserID:'',//购买方
        subject:'',
        subjectID:'',//事由
        invoiceMoney:'',//发票金额
        invoiceMoneyUp:'',//金额大写
        sumMoney:'',//商品金额
        remark:'',//事由说明
        preUseDate:'',//预计使用日期
        minPreUseDate:formatDate(new Date()),
        moneyBackDate:'',//预计回款日期
        minMoneyBackDate:formatDate(new Date()),
        productDetails:[],
        empty:true,
        isProductDetail:false,

        isWare:false,//发票类型是否能选择
        isAdd:'',//是否是第一次请求
        isInit:false,//未付款   是隐藏  预计使用时间
        invoiceCategory:'',
        invoiceCategoryList:[],
        ownerSysNoList:[],
        isReceivables:'',
        isReceivablesList:[],
        purchaserType:'',
        purchaserTypeList:[],
        categoryList:[],
        category:'',
        isBankList:false,
        invoiceHandleList:[],
        invoiceHandle:'',
        isExpressID:false,
        expressID:'',
        express:'',
        isCategory:false,
        workOrder:'',
        ownerID:'',
        ownerCategory:'',
        isApproval:'',
        approvalHtml:'',
        type:'',
        insuranceList:[],//预开发票 回款登记  维护工单保险理赔数据
        isWorkOrder:false,
        workOrderList:[],
        bankID:'',
        bank:'',
        account:'',
        taxNumber:'',
        payerID:'',
        payer:'',
        payerType:'',
        invoiceList:[],
        isFinish:'',
        files:[],
        addresseeID:'',
        addressee:'',
        addresseePhone:'',
        addresseeTel:'',
        mailTitleID:'',
        mailTitle:'',
        mailTitleAddress:'',
        isApprovalRise:'0',//0 发票抬头已审批    1发票抬头未审批完成
      }
    },
    methods: {
      lookExpress(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '750',
          url: '/myAdminExpressView?id='+this.expressID,
          title: '查看快递信息',
          closeCallBack: (data) => {
            if (data) {
              this.initPageData(false)
            }
          }
        })
      },
      selectInsurance(item){
        if(item.insuranceID){
          this.$dialog.OpenWindow({
            width: '1050',
            height: '750',
            title: '查看'+this.purchaser+'回款对应单',
            url: '/insuranceUnitUploadView?id=' + item.insuranceID+'&monthsDate='+item.monthsDate.slice(0,7)+'&endDate='+item.endDate.slice(0,10)+'&unitID='+this.purchaserID,
            closeCallBack: (data)=>{
              if(data){

              }
            }
          })
        }
      },
      lookBankDetail(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '750',
          title: '查看收支明细',
          url: '/unitDetailView?id='+item.ownerID,
          closeCallBack: (data)=>{

          }
        })
      },
      lookWorkOrderID(item){
        this.ajaxJson({
          url: '/fix/Offer/judgmentOrder',
          data: {
            id:item.workOrderID
          },
          call: (data) => {
            if(data.type===0){
              //在线工单数据
              this.$dialog.OpenWindow({
                width: '1050',
                height: '750',
                title: '查看工单信息',
                url: '/workOrderView?id='+item.workOrderID,
                closeCallBack: (data)=>{

                }
              })
            }else{
              //离线工单数据
              this.$dialog.OpenWindow({
                width: '1050',
                height: '750',
                title: '查看工单信息',
                url: '/offlineWorkOrderView?id=' + item.workOrderID,
                closeCallBack: (data) => {

                }
              })
            }
          }
        })
      },
      checkBankDetail(item){
        if(this.isReceivables==='1'){
          this.$dialog.OpenWindow({
            width: '1050',
            height: '750',
            title: '查看'+this.payer+'回款',
            url: '/selectBankDetail?otherID='+this.payerID+'&direction=0&categoryBefore=1&type=3',
            closeCallBack: (data)=>{
              if(data){
                let list=[]
                list.push({
                  orderid:item.ownerID,
                  dependid:data.id,//选中数据的id
                  account:data.account,//银行卡尾号
                  actualMoney: data.useMoney,//交易金额
                  bankName:data.bankName,//银行卡名称
                  cccurDate:data.cccurDate,//交易日期
                  remark:data.remark,//备注
                  subject:data.subject,//交易事由
                  otherID:data.otherID,//对方账户
                  otherName:data.otherName,//对方姓名
                })
                let params={
                  id:item.ownerID,
                  ownerID:data.id,
                  invoiceID:this.ownerID,
                  money:data.money,
                  insuranceList:item.insuranceList,
                  openInvoiceID:this.id,
                  list:list
                }
                this.ajaxJson({
                  url: '/Bill/workOrderReturnMoney',
                  data: params,
                  call: (returnData) => {
                    if (returnData.type === 0) {
                      this.initData()
                      this.$dialog.setReturnValue('1')
                      this.$dialog.alert({
                        tipValue: '勾选成功',
                        alertImg: 'warn',
                        closeCallBack: (returnData)=>{
                        }
                      })
                    }else{
                      this.$dialog.alert({
                        alertImg: 'error',
                        tipValue: returnData.message
                      })
                    }
                  }
                })
              }
            }
          })
        }
      },
      bankView(item){
        if (item.state==1){

        }else {
          this.$dialog.OpenWindow({
            width: '1050',
            height: '750',
            title: '查看'+this.payer+'回款对应单',
            url: '/insuranceBankDetailForm?unitID='+this.payerID+'&ownerID='+item.otherID+'&money='+item.useMoney,
            closeCallBack: (data)=>{
              if(data){
                this.initData()
              }
            }
          })
        }
      },
      selectBankView(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '750',
          title: '查看'+this.unit+'回款对应单',
          url: '/selectBankView?ownerID='+item.otherID,
          closeCallBack: (data)=>{
            if(data){

            }
          }
        })
      },
      downloadEvent(item){
        window.open('/UploadFile/' + item.tag + '/' + item.storeName)
      },
      viewVehicle(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '500',
          url: '/vehicleView?id=' + item.vehicleID,
          title: '查看车辆信息',
          closeCallBack: (data)=>{
            if(data){
              this.initPageData(false)
            }
          }
        })
      },
      view(item){
        if(this.ownerCategory !== '4'&&this.ownerCategory !== '5'){
          this.$dialog.OpenWindow({
            width: '1050',
            height: '750',
            url:  '/claimsForm?id=' + item.ownerID,
            title: '查看收款信息',
            closeCallBack: (data) => {
              if (data) {
              }
            }
          })
        }else if(this.ownerCategory === '4' && this.isFinish === '2'){
          this.$dialog.OpenWindow({
            width: '1050',
            height: '750',
            url:  '/claimsForm?id=' + item.ownerID,
            title: '查看收款信息',
            closeCallBack: (data) => {
              if (data) {
              }
            }
          })
        }else if(this.ownerCategory === '5'){
          if(this.isReceivables === '0'){
            this.$dialog.OpenWindow({
              width: '1050',
              height: '750',
              url:  '/claimsForm?id=' + item.ownerID,
              title: '查看工单信息',
              closeCallBack: (data) => {
                if (data) {
                }
              }
            })
          }else{
            this.lookWorkOrderID(item)
          }
        }else{
          this.$dialog.OpenWindow({
            width: '1070',
            height: '750',
            url:'/offlineWorkOrderForm?id='+item.ownerID,
            title:'编辑工单',
            closeCallBack:(data) =>{
              this.initPageData(false)
            }
          })
        }
      },
      iconClick(num){
        let url=''
        if(num === '0'){
          if(this.payerType === '0'){
            url='/unitBankDetailForm?unitID='+ this.payerID
          }else{
            url='/unitBankDetailForm?personID='+ this.payerID
          }
        }else{
          if(this.purchaserType === '0'){
            url='/unitBankDetailForm?unitID='+ this.purchaserID
          }else if(this.purchaserType === '1'){
            url='/unitBankDetailForm?personID='+ this.purchaserID
          }
        }
        this.$dialog.OpenWindow({
          width: '1050',
          height: '640',
          title: '查看收支明细',
          url: url,
          closeCallBack: (dataTwo)=>{

          }
        })
      },
      unitView(num){
        let title=''
        let url=''
        if(num === '0'){
          if(this.payerType === '0'){
            title='查看单位信息'
            url='/unitView?id=' + this.payerID
          }else{
            title='查看联系人信息'
            url='/personView?id=' + this.payerID
          }
        }else{
          if(this.purchaserType === '0'){
            title='查看单位信息'
            url='/unitView?id=' + this.purchaserID
          }else if(this.purchaserType === '1'){
            title='查看联系人信息'
            url='/personView?id=' + this.purchaserID
          }else{
            title='查看车辆信息'
            url='/vehicleView?id=' + this.purchaserID
          }
        }
        this.$dialog.OpenWindow({
          width: '1050',
          height: '690',
          url:url,
          title:title,
          closeCallBack:(data) =>{
            if(data){
              this.initPageData(false)
            }
          }
        })
      },
      adoptEvent () { //
        if (this.id) {
          this.$dialog.OpenWindow({
            width: 650,
            height: 230,
            title: '审批留言',
            url: '/passMessage?id=' + this.id + '&tableName=48&kind=0',
            closeCallBack: (data) => {
              this.$dialog.setReturnValue(this.id)
              this.initData()
            }
          })
        }
      },
      rejectEvent(){
        if (this.id) {
          let params = {
            id: this.id,
            tableName: '48',
          }
          this.ajaxJson({
            url: '/PersonOffice/getSubmitCatrgoryVue',
            data: params,
            call: (data) => {
              if (data.type === 0) {
                this.category = data.message
                this.$dialog.OpenWindow({
                  width: 1050,
                  height: 720,
                  title: '驳回理由',
                  url: '/rejectReason?category=' + this.category + '&id=' + this.id+'&tableName=48&kind=0',
                  closeCallBack: (data) => {
                    if(data){
                      this.$dialog.setReturnValue('123')
                      this.initData()
                    }
                  }
                })
              }
            }
          })
        }
      },
      initData(){
        let params = {

        }
        this.init({
          url: '/Bill/openInvoiceForm',
          data: params,
          all: (data)=>{
            this.purchaserType=data.purchaserTypePsd.value
            this.purchaserTypeList=data.purchaserTypePsd.list
            this.invoiceCategory=data.invoiceCategoryPsd.value
            this.invoiceCategoryList=data.invoiceCategoryPsd.list
            this.isReceivables=data.isReceivablesPsd.value
            this.isReceivablesList=data.isReceivablesPsd.list
            this.categoryList=data.categoryPsd.list
            this.invoiceHandleList=data.invoiceHandlePsd.list
            this.isApproval=data.isApproval
          },
          add: (data)=>{

          },
          look: (data)=>{
            this.id=data.id
            this.personID=data.personID
            this.ownerID=data.ownerID
            this.ownerCategory=data.ownerCategory
            this.person=data.person
            this.applyDate=data.applyDate
            this.purchaserID=data.purchaserID
            this.purchaser=data.purchaser
            this.subjectID=data.subjectID
            this.approvalHtml=data.approvalHtml
            this.isFinish=data.isFinish
            this.category=data.category
            if(this.category === '2'){
              this.isCategory=true
            }
            this.expressID=data.expressID
            this.express=data.express
            this.moneyBackDate=data.moneyBackDate
            this.invoiceMoney=data.invoiceMoney
            this.invoiceHandle=data.invoiceHandle
            if(this.invoiceHandle === '1'){
              this.isExpressID=true
            }
            this.invoiceMoneyUp=data.invoiceMoneyUp
            this.preUseDate=data.preUseDate
            this.remark=data.remark
            this.productDetails=data.productDetails
            if(this.isReceivables==='1'){
              this.isInit=true
            }
            if(data.productDetails.length>0){
              this.empty = this.productDetails.length === 0
              this.isProductDetail=true
            }
            this.bankDetailList=data.bankDetailList
            if(this.bankDetailList.length>0){
              this.isBankList=true
              this.tabState=[{select:false},{select:true},{select:true},{select:false}]
            }
            this.workOrderList=data.workOrderList
            if(this.workOrderList.length>0){
              this.isWorkOrder=true
              this.isProductDetail=false
              this.tabState=[{select:false},{select:false},{select:true},{select:false}]
            }
            if(data.isFinish !== '2'&&data.ownerCategory === '4'){
              let list=[]
              for (let i = 0; i <data.workOrderList.length ; i++) {
                list.push(data.workOrderList[i].ownerID)
              }
              this.ajaxJson({
                url: '/fix/Offer/getManagerByidList',
                data: {
                  ids:list
                },
                call: (workOrderData) => {
                  if(workOrderData){
                    this.workOrderList=[]
                    for (let j = 0; j <data.workOrderList.length ; j++) {
                      let money=data.workOrderList[j].money
                      for (let i = 0; i < workOrderData.length; i++) {
                        let insertDate = new Date(accAdd(new Date().getTime(), accMul(this.productDetails.length, 1000)))
                        this.workOrderList.push({
                          id: guid(),
                          insertDate: formatTime(insertDate),
                          ownerID: workOrderData[i].id,
                          invoiceID:this.ownerID,
                          workOrderID:workOrderData[i].id,
                          workOrder:workOrderData[i].otherCode,
                          licensePlateNumber:workOrderData[i].vehicle,
                          balance:accAdd(workOrderData[i].finresult,money).toString(),
                          money:money,
                        })
                      }
                    }
                  }
                }
              })
            }else{
              let ids = []
              for(let q in this.workOrderList){
                ids.push(this.workOrderList[q].ownerID)
              }
              ids = ids.join(',')
              this.ajaxJson({
                url: '/fix/fixOrder/queryByidList',
                data: {
                  ids:ids
                },
                call: (dt) => {
                  for(let i in this.workOrderList){
                    for(let j in dt){
                      if(this.workOrderList[i].ownerID==dt[j].id){
                        this.workOrderList[i].workOrderID = this.workOrderList[j].ownerID
                        this.workOrderList[i].workOrder = dt[j].code
                        this.workOrderList[i].licensePlateNumber = dt[j].vehicle
                        this.workOrderList[i].vehicleID = dt[j].vehicleID
                        this.workOrderList[i].money = this.workOrderList[i].money
                        this.workOrderList[i].balance =(Number(dt[j].expend)-Number(dt[j].amountOpened)).toString()
                        this.insuranceList=[]
                        this.insuranceList.push({
                          vehicleBrandID:dt[j].brand,//车辆品牌
                          vehicleBrand:dt[j].brandVal,//车辆品牌
                          vehicleTypeID:dt[j].modelID,//车型ID
                          vehicleType:dt[j].modelVal,//车型ID
                          licensePlateNumber:dt[j].vehicle,//车型ID
                          workOrderID:dt[j].id,//工单ID
                          workOrder:dt[j].code,//工单号
                          operatorID:dt[j].clientID,//业务员
                          operator:dt[j].client,
                          unitOrPerson:dt[j].unitType,//0个人  1单位
                          customerName:dt[j].contactPersonID,//客户姓名
                          customer:dt[j].contactPerson,//客户姓名
                        })
                        this.workOrderList[i].insuranceList=this.insuranceList
                      }
                    }
                  }
                }
              })
            }
            this.addresseeID=data.addresseeID
            this.addressee=data.addressee
            this.addresseePhone=data.addresseePhone
            this.addresseeTel=data.addresseeTel
            this.mailTitleID=data.mailTitleID
            this.mailTitle=data.mailTitle
            this.mailTitleAddress=data.mailTitleAddress
            this.isApprovalRise=data.isApprovalRise

            this.files=data.files
            this.bankID=data.bankID
            this.bank=data.bank
            this.account=data.account
            this.taxNumber=data.taxNumber
            this.payerID=data.payerID
            this.payer=data.payer
            this.payerType=data.payerType
            this.invoiceList=data.invoiceList
            if(this.invoiceList.length>0){
              this.isProductDetail=false
              this.tabState=[{select:false},{select:false},{select:false},{select:true}]
            }
          }
        })
      }
    },
    created () {
      this.setQuery2Value('type')
      this.initData()
    }
  }
</script>

<style scoped>

</style>
