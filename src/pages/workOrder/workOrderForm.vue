<template>
    <div class="f_main" >
      <yhm-formbody>
        <template #title>基本信息</template>
        <template #control>
          <yhm-form-select title="接待人" @click="selectClient" :value="client" id="client" tip="value"></yhm-form-select>

          <!--<yhm-form-select title="负责人" @click="selectUnit" :value="principal" id="principal" tip="value" rule="R0000"></yhm-form-select>-->
          <!--<yhm-form-select title="客服" @click="selectClient" :value="client" id="client" tip="value" rule="R0000"></yhm-form-select>-->
          <yhm-form-select title="车辆" @click="plateEvent" :value="vehicle" id="vehicle" tip="value"></yhm-form-select>
          <yhm-form-text title="联系人" :value="contactPerson" id="contactPerson" no-edit="1"></yhm-form-text>
          <yhm-form-text title="车主" :value="carOwner" id="carOwner" no-edit="1"></yhm-form-text>

          <!--<yhm-form-select title="保险公司" @click="selectSupplierId" :value="subid" id="subid" rule="R0000"></yhm-form-select>-->

          <yhm-form-date title="发生日期" :max="currentDate" :max-year="Number(currentDate.slice(0,4))" :value="workDate" id="workDate" rule="R0000"></yhm-form-date>
          <yhm-form-date title="预计" subtitle="交车时间" :min="currentDate" :min-year="Number(currentDate.slice(0,4))" :value="endDate" id="endDate" rule="R0000"></yhm-form-date>
          <yhm-form-text title="编号" :value="code" id="code" no-edit="1"></yhm-form-text>
          <yhm-form-text title="其它" subtitle="系统编号" :value="otherCode" id="otherCode"></yhm-form-text>
          <yhm-form-radio title="工单来源"  :select-list="orderSourceList.list" :value="orderSource" id="orderSource"></yhm-form-radio>
          <yhm-form-radio title="状态" :select-list="stateList.list" :value="state" id="state"></yhm-form-radio>
          <yhm-form-radio title="业务来源" :select-list="sourceList.list" :value="source" id="source"></yhm-form-radio>
          <!--<yhm-form-radio title="保险公司" width="1" :select-list="subList" :value="sub" @call="subCall" id="sub"></yhm-form-radio>-->
          <!--<yhm-form-radio title="维修类型" :select-list="categoryList.list" :value="category" @call="accessNumber" id="category"></yhm-form-radio>-->
          <yhm-form-radio title="维修类型" :select-list="categoryList.list" @call="callCategory(category)" :value="category+''" id="category"></yhm-form-radio>
          <yhm-form-radio title="保险公司" width="1" :select-list="subList" :value="sub" v-show="subShow" @call="subCall" id="sub"></yhm-form-radio>
          <yhm-form-radio title="适用车型" width="1" :no-edit="true" :select-list="applicableModelsList.list" @call="accessNumber" :value="applicableModels" id="applicableModels"></yhm-form-radio>
          <yhm-form-textarea title="备注" before-icon=" " :value="remark" id="remark"></yhm-form-textarea>
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
  import { accMul, accAdd, guid, formatDate, formatTime } from '@/assets/common.js'
  export default {
    name: 'workOrderForm',
    mixins: [formmixin],
    data(){
      return{
        currentDate: formatDate(new Date()),//当前日期
        principalID:'',//负责人ID
        principal:'',//负责人
        clientID:'',//客服ID
        client:'',//客服
        vehicleID:'',//车辆ID
        vehicle:'',//车辆
        contactPerson:'',//联系人
        carOwner:'',//车主
        code:'',//编号
        otherCode:'',//其它系统编号
        workDate: formatDate(new Date()),//发生日期
        state:'0',//状态
        category:'0',//维修类型
        applicableModels:'0',//适用车型
        sub:'0',//保险公司
        subName:'',//保险公司名称
        subid:'',//保险公司ID
        subCode:'',//保险公司编号
        source:'0',//业务来源
        insurance:'',//备份保险公司选中的值
        subShow:true,//保险公司显示隐藏
        orderSource:'0',//工单来源
        contactPersonID:'',//联系人ID
        carOwnerID:'',//车主ID
        endDate: formatDate(new Date()),//预计交车时间
        remark:'',//备注

        noInvoice:false,
        subList:[],
        sourceList:[],
        orderSourceList:[],
        stateList:[],
        categoryList:[],
        applicableModelsList:[],
        invoiceDetails:[
          {
            code:'958751326',
            currentDate:formatDate(new Date()),
            category:'保险理赔',
            money:'',
            rate:'50',
            rateMoney:''
          },
          {
            code:'568798651',
            currentDate:formatDate(new Date()),
            category:'自费理赔',
            money:'',
            rate:'50',
            rateMoney:''
          }
        ],

      }
    },
    methods:{
      callCategory(category){//定损单类型
        if(category=='1'||category=='2'){
          this.subShow = false
          if(this.sub!=''){
            this.insurance = this.sub.concat()
          }
          this.sub = ''//保险公司
          this.subName = ''//保险公司名称
          this.subid = ''//保险公司ID
          this.subCode = ''//保险公司编号
        }else if(category=='0'){
          this.subShow = true
          this.sub = this.insurance.concat()
          this.subid = this.subList[this.sub].id//保险公司id
          this.subCode = this.subList[this.sub].code//保险公司缩写
          this.subName = this.subList[this.sub].showName//保险公司名称
        }
        // if(this.category == '2'){
        //   this.noInvoice = true
        // }else{
        //   this.noInvoice = false
        // }
      
        this.accessNumber()
      },
      subCall(){
        this.subid = this.subList[this.sub].id
        this.subCode = this.subList[this.sub].code
        this.subName = this.subList[this.sub].showName
        this.accessNumber()
      },
      save(){
        let a = this.validator()
        if(a){
          let params = {
            id:this.id,
            proState:'0',//是否创建主流程表的字段
            principal:this.principal,//负责人
            principalID:this.principalID,//负责人ID
            client:this.client,//客服
            clientID:this.clientID,//客服ID
            vehicle:this.vehicle,//车辆ID
            code:this.code,//编号
            otherCode:this.otherCode,//其它系统编号
            workDate:this.workDate,//发生日期
            category:this.category,//维修类型
            applicableModels:this.applicableModels,//适用车型
            sub:this.sub,//保险公司
            subid:this.subid,//保险公司ID
            state:this.state,//状态
            source:this.source,//业务来源
            orderSource:this.orderSource,//工单来源
            endDate:this.endDate,//预计交车时间
            contactPersonID:this.contactPersonID,//联系人ID
            carOwnerID:this.carOwnerID,//车主ID
            remark:this.remark,//备注
          }
          this.ajaxJson({
            url: '/fix/fixOrder/save',
            data: params,
            call: (data)=>{
              if (data.type === 0) {
                this.$dialog.setReturnValue(this.id) //向父级页面id值
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

      },
      percentage(num, total) {
        num = parseFloat(num);
        total = parseFloat(total);
        if (isNaN(num) || isNaN(total)) {
          return "-";
        }
        return total <= 0 ? "0%" : (Math.round(num / total * 10000) / 100.00)+"%";
      },
      accessNumber(){
        let params ={
          subid:this.subid,
          code:this.subCode,
          category:this.category,
          applicableModels:this.applicableModels
        }
        this.ajaxJson({
          url: '/fix/fixOrder/initWorkOrder',
          loading:'0',
          data: params,
          call: (data) => {
            if(data.type==0){
              this.code = data.message
            }
          }
        })
      },
      //选择客服
      selectClient(){
        this.$dialog.OpenWindow({
          width: '950',
          height: '700',
          url: '/selectPerson?category=0&categoryBefore=1',
          title: '选择客服信息',
          closeCallBack: (data) => {
            if (data) {
              this.client = data.name
              this.clientID = data.id
            }
          }
        })
      },
      //选择车辆
      plateEvent(){
        this.$dialog.OpenWindow({
          width: 950,
          height: 603,
          url: '/selectFormPlate',
          title: '选择车辆号',
          closeCallBack: (data) => {
            if (data) {
              this.vehicle = data.plate
              this.vehicleID = data.id
              this.contactPersonID = data.contactPersonID//联系人ID
              this.carOwnerID = data.carOwnerID//车主ID
              this.contactPerson = data.name//联系人姓名
              this.carOwner = data.carOwner//车主姓名
              let list = this.applicableModelsList.list
              for(let i in list){
                if(list[i].showName==data.brandVal){
                  this.applicableModels = list[i].num
                }
              }
              this.accessNumber()
            }
          }
        })
      },
      //选择负责人
      selectUnit (op) {
        this.$dialog.OpenWindow({
          width: '950',
          height: '700',
          url: '/selectPerson?category=0&categoryBefore=1',
          title: '选择负责人信息',
          closeCallBack: (data) => {
            if (data) {
              this.principal = data.name
              this.principalID = data.id
            }
          }
        })
      },
      initData () {
        let params = {
          id:this.id,
        }
        this.init({
          // data:params,
          url: '/fix/fixOrder/initForm',
          all: (data) => {
            // /* 公共 无论查看和添加返回数据 */
            this.stateList = data.statePsd
            this.categoryList = data.categoryPsd
            this.applicableModelsList = data.applicableModelsPsd
            this.sourceList = data.sourcePsd
            this.orderSourceList = data.orderSourcePsd
            this.subList = data.mapList
            this.insurance = this.sub.concat()
            for(let i in this.subList){
              this.subList[i].num = i
            }

            this.client = sessionStorage.getItem('____currentUser')
            this.clientID = sessionStorage.getItem('____currentUserID')
          },
          add: (data) => {
            /* 需要添加的数据 */
          },
          look: (data) => {
            this.principal = data.principal//负责人
            this.principalID = data.principalID//负责人ID
            this.client = data.client//客服
            this.clientID = data.clientID//客服ID
            this.vehicle = data.vehicle//车辆ID

            this.code = data.code//编号
            this.otherCode = data.otherCode//其它系统编号
            this.workDate = data.workDate//发生日期
            this.category = data.category//维修类型
            this.state = data.state//状态
            this.source = data.source//业务来源
            this.orderSource = data.orderSource//工单来源
            this.endDate = data.endDate//预计交车时间


            this.categoryList = data.categoryPsd
            this.remark = data.remark//备注
          }
        })
      },
    },
    watch:{
      invoiceDetails(val){
      }
    },
    created () {
      this.setQuery2Value('id')
      this.otherCode = 'O' + Math.floor(Math.random()*1000) + 'C' + Math.floor(Math.random()*1000000)
      this.accessNumber()
      this.initData()

    }
  }
</script>

<style scoped>

</style>
