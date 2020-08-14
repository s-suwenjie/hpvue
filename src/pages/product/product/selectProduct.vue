<template>
  <div class="f_main f_main_customize mb16">
    <yhm-select-body :choose="false">
      <template #operate>
        <div v-show="showTipDbSelect" class="s_db_select" :style="{left:getLeft,top:getTop}">双击选择</div>
        <yhm-commonbutton value="添加" icon="btnAdd" @call="selectAddEvent()"></yhm-commonbutton>
        <yhm-managersearch :value="searchStr" id="searchStr" @call="initData"></yhm-managersearch>
      </template>

      <template #listHead>
        <yhm-managerth width="40" title="选择"></yhm-managerth>
        <yhm-managerth title="商品名称"></yhm-managerth>
<!--        <yhm-managerth title="商品名称(英文)"></yhm-managerth>-->
        <yhm-managerth title="类型"></yhm-managerth>
        <yhm-managerth title="适用车型"></yhm-managerth>
        <yhm-managerth width="100" title="计量单位"></yhm-managerth>
        <yhm-managerth width="100" title="是否拆分出库"></yhm-managerth>
        <yhm-managerth width="100" title="拆分出库单位"></yhm-managerth>
      </template>

      <template #listBody>
        <tr v-for="(item,index) in content"
            :class="{InterlacBg:index%2!=0}"
            :key="item.id"
            @click="selectEvent(item)"
            @dblclick="dblclickEvent(item)">
          <yhm-manager-td-checkbox :no-click="false" :value="item"></yhm-manager-td-checkbox>
          <yhm-manager-td :value="item.name"></yhm-manager-td>
<!--          <yhm-manager-td-center :value="item.englishName"></yhm-manager-td-center>-->
          <yhm-manager-td-center :value="item.storageTypeVal"></yhm-manager-td-center>
          <yhm-manager-td-center :value="item.stockTypeVal"></yhm-manager-td-center>
          <yhm-manager-td-center :value="item.unit"></yhm-manager-td-center>
          <yhm-manager-td-center :value="item.splitVal"></yhm-manager-td-center>
          <yhm-manager-td-center :value="item.splitDeliveryUnit"></yhm-manager-td-center>
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
    name: 'selectProduct',
    mixins: [selectmixin],
    data(){
      return{
        value:'',
        storageType:'',
        stockType:'',
      }
    },
    methods:{
      selectAddEvent () {
        this.$dialog.OpenWindow({
          width: 1072,
          height: 650,
          url:'/productForm',
          title:'添加商品信息',
          closeCallBack: (data)=>{
            if(data){
              this.searchStr = data
              this.initPageData(false)
            }
          }
        })
      },
      initPageData(initValue){
        let params = {}
        if (initValue) {
          // 页面初始化是需要的参数
          params = {
            storageType:this.storageType,
            stockType:this.stockType
          }
        } else {
          // 页面非初始化时需要的参数
          params = {}
        }
        this.init({
          initValue: initValue,
          url: '/Basic/getSelectProduct',
          data: params,
          all: (data) => {
            // 不管是不是初始化都需要执行的代码
          },
          init: (data) => {
            // 初始化时需要执行的代码
          }
        })
      }
    },
    created () {
      this.setQuery2Value('stockType')
      this.setQuery2Value('storageType')
    }
  }
</script>

<style scoped>

</style>
