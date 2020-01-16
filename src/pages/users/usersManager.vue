<template>
  <div>
    <yhm-managerpage>
      <!--导航条-->
      <template #navigation>系统&nbsp;&gt;&nbsp;系统管理&nbsp;&gt;&nbsp;用户管理</template>
      <template #operate>
        <yhm-commonbutton value="添加" icon="btnAdd" :flicker="true" @call="add()"></yhm-commonbutton>
        <yhm-commonbutton :value="choose?'收起筛选':'展开筛选'" :icon="choose?'btnUp':'btnDown'" @call="switchChoose()"></yhm-commonbutton>
        <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initData"></yhm-managersearch>
      </template>
      <!--筛选区-->
      <template #choose>
        <div v-show="choose" class="buttonBody mptZero">
          <yhm-radiofilter :before="stateBefore" @initData="initChoose('state')" title="状态" :content="listState"></yhm-radiofilter>
        </div>
      </template>
      <!--数据表头-->
      <template #listHead>

        <yhm-managerth style="width: 30px;" title="选择"></yhm-managerth>
        <yhm-managerth style="width: 30px;" title="查看"></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="名称"></yhm-managerth>
        <yhm-managerth style="width: 130px;" title="登录账号"></yhm-managerth>
        <yhm-managerth style="width: 250px;" title="微信关联信息"></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="仅二维码登录"></yhm-managerth>
        <yhm-managerth style="width: 90px;" title="用户状态"></yhm-managerth>
        <yhm-managerth style="width: 150px;" title="操作"></yhm-managerth>

      </template>
      <!--数据明细-->
      <template #listBody>
        <tr v-for="(item,index) in content" :key="index" :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]">
          <yhm-manager-td-checkbox :value="item"></yhm-manager-td-checkbox>
          <yhm-manager-td-look @click="add(item.id)"></yhm-manager-td-look>
          <yhm-manager-td :value="item.person"></yhm-manager-td>
          <yhm-manager-td :value="item.loginName"></yhm-manager-td>
          <yhm-manager-td :value="item.open"></yhm-manager-td>
          <yhm-manager-td-yesno :value="item.onlyQrCodeLogin"></yhm-manager-td-yesno>
          <yhm-manager-td-psd :value="item.state" :list="stateItems"></yhm-manager-td-psd>
          <yhm-manager-td-operate>
            <yhm-manager-td-operate-button @click="setOnlyQrCodeLogin(item)" :value="item.onlyQrCodeLogin === '0'?'两种方式登录':'仅二维码登录'" icon="i-btn-refresh" :color="item.onlyQrCodeLogin === '0'?'#27CA50':'#FF0000'"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button @click="setUsersState(item)" :value="item.state === '0'?'禁用账户':'启用账户'" :icon="item.state === '0'?'i-btn-disable':'i-btn-check-number'" :color="item.state === '0'?'#FF0000':'#27CA50'"></yhm-manager-td-operate-button>
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
    name: 'usersManager',
    mixins: [managermixin],
    data(){
      return{
        onlyQrCodeLoginItems:[],
        stateItems:[],

        stateBefore: '0', // 默认选择状态为可以选择，1为不可以选择
        listState: {
          value: '0',
          list: []
        },
      }
    },
    methods:{
      //添加
      add (id) {
        // 默认设置页面标记是查看
        var isAdd = false
        // 默认设置页面标题为查看信息
        var title = '查看用户信息'
        if (!id) { // 当id不存在的时候
          // 设置id为空
          id = ''
          // 设置页面标题为添加信息
          title = '添加用户信息'
          // 设置页面标记为添加
          isAdd = true
        }
        this.$dialog.OpenWindow({
          width: 1050,
          height: 750,
          url:'/usersForm?id=' + id,
          title:title,
          closeCallBack:(data) =>{
            if (data) {
              if (isAdd) {
                this.lastData = data//接收子页面传的值
              }
              this.initPageData(false)
              // /!*false->非初始化=>!import  true->初始化*!/
            }
          }
        })
      },

      //搜素
      initPageData (initValue) {
        let params = {}
        if (initValue) {
          // 页面初始化是需要的参数
          params = {
            state: this.listState.value
          }
        } else {
          // 页面非初始化时需要的参数
          params = {
            state: this.listState.value
          }
        }
        this.init({
          initValue: initValue,
          url: '/SysManager/getUsersManager',
          data: params,
          all: (data) => {
            // 不管是不是初始化都需要执行的代码
          },
          init: (data) => {
            // 初始化时需要执行的代码
            // 这边初始化筛选信息
            this.onlyQrCodeLoginItems = data.onlyQrCodeLoginItems
            this.stateItems = data.stateItems
            this.listState = data.statePsd
          }
        })
      },
      setOnlyQrCodeLogin(item){
        let content = '确定要将<b class="red">（' + item.person + '）</b>的账户设置为仅二维码登录吗？'
        let okBtn = '仅二维码登录'
        if(item.onlyQrCodeLogin === '0'){
          content = '确定要将<b class="red">（' + item.person + '）</b>的账户设置为两种方式登录吗？'
          okBtn = '两种方式登录'
        }
        this.$dialog.confirm({
          tipValue:content,
          width: '520',
          btnValueOk:okBtn,
          okCallBack:() => {
            let params = {
              id:item.id
            }
            this.ajaxJson({
              url:"/SysManager/updateOnlyQrCodeLoginUsers",
              data:params,
              loading:"0",
              call:(data) =>{
                if(data.type === 0){
                  this.$dialog.alert({
                    tipValue:data.message,
                    width: '300',
                    closeCallBack:() => {
                      this.initPageData(false)
                    }
                  })
                }
                else{
                  this.$dialog.alert({
                    tipValue:data.message,
                    alertImg:'error'
                  })
                }
              }
            })
          }
        })
      },
      setUsersState(item){
        let content = '确定要禁用<b class="red">（' + item.person + '）</b>的账户吗？'
        let okBtn = '禁用账户'
        if(item.state === '1'){
          content = '确定要启用<b class="red">（' + item.person + '）</b>的账户吗？'
          okBtn = '启用账户'
        }
        this.$dialog.confirm({
          tipValue:content,
          width: '400',
          btnValueOk:okBtn,
          okCallBack:() => {
            let params = {
              id:item.id
            }
            this.ajaxJson({
              url:"/SysManager/updateStateUsers",
              data:params,
              loading:"0",
              call:(data) =>{
                if(data.type === 0){
                  this.$dialog.alert({
                    tipValue:data.message,
                    closeCallBack:() => {
                      this.initPageData(false)
                    }
                  })
                }
                else{
                  this.$dialog.alert({
                    tipValue:data.message,
                    alertImg:'error'
                  })
                }
              }
            })
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
