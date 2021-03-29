<template>
    <div>
      <yhm-managerpage category="1" :total-table="true">
        <template #operate>
          <!-- 操作区-->
          <yhm-commonbutton value="添加" icon="btnAdd" :flicker="true" @call="add" category="one" ></yhm-commonbutton>
          <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initPageData(false)"></yhm-managersearch>
          <div style="width: 3px;height: 20px;background-color: #49A9EA;margin-right: 5px;"></div>
          <div style="color: #999999;"> 年份：</div>
          <yhm-datebox type="year" :value="year" :isSm="true" @call="initPageData(false)" width="120" height="20"  position="b" id="year" style="margin-right: 10px"></yhm-datebox>
          <yhm-radiofilter @initData="initPageData(false)" title="状态" :content="categoryPsd" all="0" id="categoryPsd"></yhm-radiofilter>
        </template>

        <template #choose>
          <div v-show="choose" class="buttonBody mptZero">

          </div>
        </template>

        <template #listHead>
          <yhm-managerth style="width: 40px;" title="选择" ></yhm-managerth>
          <yhm-managerth style="width: 40px;" title="查看" ></yhm-managerth>
          <yhm-managerth title="添加人"></yhm-managerth>
          <yhm-managerth title="启用时间" ></yhm-managerth>
          <yhm-managerth title="日期"></yhm-managerth>
          <yhm-managerth title="金额" ></yhm-managerth>
          <yhm-managerth title="操作"></yhm-managerth>
        </template>
        <!--      数据表单       -->
        <template #listBody >
            <tr v-for="(item,index) in content" :key="index">
            <yhm-manager-td-checkbox :value="item" @call="check(selectValue,index)"></yhm-manager-td-checkbox>
            <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>
            <yhm-manager-td :value="item.person"></yhm-manager-td>
            <yhm-manager-td-date :value="item.year+'年'"></yhm-manager-td-date>
            <yhm-manager-td-psd :value="item.category" :list="categoryPsd.list"></yhm-manager-td-psd>
            <yhm-manager-td-money :value="item.money"></yhm-manager-td-money>
            <yhm-manager-td-operate>
            </yhm-manager-td-operate>
          </tr>
        </template>
        <!--数据空提示-->
        <template #empty>
          <span class="m_listNoData" v-show="content.length==0">暂时没有数据</span>
        </template>
        <!--分页控件-->
        <template #pager>
          <yhm-pagination :pager="pager" @initData="initPageData(false)"></yhm-pagination>
        </template>

      </yhm-managerpage>
    </div>
</template>

<script>
  import {managermixin} from '@/assets/manager.js'
  export default {
    name: 'repairTargerManager',
    mixins: [managermixin],
    data () {
      return {
        content:[],
        searchStr:'',
        shortcutSearchContent:[],
        year:'',
        categoryPsd:{
          list:[],
          value:'0',
        }
      }
    },
    created () {
      this.year=(new Date()).getFullYear().toString()
    },
    methods:{
      initPageData (initValue) {
        let params = {}
        if (initValue) {
          // 页面初始化是需要的参数
          params = {
            init:true,
            category:this.categoryPsd.value,
            year: this.year
          }
        } else {
          // 页面非初始化时需要的参数
          params = {
            searchStr:this.searchStr,
            category:this.categoryPsd.value,
            year: this.year
          }
        }
        this.init({
          initValue: initValue,
          url:'/Fin/bankDetailInsuranceTargetManager',
          data: params,
          all: (data) => {
            // 不管是不是初始化都需要执行的代码
            this.shortcutSearchContent=data.shortcutSearchContent
            this.content=data.content
          },
          init: (data) => {
            this.categoryPsd=data.categoryPsd

          }
        })
      },
      add(){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '600',
          url: '/repairTargerForm',
          title: '添加',
          closeCallBack: (data) => {
            // if (data) {
              this.initPageData(false)
            // }
          }
        })
      },
      listView(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '300',
          url: '/repairTargerView?id='+item.id,
          title: '查看',
          closeCallBack: (data) => {

          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
