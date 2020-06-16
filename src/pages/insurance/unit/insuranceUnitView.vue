<template>
  <div class="f_main">
    <yhm-view-body>
      <template #title>基本信息</template>
      <template #body>
        <yhm-view-control title="别名" :content="shortName"></yhm-view-control>
        <yhm-view-control title="公司名称" category="2" :content="unit" ></yhm-view-control>
        <yhm-view-control title="开票类型" category="3" :content="billingTypeVal" ></yhm-view-control>
        <yhm-view-control title="商业险种" category="3" :content="commercialVal" ></yhm-view-control>
       </template>
    </yhm-view-body>
    <div class="f_split"></div>
    <div class="f_split"></div>
    <yhm-view-tab>
      <template #tab>
        <yhm-view-tab-button :list="tabState" :index="0">保险信息</yhm-view-tab-button>
      </template>
      <template #content>
        <yhm-view-tab-list :customize="true" :pager="false" v-show="tabState[0].select">
          <template #listHead>
            <!--<yhm-managerth style="width:40px" title="查看" ></yhm-managerth>-->
            <yhm-managerth  title="启用日期" ></yhm-managerth>
            <yhm-managerth  title="客户新车费率"></yhm-managerth>
<!--            <yhm-managerth  title="旧车费率"></yhm-managerth>-->
            <yhm-managerth  title="客户费率"></yhm-managerth>
            <yhm-managerth  title="特殊车型费率"></yhm-managerth>

          </template>
          <template #listBody>
            <tr v-for="(item,index) in details" :key="index" :class="{InterlacBg:index%2!==0}">
              <!--<yhm-manager-td-look @click="listView(item.id)"></yhm-manager-td-look>-->
              <yhm-manager-td-date :value="item.startDate==='1900-01-01'?'-----':item.startDate" typeof="data"></yhm-manager-td-date>
              <yhm-manager-td-rgt  :value="item.newRate+'  %'"></yhm-manager-td-rgt>
<!--              <yhm-manager-td-rgt :value="item.oldRate+'  %'" ></yhm-manager-td-rgt>-->
              <yhm-manager-td-rgt :value="item.clientRate+'  %'" ></yhm-manager-td-rgt>
              <yhm-manager-td-rgt :value="item.vipRate+'  %'" ></yhm-manager-td-rgt>
            </tr>
          </template>
          <template #empty>
            <span class="m_listNoData" v-show="empty">暂时没有数据</span>
          </template>
          <template #pager>
            <yhm-pagination :pager="pager" is-page-size="false" :is-select-info="false" @initData="listDetail(false)"></yhm-pagination>
          </template>
        </yhm-view-tab-list>
      </template>
    </yhm-view-tab>
    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn>
        <yhm-commonbutton value="编辑" v-if="isInsuredUnit" style="margin-right: 20px" icon="i-edit" :flicker="false" @call="editBtn()"></yhm-commonbutton> </template>
    </yhm-formoperate>
  </div>
</template>

<script>
  import { viewmixin } from '@/assets/view.js'
  export default {
    name: 'insuranceUnitView',
    mixins: [viewmixin],
    data(){
      return {
        id:'',
        empty:true,
        tabState: [{ select: true }],
        shortName:'',
        unit:'',
        details:[],

        createName:'',
        insertDate:'',
        updateName:'',
        updateDate:'',
        billingTypeVal: '',
        commercialVal: '',
        isInsuredUnit:true,
      }
    },
    methods:{
      editBtn(){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '700',
          title: '编辑保险信息',
          url: '/insuranceUnitForm?id=' + this.id,
          closeCallBack: (data)=>{
            if(data){
              this.$dialog.setReturnValue(this.id)
              this.$dialog.refresh()
            }
          }
        })
      },

    },
    created () {
      this.setQuery2Value('isCustomer')
      if(this.isCustomer === '0'){
        this.isInsuredUnit = false
      }

      let params = {
        id: this.id,
      }
      this.ajaxJson({
        url: '/Basic/getUnitInsurance',
        data: params,
        call: (data)=>{
          this.shortName=data.shortName
          this.unit=data.unit
          this.commercialVal=data.commercialVal
          this.billingTypeVal=data.billingTypeVal
          this.createName=data.createName
          this.insertDate=data.insertDate
          this.updateName=data.updateName
          this.updateDate=data.updateDate
          this.details=data.details
          if (this.details.length === 0){
            this.empty=true
          }else {
            this.empty=false
          }
        }
      })
    }
  }
</script>

<style scoped>

</style>
