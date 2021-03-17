<template>
  <div class="f_main">
    <yhm-formbody>
      <template #title>回访信息</template>
      <template #control>
        <yhm-form-textarea title="回访记录" :value="remark" id="remark" placeholder="请输入回访信息"> </yhm-form-textarea>

      </template>
    </yhm-formbody>
    <yhm-formoperate :createName="createName" :updateName="updateName">
      <template #btn>
        <yhm-commonbutton value="保存" icon="btnSave" :flicker="true" @call="affirm()"></yhm-commonbutton>
      </template>
    </yhm-formoperate>
  </div>
</template>

<script>
  import { formmixin } from '@/assets/form.js'
  import { guid } from '@/assets/common.js'
  export default {
    name: 'payAreturnVisitForm',
    mixins: [formmixin],
    data(){
      return{
        remark:''
      }
    },
    methods:{
      affirm(){
        this.$dialog.confirm({
          tipValue: '是否确认提交回访记录？',
          width:'450',
          btnValueOk:'确认',
          btnValueCancel:'取消',
          okCallBack: () => {
            // url: '/fix/fixrejection/saveFixrejectiondetail',
            this.ajaxJson({
              url: '/fix/returnVisit/save',
              data: {
                id:guid(),
                remark:this.remark,
                personid:this.personid,//送修人id
                personName:this.personName,//送修人姓名
                receptionistName:this.receptionistName,//接待人
                receptionistid:this.receptionistid,//接待人id
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
              }
            })
          }
        })
      }
    },
    created () {
      this.setQuery2Value('personid')
      this.setQuery2Value('personName')
      this.setQuery2Value('receptionistid')
      this.setQuery2Value('receptionistName')
    }
  }
</script>

<style scoped>

</style>
