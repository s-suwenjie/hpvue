<template>
  <div>
    <yhm-managerpage category="1">
      <!--导航条-->
      <template #navigationTab>
        <router-link class="menuTabDiv" :to="{path:'/home/approvalPriorityManager'}">审批优先级</router-link>
        <router-link class="menuTabDiv" :to="{path:'/home/reversalAccountManager'}">冲账人员</router-link>
        <router-link class="menuTabDiv" :to="{path:'/home/boardFeesManager'}">董事会费人员</router-link>
        <router-link class="menuTabDiv" :to="{path:'/home/approvalPersonaliseManager'}">审批定制</router-link>
        <router-link class="menuTabDiv" :to="{path:'/home/insuranceProcessManager'}">保险审批制定</router-link>
        <router-link class="menuTabDiv " :to="{path:'/home/cashRegisterManager'}">收银审批制定</router-link>
        <router-link class="menuTabDiv menuTabActive" :to="{path:'/home/approPriationManager'}">批量拨款审批制定</router-link>
        <router-link class="menuTabDiv" :to="{path:'/home/unionCostsManager'}">工会审批制定</router-link>
        <router-link class="menuTabDiv " :to="{path:'/home/promotionsApproveManager'}">优惠活动审批制定</router-link>
      </template>

      <!--操作区-->
      <template #operate>
        <yhm-commonbutton value="添加人员" icon="btnAdd" :flicker="true" @call="add()"></yhm-commonbutton>
        <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initData"></yhm-managersearch>
      </template>
      <!--数据表头-->
      <template #listHead>
        <yhm-managerth style="width: 38px;" title="选择"></yhm-managerth>
        <yhm-managerth title="名称"></yhm-managerth>
        <yhm-managerth style="width: 200px" title="添加时间" value="insertDate"></yhm-managerth>
        <yhm-managerth style="width: 80px;" title="删除"></yhm-managerth>
      </template>

      <!--数据明细-->
      <template #listBody>
        <tr v-for="(item,index) in content" :key="index" :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]">
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

      <template #pager>
        <yhm-pagination :pager="pager" @initData="initPageData(false)"></yhm-pagination>
      </template>

    </yhm-managerpage>
  </div>
</template>

<script>
  import { managermixin } from '@/assets/manager.js'
  export default {
    name: "approPriationManager",
    mixins: [managermixin],
    data(){
      return {

      }
    },
    methods: {
      add(){
        this.$dialog.OpenWindow({
          width: 1050,
          height: 600,
          url: '/approPriationForm',
          title: '添加批量拨款人员',
          closeCallBack:(data) =>{
            if(data){
              this.lastData = data
              this.initPageData(false)
            }
          }
        })
      },
      del(id){
        this.$dialog.rm({
          width: 300,
          tipValue: '是否删除?',
          btnValueOk: '确定',
          alertImg: 'warn',
          okCallBack: (data) => {
            let params = {
              id: id,
            }
            this.ajaxJson({
              url: '/Com/appropriationDel',
              data: params,
              call: (data) => {
                if (data.type === 0) {
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
          // 页面初始化是需要的参数
          params = {
          }
        } else {
          // 页面非初始化时需要的参数
          params = {
          }
        }
        this.init({
          initValue: initValue,
          url: '/Com/getAppropriationManager',
          data: params,
          all: (data) => {
            // 不管是不是初始化都需要执行的代码
          },
          init: (data) => {
            // 初始化时需要执行的代码
            // 这边初始化筛选信息

          }
        })
      },
    },
    created() {
    }
  }
</script>

<style scoped>

</style>
