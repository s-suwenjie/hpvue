<template>
  <div class="f_main">
    <yhm-formbody>
      <template #title>基本信息</template>
      <template #control>
        <yhm-form-radio title="分类" :select-list="ownerSysList" :value="ownerSys" id="ownerSys" @call="contentTT" :no-edit="true"></yhm-form-radio>
        <yhm-form-radio title="品牌" :select-list="brandList" :value="brand" id="brand"></yhm-form-radio>
        <yhm-form-radio title="收支方向" @call="contentTC" :no-edit="isDirectionEdit" :before="direction_state" :select-list="directionList" :value="direction" id="direction"></yhm-form-radio>
        <yhm-form-date title="交易日期" :value="cccurDate" :max="nowDate" id="cccurDate" position="b" rule="R0000"></yhm-form-date>
        <yhm-form-select title="我方" subtitle="账户信息" @click="selectaccount" :no-click="isSelectaccount" :value="selfAccount" v-if="isSelfAcc" id="selfAccount" width="1" rule="R0000" tip="value"></yhm-form-select>
        <yhm-form-text title="我方" subtitle="账户信息" :value="selfAccount" v-if="!isSelfAcc" id="selfAccount" rule="R0000" no-edit="1"></yhm-form-text>
        <yhm-form-text title="当前余额" :value="message" id="message" no-edit="1"></yhm-form-text>
        <yhm-form-text title="交易金额" :value="money" ref="money" id="money" rule="R3000" @input="calcTrAfterMoney" :no-edit="isMoney"></yhm-form-text>
        <yhm-form-text title="交易" :value="balance" subtitle="后余额" id="balance" no-edit="1"></yhm-form-text>
        <yhm-form-radio :show="clickB && isCauseIn" title="事由类型" @call="subjectTypeEvent" :select-list="subjectTypeList" :value="subjectType" id="subjectType" :no-edit="isCause"></yhm-form-radio>
        <!--<faceValue title="面值" v-show="cashMoney==='1'" @input="aaa" @call="cashMoneyChange" :money100="money100" :money50="money50" :money20="money20" :money10="money10" :money5="money5" :money1="money1" :money05="money05" :money01="money01"></faceValue>-->
        <div class="buttomA" v-show="contentTaA">

<!--          -->
          <div class="contentTab">
            <div class="bodyTit bdbNone tbTitSty">
              <p class="titTxt">事由</p>
              <button class="titBtn" type="button" @click="subjectTypeEvent" v-show="isAddBtn">
                <i class="icon addIcon"></i>添加
              </button>
            </div>
            <div class="table mg20">
              <table width="100%" border="1" cellspacing="0">
                <thead>
                <tr>
                  <td style="width: 500px">事由</td>
                  <td style="width: 100px">金额</td>
                  <td style="width: 180px">备注</td>
                  <td style="width: 38px">删除</td>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item,index) in detail" :key="index" :class="{InterlacBg:index%2!=0}">
                  <yhm-form-td-select-dialog @call="selectMoneSubject" width="500" :list="detail" listid="detail" :value="item" id="subject" rule="R0000" :no-edit="isMoreCause?'1':'0'"></yhm-form-td-select-dialog>
                  <yhm-form-td-textbox @input="calculationMoreMoney" :no-edit="(index === detail.length - 1) ? '1':'' || isMoreCause?'1':'0'" before-icon="rmb" width="100" :list="detail" listid="detail" :value="item" id="money" rule="R3000" ></yhm-form-td-textbox>
                  <yhm-form-td-textbox width="180" :list="detail" listid="detail" :value="item" id="remark"></yhm-form-td-textbox>
                  <yhm-form-td-delete :must="1" width="38" :list="detail" :value="item" :no-click="isMoreCause"></yhm-form-td-delete>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
          <!--数据空提示-->
            <span class="m_listNoData" v-show="displayA">暂时没有数据</span>

        </div>
        <yhm-form-select :show="contentTaB && isCauseIn" title="事由" @click="selectCause" :value="subject" id="subject" width="1" rule="R0000"></yhm-form-select>
        <yhm-form-textarea title="备注" :value="remark" id="remark"></yhm-form-textarea>

        <yhm-form-drop-down-select title="对方" subtitle="账户类型" width="1" @select="selectaccountB" :no-click="isOtherAcc" no-edit="1" :select-list="otherAccountTypeList" :selectValue="otherAccountType" selectid="otherAccountType" :value="otherAccount" id="otherAccount" rule="R0000"></yhm-form-drop-down-select>
        <!--        <yhm-form-drop-down-select title="事件类型" width="1" @select="selectCause" :select-list="categoryList" :selectValue="category" selectid="category" :value="cause" id="cause" rule="R0000"></yhm-form-drop-down-select>-->

        <yhm-form-radio title="有无" subtitle="手续费" :select-list="feeTypepsd" :value="feeType" id="feeType" rule="R0000" @call="feeTypeA"></yhm-form-radio>
        <yhm-form-text title="手续费" subtitle="金额" :value="fee" id="fee" :no-edit="HandlingFee"></yhm-form-text>
        <yhm-form-text title="凭证号" :value="voucherNo" id="voucherNo" width="1"></yhm-form-text>

        <yhm-form-upload-image title="上传凭证" width="800" height="650" tag="bankDetail" discription="点击图标或拖拽图片上传" @mouseoverEvent="lookImg"   :value="img" id="img"></yhm-form-upload-image>

        <yhm-formupload :ownerID="id" :value="fileList" id="fileList" title="上传文件" tag="payment" subtitle="" multiple="multiple"></yhm-formupload>
      </template>
    </yhm-formbody>
    <div id="lookImg" class="showImg" v-show="tipShow" @click="imgClick" @mouseout="imgClick">
      <img :src="getUrl">
    </div>
    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn>
        <yhm-commonbutton :value="saveTxt" icon="btnSave"  :flicker="true" @call="save()" :category="getBtnType"></yhm-commonbutton>
      </template>
    </yhm-formoperate>

  </div>
</template>

<script>
  import { accMul, accAdd, guid, formatDate, number2chinese, formatTime } from '@/assets/common.js'

  import { formmixin } from '@/assets/form.js'

  export default {
    name: 'bankDetailForm',
    mixins: [formmixin],
    data () {
      return {
        nowDate: formatDate(new Date()),//当前时间
        ownerID: '',
        ownerSys: '',//收支分类
        ownerSysList: [],
        brand: '',//收支品牌
        brandList: [],
        direction: '',//收支方向
        directionList: [],
        cccurDate: '',//交易日期
        selfAccountID: '',//我方账户Id
        selfAccount: '',//我方账户说明
        isSelectaccount: false,
        bankLogo: '',//银行LOGO
        money: '0',//交易金额
        balance: '0',//交易余额
        otherAccount: '',//对方账户说明
        otherAccountID: '',//对方账户说明ID
        otherName: '',//对方公司名称
        otherID: '',//对方公司名称ID
        voucherNo: '',//凭证号
        fileList: [],//上传凭证 不确定字段
        remark: '',//备注
        feeTypepsd: [],//手续费
        feeType: '',
        otherUnit: '',//我方账户信息 不确定字段
        fee: '',
        subjectTypeList: [],//事由类型
        subjectType: '',
        subject: '',//事由
        subjectID: '',//事由Id
        otherUnitID: '',
        cause: '',
        id: '',
        detail: [],
        accountID: '',
        HandlingFee: '1',
        message: '',
        moneyC: '0',
        moneyB: '',
        clickB: true,
        displayA: false,
        contentTaA: false,
        contentTaB: true,
        direction_state: true,
        bankDetailType: '',
        otherAccountTypeList: [],
        otherAccountType: '',
        isCause: false,
        isSelfAcc: true,
        directionBefore: '',
        isDirectionEdit: false,
        isMoreCause: false,
        isAddBtn: true,
        isOtherAcc: false,
        isCauseIn: true,
        isMoney: '1',
        calcTrMoney: '',
        oldMoney: '',

        img:'',
        tipShow:false,
        getUrl:'',
        bankDetailImg:[],
        storeName: '',

        saveHtml:'',//保存按钮文字

        // cashMoney:'0',
        // money100:'0',
        // money50:'0',
        // money20:'0',
        // money10:'0',
        // money5:'0',
        // money1:'0',
        // money05:'0',
        // money01:'0',

        receivabledetailType:'',//1代表当前公司  或个人 存在欠款
        receivabledetailList:[],//所选欠款信息
        receivabledetailMoney:'',//所信息金额
      }
    },
    methods: {
      // aaa(val){
      //   //alert(val)
      // },
      // cashMoneyChange(){
      //   let sum=accMul(100,this.money100)+accMul(50,this.money50)+accMul(20,this.money20)+accMul(10,this.money10)+accMul(5,this.money5);
      //   alert(this.money100+'-----'+this.money50+'-----'+this.money20+'-----'+this.money10+'-----'+this.money5+'-----'+this.money1)
      //   if(parseFloat(this.money)>0&&this.money.indexOf(".") !== -1){
      //     let top=this.money.split(".");
      //     this.money1=accAdd(top[0],-parseFloat(sum));
      //     this.money01=accAdd(top[1].substring(0,1),-accMul(money05,0.5));
      //   }else if(parseFloat(this.money)>0&&this.money.indexOf(".") === -1){
      //     this.money1=accAdd(this.money,-parseFloat(sum))
      //   }
      // },
      lookImg(){
        if(this.img){
          this.tipShow=true;
          this.getUrl='/UploadFile/bankDetail/'+this.img;
        }
      },
      imgClick(){
        if(this.tipShow){
          this.tipShow=false;
        }
      },
      calcTrAfterMoney(){

        let oldMoney = parseFloat(this.oldMoney)
        let money = parseFloat(this.money)
        if(money > oldMoney){

          let tip='交易金额必须小于等于原始金额！！！'
          if(this.bankDetailType === '13'){
            tip='交易金额大于剩余待退回金额！！！'
          }
          this.$dialog.alert({
            width: '350',
            alertImg: 'error',
            tipValue: tip,
            closeCallBack: ()=>{
              this.money = this.oldMoney
            }
          })
        }
        // if(this.cashMoney === '1'){
        //   this.cashMoneyChange();
        // }

        this.calcMoney()
      },
      //选择多事由(单行操作)
      selectMoneSubject (item) {
        let name = ''
        if(this.ownerSys==="0"){
          if(this.direction==="0"){
            name = '64'
          }else{
            name = '65'
          }
        }else if(this.ownerSys==="1"){
          if(this.direction==="0"){
            name = '62'
          }else{
            name = '63'
          }
        }
        this.$dialog.OpenWindow({
          width: 950,
          height: 690,
          url: '/selectDic?Type=1&Condition=18◇SubjectID&name=' + name,
          title: '选择事由',
          closeCallBack: (data) => {
            var subject = data.value2
            if (data.value1) {
              if (subject !== '') {
                subject += ' ------ '
              }
              subject += data.value1
            }
            if (data.showName) {
              if (subject !== '') {
                subject += ' ------ '
                subject += data.showName
              }
            }
            item.subjectID = data.id
            item.subject = subject
          }
        })
      },
      //计算金额(多事由)
      calculationMoreMoney (item) {
        var money = this.money
        for (var i = 0; i < this.detail.length - 1; i++) {
          var temp = this.detail[i].money
          if (temp === '') {
            temp = '0'
          }
          money = accAdd(money, accMul(-1, temp))
        }
        if (parseFloat(money) < 0) {
          money = 0
        }
        this.detail[this.detail.length - 1].money = money
      },
      subjectTypeEvent () { //事件类型点击事件
        if (this.subjectType === '1') {
          this.subject = ''
          this.contentTaA = true
          this.contentTaB = false
          // this.clickB = false
          let name = '63'
          this.$dialog.OpenWindow({
            width: 950,
            height: 690,
            url: '/selectDic?Type=1&Condition=18◇SubjectID&name=' + name + '&selectType=1',
            title: '选择事由',
            closeCallBack: (result) => {
              if (result) {
                for (var i = 0; i < result.length; i++) {
                  var data = result[i]
                  var subject = data.value2
                  if (data.value1) {
                    if (subject !== '') {
                      subject += ' ------ '
                    }
                    subject += data.value1
                  }
                  if (data.showName) {
                    if (subject !== '') {
                      subject += ' ------ '
                      subject += data.showName
                    }
                  }
                  let insertDate = new Date(accAdd(new Date().getTime(), accMul(this.detail.length, 1000)))
                  let item = {
                    id: guid(),
                    insertDate: formatTime(insertDate),
                    ownerID: this.id,
                    subjectID: data.id,
                    subject: subject,
                    money: '',
                    remark: ''
                  }

                  this.detail.push(item)

                }
                let money = this.money
                for (let j = 0; j < this.detail.length; j++) {
                  let temp = this.detail[j].money
                  if (temp === '') {
                    temp = '0'
                  }
                  money = accAdd(money, accMul(-1, temp))
                }
                if (parseFloat(money) < 0) {
                  money = 0
                }
                this.detail[this.detail.length - 1].money = money + ''
              } else {
                this.subjectType = '0'
                this.contentTaA = false
                this.contentTaB = true
              }
            }
          })
        } else if (this.subjectType === '0') {
          this.subject = ''
          this.contentTaB = true
          this.detail = []
          this.contentTaA = false
        }
      },
      calcMoney(){
        if (this.direction === '0') {
          if(this.message){
            this.balance = accAdd(this.message,this.money) + ''
          }
        }else{
          if(this.message){
            this.balance = accAdd(this.message,accMul(this.money,-1)) + ''
          }
        }
      },
      contentTC () { //点击收支方向 控制事由类型
        if (this.direction === '0') {
          this.contentTaB = true
          this.isCause = true
          this.subjectType = '0'
          this.contentTaA = false
          this.calcMoney()
        } else if (this.direction === '1') {
          this.isCause = false
          this.calcMoney()
        }
        this.feeTypeA()
      },
      contentTT () {
        if (this.ownerSys === '2') {
          this.direction_state = false
          this.direction = '1'
          this.clickB = false
          this.contentTaB = false



        } else if (this.subject === '0' && this.ownerSys <= 1) {
          this.clickB = true
          this.contentTaB = false
          this.direction_state = true
        } else {
          this.direction_state = true
          this.clickB = false
          this.contentTaB = true
          this.clickB = true
        }
        this.feeTypeA()
      },
      selectaccount () { //选择我方账户信息
        this.$dialog.OpenWindow({
          width: 950,
          height: 690,
          url: '/selectPublicAccount?categoryUnit=0&categoryUnitBefore=1&category=1&categoryInit=2',
          title: '选择我方账户信息',
          closeCallBack: (data) => {
            if (data) {
              this.selfAccount = data.publicAccountExplain
              this.accountID = data.id
              // if(data.id==="63E0977D-A26E-4FA7-838D-51BE7F8FF88C"){
              //   if(this.money.indexOf('.')!=-1){
              //     let top=this.money.split('.')
              //     this.money1=top[0]
              //     this.money01=top[1]
              //   }else{
              //     this.money1=this.money
              //   }
              //   this.cashMoney='1'
              // }
              let params = {
                accountID: this.accountID
              }
              this.selfAccountID = data.id
              if (this.accountID) {
                this.ajaxJson({
                  url: '/Fin/getAccountBalanceVue',
                  data: params,
                  call: (data) => {
                    this.message = data.message
                    this.calcMoney()
                  }
                })

              }
            }
          }
        })
      },
      selectCause () { //选择事由
        if (this.subjectType === '0') {
          let name=''
          if(this.ownerSys==="0"){
            if(this.direction==="0"){
              name = '64'
            }else{
              name = '65'
            }
          }else if(this.ownerSys==="1"){
            if(this.direction==="0"){
              name = '62'
            }else{
              name = '63'
            }
          }
          this.$dialog.OpenWindow({
            width: 950,
            height: 690,
            url: '/selectDic?Type=1&Condition=18◇SubjectID&name=' + name,
            title: '选择事由',
            closeCallBack: (data) => {
              let dicName
              if (data) {
                if (data.showName) {
                  dicName = data.value2 + ' ------ ' + data.value1 + ' ------ ' + data.showName
                }
                if (!data.value1) {
                  dicName = data.value2 + ' ------ ' + data.showName
                }
                if (!data.value2) {
                  dicName = data.value1 + ' ------ ' + data.showName
                }

                this.subject = dicName
                this.subjectID = data.id
              }
            }
          })
        }
      },
      selectaccountB () { //选择对方账户信息
        if (this.otherAccountType === '0') {
          this.$dialog.OpenWindow({
            width: 950,
            height: 690,
            url: '/selectPublicAccount?categoryUnit=1&categoryUnitBefore=1&category=1&categoryInit=2' + '&unitID=' + this.otherID,
            title: '选择公司账号',
            closeCallBack: (data) => {
              if (data) {
                this.otherAccount = data.publicAccountExplain
                this.otherAccountID = data.id
              }
            }
          })
        } else if (this.otherAccountType === '1') {
          this.$dialog.OpenWindow({
            width: 950,
            height: 640,
            url: '/selectPrivateAccount?state=0&category=1&categoryUnit=0&categoryUnitBefore=0&personID='+this.otherID,
            title: '选择私人账号',
            closeCallBack: (data) => {
              if(data){
                this.otherAccount = data.publicAccountExplain
                this.otherAccountID = data.id
              }
            }
          })
        } else if (this.otherAccountType === '2') {
          let name = '66'
          this.$dialog.OpenWindow({
            width: 950,
            height: 690,
            url: '/selectDic?Type=1&Condition=18◇SubjectID&name=' + name,
            title: '选择虚拟账号',
            closeCallBack: (data) => {
              if (data) {

                this.otherAccount = data.showName
                this.otherAccountID = data.id
              }
            }
          })
        } else {
          this.$dialog.alert({
            tipValue: '功能暂未开放',
            alertImg: 'warn',
            width: '320',
            closeCallBack () {
              this.otherAccountType = '0'
            }
          })
          this.otherAccountType = '0'
        }
      },
      feeTypeA () {
        if (this.feeType === '1' && this.direction === '1') {
          this.HandlingFee = '0'
        } else {
          this.HandlingFee = '1'
        }
      },
      save () {//保存
        let money = parseFloat(this.money)
        let aa = true

        if(parseFloat(this.calcTrMoney) < money){
          aa = false
        }
        if(this.img){
          let insertDate = new Date(accAdd(new Date().getTime(), accMul(this.detail.length, 1000)))
          let item = {
            id: guid(),
            insertDate: formatTime(insertDate),
            ownerID: this.id,
            category:'',
            tag: 'bankDetail',
            showName:this.img,
            storeName:this.img,
            suffix: (this.img.split('.')[(this.img.split('.').length)-1]).toUpperCase(),
          }
          this.bankDetailImg.push(item)
        }
        if(!aa){
          this.$dialog.alert({
            width: '300',
            alertImg: 'error',
            tipValue: '金额大于剩余可拨付余额',
          })
        }

        if (this.validator() && aa) {
          let params = {
            id: this.id,
            bankDetailType:this.bankDetailType,
            ownerID: this.ownerID,
            ownerSys: this.ownerSys, //收支分类
            brand: this.brand,//品牌
            direction: this.direction,//收支方向
            cccurDate: this.cccurDate,//交易日期
            selfAccountID: this.selfAccountID,//我方ID账户信息
            selfAccount: this.selfAccount,//我方账户信息
            money: this.money,//交易金额额
            balance: this.balance,//交易后余额
            subjectType: this.subjectType,//事由类型
            subjectID: this.subjectID,//事由ID
            subject: this.subject,//事由
            otherName: this.otherName,//对方账户说明
            otherAccountType: this.otherAccountType,//对方账户类型
            otherID:this.otherID,//对方公司ID
            otherAccountID: this.otherAccountID,//对方账户ID
            otherAccount: this.otherAccount,//对方账户类型
            remark: this.remark,//备注
            feeType: this.feeType,//有无手续费
            fee: this.fee,//手续费金额
            voucherNo: this.voucherNo,//凭证号
            files: this.fileList,//上传文件
            useMoney: this.autoCalcIpt,//多事由计算金额
            subjectList: this.detail,//多事由
            bankDetailImg:this.bankDetailImg,//上传凭证集合

            receivabledetailType:this.receivabledetailType,//1代表当前公司  或个人 存在欠款
            receivabledetailList:this.receivabledetailList,//所选欠款信息
            writeOffMoney:this.receivabledetailMoney,//所信息金额
          }
          this.$dialog.confirm({
            alertImg: 'warn',
            btnValueOk: '确认',
            tipValue: '是否'+this.saveHtml+'?',
            okCallBack: ()=>{
              this.ajaxJson({
                url: '/Fin/vueBankDetailSave',
                data: params,
                loading: '0',
                call: (data) => {
                  if (data.type === 0) {
                    this.$dialog.setReturnValue(this.id) //向父级页面id值
                    if (this.bankDetailType === '3'||this.bankDetailType === '5'||this.bankDetailType === '11'||this.bankDetailType === '7'||this.bankDetailType === '6'){
                      let param = {
                        id : this.ownerID
                      }
                      this.ajaxJson({
                        url: '/PersonOffice/prettyCashsReceivable',
                        data: param,
                        call: (data) => {

                        }
                      })
                    }
                    if(this.ownerID!==null&&this.ownerID!==''){
                      let param = {
                        id : this.ownerID,
                        state:'2'
                      }
                      this.ajaxJson({
                        url:'/dailyoffice/expressCompany/updateBillState',
                        data: param,
                        call: (data) => {

                        }
                      })
                    }
                    this.$dialog.alert({
                      tipValue: data.message,
                      closeCallBack: () => {
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
            }
          })
        }
      },
    },

    created () {
      this.setQuery2Value('ownerID')
      this.setQuery2Value('bankDetailType')
      this.setQuery2Value('directionBefore')
      this.setQuery2Value('receivabledetailMoney')//应收账款核销金额
      this.setQuery2Value('receivabledetailType')//是否是应收账款 核销
      if(parseFloat(this.receivabledetailMoney)>0){
        this.receivabledetailList=JSON.parse(sessionStorage.list);
      }
      if(this.bankDetailType === '0'){
        this.isMoney = ''
      }

      if(this.directionBefore === '1'){
        this.isDirectionEdit = true
        this.isCause = true
      }
      let params = {
        ownerID: this.ownerID,
        bankDetailType: this.bankDetailType,
      }
      this.init({
        url: '/Fin/addVueBankDetail',
        data: params,
        all: (data) => {
          /* 公共 无论查看和添加返回数据 */
          this.id = guid()
          this.ownerSysList = data.ownerSysPsd.list //收支分类
          this.ownerSys = data.ownerSysPsd.value

          this.selfAccount = data.selfAccount   //我方账户信息
          this.selfAccountID = data.selfAccountID

          this.brandList = data.brnadPsd.list  //品牌
          this.brand = data.brnadPsd.value  //品牌

          this.directionList = data.directionPsd.list //收支方向
          this.direction = data.directionPsd.value
          this.cccurDate = data.cccurDate //交易日期
          if(parseFloat(this.receivabledetailMoney)>0){
            this.money = parseFloat(data.money)-parseFloat(this.receivabledetailMoney)+' '//交易金额
          }else{
            this.money = data.money
          }
          if(data.money != 0){
            this.oldMoney = data.money
            this.calcTrMoney = data.money
          }
          this.balance = data.balance//交易余额

          this.subject = data.subject
          this.subjectID = data.subjectID
          this.subjectTypeList = data.subjectTypePsd.list //事由类型
          this.subjectType = data.subjectTypePsd.value

          this.otherAccountTypeList = data.otherAccountTypePsd.list//对方账户类型
          this.otherAccountType = data.otherAccountTypePsd.value
          // this.otherAccount = data.otherAccountTypePsd.value

          this.feeTypepsd = data.feeTypePsd.list//手续费
          this.feeType = data.feeTypePsd.value

          this.fee = data.fee//手续费金额

          this.otherAccount = data.otherAccount
          this.otherAccountID = data.otherAccountID
          this.otherID = data.otherID
          this.id = guid()
          this.remark = data.remark
          if (this.bankDetailType === '1') {
            this.message = data.currentBalance////我方账户余额
            this.calcMoney()
          }else if(this.bankDetailType === '3'){
            this.isDirectionEdit = true
            this.isCause = true
            this.isOtherAcc = true
          }else if(this.bankDetailType === '4'){
            /* 支票入账 */
          }else if(this.bankDetailType === '6'){
            this.ownerID = data.ownerID
          }else if(this.bankDetailType === '7'){
            this.message = data.currentBalance////我方账户余额
          }
          if (data.selfAccountID!==''&&data.selfAccount!==''){
            this.isSelectaccount=true
            this.message=data.currentBalance
          }
          if(this.bankDetailType === '0'){
            this.isSelectaccount=false
          }
          if(this.ownerSys === '2'){
            this.isCauseIn = false
          }

          if(this.subjectType === '1'){
            this.contentTaB = false
            this.contentTaA = true
            this.isMoreCause = true
            this.isAddBtn = false
          }
          for (let i = 0; i < data.subjectList.length; i++) {
            let insertDate = new Date(accAdd(new Date().getTime(), accMul(this.detail.length, 1000)))
            this.detail.push({
              id: data.subjectList[i].id,
              insertDate: formatTime(insertDate),
              ownerID: this.id,
              subjectID: data.subjectList[i].subjectID,
              subject: data.subjectList[i].subject,
              money:  data.subjectList[i].money,
              remark:  data.subjectList[i].remark
            })
          }
          if(this.bankDetailType === '10' || this.bankDetailType === '9'||this.bankDetailType === '14'){
            this.ownerID = data.ownerID
            this.isMoney = ''
            this.money = data.money
            this.isOtherAcc = true
          }else if(this.bankDetailType === '13'){
            this.isMoney = ''
            let params={
              id:this.ownerID
            }
            this.ajaxJson({
              url: '/dailyoffice/payDeposit/initForm',
              data: params,
              call: (payDeposit) => {
                if(payDeposit){
                  this.remark=payDeposit.remark
                  this.subject=payDeposit.subject
                  this.subjectID=payDeposit.subjectID
                  this.money=accAdd(payDeposit.money,-data.money)
                  this.oldMoney=accAdd(payDeposit.money,-data.money)
                  this.calcTrMoney = payDeposit.money
                  this.otherAccountType=payDeposit.category
                  this.otherAccountID=payDeposit.otherAccountID
                  this.otherAccount=payDeposit.otherAccount
                  this.otherID=payDeposit.otherID
                  if(payDeposit.subjectID){
                    this.ajaxJson({
                      url: '/dailyoffice/deposit/getRetreatDepositSubjectID',
                      data: {
                        subjectID:payDeposit.subjectID
                      },
                      call: (subjectID) => {
                        if(subjectID){
                          this.subjectID=subjectID.id
                          this.subject=subjectID.value2 + ' ---- ' + subjectID.value1 + ' ---- ' + subjectID.showName
                          if(subjectID.name === 64){
                            this.ownerSys='0'
                          }else if(subjectID.name === 62){
                            this.ownerSys='1'
                          }
                        }
                      }
                    })
                  }
                }
              }
            })
          }else if(this.bankDetailType === '15'){
            this.isMoney=''
          }

          this.storeName = data.storeName
          if(this.storeName){
            this.img = this.storeName;
          }

        },
        add: (data) => {
          /* 需要添加的数据 */
        },
        look: (data) => {
          /* 需要查看的数据 */

        }
      })

    },
    watch: { //监听detail是否有数据
      detail () {
        if (this.detail.length > 0) {
          this.displayA = false

        } else if (this.detail.length === 0) {
          this.displayA = true
          this.contentTaA = false

        }

      },
      // direction () { //监听收支
      //   if (this.direction === 1 && this.feeType === 1) {
      //     this.HandlingFee = '0'
      //   }else if(this.ownerSys===2&&this.direction===0){
      //     this.direction=1
      //
      //   }else {
      //     this.HandlingFee = '1'
      //   }
      // },
      // feeType () { //监听手续费金额
      //   if (this.direction === 1 && this.feeType === 1) {
      //     this.HandlingFee = '0'
      //   } else {
      //     this.HandlingFee = '1'
      //   }
      // },
      ownerSys () {//监听分类
        if (this.ownerSys === '2' && this.direction === '0') {
          this.direction = '1'
        }
      },

    },
    computed: {
      saveTxt(){
        if(this.bankDetailType === '11'){
          this.saveHtml='确认收款'
          return '确认收款'
        }else if(this.bankDetailType === '7'){
          this.saveHtml='确认收款'
          return '确认收款'
        }else if(this.bankDetailType === '3'){
          this.saveHtml='确认收款'
          return '确认收款'
        }else if(this.bankDetailType === '13'){
          this.saveHtml='确认收款'
          return '确认收款'
        }else {
          this.saveHtml='拨付资金'
          return '拨付资金'
        }
      },
      saveTxtColor(){
        if(this.bankDetailType === '11'){
          return '#f00'
        }else{
          return '#333'
        }
      },
      getBtnType(){
        if(this.bankDetailType === '11'){
          return 'one'
        }else{
          return 'ten'
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .buttomA {
    margin-bottom: 20px;
  }

  .tbTitSty {
    margin-top: 0 !important;
  }

  .m_listNoData {
    margin: 0 20px;
    border-right: 0;
    border-left: 0;
  }

  input {
    text-align: center;
  }
  .showImg{
    width: 850px;
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
    left: 140px;
    bottom: 0;
    margin: auto;
  }
</style>
