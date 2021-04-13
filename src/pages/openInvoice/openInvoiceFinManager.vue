<template>
  <div>
    <yhm-managerpage category="1" @statisticalClick="statisticalClick" :statisticalShow="true">
      <!--导航条-->
      <!--<template #navigation>财务管理&nbsp;&gt;&nbsp;票据&nbsp;&gt;&nbsp;发票管理</template>-->
      <!--导航条-->

      <template #navigationTab>
        <router-link class="menuTabDiv" :to="{path:'/home/invoiceTilingManager'}">库存发票</router-link>
        <router-link class="menuTabDiv menuTabActive" :to="{path:'/home/openInvoiceFinManager'}">开票通知</router-link>
        <router-link class="menuTabDiv" :to="{path:'/home/openInvoiceManagerAll'}">开票审批中</router-link>
      </template>
      <template #operate>
        <yhm-commonbutton :value="choose?'收起筛选':'展开筛选'"  :icon="choose?'btnUp':'btnDown'" @call="switchChoose()"></yhm-commonbutton>
        <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initData"></yhm-managersearch>
        <yhm-radiofilter  @initData="initChoose('state')" title="开票状态" :content="statePsd">
        </yhm-radiofilter> <yhm-commonbutton value="多条打印签收单" icon="i-btn-print" @call="printingMonre" :show="selectValue.length>0&&statePsd.value!='2'&&statePsd.value!='6'&&statePsd.value!='7'&&statePsd.value!='8'" category="three"></yhm-commonbutton>
        <yhm-radiofilter  @initData="initChoose('invoiceType')" title="发票类型" :content="invoiceTypePsd"></yhm-radiofilter>
        <yhm-radiofilter  @initData="initChoose('category')" title="开票类型" :content="categoryPsd"></yhm-radiofilter>
       </template>
      <!--筛选区-->
      <template #choose>
        <div v-show="choose" class="buttonBody mptZero">
          <yhm-radiofilter  @initData="initChoose('purchaserType')" title="购买方类型" :content="purchaserTypePsd"></yhm-radiofilter>
          <yhm-radiofilter  @initData="initChoose('isReceivables')" title="款项状态" :content="isReceivablesPsd"></yhm-radiofilter>
          <yhm-radiofilter  @initData="initChoose('invoiceCategory')" title="发票类型" :content="invoiceCategoryPsd"></yhm-radiofilter>
        </div>
      </template>
      <template #listHead>
        <yhm-managerth style="width: 38px;" title="选择"></yhm-managerth>
        <yhm-managerth style="width: 40px;" title="查看"></yhm-managerth>
        <yhm-managerth style="width: 110px;" title="申请时间" value="applyDate"></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="付款方" value="purchaserID"></yhm-managerth>
        <yhm-managerth style="width: 80px;" title="发票金额" value="invoiceMoney"></yhm-managerth>
        <yhm-managerth style="width: 60px;" title="税率（%）"></yhm-managerth>
        <yhm-managerth style="width: 70px;" title="税额"></yhm-managerth>
        <yhm-managerth style="width: 80px;" title="开票事由" value="subujectID"></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="发票抬头" value="purchaserID"></yhm-managerth>
        <yhm-managerth style="width: 120px;" title="发票类型" value="invoiceCategory"></yhm-managerth>
        <yhm-managerth style="width: 70px;" title="款项状态" value=""></yhm-managerth>
        <yhm-managerth style="width: 110px;" title="预计收款日期" value="personID"></yhm-managerth>
        <yhm-managerth style="width: 80px;" title="账期（天）"></yhm-managerth>
        <yhm-managerth style="width: 80px;" title="状态" value=""></yhm-managerth>
        <yhm-managerth  title="操作" value=""></yhm-managerth>
      </template>
      <template #listBody>
        <tr v-for="(item,index) in content" :key="index" :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0},{listDelLine: item.isFinish === '4'}]">
          <yhm-manager-td-checkbox :value="item"></yhm-manager-td-checkbox>
          <yhm-manager-td-look @click="view(item)"></yhm-manager-td-look>
          <yhm-manager-td-date :value="item.applyDate"></yhm-manager-td-date>
          <yhm-manager-td :tip="true" :value="item.payer" @click="selectPayer(item)"></yhm-manager-td>
          <yhm-manager-td-money v-show="item.ownerCategory=='2'" style="color:red" :value="item.invoiceMoney"></yhm-manager-td-money>
          <yhm-manager-td-money v-show="item.ownerCategory!='2'" :value="item.invoiceMoney"></yhm-manager-td-money>
          <yhm-manager-td-money :value="item.taxRate"></yhm-manager-td-money>
          <yhm-manager-td-money :value="item.taxAmount"></yhm-manager-td-money>
          <yhm-manager-td-psd @click="view(item)" :value="item.category" :list="categoryList"></yhm-manager-td-psd>
          <yhm-manager-td :tip="true" :value="item.purchaser" @click="selectUnit(item)"></yhm-manager-td>
          <yhm-manager-td-psd :value="item.invoiceCategory" :list="invoiceCategoryList"></yhm-manager-td-psd>
          <yhm-manager-td-psd :value="item.isReceivables" @click="clickSelect(item)" :list="isReceivablesList"></yhm-manager-td-psd>
          <yhm-manager-td-date :value="item.moneyBackDate"></yhm-manager-td-date>
          <yhm-manager-td :value="item.day"></yhm-manager-td>
          <yhm-manager-td-state :value="item.stateVal" :stateColor="item.stateColor" :stateImg="item.stateImg"></yhm-manager-td-state>
          <yhm-manager-td-operate>
            <yhm-manager-td-operate-button v-show="item.invoiceHandle=='1'&&item.isFinish=='2'" @click="lookExpress(item)" icon="i-kuaidi" color="#246454"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button v-show="item.isFinish=='2'||item.isFinish=='3'||item.isFinish=='7'||item.isFinish=='8'||item.isFinish=='9'" @click="printing(item)" value="发票签收单"  icon="i-btn-print" color="#6406f9"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button v-show="item.isFinish === '1'&&item.invoiceCategory !== '2'" @click="invoiceTrial(item)" icon="i-invoiceView" value="发票试算" color="#fd6802"></yhm-manager-td-operate-button>
            <!--<yhm-manager-td-operate-button v-show="item.isFinish === '1'&&item.invoiceCategory !== '2'&&item.trialSave==='1'" @click="invoiceTrial(item)" icon="i-invoiceView" value="开发票" color="#fd6802"></yhm-manager-td-operate-button>-->
            <yhm-manager-td-operate-button v-show="item.isFinish === '1'&&item.invoiceCategory === '2'" @click="invoiceTrialVehicle(item)" icon="i-invoiceView" value="发票试算" color="#fd6802"></yhm-manager-td-operate-button>
            <!--<yhm-manager-td-operate-button v-show="item.isFinish === '1'&&item.invoiceCategory === '2'&&item.trialSave==='1'" @click="invoiceTrialVehicle(item)" icon="i-invoiceView" value="开发票" color="#fd6802"></yhm-manager-td-operate-button>-->
            <yhm-manager-td-operate-button v-show="(item.isFinish === '2'||item.isFinish == 3||item.isFinish ==8||item.isFinish == 7||item.isFinish == 9)&&item.invoiceCategory !== '2'" @click="invoiceTrial(item)" icon="i-invoiceView" value="查看发票" color="#fd6802"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button v-show="item.isFinish === '2'&&item.invoiceCategory === '2'" @click="invoiceTrialVehicle(item)" icon="i-invoiceView" value="查看发票" color="#fd6802"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button v-show="item.isFinish === '7'" @click="addExpress(item)" icon="i-invoiceView" value="添加快递申请" color="#fd6802"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button v-show="(item.isFinish == 3||item.isFinish ==8||item.isFinish == 7||item.isFinish == 9) && item.isReceivables == 1 && item.ownerCategory === '3'" :no-click="item.isApproval==='3'" @click="view(item)" value="收款登记" icon="i-btn-grant" color="#be08e3"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button v-show="(item.isFinish == 3||item.isFinish ==8||item.isFinish == 7||item.isFinish == 9) && item.isReceivables == 1 && item.ownerCategory !== '3'" :no-click="item.isApproval==='3'" @click="refundMoney(item)" value="收款登记" icon="i-btn-grant" color="#be08e3"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button v-show="item.isFinish === '2'||item.isFinish === '3'||item.isFinish ==8||item.isFinish == 7||item.isFinish == 9" @click="toVoidInvoice(item,'0')" value="作废发票" icon="i-btn-grant" color="#be08e3"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button v-show="(item.isFinish === '2'||item.isFinish === '3'||item.isFinish ==8||item.isFinish == 7)&& item.state === '-1'" @click="addOpenInvoice(item)" value="添加红字发票" icon="i-btn-grant" color="#ca0909"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button v-show="item.isFinish === '4'" @click="toVoidInvoice(item,'1')" value="作废原因" icon="i-btn-grant" color="#be08e3"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button v-show="item.isFinish === '3'" @click="urge(item)" value="催款" icon="i-btn-urge" color="#2AA70B"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button v-show="item.openInvoiceVehicleID === ''&&item.invoiceCategory === '2'" @click="openInvoiceVehicleForm(item)" value="添加机动车登记信息" icon="i-btn-grant" color="#be08e3"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button v-show="item.openInvoiceVehicleID !== ''&&item.invoiceCategory === '2'" @click="openInvoiceVehicleForm(item)" value="查看机动车登记信息" icon="i-btn-grant" color="#be08e3"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button v-show="item.toVoid !== '0'" @click="openInvoiceToVoidInvoice(item)" value="查看作废发票"  icon="i-invoiceView" color="#6406f9"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button v-show="item.state=='-2'&&item.ownerCategory!='2'" @click="openInvoiceRed(item)" value="查看红字发票"  icon="i-invoiceView" color="#FF1641"></yhm-manager-td-operate-button>
          </yhm-manager-td-operate>
        </tr>
      </template>
      <!--数据空提示-->
      <template #empty>
        <span class="m_listNoData" v-show="empty">暂时没有数据</span>
      </template>
      <template #total>
        <div class="listTotalCrente m_list" style="width: 1420px;">
          <!--<div style="width: 280px; margin-right: 10px;">-->
            <!--<table width="100%" cellpadding="0" cellspacing="0" class="m_content_table m_content_total_table">-->
              <!--<thead>-->
              <!--<tr>-->
                <!--<yhm-managerth style="width: 100px;" before-color="black" title="" before-title="总张数" ></yhm-managerth>-->
                <!--<yhm-managerth style="width: 100px;" before-color="#ff0000" title="" before-title="总金额"></yhm-managerth>-->
              <!--</tr>-->
              <!--</thead>-->
              <!--<tbody>-->
              <!--<tr>-->
                <!--<yhm-manager-td-rgt v-for="(item,index) in contentTotal" :key="index" :value="item.count"></yhm-manager-td-rgt>-->
                <!--<yhm-manager-td-money v-for="(item,index) in contentTotal" :style="{color:item.money<0?'#ff0000':''}" :key="index" :value="item.money"></yhm-manager-td-money>-->
              <!--</tr>-->
              <!--</tbody>-->
            <!--</table>-->
          <!--</div>-->
          <div style="width: 1420px;">
            <table width="100%" cellpadding="0" cellspacing="0" class="m_content_table m_content_total_table">
              <thead>
              <tr>
                <yhm-managerth style="width: 130px;" before-color="#fff" title="" before-title="" ></yhm-managerth>
                <yhm-managerth style="width: 90px;" before-color="#002AFF" title="" before-title="已开票张数"></yhm-managerth>
                <yhm-managerth style="width: 130px;" before-color="#9e2c66" title="" before-title="待收款已开票张数"></yhm-managerth>
                <yhm-managerth style="width: 80px;" before-color="#c150e6" title="" before-title="待开票张数"></yhm-managerth>
                <yhm-managerth style="width: 70px;" before-color="#9113a0" title="" before-title="库存张数"></yhm-managerth>
                <yhm-managerth style="width: 70px;" before-color="#ff0000" title="" before-title="剩余张数"></yhm-managerth>
                <yhm-managerth style="width: 100px;" before-color="#002AFF" title="" before-title="已开票总金额"></yhm-managerth>
                <yhm-managerth style="width: 140px;" before-color="#9e2c66" title="" before-title="待收款已开票总金额"></yhm-managerth>
                <yhm-managerth style="width: 100px;" before-color="#c150e6" title="" before-title="待开票总金额"></yhm-managerth>
                <yhm-managerth style="width: 120px;" before-color="#ff0000" title="" before-title="待开红字发票张数"></yhm-managerth>
                <yhm-managerth style="" before-color="#ff0000" title="" before-title="待开红字发票总金额"></yhm-managerth>
                <yhm-managerth style="width: 120px;" before-color="#ff0000" title="" before-title="已开红字发票张数"></yhm-managerth>
                <yhm-managerth style="width: 130px;" before-color="#ff0000" title="" before-title="已开红字发票总金额"></yhm-managerth>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(item,index) in stockTotal" :key="index">
                <yhm-manager-td-rgt :value="item.categoryName"></yhm-manager-td-rgt>
                <yhm-manager-td-rgt style="color:#002AFF" :value="item.openedNum"></yhm-manager-td-rgt>
                <yhm-manager-td-rgt style="color:#9e2c66" :value="item.uncollectedNum"></yhm-manager-td-rgt>
                <yhm-manager-td-rgt style="color:#c150e6" :value="item.num"></yhm-manager-td-rgt>
                <yhm-manager-td-rgt style="color:#9113a0" :value="item.stockNum"></yhm-manager-td-rgt>
                <yhm-manager-td-rgt style="color:#ff0000" :value="item.surplus"></yhm-manager-td-rgt>
                <yhm-manager-td-money style="color:#002AFF" :value="item.openedMoney"></yhm-manager-td-money>
                <yhm-manager-td-money style="color:#9e2c66" :value="item.uncollectedMoney"></yhm-manager-td-money>
                <yhm-manager-td-money style="color:#c150e6" :value="item.numMoney"></yhm-manager-td-money>
                <yhm-manager-td-rgt style="color:#ff0000" :value="item.redNum"></yhm-manager-td-rgt>
                <yhm-manager-td-money style="color:#ff0000" :value="item.redNumMoney"></yhm-manager-td-money>
                <yhm-manager-td-money style="color:#ff0000" :value="item.redOpenedMoney"></yhm-manager-td-money>
                <yhm-manager-td-rgt style="color:#ff0000" :value="item.redOpenedNum"></yhm-manager-td-rgt>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </template>
      <!--分页控件-->
      <template #pager>
        <yhm-pagination :pager="pager" @initData="initPageData(false)"></yhm-pagination>
      </template>
      <!--数据空提示-->

    </yhm-managerpage>
  </div>
</template>

<script>
  import { managermixin } from '@/assets/manager.js'
  import { formatDate ,accAdd, guid,accMul,formatTime} from '@/assets/common.js'
  export default {
    name: 'openInvoiceFinManager',
    mixins: [managermixin],
    data(){
      return{
        isReceivablesList:[],
        isReceivables:'',
        isReceivablesPsd: {
          value: '',
          list: []
        },
        categoryList:[],
        category:'',
        categoryPsd: {
          value: '',
          list: []
        },
        purchaserTypeList:[],
        purchaserType:'',
        purchaserTypePsd: {
          value: '',
          list: []
        },
        state:'',
        statePsd: {
          value: '',
          list: []
        },
        invoiceType:'',
        invoiceTypePsd:{
          value: '',
          list: []
        },
        invoiceCategoryList:[],
        invoiceCategory:'',
        invoiceCategoryPsd: {
          value: '',
          list: []
        },
        contentTotal:[],
        stockTotal:[]
      }
    },
    methods:{
      openInvoiceRed(item){
        let url=''
        let title=''
        if(item.id){
          // if(item.state !== '0'){
          url='/openInvoiceView?id='+item.ownerID +'&type=0'
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
      },
      lookExpress(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '750',
          url: '/myAdminExpressView?id='+item.expressID,
          title: '查看快递信息',
          closeCallBack: (data) => {
            if (data) {
              this.initPageData(false)
            }
          }
        })
      },
      statisticalClick(){
        this.$dialog.OpenWindow({
          width: '1250',
          height: '750',
          url:'/invoiceCartogram',
          title:'开票总览统计图',
          closeCallBack:(data) =>{
            // this.initPageData(false)
          }
        })
      },
      printingMonre(){
        let id=''
        for (let i = 0; i < this.selectValue.length; i++) {
          if(i==0){
            id='\''+this.selectValue[i]+'\''
          }else{
            id=id+',\''+this.selectValue[i]+'\''
          }
        }
        this.$dialog.OpenWindow({
          width: '465',
          height: '365',
          title: '打印开票签收单',
          url:'/printingOpenInvoice?id='+id,
          closeCallBack: (data)=>{
            if(data){

            }
          }
        })
      },
      printing(item){
        this.$dialog.OpenWindow({
          width: '465',
          height: '365',
          title: '打印开票签收单',
          url:'/printingOpenInvoice?id=\''+item.id+'\'',
          closeCallBack: (data)=>{
            if(data){

            }
          }
        })
      },
      addExpress(item){
        let params={
          id:item.id
        }
        this.ajaxJson({
          url: '/Bill/getInvoiceInformation',
          data: params,
          call: (data) => {
            if(data){
              sessionStorage.invoiceInformation = JSON.stringify(data)
              sessionStorage.purchaser = JSON.stringify(item.purchaser)
              sessionStorage.addressee = JSON.stringify(item.addressee)
              sessionStorage.addresseeID = JSON.stringify(item.addresseeID)
              sessionStorage.addresseeTel = JSON.stringify(item.addresseeTel)
              sessionStorage.addresseePhone = JSON.stringify(item.addresseePhone)
              sessionStorage.mailTitle = JSON.stringify(item.mailTitle)
              sessionStorage.mailTitleAddress = JSON.stringify(item.mailTitleAddress)
              sessionStorage.mailTitleID = JSON.stringify(item.mailTitleID)
              this.$dialog.OpenWindow({
                width: '1050',
                height: '750',
                url: '/myExpressForm?businessID='+item.id+'&category=1',
                title: '添加快递信息',
                closeCallBack: (data) => {
                  if (data) {
                    this.lastData = data
                    this.initPageData(false)
                    sessionStorage.removeItem('invoiceUnit')
                    sessionStorage.removeItem('invoiceUnit')
                    sessionStorage.removeItem('invoiceInformation')
                  }
                }
              })
            }
          }
        })
      },
      addOpenInvoice(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '790',
          title: '添加开票信息',
          url:'/openInvoiceForm?isAdd=true&ownerID='+item.id+'&ownerCategory=2',
          closeCallBack: (data)=>{
            if(data){
              this.initPageData(false)
            }
          }
        })
      },
      openInvoiceToVoidInvoice(item){
        this.$dialog.OpenWindow({
          width: '750',
          height: '390',
          url:'/openInvoiceToVoidInvoice?ownerID=' + item.id,
          title:'查看作废信息',
          closeCallBack:(data) =>{
            if(data){
              this.initPageData(false)
            }
          }
        })
      },
      selectPayer(item){
        let url='/unitView?id=' + item.payerID
        let title='查看单位信息'
        if(item.payerType === '1'){
          url='/personView?id=' + item.payerID
          title='查看联系人信息'
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
      selectUnit(item){
        if(item.purchaserType==='0'){
          this.$dialog.OpenWindow({
            width: '1050',
            height: '690',
            url:'/unitView?id=' + item.purchaserID,
            title:'查看单位信息',
            closeCallBack:(data) =>{
              if(data){
                this.initPageData(false)
              }
            }
          })
        }else if(item.purchaserType==='1'){
          this.$dialog.OpenWindow({
            width: '1050',
            height: '750',
            url: '/personView?id=' + item.purchaserID,
            title: '查看联系人信息',
            closeCallBack: (data)=>{
              if(data){
                this.initPageData(false)
              }
            }
          })
        }else{
          this.$dialog.OpenWindow({
            width: '1050',
            height: '500',
            url: '/vehicleView?id=' + item.purchaserID,
            title: '查看车辆信息',
            closeCallBack: (data)=>{
              if(data){
                this.initPageData(false)
              }
            }
          })
        }
      },
      clickSelect(item){
        if(item.ownerCategory === '1'){
          this.$dialog.OpenWindow({
            width: '1050',
            height: '750',
            url: '/claimsForm?id=' + item.otherID,
            title: '查看收款信息',
            closeCallBack: (data) => {
              if (data) {
                this.lastData = data
                this.initPageData(false)
              }
            }
          })
        }
      },
      openInvoiceVehicleForm(item){
        let type=0
        if(parseInt(item.isFinish)>1){
          type=1
        }
        this.$dialog.OpenWindow({
          width: '1025',
          height: '680',
          title: '机动车发票登记',
          url:'/openInvoiceVehicleForm?ownerID='+item.id+'&type='+type,
          closeCallBack: (data)=>{
            if(data){
              this.initPageData(false)
            }
          }
        })
      },
      urge(item){
        if (item.id) {
          this.$dialog.confirm({
            width: 250,
            tipValue: '是否催收账款?',
            btnValueOk: '是',
            btnValueCancel: '否',
            alertImg: 'warn',
            okCallBack: () => {
              let params = {
                id: item.id
              }
              this.ajaxJson({
                url: '/Bill/openInvoiceUrgeCollection',
                data: params,
                call: (data) => {
                  if (data.type === 0) {
                    this.$dialog.alert({
                      tipValue: '催促成功！'
                    })
                  }else{
                    this.$dialog.alert({
                      alertImg: 'error',
                      tipValue: '催促失败！'
                    })
                  }
                }
              })
            }
          })
        }
      },
      toVoidInvoice(item,type){
        this.$dialog.OpenWindow({
          width: '1025',
          height: '480',
          title: '作废发票',
          url:'/openInvoiceToVoid?ownerID='+item.id+'&type='+type,
          closeCallBack: (data)=>{
            if(data){
              this.initPageData(false)
            }
          }
        })
      },
      refundMoney(item){
        let sumMoney=0.00
        let bankDetailList=[]
        if(item.ownerCategory === '0'){
          if(item.purchaserID){
            this.$dialog.OpenWindow({
              width: '1050',
              height: '692',
              title: '选择收支明细',
              url: '/selectBankDetail?direction=0&categoryBefore=1&selectType=1&type=2&otherID='+item.purchaserID,
              closeCallBack: (data)=>{
                if(data){
                  let jump='0'
                  for (let i = 0; i < data.length; i++) {
                    let insertDate = new Date(accAdd(new Date().getTime(), accMul(bankDetailList.length, 1000)))
                    bankDetailList.push({
                      id: guid(),
                      bankDetailID: data[i].id,
                      insertDate: formatTime(insertDate),
                      ownerID: item.id,
                      money:data[i].useMoney
                    })
                    sumMoney = parseFloat(sumMoney)+parseFloat(data[i].useMoney)
                    if(parseFloat(sumMoney)>parseFloat(item.invoiceMoney)){
                      bankDetailList[i].money=parseFloat(item.invoiceMoney)-parseFloat(sumMoney)+parseFloat(data[i].useMoney)
                      jump='1'
                      break;
                    }else if(parseFloat(sumMoney)==parseFloat(item.invoiceMoney)){
                      jump='1'
                      break;
                    }
                  }
                  if(jump === '1'){
                    this.$dialog.confirm({
                      width: 450,
                      tipValue: '确认所选收支明细,开票金额（<span style="color:red">'+item.invoiceMoney+'</span>）?',
                      btnValueOk: '确认',
                      alertImg: 'warn',
                      okCallBack: () => {
                        let params={
                          id:item.id,
                          bankDetailList:bankDetailList
                        }
                        this.ajaxJson({
                          url: '/Bill/openInvoiceCollection',
                          data: params,
                          call: (data) => {
                            if (data.type == 0) {
                              this.$dialog.alert({
                                tipValue: data.message,
                                closeCallBack: ()=>{
                                  this.initPageData()
                                }
                              })
                            }else{
                              this.$dialog.alert({
                                tipValue: data.message,
                                closeCallBack: ()=>{
                                  this.initPageData()
                                }
                              })
                            }
                          }
                        })
                      },
                      cancelCallBack:()=>{
                        bankDetailList=[]
                      }
                    })
                  }else{
                    this.$dialog.alert({
                      alertImg: 'warn',
                      tipValue: '所选收支明细金额小于开票金额，请重新选择'
                    })
                  }
                }
              }
            })
          }
        }else if(item.ownerCategory === '4'){
          this.$dialog.OpenWindow({
            width: '1050',
            height: '692',
            title: '登记收款信息',
            url: '/openInvoiceFinForm?id=' + item.id,
            closeCallBack: (data) => {
              if(data) {

              }
            }
          })
        }else if(item.ownerCategory === '5'){
          this.$dialog.OpenWindow({
            width: '1050',
            height: '692',
            title: '登记收款信息',
            url: '/openInvoiceView?type=0&id=' + item.id,
            closeCallBack: (data) => {
              if(data) {
                this.initPageData(false)
              }
            }
          })
        }
      },
      invoiceTrialVehicle(item){
        if (item.openInvoiceVehicleID){
          let url=''
          if(item.isFinish==='1'){
            url = '/openInvoiceTrialVehicle?ownerID='+item.id +'&type=0'
          }else{
            url = '/openInvoiceTrialVehicle?ownerID='+item.id +'&type=1'
          }
          this.$dialog.OpenWindow({
            width: '1025',
            height: '768',
            title: '发票试算',
            url:url,
            closeCallBack: (data)=>{
              if(data){
                this.initPageData(false)
              }
            }
          })
        }else{
          this.$dialog.alert({
            tipValue: '请先登记机动车信息',
            closeCallBack:() => {
              this.openInvoiceVehicleForm(item)
            }
          })
        }
      },
      invoiceTrial(item){
        let url=''
        if(item.isFinish==='1'){
          if(item.invoiceCategory === '3'){
            url = '/openInvoiceTrial?ownerID='+item.id +'&type=0'
          }else{
            url = '/openInvoiceTrialOther?ownerID='+item.id +'&type=0'
          }
        }else{
          if(item.invoiceCategory === '3'){
            url = '/openInvoiceTrial?ownerID='+item.id +'&type=1'
          }else{
            url = '/openInvoiceTrialOther?ownerID='+item.id +'&type=1'
          }
        }
        this.$dialog.OpenWindow({
          width: '1025',
          height: '768',
          title: '发票试算',
          url:url,
          closeCallBack: (data)=>{
            if(data){
              this.initPageData(false)
            }
          }
        })
      },
      view(item){
        let url=''
        let title=''
        if(item.id){
          // if(item.state !== '0'){
          url='/openInvoiceView?id='+item.id +'&type=0'
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
      },
      initPageData(initValue){
        let params = {}

        if (initValue) {
          params = {
            state:'2'
          }
        } else {
          params = {
            state: this.statePsd.value,
            invoiceCategory:this.invoiceCategoryPsd.value,
            purchaserType:this.purchaserTypePsd.value,
            isReceivables:this.isReceivablesPsd.value,
            invoiceType:this.invoiceTypePsd.value,
            category:this.categoryPsd.value
          }
        }
        this.init({
          initValue:initValue,
          url: '/Bill/openInvoiceFinManager',
          data:params,
          all:(data) =>{
            //this.contentTotal = data.total
          },
          init:(data)=>{
            this.statePsd = data.statePsd
            this.invoiceCategoryPsd = data.invoiceCategoryPsd
            this.invoiceCategoryList = data.invoiceCategoryPsd.list
            this.purchaserTypePsd=data.purchaserTypePsd
            this.purchaserTypeList=data.purchaserTypePsd.list
            this.isReceivablesPsd=data.isReceivablesPsd
            this.isReceivablesList=data.isReceivablesPsd.list
            this.categoryPsd=data.categoryPsd
            this.categoryList=data.categoryPsd.list
            this.invoiceTypePsd=data.invoiceTypePsd
            this.stockTotal=data.stockTotal
          }
        })
      },
    },
    created () {

    }
  }
</script>

<style scoped>

</style>
