<template>
  <div class="f_main">
    <yhm-formbody>
      <template #title>基础信息</template>
      <template #control>
        <yhm-form-text title="申请人" no-edit="1" :value="person" id="person" rule="R0000"></yhm-form-text>
        <yhm-form-date title="申请日期" :max="maxApplyDate" :value="applyDate" id="applyDate" rule="R0000"></yhm-form-date>
        <yhm-form-drop-down-select title="付款方" width="1"  @select="selectUnit" :select-list="personOrUnitList" :selectValue="personOrUnit" selectid="personOrUnit" :value="name" id="name" rule="R0000"></yhm-form-drop-down-select>
        <yhm-form-radio title="开票类型" :select-list="categoryList" @call="selectCategory" :value="category" id="category" rule="R0000" width="1"></yhm-form-radio>
        <yhm-form-radio title="发票类型" @call='selectInvoiceCategory' :select-list="invoiceCategoryList" :value="invoiceCategory" id="invoiceCategory" :no-show-item="invoiceCategoryNoList" rule="R0000" width="1"></yhm-form-radio>
        <yhm-form-radio title="抬头类型" @call="purchaserTypeRadio" :select-list="purchaserTypeList"  :value="purchaserType" id="purchaserType" rule="R0000"></yhm-form-radio>
        <yhm-form-select title="发票抬头" v-if="purchaserType!='1'&&purchaserType!='2'" :value="purchaser" id="purchaser" @click="selectOpenInvoiceRise" rule="R0000">
          <div class="formBoxIcon" v-if="purchaserType!='1'" @click="selectOpenInvoiceRise" title='修改发票抬头'>
            <span class="i-copy"></span>
          </div>
        </yhm-form-select>
        <yhm-form-text title="税号" no-edit="1" v-if="purchaserType!='1'&&purchaserType!='2'"  :value="taxNumber" id="taxNumber" rule="R0000"></yhm-form-text>
        <yhm-form-select title="开户行" v-if="isBankShow&&purchaserType!=1" tip="value" @click="selectEvent" :value="bank" id="bank" rule="R0000"></yhm-form-select>
        <yhm-form-text title="账号" no-edit="1" v-if="isBankShow&&purchaserType!=1" :value="account" id="account" rule="R0000"></yhm-form-text>
      </template>
    </yhm-formbody>
    <div class="f_split"></div>
    <yhm-form-list-show>
      <template #title>工单信息</template>
      <template #listHead>
        <!--<yhm-managerth style="width: 38px" title="查看"></yhm-managerth>-->
        <!--<yhm-managerth title="接待人"></yhm-managerth>-->
        <yhm-managerth title="序号" width="38"></yhm-managerth>
        <yhm-managerth title="OA项目号"></yhm-managerth>
        <yhm-managerth style="width: 90px" title="车牌号"></yhm-managerth>
        <yhm-managerth style="width: 90px" title="客户名称"></yhm-managerth>
        <!--<yhm-managerth style="width: 90px" title="联系人"></yhm-managerth>-->
        <yhm-managerth style="width: 95px" title="实际金额"></yhm-managerth>
        <yhm-managerth style="width: 95px" title="合计费用"></yhm-managerth>
        <yhm-managerth style="width: 95px" title="已收金额"></yhm-managerth>
        <yhm-managerth style="width: 95px" title="未收金额"></yhm-managerth>
        <yhm-managerth style="width: 95px" title="已开金额"></yhm-managerth>
        <yhm-managerth style="width: 95px" title="未开金额"></yhm-managerth>

      </template>
      <template #listBody>
        <tr v-for="(item,index) in list" :class="[{InterlacBg:index%2!=0}]" :key="item.id">
          <!--<yhm-manager-td-look @click="listView(item,'材料支出')"></yhm-manager-td-look>-->
          <!--<yhm-manager-td-center :value="item.principal"></yhm-manager-td-center>-->
          <div style="display: flex;justify-content: center;text-align: center;">{{Number(index)+1}}</div>

          <yhm-manager-td :value="item.otherCode"></yhm-manager-td>
          <yhm-manager-td :value="item.vehicle"></yhm-manager-td>
          <yhm-manager-td :tip="true" node-class-name="f_main" :value="item.carOwner"></yhm-manager-td>
          <!--<yhm-manager-td-center :value="item.contactPerson"></yhm-manager-td-center>-->
          <yhm-manager-td-money :value="item.actual+''"></yhm-manager-td-money>
          <yhm-manager-td-money :value="item.totalMoney+''"></yhm-manager-td-money>
          <yhm-manager-td-money :value="item.orderreceivedMoney+''==''?'0':item.orderreceivedMoney+''" style="color: #00bb6b;"></yhm-manager-td-money>
          <yhm-manager-td-money :value="item.uncollectedMoney+''" style="color: #f00;"></yhm-manager-td-money>
<!--          <yhm-manager-td-money :value="item.orderreceivedMoney+''==''?'0':item.orderreceivedMoney+''"></yhm-manager-td-money>-->
<!--          <yhm-manager-td-money :value="item.uncollectedMoney+''" :style="{color:Number(item.uncollectedMoney)=='0'?'#00bb6b':'#333'}"></yhm-manager-td-money>-->
          <yhm-manager-td-money :value="item.finrest+''" :style="{color:Number(item.finrest)==Number(item.totalMoney)?'#00bb6b':'#333'}"></yhm-manager-td-money>
          <yhm-manager-td-money :value="item.finresult+''" :style="{color:Number(item.finresult)=='0'?'#00bb6b':'#333'}"></yhm-manager-td-money>
        </tr>
      </template>
      <template #empty>
        <span class="m_listNoData" v-show="list.length == 0">暂时没有数据</span>
      </template>
    </yhm-form-list-show>
    <div class="f_split"></div>
    <yhm-form-list-edit>
      <template #title>工单信息</template>
      <template #operate>
        <yhm-commonbutton value="预开开票" color="#00bb6b" border-style="1px solid #00bb6b" v-show="detailedList.length != 0" icon=" " :flicker="flicker" :key="key" @call="allPitchOn(1),invoiceType='1'" category="three"></yhm-commonbutton>
        <yhm-commonbutton value="实开开票" color="#2193b0" border-style="1px solid #2193b0" v-show="detailedList.length != 0" icon=" " :flicker="flicker" :key="key+1" @call="allPitchOn(0),invoiceType='0'" category="three"></yhm-commonbutton>
      </template>
      <template #listHead>
        <yhm-managerth style="width: 38px;" title="选择"></yhm-managerth>
<!--        <yhm-managerth style="width: 38px;" title="序号"></yhm-managerth>-->
        <yhm-managerth style="width: 205px;" title="OA项目号"></yhm-managerth>
        <yhm-managerth style="width: 110px;" title="车牌号"></yhm-managerth>
        <yhm-managerth style="width: 120px;" title="付款方"></yhm-managerth>

        <yhm-managerth style="width: 115px;" title="收入金额"></yhm-managerth>
        <yhm-managerth style="width: 130px;" title="开票类型"></yhm-managerth>
        <yhm-managerth style="width: 115px;" title="已开金额"></yhm-managerth>
        <yhm-managerth title="开票金额"></yhm-managerth>
        <!--        <yhm-managerth title="联系人"></yhm-managerth>-->
        <!--        <yhm-managerth style="width: 130px;" title="类型"></yhm-managerth>-->
      </template>
      <template #listBody>
        <tr v-for="(item,index) in detailedList" :key="index" :class="{InterlacBg:index%2!==0,preOpening:invoiceType=='1'&&item.type=='0',realOpen:invoiceType=='0'&&item.type=='1'}">
          <div class="checkbox"><input type="checkbox" name="checkbox" :checked="checkedList.indexOf(item.id)!=-1?true:false" :value="item.id" @click="checkboxOnclick(item,index)"></div>
<!--          <yhm-form-td-textbox width="38" style="text-align: center;" no-edit="1" id="num" :list="detailedList" listid="detailedList" :value="item"></yhm-form-td-textbox>-->
<!--          <yhm-manager-td-center :value="Number(index)+1"></yhm-manager-td-center>-->
          <yhm-form-td-textbox width="205" :tip="true" no-edit="1" id="ordernum" :list="detailedList" listid="detailedList" :value="item"></yhm-form-td-textbox>
          <yhm-form-td-textbox width="110" style="text-align: center;" no-edit="1" id="vehicle" :list="detailedList" listid="detailedList" :value="item"></yhm-form-td-textbox>
          <yhm-form-td-textbox width="120" style="text-align: left;" :tip="true" v-if="item.type=='0'" no-edit="1" id="otherUnit" :list="detailedList" listid="detailedList" :value="item"></yhm-form-td-textbox>
          <yhm-form-td-textbox width="120" style="text-align: center;" v-else no-edit="1" id="noData" :list="detailedList" listid="detailedList" :value="item"></yhm-form-td-textbox>
          <yhm-form-td-textbox width="115" style="text-align: right;" no-edit="1" id="money" :list="detailedList" listid="detailedList" :value="item"></yhm-form-td-textbox>
          <yhm-form-td-radio width="130" :select-list="selectList" id="type" :no-edit="true" :list="detailedList" listid="detailedList" :value="item"></yhm-form-td-radio>
          <yhm-form-td-textbox width="115" style="text-align: right;" no-edit="1"  id="useMoney" :list="detailedList" listid="detailedList" :value="item"></yhm-form-td-textbox>
          <yhm-form-td-textbox width="125" @blur="invoiceAmountBlur(item)" :max-number="item.type=='1'?(Number(item.totalMoney)-Number(item.useMoney)):(Number(item.money)-Number(item.useMoney))" :no-edit="item.noEdit" id="invoiceAmount" :list="detailedList" listid="detailedList" :value="item"></yhm-form-td-textbox>
        </tr>
      </template>
      <template #empty>
        <span class="m_listNoData" v-if="arrType.indexOf('0')==-1&&invoiceType=='0'">实开{{emptyTitle}}</span>
        <span class="m_listNoData" v-else-if="arrType.indexOf('1')==-1&&invoiceType=='1'">预开{{emptyTitle}}</span>
      </template>
    </yhm-form-list-edit>
    <div class="f_split"></div>
    <yhm-formbody>
      <template #title>基础信息</template>
      <template #control>
        <yhm-form-text :input-red-show="true" title="发票金额" no-edit="1"  tip="invoiceMoney" before-icon="rmb" :value="invoiceMoney+''" id="invoiceMoney" error-message="纯数字输入"></yhm-form-text>
        <yhm-form-text title="金额大写" :value="invoiceMoneyUp" id="invoiceMoneyUp" no-edit="1"></yhm-form-text>
<!--        <yhm-form-radio title="款项状态" :no-edit="true" :select-list="isReceivablesList"  :value="isReceivables" id="isReceivables" rule="R0000"></yhm-form-radio>-->

        <yhm-form-radio title="开票类型" @call="allPitchOn(invoiceType)" :select-list="invoiceTypeList"  :value="invoiceType" id="invoiceType" rule="#"></yhm-form-radio>

        <yhm-form-radio title="发票处理" :select-list="invoiceHandleList"  :value="invoiceHandle" id="invoiceHandle" rule="R0000"></yhm-form-radio>
        <yhm-form-date title="预计使" subtitle="用日期" :min="minPreUseDate" position="u" :value="preUseDate" id="preUseDate" rule="R0000"></yhm-form-date>
        <yhm-form-date title="预计回" subtitle="款日期" v-if="invoiceType=='1'" :min="minMoneyBackDate" position="u" :value="moneyBackDate" id="moneyBackDate" :rule="invoiceType=='1'?'R0000':''"></yhm-form-date>

        <yhm-form-select title="收件人" v-if="invoiceHandle=='1'" @click="selectPerson" :value="addressee" id="addressee" rule="R0000"></yhm-form-select>
        <yhm-form-text placeholder="11位手机号码"  title="手机号" v-if="invoiceHandle=='1'" subtitle="" :value="addresseePhone" id="addresseePhone"></yhm-form-text>
        <yhm-form-text placeholder="请输入电话号码"  title="电话" v-if="invoiceHandle=='1'" subtitle="" :value="addresseeTel" id="addresseeTel"></yhm-form-text>
        <yhm-form-select default-txt="+请选择相关国家、省份、城市、区县" v-if="invoiceHandle=='1'" title="地址区域" tip="value"   @click="recipientAddressClick" :value="mailTitle" id="mailTitle" rule="R0000"></yhm-form-select>
        <yhm-form-textarea  placeholder="请输入详情地址，包含省、市、区、街道等" v-if="invoiceHandle=='1'" title="地址" subtitle="" :value="mailTitleAddress" id="mailTitleAddress"  rule="R0000"></yhm-form-textarea>

        <!--        <yhm-form-text title="快递号" v-if="invoiceHandle==1" :value="expressID" id="expressID" rule="R0000"></yhm-form-text>-->
        <!--        <yhm-form-radio title="开票类型" :select-list="openInvoiceTypeList"  :value="openInvoiceType" id="openInvoiceType" rule="R0000"></yhm-form-radio>-->
        <!--        <yhm-form-radio title="开票类型" :select-list="makeOutAnInvoiceList"  :value="openInvoiceType" id="openInvoiceType" rule="R0000"></yhm-form-radio>-->

        <yhm-form-textarea title="事由说明" :value="remark" id="remark"></yhm-form-textarea>


        <!--<yhm-form-text title="材料费" no-edit="1" before-icon="rmb" :value="amountSum" id="amountSum"></yhm-form-text>-->
        <!--<yhm-form-text title="总计金额" no-edit="1" before-icon="rmb" :value="totalMoneySum" id="totalMoneySum"></yhm-form-text>-->
        <!--<yhm-form-text title="已收金额" no-edit="1" before-icon="rmb" :value="receivedMoneySum" id="receivedMoneySum"></yhm-form-text>-->
        <!--<yhm-form-text title="未收金额" no-edit="1" before-icon="rmb" :value="uncollectedMoneySum" id="uncollectedMoneySum"></yhm-form-text>-->
      </template>
    </yhm-formbody>
    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn>
        <yhm-commonbutton value="跳转开票申请" icon="btnSave" :flicker="true" @call="save()"></yhm-commonbutton>
      </template>
    </yhm-formoperate>
  </div>
</template>
<script>
  import { formmixin } from '@/assets/form.js'
  import { guid, formatDate,accAdd,number2chinese } from '@/assets/common.js'
  export default {
    name: 'offlineWorlOrderTicketForm',
    mixins: [formmixin],
    data(){
      return{
        key:0,
        arrType:[],//预开实开类型数组
        taxNumberBackups:'',//税号备份
        purchaserBackups:'',//发票抬头备份
        vehicleID:'',//车辆id
        emptyTitle:'没有可开票的工单',
        flicker:false,
        invoiceType:'1',
        invoiceTypeList:[//开票类型
          {
            num:'1',
            code:'',
            img:'',
            showName:'预开',
          },
          {
            num:'0',
            code:'',
            img:'',
            showName:'实开',
          },
        ],
        makeOutAnInvoice:'',//开票类型
        makeOutAnInvoiceList:[
          {
            num:'',
            code:'',
            img:'',
            showName:'合并开票',
          },
          {
            num:'1',
            code:'',
            img:'',
            showName:'分开开票',
          },
        ],
        openInvoiceType:'',
        openInvoiceTypeList:[
          {
            num:'0',
            code:'',
            img:'',
            showName:'实收',
          },
          {
            num:'1',
            code:'',
            img:'',
            showName:'预收',
          }
        ],
        name:'',//付款方
        otherUnitID:'',//付款方id
        personOrUnit:'0',
        personOrUnitList:[
          {
            num:'0',
            code:'',
            img:'',
            showName:'对公',
          },
          {
            num:'1',
            code:'',
            img:'',
            showName:'对私',
          }
        ],
        payment:'',//付款公司
        paymentid:'',//付款方id
        person:'',//申请人
        personID:'',//申请人
        applyDate:'',//申请日期
        maxApplyDate:formatDate(new Date()),
        ownerCategory:'4',
        categoryList:[],//开票类型
        category:'',//开票类型
        invoiceCategory:'',
        invoiceCategoryList:[],//发票类型
        purchaserType:'',
        purchaserTypeList:[],//抬头类型
        isBankShow:false,//账号显示隐藏
        taxNumber:'',//税号
        taxNumberOld:'',
        purchaser:'',//发票抬头
        purchaserID:'',
        account:'',
        bank:'',
        bankID:'',
        payerID:'',
        invoiceMoney:'',//发票金额
        invoiceMoneyUp:'',//发票金额大写
        isReceivables:'',
        isReceivablesList:[],//款项状态
        preUseDate:'',//预计使用日期
        minPreUseDate:formatDate(new Date()),
        moneyBackDate:'',//预计回款日期
        minMoneyBackDate:formatDate(new Date()),
        invoiceHandleList:[],
        invoiceHandle:'',//发票处理
        expressID:'',//快递号
        remark:'',//事由说明

        amountSum:'',//材料费
        totalMoneySum:'',//合计金额
        receivedMoneySum:'',//已收金额
        uncollectedMoneySum:'',//未收金额
        openInvoiceMainID:'',//开票的id
        list:[],//要开票的工单列表数据
        checkedValueList:[],//选中的整条数据
        checkedList:[],//选中数据的id
        preOpenList:[],//预开金额
        actualList:[],//实开数据
        detailedList:[],//收支明细数据
        selectList:[
          {
            num:'0',
            img:'',
            code:'',
            showName:'实开'
          },
          {
            num:'1',
            img:'',
            code:'',
            showName:'预开'
          }
        ],

        addresseeID:'',
        addressee:'',
        addresseePhone:'',
        addresseeTel:'',
        mailTitleID:'',
        mailTitle:'',
        mailTitleAddress:'',
        isApprovalRise:'0',//0 发票抬头已审批    1发票抬头未审批完成
        invoiceCategoryNoList:[],

      }
    },
    watch: {
      invoiceMoney () {
        this.invoiceMoneyUp = number2chinese(this.invoiceMoney)
      },
      purchaserType(newVal,val){
        // console.log(newVal,val)
        if(newVal=='2'&&val=='0'){
          // this.taxNumberBackups = this.taxNumber.concat()
          // this.purchaserBackups = this.purchaser.concat()
          this.taxNumber = ''
          this.purchaser = ''
          // console.log(this.taxNumberBackups,this.purchaserBackups,this.taxNumber,this.purchaser)
        }else if(newVal=='1'&&val=='2'){
          this.taxNumber = this.taxNumberBackups.concat()
          this.purchaser = this.purchaserBackups.concat()
          console.log(this.taxNumberBackups,this.purchaserBackups,this.taxNumber,this.purchaser)
        }else if(val=='2'&&newVal=='0'){
          this.taxNumber = this.taxNumberBackups.concat()
          this.purchaser = this.purchaserBackups.concat()
        }
        if(newVal=='2'){
          console.log('111111111',this.taxNumberBackups,this.purchaserBackups,this.taxNumber,this.purchaser)

        }

      }
    },
    methods:{
      invoiceAmountBlur(item){
        if(this.invoiceType == '0'){
          let money = 0
          for(let i in this.detailedList){
            if(this.detailedList[i].ordernum==item.ordernum&&this.detailedList[i].type=='0'){
              money += Number(this.detailedList[i].invoiceAmount)
              // console.log(this.detailedList[i],money,this.detailedList[i].invoiceAmount)
            }
          }
          let surplusMoney = 0
          for(let j in this.list){
            if(this.list[j].otherCode==item.ordernum){
              if(Number(this.list[j].finrest)+Number(money)>Number(this.list[j].totalMoney)){
                console.log(Number(this.list[j].finrest),Number(money))
                // surplusMoney = Number(this.list[j].finrest)+Number(money) - item.invoiceAmount
              }
            }
          }
          console.log(surplusMoney)
        }
      },
      purchaserTypeRadio(){
        if(this.purchaserType=='2'){
          this.invoiceCategoryNoList = ['1']
        }else{
          this.invoiceCategoryNoList = []
        }
      },
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
      selectCategory(){
        this.invoiceCategoryNoList = ['2']
      },
      resetPersonOrUnit(op,personOrUnit){
        if(op === 'i'){
          this.personOrUnit = personOrUnit
        }
      },
      selectUnit (op) {
        if(this.personOrUnit === '0'){
          this.$dialog.OpenWindow({
            width: '1150',
            height: '700',
            url: '/selectTax',
            title: '选择付款方',
            closeCallBack: (data) => {
              if (data) {
                // if(this.purchaserType==='0'){
                  this.name = data.unit
                  this.paymentid = data.unitID
                  this.payerID = data.unitID

                  this.purchaser=data.unit
                  this.purchaserID=data.unitID
                  this.taxNumber=data.taxNumber
                  this.payerID=data.unitID
                  this.bankID=data.accountID
                  this.bank=data.bank
                  this.account=data.account
                  this.taxNumberBackups = data.taxNumber
                  this.purchaserBackups = data.unit
                  this.purchaserType = '0'
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
                // }
                this.getInvoiceAll()
              }else{
                //说明没有选中需要重置类型
                this.resetPersonOrUnit(op,'1')
              }
            }
          })
          // this.$dialog.OpenWindow({
          //   width: '950',
          //   height: '700',
          //   url: '/selectUnit?category=1&categoryBefore=1',
          //   title: '选择单位信息',
          //   closeCallBack: (data) => {
          //     if (data) {
          //       if(data.registrationNumber === ''){
          //         this.name = data.name
          //         this.paymentid = data.id
          //         this.payerID = data.id
          //       }else{
          //         this.name = data.name
          //         this.paymentid = data.id
          //         this.payerID = data.id
          //       }
          //       this.getInvoiceAll()
          //     }
          //     else{
          //       //说明没有选中需要重置类型
          //       this.resetPersonOrUnit(op,'1')
          //     }
          //   }
          // })
        }else{
          this.$dialog.OpenWindow({
            width: '950',
            height: '700',
            url: '/selectPerson?category=1&categoryBefore=1',
            title: '选择联系人信息',
            closeCallBack: (data) => {
              if (data) {
                this.purchaser = ''
                this.taxNumber = ''
                this.purchaserType = '1'
                if(data.idNo === ''){
                  this.name = data.name
                  this.paymentid = data.id
                  this.payerID = data.id
                }else{
                  this.name = data.name
                  this.paymentid = data.id
                  this.payerID = data.id
                }
                this.getInvoiceAll()
              }
              else{
                //说明没有选中需要重置类型
                this.resetPersonOrUnit(op,'0')
              }
            }
          })
        }
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
              this.bank = data.name
              this.account = data.account
            }
          }
        })
      },
      // selectPurchaser(){
      //   if(this.purchaserID===''){
      //     let url=''
      //     if(this.purchaserType==='0'){
      //       url='/selectUnit?category=1&categoryBefore=1'
      //     }else{
      //       url='/selectPerson?category=1'
      //     }
      //     this.$dialog.OpenWindow({
      //       width: '950',
      //       height: '700',
      //       url: url,
      //       title: '选择购买方',
      //       closeCallBack: (data) => {
      //         if (data) {
      //           if(this.purchaserType==='0'){
      //             if(data.registrationNumber===""){
      //               this.$dialog.OpenWindow({
      //                 width: '1050',
      //                 height: '700',
      //                 url: '/addUnitForm?id='+data.id,
      //                 title: '选择购买方',
      //                 closeCallBack: (unitData) => {
      //                   if(unitData){
      //                     this.purchaser=unitData.name
      //                     this.purchaserID=unitData.id
      //                     this.payerID=unitData.id
      //                     // this.taxNumber=unitData.taxNumber
      //                     // this.taxNumberOld=unitData.taxNumber
      //                     this.selectOpenInvoiceRise()
      //                   }
      //                 }
      //               })
      //             }else{
      //               this.purchaser=data.name
      //               this.purchaserID=data.id
      //               this.payerID=data.id
      //               // this.taxNumber=data.taxNumber
      //               // this.taxNumberOld=data.taxNumber
      //               this.selectOpenInvoiceRise()
      //             }
      //           }else{
      //             if(data.idNo===''){
      //               this.$dialog.OpenWindow({
      //                 width: '1050',
      //                 height: '700',
      //                 url: '/addPersonForm?id='+data.id,
      //                 title: '选择购买方',
      //                 closeCallBack: (personData) => {
      //                   if(personData){
      //                     this.purchaser=data.name
      //                     this.purchaserID=data.id
      //                   }
      //                 }
      //               })
      //             }else{
      //               this.purchaser=data.name
      //               this.purchaserID=data.id
      //             }
      //           }
      //         }
      //       }
      //     })
      //   }else{
      //     if(this.purchaserType==='0'){
      //       this.selectOpenInvoiceRise()
      //     }else if(this.purchaserType==='1'){
      //       this.purchaserID=''
      //       this.purchaser=''
      //       this.selectPurchaser()
      //     }
      //   }
      // },
      // selectOpenInvoiceRise(){
      //   this.$dialog.OpenWindow({
      //     width: '1050',
      //     height: '690',
      //     url:'/selectUnitInvoice?id='+this.paymentid,
      //     title:'选择发票抬头',
      //     closeCallBack:(data) =>{
      //       if (data) {
      //         this.purchaser=data.unit
      //         this.purchaserID=data.unitID
      //         this.account=data.account
      //         this.bank=data.bank
      //         this.bankID=data.bankID
      //         this.taxNumberOld=data.taxNumber
      //         this.taxNumber=data.taxNumber
      //       }
      //     }
      //   })
      // },
      selectOpenInvoiceRise(){
        this.$dialog.OpenWindow({
          width: '1120',
          height: '690',
          url:'/selectInvoiceRise?unitID='+this.payerID,
          title:'选择发票抬头',
          closeCallBack:(data) =>{
            if (data) {
              // this.name = data.otherUnit
              // this.paymentid = data.otherUnitID
              // this.payerID = data.otherUnitID


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
      selectInvoiceCategory(){
        if(this.invoiceCategory==='1'){
          this.isBankShow=true
        }else{
          this.isBankShow=false
        }
      },
      allPitchOn(type){
        this.checkedList = []
        this.checkedValueList = []
        for(let i in this.detailedList){
          if(this.detailedList[i].type==type){
            this.checkedList.push(this.detailedList[i].id)
          }
        }
        this.$nextTick(()=>{
          let a =$(".checkbox").find('input:checkbox')
          for(let j=0; j<a.length; j++){
            a[j].disabled=false
          }
        })

        setTimeout(()=>{
          // let unCheckedBoxs = $("input[name='checkbox']").not("input:checked")
          // for(let j=0; j<unCheckedBoxs.length; j++){
          //   unCheckedBoxs[j].disabled=true
          // }
          for(let k in this.detailedList){//根据选中的数据id拿到相关联的整条收支明细信息
            if(this.checkedList.indexOf(this.detailedList[k].id)!=-1){
              this.checkedValueList.push(this.detailedList[k])
            }
          }
        },0)
      },
      save(){
        let a = this.validator()
        let typeList = []
        for(let i in this.checkedValueList){
          typeList.push(this.checkedValueList[i].type)
        }


        if(a){
          if(this.checkedList.length!=0){
            if(typeList.indexOf('0')!=-1&&typeList.indexOf('1')!=-1){
              this.$dialog.alert({
                width: '350',
                alertImg: 'warn',
                tipValue: '只能选择同一开票类型',
                closeCallBack: ()=>{
                  this.key++
                  this.flicker = true
                }
              })
            }else{
              if(typeList.indexOf('0')!=-1&&typeList.indexOf('1')==-1){
                this.isReceivables = '0'
              }else if(typeList.indexOf('0')==-1&&typeList.indexOf('1')!=-1){
                this.isReceivables = '1'
              }
              sessionStorage.openInvoiceFormWorkOrderList = JSON.stringify(this.$data)//当前页面数据
              this.$dialog.OpenWindow({
                width: '1050',
                height: '790',
                title: '确认开票申请信息',
                url: '/offlineOpenInvoiceView?id='+guid(),
                closeCallBack: (data) => {
                  if (data) {
                    this.emptyTitle = '开票完成,没有可开票的工单'
                    this.initDate()
                  }
                }
              })
              // this.$dialog.OpenWindow({
              //   width: '1050',
              //   height: '790',
              //   title: '添加开票申请信息',
              //   url: '/openInvoiceForm?isAdd=true&ownerID=' + this.openInvoiceMainID + '&ownerCategory=4&offlineWorkOrder=1&purchaserType=0',
              //   closeCallBack: (data) => {
              //     if (data) {
              //       this.initPageData(false)
              //     }else{
              //       let params = {
              //         ownerID:this.openInvoiceMainID
              //       }
              //       this.ajaxJson({
              //         url: '/Fin/openInvoiceListDel',
              //         data: params,
              //         call: (data) => {
              //
              //         }
              //       })
              //     }
              //   }
              // })
            }
          }else{
            this.$dialog.alert({
              width: '350',
              alertImg: 'warn',
              tipValue: '至少选择一条开票详情',
              closeCallBack: ()=>{
                this.key++
                this.flicker = true
              }
            })
          }
        }else{
          if(this.invoiceHandle=='1'){
            if(this.moneyBackDate!=''&&this.preUseDate!=''&&this.mailTitleAddress!=''&&this.addressee!=''&&this.mailTitle!=''){
              $('html,body').animate({'scrollTop':0},1000)
            }
          }else{
            if(this.moneyBackDate!=''&&this.preUseDate!=''){
              $('html,body').animate({'scrollTop':0},1000)
            }
          }

        }
      },
      checkboxOnclick(item,index){
        this.checkedValueList = []
        let list = []
        if ($("input[name='checkbox']").get(index).checked) {
          this.checkedList.push(item.id)
          // list.push(item.vehicle)
        }else{
          this.checkedList.splice(this.checkedList.indexOf(item.id),1)
          // list.splice(item.vehicle,1)
        }
        for(let k in this.detailedList){//根据选中的数据id拿到相关联的整条收支明细信息
          if(this.checkedList.indexOf(this.detailedList[k].id)!=-1){
            this.checkedValueList.push(this.detailedList[k])
          }
        }
        // let vehicleList = []
        // if(this.list.length!=0){
        //   for(let w=0; w<this.list.length; w++){
        //     for(let j=0; j<this.checkedList.length; j++){
        //       if(this.checkedList[j].id==this.list[w].id){
        //         vehicleList.push(this.list[w].vehicle)
        //
        //       }
        //     }
        //     console.log(this.list[w])
        //   }
        // }
        // console.log(vehicleList)
        // try{
        //   this.vehicleID = data.fixOrderEntiltyList[0].vehicleID
        // }catch (e) {
        //
        // }
        // this.remark = list.join(',')
        // for(let i in this.checkedValueList){
        //   console.log('11',i)
        //   typeList.push(this.checkedValueList[i].type)
        // }
        // console.log(typeList,item.type)
        // if(typeList.indexOf(item.type)==-1&&typeList.length!=0){
        //   alert()
        //   this.checkedList.splice(this.checkedList.indexOf(item.id),1)
        //   return
        // }

      },
      calculateMoney(){
        let num = 0
        for(let i in this.detailedList){
          if(this.detailedList[i].invoiceAmount!=null){
            num=accAdd(num,this.detailedList[i].invoiceAmount)
          }
        }
        this.invoiceMoney = Number(num).toFixed(2)
        // invoiceMoney
      },
      getInvoiceAll(){
        this.ajaxJson({
          url: '/Basic/getInvoiceAll',
          loading:'0',
          data: {
            category: "0",
            id: this.paymentid,
            init: false,
            searchStr: "",
          },
          call: (param) => {
            if(param){
              if(param.content.length==1){
                this.purchaser=param.content[0].unit
                this.purchaserID=param.content[0].unitID
                this.account=param.content[0].account
                this.bank=param.content[0].bank
                this.bankID=param.content[0].bankID
                this.taxNumberOld=param.content[0].taxNumber
                this.taxNumber=param.content[0].taxNumber
              }
            }
          }
        })
      },
      initDate(){
        this.ajaxJson({
          url: '/fix/fixOrder/getTotalMoney',
          data: {
            orderList:JSON.parse(sessionStorage.offlineWorlOrderTicketFormList)
          },
          call: (data) => {
            if(data){
              // let list = JSON.parse(sessionStorage.offlineWorlOrderTicketForm)
              let vehicleList = []
              this.list = data.fixOrderEntiltyList

              if(data.fixOrderEntiltyList.length!=0){
                for(let w=0; w<data.fixOrderEntiltyList.length; w++){
                  if(vehicleList.indexOf(data.fixOrderEntiltyList[w].vehicle)==-1){
                    vehicleList.push(data.fixOrderEntiltyList[w].vehicle)
                  }
                }
              }
              try{
                this.vehicleID = data.fixOrderEntiltyList[0].vehicleID
              }catch (e) {

              }
              this.remark = vehicleList.join(',')
              this.detailedList = data.detailedList.list.concat() //收支明细详情
              this.preOpenList = data.preOpenList.list //预开数据
              this.actualList = data.actualList.list //实开数据
              // this.purchaser = data.payment//付款公司
              // this.purchaserID = data.paymentid//付款公司id

              this.payment = data.payment//付款公司
              this.paymentid = data.paymentid//付款公司id
              this.amountSum = data.amountSum//材料费
              this.totalMoneySum = data.totalMoneySum//合计金额
              this.receivedMoneySum = data.receivedMoneySum//已收金额
              this.uncollectedMoneySum = data.uncollectedMoneySum//未收金额

              let detailedListCode = []

              if(this.detailedList.length!='0'){
                for(let j in this.detailedList){
                  detailedListCode.push(this.detailedList[j].ordernum)
                }
              }
              // console.log('222',this.detailedList,data.detailedList.list)
              // return
              if(this.preOpenList.length!=0){
              let item = {}
                for(let q in this.list){
                  for(let p in this.preOpenList){
                    console.log(detailedListCode,this.list[q].otherCode)
                    // detailedListCode.indexOf(this.list[q].otherCode)==-1&&
                    if(this.list[q].otherCode==this.preOpenList[p].ordernum&&Number(this.list[q].orderreceivedMoney)!=Number(this.list[q].totalMoney)){
                      item = {}
                      item.id = this.list[q].id//工单id
                      item.ownerID = this.preOpenList[p].ownerID//工单号
                      item.ordernum = this.list[q].otherCode//工单编号
                      item.money = '0'//收入金额
                      item.type = '1'//预开
                      item.state = ''//闲置字段
                      item.noData = '-----'//预开情况下 无付款方
                      item.vehicle = this.list[q].vehicle//车牌号
                      item.useMoney = this.list[q].finrest//已开金额
                      item.totalMoney = Number(this.list[q].actual)<=0?this.list[q].totalMoney:this.list[q].actual//实际金额小于等于0时使用合计金额
                      item.invoiceAmount = '0'//预计开票金额
                      this.detailedList.push(item)
                      // this.detailedList.push({
                      //   'id':this.list[q].id,//工单id
                      //   'ownerID':this.preOpenList[p].ownerID,//工单号
                      //   'ordernum':this.list[q].otherCode,//工单编号
                      //   'money':'0',//收入金额
                      //   'type':'1',//预开
                      //   'state':'',//闲置字段
                      //   'noData':'-----',//预开情况下 无付款方
                      //   'vehicle':this.list[q].vehicle,//车牌号
                      //   'useMoney':this.list[q].finrest,//已开金额
                      //   'totalMoney':Number(this.list[q].actual)<=0?this.list[q].totalMoney:this.list[q].actual,//实际金额小于等于0时使用合计金额
                      //   'invoiceAmount':'0',//预计开票金额
                      // })
                    }
                  }
                }
                // if(data.invoiceType=='1'){
                //   for(let q in this.list){
                //     for(let p in this.preOpenList){
                //       if(this.list[q].id==this.preOpenList[p].ownerID){
                //         this.detailedList.push({
                //           'id':this.list[q].id,//工单id
                //           'ownerID':this.preOpenList[p].ownerID,//工单id
                //           'ordernum':this.list[q].otherCode,//工单号
                //           'money':'0',//收入金额
                //           'type':'1',//预开
                //           'state':'',//闲置字段
                //           'noData':'-----',//预开情况下 无付款方
                //           'vehicle':this.list[q].vehicle,//车牌号
                //           'useMoney':this.list[q].finrest,//实开金额
                //           'totalMoney':this.list[q].totalMoney,//合计金额
                //           'invoiceAmount':'0',//预计开票金额
                //         })
                //       }
                //     }
                //   }
                //
                // }
              }else{
                for(let q in this.list){
                  this.detailedList.push({
                    'id':this.list[q].id,//工单id
                    'ownerID':this.list[q].id,//闲置字段
                    'ordernum':this.list[q].otherCode,//工单号
                    'money':'0',//收入金额
                    'type':'1',//预开
                    'state':'',//闲置字段
                    'noData':'-----',//预开情况下 无付款方
                    'vehicle':this.list[q].vehicle,//车牌号
                    'useMoney':this.list[q].finrest,//实开金额
                    'totalMoney':Number(this.list[q].actual)<=0?this.list[q].totalMoney:this.list[q].actual,//实际金额小于等于0时使用合计金额
                    // 'totalMoney':this.list[q].totalMoney,//合计金额
                    'invoiceAmount':'0',//预计开票金额
                  })
                }


              }

              console.log('111',this.detailedList)


              for(let i in this.detailedList){
                this.detailedList[i].num = Number(i)+1
                if(this.detailedList[i].type!='0'){
                  this.detailedList[i].invoiceAmount = (Number(this.detailedList[i].totalMoney)-Number(this.detailedList[i].useMoney))+''
                  this.detailedList[i].noEdit = this.detailedList[i].invoiceAmount=='0'?'1':''
                }
              }
              this.ajaxJson({
                url: '/Bill/openInvoiceForm',
                // loading:'0',
                data: {
                  ownerID:'',
                  ownerCategory:this.ownerCategory,
                  purchaserType:'',
                  purchaserID:''
                },
                call: (data) => {
                  if(data) {
                    this.category = data.categoryPsd.value//开票类型
                    this.categoryList = [
                      data.categoryPsd.list[0]
                    ]//开票类型
                    this.invoiceCategory = data.invoiceCategoryPsd.value//发票类型
                    this.invoiceCategoryList = data.invoiceCategoryPsd.list//发票类型
                    this.isReceivables = data.isReceivablesPsd.value//款项状态
                    this.isReceivablesList = data.isReceivablesPsd.list//款项状态
                    this.invoiceHandle = data.invoiceHandlePsd.value//发票处理
                    this.invoiceHandleList = data.invoiceHandlePsd.list//发票处理
                    // this.purchaserType=data.purchaserTypePsd.value//发票抬头
                    // this.purchaserTypeList=data.purchaserTypePsd.list//发票抬头


                    for (let i in this.invoiceCategoryList) {//去除机动车销售统一发票
                      if (this.invoiceCategoryList[i].showName == '机动车销售统一发票') {
                        this.invoiceCategoryList.splice(i, 1)
                        this.invoiceCategory = this.invoiceCategoryList[0].num
                      }
                    }
                    this.purchaserType = '0'
                    let list = JSON.parse(sessionStorage.offlineWorlOrderTicketFormList)
                    if(list.length>1){
                      this.purchaserTypeList = [
                        {
                          code: "#5b0adc",
                          img: "",
                          num: "0",
                          showName: "外单位",
                        },
                        {
                          code: "#5b0adc",
                          img: "",
                          num: "1",
                          showName: "私人",
                        }
                      ]
                    }else if(list.length==1){
                      this.purchaserTypeList = [
                        {
                          code: "#5b0adc",
                          img: "",
                          num: "0",
                          showName: "外单位",
                        },
                        {
                          code: "#5b0adc",
                          img: "",
                          num: "1",
                          showName: "私人",
                        },
                        {
                          code: "#333",
                          img: "",
                          num: "2",
                          showName: "车牌号",
                        }
                      ]
                    }

                    this.calculateMoney()

                  }
                }
              })
            }


            for(let j = this.detailedList.length - 1; j >= 0; j--){//删除未开金额为0的数据
              let item = this.detailedList[j]
              let money = item.type=='1'?(Number(item.totalMoney)-Number(item.useMoney)):(Number(item.money)-Number(item.useMoney))
              if(Number(money)==0){
                this.detailedList.splice(j,1)
              }
            }
            setTimeout(()=>{
              for(let y = this.checkedValueList.length - 1; y >= 0; y--) {//删除选中的数据
                let item = this.checkedValueList[y]
                let money = item.type=='1'?(Number(item.totalMoney)-Number(item.useMoney)):(Number(item.money)-Number(item.useMoney))
                if(Number(money)==0){
                  this.checkedValueList.splice(y,1)
                }
              }
              for(let i in this.detailedList){
                this.arrType.push(this.detailedList[i].type)
              }

            },0)
            this.$nextTick(()=>{
              if(this.arrType.indexOf('0')==-1&&this.arrType.indexOf('1')!=-1){
                this.allPitchOn(1)
                this.invoiceType = '1'
              }else if(this.arrType.indexOf('0')!=-1&&this.arrType.indexOf('1')==-1){
                this.allPitchOn(0)
                this.invoiceType = '0'
              }else{
                this.allPitchOn(1)
              }
            })

          }
        })
      }
    },
    created () {
      this.initDate()
      this.person = sessionStorage.getItem('____currentUser')
      this.personID = sessionStorage.getItem('____currentUserID')
      this.applyDate = formatDate(new Date())
      // this.$nextTick(()=>{//页面渲染完成后禁止点击
      //   let allCheckbox = $("input[name='checkbox']").not("input:checked")
      //   for(let y=0; y<allCheckbox.length; y++){
      //     allCheckbox[y].disabled=true
      //   }
      // })
    }
  }
</script>

<style lang="less" scoped>
  .checkbox{
    width: 38px;
    height: 34px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .checkbox input[type=checkbox] {
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
  .preOpening{
    display: none;
  }
  .realOpen{
    display: none;
  }
</style>
