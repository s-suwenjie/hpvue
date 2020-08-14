<template>
    <div>
      <yhm-managerpage>
        <!--导航条-->
        <template #navigation>业务管理&nbsp;&gt;&nbsp;工单&nbsp;&gt;&nbsp;工单管理</template>
        <!--操作区-->
        <template #operate>
          <yhm-commonbutton value="添加" icon="btnAdd" :flicker="true" @call="add()"></yhm-commonbutton>
          <yhm-commonbutton :value="choose?'收起筛选':'展开筛选'" :icon="choose?'btnUp':'btnDown'" @call="switchChoose()"></yhm-commonbutton>
          <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initData"></yhm-managersearch>
        </template>

        <!--数据表头-->
        <template #listHead>
          <yhm-managerth style="width: 38px;" title="选择"></yhm-managerth>
          <yhm-managerth style="width: 38px;" title="查看"></yhm-managerth>
          <yhm-managerth  title="车辆"></yhm-managerth>
          <yhm-managerth  title="发生日期"></yhm-managerth>
          <yhm-managerth  title="维修类型"></yhm-managerth>
          <yhm-managerth  title="计划收入金额"></yhm-managerth>
          <yhm-managerth  title="计划支出金额"></yhm-managerth>
          <yhm-managerth  title="计划余额"></yhm-managerth>
          <yhm-managerth  title="利率"></yhm-managerth>
          <yhm-managerth  title="实际结余"></yhm-managerth>
          <yhm-managerth  title="状态"></yhm-managerth>
          <yhm-managerth  title="操作"></yhm-managerth>

        </template>

        <!--数据明细-->
        <template #listBody>
          <tr :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]" v-for="(item,index) in content" :key="index">
            <yhm-manager-td-checkbox :value="item"></yhm-manager-td-checkbox>
            <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>
            <yhm-manager-td-center :value="item.vehicle"></yhm-manager-td-center>
            <yhm-manager-td-center :value="item.workDate"></yhm-manager-td-center>
            <yhm-manager-td-psd :value="item.category" :list="categoryList"></yhm-manager-td-psd>
            <!--            <yhm-manager-td-psd :list="listCategory.list" :value="item.category"></yhm-manager-td-psd>-->
            <yhm-manager-td-money :value="item.incomePlan==-1?'0':item.incomePlan"></yhm-manager-td-money>
            <yhm-manager-td-money :value="item.expendPlan==-1?'0':item.expendPlan"></yhm-manager-td-money>
            <yhm-manager-td-money :value="item.balancePlan==-1?'0':item.balancePlan"></yhm-manager-td-money>
            <yhm-manager-td-center :value="item.rate==-1?'0%':item.rate+'%'"></yhm-manager-td-center>
            <yhm-manager-td-money :value="item.balance==-1?'0':item.balance"></yhm-manager-td-money>
            <yhm-manager-td-psd :value="item.state" :list="stateList"></yhm-manager-td-psd>
<!--            <yhm-manager-td-center :value="item.state"></yhm-manager-td-center>-->
            <yhm-manager-td-operate>
              <yhm-manager-td-operate-button @click="operation(item)" value="操作" icon="i-btn-print" color="#333"></yhm-manager-td-operate-button>
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
  import { managermixin } from '@/assets/manager.js'
  export default {
    name: 'workOrderManager',
    mixins: [managermixin],
    data(){
      return{
        stateList:[],
        categoryList:[]
      }
    },
    methods:{
      listView(item){
        let url = ''
        let height = ''
        let title = ''
        this.ajaxJson({
          url: '/fix/fixOrder/initForm',
          loading:'0',
          data:{
            id:item.id
          },
          call: (data) => {
            if(data.proState=='1'){
              url = '/workOrderView?id='+item.id
              height = '550'
              title = '查看工单信息'
            }else{
              url = '/workOrderForm?id='+item.id
              height = '800'
              title = '编辑工单信息'
            }
            this.$dialog.OpenWindow({
              width: '1050',
              height: height,
              url: url,
              title: title,
              closeCallBack:(data) =>{
                if (data) {
                  this.initPageData(false)
                }
              }
            })
          }
        })
      },
      operation(item){
        this.$dialog.OpenWindow({
          width: '1150',
          height: '750',
          url:'/workOrderFlowChartForm?ownerID='+item.id+'&proState='+item.proState+'&aid='+item.applicableModels,
          title:'流程管理',
          closeCallBack:(data) =>{
            if (data) {
              this.initPageData(false)
            }
          }
        })
      },
      add(){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '750',
          url:'/workOrderForm',
          title:'添加工单',
          closeCallBack:(data) =>{
            if (data) {
              this.initPageData(false)
            }
          }
        })
      },
      //搜索
      initPageData (initValue) {
        let params = {}
        if (initValue) {
          params = {
            // startDate:'',
            // endDate:'',
            // accountID:'',
          }
        } else {
          params = {
            category:this.category,
            state:this.state,
            source:this.source,
            orderSource:this. orderSource
          }
        }
        this.init({
          initValue:initValue,
          url: '/fix/fixOrder/getManager',
          data:params,
          all:(data) =>{
            //不管是不是初始化都需要执行的代码



          },
          init:(data)=>{
            this.categoryList = data.categoryPsd.list
            this.stateList = data.statePsd.list
            //初始化时需要执行的代码
            // 这边初始化筛选信息




          }
        })

      }
    }
  }
</script>

<style scoped>

</style>
