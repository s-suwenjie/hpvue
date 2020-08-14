<template>
    <div>
      <yhm-managerpage category="1" :totalTable="true">
        <!--导航条-->
        <template #navigationTab>
          <a class="menuTabDiv" href="/Fin/bankDetailManager?menuType=0">收支明细</a>
          <router-link class="menuTabDiv" :to="{path:'/home/viewManager/claimsManager'}">保险理赔</router-link>
          <router-link class="menuTabDiv" :to="{path:'/home/BankDetailRepairManager'}">散户维修</router-link>
          <router-link class="menuTabDiv" :to="{path:'/home/BankDetailCommissionManager'}">保险手续费</router-link>
          <router-link class="menuTabDiv" :to="{path:'/home/finPosAccountManager'}">Pos账户</router-link>
          <router-link class="menuTabDiv menuTabActive" :to="{path:'/home/finPosAccountDetailManager'}">Pos离线数据</router-link>

        </template>
        <!--操作区-->
        <template #operate>
          <yhm-commonbutton value="添加" icon="btnAdd" :flicker="true" @call="add()" category="one"></yhm-commonbutton>
          <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initPageData"></yhm-managersearch>
          <yhm-form-date :error-show="false" width="200" title="开始日期" :value="startDate" id="startDate" @call="initDate" ></yhm-form-date>
          <yhm-form-date :error-show="false" width="200" title="结束日期" :value="endDate" id="endDate" @call="initDate" ></yhm-form-date>
          <yhm-radiofilter style="margin-left: 20px" @initData="initChoose('account')" title="账户类型"  :content="accountList"></yhm-radiofilter>

        </template>
        <!--筛选区-->
        <template #choose>
          <div v-show="choose" class="buttonBody mptZero">
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
          <yhm-managerth style="width: 120px" title="收入金额" value="money"></yhm-managerth>
          <yhm-managerth style="width: 330px" title="备注" value="remark"></yhm-managerth>

        </template>
        <template #listBody>
          <tr  v-for="(item,index) in content" :key="index">
            <yhm-manager-td-checkbox :value="item"></yhm-manager-td-checkbox>
            <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>
            <yhm-manager-td :value="item.bankName + item.account + item.nature" :tip="true"></yhm-manager-td>
            <yhm-manager-td-html :value="item.otherName" :tip="true"></yhm-manager-td-html>
            <yhm-manager-td-date :value="item.cccurDate"></yhm-manager-td-date>
            <yhm-manager-td-direction :direction="item.direction" class="dfJcc" :value="item.direction" :dir-val="false"></yhm-manager-td-direction>
            <yhm-manager-td :value="item.subject"></yhm-manager-td>
            <yhm-manager-td-money :value="item.money"></yhm-manager-td-money>
            <yhm-manager-td :value="item.remark" :tip="true"></yhm-manager-td>
          </tr>
        </template>
        <!--数据空提示-->
        <template #empty>
          <span class="m_listNoData" v-show="empty">暂时没有数据</span>
        </template>
        <!--分页控件-->
        <template #pager >
          <yhm-pagination isPageSize="true" :pager="pager" @initData="initPageData(false)"></yhm-pagination>
        </template>
        <template #listTotalHead >
          <yhm-managerth before-color="black" style="width: 60px" width="60px" title="" before-title="总数" ></yhm-managerth>
          <yhm-managerth before-color="black" style="width: 60px" width="60px" title="" before-title="总金额" ></yhm-managerth>
         </template>
        <template #listTotalBody>
          <tr>
            <yhm-manager-td-rgt  :value="category"></yhm-manager-td-rgt>
            <yhm-manager-td-money :value="income"></yhm-manager-td-money>
          </tr>
        </template>
      </yhm-managerpage>
    </div>
</template>

<script>
  import { managermixin } from '@/assets/manager.js'
  import { accAdd } from '../../assets/common'
  export default {
    name: 'finPosAccountDetailManager',
    mixins: [managermixin],
    data(){
      return{
        orderColumn:'cccurDate',
        accountList:[],
        startDate:'',
        endDate:'',
        accountID:'',
        category:'',
        income:'',
      }
    },
    methods:{
      add(){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '750',
          url: '/finPosAccountDetailForm',
          title: '添加Pos离线数据',
          closeCallBack: (data)=>{
            if(data){
              this.initPageData ()
            }
          }
        })
      },
      listView(item){

        this.$dialog.OpenWindow({
          width: '900',
          height: '650',
          url: '/finPosAccountDetailView?id='+item.id,
          title: '查看收支明细',
          closeCallBack: (data)=>{

          }
        })
      },
      initDate(){
        if(this.startDate !== '' &&this.endDate !== '' ){
          this.initPageData()
        }
      },
      //搜索
      initPageData (initValue) {
        let params = {}
        if (initValue) {
          params = {
            // startDate:'',
            // endDate:'',
            // accountID:'',
            orderColumn:this.orderColumn
          }
        } else {
          if(this.startDate !== '' &&this.endDate !== '' ){
            params = {
              startDate:this.startDate+' 00:00:00',
              endDate:this.endDate+' 23:59:59',
              accountID:this.accountList.value,
              orderColumn:this.orderColumn
            }
          }else{
            params = {
              accountID:this.accountList.value,
              orderColumn:this.orderColumn
            }
          }
        }
        this.init({
          initValue:initValue,
          url: '/Fin/vueBankDetailHistoryManager',
          data:params,
          all:(data) =>{
            //不管是不是初始化都需要执行的代码
            this.accountList = data.accountList
            this.category = data.total[0].category
            this.income = data.total[0].income
          },
          init:(data)=>{
            //初始化时需要执行的代码
            // 这边初始化筛选信息

          }
        })

      }
    },

  }
</script>

<style scoped>

</style>
