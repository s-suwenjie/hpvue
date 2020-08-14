<template>
  <div >
    <div class="f_split"></div>
    <yhm-formbody style="width: 530px">
      <template #title>基本信息</template>
      <template #control>
        <yhm-form-radio title="开票状态" :state-show="true" :no-show-item="noSignStateList" :select-list="signStateList" :value="signState" id="signState"></yhm-form-radio>
        <yhm-form-text title="发票号" :value="remark" id="remark"></yhm-form-text>
      </template>
    </yhm-formbody>

    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate" >
      <template #btn>
        <yhm-commonbutton value="提交" icon="btnSave" :flicker="true" @call="save()"></yhm-commonbutton>
      </template>
    </yhm-formoperate>
  </div>
</template>

<script>
  import { formmixin } from '@/assets/form.js'
  export default {
    name: 'claimsListView',
    mixins: [formmixin],
    data(){
      return{
        remark:'',
        signState:'0',
        noSignStateList:['3'],
        signStateList:[
          {
            code:'',
            num:'0',
            img:'icon-delete',
            showName:'不开发票',
          },
          {
            code:'',
            num:'1',
            img:'icon-InterestRW',
            showName:'待开发票',
          },
          {
            code:'red',
            num:'4',
            img:'icon-correct iconSignState',
            showName:'已开发票',
          },
        ]
      }
    },
    created () {
      // this.setQuery2Value('item')
    },
    methods:{
      save(){

      }
    },
  }
</script>

<style scoped>

</style>
