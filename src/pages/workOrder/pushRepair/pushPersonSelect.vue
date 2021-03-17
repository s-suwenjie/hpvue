<template>
  <div class="f_main f_main_customize mb16">
    <yhm-select-body :choose="false">
      <template #operate>
        <yhm-commonbutton value="添加"  icon="btnAdd" :flicker="true" @call="add" category="one"></yhm-commonbutton>

        <div v-show="showTipDbSelect" class="s_db_select" :style="{left:getLeft,top:getTop}">双击选择</div>
        <yhm-managersearch :value="searchStr" id="searchStr" @call="initData"></yhm-managersearch>
      </template>
      <template #listHead>
        <yhm-managerth style="width: 40px;" title="选择" ></yhm-managerth>
        <yhm-managerth title="姓名"></yhm-managerth>
        <yhm-managerth title="电话"></yhm-managerth>
        <yhm-managerth title="备注"></yhm-managerth>
      </template>
      <template #listBody>
        <tr v-for="(item,index) in content" :class="{InterlacBg:index%2!=0}"  :key="item.id" @click="selectEvent(item)" @dblclick="dblclickEvent(item)"
            @mousemove="mousemoveEvent" @mouseover="mouseoverEvent" @mouseout="mouseoutEvent">
          <yhm-manager-td-checkbox :no-click="false" :value="item"></yhm-manager-td-checkbox>
          <yhm-manager-td-center :value="item.person" @click="personView(item)"></yhm-manager-td-center>
          <yhm-manager-td-center :value="item.phone"></yhm-manager-td-center>
          <yhm-manager-td-center :value="item.remark"></yhm-manager-td-center>
        </tr>
      </template>
      <template #empty>
        <span class="m_listNoData" style="color: #FF0000;cursor: pointer;" @click="add" v-show="content.length === 0">当前推修公司暂未添加联系人(点击添加)</span>
      </template>
      <template #pager>
        <yhm-pagination is-not-right :pager="pager" :isPageSize="false" @initData="initPageData(false)"></yhm-pagination>
        <yhm-commonbutton class="mr0" icon="i-complete" value="确定" category="two" @call="selectConfirmEvent()"></yhm-commonbutton>
      </template>
    </yhm-select-body>
  </div>
</template>

<script>
  import { selectmixin } from '@/assets/select.js'
  export default {
    name: 'pushPersonSelect',
    mixins: [selectmixin],
    data(){
      return{
        pager: {
          total: 0, // 总条数
          pageSize: 10, // 每页条数
          pageIndex: 1, // 当前页码
          selectCount: 0 // 选中条数
        }
      }
    },
    methods: {
      add(){
        let title
        if(this.name==''||this.name==null){
          title = '添加推修公司联系人'
        }else{
          title = '添加推修公司联系人'+' ( '+this.name + ' ) '
        }
        this.$dialog.OpenWindow({
          width: 1050,
          height: 720,
          url:'/pushRepairAddPersonForm?companyID=' + this.id,
          title:title,
          closeCallBack:(data) =>{
            // if (data) {
            this.initPageData(false)
            // }
          }
        })
      },
      initPageData (initValue) {
        this.setQuery2Value('id')
        this.setQuery2Value('name')
        let params = {
            id:this.id,
            pageIndex:this.pager.pageIndex,
            pageSize:this.pager.pageSize
          }

        this.ajaxJson({
          url: '/fix/fixCompany/initForm',
          data: params,
          call: (data)=>{
            this.content = data.manager2
          }
        })
      },
    }
  }
</script>

<style scoped>

</style>
