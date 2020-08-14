<template>
  <div class="f_main f_main_customize mb16">
    <yhm-select-body :choose="false">
      <template #operate>
        <div v-show="showTipDbSelect" class="s_db_select" :style="{left:getLeft,top:getTop}">双击选择</div>
        <yhm-managersearch :value="searchStr" id="searchStr" @call="initData"></yhm-managersearch>
      </template>

      <template #listHead>
        <yhm-managerth width="40" title="选择"></yhm-managerth>
        <yhm-managerth title="商品规格型号"></yhm-managerth>
        <yhm-managerth title="是否拆分"></yhm-managerth>
        <yhm-managerth title="库存数量"></yhm-managerth>
        <yhm-managerth title="单位"></yhm-managerth>
        <yhm-managerth width="100" title="参考价格"></yhm-managerth>
      </template>

      <template #listBody>
        <tr v-for="(item,index) in content"
            :class="{InterlacBg:index%2!=0}"
            :key="item.id"
            @click="selectEvent(item)"
            @dblclick="dblclickEvent(item)">

          <yhm-manager-td-checkbox :no-click="false" :value="item"></yhm-manager-td-checkbox>
          <yhm-manager-td :value="item.model"></yhm-manager-td>
          <yhm-manager-td :value="item.spilt"></yhm-manager-td>
          <yhm-manager-td-rgt :value="item.quantity"></yhm-manager-td-rgt>
          <yhm-manager-td :value="item.mdoStr"></yhm-manager-td>
          <yhm-manager-td-money :value="item.price+''"></yhm-manager-td-money>
        </tr>
      </template>

      <template #empty>
        <span class="m_listNoData" v-show="content.length === 0">暂时没有数据</span>
      </template>
      <template #pager>
        <yhm-pagination :pager="pager" isPageSize="false" @initData="initPageData(false)"></yhm-pagination>
        <yhm-commonbutton class="mr0" icon="i-complete" value="确定" category="two" @call="selectConfirmEvent()"></yhm-commonbutton>
      </template>
    </yhm-select-body>
  </div>

</template>

<script>
  import { selectmixin } from '@/assets/select.js'
  export default {
    name: "stockOutselectModelview",
    mixins: [selectmixin],
    data(){
      return{
        ownerID:'',
        category:'',
        applicableModels:'',
        productID:'',
        content:'',
      }
    },
    methods:{
      //console
      initPageData(initValue){
        let params = {}
        if (initValue) {
          // 页面初始化是需要的参数
          params = {
            category:this.category,
            applicableModels:this.applicableModels,
            productID:this.productID,
          }
        } else {
          // 页面非初始化时需要的参数
          params = {
            // ownerID:this.ownerID
          }
        }
        this.init({
          initValue: initValue,
          url: '/stock/stock/queryForList',
          data: params,
          all: (data) => {
            // 不管是不是初始化都需要执行的代码
            this.content=data.content
            if(data.content.length>0){
              for (let i in this.content) {
                if(this.content[i].spilt == 0 ){
                  this.content[i].spilt ='是'
                  this.content[i].quantity =this.content[i].sumStr
                }else{
                  this.content[i].spilt ='否'
                  this.content[i].mdoStr =this.content[i].uuStr
                }
              }
              this.cat=data.categoryPsd.list[this.category].showName
              this.acm=data.applicableModelsPsd.list[this.applicableModels].showName
            }
          },
          init: (data) => {
            // 初始化时需要执行的代码
          }
        })
      },


    },
    created () {
      // this.setQuery2Value('ownerID')
      this.setQuery2Value("applicableModels")
      this.setQuery2Value("category")
      this.setQuery2Value("productID")
    }
  }
</script>

<style scoped>

</style>
