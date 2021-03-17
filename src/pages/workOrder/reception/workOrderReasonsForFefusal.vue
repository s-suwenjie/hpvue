<template>
    <div class="f_main">
      <yhm-formbody>
        <template #title>拒绝理由</template>
        <template #control>
          <yhm-form-textarea v-for="(item,index) in list" :key="index" :title="'第'+item.orderbyStr" subtitle="次留言" no-edit="1" :value="item.reason" id="item.reason"> </yhm-form-textarea>
          <yhm-form-textarea title="留言" :value="reason" id="reason"> </yhm-form-textarea>

        </template>
      </yhm-formbody>
      <yhm-formoperate :createName="createName" :updateName="updateName">
        <template #btn>
          <yhm-commonbutton value="拒绝交车" icon="btnSave" :flicker="true" @call="affirm()"></yhm-commonbutton>
        </template>
      </yhm-formoperate>
    </div>
</template>

<script>
  import { guid } from '@/assets/common.js'
  import { formmixin } from '@/assets/form.js'
  export default {
    name: 'workOrderReasonsForFefusal',
    mixins: [formmixin],
    data(){
      return{
        id:'',
        reason:'',
        personid:'',//登录人id
        personName:'',//登录人姓名
        list:[]
      }
    },
    methods:{
      affirm(){
        this.$dialog.confirm({
          tipValue: '是否确认车辆未完全修复,并拒绝收车进入质检阶段？',
          width:'450',
          btnValueOk:'确认',
          btnValueCancel:'取消',
          okCallBack: () => {
            // url: '/fix/fixrejection/saveFixrejectiondetail',
            this.ajaxJson({
              url: '/fix/fixOrder/rejectoperation',
              data: {
                fixrejectiondetail:{
                  id: guid(),
                  orderid:this.orderid,
                  reason: this.reason,
                  ownerID: this.id,
                },
                fixProcessParam:{
                  ownerID: this.orderid,
                  state: '0',
                },
                fixOrderFormParam:{
                  id:this.orderid,
                  state:'14',
                }
              },
              call: (data) => {
                if (data.type === 0) {
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
                // if(param.type=='0'){
                //   this.ajaxJson({
                //     url: '/fix/fixProcess/save',
                //     data: {
                //       ownerID: this.orderid,
                //       state: '0',
                //     },
                //     call: (datas) => {
                //       this.ajaxJson({
                //         url: '/fix/fixOrder/save',
                //         data: {
                //           id:this.orderid,
                //           state:'14',
                //         },
                //         call: (data) => {
                //           if (data.type === 0) {
                //             this.$dialog.alert({
                //               tipValue: data.message,
                //               closeCallBack: () => {
                //                 this.$dialog.close()
                //               }
                //             })
                //           } else {
                //             this.$dialog.alert({
                //               alertImg: 'error',
                //               tipValue: data.message,
                //               closeCallBack: () => {
                //               }
                //             })
                //           }
                //         }
                //       })
                //     }
                //   })
                // }
              }
            })
          }
        })
      },
      initData () {
        let params = {
          id: guid(),
          orderid: this.orderid,//工单id
          orderNum: this.orderNum,//工单号
          personid: this.personid,//登录人id
          personName: this.personName,//登录人名字
        }
        this.ajaxJson({
          url: '/fix/fixrejection/initFormFixrejection',
          data: params,
          call: (data) => {
            if (data) {
              this.id = data.id
              this.list = data.list
            }
          }
        })
      }
    },
    created () {
      this.setQuery2Value('orderid')
      this.setQuery2Value('orderNum')
      this.personName = sessionStorage.getItem('____currentUser')
      this.personid = sessionStorage.getItem('____currentUserID')
      this.initData()
    }
  }
</script>

<style scoped>

</style>
