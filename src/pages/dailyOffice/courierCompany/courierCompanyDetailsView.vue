<template>
  <div class="f_main">
    <yhm-view-body>
      <template #title>基本信息</template>
      <template #body>
        <yhm-view-control title="日期" :content="startDate+'----'+endDate"></yhm-view-control>
      </template>
    </yhm-view-body>
    <div class="f_split"></div>
    <div class="f_split"></div>
    <div class="v_relative">
      <yhm-table-tip node-class-name="v_relative" :show="tableTip" :content="tableTipInfo" :column="tableTipColumnInfo" :mouse-control="tableTipControl"></yhm-table-tip>
      <yhm-form-list-edit style="position: relative;">

        <template #title>
          账单信息
        </template>
        <template #listHead>
          <yhm-managerth style="width:38px" title="序号"></yhm-managerth>
          <yhm-managerth style="width:110px" title="单号"></yhm-managerth>
          <yhm-managerth style="width:80px" title="经办人"></yhm-managerth>
          <yhm-managerth style="width:80px" title="对方人员"></yhm-managerth>
          <yhm-managerth  title="地址"></yhm-managerth>
          <yhm-managerth style="width:50px" title="金额"></yhm-managerth>
          <yhm-managerth style="width:150px" title="内容"></yhm-managerth>

        </template>
        <template #listBody >
          <tr v-for="(item,index) in content" :key="index" :class="{InterlacBg:index%2!==0}" >
            <!--{{item.money > (item.businessMoney==0.00?item.forceMoney:item.businessMoney)?'1':'2'}}-->
            <yhm-manager-td-center  class="admin" :value="index+1+''"></yhm-manager-td-center>
            <yhm-manager-td-center   :value="item.code"></yhm-manager-td-center>
            <yhm-manager-td-center   :value="item.wePersonName"></yhm-manager-td-center>
            <yhm-manager-td-center   :value="item.otherPartyPersonName"></yhm-manager-td-center>
            <yhm-manager-td   :value="item.address"></yhm-manager-td>
            <yhm-manager-td-center   :value="item.amount"></yhm-manager-td-center>
            <yhm-manager-td-center   :value="item.itemContent"></yhm-manager-td-center>

          </tr>
        </template>

        <template #empty>
          <span class="m_listNoData" v-show="content.length!=0?false:true">暂时没有数据</span>
        </template>
      </yhm-form-list-edit>
    </div>
  </div>
</template>

<script>
  import { viewmixin } from '@/assets/view.js'
  export default {
    name: 'courierCompanyDetailsView',
    mixins: [viewmixin],
    data(){
      return{

        content:[],
        ownerID:'',
        startDate:'',
        endDate:'',

      }
    },
    methods:{
      initPage(){
        //this.monthsDate=this.monthsDate.slice(0,8)+'-01'
        let params={
          ownerID:this.ownerID,
          startDate:this.startDate,
          endDate:this.endDate,
        }

        this.ajaxJson({
          url: '/dailyoffice/expressCompany/getExpressDetailAlready',
          data: params,
          call: (data) => {
            this.content=data.content
          }
        })
      },
    },
    created () {
      this.setQuery2Value('ownerID')
      this.setQuery2Value('startDate')
      this.setQuery2Value('endDate')
      this.initPage()
    }
  }
</script>

<style scoped>

</style>
