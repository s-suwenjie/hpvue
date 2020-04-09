<template>
  <div class="app_main">
    <yhm-app-structure-top-tap>
      <yhm-app-structure-top-tap-menu @call="backEvent" title="返回"></yhm-app-structure-top-tap-menu>
      <yhm-app-structure-top-tap-menu :select="true" title="报销明细"></yhm-app-structure-top-tap-menu>
    </yhm-app-structure-top-tap>
<!--    <yhm-app-scroll :empty="false" :init-load-finish="loadFinish" :is-allow-refresh="false">-->
    <div style="overflow: auto;">
      <yhm-app-structure-menu-group title="基本信息">
        <yhm-app-view-control title="申请人" :content="name"></yhm-app-view-control>
        <yhm-app-view-control title="申请日期" :content="workDate" ></yhm-app-view-control>
        <yhm-app-view-control title="报销编号" :content="code"></yhm-app-view-control>
      </yhm-app-structure-menu-group>
      <yhm-app-structure-menu-group title="报销明细" v-for="(item,index) in details" :key="index" :main-show="true" @click="toggle(index)" :index="index" :length="details.length">
        <yhm-app-view-control title="事由" style="white-space: nowrap;" :content="item.subject"></yhm-app-view-control>
        <yhm-app-view-control title="类型" :content="item.type" :psd="typeList"></yhm-app-view-control>
        <yhm-app-view-control title="发票类型" :content="item.invoiceCategory" :psd="invoiceTypeList"></yhm-app-view-control>
        <yhm-app-view-control title="费用开始日期" v-show="item.startDate !== ''" :content="item.startDate" type="date"></yhm-app-view-control>
        <yhm-app-view-control title="费用结束日期" v-show="item.endDate !== ''" :content="item.endDate" type="date"></yhm-app-view-control>
        <yhm-app-view-control title="实际金额" :content="item.actualMoney" type="money" color="#f00"></yhm-app-view-control>
        <yhm-app-view-control title="发票金额" :content="item.invoiceMoney" type="money" color="#4BB414"></yhm-app-view-control>



        <yhm-app-view-child title="部门分配">
          <yhm-app-view-control :title="item.selectValue" :content="item.value" type="money" v-for="(item,index) in item.branchLsit" :key="index"></yhm-app-view-control>
        </yhm-app-view-child>


        <yhm-app-view-control title="备注" :content="item.remark"></yhm-app-view-control>
        <yhm-app-view-child :title="'发票明细（' + (index+1) + '）'" v-for="(itemProduct,index) in item.invoiceLsit" :key="index">
          <yhm-app-view-control title="发票号码" :content="itemProduct.code"></yhm-app-view-control>
          <yhm-app-view-control title="开票日期" :content="itemProduct.workDate" type="date"></yhm-app-view-control>
          <yhm-app-view-control title="类型" :content="itemProduct.category" :psd="invoiceTypeList"></yhm-app-view-control>
          <yhm-app-view-control title="发票张数" :content="itemProduct.quantity" ></yhm-app-view-control>
          <yhm-app-view-control title="票面金额" :content="itemProduct.money" type="money"></yhm-app-view-control>
          <yhm-app-view-control title="实报金额" :content="itemProduct.actualMoney" type="money"></yhm-app-view-control>
          <yhm-app-view-control title="备注" :content="itemProduct.remark"></yhm-app-view-control>
          <div class="flex_img">发票照片:
            <div class="headerPic" @click="viewFile(itemProduct.url,itemProduct.isPdf)">
              <img width="48" height="48" :src="'/UploadFile/'+'ElectronicInvoice/'+itemProduct.url" alt="发票" v-if="itemProduct.isPdf === '1'?true:false">
              <img width="48" height="48" :src="'/UploadFile/'+'Invoice/'+itemProduct.url" alt="发票"  v-else>
            </div>
          </div>
        </yhm-app-view-child>

      </yhm-app-structure-menu-group>
<!--    </yhm-app-scroll>-->
    </div>
    <appToast type="loading" v-show="!appToastShow" @login-success="appToastShow = $event"></appToast>

  </div>
</template>

<script>

  import { appviewmixin } from '@/assetsApp/app_view.js'
  import { ImagePreview } from 'vant';
  import appToast from '@/pagesApp/common/appToast'

  export default {
    name: 'm_approvalReimbursementView',
    mixins:[appviewmixin],
    components:{
      appToast
    },
    data(){
      return{
        appToastShow:false,
        isFinishBack: '1',
        loadFinish: false,
        code:'',
        name:'',
        workDate:'',
        state:'',
        isApproval:'0',
        isFinish: '0',
        category:'',
        details:[],
        typeList:[],
        invoiceCategoryList:[],
        invoiceTypeList:[],
      }
    },
    methods:{
      viewFile(url,isPdf){
        let imgUrl=''
        if(isPdf==='1'){
          imgUrl='/UploadFile/'+'ElectronicInvoice/'+url
        }else{
          imgUrl='/UploadFile/'+'Invoice/'+url
        }
        ImagePreview([imgUrl]);
      },
      toggle(index){
        if($(".structureShow").eq(index).is(":hidden")){//判断是否隐藏去除隐藏后重叠的底部边框
          $('.structure_main_title').eq(index+1).css({'border-bottom':'0.02666667rem solid #bfbfbf'})
        }else{
          $('.structure_main_title').eq(index+1).css({'border-bottom':'0'})}
        this.$nextTick(() => {
          $(".structureShow").eq(index).toggle(400,);
          setTimeout(()=>{
            this.loadFinish =!this.loadFinish
          },400)
        })
      },
      backEvent(){
        this.$router.push("/homeApp/m_finReimbursementManager?isFinish=" + this.isFinishBack)
      },
    },
    created () {
      document.querySelector('body').setAttribute('style', 'margin: 0 auto; width: 100%; background:#f3f3f3; overflow-x: hidden;height: 100%;');
      this.setQuery2Value('isFinishBack')
      this.setQuery2Value('isApproval')
      this.isFinish = this.isApproval
      this.init({
        url: '/PersonOffice/m_reimbursementsForm',
        call:(data)=> {
          this.appToastShow = true
          this.state = data.state
          this.category = data.category
          this.name = data.name
          this.code = data.code
          this.workDate = data.workDate
          this.details = data.detailLsit
          this.typeList = data.typeList
          this.invoiceCategoryList = data.invoiceCategoryList
          this.invoiceTypeList = data.invoiceTypeList
        }
      })
    },
    computed:{

    }
  }
</script>

<style scoped>
  .flex_img{
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.37333333rem;
    color: #888888;
  }
</style>
