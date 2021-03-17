<template>
  <div>
    <yhm-managerpage category="1">
      <!--导航条-->
      <template #navigationTab>
        <router-link class="menuTabDiv" :to="{path:'/home/approvalPriorityManager'}">审批优先级</router-link>
        <router-link class="menuTabDiv menuTabActive" :to="{path:'/home/reversalAccountManager'}">冲账人员</router-link>
        <router-link class="menuTabDiv" :to="{path:'/home/boardFeesManager'}">董事会费人员</router-link>
        <router-link class="menuTabDiv" :to="{path:'/home/approvalPersonaliseManager'}">审批定制</router-link>
        <router-link class="menuTabDiv " :to="{path:'/home/insuranceProcessManager'}">保险审批制定</router-link>
        <router-link class="menuTabDiv " :to="{path:'/home/cashRegisterManager'}">收银审批制定</router-link>
        <router-link class="menuTabDiv " :to="{path:'/home/approPriationManager'}">批量拨款审批制定</router-link>
        <router-link class="menuTabDiv " :to="{path:'/home/unionCostsManager'}">工会审批制定</router-link>
        <router-link class="menuTabDiv " :to="{path:'/home/promotionsApproveManager'}">优惠活动审批制定</router-link>

      </template>
      <template #operate>
        <yhm-commonbutton value="添加人员" icon="btnAdd" :flicker="true" @call="add()"></yhm-commonbutton>
        <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initData"></yhm-managersearch>
      </template>
      <!--数据表头-->
      <template #listHead>
        <yhm-managerth style="width: 38px;" title="选择"></yhm-managerth>
        <yhm-managerth title="姓名" value="unit" ></yhm-managerth>
        <yhm-managerth style="width: 200px" title="添加时间" value="insertDate"></yhm-managerth>
        <yhm-managerth style="width: 80px;" title="删除"></yhm-managerth>

      </template>
      <!--数据明细-->
      <template #listBody>
        <tr :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]" v-for="(item,index) in content" :key="index">
          <yhm-manager-td-checkbox :value="item"></yhm-manager-td-checkbox>
          <yhm-manager-td :value="item.person"></yhm-manager-td>
          <yhm-manager-td-date :value="item.insertDate"></yhm-manager-td-date>
          <yhm-manager-td-operate>
            <yhm-manager-td-operate-button @click="del(item.id)" value="删除" icon="delete" color="#FF0000" hover-color="#FF0000"></yhm-manager-td-operate-button>
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
  import Qs from 'qs'
  import { selectClick, selectComputedSelected, selectConfirm, selectdbClick, number2chinese } from '@/assets/common.js'
  import { selectItem,managermixin } from '@/assets/manager.js'
  export default {
    name: 'reversalAccountManager',
    mixins: [managermixin],
    data () {
      return {
        index:'',
        indexNum: '',

        unit: false,
        /*stateVal: false,*/

        pager: { // 分页数据
          total: '', // 数据总条数
          pageSize: 15, // 单页数据条数
          pageIndex: 1, // 当前页码
          selectCount: 0 // 选中数据的条数
        },
        stateBefore: '0', // 默认选择状态为可以选择，1为不可以选择
        money:'',
        beforeMoney: ''
        /*listIsDel: {
          value: '',
          list: []
        },*/
      }
    },
    methods: {
      add (id) {
        // 默认设置页面标记是查看
        var isAdd = false
        // 默认设置页面标题为查看信息
        var title = '添加冲账人'
        var url = '/reversalAccountForm?id='
        this.$dialog.OpenWindow({
          width: 1050,
          height: 550,
          url: url,
          title: title,
          closeCallBack: (data) => {
            if (data) {
              this.lastData = data
              this.initPageData(false)
              /*false->非初始化=>!import  true->初始化*/
            }
          }
        })
      },
      del(id){
        this.$dialog.confirm({
          width: 300,
          tipValue: '是否删除?',
          btnValueOk: '确定',
          alertImg: 'warn',
          okCallBack: (data) => {
            let params = {
              id: id,
            }
            this.ajaxJson({
              url: '/Com/rversalAccountDel',
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
      initPageData (initValue) {
        let params = {}
        if (initValue) {
          params = {}
        } else {
          params = {
            /*isDel: this.listIsDel.value*/
          }
        }
        this.init({
          initValue: initValue,
          url: '/Com/getRversalAccountManager',
          data: params,
          all: (data) => {
            //不管是不是初始化都需要执行的代码
            // this.money = data.money
            // this.beforeMoney = data.money
          },
          init: (data) => {
            //初始化时需要执行的代码
            // 这边初始化筛选信息
          }
        })
      },
    }
  }
</script>

<style scoped>

</style>
