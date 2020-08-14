<template>
  <div class="f_main">
    <yhm-formbody>
      <template #title>基本信息</template>
      <template #control>
        <yhm-form-select  title="业务员"  tip="value" width="1" aria-autocomplete="both" @click="principalEvent" :value="salsesman" id="salsesman" rule="R0000"></yhm-form-select>
        <yhm-form-select title="车牌号" tip="value"   @click="plateEvent" :value="plate" id="plate" rule="R0000"></yhm-form-select>
        <yhm-form-date title="投保日期" subtitle=""   :value="insuredDate" id="insuredDate " position="t"  rule="R0000"></yhm-form-date>
        <yhm-form-zh-select-text tip-before="value" tip-after="beinsuredidNo" @call="beinsuredEvent"  :before="beinsuredName" before-id="beinsuredName" :after="beinsuredidNo" after-id="beinsuredidNo" before-rule="#" after-rule="R0000" title="被保险人" after-title="证件号" after-width="160">
          <div  class="selectCenter" v-if="isNotEqual"  @mouseover="tipChange" @mouseout="tipOut">
            <span class="uniE9A8 formBoxIcon beinSpan" ></span>
          </div>
          <div class="formBoxIcon">
            <div  class="cbl_main_prompt tipShow">
              <div class="cbl_main_prompt_content" style="font-size:14px;padding: 0px 2px; ">
                <!--                                {{tipValue}}-->
                被保险人与车主不一致
                <img src="/UploadFile/m_image/arrow.png" ref="imgRight">
              </div>
            </div>
          </div>
        </yhm-form-zh-select-text>
        <yhm-form-zh-select-text tip-before="value" tip-after="contactPhone"  @call="contactEvent" :before="contactName" before-id="contactName" :after="contactPhone" after-id="contactPhone" before-rule="#" after-rule="R4000" title="联系人" after-title="手机号码" after-width="160"></yhm-form-zh-select-text>
        <yhm-form-zh-select-text tip-before="value" tip-after="insuredPhone" @call="insuredEvent" :before="insuredName" before-id="insuredName" :after="insuredPhone" after-id="insuredPhone" before-rule="#"  title="投保人" after-title="证件号" after-width="160">
          <span class="formBoxIcon beinSpan" :class="'i-uniE9b0'+insuredState" @click="iconClick"></span>
        </yhm-form-zh-select-text>
        <yhm-form-radio title="与车主关系" subtitle=""  :select-list="relationshipList" :value="relationship" id="relationship"></yhm-form-radio>
        <yhm-form-radio title="投保类型" @call="insuredTypeClick" subtitle=""  width="1" :select-list="insuredTypeList" :value="insuredType" id="insuredType"></yhm-form-radio>
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
        <yhm-form-radio title="投保公司"  @call="insuredUnitEvent" subtitle=""  width="1" :select-list="insuredUnitList" :value="insuredUnit" id="insuredUnit"></yhm-form-radio>
        <yhm-form-radio title="是否返利" subtitle="" @call="isCashObject" :no-edit="isCashOb" :select-list="cashList" :value="cash" id="cash"></yhm-form-radio>
        <yhm-form-radio title="返利对象" subtitle=""  v-if="isCash" :select-list="cashObjectList" :value="cashObject" id="cashObject"></yhm-form-radio>

        <yhm-form-select v-if="isPromotions" title="选择" subtitle="活动方案" tip="value" @click="promotionsEvent" :value="name" id="name" rule="R0000"></yhm-form-select>

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
        <yhm-form-text placeholder="" title="开票金额" subtitle=""  :value="invoicingMoney" id="invoicingMoney" rule="R3000"></yhm-form-text>
        <yhm-form-text placeholder="" title="保费合计" subtitle="" :no-edit="isTotal" :value="premiumsTotal" id="premiumsTotal"  rule="R3000"></yhm-form-text>

        <yhm-form-zh-text-two  ref="romotions"   :no-edit="isDiscountShow" v-if="isbusinessStart"  :before="discountMoney" before-id="discountMoney"  :after="discountCount" @afterblurEvent="calcAfterMoney" @beforeBlur="calcBeforeMoney" after-id="discountCount" title="优惠金额"  before-icon="rmb" after-title="优惠点数(%)" after-width="50px;">
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

        <!--        <yhm-form-zh-text-two :no-edit="isDiscountShow" v-if="isbusinessStart"  :before="premium" before-id="premium"  :after="electronic"  after-id="electronic" title="保费优惠" before-icon="rmb" after-title="电子券优惠" after-width="60px;"> </yhm-form-zh-text-two>-->
        <yhm-form-text placeholder="" title="实收金额" subtitle=""  :value="receivedMoney" id="receivedMoney" :rule="ruleMoney"></yhm-form-text>
        <yhm-form-zh-text-more-checkbox :no-edit="true"  :tip-message="tariffTxt" v-if="isCash" @clickCheckBox="clickCheckBoxEvent" title="实际优惠" :value="tariffMoney" id="tariffMoney" :check-value="tariffCheck" check-value-id="tariffCheck" :check-list="tariffCheckList" @input="calcTrAfterMoney" rule="R0000"></yhm-form-zh-text-more-checkbox>

        <yhm-form-select-more title="选择" subtitle="代收明细" :value="receiveAccountList" id="receiveAccountList" @click="receiveAccountEvent()"></yhm-form-select-more>
        <yhm-form-select-more title="选择" subtitle="代付明细" :value="payAccountList" id="payAccountList" @click="payAccountEvent()" ></yhm-form-select-more>
        <yhm-form-select-more v-if="isCash" title="选择" subtitle="返利明细" :value="rebateAccountList" id="rebateAccountList" @click="rebateAccountEvent()"></yhm-form-select-more>
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
      </template>
    </yhm-formoperate>
  </div>
</template>

<script>
  import { formmixin } from '@/assets/form.js'
  import { accMul, accAdd, guid, formatDate, number2chinese,formatTime ,formatPhone, formatIdNo,} from '@/assets/common.js'
  export default {
    name: 'insuranceMakeUpForm',
    mixins: [formmixin],
    data(){
      return{
        ruleMoney:'R3000',//控制实收金额 代付明细 代收明细
        ruleMoney2:'#',//控制实收金额 代付明细 代收明细
        tariffTxt:'',
        tariffMoney:'',
        tariffCheck:'',
        tariffCheckList:[
          // {showName:"个人承担",num:"0"},{showName:"公司承担",num:"1"}
        ],
        plate:'',//车主
        plateID:'',
        // insuredDate:formatDate( new Date((new Date()).getTime())),//投保日期
        insuredDate:'',
        beinsuredID:'',//被保险人
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
        discountMoney:'0',//优惠金额
        discountCount:'0',//优惠点位
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
        isDiscountShow:true,//优惠金额
        isCash:true,
        isDis:false,
        isTotal:'0',
        hide:'0',
        process:'',
        isCashOb:true,
        isNotEqual:false,

        discountList: [],
        num:'',
        clientRate:'', //客户费率
        tipValue:'',
        // tipList:[
        //   ['优惠点数超出保险公司提供的点数'+this.clientRate+'']
        // ],
        tipList:'',
        carOwnerID:'',
        insuredState:'0',//0联系人
        // premium:'',  //保费优惠
        // electronic:'',  //电子卷优惠

        salsesman:'',
        salsesmanID:'', //业务员
        promotionsID:'',//优惠方案id
        name:'',   //优惠方案别名
        promotionsQuota:'',  //优惠方案额度
        isPromotions:false,
        startDate:'',
        endDate:'',
        receiveAccountList:[],
        payAccountList:[],
        rebateAccountList:[],
        receiveAccount:'',
        payAccount:'',
        rebateAccount:'',
      }
    },
    methods:{
      rebateAccountEvent(){
        if (this.insuredDate==''){

        }else {
          this.endDate = formatDate( new Date(accAdd((new Date(this.insuredDate)).getTime(),7*24*60*60*1000)))
          this.startDate=this.insuredDate
          this.$dialog.OpenWindow({
            width: 1050,
            height: 750,
            url: '/selectAccount?subjectID=D65A9EF9-DCB2-47B8-918B-F8DD9342B2CB&direction=1&startDate='+this.insuredDate+'&endDate='+ this.endDate+'&selectType=1',
            title: '选择客户返利明细',
            closeCallBack: (data) => {
              if (data) {

                for (var j = 0; j < data.length; j++) {
                  var temp = data[j]
                  var index = -1

                  for (var i = 0; i < this.rebateAccountList.length; i++) {
                    if (this.rebateAccountList[i].id === temp.id) {
                      index = 0
                      break
                    }
                  }
                  if (index === -1) {
                    this.rebateAccountList.push({
                      ownerID:temp.id,
                      otherName:temp.otherName,

                    })
                  }
                }
                let arr = []
                for (let i in this.rebateAccountList){
                  arr.push(this.rebateAccountList[i].ownerID)
                }
                this.rebateAccount= arr.join(',')
              }
            }
          })
        }
      },
      payAccountEvent(){
        if (this.insuredDate==''){

        }else {

          this.endDate = formatDate( new Date(accAdd((new Date(this.insuredDate)).getTime(),7*24*60*60*1000)))
          this.startDate=this.insuredDate
          this.$dialog.OpenWindow({
            width: 1050,
            height: 750,
            url: '/selectAccount?subjectID=DA771D46-0813-40C3-973B-9F57A492F3A0&direction=1&startDate='+this.insuredDate+'&endDate='+ this.endDate+'&selectType=1&nameID='+this.insuredUnit,
            title: '选择代付保险费',
            closeCallBack: (data) => {
              if (data) {

                for (var j = 0; j < data.length; j++) {
                  var temp = data[j]
                  var index = -1

                  for (var i = 0; i < this.payAccountList.length; i++) {
                    if (this.payAccountList[i].id === temp.id) {
                      index = 0
                      break
                    }
                  }
                  if (index === -1) {
                    this.payAccountList.push({
                      ownerID:temp.id,
                      otherName:temp.otherName,

                    })
                  }
                }
                let arr = []
                for (let i in this.payAccountList){
                  arr.push(this.payAccountList[i].ownerID)
                }
                this.payAccount= arr.join(',')
              }
            }
          })
        }
      },
      receiveAccountEvent(){
        if (this.insuredDate==''){

        }else {
          let arr=[]
          arr.push(this.beinsuredID)
          arr.push(this.insuredID)

          this.endDate = formatDate( new Date(accAdd((new Date(this.insuredDate)).getTime(),7*24*60*60*1000)))
          this.startDate=this.insuredDate
          this.$dialog.OpenWindow({
            width: 1050,
            height: 750,
            url: '/selectAccount?subjectID=F0887A4D-DA14-4FCB-B48B-221B42C8F17A&direction=0&startDate='+this.insuredDate+'&endDate='+ this.endDate+'&selectType=1&nameID='+arr.join(','),
            title: '选择代收保险费',
            closeCallBack: (data) => {
              if (data) {

                for (var j = 0; j < data.length; j++) {
                  var temp = data[j]
                  var index = -1

                  for (var i = 0; i < this.receiveAccountList.length; i++) {
                    if (this.receiveAccountList[i].id === temp.id) {
                      index = 0
                      break
                    }
                  }
                  if (index === -1) {
                    this.receiveAccountList.push({
                      ownerID:temp.id,
                      otherName:temp.otherName,

                    })
                  }
                }
                let arr = []
                for (let i in this.receiveAccountList){
                  arr.push(this.receiveAccountList[i].ownerID)
                }
                this.receiveAccount= arr.join(',')
              }
            }
          })
        }
      },
      calcTrAfterMoney(){

      },
      clickCheckBoxEvent(){
        if(this.tariffCheck==0){
          this.tariffMoney= this.discountMoney*(1-0.2)+''
          this.tariffTxt='实际优惠金额为:'+this.discountMoney+'-('+this.discountMoney+'*'+'20%'+'='+this.tariffMoney+')'
        }else{
          this.tariffMoney= this.discountMoney
          this.tariffTxt='实际优惠金额为'+this.discountMoney
        }
      },

      insuredUnitEvent(){
        this.name=''
        this.promotionsID=''
        this.promotionsQuota=''
      },
      promotionsEvent(){
        if (this.plateID==''){
          this.$dialog.alert({
            tipValue:'请先选择车牌!!!',
            alertImg: 'warn',
            width:'300'
          })
        }else {
          this.$dialog.OpenWindow({
            width: 950,
            height: 692,
            url: '/selectPromotions?brand='+this.plateID+'&insuredUnit='+this.insuredUnit+'&insuredDate='+this.insuredDate,
            title: '选择优惠活动',
            closeCallBack: (data) => {
              if (data) {
                this.name=data.name
                this.promotionsID=data.id
                this.promotionsQuota=data.amount
                this.discountMoney='0'//优惠金额
                this.discountCount='0'//优惠点位
                // this.unitRate()
                this.discountList[0].remark = data.discount
                this.$refs.rromotions.errorEvent("请重新输入优惠金额")

              }
            }
          })
        }

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
              this.salsesmanID=data.id
              this.salsesman = data.name
            }
          }
        })
      },
      // iconMouseover(){
      //   // alert()
      // },
      forceDate(){   //根据开始日期自动获取一年后的结束日期
        let forceStartDate = new Date(this.forceStartDate).getTime();
        let y = new Date().getFullYear(),
          isLeap = (0===y%4) && (0===y%100) || (0===y%400),
          days = isLeap ? 366 : 365;
        let yearTime = days*24*60*60*1000 - 24*60*60*1000;
        let newDateTime = formatDate( new Date(accAdd(forceStartDate,yearTime)));
        this.forceEndDate = newDateTime
      },
      businessDate(){
        let forceStartDate = new Date(this.businessStartDate).getTime();
        let y = new Date().getFullYear(),
          isLeap = (0===y%4) && (0===y%100) || (0===y%400),
          days = isLeap ? 366 : 365;
        let yearTime = days*24*60*60*1000 - 24*60*60*1000;
        let newDateTime = formatDate( new Date(accAdd(forceStartDate,yearTime)));
        this.businessEndDate = newDateTime
      },
      tipChange(){
        this.tipValue=this.tipList
        this.$refs.imgRight.style.left='218px'
        let distance = 250
        $('.tipShow').css({'left':distance+'px','display':'block'})
      },
      tipOut(){
        $('.tipShow').css('display','none')
      },
      calcBeforeMoney(){
        this.tariffMoney=''
        if (this.discountMoney!=='' &&this.businessMoney!==''){
          this.receivedMoney=accAdd(parseFloat(this.premiumsTotal),parseFloat(this.discountMoney)*-1) +''
          this.discountCount= this.accMul((parseFloat(this.discountMoney)/parseFloat(this.businessMoney)).toFixed(4),100)+''
          if (this.cash ==='0'){
            this.receivedMoney=this.premiumsTotal
          }
          // this.unitRate()
        }
      },
      accMul(arg1,arg2)    //两个小数相乘
      {
        var m=0,s1=arg1.toString(),s2=arg2.toString();
        try{m+=s1.split(".")[1].length}catch(e){}
        try{m+=s2.split(".")[1].length}catch(e){}
        return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m)
      },

      calcAfterMoney(){
        this.tariffMoney=''
        if (this.discountCount!=='') {
          this.discountMoney = parseFloat(this.businessMoney) * (parseFloat(this.discountCount)/100).toFixed(2) +''
          this.receivedMoney = accAdd(parseFloat(this.premiumsTotal), parseFloat(this.discountMoney) * -1) +''
          if (this.cash ==='0'){
            this.receivedMoney=this.premiumsTotal
          }
          // this.unitRate()
        }
      },
      // unitRate(){
      //
      //   if (parseFloat(this.discountCount)>this.promotionsQuota){
      //     this.tipList = '优惠点数超出保险公司提供的点数'
      //       // + data[i].showName
      //       +'优惠额度为:'
      //       + this.promotionsQuota
      //       +'%'
      //     this.isDis=true
      //     this.hide='1'
      //   }else {
      //     this.hide='0'
      //     this.isDis=false
      //   }
      //
      //   // let params = {
      //   //   num:this.insuredUnit,
      //   //   id:this.plateID
      //   // }
      //   // this.ajaxJson({
      //   //   url: '/Insurance/getUnitRate',
      //   //   data: params,
      //   //   call: (data) => {
      //   //     for(let i in data){
      //   //       if (parseFloat(this.discountCount)>this.promotionsQuota){
      //   //         this.tipList = '优惠点数超出保险公司提供的点数'
      //   //          // + data[i].showName
      //   //           +'优惠额度为:'
      //   //           + this.promotionsQuota
      //   //           +'%'
      //   //         this.isDis=true
      //   //         this.hide='1'
      //   //       }else {
      //   //         this.hide='0'
      //   //         this.isDis=false
      //   //       }
      //   //     }
      //   //   }
      //   // })
      // },

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
      insuredTypeClick(){//点击投保类型
        let  a=this.insuredProject.sort()
        if(a.indexOf('2')!=-1&&this.insuredType!=0){   //投保类型不是新保 并且投保项目包含商业险
          this.isDiscountShow = false
          this.discountMoney=''
          this.discountCount=''
          this.isCashOb=false
          this.cash='1'
          this.isPromotions=true
          this.isCashObject()
        }else{
          this.isDiscountShow = true
          this.discountMoney='0'
          this.discountCount='0'
          // this.unitRate()
          this.isCashOb=true
          this.cash='1'
          this.isPromotions=false
          this.isCashObject()
        }
        this.name=''
        this.promotionsID=''
        this.promotionsQuota=''
      },
      Project(){
        let  a=this.insuredProject.sort()
        if(a.indexOf('2')!=-1&&this.insuredType!=0){
          this.isDiscountShow = false
          this.discountMoney=''
          this.discountCount=''
          this.isCashOb=false
          this.cash='0'
          this.isCashObject()
        }else{
          this.isDiscountShow = true
          this.discountMoney='0'
          this.discountCount='0'
          // this.unitRate()
          this.isCashOb=true
          this.cash='1'
          this.isCashObject()
        }
        if (a.indexOf("0") != -1 ){
          this.isforceStart=true
          // this.insuredProject.push(
          //   '1'   //只要选择了交强险，车船税必选，不可取消
          // )&&a.indexOf("1") === -1
        }
          // if (a.indexOf("0") != -1){
          //   this.isforceStart=true
        // }
        else {
          // this.insuredProject.splice(0,1)
          this.isforceStart=false
          this.forceMoney=''
          this.premiumsTotal=''
          this.receivedMoney=''
        }
        if ( a.indexOf("1") != -1){
          this.isvehicle=true
        }else {
          this.isvehicle=false
          this.vehicleMoney=''
          this.premiumsTotal=''
          this.receivedMoney=''
        }
        if (a.indexOf("2") != -1){
          this.ruleMoney = 'R3000'
          // this.ruleMoney2 = '#'
          this.isCashOb=false
          this.isTotal='0'
          this.isbusinessStart=true
          this.cash='0'
          this.isCashObject()
          if (this.insuredType!=0){
            this.isPromotions=true
          }
        }else {
          this.ruleMoney = ''
          // this.ruleMoney2 = ''
          this.isCashOb=true
          this.isTotal='1'   //不选择商业险  保费合计 不可输入
          this.isbusinessStart=false
          this.cash='1'  //没有商业险不返利
          this.isCashObject()
          this.businessMoney=''
          this.premiumsTotal=''
          this.receivedMoney=''
          this.isPromotions=false
        }
      },
      isaMoney(){
        //计算合计金额
        let sum =0.00
        if (this.forceMoney!==''){
          sum = accAdd(sum,this.forceMoney)
        }
        if (this.vehicleMoney!==''){
          sum = accAdd(sum,this.vehicleMoney)
        }
        if (this.businessMoney!==''){
          sum = accAdd(sum,this.businessMoney)
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
              this.carOwnerID=data.carOwnerID

              if (data.carOwnerID=='' ||data.brand==''){
                this.updataSelectVehicle(data.vehicleID)

              }
              this.forceStartDate=''
              this.forceEndDate=''
              this.businessEndDate=''
              this.businessStartDate=''



              let day1 = new Date(data.forceEndDate);
              day1.setTime(day1.getTime()+24*60*60*1000);
              let s1 = day1.getFullYear()+"-" + (day1.getMonth()+1) + "-" + day1.getDate();

              this.forceStartDate=s1   //交强险结束日期

              let day2 = new Date(data.businessEndDate);
              day2.setTime(day2.getTime()+24*60*60*1000);
              let s2 = day2.getFullYear()+"-" + (day2.getMonth()+1) + "-" + day2.getDate();

              this.businessEndDate=s2
              if (data.businessEndDate==='1900-01-01'){  //商业险结束日期
                this.businessEndDate=''
              }else{
                this.businessStartDate=s2
                this.businessDate()
              }
              this.forceDate()


            }
          }
        })

      },
      updataSelectVehicle(id){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '750',
          title: '编辑客户信息',
          url: '/vehicleForm?id=' + id,
          closeCallBack: (data)=>{
            if(data){
              this.$dialog.setReturnValue(this.id)
              this.initData()
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
          title: '选择被保险人',
          closeCallBack: (data) => {
            if (data) {
              if (data.id===this.carOwnerID){  //判断车主和被保险人是否是同一人
                this.isNotEqual=false
              }else {
                this.isNotEqual=true
              }
              this.beinsuredID=data.id
              this.beinsuredName=data.name
              this.beinsuredidNo = data.idNo
              if(this.beinsuredidNo === ''){
                this.updataSelectPerson(data.id)
              }

            }
          }
        })
      },
      updataSelectPerson(id){   //维护联系人
        this.$dialog.OpenWindow({
          width: 1050,
          height: 692,
          url: '/addPersonForm?id=' + id,
          title: '选择联系人',
          closeCallBack: (data) => {
            if (data) {

            }else{
              this.beinsuredID= ''
              this.beinsuredName=  ''
              this.beinsuredidNo = ''
            }
          }
        })
      },
      iconClick(){
        if(this.insuredState == '0'){
          this.insuredState = '1'
        }else if(this.insuredState == '1') {
          this.insuredState = '0'
        }
      },
      updatainsuredSelectPerson(id){   //维护联系人
        this.$dialog.OpenWindow({
          width: 1050,
          height: 692,
          url: '/addPersonForm?id=' + id,
          title: '选择联系人',
          closeCallBack: (data) => {
            if (data) {

            }else{
              this.insuredID=''
              this.insuredName = ''
              this.insuredPhone = ''
            }
          }
        })
      },
      //投保人
      insuredEvent(){
        if(this.insuredState == '0'){
          this.$dialog.OpenWindow({
            width: 950,
            height: 692,
            url: '/selectPerson?category=1',
            title: '选择投保人',
            closeCallBack: (data) => {
              if (data) {
                this.insuredID=data.id
                this.insuredName = data.name
                this.insuredPhone = data.phone
                if (this.insuredPhone==''){
                  this.updatainsuredSelectPerson(data.id)
                }
              }
            }
          })
        }else if(this.insuredState == '1'){
          this.$dialog.OpenWindow({
            width: 950,
            height: 692,
            url: '/selectUnit?category=1',
            title: '选择投保公司',
            closeCallBack: (data) => {
              if (data) {
                this.insuredID=data.id
                this.insuredName = data.name
                this.insuredPhone = data.registrationNumber
                if (this.insuredPhone==''){
                  this.updataselectUnit(data.id)
                }
              }
            }
          })
        }

      },
      updataselectUnit(id){
        this.$dialog.OpenWindow({
          width: 1050,
          height: 692,
          url: '/addUnitForm?id=' + id,
          title: '选择单位信息',
          closeCallBack: (data) => {
            if (data) {

            }else {
              this.insuredID=''
              this.insuredName = ''
              this.insuredPhone =''
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
              this.contactID=data.id
              this.contactName = data.name
              this.contactPhone = data.phone
            }
          }
        })
      },
      save(){

        if (this.validator()) {
          if (this.tariffCheck==0){
            this.discountMoney=this.tariffMoney
          }
          let params = {
            id: this.id,
            process: this.hide,
            salsesmanID: this.salsesmanID, //业务员
            plate: this.plate,
            plateID: this.plateID,
            insuredDate: this.insuredDate,
            beinsuredID: this.beinsuredID,
            beinsuredName: this.beinsuredName,
            beinsuredidNo: this.beinsuredidNo,
            contactID: this.contactID,
            contactName: this.contactName,
            contactPhone: this.contactPhone,
            insuredID: this.insuredID,
            insuredName: this.insuredName,
            insuredPhone: this.insuredPhone,
            commercial: this.commercial,
            relationship: this.relationship,
            insuredType: this.insuredType,
            insuredChannel: this.insuredChannel,
            insuredProject: this.insuredProject,
            forceStartDate: this.forceStartDate,
            forceEndDate: this.forceEndDate,
            forceMoney: this.forceMoney === '' ? '0.00' : this.forceMoney,
            vehicleMoney: this.vehicleMoney === '' ? '0.00' : this.vehicleMoney,
            businessStartDate: this.businessStartDate,
            businessEndDate: this.businessEndDate,
            insuredUnit: this.insuredUnit,
            invoicingMoney: this.invoicingMoney === '' ? '0.00' : this.invoicingMoney,
            businessMoney: this.businessMoney === '' ? '0.00' : this.businessMoney,
            premiumsTotal: this.premiumsTotal,
            discountMoney: this.discountMoney === '' ? '0.00' : this.discountMoney,
            discountCount: this.discountCount,
            receivedMoney: this.receivedMoney === '' ? '0.00' : this.receivedMoney,
            carDamage: this.carDamage,
            cash: this.cash,
            cashObject: this.cashObject,
            three: this.three,
            driver: this.driver,
            scratch: this.scratch,
            specify: this.specify,
            passenger: this.passenger,
            selfGlass: this.selfGlass,
            glass: this.glass,
            discountList: this.discountList,
            promotionsID: this.promotionsID,
            tariffCheck:this.tariffCheck,
            receiveAccount:this.receiveAccount,
            payAccount:this.payAccount,
            rebateAccount:this.rebateAccount,
          }
          console.log( params )


          this.ajaxJson({
            url: '/Insurance/makeUpsave',
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
              } else {
                this.$dialog.alert({
                  alertImg: 'warn',
                  tipValue: data.message
                })
              }
            }
          })

        }

      },

    },
    created () {
      this.addDiscount()
      this.isCashObject()

      this.init({
        url: '/Insurance/initMakeUpForm',
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

          this.tariffCheckList=data.tariffCheckPsd.list
          this.tariffCheck=data.tariffCheckPsd.value


        },
        add: (data) => {
          /* 需要添加的数据 */
          // this.salsesman=this.createName
          // this.salsesmanID = data.personID
        },
        look: (data) => {
          /* 需要查看的数据 */
          this.salsesman=data.salsesman
          this.salsesmanID=data.salsesmanID, //业务员
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
          this.carOwnerID=data.carOwnerID
          this.name=data.promotionsName
          this.promotionsID=data.promotionsID
          this.promotionsQuota=data.promotionsQuota

          if (this.insuredType==0){
            this.isCashOb=true
            this.isDiscountShow=true
            this.isPromotions=false
          }else{
            this.isCashOb=false
            this.isDiscountShow=false
            this.isPromotions=true
          }

          if (this.beinsuredID==this.carOwnerID){    //判断车主和被保险人是否是同一人
            this.isNotEqual=false
          }else {
            this.isNotEqual=true
          }
          // this.unitRate()

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
    },
    watch: {
      insuredPhone(){
        if(this.insuredPhone.length === 11){
          this.insuredPhone = formatPhone(this.insuredPhone)
        }
        if(this.contactPhone.length === 11){
          this.contactPhone = formatPhone(this.contactPhone)
        }

      },
      contactPhone(){
        if(this.contactPhone.length === 11){
          this.contactPhone = formatPhone(this.contactPhone)
        }
      },
      beinsuredidNo(){
        if(this.beinsuredidNo.length === 18){
          this.beinsuredidNo = formatIdNo(this.beinsuredidNo)
        }
      }
    }

  }
</script>

<style scoped>
  .i-yellowWarn{
    color: #1AE642;
    font-size: 24px;
    cursor: pointer;
  }
  .beinSpan::before{
    color: #1AE642;
  }
</style>
<style scoped lang="less">
  .tipShow{display: none;width: 240px;}
</style>
