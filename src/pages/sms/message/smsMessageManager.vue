<template>
  <div>
    <yhm-managerpage>
      <!--导航条-->
      <template #navigation>系统&nbsp;&gt;&nbsp;短信管理&nbsp;&gt;&nbsp;短信消息管理</template>
      <template #operate>
        <yhm-commonbutton :value="choose?'收起筛选':'展开筛选'" :icon="choose?'btnUp':'btnDown'" @call="switchChoose()"></yhm-commonbutton>
        <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initData"></yhm-managersearch>
        <yhm-preview-sms :value="previewSms" ref="preview" :shade-show="false"></yhm-preview-sms>
      </template>

      <!--筛选区-->
      <template #choose>
        <div v-show="choose" class="buttonBody mptZero">
          <yhm-radiofilter @initData="initChoose('category')" title="类型" :content="listCategory"></yhm-radiofilter>
        </div>
      </template>

      <!--数据表头-->
      <template #listHead>
        <yhm-managerth style="width: 40px;" title="选择"></yhm-managerth>
        <yhm-managerth style="width: 40px;" title="查看"></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="信息来源" value="category"></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="联系人" value="person"></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="手机号" value="phone"></yhm-managerth>
        <yhm-managerth style="width: 170px;" title="发送时间" value="workdate"></yhm-managerth>
        <yhm-managerth style="width: 150px;" title="发送状态" value="message"></yhm-managerth>
        <yhm-managerth style="width: 170px;" title="回执时间" value="receiptTime"></yhm-managerth>
        <yhm-managerth style="width: 150px;" title="回执状态" value="receiptStatus"></yhm-managerth>
        <yhm-managerth title="回执描述" value="receiptDescription"></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="操作"></yhm-managerth>
      </template>

      <!--数据明细-->
      <template #listBody>
        <tr v-for="(item,index) in content" :key="index" :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]">
          <yhm-manager-td-checkbox :value="item"></yhm-manager-td-checkbox>
          <yhm-manager-td-look @click="add(item.id)"></yhm-manager-td-look>
          <yhm-manager-td-psd :value="item.category" :list="listCategory.list"></yhm-manager-td-psd>
          <yhm-manager-td :value="item.person"></yhm-manager-td>
          <yhm-manager-td :value="item.phone"></yhm-manager-td>
          <yhm-manager-td-date :value="item.workdate"></yhm-manager-td-date>
          <yhm-manager-td :value="item.message"></yhm-manager-td>
          <yhm-manager-td-date :value="item.receiptTime"></yhm-manager-td-date>
          <yhm-manager-td :value="item.receiptStatus"></yhm-manager-td>
          <yhm-manager-td :value="item.receiptDescription"></yhm-manager-td>
          <yhm-manager-td-operate>
            <yhm-manager-td-operate-button @mouseout="previewSmsEvent(item,'1')"  @mouseover="previewSmsEvent(item,'0')" icon="i-previewSMS" value="预览短信" color="#A347FF"></yhm-manager-td-operate-button>
          </yhm-manager-td-operate>
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
    name: 'smsTemplateManager',
    mixins: [managermixin],
    data(){
      return {
        previewSms:'',
        listCategory:{
          value:"",
          list:[]
        },
      }
    },
    methods:{
      add(id) {
        // 默认设置页面标记是查看
        var isAdd = false
        // 默认设置页面标题为查看信息
        var title = '查看短信信息'
        if (!id) { // 当id不存在的时候
          // 设置id为空
          id = ''
          // 设置页面标题为添加信息
          title = '添加短信信息'
          // 设置页面标记为添加
          isAdd = true
        }
        this.$dialog.OpenWindow({
          width: 1050,
          height: 600,
          url:'/smsMessageForm?id=' + id,
          title:title,
          closeCallBack:(data) =>{
            if (data) {
              if (isAdd) {
                this.lastData = data//接收子页面传的值
              }
              this.initPageData(false)
              /*false->非初始化=>!import  true->初始化*/
            }
          }
        })
      },
      previewSmsEvent(item,category){
        this.previewSms = item.content
        this.$refs.preview.$emit('switch',category)
      },
      initPageData (initValue) {
        let params = {}

        if (initValue) {
          params = {
            category:this.listCategory.value
          }
        } else {
          params = {
            category:this.listCategory.value
          }
        }
        this.init({
          initValue:initValue,
          url: '/sys/smsMessage/getManager',
          data:params,
          all:(data) =>{
            //不管是不是初始化都需要执行的代码
          },
          init:(data)=>{
            //初始化时需要执行的代码
            this.listCategory = data.categoryPsd
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
