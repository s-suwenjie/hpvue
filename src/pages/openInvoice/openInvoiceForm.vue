<template>
  <div class="f_main">
    <yhm-formbody>
      <template #title>基本信息</template>
      <template #control>
        <yhm-form-text title="申请人" no-edit="1" :value="person" id="person" rule="R0000"></yhm-form-text>
        <yhm-form-date title="申请日期" :max="maxApplyDate" :value="applyDate" id="applyDate" rule="R0000"></yhm-form-date>
        <yhm-form-radio title="购买方类型" @call="selectPurchaserType" :select-list="purchaserTypeList"  :value="purchaserType" id="purchaserType" rule="R0000"></yhm-form-radio>
        <yhm-form-select title="购买方" :value="purchaser" id="purchaser" @click="selectPurchaser" rule="R0000"></yhm-form-select>
        <yhm-form-select title="事由" :value="subject" id="subject" @click="selectSubject" rule="R0000"></yhm-form-select>
        <yhm-form-radio title="增票类型" :no-show-item="ownerSysNoList" :no-edit="isWare"  :select-list="invoiceCategoryList" :value="invoiceCategory" id="invoiceCategory" rule="R0000"></yhm-form-radio>
        <yhm-form-radio title="款项状态" @call="selectIsReceivables" :select-list="isReceivablesList"  :value="isReceivables" id="isReceivables" rule="R0000"></yhm-form-radio>
        <yhm-form-text title="发票金额" tip="invoiceMoney" before-icon="rmb" :value="invoiceMoney" id="invoiceMoney" rule="R3000" placeholder="请输入数字" error-message="纯数字输入"></yhm-form-text>
        <yhm-form-text title="金额大写" :value="invoiceMoneyUp" id="invoiceMoneyUp" rule="R0000" no-edit="1"></yhm-form-text>
        <yhm-form-date title="预计回" subtitle="款日期" v-if="isInit" :min="minMoneyBackDate" :value="moneyBackDate" id="moneyBackDate" rule="R0000"></yhm-form-date>
        <yhm-form-date title="预计使" subtitle="用日期" v-if="isInit" :min="minPreUseDate" :value="preUseDate" id="preUseDate" rule="R0000"></yhm-form-date>
        <yhm-form-textarea title="事由说明" :value="remark" id="remark"></yhm-form-textarea>
      </template>
    </yhm-formbody>
    <yhm-form-list-edit>
      <template #title>商品列表</template>
      <template #operate>
        <yhm-commonbutton  value="添加商品明细" icon="btnAdd" @call="addProduct"></yhm-commonbutton>
      </template>
      <template #listHead>
        <yhm-managerth style="width: 160px" title="商品名称"></yhm-managerth>
        <yhm-managerth style="width: 180px" title="型号"></yhm-managerth>
        <yhm-managerth style="width: 90px" title="数量"></yhm-managerth>
        <yhm-managerth style="width: 60px" title="单位"></yhm-managerth>
        <yhm-managerth style="width: 90px" title="单价"></yhm-managerth>
        <yhm-managerth style="width: 90px" title="总额"></yhm-managerth>
        <yhm-managerth style="width: 200px" title="备注"></yhm-managerth>
        <yhm-managerth style="width: 40px" title="删除"></yhm-managerth>
      </template>
      <template #listBody>
        <tr v-for="(item,index) in productDetails" :key="index" :class="{InterlacBg:index%2!==0}">
          <yhm-form-td-textbox width="160" tip="value" no-edit="1" id="product" :list="productDetails" listid="productDetails" :value="item" ></yhm-form-td-textbox>
          <yhm-form-td-select-dialog width="180" tip="value" @call="selectModel(item)" id="model" :list="productDetails" listid="productDetails" :value="item" rule="#"></yhm-form-td-select-dialog>
          <yhm-form-td-textbox width="90" @input="calculationTotalMoney(item)" :list="productDetails" listid="productDetails" :value="item" id="quantity"></yhm-form-td-textbox>
          <yhm-form-td-textbox width="60" tip="value" no-edit="1" id="unit" :list="productDetails" listid="productDetails" :value="item"></yhm-form-td-textbox>
          <yhm-form-td-textbox width="90" tip="money" before-icon="rmb" @input="calculationTotalMoney(item)" :list="productDetails" listid="productDetails" :value="item" id="price"></yhm-form-td-textbox>
          <yhm-form-td-textbox width="90" tip="money" no-edit="1" tip-left="-53" tip-arrow-left="70" before-icon="rmb" id="totalMoney"  :list="productDetails" listid="productDetails" :value="item"></yhm-form-td-textbox>
          <yhm-form-td-textbox width="200"  id="remark" :list="productDetails" listid="productDetails" :value="item"  ></yhm-form-td-textbox>
          <yhm-form-td-delete width="40" :list="productDetails" :value="item" :del-click="true" @click="delProduct(index,item)"></yhm-form-td-delete>
        </tr>
      </template>
      <template #empty>
        <span class="m_listNoData" v-show="empty">暂时没有数据</span>
      </template>
    </yhm-form-list-edit>
    <div class="f_split"></div>
    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn>
        <yhm-commonbutton value="保存" icon="btnSave" :flicker="true" @call="save()"></yhm-commonbutton>
      </template>
    </yhm-formoperate>
  </div>
</template>

<script>
  import { formmixin } from '@/assets/form.js'
  import { formatDate ,accAdd, guid,number2chinese,formatCnDate,accMul,formatTime} from '@/assets/common.js'
  export default {
    name: 'openInvoiceForm',
    mixins: [formmixin],
    data(){
      return{
        personID:'',//申请人
        person:'',
        applyDate:'',//申请日期
        maxApplyDate:formatDate(new Date()),
        purchaser:'',//
        purchaserID:'',//购买方
        subject:'',
        subjectID:'',//事由
        invoiceMoney:'',//发票金额
        invoiceMoneyUp:'',//金额大写
        sumMoney:'',//商品金额
        remark:'',//事由说明
        preUseDate:'',//预计使用日期
        minPreUseDate:formatDate(new Date()),
        moneyBackDate:'',//预计回款日期
        minMoneyBackDate:formatDate(new Date()),
        productDetails:[],
        empty:true,

        isWare:false,//发票类型是否能选择
        isAdd:'',//是否是第一次请求
        isInit:false,//未付款   是隐藏  预计使用时间
        invoiceCategory:'',
        invoiceCategoryList:[],
        ownerSysNoList:[],
        isReceivables:'',
        isReceivablesList:[],
        purchaserType:'',
        purchaserTypeList:[]
      }

    },
    methods:{
      save(){
        let a = this.validator()
        let b = this.productDetails.length > 0
        let c = this.sumMoney===this.invoiceMoney
        if(!b){
          this.$dialog.alert({
            tipValue: '商品明细必须添加',
            alertImg: 'error',
            closeCallBack:() => {
              this.addProduct()
            }
          })
        }
        if(!c){
          this.$dialog.alert({
            alertImg: 'error',
            tipValue: '发票金额必须和商品总金额一致',
            closeCallBack:() => {
            }
          })
          return
        }
        if(a&&b&&c){
          let params = {
            id:this.id,
            personID:this.personID,//申请人
            person:this.person,
            applyDate:this.applyDate,//申请日期
            purchaserType:this.purchaserType,//购买方类型
            purchaser:this.purchaser,//购买方
            purchaserID:this.purchaserID,//购买方
            subject:this.subject,
            subjectID:this.subjectID,//事由
            invoiceCategory:this.invoiceCategory,//发票类型
            isReceivables:this.isReceivables,
            invoiceMoney:this.invoiceMoney,//发票金额
            invoiceMoneyUp:this.invoiceMoneyUp,//金额大写
            remark:this.remark,//事由说明
            preUseDate:this.preUseDate,//预计使用日期
            moneyBackDate:this.moneyBackDate,//
            productDetails:this.productDetails,
          }
          this.ajaxJson({
            url: '/Bill/openInvoiceFormSave',
            data: params,
            call: (data) => {
              if (data.type == 0) {
                this.$dialog.setReturnValue(this.id)
                this.$dialog.alert({
                  tipValue: data.message,
                  closeCallBack: ()=>{
                    this.$dialog.close()
                  }
                })
              }else{
                this.$dialog.alert({
                  tipValue: data.message,
                  closeCallBack: ()=>{
                    this.$dialog.close()
                  }
                })
              }
            }
          })
        }
      },
      //添加商品明细
      addProduct(){
        this.$dialog.OpenWindow({
          width: 950,
          height: 603,
          url: '/selectProduct',
          title: '选择商品信息',
          closeCallBack: (data) => {
            if (data) {
              if(this.productDetails.length<9){
                let isTrue=true
                for (let i = 0; i < this.productDetails.length; i++){
                  let ownerID = this.productDetails[i].productID
                  if(ownerID===data.id){
                    isTrue=false
                  }
                }
                if(isTrue){
                  let insertDate = new Date(accAdd(new Date().getTime(), accMul(this.productDetails.length, 1000)))
                  this.productDetails.push({
                    id: guid(),
                    insertDate: formatTime(insertDate),
                    ownerID: this.id,
                    productID:data.id,
                    product:data.name,
                    modelID:'',
                    model:'',
                    quantity:'1',
                    unit:data.unit,
                    price:'',
                    totalMoney:'',
                    remark:'',
                  })
                  this.empty = this.productDetails.length === 0
                }
              }else{
                this.$dialog.alert({
                  alertImg: 'error',
                  tipValue: '商品列表不能超过8条',
                  closeCallBack: () => {
                    this.isShowSubmit = true
                  }
                })
              }
            }
          }
        })
      },
      //删除商品
      delProduct(index,item){
        this.productDetails.splice(index,1)
        this.empty = this.productDetails.length === 0
        this.calculationMoney()
      },
      //计算总额
      calculationMoney(){
        let money = 0
        for (let i = 0; i < this.productDetails.length; i++){
          let temp = this.productDetails[i].totalMoney
          if(isNaN(temp) || temp === ''){
            temp = 0
          }
          money = accAdd(money,temp)
        }
        this.sumMoney = money + ''
      },
      //计算单条总价
      calculationTotalMoney(item){
        let price = item.price
        let quantity = item.quantity
        if(isNaN(price) || price === ''){
          price = 0
        }
        if(isNaN(quantity) || quantity === ''){
          quantity = 0
        }
        item.totalMoney = accMul(price,quantity) + ''
        this.calculationMoney()
      },
      //选择商品型号
      selectModel(item){
        this.$dialog.OpenWindow({
          width: 950,
          height: 603,
          url: '/selectModel?ownerID=' + item.productID,
          title: '选择商品规格型号信息',
          closeCallBack: (data) => {
            if (data) {
              item.modelID = data.id
              item.model = data.name
              item.price = data.price
              item.totalMoney = data.price
              this.calculationTotalMoney(item)
            }
          }
        })
      },
      switchSownerSys(){
        if(this.purchaserType === '0'){
          this.ownerSysNoList = []
        }else{
          this.ownerSysNoList = ['1']
        }
      },
      selectPurchaserType(){
        if(this.purchaserType==='1'&&this.invoiceCategory==='1'){
          this.invoiceCategory=0
        }
        this.purchaser=''
        this.purchaserID=''
        this.switchSownerSys()
      },
      selectIsReceivables(){
        if(this.isReceivables==="0"){
          this.isInit=false
        }else{
          this.isInit=true
        }
      },
      selectSubject(){
        this.$dialog.OpenWindow({
          width: '950',
          height: '700',
          url: '/selectDic?name=64',
          title: '选择事由',
          closeCallBack: (data) => {
            if (data) {
              this.subjectID=data.id
              if(data.value2===''){
                this.subject=data.showName+' ---- '+data.value1
              }else{
                this.subject=data.showName+' ---- '+data.value1+' ---- '+data.value2
              }
            }
          }
        })
      },
      selectPurchaser(){
        let url=''
        if(this.purchaserType==='0'){
          url='/selectUnit?category=1&categoryBefore=1'
        }else{
          url='/selectPerson?category=1'
        }
        this.$dialog.OpenWindow({
          width: '950',
          height: '700',
          url: url,
          title: '选择购买方',
          closeCallBack: (data) => {
            if (data) {
              if(this.purchaserType==='0'){
                if(data.registrationNumber===""){
                  this.$dialog.OpenWindow({
                    width: '1050',
                    height: '700',
                    url: '/addUnitForm?id='+data.id,
                    title: '选择购买方',
                    closeCallBack: (unitData) => {
                      if(unitData){
                        this.purchaser=data.name
                        this.purchaserID=data.id
                      }
                    }
                  })
                }else{
                  this.purchaser=data.name
                  this.purchaserID=data.id
                }
              }else{
                if(data.idNo===''){
                  this.$dialog.OpenWindow({
                    width: '1050',
                    height: '700',
                    url: '/addPersonForm?id='+data.id,
                    title: '选择购买方',
                    closeCallBack: (personData) => {
                      if(personData){
                        this.purchaser=data.name
                        this.purchaserID=data.id
                      }
                    }
                  })
                }else{
                  this.purchaser=data.name
                  this.purchaserID=data.id
                }
              }

            }
          }
        })
      },
      initData(){
        let params = {

        }
        this.init({
          url: '/Bill/openInvoiceForm',
          data: params,
          all: (data)=>{
            this.purchaserType=data.purchaserTypePsd.value
            this.purchaserTypeList=data.purchaserTypePsd.list
            this.invoiceCategory=data.invoiceCategoryPsd.value
            this.invoiceCategoryList=data.invoiceCategoryPsd.list
            this.isReceivables=data.isReceivablesPsd.value
            this.isReceivablesList=data.isReceivablesPsd.list

            if(this.invoiceCategory==='1'){
              this.isWare=true
            }
            if(this.isReceivables==='1'){
              this.isInit=true
            }
            this.selectIsReceivables()
          },
          add: (data)=>{

          },
          look: (data)=>{
            this.personID=data.personID
            this.person=data.person
            this.applyDate=data.applyDate
            this.purchaserID=data.purchaserID
            this.purchaser=data.purchaser
            this.subjectID=data.subjectID

            this.subject=data.subject
            this.moneyBackDate=data.moneyBackDate
            this.invoiceMoney=data.invoiceMoney

            this.invoiceMoneyUp=data.invoiceMoneyUp
            this.preUseDate=data.preUseDate
            this.remark=data.remark
            this.productDetails=data.productDetails
            if(data.productDetails.length>0){
              this.empty = this.productDetails.length === 0
            }
            this.selectIsReceivables()
            this.selectPurchaserType()
            this.switchSownerSys()
            this.calculationMoney()
          }
        })
      }
    },
    watch: {
      invoiceMoney () {
        this.invoiceMoneyUp = number2chinese(this.invoiceMoney)
      },
    },
    created () {
      this.setQuery2Value('isAdd')
      if(this.isAdd){
        this.person = sessionStorage.getItem('____currentUser')
        this.personID = sessionStorage.getItem('____currentUserID')
        this.applyDate = formatDate(new Date())
      }
      this.initData()
    }
  }
</script>

<style scoped>

</style>
