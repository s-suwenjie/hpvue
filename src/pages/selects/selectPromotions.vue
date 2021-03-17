<template>
  <div class="f_main f_main_customize mb16">
    <yhm-select-body :choose="false">
      <template #operate>
        <div v-show="showTipDbSelect" class="s_db_select" :style="{left:getLeft,top:getTop}">双击选择</div>
<!--        <yhm-commonbutton  value="添加" icon="btnAdd" @call="selectAddEvent"></yhm-commonbutton>-->
        <yhm-managersearch :value="searchStr" id="searchStr" @call="initPageData"></yhm-managersearch>

      </template>

      <template #listHead>
        <yhm-managerth width="40" title="选择"></yhm-managerth>
        <yhm-managerth  title="活动方案"></yhm-managerth>
        <yhm-managerth  title="品牌"></yhm-managerth>
        <yhm-managerth  title="保险公司"></yhm-managerth>
        <yhm-managerth  title="优惠额度"></yhm-managerth>
        <yhm-managerth  title="赠送信息"></yhm-managerth>

      </template>
      <template #listBody>
        <tr v-for="(item,index) in content"
            :class="{InterlacBg:index%2!=0}"
            :key="index"
            @click="selectEvent(item)"
            @dblclick="dblclickEvent(item,index)"
            @mousemove="mousemoveEvent"
            @mouseover="mouseoverEvent"
            @mouseout="mouseoutEvent">

          <yhm-manager-td-checkbox :no-click="false" :value="item"></yhm-manager-td-checkbox>
          <yhm-manager-td :value="item.name"></yhm-manager-td>
          <yhm-manager-td-center :value="item.brandVal"></yhm-manager-td-center>
          <yhm-manager-td :value="item.project"></yhm-manager-td>
          <yhm-manager-td :value="item.amount"></yhm-manager-td>
          <yhm-manager-td :value="item.discount"></yhm-manager-td>
        </tr>
      </template>
      <template #empty>
        <span class="m_listNoData" v-show="content.length === 0" style="color: red">没有查到想的活动?请在优惠活动中查看活动是否已经结束</span>
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
    name: 'selectPromotions',
    mixins: [selectmixin],
    data(){
      return{
        num:[],
      }
    },
    methods:{
      // dblclickEvent(item,index){
      //   let a = '优惠活动' + (index+1)
      //   this.$dialog.setReturnValue({item,a})
      //   this.$dialog.close()
      // },
      // selectAddEvent(){
      //   this.$dialog.OpenWindow({
      //     width: '1050',
      //     height: '700',
      //     title: '添加优惠政策',
      //     url: '/promotionsForm',
      //     closeCallBack: (data)=>{
      //       this.initPageData(false)
      //     }
      //   })
      // },
      initPageData(initValue){
        let params = {}
        if (initValue) {
          // 页面初始化是需要的参数
          params = {
            brand:this.brand,
            insuredUnit:this.insuredUnit,
            insuredDate:this.insuredDate,
          }
        } else {
          // 页面非初始化时需要的参数
          params = {
            brand:this.brand,
            insuredUnit:this.insuredUnit,
            insuredDate:this.insuredDate,
          }
        }
        this.init({
          initValue: initValue,
          url: '/Insurance/promotionGetMagager',
          data: params,
          all: (data) => {
            // 不管是不是初始化都需要执行的代码
            this.content = data.content
          },
          init :data=>{

          }
        })
      }
    },
    created () {

      this.setQuery2Value('brand')
      this.setQuery2Value('insuredUnit')
      this.setQuery2Value('insuredDate')
      this.initPageData()

    }
  }
</script>

<style scoped>

</style>
