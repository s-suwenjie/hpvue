<template>
  <div class="f_main f_main_customize mb16">
    <yhm-select-body :choose="false" >
      <template #operate>
<!--        <yhm-commonbutton value="添加" icon="btnAdd" :flicker="true" @call="add()"></yhm-commonbutton>-->
        <div v-show="showTipDbSelect" class="s_db_select" :style="{left:getLeft,top:getTop}">双击选择</div>
        <yhm-managersearch :value="searchStr" id="searchStr" @call="initData"></yhm-managersearch>
<!--        <yhm-radiofilter  @initData="initPageData(false)" title="状态" style="margin: 5px 0;" :content="pendingstateList"></yhm-radiofilter>-->

      </template>
      <template #listHead>
        <yhm-managerth-check v-if="selectType === '1'" is-select :check="allCheck" style="width: 40px;"></yhm-managerth-check>
        <yhm-managerth v-if="selectType === '0'" width="40" title="选择"></yhm-managerth>
        <yhm-managerth title="接待日期"></yhm-managerth>
        <yhm-managerth width="180" title="工单号"></yhm-managerth>
        <yhm-managerth title="车牌号"></yhm-managerth>
        <!--            <yhm-managerth title="送修人"></yhm-managerth>-->
        <yhm-managerth width="70" title="费率类型"></yhm-managerth>
        <yhm-managerth width="70" title="待结状态"></yhm-managerth>
        <yhm-managerth title="预计推送费"></yhm-managerth>
        <yhm-managerth title="已产生营业额"></yhm-managerth>
<!--        <yhm-managerth title="工单金额"></yhm-managerth>-->
      </template>
      <template #listBody>
        <tr v-for="(item,index) in content" :key="index"
            @click="selectEvent(item)"
            @dblclick="dblclickEvent(item)"
            @mousemove="mousemoveEvent"
            @mouseover="mouseoverEvent"
            @mouseout="mouseoutEvent"
            :class="{InterlacBg:index%2!==0}">
          <yhm-manager-td-checkbox :value="item" :no-click="false"></yhm-manager-td-checkbox>
          <yhm-manager-td-date :value="item.visitDate"></yhm-manager-td-date>
          <yhm-manager-td-center :value="item.code" ></yhm-manager-td-center>
          <yhm-manager-td :value="item.carName" type="vehicle"></yhm-manager-td>
          <!--              <yhm-manager-td-center :value="item.contactPerson"></yhm-manager-td-center>-->
          <yhm-manager-td-center :value="item.type=='0'?'自保':'非自保'"></yhm-manager-td-center>
          <yhm-manager-td-center :color="item.pendingstate=='0'?'':'#00bb68'" :value="item.pendingstate=='0'?'待结账':'已结账'"></yhm-manager-td-center>
          <yhm-manager-td-money style="color:#2193B0" :value="item.pending==''?'0':item.pending"></yhm-manager-td-money>
          <yhm-manager-td-money style="color:#f00" :value="item.pendingmoney==''?'0':item.pendingmoney"></yhm-manager-td-money>
<!--          <yhm-manager-td-money style="color:#fd6802" :value="item.expend==''?'0':item.expend"></yhm-manager-td-money>-->
        </tr>
      </template>

      <template #empty>
        <span class="m_listNoData" v-show="content.length === 0">暂时没有数据</span>
      </template>
      <template #pager>
        <yhm-pagination is-not-right :pager="pager" isPageSize="false" @initData="initPageData(false)"></yhm-pagination>
        <div style="width: 100%;display: flex;justify-content: center;align-items: center;margin-top: 10px;">
          <yhm-commonbutton class="mr0" icon="i-complete" value="确定" category="two" @call="selectConfirmEvent()"></yhm-commonbutton>

        </div>
      </template>
    </yhm-select-body>
  </div>
</template>

<script>
  import { selectmixin } from '@/assets/select.js'
  export default {
    name: 'selectPushRepair',
    mixins: [selectmixin],
    data(){
      return{
        selectType:'1',
        pager: { // 分页数据
          total: 0, // 数据总条数
          pageSize: 10, // 单页数据条数
          pageIndex: 1, // 当前页码
          selectCount: 0 // 选中数据的条数
        },
        content:[],
        pendingstateList:{
          list:[

          ],
          value:'0'
        }
      }
    },
    methods:{
      initPageData (initialize) {
        let params = {}
        if(initialize){
          params = {
            companyID:this.companyID,
            pageSize:this.pager.pageSize,
            pageIndex:this.pager.pageIndex,
            pendingstate:this.pendingstateList.value,
            stateStr:'123'//是否过滤接待单 不为空时过滤
          }
        }else{
          params = {
            companyID:this.companyID,
            pageSize:this.pager.pageSize,
            pageIndex:this.pager.pageIndex,
            // startDateStr:this.startDateCustom,
            // endDateStr:this.endDateCustom,
            pendingstate:this.pendingstateList.value,
            stateStr:'123'//是否过滤接待单 不为空时过滤
          }
        }
        this.ajaxJson({
          url: '/fix/fixCompanyOrder/queryByCompanyIDForFixreception',
          data:params,
          call: (data) => {
            this.content = data.content
            this.pager.total = data.count

            this.type = data.fixCompany.type//结算类型
            this.typeList = data.fixCompany.typePsd.list//计算类型

            if(initialize){
              this.pendingstateList = data.pendingstatePsd
            }

            this.createName = data.fixCompany.createName
            this.insertDate = data.fixCompany.insertDate
            this.updateName = data.fixCompany.updateName
            this.updateDate = data.fixCompany.updateDate


          }
        })
      }
    },
    created () {
      this.setQuery2Value('companyID')
    }
  }
</script>

<style scoped>

</style>
