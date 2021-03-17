<template>
    <div class="f_main">
      <yhm-view-body>
        <template #title>基本信息</template>
        <template #body>
          <yhm-view-control title="接待人" :content="principal"></yhm-view-control>
          <yhm-view-control title="车牌号" :content="vehicle"></yhm-view-control>
          <yhm-view-control title="付款方" :content="payment"></yhm-view-control>
          <yhm-view-control title="联系人" :content="contactPerson"></yhm-view-control>
          <yhm-view-control title="车主" :content="carOwner"></yhm-view-control>
          <yhm-view-control title="接待日期" :content="workDate" type="date"></yhm-view-control>
          <yhm-view-control title="预计交车时间" :content="endDate" type="date"></yhm-view-control>
          <yhm-view-control title="编号" :content="code"></yhm-view-control>
          <yhm-view-control title="其它系统编号" :content="otherCode"></yhm-view-control>
          <yhm-view-control title="工单来源" :content="orderSource" :psd="orderSourceList.list"></yhm-view-control>
          <yhm-view-control title="状态" :content="state" :psd="stateList.list"></yhm-view-control>
          <yhm-view-control title="工单类型" :content="category" :psd="categoryList.list"></yhm-view-control>
          <yhm-view-control title="业务来源" :content="source" :psd="sourceList.list"></yhm-view-control>
          <yhm-view-control title="作业分类" :content="jobtype" :psd="jobtypeList.list"></yhm-view-control>
          <yhm-view-control title="适用车型" :content="applicableModels" :psd="applicableModelsList.list"></yhm-view-control>

          <yhm-view-control title="项目金额" color="#0012fb" type="money" :content="price"></yhm-view-control>
          <yhm-view-control title="配件金额" color="#008f8d" type="money" :content="amount"></yhm-view-control>
          <yhm-view-control title="合计金额" color="#fd6802" type="money" :content="(Number(price)+Number(amount))+''"></yhm-view-control>
          <yhm-view-control title="已收金额" color="#00bb6b" type="money" :content="revenue"></yhm-view-control>
          <yhm-view-control title="未收金额" color="#f00" type="money" :content="(Number(price)+Number(amount))-Number(revenue)+''"></yhm-view-control>

          <yhm-view-control title="备注" :content="remark" category="3"></yhm-view-control>
        </template>
      </yhm-view-body>
      <div class="f_split"></div>
      <yhm-view-tab>
        <template #tab>
          <yhm-view-tab-button :list="tabState" :index="0">项目详情</yhm-view-tab-button>
          <yhm-view-tab-button :list="tabState" :index="1">材料详情</yhm-view-tab-button>
<!--          <yhm-view-tab-button :list="tabState" :index="2">收入详情</yhm-view-tab-button>-->
        </template>
        <template #content>
          <yhm-view-tab-list :customize="true" :pager="false" v-show="tabState[0].select">
            <template #listHead>
              <yhm-managerth title="项目名称"></yhm-managerth>
              <yhm-managerth title="编号"></yhm-managerth>
              <yhm-managerth width="120" title="变化金额"></yhm-managerth>
            </template>
            <template #listBody>
              <tr v-for="(item,index) in fixOrderDetail" :key="index" :class="{InterlacBg:index%2!==0}">
                <yhm-manager-td-center :value="item.name+''"></yhm-manager-td-center>
                <yhm-manager-td-center :value="item.teamid"></yhm-manager-td-center>
                <yhm-manager-td-money :value="item.money+''"></yhm-manager-td-money>
              </tr>
            </template>
            <template #customize>
              <yhm-view-control type="money" title="项目金额" :content="price" color="#4BB414"></yhm-view-control>
              <yhm-view-control type="money" title="项目金额 + 材料金额 = 合计金额" :content="(Number(price)+Number(amount))+''" color="#fd6802"></yhm-view-control>
            </template>
            <template #empty>
              <span class="m_listNoData" v-show="fixOrderDetail.length=='0'?true:false">暂时没有数据</span>
            </template>
            <template #pager>
              <yhm-pagination :pager="pager" is-page-size="false" @initData="initPageData(false)"></yhm-pagination>
            </template>
          </yhm-view-tab-list>
          <yhm-view-tab-list :customize="true" :pager="false" v-show="tabState[1].select">
            <template #listHead>
              <yhm-managerth title="商品名称"></yhm-managerth>
              <yhm-managerth title="规格型号"></yhm-managerth>
              <yhm-managerth style="width: 120px" title="拆分数量"></yhm-managerth>
              <yhm-managerth style="width: 120px" title="整件数量"></yhm-managerth>
              <yhm-managerth style="width: 120px" title="单价"></yhm-managerth>
              <yhm-managerth style="width: 120px" title="金额"></yhm-managerth>
              <yhm-managerth style="width: 120px" title="材料类型"></yhm-managerth>
            </template>
            <template #listBody>
              <tr v-for="(item,index) in fixOrderMaterial" :class="[{InterlacBg:index%2!=0}]" :key="item.id">
                <yhm-manager-td-center :value="item.product"></yhm-manager-td-center>
                <yhm-manager-td-center :value="item.model"></yhm-manager-td-center>
                <yhm-manager-td-center :value="item.mdo"></yhm-manager-td-center>
                <yhm-manager-td-center :value="item.quantity+''"></yhm-manager-td-center>
                <yhm-manager-td-money :value="item.price"></yhm-manager-td-money>
                <yhm-manager-td-money :value="item.money"></yhm-manager-td-money>
<!--                <yhm-manager-td-center :value="fixOrderMaterial[item.quantity].showName"></yhm-manager-td-center>-->

                <yhm-form-td-select width="120" no-edit="1" :list="fixOrderMaterial" listid="fixOrderMaterial" :value="item" id="type" :select-list="typeList"></yhm-form-td-select>
              </tr>
            </template>
            <template #customize>
              <yhm-view-control type="money" title="材料金额" :content="amount" color="#4BB414"></yhm-view-control>
              <yhm-view-control type="money" title="项目金额 + 材料金额 = 合计金额" :content="(Number(price)+Number(amount))+''" color="#fd6802"></yhm-view-control>
            </template>
            <template #empty>
              <span class="m_listNoData" v-show="fixOrderMaterial.length=='0'?true:false">暂时没有数据</span>
            </template>
            <template #pager>
              <yhm-pagination :pager="pager" is-page-size="false" @initData="initPageData(false)"></yhm-pagination>
            </template>
          </yhm-view-tab-list>
<!--          <yhm-view-tab-list :customize="true" :pager="false" v-show="tabState[2].select">-->
<!--            <template #listHead>-->
<!--              <yhm-managerth title="查看" width="40"></yhm-managerth>-->
<!--              <yhm-managerth title="我方账户"></yhm-managerth>-->
<!--              <yhm-managerth width="110" title="交易日期"></yhm-managerth>-->
<!--              <yhm-managerth title="对方账户"></yhm-managerth>-->
<!--              <yhm-managerth width="40" title="收支"></yhm-managerth>-->
<!--              <yhm-managerth width="110" title="事由"></yhm-managerth>-->
<!--              <yhm-managerth width="105" title="交易金额"></yhm-managerth>-->
<!--              &lt;!&ndash;<yhm-managerth width="105" title="可核销金额"></yhm-managerth>&ndash;&gt;-->
<!--              <yhm-managerth width="105" title="剩余开票金额"></yhm-managerth>-->
<!--            </template>-->
<!--            <template #listBody>-->
<!--              <tr v-for="(item,index) in bankDetailList" :class="[{InterlacBg:index%2!=0}]" :key="item.id">-->
<!--                <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>-->
<!--                <yhm-manager-td-center :value="item.bankName"></yhm-manager-td-center>-->
<!--                <yhm-manager-td-date :value="item.cccurDate"></yhm-manager-td-date>-->
<!--                <yhm-manager-td-center :value="item.otherName"></yhm-manager-td-center>-->
<!--                <yhm-manager-td-center value="收入" color="#49a9ea" class="dfJcc"></yhm-manager-td-center>-->
<!--                <yhm-manager-td-center :tip="true" node-class-name="f_main" :value="item.subject"></yhm-manager-td-center>-->
<!--                <yhm-manager-td-money :value="item.money"></yhm-manager-td-money>-->
<!--&lt;!&ndash;                <yhm-manager-td-money :value="item.useMoney"></yhm-manager-td-money>&ndash;&gt;-->
<!--                <yhm-manager-td-money :value="item.selfAccount"></yhm-manager-td-money>-->
<!--              </tr>-->
<!--            </template>-->
<!--            <template #customize>-->
<!--              <yhm-view-control type="money" title="总收入金额" :content="revenue" color="#4BB414"></yhm-view-control>-->
<!--            </template>-->
<!--            <template #empty>-->
<!--              <span class="m_listNoData" v-show="bankDetailList.length=='0'?true:false">暂时没有数据</span>-->
<!--            </template>-->
<!--            <template #pager>-->
<!--              <yhm-pagination :pager="pager" is-page-size="false" @initData="initPageData(false)"></yhm-pagination>-->
<!--            </template>-->
<!--          </yhm-view-tab-list>-->
        </template>
      </yhm-view-tab>
    </div>
</template>

<script>
  import { viewmixin } from '@/assets/view.js'
  import { accMul, accAdd, guid, formatDate, formatTime,tenThousandFormatHtml } from '@/assets/common.js'
  export default {
    name: 'offlineWorkOrderView',
    mixins: [viewmixin],
    data(){
      return{
        tabState:[{select:true},{select:false}],
        currentDate: formatDate(new Date()),//当前日期
        principalID:'',//负责人ID
        principal:'',//负责人
        clientID:'',//客服ID
        client:'',//客服
        vehicleID:'',//车辆ID
        vehicle:'',//车辆
        code:'',//编号
        otherCode:'',//其它系统编号
        workDate: formatDate(new Date()),//发生日期
        state:'1',//状态
        category:'0',//维修类型
        applicableModels:'1',//适用车型
        insurance:'',//备份保险公司选中的值
        jobtype:'0',//作业分类类型
        jobtypeNoEdit:false,//作业分类启用禁用
        jobImg:'',//保险公司的缩写编号
        sub:'0',//保险公司
        subName:'',//保险公司名称
        subid:'',//保险公司ID
        subCode:'',//保险公司编号
        source:'0',//业务来源
        subShow:true,//保险公司显示隐藏
        orderSource:'0',//工单来源
        phone:'',//联系人手机号
        trademark:'',//品牌
        vehicleModel:'',//车辆型号id
        contactPerson:'',//联系人姓名
        contactPersonID:'',//联系人ID
        carOwner:'',//车主姓名
        carOwnerID:'',//车主ID
        endDate: formatDate(new Date()),//预计交车时间
        remark:'',//备注


        jobtypeList:[],//作业分类
        jobtypeLists:[],//作业分类 不包含自费的
        jobtypeBackupsList:[],//作业分类素材备份
        personOrUnitList:[
          {
            code:'',
            img:'',
            num:'0',
            showName:'公司'
          },
          {
            code:'',
            img:'',
            num:'1',
            showName:'个人'
          }
        ],
        subList:[],
        typeList:[],//材料类型
        sourceList:[],
        orderSourceList:[],
        stateList:[],
        // categoryList:[],
        applicableModelsList:[],
        //以上是工单部分


        noInvoice:false,
        detailsShow:false,
        receivedMoney:'',//收入合计金额
        money:'',
        list:[],
        id:'',
        invoiceDetailsID:'',
        invoiceDetailsID2:'',
        formTypeList:[],
        fileList:[],
        lossAssessmentMoney:[],//总收入金额数组
        payment:'',//付款方姓名
        paymentid:'',//付款方id
        personal:'0',//付款方类型 0公司 1个人
        invoiceDetails:[
          {
            id:'',
            ownerID:this.ownerID,
            insertDate:formatDate(new Date()),
            categoryStr:'保险理赔',
            money:'',
            rate:'50',
            rateMoney:''
          },
          {
            id:'',
            ownerID:this.ownerID,
            insertDate:formatDate(new Date()),
            categoryStr:'自费维修',
            money:'',
            rate:'50',
            rateMoney:''
          }
        ],
        categoryList:[],
        //  以上是定损单详情
        amount:0,//配件金额
        profit:0,//盈利
        price:0,//项目金额
        cost:0,//成本
        revenue:0,//总收入
        totalMoney:0,//合计金额
        pendingMoney:0,//代结金额
        projectMoney:[],//项目金额数组
        //以上是工单流水主表
        list2:[],//工单详情列表

        list3:[],//材料表详情列表

        partsMoney:[],//配件金额数组
        bankDetailList:[],//收入详情列表
        incomeMoney:[],//收入金额计算数组

        fixOrderDetail:[],//项目支出详情列表

        fixOrderMaterial:[],//材料详情信息列表
        deleteList:[],

        fixid:guid(),//定损单ID
        orderid:guid(),//工单ID
        martailid:guid(),//材料表ID
        offersudetailid:guid(),//收入ID
      }
    },

    computed:{
      priceMoneySegmentation(){//项目金额
        return tenThousandFormatHtml(this.price+'')
      },
      amountMoneySegmentation(){//配件金额
        return tenThousandFormatHtml(this.amount+'')
      },
      receivedMoneySegmentation(){//收入总金额
        return tenThousandFormatHtml(this.revenue+'')
      }
    },
    methods:{
      listView(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '700',
          url: '/unitDetailView?id='+item.dependid,
          title: '查看收支明细',
          closeCallBack: (data) => {

          }
        })
        // unitDetailView
      },
      inquirePlate(){
        let params = {
          plate: this.vehicle
        }
        this.ajaxJson({
          url: '/Basic/getPlateForm',
          data: params,
          call: (data) => {
            if(data){
              this.vehicleID = data.id
              this.vehicleModel = data.brandID
            }else{
              this.$dialog.alert({
                tipValue:'该车辆未被登记,需要先进行登记',
                alertImg:'warn',
                width:'330',
                closeCallBack: () => {
                  this.$dialog.OpenWindow({
                    width: '1050',
                    height: '700',
                    url: '/vehicleForm?searchStr='+this.vehicle,
                    title: '添加车辆信息',
                    closeCallBack: (data) => {

                    }
                  })
                }
              })
            }
          }
        })
      },
      resetPersonOrUnit(op,personOrUnit){
        if(op === 'i'){
          this.personal = personOrUnit
        }
      },
      selectUnit (op) {
        if(this.personal == '0'){
          this.$dialog.OpenWindow({
            width: '950',
            height: '700',
            url: '/selectUnit?category=1&categoryBefore=1',
            title: '选择单位信息',
            closeCallBack: (data) => {
              if (data) {
                this.paymentid = data.id
                this.payment = data.name
              }
              else{
                //说明没有选中需要重置类型
                this.resetPersonOrUnit(op,'1')
              }
            }
          })
        }else{
          this.$dialog.OpenWindow({
            width: '950',
            height: '700',
            url: '/selectPerson?category=1&categoryBefore=1',
            title: '选择联系人信息',
            closeCallBack: (data) => {
              if (data) {
                this.paymentid = data.id
                this.payment = data.name
              }
              else{
                //说明没有选中需要重置类型
                this.resetPersonOrUnit(op,'0')
              }
            }
          })
        }
      },
      selectPerson(){
        this.$dialog.OpenWindow({
          width: '950',
          height: '700',
          url: '/selectPerson?category=1&categoryBefore=1',
          title: '选择联系人信息',
          closeCallBack: (data) => {
            if (data) {
              this.contactPerson = data.name
              this.contactPersonID = data.id
            }
          }
        })
      },
      subCall(){//点击保险公司时
        this.subid = this.subList[this.sub].id
        this.subCode = this.subList[this.sub].code
        this.subName = this.subList[this.sub].showName
      },
      jobTypeChange(value){//保险公司缩写
        this.jobImg = this.jobtypeList[value].code
        this.accessNumber()
      },
      accessNumber(){//获取编号
        if(this.category=='1'||this.category=='4'||this.category=='5'){
          this.jobtype = '12'
          this.jobtypeNoEdit = true
        }else{
          this.jobtypeNoEdit = false
        }
        if(this.category=='0'){
          this.jobtypeList = this.jobtypeLists.concat()
        }else{
          this.jobtypeList = this.jobtypeBackupsList.concat()
        }
        let params ={
          // subid:this.subid,
          code:this.jobImg,
          category:this.category,
          applicableModels:this.applicableModels
        }
        this.ajaxJson({
          url: '/fix/fixOrder/initWorkOrder',
          loading:'0',
          data: params,
          call: (data) => {
            if(data){
              if(data.type==0){
                this.code = data.message
              }
            }
          }
        })
      },
      //选择客服
      selectClient(){
        this.$dialog.OpenWindow({
          width: '950',
          height: '700',
          url: '/selectPerson?category=0&categoryBefore=1',
          title: '选择接待人信息',
          closeCallBack: (data) => {
            if (data) {
              this.principal = data.name
              this.principalID = data.id
              this.client = data.name
              this.clientID = data.id
            }
          }
        })
      },
      //选择车辆
      plateEvent(){
        this.$dialog.OpenWindow({
          width: 950,
          height: 603,
          url: '/selectFormPlate?addType=1',
          title: '选择车辆号',
          closeCallBack: (data) => {
            if (data) {
              this.vehicle = data.plate
              this.vehicleID = data.vehicleID
              this.contactPersonID = data.contactPersonID//联系人ID
              this.contactPerson = data.name//联系人姓名
              this.carOwnerID = data.carOwnerID//车主ID
              this.carOwner = data.carOwner//车主姓名
              this.phone = data.phone
              let list = this.applicableModelsList.list
              for(let i in list){
                if(list[i].showName==data.brandVal){
                  this.applicableModels = list[i].num
                }
              }
              this.accessNumber()

            }
          }
        })
      },
      //选择负责人
      // selectUnit (op) {
      //   this.$dialog.OpenWindow({
      //     width: '950',
      //     height: '700',
      //     url: '/selectPerson?category=0&categoryBefore=1',
      //     title: '选择负责人信息',
      //     closeCallBack: (data) => {
      //       if (data) {
      //         this.principal = data.name
      //         this.principalID = data.id
      //       }
      //     }
      //   })
      // },
      percentage(num, total) {
        num = parseFloat(num);
        total = parseFloat(total);
        if (isNaN(num) || isNaN(total)) {
          return "-";
        }
        return total <= 0 ? "0%" : (Math.round(num / total * 10000) / 100.00)+"%";
      },
      rateMoneyEvent(index){
        let list = this.invoiceDetails
        // if(index==0){
        //   list[0].rate = this.percentage(Number(list[index].rateMoney),Number(list[0].money))
        // }else if(index == 1 ){
        //   list[1].rate = this.percentage(Number(list[index].rateMoney),Number(list[1].money))
        // }
        list[0].rateMoney = Number(list[0].rateMoney).toFixed(2)
        list[1].rateMoney = Number(list[1].rateMoney).toFixed(2)
      },
      //理赔比例
      actualMoneyEvent(index){
        let list = this.invoiceDetails

        if(list[0].rate!==''&&index==0&&list[0].rate<100&&list[0].rate.indexOf('-')==-1){
          list[1].rate = (100 - Number(list[0].rate))+''
        }else if(list[1].rate!==''&&index==1&&list[1].rate<100&&list[1].rate.indexOf('-')==-1){
          list[0].rate = (100 - Number(list[1].rate))+''
        }
        if(Number(list[0].rate)+Number(list[1].rate)>100){
          if(index==0){
            list[0].rate = (100 - Number(list[1].rate))+''
          }else{
            list[1].rate = (100 - Number(list[0].rate))+''
          }
        }
        list[0].rateMoney = Number(list[0].money) * Number(list[0].rate/100) + ''
        list[1].rateMoney = Number(list[1].money) * Number(list[1].rate/100) + ''
        this.rateMoneyEvent(index)
      },
      moneyChange(){
        this.invoiceDetails[0].money = this.money
        this.invoiceDetails[1].money = this.money
        this.moneyEvent(0)
        this.moneyEvent(1)
      },
      //定损价格
      moneyEvent(index){
        let list = this.invoiceDetails

        if(index==0){
          list[1].money = list[0].money
        }else{
          list[0].money = list[1].money
        }
        list[0].rateMoney = Number(list[0].money) * Number(list[0].rate/100) + ''
        list[1].rateMoney = Number(list[1].money) * Number(list[1].rate/100) + ''
        this.rateMoneyEvent(index)
      },
      callCategory(category){//定损单类型
        if(category=='1'||category=='2'){
          this.subShow = false
          if(this.sub!=''){
            this.insurance = this.sub.concat()
          }
          this.sub = ''//保险公司
          this.subName = ''//保险公司名称
          this.subid = ''//保险公司ID
          this.subCode = ''//保险公司编号
        }else if(category=='0'){
          this.subShow = true
          this.sub = this.insurance.concat()
          this.subid = this.subList[this.sub].id//保险公司id
          this.subCode = this.subList[this.sub].code//保险公司缩写
          this.subName = this.subList[this.sub].showName//保险公司名称
        }
        // if(this.category == '2'){
        //   this.noInvoice = true
        // }else{
        //   this.noInvoice = false
        // }
      },
      addDetail(){//添加定损单详情
        this.$dialog.OpenWindow({
          width: '1050',
          height: '650',
          url:'/lossAssessmentDetailsForm?ownerID='+this.id+'&flowPathID=' + this.flowPathID+'&lookOverShow=false',
          title:'添加定损单详情',
          closeCallBack:(data) =>{
            if (data) {
              let money = 0
              this.lossAssessmentMoney.push((Number(data.params.price) + Number(data.params.money)).toFixed(2))
              this.list.push({
                id:guid(),
                ownerID:this.id,
                productid:data.params.productid,
                insertDate:data.params.insertDate,
                nameStr:data.params.nameStr,
                category:data.params.category,
                quantity:data.params.quantity,
                price:data.params.price,
                money:data.params.money,
              })
              for(let i in this.lossAssessmentMoney){
                money += Number(this.lossAssessmentMoney[i])
              }
              this.money = money.toFixed(2)
              this.moneyChange()
              // this.initData(false)
            }
          }
        })
      },
      // addWorkOrderDetail(){//添加工单详情
      //   this.$dialog.OpenWindow({
      //     width: '1050',
      //     height: '600',
      //     url:'/workOrderAddDetailsForm?offLine=1',
      //     title:'添加工单详情',
      //     closeCallBack:(data) =>{
      //       if (data) {
      //         console.log(data)
      //
      //         this.list2.push({
      //           id:data.id,
      //           name:data.name,
      //           model:data.model,
      //           modelid:data.modelid,
      //           money:data.money,
      //           category:data.category,
      //           departid:data.departid,
      //           direction:data.direction,
      //           orderid:this.orderid,
      //           ownerID:this.ownerID,
      //           processid:'',
      //           productid:data.productid,
      //           remark:data.remark,
      //           state:data.state,
      //           stateStr:data.stateStr,
      //           teamid:data.teamid,
      //           workDate:data.workDate
      //         })
      //         console.log(this.list2)
      //       }
      //     }
      //   })
      // },
      // addMaterialsDetail(){//添加材料详情
      //   this.$dialog.OpenWindow({
      //     width: '1050',
      //     height: '600',
      //     url:'/workOrderMateriaListForm?offLine=1',
      //     title:'添加工单材料详情',
      //     closeCallBack:(data) =>{
      //       if (data) {
      //
      //       }
      //     }
      //   })
      // },
      addIncome(){//添加收入详情
        this.$dialog.OpenWindow({
          width: '1050',
          height: '692',
          title: '选择保险理赔',
          url: '/selectBankDetailInsurance?workOrderID='+this.otherCode,
          closeCallBack: (data) => {
            if(data){
              // let insertDate = new Date(accAdd(new Date().getTime(), accMul(this.bankDetailList.length, 1000)))
              // let num = accAdd(this.bankDetailList.length,1) + ''
              let money = 0
              this.incomeMoney.push(Number(data.money).toFixed(2))
              let idList = []
              for(let p in this.bankDetailList){
                idList.push(this.bankDetailList[p].dependid)
                if(idList.indexOf(data.id)!='-1'){
                  return
                }
              }
              this.bankDetailList.push({
                id: guid(),
                type:'0',
                ownerID:this.id,//主表id
                dependid:data.id,//当前收支明细id
                bankName:data.bankName+data.account,//我方账户
                cccurDate:data.moneyBackDate,//交易日期
                otherName:data.otherName,//对方账户名称
                otherID:'',//对方账户id
                subject:data.subject,//事由
                money:data.money,//金额
                selfAccount:data.actualMoney,//剩余开票金额
                remark:'',//备注
                account:'',
                num:guid(),
                // useMoney:datas.useMoney,
              })
              for(let i in this.incomeMoney){
                money += Number(this.incomeMoney[i])
              }
              this.revenue = money.toFixed(2)
              if(this.bankDetailList.length!='0'){
                let idArr = []
                for(let j in this.bankDetailList){
                  idArr.push("'"+this.bankDetailList[j].dependid+"'")
                }
                this.ajaxJson({
                  url: '/fin/getBankDetailList',
                  data: {
                    id:idArr.join(',')
                  },
                  call: (data) => {
                    for(let n in data){
                      this.bankDetailList[n].dependid=data[n].id,//当前收支明细id
                        this.bankDetailList[n].bankName=data[n].bankName+data[n].account,//我方账户
                        this.bankDetailList[n].cccurDate=data[n].cccurDate,//交易日期
                        this.bankDetailList[n].otherName=data[n].otherName,//对方账户名称
                        this.bankDetailList[n].subject=data[n].subject,//事由
                        this.bankDetailList[n].money=data[n].money,//金额
                        this.bankDetailList[n].selfAccount=data[n].actualMoney//剩余开票金额
                    }
                  }
                })
              }
            }
          }
        })
        // this.$dialog.OpenWindow({
        //   width: '1050',
        //   height: '700',
        //   url:'/selectBankDetail?direction=0&categoryBefore=1&selectType=1&type=1&otherID='+this.contactPersonID
        //     +'&annotation=注:该交易明细与工单里车主联系人有关,如果联系人与车主交易记录为空,则当前为空。',
        //   title:'绑定流水',
        //   closeCallBack:(data) =>{
        //     if(data){
        //       let datas = data[0]
        //       let insertDate = new Date(accAdd(new Date().getTime(), accMul(this.bankDetailList.length, 1000)))
        //       let num = accAdd(this.bankDetailList.length,1) + ''
        //       let money = 0
        //       this.incomeMoney.push(Number(datas.money).toFixed(2))
        //       this.bankDetailList.push({
        //         id: guid(),
        //         ownerID:this.offersudetailid,
        //         type:'0',
        //         ownerID:this.id,
        //         account:datas.account,
        //         money:datas.money,
        //         // actualMoney:datas.actualMoney,
        //         bankName:datas.bankName,
        //         cccurDate:datas.cccurDate,
        //         remark:datas.remark,
        //         subject:datas.subject,
        //         otherID:datas.otherID,
        //         otherName:datas.otherName,
        //         selfAccount:datas.selfAccount,
        //
        //         // insertDate: formatTime(insertDate),
        //         num:guid(),
        //         // useMoney:datas.useMoney,
        //       })
        //       for(let i in this.incomeMoney){
        //         money += Number(this.incomeMoney[i])
        //       }
        //       this.revenue = money.toFixed(2)
        //     }
        //   }
        // })
      },

      addService(){//添加项目支出
        this.$dialog.OpenWindow({
          width: '1050',
          height: '700',
          url:'/selectProcessServices?selectType=1&offLine=1&ownerID='+this.ownerID+ '&id='+'&orderid='+this.orderid +'&flowPathID='+this.flowPathID,
          title:'添加维修项目',
          closeCallBack:(data) =>{
            if(data){
              // this.fixOrderDetail = []
              let insertDate = new Date(accAdd(new Date().getTime(), accMul(this.fixOrderDetail.length, 1000)))
              let num = accAdd(this.fixOrderDetail.length,1) + ''
              let money = 0
              for(let i in data){
                this.projectMoney.push(Number(data[i].baseprice).toFixed(2))
                this.fixOrderDetail.push({//工单详情列表
                  id: guid(),
                  ownerID:this.id,
                  insertDate: formatTime(insertDate),
                  num:guid(),
                  name:data[i].proName,
                  // type:data[i].type,
                  teamid:data[i].proNum,
                  money:data[i].baseprice,
                  remark:data[i].remark,
                  workDate:data[i].workDate,
                  direction:data[i].direction,
                  dependid:data[i].departid,
                  category:data[i].category,
                  state:data[i].state,
                  stateStr:data[i].stateStr,
                })
              }
              for(let i in this.projectMoney){
                money += Number(this.projectMoney[i])
              }

              this.price = money.toFixed(2)
            }
          }
        })
      },
      addMaterials(){//添加材料详情信息
        this.$dialog.OpenWindow({
          width: '1050',
          height: '700',
          // url:'/selectPart?category=1&selectType=0',
          // url:'/selectMaterials?selectType=0&offLine=1&ownerID='+this.ownerID,
          url:'/workOrderMateriaListForm?offLine=1',
          title:'添加维修配件',
          closeCallBack:(data) =>{
            if(data){
              let money = 0
              let insertDate = new Date(accAdd(new Date().getTime(), accMul(this.fixOrderMaterial.length, 1000)))
              let num = accAdd(this.fixOrderMaterial.length,1) + ''
              this.partsMoney.push((Number(data.price) * Number(data.quantity)).toFixed(2))
              // for(let i in data){
              this.fixOrderMaterial.push({
                id: guid(),
                // type:'2',
                // insertDate: formatTime(insertDate),
                num:guid(),
                ownerID:this.id,
                product:data.product,
                productid:data.productid,
                category:data.category,
                applicableModels:data.applicableModels,
                type:'0',
                money:data.money,
                modelID:data.modelID,
                mdo:data.mdo==''?0:data.mdo,
                quantity:data.quantity==''?0:data.quantity,
                price:data.price,
                model:data.model,
              })
              // }
              for(let i in this.partsMoney){
                money += Number(this.partsMoney[i])
              }

              this.amount = money.toFixed(2)
              let actualMoney = 0
              // mdo//拆分数量
              // quantity//证件数量
              // price//单价
              if(data.mdo==''||data.mdo==0){
                actualMoney = (Number(data.quantity)*Number(data.price)).toFixed(2)
              }else{
                actualMoney = (Number(data.mdo)*Number(data.price)).toFixed(2)
              }
            }
          }
        })
      },
      delete(url,id){
        this.ajaxJson({
          url: url,
          data: {
            id:id
          },
          loading:'0',
          call: (data) => {

          }
        })
      },
      delServe(index,item,type){//删除详情时
        let url = ''
        let num = 0
        let money = 0
        if(type=='收入'){//收入详情表的删除
          url = '/fix/Offer/OffersudetailDelete'
          for(let c in this.bankDetailList){
            if(this.bankDetailList[c].num == item.num){
              this.bankDetailList.splice(c,1)
            }
          }
          this.incomeMoney = []
          for(let a in this.bankDetailList){
            num = Number(this.bankDetailList[a].money).toFixed(2)
            try{
              this.incomeMoney.push(num+'')
            }catch (e) {
            }
          }
          for(let i in this.incomeMoney){
            money += Number(this.incomeMoney[i])
          }
          this.revenue = money.toFixed(2)
          // this.bankDetailList.splice(index,1)
          // this.revenue = Number(this.revenue) - Number(item.money).toFixed(2)
          if(this.add!='1'){
            this.delete(url,item.id)
          }
        }else if(type=='项目支出'){//工单详情表的删除
          url = '/fix/Offer/fixrevenueDelete'
          for(let c in this.fixOrderDetail){
            if(this.fixOrderDetail[c].num == item.num){
              this.fixOrderDetail.splice(c,1)
            }
          }
          this.projectMoney = []
          for(let a in this.fixOrderDetail){
            num = (Number(this.fixOrderDetail[a].money)).toFixed(2)
            try{
              this.projectMoney.push(num+'')
            }catch (e) {
            }
          }
          for(let i in this.projectMoney){
            money += Number(this.projectMoney[i])
          }

          this.price = money.toFixed(2)
          if(this.add!='1'){
            this.delete(url,item.id)
          }
        }else if(type=='材料支出'){//材料表的删除
          url = '/fix/Offer/offermaterialDelete'
          for(let c in this.fixOrderMaterial){
            if(this.fixOrderMaterial[c].num == item.num){
              this.fixOrderMaterial.splice(c,1)
            }
          }
          this.partsMoney = []
          for(let a in this.fixOrderMaterial){
            num = (Number(this.fixOrderMaterial[a].price) * Number(this.fixOrderMaterial[a].quantity)).toFixed(2)
            try {
              this.partsMoney.push(num+'')
            }catch (e) {
            }
          }
          for(let i in this.partsMoney){
            money += Number(this.partsMoney[i])
          }
          this.amount = money.toFixed(2)
          if(this.add!='1'){
            this.delete(url,item.id)
          }
        }else if(type=='定损'){
          url = '/fix/Offer/fixdetailDelete'
          this.list.splice(index,1)
          this.money = Number(this.money) - Number(item.money).toFixed(2)
          if(this.add!='1'){
            this.delete(url,item.id)
          }
        }
        item.isDel = '1'
        this.deleteList.push(item)
      },
      save(){
        let sub = ''
        try {
          sub = this.subList[this.sub].showName
        }catch (e) {

        }
        let a = this.validator()
        this.totalMoney = (Number(this.price)+Number(this.amount)).toFixed(2)
        this.pendingMoney = this.totalMoney
        if(this.contactPersonID==''){
          this.ajaxJson({
            url: '/Basic/selectPersonJson',
            data: {
              category: "",
              commonUse: "",
              init: true,
              personName: "",
              searchStr:this.contactPerson
            },
            call: (param) => {
              if(param.content.length>'1'){
                this.$dialog.alert({
                  tipValue:'该联系人存在多个,请确认并重新选择联系人',
                  alertImg:'warn',
                  width:'390',
                  closeCallBack: () => {
                    this.$dialog.OpenWindow({
                      width: '950',
                      height: '700',
                      url: '/selectPerson?category=1&categoryBefore=1&searchStr='+this.contactPerson,
                      title: '选择联系人信息',
                      closeCallBack: (data) => {
                        if (data) {
                          this.contactPerson = data.name
                          this.contactPersonID = data.id
                        }
                      }
                    })
                  }
                })
              }else if(param.content.length=='1'){
                this.contactPerson = param.content[0].name
                this.contactPersonID = param.content[0].id
              }else{
                this.$dialog.alert({
                  tipValue:'该联系人未被登记,需要先进行登记',
                  alertImg:'warn',
                  width:'330',
                  closeCallBack: () => {
                    this.$dialog.OpenWindow({
                      width: '1050',
                      height: '700',
                      url: '/addPersonForm?sUrl=0&name='+this.contactPerson,
                      title: '添加联系人信息',
                      closeCallBack: (data) => {
                        if(data){
                          this.contactPersonID = data
                        }
                      }
                    })
                  }
                })
              }
            }
          })
          return
        }


        this.ajaxJson({
          url: '/Basic/getPlateForm',
          data: {
            plate: this.vehicle
          },
          call: (datas) => {
            if(datas){
              this.vehicleID = datas.id
              this.vehicleModel = datas.brandID
              this.carOwner = datas.carOwner
              this.carOwnerID = datas.carOwnerID
              if(a){
                let params = {
                  id:this.id,
                  payment:this.payment,//付款方
                  paymentid:this.paymentid,//付款方id
                  personal:this.personal,//付款方类型 0公司 1个人
                  receivedMoney:this.revenue,//收入总计金额
                  vehicleModel:this.vehicleModel,//车辆型号id
                  principal:this.principal,//负责人
                  principalID:this.principalID,//负责人ID
                  category:this.category,//维修类型
                  money:this.money,//定损金额
                  client:this.client,//客服
                  clientID:this.clientID,//客服ID
                  jobtype:this.jobtype,//作业分类类型
                  vehicle:this.vehicle,//车辆拍照
                  vehicleID:this.vehicleID,//车辆ID
                  workDate:this.workDate,//发生日期
                  endDate:this.endDate,//预计交车时间
                  code:this.code,//编号
                  otherCode:this.otherCode,//其它系统编号
                  orderSource:this.orderSource,//工单来源
                  source:this.source,//业务来源
                  state:this.state,//工单状态
                  applicableModels:this.applicableModels,//适用车型
                  sub:sub,//保险公司
                  subid:this.subid,//保险公司ID
                  phone:this.phone,//联系人手机号
                  trademark:this.trademark,//品牌
                  remark:this.remark,//备注
                  carOwner:this.carOwner,//车主姓名
                  carOwnerID:this.carOwnerID,//车主ID
                  contactPerson:this.contactPerson,//联系人姓名
                  contactPersonID:this.contactPersonID,//联系人ID
                  fixid:this.fixid,//定损单ID
                  orderid:this.orderid,//工单ID
                  martailid:this.martailid,//材料表ID
                  offersudetailid:this.offersudetailid,//收入ID
                  param:{//文件
                    id: this.id,
                    list:this.fileList
                  },

                  amount:this.amount,//配件金额
                  profit:this.profit,//盈利
                  price:this.price,//项目金额
                  cost:this.cost,//成本
                  revenue:this.revenue,//总收入
                  totalMoney:this.totalMoney,//合计金额
                  pendingMoney:this.pendingMoney,//代结金额

                  fixrevenueList:this.fixOrderDetail,//工单详情列表
                  fixdetailList:this.list,//定损单详情列表
                  offersudetailList:this.bankDetailList,//收入详情列表
                  offermaterialList:this.fixOrderMaterial,//材料详情列表
                }
                this.ajaxJson({
                  url: '/fix/Offer/save',
                  data: params,
                  call: (data) => {
                    if (data.type == 0) {
                      this.$dialog.setReturnValue(this.id)
                      this.$dialog.alert({
                        tipValue: data.message,
                        closeCallBack: () => {
                          this.$dialog.close()

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
            }else{
              this.$dialog.alert({
                tipValue:'该车辆未被登记,需要先进行登记',
                alertImg:'warn',
                width:'330',
                closeCallBack: () => {
                  this.$dialog.OpenWindow({
                    width: '1050',
                    height: '700',
                    url: '/vehicleForm?searchStr='+this.vehicle,
                    title: '添加车辆信息',
                    closeCallBack: (data) => {


                    }
                  })
                }
              })
            }
          }
        })

      },
      initData () {
        let params = {
          id:this.id
        }
        this.ajaxJson({
          url: '/fix/Offer/initForm',
          data: params,
          call: (data) => {
            if(data){
              let item = {}
              this.ownerID = guid()
              this.orderid = guid()
              this.subList = data.mapList
              for(let i in this.subList){
                this.subList[i].num = i
              }
              this.insurance = this.sub.concat()
              this.personal = data.personal
              this.payment = data.payment
              this.paymentid = data.paymentid

              // this.subid = this.subList[this.sub].id//保险公司id
              // this.subCode = this.subList[this.sub].code//保险公司缩写
              // this.subName = this.subList[this.sub].showName//保险公司名称
              this.jobtype = data.jobtype//作业分类类型
              this.jobtypeList = data.jobtypePsd.list//作业分类
              this.jobtypeBackupsList = data.jobtypePsd.list//作业分类的备份
              for(let j in data.jobtypePsd.list){
                if(data.jobtypePsd.list[j].showName!='自费'){
                  this.jobtypeLists.push(data.jobtypePsd.list[j])
                }
              }
              this.stateList = data.statePsd//工单状态
              this.categoryList = data.categoryPsd//维修类型
              this.applicableModelsList = data.applicableModelsPsd//库存类型
              this.sourceList = data.sourcePsd//业务来源
              this.orderSourceList = data.orderSourcePsd//工单来源
              this.formTypeList = data.formTypePsd.list//定损单类型
              this.typeList = data.typePsd.list//材料类型
              item.formTypeList = this.formTypeList
              sessionStorage.lossAssessmentDetailsData = JSON.stringify(item)//将素材传到添加定损单详情页面
              this.directionList = data.directionPsd.list//收支方向
              if(data.id!=''){
                this.id = data.id
                this.principal = data.principal//负责人
                this.principalID = data.principalID//负责人ID
                this.category = data.category//维修类型
                this.money = data.money//定损金额
                this.client = data.client//客服
                this.clientID = data.clientID//客服ID
                this.vehicle = data.vehicle//车辆拍照
                this.vehicleID = data.vehicleID//车辆ID
                this.workDate = data.workDate//发生日期
                this.endDate = data.endDate//预计交车时间
                this.code = data.code//编号
                this.otherCode = data.otherCode//其它系统编号
                this.orderSource = data.orderSource//工单来源
                this.source = data.source//业务来源
                this.state = data.state//工单状态
                if(data.fileList==null){
                  this.fileList = []
                }else{
                  this.fileList = data.fileList
                }
                this.applicableModels = data.applicableModels//适用车型
                for(let i in this.subList){
                  if(this.subList[i].showName==this.sub){
                    this.sub = i
                  }
                }
                this.subid = data.subid//保险公司ID
                this.remark = data.remark//备注
                this.carOwner = data.carOwner//车主姓名
                this.carOwnerID = data.carOwnerID//车主ID
                this.contactPerson = data.contactPerson//联系人姓名
                this.contactPersonID = data.contactPersonID//联系人ID
                this.amount = data.amount//配件金额
                this.profit = data.profit//盈利
                this.price = data.price//项目金额
                this.cost = data.cost//成本
                this.phone = data.phone//联系人
                this.trademark = data.trademark//品牌
                this.revenue = data.revenue//总收入
                this.totalMoney = data.totalMoney//合计金额
                this.pendingMoney = data.pendingMoney//代结金额
                this.receivedMoney = data.receivedMoney//收入总计金额

                this.fixOrderDetail = data.fixrevenueList//工单详情列表
                this.list = data.fixdetailList//定损单详情列表
                this.bankDetailList = data.offersudetailList//收入详情列表
                this.fixOrderMaterial = data.offermaterialList//材料详情列表
                if(this.bankDetailList.length!='0'){
                  let idArr = []
                  for(let j in this.bankDetailList){
                    idArr.push("'"+this.bankDetailList[j].dependid+"'")
                  }
                  this.ajaxJson({
                    url: '/fin/getBankDetailList',
                    data: {
                      id:idArr.join(',')
                    },
                    call: (datas) => {
                      for(let n in datas){
                        this.bankDetailList[n].dependid=datas[n].id,//当前收支明细id
                        this.bankDetailList[n].bankName=datas[n].bankName+datas[n].account,//我方账户
                        this.bankDetailList[n].cccurDate=datas[n].cccurDate,//交易日期
                        this.bankDetailList[n].otherName=datas[n].otherName,//对方账户名称
                        this.bankDetailList[n].subject=datas[n].subject,//事由
                        this.bankDetailList[n].money=datas[n].money,//金额
                        this.bankDetailList[n].selfAccount=datas[n].actualMoney//剩余开票金额
                      }
                    }
                  })
                }
                let money = 0
                for(let a in this.fixOrderDetail){//工单详情
                  try{
                    this.projectMoney.push((Number(this.fixOrderDetail[a].money)).toFixed(2))
                  }catch (e) {
                  }
                }
                for(let i in this.projectMoney){
                  money += Number(this.projectMoney[i])
                }
                this.price = money.toFixed(2)

                let money2 = 0
                this.partsMoney = []
                for(let b in this.fixOrderMaterial){//材料支出
                  try {
                    this.partsMoney.push((Number(this.fixOrderMaterial[b].price) * Number(this.fixOrderMaterial[b].quantity)).toFixed(2))
                  }catch (error) {
                  }
                }
                for(let j in this.partsMoney){
                  money2 += Number(this.partsMoney[j])
                }
                this.amount = money2.toFixed(2)

                let money3 = 0
                this.incomeMoney = []
                for(let e in this.bankDetailList){//收入详情
                  try{
                    this.incomeMoney.push(Number(this.bankDetailList[e].money).toFixed(2))
                  }catch (error) {
                  }
                }
                for(let k in this.incomeMoney){
                  money3 += Number(this.incomeMoney[k])
                }
                this.revenue = money3.toFixed(2)
                this.receivedMoney = this.revenue
                this.accessNumber()
                this.$nextTick(()=>{
                  if(this.type=='1'){//材料费
                    this.tabState = [{select:false},{select:true},{select:false}]
                  }else if(this.type=='3'){//收入金额
                    this.tabState = [{select:false},{select:false},{select:true}]
                  }
                })
                // console.log(this.fixrevenueList,'工单详情列表')
                // console.log(this.fixdetailList,'定损单详情列表')
                // console.log(this.offersudetailList,'收入详情列表')
                // console.log(this.offermaterialList,'材料详情列表')

              }

            }
          }
        })

      }
    },
    created () {
      this.setQuery2Value('id')
      this.setQuery2Value('add')
      this.setQuery2Value('type')
      this.initData()

    }
  }
</script>

<style scoped>

</style>
