<template>
    <div class="f_main">
      <div class="i-left fs48b colorFFF lftSwitchArrow" title="上一条" v-show="isLeftID"  @click="strip('left')"></div>
      <div class="i-right fs48b colorFFF rgtSwitchArrow" title="下一条" v-show="isRightID" @click="strip('right')"></div>

      <yhm-formbody>
          <template #title>基本信息</template>
          <template #control>
            <yhm-form-drop-down-select title="欠款方" width="1" @select="selectUnit" :select-list="unitOrPersonList.list" :selectValue="unitOrPerson" selectid="unitOrPerson" :value="ownerName" id="ownerName" rule="R0000"></yhm-form-drop-down-select>
            <yhm-form-select title="负责人" @click="salesmanSelect" :value="principal" id="principal" rule="R0000"></yhm-form-select>
            <yhm-form-radio title="来源" :no-edit="type=='2'?true:false" :select-list="receivableSourceList.list" :value="receivableSource" id="receivableSource"></yhm-form-radio>
            <yhm-form-radio title="核销类型" :select-list="writeOffTypeList.list" :value="writeOffType" id="writeOffType"></yhm-form-radio>

            <yhm-form-text title="欠款金额" tip="money" before-icon="rmb" :value="money" id="money" rule="R1800"></yhm-form-text>
            <yhm-form-date title="欠款" subtitle="发生日期" :max="currentDate" :max-year="Number(currentDate.slice(0,4))" :value="workDate" id="workDate" rule="R0000"></yhm-form-date>
            <yhm-form-date title="预计" subtitle="收款日期" :min="currentDate" :min-year="Number(currentDate.slice(0,4))" :value="collectMoneyDate" id="collectMoneyDate" rule="R0000"></yhm-form-date>
            <yhm-form-textarea title="事件说明" :value="remark" id="remark" rule="R0000"></yhm-form-textarea>
            <yhm-formupload :ownerID="id" :value="fileList" id="fileList" title="" tag="receivable" multiple="multiple"></yhm-formupload>
            <!--            <yhm-form-date title="发票" subtitle="开具日期" :no-edit="true" :value="openDate" id="openDate" rule="R0000"></yhm-form-date>-->
          </template>
        </yhm-formbody>
        <div class="f_split"></div>
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
    name: 'receivableForm',
    mixins: [formmixin],
    data(){
      return {
        id: '',
        currentDate: formatDate(new Date()),//当前日期
        ownerName: '',//对方姓名  或  单位
        ownerID: '',//欠款方ID
        money: '',//欠款方金额
        workDate: '',//欠款发生日期
        invoiceID: '',//发票开具日期
        collectMoneyDate: '',//预计收款日期
        principal: '',//负责人
        principalID: '',//负责人ID
        isFinish: '',//是否收款
        remark:'',//事件说明
        openDate: formatDate(new Date()),//发票开具日期
        isFinishList: {
          list: [
            {
              code: "#804000",
              img: "26eff2da-7ab2-4fc2-8c7f-771967be17be.png",
              num: "0",
              showName: "是"
            },
            {
              code: "#0080c0",
              img: "a5f9bda9-c972-4c48-9d5c-6a2e84222669.png",
              num: "1",
              showName: "否",
            }
          ],
          value: ''
        },
        writeOffTypeList:[],//核销类型
        writeOffType:'',
        unitOrPersonList:[],
        unitOrPerson:'',
        receivableSourceList:{},
        receivableSource:'',
        fileList:[],
        ID:'',
        index:0,
        debtorType:'0',
        isRightID:false,
        isLeftID:false,
      }
    },
    methods:{
      strip(val){//点击左右按钮时
        if(this.type!='1'){
          this.switchover()
          return
        }
        let selectList = JSON.parse(sessionStorage.receivablesFormSelectValue)//选中的数据的id
        if(selectList.length>0){
          this.isRightID = true
        }else{
          this.isRightID = false
        }
        if(selectList.length==1){
          this.isRightID = false
          this.isLeftID = false
        }
        let a =selectList.indexOf(this.ID)
        if(a!=-1){//如果当前数据id不在全部id中的最前或者最后时 显示左右按钮
          if(a!=0||a!=selectList.length-1){
            this.isLeftID = true
            this.isRightID = true
          }
        }
        if(val=='right'){
          this.index++
          if(this.index==selectList.length-1){
            this.isRightID = false
          }else{
            this.isRightID = true
          }
        }else if(val=='left'){
          this.index--
          if(this.index==0){
            this.isLeftID = false
          }else{
            this.isLeftID = true
          }
        }
        this.switchover()
      },
      switchover (){
        setTimeout(()=>{
          if(this.type=='1'){//等于1的时候代表是从选中信息进来的
            let selectList = JSON.parse(sessionStorage.receivablesFormSelectValue)//选中的数据的id
            this.ID=selectList[this.index]
          }else{
            this.setQuery2Value('ID')
          }
          this.initData()
        },0)

      },
      //选择负责人
      salesmanSelect(){
        this.$dialog.OpenWindow({
          width: '950',
          height: '700',
          url: '/selectPerson?category=0&categoryBefore=1',
          title: '选择负责人',
          closeCallBack: (data) => {
            if (data) {
              this.principal = data.name
              this.principalID = data.id
            }
          }
        })
      },
      //对方 单位或个人
      selectUnit (op) {
        if(this.unitOrPerson === '0'){
          this.$dialog.OpenWindow({
            width: '950',
            height: '700',
            url: '/selectUnit?category=1&categoryBefore=1',
            title: '选择单位信息',
            closeCallBack: (data) => {
              if (data) {
                this.ownerName = data.name
                this.ownerID = data.id
                this.debtorType = '0'
              }else{
                this.unitOrPerson = this.debtorType
                //说明没有选中需要重置类型
              }
            }
          })
        }else{
          this.$dialog.OpenWindow({
            width: '950',
            height: '700',
            url: '/selectPerson?category=0',
            title: '选择联系人信息',
            closeCallBack: (data) => {
              if (data) {
                this.ownerName = data.name
                this.ownerID = data.id
                this.debtorType = '1'
              }else{
                this.unitOrPerson = this.debtorType
                //说明没有选中需要重置类型
              }
            }
          })
        }
      },
      initData(){
        let params = {
          id:this.ID
        }
        let a = true
        if(this.ID==''){
           a =false
        }else{
          a = true
        }
        this.init({
          url: '/finance/receivableDetail/initForm',
          data: params,
          all: (data)=>{
          },
          add: (data)=>{
            this.receivableSourceList = data.receivableSourceList
            this.receivableSource = data.receivableSourceList.value
            this.unitOrPersonList = data.unitOrPersonList
            this.unitOrPerson = data.unitOrPersonList.value
            this.writeOffTypeList = data.writeOffTypeList
            this.writeOffType = data.writeOffTypeList.value

            if(a){
              this.id=data.id,
              this.ownerName=data.ownerName,
              this.ownerID=data.ownerID,
              this.principal=data.principal,
              this.principalID=data.principalID,
              this.money=data.money,//欠款方金额
              this.receivableSource=data.receivableSource,//收入来源
              this.receivableSourceID=data.receivableSourceID,
              this.workDate=data.workDate.slice(0,10),//欠款发生日期
              this.collectMoneyDate=data.collectMoneyDate.slice(0,10),//预计收款日期
              this.unitOrPerson=data.unitOrPerson,
              this.remark = data.remark
            }
          },
          look: (data)=>{
          }
        })
      },
      save(){
        let a = this.validator()
        if(a&&this.money.toString().indexOf('-')==-1){//二次验证金额不能为负数
          let params = {
            id:this.id,
            ownerName:this.ownerName,
            ownerID:this.ownerID,
            principal:this.principal,
            principalID:this.principalID,
            money:this.money,//欠款方金额
            receivableSource:this.receivableSource,//收入来源
            receivableSourceID:'',
            writeOffType:this.writeOffType,//核销类型
            workDate:this.workDate+' 00:00:00',//欠款发生日期
            // openDate:this.openDate+' 00:00:00',//发票开具日期
            collectMoneyDate:this.collectMoneyDate+' 00:00:00',//预计收款日期
            unitOrPerson:this.unitOrPerson,
            fileList:this.fileList,
            remark:this.remark
          }
          this.ajaxJson({
            url: '/finance/receivableDetail/save',
            data: params,
            call: (data)=>{
              if(data.type === 0){
                this.$dialog.setReturnValue(this.id)
                this.$dialog.alert({
                  tipValue: data.message,
                  closeCallBack: ()=>{
                    if(this.type=='2'){
                      this.$dialog.close()
                    }
                    // this.$dialog.close()
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
        }
      }
    },
    created () {
      this.setQuery2Value('type')
      this.strip()

    }
  }
</script>

<style scoped>

</style>
