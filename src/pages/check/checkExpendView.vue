<template>
    <div class="f_main">
      <yhm-view-body>
        <template #title>基本信息</template>
        <template #body>
          <yhm-view-control title="所属公司" :content="unitName"></yhm-view-control>
          <yhm-view-control title="入库日期" :content="workDate" type="date"></yhm-view-control>
          <yhm-view-control title="支票号码" :content="code"></yhm-view-control>

          <yhm-view-control title="使用人" :content="usePerson"></yhm-view-control>
          <yhm-view-control title="开票时间" :content="openDate" type="date"></yhm-view-control>
          <yhm-view-control title="开票金额" :content="money" type="money"></yhm-view-control>
          <yhm-view-control title="收款单位" :content="other"></yhm-view-control>

          <yhm-view-control category="3" title="对应账号" :content="account"></yhm-view-control>
          <yhm-view-control title="发票类型" :content="category" :psd="categoryList" ></yhm-view-control>
          <yhm-view-control title="支票状态" :content="state" :psd="stateList"></yhm-view-control>
        </template>
      </yhm-view-body>
      <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate"></yhm-formoperate>
    </div>
</template>

<script>
  import { viewmixin } from '@/assets/view.js'
  export default {
    name: 'checkExpendView',
    mixins: [viewmixin],
    data(){
      return{
        content:[],
        categoryList:[],
        stateList: [],
        unitName: '',
        workDate: '',
        code: '',
        usePerson: '',
        openDate: '',
        money: '',
        other: '',
        account: '',
        category: '',
        state: '',
      }
    },
    methods:{

    },
    created () {
      this.setQuery2Value('id')
      this.init({
        url: '/Bill/checksDetailForm',
        call:(data)=>{
          this.content = data

          this.unitName = data.unitName
          this.workDate = data.workDate
          this.code = data.code
          this.usePerson = data.usePerson
          this.openDate = data.openDate
          this.money = data.money
          this.other = data.other
          this.account = data.account
          this.category = data.category
          this.state = data.state

          this.categoryList = data.categoryPsd.list
          this.stateList = data.statePsd.list
        }
      })
    }
  }
</script>

<style scoped>

</style>
