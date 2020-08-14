<template>
  <div class="f_main f_main_customize mb16">
    <yhm-select-body :choose="false" :operatergt-show="false" :choose-bg="false">
      <template #operate>
        <div v-show="showTipDbSelect" class="s_db_select" :style="{left:getLeft,top:getTop}">双击选择</div>
<!--        <yhm-commonbutton value="添加" icon="btnAdd" @call="selectAddEvent()"></yhm-commonbutton>-->
        <yhm-managersearch :value="searchStr" id="searchStr" @call="initData"></yhm-managersearch>
      </template>

      <template #listHead>
        <yhm-managerth-check v-if="selectType === '1'" is-select :check="allCheck" style="width: 40px;"></yhm-managerth-check>
        <yhm-managerth v-if="selectType === '0'" width="40" title="选择"></yhm-managerth>
        <yhm-managerth title="商品名称"></yhm-managerth>
        <yhm-managerth title="规格型号"></yhm-managerth>
        <yhm-managerth style="width: 120px" title="拆分数量"></yhm-managerth>
        <yhm-managerth style="width: 120px" title="整件数量"></yhm-managerth>
      </template>

      <template #listBody>
        <tr v-for="(item,index) in content"
            :class="{InterlacBg:index%2!=0}"
            :key="item.id"
            @click="selectEvent(item)"
            @dblclick="dblclickEvent(item)">
          <yhm-manager-td-checkbox :value="item" :no-click="false"></yhm-manager-td-checkbox>
          <yhm-manager-td :value="item.product"></yhm-manager-td>
          <yhm-manager-td-center :value="item.model"></yhm-manager-td-center>
          <yhm-manager-td-center :value="item.mdo"></yhm-manager-td-center>
          <yhm-manager-td-center :value="item.quantity+''"></yhm-manager-td-center>
        </tr>
      </template>

      <template #empty>
        <span class="m_listNoData" v-show="content.length === 0">暂时没有数据</span>
      </template>
      <template #pager>
<!--        <yhm-pagination :pager="pager" isPageSize="false" @initData="initPageData(false)"></yhm-pagination>-->
        <div style="width: 100%;display: flex;justify-content: center;align-items: center;margin-top: 10px;">

          <yhm-commonbutton class="mr0" icon="i-complete" value="确定" category="two" @call="selectConfirmEvent()"></yhm-commonbutton>
        </div>
      </template>
    </yhm-select-body>
  </div>
</template>

<script>
  import { selectmixin } from '@/assets/select.js'
  export default {
    name: 'selectMaterials',
    mixins: [selectmixin],
    data(){
      return{
        value:'',
        storageType:'',
        stockType:'',
      }
    },
    methods:{
      // selectAddEvent () {
      //   this.$dialog.OpenWindow({
      //     width: 1072,
      //     height: 650,
      //     url:'/processManagementForm?type=1',
      //     title:'添加检修服务',
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
          url: '/fix/fixOrderMaterial/initForm',
          data: params,
          all: (data) => {
            // 不管是不是初始化都需要执行的代码
            this.content = data.list
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
          }
        })
      }
    },
    created () {
      this.setQuery2Value('ownerID')
      this.setQuery2Value('selectType')
      if(this.selectType === '1'){
        this.allCheck = true
      }
    }
  }
</script>

<style scoped>

</style>
