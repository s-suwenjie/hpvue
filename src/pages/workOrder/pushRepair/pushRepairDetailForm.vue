<template>
  <div class="f_main">
    <yhm-formbody>
      <template #title >基本信息</template>
      <template #control>
<!--        <yhm-form-radio title="费率类型" ref="paytypeRadio" :select-list="paytypeList" :value="paytype" id="paytype" rule="#"></yhm-form-radio>-->
        <yhm-form-date title="签约时间" :value="startDate" id="startDate" rule="R0000"></yhm-form-date>
        <yhm-form-date title="到期时间" :value="endDate" id="endDate" :min="startDate" rule="R0000"></yhm-form-date>
        <yhm-form-radio title="条约类型" :select-list="contracttypeList" :value="contracttype" id="contracttype" rule="#"></yhm-form-radio>
        <yhm-form-radio title="结算类型" ref="typeRadio" :select-list="typeList" :value="type" id="type" rule="#"></yhm-form-radio>
        <yhm-form-text title="自保费率" v-show="contracttype=='0'" :min-number="0" :max-number="100" :value="rate" id="rate" rule="R0000" after-icon="icon-percentage"></yhm-form-text>
        <yhm-form-text title="起始" v-if="contracttype=='1'" subtitle="条约金额" ref="moneyRef" @blur="moneyBlur(startmoney,endmoney)" :value="startmoney" id="startmoney" rule="R0000"></yhm-form-text>
        <yhm-form-text title="结束" v-if="contracttype=='1'" subtitle="条约金额" ref="moneyRef2" @blur="moneyBlur(startmoney,endmoney)" :value="endmoney" id="endmoney" rule="R0000"></yhm-form-text>
        <yhm-form-text title="非自保费率" :min-number="0" :max-number="100" :value="norate" id="norate" rule="R0000" after-icon="icon-percentage"></yhm-form-text>

        <yhm-formupload :ownerID="detailid" :value="fileList" id="fileList" title="上传合同" tag="fixCompany" rule="#"></yhm-formupload>
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
  import { accMul, accAdd, guid, formatTime } from '@/assets/common.js'
  import { formmixin } from '@/assets/form.js'
  export default {
    name: 'pushRepairDetailForm',
    mixins: [formmixin],
    data(){
      return{
        rate:'',//自保费率
        norate:'',//非自保费率
        startDate:'',//有效开始时间
        endDate:'',//有效结束时间
        fileID:'',//合同id
        type:'',//结算日期
        typeList:[],//结算日期
        paytype:'',//费率类型
        paytypeList:[],//费率类型
        fileList:[],//合同文件
        startmoney:'',//起始条约金额
        endmoney:'',//结束条约金额
        contracttype:'0',//条约类型
        contracttypeList:[
          {
            num:'0',
            img:'',
            code:'',
            showName:'普通条约'
          },
          {
            num:'1',
            img:'',
            code:'',
            showName:'累加条约'
          }
        ],
        ownerID:guid(),//主表id
        detailid:guid()
      }
    },
    methods:{
      contractClick(){
        // if(this.contracttype == '0'){
        //   this.norate = ''
        // }else if(this.contracttype == '1'){
        //   this.rate = ''
        // }
      },
      moneyBlur(value,value2){
        if(value!=''&&value2!=''){
          this.ajaxJson({
            url: '/fix/fixCompanyContract/compareInterval',
            data: {
              companyID:this.companyID,
              startmoney:this.startmoney,
              endmoney:this.endmoney,
            },
            loading:'0',
            call: (data) => {
              if (data.type == '1') {
                // this.$refs.moneyRef.error = true
                this.$refs.moneyRef.errorEvent(data.message)
                this.$refs.moneyRef2.errorEvent(data.message)
                // this.$refs.moneyRef2.errorTipMessage = data.message
              }
            }
          })
        }
      },
      save(){
        this.contractClick()
        let a = this.validator()
        this.$refs.typeRadio.$emit('verify')//结算类型
        // this.$refs.paytypeRadio.$emit('verify')//费率类型
        let params = {
          id:this.ownerID,
          unit:this.unit,//推修公司名称
          unitID:this.unitID,//推修公司id
          person:this.person,//联系人名称
          personID:this.personID,//联系人id
          unitshort:this.unitshort,//单位缩写
          fixCompanyContract:{
            param:{
              id:this.detailid,//定损单主表id
              list:this.fileList,//文件
            },
            id:this.detailid,
            companyID:this.ownerID,//主表id
            startmoney:this.startmoney,//起始条约金额
            endmoney:this.endmoney,//结束条约金额
            contracttype:this.contracttype,//条约类型
            state:'0',//状态
            rate:this.rate==''?'0':this.rate,//自保费率
            type:this.type,//结算类型
            norate:this.norate==''?'0':this.norate,//费率类型
            longtime:'1',//特殊字段 默认传1 后端要求
            startDate:this.startDate,//有效开始时间
            endDate:this.endDate,//有效结束时间
            // fileID:this.id,//合同id
          }
          // fileList:[],//合同文件
        }
        console.log(params)
        if(a&&this.type!=''){
          // this.$dialog.setReturnValue(params)
          this.ajaxJson({
            url: '/fix/fixCompany/save',
            data:params,
            call: (data) => {
              if(data.type=='0'){
                this.$dialog.setReturnValue(this.companyID)
                this.$dialog.close();
                // this.$dialog.alert({
                //   tipValue:data.message,
                //   closeCallBack: () => {
                //
                //   }
                // })
              }else{
                this.$dialog.alert({
                  width:'350',
                  alertImg: 'error',
                  tipValue:data.message,
                  closeCallBack: () => {
                  }
                })
              }
            }
          })
        }
      },
      initData () {

        let params = {}
        console.log(this.unit)
        if(this.redact=='1'){
          params = {
            id:this.companyID,//主表id
          }
        }
        this.init({
          url: '/fix/fixCompanyContract/initForm',
          data:params,
          all: (data) => {
            this.typeList = data.typePsd.list
            this.paytypeList = data.paytypePsd.list//推修费率
            if(this.redact=='1'){
              this.rate = data.rate//自保费率
              this.norate = data.norate//非自保费率
              this.startDate = data.startDate//有效期开始时间
              this.endDate = data.endDate//有效期结束时间
              this.fileID = data.fileID//合同id
              this.type = data.type//结算类型
              this.fileList = data.photoList//合同文件
              this.detailid = data.id//子表数据id
              this.ownerID = data.companyID//主表id
            }else{
              this.ownerID = this.companyID//主表id
            }
          },
          add: (data) => {
            /* 需要添加的数据 */
          },
          look: (data) => {

          }
        })
      },
    },
    created () {
      this.setQuery2Value('redact')//为1时是编辑进入的
      this.setQuery2Value('unit')
      this.setQuery2Value('unitID')
      this.setQuery2Value('person')
      this.setQuery2Value('personID')
      this.setQuery2Value('companyID')//redact为1时是编辑 companyID为子表数据id  redact为空时companyID是主表id
      this.setQuery2Value('unitshort')//单位缩写
      this.setQuery2Value('startmoney')
      this.setQuery2Value('endmoney')
      this.setQuery2Value('contracttype')
      this.initData()
    }
  }
</script>

<style scoped>

</style>
