<template>
  <div>
<!--    <yhm-managerpage category="1" >-->
      <yhm-managerpage category="1" @statisticalClick="statisticalClick" :statisticalShow="true">

      <!--导航条-->
      <template #navigationTab>
        <router-link class="menuTabDiv menuTabActive" :to="{path:'/home/policy/policyManager'}">保单管理</router-link>
        <router-link class="menuTabDiv" :to="{path:'/home/accountsReceivable/accountsReceivableManager'}">应收账款</router-link>
        <router-link class="menuTabDiv" :to="{path:'/home/customerRebates/customerRebatesManager'}">客户直接优惠/返利</router-link>
        <router-link class="menuTabDiv" :to="{path:'/home/paymentInsurance/payInsuranceFeeManager'}">付保险费</router-link>
        <router-link class="menuTabDiv" :to="{path:'/home/receiveInsurance/receiveInsuranceManager'}">收保险费</router-link>
        <router-link class="menuTabDiv" :to="{path:'/home/insuranceInvoice/insuranceInvoiceManager'}">保险开票</router-link>
      </template>
      <!--操作区-->
      <template #operate>
        <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initPageData(false)"></yhm-managersearch>
        <yhm-radiofilter :before="insuredUnitBefore" @initData="initChoose('insuredUnit')" title=" 保险公司" :content="listInsuredUnit"></yhm-radiofilter>
        <yhm-commonbutton value="打开选中信息" icon="i-selectAll" @call="selectedList" :show="isSelected" category="three"></yhm-commonbutton>
        <yhm-radiofilter :before="insuredUnitBefore" @initData="initChoose('salsesman')" title="业务员" :content="listSalsesman"></yhm-radiofilter>
      </template>
      <template #operateMore>
        <yhm-radiofilter :before="insuredUnitBefore" @initData="initChoose('accountsReceivableDate')" title="时间" :content="listAccountsReceivableDate"></yhm-radiofilter>
        <yhm-radiofilter :before="insuredUnitBefore" @initData="initChoose('billingMakeUp')" title="类型" :content="listBillingMakeUp"></yhm-radiofilter>
        <div :class="{customTimeShow:timeShow,customTimeHide:!timeShow}" >
          <yhm-form-date v-show="dateShow" title="开始时间" @call="dateSelection(startDate,endDate)" style="width: 350px;" :value="startDate" id="startDate" position="t"></yhm-form-date>
          <yhm-form-date v-show="dateShow" title="结束时间" @call="dateSelection(startDate,endDate)" style="width: 350px;margin-left: 30px;" :value="endDate" id="endDate" position="t"></yhm-form-date>
        </div>
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
        <yhm-managerth style="width: 80px;"  title="业务员" value="salsesman"></yhm-managerth>
        <yhm-managerth style="width: 110px;" title="投保日期" value="insuredDate"></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="车牌号" value="plate"></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="联系人" value="contactName"></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="被保险人" value="beinsuredName"></yhm-managerth>
        <yhm-managerth style="width: 90px;" title="保险公司" value="insuredUnit"></yhm-managerth>
        <yhm-managerth style="width: 90px;" title="投保类型"></yhm-managerth>
        <yhm-managerth title="优惠券金额" ></yhm-managerth>
        <yhm-managerth @call="actualEvent" v-if="isActual" style="width: 100px ;" title="预计盈亏" subtitle="(可点击)"></yhm-managerth>
        <yhm-managerth @call="realEvent" v-if="isReal" style="width: 100px; " title="实时盈亏" subtitle="(可点击)"></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="保费合计" subtitle="(优惠前)" value="premiumsTotal"></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="实收金额"  subtitle="(优惠后)" value="receivedMoney"></yhm-managerth>
        <yhm-managerth title="发票" subtitle="客户抬头" ></yhm-managerth>
        <yhm-managerth title="发票" subtitle="公司抬头" ></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="保单号" value="numbering"></yhm-managerth>
        <yhm-managerth style="width: 120px;" title="发票状态" ></yhm-managerth>
        <yhm-managerth style="width: 80px;" title="操作" ></yhm-managerth>
      </template>

      <!--数据明细-->
      <template #listBody>
        <tr :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0},{listDelLine: item.boNumbering === '作废' ||item.surrender === '2'}]" v-for="(item,index) in content" :key="index">
          <yhm-manager-td-checkbox :value="item"></yhm-manager-td-checkbox>
          <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>
          <yhm-manager-td-center :value="item.salsesman" ></yhm-manager-td-center>
          <yhm-manager-td-date :value="item.insuredDate"></yhm-manager-td-date>
          <yhm-manager-td vehicle-text-align="left" type="vehicle" @click="plateView(item)"  :value="item.plate"></yhm-manager-td>
          <yhm-manager-td @click="contactView(item)" :value="item.contactName"></yhm-manager-td>
          <yhm-manager-td @click="beinsuredView(item)" :tip="item.notEqual==='0'?false:true" :tip-show="true" tip-value="被保险人与车主不一致" :value="item.beinsuredName" >
            <span v-if="item.notEqual==='0'?false:true" style=" color: #0b7cca;font-size: 18px;" class="uniE9A8 managerIcon"></span>
          </yhm-manager-td>
          <yhm-manager-td-psd :list="insuredUnitList" :value="item.insuredUnit"></yhm-manager-td-psd>
          <yhm-manager-td-center :value="item.insuredTypeVal"></yhm-manager-td-center>
          <yhm-manager-td-money v-if="item.couponMoney!=0" style="color: #FF0000" :value="item.couponMoney"></yhm-manager-td-money>
          <yhm-manager-td-money v-else :value="item.couponMoney"></yhm-manager-td-money>

          <yhm-manager-td-money v-if="isActual" @click="listExpectedView(item)" :value="item.actualProfitLoss" :style="{'color':item.actualProfitLoss>=0?'#2c9208':'#f00'}" style=" font-weight:bold;"></yhm-manager-td-money>
          <yhm-manager-td-money v-if="isReal"  @click="listExpectedView(item)" :value="item.realTimeProfitLoss" :style="{'color':item.realTimeProfitLoss>=0?'#2c9208':'#f00'}" style=" font-weight:bold;"></yhm-manager-td-money>

          <yhm-manager-td-money :value="item.premiumsTotal"></yhm-manager-td-money>
          <yhm-manager-td-money :value="item.receivedMoney" style="color: #0909F7" ></yhm-manager-td-money>


          <yhm-manager-td-center value="-----" @click="invoiceTdClick(item.privateUrl,item.publicUrl,item)" v-if="item.privateUrl==''||item.privateUrl==undefined"></yhm-manager-td-center>
          <yhm-manager-td-image :tip="true" v-else left="-340" width="900" height="550" :value="item.privateUrl===''?'------':item.privateUrl" tag="ElectronicInvoice"></yhm-manager-td-image>

          <yhm-manager-td-center value="-----" @click="invoiceTdClick(item.privateUrl,item.publicUrl,item)" v-if="item.publicUrl==''||item.publicUrl==undefined"></yhm-manager-td-center>
          <yhm-manager-td-image :tip="true" v-else left="-340" width="900" height="550" :value="item.publicUrl===''?'------':item.publicUrl" tag="ElectronicInvoice"></yhm-manager-td-image>

          <yhm-manager-td-operate>
            <yhm-manager-td-operate-button v-show="item.boNumbering === ''?true:false" @click="addPNumbering(item)" icon="i-export" value="上传保单"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button v-show="item.boNumbering !=''?true:false"  @click="addPNumbering(item)" :no-click="item.boNumbering === '作废'?true:false" icon="i-invoiceView" value="查看保单" color="#fd6802"></yhm-manager-td-operate-button>
          </yhm-manager-td-operate>
          <yhm-manager-td-state @click="invoiceEnvent(item)" :value="item.statusVal" :state-color="item.statusColor" :state-img="item.statusImg"></yhm-manager-td-state>
          <yhm-manager-td-operate>
            <yhm-manager-td-operate-button @click="surrenderClick(item)" style="color: #0D64A0"  v-if="item.surrender==0" icon="i-surrender" value="退保"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button  style="color: #0D64A0"  v-if="item.surrender==1" icon="i-surrender" value="退保收款中"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button style="color: #FF0000"  v-if="item.surrender==2"  icon="i-surrender" value="已退保"></yhm-manager-td-operate-button>
          </yhm-manager-td-operate>
        </tr>
      </template>

      <!--数据空提示-->
      <template #empty >
        <span class="m_listNoData" v-show="empty">暂时没有数据</span>
      </template>
      <template #total v-if="this.listAccountsReceivableDate.value==''||this.listAccountsReceivableDate.value==9?true:false">
        <div class="listTotalCrente m_list w620">
          <div class="listTotalLeft">
            <span class="test"></span>
            <span class="test">金额</span>
            <span class="test">条数</span>
          </div>
          <table width="100%" cellpadding="0" cellspacing="0" class="m_content_table m_content_total_table">
            <thead>
            <tr>
              <yhm-managerth style="width: 100px;" before-color="#49a9ea" title="" before-title="优惠券金额" ></yhm-managerth>
              <yhm-managerth v-if="isActual" style="width: 100px;" before-color="#49a9ea" title="" before-title="预计盈亏总额"></yhm-managerth>
              <yhm-managerth v-if="isReal" style="width: 100px;" before-color="#49a9ea" title="" before-title="实时盈亏总额"></yhm-managerth>
              <yhm-managerth style="width: 100px;" before-color="#49a9ea" title="" before-title="保费合计(优惠前)" ></yhm-managerth>
              <yhm-managerth style="width: 100px;" before-color="#49a9ea" title="" before-title="实收金额(优惠后)" ></yhm-managerth>
<!--              <yhm-managerth  style="width: 100px;" width="100px" title="" :before-title="oldTotal"></yhm-managerth>-->
           </tr>
            </thead>
            <tbody>
            <tr>
              <yhm-manager-td-money  style="color: #FF0000" :value="contentTotal[0].money"  ></yhm-manager-td-money>
              <yhm-manager-td-money v-if="isActual"  :value="contentTotal[1].money"  :style="{'color':contentTotal[0].money>=0?'#2c9208':'#f00'}"></yhm-manager-td-money>
              <yhm-manager-td-money v-if="isReal" :value="contentTotal[2].money"  :style="{'color':contentTotal[1].money>=0?'#2c9208':'#f00'}"></yhm-manager-td-money>
              <yhm-manager-td-money  :value="contentTotal[3].money"  ></yhm-manager-td-money>
              <yhm-manager-td-money  :value="contentTotal[4].money" style="color: #0909F7"></yhm-manager-td-money>
<!--              <yhm-manager-td-money    :value="oldMoney"></yhm-manager-td-money>-->
            </tr>
            <tr>
              <yhm-manager-td-rgt  style="color: #FF0000" :value="contentTotal[0].count"></yhm-manager-td-rgt>
              <yhm-manager-td-rgt v-if="isActual" :value="contentTotal[1].count" :style="{'color':contentTotal[0].money>=0?'#2c9208':'#f00'}"></yhm-manager-td-rgt>
              <yhm-manager-td-rgt v-if="isReal" :value="contentTotal[2].count" :style="{'color':contentTotal[1].money>=0?'#2c9208':'#f00'}"></yhm-manager-td-rgt>
              <yhm-manager-td-rgt  :value="contentTotal[3].count"></yhm-manager-td-rgt>
              <yhm-manager-td-rgt  :value="contentTotal[4].count"  style="color: #0909F7"></yhm-manager-td-rgt>
<!--              <yhm-manager-td-rgt  :value="oldMoney"></yhm-manager-td-rgt>-->
            </tr>
            </tbody>
          </table>
        </div>

      </template>

      <template #total v-else>
        <div class="listTotalCrente m_list w620">
          <div class="listTotalLeft">
            <span class="test"></span>
            <span class="test">金额</span>
            <span class="test">条数</span>
          </div>
          <table width="100%" cellpadding="0" cellspacing="0" class="m_content_table m_content_total_table">
            <thead>
            <tr>
              <yhm-managerth style="width: 100px;" before-color="#49a9ea" title="" before-title="优惠券金额" ></yhm-managerth>
              <yhm-managerth v-if="isActual" style="width: 100px;" before-color="#49a9ea" title="" before-title="预计盈亏总额"></yhm-managerth>
              <yhm-managerth v-if="isReal" style="width: 100px;" before-color="#49a9ea" title="" before-title="实时盈亏总额"></yhm-managerth>
              <yhm-managerth style="width: 100px;" before-color="#49a9ea" title="" before-title="保费合计(优惠前)" ></yhm-managerth>
              <yhm-managerth style="width: 100px;" before-color="#49a9ea" title="" before-title="实收金额(优惠后)" ></yhm-managerth>
              <yhm-managerth style="width: 100px;" before-color="#49a9ea" title="" :before-title="'比'+comparisonTitleList[listAccountsReceivableDate.value]+'(环比)'" ></yhm-managerth>
              <yhm-managerth style="width: 100px;" before-color="#49a9ea" title="" before-title="同比" ></yhm-managerth>
              <!--              <yhm-managerth  style="width: 100px;" width="100px" title="" :before-title="oldTotal"></yhm-managerth>-->
            </tr>
            </thead>
            <tbody>
            <tr>
              <yhm-manager-td-money  style="color: #FF0000" :value="contentTotal[0].money"  ></yhm-manager-td-money>
              <yhm-manager-td-money v-if="isActual"  :value="contentTotal[1].money"  :style="{'color':contentTotal[0].money>=0?'#2c9208':'#f00'}"></yhm-manager-td-money>
              <yhm-manager-td-money v-if="isReal" :value="contentTotal[2].money"  :style="{'color':contentTotal[1].money>=0?'#2c9208':'#f00'}"></yhm-manager-td-money>
              <yhm-manager-td-money  :value="contentTotal[3].money"  ></yhm-manager-td-money>
              <yhm-manager-td-money  :value="contentTotal[4].money" style="color: #0909F7"></yhm-manager-td-money>
              <yhm-manager-td-money  :value="contentTotal[5].money>0?'+'+contentTotal[4].money:contentTotal[4].money "  :style="{'color':contentTotal[4].money>=0?'#0909F7':'#f00'}"></yhm-manager-td-money>
              <yhm-manager-td-money  :value="contentTotal[6].money>0?'+'+contentTotal[5].money:contentTotal[5].money" :style="{'color':contentTotal[5].money>=0?'#0909F7':'#f00'}"></yhm-manager-td-money>
              <!--              <yhm-manager-td-money    :value="oldMoney"></yhm-manager-td-money>-->
            </tr>
            <tr>
              <yhm-manager-td-rgt  style="color: #FF0000" :value="contentTotal[0].count"></yhm-manager-td-rgt>
              <yhm-manager-td-rgt v-if="isActual" :value="contentTotal[1].count" :style="{'color':contentTotal[0].money>=0?'#0909F7':'#f00'}"></yhm-manager-td-rgt>
              <yhm-manager-td-rgt v-if="isReal" :value="contentTotal[2].count" :style="{'color':contentTotal[1].money>=0?'#0909F7':'#f00'}"></yhm-manager-td-rgt>
              <yhm-manager-td-rgt  :value="contentTotal[3].count"></yhm-manager-td-rgt>
              <yhm-manager-td-rgt  :value="contentTotal[4].count" style="color: #0909F7"></yhm-manager-td-rgt>
              <yhm-manager-td-rgt  :value="contentTotal[5].count" :style="{'color':contentTotal[4].money>=0?'#0909F7':'#f00'}"></yhm-manager-td-rgt>
              <yhm-manager-td-rgt  :value="contentTotal[6].count" :style="{'color':contentTotal[5].money>=0?'#0909F7':'#f00'}"></yhm-manager-td-rgt>
              <!--              <yhm-manager-td-rgt  :value="oldMoney"></yhm-manager-td-rgt>-->
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
        // oldTotal: '比前一天(环比)',

        // oldMoney: '',
        statusVal:'',
        numbering:'',
        // salsesmanIDMenu:['筛选当前业务员'],

        salesmanID:'',

        insuredUnitBefore:'0',// 默认选择状态为可以选择，1为不可以选择
        listInsuredUnit:{
          value: '', //默认为空
          list: []
        },
        listSalsesman:{
          value: '', //默认为空
          list: []
        },
        salsesmanList:[],
        listAccountsReceivableDate:{
          value: '0', //默认为空
          list: []
        },
        listBillingMakeUp:{
          value: '', //默认为空
          list: []
        },
        insuredUnitList:[],
        comparisonTitleList:['前一天','前一周','上上周','前一月','上上月','上季度','上上季度','上一年','上上年','',''],
        isActual: true,
        isReal: false,
        contentTotal: [
          {
            money:'',
            count:''
          },
          {
            money:'',
            count:''
          },
          {
            money:'',
            count:''
          },
          {
            money:'',
            count:''
          },
          {
            money:'',
            count:''
          },
          {
            money:'',
            count:''
          },
        ],
        unitItme:{},
        boNumbering:'',
        timeShow:false,//自定义时间选择 显示隐藏
        dateShow:false,//时间组件 显示隐藏
        startDate:'',
        endDate:'',
        start:' 00:00:00',//开始时的时分秒
        finish:' 23:59:59',//结束时的时分秒
        money:'',
      }
    },
    methods:{
      surrenderClick(item){
        this.$dialog.OpenWindow({
          width: 600,
          height: 230,
          url: '/surrenderView?id=' + item.id,
          title: '请输入客户退保需要退回的金额',
          closeCallBack: (data)=>{
            if(data){
              this.initPageData(false)
            }
          }
        })
      },
      invoiceTdClick(value,value2,item){

        if(value==''&&value2==''){
          this.invoiceEnvent(item)
        }
      },
      invoiceEnvent(item){
        if(item.statusVal=='待上传发票'){
          let title = '上传发票'
          let url = '/paymentInvoice?ownerID=' + item.detailsID + '&track=-1'+ '&money=' + item.invoiceMoney
          this.$dialog.OpenWindow({
            width: '1050',
            height: '750',
            url: url,
            title: title,
            closeCallBack: (data) => {
              if (data) {
                this.initPageData(false)
              }
            }
          })
        }else if(item.statusVal=='待提交'){
          let title = '查看发票'
          let url = '/paymentInvoice?ownerID=' + item.detailsID + '&track=0'+ '&money=' + item.invoiceMoney
          this.$dialog.OpenWindow({
            width: '1050',
            height: '750',
            url: url,
            title: title,
            closeCallBack: (data) => {
              if (data) {
                this.initPageData(false)
              }
            }
          })
        }
      },
      dateSelection(start,finish){//选择时间段
        if(start!=''&&finish!=''){
          this.initPageData()

        }
      },
      skipEvent(url,title){//跳转
        this.$dialog.OpenWindow({
          width: '1250',
          height: '780',
          url:url,
          title: title,
          closeCallBack: (data)=>{
            if(data){
              this.initPageData(false)
            }
          }
        })
      },
      statisticalClick(){
        let url = ''
        let title = ''
        // if(this.insuredUnit==''&&this.salesmanID==''){
        //   this.$dialog.confirm({
        //       width:'350',
        //       tipValue: '请选择要打开的统计图类型?',
        //       btnValueOk:'保险公司',
        //       btnValueCancel:'业务员',
        //       okCallBack: (data) => {
        //         url = '/exercise?id=1&state=1'
        //         title = '保单管理保险公司统计图'
        //         this.skipEvent(url,title)
        //       },
        //       cancelCallBack:(data) =>{
                url = '/exercise?id=1&state=0'
                title = '波士顿矩阵BCG Matrix'
                this.skipEvent(url,title)
          //     }
          // })
        // }
      },
      // rightClick(item){//点击右键菜单时获取当前点击的数据
      //   this.unitItme = item
      // },
      // menuClick(item,index) {//返回用户选中的菜单选项及索引值
      //   if(item==='筛选当前业务员'){
      //     this.salsesmanIDMenu=['取消业务员筛选']
      //     this.salsesmanID = this.unitItme.salsesmanID
      //   }else if(item==='取消业务员筛选'){
      //     this.salsesmanIDMenu=['筛选当前业务员']
      //     this.salsesmanID = ''
      //   }
      //   this.initPageData(false)
      // },
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
          height: '550',
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
        this.pager.pageIndex = 1
        if (op === 'insuredUnit') {
          this.selectValue = []
        }
        if (op === 'salsesman') {
          this.selectValue = []
        }if (op === 'billingMakeUp') {
          this.selectValue = []
        }
        if (this.listAccountsReceivableDate.value==9){
          this.timeShow = true
          setTimeout(()=>{
            this.dateShow = true
          },300)
          return
        }else{
          if (op === 'accountsReceivableDate') {
            this.timeShow = false
            setTimeout(()=>{
              this.dateShow = false
            },300)
            this.selectValue = []
          }
        }
        // this.initPageData(false)
      },
      //搜索
      initPageData (initValue) {
        let params = {}

        if (initValue) {
          params = {
            salsesmanID:this.listSalsesman.value,
            insuredUnit:this.listInsuredUnit.value,
            accountsReceivableDate:this.listAccountsReceivableDate.value,
            billingMakeUp:this.listBillingMakeUp.value,
            startDate:this.startDate+this.start,
            endDate:this.endDate+this.finish

          }
        } else {
          params = {
            salsesmanID:this.listSalsesman.value,
            insuredUnit:this.listInsuredUnit.value,
            accountsReceivableDate:this.listAccountsReceivableDate.value,
            billingMakeUp:this.listBillingMakeUp.value,
            startDate:this.startDate+this.start,
            endDate:this.endDate+this.finish
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
            this.listSalsesman=data.salsesmanPsd
            this.listBillingMakeUp=data.billingMakeUpPsd

          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .managerIcon{
    position: absolute;
    right: 4px;
  }
  .customTimeShow{
    width: 100%;
    height: 50px;
    position: relative;
    z-index: 2;
    display: flex;

    /*overflow: hidden;*/
    transition: all 0.5s;
  }
  .customTimeHide{
    width: 100%;
    height: 0px;
    display: flex;
    /*overflow: hidden;*/
    transition: all 0.5s;
  }
</style>
