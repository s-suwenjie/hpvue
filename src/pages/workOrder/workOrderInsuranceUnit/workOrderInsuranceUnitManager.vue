<template>
    <div>
      <yhm-managerpage>
        <template #navigation>售后业务&gt;&nbsp;工单&nbsp;&gt;&nbsp;保险公司管理</template>
        <template #operate>
          <!-- 操作区-->
          <yhm-commonbutton value="添加保险公司"  icon="btnAdd" :flicker="true" @call="add" category="one"></yhm-commonbutton>
          <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initChoose"></yhm-managersearch>
        </template>

        <template #listHead>
          <yhm-managerth style="width: 40px;" title="选择" ></yhm-managerth>
          <yhm-managerth style="width: 40px;" title="查看" ></yhm-managerth>
          <yhm-managerth title="单位名称"></yhm-managerth>
<!--          <yhm-managerth width="160" title="单位缩写"></yhm-managerth>-->
        </template>
        <template #listBody >
          <tr :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]" v-for="(item,index) in content" :key="index">
            <yhm-manager-td-checkbox :value="item"></yhm-manager-td-checkbox>
            <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>
            <yhm-manager-td @click="lookOverUnit(item)"  :value="item.unitname"></yhm-manager-td>

<!--            <yhm-manager-td v-if="item.unitshort==''||item.unitshort==null" value="-&#45;&#45;&#45;&#45;"></yhm-manager-td>-->
<!--            <yhm-manager-td v-else :value="item.unitshort"></yhm-manager-td>-->
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
  import {managermixin} from '@/assets/manager.js'
  export default {
    name: 'workOrderInsuranceUnitManager',
    mixins: [managermixin],
    data(){
      return{
        content:[],
        list:[],

      }
    },
    methods:{
      add(){
        this.$dialog.OpenWindow({
          width: 1050,
          height: 720,
          url:'/workOrderInsuranceUnitForm?isAdd=1',
          title:'添加保险公司',
          closeCallBack:(data)=>{
            this.initPageData()
          }
        })
      },
      listView(item){
        this.$dialog.OpenWindow({
          width: 1050,
          height: 720,
          url:'/workOrderInsuranceUnitForm?id='+item.id,
          title:'编辑保险公司',
          closeCallBack:(data)=>{
            this.initPageData()
          }
        })
      },
      lookOverUnit(item){
        if(item.unitID!=''){
          this.$dialog.OpenWindow({
            width: '1070',
            height: '750',
            url:'/unitView?id='+item.unitID,
            title:'查看车主信息',
            closeCallBack:(data) =>{
              this.initPageData(false)
            }
          })
        }

      },
      initPageData (initValue) {
        let params = {}
        if (initValue) {
          // 页面初始化是需要的参数
          params = {
            init:true,
          }
        } else {
          // 页面非初始化时需要的参数
          params = {

          }
        }
        this.init({
          initValue: initValue,
          url:'/fix/fixOrderUnit/getManager',
          data: params,
          all: (data) => {
            // 不管是不是初始化都需要执行的代码
            this.content = data.content


            // this.ajaxJson({
            //   url: '/Basic/getUnitInsuranceManager',
            //   data:params,
            //   call: (da) => {
                // this.content = da.content
                // for(let i in this.content){
                //   for(let j in this.list){
                //    if(this.content[i].unitID==this.list[j].unitID){
                //
                //    }
                //   }
                // }
              // }
            // })
          },
          init: (data) => {
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
