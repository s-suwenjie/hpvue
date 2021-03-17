<template>
  <div class="f_main">
    <yhm-view-tab>
      <template #tab>
        <yhm-view-tab-button :list="tabState" :index="0">详细信息</yhm-view-tab-button>
      </template>

      <template #content>
        <yhm-view-tab-list :customize="true">
          <template #listHead>
            <yhm-managerth style="width: 40px" title="查看"></yhm-managerth>
            <yhm-managerth title="账户"></yhm-managerth>
            <yhm-managerth title="交易对象"></yhm-managerth>
            <yhm-managerth title="交易日期"></yhm-managerth>
            <yhm-managerth title="方向"></yhm-managerth>
            <yhm-managerth title="事由"></yhm-managerth>
            <yhm-managerth title="收支金额"></yhm-managerth>
          </template>
          <template #listBody>
            <tr v-for="(item,index) in details" :key="index">
              <yhm-manager-td-look  @click="listView(item)"></yhm-manager-td-look>
              <yhm-manager-td :value="item.bankName+item.account"></yhm-manager-td>
              <yhm-manager-td :value="item.otherName"></yhm-manager-td>
              <yhm-manager-td :value="item.cccurDate"></yhm-manager-td>
              <yhm-manager-td-direction :direction="item.direction" :value="item.direction" class="dfJcc" :dir-val="false"></yhm-manager-td-direction>
              <yhm-manager-td :value="item.subject"></yhm-manager-td>
              <yhm-manager-td-money :value="item.money"></yhm-manager-td-money>
            </tr>
          </template>
          <template #empty>
            <span class="m_listNoData" v-show="details.length==0">暂时没有数据</span>
          </template>

          <template #pager>
            <yhm-pagination :pager="pager" is-page-size="false" @initData="initData"></yhm-pagination>
          </template>

        </yhm-view-tab-list>
      </template>
    </yhm-view-tab>
  </div>
</template>

<script>
  import { viewmixin } from '@/assets/view.js'
  export default {
    name: 'bankDetailAnalyView',
    mixins: [viewmixin],
    data(){
      return{
        subjectID:'',
        startDate:'',
        endDate:'',
        direction:'',
        details:[],
        tabState:[{select:true}],
        pager: { // 分页数据
          total: '', // 数据总条数
          pageSize: 10, // 单页数据条数
          pageIndex: 1, // 当前页码
          selectCount: 0 // 选中数据的条数
        },
      }
    },
    created () {
      this.setQuery2Value('subjectID')
      this.setQuery2Value('startDate')
      this.setQuery2Value('endDate')
      this.setQuery2Value('direction')
      this.initData()
    },
    methods:{
      listView(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '750',
          url: '/unitDetailView?id=' + item.id ,
          title: '查看收支明细信息',
          closeCallBack: (data)=>{
          }
        })
      },
      initData(){
        let params={
          subjectID:this.subjectID,
          startDate:this.startDate,
          endDate:this.endDate,
          direction:this.direction,
          pageIndex: this.pager.pageIndex,
          pageSize: this.pager.pageSize,
        }
        this.ajaxJson({
          url: '/fin/getUnitOrPersonBankDetail',
          data: params,
          call: (data) => {

            this.details=data.content
            this.pager.total=data.count
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
