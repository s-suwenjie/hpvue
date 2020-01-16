<template>
  <div class="app_main">
    <yhm-app-structure-top-tap>
      <yhm-app-structure-top-tap-menu @call="backEvent" title="返回"></yhm-app-structure-top-tap-menu>
      <yhm-app-structure-top-tap-menu :select="true" title="付款申请"></yhm-app-structure-top-tap-menu>
    </yhm-app-structure-top-tap>
    <yhm-app-scroll :empty="false" :init-load-finish="loadFinish" :is-allow-refresh="false">
      <yhm-app-structure-menu-group title="基本信息"  @click="toggle(0)">
        <yhm-app-view-control style="white-space: nowrap;" title="收款方" :content="details.otherUnit"></yhm-app-view-control>
        <yhm-app-view-control title="是否关联" :content="details.isRelevance" :psd="isRelevanceList"></yhm-app-view-control>
        <yhm-app-view-control title="款项用途" :content="details.name"></yhm-app-view-control>
        <yhm-app-view-control title="收款账号" :content="details.otherAccount"></yhm-app-view-control>
        <yhm-app-view-control title="申请人" :content="details.person"></yhm-app-view-control>
        <yhm-app-view-control title="付款性质" :content="details.nature" :psd="natureList"></yhm-app-view-control>
        <yhm-app-view-control title="发票类型" :content="details.invoice" :psd="invoiceList" v-if="isInvoice"></yhm-app-view-control>
        <yhm-app-view-control title="发票二级类型" :content="details.secondLevelInvoice" :psd="secondLevelInvoiceList" v-if="isInvoice"></yhm-app-view-control>
        <div class="app_files" style="word-break:break-all;">文件:
          <span v-for="(item,index) in files" :key="index" class="imgName" @click="imgSkip(item)">{{item.showName}}</span>
        </div>
        <yhm-app-approval-result v-if="!getShowOperate" v-show="resultShow" :category="getState" :left="3.5" :top="0.5"></yhm-app-approval-result>
        <yhm-app-view-child :title="'发票明细（' + (index+1) + '）'" v-for="(detailsItem,index) in productDetails" :key="detailsItem.id">
          <yhm-app-view-control title="发票号码" :content="detailsItem.code"></yhm-app-view-control>
          <yhm-app-view-control title="开票日期" :content="detailsItem.workDate"></yhm-app-view-control>
          <yhm-app-view-control title="类型" :content="detailsItem.category" :psd="listCategoryList"></yhm-app-view-control>
          <yhm-app-view-control title="发票张数" :content="detailsItem.quantity" ></yhm-app-view-control>
          <yhm-app-view-control title="备注" :content="detailsItem.remark" ></yhm-app-view-control>
          <div class="flex_img">发票照片:
            <div class="headerPic" @click="viewFile(detailsItem.url,detailsItem.isPdf)">
              <img width="48" height="48" :src="'/UploadFile/'+'ElectronicInvoice/'+detailsItem.url" alt="发票" v-if="detailsItem.isPdf === '1'?true:false">
              <img width="48" height="48" :src="'/UploadFile/'+'Invoice/'+detailsItem.url" alt="发票"  v-else>
            </div>
          </div>
        </yhm-app-view-child>

      </yhm-app-structure-menu-group>
      <yhm-app-structure-menu-group title="更多信息">
        <yhm-app-view-control title="付款事由" :content="details.subject"></yhm-app-view-control>
        <yhm-app-view-control title="最迟付款日期" :content="details.lastDate" type="date"></yhm-app-view-control>
        <yhm-app-view-control title="编号" :content="details.code"></yhm-app-view-control>
        <yhm-app-view-control title="支付金额" :content="details.money" type="money" color="#f00"></yhm-app-view-control>
        <yhm-app-view-control title="金额大写" :content="details.capitalMoney"></yhm-app-view-control>
        <yhm-app-view-child title="部门分配" v-show="details.branchList.length=='1'?true:false">
          <yhm-app-view-control :title="items.selectValue" :content="items.value" type="money" v-for="(items,index) in details.branchList" :key="index"></yhm-app-view-control>
        </yhm-app-view-child>
      </yhm-app-structure-menu-group>
    </yhm-app-scroll>

    <yhm-app-form-operate v-if="getShowOperate" v-show="resultShow">
      <yhm-app-button @call="rejectEvent" value="驳回" category="ten"></yhm-app-button>
      <yhm-app-button @call="adoptEvent" value="通过" category="two"></yhm-app-button>
    </yhm-app-form-operate>
  </div>
</template>

<script>
  import { appviewmixin } from '@/assetsApp/app_view.js'
  import { ImagePreview } from 'vant';

  export default {
    name: 'm_paymentApplyView',
    mixins:[appviewmixin],
    data(){
      return{
        category:'',     //类型
        isFinishBack:'1',
        isInvoice: false,
        isApproval:'0',
        loadFinish: false,
        resultShow:true,
        state: '',
        isFinish:'0',
        details:[],
        secondLevelInvoiceList:[],//发票二级类型
        invoiceList:[],//发票类型
        natureList:[],//付款性质
        isRelevanceList:[],
        productDetails:[],
        files:[],
      }
    },
    methods:{
      imgSkip(item){
        let img = /UploadFile/+ item.tag+'/'+ item.storeName
        if(item.image==='1'){
          ImagePreview([img]);
        }else if(item.image==='0'){
          window.open(img)
        }
      },
      toggle(index){
        if($(".structure_main_content").eq(index).is(":hidden")){//判断是否隐藏去除隐藏后重叠的底部边框
          $('.structure_main_title').eq(index).css({'border-bottom':'0.02666667rem solid #bfbfbf'})
        }else{
          $('.structure_main_title').eq(index).css({'border-bottom':'0'})}
        this.$nextTick(() => {
          $(".structure_main_content").eq(index).toggle(400,);
          setTimeout(()=>{
            this.loadFinish =!this.loadFinish
          },400)
        })
      },
      viewFile(url,isPdf){
        let imgUrl=''
        if(isPdf==='1'){
          imgUrl='/UploadFile/'+'ElectronicInvoice/'+url
        }else{
          imgUrl='/UploadFile/'+'Invoice/'+url
        }
        ImagePreview([imgUrl]);
      },
      backEvent(){
        this.$router.push("/homeApp/m_paymentApplyManager?isFinish=" + this.isFinishBack)
      },
      //通过事件
      adoptEvent(){
        this.$appDialog.confirm({
          tipValue: '是否通过?',
          okCallBack: (data) => {
            let params = {
              id: this.id,
              kind: 0,
              tableName: '45',
            }
            this.ajaxJson({
              url: '/PersonOffice/m_approvalYesVue',
              data: params,
              call: (data)=>{
                if(data.type === 0){
                  this.$appDialog.toast({
                    tipValue: data.message,
                    closeCallBack: () => {
                      ////结束刷新页面
                      this.isFinish = '1'
                      this.state = -1
                    }
                  })
                }else if(data.type === 1){
                  this.$appDialog.toast({
                    tipValue: data.message,
                    alertImg: 'error',
                    closeCallBack: () => {
                    }
                  })
                } else if(data.type === 2){
                  this.$appDialog.toast({
                    tipValue: data.message,
                    alertImg: 'error',
                    closeCallBack: () => {
                      ////结束刷新页面

                    }
                  })
                }
              }
            })
          }
        })
      },
      //驳回事件
      rejectEvent(){
        this.$appDialog.openWindow({
          url:'/homeApp/m_rejectForm?category=3' +'&id=' + this.id + '&tableName=45&kind=0&location=0',
          title : '付款申请驳回操作',
          closeCallBack:(data) => {
            if(data){
              this.isFinish = '1'
              this.state = 2
              this.rejectDetail = data
            }
          }
        })
      },
    },
    created () {
      document.querySelector('body').setAttribute('style', 'margin: 0 auto; width: 100%; background:#f3f3f3; overflow-x: hidden;height: 100%;');
      this.setQuery2Value('isFinishBack')
      this.setQuery2Value('isApproval')
      console.log(this.isApproval)
      if(this.isApproval==='2'){
        this.resultShow = false
      } else{
        this.isFinish = this.isApproval
      }
      this.$nextTick(() => {
        setTimeout(()=>{
          this.loadFinish =!this.loadFinish
        },100)
      })
      this.init({
        url: '/PersonOffice/m_initPaymentForm',
        call:(data)=> {
          this.details = data
          this.productDetails = data.paymentInvoice
          this.category = data.category
          this.natureList = data.naturePsd.list
          this.invoiceList = data.invoicePsd.list
          this.isRelevanceList=data.isRelevancePsd.list
          this.secondLevelInvoiceList = data.secondLevelInvoicePsd.list
          this.listCategoryList = data.listCategoryPsd.list
          this.files = data.files
          this.state = data.state
        }
      })
    },
    computed:{
      getShowOperate(){
        return this.isFinish === '0'
      },
      getState(){
        return this.state % 2 === 1 || this.state === -1
      }
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
  .app_files{
    flex: 1;
    font-size: 0.37333333rem;
    padding-bottom: 0.42666667rem;
    color: #888888;
  }
  .app_files span{
    text-decoration: underline;
    float: right;
    margin-left: 0.22666667rem;
  }
  .imgName{
    color: #49a9ea;
    cursor: pointer;
    width: 65%;
    text-align: right;
  }
  .imgName:hover{
    text-decoration: underline;
  }
</style>
