<template>
  <div class="f_main">
    <!--头部信息-->
    <yhm-view-body>
      <template #title>基本信息</template>
      <template #body>
        <yhm-view-control title="经办人" :content="person+''"></yhm-view-control>
        <yhm-view-control type="date" title="出库日期" :content="workDate"></yhm-view-control>
        <yhm-view-control title="出库编号" :content="code+''"></yhm-view-control>
        <yhm-view-control title="总金额" :content="money" type="money" color="#FF0000"></yhm-view-control>
      </template>
    </yhm-view-body>

    <div class="f_split"></div>

    <yhm-view-tab>
      <template #tab>
        <yhm-view-tab-button :list="tabState" :index="0">出库明细</yhm-view-tab-button>
      </template>
      <template #content>
        <yhm-view-tab-list :customize="true" :pager="false" v-show="tabState[0].select">
          <!--     表格头部     -->
          <template #listHead>
            <yhm-managerth style="width: 50px" title="序号"></yhm-managerth>
            <yhm-managerth style="width: 180px" title="商品名称"></yhm-managerth>
            <yhm-managerth style="width: 200px" title="型号"></yhm-managerth>
            <yhm-managerth style="width: 80px" title="数量"></yhm-managerth>
            <yhm-managerth style="width: 60px" title="单位"></yhm-managerth>
            <yhm-managerth style="width: 90px" title="单价"></yhm-managerth>
            <yhm-managerth style="width: 90px" title="总额"></yhm-managerth>
          </template>
          <!--     表格内容     -->
          <template #listBody v-show="show">
            <tr v-for="(item,index) in list" :key="index" :class="{InterlacBg:index%2!==0}">
              <yhm-manager-td-center :value="(index+1)+''"></yhm-manager-td-center>
              <yhm-manager-td :value="item.product+''"></yhm-manager-td>
              <yhm-manager-td :value="item.model+''"></yhm-manager-td>
              <yhm-manager-td-rgt :value="item.quantity+''"></yhm-manager-td-rgt>
              <yhm-manager-td :value="item.spiltStr+''"></yhm-manager-td>
              <yhm-manager-td-money :value="item.price+''"></yhm-manager-td-money>
              <yhm-manager-td-money :value="item.totalPrice+''"></yhm-manager-td-money>
            </tr>
          </template>
          <template #customize>
            <yhm-view-control title="总金额" type="money" :content="money" color="#FF0000"></yhm-view-control>
          </template>
        </yhm-view-tab-list>
<!--        /Basic/selectPersonJson-->
      </template>
    </yhm-view-tab>
  </div>
</template>

<script>
  import { viewmixin } from '@/assets/view.js'
  import {accAdd} from "../../assets/common";
  export default {
    name: "stockOutView",
    mixins: [viewmixin],
    data(){
      return {
        person:'',
        tabState:[{select:true}],
        code:'',
        workDate:'',
        money:'',//空数据
        remark:'',//空数据
        list:'',  //商品明细
        cont:'',
        show:true,
      }
    },
    created(){
      this.init()
    },
    methods:{

      init(){
        console.log(this.id);
        let parmas={id:this.id,}
        this.ajaxJson({
          url:'/stock/stockout/initForm',
          data:parmas,
          call: (data) => {
            this.list=data.list
            this.person=data.createNameStr
            this.code=data.code
            this.workDate=data.insertDateStr
            if(data.list=='') {
              this.show = false
            }
            let num =0
            for ( let i in this.list) {
              num= accAdd(parseFloat(this.list[i].totalPrice),num)
              if( this.list[i].spilt==null ){
                this.list[i].spiltStr='无'
              }
            if(this.list[i].spilt=='0'){
              this.list[i].spiltStr=this.list[i].uuStr
            }
            }
            this.money= parseFloat(num).toFixed(2) +''

          },
        })
      }
    }
  }
</script>

<style scoped>

</style>
