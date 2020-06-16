<template>
  <div class="f_main f_main_customize mb16">
    <yhm-select-body :choose="false">
      <template #operate>
        <div v-show="showTipDbSelect" class="s_db_select" :style="{left:getLeft,top:getTop}">双击选择</div>
        <yhm-commonbutton  value="添加" icon="btnAdd" @call="selectAddEvent"></yhm-commonbutton>
        <yhm-managersearch :value="searchStr" id="searchStr" @call="initData"></yhm-managersearch>
        <yhm-radiofilter :before="assortBefore" @initData="initChoose('assort')" title="所属类型" :content="listassort"></yhm-radiofilter>
      </template>

      <template #listHead>
        <yhm-managerth width="40" title="选择"></yhm-managerth>
        <yhm-managerth  title="车牌号"></yhm-managerth>
        <yhm-managerth  title="车主"></yhm-managerth>
        <yhm-managerth  title="所属类型"></yhm-managerth>
        <yhm-managerth  title="品牌"></yhm-managerth>
        <yhm-managerth  title="车型"></yhm-managerth>
        <yhm-managerth  title="车辆版本"></yhm-managerth>
        <yhm-managerth  title="上牌日期"></yhm-managerth>

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
          <yhm-manager-td :value="item.carOwner"></yhm-manager-td>
          <yhm-manager-td :value="item.assortVal"></yhm-manager-td>
          <yhm-manager-td :value="item.brand"></yhm-manager-td>
          <yhm-manager-td :value="item.model"></yhm-manager-td>
          <yhm-manager-td :value="item.version"></yhm-manager-td>
          <yhm-manager-td :value="item.registerDate"></yhm-manager-td>
        </tr>
      </template>
      <template #empty>
        <span class="m_listNoData" v-show="content.length === 0">暂时没有数据</span>
      </template>
      <template #pager>
        <yhm-pagination is-not-right :pager="pager" isPageSize="false" @initData="initPageData(false)"></yhm-pagination>
        <yhm-commonbutton class="mr0" icon="i-complete" value="确定" category="two" @call="selectConfirmEvent()"></yhm-commonbutton>
      </template>
    </yhm-select-body>
  </div>
</template>

<script>
  import { selectmixin } from '@/assets/select.js'
  export default {
    name: 'selectPlate',
    mixins: [selectmixin],
    data(){
      return{
        plate:'',
        carOwnerID:'',
        assortBefore:'0',// 默认选择状态为可以选择，1为不可以选择
        listassort:{
          value: '', //默认为空
          list: []
        },
        assort:'',
      }
    },
    methods: {
      selectAddEvent(){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '700',
          title: '添加车辆信息',
          url: '/vehicleForm?isReule='+this.isReule,
          closeCallBack: (data)=>{
            this.initPageData(false)
          }
        })
      },
      // 筛选事件
      initChoose (op) {

        if (op === 'assort') {
          this.selectValue = []

        }
        this.initPageData()
      },
      initPageData(initValue){
        let params = {}
        if (initValue) {
          // 页面初始化是需要的参数
          params = {
            carOwnerID:this.carOwnerID,
            assort:this.listassort.value,
          }
        } else {
          // 页面非初始化时需要的参数
          params = {
            carOwnerID:this.carOwnerID,
            assort:this.listassort.value,
          }
        }
        this.init({
          initValue: initValue,
          url: '/Basic/getByPlate',
          data: params,
          all: (data) => {
            // 不管是不是初始化都需要执行的代码
            this.content = data.content
          },
          init :data=>{
            this.listassort=data.assortPsd
            this.assortList=data.assortList
         }
        })
      }
    },
    created () {
      this.setQuery2Value('carOwnerID')
      this.setQuery2Value('assort')
      this.listassort.value=this.assort
      this.setQuery2Value('isReule')

    }

  }
</script>

<style scoped>

</style>
