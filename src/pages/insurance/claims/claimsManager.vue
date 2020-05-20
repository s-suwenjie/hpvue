<template>
    <div>
      <yhm-managerpage @statisticalClick="statisticalClick" :statisticalShow="true" :category="isCategory" :total-table="true" :totalWidth="true">
        <!--导航条-->
        <template #navigationTab v-if="isPersonalClaims">
          <a class="menuTabDiv" href="/Fin/bankDetailManager?menuType=0">收支明细</a>
          <router-link class="menuTabDiv menuTabActive" :to="{path:'/home/viewManager/claimsManager'}">保险理赔</router-link>
          <router-link class="menuTabDiv" :to="{path:'/home/BankDetailRepairManager'}">散户维修费</router-link>
          <router-link class="menuTabDiv" :to="{path:'/home/BankDetailCommissionManager'}">保险手续费</router-link>

        </template>
        <template #navigation v-if="!isPersonalClaims">个人办公&nbsp;&gt;&nbsp;个人办公&nbsp;&gt;&nbsp;保险理赔</template>
        <!--操作区-->
        <template #operate>
<!--          <yhm-commonbutton value="添加" icon="btnAdd" :flicker="true" @call="add()"></yhm-commonbutton>-->
          <yhm-commonbutton :value="choose?'收起筛选':'展开筛选'" :icon="choose?'btnUp':'btnDown'" @call="switchChoose()"></yhm-commonbutton>
          <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initData"></yhm-managersearch>
          <yhm-commonbutton value="打开选中信息" icon="i-selectAll" @call="selectedList" :show="isSelected" category="three"></yhm-commonbutton>
          <yhm-radiofilterdate title="时间" @initData="selectMonthEvent"></yhm-radiofilterdate>
          <yhm-radiofilterday title="日" :yearMonth="yearMonth" @initData="initChooseTime"></yhm-radiofilterday>

        </template>
        <template #buttonSwitch>
          <div class="buttonSwitch">
            <span :class="{loss:topBtnShou,profit:!topBtnShou}">表示盈利</span>
            <img src="/HtmlStatic/images/ColorSwop.png" @click="profitAndLossClick" v-show="!topBtnShou" alt="">
            <img src="/HtmlStatic/images/ColorSwopFilp.png" @click="profitAndLossClick" v-show="topBtnShou" alt="">
            <span :class="{loss:!topBtnShou,profit:topBtnShou}">表示亏损</span>
          </div>

        </template>
        <template #choose>
          <div v-show="choose" class="buttonBody mptZero">
            <yhm-radiofilter  @initData="initChoose('signState')" title="数据状态" :content="signStateList"></yhm-radiofilter>
            <yhm-radiofilter :before="bank" @initData="initChoose('bank')" title="银行"  :content="bankList"></yhm-radiofilter>
            <yhm-radiofilter :before="operatorID" @initData="initChoose('operatorID')" title="业务员"  :content="operatorIDList"></yhm-radiofilter>
            <yhm-radiofilter :before="insuranceUnit" @initData="initChoose('insuranceUnit')" title="保险公司"  :content="insuranceUnitList"></yhm-radiofilter>
            <!--<yhm-radiofilter :before="dateType" @initData="initChoose('dateType')" title="时间" :content="dateTypeList"></yhm-radiofilter>-->
            <yhm-radiofilter  @initData="initChoose('vehicleBrand')" title="车辆品牌" :content="vehicleBrandList"></yhm-radiofilter>
          </div>
        </template>
        <!--数据表头-->
        <template #listHead>
          <yhm-managerth-check style="width: 40px;" :check="allCheck"></yhm-managerth-check>
          <yhm-managerth style="width: 38px;" title="查看"></yhm-managerth>
          <yhm-managerth style="width: 80px" title="客户姓名" value="customerName"></yhm-managerth>
          <yhm-managerth title="保险公司" value="otherName"></yhm-managerth>
          <yhm-managerth style="width: 140px;" title="工单号" value="workOrderID"></yhm-managerth>
          <yhm-managerth style="width: 120px" title="业务员" value="operator"></yhm-managerth>
          <yhm-managerth style="width: 100px;" title="车型品牌" value="vehicleBrandID"></yhm-managerth>
          <yhm-managerth style="width: 120px" title="车牌号" value="licensePlateNumber"></yhm-managerth>
          <yhm-managerth style="width: 120px;" title="回款日期" value="moneyBackDate"></yhm-managerth>
          <yhm-managerth style="width: 80px" title="发生额" value="money"></yhm-managerth>
          <yhm-managerth style="width: 140px" title="收款银行" value="bankName"></yhm-managerth>
<!--          <yhm-managerth style="width: 140px" title="发票号"></yhm-managerth>-->
          <yhm-managerth style="width: 180px" title="银行摘要" ></yhm-managerth>
          <yhm-managerth style="width: 100px" title="数据状态" ></yhm-managerth>
        </template>
        <!--数据明细-->
        <template #listBody>
          <tr  v-for="(item,index) in content" :key="index">
            <yhm-manager-td-checkbox :value="item"></yhm-manager-td-checkbox>
            <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>
            <yhm-manager-td :value="item.customerName"></yhm-manager-td>
            <yhm-manager-td :tip="true" :value="item.otherName" v-if="item.otherName===''" @click="unitClickLeft(item)" ></yhm-manager-td>
            <yhm-manager-td-center :tip="true" :value="item.otherName" v-else @click="unitClickLeft(item)" :menu-list="unitMenu" @rightClick="rightClick(item)" @menuClick="menuClick"></yhm-manager-td-center>
            <yhm-manager-td :value="item.workOrderID" v-if="item.workOrderID===''" ></yhm-manager-td>
            <yhm-manager-td-center :value="item.workOrderID"  v-else :menu-list="jobNumberMenu" @rightClick="rightClick(item)" @menuClick="menuClick"></yhm-manager-td-center>

            <yhm-manager-td :value="item.operator" v-if="item.operatorID===''" @click="operatorClickLeft(item)"></yhm-manager-td>
            <yhm-manager-td-center :value="item.operator" v-else :menu-list="operatorMenu" @click="operatorClickLeft(item)" @rightClick="rightClick(item)" @menuClick="menuClick"></yhm-manager-td-center>
            <yhm-manager-td :value="item.vehicleBrand" v-if="item.vehicleBrand===''"></yhm-manager-td>
            <yhm-manager-td-center :value="item.vehicleBrand" v-else :menu-list="vehicleBrandMenu" @click="vehicleBrandLeft(item)" @rightClick="rightClick(item)" @menuClick="menuClick"></yhm-manager-td-center>
            <yhm-manager-td :value="item.licensePlateNumber"></yhm-manager-td>
            <yhm-manager-td-date :value="item.moneyBackDate"></yhm-manager-td-date>
            <yhm-manager-td-money :value="item.money === null ? ' ':item.money"></yhm-manager-td-money>
            <yhm-manager-td :value="item.bankName" v-if="item.bankName===''"></yhm-manager-td>
            <yhm-manager-td-center :value="item.bankName" v-else :menu-list="bankIDMenu" @click="vehicleBrandLeft(item)" @rightClick="rightClick(item)" @menuClick="menuClick"></yhm-manager-td-center>
            <yhm-manager-td :value="item.bankSummary === null ? ' ': item.bankSummary"></yhm-manager-td>
            <yhm-manager-td-psd  :value="item.signState" :list="isSignStateList"></yhm-manager-td-psd>
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
          <yhm-managerth v-show="!isSelected" :before-color="oldTotalColor" style="width: 60px;" width="60px" title="" :before-title="oldTotal" @call="oldTotalClick"></yhm-managerth>
          <yhm-managerth v-show="isYearMoneyShow && !isSelected" :before-color="oldTotalColor" style="width: 60px;" width="60px" title="" :before-title="yearTotal" ></yhm-managerth>
        </template>
        <template #listTotalBody>
          <tr>
            <yhm-manager-td-rgt @click="totalClick(item)" style="text-align: center;" v-for="(item,key) in contentTotal" :key="key" :value="item.count"></yhm-manager-td-rgt>
            <yhm-manager-td-money @click="totalClick(item)" style="text-align: center;" v-for="(item,index) in contentTotal" :key="index+1" :value="item.money"></yhm-manager-td-money>
            <yhm-manager-td-money v-show="!isSelected" :before-symbol="oldMoneySymbol" @click="totalClick(item,'2')" before-color="#ff000c" :style="{color:oldTotalColor}" v-for="(item,index) in contentTotal" :key="index+2" :value="oldMoney"></yhm-manager-td-money>
            <yhm-manager-td-money v-show="isYearMoneyShow && !isSelected" v-if="yearMoneyShow" :before-symbol="yearMoneySymbol" @click="totalClick(yearMoney)" before-color="#ff000c" :style="{color:oldTotalColor}"  :value="yearMoney"></yhm-manager-td-money>
            <yhm-manager-td-money v-show="isYearMoneyShow && !isSelected" v-if="!yearMoneyShow" :before-symbol="yearMoneySymbol" @click="totalClick('0')" before-color="#ff000c" :style="{color:oldTotalColor}"  value="NaN"></yhm-manager-td-money>

          </tr>

        </template>
      </yhm-managerpage>

    </div>
</template>

<script>
  import { managermixin } from '@/assets/manager.js'
  export default {
    name: 'claimsManager',
    mixins: [managermixin],
    data(){
      return{
        jobNumberMenu:['筛选当前工单号'],
        unitMenu:['筛选当前公司'],
        operatorMenu:['筛选当前联系人'],
        vehicleBrandMenu:['筛选当前车辆品牌'],
        bankIDMenu:['筛选当前银行'],
        oldTotal:'比前一天(环比)',
        oldTotalColor:'#ff000c',
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
        ],
        profitAndLoss:'0',

        dayCategory:'0',//环比点击事件变量
      }
    },
    methods:{
      oldTotalClick(){
      },
      statisticalClick(){
        this.$dialog.OpenWindow({
          width: '1300',
          height: '810',
          title: '查看统计图',
          url: '/insuranceCartogram',
          closeCallBack: (dataTwo)=>{

          }
        })
      },
      profitAndLossClick(){
        if(this.profitAndLoss === '0'){
          this.profitAndLoss = '1'
          this.oldTotalColor='#09B300'
          this.topBtnShou = true
        }else{
          this.profitAndLoss = '0'
          this.oldTotalColor='#ff000c'
          this.topBtnShou = false
        }
      },
      unitClickLeft(item){//点击时查看公司信息
        if(item.otherName!==''){
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
        }
        this.initPageData(false)
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
              this.initPageData(false)
            }
          }
        }else{
          if(this.dayCategory === '1'){
            this.dayCategory='0'
            this.initPageData(true)
          }else if(this.dayCategory === '3'){
            this.dayCategory='2'
            this.initPageData(false)
          }
        }
      },
      initChoose(){
        if(this.dayCategory === '1'||this.dayCategory === '0'){
          this.dayCategory='0'
        }else if(this.dayCategory === '3'||this.dayCategory === '2'){
          this.dayCategory='2'
        }
        this.initPageData(false)
      },
      initChooseTime(item){
        this.selectMonth = item.endDate
        this.dayCategory='2'
        this.radioTime = item;
        if(item.startDate.split("-")[1]<item.endDate.split("-")[1]){
          this.oldTotal='比前一月(环比)'
          this.nowTotal='本月'
          this.isYearMoneyShow=true
        }else{
          this.oldTotal='比前一天(环比)'
          this.nowTotal='本日'
          this.isYearMoneyShow=true
        }
        this.initPageData(false)
      },
      selectMonthEvent(data,item){
        this.dayCategory='2'
        this.selectMonth = item.endDate

        this.yearMonth = data;
        this.radioTime = item;
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
          this.initPageData(false)
        }
      },
      //选中汇总
      selectedSum(){
        let params={
          selectValue:this.selectValue
        };
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
          title: '维护保险理赔',
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

            let startDate = newYear + '-' + newMonth + '-' + lastDate + ' ' + '23:59:59';
            let endDate = newYear + '-' + newMonth + '-' + newDate + ' ' + newHours + ':' + newMin + ':' + newSec;
            params = {
              startDate: startDate,
              endDate: endDate,
            }
          }
        } else {
          if(this.dayCategory==='2'){
            params = {
              bankID: this.bankList.value,
              unitID: this.insuranceUnitList.value,
              dateType:this.dateTypeList.value,
              vehicleBrand:this.vehicleBrandList.value,
              operatorID:this.operatorIDList.value,
              // startDate: this.radioTime.startDate,
              // endDate: this.radioTime.endDate,
              workOrderID:this.workOrderID,
              startDate: this.radioTime.startDate ? this.radioTime.startDate : newRadioTime.startDate,
              endDate: this.radioTime.endDate ? this.radioTime.endDate : newRadioTime.endDate,
              signState : this.signStateList.value,
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
            }
          }else if(this.dayCategory === '1'){
            params = {
              startDate: this.startDate,
              endDate: this.endDate,
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

            if(data.total[0].oldMoney>0){
              this.oldMoney=data.total[0].oldMoney
              this.oldMoneySymbol='+'
            }else{
              this.oldMoney=data.total[0].oldMoney
              this.oldMoneySymbol=''
            }
            if(data.total[0].yearMoney>0){
              this.yearMoney=data.total[0].yearMoney
              this.yearMoneySymbol='+'
            }else if(data.total[0].yearMoney<0){
              this.yearMoney=data.total[0].yearMoney
              this.yearMoneySymbol=''
            }

          },
          init: (data) => {
            this.insuranceUnitList = data.insuranceUnit
            this.bankList = data.bankList
            this.operatorIDList = data.operatorList
            this.contentTotal = data.total
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
</style>
