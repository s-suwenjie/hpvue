<template>
    <div>
      <yhm-managerpage>
        <!--导航条-->
        <template #navigation>业务管理&nbsp;&gt;&nbsp;库存管理&nbsp;&gt;&nbsp;库位管理</template>
        <!--操作区-->
        <template #operate>
          <yhm-commonbutton value="添加" icon="btnAdd" :flicker="true" @call="add()"></yhm-commonbutton>
          <yhm-commonbutton :value="choose?'收起筛选':'展开筛选'" :icon="choose?'btnUp':'btnDown'" @call="switchChoose()"></yhm-commonbutton>
          <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initData"></yhm-managersearch>
        </template>
        <template #choose>
          <div v-show="choose" class="buttonBody mptZero">
            <yhm-radiofilter @initData="initChoose()" title="库位类型" :content="listCategory"></yhm-radiofilter>
          </div>
        </template>

        <!--数据表头-->
        <template #listHead>
          <yhm-managerth style="width: 38px;" title="选择"></yhm-managerth>
          <yhm-managerth style="width: 38px;" title="查看"></yhm-managerth>
          <yhm-managerth style="width: 250px;" title="库位类型"></yhm-managerth>
          <yhm-managerth  title="库位名称"></yhm-managerth>
        </template>

        <!--数据明细-->
        <template #listBody>
          <tr :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]" v-for="(item,index) in content" :key="index">
            <yhm-manager-td-checkbox :value="item"></yhm-manager-td-checkbox>
            <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>
            <yhm-manager-td-psd :list="listCategory.list" :value="item.category"></yhm-manager-td-psd>
            <yhm-manager-td-center :value="item.name"></yhm-manager-td-center>
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
    name: 'stockPositionManager',
    mixins: [managermixin],
    data () {
      return{
        listCategory: {
          value: '',
          list: []
        },
      }
    },
    methods:{
      //添加
      add () {
        this.$dialog.OpenWindow({
          width: '1050',
          height: '390',
          url:'/stockPositionForm?type=1',
          title:'添加库位信息',
          closeCallBack:(data) =>{
            if (data) {
              this.lastData = data   //最后添加一条数据给与动态闪烁
              this.initPageData(false)
              // /!*false->非初始化=>!import  true->初始化*!/
            }
          }
        })
      },
      listView(item){
        this.$dialog.OpenWindow({
          width: '1050',
          height: '600',
          url:'/stockPositionView?id=' + item.id,
          title:'查看库位信息',
          closeCallBack:(data) =>{
            this.initPageData(false)
            if (data) {
              this.lastData = data   //最后添加一条数据给与动态闪烁
              // /!*false->非初始化=>!import  true->初始化*!/
            }
          }
        })
      },
      //搜索
      initPageData (initValue) {
        let params = {}
        if (initValue) {
          // 页面初始化是需要的参数
          params = {
            init: true
          }
        } else {
          // 页面非初始化时需要的参数
          params = {
            category: this.listCategory.value,
            init: false
          }
        }
        this.init({
          initValue: initValue,
          url: '/stock/stockPosition/getManager',
          data: params,
          all: (data) => {
            // 不管是不是初始化都需要执行的代码
          },
          init: (data) => {
            // 初始化时需要执行的代码
            // 这边初始化筛选信息
            this.listCategory.list=data.categoryPsd.list
            this.listCategory.value=data.categoryPsd.value
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
