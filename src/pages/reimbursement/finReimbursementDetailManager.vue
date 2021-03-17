<template>
  <div>
    <yhm-managerpage category="1" :total-table="true">
      <!--导航条-->

      <template #navigationTab>
        <a class="menuTabDiv" href="/Fin/_bankDetailManager?menuType=1">收支明细</a>
        <router-link class="menuTabDiv" :to="{path:'/home/viewManager/paymentPlanViewManager'}">付款计划</router-link>
        <router-link class="menuTabDiv" :to="{path:'/home/viewManager/paymentApplyViewManager'}">付款申请</router-link>
        <router-link class="menuTabDiv" :to="{path:'/home/viewManager/reimbursementViewManager'}">报销申请</router-link>
        <router-link class="menuTabDiv menuTabActive" :to="{path:'/home/viewManager/finReimbursementDetailManager'}">特殊报销</router-link>
        <router-link class="menuTabDiv" :to="{path:'/home/viewManager/finPrettyCashsManagerAll'}">备用金</router-link>
        <router-link class="menuTabDiv" :to="{path:'/home/bankDetailRenewalManager'}">支付续保费</router-link>
        <router-link class="menuTabDiv" :to="{path:'/home/BankDetailRebateManager'}">支付客户返利</router-link>
        <router-link class="menuTabDiv" :to="{path:'/home/finPurchaseManager'}">采购计划</router-link>
        <router-link class="menuTabDiv " :to="{path:'/home/finBillingManager'}">保险保单</router-link>

      </template>
      <!-- 操作区-->
      <template #operate>
<!--        <yhm-commonbutton value="添加" v-if="isMain === '1'" icon="btnAdd" :flicker="true" @call="add" category="one"></yhm-commonbutton>-->
        <yhm-commonbutton :value="choose?'收起筛选':'展开筛选'" :icon="choose?'btnUp':'btnDown'" @call="switchChoose()"></yhm-commonbutton>
        <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initPageData"></yhm-managersearch>
        <yhm-radiofilter @initData="initChoose('type')" title="类型" :content="typePsd"></yhm-radiofilter>
        <yhm-radiofilter @initData="initChoose('invoiceCategory')" title="发票类型" :content="invoiceCategoryPsd"></yhm-radiofilter>
      </template>

      <template #choose>
        <div v-show="choose" class="buttonBody mptZero">
        </div>
      </template>
      <!--数据表头-->
      <template #listHead>
        <yhm-managerth style="width: 40px;" title="选择"></yhm-managerth>
        <yhm-managerth style="width: 40px;" title="查看"></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="添加人" value="person"></yhm-managerth>
        <yhm-managerth title="编号"></yhm-managerth>
        <yhm-managerth title="添加日期"></yhm-managerth>
        <yhm-managerth title="事由"></yhm-managerth>
        <yhm-managerth title="类型"></yhm-managerth>
        <yhm-managerth title="发票类型"></yhm-managerth>
        <yhm-managerth title="发票金额"></yhm-managerth>
        <yhm-managerth title="已拨款金额"></yhm-managerth>
        <yhm-managerth title="已退款金额"></yhm-managerth>
      </template>

      <!--数据明细-->
      <template #listBody>
        <tr :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]" v-for="(item,index) in content" :key="index">
          <yhm-manager-td-checkbox :value="item" @call="check"></yhm-manager-td-checkbox>
          <yhm-manager-td-look @click="look(item)"></yhm-manager-td-look>
          <yhm-manager-td-center :value="item.person" :menu-list="unitMenu" @rightClick="rightClick(item)" @menuClick="menuClick"></yhm-manager-td-center>
          <yhm-manager-td :value="item.code"></yhm-manager-td>
          <yhm-manager-td-date :value="item.workDate"></yhm-manager-td-date>
          <yhm-manager-td @click="look(item)" :value="item.subject"></yhm-manager-td>
          <yhm-manager-td-psd :value="item.type" :list="typePsd.list"></yhm-manager-td-psd>
          <yhm-manager-td-psd :value="item.type" :list="invoiceCategoryPsd.list"></yhm-manager-td-psd>
          <yhm-manager-td-money :value="item.invoiceMoney"></yhm-manager-td-money>
          <yhm-manager-td-money style="color: red" @click="appropriationMoney(item)" :value="item.appropriationMoney"></yhm-manager-td-money>
          <yhm-manager-td-money style="color: #10b6ff;" @click="returnMoney(item)" :value="item.returnMoney"></yhm-manager-td-money>
        </tr>
      </template>

<!--      数据空提示-->
      <template #empty>
        <span class="m_listNoData" v-show="content.length==0">暂时没有数据</span>
      </template>

<!--      分页控件-->
      <template #pager>
        <yhm-pagination :pager="pager" @initData="initData(false)"></yhm-pagination>
      </template>

      <template #listTotalHead >
        <yhm-managerth style="width: 60px;color: blue" title="" before-title="总条数" ></yhm-managerth>
        <yhm-managerth style="width: 60px;color: #c11bff" title="" before-title="总金额" ></yhm-managerth>
      </template>
      <template #listTotalBody>
        <tr>
          <yhm-manager-td color="blue" :value="count"></yhm-manager-td>
          <yhm-manager-td-money style="color: #c11bff" :value="money"></yhm-manager-td-money>
        </tr>
      </template>

    </yhm-managerpage>
  </div>
</template>

<script>
  import {managermixin} from '@/assets/manager.js'
  export default {
    name: 'finReimbursementDetailManager',
    mixins: [managermixin],
    data(){
      return{
        typePsd:[],
        invoiceCategoryPsd:[],
        type:"",
        count:"",
        money:'',
        total:'',
        unitMenu:['筛选当前添加人','排除当前添加人'],
        unitItme: {},
        selet:0,
        personID:'',
        personType:'',//1筛选当前  2排除
      }
    },
    methods:{
      initChoose(){
        this.initData(false)
      },
      returnMoney(item){
        if(item.appropriationID!==''&&item.appropriationID!==null){
          this.$dialog.OpenWindow({
            width: 1050,
            height: 690,
            url: '/unitDetailView?id=' + item.returnID,
            title: '查看退款信息',
            closeCallBack: () => {

            }
          })
        }
      },
      appropriationMoney(item){
        this.$dialog.OpenWindow({
          width: 1050,
          height: 690,
          url: '/unitDetailView?id=' + item.appropriationID,
          title: '查看拨款信息',
          closeCallBack: () => {

          }
        })
      },
      look(item) { //查看
        this.$dialog.OpenWindow({
          width: 1050,
          height: 690,
          url: '/reimbursementViewDetailForm?id=' + item.id,
          title: '查看报销明细',
          closeCallBack: () => {

          }
        })
      },
      check(select,value){
        if(select.length!=0){
          this.selet++
          if(this.selet==1){
            this.money=0
          }
          this.count=(select.length).toString()
          this.money=Number(this.money)+Number(value.invoiceMoney)
          this.money=this.money.toString()
        }else{
          this.selet=0
          this.count=this.total[0].count
          this.money=this.total[0].money
        }
      },
      initData(initValue){
        let params = {}

        if (initValue) {
          params = {
            type: this.type
          }
        } else {
          params = {
            type:this.typePsd.value,
            personID:this.personID,
            personType:this.personType,
            invoiceCategory:this.invoiceCategoryPsd.value
          }
        }
        this.init({
          initValue:initValue,
          url: '/PersonOffice/getReimbursementsDetailManager',
          data:params,
          all:(data) =>{
            //不管是不是初始化都需要执行的代码
            this.count=data.total[0].count
            this.money=data.total[0].money
            this.total=data.total
          },
          init:(data)=>{
            //初始化时需要执行的代码
            this.typePsd=data.typePsd
            this.invoiceCategoryPsd=data.invoiceCategoryPsd
          }
        })
      },
      rightClick(item){//点击右键菜单时获取当前点击的数据
        this.unitItme = item
      },
      menuClick(item,index){//返回用户选中的菜单选项及索引值
        if(item==='筛选当前添加人'){
          this.unitMenu=['取消添加人筛选','排除当前添加人']
          this.personID = this.unitItme.personID
          this.personType = '1'
        }else if(item==='取消添加人筛选'){
          this.unitMenu=['筛选当前添加人','排除当前添加人']
          this.personID =''
          this.personType = ''
        }else if(item==='排除当前添加人'){
          this.unitMenu=['筛选当前添加人','取消排除添加人']
          this.personID =this.unitItme.personID
          this.personType = '2'
        }else if(item==='取消排除添加人'){
          this.unitMenu=['筛选当前添加人','排除当前添加人']
          this.personID =''
          this.personType = ''
        }
        this.pager.pageIndex = 1
        this.initData(false)
      },
    },
    created () {
      this.setQuery2Value('type')
      this.initData(true)
    },
  }
</script>

<style scoped>

</style>
