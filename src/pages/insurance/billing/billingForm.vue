<template>
  <div class="f_main">
    <yhm-formbody>
      <template #title>基本信息</template>
      <template #control>
        <yhm-form-select  title="车牌号" tip="value"   @click="plateEvent" :value="plate" id="plate" rule="R0000"></yhm-form-select>
        <yhm-form-date title="投保日期" subtitle=""   :value="insuredDate" id="insuredDate " position="t"  rule="R0000"></yhm-form-date>
        <yhm-form-zh-select-text tip-before="value" tip-after="beinsuredidNo" @call="beinsuredEvent" :before="beinsuredName" before-id="beinsuredName" :after="beinsuredidNo" after-id="beinsuredidNo" before-rule="#" after-rule="R0000" title="被保险人" after-title="证件号" after-width="160"></yhm-form-zh-select-text>
        <yhm-form-zh-select-text tip-before="value" tip-after="contactPhone"  @call="contactEvent" :before="contactName" before-id="contactName" :after="contactPhone" after-id="contactPhone" before-rule="#" after-rule="R4000" title="联系人" after-title="手机号码" after-width="160"></yhm-form-zh-select-text>
        <yhm-form-zh-select-text tip-before="value" tip-after="insuredPhone" @call="insuredEvent" :before="insuredName" before-id="insuredName" :after="insuredPhone" after-id="insuredPhone" before-rule="#" after-rule="R4000" title="投保人" after-title="手机号码" after-width="160"></yhm-form-zh-select-text>
        <yhm-form-radio title="与车主关系" subtitle=""  :select-list="relationshipList" :value="relationship" id="relationship"></yhm-form-radio>
        <yhm-form-radio title="投保类型" subtitle=""  width="1" :select-list="insuredTypeList" :value="insuredType" id="insuredType"></yhm-form-radio>
        <yhm-form-radio title="投保渠道" subtitle=""  width="1" :select-list="insuredChannelList" :value="insuredChannel" id="insuredChannel"></yhm-form-radio>
        <yhm-form-check  title="投保项目" @click="Project" submit-value="insuredProject" :select-list="insuredProjectList" :value="insuredProject"  id="insuredProject" rule="#" width="1"></yhm-form-check>
      </template>
    </yhm-formbody>
    <div class="f_split"></div>
    <yhm-formbody>
      <template #title>保险信息</template>
      <template #control>
        <yhm-form-date title="交强险" subtitle="开始日期" @call="forceDate"  v-if="isforceStart" :value="forceStartDate" id="forceStartDate " position="u"  rule="R0000"></yhm-form-date>
        <yhm-form-date title="交强险" subtitle="结束日期" :min="forceStartDate"  v-if="isforceStart" :value="forceEndDate" id="forceEndDate " position="u"  rule="R0000"></yhm-form-date>
        <yhm-form-text placeholder="" v-if="isforceStart" title="交强险金额" subtitle="" @input="isaMoney" :value="forceMoney" id="forceMoney" ></yhm-form-text>
        <yhm-form-text placeholder="" v-if="isvehicle" title="车船税金额" subtitle="" @input="isaMoney" :value="vehicleMoney" id="vehicleMoney" ></yhm-form-text>
        <yhm-form-date title="商业险" subtitle="开始日期" @call="businessDate" v-if="isbusinessStart"  :value="businessStartDate" id="businessStartDate " position="u"  rule="R0000"></yhm-form-date>
        <yhm-form-date title="商业险" subtitle="结束日期" :min="businessStartDate" v-if="isbusinessStart"  :value="businessEndDate" id="businessEndDate " position="u"  rule="R0000"></yhm-form-date>
        <yhm-form-radio title="投保公司" subtitle=""  width="1" :select-list="insuredUnitList" :value="insuredUnit" id="insuredUnit"></yhm-form-radio>

        <yhm-form-select-insurance  title="商业险种" :is-content="true" v-if="isbusinessStart"
                                   :passenger-value="passenger" passenger-id="passenger"
                                   :self-glass-value="selfGlass" self-glass-id="selfGlass"
                                   :specify-value="specify" specify-id="specify"
                                   :car-damage-value="carDamage" car-damage-id="carDamage"
                                   :driver-value="driver" driver-id="driver"
                                   :three-responsibilities-list="threeList" :three-responsibilities-value="three" three-responsibilities-id="three"
                                   :glass-list="glassList" :glass-value="glass" glass-id="glass"
                                   :scratch-list="scratchList" :scratch-value="scratch" scratch-id="scratch"
                                   :psd="commercialList" :value="commercial"  id="commercial" rule="#"></yhm-form-select-insurance>

        <yhm-form-text placeholder="" title="商业险" subtitle="实际金额"  @input="isaMoney" v-if="isbusinessStart" :value="businessMoney" id="businessMoney" ></yhm-form-text>
        <yhm-form-text placeholder="" title="开票金额" subtitle=""  :value="invoicingMoney" id="invoicingMoney" rule="R0000"></yhm-form-text>
        <yhm-form-text placeholder="" title="保费合计" subtitle="" :no-edit="isTotal" :value="premiumsTotal" id="premiumsTotal" ></yhm-form-text>



        <yhm-form-zh-text-two v-if="isbusinessStart"   :before="discountMoney" before-id="discountMoney"  :after="discountCount" @afterblurEvent="calcAfterMoney" @beforeBlur="calcBeforeMoney" after-id="discountCount" title="优惠金额" before-icon="rmb" after-title="优惠点数">

          <div class="formBoxIcon" v-if="isDis" @mouseover="tipChange" @mouseout="tipOut">
            <div  class="cbl_main_prompt tipShow">
              <div class="cbl_main_prompt_content" style="font-size:14px;padding: 0 12px; ">
                {{tipValue}}
                <img src="/UploadFile/m_image/arrow.png" ref="imgRight">
              </div>
            </div>
            <span class="i-yellowWarn"  ></span>
          </div>

        </yhm-form-zh-text-two>

        <yhm-form-radio title="是否返利" subtitle=""  @call="isCashObject" :select-list="cashList" :value="cash" id="cash"></yhm-form-radio>
        <yhm-form-text placeholder="" title="实收金额" subtitle="" :no-edit="isTotal" :value="receivedMoney" id="receivedMoney" rule="R0000"></yhm-form-text>

        <yhm-form-radio title="返利对象" subtitle="" width="1" v-if="isCash" :select-list="cashObjectList" :value="cashObject" id="cashObject"></yhm-form-radio>


      </template>
    </yhm-formbody>
    <div class="f_split"></div>
    <yhm-form-list-edit >
      <template #title>赠送信息</template>
      <template #operate>
        <yhm-commonbutton  value="添加赠送信息" icon="btnAdd" @call="addDiscount"></yhm-commonbutton>
      </template>
      <template #listHead>
        <yhm-managerth style="width: 40px" title="序号"></yhm-managerth>
        <yhm-managerth style="width: 870px"  title="详细信息"></yhm-managerth>
        <yhm-managerth style="width: 40px" title="删除"></yhm-managerth>
      </template>
      <template #listBody>
        <tr v-for="(item,index) in discountList" :key="index" :class="{InterlacBg:index%2!==0}">
          <yhm-form-td-textbox width="40" :list="discountList" listid="discountList" :value="item" id="code" rule="R0000"></yhm-form-td-textbox>
          <yhm-form-td-textbox width="870" :list="discountList"  listid="discountList" :value="item" id="remark"></yhm-form-td-textbox>
          <yhm-form-td-delete :must="1" width="40" :list="discountList"  listid="discountList" :value="item" :del-click="true" @click="delDiscount(index,item)"></yhm-form-td-delete>
        </tr>
      </template>
    </yhm-form-list-edit>

    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn>
        <yhm-commonbutton value="保存" icon="btnSave" :flicker="false" @call="save()"></yhm-commonbutton>
        <yhm-commonbutton value="保存并提交" icon="btnSave" :flicker="true" @call="btnSubSave()"></yhm-commonbutton>
      </template>
    </yhm-formoperate>
  </div>
</template>

<script>
  import { formmixin } from '@/assets/form.js'
  import { accMul, accAdd, guid, formatDate, number2chinese,formatTime} from '@/assets/common.js'
  export default {
    name: 'billingForm',
    mixins: [formmixin],
    data(){
      return{
        plate:'',//车主
        plateID:'',
        insuredDate:'',//投保日期
        beinsuredID:'',//被投保人
        beinsuredName:'',
        beinsuredidNo:'',
        contactID:'',//联系人
        contactName:'',
        contactPhone:'',
        insuredID:'',//投保人
        insuredName:'',
        insuredPhone:'',
        relationship:'',//与车主关系
        relationshipList:[],
        insuredType:'',//投保类型
        insuredTypeList:[],
        insuredChannel:'',//投保渠道
        insuredChannelList:[],
        insuredProject:[],//投保项目
        insuredProjectList:[],
        forceStartDate:'',//交强险开始日期
        forceEndDate:'',//交强险结束日期
        forceMoney:'',//交强险金额
        vehicleMoney:'',//车船税金额
        businessStartDate:'',//商业险开始日期
        businessEndDate:'',//商业险结束日期
        insuredUnit:'',//投保公司
        insuredUnitList:[],
        commercial:[],//商业险种
        commercialList:[],
        invoicingMoney:'',//开票金额
        businessMoney:'',//商业险实际金额
        premiumsTotal:'',//保费合计
        discountMoney:'',//优惠金额
        discountCount:'',//优惠点位
        receivedMoney:'',//实收金额
        cash:'',//是否返利
        cashList:[],
        cashObject:'',
        cashObjectList:[],
        code:'',//序号
        remark:'',//详细信息
        three:'',//三责
        threeList:[],
        scratch:'',//划痕
        scratchList:[],
        glass:'',//玻璃
        glassList:[],
        passenger:'',//车上人员乘客
        selfGlass:'',//自店承保玻璃险
        specify:'',//指定特约店维修险
        carDamage:'', //车损
        driver:'',//车上人员司机
        listDetails:[],
        isforceStart:true,
        isvehicle:true,
        isbusinessStart:true,
        isCash:true,
        isDis:false,
        isTotal:'0',
        hide:'0',
        process:'',

        discountList: [],
        num:'',
        isaaa:'1',
        clientRate:'', //客户费率
        tipValue:'',
        tipList:[
          ['优惠点数超出保险公司提供的点数']
        ],
      }
    },
    methods:{
      forceDate(){
        let forceStartDate = new Date(this.forceStartDate).getTime();
        var y = new Date().getFullYear(),
        isLeap = (0===y%4) && (0===y%100) || (0===y%400),
        days = isLeap ? 366 : 365;
        let yearTime = days*24*60*60*1000 - 24*60*60*1000;
        let newDateTime = formatDate( new Date(accAdd(forceStartDate,yearTime)));
        this.forceEndDate = newDateTime
      },
      businessDate(){
        let forceStartDate = new Date(this.businessStartDate).getTime();
        var y = new Date().getFullYear(),
          isLeap = (0===y%4) && (0===y%100) || (0===y%400),
          days = isLeap ? 366 : 365;
        let yearTime = days*24*60*60*1000 - 24*60*60*1000;
        let newDateTime = formatDate( new Date(accAdd(forceStartDate,yearTime)));
        this.businessEndDate = newDateTime
      },
      tipChange(){
        this.tipValue=this.tipList[0][0]
        this.$refs.imgRight.style.left='243px'
        let distance = 225
        $('.tipShow').css({'left':distance+'px','display':'block'})
      },
      tipOut(){
        $('.tipShow').css('display','none')
      },
      calcBeforeMoney(){
        if (this.discountMoney!=='' &&this.premiumsTotal!==''){
          this.receivedMoney=accAdd(parseFloat(this.premiumsTotal),parseFloat(this.discountMoney)*-1)
          this.discountCount=(parseFloat(this.discountMoney)/parseFloat(this.premiumsTotal)).toFixed(2)
          if (this.cash ==='0'){
            this.receivedMoney=this.premiumsTotal
          }
          this.unitRate()
        }
      },
      calcAfterMoney(){
        if (this.discountCount!=='') {
          this.discountMoney = parseFloat(this.premiumsTotal) * parseFloat(this.discountCount)
          this.receivedMoney = accAdd(parseFloat(this.premiumsTotal), parseFloat(this.discountMoney) * -1)
          if (this.cash ==='0'){
            this.receivedMoney=this.premiumsTotal
          }
          this.unitRate()
        }
      },
      unitRate(){
          let params = {
            num:this.insuredUnit
          }
          this.ajaxJson({
            url: '/Insurance/getUnitRate',
            data: params,
            call: (data) => {
              for(let i in data){
                if (this.discountCount*100>data[i].clientRate){
                  this.isDis=true
                  this.hide='1'
                }else {
                  this.hide='0'
                  this.isDis=false
                }
              }
            }
          })

      },

      /* 优惠信息 */
      addDiscount(){
        let index = this.discountList.length+1
        let insertDate = new Date(accAdd(new Date().getTime(), accMul(this.discountList.length, 1000)))
        this.discountList.push({
          id: guid(),
          insertDate: formatTime(insertDate),
          ownerID: this.id,
          code: index + '',
          remark: this.remark,
        })
      },
      delDiscount(index,item){
        this.$dialog.alert({
          tipValue: '删除成功！！！',
          closeCallBack: ()=>{
            this.discountList.splice(index, 1)
            if(this.discountList.length === 0){
              this.addDiscount()
            }
          }
        })
      },
      Project(){

        let  a=this.insuredProject
        if (a.indexOf("0") != -1){
          this.isforceStart=true
          this.insuredProject.push(
            '1'   //只要选择了交强险，车船税必选，不可取消
          )
        }else {
          this.isforceStart=false
          this.forceMoney=''
          this.premiumsTotal=''
          this.receivedMoney=''

        }
        if (a.indexOf("1") != -1){

          this.isvehicle=true
        }else {
          this.isvehicle=false
          this.vehicleMoney=''
          this.premiumsTotal=''
          this.receivedMoney=''
        }
        if (a.indexOf("2") != -1){
          this.isTotal='0'
          this.isbusinessStart=true
          this.cash='0'
          this.isCashObject()
        }else {
          this.isTotal='1'   //不选择商业险  保费合计/实收金额 不可输入
          this.isbusinessStart=false
          this.cash='1'  //没有商业险不返利
          this.isCashObject()
          this.businessMoney=''
          this.premiumsTotal=''
          this.receivedMoney=''
        }
      },
      isaMoney(){
        //计算合计金额
        let sum =0.00
        if (this.forceMoney!==''){
          sum+=parseFloat(this.forceMoney)
        }
        if (this.vehicleMoney!==''){
          sum+=parseFloat(this.vehicleMoney)
        }
        if (this.businessMoney!==''){
          sum+=parseFloat(this.businessMoney)
        }
        this.premiumsTotal=sum + ''
        this.calcBeforeMoney()
        if (this.discountMoney==='' && this.discountCount===''){
          this.receivedMoney=this.premiumsTotal
        }
      },

      isCashObject(){
        if (this.cash==='0'){
          this.isCash=true
        }else {
          this.isCash=false
        }

        this.calcBeforeMoney()

      },
      //选择车牌号
      plateEvent(){
        this.$dialog.OpenWindow({
          width: 950,
          height: 603,
          url: '/selectFormPlate',
          title: '选择车牌号',
          closeCallBack: (data) => {
            if (data) {
              this.plate = data.plate //车牌号
              this.plateID=data.vehicleID
              this.contactID=data.contactPersonID //联系人id
              this.contactName=data.name
              this.contactPhone=data.phone

              this.beinsuredID=data.carOwnerID
              this.beinsuredName=data.carOwner
              this.beinsuredidNo=data.idNo
            }
          }
        })

      },
      //被保险人
      beinsuredEvent(){
        this.$dialog.OpenWindow({
          width: 950,
          height: 692,
          url: '/selectPerson?category=1',
          title: '选择联系人',
          closeCallBack: (data) => {
            if (data) {
              this.beinsuredID=data.id
              this.beinsuredName=data.name
              this.beinsuredidNo = data.idNo
            }
          }
        })
      },
      //投保人
      insuredEvent(){
        this.$dialog.OpenWindow({
          width: 950,
          height: 692,
          url: '/selectPerson?category=1',
          title: '选择联系人',
          closeCallBack: (data) => {
            if (data) {
              this.insuredID=data.id
              this.insuredName = data.name
              this.insuredPhone = data.phone
            }
          }
        })
      },
      //选择联系人
      contactEvent() {
        this.$dialog.OpenWindow({
          width: 950,
          height: 692,
          url: '/selectPerson?category=1',
          title: '选择联系人',
          closeCallBack: (data) => {
            if (data) {
              this.contactPersonID=data.id
              this.contactName = data.name
              this.contactPhone = data.phone
            }
          }
        })
      },
      save(){
        if (this.hide==='1'){
          this.$dialog.confirm({
            width: '400',
            alertImg: 'warn',
            tipValue: '因为优惠点数超出保险公司提供的点数、所以此条数据需要经过领导审批?',
            btnValueOk: '确定',
            okCallBack: ()=>{
              if (true) {
                let params = {
                  id: this.id,
                  process:this.hide,
                  plate:this.plate,
                  plateID:this.plateID,
                  insuredDate:this.insuredDate,
                  beinsuredID:this.beinsuredID,
                  beinsuredName:this.beinsuredName,
                  beinsuredidNo:this.beinsuredidNo,
                  contactID:this.contactID,
                  contactName:this.contactName,
                  contactPhone:this.contactPhone,
                  insuredID:this.insuredID,
                  insuredName:this.insuredName,
                  insuredPhone:this.insuredPhone,
                  commercial:this.commercial,
                  relationship:this.relationship,
                  insuredType:this.insuredType,
                  insuredChannel:this.insuredChannel,
                  insuredProject:this.insuredProject,
                  forceStartDate:this.forceStartDate,
                  forceEndDate:this.forceEndDate,
                  forceMoney:this.forceMoney===''?'0.00':this.forceMoney,
                  vehicleMoney:this.vehicleMoney===''?'0.00':this.vehicleMoney,
                  businessStartDate:this.businessStartDate,
                  businessEndDate:this.businessEndDate,
                  insuredUnit:this.insuredUnit,
                  invoicingMoney:this.invoicingMoney===''?'0.00':this.invoicingMoney,
                  businessMoney:this.businessMoney===''?'0.00':this.businessMoney,
                  premiumsTotal:this.premiumsTotal,
                  discountMoney:this.discountMoney===''?'0.00':this.discountMoney,
                  discountCount:this.discountCount,
                  receivedMoney:this.receivedMoney===''?'0.00':this.receivedMoney,
                  carDamage:this.carDamage,
                  cash:this.cash,
                  cashObject:this.cashObject,
                  three:this.three,
                  driver:this.driver,
                  scratch:this.scratch,
                  specify:this.specify,
                  passenger:this.passenger,
                  selfGlass:this.selfGlass,
                  glass:this.glass,
                  discountList: this.discountList
                }
                this.ajaxJson({
                  url: '/Insurance/preserveBilling',
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
          })
        }else{
          if (this.validator()) {
            let params = {
              id: this.id,
              process:this.hide,
              plate:this.plate,
              plateID:this.plateID,
              insuredDate:this.insuredDate,
              beinsuredID:this.beinsuredID,
              beinsuredName:this.beinsuredName,
              beinsuredidNo:this.beinsuredidNo,
              contactID:this.contactID,
              contactName:this.contactName,
              contactPhone:this.contactPhone,
              insuredID:this.insuredID,
              insuredName:this.insuredName,
              insuredPhone:this.insuredPhone,
              commercial:this.commercial,
              relationship:this.relationship,
              insuredType:this.insuredType,
              insuredChannel:this.insuredChannel,
              insuredProject:this.insuredProject,
              forceStartDate:this.forceStartDate,
              forceEndDate:this.forceEndDate,
              forceMoney:this.forceMoney===''?'0.00':this.forceMoney,
              vehicleMoney:this.vehicleMoney===''?'0.00':this.vehicleMoney,
              businessStartDate:this.businessStartDate,
              businessEndDate:this.businessEndDate,
              insuredUnit:this.insuredUnit,
              invoicingMoney:this.invoicingMoney===''?'0.00':this.invoicingMoney,
              businessMoney:this.businessMoney===''?'0.00':this.businessMoney,
              premiumsTotal:this.premiumsTotal,
              discountMoney:this.discountMoney===''?'0.00':this.discountMoney,
              discountCount:this.discountCount,
              receivedMoney:this.receivedMoney===''?'0.00':this.receivedMoney,
              carDamage:this.carDamage,
              cash:this.cash,
              cashObject:this.cashObject,
              three:this.three,
              driver:this.driver,
              scratch:this.scratch,
              specify:this.specify,
              passenger:this.passenger,
              selfGlass:this.selfGlass,
              glass:this.glass,
              discountList: this.discountList
            }

            this.ajaxJson({
              url: '/Insurance/preserveBilling',
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
      //保存并提交
      btnSubSave () {
        if (this.hide==='1'){
          this.$dialog.confirm({
            width: '400',
            alertImg: 'warn',
            tipValue: '因为优惠点数超出保险公司提供的点数、所以此条数据需要经过领导审批?',
            btnValueOk: '确定',
            okCallBack: ()=>{
              if (this.validator()) {
                let params = {
                  id: this.id,
                  process:'1',
                  plate:this.plate,
                  plateID:this.plateID,
                  insuredDate:this.insuredDate,
                  beinsuredID:this.beinsuredID,
                  beinsuredName:this.beinsuredName,
                  beinsuredidNo:this.beinsuredidNo,
                  contactID:this.contactID,
                  contactName:this.contactName,
                  contactPhone:this.contactPhone,
                  insuredID:this.insuredID,
                  insuredName:this.insuredName,
                  insuredPhone:this.insuredPhone,
                  commercial:this.commercial,
                  relationship:this.relationship,
                  insuredType:this.insuredType,
                  insuredChannel:this.insuredChannel,
                  insuredProject:this.insuredProject,
                  forceStartDate:this.forceStartDate,
                  forceEndDate:this.forceEndDate,
                  forceMoney:this.forceMoney===''?'0.00':this.forceMoney,
                  vehicleMoney:this.vehicleMoney===''?'0.00':this.vehicleMoney,
                  businessStartDate:this.businessStartDate,
                  businessEndDate:this.businessEndDate,
                  insuredUnit:this.insuredUnit,
                  invoicingMoney:this.invoicingMoney===''?'0.00':this.invoicingMoney,
                  businessMoney:this.businessMoney===''?'0.00':this.businessMoney,
                  premiumsTotal:this.premiumsTotal,
                  discountMoney:this.discountMoney===''?'0.00':this.discountMoney,
                  discountCount:this.discountCount,
                  receivedMoney:this.receivedMoney===''?'0.00':this.receivedMoney,
                  carDamage:this.carDamage,
                  cash:this.cash,
                  cashObject:this.cashObject,
                  three:this.three,
                  driver:this.driver,
                  scratch:this.scratch,
                  specify:this.specify,
                  passenger:this.passenger,
                  selfGlass:this.selfGlass,
                  glass:this.glass,
                  discountList: this.discountList
                }
                this.ajaxJson({
                  url: '/Insurance/saveBilling',
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
          })
        }else{
          if (this.validator()) {  //不需要审批
            let params = {
              id: this.id,
              process:'0',
              plate:this.plate,
              plateID:this.plateID,
              insuredDate:this.insuredDate,
              beinsuredID:this.beinsuredID,
              beinsuredName:this.beinsuredName,
              beinsuredidNo:this.beinsuredidNo,
              contactID:this.contactID,
              contactName:this.contactName,
              contactPhone:this.contactPhone,
              insuredID:this.insuredID,
              insuredName:this.insuredName,
              insuredPhone:this.insuredPhone,
              commercial:this.commercial,
              relationship:this.relationship,
              insuredType:this.insuredType,
              insuredChannel:this.insuredChannel,
              insuredProject:this.insuredProject,
              forceStartDate:this.forceStartDate,
              forceEndDate:this.forceEndDate,
              forceMoney:this.forceMoney===''?'0.00':this.forceMoney,
              vehicleMoney:this.vehicleMoney===''?'0.00':this.vehicleMoney,
              businessStartDate:this.businessStartDate,
              businessEndDate:this.businessEndDate,
              insuredUnit:this.insuredUnit,
              invoicingMoney:this.invoicingMoney===''?'0.00':this.invoicingMoney,
              businessMoney:this.businessMoney===''?'0.00':this.businessMoney,
              premiumsTotal:this.premiumsTotal,
              discountMoney:this.discountMoney===''?'0.00':this.discountMoney,
              discountCount:this.discountCount,
              receivedMoney:this.receivedMoney===''?'0.00':this.receivedMoney,
              carDamage:this.carDamage,
              cash:this.cash,
              cashObject:this.cashObject,
              three:this.three,
              driver:this.driver,
              scratch:this.scratch,
              specify:this.specify,
              passenger:this.passenger,
              selfGlass:this.selfGlass,
              glass:this.glass,
              discountList: this.discountList
            }
            this.ajaxJson({
              url: '/Insurance/saveBilling',
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

      }
    },
    created () {
      this.addDiscount()
      this.init({
        url: '/Insurance/initBillingForm',
        all: (data) => {
          this.relationshipList=data.relationshipPsd.list
          this.relationship=data.relationshipPsd.value

          this.insuredTypeList=data.insuredTypePsd.list
          this.insuredType=data.insuredTypePsd.value

          this.insuredTypeList=data.insuredTypePsd.list
          this.insuredType=data.insuredTypePsd.value

          this.insuredChannelList=data.insuredChannelPsd.list
          this.insuredChannel=data.insuredChannelPsd.value

          this.insuredProjectList=data.insuredProjectPsd.list
          this.insuredProject=data.insuredProjectPsd.value

          this.insuredUnitList=data.insuredUnitPsd.list
          this.insuredUnit=data.insuredUnitPsd.value

          this.commercialList=data.commercialPsd.list
          this.commercial=data.commercialPsd.value

          this.cashList=data.cashPsd.list
          this.cash=data.cashPsd.value

          this.cashObjectList=data.cashObjectPsd.list
          this.cashObject=data.cashObjectPsd.value

          this.threeList=data.threePsd.list
          this.three=data.threePsd.value

          this.scratchList=data.scratchPsd.list
          this.scratch=data.scratchPsd.value

          this.glassList=data.glassPsd.list
          this.glass=data.glassPsd.value
        },
        add: (data) => {
          /* 需要添加的数据 */
        },
        look: (data) => {
          /* 需要查看的数据 */
          this.plate=data.plate
          this.plateID=data.plateID
          this.insuredDate=data.insuredDate
          this.beinsuredID=data.beinsuredID
          this.beinsuredName=data.beinsuredName
          this.beinsuredidNo=data.beinsuredidNo
          this.contactID=data.contactID
          this.contactName=data.contactName
          this.contactPhone=data.contactPhone
          this.insuredID=data.insuredID
          this.insuredName=data.insuredName
          this.insuredPhone=data.insuredPhone
          this.forceStartDate=data.forceStartDate
          this.forceEndDate=data.forceEndDate
          this.forceMoney=data.forceMoney
          this.vehicleMoney=data.vehicleMoney
          this.businessStartDate=data.businessStartDate
          this.businessEndDate=data.businessEndDate
          this.invoicingMoney=data.invoicingMoney
          this.businessMoney=data.businessMoney
          this.premiumsTotal=data.premiumsTotal
          this.discountMoney=data.discountMoney
          this.discountCount=data.discountCount
          this.receivedMoney=data.receivedMoney
          this.passenger=data.passenger
          this.selfGlass=data.selfGlass
          this.specify=data.specify
          this.carDamage=data.carDamage
          this.driver=data.driver
          this.discountList=data.discountList
          this.unitRate()

          let  a=this.insuredProject
          if (a.indexOf("0") != -1){
            this.isforceStart=true
          }else {
            this.isforceStart=false
          }
          if (a.indexOf("1") != -1){
            this.isvehicle=true
          }else {
            this.isvehicle=false
          }
          if (a.indexOf("2") != -1){
            this.isbusinessStart=true
          }else {
            this.isbusinessStart=false
          }
          if (this.cash==='0'){
            this.isCash=true
          }else {
            this.isCash=false
          }

        }
      })
    }

  }
</script>

<style scoped>
  .i-yellowWarn{
    color: #ffaa27;
    font-size: 24px;
    cursor: pointer;
  }
</style>
<style scoped lang="less">
  .tipShow{display: none;width: 270px;}
</style>
