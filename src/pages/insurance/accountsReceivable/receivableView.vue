<template>
    <div class="f_main">
      <div class="i-left fs48b colorFFF lftSwitchArrow" title="上一条" v-show="isLeftID"  @click="strip('left')"></div>
      <div class="i-right fs48b colorFFF rgtSwitchArrow" title="下一条" v-show="isRightID" @click="strip('right')"></div>

      <yhm-view-body>
        <template #title>基本信息</template>
        <template #body>
          <yhm-view-control title="欠款方" :content="ownerName" id="ownerName" color="#49a9ea" @click="skiPdetails" style="cursor: pointer;"></yhm-view-control>
          <yhm-view-control title="负责人" :content="principal" id="principal"></yhm-view-control>
          <yhm-view-control title="来源" :psd="receivableSourceList.list" :content="receivableSource"  id="receivableSource"></yhm-view-control>
          <yhm-view-control title="核销类型" :psd="writeOffTypeList.list" :content="writeOffType" id="writeOffType"></yhm-view-control>
          <yhm-view-control title="欠款金额" :content="money" type="money" color="#f00"></yhm-view-control>
          <yhm-view-control title="剩余欠款金额" :content="balance" type="money" color="#f00"></yhm-view-control>
          <yhm-view-control title="欠款发生日期" :content="workDate" type="date"></yhm-view-control>
          <yhm-view-control title="预计收款日期" :content="collectMoneyDate" type="date"></yhm-view-control>
          <yhm-view-control title="事件说明" :content="remark"></yhm-view-control>
          <yhm-view-control title="文件" :content="fileList" type="files" category="3"></yhm-view-control>

        </template>
      </yhm-view-body>
      <div class="f_split"></div>
      <yhm-view-tab v-show="content.length>=1?true:false">
        <template #tab>
          <yhm-view-tab-button :list="tabState" :index="0">应收账款核销</yhm-view-tab-button>
        </template>
        <template #content>
          <yhm-view-tab-list :customize="true"  v-show="tabState[0].select">
            <template #listHead>
              <yhm-managerth style="width: 38px" title="查看"></yhm-managerth>
              <yhm-managerth  title="核销模块"></yhm-managerth>
              <yhm-managerth  title="核销金额"></yhm-managerth>
            </template>
            <template #listBody>
              <tr v-for="(item,index) in content" :class="{InterlacBg:index%2!=0}" :key="index">
                <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>
                <yhm-manager-td-psd :list="categoryList" :value="item.otherCategory"></yhm-manager-td-psd>
                <yhm-manager-td-money :value="item.money"></yhm-manager-td-money>
              </tr>
            </template>
            <template #empty>
              <span class="m_listNoData" v-show="content.length>=1?false:true">暂时没有数据</span>
            </template>
          </yhm-view-tab-list>

        </template>
      </yhm-view-tab>

      <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate"></yhm-formoperate>
    </div>
</template>

<script>
  import { viewmixin } from '@/assets/view.js'
  import { formatDate } from '@/assets/common.js'
  export default {
    name: 'receivableView',
    mixins: [viewmixin],
    data(){
      return{
        tabState:[{select:true}],
        id: '',
        currentDate: formatDate(new Date()),//当前日期
        ownerName: '',//对方姓名  或  单位
        ownerID: '',//欠款方ID
        money: '',//欠款方金额
        workDate: '',//欠款发生日期
        invoiceID: '',//发票开具日期
        collectMoneyDate: '',//预计收款日期
        principal: '',//负责人
        principalID: '',//负责人ID
        isFinish: '',//是否收款
        remark:'',//事件说明
        balance:'',
        index:0,
        isRightID:false,
        isLeftID:false,
        receivableSourceList:{},
        receivableSource:'',
        writeOffTypeList:{},
        writeOffType:'',
        content:[],
        categoryList:[
          {
            img:'',
            code:'',
            num:'0',
            showName:'付款申请'
          },
          {
            img:'',
            code:'',
            num:'1',
            showName:'收支明细'
          },
        ],
        fileList:[]
      }
    },
    methods:{
      listView(item){
        if(item.otherCategory==0){
          this.$dialog.OpenWindow({
            width: '1050',
            height: '750',
            url: '/paymentApplyFormView?id='+item.otherID,
            title: '查看付款申请信息',
            closeCallBack: (data) => {
              if (data) {
                this.initPageData(false)
              }
            }
          })
        }else if(item.otherCategory==1){
          this.$dialog.OpenWindow({
            width: '1050',
            height: '750',
            url: '/unitDetailView?id='+item.otherID,
            title: '查看收支明细信息',
            closeCallBack: (data) => {
              if (data) {
                this.initPageData(false)
              }
            }
          })
        }
      },
      selectedRelatedList() {
        let params = {
          id:this.id
        }
        this.ajaxJson({
          url: '/finance/receivableDetail/writeOffOwnerIDList',
          data: params,
          call: (data) => {
            if(data){
              this.content = data
            }
          }
        })
      },
      strip(val){//点击左右按钮时
        if(this.type!='1'){
          this.switchover()
          return
        }
        let selectList = JSON.parse(sessionStorage.receivablesFormSelectValue)//选中的数据的id
        if(selectList.length>0){
          this.isRightID = true
        }else{
          this.isRightID = false
        }
        if(selectList.length==1){
          this.isRightID = false
          this.isLeftID = false
        }
        let a =selectList.indexOf(this.id)
        if(a!=-1){//如果当前数据id不在全部id中的最前或者最后时 显示左右按钮
          if(a!=0||a!=selectList.length-1){
            this.isLeftID = true
            this.isRightID = true
          }
        }
        if(val=='right'){
          this.index++
          if(this.index==selectList.length-1){
            this.isRightID = false
          }else{
            this.isRightID = true
          }
        }else if(val=='left'){
          this.index--
          if(this.index==0){
            this.isLeftID = false
          }else{
            this.isLeftID = true
          }
        }
        this.switchover()
      },
      switchover (){
        setTimeout(()=>{
          if(this.type=='1'){//等于1的时候代表是从选中信息进来的
            let selectList = JSON.parse(sessionStorage.receivablesFormSelectValue)//选中的数据的id
            this.id=selectList[this.index]
          }else{
            this.setQuery2Value('id')
          }
          this.initData()
        },0)

      },
      skiPdetails(item){
        if(this.unitOrPerson=='0'){
          this.$dialog.OpenWindow({
            width: '1050',
            height: '750',
            url: '/unitView?id='+this.ownerID,
            title: '查看公司信息',
            closeCallBack: (data) => {
              if (data) {
                this.initPageData(false)
              }
            }
          })
        }else if(this.unitOrPerson=='1'){
          this.$dialog.OpenWindow({
            width: '1050',
            height: '750',
            url: '/personView?id='+this.ownerID,
            title: '查看联系人信息',
            closeCallBack: (data) => {
              if (data) {
                this.initPageData(false)
              }
            }
          })
        }

      },
      initData(){
        let params = {
          id:this.id
        }
        this.init({
          url: '/finance/receivableDetail/initForm',
          data: params,
          call: (data)=>{
            this.receivableSourceList = data.receivableSourceList
            this.receivableSource = data.receivableSourceList.value
            this.unitOrPersonList = data.unitOrPersonList
            this.unitOrPerson = data.unitOrPersonList.value
            this.writeOffTypeList = data.writeOffTypeList
            this.writeOffType = data.writeOffTypeList.value
            this.balance = data.balance
                this.ownerName=data.ownerName,
                this.ownerID=data.ownerID,
                this.principal=data.principal,
                this.principalID=data.principalID,
                this.money=data.money,//欠款方金额
                this.receivableSource=data.receivableSource,//收入来源
                this.receivableSourceID=data.receivableSourceID,
                this.workDate=data.workDate.slice(0,10),//欠款发生日期
                this.collectMoneyDate=data.collectMoneyDate.slice(0,10),//预计收款日期
                this.unitOrPerson=data.unitOrPerson,
                this.remark = data.remark
                this.fileList = data.fileList
          },
        })
      },
    },
    created () {
      this.setQuery2Value('id')
      this.setQuery2Value('type')
      this.strip()
      this.selectedRelatedList()

    }
  }
</script>

<style scoped>

</style>
