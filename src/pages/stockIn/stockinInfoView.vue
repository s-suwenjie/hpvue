<template>
    <div class="f_main">
      <yhm-view-body>
        <template #title>库存信息</template>
        <template #body>
          <yhm-view-control title="商品名称" :content="product"></yhm-view-control>
          <yhm-view-control title="规格型号" :content="model"></yhm-view-control>
          <yhm-view-control title="总数量" :content="quantity"></yhm-view-control>
          <yhm-view-control title="拆分总数量" :content="splitnum+''"></yhm-view-control>
        </template>
      </yhm-view-body>

      <div class="f_split" ></div>

      <yhm-view-tab>
        <template #tab>
          <yhm-view-tab-button :list="tabState" @click="mation(0)" :index="0">库存信息</yhm-view-tab-button>
          <yhm-view-tab-button :list="tabState" @click="mation(1)" :index="1">入库记录</yhm-view-tab-button>
        </template>
        <template #content>
        <yhm-view-tab-list :customize="true" v-show="tabState[0].select">
          <template #listHead>
            <yhm-managerth  title="商品名称"></yhm-managerth>
            <yhm-managerth  title="商品型号"></yhm-managerth>
            <yhm-managerth style="width: 80px" title="商品数量"></yhm-managerth>
            <yhm-managerth style="width: 80px" title="单位"></yhm-managerth>
            <yhm-managerth style="width: 80px" title="能否拆分"></yhm-managerth>
            <yhm-managerth style="width: 80px" title="拆分后数量"></yhm-managerth>
            <yhm-managerth style="width: 80px" title="拆分单位"></yhm-managerth>
            <yhm-managerth style="width: 120px" title="库位名称"></yhm-managerth>

          </template>
          <template #listBody>
            <tr v-for="(item,index) in content" :key="index" :class="{InterlacBg:index%2!=0}" >
              <yhm-manager-td :value="item.product"></yhm-manager-td>
              <yhm-manager-td :value="item.model"></yhm-manager-td>
              <yhm-manager-td-rgt :value="item.quantity+''"></yhm-manager-td-rgt>
              <yhm-manager-td :value="item.uuStr"></yhm-manager-td>
              <yhm-manager-td-center :value="item.split+''"></yhm-manager-td-center>
              <yhm-manager-td-rgt :value="item.sumStr+''"></yhm-manager-td-rgt>
              <yhm-manager-td :value="item.mdoStr+''"></yhm-manager-td>
              <yhm-manager-td :value="item.stockPosition"></yhm-manager-td>
            </tr>
          </template>
          <template #pager>
            <yhm-pagination :pager="pager" is-page-size="false" @initData="listDetail(false)"></yhm-pagination>
          </template>
          <template #empty>
            <span class="m_listNoData" v-show="content.length === 0">暂时没有数据</span>
          </template>
        </yhm-view-tab-list>

        <yhm-view-tab-list :customize="true" v-show="tabState[1].select">
          <template #listHead>
            <yhm-managerth title="商品名称"></yhm-managerth>
            <yhm-managerth title="商品规格"></yhm-managerth>
            <yhm-managerth title="入库日期"></yhm-managerth>
            <yhm-managerth style="width: 80px" title="商品数量"></yhm-managerth>
            <yhm-managerth style="width: 120px" title="单价"></yhm-managerth>
            <yhm-managerth style="width: 120px" title="总价"></yhm-managerth>
            <yhm-managerth style="width: 120px" title="含税单价"></yhm-managerth>
            <yhm-managerth style="width: 120px" title="含税总价"></yhm-managerth>
          </template>
          <template #listBody>
            <tr v-for="(item,index) in contents" :class="{InterlacBg:index%2!=0}" :key="index">
              <yhm-manager-td :value="item.product"></yhm-manager-td>
              <yhm-manager-td :value="item.model"></yhm-manager-td>
              <yhm-manager-td :value="item.time"></yhm-manager-td>
              <yhm-manager-td-rgt :value="item.quantity+item.uuStr+''"></yhm-manager-td-rgt>
              <yhm-manager-td-money :value="item.price+''"></yhm-manager-td-money>
              <yhm-manager-td-money :value="item.totalPrice+''"></yhm-manager-td-money>
              <yhm-manager-td-money :value="item.priceTax+''"></yhm-manager-td-money>
              <yhm-manager-td-money :value="item.totalPriceTax+''"></yhm-manager-td-money>
            </tr>
          </template>
          <template #pager>
            <yhm-pagination :pager="pager" is-page-size="false" :is-select-info="false" @initData="listrecord()"></yhm-pagination>
          </template>
          <template #empty>
            <span class="m_listNoData" v-show="contents.length === 0">暂时没有数据</span>
          </template>
        </yhm-view-tab-list>

      </template>
    </yhm-view-tab>

    </div>
</template>

<script>
  import { viewmixin } from '@/assets/view.js'
  export default {
    name: 'stockinInfoView',
    mixins: [viewmixin],
    data(){
      return{
        tabState:[{select:true},{select:false}],
        model:'',
        product:'',
        content:'',
        quantity:'',
        splitnum:'',
        contents:[],
      }
    },
    methods:{
      listDetail(initValue){
        let params = {}
        if (initValue) {
          // 页面初始化是需要的参数
          params = {
            postid:this.id
          }
        } else {
          // 页面非初始化时需要的参数
          params = {
            postid:this.id,
            chaFlag:'1',
          }
        }
        this.ajaxJson({
          url: '/stock/stockPosition/queryForProduct',
          data: params,
          call: (data) => {
            this.content = data.content
            this.model = data.model
            this.product = data.product
            this.quantity = data.quantity+""
            for (let i in this.content) {
              if(this.content[i].split == 0 ){
                this.content[i].split ='是'
                this.splitnum=Number(this.splitnum) + Number(this.content[i].sumStr)
              }else{
                this.content[i].split ='否'
                this.content[i].sumStr='---'
                this.content[i].mdoStr='---'
              }
            }
          }
        })
      },
      mation(e){
        this.pager.pageIndex=1
        if(e==0){
          this.listDetail(false)
        }else {
          this.listrecord()
        }
      },
      listrecord(){
        let params={
          pageDetail: this.pager.pageIndex,
          // postid:this.id,
          category:this.content[0].category,
          applicableModels:this.content[0].applicableModels,
          productid:this.content[0].productID,
          modelid:this.content[0].modelID
        }

        this.ajaxJson({
          url: '/stock/stockPosition/queryForInrecord',
          data: params,
          call: (data) => {
            this.contents = data.content

          }
        })
      }

    },
    created () {
      this.setQuery2Value('id')
      this.listDetail()
    }
  }
</script>

<style scoped>








</style>
