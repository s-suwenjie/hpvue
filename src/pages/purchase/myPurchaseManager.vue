<template>
  <div>
    <yhm-managerpage category="1">
      <!--导航条-->
      <template #navigationTab>
        <router-link class="menuTabDiv" v-for="(item,index) in details" :key="index" :class="{menuTabActive:menuTabOn == index}" :to="{path:item.path}" @click="menuTab(index)">
          {{item.name}}
        </router-link>
      </template>

      <!--操作区-->
      <template #operate>
        <yhm-commonbutton value="添加" icon="btnAdd" :flicker="true" @call="add" category="one"></yhm-commonbutton>
        <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initData"></yhm-managersearch>
        <yhm-radiofilter :before="isFinishBefore" @initData="initChoose('isFinish')" title="状态"  :content="isFinishList"></yhm-radiofilter>

      </template>

      <!--筛选区-->
      <template #choose>
        <div v-show="choose" class="buttonBody mptZero">
        </div>
      </template>

      <!--数据表头-->
      <template #listHead>
        <yhm-managerth style="width: 40px;" title="选择"></yhm-managerth>
        <yhm-managerth style="width: 40px;" title="查看"></yhm-managerth>
        <yhm-managerth style="width: 120px" title="申请日期" value="workDate"></yhm-managerth>
        <yhm-managerth style="width: 110px" title="采购分类" value="categoryPurchase"></yhm-managerth>
        <yhm-managerth style="width: 120px;" title="采购类型" value="model"></yhm-managerth>
        <yhm-managerth style="width: 120px" title="预计使用日期" value="lastDate"></yhm-managerth>
        <yhm-managerth style="width: 230px;" title="编号" value="code"></yhm-managerth>
        <yhm-managerth style="width: 120px" title="预计金额" value="money"></yhm-managerth>
        <yhm-managerth title="状态" value="state"></yhm-managerth>
        <yhm-managerth style="width: 150px" title="操作"></yhm-managerth>
      </template>
      <template #listBody>
        <tr :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]" v-for="(item,index) in content" :key="index">
          <yhm-manager-td-checkbox :value="item"></yhm-manager-td-checkbox>
          <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>
          <yhm-manager-td-date :value="item.workDate"></yhm-manager-td-date>
          <yhm-manager-td-psd :list="categoryPurchaseItems" :value="item.categoryPurchase"></yhm-manager-td-psd>
          <yhm-manager-td-psd :list="modelItems" :value="item.model"></yhm-manager-td-psd>
          <yhm-manager-td-date :value="item.lastDate"></yhm-manager-td-date>
          <yhm-manager-td-center :value="item.code"></yhm-manager-td-center>
          <yhm-manager-td-money :value="item.money"></yhm-manager-td-money>
          <yhm-manager-td-psd :list="stateItems" fsb="fs20b" :value="item.state"></yhm-manager-td-psd>
          <yhm-manager-td-operate>
            <yhm-manager-td-operate-button @click="submit(item)" :no-click="item.state !== '0'" value="提交申请" icon="i-btn-applicationSm" color="#49a9ea"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button @click="urge(item)" :no-click="item.state === '0'" value="催促" icon="i-btn-urge" color="#2AA70B"></yhm-manager-td-operate-button>
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
    name: 'myPurchaseManager',
    mixins: [managermixin],
    data(){
      return{
        isFinishBefore: '0', // 默认选择状态为可以选择，1为不可以选择
        isFinishList: {
          value: '',
          list: []
        },
        categoryPurchaseItems:[],//采购分类
        modelItems:[],//采购类型
        stateItems:[], //审批状态
        menuTabOn: 3,
        details:[
          {id:'1', name: '付款计划',path:'/home/myPaymentPlanManager'},
          {id:'2', name: '付款申请',path:'/home/myManager/paymentApplyManager'},
          {id:'3', name: '报销',path:'/home/myManager/reimbursementManager'},
          {id:'4', name: '采购计划',path:'/home/myPurchaseManager'},
          {id:'5', name: '备用金',path:'/home/prettyCashsManager'},
          {id:'6', name: '补签字',path:'/home/myManager/signatureManager'},
        ],
      }
    },
    methods:{
      //添加采购计划
      add() {
        this.$dialog.OpenWindow({
          width: 1050,
          height: 720,
          url:'/myPurchaseForm',
          title:'添加采购信息',
          closeCallBack:(data) =>{
            if (data) {
              this.lastData = data//接收子页面传的值
              this.initPageData(false)
            }
          }
        })
      },
      listView(item){
        if(item.state === '0'){
          this.$dialog.OpenWindow({
            width: 1050,
            height: 720,
            url:'/myPurchaseForm?id=' + item.id,
            title:'查看采购信息',
            closeCallBack:(data) =>{
              if (data) {
                this.initPageData(false)
              }
            }
          })
        }
        else{
          this.$dialog.OpenWindow({
            width: 1050,
            height: 720,
            url:'/myPurchaseView?id=' + item.id,
            title:'查看采购信息'
          })

        }
      },

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
          url: '/PersonOffice/getMyPurchaseManager',
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
      //提交申请
      submit(item){
        this.$dialog.confirm({
          width: 250,
          tipValue: '确定提交申请?',
          btnValueOk: '确定',
          alertImg: 'warn',
          okCallBack: (data) => {
            let params = {
              id: item.id,
              category: item.category,
              tableName: 46,
              isDetail: 0
            }
            this.ajaxJson({
              url: '/PersonOffice/approvalSubmitVue',
              data: params,
              call: (data) => {
                if (data.type === 0) {
                  if (item.category === '17'){
                    let params = {
                      id: item.id,
                      tableName: 46
                    }
                    this.ajaxJson({
                      url: '/PersonOffice/approvalAutoPass',
                      data: params,
                      call: (data) => {
                        this.$dialog.alert({
                          width: 350,
                          tipValue: data.message,
                          closeCallBack: () => {
                            this.initPageData(false)
                          }
                        })
                      }
                    })
                  }else{
                    this.$dialog.alert({
                      tipValue: data.message,
                      closeCallBack: () => {
                        this.initPageData(false)
                      }
                    })
                  }
                } else {
                  this.$dialog.alert({
                    alertImg: 'error',
                    tipValue: data.message,
                    closeCallBack: () => {
                    }
                  })
                }
              }
            })
          }
        })
      },
      //催促
      urge(item){
        if (item.isFinish === '0' && item.state !== '0') {
          if (item.id) {
            this.$dialog.confirm({
              width: 250,
              tipValue: '是否催促?',
              btnValueOk: '催促',
              btnValueCancel: '取消',
              alertImg: 'warn',
              okCallBack: () => {
                let params = {
                  id: item.id,
                  tableName: 46
                }
                this.ajaxJson({
                  url: '/PersonOffice/approvalPressVue',
                  data: params,
                  call: (data) => {
                    if (data.type === 0) {
                      this.$dialog.alert({
                        tipValue: '催促成功！'
                      })
                    }else{
                      this.$dialog.alert({
                        alertImg: 'error',
                        tipValue: '催促失败！'
                      })
                    }
                  }
                })
              }
            })
          } else {
            this.$dialog.alert({
              alertImg: 'error',
              tipValue: '请先提交申请'
            })
          }
        }
      }
    }
  }
</script>

<style scoped>

</style>
