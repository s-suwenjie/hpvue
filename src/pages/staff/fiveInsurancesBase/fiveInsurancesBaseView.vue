<template>
  <div class="f_main">
    <yhm-view-body :customize="true" :pager="false">
      <template #title>基本信息</template>
      <template #body>
        <yhm-view-control title="添加人" :content="person"></yhm-view-control>
        <yhm-view-control title="启用时间" type="date" :content="startDate" ></yhm-view-control>
        <yhm-view-control title="社保级别" :content="category" :psd="categoryPsd"></yhm-view-control>
        <yhm-view-control title="养老基数" :content="pension" ></yhm-view-control>
        <yhm-view-control title="失业基数" :content="unemployment" ></yhm-view-control>
        <yhm-view-control title="工伤基数" :content="injury" ></yhm-view-control>
        <yhm-view-control title="医疗基数" :content="medical" ></yhm-view-control>
        <yhm-view-control title="公积金基数" :content="provident" ></yhm-view-control>
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
    name: 'fiveInsurancesBaseView',
    mixins: [viewmixin],
    data() {
      return {
        category:'',
        categoryPsd:[],
        personID:'',
        person:'',
        startDate:'',
        pension:'',
        unemployment:'',
        injury:'',
        medical:'',
        provident:'',
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
          url:'/fiveinsurancesBaseForm',
          title:'添加五险基数信息',
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
          url: '/finance/fiveInsurancesBase/initForm',
          data: params,
          call: (data) => {
            if(data){
              this.id=data.id
              this.personID=data.personID
              this.person=data.person
              this.startDate=data.startDate
              this.category=data.category
              this.pension=data.pension
              this.unemployment=data.unemployment
              this.injury=data.injury
              this.medical=data.medical
              this.provident=data.provident
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
