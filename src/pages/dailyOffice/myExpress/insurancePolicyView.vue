<template>
  <div class="f_main f_main_customize mb16">
    <yhm-select-body :choose="false">
      <template #operate>
        <div v-show="showTipDbSelect" class="s_db_select" :style="{left:getLeft,top:getTop}">双击选择</div>
        <yhm-managersearch :value="searchStr" id="searchStr" @call="initPageData"></yhm-managersearch>
      </template>

      <template #listHead>
        <yhm-managerth width="40" title="选择"></yhm-managerth>
        <yhm-managerth title="投保日期" value="insuredDate"></yhm-managerth>
        <yhm-managerth title="车牌号" value="plate"></yhm-managerth>
        <yhm-managerth title="联系人" value="contactName"></yhm-managerth>
        <yhm-managerth  title="被保险人" value="beinsuredID"></yhm-managerth>
        <yhm-managerth title="保险公司" value="insuredUnit"></yhm-managerth>
        <yhm-managerth title="投保类型" value="insuredType"></yhm-managerth>

      </template>
      <template #listBody>
        <tr v-for="(item,index) in content"
            :class="{InterlacBg:index%2!=0}"
            :key="index"
            @click="selectEvent(item)"
            @dblclick="dblclickEvent(item)"
            @mousemove="mousemoveEvent"
            @mouseover="mouseoverEvent"
            @mouseout="mouseoutEvent">

          <yhm-manager-td-checkbox :no-click="false" :value="item"></yhm-manager-td-checkbox>
          <yhm-manager-td-date :value="item.insuredDate"></yhm-manager-td-date>
          <yhm-manager-td  :value="item.plate"></yhm-manager-td>
          <yhm-manager-td :value="item.contactName"></yhm-manager-td>
          <yhm-manager-td :value="item.beinsuredName"></yhm-manager-td>
          <yhm-manager-td :value="item.insuredUnitVal"></yhm-manager-td>
          <yhm-manager-td :value="item.insuredTypeVal"></yhm-manager-td>

        </tr>
      </template>

      <template #pager>
        <yhm-pagination :pager="pager" isPageSize="false" @initData="initPageData(false)"></yhm-pagination>
        <yhm-commonbutton class="mr0" icon="i-complete" value="确定" category="two" @call="selectConfirmEvent()"></yhm-commonbutton>
      </template>
    </yhm-select-body>
  </div>
</template>

<script>
  import { selectmixin } from '@/assets/select.js'
  export default {
    name: 'insurancePolicyView',
    mixins: [selectmixin],
    data(){
      return{
        contentTotal:[{
          count:'',
          money:''
        }],
        backupsTotal:[{
          count:'',
          money:''
        }],//备份的汇总数据
        content:[],
        iidList:[],
        money:'',
        index:'0',
        pager: {
          total: 0, // 总条数
          pageSize: 10, // 每页条数
          pageIndex: 1, // 当前页码
          selectCount: 0 // 选中条数
        },
        orderColumn:'insuredDate',
        order:'desc',
        otherPartyPersonID:'',
      }
    },
    methods:{
      //搜索
      initPageData (initValue) {
        this.setQuery2Value('otherPartyPersonID')
        let params = {}
        if (initValue) {
          params = {
            orderColumn:this.orderColumn,
            order:this.order,
            userID:this.otherPartyPersonID
          }
        } else {
          params = {
            orderColumn:this.orderColumn,
            order:this.order,
            userID:this.otherPartyPersonID
          }
        }
        this.init({
          initValue:initValue,
          url: '/Insurance/getCustomerPolicyManager',
          data:params,
          all:(data) =>{
            this.content = data.content.content
            this.pager.total=data.content.count
          },
          init:(data)=>{
            //初始化时需要执行的代码
            // 这边初始化筛选信息
          }
        })
      },
      created () {
        this.setQuery2Value('otherPartyPersonID')
      }
    }
  }
</script>

<style scoped>

</style>
