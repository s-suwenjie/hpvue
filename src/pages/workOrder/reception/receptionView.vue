<template>
  <div class="f_main">
    <yhm-view-body>
      <template #title>基本信息</template>
      <template #body>
        <yhm-view-control title="接待人" :content="personName"></yhm-view-control>
        <yhm-view-control title="车牌号" :content="carName"></yhm-view-control>
        <yhm-view-control title="车主" :content="carOwner"></yhm-view-control>
        <yhm-view-control title="送修人" :content="contactPerson"></yhm-view-control>
        <yhm-view-control title="送修人手机号" :content="contactPersonPhone"></yhm-view-control>
        <yhm-view-control title="传奇及DMS工单号" :content="otherNode"></yhm-view-control>
        <yhm-view-control title="送修人2" v-if="contactPerson2!=''" :content="contactPerson2"></yhm-view-control>
        <yhm-view-control title="送修人手机号2" v-if="contactPersonPhone2!=''" :content="contactPersonPhone2"></yhm-view-control>

        <yhm-view-control title="接待日期" :content="visitDate" type="date"></yhm-view-control>
        <yhm-view-control title="邮箱" :content="emailaddress"></yhm-view-control>
        <yhm-view-control title="地址" :content="address"></yhm-view-control>

        <yhm-view-control title="工单来源" :content="business" :psd="businessList"></yhm-view-control>
        <yhm-view-control title="状态" :content="state" :psd="stateList"></yhm-view-control>
        <yhm-view-control title="业务来源" :content="worksource" :psd="worksourceList"></yhm-view-control>
        <yhm-view-control title="适用车型" :content="applicableModels" :psd="applicableModelsList"></yhm-view-control>

        <yhm-view-control title="备注" :content="remark"></yhm-view-control>

      </template>
    </yhm-view-body>
    <div class="f_split" v-if="listShow"></div>
    <yhm-view-tab v-if="listShow">
      <template #tab>
        <yhm-view-tab-button :list="tabState" :index="0">无意理由</yhm-view-tab-button>
      </template>
      <template #content>
        <yhm-view-tab-list :customize="true"  v-show="tabState[0].select">
          <template #listHead>
            <yhm-managerth style="width:28px" title="理由" ></yhm-managerth>
          </template>
          <template #listBody>
            <tr v-for="(item,index) in list" :key="index" :class="{InterlacBg:index%2!==0}">
              <yhm-manager-td-center width="130"  value="item.otherName"></yhm-manager-td-center>
            </tr>
          </template>
          <template #empty>
            <span class="m_listNoData" v-show="empty">暂时没有数据</span>
          </template>
          <template #pager>
            <yhm-pagination :pager="pager" is-page-size="false" @initData="initPage(false)"></yhm-pagination>
          </template>
        </yhm-view-tab-list>
      </template>
    </yhm-view-tab>
    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate"></yhm-formoperate>
  </div>
</template>

<script>
  import { viewmixin } from '@/assets/view.js'
  import { formatDate } from '@/assets/common.js'
  export default {
    name: 'receptionView',
    mixins: [viewmixin],
    data(){
      return{
        createName:'',
        insertDate:'',
        updateName:'',
        updateDate:'',
        listShow:false,//
        tabState:[{select:true}],
        address:'',//地址
        emailaddress:'',//邮箱
        personName:'',//接待人员姓名
        carName:'',//车牌号
        contactPerson:'',//联系人姓名
        contactPerson2:'',//备用联系人2
        contactPersonPhone:'',//联系人手机号
        contactPersonPhone2:'',//备用联系人手机号
        carOwner:'',//车主
        visitDate: formatDate(new Date()),//到访日期
        otherNode:'',//其它系统编号
        remark:'',//备注
        state:'',//状态
        stateList:[
          {
            num:'0',
            img:'',
            code:'',
            showName:'有意'
          },
          {
            num:'1',
            img:'',
            code:'',
            showName:'无意'
          },
        ],
        worksource:'',//工单来源
        worksourceList:[],//工单来源
        business:'',//业务来源
        businessList:'',//业务来源
        applicableModels:'',//适用车型
        applicableModelsList:'',//适用车型
      }
    },
    methods:{
      initData () {
        let params = {
          id:this.id,
        }
        this.ajaxJson({
          data:params,
          url: '/fix/fixreception/initForm',
          call: (data) => {
            this.address = data.address
            this.emailaddress = data.emailaddress
            this.personName = data.personName
            this.carName = data.carName//车辆
            this.contactPerson = data.contactPerson//联系人姓名
            this.contactPersonPhone = data.contactPersonPhone//联系人手机号
            this.contactPerson2 = data.contactPerson2//备用联系人姓名
            this.contactPersonPhone2 = data.contactPersonPhone2//备用联系人手机号
            this.carOwner = data.carOwner//车主
            this.otherNode = data.otherNode//其它系统编号
            this.remark = data.remark//备注
            this.state = data.state//状态
            this.worksource = data.worksource//工单来源
            this.worksourceList = data.workSourcePsd.list
            this.business = data.business//业务来源
            this.businessList = data.businessPsd.list
            this.applicableModels = data.applicableModels//适用车型
            this.applicableModelsList = data.applicableModelsPsd.list

            if(data.visitDate!=null){
              this.visitDate = data.visitDate//到访日期
            }
            if(data.state!=''){
              this.state = data.state//状态(有意无意)
            }
            this.list = data.list//无意的理由
            if(this.state=='1'){
              this.listShow = true
            }
            this.createName = data.createName
            this.insertDate = data.insertDate
            this.updateName = data.updateName
            this.updateDate = data.updateDate
          }
        })
      },
    },
    created () {
      this.initData()
    }
  }
</script>

<style scoped>

</style>
