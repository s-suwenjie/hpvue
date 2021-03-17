<template>
  <div>
    <yhm-managerpage category="1" :total-table="true">
      <!--导航条-->
      <!--<template #navigation>财务管理&nbsp;&gt;&nbsp;票据&nbsp;&gt;&nbsp;发票管理</template>-->
      <!--导航条-->

      <template #navigationTab>
        <router-link class="menuTabDiv menuTabActive" :to="{path:'/home/invoiceTilingManager'}">库存发票</router-link>
        <router-link class="menuTabDiv" :to="{path:'/home/openInvoiceFinManager'}">开票通知</router-link>
        <router-link class="menuTabDiv" :to="{path:'/home/openInvoiceManagerAll'}">开票审批中</router-link>
      </template>
      <template #navigationLft>
        <div @mouseover="tipChange(index)" @mouseout="tipOut" style="margin: 0;position: relative;"  v-for="(item,index) in routerList" :key="index">
          <router-link tag="div" :class="item.class" style="margin: 0;" class="tip" :to="item.path">
            <div  class="cbl_main_prompt2 tipShow ">
              <div class="cbl_main_prompt_content " style="font-size:13px;padding: 0 12px;">
                {{tipValue}}
                <img src="/UploadFile/m_image/arrow.png">
              </div>
            </div>
          </router-link>
        </div>
      </template>
      <!--操作区-->
      <template #operate>
        <yhm-commonbutton value="入库" icon="btnAdd" :flicker="true" @call="add"></yhm-commonbutton>
        <yhm-commonbutton :value="choose?'收起筛选':'展开筛选'"  :icon="choose?'btnUp':'btnDown'" @call="switchChoose()"></yhm-commonbutton>
        <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initData"></yhm-managersearch>
      </template>
      <!--筛选区-->
      <template #choose>
        <div v-show="choose" class="buttonBody mptZero">
          <yhm-radiofilter :before="stateBefore" @initData="initChoose('state')" title="发票状态" :content="listState"></yhm-radiofilter>
          <yhm-radiofilter :before="invoiceCategoryBefore" @initData="initChoose('invoiceCategory')" title="发票类型" :content="listInvoiceCategory"></yhm-radiofilter>
          <yhm-radiofilter :before="maxValueBefore" @initData="initChoose('maxValue')" title="发票面值" :content="listMaxValue"></yhm-radiofilter>

        </div>
      </template>
      <template #tiled>
          <div style="margin: 10px;display: flex;flex-direction: row; flex-wrap: wrap;">
            <yhm-view-list-block v-for="(item,index) in content" :key="index"  @VIewEvent="viewClickEvent"  @call="rightMenuEvent" :item="item" :menu="menu" :psd="psd" :menu-category="item.state" :category-value="item.maxValue" :category="item.maxValue" :code="item.code"  :color="getPsdSelectItemColor(stateList,item.state)" >
              <yhm-view-psd :psd="maxValueList" :value="item.maxValue" style="margin-right: 6px;"></yhm-view-psd>
              <yhm-view-psd :psd="stateList" :value="item.state"></yhm-view-psd>
            </yhm-view-list-block>
          </div>
      </template>
      <!--数据空提示-->
      <template #tillingEmpty v-if="!isTilingEmpty">
        <div class="tilingEmpty">
          <p class="tilingIcon i-warn"></p>
          <p>暂时没有数据</p>
        </div>
      </template>

      <!-- 分页控件 -->
      <template #pager v-if="isTilingEmpty">
        <yhm-pagination :pager="pager" @initData="initPageData(false)"></yhm-pagination>
      </template>
      <template #colorTip v-if="isTilingEmpty">
        <yhm-manager-color-tip :psd="stateList" before-tip="代表" before-color="#888"></yhm-manager-color-tip>
      </template>

      <template #listTotalHead v-if="isTilingEmpty">
        <yhm-managerth style="width: 100px;" before-color="#a40b81" before-title="入库" title="总张数"></yhm-managerth>
        <yhm-managerth style="width: 100px;" before-color="#009788" before-title="可用 " title="张数" ></yhm-managerth>
        <yhm-managerth style="width: 100px;" before-color="#28979c" before-title="已使用 " title="张数"></yhm-managerth>
        <yhm-managerth style="width: 100px;" before-color="#d45702" before-title="已作废" title="张数"></yhm-managerth>
      </template>
      <template #listTotalBody v-if="isTilingEmpty">
        <tr v-for="(item,index) in total" :key="index">
          <yhm-manager-td-rgt :value="item.sumCount"></yhm-manager-td-rgt>
          <yhm-manager-td-rgt :value="item.countState0" @click="stateClick('0')"></yhm-manager-td-rgt>
          <yhm-manager-td-rgt :value="item.countState1" @click="stateClick('1')"></yhm-manager-td-rgt>
          <yhm-manager-td-rgt :value="item.countState2" @click="stateClick('2')"></yhm-manager-td-rgt>
        </tr>
      </template>
    </yhm-managerpage>

  </div>
</template>

<script>
  import { managermixin } from '@/assets/manager.js'
  export default {
    name: 'invoiceTilingManager',
    mixins: [managermixin],
    data(){
      return{
        state:'',
        bankLogo:'',
        category:'',
        empty:true,
        isTilingEmpty:true,
        maxValue:'',
        total:'',
        checkTheType:'现金',
        stateBefore: '0', // 默认选择状态为可以选择，1为不可以选择
        listState: {
          value: '',
          list: []
        },
        tipValue:'',
        routerList:[
          {
            class:'i-homeCheck',
            path:'/home/invoiceWarehouManager'
          },
          {
            class:'i-tiling active',
            path:'/home/invoiceTilingManager'
          },
          {
            class:'i-expendCheck',
            path:'/home/invoiceListManager'
          },
        ],
        tipList:[
          ['入库操作'],
          ['平铺视图'],
          ['列表操作']
        ],
        invoiceCategoryBefore:'0',
        listInvoiceCategory:{
          value: '',
          list: []
        },
        maxValueBefore:'0',
        listMaxValue:{
          value: '',
          list: []
        },
        psd:[{
          num:'1',showName:'万元版',img:'aaa',code:'#FF0000'
        },{
          num:'3',showName:'百万元',img:'aaa',code:'#FF0000'
        },{
          num:'4',showName:'千万元',img:'aaa',code:'#00FF00'
        }],
        invoiceCategoryList: [],
        stateList:[],
        maxValueList:[],
        menu:[['作废发票'],['查看开票申请','作废发票','开红字发票'],['查看作废原因']],
        pager: {
          total: 0, // 总条数
          pageSize: 18, // 每页条数
          pageIndex: 1, // 当前页码
          selectCount: 0 // 选中条数
        }
      }
    },
    methods:{
      stateClick(state){
        this.listState.value=state
        this.initPageData (false)
      },
      add(id,state){
        let isAdd = false
        let title = '查看发票入库登记信息'
        if(!id){
          id = ''
          title = '添加发票入库登记信息'
          isAdd = true
        }
        this.$dialog.OpenWindow({
          width: '1050',
          height: '650',
          title: title,
          url: '/invoiceWarehouFrom?id=' + id + '&isInitType=' + this.isInitType + '&isState=' + state ,
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
      viewClickEvent(item){

        if (item.state === '0') {
          let params = {
            id: item.id,
            invoiceCategory: item.invoiceCategory
          }
          this.ajaxJson({
            url: '/Bill/firstInvoice',
            data: params,
            call: (data) => {
              if (data.type === 0) {
                this.$dialog.OpenWindow({
                  width: '1050',
                  height: '740',
                  title: '选择开票申请',
                  url: '/selectOpenInvoice?invoiceCategoryBefore=1&invoiceCategory=' + item.invoiceCategory,
                  closeCallBack: (data) => {
                    if (data) {
                      let url = ''
                      if (item.invoiceCategory === '2' && data.openInvoiceVehicleID !== '') {
                        url = '/openInvoiceTrialVehicle?ownerID=' + data.id + '&type=1&code=' + item.code + '&codeID=' + item.id
                      } else if (item.invoiceCategory === '3') {
                        url = '/openInvoiceTrial?ownerID=' + data.id + '&type=1&code=' + item.code + '&codeID=' + item.id
                      } else {
                        url = '/openInvoiceTrialOther?ownerID=' + data.id + '&type=1&code=' + item.code + '&codeID=' + item.id
                      }
                      this.$dialog.OpenWindow({
                        width: '1025',
                        height: '768',
                        title: '发票试算',
                        url: url,
                        closeCallBack: (data) => {
                          if (data) {
                            this.initPageData(false)
                          }
                        }
                      })
                    }
                  }
                })
              } else if (item.state === '1') {
                this.$dialog.OpenWindow({
                  width: '1025',
                  height: '768',
                  title: '查看开票信息',
                  url: '/openInvoiceTrial?ownerID=' + item.id + '&type=1',
                  closeCallBack: (data) => {
                    if (data) {
                      this.initPageData(false)
                    }
                  }
                })
              } else {
                this.$dialog.alert({
                  width: '300',
                  alertImg: 'warn',
                  tipValue: '请选用本类型最小号发票'
                })
              }
            }
          })
        }else{
          if(item.url !== ''){
            window.open('/UploadFile/'+item.url)
          }else{
            this.$dialog.alert({
              width: '300',
              alertImg: 'warn',
              tipValue: '请选择在库发票'
            })
          }
        }
      },
      tipChange(index){
        this.tipValue=this.tipList[index][0]
        $('.tipShow').eq(index).css({'display':'block'})
      },
      tipOut(){
        $('.tipShow').css('display','none')
      },
      rightMenuEvent(category,item){
        if(category === '作废发票'){
          if(item.otherID === ''){
            this.$dialog.OpenWindow({
              width: '1050',
              height: '550',
              title: '作废发票',
              url: '/toVoidInvoice?id=' + item.id +'&op=0',
              closeCallBack: (data)=>{
                if(data){
                  this.initPageData(false)
                }
              }
            })
          }else if(item.otherID !== ''&&item.otherType === '1'){
            this.$dialog.OpenWindow({
              width: '1025',
              height: '480',
              title: '作废发票',
              url:'/openInvoiceToVoid?ownerID='+item.otherID+'&type=0',
              closeCallBack: (data)=>{
                if(data){
                  this.initPageData(false)
                }
              }
            })
          }
        }else if(category === '查看开票申请'){
          if(item.otherID!==''&&item.otherType==='1'){
            this.$dialog.OpenWindow({
              width: '1050',
              height: '790',
              title: '查看开票信息',
              url:'/openInvoiceView?id='+item.otherID +'&type=0',
              closeCallBack: (data)=>{
                if(data){
                  this.initPageData(false)
                }
              }
            })
          }
        }else if(category === '查看作废原因'){
          this.$dialog.OpenWindow({
            width: '1050',
            height: '690',
            title: '查看作废原因',
            url: '/toVoidInvoice?id=' + item.id + '&op=1',
            closeCallBack: (data)=>{
              if(data){
                this.initPageData(false)
              }
            }
          })
        }else if(category === '开红字发票'){
          alert('暂时未开放')
        }
      },

      initPageData (initValue) {
        let params = {}

        if (initValue) {
          params = {
            orderColumn:'code',
            order:'asc',
            state: '0'
          }
        } else {
          params = {
            state: this.listState.value,
            invoiceCategory:this.listInvoiceCategory.value,
            maxValue:this.listMaxValue.value,
            orderColumn:'code',
            order:'asc'
          }
        }
        this.init({
          initValue: initValue,
          url: '/Bill/invoiceDetailManagerData',
          data: params,
          all: (data) => {
            //不管是不是初始化都需要执行的代码
            this.content = data.content
            this.total = data.total
          },
          init: (data) => {
            //初始化时需要执行的代码
            // 这边初始化筛选信息
            this.listState = data.statePsd
            this.listInvoiceCategory = data.invoiceCategoryPsd
            this.stateList = data.statePsd.list
            this.invoiceCategoryList = data.invoiceCategoryPsd.list
            this.listMaxValue = data.maxValuePsd
            this.maxValueList = data.maxValuePsd.list

          }
        })
      }
    },
    created () {
    },
    watch:{
      content(){
        if(this.content.length!==0){
          this.isTilingEmpty =  true
        } else {
          this.isTilingEmpty = false

        }
      }
    }
  }
</script>

<style scoped lang="less">
  .tipShow{display: none;width: 100px}
.tip::before{
  font-size: 24px;
}
  .tip{
    padding: 0 5px;
  }
</style>
