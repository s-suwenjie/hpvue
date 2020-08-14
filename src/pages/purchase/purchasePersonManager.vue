<template>
  <div>
    <yhm-managerpage category="1">
      <!--导航条-->
      <template #navigationTab>
        <router-link class="menuTabDiv menuTabActive" :to="{path:'/home/awaitPurchaseManager'}">采购人员</router-link>
      </template>

      <!--操作区-->
      <template #operate>
        <yhm-commonbutton value="添加" icon="btnAdd" :flicker="true" @call="add" category="one"></yhm-commonbutton>
        <yhm-commonbutton :value="choose?'收起筛选':'展开筛选'" :icon="choose?'btnUp':'btnDown'" @call="switchChoose()"></yhm-commonbutton>
        <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initData"></yhm-managersearch>
      </template>

      <!--数据表头-->
      <template #listHead>
        <yhm-managerth style="width: 40px;" title="选择"></yhm-managerth>
        <yhm-managerth title="采购人员" value="person"></yhm-managerth>
        <yhm-managerth style="width: 120px" title="采购分类" value="categoryPurchase"></yhm-managerth>
        <yhm-managerth style="width: 38px" title="操作"></yhm-managerth>
      </template>
      <template #listBody>
        <tr :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]" v-for="(item,index) in content" :key="index">
          <yhm-manager-td-checkbox :value="item"></yhm-manager-td-checkbox>
          <yhm-manager-td :value="item.person"></yhm-manager-td>
          <yhm-manager-td-psd :list="categoryPurchaseItems" :value="item.categoryPurchase"></yhm-manager-td-psd>
          <yhm-manager-td-operate>
            <yhm-manager-td-operate-button @click="del(item.id)" icon="delete" color="#FF0000" hover-color="#FF0000"></yhm-manager-td-operate-button>
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
  import { managermixin } from '@/assets/manager.js'
  export default {
    name: 'purchasePersonManager',
    mixins: [managermixin],
    data(){
      return{
        categoryPurchaseItems:[],//采购分类
      }
    },
    methods:{
      add() {
        this.$dialog.OpenWindow({
          width: 1050,
          height: 520,
          url:'/purchasePersonForm',
          title:'添加采购人员',
          closeCallBack:(data) =>{
            if (data) {
              this.lastData = data//接收子页面传的值
              this.initPageData(false)
            }
          }
        })
      },
      del(id){
        this.$dialog.confirm({
          width: 250,
          tipValue: '是否删除?',
          btnValueOk: '确定',
          alertImg: 'warn',
          okCallBack: (data) => {
            let params = {
              id: id,
            }
            this.ajaxJson({
              url: '/PersonOffice/purchasePersonDel',
              data: params,
              call: (data) => {
                if (data.type == '0') {
                  this.$dialog.alert({
                    tipValue: data.message,
                    closeCallBack: (data) => {
                      this.initPageData(false)
                    }
                  })
                } else {
                  this.$dialog.alert({
                    alertImg: 'error',
                    tipValue: data.message,
                    closeCallBack: () => {
                    }
                  })
                }
              }
            })
          }
        })
      },

      //初始化页面数据
      initPageData (initValue) {
        let params = {}
        if (initValue) {
          // 页面初始化是需要的参数
          params = {}
        } else {
          // 页面非初始化时需要的参数
          params = {}
        }
        this.init({
          initValue: initValue,
          url: '/PersonOffice/getPurchasePersonManager',
          data: params,
          all: (data) => {
            // 不管是不是初始化都需要执行的代码
          },
          init: (data) => {
            // 初始化时需要执行的代码
            // 这边初始化筛选信息
            this.categoryPurchaseItems = data.categoryPurchaseItems
          }
        })
      }
    },
    created () {

    }
  }
</script>

<style scoped>

</style>
