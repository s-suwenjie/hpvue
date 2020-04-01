<template>
  <div>
    <yhm-managerpage :total-table="true" :total-rgt="true">
      <!--导航条-->
      <template #navigation>财务管理&nbsp;&gt;&nbsp;票据&nbsp;&gt;&nbsp;发票管理</template>

      <template #navigationLft>
        <div @mouseover="tipChange(index)" @mouseout="tipOut" style="margin: 0;position: relative;"  v-for="(item,index) in routerList" :key="index">
          <router-link tag="div" :class="item.class" style="margin: 0;" class="tip" :to="item.path">
            <div  class="cbl_main_prompt2 tipShow">
              <div class="cbl_main_prompt_content" style="font-size:13px;padding: 0 12px;">
                {{tipValue}}
                <img src="/UploadFile/m_image/arrow.png">
              </div>
            </div>
          </router-link>
        </div>
      </template>
      <!--操作区-->
      <template #operate>
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
        <yhm-managerth style="width: 100px;" before-color="#a40b81" before-title="总 " title="张数"></yhm-managerth>
        <yhm-managerth style="width: 100px;" before-color="#009788" before-title="在库 " title="张数" ></yhm-managerth>
        <yhm-managerth style="width: 100px;" before-color="#28979c" before-title="已使用 " title="张数"></yhm-managerth>
        <yhm-managerth style="width: 100px;" before-color="#d45702" before-title="已开具 " title="张数"></yhm-managerth>
      </template>
      <template #listTotalBody v-if="isTilingEmpty">
        <tr v-for="(item,index) in total" :key="index">
          <yhm-manager-td-rgt :value="item.sumCount"></yhm-manager-td-rgt>
          <yhm-manager-td-rgt :value="item.countState0"></yhm-manager-td-rgt>
          <yhm-manager-td-rgt :value="item.countState1"></yhm-manager-td-rgt>
          <yhm-manager-td-rgt :value="item.countState2"></yhm-manager-td-rgt>
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
          num:'3',showName:'百万元',img:'aaa',code:'#FF0000'
        },{
          num:'4',showName:'千万元',img:'aaa',code:'#00FF00'
        }],
        invoiceCategoryList: [],
        stateList:[],
        maxValueList:[],
        menu:[['作废发票']],
        pager: {
          total: 0, // 总条数
          pageSize: 18, // 每页条数
          pageIndex: 1, // 当前页码
          selectCount: 0 // 选中条数
        }
      }
    },
    methods:{
      viewClickEvent(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '450',
          title: '查看发票基本信息',
          url: '/invoiceView?id=' + item.id,
          closeCallBack: (data)=>{
            if(data){
            }
          }
        })
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
        }
      },

      initPageData (initValue) {
        let params = {}

        if (initValue) {
          params = {}
        } else {
          params = {
            state: this.listState.value,
            invoiceCategory:this.listInvoiceCategory.value,
            maxValue:this.listMaxValue.value

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
</style>
