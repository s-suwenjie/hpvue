<template>
  <div class="f_main">
    <yhm-formbody>
      <template #title>收寄物信息</template>
      <template #control>
        <yhm-form-radio title="收寄物类型" width="1" :select-list="receiptTypeList" @call="receiptTypeCall()" :value="receiptType" id="receiptType" ></yhm-form-radio>
        <yhm-form-text placeholder=""  v-if="isReceiptType" title="收寄物内容" subtitle="" :value="receiptContent" id="receiptContent"></yhm-form-text>
        <yhm-form-list-edit v-else>
          <template #title>收寄物内容</template>
          <template #operate>
            <yhm-commonbutton  value="添加文件" icon="btnAdd" @call="addDiscount"></yhm-commonbutton>
          </template>
          <template #listHead>
            <yhm-managerth style="width: 200px" title="文件名称"></yhm-managerth>
            <yhm-managerth style="width: 200px" title="文件编号"></yhm-managerth>
            <yhm-managerth style="width: 200px" title="文件数量"></yhm-managerth>
            <yhm-managerth title="文件备注"></yhm-managerth>
            <yhm-managerth style="width: 40px" title="删除"></yhm-managerth>
          </template>
          <template #listBody>
            <tr v-for="(item,index) in detailsList" :key="index" :class="{InterlacBg:index%2!==0}">
              <yhm-form-td-textbox width="200" :list="detailsList" listid="detailsList" :value="item" id="name" rule="R0000"></yhm-form-td-textbox>
              <yhm-form-td-textbox width="200" :list="detailsList" listid="detailsList" :value="item" id="number" rule="R0000"></yhm-form-td-textbox>
              <yhm-form-td-textbox width="200" :list="detailsList" listid="detailsList" :value="item" id="detailNumber" rule="R0000"></yhm-form-td-textbox>
              <yhm-form-td-textbox width="310" :list="detailsList"  listid="detailsList" :value="item" id="remark"></yhm-form-td-textbox>
              <yhm-form-td-delete :must="1" width="40" :list="detailsList"  listid="detailsList" :value="item" :del-click="true" @click="delDiscount(index,item)"></yhm-form-td-delete>
            </tr>
          </template>
        </yhm-form-list-edit>
        <yhm-form-text placeholder=""  title="数量" subtitle="" :value="quantity" id="quantity"></yhm-form-text>
      </template>
    </yhm-formbody>

    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn>
        <yhm-commonbutton value="保存" icon="btnSave" :flicker="true" @call="save()"></yhm-commonbutton>

      </template>
    </yhm-formoperate>
  </div>
</template>

<script>
  import { formmixin } from '@/assets/form.js'
  import { accMul, accAdd, guid, formatDate, number2chinese,formatTime ,formatPhone, formatIdNo,} from '@/assets/common.js'
  export default {
    name: 'expressDeliveryItems',
    mixins: [formmixin],
    data(){
      return{
        id:'',
        letterClassificationList:[], // 信函分类
        letterClassification:'',
        letterTypeList:[], //信函类别
        letterType:'',
        orderOnlineList:[], //
        orderOnline:'',
        courierCompanyList:[], //信函类型
        courierCompany:'',
        receiptTypeList:[],//收寄物类型
        receiptType:'',
        settlementStatusList:[],
        settlementStatus:'',
        settlementMethodList:[],//结算方式
        settlementMethod:'',
        reimbursementList:[], //是否报销
        reimbursement:'',
        paymentStatusList:[],//付款状态
        paymentStatus:'',
        signStatusList:[],//签收状态
        signStatus:'',
        reimbursementStatusList:[],//报销状态
        reimbursementStatus:'',
        sendTime:formatDate( new Date((new Date()).getTime())),//签收日期
        letterNumber:'',//信函单号
        inquiryURL:'',//查单网址
        inquiryPhone:'',//查单电话
        senderUnitID:'',//寄件人信息公司名称
        agentID:'',//寄件人信息经办人
        senderAddress:'',//寄件人信息地址
        senderPersonID:'',//寄件人信息寄件人
        senderPhone:'',//寄件人信息电话
        senderPostcode:'',//寄件人信息编码
        senderCellPhone:'',//寄件人信息手机号
        senderOrigin:'',//寄件人信息原寄地
        senderOriginCode:'',//寄件人信息原寄地代码
        recipientUnitID:'',//收件人信息公司名称
        recipientAddressID:'',
        recipientAddress:'',//收件人信息地址
        recipientPersonID:'',//收件人信息收件人
        recipientPhone:'',//收件人信息电话
        recipientPostcode:'',//收件人信息编码
        recipientCellPhone:'',//收件人信息手机号
        recipientDestination:'',//收件人信息目的地
        recipientCode:'',//收件人信息目的地代码
        receiptContent:'',//收寄物内容
        quantity:'',//收寄物信息数量
        billingNumber:'',//费用及支付信息数量
        billingWeight:'0.00',//费用及支付信息重量
        cost:'',//费用及支付信息费用
        storedNumber:'',//储值卡号
        useMoney:'',//本次扣除后剩余金额
        monthlyAccount:'',//月结账户
        accumulationMoney:'',//连同本次累计金额
        signTime:'',//签收日期
        confirmPersonID:'',//确认人
        signPersonID:'',//签收人
        confirmTime:'',//确认日期
        senderAddressID:'',
        senderAddressName:'',
        isLetter:false,
        isLetterEdit:'',
        detailsList:[],
        isReceiptType:true,
        name:'',
        number:'',
        quantity:'',
        remark:'',
      }
    },
    methods:{

      save(){
        if (this.receiptType!=1){
          this.detailsList=[]
        }
        let params={
          id:this.id,
          does_ownerID:this.ownerID,
          does_senderPersonID:this.senderPersonID,
          does_receiptType:this.receiptType,
          does_receiptContent:this.receiptContent,
          detailsList:this.detailsList,
          does_quantity:this.quantity,
        }

        this.ajaxJson({
          url: '/dailyoffice/expressDelivery/insertDoes',
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
            }else{
              this.$dialog.alert({
                alertImg:'warn',
                tipValue: data.message
              })
            }
          }
        })
      },
      receiptTypeCall(){
        if (this.receiptType==1){
          this.isReceiptType=false
        } else {
          this.isReceiptType=true
        }
      },
      /* 优惠信息 */
      addDiscount(){
        let index = this.detailsList.length+1
        let insertDate = new Date(accAdd(new Date().getTime(), accMul(this.detailsList.length, 1000)))
        this.detailsList.push({
          id: guid(),
          insertDate: formatTime(insertDate),
          ownerID: this.id,
          name:this.name,
          number:this.number,
          detailNumber:this.detailNumber,
          remark: this.remark,
        })
        this.quantity=index
      },
      delDiscount(index,item){
        this.$dialog.alert({
          tipValue: '删除成功！！！',
          closeCallBack: ()=>{
            this.detailsList.splice(index, 1)
            if(this.detailsList.length === 0){
              this.addDiscount()
            }
          }
        })
      },
    },
    created(){
      this.setQuery2Value('ownerID')
      this.setQuery2Value('id')
      this.setQuery2Value('senderPersonID')
      let url=''
      if (this.id==''){
         url='/dailyoffice/expressDelivery/initForm'
      } else {
         url='/dailyoffice/expressDelivery/getDoesByID'
      }
      this.init({
        url: url,
        all: (data) => {
          this.addDiscount()
          this.receiptTypeList = data.receiptTypePsd.list
          this.receiptType  = data.receiptTypePsd.value
        },
        add: (data) => {
          /* 需要添加的数据 */
        },
        look: (data) => {
          /* 需要查看的数据 */

            this.owerID=data.does_ownerID
            this.senderPersonID=data.does_senderPersonID
            this.receiptType=data.does_receiptType,
            this.receiptContent=data.does_receiptContent,
            this.detailsList=data.detailsList,
            this.quantity=data.does_quantity
            this.receiptTypeCall()
        }
      })
    }
  }
</script>

<style scoped>

</style>
