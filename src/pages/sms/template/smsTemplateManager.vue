<template>
  <div>
    <yhm-managerpage>
      <!--导航条-->
      <template #navigation>系统&nbsp;&gt;&nbsp;短信管理&nbsp;&gt;&nbsp;短信模板管理</template>
      <template #operate>
        <yhm-commonbutton value="添加" icon="btnAdd" :flicker="true" @call="add"></yhm-commonbutton>
        <yhm-commonbutton :value="choose?'收起筛选':'展开筛选'" :icon="choose?'btnUp':'btnDown'" @call="switchChoose()"></yhm-commonbutton>
        <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initData"></yhm-managersearch>
      </template>
      <!--筛选区-->
      <template #choose>
        <div v-show="choose" class="buttonBody mptZero">
          <yhm-radiofilter @initData="initChoose('category')" title="类型" :content="listCategory"></yhm-radiofilter>
          <yhm-radiofilter @initData="initChoose('state')" title="状态" :content="listState"></yhm-radiofilter>
        </div>
      </template>

      <!--数据表头-->
      <template #listHead>
        <yhm-managerth style="width: 40px;" title="选择"></yhm-managerth>
        <yhm-managerth style="width: 40px;" title="查看"></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="模板ID" value="templateID"></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="模板类型" value="category"></yhm-managerth>
        <yhm-managerth style="width: 200px;" title="模板名称" value="name"></yhm-managerth>
        <yhm-managerth style="width: 170px;" title="申请时间" value="workDate"></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="动态数据个数" value="dynamicQuantity"></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="状态" value="state"></yhm-managerth>
        <yhm-managerth title="备注"></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="操作"></yhm-managerth>
      </template>

      <!--数据明细-->
      <template #listBody>
        <tr v-for="(item,index) in content" :key="index" :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]">
          <yhm-manager-td-checkbox :value="item"></yhm-manager-td-checkbox>
          <yhm-manager-td-look @click="add(item.id)"></yhm-manager-td-look>
          <yhm-manager-td-center :value="item.templateID"></yhm-manager-td-center>
          <yhm-manager-td-psd :value="item.category" :list="listCategory.list"></yhm-manager-td-psd>
          <yhm-manager-td :value="item.name"></yhm-manager-td>
          <yhm-manager-td-date :value="item.workDate"></yhm-manager-td-date>
          <yhm-manager-td-center :value="item.dynamicQuantity"></yhm-manager-td-center>
          <yhm-manager-td-psd :value="item.state" :list="listState.list"></yhm-manager-td-psd>
          <yhm-manager-td :value="item.remark"></yhm-manager-td>
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
    name: 'smsTemplateManager',
    mixins: [managermixin],
    data(){
      return {
        listCategory:{
          value:"",
          list:[]
        },
        listState:{
          value:"",
          list:[]
        },
      }
    },
    methods:{
      add(id) {
        // 默认设置页面标记是查看
        var isAdd = false
        // 默认设置页面标题为查看信息
        var title = '查看短信模板信息'
        if (!id) { // 当id不存在的时候
          // 设置id为空
          id = ''
          // 设置页面标题为添加信息
          title = '添加短信模板信息'
          // 设置页面标记为添加
          isAdd = true
        }
        this.$dialog.OpenWindow({
          width: 1050,
          height: 750,
          url:'/smsTemplateForm?id=' + id,
          title:title,
          closeCallBack:(data) =>{
            if (data) {
              if (isAdd) {
                this.lastData = data//接收子页面传的值
              }
              this.initPageData(false)
              /*false->非初始化=>!import  true->初始化*/
            }
          }
        })
      },
      initPageData (initValue) {
        let params = {}

        if (initValue) {
          params = {
            category:this.listCategory.value,
            state:this.listState.value
          }
        } else {
          params = {
            category:this.listCategory.value,
            state:this.listState.value
          }
        }
        this.init({
          initValue:initValue,
          url: '/sys/smsTemplate/getManager',
          data:params,
          all:(data) =>{
            //不管是不是初始化都需要执行的代码
          },
          init:(data)=>{
            //初始化时需要执行的代码
            this.listCategory = data.categoryPsd
            this.listState = data.statePsd
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
