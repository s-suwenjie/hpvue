<template>
  <div>
    <yhm-managerpage category="1">
      <!--导航条-->
      <template #navigationTab>
        <router-link class="menuTabDiv" :to="{path:'/home/approvalPayPlanManager'}">付款计划
          <i class="noticeNum" v-if="payPlanNum!=0">{{payPlanNum}}</i>
        </router-link>
        <router-link class="menuTabDiv menuTabActive" :to="{path:'/home/approvalPayManager'}">付款申请</router-link>
        <router-link class="menuTabDiv" :to="{path:'/home/approvalReimbursementManager'}">报销
          <i class="noticeNum" v-if="reimburseNum!=0">{{reimburseNum}}</i>
        </router-link>
        <router-link class="menuTabDiv" :to="{path:'/home/approvalPurchaseManager'}">采购计划
          <i class="noticeNum" v-if="purchaseNum!=0">{{purchaseNum}}</i>
        </router-link>
        <router-link class="menuTabDiv" :to="{path:'/home/approvalPrettyCashs'}">备用金
          <i class="noticeNum" v-if="prettyCashsNum!=0">{{prettyCashsNum}}</i>
        </router-link>
<!--        <router-link class="menuTabDiv  " :to="{path:'/home/approvalInsuranceManager'}">保险审批-->
<!--          <i class="noticeNum" v-if="insuranceNum!=='0'">{{insuranceNum}}</i>-->
<!--        </router-link>-->
        <router-link class="menuTabDiv  " :to="{path:'/home/approvalOpenInvoiceManager'}">开票审批
          <i class="noticeNum" v-if="openInvoiceNum!='0'">{{openInvoiceNum}}</i>
        </router-link>
<!--        <router-link class="menuTabDiv" :to="{path:'/home/promotions/promotionsAppManager'}">活动审批-->
<!--          <i class="noticeNum" v-if="promotions!='0'">{{promotions}}</i>-->
<!--        </router-link>-->
        <router-link class="menuTabDiv" :to="{path:'/home/approvalInvoiceRiseManager'}">发票抬头
                    <i class="noticeNum" v-if="invoiceRiseNum!='0'">{{invoiceRiseNum}}</i>
        </router-link>
<!--        <router-link class="menuTabDiv " :to="{path:'/home/expressApprovalManager'}">快递审批-->
<!--          &lt;!&ndash;<i class="noticeNum" v-if="paymentNum!=0">{{paymentNum}}</i>&ndash;&gt;-->
<!--        </router-link>-->
        <router-link class="menuTabDiv " :to="{path:'/home/RecoveryApprovalManager'}">旧件审批</router-link>

      </template>

      <!--操作区-->
      <template #operate>
        <yhm-table-tip :show="tableTip" :content="tableTipInfo" :column="tableTipColumnInfo" :mouse-control="tableTipControl"></yhm-table-tip>
        <yhm-commonbutton :value="choose?'收起筛选':'展开筛选'" :icon="choose?'btnUp':'btnDown'" @call="switchChoose()"></yhm-commonbutton>
        <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initData"></yhm-managersearch>
        <yhm-commonbutton value="打开选中信息" icon="i-selectAll" @call="selectedList" :show="isSelected" category="three"></yhm-commonbutton>
        <yhm-commonbutton v-if="showBatchAppropriation" value="批量拨付" icon="i-batchAllca" @call="batchAllca" category="three"></yhm-commonbutton>
      </template>

      <!--筛选区-->
      <template #choose>
        <div v-show="choose" class="buttonBody mptZero">
          <yhm-radiofilter :before="stateBefore" @initData="initChoose('categoryUnit')" title="状态" all="0" :content="listIsFinish"></yhm-radiofilter>
          <yhm-radiofilter :before="stateBefore" @initData="initChoose('isChecks')" title="支付方式" all="1" :content="listIsChecks"></yhm-radiofilter>
          <yhm-radiofilter :before="stateBefore" @initData="initChoose('isAllocation')" title="是否分批拨付" all="1" :content="listIsAllocation"></yhm-radiofilter>
        </div>
      </template>

      <!--数据表头-->
      <template #listHead>
        <yhm-managerth style="width: 38px;" title="选择"></yhm-managerth>
        <yhm-managerth style="width: 38px;" title="查看"></yhm-managerth>
        <yhm-managerth width="184" title="收款方" value="id"></yhm-managerth>
        <yhm-managerth width="80" title="申请人"></yhm-managerth>
        <yhm-managerth width="90" title="支付方式" value="isChecks"></yhm-managerth>
        <yhm-managerth width="120" title="最迟付款日期" value="lastDate"></yhm-managerth>
        <yhm-managerth width="70" title="倒计时" value="day"></yhm-managerth>
        <yhm-managerth width="120" title="事由"></yhm-managerth>
        <yhm-managerth width="100" title="付款申请金额" value="money"></yhm-managerth>
        <yhm-managerth width="240" title="编号"></yhm-managerth>
        <yhm-managerth width="60" title="审批留言"></yhm-managerth>
        <yhm-managerth width="120" title="状态" value="state"></yhm-managerth>
        <yhm-managerth width="320" title="操作"></yhm-managerth>
      </template>

      <!--数据明细-->
      <template #listBody>
        <tr :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]" v-for="(item,index) in content"
            :key="index">
          <yhm-manager-td-checkbox :value="item"></yhm-manager-td-checkbox>
          <yhm-manager-td-look @click="add(item)"></yhm-manager-td-look>
          <yhm-manager-td :value="item.otherUnit"></yhm-manager-td>
          <yhm-manager-td-center :value="item.person"></yhm-manager-td-center>
          <yhm-manager-td-psd :value="item.isChecks" :list="isChecksList"></yhm-manager-td-psd>
          <yhm-manager-td-date :value="item.lastDate"></yhm-manager-td-date>


          <yhm-manager-td-center :value="item.day+'天'" v-if="item.day<=2" style="color:#2c920b;font-weight: bold"></yhm-manager-td-center>
          <yhm-manager-td-center :value="item.day+'天'" v-else-if="item.day>2&&item.day<=5" style="color:#0511a5;font-weight: bold"></yhm-manager-td-center>
          <yhm-manager-td-center :value="item.day+'天'" v-else style="color: #f00;font-weight: bold"></yhm-manager-td-center>

          <yhm-manager-td-center :value="item.subject" @click="skipEvent(item)" :color="item.ownerID!=''&&item.ownerType=='1'?'#49a9ea':''"></yhm-manager-td-center>

          <yhm-manager-td-money :tip-category="1" :before-icon="item.balanceList.length > 0?'i-btn-prompt':''" @mouseover="tableTipShowEvent" :value-object="item" @mouseout="tableTipHideEvent" :value="item.money"></yhm-manager-td-money>

          <yhm-manager-td-center :value="item.code" :class="{priority:item.isPriority === '1'}"></yhm-manager-td-center>
          <yhm-manager-td-leaveword @iconClick="SelectApprovalMessage(item)" :leave-word-show="item.approvalMessage === '1'?true:false"></yhm-manager-td-leaveword>
          <yhm-manager-td-state :value="item.stateVal" @click="storeName(item.list)" :stateColor="item.stateColor" :stateImg="item.stateImg"></yhm-manager-td-state>
          <yhm-manager-td-operate>
            <yhm-manager-td-operate-button :tip-category="0"  @mouseover="tableTipShowEvent" @mouseout="tableTipHideEvent" :value-object="item" v-show="item.isPrint === '1' " :no-click="item.nature === '2'" @click="printFund(item)" value="打印单据" icon="i-btn-print" color="#333"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button v-show="item.isApproval === '2'&&item.isFinish !== '1'" value="待上传发票"  :no-click="true" ></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button v-show="item.isApproval === '3'" value="查看发票"  @click="viewInvoice(item)"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button v-show="item.isApproval === '4'" value="支票入账"  @click="accEntry(item)" class="icon i-accEntry" color="#49a9ea"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button v-show="item.isApproval === '4'" value="查看票样"  @click="viewCheck(item)" class="icon i-viewCheck" color="#be08e3"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button v-show="item.isApproval === '4'" value="支票作废"  @click="toVoidCheck(item)" class="icon i-toVoidCheck" color="#f00"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button v-show="item.approval === '4' && item.isChecks === '1'&&item.isApproval!=='4'&&item.isApproval !== '2'&&item.isApproval !== '3'" :no-click="item.isApproval==='4'" @click="selectChecksDetail(item)" value="支票填开" icon="i-btn-grant" color="#be08e3"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button v-show="item.approval === '4' && item.isPrint === '1' && item.isChecks !== '1' && item.isApproval!=='5' && item.isApproval!=='6'" :no-click="item.isApproval==='4'" @click="approFund(item)" value="拨付资金" icon="i-btn-grant" color="#be08e3"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button v-show="item.isApproval==='6'" :no-click="item.isApproval==='4'" @click="approFund(item)" value="拨付资金" icon="i-btn-grant" color="#be08e3"></yhm-manager-td-operate-button>

<!--            <yhm-manager-td-operate-button v-show="item.approval === '4' && item.isPrint === '1'" :no-click="item.isApproval==='4'" @click="approFund(item)" value="拨付资金" icon="i-btn-grant" color="#be08e3"></yhm-manager-td-operate-button>-->
            <yhm-manager-td-operate-button v-show="(item.isApproval === '1' || item.isPrint !== '1') && item.isPrint === '0'" :no-click="item.isApproval!=='0'" @click="adoptEvent(item)" value="通过" icon="i-btn-applicationSm" color="#49a9ea"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button v-show="(item.isApproval === '0' && item.isPrint === '1') || item.isPrint === '0'" :no-click="item.isApproval!=='0'" @click="rejectEvent(item)" value="驳回" icon="i-btn-turnDown" color="#FF0000"></yhm-manager-td-operate-button>
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
              <yhm-managerth style="width: 100px;" before-color="black" title="" before-title="总数"></yhm-managerth>
              <yhm-managerth style="width: 100px;" before-color="#49a9ea" title="" before-title="未审批" ></yhm-managerth>
              <yhm-managerth style="width: 100px;" before-color="#ff0000" title="" before-title="已审批" ></yhm-managerth>
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
    </yhm-managerpage>
  </div>
</template>
<script>
  import { managermixin } from '@/assets/manager.js'

  export default {
    name: 'paymentApplyManager',
    mixins: [managermixin],
    data () {
      return {
        orderColumn: 'lastDate', // 排序的列
        order: 'desc', // 排序的顺序

        index: '',
        indexNum: '',
        empty: true,
        category: '',
        subjectCount: '',
        otherUnitID: false,
        otherAccountID: false,
        lastDate: false,
        money: false,
        state: false,
        showBatchAppropriation: false,

        isChecksList:[],
        isChecks:'',
        listIsChecks:{
          value: '',
          list: []
        },

        isAllocation: '',
        listIsAllocation: {
          value: '',
          list: []
        },
        stateBefore: '0', // 默认选择状态为可以选择，1为不可以选择
        listIsFinish: {
          value: '',
          list: []
        },
        stateItems:[],
        payPlanNum: '',
        paymentNum: '',
        reimburseNum: '',
        purchaseNum: '',
        prettyCashsNum:'',
        insuranceNum:'',
        openInvoiceNum:'',
        promotions:'',
        invoiceRiseNum:'',
        tableTip: false,
        tableTipControl: {},
        tablePrintTipColumnInfo:[
          {width:'60',title:'操作人',category:'',key:'person'},
          {width:'120',title:'最新打印时间',category:'',key:'printDate'},
          {width:'40',title:'次数',category:'',key:'times'}
        ],
        balanceTableTipColumnInfo:[
          {width:'110',title:'总金额',category:'money',key:'money'},
          {width:'110',title:'(-)拨款金额',category:'money',key:'bankDetailMoney'},
          {width:'110',title:'(=)剩余金额',category:'money',key:'balance'},
        ],
        tableTipInfo:[],
        balanceList:[],
        printLogList: {},
        tableTipColumnInfo: [],
        contentTotal: []
      }
    },
    methods: {
      skipEvent(item){
        if(item.ownerID!=''&&item.isRelevance=='1'){
          this.$dialog.OpenWindow({
            width: '1050',
            height: '700',
            title: '查看保单信息',
            url:'/billingView?id='+item.ownerID,
            closeCallBack: (data)=>{
              if(data){
              }
            }
          })
        }
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
      /* 批量拨付 */
      batchAllca(){
        this.$dialog.OpenWindow({
          width: '1250',
          height: '750',
          title: '批量拨付',
          url: '/payApplyReconDetailForm',
          closeCallBack: (data)=>{
            if(data){
              console.log(data)
            }
          }
        })
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
        // this.initPageData()
      },
      //选中汇总
      selectedSum(){
        let params={
          selectValue:this.selectValue
        }
        this.ajaxJson({
          url: '/PersonOffice/commonSelectedsave',
          data:params,
          call:(data) =>{
            if(data.type===0){
              let paramsFinish = {
                isFinish: this.listIsFinish.value,
              }
              this.ajaxJson({
                url: '/PersonOffice/payApprovalTotal',
                data: paramsFinish,
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
                url: '/approvalApplyView?id='+data.val,
                closeCallBack: (dataTwo)=>{
                  if(dataTwo){
                    this.initPageData(false)
                  }
                }
              })
            }
          }
        })
      },

      //查看拨付资金  往来明细 凭证
      storeName(item){
        if(item.length>0){
          if (item.image === "0") {
            //查看文件
            var url = "/UploadFile/" + this.tag + "/" + item.storeName;
            window.open(url)
          } else {
            //查看图片
            var imgArr = [];
            for (var i = 0; i < item.length; i++) {
              var temp = item[i];
              if (temp.image === "1") {
                imgArr.push("/UploadFile/" + temp.tag + "/" + temp.storeName);
              }
            }
            var index = imgArr.indexOf("/UploadFile/" + item.tag + "/" + item.storeName) + 2;
            this.$dialog.preview(imgArr, index)
          }
        }
      },
      /* 入账*/
      accEntry(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '690',
          title: '支票入账操作',
          url: '/accEntry?bankDetailType=4&ownerID=' + item.checksID,
          closeCallBack: (data)=>{
            if(data){
              this.initPageData(false)
            }
          }
        })
      },
      /* 作废 */
      toVoidCheck(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '690',
          title: '支票作废',
          url: '/toVoidCheck?ownerID=' + item.checksID+'&paymentID='+item.id,
          closeCallBack: (data)=>{
            if(data){
              this.initPageData(false)
            }
          }
        })
      },
      /* 查看票样 */
      viewCheck(item){
        this.$dialog.OpenWindow({
          width: '850',
          height: '340',
          title: '查看票样',
          url: '/viewCheck?ownerID=' + item.checksID,
          closeCallBack: ()=>{

          }
        })
      },
        selectChecksDetail(item){
          let params={
            ownerID:item.otherUnitID
          }
          this.ajaxJson({
            url: '/finance/receivableCenterDetail/sumMoney',
            data: params,
            call: (data) => {
              if(parseFloat(data)>0){
                let param={
                  id:item.otherUnitID
                }
                this.ajaxJson({
                  url: '/finance/receivableForceWriteOff/isExistByOwnerID',
                  data: param,
                  call: (data) => {
                    if(data === 1) {
                      //处理强制核销内容
                      this.checkSelectReceivableForce(item)
                    }else{
                      this.checkSelectReceivable(item)
                    }
                  }
                })
              }else{
                //当应收账款为0时  直接选择支票
                this.selectCheckDetail(item)
              }
            }
          })
        },
      checkSelectReceivableForce(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '690',
          url: '/selectReceivableForceWriteOff?ownerID=' + item.otherUnitID + '&writeOffMoney=' + item.money + '&otherID=' + item.id + '&otherCategory=0',
          title: '选择应收账款金额',
          closeCallBack: (data) => {
            if (data) {
              if(data == 1){
                this.$dialog.close()
                return
              }
              let writeOffMoney = data.writeOffMoney
              sessionStorage.list = JSON.stringify(data.list)
              if (parseFloat(item.money) === parseFloat(data.writeOffMoney)) {
                let param = {
                  otherID: item.otherUnitID,
                  writeOffMoney: item.money,
                  otherAccountType: item.personOrUnit,
                  receivabledetailList: data.list,
                  receivabledetailType: '1',
                  ownerID: item.id,
                }
                console.log(param)
                this.ajaxJson({
                  url: '/fin/receivableWriteOff',
                  data: param,
                  call: (off) => {
                    if (off.type === 0) {
                      this.$dialog.alert({
                        tipValue: '核销成功',
                        closeCallBack: () => {
                          this.$dialog.close()
                        }
                      })
                      this.initPageData(false)
                    } else {
                      this.$dialog.alert({
                        alertImg: 'error',
                        tipValue: '核销失败',
                        closeCallBack: () => {
                        }
                      })
                    }
                  }
                })
              } else if (parseFloat(item.money) > parseFloat(data.writeOffMoney)) {
                this.$dialog.OpenWindow({
                  url: '/selectChecksDetail?stateBefore=1&state=0&category=',
                  width: "1000",
                  height: "650",
                  title: '选择支票',
                  closeCallBack: (data) => {
                    if (data) {
                      if (data.category === '0') {
                        this.$dialog.OpenWindow({
                          width: '1050',
                          height: '690',
                          title: '支票填开',
                          url: '/checkFillOut?ownerID=' + data.id + "&otherOwnerID=" + item.id + '&otherCategory=1&receivabledetailType=1&receivabledetailMoney=' + writeOffMoney,
                          closeCallBack: (information) => {
                            if (information) {
                              this.initPageData(false)
                            }
                          }
                        })
                      } else {
                        if (item.personOrUnit === '0') {
                          this.$dialog.OpenWindow({
                            width: '1050',
                            height: '690',
                            title: '支票填开',
                            url: '/checkFillOut?ownerID=' + data.id + "&otherOwnerID=" + item.id + '&otherCategory=1&receivabledetailType=1&receivabledetailMoney=' + writeOffMoney,
                            closeCallBack: (information) => {
                              if (information) {
                                this.initPageData(false)
                              }
                            }
                          })
                        }
                      }
                    }
                  }
                })
              }
            } else {
              this.checkSelectReceivableForce(item)
            }
          }
        })
      },
      //支票 拨款是 选择应收账款
      checkSelectReceivable(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '690',
          url: '/selectReceivableDetail?ownerID=' + item.otherUnitID + '&writeOffMoney=' + item.money + '&otherID=' + item.id + '&otherCategory=0',
          title: '选择应收账款金额',
          closeCallBack: (data) => {
            if (data) {
              let writeOffMoney = data.writeOffMoney
              sessionStorage.list = JSON.stringify(data.list)
              if (parseFloat(item.money) === parseFloat(data.writeOffMoney)) {
                let param = {
                  otherID: item.otherUnitID,
                  writeOffMoney: item.money,
                  otherAccountType: item.personOrUnit,
                  receivabledetailList: data.list,
                  receivabledetailType: '1',
                  ownerID: item.id,
                }
                console.log(param)
                this.ajaxJson({
                  url: '/fin/receivableWriteOff',
                  data: param,
                  call: (off) => {
                    if (off.type === 0) {
                      this.$dialog.alert({
                        tipValue: '核销成功',
                        closeCallBack: () => {
                          this.$dialog.close()
                        }
                      })
                      this.initPageData(false)
                    } else {
                      this.$dialog.alert({
                        alertImg: 'error',
                        tipValue: '核销失败',
                        closeCallBack: () => {
                        }
                      })
                    }
                  }
                })
              } else if (parseFloat(item.money) > parseFloat(data.writeOffMoney)) {
                this.$dialog.OpenWindow({
                  url: '/selectChecksDetail?stateBefore=1&state=0&category=',
                  width: "1000",
                  height: "650",
                  title: '选择支票',
                  closeCallBack: (data) => {
                    if (data) {
                      if (data.category === '0') {
                        this.$dialog.OpenWindow({
                          width: '1050',
                          height: '690',
                          title: '支票填开',
                          url: '/checkFillOut?ownerID=' + data.id + "&otherOwnerID=" + item.id + '&otherCategory=1&receivabledetailType=1&receivabledetailMoney=' + writeOffMoney,
                          closeCallBack: (information) => {
                            if (information) {
                              this.initPageData(false)
                            }
                          }
                        })
                      } else {
                        if (item.personOrUnit === '0') {
                          this.$dialog.OpenWindow({
                            width: '1050',
                            height: '690',
                            title: '支票填开',
                            url: '/checkFillOut?ownerID=' + data.id + "&otherOwnerID=" + item.id + '&otherCategory=1&receivabledetailType=1&receivabledetailMoney=' + writeOffMoney,
                            closeCallBack: (information) => {
                              if (information) {
                                this.initPageData(false)
                              }
                            }
                          })
                        }
                      }
                    }
                  }
                })
              }
            } else {
              this.selectCheckDetail(item)
            }
          }
        })
      },
      selectCheckDetail(item){
        this.$dialog.OpenWindow({
          url: '/selectChecksDetail?stateBefore=1&state=0&category=',
          width: "1000",
          height: "650",
          title: '选择支票',
          closeCallBack: (data) => {
            if (data) {
              if (data.category === '0') {
                this.$dialog.OpenWindow({
                  width: '1050',
                  height: '690',
                  title: '支票填开',
                  url: '/checkFillOut?ownerID=' + data.id + "&otherOwnerID=" + item.id + '&otherCategory=1',
                  closeCallBack: (information) => {
                    if (information) {
                      this.initPageData(false)
                    }
                  }
                })
              } else {
                if (item.personOrUnit === '0') {
                  this.$dialog.OpenWindow({
                    width: '1050',
                    height: '690',
                    title: '支票填开',
                    url: '/checkFillOut?ownerID=' + data.id + "&otherOwnerID=" + item.id + '&otherCategory=1',
                    closeCallBack: (information) => {
                      if (information) {
                        this.initPageData(false)
                      }
                    }
                  })
                }
              }
            }
          }
        })
      },
        /* 小标格显示 */
        tableTipShowEvent(item,control,category){
          if(category === 0){
            if(item.printLogList.length > 0) {
              this.tableTipColumnInfo = this.tablePrintTipColumnInfo
              this.tableTipInfo = item.printLogList
              this.tableTipControl = control
              this.tableTip = true
            }
          }
          else if(category === 1){
            if(item.balanceList.length > 0) {
              this.tableTipColumnInfo = this.balanceTableTipColumnInfo
              this.tableTipInfo = item.balanceList
              this.tableTipControl = control
              this.tableTip = true
            }
          }
        },
        tableTipHideEvent(){
          this.tableTip = false
        },
      /* 查看发票 */
      viewInvoice(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '750',
          title: '查看跟踪发票',
          url: '/paymentInvoice?ownerID=' + item.id + '&track=2' + '&money=' + item.money,
          closeCallBack: (data)=>{
            if(data){
              this.initPageData(false)
            }
          }
        })
      },
      /* 打印 */
      printFund(item){
        let params = {
          id: item.id
        }
        this.ajaxJson({
          url: '/PersonOffice/paymenPrint',
          data: params,
          call: (data) => {
            window.open("/UploadFile/" + data.message)
            /*添加打印次数 */
            let printLogParams = {
              ownerID: item.id,
            }
            this.ajaxJson({
              url:'/PersonOffice/addPrintLog',
              data:printLogParams,
              call:(data)=>{
                if (data) {
                  this.ajaxJson({
                    url: '/PersonOffice/getPrintLogsAjax',
                    data: printLogParams,
                    call: (data) => {
                      if (data){
                        item.printLogList = data
                      }
                    }
                  })
                }
              }
            })
            /* 打印电子发票 */
            if (item.invoice === '0'){
              this.$dialog.confirm({
                width: 300,
                tipValue: '是否打印电子发票?',
                alertImg: 'warn',
                okCallBack: (data)=>{
                  let electronicInvoiceParams = {
                    id: item.id
                  }
                  this.ajaxJson({
                    url: '/PersonOffice/getPayElectronicInvoice',
                    data: electronicInvoiceParams,
                    call: (data)=>{
                      if (data.type === 0 && data.val !== ''){
                        this.printInvoice = data.val;
                        try {
                          this.printInvoiceItem = this.printInvoice.split("|");
                        }catch (e) {}
                        for(var i=0;i<this.printInvoiceItem.length;i++){
                          var a = document.createElement("a");
                          a.download = this.printInvoiceItem[i];
                          a.href = "/UploadFile/ElectronicInvoice/" + this.printInvoiceItem[i];
                          a.click();
                        }
                      }else{
                        this.$dialog.alert({
                          tipValue: data.message,
                          alertImg: 'error',
                          closeCallBack: () => {
                          }
                        })
                      }
                    }
                  })
                }
              })
            }
          }
        })
      },
      /* 拨付资金 */
      approFund(item){
        if(item.approval === '4'){
          let params={
            ownerID:item.otherUnitID
          }
          this.ajaxJson({
            url: '/finance/receivableCenterDetail/sumMoney',
            data: params,
            call: (data) => {
              if(parseFloat(data)>0){
                let isReceivableForceWriteOff = 0
                let param={
                  id:item.otherUnitID
                }
                this.ajaxJson({
                  url: '/finance/receivableForceWriteOff/isExistByOwnerID',
                  data: param,
                  call: (data) => {
                    if(data == 1){
                      //处理强制核销内容
                      this.selectReceivableForce(item)
                    }else{
                      this.selectReceivable(item)
                    }
                  }
                })
              }else{
                this.appropriationBankDetail(item)
              }
            }
          })
        }else{
          this.$dialog.alert({
            tipValue: '已拨付'
          })
        }
      },
      selectReceivableForce(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '690',
          url:'/selectReceivableForceWriteOff?ownerID='+item.otherUnitID+'&writeOffMoney='+item.money+'&otherID='+item.id+'&otherCategory=0',
          title:'选择应收账款金额',
          closeCallBack:(data) => {
            if(data) {
              if(data == 1){
                this.$dialog.close()
                return
              }
              sessionStorage.list = JSON.stringify(data.list)
              if (parseFloat(item.money) === parseFloat(data.writeOffMoney)) {
                let param = {
                  otherID:item.otherUnitID,
                  writeOffMoney:item.money,
                  otherAccountType:item.personOrUnit,
                  receivabledetailList:data.list,
                  receivabledetailType:'1',
                  ownerID:item.id,
                }
                this.ajaxJson({
                  url: '/fin/receivableWriteOff',
                  data: param,
                  call: (off) => {
                    if(off.type === 0){
                      this.$dialog.alert({
                        tipValue: "核销成功",
                        closeCallBack: () => {
                          this.$dialog.close()
                        }
                      })
                      this.initPageData(false)
                    }else{
                      this.$dialog.alert({
                        alertImg: 'error',
                        tipValue: "核销失败",
                        closeCallBack: () => {
                        }
                      })
                    }
                  }
                })
              } else if (parseFloat(item.money) > parseFloat(data.writeOffMoney)) {
                this.$dialog.OpenWindow({
                  width: '1050',
                  height: '690',
                  title: '拨付资金',
                  url: '/bankDetailForm?ownerID=' + item.id + '&bankDetailType=0&directionBefore=1&receivabledetailType=1&receivabledetailMoney=' + data.writeOffMoney,
                  closeCallBack: (data) => {
                    this.initPageData(false)
                  }
                })
              }
            }else{
              this.selectReceivableForce(item)
            }
          }
        })
      },
      //当公司存在应收账款时
      selectReceivable(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '690',
          url:'/selectReceivableDetail?ownerID='+item.otherUnitID+'&writeOffMoney='+item.money+'&otherID='+item.id+'&otherCategory=0',
          title:'选择应收账款金额',
          closeCallBack:(data) => {
            if(data) {
              sessionStorage.list = JSON.stringify(data.list)
              if (parseFloat(item.money) === parseFloat(data.writeOffMoney)) {
                let param = {
                  otherID:item.otherUnitID,
                  writeOffMoney:item.money,
                  otherAccountType:item.personOrUnit,
                  receivabledetailList:data.list,
                  receivabledetailType:'1',
                  ownerID:item.id,
                }
                this.ajaxJson({
                  url: '/fin/receivableWriteOff',
                  data: param,
                  call: (off) => {
                    if(off.type === 0){
                      this.$dialog.alert({
                        tipValue: "核销成功",
                        closeCallBack: () => {
                          this.$dialog.close()
                        }
                      })
                      this.initPageData(false)
                    }else{
                      this.$dialog.alert({
                        alertImg: 'error',
                        tipValue: "核销失败",
                        closeCallBack: () => {
                        }
                      })
                    }
                  }
                })
              } else if (parseFloat(item.money) > parseFloat(data.writeOffMoney)) {
                this.$dialog.OpenWindow({
                  width: '1050',
                  height: '690',
                  title: '拨付资金',
                  url: '/bankDetailForm?ownerID=' + item.id + '&bankDetailType=0&directionBefore=1&receivabledetailType=1&receivabledetailMoney=' + data.writeOffMoney,
                  closeCallBack: (data) => {
                    this.initPageData(false)
                  }
                })
              }
            }else{
              this.appropriationBankDetail(item)
            }
          }
        })
      },
      //拨款操作
      appropriationBankDetail(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '690',
          title: '拨付资金',
          url: '/bankDetailForm?ownerID=' + item.id +'&bankDetailType=0&directionBefore=1',
          closeCallBack: (data)=>{
            this.initPageData(false)
          }
        })
      },
      add (item) {
        let title = '查看付款申请信息'
        let url = '/approvalApplyView?id=' + item.id + '&isApproval='+item.isApproval+ '&isPrint='+item.isPrint+ '&approval='+item.approval
        this.$dialog.OpenWindow({
          width: '1050',
          height: '650',
          url: url,
          title: title,
          closeCallBack: (data) => {
            if (data) {
              this.initPageData(false)
              /*false->非初始化=>!import  true->初始化*/
            }
          }
        })
      },

      initPageData (initValue) {
        let params = {}

        if (initValue) {
          params = {
            orderColumn: this.orderColumn,
            order: this.order
          }
        } else {
          params = {
            isFinish: this.listIsFinish.value,
            isChecks:this.listIsChecks.value,
            isAllocation: this.listIsAllocation.value
          }
        }
        this.init({
          initValue: initValue,
          url: '/PersonOffice/getPayApprovalManager',
          data: params,
          all: (data) => {
            this.contentTotal = data.total
            // this.showBatchAppropriation = data.showBatchAppropriation
            //不管是不是初始化都需要执行的代码
          },
          init: (data) => {
            //初始化时需要执行的代码
            // 这边初始化筛选信息
            this.listIsFinish = data.isFinishPsd
            this.isChecksList = data.isChecksPsd.list
            this.listIsChecks = data.isChecksPsd
            this.listIsAllocation = data.isAllocationPsd
          }
        })

      },
      adoptEvent (item) { //
        if(item.isApproval!=='1'){
          if(item.id){
            this.$dialog.OpenWindow({
              width: 650,
              height: 230,
              title: '审批留言',
              url: '/passMessage?id=' + item.id+ '&tableName=45&kind=0',
              closeCallBack: (acc)=>{
                this.initPageData(false)
              }
            })
          }
        }
      },
      rejectEvent (item) {
        if(item.isApproval!=='1') {
          if (item.id) {
            let params = {
              id: item.id,
              tableName: '45',
            }
            this.ajaxJson({
              url: '/PersonOffice/getSubmitCatrgoryVue',
              data: params,
              call: (data) => {
                if (data.type === 0) {
                  this.category = data.message
                  this.$dialog.OpenWindow({
                    width: 1050,
                    height: 720,
                    title: '驳回理由',
                    url: '/rejectReason?category=' + this.category + '&id=' + item.id+'&tableName=45&kind=0',
                    closeCallBack: (data) => {
                      this.initPageData(false)
                    }
                  })
                }
              }
            })
          }
        }
      }
    },
    computed: {
      // 检查是否选中
      checkSelect () {
        return function (id) {
          return this.selectValue.indexOf(id) !== -1
        }
      }
    },
    watch: {
      selectValue: {
        handler: function (val, oldval) {
          this.pager.selectCount = val.length
        },
        deep: true
      }
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
          this.openInvoiceNum=data.openInvoice
          this.promotions=data.promotions
        }
      })
      this.ajaxJson({
        url: '/finance/invoiceRise/getApprovalPendingCount',
        call: (data)=>{
          this.invoiceRiseNum = data
        }
      })
    }
  }
</script>
<style scoped lang="less">


</style>
