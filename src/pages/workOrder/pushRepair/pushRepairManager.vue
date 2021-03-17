<template>
    <div>
      <yhm-managerpage category="1">
        <template #navigationTab>
          <router-link class="menuTabDiv menuTabActive" :to="{path:'/home/pushRepairManager'}">推修管理</router-link>
          <router-link class="menuTabDiv" :to="{path:'/home/pushRepairRecordManager'}">推修记录</router-link>
        </template>
        <template #operate>
          <!-- 操作区-->
          <yhm-commonbutton value="添加推修公司"  icon="btnAdd" :flicker="true" @call="add" category="one"></yhm-commonbutton>
          <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initChoose"></yhm-managersearch>
        </template>

        <template #listHead>
          <yhm-managerth style="width: 40px;" title="选择" ></yhm-managerth>
          <yhm-managerth style="width: 40px;" title="查看" ></yhm-managerth>
          <yhm-managerth title="单位名称"></yhm-managerth>
          <yhm-managerth width="160" title="单位缩写"></yhm-managerth>
          <!--          <yhm-managerth width="170" title="启用日期" ></yhm-managerth>-->
          <!--          <yhm-managerth width="170" title="结束日期" ></yhm-managerth>-->
<!--          <yhm-managerth width="150" title="自保费率" ></yhm-managerth>-->
<!--          <yhm-managerth width="150" title="非自保费率" ></yhm-managerth>-->
          <yhm-managerth title="自保/基盘" prompt="自保客户(当年在乙方承保的车辆) / 基盘客户(一年之内有进厂记录)" after-title="?" after-size="18px" tooltip-left="-148px" after-color="#f00"></yhm-managerth>
          <yhm-managerth title="首推" prompt="首推车辆(一年没有进场记录或当年不在乙方承保的车辆,即非自保非基盘)" after-title="?" after-size="18px" tooltip-left="-170px" after-color="#f00"></yhm-managerth>
          <yhm-managerth width="170" title="结算类型" ></yhm-managerth>
          <!--          <yhm-managerth width="130" title="推修费率" ></yhm-managerth>-->
          <!--          <yhm-managerth width="220" title="开始时间"></yhm-managerth>-->
          <!--          <yhm-managerth width="220" title="结束时间"></yhm-managerth>-->
          <yhm-managerth width="280" title="操作"></yhm-managerth>
        </template>
        <template #listBody >
          <tr :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]" v-for="(item,index) in content" :key="index">
            <yhm-manager-td-checkbox :value="item"></yhm-manager-td-checkbox>
            <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>
            <yhm-manager-td @click="lookOverUnit(item)"  :value="item.unit"></yhm-manager-td>

            <yhm-manager-td v-if="item.unitshort==''||item.unitshort==null" value="-----"></yhm-manager-td>
            <yhm-manager-td v-else :value="item.unitshort"></yhm-manager-td>

            <!--            <yhm-manager-td-date :value="item.startDate"></yhm-manager-td-date>-->
            <!--            <yhm-manager-td-date :value="item.endDate"></yhm-manager-td-date>-->
            <yhm-manager-td-center :value="item.selfrate==''?'-----':item.selfrate + '%'"></yhm-manager-td-center>
            <yhm-manager-td-center :value="item.noselfrate==''?'-----':item.noselfrate + '%'"></yhm-manager-td-center>
            <yhm-manager-td-center v-if="item.type==''" value="------"></yhm-manager-td-center>
            <yhm-manager-td-psd v-else :value="item.type" :list="typeList"></yhm-manager-td-psd>
            <!--            <yhm-manager-td-center :value="item.rate+'%'"></yhm-manager-td-center>-->
            <!--            <yhm-manager-td-date :value="item.startDate"></yhm-manager-td-date>-->
            <!--            <yhm-manager-td-date :value="item.endDate"></yhm-manager-td-date>-->
            <yhm-manager-td-operate>
              <yhm-manager-td-operate-button @click="listView(item)" value="编辑" icon="i-btn-applicationSm" color="#be08e3"></yhm-manager-td-operate-button>
              <yhm-manager-td-operate-button @click="settleAccounts(item)" value="结账" icon="i-btn-applicationSm" color="#49a9ea"></yhm-manager-td-operate-button>
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
  import {managermixin} from '@/assets/manager.js'
  export default {
    name: 'pushRepairManager',
    mixins: [managermixin],
    data(){
      return{
        typeList:[],//有效日期
      }
    },
    methods:{
      add(){
        this.$dialog.OpenWindow({
          width: 1050,
          height: 720,
          url:'/pushRepairForm?isAdd=1',
          title:'添加推修公司',
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
      settleAccounts(item){
        this.$dialog.OpenWindow({
          width: 1050,
          height: 720,
          url:'/settleAccountsForm?id=' + item.unitID,
          title:'结账信息',
          closeCallBack:(data) =>{
            // if (data) {
            this.initPageData(false)
            // }
          }
        })
      },
      listView(item){
        this.$dialog.OpenWindow({
          width: 1050,
          height: 720,
          url:'/pushRepairForm?id=' + item.id,
          title:'查看推修公司信息',
          closeCallBack:(data) =>{
            // if (data) {
              this.initPageData(false)
            // }
          }
        })
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
          url:'/fix/fixCompany/getManager',
          data: params,
          all: (data) => {
            // 不管是不是初始化都需要执行的代码
            this.content = data.content
          },
          init: (data) => {
            this.typeList = data.typePsd.list
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
