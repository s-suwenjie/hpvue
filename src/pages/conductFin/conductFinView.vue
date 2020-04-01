<template>
  <div class="f_main mb35">
    <yhm-view-body>
      <template #title>基本信息</template>
      <template #body>
        <yhm-view-control title="产品名称" :content="name"></yhm-view-control>
        <yhm-view-control title="账户" :content="account" category="3"></yhm-view-control>
        <yhm-view-control title="金额" :content="money" type="money"></yhm-view-control>
        <yhm-view-control title="开始日期" :content="startDate" type="date"></yhm-view-control>
        <yhm-view-control title="结束日期" :content="endDate" type="date"></yhm-view-control>
        <yhm-view-control title="文件" :content="files" type="files" category="3" v-if="files.length !== 0"></yhm-view-control>
      </template>
    </yhm-view-body>
    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn>
        <yhm-commonbutton value="编辑" icon="i-edit" :flicker="true" @call="editBtn()"></yhm-commonbutton>
      </template>
    </yhm-formoperate>
  </div>
</template>

<script>
  import { viewmixin } from '@/assets/view.js'
  export default {
    name: 'conductFinView',
    mixins: [viewmixin],
    data (){
      return {
        list: [],
        id: '',
        name: '',
        account: '',
        money: '',
        startDate: '',
        endDate: '',
        files: [],
      }
    },
    methods: {
      editBtn(){
        this.$dialog.OpenWindow({
          width: 1100,
          height: 690,
          title: '编辑理财产品',
          url: '/conductFinForm?id='+this.list.id+'&state=1',
          closeCallBack: (data) => {
            if(data){
              this.initData()
              this.$dialog.setReturnValue('1')
            }
          }
        })
      },
      initData(){
        let params = {
          id: this.id
        }
        this.ajaxJson({
          url: '/Fin/initBankProductForm',
          data: params,
          call: (data)=>{
            this.list = data
            this.name = data.name
            this.account = data.account
            this.money = data.money
            this.startDate = data.startDate
            this.endDate = data.endDate
            this.files = data.files

            this.createName = data.createName
            this.insertDate = data.insertDate
            this.updateDate = data.updateDate
            this.updateName = data.updateName
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
