 <template>
  <div class="f_main">
    <yhm-formbody>
      <template #title>基本信息</template>
      <template #control>
        <yhm-form-date title="申请日期" :value="workDate" id="workDate" position="b" :no-edit=true rule="R0000"></yhm-form-date>
<!--        <yhm-form-text title="申请日期" :value="workDate" width="1" id="workDate" rule="R0000" no-edit="1"></yhm-form-text>-->
        <yhm-form-select title="事由" tip="subject" :value="subject" id="subject" rule="R0000"></yhm-form-select>
<!--        <yhm-form-date title="费用" subtitle="开始日期" :value="startDate" id="startDate" position="b"></yhm-form-date>-->
<!--        <yhm-form-date title="结束日期" :value="endDate" id="endDate" position="b"></yhm-form-date>-->

        <yhm-form-date-interval title="费用" subtitle="所属期间" :start="startDate" start-id="startDate" :end="endDate" end-id="endDate"></yhm-form-date-interval>

        <yhm-form-text title="实际金额" tip="actualMoney" before-icon="rmb" :value="actualMoney" id="actualMoney" rule="R3000"></yhm-form-text>
        <yhm-form-radio title="发票类型" width="1" :select-list="invoiceTypePsdList" :value="invoiceCategory" id="invoiceCategory"></yhm-form-radio>

        <yhm-form-zh-text-two before-placeholder="请输入发票金额" after-placeholder="请输入张数" :no-edit="isPdf === '1'" :show="noInvoice" tip-before="money" tip-after="value" :before="invoiceMoney" before-id="invoiceMoney" :after="invoiceCount" after-id="invoiceCount" title="发票金额" before-icon="rmb" after-title="发票张数" before-rule="R3000" after-rule="R1000"></yhm-form-zh-text-two>

<!--        <yhm-form-text title="发票张数" v-if="noInvoice" :value="invoiceCount" id="invoiceCount" rule="R0000"></yhm-form-text>-->
<!--        <yhm-form-text title="发票金额" :no-edit="isPdf === '1'?'1':'0'" v-if="noInvoice" tip="money" before-icon="rmb" :value="invoiceMoney" id="invoiceMoney" rule="R3000"></yhm-form-text>-->
        <yhm-form-radio title="是否冲帐" v-show="isAccounting" :select-list="yesOrNoList" :value="yesOrNo" id="yesOrNo" :no-edit=isEditAccIng></yhm-form-radio>

        <yhm-form-zh-select-more title="部门分配" :total="actualMoney" :value="details" id="details" rule="#" rule-item="R3000"></yhm-form-zh-select-more>

        <yhm-form-textarea title="备注" :value="remark" id="remark"></yhm-form-textarea>
      </template>
    </yhm-formbody>
<!--    yesOrNoPsd-->

<!--    <yhm-formlistbody>-->
<!--      <template #title>部门分配</template>-->
<!--      <template #operate>-->
<!--        <yhm-commonbutton value="部门分配" icon="btnAdd" @call="addDeparment"></yhm-commonbutton>-->
<!--      </template>-->
<!--      <template #listHead>-->
<!--        <th style="width: 580px;">部门</th>-->
<!--        <th style="width: 340px">金额</th>-->
<!--        <th style="width: 38px;">操作</th>-->
<!--      </template>-->
<!--      <template #listBody>-->
<!--        <tr v-for="(item,index) in details" :key="index" :class="{InterlacBg:index%2!==0}">-->
<!--          <yhm-form-td-select-dialog @call="selectBranch" width="580" :list="details" listid="details" :value="item" id="branchName" rule="#"></yhm-form-td-select-dialog>-->
<!--          <yhm-form-td-textbox @input="detailsMoneyInputEvent" :no-edit="index === details.length - 1 ? '1':''" width="340" :list="details" listid="details" :value="item" id="money" rule="R0000"></yhm-form-td-textbox>-->
<!--          <yhm-form-td-delete :must="1" width="38" :list="details" :value="item"></yhm-form-td-delete>-->
<!--        </tr>-->
<!--      </template>-->
<!--    </yhm-formlistbody>-->
    <div class="f_split"></div>
    <yhm-formlistbody v-if="noInvoice">
      <template #title>发票明细</template>
      <template #operate>
        <div>
        <yhm-commonbutton v-if="elInvoiceBtn" value="选择电子发票" icon="btnAdd"></yhm-commonbutton>
        <yhm-commonbutton value="添加发票" icon="btnAdd" @call="addInvoice"></yhm-commonbutton>
        </div>
      </template>
      <template #listHead>
        <th style="width: 120px">发票号码</th>
        <th style="width: 160px;">开票日期</th>
        <th style="width: 160px">类型</th>
        <th style="width: 90px">发票张数</th>
        <th>备注</th>
        <th style="width: 80px">发票照片</th>
        <th style="width: 38px">操作</th>
      </template>
      <template #listBody>
        <tr v-for="(item,index) in InvoiceDetails" :key="index" :class="{InterlacBg:index%2!==0}">
          <yhm-form-td-textbox width="120" @blur="invoiceGetValue(item)" :no-edit="item.isPdf === '1'?'1':'0'" :list="InvoiceDetails" listid="InvoiceDetails" :value="item" id="code" rule="R0000"></yhm-form-td-textbox>
          <yhm-form-td-date width="160" :no-edit="item.isPdf === '1'? '1' : '0'" position="u" :list="InvoiceDetails" listid="InvoiceDetails" :value="item" id="workDate" rule="R0000"></yhm-form-td-date>
          <yhm-form-td-radio :no-edit="item.isPdf === '1'" width="160" :list="InvoiceDetails" listid="InvoiceDetails" :value="item" :select-list="invoiceCategoryPsdList" id="category"></yhm-form-td-radio>
          <yhm-form-td-textbox width="120" @blur="invoiceGetValue(item)" :no-edit="item.category == '0'? '1':''" :list="InvoiceDetails" listid="InvoiceDetails" :value="item" id="quantity" rule="R0000"></yhm-form-td-textbox>
          <yhm-form-td-textbox width="270" :list="InvoiceDetails" listid="InvoiceDetails" :value="item" id="remark"></yhm-form-td-textbox>
          <yhm-form-td-upload-image @mouseover="invoiceImg(item)" @mouseout="invoiceImgHide(item)" width="90" tag="Invoice" :list="InvoiceDetails" listid="InvoiceDetails" :value="item" id="url" rule="#"></yhm-form-td-upload-image>
          <yhm-form-td-delete :must="1" width="38" :list="InvoiceDetails" :value="item"></yhm-form-td-delete>
        </tr>
      </template>
    </yhm-formlistbody>

    <div class="invoiceImgView" v-show="viewImgOn">
      <img :src=viewImg alt="">
    </div>

    <yhm-formoperate :createName="createName" v-show="btmShow" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn>
        <yhm-commonbutton value="冲账返还" icon="rversalReturn" :flicker="true" @call="rversalReturn()"></yhm-commonbutton>
      </template>
    </yhm-formoperate>
  </div>
</template>

<script>
  import { accMul, accAdd, guid, formatDate,formatTime } from '@/assets/common.js'
  import { formmixin } from '@/assets/form.js'
  export default {
    name: 'paymentEventForm',
    mixins: [formmixin],
    data () {
      return {
        id:'',
        ownerID: '',
        relevanceID: '',
        relevanceType: '',
        code: '',
        unitID: '',
        empty: true,
        noInvoice: true,
        personID: '',
        workDate: '',
        invoiceTypePsdList: [],
        invoiceCategory: '',
        brandList: [],
        invoiceList: [],
        subject: '',
        subjectID: '',
        actualMoney: '',
        invoiceMoney: '',
        invoiceCount: '',
        startDate: '',
        endDate: '',
        remark: '',
        detail: '',
        details: [],
        InvoiceDetails: [],
        category: '',
        invoiceCategoryPsdList: [],
        viewImg:'',
        viewImgOn: false,
        closeShow: false,
        btmShow: true,
        addShow:true,
        elInvoiceBtn: true,
        isPdf: false,
        btnLook: true,
        getCode: '',
        getQuantity: '',
        getCategory: '',
        yesOrNoList: [],
        yesOrNo:'',
        isAccounting: false,
        accounting: '',
        isRversal: '',
        isEditAccIng: false,
        isRversalString:''
      }
    },
    created () {
      //this.addDeparment()
      this.initData()
    },
    methods: {
      initData(){
        this.addInvoice()
        this.setQuery2Value('isRversalString')
        this.setQuery2Value('ownerID')
        this.setQuery2Value('relevanceID')
        this.setQuery2Value('relevanceType')
        this.setQuery2Value('code')
        this.setQuery2Value('unitID')
        this.setQuery2Value('personID')
        this.setQuery2Value('workDate')
        if(this.isRversalString==0){
          this.btmShow=false
        }
        if(this.relevanceID){
          this.closeShow = true
        }

        if(this.relevanceID=='null'){
          this.closeShow = false
        }

        let params = {
          relevanceID: this.relevanceID,
          relevanceType: this.relevanceType
        }

        this.init({
          url: '/PersonOffice/reimbursementsDetailForm',
          data: params,
          all: (data) =>{
            /* 公共 无论查看和添加返回数据 */
            if(data.id ==undefined ||data.id==""||data.id==''){
              this.addShow=false
            }

            this.invoiceTypePsdList = data.invoiceTypePsd.list
            this.invoiceCategory = data.invoiceTypePsd.value
            this.invoiceList = data.invoiceList
            this.subjectID = data.subjectID
            this.remark = data.remark
            this.invoiceCategoryPsdList = data.invoiceCategoryPsd.list
            this.invoiceCategoryPsd = data.invoiceCategoryPsd.value
            this.yesOrNoList = data.yesOrNoPsd.list
            this.yesOrNo = data.yesOrNoPsd.value
            this.accounting = data.accounting
            if (this.accounting === '0'){
              this.isAccounting = false
            }else {
              this.isAccounting = true
            }

            for(let i in this.InvoiceDetails){
              for(let j in data.invoiceList){
                this.InvoiceDetails[i].id = data.invoiceList[i].id
                this.InvoiceDetails[i].category = data.invoiceList[i].category
                this.InvoiceDetails[i].workDate = data.invoiceList[i].openDate
                this.InvoiceDetails[i].code = data.invoiceList[i].code
                this.InvoiceDetails[i].remark = data.invoiceList[i].remark
                this.InvoiceDetails[i].url = data.invoiceList[i].imgUrl
                this.InvoiceDetails[i].pdfUrl = data.invoiceList[i].pdfUrl
                this.InvoiceDetails[i].invoiceID = data.invoiceList[i].id
                this.InvoiceDetails[i].isPdf = '1'
                this.invoiceMoney = data.invoiceList[i].money
                this.actualMoney = data.invoiceList[i].money
                this.isPdf = '1'
                this.invoiceCount = '1'
              }
            }
            this.noInvoice = this.invoiceCategory != '2'
          },
          add: (data) => {
            /* 需要添加的数据 */
          },
          look: (data) => {
            /* 需要查看的数据 */
            if(data.id){
              this.addShow=true
            }

            this.invoiceCount = data.invoiceCount
            this.invoiceMoney = data.invoiceMoney
            this.actualMoney = data.actualMoney
            this.ownerID = data.ownerID
            this.workDate = data.workDate
            this.startDate = data.startDate
            this.endDate = data.endDate
            this.subject = data.subject
            this.personID = data.personID
            this.relevanceID = data.relevanceID
            this.relevanceType = data.relevanceType
            this.unitID = data.unitID
            this.code = data.code
            this.remark = data.remark

            this.details = data.branchList

            this.InvoiceDetails = data.invoiceList

            this.empty = this.invoiceList.length === 0

            if(this.is){
              this.btmShow=false
            }

            this.btnLook = false

          }
        })
      },
      rversalReturn(){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '690',
          title: '冲正返还',
          url: '/bankDetailForm?ownerID=' + this.id +'&bankDetailType=1',
          closeCallBack: (data)=>{
            if(data){
              this.initData()
            }
          }
        })
      },
      addInvoice(){
        let insertDate = new Date(accAdd(new Date().getTime(), accMul(this.details.length, 1000)))
        this.InvoiceDetails.push(
          {
            id: guid(),
            insertDate: formatTime(insertDate),
            ownerID: this.id,
            code: '',
            workDate: '',
            category: '0',
            quantity: '1',
            remark: '',

            url: '',
            pdfUrl: '',
            isPdf: '0',
            invoiceID: ''
          }
        )
      },
      closeWindow(){
        this.$dialog.setReturnValue('__Close')
        this.$dialog.close()
      },
      invoiceImg(item){
        if(item.url !== '') {
          if(item.isPdf === '0'){
            this.viewImg = '/UploadFile/Invoice/' + item.url
          }
          else
          {
            this.viewImg = '/UploadFile/electronicInvoice/' + item.url
          }
          this.viewImgOn = true
        }
      },
      invoiceImgHide(item){
        if(item.url !== '') {
          this.viewImgOn = false
        }
      },
    }
  }
</script>

<style scoped lang="less">
  @import "../../../static/bjFlow.css";

  .btnDel{
    background-color: transparent;
    color: #f00;
    border: 1px solid #f00;
  }
  .btnDel:hover{
    background-color: #f00;
    color: #fff;
  }
  .btnDel:before{
    color: #f00;
    font-size: 14px;
    margin-right: 5px;
  }
  .btnDel:hover:before{
    color: #fff;
  }
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
