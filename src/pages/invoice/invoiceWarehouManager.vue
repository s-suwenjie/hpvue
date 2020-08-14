<template>
  <div>
    <yhm-managerpage :total-table="true">
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
        <yhm-commonbutton value="入库" icon="btnAdd" :flicker="true" @call="add"></yhm-commonbutton>
        <yhm-commonbutton :value="choose?'收起筛选':'展开筛选'" :icon="choose?'btnUp':'btnDown'" @call="switchChoose()"></yhm-commonbutton>
        <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initData"></yhm-managersearch>
      </template>
      <!--筛选区-->
      <template #choose>
        <div v-show="choose" class="buttonBody mptZero">
          <yhm-radiofilter :before="stateBefore" @initData="initChoose('state')" title="发票状态" :content="listState"></yhm-radiofilter>
          <yhm-radiofilter :before="invoiceCategoryBefore" @initData="initChoose('invoiceCategory')" title="发票面值" :content="listinvoiceCategory"></yhm-radiofilter>
          <yhm-radiofilter :before="maxValueBefore" @initData="initChoose('maxValue')" title="发票类型" :content="listmaxValue"></yhm-radiofilter>
        </div>
      </template>

      <!--数据表头-->
      <template #listHead>
        <yhm-managerth style="width: 38px;" title="选择"></yhm-managerth>
        <yhm-managerth style="width: 38px;" title="查看"></yhm-managerth>
        <yhm-managerth title="所属单位" value="unit"></yhm-managerth>
        <yhm-managerth style="width: 120px;" title="发票种类" value="invoiceCategory"></yhm-managerth>
        <yhm-managerth style="width: 140px;" title="入库日期" value="workDate"></yhm-managerth>
        <yhm-managerth style="width: 120px;" title="最大开具金额" value="maxValue"></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="领取人员" value="operatorPerson"></yhm-managerth>
        <yhm-managerth style="width: 140px;" title="领取日期" value="operatorDate"></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="领取张数" value="addQuantity"></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="批次状态" value="state"></yhm-managerth>
        <yhm-managerth style="width: 70px;" title="操作"></yhm-managerth>
      </template>

      <!--数据明细-->
      <template #listBody>
        <tr v-for="(item,index) in content" :key="index" :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]">
          <yhm-manager-td-checkbox :value="item"></yhm-manager-td-checkbox>
          <yhm-manager-td-look @click="add(item.id,item.state)"></yhm-manager-td-look>
          <yhm-manager-td :value="item.unit"></yhm-manager-td>
          <yhm-manager-td-psd :value="item.invoiceCategory" :list="invoiceCategoryList"></yhm-manager-td-psd>
          <yhm-manager-td-date :value="item.workDate"></yhm-manager-td-date>
          <yhm-manager-td-psd :value="item.maxValue" :list="maxValueList"></yhm-manager-td-psd>
          <yhm-manager-td-center :value="item.operatorPerson"></yhm-manager-td-center>
          <yhm-manager-td-date :value="item.operatorDate"></yhm-manager-td-date>
          <yhm-manager-td-center :value="item.addQuantity"></yhm-manager-td-center>
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
        <yhm-managerth style="width: 100px;" before-color="#d45702" before-title="已开具 " title="张数"></yhm-managerth>
      </template>
      <template #listTotalBody>
        <tr v-for="(item,index) in contentTotal" :key="index">
          <yhm-manager-td-rgt :value="item.sumCount"></yhm-manager-td-rgt>
          <yhm-manager-td-rgt :value="item.count"></yhm-manager-td-rgt>
          <yhm-manager-td-rgt :value="item.countState0"></yhm-manager-td-rgt>
          <yhm-manager-td-rgt :value="item.countState1"></yhm-manager-td-rgt>
          <yhm-manager-td-rgt :value="item.countState2"></yhm-manager-td-rgt>
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
    name: 'invoiceWarehouManager',
    mixins: [managermixin],
    data(){
      return{
        listState: {
          value: '',
          list: []
        },
        listinvoiceCategory: {
          value: '',
          list: []
        },
        listmaxValue: {
          value: '',
          list: []
        },
        tipValue:'',
        routerList:[
          {
            class:'i-homeCheck active',
            path:'/home/invoiceWarehouManager'
          },
          {
            class:'i-tiling',
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
        invoiceCategoryBefore: '0',
        maxValueBefore: '0',
        stateBefore: '0',
        invoiceCategoryList: [],
        maxValueList: [],
        stateList: [],
        contentTotal: [],
        isInitType: '0'
      }
    },
    methods:{
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
              url: '/Bill/invoiceStockIn',
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

      initPageData(initValue){
        let params = {}

        if (initValue) {
          params = {

          }
        } else {
          params = {
            state: this.listState.value,
            invoiceCategory:this.listinvoiceCategory.value,
            maxValue:this.listmaxValue.value
          }
        }
        this.init({
          initValue:initValue,
          url: '/Bill/invoiceManagerData',
          data:params,
          all:(data) =>{
            this.contentTotal = data.total
          },
          init:(data)=>{
            this.listState = data.statePsd
            this.listinvoiceCategory = data.invoiceCategoryPsd
            this.listmaxValue = data.maxValuePsd
            this.invoiceCategoryList = data.invoiceCategoryPsd.list
            this.maxValueList = data.maxValuePsd.list
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
  .tipShow{display: none;width: 100px;}
</style>
