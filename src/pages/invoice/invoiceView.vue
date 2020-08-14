<template>
  <div class="f_main">
    <yhm-view-body>
      <template #title>基本信息</template>
      <template #body>
        <yhm-view-control title="所属公司" :content="unit"></yhm-view-control>
        <yhm-view-control title="发票号码" :content="code"></yhm-view-control>
        <yhm-view-control title="增票类型" :content="invoiceCategory" :psd="invoiceCategoryList"></yhm-view-control>
        <yhm-view-control title="发票面值" :content="maxValue" :psd="maxValueList"></yhm-view-control>
        <yhm-view-control title="发票状态" :content="state" :psd="stateList"></yhm-view-control>
      </template>
    </yhm-view-body>
    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">

    </yhm-formoperate>
  </div>

</template>

<script>
  import { formmixin } from '@/assets/form.js'
  import { formatDate ,accAdd, guid,accMul} from '@/assets/common.js'
  export default {
    name: 'invoiceView',
    mixins: [formmixin],
    data(){
      return{
        id: '',
        ownerID: '',
        unit: '',
        unitID: '',
        code: '',
        maxValue: '',
        maxValueList: [],
        invoiceCategory: '',
        invoiceCategoryList: [],
        state: '',
        stateList: [],
      }
    },
    methods: {
      initData(){
        this.init({
          url: '/Bill/invoiceDetailForm',
          all: (data)=>{

          },
          add: (data)=>{

          },
          look: (data)=>{
            this.id = data.id
            this.unit = data.unit
            this.unitID = data.unitID
            this.code = data.code
            this.maxValue = data.maxValuePsd.value
            this.maxValueList = data.maxValuePsd.list
            this.invoiceCategoryList = data.invoiceCategoryPsd.list
            this.invoiceCategory = data.invoiceCategoryPsd.value
            this.stateList = data.statePsd.list
            this.state = data.statePsd.value

          }
        })
      },
    },
    created () {
      this.initData()
    }
  }
</script>

<style scoped>

</style>
