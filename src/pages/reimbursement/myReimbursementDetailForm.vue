<template>
  <div class="f_main">
    <yhm-formbody>
      <template #title>基本信息</template>
      <template #control>
        <yhm-form-radio title="类型" :show="getType" :select-list="typeList" :value="type" id="type"></yhm-form-radio>
        <yhm-form-select title="事由" @click="selectSubject" tip="subject" :value="subject" id="subject" rule="R0000"></yhm-form-select>
        <yhm-form-radio width="1" title="发票类型" @call="invoiceTypeEvent" :select-list="invoiceCategoryList" :value="invoiceCategory" id="invoiceCategory"></yhm-form-radio>

      </template>
    </yhm-formbody>

    <div class="f_split"></div>
    <yhm-form-list-edit :show="!noInvoice">
      <template #title>发票明细</template>
      <template #operate>
        <yhm-commonbutton :show="electronicInvoiceBtn" value="选择电子发票" icon="btnAdd" @call="selectInvoiceOperate"></yhm-commonbutton>
        <yhm-commonbutton :show="addInvoiceShow" value="添加发票" icon="btnAdd" @call="addInvoice"></yhm-commonbutton>
      </template>
      <template #listHead>
        <yhm-managerth style="width: 40px" title="查看"></yhm-managerth>
        <yhm-managerth style="width: 130px" title="发票号码"></yhm-managerth>
        <yhm-managerth style="width: 140px" title="开票日期"></yhm-managerth>
        <yhm-managerth style="width: 160px" title="类型"></yhm-managerth>

        <yhm-managerth style="width: 50px" title="张数"></yhm-managerth>
        <yhm-managerth style="width: 90px" title="单张票面金额"></yhm-managerth>
        <yhm-managerth style="width: 90px" title="票面总金额"></yhm-managerth>

        <yhm-managerth style="width: 130px" title="备注"></yhm-managerth>
        <yhm-managerth style="width: 90px" title="发票照片"></yhm-managerth>
        <yhm-managerth style="width: 40px" title="操作"></yhm-managerth>
      </template>
      <template #listBody>
        <tr v-for="(item,index) in invoiceDetails" :key="index" :class="{InterlacBg:index%2!==0}">
          <yhm-manager-td-look :no-click="isElLook" @click="listView(item)"></yhm-manager-td-look>
          <yhm-form-td-textbox width="130" @change="verificationRepeatInvoice(item)" :no-edit="getIsElectronicInvoice" :list="invoiceDetails" listid="invoiceDetails" :value="item" id="code" rule="R0000"></yhm-form-td-textbox>

          <yhm-form-td-date width="140" :no-edit="getIsElectronicInvoice" :min="minWorkDate" :max="maxWorkDate" position="u" :list="invoiceDetails" listid="invoiceDetails" :value="item" id="workDate" rule="R0000"></yhm-form-td-date>

          <yhm-form-td-radio width="160" :no-edit="isElectronicInvoice" @call="switchInvoiceCategory" :list="invoiceDetails" listid="invoiceDetails" :value="item" :select-list="listCategoryList" id="category"></yhm-form-td-radio>

          <yhm-form-td-textbox width="50" @change="verificationRepeatInvoice(item)" @input="invoicesQuantityInputEvent" :no-edit="getIsElectronicInvoice || item.category === '0' ? '1':''" :list="invoiceDetails" listid="invoiceDetails" :value="item" id="quantity" rule="R1000"></yhm-form-td-textbox>
          <yhm-form-td-textbox width="90" :no-edit="getIsElectronicInvoice" @input="invoicesMoneyInputEvent()" @blur="calcMoney(item)" before-icon="rmb" :list="invoiceDetails" listid="invoiceDetails" :value="item" id="money" rule="R3000" tip="value"></yhm-form-td-textbox>
          <yhm-form-td-textbox width="90" no-edit="1" @input="actualMoneyEvent()" @blur="calcActualMoney(item)" before-icon="rmb" :list="invoiceDetails" listid="invoiceDetails" :value="item" id="actualMoney" rule="R3000" tip="value"></yhm-form-td-textbox>

          <yhm-form-td-textbox width="130" :no-edit="getIsElectronicInvoice" :list="invoiceDetails" listid="invoiceDetails" :value="item" id="remark" tip="value"></yhm-form-td-textbox>
          <yhm-form-td-upload-image width="90" :no-upload="isElectronicInvoice" tag="Invoice" @mouseover="invoiceImg(item)" @mouseout="invoiceImgHide(item)" :list="invoiceDetails" listid="invoiceDetails" :value="item" id="url" rule="#"></yhm-form-td-upload-image>
          <yhm-form-td-delete :no-click="getDeleteInvoiceBtnShow" width="40" :list="invoiceDetails" :value="item" :del-click="true" @click="delInvoice(index,item)"></yhm-form-td-delete>
        </tr>
      </template>
    </yhm-form-list-edit>

    <div class="f_split"></div>
    <yhm-formbody>
      <template #title></template>
      <template #control>
<!--        <yhm-form-date title="发生日期" :value="workDate" :min="minDate" :max="maxWorkDate" id="workDate" position="b" rule="R0000"></yhm-form-date>-->
        <yhm-form-zh-text-two :show="!noInvoice" color="#fd6802" :no-edit="true" tip-before="money" tip-after="value" :before="invoiceMoney" before-id="invoiceMoney" :after="invoiceCount" after-id="invoiceCount" title="发票" subtitle="总计额" before-icon="rmb" after-title="发票张数"></yhm-form-zh-text-two>

        <yhm-form-text v-if="isViewPrettyCash" ref="actualMoney" color="#0e9d51" :less-equal="invoiceMoney" less-equal-message="实报总金额必须小于等于发票总计额" title="实报" subtitle="总金额" tip="money" before-icon="rmb" :value="actualMoney" id="actualMoney" rule="R3000"></yhm-form-text>

        <yhm-form-text v-if="!isViewPrettyCash" ref="actualMoney" color="#0e9d51" title="实际金额" :no-edit=isActualMoney tip="money" before-icon="rmb" :value="actualMoney" id="actualMoney" rule="R3000"></yhm-form-text>

<!--        0e9d51-->
        <yhm-form-date ref="startDate" placeholder="*选填" placeholder-color="#A35227" color="#A35227" :max="endDate" title="费用" subtitle="开始日期" :value="startDate" id="startDate" position="u"></yhm-form-date>
        <yhm-form-date ref="endDate" placeholder="*选填" placeholder-color="#A35227" color="#A35227" :min="startDate" title="费用" subtitle="结束日期" :value="endDate" id="endDate" position="u"></yhm-form-date>
        <yhm-form-zh-select-more @click="selectDeparment" title="部门分配" :total="actualMoney" :value="branchList" id="branchList" rule="#" rule-item="R3000"></yhm-form-zh-select-more>
        <yhm-form-textarea :show="isNoInvoiceReason" title="无票原因" :value="noInvoiceReason" id="noInvoiceReason">
          <div class="formBoxIcon" @click="noInvoiceReasonEvent">
            <span class="i-help"></span>
          </div>
        </yhm-form-textarea>
        <yhm-form-textarea title="备注" :value="remark" id="remark"></yhm-form-textarea>

        <yhm-formupload :ownerID="id" :value="fileList" id="fileList" title="支持单据" tag="reimbursementDetailForm" subtitle="" multiple="multiple"></yhm-formupload>

      </template>
    </yhm-formbody>


    <div class="noInvoiceBox" v-show="isNoInvoiceReasonList">
      <p>无票理由</p>
    </div>

    <div class="invoiceImgView" v-show="viewImgShow">
      <img :src="viewImg" alt="">
    </div>

    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn>
        <yhm-commonbutton value="保存" icon="btnSave" @call="save(0)" :flicker="true"></yhm-commonbutton>
        <yhm-commonbutton v-if="isAdd && relevanceID === ''" value="保存并新增" class="btnAddSave" icon="btnAddSave" @call="save(1)"></yhm-commonbutton>
        <yhm-commonbutton v-show="closeShow" category="ten" value="暂不报销,关闭页面" icon="btnDel" :flicker="false" @call="closeWindow()"></yhm-commonbutton>
      </template>
    </yhm-formoperate>
  </div>
</template>

<script>
  import { accMul, accAdd, guid, formatDate,formatTime } from '@/assets/common.js'
  import { formmixin } from '@/assets/form.js'
  export default {
    name: 'reimbursementDetailForm',
    mixins: [formmixin],
    data () {
      return {
        relevanceID:'',       //关联数据ID
        relevanceType:'',     //关联数据类型
        parentCode:'',        //报销编号
        parentWorkDate:'',    //报销申请日期
        unitID:'',            //所属单位ID
        ownerID:'',       //报销批次ID
        workDate:'',      //事件发生日期
        minDate:'',
        maxWorkDate:formatDate(new Date()), //当前日期
        //maxWorkDate: '', //当前日期
        subjectID:'',       //事由ID
        subject:'',         //事由
        startDate:'',       //费用开始
        endDate:'',         //费用结束日期
        actualMoney:'',     //实际金额
        invoiceCategory:'', //发票类型
        invoiceMoney:'',    //发票金额
        invoiceCount:'',    //发票数量
        type:'',            //报销类型
        branchList:[],      //部门分配
        remark:'',          //备注
        state:'0',          //审批状态
        isFinish:'0',       //事件状态
        invoiceDetails:[],  //发票明细
        viewImg:'',         //需要显示的发票路径
        viewImgShow:false,  //显示发票图片
        closeShow:false,     //暂不报销,关闭页面 是否显示
        isElectronicInvoice:false,  //发票是否电子发票
        noInvoice:false,    //是否无票报销
        electronicInvoiceBtn:false,  //选择电子发票按钮是否显示
        addInvoiceShow:true,//添加发票按钮是否显示
        isSpecialAuthority:'0',    //是否有特殊权限
        invoiceCategoryList:[],   //发票类型素材
        typeList:[],              //报销类型
        listCategoryList:[],       //发票明细列表中类型,
        oldPrettyCash: '',
        isActualMoney: '1',
        isElLook: false,
        minWorkDate: '',
        files: [],
        fileList: [],
        noInvoiceReason: '',
        isNoInvoiceReason: false,
        isNoInvoiceReasonList: false,
        isSelectViewPrettyCash: '',
        isViewPrettyCash: true,
      }
    },

    methods: {
      /* 无票原因 */
      noInvoiceReasonEvent(){
        this.isNoInvoiceReasonList = !this.isNoInvoiceReasonList
      },
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
      //本次报销是否重复
      isRepeatInvoice(){
        let result = true
        if(this.invoiceDetails.length > 0){
          var arr = [],arrRepeat = []
          for (let i in this.invoiceDetails) {
            let code = this.invoiceDetails[i].code
            if (code !== '') {
              if(this.invoiceDetails[i].category === '0'){
                if (arr[code]) {
                  if (arrRepeat.indexOf(code) === -1) {
                    arrRepeat.push(code)
                  }
                } else {
                  arr[code] = code
                }
              }
              else {
                let count = this.invoiceDetails[i].quantity
                for(let j = 0; j < count; j++){
                  if (arr[code]) {
                    if (arrRepeat.indexOf(code) === -1) {
                      arrRepeat.push(code)
                    }
                  } else {
                    arr[code] = code
                  }
                  code = accAdd(code,1)
                }
              }
            }
          }
          if(arrRepeat.length > 0){
            result = false
            let width = accAdd(300,accMul(arrRepeat[0].length,10))
            this.$dialog.alert({
              tipValue:'发票号码（ <b class="red"> '  + arrRepeat[0] + ' </b> ）重复了',
              alertImg:'warn',
              width:width
            })
          }
        }
        return result
      },
      submit(){
        let params = {
          id: this.ID,
          tableName : 40
        }
        this.$dialog.confirm({
          width: 300,
          tipValue: '确定提交申请?',
          btnValueOk: '确定',
          alert: 'warn',
          okCallBack: (data) => {
            this.ajaxJson({
              url: '/PersonOffice/getSubmitCatrgoryVue',
              data: params,
              call: (data) => {
                this.category = data.message
                if (this.category) {
                  let params = {
                    id: this.ID,
                    category: this.category,
                    tableName: 43,
                    isDetail: 1,
                    tableDetailName: 44
                  }
                  this.ajaxJson({
                    url: '/PersonOffice/approvalSubmitVue',
                    data: params,
                    call: (data) => {
                      if (data.type === 0) {
                        this.$dialog.alert({
                          tipValue: data.message,
                          closeCallBack: () => {
                            this.$dialog.setReturnValue(this.id)
                            // this.initData()
                            this.$dialog.close()
                          }
                        })
                      } else {
                        this.$dialog.alert({
                          alertImg: 'error',
                          tipValue: data.message,
                          closeCallBack: () => {
                          }
                        })
                      }
                    }
                  })
                }else{
                  this.$dialog.alert({
                    tipValue: '没有获取到提交数据!',
                    alertImg: 'error'
                  })
                }
              }
            })
          }
        })
      },
      //查看发票是否使用过
      verificationRepeatInvoice(item){
        if(this.isRepeatInvoice()) {
          if (item.code !== '' && item.quantity !== '') {
            let params = {
              id: this.id,
              code: item.code,
              category: item.category,
              quantity: item.quantity
            }
            this.ajaxJson({
              url: '/PersonOffice/verifyReimbursementDetailInvoiceCode',
              data: params,
              loading: '0',
              call: (data) => {
                if (data.type === 0) {
                  let width = 250
                  width = accAdd(width, accMul(data.val.length, 15))
                  this.$dialog.alert({
                    tipValue: data.message + '：<b class="red">（' + data.val + '）</b>' + data.message,
                    alertImg: 'error',
                    width: width
                  })
                }
              }
            })
          }
        }
      },
      //选择事由
      selectSubject(){
        let name ='63'
        if(this.type==='3'){
          name = '93'
        }
        this.$dialog.OpenWindow({
          width: 950,
          height: 603,
          url: '/selectDic?name=' + name,
          title: '选择事由',
          closeCallBack: (data) => {
            if (data) {
              this.subjectID = data.id
              this.subject = data.value2 === '' ? data.value1 : data.value2
            }
          }
        })
      },
      //发票类型切换事件
      invoiceTypeEvent(old){

        if(this.isPrettyCashOff === '1'){
          if(this.isSelectPrettyCash === '0'){
            if(this.invoiceCategory === '2'){
              this.$dialog.alert({
                width: '280',
                tipValue: '当前备用金有发票！！！',
                closeCallBack: () => {
                  this.invoiceCategory = old
                  this.invoiceTypeEvent();
                }
              })
            }
          }
        }


        if(this.invoiceCategory === '0' || this.invoiceCategory === '1'){
          this.addInvoiceShow = true
          this.electronicInvoiceBtn = false
          this.invoiceDetails = []
          this.addInvoice()
          this.isElectronicInvoice = '0'
          this.isElectronicInvoice = false
        }
        if(this.invoiceCategory === '3'){
          this.electronicInvoiceBtn = true
          this.addInvoiceShow = false
          this.invoiceDetails = []
          this.addInvoice()
          this.selectInvoiceOperate()
        }else {
          this.addInvoiceShow = true
        }

        if(this.invoiceCategory === '2'){
          this.isActualMoney = '0'
          this.noInvoice = true
          this.invoiceCount = ''
          this.invoiceMoney = ''
          this.invoiceDetails = []
        } else{
          this.isActualMoney = '1'
          this.noInvoice = false
          if(old === '2') {
            this.invoiceDetails = []
            this.addInvoice()
          }
          // if(this.invoiceCategory === '1'){
          //   this.electronicInvoiceBtn = false
          // } else{
          //   this.electronicInvoiceBtn = true
          // }
        }
        // if(this.invoiceCategory === '2'){
        //   this.isNoInvoiceReason = true
        // }else{
        //   this.isNoInvoiceReason = false
        // }
      },
      //部门分配
      selectDeparment(){
        this.$dialog.OpenWindow({
          url:"/selectDepartment?level=2&open=1",
          width:"850",
          height:"600",
          title: "选择部门",
          closeCallBack: (data) => {
            if(data){
              var sign = true
              for(var i = 0; i< this.branchList.length; i++){
                if(this.branchList[i].selectID === data.id){
                  sign = false
                  break
                }
              }
              if(sign) {
                let insertDate = new Date(accAdd(new Date().getTime(), accMul(this.branchList.length, 1000)))

                let item = {
                  id: guid(),
                  insertDate: formatTime(insertDate),
                  ownerID: this.id,
                  selectID: data.id,
                  selectValue: data.name,
                  value: ''
                }
                if (this.branchList.length > 0) {
                  this.branchList[this.branchList.length - 1].value = ''
                }
                this.branchList.push(item)
              }
              else{
                var width = 300
                width = accAdd(width, accMul(15,data.name.length))
                this.$dialog.alert({
                  tipValue:'部门<b class="red">（' + data.name + '）</b>已存在！！！',
                  alertImg:'warn',
                  width:width
                })
              }
            }
          }
        })
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
      //选择电子发票
      selectInvoice(){
        let len = this.invoiceDetails.length
        let sign = false
        if(len === 1){
          let invoice = this.invoiceDetails[0]
          if(invoice.code !== ''){
            sign = true
          }
          else if(invoice.workDate !== ''){
            sign = true
          }
          else if(invoice.remark !== ''){
            sign = true
          }
          else if(invoice.url !== ''){
            sign = true
          }
          else if(invoice.pdfUrl !== ''){
            sign = true
          }
          else if(invoice.invoiceID !== ''){
            sign = true
          }
        }
        else{
          sign = true
        }

        if(sign){
          this.$dialog.confirm({
            tipValue:'选择电子发票将清空你填写的纸质发票，确定选择电子发票吗？',
            width:'600',
            btnValueOk:'选择电子发票',
            okCallBack:() => {
              this.selectInvoiceOperate()
            }
          })

        } else{
          this.selectInvoiceOperate()
        }
      },
      //选择电子发票操作
      selectInvoiceOperate(){

        this.$dialog.OpenWindow({
          url:'/selectElectronicInvoice?state=0&relevanceID=' + this.id + "&relevanceType=1" + "&selectType=1" ,
          width: "1000",
          height: "650",
          title: '选择电子发票',
          closeCallBack: (datakkk)=>{
            if(datakkk) {
              for(let i in datakkk){

                let data = datakkk[i]

                // 判断电子发票是否有重复项
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
                      this.invoiceDetails[i].actualMoney = data.totalMoney
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
                      actualMoney: data.totalMoney,
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
                  this.calculationActualMoneyEvent();
                }
              }
            }
          }
        })
      },
      //发票明细中的发票类型（单张还是连号首张）
      switchInvoiceCategory(item){
        if(item.category === '0') {
          //单张情况
          item.quantity = "1"


          item.money = ""
          item.actualMoney = ""
        }
        else{
          //连号首张
          item.quantity = ""
          item.money = ""
          item.actualMoney = ""
        }
        this.calculationInvoiceMoney()
        this.verificationRepeatInvoice(item)
      },

      //计算发票金额
      calculationInvoiceMoney(){
        let money = 0
        let quantity = 0
        let mulQuantity = 0
        for(let i in this.invoiceDetails){
          let item = this.invoiceDetails[i]
          let temp = item.money
          let tempMoney = item.money
          if(isNaN(temp) || temp === ''){
            temp = 0
          }
          let count = item.quantity
          if(isNaN(count) || count === ''){
            count = 1
          }
          if(isNaN(tempMoney) || count === ''){
            tempMoney = 0
          }
          quantity = accAdd(quantity,count)
          temp = accMul(temp,count)
          money = accAdd(money,temp)

          mulQuantity = count * tempMoney

          item.actualMoney = this.actualMoney = mulQuantity + ''

        }


        this.invoiceCount =  quantity + ''
        this.invoiceMoney = this.actualMoney = money + ''
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
      /* 计算实报金额 */
      calcActualMoney(item){
        let regMoney = parseFloat(item.money)
        let regActualMoney = parseFloat(item.actualMoney)

        if(regMoney && regActualMoney){

          if(regActualMoney > regMoney){

            return
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
      /* 计算票面金额 */
      calcMoney(item){
        let regMoney = parseFloat(item.money)
        let regActualMoney = parseFloat(item.actualMoney)

        if(regMoney && regActualMoney){

          return
          if(regActualMoney > regMoney){
            this.$dialog.alert({
              width: '300',
              alertImg: 'warn',
              tipValue: '实报金额必须小于票面金额',
              closeCallBack: ()=>{
                item.money = ''
              }
            })
          }
        }
      },
      //票面金额input事件
      invoicesMoneyInputEvent(){
        this.calculationInvoiceMoney()
      },
      //发票数量input事件
      invoicesQuantityInputEvent(){
        this.calculationInvoiceMoney()
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

            this.calculationInvoiceMoney()
            this.calculationActualMoneyEvent();
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
      //强制关闭页面
      closeWindow(){
        this.$dialog.setReturnValue('__Close')
        this.$dialog.close()
      },
      //保存
      save(op){
        let a = this.validator()
        let b = true
        if((this.startDate && !this.endDate) || (!this.startDate && this.endDate)){
          b = false
          if(!this.startDate){
            this.$refs.startDate.errorEvent('费用开始日期不为空')
          }
          if(!this.endDate){
            this.$refs.endDate.errorEvent('费用结束日期不为空')
          }
        }
        let c = this.isRepeatInvoice()
        if(a && b && c){
          let params = {
            id:this.id,
            ownerID: this.ownerID,   //报销批次的ID
            relevanceID: this.relevanceID,  //关联数据ID
            relevanceType: this.relevanceType,  //关联数据类型
            parentCode:this.parentCode,         //报销编号
            parentWorkDate:this.parentWorkDate, //报销申请日期
            unitID:this.unitID,//所属单位ID
            workDate:this.workDate,//事件发生日期
            subjectID:this.subjectID,//事由ID
            subject:this.subject,//事由
            startDate:this.startDate,//费用开始日期
            endDate:this.endDate,//费用结束日期
            actualMoney:this.actualMoney,//实际金额
            invoiceCategory:this.invoiceCategory,//发票类型
            invoiceMoney:this.invoiceMoney,//发票金额
            invoiceCount:this.invoiceCount,//发票数量
            type:this.type,//报销类型
            remark:this.remark,//备注
            state:this.state,//审批状态
            isFinish:this.isFinish,//事件状态
            branchList: this.branchList,
            invoiceList: this.invoiceDetails,
            prettyCashMoney: this.prettyCashMoney,
            files: this.fileList
          }

          this.ajaxJson({
            url: '/PersonOffice/saveReimbursementDetail',
            data: params,
            call: (data) => {
              if (data.type === 0) { //更新成功
                this.$dialog.setReturnValue(this.ownerID)
                this.$dialog.alert({
                  tipValue: data.message,
                  closeCallBack: () => {
                    if(op === 1){
                      this.$dialog.refresh()
                    }else{
                      this.$dialog.close()
                    }
                  }
                })
              }
              else if (data.type === 1) {
                this.$dialog.alert({
                  tipValue:data.message,
                  alertImg: 'error'
                })
              }
              else if(data.type === 11){
                this.$dialog.alert({
                  tipValue:data.message,
                  alertImg: 'error',
                  width:'300'
                })
              }
              else if(data.type === 22){
                this.$dialog.alert({
                  tipValue:data.message,
                  alertImg: 'error',
                  width:'330'
                })
              }
              else if(data.type === 33){
                let width = 250
                width = accAdd(width,accMul(data.val.length,15))
                this.$dialog.alert({
                  tipValue:data.message + '：<b class="red">（' + data.val + '）</b>' + data.message,
                  alertImg: 'error',
                  width:width
                })
              }
              else if (data.type === 2) {
                this.$dialog.alert({
                  tipValue:data.message,
                  alertImg: 'warn',
                  width:'370'
                })
              }
            }
          })

        }
      },
      initMaxWorkDate(){
        let workDate = this.parentWorkDate
        let newDateMsec = new Date(workDate).getTime()
        let month = workDate.split('-')[1]
        let monthMsec = 30*24*60*60*1000

        let threeMonMsec = 30*3*24*60*60*1000
        let Year = new Date().getFullYear()
        let newYear = Year + '-' + '01-01'
        let newYearMsec = new Date(newYear).getTime()

        if(month === '01'){
          this.minWorkDate = formatDate(new Date(newDateMsec - monthMsec))
        }else if(newDateMsec - newYearMsec < threeMonMsec){
          this.minWorkDate = formatDate(new Date(newYear))
        }else{
          this.minWorkDate = formatDate(new Date(newDateMsec - threeMonMsec))
        }

        // this.maxWorkDate = workDate
      }
    },
    computed:{
      getType(){
        if(this.noInvoice){
          return false
        }
        else {
          return this.isSpecialAuthority === '1'
        }
      },
      getDeleteInvoiceBtnShow(){
        return this.relevanceID !== ''
      },
      getIsElectronicInvoice(){
        return this.isElectronicInvoice ? '1':''
      },
    },
    created () {

      //初始化页面传递参数
      this.setQuery2Value('isPrettyCashOff')
      this.setQuery2Value('isSelectPrettyCash')
      // this.setQuery2Value('subject')
      this.setQuery2Value('subjectID')
      this.setQuery2Value('ownerID')
      this.setQuery2Value('relevanceID')
      this.setQuery2Value('relevanceType')
      this.setQuery2Value('parentCode')
      this.setQuery2Value('parentWorkDate')
      this.setQuery2Value('ID')
      this.setQuery2Value('edit')
      this.setQuery2Value('isSelectViewPrettyCash')


      if(this.isSelectViewPrettyCash === '1'){
        this.isViewPrettyCash = false
      }

      if(this.subjectID){

        let params = {
          id: this.subjectID
        }
        this.init({
          url: '/Com/getDicVueByID',
          data: params,
          all: (data)=>{
            this.subjectID = data.id
            this.subject = data.value2 === '' ? data.value1 : data.value2
          }
        })
      }



      /* 限定开票日期 */
      this.initMaxWorkDate()

      let params = {}
      if(this.isAdd) {
        if (this.relevanceID) {
          this.isElectronicInvoice = true
          this.closeShow = true //显示 暂不报销,关闭页面 按钮
          params = {
            relevanceID: this.relevanceID,
            relevanceType: this.relevanceType
          }
        }
        else {
          this.addInvoice()         //初始化一条待添加的发票
        }
      }
      this.init({
        url: '/personOffice/initReimbursementDetailForm',
        data:params,
        all: (data) =>{
          // this.invoiceCategory = data.invoiceCategoryPsd.value
          this.invoiceCategoryList = data.invoiceCategoryPsd.list
          this.type = data.typePsd.value
          this.typeList = data.typePsd.list
          this.isSpecialAuthority = data.isSpecialAuthority
          this.listCategoryList = data.listCategoryPsd.list
          this.unitID = data.unitID
          this.minDate = data.minDate
          // if(this.isPrettyCashOff === '1'){
          //   this.isPrettyMoneyCash = true
          // }

        },
        add: (data) => {
          if(this.relevanceID) { //说明是从外部过来的数据
            let insertDate = new Date(accAdd(new Date().getTime(), accMul(this.invoiceDetails.length, 1000)))
            if(this.relevanceType === '3') {//3说明是电子发票过来的数据
              let invoice = data.invoiceList[0]
              this.invoiceDetails.push({
                id: guid(),
                insertDate: formatTime(insertDate),
                ownerID: this.id,
                code: invoice.code,
                workDate: invoice.workDate,
                category: invoice.category,
                quantity: invoice.quantity,
                money: invoice.money,
                remark: invoice.remark,
                url: invoice.url,
                pdfUrl: invoice.pdfUrl,
                isPdf: invoice.isPdf,
                invoiceID: invoice.invoiceID
              })
              this.maxWorkDate = invoice.workDate
              this.invoiceMoney = invoice.money
              this.invoiceCount = '1'
            }
          }
        },
        look: (data) => {
          this.branchList = data.branchList
          this.invoiceDetails = data.invoiceList
          for(let i = 0; i < this.invoiceDetails.length; i++){
            if(this.invoiceDetails[i].isPdf === '1'){
              this.isElectronicInvoice = true
              this.maxWorkDate = this.invoiceDetails[i].workDate

              break
            }else{
              this.isElLook = true
            }
          }
          this.minWorkDate = data.minDate
          this.ownerID = data.ownerID
          this.workDate = data.workDate
          this.subjectID = data.subjectID
          this.subject = data.subject
          this.startDate = data.startDate
          this.endDate = data.endDate
          this.actualMoney = data.actualMoney
          this.invoiceMoney = data.invoiceMoney
          this.invoiceCount = data.invoiceCount
          this.remark = data.remark
          this.state = data.state
          this.isFinish = data.isFinish
          this.prettyCashsList = data.prettyCashsList
          this.fileList = data.files
          this.invoiceCategory = data.invoiceCategory

          if(this.invoiceCategory === '2'){
            this.noInvoice = true
            this.isActualMoney = '0'
          }
          if(this.invoiceCategory === '0'){
            this.invoiceTypeEvent();
            this.invoiceDetails = data.invoiceList
          }
          if(this.invoiceCategory === '1'){
            this.noInvoice = false
          }

        }
      })

      if(this.isPrettyCashOff === '0' || this.isSelectPrettyCash === '0'){
        this.invoiceCategory = '0'
      }else{
        this.invoiceCategory = '2'
        this.invoiceTypeEvent();
        this.invoiceDetails = []
      }

    },
    watch: {
      invoiceDetails(){
        if(!this.invoiceDetails[0].workDate){
          this.isElectronicInvoice = '0'
          this.isElectronicInvoice = false
          this.isElLook = true
        }
      }
    }
  }
</script>

