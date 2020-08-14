<template>
    <div class="f_main">
      <yhm-view-body>
        <template #title>入库明细</template>
        <template #body>
          <yhm-view-control title="商品类型" content="1"  :psd="isPrettyCashOffList"></yhm-view-control>
          <yhm-view-control title="入库编号" :content="code"></yhm-view-control>
          <yhm-view-control title="车型" :content="code"></yhm-view-control>
          <yhm-view-control  title="入库人员" v-if="noPrettyCashMoney" :content="prettyCashMoney" type="money"></yhm-view-control>
        </template>
      </yhm-view-body>
      <div class="f_split"></div>
      <yhm-view-tab>
        <template #tab>
          <yhm-view-tab-button :list="tabState" :index="0">报销明细</yhm-view-tab-button>
        </template>
        <yhm-view-tab-list :customize="true"  v-show="tabState[0].select" >
          <template #listHead>
            <yhm-managerth style="width: 38px" title="查看"></yhm-managerth>
            <yhm-managerth title="商品名称"></yhm-managerth>
            <yhm-managerth style="width: 120px" title="规格型号"></yhm-managerth>
            <yhm-managerth style="width: 120px" title="数量"></yhm-managerth>
            <yhm-managerth style="width: 180px;" title="价格"></yhm-managerth>
            <yhm-managerth style="width: 120px;" title="总价"></yhm-managerth>
            <yhm-managerth style="width: 80px;" title="含税单价"></yhm-managerth>
            <yhm-managerth style="width: 120px;" title="含税总价"></yhm-managerth>
          </template>
          <template #listBody>
            <tr v-for="(item,index) in detailList" :class="[{InterlacBg:index%2!=0}]" :key="item.id">
              <yhm-manager-td-look @click="listView(item.id)"></yhm-manager-td-look>
              <yhm-manager-td :value="item.product"></yhm-manager-td>
              <yhm-manager-td :value="item.model"></yhm-manager-td>
              <yhm-manager-td-center :value="item.quantity+''"></yhm-manager-td-center>
              <yhm-manager-td-money :value="item.price+''"></yhm-manager-td-money>
              <yhm-manager-td-money :value="item.totalPrice+''"></yhm-manager-td-money>
              <yhm-manager-td-money :value="item.priceTax+''"></yhm-manager-td-money>
              <yhm-manager-td-money :value="item.totalPriceTax+''"></yhm-manager-td-money>
            </tr>
          </template>
        </yhm-view-tab-list>
      </yhm-view-tab>
      <yhm-formoperate :createName="createName"  :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      </yhm-formoperate>
    </div>
</template>

<script>
  import { formmixin } from '@/assets/form.js'

  export default {
    name: 'stockInView',
    mixins: [formmixin],
    data(){
      return{
        tabState:[{select:true}],
        detailList:[],
        categoryList:[],
        category:'',
        applicableModelsList:[],
        applicableModels:'',
        code:'',
        workDate:'',
        wareHouserId:'',
        wareHouser:'',
        maxWorkDate:'',

      }
    },
    methods:{
      //console
      initData(){
        let params = {
            id:this.id
        }
        this.init({
          url: '/stock/stockIn/initForm',
          data:params,
          all: (data)=>{
            this.detailList = data.detailList
            this.categoryList = data.categoryPsd.list
            this.category = data.categoryPsd.value
            this.applicableModelsList = data.applicableModelsPsd.list
            this.applicableModels = data.applicableModelsPsd.value
            this.code = data.code
            this.workDate = data.workDate
            this.wareHouserId = data.wareHouserId
            this.wareHouser = data.wareHouser
          },
          add: (data)=>{
            this.wareHouser = sessionStorage.getItem('____currentUser')
            this.wareHouserId = sessionStorage.getItem('____currentUserID')
            this.workDate = formatDate(new Date())
            this.maxWorkDate = this.workDate
          },
          look: (data)=>{
          }
        })
      }
    },
    created () {
      this.setQuery2Value('id')
      alert(this.id)
      this.initData()
    }
  }
</script>

<style scoped>

</style>
