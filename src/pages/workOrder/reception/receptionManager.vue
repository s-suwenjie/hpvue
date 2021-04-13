<template>
  <div>
    <yhm-managerpage opera-lft-top="60px">
      <!--导航条-->
      <template #navigation>售后业务&gt;&nbsp;工单&nbsp;&gt;&nbsp;<span @click="deleteReception()">接待单管理</span></template>
      <!--操作区-->
      <template #operate>
        <yhm-commonbutton value="打印结账单" icon="btnAdd" :flicker="true" @call="printClick()"></yhm-commonbutton>
        <yhm-commonbutton value="添加接待单" icon="btnAdd" :flicker="true" @call="add()"></yhm-commonbutton>
<!--        <yhm-commonbutton value="添加工单入口" icon="btnAdd" :flicker="true" @call="addWordOrder()"></yhm-commonbutton>-->
        <yhm-commonbutton :value="choose?'收起筛选':'展开筛选'" :icon="choose?'btnUp':'btnDown'" @call="switchChoose()"></yhm-commonbutton>
        <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initData"></yhm-managersearch>
        <yhm-radiofilter  @initData="initChoose('state')" title="客户意向" :content="statePsd"></yhm-radiofilter>
        <yhm-radiofilter  @initData="initChoose('applicableModels')" title="品牌" :content="applicableModelsPsd"></yhm-radiofilter>
        <yhm-radiofilter style="margin-top: 6px;" @initData="initChoose('dateType')" title="时间" :content="dateTypeList"></yhm-radiofilter>
        <yhm-radiofilter  @initData="initChoose('worktype')" title="工单类型" :content="worktypePsd"></yhm-radiofilter>
        <yhm-radiofilter  @initData="initChoose('category')" title="业务来源" :content="categoryPsd"></yhm-radiofilter>

        <!--        <yhm-commonbutton v-show="selectValue.length=='1'" value="删除" icon=" " @call="deleteReception()"></yhm-commonbutton>-->

      </template>
      <!--      筛选区-->
      <template #choose>
        <div v-show="choose" class="buttonBody mptZero">
          <yhm-radiofilter  height="auto" @initData="initChoose('orderstate')" title="状态" :content="orderstatePsd"></yhm-radiofilter>
        </div>
      </template>
      <template #operateMore>
        <div :class="{customTimeShow:timeShow,customTimeHide:!timeShow}" >
          <yhm-form-date v-show="dateShow" title="开始时间" @call="dateSelection(startDateStr,endDateStr)" style="width: 350px;" :value="startDateStr" id="startDateStr" position="t"></yhm-form-date>
          <yhm-form-date v-show="dateShow" title="结束时间" @call="dateSelection(startDateStr,endDateStr)" style="width: 350px;margin-left: 30px;" :value="endDateStr" id="endDateStr" position="t"></yhm-form-date>
        </div>
      </template>
      <template #video>
        <yhm-td-checkbox-show  width="180px" height="600px" value="----- 自定义查看列表 -----" :options-list="optionsList" :select-list="columnShow"></yhm-td-checkbox-show>
      </template>
      <!--数据表头-->
      <template #listHead>
        <yhm-managerth :show="columnShow[0]" width="34" title="选择"></yhm-managerth>
        <yhm-managerth :show="columnShow[1]" width="34" title="查看"></yhm-managerth>
        <yhm-managerth :show="columnShow[2]" width="85" title="接待日期" value="visitDate"></yhm-managerth>
        <yhm-managerth :show="columnShow[3]" width="55" title="接待人"></yhm-managerth>
        <yhm-managerth :show="columnShow[4]" width="91" title="车牌号"></yhm-managerth>
        <yhm-managerth :show="columnShow[5]" width="85" title="品牌"></yhm-managerth>
        <yhm-managerth :show="columnShow[6]" width="65" title="送修人"></yhm-managerth>
        <yhm-managerth :show="columnShow[7]" width="85" title="送修人电话"></yhm-managerth>
        <yhm-managerth :show="columnShow[8]" width="65" title="车主"></yhm-managerth>
        <yhm-managerth :show="columnShow[9]" width="170" title="OA项目号"></yhm-managerth>
        <yhm-managerth :show="columnShow[10]" width="140" title="传奇及DMS工单号"></yhm-managerth>
        <yhm-managerth :show="columnShow[11]" width="70" title="维修类型"></yhm-managerth>
        <yhm-managerth :show="columnShow[12]" width="66" title="保险公司"></yhm-managerth>
        <yhm-managerth :show="columnShow[13]" width="83" title="项目金额"></yhm-managerth>
        <yhm-managerth :show="columnShow[14]" width="83" title="材料金额"></yhm-managerth>
        <yhm-managerth :show="columnShow[15]" width="83" title="合计金额"></yhm-managerth>
        <yhm-managerth :show="columnShow[16]" width="83" title="实际金额"></yhm-managerth>
        <yhm-managerth :show="columnShow[17]" width="83" title="已收金额"></yhm-managerth>
        <yhm-managerth :show="columnShow[18]" width="83" title="未收金额"></yhm-managerth>
        <yhm-managerth :show="columnShow[19]" width="83" title="已开金额"></yhm-managerth>
        <yhm-managerth :show="columnShow[20]" width="83" title="未开金额"></yhm-managerth>
        <yhm-managerth :show="columnShow[21]" width="65" title="客户意向"></yhm-managerth>
        <yhm-managerth :show="columnShow[22]" width="130" title="工单状态"></yhm-managerth>
        <yhm-managerth :show="columnShow[23]" width="65" title="工单类型"></yhm-managerth>

        <yhm-managerth :show="columnShow[24]" width="70" title="业务来源"></yhm-managerth>

<!--        workSourcePsd-->
        <yhm-managerth :show="columnShow[25]" width="383" title="操作"></yhm-managerth>
      </template>
      <!--数据明细-->
      <template #listBody>
        <tr :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]" v-for="(item,index) in content" :key="index">
          <yhm-manager-td-checkbox :show="columnShow[0]" @call="checkboxChange(item)" :value="item"></yhm-manager-td-checkbox>
          <yhm-manager-td-look   :show="columnShow[1]" @click="listView(item)"></yhm-manager-td-look>
<!--          <yhm-manager-td-date   :show="columnShow[2]" :value="item.visitDate"></yhm-manager-td-date>-->
          <yhm-manager-td-center title="右键可筛选" :show="columnShow[2]" :value="item.visitDate" v-if="item.visitDate!=null" :menu-list="visitDateMenu.indexOf('取消当前筛选')!='-1'?['取消当前筛选']:['筛选当前日期']" @rightClick="workOrderItem = item" @menuClick="visitDateMenuClick"></yhm-manager-td-center>

          <yhm-manager-td :tip="true" :show="columnShow[3]" :value="item.personName"></yhm-manager-td>
          <yhm-manager-td type="vehicle" :show="columnShow[4]" :value="item.carName"></yhm-manager-td>

          <yhm-manager-td-center :show="columnShow[5]" v-if="item.applicableModels==''" value="-----"></yhm-manager-td-center>
          <yhm-manager-td-psd    :show="columnShow[5]" v-else :value="item.applicableModels" :list="applicableModelsList"></yhm-manager-td-psd>

          <yhm-manager-td :tip="true" :show="columnShow[6]" :value="item.contactPerson" v-if="item.contactPerson!=''" @click="lookOverPerson(item)"></yhm-manager-td>
          <yhm-manager-td-center :show="columnShow[6]" value="-----" v-else ></yhm-manager-td-center>

          <yhm-manager-td-center :show="columnShow[7]" :value="item.contactPersonPhone"></yhm-manager-td-center>

          <yhm-manager-td :show="columnShow[8]" :tip="true" :value="item.carOwner" v-if="item.carOwner!=''" @click="lookOverCarOwner(item)"></yhm-manager-td>
          <yhm-manager-td-center :show="columnShow[8]" value="-----" v-else ></yhm-manager-td-center>

          <yhm-manager-td :show="columnShow[9]" @click="lookOver(item)" :value="item.fixorder.code"></yhm-manager-td>
          <yhm-manager-td-center :show="columnShow[10]" @click="lookOver(item)" :value="item.otherNode"></yhm-manager-td-center>

          <yhm-manager-td-center :show="columnShow[11]" v-if="item.fixorder.category==''||item.fixorder.category==null" value="-----"></yhm-manager-td-center>
          <yhm-manager-td-psd    :show="columnShow[11]" v-else :value="item.fixorder.category" :list="categoryList"></yhm-manager-td-psd>

          <yhm-manager-td-center :show="columnShow[12]" value="-----" v-if="item.fixorder.subid==''||item.fixorder.subid==null" ></yhm-manager-td-center>
          <yhm-manager-td-psd    :show="columnShow[12]" v-else :value="item.fixorder.subid" :list="subList"></yhm-manager-td-psd>

          <yhm-manager-td-money  :show="columnShow[13]" style="color:#0012FB" :value="item.fixorder.productMoney==''?'0':item.fixorder.productMoney"></yhm-manager-td-money>
          <yhm-manager-td-money  :show="columnShow[14]" style="color:#2193b0" :value="item.fixorder.mailMoney==''?'0':item.fixorder.mailMoney"></yhm-manager-td-money>
          <yhm-manager-td-money  :show="columnShow[15]" style="color:#fd6802" :value="item.fixorder.expend==''?'0':item.fixorder.expend"></yhm-manager-td-money>

          <yhm-manager-td-money  :show="columnShow[16]" style="color:#49a9ea" :value="item.fixorder.actualmoney==''?'0':item.fixorder.actualmoney"></yhm-manager-td-money>

          <yhm-manager-td-money  :show="columnShow[17]" style="color:#00b300" :value="item.fixorder.receivedMoney==null?'0':item.fixorder.receivedMoney"></yhm-manager-td-money>
          <yhm-manager-td-money  :show="columnShow[18]" style="color:#f00" :value="item.fixorder.remreceivedMoney==null?'0':item.fixorder.remreceivedMoney"></yhm-manager-td-money>
          <yhm-manager-td-money  :show="columnShow[19]" style="color:#2193b0" :value="item.fixorder.amountOpened==null?'0':item.fixorder.amountOpened"></yhm-manager-td-money>
          <yhm-manager-td-money  :show="columnShow[20]" style="color:#49a9ea" :value="item.fixorder.remamountOpened==null?'0':item.fixorder.remamountOpened"></yhm-manager-td-money>
          <yhm-manager-td-center :show="columnShow[21]" :value="stateList[item.state].showName" ></yhm-manager-td-center>

          <yhm-manager-td-center :show="columnShow[22]" v-if="item.fixorder.state==null||item.fixorder.state==''" value="-----"></yhm-manager-td-center>
          <yhm-manager-td-psd  :show="columnShow[22]" v-else :value="item.fixorder.state" :list="fixorderStateList"></yhm-manager-td-psd>

          <yhm-manager-td-center :show="columnShow[23]" v-if="item.fixorder.worktype==null||item.fixorder.worktype==''" value="-----"></yhm-manager-td-center>
          <yhm-manager-td-psd  :show="columnShow[23]" v-else :value="item.fixorder.worktype" :list="worktypePsd.list"></yhm-manager-td-psd>

          <yhm-manager-td-psd :show="columnShow[24]" :value="item.worksource" :list="workSourcePsd.list"></yhm-manager-td-psd>

          <yhm-manager-td-operate :show="columnShow[25]">
            <yhm-manager-td-operate-button @click="lookOver(item,item.fixorder.state)" icon="i-btn-applicationSm" :value="item.fixorder.state=='5'?'编辑':'查看'" v-show="item.fixorder.id!=''&&item.state=='0'?true:false" :no-click="item.fixorder.id!=''&&item.state=='0'?false:true" :color="item.fixorder.id!=''&&item.state=='0'?'#7307dc':'#333'"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button @click="transferworkOrder(item)" icon="i-btn-applicationSm" value="补录工单"  v-show="item.fixorder.id==''&&item.state=='0'?true:false"  :no-click="item.fixorder.id==''&&item.state=='0'?false:true" :color="item.fixorder.id==''&&item.state=='0'?'#49a9ea':'#333'"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button @click="affirmClick(item)" icon="i-btn-applicationSm" value="转为工单" v-show="item.fixorder.id!=''&&item.fixorder.state=='5'?true:false" :no-click="item.fixorder.id!=''&&item.fixorder.state=='5'?false:true" :color="item.fixorder.id!=''&&item.fixorder.state=='5'?'#4bb414':'#333'"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button @click="cancelClick(item)" icon="i-btn-applicationSm" value="取消" v-show="item.fixorder.id!=''&&item.fixorder.state=='5'?true:false" :no-click="item.fixorder.id!=''&&item.fixorder.state=='5'?false:true" :color="item.fixorder.id!=''&&item.fixorder.state=='5'?'#f00':'#333'"></yhm-manager-td-operate-button>

            <yhm-manager-td-operate-button title="微信提醒财务收款" @click="gathering(item)" v-if="Number(item.fixorder.state)>=17&&Number(item.fixorder.state)<25?false:true" color="#00b300" icon="i-btn-applicationSm" value="微信提醒收款" v-show="item.fixorder.category=='1'&&item.fixorder.id!=''?true:false"></yhm-manager-td-operate-button>

            <yhm-manager-td-operate-button title="流水账单" @click="billingDetails(item)" v-if="item.fixorder.state=='18'" icon="i-btn-applicationSm" value="账单" v-show="item.fixorder.id!=''&&item.fixorder.state!='5'?true:false" :no-click="item.fixorder.id!=''&&item.fixorder.state!='5'?false:true" :color="item.fixorder.id!=''&&item.fixorder.state!='5'?'#49a9ea':'#333'"></yhm-manager-td-operate-button>

            <yhm-manager-td-operate-button title="添加工单" @click="lookOver(item,'5','1')" icon="i-btn-applicationSm" value="工单" v-show="item.fixorder.id!=''&&item.fixorder.state!='5'&&item.fixorder.state<18?true:false" :no-click="item.fixorder.id!=''&&item.fixorder.state!='5'&&item.fixorder.state<18?false:true" :color="item.fixorder.id!=''&&item.fixorder.state!='5'&&item.fixorder.state<18?'#c700df':'#333'"></yhm-manager-td-operate-button>

            <yhm-manager-td-operate-button @click="affirmCollectClick(item)" title="确认收车" icon="i-btn-applicationSm" value="确认收车" v-show="item.fixorder.id!=''&&item.fixorder.state=='17'?true:false" :no-click="item.fixorder.id!=''&&item.fixorder.state=='17'?false:true" :color="item.fixorder.id!=''&&item.fixorder.state=='17'?'#00bb68':'#333'"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button @click="rejectCollectClick(item)" title="拒绝收车" icon="i-btn-applicationSm" value="拒绝收车" v-show="item.fixorder.id!=''&&item.fixorder.state=='17'?true:false" :no-click="item.fixorder.id!=''&&item.fixorder.state=='17'?false:true" :color="item.fixorder.id!=''&&item.fixorder.state=='17'?'#f00':'#333'"></yhm-manager-td-operate-button>

<!--            <yhm-manager-td-operate-button @click="informClick(item)" icon="i-btn-applicationSm" title="通知客户取车" value="通知客户取车" v-show="item.fixorder.id!=''&&item.fixorder.state=='18'?true:false" :no-click="item.fixorder.id!=''&&item.fixorder.state=='18'?false:true" :color="item.fixorder.id!=''&&item.fixorder.state=='18'?'#00bb68':'#333'"></yhm-manager-td-operate-button>-->
            <yhm-manager-td-operate-button @click="getBackClick(item)" icon="i-btn-applicationSm" value="交车" v-show="item.fixorder.id!=''&&item.fixorder.state=='19'?true:false" :no-click="item.fixorder.id!=''&&item.fixorder.state=='19'?false:true" :color="item.fixorder.id!=''&&item.fixorder.state=='19'?'#00bb68':'#333'"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button title="上传保险公司条约文件" @click="uploadFiles(item)" v-show="item.fixorder.category=='0'" icon="i-btn-applicationSm" value="上传资料" color="#83a4d4"></yhm-manager-td-operate-button>

            <yhm-manager-td-operate-button @click="payAreturnVisitClick(item)" icon="i-btn-applicationSm" value="回访" v-show="item.fixorder.id!=''&&item.fixorder.state=='20'?true:false" :no-click="item.fixorder.id!=''&&item.fixorder.state=='20'?false:true" :color="item.fixorder.id!=''&&item.fixorder.state=='20'?'#00bb68':'#333'"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button @click="AdjustmentClick(item)" icon="i-btn-applicationSm" value="理算" v-show="item.fixorder.id!=''&&item.fixorder.state=='21'?true:false" :no-click="item.fixorder.id!=''&&item.fixorder.state=='21'?false:true" :color="item.fixorder.id!=''&&item.fixorder.state=='21'?'#00bb68':'#333'"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button @click="settleAccountsClick(item)" icon="i-btn-applicationSm" value="结算" v-show="item.fixorder.id!=''&&item.fixorder.state=='22'?true:false" :no-click="item.fixorder.id!=''&&item.fixorder.state=='22'?false:true" :color="item.fixorder.id!=''&&item.fixorder.state=='22'?'#00bb68':'#333'"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button @click="accomplishClick(item)" icon="i-btn-applicationSm" value="完成" v-show="item.fixorder.id!=''&&item.fixorder.state=='23'?true:false" :no-click="item.fixorder.id!=''&&item.fixorder.state=='23'?false:true" :color="item.fixorder.id!=''&&item.fixorder.state=='23'?'#00bb68':'#333'"></yhm-manager-td-operate-button>
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
    </yhm-managerpage>
  </div>
</template>

<script>
  import { managermixin } from '@/assets/manager.js'
  export default {
    name: 'receptionManager',
    mixins: [managermixin],
    data(){
      return{
        visitDateMenu:[],//接待日期筛选时间
        workOrderItem:{},//右键选中的数据
        dateType:'',
        startDateStr:'',//开始时间
        endDateStr:'',//结束时间
        timeShow:false,//自定义时间选择 显示隐藏
        worktypePsd:{},//工单类型
        orderstatePsd:{},//工单状态
        categoryPsd:{},//维修类型
        workSourcePsd:{},//业务来源
        workSource:{},//业务来源
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
        stateList:[
          {
            num:'0',
            img:'',
            code:'',
            showName:'有意'
          },
          {
            num:'1',
            img:'',
            code:'',
            showName:'无意'
          },
        ],
        fixorderStateList:[],//工单状态
        subList:[],//保险公司
        categoryList:[],
        statePsd:{
          list:[
            {
              num:'0',
              img:'',
              code:'',
              showName:'有意'
            },
            {
              num:'1',
              img:'',
              code:'',
              showName:'无意'
            },
          ],
          value:''
        },//状态筛选
        applicableModelsList:[],//品牌
        applicableModelsPsd:{},//筛选 品牌
        optionsList:['选择','查看','接待日期','接待人','车牌号','品牌','联系人','联系人电话','车主','OA项目号','传奇及DMS工单号','维修类型','保险公司','项目金额','材料金额','合计金额','实际金额','已收金额','未收金额','已开金额','未开金额','客户意向','工单状态','工单类型','业务来源','操作'],
        columnShow:[true,true,true,true,true,true,true,true,true,true,false,true,true,false,false,true,false,false,false,false,false,false,true,false,true,true],
        checkboxID:'',//选中数据的id
      }
    },
    methods:{
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
      checkboxChange(item){
        this.selectValue = []
        this.checkboxID = item.fixorder.id
        this.selectValue.push(item.id)
      },
      uploadFiles(item){
        this.ajaxJson({
          url:'/fix/fixOrderUnitConcat/verification',
          data:{
            orderID:item.fixorder.id
          },
          call: (data) => {
            if (data.type == 2) {
              // this.$dialog.alert({
              //   tipValue:'请先维护保险公司资料',
              //   alertImg:'warn',
              //   width:'330',
              //   closeCallBack: () => {
              //   }
              // })
              this.$dialog.OpenWindow({
                width: 1050,
                height: 720,
                url:'/workOrderInsuranceUnitForm?id='+item.fixorder.subid+'&unitname='+item.fixorder.subName+'&unitID='+item.fixorder.subid,
                title:'维护保险公司资料',
                closeCallBack:(data)=>{
                  this.initPageData(false)
                  // +'&fixorderunitID='+item.fixorderunitID
                }
              })
              console.log(item.fixorder.subid)
              // this.$dialog.OpenWindow({
              //   width: 1050,
              //   height: 720,
              //   url:'/workOrderClaimDataForm?id='+item.fixorder.subid+'&type=2'+'&orderID='+item.fixorder.id,
              //   title:'上传保险公司资料',
              //   closeCallBack:(data)=>{
              //     if(data){
              //       // window.location.href = 'http://t.yhm.hk/home/receptionManager'
              //
              //     }
              //   }
              // })
            } else {
              this.$dialog.OpenWindow({
                width: 1050,
                height: 720,
                url:'/workOrderClaimDataForm?type=2&id='+item.fixorder.subid+'&orderID='+item.fixorder.id,
                title:'上传保险公司资料',
                closeCallBack:(data)=>{
                  if(data){
                    // window.location.href = 'http://t.yhm.hk/home/receptionManager'

                  }
                }
              })
            }
          }
        })
      },
      deleteReception(){
        if(this.selectValue.length=='1'){
          this.$dialog.confirm({
            tipValue: '是否确认删除当前选中数据？',
            width: '400',
            btnValueOk: '确认',
            btnValueCancel: '取消',
            okCallBack: () => {
              this.ajaxJson({
                url:'/fix/fixOrder/delete',
                data:{
                  id:this.selectValue[0]
                },
                call: (data) => {
                  if (data.type === 0) {
                    this.$dialog.alert({
                      tipValue: data.message,
                      closeCallBack: () => {
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
        }
      },
      visitDateMenuClick(title,index){
        if(title=='筛选当前日期'){
          this.startDateStr = this.workOrderItem.visitDate
          this.endDateStr = this.workOrderItem.visitDate
          this.dateTypeList.value = '9'
          this.visitDateMenu = ['取消当前筛选']
          this.initChoose('dateType')
        }else if(title=='取消当前筛选'){
          this.startDateStr = ''
          this.endDateStr = ''
          this.dateTypeList.value = ''
          this.visitDateMenu = ['筛选当前日期']
          this.initChoose('dateType')
          return
        }
        setTimeout(()=>{
          this.initPageData(false)
        },0)
      },
      // 筛选事件
      initChoose (op) {
        this.pager.pageIndex = 1
        if(op === 'dateType'&&this.dateTypeList.value!=9){
          this.startDateStr=''//开始时间
          this.endDateStr=''//结束时间
        }
        if (this.dateTypeList.value==9&&op=='dateType'){
          this.timeShow = true
          setTimeout(()=>{
            this.dateShow = true
          },300)
          return
        }else{
          if (op === 'dateType') {
            this.visitDateMenu = ['筛选当前日期']
            this.timeShow = false
            setTimeout(()=>{
              this.dateShow = false
            },300)
            this.selectValue = []
          }
        }
        this.initPageData(false)
      },
      dateSelection(start,finish){//选择时间段
        if(start!=''&&finish!=''){
          // this.dateTypeList.value=''
          this.initPageData(false)
        }
      },
      gathering(item){
        this.ajaxJson({
          url:'/fix/fixOrder/sendWXmessage',
          data:{id:item.id},
          call: (data) => {
            if (data.type === 0) {
              this.$dialog.alert({
                tipValue: data.message,
                closeCallBack: () => {
                  // this.initPageData(false)
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
      billingDetails(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '800',
          url:  '/workOrderSettleAccountsForm?ownerID='+item.fixorder.id,
          title: '流水账单',
          closeCallBack:(data) =>{
            if (data) {
              this.initPageData(false)
            }
          }
        })
      },
      accomplishClick(item){
        this.$dialog.confirm({
          tipValue: '是否确认完成？',
          width:'320',
          btnValueOk:'确认',
          btnValueCancel:'取消',
          okCallBack: () => {
            this.ajaxJson({
              url: '/fix/fixOrder/save',
              data: {
                id:item.fixorder.id,
                state:'24',
              },
              call: (data) => {
                if (data.type === 0) {
                  this.$dialog.alert({
                    tipValue: data.message,
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
      settleAccountsClick(item){
        this.$dialog.confirm({
          tipValue: '是否确认完成结算？',
          width:'320',
          btnValueOk:'确认',
          btnValueCancel:'取消',
          okCallBack: () => {
            this.ajaxJson({
              url: '/fix/fixOrder/save',
              data: {
                id:item.fixorder.id,
                state:'23',
              },
              call: (data) => {
                if (data.type === 0) {
                  this.$dialog.alert({
                    tipValue: data.message,
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
      AdjustmentClick(item){
        this.$dialog.confirm({
          tipValue: '是否确认完成理算？',
          width:'320',
          btnValueOk:'确认',
          btnValueCancel:'取消',
          okCallBack: () => {
            this.ajaxJson({
              url: '/fix/fixOrder/save',
              data: {
                id:item.fixorder.id,
                state:'22',
              },
              call: (data) => {
                if (data.type === 0) {
                  this.$dialog.alert({
                    tipValue: data.message,
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
      payAreturnVisitClick(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '750',
          url:  '/payAreturnVisitForm?personName='+item.contactPerson+'&personid='+item.contactPersonID+'&receptionistid='+item.personID+'&receptionistName='+item.personName,
          title: '回访',
          closeCallBack:(data) =>{
            if (data) {

            }
          }
        })
        // this.$dialog.confirm({
        //   tipValue: '是否确认回访？',
        //   width:'320',
        //   btnValueOk:'确认',
        //   btnValueCancel:'取消',
        //   okCallBack: () => {
        //     this.ajaxJson({
        //       url: '/fix/fixOrder/save',
        //       data: {
        //         id:item.fixorder.id,
        //         state:'21',
        //       },
        //       call: (data) => {
        //         if (data.type === 0) {
        //           this.$dialog.alert({
        //             tipValue: data.message,
        //             closeCallBack: () => {
        //               this.initPageData(false)
        //             }
        //           })
        //         } else {
        //           this.$dialog.alert({
        //             alertImg: 'error',
        //             tipValue: data.message,
        //             closeCallBack: () => {
        //             }
        //           })
        //         }
        //       }
        //     })
        //   }
        // })
      },
      getBackClick(item){
        this.$dialog.confirm({
          tipValue: '是否确认已将车辆交付给客户？',
          width:'320',
          btnValueOk:'确认',
          btnValueCancel:'取消',
          okCallBack: () => {
            this.ajaxJson({
              url: '/fix/fixOrder/save',
              data: {
                id:item.fixorder.id,
                state:'20',
              },
              call: (data) => {
                if (data.type === 0) {
                  this.$dialog.alert({
                    tipValue: data.message,
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
      informClick(item){
        this.$dialog.confirm({
          tipValue: '是否确认通知客户取车？',
          width:'320',
          btnValueOk:'确认',
          btnValueCancel:'取消',
          okCallBack: () => {
            this.ajaxJson({
              url: '/fix/fixOrder/save',
              data: {
                id:item.fixorder.id,
                state:'19',
              },
              call: (data) => {
                if (data.type === 0) {
                  this.$dialog.alert({
                    tipValue: data.message,
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
      affirmCollectClick(item){//确认收车
        this.$dialog.confirm({
          tipValue: '是否确认车辆完好,并确认收车？',
          width:'320',
          btnValueOk:'确认',
          btnValueCancel:'取消',
          okCallBack: () => {
            this.ajaxJson({
              url: '/fix/fixOrder/receive',
              data: {
                id:item.fixorder.id,
                state:'18',
              },
              call: (data) => {
                if (data.type === 0) {
                  this.$dialog.alert({
                    tipValue: data.message,
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
      rejectCollectClick(item){//拒绝收车
        this.$dialog.OpenWindow({
          width: '1050',
          height: '750',
          url:'/workOrderReasonsForFefusal?orderid='+item.fixorder.id+'&orderNum='+item.fixorder.code,
          title:'拒绝收车',
          closeCallBack:(data) =>{
            this.initPageData(false)
          }
        })
        // this.$dialog.confirm({
        //   tipValue: '是否确认车辆未完全修复,并拒绝收车进入质检阶段？',
        //   width:'450',
        //   btnValueOk:'确认',
        //   btnValueCancel:'取消',
        //   okCallBack: () => {
        //     this.ajaxJson({
        //       url: '/fix/fixProcess/save',
        //       data: {
        //         ownerID: item.fixorder.id,
        //         state: '0',
        //       },
        //       call: (data) => {
        //         this.ajaxJson({
        //           url: '/fix/fixOrder/save',
        //           data: {
        //             id:item.fixorder.id,
        //             state:'14',
        //           },
        //           call: (data) => {
        //             if (data.type === 0) {
        //               this.$dialog.alert({
        //                 tipValue: data.message,
        //                 closeCallBack: () => {
        //                   this.initPageData(false)
        //                 }
        //               })
        //             } else {
        //               this.$dialog.alert({
        //                 alertImg: 'error',
        //                 tipValue: data.message,
        //                 closeCallBack: () => {
        //                 }
        //               })
        //             }
        //           }
        //         })
        //       }
        //     })
        //   }
        // })
      },
      cancelClick(item){
        this.$dialog.confirm({
          tipValue: '是否确认取消当前接待单？',
          width:'320',
          btnValueOk:'确认',
          btnValueCancel:'取消',
          okCallBack: () => {
            this.ajaxJson({
              url: '/fix/fixOrder/save',
              data: {
                id:item.fixorder.id,
                state:'24',
              },
              call: (data) => {
                if (data.type === 0) {
                  this.$dialog.alert({
                    tipValue: data.message,
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
      affirmClick(item){
        this.$dialog.confirm({
          tipValue: '是否确认转为工单？',
          btnValueOk:'确认',
          btnValueCancel:'取消',
          okCallBack: () => {
            this.ajaxJson({
              url: '/fix/fixOrder/save',
              data: {
                id:item.fixorder.id,
                state:'0',
                isFlag:'0',//特殊字段 后端用来区分是转为工单的操作
              },
              call: (data) => {
                if (data.type === 0) {
                  this.$dialog.alert({
                    tipValue: data.message,
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
      addWordOrder(){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '800',
          url:  '/workOrderForm',
          title: '添加工单',
          closeCallBack:(data) =>{
            if (data) {
              this.initPageData(false)
            }
          }
        })
      },
      lookOver(item,state,type){//查看当前工单信息
        if(state=='5'){
          let showType = ''
          if(type=='1'){
            showType = '&showType=1&workOrderState='+item.fixorder.state
          }
          this.$dialog.OpenWindow({
            width: '1070',
            height: '750',
            url:'/collectionOfDataForm?state=5&workOrderStatus='+item.fixorder.state+'&id='+item.id+showType,
            title:'编辑工单信息' + ' ( '+ item.carName + ' ) ',
            closeCallBack:(data) =>{
              this.initPageData(false)
            }
          })
        }else{
          this.$dialog.OpenWindow({
            width: '1070',
            height: '750',
            url:'/collectionOfDataView?id='+item.id,
            title:'查看工单信息',
            closeCallBack:(data) =>{
              this.initPageData(false)
            }
          })
        }
      },
      transferworkOrder(item,type){//转为工单
        this.$dialog.OpenWindow({
          width: '1070',
          height: '750',
          url:'/collectionOfDataForm?workOrderStatus=5&id='+item.id+'&workDate='+item.visitDate,
          title:'补录工单信息' + ' ( '+ item.carName + ' ) ',
          closeCallBack:(data) =>{
            this.initPageData(false)
          }
        })


        // this.$dialog.confirm({
        //   tipValue: '是否创建工单？',
        //   btnValueOk:'是',
        //   btnValueCancel:'否',
        //   flickerIndex:'1',
        //   okCallBack: (data) => {
        //   }
        // })
      },
      // lookOverContactPerson
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
          this.$dialog.OpenWindow({
            width: '1070',
            height: '750',
            url:'/unitView?id='+item.subid,
            title:'查看保险公司信息',
            closeCallBack:(data) =>{
              if (data) {
              }
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
              if (data) {
              }
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
            title:'查看送修人信息',
            closeCallBack:(data) =>{
              if (data) {
              }
            }
          })
        }
      },
      lookOverVehicle(item){//查看车辆信息
        this.$dialog.OpenWindow({
          width: '1070',
          height: '750',
          url:'/vehicleView?id='+item.vehicleID,
          title:'查看车辆信息',
          closeCallBack:(data) =>{
            if (data) {
            }
          }
        })
      },
      listView(item){
        let url = ''
        let title = ''
        if(item.fixorder.id!=''&&item.fixorder.id!=null){
          url = '/collectionOfDataView?id='+item.id
          title = '查看接待单信息'
        }else{
          url = '/receptionForm?listViewType=1&id='+item.id
          title = '编辑接待单信息'
        }
        this.$dialog.OpenWindow({
          width: '1050',
          height: '750',
          url: url,
          title: title,
          closeCallBack:(data) =>{
            // if (data) {
              this.initPageData(false)
            // }
          }
        })
      },
      operation(item){
        this.$dialog.OpenWindow({
          width: '1150',
          height: '750',
          url:'/workOrderFlowChartForm?ownerID='+item.fixorder.id+'&proState='+item.proState+'&aid='+item.applicableModels,
          title:'流程管理',
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
          height: '800',
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
          }
        } else {
          params = {
            startDateStr:this.startDateStr,//开始时间
            endDateStr:this.endDateStr,//结束时间
            state:this.statePsd.value,
            category:this.categoryPsd.value,//维修类型
            worktype:this.worktypePsd.value,//工单类型
            workSource:this.workSourcePsd.value,//业务来源
            orderstate:this.orderstatePsd.value,//工单状态
            dateType:this.dateTypeList.value=='9'?'':this.dateTypeList.value,
            applicableModels:this.applicableModelsPsd.value
          }
        }
        this.init({
          initValue:initValue,
          url: '/fix/fixreception/getManager',
          data:params,
          all:(data) =>{
            //不管是不是初始化都需要执行的代码



          },
          init:(data)=>{
            this.categoryList = data.categoryPsd.list
            this.categoryPsd = data.categoryPsd
            this.workSourcePsd = data.workSourcePsd
            this.applicableModelsPsd = data.applicableModelsPsd
            this.applicableModelsList = data.applicableModelsPsd.list
            this.fixorderStateList = data.statePsd.list
            this.worktypePsd = data.worktypePsd
            this.subList = data.mapList
            this.orderstatePsd = data.statePsd

            //初始化时需要执行的代码
            // 这边初始化筛选信息




          }
        })

      }
    }
  }
</script>

<style scoped>
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
