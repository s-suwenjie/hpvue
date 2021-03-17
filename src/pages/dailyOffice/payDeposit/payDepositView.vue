<template>
  <div>
    <div style="height: 30px;"></div>

    <yhm-view-body>
      <template #title>基本信息</template>
      <template #body>
        <yhm-view-control title="添加日期" :content="workDate" type="date"></yhm-view-control>
        <yhm-view-control title="添加人" :content="person" ></yhm-view-control>
        <yhm-view-control title="收款类型" :content="category" :psd="categoryList"></yhm-view-control>
        <yhm-view-control title="收款方" :content="other" @iconClick="iconClick()" iconColor="#49a9ea" font-icon="uniE99E" @click="unitView()" color="#49a9ea" style="cursor: pointer;"></yhm-view-control>
        <yhm-view-control title="收款账号" :content="otherAccount"></yhm-view-control>
        <yhm-view-control title="事项类型" :content="subjectID" :psd="subjectPsd"></yhm-view-control>
        <yhm-view-control title="支付金额" :content="money" type="money"></yhm-view-control>
        <yhm-view-control title="金额大写" :content="capitalMoney"></yhm-view-control>
        <yhm-view-control title="预计退还日期" :content="refundDate" type="date"></yhm-view-control>
        <yhm-view-control title="备注" :content="remark"></yhm-view-control>
        <yhm-view-control category="3" title="文件" type="files" :content="fileList" tag="Deposit"></yhm-view-control>
      </template>
    </yhm-view-body>
    <yhm-view-tab>
      <template #tab>
        <yhm-view-tab-button :list="tabState" :index="0"  v-if="paymentList.length>0">付款申请</yhm-view-tab-button>
        <yhm-view-tab-button :list="tabState" :index="1"  v-if="commonInvoicesList.length>0">收据信息</yhm-view-tab-button>
        <yhm-view-tab-button :list="tabState" :index="2"  v-if="bankDetailList.length>0">退款信息</yhm-view-tab-button>
      </template>
      <template #content>
        <yhm-view-tab-list :customize="true" v-if="tabState[0].select">
          <template #listHead>
            <yhm-managerth style="width: 38px;" title="查看"></yhm-managerth>
            <yhm-managerth style="width: 50px" title="申请人"></yhm-managerth>
            <yhm-managerth style="width: 200px" title="收款方" ></yhm-managerth>
            <yhm-managerth style="width: 110px" title="最迟付款日期" ></yhm-managerth>
            <yhm-managerth style="width: 80px" title="事由"></yhm-managerth>
            <yhm-managerth style="width: 70px" title="申请金额"></yhm-managerth>
            <yhm-managerth style="width: 180px" title="编号"></yhm-managerth>
            <yhm-managerth style="width: 130px" title="状态"></yhm-managerth>
          </template>
          <template #listBody>
            <tr v-for="(item,index) in paymentList" :class="{InterlacBg:index%2!=0}" :key="index">
              <yhm-manager-td-look @click="examineView(item)"></yhm-manager-td-look>
              <yhm-manager-td-center :value="item.person"></yhm-manager-td-center>
              <yhm-manager-td :value="item.otherAccount"></yhm-manager-td>
              <yhm-manager-td-date :value="item.lastDate"></yhm-manager-td-date>
              <yhm-manager-td-center :value="item.subject"></yhm-manager-td-center>
              <yhm-manager-td-money :value="item.money"></yhm-manager-td-money>
              <yhm-manager-td :value="item.code"></yhm-manager-td>
              <yhm-manager-td-state :value="item.stateVal" :state-color="item.stateColor" :state-img="item.stateImg"></yhm-manager-td-state>
            </tr>
          </template>
          <template #empty>
            <span class="m_listNoData"  v-show="paymentList.length===0">暂时没有数据</span>
          </template>
        </yhm-view-tab-list>
        <yhm-view-tab-list :customize="true"  v-show="tabState[1].select">
          <template #listHead>
            <yhm-managerth style="width: 120px" title="收据号码"></yhm-managerth>
            <yhm-managerth style="width: 120px" title="开据日期"></yhm-managerth>
            <yhm-managerth style="width: 100px" title="类型"></yhm-managerth>
            <yhm-managerth style="width: 80px" title="收据张数"></yhm-managerth>
            <yhm-managerth style="width: 120px" title="收据面值"></yhm-managerth>
            <yhm-managerth title="备注"></yhm-managerth>
            <yhm-managerth style="width: 140px" title="收据照片"></yhm-managerth>
          </template>
          <template #listBody>
            <tr v-for="(item,index) in commonInvoicesList" :class="{InterlacBg:index%2!=0}" :key="index">
              <yhm-manager-td :value="item.code"></yhm-manager-td>
              <yhm-manager-td-date :value="item.workDate"></yhm-manager-td-date>
              <yhm-manager-td-psd :list="listCategoryPsd" :value="item.category"></yhm-manager-td-psd>
              <yhm-manager-td-center :value="item.quantity"></yhm-manager-td-center>
              <yhm-manager-td-money :value="item.money"></yhm-manager-td-money>
              <yhm-manager-td :value="item.remark"></yhm-manager-td>
              <yhm-manager-td-image @click="showInvoicePdfEvent(item)" :tip="true" width="850" height="600" left="50" type="files" :value="item.url" tag="Invoice" :pdf-url="item.pdfUrl"></yhm-manager-td-image>
            </tr>
          </template>
          <template #empty>
            <span class="m_listNoData" v-show="commonInvoicesList.length===0">暂时没有数据</span>
          </template>
        </yhm-view-tab-list>
        <yhm-view-tab-list :customize="true"  v-show="tabState[2].select">
          <template #listHead>
            <yhm-managerth style="width: 130px" title="账号"></yhm-managerth>
            <yhm-managerth style="width: 170px" title="对方账号"></yhm-managerth>
            <yhm-managerth style="width: 110px" title="交易日期"></yhm-managerth>
            <yhm-managerth style="width: 70px" title="收支方向"></yhm-managerth>
            <yhm-managerth style="width: 150px" title="事由"></yhm-managerth>
            <yhm-managerth style="width: 90px" title="交易金额"></yhm-managerth>
            <yhm-managerth title="备注"></yhm-managerth>
            <yhm-managerth style="width: 100px" title="凭证"></yhm-managerth>
          </template>
          <template #listBody>
            <tr v-for="(item,index) in bankDetailList" :class="{InterlacBg:index%2!=0}" :key="index">
              <yhm-manager-td :value="item.bankName+''+item.account"></yhm-manager-td>
              <yhm-manager-td :value="item.otherName+' '+item.otherAccount"></yhm-manager-td>
              <yhm-manager-td-date :value="item.cccurDate"></yhm-manager-td-date>
              <yhm-manager-td-direction :direction="item.direction" class="dfJcc" :value="item.direction" :dir-val="false"></yhm-manager-td-direction>
              <yhm-manager-td :value="item.subject"></yhm-manager-td>
              <yhm-manager-td-money :value="item.money"></yhm-manager-td-money>
              <yhm-manager-td :value="item.remark"></yhm-manager-td>
              <yhm-manager-td-image :tip="true" width="850" height="600" left="50" type="files" :value="item.storeName" :tag="'bankDetail'" ></yhm-manager-td-image>
            </tr>
          </template>
          <template #empty>
            <span class="m_listNoData"  v-show="bankDetailList.length===0">暂时没有数据</span>
          </template>
        </yhm-view-tab-list>
      </template>
    </yhm-view-tab>
  </div>
</template>

<script>
  import {viewmixin} from '@/assets/view.js'
  export default {
    name: 'payDepositView',
    mixins: [viewmixin],
    data(){
      return{
        tabState:[{select:true},{select:false},{select:false}],
        workDate:'',
        person:'',
        categoryList:[],
        category:'',
        other:'',
        otherID:'',
        otherAccount:'',
        money:'',
        capitalMoney:'',
        subjectID:'',
        remark:'',
        state:'',
        subjectPsd:[],
        fileList:[],
        bankDetail:[],
        paymentList:[],
        refundDate:'',
        isPaymentList:false,
        commonInvoicesList:[],
        listCategoryPsd:[
          {
            code:'',
            num:'0',
            img:'',
            showName:'单张',
          }
        ],
        isLook:'',
        bankDetailList:''
      }
    },
    created () {
      this.setQuery2Value('isLook')
      let params={
        id:this.id
      }
      this.init({
        url: '/dailyoffice/payDeposit/initForm',
        data:params,
        call: (data) => {
          this.categoryList=data.categoryPsd.list
          this.subjectPsd = data.subjectPsd.list
          this.workDate=data.workDate
          this.category=data.category
          this.capitalMoney=data.capitalMoney
          this.money=data.money
          this.personID=data.personID
          this.person=data.person
          this.otherID=data.otherID
          this.other=data.other
          this.otherAccountID=data.otherAccountID
          this.otherAccount=data.otherAccount
          this.fileList=data.fileList
          this.categoryPsd=data.categoryPsd
          this.remark=data.remark
          this.subjectID=data.subjectID
          this.refundDate=data.refundDate
          this.isReceopt=data.isReceopt
          this.isReceoptPsd=data.isReceoptPsd
          this.commonInvoicesList=data.commonInvoicesList
          if(this.state!=='0'){
            let params={
              id:this.id
            }
            this.ajaxJson({
              url: '/PersonOffice/getPaymentBankDetailList',
              data: params,
              call: (data) => {
                if(data){
                  this.paymentList=data
                  this.isPaymentList = true
                }
              }
            })
          }
          if(this.isLook==='0'){
            this.tabState=[{select:true},{select:false},{select:false}]
          }else if(this.isLook==='1'){
            this.tabState=[{select:false},{select:true},{select:false}]
          }
          let params={
            id:'\''+this.id+'\''
          }
          this.ajaxJson({
            url: '/Fin/getBankDetailList',
            data: params,
            call: (data) => {
              if(data){
                this.bankDetailList=data
              }
            }
          })
        }
      })
    },
    methods:{
      examineView(item){
        if(item.isFinish==='0'&&item.state==='0') {
          this.$dialog.OpenWindow({
            width: '1050',
            height: '750',
            url: '/paymentApplyForm?id=' + item.id,
            title: "查看付款申请信息",
            closeCallBack: (data) => {
              if(data){
                this.init()
              }
            }
          })
        }else{
          this.$dialog.OpenWindow({
            width: '1050',
            height: '750',
            url: '/paymentApplyFormView?id=' + item.id ,
            title: "查看付款申请信息",
            closeCallBack: () => {

            }
          })
        }
      },
      unitView(){
        let title=''
        let url=''
        if(this.category === '0'){
          title='查看单位信息'
          url='/unitView?id=' + this.otherID
        }else{
          title='查看联系人信息'
          url='/personView?id=' + this.otherID
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
      iconClick(){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '640',
          title: '查看收支明细',
          url: '/unitBankDetailForm?unitID='+ this.otherID,
          closeCallBack: (dataTwo)=>{

          }
        })
      },
    }
  }
</script>

<style scoped>

</style>
