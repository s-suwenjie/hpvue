<template>
    <div class="f_main">
      <yhm-view-body :customize="true" :pager="false">
        <template #title>基本信息</template>
        <template #body>
<!--          <yhm-view-control title="负责人" :content="principal"></yhm-view-control>-->
          <yhm-view-control title="客服" :content="client" ></yhm-view-control>
          <yhm-view-control title="车辆" :content="vehicle" ></yhm-view-control>
<!--          <yhm-view-control title="工单创建日期" :content="workDate" type="date"></yhm-view-control>-->
          <yhm-view-control title="预计交车时间" :content="endDate"  type="date"></yhm-view-control>
          <yhm-view-control title="OA项目号" :content="code" ></yhm-view-control>
          <yhm-view-control title="传奇及DMS工单号" :content="otherCode" ></yhm-view-control>
          <yhm-view-control title="适用车型" :content="applicableModels" :psd="applicableModelsList.list"></yhm-view-control>
          <yhm-view-control title="保险公司" v-show="category=='0'?true:false" :content="sub"></yhm-view-control>
          <yhm-view-control title="维修类型" :content="category" :psd="categoryList.list"></yhm-view-control>
          <yhm-view-control title="工单来源" :content="orderSource" :psd="orderSourceList.list" ></yhm-view-control>
          <yhm-view-control title="业务来源" :content="source" :psd="sourceList.list" ></yhm-view-control>
          <yhm-view-control title="状态" :content="state" :psd="stateList.list" ></yhm-view-control>
          <yhm-view-control title="备注" :content="remark" category="3"></yhm-view-control>

        </template>
      </yhm-view-body>
      <div class="f_split"></div>
      <yhm-view-tab>
        <template #tab>
          <yhm-view-tab-button :list="tabState" :index="0">项目详情</yhm-view-tab-button>
          <yhm-view-tab-button :list="tabState" :index="1">材料详情</yhm-view-tab-button>
          <yhm-view-tab-button :list="tabState" :index="2">收入详情</yhm-view-tab-button>
        </template>
        <template #content>
          <yhm-view-tab-list :customize="true" :pager="false" v-show="tabState[0].select">
            <template #listHead>
              <yhm-managerth width="38" title="序号"></yhm-managerth>
              <yhm-managerth title="项目名称"></yhm-managerth>
              <yhm-managerth title="全部维修流程"></yhm-managerth>
              <yhm-managerth width="150" title="变化金额"></yhm-managerth>
              <yhm-managerth width="150" title="折扣价"></yhm-managerth>
            </template>
            <template #listBody>
              <tr v-for="(item,index) in fixOrderDetail" :key="index" :class="{InterlacBg:index%2!==0}">
                <yhm-manager-td-center :value="index+1"></yhm-manager-td-center>
                <yhm-manager-td :tip="true" node-class-name="f_main" :value="item.name+''"></yhm-manager-td>
                <yhm-manager-td-center :value="item.teamNameList"></yhm-manager-td-center>
                <yhm-manager-td-money :value="item.money+''"></yhm-manager-td-money>
                <yhm-manager-td-money :value="item.discount+''"></yhm-manager-td-money>
              </tr>
            </template>
            <template #customize>
              <yhm-view-control type="money" title="项目金额" :content="productMoney=='-1'?'0':productMoney" color="#4BB414"></yhm-view-control>
              <yhm-view-control type="money" title="材料金额" :content="mailMoney==-1?'0':mailMoney" color="#2193b0"></yhm-view-control>
              <yhm-view-control type="money" title="项目金额 + 材料金额 = 合计金额" :content="(Number(productMoney=='-1'?'0':productMoney)+Number(mailMoney==-1?'0':mailMoney))+''" color="#fd6802"></yhm-view-control>
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
              <yhm-managerth width="38" title="序号"></yhm-managerth>
              <yhm-managerth title="商品名称"></yhm-managerth>
              <yhm-managerth title="规格型号"></yhm-managerth>
              <yhm-managerth style="width: 120px" title="拆分数量"></yhm-managerth>
              <yhm-managerth style="width: 120px" title="整件数量"></yhm-managerth>
              <yhm-managerth style="width: 120px" title="单价"></yhm-managerth>
              <yhm-managerth style="width: 120px" title="金额"></yhm-managerth>
            </template>
            <template #listBody>
              <tr v-for="(item,index) in fixOrderMaterial" :class="[{InterlacBg:index%2!=0}]" :key="item.id">
                <yhm-manager-td-center :value="index+1"></yhm-manager-td-center>
                <yhm-manager-td :tip="true" node-class-name="f_main" :value="item.product"></yhm-manager-td>
                <yhm-manager-td :tip="true" node-class-name="f_main" :value="item.model"></yhm-manager-td>
                <yhm-manager-td-center :value="item.mdo"></yhm-manager-td-center>
                <yhm-manager-td-center :value="item.quantity+''"></yhm-manager-td-center>
                <yhm-manager-td-money :value="item.price"></yhm-manager-td-money>
                <yhm-manager-td-money :value="item.money"></yhm-manager-td-money>
                <!--                <yhm-manager-td-center :value="fixOrderMaterial[item.quantity].showName"></yhm-manager-td-center>-->

              </tr>
            </template>
            <template #customize>
              <yhm-view-control type="money" title="项目金额" :content="productMoney=='-1'?'0':productMoney" color="#4BB414"></yhm-view-control>
              <yhm-view-control type="money" title="材料金额" :content="mailMoney==-1?'0':mailMoney" color="#2193b0"></yhm-view-control>
              <yhm-view-control type="money" title="项目金额 + 材料金额 = 合计金额" :content="(Number(productMoney=='-1'?'0':productMoney)+Number(mailMoney==-1?'0':mailMoney))+''" color="#fd6802"></yhm-view-control>
            </template>
            <template #empty>
              <span class="m_listNoData" v-show="fixOrderMaterial.length=='0'?true:false">暂时没有数据</span>
            </template>
            <template #pager>
              <yhm-pagination :pager="pager" is-page-size="false" @initData="initPageData(false)"></yhm-pagination>
            </template>
          </yhm-view-tab-list>
          <yhm-view-tab-list :customize="true" :pager="false" v-show="tabState[2].select">
            <template #listHead>
              <yhm-managerth title="查看" width="38"></yhm-managerth>
              <yhm-managerth width="38" title="序号"></yhm-managerth>
              <yhm-managerth title="我方账户"></yhm-managerth>
              <yhm-managerth width="110" title="交易日期"></yhm-managerth>
              <yhm-managerth title="对方账户"></yhm-managerth>
              <yhm-managerth width="40" title="收支"></yhm-managerth>
              <yhm-managerth width="110" title="事由"></yhm-managerth>
              <yhm-managerth width="105" title="交易金额"></yhm-managerth>
              <!--        <yhm-managerth width="105" title="可核销金额"></yhm-managerth>-->
              <yhm-managerth width="150" title="备注"></yhm-managerth>
              <!--        <yhm-managerth width="40" title="删除"></yhm-managerth>-->
            </template>
            <template #listBody>
              <tr v-for="(item,index) in bankDetailList" :class="[{InterlacBg:index%2!=0}]" :key="item.id">
                <yhm-manager-td-look @click="lookOver(item)"></yhm-manager-td-look>
                <yhm-manager-td-center :value="index+1"></yhm-manager-td-center>
                <yhm-manager-td-html :tip="true" node-class-name="f_main" :value="item.selfAccount"></yhm-manager-td-html>
                <yhm-manager-td-date :value="item.cccurDate"></yhm-manager-td-date>
                <yhm-manager-td-html :tip="true" node-class-name="f_main" :value="item.otherName"></yhm-manager-td-html>
                <yhm-manager-td-center value="收入" color="#49a9ea" class="dfJcc"></yhm-manager-td-center>
                <yhm-manager-td :tip="true" node-class-name="f_main" :value="item.subject"></yhm-manager-td>
                <yhm-manager-td-money :value="item.money"></yhm-manager-td-money>
                <!--          <yhm-manager-td-money :value="item.useMoney"></yhm-manager-td-money>-->
                <yhm-manager-td :tip="true" tip-type-left="130" tip-type="r" node-class-name="f_main" :value="item.remark"></yhm-manager-td>
                <!--          <yhm-form-td-delete width="40" :list="bankDetailList" :value="item" :del-click="true" @click="delServe(index,item,'收入')"></yhm-form-td-delete>-->
              </tr>
            </template>
            <template #customize>
              <yhm-view-control type="money" title="合计金额" :content="expend" color="#fd6802"></yhm-view-control>
              <yhm-view-control type="money" title="未收金额" :content="remreceivedMoney" color="#2193b0"></yhm-view-control>
              <yhm-view-control type="money" title="已收金额" :content="totalMoney" color="#4BB414"></yhm-view-control>
            </template>
            <template #empty>
              <span class="m_listNoData" v-show="bankDetailList.length=='0'?true:false">暂时没有数据</span>
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
      <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate"></yhm-formoperate>
    </div>
</template>

<script>
  import { viewmixin } from '@/assets/view.js'
  import { formatDate } from '@/assets/common.js'
  export default {
    name: 'workOrderView',
    mixins: [viewmixin],
    data(){
      return{
        createName:'',
        insertDate:'',
        updateName:'',
        updateDate:'',
        bankDetailList:[],//收支明细
        fixOrderDetail:[],//项目详情
        fixOrderMaterial:[],//材料详情
        tabState:[{select:true},{select:false},{select:false}],
        currentDate: formatDate(new Date()),//当前日期
        expend:'0',//合计金额
        productMoney:'0',//项目金额
        mailMoney:'0',//材料金额
        totalMoney:'0',//已收金额
        remreceivedMoney:'0',//未收金额
        principalID:'',//负责人ID
        principal:'',//负责人
        clientID:'',//客服ID
        client:'',//客服
        vehicleID:'',//车辆ID
        vehicle:'',//车辆
        code:'',//编号
        otherCode:'',//其它系统编号
        workDate: formatDate(new Date()),//发生日期
        state:'0',//状态
        category:'0',//维修类型
        applicableModels:'',//适用车型
        sub:'0',//保险公司
        subName:'',//保险公司名称
        subid:'',//保险公司ID
        subCode:'',//保险公司编号
        source:'0',//业务来源
        orderSource:'0',//工单来源
        contactPersonID:'',//联系人ID
        carOwnerID:'',//车主ID
        endDate: formatDate(new Date()),//预计交车时间
        remark:'',//备注

        noInvoice:false,
        subList:[],
        sourceList:[],
        orderSourceList:[],
        stateList:[],
        categoryList:[],
        applicableModelsList:[],
        invoiceDetails:[
          {
            code:'958751326',
            currentDate:formatDate(new Date()),
            category:'保险理赔',
            money:'',
            rate:'50',
            rateMoney:''
          },
          {
            code:'568798651',
            currentDate:formatDate(new Date()),
            category:'自费理赔',
            money:'',
            rate:'50',
            rateMoney:''
          }
        ],
      }
    },
    methods:{
      lookOver(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '650',
          url: '/unitDetailView?id='+item.dependid,
          title: '查看收支明细',
          closeCallBack:(data) =>{
            this.initData()
          }
        })
      },
      initData () {
        let params = {
          id:this.id,
        }
        this.ajaxJson({
            url: '/fix/fixOrder/initForm',
            // loading:'0',
            data:{
              id:this.id
            },
            call: (data) => {
              if(data){
                this.fixOrderDetail = data.fixOrderDetail.list//项目详情
                this.fixOrderMaterial = data.fixOrderMater.list//材料详情
                this.totalMoney = data.summary.totalMoney//已收金额
                this.remreceivedMoney = data.remreceivedMoney//未收金额
                this.expend = data.expend
                if(this.type=='1'){
                  this.tabState[0].select = false
                  this.tabState[1].select = true
                  this.tabState[2].select = false
                }else{
                  this.tabState[0].select = true
                  this.tabState[1].select = false
                  this.tabState[2].select = false
                }

                let arr = []
                let teamNameList = []
                for(let i in this.fixOrderDetail){
                  arr.push(this.fixOrderDetail[i].teamid)
                  teamNameList = []
                  if(this.fixOrderDetail[i].teamid.indexOf('0')!=-1){
                    teamNameList.push('钣金拆装或修复')
                  }
                  if(this.fixOrderDetail[i].teamid.indexOf('1')!=-1){
                    teamNameList.push('做底')
                  }
                  if(this.fixOrderDetail[i].teamid.indexOf('2')!=-1){
                    teamNameList.push('喷漆')
                  }
                  if(this.fixOrderDetail[i].teamid.indexOf('3')!=-1){
                    teamNameList.push('钣金装配')
                  }
                  if(this.fixOrderDetail[i].teamid.indexOf('4')!=-1){
                    teamNameList.push('抛光')
                  }
                  if(this.fixOrderDetail[i].teamid.indexOf('6')!=-1){
                    teamNameList.push('保养')
                  }
                  this.fixOrderDetail[i].teamNameList = teamNameList.join(',')
                }
                this.bankDetailList = []
                for(let y in data.summary.list){
                  if(data.summary.list[y].type=='0'){
                    this.bankDetailList.push({
                      id: data.summary.list[y].id,
                      type:'0',
                      insertDate: data.summary.list[y].cccurDate,
                      num:this.bankDetailList.length+1+'',
                      selfAccount:data.summary.list[y].bankName + data.summary.list[y].account,
                      cccurDate:data.summary.list[y].cccurDate,//交易日期
                      otherName:data.summary.list[y].otherName+data.summary.list[y].otherAount,//对方账户
                      subject:data.summary.list[y].subject,
                      money:data.summary.list[y].actualMoney,
                      // useMoney:datas.useMoney,
                      remark:data.summary.list[y].remark,
                      dependid:data.summary.list[y].dependid,
                    })
                  }
                }
                this.mailMoney = data.mailMoney//材料金额
                this.productMoney = data.productMoney//项目金额

                this.stateList = data.statePsd
                this.categoryList = data.categoryPsd
                this.applicableModelsList = data.applicableModelsPsd
                this.applicableModels = data.applicableModels
                this.sourceList = data.sourcePsd
                this.orderSourceList = data.orderSourcePsd
                this.subList = data.mapList
                for(let i in this.subList){
                  if(data.sub==i){
                    this.sub = this.subList[i].showName
                  }
                }
                this.principal = data.principal//负责人
                this.principalID = data.principalID//负责人ID
                this.client = data.client//客服
                this.clientID = data.clientID//客服ID
                this.vehicle = data.vehicle//车辆ID

                this.code = data.code//编号
                this.otherCode = data.otherCode//其它系统编号
                this.workDate = data.workDate//发生日期
                this.category = data.category//维修类型
                this.state = data.state//状态
                this.source = data.source//业务来源
                this.orderSource = data.orderSource//工单来源
                this.endDate = data.endDate//预计交车时间


                this.remark = data.remark//备注
                this.createName = data.createName
                this.insertDate = data.insertDate
                this.updateName = data.updateName
                this.updateDate = data.updateDate
              }
            }
        })
      },
    },
    created () {
      this.setQuery2Value('type')
      this.setQuery2Value('id')
      // this.otherCode = 'O' + Math.floor(Math.random()*1000) + 'C' + Math.floor(Math.random()*1000000)
      // this.accessNumber()
      this.initData()

    }
  }
</script>

<style scoped>

</style>
