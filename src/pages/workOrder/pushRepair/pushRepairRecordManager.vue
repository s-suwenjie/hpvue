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
          <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initChoose"></yhm-managersearch>
          <yhm-radiofilter @initData="initDate()" title="品牌" :content="applicableModelsPsd"></yhm-radiofilter>
          <yhm-radiofilter @initData="initDate()" title="结算类型" :content="typePsd"></yhm-radiofilter>
          <yhm-radiofilter @initData="initDate()" title="状态" :content="statePsd"></yhm-radiofilter>
          <yhm-radiofilter style="margin-top: 6px;" @initData="initDate()" title="推修公司" :content="companyPsd"></yhm-radiofilter>
        </template>

        <template #listHead>
          <yhm-managerth style="width: 40px;" title="选择" ></yhm-managerth>
          <yhm-managerth style="width: 40px;" title="查看" ></yhm-managerth>
          <yhm-managerth title="推修公司"></yhm-managerth>
          <yhm-managerth width="90" title="公司简称"></yhm-managerth>
          <yhm-managerth width="80" title="自保费率" ></yhm-managerth>
          <yhm-managerth width="80" title="非自保费率" ></yhm-managerth>
          <yhm-managerth width="70" title="结算类型" ></yhm-managerth>
          <yhm-managerth width="70" title="状态" ></yhm-managerth>
          <yhm-managerth width="180" title="工单号" ></yhm-managerth>
          <yhm-managerth width="90" title="车牌号" ></yhm-managerth>
          <yhm-managerth width="110" title="车辆品牌" ></yhm-managerth>
          <yhm-managerth width="90" title="车主姓名" ></yhm-managerth>
          <yhm-managerth width="90" title="联系人姓名" ></yhm-managerth>
          <yhm-managerth width="100" title="工单合计金额" ></yhm-managerth>
          <yhm-managerth width="160" title="操作"></yhm-managerth>
        </template>
        <template #listBody >
          <tr :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]" v-for="(item,index) in content" :key="index">
            <yhm-manager-td-checkbox :value="item"></yhm-manager-td-checkbox>
            <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>
            <yhm-manager-td @click="maintain(item)" color="#49a9ea" v-if="item.companyName==''||item.companyName==null" value="点击维护推修公司"></yhm-manager-td>
            <yhm-manager-td :tip="true" v-else :value="item.companyName"></yhm-manager-td>

            <yhm-manager-td v-if="item.unitshort==''||item.unitshort==null"  value="-----"></yhm-manager-td>
            <yhm-manager-td :tip="true" v-else  :value="item.unitshort"></yhm-manager-td>

            <yhm-manager-td-center :value="item.selfrate==''?'-----':item.selfrate + '%'"></yhm-manager-td-center>
            <yhm-manager-td-center :value="item.noselfrate==''?'-----':item.noselfrate + '%'"></yhm-manager-td-center>

            <yhm-manager-td-center v-if="item.type==''" value="------"></yhm-manager-td-center>
            <yhm-manager-td-psd v-else :value="item.type" :list="typeList"></yhm-manager-td-psd>

            <yhm-manager-td-center v-if="item.state==''||item.state==null" value="------"></yhm-manager-td-center>
            <yhm-manager-td-psd v-else :value="item.state" :list="stateList"></yhm-manager-td-psd>

            <yhm-manager-td-center v-if="item.code==''||item.code==null" value="-----"></yhm-manager-td-center>
            <yhm-manager-td-center v-else @click="lookOver(item)" title="点击查看工单" :value="item.code"></yhm-manager-td-center>

            <yhm-manager-td type="vehicle" :value="item.plate"></yhm-manager-td>

            <yhm-manager-td-center v-if="item.applicableModels==''" value="------"></yhm-manager-td-center>
            <yhm-manager-td-psd v-else :value="item.applicableModels" :list="applicableModelsList"></yhm-manager-td-psd>

            <yhm-manager-td-center  @click="lookOverCarOwner(item)" :value="item.carOwner"></yhm-manager-td-center>
            <yhm-manager-td-center  @click="lookOverPerson(item)" :value="item.contactPerson"></yhm-manager-td-center>

            <yhm-manager-td-money :value="item.expend==''?'0':item.expend"></yhm-manager-td-money>


            <yhm-manager-td-operate>
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
          <div class="listTotalCrente m_list" style="width: 402px;margin: auto;">
            <table width="100%" cellpadding="0" cellspacing="0" class="m_content_table m_content_total_table">
              <thead>
              <tr>
                <yhm-managerth style="width: 100px;" before-color="#000" title="" before-title="总条数" ></yhm-managerth>
                <yhm-managerth style="width: 100px;" before-color="#f00" title="" before-title="总金额"></yhm-managerth>
              </tr>
              </thead>
              <tbody>
              <tr>
                <yhm-manager-td-rgt style="color: #000;" :value="pager.total+''"></yhm-manager-td-rgt>
                <yhm-manager-td-money  :value="totalList[0].money"></yhm-manager-td-money>
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
        totalList:[
          {
            money:'0'
          }
        ]
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
      initDate(init){
        let params = {
          pageIndex:this.pager.pageIndex,
          pageSize:this.pager.pageSize,
          companyID:this.companyPsd.value,
          type:this.typePsd.value,
          state:this.statePsd.value,
          applicableModels:this.applicableModelsPsd.value
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
