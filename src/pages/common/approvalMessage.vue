<template>
  <div>
    <!--数据表头-->
    <yhm-managerpage :sm-table="true" category="1" main-width="650" main-height="240">

      <!--数据表头-->
      <template #listHead>
        <yhm-managerth style="width: 100px;" title="操作人"></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="时间"></yhm-managerth>
        <yhm-managerth style="width: 180px;" title="留言"></yhm-managerth>
      </template>
      <template #listBody>
        <tr v-for="(item,index) in content" :key="index">
          <yhm-manager-td-center :value="item.person"></yhm-manager-td-center>
          <yhm-manager-td-date :value="item.workDate"></yhm-manager-td-date>
          <yhm-manager-td :tip="true" tip-type="r" node-class-name="m_main" :value="item.remark"></yhm-manager-td>
        </tr>
      </template>


      <!--数据空提示-->x
      <template #empty>
        <span class="m_listNoData" v-show="empty">暂时没有数据</span>
      </template>

    </yhm-managerpage>
<!--    <div v-html="contentHtml"></div>-->
  </div>
</template>

<script>

  import { managermixin } from '@/assets/manager.js'

  export default {
    name: "approvalMessage",
    mixins: [managermixin],
    data(){
      return {
        mouseControl:'',
        empty:false,
        id:'',
        content:[],
      }
    },
    methods:{
      init(initValue) {
        let params = {
          id:this.id
        }
        this.ajaxJson({
          url: '/PersonOffice/getApprovalPassMessage',
          data: params,
          call: (data)=>{
            this.content=data
          },
        })
      },
    },
    created(){
      this.setQuery2Value('id')
      this.init(true)
    },
  }
</script>

<style scoped>

</style>
