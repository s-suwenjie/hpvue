<template>
  <div>
    <yhm-managerpage >
      <!--导航条-->
      <template #navigation>个人办公&nbsp;&gt;&nbsp;个人办公&nbsp;&gt;&nbsp;收银</template>
      <!--操作区-->
      <template #operate>
<!--        <yhm-commonbutton  value="添加" icon="btnAdd" :flicker="true" @call="add()"></yhm-commonbutton>-->
<!--        <yhm-commonbutton :value="choose?'收起筛选':'展开筛选'" :icon="choose?'btnUp':'btnDown'" @call="switchChoose()"></yhm-commonbutton>-->
        <yhm-table-tip :show="tableTip" :content="tableTipInfo" :column="tableTipColumnInfo" :mouse-control="tableTipControl"></yhm-table-tip>
        <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initPageData(false)"></yhm-managersearch>
        <yhm-radiofilter :before="insuredUnitBefore" @initData="initChoose('category')" title="收银类型" :content="listCategory"></yhm-radiofilter>
        <yhm-radiofilter :before="insuredUnitBefore" @initData="initChoose('state')" title="状态"  all="0" :content="listState"></yhm-radiofilter>

        <yhm-form-date :error-show="false" v-if="!isBankManey"  title="交易日期" :value="yearMonth" id="yearMonth" @call="callDate" ></yhm-form-date>

      </template>
      <!--筛选区-->
<!--      <template #choose>-->
<!--        <div  class="buttonBody mptZero">-->
<!--        <yhm-radiofilter :before="insuredUnitBefore" @initData="initChoose('category')" title="收银类型" :content="listCategory"></yhm-radiofilter>-->
<!--        <yhm-radiofilter :before="insuredUnitBefore" @initData="initChoose('state')" title="状态"  all="0" :content="listState"></yhm-radiofilter>-->
<!--      </div>-->
<!--      </template>-->
      <!--数据表头-->
      <template #listHead>
        <yhm-managerth style="width: 40px;" title="选择"></yhm-managerth>
        <yhm-managerth style="width: 40px;" title="查看"></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="所属类型" value="category"></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="车牌号" value="plate"></yhm-managerth>
        <yhm-managerth title="被保险人" value="beinsuredName"></yhm-managerth>
        <yhm-managerth title="联系人" value="contactName"></yhm-managerth>
        <yhm-managerth style="width: 300px;" title="投保公司" value="insuredUnitShowName"></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="收支方向" value="direction"></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="金额"  value="money"></yhm-managerth>
        <yhm-managerth v-if="isBankManey" style="width: 150px;" title="此条交易剩余金额"  value="bankMoney"></yhm-managerth>
        <yhm-managerth title="编号" value="money"></yhm-managerth>
        <yhm-managerth v-if="isBankManey" style="width: 200px;" title="操作"></yhm-managerth>
        <yhm-managerth v-if="!isBankManey" style="width: 400px;" title="操作"></yhm-managerth>
      </template>

      <!--数据明细-->
      <template #listBody>
        <tr :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]" v-for="(item,index) in content" :key="index">
          <yhm-manager-td-checkbox :value="item"></yhm-manager-td-checkbox>
          <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>
          <yhm-manager-td :value="item.categoryVal"></yhm-manager-td>
          <yhm-manager-td :value="item.plate"></yhm-manager-td>
          <yhm-manager-td :value="item.beinsuredName" ></yhm-manager-td>
          <yhm-manager-td :value="item.contactName"></yhm-manager-td>
          <yhm-manager-td :value="item.insuredUnitShowName"></yhm-manager-td>
          <yhm-manager-td-direction  class="dfJcc" :direction="item.direction" :value="item.direction" :dir-val="false"></yhm-manager-td-direction>
          <yhm-manager-td-money :value="item.money" :before-icon="item.listMessage.length>0?'i-btn-prompt':''" @mouseover="tableTipShowEvent" @mouseout="tableTipHideEvent" :value-object="item"></yhm-manager-td-money>
          <yhm-manager-td-money v-if="isBankManey" :value="item.bankMoney" :before-icon="item.listMessage.length>0?'i-btn-prompt':''" @mouseover="tableTipShowEvent" @mouseout="tableTipHideEvent" :value-object="item"></yhm-manager-td-money>
          <yhm-manager-td :value="item.number"></yhm-manager-td>
          <yhm-manager-td-operate v-if="isBankManey">
<!--            <yhm-manager-td-operate-button v-if="item.bankMoney==='0.00'?true:false"  @click="Application(item)" :value="'付款申请'" icon="i-btn-grant" color="#be08e3"></yhm-manager-td-operate-button>-->
            <yhm-manager-td-operate-button v-if="item.cashierOperation==='3'?true:false"  @click="approFund(item)" :value="'收款(客户)'" icon="i-btn-grant" color="#be08e3"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button v-if="item.cashierOperation==='3'?true:false"  @click="gainsay(item)" :value="'驳回'" icon="i-toVoidCheck" color="#f00"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button v-if="item.cashierOperation==='2'?true:false"  @click="approFund(item)" :value="'代付(保险公司)'" icon="i-btn-grant" color="#be08e3"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button v-if="item.cashierOperation==='1'?true:false"  @click="approFund(item)" :value="'返利(客户)'" icon="i-btn-grant" color="#be08e3"></yhm-manager-td-operate-button>
          </yhm-manager-td-operate>
          <yhm-manager-td-operate  v-if="!isBankManey">
            <yhm-manager-td-operate-button :tip-category="0"   :value-object="item"   @click="printFund(item)" value="打印保险通知单" icon="i-btn-print" color="#333"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button :tip-category="1"   :value-object="item"  @click="printPayFund(item)" value="打印付款申请单" icon="i-btn-print" color="#333"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button :tip-category="1"   :value-object="item"  @click="printAllFund(item)" value="全部打印" icon="i-btn-print" color="#C700DF"></yhm-manager-td-operate-button>
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
    name: 'cashierManager',
    mixins: [managermixin],
    data(){
      return{
        insuredUnitBefore:'0',// 默认选择状态为可以选择，1为不可以选择
        listCategory:{
          value: '', //默认为空
          list: []
        },
        listState:{
          value: '1', //默认为空
          list: []
        },
        cashierOperation:'',
        isCollection:false,
        isPayFor:false,
        isCashBack:false,
        isBankManey:true,
        yearMonth:'',
        tableTip:false,         //记录表格是否显示
        tableTipControl:{},
        tableTipColumnInfo:[
          {width:'150',title:'审批时间',category:'date',key:'insertDate'},
          {width:'150',title:'申请人员',category:'',key:'messageName'},
          {width:'150',title:'审批备注',category:'',key:'message'},
        ],
        tableTipInfo:[],
      }
    },
    methods:{
      tableTipShowEvent(item,control){
        if(item.listMessage.length > 0) {
          this.tableTipInfo = item.listMessage
          this.tableTipControl = control
          this.tableTip = true
        }
      },
      tableTipHideEvent(){
        this.tableTip = false
      },
      gainsay(item){
        this.$dialog.OpenWindow({
          width: 650,
          height: 230,
          url:'/gainsayMessage?id='+item.ownerID,
          title: '驳回',
          closeCallBack: (data)=>{
            if(data){
              this.initPageData(false)
            }
          }
        })
      },
      callDate(){
        this.startDate=this.yearMonth+' 00:00:00'
        this.endDate = this.yearMonth+' 23:59:59'
        this.initPageData()
      },
      printAllFund(item){
        this.printPayFund(item)
        this.printFund(item)
      },
      /* 打印 */
      printPayFund(item){
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
      printFund(item){
          let param = {
            id: item.id,
            ownerID:item.ownerID,
          }
          this.ajaxJson({
            url: '/Fin/insuranceNotice',
            data: param,
            call: (data) => {
              window.open("/UploadFile/" + data.val)
            }
          })
      },
      listView(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '680',
          url: '/cashierView?id=' + item.ownerID+'&cashierOperation='+item.cashierOperation+'&cashierMoney='+item.money+'&cashierDirection='+item.direction+'&bankID='+item.id +'&bankOwnerID='+item.ownerID+'&bankMoney='+item.bankMoney
            +'&insuredUnitID='+item.insuredUnit+'&insuredUnitAccount='+item.insuredUnitAccount+'&cashierSubject=代付保险费 ------ 代理业务 ------ 其他业务&cashierSubjectID=DA771D46-0813-40C3-973B-9F57A492F3A0'
            +'&cashierRemake='+ item.remake+'&publicandPrivateAccount='+item.publicandPrivateAccount+'&cashierBankTag='+item.bank+'&insuredUnitAccountID='+item.insuredUnitAccountID,
          title: '查看客户信息',
          closeCallBack: (data)=>{
            if(data){
              this.initPageData(false)
            }
          }
        })
      },
      /*添加付款申请*/
      // Application(item){
      //     this.$dialog.OpenWindow({
      //       width: '1050',
      //       height: '690',
      //       title: '付款申请',
      //       url: '/cashierApprovalApplyForm?discountMoney='+item.money+'&cashierSubject=代付保险费 ------ 代理业务 ------ 其他业务&cashierSubjectID=DA771D46-0813-40C3-973B-9F57A492F3A0'
      //         +'&insuredUnitAccountID='+item.insuredUnitAccountID+'&insuredUnitAccount='+item.insuredUnitAccount+'&remake='+item.remake+'&insuredUnitShowName='+item.insuredUnitShowName
      //         +'&newNature=4'+'&billingOwID='+item.ownerID+'&billingID='+item.id+'&insuredUnitID='+item.insuredUnitID+'&insuredUnitAccountID='+item.insuredUnitAccountID
      //       ,
      //       closeCallBack: (data)=>{
      //         if(data){
      //           this.initPageData(false)
      //         }
      //       }
      //     })
      //
      // },
      /* 拨付资金 */
      approFund(item){
        if (item.cashierOperation=== '3'){
          this.$dialog.OpenWindow({
            width: '1050',
            height: '690',
            title: '收款(客户)',
            url: '/cashierBankDetailPrivateForm?cashierMoney='+item.money +'&cashierDirection='+item.direction+'&bankID='+item.id +'&bankOwnerID='+item.ownerID+'&bankMoney='+item.bankMoney
              +'&insuredUnitID='+item.insuredUnit+'&insuredUnitAccount='+item.insuredUnitAccount+'&cashierSubject=代收保险费 ------ 代理业务 ------ 其他业务&cashierSubjectID=F0887A4D-DA14-4FCB-B48B-221B42C8F17A'
              +'&cashierRemake='+item.remake+'&publicandPrivateAccount='+item.publicandPrivateAccount+'&cashierBankTag='+item.bank,
            closeCallBack: (data)=>{
              this.initPageData(false)
            }
          })
        } else  if (item.cashierOperation=== '2'){
          this.$dialog.OpenWindow({
            width: '1050',
            height: '690',
            title: '拨付资金',
            url: '/cashierBankDetailForm?cashierMoney='+item.money +'&cashierDirection='+item.direction+'&bankID='+item.id +'&bankOwnerID='+item.ownerID+'&bankMoney='+item.bankMoney
            +'&insuredUnitID='+item.insuredUnit+'&insuredUnitAccount='+item.insuredUnitAccount+'&cashierSubject=代付保险费 ------ 代理业务 ------ 其他业务&cashierSubjectID=DA771D46-0813-40C3-973B-9F57A492F3A0'
              +'&cashierRemake='+ item.remake+'&publicandPrivateAccount='+item.publicandPrivateAccount+'&cashierBankTag='+item.bank+'&insuredUnitAccountID='+item.insuredUnitAccountID,
            closeCallBack: (data)=>{
              this.initPageData(false)
            }

          })
        }
        // else  if (item.cashierOperation=== '1'){
        //   this.$dialog.OpenWindow({
        //     width: '1050',
        //     height: '690',
        //     title: '保险返利',
        //     url: '/cashierBankDetailForm?cashierMoney='+item.money +'&cashierDirection='+item.direction+'&bankID='+item.id +'&bankOwnerID='+item.ownerID+'&bankMoney='+item.bankMoney
        //       +'&insuredUnitAccountID='+item.insuredUnitAccountID+'&insuredUnitAccount='+item.insuredUnitAccount+'&cashierSubject=支付客户返利 ------ 售后业务 ------ 其他业务&cashierSubjectID=D65A9EF9-DCB2-47B8-918B-F8DD9342B2CB'
        //       +'&cashierRemake='+ item.remake+'&publicandPrivateAccount='+item.publicandPrivateAccount+'&cashierBankTag='+item.bank,
        //     closeCallBack: (data)=>{
        //       this.initPageData(false)
        //     }
        //   })
        // }
        // 筛选事件

      },
      initChoose (op) {
        if (op === 'state') {
          this.selectValue = []
        }


        if (this.listState.value==0){
          this.isBankManey=false
        }else if (this.listState.value==1){
          this.isBankManey=true
        }
         this.startDate=''
         this.endDate=''
        this.yearMonth=''
        this.initPageData(false)
      },
      initPageData (initValue) {
        let params = {}

        if (initValue) {
          params = {
            category:this.listCategory.value,
            state:this.listState.value,
          }
        } else {
          params = {
            category:this.listCategory.value,
            state:this.listState.value,
            startDate:this.startDate,
            endDate:this.endDate
          }

        }
        this.init({
          initValue:initValue,
          url: '/Fin/getBankDetailClueManager',
          data:params,
          all:(data) =>{
            //不管是不是初始化都需要执行的代码



          },
          init:(data)=>{
            //初始化时需要执行的代码
            this.listState=data.statePsd
            this.listState.value=data.statePsd.value

            this.listCategory=data.categoryPsd


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
