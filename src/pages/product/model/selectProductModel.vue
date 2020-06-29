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
        <yhm-managerth title="商品规格型号"></yhm-managerth>
        <yhm-managerth title="商品规格型号(英文)"></yhm-managerth>
        <yhm-managerth title="编号"></yhm-managerth>
        <yhm-managerth width="100" title="参考价格"></yhm-managerth>
      </template>

      <template #listBody>
        <tr v-for="(item,index) in content"
            :class="{InterlacBg:index%2!=0}"
            :key="item.id"
            @click="selectEvent(item)"
            @dblclick="dblclickEvent(item)">

          <yhm-manager-td-checkbox :no-click="false" :value="item"></yhm-manager-td-checkbox>
          <yhm-manager-td :value="item.name"></yhm-manager-td>
          <yhm-manager-td :value="item.englishName"></yhm-manager-td>
          <yhm-manager-td :value="item.productNumber"></yhm-manager-td>
          <yhm-manager-td-money :value="item.price"></yhm-manager-td-money>
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
    name: 'selectModel',
    mixins: [selectmixin],
    data(){
      return{
        ownerID:''
      }
    },
    methods:{
      selectAddEvent () {
        this.$dialog.OpenWindow({
          width: 1050,
          height: 600,
          url:'/modelForm?ownerID=' + this.ownerID,
          title:'添加规格型号信息',
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
            ownerID:this.ownerID
          }
        } else {
          // 页面非初始化时需要的参数
          params = {
            ownerID:this.ownerID
          }
        }
        this.init({
          initValue: initValue,
          url: '/Basic/getSelectModel',
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
      this.setQuery2Value('ownerID')
    }
  }
</script>

<style scoped>

</style>
