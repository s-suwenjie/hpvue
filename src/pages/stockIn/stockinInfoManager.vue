<template>
    <div>
      <yhm-managerpage>
        <!--导航条-->
        <template #navigation>业务管理&nbsp;&gt;&nbsp;库存管理&nbsp;&gt;&nbsp;库存信息</template>

        <!--操作区-->
        <template #operate>
          <yhm-commonbutton :value="choose?'收起筛选':'展开筛选'" :icon="choose?'btnUp':'btnDown'" @call="switchChoose()"></yhm-commonbutton>
          <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initData"></yhm-managersearch>
          <yhm-radiofilter  @initData="initChoose('inAndOut')" all="0" title="物品进出价" :content="inAndOut"></yhm-radiofilter>
        </template>
        <!--筛选区-->
        <template #choose>
          <div v-show="choose" class="buttonBody mptZero">
            <yhm-radiofilter @initData="initChoose('categoryUnit')" title="商品类型"  :content="categoryPsd"></yhm-radiofilter>
            <yhm-radiofilter @initData="initChoose('applicableModels')" title="规格型号" :content="applicableModelsPsd"></yhm-radiofilter>
            <yhm-radiofilter @initData="initChoose('state')" title="商品数量" :content="state"></yhm-radiofilter>
          </div>
        </template>
        <!--数据表头-->
        <template #listHead>
          <yhm-managerth style="width: 40px;" title="选择"></yhm-managerth>
          <yhm-managerth style="width: 40px;" title="查看"></yhm-managerth>
          <yhm-managerth title="商品名称" ></yhm-managerth>
          <yhm-managerth title="规格型号"></yhm-managerth>
          <yhm-managerth width="110" title="数量" value="quantity"></yhm-managerth>
          <yhm-managerth width="120" style="color: #FF0000" v-if="isinAndOut" title="销售价"></yhm-managerth>
          <yhm-managerth width="120" style="color: #C76828" v-else title="采购单价"></yhm-managerth>
          <yhm-managerth width="120" style="color: #FF0000" v-if="isinAndOut" title="销售总价"></yhm-managerth>
          <yhm-managerth width="120" style="color: #C76828" v-else title="采购总价"></yhm-managerth>
          <yhm-managerth width="130" title="商品类型"></yhm-managerth>
          <yhm-managerth width="130" title="规格型号"></yhm-managerth>
          <yhm-managerth width="100" title="是否可拆分"></yhm-managerth>
          <yhm-managerth width="100" title="拆分后数量"></yhm-managerth>
          <yhm-managerth width="130" title="修改"></yhm-managerth>

        </template>
        <template #listBody>
          <tr :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]" v-for="(item,index) in content" :key="index">
            <yhm-manager-td-checkbox :value="item"></yhm-manager-td-checkbox>
            <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>
            <yhm-manager-td @click="productClick(item)" :value="item.product"></yhm-manager-td>
            <yhm-manager-td :value="item.model"></yhm-manager-td>
            <yhm-manager-td-rgt :value="item.quantity+item.uuStr+''" :style="{'color':item.quantity == 0 ? 'red' : '#333333'}"></yhm-manager-td-rgt>
            <yhm-manager-td-money  v-if="isinAndOut" :value="item.salesprice+''"></yhm-manager-td-money><!--销售价-->
            <yhm-manager-td-money v-else :value="item.price"></yhm-manager-td-money>
            <yhm-manager-td-money v-if="isinAndOut" :value="item.saletotal+''"></yhm-manager-td-money><!--销售总价-->
            <yhm-manager-td-money v-else :value="item.total"></yhm-manager-td-money>
            <yhm-manager-td-psd :value="item.category" :list="categoryPsd.list"></yhm-manager-td-psd>
            <yhm-manager-td-psd :value="item.applicableModels" :list="applicableModelsPsd.list"></yhm-manager-td-psd>

            <yhm-manager-td-center :value="item.split"></yhm-manager-td-center>
            <yhm-manager-td-rgt :value="item.sumStr+item.mdoStr"></yhm-manager-td-rgt>
<!--            <yhm-manager-td :value="'修改'" @click="modify(item)" color="blue"></yhm-manager-td>-->
            <yhm-manager-td-operate>
              <yhm-manager-td-operate-button value="操作" @click="operation(item)" icon="i-btn-applicationSm" color="#8e08e3"></yhm-manager-td-operate-button>
              <yhm-manager-td-operate-button value="修改" @click="modify(item)" icon="i-btn-applicationSm" color="#be08e3"></yhm-manager-td-operate-button>
            </yhm-manager-td-operate>
          </tr>
        </template>
        <template #total >
          <div class="listTotalCrente m_list w418">
            <div class="listTotalLeft">
              <span class="test"></span>
              <span class="test">金额</span>
              <span class="test">条数</span>
            </div>
            <table width="100%" cellpadding="0" cellspacing="0" class="m_content_table m_content_total_table">
              <thead>
              <tr>
                <!--<yhm-managerth style="width: 100px;" before-color="black" title="" before-title="总数" ></yhm-managerth>-->
                <yhm-managerth v-if="!isinAndOut" style="width: 100px;" before-color="#49a9ea" title="" before-title="采购总价" ></yhm-managerth>
                <yhm-managerth v-else style="width: 100px;" before-color="#FF0000" title="" before-title="出售总价" ></yhm-managerth>
              </tr>
              </thead>
              <tbody>
              <tr>
                <yhm-manager-td-money v-if="!isinAndOut" :value="totalSum"></yhm-manager-td-money>
                <yhm-manager-td-money  v-else :value="saletotalSum"></yhm-manager-td-money>
              </tr>
              <tr>
                <yhm-manager-td-rgt style="font-size: 16px"   :value="count"></yhm-manager-td-rgt>
              </tr>
              </tbody>
            </table>
          </div>
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
  import { managermixin } from '@/assets/manager.js'
  export default {
    name: 'stockinInfoManager',
    mixins: [managermixin],
    data(){
      return{
        searchStr:'',
        content:[],
        lastData:'',
        categoryPsd:[],
        applicableModelsPsd:[],
        isinAndOut:false,
        inAndOut:{
          value:'0',
          list:[
            {
              code:'#C76828',
              img:'',
              num:'0',
              showName:'进价'
            },
            {
              code:'#FF0000',
              img:'',
              num:'1',
              showName:'出价'
            },
          ]
        },
        state:{
          value:'',
          list:[
            {
              code:'',
              img:'',
              num:'2',
              showName:'有库存'
            },
            {
              code:'',
              img:'',
              num:'1',
              showName:'无库存'
            },
          ]
        },
        count:'',
        totalSum:'',
        saletotalSum:'',
      }
    },
    methods:{
      operation(item){

      },
      ///stock/stockoutdetail/initForm
      productClick(item){
        this.$dialog.OpenWindow({
          width: 1050,
          height: 720,
          url:'/productForm?id=' + item.productID,
          title:'查看库存信息',
          closeCallBack:(data) =>{
            if (data) {
              this.initPageData(false)
            }
          }
        })
      },
      // 筛选事件
      initChoose (op) {
        if (this.inAndOut.value==0){
          this.isinAndOut=false
        }else {
          this.isinAndOut=true
        }
        if (op === 'categoryUnit') {
          this.selectValue = []
        }
        if (op === 'applicableModels') {
          this.selectValue = []
        } if (op === 'state') {
          this.selectValue = []
        }
        this.initPageData(false)

      },
      listView(item){
          this.$dialog.OpenWindow({
            width: 1050,
            height: 720,
            url:'/stockinInfoView?id=' + item.id,
            title:'查看库存信息',
            closeCallBack:(data) =>{
              if (data) {
                this.initPageData(false)
              }
            }
          })
      },

      initPageData (initValue) {
        let params = {}
        if (initValue) {
          // 页面初始化是需要的参数
          params = {

          }
        } else {
          // 页面非初始化时需要的参数
          params = {
            // init: false,
            number: this.state.value,
            searchStr:this.searchStr,
            category:this.categoryPsd.value,
            applicableModels:this.applicableModelsPsd.value
          }
          //console
        }
        this.init({
          initValue: initValue,
          url: '/stock/stockPosition/queryForProduct',
          ///stockPosition/StockUpdate
          data: params,
          all: (data) => {
            this.content=data.content
            this.totalSum=data.totalSum
            this.count=data.count
            this.saletotalSum=data.saletotalSum
            // 不管是不是初始化都需要执行的代码
            for( let i in data.content){
              if(this.content[i].split == 0){
                this.content[i].split='是'
              }else{
                this.content[i].split='否'
                this.content[i].sumStr='---'
                this.content[i].mdoStr='---'
              }
              // this.content[i].category=data.categoryPsd.list[this.content[i].category].showName
              // this.content[i].applicableModels=data.applicableModelsPsd.list[this.content[i].applicableModels].showName

            }
          },
          init: (data) => {
            // 初始化时需要执行的代码
            // 这边初始化筛选信息
            this.content=data.content
            this.categoryPsd=data.categoryPsd
            this.applicableModelsPsd=data.applicableModelsPsd
          }
        })
      },
    //  修改.....----------
      modify(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '720',
          url:'/stockInModifyView?id=' + item.id,
          title:'修改售价信息',
          closeCallBack:(data) =>{
            this.initPageData(false)
          }
        })
      },
    }
  }
</script>

<style scoped>

</style>
