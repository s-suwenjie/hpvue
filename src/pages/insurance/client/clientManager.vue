<template>
  <div>
    <yhm-managerpage category="1">
      <!--导航条-->
      <template #navigationTab>
        <router-link class="menuTabDiv menuTabActive" :to="{path:'/home/insurance/clientManager'}">客户管理</router-link>
       </template>
      <!--操作区-->
      <template #operate>
        <yhm-table-tip :show="tableTip" :content="tableTipInfo" :column="tableTipColumnInfo" :mouse-control="tableTipControl"></yhm-table-tip>
        <yhm-commonbutton  value="添加" icon="btnAdd" :flicker="true" @call="add()"></yhm-commonbutton>
        <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initChoose()"></yhm-managersearch>
        <yhm-commonbutton style="margin-left: 30px" value="批量更换负责人" icon="replace"  @call="replace()"></yhm-commonbutton>
        <yhm-radiofilter :before="stateBefore" @initData="initChoose('state')" title="客户状态" :content="listState"></yhm-radiofilter>
      </template>
      <!--筛选区-->
      <template #choose>
        <div v-show="choose" class="buttonBody mptZero">

        </div>
      </template>
      <!--数据表头-->
      <template #listHead>
        <yhm-managerth style="width: 40px;" title="选择"></yhm-managerth>
        <yhm-managerth style="width: 40px;" title="查看"></yhm-managerth>
        <yhm-managerth  title="车牌号" value="plate"></yhm-managerth>
        <yhm-managerth  title="联系人" value="name"></yhm-managerth>
        <yhm-managerth  title="联系方式" value="phone"></yhm-managerth>
        <yhm-managerth  title="客户状态" value="state"></yhm-managerth>
        <yhm-managerth  title="去年投保公司" value="lastYearUnit"></yhm-managerth>
        <yhm-managerth  title="交强险到期日" value="forceEndDate"></yhm-managerth>
        <yhm-managerth  title="商业险到期日" value="businessEndDate"></yhm-managerth>
<!--        <yhm-managerth  title="行车证" value="drivingLicense"></yhm-managerth>-->
        <yhm-managerth  title="负责人" value="principal"></yhm-managerth>
        <yhm-managerth  title="更换操作人"></yhm-managerth>
      </template>

      <!--数据明细-->
      <template #listBody>
        <tr :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]" v-for="(item,index) in content" :key="index">
          <yhm-manager-td-checkbox :value="item"></yhm-manager-td-checkbox>
          <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>
          <yhm-manager-td :value="item.plate"></yhm-manager-td>
          <yhm-manager-td :value="item.name"></yhm-manager-td>
          <yhm-manager-td :value="item.phone"></yhm-manager-td>

          <yhm-manager-td :value="item.stateVal" :after-icon="item.listRemark.length >= 1?'i-btn-prompt':''" @mouseover="tableTipShowEvent" @mouseout="tableTipHideEvent" :value-object="item"></yhm-manager-td>
          <yhm-manager-td :value="item.lastYearUnitVal"></yhm-manager-td>
          <yhm-manager-td-date :value="item.forceEndDate"></yhm-manager-td-date>
          <yhm-manager-td-date :value="item.businessEndDate"></yhm-manager-td-date>
<!--          <yhm-manager-td-image :tip="true" width="850" height="500" :value="item.drivingLicense" tag="drivingLicense"></yhm-manager-td-image>-->
          <yhm-manager-td :value="item.principal"></yhm-manager-td>
          <yhm-manager-td-operate>
            <yhm-manager-td-operate-button  @click="replacePrincipal(item.id)" value="更换负责人" icon="i-replace"  color="#0033FF" ></yhm-manager-td-operate-button>
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
  import {accAdd,accMul} from '@/assets/common.js'
  import { managermixin } from '@/assets/manager.js'
  export default {
    name: 'clientManager',
    mixins: [managermixin],
    data(){
      return{
        tableTip:false,         //记录表格是否显示
        tableTipControl:{},
        tableTipColumnInfo:[
          {width:'150',title:'修改日期',category:'date',key:'remarkInsertDate'},
          {width:'180',title:'原因',category:'',key:'remark'},
        ],
        tableTipInfo:[],

        id :'',
        principal:'', //负责人
        principalID:'', //负责人ID
        stateBefore:'0',// 默认选择状态为可以选择，1为不可以选择
        listState:{
          value: '0', //默认为空
          list: []
        },
      }
    },
    methods:{
      tableTipHideEvent(){
        this.tableTip = false
      },

      tableTipShowEvent(item,control){
        if(item.listRemark.length >= 1) {
          this.tableTipInfo = item.listRemark
          this.tableTipControl = control
          this.tableTip = true
        }
      },
      replace(){
        if (this.selectValue.length ===0){
          this.$dialog.alert({
            tipValue:'至少选择一条信息!!!',
            alertImg: 'warn',
            width:'300'
          })
        }else  if(this.selectValue.length ===1){
          //操作一条
          let arr=[]
          for(let i = 0;i<this.selectValue.length; i++){
            let key = this.selectValue[i]
            arr += key + '☆'
          }
          if (arr.length > 0) {
            arr = arr.substr(0, arr.length - 1);
          }
          this.initTrackMany(arr)
        }else  if (this.selectValue.length >1) {
          //操作多条
          let arr=[]
          for(let i = 0;i<this.selectValue.length; i++){
            let key = this.selectValue[i]
            arr += key + '☆'
          }
          if (arr.length > 0) {
            arr = arr.substr(0, arr.length - 1);
          }
          this.initTrackMany(arr)
          }
      },
      //多选客户是否有人已被跟踪信息
      initTrackMany(arr){
        //-->打开更换负责人页面
        this.$dialog.OpenWindow({
          width: 950,
          height: 692,
          url: '/selectPerson?category=0&categoryBefore=1',
          title: '更换负责人',
          closeCallBack: (data) => {
            if (data) {
              this.principalID=data.id
              this.principal = data.name
              this.$dialog.refresh()
              let params = {
                id:arr,
                principalID:this.principalID, //负责人ID

              }
              //-->具体操作
              this.ajaxJson({
                url: '/Insurance/replacePrincipalMany',
                data: params,
                call: (data) => {
                  if (data.type === 0) {
                    this.$dialog.alert({
                      tipValue: data.message,
                      closeCallBack: () => {
                        this.initPageData(false)
                      }
                    })
                  }else if(data.type === 1){
                    this.$dialog.alert({
                      alertImg:'warn',
                      tipValue: data.message
                    })
                  }
                }
              })
            }
          }
        })
      },

      listView(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '650',
          url: '/clientView?id=' + item.id,
          title: '查看客户信息',
          closeCallBack: (data)=>{
            if(data){
              this.initPageData(false)
            }
          }
        })
      },
      //添加
      add () {
        this.$dialog.OpenWindow({
          width: '1050',
          height: '750',
          url: '/clientForm',
          title: '添加客户信息',
          closeCallBack: (data) => {
            if (data) {
              this.lastData = data
              this.initPageData(false)
              /*false->非初始化=>!import  true->初始化*/
            }
          }
        })
      },

      replacePrincipal(id){
        this.id = id
        this.$dialog.OpenWindow({
          width: 950,
          height: 692,
          url: '/selectPerson?category=0&categoryBefore=1&id=' + this.id,
          title: '更换负责人',
          closeCallBack: (data) => {
            if (data) {
              this.principalID=data.id
              this.principal = data.name
              this.$dialog.refresh()
              let params = {
                id:this.id,
                principalID:this.principalID, //负责人ID

              }
              //-->具体操作
              this.ajaxJson({
                url: '/Insurance/replacePrincipal',
                data: params,
                call: (data) => {
                  if (data.type === 0) {
                    this.$dialog.alert({
                      tipValue: data.message,
                      closeCallBack: () => {
                        this.initPageData(false)
                      }
                    })
                  }else if(data.type === 1){
                    this.$dialog.alert({
                      alertImg:'warn',
                      tipValue: data.message
                    })
                  }
                }
              })
            }
          }
        })
      },
      // 筛选事件
      initChoose (op) {
        if (op === 'state') {
          this.selectValue = []
        }
        this.pager.pageIndex = 1
        this.initPageData(false)
      },
      //搜索
      initPageData (initValue) {
        let params = {}

        if (initValue) {
          params = {
            state:this.listState.value
          }
        } else {
          params = {
            state:this.listState.value
          }
        }
        this.init({
          initValue:initValue,
          url: '/Insurance/getClientManager',
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
      //选择
      selectEvent (data) {
        this.selectValue = selectItem(this.selectValue, data)
      },
    }
  }
</script>

<style scoped>

</style>
