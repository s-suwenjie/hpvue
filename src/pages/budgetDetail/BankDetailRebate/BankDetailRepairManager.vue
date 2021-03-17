<template>
  <div>
    <yhm-managerpage @statisticalClick="statisticalClick" :statisticalShow="true" :category="isCategory" :total-table="true" :totalWidth="true">
      <!--导航条-->
      <template #navigationTab v-if="isPersonalClaims">
        <a class="menuTabDiv" href="/Fin/bankDetailManager?menuType=0">收支明细</a>
        <router-link class="menuTabDiv" :to="{path:'/home/viewManager/claimsManager'}">保险理赔</router-link>
        <router-link class="menuTabDiv menuTabActive" :to="{path:'/home/BankDetailRepairManager'}">自费维修</router-link>
        <router-link class="menuTabDiv" :to="{path:'/home/BankDetailCommissionManager'}">保险手续费</router-link>
        <router-link class="menuTabDiv " :to="{path:'/home/finPosAccountManager'}">Pos账户</router-link>
        <router-link class="menuTabDiv" :to="{path:'/home/finPosAccountDetailManager'}">Pos离线数据</router-link>
      </template>
      <template #navigation v-if="!isPersonalClaims" @statisticalClick="statisticalClick" :statisticalShow="true">售后业务&nbsp;&gt;&nbsp;业务回款&nbsp;&gt;&nbsp;自费维修</template>
      <!--操作区-->
      <template #operate>
        <!--          <yhm-commonbutton value="添加" icon="btnAdd" :flicker="true" @call="add()"></yhm-commonbutton>-->
        <yhm-table-tip ref="smallTable" :show="tableTip" :content="tableTipInfo" :column="tableTipColumnInfo" :mouse-control="tableTipControl"></yhm-table-tip>
        <yhm-commonbutton :value="choose?'收起筛选':'展开筛选'" :icon="choose?'btnUp':'btnDown'" @call="switchChoose()"></yhm-commonbutton>
        <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initData"></yhm-managersearch>
        <yhm-commonbutton value="打开选中信息" icon="i-selectAll" @call="selectedList" :show="isSelected" category="three"></yhm-commonbutton>
        <yhm-radiofilterdate title="时间" @initData="selectMonthEvent"></yhm-radiofilterdate>
        <yhm-commonbutton  style="margin-bottom: 6px;margin-left:-17px;" value="开票申请" :show="isSelected&&signStateList.value==='0'" icon="btnAdd" @call="addOpenInvoice" :flicker="true"></yhm-commonbutton>
        <yhm-radiofilterday title="日" :yearMonth="yearMonth" @initData="initChooseTime"></yhm-radiofilterday>

      </template>
      <template #buttonSwitch>
        <!--<div class="buttonSwitch">-->
          <!--<span :class="{loss:topBtnShou,profit:!topBtnShou}">表示增加</span>-->
          <!--<img src="/HtmlStatic/images/ColorSwop.png" @click="profitAndLossClick" v-show="!topBtnShou" alt="">-->
          <!--<img src="/HtmlStatic/images/ColorSwopFilp.png" @click="profitAndLossClick" v-show="topBtnShou" alt="">-->
          <!--<span :class="{loss:!topBtnShou,profit:topBtnShou}">表示减少</span>-->
        <!--</div>-->
        <div v-show="!isPersonalClaims" @click='incomeClick' id="incomeContent" style='background:linear-gradient(0deg, #1ea0ff, #77c6ff);color:#fff;border-radius:5px;text-align:center;line-height:36px;display: inline-block;position:absolute;top:56px;right: 8px;border:1px solid #ccc;height:36px;width: 100px;font-size: 15px;align-content: center'>
          全部维修收入
        </div>
      </template>
      <template #choose>
        <div v-show="choose" class="buttonBody mptZero">
          <yhm-radiofilter v-show="!isPersonalClaims" @initData="initChoose('type')" title="回款方式" :content="typeList"></yhm-radiofilter>
          <yhm-radiofilter  @initData="initChoose('signState')" title="数据状态" :content="signStateList"></yhm-radiofilter>
          <yhm-radiofilter  @initData="initChoose('subjectID')" title="事由类型" :content="subjectIDList"></yhm-radiofilter>
          <yhm-radiofilter  @initData="initChoose('openInvoiceType')" title="开票金额类型" :content="openInvoiceTypeList"></yhm-radiofilter>
          <yhm-radiofilter :before="bank" @initData="initChoose('bank')" title="银行"  :content="bankList"></yhm-radiofilter>
          <yhm-radiofilter :before="operatorID" @initData="initChoose('operatorID')" title="业务员"  :content="operatorIDList"></yhm-radiofilter>
          <!--<yhm-radiofilter v-show="true" :before="insuranceUnit" @initData="initChoose('insuranceUnit')" title="保险公司"  :content="insuranceUnitList"></yhm-radiofilter>-->
          <yhm-radiofilter  @initData="initChoose('unitOrPerson')" title="公司或个人"  :content="unitOrPersonList"></yhm-radiofilter>

          <!--<yhm-radiofilter :before="dateType" @initData="initChoose('dateType')" title="时间" :content="dateTypeList"></yhm-radiofilter>-->
          <yhm-radiofilter  @initData="initChoose('vehicleBrand')" title="车辆品牌" :content="vehicleBrandList"></yhm-radiofilter>
        </div>
      </template>
      <!--数据表头-->
      <template #listHead>
        <yhm-managerth-check style="width: 40px;" :check="allCheck"></yhm-managerth-check>
        <yhm-managerth style="width: 38px;" title="查看"></yhm-managerth>
        <yhm-managerth style="width: 100px" title="客户姓名" value="customerName"></yhm-managerth>
        <yhm-managerth title="收入来源" value="otherName"></yhm-managerth>
        <yhm-managerth style="width: 170px;" title="工单号" value="workOrderID"></yhm-managerth>
        <yhm-managerth style="width: 80px" title="业务员" value="operator"></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="车型品牌" value="vehicleBrandID"></yhm-managerth>
        <yhm-managerth style="width: 90px" title="车牌号" value="licensePlateNumber"></yhm-managerth>
        <yhm-managerth style="width: 120px;" title="回款日期" value="moneyBackDate"></yhm-managerth>
        <yhm-managerth style="width: 100px" title="发生额" value="money"></yhm-managerth>
        <yhm-managerth style="width: 140px" title="收款银行" value="bankName"></yhm-managerth>
        <!--          <yhm-managerth style="width: 140px" title="发票号"></yhm-managerth>-->
        <yhm-managerth style="width: 180px" title="银行摘要" ></yhm-managerth>
        <yhm-managerth style="width: 80px" title="数据状态" ></yhm-managerth>
        <yhm-managerth style="width: 180px" title="开票操作" ></yhm-managerth>
      </template>
      <!--数据明细-->
      <template #listBody>
        <tr  v-for="(item,index) in content" :key="index" :class="[{InterlacBg:index%2!=0}]">
          <yhm-manager-td-checkbox :value="item"></yhm-manager-td-checkbox>
          <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>
          <yhm-manager-td :value="item.customer" v-if="item.customer===''" ></yhm-manager-td>
          <yhm-manager-td-center :value="item.customer" v-else @click="customerClick(item)" :menu-list="customerMenu" @rightClick="rightClick(item)" @menuClick="menuClick"></yhm-manager-td-center>
          <yhm-manager-td :tip="true" :value="item.otherName" :color='item.subjectID=="008F808E-C79C-4F8B-9D16-986093FAB86A"&&incomeType==="1"?"#0b26e8":""' v-if="item.otherName===''" @click="unitClickLeft(item)" ></yhm-manager-td>
          <yhm-manager-td-center :tip="true" :value="item.otherName" :color='item.subjectID=="008F808E-C79C-4F8B-9D16-986093FAB86A"&&incomeType==="1"?"#0b26e8":""' v-else @click="unitClickLeft(item)" :menu-list="unitMenu" @rightClick="rightClick(item)" @menuClick="menuClick"></yhm-manager-td-center>
          <yhm-manager-td :value="item.workOrder" v-if="item.workOrder===''" ></yhm-manager-td>
          <yhm-manager-td-center :value="item.workOrder" :after-icon="item.detailNum > 1?'i-btn-prompt':''"  v-else :menu-list="jobNumberMenu" @rightClick="rightClick(item)" @menuClick="menuClick"></yhm-manager-td-center>

          <yhm-manager-td :value="item.operator" v-if="item.operatorID===''" @click="operatorClickLeft(item)"></yhm-manager-td>
          <yhm-manager-td-center :value="item.operator" v-else :menu-list="operatorMenu" @click="operatorClickLeft(item)" @rightClick="rightClick(item)" @menuClick="menuClick"></yhm-manager-td-center>
          <yhm-manager-td :value="item.vehicleBrand" v-if="item.vehicleBrand===''"></yhm-manager-td>
          <yhm-manager-td-center :value="item.vehicleBrand" v-else :menu-list="vehicleBrandMenu" @click="vehicleBrandLeft(item)" @rightClick="rightClick(item)" @menuClick="menuClick"></yhm-manager-td-center>
          <yhm-manager-td-center :value="item.licensePlateNumber" @click="vehicleEvent(item)" :menu-list="licensePlateMenu" @rightClick="rightClick(item)" @menuClick="menuClick"></yhm-manager-td-center>
          <yhm-manager-td-date :value="item.moneyBackDate"></yhm-manager-td-date>
          <yhm-manager-td-money :value="item.money === null ? ' ':item.money" :before-icon="item.detailBalance > 0?'i-btn-prompt':''" @mouseover="tableTipShowEvent" @mouseout="tableTipHideEvent" :value-object="item" before-icon-color="red"></yhm-manager-td-money>
          <yhm-manager-td :value="item.bankName" v-if="item.bankName===''"></yhm-manager-td>
          <yhm-manager-td-center :value="item.bankName" v-else :menu-list="bankIDMenu" @click="vehicleBrandLeft(item)" @rightClick="rightClick(item)" @menuClick="menuClick"></yhm-manager-td-center>
          <yhm-manager-td :value="item.bankSummary === null ? ' ': item.bankSummary" title="点击复制" @click="clickCopy(item.bankSummary)"></yhm-manager-td>
          <yhm-manager-td-psd  :value="item.signState" :list="isSignStateList"></yhm-manager-td-psd>
          <yhm-manager-td-operate>
            <yhm-manager-td-operate-button v-show="item.balanceInvoice != 0&& (item.signState==='0'||item.signState==='3') " @click="addOpenInvoiceOne(item)" value="开票申请" icon="i-btn-applicationSm" color="#49a9ea"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button v-show="item.balanceInvoice !== item.money " @click="viewOpenInvoice(item)" value="查看开票" color="#7112da"></yhm-manager-td-operate-button>
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
      <template #listTotalHead >
        <yhm-managerth before-color="black" style="width: 60px" width="60px" title="" before-title="总数" ></yhm-managerth>
        <yhm-managerth before-color="black" style="width: 60px" width="60px" title="" :before-title="nowTotal" ></yhm-managerth>
        <yhm-managerth v-show="!isSelected" :before-color="oldTotalColor" @call="profitAndLossClick" style="width: 60px;" width="60px" title="" :before-title="oldTotal"></yhm-managerth>
        <yhm-managerth v-show="isYearMoneyShow && !isSelected" :before-color="oldTotalColor1" style="width: 60px;" width="60px" title="" :before-title="yearTotal" ></yhm-managerth>
      </template>
      <template #listTotalBody>
        <tr>
          <yhm-manager-td-rgt @click="totalClick(item)" style="text-align: center;" v-for="(item,key) in contentTotal" :key="key" :value="item.count"></yhm-manager-td-rgt>
          <yhm-manager-td-money @click="totalClick(item)" style="text-align: center;" v-for="(item,index) in contentTotal" :key="index+1" :value="item.money"></yhm-manager-td-money>
          <yhm-manager-td-money v-show="!isSelected" :before-symbol="oldMoneySymbol" @click="totalClick(item,'2')" before-color="#ff000c" :style="{color:oldTotalColor}" v-for="(item,index) in contentTotal" :key="index+2" :value="oldMoney"></yhm-manager-td-money>
          <yhm-manager-td-money v-show="isYearMoneyShow && !isSelected" v-if="yearMoneyShow" :before-symbol="yearMoneySymbol" @click="totalClick(yearMoney)" before-color="#ff000c" :style="{color:oldTotalColor1}"  :value="yearMoney"></yhm-manager-td-money>
          <yhm-manager-td-money v-show="isYearMoneyShow && !isSelected" v-if="!yearMoneyShow" :before-symbol="yearMoneySymbol" @click="totalClick('0')" before-color="#ff000c" :style="{color:oldTotalColor1}"  value="NaN"></yhm-manager-td-money>

        </tr>
      </template>
    </yhm-managerpage>
    <div class="copyTip" v-if="isCopyTip">复制成功： {{text}}</div>

  </div>
</template>

<script>
  import { managermixin } from '@/assets/manager.js'
  import { guid } from '../../../assets/common'
  export default {
    name: 'claimsManager',
    mixins: [managermixin],
    data(){
      return{
        jobNumberMenu:['筛选当前工单号'],
        unitMenu:['筛选当前公司','转到保险理赔','修改事由'],
        operatorMenu:['筛选当前联系人'],
        vehicleBrandMenu:['筛选当前车辆品牌'],
        bankIDMenu:['筛选当前银行'],
        customerMenu:['筛选当前客户'],
        customerName:'',//客户ID
        licensePlateMenu:['筛选当前车牌'],
        licensePlateNumber:'',
        oldTotal:'比前一天(环比)',
        oldTotalColor:'#ff000c',
        oldTotalColor1:'#ff000c',
        yearMoney:'',
        yearMoneyShow:true,
        yearTotal:'同比',
        yearMoneySymbol:'',
        selectMonth:[],
        isYearMoneyShow:true,
        nowTotal:'本日',
        oldMoney:'',
        oldMoneySymbol:'',
        unitItme:{},
        contentTotal: [],
        content:[],
        operatorID:'0',
        operatorIDList:{
          value: '',
          list: []
        },
        endDate:'',
        startDate:'',
        bank:'0',
        yearMonth: '',
        isCategory: '1',
        isPersonalClaims: true,
        isClaims: '',
        index:'0',
        radioTime: {},
        bankList: {
          value: '',
          list: []
        },
        subjectID:'',
        subjectIDList: {
          value: '',
          list: [],
        },
        insuranceUnit:'0',
        insuranceUnitList: {
          value: '',
          list: []
        },
        vehicleBrand:'',
        vehicleBrandList: {
          value: '',
          list: []
        },
        dateType:'0',
        timeParams: '',
        dateTypeList:{
          value:'',
          list:[
            // {
            //   code:'',
            //   num:'0',
            //   showName:'本日'
            // },
            // {
            //   code:'',
            //   num:'1',
            //   showName:'本周'
            // },
            // {
            //   code:'',
            //   num:'2',
            //   showName:'本月'
            // },
            // {
            //   code:'',
            //   num:'3',
            //   showName:'本年'
            // },
          ]
        },
        workOrderID:'',

        topBtnShou:false,
        unitOrPersonList:{
          value:'',
          list:[
            {
              code:'',
              num:'0',
              img:'icon-correct',
              showName:'公司',
            },
            {
              code:'',
              num:'1',
              img:'icon-InterestRW',
              showName:'个人',
            },
          ]
      },
        signStateList:{
          value:'',
          list:[
            {
              code:'',
              num:'0',
              img:'icon-correct iconSignState',
              showName:'正常',
            },
            {
              code:'',
              num:'1',
              img:'icon-InterestRW',
              showName:'待核查',
            },
            {
              code:'',
              num:'2',
              img:'icon-delete',
              showName:'异常',
            },
            {
              code:'',
              num:'4',
              img:'icon-correct',
              showName:'待完善',
            },
          ]
        },
        isSignStateList:[
          {
            code:'#3EE208',
            num:'0',
            img:'icon-correct iconSignState',
            showName:'正常',
          },
          {
            code:'#151EE2',
            num:'3',
            img:'icon-correct iconSignState',
            showName:'正常',
          },
          {
            code:'#FDD000',
            num:'1',
            img:'icon-InterestRW',
            showName:'待核查',
          },
          {
            code:'#FF0000',
            num:'2',
            img:'icon-delete',
            showName:'异常',
          },
          {
            code:'#A81AFF',
            num:'4',
            img:'icon-delete',
            showName:'待完善',
          },
        ],
        profitAndLoss:'0',

        dayCategory:'0',//环比点击事件变量
        type:'1',//0 是保险理赔  1是自费维修
        oldType:'1',//0 是保险理赔  1是自费维修
        typeList: {
          value: '1',
          list: [
            {
              code: '',
              num: '0',
              img: 'icon-correct iconSignState',
              showName: '保险理赔',
            },
            {
              code: '',
              num: '1',
              img: 'icon-InterestRW',
              showName: '自费维修',
            },
          ]
        },
        incomeType:'0',
        screen:'',
        times:'',
        text:'',
        isCopyTip:false,
        currentControl:'',
        tableTip: false,
        tableTipControl: {},
        tableTipColumnInfo:[
          {width:'140',title:'待分配金额',category:'money',key:'detailBalance'},
        ],
        tableTipInfo:[],
        contentTotal:[],

        openInvoiceMainID:'',
        selectList:[],
        openInvoiceType:'',
        openInvoiceTypeList:{
          value: '',
          list: []
        },
      }
    },
    methods:{
      vehicleEvent(item){
        if(item.vehicleID){
          this.$dialog.OpenWindow({
            width: '1050',
            height: '810',
            title: '车辆信息',
            url: '/vehicleView?id='+item.vehicleID,
            closeCallBack: (data)=>{
              if(data){
                this.initPageData(false)
              }
            }
          })
        }
      },
      viewOpenInvoice(item){
        this.$dialog.OpenWindow({
          width: '750',
          height: '390',
          title: '查看开票申请信息',
          url: '/claimsOpenInvoice?ownerID=' + item.id,
          closeCallBack: (data) => {
            if(data){
              this.initPageData(false)
            }
          }
        })
      },
      addOpenInvoiceOne(item){
        this.openInvoiceMainID=guid()
        let detailList=[item.id]
        let params = {
          ownerID:this.openInvoiceMainID,
          detailList: detailList
        }
        this.ajaxJson({
          url: '/Fin/openInvoiceListSave',
          data: params,
          call: (data) => {
            if (data.type === 0) {
              this.$dialog.OpenWindow({
                width: '1050',
                height: '790',
                title: '添加开票申请信息',
                url: '/openInvoiceForm?isAdd=true&ownerID=' + this.openInvoiceMainID + '&ownerCategory=1',
                closeCallBack: (data) => {
                  if (data) {
                    this.initPageData(false)
                  }else{
                    let params = {
                      ownerID:this.openInvoiceMainID
                    }
                    this.ajaxJson({
                      url: '/Fin/openInvoiceListDel',
                      data: params,
                      call: (data) => {

                      }
                    })
                  }
                }
              })
            }
          }
        })
      },
      addOpenInvoice(){
        this.openInvoiceMainID=guid()
        let a=true
        let list=[]
        for (let i = 0; i < this.selectList.length; i++) {
          if(parseFloat(this.selectList[i].balanceInvoice)!==0){
            list.push(this.selectList[i].id)
          }
        }
        if(list.length>0){
          let params = {
            ownerID:this.openInvoiceMainID,
            detailList: list
          }
          this.ajaxJson({
            url: '/Fin/openInvoiceListSave',
            data: params,
            call: (data) => {
              if(data.type===0){
                if(data.val === ''){
                  this.$dialog.OpenWindow({
                    width: '1050',
                    height: '790',
                    title: '添加开票申请信息',
                    url: '/openInvoiceForm?isAdd=true&ownerID='+this.openInvoiceMainID+'&ownerCategory=1',
                    closeCallBack: (data) => {
                      if (data) {
                        this.selectValue=[]
                        this.initPageData(false)
                      }else{
                        let params = {
                          ownerID:this.openInvoiceMainID
                        }
                        this.ajaxJson({
                          url: '/Fin/openInvoiceListDel',
                          data: params,
                          call: (data) => {

                          }
                        })
                      }
                    }
                  })
                }else if(data.val === '2'){
                  this.$dialog.confirm({
                    width: 300,
                    tipValue: '开票抬头不同，确认同时开票?',
                    btnValueOk: '确认',
                    alertImg: 'warn',
                    okCallBack: () => {
                      this.forOpenInvoice(this.openInvoiceMainID)
                    },
                    cancelCallBack: () => {
                      this.delOpenInvoiceMoreUnit(this.openInvoiceMainID)
                    }
                  })
                }
              }else{
                this.$dialog.alert({
                  alertImg: 'error',
                  tipValue: data.message,
                  closeCallBack: ()=>{

                  }
                })
              }
            }
          })
        }else{
          this.$dialog.alert({
            alertImg: 'error',
            tipValue: '所选数据已全部开票',
            closeCallBack: ()=>{

            }
          })
        }
      },
      delOpenInvoiceMoreUnit(ownerID){
        let params = {
          ownerID:ownerID
        }
        this.ajaxJson({
          url: '/Fin/openInvoiceMoreUnitDel',
          data: params,
          call: (data) => {
            this.selectValue=[]
            this.initPageData(false)
          }
        })
      },
      forOpenInvoice(ownerID){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '790',
          title: '添加开票申请信息',
          url: '/openInvoiceForm?isAdd=true&ownerID=' + ownerID + '&ownerCategory=1&forOpenInvoice=1',
          closeCallBack: (num) => {
            if(num){
              let a=0
              if(num==='1'){
                this.delOpenInvoiceMoreUnit(ownerID)
                return
              }else{
                let params={
                  ownerID:this.openInvoiceMainID
                }
                this.ajaxJson({
                  url: '/Fin/openInvoiceListFor',
                  data: params,
                  call: (data) => {
                    if(data.length>0){
                      this.forOpenInvoice(data[0].invoiceID)
                    }else{
                      this.selectValue=[]
                      this.initPageData(false)
                    }
                  }
                })
              }
            }else{
              this.forOpenInvoice(ownerID)
            }
          }
        })
      },
      /* 小标格显示 */
      tableTipShowEvent(item,control){
        if(parseFloat(item.detailBalance) > 0) {
          this.currentControl = control
          this.tableTipInfo = [
            {
              detailBalance: item.detailBalance
            },
          ]
          this.tableTipControl = control
          this.tableTip = true
        }
        else{
          this.currentControl = null
          this.tableTip = false
        }
      },
      tableTipHideEvent(item,control){
        if(parseFloat(item.detailBalance) > 0){
          document.addEventListener('mouseover', this.moveToSmallTable)
        }
      },
      moveToSmallTable(e){
        if(this.currentControl) {
          if(!(this.currentControl.contains(e.target) || this.$refs.smallTable.$el.contains(e.target))){
            this.tableTip = false
          }
        }
        else{
          document.removeEventListener('mouseover', this.moveToSmallTable)
        }
      },
      clickCopy(val){
        clearTimeout(this.times)//再次点击时关闭上次触发的定时器 防止多次执行
        let text = val
        this.$copyText(text).then(res=>{
          this.text = text
          this.isCopyTip =  true
          let that = this
          this.times = window.setTimeout(()=>{//将定时器的id存入变量
            that.isCopyTip =  false
          },4500)
        },err=>{

        })
      },
      customerClick(item){
        if(item.unitOrPerson=='0'){
          this.$dialog.OpenWindow({
            width: '1050',
            height: '810',
            title: '联系人信息',
            url: '/personView?id='+item.customerName,
            closeCallBack: (data)=>{
              if(data){
                this.initPageData(false)
              }
            }
          })
        }else if(item.unitOrPerson=='1'){
          this.$dialog.OpenWindow({
            width: '1050',
            height: '810',
            title: '单位信息',
            url: '/unitView?id='+item.customerName,
            closeCallBack: (data)=>{
              if(data){
                this.initPageData(false)
              }
            }
          })
        }

      },
      incomeClick(){
        if(this.incomeType === '0'){
          this.incomeType = '1'
          this.type = ''
          this.typeList.value = ''
          $('#incomeContent').html('返回')
        }else{
          this.incomeType = '0'
          this.type = this.oldType
          this.typeList.value = this.oldType
          $('#incomeContent').html('全部维修收入')
        }
        this.pager.pageIndex = 1
        this.initPageData(false)
      },
      oldTotalClick(){
      },
      statisticalClick(){
        let screen = []
        let Year = ''
        let Month = ''
        if(this.dayCategory=='0'){
          let nowDate = new Date();
          let newYear = nowDate.getFullYear();
          let newMonth = nowDate.getMonth() + 1;
          Year = newYear
          Month = newMonth
          console.log(Year,Month  )
        }else{
          Year = this.endDate.slice(0,4)
          Month = this.endDate.slice(5,7)
          console.log(this.endDate.slice(0,4),this.endDate.slice(5,7), )
        }
        if(Month.toString().indexOf('-')!==-1){
          Month = this.endDate.slice(5,6)
        }
        if(this.screen.slice(5,8)=='13'){
          Month = '13'
        }
        screen.push({
          'Year':Year,
          'Month':Month,
          'type':this.typeList.value,
          'signState':this.signStateList.value,
          'bankID':this.bankList.value,
          'operatorID':this.operatorIDList.value,
          'unitID':this.insuranceUnitList.value,
          'vehicleBrand':this.vehicleBrandList.value,
          'unitOrPerson':this.unitOrPersonList.value
        })
        sessionStorage.cartogramScreen = JSON.stringify(screen)

        let url = ''

        let title = ''
        if(this.incomeType=='1'){//点击了全部维修
          url = '/allMaintenanceCartogram'
          title = '全部维修费用统计图'
        }else{
          url = '/insuranceCartogram?type='+this.type
          title = '保险理赔统计图'
        }
        this.$dialog.OpenWindow({
          width: '1300',
          height: '810',
          title: title,
          url: url,//'/insuranceCartogram?type='+this.type,
          closeCallBack: (data)=>{
            sessionStorage.removeItem('cartogramScreen')
          }
        })
      },
      profitAndLossClick(){
        // if(this.profitAndLoss === '0'){
        //   this.profitAndLoss = '1'
        //   this.oldTotalColor='#09B300'
        //   this.topBtnShou = true
        // }else{
        //   this.profitAndLoss = '0'
        //   this.oldTotalColor='#ff000c'
        //   this.topBtnShou = false
        // }
        if (this.oldTotalColor==='#ff000c'){
          this.oldTotalColor='#09B300'
        }else{
          this.oldTotalColor='#ff000c'
        }
        if (this.oldTotalColor1==='#ff000c'){
          this.oldTotalColor1='#09B300'
        }else{
          this.oldTotalColor1='#ff000c'
        }
      },
      unitClickLeft(item){//点击时查看公司信息
        if(item.otherAccountType === '0'){
          this.$dialog.OpenWindow({
            width: '1050',
            height: '750',
            url: '/unitView?id=' + item.otherID,
            title: '查看公司信息',
            closeCallBack: (data) => {
              if (data) {
                this.initPageData(false)
              }
            }
          })
        }else if(item.otherAccountType === '1'){
          this.$dialog.OpenWindow({
            width: '1050',
            height: '750',
            url: '/personView?id=' + item.otherID,
            title: '查看联系人信息',
            closeCallBack: (data) => {
              if (data) {
                this.initPageData(false)
              }
            }
          })
        }
      },

      operatorClickLeft(item){//查看联系人信息
        if(item.operatorID!==''){
          this.$dialog.OpenWindow({
            width: '1050',
            height: '750',
            url: '/personView?id=' + item.operatorID,
            title: '查看联系人信息',
            closeCallBack: (data) => {
              if (data) {
                this.initPageData(false)
              }
            }
          })
        }
      },
      rightClick(item){//点击右键菜单时获取当前点击的数据
        this.unitItme = item
      },
      menuClick(item,index){//返回用户选中的菜单选项及索引值
        if(item==='筛选当前公司'){
          this.unitMenu=['取消公司筛选']
          this.insuranceUnitList.value = this.unitItme.otherID
        }else if(item==='取消公司筛选'){
          this.unitMenu=['筛选当前公司']
          this.insuranceUnitList.value = ''
        }else if(item==='筛选当前联系人'){
          this.operatorMenu=['取消联系人筛选']
          this.operatorIDList.value = this.unitItme.operatorID//通过索引值获取素材中的code值 赋给筛选字段
        }else if(item==='取消联系人筛选'){
          this.operatorMenu=['筛选当前联系人']
          this.operatorIDList.value = ''//通过索引值获取素材中的code值 赋给筛选字段
        }else if(item==='筛选当前工单号'){
          this.jobNumberMenu=['取消工单号筛选']
          this.workOrderID = this.unitItme.workOrderID
        }else if(item==='取消工单号筛选'){
          this.jobNumberMenu=['筛选当前工单号']
          this.workOrderID = ''
        }else if(item==='筛选当前车辆品牌'){
          this.vehicleBrandMenu=['取消车辆品牌筛选']
          this.vehicleBrandList.value = this.unitItme.vehicleBrandID
        }else if(item==='取消车辆品牌筛选'){
          this.vehicleBrandMenu=['筛选当前车辆品牌']
          this.vehicleBrandList.value = ''
        }else if(item==='筛选当前银行'){
          this.bankIDMenu=['取消银行筛选']
          this.bankList.value = this.unitItme.bankID
        }else if(item==='取消银行筛选'){
          this.bankIDMenu=['筛选当前银行']
          this.bankList.value = ''
        }else if(item==='筛选当前客户'){
          this.customerMenu=['取消客户筛选']
          this.customerName = this.unitItme.customerName
        }else if(item==='取消客户筛选'){
          this.customerMenu=['筛选当前客户']
          this.customerName = ''
        }else if(item==='筛选当前车牌'){
          this.licensePlateMenu=['取消车牌筛选']
          this.licensePlateNumber = this.unitItme.licensePlateNumber
        }else if(item==='取消车牌筛选'){
          this.licensePlateMenu=['筛选当前车牌']
          this.licensePlateNumber = ''
        }else if(item==='转到保险理赔'){
          this.updateSubjectID(this.unitItme.ownerID,this.unitItme.subjectType,'BA723775-F394-43BD-A479-E612C65B8305','转到保险理赔')
          return
        }else if(item==='修改事由'){
          let name ='64'
          this.$dialog.OpenWindow({
            width: 950,
            height: 603,
            url: '/selectDic?name=' + name,
            title: '选择事由',
            closeCallBack: (data) => {
              if(data){
                this.$dialog.confirm({
                  width: 300,
                  tipValue: '确定修改收支明细事由?',
                  btnValueOk: '确定',
                  alertImg: 'warn',
                  okCallBack: () => {
                    this.updateSubjectID(this.unitItme.ownerID,this.unitItme.subjectType,data.id)
                  }
                })
              }
            }
          })
          return
        }else if(item==='提示财务修改事由'){
          this.$dialog.confirm({
            width: 300,
            tipValue: '确定提示财务修改收支明细事由?',
            btnValueOk: '确定',
            alertImg: 'warn',
            okCallBack: () => {
              let params={
                id:this.unitItme.ownerID
              }
              this.ajaxJson({
                url: '/Fin/bankDetailAbnormalWX',
                data:params,
                call: (data)=>{
                  this.$dialog.alert({
                    tipValue: data.message,
                    closeCallBack: () => {
                      this.initPageData(false)
                    }
                  })
                }
              })
            }
          })
          return
        }
        this.pager.pageIndex = 1
        this.initPageData(false)
      },
      updateSubjectID(id,subjectType,subjectID,update){
        this.$dialog.confirm({
            width: 300,
            tipValue: '确定'+update+'?',
            btnValueOk: '确定',
            alertImg: 'warn',
            okCallBack: () => {
              let params={
                id:id,
                subjectType:subjectType,
                subjectID:subjectID,
              }
              this.ajaxJson({
                url: '/Fin/bankDetailUpdateSubject',
                data:params,
                call: (data)=>{
                  this.$dialog.alert({
                    tipValue: data.message,
                    closeCallBack: () => {
                      this.initPageData(false)
                    }
                  })
                }
              })
            }
        })
      },
      getMonthDay(year, month) {
        let days = new Date(year, month, 0).getDate()
        return days
      },
      totalClick(item,index){

        if(this.dayCategory==='0'){
          this.dayCategory='1'
          let nowDate = new Date();
          let newYear = nowDate.getFullYear();
          let newMonth = nowDate.getMonth() + 1;
          let newDate = nowDate.getDate()-1;
          this.startDate = newYear + '-' +newMonth + '-' + newDate + ' 00:00:00'
          this.endDate = newYear + '-' +newMonth + '-' + newDate + ' 23:59:59'
          this.pager.pageIndex = 1
          this.initPageData(false)
        }else if(this.dayCategory==='2'){
          this.dayCategory='3'
          if(index==='2'&&this.oldTotal=='比前一天(环比)'){
            let year = ''
            let month = ''
            let day = ''
            let endDate = ''//结束日期
            let startDate = ''//开始日期
            if(this.selectMonth.slice(7,9)==1){//天数是第一天时 向月份减一
              if(month = this.selectMonth.slice(5,6)==1){//月份是第一月时 向年份减一
                year = this.selectMonth.slice(0,4)-1//年份减一
                month = 12
              }else{
                month = this.selectMonth.slice(5,6)-1
                year = this.selectMonth.slice(0,4)
              }
              day = this.getMonthDay(year,month)
            }else{
              year = this.selectMonth.slice(0,4)
              month = this.selectMonth.slice(5,6)
              day = this.selectMonth.slice(7,9) - 1
            }
            startDate = year + '-' + month + '-' + day + ' 00:00:00'
            endDate = year + '-' + month + '-' + day + ' 23:59:59'
            this.startDate = startDate
            this.endDate = endDate
            this.pager.pageIndex = 1
            this.initPageData(false)
          }

          if(index==='2'&&this.oldTotal=='比前一月(环比)'){
            let a = ''
            let b = ''
            let endDate = ''
            let startDate = ''
            if(this.yearMonth.indexOf('13')===-1){
              if(this.yearMonth.slice(5,this.yearMonth.length)=='1'){
                a =  12
                b = this.yearMonth.slice(0,4)-1 + '-' + a
                startDate = this.yearMonth.slice(0,4)-1 + '-' + a + '-' + '01'
                endDate = this.yearMonth.slice(0,4)-1 + '-' + a + '-' + this.getMonthDay(this.yearMonth.slice(0,4)-1,a)
              }else{
                a =  this.yearMonth.slice(5,this.yearMonth.length)-1
                b = this.yearMonth.slice(0,4) + '-' + a
                startDate = this.yearMonth.slice(0,4) + '-' + a + '-' + '01'
                endDate = this.yearMonth.slice(0,4) + '-' + a + '-' + this.getMonthDay(this.yearMonth.slice(0,4),a)
              }
              this.startDate = startDate + ' ' + '00:00:00'
              this.endDate = endDate + ' ' + '23:59:59'
              this.pager.pageIndex = 1
              this.initPageData(false)
            }
          }
          if(index==='2'&&this.oldTotal=='比前一年(环比)'){
            if(this.yearMonth.indexOf('13')!==-1){
              let month = this.yearMonth.slice(0,4)-1
              const f = month + '-01-01 ' + ' 00:00:00'
              const l = month + '-12-31 ' + ' 23:59:59'
              this.startDate = f
              this.endDate = l
              this.pager.pageIndex = 1
              this.initPageData(false)
            }
          }
        }else{
          if(this.dayCategory === '1'){
            this.dayCategory='0'
            this.pager.pageIndex = 1
            this.initPageData(true)
          }else if(this.dayCategory === '3'){
            this.dayCategory='2'
            this.pager.pageIndex = 1
            this.initPageData(false)
          }
        }
      },
      initChoose(obj){
        if(this.dayCategory === '1'||this.dayCategory === '0'){
          this.dayCategory='0'
        }else if(this.dayCategory === '3'||this.dayCategory === '2'){
          this.dayCategory='2'
        }
        if(obj === 'type'){
          this.type=this.typeList.value
          $('#incomeContent').html('全部维修收入')
          this.incomeType = '0'
        }
        this.pager.pageIndex = 1
        this.selectValue = []
        this.initPageData(false)
      },
      initChooseTime(item){
        this.selectMonth = item.endDate
        this.dayCategory='2'
        this.radioTime = item;
        this.startDate = this.radioTime.startDate ? this.radioTime.startDate : newRadioTime.startDate;
        this.endDate = this.radioTime.endDate ? this.radioTime.endDate : newRadioTime.endDate;
        if((item.startDate.split("-")[1]<item.endDate.split("-")[1])||(item.startDate.split("-")[1]==12&&item.endDate.split("-")[1]==1)){
          this.oldTotal='比前一月(环比)'
          this.nowTotal='本月'
          this.isYearMoneyShow=true
        }else{
          this.oldTotal='比前一天(环比)'
          this.nowTotal='本日'
          this.isYearMoneyShow=true
        }
        this.pager.pageIndex = 1
        this.initPageData(false)
      },
      selectMonthEvent(data,item){
        this.screen = data

        this.dayCategory='2'
        this.selectMonth = item.endDate

        this.yearMonth = data;
        this.radioTime = item;
        this.startDate = this.radioTime.startDate ? this.radioTime.startDate : newRadioTime.startDate;
        this.endDate = this.radioTime.endDate ? this.radioTime.endDate : newRadioTime.endDate;
        if(data.split("-")[1]==='13'){
          this.oldTotal='比前一年(环比)'
          this.nowTotal='本年'
          this.isYearMoneyShow=false
        }else if(data.split("-")[1]>0&&data.split("-")[1]<13){
          this.oldTotal='比前一月(环比)'
          this.nowTotal='本月'
          this.isYearMoneyShow=true
        }
        if(this.yearMoney==0){
          this.yearMoneyShow = false
        }else{
          this.yearMoneyShow = true
        }
        if(this.radioTime){
          this.pager.pageIndex = 1
          this.initPageData(false)
        }
      },
      //选中汇总
      selectedSum(){
        let params={
          selectValue:this.selectValue
        };
        this.selectList=[];
        for (let i = 0; i < this.content.length; i++) {
          for (let k = 0; k < this.selectValue.length; k++) {
            if(this.content[i].id===this.selectValue[k]){
              this.selectList.push(this.content[i]);
            }
          }
        }
        this.ajaxJson({
          url: '/Fin/commonSelectedsave',
          data:params,
          call:(data) =>{
            if(data.type===0){
              this.ajaxJson({
                url: '/Fin/bankDetailInsuranceDataTotal',
                data:params,
                call:(information) =>{
                  this.contentTotal = information
                }
              })
            }
          }
        })
      },
      // viewTheStatistics(){
      //   this.$dialog.OpenWindow({
      //     width: '1300',
      //     height: '650',
      //     title: '查看统计图',
      //     url: '/cartogram',
      //     closeCallBack: (dataTwo)=>{
      //
      //     }
      //   })
      // },
      //打开选中信息
      selectedList(){
        let params={
          selectValue:this.selectValue
        }
        this.ajaxJson({
          url: '/Fin/commonSelectedsave',
          data:params,
          call:(data) =>{
            if(data.type===0){
              this.$dialog.OpenWindow({
                width: '1050',
                height: '620',
                title: '查看选中信息',
                url: '/claimsForm?id='+data.val,
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
        let url = ''
        // if(item.workOrderID){//原需求如工单号为空 跳到form维护页 不为空跳view
        //   url = '/claimsView?id=' + item.id
        // }else{
        url = '/claimsForm?id=' + item.id
        // }
        this.$dialog.OpenWindow({
          width: '1050',
          height: '750',
          url: url,
          title: '维护自费维修',
          closeCallBack: (data) => {
            if (data) {
              this.lastData = data
              this.initPageData(false)
            }
          }
        })
      },
      // add(){
      //   this.$dialog.OpenWindow({
      //     width: '1050',
      //     height: '750',
      //     url: '/claimsForm',
      //     title: '添加保险理赔',
      //     closeCallBack: (data) => {
      //       if (data) {
      //         this.lastData = data
      //         this.initPageData(false)
      //       }
      //     }
      //   })
      // },
      initPageData (initValue) {
        let newRadioTime = this.radioTime
        let params = {};

        if (initValue) {
          if(this.dayCategory==='0') {
            let nowDate = new Date();
            let newYear = nowDate.getFullYear();
            let newMonth = nowDate.getMonth() + 1;
            let newDate = nowDate.getDate();
            let newHours = nowDate.getHours();
            let newMin = nowDate.getMinutes();
            let newSec = nowDate.getSeconds();
            let lastDate = newDate - 1;

            this.startDate = newYear + '-' + newMonth + '-' + lastDate + ' ' + '23:59:59';
            this.endDate = newYear + '-' + newMonth + '-' + newDate + ' ' + newHours + ':' + newMin + ':' + newSec;
            params = {
              startDate: this.startDate,
              endDate: this.endDate,
              type:this.type,
            }
          }
        } else {
          if(this.dayCategory==='2' || this.dayCategory==='0'){
            params = {
              bankID: this.bankList.value,
              unitID: this.insuranceUnitList.value,
              dateType:this.dateTypeList.value,
              vehicleBrand:this.vehicleBrandList.value,
              operatorID:this.operatorIDList.value,
              workOrderID:this.workOrderID,
              // startDate: this.radioTime.startDate ? this.radioTime.startDate : newRadioTime.startDate,
              // endDate: this.radioTime.endDate ? this.radioTime.endDate : newRadioTime.endDate,
              startDate: this.startDate,
              endDate: this.endDate,
              signState : this.signStateList.value,
              type:this.type,
              unitOrPersonList:this.unitOrPersonList.value,
              customerName:this.customerName,
              licensePlateNumber:this.licensePlateNumber,
              openInvoiceType:this.openInvoiceTypeList.value,
              subjectID:this.subjectIDList.value
            }
          }else if(this.dayCategory==='3'){
            params = {
              bankID: this.bankList.value,
              unitID: this.insuranceUnitList.value,
              dateType:this.dateTypeList.value,
              vehicleBrand:this.vehicleBrandList.value,
              operatorID:this.operatorIDList.value,
              // startDate: this.radioTime.startDate,
              // endDate: this.radioTime.endDate,
              workOrderID:this.workOrderID,
              startDate: this.startDate,
              endDate: this.endDate,
              signState : this.signStateList.value,
              type:this.type,
              unitOrPersonList:this.unitOrPersonList.value,
              customerName:this.customerName,
              licensePlateNumber:this.licensePlateNumber,
              openInvoiceType:this.openInvoiceTypeList.value,
              subjectID:this.subjectIDList.value
            }
          }else if(this.dayCategory === '1'){
            params = {
              startDate: this.startDate,
              endDate: this.endDate,
              type:this.type,
              unitOrPersonList:this.unitOrPersonList.value,
              customerName:this.customerName,
              licensePlateNumber:this.licensePlateNumber,
              openInvoiceType:this.openInvoiceTypeList.value,
              subjectID:this.subjectIDList.value
            }
          }
        }
        this.init({
          initValue: initValue,
          url: '/Fin/getBankDetailInsuranceData',
          data: params,
          all: (data) => {
            //不管是不是初始化都需要执行的代码
            this.content = data.content
            this.contentTotal = data.total
            this.insuranceUnitList = data.insuranceUnit
            this.bankList = data.bankList
            this.operatorIDList = data.operatorList
            this.vehicleBrandList = data.vehicleBrandList
            this.subjectIDList = data.subjectIDList

            if(data.total[0].oldMoney>=0){
              this.oldTotalColor= '#ff000c'
              this.oldMoney=data.total[0].oldMoney
              this.oldMoneySymbol='+'
            }else{
              this.oldMoney=data.total[0].oldMoney
              this.oldMoneySymbol=''
              this.oldTotalColor= '#09B300'
            }
            if(data.total[0].yearMoney>=0){
              this.oldTotalColor1= '#ff000c'
              this.yearMoney=data.total[0].yearMoney
              this.yearMoneySymbol='+'
            }else{
              this.yearMoney=data.total[0].yearMoney
              this.yearMoneySymbol=''
              this.oldTotalColor1= '#09B300'
            }
          },
          init: (data) => {
            this.insuranceUnitList = data.insuranceUnit
            this.bankList = data.bankList
            this.operatorIDList = data.operatorList
            this.contentTotal = data.total
            this.openInvoiceTypeList = data.openInvoiceMoneyList
            //初始化时需要执行的代码
          }
        })
      },
    },
    created () {
      let month = new Date().getMonth() + 1;
      this.yearMonth = new Date().getFullYear()+ '-' + month
      this.setQuery2Value('isClaims');
      if(this.isClaims === '0'){
        this.isPersonalClaims = false;
        this.isCategory = '0'
        this.unitMenu=['筛选当前公司','转到保险理赔','提示财务修改事由']
      }
    },
    watch: {
      month:{
        handler(newValue, oldValue) {
          this.month = newValue
        },
      }
    }
  }
</script>

<style lang="less" scoped>
  .statistical{
    position: relative;
    top: 0;
    right: 0;
  }
  /* 复制提示内容 */
  .copyTip {
    position: fixed;
    top: 90px;
    z-index: 9999;
    background-color: #fff;
    color: black;
    padding: 16px;
    left: 0;
    right: 0;
    margin: auto;
    width: max-content;
    border-radius: 4px;
    font-size: 14px;
  }
</style>
