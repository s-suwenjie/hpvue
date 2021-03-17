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
        <yhm-commonbutton value="添加非业务开票申请" icon="btnAdd" :flicker="true" @call="add()" category="one"></yhm-commonbutton>
        <yhm-commonbutton :value="choose?'收起筛选':'展开筛选'"  :icon="choose?'btnUp':'btnDown'" @call="switchChoose()"></yhm-commonbutton>
        <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initData"></yhm-managersearch>
        <yhm-radiofilter  @initData="initChoose('state')" title="审批状态" :content="statePsd"></yhm-radiofilter>
        <yhm-radiofilter  @initData="initChoose('category')" title="开票类型" :content="categoryPsd"></yhm-radiofilter>
      </template>
      <!--筛选区-->
      <template #choose>
        <div v-show="choose" class="buttonBody mptZero">
          <yhm-radiofilter  @initData="initChoose('purchaserType')" title="购买方类型" :content="purchaserTypePsd"></yhm-radiofilter>
          <yhm-radiofilter  @initData="initChoose('isReceivables')" title="款项状态" :content="isReceivablesPsd"></yhm-radiofilter>
          <yhm-radiofilter  @initData="initChoose('invoiceCategory')" title="发票类型" :content="invoiceCategoryPsd"></yhm-radiofilter>
          <yhm-radiofilter  @initData="initChoose('viewLevels')" title="查看下属" all="0" :content="listViewLevels"></yhm-radiofilter>
        </div>
      </template>
      <template #listHead>
        <yhm-managerth style="width: 38px;" title="选择"></yhm-managerth>
        <yhm-managerth style="width: 50px;" title="查看"></yhm-managerth>
        <yhm-managerth v-if="listViewLevels.value==1"  style="width: 80px" title="申请人" ></yhm-managerth>
        <yhm-managerth style="width: 110px;" title="申请时间" value="applyDate"></yhm-managerth>
        <yhm-managerth style="width: 80px;" title="税额合计" value="invoiceMoney"></yhm-managerth>
        <yhm-managerth style="width: 120px;" title="开票事由" value="subujectID"></yhm-managerth>
        <yhm-managerth style="width: 190px;" title="发票抬头" value="purchaserID"></yhm-managerth>
        <yhm-managerth style="width: 150px;" title="发票类型" value="invoiceCategory"></yhm-managerth>
        <yhm-managerth style="width: 80px;" title="款项状态" value=""></yhm-managerth>
        <yhm-managerth style="width: 110px;" title="预计收款日期" value="personID"></yhm-managerth>
        <yhm-managerth style="width: 150px;" title="状态" value=""></yhm-managerth>
        <yhm-managerth  v-if="listViewLevels.value==0" title="操作" value=""></yhm-managerth>
      </template>
      <template #listBody>
        <tr v-for="(item,index) in content" :key="index" :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]">
          <yhm-manager-td-checkbox :value="item"></yhm-manager-td-checkbox>
          <yhm-manager-td-look @click="view(item)"></yhm-manager-td-look>
          <yhm-manager-td v-if="listViewLevels.value==1" :value="item.person"></yhm-manager-td>
          <yhm-manager-td-date :value="item.applyDate"></yhm-manager-td-date>
          <yhm-manager-td-money :value="item.invoiceMoney"></yhm-manager-td-money>
          <yhm-manager-td-psd  :value="item.category" :list="categoryList"></yhm-manager-td-psd>
          <yhm-manager-td :value="item.purchaser"></yhm-manager-td>
          <yhm-manager-td-psd :value="item.invoiceCategory" :list="invoiceCategoryList"></yhm-manager-td-psd>
          <yhm-manager-td-psd :value="item.isReceivables" :list="isReceivablesList"></yhm-manager-td-psd>
          <yhm-manager-td-date :value="item.moneyBackDate"></yhm-manager-td-date>
          <yhm-manager-td-state :value="item.stateVal" :stateColor="item.stateColor" :stateImg="item.stateImg"></yhm-manager-td-state>
          <yhm-manager-td-operate  v-if="listViewLevels.value==0">
            <yhm-manager-td-operate-button :no-click="item.state!=='0' || item.isFinish === '1'" @click="submit(item)" value="提交申请" icon="i-btn-applicationSm" color="#49a9ea"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button :no-click="item.state === '0' || item.isFinish === '1' || item.state === '-1'" @click="urge(item)" value="催促" icon="i-btn-urge" color="#2AA70B"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button v-show="item.isFinish === '2'||item.isFinish === '3'" @click="invoiceTrial(item)" icon="i-invoiceView" value="查看发票" color="#fd6802"></yhm-manager-td-operate-button>
            <!--<yhm-manager-td-operate-button v-show="item.isFinish === '7'" @click="addExpress(item)" icon="i-invoiceView" value="添加快递申请" color="#fd6802"></yhm-manager-td-operate-button>-->
            <yhm-manager-td-operate-button v-show="item.state === '1' " @click="revokeApply(item)" value="撤销申请" icon="i-btn-applicationSm" color="#49a9ea"></yhm-manager-td-operate-button>
          </yhm-manager-td-operate>
        </tr>
      </template>
      <!--数据空提示-->
      <template #empty>
        <span class="m_listNoData" v-show="empty">暂时没有数据</span>
      </template>
      <template #total>
        <div class="listTotalCrente m_list w620">
          <table width="100%" cellpadding="0" cellspacing="0" class="m_content_table m_content_total_table">
            <thead>
            <tr>
              <yhm-managerth style="width: 100px;" before-color="black" title="" before-title="总数" ></yhm-managerth>
              <yhm-managerth style="width: 100px;" before-color="#ff0000" title="" before-title="总金额"></yhm-managerth>
            </tr>
            </thead>
            <tbody>
            <tr>
              <yhm-manager-td-rgt v-for="(item,index) in contentTotal" :key="index" :value="item.count"></yhm-manager-td-rgt>
              <yhm-manager-td-money v-for="(item,index) in contentTotal" :key="index" :value="item.money"></yhm-manager-td-money>
            </tr>
            </tbody>
          </table>
        </div>
      </template>
      <!--分页控件-->
      <template #pager>
        <yhm-pagination :pager="pager" @initData="initPageData(false)"></yhm-pagination>
      </template>
      <!--数据空提示-->
      <template #empty>
        <span class="m_listNoData" v-show="empty">暂时没有数据</span>
      </template>

    </yhm-managerpage>
  </div>
</template>

<script>
  import { managermixin } from '@/assets/manager.js'
  export default {
    name: 'openInvoiceManager',
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
        listViewLevels:{
          value:"0",
          list:[]
        },
        purchaserTypeList:[],
        purchaserType:'',
        purchaserTypePsd: {
          value: '',
          list: []
        },
        stateList:[],
        state:'',
        statePsd: {
          value: '',
          list: []
        },
        invoiceCategoryList:[],
        invoiceCategory:'',
        invoiceCategoryPsd: {
          value: '',
          list: []
        },
        menuTabOn: 6,
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
        contentTotal: []
      }
    },
    methods:{
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
              sessionStorage.invoiceUnitID = JSON.stringify(item.purchaserID)
              sessionStorage.invoiceUnit = JSON.stringify(item.purchaser)
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
      revokeApply(item){
        let params={
          id:item.id
        }
        this.ajaxJson({
          url: '/Bill/revokeApplyOpenInvoice',
          data:params,
          call:(data) =>{
            if (data.type == 0) {
              this.$dialog.setReturnValue(this.id)
              this.$dialog.alert({
                tipValue: data.message,
                closeCallBack: ()=>{
                  this.initPageData(false)
                }
              })
            }else{
              this.$dialog.alert({
                tipValue: data.message,
                closeCallBack: ()=>{
                }
              })
            }
          }
        })
      },
      urge (item) {
        if (item.id) {
          this.$dialog.confirm({
            width: 250,
            tipValue: '是否催促?',
            btnValueOk: '是',
            btnValueCancel: '否',
            alertImg: 'warn',
            okCallBack: () => {
              let params = {
                id: item.id,
                tableName: 45
              }
              this.ajaxJson({
                url: '/Bill/approvalPressVue',
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
        } else {
          this.$dialog.alert({
            alertImg: 'error',
            tipValue: '请先提交申请'
          })
        }
      },
      menuTab (index) {
        this.menuTabOn = index
      },
      submit (item) { //提交申请
        if (item.isFinish === '0' && item.state === '0') {
          if (item.id) {
            let params = {
              id: item.id,
              tableName: 48
            }
            this.$dialog.confirm({
              width: 300,
              tipValue: '确定提交申请?',
              btnValueOk: '确定',
              alertImg: 'warn',
              okCallBack: (data) => {
                this.ajaxJson({
                  url: '/Bill/getSubmitCatrgoryVue',
                  data: params,
                  call: (data) => {
                    this.category = data.message
                    if (this.category) {
                      /* 判断是否拿到category */
                      let params = {
                        id: item.id,
                        category: this.category,
                        tableName: 48,
                        isDetail: 0,
                        tableDetailName: -1
                      }
                      this.ajaxJson({
                        url: '/Bill/approvalSubmitVue',
                        data: params,
                        call: (data) => {
                          if (data.type === 0) {
                            this.$dialog.alert({
                              width: 320,
                              tipValue: data.message,
                              closeCallBack: () => {
                                this.initPageData(true)
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
                    } else {
                      this.$dialog.alert({
                        tipValue: '没有获取到提交数据!',
                        alertImg: 'error'
                      })
                    }
                  }
                })
              }
            })
          }
        }
      },
      invoiceTrial(item){
        let url=''
        if(item.invoiceCategory==='0'||item.invoiceCategory==='1'){
          url='/openInvoiceTrialOther?ownerID='+item.id
        }else if(item.invoiceCategory==='2'){
          url='/openInvoiceTrialVehicle?ownerID='+item.id
        }else{
          url='/openInvoiceTrial?ownerID='+item.id
        }
        this.$dialog.OpenWindow({
          width: '1025',
          height: '858',
          title: '查看发票发票',
          url:url,
          closeCallBack: (data)=>{
            if(data){
              this.initPageData(false)
            }
          }
        })
      },
      add(){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '790',
          title: '添加开票信息',
          url:'/openInvoiceForm?isAdd=true',
          closeCallBack: (data)=>{
            if(data){
              this.initPageData(false)
            }
          }
        })
      },
      view(item){
        // if(item.ownerCategory!=='5'){
          let url=''
          let title=''
          if(item.id){
            if(item.state !== '0'){
            url='/openInvoiceView?id='+item.id +'&type=0'
            }else{
            url='/openInvoiceForm?id='+item.id
            }
            title='查看开票信息'
          }else{
            url='/openInvoiceForm?isAdd=true'
            title='添加开票信息'
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
        // }else{
        //   this.$dialog.OpenWindow({
        //     width: '1050',
        //     height: '790',
        //     title: '查看开票申请',
        //     url:'/offlineOpenInvoiceView?id='+item.id+'&ownerCategory=5',
        //     closeCallBack: (data)=>{
        //       if(data){
        //         this.initPageData(false)
        //       }
        //     }
        //   })
        // }
      },
      initPageData(initValue){
        let params = {}

        if (initValue) {
          params = {
            state:'1'
          }
        } else {
          params = {
            state: this.statePsd.value,
            invoiceCategory:this.invoiceCategoryPsd.value,
            purchaserType:this.purchaserTypePsd.value,
            isReceivables:this.isReceivablesPsd.value,
            category:this.categoryPsd.value,
            viewLevels:this.listViewLevels.value
          }
        }
        this.init({
          initValue:initValue,
          url: '/Bill/openInvoiceManager',
          data:params,
          all:(data) =>{
            this.contentTotal = data.total
          },
          init:(data)=>{
            this.statePsd = data.statePsd
            this.stateList = data.statePsd.list
            this.invoiceCategoryPsd = data.invoiceCategoryPsd
            this.invoiceCategoryList = data.invoiceCategoryPsd.list
            this.purchaserTypePsd=data.purchaserTypePsd
            this.purchaserTypeList=data.purchaserTypePsd.list
            this.isReceivablesPsd=data.isReceivablesPsd
            this.isReceivablesList=data.isReceivablesPsd.list
            this.categoryPsd=data.categoryPsd
            this.categoryList=data.categoryPsd.list
            this.listViewLevels=data.viewLevelsPsd
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
