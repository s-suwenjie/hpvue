<template>
  <div class="f_main">
    <yhm-formbody>
      <template #title>基本信息</template>
      <template #control>
        <yhm-form-radio  title="跟踪状态" @call="categoryEvent" width="1" :select-list="categoryList" :value="category" id="category"></yhm-form-radio>
        <yhm-form-radio  title="购买意向"  :show="isIntention" :select-list="intentionList" :value="intention" id="intention"></yhm-form-radio>
        <yhm-form-radio  title="是否报价"  @call="isQuoteEvent" :show="isIsQuote" :select-list="isQuoteList" :value="isQuote" id="isQuote"></yhm-form-radio>
        <yhm-form-text placeholder=""  @repeatverify="isMoney" v-if="isBusinessMoney" title="商业险" subtitle="报价" tip="value" before-icon="rmb" :value="businessMoney" id="businessMoney" rule="R3000"></yhm-form-text>
<!--        <yhm-form-upload-image title="商业险" subtitle="报价详情" tag="businessFile" v-if="isBusinessMoney"  discription="点击图标或拖拽图片上传"  :value="businessFile" id="businessFile" ></yhm-form-upload-image>-->
        <yhm-form-text placeholder=""  @repeatverify="isMoney" v-if="isTravelTaxMoney" title="车船税" subtitle="报价" tip="value" before-icon="rmb" :value="travelTaxMoney" id="travelTaxMoney" rule="R3000"></yhm-form-text>
        <yhm-form-text placeholder=""  @repeatverify="isMoney" v-if="isForceMoney" title="交强险" subtitle="报价" tip="value" before-icon="rmb" :value="forceMoney" id="forceMoney" rule="R3000"></yhm-form-text>
        <yhm-form-text placeholder=""  title="报价总额" subtitle="" no-edit="1" tip="value" before-icon="rmb" :show="isTotalMoney" :value="totalMoney" id="totalMoney" ></yhm-form-text>


        <yhm-form-textarea  placeholder=""  title="过程记录" subtitle="" :show="isRemark" :value="remark" id="remark" rule="R0000"></yhm-form-textarea>
        <yhm-form-radio  title="潜客级别"  :select-list="levelList" :value="level" :show="isLevel" id="level" @call="levelEvent"></yhm-form-radio>

        <yhm-form-date title="下次"  subtitle="跟踪日期" :min="nowDate" :value="nextDate" :show="isNextDate" id="nextDate" @call="nextDateEvent" position="u" rule="R0000"></yhm-form-date>

        <yhm-form-date title="预计" subtitle="到店日" :min="nowDate" :show="isPlanDate" :value="planDate" id="planDate " position="u" ></yhm-form-date>
        <yhm-form-select  title="跟踪人员" tip="value" @click="trackPersonEvent" :show="isTrackPerson" :value="trackPerson" id="trackPerson" rule="R0000"></yhm-form-select>

        <yhm-form-radio  title="跟踪反馈"  width="1" :select-list="feedbackList" :value="feedback" id="feedback"></yhm-form-radio>
        <yhm-formupload :ownerID="id" :value="fileList" v-if="isBusinessMoney" id="fileList" title="商业险报价详情(支持单据)" tag="track" multiple="multiple"></yhm-formupload>
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
  import { accMul, accAdd, guid, formatDate, number2chinese,formatTime} from '@/assets/common.js'
  export default {
    name: 'trackForm',
    mixins: [formmixin],
    data(){
      return {
        id:'',
        category:'', //
        categoryList:[],
        intention:'',
        intentionList:[],
        isQuote:'',
        isQuoteList:[],
        businessMoney:'',
        fileList: [],//商业险报价详情
        travelTaxMoney:'',
        forceMoney:'',
        totalMoney:'',
        remark:'',
        level:'',
        levelList:[],
        nextDate:'',
        planDate:'',
        trackPersonID:'',
        trackPerson:'',
        ownerID:'',
        currentTime:'',
        feedback:'',
        feedbackList:[],
        nowDate:  formatDate(new Date((new Date()).getTime())),

        isIntention:true, //购买意向
        isIsQuote:true,   //是否报价
        isBusinessMoney:true, //商业险报价
        isTravelTaxMoney:true,  //车船税报价
        isForceMoney:true,  //交强险报价
        isTotalMoney:true,  //报价总额
        isRemark:true,  //过程记录
        isLevel:true, //潜客级别
        isNextDate:true,  //下次跟踪日期
        isPlanDate:true,  //预计到店日
        isTrackPerson:true  //跟踪人员


      }
    },
    methods:{
      categoryEvent(){
        if (this.category === '0' ){
            this.isIntention=true //购买意向
            this.isIsQuote=true   //是否报价
            this.isBusinessMoney=true //商业险报价
            this.isTravelTaxMoney=true  //车船税报价
            this.isForceMoney=true  //交强险报价
            this.isTotalMoney=true  //报价总额
            this.isRemark=true  //过程记录
            this.isLevel=true //潜客级别
            this.isNextDate=true  //下次跟踪日期
            this.isPlanDate=true  //预计到店日
            this.isTrackPerson=true  //跟踪人员
        }else{
          this.isIntention=false //购买意向
          this.isIsQuote=false   //是否报价
          this.isBusinessMoney=false //商业险报价
          this.isTravelTaxMoney=false  //车船税报价
          this.isForceMoney=false  //交强险报价
          this.isTotalMoney=false  //报价总额

        }
      },
      isQuoteEvent(){
        if (this.isQuote === '1'){
            this.isBusinessMoney=false //商业险报价
            this.isTravelTaxMoney=false  //车船税报价
            this.isForceMoney=false  //交强险报价
            this.isTotalMoney=false  //报价总额
        }else  if (this.isQuote === '0'){
          this.isBusinessMoney=true //商业险报价
          this.isTravelTaxMoney=true  //车船税报价
          this.isForceMoney=true  //交强险报价
          this.isTotalMoney=true  //报价总额
        }
      },
      /* 根据所选日期修改潜客时间 */
      nextDateEvent(){
        let nextDateTime = new Date(this.nextDate).getTime()
        let nowDateTime = new Date(new Date()).getTime()
        if(nextDateTime - nowDateTime < 3*24*60*60*1000){
          this.level = '0'
        }
        if( nextDateTime - nowDateTime >3*24*60*60*1000){
          this.level = '1'
        }
        if(nextDateTime - nowDateTime > 7*24*60*60*1000){
          this.level = '2'
        }
        if(nextDateTime - nowDateTime > 15*24*60*60*1000){
          this.level = '3'
        }
      },
      isMoney(){
        if(this.businessMoney!='' && this.travelTaxMoney !=''&& this.forceMoney!='' ){
          this.totalMoney=accAdd(accAdd(parseFloat(this.businessMoney),parseFloat(this.travelTaxMoney)),parseFloat(this.forceMoney))+''
        }
      },
      /* 根据潜客时间修改日期 */
      levelEvent(){
        if(this.level === '0'){
          this.nextDate = formatDate( new Date(accAdd((new Date()).getTime(),3*24*60*60*1000)))
        }else if(this.level === '1'){
          this.nextDate = formatDate( new Date(accAdd((new Date()).getTime(),7*24*60*60*1000)))
        }else if(this.level === '2'){
          this.nextDate = formatDate( new Date(accAdd((new Date()).getTime(),15*24*60*60*1000)))
        }else if(this.level === '3'){
          this.nextDate = formatDate( new Date(accAdd((new Date()).getTime(),30*24*60*60*1000)))
        }
      },
      trackPersonEvent () {
        this.$dialog.OpenWindow({
          width: 950,
          height: 692,
          url: '/selectPerson?category=0&categoryBefore=1',
          title: '选择联系人',
          closeCallBack: (data) => {
            if (data) {
              this.trackPersonID=data.id
              this.trackPerson = data.name
            }
          }
        })
      },

       save() {

        if (this.validator()) {
          let params = {
            id:this.id,
            category:this.category,
            intention:this.intention,
            isQuote:this.isQuote,
            businessMoney:this.businessMoney===''?'0':this.businessMoney,

            files: this.fileList,
            travelTaxMoney:this.travelTaxMoney===''?'0':this.travelTaxMoney,
            forceMoney:this.forceMoney===''?'0':this.forceMoney,
            totalMoney:this.totalMoney===''?'0':this.totalMoney,
            remark:this.remark,
            level:this.level,
            nextDate:this.nextDate,
            planDate:this.planDate,
            trackPersonID:this.trackPersonID,
            ownerID:this.ownerID,
            feedback:this.feedback,
          }
          this.ajaxJson({
            url: '/Insurance/saveTrack',
            data: params,
            call: (data) => {
              if (data.type === 0) {
                this.$dialog.setReturnValue(this.id)
                this.$dialog.alert({
                  tipValue: data.message,
                  closeCallBack: () => {
                    this.$dialog.close()
                    this.initPageData(false)

                  }
                })
              }else if(data.type === 1){
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
      this.setQuery2Value('ownerID')
      this.setQuery2Value('id')
      this.init({
        url: '/Insurance/initTrackForm',
        all: (data) => {

          this.categoryList = data.categoryPsd.list
          this.category = data.categoryPsd.value

          this.intentionList = data.intentionPsd.list
          this.intention = data.intentionPsd.value

          this.isQuoteList = data.isQuotePsd.list
          this.isQuote = data.isQuotePsd.value

          this.levelList = data.levelPsd.list
          this.level = data.levelPsd.value

          this.feedbackList=data.feedbackPsd.list
          this.feedback=data.feedbackPsd.value

          this.levelEvent()  //初始化默认潜客日期为7天

          //跟踪用户默认当前用户
          this.trackPerson=this.createName
          this.trackPersonID=data.personID
        },
        add: (data) => {
          /* 需要添加的数据 */
        },
        look: (data) => {
          /* 需要查看的数据 */
          this.id=data.id
            this.businessMoney=data.businessMoney
            this.fileList = data.files
            this.travelTaxMoney=data.travelTaxMoney
            this.forceMoney=data.forceMoney
            this.totalMoney=data.totalMoney
            this.remark=data.remark
            this.level=data.level
            this.nextDate=data.nextDate
            this.planDate=data.planDate
            this.trackPerson=data.trackPerson
            this.trackPersonID=data.trackPersonID

          if (this.category === '0' ){
            this.isIntention=true //购买意向
            this.isIsQuote=true   //是否报价
            this.isBusinessMoney=true //商业险报价
            this.isTravelTaxMoney=true  //车船税报价
            this.isForceMoney=true  //交强险报价
            this.isTotalMoney=true  //报价总额
            this.isRemark=true  //过程记录
            this.isLevel=true //潜客级别
            this.isNextDate=true  //下次跟踪日期
            this.isPlanDate=true  //预计到店日
            this.isTrackPerson=true  //跟踪人员
          }else{
            this.isIntention=false //购买意向
            this.isIsQuote=false   //是否报价
            this.isBusinessMoney=false //商业险报价
            this.isTravelTaxMoney=false  //车船税报价
            this.isForceMoney=false  //交强险报价
            this.isTotalMoney=false  //报价总额

          }
        }
      })
    },
  }
</script>

<style scoped>

</style>
