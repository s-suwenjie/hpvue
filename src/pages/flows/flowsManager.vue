<template>
  <div>
    <yhm-managerpage>
      <!--导航条-->
      <template #navigation>人力资源&nbsp;&gt;&nbsp;人事管理&nbsp;&gt;&nbsp;流程</template>
      <!--操作区-->
      <template #operate>
        <yhm-commonbutton value="添加" icon="btnAdd" :flicker="true" @call="add()"></yhm-commonbutton>
        <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initData"></yhm-managersearch>
      </template>
      <!--数据表头-->
      <template #listHead>
        <yhm-managerth style="width: 38px;" title="选择"></yhm-managerth>
        <yhm-managerth style="width: 38px;" title="查看"></yhm-managerth>
        <yhm-managerth title="所属单位" value="unitID"></yhm-managerth>
        <yhm-managerth title="流程类型" width="150" value="category"></yhm-managerth>
        <yhm-managerth title="高层审批额度" width="150" value="topQuota"></yhm-managerth>
        <yhm-managerth title="部门无权越级审批" width="150" value="isIumpHighLevelByAmount"></yhm-managerth>
        <yhm-managerth title="高层领导审批额度" width="150" value="highLevel"></yhm-managerth>
        <yhm-managerth style="width: 70px;" title="节点数量"></yhm-managerth>
      </template>
      <!--数据明细-->
      <template #listBody>
        <tr v-for="(item,index) in content" :key="index" :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]">
          <yhm-manager-td-checkbox :value="item"></yhm-manager-td-checkbox>
          <yhm-manager-td-look @click="add(item.id)"></yhm-manager-td-look>
          <yhm-manager-td :value="item.unit"></yhm-manager-td>
          <yhm-manager-td :value="item.categoryShowName"></yhm-manager-td>
          <yhm-manager-td-center :value="item.topQuota"></yhm-manager-td-center>
          <yhm-manager-td-yesno  :value="item.isIumpHighLevelByAmount"></yhm-manager-td-yesno>
          <yhm-manager-td-center :value="item.highLevel"></yhm-manager-td-center>
          <yhm-manager-td-center :value="item.stepCount"></yhm-manager-td-center>
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
  mixins: [managermixin],
  data () {
    return {

    }
  },
  methods: {
    // 页面添加和查看事件
    add (id) {
      // 默认设置页面标记是查看
      var isAdd = false
      // 默认设置页面标题为查看信息
      var title = '查看流程信息'
      if (!id) { // 当id不存在的时候
        // 设置id为空
        id = ''
        // 设置页面标题为添加信息
        title = '添加流程信息'
        // 设置页面标记为添加
        isAdd = true
      }
      this.$dialog.OpenWindow({
        width: 1050,
        height: 760,
        url: '/flowsForm?id=' + id,
        title: title,
        closeCallBack: (data) => {
          if (data) {
            if (isAdd) {
              this.lastData = data
            }
            this.initPageData(false)
          }
        }
      })
    },
    initPageData (initValue) {
      let params = {}
      if (initValue) {
        // 页面初始化是需要的参数
        params = {}
      } else {
        // 页面非初始化时需要的参数
        params = {}
      }
      this.init({
        initValue: initValue,
        url: '/PersonOffice/getFlowsManager',
        data: params,
        all: (data) => {
          // 不管是不是初始化都需要执行的代码
        },
        init: (data) => {
          // 初始化时需要执行的代码
        }
      })
    }
  }

}
</script>
<style scoped lang="less">

</style>
