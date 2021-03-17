<template>
  <div>
    <yhm-managerpage >
      <!--导航条-->
      <template #navigation>人力资源&nbsp;&gt;&nbsp;人事管理&nbsp;&gt;&nbsp;花费额度</template>
      <!--操作区-->
      <template #operate>
        <yhm-commonbutton  value="添加" icon="btnAdd" :flicker="true" @call="add()"></yhm-commonbutton>
        <!--<yhm-commonbutton  value="添加1" icon="btnAdd" :flicker="true" @call="add1()"></yhm-commonbutton>-->
        <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initChoose()"></yhm-managersearch>

      </template>
      <!--数据表头-->
      <template #listHead>
        <yhm-managerth style="width: 40px;" title="选择"></yhm-managerth>
        <yhm-managerth  style="width: 40px;" title="查看"></yhm-managerth>
        <yhm-managerth  style="width: 100px;" title="所属时间" value="dateTime"></yhm-managerth>
        <yhm-managerth title="备注" ></yhm-managerth>
        <!--<yhm-managerth style="width: 100px;" title="删除"></yhm-managerth>-->
      </template>

      <!--数据明细-->
      <template #listBody>
        <tr :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]" v-for="(item,index) in content" :key="index">
          <yhm-manager-td-checkbox :value="item"></yhm-manager-td-checkbox>
          <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>
          <yhm-manager-td :value="item.dateTime+'-'+item.dateMonth"></yhm-manager-td>
          <yhm-manager-td :value="item.remark"></yhm-manager-td>
          <!--<yhm-manager-td-operate>-->
            <!--<yhm-manager-td-operate-button  @click="del(item.id)" value="删除" icon="delete" color="#FF0000"></yhm-manager-td-operate-button>-->
          <!--</yhm-manager-td-operate>-->
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
    name: 'reimbursementLlimitManager',
    mixins: [managermixin],
    data(){
      return{

      }
    },
    methods:{
      add1(){
        let params = {
          id:'B650176B-6278-4052-B58F-A9CFDF6055B1',

        }
        this.ajaxJson({
          url: '/dailyoffice/reimbursementLlimit/getSubjectStatistics',
          data: params,
          call: (data) => {
            console.log(data)
          }
        })
      },
      listView(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '680',
          url: '/reimbursementLlimitView?id=' + item.id,
          title: '查看花费额度',
          closeCallBack: (data)=>{
            if(data){
              this.initPageData(false)
            }
          }
        })
      },
      //添加
      add () {
        this.$dialog.OpenWindow({
          width: '1050',
          height: '750',
          url: '/reimbursementLlimitForm',
          title: '花费额度',
          closeCallBack: (data) => {
            if (data) {
              this.lastData = data
              this.initPageData(false)
              /*false->非初始化=>!import  true->初始化*/
            }
          }
        })
      },
      del(id){
        this.$dialog.confirm({
          width: 300,
          tipValue: '是否删除?',
          btnValueOk: '确定',
          alertImg: 'warn',
          okCallBack: (data) => {
            let params = {
              id: id,
            }
            this.ajaxJson({
              // url: '/Insurance/invoicUnitWhitelistDel',
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
          // url: '/Insurance/getInvoicUnitWhitelistManager',
          url: '/dailyoffice/reimbursementLlimit/getManager',
          data:params,
          all:(data) =>{
            //不管是不是初始化都需要执行的代码
          },
          init:(data)=>{
            //初始化时需要执行的代码

          }
        })
      },
    },
  }
</script>

<style scoped>

</style>
