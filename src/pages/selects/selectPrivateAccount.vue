<template>
  <div class="f_main f_main_customize mb16">
    <yhm-select-body>
      <template #operate>
        <div v-show="showTipDbSelect" class="s_db_select" :style="{left:getLeft,top:getTop}">双击选择</div>
        <yhm-commonbutton value="添加" icon="btnAdd" @call="selectAddEvent()"></yhm-commonbutton>
        <yhm-managersearch :value="searchStr" id="searchStr" @call="initData"></yhm-managersearch>
      </template>

      <template #choose>
        <yhm-radiofilter :before="categoryBefore" @initData="initChoose('category')" title="单位分类" all="0" :content="listCategoryUnit"></yhm-radiofilter>
        <yhm-radiofilter :before="categoryAccBefore" @initData="initChoose('category')" title="账户类型" all="0" :content="listCategory"></yhm-radiofilter>
        <yhm-radiofilter @initData="initChoose('category')" :before="commonUse" title="常用" all="0" :content="commonUsePsd"></yhm-radiofilter>
      </template>

      <template #listHead>
        <yhm-managerth width="40" title="选择"></yhm-managerth>
        <yhm-managerth width="200" title="别名"></yhm-managerth>
        <yhm-managerth width="100" title="户名"></yhm-managerth>
        <yhm-managerth title="账户信息"></yhm-managerth>
        <yhm-managerth width="120" title="常用账户"></yhm-managerth>
      </template>

      <template #listBody>
        <tr v-for="(item,index) in content":class="{InterlacBg:index%2!=0}":key="item.id" @click="selectEvent(item)" @dblclick="dblclickEvent(item)"
            @mousemove="mousemoveEvent"@mouseover="mouseoverEvent" @mouseout="mouseoutEvent">
          <yhm-manager-td-checkbox :no-click="false" :value="item"></yhm-manager-td-checkbox>
          <yhm-manager-td :value="item.alias"></yhm-manager-td>
          <yhm-manager-td :value="item.person"></yhm-manager-td>
          <yhm-manager-td :value="item.publicAccountExplain"></yhm-manager-td>
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
    name: 'selectPrivateAccount',
    mixins: [selectmixin],
    data() {
      return {
        categoryBefore: '0', // 单位按钮是否可以切换(0表示能切换,1表示不能切换)
        categoryAccBefore: '0', // 账户按钮是否可以切换(0表示能切换,1表示不能切换)
        listCategory: { // 接受单位筛选数据
          value: '',
          list: []
        },
        commonUsePsd: { // 常用筛选数据
          value: '',
          list: []
        },
        listCategoryUnit: { // 接受单位筛选数据
          value: '',
          list: []
        },
        isState: false,
        personID: '',
        commonUse:'',
      }
    },
    methods: {
      setCommonUse(item){
        let params = {
          ownerID: item.id,
          tableName: '1015'
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
      selectAddEvent () {
        let personID=''
        if(this.personID!==''){
          personID='&personID='+this.personID
        }
        this.$dialog.OpenWindow({
          width: 1050,
          height: 692,
          url: '/privateAccountForm?id='+personID,
          title: '添加对私账户',
          closeCallBack: (data) => {
            if (data) {
              if(data.personID===''){
                this.searchStr = data
                this.initPageData(false)
              }else{
                this.$dialog.setReturnValue(data)
                this.$dialog.close()
              }
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

      initPageData(initValue){
        let params = {}
        if (initValue) {
          // 页面初始化是需要的参数
          params = {
            category: this.listCategory.value,
            categoryUnit: this.listCategoryUnit.value,
            privatePersonID: this.personID
          }
        } else {
          // 页面非初始化时需要的参数
          params = {
            category: this.listCategory.value,
            categoryUnit: this.listCategoryUnit.value,
            commonUse: this.commonUsePsd.value,

            privatePersonID: this.personID,
          }
        }
        this.init({
          initValue: initValue,
          url: '/Fin/selectPrivateAccountJson',
          data: params,
          all: (data) => {
            // 不管是不是初始化都需要执行的代码
          },
          init: (data) => {

            // 初始化时需要执行的代码
            this.listCategory = data.listCategory
            this.listCategoryUnit = data.listCategoryUnit
            this.commonUsePsd = data.commonUsePsd

          }
        })
      },
    },
    created () {
      this.listCategory.value = this.getQueryParam('category')
      this.listCategoryUnit.value = this.getQueryParam('categoryUnit')
      this.setQuery2Value('categoryBefore')
      this.setQuery2Value('personID')
      this.setQuery2Value('categoryAccBefore')
      this.setQuery2Value('categoryUnit')
      this.setQuery2Value('commonUse')

      //this.setQuery2Value('unitID')
      if(this.isHide === '1'){
        this.isState = false
      }
    }
  }
</script>

<style scoped>

</style>

