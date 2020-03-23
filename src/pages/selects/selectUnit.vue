<template>
  <div class="f_main f_main_customize mb16">
    <yhm-select-body>
      <template #operate>
        <div v-show="showTipDbSelect" class="s_db_select" :style="{left:getLeft,top:getTop}">双击选择</div>
        <yhm-commonbutton value="添加" icon="btnAdd" @call="selectAddEvent()"></yhm-commonbutton>
        <yhm-managersearch :value="searchStr" id="searchStr" @call="initData"></yhm-managersearch>
      </template>
      <template #choose>
        <yhm-radiofilter :before="categoryBefore" @initData="initChoose('category')" title="单位" all="0" :content="listCategory"></yhm-radiofilter>
        <yhm-radiofilter @initData="initChoose('category')" title="常用" all="0" :content="commonUsePsd"></yhm-radiofilter>
        <yhm-radiofilterletter @initData="initChoose('prefixLetter')" :selectValue="prefixLetter"></yhm-radiofilterletter>
      </template>
      <template #listHead>
        <yhm-managerth width="40" title="选择"></yhm-managerth>
        <yhm-managerth title="单位名称"></yhm-managerth>
        <yhm-managerth width="160" title="统一社会信用代码"></yhm-managerth>
        <yhm-managerth width="150" title="公司电话"></yhm-managerth>
        <yhm-managerth width="120" title="常用单位"></yhm-managerth>
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
          <yhm-manager-td-thisexter :category="item.category" :value="item.name"></yhm-manager-td-thisexter>
          <yhm-manager-td-center :value="item.registrationNumber"></yhm-manager-td-center>
          <yhm-manager-td-center :value="item.tel" format="phone*"></yhm-manager-td-center>
          <yhm-manager-td-center-html>
            <span @mouseover.stop="mouseoutEvent" @mouseout.stop="mouseoverEvent" :class="[item.commonUse==='0'?'i-pentagram':'i-pentagramed']" @dblclick.stop @click.stop="setCommonUse(item)" style="color: #fb5f24; font-size: 20px;"></span>
          </yhm-manager-td-center-html>
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
  name: 'selectUnit',
  mixins: [selectmixin],
  data () {
    return {
      categoryBefore: '0', // 单位按钮是否可以切换(0表示能切换,1表示不能切换)
      listCategory: { // 接受单位筛选数据
        value: '',
        list: []
      },
      commonUsePsd: { // 常用筛选数据
        value: '',
        list: []
      },
      prefixLetter: { // 定义字母默认选择值
        value: ''
      },
      commonUse: '',
      simplify: '0'  //0 代表添加完整单位界面，1 代表添加简版单位界面
    }
  },
  methods: {
    setCommonUse(item){
      let params = {
        ownerID: item.id,
        tableName: '1030'
      }
      this.ajaxJson({
        url: '/Basic/setCommonUse',
        data: params,
        call: (data)=>{
          if(data.type === 0) {
            item.commonUse=data.val
            this.$dialog.alert({
              tipValue: data.message
            })
          }else{
            this.$dialog.alert({
              alertImg: 'warn',
              tipValue: data.message
            })
          }
        }
      })
    },
    initChoose (op) {
      this.pager.pageIndex = 1
      if (op === 'category') {
        this.selectValue = []
      }
      this.initPageData()
    },
    selectAddEvent () {
      let url = '/addUnitForm'
      let height = '692'
      if(this.simplify === '1'){
        url = '/addUnitSimplifyForm'
        height = '500'
      }
      this.$dialog.OpenWindow({
        width: '1050',
        height: height,
        //url: '/addUnitForm',
        url: url,
        title: '添加单位信息',
        closeCallBack: (data)=>{
          if(data){
            this.commonUsePsd.value = '1'
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
          category: this.listCategory.value,
          prefixLetter: this.prefixLetter.value,
          commonUse:'0'
        }
      } else {
        // 页面非初始化时需要的参数
        params = {
          category: this.listCategory.value,
          prefixLetter: this.prefixLetter.value,
          commonUse:this.commonUsePsd.value
        }
      }
      this.init({
        initValue: initValue,
        url: '/Basic/getSelectUnit',
        data: params,
        all: (data) => {
          // 不管是不是初始化都需要执行的代码
        },
        init: (data) => {
          // 初始化时需要执行的代码
          this.listCategory = data.listCategory
          this.commonUsePsd = data.commonUsePsd
        }
      })
    }
  },
  created () {
    this.listCategory.value = this.getQueryParam('category')
    this.setQuery2Value('categoryBefore')
    this.setQuery2Value('simplify')
  }
}
</script>
<style scoped>

</style>
