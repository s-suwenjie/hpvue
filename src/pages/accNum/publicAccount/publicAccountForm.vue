<template>
  <div class="f_main">
    <yhm-formbody>
      <template #control>
        <yhm-form-radio :no-edit="isCategory" @call="isRelevanceEvent" title="账户类型" :select-list="categoryList" width="1" :value="category" id="category" rule="R0000"></yhm-form-radio>
        <yhm-form-select title="户名" :noClick="isUnit" tip="value" @click="selectUnit" :value="name" id="name" rule="R0000" ></yhm-form-select>
        <yhm-form-radio @call="stateListEvent" title="账户状态" :select-list="stateList" :value="state" id="state" rule="R0000"></yhm-form-radio>


        <yhm-form-select :show="isNewBank" title="开户行" tip="value" @click="selectEvent" :value="bank" id="bank"  rule="R0000"></yhm-form-select>
        <yhm-form-radio :show="isNetType"  title="网络" subtitle="账户类型" :select-list="webAccountTypelist" :value="webAccountType" id="webAccountType" rule="R0000"></yhm-form-radio>

        <yhm-form-select :show="isSetAcc" @click="selectSettlementAccount" title="结算账户" tip="value"  :value="settlementAccount" id="settlementAccount" rule="R0000"></yhm-form-select>
        <yhm-form-text @repeatverify="repeatverifyAccountEvent"  ref="account"  :title="accountTitle" :value="account" id="account"  rule="R0000" :tip="tip" :tip-rule="tipRule"></yhm-form-text>
        <yhm-form-text :show="isAlias" title="账户别名" :value="alias" id="alias"></yhm-form-text>
        <yhm-form-radio :show="isAccNature" title="账户性质" :select-list="natureList"  :value="nature" id="nature" rule="R0000" width="1"></yhm-form-radio>
        <yhm-form-text :show="isAccMan" title="客户经理" tip="value" :value="customerManager" id="customerManager" rule="R0000"></yhm-form-text>
<!--        <yhm-form-select :show="isAccMan" title="客户经理" tip="value" @click="managerEvent" :value="customerManagerName" id="customerManagerName" rule="R0000"></yhm-form-select>-->
        <yhm-form-text :show="isPhone" tip="phone" title="联系电话"  :value="managerTel" id="managerTel" width="1"></yhm-form-text>

        <!--<yhm-form-text :show="isPosAcc" @repeatverify="repeatverifyAccountEvent"  ref="account" tip="account" title="账号" subtitle="POS机别名" :value="account" id="account" rule="R0000"></yhm-form-text>-->
<!--        <yhm-form-text :show="posNameShow" tip="remark" title="POS机费率" subtitle="万分之多少" :value="probability" id="probability"  rule="R0000"></yhm-form-text>-->

<!--        <yhm-formlistbody v-if="isPosList">-->
<!--          <template #title>下挂账号信息</template>-->
<!--          <template #operate>-->
<!--            <div>-->
<!--              <yhm-commonbutton value="添加下挂账户信息" icon="btnAdd" @call="addInvoice"></yhm-commonbutton>-->
<!--            </div>-->
<!--          </template>-->
<!--          <template #listHead>-->
<!--            <th style="width: 120px">账号</th>-->
<!--            <th style="width: 270px;">费率</th>-->
<!--            <th style="width: 270px;">备注</th>-->
<!--            <th >删除</th>-->
<!--          </template>-->
<!--          <template #listBody>-->
<!--            <tr v-for="(item,index) in InvoiceDetails" :key="index" :class="{InterlacBg:index%2!==0}">-->
<!--              <yhm-form-td-textbox width="330" :list="InvoiceDetails" listid="InvoiceDetails" :value="item" id="account" rule="R0000"></yhm-form-td-textbox>-->
<!--              <yhm-form-td-textbox width="250" :list="InvoiceDetails" listid="InvoiceDetails" :value="item" id="rate" rule="R0000"></yhm-form-td-textbox>-->
<!--              <yhm-form-td-textbox width="330" :list="InvoiceDetails" listid="InvoiceDetails" :value="item" id="remark"></yhm-form-td-textbox>-->
<!--              <yhm-form-td-delete :must="1" width="38" :list="InvoiceDetails" :value="item"></yhm-form-td-delete>-->
<!--            </tr>-->
<!--          </template>-->
<!--          <template #empty>-->
<!--            <span class="m_listNoData" v-show="empty">暂时没有数据</span>-->
<!--          </template>-->
<!--        </yhm-formlistbody>-->
<!--        <yhm-formupload :show="isUpLoad" :ownerID="id" :value="fileList" id="fileList" title="上传印鉴卡" tag="publicAccountImg" subtitle="" multiple="multiple" rule="#"></yhm-formupload>-->

      </template>
    </yhm-formbody>
    <yhm-form-list-edit :show="isList">
      <template #title>重复账户信息</template>
      <template #listHead>
        <yhm-managerth style="width: 38px;background: linear-gradient(0deg, #ec6603, #a24906);" title="查看"></yhm-managerth>
        <yhm-managerth title="户名" style="background: linear-gradient(0deg, #ec6603, #a24906);"></yhm-managerth>
        <yhm-managerth style="width: 170px;background: linear-gradient(0deg, #ec6603, #a24906);" title="账号"></yhm-managerth>
        <yhm-managerth style="width: 230px;background: linear-gradient(0deg, #ec6603, #a24906);" title="开户行"></yhm-managerth>
        <yhm-managerth style="width: 100px;background: linear-gradient(0deg, #ec6603, #a24906);" title="账户状态"></yhm-managerth>
        <yhm-managerth style="width: 150px;background: linear-gradient(0deg, #ec6603, #a24906);" title="操作"></yhm-managerth>
      </template>
      <template #listBody>
        <tr v-for="(item,index) in list" :key="index" :class="{InterlacBg:index%2!==0}">
          <yhm-manager-td-look @click="lookPublic(item)"></yhm-manager-td-look>
          <yhm-manager-td :value="item.name"></yhm-manager-td>
          <yhm-manager-td :value="item.account"></yhm-manager-td>
          <yhm-manager-td :value="item.bank"></yhm-manager-td>
          <yhm-manager-td v-show="item.state === '0'" value="正常  "></yhm-manager-td>
          <yhm-manager-td v-show="item.state === '1'" value="休眠"></yhm-manager-td>
          <yhm-manager-td v-show="item.state === '2'" value="销户"></yhm-manager-td>
          <yhm-manager-td-operate>
            <yhm-manager-td-operate-button v-show="item.state === '0' && isUrl" @click="select(item)" style="color:#ec6603" value="选择"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button v-show="item.state === '1'" @click="recoveryUse(item)" value="恢复使用"></yhm-manager-td-operate-button>
          </yhm-manager-td-operate>
        </tr>
      </template>
    </yhm-form-list-edit>
    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn >
        <yhm-commonbutton value="保存" icon="btnSave" :flicker="true" @call="save()"></yhm-commonbutton>
      </template>
    </yhm-formoperate>
  </div>
</template>

<script>
  import { accMul, accAdd, guid, formatDate,formatTime } from '@/assets/common.js'
  import { formmixin } from '@/assets/form.js'
  export default {
    name: 'publicAccountForm',
    mixins: [formmixin],
    data(){
      return{
        id:'',
        categoryList:[], //账户类型
        category:'',     //账户类型
        categoryUnit:'',  //0是本单位    1是外单位
        name:'',    //户名
        unitID:'',  //户名ID
        stateList:[],    //账户状态
        state:'',        //账户状态
        bank:'',         //开户行
        bankID:'',       //开户行ID
        account:'',      //账号
        tip:'customize',
        tipRule:'44444',
        natureList:[],    //账户性质
        nature:'',       //账户性质
        customerManager:'',     //客户经理
        customerManagerName:'',      //客户经理
        managerTel:'',       //联系电话
        remark:'',               //账号ID
        webAccountTypelist:[],   //网络账户类型
        webAccountType:'',      //网络账户类型
        thirdPartName:'',
        isRelevance:'0',        //银行卡类型
        fileList:[],            //上传印鉴卡
        otherUnit:'',           //结算账户
        otherUnitID:'',         //结算账户
        probability:'',         //pos机费率
        settlementAccount:'',     //结算账户
        settlementAccountID:'',     //结算账户
        InvoiceDetails:[],      //添加下挂信息
        isCategory:false,

        isNewBank: true,   //开户行
        isAccNature: true,  //账户性质
        isAccMan: true,   //客户经理
        isPhone:true,        //联系电话
        isUpLoad: true,   //上传印鉴卡
        isNetType: false,  //网络账户类型
        isPosList: false,   //下挂列表
        isSetAcc: false,   //结算账户
        isPosAcc: false,
        posNameShow: false,
        accountTitle: '账号',

        alias:'',//账户别名
        isAlias:false,

        list:[],
        isList:false,

        url:'',//0是在对公账账户模块进入   ''是选择页面进入
        isUrl:false,
        isUnit:false,
      }
    },
    created () {
      this.setQuery2Value('id')
      this.setQuery2Value('url')
      this.setQuery2Value('unitID')
      let param={}
      if(this.unitID){
        this.isUnit=true
        param={
          unitID:this.unitID,
        }
      }
      this.init({
        url: '/Fin/publicAccountVueForm',
        data:param,
        all: (data) => {
          /* 公共 无论查看和添加返回数据 */
          this.categoryList = data.categoryPsd.list
          this.category = data.categoryPsd.value
          this.stateList = data.statePsd.list
          this.state = data.statePsd.value
          this.natureList = data.naturePsd.list
          this.nature = data.naturePsd.value
          this.webAccountTypelist = data.webAccountTypePsd.list
          this.webAccountType = data.webAccountTypePsd.value

          if(this.unitID){
            this.name=data.name
          }
        },
        add: (data) => {
          /* 需要添加的数据 */
          this.id =  guid()
        },
        look: (data) => {
          /* 需要查看的数据 */
          this.unitID = data.unitID
          this.name = data.name
          this.account = data.account
          this.customerManager = data.customerManager
          this.customerManagerName = data.customerManagerName
          this.managerTel = data.managerTel
          this.fileList = data.files
          this.settlementAccount = data.settlementAccount
          this.InvoiceDetails = data.posAccount
          this.bank = data.bank
          this.bankID = data.bankID
          this.categoryUnit = data.categoryUnit
          this.categoryList = data.categoryPsd.list
          this.category = data.categoryPsd.value
          this.tipRule = data.accountEcho
          this.alias = data.alias
          if(this.categoryUnit==='0'){
            this.isAlias=true
          }

          this.isRelevanceEvent ()
          if(this.categoryUnit === '1'){
            this.isAccNature = false
            this.isAccMan = false
            this.isPhone = false
            this.isUpLoad = false
          }
        }
      })
    },
    methods: {
      select(item){
        if(item.unitID===this.unitID){
          this.$dialog.setReturnValue(item)
          this.$dialog.close()
        }else{
          this.$dialog.alert({
            tipValue: '请选择所选单位账户',
            alertImg: 'error',
          })
        }
      },
      stateListEvent(){ //账户状态
        if(this.state === '1'){
          this.state = '0'
        }else if(this.state === '2'){
          this.state = '0'
        }
      },
      //恢复账户使用
      recoveryUse(item){
        this.ajaxJson({
          url: "/Fin/publicAccountRecoveryUse",
          data: {
            id: item.id,
          },
          loading: "0",
          call: (data) => {
            this.$dialog.alert({
              tipValue: data.message,
              closeCallBack: () => {
                this.$dialog.close()
              }
            })
          }
        })
      },
      repeatverifyAccountEvent(){ //账号
        this.isList=false
        this.ajaxJson({
          url:"/Fin/verifyAccountVue ",
          data:{
            id:this.id,
            account:this.account ,
            category:this.category,
            webAccountType:this.webAccountType,
          },
          loading:"0",
          call:(data) =>{
            if(this.url===''){
              this.isUrl=true
            }
            if(data.type !== 1){//说明存在，调用控件验证显示规则
              this.$refs.account.errorEvent("该账号已存在")
              this.ajaxJson({
                url:"/Fin/getPublicAccountInformation",
                data:{
                  id:data.id,
                },
                loading:"0",
                call:(information) =>{
                  this.list=information
                  if(this.list.length>0){
                    this.isList=true
                  }
                },
              })
            }
          }
        })
      },
      async isAccountVerifyEvent(){ //账号
        let result = await this.ajaxAsync({
          url:"/Fin/verifyAccountVue ",
          data:{
            id:this.id,
            account:this.account,
            category:this.category,
            webAccountType:this.webAccountType,
          },
          loading:"0"
        })
        if(result.type !== 1){//说明存在，调用控件验证显示规则
          this.$refs.account.errorEvent("该账号已存在")
          return false
        }
        return true
      },
      managerEvent () { //客户经理点击事件
        this.$dialog.OpenWindow({
          width: 950,
          height: 692,
          url: '/selectPerson?category=1&categoryBefore=1',
          title: '选择联系人',
          closeCallBack: (data) => {
            if (data) {
              this.customerManagerName = data.name
              this.customerManager = data.id
              this.managerTel = data.phone
            }
          }
        })
      },
      selectUnit () { //户名点击事件

        this.$dialog.OpenWindow({
          width: 950,
          height: 692,
          url: '/selectUnit?category=1',
          title: '选择单位',
          closeCallBack: (data) => {
            if (data) {
              this.name = data.name
              this.unitID = data.id
              this.categoryUnit = data.category
              if(this.categoryUnit==='0'){
                this.isAlias=true
              }
              this.isRelevanceEvent ()
            }
          }
        })
      },
      selectSettlementAccount () { //结算账户点击事件
        if(this.unitID){
          this.$dialog.OpenWindow({
            width: 950,
            height: 692,
            url: '/selectPublicAccount?category=1&categoryUnit=0&unitID='+this.unitID,
            title: '选择结算账户',
            closeCallBack: (data) => {
              if (data) {
                this.settlementAccount = data.publicAccountExplain
                this.settlementAccountID = data.id
              }
            }
          })
        }else{
          this.selectUnit ()
        }
      },
      addInvoice () { //添加下挂信息
        let insertDate = new Date(accAdd(new Date().getTime(), accMul(this.InvoiceDetails.length, 1000)))
        this.InvoiceDetails.push(
          {
            id:guid(),
            insertDate: formatTime(insertDate),
            ownerID: this.id, //主数据ID
            account:'',        //账户
            rate:'',            //费率
            remark:'',         //备注
          }
        )
      },
      selectEvent () { //开户行点击事件
        let name = 49
        this.$dialog.OpenWindow({
          width: 950,
          height: 692,
          url:'/selectDic?name='+ name,
          title: '选择开户行',
          closeCallBack: (data) => {
            if (data) {
              this.tipRule = data.value4
              this.bank = data.showName
              this.bankID = data.id
            }
          }
        })
      },
      isRelevanceEvent () { //账户分类点击事件
        if(this.category === '0'){
          this.tip = 'value'
          this.isAccNature = false
          this.isAccMan = false
          this.isPhone = false
          this.isUpLoad = false
          this.isNewBank = false
          this.isCategory = true
        } else if(this.category === '1'){
          this.tip = 'customize'
          this.isNewBank = true
          this.isNetType = false
          this.isAccNature = true
          this.isAccMan = true
          this.isPhone = true
          this.isUpLoad = true
          this.isSetAcc = false
          this.isPosAcc = false
          this.posNameShow = false
          this.isPosList = false
          this.empty = false
          if(this.categoryUnit === '1'){
            this.isAccNature = false
            this.isAccMan = false
            this.isPhone = false
            this.isUpLoad = false
          }else{
            this.isAccNature = true
            this.isAccMan = true
            this.isPhone = true
            this.isUpLoad = true
          }
          this.accountTitle='账号'

        }else if (this.category === '2') {
          this.tip = 'value'
          this.isNewBank = false
          this.isNetType = true
          this.isAccNature = false
          this.isAccMan = false
          this.isPhone = false
          this.isUpLoad = false
          this.isSetAcc = false
          this.isPosAcc = false
          this.posNameShow = false
          this.isPosList = false
          this.empty = false
          this.accountTitle='账号'
        } else{
          this.tip = 'value'
          this.isNetType = false
          this.isNewBank = false
          this.isAccMan = false
          this.isPhone = false
          this.isUpLoad = false
          this.isAccNature = false
          this.isSetAcc = true
          this.isPosAcc = true
          this.posNameShow = true
          this.isPosList = true
          this.empty = true
          this.accountTitle='POS机别名'

        }
      },

      async save () { //保存
        let a = await this.isAccountVerifyEvent()
        let b = this.validator()
        if (a && b) {
          let params = {
            id: this.id,
            category:this.category,                 //账户类型
            name:this.name,                         //户名
            unitID:this.unitID ,                    //户名ID
            state:this.state,                       //账号状态
            account:this.account,                   //账号 //POS账户别名
            bankID:this.bankID,                     //开户行ID
            nature:this.nature,                     //账户性质
            customerManager:this.customerManager,//客户经理
            customerManagerName:this.customerManagerName,
            managerTel:this.managerTel,             //联系电话
            webAccountType:this.webAccountType,     //网络状态
            webAccountTypeStr:this.webAccountType,  //网络账户类型
            files:this.fileList,                    //上传
            settlementAccountID:this.settlementAccountID,     //结算账户
            settlementAccount:this.settlementAccount,     //结算账户
            posAccount:this.InvoiceDetails,         //添加下挂信息
            categoryUnit: this.categoryUnit,         //本外单位代码
            alias: this.alias,//账户别名
          }
          this.ajaxJson({
            url: '/Fin/publicAccountVueSave',
            data: params,
            call: (data) => {
              if (data.type === 0) {
                this.$dialog.setReturnValue(this.id)
                this.$dialog.alert({
                  tipValue: data.message,
                  closeCallBack: () => {
                    this.$dialog.close()
                  }
                })
              }else if(data.type === 1){
                this.$dialog.alert({
                  alertImg:'warn',
                  tipValue: data.message
                })
              }
            }
          })
        } else {
          return false
        }
      },
    },
    watch: {
      InvoiceDetails () { // 监听列表是否有数据
        if (this.InvoiceDetails.length === 0) {
          this.empty = true
        } else {
          this.empty = false
        }
      },
    }
  }
</script>

<style scoped>
.noTableData{
  width: 100%;
}
</style>
