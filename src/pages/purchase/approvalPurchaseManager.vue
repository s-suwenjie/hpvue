<template>
  <div>
    <yhm-managerpage category="1">
      <!--导航条-->
      <template #navigationTab>
        <router-link class="menuTabDiv" :to="{path:'/home/approvalPayPlanManager'}">付款计划
          <i class="noticeNum" v-if="payPlanNum !=0">{{payPlanNum}}</i>
        </router-link>
        <router-link class="menuTabDiv " :to="{path:'/home/approvalPayManager'}">付款申请
          <i class="noticeNum" v-if="paymentNum !=0">{{paymentNum}}</i>
        </router-link>
        <router-link class="menuTabDiv" :to="{path:'/home/approvalReimbursementManager'}">报销
          <i class="noticeNum" v-if="reimburseNum !=0">{{reimburseNum}}</i>
        </router-link>
        <router-link class="menuTabDiv menuTabActive" :to="{path:'/home/approvalPurchaseManager'}">采购计划</router-link>
        <router-link class="menuTabDiv" :to="{path:'/home/approvalPrettyCashs'}">备用金
          <i class="noticeNum" v-if="prettyCashsNum !=0">{{prettyCashsNum}}</i>
        </router-link>
<!--        <router-link class="menuTabDiv" :to="{path:'/home/approvalInsuranceManager'}">保险审批-->
<!--          <i class="noticeNum" v-if="insuranceNum!='0'">{{insuranceNum}}</i>-->
<!--        </router-link>-->
      </template>

      <!--操作区-->
      <template #operate>
        <yhm-commonbutton :value="choose?'收起筛选':'展开筛选'" :icon="choose?'btnUp':'btnDown'" @call="switchChoose()"></yhm-commonbutton>
        <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initData"></yhm-managersearch>
      </template>

      <!--筛选区-->
      <template #choose>
        <div v-show="choose" class="buttonBody mptZero">
          <yhm-radiofilter :before="isFinishBefore" @initData="initChoose('isFinish')" title="状态" all="0" :content="isFinishList"></yhm-radiofilter>
        </div>
      </template>

      <!--数据表头-->
      <template #listHead>
        <yhm-managerth style="width: 40px;" title="选择"></yhm-managerth>
        <yhm-managerth style="width: 40px;" title="查看"></yhm-managerth>
        <yhm-managerth style="width: 90px" title="申请人员" value="workDate"></yhm-managerth>
        <yhm-managerth style="width: 120px" title="申请日期" value="workDate"></yhm-managerth>
        <yhm-managerth style="width: 80px" title="采购分类" value="categoryPurchase"></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="采购类型" value="model"></yhm-managerth>
        <yhm-managerth style="width: 120px" title="预计使用日期" value="lastDate"></yhm-managerth>
        <yhm-managerth style="width: 210px;" title="编号" value="code"></yhm-managerth>
        <yhm-managerth style="width: 100px" title="预计金额" value="workDate"></yhm-managerth>
        <yhm-managerth title="状态" value="money"></yhm-managerth>
        <yhm-managerth style="width: 120px" title="操作"></yhm-managerth>
      </template>
      <template #listBody>
        <tr :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]" v-for="(item,index) in content" :key="index">
          <yhm-manager-td-checkbox :value="item"></yhm-manager-td-checkbox>
          <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>
          <yhm-manager-td :value="item.person"></yhm-manager-td>
          <yhm-manager-td-date :value="item.workDate"></yhm-manager-td-date>
          <yhm-manager-td-psd :list="categoryPurchaseItems" :value="item.categoryPurchase"></yhm-manager-td-psd>
          <yhm-manager-td-psd :list="modelItems" :value="item.model"></yhm-manager-td-psd>
          <yhm-manager-td-date :value="item.lastDate"></yhm-manager-td-date>
          <yhm-manager-td-center :value="item.code"></yhm-manager-td-center>
          <yhm-manager-td-money :value="item.money"></yhm-manager-td-money>
          <yhm-manager-td-psd :list="stateItems" fsb="fs20b" :value="item.state"></yhm-manager-td-psd>
          <yhm-manager-td-operate>
            <yhm-manager-td-operate-button @click="adoptEvent(item)" :no-click="item.isFinish === '1'" value="通过" icon="i-btn-applicationSm" color="#49a9ea"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button @click="rejectEvent(item)" :no-click="item.isFinish === '1'" value="驳回" icon="i-btn-turnDown" color="#FF0000"></yhm-manager-td-operate-button>
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
    name: 'approvalPurchaseManager',
    mixins: [managermixin],
    data(){
      return{
        isFinishBefore: '0', // 默认选择状态为可以选择，1为不可以选择
        isFinishList: {
          value: '1',
          list: []
        },
        paymentNum:'',
        payPlanNum:'',
        reimburseNum:'',
        purchaseNum:'',
        prettyCashsNum:'',
        insuranceNum:'',

        categoryPurchaseItems:[],//采购分类
        modelItems:[],//采购类型
        stateItems:[] //审批状态
      }
    },
    methods:{

      //初始化页面数据
      initPageData (initValue) {
        let params = {}
        if (initValue) {
          // 页面初始化是需要的参数
          params = {
            isFinish: this.isFinishList.value
          }
        } else {
          // 页面非初始化时需要的参数
          params = {
            isFinish: this.isFinishList.value
          }
        }
        this.init({
          initValue: initValue,
          url: '/PersonOffice/getApprovalPurchaseManager',
          data: params,
          all: (data) => {
            // 不管是不是初始化都需要执行的代码

          },
          init: (data) => {
            // 初始化时需要执行的代码
            // 这边初始化筛选信息
            this.isFinishList = data.isFinishPsd
            this.categoryPurchaseItems = data.categoryPurchaseItems
            this.modelItems = data.modelItems
            this.stateItems = data.stateItems
          }
        })
      },
      //打开查看
      listView(item){
        this.$dialog.OpenWindow({
          width: 1050,
          height: 550,
          url:'/approvalPurchaseView?id=' + item.id,
          title:'查看采购信息',
          closeCallBack:(data) =>{
            if (data) {
              this.initPageData(false)
            }
          }
        })
      },
      //通过申请
      adoptEvent(item){
        if(item.isFinish ==='0'){
          if(item.id){
            let params = {
              id: item.id,
              kind: '0',
              tableName: '46'
            }
            this.$dialog.confirm({
              width: 300,
              tipValue: '是否通过?',
              alertImg: 'warn',
              okCallBack: (data)=>{
                this.ajaxJson({
                  url: '/PersonOffice/approvalYesVue',
                  data: params,
                  call: (data)=>{
                    if(data.type === 0){
                      this.$dialog.alert({
                        tipValue: data.message,
                        closeCallBack: () => {
                          this.initPageData(false)
                        }
                      })
                    }else if(data.type === 1){
                      this.$dialog.alert({
                        tipValue: data.message,
                        alertImg: 'error',
                        closeCallBack: () => {
                          this.initPageData(false)
                        }
                      })
                    }
                    else if(data.type === 2){
                      this.$dialog.alert({
                        tipValue: data.message,
                        alertImg: 'error',
                        width:'450',
                        closeCallBack: () => {
                          this.initPageData(false)
                        }
                      })
                    }
                  }
                })
              }
            })
          }
        }
      },
      //驳回申请
      rejectEvent(item){
        if(item.isFinish === '0') {
          this.$dialog.OpenWindow({
            width: 1050,
            height: 720,
            title: '驳回理由',
            url: '/rejectReason?category='+item.category+'&id=' + item.id + '&tableName=46&kind=0',
            closeCallBack: (data) => {
              if(data) {
                this.initPageData(false)
              }
            }
          })
        }
      },
    },
    created () {
      this.ajaxJson({
        url: '/PersonOffice/approvalManagerAllNumber',
        call: (data)=>{
          this.payPlanNum = data.payPlan
          this.paymentNum = data.payment
          this.reimburseNum = data.reimbursements
          this.purchaseNum = data.purchase
          this.prettyCashsNum = data.prettyCashs
          this.insuranceNum=data.insurance
        }
      })
    }
  }
</script>

<style scoped>

</style>
