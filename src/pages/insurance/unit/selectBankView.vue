<template>
  <div>
    <yhm-managerpage category="1" mainWidth="1050" mainHeight="690" menu-tab-width="1014" :total-width="true"  :total-table="true">
      <!--导航条-->
      <template #navigation>基本信息</template>
      <template #choose>
        <div style="padding-bottom: 20px;width: 1014px;margin: 0 auto;display: flex;">
          <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initPageData(false)"></yhm-managersearch>
        </div>
      </template>

      <!--数据表头-->
      <template #listHead>
        <yhm-managerth style="width: 40px;" title="选择"></yhm-managerth>
        <yhm-managerth style="width: 40px;" title="查看"></yhm-managerth>
        <yhm-managerth style="width: 300px" title="账户" value="bankName"></yhm-managerth>
        <yhm-managerth title="交易对象" value="otherName" ></yhm-managerth>
        <yhm-managerth style="width: 120px;" title="交易日期" value="cccurDate"></yhm-managerth>
        <yhm-managerth style="width: 80px" title="方向" value="direction"></yhm-managerth>
        <yhm-managerth style="width: 120px;" title="事由" value="subject"></yhm-managerth>
        <yhm-managerth style="width: 120px" title="总金额" value="money"></yhm-managerth>
        <yhm-managerth style="width: 120px" title="核销金额" value="useMoney"></yhm-managerth>

        <!--        <yhm-managerth style="width: 330px" title="备注" value="remark"></yhm-managerth>-->
      </template>

      <!--数据明细-->
      <template #listBody>
        <tr :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]" v-for="(item,index) in content" :key="index">
          <yhm-manager-td-checkbox :value="item" @call="checkboxEvent"></yhm-manager-td-checkbox>
          <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>
          <yhm-manager-td :value="item.bankName + item.account + item.nature" v-if="item.bankName===''"  :tip="true"></yhm-manager-td>
          <yhm-manager-td-center :tip="true" :value="item.bankName + item.account + item.nature" v-else ></yhm-manager-td-center>
          <yhm-manager-td :is-html="true" :value="item.otherName" v-if="item.otherName==''"  :tip="true"></yhm-manager-td>
          <yhm-manager-td-center :is-html="true" :tip="true" :value="item.otherName" v-else></yhm-manager-td-center>
          <yhm-manager-td-date :value="item.cccurDate"></yhm-manager-td-date>
          <yhm-manager-td-direction :direction="item.direction" class="dfJcc" :value="item.direction" :dir-val="false"></yhm-manager-td-direction>
          <yhm-manager-td :value="item.subject"></yhm-manager-td>
          <yhm-manager-td-money :value="item.money+''"></yhm-manager-td-money>
          <yhm-manager-td-money :value="item.useMoney+''"></yhm-manager-td-money>
        </tr>
      </template>
      <!--数据空提示-->
      <template #empty>
        <span class="m_listNoData" v-show="content.length!='0'?false:true">暂时没有数据</span>
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
    name: 'selectBankView',
    mixins: [managermixin],
    data(){
      return{
        id:'',
        pageSize:10
      }
    },
    methods:{
      //搜索
      initPageData (initValue) {
        this.setQuery2Value("ownerID")

        let params = {}
        if (initValue) {
          params = {
            ownerID:this.ownerID,

          }
        } else {
          params = {
            ownerID:this.ownerID,
          }
        }
        this.init({
          initValue:initValue,
          url: '/Basic/getBankAllVue',
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
  }
</script>

<style scoped>

</style>
