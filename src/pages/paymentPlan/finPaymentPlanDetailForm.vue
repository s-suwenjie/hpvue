<template>
  <div class="f_main mb16">
    <yhm-view-body>
      <template #title>基本信息</template>
      <template #body>
        <yhm-view-control title="事件描述" category="2" :content="name"></yhm-view-control>
        <yhm-view-control title="品牌" :content="brand" :psd="brandList"></yhm-view-control>
        <yhm-view-control title="事件类型" category="2" :content="category" :psd="categoryList"></yhm-view-control>
        <yhm-view-control title="最迟付款日期" :content="lastDate" type="date"></yhm-view-control>
        <yhm-view-control title="付款金额" color="#f00" :content="money" type="money" ></yhm-view-control>
        <yhm-view-control title="编号" :content="code"></yhm-view-control>
        <yhm-view-control title="文件" :content="files" type="files" category="3"></yhm-view-control>
      </template>
    </yhm-view-body>

    <div v-html="approvalHtml"></div>

  </div>
</template>

<script>
  import { viewmixin } from '@/assets/view.js'
  import { formmixin } from '@/assets/form.js'
  export default {
    name: 'paymentPlanViewDetailForm',
    mixins: [viewmixin,formmixin],
    data () {
      return {
        id: '',
        name: '',
        brand: '',
        brandList: [],
        category: '',
        categoryList: [],
        lastDate: '',
        money: '',
        code: '',
        isAuto: '',
        isAutoList: [],
        files: [],
        approvalHtml: '',
        rejectCause: '',
      }
    },
    created () {
      this.setQuery2Value('id')
      let params = {
        id: this.id
      }
      this.ajaxJson({
        url: '/PersonOffice/initPaymentPlanDetailForm',
        data: params,
        call: (data)=>{
          this.name = data.name
          this.brand = data.brandPsd.value
          this.brandList = data.brandPsd.list
          this.categoryList = data.categoryPsd.list
          this.category = data.categoryPsd.value
          this.lastDate = data.lastDate
          this.approvalHtml = data.approvalHtml
          this.money = data.money
          this.code = data.code
          this.isAuto = data.isAutoPsd.value
          this.isAutoList = data.isAutoPsd.list
          this.files = data.files
          this.approvalHtml = data.approvalHtml
          this.rejectCause = data.rejectCause
        }
      })
    },
  }
</script>

<style scoped lang="less">
  @import "../../../static/bjFlow.css";
  .btnAddSave{
    border: 1px solid #bfbfbf;
    color: #333;
    background-color: #fff;
  }
  .btnAddSave:hover{
    color: #fff;
    background-color: #49a9ea;
    border: 1px solid #49a9ea;
  }
</style>
