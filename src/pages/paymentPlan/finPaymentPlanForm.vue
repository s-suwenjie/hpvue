<template>
  <div class="f_main">

    <yhm-view-body>
      <template #title>基本信息</template>
      <template #body>
        <yhm-view-control category="5" title="收款方" :content="otherUnit"></yhm-view-control>
      </template>
    </yhm-view-body>
    <div class="f_split"></div>
    <div class="i-left fs48b colorFFF" title="上一条" v-show="isLeftID"  @click="leftStrip" style="width:48px;height:70px;background: #000;opacity:0.3;position: fixed;  bottom:300px;z-index: 9999;display:flex;justify-content:center;align-items:center;">
    </div>
    <div class="i-right fs48b colorFFF" title="下一条" v-show="isRightID" @click="rightStrip" style="width:48px;height:70px;background: #000;opacity:0.3;position: fixed;  bottom:300px;right:0px;z-index: 9999;display:flex;justify-content:center;align-items:center;">
    </div>

    <yhm-view-tab>
      <template #tab>
        <yhm-view-tab-button :list="tabState" :index="0">事件信息</yhm-view-tab-button>
      </template>
      <template #content>
        <yhm-view-tab-list :customize="true" :pager="false" v-show="tabState[0].select">
          <template #listHead>
            <yhm-managerth style="width: 38px" title="查看"></yhm-managerth>
            <yhm-managerth title="事件描述"></yhm-managerth>
            <yhm-managerth style="width: 130px" title="最迟日期"></yhm-managerth>
            <yhm-managerth style="width: 100px" title="付款金额"></yhm-managerth>
            <yhm-managerth style="width: 200px" title="编号"></yhm-managerth>
            <yhm-managerth style="width: 120px" title="状态"></yhm-managerth>
          </template>
          <template #listBody>
            <tr v-for="(item,index) in detail" :class="{InterlacBg:index%2!=0}" :key="item.id">
              <yhm-manager-td-look @click="listView(item,item.id)"></yhm-manager-td-look>
              <yhm-manager-td :value="item.name"></yhm-manager-td>
              <yhm-manager-td-date :value="item.lastDate"></yhm-manager-td-date>
              <yhm-manager-td-money :value="item.money"></yhm-manager-td-money>
              <yhm-manager-td-center :value="item.code"></yhm-manager-td-center>
              <yhm-manager-td-center :value="item.stateVal"></yhm-manager-td-center>
            </tr>
          </template>
          <template #customize>
            <yhm-view-control type="money" category="2" title="自动计算" :content="autoCalcIpt" color="#4BB414"></yhm-view-control>
          </template>
        </yhm-view-tab-list>
      </template>
    </yhm-view-tab>
    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
    </yhm-formoperate>
  </div>

</template>

<script>
  import { formmixin } from '@/assets/form.js'
  export default {
    name: 'paymentPlanViewForm',
    mixins: [formmixin],
    data () {
      return {
        tabState:[{select:true}],
        otherUnit: '',
        detail: [],

        isLeftID:false,//延长按钮
        leftID:'',//上一条ID
        isRightID:false,//延长按钮
        rightID:'',//下一条ID
      }
    },
    methods: {
      leftStrip(){
        window.location='/paymentPlanViewForm?id='+this.leftID
      },
      rightStrip(){
        window.location='/paymentPlanViewForm?id='+this.rightID
      },
      selectedList() {
        let params = {
          id: this.id
        }
        this.ajaxJson({
          url: '/PersonOffice/commonSelectedID',
          data: params,
          call: (data) => {
            if(data.leftID!==""){
              this.leftID=data.leftID
              this.isLeftID=true
            }
            if(data.rightID!==""){
              this.rightID=data.rightID
              this.isRightID=true
            }
          }
        })
      },
      listView (item,id) { //查看
        if (id) {
          this.$dialog.OpenWindow({
            width: 1050,
            height: 690,
            url: '/paymentPlanViewDetailForm?id=' + id,
            title: '查看事件信息',
            closeCallBack: () => {

            }
          })
        }
      },
      initData(){
        this.init({
          url: '/PersonOffice/getPaymentPlanById',
          all: (data) => {
            /* 公共 无论查看和添加返回数据 */

          },
          add: (data) => {
            /* 需要添加的数据 */
          },
          look: (data) => {
            /* 需要查看的数据 */
            this.otherUnit = data.otherUnit
            this.detail = data.list

          }
        })
      }
    },
    created () {
      this.initData()
      this.selectedList()
    },
    computed:{
      autoCalcIpt: function () {
        var bbc = 0
        var bcc
        for(let i = 0;i<this.detail.length;i++){
          bbc += parseFloat(this.detail[i].money)
          bcc = bbc.toFixed(2)
        }
        return bcc
      }
    }
  }
</script>

<style scoped>
  .icon-search:before{
    color: #49a9ea;
  }
</style>
