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
        <yhm-commonbutton value="批量作废" icon="btnAdd" :flicker="true" @call="toVoidMore()" category="one"></yhm-commonbutton>
        <yhm-commonbutton :value="choose?'收起筛选':'展开筛选'"  :icon="choose?'btnUp':'btnDown'" @call="switchChoose()"></yhm-commonbutton>
        <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initData"></yhm-managersearch>
      </template>
      <!--筛选区-->
      <template #choose>
        <div v-show="choose" class="buttonBody mptZero">
          <yhm-radiofilter :before="invoiceCategoryBefore" @initData="initChoose('state')" title="发票类型" :content="invoiceCategoryPsd"></yhm-radiofilter>
          <yhm-radiofilter :before="stateBefore" @initData="initChoose('state')" title="发票状态" :content="statePsd"></yhm-radiofilter>
          <yhm-radiofilter :before="maxValueBefore" @initData="initChoose('maxValue')" title="发票面值" :content="maxValuePsd"></yhm-radiofilter>
        </div>
      </template>
      <template #listHead>
        <yhm-managerth style="width: 38px;" title="选择"></yhm-managerth>
        <yhm-managerth style="width: 50px;" title="查看"></yhm-managerth>
        <yhm-managerth style="width: 170px;" title="发票种类" value="invoiceCategory"></yhm-managerth>
        <yhm-managerth style="width: 170px;" title="所属单位" value="unit"></yhm-managerth>
        <yhm-managerth style="width: 120px;" title="最大开具金额" value="maxValue"></yhm-managerth>
        <yhm-managerth style="width: 180px;" title="发票号码" value="code"></yhm-managerth>
        <yhm-managerth style="width: 80px;" title="状态" value="state"></yhm-managerth>
        <yhm-managerth  title="操作" value=""></yhm-managerth>
      </template>
      <template #listBody>
        <tr v-for="(item,index) in content" :key="index" :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]">
          <yhm-manager-td-checkbox :value="item"></yhm-manager-td-checkbox>
          <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>
          <yhm-manager-td-psd :value="item.invoiceCategory" :list="invoiceCategoryList" ></yhm-manager-td-psd>
          <yhm-manager-td :value="item.unit"></yhm-manager-td>
          <yhm-manager-td-psd :value="item.maxValue" :list="maxValueList" ></yhm-manager-td-psd>
          <yhm-manager-td-center :value="item.code"></yhm-manager-td-center>
          <yhm-manager-td-psd :value="item.state" :list="stateList" ></yhm-manager-td-psd>
          <yhm-manager-td-operate>
            <yhm-manager-td-operate-button :no-click="item.state === '0'||item.state === '2'" @click="invoiceTrial(item)" value="查看发票信息" color="#49a9ea"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button :no-click="item.state === '1'||item.state === '2'" @click="toVoid(item,0)" value="作废" color="#49a9ea"></yhm-manager-td-operate-button>
            <yhm-manager-td-operate-button :no-click="item.state === '1'||item.state === '0'" @click="toVoid(item,1)" value="作废原因" color="#49a9ea"></yhm-manager-td-operate-button>
          </yhm-manager-td-operate>
        </tr>
      </template>
      <!--数据空提示-->
      <template #empty>
        <span class="m_listNoData" v-show="empty">暂时没有数据</span>
      </template>
      <template #listTotalHead>
        <yhm-managerth style="width: 100px;" before-color="#a40b81" before-title="总 " title="张数"></yhm-managerth>
        <yhm-managerth style="width: 100px;" before-color="#009788" before-title="可用 " title="张数"></yhm-managerth>
        <yhm-managerth style="width: 100px;" before-color="#999" before-title="作废 " title="张数"></yhm-managerth>
        <yhm-managerth style="width: 100px;" before-color="#d45702" before-title="已开具 " title="张数"></yhm-managerth>
      </template>
      <template #listTotalBody>
        <tr v-for="(item,index) in contentTotal" :key="index">
          <yhm-manager-td-rgt :value="item.sumCount"></yhm-manager-td-rgt>
          <yhm-manager-td-rgt :value="item.countState0"></yhm-manager-td-rgt>
          <yhm-manager-td-rgt :value="item.countState2"></yhm-manager-td-rgt>
          <yhm-manager-td-rgt :value="item.countState1"></yhm-manager-td-rgt>
        </tr>
      </template>
      <!--分页控件-->
      <template #pager>
        <yhm-pagination :pager="pager" @initData="initPageData(false)"></yhm-pagination>
      </template>
      <!--数据空提示-->
      <template #empty>
        <span class="m_listNoData" v-show="empty">暂时没有数据</span>
      </template>

    </yhm-managerpage>
  </div>
</template>

<script>
  import { managermixin } from '@/assets/manager.js'
  export default {
    name: 'invoiceListManager',
    mixins: [managermixin],
    data(){
      return{
        invoiceCategoryList:[],
        stateList:[],
        maxValueList:[],
        contentTotal:[],
        invoiceCategoryBefore:'0',
        maxValueBefore:'0',
        stateBefore:'0',
        listID: '',
        tipValue:'',
        routerList:[
          {
            class:'i-homeCheck',
            path:'/home/invoiceWarehouManager'
          },
          {
            class:'i-tiling',
            path:'/home/invoiceTilingManager'
          },
          {
            class:'i-expendCheck active',
            path:'/home/invoiceListManager'
          },

        ],
        tipList:[
          ['入库操作'],
          ['平铺视图'],
          ['列表操作']
        ],
        invoiceCategoryPsd: {
          value: '',
          list: []
        },
        statePsd: {
          value: '',
            list: []
        },
        maxValuePsd: {
          value: '',
          list: []
        },
      }
    },
    methods:{
      invoiceTrial(item){
        this.$dialog.OpenWindow({
          width: '1025',
          height: '768',
          title: '发票试算',
          url:'/openInvoiceTrial?ownerID='+item.id +'&type=1',
          closeCallBack: (data)=>{
            if(data){
              this.initPageData(false)
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
      /* 查看发票 */
      listView(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '500',
          title: '查看发票基础信息',
          url: '/invoiceView?id=' + item.id,
          closeCallBack: ()=>{

          }
        })
      },
      /* 作废 */
      toVoid(item,op){
        let title = '作废发票'
        if(op === '1'){
          title = '作废原因'
        }
        this.$dialog.OpenWindow({
          width: '1050',
          height: '690',
          title: title,
          url: '/toVoidInvoice?id=' + item.id + '&op=' + op,
          closeCallBack: (data)=>{
            if(data){
              this.initPageData(false)
            }
          }

        })
      },
      /* 批量作废 */
      toVoidMore(){
        if(this.selectValue.length === 0){
          this.$dialog.alert({
            width: '350',
            alertImg: 'warn',
            tipValue: '没有选择数据,不能批量作废！！！'
          })
        }else{
          let arr = []
          for(let i = 0;i<this.selectValue.length; i++){
            let key = this.selectValue[i]
            arr += key + '☆'
          }
          if (arr.length > 0) {
            arr = arr.substr(0, arr.length - 1);
          }

          this.$dialog.OpenWindow({
            width: '1050',
            height: '690',
            title: '批量作废发票信息',
            url: '/toVoidInvoiceMore?id=' + arr,
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
            invoiceCategory:this.invoiceCategoryPsd.value,
            maxValue:this.maxValuePsd.value,
            state: this.statePsd.value
          }
        }
        this.init({
          initValue:initValue,
          url: '/Bill/invoiceDetailManagerData',
          data:params,
          all:(data) =>{
            //不管是不是初始化都需要执行的代码
            this.contentTotal = data.total
          },
          init:(data)=>{
            //初始化时需要执行的代码
            // 这边初始化筛选信息
            this.invoiceCategoryList=data.invoiceCategoryPsd.list
            this.stateList=data.statePsd.list
            this.maxValueList=data.maxValuePsd.list
            this.invoiceCategoryPsd=data.invoiceCategoryPsd
            this.statePsd=data.statePsd
            this.maxValuePsd=data.maxValuePsd
          }
        })
      },

    },
    created () {
    }
  }
</script>

<style scoped>
  .tipShow{display: none;width: 100px;}
</style>
