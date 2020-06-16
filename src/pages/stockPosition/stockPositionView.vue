<template>
    <div class="f_main">
      <yhm-view-body>
        <template #title>库位明细</template>
        <template #body>
          <yhm-view-control title="库位名称" :content="name"></yhm-view-control>
          <yhm-view-control title="库位类型" :content="locationType"></yhm-view-control>

        </template>
      </yhm-view-body>

      <div class="f_split" ></div>

        <yhm-view-tab>
          <template #tab>
            <yhm-view-tab-button :list="tabState" :index="0">库存明细</yhm-view-tab-button>
            <yhm-view-tab-button :list="tabState"  @click="locationClick" :index="1">入库记录</yhm-view-tab-button>
          </template>
          <template #content>
            <yhm-view-tab-list :customize="true" v-show="tabState[0].select">
              <template #listHead>
                <yhm-managerth style="width: 180px" title="商品名称"></yhm-managerth>
                <yhm-managerth style="width: 180px" title="商品规格"></yhm-managerth>
                <yhm-managerth style="width: 125px" title="商品数量"></yhm-managerth>
              </template>
              <template #listBody>
                <tr v-for="(item,index) in lists" :class="{InterlacBg:index%2!=0}" :key="index">
<!--                  <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>-->
                  <yhm-manager-td :value="item.product"></yhm-manager-td>
                  <yhm-manager-td :value="item.model"></yhm-manager-td>
                  <yhm-manager-td-center :value="item.quantity+''"></yhm-manager-td-center>
                </tr>
              </template>
              <template #empty>
                <span class="m_listNoData" v-show="lists.length === 0">暂时没有数据</span>
              </template>
              <template #pager>
                <yhm-pagination :pager="pager" is-page-size="false" @initData="listDetail(false)"></yhm-pagination>
              </template>
            </yhm-view-tab-list>
            <yhm-view-tab-list :customize="true" v-show="tabState[1].select">
              <template #listHead>
                <yhm-managerth style="width: 180px" title="商品名称"></yhm-managerth>
                <yhm-managerth style="width: 180px" title="商品规格"></yhm-managerth>
                <yhm-managerth style="width: 125px" title="商品数量"></yhm-managerth>
                <yhm-managerth style="width: 125px" title="单价"></yhm-managerth>
                <yhm-managerth style="width: 125px" title="总价"></yhm-managerth>
                <yhm-managerth style="width: 125px" title="含税单价"></yhm-managerth>
                <yhm-managerth title="含税总价"></yhm-managerth>
              </template>
              <template #listBody>
                <tr v-for="(item,index) in list" :class="{InterlacBg:index%2!=0}" :key="index">
                  <!--                  <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>-->
                  <yhm-manager-td :value="item.product"></yhm-manager-td>
                  <yhm-manager-td :value="item.model"></yhm-manager-td>
                  <yhm-manager-td-center :value="item.quantity+''"></yhm-manager-td-center>
                  <yhm-manager-td-money :value="item.price+''"></yhm-manager-td-money>
                  <yhm-manager-td-money :value="item.totalPrice+''"></yhm-manager-td-money>
                  <yhm-manager-td-money :value="item.priceTax+''"></yhm-manager-td-money>
                  <yhm-manager-td-money :value="item.totalPriceTax+''"></yhm-manager-td-money>
                </tr>
              </template>
              <template #pager>
                <yhm-pagination :pager="pager" is-page-size="false" @initData="listDetail(false)"></yhm-pagination>
              </template>
              <template #empty>
                                <span class="m_listNoData" v-show="list.length === 0">暂时没有数据</span>
              </template>
            </yhm-view-tab-list>
          </template>
        </yhm-view-tab>
      <yhm-formoperate :createName="createName" :insertDate="insertDate" :updateName="updateName" :updateDate="updateDate">
        <template #btn>
          <yhm-commonbutton value="编辑" icon="btnSave" :flicker="true" @call="save()"></yhm-commonbutton>
        </template>
      </yhm-formoperate>
    </div>
</template>

<script>
  import { viewmixin } from '@/assets/view.js'

  export default {
    name: 'stockPositionView',
    mixins: [viewmixin],
    data(){
      return{
        tabState:[{select:true},{select:false}],
        // category:'',//库位
        // categoryPsd:[],//库位类别
        locationType:'',//库位类别
        name:'',
        list:[],
        lists:[]

      }
    },
    methods:{
      locationClick(){
        let params = {
          postid:this.id
        }
        this.ajaxJson({
          url: '/stock/stockPosition/getPositionDetail',
          data: params,
          call: (data) => {
            // this.content = data.postDetailReturnList


          }
        })
      },
      //编辑
      save(){
        this.$dialog.OpenWindow({
          width: 1050,
          height: 500,
          url: "/stockPositionForm?id="+this.id,
          title: "编辑库位信息",
          closeCallBack: (data) => {
            if(data){
              this.bePutInStorage()
            }
          }
        })
      },
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
          url: '/stock/stockPosition/getForPositionDetail',
          data: params,
          call: (data) => {
            this.lists = data.content
            this.locationType = data.categoryPsd.list[data.category].showName
            this.name = data.name
            // this.content = data.postDetailReturnList


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
