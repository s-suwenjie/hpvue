<template>
  <div class="f_main">
    <yhm-formbody>
      <template #control>
        <yhm-formupload :ownerID="ownerID" :value="fileList"  id="fileList" title="返利证明(支持单据)" tag="poNumber" multiple="multiple" rule="#"></yhm-formupload>
      </template>
    </yhm-formbody>
    <div class="f_split"></div>
    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn >
        <yhm-commonbutton value="保存" icon="btnSave"  :flicker="true" @call="save()"></yhm-commonbutton>
      </template>
    </yhm-formoperate>
  </div>
</template>

<script>
  import { formmixin } from '@/assets/form.js'
  export default {
    name: 'billingFile',
    mixins: [formmixin],
    data(){
      return{
        fileList: [],
      }
    },
    methods:{
      save () {
          let params = {
            files:this.fileList
          }
          this.ajaxJson({
            url: '/Insurance/uploadProve',
            data: params,
            loading: '0',
            call: (data) => {
              if (data.type === 0) {
                this.$dialog.setReturnValue(this.id) //向父级页面id值
                this.$dialog.alert({
                  tipValue: data.message,
                  closeCallBack: (data) => {
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


    },
    created () {
      this.setQuery2Value('ownerID')
    }
  }
</script>

<style scoped>

</style>
