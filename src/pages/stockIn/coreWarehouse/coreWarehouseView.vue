<template>
  <div class="f_main">
    <yhm-view-body>
      <template #title>基本信息</template>
      <template #body>
        <yhm-view-control title="适用车型" :content="model"></yhm-view-control>
        <yhm-view-control title="商品名称" :content="parts" ></yhm-view-control>
        <yhm-view-control title="规格型号" :content="specifications" ></yhm-view-control>
        <yhm-view-control title="库存数量" :content="number"></yhm-view-control>


      </template>
    </yhm-view-body>

    <div class="f_split"></div>
    <yhm-view-tab>
      <template #tab>
        <yhm-view-tab-button :list="tabState" :index="0" >入库详情明细</yhm-view-tab-button>
        <yhm-view-tab-button :list="tabState" :index="1" >出库详情明细</yhm-view-tab-button>
      </template>
      <template #content>

        <yhm-view-tab-list :customize="true" :pager="true" v-show="tabState[0].select">
          <template #listHead>
            <yhm-managerth style="width: 40px" title="序号"></yhm-managerth>
            <yhm-managerth title="入库日期"></yhm-managerth>
            <yhm-managerth title="入库人员"></yhm-managerth>
            <yhm-managerth title="车牌号"></yhm-managerth>
            <yhm-managerth title="工单号"></yhm-managerth>
            <yhm-managerth title="入库数量"></yhm-managerth>
            <yhm-managerth title="操作"></yhm-managerth>
          </template>
          <template #listBody>
            <tr v-for="(item,index) in discountList" :key="index" :class="{InterlacBg:index%2!==0}">
              <yhm-manager-td-center   :value="index+1+''"></yhm-manager-td-center>
              <yhm-manager-td-date  :value="item.dateTime"></yhm-manager-td-date>
              <yhm-manager-td-center  :value="item.operator"></yhm-manager-td-center>
              <yhm-manager-td-center  :value="item.vehicle"></yhm-manager-td-center>
              <yhm-manager-td-center  :value="item.code"></yhm-manager-td-center>
              <yhm-manager-td-center  :value="item.recoveryQuantity"></yhm-manager-td-center>
              <yhm-manager-td-operate>
                <yhm-manager-td-operate-button  value="出库操作" icon="im_copy" color="#FF0000"></yhm-manager-td-operate-button>
              </yhm-manager-td-operate>
            </tr>
          </template>
          <template #empty>
            <span class="m_listNoData" v-show="discountList.length>0?false:true">暂时没有数据</span>
          </template>
          <template #pager>
            <yhm-pagination :pager="pager"  :is-select-info="false" @initData="initData()"></yhm-pagination>
          </template>
        </yhm-view-tab-list>
        <yhm-view-tab-list :customize="true" :pager="true" v-show="tabState[1].select">
          <template #listHead>
            <yhm-managerth style="width: 40px" title="序号"></yhm-managerth>
            <yhm-managerth title="入库日期"></yhm-managerth>
            <yhm-managerth title="入库人员"></yhm-managerth>
            <yhm-managerth title="车牌号"></yhm-managerth>
            <yhm-managerth title="工单号"></yhm-managerth>
            <yhm-managerth title="入库数量"></yhm-managerth>
          </template>
          <template #listBody>
            <tr v-for="(item,index) in discountList" :key="index" :class="{InterlacBg:index%2!==0}">
              <yhm-manager-td-center   :value="index+1+''"></yhm-manager-td-center>
              <yhm-manager-td-date  :value="item.dateTime"></yhm-manager-td-date>
              <yhm-manager-td-center  :value="item.operator"></yhm-manager-td-center>
              <yhm-manager-td-center  :value="item.vehicle"></yhm-manager-td-center>
              <yhm-manager-td-center  :value="item.code"></yhm-manager-td-center>
              <yhm-manager-td-center  :value="item.recoveryQuantity"></yhm-manager-td-center>

            </tr>
          </template>
          <template #empty>
            <span class="m_listNoData" v-show="discountList.length>0?false:true">暂时没有数据</span>
          </template>

        </yhm-view-tab-list>
      </template>


    </yhm-view-tab>

    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn>
        <yhm-commonbutton v-if="isEdit" value="编辑"  icon="i-edit" :flicker="false" @call="editBtn()"></yhm-commonbutton>
      </template>
    </yhm-formoperate>
  </div>

</template>

<script>
  import { viewmixin } from '@/assets/view.js'
  export default {
    name: 'coreWarehouseView',
    mixins: [viewmixin],
    data(){
      return{
        tabState:[{select:true},{select:false}],
        model:'',
        parts:'',
        specifications:'',
        number:'',

        discountList:[]
      }
    },
    methods:{
      initData(){
        let params = {
          id: this.id,
          pageSize: this.pager.pageSize, // 单页数据条数
          pageIndex: this.pager.pageIndex, // 当前页码
        }

        this.ajaxJson({
          url: '/dailyoffice/corcRegistration/getCoreWarehouseByID',
          data: params,
          call: (data) => {

            this.id=data.id
            this.model=data.model
            this.parts=data.parts
            this.specifications=data.specifications
            this.number=data.number
            this.discountList=data.list
            this.pager.total = data.count
          }
        })
      }
    },
    created () {
      this.setQuery2Value("id")
      this.initData()
    }
  }
</script>

<style scoped>

</style>
