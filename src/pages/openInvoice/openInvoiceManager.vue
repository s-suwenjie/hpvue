<template>
  <div>
    <yhm-managerpage :total-table="true">
      <!--导航条-->
      <template #navigation>财务管理&nbsp;&gt;&nbsp;票据&nbsp;&gt;&nbsp;发票管理</template>
      <!--操作区-->
      <template #operate>
        <yhm-commonbutton value="添加" icon="btnAdd" :flicker="true" @call="add()" category="one"></yhm-commonbutton>
        <yhm-commonbutton :value="choose?'收起筛选':'展开筛选'"  :icon="choose?'btnUp':'btnDown'" @call="switchChoose()"></yhm-commonbutton>
        <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initData"></yhm-managersearch>
      </template>
      <!--筛选区-->
      <template #choose>
        <div v-show="choose" class="buttonBody mptZero">
          <yhm-radiofilter  @initData="initChoose('purchaserType')" title="购买方类型" :content="purchaserTypePsd"></yhm-radiofilter>
          <yhm-radiofilter  @initData="initChoose('isReceivables')" title="款项状态" :content="isReceivablesPsd"></yhm-radiofilter>
          <yhm-radiofilter  @initData="initChoose('invoiceCategory')" title="发票类型" :content="invoiceCategoryPsd"></yhm-radiofilter>
          <yhm-radiofilter  @initData="initChoose('state')" title="开票状态" :content="statePsd"></yhm-radiofilter>
        </div>
      </template>
      <template #listHead>
        <yhm-managerth style="width: 38px;" title="选择"></yhm-managerth>
        <yhm-managerth style="width: 50px;" title="查看"></yhm-managerth>
        <yhm-managerth style="width: 110px;" title="申请时间" value="applyDate"></yhm-managerth>
        <yhm-managerth style="width: 80px;" title="发票金额" value="invoiceMoney"></yhm-managerth>
        <yhm-managerth style="width: 120px;" title="开票事由" value="subujectID"></yhm-managerth>
        <yhm-managerth style="width: 190px;" title="购买方" value="purchaserID"></yhm-managerth>
        <yhm-managerth style="width: 150px;" title="发票类型" value="invoiceCategory"></yhm-managerth>
        <yhm-managerth style="width: 80px;" title="款项状态" value=""></yhm-managerth>
        <yhm-managerth style="width: 110px;" title="预计收款日期" value="personID"></yhm-managerth>
        <yhm-managerth style="width: 80px;" title="状态" value=""></yhm-managerth>
        <yhm-managerth  title="操作" value=""></yhm-managerth>
      </template>
      <template #listBody>
        <tr v-for="(item,index) in content" :key="index" :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]">
          <yhm-manager-td-checkbox :value="item"></yhm-manager-td-checkbox>
          <yhm-manager-td-look @click="add(item.id,item.state)"></yhm-manager-td-look>
          <yhm-manager-td-date :value="item.applyDate"></yhm-manager-td-date>
          <yhm-manager-td-money :value="item.invoiceMoney"></yhm-manager-td-money>
          <yhm-manager-td :value="item.subject"></yhm-manager-td>
          <yhm-manager-td :value="item.purchaser"></yhm-manager-td>
          <yhm-manager-td-psd :value="item.invoiceCategory" :list="invoiceCategoryList"></yhm-manager-td-psd>
          <yhm-manager-td-psd :value="item.isReceivables" :list="isReceivablesList"></yhm-manager-td-psd>
          <yhm-manager-td-date :value="item.moneyBackDate"></yhm-manager-td-date>
          <yhm-manager-td-psd :value="item.state" :list="stateList"></yhm-manager-td-psd>
          <yhm-manager-td-operate>
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
      <!--数据空提示-->
      <template #empty>
        <span class="m_listNoData" v-show="empty">暂时没有数据</span>
      </template>

    </yhm-managerpage>
  </div>
</template>

<script>
  import { managermixin } from '@/assets/manager.js'
  export default {
    name: 'openInvoiceManager',
    mixins: [managermixin],
    data(){
      return{
        isReceivablesList:[],
        isReceivables:'',
        isReceivablesPsd: {
          value: '',
          list: []
        },
        purchaserTypeList:[],
        purchaserType:'',
        purchaserTypePsd: {
          value: '',
          list: []
        },
        stateList:[],
        state:'',
        statePsd: {
          value: '',
          list: []
        },
        invoiceCategoryList:[],
        invoiceCategory:'',
        invoiceCategoryPsd: {
          value: '',
          list: []
        },
      }
    },
    methods:{
      add(id,state){
        let url=''
        let title=''
        if(id){
          url='/openInvoiceView?id='+id
          title='查看开票信息'
        }else{
          url='/openInvoiceForm?isAdd=true'
          title='添加开票信息'
        }
        this.$dialog.OpenWindow({
          width: '1050',
          height: '790',
          title: title,
          url:url,
          closeCallBack: (data)=>{
            if(data){
              this.initPageData(false)
            }
          }
        })
      },

      initPageData(initValue){
        let params = {}

        if (initValue) {
          params = {

          }
        } else {
          params = {
            state: this.statePsd.value,
            invoiceCategory:this.invoiceCategoryPsd.value,
            purchaserType:this.purchaserTypePsd.value,
            isReceivables:this.isReceivablesPsd.value,
          }
        }
        this.init({
          initValue:initValue,
          url: '/Bill/openInvoiceManager',
          data:params,
          all:(data) =>{
          },
          init:(data)=>{
            this.statePsd = data.statePsd
            this.stateList = data.statePsd.list
            this.invoiceCategoryPsd = data.invoiceCategoryPsd
            this.invoiceCategoryList = data.invoiceCategoryPsd.list
            this.purchaserTypePsd=data.purchaserTypePsd
            this.purchaserTypeList=data.purchaserTypePsd.list
            this.isReceivablesPsd=data.isReceivablesPsd
            this.isReceivablesList=data.isReceivablesPsd.list
          }
        })
      },
    },
    created () {

    }
  }
</script>

<style scoped>

</style>
