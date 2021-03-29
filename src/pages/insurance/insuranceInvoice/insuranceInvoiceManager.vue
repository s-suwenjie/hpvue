<template>
  <div>
    <yhm-managerpage category="1" >
      <!--导航条-->
      <template #navigationTab>
        <router-link class="menuTabDiv " :to="{path:'/home/policy/policyManager'}">保单管理</router-link>
        <router-link class="menuTabDiv" :to="{path:'/home/accountsReceivable/accountsReceivableManager'}">应收账款</router-link>
        <router-link class="menuTabDiv " :to="{path:'/home/customerRebates/customerRebatesManager'}">客户直接优惠/返利</router-link>
        <router-link class="menuTabDiv" :to="{path:'/home/paymentInsurance/payInsuranceFeeManager'}">付保险费</router-link>
        <router-link class="menuTabDiv "  :to="{path:'/home/receiveInsurance/receiveInsuranceManager'}">收保险费</router-link>
        <router-link class="menuTabDiv menuTabActive" :to="{path:'/home/insuranceInvoice/insuranceInvoiceManager'}">保险开票</router-link>
      </template>

      <!--操作区-->
      <template #operate>
<!--        <yhm-commonbutton value="添加" icon="btnAdd" :flicker="true" @call="add()"></yhm-commonbutton>-->
        <!--<yhm-commonbutton :value="choose?'收起筛选':'展开筛选'" :icon="choose?'btnUp':'btnDown'" @call="switchChoose()"></yhm-commonbutton>-->
        <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initData"></yhm-managersearch>
        <yhm-radiofilter :before="insuredUnitBefore" @initData="initChoose('insuredUnit')" title=" 保险公司" :content="listInsuredUnit"></yhm-radiofilter>
        <yhm-radiofilterdate title="时间" @initData="selectMonthEvent" custom-time="12"></yhm-radiofilterdate>
        <yhm-commonbutton  value="开票申请" :show="isSelected" icon="btnAdd" @call="addOpenInvoice" :flicker="true"></yhm-commonbutton>
      </template>

      <!--数据表头-->
      <template #listHead>
        <yhm-managerth-check style="width: 40px;" :check="allCheck"></yhm-managerth-check>
        <!--<yhm-managerth style="width: 40px;" title="查看"></yhm-managerth>-->
        <yhm-managerth style="width: 80px" title="账单文件" ></yhm-managerth>
        <yhm-managerth style="width: 80px" title="账单月份" ></yhm-managerth>
        <yhm-managerth  title="公司名称"></yhm-managerth>
        <yhm-managerth  title="对账单开始日期"></yhm-managerth>
        <yhm-managerth  title="对账单结束日期"></yhm-managerth>

        <yhm-managerth  title="账单总金额"></yhm-managerth>
        <yhm-managerth  title="已对账金额"></yhm-managerth>
        <yhm-managerth  title="剩余对账金额"></yhm-managerth>
        <yhm-managerth style="width:200px;" title="操作" ></yhm-managerth>
      </template>

      <!--数据明细-->
      <template #listBody>
        <tr :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]" v-for="(item,index) in content" :key="index">
          <yhm-manager-td-checkbox :value="item"></yhm-manager-td-checkbox>
          <!--<yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>-->
          <yhm-manager-td  value=" " @click="downloadEvent(item)">
            <img  style="margin: auto;" width="50" height="30" src="https://hp.yhm.hk/UploadFile/excel.jpg" alt="">
          </yhm-manager-td>

          <yhm-manager-td-center :value="(new Date(item.monthsDate).getMonth() + 1)+'月'"></yhm-manager-td-center>
          <yhm-manager-td  :value="item.ownerName"></yhm-manager-td>
          <yhm-manager-td-date  :value="item.monthsDate"></yhm-manager-td-date>
          <yhm-manager-td-date  :value="item.endDate"></yhm-manager-td-date>
          <yhm-manager-td-money  :value="item.money"></yhm-manager-td-money>
          <yhm-manager-td-money  :value="item.alreadyMoney"></yhm-manager-td-money>
          <yhm-manager-td-money  :value="item.useMoney"></yhm-manager-td-money>
          <yhm-manager-td-operate>
            <yhm-manager-td-operate-button v-if="item.money!=item.invoiceMoney"  value="开票申请" @click="addOpenInvoice(item)" icon="i-btn-applicationSm" color="#33AECC"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button v-if="item.invoiceMoney!=0.00"  style="margin-left: 10px" @click="viewOpenInvoice(item)" value="查看开票" color="#7112da"></yhm-manager-td-operate-button>
          </yhm-manager-td-operate>
        </tr>
      </template>

      <!--数据空提示-->
      <template #empty>
        <span class="m_listNoData" v-show="empty">暂时没有数据</span>
      </template>
      <template #total>
        <div class="listTotalCrente m_list" style="width: 916px">
          <div class="listTotalLeft">
            <span class="test"></span>
            <span class="test">金额</span>
            <span class="test">条数</span>
          </div>
          <div>
            <table width="100%" cellpadding="0" cellspacing="0" class="m_content_table m_content_total_table">
              <thead>
              <tr>
                <yhm-managerth style="width: 100px;" before-color="#49a9ea" title="" before-title="账单总金额"></yhm-managerth>
                <yhm-managerth style="width: 100px;" before-color="#49a9ea" title="" before-title="已对账金额"></yhm-managerth>
                <yhm-managerth style="width: 100px;" before-color="#49a9ea" title="" before-title="未对账金额"></yhm-managerth>

              </tr>
              </thead>
              <tbody>
              <tr>
                <yhm-manager-td-money  v-for="(item,index) in contentTotal" :key="index" :value="item.money"></yhm-manager-td-money>
              </tr>
              <tr>
                <yhm-manager-td-rgt  v-for="(item,index) in contentTotal" :key="index" :value="item.count"></yhm-manager-td-rgt>
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

    </yhm-managerpage>
  </div>
</template>

<script>
  import { managermixin } from '@/assets/manager.js'
  export default {
    name: 'insuranceInvoiceManager',
    mixins: [managermixin],
    data(){
      return{
        insuredUnitBefore:'0',// 默认选择状态为可以选择，1为不可以选择
        insuredUnit:'',
        listInsuredUnit:{
          value: '', //默认为空
          list: []
        },
        startDate:'',
        endDate:'',
        contentTotal:[],

      }
    },
    methods:{
      viewOpenInvoice(item){
        this.$dialog.OpenWindow({
          width: '750',
          height: '390',
          title: '查看开票详情信息',
          url: '/insuranceInvoiceDetails?id=' + item.id ,
          closeCallBack: (data) => {
            if (data) {
              this.initPageData(false)
            }
          }
        })
      },
      addOpenInvoice(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '790',
          title: '添加开票申请信息',
          url: '/openInvoiceForm?isAdd=true&ownerID=' + item.id + '&ownerCategory=3',
          closeCallBack: (data) => {
            if (data) {
              this.initPageData(false)
            }
          }
        })
      },
      downloadEvent(item){
        window.open('/UploadFile/' + item.tag + '/' + item.storeName)
      },
      selectMonthEvent(data,item){
        this.startDate=item.startDate
        this.endDate=item.endDate
        this.initPageData(false)

      },
      // 筛选事件
      initChoose (op) {

        this.pager.pageIndex = 1
        if (op === 'insuredUnit') {
          this.selectValue = []
        }

        this.initPageData(false)
      },
    //搜索
      initPageData (initValue) {
        let params = {}

        if (initValue) {

          params = {
            startDate:this.startDate,
            endDate:this.endDate,
            insuredUnit:this.listInsuredUnit.value,
          }
        } else {
          params = {
            startDate:this.startDate,
            endDate:this.endDate,
            insuredUnit:this.listInsuredUnit.value,
          }
        }
        this.init({
          initValue:initValue,
          url: '/Insurance/getInsuranceInvoiceManager',
          data:params,
          all:(data) =>{
            //不管是不是初始化都需要执行的代码
            this.contentTotal=data.total
          },
          init:(data)=>{
            //初始化时需要执行的代码
            this.listInsuredUnit=data.insuredUnitPsd
            this.insuredUnitList=data.insuredUnitList
          }
        })
      },
    },
  }
</script>

<style scoped>

</style>
