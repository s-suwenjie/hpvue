<template>
  <div class="f_main">
    <yhm-view-body>
      <template #title>基本信息</template>
      <template #body>
        <yhm-view-control title="单据类型" content="库存盘点"></yhm-view-control>
        <yhm-view-control title="单据编号" :content="code"></yhm-view-control>
        <yhm-view-control title="盘点仓库" :content="warehouse" ></yhm-view-control>
        <yhm-view-control title="盘点日期" :content="dateTime"></yhm-view-control>
        <yhm-view-control title="经手人" :content="inventoryPersonName"></yhm-view-control>
        <yhm-view-control title="备注" :content="remark"></yhm-view-control>
        <!--        <yhm-view-control title="行车证信息"  category="3" type="smfiles"  :content="drivingLicense"></yhm-view-control>-->
        <!--<yhm-view-control title="启用状态" :content="enable" :psd="enableList"></yhm-view-control>-->

      </template>
    </yhm-view-body>

    <div class="f_split"></div>
    <yhm-view-tab>
      <template #tab>
        <yhm-view-tab-button :list="tabState" :index="0">盘点明细</yhm-view-tab-button>

        <yhm-radiofilter @initData="maintain('profitLossState')" title="盈亏状态" :content="profitLossState" style="margin: 5px 0;"></yhm-radiofilter>

      </template>
      <template #content>

        <yhm-view-tab-list :customize="true" :pager="true" v-show="tabState[0].select">
          <template #listHead>
            <yhm-managerth style="width: 40px" title="序号"></yhm-managerth>
            <yhm-managerth style="width:180px"title="规格型号"></yhm-managerth>
            <yhm-managerth style="width:80px" title="库存数量"></yhm-managerth>
            <yhm-managerth style="width:80px" title="盘点数量"></yhm-managerth>
            <yhm-managerth style="width:90px" title="盈亏数量"></yhm-managerth>
            <yhm-managerth title="备注"></yhm-managerth>

          </template>
          <template #listBody>
            <tr v-for="(item,index) in productDetails" :key="index" :class="{InterlacBg:index%2!==0}">
              <yhm-manager-td-center :value="index+1+''"></yhm-manager-td-center>
              <yhm-manager-td-center :value="item.model"></yhm-manager-td-center>
              <yhm-manager-td-center :value="item.quantity" ></yhm-manager-td-center>
              <yhm-manager-td-center :value="item.physicalInventory"></yhm-manager-td-center>
              <yhm-manager-td-center style="font-size: 16px" color="#603FE2" v-if="item.physicalInventory-item.quantity>=0"  :value="item.physicalInventory-item.quantity" ></yhm-manager-td-center>
              <yhm-manager-td-center style="font-size: 16px" color="#FF0000" v-else :value="item.physicalInventory-item.quantity" ></yhm-manager-td-center>
              <yhm-manager-td-center :value="item.remark"></yhm-manager-td-center>

            </tr>
          </template>
          <template #empty>
            <span class="m_listNoData" v-show="productDetails.length>0?false:true">暂时没有数据</span>
          </template>

        </yhm-view-tab-list>
      </template>
    </yhm-view-tab>
    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn>
        <!--<yhm-commonbutton v-if="isEdit" value="编辑"  icon="i-edit" :flicker="false" @call="editBtn()"></yhm-commonbutton>-->
      </template>
    </yhm-formoperate>
  </div>

</template>

<script>
  import { formmixin } from '@/assets/form.js'
  export default {
    name: 'stockInventoryView',
    mixins: [formmixin],
    data(){
      return{
        c:'',
        tabState:[{select:true}],
        productDetails:[],
        id:'',
        dateTime:'',//盘点日期
        code:'',//编号
        warehouse:'',
        warehouseID:'',//库位
        inventoryPersonName:'',
        inventoryPersonID:'',//盘点人
        profitLossState:{
          list:[
            {
              code:"",
              img:'',
              num:'0',
              showName:'盘亏'
            },
            {
              code:"",
              img:'',
              num:'1',
              showName:'盘盈'
            },
          ],
          value:'',
        },
        remark:'',
      }
    },
    methods:{
      maintain(){
        this.initData()
      },
      initData(){
        let params = {
          id: this.id,
          category:1,
          receptionid:this.profitLossState.value
        }
        this.init({
          url: '/stock/stockInventory/initForm',
          data: params,
          all: (data) => {
          },
          add: (data) => {
          },
          look: (data) => {
            /* 需要查看的数据 */
            this.inventoryPersonID=data.inventoryPersonID
            this.inventoryPersonName=data.inventoryPersonName
            this.dateTime=data.dateTime
            this.warehouseID=data.warehouseID
            this.warehouse=data.warehouse
            this.productDetails=data.productDetails
            this.remark=data.remark
            this.code=data.code
          }

        })
      }
    },
    created () {
      this.setQuery2Value("id")
      this.setQuery2Value("c")
      this.profitLossState.value=this.c

      this.initData()
    }
  }
</script>

<style scoped>

</style>
