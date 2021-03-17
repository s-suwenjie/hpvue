<template>
  <div class="f_main">
    <yhm-formbody>
      <template #title>基本信息</template>
      <template #control>
        <yhm-form-select  title="业务员"  tip="value" aria-autocomplete="both" @click="principalEvent" :value="salsesman" id="salsesman" rule="R0000"></yhm-form-select>
        <yhm-form-radio title="收付款类型" subtitle=""  :select-list="aisleList" :value="aisle" id="aisle"></yhm-form-radio>
        <yhm-form-select title="车牌号" tip="value"   @click="plateEvent" :value="plate" id="plate" rule="R0000"></yhm-form-select>
        <yhm-form-date title="投保日期" subtitle=""   :value="insuredDate" id="insuredDate " position="t"  rule="R0000"></yhm-form-date>
        <yhm-form-zh-select-text tip-before="value" tip-after="beinsuredidNo" @call="beinsuredEvent"  :before="beinsuredName" before-id="beinsuredName" :after="beinsuredidNo" after-id="beinsuredidNo" before-rule="#" after-rule="R0000" title="被保险人" after-title="证件号" after-width="160">

            <div  class="selectCenter"  v-if="isNotEqual" @mouseover="tipChange" @mouseout="tipOut">
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

            <span class="formBoxIcon beinSpan" :class="'i-uniE9b0'+iconbeinsured" @click="iconbeinsuredClick"></span>

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

        <yhm-form-text placeholder="" title="商业险" subtitle="实际金额"  @input="isaMoney" v-if="isbusinessStart" :value="businessMoney" id="businessMoney" >
          <svg   @click="couponClick()" v-if="isCoupon" t="1607072814871" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3185" width="32" height="32"><path d="M1010.195586 397.89971c-0.014326-0.063445-0.035816-0.119727-0.049119-0.180102-0.007163-0.029676-0.01535-0.057305-0.020466-0.084935l-0.00307 0.002047c-2.728137-11.382246-14.098104-18.493208-25.544818-15.903218-11.537789 2.610457-18.773594 14.081731-16.164161 25.620543 0.173962 0.763387 0.390903 1.505285 0.639567 2.22774 13.746086 61.347268 15.135737 123.575603 4.116765 184.9812-10.700724 59.610716-32.580055 115.918195-65.035267 167.359849-32.453165 51.443701-73.851059 95.438748-123.047577 130.755127-50.944327 36.58221-108.0418 62.205823-169.70527 76.157593-61.66654 13.955864-124.232567 15.411007-185.961528 4.32859-59.609692-10.69663-115.917172-32.581079-167.357803-65.040384-51.439607-32.456235-95.431585-73.858222-130.752056-123.053716-36.574023-50.946373-62.196613-108.045893-76.151454-169.709363-13.951771-61.659377-15.409983-124.219264-4.330636-185.944132 10.698677-59.607646 32.579032-115.914102 65.03629-167.349616 32.454189-51.438584 73.854129-95.429538 123.049624-130.748987 50.94535-36.575047 108.042823-62.196613 169.708339-76.15043 61.66347-13.954841 124.228473-15.41203 185.957435-4.33473 59.607646 10.6997 115.913079 32.578009 167.35371 65.031174a400.25127 400.25127 0 0 1 7.731086 5.027508c4.859686 3.677766 11.246146 5.277195 17.656142 3.825123 11.536766-2.610457 18.774618-14.080707 16.163138-25.618496a21.305256 21.305256 0 0 0-7.888675-12.28685l0.008186-0.002047c-0.061398-0.037862-0.12382-0.079818-0.186242-0.119727a21.298093 21.298093 0 0 0-2.039451-1.342579 503.774145 503.774145 0 0 0-8.657179-5.593397c-56.131471-35.416663-117.569813-59.29042-182.612244-70.966356-67.357151-12.083212-135.625046-10.494016-202.910565 4.731773-67.286543 15.226811-129.590603 43.186635-185.180745 83.094593-53.68065 38.538773-98.857617 86.539045-134.27121 142.670516C44.333762 295.405259 20.457958 356.843601 8.783046 421.886031c-12.089352 67.354081-10.498109 135.618906 4.727679 202.897263 15.225788 67.286543 43.180495 129.58958 83.0905 185.180744 38.542866 53.682697 86.545185 98.860687 142.672563 134.273257 56.129424 35.419733 117.570837 59.297584 182.615313 70.971473 67.358175 12.090375 135.628116 10.501179 202.914659-4.725633 67.286543-15.224765 129.587533-43.183565 185.177675-83.097663 53.68065-38.541843 98.853524-86.544162 134.26507-142.680749 35.414616-56.128401 59.29042-117.570837 70.964309-182.615314 12.089352-67.360221 10.498109-135.629139-4.728702-202.915682-0.085958-0.378624-0.176009-0.754177-0.264014-1.133824-0.008186-0.048095-0.01228-0.095168-0.022512-0.140193z" fill="#1296db" p-id="3186"></path><path d="M238.691526 734.52276c35.185395-33.927751 52.778093-60.316798 75.398299-112.46658l33.29944 18.221008c-24.503091 54.034714-43.980721 84.193625-77.281184 119.379021l-31.416555-25.133449z m255.094117-481.283899c0-18.221008-1.257645-33.928774-4.399198-49.63654h45.238366c-3.14053 15.707766-3.770887 30.15891-4.398174 49.63654h196.031894c30.15891 0 48.379919-1.256621 64.087685-4.398174v42.725123c-18.849319-2.513243-37.071351-3.769864-64.087685-3.769864H530.226637v37.698638h125.662126c38.954236 0 54.034714-0.628311 70.999102-3.769864-1.884932 18.849319-2.513243 28.902289-2.513243 64.715996v58.432889c0 36.440993 0.628311 46.494987 2.513243 64.715995-15.707766-2.513243-35.186419-3.141553-69.74248-3.141553H530.226637v43.980721c42.096812-1.256621 88.591799-3.14053 137.600028-5.653773-6.283106-5.654796-13.194523-11.310615-30.15891-23.248516l29.529576-14.450122c40.840191 28.273979 67.228214 50.263827 103.672278 86.077534l-27.646691 24.504115c-18.221008-20.10594-23.247493-25.133449-43.980721-44.610055-91.734376 6.911417-187.237592 11.309591-392.064812 18.221008-18.849319 0.628311-32.673176 1.256621-47.124321 3.141553l-7.539728-42.097836c23.875804 1.885955 42.725123 2.513243 76.653898 2.513243 19.47763 0 74.140655-1.256621 164.617386-3.14053v-45.238366H378.176487c-39.58357 0-55.290312 0.628311-71.627413 3.141554 1.884932-18.222032 2.514266-29.5306 2.514266-64.715996v-56.547957c0-36.442017-0.629334-47.751608-2.514266-66.600927 15.079455 3.141553 32.043842 3.769864 69.742481 3.769864h117.494088v-37.698638H307.805696c-27.017357 0-46.494987 1.256621-62.831064 3.769864v-42.725123c18.221008 3.141553 35.185395 4.398174 62.831064 4.398174h185.979947z m0 103.670232h-147.652999v43.353433h147.652999v-43.353433z m0 74.140654h-147.652999v44.610055h147.652999v-44.610055z m-59.68951 282.110452c0 13.823857 10.681281 15.708789 94.873882 15.708789 55.919646 0 81.680382-2.513243 91.734376-9.42466 9.423636-5.654796 12.565189-16.964387 14.450121-51.521472 11.937902 7.538704 23.248517 12.565189 39.584594 15.707766-10.681281 76.025587-18.849319 80.423761-144.511446 80.423761-69.74248 0-102.414633-2.513243-118.75071-9.424659-10.681281-5.026485-15.707766-15.707766-15.707766-33.928775v-52.777069c0-21.362562-0.628311-33.928774-3.770887-49.636541h45.239389c-2.514266 15.078432-3.141553 24.503091-3.141553 45.237343v49.635517z m116.237467-21.362562c-27.646691-32.042819-43.981744-47.123298-79.796474-74.139631l27.017358-20.734251c33.928774 25.760736 52.148759 40.839168 81.680382 70.999101l-28.901266 23.874781z m136.970695-291.535111v-43.353433h-157.077658v43.353433h157.077658z m0 75.397276v-44.610055h-157.077658v44.610055h157.077658z m69.74248 278.340588c-30.787221-49.008229-55.919646-81.052072-91.733352-117.493065l30.787221-18.849319c39.58357 38.954236 64.715995 69.11417 92.98895 113.095914l-32.042819 23.24647z" fill="#1296db" p-id="3187"></path></svg>
        </yhm-form-text>
        <yhm-form-text v-if="isCouponMoney" no-edit="1" placeholder="" title="使用优惠" subtitle="总金额"  :value="couponMoney+''" id="couponMoney+''"></yhm-form-text>
        <yhm-form-text placeholder="" title="开票金额" subtitle=""  :value="invoicingMoney" id="invoicingMoney" rule="R3000"></yhm-form-text>
        <yhm-form-text placeholder="" title="保费合计" subtitle="" :no-edit="isTotal" :value="premiumsTotal" id="premiumsTotal"  rule="R3000"></yhm-form-text>

        <yhm-form-zh-text-two  ref="rromotions"   :no-edit="isDiscountShow" v-if="isbusinessStart"  :before="discountMoney" before-id="discountMoney"  :after="discountCount" @afterblurEvent="calcAfterMoney" @beforeBlur="calcBeforeMoney" after-id="discountCount" title="优惠金额"  before-icon="rmb" after-title="优惠点数(%)" after-width="50px;">
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
        <yhm-form-text placeholder="" title="实收金额" subtitle=""  :value="receivedMoney+''" id="receivedMoney" rule="R3000"></yhm-form-text>
        <yhm-form-zh-text-more-checkbox :no-edit="true"  :tip-message="tariffTxt" v-if="isCash" @clickCheckBox="clickCheckBoxEvent" title="实际优惠" :value="tariffMoney" id="tariffMoney" :check-value="tariffCheck" check-value-id="tariffCheck" :check-list="tariffCheckList" @input="calcTrAfterMoney" rule="R0000"></yhm-form-zh-text-more-checkbox>


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
  import { accMul, accAdd, guid, formatDate, number2chinese,formatTime ,formatPhone, formatIdNo,} from '@/assets/common.js'
  export default {
    name: 'billingForm',
    mixins: [formmixin],
    data(){
      return{
        tariffTxt:'',
        tariffMoney:'',
        tariffCheck:'',
        tariffCheckList:[
          // {showName:"个人承担",num:"0"},{showName:"公司承担",num:"1"}
          ],
        plate:'',//车主
        plateID:'',
        insuredDate:formatDate( new Date((new Date()).getTime())),//投保日期
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
        aisleList:[],
        aisle:'',
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
        iconbeinsured:'0',
        salsesman:'',
        salsesmanID:'', //业务员
        promotionsID:'',//优惠方案id
        name:'',   //优惠方案别名
        promotionsQuota:'',  //优惠方案额度
        isPromotions:false,
        isCoupon:false,
        couponMoney:0,
        arrListID:[],
        isCouponMoney:false,
      }
    },
    methods:{
      couponClick(){
        this.$dialog.OpenWindow({
          width: 950,
          height: 692,
          url: '/selectCoupon?code='+this.plate+'&category=0',
          title: '选择优惠券',
          closeCallBack: (data) => {
            if (data) {
              let sum=0.00
              let arr=[]
              for(let i in data){
                sum=accAdd(sum,parseFloat(data[i].money)),
                arr.push({
                  id:data[i].id,
                  ownerID:this.id
                }
                )
              }

                this.arrListID=arr
                this.couponMoney=sum
                this.isaMoney()
                if (this.couponMoney>0){
                  this.isCouponMoney=true
                 }


            }
          }
        })
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
            url: '/selectPromotions?brand='+this.plateID+'&insuredUnit='+this.insuredUnit,
            title: '选择优惠活动',
            closeCallBack: (data) => {
              if (data) {
                this.name=data.name
                this.promotionsID=data.id
                this.promotionsQuota=data.amount
                this.discountMoney='0'//优惠金额
                this.discountCount='0'//优惠点位
                this.unitRate()
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

          if (parseFloat( this.businessMoney)>=parseFloat(this.couponMoney)){
            this.receivedMoney=accAdd(parseFloat(this.premiumsTotal),parseFloat(this.discountMoney)*-1) -Number(this.couponMoney)+''
          } else {
            this.receivedMoney=accAdd(parseFloat(this.premiumsTotal),parseFloat(this.discountMoney)*-1) -Number(this.businessMoney)+''
          }

          this.discountCount= this.accMul((parseFloat(this.discountMoney)/(parseFloat(this.businessMoney)-parseFloat(this.couponMoney))).toFixed(4),100)+''
          if (this.cash ==='0'){
            if (parseFloat( this.businessMoney)>=parseFloat(this.couponMoney)) {
              this.receivedMoney = Number(this.premiumsTotal) - Number(this.couponMoney)
            }else{
              this.receivedMoney = Number(this.premiumsTotal) - Number(this.businessMoney)
            }
          }
          this.unitRate()
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
          this.discountMoney = (parseFloat(this.businessMoney)-parseFloat(this.couponMoney)) * (parseFloat(this.discountCount)/100).toFixed(2) +''
          if (parseFloat( this.businessMoney)>=parseFloat(this.couponMoney)){
            this.receivedMoney = accAdd(parseFloat(this.premiumsTotal), parseFloat(this.discountMoney) * -1) -Number(this.couponMoney)
          } else {
            this.receivedMoney = accAdd(parseFloat(this.premiumsTotal), parseFloat(this.discountMoney) * -1) -Number(this.businessMoney)
          }

          if (this.cash ==='0'){
            if (parseFloat( this.businessMoney)>=parseFloat(this.couponMoney)) {
              this.receivedMoney = Number(this.premiumsTotal) - Number(this.couponMoney)
            }else{
              this.receivedMoney = Number(this.premiumsTotal) - Number(this.businessMoney)
            }
          }
          this.unitRate()
        }
      },
      unitRate(){

        if (parseFloat(this.discountCount)>this.promotionsQuota){
          this.tipList = '优惠点数超出保险公司提供的点数'
            // + data[i].showName
            +'优惠额度为:'
            + this.promotionsQuota
            +'%'
          this.isDis=true
          this.hide='1'
        }else {
          this.hide='0'
          this.isDis=false
        }
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
      insuredTypeClick(){//点击投保类型
        let  a=this.insuredProject.sort()
        if(a.indexOf('2')!=-1&&this.insuredType!=0){   //投保类型不是新保 并且投保项目包含商业险
          this.isDiscountShow = false
          this.discountMoney=''
          this.discountCount=''
          this.isCashOb=false
          this.cash='0'
          this.isPromotions=true
          this.isCashObject()
        }else{
          this.isDiscountShow = true
          this.discountMoney='0'
          this.discountCount='0'
          this.unitRate()
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
          this.unitRate()
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
          this.isCashOb=false
          this.isTotal='0'
          this.isbusinessStart=true
          this.cash='0'
          this.isCashObject()
          if (this.insuredType!=0){
            this.isPromotions=true
          }
        }else {
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
          if (parseFloat( this.businessMoney)>=parseFloat(this.couponMoney)){
            this.receivedMoney=Number(this.premiumsTotal)-Number(this.couponMoney)
          } else {
            this.receivedMoney=Number(this.premiumsTotal)-Number(this.businessMoney)
          }
          //this.receivedMoney=Number(this.premiumsTotal)-Number(this.couponMoney)
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
              //-----------------------------------

              if (data.carOwnerID=='' || data.brandVal=='' ){
                 this.updataSelectVehicle(data.vehicleID)
              }else {
                this.plate = data.plate //车牌号
                this.plateID=data.vehicleID
                this.contactID=data.contactPersonID //联系人id
                this.contactName=data.name
                this.contactPhone=data.phone
                this.beinsuredID=data.carOwnerID
                this.beinsuredName=data.carOwner
                this.beinsuredidNo=data.idNo
                this.carOwnerID=data.carOwnerID
                this.forceStartDate=''
                this.forceEndDate=''
                this.businessEndDate=''
                this.businessStartDate=''
                if (data.forceEndDate==='1900-01-01'){
                  this.forceEndDate=''
                }else{
                  let day1 = new Date(data.forceEndDate);
                  day1.setTime(day1.getTime()+24*60*60*1000);
                  let s1 = day1.getFullYear()+"-" + (day1.getMonth()+1) + "-" + day1.getDate();

                  this.forceStartDate=s1   //交强险结束日期
                  this.forceDate()
                }
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
                //-----------------------------
                let paramTemp={
                  id:data.plate,
                  category:0
                }
                this.ajaxJson({
                  url: '/wx/wxCouponDetail/getCouponDetailCount',
                  data: paramTemp,
                  call: (data) => {
                    this.arrListID=[]
                    this.couponMoney=0
                    this.isCouponMoney=false
                    if (data.content>0) {
                      this.isCoupon=true
                    }else {
                      this.isCoupon=false
                    }
                  }
                })
              }

            }
          }
        })

      },
      updataSelectVehicle(id){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '750',
          title: '车主和车辆品牌都不能为空',
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
        if (this.iconbeinsured == '1') {
          this.$dialog.OpenWindow({
            width: 950,
            height: 692,
            url: '/selectUnit?category=1',
            title: '选择投保公司',
            closeCallBack: (data) => {
              if (data) {
                if (data.id===this.carOwnerID){  //判断车主和被保险人是否是同一人
                  this.isNotEqual=false
                }else {
                  this.isNotEqual=true
                }
                this.beinsuredID=data.id
                this.beinsuredName=data.name
                this.beinsuredidNo = data.registrationNumber
                if(this.beinsuredidNo === ''){
                  this.updataSelectPerson(data.id)
                }

              }
            }
          })
        }else {
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
        }
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
      iconbeinsuredClick(){
        if(this.iconbeinsured == '0'){
          this.iconbeinsured = '1'
        }else if(this.iconbeinsured == '1') {
          this.iconbeinsured = '0'
        }
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
          if (this.hide === '1') {        //当hide=1是 需要保险部门审批
            if (this.tariffCheck==0){
              this.discountMoney=this.tariffMoney
            }
            this.$dialog.confirm({
              width: '400',
              alertImg: 'warn',
              tipValue: '因为优惠点数超出保险公司提供的点数、所以此条数据需要经过领导审批?',
              btnValueOk: '确定',
              okCallBack: () => {
                if (true) {
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
                    aisle:this.aisle,
                    couponMoney:this.couponMoney,
                    couponList:this.arrListID,
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
                      } else {
                        this.$dialog.alert({
                          alertImg: 'warn',
                          tipValue: data.message
                        })
                      }
                    }
                  })
                }
              }
            })
          } else {
            if (this.tariffCheck==0){
              this.discountMoney=this.tariffMoney
            }
             //不需要保险部门审批
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
                aisle:this.aisle,
                couponMoney:this.couponMoney,
                couponList:this.arrListID,
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
                  } else {
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
      //保存并提交
      btnSubSave () {

        if (this.validator()) {
          if (this.tariffCheck==0){
            this.discountMoney=this.tariffMoney
          }
          if (this.hide === '1') {
            this.$dialog.confirm({
              width: '400',
              alertImg: 'warn',
              tipValue: '因为优惠点数超出保险公司提供的点数、所以此条数据需要经过领导审批?',
              btnValueOk: '确定',
              okCallBack: () => {
                let params = {
                  id: this.id,
                  process: '1',
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
                  aisle:this.aisle,
                  couponMoney:this.couponMoney,
                  couponList:this.arrListID,
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
                    } else {
                      this.$dialog.alert({
                        alertImg: 'warn',
                        tipValue: data.message
                      })
                    }
                  }
                })
              }
            })
          } else {
            if (this.tariffCheck==0){
              this.discountMoney=this.tariffMoney
            }
            //不需要审批
            let params = {
              id: this.id,
              process: '0',
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
              aisle:this.aisle,
              couponMoney:this.couponMoney,
              couponList:this.arrListID,
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
                } else {
                  this.$dialog.alert({
                    alertImg: 'warn',
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
      this.isCashObject()

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

          this.tariffCheckList=data.tariffCheckPsd.list
          this.tariffCheck=data.tariffCheckPsd.value

          this.aisleList=data.aislePsd.list
          this.aisle=data.aislePsd.value


        },
        add: (data) => {
          /* 需要添加的数据 */
          this.salsesman=this.createName
          this.salsesmanID = data.personID
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
          this.aisle=data.aisle
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
