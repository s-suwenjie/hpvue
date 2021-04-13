<template>
  <div>
    <yhm-managerpage category="1">
      <!--导航条-->
      <template #navigationTab>
        <router-link class="menuTabDiv menuTabActive" :to="{path:'/home/coreWarehouseManager'}">旧件仓库</router-link>
      </template>
      <!--操作区-->
      <template #operate>
        <yhm-table-tip :show="tableTip" :content="tableTipInfo" :column="tableTipColumnInfo" :mouse-control="tableTipControl"></yhm-table-tip>
        <!--<yhm-commonbutton  value="添加" icon="btnAdd" :flicker="true" @call="add()"></yhm-commonbutton>-->
        <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initData"></yhm-managersearch>
      </template>
      <!--筛选区-->
      <template #choose>
        <div v-show="choose" class="buttonBody mptZero">

        </div>
      </template>
      <!--数据表头-->
      <template #listHead>
        <yhm-managerth-check style="width: 40px;" :check="allCheck"></yhm-managerth-check>
        <yhm-managerth style="width: 40px;" title="查看"></yhm-managerth>
        <yhm-managerth  title="适用车型" value="model"></yhm-managerth>
        <yhm-managerth  title="商品名称" value="parts"></yhm-managerth>
        <yhm-managerth  title="规格型号" value="parts"></yhm-managerth>
        <yhm-managerth  title="库存数量" value="number"></yhm-managerth>
        <yhm-managerth  style="width: 120px;" title="操作" ></yhm-managerth>
      </template>

      <!--数据明细-->
      <template #listBody>
        <tr :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]" v-for="(item,index) in content" :key="index">
          <yhm-manager-td-checkbox :value="item"></yhm-manager-td-checkbox>
          <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>
          <yhm-manager-td :value="item.model"></yhm-manager-td>
          <yhm-manager-td :value="item.parts"></yhm-manager-td>
          <yhm-manager-td :value="item.specifications"></yhm-manager-td>
          <yhm-manager-td :value="item.number"></yhm-manager-td>
          <yhm-manager-td-operate>
            <yhm-manager-td-operate-button  value="出库操作" icon="im_copy" color="#FF0000"></yhm-manager-td-operate-button>

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
  import {accAdd,accMul} from '@/assets/common.js'
  import { managermixin } from '@/assets/manager.js'
  export default {
    name: 'coreWarehouseManager',
    mixins: [managermixin],
    data(){
      return{

      }
    },
    methods:{
      listView(item){
          this.$dialog.OpenWindow({
            width: '1050',
            height: '690',
            url:'/coreWarehouseView?id='+item.id,
            title:'查看详情信息',
            closeCallBack:(data) =>{
              if (data) {
                this.initPageData(false)
              }
            }
          })
      },
      //搜索
      initPageData (initValue) {
        let params = {}

        if (initValue) {
          params = {

          }
        } else {
          params = {

          }
        }
        this.init({
          initValue:initValue,
          url: '/dailyoffice/corcRegistration/getCoreWarehouseManager',
          data:params,
          all:(data) =>{
            //不管是不是初始化都需要执行的代码

          },
          init:(data)=>{
            //初始化时需要执行的代码

          }
        })
      },
    },
  }
</script>

<style scoped>

</style>
