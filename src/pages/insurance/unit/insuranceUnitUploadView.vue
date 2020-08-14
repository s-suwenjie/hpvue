<template>
  <div class="f_main">
    <yhm-view-body>
      <template #title>基本信息</template>
      <template #body>
<!--        <yhm-form-date title="对账单" subtitle="日期"   :value="monthsDate" id="monthsDate " position="t"  rule="R0000"></yhm-form-date>-->
        <yhm-view-control title="日期" :content="monthsDate"></yhm-view-control>
<!--        <yhm-form-date title="对账单" subtitle="结束日期"   :value="endDate" id="endDate " position="t"  rule="R0000"></yhm-form-date>-->
        <yhm-view-control category="3" title="行车证" type="files" :content="fileList"></yhm-view-control>
      </template>
    </yhm-view-body>
    <div class="f_split"></div>
    <div class="f_split"></div>
    <yhm-form-list-edit>
      <template #title>账单信息</template>
      <template #listHead>
        <yhm-managerth style="width:38px" title="序号"></yhm-managerth>
        <yhm-managerth title="单号"></yhm-managerth>
        <yhm-managerth style="width: 100px" title="对账单金额"></yhm-managerth>
        <yhm-managerth style="width: 100px" title="实际金额"></yhm-managerth>
        <yhm-managerth style="width: 100px" title="车牌号"></yhm-managerth>
        <yhm-managerth style="width: 100px" title="被保险人"></yhm-managerth>
        <yhm-managerth style="width: 100px" title="联系人"></yhm-managerth>
        <yhm-managerth style="width: 100px" title="状态"></yhm-managerth>
      </template>
      <template #listBody >
        <tr v-for="(item,index) in content" :key="index" :class="{InterlacBg:index%2!==0}" >
          <yhm-manager-td-center  class="admin" :value="index+1+''"></yhm-manager-td-center>
          <yhm-manager-td-center  class="admin" :value="item.number"></yhm-manager-td-center>
          <yhm-manager-td-rgt  class="admin" :value="item.money+''"></yhm-manager-td-rgt>
          <yhm-manager-td-rgt class="admin" :value="item.businessMoney==0.00?item.forceMoney+'':item.businessMoney+''"  ></yhm-manager-td-rgt>
          <yhm-manager-td-center  class="admin" :value="item.plate"></yhm-manager-td-center>
          <yhm-manager-td-center  class="admin" :value="item.beinsuredName"></yhm-manager-td-center>
          <yhm-manager-td-center  class="admin" :value="item.contactName"></yhm-manager-td-center>
          <yhm-manager-td-state class="admin" :value="item.stateVal" :state-color="item.stateColor" :state-img="item.stateImg"></yhm-manager-td-state>
        </tr>
      </template>
      <template #empty>
        <span class="m_listNoData" v-show="content.length!=0?false:true">暂时没有数据</span>
      </template>
    </yhm-form-list-edit>

  </div>
</template>

<script>
  import { viewmixin } from '@/assets/view.js'
  export default {
    name: 'insuranceUnitUploadView',
    mixins: [viewmixin],
    data(){
      return{
        monthsDate:'',
        content:[],
        endDate:'',
        fileList:[]
      }
    },
    methods:{

      initPage(){
        //this.monthsDate=this.monthsDate.slice(0,8)+'-01'
        let params={
          id:this.id,
          monthsDate:this.monthsDate.slice(0,8)+'-01' +' 00:00:00',
          endDate:this.endDate+' 23:59:59',
          unitID:this.unitID
        }

        this.ajaxJson({
          url: '/Basic/UnitInSelectManager',
          data: params,
          call: (data) => {
            this.content=data.details
            this.fileList = data.files
          }
        })
      },
    },
    created () {
      this.setQuery2Value('monthsDate')
      this.setQuery2Value('endDate')
      this.setQuery2Value('unitID')
      this.initPage()
    }
  }
</script>

<style scoped>
  .admin{
    border: 1px solid #ccc;
  }
</style>
