<template>
  <div>
    <yhm-managerpage>
      <template #navigation>财务管理&nbsp;&gt;&nbsp;投资&nbsp;&gt;&nbsp;理财管理</template>
      <template #operate>
        <yhm-commonbutton value="添加" icon="btnAdd" :flicker="true" @call="add()"></yhm-commonbutton>
<!--        <yhm-commonbutton :value="choose?'收起筛选':'展开筛选'" :icon="choose?'btnUp':'btnDown'" @call="switchChoose()"></yhm-commonbutton>-->
        <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initData"></yhm-managersearch>
        <yhm-radiofilter :before="stateBefore" @initData="initChoose('categoryUnit')" title="状态" :content="listState"></yhm-radiofilter>
        <yhm-radiofilter @initData="initChoose('categoryUnit')" title="银行" :content="listBankID"></yhm-radiofilter>

      </template>

<!--      <template #choose>-->
<!--        <div v-show="choose" class="buttonBody mptZero">-->
<!--          <yhm-radiofilter @initData="initChoose('state')" title="状态" :content="listCategory"></yhm-radiofilter>-->
<!--        </div>-->
<!--      </template>-->

      <!--数据表头-->
      <template #listHead>
        <yhm-managerth style="width: 38px;" title="选择"></yhm-managerth>
        <yhm-managerth style="width: 38px;" title="查看"></yhm-managerth>
        <yhm-managerth style="width: 220px" title="名称" value="name"></yhm-managerth>
        <yhm-managerth title="账号" value="account"></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="待赎回金额" value="money"></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="已赎回金额" value="money"></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="已实现收益" value="money"></yhm-managerth>
        <yhm-managerth style="width: 135px" title="开始日期" value="startDate"></yhm-managerth>
        <yhm-managerth style="width: 135px" title="结束日期" value="endDate"></yhm-managerth>
        <yhm-managerth style="width: 120px;" title="状态"></yhm-managerth>
        <yhm-managerth style="width: 290px;" title="操作"></yhm-managerth>
      </template>

      <!--数据明细-->
      <template #listBody>
        <tr :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]" v-for="(item,index) in content" :key="index">
          <yhm-manager-td-checkbox :value="item"></yhm-manager-td-checkbox>
          <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>
          <yhm-manager-td :value="item.name"></yhm-manager-td>
          <yhm-manager-td :value="item.account"></yhm-manager-td>
          <yhm-manager-td-money style="color:#49a9ea"  :value="item.money"></yhm-manager-td-money>
          <yhm-manager-td-money style="color:#ff0000" :value="item.redeemMoney"></yhm-manager-td-money>
          <yhm-manager-td-money style="color:#0ea050" :value="item.profitMoney"></yhm-manager-td-money>
          <yhm-manager-td-date :value="item.startDate"></yhm-manager-td-date>
          <yhm-manager-td-date :value="item.endDate"></yhm-manager-td-date>
          <yhm-manager-td-psd :value="item.state" :list="stateItems"></yhm-manager-td-psd>
          <yhm-manager-td-operate>
            <yhm-manager-td-operate-button v-if="item.isEntry== '2'" @click="tranPaymentEvent(item)" value="转款" icon="i-tranPayment" color="#49a9ea"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button v-if="item.state== '1'||item.state== '2'||item.state== '3'" @click="addTranPaymentEvent(item)" value="追加" icon="i-tranPayment" color="#4b12d6"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button :no-click="item.isEntry=='0'&&item.state=='4' " @click="redeemEvent(item)" value="赎回" icon="i-redeem" color="#2aa70b"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button :no-click="item.isEntry!='1'" @click="interestEntry(item)" value="入账" icon="i-interest" color="#c700df"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button v-if="item.state== '1'||item.state== '2'" @click="interestBearing(item)" value="计息" icon="i-interest" color="#055f04"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button :no-click="item.state !== '3'" @click="finishEvent(item)" value="完成" icon="i-check" color="#49a9ea"></yhm-manager-td-operate-button>
          </yhm-manager-td-operate>
        </tr>
      </template>

      <!--数据空提示-->
      <template #empty>
        <span class="m_listNoData" v-show="empty">暂时没有数据</span>
      </template>
      <template #total>
        <div class="listTotalCrente m_list w620">
          <table width="100%" cellpadding="0" cellspacing="0" class="m_content_table m_content_total_table">
            <thead>
            <tr>
              <yhm-managerth style="width: 100px;" before-color="#49a9ea" title="" before-title="待赎回金额" ></yhm-managerth>
              <yhm-managerth style="width: 100px;" before-color="#ff0000" title="" before-title="已赎回金额"></yhm-managerth>
              <yhm-managerth style="width: 100px;" before-color="#0ea050" title="" before-title="已实现收益"></yhm-managerth>
            </tr>
            </thead>
            <tbody>
            <tr>
              <yhm-manager-td-money @click="selectState('1')" style="color:#49a9ea" :value="contentTotal.money"></yhm-manager-td-money>
              <yhm-manager-td-money @click="selectState('')" style="color:#ff0000" :value="contentTotal.redeemMoney"></yhm-manager-td-money>
              <yhm-manager-td-money @click="selectState('')" style="color:#0ea050" :value="contentTotal.profitMoney"></yhm-manager-td-money>
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
    name: 'conductFinManager',
    mixins: [managermixin],
    data(){
      return{
        value: '',
        list: [],
        stateBefore: '0', // 默认选择状态为可以选择，1为不可以选择,
        listState: {
          value: '',
          list: []
        },
        listBankID:{
          value:'',
          list:[],
        },
        stateItems: [],
        contentTotal:[]
      }
    },
    methods: {
      interestBearing(item){
        this.$dialog.OpenWindow({
          width: 1050,
          height: 400,
          url: '/bankProductInterest?ownerID=' + item.id ,
          title: '计息登记',
          closeCallBack: (data) => {
            if(data){
              this.initPageData(false)
            }
          }
        })
      },
      selectState(state){
        this.listState.value=state
        this.initPageData(false)
      },
      add(){
        this.$dialog.OpenWindow({
          width: 1050,
          height: 640,
          url: '/conductFinForm',
          title: '添加理财产品',
          closeCallBack: (data) => {
            if(data){
              this.initPageData(false)
            }
          }
        })
      },
      listView(item){
        this.$dialog.OpenWindow({
          width: 1050,
          height: 600,
          url: '/conductFinView?id=' + item.id + '&state=' + item.state,
          title: '查看理财产品',
          closeCallBack: (data) => {
            if(data){
              this.initPageData(false)
            }
          }
        })
      },
      addTranPaymentEvent(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '690',
          title: '拨付资金',
          url: '/bankDetailForm?ownerID=' + item.id +'&bankDetailType=15&directionBefore=1',
          closeCallBack: (data)=>{
            if(data){
              this.initPageData(false)
            }
          }
        })
      },
      /* 转款 */
      tranPaymentEvent(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '690',
          title: '拨付资金',
          url: '/bankDetailForm?ownerID=' + item.id +'&bankDetailType=8&directionBefore=1',
          closeCallBack: (data)=>{
            if(data){
              this.initPageData(false)
            }
          }
        })
      },
      /* 赎回本金 */
      redeemEvent(item){
        this.$dialog.OpenWindow({
          width: 1050,
          height: 640,
          url: '/conductFinRedeemForm?ownerID='+item.id+'&money='+item.money,
          title: '赎回',
          closeCallBack: (data) => {
            if(data){
              this.initPageData(false)
            }
          }
        })
        /*this.$dialog.OpenWindow({
          width: '1050',
          height: '690',
          title: '拨付资金',
          url: '/bankDetailForm?ownerID=' + item.id +'&bankDetailType=9&directionBefore=1',
          closeCallBack: (data)=>{
            if(data){
              this.initPageData(false)
            }
          }
        })*/
      },
      /* 利息入账 */
      interestEntry(item){
        this.$dialog.OpenWindow({
          width: 850,
          height: 340,
          url: '/conductFinEntry?ownerID='+item.id,
          title: '入账',
          closeCallBack: (data) => {
            if(data){
              this.initPageData(false)
            }
          }
        })
        /*this.$dialog.OpenWindow({
          width: '1050',
          height: '690',
          title: '拨付资金',
          url: '/bankDetailForm?ownerID=' + item.id +'&bankDetailType=10&directionBefore=1',
          closeCallBack: (data)=>{
            if(data){
              this.initPageData(false)
            }
          }
        })*/
      },
      finishEvent(item){
        this.$dialog.confirm({
          width:420,
          tipValue:'确定本条理财的本金和利息全部到账！！！',
          btnValueOk:'确定已全部到账',
          btnValueCancel:'我再看看',
          okCallBack:() =>{
            let params = {
              id:item.id
            }
            this.ajaxJson({
              url: '/Fin/finishBankProduct',
              data: params,
              call: (data) => {
                if(data.type === 0){
                  this.$dialog.alert({
                    tipValue: data.message,
                    closeCallBack: ()=> {
                      this.initPageData(false)
                    }
                  })
                }else{
                  this.$dialog.alert({
                    tipValue:data.message,
                    alertImg: 'error'
                  })
                }
              }
            })
          }
        })
      },
      initPageData(initValue){
        let params = {}
        if (initValue) {
          // 页面初始化是需要的参数
          params = {
            init: true,
            state: '1'
          }
        } else {
          // 页面非初始化时需要的参数
          params = {
            state: this.listState.value,
            bankID: this.listBankID.value,
            init: false
          }
        }
        this.init({
          initValue: initValue,
          url: '/Fin/getBankProductManager',
          data: params,
          all: (data) => {
            // 不管是不是初始化都需要执行的代码
            this.listBankID=data.bankIDPsd
            this.contentTotal=data.total[0]
          },
          init: (data) => {
            // 初始化时需要执行的代码
            // 这边初始化筛选信息
            this.listState = data.statePsd
            this.stateItems = data.stateItems
            this.listCategory=data.categoryPsd
          }
        })
      }
    },
    computed:{
      getRedeem(){
        return function (item) {
          if(item.redemptionCategory === '0'){
            return  item.state !== '2'
          }
          else{
            return item.state === '0' || item.state === '3' || item.state === '4'
          }
        }
      },
      getInterest(){
        return function (item) {
          return item.state === '0' || item.state === '4'
        }
      }
    },
    created () {

    }
  }
</script>

<style scoped>

</style>
