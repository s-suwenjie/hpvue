<template>
  <div>
    <yhm-managerpage category="1">
      <!--导航条-->
      <template #navigationTab>
        <router-link class="menuTabDiv menuTabActive" :to="{path:'/home/contract/contractManager'}">合同管理</router-link>
      </template>
      <!--操作区-->
      <template #operate>
        <yhm-commonbutton  value="合同登记" icon="btnAdd" :flicker="true" @call="add()"></yhm-commonbutton>
        <yhm-commonbutton  value="合同签署" icon="btnAdd" :flicker="true" @call="add2()"></yhm-commonbutton>
        <yhm-commonbutton  value="合同选择列表" icon="btnAdd" :flicker="true" @call="add3()"></yhm-commonbutton>
        <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initData"></yhm-managersearch>
        <yhm-radiofilter :before="contractBefore" @initData="initChoose('signatureType')" title="签署类型" :content="listSignatureType"></yhm-radiofilter>
        <yhm-radiofilter :before="contractBefore" @initData="initChoose('state')" title="合同状态" :content="listState"></yhm-radiofilter>
        <yhm-radiofilter :before="contractBefore" @initData="initChoose('type')" title="合同所属类型" :content="listType"></yhm-radiofilter>
        <yhm-radiofilter :before="contractBefore" @initData="initChoose('type')" title="合同收付款" :content="listPaymentItems"></yhm-radiofilter>
        <yhm-radiofilter :before="contractBefore" @initData="initChoose('type')" title="合同格式" :content="listFormat"></yhm-radiofilter>
        <yhm-radiofilter :before="contractBefore" @initData="initChoose('billingStatus')" title="开票状态" :content="listBillingStatus"></yhm-radiofilter>
      </template>
      <!--数据表头-->
      <template #listHead>
        <yhm-managerth style="width: 38px;" title="选择"></yhm-managerth>
        <yhm-managerth style="width: 38px;" title="查看"></yhm-managerth>
        <yhm-managerth style="width: 150px;" title="合同名称" ></yhm-managerth>
        <yhm-managerth style="width: 80px;" title="我方负责人" ></yhm-managerth>
        <yhm-managerth title="对方合约单位" ></yhm-managerth>
        <yhm-managerth title="对方负责人" ></yhm-managerth>
        <yhm-managerth title="合同文本" ></yhm-managerth>
        <yhm-managerth title="签署类型" ></yhm-managerth>
        <yhm-managerth title="合同状态"></yhm-managerth>
        <!--<yhm-managerth style="width: 80px;" title="合同所属类型"></yhm-managerth>-->
        <yhm-managerth title="合同收付款"></yhm-managerth>
        <yhm-managerth style="width: 80px;" title="合同" subtitle="关联业务"></yhm-managerth>
        <yhm-managerth style="width: 80px;" title="累计" subtitle="已付金额"></yhm-managerth>
        <yhm-managerth style="width: 80px;" title="总金额"></yhm-managerth>
        <yhm-managerth style="width: 60px;" title="已开票金额"></yhm-managerth>
        <yhm-managerth style="width: 60px;" title="剩余" subtitle="开票金额"></yhm-managerth>
        <yhm-managerth title="开票状态" ></yhm-managerth>
        <yhm-managerth style="width: 120px;" title="签约日期"></yhm-managerth>
        <yhm-managerth v-if="isEnd" @call="endClick()"  style="width: 120px;" title="结束日期" subtitle="(点击查看剩余天数)"></yhm-managerth>
        <yhm-managerth v-if="isDay" @call="dayClick()" style="width: 120px;" title="剩余天数" subtitle="(可点击)"></yhm-managerth>
        <yhm-managerth style="width: 150px;" title="操作"></yhm-managerth>
      </template>

      <!--数据明细-->
      <template #listBody>
        <tr :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]" v-for="(item,index) in content"
            :key="index">
          <yhm-manager-td-checkbox :value="item"></yhm-manager-td-checkbox>
          <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>
          <yhm-manager-td :tip="true" :value="item.name"></yhm-manager-td>
          <yhm-manager-td :value="item.chargePerson"></yhm-manager-td>
          <yhm-manager-td :tip="true" :value="item.customers"></yhm-manager-td>
          <yhm-manager-td  :value="item.otherPartyPerson"></yhm-manager-td>
          <yhm-manager-td-psd :value="item.format" :list="listFormat.list"></yhm-manager-td-psd>
          <yhm-manager-td-psd :value="item.signatureType" :list="listSignatureType.list"></yhm-manager-td-psd>
          <yhm-manager-td-psd :value="item.state" :list="listState.list"></yhm-manager-td-psd>
          <!--<yhm-manager-td-psd :value="item.type" :list="listType.list"></yhm-manager-td-psd>-->
          <yhm-manager-td-psd :value="item.paymentItems" :list="listPaymentItems.list"></yhm-manager-td-psd>
          <yhm-manager-td-psd :value="item.category" :list="listCategory.list"></yhm-manager-td-psd>
          <yhm-manager-td-money v-if="item.totalMoney!=0" :value="item.paidMoney"></yhm-manager-td-money>
          <yhm-manager-td-center v-else value="------"></yhm-manager-td-center>
          <yhm-manager-td-money v-if="item.totalMoney!=0" :value="item.totalMoney"></yhm-manager-td-money>
          <yhm-manager-td-center v-else value="------"></yhm-manager-td-center>
          <yhm-manager-td-money :value="item.invoicedAmount"></yhm-manager-td-money>
          <yhm-manager-td-money @click="billingClick(item)" :value="item.remainingAmount"></yhm-manager-td-money>
          <yhm-manager-td-psd :value="item.billingStatus" :list="listBillingStatus.list"></yhm-manager-td-psd>
          <yhm-manager-td-date :value="item.startTime"></yhm-manager-td-date>
          <yhm-manager-td-date v-if="isEnd" :value="item.endTime"></yhm-manager-td-date>

          <yhm-manager-td-img v-if="isDay" :value="item.day+'天'" width="20" height="30" position="right" v-show="item.day>60" num="1"></yhm-manager-td-img>
          <yhm-manager-td-img v-if="isDay" :value="item.day+'天'" width="20" height="30" position="right" v-show="item.day<=60& item.day>30" num="2"></yhm-manager-td-img>
          <yhm-manager-td-img v-if="isDay" :value="item.day+'天'" width="20" height="30" position="right" v-show="item.day<=30& item.day>15" num="3"></yhm-manager-td-img>
          <yhm-manager-td-img v-if="isDay" :value="item.day+'天'" width="20" height="30" position="right" v-show="item.day<=15" num="4"></yhm-manager-td-img>

          <yhm-manager-td-operate>
            <yhm-manager-td-operate-button @click="editBtn(item)" value="编辑" icon="btnSave" color="#49a9ea"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button style="margin-left: 10px; color: #2C9040" @click="approFund(item)" v-if="item.paymentItems==0" value="收款" icon="btnSave" color="#49a9ea"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button style="margin-left: 10px; color: #CC0000" @click="addPayment(item)" v-if="item.paymentItems==1" value="付款" icon="btnSave" color="#49a9ea"></yhm-manager-td-operate-button>
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
  </div>
</template>

<script>
  import { selectItem, managermixin } from '@/assets/manager.js'
  export default {
    name: 'contractManager',
    mixins: [managermixin],
    data(){
      return{
        contractBefore:'0',
        listState:{
          value:"0",
          list:[]
        },
        listSignatureType:{
          value:"",
          list:[]
        },
        listType:{
          value:"",
          list:[]
        },
        listPaymentItems:{
          value:"",
          list:[]
        },
        listFormat:{
          value:"",
          list:[]
        },
        listCategory:{
          value:"",
          list:[]
        },
        listBillingStatus:{
          value:"",
          list:[]
        },
        isEnd:true,
        isDay:false
      }
    },
    methods:{
      billingClick(item){
        if (item.billingStatus==1 || item.billingStatus==2|| item.billingStatus==3) {
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
        }
      },
      endClick(){
        this.isEnd=false
        this.isDay=true
      },
      dayClick(){
        this.isEnd=true
        this.isDay=false
      },
      add3(){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '750',
          url: '/selectContract?paymentItems=0&applyopenInvoice=1',
          title: '选择合同',
          closeCallBack: (data) => {
            if (data) {
              this.initPageData(false)
            }
          }
        })
      },
      addPayment(item){
        // 默认设置页面标记是查看
        this.$dialog.OpenWindow({
          width: '1050',
          height: '750',
          url: '/paymentApplyForm?ownerID'+item.id,
          title: '添加付款申请信息',
          closeCallBack: (data) => {
            if (data) {
              this.lastData = data
              this.initPageData(false)
              /*false->非初始化=>!import  true->初始化*/
            }
          }
        })
      },
      approFund(item){
        let url=''
        if(item.custState==0){
          url='/cashierBankDetailPrivateForm?bankMoney='+item.totalMoney+'&ownerID='+item.id+'&cashierDirection=0&surrenderCashier=1&otherID='+item.customersID+'&publicandPrivateAccount=1'
        }else{
          url='/cashierBankDetailPrivateForm?bankMoney='+item.totalMoney+'&ownerID='+item.id+'&cashierDirection=0&surrenderCashier=1&otherID='+item.customersID+'&publicandPrivateAccount=0'
        }

        this.$dialog.OpenWindow({
          width: '1050',
          height: '690',
          title: '添加收款记录',
          url: url,
          closeCallBack: (data)=>{
            this.initPageData(false)
          }
        })
      },
      printClick(item){
        alert()
      },
      editBtn (item) {
        this.$dialog.OpenWindow({
          width: '1050',
          height: '750',
          url: '/contractsignForm?id='+item.id+'&type='+item.type,
          title: '修改合同',
          closeCallBack: (data) => {
            if (data) {
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
          url: '/contractsignForm?type=0',
          title: '创建合同',
          closeCallBack: (data) => {
            if (data) {
              this.lastData = data
              this.initPageData(false)
            }

          }
        })
      },
      add2 () {
        this.$dialog.OpenWindow({
          width: '1050',
          height: '750',
          url: '/contractsignForm?type=1',
          title: '签署合同',
          closeCallBack: (data) => {
            if (data) {
              this.lastData = data
              this.initPageData(false)
            }

          }
        })
      },
      listView(item) {
        this.$dialog.OpenWindow({
          width: '1050',
          height: '750',
          url: '/contractsignView?id='+item.id,
          title: '详情信息',
          closeCallBack: (data) => {
            if (data) {
            }
          }
        })
      },
      //筛选事件
      // initChoose (op) {
      //   if (op === 'state') {
      //     this.selectValue = []
      //   }
      //  this.initPageData(false)
      //
      // },
      initPageData (initValue) {
        let params = {}

        if (initValue) {
          params = {
            signatureType:this.listSignatureType.value,
            state:this.listState.value,
            type:this.listType.value,
            paymentItems:this.listPaymentItems.value,
            format:this.listFormat.value,
            billingStatus:this.listBillingStatus.value,
          }
        } else {
          params = {
            signatureType:this.listSignatureType.value,
            state:this.listState.value,
            type:this.listType.value,
            paymentItems:this.listPaymentItems.value,
            format:this.listFormat.value,
            billingStatus:this.listBillingStatus.value,
          }
        }
        this.init({
          initValue:initValue,
          url: '/dailyoffice/contractSign/getManager',
          data:params,
          all:(data) =>{
            //不管是不是初始化都需要执行的代码
          },
          init:(data)=>{
            //初始化时需要执行的代码
            this.listSignatureType=data.signatureTypePsd
            this.listState=data.statePsd
            this.listType=data.typePsd
            this.listPaymentItems=data.paymentItemsPsd
            this.listFormat=data.formatPsd
            this.listCategory=data.categoryPsd
            this.listBillingStatus=data.billingStatusPsd
          }
        })
      },
    },
  }
</script>

<style scoped>

</style>
