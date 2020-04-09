<template>
  <div>
    <yhm-managerpage :sm-table="true" category="1" isManager="true">

      <!--数据表头-->
      <template #listHead>
        <yhm-managerth style="width: 180px;" title="报销人"></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="类型"></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="金额"></yhm-managerth>
        <yhm-managerth style="width: 200px" title="操作"></yhm-managerth>
      </template>
      <template #listBody>
        <tr v-for="(item,index) in content" :key="index">
          <yhm-manager-td-center :value="item.person"></yhm-manager-td-center>
          <yhm-manager-td-psd :value="item.category" :list="categoryItems" ></yhm-manager-td-psd>
          <yhm-manager-td-money :value="item.money"></yhm-manager-td-money>
          <yhm-manager-td-operate>
            <yhm-manager-td-operate-button icon="icon-applicationSm" value="打印报销单"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button icon="icon-urge" value="拨付资金"></yhm-manager-td-operate-button>
          </yhm-manager-td-operate>
        </tr>
      </template>


      <!--数据空提示-->
      <template #empty>
        <span class="m_listNoData" v-show="empty">暂时没有数据</span>
      </template>

    </yhm-managerpage>
  </div>
</template>

<script>
  import { managermixin } from '@/assets/manager.js'
  export default {
    name: 'batchAllca',
    mixins: [managermixin],
    data(){
      return{

      }
    },
    methods: {
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
          url: '/SysManager/getUsersManager',
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
    created () {

    }
  }
</script>

<style scoped lang="less">
  body{
    overflow: hidden;
  }
</style>
