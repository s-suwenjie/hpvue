<template>
  <div class="f_main">
    <yhm-view-body>
      <template #title>基本信息</template>
      <template #body>
        <yhm-view-control title="推修公司" :content="unit" ></yhm-view-control>
<!--        <yhm-view-control title="启用日期" :content="startDate" type="date"></yhm-view-control>-->
<!--        <yhm-view-control title="结束日期" :content="endDate" type="date"></yhm-view-control>-->
        <yhm-view-control title="自保费率" :content="selfrate + '%'"></yhm-view-control>
        <yhm-view-control title="非自保费率" :content="noselfrate + '%'"></yhm-view-control>
        <yhm-view-control title="结算类型" :content="type" :psd="typeList"></yhm-view-control>

      </template>
    </yhm-view-body>
    <div class="f_split"></div>
    <yhm-view-tab>
      <template #tab>
        <yhm-view-tab-button :list="tabState" :index="0" @click="initData">工单信息</yhm-view-tab-button>
        <yhm-view-tab-button :list="tabState" :index="1" @click="paymentHistory">账单记录</yhm-view-tab-button>
      </template>
      <template #operate>
        <yhm-radiofilter  v-show="tabState[0].select" @initData="initData(false)" title="状态" style="margin: 5px 0;" :content="pendingstateList"></yhm-radiofilter>
<!--        <yhm-radiofilter  v-show="tabState[1].select" @initData="paymentHistory" title="状态" style="margin: 5px 0;" :content="stateList"></yhm-radiofilter>-->
      </template>
      <template #tab_total>
        <div style="display:flex;align-items: center;" v-show="tabState[0].select">
          <div style="margin-right: 30px">
            <div style="width: 100%;display: flex;justify-content: space-between;align-items: center;">
              <yhm-form-date title="开始日期" width="180" :max="endDateCustom" :error-show="false" @call="dateClick(startDateCustom,endDateCustom)" :value="startDateCustom" id="startDateCustom"></yhm-form-date>
              <yhm-form-date title="结束日期" width="180" :error-show="false" @call="dateClick(startDateCustom,endDateCustom)" :value="endDateCustom" id="endDateCustom"></yhm-form-date>
            </div>
          </div>
          <div style="background: #c5daeb;margin-right: 2px;">
            <table style="width:300px;height: 50px;" >
              <thead>
              <th >总数</th>
              <th style="color: #2193B0; width: 110px;">预计推送费</th>
              <th style="color: #fd6802; width: 110px;">已产生营业额</th>
<!--              <th style="color: #fd6802; width: 80px;">工单金额</th>-->
              </thead>
              <tbody>
              <tr  style="background: #fff;box-sizing: border-box;">
                <td style="text-align: center;">{{pager.total}} </td>
                <td v-html="tenThousandFormatShow(sumpending+'')" style="color: #2193B0;text-align: right;box-sizing: border-box;padding-right:10px "></td>
                <td v-html="tenThousandFormatShow(sumpendingmoney+'')" style="color: #fd6802;text-align: right;box-sizing: border-box;padding-right:10px "></td>
<!--                <td v-html="tenThousandFormatShow(totalMoney+'')" style="color: #fd6802;text-align: right;box-sizing: border-box;padding-right:10px "></td>-->
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </template>
      <template #content>
        <yhm-view-tab-list :customize="true" v-show="tabState[0].select">
          <template #listHead>
            <yhm-managerth style="width: 38px;" title="查看"></yhm-managerth>
            <yhm-managerth title="接待日期"></yhm-managerth>
            <yhm-managerth width="180" title="工单号"></yhm-managerth>
            <yhm-managerth title="车牌号"></yhm-managerth>
<!--            <yhm-managerth title="送修人"></yhm-managerth>-->
            <yhm-managerth width="70" title="费率类型"></yhm-managerth>
            <yhm-managerth width="70" title="待结状态"></yhm-managerth>
            <yhm-managerth title="预计推送费"></yhm-managerth>
            <yhm-managerth title="已产生营业额"></yhm-managerth>
<!--            <yhm-managerth width="80" title="操作"></yhm-managerth>-->
          </template>
          <template #listBody>
            <tr v-for="(item,index) in content" :key="index" :class="{InterlacBg:index%2!==0}">
              <yhm-manager-td-look @click="lookOver(item)"></yhm-manager-td-look>
              <yhm-manager-td-date :value="item.visitDate"></yhm-manager-td-date>
              <yhm-manager-td-center :value="item.code" ></yhm-manager-td-center>
              <yhm-manager-td :value="item.carName" type="vehicle"></yhm-manager-td>
<!--              <yhm-manager-td-center :value="item.contactPerson"></yhm-manager-td-center>-->
              <yhm-manager-td-center :value="item.type=='0'?'自保':'非自保'"></yhm-manager-td-center>
              <yhm-manager-td-psd :value="item.pendingstate" :list="pendingstateList.list"></yhm-manager-td-psd>
              <yhm-manager-td-money style="color:#2193B0" :value="item.pending==''?'0':item.pending"></yhm-manager-td-money>
              <yhm-manager-td-money style="color:#fd6802" :value="item.pendingmoney==''?'0':item.pendingmoney"></yhm-manager-td-money>
<!--              <yhm-manager-td-operate>-->
<!--                <yhm-manager-td-operate-button @click="settleAccounts(item)" v-show="item.pendingstate=='0'?true:false" value="结账" icon="i-btn-applicationSm" color="#be08e3"></yhm-manager-td-operate-button>-->
<!--              </yhm-manager-td-operate>-->
            </tr>
          </template>
          <template #empty>
            <span class="m_listNoData" v-show="content.length=='0'?true:false">暂时没有数据</span>
          </template>
          <template #pager>
            <yhm-pagination :pager="pager" @initData="initData(false)"></yhm-pagination>
          </template>
        </yhm-view-tab-list>
        <yhm-view-tab-list :customize="true"  v-show="tabState[1].select">
          <template #listHead>
            <yhm-managerth style="width: 38px" title="查看"></yhm-managerth>
            <yhm-managerth title="编号"></yhm-managerth>
            <yhm-managerth title="事由"></yhm-managerth>
            <yhm-managerth width="70" title="审批留言"></yhm-managerth>
            <yhm-managerth width="100" title="金额"></yhm-managerth>
            <yhm-managerth width="120" title="状态"></yhm-managerth>
            <yhm-managerth width="180" title="操作"></yhm-managerth>
          </template>
          <template #listBody>
            <tr v-for="(item,index) in billingRecordsList" :class="{InterlacBg:index%2!=0}" :key="index">
              <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>
              <yhm-manager-td :value="item.code"></yhm-manager-td>
              <yhm-manager-td :tip="true" node-class-name="f_main" :value="item.subject"></yhm-manager-td>
              <yhm-manager-td-leaveword @iconClick="SelectApprovalMessage(item)" :leave-word-show="item.approvalMessage === '1'?true:false"></yhm-manager-td-leaveword>
              <yhm-manager-td-money :value="item.money"></yhm-manager-td-money>
              <yhm-manager-td-state :value="item.stateVal" :stateColor="item.stateColor" :stateImg="item.stateImg"></yhm-manager-td-state>
<!--              <yhm-manager-td-center style="font-weight: bold;" :value="item.paystateVal"></yhm-manager-td-center>-->
              <yhm-manager-td-operate>
                <yhm-manager-td-operate-button v-show="item.isPrint !== '1' && item.track !== '-1' && item.track !== '0' && item.track !== '1'" :no-click="item.state!=='0' || item.isFinish === '1'" @click="submit(item)" value="提交申请" icon="i-btn-applicationSm" color="#49a9ea"></yhm-manager-td-operate-button>
                <yhm-manager-td-operate-button v-show="item.state=='1'" :no-click="item.state == '1'?false:true" @click="revocationClick(item)" icon="i-btn-applicationSm" value="撤销申请" color="#fd6802"></yhm-manager-td-operate-button>
              </yhm-manager-td-operate>
            </tr>
          </template>
          <template #empty>
            <span class="m_listNoData" v-show="billingRecordsList.length>=1?false:true">暂时没有数据</span>
          </template>
          <template #pager>
            <yhm-pagination :pager="pager2" @initData="paymentHistory"></yhm-pagination>
          </template>
        </yhm-view-tab-list>
<!--        <yhm-view-tab-list :customize="true"  v-show="tabState[1].select">-->
<!--          <template #listHead>-->
<!--            <yhm-managerth style="width: 38px" title="查看"></yhm-managerth>-->
<!--&lt;!&ndash;            <yhm-managerth width="179" title="收款方"></yhm-managerth>&ndash;&gt;-->
<!--            <yhm-managerth width="100" title="支付方式"></yhm-managerth>-->
<!--            <yhm-managerth width="120" title="事由"></yhm-managerth>-->
<!--            <yhm-managerth width="115" title="计划申请金额"></yhm-managerth>-->
<!--            <yhm-managerth width="220" title="编号"></yhm-managerth>-->
<!--            <yhm-managerth width="60" title="审批留言"></yhm-managerth>-->
<!--            <yhm-managerth width="115" title="状态"></yhm-managerth>-->
<!--            <yhm-managerth title="操作"></yhm-managerth>-->

<!--&lt;!&ndash;            <yhm-managerth style="width: 38px" title="查看"></yhm-managerth>&ndash;&gt;-->
<!--&lt;!&ndash;            <yhm-managerth width="179" title="收款方" value="id"></yhm-managerth>&ndash;&gt;-->
<!--&lt;!&ndash;            <yhm-managerth width="100" title="付款性质" value="nature"></yhm-managerth>&ndash;&gt;-->
<!--&lt;!&ndash;            <yhm-managerth width="100" title="支付方式" value="isChecks"></yhm-managerth>&ndash;&gt;-->
<!--&lt;!&ndash;            <yhm-managerth width="120" title="事由"></yhm-managerth>&ndash;&gt;-->
<!--&lt;!&ndash;            <yhm-managerth width="115" title="计划申请金额" value="money"></yhm-managerth>&ndash;&gt;-->
<!--&lt;!&ndash;            <yhm-managerth width="220" title="编号" value="code"></yhm-managerth>&ndash;&gt;-->
<!--&lt;!&ndash;            <yhm-managerth width="60" title="审批留言"></yhm-managerth>&ndash;&gt;-->
<!--&lt;!&ndash;            <yhm-managerth width="115" title="状态" value="state"></yhm-managerth>&ndash;&gt;-->
<!--          </template>-->
<!--          <template #listBody>-->
<!--            <tr v-for="(item,index) in paymentInvoice" :class="{InterlacBg:index%2!=0}" :key="index">-->
<!--              <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>-->
<!--&lt;!&ndash;              <yhm-manager-td :tip="true" :value="item.otherUnit"></yhm-manager-td>&ndash;&gt;-->
<!--              <yhm-manager-td-psd :value="item.isChecks" :list="isChecksList"></yhm-manager-td-psd>-->
<!--              <yhm-manager-td-center :value="item.subject" @click="skipEvent(item)" :color="item.ownerID!=''&&item.ownerType=='1'?'#49a9ea':''"></yhm-manager-td-center>-->
<!--              <yhm-manager-td-money :tip-category="1" :before-icon="item.balanceList.length > 0?'i-btn-prompt':''" :value-object="item" :value="item.money"></yhm-manager-td-money>-->
<!--              <yhm-manager-td-center :value="item.code"></yhm-manager-td-center>-->
<!--              <yhm-manager-td-leaveword @iconClick="SelectApprovalMessage(item)" :leave-word-show="item.approvalMessage === '1'?true:false"></yhm-manager-td-leaveword>-->
<!--              <yhm-manager-td-state :value="item.stateVal" :stateColor="item.stateColor" :stateImg="item.stateImg"></yhm-manager-td-state>-->
<!--              <yhm-manager-td-operate>-->
<!--                <yhm-manager-td-operate-button v-show="item.isPrint !== '1' && item.track !== '-1' && item.track !== '0' && item.track !== '1'" :no-click="item.state!=='0' || item.isFinish === '1'" @click="submit(item)" value="提交申请" icon="i-btn-applicationSm" color="#49a9ea"></yhm-manager-td-operate-button>-->
<!--                <yhm-manager-td-operate-button v-show="item.state=='1'" :no-click="item.state == '1'?false:true" @click="revocationClick(item)" icon="i-btn-applicationSm" value="撤销申请" color="#fd6802"></yhm-manager-td-operate-button>-->
<!--              </yhm-manager-td-operate>-->
<!--            </tr>-->
<!--          </template>-->
<!--          <template #empty>-->
<!--            <span class="m_listNoData" v-show="paymentInvoice.length>=1?false:true">暂时没有数据</span>-->
<!--          </template>-->
<!--          <template #pager>-->
<!--            <yhm-pagination :pager="pager2" @initData="paymentHistory"></yhm-pagination>-->
<!--          </template>-->
<!--        </yhm-view-tab-list>-->
      </template>
    </yhm-view-tab>
    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn>
        <yhm-commonbutton value="结账" @call="settleAccounts(item)" icon="i-edit" :flicker="true"></yhm-commonbutton>
      </template>
    </yhm-formoperate>
  </div>
</template>

<script>
  import { viewmixin } from '@/assets/view.js'
  import { accMul, accAdd, guid, formatDate, formatTime } from '@/assets/common.js'
  export default {
    name: 'settleAccountsForm',
    mixins: [viewmixin],
    data(){
      return{
        currentDate: formatDate(new Date()),//当前日期
        tabState:[{select:true},{select:false}],
        content:[],
        paymentInvoice:[],//付款记录
        natureList:[],
        isChecksList:[],
        // rate:'',//费率
        category:3,
        selfrate:'',//自保费率
        noselfrate:'',//非自保费率
        unit:'',//推修公司
        type:'',//结算类型
        typeList:[],//结算类型
        startDate: formatDate(new Date()),//启用日期
        endDate: formatDate(new Date()),//结束日期
        startDateCustom:'',//启用日期
        endDateCustom:'',//结束日期
        totalMoney:'',//总计金额
        sumpendingmoney:'',//实际价格总和
        sumpending:'',//返利金额总和
        pager: { // 分页数据
          total: '', // 数据总条数
          pageSize: 5, // 单页数据条数
          pageIndex: 1, // 当前页码
          selectCount: 0 // 选中数据的条数
        },
        pager2: { // 分页数据
          total: '', // 数据总条数
          pageSize: 5, // 单页数据条数
          pageIndex: 1, // 当前页码
          selectCount: 0 // 选中数据的条数
        },
        pendingstateList:{
          list:[
            // {
            //   num:'0',
            //   img:'',
            //   code:'#F00',
            //   showName:'未结账'
            // },
            // {
            //   num:'1',
            //   img:'',
            //   code:'#36b152',
            //   showName:'已结账'
            // }
          ],
          value:''
        },
        stateList:{
          list:[
            {
              num:'0',
              img:'',
              code:'#36b152',
              showName:'已完成'
            },
            {
              num:'1',
              img:'',
              code:'#49a9ea',
              showName:'进行中'
            }
          ],
          value:'1'
        },
        billingRecordsList:[]
      }
    },
    methods:{
      lookOverPaymentRequest(item){
        if(item.paymentid!==''){
          this.$dialog.OpenWindow({
            width: '1050',
            height: '750',
            title: '查看付款申请信息',
            url:'/paymentApplyFormView?id='+item.paymentid+'&isState=1&isFinish=0',
            closeCallBack: (data)=>{
              if(data){
              }
            }
          })
        }
      },
      paymentHistory(){
        this.ajaxJson({
            url: '/fix/fixCompanyBill/getManager',
            data:{
              companyID:this.unitID,
              pageSize:this.pager2.pageSize,
              pageIndex:this.pager2.pageIndex,
            },
            call: (data) => {
              if(data){
                this.pager2.total = data.count
                this.billingRecordsList = data.content
              }
            }
        })
        // this.ajaxJson({
        //   url: '/PersonOffice/getPaymentNatureAndOtherUnitID',
        //   data:{
        //     otherUnitID:this.unitID,
        //     nature:'10',
        //     pageSize:this.pager2.pageSize,
        //     pageIndex:this.pager2.pageIndex,
        //     state:this.stateList.value
        //   },
        //   call: (data) => {
        //     console.log(data)
        //     this.paymentInvoice = data.content
        //     this.isChecksList = data.isChecksPsd.list
        //   }
        // })
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
      submit (item) { //提交申请
        if (item.isFinish === '0' && item.state === '0') {
          if (item.id) {
            let params = {
              id: item.paymentid,
              tableName: 45
            }
            this.$dialog.confirm({
              width: 300,
              tipValue: '确定提交申请?',
              btnValueOk: '确定',
              alertImg: 'warn',
              okCallBack: (data) => {
                this.ajaxJson({
                  url: '/PersonOffice/getSubmitCatrgoryVue',
                  data: params,
                  call: (data) => {
                    this.category = data.message
                    if (this.category) {
                      /* 判断是否拿到category */
                      let params = {
                        id: item.paymentid,
                        category: this.category,
                        tableName: 45,
                        isDetail: 0,
                        tableDetailName: -1
                      }
                      this.ajaxJson({
                        url: '/PersonOffice/approvalSubmitVue',
                        data: params,
                        // loading:'0',
                        call: (data) => {
                          if (data.type === 0) {
                            let params = {
                              id: item.paymentid,
                              category: this.category,
                            }
                            this.ajaxJson({
                              url: '/PersonOffice/planSubmitAfterOperat',
                              data: params,
                              // loading:'0',
                              call: (data) => {
                                if (data.type === 2) {
                                  this.$dialog.alert({
                                    error: data.message,
                                    closeCallBack: () => {
                                    }
                                  })
                                } else {
                                  this.$dialog.alert({
                                    width: 320,
                                    tipValue: data.message,
                                    closeCallBack: () => {
                                  //     console.log('22')
                                      this.paymentHistory()
                                    }
                                  })
                                }
                              }
                            })
                            if(item.ownerID!==null&&item.ownerID!==''){
                              let param = {
                                id : item.ownerID,
                                state:'1'
                              }
                              this.ajaxJson({
                                url: '/dailyoffice/expressCompany/updateBillState',
                                data: param,
                                loading:'0',
                                call: (data) => {

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
                    } else {
                      this.$dialog.alert({
                        tipValue: '没有获取到提交数据!',
                        alertImg: 'error'
                      })
                    }
                  }
                })
              }
            })
          }
        }
      },
      revocationClick(item) {//撤销申请
        this.$dialog.confirm({
          width: 300,
          tipValue: '是否确认撤销申请？',
          btnValueOk: '确定',
          alertImg: 'warn',
          okCallBack: (data) => {
            let params = {
              id: item.paymentid,
              // category: this.category,
              tableName: 45,
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
                      this.paymentHistory()
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
      listView(item){
        if(item.isFinish==='0'&&item.state==='0') {
          this.$dialog.OpenWindow({
            width: '1050',
            height: '750',
            url: '/paymentApplyForm?id=' + item.paymentid +'&isState=' + item.state + '&isFinish=' + item.isFinish,
            title: "查看付款申请信息",
            closeCallBack: () => {
              this.initData(false)
            }
          })
        }else{
          this.$dialog.OpenWindow({
            width: '1050',
            height: '750',
            url: '/paymentApplyFormView?id=' + item.paymentid +'&isState=' + item.state + '&isFinish=' + item.isFinish,
            title: "查看付款申请信息",
            closeCallBack: () => {
              this.initData(false)
            }
          })
        }

      },
      save(){
        // this.$dialog.confirm({
        //   tipValue: '是否确认转为工单？',
        //   btnValueOk:'确认',
        //   btnValueCancel:'取消',
        //   okCallBack: () => {
        //     this.ajaxJson({
        //       url: '/fix/fixOrder/save',
        //       data: {
        //         id:item.fixorder.id,
        //         state:'0',
        //       },
        //       call: (data) => {
        //         if (data.type === 0) {
        //           this.$dialog.alert({
        //             tipValue: data.message,
        //             closeCallBack: () => {
        //               this.initPageData(false)
        //             }
        //           })
        //         } else {
        //           this.$dialog.alert({
        //             alertImg: 'error',
        //             tipValue: data.message,
        //             closeCallBack: () => {
        //             }
        //           })
        //         }
        //       }
        //     })
        //   }
        // })
      },
      settleAccounts(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '750',
          url: '/paymentApplyForm?nature=10&otherUnit='+this.unit+'&otherUnitID='+this.unitID+'&workOrderSkip='+true,
          title: '添加付款申请信息',
          closeCallBack: (data) => {
            this.initData(false)
          }
        })

        // this.$dialog.confirm({
        //   tipValue: '是否确认结账？',
        //   btnValueOk:'确认',
        //   btnValueCancel:'取消',
        //   okCallBack: () => {
        //     this.ajaxJson({
        //       url: '/fix/fixOrder/save',
        //       data: {
        //         id:item.orderid,
        //         pendingstate:'1',
        //       },
        //       call: (data) => {
        //         if (data.type === 0) {
        //           this.initData(true)
        //         } else {
        //           this.$dialog.alert({
        //             alertImg: 'error',
        //             tipValue: data.message,
        //             closeCallBack: () => {
        //             }
        //           })
        //         }
        //       }
        //     })
        //   }
        // })
      },
      lookOver(item){
        this.$dialog.OpenWindow({
          width: '1070',
          height: '750',
          url:'/collectionOfDataView?id='+item.id,
          title:'查看工单信息',
          closeCallBack:(data) =>{
          }
        })
      },
      dateClick(startDate,endDate){
        if(startDate!=''&&endDate!=''){
          this.initData()
        }
      },
      initData (initialize) {
        let params = {}
        if(initialize){
          params = {
            companyID:this.id,
            pageSize:this.pager.pageSize,
            pageIndex:this.pager.pageIndex,
            pendingstate:this.pendingstateList.value,
            stateStr:'123'//是否过滤接待单 不为空时过滤
          }
        }else{
          params = {
            companyID:this.id,
            pageSize:this.pager.pageSize,
            pageIndex:this.pager.pageIndex,
            startDateStr:this.startDateCustom,
            endDateStr:this.endDateCustom,
            pendingstate:this.pendingstateList.value,
            stateStr:'123'//是否过滤接待单 不为空时过滤
          }
        }
        this.ajaxJson({
          url: '/fix/fixCompanyOrder/queryByCompanyIDForFixreception',
          data:params,
          call: (data) => {
            this.content = data.content
            this.pager.total = data.count
            this.selfrate = data.fixCompany.selfrate//税率
            this.noselfrate = data.fixCompany.noselfrate//非自保费率
            this.unit = data.fixCompany.unit//推修公司
            this.unitID = data.fixCompany.unitID//推修公司id
            this.type = data.fixCompany.type//结算类型
            this.typeList = data.fixCompany.typePsd.list//计算类型
            this.startDate = data.fixCompany.startDate//启用日期
            this.endDate = data.fixCompany.endDate//结束日期
            this.totalMoney = data.totalMoney//总计金额
            this.sumpendingmoney = data.sumpendingmoney//实际价格总和
            this.sumpending = data.sumpending//返利金额总和
            if(initialize){
              this.pendingstateList = data.pendingstatePsd
              if(this.paymentType=='1'||this.paymentType=='2'||this.paymentType=='3'){
                this.tabState = [{select:false},{select:true}]
                if(this.paymentType=='2'){
                  this.stateList.value = '0'
                }else if(this.paymentType=='3'){
                  this.stateList.value = ''
                }
                this.paymentHistory()
              }
            }

            this.createName = data.fixCompany.createName
            this.insertDate = data.fixCompany.insertDate
            this.updateName = data.fixCompany.updateName
            this.updateDate = data.fixCompany.updateDate


          }
        })
      }
    },
    created () {
      this.setQuery2Value('paymentType')

      this.initData(true)
    }
  }
</script>

<style scoped>

</style>
