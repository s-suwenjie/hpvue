<template>
  <div>
    <yhm-managerpage >
      <!--导航条-->
      <template #navigation>业务管理&nbsp;&gt;&nbsp;基础数据&nbsp;&gt;&nbsp;库存盘点</template>
      <!--操作区-->
      <template #operate>
        <yhm-commonbutton  value="添加" icon="btnAdd" :flicker="true" @call="add()"></yhm-commonbutton>
        <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initData"></yhm-managersearch>
      </template>
      <!--数据表头-->
      <template #listHead>
        <yhm-managerth style="width: 38px;" title="选择"></yhm-managerth>
        <yhm-managerth style="width: 38px;" title="查看"></yhm-managerth>
        <yhm-managerth  title="单据编号" ></yhm-managerth>
        <yhm-managerth  title="盘点仓库" ></yhm-managerth>
        <yhm-managerth  title="盘点日期" ></yhm-managerth>
        <yhm-managerth  title="经手人"></yhm-managerth>
        <yhm-managerth style="width: 100px" title="(盘点商品的" subtitle="正常数量"></yhm-managerth>
        <yhm-managerth style="width: 100px" title="+盘亏数量"></yhm-managerth>
        <yhm-managerth style="width: 100px" title="+盘盈数量)"></yhm-managerth>
        <yhm-managerth style="width: 100px" title="=盘点总数"></yhm-managerth>
        <yhm-managerth style="width: 120px" title="盘点状态"></yhm-managerth>

        <yhm-managerth style="width: 200px;" title="操作"></yhm-managerth>
      </template>

      <!--数据明细-->
      <template #listBody>
        <tr :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]" v-for="(item,index) in content"
            :key="index">
          <yhm-manager-td-checkbox :value="item"></yhm-manager-td-checkbox>
          <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>
          <yhm-manager-td :value="item.code"></yhm-manager-td>
          <yhm-manager-td @click="warehouseView(item)" :value="item.warehouse"></yhm-manager-td>
          <yhm-manager-td-date :value="item.dateTime"></yhm-manager-td-date>
          <yhm-manager-td :value="item.inventoryPersonName"></yhm-manager-td>

          <yhm-manager-td-center  color="#0B0B9F" style="font-size: 16px" v-if="item.state==1" :value="item.message[0].p0"></yhm-manager-td-center>
          <yhm-manager-td-center v-if="item.state==0" value="------"></yhm-manager-td-center>
          <yhm-manager-td-center @click="listP1(item)" color="#FF0000" style="font-size: 16px" v-if="item.state==1" :value="item.message[0].p1"></yhm-manager-td-center>
          <yhm-manager-td-center v-if="item.state==0" value="------"></yhm-manager-td-center>
          <yhm-manager-td-center @click="listP2(item)" color="#288328" style="font-size: 16px" v-if="item.state==1" :value="item.message[0].p2"></yhm-manager-td-center>
          <yhm-manager-td-center v-if="item.state==0" value="------"></yhm-manager-td-center>
          <yhm-manager-td-center @click="listView(item)" style="font-size: 16px" v-if="item.state==1"  :value="item.message[0].count"></yhm-manager-td-center>
          <yhm-manager-td-center v-if="item.state==0" value="------"></yhm-manager-td-center>
          <yhm-manager-td-psd :value="item.state" :list="listState.list"></yhm-manager-td-psd>
          <yhm-manager-td-operate >
            <yhm-manager-td-operate-button v-if="item.state==0"  @click="determineEvent(item)" value="盘库完成点击提交" icon="btnSave" color="#49a9ea"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button v-if="item.state==1"  value="盘库完成" icon="i-finishApprovalOK" color="#2C920B"></yhm-manager-td-operate-button>
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
    </yhm-managerpage>
  </div>
</template>

<script>
  import { selectItem, managermixin } from '@/assets/manager.js'
  export default {
    name: 'stockInventoryManager',
    mixins: [managermixin],
    data(){
      return{
        listState:{
          value:"",
          list:[]
        },
      }
    },
    methods:{
      warehouseView(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '600',
          url:'/stockPositionView?id=' + item.warehouseID,
          title:'查看库位信息',
          closeCallBack:(data) =>{
            this.initPageData(false)
            if (data) {
              this.lastData = data   //最后添加一条数据给与动态闪烁
              // /!*false->非初始化=>!import  true->初始化*!/
            }
          }
        })
      },

      determineEvent(item){
        let params={
          id:item.id,
          ownerID:item.warehouseID

        }
        this.ajaxJson({
          url: '/stock/stockInventory/submit',
          data: params,
          call: (data) => {
            if (data.type == '0') {
              this.$dialog.alert({
                tipValue: data.message,
                closeCallBack: (data) => {
                  this.initPageData(false)
                }
              })
            } else {
              this.$dialog.alert({
                alertImg: 'error',
                tipValue: data.message,
                closeCallBack: () => {
                }
              })
            }
          }
        })
      },
      //添加
      add () {
        this.$dialog.OpenWindow({
          width: '1050',
          height: '750',
          url: '/stockInventoryFrom',
          title: '库存盘点单',
          closeCallBack: (data) => {
            if (data) {
              this.lastData = data
              this.initPageData(false)
            }

          }
        })
      },
      listP2(item){
        if(item.state==0){
          this.$dialog.OpenWindow({
            width: '1050',
            height: '750',
            url: '/stockInventoryFrom?id='+item.id,
            title: '库存盘点单',
            closeCallBack: (data) => {
              if (data) {
                this.lastData = data
                this.initPageData(false)
              }

            }
          })
        }else{
          this.$dialog.OpenWindow({
            width: '1050',
            height: '750',
            url: '/stockInventoryView?id='+item.id+'&c=1',
            title: '库存盘点单',
            closeCallBack: (data) => {
              if (data) {
                this.lastData = data
                this.initPageData(false)
              }

            }
          })
        }
      },
      listP1(item){
        if(item.state==0){
          this.$dialog.OpenWindow({
            width: '1050',
            height: '750',
            url: '/stockInventoryFrom?id='+item.id,
            title: '库存盘点单',
            closeCallBack: (data) => {
              if (data) {
                this.lastData = data
                this.initPageData(false)
              }

            }
          })
        }else{
          this.$dialog.OpenWindow({
            width: '1050',
            height: '750',
            url: '/stockInventoryView?id='+item.id+'&c=0',
            title: '库存盘点单',
            closeCallBack: (data) => {
              if (data) {
                this.lastData = data
                this.initPageData(false)
              }

            }
          })
        }
      },
      listView(item) {
        if(item.state==0){
          this.$dialog.OpenWindow({
            width: '1050',
            height: '750',
            url: '/stockInventoryFrom?id='+item.id,
            title: '库存盘点单',
            closeCallBack: (data) => {
              if (data) {
                this.lastData = data
                this.initPageData(false)
              }

            }
          })
        }else{
          this.$dialog.OpenWindow({
            width: '1050',
            height: '750',
            url: '/stockInventoryView?id='+item.id,
            title: '库存盘点单',
            closeCallBack: (data) => {
              if (data) {
                this.lastData = data
                this.initPageData(false)
              }

            }
          })
        }
      },
      initPageData (initValue) {
        let params = {}

        if (initValue) {
          params = {}
        } else {
          params = {}
        }
        this.init({
          initValue:initValue,
          url: '/stock/stockInventory/getManager',
          data:params,
          all:(data) =>{
            //不管是不是初始化都需要执行的代码
          },
          init:(data)=>{
            //初始化时需要执行的代码
            this.listState=data.statePsd
          }
        })
      },
    },
  }
</script>

<style scoped>

</style>
