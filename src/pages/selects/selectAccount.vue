<template>
  <div class="main">
    <yhm-select-body  :choose="false">
      <!--导航条-->
      <template #navigation>基本信息</template>
      <template #operate>
        <div v-show="showTipDbSelect" class="s_db_select" :style="{left:getLeft,top:getTop}">双击选择</div>
        <yhm-managersearch :value="searchStr" id="searchStr" @call="initPageData(false)"></yhm-managersearch>
      </template>

      <!--数据表头-->
      <template #listHead>
        <yhm-managerth style="width: 40px;" title="选择"></yhm-managerth>
        <yhm-managerth style="width: 200px" title="账户" value="bankName"></yhm-managerth>
        <yhm-managerth title="交易对象" value="otherName" ></yhm-managerth>
        <yhm-managerth style="width: 120px;" title="交易日期" value="cccurDate"></yhm-managerth>
        <yhm-managerth style="width: 80px" title="方向" value="direction"></yhm-managerth>
        <yhm-managerth style="width: 80px;" title="事由" value="subject"></yhm-managerth>
        <yhm-managerth style="width: 70px" title="金额" value="money"></yhm-managerth>
        <yhm-managerth  title="备注" value="remark"></yhm-managerth>
      </template>

      <!--数据明细-->
      <template #listBody>
        <tr v-for="(item,index) in content"
            :class="{InterlacBg:index%2!=0}"
            :key="item.id"
            @click="selectEvent(item)"
            @dblclick="dblclickEvent(item)"
            @mousemove="mousemoveEvent"
            @mouseover="mouseoverEvent"
            @mouseout="mouseoutEvent">
          <yhm-manager-td-checkbox :no-click="false" :value="item" ></yhm-manager-td-checkbox>
          <yhm-manager-td :value="item.bankName + item.account + item.nature" v-if="item.bankName===''"  :tip="true"></yhm-manager-td>
          <yhm-manager-td-center :tip="true" :value="item.bankName + item.account + item.nature+''" v-else ></yhm-manager-td-center>
          <yhm-manager-td :is-html="true" :value="item.otherName" v-if="item.otherName==''"  :tip="true"></yhm-manager-td>
          <yhm-manager-td-center :is-html="true" :tip="true" :value="item.otherName" v-else></yhm-manager-td-center>
          <yhm-manager-td-date :value="item.cccurDate"></yhm-manager-td-date>
          <yhm-manager-td-direction :direction="item.direction" class="dfJcc" :value="item.direction" :dir-val="false"></yhm-manager-td-direction>
          <yhm-manager-td :value="item.subject"></yhm-manager-td>
          <yhm-manager-td-money :value="item.money+''"></yhm-manager-td-money>
          <yhm-manager-td :value="item.remark" :tip="true" node-class-name="main" tip-type="r"></yhm-manager-td>
        </tr>
      </template>

      <!--数据空提示-->
      <template #empty>
        <span class="m_listNoData" v-show="content.length!='0'?false:true">暂时没有数据</span>
      </template>
      <template #pager>
        <yhm-pagination is-not-right :pager="pager" isPageSize="false" @initData="initPageData(false)"></yhm-pagination>
        <yhm-commonbutton  icon="i-complete" value="确定"   @call="selectConfirmEvent()"></yhm-commonbutton>
      </template>

    </yhm-select-body>
  </div>
</template>

<script>
  import { selectmixin } from '@/assets/select.js'
  export default {
    name: 'selectAccount',
    mixins: [selectmixin],
    data(){
      return{
        content:[],
        pager: {
          total: 0, // 总条数
          pageSize: 10, // 每页条数
          pageIndex: 1, // 当前页码
          selectCount: 0 ,// 选中条数
        },
        orderColumn:'cccurDate',
        order:'asc'
      }
    },
    methods:{
      //搜索
      initPageData (initValue) {
        let params = {}
        if (initValue) {
          params = {
            nameID:this.nameID,
            orderColumn:this.orderColumn,
            order:this.order,
            subjectID:this.subjectID,
            direction:this.direction,
            startDate:this.startDate+' 00:00:00',
            endDate:this.endDate+' 23:59:59',
          }
        } else {
          params = {
            nameID:this.nameID,
            orderColumn:this.orderColumn,
            order:this.order,
            subjectID:this.subjectID,
            direction:this.direction,
            startDate:this.startDate+' 00:00:00',
            endDate:this.endDate+' 23:59:59',
          }
        }
        this.init({
          initValue:initValue,
          url: '/Insurance/getBillingMakeUpAccount',
          data:params,
          all:(data) =>{
          },
          init:(data)=>{
            //初始化时需要执行的代码
            // 这边初始化筛选信息
          }
        })
      },
    },
    created () {
      this.setQuery2Value('subjectID')
      this.setQuery2Value('direction')
      this.setQuery2Value('startDate')
      this.setQuery2Value('endDate')
      this.setQuery2Value('nameID')
    }
  }
</script>

<style scoped>

</style>
