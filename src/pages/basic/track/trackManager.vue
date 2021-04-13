<template>
  <div>
    <yhm-managerpage category="1">
      <!--导航条-->
      <template #navigationTab>
        <router-link class="menuTabDiv menuTabActive" :to="{path:'/home/track/trackManager'}">跟踪信息</router-link>
        <router-link class="menuTabDiv " :to="{path:'/home/trackDetails/trackDetailsManager'}">跟踪反馈</router-link>
        <router-link class="menuTabDiv " :to="{path:'/home/track/perfectedManager'}">待完善客户信息</router-link>
      </template>
      <!--操作区-->
      <template #operate>
        <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initPageData(false)"></yhm-managersearch>
        <yhm-radiofilter :before="stateBefore" @initData="initChoose('insuredType')" title="客户投保状态" :content="ListInsuredType"></yhm-radiofilter>
      </template>
      <!--数据表头-->
      <template #listHead>
        <yhm-managerth style="width: 40px;" title="选择"></yhm-managerth>
        <yhm-managerth style="width: 40px;" title="查看"></yhm-managerth>
        <yhm-managerth style="width: 100px" title="车牌号" value="plate"></yhm-managerth>
        <yhm-managerth style="width: 100px" title="品牌（车型）" value="brandVal"></yhm-managerth>
        <yhm-managerth style="width: 80px" title="联系人" value="name"></yhm-managerth>
        <yhm-managerth style="width: 120px" title="联系方式" value="phone"></yhm-managerth>
        <yhm-managerth style="width: 100px" title="去年投保公司" value="lastYearUnitVal"></yhm-managerth>
        <yhm-managerth style="width: 100px" title="客户投保类型" value="insuredType"></yhm-managerth>
        <yhm-managerth style="width: 120px" title="交强险到期日" value="forceEndDate"></yhm-managerth>
        <yhm-managerth style="width: 80px" title="剩余天数" value="forceDay"></yhm-managerth>
        <yhm-managerth style="width: 120px" title="商业险到期日" value="businessEndDate"></yhm-managerth>
        <yhm-managerth style="width: 80px" title="剩余天数" value="businessDay"></yhm-managerth>
        <yhm-managerth style="width: 120px" title="最后跟踪时间" value="currentDate"></yhm-managerth>
        <yhm-managerth  title="最后跟踪内容" value="remark"></yhm-managerth>
<!--        <yhm-managerth  title="行驶证" ></yhm-managerth>-->
        <yhm-managerth style="width: 200px;" title="操作"></yhm-managerth>
      </template>

      <!--数据明细-->
      <template #listBody>
        <tr :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]" v-for="(item,index) in content" :key="index">
          <yhm-manager-td-checkbox :value="item"></yhm-manager-td-checkbox>
          <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>
          <yhm-manager-td vehicle-text-align="left" type="vehicle" :value="item.plate"></yhm-manager-td>
          <yhm-manager-td tip="value" v-if="item.modelVal!=''" :value="item.brandVal+'('+item.modelVal+')'"></yhm-manager-td>
          <yhm-manager-td v-else :value="item.brandVal"></yhm-manager-td>
          <yhm-manager-td :value="item.name"></yhm-manager-td>
          <yhm-manager-td :value="item.phone"></yhm-manager-td>
          <yhm-manager-td :value="item.lastYearUnitVal"></yhm-manager-td>
          <yhm-manager-td :value="item.insuredTypeVal"></yhm-manager-td>
          <yhm-manager-td-date :value="item.forceEndDate"></yhm-manager-td-date>
          <yhm-manager-td-center :value="item.forceDay+'  天'"></yhm-manager-td-center>
          <yhm-manager-td-date :value="item.businessEndDate"></yhm-manager-td-date>
          <yhm-manager-td-center  :value="item.businessEndDate==='1900-01-01'?'-----':item.businessDay+'  天'"></yhm-manager-td-center>
          <yhm-manager-td-date   :value="item.currentDate"></yhm-manager-td-date>

          <yhm-manager-td tip="value"  :value="item.remark"></yhm-manager-td>
<!--          <yhm-manager-td-image :tip="true" width="850" height="500" :value="item.drivingLicense" tag="drivingLicense"></yhm-manager-td-image>-->
          <yhm-manager-td-operate >
            <yhm-manager-td-operate-button @click="selectEndOut(item)" value="发送短信" icon="i-sendSMS"  color="#AA0022" ></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button  @click="track(item)" value="跟踪" icon="i-btn-applicationSm" color="#FF0000"></yhm-manager-td-operate-button>
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
    name: 'trackManager',
    mixins: [managermixin],
    data(){
      return{
        id:'',
        orderColumn:'forceDay,businessDay',
        order:'asc',
        stateBefore:'0',// 默认选择状态为可以选择，1为不可以选择
        ListInsuredType:{
          list:[
            {
              num: '0', //默认为空
              showName: '首次'
            },
            {
              num: '1', //默认为空
              showName: '间转续'
            },
            {
              num: '2', //默认为空
              showName: '续转续'
            },
          ],
          value:'',
        },
      }
    },
    methods:{
      selectEndOut(item){
        if(item.phone=='' && item.carOwnerPhone==''){

          this.$dialog.alert({
            tipValue:'车主手机号和联系人手机号都为空,请先去维护!',
            alertImg: 'warn',
            width:'330'
          })
        }else {
          this.$dialog.OpenWindow({
            width: '530',
            height: '420',
            title: '选择短信模板',
            url:'/selectsInvoiceSignatureForm?ownerID=' + item.id,
            closeCallBack: (data)=>{
              if(data){

              }
            }
          })
        }

      },
      listView(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '570',
          url: '/clientView?id=' + item.id,
          title: '查看客户信息',
          closeCallBack: (data)=>{
            if(data){
              this.initPageData(false)
            }
          }
        })
      },
      track(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '700',
          title: '跟踪信息',
          url: '/trackForm?ownerID='+item.id,
          closeCallBack:(data)=>{
            if(data){
              this.initPageData(false)
            }
          }
        })
      },
      // 筛选事件
      initChoose (op) {
         if (op === 'insuredType') {
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
            orderColumn:this.orderColumn,
            order:this.order,
            insuredType:this.ListInsuredType.value,
          }
        } else {
          params = {
            orderColumn:this.orderColumn,
            order:this.order,
            insuredType:this.ListInsuredType.value,
          }
        }
        this.init({
          initValue:initValue,
          url: '/Insurance/getTrackManager',
          data:params,
          all:(data) =>{
            //不管是不是初始化都需要执行的代码
          },
          init:(data)=>{
            //初始化时需要执行的代码
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
