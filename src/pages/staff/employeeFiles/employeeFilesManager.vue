<template>
  <div>
    <yhm-managerpage category="1" :total-table="true">
      <!--导航条-->

      <template #navigationTab>
        <router-link class="menuTabDiv menuTabActive" :to="{path:'/home/employeeFilesManager'}">档案</router-link>
        <!--<router-link class="menuTabDiv" :to="{path:'/home/outPutTaxManager'}">工资</router-link>-->
        <router-link class="menuTabDiv" :to="{path:'/home/basicWageManager'}">设置基础工资</router-link>
        <router-link class="menuTabDiv" :to="{path:'/home/wagePostManager'}">设置岗位工资</router-link>
        <router-link class="menuTabDiv" :to="{path:'/home/fiveinsurancesManager'}">设置五险缴纳百分比</router-link>
        <router-link class="menuTabDiv" :to="{path:'/home/fiveInsurancesBaseManager'}">设置五险基数</router-link>
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
        <yhm-managerth style="width: 80px;" title="姓名"></yhm-managerth>
        <yhm-managerth style="width: 120px;" title="入职时间" ></yhm-managerth>
        <yhm-managerth style="width: 90px;"  title="部门" ></yhm-managerth>
        <yhm-managerth style="width: 90px;" title="职位" ></yhm-managerth>
        <yhm-managerth style="width: 150px;"  title="身份证号" ></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="手机号"></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="微信号"></yhm-managerth>
        <yhm-managerth style="width: 80px;" title="性别"></yhm-managerth>
        <yhm-managerth style="width: 80px;" title="学历"></yhm-managerth>
        <yhm-managerth style="width: 80px;" title="状态"></yhm-managerth>
        <yhm-managerth title="操作"></yhm-managerth>
      </template>
      <!--      数据表单       -->
      <template #listBody >
        <tr :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]" v-for="(item,index) in content" :key="index">
          <yhm-manager-td-checkbox :value="item" @call="check(selectValue,index)"></yhm-manager-td-checkbox>
          <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>
          <yhm-manager-td :value="item.person"></yhm-manager-td>
          <yhm-manager-td-date :value="item.entryDate"></yhm-manager-td-date>
          <yhm-manager-td :value="item.department"></yhm-manager-td>
          <yhm-manager-td :value="item.position"></yhm-manager-td>
          <yhm-manager-td :value="item.idNo"></yhm-manager-td>
          <yhm-manager-td :value="item.phone"></yhm-manager-td>
          <yhm-manager-td :value="item.weChat"></yhm-manager-td>
          <yhm-manager-td-psd :value="item.sex" :list="sexPsd.list"></yhm-manager-td-psd>
          <yhm-manager-td-psd :value="item.educationType" :list="educationTypePsd.list"></yhm-manager-td-psd>
          <yhm-manager-td-psd :value="item.state" :list="statePsd.list"></yhm-manager-td-psd>
          <yhm-manager-td-operate>
            <yhm-manager-td-operate-button v-show="item.state == '0'" @click="Quit(item)" icon="btnAdd" value="离职" color="#fd6802"></yhm-manager-td-operate-button>
            <!--<yhm-manager-td-operate-button v-show="item.state == '1'" @click="lookQuit(item)" icon="i-look" value="查看离职信息" color="#fd6802"></yhm-manager-td-operate-button>-->
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
  import {managermixin} from '@/assets/manager.js'
  export default {
    name: 'employeeFilesManager',
    mixins: [managermixin],
    data () {
      return {
        sexPsd:{
          list:[],
          value:''
        },
        educationTypePsd:{
          list:[],
          value:''
        },
        statePsd:{
          list:[],
          value:''
        },
      }
    },
    created () {
    },
    methods: {
      Quit(item){
        this.$dialog.OpenWindow({
          width: 1050,
          height: 520,
          url:'/staffQuitForm?ownerID='+item.id,
          title:'查看员工信息',
          closeCallBack:(data) =>{
            if(data){
              this.initPageData(false)
            }
          }
        })
      },
      listView(item){
        this.$dialog.OpenWindow({
          width: 1050,
          height: 820,
          url:'/employeeFilesView?id='+item.id,
          title:'查看员工信息',
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
          url:'/employeeFilesForm',
          title:'添加员工信息',
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
            state:'0',
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
          url:'/finance/employeeFiles/getManager',
          data: params,
          all: (data) => {
            // 不管是不是初始化都需要执行的代码
          },
          init: (data) => {
            this.educationTypePsd=data.educationTypePsd
            this.sexPsd=data.sexPsd
            this.statePsd=data.statePsd
          }
        })
      },
    }
  }
</script>

<style scoped>

</style>
