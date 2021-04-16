<template>
    <div>
      <yhm-managerpage>
        <template #navigation>售后业务&gt;&nbsp;工单&nbsp;&gt;&nbsp;保险公司管理</template>
        <template #operate>
          <!-- 操作区-->
<!--          <yhm-commonbutton value="添加保险公司"  icon="btnAdd" :flicker="true" @call="add" category="one"></yhm-commonbutton>-->
          <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initChoose"></yhm-managersearch>
        </template>

        <template #listHead>
          <yhm-managerth style="width: 40px;" title="选择" ></yhm-managerth>
          <yhm-managerth style="width: 40px;" title="查看" ></yhm-managerth>
          <yhm-managerth width="220"  title="保险公司简称" value="shortName"></yhm-managerth>
<!--          <yhm-managerth  title="汇款时公司名称" value="unit"></yhm-managerth>-->
          <yhm-managerth  title="保险公司名称" value="incomeUnit"></yhm-managerth>
          <yhm-managerth width="100"  title="工单总数"></yhm-managerth>
          <yhm-managerth width="130"  title="利润"></yhm-managerth>
          <yhm-managerth width="130"  title="合计金额"></yhm-managerth>
        </template>
        <template #listBody >
          <tr :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]" v-for="(item,index) in content" :key="index">
            <yhm-manager-td-checkbox :value="item"></yhm-manager-td-checkbox>
            <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>
            <yhm-manager-td :value="item.shortName" :color="item.deputyColor" ></yhm-manager-td>
<!--            <yhm-manager-td :value="item.unit"></yhm-manager-td>-->
            <yhm-manager-td :value="item.incomeUnit"></yhm-manager-td>
            <yhm-manager-td-center :value="item.sum"></yhm-manager-td-center>
            <yhm-manager-td-money style="color: #00b300;" :value="item.sumprofit"></yhm-manager-td-money>
            <yhm-manager-td-money style="color: #fd6802;" :value="item.sumexpend"></yhm-manager-td-money>
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
  import {managermixin} from '@/assets/manager.js'
  export default {
    name: 'workOrderInsuranceUnitManager',
    mixins: [managermixin],
    data(){
      return{

      }
    },
    methods:{
      add(){
        this.$dialog.OpenWindow({
          width: 1050,
          height: 720,
          url:'/workOrderInsuranceUnitForm?isAdd=1',
          title:'添加保险公司',
          closeCallBack:(data)=>{
            this.initPageData()
          }
        })
      },
      listView(item){
        this.$dialog.OpenWindow({
          width: 1050,
          height: 720,
          url:'/workOrderInsuranceUnitForm?id='+item.id+'&unitname='+item.shortName+'&unitID='+item.id+'&fixorderunitID='+item.fixorderunitID,
          title:'编辑保险公司资料',
          closeCallBack:(data)=>{
            this.initPageData()
          }
        })
      },
      lookOverUnit(item){
        if(item.unitID!=''){
          this.$dialog.OpenWindow({
            width: '1070',
            height: '750',
            url:'/unitView?id='+item.unitID,
            title:'查看车主信息',
            closeCallBack:(data) =>{
              this.initPageData(false)
            }
          })
        }

      },
      initPageData (initValue) {
        let params = {}
        if (initValue) {
          // 页面初始化是需要的参数
          params = {
            init:true,
          }
        } else {
          // 页面非初始化时需要的参数
          params = {

          }
        }
        this.init({
          initValue: initValue,
          url:'/fix/fixOrderUnit/getManager',
          data: params,
          all: (data) => {
            // 不管是不是初始化都需要执行的代码
            this.content = data.content
          },
          init: (data) => {
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
