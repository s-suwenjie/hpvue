<template>
  <div class="f_main">
    <yhm-view-body>
      <template #title>基本信息</template>
      <template #body>
        <yhm-view-control title="操作人" :content="person+''"></yhm-view-control>
        <yhm-view-control title="坏账金额" :content="money+''" type="money" color="#f00"></yhm-view-control>
        <yhm-view-control title="登记日期" :content="workDate.slice(0,10)" type="date"></yhm-view-control>

        <yhm-view-control category="2" title="事件说明" :content="remark"></yhm-view-control>
        <yhm-view-control title="文件" :content="fileList" type="files" category="3"></yhm-view-control>

      </template>
    </yhm-view-body>
    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate"></yhm-formoperate>
  </div>
</template>

<script>
  import { viewmixin } from '@/assets/view.js'
  export default {
    name: 'receivableBadDebtView',
    mixins: [viewmixin],
    data(){
      return {
        person: '',
        remark: '',
        money: '',
        workDate:'',
        content:[],
        fileList:[],
        createName:'',
        insertDate:'',
        updateName:'',
        updateDate:'',
      }
    },
    methods:{
      //打开选中信息
      selectedList(){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '750',
          url: '/receivableForm?type=1',
          title: '查看应收账款',
          closeCallBack: (data) => {
            if (data) {
              this.initData(false)
            }
          }
        })
      },
      initData(){
        let params = {
          ownerID:this.id
        }
        this.ajaxJson({
          url: '/finance/badDebt/initForm',
          data:params,
          call: (data) => {
            this.person = data.person
            this.money = data.money
            this.remark = data.remark
            this.workDate = data.workDate
            this.fileList = data.fileList
            this.createName = data.createName
            this.insertDate = data.insertDate
            this.updateName = data.updateName
            this.updateDate = data.updateDate
          }
        })
      },
    },
    created () {
      this.setQuery2Value('id')
      this.initData()
    }
  }
</script>

<style scoped>

</style>
