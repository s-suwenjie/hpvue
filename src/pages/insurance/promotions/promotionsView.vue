<template>
  <div class="f_main">
    <yhm-view-body>
      <template #title>基本信息</template>
      <template #body>
        <yhm-view-control title="别名" :content="name"></yhm-view-control>
        <yhm-view-control title="品牌" :content="brand" :psd="brandList"></yhm-view-control>
        <yhm-view-control title="保险公司" :content="insuredUnit" :psd="insuredUnitList"></yhm-view-control>
        <yhm-view-control title="优惠额度%" :content="amount"></yhm-view-control>
        <yhm-view-control title="启用日期" :content="startDate"></yhm-view-control>
        <yhm-view-control title="结束日期" :content="endDate"></yhm-view-control>
<!--        <yhm-view-control title="行车证信息"  category="3" type="smfiles"  :content="drivingLicense"></yhm-view-control>-->
        <yhm-view-control title="启用状态" :content="enable" :psd="enableList"></yhm-view-control>

      </template>
    </yhm-view-body>

    <div class="f_split"></div>
    <yhm-view-tab>
      <template #tab>
        <yhm-view-tab-button :list="tabState" :index="0" >优惠活动详情信息</yhm-view-tab-button>
      </template>
      <template #content>

        <yhm-view-tab-list :customize="true" :pager="true" v-show="tabState[0].select">
          <template #listHead>
            <yhm-managerth style="width: 40px" title="序号"></yhm-managerth>
            <yhm-managerth  title="活动"></yhm-managerth>
            <yhm-managerth style="width: 80px" title="类型"></yhm-managerth>
            <yhm-managerth style="width: 60px" title="面值"></yhm-managerth>
            <yhm-managerth style="width: 60px" title="有效期"></yhm-managerth>
            <yhm-managerth  title="logo"></yhm-managerth>
            <yhm-managerth style="width: 100px"  title="数量"></yhm-managerth>

          </template>
          <template #listBody>
            <tr v-for="(item,index) in discountList" :key="index" :class="{InterlacBg:index%2!==0}">
              <yhm-manager-td-center   :value="index+1+''"></yhm-manager-td-center>
              <yhm-manager-td-center  :value="item.name"></yhm-manager-td-center>
              <yhm-manager-td-psd :value="item.category" :list="categoryList"></yhm-manager-td-psd>
              <yhm-manager-td-center  :value="item.money+'元'"></yhm-manager-td-center>
              <yhm-manager-td-psd :befotr-value="item.expiration" :value="item.expirationCategory" :list="expirationCategoryList"></yhm-manager-td-psd>
              <yhm-manager-td-image :tip="true" width="850" height="600" left="50" type="files" :value="item.url" :tag="'wxCoupon'" ></yhm-manager-td-image>
              <yhm-manager-td-center  :value="item.quantity"></yhm-manager-td-center>

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
    name: 'promotionsView',
    mixins: [viewmixin],
    data(){
      return{
        tabState:[{select:true}],
        name:'',
        brand:'',
        brandList:[],
        insuredUnit:'',
        insuredUnitList:[],
        amount:'',
        startDate:'',
        endDate:'',
        enable:'',
        enableList:[],
        discountList:[],
        categoryList:[],
        category:'',
        expirationCategoryList:[],
        expirationCategory:'',
        isEdit:false
      }
    },
    methods:{
      editBtn() {
        this.$dialog.OpenWindow({
          width: 1070,
          height: 750,
          url:'/promotionsForm?id='+this.id,
          title:'添加优惠活动',
          closeCallBack:(data) =>{
            if (data) {
              this.lastData = data//接收子页面传的值
              this.initData(false)
            }
          }
        })
      },

      initData(){
        let params = {
          id: this.id,
        }
        this.init({
          url: '/Insurance/promotionInit',
          data: params,
          call: (data)=>{
            this.brandList=data.brandPsd.list
            this.brand=data.brandPsd.value
            this.insuredUnitList=data.insuredUnitPsd.list
            this.insuredUnit=data.insuredUnitPsd.value
            this.enableList=data.enablePsd.list
            this.enable=data.enablePsd.value

            this.categoryList=data.categoryPsd.list
            this.category=data.categoryPsd.value

            this.expirationCategoryList=data.expirationCategoryPsd.list
            this.expirationCategory=data.expirationCategoryPsd.value
            this.id=data.id
            this.discountList=data.promotionsList
            this.amount=data.amount
            this.name=data.name
            this.startDate=data.startDate
            this.endDate=data.endDate
            this.promotionsList=data.promotionsList
            if (data.finCategory==0 && data.highCategory==0&&data.insCategory==0){
              this.isEdit=true
            }
            if (data.finCategory==-1 || data.highCategory==-1||data.insCategory==-1){
              this.isEdit=true
            }

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
<!--         <yhm-view-control title="投保公司" :content="insuredUnit" :psd="insuredUnitList"></yhm-view-control>-->
