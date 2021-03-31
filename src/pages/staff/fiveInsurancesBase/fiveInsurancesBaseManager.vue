<template>
  <div>
    <yhm-managerpage category="1" :total-table="true">
      <!--导航条-->

      <template #navigationTab>
        <router-link class="menuTabDiv" :to="{path:'/home/employeeFilesManager'}">档案</router-link>
        <router-link class="menuTabDiv" :to="{path:'/home/basicWageManager'}">设置基础工资</router-link>
        <router-link class="menuTabDiv" :to="{path:'/home/wagePostManager'}">设置岗位工资</router-link>
        <router-link class="menuTabDiv" :to="{path:'/home/fiveinsurancesManager'}">设置五险缴纳百分比</router-link>
        <router-link class="menuTabDiv menuTabActive" :to="{path:'/home/fiveInsurancesBaseManager'}">设置五险基数</router-link>
        <router-link class="menuTabDiv" :to="{path:'/home/telephoneSubsidyManager'}">设置话费补助</router-link>
        <router-link class="menuTabDiv" :to="{path:'/home/wageWorkingManager'}">设置工龄工资基数</router-link>
      </template>
      <template #operate>
        <!-- 操作区-->
        <yhm-commonbutton value="添加" icon="btnAdd" :flicker="true" @call="add" category="one"></yhm-commonbutton>
        <yhm-commonbutton :value="choose?'收起筛选':'展开筛选'" :icon="choose?'btnUp':'btnDown'" @call="switchChoose()"></yhm-commonbutton>
        <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initChoose"></yhm-managersearch>
        <yhm-radiofilter @initData="initChoose('state')" title="状态" :content="statePsd"></yhm-radiofilter>
      </template>
      <template #choose>
        <div v-show="choose" class="buttonBody mptZero">

        </div>
      </template>
      <template #listHead>
        <yhm-managerth style="width: 40px;" title="选择" ></yhm-managerth>
        <yhm-managerth style="width: 40px;" title="查看" ></yhm-managerth>
        <yhm-managerth title="添加人" style="width: 100px;"></yhm-managerth>
        <yhm-managerth style="width: 120px;"  title="启用时间" ></yhm-managerth>
        <yhm-managerth title="社保级别"></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="养老基数" ></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="失业基数"></yhm-managerth>
        <yhm-managerth style="width: 100px" title="工伤基数" ></yhm-managerth>
        <yhm-managerth style="width: 100px" title="医疗基数" ></yhm-managerth>
        <yhm-managerth style="width: 120px" title="公积金基数" ></yhm-managerth>
        <yhm-managerth title="状态"></yhm-managerth>
      </template>
      <!--      数据表单       -->
      <template #listBody >
        <tr :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]" v-for="(item,index) in content" :key="index">
          <yhm-manager-td-checkbox :value="item" @call="check(selectValue,index)"></yhm-manager-td-checkbox>
          <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>
          <yhm-manager-td :value="item.person"></yhm-manager-td>
          <yhm-manager-td-date :value="item.startDate"></yhm-manager-td-date>
          <yhm-manager-td-psd :value="item.category" :list="categoryPsd.list"></yhm-manager-td-psd>
          <yhm-manager-td-money :value="item.pension"></yhm-manager-td-money>
          <yhm-manager-td-money :value="item.unemployment"></yhm-manager-td-money>
          <yhm-manager-td-money :value="item.injury"></yhm-manager-td-money>
          <yhm-manager-td-money :value="item.medical"></yhm-manager-td-money>
          <yhm-manager-td-money :value="item.provident"></yhm-manager-td-money>
          <yhm-manager-td-psd :value="item.state" :list="statePsd.list"></yhm-manager-td-psd>
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
  import {managermixin} from '@/assets/manager.js'
  export default {
    name: 'fiveInsurancesBaeManager',
    mixins: [managermixin],
    data () {
      return {
        statePsd:{
          list:[],
          value:''
        },
        categoryPsd:{
          list:[],
          value:''
        },
      }
    },
    created () {

    },
    methods: {
      listView(item){
        this.$dialog.OpenWindow({
          width: 1050,
          height: 520,
          url:'/fiveinsurancesBaseView?id='+item.id,
          title:'查看五险基数信息',
          closeCallBack:(data) =>{
            if(data){
              this.initPageData(false)
            }
          }
        })
      },
      add(){
        this.$dialog.OpenWindow({
          width: 1050,
          height: 820,
          url:'/fiveinsurancesBaseForm',
          title:'添加五险基数信息',
          closeCallBack:(data) =>{
            if(data){
              this.initPageData(false)
            }
          }
        })
      },
      initPageData (initValue) {
        let params = {}
        if (initValue) {
          // 页面初始化是需要的参数
          params = {
            init:true,
          }
        } else {
          // 页面非初始化时需要的参数
          params = {

          }
        }
        this.init({
          initValue: initValue,
          url:'/finance/fiveInsurancesBase/getManager',
          data: params,
          all: (data) => {
            // 不管是不是初始化都需要执行的代码
          },
          init: (data) => {
            this.statePsd=data.statePsd
            this.categoryPsd=data.categoryPsd
          }
        })
      },
    }
  }
</script>

<style scoped>

</style>
