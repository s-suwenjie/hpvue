<template>
  <div>
    <yhm-managerpage>
      <!--导航条-->
      <template #navigation>系统&nbsp;&gt;&nbsp;系统管理&nbsp;&gt;&nbsp;微信消息管理</template>
      <template #operate>
        <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initData"></yhm-managersearch>
      </template>

      <!--数据表头-->
      <template #listHead>
        <yhm-managerth style="width: 40px;" title="选择"></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="发送人" value="sendName"></yhm-managerth>
        <yhm-managerth style="width: 180px;" title="发送时间" value="InsertDate"></yhm-managerth>
        <yhm-managerth style="width: 150px;" title="所属模板" value="templateName"></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="接收人" value="toUser"></yhm-managerth>
        <yhm-managerth style="width: 400px;" title="发送状态" value="remark"></yhm-managerth>
        <yhm-managerth title="备注" value="remark"></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="操作"></yhm-managerth>
      </template>

      <template #listBody>
        <tr v-for="(item,index) in content" :key="index" :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]">
          <yhm-manager-td-checkbox :value="item"></yhm-manager-td-checkbox>
          <yhm-manager-td :value="item.sendName"></yhm-manager-td>
          <yhm-manager-td-date :value="item.insertDate"></yhm-manager-td-date>
          <yhm-manager-td :value="item.templateName"></yhm-manager-td>
          <yhm-manager-td :value="item.toUser"></yhm-manager-td>
          <yhm-manager-td :value="item.remark"></yhm-manager-td>
          <yhm-manager-td :value="item.postContent"></yhm-manager-td>
          <yhm-manager-td-operate>
            <yhm-manager-td-operate-button  @click="resend(item)" value="重新发送" icon="delete" color="#FF0000"></yhm-manager-td-operate-button>
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
    name: 'wxMessageManager',
    mixins: [managermixin],
    methods:{
      resend(item){
        this.$dialog.confirm({
          width: 300,
          tipValue: '是否重新发送微信通知?',
          btnValueOk: '确定',
          alertImg: 'warn',
          okCallBack: (data) => {
            let params = {
              id: item.id,
              insertDate:item.insertDate,
              ownerID:item.ownerID,
              postContent:item.postContent
            }
            this.ajaxJson({
              url: '/Insurance/wx',
              data: params,
              call: (data) => {
                if (data.type == '0') {
                  this.$dialog.alert({
                    tipValue: data.message,
                    closeCallBack: (data) => {
                      this.initPageData(false)
                    }
                  })
                } else {
                  this.$dialog.alert({
                    alertImg: 'error',
                    tipValue: data.message,
                    closeCallBack: () => {
                    }
                  })
                }
              }
            })
          }
        })
      },
      //搜索
      initPageData (initValue) {
        let params = {}

        if (initValue) {
          params = {}
        } else {
          params = {}
        }
        this.init({
          initValue:initValue,
          url: '/SysManager/getManagerWxMessage',
          data:params,
          all:(data) =>{
            //不管是不是初始化都需要执行的代码
          },
          init:(data)=>{
            //初始化时需要执行的代码
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
