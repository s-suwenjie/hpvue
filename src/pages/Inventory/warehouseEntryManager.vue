<template>
  <div>
    <yhm-managerpage>
      <!--导航条-->
      <template #navigation>业务管理&nbsp;&gt;&nbsp;库存管理&nbsp;&gt;&nbsp;入库管理</template>

      <!--操作区-->
      <template #operate>
        <yhm-commonbutton value="添加入库信息" icon="btnAdd" :flicker="true" @call="add" category="one"></yhm-commonbutton>
<!--        <yhm-commonbutton :value="choose?'收起筛选':'展开筛选'" :icon="choose?'btnUp':'btnDown'" @call="switchChoose()"></yhm-commonbutton>-->
        <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initData"></yhm-managersearch>
      </template>

      <!--筛选区-->
<!--      <template #choose>-->
<!--        <div v-show="choose" class="buttonBody mptZero">-->
<!--          <yhm-radiofilter :before="stateBefore" @initData="initChoose('state')" title="状态" all="0" :content="stateList"></yhm-radiofilter>-->
<!--        </div>-->
<!--      </template>-->

      <!--数据表头-->
      <template #listHead>
        <yhm-managerth style="width: 40px;" title="选择"></yhm-managerth>
        <yhm-managerth style="width: 40px;" title="查看"></yhm-managerth>
        <yhm-managerth title="供应商" value="unitID"></yhm-managerth>
        <yhm-managerth style="width: 120px;" title="入库日期" value="workDate"></yhm-managerth>
        <yhm-managerth style="width: 125px;" title="入库编号" value="code"></yhm-managerth>
        <yhm-managerth style="width: 110px" title="总金额" value="money"></yhm-managerth>
        <yhm-managerth style="width: 80px;" title="经办人" value="personID"></yhm-managerth>
        <yhm-managerth style="width: 200px" title="备注"></yhm-managerth>
<!--        <yhm-managerth style="width: 100px" title="操作"></yhm-managerth>-->
      </template>
      <template #listBody>
        <tr :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]" v-for="(item,index) in content" :key="index">
          <yhm-manager-td-checkbox :value="item"></yhm-manager-td-checkbox>
          <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>
          <yhm-manager-td :value="item.unit"></yhm-manager-td>
          <yhm-manager-td-date :value="item.workDate"></yhm-manager-td-date>
          <yhm-manager-td :value="item.code"></yhm-manager-td>
          <yhm-manager-td-money :value="item.money"></yhm-manager-td-money>
          <yhm-manager-td :value="item.person"></yhm-manager-td>
          <yhm-manager-td :value="item.remark"></yhm-manager-td>
<!--          <yhm-manager-td-operate>-->

<!--          </yhm-manager-td-operate>-->
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
    name: 'warehouseEntryManager',
    mixins: [managermixin],
    data(){
      return{
        content:[],
        lastData:'',
        // stateList: {
        //   value: '0',
        //   list: []
        // },
      }
    },
    methods:{
      add() {
        this.$dialog.OpenWindow({
          width: 1050,
          height: 720,
          url:'/warehouseEntryForm',
          title:'添加入库信息',
          closeCallBack:(data) =>{
            if (data) {
              this.lastData = data//接收子页面传的值
              this.initPageData(false)
            }
          }
        })
      },
      listView(item){
        if(false){
          this.$dialog.OpenWindow({
            width: 1050,
            height: 720,
            url:'/warehouseEntryForm?id=' + item.id,
            title:'查看入库信息',
            closeCallBack:(data) =>{
              if (data) {
                this.initPageData(false)
              }
            }
          })
        }
        else{
          this.$dialog.OpenWindow({
            width: 1050,
            height: 520,
            url:'/warehouseEntryView?id=' + item.id,
            title:'查看入库信息'
          })

        }
      },

      initPageData (initValue) {
        let params = {}
        if (initValue) {
          // 页面初始化是需要的参数
          params = {
            //state: this.stateList.value
          }
        } else {
          // 页面非初始化时需要的参数
          params = {
            //state: this.stateList.value
          }
        }
        this.init({
          initValue: initValue,
          url: '/Basic/getWarehouseEntryManager',
          data: params,
          all: (data) => {
            // 不管是不是初始化都需要执行的代码

          },
          init: (data) => {
            // 初始化时需要执行的代码
            // 这边初始化筛选信息
            //this.stateList = data.statePsd
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
