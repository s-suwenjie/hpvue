<template>
    <div>
      <yhm-managerpage  category="1">
<!--        @statisticalClick="statisticalClick" :statisticalShow="true"-->
        <!--导航条-->
        <template #navigationTab>
          <router-link class="menuTabDiv menuTabActive" :to="{path:'/home/workOrderManager'}">工单管理</router-link>
          <router-link class="menuTabDiv" :to="{path:'/home/offlineWorkOrderManager'}">工单离线数据</router-link>
        </template>
        <!--操作区-->
        <template #operate>
<!--          <yhm-commonbutton value="打印结账单" icon="btnAdd" :flicker="true" @call="printClick()"></yhm-commonbutton>-->
<!--          <yhm-form-text title="category" :value="category" id="category"></yhm-form-text>-->
<!--          <yhm-form-text title="modelid" :value="modelid" id="modelid"></yhm-form-text>-->
<!--          <yhm-form-text title="productid" :value="productid" id="productid"></yhm-form-text>-->
<!--          <yhm-form-text title="applicableModels" :value="applicableModels" id="applicableModels"></yhm-form-text>-->

          <yhm-commonbutton value="工单打印"  icon="btnAdd" :flicker="true" @call="shuibian" category="one"></yhm-commonbutton>
          <!--<yhm-commonbutton value="添加" icon="btnAdd" :flicker="true" @call="add()"></yhm-commonbutton>-->
          <!--<yhm-commonbutton value="添加工单入口" icon="btnAdd" :flicker="true" @call="addWordOrder()"></yhm-commonbutton>-->
          <yhm-commonbutton :value="choose?'收起筛选':'展开筛选'" :icon="choose?'btnUp':'btnDown'" @call="switchChoose()"></yhm-commonbutton>
          <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initData"></yhm-managersearch>
          <yhm-radiofilter @initData="initChoose('dateType')" title="时间" :content="dateTypeList"></yhm-radiofilter>
        </template>
        <template #operateMore>
          <!--          <yhm-radiofilter @initData="dataTypeinitChoose('dateType')" title="时间类型" :content="dateTypeList"></yhm-radiofilter>-->
          <yhm-radiofilter  @initData="initChoose('category')" title="维修类型" :content="categoryPsd"></yhm-radiofilter>
          <yhm-radiofilter  @initData="initChoose('applicableModels')" title="品牌" :content="applicableModelsPsd"></yhm-radiofilter>

          <div :class="{customTimeShow:timeShow,customTimeHide:!timeShow}" >
            <yhm-form-date v-show="dateShow" title="开始时间" @call="dateSelection(startDateStr,endDateStr)" style="width: 350px;" :value="startDateStr" id="startDateStr" position="t"></yhm-form-date>
            <yhm-form-date v-show="dateShow" title="结束时间" @call="dateSelection(startDateStr,endDateStr)" style="width: 350px;margin-left: 30px;" :value="endDateStr" id="endDateStr" position="t"></yhm-form-date>
          </div>
        </template>
        <!--筛选区-->
        <template #choose>
          <div v-show="choose" class="buttonBody mptZero">
            <yhm-radiofilter  @initData="initChoose('sub')" title="保险公司" :content="subPsd"></yhm-radiofilter>
            <yhm-radiofilter  height="auto" @initData="initChoose('state')" title="状态" :content="statePsd"></yhm-radiofilter>
          </div>
        </template>
        <template #video>
          <yhm-td-checkbox-show width="180px" height="600px" value="----- 自定义查看列表 -----" :options-list="optionsList" :select-list="columnShow"></yhm-td-checkbox-show>
        </template>
        <!--数据表头-->
        <template #listHead>
          <yhm-managerth :show="columnShow[0]" style="width: 38px" title="选择"></yhm-managerth>
          <yhm-managerth :show="columnShow[1]" style="width: 38px" title="查看"></yhm-managerth>
          <yhm-managerth :show="columnShow[2]" width="100" title="工单创建日期" value="workDate"></yhm-managerth>
          <yhm-managerth :show="columnShow[3]" width="70" title="接待人"></yhm-managerth>
          <yhm-managerth :show="columnShow[4]" width="170" title="OA项目号"></yhm-managerth>
          <yhm-managerth :show="columnShow[5]" width="150" title="传奇及DMS工单号"></yhm-managerth>
          <yhm-managerth :show="columnShow[6]" width="75" title="维修类型"></yhm-managerth>
          <yhm-managerth :show="columnShow[7]" width="95" title="车牌号"></yhm-managerth>
          <yhm-managerth :show="columnShow[8]" width="90" title="品牌"></yhm-managerth>
          <yhm-managerth :show="columnShow[9]" width="90" title="车辆型号"></yhm-managerth>
          <yhm-managerth :show="columnShow[10]" width="70" title="车主"></yhm-managerth>
          <yhm-managerth :show="columnShow[11]" width="78" title="送修人"></yhm-managerth>
          <yhm-managerth :show="columnShow[12]" width="70" title="保险公司"></yhm-managerth>
<!--          <yhm-managerth :show="columnShow[13]" width="95" title="计划收入金额"></yhm-managerth>-->
          <yhm-managerth :show="columnShow[13]" width="100" title="项目金额"></yhm-managerth>
          <yhm-managerth :show="columnShow[14]" width="100" title="材料金额"></yhm-managerth>
          <yhm-managerth :show="columnShow[15]" width="100" title="合计金额"></yhm-managerth>
          <yhm-managerth :show="columnShow[16]" width="90" title="已收金额"></yhm-managerth>
          <yhm-managerth :show="columnShow[17]" width="90" title="未收金额"></yhm-managerth>
          <yhm-managerth :show="columnShow[18]" width="90" title="已开金额"></yhm-managerth>
          <yhm-managerth :show="columnShow[19]" width="90" title="未开金额"></yhm-managerth>
          <yhm-managerth :show="columnShow[20]" width="140" title="状态"></yhm-managerth>
          <yhm-managerth :show="columnShow[21]" width="70" title="工作人员"></yhm-managerth>
          <yhm-managerth :show="columnShow[22]" width="217" title="操作"></yhm-managerth>
        </template>


        <!--数据明细-->
        <template #listBody>
          <tr :class="[{InterlacBg:index%2!=0}]" v-for="(item,index) in content" :key="index">
            <yhm-manager-td-checkbox :show="columnShow[0]" :value="item" @call="checkboxChange(item)"></yhm-manager-td-checkbox>
            <yhm-manager-td-look   :show="columnShow[1]" @click="listView(item)"></yhm-manager-td-look>
<!--            <yhm-manager-td-date   :show="columnShow[2]" :value="item.workDate"></yhm-manager-td-date>-->
            <yhm-manager-td-center title="右键可筛选" :show="columnShow[2]" :value="item.workDate" v-if="item.workDate!=null" :menu-list="workDateMenu.indexOf('取消当前筛选')!='-1'?['取消当前筛选']:['筛选当前日期']" @rightClick="workOrderItem = item" @menuClick="workDateMenuClick"></yhm-manager-td-center>

            <yhm-manager-td-center :show="columnShow[3]" :value="item.client" @click="lookOverPrincipal(item)"></yhm-manager-td-center>
            <yhm-manager-td-center :show="columnShow[4]" :value="item.code" @click="lookOver(item)"></yhm-manager-td-center>
            <yhm-manager-td-center :show="columnShow[5]" :value="item.otherCode" @click="lookOver(item)"></yhm-manager-td-center>
            <yhm-manager-td-psd    :show="columnShow[6]" :value="item.category" :list="categoryList"></yhm-manager-td-psd>
            <yhm-manager-td type="vehicle" :show="columnShow[7]" :value="item.vehicle" @click="lookOverVehicle(item)"></yhm-manager-td>

            <yhm-manager-td-center :show="columnShow[8]" v-if="item.applicableModels==''" value="-----"></yhm-manager-td-center>
            <yhm-manager-td-psd    :show="columnShow[8]" v-else :value="item.applicableModels" :list="applicableModelsList"></yhm-manager-td-psd>

            <yhm-manager-td-center :show="columnShow[9]" :value="item.modelVal"></yhm-manager-td-center>

            <yhm-manager-td :show="columnShow[10]" :tip="true"  :value="item.carOwner" @click="lookOverCarOwner(item)"></yhm-manager-td>
            <yhm-manager-td :show="columnShow[11]" :tip="true" :value="item.contactPerson" @click="lookOverPerson(item)"></yhm-manager-td>

            <yhm-manager-td-center :show="columnShow[12]" v-if="item.subid==''||item.subid==null" value="-----" @click="lookOverSub(item)" color="#9a8478"></yhm-manager-td-center>
            <yhm-manager-td-psd  :show="columnShow[12]" v-else :value="item.subid" :list="subList" @click="lookOverSub(item)"></yhm-manager-td-psd>

<!--            <yhm-manager-td-money  :show="columnShow[13]" style="color:#0012FB" :value="item.incomePlan==-1?'0':item.incomePlan"></yhm-manager-td-money>-->
            <yhm-manager-td-money  :show="columnShow[13]" @click="lookOverMoney('0','查看项目详情',item)" style="color:#008f8d" :value="item.productMoney==''?'0':item.productMoney"></yhm-manager-td-money>
            <yhm-manager-td-money  :show="columnShow[14]" @click="lookOverMoney('1','查看材料详情',item)" style="color:#2193b0" :value="item.mailMoney==''?'0':item.mailMoney"></yhm-manager-td-money>
            <yhm-manager-td-money  :show="columnShow[15]" @click="lookOverMoney('0','查看合计金额',item)" style="color:#fd6802" :value="item.expend==''?'0':item.expend"></yhm-manager-td-money>
            <yhm-manager-td-money  :show="columnShow[16]" style="color:#00b300" :value="item.receivedMoney==null?'0':item.receivedMoney"></yhm-manager-td-money>
            <yhm-manager-td-money  :show="columnShow[17]" style="color:#f00" :value="item.remreceivedMoney==null?'0':item.remreceivedMoney"></yhm-manager-td-money>
            <yhm-manager-td-money  :show="columnShow[18]" style="color:#2193b0" :value="item.amountOpened==null?'0':item.amountOpened"></yhm-manager-td-money>
            <yhm-manager-td-money  :show="columnShow[19]" style="color:#49a9ea" :value="item.remamountOpened==null?'0':item.remamountOpened"></yhm-manager-td-money>
            <yhm-manager-td-psd   @click="stateClick(item)"  :show="columnShow[20]" :value="item.state" :list="stateList"></yhm-manager-td-psd>
            <yhm-manager-td-center :show="columnShow[21]"
                 v-if="item.worker==null||item.worker==''||item.state=='0'||item.state=='14'
                 ||item.state=='17'||item.state=='18'||item.state=='19'||item.state=='20'||item.state=='21'
                 ||item.state=='22'||item.state=='23'||item.state=='24'" value="-----"></yhm-manager-td-center>
            <yhm-manager-td-center :show="columnShow[21]" v-else :value="item.worker"></yhm-manager-td-center>

            <yhm-manager-td-operate :show="columnShow[22]" >
<!--              :no-click="item.state=='5'||item.state=='24'?true:false"-->
              <yhm-manager-td-operate-button @click="operation(item)" icon="i-btn-applicationSm" value="流程管理" :no-click="item.state=='5'||item.state=='24'?true:false" color="#8e08e3"></yhm-manager-td-operate-button>
              <yhm-manager-td-operate-button @click="allocation(item)" v-show="item.state=='0'&&item.method=='0'&&item.proccessDetailCount=='0'" icon="i-btn-applicationSm" value="分配" :no-click="item.state=='5'?true:false" color="#49a9ea"></yhm-manager-td-operate-button>
<!--              <yhm-manager-td-operate-button title="添加工单项目配件" @click="lookOverWorkOrder(item)" icon="i-btn-applicationSm" value="工单"-->
<!--                                             v-show="prohibitStateList.indexOf(item.state)!='-1'?false:true"-->
<!--                                             :color="prohibitStateList.indexOf(item.state)=='-1'?'#c700df':'#333'"></yhm-manager-td-operate-button>-->
              <yhm-manager-td-operate-button @click="voluntarilyDispatching(item)" v-show="item.state=='0'&&item.method=='1'" icon="i-btn-applicationSm" value="自动派工" title="自动派工" color="#00bb6b"></yhm-manager-td-operate-button>
              <yhm-manager-td-operate-button @click="stateClick(item)" icon="i-btn-applicationSm" value="派工" title="手动派工" v-show="item.state=='0'&&item.method=='0'" color="#7F7FD5"></yhm-manager-td-operate-button>
            </yhm-manager-td-operate>
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
  <!--              <yhm-managerth style="width: 100px;" before-color="#0012FB" title="" before-title="项目金额" ></yhm-managerth>-->
  <!--              <yhm-managerth style="width: 100px;" before-color="#008f8d" title="" before-title="配件金额" ></yhm-managerth>-->
                <yhm-managerth style="width: 100px;" before-color="#fd6802" title="" before-title="合计金额"></yhm-managerth>
                <yhm-managerth style="width: 100px;" before-color="#00bb6b" title="" before-title="已收金额"></yhm-managerth>
                <yhm-managerth style="width: 100px;" before-color="#f00" title="" before-title="未收金额"></yhm-managerth>
                <yhm-managerth style="width: 100px;" before-color="#008f8d" title="" before-title="已开金额"></yhm-managerth>
                <yhm-managerth style="width: 100px;" before-color="#49a9ea" title="" before-title="未开金额"></yhm-managerth>
                <yhm-managerth style="width: 100px;" v-if="dateType==9||dateType==''?false:true" :before-color="(totalList[7].money+'').indexOf('-')==-1?'#00bb6b':'#f00'" title="" :before-title="dateType!=''?dataNameList[dateType]+'(环比)':''"></yhm-managerth>
                <yhm-managerth style="width: 100px;" v-if="dateType==9||dateType==''?false:true" :before-color="(totalList[8].money+'').indexOf('-')==-1?'#00bb6b':'#f00'" title="" before-title="同比"></yhm-managerth>
              </tr>
              </thead>
              <tbody>
              <tr>
                <yhm-manager-td-rgt style="color: #000;" :value="count+''"></yhm-manager-td-rgt>
  <!--              <yhm-manager-td-money :loading="loading" :transition-show="true" style="color: #0012FB;" :value="totalList[0].money"></yhm-manager-td-money>-->
  <!--              <yhm-manager-td-money :loading="loading" :transition-show="true" style="color: #008f8d;" :value="totalList[1].money"></yhm-manager-td-money>-->
                <yhm-manager-td-money :loading="loading" loading-left="50" :transition-show="true" style="color: #fd6802;" :value="totalList[0].money"></yhm-manager-td-money>
                <yhm-manager-td-money :loading="loading" loading-left="50" :transition-show="true" style="color: #00bb6b;" :value="totalList[3].money"></yhm-manager-td-money>
                <yhm-manager-td-money :loading="loading" loading-left="50" :transition-show="true" style="color: #f00;" :value="totalList[6].money"></yhm-manager-td-money>
                <yhm-manager-td-money :loading="loading" loading-left="50" :transition-show="true" style="color: #008f8d;" :value="totalList[4].money"></yhm-manager-td-money>
                <yhm-manager-td-money :loading="loading" loading-left="50" :transition-show="true" style="color: #49a9ea;" :value="totalList[5].money"></yhm-manager-td-money>
                <yhm-manager-td-money :loading="loading" loading-left="50" :transition-show="true" :style="{color:(totalList[7].money+'').indexOf('-')==-1?'#00bb6b':'#f00'}" v-if="dateType==9||dateType==''?false:true" :value="totalList[7].money.indexOf('-')==-1?'+'+totalList[7].money:totalList[7].money"></yhm-manager-td-money>
                <yhm-manager-td-money :loading="loading" loading-left="50" :transition-show="true" :style="{color:(totalList[8].money+'').indexOf('-')==-1?'#00bb6b':'#f00'}" v-if="dateType==9||dateType==''?false:true" :value="totalList[8].money.indexOf('-')==-1?'+'+totalList[8].money:totalList[8].money"></yhm-manager-td-money>
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
  import { guid } from '@/assets/common.js'
  export default {
    name: 'workOrderManager',
    mixins: [managermixin],
    data(){
      return{
        prohibitStateList:['1','2','3','4','17','18','19','20','21','22','23','24'],
        workDateMenu:[],//接待日期筛选时间
        workOrderItem:{},//右键选中的数据
        loading:true,
        value:'',
        ownerID:guid(),
        startDateStr:'',//开始时间
        endDateStr:'',//结束时间
        timeShow:false,//自定义时间选择 显示隐藏
        dateShow:false,//时间组件 显示隐藏
        count:'0',
        dataNameList:['比前一天','比上上天','比前一周','比上上周','比前一月','比上上月','比上季度','比上上季度','比上一年'],
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
        fileList:[],
        stateList:[],//状态
        statePsd:[],//筛选 状态
        categoryList:[],//维修类型
        categoryPsd:[],//筛选 维修类型
        applicableModelsList:[],//品牌
        applicableModelsPsd:[],//筛选 品牌
        subList:[],//保险公司
        subPsd:{},//筛选 保险公司
        optionsList:['选择','查看','工单创建日期','接待人','OA项目号','传奇及DMS工单号','维修类型','车牌号','品牌','车辆型号','车主','送修人','保险公司','项目金额','材料金额','合计金额','已收金额','未收金额','已开金额','未开金额','状态','工作人员','操作'],
        columnShow:[true,true,true,true,true,false,true,true,true,false,false,true,false,true,true,true,false,false,false,false,true,true,true],
        category:'',
        modelid:'',
        productid:'',
        applicableModels:'',
        checkboxID:'',//选中数据的id
      }
    },
    methods:{
      checkboxChange(item){
        this.selectValue = []
        this.checkboxID = item.id
        this.selectValue.push(item.id)
      },
      printClick(){
        if(this.selectValue.length==1){
          this.ajaxJson({
            url:'/fix/fixOrder/pdfprint',
            data:{
              id:this.checkboxID
            },
            call: (data) => {
              if (data.type === 0) {
                window.open('/UploadFile/'+data.message)
                // this.$dialog.alert({
                //   tipValue: data.message,
                //   width:'400',
                //   closeCallBack: () => {
                //   }
                // })
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

        }else if(this.selectValue.length==0){
          this.$dialog.alert({
            tipValue:'必须选择一条数据',
            alertImg:'warn',
            width:'330',
            closeCallBack: () => {
            }
          })
        }

      },
      voluntarilyDispatching(item){
        this.$dialog.confirm({
          tipValue: '是否确认开启自动派工？',
          btnValueOk:'确认',
          btnValueCancel:'取消',
          okCallBack: () => {
            this.ajaxJson({
              url:'/fix/fixrepair/saveWorkRepairAuto',
              data:{
                orderid:item.id
              },
              call: (data) => {
                if (data.type === 0) {
                  this.$dialog.alert({
                    tipValue: data.message,
                    width:'400',
                    closeCallBack: () => {
                      this.initPageData(false)
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
      lookOverWorkOrder(item){
        this.$dialog.OpenWindow({
          width: '1070',
          height: '750',
          url:'/collectionOfDataForm?state=5&id='+item.receptionid+'&showType=1&workOrderState='+item.state,
          title:'编辑工单信息' + ' ( '+ item.vehicle + ' ) ',
          closeCallBack:(data) =>{
            this.initPageData(false)
          }
        })
      },
      lookOver(item){//查看当前工单信息
        this.$dialog.OpenWindow({
          width: '1070',
          height: '750',
          url:'/collectionOfDataView?id='+item.receptionid,
          title:'查看工单信息',
          closeCallBack:(data) =>{
            this.initPageData(false)
          }
        })
      },
      workDateMenuClick(title){
        if(title=='筛选当前日期'){
          this.startDateStr = this.workOrderItem.workDate
          this.endDateStr = this.workOrderItem.workDate
          this.dateTypeList.value = '9'
          this.workDateMenu = ['取消当前筛选']
          this.initChoose('dateType')
        }else if(title=='取消当前筛选'){
          this.startDateStr = ''
          this.endDateStr = ''
          this.dateTypeList.value = ''
          this.workDateMenu = ['筛选当前日期']
          this.initChoose('dateType')
          return
        }
        setTimeout(()=>{
          this.initPageData(false)
        },0)
      },
      statisticalClick(){
        this.$dialog.OpenWindow({
          width: '1150',
          height: '750',
          url:'/workOrderCartogram',
          title:'工单总览统计图',
          closeCallBack:(data) =>{
            // this.initPageData(false)
          }
        })
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
        this.initPageData(false)
      },
      lookOverMoney(type,title,item){//查看金额明细
        this.$dialog.OpenWindow({
          width: '1070',
          height: '750',
          url:'/workOrderView?type='+type+'&id='+item.id,
          title:title,
          closeCallBack:(data) =>{
            // this.initPageData(false)
          }
        })
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
      dataTypeinitChoose(){
        this.startDateStr=''//开始时间
        this.endDateStr=''//结束时间
        this.initPageData(false,true)
      },
      dateSelection(start,finish){//选择时间段
        if(start!=''&&finish!=''){
          this.initPageData(false)
        }
      },
      shuibian(){
        if(this.selectValue.length==1 ) {
          this.ajaxJson({
            url: '/fix/fixOrder/print',
            data:{
              id:this.selectValue[0]
            },
            call: (data) => {
              window.open('/UploadFile/' + data.message)
            }
          })
        }else if(this.selectValue.length==0){
          this.$dialog.alert({
            tipValue:'必须选择一条数据',
            alertImg:'warn',
            width:'330',
            closeCallBack: () => {

            }
          })
        }else{
          this.$dialog.alert({
            tipValue:'只能选择一条数据',
            alertImg:'warn',
            width:'330',
            closeCallBack: () => {
              this.selectValue = []
            }
          })
        }
      },
      allocation(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '750',
          url:  '/workOrderAllocationForm?orderid='+item.id+'&worktype='+item.worktype,
          title: '指定人员分配当前所有工作' + ' ( ' + item.vehicle + ' )',
          closeCallBack:(data) =>{
            this.initPageData(false)
          }
        })
      },
      totalAcquire(){
        this.$nextTick(()=>{
          this.loading = true
          this.dateType = this.dateTypeList.value
          this.ajaxJson({
            url: '/fix/fixOrder/receivedAmount',
            loading:'0',
            data:{
              startDateStr:this.startDateStr,//开始时间
              endDateStr:this.endDateStr,//结束时间
              dateType:this.dateTypeList.value,
              subid:this.subPsd.value,
              state:this.statePsd.value,
              stateStr:this.statePsd.value!=''?'':'0',//传任意值去除待确认的工单
              category:this.categoryPsd.value,
              applicableModels:this.applicableModelsPsd.value
            },
            method: 'post',
            call: (data) => {
              // if(data){
              this.loading = false
              this.totalList = data.totalList
              // }
            }
          })
        })
      },
      uploadFile(){
        this.ajaxJson({
          url: '/fix/Offer/Excelsave',
          data:{
            commonUploadFile:this.fileList
          },
          method: 'post',
          call: (data) => {
          }
        })
      },
      skipUploadFile(){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '500',
          url:  '/workOrderUploadFile',
          title: '导入离线数据',
          closeCallBack:(data) =>{
            this.initPageData(false)
          }
        })
      },
      addWordOrder(){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '800',
          url:  '/workOrderForm',
          title: '添加工单',
          closeCallBack:(data) =>{
            this.initPageData(false)
          }
        })
      },
      transferworkOrder(){//转为工单
        this.$dialog.confirm({
          tipValue: '是否创建工单？',
          btnValueOk:'是',
          btnValueCancel:'否',
          flickerIndex:'1',
          okCallBack: (data) => {
          }
        })
      },
      lookOverCarOwner(item){//查看车主
        if(item.carOwnerID!=''&&item.unitType=='1'){
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
          this.$dialog.OpenWindow({
            width: '1070',
            height: '750',
            url:'/unitView?id='+item.carOwnerID,
            title:'查看车主信息',
            closeCallBack:(data) =>{
              this.initPageData(false)
            }
          })
        }
      },
      lookOverSub(item) {//查看保险公司
        if(item.subid!=''){
          let id = ''
          for(let i in this.subList){
            if(this.subList[i].id==item.subid){
              id = this.subList[i].insuranceid
            }
          }
          this.$dialog.OpenWindow({
            width: '1070',
            height: '750',
            url:'/unitView?id='+id,
            title:'查看保险公司信息',
            closeCallBack:(data) =>{
              this.initPageData(false)
            }
          })
        }
      },
      lookOverPrincipal(item){//查看接待人信息
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
        }
      },
      lookOverVehicle(item){//查看车辆信息
        if(item.vehicleID!=''){
          this.$dialog.OpenWindow({
            width: '1070',
            height: '750',
            url:'/vehicleView?id='+item.vehicleID,
            title:'查看车辆信息',
            closeCallBack:(data) =>{
              this.initPageData(false)
            }
          })
        }
      },
      listView(item){
        if(this.prohibitStateList.indexOf(item.state)!='-1'?false:true){
          this.lookOverWorkOrder(item)
        }else{
          this.$dialog.OpenWindow({
            width: '1050',
            height: '700',
            url: '/workOrderView?id='+item.id,
            title: '查看工单信息',
            closeCallBack:(data) =>{
              if (data) {
                this.initPageData(false)
              }
            }
          })
        }
      },
      stateClick(item){
        if(item.state!='5'&&item.state!='24'){
          this.$dialog.OpenWindow({
            width: '1150',
            height: '750',
            url:'/workOrderFlowChartForm?initiative=0&ownerID='+item.id+'&proState='+item.proState+'&aid='+item.applicableModels,
            title:'主流程管理' + ' ( ' + item.vehicle + ' )',
            closeCallBack:(data) =>{
              if (data) {
                this.initPageData(false)
              }
            }
          })
        }
      },
      operation(item){
        this.$dialog.OpenWindow({
          width: '1150',
          height: '750',
          url:'/workOrderFlowChartForm?ownerID='+item.id+'&proState='+item.proState+'&aid='+item.applicableModels,
          title:'流程管理' + ' ( ' + item.vehicle + ' )',
          closeCallBack:(data) =>{
            if (data) {
              this.initPageData(false)
            }
          }
        })
      },
      add(){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '750',
          url:'/receptionForm',
          title:'添加接待单',
          closeCallBack:(data) =>{
            if (data) {
              this.initPageData(false)
            }
          }
        })
      },
      //搜索
      initPageData (initValue) {
        let params = {}
        if (initValue) {
          params = {
            // startDate:'',
            // endDate:'',
            // accountID:'',
            stateStr:'0'
          }
        } else {
          params = {
            startDateStr:this.startDateStr,//开始时间
            endDateStr:this.endDateStr,//结束时间
            dateType:this.dateTypeList.value=='9'?'':this.dateTypeList.value,
            subid:this.subPsd.value,
            state:this.statePsd.value,
            stateStr:this.statePsd.value!=''?'':'0',//传任意值去除待确认的工单
            category:this.categoryPsd.value,
            applicableModels:this.applicableModelsPsd.value
          }
        }
        this.init({
          initValue:initValue,
          url: '/fix/fixOrder/getManager',
          data:params,
          all:(data) =>{
            //不管是不是初始化都需要执行的代码
            setTimeout(()=>{
              this.totalAcquire()
            },0)
            this.count = data.count
          },
          init:(data)=>{
            let mapList = data.mapList.concat()
            this.subPsd = {
              list:mapList,
              value:''
            }
            this.subList = mapList
            console.log(this.mapList)
            this.categoryList = data.categoryPsd.list
            this.categoryPsd = data.categoryPsd
            this.stateList = data.statePsd.list
            this.statePsd = data.statePsd
            this.applicableModelsList = data.applicableModelsPsd.list
            this.applicableModelsPsd = data.applicableModelsPsd

            //初始化时需要执行的代码
            // 这边初始化筛选信息

          }
        })

      }
    }
  }
</script>

<style lang="less" scoped>
.operationBtn :hover .operationIcon{
  color:#f00;
}
  .operationIcon:after{
    color: #49a9ea;
  }

</style>
<style lang="less">
  .customTimeShow{
    width: 100%;
    height: 50px;
    position: relative;
    z-index: 2;
    display: flex;
    transition: all 0.5s;
  }
  .customTimeHide{
    width: 100%;
    height: 0px;
    display: flex;
    transition: all 0.5s;
  }
</style>
