<template>
  <div>
    <yhm-managerpage category="1">
      <!--导航条-->

      <template #navigationTab>
        <router-link class="menuTabDiv" v-for="(item,index) in details" :key="index" :class="{menuTabActive:menuTabOn == index}" :to="{path:item.path}" @click="menuTab(index)">
          {{item.name}}
        </router-link>
      </template>

      <!--操作区-->
      <template #operate>
        <yhm-table-tip ref="smallTable" :show="tableTip" :content="tableTipInfo" :column="tableTipColumnInfo" :mouse-control="tableTipControl"></yhm-table-tip>
        <yhm-commonbutton value="添加" icon="btnAdd" :flicker="true" @call="add()" category="one"></yhm-commonbutton>
        <yhm-commonbutton :value="choose?'收起筛选':'展开筛选'" :icon="choose?'btnUp':'btnDown'" @call="switchChoose()"></yhm-commonbutton>
        <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initData"></yhm-managersearch>

        <yhm-commonbutton value="打开选中信息" icon="i-selectAll" @call="selectedList" :show="isSelected" category="three"></yhm-commonbutton>
        <yhm-radiofilter :before="stateBefore" @initData="initChoose('state')" title="状态" :content="listState"></yhm-radiofilter>
        <yhm-radiofilter :before="stateBefore" @initData="initChoose('dateType')" title="时间类型" :content="dateTypeList"></yhm-radiofilter>
      </template>

      <!--筛选区-->
      <template #choose>

        <div v-show="choose" class="buttonBody mptZero">
          <yhm-radiofilter @initData="initChoose('isPrettyCashOff')" title="是否核销" :content="listIsPrettyCashOff"></yhm-radiofilter>
        </div>
      </template>

      <!--数据表头-->
      <template #listHead>
        <yhm-managerth style="width: 40px;" title="选择"></yhm-managerth>
        <yhm-managerth style="width: 40px;" title="查看"></yhm-managerth>
        <yhm-managerth style="width: 140px" title="申请日期" value="workDate"></yhm-managerth>
        <yhm-managerth style="width: 120px" title="报销方式" value="isPrettyCashOff"></yhm-managerth>
        <yhm-managerth title="事由"></yhm-managerth>
        <yhm-managerth style="width: 120px" title="报销金额" value="money"></yhm-managerth>
        <yhm-managerth style="width: 110px" title="提交天数" value="day"></yhm-managerth>
        <yhm-managerth style="width: 180px;" title="编号" value="code"></yhm-managerth>
        <yhm-managerth style="width: 130px" title="状态" value="state"></yhm-managerth>
        <yhm-managerth style="width: 240px;" title="操作"></yhm-managerth>
      </template>

      <!--数据明细-->
      <template #listBody>
        <tr :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0},{listDelLine: item.isFinish === '1' && item.state !== '-1'}]" v-for="(item,index) in content" :key="index">
          <yhm-manager-td-checkbox :value="item"></yhm-manager-td-checkbox>
          <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>
          <yhm-manager-td-date :value="item.workDate"></yhm-manager-td-date>
          <yhm-manager-td-psd :value="item.isPrettyCashOff" :list="isPrettyCashOffList"></yhm-manager-td-psd>
          <yhm-manager-td :value="item.subject" :after-icon="item.subjectList.length > 1?'i-btn-prompt':''" @mouseover="tableTipShowEvent" @mouseout="tableTipHideEvent" :value-object="item"></yhm-manager-td>
          <yhm-manager-td-money :value="item.money" :before-icon="item.subjectList.length > 1?'i-btn-prompt':''" @mouseover="tableTipShowEvent" @mouseout="tableTipHideEvent" :value-object="item"></yhm-manager-td-money>
          <yhm-manager-td-center :value="item.day+'天'" v-if="item.day<=2" style="color:#2c920b;font-weight: bold"></yhm-manager-td-center>
          <yhm-manager-td-center :value="item.day+'天'" v-else-if="item.day>2&&item.day<=5" style="color:#0511a5;font-weight: bold"></yhm-manager-td-center>
          <yhm-manager-td-center :value="item.day+'天'" v-else style="color: #f00;font-weight: bold"></yhm-manager-td-center>
          <yhm-manager-td-center :value="item.code"></yhm-manager-td-center>
          <yhm-manager-td-state :value="item.stateVal"  @click="storeName(item.list)" :stateColor="item.stateColor" :stateImg="item.stateImg"></yhm-manager-td-state>

          <yhm-manager-td-operate>
            <yhm-manager-td-operate-button v-show="item.isPrint === '1'" @click="printFund(item)" value="打印单据" icon="i-btn-print" color="#7307dc"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button v-show="item.isPrint !== '1'" :no-click="item.state !== '0' || item.isFinish === '1'" @click="submit(item.id,item.state,item.isFinish,item.isRelevance)" value="提交申请" icon="i-btn-applicationSm" color="#49a9ea"></yhm-manager-td-operate-button>

            <yhm-manager-td-operate-button v-show="item.state==='9'&&item.isChecks1 === '1'" @click="aFullReturn(item)" value="退备用金" icon="i-btn-grant" color="#be08e3"></yhm-manager-td-operate-button>

            <yhm-manager-td-operate-button :no-click="item.state === '0' || item.isFinish === '1' || item.state === '-1'" @click="urge(item)" value="催促" icon="i-btn-urge" color="#2AA70B"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button :no-click="item.state !== '0' || item.isFinish === '1'" @click="del(item)" value="删除" icon="delete" color="#FF0000"></yhm-manager-td-operate-button>
          </yhm-manager-td-operate>
        </tr>
      </template>

      <!--数据空提示-->
      <template #empty>
        <span class="m_listNoData" v-show="empty">暂时没有数据</span>
      </template>

      <template #total>
        <div class="listTotalCrente m_list w620">
          <div class="listTotalLeft">
            <span class="test"></span>
            <span class="test">金额</span>
            <span class="test">条数</span>
          </div>
          <table width="100%" cellpadding="0" cellspacing="0" class="m_content_table m_content_total_table">
            <thead>
            <tr>
              <yhm-managerth style="width: 100px;" before-color="black" title="" before-title="总数"></yhm-managerth>
              <yhm-managerth style="width: 100px;" before-color="#49a9ea" title="" before-title="已拨款" ></yhm-managerth>
              <yhm-managerth style="width: 100px;" before-color="#ff0000" title="" before-title="未拨款" ></yhm-managerth>
            </tr>
            </thead>
            <tbody>
            <tr>
              <yhm-manager-td-money @click="totalClick(item)" v-for="(item,index) in contentTotal" :key="index" :value="item.money"></yhm-manager-td-money>
            </tr>
            <tr>
              <yhm-manager-td-rgt @click="totalClick(item)" v-for="(item,index) in contentTotal" :key="index" :value="item.count"></yhm-manager-td-rgt>
            </tr>
            </tbody>
          </table>
        </div>

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
        id: '',
        yanzheng:false,
        yanzheng1:false,

        index:'',
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

        stateBefore: '0', // 默认选择状态为可以选择，1为不可以选择
        listState: {
          value: '',
          list: []
        },
        listIsPrettyCashOff:{
          value: '',
          list: []
        },
        isPrettyCashOffList:[],
        menuTabOn: 2,
        details:[
          {id:'1', name: '付款计划',path:'/home/myPaymentPlanManager'},
          {id:'2', name: '付款申请',path:'/home/myManager/paymentApplyManager'},
          {id:'3', name: '报销',path:'/home/myManager/reimbursementManager'},
          {id:'4', name: '采购计划',path:'/home/myPurchaseManager'},
          {id:'5', name: '备用金',path:'/home/prettyCashsManager'},
          {id:'6', name: '补签字',path:'/home/myManager/signatureManager'},

        ],

        tableTip: false,
        tableTipControl: {},
        tableTipColumnInfo:[
          {width:'140',title:'事由',category:'',key:'subject'},
          {width:'100',title:'金额',category:'money',key:'money'},
          {width:'100',title:'状态',category:'',key:'stateVal'}
        ],
        tableTipInfo:[],
        causetbSwitch: false,
        subjectList: {},
        dateType:'',
        dateTypeList: {
          value: '',
          list: [{showName:"本周", num: "0", code: "", img: ""},{showName:"本月", num: "1", code: "", img: ""},{showName:"本季度", num: "2", code: "", img: ""},{showName:"本年", num: "3", code: "", img: ""},]
        },
        contentTotal:[],
        currentControl:null
      }
    },
    methods: {
      aFullReturn(item){
        this.$dialog.OpenWindow({
          width: 1050,
          height: 690,
          title: '全额退回',
          url: '/fullRefundForm?ownerID=' + item.prettyCashsID,
          closeCallBack: (data) => {
            if (data) {
              this.initPageData(false)
            }
          }
        });
      },
      //汇总部分筛选
      totalClick(item){
        if(item.isFinish==='-1'){
          this.listState.value = ''
        } else if(item.isFinish==='0'){
          this.listState.value = '0'
        } else if(item.isFinish==='1'){
          this.listState.value = '1'
        }
        this.pageIndex=1
        this.initPageData()
      },
      //查看拨付资金  往来明细 凭证
      storeName(item){
        if(item.length>0){
          if (item.image === "0") {
            //查看文件
            var url = "/UploadFile/" + this.tag + "/" + item.storeName;
            window.open(url)
          } else {
            //查看图片
            var imgArr = [];
            for (var i = 0; i < item.length; i++) {
              var temp = item[i];
              if (temp.image === "1") {
                imgArr.push("/UploadFile/" + temp.tag + "/" + temp.storeName);
              }
            }
            var index = imgArr.indexOf("/UploadFile/" + item.tag + "/" + item.storeName) + 2;
            this.$dialog.preview(imgArr, index)
          }
        }
      },
      selectedSum(){
        let params={
          selectValue:this.selectValue
        }
        this.ajaxJson({
          url: '/PersonOffice/commonSelectedsave',
          data:params,
          call:(data) =>{
            if(data.type===0){
              this.ajaxJson({
                url: '/PersonOffice/getReimbursementManagerTotal',
                data:params,
                call:(information) =>{
                  this.contentTotal = information
                }
              })
            }
          }
        })
      },
      //打开选中信息
      selectedList(){
        let params={
          selectValue:this.selectValue
        }
        this.ajaxJson({
          url: '/PersonOffice/commonSelectedsave',
          data:params,
          call:(data) =>{
            //finReimbursementViewFormSelect
            if(data.type===0){
              this.$dialog.OpenWindow({
                width: '1050',
                height: '620',
                title: '查看选中信息',
                url: '/reimbursementFormView?id='+data.val,
                closeCallBack: (dataTwo)=>{
                  if(dataTwo){

                  }
                }
              })
            }
          }
        })
      },
      /* 删除按钮 */
      del(item){
        this.$dialog.confirm({
          width: 300,
          tipValue: '确定删除？',
          btnValueOk: '确定',
          alertImg: 'warn',
          okCallBack: (data) => {
            let params = {
              id: item.id
            }
            this.ajaxJson({
              url: '/PersonOffice/getReimbursementManagerDel',
              data: params,
              call: (data)=>{
                if(data.type === 0){
                  this.$dialog.alert({
                    tipValue: data.message,
                    closeCallBack: ()=>{
                      this.initPageData()
                    }
                  })
                }else{
                  this.$dialog.alert({
                    alertImg: 'warn',
                    tipValue: data.message
                  })
                }
              }
            })
          }
        })
      },
      /* 打印报销单 */
      printFund(item){
        if (item.isPrettyCashOff === '0'){
          this.$dialog.OpenWindow({
            width: '638',
            height: '300',
            title: '打印报销单信息',
            url: '/approvalReimbursementFund?id=' + item.id + '&isPrint=1',
            closeCallBack: () => {
            }
          })
        }else{
          this.$dialog.OpenWindow({
            width: '846',
            height: '614',
            title: '备用金报销单打印信息',
            url: '/approvalReimbursementPrintBYJ?fundID=' + item.id,
            closeCallBack: () => {
            }
          })
        }

      },
      /* 小标格显示 */
      tableTipShowEvent(item,control){
        if(item.subjectList.length > 1) {
          this.currentControl = control
          this.tableTipInfo = item.subjectList
          this.tableTipControl = control
          this.tableTip = true
          this.currentControl = control
        }
        else{
          this.currentControl = null
          this.tableTip = false
        }
      },
      moveToSmallTable(e){
        if(this.currentControl) {
          if(!(this.currentControl.contains(e.target) || this.$refs.smallTable.$el.contains(e.target))){
            this.tableTip = false
          }
        }
        else{
          document.removeEventListener('mouseover', this.moveToSmallTable)
        }
      },
      tableTipHideEvent(item,control){
        if(item.subjectList.length > 1){
          document.addEventListener('mouseover', this.moveToSmallTable)
        }
      },
      menuTab (index) {
        this.menuTabOn = index
      },
      listView(item){
        if(item.state==='0'&&item.isFinish==='0'){
          this.$dialog.OpenWindow({
            width: 1050,
            height: 770,
            url:'/reimbursementForm?id=' + item.id,
            title:'查看报销信息',
            closeCallBack:(data) =>{
              if(data){
                this.initPageData(false)
              }
            }
          })
        }else{
          this.$dialog.OpenWindow({
            width: 1050,
            height: 620,
            url:'/reimbursementFormView?id=' + item.id,
            title:'查看报销信息',
            closeCallBack:(data) =>{
              if (data) {
                this.initPageData(false)
              }
            }
          })
        }
      },
      add () {
        // var url = '/reimbursementForm?id=' + id
        this.$dialog.OpenWindow({
          width: 1050,
          height: 700,
          url:'/reimbursementForm',
          title:'添加报销信息',
          closeCallBack:(data) =>{
            if (data) {
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
            state: this.listState.value,
            isPrettyCashOff: this.listIsPrettyCashOff.value,
            dateType:this.dateTypeList.value
          }
        }
        this.init({
          initValue:initValue,
          url: '/PersonOffice/getReimbursementManager',
          data:params,
          all:(data) =>{
            //不管是不是初始化都需要执行的代码
            this.contentTotal = data.total
          },
          init:(data)=>{
            //初始化时需要执行的代码
            // 这边初始化筛选信息
            this.listState = data.statePsd
            this.listIsPrettyCashOff = data.isPrettyCashOffPsd
            this.isPrettyCashOffList = data.isPrettyCashOffPsd.list
          }
        })
      },
      submit (id, operaState, operaIsFinish) { //提交申请
        if (operaIsFinish === '0' && operaState === '0') {
          if (id) {
            let params = {
              id: id,
              tableName:40
            }
            // this.$dialog.confirm({
            //   width: 300,
            //   tipValue: '确定提交申请?',
            //   btnValueOk: '确定',
            //   alertImg: 'warn',
            //   okCallBack: () => {
                this.ajaxJson({
                  url: '/PersonOffice/getSubmitCatrgoryVue',
                  data: params,
                  call: (data) => {
                    this.category = data.message
                    if (data.type === 0) {
                      /* 判断是否拿到category */
                      let params = {
                        id: id,
                        category: this.category,
                        tableName: 40,
                        isDetail: 1,
                        tableDetailName: 41
                      }
                      this.ajaxJson({
                        url: '/PersonOffice/approvalSubmitVue',
                        data: params,
                        call: (data) => {
                          if (data.type === 0) {
                            this.$dialog.alert({
                              tipValue: data.message,
                              closeCallBack: () => {
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
                    }else{
                      this.$dialog.alert({
                        tipValue: '没有获取到提交数据!',
                        alertImg: 'error'
                      })
                    }
                  }
                })
              }
          //   })
          // }
        }
      },

      urge (item) {
        if (item.id) {
          this.$dialog.confirm({
            width: 250,
            tipValue: '是否催促?',
            btnValueOk: '是',
            btnValueCancel: '否',
            alertImg: 'warn',
            okCallBack: () => {
              let params = {
                id: item.id,
                tableName: 40
              }
              this.ajaxJson({
                url: '/PersonOffice/getPressIDVue',
                data: params,
                call: (data) => {
                  if (data.type === 0) {
                    this.idMess = data.message
                    let params = {
                      id: this.idMess,
                    }
                    this.ajaxJson({
                      url: '/PersonOffice/approvalPressVue',
                      data: params,
                      call: (data) => {
                        if (data.type === 0) {
                          this.$dialog.alert({
                            tipValue: '催促成功！'
                          })
                        }
                      }
                    })
                  }
                }
              })
            }
          })
        } else {
          this.$dialog.alert({
            alertImg: 'error',
            tipValue: '请先提交申请'
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
  .listTotalLeft span:nth-child(1),.listTotalLeft span:nth-child(2){
    border-right: 0;
    border-bottom: 0;
  }
  .listTotalLeft span:nth-child(3){
    border-right: 0;
  }
</style>
