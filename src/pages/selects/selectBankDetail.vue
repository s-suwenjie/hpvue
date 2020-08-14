<template>
  <div class="f_main f_main_customize mb16">
    <yhm-select-body>
      <template #operate>
        <div v-show="showTipDbSelect" class="s_db_select" :style="{left:getLeft,top:getTop}">双击选择</div>
        <yhm-managersearch :value="searchStr" id="searchStr" @call="initData"></yhm-managersearch>
      </template>
      <template #choose>
        <yhm-radiofilter :before="categoryBefore" @initData="initChoose('category')" title="收支方向" all="0" :content="listCategory"></yhm-radiofilter>
      </template>
      <template #listHead>
        <yhm-managerth width="40" title="选择"></yhm-managerth>
        <yhm-managerth title="我方账户"></yhm-managerth>
        <yhm-managerth width="110" title="交易日期"></yhm-managerth>
        <yhm-managerth title="对方账户"></yhm-managerth>
        <yhm-managerth width="40" title="收支"></yhm-managerth>
        <yhm-managerth width="110" title="事由"></yhm-managerth>
        <yhm-managerth width="105" title="交易金额"></yhm-managerth>
        <yhm-managerth width="105" title="可核销金额"></yhm-managerth>
        <yhm-managerth width="245" title="备注"></yhm-managerth>
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
          <!--          <yhm-manager-td :value="item.otherName"></yhm-manager-td>-->
          <!--          <td style="text-indent: 5px;" v-html="item.otherName"></td>-->
          <yhm-manager-td-html :tip="true" node-class-name="f_main f_main_customize mb16" :value="item.selfAccount"></yhm-manager-td-html>
          <yhm-manager-td-date :value="item.cccurDate"></yhm-manager-td-date>
          <yhm-manager-td-html :tip="true" node-class-name="f_main f_main_customize mb16" :value="item.otherName"></yhm-manager-td-html>
          <yhm-manager-td-direction :direction="item.direction" value=" " class="dfJcc"></yhm-manager-td-direction>
          <yhm-manager-td :tip="true" node-class-name="f_main f_main_customize mb16" :value="item.subject"></yhm-manager-td>
          <yhm-manager-td-money :value="item.money"></yhm-manager-td-money>
          <yhm-manager-td-money :value="item.useMoney"></yhm-manager-td-money>
          <yhm-manager-td :tip="true" tip-type="r" node-class-name="f_main f_main_customize mb16" :value="item.remark"></yhm-manager-td>
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
    name: 'selectBankDetail',
    mixins: [selectmixin],
    data() {
      return {
        categoryBefore: '0', // 单位按钮是否可以切换(0表示能切换,1表示不能切换)
        listCategory: { //
          value: '',
          list: []
        },
        otherAccountID: '',
        direction: '',
        content: [],

        subjectID:'',//是由ID
        selfAccountID:'',//我方账户ID
        type:'',//1是付款用到收支明细选择
      }
    },
    methods: {
      initChoose (op) {
        this.pager.pageIndex = 1
        if (op === 'category') {
          this.selectValue = []
        }
        this.initPageData()
      },
      initPageData(initValue){
        let params = {}
        if (initValue) {
          // 页面初始化是需要的参数
          params = {
            otherID:this.otherID,
            otherAccountID: this.otherAccountID,
            direction: this.direction,
            subjectID:this.subjectID,
            selfAccountID:this.selfAccountID,
            type:this.type
          }
        } else {
          // 页面非初始化时需要的参数
          params = {
            otherID:this.otherID,
            otherAccountID: this.otherAccountID,
            direction: this.listCategory.value,
            subjectID:this.subjectID,
            selfAccountID:this.selfAccountID,
            type:this.type
          }
        }
        this.init({
          initValue: initValue,
          url: '/Fin/bankDetailSelectVue',
          data: params,
          all: (data) => {
            // 不管是不是初始化都需要执行的代码
          },
          init: (data) => {
            // 初始化时需要执行的代码
            this.content = data.content
            this.listCategory = data.directionPsd
          }
        })
      }
    },
    created () {
      this.listCategory.value = this.getQueryParam('category')
      this.setQuery2Value('categoryBefore')
      this.setQuery2Value('otherAccountID')
      this.setQuery2Value('direction')
      this.setQuery2Value('subjectID')
      this.setQuery2Value('otherID')
      this.setQuery2Value('selfAccountID')
      this.setQuery2Value('type')

    }
  }
</script>

<style scoped lang="less">
  .imgTd{
    p{
      display: flex;
      align-items: center;
      line-height: 8px;
      .bankImg {
        margin: 0 5px;
        img{
          width: 25px;
          height: 25px;
        }
      }
    }
  }
</style>
