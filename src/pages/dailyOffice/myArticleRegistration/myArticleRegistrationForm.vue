<template>
  <div class="f_main">
    <yhm-formbody>
      <template #title>添加信息</template>
      <template #control>
        <yhm-form-date title="申请时间" :no-edit="true" :value="applicationTime" id="applicationTime " position="t" rule="R0000"></yhm-form-date>
        <yhm-form-date title="领取" subtitle="物品时间" :value="collectionTime" id="collectionTime" position="t" rule="R0000"></yhm-form-date>
        <yhm-form-date title="预计" subtitle="归还时间" :value="rxpectedReturnTime" id="rxpectedReturnTime " position="t" rule="R0000"></yhm-form-date>
        <yhm-form-text placeholder=""  title="物品内容" subtitle="" :value="itemContent" id="itemContent"></yhm-form-text>
        <yhm-form-textarea  placeholder=""  title="用途" subtitle=""  :value="purpose" id="purpose" rule="R0000"></yhm-form-textarea>
      </template>
    </yhm-formbody>
    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn>
        <yhm-commonbutton value="保存" icon="btnSave" @call="save()"></yhm-commonbutton>
        <yhm-commonbutton value="保存并提交" icon="btnSave" :flicker="true" @call="submit()"></yhm-commonbutton>
      </template>
    </yhm-formoperate>
  </div>
</template>

<script>
  import { formmixin } from '@/assets/form.js'
  import {formatDate} from '@/assets/common.js'
  export default {
    name: 'myArticleRegistrationForm',
    mixins: [formmixin],
    data(){
      return {
        id:'',
        applicationTime:formatDate(new Date()),//当前时间,//申请时间
        collectionTime:'',//领取时间
        rxpectedReturnTime:'',//预计归还时间
        itemContent:'',  //物品内容
        purpose:'',//用途
      }
    },
    methods: {
      save(){
        if (this.validator()) {
            let params={
              id:this.id,
              applicationTime:this.applicationTime,
              collectionTime:this.collectionTime,
              rxpectedReturnTime:this.rxpectedReturnTime,
              itemContent:this.itemContent,
              purpose:this.purpose,
            }
            console.log(params)
            return
            this.ajaxJson({
              url: '/dailyoffice/',
              data: params,
              call: (data) => {
                if (data.type === 0) {
                  this.$dialog.setReturnValue(this.id)
                  this.$dialog.alert({
                    tipValue: data.message,
                    closeCallBack: () => {
                      this.$dialog.close()
                    }
                  })
                } else {
                  this.$dialog.alert({
                    alertImg: 'warn',
                    tipValue: data.message
                  })
                }
              }
            })
          }
      },
    },
    created () {
      // this.init({
      //   url: '/',
      //   all: (data) => {
      //
      //   },
      //   add: (data) => {
      //     /* 需要添加的数据 */
      //   },
      //   look: (data) => {
      //     /* 需要查看的数据 */
      //   }
      // })
    },
  }
</script>

<style scoped>

</style>
