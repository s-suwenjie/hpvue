<template>
  <div>
    <div class="center">

      <!--<yhm-form-date  title="启用日期  "  :value="time" id="time" position="t" ></yhm-form-date>-->
      <yhm-form-radio title="请选择" @call="call()" ref="storageTypeRadio" subtitle="接收人"  width="1" :select-list="personCategoryList" :value="personCategory" id="personCategory" rule="#" ></yhm-form-radio>
      <div class="flex">
        <span>特斯拉授权钣喷中心姚家园店</span>
        <span>（</span>
        <input placeholder="姓名" style="width: 50px" type="text"  v-model="name">
        <span>）为您</span>
        <input placeholder="车牌号" style="width: 90px"  type="text"  v-model="plate">
        <span>车报价 商业险金额：</span>
        <div class="cashGiveHPinput">
          <input placeholder="商业险金额" style="width: 100px" type="text" v-model="businessMoney">
          <div class="inputRight">￥</div>
        </div>
        <span>（</span>
        <input  placeholder="商业险种" style="width: 200px" type="text"  v-model="businessCategory">
        <span>）</span>
      </div>
      <div class="flex">
        <span>交强险金额：</span>
        <div class="cashGiveHPinput">
          <input  placeholder="交强险金额" style="width: 100px" type="text" v-model="jiaoqiangMoney">
          <div class="inputRight">￥</div>
        </div>
        <span>合计金额：</span>
        <div class="cashGiveHPinput">
          <input placeholder="合计金额" style="width: 100px" type="text" v-model="totalMoney">
          <div class="inputRight">￥</div>
        </div>
        <input placeholder="保险公司" style="width: 100px" type="text" v-model="insuranceUnit">
        <span>现金优惠:</span>
        <div class="cashGiveHPinput">
          <input placeholder="优惠" style="width: 100px" type="text" v-model="discountMoney">
          <div class="inputRight">￥</div>
        </div>
        <span>实收金额:</span>
        <div class="cashGiveHPinput">
          <input placeholder="实收金额" style="width: 100px" type="text" v-model="netReceiptsMoney">
          <div class="inputRight">￥</div>
        </div>
      </div>
      <div class="flex">
        <input  placeholder="赠送信息,没有可不写" style="width: 200px" type="text" v-model="give">
        <span>联系电话：</span>
        <input  placeholder="联系电话" style="width: 100px" type="text" v-model="contactPhone">
        <span>以当日报价为准 支持转账出单</span>
        <input  placeholder="备注:没有可不写" style="width: 300px" type="text" v-model="remark">
      </div>
      <yhm-form-upload-image style="padding-top: 20px;" @call="importEvent" title="报价单" tag="importExcel" discription="建议上传图片(支持单据)" :value="icon" id="icon" ></yhm-form-upload-image>
    </div>
    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn>
        <yhm-commonbutton value="点击预览" class="btnAddSave"  icon="i-previewSMS" @call="previewCall()" color="#0033FF" category="one"></yhm-commonbutton>
        <yhm-preview-sms :value="previewValue" ref="preview" previewTop="-200px" :shade-show="true"></yhm-preview-sms>
        <yhm-commonbutton value="提交" class="btnAddSave" :flicker="true" icon="i-sendSMS" @call="save()" color="#AA0022" category="one"></yhm-commonbutton>
      </template>
    </yhm-formoperate>
  </div>
</template>

<script>
  import { formmixin } from '@/assets/form.js'
  import { accMul, accAdd, guid, formatDate, number2chinese,formatTime} from '@/assets/common.js'

  export default {
    name: 'quotationFrom',
    mixins: [formmixin],
    data(){
      return{
        id:'',
        ownerID:'',
        category:'1',
        code:'',  //对应腾讯云的短信模板id
        name:'', //姓名
        plate:'', //车牌号
        personID:'',//联系人还是车主
        businessMoney:'', //商业险金额
        businessCategory:'车损，三者',//商业险种
        jiaoqiangMoney:'',//交强险金额
        totalMoney:'',//合计金额
        insuranceUnit:'',//投保公司
        discountMoney:'',//现金优惠
        netReceiptsMoney:'',//实收金额
        vehiclesVessels:'',//车船税金额
        give:'',//赠送信息
        // code:'',
        contactPhone:'',//联系电话
        remark:'',//备注
        icon:'',
        storeName:'',
        phone1:'',
        personCategoryList:[],
        personCategory:'',
        personPhone:'',
        personID1:'',
        personID2:'',
        details:[],
        codeList:[],
        previewValue:'',
      }
    },
    methods:{
      previewCall(){
        this.previewValue='特斯拉授权钣喷中心姚家园店（'+this.name+'）为您{'+this.plate+'}车报价  商业险金额：'+this.businessMoney+'（'+this.businessCategory+'）交强险金额：'+this.jiaoqiangMoney+' 合计金额： '+this.totalMoney+' '+this.insuranceUnit+'现金优惠：'+this.discountMoney+' 实收金额：'+this.netReceiptsMoney+' '+this.give+' 联系电话：'+this.contactPhone+' 以当日报价为准 支持转账出单 '+this.remark+' 详情戳https://dllzff.cn/xdyofk15 “回T退订”',
        this.$refs.preview.$emit('switch','2')
      },
      call(){
        if (this.personCategory==1){
          this.personPhone=this.phone1
          this.personID=this.personID1
        } else {
          this.personPhone=this.phone2
          this.personID=this.personID2
        }
      },
      importEvent(data){
       this.storeName=data.storeName
      },
      del(){
        let par={
          id:this.id
        }
        this.ajaxJson({
          url: '/Insurance/quotation/del',
          data: par,
          call: (data) => {}
        })
      },
      //添加
      save () {
        this.$refs.storageTypeRadio.$emit('verify')
        if (this.validator() && this.personID!='') {
          let params = {
            id:this.id,
            ownerID:this.ownerID,
            category: this.category,
            personID:this.personID,
            phone:this.personPhone,
            name:this.name,
            plate:this.plate,
            businessMoney:this.businessMoney,
            businessCategory:this.businessCategory,
            jiaoqiangMoney:this.jiaoqiangMoney,
            vehiclesVessels:this.vehiclesVessels,
            totalMoney:this.totalMoney,
            insuranceUnit:this.insuranceUnit,
            discountMoney:this.discountMoney,
            netReceiptsMoney:this.netReceiptsMoney,
            give:this.give,
            contactPhone:this.contactPhone,
            remark:this.remark,
            storeName:this.storeName
            }

          this.ajaxJson({
            url: '/Insurance/quotation/save',
            data: params,
            call: (data) => {
              if (data.type === 0) {
                this.details=[]
                this.details.push(this.name)
                this.details.push(this.plate)
                this.details.push(this.businessMoney)
                this.details.push(this.businessCategory)
                this.details.push(this.jiaoqiangMoney)
                this.details.push(this.totalMoney)
                this.details.push(this.insuranceUnit)
                this.details.push(this.discountMoney)
                this.details.push(this.netReceiptsMoney)
                this.details.push(this.give)
                this.details.push(this.contactPhone)
                this.details.push(this.remark)
                let paramsTemp={
                  ownerID:this.id,
                  category: 0,
                  personID:this.personID,
                  templateID:this.code,
                  phone:this.personPhone,
                  details:this.details

                }
                this.ajaxJson({
                  url: '/sys/smsMessage/sendSmsMessage',
                  data: paramsTemp,
                  call: (data) => {
                    this.details=[]
                    if (data.type === 0) {
                      this.$dialog.setReturnValue(this.id)
                      this.$dialog.alert({

                        tipValue: data.message,
                        closeCallBack: () => {
                          this.$dialog.close()
                        }
                      })
                    }else{
                      this.del()
                      this.$dialog.alert({
                        alertImg:'warn',
                        tipValue: data.message
                      })
                    }
                  },
                  errorCall:() => {
                    this.del()
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
    created(){
      this.setQuery2Value('ownerID')
      let params = {
        id: this.ownerID
      }
      this.init({
        url: '/Insurance/quotation/initForm',
        data: params,
        all: (data)=>{
          this.codeList=data.codePsd.list
          this.contactPhone=data.principalPhone
          for (let i in this.codeList){
            if (this.codeList[i].num==0){
                this.code=this.codeList[i].showName
            }
          }
          this.plate=data.plate
          this.phone1=data.carOwnerPhone
          this.personID1=data.carOwnerID
          this.personID2=data.contactPersonID
          this.phone2=data.phone
          if(this.personID2==''){
            this.personCategoryList= [
              {showName:"车主:"+this.phone1, num: "1", code: "", img: ""},
              // {showName:"联系人:"+this.phone2, num: "2", code: "", img: ""},
            ]
          }else if (this.phone1==''){
            this.personCategoryList= [
              // {showName:"车主:"+this.phone1, num: "1", code: "", img: ""},
              {showName:"联系人:"+this.phone2, num: "2", code: "", img: ""},
            ]
          } else if (this.personID2!='' && this.phone1!=''){

            this.personCategoryList= [
              {showName:"车主:"+this.phone1, num: "1", code: "", img: ""},
              {showName:"联系人:"+this.phone2, num: "2", code: "", img: ""},
            ]
          }


        }
      })
      this.name=this.createName


    },
  }
</script>


<style lang="less" scoped>
  .center{
    margin: auto;
    margin-top: 40px;
    width: 1000px;
    margin: 0 auto;
    margin-top: 30px;
    background-color: #e9e9e9;
    border-radius: 8px;
    border: solid 1px #d9d9d9;
    /*padding:20px;*/
  }
  .cashGiveHPinput{
    position: relative;
    .inputRight{
      position: absolute;
      top: 0;
      right: 8px;
      font-size: 20px;
      line-height: 28px;
      padding-left: 10px;
      background-color: #fff;
    }
  }

  .flex{
    /*width: 500px;*/
    margin-right: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 18px;
    margin-top: 10px;
    span{
      font-size: 14px;
      height: 28px;
      line-height: 28px;
    }
    input{
      height: 28px;
      padding:0 10px;
      border-radius: 5px;
    }
  }
  .flex2{
    width: 712px;
    margin-top: 40px;
  }
  .flex3{
    margin-top: 40px;
  }
</style>
