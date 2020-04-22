<template>
    <div>
      <yhm-managerpage category="1" :total-table="true" :totalWidth="true">
        <!--导航条-->
        <template #navigationTab>
          <a class="menuTabDiv" href="/Fin/bankDetailManager?menuType=0">收支明细</a>
          <router-link class="menuTabDiv menuTabActive" :to="{path:'/home/viewManager/claimsManager'}">保险理赔</router-link>

        </template>
        <!--操作区-->
        <template #operate>
<!--          <yhm-commonbutton value="添加" icon="btnAdd" :flicker="true" @call="add()"></yhm-commonbutton>-->
          <yhm-commonbutton :value="choose?'收起筛选':'展开筛选'" :icon="choose?'btnUp':'btnDown'" @call="switchChoose()"></yhm-commonbutton>
          <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initData"></yhm-managersearch>
          <yhm-commonbutton value="打开选中信息" icon="i-selectAll" @call="selectedList" :show="isSelected" category="three"></yhm-commonbutton>


          <yhm-radiofilterdate title="时间" @initData="selectMonthEvent"></yhm-radiofilterdate>
          <yhm-radiofilterday title="日" :yearMonth="yearMonth" @initData="initChoose"></yhm-radiofilterday>


        </template>
        <template #choose>
          <div v-show="choose" class="buttonBody mptZero">
            <yhm-radiofilter :before="bank" @initData="initChoose('bank')" title="银行"  :content="bankList"></yhm-radiofilter>
            <yhm-radiofilter :before="insuranceUnit" @initData="initChoose('insuranceUnit')" title="保险公司"  :content="insuranceUnitList"></yhm-radiofilter>
            <yhm-radiofilter :before="dateType" @initData="initChoose('dateType')" title="时间"  :content="dateTypeList"></yhm-radiofilter>

          </div>
        </template>
        <!--数据表头-->
        <template #listHead>
          <yhm-managerth style="width: 38px;" title="选择"></yhm-managerth>
          <yhm-managerth style="width: 38px;" title="查看"></yhm-managerth>
          <yhm-managerth style="width: 80px" title="客户姓名" value="customerName"></yhm-managerth>
          <yhm-managerth title="保险公司" value="otherName"></yhm-managerth>
          <yhm-managerth style="width: 140px;" title="工单号" value="workOrderID"></yhm-managerth>
          <yhm-managerth style="width: 120px" title="业务员" value="operator"></yhm-managerth>
          <yhm-managerth style="width: 90px" title="部门" value="branch"></yhm-managerth>
          <yhm-managerth style="width: 100px;" title="车型品牌" value="vehicleType"></yhm-managerth>
          <yhm-managerth style="width: 120px" title="车牌号" value="licensePlateNumber"></yhm-managerth>
          <yhm-managerth style="width: 120px;" title="回款日期" value="moneyBackDate"></yhm-managerth>
          <yhm-managerth style="width: 80px" title="发生额" value="money"></yhm-managerth>
          <yhm-managerth style="width: 140px" title="收款银行" value="bankName"></yhm-managerth>
          <yhm-managerth style="width: 120px" title="结算日期" value="settlementDate"></yhm-managerth>
<!--          <yhm-managerth style="width: 140px" title="发票号"></yhm-managerth>-->
          <yhm-managerth style="width: 180px" title="备注" ></yhm-managerth>
        </template>
        <!--数据明细-->
        <template #listBody>
          <tr  v-for="(item,index) in content" :key="index">
            <yhm-manager-td-checkbox :value="item"></yhm-manager-td-checkbox>
            <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>
            <yhm-manager-td :value="item.customerName"></yhm-manager-td>
            <yhm-manager-td :tip="true" :value="item.otherName"></yhm-manager-td>
            <yhm-manager-td :value="item.workOrderID"></yhm-manager-td>
            <yhm-manager-td :value="item.operator"></yhm-manager-td>
            <yhm-manager-td :value="item.branch" ></yhm-manager-td>
            <yhm-manager-td :value="item.vehicleType"></yhm-manager-td>
            <yhm-manager-td :value="item.licensePlateNumber"></yhm-manager-td>
            <yhm-manager-td-date :value="item.moneyBackDate"></yhm-manager-td-date>
            <yhm-manager-td-money :value="item.money === null ? ' ':item.money"></yhm-manager-td-money>
            <yhm-manager-td-center :value="item.bankName"></yhm-manager-td-center>
            <yhm-manager-td-date :value="item.settlementDate" ></yhm-manager-td-date>
            <yhm-manager-td :value="item.remark === null ? ' ': item.remark"></yhm-manager-td>
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
          <yhm-managerth before-color="#4bb414" style="width: 60px" width="60px" title="" before-title="金额" ></yhm-managerth>
        </template>
        <template #listTotalBody>
          <tr>
            <yhm-manager-td-rgt @click="totalClick(item)" style="text-align: center;" v-for="(item,key) in contentTotal" :key="key" :value="item.count"></yhm-manager-td-rgt>
            <yhm-manager-td-money @click="totalClick(item)" style="text-align: center;" v-for="(item,index) in contentTotal" :key="index+1" :value="item.money"></yhm-manager-td-money>
          </tr>

        </template>
      </yhm-managerpage>

    </div>
</template>

<script>
  import { managermixin } from '@/assets/manager.js'
  export default {
    name: 'claimsManager',
    mixins: [managermixin],
    data(){
      return{
        contentTotal: [],
        content:[],
        bank:'0',
        yearMonth: '',
        radioTime: {},
        bankList: {
          value: '',
          list: []
        },
        insuranceUnit:'0',
        insuranceUnitList: {
          value: '',
          list: []
        },
        dateType:'0',
        timeParams: '',
        dateTypeList:{
          value:'',
          list:[
            {
              code:'',
              num:'0',
              showName:'本日'
            },
            {
              code:'',
              num:'1',
              showName:'本周'
            },
            {
              code:'',
              num:'2',
              showName:'本月'
            },
            {
              code:'',
              num:'3',
              showName:'本年'
            },
          ]
        }

      }
    },
    methods:{
      initChoose(item){
        this.radioTime = item;
        this.initPageData(false)
      },
      selectMonthEvent(data,item){
        this.yearMonth = data;
        this.radioTime = item;
        if(this.radioTime){
          this.initPageData(false)
        }
      },
      //选中汇总
      selectedSum(){
        let params={
          selectValue:this.selectValue
        };
        this.ajaxJson({
          url: '/Fin/commonSelectedsave',
          data:params,
          call:(data) =>{
            if(data.type===0){
              this.ajaxJson({
                url: '/Fin/bankDetailInsuranceDataTotal',
                data:params,
                call:(information) =>{
                  this.contentTotal = information
                }
              })
            }
          }
        })
      },
      //打开选中信息
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
                height: '620',
                title: '查看选中信息',
                url: '/claimsForm?id='+data.val,
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
          url: '/claimsForm?id=' + item.id,
          title: '维护保险理赔',
          closeCallBack: (data) => {
            if (data) {
              this.lastData = data
              this.initPageData(false)
            }
          }
        })
      },
      // add(){
      //   this.$dialog.OpenWindow({
      //     width: '1050',
      //     height: '750',
      //     url: '/claimsForm',
      //     title: '添加保险理赔',
      //     closeCallBack: (data) => {
      //       if (data) {
      //         this.lastData = data
      //         this.initPageData(false)
      //       }
      //     }
      //   })
      // },
      initPageData (initValue) {
        let params = {}
        if (initValue) {
          params = {

          }
        } else {
          params = {
            bankID: this.bankList.value,
            unitID: this.insuranceUnitList.value,
            dateType:this.dateTypeList.value,
            startDate: this.radioTime.startDate,
            endDate: this.radioTime.endDate,
          }
        }
        this.init({
          initValue: initValue,
          url: '/Fin/getBankDetailInsuranceData',
          data: params,
          all: (data) => {
            //不管是不是初始化都需要执行的代码
            this.content = data.content
            this.contentTotal = data.total

          },
          init: (data) => {
            this.insuranceUnitList = data.insuranceUnit
            this.bankList = data.bankList
            this.contentTotal = data.total
            //初始化时需要执行的代码
          }
        })
      },
    },
    created () {
      let month = new Date().getMonth() + 1
      this.yearMonth = new Date().getFullYear()+ '-' + month
    },
    watch: {
      month:{
        handler(newValue, oldValue) {
          console.log(newValue + '--' + oldValue);
          this.month = newValue
        },
      }
    }
  }
</script>

<style scoped>

</style>
