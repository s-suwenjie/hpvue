<template>
    <div class="f_main main">
      <yhm-formbody>
        <template #title>基本信息</template>
        <template #control>
          <yhm-form-text title="工单号" :value="otherCode" id="otherCode" no-edit="1"></yhm-form-text>
        </template>
      </yhm-formbody>
      <div class="f_split"></div>
      <yhm-form-list-show>
        <!--数据表头-->
        <template #listHead>
<!--          <yhm-managerth-check style="width: 40px;"></yhm-managerth-check>-->
          <yhm-managerth style="width: 38px;" title="查看"></yhm-managerth>
          <!--          <yhm-managerth style="width: 38px;" title="发票类型"></yhm-managerth>-->
          <yhm-managerth width="90" title="付款人"></yhm-managerth>
          <yhm-managerth title="收入来源"></yhm-managerth>
<!--          <yhm-managerth style="width: 140px;" title="工单号"></yhm-managerth>-->
          <yhm-managerth width="80" title="业务员"></yhm-managerth>
<!--          <yhm-managerth style="width: 80px;" title="车型品牌"></yhm-managerth>-->
<!--          <yhm-managerth style="width: 90px" title="车牌号"></yhm-managerth>-->
<!--          <yhm-managerth style="width: 110px;" title="回款日期"></yhm-managerth>-->
          <yhm-managerth style="width: 80px" title="发生额"></yhm-managerth>
          <yhm-managerth style="width: 120px" title="收款银行"></yhm-managerth>
          <!--          <yhm-managerth style="width: 140px" title="发票号"></yhm-managerth>-->
          <yhm-managerth style="width: 140px" title="银行摘要" ></yhm-managerth>
          <yhm-managerth style="width: 70px" title="数据状态" ></yhm-managerth>
          <yhm-managerth style="width: 180px" title="开票操作" ></yhm-managerth>
        </template>
        <!--数据明细-->
        <template #listBody>
          <tr  v-for="(item,index) in content" :key="index" :class="[{InterlacBg:index%2!=0}]">
<!--            <yhm-manager-td-checkbox :value="item"></yhm-manager-td-checkbox>-->
            <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>
            <!--            <yhm-manager-td :value="'发票'" @click="selects(item)"></yhm-manager-td>-->
            <yhm-manager-td-center :value="item.customer" @click="viewUnitOrPerson(item)"></yhm-manager-td-center>
<!--            <yhm-manager-td-center :value="item.customer" v-else @click="viewUnitOrPerson(item)" :menu-list="customerMenu" @rightClick="rightClick(item)" @menuClick="menuClick"></yhm-manager-td-center>-->
<!--            <yhm-manager-td :value="item.otherName" :color='item.subjectID=="008F808E-C79C-4F8B-9D16-986093FAB86A"&&incomeType==="1"?"#0b26e8":""' v-if="item.otherName===''" @click="unitClickLeft(item)" ></yhm-manager-td>-->
<!--            <yhm-manager-td-center :value="item.otherName" :color='item.subjectID=="008F808E-C79C-4F8B-9D16-986093FAB86A"&&incomeType==="1"?"#0b26e8":""' v-else @click="unitClickLeft(item)" :menu-list="unitMenu" @rightClick="rightClick(item)" @menuClick="menuClick"></yhm-manager-td-center>-->
            <yhm-manager-td-center :value="item.otherName"></yhm-manager-td-center>
<!--            <yhm-manager-td-center :value="item.workOrderID" :after-icon="item.detailNum > 1?'i-btn-prompt':''"  v-else :menu-list="jobNumberMenu" @rightClick="rightClick(item)" @menuClick="menuClick"></yhm-manager-td-center>-->

            <yhm-manager-td-center :value="item.operator" @click="operatorClickLeft(item)"></yhm-manager-td-center>
<!--            <yhm-manager-td-center :value="item.operator" v-else :menu-list="operatorMenu" @click="operatorClickLeft(item)" @rightClick="rightClick(item)" @menuClick="menuClick"></yhm-manager-td-center>-->
<!--            <yhm-manager-td :value="item.vehicleBrand" v-if="item.vehicleBrand===''"></yhm-manager-td>-->
<!--            <yhm-manager-td-center :value="item.vehicleBrand" v-else :menu-list="vehicleBrandMenu" @click="vehicleBrandLeft(item)" @rightClick="rightClick(item)" @menuClick="menuClick"></yhm-manager-td-center>-->
<!--            <yhm-manager-td-center :value="item.licensePlateNumber" @click="vehicleEvent(item)" :menu-list="licensePlateMenu" @rightClick="rightClick(item)" @menuClick="menuClick"></yhm-manager-td-center>-->
<!--           -->
<!--            <yhm-manager-td-date :value="item.moneyBackDate"></yhm-manager-td-date>-->
            <yhm-manager-td-money :value="item.money === null ? ' ':item.money" :before-icon="item.detailBalance > 0?'i-btn-prompt':''" :value-object="item" before-icon-color="red"></yhm-manager-td-money>
            <yhm-manager-td :value="item.bankName"></yhm-manager-td>
<!--            <yhm-manager-td-center :value="item.bankName" v-else :menu-list="bankIDMenu" @click="vehicleBrandLeft(item)" @rightClick="rightClick(item)" @menuClick="menuClick"></yhm-manager-td-center>-->
            <yhm-manager-td :value="item.bankSummary === null ? ' ': item.bankSummary" :tip="true" node-class-name="f_main main"></yhm-manager-td>
            <yhm-manager-td-psd  :value="item.signState" :list="isSignStateList"></yhm-manager-td-psd>
            <yhm-manager-td-operate>
              <yhm-manager-td-operate-button v-show="item.balanceInvoice != 0&& (item.signState==='0'||item.signState==='3') " @click="addOpenInvoiceOne(item)" value="开票申请" icon="i-btn-applicationSm" color="#49a9ea"></yhm-manager-td-operate-button>
              <yhm-manager-td-operate-button v-show="item.openInvoiceNum !== '0'" @click="viewOpenInvoice(item)" value="查看开票" color="#7112da"></yhm-manager-td-operate-button>
            </yhm-manager-td-operate>
          </tr>
        </template>
        <template #empty>
          <span class="m_listNoData" v-show="content.length==0?true:false">暂时没有数据</span>
        </template>
      </yhm-form-list-show>
    </div>
</template>

<script>
  import { formmixin } from '@/assets/form.js'
  import { guid } from '@/assets/common.js'
  export default {
    name: 'offlineWorkOrderDetailForm',
    mixins: [formmixin],
    data(){
      return{
        content:[],
        isSignStateList: [
          {
            code: '#3EE208',
            num: '0',
            img: 'icon-correct iconSignState',
            showName: '正常',
          },
          {
            code: '#151EE2',
            num: '3',
            img: 'icon-correct iconSignState',
            showName: '正常',
          },
          {
            code: '#FDD000',
            num: '1',
            img: 'icon-InterestRW',
            showName: '待核查',
          },
          {
            code: '#FF0000',
            num: '2',
            img: 'icon-delete',
            showName: '异常',
          },
          {
            code:'#A81AFF',
            num:'4',
            img:'icon-correct',
            showName:'待完善',
          },
        ],
      }
    },
    methods:{
      viewUnitOrPerson(item){
        if(item.unitOrPerson=='0'){
          this.$dialog.OpenWindow({
            width: '1050',
            height: '810',
            title: '联系人信息',
            url: '/personView?id='+item.customerName,
            closeCallBack: (data)=>{
              if(data){
                this.initPageData(false)
              }
            }
          })
        }else if(item.unitOrPerson=='1'){
          this.$dialog.OpenWindow({
            width: '1050',
            height: '810',
            title: '单位信息',
            url: '/unitView?id='+item.customerName,
            closeCallBack: (data)=>{
              if(data){
                this.initPageData(false)
              }
            }
          })
        }
      },
      viewOpenInvoice(item){
        this.$dialog.OpenWindow({
          width: '750',
          height: '390',
          title: '查看开票申请信息',
          url: '/claimsOpenInvoice?ownerID=' + item.id,
          closeCallBack: (data) => {
            if(data){
              this.initPageData(false)
            }
          }
        })
      },
      addOpenInvoiceOne(item){
        this.openInvoiceMainID=guid()
        let detailList=[item.id]
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
      },
      operatorClickLeft(item){//查看联系人信息
        if(item.operatorID!==''){
          this.$dialog.OpenWindow({
            width: '1050',
            height: '750',
            url: '/personView?id=' + item.operatorID,
            title: '查看联系人信息',
            closeCallBack: (data) => {
              if (data) {
                this.initPageData(false)
              }
            }
          })
        }
      },
      listView(item){
        let url = ''
        url = '/claimsForm?id=' + item.id
        this.$dialog.OpenWindow({
          width: '1050',
          height: '750',
          url: url,
          title: '查看保险理赔',
          closeCallBack: (data) => {
            if (data) {
              this.lastData = data
              this.initPageData(false)
            }
          }
        })
      },
      initData(){
        this.ajaxJson({
          url: '/Fin/getBankDetailInsuranceData',
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
            searchStr: this.otherCode,
            signState: "",
            startDate: "",
            type: "",
            unitID: "",
            vehicleBrand: "",
            workOrderID: ""
          },
          call: (data) => {
            this.content = data.content
          }
        })
      }
    },
    created () {
      this.setQuery2Value('otherCode')
      this.initData()
    }
  }
</script>

<style scoped>

</style>
