<template>
  <div class="f_main">
    <yhm-view-body>
      <template #title>基本信息</template>
      <template #body>
        <yhm-view-control title="跟踪状态" :content="categoryVal"></yhm-view-control>
        <yhm-view-control title="购买意向" :content="intentionVal"></yhm-view-control>
        <yhm-view-control title="是否报价" :content="isQuoteVal"></yhm-view-control>
        <yhm-view-control title="商业险报价" :content="businessMoney"></yhm-view-control>
        <yhm-view-control title="车船税报价" :content="travelTaxMoney"></yhm-view-control>
        <yhm-view-control title="交强险报价" :content="forceMoney"></yhm-view-control>
        <yhm-view-control title="报价总额"   :content="totalMoney"></yhm-view-control>
        <yhm-view-control title="过程记录" :content="remark"></yhm-view-control>
        <yhm-view-control title="跟踪人员" :content="trackPerson"></yhm-view-control>
        <yhm-view-control title="下次跟踪日期" :content="nextDate" ></yhm-view-control>
        <yhm-view-control title="预计到店日期" :content="planDate==='1900-01-01'?'-----':planDate" ></yhm-view-control>
        <yhm-view-control title="跟踪反馈" :content="feedbackVal" ></yhm-view-control>
        <yhm-view-control title="商业险报价详情" :content="files" type="files" category="3"></yhm-view-control>
      </template>
    </yhm-view-body>
    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
      <template #btn>

      </template>
    </yhm-formoperate>
  </div>
</template>

<script>
  import { formmixin } from '@/assets/form.js'
  export default {
    name: 'trackFormView',
    mixins: [formmixin],
    data(){
      return{
        categoryVal:'',
        intentionVal:'',
        isQuoteVal:'',
        businessMoney:'',
        travelTaxMoney:'',
        forceMoney:'',
        totalMoney:'',
        remark:'',
        trackPerson:'',
        nextDate:'',
        planDate:'',
        feedbackVal:'',
        businessFile:'',
        files: [],

      }
    },
   methods:{

     initData(){
       let params = {
         id: this.id
       }
       this.init({
         url: '/Insurance/initTrackForm',
         data: params,
         all: (data)=>{

         },
         add: (data)=>{

         },
         look: (data)=>{
           this.categoryVal=data.categoryVal
           this.intentionVal=data.intentionVal
           this.isQuoteVal=data.isQuoteVal
           this.isQuote=data.isQuote
           this.businessMoney=data.businessMoney
           this.files = data.files
           this.travelTaxMoney=data.travelTaxMoney
           this.forceMoney=data.forceMoney
           this.totalMoney=data.totalMoney
           this.remark=data.remark
           this.trackPerson=data.trackPerson
           this.nextDate=data.nextDate
           this.planDate=data.planDate
           this.feedbackVal=data.feedbackVal

           if (this.isQuote ==='1'){
             this.businessMoney='-----'
             this.travelTaxMoney='-----'
             this.forceMoney='-----'
             this.totalMoney='-----'
           }

         }
       })
     }
   },
  created () {
    this.initData()
  }

  }
</script>

<style scoped>

</style>
