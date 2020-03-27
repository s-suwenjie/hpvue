<template>
  <div>
    <yhm-managerpage>
      <!--导航条-->
      <template #navigation>业务管理&nbsp;&gt;&nbsp;基础数据&nbsp;&gt;&nbsp;商品管理</template>
      <template #operate>
        <!--操作区-->
        <yhm-commonbutton value="添加" icon="btnAdd" :flicker="true" @call="add()"></yhm-commonbutton>
        <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initData"></yhm-managersearch>
        <yhm-commonbutton value="选择商品" icon="btnAdd" @call="selectProduct"></yhm-commonbutton>
        <yhm-commonbutton value="选择规格型号" icon="btnAdd" @call="selectModel"></yhm-commonbutton>
      </template>

      <!--数据表头-->
      <template #listHead>
        <yhm-managerth style="width: 40px;" title="选择"></yhm-managerth>
        <yhm-managerth style="width: 40px;" title="查看"></yhm-managerth>
        <yhm-managerth title="商品名称"></yhm-managerth>
        <yhm-managerth style="width: 180px;" title="计量单位"></yhm-managerth>
        <yhm-managerth style="width: 180px;" title="操作"></yhm-managerth>
      </template>
      <!--数据明细-->
      <template #listBody>
        <tr v-for="(item,index) in content" :key="index" :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]">
          <yhm-manager-td-checkbox :value="item"></yhm-manager-td-checkbox>
          <yhm-manager-td-look @click="add(item.id)"></yhm-manager-td-look>
          <yhm-manager-td :value="item.name"></yhm-manager-td>
          <yhm-manager-td :value="item.unit"></yhm-manager-td>
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
    name: 'productManager',
    mixins: [managermixin],
    data(){
      return{

      }
    },
    methods:{
      selectProduct(){
        this.$dialog.OpenWindow({
          width: 950,
          height: 603,
          url: '/selectProduct',
          title: '选择商品信息',
          closeCallBack: (data) => {
            if (data) {
            }
          }
        })
      },
      selectModel(){
        this.$dialog.OpenWindow({
          width: 950,
          height: 603,
          url: '/selectProductModel?ownerID=62DB5123-6D8E-4CBD-A9C4-06A1B232784F',
          title: '选择商品信息',
          closeCallBack: (data) => {
            if (data) {
            }
          }
        })
      },

      //添加
      add (id) {
        // 默认设置页面标记是查看
        var isAdd = false
        // 默认设置页面标题为查看信息
        var title = '查看商品信息'
        if (!id) { // 当id不存在的时候
          // 设置id为空
          id = ''
          // 设置页面标题为添加信息
          title = '添加商品信息'
          // 设置页面标记为添加
          isAdd = true
        }
        this.$dialog.OpenWindow({
          width: 1050,
          height: 650,
          url:'/productForm?id=' + id,
          title:title,
          closeCallBack:(data) =>{
            if (data) {
              if (isAdd) {

              }
              this.initPageData(false)
              /*false->非初始化=>!import  true->初始化*/
            }
          }
        })
      },
      //搜索
      initPageData (initValue) {
        let params = {}

        if (initValue) {
          params = {}
        } else {
          params = {}
        }
        this.init({
          initValue:initValue,
          url: '/Basic/getProductManager',
          data:params,
          all:(data) =>{
            //不管是不是初始化都需要执行的代码
          },
          init:(data)=>{
            //初始化时需要执行的代码
          }
        })
      },
    }
  }
</script>

<style scoped>

</style>
