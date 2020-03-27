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
        <yhm-table-tip :show="tableTip" :content="tableTipInfo" :column="tableTipColumnInfo" :mouse-control="tableTipControl"></yhm-table-tip>
        <yhm-commonbutton value="添加" icon="btnAdd" :flicker="true" @call="add()" category="one"></yhm-commonbutton>
        <yhm-commonbutton :value="choose?'收起筛选':'展开筛选'" :icon="choose?'btnUp':'btnDown'" @call="switchChoose()"></yhm-commonbutton>
        <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initData"></yhm-managersearch>
        <!--      <div @click="selectPerson" style="display: inline-block; width: 120px; height: 30px; border: 1px solid #49A8EA;">选择联系人</div>-->
<!--        <yhm-commonbutton value="上传发票" icon="btnAdd" :flicker="true" @call="addInvoice()" category="one"></yhm-commonbutton>-->
<!--        <yhm-commonbutton value="弹框" icon="btnAdd" :flicker="true" @call="uploadInvoice()" category="one"></yhm-commonbutton>-->
        <yhm-commonbutton value="打开选中信息" @call="selectedList" :show="isSelected" category="three"></yhm-commonbutton>
        <yhm-radiofilter :before="stateBefore" @initData="initChoose('categoryUnit')" title="状态" all="0" :content="listState"></yhm-radiofilter>
        <yhm-radiofilter :before="stateBefore" @initData="initChoose('dateType')" title="时间类型"  :content="dateTypeList"></yhm-radiofilter>

      </template>

      <!--筛选区-->
      <template #choose>
        <div v-show="choose" class="buttonBody mptZero">
          <yhm-radiofilter :before="stateBefore" @initData="initChoose('isChecks')" title="支付方式" all="1" :content="listIsChecks"></yhm-radiofilter>
          <yhm-radiofilter :before="stateBefore" @initData="initChoose('isAllocation')" title="是否分批拨付" all="1" :content="listIsAllocation"></yhm-radiofilter>
        </div>
      </template>

      <!--数据表头-->
      <template #listHead>
        <yhm-managerth style="width: 38px;" title="选择"></yhm-managerth>
        <yhm-managerth style="width: 38px;" title="查看"></yhm-managerth>
        <yhm-managerth title="收款方" value="id"></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="支付方式" value="isChecks"></yhm-managerth>
        <yhm-managerth style="width: 120px" title="最迟付款日期" value="lastDate"></yhm-managerth>
        <yhm-managerth style="width: 70px;" title="倒计时" value="day"></yhm-managerth>
        <yhm-managerth style="width: 120px;" title="事由"></yhm-managerth>
        <yhm-managerth style="width: 110px" title="计划申请金额" value="money"></yhm-managerth>
        <yhm-managerth style="width: 220px;" title="编号" value="code"></yhm-managerth>
        <yhm-managerth style="width: 100px" title="状态" value="state"></yhm-managerth>
        <yhm-managerth style="width: 300px;" title="操作"></yhm-managerth>

      </template>

      <!--数据明细-->
      <template #listBody>
        <tr :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]" v-for="(item,index) in content"
            :key="index">
          <yhm-manager-td-checkbox :value="item"></yhm-manager-td-checkbox>
          <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>
          <yhm-manager-td :tip="true" :value="item.otherUnit"></yhm-manager-td>
          <yhm-manager-td-psd :value="item.isChecks" :list="isChecksList"></yhm-manager-td-psd>
          <yhm-manager-td-date :value="item.lastDate"></yhm-manager-td-date>
<!--          <yhm-manager-td-center :value="item.day"></yhm-manager-td-center>-->


          <yhm-manager-td-center :value="item.day+'天'" v-if="item.day<=2" style="color:#2c920b;font-weight: bold"></yhm-manager-td-center>
          <yhm-manager-td-center :value="item.day+'天'" v-else-if="item.day>2&&item.day<=5" style="color:#0511a5;font-weight: bold"></yhm-manager-td-center>
          <yhm-manager-td-center :value="item.day+'天'" v-else style="color: #f00;font-weight: bold"></yhm-manager-td-center>


          <yhm-manager-td-center :value="item.subject"></yhm-manager-td-center>
          <yhm-manager-td-money :tip-category="1" :before-icon="item.balanceList.length > 0?'i-btn-prompt':''" @mouseover="tableTipShowEvent" :value-object="item" @mouseout="tableTipHideEvent" :value="item.money"></yhm-manager-td-money>
          <yhm-manager-td-center :value="item.code"></yhm-manager-td-center>
          <yhm-manager-td-state :value="item.stateVal" @click="storeName(item.list)" :stateColor="item.stateColor" :stateImg="item.stateImg"></yhm-manager-td-state>

          <yhm-manager-td-operate>
            <yhm-manager-td-operate-button v-show="item.isPrint !== '1' && item.track !== '-1' && item.track !== '0' && item.track !== '1'" :no-click="item.state!=='0' || item.isFinish === '1'" @click="submit(item)" value="提交申请" icon="i-btn-applicationSm" color="#49a9ea"></yhm-manager-td-operate-button>

            <yhm-manager-td-operate-button v-show="item.track === '-1'" @click="addInvoice(item)" icon="i-export" value="上传发票"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button v-show="item.track === '0' || item.track === '1'" @click="addInvoice(item)" icon="i-invoiceView" value="查看发票" color="#fd6802"></yhm-manager-td-operate-button>

            <yhm-manager-td-operate-button :tip-category="0" @mouseover="tableTipShowEvent" @mouseout="tableTipHideEvent" :value-object="item" v-show="item.isPrint === '1'" :no-click="item.nature === '2'" @click="printFund(item)" value="打印单据" icon="i-btn-print" color="#7307dc"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button :no-click="item.isFinish !== '0' || item.state === '0'" @click="urge(item)" value="催促" icon="i-btn-urge" color="#2AA70B"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button :no-click="item.state !== '0' || item.isFinish === '1'" @click="del(item)" value="删除" icon="delete" color="#FF0000"></yhm-manager-td-operate-button>

            <yhm-manager-td-operate-button v-show="item.isAllocationMoney === '1'" @click="allocationEvent(item)" icon="i-allocation" value="分批拨付" color="#fd6802"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button v-show="item.isAllocationMoney === '2'" @click="allocationViewEvent(item)" icon="i-allocationView" value="查看分批拨付" color="#fd6802"></yhm-manager-td-operate-button>
          </yhm-manager-td-operate>

         <!-- <td class="tdPSty operation">
            <span @click="submit(item)" :class="[{gray:item.state!=0},{gray:item.isFinish == 1}]">
              <p class="icon-applicationSm optIcon"></p>提交申请
            </span>
            <span @click="urge(item)" :class="[{gray:item.state==0},{gray:item.isFinish == 1}]">
              <p class="icon-urge optIcon"></p>催促
            </span>
          </td>-->

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
  import { selectItem, managermixin } from '@/assets/manager.js'

  export default {
    name: 'paymentApplyManager',
    mixins: [managermixin],
    data () {
      return {
        index: '',
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

        isChecksList:[],
        isChecks:'',
        listIsChecks:{
          value: '',
          list: []
        },
        isAllocation: '',
        listIsAllocation: {
          value: '',
          list: []
        },

        stateBefore: '0', // 默认选择状态为可以选择，1为不可以选择
        listState: {
          value: '',
          list: []
        },
        menuTabOn: 1,
        details:[
          {id:'1', name: '付款计划',path:'/home/myPaymentPlanManager'},
          {id:'2', name: '付款申请',path:'/home/myManager/paymentApplyManager'},
          {id:'3', name: '报销',path:'/home/myManager/reimbursementManager'},
          {id:'4', name: '采购计划',path:'/home/myPurchaseManager'},
          {id:'5', name: '备用金',path:'/home/prettyCashsManager'},
          {id:'6', name: '补签字',path:'/home/myManager/signatureManager'},
        ],
        dateType:'',
        dateTypeList: {
          value: '',
          list: [{showName:"本周", num: "0", code: "", img: ""},{showName:"本月", num: "1", code: "", img: ""},{showName:"本季度", num: "2", code: "", img: ""},{showName:"本年", num: "3", code: "", img: ""},]
        },
        tableTip: false,
        tableTipControl: {},
        tableTipColumnInfo:[
          {width:'60',title:'操作人',category:'',key:'person'},
          {width:'120',title:'最新打印时间',category:'',key:'printDate'},
          {width:'40',title:'次数',category:'',key:'times'}
        ],

        balanceTableTipColumnInfo:[
          {width:'110',title:'剩余金额',category:'money',key:'balance'}
        ],
        tableTipInfo:[],
      }
    },
    methods: {
      //选中汇总
      selectedSum(){
        let params={
          selectValue:this.selectValue
        }
        this.ajaxJson({
          url: '/PersonOffice/commonSelectedsave',
          data:params,
          call:(data) =>{
            if(data.type===0){
              // this.ajaxJson({
              //   url: '/PersonOffice/getReimbursementManagerTotal',
              //   data:params,
              //   call:(information) =>{
              //     this.contentTotal = information
              //   }
              // })
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
            if(data.type===0){
              this.$dialog.OpenWindow({
                width: '1050',
                height: '620',
                title: '查看选中信息',
                url: '/paymentApplyFormView?id='+data.val,
                closeCallBack: (dataTwo)=>{
                  if(dataTwo){

                  }
                }
              })
            }
          }
        })
      },
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
      /* 查看分批拨付 */
      allocationViewEvent(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '550',
          title: '分批拨付',
          url: '/batchAllocationForm?ownerID=' + item.id + '&isAllocationMoney=' + item.isAllocationMoney,
          closeCallBack: (data)=>{
            if(data){
              this.initPageData(false)
            }
          }
        })
      },
      /* 分批拨付 */
      allocationEvent(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '550',
          title: '分批拨付',
          url: '/batchAllocationForm?ownerID=' + item.id + '&isAllocationMoney=' + item.isAllocationMoney,
          closeCallBack: (data)=>{
            if(data){
              this.initPageData(false)
            }
          }
        })
      },
      // uploadInvoice(){
      //   this.$dialog.OpenWindow({
      //     width: '1205',
      //     height: '550',
      //     url: '/paymentWindowManager?otherUnitID=0292FC76-E43B-43DC-83FA-DC3D79CAD9DA',
      //     title: '待上传发票',
      //     closeCallBack: (data) => {
      //
      //     }
      //   })
      // },
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
              url: '/PersonOffice/getPaymentManagerDel',
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
      /* 小标格显示 */
      tableTipShowEvent(item,control,category){
        if(category === 0){
          if(item.printLogList.length > 0) {
            this.tableTipColumnInfo = this.printTableTipColumnInfo
            this.tableTipInfo = item.printLogList
            this.tableTipControl = control
            this.tableTip = true
          }
        }
        else if(category === 1){
          if(item.balanceList.length > 0) {
            this.tableTipColumnInfo = this.balanceTableTipColumnInfo
            this.tableTipInfo = item.balanceList
            this.tableTipControl = control
            this.tableTip = true
          }
        }
      },
      tableTipHideEvent(){
        this.tableTip = false
      },
      addInvoice(item){
        let title = '上传发票'
        let url = '/paymentInvoice?ownerID=' + item.id + '&track=' + item.track + '&money=' + item.money
        if(item.track === '0'){
          url = '/paymentInvoice?ownerID=' + item.id + '&track=' + item.track + '&money=' + item.money
          title = '查看发票'
        }
        if(item.track === '1'){
          url = '/paymentInvoice?ownerID=' + item.id + '&track=' + item.track + '&viewTrack=1'+ '&money=' + item.money
          title = '查看发票'
        }
        this.$dialog.OpenWindow({
          width: '1050',
          height: '750',
          url: url,
          title: title,
          closeCallBack: (data) => {
            if (data) {
              this.initPageData(false)
            }
          }
        })
      },
      printFund(item){
        let params = {
          id: item.id
        }
        this.ajaxJson({
          url: '/PersonOffice/paymenPrint',
          data: params,
          call: (data) => {
            window.open("/UploadFile/" + data.message)
            /*添加打印次数 */
            let printLogParams = {
              ownerID: item.id,
            }
            this.ajaxJson({
              url:'/PersonOffice/addPrintLog',
              data:printLogParams,
              call:(data)=>{
                if (data) {
                  this.ajaxJson({
                    url: '/PersonOffice/getPrintLogsAjax',
                    data: printLogParams,
                    call: (data) => {
                      if (data){
                        item.printLogList = data
                      }
                    }
                  })
                }
              }
            })

            /* 打印电子发票 */
            if (item.invoice === '0'){
              this.$dialog.confirm({
                width: 300,
                tipValue: '是否打印电子发票?',
                alertImg: 'warn',
                okCallBack: (data)=>{
                  let electronicInvoiceParams = {
                    id: item.id
                  }
                  this.ajaxJson({
                    url: '/PersonOffice/getPayElectronicInvoice',
                    data: electronicInvoiceParams,
                    call: (data)=>{
                      if (data.type === 0 && data.val !== ''){
                        this.printInvoice = data.val;
                        try {
                          this.printInvoiceItem = this.printInvoice.split("|");
                        }catch (e) {}
                        for(var i=0;i<this.printInvoiceItem.length;i++){
                          var a = document.createElement("a");
                          a.download = this.printInvoiceItem[i];
                          a.href = "/UploadFile/ElectronicInvoice/" + this.printInvoiceItem[i];
                          a.click();
                        }
                      }else{
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

          }
        })
      },
      menuTab (index) {
        this.menuTabOn = index
      },
      listView(item){
        if(item.isFinish==='0'&&item.state==='0') {
          this.$dialog.OpenWindow({
            width: '1050',
            height: '750',
            url: '/paymentApplyForm?id=' + item.id +'&isState=' + item.state + '&isFinish=' + item.isFinish,
            title: "查看付款申请信息",
            closeCallBack: () => {
              this.initPageData(false)
            }
          })
        }else{
          this.$dialog.OpenWindow({
            width: '1050',
            height: '750',
            url: '/paymentApplyFormView?id=' + item.id +'&isState=' + item.state + '&isFinish=' + item.isFinish,
            title: "查看付款申请信息",
            closeCallBack: () => {
              this.initPageData(false)
            }
          })
        }

      },
      add () {
        // 默认设置页面标记是查看
        this.$dialog.OpenWindow({
          width: '1050',
          height: '750',
          url: '/paymentApplyForm',
          title: '添加付款申请信息',
          closeCallBack: (data) => {
            if (data) {
              this.lastData = data
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
            isChecks:this.listIsChecks.value,
            isAllocation: this.listIsAllocation.value,
            dateType: this.dateTypeList.value,
          }
        }
        this.init({
          initValue: initValue,
          url: '/PersonOffice/getPaymentManager',
          data: params,
          all: (data) => {

            //不管是不是初始化都需要执行的代码
          },
          init: (data) => {
            //初始化时需要执行的代码
            // 这边初始化筛选信息
            this.listState = data.statePsd
            this.isChecksList = data.isChecksPsd.list
            this.listIsChecks = data.isChecksPsd
            this.listIsAllocation = data.isAllocationPsd
          }
        })
      },
      submit (item) { //提交申请
        if (item.isFinish === '0' && item.state === '0') {
          if (item.id) {
            let params = {
              id: item.id,
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
                        id: item.id,
                        category: this.category,
                        tableName: 45,
                        isDetail: 0,
                        tableDetailName: -1
                      }
                      this.ajaxJson({
                        url: '/PersonOffice/approvalSubmitVue',
                        data: params,
                        call: (data) => {
                          if (data.type === 0) {
                            let params = {
                              id: item.id,
                              category: this.category,
                            }
                            this.ajaxJson({
                              url: '/PersonOffice/planSubmitAfterOperat',
                              data: params,
                              call: (data) => {
                                if (data.type === 2) {
                                  this.$dialog.alert({
                                    error: data.message,
                                    closeCallBack: () => {
                                      this.initPageData(true)
                                    }
                                  })
                                } else {
                                  this.$dialog.alert({
                                    width: 320,
                                    tipValue: data.message,
                                    closeCallBack: () => {
                                      this.initPageData(true)
                                    }
                                  })
                                }
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
                    } else {
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
      urge (item) {
        if (item.isFinish === '0' && item.state !== '0') {
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
                  tableName: 45
                }
                this.ajaxJson({
                  url: '/PersonOffice/approvalPressVue',
                  data: params,
                  call: (data) => {
                    if (data.type === 0) {
                      this.$dialog.alert({
                        tipValue: '催促成功！'
                      })
                    }else{
                      this.$dialog.alert({
                        alertImg: 'error',
                        tipValue: '催促失败！'
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
    }
  }
</script>
<style scoped lang="less">

  .causeMore {
    margin-left: 5px;
    display: inline-block;
    cursor: pointer;
    vertical-align: text-top;
  }


</style>
