<template>
  <div>
    <yhm-managerpage>
      <!--导航条-->
      <template #navigation>财务&nbsp;&gt;&nbsp;资金&nbsp;&gt;&nbsp;冲账</template>
      <!--操作区-->
      <template #operate>
        <yhm-commonbutton :value="choose?'收起筛选':'展开筛选'" :icon="choose?'btnUp':'btnDown'" @call="switchChoose()"></yhm-commonbutton>
        <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initData"></yhm-managersearch>
      </template>

      <!--筛选区-->
      <template #choose>
        <div v-show="choose" class="buttonBody mptZero">
          <yhm-radiofilter :before="isRversalBefore" @initData="initChoose('categoryUnit')" title="冲正返还" all="0" :content="isRversalPsd"></yhm-radiofilter>
        </div>
      </template>

      <!--数据表头-->
      <template #listHead>

        <yhm-managerth style="width: 30px;" title="选择"></yhm-managerth>
        <yhm-managerth style="width: 30px;" title="查看"></yhm-managerth>
        <yhm-managerth style="width: 180px;" title="姓名"></yhm-managerth>
        <yhm-managerth style="width: 180px;" title="日期"></yhm-managerth>
        <yhm-managerth style="width: 180px;" title="事由"></yhm-managerth>
        <yhm-managerth style="width: 150px;" title="金额"></yhm-managerth>
        <yhm-managerth title="操作"></yhm-managerth>

      </template>
      <!--数据明细-->
      <template #listBody>
        <tr v-for="(item,index) in content" :key="index" :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]">
          <yhm-manager-td-checkbox :value="item"></yhm-manager-td-checkbox>
          <yhm-manager-td-look @click="add(item)"></yhm-manager-td-look>
          <yhm-manager-td :value="item.person"></yhm-manager-td>
          <yhm-manager-td :value="item.workDate"></yhm-manager-td>
          <yhm-manager-td :value="item.subject"></yhm-manager-td>
          <yhm-manager-td-money :value="item.actualMoney"></yhm-manager-td-money>
          <yhm-manager-td-operate>
            <yhm-manager-td-operate-button :no-click="item.isRversal!=1" @click="rversalReturn(item)" value="冲账返还" icon="i-btn-applicationSm" color="#49a9ea"></yhm-manager-td-operate-button>
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
    name: 'rversalManager',
    mixins: [managermixin],
    data(){
      return{
        isRversal:'',
        pager: { // 分页数据
          total: '', // 数据总条数
          pageSize: 15, // 单页数据条数
          pageIndex: 1, // 当前页码
          selectCount: 0 // 选中数据的条数
        },

        isRversalBefore: '0', // 默认选择状态为可以选择，1为不可以选择
        isRversalPsd: {
          value: '',
          list: []
        },
      }
    },
    methods:{
      add (item) {
        var title = '冲正返还'
        var url =  '/rversalForm?id=' + item.id + '&isRversalString='+item.isRversal
        this.$dialog.OpenWindow({
          width: 1050,
          height: 750,
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
      rversalReturn(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '690',
          title: '冲正返还',
          url: '/bankDetailForm?ownerID=' + item.id +'&bankDetailType=1',
          closeCallBack: (data)=>{
            this.initPageData(false)
          }
        })
       },
      //搜索
      initPageData (initValue) {
        let params = {}

        if (initValue) {
          params = {}
        } else {
          params = {
            isRversal: this.isRversalPsd.value
          }
        }
        this.init({
          initValue:initValue,
          url: '/Fin/getRversalManager',
          data:params,
          all:(data) =>{
            //不管是不是初始化都需要执行的代码
          },
          init:(data)=>{
            //初始化时需要执行的代码
            this.isRversalPsd = data.isRversalPsd
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
