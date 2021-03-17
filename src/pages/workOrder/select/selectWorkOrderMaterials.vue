<template>
  <div class="f_main f_main_customize mb16">
    <yhm-select-body :choose="false" >

      <template #operate>
        <yhm-commonbutton value="添加" icon="btnAdd" :flicker="true" @call="add()"></yhm-commonbutton>

        <div v-show="showTipDbSelect" class="s_db_select" :style="{left:getLeft,top:getTop}">双击选择</div>
        <yhm-managersearch :value="searchStr" id="searchStr" @call="initData"></yhm-managersearch>
        <!--        <yhm-selectrgtbox :select-count="pager.selectCount" :all-money="selectMoney"></yhm-selectrgtbox>-->
      </template>
      <template #listHead>
        <yhm-managerth-check v-if="selectType === '1'" is-select :check="allCheck" style="width: 40px;"></yhm-managerth-check>
        <yhm-managerth v-if="selectType === '0'" width="40" title="选择"></yhm-managerth>
        <yhm-managerth title="维修配件" ></yhm-managerth>
        <yhm-managerth title="规格型号"></yhm-managerth>
        <yhm-managerth width="110" title="销售单价"></yhm-managerth>
<!--        <yhm-managerth title="销售总价"></yhm-managerth>-->
<!--        <yhm-managerth title="采购单价"></yhm-managerth>-->
<!--        <yhm-managerth title="采购总价"></yhm-managerth>-->
<!--        <yhm-managerth title="商品类型"></yhm-managerth>-->
        <yhm-managerth width="100" title="适用车型"></yhm-managerth>
<!--        <yhm-managerth width="80" title="当前库存"></yhm-managerth>-->
        <yhm-managerth style="width: 80px;" title="是否可拆分"></yhm-managerth>
<!--        <yhm-managerth width="90" title="拆分后数量"></yhm-managerth>-->

      </template>
      <template #listBody>
        <tr v-for="(item,index) in content"
            :class="{InterlacBg:index%2!=0}"
            :key="item.id"
            @click="selectEvent(item)"
            @dblclick="dblclickEvent(item)"
            @mousemove="mousemoveEvent"
            @mouseover="mouseoverEvent"
            @mouseout="mouseoutEvent"
        >
          <yhm-manager-td-checkbox :value="item" :no-click="false"></yhm-manager-td-checkbox>
          <yhm-manager-td :value="item.product" :tip="true" node-class-name="f_main f_main_customize mb16"></yhm-manager-td>
          <yhm-manager-td :value="item.model" :tip="true" node-class-name="f_main f_main_customize mb16"></yhm-manager-td>
          <yhm-manager-td-money :value="item.price+''"></yhm-manager-td-money><!--销售价-->
<!--          <yhm-manager-td-money :value="item.saletotal+''"></yhm-manager-td-money>&lt;!&ndash;销售总价&ndash;&gt;-->
<!--          <yhm-manager-td-money :value="item.price"></yhm-manager-td-money>-->
<!--          <yhm-manager-td-money :value="item.total"></yhm-manager-td-money>-->
<!--          <yhm-manager-td-psd :value="item.category" :list="categoryList"></yhm-manager-td-psd>-->
<!--          <yhm-manager-td-center :value="item.applicableModelsVal"></yhm-manager-td-center>-->

          <yhm-manager-td-psd :value="item.applicableModels" :list="applicableModelsList"></yhm-manager-td-psd>
<!--          <yhm-manager-td-rgt :value="item.quantity+item.uuStr+''" :color="item.quantity == 0 ? 'red' : '#333333'"></yhm-manager-td-rgt>-->
          <yhm-manager-td-center :value="item.splitVal"></yhm-manager-td-center>
<!--          <yhm-manager-td-rgt :value="item.sumStr+(item.mdoStr==null?'':item.mdoStr)"></yhm-manager-td-rgt>-->

        </tr>
      </template>

      <template #empty>
        <span class="m_listNoData" v-show="content.length === 0">暂时没有数据</span>
      </template>
      <template #pager>
        <yhm-pagination is-not-right :pager="pager" isPageSize="false" @initData="initPageData(false)"></yhm-pagination>
        <div style="width: 100%;display: flex;justify-content: center;align-items: center;margin-top: 10px;">
          <yhm-commonbutton class="mr0" icon="i-complete" value="确定" category="two" @call="selectConfirmEvent()"></yhm-commonbutton>

        </div>
      </template>
    </yhm-select-body>

  </div>
</template>

<script>
  import { selectmixin } from '@/assets/select.js'
  export default {
    name: 'selectWorkOrderMaterials',
    mixins: [selectmixin],
    data(){
      return{
        selectType:'0',
        categoryList:[],
        stateList:[],
        applicableModelsList:[],
        applicableModelsPsd:[],
        pager: { // 分页数据
          total: 0, // 数据总条数
          pageSize: 10, // 单页数据条数
          pageIndex: 1, // 当前页码
          selectCount: 0 // 选中数据的条数
        }
      }
    },
    methods:{
      add(){
        this.$dialog.OpenWindow({
          width: 1050,
          height: 650,
          url:'/productForm',
          title:'添加商品',
          closeCallBack:(data) =>{
            if (data) {
              this.productid = data

              this.initPageData(false)
              /*false->非初始化=>!import  true->初始化*/
            }
          }
        })
      },
      initPageData(initValue){
        let params = {}
        if (initValue) {
          // 页面初始化是需要的参数
          params = {
            storageType:this.category,
            stockType:this.applicableModels,
            // number:'',
            productID:this.productid,
            modelID:this.modelid,
            pageSize:this.pager.pageSize
          }
        } else {
          // 页面非初始化时需要的参数
          params = {
            storageType:this.category,
            stockType:this.applicableModels,
            // number:'',
            productID:this.productid,
            modelID:this.modelid,
            pageSize:this.pager.pageSize
          }
        }
        this.init({
          initValue: initValue,
          url: '/Basic/getProductFrom',
          data: params,
          all: (data) => {
            // 不管是不是初始化都需要执行的代码
            this.content = data.content
            // this.categoryList = data.categoryPsd.list
            // // this.stateList = data.statePsd.list
            // this.applicableModelsList = data.applicableModelsPsd.list
            // if(this.allCheck){
            //   for(let i in this.content){
            //     let id = this.content[i].id
            //     let sign = true
            //     if(this.selectValue.length > 0){
            //       for (var j = 0; j < this.selectValue.length; j++){
            //         if(Object.keys(this.selectValue[j])[0] === id) {
            //           sign = false
            //           break;
            //         }
            //       }
            //     }
            //     if(sign) {
            //       let val = {}
            //       val[id] = this.content[i]
            //       this.selectValue.push(val)
            //     }
            //   }
            // }
            // else{
            //   let check = true
            //   for(let i in this.content){
            //     let id = this.content[i].id
            //     let sign = false
            //     if(this.selectValue.length > 0){
            //       for (var j = 0; j < this.selectValue.length; j++){
            //         if(Object.keys(this.selectValue[j])[0] === id){
            //           sign = true
            //         }
            //       }
            //     }
            //     if(!sign){
            //       check = false
            //     }
            //   }
            //   this.allCheck = check
            // }
          },
          init: (data) => {
            // 初始化时需要执行的代码
            this.applicableModelsList = data.applicableModelsPsd.list
            // this.listCategory = data.listCategory

            // for(let i in this.content){
            //   this.allMoney += parseFloat(this.content[i].totalMoney)
            // }


          }
        })
      },

    },
    created () {
      this.setQuery2Value('modelid')//材料类型id
      this.setQuery2Value('category')//类型
      this.setQuery2Value('productid')//材料id
      this.setQuery2Value('applicableModels')//规格型号
      if(this.selectType === '1'){
        // this.allCheck = true
      }
    }
  }
</script>

<style scoped>

</style>
