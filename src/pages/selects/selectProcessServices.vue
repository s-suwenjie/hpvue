<template>
  <div class="f_main f_main_customize mb16">
    <yhm-select-body :choose="false" :operatergt-show="false" :choose-bg="false">
      <template #operatergt>
        <!--        <yhm-selectrgtbox :select-count="pager.selectCount" :all-money="selectMoney"></yhm-selectrgtbox>-->
      </template>

      <template #listHead>
        <yhm-managerth-check v-if="selectType === '1'" is-select :check="allCheck" style="width: 40px;"></yhm-managerth-check>
        <yhm-managerth v-if="selectType === '0'" width="40" title="选择"></yhm-managerth>
        <yhm-managerth style="width: 120px;" title="项目名称"></yhm-managerth>
        <yhm-managerth title="发生日期"></yhm-managerth>
        <yhm-managerth title="类型"></yhm-managerth>
        <yhm-managerth style="width: 120px" title="状态"></yhm-managerth>
        <yhm-managerth title="收支方向"></yhm-managerth>
        <yhm-managerth style="width: 120px;" title="变化金额"></yhm-managerth>
      </template>

      <template #listBody>
        <tr v-for="(item,index) in content"
            :class="{InterlacBg:index%2!=0}"
            :key="item.id"
            @click="selectEvent(item)"
            @dblclick="dblclickEvent(item)"
        >
          <yhm-manager-td-checkbox :value="item" :no-click="false"></yhm-manager-td-checkbox>
          <yhm-manager-td :value="item.name"></yhm-manager-td>
          <yhm-manager-td :value="item.workDate"></yhm-manager-td>
          <yhm-manager-td-psd :value="item.category" :list="categoryList"></yhm-manager-td-psd>
          <yhm-manager-td-psd :value="item.state+''" :list="stateList"></yhm-manager-td-psd>
          <yhm-manager-td-psd :value="item.direction" :list="directionList"></yhm-manager-td-psd>
          <yhm-manager-td-money :value="item.money+''"></yhm-manager-td-money>
        </tr>
      </template>

      <template #empty>
        <span class="m_listNoData" v-show="content.length === 0">暂时没有数据</span>
      </template>
      <template #pager>
<!--        <yhm-pagination is-not-right :pager="pager" isPageSize="false" @initData="initPageData(false)"></yhm-pagination>-->
        <div style="width: 100%;display: flex;justify-content: center;align-items: center;margin-top: 10px;">
          <yhm-commonbutton class="mr0" icon="i-complete" value="确定" category="two" @call="selectConfirmEvent()"></yhm-commonbutton>

        </div>
      </template>
    </yhm-select-body>

  </div>
</template>

<script>
  import { accAdd } from '@/assets/common.js'
  import { selectmixin } from '@/assets/select.js'
  export default {
    name: 'selectProcessServices',
    mixins: [selectmixin],
    data(){
      return{
        selectType:'1',
        categoryList:[],
        stateList:[],
        directionList:[],
      }
    },
    methods:{
      initPageData(initValue){
        let params = {}
        if (initValue) {
          // 页面初始化是需要的参数
          params = {
            ownerID:this.ownerID
          }
        } else {
          // 页面非初始化时需要的参数
          params = {
            ownerID:this.ownerID
          }
        }
        this.init({
          initValue: initValue,
          url: '/fix/fixOrderDetail/initForm',
          data: params,
          all: (data) => {
            // 不管是不是初始化都需要执行的代码
            this.content = data.list
            this.categoryList = data.categoryPsd.list
            this.stateList = data.statePsd.list
            this.directionList = data.directionPsd.list
            if(this.allCheck){
              for(let i in this.content){
                let id = this.content[i].id
                let sign = true
                if(this.selectValue.length > 0){
                  for (var j = 0; j < this.selectValue.length; j++){
                    if(Object.keys(this.selectValue[j])[0] === id) {
                      sign = false
                      break;
                    }
                  }
                }
                if(sign) {
                  let val = {}
                  val[id] = this.content[i]
                  this.selectValue.push(val)
                }
              }
            }
            else{
              let check = true
              for(let i in this.content){
                let id = this.content[i].id
                let sign = false
                if(this.selectValue.length > 0){
                  for (var j = 0; j < this.selectValue.length; j++){
                    if(Object.keys(this.selectValue[j])[0] === id){
                      sign = true
                    }
                  }
                }
                if(!sign){
                  check = false
                }
              }
              this.allCheck = check
            }
          },
          init: (data) => {
            // 初始化时需要执行的代码
            // this.listCategory = data.listCategory

            // for(let i in this.content){
            //   this.allMoney += parseFloat(this.content[i].totalMoney)
            // }


          }
        })
      },

    },
    created () {
      this.setQuery2Value('ownerID')
      this.setQuery2Value('selectType')
      if(this.selectType === '1'){
        this.allCheck = true
      }
    },
  }
</script>

<style scoped>

</style>

