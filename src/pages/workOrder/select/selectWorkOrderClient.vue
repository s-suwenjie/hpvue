<template>
  <div class="f_main">
    <yhm-formbody>
      <template #title>基本信息</template>
      <template #control>
<!--        <yhm-form-select  title="负责人" tip="value" @click="principalEvent" :value="principal" id="principal" rule="R0000"></yhm-form-select>-->
<!--        <yhm-form-radio  title="客户状态"  @call="stateEvent" width="1" :select-list="stateList" :value="state" id="state"></yhm-form-radio>-->
        <yhm-form-zh-select-text tip-before="value" tip-after="phone" @call="contactEvent" :before="name" before-id="name" :after="phone" after-id="phone" before-rule="#" after-rule="R4000" title="联系人" after-title="手机号码" after-width="100"></yhm-form-zh-select-text>
        <yhm-form-text placeholder="" :no-edit="'1'" tip="value"  title="联系人" subtitle="身份证号" :value="idNo" id="idNo" rule="R0000"></yhm-form-text>
        <yhm-form-select  title="车牌号" tip="value"   @click="plateEvent" :value="plate" id="plate" :rule="isRule"></yhm-form-select>
        <yhm-form-select  title="车主" tip="value" @click="carOwnerEvent" :value="carOwner" id="carOwner" :rule="isRule" :no-click="isEdit" ></yhm-form-select>
        <!--        <yhm-form-upload-image title="行车证信息"  discription="点击图标或拖拽图片上传(不支持PDF格式)" tag="drivingLicense" :value="drivingLicense" id="drivingLicense" rule="#"></yhm-form-upload-image>-->
        <yhm-form-text placeholder=""  title="车架号" subtitle="" :value="frameNumber" id="frameNumber" :rule="isRule"></yhm-form-text>
        <yhm-form-date title="上牌日期"  :value="registerDate" id="registerDate " position="t"  :rule="isRule"></yhm-form-date>
        <yhm-form-text placeholder="" title="发动机号" subtitle="" :value="engineNumber" id="engineNumber" :rule="isRule"></yhm-form-text>
        <yhm-form-textarea  placeholder=""  title="理由" subtitle="" :show="isRemark" :value="remark" id="remark" rule="R0000"></yhm-form-textarea>
        <yhm-formupload :ownerID="vehicleID" :value="fileList"  id="fileList" title="行车证(支持单据)" tag="vehicle" multiple="multiple" category="3"></yhm-formupload>
      </template>
    </yhm-formbody>
    <div class="f_split"></div>
<!--    <yhm-formbody>-->
<!--      <template #title>保险信息</template>-->
<!--      <template #control>-->
<!--        <yhm-form-radio title="往年" subtitle="投保公司"  width="1" :select-list="lastYearUnitList" :value="lastYearUnit" id="lastYearUnit"></yhm-form-radio>-->
<!--        <yhm-form-date title="交强险" subtitle="到期日"  :value="forceEndDate" id="forceEndDate " position="u"  :rule="isRule"></yhm-form-date>-->
<!--        <yhm-form-date title="商业险" subtitle="到期日"  :value="businessEndDate" id="businessEndDate " position="u" >-->
<!--          <div class="formBoxIcon" @click="dateClick">-->
<!--            <span id="capitalType" class="synchronize i-synchronize"></span>-->
<!--          </div>-->
<!--        </yhm-form-date>-->
<!--      </template>-->
<!--    </yhm-formbody>-->

    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn>
        <yhm-commonbutton value="保存" icon="btnSave" :flicker="true" @call="save()"></yhm-commonbutton>
      </template>
    </yhm-formoperate>
  </div>
</template>

<script>
  import { formmixin } from '@/assets/form.js'
  import { guid, formatTime, accAdd, formatDate} from '@/assets/common.js'
  export default {
    name: 'selectWorkOrderClient',
    mixins: [formmixin],
    data(){
      return{
        id:'',
        principal:'', //负责人
        principalID:'', //负责人ID
        state:'0',     //客户状态
        stateList:[],
        contactPersonID:'',//联系人ID
        name:'',      //联系人
        phone:'',      //联系方式
        plate:'',      //车牌号
        carOwner:'',    //车主
        carOwnerID:'',  //车主id
        vehicleID:'',   //车辆id
        drivingLicense:'',  //行车证
        idNo:'',        //身份证
        frameNumber:'',   //车架号
        registerDate:'',  //登记日期
        engineNumber:'',  //发动机号
        lastYearUnit:'',  //投保公司
        lastYearUnitList:[],
        forceEndDate:'',  //交强险到期日
        businessEndDate:'', //商业险到期日
        fileList:[],
        isAssort:'',
        isEdit:false,
        isRule:'R0000',
        isRemark:false,
      }
    },
    methods: {
      stateEvent(){
        if (this.state==0){
          this.isRemark=false
          this.isRule='R0000'
        }else {
          this.isRemark=true
          this.isRule=''
        }

        if(this.state==2){
          let date;
          if (this.forceEndDate!='1900-01-01'){
            date=this.forceEndDate;
            let forceStartDate = new Date(this.forceEndDate).getTime();
            let y = new Date().getFullYear(),
              isLeap = (0===y%4) && (0===y%100) || (0===y%400),
              days = isLeap ? 366 : 365;
            let yearTime =days*24*60*60*1000;
            let newDateTime = formatDate( new Date(accAdd(forceStartDate,yearTime)));
            this.forceEndDate = newDateTime
          } else {
            let forceStartDate = new Date(this.businessEndDate).getTime();
            let y = new Date().getFullYear(),
              isLeap = (0===y%4) && (0===y%100) || (0===y%400),
              days = isLeap ? 366 : 365;
            let yearTime =days*24*60*60*1000;
            let newDateTime = formatDate( new Date(accAdd(forceStartDate,yearTime)));
            this.forceEndDate = newDateTime
          }

          if (this.businessEndDate!='1900-01-01'){
            let EndDate = new Date(this.businessEndDate).getTime();
            let y = new Date().getFullYear(),
              isLeap = (0===y%4) && (0===y%100) || (0===y%400),
              days = isLeap ? 366 : 365;
            let yearTime = days*24*60*60*1000 - 24*60*60*1000;
            let newDateTime = formatDate( new Date(accAdd(EndDate,yearTime)));
            this.businessEndDate = newDateTime;
          }else {
            let EndDate = new Date(date).getTime();
            let y = new Date().getFullYear(),
              isLeap = (0===y%4) && (0===y%100) || (0===y%400),
              days = isLeap ? 366 : 365;
            let yearTime = days*24*60*60*1000;
            let newDateTime = formatDate( new Date(accAdd(EndDate,yearTime)));
            this.businessEndDate = newDateTime;
          }

        }
      },
      dateClick(){
        this.businessEndDate=this.forceEndDate
      },
      //选择车牌号
      plateEvent(){
        let title = '/selectPlate?carOwnerID=' + this.contactPersonID +'&isReule=1&searchStr='+this.searchStr
        if(this.searchStr==''||this.searchStr==undefined){
          title = '/selectPlate?carOwnerID=' + this.contactPersonID +'&isReule=1'
        }
        this.$dialog.OpenWindow({
          width: 950,
          height: 603,
          url: title,
          title: '选择车牌号',
          closeCallBack: (data) => {
            if (data) {
              this.plate = data.plate
              this.isAssort=data.assort
              this.vehicleID = data.id
              this.carOwner=data.carOwner
              this.carOwnerID=data.carOwnerID
              this.registerDate=data.registerDate
              this.frameNumber=data.frameNumber
              this.engineNumber=data.engineNumber
              this.drivingLicense=data.drivingLicense
              let params = {
                id:this.vehicleID,
              }
              this.ajaxJson({
                url: '/Basic/getVehileFile',
                data: params,
                call: (data) => {
                  this.fileList=data.files
                }
              })

              if(data.carOwnerID !== ''){
                this.isEdit=true
              }else {
                this.isEdit =false
                this.isAssort = 1
              }
            }
          }
        })

      },
      //选择负责人
      principalEvent () {
        this.$dialog.OpenWindow({
          width: 950,
          height: 692,
          url: '/selectPerson?category=0&categoryBefore=1',
          title: '选择联系人',
          closeCallBack: (data) => {
            if (data) {
              this.principalID=data.id
              this.principal = data.name
            }
          }
        })
      },
      //选择车主
      carOwnerEvent () {
        if (this.isAssort === 1){
          this.$dialog.OpenWindow({
            width: 950,
            height: 692,
            url: '/selectPerson?category=1' ,
            title: '选择车主',
            closeCallBack: (data) => {
              if (data) {
                this.carOwnerID= data.id
                this.carOwner = data.name
              }
            }
          })
        }else
        {
          this.$dialog.OpenWindow({
            width: 950,
            height: 692,
            url: '/selectUnit?category=1' ,
            title: '选择车主',
            closeCallBack: (data) => {
              if (data) {
                this.carOwnerID= data.id
                this.carOwner = data.name
              }
            }
          })
        }
      },
      //选择联系人
      contactEvent() {
        this.$dialog.OpenWindow({
          width: 950,
          height: 692,
          url: '/selectPerson?category=1&commonClientUse=1',
          title: '选择联系人',
          closeCallBack: (data) => {
            if (data) {
              // this.carOwnerID=''
              // this.plate = ''
              // this.vehicleID =''
              // this.carOwner = ''
              // this.drivingLicense =''
              // this.frameNumber = ''
              // this.engineNumber = ''
              // this.registerDate = ''
              if (this.carOwnerID ===''){
                this.isEdit =false
              }else {
                this.isEdit =true
              }

              this.contactPersonID=data.id
              this.name = data.name
              this.phone = data.phone
              this.idNo=data.idNo
              if (data.idNo==''){
                this.updataSelectPerson(data.id)
              }


              this.plateAllEvent()
            }
          }
        })
      },
      updataSelectPerson(id){
        this.$dialog.OpenWindow({
          width: 1050,
          height: 692,
          url: '/addPersonForm?id=' + id,
          title: '维护联系人身份证号',
          closeCallBack: (data) => {
            if (data) {
              let params = {
                id: data
              }
              this.ajaxJson({
                url: '/Basic/personVueForm',
                data: params,
                call: (data) => {
                  this.name = data.name
                  this.phone = data.phone
                  this.idNo = data.idNo
                }
              })
            }
          }
        })
      },
      plateAllEvent(){
        this.ajaxJson({
          url: '/Basic/getByPlateAll?id=' + this.contactPersonID,
          call: (data)=>{
            if(data){
              this.carOwnerID=data.carOwnerID
              this.plate=data.plate
              this.vehicleID = data.id
              this.carOwner = data.carOwner
              this.drivingLicense = data.drivingLicense
              this.frameNumber = data.frameNumber
              this.engineNumber = data.engineNumber
              this.registerDate = data.registerDate
              this.fileList=data.files
              if(data.carOwnerID !== ''){
                this.isEdit=true
              }else {
                this.isEdit =false
                this.isAssort = 1
              }
              // if (data.length ===1){
              //  for(let i in data){
              //
              //    this.carOwnerID=data[i].carOwnerID
              //    this.plate = data[i].plate
              //    this.vehicleID = data[i].id
              //    this.carOwner = data[i].carOwner
              //    this.drivingLicense = data[i].drivingLicense
              //    this.frameNumber = data[i].frameNumber
              //    this.engineNumber = data[i].engineNumber
              //    this.registerDate = data[i].registerDate
              //

              //  }
              // }
            }

          }
        })
      },
      //添加
      save () {

        if (this.validator()) {
          let params = {
            // id: this.id,
            // insertDate:this.registerDate,  //登记日期
            // principalID:this.principalID, //负责人ID
            // contactPersonID:this.contactPersonID,//联系人ID
            // vehicleID:this.vehicleID,   //车辆id
            // lastYearUnit:this.lastYearUnit,  //投保公司
            // forceEndDate:this.forceEndDate,  //交强险到期日
            // businessEndDate:this.businessEndDate, //商业险到期日
            // state:this.state,     //客户状态
            // category:'1',

            // name:this.name,      //联系人
            // phone:this.phone,      //联系方式
            // plate:this.plate,      //车牌号
            // carOwner:this.carOwnerID,    //车主
            // drivingLicense:this.drivingLicense,  //行车证
            // idNo:this.idNo,                  //身份证
            // frameNumber:this.frameNumber,   //车架号
            // engineNumber:this.engineNumber,  //发动机号
            // remark:this.remark,
            // files:this.fileList,






            id: this.id,
            category:'1',
            principalID:'', //负责人ID
            state:this.state,     //客户状态
            contactPersonID:this.contactPersonID,//联系人ID
            name:this.name,      //联系人
            phone:this.phone,      //联系方式
            plate:this.plate,      //车牌号
            carOwner:this.carOwnerID,    //车主
            vehicleID:this.vehicleID,   //车辆id
            idNo:this.idNo,                  //身份证
            frameNumber:this.frameNumber,   //车架号
            registerDate:this.registerDate,  //登记日期
            engineNumber:this.engineNumber,  //发动机号
            lastYearUnit:'0',  //投保公司
            forceEndDate:'1900-01-01 00:00:00',  //交强险到期日
            businessEndDate:'1900-01-01 00:00:00', //商业险到期日
            remark:'',
            files:this.fileList,

          }
          this.ajaxJson({
            url: '/Insurance/saveClient',
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
        }
      }
    },
    created () {
      this.setQuery2Value('searchStr')
      this.init({
        url: '/Insurance/initClientForm',
        all: (data) => {
          this.stateList = data.statePsd.list
          this.state = data.statePsd.value
          this.lastYearUnitList = data.lastYearUnitPsd.list
          // this.lastYearUnit = data.lastYearUnitPsd.value


          this.principal=this.createName
          this.principalID=data.personID
        },
        add: (data) => {
          /* 需要添加的数据 */
        },
        look: (data) => {
          /* 需要查看的数据 */

          this.principalID =data.principalID //负责人ID
          this.principal= data.principal //负责人
          this.contactPersonID =data.contactPersonID//联系人ID
          this.name =data.name      //联系人
          this.phone =data. phone    //联系方式
          this.plate =data. plate     //车牌号
          this.carOwner=data.carOwner  //车主
          this.carOwnerID=data.carOwnerID  //车主
          this.vehicleID =data.vehicleID   //车辆id
          this.drivingLicense =data.drivingLicense  //行车证
          this.idNo =data.idNo               //身份证
          this.frameNumber =data.frameNumber  //车架号
          this.registerDate =data.registerDate //登记日期
          this.engineNumber =data.engineNumber //发动机号
          // this.forceEndDate =data.forceEndDate //交强险到期日
          // this.businessEndDate =data.businessEndDate//商业险到期日
          this.remark=data.remark
          this.fileList=data.files

          if (data.carOwnerID != ''){
            this.isEdit=true
          }
          if (this.state==4||this.state==1){
            this.isRule=''
          }else{
            this.isRule='R0000'
          }
          if (this.state==0){
            this.isRemark=false
          }else {
            this.isRemark=true
          }
        }
      })
    }
  }
</script>

<style scoped>
  .synchronize:hover{
    color: #49a9ea;
  }
  .synchronize:before{
    font-size: 22px;
  }
</style>
