<template>
  <div>
    <yhm-managerpage>
      <!--导航条-->
      <template #navigation>业务管理&nbsp;&gt;&nbsp;基础数据&nbsp;&gt;&nbsp;来访人员</template>


      <!--操作区-->
      <template #operate>
        <yhm-commonbutton value="添加" icon="btnAdd" :flicker="true" @call="add()"></yhm-commonbutton>
        <yhm-commonbutton :value="choose?'收起筛选':'展开筛选'" :icon="choose?'btnUp':'btnDown'" @call="switchChoose()"></yhm-commonbutton>
        <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initData"></yhm-managersearch>
        <!--      <div @click="selectPerson" style="display: inline-block; width: 120px; height: 30px; border: 1px solid #49A8EA;">选择联系人</div>-->
      </template>


      <!--数据表头-->
      <template #listHead>
        <yhm-managerth style="width: 40px;" title="选择"></yhm-managerth>
        <yhm-managerth style="width: 40px;" title="查看"></yhm-managerth>
        <yhm-managerth title="姓名" value="visitName"></yhm-managerth>
        <yhm-managerth style="width: 300px" title="手机号码" value="phoneNumber"></yhm-managerth>
<!--        <yhm-managerth style="width: 300px" title="工单号"></yhm-managerth>-->
        <yhm-managerth style="width: 400px;" title="编码" value="code"></yhm-managerth>
      </template>
      <!--数据明细-->
      <template #listBody>
        <tr :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]" v-for="(item,index) in content"
            :key="index">
          <yhm-manager-td-checkbox :value="item"></yhm-manager-td-checkbox>
          <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>
          <yhm-manager-td :value="item.visitName"></yhm-manager-td>
          <yhm-manager-td-center :value="item.phoneNumber" format="phone*"></yhm-manager-td-center>
<!--          <yhm-manager-td-date :value="item.workOrder"></yhm-manager-td-date>-->
          <yhm-manager-td-center :value="item.code"></yhm-manager-td-center>
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
  export default {
    name: 'personTotalManager',
    mixins: [ managermixin ],
    data(){
      return{

      }
    },
    methods: {
      add(){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '400',
          url: '/visitPersonForm',
          title: '添加来访人员',
          closeCallBack: (data) => {
            if (data) {
              this.lastData = data
              this.initPageData(false)
            }
          }
        })
      },
      listView(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '400',
          url: '/visitPersonForm?id=' + item.id,
          title: '查看来访人员',
          closeCallBack: (data) => {
            if (data) {
              this.lastData = data
              this.initPageData(false)
            }
          }
        })
      },
      initPageData (initValue) {
        let params = {}
        if (initValue) {
          //初始化
          params = {}
        } else {
          //非初始化
          params = {

          }
        }
        this.init({
          initValue: initValue,
          url: '/Business/visitInformationManagerData',
          data: params,
          all: (data) => {
            //不管是不是初始化都需要执行的代码
          },
          init: (data) => {

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
