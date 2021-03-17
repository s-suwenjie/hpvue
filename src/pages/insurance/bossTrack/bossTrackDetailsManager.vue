<template>
  <div>
    <yhm-managerpage category="1">
      <!--导航条-->
      <template #navigationTab>
        <router-link class="menuTabDiv " :to="{path:'/home/bossTrack/bossTrackManager'}">管理跟踪信息</router-link>
        <router-link class="menuTabDiv menuTabActive" :to="{path:'/home/bossTrack/bossTrackDetailsManager'}">管理跟踪反馈</router-link>
        <router-link class="menuTabDiv " :to="{path:'/home/bossTrack/followApprovalManager'}">审批跟踪信息</router-link>
        <router-link class="menuTabDiv " :to="{path:'/home/bossTrack/bossPerfectedManager'}">待分配客户信息</router-link>
      </template>
      <!--操作区-->
      <template #operate>
        <yhm-commonbutton :value="choose?'收起筛选':'展开筛选'" :icon="choose?'btnUp':'btnDown'" @call="switchChoose()"></yhm-commonbutton>
        <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initData"></yhm-managersearch>
      </template>
      <!--筛选区-->
      <template #choose>
        <div v-show="choose" class="buttonBody mptZero">

          <yhm-radiofilter :before="feedbackBefore" @initData="initChoose('intention')" title="购买意向" :content="listIntention"></yhm-radiofilter>
        </div>
      </template>
      <!--数据表头-->
      <template #listHead>
        <yhm-managerth style="width: 40px;" title="选择"></yhm-managerth>
        <yhm-managerth style="width: 40px;" title="查看"></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="负责人" value="principal"></yhm-managerth>
        <yhm-managerth style="width: 130px;" title="车牌号" value="plate"></yhm-managerth>
        <yhm-managerth  title="品牌（车型）" value="brandVal"></yhm-managerth>
        <yhm-managerth style="width: 150px;" title="联系人" value="name"></yhm-managerth>
        <yhm-managerth style="width: 130px;" title="联系方式" value="phone"></yhm-managerth>
        <yhm-managerth style="width: 130px;" title="购买意向" value="intentionVal"></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="下次跟踪日期" value="nextDate"></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="预计到店日期" value="planDate"></yhm-managerth>
        <yhm-managerth style="width: 150px;" title="跟踪时间" value="currentDate"></yhm-managerth>
<!--        <yhm-managerth style="width: 150px;" title="跟踪状态" value="categoryVal"></yhm-managerth>-->
        <yhm-managerth  title="过程记录" value="remark"></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="操作"></yhm-managerth>
      </template>

      <!--数据明细-->
      <template #listBody>
        <tr :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]" v-for="(item,index) in content" :key="index">
          <yhm-manager-td-checkbox :value="item"></yhm-manager-td-checkbox>
          <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>
          <yhm-manager-td :value="item.principal"></yhm-manager-td>
          <yhm-manager-td :value="item.plate"></yhm-manager-td>
          <yhm-manager-td tip="value" v-if="item.modelVal!=''" :value="item.brandVal+'('+item.modelVal+')'"></yhm-manager-td>
          <yhm-manager-td v-else :value="item.brandVal"></yhm-manager-td>
          <yhm-manager-td :value="item.name"></yhm-manager-td>
          <yhm-manager-td :value="item.phone"></yhm-manager-td>
          <yhm-manager-td-center :value="item.intentionVal"></yhm-manager-td-center>
          <yhm-manager-td-date :value="item.nextDate"></yhm-manager-td-date>
          <yhm-manager-td-date  :value="item.planDate"></yhm-manager-td-date>
          <yhm-manager-td-date :value="item.currentDate"></yhm-manager-td-date>
<!--          <yhm-manager-td-center :value="item.categoryVal"></yhm-manager-td-center>-->
          <yhm-manager-td tip="value" :value="item.remark"></yhm-manager-td>
          <yhm-manager-td-operate>
            <yhm-manager-td-operate-button :no-click="item.category === '1'" @click="track(item)"  value="跟踪" icon="i-btn-applicationSm" color="#FF0000"></yhm-manager-td-operate-button>
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
    name: 'bossTrackDetailsManager',
    mixins: [managermixin],
    data(){
      return{
        id:'',
        feedbackBefore:'0',// 默认选择状态为可以选择，1为不可以选择

        listIntention:{
          value: '', //默认为空
          list: []
        },
      }
    },
    methods:{
      listView(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '695',
          url: '/trackDetailsView?id=' + item.id,
          title: '查看客户信息',
          closeCallBack: (data)=>{
            if(data){
              this.initPageData(false)
            }
          }
        })
      },
      // 筛选事件
      initChoose (op) {

        if (op === 'intention') {
          this.selectValue = []
        }
        this.initPageData(false)
      },
      track(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '700',
          title: '跟踪信息',
          url: '/trackForm?ownerID='+item.id ,
          closeCallBack:(data)=>{
            if(data){
              this.initPageData(false)
            }
          }
        })
      },

      //搜索
      initPageData (initValue) {
        let params = {}

        if (initValue) {
          params = {

            intention:this.listIntention.value
          }
        } else {
          params = {

            intention:this.listIntention.value
          }
        }
        this.init({
          initValue:initValue,
          url: '/Insurance/getBossTrackDetailsManager',
          data:params,
          all:(data) =>{
            //不管是不是初始化都需要执行的代码
          },
          init:(data)=>{
            //初始化时需要执行的代码
            // 这边初始化筛选信息

            this.listIntention = data.intentionPsd

          }
        })
      }
    }
  }
</script>

<style scoped>

</style>






