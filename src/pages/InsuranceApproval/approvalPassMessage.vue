<template>
  <div class="f_main">
    <yhm-form-textarea :text-width="true" title="留言内容"  :value="remark" id="remark" :max-height="300"></yhm-form-textarea>
    <!--<yhm-formoperate>-->
    <!--<template #btn >-->
    <yhm-commonbutton value="确定" @call="adoptEvent()" icon="i-btm-applicationSm" class="btnIcon commonbutton"></yhm-commonbutton>
    <!--</template>-->
    <!--</yhm-formoperate>-->
  </div>
</template>

<script>
  import { formmixin } from '@/assets/form.js'
  export default {
    name: 'approvalPassMessage',
    mixins: [formmixin],
    data(){
      return{
        remark:'',
        url:'',
        page:'',
        tipValue:'是否通过?'
      }
    },
    created () {
      this.setQuery2Value("page")
    },
    methods:{
      adoptEvent () {
        let params={

        }
        if (this.page==0){
          this.url='/Insurance/modifyStateInsuranceApp'   //活动审批通过
          params = {
            id: this.id,
            remark:this.remark
          }
        }
        else if (this.page==1){
          this.url='/Insurance/getPromotionsAppBy'   //活动审批通过
          params = {
            id: this.id,
            remark:this.remark
          }
        } else if (this.page==2){
          this.url='/Insurance/getPromotionsAppDown' //活动审批驳回
          this.tipValue='是否驳回'
          params = {
            id: this.id,
            remark:this.remark
          }
        } else if (this.page==3){
          this.url='/Insurance/getBossTrackDownBtn' //活动审批驳回
          this.tipValue='是否驳回'
          params = {
            id: this.id,
            remark:this.remark
          }
        } else  if (this.page==4){
          this.url='/Basic/getInvoiceAppby' //发票抬头审批通过
          params = {
            id: this.id,
            remark:this.remark
          }
        } else  if (this.page==5){
          this.url='/Basic/getInvoiceAppdown' //发票抬头审批驳回
          this.tipValue='是否驳回'
          params = {
            id: this.id,
            remark:this.remark
          }
        } else  if (this.page==6){
          this.url='/Basic/insertStatementRemark' //添加汇款对账单 点击异常添加备注
          this.tipValue='是否通过'
          params = {
            id: this.id,
            remark:this.remark
          }
        }else if(this.page==7){
          this.url='/sys/approve/yes' //快递模块审批通过
          this.tipValue='是否通过'
          params = {
            id: this.id,
            category:'4',
            remark:this.remark
          }
        }else if(this.page==8){
          this.url='/sys/approve/no' //快递模块审批通过
          this.tipValue='是否驳回'
          params = {
            id: this.id,
            category:'4',
            remark:this.remark
          }
        }
          this.$dialog.confirm({
            width: 300,
            tipValue: this.tipValue,
            alertImg: 'warn',
            okCallBack: (data)=>{
               params =params
                this.ajaxJson({
                  url:this.url ,
                  data: params,
                  call: (data) => {
                    if (data.type === 0) {
                      this.$dialog.setReturnValue(1111)
                      this.$dialog.alert({
                        tipValue: data.message,
                        closeCallBack: (data) => {
                          this.$dialog.close()
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

      }
    },
  }
</script>

<style lang="less" scoped>
  .commonbutton{
    position: fixed;
    bottom: 16px;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
