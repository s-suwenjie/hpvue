<template>
    <div>
      <yhm-managerpage category="1" :total-table="true" :totalWidth="true">
        <template #navigationTab>
          <router-link class="menuTabDiv menuTabActive" :to="{path:'/home/depositManager?isMain='+isMain}">收到的押金</router-link>
          <router-link class="menuTabDiv" :to="{path:'/home/payDepositManager?isMain='+isMain}">付出的押金</router-link>
        </template>
        <!-- 操作区-->
        <template #operate>
          <yhm-commonbutton value="添加" v-if="isMain === '1'" icon="btnAdd" :flicker="true" @call="add" category="one"></yhm-commonbutton>
          <yhm-commonbutton :value="choose?'收起筛选':'展开筛选'" :icon="choose?'btnUp':'btnDown'" @call="switchChoose()"></yhm-commonbutton>
          <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initData"></yhm-managersearch>
        </template>

        <template #choose>
          <div v-show="choose" class="buttonBody mptZero">
            <yhm-radiofilter @initData="initChoose('state')" title="状态" :content="statePsd"></yhm-radiofilter>
            <yhm-radiofilter @initData="initChoose('category')" title="类型" :content="categoryPsd"></yhm-radiofilter>
            <yhm-radiofilter @initData="initChoose('brand')" title="类型" :content="brandPsd"></yhm-radiofilter>
            <yhm-radiofilter @initData="initChoose('subject')" title="事由类型" :content="subjectPsd"></yhm-radiofilter>
          </div>
        </template>
        <!--数据表头-->
        <template #listHead>
          <yhm-managerth style="width: 40px;" title="选择"></yhm-managerth>
          <yhm-managerth style="width: 40px;" title="查看"></yhm-managerth>
          <yhm-managerth style="width: 80px;" title="操作人"></yhm-managerth>
          <yhm-managerth style="width: 160px;" title="收款账户"></yhm-managerth>
          <yhm-managerth style="width: 110px;" title="交易日期"></yhm-managerth>
          <yhm-managerth style="width: 110px;" title="事由类型"></yhm-managerth>
          <yhm-managerth style="width: 80px;" title="付款类型"></yhm-managerth>
          <yhm-managerth style="width: 160px;" title="付款方"></yhm-managerth>
          <yhm-managerth title="付款账号"></yhm-managerth>
          <yhm-managerth style="width: 80px;" title="押金金额"></yhm-managerth>
          <yhm-managerth style="width: 80px;" title="待退金额"></yhm-managerth>
          <yhm-managerth style="width: 80px;" title="已退金额"></yhm-managerth>
          <yhm-managerth style="width: 80px;" title="状态"></yhm-managerth>
          <yhm-managerth style="width: 200px;" title="备注"></yhm-managerth>
          <yhm-managerth style="width: 200px;" title="操作"></yhm-managerth>
        </template>

        <!--数据明细-->
        <template #listBody>
          <tr :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]" v-for="(item,index) in content" :key="index">
            <yhm-manager-td-checkbox :value="item"></yhm-manager-td-checkbox>
            <yhm-manager-td-look @click="look(item)"></yhm-manager-td-look>
            <yhm-manager-td :value="item.person"></yhm-manager-td>
            <yhm-manager-td :tip="true" :value="item.selfAccount"></yhm-manager-td>
            <yhm-manager-td-date :value="item.workDate"></yhm-manager-td-date>
            <yhm-manager-td-psd :value="item.subjectID" :list="subjectPsd.list"></yhm-manager-td-psd>
            <yhm-manager-td-psd :value="item.category" :list="categoryPsd.list"></yhm-manager-td-psd>
            <yhm-manager-td :tip="true"@click="selectOther(item)" :value="item.other"></yhm-manager-td>
            <yhm-manager-td :tip="true" :value="item.otherAccount"></yhm-manager-td>
            <yhm-manager-td-money :value="item.money"></yhm-manager-td-money>
            <yhm-manager-td-money style="color: red;" v-if="item.state!=='0'" :value="item.useMoney"></yhm-manager-td-money>
            <yhm-manager-td-money style="color: red;" v-if="item.state==='0'" :value="'0.00'"></yhm-manager-td-money>
            <yhm-manager-td-money style="color: #5AB6F6;" :value="(parseFloat(item.money)-parseFloat(item.useMoney)).toString()"></yhm-manager-td-money>
            <yhm-manager-td v-show="item.state === '0'" color="#49a9ea" value="待收款"></yhm-manager-td>
            <yhm-manager-td v-show="item.state === '1'" color="#ae07e2" value="待退款"></yhm-manager-td>
            <yhm-manager-td v-show="item.state === '2'" color="#0c7f05" value="已完成"></yhm-manager-td>
            <yhm-manager-td :value="item.remark"></yhm-manager-td>
            <yhm-manager-td-operate>
              <yhm-manager-td-operate-button  v-show="isMain==='1'" @click="printFund(item)" value="打印单据" icon="i-btn-print" color="#333"></yhm-manager-td-operate-button>
              <yhm-manager-td-operate-button v-show="item.state === '0'&&isMain==='1'" @click="bankDetailSave(item)" value="入账" color="#49a9ea"></yhm-manager-td-operate-button>
              <yhm-manager-td-operate-button v-show="item.state === '1'&&item.useMoney!=='0.00'&&isMain==='0'" @click="clickRefundMoney(item)" icon="i-redeem" value="退款" icon-color="#f00" color="red" ></yhm-manager-td-operate-button>
              <yhm-manager-td-operate-button v-show="item.state === '1'&&item.useMoney!=='0.00'&&isMain==='0'" @click="isFinish(item)" icon="i-check" value="完成" color="#49a9ea" ></yhm-manager-td-operate-button>
            </yhm-manager-td-operate>
          </tr>
        </template>

        <!--数据空提示-->
        <template #empty>
          <span class="m_listNoData" v-show="content.length==0">暂时没有数据</span>
        </template>

        <!--分页控件-->
        <template #pager>
          <yhm-pagination :pager="pager" @initData="initData(false)"></yhm-pagination>
        </template>

        <template #listTotalHead >
          <yhm-managerth @call="screenState('')" style="width: 60px; color:#0311A1" width="60px" title="" before-title="总金额" ></yhm-managerth>
          <yhm-managerth @call="screenState('0')" style="width: 60px; color:#1B9E5E" width="60px" title="" before-title="待收金额" ></yhm-managerth>
          <yhm-managerth @call="screenState('1')" style="width: 60px; color:#F3460D" width="60px" title="" before-title="已收金额"></yhm-managerth>
          <yhm-managerth @call="screenState('1')" style="width: 60px; color:#52a7ff" width="60px" title="" before-title="待退金额" ></yhm-managerth>
          <yhm-managerth @call="screenState('2')" style="width: 60px; color:#7070C7" width="60px" title="" before-title="已退金额" ></yhm-managerth>

        </template>
        <template #listTotalBody>
          <tr>
            <yhm-manager-td-money @click="screenState('')" style="color:#0311A1" :value="sumMoney"></yhm-manager-td-money>
            <yhm-manager-td-money @click="screenState('0')" style="color:#1B9E5E" :value="stayCollectMoney"></yhm-manager-td-money>
            <yhm-manager-td-money @click="screenState('1')" style="color:#F3460D" :value="collectMoney"></yhm-manager-td-money>
            <yhm-manager-td-money @click="screenState('1')" style="color:#52a7ff" :value="stayRefundMoney"></yhm-manager-td-money>
            <yhm-manager-td-money @click="screenState('2')" style="color:#7070C7" :value="refundMoney"></yhm-manager-td-money>
          </tr>
        </template>

      </yhm-managerpage>
    </div>
</template>

<script>
  import {managermixin} from '@/assets/manager.js'
  import { accMul, accAdd, guid, formatDate, number2chinese,formatTime} from '@/assets/common.js'
  export default {
    name: 'depositManager',
    mixins: [managermixin],
    data(){
      return{
        categoryPsd:[],
        subjectPsd:[],
        statePsd:[],
        state:'0',
        brandPsd:[],
        isMain:'',
        sumMoney:'',
        refundMoney:'',
        collectMoney:'',
        stayCollectMoney:'',
        stayRefundMoney:'',
      }
    },
    created () {
      this.setQuery2Value('isMain')
      if(this.isMain == '0'){
        this.state='1'
      }
      this.initData (true)
    },
    methods:{
      screenState(state){
        this.statePsd.value=state
        this.initChoose()
      },
      initChoose(){
        this.initData (false)
        this.total()
      },
      total(){
        let params = {
          subjectID:this.subjectPsd.value,
          category:this.categoryPsd.value,
          state:this.statePsd.value,
        }
        this.ajaxJson({
          url: '/dailyoffice/deposit/getManagerTotal',
          data: params,
          call: (data) => {
            this.sumMoney=data.sumMoney.toString()
            this.stayCollectMoney=data.stayCollectMoney.toString()
            this.collectMoney=data.collectMoney.toString()
            this.stayRefundMoney=data.stayRefundMoney.toString()
            this.refundMoney=data.refundMoney.toString()
          }
        })
      },
      isFinish(item){
        this.$dialog.confirm({
          width:300,
          alertImg: 'warn',
          btnValueOk: '确认',
          tipValue: '待退金额 <span style="color:red">('+item.useMoney+'元)</span> 确定完成?',
          okCallBack: () => {
            let update={
              id:item.id,
              state:'2'
            }
            this.ajaxJson({
              url:  '/dailyoffice/deposit/updateState',
              data: update,
              call: (data) => {
                if(data.type===0){
                  this.$dialog.alert({
                    tipValue: '完成成功',
                    closeCallBack: () => {
                      this.initData (false)

                    }
                  })
                }else{
                  this.$dialog.alert({
                    tipValue: '完成失败',
                    closeCallBack: () => {


                    }
                  })
                }
              }
            })
          }
        })
      },
      printFund(item){
        let params = {
          id: item.id
        }
        this.ajaxJson({
          url: '/Fin/bankDetailPrintingReceiptVue',
          data: params,
          call: (data) => {
            if (data.type === 0) {
              this.$dialog.alert({
                tipValue: '打印成功',
                closeCallBack: () => {
                  window.open(data.html)
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
      },
      clickRefundMoney(item){
        // 默认设置页面标记是查看
        this.$dialog.OpenWindow({
          width: '1050',
          height: '750',
          url: '/paymentApplyForm?ownerID='+item.id+'&nature=7',
          title: '添加付款申请信息',
          closeCallBack: (data) => {
            if (data) {
              this.initData(false)
            }
          }
        })
      },
      bankDetailSave(item){
        let balance = 0
        if (item.selfAccountID) {
          let param = {
            accountID: item.selfAccountID
          }
          this.ajaxJson({
            url: '/Fin/getAccountBalanceVue',
            data: param,
            call: (data) => {
              if(data.message){
                balance = accAdd(data.message,item.money) + ''
                let params = {
                  id: guid(),
                  ownerID: item.id,
                  ownerSys: '0', //收支分类
                  brand: item.brand,//品牌
                  direction: '0',//收支方向
                  cccurDate: item.workDate,//交易日期
                  selfAccountID: item.selfAccountID,//我方ID账户信息
                  selfAccount: item.selfAccount,//我方账户信息
                  money: item.money,//交易金额额
                  balance: balance,//交易后余额
                  subjectType: '0',//事由类型
                  subjectID: item.subjectID,//事由ID
                  subject: item.subject,//事由
                  otherName: item.other,//对方账户说明
                  otherAccountType: item.category,//对方账户类型
                  otherID:item.otherID,//对方公司ID
                  otherAccountID: item.otherAccountID,//对方账户ID
                  otherAccount: item.otherAccount,//对方账户类型
                  remark: item.remark,//备注
                  feeType: '',//有无手续费
                  fee: '',//手续费金额
                  voucherNo: '',//凭证号
                  useMoney: item.money,//多事由计算金额
                  subjectList: [],//多事由
                }
                this.$dialog.confirm({
                  alertImg: 'warn',
                  btnValueOk: '确认',
                  tipValue: '确定入账?',
                  okCallBack: () => {
                    this.ajaxJson({
                      url: '/Fin/vueBankDetailSave',
                      data: params,
                      loading: '0',
                      call: (data) => {
                        if (data.type === 0) {
                          this.$dialog.alert({
                            tipValue: '入账成功',
                            closeCallBack: () => {
                              let update={
                                id:item.id,
                                state:'1'
                              }
                              this.ajaxJson({
                                url:  '/dailyoffice/deposit/updateState',
                                data: update,
                                loading: '0',
                                call: (data) => {
                                  if(data.type===0){
                                    this.initData (false)
                                  }
                                }
                              })
                            }
                          })
                        }else{
                          this.$dialog.alert({
                            tipValue: '入账失败',
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
        }
      },
      selectOther(item){
        if(item.category==='0'){
          this.$dialog.OpenWindow({
            width: '1050',
            height: '690',
            url:'/unitView?id=' + item.otherID,
            title:'查看单位信息',
            closeCallBack:(data) =>{
              if(data){
                this.initData(false)
              }
            }
          })
        }else if(item.category==='1'){
          this.$dialog.OpenWindow({
            width: '1050',
            height: '750',
            url: '/personView?id=' + item.otherID,
            title: '查看联系人信息',
            closeCallBack: (data)=>{
              if(data){
                this.initData(false)
              }
            }
          })
        }
      },
      initData (initValue) {
        let params = {}
        if (initValue) {
          // 页面初始化是需要的参数
          params = {
            state:this.state,
            init:true,
          }
        } else {
          // 页面非初始化时需要的参数
          params = {
            subjectID:this.subjectPsd.value,
            category:this.categoryPsd.value,
            brand:this.brandPsd.value,
            state:this.statePsd.value,
          }
        }

        this.init({
          initValue: initValue,
          url:'/dailyoffice/deposit/getManager',
          data: params,
          loading: '0',
          all: (data) => {
            // 不管是不是初始化都需要执行的代码
          },

          init: (data) => {
            // 初始化时需要执行的代码
            this.categoryPsd=data.categoryPsd
            this.statePsd=data.statePsd
            this.brandPsd=data.brandPsd
            this.subjectPsd = data.subjectPsd

            this.sumMoney=data.total[0].sumMoney
            this.refundMoney=data.total[0].refundMoney
            this.collectMoney=data.total[0].collectMoney
            this.stayCollectMoney=data.total[0].stayCollectMoney
            this.stayRefundMoney=data.total[0].stayRefundMoney
          }
        })
      },
      add(){
        this.$dialog.OpenWindow({
          width: 1050,
          height: 720,
          url:'/depositForm',
          title:'添加押金事项',
          closeCallBack:(data) =>{
            if(data){
              this.initData(false)
            }
          }
        })
      },
      look(item){
        let url=''
        let title=""
        if(this.isMain === '1'){
          if(item.state === '0'){
            url='/depositForm?id='+item.id
            title='添加收押金信息'
          }else{
            url='/depositView?id='+item.id
            title='查看收押金信息'
          }
        }else{
          url='/depositView?id='+item.id
          title='查看收押金信息'
        }
        this.$dialog.OpenWindow({
          width: 1050,
          height: 720,
          url:url,
          title:title,
          closeCallBack:(data) =>{
            if(data){
              this.initData(false)
            }
          }
        })
      }
    }
  }
</script>

<style scoped>
  .icon-1:before{
    color: #c90000;
  }
</style>
