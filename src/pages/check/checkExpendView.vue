<template>
    <div class="f_main">
      <yhm-view-body>
        <template #title>基本信息</template>
        <template #body>
          <yhm-view-control title="所属公司" :content="content.unitName"></yhm-view-control>
          <yhm-view-control title="入库日期" :content="content.workDate"></yhm-view-control>
          <yhm-view-control title="支票号码" :content="content.code"></yhm-view-control>
          <yhm-view-control category="3" title="对应账号" :content="content.account"></yhm-view-control>
          <yhm-view-control title="发票类型" :content="content.category" :psd="categoryList" ></yhm-view-control>
          <yhm-view-control title="支票状态" :content="content.state" :psd="stateList"></yhm-view-control>
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
        stateList: []
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
          this.categoryList = data.categoryPsd.list
          this.stateList = data.statePsd.list
        }
      })
    }
  }
</script>

<style scoped>

</style>
