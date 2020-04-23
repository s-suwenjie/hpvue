<template>
  <div style="height: 500px">
    <yhm-managerpage category="1" :isManager="isManager">
        <template #listHead>
          <yhm-managerth style="width: 38px;" title="查看"></yhm-managerth>
          <yhm-managerth title="收款方" value="id"></yhm-managerth>
          <yhm-managerth style="width: 120px" title="最迟付款日期" value="lastDate"></yhm-managerth>
          <yhm-managerth style="width: 120px;" title="事由"></yhm-managerth>
          <yhm-managerth style="width: 110px" title="计划申请金额" value="money"></yhm-managerth>
          <yhm-managerth style="width: 220px;" title="编号"></yhm-managerth>
          <yhm-managerth style="width: 100px" title="状态" value="state"></yhm-managerth>
          <yhm-managerth style="width: 100px;" title="操作"></yhm-managerth>
        </template>
        <template #listBody>
          <tr  v-for="(item,index) in content" :key="index">
            <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>
            <yhm-manager-td :value="item.otherUnit"></yhm-manager-td>
            <yhm-manager-td-date :value="item.lastDate"></yhm-manager-td-date>
            <yhm-manager-td-center :value="item.subject"></yhm-manager-td-center>
            <yhm-manager-td-money :value="item.money"></yhm-manager-td-money>
            <yhm-manager-td-center :value="item.code"></yhm-manager-td-center>
            <yhm-manager-td-state :value="item.stateVal" :stateColor="item.stateColor" :stateImg="item.stateImg"></yhm-manager-td-state>

            <yhm-manager-td-operate>
              <yhm-manager-td-operate-button v-show="item.track === '-1'" @click="addInvoice(item)" icon="i-export" value="上传发票"></yhm-manager-td-operate-button>
              <yhm-manager-td-operate-button v-show="item.track === '0' || item.track === '1'" @click="addInvoice(item)" icon="i-invoiceView" value="查看发票"></yhm-manager-td-operate-button>
            </yhm-manager-td-operate>
          </tr>
        </template>
    </yhm-managerpage>
  </div>
</template>
<script>
  import { accMul, accAdd, guid, formatTime} from '@/assets/common.js'
  import { managermixin } from '@/assets/manager.js'
  export default {
    name: 'myPaymentWindowManager',
    mixins: [managermixin],
    data () {
      return {
        isManager: true,
        otherUnitID:'',
        content:[],
      }
    },
    methods: {
      listView(item) {
        this.$dialog.OpenWindow({
          width: '1050',
          height: '750',
          url: '/paymentApplyFormView?id=' + item.id + '&isState=' + item.state + '&isFinish=' + item.isFinish,
          title: "查看付款申请信息",
          closeCallBack: () => {
            this.initPageData(false)
          }
        })
      },
      addInvoice(item){
        let title = '上传发票'
        let url = '/paymentInvoice?ownerID=' + item.id + '&track=' + item.track + '&money=' + item.money
        if(item.track === '0'){
          url = '/paymentInvoice?ownerID=' + item.id + '&track=' + item.track + '&money=' + item.money
          title = '查看发票'
        }
        if(item.track === '1'){
          url = '/paymentInvoice?ownerID=' + item.id + '&track=' + item.track + '&viewTrack=1'+ '&money=' + item.money
          title = '查看发票'
        }
        this.$dialog.OpenWindow({
          width: '1050',
          height: '750',
          url: url,
          title: title,
          closeCallBack: (data) => {
            if (data) {
              this.init()
            }
          }
        })
      },
      init(){
        let params = {
          otherUnitID: this.otherUnitID,
        }
        this.ajaxJson({
          url: '/PersonOffice/getPayTrackManagerData',
          data: params,
          call: (data)=>{
            if(data){
              this.content=data
            }
          }
        })
      }
    },
    created () {
      this.setQuery2Value('otherUnitID')
      this.init()
    }
  }
</script>

<style scoped>

</style>
