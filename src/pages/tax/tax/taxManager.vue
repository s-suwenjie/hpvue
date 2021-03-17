<template>
    <div>
      <yhm-managerpage category="1" :total-table="true">
        <!--导航条-->

        <template #navigationTab>
          <router-link class="menuTabDiv menuTabActive" :to="{path:'/home/taxManager'}">税号（发票抬头）</router-link>
          <router-link class="menuTabDiv" :to="{path:'/home/invoiceRiseManager'}">关联审批中</router-link>
        </template>
        <template #operate>
          <!-- 操作区-->
          <yhm-table-tip  :show="tableTip"  @call="tableTipClick" ref="smallTable" :content="tableTipInfo" :column="tableTipColumnInfo" :mouse-control="tableTipControl"></yhm-table-tip>

          <yhm-commonbutton value="添加" icon="btnAdd" :flicker="true" @call="add" category="one"></yhm-commonbutton>
          <yhm-commonbutton :value="choose?'收起筛选':'展开筛选'" :icon="choose?'btnUp':'btnDown'" @call="switchChoose()"></yhm-commonbutton>
          <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initChoose"></yhm-managersearch>
<!--          <div @click="generateCodePng" class="b_main" style="background-color: #acaef3">查看详情列表</div>-->
          <yhm-radiofilter @initData="initChoose('companyCategory')" title="纳税类型" :content="companyCategoryPsd"></yhm-radiofilter>
          <yhm-radiofilter @initData="initChoose('category')" title="税票类型" :content="categoryPsd"></yhm-radiofilter>
        </template>

        <template #choose>
          <div v-show="choose" class="buttonBody mptZero">

          </div>
        </template>
        <template #listHead>
          <yhm-managerth style="width: 40px;" title="选择" ></yhm-managerth>
          <yhm-managerth style="width: 40px;" title="查看" ></yhm-managerth>
          <yhm-managerth title="公司名称" style="width: 300px;"></yhm-managerth>
          <yhm-managerth style="width: 150px;"  title="税号" ></yhm-managerth>
          <yhm-managerth style="width: 100px;" title="纳税规模" ></yhm-managerth>
          <yhm-managerth style="width: 220px;" title="税票类型" ></yhm-managerth>
          <yhm-managerth style="width: 150px;" title="开票码"></yhm-managerth>
          <yhm-managerth style="width: 60px" title="二维码"></yhm-managerth>
          <yhm-managerth style="width: 60px" title="一维码" ></yhm-managerth>
          <yhm-managerth title="操作"></yhm-managerth>
        </template>
        <!--      数据表单       -->
        <template #listBody >
          <tr :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]" v-for="(item,index) in content" :key="index">
            <yhm-manager-td-checkbox :value="item" @call="check(selectValue,index)"></yhm-manager-td-checkbox>
            <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>
            <yhm-manager-td :tip="true" :value="item.unit" :after-icon="item.invoiceUnit.length > 0?'i-hyperchain':''" @mouseover="tableTipShowEvent" @mouseout="tableTipHideEvent" :value-object="item"></yhm-manager-td>
            <yhm-manager-td :value="item.taxNumber"></yhm-manager-td>
            <yhm-manager-td-psd :value="item.companyCategory" :list="companyCategoryPsd.list"></yhm-manager-td-psd>
            <yhm-manager-td-psd :value="item.category" :list="categoryPsd.list"></yhm-manager-td-psd>
            <yhm-manager-td :value="item.billingCode"></yhm-manager-td>
<!--            <yhm-manager-td-tip-img :unitUrl="'tax'+item.url" icon="icon-uniE999" :tip="true" color="#333" node-class-name="m_main"></yhm-manager-td-tip-img>-->
            <yhm-manager-td-image :tip="true" left="-100" width="200" height="200" :value="item.url" tag="tax" geticon="icon-uniE999"></yhm-manager-td-image>
            <yhm-manager-td-image :tip="true" left="-150" width="300" height="100" :value="item.taxNumberUrl" tag="tax" geticon="icon-3"></yhm-manager-td-image>
            <yhm-manager-td-operate>
              <yhm-manager-td-operate-button @click="clickCopy(item)" value="复制" color="#7112da"></yhm-manager-td-operate-button>
              <yhm-manager-td-operate-button @click="sendOutMy(item)" value="发送至微信" color="#606060" icon="icon-uniE99B"></yhm-manager-td-operate-button>
              <yhm-manager-td-operate-button @click="sendOutOtherPerson(item)" value="发送给其他人" color="#606060" icon="icon-uniE99B"></yhm-manager-td-operate-button>
              <yhm-manager-td-operate-button @click="listView(item)" value="查看开票记录" icon="i-invoiceView" color="#0a7cbf"></yhm-manager-td-operate-button>
              <yhm-manager-td-operate-button @click="openInvoice(item)" value="待开票数据" icon="i-invoice" color="#7112da"></yhm-manager-td-operate-button>
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
      <div class="copyTip" v-if="isCopyTip">复制成功： {{text}}</div>
    </div>
</template>

<script>
  import {managermixin} from '@/assets/manager.js'
  export default {
    name: 'taxManager',
    mixins: [managermixin],
    data() {
      return {
        categoryPsd:{
          list:[],
          value:''
        },
        companyCategoryPsd:{
          list:[],
          value:''
        },
        isCopyTip:false,
        tableTip: false,
        tableTipControl: {},
        tableTipColumnInfo:[
          {width:'38',title:'查看',category:'look',key:'id'},
          {width:'300',title:'关联单位名称',category:'',key:'otherUnit'},
        ],
        tableTipInfo:[],
        currentControl:'',
      }
    },
    created () {

    },
    methods:{
      openInvoice(item){
        this.$dialog.OpenWindow({
          width: 650,
          height: 400,
          url:'/openInvoiceNum?unitID='+item.unitID,
          title:'查看待开票详情',
          closeCallBack:(data) =>{
          }
        })
      },
      tableTipClick(item,title){
        this.$dialog.OpenWindow({
          width: 1050,
          height: 800,
          url:'/invoiceRiseView?id='+item.id,
          title:'查看发票抬头信息',
          closeCallBack:(data) =>{

          }
        })
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
        if(item.invoiceUnit.length > 0){
          document.addEventListener('mouseover', this.moveToSmallTable)
        }
      },
      /* 小标格显示 */
      tableTipShowEvent(item,control){
        if(item.invoiceUnit.length > 0) {
          this.tableTipInfo = item.invoiceUnit
          this.tableTipControl = control
          this.currentControl = control
          this.tableTip = true
        }else{
          this.currentControl = null
          this.tableTip = false
        }
      },
      generateCodePng(){
        this.ajaxJson({
          url: '/finance/tax/generateCodePng',
          call: (data) => {

          }
        })
      },
      sendOutOtherPerson(item){
        this.$dialog.OpenWindow({
          width: 950,
          height: 692,
          url: '/selectPerson?category=0&categoryBefore=1&selectType=1',
          title: '选择需要发送的用户',
          closeCallBack: (data) => {
            if (data) {
              let list=[]
              for (let i = 0; i < data.length; i++) {
                list.push({
                  id:data[0].id
                })
              }
              let params={
                id:item.id,
                list:list,
                accountBankString:item.accountBankString
              }
              this.ajaxJson({
                url: '/finance/tax/sendOutWx',
                data: params,
                call: (data) => {
                  if(data.type===0){
                    this.$dialog.alert({
                      tipValue: '发送成功',
                      closeCallBack: () => {
                      }
                    })
                  }else{
                    this.$dialog.alert({
                      tipValue: '发送失败',
                      closeCallBack: () => {
                      }
                    })
                  }
                }
              })
            }
          }
        })
      },
      sendOutMy(item){
        let list=[]
        list.push({
          id:sessionStorage.getItem('____currentUserID')
        })
        let params={
          id:item.id,
          list:list,
          accountBankString:item.accountBankString
        }
        this.ajaxJson({
          url: '/finance/tax/sendOutWx',
          data: params,
          call: (data) => {
            if(data.type===0){
              this.$dialog.alert({
                tipValue: '提醒成功',
                closeCallBack: () => {
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
      },
      clickCopy(item){
        clearTimeout(this.times)//再次点击时关闭上次触发的定时器 防止多次执行
        let text = ''
        if(item.registerNumberType === '0'){
          text = "名称："+item.unit+"，纳税识别号："+item.taxNumber+"地址及电话："+item.registerAddress.replace("-","")+item.registerAddressDetailed+"  "+item.mailNumberTitle+"-"+item.mailNumber+" 开户行及账号："+item.accountBankString
        }else{
          text = "名称："+item.unit+"，纳税识别号："+item.taxNumber+"地址及电话："+item.registerAddress.replace("-","")+item.registerAddressDetailed+"  "+item.mailNumber+" 开户行及账号："+item.accountBankString
        }
        this.$copyText(text).then(res=>{
          this.text = text
          this.isCopyTip =  true
          let that = this
          this.times = window.setTimeout(()=>{//将定时器的id存入变量
            that.isCopyTip =  false
          },4500)
        },err=>{

        })
      },
      add(){
        this.$dialog.OpenWindow({
          width: 1050,
          height: 820,
          url:'/taxFrom',
          title:'添加税号信息',
          closeCallBack:(data) =>{
            if(data){
              this.initPageData(false)
            }
          }
        })
      },
      listView(item){
        this.$dialog.OpenWindow({
          width: 1050,
          height: 820,
          url:'/taxView?id='+item.id,
          title:'查看税号',
          closeCallBack:(data) =>{

          }
        })
      },
      initPageData (initValue) {
        let params = {}
        if (initValue) {
          // 页面初始化是需要的参数
          params = {
            init:true,
          }
        } else {
          // 页面非初始化时需要的参数
          params = {
            companyCategory:this.companyCategoryPsd.value,
            category:this.categoryPsd.value
          }
        }
        this.init({
          initValue: initValue,
          url:'/finance/tax/getManager',
          data: params,
          all: (data) => {
            // 不管是不是初始化都需要执行的代码
          },
          init: (data) => {
            this.companyCategoryPsd=data.companyCategoryPsd
            this.categoryPsd=data.categoryPsd
          }
        })
      },
    }
  }
</script>

<style scoped>

  /* 复制提示内容 */
  .copyTip {
    position: fixed;
    top: 90px;
    z-index: 9999;
    background-color: #fff;
    color: black;
    padding: 16px;
    left: 0;
    right: 0;
    margin: auto;
    width: max-content;
    border-radius: 4px;
    font-size: 14px;
  }
</style>
