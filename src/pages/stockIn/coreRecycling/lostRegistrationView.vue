<template>
  <div class="f_main">
    <yhm-view-body>
      <template #title>基本信息</template>
      <template #body>
        <yhm-view-control title="登记人员" :content="person" ></yhm-view-control>
        <yhm-view-control title="登记日期" :content="dateTime"></yhm-view-control>
        <yhm-view-control title="车牌号" :content="plate" ></yhm-view-control>
        <yhm-view-control title="工单号" :content="code" ></yhm-view-control>
        <yhm-view-control title="适用车型" :content="model"></yhm-view-control>
      </template>
    </yhm-view-body>

    <div class="f_split"></div>
    <yhm-view-tab>
      <template #tab>
        <yhm-view-tab-button :list="tabState" :index="0" >入库详情明细</yhm-view-tab-button>
      </template>
      <template #content>

        <yhm-view-tab-list :customize="true" :pager="true" v-show="tabState[0].select">
          <template #listHead>
            <yhm-managerth style="width: 40px" title="序号"></yhm-managerth>
            <yhm-managerth title="配件名称"></yhm-managerth>
            <yhm-managerth title="配件规格型号"></yhm-managerth>

            <yhm-managerth title="遗失数量"></yhm-managerth>
            <yhm-managerth  v-if="isEdit" title="操作"></yhm-managerth>
          </template>
          <template #listBody>
            <tr v-for="(item,index) in discountList" :key="index" :class="{InterlacBg:index%2!==0}">
              <yhm-manager-td-center   :value="index+1+''"></yhm-manager-td-center>
              <yhm-manager-td-date  :value="item.parts"></yhm-manager-td-date>
              <yhm-manager-td-center  :value="item.specifications"></yhm-manager-td-center>
              <yhm-manager-td-center  :value="item.deliveryQuantity"></yhm-manager-td-center>
              <yhm-manager-td-operate  v-if="isEdit">
                <yhm-manager-td-operate-button  value="出库操作" icon="im_copy" color="#FF0000"></yhm-manager-td-operate-button>
              </yhm-manager-td-operate>
            </tr>
          </template>
          <template #empty>
            <span class="m_listNoData" v-show="discountList.length>0?false:true">暂时没有数据</span>
          </template>
          <template #pager>
            <yhm-pagination :pager="pager"  :is-select-info="false" @initData="pageData()"></yhm-pagination>
          </template>
        </yhm-view-tab-list>
      </template>


    </yhm-view-tab>

    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn>
        <yhm-commonbutton v-if="isEdit" value="编辑"  icon="i-edit" :flicker="false" @call="editBtn()"></yhm-commonbutton>
      </template>
    </yhm-formoperate>
  </div>
</template>

<script>
  import { viewmixin } from '@/assets/view.js'
  export default {
    name: 'lostRegistrationView',
    mixins: [viewmixin],
    data(){
      return{
        tabState:[{select:true}],
        model:'',
        person:'',
        dateTime:'',
        plate:'',
        code:'',
        state:'',
        discountList:[],
        isEdit:false
      }
    },
    methods:{
      editBtn(){
        this.$dialog.OpenWindow({
          width: 1050,
          height: 720,
          url:'/lostRegistrationForm?id='+this.id,
          title:'登记遗失的配件',
          closeCallBack:(data)=>{
            if(data){
              this.initData()
            }
          }
        })
      },
      pageData(){
        let params = {
          id: this.id,
          pageSize: this.pager.pageSize, // 单页数据条数
          pageIndex: this.pager.pageIndex, // 当前页码
        }
        this.ajaxJson({
          url: '/dailyoffice/corcRegistration/getCorcRegistrationByID',
          data: params,
          call: (data) => {
            this.state=data.state
            this.discountList=data.list
            if (this.state==0){
              this.isEdit=true
            } else {
              this.isEdit=false
            }
          }
        })

      },
      initData(){
        let params = {
          id: this.id,
          pageSize: this.pager.pageSize, // 单页数据条数
          pageIndex: this.pager.pageIndex, // 当前页码
        }
        this.init({
          url: '/dailyoffice/corcRegistration/getCorcRegistrationByID',
          data: params,
          call: (data) => {
            this.id=data.id
            this.state=data.state
            this.model=data.model
            this.person=data.operator
            this.dateTime=data.dateTime
            this.plate=data.list[0].vehicle
            this.code=data.list[0].code
            this.discountList=data.list
            if (this.state==0){
              this.isEdit=true
            } else {
              this.isEdit=false
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
