<template>
    <div class="app_main">
      <yhm-app-structure-top-tap>
        <yhm-app-structure-top-tap-menu @call="backEvent" title="返回"></yhm-app-structure-top-tap-menu>
        <yhm-app-structure-top-tap-menu :select="true" title="报销明细"></yhm-app-structure-top-tap-menu>
      </yhm-app-structure-top-tap>
      <div style="overflow: auto;">
        <div class="noticeBar" v-if="states==9||isFinish==0&&states==-1">请移动到PC端进行拨款</div>
<!--      <yhm-app-scroll :empty="false" :init-load-finish="loadFinish" :is-allow-refresh="false">-->
        <yhm-app-structure-menu-group title="基本信息">
          <yhm-app-view-control title="申请人" :content="name"></yhm-app-view-control>
          <yhm-app-view-control title="申请日期" :content="workDate" ></yhm-app-view-control>
          <yhm-app-view-control title="报销编号" :content="code"></yhm-app-view-control>
          <yhm-app-approval-result v-show="!getShowOperate" :category="state % 2 == 1 || state == -1" :left="3.5" :top="0.5"></yhm-app-approval-result>
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
              <yhm-app-structure-group-operate
                :class="'reimbursenebt'+index"
                v-show="details.length==1?false:true"
                v-if="item.state== states&&states!=9"
                ref="aaa"
              >
              <yhm-app-button @call="rejectEvent(1,item.id,index)"  v-if="getShowOperate" value="驳回" category="ten"></yhm-app-button>
              <yhm-app-button @call="adoptEvent(1,item.id,index)"  v-if="getShowOperate" value="通过" category="two"></yhm-app-button>
              </yhm-app-structure-group-operate>
        </yhm-app-structure-menu-group>
        <div style="width: 100%;height: 0.2rem;"></div>
    </div>
<!--      </yhm-app-scroll>-->
      <yhm-app-form-operate v-if="getShowOperate" v-show="allBtnShow">
        <yhm-app-button @call="rejectEvent(0)" value="驳回" category="ten"></yhm-app-button>
        <yhm-app-button @call="adoptEvent(0)" value="通过" category="two"></yhm-app-button>
      </yhm-app-form-operate>
    </div>
</template>

<script>
  import { ImagePreview }from 'vant';
  import { appviewmixin } from '@/assetsApp/app_view.js'
  export default {
    name: 'm_approvalReimbursementView',
    mixins:[appviewmixin],
    data(){
      return{
        states:'',
        stateList:[],
        allBtnShow:true,
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
        if($(".structureShow").eq(index).is(":hidden")){//判断是否隐藏 去除隐藏后重叠的底部边框
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
        this.$router.push("/homeApp/m_reimbursementManager?isFinish=" + this.isFinishBack)
      },
      //通过事件
      adoptEvent(type,id,index){
        this.$appDialog.confirm({
          tipValue: '是否通过?',
          okCallBack: (data) => {
            let kind = ''
            let ID = ''
            let location = '0'
            let arr = []//全部提交时将每条的id放到数组中
            if(type===1){//单个提交
              kind = '2'
              ID = id
              location = '1'
            }else{//全部提交
              for(let i=0;i<this.details.length;i++){
                if(this.details[i].state==this.states){
                  arr.push(this.details[i].id)
                  setTimeout(()=>{
                    ID = arr.join("◇");
                  },0)
                }
              }
              kind = '1'
              location = '0'
            }
            this.btnShow(index)

            setTimeout(()=>{
              let params = {
                id: ID,
                kind: kind,
                tableName: '40',
                tableDetailName: '41',
                location:location,
              }

              this.ajaxJson({
                url: '/PersonOffice/m_approvalYesVue',
                data: params,
                loading:"0",
                call: (data)=>{
                  if(data.type === 0){
                    if(type==1){
                      this.$appDialog.toast({
                        tipValue: data.message,
                        closeCallBack: () => {
                        }
                      })
                      $(".reimbursenebt"+index).css("display","none");
                    }else{
                      this.$appDialog.toast({
                        tipValue: data.message,
                        closeCallBack: () => {
                          ////结束刷新页面
                          this.isFinish = '1'
                          this.state = -1
                        }
                      })
                    }
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
                        $(".reimbursenebt"+index).css("display","none");
                        ////结束刷新页面

                      }
                    })
                  }
                }
              })
            },0)
          }
        })
      },
      btnShow(index){//根据每个子条目的状态来判断 整个按钮的显示隐藏
        this.stateList[index]=1
        if(this.stateList.indexOf(0)==-1){//等于-1时表示当前主干下的所有分支已经审批完成
          this.allBtnShow = false
        }else{
          this.allBtnShow = true
          for(let i = 0; i<this.details.length; i++){
            if(this.details[i].state%2==1){
              console.log(this.details[i],this.details[i].state)
            }
          }
        }
      },
      //驳回事件
      rejectEvent(type,id,index){
        let kind = ''
        let ID = ''
        let location = ''
        if(type===1){//单个提交
          ID = id
          kind = '2'
          location='1'
        }else{//全部提交
          ID = this.id
          kind = '1'
          location='0'
        }
        this.$appDialog.openWindow({
            url:'/homeApp/m_rejectForm?category=12' +'&id=' + ID + '&tableName=40&kind='+kind+'&tableDetailName=41&location='+location,
          title : '报销申请驳回操作',
          closeCallBack:(data) => {
            this.btnShow(index)
            $(".reimbursenebt"+index).css("display","none");
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
      this.setQuery2Value('states')
      if(this.states=='9'||this.isFinish==0&&this.states==-1){
        this.allBtnShow=false
      }else{
        this.allBtnShow=true
      }

      this.isFinish = this.isApproval
      this.init({
        url: '/PersonOffice/m_reimbursementsForm',
        call:(data)=> {
          this.state = data.state
          this.states = data.state
          this.category = data.category
          this.name = data.name
          this.code = data.code
          this.workDate = data.workDate
          this.details = data.detailLsit
          this.typeList = data.typeList
          this.invoiceCategoryList = data.invoiceCategoryList
          this.invoiceTypeList = data.invoiceTypeList
          for(let i=0;i<this.details.length;i++){
            if(this.details[i].state!==this.states){//判断每条的状态不等于this.states主干的状态时说明当前没有审批权限
              this.stateList.push(1)//状态1是不在审批状态下
            }else{
              this.stateList.push(0)//当前未审批
            }
          }
        }
      })
    },
    computed:{
      getShowOperate(){
        return this.isFinish === '0'
      }
    }
  }
</script>

<style scoped lang="less">
  @rem:375/10rem;
.flex_img{
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.37333333rem;
  color: #888888;
}
  .noticeBar{
    font-size: 14/@rem;
    background-color: #fffbe8;
    color: #ed6a0c;
    padding: 5/@rem 20/@rem;
    text-align: center;
  }
</style>
