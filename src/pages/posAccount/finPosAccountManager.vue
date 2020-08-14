<template>
  <div>
    <yhm-managerpage category="1">
      <!--导航条-->
      <template #navigationTab>
        <a class="menuTabDiv" href="/Fin/bankDetailManager?menuType=0">收支明细</a>
        <router-link class="menuTabDiv" :to="{path:'/home/viewManager/claimsManager'}">保险理赔</router-link>
        <router-link class="menuTabDiv" :to="{path:'/home/BankDetailRepairManager'}">散户维修</router-link>
        <router-link class="menuTabDiv" :to="{path:'/home/BankDetailCommissionManager'}">保险手续费</router-link>
        <router-link class="menuTabDiv menuTabActive" :to="{path:'/home/finPosAccountManager'}">Pos账户</router-link>
        <router-link class="menuTabDiv" :to="{path:'/home/finPosAccountDetailManager'}">Pos离线数据</router-link>
      </template>
      <!--操作区-->
      <template #operate>
<!--        <yhm-commonbutton value="添加" icon="btnAdd" :flicker="true" @call="add()" category="one"></yhm-commonbutton>-->

        <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initPageData"></yhm-managersearch>
        <yhm-radiofilter :before="posAccountBefore" @initData="initChoose('posAccount')" title="Pos账户" all="0"  :content="listposAccount"></yhm-radiofilter>
        <!--        <yhm-form-td-date  position="b" style="height: 30px" :value="yearMonth" id="yearMonth" ></yhm-form-td-date>-->
        <yhm-form-date :error-show="false" :max="yearDateMonth" title="交易日期" :value="yearMonth" id="yearMonth" @call="callDate" ></yhm-form-date>
        <yhm-radiofilter :before="posAccountBefore" @initData="initChoose('posDetailsState')" title="状态" :content="listposDetailsState"></yhm-radiofilter>
        <!--        :max="yearDateMonth"-->
      </template>
      <!--筛选区-->
      <template #choose>
        <div v-show="choose" class="buttonBody mptZero">
        </div>
      </template>
      <!--数据表头-->
      <template #listHead>
        <yhm-managerth style="width: 40px;" title="选择"></yhm-managerth>
        <yhm-managerth style="width: 40px;" title="查看"></yhm-managerth>
        <yhm-managerth title="账户"></yhm-managerth>
        <yhm-managerth title="交易对象" value="otherName"></yhm-managerth>
        <yhm-managerth title="交易日期" value="cccurDate"></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="方向" value="direction"></yhm-managerth>
        <yhm-managerth title="事由" value="subject"></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="收入金额" value="money"></yhm-managerth>
        <yhm-managerth v-if="isSxf" style="width: 100px;" title="手续费"></yhm-managerth>
        <yhm-managerth title="备注" value="state"></yhm-managerth>
        <yhm-managerth style="width: 150px;" title="状态"></yhm-managerth>
      </template>
      <template #listBody>
        <tr :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]" v-for="(item,index) in content" :key="index">
          <yhm-manager-td-checkbox :value="item" @call="checkEvent"></yhm-manager-td-checkbox>
          <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>
          <yhm-manager-td :value="item.bankName+item.account"></yhm-manager-td>
          <yhm-manager-td :value="item.otherName"></yhm-manager-td>
          <yhm-manager-td-date :value="item.cccurDate"></yhm-manager-td-date>
          <yhm-manager-td-direction class="dfJcc" :direction="item.direction" :value="item.direction" :dir-val="false"></yhm-manager-td-direction>
          <yhm-manager-td-center :value="item.subject"></yhm-manager-td-center>
          <yhm-manager-td-money :value="item.money"></yhm-manager-td-money>
          <yhm-form-td-textbox v-if="isSxf" width="90"  before-icon="rmb" :list="content" listid="content" :value="item" id="posFee" @blur="calcMoney()" ></yhm-form-td-textbox>
          <yhm-manager-td :tip="true" :value="item.remark"></yhm-manager-td>
          <yhm-manager-td-operate>
            <yhm-manager-td-operate-button v-if="item.posDetailsState==='0'?true:false"  icon="i-uniE9AE" value="待入账" color="#FF0033"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button v-if="item.posDetailsState==='1'?true:false"  icon="i-uniE9AF" value="待验证" color="#fd6802"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button v-if="item.posDetailsState==='2'?true:false"  icon="i-uniE9b0" value="已验证" color="#44BB44"></yhm-manager-td-operate-button>
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
          </div>
          <table width="100%" cellpadding="0" cellspacing="0" class="m_content_table m_content_total_table" >
            <thead>
            <tr>
              <yhm-managerth style="width: 100px;" before-color="black" title="" before-title="总金额"></yhm-managerth>
              <yhm-managerth v-if="isFinally" style="width: 100px;" before-color="black" title="" before-title="到账金额"></yhm-managerth>
              <yhm-managerth v-if="isActual" style="width: 100px;" before-color="black" title="" before-title="实际手续费"></yhm-managerth>
              <yhm-managerth v-if="isRate" style="width: 100px;" before-color="black" title="" before-title="实时手续费"></yhm-managerth>
            </tr>
            </thead>

            <tbody>
            <tr>
              <yhm-manager-td-money  v-for="(item,index) in contentTotal" :key="index" :value="item.money"></yhm-manager-td-money>
              <yhm-manager-td-money v-if="isFinally" :value="finallyMoney"></yhm-manager-td-money>
              <yhm-manager-td-money v-if="isActual" :value="actualRateMoney"></yhm-manager-td-money>
              <yhm-manager-td-money v-if="isRate" :value="rateMoney"></yhm-manager-td-money>
            </tr>

            </tbody>
          </table>
          <yhm-commonbutton  style="margin-top: 40px; margin-left: 40px;" v-if="isInState" value="入账" icon="btnSave" @call="saveCredit" :flicker="true"></yhm-commonbutton>
          <yhm-commonbutton  style="margin-top: 40px; margin-left: 40px;" v-if="isVerState" value="验证" icon="btnSave" @call="save" :flicker="true"></yhm-commonbutton>
        </div>

      </template>
      <!--分页控件-->
      <template #pager >
        <yhm-pagination isPageSize="true" :pager="pager" @initData="initPageData(false)"></yhm-pagination>
      </template>
    </yhm-managerpage>
  </div>
</template>
<script>
  import { managermixin } from '@/assets/manager.js'
  import { accAdd } from '../../assets/common'
  export default {
    name: 'finPosAccountManager',
    mixins: [managermixin],
    data(){
      return{
        id:'',
        posAccountBefore:'0',// 默认选择状态为可以选择，1为不可以选择
        listposAccount:{
          value: '', //默认为空
          list: []
        },
        posAccountList:[],

        listposDetailsState:{
          value: '', //默认为空
          list: []
        },
        posDetailsStateList:[],
        contentTotal:[],
        yearMonth:'',
        yearDateMonth:'',
        startDate:'',
        endDate:'',
        rateMoney:'0',
        finallyMoney:'0',  //最终金额
        actualRateMoney:'0', //应付手续费
        totalMoney:'',   //总金额
        isInState:false,
        isVerState:false,
        BankDetailID:'',
        posCount:'',
        isSxf:false,
        isFinally:false,
        isActual:false,
        isRate:false,
        //posCountShow:false
        pager: {
          total: 0, // 总条数
          pageSize: 100, // 每页条数
          pageIndex: 1, // 当前页码
          selectCount: 0 // 选中条数
        }
      }
    },
    methods:{
      // add(){
      //   this.$dialog.OpenWindow({
      //     width: '1050',
      //     height: '750',
      //     url: '/finPosAccountDetailForm',
      //     title: '添加收支明细',
      //     closeCallBack: (data)=>{
      //
      //     }
      //   })
      // },
      checkEvent(checkList){
        this.posCount=checkList.length
        // if(this.posCountShow==false){
        //   this.posCount=checkList.length
        // }else{
        //   this.posCount= ''
        //   this.posCountShow=false
        // }
        let idList = []

        for (let i in this.content) {
          idList.push(this.content[i].id)
        }

        sessionStorage.checklist = checkList

      },
      saveCredit(){
        if(this.content.length!=0) {
          let a = 0
          let params = {
            selectValue: this.selectValue
          }
          this.ajaxJson({
            url: '/PersonOffice/commonSelectedsave',
            data: params,
            call: (data) => {
              if (data.type === 0) {

                for (let i in this.content) {
                  this.BankDetailID = this.content[i].id
                  a += 1
                }
                let idList = []
                if (this.posCount == '' || this.posCount == 0) {
                  for (let i in this.content) {
                    idList.push(this.content[i].id)
                  }
                  sessionStorage.checklist = idList
                  this.posCount = a
                }
                this.$dialog.OpenWindow({
                  width: '650',
                  height: '320',
                  url: '/finPosAccountDetailsForm?money=' + this.contentTotal[0].money + '&bankDetailID=' + this.BankDetailID + '&posCount=' + this.posCount + '&posBankFee=' + this.listposAccount.value,
                  title: '详情信息',
                  closeCallBack: (data) => {
                    if (data){
                      sessionStorage.removeItem('checklist')
                      // this.posCountShow = true
                      this.initPageData()
                      this.posCount =''
                      this.selectValue=[]
                    }
                  }
                })
              }
            }
          })
        }
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
                url: '/Fin/posManagerTotal',
                data: paramsFinish,
                call:(information) =>{
                  this.contentTotal = information
                }
              })
            }
          }
        })
      },
      listView(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '750',
          url: '/unitDetailView?id=' + item.id ,
          title: '查看收支明细信息',
          closeCallBack: (data)=>{

          }
        })
      },
      getTime(data,type){
        let _data = data;
        //如果是13位正常，如果是10位则需要转化为毫秒
        if (String(data).length == 13) {
          _data = data
        } else {
          _data = data*1000
        }
        const time = new Date(_data);
        const Y = time.getFullYear();
        const Mon = time.getMonth() + 1;
        const Day = time.getDate();
        const H = time.getHours();
        const Min = time.getMinutes();
        const S = time.getSeconds();
        //自定义选择想要返回的类型
        if(type=="Y"){
          return `${Y}-${Mon}-${Day}`
        }else if(type=="H"){
          return `${H}:${Min}:${S}`
        }else{
          return `${Y}-${Mon}-${Day} ${H}:${Min}:${S}`
        }
      },
      listMoney(){
        let d = new Date(this.yearMonth)
        let t = d.getTime(d)+24*60*60*1000
        let paramsMoney={
          posBankFee:this.listposAccount.value,
          transactionDate:this.getTime(t,'Y'),
        }
        this.ajaxJson({
          url: '/Fin/posInquireMoney',
          data: paramsMoney,
          call: (data) => {
            if (data.type === 0) {
              for( let i in this.contentTotal){
                this.totalMoney= this.contentTotal[i].money
              }
              this.finallyMoney=data.val
              if (this.totalMoney==0){
                this.actualRateMoney='0'
                this.finallyMoney='0'
              }else{
                this.actualRateMoney=accAdd(this.totalMoney,this.finallyMoney*-1)+''
              }

            } else {
              this.finallyMoney='0'
            }
          }
        })

      },
      save(){
        if(this.content.length!=0) {
          let arr = []
          for (let i in this.content) {
            arr.push({
              'id': this.content[i].id,
              'posBankFee': this.listposAccount.value,
              'money': this.content[i].posFee
            })
            this.id = this.content[i].id
          }
          let params = {
            posBankFeeList: arr
          }

          let d = new Date(this.yearMonth)
          let t = d.getTime(d) + 24 * 60 * 60 * 1000
          let paramsMoney = {
            posBankFee: this.listposAccount.value,
            transactionDate: this.getTime(t, 'Y'),
          }

          for (let i in this.contentTotal) {
            this.totalMoney = this.contentTotal[i].money
          }
          if (this.contentTotal[0].title > 0) {
            this.$dialog.alert({
              alertImg: 'warn',
              tipValue: '你还有(' + this.contentTotal[0].title + ')条数据待入账,请先入账',
              width: 350
            })
          } else {
            this.ajaxJson({
              url: '/Fin/posInquireMoney',
              data: paramsMoney,
              call: (data) => {
                if (data.type === 0) {
                  if (accAdd(data.val, this.rateMoney) == this.totalMoney) {
                    this.$dialog.confirm({
                      tipValue: '请仔细核对金额确保正确?',
                      width: 350,
                      okCallBack: (data) => {
                        this.ajaxJson({
                          url: '/Fin/savePosAccount',
                          data: params,
                          call: (dataTime) => {
                            if (dataTime.type === 0) {
                              this.$dialog.setReturnValue(this.id)
                              this.$dialog.alert({
                                tipValue: '添加完成',
                                closeCallBack: () => {
                                  this.initPageData(false)
                                }
                              })
                            } else {
                              this.$dialog.alert({
                                alertImg: 'warn',
                                tipValue: dataTime.message
                              })
                            }
                          }
                        })
                      }
                    })
                  } else {
                    this.$dialog.alert({
                      alertImg: 'warn',
                      tipValue: '请仔细核对手续费金额',
                      width: 350
                    })
                  }

                } else if (data.type === 1) {
                  this.$dialog.alert({
                    alertImg: 'warn',
                    tipValue: data.message
                  })
                }
              }
            })

          }
        }
      },
      calcMoney(){
        let sum=0
        for (let i in this.content){
          sum = accAdd(sum,this.content[i].posFee)

        }
        this.rateMoney=sum+''
        let totaoMoney = 0
        for (let i in this.contentTotal){
          totaoMoney = parseFloat(this.contentTotal[i].money)
        }
        //this.finallyMoney=totaoMoney-parseFloat(this.rateMoney)+''

      },
      callDate(){
        this.startDate=this.yearMonth+' 00:00:00'
        this.endDate = this.yearMonth+' 23:59:59'
        this.initPageData()
      },
      // 筛选事件
      initChoose (op) {
        if (op === 'posAccount') {
          this.selectValue = []
        }
        if (op === 'posDetailsState') {
          this.selectValue = []
        }

        if (this.listposDetailsState.value=='0'){
          this.isSxf=false
          this.isInState=true
          this.isVerState=false
          this.isFinally=false
          this.isActual=false
          this.isRate=false
        } else  if (this.listposDetailsState.value=='1'){
          this.isInState=false
          this.isVerState=true
          this.isSxf=true
          this.isFinally=true
          this.isActual=true
          this.isRate=true
          // this.listMoney()
        }else if (this.listposDetailsState.value=='2'){
          this.isInState=false
          this.isVerState=false
          this.isSxf=false
          this.isFinally=true
          this.isActual=true
          this.isRate=false
        } else if (this.listposDetailsState.value==''){
          this.isInState=false
          this.isVerState=false
          this.isSxf=false
          this.isFinally=false
          this.isActual=false
          this.isRate=false
        }
        this.pager.pageIndex = 1
        //this.initPageData(false)
      },
      //搜索
      initPageData (initValue) {
        let params = {}
        if (initValue) {
          let day1 = new Date();
          let day2 = new Date();
          day1.setTime(day1.getTime()-24*60*60*1000);
          day2.setTime(day2.getTime()+24*60*60*1000);
          let s1 = day1.getFullYear()+"-" + (day1.getMonth()+1) + "-" + day1.getDate();
          let s2 = day2.getFullYear()+"-" + (day2.getMonth()+1) + "-" + day2.getDate();
          this.yearMonth = s1
          this.yearDateMonth = s2
          this.startDate=s1+' 00:00:00'
          this.endDate = s1+' 23:59:59'
          params = {
            posAccount:this.listposAccount.value,
            posDetailsState:this.listposDetailsState.value,
            startDate: this.startDate,
            endDate: this.endDate,
          }
        } else {
          params = {
            posAccount:this.listposAccount.value,
            posDetailsState:this.listposDetailsState.value,
            startDate: this.startDate,
            endDate: this.endDate,
          }
        }
        this.init({
          initValue:initValue,
          url: '/Fin/getPosAccountManager',
          data:params,
          all:(data) =>{
            //不管是不是初始化都需要执行的代码
            this.contentTotal = data.total
            this.listMoney()


          },
          init:(data)=>{
            //初始化时需要执行的代码
            // 这边初始化筛选信息

            this.listposAccount.list=data.posAccountPsd.list
            this.listposAccount.value=data.posAccountPsd.value
            this.posAccountList=data.posAccountList

            this.listposDetailsState=data.posDetailsStatePsd
            this.posDetailsStateList=data.posDetailsStateList


          }
        })

      }
    },
    // watch:{
    //   content(val){
    //     setTimeout(()=>{
    //       if(this.content.length=='0'){
    //         this.finallyMoney='0'
    //         this.actualRateMoney='0'
    //         this.finallyMoney='0'
    //       }
    //     },100)
    //
    //     console.log( this.content,'22222' )
    //   }
    // },
    created () {

    }
  }
</script>

<style scoped>

</style>
