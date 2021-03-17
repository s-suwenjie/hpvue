<template>
  <div>
    <yhm-managerpage>
      <!--导航条-->
      <template #navigation>业务管理&nbsp;&gt;&nbsp;工单&nbsp;&gt;&nbsp;派工管理</template>
      <!--操作区-->
      <template #operate>
        <yhm-commonbutton value="添加" icon="btnAdd" :flicker="true" @call="add()"></yhm-commonbutton>
        <!--          <yhm-commonbutton :value="choose?'收起筛选':'展开筛选'" :icon="choose?'btnUp':'btnDown'" @call="switchChoose()"></yhm-commonbutton>-->
        <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initData"></yhm-managersearch>
      </template>

      <!--数据表头-->
      <template #listHead>
        <yhm-managerth style="width: 38px;" title="选择"></yhm-managerth>
        <yhm-managerth style="width: 38px;" title="查看"></yhm-managerth>
        <yhm-managerth  title="姓名"></yhm-managerth>
<!--        <yhm-managerth  title="部门名称"></yhm-managerth>-->
        <yhm-managerth  title="工种名称"></yhm-managerth>
        <yhm-managerth  title="编号"></yhm-managerth>
      </template>

      <!--数据明细-->
      <template #listBody>
        <tr :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]" v-for="(item,index) in content" :key="index">
          <yhm-manager-td-checkbox :value="item"></yhm-manager-td-checkbox>
          <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>
          <yhm-manager-td-center :value="item.userName"></yhm-manager-td-center>
<!--          <yhm-manager-td-center :value="item.department"></yhm-manager-td-center>-->
          <yhm-manager-td-center :value="item.teamName"></yhm-manager-td-center>
          <yhm-manager-td-center :value="item.userNum"></yhm-manager-td-center>
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
  import { guid, selectClick, selectdbClick, selectConfirm, selectComputedSelected } from '@/assets/common.js'
  export default {
    name: 'peopleManagementManager',
    mixins: [managermixin],
    data(){
      return{

      }
    },
    methods:{
      listView(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '700',
          url:'/peopleManagementForm?id='+item.id,
          title:'编辑班组人员',
          closeCallBack:(data) =>{
            this.initPageData()
          }
        })
      },
      add(){
        // let params = {
        //   'nameStr':'测试',
        //   'id':guid(),
        //   'ownerID':'C302FAD5-B605-4F6E-B131-5419E865BA8A',
        //   'dependid':'',
        //   'stage':'2',
        //   'state':'1',
        //   'type':'3',
        //   'orderStr':99999
        // }
        // this.ajaxJson({
        //   url: '/fix/fixProcessDetail/save',
        //   loading:'0',
        //   data: params,
        //   call: (data) => {
        //   }
        // })
        this.$dialog.OpenWindow({
          width: '1050',
          height: '700',
          url:'/peopleManagementForm?type=1',
          title:'添加班组人员',
          closeCallBack:(data) =>{
            this.initPageData()
          }
        })
      },
      initPageData (initValue) {
        let params = {}
        if (initValue) {
          params = {

          }
        } else {
          params = {

          }
        }
        this.init({
          initValue:initValue,
          url: '/fix/fixTeam/getManager',
          data:params,
          all:(data) =>{
            //不管是不是初始化都需要执行的代码

          },
          init:(data)=>{
            //初始化时需要执行的代码
            // 这边初始化筛选信息


          }
        })

      }
    }
  }
</script>

<style scoped>

</style>
