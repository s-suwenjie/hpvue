<template>
  <div class="f_main f_main_customize mb16">
    <yhm-select-body :choose="false">
      <template #operate>
        <div v-show="showTipDbSelect" class="s_db_select" :style="{left:getLeft,top:getTop}">双击选择</div>
        <!--<yhm-commonbutton  value="添加" icon="btnAdd" @call="selectAddEvent"></yhm-commonbutton>-->
        <yhm-managersearch :value="searchStr" id="searchStr" @call="initData"></yhm-managersearch>
      </template>

      <template #listHead>
        <yhm-managerth width="40" title="选择"></yhm-managerth>
        <!--<yhm-managerth title="序号" width="40"></yhm-managerth>-->
        <yhm-managerth title="商品名称"></yhm-managerth>
        <yhm-managerth title="规格型号"></yhm-managerth>
        <yhm-managerth style="width: 120px" title="拆分数量"></yhm-managerth>
        <yhm-managerth style="width: 120px" title="整件数量"></yhm-managerth>
        <yhm-managerth title="单价"></yhm-managerth>
        <yhm-managerth title="总价"></yhm-managerth>
      </template>
      <template #listBody>
        <tr v-for="(item,index) in content"
            :class="{InterlacBg:index%2!=0}"
            :key="item.id"
            @click="selectEvent(item)"
            @dblclick="dblclickEvent(item)"
            @mousemove="mousemoveEvent"
            @mouseover="mouseoverEvent"
            @mouseout="mouseoutEvent">

          <yhm-manager-td-checkbox :no-click="false" :value="item"></yhm-manager-td-checkbox>
          <!--<yhm-manager-td-center :value="item.index"></yhm-manager-td-center>-->
          <yhm-manager-td :tip="true" node-class-name="f_main" :value="item.product"></yhm-manager-td>
          <yhm-manager-td :tip="true" node-class-name="f_main" :value="item.model"></yhm-manager-td>
          <yhm-manager-td-center :value="item.mdo"></yhm-manager-td-center>
          <yhm-manager-td-center :value="item.quantity+''"></yhm-manager-td-center>
          <yhm-manager-td-money :value="item.price"></yhm-manager-td-money>
          <yhm-manager-td-money :value="item.money"></yhm-manager-td-money>
        </tr>
      </template>
      <template #empty>
        <span class="m_listNoData" v-show="content.length === 0">暂时没有数据</span>
      </template>
      <template #pager>
        <yhm-pagination is-not-right :pager="pager" isPageSize="false" @initData="initPageData(false)"></yhm-pagination>
        <yhm-commonbutton class="mr0" icon="i-complete" value="确定" category="two" @call="selectConfirmEvent()"></yhm-commonbutton>
      </template>
    </yhm-select-body>
  </div>
</template>

<script>
  import { selectmixin } from '@/assets/select.js'
  export default {
    name: 'selectTakeAway',
    mixins: [selectmixin],
    data(){
      return{

        ownerID:''
      }
    },
    methods: {

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
          url: '/fix/fixOrder/returnFixMailManger',
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
