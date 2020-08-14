<template>
  <div class="checkBody">
    <div class="checkBg">
    <p class="purchaser">{{purchaser}}</p>
    <p class="registrationNumber">{{registrationNumber}}</p>
    <p class="registrationNumber1">{{registrationNumber1}}</p>

    <p class="vehicleType">{{vehicleType}}</p>
    <p class="vehicleModel">{{vehicleModel}}</p>
    <p class="vehiclePlace">{{vehiclePlace}}</p>
    <p class="vehicleCertificate">{{vehicleCertificate}}</p>
    <p class="vehicleImported">{{vehicleImported}}</p>
    <p class="vehicleInspection">{{vehicleInspection}}</p>
    <p class="vehicleEngine">{{vehicleEngine}}</p>
    <p class="vehicleFrame">{{vehicleFrame}}</p>

    <p class="invoiceMoneyUp icon-delete2">{{invoiceMoneyUp}}</p>
    <p class="invoiceMoney">¥{{invoiceMoney}}</p>
    <p class="name">{{name}}</p>
    <p class="phone">{{phone}}</p>
    <p class="code">{{code}}</p>
    <p class="account">{{account}}</p>
    <p class="address">{{address}}</p>
    <p class="bank">{{bank}}</p>


    <p class="taxRate">{{taxRate}}%</p>
    <p class="taxAmount">¥{{taxAmount}}</p>
    <p class="balance">¥{{balance}}</p>
    <p class="vehicleRide">{{vehicleRide}}</p>
  </div>
    <div>
      <yhm-formbody>
        <template #title>添加发票号</template>

        <template #opera>
          <yhm-commonbutton value="添加发票" icon="btnAdd" @call="addCheckNumEvent()"></yhm-commonbutton>
        </template>
        <template #control>
          <yhm-form-list-edit style="border: none;width: 998px">
            <template #listHead>
              <yhm-managerth style="width: 230px" title="发票号码"></yhm-managerth>
              <yhm-managerth style="width: 160px" title="票面金额"></yhm-managerth>
              <yhm-managerth style="width: 160px" title="税率(%)"></yhm-managerth>
              <yhm-managerth style="width: 160px" title="税额合计"></yhm-managerth>
              <yhm-managerth style="width: 90px" title="发票照片"></yhm-managerth>
              <yhm-managerth style="" title="操作"></yhm-managerth>
            </template>
            <template #listBody>
              <tr v-for="(item,index) in invoiceList" :key="index" :class="{InterlacBg:index%2!==0}">
                <yhm-form-td-textbox width="220" no-edit="1" :list="invoiceList" listid="invoiceList" :value="item" id="code"></yhm-form-td-textbox>
                <yhm-form-td-textbox width="150" no-edit="1" :list="invoiceList" listid="invoiceList" :value="item" id="invoiceMoney"></yhm-form-td-textbox>
                <yhm-form-td-textbox width="150" no-edit="1" :list="invoiceList" listid="invoiceList" :value="item" id="taxRate"></yhm-form-td-textbox>
                <yhm-form-td-textbox width="150" no-edit="1" :list="invoiceList" listid="invoiceList" :value="item" id="taxAmount"></yhm-form-td-textbox>
                <yhm-form-td-upload-image  width="90" :no-upload="isElectronicInvoice" tag="Invoice" @mouseover="invoiceImg(item)" @mouseout="invoiceImgHide(item)" :list="invoiceList" listid="invoiceList" :value="item" id="url" rule="#"></yhm-form-td-upload-image>
                <yhm-form-td-delete width="" :list="invoiceList" :value="item" :del-click="true" @click="delApplyInvoice(index,item)"></yhm-form-td-delete>
              </tr>
            </template>
            <template #empty>
              <span class="m_listNoData" v-show="invoiceList.length===0">暂时没有数据</span>
            </template>
          </yhm-form-list-edit>
        </template>
        <!--<template #control>-->
          <!--<div class="check">-->
            <!--<div class="check_main" v-for="(item,i) in invoiceList">{{item.code}}<span @click="delCheck(item,i)" :class="{'red':deleteTheSwitch}" class="icon delete"></span></div>-->
            <!--<div class="noTableData" v-if="invoiceList.length===0">暂时没有数据</div>-->
          <!--</div>-->
        <!--</template>-->

        <div class="f_split"></div>
      </yhm-formbody>
    </div>
    <div class="invoiceImgView" v-show="viewImgShow">
      <img :src="viewImg" alt="">
    </div>
    <div class="f_split" style="height:70px"></div>
    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn>
        <yhm-commonbutton v-show="type==='0'" value="保存" icon="btnSave" :flicker="true" @call="save()"></yhm-commonbutton>
        <yhm-commonbutton v-show="type==='0'" value="确认开票" icon="btnSave" :flicker="false" bgColor="yellow" @call="post()"></yhm-commonbutton>
      </template>
    </yhm-formoperate>
  </div>
</template>

<script>
  import { formmixin } from '@/assets/form.js'
  import { number2chinese,guid} from '@/assets/common.js'
  export default {
    name: 'openInvoiceTrialVehicle',
    mixins: [formmixin],
    data(){
      return{
        bank:'',
        vehicleCertificate:'',
        vehicleEngine:'',
        vehicleFrame: '',
        vehicleImported:'',
        vehicleInspection:'',
        vehicleModel: '',
        vehiclePlace: '',
        vehicleRide: '',
        vehicleType: '',
        purchaser:'',
        registrationNumber:'',
        registrationNumber1:'',
        invoiceMoney:'',
        invoiceMoneyUp:'',
        name:'',
        phone:'',
        code:'',
        account:'',
        address:'',
        vehicleRide:'',
        taxRate:'',
        taxAmount:'',
        balance:'',
        type:'',
        ownerID:'',
        invoiceList:[],

        invoiceCategory:'',
        deleteTheSwitch:true,
        isElectronicInvoice:false,
        viewImg:'',         //需要显示的发票路径
        viewImgShow:false,  //显示发票图片
      }
    },
    methods: {
      //显示发票图片
      invoiceImg(item){
        if(item.url !== '') {
          this.viewImg = '/UploadFile/Invoice/' + item.url
          this.viewImgShow = true
        }
      },
      //隐藏发票图片
      invoiceImgHide(item){
        if(item.url !== '') {
          this.viewImgShow = false
        }
      },
      delCheck(item,i){
        if(this.deleteTheSwitch){
          this.invoiceList.splice(i,1)
        }
      },
      addCheckNumEvent(){
        let title = '添加发票'
        if(this.invoiceList.length<1){
          this.$dialog.OpenWindow({
            width: '1050',
            height: '800',
            title: title,
            url: '/selectInvoiceDetail?invoiceCategoryBefore=1&invoiceCategory='+this.invoiceCategory+'&state=0&selectType=0',
            closeCallBack: (data) => {
              if(data){
                let list={}
                let date = new Date();
                let strHours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours(); //获取小时,如果小于10,前面补个0
                let strMinutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(); //获取分,如果小于10,前面补个0
                let strSeconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds(); //获取秒,如果小于10,前面补个0
                list.insertDate=(new Date()).toLocaleDateString().replace(/\//g,'-')+' '+strHours+':'+strMinutes+':'+strSeconds
                list.id=guid()
                list.ownerID=this.id
                list.invoiceID=data.id
                list.code=data.code
                list.invoiceMoney=this.invoiceMoney
                list.taxRate=this.taxRate
                list.taxAmount=this.taxAmount+''
                list.url=''
                this.invoiceList.push(list)
              }
            }
          })
        }else{
          this.$dialog.alert({
            tipValue: '发票号已满,无法选择',
            closeCallBack: ()=>{
              // this.$dialog.close()
            }
          })
        }
      },
      save(){
        if(this.invoiceList){
          this.ajaxJson({
            url: '/Bill/invoiceTrialSave',
            data: {
              ownerID:this.ownerID,
              invoiceList:this.invoiceList,
            },
            call: (data) => {
              if (data.type === 0) {
                this.$dialog.setReturnValue(this.id)
                this.$dialog.alert({
                  tipValue: data.message,
                  closeCallBack: ()=>{
                    this.$dialog.close()
                  }
                })
              }else{
                this.$dialog.alert({
                  alertImg: 'error',
                  tipValue: data.message,
                  closeCallBack: ()=>{
                    //this.$dialog.close()
                  }
                })
              }
            }
          })
        }
      },
      post(){
        if(this.invoiceList.length===0){
          this.$dialog.alert({
            alertImg: 'warn',
            tipValue: '请选择发票号'
          })
          return
        }
        if(this.invoiceList&&this.validator()){
          this.$dialog.confirm({
            width: 300,
            tipValue: '确认开票?',
            btnValueOk: '确认',
            alertImg: 'warn',
            okCallBack: () => {
              this.ajaxJson({
                url: '/Bill/invoiceTrialSubmit',
                data: {
                  ownerID:this.ownerID,
                  invoiceList:this.invoiceList,
                },
                call: (data) => {
                  if (data.type === 0) {
                    this.$dialog.setReturnValue(this.id)
                    this.$dialog.alert({
                      tipValue: data.message,
                      closeCallBack: ()=>{
                        this.$dialog.close()
                      }
                    })
                  }else{
                    this.$dialog.alert({
                      alertImg: 'error',
                      tipValue: data.message,
                      closeCallBack: ()=>{
                        //this.$dialog.close()
                      }
                    })
                  }
                }
              })
            }
          })
        }
      },
      initData(){
        let params = {
          ownerID: this.ownerID
        }
        this.init({
          url: '/Bill/invoiceTrial',
          data: params,
          all: (data)=>{
            data=data[0]
            this.bank=data.bank
            this.vehicleCertificate=data.vehicleCertificate
            this.vehicleEngine=data.vehicleEngine
            this.vehicleFrame=data.vehicleFrame
            this.vehicleImported=data.vehicleImported
            this.vehicleInspection=data.vehicleInspection
            this.vehicleModel=data.vehicleModel
            this.vehiclePlace=data.vehiclePlace
            this.vehicleRide=data.vehicleRide
            this.vehicleType=data.vehicleType
            this.registrationNumber=data.registrationNumber
            this.purchaser=data.purchaser
            this.invoiceMoney=data.invoiceMoney
            this.invoiceMoneyUp=number2chinese(data.invoiceMoney)
            this.name=data.name
            this.phone=data.phone
            this.code=data.code
            this.account=data.account
            this.address=data.address
            this.vehicleRide=data.vehicleRide
            this.taxRate=data.taxRate
            this.taxAmount=parseFloat(data.invoiceMoney)*parseFloat(this.taxRate)/100
            this.balance=parseFloat(data.invoiceMoney)-parseFloat(this.taxAmount)
            if(data.purchaserType==='0'){
              this.registrationNumber1=data.registrationNumber
            }
            this.invoiceList=data.invoiceList
            this.invoiceCategory=data.invoiceCategory
            this.id=data.id
          },
          add: (data)=>{
          },
          look: (data)=>{
          }
        })
      }
    },
    created () {
      this.setQuery2Value('ownerID')
      this.setQuery2Value('type')
      this.initData()
    }
  }
</script>

<style scoped>
   .checkBg{
     width: 100%;
     height: 754px;
     background: url("http://hp.yhm.hk/UploadFile/OpenInvoice/InvoiceVehicle.jpg") center center no-repeat;
     position: relative;
   }
   .purchaser {
     position: absolute;
     left: 210px;
     top: 280px;
   }
   .registrationNumber {
     position: absolute;
     left: 210px;
     top: 305px;
   }
   .registrationNumber1 {
     position: absolute;
     left: 700px;
     top: 295px;
   }
   .vehicleModel {
     position: absolute;
     left: 470px;
     top: 340px;
   }
   .vehiclePlace {
     position: absolute;
     left: 810px;
     top: 340px;
   }
   .vehicleType {
     position: absolute;
     left: 210px;
     top: 340px;
   }
   .vehicleCertificate {
     position: absolute;
     left: 210px;
     top: 380px;
   }
   .vehicleImported {
     position: absolute;
     left: 510px;
     top: 380px;
   }
   .vehicleInspection {
     position: absolute;
     left: 810px;
     top: 380px;
   }
   .vehicleEngine {
     position: absolute;
     left: 210px;
     top: 420px;
   }
   .vehicleFrame {
     position: absolute;
     left: 680px;
     top: 420px;
   }
   .invoiceMoney {
     position: absolute;
     left: 770px;
     top: 460px;
   }
   .invoiceMoneyUp {
     position: absolute;
     left: 210px;
     top: 460px;
   }
   .name {
      position: absolute;
      left: 210px;
      top: 500px;
    }
   .phone {
     position: absolute;
     left: 700px;
     top: 500px;
   }
   .code {
     position: absolute;
     left: 210px;
     top: 540px;
   }
   .account {
     position: absolute;
     left: 700px;
     top: 540px;
   }
   .address {
     position: absolute;
     left: 200px;
     top: 580px;
   }
   .bank {
     position: absolute;
     left: 630px;
     top: 580px;
   }
   .taxRate {
     position: absolute;
     left: 210px;
     top: 630px;
   }
   .taxAmount {
     position: absolute;
     left: 390px;
     top: 630px;
   }
   .balance {
     position: absolute;
     left: 250px;
     top: 670px;
   }
   .vehicleRide {
     position: absolute;
     left: 890px;
     top: 670px;
   }
</style>
