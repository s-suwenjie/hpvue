<template>
  <div>
    <yhm-managerpage category="1">
      <!--导航条-->
      <template #navigationTab>
        <router-link class="menuTabDiv menuTabActive" :to="{path:'/home/policy/policyManager'}">保单管理</router-link>
        <router-link class="menuTabDiv" :to="{path:'/home/accountsReceivable/accountsReceivableManager'}">应收账款</router-link>
        <router-link class="menuTabDiv " :to="{path:'/home/customerRebates/customerRebatesManager'}">客户直接优惠/返利</router-link>
        <router-link class="menuTabDiv" :to="{path:'/home/paymentInsurance/payInsuranceFeeManager'}">付保险费</router-link>
      </template>
      <!--操作区-->
      <template #operate>

        <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initPageData(false)"></yhm-managersearch>
        <yhm-radiofilter :before="insuredUnitBefore" @initData="initChoose('insuredUnit')" title=" 保险公司" :content="listInsuredUnit"></yhm-radiofilter>
        <yhm-commonbutton value="打开选中信息" icon="i-selectAll" @call="selectedList" :show="isSelected" category="three"></yhm-commonbutton>
      </template>
      <template #operateMore>
        <yhm-radiofilter :before="insuredUnitBefore" @initData="initChoose('accountsReceivableDate')" title="时间" :content="listAccountsReceivableDate"></yhm-radiofilter>
      </template>
      <!--筛选区-->
      <template #choose>
        <div v-show="choose" class="buttonBody mptZero">
          <yhm-radiofilter :before="insuredUnitBefore" @initData="initChoose('insuredUnit')" title=" 保险公司" :content="listInsuredUnit"></yhm-radiofilter>
        </div>
      </template>
      <!--数据表头-->
      <template #listHead>
        <yhm-managerth style="width: 40px;" title="选择"></yhm-managerth>
        <yhm-managerth style="width: 40px;" title="查看"></yhm-managerth>
        <yhm-managerth title="业务员" value="salsesman"></yhm-managerth>
        <yhm-managerth style="width: 120px;" title="投保日期" value="insuredDate"></yhm-managerth>
        <yhm-managerth style="width: 130px;" title="车牌号" value="plate"></yhm-managerth>
        <yhm-managerth style="width: 120px;" title="联系人" value="contactName"></yhm-managerth>
        <yhm-managerth   title="被保险人" value="beinsuredName"></yhm-managerth>

        <yhm-managerth style="width: 110px;" title="保险公司" value="insuredUnit"></yhm-managerth>
        <yhm-managerth style="width: 110px;" title="投保类型" value="insuredTypeVal"></yhm-managerth>

        <yhm-managerth @call="actualEvent" v-if="isActual" style="width: 120px ;" title="预计盈亏(可点击)"></yhm-managerth>
        <yhm-managerth @call="realEvent" v-if="isReal" style="width: 120px; " title="实时盈亏(可点击)"></yhm-managerth>

        <yhm-managerth style="width: 130px;" title="保费合计(优惠前)" value="premiumsTotal"></yhm-managerth>
        <yhm-managerth style="width: 130px;" title="实收金额(优惠后)" value="receivedMoney"></yhm-managerth>
        <yhm-managerth style="width: 150px;" title="申请编号" value="numbering"></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="状态" ></yhm-managerth>
        <yhm-managerth title="保单号" value="numbering"></yhm-managerth>
      </template>

      <!--数据明细-->
      <template #listBody>
        <tr :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]" v-for="(item,index) in content" :key="index">
          <yhm-manager-td-checkbox :value="item"></yhm-manager-td-checkbox>
          <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>
          <yhm-manager-td-center :value="item.salsesman" :menu-list="salsesmanIDMenu" @click="vehicleBrandLeft(item)" @rightClick="rightClick(item)" @menuClick="menuClick"></yhm-manager-td-center>
          <yhm-manager-td-date :value="item.insuredDate"></yhm-manager-td-date>
          <yhm-manager-td @click="plateView(item)"  :value="item.plate"></yhm-manager-td>
          <yhm-manager-td @click="contactView(item)" :value="item.contactName"></yhm-manager-td>
          <yhm-manager-td @click="beinsuredView(item)" :tip="item.notEqual==='0'?false:true" :tip-show="true" tip-value="被保险人与车主不一致" :value="item.beinsuredName" >
            <span v-if="item.notEqual==='0'?false:true" style=" color: #ffaa27;font-size: 18px;" class="uniE9A8 managerIcon"></span>
          </yhm-manager-td>
          <yhm-manager-td-psd :list="insuredUnitList" :value="item.insuredUnit"></yhm-manager-td-psd>
          <yhm-manager-td-center :value="item.insuredTypeVal"></yhm-manager-td-center>

          <yhm-manager-td-money v-if="isActual" @click="listExpectedView(item)" :value="item.actualProfitLoss" :style="{'color':item.actualProfitLoss>=0?'#2c9208':'#f00'}" style=" font-weight:bold;"></yhm-manager-td-money>
          <yhm-manager-td-money v-if="isReal"  @click="listExpectedView(item)" :value="item.realTimeProfitLoss" :style="{'color':item.realTimeProfitLoss>=0?'#2c9208':'#f00'}" style=" font-weight:bold;"></yhm-manager-td-money>

          <yhm-manager-td :value="item.premiumsTotal"></yhm-manager-td>
          <yhm-manager-td-money :value="item.receivedMoney" style="color: #0909F7" ></yhm-manager-td-money>
          <yhm-manager-td :value="item.numbering"></yhm-manager-td>
          <yhm-manager-td-state :value="item.statusVal" :state-color="item.statusColor" :state-img="item.statusImg"></yhm-manager-td-state>
          <yhm-manager-td-operate>
          <yhm-manager-td-operate-button v-show="item.boNumbering === ''?true:false" @click="addPNumbering(item)" icon="i-export" value="上传保单"></yhm-manager-td-operate-button>
          <yhm-manager-td-operate-button v-show="item.boNumbering !=''?true:false"  @click="addPNumbering(item)" icon="i-invoiceView" value="查看保单" color="#fd6802"></yhm-manager-td-operate-button>
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
              <yhm-managerth v-if="isActual" style="width: 100px;" before-color="#49a9ea" title="" before-title="预计盈亏总额"></yhm-managerth>
              <yhm-managerth v-if="isReal" style="width: 100px;" before-color="#49a9ea" title="" before-title="实时盈亏总额"></yhm-managerth>
              <yhm-managerth style="width: 100px;" before-color="#49a9ea" title="" before-title="保费合计(优惠前)" ></yhm-managerth>
              <yhm-managerth style="width: 100px;" before-color="#49a9ea" title="" before-title="实收金额(优惠后)" ></yhm-managerth>
              <yhm-managerth  style="width: 100px;" width="100px" title="" :before-title="oldTotal"></yhm-managerth>
           </tr>
            </thead>
            <tbody>
            <tr>
              <yhm-manager-td-money v-if="isActual"  :value="contentTotal[0].money"  :style="{'color':contentTotal[0].money>=0?'#2c9208':'#f00'}"></yhm-manager-td-money>
              <yhm-manager-td-money v-if="isReal" :value="contentTotal[1].money"  :style="{'color':contentTotal[1].money>=0?'#2c9208':'#f00'}"></yhm-manager-td-money>
              <yhm-manager-td-money  :value="contentTotal[2].money"  ></yhm-manager-td-money>
              <yhm-manager-td-money  :value="contentTotal[3].money" style="color: #0909F7"></yhm-manager-td-money>
              <yhm-manager-td-money    :value="oldMoney"></yhm-manager-td-money>
            </tr>
            <tr>
              <yhm-manager-td-rgt v-if="isActual" :value="contentTotal[0].count"></yhm-manager-td-rgt>
              <yhm-manager-td-rgt v-if="isReal" :value="contentTotal[1].count"></yhm-manager-td-rgt>
              <yhm-manager-td-rgt  :value="contentTotal[2].count"></yhm-manager-td-rgt>
              <yhm-manager-td-rgt  :value="contentTotal[3].count"></yhm-manager-td-rgt>
              <yhm-manager-td-rgt  :value="oldMoney"></yhm-manager-td-rgt>
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
    name: 'policyManager',
    mixins: [managermixin],
    data(){
      return{
        oldTotal: '比前一天(环比)',

        oldMoney: '',

        salsesmanIDMenu:['筛选当前业务员'],
        insuredUnitBefore:'0',// 默认选择状态为可以选择，1为不可以选择
        listInsuredUnit:{
          value: '', //默认为空
          list: []
        },
        listAccountsReceivableDate:{
          value: '0', //默认为空
          list: []
        },
        insuredUnitList:[],
        isActual: true,
        isReal: false,
        contentTotal: [],
        unitItme:{},
      }
    },
    methods:{
      rightClick(item){//点击右键菜单时获取当前点击的数据
        this.unitItme = item
      },
      menuClick(item,index) {//返回用户选中的菜单选项及索引值
        if(item==='筛选当前业务员'){
          this.salsesmanIDMenu=['取消业务员筛选']
          this.salsesmanID = this.unitItme.salsesmanID
        }else if(item==='取消业务员筛选'){
          this.salsesmanIDMenu=['筛选当前业务员']
          this.salsesmanID = ''
        }
        console.log(this.salsesmanID)
        this.initPageData(false)
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
      beinsuredView(item){
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
      listExpectedView(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '450',
          url: '/policyExpectedView?id=' + item.id,
          title: '查看盈亏明细',
          closeCallBack: (data)=>{
            if(data){
              this.initPageData(false)
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
          url: '/Fin/commonSelectedsave',
          data:params,
          call:(data) =>{
            if(data.type===0){
              this.$dialog.OpenWindow({
                width: '1050',
                height: '620',
                title: '查看选中信息',
                url: '/policyView?id='+data.val,
                closeCallBack: (dataTwo)  =>{
                  if(dataTwo){

                  }
                }
              })
            }
          }
        })
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
                selectValue: this.selectValue,
              }
              this.ajaxJson({
                url: '/Insurance/policyManagerTotal',
                data: paramsFinish,
                call:(information) =>{
                  this.contentTotal = information
                }
              })
            }
          }
        })
      },
      addPNumbering(item){
        let title = '查看保单信息'
        let url = '/poNumberView?id='+item.boNumbering+'&ownerID='+item.id

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
      actualEvent(){
        this.isActual = false
        this.isReal = true
      },
      realEvent(){
        this.isReal = false
        this.isActual = true
      },
      listView(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '700',
          url: '/policyView?id=' + item.id,
          title: '查看保单信息',
          closeCallBack: (data)=>{
            if(data){
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
        if (op === 'accountsReceivableDate') {
          this.selectValue = []
        }
        this.initPageData(false)
      },
      //搜索
      initPageData (initValue) {
        let params = {}

        if (initValue) {
          params = {
            salsesmanID:this.salsesmanID,
            insuredUnit:this.listInsuredUnit.value,
            accountsReceivableDate:this.listAccountsReceivableDate.value
          }
        } else {
          params = {
            salsesmanID:this.salsesmanID,
            insuredUnit:this.listInsuredUnit.value,
            accountsReceivableDate:this.listAccountsReceivableDate.value
          }
        }
        this.init({
          initValue:initValue,
          url: '/Insurance/getPoManager',
          data:params,
          all:(data) =>{
            //不管是不是初始化都需要执行的代码
            this.contentTotal = data.total
          },
          init:(data)=>{
            //初始化时需要执行的代码
            // 这边初始化筛选信息
            this.listInsuredUnit=data.insuredUnitPsd
            this.insuredUnitList=data.insuredUnitList
            this.listAccountsReceivableDate=data.accountsReceivableDatePsd

          }
        })
      }
    }
  }
</script>

<style scoped>
  .managerIcon{
    position: absolute;
    right: 4px;
  }
</style>
