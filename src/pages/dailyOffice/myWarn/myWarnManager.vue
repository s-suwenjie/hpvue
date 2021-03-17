<template>
  <div>
    <yhm-managerpage>
      <!--导航条-->
      <template #navigation>个人提醒中心</template>

      <!-- 操作区-->
      <template #operate>
        <yhm-commonbutton value="添加提醒"  icon="btnAdd" :flicker="true" @call="add" category="one"></yhm-commonbutton>
        <yhm-commonbutton :value="choose?'收起筛选':'展开筛选'" :icon="choose?'btnUp':'btnDown'" @call="switchChoose()"></yhm-commonbutton>
        <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initPageData"></yhm-managersearch>
      </template>

      <template #choose>
        <div v-show="choose" class="buttonBody mptZero">
          <yhm-radiofilter @initData="initChoose('category')" title="事项类型" :content="categoryPsd"></yhm-radiofilter>
          <yhm-radiofilter @initData="initChoose('state')" title="状态" :content="statePsd"></yhm-radiofilter>
        </div>
      </template>

      <!--数据表头-->
      <template #listHead>
        <yhm-managerth style="width: 40px;" title="选择"></yhm-managerth>
        <yhm-managerth style="width: 40px;" title="查看"></yhm-managerth>
        <yhm-managerth title="提醒事项"></yhm-managerth>
        <yhm-managerth title="事项类型"></yhm-managerth>
        <yhm-managerth title="初次提醒日期"></yhm-managerth>
        <yhm-managerth title="提醒日期"></yhm-managerth>
        <yhm-managerth title="状态"></yhm-managerth>
      </template>

      <!--数据明细-->
      <template #listBody>
        <tr :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]" v-for="(item,index) in content" :key="index">
          <yhm-manager-td-checkbox :value="item"></yhm-manager-td-checkbox>
          <yhm-manager-td-look @click="look(item)"></yhm-manager-td-look>
          <yhm-manager-td :value="item.content"></yhm-manager-td>
          <yhm-manager-td-psd :value="item.category" :list="categoryPsd.list"></yhm-manager-td-psd>
          <yhm-manager-td-date :value="item.workDate"></yhm-manager-td-date>
          <yhm-manager-td-date :value="item.workDate" v-if="item.nextDate=='1900-01-01'"></yhm-manager-td-date>
          <yhm-manager-td-date :value="item.nextDate" v-if="item.nextDate!='1900-01-01'"></yhm-manager-td-date>
          <yhm-manager-td-psd :value="item.state" :list="statePsd.list"></yhm-manager-td-psd>

        </tr>
      </template>

      <!--数据空提示-->
      <template #empty>
        <span class="m_listNoData" v-show="content.length==0">暂时没有数据</span>
      </template>

      <!--分页控件-->
      <template #pager>
        <yhm-pagination :pager="pager" @initData="initPageData(false)"></yhm-pagination>
      </template>

    </yhm-managerpage>
  </div>
</template>

<script>
  import { selectItem, managermixin } from '@/assets/manager.js'
  export default {
    name: 'myWarnManager',
    mixins: [managermixin],
    data () {
      return {
        content: [],
        category:'',
        categoryPsd:'',
        state:'',
        statePsd:'',
        categorys:0,
        states:0,

        month:'',
        year:'',
        day:'',
        dateTime: ''
      }
    },
    methods:{


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
            state:this.statePsd.value,
            category: this.categoryPsd.value,
          }
        }

        this.init({
          initValue: initValue,
          url: '/dailyoffice/warn/getManager',
          data: params,
          loading: '0',
          all: (data) => {
            // 不管是不是初始化都需要执行的代码
            this.content = data.content
          },

          init: (data) => {
            // 初始化时需要执行的代码
            this.categoryPsd=data.categoryPsd
            this.statePsd=data.statePsd
            this.categoryPsd.value=''
            this.statePsd.value=''
          }
        })
      },

      look(item){//查看
        if(item.state==0){
          this.$dialog.OpenWindow({
            width: 1050,
            height: 720,
            url:'/warnForm?year='+this.year+'&month='+this.month+'&day='+this.day+'&ID='+item.id,
            title:'修改相关提醒事项',
            closeCallBack:(data) =>{
              this.initPageData(false)
            }
          })
        }else{
          this.$dialog.OpenWindow({
            width: 1050,
            height: 720,
            url:'/warnFormView?id='+item.id,
            title:'查看事项',
            closeCallBack:(data) =>{
              this.initPageData(false)
            }
          })
        }
      },
      add(){

        this.$dialog.OpenWindow({
          width: 1050,
          height: 720,
          url:'/warnForm?year='+this.year+'&month='+this.month+'&day='+this.day,
          title:'添加相关提醒事项',
          closeCallBack:(data) =>{
            this.initPageData(false)
          }
        })
      },

    },

    created () {
      this.month=new Date().getMonth() + 1
      this.year=new Date().getFullYear()
      this.day=new Date().getDate()


      console.log(this.day)
    }
  }
</script>

<style scoped lang="less">


</style>
