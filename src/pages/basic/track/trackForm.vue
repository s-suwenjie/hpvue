<template>
  <div class="f_main">
    <yhm-formbody>
      <template #title>基本信息</template>
      <template #control>
        <yhm-form-date title="跟踪日期"  subtitle="" :no-edit="false" :min="currentDate" :value="currentDate"  id="currentDate"  position="t" rule="R0000"></yhm-form-date>
        <yhm-form-radio  title="跟踪状态" @call="categoryEvent" width="1" :select-list="categoryList" :value="category" id="category"></yhm-form-radio>
        <yhm-form-radio  title="购买意向"  :show="isIntention" :select-list="intentionList" :value="intention" id="intention"></yhm-form-radio>
        <yhm-form-radio  title="是否报价"  @call="isQuoteEvent" :show="isIsQuote" :select-list="isQuoteList" :value="isQuote" id="isQuote"></yhm-form-radio>
        <yhm-form-text placeholder=""  @repeatverify="isMoney" v-if="isBusinessMoney" title="商业险" subtitle="报价" tip="value" before-icon="rmb" :value="businessMoney==='0.00'?'':businessMoney" id="businessMoney" ></yhm-form-text>
        <yhm-form-text placeholder=""  @repeatverify="isMoney" v-if="isTravelTaxMoney" title="车船税" subtitle="报价" tip="value" before-icon="rmb" :value="travelTaxMoney==='0.00'?'':travelTaxMoney" id="travelTaxMoney" ></yhm-form-text>
        <yhm-form-text placeholder=""  @repeatverify="isMoney" v-if="isForceMoney" title="交强险" subtitle="报价" tip="value" before-icon="rmb" :value="forceMoney==='0.00'?'':forceMoney" id="forceMoney" ></yhm-form-text>
        <yhm-form-text placeholder=""  title="报价总额" subtitle="" no-edit="1" tip="value" before-icon="rmb" :show="isTotalMoney" :value="totalMoney" id="totalMoney" ></yhm-form-text>
        <yhm-form-radio  title="便捷备注" v-if="isConvenient" @call="convenienEnt" width="1"  :select-list="convenientList" :value="convenient" id="convenient"></yhm-form-radio>
        <yhm-form-textarea  placeholder=""  title="过程记录" subtitle="" :show="isRemark" :value="remark" id="remark" rule="R0000"></yhm-form-textarea>

        <yhm-form-radio  title="潜客级别"  :select-list="levelList" :value="level" :show="isNextDate" id="level" @call="levelEvent"></yhm-form-radio>

        <yhm-form-date title="下次"    subtitle="跟踪日期" :min="nowDate" :value="nextDate" :show="isNextDate" id="nextDate" @call="nextDateEvent" position="u" rule="R0000"></yhm-form-date>

        <yhm-form-date title="预计" subtitle="到店日" :min="nowDate" :show="isPlanDate" :value="planDate" id="planDate " position="u" ></yhm-form-date>
        <yhm-form-select  title="跟踪人员" tip="value" @click="trackPersonEvent" :show="isTrackPerson" :value="trackPerson" id="trackPerson" rule="R0000"></yhm-form-select>

        <yhm-formupload :ownerID="id" :value="fileList" id="fileList" title="商业险报价详情(支持单据)"  v-if="isBusinessMoney"   tag="track" multiple="multiple"></yhm-formupload>

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
        currentDate:formatDate( new Date((new Date()).getTime())),
        category:'', //
        categoryList:[],
        intention:'',
        intentionList:[],
        convenientList:[],
        convenient:'',
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
        isTrackPerson:true,  //跟踪人员
        isConvenient:false,

      }
    },
    methods:{
      convenienEnt(aa,bbb){

        this.remark=bbb.showName

      },
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
          this.isConvenient=false
        }else{
          this.isIntention=false //购买意向
          this.isIsQuote=false   //是否报价
          this.isBusinessMoney=false //商业险报价
          this.isTravelTaxMoney=false  //车船税报价
          this.isForceMoney=false  //交强险报价
          this.isTotalMoney=false  //报价总额
          this.isPlanDate=false  //预计到店日
          this.isNextDate=false
          this.isConvenient=true
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

        //计算合计金额
        let sum =0.00
        if (this.businessMoney!==''){
          sum = accAdd(sum,this.businessMoney)
        }
        if (this.travelTaxMoney!==''){
          sum = accAdd(sum,this.travelTaxMoney)
        }
        if (this.forceMoney!==''){
          sum = accAdd(sum,this.forceMoney)
        }
        this.totalMoney=sum + ''

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
        }else if(this.level === '4'){
          let forceStartDate = new Date().getTime();
          let y = new Date().getFullYear(),
            isLeap = (0===y%4) && (0===y%100) || (0===y%400),
            days = isLeap ? 366 : 365;
          let yearTime =days*24*60*60*1000;
          let newDateTime = formatDate( new Date(accAdd(forceStartDate,yearTime)));
          this.nextDate = newDateTime

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
          for(let i in this.fileList){
            this.fileList[i].ownerID = this.id
            this.fileList[i].id = guid();
          }
          if (this.category==1){

            this.intention=0
          }
          let params = {
            id:this.id,
            currentDate:this.currentDate,
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
      this.setQuery2Value('trackSum')
      let params = {
        ownerID: this.ownerID
      }
      this.init({
        url: '/Insurance/initTrackForm',
        data: params,
        all: (data) => {
          this.businessMoney=data.businessMoney

          this.travelTaxMoney=data.travelTaxMoney
          this.forceMoney=data.forceMoney
          this.totalMoney=data.totalMoney
          this.remark=data.remark
          this.level=data.level
          this.nextDate=data.nextDate
          this.planDate=data.planDate

          if (this.remark!='') {
            this.fileList = data.files
          }
          this.categoryList = data.categoryPsd.list
          this.category = data.categoryPsd.value

          this.intentionList = data.intentionPsd.list
          this.intention = data.intentionPsd.value

          this.isQuoteList = data.isQuotePsd.list
          this.isQuote = data.isQuotePsd.value

          this.levelList = data.levelPsd.list
          this.level = data.levelPsd.value

          this.convenientList = data.convenientPsd.list
          this.convenient = data.convenientPsd.value


          this.levelEvent()  //初始化默认潜客日期为7天
          //跟踪用户默认当前用户
          this.trackPerson=this.createName
          this.trackPersonID=data.personID

          if (this.remark!==''){  //当不是第一次跟踪信息时

            this.trackPerson=data.trackPerson
            this.trackPersonID=data.trackPersonID

            if (this.category === '0'){
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
              this.isConvenient=false
            }else{
              this.isIntention=false //购买意向
              this.isIsQuote=false   //是否报价
              this.isBusinessMoney=false //商业险报价
              this.isTravelTaxMoney=false  //车船税报价
              this.isForceMoney=false  //交强险报价
              this.isTotalMoney=false  //报价总额
              this.isNextDate=false //下次跟踪日期
              this.isPlanDate=false  //预计到店日
              this.isConvenient=true
            }
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
          }


        },
        add: (data) => {
          /* 需要添加的数据 */
        },
        look: (data) => {
          /* 需要查看的数据 */
          //   this.id=data.id
          //   this.businessMoney=data.businessMoney
          //   this.fileList = data.files
          //   this.travelTaxMoney=data.travelTaxMoney
          //   this.forceMoney=data.forceMoney
          //   this.totalMoney=data.totalMoney
          //   this.remark=data.remark
          //   this.level=data.level
          //   this.nextDate=data.nextDate
          //   this.planDate=data.planDate
          //   this.trackPerson=data.trackPerson
          //   this.trackPersonID=data.trackPersonID
          //
          // if (this.category === '0' ){
          //   this.isIntention=true //购买意向
          //   this.isIsQuote=true   //是否报价
          //   this.isBusinessMoney=true //商业险报价
          //   this.isTravelTaxMoney=true  //车船税报价
          //   this.isForceMoney=true  //交强险报价
          //   this.isTotalMoney=true  //报价总额
          //   this.isRemark=true  //过程记录
          //   this.isLevel=true //潜客级别
          //   this.isNextDate=true  //下次跟踪日期
          //   this.isPlanDate=true  //预计到店日
          //   this.isTrackPerson=true  //跟踪人员
          // }else{
          //   this.isIntention=false //购买意向
          //   this.isIsQuote=false   //是否报价
          //   this.isBusinessMoney=false //商业险报价
          //   this.isTravelTaxMoney=false  //车船税报价
          //   this.isForceMoney=false  //交强险报价
          //   this.isTotalMoney=false  //报价总额
          //
          // }
        }
      })
    },
  }
</script>

<style scoped>

</style>
