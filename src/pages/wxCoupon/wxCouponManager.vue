<template>
  <div>
    <yhm-managerpage>
      <!--导航条-->
      <template #navigation>系统&nbsp;&gt;&nbsp;优惠券管理&nbsp;&gt;&nbsp;优惠券类型管理</template>
      <template #operate>
        <yhm-commonbutton value="添加" icon="btnAdd" :flicker="true" @call="add()"></yhm-commonbutton>
        <yhm-commonbutton value="测试选择" icon="btnAdd" :flicker="true" @call="test"></yhm-commonbutton>
        <yhm-commonbutton :value="choose?'收起筛选':'展开筛选'" :icon="choose?'btnUp':'btnDown'" @call="switchChoose()"></yhm-commonbutton>
        <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initData"></yhm-managersearch>
      </template>
      <!--筛选区-->
      <template #choose>
        <div v-show="choose" class="buttonBody mptZero">
          <yhm-radiofilter @initData="initChoose('category')" title="类型" :content="listCategory"></yhm-radiofilter>
        </div>
      </template>
      <!--数据表头-->
      <template #listHead>
        <yhm-managerth style="width: 40px;" title="选择"></yhm-managerth>
        <yhm-managerth style="width: 40px;" title="查看"></yhm-managerth>
        <yhm-managerth style="width: 450px;" title="名称" value="name"></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="类型" value="category"></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="面值" value="money"></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="有效期" value="expirationCategory,expiration"></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="logo"></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="发出总数量" value="quantity"></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="已使用数量" value="used"></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="未使用数量" value="unused"></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="已过期数量" value="expired"></yhm-managerth>
        <yhm-managerth title="操作"></yhm-managerth>
      </template>

      <!--数据明细-->
      <template #listBody>
        <tr v-for="(item,index) in content" :key="index" :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]">
          <yhm-manager-td-checkbox :value="item"></yhm-manager-td-checkbox>
          <yhm-manager-td-look @click="view(item.id)"></yhm-manager-td-look>
          <yhm-manager-td :value="item.name"></yhm-manager-td>
          <yhm-manager-td-psd :value="item.category" :list="categoryList"></yhm-manager-td-psd>
          <yhm-manager-td-money :value="item.money"></yhm-manager-td-money>
          <yhm-manager-td-psd :befotr-value="item.expiration" :value="item.expirationCategory" :list="expirationCategoryList"></yhm-manager-td-psd>
          <yhm-manager-td-image :tip="true" left="-940" width="450" height="250" :value="item.url" tag="wxCoupon"></yhm-manager-td-image>
          <yhm-manager-td-rgt :value="item.quantity"></yhm-manager-td-rgt>
          <yhm-manager-td-rgt :value="item.used"></yhm-manager-td-rgt>
          <yhm-manager-td-rgt :value="item.unused"></yhm-manager-td-rgt>
          <yhm-manager-td-rgt :value="item.expired"></yhm-manager-td-rgt>
          <yhm-manager-td-operate>

          </yhm-manager-td-operate>
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
    name: 'wxCouponManager',
    mixins: [managermixin],
    data(){
      return{
        categoryList:[],//优惠券类型集合
        listCategory:{
          value:"",
          list:[]
        },
        expirationCategoryList:[],    //有效期类型集合
      }
    },
    methods:{
      test(){
        this.$dialog.OpenWindow({
          width: 1050,
          height: 660,
          url:'/selectWxCoupon?showCategory=1,2',
          title:"选择优惠券",
          closeCallBack:(data) =>{
            console.log(data)
          }
        })
      },
      add(id){
        // 默认设置页面标记是查看
        var isAdd = false
        // 默认设置页面标题为查看信息
        var title = '查看优惠券信息'
        if (!id) { // 当id不存在的时候
          // 设置id为空
          id = ''
          // 设置页面标题为添加信息
          title = '添加优惠券信息'
          // 设置页面标记为添加
          isAdd = true
        }
        this.$dialog.OpenWindow({
          width: 1050,
          height: 600,
          url:'/wxCouponForm?id=' + id,
          title:title,
          closeCallBack:(data) =>{
            if (data) {
              if (isAdd) {
                this.lastData = data//接收子页面传的值
              }
              this.initPageData(false)
              /*false->非初始化=>!import  true->初始化*/
            }
          }
        })

      },
      view(id){
        this.$dialog.OpenWindow({
          width: 1050,
          height: 700,
          url:'/wxMemberSelect?id='+id,
          title:'优惠券选项卡',
          closeCallBack:(data) =>{
          }
        })
      },
      //搜索
      initPageData (initValue) {
        let params = {}

        if (initValue) {
          params = {
            category:this.listCategory.value
          }
        } else {
          params = {
            category:this.listCategory.value
          }
        }
        this.init({
          initValue:initValue,
          url: '/wx/wxCoupon/getManager',
          data:params,
          all:(data) =>{
            //不管是不是初始化都需要执行的代码
          },
          init:(data)=>{
            //初始化时需要执行的代码
            this.categoryList = data.categoryPsd.list
            this.listCategory = data.categoryPsd
            this.expirationCategoryList = data.expirationCategoryPsd.list
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
