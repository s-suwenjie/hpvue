<template>
  <div>
    <yhm-managerpage category="1" :total-table="true">
      <!--导航条-->
      <template #navigationTab>
        <a class="menuTabDiv" href="/Fin/_bankDetailManager?menuType=1">收支明细</a>
        <router-link class="menuTabDiv" :to="{path:'/home/viewManager/paymentPlanViewManager'}">付款计划</router-link>
        <router-link class="menuTabDiv" :to="{path:'/home/viewManager/paymentApplyViewManager'}">付款申请</router-link>
        <router-link class="menuTabDiv" :to="{path:'/home/viewManager/reimbursementViewManager'}">报销申请</router-link>
        <router-link class="menuTabDiv menuTabActive" :to="{path:'/home/viewManager/finPrettyCashsManagerAll'}">备用金</router-link>
      </template>
      <!--操作区-->
      <template #operate>
        <yhm-commonbutton :value="choose?'收起筛选':'展开筛选'"  :icon="choose?'btnUp':'btnDown'" @call="switchChoose()"></yhm-commonbutton>
        <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initData"></yhm-managersearch>
        <div @click="selectedList" v-show="isSelected" class="b_main one b_one mr5b">打开选中信息</div>
        <yhm-radiofilter  @initData="initChoose('isFinish')" all="0" title="完成状态" :content="isFinishPsd"></yhm-radiofilter>
        <yhm-radiofilter :before="stateBefore" @initData="initChoose('dateType')" title="时间类型"  :content="dateTypeList"></yhm-radiofilter>
      </template>
      <!--筛选区-->
      <template #choose>
        <div v-show="choose" class="buttonBody mptZero">
          <yhm-radiofilter  @initData="initChoose('isTravel')" title="业务相关" :content="isTravelPsd"></yhm-radiofilter>
          <yhm-radiofilter  @initData="initChoose('isTravel')" title="发票类型" :content="invoiceCategoryPsd"></yhm-radiofilter>
        </div>
      </template>
      <template #listHead>
        <yhm-managerth style="width: 38px;" title="选择"></yhm-managerth>
        <yhm-managerth style="width: 50px;" title="查看"></yhm-managerth>
        <yhm-managerth style="width: 110px;" title="申请人" value="personID"></yhm-managerth>
        <yhm-managerth style="width: 150px;" title="批次号" value="code"></yhm-managerth>
        <yhm-managerth style="width: 110px;" title="申请时间" value="workDate"></yhm-managerth>
        <yhm-managerth style="width: 120px;" title="申请金额" value="money"></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="发票类型"></yhm-managerth>
        <yhm-managerth title="事由" value="subjectID"></yhm-managerth>
        <yhm-managerth style="width: 120px;" title="预计核销日期" value="estimateDate"></yhm-managerth>
        <yhm-managerth style="width: 70px;" title="倒计时" value="day"></yhm-managerth>
        <yhm-managerth style="width: 120px;" title="状态" value=""></yhm-managerth>
      </template>
      <template #listBody>
        <tr v-for="(item,index) in content" :key="index" :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]">
          <yhm-manager-td-checkbox :value="item"></yhm-manager-td-checkbox>
          <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>
          <yhm-manager-td :value="item.person"></yhm-manager-td>
          <yhm-manager-td :value="item.code"></yhm-manager-td>
          <yhm-manager-td-date :value="item.workDate"></yhm-manager-td-date>
          <yhm-manager-td-money :value="item.money"></yhm-manager-td-money>
          <yhm-manager-td-psd :value="item.invoiceCategory" :list="invoiceCategoryList"></yhm-manager-td-psd>
          <yhm-manager-td :value="item.subject"></yhm-manager-td>
          <yhm-manager-td-date :value="item.estimateDate"></yhm-manager-td-date>
          <yhm-manager-td-center :value="item.day+'天'" v-if="item.day<=2" style="color:#2c920b;font-weight: bold"></yhm-manager-td-center>
          <yhm-manager-td-center :value="item.day+'天'" v-else-if="item.day>2&&item.day<=5" style="color:#0511a5;font-weight: bold"></yhm-manager-td-center>
          <yhm-manager-td-center :value="item.day+'天'" v-else style="color: #f00;font-weight: bold"></yhm-manager-td-center>

          <yhm-manager-td-state :value="item.stateVal" :stateColor="item.stateColor" :stateImg="item.stateImg"></yhm-manager-td-state>
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
      <!--数据空提示-->
      <template #empty>
        <span class="m_listNoData" v-show="empty">暂时没有数据</span>
      </template>
      <template #listTotalHead>
        <yhm-managerth style="width: 100px;" before-color="black" title="" before-title="总数" ></yhm-managerth>
        <yhm-managerth style="width: 100px;" before-color="#49a9ea" title="" before-title="进行中" ></yhm-managerth>
        <yhm-managerth style="width: 100px;" before-color="#2c920b" title="" before-title="已完成" ></yhm-managerth>
        <yhm-managerth style="width: 100px;" before-color="#ff0000" title="" before-title="驳回" ></yhm-managerth>
      </template>
      <template #listTotalLeft>
        <div class=" listTotalLeft">
          <span class="test"></span>
          <span class="test">金额</span>
          <span class="test">条数</span>
        </div>
      </template>
      <template #listTotalBody>
        <tr>
          <yhm-manager-td-money @click="totalClick(item)" v-for="(item,index) in contentTotal" :key="index" :value="item.money"></yhm-manager-td-money>
        </tr>
        <tr>
          <yhm-manager-td-rgt @click="totalClick(item)" v-for="(item,index) in contentTotal" :key="index" :value="item.count"></yhm-manager-td-rgt>
        </tr>
      </template>
    </yhm-managerpage>
  </div>
</template>

<script>
  import { managermixin } from '@/assets/manager.js'
  export default {
    name: 'finPrettyCashsManagerAll',
    mixins: [managermixin],
    data(){
      return{
        isFinish:'',
        isFinishPsd:{
          value: '',
          list: []
        },
        isTravel:'',
        isTravelPsd:{
          value: '',
          list: []
        },
        invoiceCategoryPsd: {
          value: '',
          list: []
        },
        invoiceCategoryList: [],
        contentTotal:[],
        dateType:'',
        dateTypeList: {
          value: '',
          list: [{showName:"本周", num: "0", code: "", img: ""},{showName:"本月", num: "1", code: "", img: ""},{showName:"本季度", num: "2", code: "", img: ""},{showName:"本年", num: "3", code: "", img: ""},]
        },
      }
    },
    methods:{
      totalClick(item){
        if(item.val==='总数'){
          this.listState.value = ''
        } else if(item.val==='已完成'){
          this.listState.value = '0'
        } else if(item.val==='进行中'){
          this.listState.value = '1'
        } else if(item.val==='驳回'){
          this.listState.value = '2'
        }
        this.pageIndex=1
        this.initPageData()
      },
      selectedSum(){
        let params={
          selectValue:this.selectValue
        }
        this.ajaxJson({
          url: '/PersonOffice/commonSelectedsave',
          data:params,
          call:(data) =>{
            if(data.type===0){
              this.ajaxJson({
                url: '/PersonOffice/prettyCashsManagerAllTotal',
                data:params,
                call:(information) =>{
                  this.contentTotal = information
                }
              })
            }
          }
        })
      },
      selectedList(){
        let params={
          selectValue:this.selectValue
        }
        this.ajaxJson({
          url: '/PersonOffice/commonSelectedsave',
          data:params,
          call:(data) =>{
            //finReimbursementViewFormSelect
            if(data.type===0){
              this.$dialog.OpenWindow({
                width: '1050',
                height: '620',
                title: '查看选中信息',
                url: '/finPrettyCashsView?id='+data.val,
                closeCallBack: (dataTwo)=>{
                  if(dataTwo){

                  }
                }
              })
            }
          }
        })
      },
      listView(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '740',
          title: '查看备用金信息',
          url:'/finPrettyCashsView?id='+item.id,
          closeCallBack: (data)=>{
            if(data){
              this.initPageData(false)
            }
          }
        })
      },
      initPageData(initValue){
        let params = {}

        if (initValue) {
          params = {
            isFinish:'1'
          }
        } else {
          params = {
            isFinish: this.isFinishPsd.value,
            isTravel: this.isTravelPsd.value,
            invoiceCategory: this.invoiceCategoryPsd.value,
            dateType : this.dateTypeList.value,
          }
        }
        this.init({
          initValue:initValue,
          url: '/PersonOffice/prettyCashsManagerAll',
          data:params,
          all:(data) =>{
            this.contentTotal = data.total
          },
          init:(data)=>{
            this.isFinishPsd = data.isFinishPsd
            this.isTravelPsd = data.isTravelPsd
            this.invoiceCategoryPsd = data.invoiceCategoryPsd
            this.invoiceCategoryList = data.invoiceCategoryPsd.list
          }
        })
      },
    },
    created () {

    }
  }
</script>

<style scoped>

</style>
