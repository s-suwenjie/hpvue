<template>
  <div class="f_main" style="height: 240px;">
    <yhm-view-tab style="width: 730px;height: 320px;text-align: center;">
      <template #content>
        <yhm-view-tab-list :customize="true">
          <template #listHead>
            <yhm-managerth style="width: 40px" title="查看"></yhm-managerth>
            <yhm-managerth style="width: 70px" title="申请人"></yhm-managerth>
            <yhm-managerth style="width: 150px" title="发票抬头"></yhm-managerth>
            <yhm-managerth title="发票金额"></yhm-managerth>
            <yhm-managerth title="开票时间"></yhm-managerth>
            <yhm-managerth title="开票状态"></yhm-managerth>
            <!--<yhm-managerth style="width: 110px" title="发票图片"></yhm-managerth>-->
            <yhm-managerth style="width: 150px" title="操作"></yhm-managerth>
          </template>
          <template #listBody>
            <tr v-for="(item,index) in openInvoiceList" :key="index" :class="{InterlacBg:index%2!==0}">
              <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>
              <yhm-manager-td :value="item.person"></yhm-manager-td>
              <yhm-manager-td :value="item.purchaser"></yhm-manager-td>
              <yhm-manager-td-money :value="item.invoiceMoney"></yhm-manager-td-money>
              <yhm-manager-td-date :value="item.applyDate"></yhm-manager-td-date>
              <yhm-manager-td :value="item.stateVal"></yhm-manager-td>
              <!--<yhm-manager-td-image @click="showInvoicePdfEvent(item)" tag="Invoice" :value="item.invoiceUrl"></yhm-manager-td-image>-->
              <yhm-manager-td-operate>
                <yhm-manager-td-operate-button :no-click="item.state!=='0' || item.isFinish === '1'" @click="submitApply(item)" value="提交" icon="i-btn-applicationSm" color="#49a9ea"></yhm-manager-td-operate-button>
                <yhm-manager-td-operate-button :no-click="item.state!=='0' || item.isFinish === '1'" @click="revokeApply(item)" value="撤销申请" icon="i-btn-applicationSm" color="#49a9ea"></yhm-manager-td-operate-button>
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
    name: 'insuranceInvoiceDetails',
    mixins: [formmixin],
    data(){
      return{
        openInvoiceList:[],
      }
    },
    methods:{
      listView(item){
        // if(item.code === ''){
        let url=''
        let title=''
        if (item.isFinish === '0' && item.state === '0') {
          url='/openInvoiceForm?id='+item.id +'&type=0'

        }else {
          url='/openInvoiceView?id='+item.id +'&type=0'

        }
        title='查看开票信息'
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
      },
      submitApply(item){
        if (item.isFinish === '0' && item.state === '0') {
          if (item.id) {
            this.$dialog.confirm({
              width: 300,
              tipValue: '确定提交申请?',
              btnValueOk: '确定',
              alertImg: 'warn',
              okCallBack: (data) => {
                let params={
                  id:item.id
                }
                this.ajaxJson({
                  url: '/Insurance/needNotApproveInsuranceInvoice',
                  data: params,
                  call: (data) => {
                    if (data.type === 0) {
                      if (data.val==='0'){
                        this.$dialog.alert({
                        tipValue: data.message,
                        closeCallBack: () => {
                          this.init()
                        }
                      })
                      } else {
                        let params = {
                          id: item.id,
                          tableName: 48
                        }

                        this.ajaxJson({
                          url: '/Bill/getSubmitCatrgoryVue',
                          data: params,
                          call: (data) => {
                            this.category = data.message
                            if (this.category) {
                              /* 判断是否拿到category */
                              let params = {
                                id: item.id,
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
                                        this.init()
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
                    }else if(data.type === 1){
                      this.$dialog.alert({
                        alertImg:'warn',
                        tipValue: data.message
                      })
                    }
                  }
                })
              }
            })
          }
        }
      },
      revokeApply(item){  //撤销申请
        let params={
          id:item.id
        }
        this.ajaxJson({
          url: '/Insurance/revokeApplyInsuranceInvoice',
          data: params,
          call: (data) => {
            if (data.type === 0) {
              this.$dialog.alert({
                tipValue: data.message,
                closeCallBack: () => {
                  this.init()
                }
              })
            }else if(data.type === 1){
              this.$dialog.alert({
                alertImg:'warn',
                tipValue: data.message
              })
            }
          }
        })
      },
      init(){
        let params={
          id:this.id
        }
        this.ajaxJson({
          url: '/Insurance/selectInsuranceInvoice',
          data:params,
          call:(data) =>{
            this.openInvoiceList=data.content
            this.empty =this.openInvoiceList.length===0
          }
        })
      },
    },
    created(){
      this.setQuery2Value("id")
      this.init()
    },
  }
</script>

<style scoped>

</style>
