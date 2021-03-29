<template>
  <div class="f_main">
    <yhm-view-body>
      <template #title>基本信息</template>
      <template #body>
        <yhm-view-control title="推修公司" :content="unit" ></yhm-view-control>
<!--        <yhm-view-control title="启用日期" :content="startDate" type="date"></yhm-view-control>-->
<!--        <yhm-view-control title="结束日期" :content="endDate" type="date"></yhm-view-control>-->
        <yhm-view-control title="自保费率" :content="selfrate + '%'"></yhm-view-control>
        <yhm-view-control title="非自保费率" :content="noselfrate + '%'"></yhm-view-control>
        <yhm-view-control title="结算类型" :content="type" :psd="typeList"></yhm-view-control>

      </template>
    </yhm-view-body>
    <div class="f_split"></div>
    <yhm-view-tab>
      <template #tab>
        <yhm-view-tab-button :list="tabState" :index="0" @click="initPageData">工单信息</yhm-view-tab-button>
      </template>
      <template #operate>
        <yhm-radiofilter  @initData="initData(false)" title="状态" style="margin: 5px 0;" :content="pendingstateList"></yhm-radiofilter>
      </template>
      <template #tab_total>
        <div style="display:flex;align-items: center;">
          <div style="margin-right: 30px">
            <div style="width: 100%;display: flex;justify-content: space-between;align-items: center;">
              <yhm-form-date title="开始日期" width="180" :max="endDateCustom" :error-show="false" @call="dateClick(startDateCustom,endDateCustom)" :value="startDateCustom" id="startDateCustom"></yhm-form-date>
              <yhm-form-date title="结束日期" width="180" :error-show="false" @call="dateClick(startDateCustom,endDateCustom)" :value="endDateCustom" id="endDateCustom"></yhm-form-date>
            </div>
          </div>
          <div style="background: #c5daeb;margin-right: 2px;">
            <table style="width:300px;height: 50px;" >
              <thead>
              <th >总数</th>
              <th style="color: #2193B0; width: 110px;">预计推送费</th>
              <th style="color: #f00; width: 110px;">已产生营业额</th>
<!--              <th style="color: #fd6802; width: 80px;">工单金额</th>-->
              </thead>
              <tbody>
              <tr  style="background: #fff;box-sizing: border-box;">
                <td style="text-align: center;">{{pager.total}} </td>
                <td v-html="tenThousandFormatShow(sumpending+'')" style="color: #2193B0;text-align: right;box-sizing: border-box;padding-right:10px "></td>
                <td v-html="tenThousandFormatShow(sumpendingmoney+'')" style="color: #f00;text-align: right;box-sizing: border-box;padding-right:10px "></td>
<!--                <td v-html="tenThousandFormatShow(totalMoney+'')" style="color: #fd6802;text-align: right;box-sizing: border-box;padding-right:10px "></td>-->
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </template>
      <template #content>
        <yhm-view-tab-list :customize="true" >
          <template #listHead>
            <yhm-managerth style="width: 38px;" title="查看"></yhm-managerth>
            <yhm-managerth title="接待日期"></yhm-managerth>
            <yhm-managerth width="180" title="工单号"></yhm-managerth>
            <yhm-managerth title="车牌号"></yhm-managerth>
<!--            <yhm-managerth title="送修人"></yhm-managerth>-->
            <yhm-managerth width="70" title="费率类型"></yhm-managerth>
            <yhm-managerth width="70" title="待结状态"></yhm-managerth>
            <yhm-managerth title="预计推送费"></yhm-managerth>
            <yhm-managerth title="已产生营业额"></yhm-managerth>
            <yhm-managerth width="80" title="操作"></yhm-managerth>
          </template>
          <template #listBody>
            <tr v-for="(item,index) in content" :key="index" :class="{InterlacBg:index%2!==0}">
              <yhm-manager-td-look @click="lookOver(item)"></yhm-manager-td-look>
              <yhm-manager-td-date :value="item.visitDate"></yhm-manager-td-date>
              <yhm-manager-td-center :value="item.code" ></yhm-manager-td-center>
              <yhm-manager-td :value="item.carName" type="vehicle"></yhm-manager-td>
<!--              <yhm-manager-td-center :value="item.contactPerson"></yhm-manager-td-center>-->
              <yhm-manager-td-center :value="item.type=='0'?'自保':'非自保'"></yhm-manager-td-center>
              <yhm-manager-td-center :color="item.pendingstate=='0'?'':'#00bb68'" :value="item.pendingstate=='0'?'待结账':'已结账'"></yhm-manager-td-center>
              <yhm-manager-td-money style="color:#2193B0" :value="item.pending==''?'0':item.pending"></yhm-manager-td-money>
              <yhm-manager-td-money style="color:#f00" :value="item.pendingmoney==''?'0':item.pendingmoney"></yhm-manager-td-money>
              <yhm-manager-td-operate>
                <yhm-manager-td-operate-button @click="settleAccounts(item)" v-show="item.pendingstate=='0'?true:false" value="结账" icon="i-btn-applicationSm" color="#be08e3"></yhm-manager-td-operate-button>
              </yhm-manager-td-operate>
            </tr>
          </template>
          <template #empty>
            <span class="m_listNoData" v-show="content.length=='0'?true:false">暂时没有数据</span>
          </template>
          <template #pager>
            <yhm-pagination :pager="pager" @initData="initData(false)"></yhm-pagination>
          </template>
        </yhm-view-tab-list>
      </template>
    </yhm-view-tab>
    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn>
<!--        <yhm-commonbutton value="编辑" @click="save" icon="i-edit" :show="isdisplay" :flicker="true"></yhm-commonbutton>-->
      </template>
    </yhm-formoperate>
  </div>
</template>

<script>
  import { viewmixin } from '@/assets/view.js'
  import { accMul, accAdd, guid, formatDate, formatTime } from '@/assets/common.js'
  export default {
    name: 'settleAccountsForm',
    mixins: [viewmixin],
    data(){
      return{
        currentDate: formatDate(new Date()),//当前日期
        tabState:[{select:true}],
        content:[],
        // rate:'',//费率
        selfrate:'',//自保费率
        noselfrate:'',//非自保费率
        unit:'',//推修公司
        type:'',//结算类型
        typeList:[],//结算类型
        startDate: formatDate(new Date()),//启用日期
        endDate: formatDate(new Date()),//结束日期
        startDateCustom:'',//启用日期
        endDateCustom:'',//结束日期
        totalMoney:'',//总计金额
        sumpendingmoney:'',//实际价格总和
        sumpending:'',//返利金额总和
        pager: { // 分页数据
          total: '', // 数据总条数
          pageSize: 5, // 单页数据条数
          pageIndex: 1, // 当前页码
          selectCount: 0 // 选中数据的条数
        },
        pendingstateList:{
          list:[
            // {
            //   num:'0',
            //   img:'',
            //   code:'#F00',
            //   showName:'未结账'
            // },
            // {
            //   num:'1',
            //   img:'',
            //   code:'#36b152',
            //   showName:'已结账'
            // }
          ],
          value:''
        },
      }
    },
    methods:{
      save(){
        // this.$dialog.confirm({
        //   tipValue: '是否确认转为工单？',
        //   btnValueOk:'确认',
        //   btnValueCancel:'取消',
        //   okCallBack: () => {
        //     this.ajaxJson({
        //       url: '/fix/fixOrder/save',
        //       data: {
        //         id:item.fixorder.id,
        //         state:'0',
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
      settleAccounts(item){
        this.$dialog.confirm({
          tipValue: '是否确认结账？',
          btnValueOk:'确认',
          btnValueCancel:'取消',
          okCallBack: () => {
            this.ajaxJson({
              url: '/fix/fixOrder/save',
              data: {
                id:item.orderid,
                pendingstate:'1',
              },
              call: (data) => {
                if (data.type === 0) {
                  this.initData(true)
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
      lookOver(item){
        this.$dialog.OpenWindow({
          width: '1070',
          height: '750',
          url:'/collectionOfDataView?id='+item.id,
          title:'查看工单信息',
          closeCallBack:(data) =>{
          }
        })
      },
      dateClick(startDate,endDate){
        if(startDate!=''&&endDate!=''){
          this.initData()
        }
      },
      initData (initialize) {
        let params = {}
        if(initialize){
          params = {
            companyID:this.id,
            pageSize:this.pager.pageSize,
            pageIndex:this.pager.pageIndex,
            pendingstate:this.pendingstateList.value,
            stateStr:'123'//是否过滤接待单 不为空时过滤
          }
        }else{
          params = {
            companyID:this.id,
            pageSize:this.pager.pageSize,
            pageIndex:this.pager.pageIndex,
            startDateStr:this.startDateCustom,
            endDateStr:this.endDateCustom,
            pendingstate:this.pendingstateList.value,
            stateStr:'123'//是否过滤接待单 不为空时过滤
          }
        }
        this.ajaxJson({
          url: '/fix/fixCompanyOrder/queryByCompanyIDForFixreception',
          data:params,
          call: (data) => {
            this.content = data.content
            this.pager.total = data.count
            this.selfrate = data.fixCompany.selfrate//税率
            this.noselfrate = data.fixCompany.noselfrate//非自保费率
            this.unit = data.fixCompany.unit//推修公司
            this.type = data.fixCompany.type//结算类型
            this.typeList = data.fixCompany.typePsd.list//计算类型
            this.startDate = data.fixCompany.startDate//启用日期
            this.endDate = data.fixCompany.endDate//结束日期
            this.totalMoney = data.totalMoney//总计金额
            this.sumpendingmoney = data.sumpendingmoney//实际价格总和
            this.sumpending = data.sumpending//返利金额总和
            if(initialize){
              this.pendingstateList = data.pendingstatePsd
            }
            this.createName = data.fixCompany.createName
            this.insertDate = data.fixCompany.insertDate
            this.updateName = data.fixCompany.updateName
            this.updateDate = data.fixCompany.updateDate


          }
        })
      }
    },
    created () {
      this.initData(true)
    }
  }
</script>

<style scoped>

</style>
