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
        <yhm-commonbutton value="添加" icon="btnAdd" :flicker="true" @call="add()" category="one"></yhm-commonbutton>
        <yhm-commonbutton :value="choose?'收起筛选':'展开筛选'"  :icon="choose?'btnUp':'btnDown'" @call="switchChoose()"></yhm-commonbutton>
        <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initData"></yhm-managersearch>
        <yhm-commonbutton value="打开选中信息" icon="i-selectAll" @call="selectedList" :show="isSelected" category="three"></yhm-commonbutton>
      </template>
      <!--筛选区-->
      <template #choose>
        <div v-show="choose" class="buttonBody mptZero">
          <yhm-radiofilter  @initData="initPageData(false)" title="完成状态" :content="isFinishPsd"></yhm-radiofilter>
          <yhm-radiofilter  @initData="initPageData(false)" title="业务相关" :content="isTravelPsd"></yhm-radiofilter>
          <yhm-radiofilter  @initData="initPageData(false)" title="发票类型" :content="invoiceCategoryPsd"></yhm-radiofilter>
          <yhm-radiofilter  @initData="initChoose('viewLevels')" title="查看下属" all="0" :content="listViewLevels"></yhm-radiofilter>
        </div>
      </template>
      <template #listHead>
        <yhm-managerth-check style="width: 50px" :check="allCheck"></yhm-managerth-check>
        <yhm-managerth style="width: 50px;" title="查看"></yhm-managerth>
        <yhm-managerth style="width: 80px;" title="申请人" value="personID"></yhm-managerth>
        <yhm-managerth style="width: 150px;" title="批次号" value="code"></yhm-managerth>
        <yhm-managerth style="width: 110px;" title="申请时间" value="workDate"></yhm-managerth>
        <yhm-managerth style="width: 95px;" title="申请金额" value="money"></yhm-managerth>
        <yhm-managerth style="width: 95px;" title="退回金额" value="refundMoney"></yhm-managerth>
        <yhm-managerth style="width: 80px;" title="发票类型"></yhm-managerth>
        <yhm-managerth title="事由" value="subjectID"></yhm-managerth>
        <yhm-managerth style="width: 120px;" title="预计核销日期" value="estimateDate"></yhm-managerth>
        <yhm-managerth style="width: 70px;" title="倒计时" value="day"></yhm-managerth>
        <yhm-managerth style="width: 60px;" title="审批留言"></yhm-managerth>
        <yhm-managerth style="width: 120px;" title="状态" value=""></yhm-managerth>
        <yhm-managerth v-if="listViewLevels.value==0" style="width: 400px" title="操作" value=""></yhm-managerth>
      </template>
      <template #listBody>
        <tr v-for="(item,index) in content" :key="index" :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]">
          <yhm-manager-td-checkbox :value="item"></yhm-manager-td-checkbox>
          <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>
          <yhm-manager-td :value="item.person"></yhm-manager-td>
          <yhm-manager-td :value="item.code"></yhm-manager-td>
          <yhm-manager-td-date :value="item.workDate"></yhm-manager-td-date>
          <yhm-manager-td-money :value="item.money"></yhm-manager-td-money>
          <yhm-manager-td-money :value="item.refundMoney"></yhm-manager-td-money>
          <yhm-manager-td-psd :value="item.invoiceCategory" :list="invoiceCategoryList"></yhm-manager-td-psd>
          <yhm-manager-td :value="item.subject"></yhm-manager-td>
          <yhm-manager-td-date :value="item.estimateDate"></yhm-manager-td-date>
          <yhm-manager-td-center :value="item.day+'天'" v-if="item.day<=2" style="color:#2c920b;font-weight: bold"></yhm-manager-td-center>
          <yhm-manager-td-center :value="item.day+'天'" v-else-if="item.day>2&&item.day<=5" style="color:#0511a5;font-weight: bold"></yhm-manager-td-center>
          <yhm-manager-td-center :value="item.day+'天'" v-else style="color: #f00;font-weight: bold"></yhm-manager-td-center>

          <yhm-manager-td-leaveword @iconClick="SelectApprovalMessage(item)" :leave-word-show="item.approvalMessage === '1'?true:false"></yhm-manager-td-leaveword>
          <yhm-manager-td-state :value="item.stateVal" :stateColor="item.stateColor" :stateImg="item.stateImg"></yhm-manager-td-state>
          <yhm-manager-td-operate v-if="listViewLevels.value==0">
            <yhm-manager-td-operate-button v-show="item.state === '-1' && item.isDelay === '0'&&item.isFinish !== '1'" @click="delayEvent(item)" value="延期核销" icon="i-delay" color="#49a9ea"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button v-show="item.state!=='0' || item.isFinish !== '1'" :no-click="item.state!=='0' || item.isFinish === '1'" @click="submit(item)" value="提交申请" icon="i-btn-applicationSm" color="#49a9ea"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button :no-click="item.isFinish !== '0' || item.state === '0'" @click="urge(item)" value="催促" icon="i-btn-urge" color="#2AA70B"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button  @click="chargeAgainst(item)" v-show="item.state === '15' && item.isChecks === '0'" value="报销冲抵" icon="i-delay" color="#49a9ea"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button  @click="aFullReturn(item)" v-show="item.state === '15' && item.isChecks === '0'" value="退回备用金" icon="i-delay" color="#49a9ea"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button  v-show="item.isChecks === '3'" @click="FullReturn(item)" value="退备用金" icon="i-btn-grant" color="#be08e3"></yhm-manager-td-operate-button>

            <yhm-manager-td-operate-button :no-click="item.state !== '0' || item.isFinish === '1'" @click="del(item)" value="删除" icon="delete" color="#FF0000"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button v-show="item.state=='1'" :no-click="item.state == '1'?false:true" @click="revocationClick(item)" icon="i-btn-applicationSm" value="撤销申请" color="#fd6802"></yhm-manager-td-operate-button>

          </yhm-manager-td-operate>
        </tr>
      </template>
      <!--数据空提示-->
      <template #empty>
        <span class="m_listNoData" v-show="empty">暂时没有数据</span>
      </template>
      <template #total>
        <div class="listTotalCrente m_list w620">
          <div class="listTotalLeft">
            <span class="test"></span>
            <span class="test">金额</span>
            <span class="test">条数</span>
          </div>
          <table width="100%" cellpadding="0" cellspacing="0" class="m_content_table m_content_total_table">
            <thead>
            <tr>
              <yhm-managerth style="width: 100px;" before-color="black" title="" before-title="总数" ></yhm-managerth>
              <yhm-managerth style="width: 100px;" before-color="#49a9ea" title="" before-title="进行中" ></yhm-managerth>
              <yhm-managerth style="width: 100px;" before-color="#ff0000" title="" before-title="已完成" ></yhm-managerth>
            </tr>
            </thead>
            <tbody>
            <tr>
              <yhm-manager-td-money @click="totalClick(item)" v-for="(item,index) in contentTotal" :key="index" :value="item.money"></yhm-manager-td-money>
            </tr>
            <tr>
              <yhm-manager-td-rgt @click="totalClick(item)" v-for="(item,index) in contentTotal" :key="index" :value="item.count"></yhm-manager-td-rgt>
            </tr>
            </tbody>
          </table>
        </div>

      </template>
      <!--分页控件-->
      <template #pager>
        <yhm-pagination :pager="pager" @initData="initPageData(false)"></yhm-pagination>
      </template>
      <!--数据空提示-->
      <template #empty>
        <span class="m_listNoData" v-show="empty">暂时没有数据</span>
      </template>

    </yhm-managerpage>
  </div>
</template>

<script>
  import { managermixin } from '@/assets/manager.js'
  export default {
    name: 'prettyCashsManager',
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
        menuTabOn: 4,
        details:[
          {id:'1', name: '付款计划',path:'/home/myPaymentPlanManager'},
          {id:'2', name: '付款申请',path:'/home/myManager/paymentApplyManager'},
          {id:'3', name: '报销',path:'/home/myManager/reimbursementManager'},
          {id:'4', name: '采购计划',path:'/home/myPurchaseManager'},
          {id:'5', name: '备用金',path:'/home/prettyCashsManager'},
          {id:'6', name: '补签字',path:'/home/myManager/signatureManager'},
          {id:'7', name: '开票申请',path:'/home/openInvoiceManager'},
          {id:'8', name: '我的快递',path:'/home/myExpressManager'},
        ],
        total:[],
        contentTotal:[],
        invoiceCategoryList: [],
        listViewLevels:{
          value:"0",
          list:[]
        },
      }
    },
    methods:{
      revocationClick(item) {//撤销申请
        this.$dialog.confirm({
          width: 300,
          tipValue: '是否确认撤销申请？',
          btnValueOk: '确定',
          alertImg: 'warn',
          okCallBack: (data) => {
            let params = {
              id: item.id,
              tableName: 47,
              isDetail: 0,
              tableDetailName: -1
            }
            this.ajaxJson({
              url: '/PersonOffice/approvalWithdraw',
              data: params,
              call: (data) => {
                if(data.type === 0){
                  this.$dialog.alert({
                    tipValue: data.message,
                    closeCallBack: ()=>{
                      this.initPageData()
                    }
                  })
                }else{
                  this.$dialog.alert({
                    alertImg: 'warn',
                    tipValue: data.message
                  })
                }
              }
            })
          }
        })
      },
      SelectApprovalMessage(item){
        this.$dialog.OpenWindow({
          width: '650',
          height: '300',
          title: '查看审批留言信息',
          url:'/approvalMessage?id='+item.id,
          closeCallBack: (data)=>{
            if(data){
            }
          }
        })
      },
      FullReturn(item){
        this.$dialog.OpenWindow({
          width: 1050,
          height: 690,
          title: '全额退回',
          url: '/fullRefundForm?ownerID=' + item.id,
          closeCallBack: (data) => {
            if (data) {
              this.initPageData(false)
            }
          }
        });
      },
      totalClick(item){
        if(item.val === '总数'){
          this.isFinishPsd.value = ''
        }else if(item.val === '已完成'){
          this.isFinishPsd.value = '0'
        }else if(item.val === '进行中'){
          this.isFinishPsd.value = '1'
        }
        this.initPageData(false)
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
                url: '/PersonOffice/prettyCashsManagerTotal',
                data:params,
                call:(information) =>{
                  this.contentTotal = information
                }
              })
            }
          }
        })
      },
      //打开选中信息
      selectedList(){
        let params={
          selectValue:this.selectValue
        }
        this.ajaxJson({
          url: '/PersonOffice/commonSelectedsave',
          data:params,
          call:(data) =>{
            if(data.type===0){
              this.$dialog.OpenWindow({
                width: '1050',
                height: '620',
                title: '查看选中信息',
                url: '/prettyCashsView?id='+data.val,
                // url: '/PaymentPlanFormView?id='+data.val,
                closeCallBack: (dataTwo)=>{
                  if(dataTwo){

                  }
                }
              })
            }
          }
        })
      },
      cancelAfterVerification(){
        // this.$dialog.confirm({
        //     width: 250,
        //     tipValue: '请选择核销类型',
        //     alertImg: 'warn',
        //     btnValueCancel:'全额退款',
        //     btnValueOk:'报销冲抵',
        //     okCallBack: () => {
        //
        //     }
        // })
      },

      /* 报销冲抵 */
      chargeAgainst(item){

        this.$dialog.OpenWindow({
          width: 1050,
          height: 690,
          title: '报销冲抵',
          url: '/reimbursementForm?chargeID=' + item.id,
          closeCallBack: (data)=>{
            if(data){
              // console.log(data);
              this.initPageData(false)
            }
          }

        })


      },
      aFullReturn(item){
        this.$dialog.OpenWindow({
          width: 1050,
          height: 690,
          title: '全额退回',
          url: '/fullRefundForm?ownerID=' + item.id,
          closeCallBack: (data) => {
            if (data) {
              this.initPageData(false)
            }
          }
        });
      },
      /* 延期核销 */
      delayEvent(item){
        if(item){
          this.$dialog.confirm({
            width: 250,
            tipValue: '是否延期核销?如果逾期未退还将收取利息',
            alertImg: 'warn',
            okCallBack: () => {
              let params = {
                id: item.id
              }
              this.ajaxJson({
                url: '/PersonOffice/prettyCashsEstimateDateDelay',
                data: params,
                call: (data) => {
                  if (data.type === 0) {
                    this.$dialog.alert({
                      width: 250,
                      tipValue: '延期成功',
                      closeCallBack: ()=>{
                        this.initPageData(false)
                      }
                    })
                  }else{
                    this.$dialog.alert({
                      width: 250,
                      alertImg: 'error',
                      tipValue: '延期失败',
                      closeCallBack: ()=>{
                      }
                    })
                  }
                }
              })
            }
          })
        }
      },
      listView(item){
        let url=''
        if(item.state==='0'){
          url='/prettyCashsForm?id='+item.id
        }else{
          url='/prettyCashsView?id='+item.id
        }
        this.$dialog.OpenWindow({
          width: '1050',
          height: '740',
          title: '查看备用金信息',
          url:url,
          closeCallBack: (data)=>{
            if(data){
              this.initPageData(false)
            }
          }
        })
      },
      menuTab (index) {
        this.menuTabOn = index
      },
      urge (item) {
        if (item.id) {
          this.$dialog.confirm({
            width: 250,
            tipValue: '是否催促?',
            btnValueOk: '是',
            btnValueCancel: '否',
            alertImg: 'warn',
            okCallBack: () => {
              let params = {
                id: item.id,
                tableName: 47
              }
              this.ajaxJson({
                url: '/PersonOffice/approvalPressVue',
                data: params,
                call: (data) => {
                  if (data.type === 0) {
                    this.$dialog.alert({
                      tipValue: '催促成功！'
                    })
                  }
                }
              })
            }
          })
        }
      },
      submit (item) { //提交申请
        if (item.isFinish === '0' && item.state === '0') {
          let category='';
          if(item.money<1000){
            category='0';
          }else if(item.money>=1000&&item.money<10000){
            category='21';
          }else if(item.money>=10000&&item.money<100000){
            category='22';
          }else{
            category='23';
          }
          let params = {
            id: item.id,
            category: category,
            tableName: 47,
            isDetail: 0,
            tableDetailName: -1
          }
          this.ajaxJson({
            url: '/PersonOffice/approvalSubmitVue',
            data: params,
            call: (data) => {
              if (data.type === 0) {
                this.$dialog.alert({
                  tipValue: data.message,
                  closeCallBack: () => {
                    this.initPageData(false)
                  }
                })
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
        } else {
          this.$dialog.alert({
            tipValue: '没有获取到提交数据!',
            alertImg: 'error'
          })
        }
      },
      del(item){
        this.$dialog.confirm({
          width: 300,
          tipValue: '确定删除？',
          btnValueOk: '确定',
          alertImg: 'warn',
          okCallBack: (data) => {
            let params = {
              id: item.id
            }
            this.ajaxJson({
              url: '/PersonOffice/prettyCashsDel',
              data: params,
              call: (data)=>{
                if(data.type === 0){
                  this.$dialog.alert({
                    tipValue: data.message,
                    closeCallBack: ()=>{
                      this.initPageData()
                    }
                  })
                }else{
                  this.$dialog.alert({
                    alertImg: 'warn',
                    tipValue: data.message
                  })
                }
              }
            })
          }
        })
      },
      add(id,state){
        let url='/prettyCashsForm?isAdd=true'
        let title='添加备用金信息'

        this.$dialog.OpenWindow({
          width: '1050',
          height: '740',
          title: title,
          url:url,
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
            viewLevels:this.listViewLevels.value
          }
        }
        this.init({
          initValue:initValue,
          url: '/PersonOffice/prettyCashsManager',
          data:params,
          all:(data) =>{
            this.contentTotal = data.total
          },
          init:(data)=>{
            this.isFinishPsd = data.isFinishPsd
            this.isTravelPsd = data.isTravelPsd
            this.invoiceCategoryPsd = data.invoiceCategoryPsd
            this.invoiceCategoryList = data.invoiceCategoryPsd.list
            this.contentTotal = data.total
            this.listViewLevels=data.viewLevelsPsd
          }
        })
      },
    }
  }
</script>

<style scoped>

</style>
