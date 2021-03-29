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
      </template>
      <template #operate>
        <!-- 操作区-->
        <yhm-commonbutton value="添加" icon="btnAdd" :flicker="true" @call="add" category="one"></yhm-commonbutton>
        <yhm-commonbutton :value="choose?'收起筛选':'展开筛选'" :icon="choose?'btnUp':'btnDown'" @call="switchChoose()"></yhm-commonbutton>
        <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initChoose"></yhm-managersearch>
        <yhm-radiofilter @initData="initChoose('state')" title="状态" :content="statePsd" all="0"></yhm-radiofilter>
      </template>
      <template #choose>
        <div v-show="choose" class="buttonBody mptZero">

        </div>
      </template>
      <template #listHead>
        <yhm-managerth style="width: 40px;" title="选择" ></yhm-managerth>
        <yhm-managerth style="width: 40px;" title="查看" ></yhm-managerth>
        <yhm-managerth title="公司名称" style="width: 300px;"></yhm-managerth>
        <yhm-managerth style="width: 150px;"  title="税号" ></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="纳税规模" ></yhm-managerth>
        <yhm-managerth style="width: 220px;" title="税票类型" ></yhm-managerth>
        <yhm-managerth style="width: 150px;" title="开票码"></yhm-managerth>
        <yhm-managerth style="width: 60px" title="二维码"></yhm-managerth>
        <yhm-managerth style="width: 60px" title="一维码" ></yhm-managerth>
        <yhm-managerth title="操作"></yhm-managerth>
      </template>
      <!--      数据表单       -->
      <template #listBody >
        <tr :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]" v-for="(item,index) in content" :key="index">
          <yhm-manager-td-checkbox :value="item" @call="check(selectValue,index)"></yhm-manager-td-checkbox>
          <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>
          <yhm-manager-td :tip="true" :value="item.unit" :after-icon="item.invoiceUnit.length > 0?'i-hyperchain':''" @mouseover="tableTipShowEvent" @mouseout="tableTipHideEvent" :value-object="item"></yhm-manager-td>
          <yhm-manager-td :value="item.taxNumber"></yhm-manager-td>
          <yhm-manager-td-psd :value="item.companyCategory" :list="companyCategoryPsd.list"></yhm-manager-td-psd>
          <yhm-manager-td-psd :value="item.category" :list="categoryPsd.list"></yhm-manager-td-psd>
          <yhm-manager-td :value="item.billingCode"></yhm-manager-td>
          <!--            <yhm-manager-td-tip-img :unitUrl="'tax'+item.url" icon="icon-uniE999" :tip="true" color="#333" node-class-name="m_main"></yhm-manager-td-tip-img>-->
          <yhm-manager-td-image :tip="true" left="-100" width="200" height="200" :value="item.url" tag="tax" geticon="icon-uniE999"></yhm-manager-td-image>
          <yhm-manager-td-image :tip="true" left="-150" width="300" height="100" :value="item.taxNumberUrl" tag="tax" geticon="icon-3"></yhm-manager-td-image>
          <yhm-manager-td-operate>
            <yhm-manager-td-operate-button @click="clickCopy(item)" value="复制" color="#7112da"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button @click="sendOutMy(item)" value="发送至微信" color="#606060" icon="icon-uniE99B"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button @click="sendOutOtherPerson(item)" value="发送给其他人" color="#606060" icon="icon-uniE99B"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button @click="listView(item)" value="查看开票记录" icon="i-invoiceView" color="#0a7cbf"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button @click="openInvoice(item)" value="待开票数据" icon="i-invoice" color="#7112da"></yhm-manager-td-operate-button>
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
        statePsd:{
          list:[],
          value:''
        },
      }
    },
    created () {
    },
    methods: {
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
            init:true,
          }
        } else {
          // 页面非初始化时需要的参数
          params = {
            companyCategory:this.companyCategoryPsd.value,
            category:this.categoryPsd.value
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
            this.companyCategoryPsd=data.companyCategoryPsd
            this.categoryPsd=data.categoryPsd
          }
        })
      },
    }
  }
</script>

<style scoped>

</style>
