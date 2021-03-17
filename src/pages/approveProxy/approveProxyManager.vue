<template>
  <div>
    <yhm-managerpage>
      <!--导航条-->
      <template #navigation>人力资源&nbsp;&gt;&nbsp;人事管理&nbsp;&gt;&nbsp;审批代理管理</template>
      <!--操作区-->
      <template #operate>
        <yhm-table-tip ref="smallTable" :show="tableTip" :content="tableTipInfo" :column="tableTipColumnInfo" :mouse-control="tableTipControl"></yhm-table-tip>
        <yhm-commonbutton value="添加" icon="btnAdd" :flicker="true" @call="add"></yhm-commonbutton>
        <yhm-commonbutton :value="choose?'收起筛选':'展开筛选'" :icon="choose?'btnUp':'btnDown'" @call="switchChoose()"></yhm-commonbutton>
        <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initData"></yhm-managersearch>
      </template>

      <!--筛选区-->
      <template #choose>
        <div v-show="choose" class="buttonBody mptZero">
          <yhm-radiofilter @initData="initChoose('state')" title="状态" :content="listState"></yhm-radiofilter>
        </div>
      </template>
      <!--数据表头-->
      <template #listHead>
        <yhm-managerth width="38" title="选择"></yhm-managerth>
        <yhm-managerth width="38"  title="查看"></yhm-managerth>
        <yhm-managerth width="200"  title="代理审批类型"></yhm-managerth>
        <yhm-managerth title="代理人员" width="150" value="unitID"></yhm-managerth>
        <yhm-managerth title="开始日期" width="150" value="startDate"></yhm-managerth>
        <yhm-managerth title="结束日期" width="150" value="endDate"></yhm-managerth>
        <yhm-managerth title="状态" width="150" value="state"></yhm-managerth>
        <yhm-managerth title="备注" value="remark"></yhm-managerth>
        <yhm-managerth title="操作" width="200"></yhm-managerth>
      </template>
      <!--数据明细-->
      <template #listBody>
        <tr v-for="(item,index) in content" :key="index" :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]">
          <yhm-manager-td-checkbox :value="item"></yhm-manager-td-checkbox>
          <yhm-manager-td-look @click="view(item.id)"></yhm-manager-td-look>
          <yhm-manager-td :value="item.proxyCategory" @mouseover="tableTipShowEvent" @mouseout="tableTipHideEvent" :value-object="item" :after-icon="item.proxyCount > 1 ? 'i-btn-prompt' : ''"></yhm-manager-td>
          <yhm-manager-td :value="item.proxyPerson"></yhm-manager-td>
          <yhm-manager-td-date :value="item.startDate"></yhm-manager-td-date>
          <yhm-manager-td-date :value="item.endDate"></yhm-manager-td-date>
          <yhm-manager-td-psd :value="item.state" :list="listState.list"></yhm-manager-td-psd>
          <yhm-manager-td :value="item.remark"></yhm-manager-td>
          <yhm-manager-td-operate>
            <yhm-manager-td-operate-button @click="updateState(item)" :no-click="item.state != '0'" value="确认代理" icon="i-complete" color="#49a9ea"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button @click="updateState(item)" :no-click="item.state == '0' || item.state == '2'" value="终止代理" icon="i-btn-del" color="#FF0000"></yhm-manager-td-operate-button>
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
  import { accAdd } from '@/assets/common.js'
  import { managermixin } from '@/assets/manager.js'
  export default {
    name: 'approveProxyManager',
    mixins: [managermixin],
    data () {
      return {
        listState:{
          value:"",
          list:[]
        },
        tableTip: false,
        tableTipControl: {},
        tableTipColumnInfo:[
          {width:'200',title:'代理审批类型',category:'',key:'name'}
        ],
        tableTipInfo:[],
        currentControl:null
      }
    },
    methods: {
      /* 小标格显示 */
      tableTipShowEvent(item,control){
        if(item.proxyCategoryList.length > 1) {
          this.currentControl = control
          this.tableTipInfo = item.proxyCategoryList
          this.tableTipControl = control
          this.tableTip = true
          this.currentControl = control
        }
        else{
          this.currentControl = null
          this.tableTip = false
        }
      },
      moveToSmallTable(e){
        if(this.currentControl) {
          if(!(this.currentControl.contains(e.target) || this.$refs.smallTable.$el.contains(e.target))){
            this.tableTip = false
          }
        }
        else{
          document.removeEventListener('mouseover', this.moveToSmallTable)
        }
      },
      tableTipHideEvent(item,control){
        if(item.proxyCategoryList.length > 1){
          document.addEventListener('mouseover', this.moveToSmallTable)
        }
      },
      // 页面添加和查看事件
      add () {
        this.ajaxJson({
          url: '/sys/approveProxy/isAuth',
          call: (data) => {
            if (data.type == 0) {
              if(data.val === '0'){
                this.$dialog.alert({
                  tipValue: data.message,
                  width:400,
                  alertImg:'warn',
                  closeCallBack: () => {

                  }
                })
              }else if(data.val === '1'){
                var title = '添加审批代理信息'
                this.$dialog.OpenWindow({
                  width: 1050,
                  height: 560,
                  url: '/approveProxyForm',
                  title: title,
                  closeCallBack: (data) => {
                    if (data) {
                      this.lastData = data
                      this.initPageData(false)
                    }
                  }
                })
              }
            }
          }
        })
      },
      view(id){
        var title = '添加审批代理信息'
        this.$dialog.OpenWindow({
          width: 1050,
          height: 560,
          url: '/approveProxyForm?id=' + id,
          title: title,
          closeCallBack: (data) => {
            if (data) {
              this.initPageData(false)
            }
          }
        })
      },
      //跟新状态
      updateState(item){
        let content = "确定将此代理设置为进行中吗？",btnValueOk = '设置为进行中'
        if (item.state == 1){
          content = "确定将此代理设置为已终止吗？"
          btnValueOk = '设置为已终止'
        }
        this.$dialog.confirm({
          width: 350,
          tipValue: content,
          btnValueOk: btnValueOk,
          btnValueCancel:'暂不设置',
          alertImg: 'warn',
          okCallBack: () => {
            let params = {
              id:item.id,
              state: accAdd(item.state , 1)
            }
            this.ajaxJson({
              url: '/sys/approveProxy/updateState',
              data: params,
              call: (data) => {
                if (data.type == 0) {
                  this.$dialog.alert({
                    tipValue: data.message,
                    closeCallBack: () => {
                      this.initPageData()
                    }
                  })
                }
              }
            })
          }
        })
      },
      initPageData (initValue) {
        let params = {}
        if (initValue) {
          // 页面初始化是需要的参数
          params = {}
        } else {
          // 页面非初始化时需要的参数
          params = {
            state: this.listState.value,
          }
        }
        this.init({
          initValue: initValue,
          url: '/sys/approveProxy/getManager',
          data: params,
          all: (data) => {
            // 不管是不是初始化都需要执行的代码
          },
          init: (data) => {
            // 初始化时需要执行的代码
            this.listState = data.statePsd
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
