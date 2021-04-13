<template>
  <div>
    <yhm-managerpage>
      <!--导航条-->
      <template #navigation>库存管理&nbsp;&gt;&nbsp;旧件审批</template>
      <!--操作区-->
      <template #operate>
<!--        <yhm-commonbutton :value="choose?'收起筛选':'展开筛选'" :icon="choose?'btnUp':'btnDown'" @call="switchChoose()"></yhm-commonbutton>-->
        <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initData"></yhm-managersearch>
        <yhm-radiofilter @initData="initPageData(false)" title="状态" all="0" :content="statePsd"></yhm-radiofilter>
      </template>
      <!--筛选区-->
<!--      <template #choose>-->
<!--        <div v-show="choose" class="buttonBody mptZero">-->
<!--&lt;!&ndash;          <yhm-radiofilter @initData="initPageData(false)" title="状态" all="0" :content="statePsd"></yhm-radiofilter>&ndash;&gt;-->
<!--        </div>-->
<!--      </template>-->

      <!--数据表头-->
      <template #listHead>
        <yhm-managerth style="width: 40px;" title="选择"></yhm-managerth>
        <yhm-managerth style="width: 40px;" title="查看"></yhm-managerth>
        <yhm-managerth style="width: 120px;" title="申请人" ></yhm-managerth>
        <yhm-managerth style="width: 150px;" title="申请日期"></yhm-managerth>
        <yhm-managerth style="width: 150px;" title="车牌号"></yhm-managerth>
        <yhm-managerth title="工单号(点击查看)"></yhm-managerth>
        <yhm-managerth style="width: 150px;" title="规格型号"></yhm-managerth>
        <yhm-managerth title="备注"></yhm-managerth>
        <yhm-managerth style="width: 170px;" title="操作"></yhm-managerth>

      </template>
      <template #listBody>
        <tr :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]" v-for="(item,index) in content" :key="index">
          <yhm-manager-td-checkbox :value="item"></yhm-manager-td-checkbox>
          <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>
          <yhm-manager-td :value="item.operator"></yhm-manager-td>
          <yhm-manager-td-center :value="item.insertDate"></yhm-manager-td-center>
          <yhm-manager-td-center :value="item.vehicle"></yhm-manager-td-center>
          <yhm-manager-td-center :value="item.code" @click="goworkOrder(item)" color="#1C5AD1"></yhm-manager-td-center>
          <yhm-manager-td :value="item.model"></yhm-manager-td>
          <yhm-manager-td :value="item.remark"></yhm-manager-td>
          <yhm-manager-td-operate>
            <yhm-manager-td-operate-button value="通过" @click="Operation(item,0)" icon="i-btn-applicationSm" :no-click="item.state == '1'?false:true" :color="item.state=='1'?'#49a9ea':'#D3D1D1'"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button value="驳回" @click="Operation(item,1)" icon="i-btn-applicationSm" :no-click="item.state == '1'?false:true" :color="item.state=='1'?'#FF0000':'#D3D1D1'"></yhm-manager-td-operate-button>
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
  import { managermixin } from '@/assets/manager.js'
  export default {
    name: 'RecoveryApprovalManager',
    mixins: [managermixin],
    data(){
      return {
        statePsd:{
          list:[
            {showName: "已驳回", num: "-1", code: "", img: ""},
            {showName: "审批中", num: "1", code: "", img: ""},
            {showName: "已完成", num: "2", code: "", img: ""}
          ],
          value:'1'
        }
      }
    },
    created () {

    },
    methods:{
      initPageData (initValue) {
        let params = {}
        if (initValue) {
          // 页面初始化是需要的参数
          params = {
            state:this.statePsd.value,
          }
        } else {
          // 页面非初始化时需要的参数
          params = {
            state:this.statePsd.value,
            searchStr:this.searchStr,
          }
        }
        this.init({
          initValue: initValue,
          url: '/dailyoffice/corcRegistration/getAppLostManager',
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
      Operation(item,e){
        if(item.state==1){
          if(e==0){
            this.$dialog.confirm({
              width: 300,
              tipValue: ' 确认通过',
              btnValueOk: '确定',
              alertImg: 'warn',
              okCallBack: (data) => {
                let params = {
                  id: item.id,
                  state: '2'
                }
                this.ajaxJson({
                  url: '/dailyoffice/corcRegistration/updateSubmit',
                  data: params,
                  call: (data) => {
                    if (data.type === 0) {
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
              }
            })
          }else{
            this.$dialog.OpenWindow({
              width: 650,
              height: 230,
              title: '驳回留言',
              url: '/approvalPassMessage?id=' + item.id+'&page=9',
              closeCallBack: (data)=>{
                if (data){
                  this.initPageData(false)
                }
              }
            })
          }
        }
      },
      goworkOrder(item){
        this.$dialog.OpenWindow({
          width: '1070',
          height: '750',
          title: '查看接待单信息',
          url: '/collectionOfDataView?id='+item.receptionid,
          closeCallBack: (data)=>{

          }
        })
      },
    }

  }
</script>

<style scoped>

</style>
