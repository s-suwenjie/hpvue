<template>
    <div class="f_main f_main_customize mb16">
        <yhm-select-body :choose="false">
            <template #operate>
                <div v-show="showTipDbSelect" class="s_db_select" :style="{left:getLeft,top:getTop}">双击选择</div>
                <yhm-commonbutton value="添加" icon="btnAdd" @call="selectAddEvent()"></yhm-commonbutton>
                <yhm-managersearch :value="searchStr" id="searchStr" @call="initData"></yhm-managersearch>
            </template>

            <template #listHead>
                <yhm-managerth width="40" title="选择"></yhm-managerth>
                <yhm-managerth  title="项目名称"></yhm-managerth>
                <yhm-managerth  title="项目编号"></yhm-managerth>
                <yhm-managerth  title="项目工时"></yhm-managerth>
                <yhm-managerth  title="考核工时"></yhm-managerth>
            </template>

            <template #listBody>
                <tr v-for="(item,index) in content"
                    :class="{InterlacBg:index%2!=0}"
                    :key="item.id"
                    @click="selectEvent(item)"
                    @dblclick="dblclickEvent(item)">
                    <yhm-manager-td-checkbox :no-click="false" :value="item"></yhm-manager-td-checkbox>
                    <yhm-manager-td-center :value="item.proName"></yhm-manager-td-center>
                    <yhm-manager-td-center :value="item.proNum"></yhm-manager-td-center>
                    <yhm-manager-td-center :value="item.hours"></yhm-manager-td-center>
                    <yhm-manager-td-center :value="item.assessment"></yhm-manager-td-center>
                </tr>
            </template>

            <template #empty>
                <span class="m_listNoData" v-show="content.length === 0">暂时没有数据</span>
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
    name: 'selectService',
    mixins: [selectmixin],
    data(){
      return{
        value:'',
        storageType:'',
        stockType:'',
      }
    },
    methods:{
      selectAddEvent () {
        this.$dialog.OpenWindow({
          width: 1072,
          height: 650,
          url:'/processManagementForm?type=1',
          title:'添加检修服务',
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

          }
        } else {
          // 页面非初始化时需要的参数
          params = {}
        }
        this.init({
          initValue: initValue,
          url: '/fix/fixProduct/getManager',
          data: params,
          all: (data) => {
            // 不管是不是初始化都需要执行的代码
          },
          init: (data) => {
            // 初始化时需要执行的代码
          }
        })
      }
    },
    created () {

    }
  }
</script>

<style scoped>

</style>
