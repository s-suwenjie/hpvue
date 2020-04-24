  <template>
  <div class="f_main">
    <yhm-formbody>
      <template #title>基本信息</template>
      <template #control>
        <yhm-form-text title="事件描述" :value="name" id="name" rule="R0000" tip="value"></yhm-form-text>
        <yhm-form-radio title="品牌" submitvalue="brandObject" :ownerID="id" :select-list="brandList" :value="brand" id="brand" rule="#"></yhm-form-radio>
        <yhm-form-drop-down-select title="事件类型" width="1" @select="selectCause" :select-list="categoryList" :selectValue="category" selectid="category" :value="cause" id="cause" rule="R0000"></yhm-form-drop-down-select>
        <yhm-form-date title="最迟" @call="initCode" subtitle="付款日期" :min="nowDate" :value="lastDate" id="lastDate" position="r" rule="R0000"></yhm-form-date>
        <yhm-form-text title="付款金额" tip="money" before-icon="rmb" :value="money" id="money" rule="R3000"></yhm-form-text>
        <yhm-form-text title="编号" :value="code" id="code" rule="R0000" no-edit="1"></yhm-form-text>
        <yhm-form-radio title="生成申请" :select-list="isAutoList" :value="isAuto" id="isAuto"></yhm-form-radio>

        <yhm-formupload :ownerID="id" :value="fileList" id="fileList" title="支持单据" tag="paymentPlan" multiple="multiple"></yhm-formupload>

        <yhm-form-list-edit v-if="false">
          <template #title>发票明细</template>
          <template #operate>
            <yhm-commonbutton value="选择电子发票" icon="btnAdd" @call="selectInvoiceOperate"></yhm-commonbutton>
            <yhm-commonbutton value="添加发票" icon="btnAdd" @call="addInvoice"></yhm-commonbutton>
          </template>
          <template #listHead>
            <yhm-managerth style="width: 40px" title="查看"></yhm-managerth>
            <yhm-managerth style="width: 130px" title="发票号码"></yhm-managerth>
            <yhm-managerth style="width: 140px" title="开票日期"></yhm-managerth>
            <yhm-managerth style="width: 160px" title="类型"></yhm-managerth>
            <yhm-managerth style="width: 50px" title="张数"></yhm-managerth>
            <yhm-managerth style="width: 90px" title="票面金额"></yhm-managerth>
<!--            <yhm-managerth style="width: 90px" title="实报金额"></yhm-managerth>-->
            <yhm-managerth style="width: 220px" title="备注"></yhm-managerth>
            <yhm-managerth style="width: 90px" title="发票照片"></yhm-managerth>
            <yhm-managerth style="width: 40px" title="操作"></yhm-managerth>
          </template>
          <template #listBody>
            <tr v-for="(item,index) in invoiceDetails" :key="index" :class="{InterlacBg:index%2!==0}">
              <yhm-manager-td-look :no-click="isElLook" @click="listView(item)"></yhm-manager-td-look>
              <yhm-form-td-textbox width="130" @change="verificationRepeatInvoice(item)" :no-edit="getIsElectronicInvoice" :list="invoiceDetails" listid="invoiceDetails" :value="item" id="code" rule="R0000"></yhm-form-td-textbox>
              <yhm-form-td-date width="140" :no-edit="getIsElectronicInvoice" :min="workDate" :max="maxWorkDate" position="u" :list="invoiceDetails" listid="invoiceDetails" :value="item" id="workDate" rule="R0000"></yhm-form-td-date>

              <yhm-form-td-radio width="160" :no-edit="isElectronicInvoice" @call="switchInvoiceCategory" :list="invoiceDetails" listid="invoiceDetails" :value="item" :select-list="listCategoryList" id="category"></yhm-form-td-radio>

              <yhm-form-td-textbox width="50" @change="verificationRepeatInvoice(item)" @input="invoicesQuantityInputEvent" :no-edit="getIsElectronicInvoice || item.category === '0' ? '1':''" :list="invoiceDetails" listid="invoiceDetails" :value="item" id="quantity" rule="R1000"></yhm-form-td-textbox>
              <yhm-form-td-textbox width="90" :no-edit="getIsElectronicInvoice" @input="invoicesMoneyInputEvent()" @blur="calcMoney(item)" before-icon="rmb" :list="invoiceDetails" listid="invoiceDetails" :value="item" id="money" rule="R3000"></yhm-form-td-textbox>
<!--              <yhm-form-td-textbox width="90" @input="actualMoneyEvent()" @blur="calcActualMoney(item)" before-icon="rmb" :list="invoiceDetails" listid="invoiceDetails" :value="item" id="actualMoney" rule="R3000"></yhm-form-td-textbox>-->
              <yhm-form-td-textbox width="220" :no-edit="getIsElectronicInvoice" :list="invoiceDetails" listid="invoiceDetails" :value="item" id="remark"></yhm-form-td-textbox>
              <yhm-form-td-upload-image width="90" :no-upload="isElectronicInvoice" tag="Invoice" @mouseover="invoiceImg(item)" @mouseout="invoiceImgHide(item)" :list="invoiceDetails" listid="invoiceDetails" :value="item" id="url" rule="#"></yhm-form-td-upload-image>
              <yhm-form-td-delete width="40" :must=1 :list="invoiceDetails" :value="item" :del-click="true" @click="delInvoice(index,item)"></yhm-form-td-delete>
            </tr>
          </template>
          <template #empty>
            <span class="m_listNoData" v-show="empty">暂时没有数据</span>
          </template>
        </yhm-form-list-edit>

      </template>


    </yhm-formbody>

    <div class="invoiceImgView" v-show="viewImgShow">
      <img :src="viewImg" alt="">
    </div>
    <div v-html="approvalHtml"></div>

    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn v-if="isBtn">
        <yhm-commonbutton value="保存" icon="btnSave" :flicker="true" @call="save()" category="one"></yhm-commonbutton>
        <yhm-commonbutton value="保存并新增" v-show="isLook" class="btnAddSave" icon="btnAddSave" @call="btnAddSave()" category="one"></yhm-commonbutton>
      </template>
    </yhm-formoperate>
  </div>
</template>

<script>
import { accMul, accAdd, guid, formatDate, formatTime } from '@/assets/common.js'
import { formmixin } from '@/assets/form.js'
export default {
  name: 'paymentEventForm',
  mixins: [formmixin],
  data () {
    return {
      otherUnitID: '',                //添加时有地址栏获取
      otherAccountID: '',             //添加时有地址栏获取
      ownerID: '',                    //添加时有地址栏获取
      personOrUnit: '',               //添加时有地址栏获取
      name: '',                       //事件描述
      brand: '',                      //品牌
      brandList: [],                  //品牌明细
      category: '',                   //事件类型,
      categoryList: [],               //事件类型明细
      causeID: '',                    //事由ID(事件)
      cause: '',                      //事由文字(事件)
      nowDate: formatDate(new Date()),//当前日期
      lastDate: '',                   //最迟付款日期
      money: '',                      //付款金额
      code: '',                       //编号
      isAuto: '0',                    //生成申请
      isAutoList: [],                 //生成申请的选项明细
      unitID: '',                     //操作人所属单位，可能用于确定审批流程


      useNum: '0', // 用途代码
      subjectCode: '', // 编号
      useNumList: [],
      causeNum: '',
      fileList: [],
      state: '0',
      isFinish: '0',
      approvalHtml: '',

      otherUnit: '',
      isLook: true,
      isBtn: true,

      invoiceDetails: [],
      isElLook: true,
      workDate: '',
      maxWorkDate: formatDate(new Date()), //当前日期
      isElectronicInvoice: false,
      listCategoryList: [],       //发票明细列表中类型,
      viewImg: '',
      viewImgShow: false,
      invoiceList: [],
      empty: true
    }
  },
  created () {
    this.setQuery2Value('ownerID')
    this.setQuery2Value('otherUnitID')
    this.setQuery2Value('personOrUnit')
    this.setQuery2Value('otherAccountID')
    this.init({
      url: '/PersonOffice/initPaymentPlanDetailForm',
      all: (data) => {
        /* 公共 无论查看和添加返回数据 */
        this.categoryList = data.categoryPsd.list
        this.category = data.categoryPsd.value
        this.brandList = data.brandPsd.list
        this.brand = data.brandPsd.value
        this.isAutoList = data.isAutoPsd.list
        this.isAuto = data.isAutoPsd.value
        this.useNumList = data.useNumPsd.list
        this.useNum = data.useNumPsd.value
        this.listCategoryList = data.listCategoryPsd.list
      },
      add: (data) => {
        /* 需要添加的数据 */
      },
      look: (data) => {
        /* 需要查看的数据 */
        this.brand = data.brandPsd.value
        this.name = data.name
        this.lastDate = data.lastDate
        this.code = data.code
        this.cause = data.cause
        this.causeID = data.causeID
        this.money = data.money
        this.state = data.state
        this.isFinish = data.isFinish
        this.unitID = data.unitID
        this.otherUnitID = data.otherUnitID
        this.ownerID = data.ownerID
        this.fileList = data.files
        this.approvalHtml = data.approvalHtml
        this.isLook = false
        this.isBtn = data.state === '0'
      }
    })
  },
  methods: {
    /*初始化编号*/
    initCode () {
      if (this.lastDate !== '' && this.causeID !== '') {
        let params = {
          otherUnitID: this.otherUnitID,
          causeID: this.causeID,
          lastDate: this.lastDate,
          id: this.id
        }
        this.ajaxJson({
          url: '/PersonOffice/initPaymentPlanDetailCode',
          data: params,
          loading: '0',
          call: (data) => {
            if (data.type === 0) {
              this.code = data.message
              this.unitID = data.html
            } else {

            }
          }
        })
      }
    },


    /* 计算实报金额 */
    calcActualMoney(item){
      let regMoney = parseFloat(item.money)
      let regActualMoney = parseFloat(item.actualMoney)

      if(regMoney && regActualMoney){

        if(regActualMoney > regMoney){
          this.$dialog.alert({
            width: '300',
            alertImg: 'warn',
            tipValue: '实报金额必须小于票面金额',
            closeCallBack: ()=>{
              item.actualMoney = ''
            }
          })
        }
      }
    },
    calculationActualMoneyEvent(){
      let money = 0
      let quantity = 0
      for(let i in this.invoiceDetails){
        let item = this.invoiceDetails[i]
        let temp = item.actualMoney
        if(isNaN(temp) || temp === ''){
          temp = 0
        }
        let count = item.quantity
        if(isNaN(count) || count === ''){
          count = 1
        }

        quantity = accAdd(quantity,count)
        temp = accMul(temp,count)
        money = accAdd(money,temp)
      }
      this.actualMoney = money + ''

    },
    /* 计算实际金额 */
    actualMoneyEvent(){
      this.calculationActualMoneyEvent()
    },
    //显示发票图片
    invoiceImg(item){
      if(item.url !== '') {
        if(item.isPdf === '0'){
          this.viewImg = '/UploadFile/Invoice/' + item.url
        }
        else{
          this.viewImg = '/UploadFile/electronicInvoice/' + item.url
        }
        this.viewImgShow = true
      }
    },
    //隐藏发票图片
    invoiceImgHide(item){
      if(item.url !== '') {
        this.viewImgShow = false
      }
    },
    //删除发票
    delInvoice(index,item){
      this.$dialog.alert({
        tipValue: '删除成功！！！',
        closeCallBack: ()=>{
          this.invoiceDetails.splice(index, 1)
          if(this.invoiceDetails.length === 0){
            this.isElectronicInvoice = false
            this.maxWorkDate = formatDate(new Date())
            this.invoiceMoney = ''
            this.invoiceCount = '1'
            this.addInvoice()
          }
        }
      })
    },
    /* 查看电子发票 */
    listView(item){
      this.$dialog.OpenWindow({
        width: 1050,
        height: 740,
        url: '/myElectronicInvoiceForm?id=' + item.invoiceID,
        title: '查看电子发票',
        closeCallBack: (data) => {

        }
      })
    },
    //发票数量input事件
    invoicesQuantityInputEvent(){
      this.calculationInvoiceMoney()
    },
    //发票明细中的发票类型（单张还是连号首张）
    switchInvoiceCategory(item){
      if(item.category === '0') {
        //单张情况
        item.quantity = "1"
      }
      else{
        //连号首张
        item.quantity = ""
      }
      this.calculationInvoiceMoney()
      this.verificationRepeatInvoice(item)
    },
    //添加发票
    addInvoice(){
      let insertDate = new Date(accAdd(new Date().getTime(), accMul(this.invoiceDetails.length, 1000)))
      this.invoiceDetails.push({
        id: guid(),
        insertDate: formatTime(insertDate),
        ownerID: this.id,
        code: '',
        workDate: '',
        category: '0',
        quantity: '1',
        money:'',
        remark: '',
        url: '',
        pdfUrl: '',
        isPdf: '0',
        invoiceID: '',
        actualMoney: ''
      })
    },

    //选择电子发票操作
    selectInvoiceOperate(){

      this.$dialog.OpenWindow({
        url:'/selectElectronicInvoice?state=0&relevanceID=' + this.id + "&relevanceType=1",
        width: "1000",
        height: "650",
        title: '选择电子发票',
        closeCallBack: (data)=>{
          if(data) {
            let isInvoiceID=true
            for(let i=0;i<this.invoiceDetails.length;i++){
              let invoiceID=this.invoiceDetails[i].invoiceID
              if(data.id===invoiceID){
                isInvoiceID=false
              }
            }
            if(isInvoiceID){
              if(!this.invoiceDetails[0].invoiceID){
                let insertDate = new Date(accAdd(new Date().getTime(), accMul(this.invoiceDetails.length, 1000)))
                for (let i in this.invoiceDetails) {
                  this.invoiceDetails[i].id = guid()
                  this.invoiceDetails[i].insertDate = formatTime(insertDate)
                  this.invoiceDetails[i].ownerID = this.id
                  this.invoiceDetails[i].code = data.num
                  this.invoiceDetails[i].workDate = data.openDate
                  this.invoiceDetails[i].category = '0'
                  this.invoiceDetails[i].quantity = '1'
                  this.invoiceDetails[i].money = data.totalMoney
                  this.invoiceDetails[i].remark = data.remark
                  this.invoiceDetails[i].url = data.imgUrl
                  this.invoiceDetails[i].pdfUrl = data.pdfUrl
                  this.invoiceDetails[i].isPdf = '1'
                  this.invoiceDetails[i].invoiceID = data.id
                }
              }else{
                let insertDate = new Date(accAdd(new Date().getTime(), accMul(this.invoiceDetails.length, 1000)))
                this.invoiceDetails.push({
                  id: guid(),
                  insertDate: formatTime(insertDate),
                  ownerID: this.id,
                  code: data.num,
                  workDate: data.openDate,
                  category: '0',
                  quantity: '1',
                  money: data.totalMoney,
                  remark: data.remark,
                  url: data.imgUrl,
                  pdfUrl: data.pdfUrl,
                  isPdf: '1',
                  invoiceID: data.id
                })
              }
              this.isElLook = false
              this.isElectronicInvoice = '1'
              this.isElectronicInvoice = true
              // this.maxWorkDate = data.openDate
              this.invoiceMoney = data.totalMoney
              this.invoiceCount = '1'
              this.calculationInvoiceMoney()
            }
          }
        }
      })
    },

    btnAddSave(){
      if (this.validator()) {
        let params = {
          id: this.id,
          ownerID: this.ownerID,
          otherUnitID: this.otherUnitID,
          otherAccountID: this.otherAccountID,
          money: this.money,
          code: this.code,
          name: this.name,
          branch: this.brand,
          lastDate: this.lastDate,
          cause: this.cause,
          causeID: this.causeID,
          useNum: this.useNum,
          category: this.category,
          isAuto: this.isAuto,
          files: this.fileList,
          state: this.state,
          isFinish: this.isFinish,
          unitID: this.unitID,
          personOrUnit: this.personOrUnit,
          // invoiceList: this.invoiceDetails
        }
        this.ajaxJson({
          url: '/PersonOffice/savePaymentPlanDetail',
          data: params,
          call: (data) => {
            if (data.type === 0) {
              this.$dialog.setReturnValue(this.ownerID)
              this.$dialog.alert({
                tipValue: data.message,
                closeCallBack: () => {
                  this.$dialog.refresh()
                }
              })
            }else {
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
    save () {
      if (this.validator()) {
        let params = {
          id: this.id,
          ownerID: this.ownerID,
          otherUnitID: this.otherUnitID,
          otherAccountID: this.otherAccountID,
          money: this.money,
          code: this.code,
          name: this.name,
          branch: this.brand,
          lastDate: this.lastDate,
          cause: this.cause,
          causeID: this.causeID,
          useNum: this.useNum,
          category: this.category,
          isAuto: this.isAuto,
          files: this.fileList,
          state: this.state,
          isFinish: this.isFinish,
          unitID: this.unitID,
          personOrUnit: this.personOrUnit,
          // invoiceList: this.invoiceDetails
        }
        this.ajaxJson({
          url: '/PersonOffice/savePaymentPlanDetail',
          data: params,
          call: (data) => {
            if (data.type === 0) {
              this.$dialog.setReturnValue(this.ownerID)
              this.$dialog.alert({
                tipValue: data.message,
                closeCallBack: () => {
                  this.$dialog.close()
                }
              })
            }else{
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
    resetCause(op,catetory){
      if(op === 'i'){
        this.category = catetory === '0'?'1':'0'
      }
    },
    selectCause (op) {
      var name = '65'
      if (this.category === '1') {
        name = '63'
      }else if(this.category === '3'){
        name = '93'
      }
      this.$dialog.OpenWindow({
        width: 950,
        height: 604,
        url: '/selectDic?name=' + name,
        title: '选择事由',
        closeCallBack: (data) => {
          let dicName
          if (data) {
            this.causeID = data.id
            if (data.showName) {
              dicName = data.value2 + ' ------ ' + data.value1 + ' ------ ' + data.showName
            }
            if (!data.value1) {
              dicName = data.value2 + ' ------ ' + data.showName
            }
            if (!data.value2) {
              dicName = data.value1 + ' ------ ' + data.showName
            }
            this.subjectCode = data.value11
            this.initCode()
            this.cause = dicName
          }
          else{
            //说明没有选中需要重置类型
            this.resetCause(op,this.category)
          }
        }
      })
    }
  },
  watch:{
    // invoiceDetails(){
    //   if(this.invoiceDetails.length !== 0){
    //     this.empty = false
    //   }
    // }
  },
  computed:{

    getIsElectronicInvoice(){
      return this.isElectronicInvoice ? '1':''
    },
  }
}
</script>

<style scoped lang="less">
  .listEditEmpty{

  }
  @import "../../../static/bjFlow.css";
  .btnAddSave{
    border: 1px solid #bfbfbf;
    color: #333;
    background-color: #fff;
  }
  .btnAddSave:hover{
    color: #fff;
    background-color: #49a9ea;
    border: 1px solid #49a9ea;
  }
</style>
