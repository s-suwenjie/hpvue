<template>
  <div>
    <yhm-managerpage category="1">
      <!--导航条-->
      <template #navigationTab>
        <router-link class="menuTabDiv menuTabActive" :to="{path:'/home/billing/billingManager'}">出单管理</router-link>
      </template>
      <!--操作区-->
      <template #operate>

        <yhm-commonbutton  value="添加" icon="btnAdd" :flicker="true" @call="add()"></yhm-commonbutton>
        <yhm-commonbutton :value="choose?'收起筛选':'展开筛选'" :icon="choose?'btnUp':'btnDown'" @call="switchChoose()"></yhm-commonbutton>
        <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initPageData(false)"></yhm-managersearch>
      </template>
      <!--筛选区-->

      <template #choose>
        <div v-show="choose" class="buttonBody mptZero">
          <yhm-radiofilter :before="insuredUnitBefore" @initData="initChoose('insuredUnit')" title=" 保险公司" :content="listInsuredUnit"></yhm-radiofilter>
        </div>
      </template>
      <!--数据表头-->
      <template #listHead>
        <yhm-managerth  style="width: 40px;" title="选择"></yhm-managerth>
        <yhm-managerth  style="width: 40px;" title="查看"></yhm-managerth>
        <yhm-managerth  style="width: 130px;" title="车牌号" value="plate"></yhm-managerth>
        <yhm-managerth  style="width: 100px;" title="联系人" value="contactName"></yhm-managerth>
        <yhm-managerth  style="width: 100px;"  title="被保险人" value="beinsuredName"></yhm-managerth>
        <yhm-managerth  title="投保日期" value="insuredDate"></yhm-managerth>
        <yhm-managerth  title="保险公司" value="insuredUnit"></yhm-managerth>
        <yhm-managerth  style="width: 100px;" title="投保类型" value="insuredTypeVal"></yhm-managerth>
        <yhm-managerth  style="width: 100px;" title="保费合计" value="premiumsTotal"></yhm-managerth>
        <yhm-managerth  style="width: 100px;" title="实收金额" value="receivedMoney"></yhm-managerth>
        <yhm-managerth  style="width: 100px;" title="审批信息" value="status"></yhm-managerth>
        <yhm-managerth  title="状态" value="status"></yhm-managerth>

        <yhm-managerth  style="width: 230px;" title="操作"></yhm-managerth>
      </template>
      <!--数据明细-->
      <template #listBody>
        <tr :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]" v-for="(item,index) in content" :key="index">
          <yhm-manager-td-checkbox :value="item"  ></yhm-manager-td-checkbox>
          <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>
          <yhm-manager-td @click="plateView(item)" :value="item.plate"></yhm-manager-td>
          <yhm-manager-td  @click="contactView(item)" :value="item.contactName" ></yhm-manager-td>
          <yhm-manager-td  :tip="item.notEqual==='0'?false:true" :tip-show="true" tip-value="被保险人与车主不一致" @click="personView(item)" :value="item.beinsuredName" >
            <span v-if="item.notEqual==='0'?false:true" style=" color: #0b7cca;font-size: 18px;" class="uniE9A8 managerIcon"></span>
          </yhm-manager-td>
          <yhm-manager-td-date :value="item.insuredDate" ></yhm-manager-td-date>
          <yhm-manager-td-psd  :list="insuredUnitList" :value="item.insuredUnit"></yhm-manager-td-psd>
          <yhm-manager-td-center :value="item.insuredTypeVal"></yhm-manager-td-center>
          <yhm-manager-td-money :value="item.premiumsTotal"></yhm-manager-td-money>
          <yhm-manager-td-money :value="item.receivedMoney"></yhm-manager-td-money>
<!--          <yhm-manager-td :value="item.statusVal==='部门审批中'?item.causeList[0].insuranceFormulatorName:'-&#45;&#45;&#45;&#45;'"></yhm-manager-td>-->
          <yhm-manager-td-leaveword @iconClick="listDetailsView(item)" :leave-word-show="item.status === '-1'?true:false"></yhm-manager-td-leaveword>
          <yhm-manager-td-state @click="appPay(item)" :value="item.statusVal" :state-color="item.statusColor" :state-img="item.statusImg"></yhm-manager-td-state>
          <yhm-manager-td-operate>
            <yhm-manager-td-operate-button v-show="item.category==='1' " @click="addPNumbering(item)" icon="i-export" value="上传保单" color="#A344BB"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button @click="editPayment(item)" v-show="item.category==='2' ||item.category==='3'" :no-click="item.cashierOperation==='1'?false:true" value="付款申请" icon="i-btn-applicationSm" color="#49a9ea"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button @click="editBtn(item)" :no-click="item.status===''|| item.status==='1'|| item.status==='4'" value="提交申请" icon="i-btn-applicationSm" color="#49a9ea"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button @click="del(item)"   :no-click="item.status===''|| item.status==='1' || item.status==='4'" value="删除" icon="delete" color="#FF0000"></yhm-manager-td-operate-button>
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
    name: 'billingManager',
    mixins: [managermixin],
    data(){
      return{
        insuredUnitBefore:'0',// 默认选择状态为可以选择，1为不可以选择
        listInsuredUnit:{
          value: '', //默认为空
          list: []
        },
        insuredUnitList:[],

        isPoNumber:false,
        isAppPayment:false,
        isApp:false,
        isPersonTip:false,
      }
    },
    methods:{
      listDetailsView(item){
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
      appPay(item){
        if (item.statusVal==='返利审批中'||item.statusVal==='返利拨款中') {    //待完善
          this.$dialog.OpenWindow({
            width: '1050',
            height: '750',
            url: '/paymentApplyFormView?id=' + item.cashID +'&isState=1&isFinish=0',
            title: "查看付款申请信息",
            closeCallBack: () => {
                this.initPageData(false)
            }
          })
        }
      },
      addPNumbering(item){
        let title = '上传保单'
        let url = '/poNumbering?id='+item.poNumber+'&ownerID='+item.id+'&project='+item.project+'&forceEndDate='+item.forceEndDate+'&businessEndDate='+item.businessEndDate
        this.$dialog.OpenWindow({
          width: '1050',
          height: '550',
          url: url,
          title: title,
          closeCallBack: (data) => {
            if (data) {
              this.initPageData(false)
            }
          }
        })
      },
      plateView(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '500',
          url: '/vehicleView?id=' + item.plateID+'&isCustomer=0',
          title: '查看车辆信息',
          closeCallBack: (data)=>{
            if(data){
              this.initPageData(false)
            }
          }
        })
      },
      personView(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '690',
          url:'/personView?id=' + item.beinsuredID+'&isBilling=0',
          title:'查看被保险人信息',
          closeCallBack:(data) =>{
            if(data){
              this.initPageData(false)
            }
          }
        })
      },
      contactView (item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '690',
          url:'/personView?id=' + item.contactID+'&isBilling=0',
          title:'查看联系人信息',
          closeCallBack:(data) =>{
            if(data){
              this.initPageData(false)
            }
          }
        })
      },
      editPayment(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '750',
          url: '/billingApprovalApplyForm?discountMoney='+item.discountMoney+'&billingID='+item.id+'&cashierSubject=支付客户返利 ------ 售后业务 ------ 其他业务&cashierSubjectID=D65A9EF9-DCB2-47B8-918B-F8DD9342B2CB'
          +'&numbering='+item.numbering+'&plate='+item.plate+'&cashName='+item.cashName+'&cashNameID='+item.cashNameID+'&publicPrivate='+item.publicPrivate+'&Billingnature=6',
          title: '添加返利付款申请',
          closeCallBack: (data)=>{
            if(data){
              this.initPageData(false)
            }
          }
        })
      },
       editBtn(item){ //提交申请
         this.$dialog.confirm({
           width: 300,
           tipValue: '确定提交申请?',
           btnValueOk: '确定',
           alertImg: 'warn',
           okCallBack: (data) => {
             let params = {
               id: item.id,
               process:item.process,
             }
             this.ajaxJson({
               url: '/Insurance/submitBilling',
               data: params,
               call: (data) => {
                 if (data.type === 0) {
                   this.$dialog.alert({
                     tipValue: data.message,
                     closeCallBack: (data) => {
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
           }
         })
      },


      listView(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '680',
          url: '/billingView?id=' + item.id+'&status='+item.status,
          title: '查看保单信息',
          closeCallBack: (data)=>{
            if(data){
              this.initPageData(false)
            }
          }
        })
      },
      del(item){
        if (item.activation ==='2'){
          this.$dialog.alert({
            tipValue:'此条数据正在交易中，请忽删除!',
            alertImg: 'warn',
            width:'330'
          })
        }else {
          this.$dialog.confirm({
            width: 300,
            tipValue: '是否删除?',
            btnValueOk: '确定',
            alertImg: 'warn',
            okCallBack: (data) => {
              let params = {
                id: item.id,
              }
              this.ajaxJson({
                url: '/Insurance/delBilling',
                data: params,
                call: (data) => {
                  if (data.type == '0') {
                    this.$dialog.alert({
                      tipValue: data.message,
                      closeCallBack: (data) => {
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
            }
          })
        }
      },
      //添加出单
      add() {
        this.$dialog.OpenWindow({
          width: 1050,
          height: 750,
          url:'/billingForm',
          title:'出单管理',
          closeCallBack:(data) =>{
            if (data) {
              this.lastData = data//接收子页面传的值
              this.initPageData(false)
            }
          }
        })
      },
      // 筛选事件
          initChoose (op) {
        if (op === 'insuredUnit') {
          this.selectValue = []
        }

        this.initPageData(false)
      },
      //搜索
      initPageData (initValue) {
        let params = {}

        if (initValue) {
          params = {
            insuredUnit:this.listInsuredUnit.value
          }
        } else {
          params = {
            insuredUnit:this.listInsuredUnit.value
          }
        }
        this.init({
          initValue:initValue,
          url: '/Insurance/getBillingManager',
          data:params,
          all:(data) =>{
            //不管是不是初始化都需要执行的代码

          },
          init:(data)=>{
            //初始化时需要执行的代码
            // 这边初始化筛选信息
            this.listInsuredUnit=data.insuredUnitPsd
            this.insuredUnitList=data.insuredUnitList

          }
        })
      }
    },

  }
</script>

<style scoped>
.managerIcon{
  position: absolute;
  right: 4px;
}
</style>
