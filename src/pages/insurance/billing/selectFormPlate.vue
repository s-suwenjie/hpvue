<template>
  <div class="f_main f_main_customize mb16">
    <yhm-select-body :choose="false">
      <template #operate>
        <div v-show="showTipDbSelect" class="s_db_select" :style="{left:getLeft,top:getTop}">双击选择</div>
        <yhm-commonbutton  value="添加" icon="btnAdd" v-if="addType!='1'" @call="selectAddEvent"></yhm-commonbutton>
        <yhm-commonbutton  value="添加" icon="btnAdd" v-else @call="selectAddPlate"></yhm-commonbutton>
        <yhm-managersearch :value="searchStr" id="searchStr" @call="initData"></yhm-managersearch>
      </template>

      <template #listHead>
        <yhm-managerth width="40" title="选择"></yhm-managerth>
        <yhm-managerth  title="车牌号"></yhm-managerth>
        <yhm-managerth  title="车主"></yhm-managerth>
        <yhm-managerth  title="联系人"></yhm-managerth>
        <yhm-managerth  title="品牌"></yhm-managerth>
      </template>
      <template #listBody>
        <tr v-for="(item,index) in content"
            :class="{InterlacBg:index%2!=0}"
            :key="index"
            @click="selectEvent(item)"
            @dblclick="dblclickEvent(item)"
            @mousemove="mousemoveEvent"
            @mouseover="mouseoverEvent"
            @mouseout="mouseoutEvent">

          <yhm-manager-td-checkbox :no-click="false" :value="item"></yhm-manager-td-checkbox>
          <yhm-manager-td-center :value="item.plate"></yhm-manager-td-center>
          <yhm-manager-td-center :value="item.carOwner"></yhm-manager-td-center>
          <yhm-manager-td :value="item.name"></yhm-manager-td>
          <yhm-manager-td :value="item.brandVal"></yhm-manager-td>
        </tr>
      </template>
      <template #empty>
        <span class="m_listNoData" style="color: red" v-show="content.length === 0"
              @click="selectAdd">如果没有找到,请去 保险管理-->客户管理 下添加客户信息,就能在此页面搜索出(请点击我跳转)</span>
      </template>
      <template #pager>
        <yhm-pagination :pager="pager" isPageSize="false" @initData="initPageData(false)"></yhm-pagination>
        <yhm-commonbutton class="mr0" icon="i-complete" value="确定" category="two" @call="selectConfirmEvent()"></yhm-commonbutton>
      </template>
    </yhm-select-body>
  </div>
</template>

<script>
  import { selectmixin } from '@/assets/select.js'
  export default {
    name: 'selectFormPlate',
    mixins: [selectmixin],
    data(){
      return{
        plate:'',
        addType:'',//等于 1 时是工单所用的车辆添加页 不传为默认添加
        carOwnerID:'',
      }
    },
    methods: {
      selectAddPlate(){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '750',
          url: '/vehicleForm?searchStr='+this.searchStr,
          title: '添加车辆信息',
          closeCallBack: (data) => {
            if (data) {
              this.searchStr = data
              this.initPageData(false)
            }
          }
        })
      },
      selectAdd(){
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
      selectAddEvent(){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '750',
          title: '添加车辆信息',
          url: '/clientForm',
          closeCallBack: (data)=>{
            this.initPageData(false)
          }
        })
      },
      initPageData(initValue){
        let params = {}
        if (initValue) {
          // 页面初始化是需要的参数
          params = {
            carOwnerID:this.carOwnerID
          }
        } else {
          // 页面非初始化时需要的参数
          params = {
            carOwnerID:this.carOwnerID
          }
        }
        this.init({
          initValue: initValue,
          url: '/Insurance/getBillingPlate',
          data: params,
          all: (data) => {
            // 不管是不是初始化都需要执行的代码
            this.content = data.content
          },
        })
      }
    },
    created () {
      this.setQuery2Value('addType')//addType = 1 时是工单所用的车辆添加页 不传为默认添加
      this.setQuery2Value('carOwnerID')
    }

  }
</script>

<style scoped>

</style>
