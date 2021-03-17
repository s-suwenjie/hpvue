<template>
  <div class="f_main">
    <yhm-view-body>
      <template #title>基本信息</template>
      <template #body>
        <yhm-view-control title="公司名称" :content="unitID"></yhm-view-control>
        <yhm-view-control title="付款公司" :content="paymentUnit"></yhm-view-control>
        <yhm-view-control title="是否默认项" :content="defaults" :psd="defaultsList"></yhm-view-control>
        <yhm-view-control title="公司编码" :content="unitCoding"></yhm-view-control>
        <yhm-view-control title="是否支持轨迹查询"  :content="track" :psd="trackList"></yhm-view-control>
        <yhm-view-control title="是否支持在线下单"  :content="orderOnline" :psd="orderOnlineList"></yhm-view-control>
        <yhm-view-control title="是否支持预约取件"  :content="reservation" :psd="reservationList"></yhm-view-control>
        <yhm-view-control title="查单网址" :content="inquiryURL"></yhm-view-control>
        <yhm-view-control title="查单电话" :content="inquiryPhone"></yhm-view-control>

      </template>
    </yhm-view-body>
    <div class="f_split"></div>
    <yhm-view-tab>
      <template #tab>
        <yhm-view-tab-button :list="tab" :index="0">储值卡信息</yhm-view-tab-button>
        <yhm-view-tab-button :list="tab" @click="tabClick()" :index="1">对账单信息</yhm-view-tab-button>
      </template>
      <template #content>
        <yhm-view-tab-list :customize="true"  v-show="tab[0].select">
          <template #listHead>
            <yhm-managerth style="width: 150px"  title="编号" ></yhm-managerth>
            <yhm-managerth style="width: 120px" title="别名"></yhm-managerth>
            <yhm-managerth style="width: 100px" title="密码"></yhm-managerth>
            <yhm-managerth  title="备注"></yhm-managerth>
            <yhm-managerth style="width: 100px" title="当前余额"></yhm-managerth>
            <yhm-managerth style="width: 100px" title="充值"></yhm-managerth>
            <yhm-managerth style="width: 100px" title="充值记录"></yhm-managerth>
            <yhm-managerth style="width: 100px" title="操作"></yhm-managerth>

          </template>
          <template #listBody>
            <tr v-for="(item,index) in listStoredCard" :key="index" :class="{InterlacBg:index%2!==0}">
              <yhm-manager-td  :value="item.numbering"></yhm-manager-td>
              <yhm-manager-td :value="item.alias" ></yhm-manager-td>
              <yhm-manager-td :value="item.password" ></yhm-manager-td>
              <yhm-manager-td :value="item.remark" ></yhm-manager-td>
              <yhm-manager-td-money :value="item.currentMoney" ></yhm-manager-td-money>
              <yhm-manager-td-operate >
                <yhm-manager-td-operate-button @click="rechargeClick(item)" value="充值" icon="im_recharge" color="#E3AA3F"></yhm-manager-td-operate-button>
              </yhm-manager-td-operate>
              <yhm-manager-td-operate >
                <yhm-manager-td-operate-button @click="recordingClick(item)" value="充值记录" icon="uniE99E" color="#56B4F4"></yhm-manager-td-operate-button>
              </yhm-manager-td-operate>
              <yhm-manager-td-operate >
                <yhm-manager-td-operate-button @click="storedCardDel(item)" value="删除" icon="delete" color="#ff0000"></yhm-manager-td-operate-button>
              </yhm-manager-td-operate>
            </tr>
          </template>
          <template #empty>
            <span class="m_listNoData" v-show="listStoredCard.length!=0?false:true">暂时没有数据</span>
          </template>
          <!--<template #pager>-->
            <!--<yhm-pagination :pager="pager" is-page-size="false" :is-select-info="false" @initData="listPage(false)"></yhm-pagination>-->
          <!--</template>-->
        </yhm-view-tab-list>
        <yhm-view-tab-list :customize="true"  v-show="tab[1].select">
          <template #listHead>
            <yhm-managerth style="width: 120px"  title="文件（点击图标下载）" ></yhm-managerth>
            <yhm-managerth style="width: 120px" title="对账单开始日期"></yhm-managerth>
            <yhm-managerth style="width: 120px" title="对账单结束日期"></yhm-managerth>
            <yhm-managerth style="width: 120px" title="账单总金额"></yhm-managerth>
            <!--<yhm-managerth style="width: 120px" title="账单剩余回款金额"></yhm-managerth>-->
            <yhm-managerth style="width: 120px" title="状态"></yhm-managerth>

            <yhm-managerth style="width: 100px" title="操作"></yhm-managerth>

          </template>
          <template #listBody>
            <tr v-for="(item,index) in listBill" :key="index" :class="{InterlacBg:index%2!==0}">
              <yhm-manager-td  value=" " @click="downloadEvent(item)">
                <img  style="margin: auto;" width="30" height="30" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1594275457602&di=5ebf487929ced264a201d33766b21f42&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20180920%2F2397b5b7b5024319bf98035b72c2ca47.png" alt="">
              </yhm-manager-td>

              <yhm-manager-td-date  :value="item.startDate"></yhm-manager-td-date>
              <yhm-manager-td-date  :value="item.endDate"></yhm-manager-td-date>
              <yhm-manager-td-money  @click="countViewClick(item)" :value="item.countMoney"></yhm-manager-td-money>
              <!--<yhm-manager-td-money  :value="item.useMoney"></yhm-manager-td-money>-->
              <yhm-manager-td-operate >
                <yhm-manager-td-operate-button v-if="item.state==0" value="待开付款申请" ></yhm-manager-td-operate-button>
                <yhm-manager-td-operate-button v-if="item.state==1" value="进行中"></yhm-manager-td-operate-button>
                <yhm-manager-td-operate-button v-if="item.state==2" value="已完成" ></yhm-manager-td-operate-button>
              </yhm-manager-td-operate>
              <yhm-manager-td-operate >
                <yhm-manager-td-operate-button v-if="item.state==0" @click="storedCarGo(item)" value="去开付款申请" icon="im_go" color="#ff0000"></yhm-manager-td-operate-button>
                <yhm-manager-td-operate-button v-if="item.state==1" @click="storedView(item)" value="付款申请审批中" icon="i-departmentApprovalOK" color="#49a9ea"></yhm-manager-td-operate-button>
                <yhm-manager-td-operate-button v-if="item.state==2"  @click="storedView(item)" value="付款申请已完成" icon="i-finishApprovalOK" color="#2c920b"></yhm-manager-td-operate-button>
              </yhm-manager-td-operate>
            </tr>
          </template>
          <template #empty>
            <span class="m_listNoData" v-show="listBill.length!=0?false:true">暂时没有数据</span>
          </template>
          <template #pager>
            <yhm-pagination :pager="pager" is-page-size="false" :is-select-info="false" @initData="tabClick(false)"></yhm-pagination>
          </template>
        </yhm-view-tab-list>
      </template>
    </yhm-view-tab>

    <div class="f_split"></div>
    <yhm-view-tab>
      <template #tab>
        <yhm-view-tab-button :list="tabState" :index="0">月结账号信息</yhm-view-tab-button>
      </template>
      <template #content>
        <yhm-view-tab-list :customize="true"  v-show="tabState[0].select">
          <template #listHead>
            <yhm-managerth style="width: 150px"  title="编号" ></yhm-managerth>
            <yhm-managerth style="width: 120px" title="别名"></yhm-managerth>
            <yhm-managerth  title="备注"></yhm-managerth>
            <yhm-managerth style="width: 100px" title="待结账金额"></yhm-managerth>
            <yhm-managerth style="width: 100px" title="操作"></yhm-managerth>

          </template>
          <template #listBody>
            <tr v-for="(item,index) in listMonthlyAccount" :key="index" :class="{InterlacBg:index%2!==0}">
              <yhm-manager-td  :value="item.monthlyNumbering"></yhm-manager-td>
              <yhm-manager-td :value="item.monthlYalias" ></yhm-manager-td>
              <yhm-manager-td :value="item.monthlyRemark" ></yhm-manager-td>
              <yhm-manager-td :value="item.monthlypendingSettlementMoney" ></yhm-manager-td>


              <yhm-manager-td-operate >
                <yhm-manager-td-operate-button @click="monthlyAccountDel(item)" value="删除" icon="delete" color="#ff0000"></yhm-manager-td-operate-button>
              </yhm-manager-td-operate>
            </tr>
          </template>
          <template #empty>
            <span class="m_listNoData" v-show="listMonthlyAccount.length!=0?false:true">暂时没有数据</span>
          </template>
          <!--<template #pager>-->
            <!--<yhm-pagination :pager="pager" is-page-size="false" :is-select-info="false" @initData="listPage(false)"></yhm-pagination>-->
          <!--</template>-->
        </yhm-view-tab-list>
      </template>
    </yhm-view-tab>

    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn>
        <yhm-commonbutton value="编辑" style="margin-right: 20px" icon="i-edit" :flicker="true" @call="editBtn()"></yhm-commonbutton>
      </template>
    </yhm-formoperate>
  </div>
</template>

<script>
  import { viewmixin } from '@/assets/view.js'
  export default {
    name: 'courierCompanyView',
    mixins: [viewmixin],
    data(){
      return{
        tabState: [{ select: true }],
        tab: [{ select: true },{ select: false }],
        id:'',
        unitID:'',          //公司名称
        defaultsList:[],
        defaults:'',        //是否默认项
        unitCoding:'',      //公司编码
        trackList:[],       //轨迹查询
        track:'',
        orderOnlineList:[],   //在线下单
        orderOnline:'',
        reservationList:[],   //预约取件
        reservation:'',
        inquiryURL:'',    //查单网址
        inquiryPhone:'',    //查单电话
        listStoredCard:[],
        listMonthlyAccount:[],
        listBill:[],
        paymentUnit:'',

      }
    },
    methods:{
      countViewClick(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '700',
          url: '/courierCompanyDetailsView?ownerID=' + item.ownerID+'&startDate='+item.startDate+'&endDate='+item.endDate+'&id='+item.id,
          title: '查看保单信息',
          closeCallBack: (data)=>{
            if(data){
            }
          }
        })
      },
      storedView(item){
        let params = {
          id: item.id,
        }
        this.ajaxJson({
          url: '/PersonOffice/getOwnerID',
          data: params,
          call: (data) => {
            if (data.type==0){
              this.$dialog.OpenWindow({
                width: '1050',
                height: '750',
                title: '查看付款申请',
                url: '/paymentApplyFormView?id='+data.id,
                closeCallBack: (data)=>{
                  if(data){

                  }
                }
              })
            }
          }
        })

      },
      downloadEvent(item){
        window.open('/UploadFile/' + item.storeName)
      },
      storedCarGo(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '750',
          title: '添加付款申请',
          url: '/paymentApplyForm?ownerID='+item.id+'&nature=9&money='+item.countMoney,
          closeCallBack: (data)=>{
            if(data){

            }
          }
        })
      },
      tabClick(){
        let params = {
          personID: this.id,
          pageSize: this.pager.pageSize, // 单页数据条数
          pageIndex: this.pager.pageIndex, // 当前页码
        }
        this.ajaxJson({
          url: '/dailyoffice/expressCompany/getExpressBill',
          data: params,
          call: (data) => {
           this.listBill=data.content
            this.pager.total=data.count
          }
        })
      },
      monthlyAccountDel(item){
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
              url: '/dailyoffice/expressCompany/monthlyAccountDel',
              data: params,
              call: (data) => {
                if (data.type == '0') {
                  this.$dialog.alert({
                    tipValue: data.message,
                    closeCallBack: (data) => {
                      this.initData(false)
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
      storedCardDel(item){
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
              url: '/dailyoffice/expressCompany/storedCardDel',
              data: params,
              call: (data) => {
                if (data.type == '0') {
                  this.$dialog.alert({
                    tipValue: data.message,
                    closeCallBack: (data) => {
                      this.initData(false)
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
      recordingClick(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '500',
          url: '/rechargeRecordView?id='+item.id,
          title: '查看充值记录',
          closeCallBack: (data) => {
            if (data) {
              this.initPageData(false)
              /*false->非初始化=>!import  true->初始化*/
            }
          }
        })
      },
      rechargeClick(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '650',
          url: '/storedCardForm?ownerID='+item.id,
          title: '充值储值卡',
          closeCallBack: (data) => {
            if (data) {
              this.initData(false)
              /*false->非初始化=>!import  true->初始化*/
            }
          }
        })
      },
      editBtn(){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '750',
          url: '/courierCompanyForm?id='+this.id,
          title: '添加快递信息',
          closeCallBack: (data) => {
            if (data) {
              this.initData(false)
              /*false->非初始化=>!import  true->初始化*/
            }
          }
        })
      },
      initData(){
        let params = {
          id: this.id
        }
        this.init({
          url: '/dailyoffice/expressCompany/initForm',
          data: params,
          call: (data)=>{
            this.defaultsList = data.defaultsPsd.list
            this.defaults = data.defaultsPsd.value

            this.trackList = data.trackPsd.list
            this.track = data.trackPsd.value

            this.orderOnlineList = data.orderOnlinePsd.list
            this.orderOnline = data.orderOnlinePsd.value

            this.reservationList = data.reservationPsd.list
            this.reservation = data.reservationPsd.value
            this.id=data.id
            this.unitCoding=data.unitCoding
            this.unitID=data.unitID
            this.inquiryURL=data.inquiryURL
            this.inquiryPhone=data.inquiryPhone
            this.listStoredCard=data.listStoredCard
            this.listMonthlyAccount=data.listMonthlyAccount
            this.paymentUnit=data.paymentUnit
          }
        })
      }
    },
    created(){
      this.setQuery2Value('id')
      this.initData()
    }
  }
</script>

<style scoped>

</style>
