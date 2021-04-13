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
        <yhm-commonbutton value="编辑" v-show="isShow" icon="btnSave" :flicker="true" @call="edit()"></yhm-commonbutton>
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
        isShow:false,
      }
    },
    created(){
      this.init()
    },
    methods:{
      edit(){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '600',
          url: '/repairTargerForm?isMain=1&id='+this.id,
          title: '修改',
          closeCallBack: (data) => {
            if (data) {
              this.$dialog.setReturnValue(this.id)
            }
          }
        })
      },
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
              if((new Date()).getMonth()<parseInt(this.category)){
                this.isShow=true;
              }
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
