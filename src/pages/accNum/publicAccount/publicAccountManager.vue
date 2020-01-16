<template>
  <div>
    <yhm-managerpage>
      <!--导航条-->

      <template #navigation>财务管理&nbsp;&gt;&nbsp;账号&nbsp;&gt;&nbsp;对公账号</template>

      <!--操作区-->
      <template #operate>
        <yhm-commonbutton value="添加" icon="btnAdd" :flicker="true" @call="add()"></yhm-commonbutton>
        <yhm-commonbutton :value="choose?'收起筛选':'展开筛选'" :icon="choose?'btnUp':'btnDown'" @call="switchChoose()"></yhm-commonbutton>
        <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initData"></yhm-managersearch>
      </template>

      <template #choose>
        <div v-show="choose" class="buttonBody mptZero">
          <yhm-radiofilter @initData="initChoose('categoryUnit')" title="单位" :content="listCategoryUnit"></yhm-radiofilter>
          <yhm-radiofilter @initData="initChoose('category')" title="账号类型" :content="listCategory"></yhm-radiofilter>
          <yhm-radiofilter @initData="initChoose('nature')" title="账户性质" :content="listNature"></yhm-radiofilter>
          <yhm-radiofilter @initData="initChoose('state')" title="账户状态" :content="listState"></yhm-radiofilter>
        </div>
      </template>

      <!--数据表头-->
      <template #listHead>
        <yhm-managerth style="width: 38px;" title="选择"></yhm-managerth>
        <yhm-managerth style="width: 38px;" title="查看"></yhm-managerth>
        <yhm-managerth title="户名" value="name" ></yhm-managerth>
        <yhm-managerth style="width: 250px" title="账号" value="account" ></yhm-managerth>
        <yhm-managerth style="width: 350px" title="开户行" value="bank" ></yhm-managerth>
      </template>

      <!--数据明细-->
      <template #listBody>
        <tr :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]" v-for="(item,index) in content" :key="index">
          <yhm-manager-td-checkbox :value="item"></yhm-manager-td-checkbox>
          <yhm-manager-td-look @click="add(item.id)"></yhm-manager-td-look>
          <yhm-manager-td :value="item.name"></yhm-manager-td>
          <yhm-manager-td :value="item.accountStr"></yhm-manager-td>
          <yhm-manager-td :value="item.bank"></yhm-manager-td>
        </tr>
      </template>

      <!--数据空提示-->
      <template #empty>
        <span class="m_listNoData" v-show="empty">暂时没有数据</span>
      </template>
      <!--分页控件-->
      <template #pager>
        <yhm-pagination :pager="pager" @initData="initPageData(false)"></yhm-pagination>
      </template>

    </yhm-managerpage>
  </div>

</template>

<script>
  import Qs from 'qs'
  import { selectClick, selectComputedSelected, selectConfirm, selectdbClick, number2chinese } from '@/assets/common.js'
  import { selectItem,managermixin } from '@/assets/manager.js'
  export default {
    name: 'publicAccManager',
    mixins: [managermixin],
    data() {
      return {
        id: '',
        listCategoryUnit: {
          value: '',
          list: []
        },
        listCategory: {
          value: '',
          list: []
        },
        listNature: {
          value: '',
          list: []
        },
        listState: {
          value: '',
          list: []
        },

        empty: true,
      }
    },
    methods:{
      add (id) {
        // 默认设置页面标记是查看
        var isAdd = false
        // 默认设置页面标题为查看信息
        var title = '查看对公账号信息'
        var url='/publicAccountView?id=' + id
        if (!id) { // 当id不存在的时候
          // 设置id为空
          id = ''
          // 设置页面标题为添加信息
          title = '添加对公账号'
          // 设置页面标记为添加
          isAdd = true
          url='/publicAccountForm?id='
        }
        this.$dialog.OpenWindow({
          width: 1050,
          height: 750,
          url:url,
          title:title,
          closeCallBack:(data) =>{
            if (data) {
              if (isAdd) {
                this.lastData = data//接收子页面传的值
              }
              this.initPageData(false)
              // /!*false->非初始化=>!import  true->初始化*!/
            }
          }
        })
      },

      initPageData (initValue) {
        let params = {}

        if (initValue) {
          params = {}
        } else {
          params = {
            categoryUnit: this.listCategoryUnit.value,
            category: this.listCategory.value,
            nature: this.listNature.value,
            state: this.listState.value,
          }
        }
        this.init({
          initValue: initValue,
          url: '/Fin/getPublicAccountVue',
          data: params,
          all: (data) => {
            //不管是不是初始化都需要执行的代码
          },
          init: (data) => {
            //初始化时需要执行的代码
            // 这边初始化筛选信息
            this.listCategoryUnit = data.categoryUnitPsd
            this.listCategory = data.categoryPsd
            this.listNature = data.naturePsd
            this.listState = data.statePsd

          }
        })
      },
    },
    computed: {
      // 检查是否选中
      checkSelect () {
        return function (id) {
          return this.selectValue.indexOf(id) !== -1
        }
      }
    },
    watch: {
      selectValue: {
        handler: function (val, oldval) {
          this.pager.selectCount = val.length
        },
        deep: true
      }
    },
    created () {
    }
  }
</script>

<style scoped>

</style>
