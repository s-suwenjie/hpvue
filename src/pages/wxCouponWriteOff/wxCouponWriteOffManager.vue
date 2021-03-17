<template>
  <div>
    <yhm-managerpage>
      <!--导航条-->
      <template #navigation>系统&nbsp;&gt;&nbsp;优惠券管理&nbsp;&gt;&nbsp;优惠券核销管理</template>
      <!-- 筛选-->
      <template #operate>
        <yhm-commonbutton :value="choose?'收起筛选':'展开筛选'" :icon="choose?'btnUp':'btnDown'" @call="switchChoose()"></yhm-commonbutton>
        <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initData"></yhm-managersearch>
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
        <yhm-managerth style="width: 170px;" title="核销日期"></yhm-managerth>
        <yhm-managerth style="width: 200px;" title="工单号码/保单号码"></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="联系人"></yhm-managerth>
        <yhm-managerth style="width: 120px;" title="电话"></yhm-managerth>
        <yhm-managerth style="width: 70px;" title="微信头像"></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="车牌号"></yhm-managerth>
        <yhm-managerth title="核销人员" style="width: 100px;"></yhm-managerth>
        <yhm-managerth title="操作"></yhm-managerth>
      </template>

      <!--数据明细-->
      <template #listBody>
        <tr v-for="(item,index) in content" :key="index" :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]">
          <yhm-manager-td-checkbox :value="item"></yhm-manager-td-checkbox>
          <yhm-manager-td-look @click="view(item.id)"></yhm-manager-td-look>
          <yhm-manager-td-date :value="item.workDate"></yhm-manager-td-date>
          <!--<yhm-manager-td :value="item.workOrderCode"></yhm-manager-td>-->
          <yhm-manager-td-psd :value="item.category" :list="categoryList.list" :after-value="'：' + item.workOrderCode" is-left></yhm-manager-td-psd>
          <yhm-manager-td :value="item.personName || item.name"></yhm-manager-td>
          <yhm-manager-td-center :value="item.phone" format="phone*"></yhm-manager-td-center>
          <yhm-manager-td-img-self :tip="true" left="-540" width="200" height="200" :value="item.avatarUrl" tag="wxCoupon"></yhm-manager-td-img-self>
          <yhm-manager-td :value="item.vehicleCode"></yhm-manager-td>
          <yhm-manager-td-center :value="item.selfPerson"></yhm-manager-td-center>
          <yhm-manager-td-operate>
            <yhm-manager-td-operate-button @click="print(item)" value="打印" icon="i-btn-print" color="#49a9ea"></yhm-manager-td-operate-button>
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
    name: 'wxCouponWriteOffManager',
    mixins: [managermixin],
    data(){
      return{
        stateList:{
          value:"",
          list:[]
        },
        categoryList:{
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
      view(id){
        this.$dialog.OpenWindow({
          width: 1050,
          height: 780,
          url:'/wxCouponWriteOffView?id=' + id,
          title:'查看核销信息',
          closeCallBack:(data) =>{


          }
        })
      },
      print(item){
        let params = {
          id:item.id
        }
        this.ajaxJson({
          url: '/wx/wxCouponWriteOff/print',
          data: params,
          call: (data) => {
            if(data.type === 0 && data.content  != ""){
              window.open("/UploadFile/" + data.content)
            }
          }
        })
      },
      initPageData (initValue) {
        let params = {}

        if (initValue) {
          params = {
            couponCategory:this.couponCategoryList.value,
            state:this.stateList.value
          }
        } else {
          params = {
            couponCategory:this.couponCategoryList.value,
            state:this.stateList.value
          }
        }
        this.init({
          initValue:initValue,
          url: '/wx/wxCouponWriteOff/getManager',
          data:params,
          all:(data) =>{
            //不管是不是初始化都需要执行的代码
          },
          init:(data)=>{
            //初始化时需要执行的代码
            this.categoryList = data.categoryPsd
            console.log(data)
          }
        })
      }
    },
  }
</script>

<style scoped>

</style>
