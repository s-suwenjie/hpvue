<template>
    <div>
      <yhm-managerpage>
        <!--导航条-->
        <template #navigation>业务管理&nbsp;&gt;&nbsp;库存管理&nbsp;&gt;&nbsp;库存信息</template>

        <!--操作区-->
        <template #operate>
          <yhm-commonbutton :value="choose?'收起筛选':'展开筛选'" :icon="choose?'btnUp':'btnDown'" @call="switchChoose()"></yhm-commonbutton>
          <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initData"></yhm-managersearch>
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
          <yhm-managerth title="商品型号"></yhm-managerth>
          <yhm-managerth title="销售价"></yhm-managerth>
          <yhm-managerth title="销售总价"></yhm-managerth>
          <yhm-managerth title="采购单价"></yhm-managerth>
          <yhm-managerth title="采购总价"></yhm-managerth>
          <yhm-managerth title="商品类型"></yhm-managerth>
          <yhm-managerth title="规格型号"></yhm-managerth>
          <yhm-managerth title="数量" value="quantity"></yhm-managerth>
          <yhm-managerth style="width: 100px;" title="是否可拆分"></yhm-managerth>
          <yhm-managerth title="拆分后数量" value="quantity"></yhm-managerth>
          <yhm-managerth style="width: 70px;" title="修改"></yhm-managerth>

        </template>
        <template #listBody>
          <tr :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]" v-for="(item,index) in content" :key="index">
            <yhm-manager-td-checkbox :value="item"></yhm-manager-td-checkbox>
            <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>
            <yhm-manager-td :value="item.product"></yhm-manager-td>
            <yhm-manager-td :value="item.model"></yhm-manager-td>
            <yhm-manager-td-money :value="item.salesprice+''"></yhm-manager-td-money><!--销售价-->
            <yhm-manager-td-money :value="item.saletotal+''"></yhm-manager-td-money><!--销售总价-->
            <yhm-manager-td-money :value="item.price"></yhm-manager-td-money>
            <yhm-manager-td-money :value="item.total"></yhm-manager-td-money>
            <yhm-manager-td :value="item.category"></yhm-manager-td>
            <yhm-manager-td :value="item.applicableModels"></yhm-manager-td>
            <yhm-manager-td-rgt :value="item.quantity+item.uuStr+''" :color="item.quantity == 0 ? 'red' : '#333333'"></yhm-manager-td-rgt>
            <yhm-manager-td-center :value="item.spilt"></yhm-manager-td-center>
            <yhm-manager-td-rgt :value="item.sumStr+item.mdoStr"></yhm-manager-td-rgt>
            <yhm-manager-td :value="'修改'" @click="modify(item)" color="blue"></yhm-manager-td>

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
      }
    },
    methods:{
      ///stock/stockoutdetail/initForm

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
            // 不管是不是初始化都需要执行的代码
            for( let i in data.content){
              if(this.content[i].spilt == 0){
                this.content[i].spilt='是'
              }else{
                this.content[i].spilt='否'
                this.content[i].sumStr='---'
                this.content[i].mdoStr='---'
              }
              this.content[i].category=data.categoryPsd.list[this.content[i].category].showName
              this.content[i].applicableModels=data.applicableModelsPsd.list[this.content[i].applicableModels].showName

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
