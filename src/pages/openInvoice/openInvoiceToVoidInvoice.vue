<template>
  <div class="f_main" style="height: 240px;">
    <yhm-view-tab style="width: 730px;height: 320px;text-align: center;">
      <template #content>
        <yhm-view-tab-list :customize="true">
          <template #listHead>
            <yhm-managerth style="width: 40px" title="查看"></yhm-managerth>
            <yhm-managerth style="width: 110px" title="发票号"></yhm-managerth>
            <yhm-managerth style="width: 110px" title="发票金额"></yhm-managerth>
            <yhm-managerth style="width: 110px" title="作废时间"></yhm-managerth>
            <yhm-managerth style="width: 80px" title="操作人"></yhm-managerth>
            <yhm-managerth style="width: 110px" title="作废原因"></yhm-managerth>
            <yhm-managerth style="width: 110px" title="发票图片"></yhm-managerth>
          </template>
          <template #listBody>
            <tr v-for="(item,index) in openInvoiceList" :key="index" :class="{InterlacBg:index%2!==0}">
              <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>
              <yhm-manager-td :value="item.code"></yhm-manager-td>
              <yhm-manager-td-money :value="item.money"></yhm-manager-td-money>
              <yhm-manager-td-date :value="item.insertDate"></yhm-manager-td-date>
              <yhm-manager-td :value="item.operator"></yhm-manager-td>
              <yhm-manager-td :value="item.cause"></yhm-manager-td>
              <yhm-manager-td-image @click="showInvoicePdfEvent(item)" tag="Invoice" :value="item.url"></yhm-manager-td-image>
            </tr>
          </template>
          <template #empty v-if="empty">
            <span class="m_listNoData">暂时没有数据</span>
          </template>
        </yhm-view-tab-list>
      </template>
    </yhm-view-tab>
  </div>
</template>

<script>
  import { formmixin } from '@/assets/form.js'
  export default {
    name: 'openInvoiceToVoidInvoice',
    mixins: [formmixin],
    data(){
      return{
        openInvoiceList:[],
        ownerID:'',
        empty:true,
      }
    },
    methods: {
      showInvoicePdfEvent(item){
        window.open('/UploadFile/Invoice/'+item.url)
      },
      listView(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '690',
          title: '查看作废原因',
          url: '/toVoidInvoice?id=' + item.id + '&op=1',
          closeCallBack: (data)=>{
            if(data){
              this.initPageData(false)
            }
          }
        })
      },
      init(){
        let params={
          ownerID:this.ownerID
        }
        this.ajaxJson({
          url: '/Bill/openInvoiceToVoidInvoice',
          data:params,
          call:(data) =>{
            this.openInvoiceList=data
            this.empty =this.openInvoiceList.length===0
          }
        })
      },
    },
    created () {
      this.setQuery2Value('ownerID');
      this.init();
    },
  }
</script>

<style scoped>

</style>
