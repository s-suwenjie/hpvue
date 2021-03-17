<template>
  <div>
    <yhm-managerpage @statisticalClick="statisticalClick" :statisticalShow="true" :category="isCategory" :total-table="true" :totalWidth="true">
      <!--导航条-->
      <template #navigationTab v-if="isPersonalClaims">
        <a class="menuTabDiv" href="/Fin/bankDetailManager?menuType=0">收支明细</a>
        <router-link class="menuTabDiv" :to="{path:'/home/viewManager/claimsManager'}">保险理赔</router-link>
        <router-link class="menuTabDiv" :to="{path:'/home/BankDetailRepairManager'}">自费维修</router-link>
        <router-link class="menuTabDiv menuTabActive" :to="{path:'/home/BankDetailCommissionManager'}">保险手续费</router-link>
        <router-link class="menuTabDiv " :to="{path:'/home/finPosAccountManager'}">Pos账户</router-link>
        <router-link class="menuTabDiv" :to="{path:'/home/finPosAccountDetailManager'}">Pos离线数据</router-link>
      </template>
      <!--操作区-->
      <template #operate>
        <!--          <yhm-commonbutton value="添加" icon="btnAdd" :flicker="true" @call="add()"></yhm-commonbutton>-->
        <yhm-commonbutton :value="choose?'收起筛选':'展开筛选'" :icon="choose?'btnUp':'btnDown'" @call="switchChoose()"></yhm-commonbutton>
        <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initData"></yhm-managersearch>
        <yhm-radiofilterdate title="时间" @initData="selectMonthEvent"></yhm-radiofilterdate>
      </template>
      <template #choose>
        <div v-show="choose" class="buttonBody mptZero">
          <yhm-radiofilter @initData="initChoose('bank')" title="银行"  :content="bankList"></yhm-radiofilter>
        </div>
      </template>
      <!--数据表头-->
      <template #listHead>
        <yhm-managerth-check style="width: 40px;" :check="allCheck"></yhm-managerth-check>
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
          <yhm-manager-td-money  @click="selectMoeny(item)" :value="item.money" :before-icon="item.step==2?'i-finishApprovalOK':''" @mouseover="tableTipShowEvent" @mouseout="tableTipHideEvent" :value-object="item"></yhm-manager-td-money>
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
      <template #listTotalHead >
        <yhm-managerth before-color="black" style="width: 60px" width="60px" title="" before-title="总数" ></yhm-managerth>
        <yhm-managerth before-color="black" style="width: 60px" width="60px" title="" :before-title="nowTotal" ></yhm-managerth>
      </template>
      <template #listTotalBody>
        <tr>
          <yhm-manager-td-rgt  style="text-align: center;" v-for="(item,key) in contentTotal" :key="key" :value="item.count"></yhm-manager-td-rgt>
          <yhm-manager-td-money style="text-align: center;" v-for="(item,index) in contentTotal" :key="index+1" :value="item.money"></yhm-manager-td-money>
        </tr>

      </template>
    </yhm-managerpage>
  </div>
</template>

<script>
  import { managermixin } from '@/assets/manager.js'

  export default {
    name: 'BankDetailCommissionManager',
    mixins: [managermixin],
    data(){
      return{
        yearMonth: '',
        isPersonalClaims: true,
        isCategory: '1',
        oldTotal:'比前一天(环比)',
        yearTotal:'同比',
        yearMoneySymbol:'',
        oldMoneySymbol:'',
        oldMoney:'',
        dateType:'0',
        endDate:'',
        startDate:'',

        yearMoney:'',
        bank:'',
        bankList: {

        },
        topBtnShou:false,
        oldTotalColor:'#ff000c',
        radioTime:{},
        nowTotal:'本月',
        selectMonth:'',
        isYearMoneyShow:true,
        yearMoneyShow:true,
        contentTotal:[],
        dayCategory:'0',//环比点击事件变量
      }
    },
    methods:{
      selectMoeny(item){
        if (item.step==2){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '750',
          url: '/statementDetails?id=' + item.id ,
          title: '查看明细对账单',
          closeCallBack: (data)=>{
            if(data){
              this.initPageData(false)
            }
          }
        })
        }
      },
      statisticalClick(){
        this.$dialog.OpenWindow({
          width: '1300',
          height: '810',
          title: '保险手续费统计图',
          url: '/BankDetailCommissionCartogram',
          closeCallBack: (dataTwo)=>{

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
      getMonthDay(year, month) {
        let days = new Date(year, month, 0).getDate()
        return days
      },
      profitAndLossClick(){
        if(this.profitAndLoss === '0'){
          this.profitAndLoss = '1'
          this.oldTotalColor='#09B300'
          this.topBtnShou = true
        }else{
          this.profitAndLoss = '0'
          this.oldTotalColor='#ff000c'
          this.topBtnShou = false
        }
      },
      selectMonthEvent(data,item){
        this.yearMonth = data;
        this.radioTime = item;
        this.dateType = '1';
        if(this.radioTime){
          this.dayCategory = '2'
          this.initPageData(false)
        }
        if(data.split("-")[1]==='13'){
          this.nowTotal='本年'
        }else if(data.split("-")[1]>0&&data.split("-")[1]<13){
          this.nowTotal='本月'
        }
      },
      initChoose(){
        if(this.dayCategory === '1'||this.dayCategory === '0'){
          this.dayCategory='0'
        }else if(this.dayCategory === '3'||this.dayCategory === '2'){
          this.dayCategory='2'
        }
        this.pager.pageIndex = 1
        this.initPageData(false)
      },
      initChooseTime(item){
        this.selectMonth = item.endDate
        this.dayCategory='2'
        this.radioTime = item;
        if(item.startDate.split("-")[1]<item.endDate.split("-")[1]){
          this.oldTotal='比前一月(环比)'
          this.nowTotal='本月'
          this.isYearMoneyShow=true
        }else{
          this.oldTotal='比前一天(环比)'
          this.nowTotal='本日'
          this.isYearMoneyShow=true
        }
        this.initPageData(false)
      },
      initPageData (initValue) {
        // let newRadioTime = this.radioTime
        let params = {};

        if (initValue) {
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
            subjectID: '3',
            startDate: this.startDate,
            endDate: this.endDate,
          }
        }else{
          if (this.dateType==='0'){
            params = {
              bankID: this.bankList.value,
              startDate: this.startDate,
              endDate: this.endDate,
              subjectID: '3',
            }
          }else{
            params = {
              bankID: this.bankList.value,
              startDate: this.radioTime.startDate,
              endDate: this.radioTime.endDate,
              subjectID: '3',
            }
          }
        }
        this.init({
          initValue:initValue,
          url: '/Fin/getBankDetailRebateManager',
          data:params,
          all:(data) =>{
            //不管是不是初始化都需要执行的代码
            this.content = data.content
            this.contentTotal = data.total
            this.bankList = data.bankList


          },
          init:(data)=>{
            //初始化时需要执行的代码

          }
        })
      }
    },
    created () {
      let month = new Date().getMonth() + 1;
      this.yearMonth = new Date().getFullYear()+ '-' + month
    }
  }
</script>

<style scoped>

</style>
