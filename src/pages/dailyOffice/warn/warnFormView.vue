<template>
  <div>
    <div style="height: 30px;"></div>
    <yhm-view-body>
      <template #title>提醒人员</template>
      <template #body>
        <div v-for="(item,index) in list">
          <yhm-view-control :title="'提醒人员'+(index+1)" :content="item.otherName"></yhm-view-control>
        </div>

      </template>
    </yhm-view-body>
    <div style="height: 30px;"></div>

    <yhm-view-body>
      <template #title>查看提醒信息</template>
      <template #body>
        <yhm-view-control title="状态" :content="state" :psd="statePsd"></yhm-view-control>
        <yhm-view-control title="事项类型" :content="category" :psd="categoryPsd"></yhm-view-control>
        <yhm-view-control title="初次提醒日期" :content="workDate" type="date"></yhm-view-control>
        <yhm-view-control title="提醒日期" :content="workDate" v-if="nextDate == '1900-01-01'" type="date"></yhm-view-control>
        <yhm-view-control title="提醒日期" :content="nextDate" v-if="nextDate != '1900-01-01'" type="date"></yhm-view-control>
        <yhm-view-control title="提醒事项" :content="content"></yhm-view-control>
      </template>
    </yhm-view-body>
  </div>
</template>

<script>
  import { viewmixin } from '@/assets/view.js'
  export default {
    name: 'warnFormView',
    mixins: [viewmixin],
    data(){
      return{
        state:'',
        statePsd:[],
        category:'',
        categoryPsd:[],
        content:'',
        workDate:'',
        nextDate:'',
        list:[],
      }
    },
    created () {
      this.init()
    },
    methods:{
      init(){

        let params={
          id:this.id
        }

        this.ajaxJson({
          url: '/dailyoffice/warn/initForm',
          data: params,
          loading: '0',
          call: (data) => {
            this.list=data.list
            this.state=data.state
            this.statePsd=data.statePsd.list
            this.category=data.category
            this.categoryPsd=data.categoryPsd.list
            this.workDate=data.workDate
            this.nextDate=data.nextDate
            this.content=data.content

          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
