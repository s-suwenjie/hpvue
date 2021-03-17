<template>
    <div>
      <yhm-managerpage category="1" total-custom-width="802" :list-class-show="false" opera-lft-top="106px">
<!--        :overflow-show="true"-->
        <template #navigationTab>
          <router-link class="menuTabDiv" :to="{path:'/home/workOrderManager'}">工单管理</router-link>
          <router-link class="menuTabDiv menuTabActive" :to="{path:'/home/offlineWorkOrderManager'}">工单离线数据</router-link>
        </template>
        <!--操作区-->
        <template #operate>
          <yhm-commonbutton value="添加" icon="btnAdd" :flicker="true" @call="add()"></yhm-commonbutton>
          <!--          <yhm-commonbutton value="测试" icon="btnAdd" :flicker="true" @call="allTotalList()"></yhm-commonbutton>-->
          <yhm-commonbutton value="导入数据" icon="btnAdd" :flicker="true" @call="skipUploadFile()"></yhm-commonbutton>
<!--          <yhm-commonbutton value="选中开票" v-show="selectValue.length>0" icon=" " :flicker="true" @call="makeOutAnInvoice"></yhm-commonbutton>-->

          <yhm-commonbutton :value="choose?'收起筛选':'展开筛选'" :icon="choose?'btnUp':'btnDown'" @call="switchChoose()"></yhm-commonbutton>
          <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initData"></yhm-managersearch>
          <yhm-radiofilter @initData="dataTypeinitChoose('dateType')" title="时间类型" :content="dateTypeList"></yhm-radiofilter>
          <yhm-radiofilter style="margin-top: 8px;" @initData="initChoose('category')" title="工单分类" :content="categoryLists"></yhm-radiofilter>

          <div style="display: flex;justify-content: space-between;padding-top: 10px;box-sizing: border-box;">
            <yhm-form-date title="开始时间" width="200" :error-show="false" @call="dateSelection(startDateStr,endDateStr)" :value="startDateStr" id="startDateStr" position="t"></yhm-form-date>
            <yhm-form-date title="结束时间" width="200" :min="startDateStr" :error-show="false" @call="dateSelection(startDateStr,endDateStr)" :value="endDateStr" id="endDateStr" position="t"></yhm-form-date>
          </div>
        </template>
        <!--筛选区-->
        <template #choose>
          <div v-show="choose" class="buttonBody mptZero">
            <yhm-radiofilter  @initData="initChoose('jobtype')" title="作业分类" :content="jobtypeLists"></yhm-radiofilter>
            <yhm-radiofilter  @initData="initChoose('applicableModels')" title="品牌" :content="applicableModelsLists"></yhm-radiofilter>
          </div>
        </template>
        <template #video>
          <yhm-commonbutton :value="operationShow?'关闭操作视图':'操作视图'" icon=" " style="float: right;" @call="operationClick"></yhm-commonbutton>
          <yhm-commonbutton :value="browseShow?'关闭财务视图':'财务视图'" icon=" " style="float: right;" @call="browseClick"></yhm-commonbutton>
          <yhm-td-checkbox-show width="180px" value="----- 自定义查看列表 -----" :options-list="optionsList" :select-list="columnShow"></yhm-td-checkbox-show>
        </template>
        <!--数据表头-->
        <template #listHead>
          <yhm-managerth :show="columnShow[0]" width="38" title="选择"></yhm-managerth>
          <yhm-managerth :show="columnShow[1]" width="38" title="查看"></yhm-managerth>
          <yhm-managerth :show="columnShow[2]" width="100" title="接待日期" value="workDate"></yhm-managerth>
          <yhm-managerth :show="columnShow[3]"  width="85" title="接待人" value="principal"></yhm-managerth>
          <yhm-managerth :show="columnShow[4]"  width="120" title="其它系统编号" value="otherCode"></yhm-managerth>
          <yhm-managerth :show="columnShow[5]"  width="60" title="工单分类" value="category"></yhm-managerth>
          <yhm-managerth :show="columnShow[6]"  width="70" title="作业分类" value="jobtype"></yhm-managerth>
          <yhm-managerth :show="columnShow[7]"  width="70" title="车牌号" value="vehicle"></yhm-managerth>
          <yhm-managerth :show="columnShow[8]"  width="100" title="品牌" value="applicableModels"></yhm-managerth>
          <yhm-managerth :show="columnShow[9]"  width="95" title="车型" value=""></yhm-managerth>
          <yhm-managerth :show="columnShow[10]" width="85" title="客户名称" value="carOwner"></yhm-managerth>
          <yhm-managerth :show="columnShow[11]" width="85" title="联系人" value="contactPerson"></yhm-managerth>
<!--          <yhm-managerth :show="columnShow[12]" width="100" title="联系人手机号"></yhm-managerth>-->
          <yhm-managerth :show="columnShow[12]" width="60" title="保险公司" value="sub"></yhm-managerth>
          <yhm-managerth :show="columnShow[13]" width="258" title="付款方"></yhm-managerth>

          <yhm-managerth :show="columnShow[14]" width="100" :title="browseShow?'项目费 +':'项目费'" value="price"></yhm-managerth>
          <yhm-managerth :show="columnShow[15]" width="100" :title="browseShow?'材料费 =':'材料费'" value="amount"></yhm-managerth>
          <yhm-managerth :show="columnShow[16]" width="100" title="其它费用(税金)"></yhm-managerth>
          <yhm-managerth :show="columnShow[17]" width="100" title="合计金额" value="totalMoney"></yhm-managerth>

          <yhm-managerth :show="columnShow[18]" width="100" title="已收金额"></yhm-managerth>
          <yhm-managerth :show="columnShow[19]" width="100" title="未收金额"></yhm-managerth>

          <yhm-managerth :show="columnShow[20]" width="100" title="已开票金额"></yhm-managerth>
          <yhm-managerth :show="columnShow[21]" width="100" title="未开票金额"></yhm-managerth>
          <yhm-managerth :show="columnShow[22]"  width="110" title="交车日期" value="endDate"></yhm-managerth>
          <yhm-managerth :show="columnShow[23]" width="80" title="结算日期"></yhm-managerth>
<!--          <yhm-managerth :show="columnShow[23]" width="120" title="保险到期日"></yhm-managerth>-->
          <yhm-managerth :show="columnShow[24]" width="170" title="操作"></yhm-managerth>


<!--          <yhm-managerth :show="columnShow[19]" width="100" title="已开票金额"></yhm-managerth>-->
<!--          <yhm-managerth :show="columnShow[20]" width="100" title="未开票金额"></yhm-managerth>-->
<!--          <yhm-managerth :show="columnShow[21]"  width="110" title="交车日期" value="endDate"></yhm-managerth>-->
<!--          <yhm-managerth :show="columnShow[22]" width="80" title="结算日期"></yhm-managerth>-->
<!--          &lt;!&ndash;          <yhm-managerth :show="columnShow[23]" width="120" title="保险到期日"></yhm-managerth>&ndash;&gt;-->
<!--          <yhm-managerth :show="columnShow[23]" width="170" title="操作"></yhm-managerth>-->
        </template>
        <!--数据明细-->
        <template #listBody>
          <tr :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]" v-for="(item,index) in content" :key="index">
            <yhm-manager-td-checkbox :show="columnShow[0]" @call="checkboxChange" :value="item"></yhm-manager-td-checkbox>
            <yhm-manager-td-look :show="columnShow[1]" @click="listView(item)"></yhm-manager-td-look>
            <yhm-manager-td-date :show="columnShow[2]" :value="item.workDate" @click="lookOverPerson(item)" :menu-list="workDateMenu" @rightClick="offlineWorkOrderItem = item" @menuClick="workDateMenuClick"></yhm-manager-td-date>

            <yhm-manager-td-center :show="columnShow[3]" @click="lookOverReceiver(item)" v-if="item.principalID!=null&&item.principalID==''" :value="item.principal" :menu-list="principalMenu.indexOf('取消当前排除')!='-1'?['取消当前排除','需维护当前接待人信息']:['需维护当前接待人信息']" @rightClick="offlineWorkOrderItem = item" @menuClick="principalMenuClick"></yhm-manager-td-center>
            <yhm-manager-td-center :show="columnShow[3]" @click="lookOverReceiver(item)" v-else :value="item.principal" :menu-list="principalMenu" @rightClick="offlineWorkOrderItem = item" @menuClick="principalMenuClick"></yhm-manager-td-center>

            <yhm-manager-td-center :show="columnShow[4]" :value="item.otherCode"></yhm-manager-td-center>
            <yhm-manager-td-psd :show="columnShow[5]" :value="item.category" :list="categoryList"></yhm-manager-td-psd>

            <yhm-manager-td-psd :show="columnShow[6]" v-if="item.jobtype!='null'" :value="item.jobtype" :list="jobtypeList"></yhm-manager-td-psd>
            <yhm-manager-td-center :show="columnShow[6]" v-else value="-----"></yhm-manager-td-center>

            <yhm-manager-td-center :show="columnShow[7]" :value="item.vehicle" @click="lookOverVehicle(item)"></yhm-manager-td-center>
            <yhm-manager-td-psd :show="columnShow[8]" @click="lookOverVehicle(item)" :value="item.applicableModels" :list="applicableModelsList"></yhm-manager-td-psd>
            <yhm-manager-td-center :show="columnShow[9]" value=""></yhm-manager-td-center>

            <yhm-manager-td-center :show="columnShow[10]" :value="item.carOwner" v-if="item.carOwnerID!=null&&item.carOwnerID==''" @click="lookOverCarOwner(item)" :menu-list="carOwnerMenu.indexOf('取消当前排除')!='-1'?['取消当前排除','需维护当前客户信息']:['需维护当前客户信息']" @rightClick="offlineWorkOrderItem = item" @menuClick="carOwnerMenuClick"></yhm-manager-td-center>
            <yhm-manager-td-center :show="columnShow[10]" :value="item.carOwner" v-else @click="lookOverCarOwner(item)" :menu-list="carOwnerMenu" @rightClick="offlineWorkOrderItem = item" @menuClick="carOwnerMenuClick"></yhm-manager-td-center>

            <yhm-manager-td-center :show="columnShow[11]" :value="item.contactPerson" v-if="item.contactPersonID!=null&&item.contactPersonID==''" @click="lookOverPerson(item)" :menu-list="contactPersonMenu.indexOf('取消当前排除')!='-1'?['取消当前排除','需维护当前联系人信息']:['需维护当前联系人信息']" @rightClick="offlineWorkOrderItem = item" @menuClick="contactPersonMenuClick"></yhm-manager-td-center>
            <yhm-manager-td-center :show="columnShow[11]" :value="item.contactPerson" v-else @click="lookOverPerson(item)" :menu-list="contactPersonMenu" @rightClick="offlineWorkOrderItem = item" @menuClick="contactPersonMenuClick"></yhm-manager-td-center>

<!--            <yhm-manager-td-center :show="columnShow[12]" :value="item.phone" format="phone*"></yhm-manager-td-center>-->
            <yhm-manager-td-center :show="columnShow[12]" :value="item.sub" @click="lookOverSub(item)"></yhm-manager-td-center>

            <yhm-manager-td-center :show="columnShow[13]" :value="item.payment"></yhm-manager-td-center>

            <yhm-manager-td-money :show="columnShow[14]" @click="moneyDetailsClick(item,'0')" :value="item.price" style="color: #0012FB;"></yhm-manager-td-money>
            <yhm-manager-td-money :show="columnShow[15]" @click="moneyDetailsClick(item,'1')" :value="item.amount" style="color:#008f8d;"></yhm-manager-td-money>
            <yhm-manager-td :show="columnShow[16]" value=""></yhm-manager-td>
            <yhm-manager-td-money :show="columnShow[17]" @click="moneyDetailsClick(item,'2')" :value="item.totalMoney" style="color: #fd6802;"></yhm-manager-td-money>

            <yhm-manager-td-center :show="columnShow[18]" v-if="item.receivedMoney==''" :value="item.receivedMoney"></yhm-manager-td-center>
            <yhm-manager-td-money :show="columnShow[18]" @click="moneyDetailsClick(item,'3')" v-else :value="item.receivedMoney" :style="{color:Number(item.totalMoney)==Number(item.receivedMoney)?'#00bb6b':'#49a9ea'}"></yhm-manager-td-money>

            <yhm-manager-td-center :show="columnShow[19]" v-if="item.uncollectedMoney==''" :value="item.uncollectedMoney"></yhm-manager-td-center>
            <yhm-manager-td-money :show="columnShow[19]" v-else :value="item.uncollectedMoney" style="color: #f00;"></yhm-manager-td-money>

            <yhm-manager-td-center :show="columnShow[20]" :value="item.finrest" v-if="item.finrest==''"></yhm-manager-td-center>
            <yhm-manager-td-money :show="columnShow[20]" v-else :value="item.finrest" style="color: #008f8d;"></yhm-manager-td-money>

<!--            <yhm-manager-td-money :show="columnShow[20]" v-if="item.finresult" :value="item.finresult"></yhm-manager-td-money>-->
            <yhm-manager-td-money :show="columnShow[21]" @click="notInvoicedClick(item)" :value="item.finresult" :style="{color: item.paymentid!=''?'#00bb6b':'#0012FB'}"></yhm-manager-td-money>

            <yhm-manager-td-date :show="columnShow[22]" :value="item.endDate"></yhm-manager-td-date>
            <yhm-manager-td-date :show="columnShow[23]" value="-----"></yhm-manager-td-date>
<!--            <yhm-manager-td-date :show="columnShow[23]" :value="item.endDate"></yhm-manager-td-date>-->
            <yhm-manager-td-operate :show="columnShow[24]">
<!--              :sticky-right-show="true"-->
              <yhm-manager-td-operate-button icon="i-btn-applicationSm" v-if="item.isYu=='0'&&item.paymentid!=null&&item.paymentid!=''&&Number(item.finresult)>0" value="预开发票" @click="invoiceApplyFor(item)" color="#c700df"></yhm-manager-td-operate-button>
              <yhm-manager-td-operate-button icon="i-btn-applicationSm" v-if="item.isYu=='1'&&item.dependids!=null&&item.dependids!=''&&item.isFlag!='2'&&Number(item.finresult)>0" value="开票申请" @click="invoiceClick(item)" color="#49a9ea"></yhm-manager-td-operate-button>
              <yhm-manager-td-operate-button icon="i-btn-applicationSm" v-if="item.isFlag!='0'" value="查看开票" @click="viewOpenInvoice(item)" color="#711ada"></yhm-manager-td-operate-button>

            </yhm-manager-td-operate>
            <!--<yhm-manager-td-center :value="item.principal" @click="lookOverPrincipal(item)"></yhm-manager-td-center>-->

<!--            <yhm-manager-td-psd :show="columnShow[5]" :value="item.category" :list="categoryList"></yhm-manager-td-psd>-->

<!--            <yhm-manager-td-psd :show="columnShow[6]" v-if="item.jobtype!='null'" :value="item.jobtype" :list="jobtypeList"></yhm-manager-td-psd>-->
<!--            <yhm-manager-td-center :show="columnShow[6]" v-else value="-&#45;&#45;&#45;&#45;"></yhm-manager-td-center>-->

<!--            <yhm-manager-td-center :show="columnShow[7]" :value="item.vehicle" @click="lookOverVehicle(item)"></yhm-manager-td-center>-->
<!--            <yhm-manager-td-psd :show="columnShow[8]" @click="lookOverVehicle(item)" :value="item.applicableModels" :list="applicableModelsList"></yhm-manager-td-psd>-->
<!--            <yhm-manager-td-center :show="columnShow[9]" value=""></yhm-manager-td-center>-->
          </tr>
        </template>
        <!--数据空提示-->
        <template #empty>
          <span class="m_listNoData" v-show="empty">暂时没有数据</span>
        </template>
        <template #total>
          <div class="listTotalCrente m_list" style="width: 802px;margin: auto;">
            <table width="100%" cellpadding="0" cellspacing="0" class="m_content_table m_content_total_table">
              <thead>
              <tr>
                <yhm-managerth style="width: 100px;" before-color="#000" title="" before-title="总条数" ></yhm-managerth>
                <yhm-managerth style="width: 100px;" before-color="#0012FB" title="" before-title="项目金额" ></yhm-managerth>
                <yhm-managerth style="width: 100px;" before-color="#008f8d" title="" before-title="配件金额" ></yhm-managerth>
                <yhm-managerth style="width: 100px;" before-color="#fd6802" title="" before-title="合计金额"></yhm-managerth>
                <yhm-managerth style="width: 100px;" before-color="#00bb6b" title="" before-title="已收金额"></yhm-managerth>
                <yhm-managerth style="width: 100px;" before-color="#f00" title="" before-title="未收金额"></yhm-managerth>
                <yhm-managerth style="width: 100px;" before-color="#00bb6b" title="" before-title="已开金额"></yhm-managerth>
                <yhm-managerth style="width: 100px;" before-color="#49a9ea" title="" before-title="未开金额"></yhm-managerth>
              </tr>
              </thead>
              <tbody>
              <tr>
                <yhm-manager-td-rgt style="color: #000;" :value="count+''"></yhm-manager-td-rgt>
                <yhm-manager-td-money :loading="loading" :transition-show="true" style="color: #0012FB;" :value="totalList[0].money"></yhm-manager-td-money>
                <yhm-manager-td-money :loading="loading" :transition-show="true" style="color: #008f8d;" :value="totalList[1].money"></yhm-manager-td-money>
                <yhm-manager-td-money :loading="loading" :transition-show="true" style="color: #fd6802;" :value="totalList[2].money"></yhm-manager-td-money>

                <yhm-manager-td-money :loading="loading" :transition-show="true" style="color: #00bb6b;" :value="totalList[5].money"></yhm-manager-td-money>

                <yhm-manager-td-money :loading="loading" :transition-show="true" style="color: #f00;" :value="totalList[6].money"></yhm-manager-td-money>
                <yhm-manager-td-money :loading="loading" :transition-show="true" style="color: #00bb6b;" :value="totalList[3].money"></yhm-manager-td-money>
                <yhm-manager-td-money :loading="loading" :transition-show="true" style="color: #49a9ea;" :value="totalList[4].money"></yhm-manager-td-money>
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
<!--      -->
    </div>
</template>
<script>
  import { managermixin } from '@/assets/manager.js'
  import { guid,formatDate} from '@/assets/common.js'
  export default {
    name: 'offlineWorkOrderManager',
    mixins: [managermixin],
    data(){
      return{
        loading:false,
        count:'0',//总条数
        inTheDayTime:formatDate(new Date()),//当前时间
        startDateStr:'',//开始时间
        endDateStr:'',//结束时间
        incluPrincipalID:'',//筛选接待人
        excluPrincipalID:'',//排除接待人
        inclucarOwnerID:'',//筛选客户
        exclucarOwnerID:'',//排除客户
        offersudetailList:[],//收支明细数据
        incluContactPersonID:'',//筛选联系人
        excluContactPersonID:'',//排除联系人
        workDateMenu:['筛选当前日期','取消所有筛选'],//接待时间查询
        principalMenu:['筛选当前接待人','排除当前接待人','取消所有筛选'],//接待人右键菜单内容
        carOwnerMenu:['筛选当前客户','排除当前客户','取消所有筛选'],//客户右键菜单内容
        contactPersonMenu:['筛选当前联系人','排除当前联系人','取消所有筛选'],//联系人右键菜单内容
        offlineWorkOrderItem:'',//右键选中的数据
        openInvoiceMainID:'',
        optionsList:['选择','查看','接待日期','接待人','其它系统编号','工单分类','作业分类','车牌号','品牌','车型','客户名称','联系人',
          '保险公司','付款方','项目费','材料费','其它费用','合计金额','已收金额','未收金额','已开票金额','未开票金额','交车日期','结算日期','操作'],
        columnBackups:[true,true,true,false,false,true,true,true,false,false,true,true,
          false,true,false,false,false,false,true,true,true,true,false,false,true],
        columnShow:[true,true,true,false,false,true,true,true,false,false,true,true,
          false,true,false,false,false,false,true,true,true,true,false,false,true],
        browseShow:false,//浏览视图
        operationShow:false,//操作视图
        list:[],//选中的数据
        jobtypeList:[],//作业分类
        jobtypeLists:{
          list:[],
          value:''
        },//作业分类筛选
        categoryLists:{
          list:[],
          value:''
        },//工单分类筛选
        applicableModelsLists:{
          list:[],
          value:''
        },//品牌筛选
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
        ],//汇总数据
        dateType:'',
        dateTypeList: {
          value: '',
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
          ]
        },
        applicableModelsList:[],//品牌
        stateList:[],//状态
        categoryList:[],//维修类型
      }
    },
    // watch:{
    //   dateType(value,newValue){
    //     console.log(value,newValue)
    //   }
    // },
    methods:{
      checkboxChange(selectValue,item){
        let id = []
        this.list = []
        if(item.paymentid!=null&&item.paymentid!=''){
          for(let i=0; i<=selectValue.length; i++){
            id.push(selectValue[i])
          }
          for(let j in this.content){
            if(id.indexOf(this.content[j].id)!=-1){
              this.list.push(this.content[j])
            }
          }
        }else{
          this.$dialog.alert({
            tipValue: '当前数据未维护付款方',
            alertImg: 'warn',
            width: '350',
            closeCallBack () {
              for(let k in selectValue){
                if(selectValue[k]==item.id){
                  selectValue.splice(k,1)
                }
              }
            }
          })
        }
        console.log(this.list)
      },
      makeOutAnInvoice(item){
        if(item){
          this.list = []
          this.list.push(item)
        }
        this.ajaxJson({
          url: '/fix/Offer/getTotalMoney',
          data: {
            offlinelist:this.list
          },
          call: (data) => {
            if(data){
              sessionStorage.offlineWorlOrderTicketFormList = JSON.stringify(this.list)//选中的工单数据
              // sessionStorage.offlineWorlOrderTicketForm = JSON.stringify(data)//返回的收支明细和工单
              this.$dialog.OpenWindow({
                width: '1070',
                height: '800',
                url:'/offlineWorlOrderTicketForm',
                title:'开票',
                closeCallBack:(dt) =>{
                  if(dt){
                    this.initPageData(false)
                  }
                }
              })
            }
          }
        })
      },
      notInvoicedClick(item){
        if(item.isYu=='0'&&item.paymentid!=null&&item.paymentid!=''&&Number(item.finresult)>0){//预开票
          this.invoiceApplyFor(item)
          return
        }else if(item.isYu=='1'&&item.dependids!=null&&item.dependids!=''&&item.isFlag!='2'&&Number(item.finresult)>0){
          this.invoiceClick(item)
          return
        }else if(item.isFlag!='0'){//查看发票
          return
        }else{
          this.$dialog.confirm({
            width: 400,
            tipValue: '当前数据需要维护后方可开票,是否前往维护？',
            btnValueOk: '确认',
            btnValueCancel: '取消',
            alertImg: 'warn',
            okCallBack: () => {
              this.$dialog.OpenWindow({
                width: '1070',
                height: '750',
                url:'/offlineWorkOrderForm?id='+item.id,
                title:'维护离线工单信息',
                closeCallBack:(data) =>{
                  if(data){
                    this.initPageData(false,true)
                      // this.$dialog.confirm({
                      //   width: 400,
                      //   tipValue: '工单数据维护成功,是否前往开票？',
                      //   btnValueOk: '实开',
                      //   btnValueCancel: '取消',
                      //   alertImg: 'warn',
                      //   okCallBack: () => {
                      //     this.invoiceClick(item)
                      //   },
                      //   cancelCallBack:(data) =>{
                      //     this.invoiceApplyFor(item)
                      //   }
                      // })
                      // this.makeOutAnInvoice(item)
                  }
                }
              })
            }
          })
        }
      },
      allTotalList(){
        this.loading = true
        this.ajaxJson({
          loading:'0',
          url: '/fix/Offer/receivedAmount',
          data: {
            startDateStr:this.startDateStr,//开始时间
            endDateStr:this.endDateStr,//结束时间
            jobtype:this.jobtypeLists.value,
            dateType:this.dateTypeList.value,
            category:this.categoryLists.value,
            incluPrincipalID:this.incluPrincipalID,//筛选接待人
            excluPrincipalID:this.excluPrincipalID,//排除接待人
            inclucarOwnerID:this.inclucarOwnerID,//筛选客户
            exclucarOwnerID:this.exclucarOwnerID,//排除客户
            incluContactPersonID:this.incluContactPersonID,//筛选联系人
            excluContactPersonID:this.excluContactPersonID,//排除联系人
            applicableModels:this.applicableModelsLists.value,
          },
          call: (data) => {
            if(data){
              this.totalList = data.totalList
              this.loading = false
            }
          }
        })
        // this.$nextTick(()=>{
        //   setInterval(()=>{
        //     this.loading=!this.loading
        //   },3000)
        // })
      },
      initChoose(){
        this.initPageData(false,true)
      },
      browseClick(){//财务模式
        this.columnShow = this.columnBackups.concat()
        this.operationShow = false
        this.browseShow = !this.browseShow
        if(this.browseShow){
          this.columnShow = [
            true,//选择
            true,//查看
            true,//接待日期
            false,//接待人
            false,//工单号
            false,//工单分类
            false,//作业分类
            true,//车牌号
            false,//品牌
            false,//车型
            true,//客户名称
            false,//联系人
            true,//保险公司
            true,//付款方
            true,//项目费
            true,//材料费
            false,//其它费用
            true,//合计金额
            true,//已收金额
            true,//未收金额
            true,//优惠金额
            true,//应结金额
            false,//交车日期
            false,//结算日期
            true,//操作
          ]
        }

        // this.operationShow = true
        // this.browseShow = !this.browseShow
      },
      operationClick(){//操作模式
        this.columnShow = this.columnBackups.concat()
        this.browseShow = false
        this.operationShow=!this.operationShow
        if(this.operationShow){
          this.columnShow = [
            true,//选择
            true,//查看
            true,//接待日期
            true,//接待人
            true,//工单号
            true,//工单分类
            true,//作业分类
            true,//车牌号
            true,//品牌
            false,//车型
            true,//客户名称
            true,//联系人
            true,//保险公司
            true,//付款方
            false,//项目费
            false,//材料费
            false,//其它费用
            false,//合计金额
            false,//已收金额
            false,//未收金额
            false,//优惠金额
            false,//应结金额
            true,//交车日期
            false,//结算日期
            true,//操作
          ]
        }
        // this.browseShow = true
        // this.operationShow = !this.operationShow
      },
      skipUploadFile(){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '750',
          url:  '/workOrderUploadFile?id=1',
          title: '导入离线数据',
          closeCallBack:(data) =>{
            this.initPageData(false)
          }
        })
      },
      dataTypeinitChoose(){
        this.startDateStr=''//开始时间
        this.endDateStr=''//结束时间
        this.initPageData(false,true)
      },
      dateSelection(start,finish){//选择时间段
        if(start!=''&&finish!=''){
          this.dateTypeList.value=''
          this.initPageData(false,true)
        }
      },
      moneyDetailsClick(item,type){
        let title = ''
        let url = ''
        if(type=='0'&&Number(item.price)>0){//项目费
          title = '查看项目费详情'
        }else if(type=='1'&&Number(item.amount)>0){//材料费
          title = '查看材料费详情'
        }else if(type=='2'&&Number(item.totalMoney)>0){//合计金额
          title = '查看合计金额详情'
        }else if(type=='3'&&Number(item.receivedMoney)>0){//已收金额
          title = '查看已收金额详情'
        }else{
          return
        }
        if(type=='3'){
          title = '查看详情'
          url = '/offlineWorkOrderDetailForm?otherCode='+item.otherCode
          this.ajaxJson({
            url: '/Fin/getBankDetailInsuranceData',
            loading:'0',
            data: {
              bankID: "",
              customerName: "",
              dateType: "",
              endDate: "",
              init: false,
              licensePlateNumber: "",
              openInvoiceType: "",
              operatorID: "",
              order: "desc",
              orderColumn: "insertDate",
              pageIndex: 1,
              pageSize: 15,
              searchStr: item.otherCode,
              signState: "",
              startDate: "",
              type: "",
              unitID: "",
              vehicleBrand: "",
              workOrderID: ""
            },
            call: (data) => {
              if(data){
                if(data.count=='0'){
                  return
                }
              }
            }
          })
        }else{
          url = '/offlineWorkOrderView?id='+item.id+'&type='+type
        }
        console.log(item.otherCode,type)


        // if(item.isFlag=='1'||item.isFlag=='2'||type=='3'){
        // }else{
          // url = '/offlineWorkOrderForm?id='+item.id+'&type='+type
        // }
        this.$dialog.OpenWindow({
          width: '1050',
          height: '750',
          url:url,
          title:title,
          closeCallBack:(data) =>{
            this.initPageData(false)
          }
        })
      },
      principalMenuClick(item,index){//右键点击 当前接待人
        this.pager.pageIndex = '1'
        if(item=='需维护当前接待人信息'){
          this.$dialog.OpenWindow({
            width: '1070',
            height: '750',
            url:'/offlineWorkOrderForm?id='+this.offlineWorkOrderItem.id,
            title:'维护离线工单接待人信息',
            closeCallBack:(data) =>{
              if(data){
                this.initPageData(false)
              }
            }
          })
          return
        }
        if(item=='筛选当前接待人'){
          this.incluPrincipalID = this.offlineWorkOrderItem.principalID
          this.initPageData(false)
          this.principalMenu = ['取消当前筛选','取消所有筛选']
        }else if(item=='取消当前筛选'){
          this.incluPrincipalID = ''
          this.initPageData(false)
          this.principalMenu = ['筛选当前接待人','排除当前接待人','取消所有筛选']
        }else if(item=='排除当前接待人'){
          this.excluPrincipalID = this.offlineWorkOrderItem.principalID
          this.principalMenu = ['筛选当前接待人','取消当前排除','取消所有筛选']
          this.initPageData(false)
        }else if(item=='取消当前排除'){
          this.excluPrincipalID = ''
          this.initPageData(false)
          this.principalMenu = ['筛选当前接待人','排除当前接待人','取消所有筛选']
        }else if(item=='取消所有筛选'){
          this.startDateStr = ''//开始时间
          this.endDateStr = ''//结束时间
          this.incluPrincipalID = ''//筛选接待人
          this.excluPrincipalID = ''//排除接待人
          this.inclucarOwnerID = ''//筛选客户
          this.exclucarOwnerID = ''//排除客户
          this.incluContactPersonID = ''//筛选联系人
          this.excluContactPersonID = ''//排除联系人
          this.principalMenu = ['筛选当前接待人','排除当前接待人','取消所有筛选']
          this.initPageData(false)
        }
      },
      workDateMenuClick(item,index){//右键点击 当前日期
        if(item=='筛选当前日期'){
          this.workDateMenu=['取消日期筛选','取消所有筛选']//接待时间查询
          this.startDateStr = this.offlineWorkOrderItem.workDate//开始时间
          this.endDateStr = this.offlineWorkOrderItem.workDate//结束时间
          this.initPageData(false)
        }else if(item=='取消日期筛选'){
          this.workDateMenu=['筛选当前日期','取消所有筛选']//接待时间查询
          this.startDateStr = ''//开始时间
          this.endDateStr = ''//结束时间
          this.initPageData(false)
        }else if(item=='取消所有筛选'){
          this.startDateStr = ''//开始时间
          this.endDateStr = ''//结束时间
          this.incluPrincipalID = ''//筛选接待人
          this.excluPrincipalID = ''//排除接待人
          this.inclucarOwnerID = ''//筛选客户
          this.exclucarOwnerID = ''//排除客户
          this.incluContactPersonID = ''//筛选联系人
          this.excluContactPersonID = ''//排除联系人
          this.workDateMenu = ['筛选当前日期','取消所有筛选']
          this.initPageData(false)
        }
      },
      carOwnerMenuClick(item,index){//右键点击 当前客户
        this.pager.pageIndex = '1'
        if(item=='需维护当前客户信息'){
          this.$dialog.OpenWindow({
            width: '1070',
            height: '750',
            url:'/offlineWorkOrderForm?id='+this.offlineWorkOrderItem.id,
            title:'维护离线工单客户信息',
            closeCallBack:(data) =>{
              if(data){
                this.initPageData(false)
              }
            }
          })
          return
        }
        if(item=='筛选当前客户'){
          this.inclucarOwnerID = this.offlineWorkOrderItem.carOwnerID
          this.initPageData(false)
          this.carOwnerMenu = ['取消当前筛选','取消所有筛选']
        }else if(item=='取消当前筛选'){
          this.inclucarOwnerID = ''
          this.initPageData(false)
          this.carOwnerMenu = ['筛选当前客户','排除当前客户','取消所有筛选']
        }else if(item=='排除当前客户'){
          this.exclucarOwnerID = this.offlineWorkOrderItem.carOwnerID
          this.carOwnerMenu = ['筛选当前客户','取消当前排除','取消所有筛选']
          this.initPageData(false)
        }else if(item=='取消当前排除'){
          this.exclucarOwnerID = ''
          this.initPageData(false)
          this.carOwnerMenu = ['筛选当前客户','排除当前客户','取消所有筛选']
        }else if(item=='取消所有筛选'){
          this.startDateStr = ''//开始时间
          this.endDateStr = ''//结束时间
          this.incluPrincipalID = ''//筛选接待人
          this.excluPrincipalID = ''//排除接待人
          this.inclucarOwnerID = ''//筛选客户
          this.exclucarOwnerID = ''//排除客户
          this.incluContactPersonID = ''//筛选联系人
          this.excluContactPersonID = ''//排除联系人
          this.carOwnerMenu = ['筛选当前客户','排除当前客户','取消所有筛选']
          this.initPageData(false)
        }
      },
      contactPersonMenuClick(item,index){//右键点击 当前联系人
        this.pager.pageIndex = '1'
        if(item=='需维护当前联系人信息'){
          this.$dialog.OpenWindow({
            width: '1070',
            height: '750',
            url:'/offlineWorkOrderForm?id='+this.offlineWorkOrderItem.id,
            title:'维护离线工单联系人信息',
            closeCallBack:(data) =>{
              if(data){
                this.initPageData(false)
              }
            }
          })
          return
        }
        if(item=='筛选当前联系人'){
          this.incluContactPersonID = this.offlineWorkOrderItem.contactPersonID
          this.initPageData(false)
          this.contactPersonMenu = ['取消当前筛选','取消所有筛选']
        }else if(item=='取消当前筛选'){
          this.incluContactPersonID = ''
          this.initPageData(false)
          this.contactPersonMenu = ['筛选当前联系人','排除当前联系人','取消所有筛选']
        }else if(item=='排除当前联系人'){
          this.excluContactPersonID = this.offlineWorkOrderItem.contactPersonID
          this.contactPersonMenu = ['筛选当前联系人','取消当前排除','取消所有筛选']
          this.initPageData(false)
        }else if(item=='取消当前排除'){
          this.excluContactPersonID = ''
          this.initPageData(false)
          this.contactPersonMenu = ['筛选当前联系人','排除当前联系人','取消所有筛选']
        }else if(item=='取消所有筛选'){
          this.startDateStr = ''//开始时间
          this.endDateStr = ''//结束时间
          this.incluPrincipalID = ''//筛选接待人
          this.excluPrincipalID = ''//排除接待人
          this.inclucarOwnerID = ''//筛选客户
          this.exclucarOwnerID = ''//排除客户
          this.incluContactPersonID = ''//筛选联系人
          this.excluContactPersonID = ''//排除联系人
          this.contactPersonMenu = ['筛选当前联系人','排除当前联系人','取消所有筛选']
          this.initPageData(false)
        }
      },
      // menuClick(item,index){//右键点击的选项和索引值
      //   if(item=='需维护当前接待人信息后方可操作'||item=='需维护当前客户信息后方可操作'||item=='需维护当前联系人信息后方可操作'){
      //     this.$dialog.OpenWindow({
      //       width: '1070',
      //       height: '750',
      //       url:'/offlineWorkOrderForm?id='+item.id,
      //       title:'编辑工单',
      //       closeCallBack:(data) =>{
      //         if(data){
      //           this.initPageData(false)
      //         }
      //       }
      //     })
      //   }
      //
      // },
      viewOpenInvoice(item){
        let ownerID = ''
        if(item.isYu=='0'){
          ownerID = item.id
        }else{
          ownerID = item.dependids
        }
        this.$dialog.OpenWindow({
          width: '750',
          height: '390',
          title: '查看开票申请信息',
          url: '/claimsOpenInvoice?ownerID=' + ownerID,
          closeCallBack: (data) => {
            if(data){
              this.initPageData(false)
            }
          }
        })
      },
      invoiceApplyFor(item){//预开票
        if(item.paymentid==''||item.paymentid==null) {
          this.$dialog.confirm({
            alertImg: 'warn',
            width: '330',
            tipValue: '需要维护付款方后才可开票',
            btnValueOk: '维护',
            btnValueCancel: '取消',
            okCallBack: () => {
              this.$dialog.OpenWindow({
                width: '1070',
                height: '750',
                url: '/offlineWorkOrderForm?id=' + item.id,
                title: '编辑工单',
                closeCallBack: (data) => {
                  if (data) {
                    this.initPageData(false)
                  }
                }
              })
            }
          })
        }else{
          this.openInvoiceMainID=guid()
          let params = {
            id:item.id,
            ownerID:this.openInvoiceMainID,
            money:item.finresult
          }
          this.ajaxJson({
            url: '/Fin/openInvoiceListOffLineSave',
            data: params,
            call: () => {
              this.$dialog.OpenWindow({
                width: '1050',
                height: '790',
                title: '添加开票申请信息',
                url: '/openInvoiceForm?isAdd=true&ownerID=' + this.openInvoiceMainID + '&ownerCategory=4&purchaserID='+item.paymentid+'&purchaserType='+item.personal,
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
          })
        }
        // }else{
        //   this.ajaxJson({
        //     url: '/fix/Offer/getTotalMoney',
        //     data: {
        //       offlinelist:[item]
        //     },
        //     call: (data) => {
        //     }
        //   })
        //   return
        //   this.$dialog.OpenWindow({
        //     width: '1070',
        //     height: '750',
        //     url:'/offlineWorlOrderTicketForm',
        //     title:'开票',
        //     closeCallBack:(data) =>{
        //       if(data){
        //         this.initPageData(false)
        //       }
        //     }
        //   })
        // }

      },
      invoiceClick(item){
        if(item.paymentid==''||item.paymentid==null){
          this.$dialog.confirm({
            alertImg: 'warn',
            width: '330',
            tipValue: '需要维护付款方后才可开票',
            btnValueOk:'维护',
            btnValueCancel:'取消',
            okCallBack: () => {
              this.$dialog.OpenWindow({
                width: '1070',
                height: '750',
                url:'/offlineWorkOrderForm?id='+item.id,
                title:'编辑工单',
                closeCallBack:(data) =>{
                  if(data){

                  }
                }
              })
            }
          })
        }else{
          this.openInvoiceMainID=guid()
          let detailList = item.dependids.split(',')
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
        }

        // this.$dialog.OpenWindow({
        //   width: '1070',
        //   height: '750',
        //   url:'/workOrderInvoiceForm',
        //   title:'开票申请',
        //   closeCallBack:(data) =>{
        //     this.initPageData(false)
        //
        //   }
        // })
      },
      lookOverReceiver(item){//接待人
        if(item.clientID!=''){
          this.$dialog.OpenWindow({
            width: '1070',
            height: '750',
            url:'/personView?id='+item.clientID,
            title:'查看接待人信息',
            closeCallBack:(data) =>{
              this.initPageData(false)

            }
          })
        }
      },
      lookOverCarOwner(item){//查看车主
        if(item.carOwnerID!=''){
          this.$dialog.OpenWindow({
            width: '1070',
            height: '750',
            url:'/personView?id='+item.carOwnerID,
            title:'查看车主信息',
            closeCallBack:(data) =>{
              this.initPageData(false)
            }
          })
        }else{
          // this.$dialog.alert({
          //   tipValue:'当前车主未被记录',
          //   alertImg:'warn',
          //   width:'330'
          // })
        }
      },
      lookOverSub(item) {//查看保险公司
        if(item.subid!=''){
          this.$dialog.OpenWindow({
            width: '1070',
            height: '750',
            url:'/unitView?id='+item.subid,
            title:'查看保险公司信息',
            closeCallBack:(data) =>{
              this.initPageData(false)

            }
          })
        }
      },
      lookOverPrincipal(item){//查看负责人信息
        if(item.principalID!=''){
          this.$dialog.OpenWindow({
            width: '1070',
            height: '750',
            url:'/personView?id='+item.principalID,
            title:'查看联系人信息',
            closeCallBack:(data) =>{
              this.initPageData(false)

            }
          })
        }else{
          // this.$dialog.alert({
          //   tipValue:'当前负责人未被记录',
          //   alertImg:'warn',
          //   width:'330'
          // })
        }
      },
      lookOverPerson(item){//查看联系人信息
        if(item.contactPersonID!=''){
          this.$dialog.OpenWindow({
            width: '1070',
            height: '750',
            url:'/personView?id='+item.contactPersonID,
            title:'查看联系人信息',
            closeCallBack:(data) =>{
              this.initPageData(false)

            }
          })
        }else{
          // this.$dialog.alert({
          //   tipValue:'当前联系人未被记录',
          //   alertImg:'warn',
          //   width:'330'
          // })
        }
      },
      lookOverVehicle(item){//查看车辆信息
        this.$dialog.OpenWindow({
          width: '1070',
          height: '750',
          url:'/vehicleView?plate='+item.vehicle+'&type=1',
          title:'查看车辆信息',
          closeCallBack:(data) =>{
            this.initPageData(false)
          }
        })
      },
      add(){
        this.$dialog.OpenWindow({
          width: '1070',
          height: '750',
          url:'/offlineWorkOrderForm?add=1',
          title:'添加工单',
          closeCallBack:(data) =>{
            this.initPageData(false)
          }
        })
      },
      listView(item){
        let url = ''
        let title = ''
        if(item.isFlag=='1'||item.isFlag=='2'){
          url = '/offlineWorkOrderView?id='+item.id
          title = '查看离线工单详情'
        }else{
          url = '/offlineWorkOrderForm?id='+item.id
          title = '编辑离线工单详情'
        }
        this.$dialog.OpenWindow({
          width: '1070',
          height: '750',
          url:url,
          title:title,
          closeCallBack:(data) =>{
            this.initPageData(false)
          }
        })
      },
      initPageData (initValue,totalShow) {
        let params = {}
        if (initValue) {
          params = {
            orderColumn:'workDate',
            order:'desc'
          }
        } else {
          params = {
            startDateStr:this.startDateStr,//开始时间
            endDateStr:this.endDateStr,//结束时间
            jobtype:this.jobtypeLists.value,
            dateType:this.dateTypeList.value,
            category:this.categoryLists.value,
            incluPrincipalID:this.incluPrincipalID,//筛选接待人
            excluPrincipalID:this.excluPrincipalID,//排除接待人
            inclucarOwnerID:this.inclucarOwnerID,//筛选客户
            exclucarOwnerID:this.exclucarOwnerID,//排除客户
            incluContactPersonID:this.incluContactPersonID,//筛选联系人
            excluContactPersonID:this.excluContactPersonID,//排除联系人
            applicableModels:this.applicableModelsLists.value,
          }
        }
        this.init({
          initValue:initValue,
          url: '/fix/Offer/getManager',
          data:params,
          all:(data) =>{
            //不管是不是初始化都需要执行的代码
            // this.totalList = data.totalList
            this.count = data.count
            if(initValue||totalShow){
              this.allTotalList()
            }
            // if(type){//维护后触发刷新
            //   this.invoiceClick(item)
            // }
          },
          init:(data)=>{
            //初始化时需要执行的代码
            // 这边初始化筛选信息
            this.offersudetailList = data.offersudetailList
            this.applicableModelsList = data.applicableModelsPsd.list
            this.applicableModelsLists = data.applicableModelsPsd

            this.stateList = data.statePsd.list
            this.categoryList = data.categoryPsd.list
            this.categoryLists = data.categoryPsd

            this.jobtypeList = data.jobtypePsd.list
            this.jobtypeLists = data.jobtypePsd

          }
        })

      }
    },
    created () {

    }
  }
</script>

<style scoped>

</style>
