<template>
  <div>
    <yhm-managerpage category="1">
      <!--导航条-->
      <template #navigationTab>
        <router-link class="menuTabDiv menuTabActive" :to="{path:'/home/approvalPriorityManager'}">审批优先级</router-link>
        <router-link class="menuTabDiv" :to="{path:'/home/reversalAccountManager'}">冲账人员</router-link>
        <router-link class="menuTabDiv" :to="{path:'/home/boardFeesManager'}">董事会费人员</router-link>
        <router-link class="menuTabDiv" :to="{path:'/home/approvalPersonaliseManager'}">审批定制</router-link>
        <router-link class="menuTabDiv " :to="{path:'/home/insuranceProcessManager'}">保险审批制定</router-link>
        <router-link class="menuTabDiv " :to="{path:'/home/cashRegisterManager'}">收银审批制定</router-link>
        <router-link class="menuTabDiv " :to="{path:'/home/approPriationManager'}">批量拨款审批制定</router-link>
        <router-link class="menuTabDiv " :to="{path:'/home/unionCostsManager'}">工会审批制定</router-link>

      </template>
      <!--操作区-->
      <template #operate>
        <yhm-commonbutton value="添加" icon="btnAdd" :flicker="true" @call="add()"></yhm-commonbutton>
        <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initData"></yhm-managersearch>
        <!--<input type="text" id="mm" v-model="money" @change="moneyU()"/>-->
        <div style="display: flex;flex-direction: row; justify-content: center; align-items: center;">
          <div>账户剩余最低额度（￥）：</div>
          <div><yhm-text :value="money" id="money" @change="moneyU()" category="m"></yhm-text></div>
        </div>
      </template>

      <!--数据表头-->
      <template #listHead>
        <yhm-managerth style="width: 38px;" title="选择"></yhm-managerth>
        <yhm-managerth style="width: 40px;" title="查看"></yhm-managerth>
        <yhm-managerth  title="收款方" value="name"></yhm-managerth>
        <yhm-managerth style="width: 200px" title="类型" value="category" ></yhm-managerth>
        <yhm-managerth style="width: 80px;" title="删除"></yhm-managerth>
      </template>

      <!--数据明细-->
      <template #listBody>
        <tr :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]" v-for="(item,index) in content" :key="index">
          <yhm-manager-td-checkbox :value="item"></yhm-manager-td-checkbox>
          <yhm-manager-td-look @click="add(item.id)"></yhm-manager-td-look>
          <yhm-manager-td :value="item.name"></yhm-manager-td>
          <yhm-manager-td :value="item.category"></yhm-manager-td>
          <yhm-manager-td-operate>
            <yhm-manager-td-operate-button @click="del(item.id)" value="删除" icon="delete" color="#FF0000" hover-color="#FF0000"></yhm-manager-td-operate-button>
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
  import Qs from 'qs'
  import { selectClick, selectComputedSelected, selectConfirm, selectdbClick, number2chinese } from '@/assets/common.js'
  import { selectItem,managermixin } from '@/assets/manager.js'
  export default {
    name: 'approvalPriorityManager',
    mixins: [managermixin],
    data () {
      return {
        index:'',
        indexNum: '',

        unit: false,
        /*stateVal: false,*/

        pager: { // 分页数据
          total: '', // 数据总条数
          pageSize: 15, // 单页数据条数
          pageIndex: 1, // 当前页码
          selectCount: 0 // 选中数据的条数
        },
        stateBefore: '0', // 默认选择状态为可以选择，1为不可以选择
        money:'',
        beforeMoney: ''
        /*listIsDel: {
          value: '',
          list: []
        },*/
      }
    },
    methods: {
      add (id) {
        // 默认设置页面标记是查看
        var isAdd = false
        // 默认设置页面标题为查看信息
        var title = '查看优先级信息'
        var url = '/approvalPriorityForm?id=' + id
        if (!id) { // 当id不存在的时候
          // 设置id为空
          id = ''
          // 设置页面标题为添加信息
          title = '添加优先级信息'
          // 设置页面标记为添加
          isAdd = true
          url = '/approvalPriorityForm?id='
        }
        this.$dialog.OpenWindow({
          width: 1050,
          height: 550,
          url:url,
          title:title,
          closeCallBack:(data) =>{
            if (data) {
              if (isAdd) {
                this.lastData = data
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
              url: '/Com/approvalPriorityDel',
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
      moneyU (){
        var a=/^[0-9]*(\.[0-9]{1,2})?$/;
        if(!a.test(this.money)) {
          this.$dialog.alert({
            alertImg: 'error',
            tipValue: "格式不正确",
            closeCallBack: (data) => {
              this.money = this.beforeMoney
            }
          })
        }
        else {
          this.$dialog.confirm({
            width: 300,
            tipValue: '是否修改为'+this.money+'?',
            btnValueOk: '确定',
            alertImg: 'warn',
            okCallBack: (data) => {
              let params = {
                value1: this.money,
              }
              this.ajaxJson({
                url: '/Com/moneyU',
                data: params,
                call: (data) => {
                  if (data.type == '0') {
                    this.$dialog.alert({
                      tipValue: data.message,
                      closeCallBack: (data) => {
                        this.beforeMoney=this.money
                      }
                    })
                  } else {
                    this.$dialog.alert({
                      alertImg: 'error',
                      tipValue: data.message,
                      closeCallBack: () => {
                        this.money=this.beforeMoney
                      }
                    })
                  }
                }
              })
            },
            cancelCallBack:(data) =>{
              this.money=this.beforeMoney
            },
            closeCallBack:(data) =>{
              // if(this.aaa) {
              //   this.money = this.beforeMoney
              // }
            }
          })
        }
      },
      initPageData (initValue) {
        let params = {}
        if (initValue) {
          params = {}
        } else {
          params = {
            /*isDel: this.listIsDel.value*/
          }
        }
        this.init({
          initValue:initValue,
          url: '/Com/getApprovalPriorityManager',
          data:params,
          all:(data) =>{
            //不管是不是初始化都需要执行的代码
            this.money = data.money
            this.beforeMoney = data.money
          },
          init:(data)=>{
            //初始化时需要执行的代码
            // 这边初始化筛选信息
          }
        })
      },

    },
    created () {
      this.initPageData(true)
    }
  }
</script>
<style scoped lang="less">

  .icon-add-to:before,.icon-up:before,.icon-down:before{
    color: #49a9ea;
  }
  .operateBox{
    display: flex;
    flex-wrap: nowrap;
    height: 32px;
  }
  .operateFilter{
    display: flex;
    align-items: center;
    background-image: none;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    line-height: 32px;
    margin-left: 5px;
  }
  .causeMore{
    margin-left: 5px;
    display: inline-block;
    cursor: pointer;
    vertical-align: text-top;
  }
  .icon-prompt:before{
    border-radius: 50%;
  }
  .icon-checkboxed:before{
    color: #49a9ea;
    font-size: 18px;
  }
  .icon-checkbox{
    font-size: 18px;
  }

  .icon-delete:before{
    font-size: 16px;
    border-radius: 50%;
  }

</style>
