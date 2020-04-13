<template>
  <div>
    <yhm-managerpage :sm-table="true" category="1" :isManager="isManager">

      <template #title>
        <p class="isManagerTitle">批量拨付</p>
      </template>

      <template #operate>
        <yhm-table-tip :show="tableTip" :content="tableTipInfo" :column="tableTipColumnInfo" :mouse-control="tableTipControl"></yhm-table-tip>
      </template>

      <!--数据表头-->
      <template #listHead>
        <yhm-managerth title="收款方"></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="申请人"></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="支付方式"></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="倒计时"></yhm-managerth>
        <yhm-managerth style="width: 150px;" title="事由"></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="金额"></yhm-managerth>
        <yhm-managerth style="width: 200px" title="操作"></yhm-managerth>
      </template>
      <template #listBody>
        <tr :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]" v-for="(item,index) in content" :key="index">
          <yhm-manager-td :value="item.otherUnit"></yhm-manager-td>
          <yhm-manager-td :before-icon="item.personList.length > 1?'i-btn-prompt':''" @mouseover="tableTipShowEvent" @mouseout="tableTipHideEvent" :value-object="item" :value="item.name" ></yhm-manager-td>
          <yhm-manager-td-center :value="item.category" ></yhm-manager-td-center>
          <yhm-manager-td-center :value="item.day + '天'"></yhm-manager-td-center>
          <yhm-manager-td :value="item.cause"></yhm-manager-td>
          <yhm-manager-td-money :value="item.money"></yhm-manager-td-money>
          <yhm-manager-td-operate>
            <yhm-manager-td-operate-button icon="icon-applicationSm" @call="batchAllEvent(item)" value="一键拨付"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button icon="icon-urge" @call="printFund(item)" value="打印单据"></yhm-manager-td-operate-button>
          </yhm-manager-td-operate>
        </tr>
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
    name: 'batchAllca',
    mixins: [ managermixin ],
    data(){
      return{
        isManager: true,
        empty: false,
        tableTip:false,         //记录表格是否显示
        tableTipControl:{},
        tableTipColumnInfo:[
          {width:'120',title:'最迟付款日期',category:'date',key:'lastDate'},
          {width:'100',title:'事由',category:'',key:'subject'},
          {width:'100',title:'金额',category:'money',key:'money'},
          {width:'100',title:'状态',category:'',key:'stateVal'}
        ],
        personList: {},
        tableTipInfo:[],

        causetbSwitch: false,
        indexNum: '',
        content: [
          {
            "id": "E2BB8398-17BE-4946-AF68-A716049CE1C5",
            "otherUnit": "北京海派奥特有限公司",
            "name": "程序员",
            "category": "转账",
            "day": "7",
            "cause": "代付保险费",
            "money": "46489",
            "personList": [
              {
                "subject": "银行理财",
                "money": "455.00",
                "lastDate": "2020-04-15",
                "stateVal": "财务审批中",
              }
            ]
          }
        ]
      }
    },
    methods: {
      tableTipShowEvent(item,control){
        if(item.personList.length > 1) {
          this.tableTipInfo = item.personList
          this.tableTipControl = control
          this.tableTip = true
        }
      },
      tableTipHideEvent(){
        this.tableTip = false
      },
      batchAllEvent(item){

      },
      printFund(item){

      },

      initPageData (initValue) {
        return
        let params = {}
        if (initValue) {
          // 页面初始化是需要的参数
          params = {

          }
        } else {
          // 页面非初始化时需要的参数
          params = {

          }
        }
        this.init({
          initValue: initValue,
          url: '/aaa',
          data: params,
          all: (data) => {
            // 不管是不是初始化都需要执行的代码
          },
          init: (data) => {
            // 初始化时需要执行的代码
            // 这边初始化筛选信息

          }
        })
      },
    },
    created () {

    }
  }
</script>

<style scoped lang="less">
  body{
    overflow: hidden;
  }

</style>
