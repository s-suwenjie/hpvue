<template>
  <div class="f_main">
    <yhm-view-body>
      <template #title>基本信息</template>
      <template #body>
<!--        <yhm-form-date title="对账单" subtitle="日期"   :value="monthsDate" id="monthsDate " position="t"  rule="R0000"></yhm-form-date>-->
        <yhm-view-control title="日期" :content="monthsDate"></yhm-view-control>
<!--        <yhm-form-date title="对账单" subtitle="结束日期"   :value="endDate" id="endDate " position="t"  rule="R0000"></yhm-form-date>-->
        <yhm-view-control category="3" title="行车证" type="files" :content="fileList"></yhm-view-control>
      </template>
    </yhm-view-body>
    <div class="f_split"></div>
    <div class="f_split"></div>
    <div class="v_relative">
    <yhm-table-tip node-class-name="v_relative" :show="tableTip" :content="tableTipInfo" :column="tableTipColumnInfo" :mouse-control="tableTipControl"></yhm-table-tip>
    <yhm-form-list-edit style="position: relative;">

      <template #title>
        账单信息
        <div class="switchover">
          <span class="switchoverButtom" @click="switchoverShow=!switchoverShow" :style="{backgroundColor:!switchoverShow?'#f00':'#09b300'}" style="background-color: #FF0000;">表示盈利</span>
          <svg t="1605231662970" @click="switchoverShow=!switchoverShow" style="position: absolute;top: -12px;" class="icon" viewBox="0 0 1024 1024" version="1.1" p-id="5582" width="48" height="48"><path d="M62.00888889 539.30666667h808.27733333l-103.76533333-155.648h57.344L963.12888889 593.92H62.00888889z" p-id="5583" data-spm-anchor-id="a313x.7781069.0.i0" class="selected" :fill="switchoverShow?'#f00':'#09b300'"></path></svg>
          <svg t="1605231662970" @click="switchoverShow=!switchoverShow" style="position: absolute;top: 2px;transform: rotate(180deg);" class="icon" viewBox="0 0 1024 1024" version="1.1" p-id="5582" width="48" height="48"><path d="M62.00888889 539.30666667h808.27733333l-103.76533333-155.648h57.344L963.12888889 593.92H62.00888889z" p-id="5583" data-spm-anchor-id="a313x.7781069.0.i0" class="selected" :fill="!switchoverShow?'#f00':'#09b300'"></path></svg>
          <span class="switchoverButtom" @click="switchoverShow=!switchoverShow" :style="{backgroundColor:!switchoverShow?'#09b300':'#f00'}" style="background-color:#09b300;">表示亏损</span>
        </div>
      </template>
      <template #listHead>
        <yhm-managerth style="width:38px" title="序号"></yhm-managerth>
        <yhm-managerth title="单号"></yhm-managerth>
        <yhm-managerth style="width: 100px" title="对账单金额"></yhm-managerth>
        <yhm-managerth style="width: 100px" title="实际金额"></yhm-managerth>
        <yhm-managerth style="width: 100px" title="车牌号"></yhm-managerth>
        <yhm-managerth style="width: 150px" title="被保险人"></yhm-managerth>
        <yhm-managerth style="width: 100px" title="联系人"></yhm-managerth>
        <yhm-managerth style="width: 100px" title="状态"></yhm-managerth>
      </template>
      <template #listBody >
        <tr v-for="(item,index) in content" :key="index" :class="{InterlacBg:index%2!==0}" >
          <!--{{item.money > (item.businessMoney==0.00?item.forceMoney:item.businessMoney)?'1':'2'}}-->
          <yhm-manager-td-center  class="admin" :value="index+1+''"></yhm-manager-td-center>
          <yhm-manager-td-center @click="cenBillingClick(item)" class="admin" :value="item.number"></yhm-manager-td-center>

          <yhm-manager-td-money v-if="item.money==(item.forceMoney=='0.00'?item.businessMoney:item.forceMoney)" style="color: #333333;" class="admin" :value="item.money+''" :before-icon="item.listMessage.length>0?'i-btn-prompt':''" @mouseover="tableTipShowEvent" @mouseout="tableTipHideEvent" :value-object="item"></yhm-manager-td-money>
          <yhm-manager-td-money v-else-if="(item.money>(item.businessMoney==0.00?item.forceMoney:item.businessMoney)?'1':'2')=='1'&&!switchoverShow" style="color: #09b300" class="admin" :value="item.money+''" :before-icon="item.listMessage.length>0?'i-btn-prompt':''" @mouseover="tableTipShowEvent" @mouseout="tableTipHideEvent" :value-object="item"></yhm-manager-td-money>
          <yhm-manager-td-money v-else-if="(item.money>(item.businessMoney==0.00?item.forceMoney:item.businessMoney)?'1':'2')=='2'&&!switchoverShow" style="color: #f00" class="admin" :value="item.money+''" :before-icon="item.listMessage.length>0?'i-btn-prompt':''" @mouseover="tableTipShowEvent" @mouseout="tableTipHideEvent" :value-object="item"></yhm-manager-td-money>
          <yhm-manager-td-money v-else-if="(item.money>(item.businessMoney==0.00?item.forceMoney:item.businessMoney)?'1':'2')=='1'&&switchoverShow" style="color: #f00" class="admin" :value="item.money+''" :before-icon="item.listMessage.length>0?'i-btn-prompt':''" @mouseover="tableTipShowEvent" @mouseout="tableTipHideEvent" :value-object="item"></yhm-manager-td-money>
          <yhm-manager-td-money v-else-if="(item.money>(item.businessMoney==0.00?item.forceMoney:item.businessMoney)?'1':'2')=='2'&&switchoverShow" style="color: #09b300" class="admin" :value="item.money+''" :before-icon="item.listMessage.length>0?'i-btn-prompt':''" @mouseover="tableTipShowEvent" @mouseout="tableTipHideEvent" :value-object="item"></yhm-manager-td-money>


          <yhm-manager-td-rgt style="color: #0E128D" class="admin" :value="item.businessMoney==0.00?item.forceMoney+'':item.businessMoney+''"  ></yhm-manager-td-rgt>
          <yhm-manager-td-center  class="admin" :value="item.plate"></yhm-manager-td-center>
          <yhm-manager-td-center  :tip="true" class="admin" :value="item.beinsuredName"></yhm-manager-td-center>
          <yhm-manager-td-center  class="admin" :value="item.contactName"></yhm-manager-td-center>
          <yhm-manager-td-state class="admin" :value="item.stateVal" :state-color="item.stateColor" :state-img="item.stateImg"></yhm-manager-td-state>
        </tr>
      </template>

      <template #empty>
        <span class="m_listNoData" v-show="content.length!=0?false:true">暂时没有数据</span>
      </template>
    </yhm-form-list-edit>
    </div>
  </div>
</template>

<script>
  import { viewmixin } from '@/assets/view.js'
  export default {
    name: 'insuranceUnitUploadView',
    mixins: [viewmixin],
    data(){
      return{
        monthsDate:'',
        content:[],
        endDate:'',
        fileList:[],
        tableTip:false,         //记录表格是否显示
        tableTipControl:{},
        tableTipColumnInfo:[
          {width:'150',title:'审批时间',category:'date',key:'insertDate'},
          {width:'150',title:'审批人员',category:'',key:'messageName'},
          {width:'150',title:'审批备注',category:'',key:'message'},
        ],
        tableTipInfo:[],
        switchoverShow:false,
      }
    },
    methods:{
      cenBillingClick(item){
        let params={
          id:item.number
        }
        this.ajaxJson({
          url: '/Basic/getBillingID',
          data: params,
          call: (data) => {
            if (data.type === 0) {
              this.$dialog.OpenWindow({
                width: '1050',
                height: '700',
                url: '/policyView?id=' + data.val,
                title: '查看保单信息',
                closeCallBack: (data)=>{

                }
              })
            }else{
              this.$dialog.alert({
                alertImg:'warn',
                tipValue: data.message
              })
            }
          }
        })
      },
      tableTipShowEvent(item,control){
        if(item.listMessage.length > 0) {
          this.tableTipInfo = item.listMessage
          this.tableTipControl = control
          this.tableTip = true
        }
      },
      tableTipHideEvent(){
        this.tableTip = false
      },

      initPage(){
        //this.monthsDate=this.monthsDate.slice(0,8)+'-01'
        let params={
          id:this.id,
          monthsDate:this.monthsDate.slice(0,8)+'-01' +' 00:00:00',
          endDate:this.endDate+' 23:59:59',
          unitID:this.unitID
        }

        this.ajaxJson({
          url: '/Basic/UnitInSelectManager',
          data: params,
          call: (data) => {
            this.content=data.details
            this.fileList = data.files
          }
        })
      },
    },
    created () {
      this.setQuery2Value('monthsDate')
      this.setQuery2Value('endDate')
      this.setQuery2Value('unitID')
      this.initPage()
    }
  }
</script>

<style lang="less" scoped>
  .admin{
    border: 1px solid #ccc;
  }
  .switchover{
    width: 240px;
    height: 36px;
    position: absolute;
    top: 10px;
    right: -16px;
    z-index: 9;
    font-size: 12px;
    cursor: pointer;
    display: flex;
    justify-content: space-around;
    align-items: center;
    user-select: none;
  }
  .switchoverButtom{
    width: 60px;
    height: 28px;
    display: flex;
    border-radius: 5px;
    justify-content:center;
    align-items: center;
    color: #fff;
  }
</style>
