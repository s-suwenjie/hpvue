<template>
  <div class="f_main">
    <yhm-view-body :customize="true" :pager="false">
      <template #title>基本信息</template>
      <template #body>
        <yhm-view-control title="添加人" :content="person"></yhm-view-control>
        <yhm-view-control title="启用时间" :content="year+'年'" ></yhm-view-control>
        <yhm-view-control title="日期" :content="category" :psd="categoryPsd"></yhm-view-control>
        <yhm-view-control title="金额" :content="money" type="money"></yhm-view-control>
      </template>
    </yhm-view-body>
    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn>
<!--        <yhm-commonbutton value="编辑" v-show="state=='0'" icon="btnSave" :flicker="true" @call="edit()"></yhm-commonbutton>-->
      </template>
    </yhm-formoperate>
  </div>
</template>

<script>
  import { viewmixin } from '@/assets/view.js'
  export default {
    name: 'repairTargerView',
    mixins: [viewmixin],
    data(){
      return{
        id:'',
        person:'',
        personID:'',
        year:'',
        category:'',
        categoryPsd:[],
        money:'',
        insertDate:'',
        createName:'',
        updateName:'',
        updateDate:'',
      }
    },
    created(){
      this.init()
    },
    methods:{
      init(){
        let params = {
          id: this.id
        }
        this.ajaxJson({
          url: '/Fin/bankDetailInsuranceTargetForm',
          data: params,
          call: (data) => {
            if(data){
              this.content=data
              this.personID=data.personID
              this.person=data.person
              this.year=data.year
              this.category=data.category
              this.money=data.money
              this.categoryPsd=data.categoryPsd.list

              this.insertDate=data.insertDate
              this.createName=data.createName
              this.updateName=data.updateName
              this.updateDate=data.updateDate
            }
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
