<template>
  <div>
    <yhm-managerpage category="1" @statisticalClick="statisticalClick" :statisticalShow="true" :total-table="true" :total-width="true">
      <!--导航条-->
      <template #navigationTab>
        <a class="menuTabDiv" href="/Fin/_bankDetailManager?menuType=1">收支明细</a>
        <router-link class="menuTabDiv" :to="{path:'/home/viewManager/paymentPlanViewManager'}">付款计划</router-link>
        <router-link class="menuTabDiv" :to="{path:'/home/viewManager/paymentApplyViewManager'}">付款申请</router-link>
        <router-link class="menuTabDiv" :to="{path:'/home/viewManager/reimbursementViewManager'}">报销申请</router-link>
        <router-link class="menuTabDiv" :to="{path:'/home/viewManager/finReimbursementDetailManager?type=1'}">特殊报销</router-link>
        <router-link class="menuTabDiv" :to="{path:'/home/viewManager/finPrettyCashsManagerAll'}">备用金</router-link>
        <router-link class="menuTabDiv menuTabActive" :to="{path:'/home/bankDetailRenewalManager'}">支付续保费</router-link>
        <router-link class="menuTabDiv" :to="{path:'/home/BankDetailRebateManager'}">支付客户返利</router-link>
        <router-link class="menuTabDiv" :to="{path:'/home/finPurchaseManager'}">采购计划</router-link>
        <router-link class="menuTabDiv " :to="{path:'/home/finBillingManager'}">保险保单</router-link>

      </template>
      <!--操作区-->
      <template #operate>
        <yhm-commonbutton :value="choose?'收起筛选':'展开筛选'"  :icon="choose?'btnUp':'btnDown'" @call="switchChoose()"></yhm-commonbutton>
        <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initPageData"></yhm-managersearch>
        <div @click="selectedList" v-show="isSelected" class="b_main one b_one mr5b">打开选中信息</div>
        <yhm-radiofilterdate title="时间" @initData="selectMonthEvent"></yhm-radiofilterdate>
      </template>
    <!--筛选区-->
      <template #choose>
        <div v-show="choose" class="buttonBody mptZero">
          <yhm-radiofilter @initData="initChoose('bankBefore')" title="银行" :content="bankList"></yhm-radiofilter>
          <yhm-radiofilter @initData="initChoose('bankBefore')" title="保险公司" :content="unitList"></yhm-radiofilter>
        </div>
      </template>

      <template #listHead>
        <yhm-managerth-check :check="allCheck" style="width: 40px;"></yhm-managerth-check>
        <yhm-managerth style="width: 38px;" title="查看"></yhm-managerth>
        <yhm-managerth style="width: 300px" title="账户" value="bankName"></yhm-managerth>
        <yhm-managerth title="交易对象" value="otherName"></yhm-managerth>
        <yhm-managerth style="width: 120px;" title="交易日期" value="cccurDate"></yhm-managerth>
        <yhm-managerth style="width: 80px" title="方向" value="direction"></yhm-managerth>
        <yhm-managerth style="width: 120px;" title="事由" value="subject"></yhm-managerth>
        <yhm-managerth style="width: 120px" title="金额" value="money"></yhm-managerth>
        <yhm-managerth style="width: 330px" title="备注" value="remark"></yhm-managerth>
      </template>
      <!--数据明细-->
      <template #listBody>
        <tr  v-for="(item,index) in content" :key="index">
          <yhm-manager-td-checkbox :value="item"></yhm-manager-td-checkbox>
          <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>
          <yhm-manager-td :value="item.bankName + item.account + item.nature" @click="accountEvent(item)" :tip="true"></yhm-manager-td>
          <yhm-manager-td-html :value="item.otherName" @click="otherNameEvent(item)" :tip="true"></yhm-manager-td-html>
          <yhm-manager-td-date :value="item.cccurDate"></yhm-manager-td-date>
          <yhm-manager-td-direction :direction="item.direction" class="dfJcc" :value="item.direction" :dir-val="false"></yhm-manager-td-direction>
          <yhm-manager-td :value="item.subject" @click="subjectEvent(item)"></yhm-manager-td>
          <yhm-manager-td-money :value="item.money"></yhm-manager-td-money>
          <yhm-manager-td :value="item.remark" :tip="true"></yhm-manager-td>

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
      <template #listTotalHead>
        <yhm-managerth before-color="black" title="" before-title="条数" ></yhm-managerth>
        <yhm-managerth before-color="black" title="" before-title="金额" ></yhm-managerth>
<!--        <yhm-managerth v-show="!isSelected" :before-color="oldTotalColor" style="width: 60px;" width="60px" title="" :before-title="oldTotal" @call="oldTotalClick"></yhm-managerth>-->
<!--        <yhm-managerth v-show="isYearMoneyShow && !isSelected" :before-color="oldTotalColor" style="width: 60px;" width="60px" title="" :before-title="yearTotal" ></yhm-managerth>-->

      </template>
      <template #listTotalBody>
        <tr>
          <yhm-manager-td-center v-for="(item,index) in contentTotal" :key="index + 1" :value="item.count"></yhm-manager-td-center>
          <yhm-manager-td-money v-for="(item,index) in contentTotal" :key="index" :value="item.money"></yhm-manager-td-money>
<!--          <yhm-manager-td-money v-show="!isSelected" :before-symbol="oldMoneySymbol" @click="totalClick(item,'2')" before-color="#ff000c" :style="{color:oldTotalColor}" v-for="(item,index) in contentTotal" :key="index+2" :value="oldMoney"></yhm-manager-td-money>-->
<!--          <yhm-manager-td-money v-show="isYearMoneyShow && !isSelected" v-if="yearMoneyShow" :before-symbol="yearMoneySymbol" @click="totalClick(yearMoney)" before-color="#ff000c" :style="{color:oldTotalColor}"  :value="yearMoney"></yhm-manager-td-money>-->
<!--          <yhm-manager-td-money v-show="isYearMoneyShow && !isSelected" v-if="!yearMoneyShow" :before-symbol="yearMoneySymbol" @click="totalClick('0')" before-color="#ff000c" :style="{color:oldTotalColor}"  value="NaN"></yhm-manager-td-money>-->

        </tr>
        <tr>

        </tr>
      </template>

    </yhm-managerpage>

  </div>
</template>

<script>
  import { managermixin } from '@/assets/manager.js'
  export default {
    name: "bankDetailRenewalManager",
    mixins: [managermixin],
    data(){
      return {
        issueCodeIndex: '0',
        policyCOdeIndex:'0',
        content:[],
        dateType:'0',
        bankList:[],
        unitList:[],
        endDate:'',
        startDate:'',
        subjectID: '2',
        // oldTotalColor:'#ff000c',
        // yearTotal:'同比',
        // nowTotal:'本日',
        // oldTotal:'比前一天(环比)',
        contentTotal: [],
        dateTypeList: {
          value: '',
          list: [
            {showName:"当天", num: "1", code: "", img: ""},
            {showName:"本周", num: "2", code: "", img: ""},
            {showName:"上周", num: "3", code: "", img: ""},
            {showName:"本月", num: "4", code: "", img: ""},
            {showName:"上月", num: "5", code: "", img: ""},
            {showName:"本季度", num: "6", code: "", img: ""},
            {showName:"上季度", num: "7", code: "", img: ""},
            {showName:"本年", num: "8", code: "", img: ""},
            {showName:"上一年", num: "9", code: "", img: ""},
          ]
        },
      }
    },
    methods: {
      oldTotalClick(){
      },
      statisticalClick(){//右上角统计图点击事件

        this.$dialog.OpenWindow({
          width: '1300',
          height: '810',
          title: '支付续保费统计图',
          url: '/renewPremiumCartogram',
          closeCallBack: (dataTwo)=>{

          }
        })
      },
      selectMonthEvent(data,item){
        this.yearMonth = data;
        this.radioTime = item;
        this.dateType='1';
        if(this.radioTime){
          this.initPageData(false)
        }
      },
      subjectEvent(item){
        let url = '';
        let title = '';
        if(item.ownerIDType === '2'){  //ownerID
          title = '查看付款申请信息'
          url = '/reimbursementViewForm?id=' + item.ownerID
        }else if(item.ownerIDType === '1'){
          title = '查看付款申请信息'
          url = '/paymentApplyViewForm?id=' + item.ownerID
        }

        // ownerIDType 0 不操作 1  付款view   2  报销主页面

        this.$dialog.OpenWindow({
          width: '1050',
          height: '750',
          title: title,
          url: url,
          closeCallBack: (data)=>{
            if(data){

            }
          }
        })
      },
      selectedSum(){
        let params={
          selectValue:this.selectValue
        }
        this.ajaxJson({
          url: '/Fin/commonSelectedsave',
          data:params,
          call:(data) =>{
            if(data.type===0){
              this.ajaxJson({
                url: '/Fin/bankDetailRebateTotal',
                data:params,
                call:(information) =>{
                  this.contentTotal = information
                }
              })
            }
          }
        })
      },
      selectedList(){
        let params={
          selectValue:this.selectValue
        }
        this.ajaxJson({
          url: '/Fin/commonSelectedsave',
          data:params,
          call:(data) =>{
            if(data.type===0){
              this.$dialog.OpenWindow({
                width: '1050',
                height: '750',
                title: '查看选中信息',
                url: '/unitDetailView?id='+data.val+'&information=0',
                closeCallBack: (dataTwo)=>{
                  if(dataTwo){

                  }
                }
              })
            }
          }
        })
      },
      listView(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '750',
          url: '/unitDetailView?id=' + item.id ,
          title: '查看收支明细信息',
          closeCallBack: (data)=>{
            if(data){
              this.initPageData(false)
            }
          }
        })
      },
      /* 账户事件 */
      accountEvent(item){
        /* 对公 */
        this.skipEvent('/publicAccountView?id='+item.selfAccountID,'查看对公账户信息')
      },
      /* 交易对象事件 */
      otherNameEvent(item){
        if(item.otherAccountType === '0'){
          /* 对公 */
          this.skipEvent('/publicAccountView?id='+item.otherAccountID,'查看对公账户信息')
        }else{
          /* 对私 */
          this.skipEvent('/privateAccountView?id='+item.otherAccountID,'查看对私账户信息')
        }
      },
      /* 跳转对公对私 */
      skipEvent(url,title){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '400',
          title: title,
          url: url,
          closeCallBack: (data)=>{
            if(data){
              this.initPageData(false)
            }
          }
        })
      },

      //页面初始化调用
      initPageData(initValue){
        let params = {}
        if (initValue) {
          // 页面初始化是需要的参数
          let nowDate = new Date();
          let newYear = nowDate.getFullYear();
          let newMonth = nowDate.getMonth() + 1;
          let newDate = nowDate.getDate();
          let newHours = nowDate.getHours();
          let newMin = nowDate.getMinutes();
          let newSec = nowDate.getSeconds();
          let lastDate = newDate - 1;

          this.startDate = newYear + '-' + newMonth + '-1 ' + '00:00:00';
          this.endDate = newYear + '-' + newMonth + '-' + newDate + ' ' + newHours + ':' + newMin + ':' + newSec;
          params = {
            subjectID: this.subjectID,
            startDate:this.startDate,
            endDate:this.endDate,
          }
        } else {
          // 页面非初始化时需要的参数
          if (this.dateType==='0'){
            params = {
              subjectID: this.subjectID,
              bankID:this.bankList.value,
              unitID:this.unitList.value,

              startDate: this.startDate,
              endDate: this.endDate,
            }
          }else{
            params = {
              subjectID: this.subjectID,
              bankID:this.bankList.value,
              unitID:this.unitList.value,
              startDate: this.radioTime.startDate ? this.radioTime.startDate : newRadioTime.startDate,
              endDate: this.radioTime.endDate ? this.radioTime.endDate : newRadioTime.endDate,
            }
          }
        }
        this.init({
          initValue: initValue,
          url: '/Fin/getBankDetailRebateManager',
          data: params,
          all: (data) => {
            // 不管是不是初始化都需要执行的代码
            this.content = data.content
            this.contentTotal = data.total
            this.bankList = data.bankList
            this.unitList = data.unitList
          },
          init: (data) => {
            // 初始化时需要执行的代码
            this.shortcutSearchContent = data.shortcutSearchContent
            this.bankList = data.bankList
          }
        })
      }
    },
    created() {

    }
  }
</script>

<style scoped>

</style>
