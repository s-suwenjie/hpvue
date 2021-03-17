<template>
  <div class="f_main">
    <yhm-view-body>
      <template #title>基本信息</template>
      <template #body>
        <yhm-view-control title="所属月份" :content="dateTime"></yhm-view-control>

      </template>
    </yhm-view-body>

    <div class="f_split"></div>
    <yhm-view-tab>
      <template #tab>
        <yhm-view-tab-button :list="tabState" :index="0" >详情信息</yhm-view-tab-button>
      </template>
      <template #content>

        <yhm-view-tab-list :customize="true" :pager="true" v-show="tabState[0].select">
          <template #listHead>
            <yhm-managerth style="width: 60px" title="序号"></yhm-managerth>
            <yhm-managerth  title="类型"></yhm-managerth>
            <yhm-managerth  title="金额"></yhm-managerth>



          </template>
          <template #listBody>
            <tr v-for="(item,index) in categoryList" :key="index" :class="{InterlacBg:index%2!==0}">
              <yhm-manager-td-center   :value="index+1+''"></yhm-manager-td-center>
              <yhm-manager-td-center  :value="item.showName"></yhm-manager-td-center>
              <yhm-manager-td-money  :value="item.money" ></yhm-manager-td-money>
            </tr>
          </template>
          <template #empty>
            <span class="m_listNoData" v-show="categoryList.length>0?false:true">暂时没有数据</span>
          </template>

        </yhm-view-tab-list>
      </template>
    </yhm-view-tab>
    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn>
        <yhm-commonbutton value="编辑"  icon="i-edit" :flicker="false" @call="editBtn()"></yhm-commonbutton>
      </template>
    </yhm-formoperate>
  </div>

</template>

<script>
  import { viewmixin } from '@/assets/view.js'
  export default {
    name: 'reimbursementLlimitView',
    mixins: [viewmixin],
    data(){
      return {
        tabState:[{select:true}],
        dateTime:'',
        dateMonth:'',
        details:[],
        categoryList:[],
      }
    },
    methods:{
      editBtn(){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '680',
          url: '/reimbursementLlimitForm?id=' + this.id,
          title: '查看花费额度',
          closeCallBack: (data)=>{
            if(data){
              this.initData()
            }
          }
        })
      },
      initData(){
        let params = {
          id: this.id,
        }
        this.init({
          url: '/dailyoffice/reimbursementLlimit/initForm',
          data: params,
          call: (data)=>{
            this.dateTime=data.dateTime+'-'+data.dateMonth
            this.details=data.details
            this.categoryList=[]
            for (let i in this.details){
              this.categoryList.push({
                id: this.details[i].id,
                insertDate:this.details[i].insertDate,
                ownerID:this.details[i].ownerID,
                img:this.details[i].subjectID,
                showName:this.details[i].showName,
                money:this.details[i].money,
              })
            }
          }
        })
      }
    },
    created () {
      this.setQuery2Value("id")
      this.initData()
    }
  }
</script>

<style scoped>

</style>
