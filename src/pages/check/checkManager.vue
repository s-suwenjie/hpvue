<template>
  <div>
    <yhm-managerpage :total-table="true">
      <!--导航条-->
      <template #navigation>财务管理&nbsp;&gt;&nbsp;票据&nbsp;&gt;&nbsp;支票管理</template>
      <template #navigationLft>
        <div @mouseover="tipChange(index)" @mouseout="tipOut" style="margin: 0;position: relative;"  v-for="(item,index) in routerList" :key="index">
          <router-link tag="div" :class="item.class" style="margin: 0;" class="tip" :to="item.path">
            <div class="cbl_main_prompt2 tipShow">
              <div class="cbl_main_prompt_content" style="font-size:13px;padding: 0 12px;">
                {{tipValue}}
                <img src="/UploadFile/m_image/arrow.png">
              </div>
            </div>
          </router-link>
        </div>
      </template>
<!--      操作区-->
      <template #operate>
        <yhm-commonbutton value="入库" icon="btnAdd" :flicker="true" @call="add()" category="one"></yhm-commonbutton>
<!--        <yhm-commonbutton :value="choose?'收起筛选':'展开筛选'" :icon="choose?'btnUp':'btnDown'" @call="switchChoose()"></yhm-commonbutton>-->
        <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initData"></yhm-managersearch>

        <yhm-radiofilter :before="stateBefore" @initData="initChoose('state')" title="状态" :content="listState"></yhm-radiofilter>
        <yhm-radiofilter :before="categoryBefore" @initData="initChoose('category')" title="支票类型" :content="listCategory"></yhm-radiofilter>

      </template>

      <!--筛选区-->
      <template #choose>
        <div v-show="choose" class="buttonBody mptZero">
          <yhm-radiofilter :before="stateBefore" @initData="initChoose('state')" title="状态" :content="listState"></yhm-radiofilter>
          <yhm-radiofilter :before="categoryBefore" @initData="initChoose('category')" title="支票类型" :content="listCategory"></yhm-radiofilter>
        </div>
      </template>

      <!--数据表头-->
      <template #listHead>
        <yhm-managerth style="width: 38px;" title="选择"></yhm-managerth>
        <yhm-managerth style="width: 38px;" title="查看"></yhm-managerth>
        <yhm-managerth title="所属单位" value="name"></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="账户性质"></yhm-managerth>
        <yhm-managerth style="width: 160px;" title="所属银行" value="bank"></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="支票类型" value="category"></yhm-managerth>
        <yhm-managerth style="width: 120px;" title="入库日期" value="workDate"></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="购买人员" value="getOperator"></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="购买张数" value="quantity"></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="批次状态" value="state"></yhm-managerth>
        <yhm-managerth style="width: 70px;" title="操作"></yhm-managerth>
      </template>

      <!--数据明细-->
      <template #listBody>
        <tr v-for="(item,index) in content" :key="index" :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]">
          <yhm-manager-td-checkbox :value="item"></yhm-manager-td-checkbox>
          <yhm-manager-td-look @click="add(item.id,item.state)"></yhm-manager-td-look>
          <yhm-manager-td :value="item.name"></yhm-manager-td>
          <yhm-manager-td-center :value="item.natureType"></yhm-manager-td-center>
          <yhm-manager-td-logo :value="item.bank" :logo="item.bankLogo" tag="BankLogo" :center="true"></yhm-manager-td-logo>
          <yhm-manager-td-psd :value="item.category" :list="categoryList" ></yhm-manager-td-psd>
          <yhm-manager-td-date :value="item.workDate"></yhm-manager-td-date>
          <yhm-manager-td-center :value="item.getOperator"></yhm-manager-td-center>
          <yhm-manager-td-center :value="item.actualQuantity"></yhm-manager-td-center>
          <yhm-manager-td-psd :value="item.state" :list="stateList"></yhm-manager-td-psd>
          <yhm-manager-td-operate>
            <yhm-manager-td-operate-button :no-click="item.state === '1'" @click="wareHous(item)" value="入库" color="#49a9ea"></yhm-manager-td-operate-button>
          </yhm-manager-td-operate>
        </tr>
      </template>
      <!--数据空提示-->
      <template #empty>
        <span class="m_listNoData" v-show="empty">暂时没有数据</span>
      </template>
      <template #listTotalHead>
        <yhm-managerth style="width: 100px;" before-color="#a40b81" before-title="总 " title="张数"></yhm-managerth>
        <yhm-managerth style="width: 100px;" before-color="#d38702" before-title="未入库 " title="张数"></yhm-managerth>
        <yhm-managerth style="width: 100px;" before-color="#009788" before-title="可用 " title="张数"></yhm-managerth>
        <yhm-managerth style="width: 100px;" before-color="#999" before-title="作废 " title="张数"></yhm-managerth>
        <yhm-managerth style="width: 100px;" before-color="#2f54eb" before-title="外带 " title="张数"></yhm-managerth>
        <yhm-managerth style="width: 100px;" before-color="#d45702" before-title="已开具 " title="张数"></yhm-managerth>
      </template>
      <template #listTotalBody>
        <tr v-for="(item,index) in contentTotal" :key="index">
          <yhm-manager-td-rgt :value="item.count"></yhm-manager-td-rgt>
          <yhm-manager-td-rgt :value="item.useCount"></yhm-manager-td-rgt>
          <yhm-manager-td-rgt :value="item.countState0"></yhm-manager-td-rgt>
          <yhm-manager-td-rgt :value="item.countState1"></yhm-manager-td-rgt>
          <yhm-manager-td-rgt :value="item.countState2"></yhm-manager-td-rgt>
          <yhm-manager-td-rgt :value="item.countState3"></yhm-manager-td-rgt>
        </tr>
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
    name: 'checkManager',
    mixins: [managermixin],
    data(){
      return{
        stateBefore: '0', // 默认选择状态为可以选择，1为不可以选择
        listState: {
          value: '',
          list: []
        },
        categoryBefore:'0',
        listCategory:{
          value: '',
          list: []
        },
        tipValue:'',
        routerList:[
          {
            class:'i-homeCheck active',
            path:'/home/checkManager'
          },
          {
            class:'i-tiling',
            path:'/home/checkTilingManager'
          },

          {
            class:'i-expendCheck',
            path:'/home/checkExpendManager'
          },
          // {
          //   class:'i-incomeCheck',
          //   path:''
          // }
        ],
        tipList:[
          ['入库操作'],
          ['平铺视图'],
          ['列表操作']
        ],
        categoryList: [],
        stateList:[],
        contentTotal:[],
        isInitType: '0'
      }
    },
    methods: {
      tipChange(index){
        this.tipValue=this.tipList[index][0]
        $('.tipShow').eq(index).css({'display':'block'})
      },
      tipOut(){
        $('.tipShow').css('display','none')
      },
      wareHous(item){
        this.$dialog.confirm({
          alertImg: 'warn',
          tipValue: '确定入库？',
          okCallBack: ()=>{
            let params = {
              id: item.id
            }
            this.ajaxJson({
              url: '/Bill/checksStockIn',
              data: params,
              call: (data)=>{
                if(data.type === 0){
                  this.$dialog.alert({
                    tipValue: data.message,
                    closeCallBack: ()=>{
                      this.initPageData(false)
                    }
                  })
                }else {
                  this.$dialog.alert({
                    alertImg: 'error',
                    tipValue: data.message
                  })
                }
              }
            })
          }
        })
      },

      add(id,state){
        let isAdd = false
        let title = '查看支票入库信息'
        if(!id){
          id = ''
          title = '添加支票入库信息'
          isAdd = true
        }
        this.$dialog.OpenWindow({
          width: '1050',
          height: '750',
          title: title,
          url: '/checkForm?id=' + id + '&isInitType=' + this.isInitType + '&isState=' + state,
          closeCallBack: (data)=>{
            if(data){
              if(isAdd){
                this.lastData = data
              }
              this.initPageData(false)
            }
          }
        })
      },
      initPageData(initValue){
        let params = {}

        if (initValue) {
          params = {

          }
        } else {
          params = {
            state: this.listState.value,
            category:this.listCategory.value
          }
        }
        this.init({
          initValue:initValue,
          url: '/Bill/checksManagerData',
          data:params,
          all:(data) =>{
            //不管是不是初始化都需要执行的代码
            this.contentTotal = data.total
          },
          init:(data)=>{
            //初始化时需要执行的代码
            this.stateItems = data.stateItems
            this.listState = data.statePsd
            this.listCategory = data.categoryPsd
            this.stateItems = data.stateItems
            this.categoryList = data.categoryPsd.list
            this.stateList = data.statePsd.list
          }
        })
      },
    },
    watch:{
      content(){
        if(this.content.length === 0){
          this.isInitType = '1'
        }else {
          this.isInitType = '0'
        }
      }
    },
    created () {
    }
  }
</script>

<style scoped>
  .tipShow{
    width: 100px;
    display: none;
  }
</style>
