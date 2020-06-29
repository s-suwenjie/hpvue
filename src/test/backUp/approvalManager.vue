<template>
  <div>
    <yhm-managerpage category="1">
      <!--导航条-->

      <template #navigationTab>
        <router-link class="menuTabDiv menuTabActive " :to="{path:'/home/approvalManager'}">付款审批</router-link>
        <a class="menuTabDiv" href="/Com/approvalManager">付款计划/报销</a>
      </template>

      <!--操作区-->
      <template #operate>
        <yhm-commonbutton :value="choose?'收起筛选':'展开筛选'" :icon="choose?'btnUp':'btnDown'" @call="switchChoose()"></yhm-commonbutton>
        <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initData"></yhm-managersearch>
        <!--      <div @click="selectPerson" style="display: inline-block; width: 120px; height: 30px; border: 1px solid #49A8EA;">选择联系人</div>-->
      </template>

      <!--筛选区-->
      <template #choose>
        <div v-show="choose" class="buttonBody mptZero">
          <yhm-radiofilter :before="stateBefore" @initData="initChoose('categoryUnit')" title="状态" all="0"
                           :content="listState"></yhm-radiofilter>
        </div>
      </template>
      <!--数据表头-->
      <template #listHead>
        <yhm-managerth style="width: 30px;" title="选择"></yhm-managerth>
        <yhm-managerth style="width: 30px;" title="查看"></yhm-managerth>
        <yhm-managerth title="收款单位" value="otherUnitID"></yhm-managerth>
        <yhm-managerth style="width: 150px" title="最迟付款日期" value="lastDate"></yhm-managerth>
        <yhm-managerth style="width: 120px;" title="事由"></yhm-managerth>
        <yhm-managerth style="width: 120px" title="计划付款金额" value="money"></yhm-managerth>
        <yhm-managerth style="width: 180px;" title="编号"></yhm-managerth>
        <yhm-managerth style="width: 130px" title="状态" value="stateVal"></yhm-managerth>
        <yhm-managerth style="width: 140px;" title="操作"></yhm-managerth>
      </template>

      <!--数据明细-->
      <template #listBody>
        <tr :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]" v-for="(item,index) in content"
            :key="index">

          <yhm-manager-td-checkbox :value="item"></yhm-manager-td-checkbox>
          <yhm-manager-td-look @click="add(item.id)"></yhm-manager-td-look>

          <yhm-manager-td :value="item.otherUnit"></yhm-manager-td>

          <yhm-manager-td-date :value="item.lastDate"></yhm-manager-td-date>

          <yhm-manager-td-center :value="item.subject"></yhm-manager-td-center>
          <yhm-manager-td-money :value="item.money"></yhm-manager-td-money>

          <yhm-manager-td-center :value="item.code"></yhm-manager-td-center>
          <yhm-manager-td-center :value="item.stateVal"></yhm-manager-td-center>



          <!--<yhm-manager-td-psd :value="item.stateVal" :list="stateItems"></yhm-manager-td-psd>-->

<!--          <yhm-manager-td-operate>-->
<!--            <yhm-manager-td-operate-button @click="adoptEvent(item)" value="通过" icon="i-btn-applicationSm" color="#49a9ea"></yhm-manager-td-operate-button>-->
<!--            <yhm-manager-td-operate-button @click="rejectEvent(item)" value="驳回" icon="i-btn-turnDown" color="#AA12CA"></yhm-manager-td-operate-button>-->
<!--          </yhm-manager-td-operate>-->

          <td class="tdPSty operation">
            <span @click="submit(item.id,item.state,item.isFinish,item.isRelevance)" :class="[{gray:item.state!=0},{gray:item.isFinish == 1}]">
<!--              跳转到收支明细-->
              <p class="icon-applicationSm optIcon"></p>通过
            </span>
            <span @click="rejectEvent(item)" :class="[{gray:item.state==0},{gray:item.isFinish == 1}]">
              <p class="icon-urge optIcon" ></p>驳回
            </span>
          </td>


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
  import { selectClick, selectComputedSelected, selectConfirm, selectdbClick, number2chinese } from '@/assets/common.js'
  import { selectItem, managermixin } from '@/assets/manager.js'

  export default {
    name: 'paymentApplyManager',
    mixins: [managermixin],
    data () {
      return {
        index: '',
        causetbSwitch: false,
        indexNum: '',

        empty: true,

        category: '',
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

        stateItems:[],

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
          url: url,
          title: title,
          closeCallBack: (data) => {
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
          initValue: initValue,
          url: '/PersonOffice/getPayApprovalManager',
          data: params,
          all: (data) => {

            //不管是不是初始化都需要执行的代码
          },
          init: (data) => {
            //初始化时需要执行的代码
            // 这边初始化筛选信息
            this.listState = data.statePsd
          }
        })
      },
      adoptEvent (item) { //提交申请
        if(item.id){
          let params = {
            id: item.id,
            kind: '0',
            tableName: '45'
          }
          this.$dialog.confirm({
            width: 300,
            tipValue: '是否通过?',
            alertImg: 'warn',
            okCallBack: (data)=>{
              this.ajaxJson({
                url: '/PersonOffice/approvalYesVue',
                data: params,
                call: (data)=>{
                  if(data.type == '0'){
                    this.$dialog.alert({
                      tipValue: data.message,
                      closeCallBack: () => {
                        this.initPageData(false)
                      }
                    })
                  }else if(data.type == '1'){
                    this.$dialog.alert({
                      tipValue: data.message,
                      alertImg: 'error',
                      closeCallBack: () => {
                      }
                    })
                  }
                }
              })
            }
          })
        }
      },
      rejectEvent (item) {
        if(item.id){
          let params = {
            id: item.id,
            tableName: '45',
          }
          this.ajaxJson({
            url: '/PersonOffice/getSubmitCatrgoryVue',
            data: params,
            call: (data)=>{
              if(data.type == '0'){
                this.category = data.message
                this.$dialog.OpenWindow({
                  width: 1050,
                  height: 720,
                  url: '/rejectReason?category=' + this.category +'&id=' + item.id,
                  closeCallBack: (data)=>{
                    this.initPageData(false)
                  }
                })
              }
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

  .mt_button{
    margin: 0 5px;
  }

</style>
