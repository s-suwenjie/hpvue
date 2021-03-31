<template>
    <div>
      <yhm-managerpage category="1" :total-table="true">
        <template #navigationTab>
          <router-link class="menuTabDiv" :to="{path:'/home/pushRepairManager'}">推修管理</router-link>
          <router-link class="menuTabDiv menuTabActive" :to="{path:'/home/pushRepairRecordManager'}">推修记录</router-link>
        </template>
        <!--        <template #navigation>售后业务>工单>推修管理</template>-->
        <template #operate>
          <!-- 操作区-->
          <!--<yhm-commonbutton value="添加推修公司"  icon="btnAdd" :flicker="true" @call="add" category="one"></yhm-commonbutton>-->
          <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initDate"></yhm-managersearch>
          <yhm-radiofilter @initData="initDate()" title="品牌" :content="applicableModelsPsd"></yhm-radiofilter>
          <yhm-radiofilter style="margin-top: 6px" @initData="initChoose('dateType')" title="时间" :content="dateTypeList"></yhm-radiofilter>
          <yhm-radiofilter @initData="initDate()" title="结算类型" :content="typePsd"></yhm-radiofilter>
          <yhm-radiofilter @initData="initDate()" title="状态" :content="statePsd"></yhm-radiofilter>
          <yhm-radiofilter style="margin-top: 6px;" @initData="initDate()" title="推修公司" :content="companyPsd"></yhm-radiofilter>
          <yhm-radiofilter @initData="initDate()" title="工单状态" :content="effectivenessPsd"></yhm-radiofilter>
        </template>
        <template #operateMore>
          <div :class="{customTimeShow:timeShow,customTimeHide:!timeShow}" >
            <yhm-form-date v-show="dateShow" title="开始时间" @call="dateSelection(startDateStr,endDateStr)" style="width: 350px;" :value="startDateStr" id="startDateStr" position="t"></yhm-form-date>
            <yhm-form-date v-show="dateShow" title="结束时间" @call="dateSelection(startDateStr,endDateStr)" style="width: 350px;margin-left: 30px;" :value="endDateStr" id="endDateStr" position="t"></yhm-form-date>
          </div>
        </template>
        <template #listHead>
          <yhm-managerth style="width: 40px;" title="选择" ></yhm-managerth>
          <yhm-managerth style="width: 40px;" title="查看" ></yhm-managerth>
          <yhm-managerth width="110" title="推送日期"></yhm-managerth>
          <yhm-managerth title="推修公司"></yhm-managerth>
          <yhm-managerth width="90" title="简称"></yhm-managerth>
<!--          <yhm-managerth width="90" title="自保费率" prompt="自保(当年在乙方承保的车辆)" after-title="?" after-size="18px" tooltip-left="-34px" after-color="#f00"></yhm-managerth>-->
<!--          <yhm-managerth width="90" title="非自保费率" prompt="非自保(一年没有进场记录或当年不在乙方承保的车辆)" after-title="?" after-size="18px" tooltip-left="-112px" after-color="#f00"></yhm-managerth>-->
<!--          <yhm-managerth width="70" title="结算类型" ></yhm-managerth>-->
          <yhm-managerth width="55" title="状态" ></yhm-managerth>
          <yhm-managerth width="180" title="工单号" ></yhm-managerth>
          <yhm-managerth width="85" title="车牌号" ></yhm-managerth>
          <yhm-managerth width="85" title="车辆品牌" ></yhm-managerth>
<!--          <yhm-managerth width="90" title="车主姓名" ></yhm-managerth>-->
<!--          <yhm-managerth width="90" title="联系人姓名" ></yhm-managerth>-->

          <yhm-managerth width="100" title="已生效营业额" ></yhm-managerth>
          <yhm-managerth width="100" title="推送费" ></yhm-managerth>
<!--          <yhm-managerth width="100" title="工单合计金额" ></yhm-managerth>-->
          <yhm-managerth width="70" title="结账状态" ></yhm-managerth>
          <yhm-managerth width="105" title="是否生成工单"  prompt="有效：车辆已进厂修理 / 无效：车辆未进厂" after-title="?" after-size="18px" tooltip-left="-76px" after-color="#f00"></yhm-managerth>
          <yhm-managerth width="210" title="操作"></yhm-managerth>
        </template>
        <template #listBody >
          <tr :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]" v-for="(item,index) in content" :key="index">
            <yhm-manager-td-checkbox :value="item"></yhm-manager-td-checkbox>
            <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>
            <yhm-manager-td-date :value="item.insertDate"></yhm-manager-td-date>

            <yhm-manager-td @click="maintain(item)" color="#49a9ea" v-if="item.companyName==''||item.companyName==null" value="点击维护推修公司"></yhm-manager-td>
            <yhm-manager-td :tip="true" v-else @click="lookOverUnit(item)" :value="item.companyName"></yhm-manager-td>

            <yhm-manager-td v-if="item.unitshort==''||item.unitshort==null"  value="-----"></yhm-manager-td>
            <yhm-manager-td :tip="true" v-else :value="item.unitshort"></yhm-manager-td>

<!--            <yhm-manager-td-center :value="item.selfrate==''?'-&#45;&#45;&#45;&#45;':item.selfrate + '%'"></yhm-manager-td-center>-->
<!--            <yhm-manager-td-center :value="item.noselfrate==''?'-&#45;&#45;&#45;&#45;':item.noselfrate + '%'"></yhm-manager-td-center>-->

<!--            <yhm-manager-td-center v-if="item.type==''" value="&#45;&#45;&#45;&#45;&#45;&#45;"></yhm-manager-td-center>-->
<!--            <yhm-manager-td-psd v-else :value="item.type" :list="typeList"></yhm-manager-td-psd>-->

            <yhm-manager-td-center v-if="item.state==''||item.state==null" value="------"></yhm-manager-td-center>
            <yhm-manager-td-psd v-else :value="item.state" :list="stateList"></yhm-manager-td-psd>

            <yhm-manager-td-center v-if="item.code==''||item.code==null" value="-----"></yhm-manager-td-center>
            <yhm-manager-td-center v-else @click="lookOver(item)" title="点击查看工单" :value="item.code"></yhm-manager-td-center>

            <yhm-manager-td type="vehicle" :value="item.plate"></yhm-manager-td>

            <yhm-manager-td-center v-if="item.applicableModels==''" value="------"></yhm-manager-td-center>
            <yhm-manager-td-psd v-else :value="item.applicableModels" :list="applicableModelsList"></yhm-manager-td-psd>

<!--            <yhm-manager-td-center  @click="lookOverCarOwner(item)" :value="item.carOwner"></yhm-manager-td-center>-->
<!--            <yhm-manager-td-center  @click="lookOverPerson(item)" :value="item.contactPerson"></yhm-manager-td-center>-->

            <yhm-manager-td-money style="color: #2a599e;" :value="item.pendingmoney==''?'0':item.pendingmoney"></yhm-manager-td-money>
            <yhm-manager-td-money style="color: #2193B0;" :value="item.pending==''?'0':item.pending"></yhm-manager-td-money>
<!--            <yhm-manager-td-money style="color: #fd6802;" :value="item.expend==''?'0':item.expend"></yhm-manager-td-money>-->
            <yhm-manager-td-center  :value="item.pendingstate=='1'?'已结账':'未结账'" :color="item.pendingstate=='1'?'#00b300':'#f00'"></yhm-manager-td-center>
            <yhm-manager-td-psd  :value="item.orderstate" :list="effectivenessPsd.list"></yhm-manager-td-psd>
            <yhm-manager-td-operate>
              <yhm-manager-td-operate-button v-if="item.type=='2'" @click="rateSwitchover(item)" value="自保费率切换" icon="i-btn-applicationSm" color="#2193b0"></yhm-manager-td-operate-button>
              <yhm-manager-td-operate-button v-if="item.companyName==''||item.companyName==null" @click="maintain(item)" value="维护推修公司" icon="i-btn-applicationSm" color="#be08e3"></yhm-manager-td-operate-button>
              <yhm-manager-td-operate-button v-if="item.state=='0'" @click="settleAccounts(item)" value="确认完成" icon="i-btn-applicationSm" color="#49a9ea"></yhm-manager-td-operate-button>
            </yhm-manager-td-operate>
          </tr>
        </template>
        <!--数据空提示-->
        <template #empty>
          <span class="m_listNoData" v-show="content.length=='0'?true:false">暂时没有数据</span>
        </template>
        <template #total>
          <div class="listTotalCrente m_list" style="width: 602px;margin: auto;">
            <table width="100%" cellpadding="0" cellspacing="0" class="m_content_table m_content_total_table">
              <thead>
              <tr>
                <yhm-managerth style="width: 100px;" before-color="#000" title="" before-title="总条数" ></yhm-managerth>
                <yhm-managerth style="width: 100px;" before-color="#fd6802" title="" before-title="已生效营业额"></yhm-managerth>
                <yhm-managerth style="width: 100px;" before-color="#2193b0" title="" before-title="推修费"></yhm-managerth>
                <yhm-managerth style="width: 100px;" before-color="#2a599e" title="" before-title="已结推修费"></yhm-managerth>
                <yhm-managerth style="width: 100px;" before-color="#f00" title="" before-title="未结推修费"></yhm-managerth>

              </tr>
              </thead>
              <tbody>
              <tr>
                <yhm-manager-td-rgt style="color: #000;" :value="pager.total+''"></yhm-manager-td-rgt>
                <yhm-manager-td-money style="color: #fd6802;" :value="totalList[0].money"></yhm-manager-td-money>
                <yhm-manager-td-money style="color: #2193b0;"  :value="totalList[1].money"></yhm-manager-td-money>
                <yhm-manager-td-money style="color: #2a599e;"  :value="totalList[2].money"></yhm-manager-td-money>
                <yhm-manager-td-money style="color: #f00;"  :value="totalList[3].money"></yhm-manager-td-money>


              </tr>
              </tbody>
            </table>
          </div>
        </template>

        <!--分页控件-->
        <template #pager>
          <yhm-pagination :pager="pager" @initData="initDate(false)"></yhm-pagination>
        </template>
      </yhm-managerpage>
    </div>
</template>

<script>
  import {managermixin} from '@/assets/manager.js'
  export default {
    name: 'pushRepairRecordManager',
    mixins: [managermixin],
    data(){
      return{
        applicableModelsList:[],//车辆品牌
        applicableModelsPsd:[],//车辆品牌 筛选
        companyPsd:[],//推修公司
        typeList:[],//结算类型
        typePsd:[],//结算类型 筛选
        stateList:[],//状态
        statePsd:[],//状态 筛选
        effectivenessPsd:[],//是否有效  筛选
        totalList:[
          {
            money:'0'
          },
          {
            money:'0'
          },
          {
            money:'0'
          },
          {
            money:'0'
          }
        ],
        startDateStr:'',//开始时间
        endDateStr:'',//结束时间
        timeShow:false,//自定义时间选择 显示隐藏
        dateShow:false,//时间组件 显示隐藏
        dateTypeList:{
          value: '', //默认为空
          list: [
            {showName:"本日", num: "0", code: "", img: ""},
            {showName:"昨日", num: "1", code: "", img: ""},
            {showName:"本周", num: "2", code: "", img: ""},
            {showName:"上周", num: "3", code: "", img: ""},
            {showName:"本月", num: "4", code: "", img: ""},
            {showName:"上月", num: "5", code: "", img: ""},
            {showName:"本季度", num: "6", code: "", img: ""},
            {showName:"上季度", num: "7", code: "", img: ""},
            {showName:"本年", num: "8", code: "", img: ""},
            // {showName:"上年", num: "9", code: "", img: ""},
            {showName:"选择时间", num: "9", code: "", img: ""},
          ]
        },
        dateType:'',
      }
    },
    methods:{
      add(){
        this.$dialog.OpenWindow({
          width: 1050,
          height: 720,
          url:'/pushRepairForm?isAdd=1',
          title:'添加推修公司',
          closeCallBack:(data)=>{
            this.initDate()
          }
        })
      },
      lookOverUnit(item){
        if(item.companyID!=''){
          this.$dialog.OpenWindow({
            width: '1070',
            height: '750',
            url:'/unitView?id='+item.companyID,
            title:'查看公司信息',
            closeCallBack:(data) =>{
              this.initPageData(false)
            }
          })
        }

      },
      dateSelection(start,finish){//选择时间段
        if(start!=''&&finish!=''){
          this.initDate(false)
        }
      },
      // 筛选事件
      initChoose (op) {
        this.pager.pageIndex = 1
        if(op === 'dateType'&&this.dateTypeList.value!=9){
          this.startDateStr=''//开始时间
          this.endDateStr=''//结束时间
        }
        if (this.dateTypeList.value==9&&op === 'dateType'){
          this.timeShow = true
          setTimeout(()=>{
            this.dateShow = true
          },300)
          return
        }else{
          if (op === 'dateType') {
            this.workDateMenu = ['筛选当前日期']
            this.timeShow = false
            setTimeout(()=>{
              this.dateShow = false
            },300)
            this.selectValue = []
          }
        }
        this.initDate(false)
      },
      settleAccounts(item){
        this.$dialog.confirm({
          tipValue: '是否确认已完善当前数据并且可以使用？',
          btnValueOk:'确认',
          btnValueCancel:'取消',
          width:'350',
          okCallBack: () => {
            this.ajaxJson({
              url: '/fix/fixCompanyOrder/save',
              data:{
                id:item.id,
                state:'1'
              },
              call: (data) => {
                if(data.type=='0'){
                  this.$dialog.alert({
                    tipValue:data.message,
                    closeCallBack: () => {
                      this.initDate()
                    }
                  })
                }else{
                  this.$dialog.alert({
                    width:'350',
                    alertImg: 'error',
                    tipValue:data.message,
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
          width: '1070',
          height: '750',
          url:'/pushRepairForm?id='+item.fixcompanyID,
          title:'查看推修公司信息',
          closeCallBack:(data) =>{
            this.initDate()
          }
        })
      },
      lookOverPerson(item){
        if(item.contactPersonID!=null&&item.contactPersonID!=''){
          this.$dialog.OpenWindow({
            width: '1070',
            height: '750',
            url:'/personView?id='+item.contactPersonID,
            title:'查看联系人信息',
            closeCallBack:(data) =>{
              this.initDate()
            }
          })
        }
      },
      lookOverCarOwner(item){
        if(item.carOwnerID!=null&&item.carOwnerID!=''){
          this.$dialog.OpenWindow({
            width: '1070',
            height: '750',
            url:'/personView?id='+item.carOwnerID,
            title:'查看车主信息',
            closeCallBack:(data) =>{
              this.initDate()
            }
          })
        }
      },
      maintain(item){
        this.$dialog.OpenWindow({
          width: '1070',
          height: '750',
          url:'/addPushCorporationForm?id='+item.id,
          title:'维护推修公司',
          closeCallBack:(data) =>{
            this.initDate()
          }
        })
      },
      lookOver(item){
        this.$dialog.OpenWindow({
          width: '1070',
          height: '750',
          url:'/collectionOfDataView?id='+item.orderID,
          title:'查看工单信息',
          closeCallBack:(data) =>{
            this.initDate()
          }
        })
      },
      rateSwitchover(item){
        this.$dialog.confirm({
            tipValue: '该工单的保险返费金额将会由非自保变为自保费率,是否确认？',
            btnValueOk:'确认',
            btnValueCancel:'取消',
            width:'550',
            okCallBack: () => {
              this.ajaxJson({
                url: '/fix/fixCompanyOrder/save',
                data:{
                  id:item.id,
                  type:'0'
                },
                call: (data) => {
                  if(data.type=='0'){
                    // this.$dialog.alert({
                    //   tipValue:data.message,
                    //   closeCallBack: () => {
                    //     this.initDate()
                    //   }
                    // })
                  }else{
                    this.$dialog.alert({
                      width:'350',
                      alertImg: 'error',
                      tipValue:data.message,
                      closeCallBack: () => {
                      }
                    })
                  }
                }
              })
            }
        })
      },
      initDate(init){
        let params = {
          pageIndex:this.pager.pageIndex,
          pageSize:this.pager.pageSize,
          companyID:this.companyPsd.value,
          searchStr:this.searchStr,
          type:this.typePsd.value,
          state:this.statePsd.value,
          dateType:this.dateTypeList.value=='9'?'':this.dateTypeList.value,
          startDateStr:this.startDateStr,//开始时间
          endDateStr:this.endDateStr,//结束时间
          applicableModels:this.applicableModelsPsd.value,
          stateStr:this.effectivenessPsd.value
        }
        this.ajaxJson({
            url: '/fix/fixCompanyOrder/queryForCompanyOrderManager',
            data:params,
            call: (data) => {
              this.content = data.content
              this.typeList = data.typePsd.list
              this.stateList = data.statePsd.list//状态
              this.applicableModelsList = data.applicableModelsPsd.list//车辆品牌
              this.companyPsd = data.companyPsd//推修公司
              this.pager.total = data.count
              this.totalList = data.total
              this.pager.total = data.count
              if(init==true){
                this.applicableModelsPsd = data.applicableModelsPsd//车辆品牌 筛选
                this.statePsd = data.statePsd//状态 筛选
                this.typePsd = data.typePsd//结算类型 筛选
                this.effectivenessPsd = data.effectivenessPsd//有效无效筛选
              }
              console.log(data)
            }
        })
      }
    },
    created () {
      this.initDate(true)
    }
  }
</script>

<style scoped>

</style>
