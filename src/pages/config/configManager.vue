<template>
  <div>
    <yhm-managerpage>
      <!--导航条-->
      <template #navigation>系统&nbsp;&gt;&nbsp;系统管理&nbsp;&gt;&nbsp;设置中心</template>
      <!--操作区-->
      <template #operate>
        <yhm-commonbutton value="添加" icon="btnAdd" :flicker="true" @call="add()"></yhm-commonbutton>
        <yhm-commonbutton value="打印" icon="btnAdd" :flicker="true" @call="print"></yhm-commonbutton>
        <yhm-commonbutton value="提交" icon="btnAdd" :flicker="true" @call="submitEvent"></yhm-commonbutton>
        <yhm-commonbutton value="获取流程" icon="btnAdd" :flicker="true" @call="getFlowsEvent"></yhm-commonbutton>
        <yhm-commonbutton value="通过审批" icon="btnAdd" :flicker="true" @call="yesEvent"></yhm-commonbutton>
        <yhm-commonbutton value="测试" icon="btnAdd" :flicker="true" @call="test"></yhm-commonbutton>
        <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initData"></yhm-managersearch>
      </template>

      <!--数据表头-->
      <template #listHead>
        <yhm-managerth title="选择" width="40"></yhm-managerth>
        <yhm-managerth title="查看" width="40"></yhm-managerth>
        <yhm-managerth title="键" width="200" value="name"></yhm-managerth>
        <yhm-managerth title="值" value="value"></yhm-managerth>
      </template>

      <!--数据明细-->
      <template #listBody>
        <tr v-for="(item,index) in content" :key="index" :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]">
          <yhm-manager-td-checkbox :value="item"></yhm-manager-td-checkbox>
          <yhm-manager-td-look @click="add(item.id)"></yhm-manager-td-look>
          <yhm-manager-td :value="item.name"></yhm-manager-td>
          <yhm-manager-td :value="item.value"></yhm-manager-td>
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
    name: 'configManager',
    mixins: [managermixin],
    methods: {
      test(){
        this.ajaxJson({
          url: '/sys/approve/test',
          // data: {
          //   id:'E82E9B8A-211F-4D0B-97D2-10EA01860891',      //快递单ID
          //   category:4, //快递
          //   remark:'我统一了' //申请人ID
          // },
          call: (data) => {
            console.log(data)
          }
        })
      },
      yesEvent(){
        this.ajaxJson({
          url: '/sys/approve/yes',
          data: {
            id:'E82E9B8A-211F-4D0B-97D2-10EA01860891',      //快递单ID
            category:4, //快递
            remark:'我统一了' //申请人ID
          },
          call: (data) => {
            console.log(data)
          }
        })
      },
      getFlowsEvent(){
        this.ajaxJson({
          url: '/sys/approve/feign/getFlows',
          data: {
            id:'E65E5F85-65C2-4C78-BB0B-B5F78D73814C',      //快递单ID
            ownerID:'AB9E2ECD-10D4-4B29-B7E4-655BF46F59D1', //单位ID
            personID:'E24F22F2-96F1-45B2-AFF9-1BE43E1EEB42' //申请人ID
          },
          call: (data) => {
            console.log(data)
          }
        })
      },
      submitEvent(){
        this.ajaxJson({
          url: '/sys/approve/submit',
          data: {
            id:'111',      //快递单ID
            category:4,   //审批类型
            // personID:'C264BB17-57EF-4268-8730-C92B25CF11EF', //申请人ID(彭爽)
            // personID:'846DAF28-4DF8-4D69-B021-67F3BD35B017',//秦光辉
            // personID:'5FD1C5AD-D062-4519-8019-7B4D676F7F65', //申请人ID（张德凡）
            // personID:'62B8747C-3016-4EBD-B922-7C535BCE75F2',//李光辉
            // personID:'D0133EDE-F8F2-4CC4-A3FB-A4CDDC8B407A',//张健
            // personID:'45DD68A9-3832-44FC-A5DC-7E2508361386',//王强
            personID:'51AC402F-FE9C-4FE9-B747-8466CE0CFB65',//王佳佳
            unitID:'AB9E2ECD-10D4-4B29-B7E4-655BF46F59D1', //申请人所属单位ID
            location:0
          },
          call: (data) => {
            console.log(data)
          }
        })
      },
      print(){
        this.ajaxJson({
          url: '/sys/config/print'
        })
      },
      // 页面添加和查看事件
      add (id) {
        // 默认设置页面标记是查看
        var isAdd = false
        // 默认设置页面标题为查看信息
        var title = '查看设置信息'
        if (!id) { // 当id不存在的时候
          // 设置id为空
          id = ''
          // 设置页面标题为添加信息
          title = '添加设置信息'
          // 设置页面标记为添加
          isAdd = true
        }
        this.$dialog.OpenWindow({
          width: 1050,
          height: 360,
          url: '/configForm?id=' + id,
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
      //搜素
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
          url: '/sys/config/getManager',
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


    }
  }
</script>

<style scoped>

</style>
