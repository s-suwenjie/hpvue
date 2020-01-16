<template>
  <div>
    <yhm-managerpage category="1">
      <!--导航条-->

      <template #navigationTab>
        <a class="menuTabDiv" href="/Fin/_bankDetailManager?menuType=1">收支明细</a>
        <router-link class="menuTabDiv" :to="{path:'/home/reimbursement'}">报销申请
          <i class="noticeNum">99</i>
        </router-link>
        <div class="menuTabActive">付款申请
        </div>
        <div>借款</div>
      </template>

      <!--操作区-->
      <template #operate>
        <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initData"></yhm-managersearch>
      </template>


      <!--数据表头-->
      <template #listHead>
        <yhm-managerth style="width: 30px;" title="选择"></yhm-managerth>
        <yhm-managerth style="width: 30px;" title="查看"></yhm-managerth>
        <yhm-managerth  title="收款单位" value="otherUnitID" ></yhm-managerth>
        <yhm-managerth style="width: 150px" title="最迟付款日期" value="lastDate"></yhm-managerth>
        <yhm-managerth style="width: 120px;" title="事由"></yhm-managerth>
        <yhm-managerth style="width: 120px" title="计划付款金额" value="money"></yhm-managerth>
        <yhm-managerth style="width: 180px;" title="编号"></yhm-managerth>
      </template>

      <!--数据明细-->
      <template #listBody>
        <tr :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]" v-for="(item,index) in content" :key="index">
          <yhm-manager-td-checkbox :value="item"></yhm-manager-td-checkbox>
          <yhm-manager-td-look @click="add(item.id)"></yhm-manager-td-look>
          <yhm-manager-td :value="item.otherUnit"></yhm-manager-td>
          <yhm-manager-td-date :value="item.lastDate"></yhm-manager-td-date>
          <yhm-manager-td-center :value="item.subject"></yhm-manager-td-center>
          <yhm-manager-td-money :value="item.money"></yhm-manager-td-money>
          <yhm-manager-td :value="item.code"></yhm-manager-td>
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
    name: 'paymentApplyManager',
    mixins: [managermixin],
    data () {
      return {
        index:'',
        causetbSwitch: false,
        indexNum: '',

        empty: true,

        category: 3,
        causeMore: false,
        subjectCount: '',
        otherUnitID: false,
        otherAccountID: false,
        lastDate: false,
        money: false,
        state: false,

        pager: { // 分页数据
          total: '', // 数据总条数
          pageSize: 15, // 单页数据条数
          pageIndex: 1, // 当前页码
          selectCount: 0 // 选中数据的条数
        },

        stateBefore: '0', // 默认选择状态为可以选择，1为不可以选择
        listState: {
          value: '',
          list: []
        },
      }
    },
    methods: {
      add (id) {
        // 默认设置页面标记是查看
        var isAdd = false
        // 默认设置页面标题为查看信息
        var title = '查看付款申请信息'
        var url = '/paymentApplyForm?id=' + id
        if (!id) { // 当id不存在的时候
          // 设置id为空
          id = ''
          // 设置页面标题为添加信息
          title = '添加付款申请信息'
          // 设置页面标记为添加
          isAdd = true
          url = '/paymentApplyForm?id='
        }
        this.$dialog.OpenWindow({
          width: 1050,
          height: 750,
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
      initPageData (initValue) {
        let params = {}

        if (initValue) {
          params = {}
        } else {
          params = {
            state: this.listState.value
          }
        }
        this.init({
          initValue:initValue,
          url: '/PersonOffice/getPaymentManagerAll',
          data:params,
          all:(data) =>{
            //不管是不是初始化都需要执行的代码
          },
          init:(data)=>{
            //初始化时需要执行的代码
            // 这边初始化筛选信息
            this.listState = data.statePsd
          }
        })
      },
      submit (id, operaState, operaIsFinish) { //提交申请
return
        if (operaIsFinish == 0 && operaState == 0) {
          if (id) {
            let params = {
              id: id,
              tableName: 45
            }
            this.$dialog.confirm({
              width: 300,
              tipValue: '确定提交申请?',
              btnValueOk: '确定',
              alertImg: 'warn',
              okCallBack: (data) => {
                this.ajaxJson({
                  url: '/PersonOffice/getSubmitCatrgoryVue',
                  data: params,
                  call: (data) => {
                    this.category = data.message
                    if (this.category) {
                      /* 判断是否拿到category */
                      let params = {
                        id: id,
                        category: this.category,
                        tableName: 45,
                        isDetail: 0,
                        tableDetailName: -1
                      }
                      this.ajaxJson({
                        url: '/PersonOffice/approvalSubmitVue',
                        data: params,
                        call: (data) => {
                          if (data.type == '0') {
                            this.$dialog.alert({
                              tipValue: data.message,
                              closeCallBack: () => {
                                this.initPageData(true)
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
                    }else{
                      this.$dialog.alert({
                        tipValue: '没有获取到提交数据!',
                        alertImg: 'error'
                      })
                    }
                  }
                })
              }
            })
          }
        }
      },

      selectEvent (data) {
        this.selectValue = selectItem(this.selectValue, data)
      },
      urge (id) {
        return
        if (id) {
          this.$dialog.confirm({
            width: 250,
            tipValue: '是否催促?',
            btnValueOk: '是',
            btnValueCancel : '否',
            alertImg: 'warn',
            okCallBack: (data) => {
              this.ajaxJson({
                url: '/PersonOffice/approvalSubmitVue',
                //data: params,
                call: (data) => {
                }
              })
            }
          })
        }
      }
    },
    computed: {
      // 检查是否选中
      checkSelect () {
        return function (id) {
          return this.selectValue.indexOf(id) !== -1
        }
      }
    },
    watch: {
      selectValue: {
        handler: function (val, oldval) {
          this.pager.selectCount = val.length
        },
        deep: true
      }
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

</style>
