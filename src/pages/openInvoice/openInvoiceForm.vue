<template>
  <div class="f_main">
    <yhm-formbody>
      <template #title>基本信息</template>
      <template #control>
        <yhm-form-text :title-color="fontColor" title="申请人" no-edit="1" :value="person" id="person" rule="R0000"></yhm-form-text>
        <yhm-form-date :title-color="fontColor" title="申请日期" :max="maxApplyDate" :value="applyDate" id="applyDate" rule="R0000"></yhm-form-date>
        <yhm-form-radio :title-color="fontColor" title="开票类型" :no-edit="isCategory" @call="selectCategory" :select-list="categoryList"  :value="category" id="category" rule="R0000" width="1"></yhm-form-radio>
        <yhm-form-radio :title-color="fontColor" title="发票类型" :no-edit="isInvoiceCategory" @call='selectInvoiceCategory' :no-show-item="invoiceCategoryNoList" :select-list="invoiceCategoryList" :value="invoiceCategory" id="invoiceCategory" rule="R0000" width="1"></yhm-form-radio>
        <yhm-form-radio :title-color="fontColor" title="抬头类型" :no-edit="isPurchaserType" :no-show-item="isPurchaserTypeNoList" @call="selectPurchaserType" :select-list="purchaserTypeList"  :value="purchaserType" id="purchaserType" rule="R0000"></yhm-form-radio>
        <yhm-form-select :title-color="fontColor" title="发票抬头" :no-click="isPurchaser"  :value="purchaser" id="purchaser" @click="selectPurchaser" :rule="purchaserRule">
        <div class="formBoxIcon" v-if="purchaserType == '0'&&purchaserID!=''" @click="selectOpenInvoiceRise" title='修改发票抬头'>
          <span class="i-copy"></span>
        </div>
        </yhm-form-select>
        <yhm-form-text title="税号" no-edit="1" v-show="isTaxNumberShow" :show="isTaxNumberShow" :value="taxNumber" id="taxNumber" rule="R0000"></yhm-form-text>
        <yhm-form-text title="开户行" no-edit="1" v-show="isBankShow" tip="value" :value="bank" id="bank" rule="R0000"></yhm-form-text>
        <yhm-form-text title="账号" no-edit="1" v-show="isBankShow" :value="account" id="account" rule="R0000"></yhm-form-text>
        <!-- <yhm-form-text title="工单号" v-if="isWordOrder" :value="workOrder" id="workOrder" rule="R0000"></yhm-form-text>-->
        <!--<yhm-form-select title="工单号" v-if="isWordOrder" :value="workOrder" id="workOrder" @click="selectWorkOrder" rule="R0000"></yhm-form-select>-->
        <!--<yhm-form-text title="车牌号" v-if="isWordOrder" :value="licensePlateNumber" id="licensePlateNumber" rule="R0000"></yhm-form-text>-->
        <yhm-form-list-edit v-if="isWordOrder" style="border-bottom: 0;">
          <template #title>工单信息</template>
          <template #operate>
            <!--<yhm-commonbutton  value="添加工单信息" v-if="isAddWordOrder" icon="btnAdd" @call="addWordOrder(ownerCategory)"></yhm-commonbutton>-->
            <yhm-commonbutton  value="添加工单信息" v-if="isAddWordOrder" icon="btnAdd" @call="addWordOrder(ownerCategory)"></yhm-commonbutton>
          </template>
          <template #listHead>
            <yhm-managerth style="width: 180px" title="工单号"></yhm-managerth>
            <yhm-managerth style="width: 180px" title="车牌号"></yhm-managerth>
            <yhm-managerth style="width: 180px" title="剩余开票金额"></yhm-managerth>
            <yhm-managerth style="width: 180px" title="开票金额"></yhm-managerth>
            <yhm-managerth style="width: 40px" title="删除"></yhm-managerth>
          </template>
          <template #listBody>
            <tr v-for="(item,index) in workOrderList" :key="index" :class="{InterlacBg:index%2!==0}">
              <yhm-form-td-textbox width="225" no-edit="1"  id="workOrder" :list="workOrderList" listid="workOrderList" :value="item" rule="R0000"></yhm-form-td-textbox>
              <yhm-form-td-textbox width="225" no-edit="1"  id="licensePlateNumber" :list="workOrderList" listid="workOrderList" :value="item" rule="R0000"></yhm-form-td-textbox>
              <yhm-form-td-textbox width="225" no-edit="1"  id="balance" :list="workOrderList" listid="workOrderList" :value="item" rule="R0000"></yhm-form-td-textbox>
              <yhm-form-td-textbox :input-red-show="true" width="225" :no-edit="isWorkOrderMoney" id="money" @change="changeMoney(item,index)" :list="workOrderList" listid="workOrderList" :value="item" rule="R0000"></yhm-form-td-textbox>
              <yhm-form-td-delete width="40" no-edit="0"  :list="workOrderList" :value="item" :del-click="true" @click="delWordOrder(index,item)"></yhm-form-td-delete>
            </tr>
          </template>
          <template #empty>
            <span class="m_listNoData" v-show="isWorkOrderEmpty">暂时没有数据</span>
          </template>
        </yhm-form-list-edit>
        <yhm-form-list-edit v-if="ownerCategory === '3'" style="border-bottom: 0;">
          <template #title>对账单信息</template>
          <template #operate>
            <!--<yhm-commonbutton  value="添加工单信息" v-if="isAddWordOrder" icon="btnAdd" @call="addWordOrder(ownerCategory)"></yhm-commonbutton>-->
            <yhm-commonbutton  value="添加对账单信息" icon="btnAdd" @call="addInsuranceInvoice(ownerCategory)"></yhm-commonbutton>
          </template>
          <template #listHead>
            <yhm-managerth style="width: 140px" title="开始日期"></yhm-managerth>
            <yhm-managerth style="width: 140px" title="结束日期"></yhm-managerth>
            <yhm-managerth style="width: 130px" title="账单总金额"></yhm-managerth>
            <yhm-managerth style="width: 130px" title="回款金额"></yhm-managerth>
            <yhm-managerth style="width: 130px" title="未回款金额"></yhm-managerth>
            <yhm-managerth style="width: 120px" title="剩余开票金额"></yhm-managerth>
            <yhm-managerth style="width: 130px" title="开票金额"></yhm-managerth>
            <yhm-managerth style="width: 40px" title="删除"></yhm-managerth>
          </template>
          <template #listBody>
            <tr v-for="(item,index) in invoiceList" :key="index" :class="{InterlacBg:index%2!==0}">
              <yhm-form-td-date width="140" no-edit="1"  id="monthsDate" :list="invoiceList" listid="invoiceList" :value="item" rule="R0000"></yhm-form-td-date>
              <yhm-form-td-date width="140" no-edit="1"  id="endDate" :list="invoiceList" listid="invoiceList" :value="item" rule="R0000"></yhm-form-td-date>
              <yhm-form-td-textbox width="130" no-edit="1"  id="sumMoney" :list="invoiceList" listid="invoiceList" :value="item" rule="R0000"></yhm-form-td-textbox>
              <yhm-form-td-textbox width="130" no-edit="1" id="useMoney" :list="invoiceList" listid="invoiceList" :value="item" rule="R0000"></yhm-form-td-textbox>
              <yhm-form-td-textbox width="130" no-edit="1"  id="alreadyMoney" :list="invoiceList" listid="invoiceList" :value="item" rule="R0000"></yhm-form-td-textbox>
              <yhm-form-td-textbox width="120" no-edit="1"  id="balance" :list="invoiceList" listid="invoiceList" :value="item" rule="R0000"></yhm-form-td-textbox>
              <yhm-form-td-textbox :input-red-show="true" width="130"  id="money" @change="changeInvoiceMoney(item,index)" :list="invoiceList" listid="invoiceList" :value="item" rule="R0000"></yhm-form-td-textbox>
              <yhm-form-td-delete width="40" no-edit="0"  :list="invoiceList" :value="item" :del-click="true" @click="delInvoiceList(index,item)"></yhm-form-td-delete>
            </tr>
          </template>
          <template #empty>
            <span class="m_listNoData" v-show="invoiceList.lenght>0">暂时没有数据</span>
          </template>
        </yhm-form-list-edit>
        <!--<yhm-form-text title="车牌号" v-if="isWordOrder" :value="licensePlateNumber" id="licensePlateNumber" rule="R8000"></yhm-form-text>-->
        <yhm-form-text :title-color="fontColor" :input-red-show="true" title="发票金额" :no-edit="isInvoiceMoney"  tip="invoiceMoney" before-icon="rmb" :value="invoiceMoney+''" id="invoiceMoney" :rule="invoiceMoneyRule" placeholder="请输入数字" error-message="纯数字输入"></yhm-form-text>
        <yhm-form-text :title-color="fontColor" title="金额大写" :value="invoiceMoneyUp" id="invoiceMoneyUp" rule="R0000" no-edit="1"></yhm-form-text>
        <yhm-form-radio :title-color="fontColor" title="款项状态" :no-edit="isIsReceivables" @call="selectIsReceivables" :select-list="isReceivablesList"  :value="isReceivables" id="isReceivables" rule="R0000"></yhm-form-radio>
        <yhm-form-date :title-color="fontColor" title="预计回" subtitle="款日期" v-if="isInit" :min="minMoneyBackDate" :value="moneyBackDate" id="moneyBackDate" rule="R0000"></yhm-form-date>
        <yhm-form-date :title-color="fontColor" title="预计使" subtitle="用日期" :min="applyDate" :value="preUseDate" id="preUseDate" rule="R0000"></yhm-form-date>
        <yhm-form-radio :title-color="fontColor" title="发票处理" @call="invoiceHandleClick" :select-list="invoiceHandleList"  :value="invoiceHandle" id="invoiceHandle" rule="R0000"></yhm-form-radio>
        <yhm-form-select :title-color="fontColor" title="收件人" v-if="invoiceHandle=='1'" @click="selectPerson" :value="addressee" id="addressee" rule="R0000"></yhm-form-select>
        <yhm-form-text placeholder="11位手机号码"  title="手机号" v-if="invoiceHandle=='1'" subtitle="" :value="addresseePhone" id="addresseePhone"></yhm-form-text>
        <yhm-form-text placeholder="请输入电话号码"  title="电话" v-if="invoiceHandle=='1'" subtitle="" :value="addresseeTel" id="addresseeTel"></yhm-form-text>
        <yhm-form-select default-txt="+请选择相关国家、省份、城市、区县" v-if="invoiceHandle=='1'" title="地址区域" tip="value"   @click="recipientAddressClick" :value="mailTitle" id="mailTitle" rule="R0000"></yhm-form-select>
        <yhm-form-textarea  placeholder="请输入详情地址，包含省、市、区、街道等" v-if="invoiceHandle=='1'" title="地址" subtitle="" :value="mailTitleAddress" id="mailTitleAddress"  rule="R0000"></yhm-form-textarea>

        <yhm-form-radio :title-color="fontColor" title="开票类型" v-if="isOpenInvoiceType" :no-edit="isOpenInvoiceTypeNo" :select-list="openInvoiceTypeList"  :value="openInvoiceType" id="openInvoiceType" rule="R0000"></yhm-form-radio>
        <yhm-form-upload-image title-color="black" v-show="isInvliceUrl" title="正常发" subtitle="票图片" width="800" height="650" discription="关联正常发票图片" @mouseoverEvent="lookImg" tag="Invoice" :value="inviceUrl" id="inviceUrl"></yhm-form-upload-image>

        <yhm-form-textarea :title-color="fontColor" title="事由说明" :value="remark" id="remark" :rule="remarkRule"></yhm-form-textarea>
        <yhm-formupload :ownerID="id" v-if="ownerCategory==='0'" :value="fileList" id="fileList" title="支持单据" tag="Invoice" subtitle="" multiple="multiple" rule="#"></yhm-formupload>
      </template>
    </yhm-formbody>
    <div id="lookImg" class="showImg" v-show="tipShow" @click="imgClick" @mouseout="imgClick">
      <img :src="getUrl">
    </div>
    <yhm-form-list-edit :show="isBankList" style="border: none;width: 998px">
      <template #title>收支明细</template>
      <template #operate>
        <yhm-commonbutton value="选择收支明细" icon="btnAdd" @call="selectBankDetail"></yhm-commonbutton>
      </template>
      <template #listHead>
        <yhm-managerth style="width: 230px" title="账号"></yhm-managerth>
        <yhm-managerth style="width: 140px" title="交易日期"></yhm-managerth>
        <yhm-managerth style="width: 130px" title="收支方向"></yhm-managerth>
        <yhm-managerth style="width: 90px" title="事由"></yhm-managerth>
        <yhm-managerth style="width: 110px" title="交易金额"></yhm-managerth>
        <yhm-managerth style="width: 220px" title="备注"></yhm-managerth>
        <yhm-managerth style="width: 40px" title="操作"></yhm-managerth>
      </template>
      <template #listBody>
        <tr v-for="(item,index) in bankDetailList" :key="index" :class="{InterlacBg:index%2!==0}">
          <yhm-form-td-textbox width="230" :no-edit="isBankDetail" :list="bankDetailList" listid="bankDetailList" :value="item" id="otherAccount" rule="R0000"></yhm-form-td-textbox>
          <yhm-form-td-date width="140" :no-edit="isBankDetail"  position="u" :list="bankDetailList" listid="bankDetailList" :value="item" id="cccurDate" rule="R0000"></yhm-form-td-date>
          <yhm-form-td-radio width="130" :no-edit="isBankDetail?true:false" :list="bankDetailList" listid="bankDetailList" :select-list="directionList" :value="item" id="direction"></yhm-form-td-radio>
          <yhm-form-td-textbox width="90" :no-edit="isBankDetail" :list="bankDetailList" listid="bankDetailList" :value="item" id="subject" rule="R0000"></yhm-form-td-textbox>
          <yhm-form-td-textbox width="110" :no-edit="isBankDetail" before-icon="rmb" :list="bankDetailList" listid="bankDetailList" :value="item" id="money" rule="R0000"></yhm-form-td-textbox>
          <yhm-form-td-textbox width="220" :no-edit="isBankDetail" :list="bankDetailList" listid="bankDetailList" :value="item" id="remark"></yhm-form-td-textbox>
          <yhm-form-td-delete width="40" :list="bankDetailList" :value="item" :del-click="true" @click="delbankDetailList(index,item)"></yhm-form-td-delete>
        </tr>
      </template>
      <template #empty>
        <span class="m_listNoData" v-show="bankDetailList.length===0">暂时没有数据</span>
      </template>
    </yhm-form-list-edit>
    <yhm-form-list-edit v-if="isProductShow">
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
        <yhm-commonbutton v-if="isOpenInvoice" :flicker="true" @call="noOpenInvoice()" value="暂不开票" icon="font delete" category="ten"></yhm-commonbutton>
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
        fontColor:'',//全局字体颜色
        personID:'',//申请人
        person:'',
        applyDate:'',//申请日期
        maxApplyDate:formatDate(new Date()),
        purchaser:'',//
        purchaserID:'',//购买方
        payerID:'',//付款方ID
        oldPurchaserID:'',//购买方
        oldPurchaser:'',//
        categoryList:[],//开票类型
        category:'',//开票类型

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

        isAdd:'',//是否是第一次请求
        isInit:false,//未付款   是隐藏  预计使用时间
        invoiceCategory:'',
        invoiceCategoryList:[],
        invoiceCategoryNoList:[],
        isCategory:false,
        isInvoiceCategory:true,//发票类型是否能选择
        isReceivables:'',
        isIsReceivables:false,
        isReceivablesList:[],
        purchaserType:'',
        purchaserTypeList:[],
        bankDetailList:[],
        bankDetailMoney:'',
        isBankDetailEmpty:true,
        isBankDetail:'1',
        isBankList:true,
        ownerID:'',
        ownerCategory:'0',//0是在当前模块
        workOrder:'',//工单
        isWordOrder:false,
        licensePlateNumber:'',
        directionList:[],
        invoiceHandleList:[],
        invoiceHandle:'',
        expressID:'',
        isExpressID:false,
        isProductShow:false,

        workOrderList:[],
        isWorkOrderEmpty:true,

        isPurchaser:false,
        isPurchaserType:false,
        isAddWordOrder:true,
        isInvoiceMoney:'0',
        oldInvoiceMoney:'',

        isOpenInvoice:false,
        forOpenInvoice:'',
        openInvoiceType:'1',
        openInvoiceTypeList: [
          {
            code: '#3711e8',
            num: '1',
            img: '',
            showName: '每个工单单独开票',
          },
          {
            code: '',
            num: '',
            img: '',
            showName: '所有工单合并开票',
          },
        ],
        isOpenInvoiceType:false,
        remarkRule:'',
        invoiceMoneyRule:'R3000',
        isWorkOrderMoney:'0',
        inviceUrl:'',//开红字发票的时候 正常发票的照片
        getUrl:'',
        tipShow:false,
        isInvliceUrl:false,
        isPurchaserTypeNoList:[],
        purchaserRule:'R0000',
        oldPurchaserType:'',
        isOpenInvoiceTypeNo:false,
        fileList:[],
        bankID:'',
        bank:'',
        account:'',
        isBankShow:true,
        taxNumber:'',
        taxNumberOld:'',
        invoiceList:[],
        isTaxNumberShow:true,

        addresseeID:'',
        addressee:'',
        addresseePhone:'',
        addresseeTel:'',
        mailTitleID:'',
        mailTitle:'',
        mailTitleAddress:'',
        isApprovalRise:'0',//0 发票抬头已审批    1发票抬头未审批完成
      }

    },
    methods:{
      recipientAddressClick(){
        this.$dialog.OpenWindow({
          width: 950,
          height: 603,
          url: '/selectDic?name=25' ,
          title: '选择省份地市区县',
          closeCallBack: (data) => {
            if (data) {
              this.mailTitleID=data.id
              this.mailTitle = data.showName
            }
          }
        })
      },
      delInvoiceList(index,item){
        if(this.invoiceList.length>1){
           this.invoiceList.splice(index,1)
         }else{
          this.$dialog.alert({
          alertImg: 'error',
          tipValue: '最少一条工单信息',
          closeCallBack:() => {
          }
          })
        }
      },
      addInsuranceInvoice(){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '692',
          title: '选择保险理赔',
          url: '/selectInsuranceInvoice?unitID=' + this.payerID,
          closeCallBack: (data) => {
            if(data){
              let a=true
              for (let i = 0; i < this.invoiceList.length; i++) {
                if(this.invoiceList[i].otherID === data.id){
                  a=false
                }
              }
              if(a){
                let insertDate = new Date(accAdd(new Date().getTime(), accMul(this.productDetails.length, 1000)))
                this.invoiceList.push({
                  id: guid(),
                  insertDate: formatTime(insertDate),
                  ownerID: this.id,
                  otherID:data.id,
                  monthsDate:data.monthsDate,
                  endDate:data.endDate,
                  sumMoney:data.money,
                  alreadyMoney:data.alreadyMoney,
                  useMoney:data.useMoney,
                  balance:data.money,
                  money:data.money,
                })
                let sum=0.00;
                for (let i = 0; i < this.invoiceList.length; i++) {
                  sum= accAdd(sum, this.invoiceList[i].money)
                }
                this.invoiceMoney=sum.toString();
                if(this.invoiceList.length>1){
                  this.isOpenInvoiceType=true
                }
              }else{
                this.$dialog.alert({
                  alertImg: 'error',
                  tipValue: '数据已存在',
                  closeCallBack:() => {

                  }
                })
              }
            }
          }
        })
      },
      selectEvent () { //开户行点击事件
        this.$dialog.OpenWindow({
          width: 950,
          height: 690,
          url: '/selectPublicAccount?categoryUnit=1&categoryUnitBefore=1&category=1&categoryInit=2' + '&unitID=' + this.purchaserID,
          title: '选择公司账号',
          closeCallBack: (data) => {
            if (data) {
              this.bankID = data.id
              this.bank=data.bank
              this.account = data.account
            }
          }
        })
      },
      lookImg(){
        if(this.inviceUrl){
          this.tipShow=true;
          this.getUrl='/UploadFile/Invoice/'+this.inviceUrl;
        }
      },
      imgClick(){
        if(this.tipShow){
          this.tipShow=false;
        }
      },
      changeMoney(item,index){
        if(parseFloat(item.balance)<parseFloat(item.money)){
          this.$dialog.alert({
            alertImg: 'error',
            tipValue: '输入金额有误',
            closeCallBack:() => {
              this.workOrderList[index].money=item.balance
            }
          })
        }else{
          let sum=0.00;
          for (let i = 0; i < this.workOrderList.length; i++) {
            sum=accAdd(sum, this.workOrderList[i].money)
          }
          this.invoiceMoney=sum.toString();
        }
      },
      changeInvoiceMoney(item,index){
        if(parseFloat(item.balance)<parseFloat(item.money)){
          this.$dialog.alert({
            alertImg: 'error',
            tipValue: '输入金额有误',
            closeCallBack:() => {
              this.invoiceList[index].money=item.balance
            }
          })
        }else{
          let sum=0.00;
          for (let i = 0; i < this.invoiceList.length; i++) {
            sum= accAdd(sum, this.invoiceList[i].money)
          }
          this.invoiceMoney=sum.toString();
        }
      },
      noOpenInvoice(){
        this.$dialog.setReturnValue('1') //向父级页面id值
        this.$dialog.close()
      },
      delWordOrder(index,item){
        if(this.workOrderList.length>1){
          let params = {
            id:this.ownerID,
            ownerID:item.ownerID
          }
          this.ajaxJson({
            url: '/Bill/delInsuranceWorkOrder',
            data: params,
            call: (data) => {
              if(data.type === 0){
                this.workOrderList.splice(index,1)
                this.isWorkOrderEmpty = this.workOrderList.length === 0
                if(this.workOrderList.length >1 ){
                  this.isOpenInvoiceType=true
                }else{
                  this.isOpenInvoiceType=false
                }
                let sum=0.00;
                for (let i = 0; i < this.workOrderList.length; i++) {
                  sum=accAdd(sum, this.workOrderList[i].money)
                }
                this.oldInvoiceMoney=sum.toString()
                this.invoiceMoney=sum.toString();
                this.$dialog.alert({
                  tipValue: data.message,
                  closeCallBack: () => {
                  }
                })
              }
              else{
                this.$dialog.alert({
                  alertImg: 'error',
                  tipValue: data.message,
                  closeCallBack:() => {
                  }
                })
              }
            }
          })
        }else{
          this.isOpenInvoiceType=false
          this.$dialog.alert({
            alertImg: 'error',
            tipValue: '最少一条工单信息',
            closeCallBack:() => {
            }
          })
        }
      },
      addWordOrder(ownerCategory){
        // let insertDate = new Date(accAdd(new Date().getTime(), accMul(this.productDetails.length, 1000)))
        // this.workOrderList.push({
        //   id: guid(),
        //   insertDate: formatTime(insertDate),
        //   ownerID: this.id,
        //   workOrderID:'',
        //   workOrder:'',
        //   licensePlateNumber:'',
        //   money:'',
        // })
        // if(this.workOrderList.length>0){
        //   this.isWorkOrderEmpty=false
        // }else{
        //   this.isWorkOrderEmpty=true
        // }
        if(ownerCategory === '1'){
          let url= ''
          if(this.ownerCategory!=='4'){
            if(this.purchaserType==='1'||this.purchaserType==='0'){
              url='/selectBankDetailInsurance?unitID=' + this.payerID
            }else{
              url='/selectBankDetailInsurance?licensePlateNumber=' + this.workOrderList[0].licensePlateNumber
            }
          }else{
            url='/selectWorkOrder'
          }
          this.$dialog.OpenWindow({
            width: '1050',
            height: '692',
            title: '选择工单信息',
            url: url,
            closeCallBack: (data) => {
              if(data){
                let insertDate = new Date(accAdd(new Date().getTime(), accMul(this.productDetails.length, 1000)))
                this.workOrderList.push({
                  id: guid(),
                  insertDate: formatTime(insertDate),
                  ownerID: data.id,
                  invoiceID:this.ownerID,
                  workOrderID:data.workOrderID,
                  workOrder:data.workOrder,
                  licensePlateNumber:data.licensePlateNumber,
                  balance:data.money,
                  money:data.money,
                })
                if(this.workOrderList.length>1){
                  this.isOpenInvoiceType=true
                }
                let sum=0.00;
                for (let i = 0; i < this.workOrderList.length; i++) {
                  sum=accAdd(sum, this.workOrderList[i].money)
                }
                this.oldInvoiceMoney=sum.toString()
                this.invoiceMoney=sum.toString();
                let params = {
                  id:this.ownerID,
                  workOrderList:this.workOrderList
                }
                this.ajaxJson({
                  url: '/Bill/insuranceWorkOrderListSave',
                  data: params,
                  call: (data) => {

                  }
                })
              }
            }
          })
        }else if(ownerCategory=='4'){
          this.$dialog.OpenWindow({
              width: '1050',
              height: '770',
              title: '选择离线工单',
              url: '/selectWorkOrder?paymentid='+this.purchaserID,
              closeCallBack: (data) => {
                console.log(data)
                if(data){
                  let insertDate = new Date(accAdd(new Date().getTime(), accMul(this.productDetails.length, 1000)))
                  this.workOrderList.push({
                    id: guid(),
                    insertDate: formatTime(insertDate),
                    ownerID: data.id,
                    invoiceID:this.ownerID,
                    workOrderID:data.id,
                    workOrder:data.otherCode,
                    licensePlateNumber:data.vehicle,
                    balance:data.finresult,
                    money:data.finresult,
                  })
                  if(this.workOrderList.length>1){
                    this.isOpenInvoiceType=true
                  }
                  let sum=0.00;
                  for (let i = 0; i < this.workOrderList.length; i++) {
                    sum=accAdd(sum, this.workOrderList[i].money)
                  }
                  this.oldInvoiceMoney=sum.toString()
                  this.invoiceMoney=sum.toString();
                  
                }
              }
          })
        }
      },
      invoiceHandleClick(){
        if(this.invoiceHandle === '0'){
          this.isExpressID=false
        }else{
          this.isExpressID=true
        }
      },
      /* 删除收支明细 */
      delbankDetailList(index,item){
        this.$dialog.alert({
          tipValue: '删除成功！！！',
          closeCallBack: ()=>{
            this.bankDetailList.splice(index,1)
            if(this.bankDetailList.length === 0){
              this.isBankDetailEmpty = true
            }

            this.money = parseFloat(this.money) - parseFloat(item.money)

          }
        })
      },
      selectBankDetail(){
        let sumMoney=0.00
         let jump='0'
        if(this.payerID){
          this.$dialog.OpenWindow({
            width: '1050',
            height: '692',
            title: '选择收支明细',
            url: '/selectBankDetail?direction=0&categoryBefore=1&selectType=1&type=2&otherID='+this.payerID,
            closeCallBack: (data)=>{
              if(data){
                for (let i = 0; i < data.length; i++) {
                  let insertDate = new Date(accAdd(new Date().getTime(), accMul(this.bankDetailList.length, 1000)))
                  this.bankDetailList.push({
                    id: guid(),
                    bankDetailID: data[i].id,
                    insertDate: formatTime(insertDate),
                    ownerID: this.id,
                    remark: data[i].remark,
                    subject: data[i].subject,
                    cccurDate: data[i].cccurDate,
                    direction: data[i].direction,
                    otherAccount: data[i].bankName + data[i].account + data[i].nature,
                    money: data[i].useMoney
                  })
                  sumMoney = parseFloat(sumMoney)+parseFloat(data[i].useMoney)
                  if(parseFloat(sumMoney)>parseFloat(this.money)){
                    this.bankDetailMoney=''
                    jump='0'
                    break;
                  }else if(parseFloat(sumMoney)==parseFloat(this.invoiceMoney)){
                    this.bankDetailMoney=sumMoney+''
                    jump='1'
                    break;
                   }else{
                    this.bankDetailMoney=sumMoney+''
                    jump='1'
                  }
                }
                if(jump === '1'){
                  this.$dialog.confirm({
                    width: 450,
                    tipValue: '确认所选收支明细,开票金额（<span style="color:red">'+this.invoiceMoney+'</span>）?',
                    btnValueOk: '确认',
                    alertImg: 'warn',
                    okCallBack: () => {
                      console.log(bankDetailList)
                    },
                    closeCallBack:()=>{
                       this.bankDetailList=[]
                    }
                  })
                }else{
                  this.$dialog.alert({
                    alertImg: 'warn',
                    tipValue: '所选收支明细金额小于等于开票金额，请重新选择'
                  })
                }
                if(this.bankDetailList.length>0){
                  this.isBankDetailEmpty=false
                }
              }
            }
          })
        }else{
          this.$dialog.alert({
            alertImg: 'warn',
            tipValue: '请选择购买方'
          })
        }
      },
      selectInvoiceCategory(){
        if(this.invoiceCategory==='1'){
          this.isBankShow=true
        }else{
          this.isBankShow=false
        }
      },
      selectCategory() {
        if (this.category === '0') {
          this.invoiceCategoryNoList=[]
          this.invoiceCategory='2'
          this.isInvoiceCategory=true
          this.isWordOrder=false
          this.isProductShow=false
        }else {
          this.invoiceCategoryNoList=['2']
          if(this.ownerCategory === '2'){
            this.isInvoiceCategory=true
          }else{
            this.isInvoiceCategory=false
          }
          this.invoiceCategory='0'
          this.isWordOrder=false
          if(this.category === '2'){
            this.isWordOrder=true
          }
          if(this.category === '1' || this.category === '6'){
            this.isProductShow=true
          }else{
            this.isProductShow=false
          }
          if(this.bankID == '' && this.bankID==null ){
            this.invoiceCategoryNoList=['1']
          }else{
            this.invoiceCategoryNoList=['2']
          }
        }
        this.selectInvoiceCategory()
        this.selectIsReceivables()
      },
      save(){
        let a = this.validator()
        let b = true
        let c = true
        let d = true
        let e = true
        if(this.category === '1'||this.category === '6'){
          b=this.productDetails.length > 0
          if(!b){
            this.$dialog.alert({
              tipValue: '商品明细必须添加',
              alertImg: 'error',
              closeCallBack:() => {
                this.addProduct()
              }
            })
          }
          c = parseFloat(this.sumMoney)===parseFloat(this.invoiceMoney)
          if(!c){
            this.$dialog.alert({
              alertImg: 'error',
              tipValue: '发票金额必须和商品总金额一致',
              closeCallBack:() => {
              }
            })
            return
          }
        }else if(this.category === '0'){
          c = parseFloat(this.bankDetailMoney) <= parseFloat(this.invoiceMoney)
          if(!c){
            this.$dialog.alert({
              alertImg: 'error',
              tipValue: '开票金额不能大于收款金额',
              closeCallBack:() => {
              }
            })
            return
          }
        }
        if(this.category === '2'){
          if(parseFloat(this.oldInvoiceMoney) < parseFloat(this.invoiceMoney)){
            d = false
            this.$dialog.alert({
              alertImg: 'error',
              tipValue: '发票金额必须小于工单金额',
              closeCallBack:() => {
              }
            })
            return
          }
          if(this.workOrderList.length==0){
            this.$dialog.alert({
              alertImg: 'error',
              tipValue: '请选择工单信息',
              closeCallBack:() => {
              }
            })
            return
          }
        }
        if(this.category === '7'&&this.ownerCategory === '3'){
          let sumMoney =0.00
          for (let i = 0; i < this.invoiceList.length; i++) {
            sumMoney=accAdd(sumMoney, this.invoiceList[i].money)
          }
          if(parseFloat(sumMoney)-parseFloat(this.invoiceMoney)!==0){
            e = false
            this.$dialog.alert({
              alertImg: 'error',
              tipValue: '发票金额必须小于对账单总金额',
              closeCallBack:() => {

              }
            })
          }
        }
        if(this.invoiceHandle === '1'){
          if((this.addresseeTel==''&& this.addresseePhone=='')||(this.addresseeTel==null&& this.addresseePhone==null)){
            e = false
            this.$dialog.alert({
              alertImg: 'error',
              tipValue: '电话和手机号选添一个',
              closeCallBack:() => {

              }
            })
          }
        }
        if((this.workOrderList.length>1||this.invoiceList.length>1) && a && b && c && d&& e &&!this.isOpenInvoiceTypeNo){
          let title = ''
          let flickerIndex = '0'
          if(this.openInvoiceType === '1'){
            title='确认多个工单，分别开票??'
          }else{
            title='确认多个工单，合并开票??'
            flickerIndex = '1'
          }
          this.$dialog.confirm({
            width: 300,
            tipValue:title,
            flickerIndex:flickerIndex,
            btnValueOk: '单独开票',
            btnValueCancel:'合并开票',
            alertImg: 'warn',
            okCallBack: () => {
              this.openInvoiceType = '1'
              this.saveAll(a,b,c,d)
            },
            cancelCallBack: () => {
              this.openInvoiceType = ''
              this.saveAll(a,b,c,d)
            }
          })
        }else if( a && b && c && d&& e){
          this.saveAll(a,b,c,d)
        }
      },
      saveAll(a,b,c,d){
        if(a&&b&&c&&d){
          let params = {
            id:this.id,
            ownerCategory:this.ownerCategory,
            ownerID:this.ownerID,//工单ID
            personID:this.personID,//申请人
            person:this.person,
            applyDate:this.applyDate,//申请日期
            purchaserType:this.purchaserType,//购买方类型
            purchaser:this.purchaser,//购买方
            purchaserID:this.purchaserID,//购买方
            payerID:this.payerID,//购买方
            category:this.category,//开票类型
            workOrder:this.workOrder,//工单ID
            licensePlateNumber:this.licensePlateNumber,//车牌号
            invoiceCategory:this.invoiceCategory,//发票类型
            isReceivables:this.isReceivables,
            invoiceMoney:this.invoiceMoney,//发票金额
            invoiceMoneyUp:this.invoiceMoneyUp,//金额大写
            remark:this.remark,//事由说明
            preUseDate:this.preUseDate,//预计使用日期
            moneyBackDate:this.moneyBackDate,//
            productDetails:this.productDetails,
            bankDetailList:this.bankDetailList,
            invoiceHandle:this.invoiceHandle,
            workOrderList:this.workOrderList,
            openInvoiceType:this.openInvoiceType,
            bankID:this.bankID,
            bank:this.bank,
            account:this.account,
            fileList:this.fileList,
            invoiceList:this.invoiceList,

            addresseeID:this.addresseeID,
            addressee:this.addressee,
            addresseePhone:this.addresseePhone,
            addresseeTel:this.addresseeTel,
            mailTitleID:this.mailTitleID,
            mailTitle:this.mailTitle,
            mailTitleAddress:this.mailTitleAddress,
            taxNumber:this.taxNumber,
            isApprovalRise:this.isApprovalRise
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
          url: '/selectProductModel?ownerID=' + item.productID,
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
      selectPurchaserType(){
        if(this.purchaserType==='1'&&this.invoiceCategory==='1'){
          this.invoiceCategory=0
        }
        let isTrue=false
        if(this.workOrderList.length>1){
          for (let i = 0; i < this.workOrderList.length; i++) {
            let numI=this.workOrderList[i].licensePlateNumber
            for (let j = 0; j < this.workOrderList.length; j++) {
              let numJ=this.workOrderList[j].licensePlateNumber
              if(i!==j){
                if(numI!==numJ){
                  isTrue=true
                }
              }
            }
          }
        }
        if(this.purchaserType === '2'){
          this.purchaserRule=''
        }
        if(this.oldPurchaserType!==this.purchaserType){
          this.purchaserID=''
          this.purchaser=''
        }
        if((this.purchaserType==='1'||this.purchaserType==='0')&&this.oldPurchaserType === '2'){
          this.purchaserID=this.oldPurchaserID
          this.purchaser=this.oldPurchaser
        }
        if(this.purchaserType === '2'&& this.ownerCategory === '1'&&isTrue){
          this.oldPurchaserType=this.purchaserType
          this.isOpenInvoiceTypeNo=true
          this.openInvoiceType='1'
        }else{
          this.oldPurchaserType=this.purchaserType
        }
        if(this.purchaserType !== '2'){
          this.oldPurchaserType=this.purchaserType
        }
        if(this.purchaserType!=='0'){
          this.isTaxNumberShow=false
        }else{
          this.isTaxNumberShow=true
          this.taxNumber=this.taxNumberOld
        }
      },
      selectIsReceivables(){
        if(this.category==='0'||this.category==='1'||this.category==='4'||this.category==='5'||this.category==='6'){
          if(this.isReceivables==="0"){
            this.isInit=false
            this.isBankList=true
            this.bankDetailList=[]
          }else{
            this.isInit=true
            this.isBankList=false
            this.bankDetailList=[]
          }
        }else{
          this.isBankList=false
          this.bankDetailList=[]
        }
      },
      selectPerson(){
        this.$dialog.OpenWindow({
          width: '950',
          height: '700',
          url: '/selectPerson?category=1',
          title: '选择收件人',
          closeCallBack: (data) => {
            if (data) {
              this.addressee=data.name
              this.addresseeID=data.id
              this.addresseePhone=data.phone
            }
          }
        })
      },
      selectPurchaser(){
        // if(this.purchaserID===''){
          let url=''
          let width='950'
          if(this.purchaserType==='0'){
            url='/selectTax'
            width='1250'
          }else{
            url='/selectPerson?category=1'
          }
          this.$dialog.OpenWindow({
            width: width,
            height: '700',
            url: url,
            title: '选择购买方',
            closeCallBack: (data) => {
              if (data) {
                if(this.purchaserType==='0'){
                  this.purchaser=data.unit
                  this.purchaserID=data.unitID
                  this.taxNumber=data.taxNumber
                  if(this.payerID==''||this.payerID==null){
                    this.payerID=data.unitID
                  }
                  this.bankID=data.accountID
                  this.bank=data.bank
                  this.account=data.account
                  if(data.category=='1'){
                    if(this.category == '0'){
                      this.invoiceCategoryNoList=['1']
                    }else{
                      this.invoiceCategoryNoList=['1','2']
                    }
                  }else{
                    if(this.category == '0'){
                      this.invoiceCategoryNoList=[]
                    }else{
                      this.invoiceCategoryNoList=['2']
                    }
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
                          if(this.payerID==''||this.payerID==null){
                            this.payerID=data.unitID
                          }
                        }
                      }
                    })
                  }else{
                    this.purchaser=data.name
                    this.purchaserID=data.id
                    if(this.payerID==''||this.payerID==null){
                      this.payerID=data.unitID
                    }
                  }
                }
              }
            }
          })
        // }else{
        //   if(this.purchaserType==='0'){
        //     this.selectOpenInvoiceRise()
        //   }else if(this.purchaserType==='1'){
        //     this.purchaserID=''
        //     this.purchaser=''
        //     this.selectPurchaser()
        //   }
        // }
      },
      selectOpenInvoiceRise(){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '690',
          url:'/selectInvoiceRise?unitID='+this.payerID,
          title:'选择发票抬头',
          closeCallBack:(data) =>{
            if (data) {
              this.purchaser=data.otherUnit
              this.purchaserID=data.otherUnitID
              this.account=data.otherAccount
              this.bank=data.otherBank
              this.bankID=data.otherAccountID
              this.taxNumberOld=data.otherTaxNumber
              this.taxNumber=data.otherTaxNumber
              if(data.isFinish=='0'){
                this.isApprovalRise='1'
              }
              if(data.invoiceType=='1'){
                if(this.category == '0'){
                  this.invoiceCategoryNoList=['1']
                }else{
                  this.invoiceCategoryNoList=['1','2']
                }
              }else{
                if(this.category == '0'){
                  this.invoiceCategoryNoList=[]
                }else{
                  this.invoiceCategoryNoList=['2']
                }
              }
            }
          }
        })
      },
      initData(){
        let params = {

        }
        if(this.ownerCategory!==''){
          if(this.ownerCategory==='4'){
            params={
              ownerID:this.ownerID,
              ownerCategory:this.ownerCategory,
              purchaserType:this.purchaserType,
              purchaserID:this.purchaserID
            }
          }else{
            params={
              ownerID:this.ownerID,
              ownerCategory:this.ownerCategory
            }
          }
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
            this.directionList=data.directionPsd.list
            this.category=data.categoryPsd.value
            this.categoryList=data.categoryPsd.list
            this.invoiceHandle=data.invoiceHandlePsd.value
            this.invoiceHandleList=data.invoiceHandlePsd.list
            this.oldPurchaserID=data.purchaserID
            this.oldPurchaser=data.purchaser
            this.oldPurchaserType=this.purchaserType
            this.taxNumber=data.taxNumber
            this.taxNumberOld=data.taxNumber
            this.bank=data.bank
            this.bankID=data.bankID
            this.account=data.account
            this.selectIsReceivables()
            this.selectCategory()
            if(this.ownerCategory===null||this.ownerCategory===''){
              this.ownerCategory=data.ownerCategory
            }
            if(this.ownerCategory === '1'){
              this.purchaserID=data.purchaserID
              this.payerID=data.purchaserID

              this.purchaser=data.purchaser
              this.invoiceMoney=data.invoiceMoney
              if(this.purchaserType === '0'){
                this.isPurchaser=true
                this.isPurchaserTypeNoList=['1']
              }
              this.isIsReceivables=true
              this.workOrderList=data.workOrderList
              this.isAddWordOrder=true
              this.oldInvoiceMoney=data.invoiceMoney
              this.isInvoiceMoney='1'
              if(data.workOrderList.length>0){
                this.isWorkOrderEmpty = this.workOrderList.length === 0
              }
              if(data.workOrderList.length>1){
                this.isOpenInvoiceType=true
              }
              if(this.purchaserType!=='0'){
                this.isTaxNumberShow=false
              }else{
                this.isTaxNumberShow=true
              }
            }else if(this.ownerCategory === '2'){
              this.openInvoiceType=''
              this.purchaserID=data.purchaserID
              this.purchaser=data.purchaser
              this.payerID=data.payerID
              this.invoiceMoney=data.invoiceMoney
              this.workOrderList=data.workOrderList
              this.isAddWordOrder=false
              this.isPurchaser=true
              this.isPurchaserType=true
              this.isIsReceivables=true
              this.isCategory=true
              this.isInvoiceCategory=false
              this.remarkRule='R0000'
              this.invoiceMoneyRule='R2200'
              this.isWorkOrderMoney='1'
              this.isInvoiceMoney='1'
              if(data.workOrderList.length>0){
                this.isWorkOrderEmpty = this.workOrderList.length === 0
                let ids = []
                for(let q in this.workOrderList){
                  ids.push(this.workOrderList[q].workOrderID)
                }
                ids = ids.join(',')
                this.ajaxJson({
                  url: '/fix/fixOrder/queryByidList',
                  data: {
                    ids:ids
                  },
                  call: (dt) => {
                    for(let i in this.workOrderList){
                      for(let j in dt){
                        if(this.workOrderList[i].workOrderID==dt[j].id){
                          this.workOrderList[i].workOrder=dt[i].code
                        }
                      }
                    }
                  }
                })
              }
              this.productDetails=data.productDetails
              if(data.productDetails.length>0){
                this.empty = this.productDetails.length === 0
              }
              if(this.purchaserType === '0'){
                this.isPurchaser=true
                this.isPurchaserTypeNoList=['1']
              }else if(this.purchaserType === '2'){
                this.isTaxNumberShow=false
              }
              this.inviceUrl=data.inviceUrl
              this.isInvliceUrl=true
              this.fontColor='#f00'
            }else if(this.ownerCategory === '3'){
              this.id=data.id
              this.invoiceList=data.invoiceList
              this.invoiceCategory=data.invoiceCategoryPsd.value
              this.purchaser=data.purchaser
              this.purchaserID=data.purchaserID
              this.payerID=data.purchaserID
              this.invoiceMoney=data.invoiceMoney
              this.isIsReceivables=true
              this.isPurchaserType=true
              this.isCategory=true
              this.isInvoiceCategory=true
              this.isInvoiceMoney='1'
              this.isBankShow=true
              this.bankID=data.bankID
              this.bank=data.bank
              this.account=data.account
            }else if(this.ownerCategory === '4'||(this.ownerCategory=='2'&&this.category=='2')){
              this.purchaser=data.purchaser
              this.invoiceMoney=data.invoiceMoney
              this.isIsReceivables=true
              if(this.purchaserType === '0'){
                this.isPurchaser=true
                this.isPurchaserTypeNoList=['1','2']
              }
              let list=[]
              for (let i = 0; i <data.workOrderList.length ; i++) {
                list.push(data.workOrderList[i].ownerID)
              }
              this.ajaxJson({
                url: '/fix/Offer/getManagerByidList',
                data: {
                  ids:list
                },
                call: (workOrderData) => {
                  if(workOrderData){
                    this.workOrderList=[]
                    for (let j = 0; j <data.workOrderList.length ; j++) {
                      let money=data.workOrderList[j].money
                      for (let i = 0; i < workOrderData.length; i++) {
                        let insertDate = new Date(accAdd(new Date().getTime(), accMul(this.productDetails.length, 1000)))
                        if(data.workOrderList[j].ownerID===workOrderData[i].id){
                          this.workOrderList.push({
                            id: guid(),
                            insertDate: formatTime(insertDate),
                            ownerID: workOrderData[i].id,
                            invoiceID:this.ownerID,
                            workOrderID:workOrderData[i].otherCode,
                            workOrder:'',
                            licensePlateNumber:workOrderData[i].vehicle,
                            balance:accAdd(workOrderData[i].finresult,money),
                            money:money,
                          })
                        }
                      }
                    }
                    if(this.workOrderList.length>1){
                      this.isOpenInvoiceType=true
                    }
                    let sum=0.00;
                    for (let i = 0; i < this.workOrderList.length; i++) {
                      sum=accAdd(sum, this.workOrderList[i].money)
                    }
                    this.isWorkOrderEmpty = this.workOrderList.length === 0
                    this.oldInvoiceMoney=sum.toString()
                    this.invoiceMoney=sum.toString();
                  }
                }
              })
            }else{
              this.payerID=data.purchaserID
              this.purchaserID=data.purchaserID
              this.taxNumber=''
              this.taxNumberOld=''
            }
            if(this.isReceivables==='1'){
              this.isInit=true
            }
            if(this.purchaserID!=''&&this.purchaserID!=null&&this.purchaserType=='0'){
              let params={
                unitID:this.purchaserID
              }
              this.ajaxJson({
                url: '/finance/tax/getUnitTax',
                data: params,
                call: (tax) => {
                  if(tax){
                    if(this.category != '0'){
                      if(tax.category != '0'){
                        this.invoiceCategoryNoList=['1','2']
                      }else{
                        this.invoiceCategoryNoList=['2']
                      }
                    }else{
                      if(tax.category != '0'){
                        this.invoiceCategoryNoList=['2']
                      }
                    }
                    this.taxNumber=tax.taxNumber
                    this.bankID=tax.accountID
                    this.bank=tax.bank
                    this.account=tax.bankID
                  }else{
                    this.$dialog.alert({
                      tipValue: "请先添加公司税号",
                      alertImg: 'error',
                      closeCallBack: () => {

                      }
                    })
                  }
                }
              })
            }
          },
          add: (data)=>{

          },
          look: (data)=>{
            this.ownerID=data.ownerID
            this.personID=data.personID
            this.person=data.person
            this.applyDate=data.applyDate
            this.purchaserID=data.purchaserID
            this.payerID=data.payerID
            this.purchaser=data.purchaser
            this.subjectID=data.subjectID
            this.taxNumber=data.taxNumber
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
            this.bankDetailList=data.bankDetailList
            if(this.bankDetailList.length>0){
              this.isBankDetailEmpty=false
            }
            if(this.ownerCategory === '3'){
              this.id=data.id
              this.invoiceList=data.invoiceList
              this.invoiceCategory=data.invoiceCategoryPsd.value
              this.purchaser=data.purchaser
              this.purchaserID=data.purchaserID
              this.invoiceMoney=data.invoiceMoney
              this.isIsReceivables=true
              this.isPurchaserType=true
              this.isCategory=true
              this.isInvoiceCategory=true
              this.isInvoiceMoney='1'
              this.isBankShow=true
              this.bankID=data.bankID
              this.bank=data.bank
              this.account=data.account
            }
            this.addresseeID=data.addresseeID
            this.addressee=data.addressee
            this.addresseePhone=data.addresseePhone
            this.addresseeTel=data.addresseeTel
            this.mailTitleID=data.mailTitleID
            this.mailTitle=data.mailTitle
            this.mailTitleAddress=data.mailTitleAddress
            this.isApprovalRise=data.isApprovalRise
            this.invoiceList=data.invoiceList
            this.workOrderList=data.workOrderList
            this.bankID=data.bankID
            this.bank=data.bank
            this.account=data.account
            this.fileList=data.files
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
      this.setQuery2Value('ownerID')
      this.setQuery2Value('ownerCategory')
      this.setQuery2Value('purchaserType')
      this.setQuery2Value('purchaserID')
      if(this.ownerCategory==='1'||this.ownerCategory==='4'){
        this.setQuery2Value('id')
        this.id=this.ownerID
      }else if(this.ownerCategory==='3'){
        this.openInvoiceType=''
      }
      this.setQuery2Value('forOpenInvoice')
      if(this.forOpenInvoice === '1'){
        this.isOpenInvoice=true
      }
      this.initData()
    }
  }
</script>

<style scoped>
  .showImg{
    width: 900px;
    height: 600px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    overflow: hidden;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: start;
    -ms-flex-align: start;
    align-items: center;
    background-color: #FFFFFF;
    position: fixed !important;
    z-index: 999999;
    -webkit-box-shadow: 0 0 20px #000000;
    box-shadow: 0 0 20px #000000;
    border-radius: 10px;
    top: 0;
    right: 0;
    left: 40px;
    bottom: 0;
    margin: auto;
  }
</style>
