<template>
  <div class="f_main">
    <yhm-view-body>
      <template #title>基本信息</template>
      <template #body>
        <yhm-view-control title="账户类型" :content="categoryName"></yhm-view-control>
        <yhm-view-control title="户名" :content="name"></yhm-view-control>
        <yhm-view-control title="账户状态" :content="stateName"></yhm-view-control>
        <yhm-view-control title="开户行" :content="bank"></yhm-view-control>
        <yhm-view-control title="网络账户类型" :content="webAccountTypeName" v-show="webAccountTypeShow"></yhm-view-control>
        <yhm-view-control :title="accountName" :content="account"></yhm-view-control>
        <yhm-view-control title="账户别名" v-show="isAlias" :content="alias"></yhm-view-control>
        <yhm-view-control title="POS机费率万分之多少" :content="rate" v-show="posShow"></yhm-view-control>
        <yhm-view-control title="账户性质" :content="natureName" v-show="categoryUnitShow"></yhm-view-control>
        <yhm-view-control title="客户经理" :content="customerManagerName" v-show="categoryUnitShow"></yhm-view-control>
        <yhm-view-control title="联系电话" :content="managerTel" v-show="categoryUnitShow"></yhm-view-control>
        <yhm-view-control category="3" title="文件" type="files" :content="fileList" v-show="categoryUnitShow"></yhm-view-control>
      </template>
    </yhm-view-body>
    <yhm-view-tab>
      <template #tab>
        <yhm-view-tab-button :list="tabState" v-if="isCancellation" :index="0">销户信息</yhm-view-tab-button>
      </template>
      <template #content>
        <yhm-view-tab-content v-show="tabState[0].select">
          <yhm-view-control title="销户时间" :content="cancellationWorkDate"></yhm-view-control>
          <yhm-view-control title="操作人" :content="cancellationPerson"></yhm-view-control>
          <yhm-view-control title="经办人" :content="cancellationaAgentPerson"></yhm-view-control>
          <yhm-view-control title="销户原因" :content="cancellationRemark"></yhm-view-control>
          <yhm-view-control category="3" title="文件" type="files" :content="cancellationFiles" tag="publicAccount"></yhm-view-control>
        </yhm-view-tab-content>
      </template>
    </yhm-view-tab>
    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn>
        <yhm-commonbutton value="编辑" icon="i-edit"  @call="editBtn()"></yhm-commonbutton>
      </template>
    </yhm-formoperate>
  </div>
</template>

<script>
  import { formmixin } from '@/assets/form.js'
  export default {
    name: 'publicAccountView',
    mixins: [formmixin],
    data (){
      return {
        tabState:[{select:false}],
        isCancellation:false,
        id: '',
        name:'',
        categoryName:'',
        bank:'',
        bankID:'',
        stateName:'',
        account:'',
        natureName:'',
        customerManagerName:'',
        fileList:[],
        categoryUnitShow:true,
        webAccountTypeName:'',
        webAccountTypeShow:false,
        settlementAccount:'',
        settlementAccountID:'',
        managerTel:'',
        rate:'',
        isAlias:false,
        alias:'',
        accountName:'账号',
        posShow:false,
        cancellationRemark:'',
        cancellationPerson:'',
        cancellationPersonID:'',
        cancellationWorkDate:'',
        cancellationaAgentPersonID:'',
        cancellationaAgentPerson:'',
        cancellationFiles:[],
      }
    },
    methods: {
      editBtn(){
        // 默认设置页面标记是查看
        var isAdd = false
        // 默认设置页面标题为查看信息
        var title = '查看对公账号信息'
        //0是在对公账账户模块进入   ''是选择页面进入
        var url='/publicAccountForm?id=' + this.id+'&url=0'
        this.$dialog.OpenWindow({
          width: 1050,
          height: 750,
          url:url,
          title:title,
          closeCallBack:(data) =>{
            if (data) {
              this.initData()
            }
          }
        })
      },
      initData(){
        this.setQuery2Value('id')
        this.init({
          url: '/Fin/publicAccountVueForm',
          all: (data)=>{
            this.$dialog.setReturnValue('1')
            this.id=data.id
            this.name=data.name
            this.categoryName=data.categoryName
            this.bank=data.bank
            this.bankID=data.bankID
            this.stateName=data.stateName
            this.account=data.account
            this.natureName=data.natureName
            this.customerManagerName=data.customerManager
            this.managerTel=data.managerTel
            this.fileList = data.files
            this.webAccountTypeName = data.webAccountTypeName
            this.settlementAccount = data.settlementAccount
            this.settlementAccountID = data.settlementAccountID
            this.rate = data.rate
            this.alias = data.alias
            this.cancellationRemark=data.cancellationRemark
            this.cancellationPerson=data.cancellationPerson
            this.cancellationPersonID=data.cancellationPersonID
            this.cancellationWorkDate=data.cancellationWorkDate
            this.cancellationFiles=data.cancellationFiles
            this.cancellationaAgentPerson=data.cancellationaAgentPerson
            this.cancellationaAgentPersonID=data.cancellationaAgentPersonID
            if(this.cancellationRemark&&this.cancellationPerson&&this.cancellationPersonID&&this.cancellationWorkDate){
              this.tabState=[{select:true}]
              this.isCancellation=true
            }
            if(data.alias!==''){
              this.isAlias=true
            }
            if(data.categoryUnit === '0'){
              this.categoryUnitShow=true
            }else{
              this.categoryUnitShow=false
            }
            if(data.category==='0'){
            }else if(data.category==='1'){
            }else if(data.category==='2'){
              this.posShow=true
              this.webAccountTypeShow=true
            }else{
              this.accountName='账号POS机别名'
            }
          },
          add: (data)=>{

          },
          look: (data)=>{

          }
        })
      }
    },
    created () {
      this.initData()
    }
  }
</script>

<style scoped>

</style>
