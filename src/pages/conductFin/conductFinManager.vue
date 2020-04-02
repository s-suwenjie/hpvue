<template>
  <div>
    <yhm-managerpage>

      <template #navigation>财务管理&nbsp;&gt;&nbsp;投资&nbsp;&gt;&nbsp;理财管理</template>
      <template #operate>
        <yhm-commonbutton value="添加" icon="btnAdd" :flicker="true" @call="add()"></yhm-commonbutton>
<!--        <yhm-commonbutton :value="choose?'收起筛选':'展开筛选'" :icon="choose?'btnUp':'btnDown'" @call="switchChoose()"></yhm-commonbutton>-->
        <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initData"></yhm-managersearch>
        <yhm-radiofilter :before="stateBefore" @initData="initChoose('categoryUnit')" title="状态" :content="listState"></yhm-radiofilter>

      </template>

<!--      <template #choose>-->
<!--        <div v-show="choose" class="buttonBody mptZero">-->
<!--          <yhm-radiofilter @initData="initChoose('state')" title="状态" :content="listCategory"></yhm-radiofilter>-->
<!--        </div>-->
<!--      </template>-->

      <!--数据表头-->
      <template #listHead>
        <yhm-managerth style="width: 38px;" title="选择"></yhm-managerth>
        <yhm-managerth style="width: 38px;" title="查看"></yhm-managerth>
        <yhm-managerth style="width: 220px" title="名称" value="name"></yhm-managerth>
        <yhm-managerth title="账号" value="account"></yhm-managerth>
        <yhm-managerth style="width: 120px;" title="金额" value="money"></yhm-managerth>
        <yhm-managerth style="width: 140px" title="开始日期" value="startDate"></yhm-managerth>
        <yhm-managerth style="width: 140px" title="结束日期" value="endDate"></yhm-managerth>
        <yhm-managerth style="width: 120px;" title="状态"></yhm-managerth>
        <yhm-managerth style="width: 240px;" title="操作"></yhm-managerth>
      </template>

      <!--数据明细-->
      <template #listBody>
        <tr :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]" v-for="(item,index) in content" :key="index">
          <yhm-manager-td-checkbox :value="item"></yhm-manager-td-checkbox>
          <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>
          <yhm-manager-td :value="item.name"></yhm-manager-td>
          <yhm-manager-td :value="item.account"></yhm-manager-td>
          <yhm-manager-td-money :value="item.money"></yhm-manager-td-money>
          <yhm-manager-td-date :value="item.startDate"></yhm-manager-td-date>
          <yhm-manager-td-date :value="item.endDate"></yhm-manager-td-date>
          <yhm-manager-td-psd :value="item.state" :list="stateItems"></yhm-manager-td-psd>
          <yhm-manager-td-operate>
            <yhm-manager-td-operate-button :no-click="item.state !== '0'" @click="tranPaymentEvent(item)" value="转款" icon="i-tranPayment" color="#49a9ea"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button :no-click="item.state !== '2' || item.stateA === '2'" @click="redeemEvent(item)" value="赎回本金" icon="i-redeem" color="#2aa70b"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button :no-click="item.state !== '2' || item.stateB === '1'" @click="interestEntry(item)" value="利息入账" icon="i-interest" color="#c700df"></yhm-manager-td-operate-button>
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
    name: 'conductFinManager',
    mixins: [managermixin],
    data(){
      return{
        value: '',
        list: [],
        stateBefore: '0', // 默认选择状态为可以选择，1为不可以选择,
        listState: {
          value: '',
          list: []
        },
        stateItems: []
      }
    },
    methods: {
      add(){
        this.$dialog.OpenWindow({
          width: 1050,
          height: 600,
          url: '/conductFinForm',
          title: '添加理财产品',
          closeCallBack: (data) => {
            if(data){
              this.initPageData(false)
            }
          }
        })
      },
      listView(item){
        this.$dialog.OpenWindow({
          width: 1050,
          height: 600,
          url: '/conductFinView?id=' + item.id + '&state=' + item.state,
          title: '查看理财产品',
          closeCallBack: (data) => {
            if(data){
              this.initPageData(false)
            }
          }
        })
      },
      /* 转款 */
      tranPaymentEvent(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '690',
          title: '拨付资金',
          url: '/bankDetailForm?ownerID=' + item.id +'&bankDetailType=8&directionBefore=1',
          closeCallBack: (data)=>{
            if(data){
              this.initPageData(false)
            }
          }
        })
      },
      /* 赎回本金 */
      redeemEvent(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '690',
          title: '拨付资金',
          url: '/bankDetailForm?ownerID=' + item.id +'&bankDetailType=9&directionBefore=1',
          closeCallBack: (data)=>{
            if(data){
              this.initPageData(false)
            }
          }
        })
      },
      /* 利息入账 */
      interestEntry(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '690',
          title: '拨付资金',
          url: '/bankDetailForm?ownerID=' + item.id +'&bankDetailType=10&directionBefore=1',
          closeCallBack: (data)=>{
            if(data){
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
            init: true,
            state: '1'
          }
        } else {
          // 页面非初始化时需要的参数
          params = {
            state: this.listState.value,
            init: false
          }
        }
        this.init({
          initValue: initValue,
          url: '/Fin/getBankProductManager',
          data: params,
          all: (data) => {
            // 不管是不是初始化都需要执行的代码

          },
          init: (data) => {
            // 初始化时需要执行的代码
            // 这边初始化筛选信息
            this.listState = data.statePsd
            this.stateItems = data.stateItems
            // this.listCategory=data.categoryPsd
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
