<template>
    <div>
      <yhm-managerpage>
        <!--导航条-->
        <template #navigation>业务管理&nbsp;&gt;&nbsp;库存管理&nbsp;&gt;&nbsp;库存信息</template>

        <!--操作区-->
        <template #operate>
          <!--        <yhm-commonbutton value="添加" icon="btnAdd" :flicker="true" @call="add" category="one"></yhm-commonbutton>-->
          <!--        <yhm-commonbutton :value="choose?'收起筛选':'展开筛选'" :icon="choose?'btnUp':'btnDown'" @call="switchChoose()"></yhm-commonbutton>-->
          <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initData"></yhm-managersearch>
        </template>

        <!--数据表头-->
        <template #listHead>
          <yhm-managerth style="width: 40px;" title="选择"></yhm-managerth>
          <yhm-managerth style="width: 40px;" title="查看"></yhm-managerth>
          <yhm-managerth title="商品名称" ></yhm-managerth>
          <yhm-managerth style="width: 300px;" title="销售价"></yhm-managerth>
          <yhm-managerth style="width: 300px;" title="销售总价"></yhm-managerth>
          <yhm-managerth style="width: 300px;" title="商品型号" value="modelID"></yhm-managerth>
          <yhm-managerth style="width: 200px" title="数量" value="quantity"></yhm-managerth>
          <yhm-managerth style="width: 200px" title="修改"></yhm-managerth>

        </template>
        <template #listBody>
          <tr :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]" v-for="(item,index) in content" :key="index">
            <yhm-manager-td-checkbox :value="item"></yhm-manager-td-checkbox>
            <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>
            <yhm-manager-td :value="item.product"></yhm-manager-td>
            <yhm-manager-td :value="item.salesprice+''"></yhm-manager-td><!--销售价-->
            <yhm-manager-td :value="item.saletotal+''"></yhm-manager-td><!--销售总价-->
            <yhm-manager-td :value="item.model"></yhm-manager-td>
            <yhm-manager-td :value="item.quantity.toString()"></yhm-manager-td>
            <yhm-manager-td :value="'修改'" @click="modify(item)"></yhm-manager-td><!--修改-->

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
        content:[],
        lastData:'',

      }
    },
    methods:{
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
            //state: this.stateList.value
          }
        } else {
          // 页面非初始化时需要的参数
          params = {
            //state: this.stateList.value
          }
        }
        this.init({
          initValue: initValue,
          url: '/stock/stockPosition/queryForProduct',
          ///stockPosition/StockUpdate
          data: '',
          all: (data) => {
            console.log(data);
            // 不管是不是初始化都需要执行的代码
          },
          init: (data) => {
            // 初始化时需要执行的代码
            // 这边初始化筛选信息
            //this.stateList = data.statePsd
          }
        })
      },
    //  修改.....----------
      modify(item){
        // console.log(index);
        this.$dialog.OpenWindow({
          width: 1050,
          height: 720,
          url:'/stockInModifyView?id=' + item.id,
          title:'修改售价信息',
          closeCallBack:(data) =>{
            if (data) {
              this.initPageData(false)
            }
          }
        })
      },
    }
  }
</script>

<style scoped>

</style>
