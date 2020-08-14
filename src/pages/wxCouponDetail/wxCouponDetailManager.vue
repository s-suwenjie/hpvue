<template>
  <div>
    <yhm-managerpage>
      <!--导航条-->
      <template #navigation>系统&nbsp;&gt;&nbsp;优惠券管理&nbsp;&gt;&nbsp;优惠券明细管理</template>
      <!-- 筛选-->
      <template #operate>
        <yhm-commonbutton :value="choose?'收起筛选':'展开筛选'" :icon="choose?'btnUp':'btnDown'" @call="switchChoose()"></yhm-commonbutton>
        <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initData"></yhm-managersearch>
      </template>
      <!--筛选区-->
      <template #choose>
        <div v-show="choose" class="buttonBody mptZero">
          <yhm-radiofilter @initData="initChoose('couponCategory')" title="类型" :content="couponCategoryList"></yhm-radiofilter>
          <yhm-radiofilter @initData="initChoose('state')" title="状态" :content="stateList"></yhm-radiofilter>
        </div>
      </template>

      <!--数据表头-->
      <template #listHead>
        <yhm-managerth style="width: 40px;" title="选择"></yhm-managerth>
        <yhm-managerth style="width: 40px;" title="查看"></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="车牌号"></yhm-managerth>
        <yhm-managerth title="车型"></yhm-managerth>
        <yhm-managerth style="width: 300px;" title="优惠券名称"></yhm-managerth>
        <yhm-managerth style="width: 90px;" title="优惠券Logo"></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="优惠券类型"></yhm-managerth>
        <yhm-managerth style="width: 125px;" title="发放日期"></yhm-managerth>
        <yhm-managerth style="width: 125px;" title="到期日期"></yhm-managerth>
        <yhm-managerth style="width: 90px;" title="状态"></yhm-managerth>
        <yhm-managerth style="width: 170px;" title="使用/过期日期"></yhm-managerth>
      </template>

      <!--数据明细-->
      <template #listBody>
        <tr v-for="(item,index) in content" :key="index" :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]">
          <yhm-manager-td-checkbox :value="item"></yhm-manager-td-checkbox>
          <yhm-manager-td-look @click="view(item.id)"></yhm-manager-td-look>
          <yhm-manager-td :value="item.vehicleCode"></yhm-manager-td>
          <yhm-manager-td :value="item.vehicleModel"></yhm-manager-td>
          <yhm-manager-td :value="item.couponName"></yhm-manager-td>
          <yhm-manager-td-image :tip="true" left="-640" width="450" height="250" :value="item.couponUrl" tag="wxCoupon"></yhm-manager-td-image>
          <yhm-manager-td-psd :value="item.couponCategory" :list="couponCategoryList.list"></yhm-manager-td-psd>
          <yhm-manager-td-date :value="item.start"></yhm-manager-td-date>
          <yhm-manager-td-date :value="item.end"></yhm-manager-td-date>
          <yhm-manager-td-psd :value="item.state" :list="stateList.list"></yhm-manager-td-psd>
          <yhm-manager-td-date :value="item.operateDate"></yhm-manager-td-date>
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
    name: 'wxCouponDetailManager',
    mixins: [managermixin],
    data(){
      return{
        shortcutSearchContent:'',
        stateList:{
          value:"",
          list:[]
        },
        couponCategoryList:{
          value:"",
          list:[]
        }
      }
    },
    created () {
      // this.init()
    },
    methods:{
      initPageData (initValue) {
        let params = {}

        if (initValue) {
          params = {
            // category:this.listCategory.value
          }
        } else {
          params = {
            // category:this.listCategory.value
          }
        }
        this.init({
          initValue:initValue,
          url: '/wx/wxCouponDetail/getManager',
          data:params,
          all:(data) =>{
            //不管是不是初始化都需要执行的代码
          },
          init:(data)=>{
            //初始化时需要执行的代码
            this.shortcutSearchContent=data.shortcutSearchContent
            this.stateList = data.statePsd
            this.couponCategoryList = data.couponCategoryPsd
            console.log(data)
          }
        })
      }
    },

  }
</script>

<style scoped>

</style>
