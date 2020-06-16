<template>
  <div>
    <yhm-managerpage>
      <!--导航条-->
      <template #navigation>
        <yhm-preview-image :show="previewShow" width="850" height="500" top="100" left="-50" :url="previewImageUrl"></yhm-preview-image>
        财务管理&nbsp;&gt;&nbsp;发票管理&nbsp;&gt;&nbsp;电子发票
      </template>
      <template #operate>
        <!--操作区-->
        <yhm-commonbutton :value="choose?'收起筛选':'展开筛选'" :icon="choose?'btnUp':'btnDown'" @call="switchChoose()"></yhm-commonbutton>
        <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initData"></yhm-managersearch>
      </template>
      <!--筛选区-->
      <template #choose>
        <div v-show="choose" class="buttonBody mptZero">
          <yhm-radiofilter :before="stateBefore" @initData="initChoose('state')" title="状态" :content="listState"></yhm-radiofilter>
        </div>
      </template>
      <!--数据表头-->
      <template #listHead>
        <yhm-managerth style="width: 38px;" title="选择"></yhm-managerth>
        <yhm-managerth style="width: 38px;" title="查看"></yhm-managerth>
        <yhm-managerth title="发票抬头" value="selfNameID"></yhm-managerth>
        <yhm-managerth style="width: 120px;" title="发票代码" value="code"></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="发票号码" value="num"></yhm-managerth>
        <yhm-managerth style="width: 120px;" title="开票日期" value="openDate"></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="发票金额" value="totalMoney"></yhm-managerth>
        <yhm-managerth title="开票单位" value="otherName"></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="所属人员" value="personID"></yhm-managerth>
        <yhm-managerth style="width: 80px;" title="发票照片"></yhm-managerth>
        <yhm-managerth style="width: 90px;" title="发票状态"></yhm-managerth>
        <yhm-managerth style="width: 200px;" title="操作"></yhm-managerth>
      </template>
      <!--数据明细-->
      <template #listBody>
        <tr v-for="(item,index) in content" :key="index" :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]">
          <yhm-manager-td-checkbox :value="item"></yhm-manager-td-checkbox>
          <yhm-manager-td-look @click="add(item.id)"></yhm-manager-td-look>
          <yhm-manager-td :value="item.selfName"></yhm-manager-td>
          <yhm-manager-td-center :value="item.code"></yhm-manager-td-center>
          <yhm-manager-td-center :value="item.num"></yhm-manager-td-center>
          <yhm-manager-td-date :value="item.openDate"></yhm-manager-td-date>
          <yhm-manager-td-money :value="item.totalMoney"></yhm-manager-td-money>
          <yhm-manager-td :tip="true" :value="item.otherName"></yhm-manager-td>
          <yhm-manager-td-center :value="item.person"></yhm-manager-td-center>
          <yhm-manager-td-image :value="item.imgUrl" :tip="true" width="1000" height="600" left="-130" tag="ElectronicInvoice"></yhm-manager-td-image>
          <yhm-manager-td-psd :value="item.state" :list="stateItems"></yhm-manager-td-psd>
          <yhm-manager-td-operate>

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
    name: 'electronicInvoiceManager.vue',
    mixins: [managermixin],
    data() {
      return {
        previewShow: false,
        previewImageUrl: '',
        stateItems: [],

        stateBefore: '0', // 默认选择状态为可以选择，1为不可以选择
        listState: {
          value: '',
          list: []
        },
      }
    },
    methods:{
      //添加
      add (id) {
        this.$dialog.OpenWindow({
          width: 1050,
          height: 670,
          url:'/electronicInvoiceForm?id=' + id,
          title:'查看电子发票信息',
          closeCallBack:(data) =>{
            if (data) {
              this.initPageData(false)
            }
          }
        })
      },

      //初始化
      initPageData (initValue) {
        let params = {}

        if (initValue) {
          params = {}
        } else {
          params = {
            state: this.listState.value
          }
        }
        this.init({
          initValue:initValue,
          url: '/Fin/getElectronicInvoiceManager',
          data:params,
          all:(data) =>{
            //不管是不是初始化都需要执行的代码
          },
          init:(data)=>{
            //初始化时需要执行的代码
            this.stateItems = data.stateItems
            this.listState = data.statePsd
          }
        })
      },
    }
  }
</script>

<style scoped>

</style>
