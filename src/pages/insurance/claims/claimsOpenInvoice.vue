<template>
  <div class="f_main" style="height: 240px;">
    <yhm-view-tab style="width: 730px;height: 320px;text-align: center;">
      <template #content>
        <yhm-view-tab-list :customize="true">
          <template #listHead>
            <yhm-managerth style="width: 40px" title="查看"></yhm-managerth>
            <yhm-managerth style="width: 110px" title="发票号"></yhm-managerth>
            <yhm-managerth style="width: 80px" title="发票金额"></yhm-managerth>
            <yhm-managerth style="width: 110px" title="开票时间"></yhm-managerth>
            <yhm-managerth style="width: 80px" title="开票状态"></yhm-managerth>
            <yhm-managerth style="width: 110px" title="发票图片"></yhm-managerth>
            <yhm-managerth style="width: 170px" title="操作"></yhm-managerth>
          </template>
          <template #listBody>
            <tr v-for="(item,index) in openInvoiceList" :key="index" :class="{InterlacBg:index%2!==0}">
              <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>
              <yhm-manager-td :value="item.code"></yhm-manager-td>
              <yhm-manager-td-money :value="item.money"></yhm-manager-td-money>
              <yhm-manager-td-date :value="item.openDate"></yhm-manager-td-date>
              <yhm-manager-td :value="item.stateVal"></yhm-manager-td>
              <yhm-manager-td-image @click="showInvoicePdfEvent(item)" tag="Invoice" :value="item.invoiceUrl"></yhm-manager-td-image>
              <yhm-manager-td-operate>
                <yhm-manager-td-operate-button v-show="item.state==='0'&& item.isFinish ==='0' " @click="submit(item)" value="提交申请" icon="i-btn-applicationSm" color="#49a9ea"></yhm-manager-td-operate-button>
                <yhm-manager-td-operate-button v-show="item.state==='0'&& item.isFinish ==='0' " @click="revokeApply(item)" value="撤销申请" icon="i-btn-applicationSm" color="red"></yhm-manager-td-operate-button>
                <yhm-manager-td-operate-button v-show="(item.state ==='1' || item.state ==='5')&& item.ownerCategory!=='4'&& item.ownerCategory!=='5'" @click="revokeApply(item)" value="撤销申请" icon="i-btn-applicationSm" color="#49a9ea"></yhm-manager-td-operate-button>
              </yhm-manager-td-operate>
            </tr>
          </template>
          <template #empty v-if="empty">
            <span class="m_listNoData">暂时没有数据</span>
          </template>
        </yhm-view-tab-list>
      </template>
    </yhm-view-tab>
  </div>
</template>

<script>
  import { formmixin } from '@/assets/form.js'
  export default {
    name: 'claimsOpenInvoice',
    mixins: [formmixin],
    data(){
      return{
        openInvoiceList:[],
        empty:true,
        ownerID:''
      }
    },
    methods: {
      showInvoicePdfEvent(item){
         window.open('/UploadFile/Invoice/'+item.invoiceUrl)
      },
      revokeApply(item){
        let params={
          id:item.invoiceID
        }
        this.ajaxJson({
          url: '/Bill/revokeApplyOpenInvoice',
          data:params,
          call:(data) =>{
            if (data.type == 0) {
              this.$dialog.setReturnValue(this.id)
              this.$dialog.alert({
                tipValue: data.message,
                closeCallBack: ()=>{
                  this.init()
                }
              })
            }else{
              this.$dialog.alert({
                tipValue: data.message,
                closeCallBack: ()=>{
                  this.init()
                }
              })
            }
          }
        })
      },
      submit (item) { //提交申请
        if (item.state === '0') {
          if (item.invoiceID) {
            let params = {
              id: item.invoiceID,
              tableName: 48
            }
            this.$dialog.confirm({
              width: 300,
              tipValue: '确定提交申请?',
              btnValueOk: '确定',
              alertImg: 'warn',
              okCallBack: (data) => {
                this.ajaxJson({
                  url: '/Bill/getSubmitCatrgoryVue',
                  data: params,
                  call: (data) => {
                    this.category = data.message
                    if (this.category) {
                      /* 判断是否拿到category */
                      let params = {
                        id: item.invoiceID,
                        category: this.category,
                        tableName: 48,
                        isDetail: 0,
                        tableDetailName: -1
                      }
                      this.ajaxJson({
                        url: '/Bill/approvalSubmitVue',
                        data: params,
                        call: (data) => {
                          if (data.type === 0) {
                            this.$dialog.alert({
                              width: 320,
                              tipValue: data.message,
                              closeCallBack: () => {
                                this.init(false)
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
                    } else {
                      this.$dialog.alert({
                        tipValue: '没有获取到提交数据!',
                        alertImg: 'error'
                      })
                    }
                  }
                })
              }
            })
          }
        }
      },
      listView(item){
        let url=''
        let title=''
        if(item.state!=='0'){
          url='/openInvoiceView?id='+item.invoiceID +'&type=0'
          title='查看开票信息'
        }else{
          url='/openInvoiceForm?id='+item.invoiceID
          title='添加开票信息'
        }
        if(item.ownerCategory!=5){
          this.$dialog.OpenWindow({
            width: '1050',
            height: '790',
            title: title,
            url:url,
            closeCallBack: (data)=>{
              if(data){
                this.init(false)
              }
            }
          })
        }else{
          this.$dialog.OpenWindow({
            width: '1050',
            height: '790',
            title: '查看开票申请',
            url:'/offlineOpenInvoiceView?id='+item.invoiceID+'&ownerCategory=5',
            closeCallBack: (data)=>{
              if(data){
                this.initPageData(false)
              }
            }
          })
        }
      },
      init(){
        let params={
          ownerID:this.ownerID
        }
        this.ajaxJson({
          url: '/Fin/getBankDetailInsuranceInvoiceList',
          data:params,
          call:(data) =>{
            this.openInvoiceList=data
            this.empty =this.openInvoiceList.length===0
          }
        })
      },
    },
    created () {
      this.setQuery2Value('ownerID');
      this.init();
    },
  }
</script>

<style scoped>

</style>
