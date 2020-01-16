<template>
  <div>
    <yhm-managerpage category="1">
      <!--导航条-->
      <template #navigationTab>
        <router-link class="menuTabDiv menuTabActive" :to="{path:'/home/supplierManager'}">供应商信息</router-link>
      </template>
      <!--操作区-->
      <template #operate>
        <yhm-commonbutton  value="添加" icon="btnAdd" :flicker="true" @call="add()"></yhm-commonbutton>
        <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initData"></yhm-managersearch>

      </template>
      <!--数据表头-->
      <template #listHead>
        <yhm-managerth style="width: 40px;" title="选择"></yhm-managerth>
        <yhm-managerth style="width: 40px;" title="查看"></yhm-managerth>
        <yhm-managerth title="供应商信息" value="info"></yhm-managerth>
        <yhm-managerth title="供应商名称" value="name"></yhm-managerth>
        <yhm-managerth title="简称" value="abbreviation"></yhm-managerth>
        <yhm-managerth title="联系人" value="contact"></yhm-managerth>
        <yhm-managerth title="职务" value="position"></yhm-managerth>
        <yhm-managerth title="电话" value="iphone"></yhm-managerth>
        <yhm-managerth title="地址" value="address"></yhm-managerth>
        <yhm-managerth title="传真" value="fax"></yhm-managerth>
        <yhm-managerth title="邮件" value="mail"></yhm-managerth>
        <yhm-managerth title="网址" value="url"></yhm-managerth>
        <yhm-managerth title="开户行" value="bank"></yhm-managerth>
        <yhm-managerth title="银行账号" value="bankAccount"></yhm-managerth>
        <yhm-managerth title="备注" value="remarks"></yhm-managerth>
        <yhm-managerth style="width: 50px;" title="删除"></yhm-managerth>
      </template>

      <!--数据明细-->
      <template #listBody>
        <tr :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]" v-for="(item,index) in content" :key="index">
          <yhm-manager-td-checkbox :value="item"></yhm-manager-td-checkbox>
          <yhm-manager-td-look @click="add(item.id)"></yhm-manager-td-look>
          <yhm-manager-td :value="item.info"></yhm-manager-td>
          <yhm-manager-td :value="item.abbreviation"></yhm-manager-td>
          <yhm-manager-td :value="item.contact"></yhm-manager-td>
          <yhm-manager-td :value="item.position"></yhm-manager-td>
          <yhm-manager-td :value="item.iphone"></yhm-manager-td>
          <yhm-manager-td :value="item.address"></yhm-manager-td>
          <yhm-manager-td :value="item.fax"></yhm-manager-td>
          <yhm-manager-td :value="item.mail"></yhm-manager-td>
          <yhm-manager-td :value="item.url"></yhm-manager-td>
          <yhm-manager-td :value="item.bank"></yhm-manager-td>
          <yhm-manager-td :value="item.bankAccount"></yhm-manager-td>
          <yhm-manager-td :value="item.remarks"></yhm-manager-td>
          <yhm-manager-td-operate>
            <yhm-manager-td-operate-button  @click="del(item.id)" value="删除" icon="delete" color="#FF0000"></yhm-manager-td-operate-button>
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
    name: 'supplierManager',
    mixins: [managermixin],
    data(){
      return{

      }
    },

    methods:{

      //添加
      add (id) {
        // 默认设置页面标记是查看
        var isAdd = false
        // 默认设置页面标题为查看信息
        var title = '查看业务信息'
        if (!id) { // 当id不存在的时候
          // 设置id为空
          id = ''
          // 设置页面标题为添加信息
          title = '添加业务信息'
          // 设置页面标记为添加
          isAdd = true
        }
        this.$dialog.OpenWindow({
          width: '1050',
          height: '550',
          url:'/supplierForm?id=' + id,
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
              url: '/Business/delSupplier',
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
          url: '/Business/getSupplierManager',
          data:params,
          all:(data) =>{
            //不管是不是初始化都需要执行的代码
          },
          init:(data)=>{
            //初始化时需要执行的代码
          }
        })
      },
      //选择
      selectEvent (data) {
        this.selectValue = selectItem(this.selectValue, data)
      },
    }
  }
</script>

<style scoped>

</style>
