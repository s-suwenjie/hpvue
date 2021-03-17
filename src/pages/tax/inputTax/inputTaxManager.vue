<template>
  <div>
    <yhm-managerpage category="1" :total-table="true">
      <!--导航条-->
      <template #navigationTab>
        <router-link class="menuTabDiv menuTabActive" :to="{path:'/home/inputTaxManager'}">进项税</router-link>
        <router-link class="menuTabDiv" :to="{path:'/home/outPutTaxManager'}">销项税</router-link>
      </template>
      <template #operate>
        <!-- 操作区-->
        <yhm-table-tip  :show="tableTip"  @call="tableTipClick" ref="smallTable" :content="tableTipInfo" :column="tableTipColumnInfo" :mouse-control="tableTipControl"></yhm-table-tip>
        <yhm-commonbutton value="添加" icon="btnAdd" :flicker="true" @call="add" category="one"></yhm-commonbutton>
        <yhm-commonbutton :value="choose?'收起筛选':'展开筛选'" :icon="choose?'btnUp':'btnDown'" @call="switchChoose()"></yhm-commonbutton>
        <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initChoose"></yhm-managersearch>
        <yhm-commonbutton style="margin-left: 10px" value="导入Excel认证发票" icon="i-edit"  @call="importEvent()"></yhm-commonbutton>

        <yhm-radiofilterdate title="时间" @initData="selectMonthEvent"></yhm-radiofilterdate>
        <yhm-radiofilter @initData="initChoose('state')" title="发票状态" :content="statePsd"></yhm-radiofilter>
        <yhm-radiofilter @initData="initChoose('invoiceCategory')" title="发票类型" :content="invoiceCategoryPsd"></yhm-radiofilter>
      </template>

      <template #choose>
        <div v-show="choose" class="buttonBody mptZero">
          <yhm-radiofilter @initData="initChoose('ownerType')" title="推送模块" :content="ownerTypePsd"></yhm-radiofilter>
        </div>
      </template>
      <template #listHead>
        <yhm-managerth style="width: 40px;" title="选择" ></yhm-managerth>
        <yhm-managerth style="width: 40px;" title="查看" ></yhm-managerth>
        <yhm-managerth title="添加人" style="width: 70px;"></yhm-managerth>
        <yhm-managerth title="公司名称" style="width: 260px;"></yhm-managerth>
        <yhm-managerth style="width: 100px;"  title="发票代码" ></yhm-managerth>
        <yhm-managerth style="width: 100px;"  title="发票号码" ></yhm-managerth>
        <yhm-managerth style="width: 110px;"  title="开票时间" ></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="发票类型" ></yhm-managerth>
        <yhm-managerth style="width: 80px;" title="发票金额" ></yhm-managerth>
        <yhm-managerth style="width: 65px;" title="税率（%）" ></yhm-managerth>
        <yhm-managerth style="width: 65px;" title="税额" ></yhm-managerth>
        <yhm-managerth style="width: 80px;" title="已抵扣金额" ></yhm-managerth>
        <yhm-managerth style="width: 110px;" title="认证时间" ></yhm-managerth>
        <yhm-managerth style="width: 110px;" title="抵税时间" ></yhm-managerth>
        <yhm-managerth style="width: 80px;" title="状态" ></yhm-managerth>
        <yhm-managerth title="操作" ></yhm-managerth>
      </template>
      <!--      数据表单       -->
      <template #listBody >
        <tr :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]" v-for="(item,index) in content" :key="index">
          <yhm-manager-td-checkbox :value="item" @call="check(selectValue,index)"></yhm-manager-td-checkbox>
          <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>
          <yhm-manager-td :value="item.person" ></yhm-manager-td>
          <yhm-manager-td :tip="true" @click="selectUnit(item)" :value="item.unit" ></yhm-manager-td>
          <yhm-manager-td :value="item.code"></yhm-manager-td>
          <yhm-manager-td :value="item.invoiceCode"></yhm-manager-td>
          <yhm-manager-td-date :value="item.invoiceDate"></yhm-manager-td-date>
          <yhm-manager-td-psd :value="item.invoiceCategory" :list="invoiceCategoryPsd.list"></yhm-manager-td-psd>
          <yhm-manager-td-money :value="item.money"></yhm-manager-td-money>
          <yhm-manager-td-money :value="item.taxRate"></yhm-manager-td-money>
          <yhm-manager-td-money :value="item.taxMoney"></yhm-manager-td-money>
          <yhm-manager-td-money :value="item.deductionMoney"></yhm-manager-td-money>
          <yhm-manager-td-date :value="item.attestationDate"></yhm-manager-td-date>
          <yhm-manager-td-date :value="item.deductionDate"></yhm-manager-td-date>
          <yhm-manager-td-psd :value="item.state" :list="statePsd.list"></yhm-manager-td-psd>
          <yhm-manager-td-operate>
            <yhm-manager-td-operate-button v-show="item.state =='0'" @click="authentication(item)" value="认证" color="#3F2FF4"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button v-show="item.state =='1'&&(item.deductionMoney!=item.taxMoney)" @click="deduction(item)" value="抵扣" color="#BE59F3"></yhm-manager-td-operate-button>
          </yhm-manager-td-operate>
        </tr>
      </template>
      <!--数据空提示-->
      <template #empty>
        <span class="m_listNoData" v-show="empty">暂时没有数据</span>
      </template>
      <!--分页控件-->
      <template #pager>
        <yhm-pagination :pager="pager" @initData="initPageData(false)"></yhm-pagination>
      </template>
      <template #total>
        <div class="listTotalCrente m_list w620">
          <div style="width: 350px;" v-if="total.length>0">
            <table width="100%" cellpadding="0" cellspacing="0" class="m_content_table m_content_total_table">
              <thead>
              <tr>
                <yhm-managerth style="width: 130px;" before-color="#fff" title="" before-title="" ></yhm-managerth>
                <yhm-managerth style="width: 90px;" before-color="#002AFF" title="" before-title="发票张数"></yhm-managerth>
                <yhm-managerth style="width: 130px;" before-color="#9e2c66" title="" before-title="金额"></yhm-managerth>
              </tr>
              </thead>
              <tbody>
                <tr v-for="(item,index) in total" :key="index">
                  <yhm-manager-td-rgt :value="item.state"></yhm-manager-td-rgt>
                  <yhm-manager-td-rgt style="color:#002AFF" :value="item.toBeCertifiedCount"></yhm-manager-td-rgt>
                  <yhm-manager-td-rgt style="color:#9e2c66" :value="item.toBeCertifiedMoney"></yhm-manager-td-rgt>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </template>
    </yhm-managerpage>
    <div class="copyTip" v-if="isCopyTip">复制成功： {{text}}</div>
  </div>
</template>

<script>
  import {managermixin} from '@/assets/manager.js'
  export default {
    name: 'inputTaxManager',
    mixins: [managermixin],
    data(){
      return{
        invoiceCategoryPsd:{
          list:[],
          value:''
        },
        statePsd:{
          list:[],
          value:''
        },
        ownerTypePsd:{
          list:[],
          value:''
        },
        startDate: '',
        endDate: '',
        total:'',
      }
    },
    created () {
      // this.ajaxJson({
      //   url: '/finance/inputTax/getManagerTotal',
      //   call: (data) => {
      //     if (data) {
      //
      //     }
      //   }
      // })
    },
    methods:{
      selectMonthEvent(data,item){
        this.yearMonth = data;
        this.radioTime = item;
        this.startDate = this.radioTime.startDate ? this.radioTime.startDate : newRadioTime.startDate;
        this.endDate = this.radioTime.endDate ? this.radioTime.endDate : newRadioTime.endDate;
        if(this.radioTime){
          this.pager.pageIndex = 1
          this.initPageData(false)
        }
      },
      deduction(item){
        this.$dialog.OpenWindow({
          width: 1050,
          height: 420,
          url:'/deductionDateAndMoney?ownerID='+item.id,
          title:'抵扣时间及金额',
          closeCallBack:(data) =>{
            if(data){
              this.initPageData(false)
            }
          }
        })
      },
      importEvent(){
        this.$dialog.OpenWindow({
          width: '1430',
          height: '690',
          url:'/deduction',
          title:'导入execl信息',
          closeCallBack:(data) =>{
            if(data){
              this.initPageData(false)
            }
          }
        })
      },
      selectUnit(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '690',
          url:'/unitView?id=' + item.unitID,
          title:'查看单位信息',
          closeCallBack:(data) =>{
            if(data){
              this.initPageData(false)
            }
          }
        })
      },
      authentication(item){
        this.$dialog.OpenWindow({
          width: 1050,
          height: 420,
          url:'/authenticationDate?ownerID='+item.id,
          title:'认证时间',
          closeCallBack:(data) =>{
            if(data){
              this.initPageData(false)
            }
          }
        })
      },
      listView(item){
        this.$dialog.OpenWindow({
          width: 1050,
          height: 620,
          url:'/inputTaxView?id='+item.id,
          title:'查看进项税信息',
          closeCallBack:(data) =>{
            if(data){
              //this.initPageData(false)
            }
          }
        })
      },
      add(){
        this.$dialog.OpenWindow({
          width: 1050,
          height: 620,
          url:'/inputTaxForm?ownerID=0',
          title:'添加进项税信息',
          closeCallBack:(data) =>{
            if(data){
              //this.initPageData(false)
            }
          }
        })
      },
      initPageData (initValue) {
        let params = {}
        if (initValue) {
          // 页面初始化是需要的参数
          // 页面初始化是需要的参数
          let nowDate = new Date();
          let newYear = nowDate.getFullYear();
          let newMonth = nowDate.getMonth() + 1;
          let newDate = nowDate.getDate();
          let newHours = nowDate.getHours();
          let newMin = nowDate.getMinutes();
          let newSec = nowDate.getSeconds();
          let lastDate = newDate - 1;

          this.startDate = newYear + '-' + newMonth + '-01 ' + '00:00:00';
          this.endDate = newYear + '-' + newMonth + '-' + newDate + ' ' + newHours + ':' + newMin + ':' + newSec;

          params = {
            startDate: this.startDate,
            endDate: this.endDate,
            init:true,
          }
        } else {
          // 页面非初始化时需要的参数
          params = {
            invoiceCategory:this.invoiceCategoryPsd.value,
            ownerType:this.ownerTypePsd.value,
            startDate: this.startDate,
            endDate: this.endDate,
            state:this.statePsd.value
          }
        }
        this.init({
          initValue: initValue,
          url:'/finance/inputTax/getManager',
          data: params,
          all: (data) => {
            // 不管是不是初始化都需要执行的代码
            this.total=data.total
          },
          init: (data) => {
            this.invoiceCategoryPsd=data.invoiceCategoryPsd
            this.statePsd=data.statePsd
            this.ownerTypePsd=data.ownerTypePsd
          }
        })
      },
    }
  }
</script>

<style scoped>

</style>
