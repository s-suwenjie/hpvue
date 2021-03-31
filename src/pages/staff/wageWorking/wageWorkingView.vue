<template>
  <div class="f_main">
    <yhm-view-body :customize="true" :pager="false">
      <template #title>基本信息</template>
      <template #body>
        <yhm-view-control title="添加人" :content="person"></yhm-view-control>
        <yhm-view-control title="启用时间" type="date" :content="startDate" ></yhm-view-control>
        <yhm-view-control title="工龄工资基数级别" :content="category" :psd="categoryPsd"></yhm-view-control>
        <yhm-view-control title="金额" :content="money" ></yhm-view-control>
        <yhm-view-control title="状态" :content="state" :psd="statePsd"></yhm-view-control>
      </template>
    </yhm-view-body>
    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn>
        <yhm-commonbutton value="编辑" v-show="state=='0'" icon="btnSave" :flicker="true" @call="edit()"></yhm-commonbutton>
      </template>
    </yhm-formoperate>
  </div>
</template>

<script>
  import { viewmixin } from '@/assets/view.js'
  import {formatDate} from '@/assets/common.js'
  export default {
    name: 'wageWorkingView',
    mixins: [viewmixin],
    data() {
      return {
        category:'',
        categoryPsd:[],
        personID:'',
        person:'',
        startDate:'',
        money:'',
        state:'',
        statePsd:[],

        insertDate:'',
        createName:'',
        updateName:'',
        updateDate:'',
      }
    },
    methods: {
      edit(){
        this.$dialog.OpenWindow({
          width: 1050,
          height: 820,
          url:'/wageWorkingForm',
          title:'编辑工龄工资基数信息',
          closeCallBack:(data) =>{
            if(data){
              this.$dialog.setReturnValue(this.id)
              this.init()
            }
          }
        })
      },
      init(){
        let params = {
          id: this.id
        }
        this.ajaxJson({
          url: '/finance/wageWorking/initForm',
          data: params,
          call: (data) => {
            if(data){
              this.id=data.id
              this.personID=data.personID
              this.person=data.person
              this.startDate=data.startDate
              this.category=data.category
              this.money=data.money
              this.state=data.state
              this.categoryPsd=data.categoryPsd.list
              this.statePsd=data.statePsd.list

              this.insertDate=data.insertDate
              this.createName=data.createName
              this.updateName=data.updateName
              this.updateDate=data.updateDate
            }
          }
        })
      }
    },
    created () {
      this.init()
    }
  }
</script>

<style scoped>

</style>
