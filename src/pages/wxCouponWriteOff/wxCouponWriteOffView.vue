<template>
  <div class="f_main mb16">
    <yhm-formbody>
      <template #title>核销信息</template>
      <template #control>
        <yhm-view-control title="会员名称" :content="name"></yhm-view-control>
        <yhm-view-control title="会员昵称" :content="nickName"></yhm-view-control>
        <yhm-view-img title="会员头像" :url="avatarUrl" width="30" height="30"></yhm-view-img>
        <yhm-view-control title="会员手机" :content="phone"></yhm-view-control>
        <yhm-view-control title="车牌号码" :content="vehicleCode"></yhm-view-control>
        <yhm-view-control :title="getWorkOrderCodeTitle" :content="workOrderCode"></yhm-view-control>
        <yhm-view-control title="核销人员" :content="selfPerson"></yhm-view-control>
        <yhm-view-control title="核销时间" :content="workDate"></yhm-view-control>
      </template>
    </yhm-formbody>

    <div class="f_split"></div>

    <yhm-view-tab>
      <template #tab>
        <yhm-view-tab-button :list="tabState" :index="0" @click="change(0)">核销优惠券明细</yhm-view-tab-button>
      </template>
      <template #content>
        <yhm-view-tab-list :customize="true" v-show="tabState[0].select">
          <template #listHead>
            <yhm-managerth width="50" title="序号"></yhm-managerth>
            <yhm-managerth title="优惠券名称"></yhm-managerth>
            <yhm-managerth width="100" title="优惠券类型"></yhm-managerth>
            <yhm-managerth width="120" title="发送日期"></yhm-managerth>
            <yhm-managerth width="120" title="过期日期"></yhm-managerth>
            <yhm-managerth width="180" title="核销时间"></yhm-managerth>
            <yhm-managerth width="70" title="logo"></yhm-managerth>
          </template>
          <template #listBody>
            <tr v-for="(item,index) in list" :key="index" :class="{InterlacBg:index%2!==0}">
              <yhm-manager-td-center :value="(index+1)+''"></yhm-manager-td-center>
              <yhm-manager-td :value="item.name"></yhm-manager-td>
              <yhm-manager-td-psd :value="item.category" :list="categoryPsd"></yhm-manager-td-psd>
              <yhm-manager-td-date :value="item.start"></yhm-manager-td-date>
              <yhm-manager-td-date :value="item.end"></yhm-manager-td-date>
              <yhm-manager-td-date :value="item.operateDate"></yhm-manager-td-date>
              <yhm-manager-td-image :tip="true" left="-400" width="450" height="250" :value="item.url" tag="wxCoupon"></yhm-manager-td-image>
            </tr>
          </template>
        </yhm-view-tab-list>
      </template>
    </yhm-view-tab>
    <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate"></yhm-formoperate>
  </div>
</template>

<script>
  import { viewmixin } from '@/assets/view.js'
  export default {
    name: 'wxCouponWriteOffView.vue',
    mixins: [viewmixin],
    data () {
      return {
        tabState:[{select:true}],
        personID:'',
        personName:'',
        name:'',
        nickName:'',            //微信昵称
        avatarUrl:'',
        phone:'',
        vehicleID:'',
        vehicleCode:'',
        selfPersonID:'',
        selfPerson:'',
        workDate:'',            //核销时间
        category:'',            //业务类型
        workOrderCode:'',       //工单号码
        categoryPsd:[],
        categoryBusinessPsd:[],//业务类型
        list:[],
      }
    },
    computed:{
      getWorkOrderCodeTitle(){
        let result = ""
        for (let item of this.categoryBusinessPsd) {
          if(item.num === this.category){
            result = item.showName
            break
          }
        }
        return result
      }
    },
    created(){
      this.init({
        url:"wx/wxCouponWriteOff/initForm",
        call:(data) => {
          this.categoryPsd = data.categoryPsd.list
          this.list = data.list
          this.avatarUrl = data.avatarUrl
          this.personID = data.personID
          this.personName = data.personName
          this.name = data.name
          this.nickName = data.nickName           //微信昵称
          this.phone = data.phone
          this.vehicleID = data.vehicleID
          this.vehicleCode = data.vehicleCode
          this.selfPersonID = data.selfPersonID
          this.selfPerson = data.selfPerson
          this.workDate = data.workDate           //核销时间
          this.category= data.category
          this.workOrderCode = data.workOrderCode       //工单号码
          this.categoryBusinessPsd = data.categoryBusinessPsd.list
          console.log(data)
        }
      })
    }
  }
</script>

<style scoped>

</style>
