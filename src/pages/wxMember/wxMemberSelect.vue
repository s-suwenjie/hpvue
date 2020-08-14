<template>
  <div class="f_main" >
    <yhm-view-body>
      <template #title>基本信息</template>
      <template #body>
        <yhm-view-control title="名称" :content="name"></yhm-view-control>
        <yhm-view-control title="类型" :content="categorys"></yhm-view-control>
        <yhm-view-control title="面值" type="money" :content="money" style="color: red"></yhm-view-control>
        <yhm-view-control title="有效期" :content="expiration+expirationCategorys"></yhm-view-control>
        <yhm-view-control title="数量" :content="quantity+'张'"></yhm-view-control>
        <yhm-view-control title="可使用数量" :content="unused+'张'"></yhm-view-control>
        <yhm-view-control title="已使用数量" :content="used+'张'"></yhm-view-control>
        <yhm-view-control title="已过期数量" :content="expired+'张'"></yhm-view-control>
        <yhm-view-image :url="url" title="查看图片" tag="wxCoupon"></yhm-view-image>
      </template>
    </yhm-view-body>

    <div class="f_split"></div>

    <yhm-view-tab>
      <template #tab>
        <yhm-view-tab-button :list="tabState" :index="0" @click="change(0)">可使用</yhm-view-tab-button>
        <yhm-view-tab-button :list="tabState" :index="1" @click="change(1)">已使用</yhm-view-tab-button>
        <yhm-view-tab-button :list="tabState" :index="2" @click="change(2)">已过期</yhm-view-tab-button>
      </template>
      <template #content>

        <!--111111111111111111111-->
        <yhm-view-tab-list :customize="true" v-show="tabState[0].select">
          <template #listHead>
            <yhm-managerth style="width: 50px" title="序号"></yhm-managerth>
            <yhm-managerth title="车牌号"></yhm-managerth>
            <yhm-managerth title="车型"></yhm-managerth>
            <yhm-managerth title="发送日期"></yhm-managerth>
            <yhm-managerth title="过期日期"></yhm-managerth>
          </template>
          <template #listBody>
            <tr v-for="(item,index) in details" :key="index" :class="{InterlacBg:index%2!==0}">
              <yhm-manager-td-center :value="(index+numbers)+''"></yhm-manager-td-center>
              <yhm-manager-td-center :value="item.vehicleCode"></yhm-manager-td-center>
              <yhm-manager-td :value="item.vehicleCx"></yhm-manager-td>
              <yhm-manager-td-date :value="item.start"></yhm-manager-td-date>
              <yhm-manager-td-date :value="item.end"></yhm-manager-td-date>
            </tr>
          </template>
          <template #empty>
            <span class="m_listNoData" v-show="details.length == 0">暂时没有数据</span>
          </template>
          <template #pager>
            <yhm-pagination :pager="pager" is-page-size="false" :is-select-info="false" @initData="initDat(false)"></yhm-pagination>
          </template>
        </yhm-view-tab-list>

        <!--2222222222222222222222-->
        <yhm-view-tab-list :customize="true" v-show="tabState[1].select">
          <template #listHead>
            <yhm-managerth style="width: 50px" title="序号"></yhm-managerth>
            <yhm-managerth title="车牌号"></yhm-managerth>
            <yhm-managerth title="车型"></yhm-managerth>
            <yhm-managerth title="发送日期"></yhm-managerth>
            <yhm-managerth title="使用日期"></yhm-managerth>
          </template>
          <template #listBody>
            <tr v-for="(item,index) in details" :key="index" :class="{InterlacBg:index%2!==0}">
              <yhm-manager-td-center :value="(index+numbers)+''"></yhm-manager-td-center>
              <yhm-manager-td-center :value="item.vehicleCode"></yhm-manager-td-center>
              <yhm-manager-td :value="item.vehicleCx"></yhm-manager-td>
              <yhm-manager-td-date :value="item.start"></yhm-manager-td-date>
              <yhm-manager-td-date :value="item.end"></yhm-manager-td-date>
            </tr>
          </template>
          <template #empty>
            <span class="m_listNoData" v-show="details.length == 0">暂时没有数据</span>
          </template>
          <template #pager>
            <yhm-pagination :pager="pager" is-page-size="false" :is-select-info="false" @initData="initDat(false)"></yhm-pagination>
          </template>
        </yhm-view-tab-list>

        <!--333333333333333333333-->
        <yhm-view-tab-list :customize="true" v-show="tabState[2].select">
          <template #listHead>
            <yhm-managerth style="width: 50px" title="序号"></yhm-managerth>
            <yhm-managerth title="车牌号"></yhm-managerth>
            <yhm-managerth title="车型"></yhm-managerth>
            <yhm-managerth title="发送日期"></yhm-managerth>
            <yhm-managerth title="过期日期"></yhm-managerth>
          </template>
          <template #listBody>
            <tr v-for="(item,index) in details" :key="index" :class="{InterlacBg:index%2!==0}">
              <yhm-manager-td-center :value="(index+numbers)+''"></yhm-manager-td-center>
              <yhm-manager-td-center :value="item.vehicleCode"></yhm-manager-td-center>
              <yhm-manager-td :value="item.vehicleCx"></yhm-manager-td>
              <yhm-manager-td-date :value="item.start"></yhm-manager-td-date>
              <yhm-manager-td-date :value="item.end"></yhm-manager-td-date>
            </tr>
          </template>
          <template #empty>
            <span class="m_listNoData" v-show="details.length == 0">暂时没有数据</span>
          </template>
          <template #pager>
            <yhm-pagination :pager="pager" is-page-size="false" :is-select-info="false" @initData="initDat(false)"></yhm-pagination>
          </template>
        </yhm-view-tab-list>


      </template>
    </yhm-view-tab>


  </div>
</template>

<script>
  import { viewmixin } from '@/assets/view.js'
  export default {
    name: 'wxMemberSelect',
    mixins: [viewmixin],
    data(){
      return{
        tabState:[{select:true},{select:false},{select:false}],
        details:'',
        productDetails:[],
        list:[],
        name:'',
        category:'',
        categorys:'',
        expirationCategory:'',
        expirationCategorys:'',
        expiration:'',
        money:'',
        quantity:'',
        url:'',
        idx:'0',
        numbers:1,
        unused:'',
        used:'',
        expired:'',
      }
    },
    created(){
      this.init()
    },
    methods:{
      init(){
        let params={
          id:this.id
        }
        this.ajaxJson({
          url: '/wx/wxCoupon/initForm',
          data: params,
          call: (data) => {
            console.log(data)
            this.name=data.name
            this.categorys=data.categoryPsd.list[data.category].showName
            this.category=data.category
            this.money=data.money
            this.expiration=data.expiration
            this.expirationCategory=data.expirationCategory
            this.expirationCategorys=data.expirationCategoryPsd.list[data.expirationCategory].showName
            this.quantity=data.quantity
            this.unused=data.unused
            this.used=data.used
            this.expired=data.expired
            this.url=data.url
            this.details=data.details.content
            this.pager.total=data.details.count
          }
        })
      },
    //  分页,分页
      initDat(){
        let params = {
          id:this.id,
          state:this.idx,
          pageIndex: this.pager.pageIndex,
        }
        if(this.pager.pageIndex==1){
          this.numbers=1
        }else{
          this.numbers=(this.pager.pageIndex-1)*5+1
        }
        this.ajaxJson({
          url: 'wx/wxCoupon/getTabManager',
          data: params,
          call: (data) => {
            this.pager.total=data.count
            this.details=data.content

            console.log(data);
          },
        })
      },
    //  点击切换查看优惠券页面
      change(index){
        console.log(index)
        this.numbers=1
        this.details=''
        this.pager.pageIndex=1
        for(let i in this.tabState){
          if(index==i){
            console.log('2')
            this.tabState[i].select=true
            this.idx=i
            this.initDat()
          }else{
            this.tabState[i].select=false
          }
        }
      }
    },

  }
</script>

<style scoped>


</style>
