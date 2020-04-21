<template>
  <div>
    <yhm-managerpage category="1" :is-manager="true">

      <!--操作区-->
      <template #operate>
        <yhm-commonbutton :value="choose?'收起筛选':'展开筛选'" :icon="choose?'btnUp':'btnDown'" @call="switchChoose()"></yhm-commonbutton>
        <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initData"></yhm-managersearch>
      </template>
      <template #choose>
        <div v-show="choose" class="buttonBody mptZero">
          <yhm-radiofilter @initData="initChoose('direction')" title="状态" :content="directionPsd"></yhm-radiofilter>
          <yhm-form-date v-show="choose" title="开始时间" @call="initCode" width="250" style="margin-right: 30px" :value="startDate" id="startDate" position="b" ></yhm-form-date>
          <yhm-form-date v-show="choose" title="结束时间" @call="initCode" width="250" :value="endDate" id="endDate" position="b" ></yhm-form-date>

          <yhm-radiofilter @initData="initChoose('dateType')" title="时间类型"  :content="dateTypeList"></yhm-radiofilter>
        </div>

      </template>

      <template #listHead>
        <yhm-managerth style="width:28px" title="查看" ></yhm-managerth>
        <yhm-managerth style="width:88px" title="账户" ></yhm-managerth>
        <yhm-managerth style="width: 100px" title="交易对象"></yhm-managerth>
        <yhm-managerth style="width: 100px" title="交易日期"></yhm-managerth>
        <yhm-managerth style="width: 20px" title="方向"></yhm-managerth>
        <yhm-managerth style="width: 70px" title="事由"></yhm-managerth>
        <yhm-managerth style="width: 70px" title="收入金额"></yhm-managerth>
        <yhm-managerth style="width: 70px" title="支出金额"></yhm-managerth>
      </template>
      <template #listBody>
        <tr v-for="(item,index) in content" :key="index" :class="{InterlacBg:index%2!==0}">
          <yhm-manager-td-look @click="listView(item.id)"></yhm-manager-td-look>
          <yhm-manager-td width="130"  :value="item.bankName+item.account+item.nature"></yhm-manager-td>
          <yhm-manager-td-center width="130" :value="item.otherName"></yhm-manager-td-center>
          <yhm-manager-td-date :value="item.cccurDate" typeof="data"></yhm-manager-td-date>
          <yhm-manager-td-direction :direction="item.direction" :value="item.direction" class="dfJcc" :dir-val="false"></yhm-manager-td-direction>
          <yhm-manager-td :value="item.subject" ></yhm-manager-td>
          <yhm-manager-td-money :value="money" v-if="item.direction==='0'?money=item.money:money='0'" style="color:#001CCE;"></yhm-manager-td-money>
          <yhm-manager-td-money :value="money" v-if="item.direction==='1'?money=item.money:money='0'" style="color:#f00;"></yhm-manager-td-money>
        </tr>
      </template>
      <template #total>
        <div class="listTotalCrente m_list w620">
          <div class="listTotalLeft">
          </div>
          <table width="100%" cellpadding="0" cellspacing="0" class="m_content_table m_content_total_table">
            <thead>
            <tr>
              <yhm-managerth style="width: 100px;" before-color="#49a9ea" title="" before-title="收入" ></yhm-managerth>
              <yhm-managerth style="width: 100px;" before-color="#ff0000" title="" before-title="支出" ></yhm-managerth>
              <yhm-managerth style="width: 100px;" before-color="black" title="" before-title="余额" ></yhm-managerth>
            </tr>
            </thead>
            <tbody>
            <tr>
              <yhm-manager-td-money :value="income"></yhm-manager-td-money>
              <yhm-manager-td-money :value="expend"></yhm-manager-td-money>
              <yhm-manager-td-money :value="balance"></yhm-manager-td-money>
            </tr>
            </tbody>
          </table>
        </div>
      </template>
      <!--数据空提示-->
      <template #empty>
        <span class="m_listNoData" v-show="empty">暂时没有数据</span>
      </template>
      <!--分页控件-->
      <template #pager>
        <yhm-pagination :pager="pager" isPageSize="false" @initData="initPageData(false)"></yhm-pagination>
      </template>
    </yhm-managerpage>
  </div>
</template>

<script>
  import { managermixin } from '@/assets/manager.js'
  export default {
    mixins: [managermixin],
    name: "unitBankDetailForm",
    data(){
      return{
        content: [],
        contentTotal:[],
        income:'',
        expend:'',
        balance:'',
        direction:'',
        directionPsd:{
          value: '',
          list: []
        },
        startDate:'',//开始时间
        endDate:'',//结束时间
        dateTypeList: {
          value: '',
          list: [
            {showName:"本周", num: "2", code: "", img: ""},
            {showName:"本月", num: "4", code: "", img: ""},
            {showName:"本季度", num: "6", code: "", img: ""},
            {showName:"本年", num: "8", code: "", img: ""},
          ]
        },
        pager: {
          total: 0, // 总条数
          pageSize: 10, // 每页条数
          pageIndex: 1, // 当前页码
          selectCount: 0 // 选中条数
        }
      }
    },
    methods: {
      initCode(){
        this.initPageData()
      },
      listView(id){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '740',
          title: '查看收支明细',
          url:'/unitDetailView?id='+id,
          closeCallBack: (data)=>{
            if(data){
              this.initPageData(false)
            }
          }
        })
      },
      initPageData (initValue) {
        let params = {}
        if (initValue) {
          // 页面初始化是需要的参数
          params = {
            init: true,
          }
        } else {
          // 页面非初始化时需要的参数
          params = {
            direction: this.directionPsd.value,
            dateType:this.dateTypeList.value,
            startDate:this.startDate,//开始时间
            endDate:this.endDate,//结束时间
            unitID: this.unitID,
            init: false
          }
        }
        this.init({
          initValue: initValue,
          url: '/Fin/getUnitOrPersonBankDetail',
          data: params,
          all: (data) => {
            // 不管是不是初始化都需要执行的代码
            this.content = data.content
            this.contentTotal = data.total
            this.income = this.contentTotal[0].income
            this.expend = this.contentTotal[0].expend
            this.balance = this.contentTotal[0].balance

          },
          init: (data) => {
            // 初始化时需要执行的代码
            // 这边初始化筛选信息
            this.directionPsd = data.directionPsd
            this.startDate = data.startDate//开始时间
            this.endDate = data.endDate//结束时间
          }
        })
      },
    },
    created() {
      this.setQuery2Value('unitID')
      this.initData()
    }
  }
</script>

<style scoped>

</style>
