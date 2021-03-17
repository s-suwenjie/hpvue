<template>
  <div>
    <yhm-managerpage>
      <!--导航条-->
      <template #navigation>业务管理&nbsp;&gt;&nbsp;基础数据&nbsp;&gt;&nbsp;发票抬头</template>


      <!--操作区-->
      <template #operate>
        <!--<yhm-commonbutton :value="choose?'收起筛选':'展开筛选'" :icon="choose?'btnUp':'btnDown'" @call="switchChoose()"></yhm-commonbutton>-->
        <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initPageData"></yhm-managersearch>
        <yhm-radiofilter :before="stateBefore"  all="0" @initData="initChoose('state')" title="完成状态" :content="listState"></yhm-radiofilter>
      </template>

      <!--数据表头-->
      <template #listHead>
        <yhm-managerth style="width: 40px;" title="选择"></yhm-managerth>
        <yhm-managerth style="width: 40px;" title="查看"></yhm-managerth>
        <yhm-managerth width="163"  title="主公司"></yhm-managerth>
        <yhm-managerth width="163"  title="关联公司"></yhm-managerth>
        <yhm-managerth width="163"  title="关联公司税号"></yhm-managerth>
        <yhm-managerth width="163"  title="关联公司地址"></yhm-managerth>
        <yhm-managerth width="164"  title="关联公司手机号" ></yhm-managerth>
        <yhm-managerth width="164"  title="关联公司开户行" ></yhm-managerth>
        <yhm-managerth width="160"  title="关联公司账号" ></yhm-managerth>
        <yhm-managerth width="120" v-if="isCategory"  title="财务审批进度" value="finCategoryVal"></yhm-managerth>
        <yhm-managerth width="120" v-if="isCategory"  title="保险审批进度" value="insCategoryVal"></yhm-managerth>
        <yhm-managerth width="120" v-if="isCategory"  title="高层审批进度" value="highCategoryVal"></yhm-managerth>
      </template>

      <!--数据明细-->
      <template #listBody>
        <tr :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]" v-for="(item,index) in content" :key="index">
          <yhm-manager-td-checkbox :value="item"></yhm-manager-td-checkbox>
          <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>
          <yhm-manager-td tip="value" :value="item.ownerName"></yhm-manager-td>
          <yhm-manager-td tip="value" :value="item.unit"></yhm-manager-td>
          <yhm-manager-td tip="value" :value="item.taxNumber"></yhm-manager-td>
          <yhm-manager-td tip="value" :value="item.addressCN"></yhm-manager-td>
          <yhm-manager-td-center :value="item.tel"></yhm-manager-td-center>
          <yhm-manager-td :value="item.bank"></yhm-manager-td>
          <yhm-manager-td :value="item.account"></yhm-manager-td>
          <yhm-manager-td-center v-if="isCategory"  :value="item.finCategoryVal"></yhm-manager-td-center>
          <yhm-manager-td-center v-if="isCategory" :value="item.insCategoryVal"></yhm-manager-td-center>
          <yhm-manager-td-center v-if="isCategory" :value="item.highCategoryVal"></yhm-manager-td-center>

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
    name: 'invoiceManager',
    mixins: [managermixin],
    data(){
      return{
        stateBefore:'0',// 默认选择状态为可以选择，1为不可以选择
        state:'',
        listState:{
          list:[
            {
              num: '1', //默认为空
              showName: '已完成'
            },
            {
              num: '0', //默认为空
              showName: '进行中'
            },
            {
              num: '-1', //默认为空
              showName: '已驳回'
            },
          ],
          value:'0'

        },
        isCategory:true
      }
    },
    methods:{
      listView(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '690',
          url:'/unitInvoiceView?id='+item.id,
          title:'查看发票抬头',
          closeCallBack:(data) =>{
            if (data) {
              this.getUnitInformation(data)
            }
          }
        })
      },
      // 筛选事件
      initChoose (op) {
        if (op === 'state') {
          this.selectValue = []
        }
        if (this.listState.value==0 ||this.listState.value==-1){
          this.isCategory=true
        }else {
          this.isCategory=false
        }
        this.pager.pageIndex = 1
        this.initPageData(false)
      },
      initPageData (initValue) {
        let params = {}

        if (initValue) {
          params = {
            isFinish:this.listState.value
          }
        } else {
          params = {
            isFinish:this.listState.value
          }
        }
        this.init({
          initValue:initValue,
          url: '/Basic/unitInvoiceManager',
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
    },

  }
</script>

<style scoped>

</style>
