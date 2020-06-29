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
            <yhm-view-tab-button :list="tabState" @click="mc" :index="0">库存明细</yhm-view-tab-button>
            <yhm-view-tab-button :list="tabState"  @click="jl" :index="1">入库记录</yhm-view-tab-button>
          </template>
          <template #content>
            <yhm-view-tab-list :customize="true" v-show="tabState[0].select">
              <template #listHead>
                <yhm-managerth style="width: 180px" title="商品名称"></yhm-managerth>
                <yhm-managerth style="width: 180px" title="商品规格"></yhm-managerth>
                <yhm-managerth style="width: 125px" title="商品数量"></yhm-managerth>
                <yhm-managerth style="width: 125px" title="是否拆分"></yhm-managerth>
                <yhm-managerth style="width: 125px" title="拆分数量"></yhm-managerth>

              </template>
              <template #listBody>
                <tr v-for="(item,index) in lists" :class="{InterlacBg:index%2!=0}" :key="index">
<!--                  <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>-->
                  <yhm-manager-td :value="item.product"></yhm-manager-td>
                  <yhm-manager-td :value="item.model"></yhm-manager-td>
                  <yhm-manager-td-rgt :value="item.quantity+item.uuStr+''"></yhm-manager-td-rgt>
                  <yhm-manager-td-center :value="item.spilt"></yhm-manager-td-center>
                  <yhm-manager-td-rgt :value="item.sumStr+item.mdoStr"></yhm-manager-td-rgt>
                </tr>
              </template>
              <template #empty>
                <span class="m_listNoData" v-show="lists.length === 0">暂时没有数据</span>
              </template>
              <template #pager>
                <yhm-pagination :pager="pager" is-page-size="false" :is-select-info="false" @initData="initDat(false)"></yhm-pagination>
              </template>
            </yhm-view-tab-list>
            <yhm-view-tab-list :customize="true" v-show="tabState[1].select">
              <template #listHead>
                <yhm-managerth title="商品名称"></yhm-managerth>
                <yhm-managerth title="商品规格"></yhm-managerth>
                <yhm-managerth title="入库日期"></yhm-managerth>
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
                  <yhm-manager-td :value="item.time"></yhm-manager-td>
                  <yhm-manager-td-rgt :value="item.quantity+item.uuStr+''"></yhm-manager-td-rgt>
                  <yhm-manager-td-money :value="item.price+''"></yhm-manager-td-money>
                  <yhm-manager-td-money :value="item.totalPrice+''"></yhm-manager-td-money>
                  <yhm-manager-td-money :value="item.priceTax+''"></yhm-manager-td-money>
                  <yhm-manager-td-money :value="item.totalPriceTax+''"></yhm-manager-td-money>
                </tr>
              </template>
              <template #pager>
                <yhm-pagination :pager="pager" is-page-size="false" :is-select-info="false" @initData="locationClick(false)"></yhm-pagination>
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
        locationType:'',//库位类别
        name:'',
        list:[],
        lists:[],
        createName:'',
        insertDate:'',
        updateName:'',
        updateDate:'',
      }
    },
    methods:{
      mc(){
        this.pager.pageIndex=1
        this.initDat()
      },
      jl(){
        this.locationClick()
        this.pager.pageIndex=1
      },
      locationClick(){
        let params = {
          postid:this.id,
          pageIndex: this.pager.pageIndex,
        }
        this.ajaxJson({
          url: '/stock/stockPosition/getPositionDetail',
          data: params,
          call: (data) => {
            // this.content = data.postDetailReturnList
            console.log(data);
            this.pager.total = data.count
            this.list=data.content
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
            this.initDat()
            if(data){
              this.bePutInStorage()
            }
          }
        })
      },
      initDat(){
        let params = {
          postid:this.id,
          pageDetail: this.pager.pageIndex,
          }
        this.ajaxJson({
          url: '/stock/stockPosition/getForPositionDetail',
          data: params,
          call: (data) => {
            console.log(data);
            this.lists = data.content
            this.pager.total = data.count
            this.updateName=data.updateName
            this.createName=data.updateName
            if(data.insertDate){
              this.insertDate=data.insertDate
              this.updateDate=data.updateDate
            }else{
              this.insertDate='当前时间'
              this.updateDate='当前时间'
            }

            for (let i in data.content) {
              if( data.content[i].spilt=='0' ){
                this.lists[i].spilt='是'

              }else{
                this.lists[i].spilt='否'
                this.lists[i].sumStr='---'
                this.lists[i].mdoStr='---'
              }
            }
            this.locationType = data.categoryPsd.list[data.categoryPsd.value].showName
            this.name = data.name
            console.log(data);
          },
        })
      },
    },
    created () {
      this.setQuery2Value('id')
      this.initDat()

    }
  }
</script>

<style scoped>

</style>
