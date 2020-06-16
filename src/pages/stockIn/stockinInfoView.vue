<template>
    <div class="f_main">
      <yhm-view-body>
        <template #title>库存信息</template>
        <template #body>
          <yhm-view-control title="商品名称" :content="product"></yhm-view-control>
          <yhm-view-control title="规格型号" :content="model"></yhm-view-control>
          <yhm-view-control title="总数量" :content="quantity"></yhm-view-control>
        </template>
      </yhm-view-body>

      <div class="f_split" ></div>

      <yhm-view-tab>
        <template #tab>
          <yhm-view-tab-button :list="tabState" :index="0">库存信息</yhm-view-tab-button>
        </template>
        <template #content>
          <yhm-view-tab-list :customize="true" v-show="tabState[0].select">
            <template #listHead>
              <yhm-managerth style="width: 180px" title="商品名称"></yhm-managerth>
              <yhm-managerth style="width: 180px" title="商品规格"></yhm-managerth>
              <yhm-managerth style="width: 125px" title="商品数量"></yhm-managerth>
              <yhm-managerth style="width: 125px" title="库位名称"></yhm-managerth>


            </template>
            <template #listBody>
              <tr v-for="(item,index) in content" :key="index" :class="{InterlacBg:index%2!=0}" >
                <yhm-manager-td :value="item.product"></yhm-manager-td>
                <yhm-manager-td :value="item.model"></yhm-manager-td>
                <yhm-manager-td-center :value="item.quantity"></yhm-manager-td-center>
                <yhm-manager-td-center :value="item.stockPosition"></yhm-manager-td-center>
              </tr>
            </template>
            <template #pager>
              <yhm-pagination :pager="pager" is-page-size="false" @initData="listDetail(false)"></yhm-pagination>
            </template>
            <template #empty>
              <span class="m_listNoData" v-show="content.length === 0">暂时没有数据</span>
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
        tabState:[{select:true}],
        model:'',
        product:'',
        content:'',
        quantity:'',

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
            postid:this.id
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
          }
        })
      },
    },
    created () {
      this.setQuery2Value('id')
      this.listDetail()
    }
  }
</script>

<style scoped>








</style>
