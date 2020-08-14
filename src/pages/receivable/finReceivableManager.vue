<template>
  <div>
    <yhm-managerpage category="1">
      <!--导航条-->
      <template #navigationTab>
        <div  class="menuTabDiv menuTabActive">
          应收账款
        </div>
      </template>

      <!--操作区-->
      <template #operate>
        <yhm-commonbutton :value="choose?'收起筛选':'展开筛选'" :icon="choose?'btnUp':'btnDown'" @call="switchChoose()"></yhm-commonbutton>
        <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initData"></yhm-managersearch>
      </template>

      <!--筛选区-->
      <template #choose>
        <div v-show="choose" class="buttonBody mptZero">
          <yhm-radiofilter :before="stateBefore" @initData="initChoose('state')" title="状态" all="0" :content="stateList"></yhm-radiofilter>
        </div>
      </template>

      <!--数据表头-->
      <template #listHead>
        <yhm-managerth style="width: 40px;" title="选择"></yhm-managerth>
        <yhm-managerth style="width: 40px;" title="查看"></yhm-managerth>
        <yhm-managerth title="欠款方" value="nameID"></yhm-managerth>
        <yhm-managerth style="width: 110px" title="责任人" value="personID"></yhm-managerth>
        <yhm-managerth style="width: 120px" title="发票号" value="invoiceCode"></yhm-managerth>
        <yhm-managerth style="width: 110px" title="欠款金额" value="money"></yhm-managerth>
        <yhm-managerth style="width: 120px;" title="欠款发生日期" value="workDate"></yhm-managerth>
        <yhm-managerth style="width: 120px" title="预计收款日期" value="lastDate"></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="账龄" value="billAge"></yhm-managerth>
        <yhm-managerth style="width: 100px" title="操作"></yhm-managerth>
      </template>
      <template #listBody>
        <tr :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]" v-for="(item,index) in content" :key="index">
          <yhm-manager-td-checkbox :value="item"></yhm-manager-td-checkbox>
          <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>
          <yhm-manager-td :value="item.name"></yhm-manager-td>
          <yhm-manager-td :value="item.person"></yhm-manager-td>
          <yhm-manager-td-center :value="item.invoiceCode"></yhm-manager-td-center>
          <yhm-manager-td-money :value="item.money"></yhm-manager-td-money>
          <yhm-manager-td-date :value="item.workDate"></yhm-manager-td-date>
          <yhm-manager-td-date :value="item.lastDate"></yhm-manager-td-date>
          <yhm-manager-td-center :value="item.billAge+' 天'"></yhm-manager-td-center>
          <yhm-manager-td-operate>
            <yhm-manager-td-operate-button @click="urge(item)" :no-click="item.state === '2'" value="催收" icon="i-btn-urge" color="#2AA70B"></yhm-manager-td-operate-button>
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
    name: 'myReceivableManager',
    mixins: [managermixin],
    data(){
      return{
        content:[],
        lastData:'',
        stateList: {
          value: '0',
          list: []
        },
      }
    },
    methods:{
      listView(item){
        this.$dialog.OpenWindow({
          width: 1050,
          height: 520,
          url:'/finReceivableView?id=' + item.id,
          title:'查看应收账款信息',
          closeCallBack:(data) =>{
            if (data) {
              this.initPageData(false)
            }
          }
        })
      },
      urge(item){
        alert("催收")
      },

      initPageData (initValue) {
        let params = {}
        if (initValue) {
          // 页面初始化是需要的参数
          params = {
            state: this.stateList.value
          }
        } else {
          // 页面非初始化时需要的参数
          params = {
            state: this.stateList.value
          }
        }
        this.init({
          initValue: initValue,
          url: '/Bill/getReceivableManagerAll',
          data: params,
          all: (data) => {
            // 不管是不是初始化都需要执行的代码

          },
          init: (data) => {
            // 初始化时需要执行的代码
            // 这边初始化筛选信息
            this.stateList = data.statePsd
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
