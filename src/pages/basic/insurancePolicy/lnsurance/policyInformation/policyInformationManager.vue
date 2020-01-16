<template>
  <div>
    <yhm-managerpage category="1">
      <!--导航条-->
      <template #navigationTab>
        <router-link class="menuTabDiv menuTabActive" :to="{path:'/home/lnsurance/policyInformationManager'}">保单信息</router-link>
        <router-link class="menuTabDiv " :to="{path:'/home/lnsurance/insuranceCompanyManager'}">保险公司</router-link>
        <router-link class="menuTabDiv " :to="{path:'/home/lnsurance/financialInformationManager'}">财务信息</router-link>
      </template>
      <!--操作区-->
      <template #operate>
        <yhm-commonbutton  value="添加" icon="btnAdd" :flicker="true" @call="add()"></yhm-commonbutton>
        <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initPageData(false)"></yhm-managersearch>
      </template>
      <!--数据表头-->
      <template #listHead>
      <yhm-managerth style="width: 40px;" title="选择"></yhm-managerth>
      <yhm-managerth style="width: 40px;" title="查看"></yhm-managerth>
      <yhm-managerth title="商业险金额" value="businessAmount"></yhm-managerth>
      <yhm-managerth title="交强险金额" value="strongAmount"></yhm-managerth>
      <yhm-managerth title="车船税金额" value="travelTax"></yhm-managerth>
      <yhm-managerth title="投保次数" value="insuredTimes"></yhm-managerth>
      <yhm-managerth title="付款方式" value="payment"></yhm-managerth>
      <yhm-managerth title="续保渠道" value="renewal"></yhm-managerth>
      <yhm-managerth title="送单方式" value="delivery"></yhm-managerth>
      <yhm-managerth title="投保日期" value="insuredDate"></yhm-managerth>
      <yhm-managerth style="width: 60px;" title="删除"></yhm-managerth>
    </template>

      <!--数据明细-->
      <template #listBody>
        <tr :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]" v-for="(item,index) in content" :key="index">
          <yhm-manager-td-checkbox :value="item"></yhm-manager-td-checkbox>
          <yhm-manager-td-look @click="add(item.id)"></yhm-manager-td-look>
          <yhm-manager-td-money :value="item.businessAmount"></yhm-manager-td-money>
          <yhm-manager-td-money :value="item.strongAmount"></yhm-manager-td-money>
          <yhm-manager-td-money :value="item.travelTax"></yhm-manager-td-money>
          <yhm-manager-td :value="item.insuredTimes"></yhm-manager-td>
          <yhm-manager-td :value="item.payment"></yhm-manager-td>
          <yhm-manager-td :value="item.renewal"></yhm-manager-td>
          <yhm-manager-td :value="item.delivery"></yhm-manager-td>
          <yhm-manager-td-date :value="item.insuredDate"></yhm-manager-td-date>
          <yhm-manager-td-operate>
            <yhm-manager-td-operate-button  @click="del(item.id)" value="删除" icon="delete" color="#FF0000"></yhm-manager-td-operate-button>
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
    name: 'policyInformationManager',
    mixins: [managermixin],
    data(){
      return{

      }
    },
    methods:{
      //添加
      add (id) {
        // 默认设置页面标记是查看
        var isAdd = false
        // 默认设置页面标题为查看信息
        var title = '查看保单信息'
        if (!id) { // 当id不存在的时候
          // 设置id为空
          id = ''
          // 设置页面标题为添加信息
          title = '添加保单信息'
          // 设置页面标记为添加
          isAdd = true
        }
        this.$dialog.OpenWindow({
          width: '1050',
          height: '780',
          url:'/policyInformationForm?id=' + id,
          title:title,
          closeCallBack:(data) =>{
            if (data) {
              if (isAdd) {
                this.lastData = data//接收子页面传的值
              }
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
              url: '/Basic/delPolicyInformation',
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
      //搜索
      initPageData (initValue) {
        let params = {}

        if (initValue) {
          params = {}
        } else {
          params = {}
        }
        this.init({
          initValue:initValue,
          url: '/Basic/getPolicyInformationManager',
          data:params,
          all:(data) =>{
            //不管是不是初始化都需要执行的代码
          },
          init:(data)=>{
            //初始化时需要执行的代码
          }
        })
      },
      //选择
      selectEvent (data) {
        this.selectValue = selectItem(this.selectValue, data)
      },
    }
  }
</script>

<style scoped>

</style>
