<template>
  <div>
    <yhm-managerpage category="1" :total-table="true" :totalWidth="true">
      <template #navigationTab>
        <router-link class="menuTabDiv" :to="{path:'/home/depositManager?isMain='+isMain}">收到的押金</router-link>
        <router-link class="menuTabDiv menuTabActive" :to="{path:'/home/payDepositManager?isMain='+isMain}">付出的押金</router-link>
      </template>
      <template #operate>
        <!-- 操作区-->
        <yhm-commonbutton value="添加" v-if="isMain === '0'" icon="btnAdd" :flicker="true" @call="add" category="one"></yhm-commonbutton>
        <yhm-commonbutton :value="choose?'收起筛选':'展开筛选'" :icon="choose?'btnUp':'btnDown'" @call="switchChoose()"></yhm-commonbutton>
        <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initChoose"></yhm-managersearch>
      </template>

      <template #choose>
        <div v-show="choose" class="buttonBody mptZero">
          <yhm-radiofilter @initData="initChoose('state')" title="状态" :content="statePsd"></yhm-radiofilter>
          <yhm-radiofilter @initData="initChoose('category')" title="类型" :content="categoryPsd"></yhm-radiofilter>
          <yhm-radiofilter @initData="initChoose('subject')" title="事由类型" :content="subjectPsd"></yhm-radiofilter>
        </div>
      </template>

      <!--数据表头-->
      <template #listHead>
        <yhm-managerth style="width: 40px;" title="选择"></yhm-managerth>
        <yhm-managerth style="width: 40px;" title="查看"></yhm-managerth>
        <yhm-managerth style="width: 60px;" title="添加人"></yhm-managerth>
        <yhm-managerth style="width: 110px;" title="添加日期"></yhm-managerth>
        <yhm-managerth style="width: 110px;" title="事由类型"></yhm-managerth>
        <yhm-managerth style="width: 60px;" title="收款类型"></yhm-managerth>
        <yhm-managerth style="width: 160px;" title="收款方"></yhm-managerth>
        <yhm-managerth title="收款账号"></yhm-managerth>
        <yhm-managerth style="width: 80px;" title="交易金额"></yhm-managerth>
        <yhm-managerth style="width: 70px;" title="收据类型"></yhm-managerth>
        <yhm-managerth style="width: 110px;" title="预计退款日期"></yhm-managerth>
        <yhm-managerth style="width: 80px;" title="状态"></yhm-managerth>
        <yhm-managerth title="备注"></yhm-managerth>
        <yhm-managerth style="width: 240px;" title="操作"></yhm-managerth>
      </template>

      <!--数据明细-->
      <template #listBody>
        <tr :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]" v-for="(item,index) in content" :key="index">
          <yhm-manager-td-checkbox :value="item"></yhm-manager-td-checkbox>
          <yhm-manager-td-look @click="look(item)"></yhm-manager-td-look>
          <yhm-manager-td :value="item.person"></yhm-manager-td>
          <yhm-manager-td-date :value="item.workDate"></yhm-manager-td-date>
          <yhm-manager-td-psd :value="item.subjectID" :list="subjectPsd.list" :menu-list="subjectMenu" @rightClick="rightClick(item)" @menuClick="menuClick"></yhm-manager-td-psd>
          <yhm-manager-td-psd :value="item.category" :list="categoryPsd.list"></yhm-manager-td-psd>
          <yhm-manager-td-center :tip="true" @click="selectOther(item)" :value="item.other" :menu-list="otherMenu" @rightClick="rightClick(item)" @menuClick="menuClick"></yhm-manager-td-center>
          <yhm-manager-td :tip="true" :value="item.otherAccount"></yhm-manager-td>
          <yhm-manager-td-money :value="item.money"></yhm-manager-td-money>
          <yhm-manager-td-psd @click="view(item)" :value="item.isReceopt" :list="isReceoptPsd.list"></yhm-manager-td-psd>
          <yhm-manager-td-date :value="item.refundDate"></yhm-manager-td-date>
          <yhm-manager-td v-show="item.state === '0'||item.state === '1'" color="#49a9ea" value="待付款"></yhm-manager-td>
          <yhm-manager-td v-show="item.state === '2'" color="#ae07e2" value="待退款"></yhm-manager-td>
         <!-- <yhm-manager-td v-show="item.state === '3'" color="#ae07e2" value="退款待确认"></yhm-manager-td>-->
          <yhm-manager-td v-show="item.state === '3'" color="#0c7f05" value="已完成"></yhm-manager-td>
          <yhm-manager-td :tip="true" :value="item.remark"></yhm-manager-td>
          <yhm-manager-td-operate>
            <yhm-manager-td-operate-button v-show="item.state === '0'&&isMain==='0'" @click="paymentFrom(item)" value="添加付款申请" icon="btnAdd"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button v-show="item.state === '2'&&isMain==='0'" @click="remindRefundMoney(item)" value="提醒财务退款" icon="i-btn-urge" color="#2AA70B"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button v-show="item.state === '2'&&isMain==='1'" @click="approFund(item)" value="确认收款" icon="i-btn-grant" color="#be08e3"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button v-show="item.isReceopt === '0'" @click="uploadReceipt(item)" value="上传收据" icon="i-btn-grant" color="#be08e3"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button v-show="item.state === '2'&&isMain==='1'" @click="isFinish(item)" icon="i-check" value="完成" color="#49a9ea" ></yhm-manager-td-operate-button>
          </yhm-manager-td-operate>
        </tr>
      </template>
      <!--v-show="(item.state === '1'||item.state === '2')&&isMain==='0'"-->
      <!--数据空提示-->
      <template #empty>
        <span class="m_listNoData" v-show="content.length==0">暂时没有数据</span>
      </template>

      <!--分页控件-->
      <template #pager>
        <yhm-pagination :pager="pager" @initData="initPageData(false)"></yhm-pagination>
      </template>

      <template #listTotalHead >
        <yhm-managerth @call="screenState('')" style="width: 60px;color: blue" title="" before-title="总金额" ></yhm-managerth>
        <yhm-managerth @call="screenState('0')" style="width: 60px;color: #c11bff" title="" before-title="待付金额" ></yhm-managerth>
        <yhm-managerth @call="screenState('1')" style="width: 60px;color: red" title="" before-title="已付金额"></yhm-managerth>
        <yhm-managerth @call="screenState('2')" style="width: 60px;color: red" title="" before-title="待退金额"></yhm-managerth>
        <yhm-managerth @call="screenState('3')" style="width: 60px;color: #10b6ff" title="" before-title="已退金额" ></yhm-managerth>
      </template>
      <template #listTotalBody>
        <tr>
          <yhm-manager-td-money @click="screenState('')" style="color: blue" :value="sumMoney"></yhm-manager-td-money>
          <yhm-manager-td-money @click="screenState('0')" style="color: #c11bff" :value="stayPayMoney"></yhm-manager-td-money>
          <yhm-manager-td-money @click="screenState('1')" style="color: red" :value="payMoney"></yhm-manager-td-money>
          <yhm-manager-td-money @click="screenState('2')" style="color: red" :value="stayRefundMoney"></yhm-manager-td-money>
          <yhm-manager-td-money @click="screenState('3')" style="color: #10b6ff"  :value="refundMoney"></yhm-manager-td-money>
<!--          <yhm-manager-td-money  :before-symbol="yearMoneySymbol" before-color="#ff000c" :style="{color:oldTotalColor1}"  value="NaN"></yhm-manager-td-money>-->
        </tr>
      </template>

    </yhm-managerpage>
  </div>
</template>

<script>
  import {managermixin} from '@/assets/manager.js'
  import { guid } from '../../../assets/common'
  export default {
    name: 'payDepositManager',
    mixins: [managermixin],
    data(){
      return{
        categoryPsd:[],
        subjectPsd:[],
        subjectMenu:['筛选事由','排除事由'],
        subjectType:'',
        statePsd:[],
        isReceoptPsd:[],
        category:'',
        subject:'',
        state:'0',
        isReceopt:'',
        isMain:'',
        sumMoney:'',
        stayPayMoney:'',
        payMoney:'',
        stayRefundMoney:'',
        refundMoney:'',
        otherMenu:['筛选收款方','排除收款方'],
        unitItme: {},
        otherID:'',
        otherType:'',
    }
    },
    created () {

    },
    methods:{
      screenState(state){
        this.statePsd.value=state
        this.initChoose()
      },
      menuClick(item) {//返回用户选中的菜单选项及索引值
        if (item === '筛选收款方') {
          this.otherMenu=['取消收款方筛选','排除收款方']
          this.otherID=this.unitItme.otherID
          this.otherType='1'
        }else if(item === '排除收款方'){
          this.otherMenu=['筛选收款方','取消排除收款方']
          this.otherID=this.unitItme.otherID
          this.otherType='2'
        }else if(item === '取消收款方筛选'){
          this.otherMenu=['筛选收款方','排除收款方']
          this.otherID=''
          this.otherType=''
        }else if(item === '取消排除收款方'){
          this.otherMenu=['筛选收款方','排除收款方']
          this.otherID=''
          this.otherType=''
        }else if(item === '筛选事由'){
          this.subjectMenu=['取消筛选事由','排除事由']
          this.subjectPsd.value=this.unitItme.subjectID
          this.subjectType='1'
        }else if(item === '取消筛选事由'){
          this.subjectMenu=['筛选事由','排除事由']
          this.subjectPsd.value=''
          this.subjectType='0'
        }else if(item === '排除事由'){
          this.subjectMenu=['筛选事由','取消排除事由']
          this.subjectPsd.value=this.unitItme.subjectID
          this.subjectType='2'
        }else if(item === '取消排除事由'){
          this.subjectMenu=['筛选事由','排除事由']
          this.subjectPsd.value=''
          this.subjectType='0'
        }
        this.pager.pageIndex = 1
        this.initPageData(false)
        this.total()
      },
      rightClick(item){
        this.unitItme = item
      },
      initChoose(obj){
        if(obj == 'subject'&&this.subjectPsd.value!=''){
          this.subjectType='1'
        }else{
          this.subjectType='0'
          this.subjectMenu=['筛选事由','排除事由']
        }
        this.initPageData (false)
        this.total()
      },
      total(){
        let params = {
          subjectType:this.subjectType,
          subjectID:this.subjectPsd.value,
          category:this.categoryPsd.value,
          state:this.statePsd.value,
          otherID:this.otherID,
          otherType:this.otherType,
        }
        this.ajaxJson({
          url: '/dailyoffice/payDeposit/getManagerTotal',
          data: params,
          call: (data) => {
            this.sumMoney=data.sumMoney.toString()
            this.stayPayMoney=data.stayPayMoney.toString()
            this.payMoney=data.payMoney.toString()
            this.stayRefundMoney=data.stayRefundMoney.toString()
            this.refundMoney=data.refundMoney.toString()
          }
        })
      },
      isFinish(item){
        this.$dialog.confirm({
          width:300,
          alertImg: 'warn',
          btnValueOk: '确认',
          tipValue: '剩余 <span style="color:red">('+item.refundMoney+'元)</span>未退回, 确定完成?',
          okCallBack: () => {
            let update={
              id:item.id,
              state:'3'
            }
            this.ajaxJson({
              url:  '/dailyoffice/payDeposit/updateState',
              data: update,
              call: (data) => {
                if(data.type===0){
                  this.$dialog.alert({
                    tipValue: '完成成功',
                    closeCallBack: () => {
                      this.initPageData (false)

                    }
                  })
                }else{
                  this.$dialog.alert({
                    tipValue: '完成失败',
                    closeCallBack: () => {
                    }
                  })
                }
              }
            })
          }
        })
      },
      selectOther(item){
        if(item.category==='0'){
          this.$dialog.OpenWindow({
            width: '1050',
            height: '690',
            url:'/unitView?id=' + item.otherID,
            title:'查看单位信息',
            closeCallBack:(data) =>{
              if(data){
                this.initPageData(false)
              }
            }
          })
        }else if(item.category==='1'){
          this.$dialog.OpenWindow({
            width: '1050',
            height: '750',
            url: '/personView?id=' + item.otherID,
            title: '查看联系人信息',
            closeCallBack: (data)=>{
              if(data){
                this.initPageData(false)
              }
            }
          })
        }
      },
      uploadReceipt(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '690',
          title: '上传收据',
          url: '/receipt?ownerID=' + item.id +'&money='+item.money+'&isOne=0',
          closeCallBack: (data)=>{
            this.initPageData(false)
          }
        })
      },
      remindRefundMoney(item){
        this.$dialog.confirm({
          width:300,
          alertImg: 'warn',
          btnValueOk: '确认',
          tipValue: '提醒财务查看收款信息?',
          okCallBack: () => {
            let update={
              id:item.id,
              state:'3'
            }
            this.ajaxJson({
              url:  '/dailyoffice/payDeposit/remindRefundMoney',
              data: update,
              call: (data) => {
                if(data.type===0){
                  this.$dialog.alert({
                    tipValue: '提醒成功',
                    closeCallBack: () => {
                      this.initPageData (false)
                    }
                  })
                }else{
                  this.$dialog.alert({
                    tipValue: '提醒失败',
                    closeCallBack: () => {
                    }
                  })
                }
              }
            })
          }
        })
      },
      approFund(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '690',
          title: '拨付资金',
          url: '/bankDetailForm?ownerID=' + item.id +'&bankDetailType=13&directionBefore=1',
          closeCallBack: (data)=>{
            this.initPageData(false)
          }
        })
      },
      paymentFrom(item){
        // 默认设置页面标记是查看
        this.$dialog.OpenWindow({
          width: '1050',
          height: '750',
          url: '/paymentApplyForm?ownerID='+item.id+'&nature=8',
          title: '添加付款申请信息',
          closeCallBack: (data) => {
            if (data) {
              this.initPageData(false)
            }
          }
        })
      },
      initPageData (initValue) {
        let params = {}
        if (initValue) {
          this.setQuery2Value('isMain')
          if(this.isMain == '0'){
            this.state='1'
          }
          // 页面初始化是需要的参数
          params = {
            state:this.state,
            init:true,
          }
        } else {
          // 页面非初始化时需要的参数
          params = {
            subjectID:this.subjectPsd.value,
            category:this.categoryPsd.value,
            state:this.statePsd.value,
            otherID:this.otherID,
            otherType:this.otherType,
            subjectType:this.subjectType,
          }
        }
        this.init({
          initValue: initValue,
          url:'/dailyoffice/payDeposit/getManager',
          data: params,
          loading: '0',
          all: (data) => {
            // 不管是不是初始化都需要执行的代码
          },
          init: (data) => {
            // 初始化时需要执行的代码
            this.categoryPsd=data.categoryPsd
            this.subjectPsd = data.subjectPsd
            this.statePsd = data.statePsd
            this.category=data.categoryPsd.value
            this.subject= data.subjectPsd.value
            this.state = data.statePsd.value
            this.isReceoptPsd =data.isReceoptPsd

            this.sumMoney=data.total[0].sumMoney.toString()
            this.stayPayMoney=data.total[0].stayPayMoney.toString()
            this.payMoney=data.total[0].payMoney.toString()
            this.stayRefundMoney=data.total[0].stayRefundMoney.toString()
            this.refundMoney=data.total[0].refundMoney.toString()
          }
        })
      },
      add(){
        this.$dialog.OpenWindow({
          width: 1050,
          height: 820,
          url:'/payDepositForm',
          title:'添加收押金',
          closeCallBack:(data) =>{
            if(data){
              this.initPageData(false)
            }
          }
        })
      },
      view(item){
        if(item.isReceopt==='1'){
          this.$dialog.OpenWindow({
            width: 1050,
            height: 720,
            url:'/payDepositView?isLook=1&id='+item.id,
            title:'查看付押金',
            closeCallBack:(data) =>{
              if(data){
                this.initPageData(false)
              }
            }
          })
        }
      },
      look(item){
        let url=''
        let title=""
        if(this.isMain==='0'){
          if(item.state === '0'){
            url='/payDepositForm?id='+item.id
            title='添加付押金'
          }else{
            url='/payDepositView?isLook=0&id='+item.id
            title='查看付押金'
          }
        }else{
          url='/payDepositView?isLook=0&id='+item.id
          title='查看付押金'
        }
        this.$dialog.OpenWindow({
          width: 1050,
          height: 720,
          url:url,
          title:title,
          closeCallBack:(data) =>{
            if(data){
              this.initPageData(false)
            }
          }
        })
      }
    }
  }
</script>

<style scoped>
  .icon-1:before{
    color: #c90000;
  }
</style>
