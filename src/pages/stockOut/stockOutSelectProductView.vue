<template>
  <div class="f_main f_main_customize mb16">
    <yhm-select-body :choose="false">
      <template #operate>
        <div v-show="showTipDbSelect" class="s_db_select" :style="{left:getLeft,top:getTop}">双击选择</div>
        <yhm-managersearch :value="searchStr" id="searchStr" @call="initData"></yhm-managersearch>
      </template>
      <!--表格头部-->
      <template #listHead>
        <yhm-managerth width="40" title="选择"></yhm-managerth>
        <yhm-managerth title="商品名称"></yhm-managerth>
        <yhm-managerth title="类型"></yhm-managerth>
        <yhm-managerth title="适用车型"></yhm-managerth>
        <yhm-managerth title="数量"></yhm-managerth>
        <yhm-managerth width="100" title="计量单位"></yhm-managerth>
        <yhm-managerth width="100" title="是否拆分出库"></yhm-managerth>
      </template>
      <!--表格部分-->
      <template #listBody>
        <tr v-for="(item,index) in content"
            :class="{InterlacBg:index%2!=0}"
            :key="item.id"
            @click="selectEvent(item)"
            @dblclick="dblclickEvent(item)">
          <yhm-manager-td-checkbox :no-click="false" :value="item"></yhm-manager-td-checkbox>
          <yhm-manager-td :value="item.product"></yhm-manager-td>
          <yhm-manager-td :value="cat"></yhm-manager-td>
          <yhm-manager-td :value="acm"></yhm-manager-td>
          <yhm-manager-td-rgt :value="item.quantity"></yhm-manager-td-rgt>
          <yhm-manager-td :value="item.mdoStr"></yhm-manager-td>
          <yhm-manager-td :value="item.spilt+''"></yhm-manager-td>
        </tr>
      </template>

      <template #empty>
        <span class="m_listNoData" v-show="content.length == 0">暂时没有数据</span>
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
    name: "stockOutSelectProductView",
    mixins: [selectmixin],
    data(){
      return{
        value:'',
        applicableModels:'',
        category:'',
        cat:'',
        acm:'',
        content:'',
      }
    },
    created(){
      this.setQuery2Value("applicableModels")
      this.setQuery2Value("category")
    },
    methods:{
      initPageData(initValue){
        let params = {}
        if (initValue) {
          // 页面初始化是需要的参数
          params = {
            category:this.category,
            applicableModels:this.applicableModels,
          }
        } else {
          // 页面非初始化时需要的参数
          params = {
            category:this.category,
            applicableModels:this.applicableModels,
          }
        }
        this.init({
          initValue: initValue,
          url: '/stock/stock/queryForList',
          data: params,
          all: (data) => {
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

            // 不管是不是初始化都需要执行的代码

          },
          init: (data) => {
            // 初始化时需要执行的代码
            //console
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
