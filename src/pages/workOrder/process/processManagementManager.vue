<template>
    <div>
      <yhm-managerpage>
        <!--导航条-->
        <template #navigation>业务管理&nbsp;&gt;&nbsp;工单&nbsp;&gt;&nbsp;服务管理</template>
        <!--操作区-->
        <template #operate>
          <yhm-commonbutton value="添加" icon="btnAdd" :flicker="true" @call="add()"></yhm-commonbutton>
          <!--          <yhm-commonbutton value="测试" icon="btnAdd" :flicker="true" @call="ceshi()"></yhm-commonbutton>-->
          <!--          <yhm-commonbutton :value="choose?'收起筛选':'展开筛选'" :icon="choose?'btnUp':'btnDown'" @call="switchChoose()"></yhm-commonbutton>-->
          <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initData"></yhm-managersearch>
        </template>

        <!--数据表头-->
        <template #listHead>
          <yhm-managerth style="width: 38px;" title="选择"></yhm-managerth>
          <yhm-managerth style="width: 38px;" title="查看"></yhm-managerth>
          <yhm-managerth  title="服务名称"></yhm-managerth>
          <yhm-managerth  title="服务编号"></yhm-managerth>
          <yhm-managerth  title="服务工时"></yhm-managerth>
          <yhm-managerth  title="考核工时"></yhm-managerth>
        </template>

        <!--数据明细-->
        <template #listBody>
          <tr :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]" v-for="(item,index) in content" :key="index">
            <yhm-manager-td-checkbox :value="item"></yhm-manager-td-checkbox>
            <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>
            <yhm-manager-td :tip="true" :value="item.proName"></yhm-manager-td>
            <yhm-manager-td-center :value="item.proNum"></yhm-manager-td-center>
            <yhm-manager-td-center :value="item.hours"></yhm-manager-td-center>
            <yhm-manager-td-center :value="item.assessment==null?'':item.assessment"></yhm-manager-td-center>
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
    name: 'processManagementManager',
    mixins: [managermixin],
    data(){
      return{

      }
    },
    methods:{
      ceshi(){
        this.ajaxJson({
          url: '/fix/fixOrder/print',
          data: {},
          call: (data) => {
            window.open('/UploadFile/' + data.message)
          }
        })
      },
      listView(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '700',
          url:'/processManagementForm?id='+item.id,
          title:'编辑服务',
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
        //     console.log( 'DATA',data )
        //   }
        // })
        this.$dialog.OpenWindow({
          width: '1050',
          height: '700',
          url:'/processManagementForm?type=1',
          title:'添加服务',
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
          url: '/fix/fixProduct/getManager',
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
