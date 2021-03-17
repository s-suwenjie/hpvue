<template>
    <div class="f_main">
      <yhm-view-body>
        <template #title>基本信息</template>
        <template #body>
          <yhm-view-control title="申请人" :content="list.person"></yhm-view-control>
          <yhm-view-control title="申请日期" type="date" :content="list.applyDate"></yhm-view-control>
          <yhm-view-control title="开票类型" :psd="list.categoryList" :content="list.category"></yhm-view-control>
          <yhm-view-control title="发票类型" :psd="list.invoiceCategoryList" :content="list.invoiceCategory"></yhm-view-control>
          <yhm-view-control title="抬头类型" :psd="list.purchaserTypeList" :content="list.purchaserType"></yhm-view-control>

          <yhm-view-control title="款项状态" :content="list.isReceivables=='0'?'已收款':'未收款'"></yhm-view-control>

          <yhm-view-control title="发票抬头" category="2" :content="list.purchaser"></yhm-view-control>
          <yhm-view-control title="税号" :content="list.taxNumber"></yhm-view-control>
          <yhm-view-control title="开户行" v-show="list.isBankShow"  :content="list.bank"></yhm-view-control>
          <yhm-view-control title="账号" v-show="list.isBankShow"  :content="list.account"></yhm-view-control>

          <yhm-view-control title="发票金额" type="money" :content="invoiceMoney+''" color="#fd6802"></yhm-view-control>
          <yhm-view-control title="金额大写" :content="list.invoiceMoneyUp"></yhm-view-control>
          <yhm-view-control title="预计使用日期" type="date" :content="list.preUseDate"></yhm-view-control>
          <yhm-view-control title="预计回款日期" type="date" v-if="list.invoiceType=='1'" :content="list.moneyBackDate"></yhm-view-control>
          <yhm-view-control title="发票处理" :psd="list.invoiceHandleList" :content="list.invoiceHandle"></yhm-view-control>
          <yhm-view-control title="收件人" v-if="list.invoiceHandle==1" :content="list.addressee"></yhm-view-control>
          <yhm-view-control title="手机号" v-if="list.invoiceHandle==1" :content="list.addresseePhone"></yhm-view-control>
          <yhm-view-control title="电话" v-if="list.invoiceHandle==1" :content="list.addresseeTel"></yhm-view-control>
          <yhm-view-control title="地址区域" v-if="list.invoiceHandle==1" :content="list.mailTitle"></yhm-view-control>
          <yhm-view-control title="地址" v-if="list.invoiceHandle==1" :content="list.mailTitleAddress"></yhm-view-control>

          <yhm-view-control title="事由说明" category="3" :content="list.remark"></yhm-view-control>


        </template>
      </yhm-view-body>
      <div class="f_split"></div>
      <yhm-form-list-show v-show="ownerCategory!=5">
        <template #title>工单开票信息</template>
        <template #listHead>
          <yhm-managerth title="工单号"></yhm-managerth>
          <yhm-managerth title="车牌号"></yhm-managerth>
          <yhm-managerth title="剩余开票金额"></yhm-managerth>
          <yhm-managerth title="开票金额"></yhm-managerth>
        </template>
        <template #listBody>
          <tr v-for="(item,index) in list.checkedValueList" :key="index" :class="{InterlacBg:index%2!==0}">
            <yhm-manager-td-center :value="item.ordernum+''" @click="lookOver(item)"></yhm-manager-td-center>
            <yhm-manager-td-center :value="item.vehicle+''"></yhm-manager-td-center>
            <yhm-manager-td-money :value="item.type=='1'?(Number(item.totalMoney)-Number(item.useMoney))+'':(Number(item.money)-Number(item.useMoney))+''"></yhm-manager-td-money>
            <yhm-manager-td-money :value="item.invoiceAmount+''"></yhm-manager-td-money>
          </tr>
        </template>
        <template #empty>
          <span class="m_listNoData" v-show="list.checkedValueList.length=='0'?true:false">暂时没有数据</span>
        </template>
      </yhm-form-list-show>
      <yhm-form-list-show v-show="ownerCategory==5">
        <template #title>工单开票信息</template>
        <template #listHead>
          <yhm-managerth title="工单号"></yhm-managerth>
          <yhm-managerth title="车牌号"></yhm-managerth>
          <yhm-managerth title="剩余开票金额"></yhm-managerth>
          <yhm-managerth title="开票金额"></yhm-managerth>
        </template>
        <template #listBody>
          <tr v-for="(item,index) in tableList" :key="index" :class="{InterlacBg:index%2!==0}">
            <yhm-manager-td-center :value="item.ordernum+''" @click="lookOver(item)"></yhm-manager-td-center>
            <yhm-manager-td-center :value="item.vehicle+''"></yhm-manager-td-center>
            <yhm-manager-td-money :value="item.remamountOpened"></yhm-manager-td-money>
            <yhm-manager-td-money :value="item.invoiceAmount+''"></yhm-manager-td-money>
          </tr>
        </template>
        <template #empty>
          <span class="m_listNoData" v-show="tableList.length=='0'?true:false">暂时没有数据</span>
        </template>
      </yhm-form-list-show>
      <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
        <template #btn>
          <yhm-commonbutton value="保存" v-show="ownerCategory!=5" icon="btnSave" :flicker="true" @call="save()"></yhm-commonbutton>
        </template>
      </yhm-formoperate>
    </div>
</template>

<script>
  import { viewmixin } from '@/assets/view.js'
  import { formatDate ,accAdd, guid,number2chinese,formatCnDate,accMul,formatTime} from '@/assets/common.js'
  export default {
    name: 'offlineOpenInvoiceView',
    mixins: [viewmixin],
    data(){
      return{
        // id:guid(),
        list:{},
        workOrderList:[],
        category:'',
        tableList:[],
        ownerCategory:'',
        invoiceMoney:'',//发票总金额
        invoiceMoneyUp:'',//金额大写
      }
    },
    watch: {
      invoiceMoney () {
        this.invoiceMoneyUp = number2chinese(this.invoiceMoney)
      },
    },
    methods:{
      lookOver(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '700',
          url:'/workOrderView?id='+item.ownerID,
          title:'查看工单详情',
          closeCallBack:(data) =>{
          }
        })
      },
      save(){
        let params = {
          id:this.id,
          ownerCategory:this.list.isReceivables=='0'?'6':'5',//为6时是实开
          ownerID:this.id,//工单ID
          personID:this.list.personID,//申请人
          person:this.list.person,
          applyDate:this.list.applyDate,//申请日期
          purchaserType:this.list.purchaserType,//购买方类型
          purchaser:this.list.purchaser,//购买方
          purchaserID:this.list.purchaserType=='2'?this.list.vehicleID:this.list.purchaserID,//购买方 已改为车辆id
          payerID:this.list.payerID,//购买方
          category:this.list.category,//开票类型
          workOrder:this.id,//工单ID
          licensePlateNumber:this.list.licensePlateNumber,//车牌号
          invoiceCategory:this.list.invoiceCategory,//发票类型
          isReceivables:this.list.isReceivables,
          invoiceMoney:this.invoiceMoney,//发票金额
          invoiceMoneyUp:this.invoiceMoneyUp,//金额大写
          remark:this.list.remark,//事由说明
          preUseDate:this.list.preUseDate,//预计使用日期
          moneyBackDate:this.list.invoiceType=='1'?this.list.moneyBackDate:'',//
          productDetails:this.list.productDetails,
          bankDetailList:this.list.bankDetailList,
          invoiceHandle:this.list.invoiceHandle,
          workOrderList:this.workOrderList,
          openInvoiceType:this.list.makeOutAnInvoice,//''为合并开 1为分开开票
          bankID:this.list.bankID,
          bank:this.list.bank,
          account:this.list.account,
          // fileList:this.list.fileList,
          invoiceList:this.list.invoiceList,

          addresseeID:this.list.addresseeID,
          addressee:this.list.addressee,
          addresseePhone:this.list.addresseePhone,
          addresseeTel:this.list.addresseeTel,
          mailTitleID:this.list.mailTitleID,
          mailTitle:this.list.mailTitle,
          mailTitleAddress:this.list.mailTitleAddress,
          taxNumber:this.list.taxNumber,
          isApprovalRise:this.list.isApprovalRise
        }
        this.ajaxJson({
          url: '/Bill/openInvoiceFormSave',
          data: params,
          call: (data) => {
            if(data.type==0){
              this.$dialog.setReturnValue(this.id) //向父级页面id值
              if(this.list.isReceivables!='0'){
                this.ajaxJson({
                  url: '/Bill/getSubmitCatrgoryVue',
                  // loading:'0',
                  data: {
                    id: this.id,
                    tableName: 48
                  },
                  call: (data) => {
                    this.category = data.message
                    if (this.category) {
                      /* 判断是否拿到category */
                      this.ajaxJson({
                        url: '/Bill/approvalSubmitVue',
                        // loading:'0',
                        data: {
                          id: this.id,
                          category: this.category,
                          tableName: 48,
                          isDetail: 0,
                          tableDetailName: -1
                        },
                        call: (data) => {
                          if (data.type === 0) {
                            this.$dialog.setReturnValue(this.id) //向父级页面id值
                            this.$dialog.alert({
                              width: 320,
                              tipValue: data.message,
                              closeCallBack: () => {
                                this.$dialog.close()
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
                  }
                })
              }else{
                this.$dialog.alert({
                  width: 320,
                  tipValue: data.message,
                  closeCallBack: () => {
                    this.$dialog.close()
                  }
                })
              }
            }else {
              this.$dialog.alert({
                alertImg: 'error',
                tipValue: data.message,
                closeCallBack: () => {
                }
              })
            }
            // if (data.type == 0) {
            //   this.$dialog.setReturnValue(this.id)
            //   this.$dialog.alert({
            //     tipValue: data.message,
            //     closeCallBack: ()=>{
            //       this.$dialog.close()
            //     }
            //   })
            // }else{
            //   this.$dialog.alert({
            //     tipValue: data.message,
            //     closeCallBack: ()=>{
            //     }
            //   })
            // }
          }
        })
      },
      initDate(){
        this.ajaxJson({
          url: '/Bill/openInvoiceForm',
          data: {
            id: this.id,
          },
          call: (data) => {
            this.list.person = data.person//申请人
            this.list.applyDate = data.applyDate//申请日期
            this.list.purchaserType = data.purchaserType//购买方类型
            this.list.purchaser = data.purchaser//购买方
            // purchaserID:this.list.purchaserID,//购买方 改为 车牌号id
            this.list.payerID = data.payerID//购买方
            this.list.category = data.category//开票类型
            // workOrder:this.list.workOrder,//工单ID
            this.list.licensePlateNumber = data.licensePlateNumber//车牌号
            this.list.invoiceCategory = data.invoiceCategory//发票类型
            this.list.isReceivables = data.isReceivables//0已收款 1未收款

            this.invoiceMoney = data.invoiceMoney//发票金额
            this.invoiceMoneyUp = data.invoiceMoneyUp//金额大写
            this.list.remark = data.remark//事由说明
            this.list.preUseDate = data.preUseDate//预计使用日期
            this.list.moneyBackDate = data.moneyBackDate//

            this.list.productDetails = data.productDetails
            this.list.bankDetailList = data.bankDetailList
            this.list.invoiceHandle = data.invoiceHandle
            this.workOrderList = data.workOrderList
            this.list.makeOutAnInvoice = ''
            this.list.bankID = data.bankID
            this.list.bank = data.bank
            this.list.account = data.account
            // fileList:this.list.fileList,

            this.list.invoiceList = data.invoiceList
            this.list.taxNumber = data.taxNumber//税号
            this.list.invoiceMoneyUp = data.invoiceMoneyUp//金额大写
            this.list.invoiceHandleList = data.invoiceHandlePsd.list//发票处理
            this.list.categoryList = data.categoryPsd.list//开票类型

            this.list.invoiceCategoryList = data.invoiceCategoryPsd.list//发票类型
            this.list.purchaserTypeList = data.purchaserTypePsd.list//抬头类型
            this.list.checkedValueList = data.workOrderList

            let ids = []
            for(let q in this.list.checkedValueList){
              ids.push(this.list.checkedValueList[q].ownerID)
            }

            ids = ids.join(',')
            this.ajaxJson({
              url: '/fix/fixOrder/queryByidList',
              data: {
                ids:ids
              },
              call: (dt) => {
                for(let i in this.list.checkedValueList){
                  for(let j in dt){
                    if(this.list.checkedValueList[i].ownerID==dt[j].id){
                      this.list.checkedValueList[i].ordernum = dt[j].code
                      this.list.checkedValueList[i].vehicle = dt[j].vehicle
                      this.list.checkedValueList[i].invoiceAmount = this.list.checkedValueList[j].money
                      this.list.checkedValueList[i].type = this.list.isReceivables
                      this.list.checkedValueList[i].useMoney = this.list.checkedValueList[j].money
                      this.list.checkedValueList[i].totalMoney = dt[j].expend
                    }
                  }
                }

                this.tableList = this.list.checkedValueList
              }
            })
          }
        })
      }
    },
    created () {
      this.setQuery2Value('ownerCategory')
      if(this.ownerCategory!='5'){
        this.list = JSON.parse(sessionStorage.openInvoiceFormWorkOrderList)
        console.log(this.list)
        let num = 0
        for(let i in this.list.checkedValueList){
          let item = this.list.checkedValueList[i]
          let items = {}
          items.id = guid()
          items.ownerID = item.id
          items.workOrder = item.ordernum//工单号
          items.workOrderID = item.ownerID//工单ID
          items.licensePlateNumber = item.vehicle
          items.balance = item.type=='1'?(Number(item.totalMoney)-Number(item.useMoney))+'':(Number(item.money)-Number(item.useMoney))+''
          items.money = item.invoiceAmount
          items.invoiceID = this.id
          this.workOrderList.push(items)
          num+=Number(this.list.checkedValueList[i].invoiceAmount)
        }
        this.invoiceMoney = Number(num)
      }else{
        this.initDate()
      }

    }
  }
</script>

<style scoped>

</style>
