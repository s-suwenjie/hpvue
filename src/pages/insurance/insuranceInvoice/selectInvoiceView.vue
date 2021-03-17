<template>
  <div class="f_main">
    <yhm-view-tab>
      <template #tab>
        <div style="font-size: 16px;">公司名称:
         <span style="color: #FF0000;font-size: 18px"> {{name}}</span>
          <!--<span style="position: absolute;margin-left: 70px">开票税额：<span style="color: #1A7355;font-size: 20px">{{sumMoney}}</span></span>-->
          <!--<span style="position: absolute;margin-left: 460px">总金额：<span style="color: #1A7355;font-size: 20px">{{lastData}}</span></span>-->

        </div>
      </template>
      <template #content>
        <yhm-view-tab-list :customize="true" :pager="true" customize-bg-color="#e2f1f0" v-show="tabState[0].select">
          <template #listHead>
            <yhm-managerth  title="开票人"></yhm-managerth>
            <yhm-managerth  title="类型"></yhm-managerth>

            <yhm-managerth  title="税额"></yhm-managerth>
            <yhm-managerth  title="(X) 税率"></yhm-managerth>
            <yhm-managerth style="font-size: 18px;color: #1A7355" title="(=) 开票总金额"></yhm-managerth>
          </template>
          <template #listBody>
            <tr v-for="(item,index) in listDetails" :key="index" :class="{InterlacBg:index%2!==0}">
              <yhm-manager-td-center :value="item.person"></yhm-manager-td-center>
              <yhm-manager-td-center @click="selectInvoiceClick(item)" :value="item.invoiceCategoryVal"></yhm-manager-td-center>
              <yhm-manager-td-money :value="item.taxAmount+''"></yhm-manager-td-money>
              <yhm-manager-td-center :value="item.taxRate+'%'"></yhm-manager-td-center>
              <yhm-manager-td-money style="font-size: 16px" :value="item.invoiceMoney+''"></yhm-manager-td-money>
            </tr>
          </template>
          <template #empty>
            <span class="m_listNoData" v-show="listDetails.length=='0'?true:false">暂时没有数据</span>
          </template>
          <template #pager>
            <span style="position: absolute;margin:8px 0px 0px 550px;float: right">开票税额：<span style="color: #1A7355;font-size: 20px">{{sumMoney}}</span></span>
            <span style="position: absolute;margin:8px 0px 0px 780px;float: right">总金额：<span style="color: #1A7355;font-size: 20px">{{lastData}}</span></span>

            <yhm-pagination :pager="pager" is-page-size="false" :is-select-info="false" @initData="listPage(false)"></yhm-pagination>

          </template>

        </yhm-view-tab-list>
      </template>
    </yhm-view-tab>
  </div>
</template>

<script>
  import { viewmixin } from '@/assets/view.js'
  export default {
    name: 'selectInvoiceView',
    mixins: [viewmixin],
    data(){
      return{
        tabState:[{select:true}],
        listDetails:[],
        name:'',
        lastData:'',
        sumMoney:0.00,
      }
    },
    methods:{
      selectInvoiceClick(item){
        let url=''
        let title=''
        if(item.id){
          // if(item.state !== '0'){
          url='/openInvoiceView?id='+item.id +'&type=0'
          // }else{
          // url='/openInvoiceForm?id='+item.id
          // }
          title='查看开票信息'
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
      listPage(){
        let params = {
          id: this.id,
        }

        this.ajaxJson({
          url: '/Insurance/selectInvoiceByID',
          data: params,
          call: (data) => {
            this.listDetails=data.content
            this.lastData=data.lastData
            for (let i in data.content){
              this.sumMoney+=data.content[i].taxAmount
            }

          },
        })
      },
    },
    created () {

      this.setQuery2Value('id')
      this.setQuery2Value('name')
     this.listPage()
    },
  }
</script>

<style scoped>

</style>

