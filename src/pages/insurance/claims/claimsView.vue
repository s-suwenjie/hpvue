<template>
    <div>
      <div class="f_split"></div>
      <yhm-view-body>
        <template #title>基本信息</template>
        <template #body>
          <yhm-view-control title="业务员" :content="operator"></yhm-view-control>
          <yhm-view-control title="我方账户" category="2" :content="account"></yhm-view-control>
          <yhm-view-control title="对方账户" category="2" :content="otherAccount"></yhm-view-control>

          <yhm-view-control title="回款日期" :content="moneyBackDate" type="date"></yhm-view-control>
          <yhm-view-control title="金额" :content="money" type="money" color="#f00"></yhm-view-control>

          <yhm-view-control title="工单号" :content="workOrder"></yhm-view-control>

<!--          <yhm-view-control category="3" title="客户" type="files" :content="customerName"></yhm-view-control>-->
          <yhm-view-control title="车辆品牌" :content="vehicleBrand"></yhm-view-control>
          <yhm-view-control title="车型" :content="vehicleType"></yhm-view-control>
          <yhm-view-control title="车牌号" :content="licensePlateNumber" ></yhm-view-control>

<!--          <yhm-view-control title="发票" :content="invoiceID" ></yhm-view-control>-->
<!--          <yhm-view-control title="图片" :content="engineNumber" ></yhm-view-control>-->

          <yhm-view-control title="银行摘要" :content="bankSummary" ></yhm-view-control>
          <yhm-view-control title="状态" :psd="signStateList" :content="signState"></yhm-view-control>

<!--          <yhm-form-radio style="width: 434px;font-weight: bold;" title="状态" :state-show="true" @call="callState" :select-list="signStateList" :value="signState" id="signState"></yhm-form-radio>-->
<!--          <yhm-form-textarea style="width: 934px;" title="备注" :value="remark" id="remark" ref="remark" ></yhm-form-textarea>-->
          <yhm-view-control title="备注" category="2" :content="remark" ></yhm-view-control>

<!--          <div style="width: 100%;" class="remark">-->
<!--            <div class="remark2">-->
<!--              <span>备注:</span>-->
<!--              <textarea  v-model="remark" :class="{textareaError:errorShow,textarea:!errorShow}" type="text" @blur="stateChange"/>-->
<!--            </div>-->

<!--          </div>-->
<!--          <div class="error">{{error}}</div>-->

        </template>
      </yhm-view-body>

      <div class="f_split"></div>

<!--      <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">-->
<!--        <template #btn>-->
<!--          <yhm-commonbutton value="保存" style="margin-right: 20px" icon="i-edit" :flicker="true" @call="save()"></yhm-commonbutton>-->
<!--        </template>-->
<!--      </yhm-formoperate>-->
    </div>
</template>

<script>
  import { viewmixin } from '@/assets/view.js'

  export default {
    name: 'claimsView',
    mixins: [viewmixin],
    data(){
      return{
        moneyBackDate:'',//回款日期
        money:'',//金额
        account:'',//我方账户
        otherAccount:'',//对方账户
        operator:'',//业务员
        workOrderID:'',//工单号
        workOrder:'',//工单号
        customerName:'',//客户
        vehicleBrand:'',//车辆品牌
        vehicleType:'',//车型
        licensePlateNumber:'',//车牌号
        invoiceID:'',//发票
        bankSummary:'',//银行摘要
        remark:'',//备注
        signState:'0',
        signStateList:[
          {
            code:'',
            num:'0',
            img:'icon-correct iconSignState',
            showName:'正常',
          },
          {
            code:'',
            num:'3',
            img:'icon-correct iconSignState',
            showName:'正常',
          },
          {
            code:'',
            num:'1',
            img:'icon-InterestRW',
            showName:'待核查',
          },
          {
            code:'',
            num:'2',
            img:'icon-delete',
            showName:'异常',
          },
          {
            code:'red',
            num:'4',
            img:'icon-correct iconCorrect',
            showName:'待完善',
          },
        ],
        error:'',
        errorShow:true,
        initializationState:''//初始化状态
      }
    },
    computed:{
      remarkRule(){
        if(this.signState==0){
          return ' '
        }else{
          return 'R0000'
        }
      }
    },
    methods:{
      stateChange(){
        if(this.initializationState>0&&this.signState==0){//初始化状态等于2 变化后的状态为0时
          if(this.remark==''){
            this.error = '请输入修改说明'
            this.errorShow = true
          }else{
            this.error = ''
            this.errorShow = false
          }
        }else if(this.initializationState==0){//初始化状态为0时 走待核查 异常时非空判断
          if(this.signState!=0){
            if(this.remark==''){
              this.error = '不能为空'
              this.errorShow = true
            }else{
              this.error = ''
              this.errorShow = false
            }
          }else{
            this.error = ''
            this.errorShow = false
          }
        }else{
          if(this.signState!=0){
            if(this.remark==''){
              this.error = '不能为空'
              this.errorShow = true
            }else{
              this.error = ''
              this.errorShow = false
            }
          }else{
            this.error = ''
            this.errorShow = false
          }
        }
      },
      callState(index,item){
        this.stateChange()
        if(this.initializationState>0&&this.signState==0) {//初始化状态等于2 变化后的状态为0时
          this.remark = ''
        }
        this.signState = item.num

      },
      save(){
        let params = {
          id: this.id,
          remark: this.remark,
          signState:this.signState//标记
        }
        if(this.initializationState==1&&this.signState==0){//初始化状态等于1 变化后的状态为0时
          if(this.remark==''){
            this.error = '请输入修改说明'
            this.errorShow = true
            return
          }else{
            this.error = ''
            this.errorShow = false
          }
        }else if(this.initializationState==2&&this.signState==0){//初始化状态等于2 变化后的状态为0时
          if(this.remark==''){
            this.error = '请输入修改说明'
            this.errorShow = true
            return
          }else{
            this.error = ''
            this.errorShow = false
          }
        }else if(this.initializationState==0){
          if(this.signState==1||this.signState==2){
            if(this.remark){//不能空时会向下执行请求

            }else{//为空则return 停止向下执行
              return
            }
          }
        }
        if(this.errorShow==true){
          return
        }
        this.ajaxJson({
          url: '/Fin/updateBankDetailInsuranceSignState',
          data: params,
          loading: '0',
          call: (data) => {
            if (data.type === 0) {
              this.$dialog.alert({
                tipValue: data.message,
                closeCallBack: (data)=>{
                  this.$dialog.setReturnValue('1')
                  this.$dialog.close()
                }
              })
            }else{
              this.$dialog.alert({
                alertImg: 'warn',
                tipValue: data.message
              })
            }
          }
        })

      },
      initData(){
        let params = {
          id: this.id
        }
        this.init({
          url: '/Fin/bankDetailInsuranceByID',
          data:params,
          call: (data)=>{
            this.moneyBackDate=data.moneyBackDate//回款日期
            this.money=data.money,//金额
            this.account=data.account,//我方账户
            this.otherAccount=data.otherAccount,//对方账户
            this.operator=data.operator,//业务员
            this.workOrderID=data.workOrderID,//工单号
            this.workOrder=data.workOrder,//工单号
            this.customerName=data.customerName,//客户
            this.vehicleBrand=data.vehicleBrand,//车辆品牌
            this.vehicleType=data.vehicleType,//车型
            this.licensePlateNumber=data.licensePlateNumber,//车牌号
            this.invoiceID=data.invoiceID,//发票
            this.bankSummary=data.bankSummary,//银行摘要
            this.remark=data.remark,//备注
            this.signState=data.signState//状态

            this.initializationState = this.signState.concat()//初始化时的状态

          }
        })
      },
    },
    created () {
      this.setQuery2Value('id')
      this.stateChange()
      this.initData()
    }

  }
</script>

<style lang="less" scoped>
.remark{
  width: 100%;
  /*height: 40px;*/
  /*display: flex;*/
  /*align-items: center;*/
  /*flex-direction: column;*/
  padding: 0 14px;
  box-sizing: border-box;
  color: #666;
  font-size: 14px;
  font-weight: bold;
  .remark2{
    width: 100%;
    span{
      float: left;
      line-height: 52px;
      margin-right: 8px;

    }
    textarea{
      width: 80%;
      height: 50px;
      padding: 5px;
      float: left;
      border-radius: 5px;
      background-color: #FFFFFF;
      border: 1px solid #BFBFBF;
    }
  }


  /*justify-content: center;*/
}
.textareaError{
  border:1px solid red !important;
}
.textarea{
  border: 1px solid #BFBFBF !important;
}
.error{
  color: #FF0000;
  width: 100%;
  height: 20px;
  line-height: 20px;
  padding: 0 54px;
  box-sizing: border-box;
  margin-bottom: 10px;
}
</style>
