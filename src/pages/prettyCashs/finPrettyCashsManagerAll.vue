<template>
  <div>
    <yhm-managerpage category="1" :total-table="true">
      <!--导航条-->
      <template #navigationTab>
        <a class="menuTabDiv" href="/Fin/_bankDetailManager?menuType=1">收支明细</a>
        <router-link class="menuTabDiv" :to="{path:'/home/viewManager/paymentPlanViewManager'}">付款计划</router-link>
        <router-link class="menuTabDiv" :to="{path:'/home/viewManager/paymentApplyViewManager'}">付款申请</router-link>
        <router-link class="menuTabDiv" :to="{path:'/home/viewManager/reimbursementViewManager'}">报销申请</router-link>
        <router-link class="menuTabDiv" :to="{path:'/home/viewManager/finReimbursementDetailManager?type=1'}">特殊报销</router-link>
        <router-link class="menuTabDiv menuTabActive" :to="{path:'/home/viewManager/finPrettyCashsManagerAll'}">备用金</router-link>
        <router-link class="menuTabDiv" :to="{path:'/home/bankDetailRenewalManager'}">支付续保费</router-link>
        <router-link class="menuTabDiv" :to="{path:'/home/BankDetailRebateManager'}">支付客户返利</router-link>
        <router-link class="menuTabDiv" :to="{path:'/home/finPurchaseManager'}">采购计划</router-link>
        <router-link class="menuTabDiv " :to="{path:'/home/finBillingManager'}">保险保单</router-link>

      </template>
      <!--操作区-->
      <template #operate>
        <yhm-table-tip ref="smallTable" @call="clickTipEvent" :show="tableTip" :content="tableTipInfo" :column="refundMap" :mouse-control="tableTipControl"></yhm-table-tip>
        <yhm-commonbutton :value="choose?'收起筛选':'展开筛选'"  :icon="choose?'btnUp':'btnDown'" @call="switchChoose()"></yhm-commonbutton>
        <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initData"></yhm-managersearch>
        <div @click="selectedList" v-show="isSelected" class="b_main one b_one mr5b">打开选中信息</div>
        <yhm-radiofilter  @initData="initChoose('isFinish')" title="完成状态" :content="isFinishPsd"></yhm-radiofilter>
        <yhm-radiofilter @initData="initChoose('dateType')" title="时间类型"  :content="dateTypeList"></yhm-radiofilter>
      </template>
      <!--筛选区-->
      <template #choose>
        <div v-show="choose" class="buttonBody mptZero">
          <yhm-radiofilter  @initData="initChoose('isTravel')" title="业务相关" :content="isTravelPsd"></yhm-radiofilter>
          <yhm-radiofilter  @initData="initChoose('isTravel')" title="发票类型" :content="invoiceCategoryPsd"></yhm-radiofilter>
        </div>
      </template>
      <template #listHead>
        <yhm-managerth-check :check="allCheck" style="width: 40px;"></yhm-managerth-check>
        <yhm-managerth style="width: 38px;" title="查看"></yhm-managerth>
        <yhm-managerth style="width: 80px;" title="申请人" value="personID"></yhm-managerth>

        <yhm-managerth style="width: 150px;" title="批次号" value="code"></yhm-managerth>
        <yhm-managerth style="width: 110px;" title="申请时间" value="workDate"></yhm-managerth>
        <yhm-managerth style="width: 70px;" title="占用天数" value="workDateDay"></yhm-managerth>
        <yhm-managerth style="width: 120px;" title="申请金额" value="money"></yhm-managerth>

        <yhm-managerth style="width: 100px;" title="已拨款" value="bankDetailMoney"></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="已核销" value="reimbursementsMoney"></yhm-managerth>

        <yhm-managerth style="width: 100px;" title="已退现金" value="balance"></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="待退回" value="balance"></yhm-managerth>

        <yhm-managerth style="width: 70px;" title="退款方式" value="useType"></yhm-managerth>
        <yhm-managerth style="width: 70px;" title="发票类型"></yhm-managerth>

        <yhm-managerth title="事由" value="subjectID"></yhm-managerth>
        <yhm-managerth style="width: 120px;" title="预计核销日期" value="estimateDate"></yhm-managerth>
        <yhm-managerth style="width: 60px;" title="倒计时" value="day"></yhm-managerth>

        <yhm-managerth style="width: 60px;" title="审批留言"></yhm-managerth>
        <yhm-managerth style="width: 120px;" title="状态" value=""></yhm-managerth>
      </template>
      <template #listBody>
        <tr v-for="(item,index) in content" :key="index" :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]">

          <yhm-manager-td-checkbox :value="item"></yhm-manager-td-checkbox>
          <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>
          <!--<yhm-manager-td :value="item.person"></yhm-manager-td>-->
          <yhm-manager-td-center :value="item.person" :menu-list="personMenu" @rightClick="rightClick(item)" @menuClick="menuClick"></yhm-manager-td-center>
          <yhm-manager-td :value="item.code"></yhm-manager-td>
          <yhm-manager-td-date :value="item.workDate"></yhm-manager-td-date>
          <yhm-manager-td-center :value="item.workDateDay+'天'" style="color:#2c920b;font-weight: bold"></yhm-manager-td-center>
          <yhm-manager-td-money :value="item.money"></yhm-manager-td-money>

          <yhm-manager-td-money :value="item.bankDetailMoney" @click="detailView(item)" style="font-weight: bold;color:#075af1;"></yhm-manager-td-money>
          <yhm-manager-td-money :value="item.reimbursementsMoney" @click="reimbursementView(item)"></yhm-manager-td-money>

          <yhm-manager-td-money :value="item.refundBalance" :before-icon="item.refundBalance>0?'i-btn-prompt':''" @mouseover="tableTipShowEvent" @mouseout="tableTipHideEvent" :value-object="item"></yhm-manager-td-money>
          <yhm-manager-td-money :value="item.balance" style="color: #f00"></yhm-manager-td-money>

          <yhm-manager-td v-show="item.useType==='0'" value=""></yhm-manager-td>
          <yhm-manager-td @click="useType(item)" v-show="item.useType==='1'" value="退回"></yhm-manager-td>
          <yhm-manager-td @click="useType(item)" v-show="item.useType==='2'" value="报销"></yhm-manager-td>
          <yhm-manager-td-psd :value="item.invoiceCategory" :list="invoiceCategoryList"></yhm-manager-td-psd>

          <yhm-manager-td :value="item.subject"></yhm-manager-td>
          <yhm-manager-td-date :value="item.estimateDate"></yhm-manager-td-date>
          <yhm-manager-td-center :value="item.day+'天'" v-if="item.day<=2" style="color:#2c920b;font-weight: bold"></yhm-manager-td-center>
          <yhm-manager-td-center :value="item.day+'天'" v-else-if="item.day>2&&item.day<=5" style="color:#0511a5;font-weight: bold"></yhm-manager-td-center>
          <yhm-manager-td-center :value="item.day+'天'" v-else style="color: #f00;font-weight: bold"></yhm-manager-td-center>

          <yhm-manager-td-leaveword @iconClick="SelectApprovalMessage(item)" :leave-word-show="item.approvalMessage === '1'?true:false"></yhm-manager-td-leaveword>
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
        <yhm-managerth style="width: 100px;" before-color="#49a9ea" title="" before-title="已拨款" ></yhm-managerth>
        <yhm-managerth style="width: 100px;background: #aceaea;" before-color="#2c920b" title="" before-title="已核销" ></yhm-managerth>
        <yhm-managerth style="width: 100px;background: #cdf5d0;" before-color="#c700df" title="" before-title="已退现金" ></yhm-managerth>
<!--        <yhm-managerth style="width: 100px;" before-color="#08acc0" title="" before-title="备用金退款" ></yhm-managerth>-->
        <yhm-managerth style="width: 100px;" before-color="#ff0000" title="" before-title="待退回" ></yhm-managerth>
      </template>
      <template #listTotalLeft>
        <div class=" listTotalLeft">
          <span class="test"></span>
          <span class="test">金额</span>
<!--          <span class="test">条数</span>-->
        </div>
      </template>
      <template #listTotalBody>
        <tr>
          <yhm-manager-td-money @click="totalClick(item)" v-for="(item,index) in contentTotal" :key="index" :value="item.money" :class="getMoneyStyle(index)"></yhm-manager-td-money>
        </tr>
<!--        <tr>-->
<!--          <yhm-manager-td-rgt @click="totalClick(item)" v-for="(item,index) in contentTotal" :key="index" :value="item.count"></yhm-manager-td-rgt>-->
<!--        </tr>-->
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
        tableTip: false,
        tableTipControl: {},
        tableTipInfo:[],
        refundMap:[
          {width:'140',title:'退备用金',category:'money',key:'refundMoney'},
          {width:'100',title:'特殊账户',category:'money',key:'specialMoney'},
        ],

        invoiceCategoryList: [],
        contentTotal:[],
        dateType:'',
        dateTypeList: {
          value: '1',
          list: [{showName:"本周", num: "0", code: "", img: ""},{showName:"本月", num: "1", code: "", img: ""},{showName:"本季度", num: "2", code: "", img: ""},{showName:"本年", num: "3", code: "", img: ""},]
        },
        suppArr: [
          {id: 'E117833A-AAB1-408E-B278-A0C6E2D3442C'},
          {id: '0A2F4D28-9BAA-4DEC-9EF6-DFD2A6E0528A'},
          {id: '8FDC4572-4344-4618-95D4-54F5DEB0E42C'},
          {id: '70CE7063-491E-4FE2-9066-CD395877E140'},
          {id: '256B20AD-B15F-441E-92CA-3C0316F54650'},
          {id: 'EDAF3303-B5C6-4BD6-890D-A7ADE9233E3A'},
          {id: '6BCB1E61-61F5-410C-B2CB-AE19EF24B6CA'},
          {id: 'D47518BB-359B-4ABC-BBF0-C51590957B29'},
          {id: '59638AF2-5D13-4003-B908-ABA9B22C04F2'},
          {id: 'D5C8486B-0060-4C47-8996-B88AF443EC9C'},
        ],
        personMenu:['筛选当前申请人','排除当前人筛选'],
        personType:'',
        personID:'',
      }
    },
    methods:{
      rightClick(item){//点击右键菜单时获取当前点击的数据
        this.personID=item.personID
      },
      menuClick(item){//返回用户选中的菜单选项及索引值
        if(item==='筛选当前申请人'){
          this.personMenu=['取消当前申请人','排除当前人筛选']
          this.personType='0'
        }else if(item==='取消当前申请人'){
          this.personMenu=['筛选当前申请人','排除当前人筛选']
          this.personID = ''
          this.personType=''
        }else if(item==='排除当前人筛选'){
          this.personMenu=['筛选当前申请人','取消排除']
          this.personType='1'
        }else if(item==='取消排除'){
          this.personMenu=['筛选当前申请人','排除当前人筛选']
          this.personID = ''
          this.personType=''
        }
        this.initPageData(false)
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
      clickTipEvent(item,title){
        let id = ''
        if(title==='退备用金'){
          id = item.refundID
        }else if(title==='特殊账户'){
          id = item.refundSpecialID
        }
        setTimeout(()=>{
          this.$dialog.OpenWindow({
            width: '1050',
            height: '620',
            title: '查看收支明细',
            url: '/unitDetailView?id='+id,
            closeCallBack: (dataTwo)=>{
            }
          })
        },0)

      },
      /* 小标格显示 */
      tableTipShowEvent(item,control){
        if(item.refundBalance > 0) {
          this.currentControl = control
          this.tableTipInfo = item.refundMap
          this.tableTipControl = control
          this.tableTip = true
          this.currentControl = control
        }
        else{
          this.currentControl = null
          this.tableTip = false
        }
      },
      moveToSmallTable(e){
        this.refundMapList = ''
        if(this.currentControl) {
          if(!(this.currentControl.contains(e.target) || this.$refs.smallTable.$el.contains(e.target))){
            this.tableTip = false
          }
        }
        else{
          document.removeEventListener('mouseover', this.moveToSmallTable)
        }
      },
      tableTipHideEvent(item,control){
        if(item.refundBalance > 0){
          document.addEventListener('mouseover', this.moveToSmallTable)
        }
      },
      reimbursementView(item){//跳转到报销
        if(item.reimbursementsMoney > 0){
          this.$dialog.OpenWindow({
            width: '1050',
            height: '620',
            title: '查看报销信息',
            url: '/reimbursementViewForm?id='+item.reimbursementsID,
            closeCallBack: (dataTwo)=>{
            }
          })
        }
      },
      detailView(item){//拨款金额跳转到收支明细
        let onOff = false;
        for(let i in this.suppArr){
          if(item.bankDetailID === this.suppArr[i].id ){
            onOff = true
          }
        }
        if(item.bankDetailID!==''){
          if(!onOff){
            this.$dialog.OpenWindow({
              width: '1050',
              height: '620',
              title: '查看收支明细',
              url: '/unitDetailView?id='+item.bankDetailID,
              closeCallBack: (dataTwo)=>{
              }
            })
          }else{
            this.$dialog.alert({
              width: '420',
              alertImg: 'warn',
              tipValue: '此条信息是补录信息,暂无收支明细！！！',
              closeCallBack: ()=>{

              }
            })
          }
        }

      },
      //退款方式
      useType(item){
        if(item.useType === '1'){

        }else if(item.useType === '2'){

        }
      },
      totalClick(item){
        // if(item.val==='总数'){
        //   this.listState.value = ''
        // } else if(item.val==='已完成'){
        //   this.listState.value = '0'
        // } else if(item.val==='进行中'){
        //   this.listState.value = '1'
        // } else if(item.val==='驳回'){
        //   this.listState.value = '2'
        // }
        // this.pageIndex=1
        // this.initPageData()
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
            isFinish:'1',
            dateType: this.dateTypeList.value,
          }
        } else {
          params = {
            isFinish: this.isFinishPsd.value,
            isTravel: this.isTravelPsd.value,
            invoiceCategory: this.invoiceCategoryPsd.value,
            dateType : this.dateTypeList.value,
            personID : this.personID,
            personType : this.personType,
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

    },
    computed: {
      getMoneyStyle(){
        return function (index) {
          if(index === 0){
            return 'fwBlod'
          }else if(index === 3){
            return 'cF00'
          }
        }
      }
    }
  }
</script>

<style scoped>
.fwBlod{
  font-weight: bold;
}
.cF00{
  color: #f00;
}
</style>
