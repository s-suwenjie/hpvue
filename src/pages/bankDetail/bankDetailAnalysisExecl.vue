<template>
  <div class="f_main mb35">
    <yhm-view-tab style="width: 1400px;top:100px">
      <template #content>
        <yhm-view-tab-list>
          <template #listHead>
            <yhm-managerth style="width: 200px" title="项目"></yhm-managerth>
            <yhm-managerth style="width: 120px" title="1月"></yhm-managerth>
            <yhm-managerth style="width: 120px" title="2月"></yhm-managerth>
            <yhm-managerth style="width: 120px" title="3月"></yhm-managerth>
            <yhm-managerth style="width: 120px" title="4月"></yhm-managerth>
            <yhm-managerth style="width: 120px" title="5月"></yhm-managerth>
            <yhm-managerth style="width: 120px" title="6月"></yhm-managerth>
            <yhm-managerth style="width: 120px" title="7月"></yhm-managerth>
            <yhm-managerth style="width: 120px" title="8月"></yhm-managerth>
            <yhm-managerth style="width: 120px" title="9月"></yhm-managerth>
            <yhm-managerth style="width: 120px" title="10月"></yhm-managerth>
            <yhm-managerth style="width: 120px" title="11月"></yhm-managerth>
            <yhm-managerth style="width: 120px" title="12月"></yhm-managerth>
            <yhm-managerth style="width: 140px" title="合计"></yhm-managerth>
          </template>
          <template #listBody>
            <tr v-for="(item,index) in bankDetailList" :class="{InterlacBg:index%2!=0}" :style="{background:item.color}" :key="index">
              <yhm-manager-td :value="item.num"></yhm-manager-td>
              <yhm-manager-td-money :value="item.month1"></yhm-manager-td-money>
              <yhm-manager-td-money :value="item.month2"></yhm-manager-td-money>
              <yhm-manager-td-money :value="item.month3"></yhm-manager-td-money>
              <yhm-manager-td-money :value="item.month4"></yhm-manager-td-money>
              <yhm-manager-td-money :value="item.month5"></yhm-manager-td-money>
              <yhm-manager-td-money :value="item.month6"></yhm-manager-td-money>
              <yhm-manager-td-money :value="item.month7"></yhm-manager-td-money>
              <yhm-manager-td-money :value="item.month8"></yhm-manager-td-money>
              <yhm-manager-td-money :value="item.month9"></yhm-manager-td-money>
              <yhm-manager-td-money :value="item.month10"></yhm-manager-td-money>
              <yhm-manager-td-money :value="item.month11"></yhm-manager-td-money>
              <yhm-manager-td-money :value="item.month12"></yhm-manager-td-money>
              <yhm-manager-td-money :value="item.total"></yhm-manager-td-money>
            </tr>
          </template>
          <template #empty>
          <span class="m_listNoData"  v-show="bankDetailList.length>=1?false:true">暂时没有数据</span>
          </template>
        </yhm-view-tab-list>

      </template>
    </yhm-view-tab>
    <div style="height: 30px;"></div>
    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn>
        <yhm-commonbutton  @call="adoptEvent" value="导出execl" icon="i-btn-applicationSm" color="#49a9ea" :flicker="true"></yhm-commonbutton>
      </template>
    </yhm-formoperate>
  </div>
</template>

<script>
  import { accMul, accAdd, guid, formatDate, number2chinese,formatTime} from '@/assets/common.js'
  import { formmixin } from '@/assets/form.js'
  export default {
    name: 'bankDetailAnalysisExecl',
    mixins: [formmixin],
    data () {
      return {
        bankDetailList:[],
        direction:'1',
        startDate: '',
        endDate: '',
      }
    },
    methods: {
      adoptEvent(){//+ "&startDate="+this.startDate+"&endDate="+this.endDate
        let date=new Date(this.startDate)
        let a=this.direction+"!"+date.getFullYear()
        window.open("/Fin/downloadYearFile?direction="+a);
      },
      initData() {
        this.ajaxJson({
          url: '/Fin/getBankDetailAnalysisExeclInformation',
          data: {
            direction:this.direction,
            startDate:this.startDate,
            endDate:this.endDate,
          },
          call: (data) => {
            if (data) {
              this.bankDetailList=data
            }
          }
        })
      }
    },
    created () {
      this.setQuery2Value('direction')
      this.setQuery2Value('startDate')
      this.setQuery2Value('endDate')
      this.initData()
    }
  }
</script>

<style scoped>

</style>
