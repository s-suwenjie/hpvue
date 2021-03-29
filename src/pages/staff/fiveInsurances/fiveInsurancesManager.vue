<template>
  <div>
    <yhm-managerpage category="1" :total-table="true">
      <!--导航条-->

      <template #navigationTab>
        <router-link class="menuTabDiv" :to="{path:'/home/employeeFilesManager'}">档案</router-link>
        <!--<router-link class="menuTabDiv" :to="{path:'/home/outPutTaxManager'}">工资</router-link>-->
        <router-link class="menuTabDiv" :to="{path:'/home/basicWageManager'}">设置基础工资</router-link>
        <router-link class="menuTabDiv" :to="{path:'/home/wagePostManager'}">设置岗位工资</router-link>
        <router-link class="menuTabDiv menuTabActive" :to="{path:'/home/fiveinsurancesManager'}">设置五险缴纳百分比</router-link>
        <router-link class="menuTabDiv" :to="{path:'/home/fiveInsurancesBaseManager'}">设置五险基数</router-link>
        <router-link class="menuTabDiv" :to="{path:'/home/telephoneSubsidyManager'}">设置话费补助</router-link>
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
        <yhm-managerth style="width: 100px;" title="单位养老（%）" ></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="个人养老（%）" ></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="单位失业（%）"></yhm-managerth>
        <yhm-managerth style="width: 100px" title="个人失业（%）"></yhm-managerth>
        <yhm-managerth style="width: 120px" title="单位公积金（%）" ></yhm-managerth>
        <yhm-managerth style="width: 120px" title="个人公积金（%）" ></yhm-managerth>
        <yhm-managerth style="width: 100px" title="单位医疗（%）" ></yhm-managerth>
        <yhm-managerth style="width: 100px" title="个人医疗（%）" ></yhm-managerth>
        <yhm-managerth style="width: 100px" title="个人医疗金额" ></yhm-managerth>
        <yhm-managerth style="width: 100px" title="单位工伤（%）" ></yhm-managerth>
        <yhm-managerth title="状态"></yhm-managerth>
      </template>
      <!--      数据表单       -->
      <template #listBody >
        <tr :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]" v-for="(item,index) in content" :key="index">
          <yhm-manager-td-checkbox :value="item" @call="check(selectValue,index)"></yhm-manager-td-checkbox>
          <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>
          <yhm-manager-td :value="item.person"></yhm-manager-td>
          <yhm-manager-td-date :value="item.enableDate"></yhm-manager-td-date>
          <yhm-manager-td-money :value="item.unitPension"></yhm-manager-td-money>
          <yhm-manager-td-money :value="item.personalPension"></yhm-manager-td-money>
          <yhm-manager-td-money :value="item.unitUnemployment"></yhm-manager-td-money>
          <yhm-manager-td-money :value="item.personalUnemployment"></yhm-manager-td-money>
          <yhm-manager-td-money :value="item.unitProvident"></yhm-manager-td-money>
          <yhm-manager-td-money :value="item.personalProvident"></yhm-manager-td-money>
          <yhm-manager-td-money :value="item.unitMedical"></yhm-manager-td-money>
          <yhm-manager-td-money :value="item.personalMedical"></yhm-manager-td-money>
          <yhm-manager-td-money :value="item.personalMedicalMoney"></yhm-manager-td-money>
          <yhm-manager-td-money :value="item.unitInjury"></yhm-manager-td-money>
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
    name: 'fiveinsurancesManager',
    mixins: [managermixin],
    data () {
      return {
        statePsd:{
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
          url:'/fiveinsurancesView?id='+item.id,
          title:'查看五险百分比信息',
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
          url:'/fiveinsurancesForm',
          title:'添加五险百分比信息',
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
            state:this.statePsd.value
          }
        }
        this.init({
          initValue: initValue,
          url:'/finance/fiveInsurances/getManager',
          data: params,
          all: (data) => {
            // 不管是不是初始化都需要执行的代码
          },
          init: (data) => {
            this.statePsd=data.statePsd
          }
        })
      },
    }
  }
</script>

<style scoped>

</style>
