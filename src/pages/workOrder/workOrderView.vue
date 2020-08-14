<template>
    <div class="f_main">
      <yhm-view-body :customize="true" :pager="false">
        <template #title>基本信息</template>
        <template #body>
          <yhm-view-control title="负责人" :content="principal"></yhm-view-control>
          <yhm-view-control title="客服" :content="client" ></yhm-view-control>
          <yhm-view-control title="车辆" :content="vehicle" ></yhm-view-control>
          <yhm-view-control title="发生日期" :content="workDate" type="date"></yhm-view-control>
          <yhm-view-control title="预计交车时间" :content="endDate"  type="date"></yhm-view-control>
          <yhm-view-control title="编号" :content="code" ></yhm-view-control>
          <yhm-view-control title="其它系统编号" :content="otherCode" ></yhm-view-control>
          <yhm-view-control title="适用车型" :content="applicableModels" :psd="applicableModelsList.list"></yhm-view-control>
          <yhm-view-control title="保险公司" :content="sub"></yhm-view-control>
          <yhm-view-control title="维修类型" :content="category" :psd="categoryList.list"></yhm-view-control>
          <yhm-view-control title="工单来源" :content="orderSource" :psd="orderSourceList.list" ></yhm-view-control>
          <yhm-view-control title="业务来源" :content="source" :psd="sourceList.list" ></yhm-view-control>
          <yhm-view-control title="状态" :content="state" :psd="stateList.list" ></yhm-view-control>
          <yhm-view-control title="业务来源" :content="source" :psd="sourceList.list" ></yhm-view-control>
          <yhm-view-control title="备注" :content="remark" category="3"></yhm-view-control>

        </template>
      </yhm-view-body>
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
        currentDate: formatDate(new Date()),//当前日期
        principalID:'',//负责人ID
        principal:'',//负责人
        clientID:'',//客服ID
        client:'',//客服
        vehicleID:'',//车辆ID
        vehicle:'',//车辆
        code:'',//编号
        otherCode:'',//其它系统编号
        workDate: '',//发生日期
        state:'0',//状态
        category:'0',//维修类型
        applicableModels:'0',//适用车型
        sub:'0',//保险公司
        subName:'',//保险公司名称
        subid:'',//保险公司ID
        subCode:'',//保险公司编号
        source:'0',//业务来源
        orderSource:'0',//工单来源
        contactPersonID:'',//联系人ID
        carOwnerID:'',//车主ID
        endDate: '',//预计交车时间
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
      initData () {
        let params = {
          id:this.id,
        }
        this.ajaxJson({
            url: '/fix/fixOrder/initForm',
            loading:'0',
            data:{
              id:this.id
            },
            call: (data) => {
              this.stateList = data.statePsd
              this.categoryList = data.categoryPsd
              this.applicableModelsList = data.applicableModelsPsd
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
            }
        })
      },
    },
    created () {
      this.setQuery2Value('id')
      // this.otherCode = 'O' + Math.floor(Math.random()*1000) + 'C' + Math.floor(Math.random()*1000000)
      // this.accessNumber()
      this.initData()

    }
  }
</script>

<style scoped>

</style>
