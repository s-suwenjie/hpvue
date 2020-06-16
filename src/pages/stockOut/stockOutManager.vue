<template>
  <div>
    <yhm-managerpage>
      <!--      导航条      -->
      <template #navigation>业务管理&nbsp;&gt;&nbsp;库存管理&nbsp;&gt;&nbsp;出库管理</template>
      <!--      操作区      -->
      <template #operate>
        <yhm-commonbutton value="添加出库信息"  icon="btnAdd" :flicker="true" @call="add" category="one"></yhm-commonbutton>
        <yhm-managersearch :value="searchStr" :history="shortcutSearchContent" id="searchStr" @call="initData"></yhm-managersearch>
      </template>
      <!--数据表头-->
      <template #listHead v-show="!empty">
        <yhm-managerth style="width: 40px;" title="选择" ></yhm-managerth>
        <yhm-managerth style="width: 40px;" title="查看" ></yhm-managerth>
        <yhm-managerth title="经办人" ></yhm-managerth>
        <yhm-managerth style="width: 120px;" title="出库日期" ></yhm-managerth>
        <yhm-managerth style="width: 100px;" title="出库编号"></yhm-managerth>
        <yhm-managerth style="width: 110px" title="总金额"></yhm-managerth>
        <yhm-managerth style="width: 300px" title="备注"></yhm-managerth>
      </template>
      <!--      数据表单       -->
      <template #listBody >
        <tr :class="[{twinkleBg: item.id==lastData},{InterlacBg:index%2!=0}]" v-for="(item,index) in content" :key="index">
          <yhm-manager-td-checkbox :value="item" :persons="cont"></yhm-manager-td-checkbox>
          <yhm-manager-td-look @click="listView(item)"></yhm-manager-td-look>
          <yhm-manager-td :value="item.person"></yhm-manager-td>
          <yhm-manager-td-date :value="item.workDate"></yhm-manager-td-date>
          <yhm-manager-td :value="item.code"></yhm-manager-td>
          <yhm-manager-td-money :value="item.money"></yhm-manager-td-money>
          <yhm-manager-td :value="item.remark"></yhm-manager-td>
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
    name: "stockOutManager",
    mixins: [managermixin],
    data(){
      return{
        lastData:'1',
        people:'',
        one:'',
        cont:'',

      }
    },
    created(){
      this.init()
      this.content.push({
        id:'1',
        person:'程序猿',
        workDate:'2020-01-08周三',
        code:'CKZSG002',
        money:'1500.00 ',
        remark:'',
      })
      this.content.push({
        id:'2',
        person:'程大猿',
        workDate:'2020-01-08周三',
        code:'CKZSG002',
        money:'1500.00 ',
        remark:'',
      })
      this.content.push({
        id:'3',
        person:'程二猿',
        workDate:'2020-01-08周三',
        code:'CKZSG002',
        money:'1500.00',
        remark:'',
      })
    },
    methods:{


      init(){
        this.ajaxJson({
          url:'/stock/stockout/getManager',
          call: (data) => {
            console.log(data+'111');
          }
        })
      },


      add() {
        this.$dialog.OpenWindow({
          width: 1050,
          height: 720,
          url:'/stockOutForm',
          title:'添加出库信息',
          closeCallBack:(data) =>{
            if (data) {
              this.lastData = data//接收子页面传的值
              this.initPageData(false)
            }
          }
        })
      },
      listView(item){
        this.cont=item.person
        if(false){
          this.$dialog.OpenWindow({
            width: 1050,
            height: 720,
            url:'/warehouseExitForm?id=' + item.id,
            title:'查看出库信息',
            closeCallBack:(data) =>{
              if (data) {
                this.initPageData(false)
              }
            }
          })
        }
        else{
          this.$dialog.OpenWindow({
            width: 1050,
            height: 520,
            url:'/stockOutView?id=' + item.id + '&person=' + this.cont,
            title:'查看出库信息'
          })

        }
      },

    },

  }
</script>

<style scoped>

</style>
