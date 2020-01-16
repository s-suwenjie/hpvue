<template>
  <div>
    <yhm-managerpage>
      <!--导航条-->

      <template #navigation>财务管理&nbsp;&gt;&nbsp;账号&nbsp;&gt;&nbsp;对私账号</template>

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
          <yhm-radiofilter @initData="initChoose('state')" title="账户状态" :content="listState"></yhm-radiofilter>
        </div>
      </template>

      <!--数据表头-->
      <template #listHead>
        <yhm-managerth style="width: 38px;" title="选择"></yhm-managerth>
        <yhm-managerth style="width: 38px;" title="查看"></yhm-managerth>
        <yhm-managerth style="width: 250px" title="户名" value="person"></yhm-managerth>
        <yhm-managerth style="width: 250px" title="账号" value="account"></yhm-managerth>
        <yhm-managerth style="width: 250px" title="开户行" value="bank"></yhm-managerth>
        <yhm-managerth style="width: 110px" title="单位分类" value="categoryUnitVal"></yhm-managerth>
        <yhm-managerth style="width: 110px" title="状态" value="stateVal"></yhm-managerth>

        <yhm-managerth title="操作"></yhm-managerth>
      </template>

      <!--数据明细-->
      <template #listBody>
        <tr :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]" v-for="(item,index) in content" :key="index">
          <yhm-manager-td-checkbox :value="item"></yhm-manager-td-checkbox>
          <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>
          <yhm-manager-td :value="item.person"></yhm-manager-td>
          <yhm-manager-td :value="item.account"></yhm-manager-td>
          <yhm-manager-td :value="item.bank"></yhm-manager-td>
          <yhm-manager-td-center :value="item.categoryUnitVal"></yhm-manager-td-center>
          <yhm-manager-td-center :value="item.stateVal"></yhm-manager-td-center>
          <yhm-manager-td-operate>
            <yhm-manager-td-operate-button :no-click="item.state===1 || item.state===2" @click="del(item)" value="作废" icon="i-btn-applicationSm" color="#49a9ea"></yhm-manager-td-operate-button>
          </yhm-manager-td-operate>
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
      del(item){
        if(item.id){
          this.$dialog.confirm({
            width: '250',
            alertImg: 'warn',
            tipValue: '是否作废？',
            okCallBack: (data)=>{
              let params = {
                id: item.id
              }
              this.ajaxJson({
               url: '/Fin/privateAccountDelJson',
               data: params,
               call: (data)=>{
                 if (data.type === 0) {
                   this.$dialog.alert({
                     tipValue: data.message,
                     closeCallBack: () => {
                       this.initPageData(false);
                     }
                   })
                 }else if(data.type === 1){
                   this.$dialog.alert({
                     alertImg:'warn',
                     tipValue: data.message
                   })
                 }
               }
              })
            }
          })
        }
      },
      // 查看对私账号
      listView(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '400',
          title: '查看对私账号信息',
          url:'/privateAccountView?id=' + item.id,
          closeCallBack: (data)=>{
            if(data){
              this.initPageData(false)
            }
          }
        })
      },
      // 添加对私账号
      add () {
        this.$dialog.OpenWindow({
          width: '1050',
          height: '500',
          url:'/privateAccountForm',
          title:'添加对私账号',
          closeCallBack:(data) =>{
            if (data) {
              this.lastData = data
              this.initPageData(false)
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
            state: this.listState.value,
          }
        }
        this.init({
          initValue: initValue,
          url: '/Fin/getPrivateAccountVue',
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
