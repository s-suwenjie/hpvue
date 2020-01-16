<template>
  <div class="f_main mb16">
    <yhm-view-body>
      <template #title>基本信息</template>
      <template #body>
        <yhm-view-control category="2" title="申请日期" content="好3你好3你好3你你好3你你好3你你好3你你好3你你好3你你好3你你好3你你好3你你好3你你好3你你好3你"></yhm-view-control>
        <yhm-view-control type="date" title="申请日期" content="2019-03-03"></yhm-view-control>
        <yhm-view-control type="date" title="申请日期" content="2019-03-01"></yhm-view-control>
        <yhm-view-control type="money" title="申请日期" content="123456789" color="#4BB414"></yhm-view-control>
        <yhm-view-control title="申请日期" content="ABC"></yhm-view-control>
        <yhm-view-control title="申请日期" content="好3你好3你好3你你好3你你好3你你好3你你好3你你好3你你好3你你好3你你好3你你好3你你好3你你好3你"></yhm-view-control>
        <yhm-view-control title="申请日期" content="你好3你好"></yhm-view-control>
        <yhm-view-control category="2" title="申请日期" content="好3你好3你好3你你好3你你好3你你好3你你好3你你好3你你好3你你好3你你好3你你好3你你好3你你好3你"></yhm-view-control>
        <yhm-view-control title="申请日期" content="你好3你好"></yhm-view-control>
        <yhm-view-control category="3" title="申请日期" type="files" :content="files"></yhm-view-control>
        <yhm-view-control category="3" title="部门分配" type="text-money" :content="departmentDetails"></yhm-view-control>
      </template>
    </yhm-view-body>
    <div class="f_split"></div>

    <yhm-view-tab>
      <template #tab>
        <yhm-view-tab-button :list="tabState" :index="0">基础信息1</yhm-view-tab-button>
        <yhm-view-tab-button :list="tabState" :index="1">基础信息2</yhm-view-tab-button>
      </template>
      <template #content>
        <yhm-view-tab-content v-show="tabState[0].select">
          <yhm-view-control category="2" title="申请日期" content="好3你好3你好3你你好3你你好3你你好3你你好3你你好3你你好3你你好3你你好3你你好3你你好3你你好3你"></yhm-view-control>
          <yhm-view-control type="date" title="申请日期" content="2019-03-03"></yhm-view-control>
          <yhm-view-control type="date" title="申请日期" content="2019-03-01"></yhm-view-control>
          <yhm-view-control type="money" title="申请日期" content="123456789" color="#4BB414"></yhm-view-control>
          <yhm-view-control title="申请日期" content="ABC"></yhm-view-control>
        </yhm-view-tab-content>
        <yhm-view-tab-list :customize="true" :pager="false" v-show="tabState[1].select">
            <template #listHead>
              <yhm-managerth style="width: 38px" title="查看"></yhm-managerth>
              <yhm-managerth style="width: 70px" title="步骤"></yhm-managerth>
              <yhm-managerth title="审批类型"></yhm-managerth>
              <yhm-managerth style="width: 130px" title="节点名称"></yhm-managerth>
              <yhm-managerth style="width: 80px" title="状态值"></yhm-managerth>
              <yhm-managerth style="width: 100px" title="是否允许驳回"></yhm-managerth>
              <yhm-managerth style="width: 100px" title="是否需要审批"></yhm-managerth>
              <yhm-managerth style="width: 130px" title="驳回节点名称"></yhm-managerth>
              <yhm-managerth style="width: 80px" title="状态值"></yhm-managerth>
              <yhm-managerth style="width: 38px" title="排序"></yhm-managerth>
              <yhm-managerth style="width: 38px" title="删除"></yhm-managerth>
            </template>
            <template #listBody>

            </template>
            <template #empty>
              <span class="m_listNoData" v-show="empty">暂时没有数据</span>
            </template>
            <template #pager>
              <yhm-pagination :pager="pager" @initData="initPageData(false)"></yhm-pagination>
            </template>
            <template #customize>
              <yhm-view-control title="申请日期" content="你好3你好"></yhm-view-control>
              <yhm-view-control title="申请日期" content="你好3你好"></yhm-view-control>
              <yhm-view-control title="申请日期" content="你好3你好"></yhm-view-control>
            </template>
        </yhm-view-tab-list>
      </template>

    </yhm-view-tab>
  </div>
</template>

<script>
  import { viewmixin } from '@/assets/view.js'
  export default {
    name: 'electronicInvoiceView',
    mixins: [viewmixin],
    data(){
      return {
        tabState:[{select:true},{select:false}],

        empty:true,
        pager: {
          total: 0, // 总条数
          pageSize: 15, // 每页条数
          pageIndex: 1, // 当前页码
          selectCount: 0 // 选中条数
        },

        departmentDetails:[
          {
            id: "A761841C-F0B7-4431-B276-83ABA35479D1",
            insertDate: "2019-11-29",
            ownerID: "8FE61666-C350-48E9-8226-4281DFF5D56A",
            selectID: "8F3BDAE2-418B-430F-958B-932C328139B7",
            selectValue: "经营管理部",
            value: "3"
          },
          {
            id: "A761841C-F0B7-4431-B276-83ABA35479D1",
            insertDate: "2019-11-29",
            ownerID: "8FE61666-C350-48E9-8226-4281DFF5D56A",
            selectID: "8F3BDAE2-418B-430F-958B-932C328139B7",
            selectValue: "经营管理部",
            value: "3"
          }
        ],

        files:[
          {
            category: "",
            id: "18AE0D53-23BC-4984-A85B-C05FC29556B2",
            image: "1",
            insertDate: "2019-11-29",
            isEdit: "0",
            ownerID: "A6CC155C-68E4-4222-A88E-8B1D2BC3AFED",
            showName: "10月完税证明",
            storeName: "CD00E57C-BB90-46B6-AD90-7DD62C0B098B_10月完税证明.jpg",
            suffix: "JPG",
            tag: "payment"
          },
          {
            category: "",
            id: "5B0B3379-23BE-4CD6-9314-4C467432CB5B",
            image: "1",
            insertDate: "2019-11-29",
            isEdit: "0",
            ownerID: "A6CC155C-68E4-4222-A88E-8B1D2BC3AFED",
            showName: "10月提成表",
            storeName: "74061CAB-4C39-429F-BECC-AC647833D13E_10月提成表.jpg",
            suffix: "JPG",
            tag: "payment"
          },
          {
            category: "",
            id: "5B974011-FC47-496E-AF1C-1912F3EC01C9",
            image: "1",
            insertDate: "2019-11-29",
            isEdit: "0",
            ownerID: "A6CC155C-68E4-4222-A88E-8B1D2BC3AFED",
            showName: "10月发票",
            storeName: "CCC79D88-AFAB-4D72-841D-9C7643C8B94E_10月发票.jpg",
            suffix: "JPG",
            tag: "payment",
          },
          {
            category: "",
            id: "30BF0FC5-E035-4224-A4A4-F6FC124024E9",
            image: "0",
            insertDate: "2019-11-28",
            isEdit: "0",
            ownerID: "FBA5D306-F6FC-4FD1-A99D-0AFD4E1098AD",
            showName: "ZARCALBN9J7B87020",
            storeName: "103BA715-135B-4087-A5E7-920D8728D540_ZARCALBN9J7B87020.pdf",
            suffix: "PDF",
            tag: "payment"
          }
        ]
      }
    }
  }
</script>

<style scoped>

</style>
