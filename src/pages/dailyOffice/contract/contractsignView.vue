<template>
  <div class="f_main">
    <yhm-view-body>
      <template #title>基本信息</template>
      <template #body>
        <yhm-view-control title="合同名称" :content="name" ></yhm-view-control>
        <yhm-view-control title="总金额" :content="totalMoney"></yhm-view-control>
        <yhm-view-control title="我方负责人" :content="chargePerson" ></yhm-view-control>
        <yhm-view-control title="对方负责人" :content="otherPartyPerson" ></yhm-view-control>
        <yhm-view-control title="对方合约单位" :content="customers" ></yhm-view-control>
        <yhm-view-control title="合同文本" :content="format" :psd="formatList"></yhm-view-control>
        <yhm-view-control title="签署类型" :content="signatureType" :psd="signatureTypeList"></yhm-view-control>
        <yhm-view-control title="合同状态" :content="state" :psd="stateList"></yhm-view-control>
        <!--<yhm-view-control title="合同所属类型" :content="type" :psd="typeList"></yhm-view-control>-->
        <yhm-view-control title="合同所属类型" :content="paymentItems" :psd="paymentItemsList"></yhm-view-control>
        <yhm-view-control title="合同关联业务" :content="category" :psd="categoryList"></yhm-view-control>
        <yhm-view-control title="签约日期" :content="startTime" type="date"></yhm-view-control>
        <yhm-view-control title="结束时间" :content="endTime" type="date"></yhm-view-control>
        <yhm-view-control category="3" title="附加文件" type="files" :content="fileList"></yhm-view-control>
      </template>
    </yhm-view-body>
    <div class="f_split"></div>
    <yhm-view-tab v-if="this.detailsList.length>0?true:false">
      <template #tab>
        <yhm-view-tab-button :list="tabState" :index="0" >产品详情信息</yhm-view-tab-button>
      </template>
      <template #content>
        <yhm-view-tab-list :customize="true" :pager="true" v-show="tabState[0].select">
          <template #listHead>
            <yhm-managerth style="width: 40px" title="序号"></yhm-managerth>
            <yhm-managerth  title="名称"></yhm-managerth>
            <yhm-managerth  title="规格型号"></yhm-managerth>
            <yhm-managerth  title="计量单位"></yhm-managerth>
            <yhm-managerth  title="单价"></yhm-managerth>
            <yhm-managerth  title="数量"></yhm-managerth>
            <yhm-managerth  title="金额"></yhm-managerth>
          </template>
          <template #listBody>
            <tr v-for="(item,index) in detailsList" :key="index" :class="{InterlacBg:index%2!==0}">
              <yhm-manager-td-center  :value="index+1+''"></yhm-manager-td-center>
              <yhm-manager-td-center  :value="item.productName"></yhm-manager-td-center>
              <yhm-manager-td-center  :value="item.productSpec"></yhm-manager-td-center>
              <yhm-manager-td-center  :value="item.productCompany"></yhm-manager-td-center>
              <yhm-manager-td-center  :value="item.productPrice"></yhm-manager-td-center>
              <yhm-manager-td-center  :value="item.productNumber"></yhm-manager-td-center>
              <yhm-manager-td-center  :value="item.money"></yhm-manager-td-center>
            </tr>
          </template>
          <template #empty>
            <span class="m_listNoData" v-show="detailsList.length>0?false:true">暂时没有数据</span>
          </template>

        </yhm-view-tab-list>
      </template>
    </yhm-view-tab>
    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn>
        <yhm-commonbutton value="编辑"  icon="i-edit" :flicker="true" @call="editBtn()"></yhm-commonbutton>
      </template>
    </yhm-formoperate>
  </div>
</template>

<script>
  import { viewmixin } from '@/assets/view.js'
  export default {
    name: 'contractsignView',
    mixins: [viewmixin],
    data(){
      return {
        tabState:[{select:true}],
        id:'',
        ownerID:'',
        category:'',
        name:'',//合同名称
        startTime:'',//签署时间
        endTime:'',//结束时间
        otherPartyPersonID:'',
        otherPartyPerson:'',//对方负责人
        chargePerson:'',//负责人
        insuredState:'0',//0联系人
        customers:'',
        customersID:'',//签署客户
        signatureType:'',
        signatureTypeList:[],//签署类型
        totalMoney:'',
        fileList:[],
        state:'',
        stateList:[],// 合同状态
        format:'',
        formatList:[], //合同格式
        paymentItems:'',
        paymentItemsList:[],//合同收付款
        type:'',
        typeList:[],
        detailsList:[],
        categoryList:[],

      }
    },
    methods:{
      editBtn () {
        this.$dialog.OpenWindow({
          width: '1050',
          height: '750',
          url: '/contractsignForm?id='+this.id,
          title: '修改合同',
          closeCallBack: (data) => {
            if (data) {
              this.initData()
            }
          }
        })
      },
      initData(){
        let params = {
          id: this.id
        }

        this.init({
          url: '/dailyoffice/contractSign/initForm',
          data: params,
          call: (data) => {
              this.id=data.id
              this.stateList = data.statePsd.list
              this.signatureTypeList = data.signatureTypePsd.list
              this.formatList = data.formatPsd.list
              this.paymentItemsList = data.paymentItemsPsd.list
              this.categoryList = data.categoryPsd.list
              this.typeList = data.typePsd.list
              this.name=data.name,
              this.type=data.type,
              this.chargePerson=data.chargePerson
              this.startTime=data.startTime,
              this.endTime=data.endTime,
              this.customersID=data.customersID,
              this.customers=data.customers,
              this.signatureType=data.signatureType,
              this.state=data.state,
              this.totalMoney=data.totalMoney,
              this.fileList=data.files,
              this.detailsList=data.detailsList
              this.format=data.format,
              this.paymentItems=data.paymentItems
              this.ownerID=data.ownerID,
              this.category=data.category
            this.otherPartyPerson=data.otherPartyPerson
            this.otherPartyPersonID=data.otherPartyPersonID
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
