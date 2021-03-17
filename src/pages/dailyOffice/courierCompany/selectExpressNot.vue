<template>
  <div class="f_main f_main_customize mb16">
    <yhm-select-body :choose="false">
      <template #operate>
        <div v-show="showTipDbSelect" class="s_db_select" :style="{left:getLeft,top:getTop}">双击选择</div>
        <yhm-managersearch :value="searchStr" id="searchStr" @call="initData"></yhm-managersearch>
      </template>

      <template #listHead>
        <yhm-managerth width="40" title="选择"></yhm-managerth>
        <yhm-managerth  style="width: 50px" title="对账单"></yhm-managerth>
        <yhm-managerth  title="所属月份"></yhm-managerth>
        <yhm-managerth  title="开始日期"></yhm-managerth>
        <yhm-managerth  title="结束日期"></yhm-managerth>
        <yhm-managerth  title="金额"></yhm-managerth>
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
          <yhm-manager-td  value=" " @click="downloadEvent(item)">
            <img  style="margin: auto;" width="30" height="30" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1594275457602&di=5ebf487929ced264a201d33766b21f42&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20180920%2F2397b5b7b5024319bf98035b72c2ca47.png" alt="">
          </yhm-manager-td>
          <yhm-manager-td-center :value="item.startDate.slice(5,7)+'月'"></yhm-manager-td-center>
          <yhm-manager-td-center :value="item.startDate"></yhm-manager-td-center>
          <yhm-manager-td-center :value="item.endDate"></yhm-manager-td-center>
          <yhm-manager-td-money :value="item.countMoney"></yhm-manager-td-money>
        </tr>
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
    name: 'selectExpressNot',
    mixins: [selectmixin],
    data(){
      return{
        paymentUnitID:'',
      }
    },
    methods: {
      downloadEvent(item){
        window.open('/UploadFile/'  + item.storeName)
      },
      initPageData(initValue){
        let params = {}
        if (initValue) {
          // 页面初始化是需要的参数
          params = {
            personID:this.paymentUnitID
          }
        } else {
          // 页面非初始化时需要的参数
          params = {
            personID:this.paymentUnitID
          }
        }
        this.init({
          initValue: initValue,
          url: '/dailyoffice/expressCompany/getExpressNot',
          data: params,
          all: (data) => {
            // 不管是不是初始化都需要执行的代码
            this.content = data.content
          },
        })
      }
    },
    created () {
      this.setQuery2Value('paymentUnitID')
    }

  }
</script>

<style scoped>

</style>
