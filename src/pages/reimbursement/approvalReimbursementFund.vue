<template>
  <div>
    <!--数据表头-->
    <yhm-managerpage :sm-table="true" category="1" style="width: 620px">
      <template #operate>
        <yhm-table-tip :show="tableTip" :content="tableTipInfo" :column="tableTipColumnInfo" :mouse-control="tableTipControl"></yhm-table-tip>
      </template>
      <!--数据表头-->
      <template #listHead>
        <yhm-managerth style="width: 180px;" title="报销人"></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="类型"></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="金额"></yhm-managerth>
        <yhm-managerth style="width: 200px" title="操作"></yhm-managerth>
      </template>
      <template #listBody>
        <tr v-for="(item,index) in content" :key="index">
          <yhm-manager-td-center :value="item.person"></yhm-manager-td-center>
          <yhm-manager-td-psd :value="item.category" :list="categoryItems" ></yhm-manager-td-psd>
          <yhm-manager-td-money :value="item.money"></yhm-manager-td-money>
          <yhm-manager-td-operate>
            <yhm-manager-td-operate-button :before-icon="item.printLogList.length > 0?'i-btn-prompt':''" @mouseover="tableTipShowEvent" @mouseout="tableTipHideEvent" :value-object="item"  @click="submit(item)" icon="icon-applicationSm" value="打印报销单"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button @click="transferringFunds(item)" icon="icon-urge" value="拨付资金" :no-click="item.state!=0" v-show="isFund" color="#FF0000"></yhm-manager-td-operate-button>
          </yhm-manager-td-operate>
        </tr>
      </template>


      <!--数据空提示-->
      <template #empty>
        <span class="m_listNoData" v-show="empty">暂时没有数据</span>
      </template>

    </yhm-managerpage>
    <div v-html="contentHtml"></div>
  </div>
</template>

<script>
  import { managermixin } from '@/assets/manager.js'

  export default {
    name: 'approvalReimbursementFund',
    mixins: [managermixin],
    data () {
      return {
        id: '',
        empty: false,
        isThisUnit: true,
        calendar: '',
        content: [],
        categoryItems: [],
        contentHtml: '',
        isPrint: '',
        isFund: true,

        tableTip: false,
        tableTipControl: {},
        tableTipColumnInfo:[
          {width:'60',title:'操作人',category:'',key:'person'},
          {width:'120',title:'最新打印时间',category:'',key:'printDate'},
          {width:'40',title:'次数',category:'',key:'times'}
        ],
        tableTipInfo:[],
        printLogList: {},
      }
    },
    methods: {
      /* 小标格显示 */
      tableTipShowEvent(item,control){
        if(item.printLogList.length > 0) {
          this.tableTipInfo = item.printLogList
          this.tableTipControl = control
          this.tableTip = true
        }
      },
      tableTipHideEvent(){
        this.tableTip = false
      },
      submit (item) {
        this.$dialog.OpenWindow({
          title: '打印报销单信息',
          url: '/approvalReimbursementPrint?fundID=' + item.guid + '&ownerID=' + item.state,
          width: '846',
          height: '614',
          closeCallBack: (data)=> {
            if (data === '0'){///打印单据刷新打印次数
              let printLogParams = {
                ownerID: item.guid
              }
              this.ajaxJson({
                url: '/PersonOffice/getPrintLogsAjax',
                data: printLogParams,
                call: (data) => {
                  if (data){
                    item.printLogList = data
                  }
                }
              })
            }else if (data === '1'){///分单刷新页面
              location.reload()
            }

          }
        })
      },
      transferringFunds (item) {
        this.$dialog.OpenWindow({
          width: '1050',
          height: '740',
          url: '/bankDetailForm?ownerID=' + item.guid + '&bankDetailType=2&directionBefore=1',
          title: '拨付资金',
          closeCallBack: (data) => {
            if(data){
              this.$dialog.setReturnValue(data)
              location.reload()
            }
          }
        })
      },
      initData(){
        this.setQuery2Value('isPrint')
        this.setQuery2Value('id')
        if(this.isPrint === '1'){
          this.isFund = false
        }

        let params = {
          id: this.id
        }
        this.ajaxJson({
          url: '/PersonOffice/getReimbursementSingles',
          data: params,
          call: (data)=>{
            this.content = data.content
            this.categoryItems = data.categoryItems
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
body{
  overflow: hidden;
}
</style>
