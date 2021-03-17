<template>
  <div class="f_main">
    <yhm-formbody>
      <template #control>
        <yhm-form-text title="合同名称" :value="contractName" id="contractName" rule="R0000"></yhm-form-text>
        <yhm-form-date title="签订日期" :value="signedDate" id="signedDate" property="t" rule="R0000"></yhm-form-date>
        <yhm-form-date title="合同到期日" :value="maturityDate" id="maturityDate" property="t" rule="R0000"></yhm-form-date>
        <yhm-form-text title="对方名称" :value="otherSideName" id="otherSideName" rule="R0000"></yhm-form-text>

        <yhm-formupload :ownerID="id" :value="fileList"  id="fileList" title="合同文件(支持单据)" tag="poNumber" multiple="multiple" rule="#"></yhm-formupload>
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
    name: 'contractForm',
    mixins: [formmixin],
    data(){
      return{
        fileList: [],
        signedDate:'',
        maturityDate:'',
        otherSideName:'',
        contractName:'',
      }
    },
    methods:{
      save () {
        let params = {
          id:this.id,
          ownerID:this.ownerID,
          contractName:this.contractName,
          signedDate:this.signedDate,
          maturityDate:this.maturityDate,
          otherSideName:this.otherSideName,
          files:this.fileList
        }

        this.ajaxJson({
          url: '/Basic/contractSave',
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

