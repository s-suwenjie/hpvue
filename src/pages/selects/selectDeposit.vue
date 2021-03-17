<template>
    <div class="main">
      <div style="height: 30px;"></div>
      <yhm-select-body>

        <template #navigation>基本信息</template>


        <template #operate>
          <div v-show="showTipDbSelect" class="s_db_select" :style="{left:getLeft,top:getTop}">双击选择</div>
          <yhm-managersearch :value="searchStr" id="searchStr" @call="initPageData(false)"></yhm-managersearch>
        </template>

        <template #choose>
          <yhm-radiofilter  @initData="initChoose('category')" title="型号" :content="brandPsd"></yhm-radiofilter>
          <yhm-radiofilter  @initData="initChoose('subjectID')" title="付款类型" :content="categoryPsd"></yhm-radiofilter>
        </template>

        <template #listHead><!--数据表头-->
          <yhm-managerth width="40" title="选择"></yhm-managerth>
          <yhm-managerth width="60" title="操作人"></yhm-managerth>
          <yhm-managerth width="60" title="付款类型"></yhm-managerth>
          <yhm-managerth width="70" title="品牌"></yhm-managerth>
          <yhm-managerth title="付款方"></yhm-managerth>
          <yhm-managerth title="付款账号"></yhm-managerth>
          <yhm-managerth width="100" title="事由"></yhm-managerth>
          <yhm-managerth width="80" title="交易金额"></yhm-managerth>
          <yhm-managerth width="90" title="剩余退款金额"></yhm-managerth>
          <yhm-managerth width="120" title="备注"></yhm-managerth>
        </template>

        <template #listBody><!--数据表格-->
          <tr v-for="(item,index) in content" :class="{InterlacBg:index%2!=0}"  :key="item.id" @click="selectEvent(item)" @dblclick="dblclickEvent(item)"
              @mousemove="mousemoveEvent" @mouseover="mouseoverEvent" @mouseout="mouseoutEvent">
            <yhm-manager-td-checkbox :no-click="false" :value="item"></yhm-manager-td-checkbox>
            <yhm-manager-td :value="item.person"></yhm-manager-td>
            <yhm-manager-td-psd :value="item.category" :list="categoryPsd.list"></yhm-manager-td-psd>
            <yhm-manager-td-psd :value="item.brand" :list="brandPsd.list"></yhm-manager-td-psd>
            <yhm-manager-td :value="item.other"></yhm-manager-td>
            <yhm-manager-td :value="item.otherAccount"></yhm-manager-td>
            <yhm-manager-td-psd :value="item.subjectID" :list="subjectPsd.list"></yhm-manager-td-psd>
            <yhm-manager-td-money :value="item.money"></yhm-manager-td-money>
            <yhm-manager-td-money :value="item.useMoney"></yhm-manager-td-money>
            <yhm-manager-td :value="item.remark"></yhm-manager-td>
          </tr>
        </template>

        <template #empty>
          <span class="m_listNoData" v-show="content.length == 0">暂时没有数据</span>
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
    name: 'selectDeposit',
    mixins: [selectmixin],
    data(){
      return{
        brandPsd:[],
        categoryPsd:[],
        subjectPsd:[],
        category:'',
        subjectID:'',
        brand:'',
        otherID:'',
      }
    },
    created () {
      this.setQuery2Value('category')
      this.setQuery2Value('subjectID')
      this.setQuery2Value('brand')
      this.setQuery2Value('otherID')
    },
    methods:{
      initChoose (op) {
        this.initPageData(false)
      },
      initPageData(initValue){
        let params = {}
        if (initValue) {
          // 页面初始化是需要的参数
          params = {
            category:this.category,
            subjectID:this.subjectID,
            brand:this.brand,
            otherID:this.otherID,
          }
        } else {
          // 页面非初始化时需要的参数
          params = {
            category:this.categoryPsd.value,
            subjectID:this.subjectID,
            brand:this.brandPsd.value,
            otherID:this.otherID,
          }
        }
        this.init({
          initValue: initValue,
          url: '/dailyoffice/deposit/select',
          data: params,
          all: (data) => {
            // 不管是不是初始化都需要执行的代码

          },
          init: (data) => {
            // 初始化时需要执行的代码
            this.brandPsd=data.brandPsd
            this.categoryPsd=data.categoryPsd
            this.subjectPsd=data.subjectPsd
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
